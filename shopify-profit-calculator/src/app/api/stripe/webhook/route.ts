import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import type Stripe from 'stripe'

export const runtime = 'nodejs'

// Helper: look up user — try metadata.userId first, then stripeCustomerId
async function getUserId(userId?: string | null, customerId?: string | null) {
  if (userId) {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } })
    if (user) return user.id
  }
  if (customerId) {
    const user = await prisma.user.findUnique({ where: { stripeCustomerId: customerId }, select: { id: true } })
    if (user) return user.id
  }
  return null
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig  = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session    = event.data.object as Stripe.Checkout.Session
        const customerId = session.customer as string
        const userId     = await getUserId(session.metadata?.userId, customerId)
        if (!userId) { console.error('checkout.session.completed: user not found'); break }

        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
        await prisma.user.update({
          where: { id: userId },
          data: {
            plan: 'PRO',
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscription.id,
            subscriptionStatus: subscription.status,
          },
        })
        break
      }

      case 'customer.subscription.updated': {
        const sub  = event.data.object as Stripe.Subscription
        const uid  = await getUserId(sub.metadata?.userId, sub.customer as string)
        if (!uid) break
        const isActive = ['active', 'trialing'].includes(sub.status)
        await prisma.user.update({
          where: { id: uid },
          data: { plan: isActive ? 'PRO' : 'FREE', subscriptionStatus: sub.status },
        })
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const uid = await getUserId(sub.metadata?.userId, sub.customer as string)
        if (!uid) break
        await prisma.user.update({
          where: { id: uid },
          data: { plan: 'FREE', stripeSubscriptionId: null, subscriptionStatus: 'canceled' },
        })
        break
      }

      case 'invoice.payment_failed': {
        const invoice    = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string
        await prisma.user.updateMany({
          where: { stripeCustomerId: customerId },
          data: { subscriptionStatus: 'past_due' },
        })
        break
      }

      case 'invoice.payment_succeeded': {
        // Renew — ensure plan stays PRO on successful payment
        const invoice    = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string
        await prisma.user.updateMany({
          where: { stripeCustomerId: customerId },
          data: { plan: 'PRO', subscriptionStatus: 'active' },
        })
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

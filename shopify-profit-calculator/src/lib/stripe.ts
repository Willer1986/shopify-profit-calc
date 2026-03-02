import Stripe from 'stripe'

const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_placeholder'

export const stripe = new Stripe(stripeKey, {
  apiVersion: '2023-10-16',
  typescript: true,
})

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://shopifyprofitcalculator.com'

export async function createCheckoutSession(userId: string, email: string) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: email,
    line_items: [{ price: process.env.STRIPE_PRO_PRICE_ID!, quantity: 1 }],
    success_url: APP_URL + '/dashboard?upgraded=true',
    cancel_url: APP_URL + '/pricing?cancelled=true',
    metadata: { userId },
    subscription_data: { metadata: { userId } },
    allow_promotion_codes: true,
  })
  return session
}

export async function createPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: APP_URL + '/dashboard',
  })
  return session
}

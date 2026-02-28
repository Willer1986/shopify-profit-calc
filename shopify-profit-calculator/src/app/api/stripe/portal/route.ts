import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { createPortalSession } from '@/lib/stripe'

export async function POST() {
  const user = await getSession()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  if (!user.stripeCustomerId) {
    return NextResponse.json({ error: 'No subscription found' }, { status: 400 })
  }

  const session = await createPortalSession(user.stripeCustomerId)
  return NextResponse.json({ url: session.url })
}

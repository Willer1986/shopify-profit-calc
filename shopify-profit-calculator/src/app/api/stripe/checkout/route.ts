import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { createCheckoutSession } from '@/lib/stripe'

export async function POST() {
  const user = await getSession()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  if (user.plan === 'PRO') {
    return NextResponse.json({ error: 'Already on Pro plan' }, { status: 400 })
  }

  const session = await createCheckoutSession(user.id, user.email)
  return NextResponse.json({ url: session.url })
}

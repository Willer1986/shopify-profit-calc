import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { prisma } from './prisma'

const SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'fallback-dev-secret-change-in-production'
)
const SESSION_COOKIE = 'spc_session'
const SESSION_EXPIRY_DAYS = 30

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000)

  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(`${SESSION_EXPIRY_DAYS}d`)
    .sign(SECRET)

  // Clean up expired sessions for this user (background hygiene)
  await prisma.session.deleteMany({
    where: { userId, expiresAt: { lt: new Date() } },
  })

  await prisma.session.create({ data: { userId, token, expiresAt } })

  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  })

  return token
}

export async function getSession() {
  const token = cookies().get(SESSION_COOKIE)?.value
  if (!token) return null

  try {
    await jwtVerify(token, SECRET)

    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            plan: true,
            stripeCustomerId: true,
            stripeSubscriptionId: true,
            subscriptionStatus: true,
            dailyCount: true,
            dailyResetAt: true,
            createdAt: true,
          },
        },
      },
    })

    if (!session || session.expiresAt < new Date()) return null
    return session.user
  } catch {
    return null
  }
}

export async function destroySession() {
  const token = cookies().get(SESSION_COOKIE)?.value
  if (token) {
    await prisma.session.deleteMany({ where: { token } }).catch(() => {})
  }
  cookies().delete(SESSION_COOKIE)
}

export async function requireAuth() {
  const user = await getSession()
  if (!user) throw new Error('Unauthorized')
  return user
}

export async function requirePro() {
  const user = await requireAuth()
  if (user.plan !== 'PRO') throw new Error('Pro plan required')
  return user
}

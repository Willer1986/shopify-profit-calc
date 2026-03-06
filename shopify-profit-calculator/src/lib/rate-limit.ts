import { prisma } from './prisma'

const FREE_DAILY_LIMIT = 3

/**
 * Check rate limit for a logged-in user.
 * Anonymous users are allowed freely (IP-based limiting requires Redis/edge middleware — out of scope).
 */
export async function checkRateLimit(userId: string | null): Promise<{
  allowed: boolean
  remaining: number
}> {
  if (!userId) {
    return { allowed: true, remaining: FREE_DAILY_LIMIT }
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true, dailyCount: true, dailyResetAt: true },
  })
  if (!user) return { allowed: false, remaining: 0 }

  if (user.plan === 'PRO') return { allowed: true, remaining: -1 }

  // Reset if it's a new calendar day
  const now = new Date()
  const last = new Date(user.dailyResetAt)
  const isNewDay =
    now.getUTCFullYear() !== last.getUTCFullYear() ||
    now.getUTCMonth()    !== last.getUTCMonth()    ||
    now.getUTCDate()     !== last.getUTCDate()

  if (isNewDay) {
    await prisma.user.update({
      where: { id: userId },
      data: { dailyCount: 0, dailyResetAt: now },
    })
    return { allowed: true, remaining: FREE_DAILY_LIMIT }
  }

  const remaining = FREE_DAILY_LIMIT - user.dailyCount
  return { allowed: remaining > 0, remaining: Math.max(0, remaining) }
}

export async function incrementUsage(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { dailyCount: { increment: 1 } },
  })
}

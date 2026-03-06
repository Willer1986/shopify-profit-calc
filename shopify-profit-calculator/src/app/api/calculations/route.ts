import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { checkRateLimit, incrementUsage } from '@/lib/rate-limit'

const saveSchema = z.object({
  type: z.enum(['PROFIT', 'FEES', 'AD_PROFIT', 'MARGIN', 'BREAK_EVEN']),
  name: z.string().max(100).optional(),
  inputs: z.record(z.unknown()),
  results: z.record(z.unknown()),
})

// POST — track usage, save calculation if Pro
export async function POST(req: NextRequest) {
  try {
    const user   = await getSession()
    const userId = user?.id ?? null

    const { allowed, remaining } = await checkRateLimit(userId)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Daily limit reached. Upgrade to Pro for unlimited calculations.', upgradeRequired: true },
        { status: 429 }
      )
    }

    const body = await req.json()
    const data = saveSchema.parse(body)

    if (userId) {
      await incrementUsage(userId)

      if (user?.plan === 'PRO') {
        const calc = await prisma.calculation.create({
         data: { userId, ...data as any },
        })
        return NextResponse.json({ success: true, id: calc.id, remaining: -1 })
      }
    }

    return NextResponse.json({ success: true, remaining: remaining - 1 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    console.error('[POST /api/calculations]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// GET — list saved calculations (authenticated)
export async function GET() {
  const user = await getSession()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const calculations = await prisma.calculation.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  return NextResponse.json({ calculations })
}

// DELETE — remove a saved calculation (authenticated, owner only)
export async function DELETE(req: NextRequest) {
  const user = await getSession()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  await prisma.calculation.deleteMany({ where: { id, userId: user.id } })
  return NextResponse.json({ success: true })
}

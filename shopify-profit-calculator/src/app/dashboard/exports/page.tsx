import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ExportButtons } from './ExportButtons'

export const metadata = { title: 'Export History – Dashboard' }

export default async function ExportsPage() {
  const user = await getSession()
  if (!user) redirect('/auth/login')
  if (user.plan !== 'PRO') redirect('/pricing')

  const calculations = await prisma.calculation.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  })

  const safeCalcs = calculations.map((c) => ({
    id: c.id,
    type: c.type,
    name: c.name,
    createdAt: c.createdAt.toISOString(),
    inputs: c.inputs as Record<string, unknown>,
    results: c.results as Record<string, unknown>,
  }))

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Export History</h1>
          <p className="text-gray-500 text-sm mt-1">{calculations.length} calculations saved</p>
        </div>
        <a href="/dashboard" className="btn-secondary text-sm">← Back to Dashboard</a>
      </div>

      {calculations.length === 0 ? (
        <div className="card text-center py-10 text-gray-400">
          <p>No calculations to export yet.</p>
          <a href="/shopify-profit-calculator" className="text-brand-600 hover:underline text-sm mt-2 inline-block">
            Run your first calculation →
          </a>
        </div>
      ) : (
        <ExportButtons calculations={safeCalcs} />
      )}
    </div>
  )
}

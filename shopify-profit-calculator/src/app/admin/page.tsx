import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const metadata = { title: 'Admin – Shopify Profit Calculator' }

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').map((e) => e.trim()).filter(Boolean)

export default async function AdminPage() {
  const user = await getSession()
  if (!user || !ADMIN_EMAILS.includes(user.email)) {
    redirect('/')
  }

  const [totalUsers, proUsers, totalCalculations, recentUsers] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { plan: 'PRO' } }),
    prisma.calculation.count(),
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: { id: true, email: true, plan: true, createdAt: true, dailyCount: true, subscriptionStatus: true },
    }),
  ])

  const mrr            = proUsers * 9
  const conversionRate = totalUsers > 0 ? ((proUsers / totalUsers) * 100).toFixed(1) : '0'
  const avgCalcs       = totalUsers > 0 ? (totalCalculations / totalUsers).toFixed(1) : '0'

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">Admin Only</span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { value: `$${mrr.toLocaleString()}`, label: 'MRR', color: 'text-brand-600' },
          { value: totalUsers.toLocaleString(), label: 'Total Users', color: 'text-gray-900' },
          { value: proUsers.toLocaleString(), label: 'Pro Subscribers', color: 'text-green-600' },
          { value: `${conversionRate}%`, label: 'Conversion Rate', color: 'text-blue-600' },
        ].map((kpi) => (
          <div key={kpi.label} className="card text-center">
            <div className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</div>
            <div className="text-xs text-gray-500 mt-1">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="card text-center">
          <div className="text-3xl font-bold">{totalCalculations.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">Total Calculations Run</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold">{avgCalcs}</div>
          <div className="text-xs text-gray-500 mt-1">Avg Calculations / User</div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="card overflow-x-auto">
        <h2 className="font-bold mb-4">Recent Users (last 20)</h2>
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-2 font-semibold text-gray-700">Email</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Plan</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Status</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Daily Count</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recentUsers.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700 font-medium">{u.email}</td>
                <td className="px-4 py-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    u.plan === 'PRO' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {u.plan}
                  </span>
                </td>
                <td className="px-4 py-2 text-xs text-gray-500">
                  {u.subscriptionStatus || '—'}
                </td>
                <td className="px-4 py-2 text-gray-600">{u.dailyCount}</td>
                <td className="px-4 py-2 text-gray-400 text-xs">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

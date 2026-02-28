import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { BillingPortalButton } from '@/components/ui/BillingPortalButton'
import { UpgradeButton } from '@/components/ui/UpgradeButton'
import { DeleteCalcButton } from '@/components/ui/DeleteCalcButton'

export const metadata = { title: 'Dashboard – Shopify Profit Calculator' }

const CALC_LABELS: Record<string, string> = {
  PROFIT:      'Profit Calculator',
  FEES:        'Fees Calculator',
  AD_PROFIT:   'Ad Profit Calculator',
  MARGIN:      'Margin Calculator',
  BREAK_EVEN:  'Break-Even Calculator',
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { upgraded?: string }
}) {
  const user = await getSession()
  if (!user) redirect('/auth/login')

  const calculations = await prisma.calculation.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  const isPro          = user.plan === 'PRO'
  const dailyRemaining = Math.max(0, 3 - user.dailyCount)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {searchParams.upgraded === 'true' && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-700 font-medium">
          🎉 Welcome to Pro! All features are now unlocked.
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            {user.email} ·{' '}
            <span className={`font-semibold ${isPro ? 'text-green-600' : 'text-gray-600'}`}>
              {isPro ? '✅ Pro Plan' : '🆓 Free Plan'}
            </span>
          </p>
        </div>
        {!isPro && <UpgradeButton isLoggedIn label="Upgrade to Pro – $9/mo" className="text-sm py-2 self-start" />}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { value: isPro ? calculations.length.toString() : '–', label: 'Saved Calculations' },
          { value: isPro ? '∞' : `${dailyRemaining}/3`, label: isPro ? 'Unlimited Daily' : 'Daily Remaining' },
          { value: isPro ? 'Pro' : 'Free', label: 'Current Plan' },
          { value: new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), label: 'Member Since' },
        ].map((s) => (
          <div key={s.label} className="card text-center">
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Free plan usage bar */}
      {!isPro && (
        <div className="card mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">Daily calculations used</span>
            <span className="text-gray-500">{user.dailyCount} / 3</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${user.dailyCount >= 3 ? 'bg-red-500' : 'bg-brand-500'}`}
              style={{ width: `${Math.min(100, (user.dailyCount / 3) * 100)}%` }}
            />
          </div>
          {user.dailyCount >= 3 && (
            <p className="text-xs text-red-600 mt-2">Daily limit reached. Resets at midnight UTC — or upgrade for unlimited.</p>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="card mb-8">
        <h2 className="font-bold mb-4 text-sm text-gray-700 uppercase tracking-wide">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/shopify-profit-calculator" className="btn-secondary text-sm">➕ New Calculation</Link>
          {isPro && (
            <>
              <Link href="/dashboard/exports" className="btn-secondary text-sm">📄 Export History</Link>
              <BillingPortalButton />
            </>
          )}
        </div>
      </div>

      {/* Saved Calculations */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold">
            Saved Calculations
            {!isPro && <span className="ml-2 text-xs text-gray-400 font-normal">(Pro only)</span>}
          </h2>
          {isPro && calculations.length > 0 && (
            <span className="text-xs text-gray-400">{calculations.length} saved</span>
          )}
        </div>

        {!isPro ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <p className="text-3xl mb-3">🔒</p>
            <p className="font-semibold mb-1">Save unlimited calculations</p>
            <p className="text-sm text-gray-500 mb-5">$9/month · cancel anytime</p>
            <UpgradeButton isLoggedIn label="Unlock Pro Features" />
          </div>
        ) : calculations.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <p>No saved calculations yet.</p>
            <Link href="/shopify-profit-calculator" className="text-brand-600 hover:underline text-sm mt-2 inline-block">
              Run your first calculation →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {calculations.map((calc) => (
              <div key={calc.id} className="py-3 flex justify-between items-center gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">
                    {calc.name || CALC_LABELS[calc.type] || calc.type}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(calc.createdAt).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hidden sm:inline">
                    {CALC_LABELS[calc.type] ?? calc.type}
                  </span>
                  <DeleteCalcButton id={calc.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

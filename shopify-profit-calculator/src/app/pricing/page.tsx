import type { Metadata } from 'next'
import { getSession } from '@/lib/auth'
import { UpgradeButton } from '@/components/ui/UpgradeButton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing – Free & Pro Plans',
  description: 'Shopify Profit Calculator pricing. Free plan with 3 calculations/day. Pro plan at $9/month for unlimited calculations, save history, and CSV/JSON export.',
  alternates: { canonical: '/pricing' },
}

const FREE_FEATURES = [
  'All 5 calculators — always free',
  '3 calculations per day',
  'Real-time results',
  'No account required',
  'Mobile friendly',
]

const PRO_FEATURES = [
  'Unlimited calculations — no daily limit',
  'Save calculation history',
  'Export to CSV & JSON',
  'Dashboard with usage stats',
  'Priority email support',
  'New calculator features first',
]

export default async function PricingPage() {
  const user  = await getSession()
  const isPro = user?.plan === 'PRO'

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">Simple, honest pricing</h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Start free — no credit card, no signup needed. Upgrade when you need more.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {/* Free */}
        <div className="card flex flex-col">
          <div className="mb-6">
            <div className="font-bold text-lg mb-1">Free</div>
            <div className="flex items-end gap-1">
              <span className="text-4xl font-bold">$0</span>
            </div>
            <div className="text-gray-500 text-sm mt-1">Forever free · No credit card</div>
          </div>
          <ul className="space-y-3 mb-8 flex-1">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 font-bold mt-0.5 shrink-0">✓</span>{f}
              </li>
            ))}
          </ul>
          <Link href="/shopify-profit-calculator" className="btn-secondary text-sm text-center block">
            Start Calculating
          </Link>
        </div>

        {/* Pro */}
        <div className="card border-brand-400 border-2 relative flex flex-col shadow-lg">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow whitespace-nowrap">
            MOST POPULAR
          </div>
          <div className="mb-6">
            <div className="font-bold text-lg mb-1 text-brand-700">Pro</div>
            <div className="flex items-end gap-1">
              <span className="text-4xl font-bold">$9</span>
              <span className="text-gray-500 text-base mb-1">/month</span>
            </div>
            <div className="text-gray-500 text-sm mt-1">Cancel anytime · Instant access</div>
          </div>
          <ul className="space-y-3 mb-8 flex-1">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-brand-600 font-bold mt-0.5 shrink-0">✓</span>{f}
              </li>
            ))}
          </ul>
          {isPro ? (
            <div className="text-center py-2.5 text-sm font-semibold text-green-700 bg-green-50 rounded-lg border border-green-200">
              ✅ You&apos;re on Pro
            </div>
          ) : (
            <UpgradeButton isLoggedIn={!!user} />
          )}
        </div>
      </div>

      {/* Trust badges */}
      <div className="mt-10 grid sm:grid-cols-3 gap-6 text-center max-w-2xl mx-auto">
        {[
          { icon: '🔒', title: 'Secure Payment', desc: 'Powered by Stripe. Card data never touches our servers.' },
          { icon: '↩️', title: 'Cancel Anytime', desc: 'No contracts, no lock-in. Cancel in one click.' },
          { icon: '⚡', title: 'Instant Access', desc: 'Your account upgrades immediately after payment.' },
        ].map((item) => (
          <div key={item.title} className="text-sm">
            <span className="text-2xl block mb-2">{item.icon}</span>
            <p className="font-semibold text-gray-800 mb-1">{item.title}</p>
            <p className="text-gray-500 text-xs">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQ mini */}
      <div className="mt-14 max-w-2xl mx-auto">
        <h2 className="text-lg font-bold text-center mb-6">Common questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Can I cancel at any time?', a: 'Yes. Cancel any time from your dashboard billing settings. You keep Pro access until the end of your billing period.' },
            { q: 'What payment methods do you accept?', a: 'All major credit and debit cards via Stripe. Secure, encrypted, no card data stored on our servers.' },
            { q: 'Is the free plan really unlimited?', a: 'Free plan allows 3 calculations per day (resets at midnight UTC). No account required to use the calculators.' },
          ].map((faq) => (
            <details key={faq.q} className="card cursor-pointer group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                {faq.q}
                <span className="text-gray-400 ml-2 text-lg group-open:rotate-45 inline-block transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-gray-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-10 text-center">
        Secure payment via Stripe. All prices in USD. Questions?{' '}
        <Link href="/contact" className="text-brand-600 hover:underline">Contact us</Link>.
      </p>
    </div>
  )
}

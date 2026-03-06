import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shopify Profit Calculator – Calculate True Profit After All Fees',
  description:
    'Free calculators for Shopify store owners. Calculate true profit, fees, margins, and break-even points instantly. Factor in ad spend, COGS, and Shopify fees.',
}

const CALCULATORS = [
  {
    href: '/shopify-profit-calculator',
    title: 'Profit Calculator',
    description: 'True profit after all fees, costs, and ad spend.',
    icon: '💰',
  },
  {
    href: '/shopify-fees-calculator',
    title: 'Fees Calculator',
    description: 'Exact fee breakdown across all Shopify plans.',
    icon: '📊',
  },
  {
    href: '/shopify-ad-profit-calculator',
    title: 'Ad Profit Calculator',
    description: 'Is your Facebook or Google campaign actually profitable?',
    icon: '📢',
  },
  {
    href: '/shopify-margin-calculator',
    title: 'Margin Calculator',
    description: 'Price needed to hit your target profit margin.',
    icon: '📈',
  },
  {
    href: '/shopify-break-even-calculator',
    title: 'Break-Even Calculator',
    description: 'Sales needed to cover all your monthly costs.',
    icon: '⚖️',
  },
]

const TRUST = [
  { stat: 'Free', label: 'No credit card required' },
  { stat: '< 1s', label: 'Real-time results' },
  { stat: '5', label: 'Specialized calculators' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white py-20 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 rounded-full px-4 py-1.5 text-sm font-medium mb-6 border border-brand-200">
            🆓 Always free for Shopify sellers
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-5">
            Stop guessing your<br className="hidden sm:block" /> Shopify profits
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Revenue isn&apos;t profit. Calculate your true margins after Shopify fees,
            payment processing, shipping, and ad spend — in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/shopify-profit-calculator" className="btn-primary text-base px-8 py-3">
              Calculate My Profit →
            </Link>
            <Link href="/pricing" className="btn-secondary text-base px-8 py-3">
              See Pro Features
            </Link>
          </div>
        </div>
      </section>

      {/* Calculator Grid */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
          All Shopify Calculators — Free
        </h2>
        <p className="text-center text-gray-500 mb-10 text-sm">No login required to get started</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CALCULATORS.map((calc) => (
            <Link key={calc.href} href={calc.href}
              className="card hover:border-brand-400 hover:shadow-md transition group cursor-pointer">
              <span className="text-3xl mb-3 block">{calc.icon}</span>
              <h3 className="font-bold text-gray-900 mb-1.5 group-hover:text-brand-700 transition">
                {calc.title}
              </h3>
              <p className="text-sm text-gray-500">{calc.description}</p>
            </Link>
          ))}
          {/* Pro CTA card */}
          <Link href="/pricing"
            className="card border-brand-200 bg-brand-50 hover:border-brand-400 hover:shadow-md transition group cursor-pointer flex flex-col justify-between">
            <div>
              <span className="text-3xl mb-3 block">⭐</span>
              <h3 className="font-bold text-brand-800 mb-1.5">Pro Plan – $9/mo</h3>
              <p className="text-sm text-brand-700">Unlimited calculations, save history, export CSV/JSON.</p>
            </div>
            <span className="text-xs font-semibold text-brand-600 mt-4 group-hover:underline">View pricing →</span>
          </Link>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gray-50 border-y border-gray-200 py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-8 text-gray-700">Why Shopify sellers use this</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {TRUST.map((item) => (
              <div key={item.stat}>
                <div className="text-3xl font-bold text-brand-600 mb-1">{item.stat}</div>
                <div className="text-sm text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">The hidden costs most sellers miss</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: '💳', title: 'Processing Fees', desc: 'Shopify takes 2.9% + $0.30 on every sale. On a $50 sale, that\'s $1.75 gone before you see a cent.' },
            { icon: '🔄', title: 'Transaction Fees', desc: 'Using a third-party payment processor? Add another 0.5–2% on top of processing fees.' },
            { icon: '↩️', title: 'Refund Costs', desc: 'When you refund an order, Shopify keeps the processing fee. A 3% refund rate costs more than most people realise.' },
          ].map((item) => (
            <div key={item.title} className="card">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

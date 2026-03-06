import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About – Shopify Profit Calculator',
  description: 'Why we built Shopify Profit Calculator and how it helps store owners understand real profitability.',
  alternates: { canonical: '/about' },
}

const calculators = [
  ['/shopify-profit-calculator',       'Profit Calculator',     'True net profit after all fees and costs'],
  ['/shopify-fees-calculator',         'Fees Calculator',       'Exact per-transaction fee breakdown by plan'],
  ['/shopify-ad-profit-calculator',    'Ad Profit Calculator',  'Profitability after Facebook and Google ad spend'],
  ['/shopify-margin-calculator',       'Margin Calculator',     'Price needed to hit your target margin'],
  ['/shopify-break-even-calculator',   'Break-Even Calculator', 'Units needed to cover your monthly fixed costs'],
] as const

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">About Shopify Profit Calculator</h1>

      <p className="text-lg text-gray-600 mb-4 leading-relaxed">
        Most Shopify store owners know their revenue. Very few know their actual profit.
      </p>

      <p className="text-gray-600 mb-4 leading-relaxed">
        Between Shopify's processing fees, transaction fees, ad spend, product costs, shipping, and refunds —
        the gap between revenue and profit is often shocking. We built this tool to make that calculation
        instant, transparent, and free.
      </p>

      <p className="text-gray-600 mb-10 leading-relaxed">
        All calculators are real-time, formula-based, and don't require an account to use.
        No tracking, no upsells during calculations.
      </p>

      <h2 className="text-xl font-bold mb-4 text-gray-900">Our Calculators</h2>
      <div className="space-y-3 mb-10">
        {calculators.map(([href, title, desc]) => (
          <Link key={href} href={href}
            className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 p-4 rounded-xl border border-gray-200 hover:border-brand-400 hover:shadow-sm transition group">
            <span className="font-semibold text-brand-700 group-hover:text-brand-800 shrink-0">{title}</span>
            <span className="text-gray-500 text-sm">— {desc}</span>
          </Link>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 text-sm text-gray-500">
        <p>Not affiliated with Shopify Inc. "Shopify" is a trademark of Shopify Inc.</p>
        <p className="mt-2">
          Questions or feedback?{' '}
          <Link href="/contact" className="text-brand-600 hover:underline">Contact us</Link>.
        </p>
      </div>
    </div>
  )
}

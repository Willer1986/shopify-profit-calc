import type { Metadata } from 'next'
import { MarginCalculatorClient } from './MarginCalculatorClient'

export const metadata: Metadata = {
  title: 'Shopify Margin Calculator – Find Your Profit Margin',
  description:
    'Calculate your Shopify profit margin and find the right price to hit your target margin. Includes Shopify fees, ad spend, and COGS.',
  alternates: { canonical: '/shopify-margin-calculator' },
}

export default function MarginPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopify Margin Calculator</h1>
        <p className="text-gray-600 text-lg">
          Find your current profit margin and the price needed to hit your target.
        </p>
      </div>
      <MarginCalculatorClient />
      <section className="mt-12 card">
        <h2 className="text-xl font-bold mb-3">Margin vs Markup — What's the Difference?</h2>
        <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-600">
          <div>
            <p className="font-semibold text-gray-900 mb-1">Profit Margin</p>
            <p>Profit as a percentage of selling price. If you sell for $100 and profit $25, your margin is 25%.</p>
            <p className="font-mono mt-2 bg-gray-50 p-2 rounded text-xs">Margin = (Price – Costs) / Price × 100</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Markup</p>
            <p>Profit as a percentage of cost. If your cost is $75 and you sell for $100, your markup is 33%.</p>
            <p className="font-mono mt-2 bg-gray-50 p-2 rounded text-xs">Markup = (Price – Cost) / Cost × 100</p>
          </div>
        </div>
      </section>
    </div>
  )
}

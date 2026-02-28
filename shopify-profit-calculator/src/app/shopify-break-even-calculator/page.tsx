import type { Metadata } from 'next'
import { BreakEvenClient } from './BreakEvenClient'

export const metadata: Metadata = {
  title: 'Shopify Break-Even Calculator – How Many Sales to Break Even?',
  description:
    'Calculate how many Shopify sales you need to cover fixed costs and break even. Essential for budgeting and planning your Shopify store.',
  alternates: { canonical: '/shopify-break-even-calculator' },
}

export default function BreakEvenPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopify Break-Even Calculator</h1>
        <p className="text-gray-600 text-lg">
          Find exactly how many sales you need to cover all your costs.
        </p>
      </div>
      <BreakEvenClient />
      <section className="mt-12 card">
        <h2 className="text-xl font-bold mb-3">Break-Even Formula</h2>
        <p className="text-sm text-gray-600 mb-3">
          The break-even point is the number of units you must sell so that total revenue equals total
          costs — zero profit, zero loss.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
          <p>Break-Even Units = Fixed Costs ÷ Contribution Margin</p>
          <p className="text-gray-500 mt-1">Contribution Margin = Selling Price – Variable Costs per Unit</p>
        </div>
      </section>
    </div>
  )
}

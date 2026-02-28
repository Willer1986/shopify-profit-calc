import type { Metadata } from 'next'
import { ProfitCalculatorClient } from './ProfitCalculatorClient'
import { calculatorSchema, faqSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Shopify Profit Calculator – True Profit After All Fees',
  description:
    'Calculate your true Shopify profit. Factor in product cost, Shopify fees, payment processing, shipping, ad spend, and refunds. Free real-time calculator.',
  keywords: [
    'shopify profit calculator',
    'shopify profit margin calculator',
    'shopify net profit calculator',
    'shopify profit after fees',
  ].join(', '),
  alternates: { canonical: '/shopify-profit-calculator' },
}

const faqs = [
  {
    question: 'How does the Shopify profit calculator work?',
    answer:
      'Enter your selling price, product cost, shipping, Shopify plan, ad spend, and refund rate. The calculator subtracts all fees and costs to show your net profit and margin in real time.',
  },
  {
    question: 'What fees does Shopify charge per sale?',
    answer:
      'Shopify charges a payment processing fee (2.9% + $0.30 on Basic) and optionally a transaction fee (2% on Basic) if you don't use Shopify Payments. Advanced plans have lower rates.',
  },
  {
    question: 'What is a good profit margin for Shopify stores?',
    answer:
      'Most successful Shopify stores target 20-30%+ net profit margins. Margins below 15% leave little room for ad spend and growth. Below 10% is often unsustainable.',
  },
  {
    question: 'Does this include Shopify subscription cost?',
    answer:
      'The per-transaction calculator focuses on per-sale profitability. Your monthly Shopify subscription ($39–$399+) should be factored into your fixed overhead separately.',
  },
]

export default function ProfitCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            calculatorSchema(
              'Shopify Profit Calculator',
              'Calculate true Shopify profit after all fees and costs',
              '/shopify-profit-calculator'
            )
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopify Profit Calculator</h1>
          <p className="text-gray-600 text-lg">
            Enter your sale details below to see your true profit after all Shopify fees, costs, and
            ad spend.
          </p>
        </div>

        <ProfitCalculatorClient />

        {/* Formula Explanation */}
        <section className="mt-12 card">
          <h2 className="text-xl font-bold mb-4">How profit is calculated</h2>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-700 space-y-1">
            <p>Gross Revenue = Selling Price</p>
            <p>– Shopify Processing Fee (2.9% + $0.30 on Basic)</p>
            <p>– Transaction Fee (0–2% depending on plan)</p>
            <p>– Refund Reserve (Refund Rate × Price)</p>
            <p>– Product Cost (COGS)</p>
            <p>– Shipping Cost</p>
            <p>– Ad Spend</p>
            <p>– Other Costs</p>
            <p className="border-t border-gray-300 pt-2 font-bold text-gray-900">= Net Profit</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="card cursor-pointer">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-gray-400 ml-2">+</span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

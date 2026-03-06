import type { Metadata } from 'next'
import { AdProfitClient } from './AdProfitClient'
import { calculatorSchema, faqSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Shopify Ad Profit Calculator – Is Your Campaign Actually Profitable?',
  description:
    'Calculate your true Shopify profit after Facebook, Google, or TikTok ad spend. Enter ROAS, ad budget, COGS, and Shopify fees to see real campaign profitability.',
  keywords: [
    'shopify ad profit calculator',
    'shopify facebook ads profit',
    'shopify roas calculator',
    'shopify google ads profit',
    'shopify advertising profitability',
  ].join(', '),
  alternates: { canonical: '/shopify-ad-profit-calculator' },
}

const faqs = [
  {
    question: 'What ROAS do I need to be profitable on Shopify?',
    answer:
      'It depends on your margins. With 30% COGS, typical Shopify fees, and 3x ROAS, you might only break even. Most Shopify stores need 3–5x ROAS minimum. Use this calculator to find your specific break-even ROAS.',
  },
  {
    question: 'How do I calculate break-even ROAS?',
    answer:
      'Break-even ROAS = (COGS + Ad Spend + Other Costs) ÷ (Ad Spend × (1 − Shopify Fee Rate)). Our calculator does this automatically and accounts for your exact Shopify plan and fee structure.',
  },
  {
    question: 'Does ROAS include Shopify fees?',
    answer:
      'ROAS (Revenue ÷ Ad Spend) does not account for Shopify fees, COGS, or other costs. This is why many sellers with "good ROAS" are still unprofitable — fees eat into the revenue before you see profit.',
  },
  {
    question: 'What is a good ROAS for Shopify?',
    answer:
      'For most Shopify stores with 30–40% COGS and Basic plan fees, you need 3–4x ROAS to be profitable. Stores with higher margins can profit at lower ROAS. Use this calculator with your exact numbers.',
  },
]

export default function AdProfitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            calculatorSchema(
              'Shopify Ad Profit Calculator',
              'Calculate Shopify profitability after Facebook, Google, or TikTok ad spend',
              '/shopify-ad-profit-calculator'
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopify Ad Profit Calculator</h1>
          <p className="text-gray-600 text-lg">
            Revenue ≠ Profit. See exactly how much your Facebook, Google, or TikTok campaigns actually earn after Shopify fees.
          </p>
        </div>

        <AdProfitClient />

        <section className="mt-12 card">
          <h2 className="text-xl font-bold mb-4">Why ROAS Alone Is Misleading</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>
              <p className="font-semibold text-gray-900 mb-2">ROAS of 3x Example</p>
              <div className="space-y-1 font-mono text-xs bg-gray-50 p-3 rounded-lg">
                <p>Revenue:    $300</p>
                <p>COGS:       –$120 (40%)</p>
                <p>Ad Spend:   –$100</p>
                <p>Shopify:    –$9 (3%+$0.30)</p>
                <p className="border-t border-gray-300 pt-1 font-bold text-green-700">Profit: $71</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">24% margin ✓</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-2">ROAS of 2x Example</p>
              <div className="space-y-1 font-mono text-xs bg-gray-50 p-3 rounded-lg">
                <p>Revenue:    $200</p>
                <p>COGS:       –$120 (60%)</p>
                <p>Ad Spend:   –$100</p>
                <p>Shopify:    –$6</p>
                <p className="border-t border-gray-300 pt-1 font-bold text-red-700">Loss: –$26</p>
              </div>
              <p className="text-xs text-red-500 mt-2">High COGS = losing money at 2x ✗</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-2">What to Watch</p>
              <ul className="space-y-1 text-xs text-gray-600">
                <li>• Always calculate net profit, not just ROAS</li>
                <li>• Break-even ROAS varies by product margin</li>
                <li>• Shopify fees reduce your effective margin</li>
                <li>• Factor in refund rates on high-volume campaigns</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="card">
                <summary className="font-semibold text-gray-900 flex justify-between items-center">
                  {faq.question}
                  <span className="text-gray-400 ml-2 text-lg">+</span>
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

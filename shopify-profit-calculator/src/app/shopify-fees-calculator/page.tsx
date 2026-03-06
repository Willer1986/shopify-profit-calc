import type { Metadata } from 'next'
import { FeesCalculatorClient } from './FeesCalculatorClient'
import { calculatorSchema, faqSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Shopify Fees Calculator – See Exact Fees Per Sale',
  description:
    'Calculate exact Shopify fees per transaction. Compare payment processing fees, transaction fees across all Shopify plans. Free real-time calculator.',
  alternates: { canonical: '/shopify-fees-calculator' },
}

const faqs = [
  {
    question: 'What percentage does Shopify take per sale?',
    answer:
      'Shopify charges 2.9% + $0.30 on Basic plan with Shopify Payments. Plus 2% transaction fee if using a third-party payment processor. Higher plans have lower rates.',
  },
  {
    question: 'How can I avoid Shopify transaction fees?',
    answer:
      'Use Shopify Payments as your payment gateway. Shopify waives the 0.5–2% transaction fee when you process through their own payment system.',
  },
  {
    question: 'Does Shopify charge fees on refunds?',
    answer:
      'As of 2023, Shopify refunds the transaction fee portion but NOT the processing fee portion when you issue a refund. You lose the 2.9% + $0.30 on refunded orders.',
  },
]

export default function FeesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            calculatorSchema('Shopify Fees Calculator', 'Calculate exact Shopify fees per sale', '/shopify-fees-calculator')
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopify Fees Calculator</h1>
          <p className="text-gray-600 text-lg">
            See exactly how much Shopify takes per sale across every plan.
          </p>
        </div>

        <FeesCalculatorClient />

        <section className="mt-12 card">
          <h2 className="text-xl font-bold mb-4">Shopify Fee Structure</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-2 font-semibold">Plan</th>
                  <th className="px-4 py-2 font-semibold">Monthly</th>
                  <th className="px-4 py-2 font-semibold">Processing</th>
                  <th className="px-4 py-2 font-semibold">Transaction</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Basic', '$39', '2.9% + $0.30', '2%'],
                  ['Shopify', '$105', '2.6% + $0.30', '1%'],
                  ['Advanced', '$399', '2.4% + $0.30', '0%'],
                  ['Plus', '$2,300+', '2.15% + $0.30', '0%'],
                ].map(([plan, monthly, processing, transaction]) => (
                  <tr key={plan} className="border-t">
                    <td className="px-4 py-2 font-medium">{plan}</td>
                    <td className="px-4 py-2 text-center text-gray-600">{monthly}</td>
                    <td className="px-4 py-2 text-center text-gray-600">{processing}</td>
                    <td className="px-4 py-2 text-center text-gray-600">{transaction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            * Transaction fees are waived when using Shopify Payments.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="card cursor-pointer">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none">
                  {faq.question}
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

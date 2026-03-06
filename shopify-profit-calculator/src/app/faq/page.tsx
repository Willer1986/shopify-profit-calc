import type { Metadata } from 'next'
import { faqSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'FAQ – Shopify Profit Calculator',
  description: 'Frequently asked questions about calculating Shopify profit, fees, and margins.',
}

const faqs = [
  { question: 'Is this calculator free?', answer: 'Yes. All 5 calculators are free to use with 3 calculations/day. Create a free account to get more. Pro plan is $9/month for unlimited.' },
  { question: 'Are results accurate?', answer: 'Results are based on publicly available Shopify fee schedules. They are estimates — always verify with your actual Shopify admin and accountant.' },
  { question: 'Does this include VAT or sales tax?', answer: 'No. Tax obligations vary by location. This calculator shows profit before taxes. Consult a tax professional for your specific situation.' },
  { question: 'What Shopify plans does it support?', answer: 'Basic ($39/mo), Shopify ($105/mo), Advanced ($399/mo), and Plus ($2,300+/mo). Select your plan for accurate fee calculations.' },
  { question: 'Can I save my calculations?', answer: 'Yes, with a Pro account ($9/month). Free users can run up to 3 calculations per day without saving.' },
  { question: 'How is profit different from revenue?', answer: 'Revenue is what your customers pay. Profit is what you keep after subtracting all costs including Shopify fees, product costs, shipping, ad spend, and refunds.' },
  { question: 'What is a good profit margin for Shopify?', answer: 'Most successful Shopify stores target 20-35% net margins. Below 15% leaves little room for growth. Below 10% is often unsustainable with ad spend.' },
  { question: 'Does Shopify charge fees on refunds?', answer: 'As of recent updates, Shopify retains the payment processing fee on refunded orders (2.9% + $0.30 on Basic). Only the transaction fee portion is refunded.' },
]

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="card group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between">
                {faq.question}
                <span className="text-gray-400 ml-2 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-gray-600 text-sm">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </>
  )
}

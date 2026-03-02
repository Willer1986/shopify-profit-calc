import type { Metadata } from 'next'
import { ProfitCalculatorClient } from './ProfitCalculatorClient'
import { calculatorSchema, faqSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Shopify Profit Calculator - True Profit After All Fees',
  description: 'Calculate your true Shopify profit. Factor in product cost, Shopify fees, payment processing, shipping, and ad spend.',
  keywords: [
    'shopify profit calculator',
    'shopify profit margin calculator',
    'shopify fee calculator',
    'shopify net profit',
  ],
}

const faqs = [
  {
    question: 'What fees does Shopify charge per sale?',
    answer: 'Shopify charges a payment processing fee of 2.9% plus $0.30 on Basic plan. Higher plans have lower rates.',
  },
  {
    question: 'What is a good profit margin for Shopify stores?',
    answer: 'A healthy Shopify profit margin is 20-35% after all fees and costs.',
  },
  {
    question: 'How do I calculate true profit on Shopify?',
    answer: 'Subtract product cost, Shopify fees, payment processing fees, shipping, and ad spend from your revenue.',
  },
]

export default function ProfitCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema('profit')) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <ProfitCalculatorClient />
    </>
  )
}

import type { Metadata } from "next"
import { ProfitCalculatorClient } from "./ProfitCalculatorClient"
import { calculatorSchema, faqSchema } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Shopify Profit Calculator - True Profit After All Fees",
  description: "Calculate your true Shopify profit after all fees.",
  keywords: [
    "shopify profit calculator",
    "shopify profit margin",
    "shopify fee calculator",
  ],
}

const faqs = [
  {
    question: "What fees does Shopify charge per sale?",
    answer: "Shopify charges 2.9% plus 0.30 per transaction on Basic plan.",
  },
  {
    question: "What is a good profit margin for Shopify stores?",
    answer: "A healthy Shopify profit margin is 20 to 35 percent after all fees.",
  },
  {
    question: "How do I calculate true profit on Shopify?",
    answer: "Subtract product cost, Shopify fees, payment fees, shipping, and ad spend from revenue.",
  },
]

export default function ProfitCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema("profit")) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <ProfitCalculatorClient />
    </>
  )
}

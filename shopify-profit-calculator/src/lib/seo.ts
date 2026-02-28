import type { Metadata } from 'next'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://shopifyprofitcalculator.com'

export interface PageSEO {
  title: string
  description: string
  canonical: string
  keywords?: string[]
}

export function generateMetadata(seo: PageSEO): Metadata {
  return {
    title: `${seo.title} | Shopify Profit Calculator`,
    description: seo.description,
    keywords: seo.keywords?.join(', '),
    alternates: {
      canonical: `${APP_URL}${seo.canonical}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${APP_URL}${seo.canonical}`,
      siteName: 'Shopify Profit Calculator',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  }
}

export function calculatorSchema(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: `${APP_URL}${url}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Long-tail SEO page configs
export const LONG_TAIL_PAGES = [
  {
    slug: 'for-dropshipping',
    title: 'Shopify Profit Calculator for Dropshipping',
    description: 'Calculate true dropshipping profits on Shopify. Factor in supplier costs, shipping, Shopify fees, and ad spend to find your real margins.',
    keywords: ['shopify dropshipping profit', 'dropshipping profit calculator', 'shopify dropshipping margins'],
  },
  {
    slug: 'uk',
    title: 'Shopify Profit Calculator UK',
    description: 'UK Shopify profit calculator. Calculate profits in GBP accounting for Shopify fees, VAT considerations, and UK shipping costs.',
    keywords: ['shopify uk profit calculator', 'shopify profit uk', 'uk shopify margin calculator'],
  },
  {
    slug: 'with-facebook-ads',
    title: 'Shopify Profit Calculator with Facebook Ads',
    description: 'Calculate your Shopify profit after Facebook and Instagram ad spend. Factor in ROAS, CPM, and conversion rates to see true profitability.',
    keywords: ['shopify facebook ads profit', 'shopify profit after facebook ads', 'facebook ads roas calculator shopify'],
  },
  {
    slug: 'for-print-on-demand',
    title: 'Shopify Profit Calculator for Print on Demand',
    description: 'Calculate print on demand profits on Shopify. Factor in Printful/Printify costs, Shopify fees, and shipping to find real margins.',
    keywords: ['shopify print on demand profit', 'printful profit calculator', 'pod shopify margins'],
  },
  {
    slug: 'with-vat',
    title: 'Shopify Profit Calculator with VAT',
    description: 'Calculate Shopify profits including VAT. For EU and UK sellers who need to account for value-added tax in their profit calculations.',
    keywords: ['shopify profit vat', 'shopify vat calculator', 'shopify eu profit calculator'],
  },
]

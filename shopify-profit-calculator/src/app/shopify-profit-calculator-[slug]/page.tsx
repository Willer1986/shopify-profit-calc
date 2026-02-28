import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { LONG_TAIL_PAGES } from '@/lib/seo'
import { ProfitCalculatorClient } from '../shopify-profit-calculator/ProfitCalculatorClient'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return LONG_TAIL_PAGES.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = LONG_TAIL_PAGES.find((p) => p.slug === params.slug)
  if (!page) return {}

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords.join(', '),
    alternates: { canonical: `/shopify-profit-calculator-${page.slug}` },
  }
}

export default function LongTailPage({ params }: Props) {
  const page = LONG_TAIL_PAGES.find((p) => p.slug === params.slug)
  if (!page) notFound()

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          {' / '}
          <Link href="/shopify-profit-calculator" className="hover:text-brand-600">Profit Calculator</Link>
          {' / '}
          <span className="text-gray-700">{page.title}</span>
        </nav>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{page.title}</h1>
        <p className="text-gray-600 text-lg">{page.description}</p>
      </div>

      <ProfitCalculatorClient />

      <section className="mt-10 card">
        <h2 className="text-xl font-bold mb-3">Related Calculators</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { href: '/shopify-fees-calculator', label: 'Shopify Fees Calculator' },
            { href: '/shopify-ad-profit-calculator', label: 'Ad Profit Calculator' },
            { href: '/shopify-margin-calculator', label: 'Margin Calculator' },
            { href: '/shopify-break-even-calculator', label: 'Break-Even Calculator' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 hover:underline">
              → {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

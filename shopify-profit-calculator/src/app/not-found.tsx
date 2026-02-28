import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 – Page Not Found',
  robots: { index: false },
}

const CALCULATORS = [
  { href: '/shopify-profit-calculator', label: 'Profit Calculator' },
  { href: '/shopify-fees-calculator',   label: 'Fees Calculator' },
  { href: '/shopify-margin-calculator', label: 'Margin Calculator' },
]

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <div className="text-7xl font-bold text-gray-100 mb-4 select-none">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Page not found</h1>
        <p className="text-gray-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or was moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <Link href="/" className="btn-primary">← Go Home</Link>
          <Link href="/shopify-profit-calculator" className="btn-secondary">Try Calculator</Link>
        </div>
        <div className="text-sm text-gray-400">
          Popular:{' '}
          {CALCULATORS.map((c, i) => (
            <span key={c.href}>
              {i > 0 && ' · '}
              <Link href={c.href} className="text-brand-600 hover:underline">{c.label}</Link>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

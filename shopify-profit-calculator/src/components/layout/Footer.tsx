import Link from 'next/link'

const CALCULATORS = [
  ['/shopify-profit-calculator',     'Profit Calculator'],
  ['/shopify-fees-calculator',       'Fees Calculator'],
  ['/shopify-ad-profit-calculator',  'Ad Profit Calculator'],
  ['/shopify-margin-calculator',     'Margin Calculator'],
  ['/shopify-break-even-calculator', 'Break-Even Calculator'],
] as const

const COMPANY = [
  ['/about',   'About'],
  ['/pricing', 'Pricing'],
  ['/faq',     'FAQ'],
  ['/contact', 'Contact'],
] as const

const LEGAL = [
  ['/privacy',    'Privacy Policy'],
  ['/terms',      'Terms of Service'],
  ['/disclaimer', 'Disclaimer'],
] as const

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span>📊</span> Shopify Profit Calc
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Free calculators for Shopify store owners. Know your true profit, not just revenue.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <div className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Calculators</div>
            <ul className="space-y-2">
              {CALCULATORS.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-brand-600 transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Company</div>
            <ul className="space-y-2">
              {COMPANY.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-brand-600 transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Legal</div>
            <ul className="space-y-2">
              {LEGAL.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-brand-600 transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Shopify Profit Calculator. Not affiliated with Shopify Inc.</p>
          <p>Fee data is approximate — always verify in your Shopify admin.</p>
        </div>
      </div>
    </footer>
  )
}

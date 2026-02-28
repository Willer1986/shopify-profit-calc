import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { MobileNav } from './MobileNav'
import { LogoutButton } from './LogoutButton'

const NAV_LINKS = [
  { href: '/shopify-profit-calculator',     label: 'Profit' },
  { href: '/shopify-fees-calculator',       label: 'Fees' },
  { href: '/shopify-ad-profit-calculator',  label: 'Ad Profit' },
  { href: '/shopify-margin-calculator',     label: 'Margin' },
  { href: '/shopify-break-even-calculator', label: 'Break-Even' },
  { href: '/pricing',                       label: 'Pricing' },
]

export async function Navbar() {
  const user = await getSession()

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="font-bold text-gray-900 flex items-center gap-2 shrink-0 hover:opacity-80 transition">
          <span className="text-brand-600 text-xl">📊</span>
          <span className="hidden sm:inline text-sm font-semibold">Shopify Profit Calc</span>
          <span className="sm:hidden text-sm font-semibold">SPC</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5 text-sm flex-1 justify-center">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              className="px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition font-medium whitespace-nowrap">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {user ? (
            <>
              <span className="text-xs text-gray-400 hidden xl:block truncate max-w-[120px]">{user.email}</span>
              {user.plan === 'PRO' && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">PRO</span>
              )}
              <Link href="/dashboard" className="btn-secondary text-xs py-1.5 px-3">Dashboard</Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/auth/login" className="btn-secondary text-sm py-1.5">Log in</Link>
              <Link href="/auth/signup" className="btn-primary text-sm py-1.5">Sign up free</Link>
            </>
          )}
        </div>

        {/* Mobile menu */}
        <div className="lg:hidden">
          <MobileNav user={user ? { email: user.email, plan: user.plan } : null} links={NAV_LINKS} />
        </div>
      </nav>
    </header>
  )
}

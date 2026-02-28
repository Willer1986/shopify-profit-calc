'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Props {
  user: { email: string; plan: string } | null
  links: { href: string; label: string }[]
}

export function MobileNav({ user, links }: Props) {
  const [open, setOpen]   = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    setLoading(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
    router.refresh()
    setOpen(false)
    setLoading(false)
  }

  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="Open menu"
        className="p-2 rounded-lg hover:bg-gray-100 transition">
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative ml-auto w-72 bg-white h-full shadow-xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <span className="font-bold text-gray-900">📊 Shopify Profit Calc</span>
              <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-gray-100">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
              {links.map((link) => (
                <Link key={link.href} href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 font-medium text-sm transition">
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth */}
            <div className="px-4 py-4 border-t space-y-2">
              {user ? (
                <>
                  <p className="text-xs text-gray-500 mb-2">
                    {user.email} · <span className={user.plan === 'PRO' ? 'text-green-600 font-semibold' : 'text-gray-500'}>{user.plan}</span>
                  </p>
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="btn-secondary text-sm w-full text-center block">
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} disabled={loading}
                    className="w-full text-sm text-gray-600 hover:text-gray-900 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    {loading ? 'Logging out…' : 'Log out'}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setOpen(false)} className="btn-secondary text-sm w-full text-center block">
                    Log in
                  </Link>
                  <Link href="/auth/signup" onClick={() => setOpen(false)} className="btn-primary text-sm w-full text-center block">
                    Sign up free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

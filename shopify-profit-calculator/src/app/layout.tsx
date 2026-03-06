import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://shopifyprofitcalculator.com'

export const metadata: Metadata = {
  title: {
    default: 'Shopify Profit Calculator – Calculate True Profit After All Fees',
    template: '%s | Shopify Profit Calculator',
  },
  description:
    'Free Shopify profit calculator. Instantly calculate your true profit after Shopify fees, payment processing, shipping, and ad spend. Used by 10,000+ Shopify sellers.',
  keywords:
    'shopify profit calculator, shopify fees calculator, shopify margin calculator, shopify break even calculator, shopify ad profit calculator',
  metadataBase: new URL(APP_URL),
  openGraph: {
    type: 'website',
    siteName: 'Shopify Profit Calculator',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@shopifycalc',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: {
    // google: 'your-google-verification-code',  // Add after GSC setup
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-white text-gray-900 antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

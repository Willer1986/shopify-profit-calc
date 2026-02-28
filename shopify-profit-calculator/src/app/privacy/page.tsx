import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Shopify Profit Calculator.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 prose prose-slate max-w-none">
      <h1>Privacy Policy</h1>
      <p className="text-gray-500">Last updated: {new Date().getFullYear()}</p>

      <h2>Information We Collect</h2>
      <p>We collect email address and password (hashed) when you create an account. We do not collect financial data — all calculator inputs are processed client-side or in your browser session.</p>

      <h2>How We Use Your Information</h2>
      <p>We use your email to authenticate your account and send transactional emails (password reset, subscription updates). We do not sell your data to third parties.</p>

      <h2>Data Storage</h2>
      <p>Account data is stored securely on servers in the United States. Calculation history (Pro users only) is stored in our database and is only accessible by you.</p>

      <h2>Cookies</h2>
      <p>We use a single secure session cookie for authentication. No third-party tracking cookies.</p>

      <h2>Stripe</h2>
      <p>Payments are processed by Stripe. We do not store credit card information. Stripe's privacy policy applies to payment data.</p>

      <h2>Your Rights</h2>
      <p>You may request deletion of your account and all associated data at any time by emailing us.</p>

      <h2>Contact</h2>
      <p>Questions? Email: privacy@shopifyprofitcalculator.com</p>
    </div>
  )
}

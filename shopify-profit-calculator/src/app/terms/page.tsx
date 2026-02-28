import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms of Service' }

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 prose prose-slate max-w-none">
      <h1>Terms of Service</h1>
      <p className="text-gray-500">Last updated: {new Date().getFullYear()}</p>

      <h2>1. Use of Service</h2>
      <p>Shopify Profit Calculator provides calculator tools for informational purposes. Results are estimates only. You are responsible for verifying all figures with your actual Shopify account and financial advisor.</p>

      <h2>2. Free Plan Limits</h2>
      <p>Free accounts are limited to 3 calculations per day. Circumventing rate limits is prohibited.</p>

      <h2>3. Pro Subscriptions</h2>
      <p>Pro subscriptions are billed monthly at $9 USD. Subscriptions auto-renew until canceled. No refunds are provided for partial months.</p>

      <h2>4. Intellectual Property</h2>
      <p>All content, design, and code is the property of Shopify Profit Calculator. Not affiliated with Shopify Inc.</p>

      <h2>5. Disclaimer</h2>
      <p>We are not responsible for financial decisions made based on calculator results. Always verify with your accountant.</p>

      <h2>6. Changes</h2>
      <p>We may update these terms. Continued use constitutes acceptance.</p>

      <h2>Contact</h2>
      <p>legal@shopifyprofitcalculator.com</p>
    </div>
  )
}

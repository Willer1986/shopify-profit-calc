import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Disclaimer' }

export default function DisclaimerPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 prose prose-slate max-w-none">
      <h1>Disclaimer</h1>

      <h2>Not Financial Advice</h2>
      <p>The calculators on this site are for informational and educational purposes only. Nothing on this site constitutes financial, accounting, tax, or legal advice. Always consult a qualified professional before making business decisions.</p>

      <h2>No Affiliation with Shopify</h2>
      <p>Shopify Profit Calculator is an independent tool. We are not affiliated with, endorsed by, or sponsored by Shopify Inc. "Shopify" is a trademark of Shopify Inc.</p>

      <h2>Accuracy of Fee Data</h2>
      <p>Shopify fee rates are sourced from publicly available information and are subject to change. Always verify current rates in your Shopify admin. We are not liable for discrepancies between our estimates and your actual fees.</p>

      <h2>Limitation of Liability</h2>
      <p>To the fullest extent permitted by law, Shopify Profit Calculator shall not be liable for any financial losses or damages resulting from use of this tool.</p>
    </div>
  )
}

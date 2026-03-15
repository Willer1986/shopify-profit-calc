import type { Metadata } from 'next'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact – Shopify Profit Calculator',
  description: 'Get in touch with questions, feedback, or support requests.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-8">Questions, feedback, or need help? We reply within 24 hours.</p>
      <ContactForm />
      <p className="text-sm text-gray-400 mt-6 text-center">
        Or email:{' '}
        <a href="mailto:shoppifycalculatorprofit@gmail.com"
          className="text-brand-600 hover:underline">
          hello@shopifyprofitcalculator.com
        </a>
      </p>
    </div>
  )
}

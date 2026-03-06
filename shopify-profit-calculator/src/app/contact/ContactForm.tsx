'use client'

import { useState } from 'react'

export function ContactForm() {
  const [form, setForm]       = useState({ email: '', subject: '', message: '' })
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errMsg, setErrMsg]   = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ email: '', subject: '', message: '' })
      } else {
        const data = await res.json()
        setErrMsg(data.error || 'Failed to send. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="card text-center py-10">
        <p className="text-4xl mb-3">✅</p>
        <p className="font-semibold text-gray-900 text-lg mb-1">Message sent!</p>
        <p className="text-gray-500 text-sm">We&apos;ll get back to you within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      {errMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {errMsg}
        </div>
      )}
      <div>
        <label className="label">Email</label>
        <input type="email" required value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          className="input-field" placeholder="you@example.com" />
      </div>
      <div>
        <label className="label">Subject</label>
        <input type="text" required value={form.subject}
          onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
          className="input-field" placeholder="Question about Pro plan" />
      </div>
      <div>
        <label className="label">Message</label>
        <textarea required rows={4} value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          className="input-field resize-none" placeholder="Tell us how we can help…" />
      </div>
      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full">
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}

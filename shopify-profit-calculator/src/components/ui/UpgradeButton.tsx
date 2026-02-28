'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  isLoggedIn: boolean
  label?: string
  className?: string
}

export function UpgradeButton({ isLoggedIn, label = 'Upgrade to Pro – $9/mo', className }: Props) {
  const router  = useRouter()
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  async function handleUpgrade() {
    if (!isLoggedIn) {
      router.push('/auth/signup?next=upgrade')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res  = await fetch('/api/stripe/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Failed to start checkout')
        setLoading(false)
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={handleUpgrade} disabled={loading}
        className={`btn-primary w-full ${className ?? ''}`}>
        {loading ? 'Redirecting to checkout…' : label}
      </button>
      {error && <p className="text-red-600 text-xs mt-2 text-center">{error}</p>}
    </div>
  )
}

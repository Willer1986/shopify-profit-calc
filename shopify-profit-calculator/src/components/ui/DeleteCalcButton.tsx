'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

export function DeleteCalcButton({ id }: { id: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [confirmed, setConfirmed] = useState(false)

  async function handleDelete() {
    if (!confirmed) { setConfirmed(true); return }
    const res = await fetch(`/api/calculations?id=${id}`, { method: 'DELETE' })
    if (res.ok) {
      startTransition(() => { router.refresh() })
    }
    setConfirmed(false)
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className={`text-xs px-2 py-1 rounded transition ${
        confirmed
          ? 'bg-red-600 text-white hover:bg-red-700'
          : 'text-red-400 hover:text-red-600 hover:bg-red-50'
      }`}
    >
      {isPending ? '…' : confirmed ? 'Confirm?' : 'Delete'}
    </button>
  )
}

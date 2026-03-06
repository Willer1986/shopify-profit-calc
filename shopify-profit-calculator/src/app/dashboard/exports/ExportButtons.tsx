'use client'

import { useState } from 'react'

interface Calculation {
  id: string
  type: string
  name: string | null
  createdAt: string
  inputs: Record<string, unknown>
  results: Record<string, unknown>
}

const TYPE_LABELS: Record<string, string> = {
  PROFIT:     'Profit Calculator',
  FEES:       'Fees Calculator',
  AD_PROFIT:  'Ad Profit Calculator',
  MARGIN:     'Margin Calculator',
  BREAK_EVEN: 'Break-Even Calculator',
}

function toCSV(calculations: Calculation[]): string {
  const rows: string[][] = []

  // Header
  rows.push(['ID', 'Type', 'Name', 'Date', 'Input Keys / Values', 'Result Keys / Values'])

  calculations.forEach((c) => {
    const inputStr = Object.entries(c.inputs)
      .map(([k, v]) => `${k}: ${v}`)
      .join(' | ')
    const resultStr = Object.entries(c.results)
      .map(([k, v]) => `${k}: ${v}`)
      .join(' | ')
    rows.push([
      c.id,
      TYPE_LABELS[c.type] || c.type,
      c.name || '',
      new Date(c.createdAt).toLocaleDateString(),
      inputStr,
      resultStr,
    ])
  })

  return rows
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function ExportButtons({ calculations }: { calculations: Calculation[] }) {
  const [filter, setFilter] = useState<string>('ALL')

  const filtered = filter === 'ALL'
    ? calculations
    : calculations.filter((c) => c.type === filter)

  function handleCSV() {
    const csv      = toCSV(filtered)
    const filename = `shopify-calculations-${new Date().toISOString().slice(0, 10)}.csv`
    downloadFile(csv, filename, 'text/csv;charset=utf-8;')
  }

  function handleJSON() {
    const json     = JSON.stringify(filtered, null, 2)
    const filename = `shopify-calculations-${new Date().toISOString().slice(0, 10)}.json`
    downloadFile(json, filename, 'application/json')
  }

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="card">
        <h2 className="font-bold mb-3">Filter by Calculator Type</h2>
        <div className="flex flex-wrap gap-2">
          {['ALL', 'PROFIT', 'FEES', 'AD_PROFIT', 'MARGIN', 'BREAK_EVEN'].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                filter === t
                  ? 'bg-brand-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t === 'ALL' ? 'All Types' : TYPE_LABELS[t]}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">{filtered.length} calculations selected</p>
      </div>

      {/* Export options */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card text-center">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="font-bold mb-1">CSV Export</h3>
          <p className="text-sm text-gray-500 mb-4">Open in Excel, Google Sheets, or any spreadsheet app.</p>
          <button onClick={handleCSV} className="btn-primary w-full">
            Download CSV
          </button>
        </div>
        <div className="card text-center">
          <div className="text-3xl mb-3">📁</div>
          <h3 className="font-bold mb-1">JSON Export</h3>
          <p className="text-sm text-gray-500 mb-4">Full structured data including all inputs and results.</p>
          <button onClick={handleJSON} className="btn-secondary w-full">
            Download JSON
          </button>
        </div>
      </div>

      {/* Preview table */}
      <div className="card overflow-x-auto">
        <h2 className="font-bold mb-4">Preview</h2>
        <table className="w-full text-sm min-w-[500px]">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-3 py-2 font-semibold text-gray-700">Type</th>
              <th className="px-3 py-2 font-semibold text-gray-700">Name</th>
              <th className="px-3 py-2 font-semibold text-gray-700">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-3 py-2 text-gray-600">{TYPE_LABELS[c.type] || c.type}</td>
                <td className="px-3 py-2 text-gray-700 font-medium">{c.name || '—'}</td>
                <td className="px-3 py-2 text-gray-400 text-xs">
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

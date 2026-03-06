'use client'

import React from 'react'

// ─── Tooltip ──────────────────────────────────────────────────────────────────
function Tooltip({ text }: { text: string }) {
  return (
    <span className="group relative cursor-help ml-1.5 inline-flex items-center">
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-[10px] text-gray-600 font-bold leading-none select-none">
        ?
      </span>
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-60 rounded-lg bg-gray-800 px-3 py-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-xl">
        {text}
        <span className="absolute left-1/2 -translate-x-1/2 top-full border-4 border-transparent border-t-gray-800" />
      </span>
    </span>
  )
}

// ─── CalcInput ────────────────────────────────────────────────────────────────
interface InputProps {
  label: string
  value: number
  onChange: (val: number) => void
  prefix?: string
  suffix?: string
  tooltip?: string
  min?: number
  max?: number
  step?: number
  placeholder?: string
  helperText?: string
}

export function CalcInput({
  label, value, onChange, prefix, suffix, tooltip,
  min = 0, max, step = 0.01, placeholder = '0.00', helperText,
}: InputProps) {
  return (
    <div>
      <label className="label flex items-center">
        {label}
        {tooltip && <Tooltip text={tooltip} />}
      </label>
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-gray-500 text-sm font-medium pointer-events-none select-none z-10">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value === 0 ? '' : value}
          onChange={(e) => {
            const raw = e.target.value
            if (raw === '' || raw === '-') { onChange(0); return }
            const v = parseFloat(raw)
            if (!isNaN(v)) {
              const clamped = max !== undefined ? Math.min(v, max) : v
              onChange(Math.max(min, clamped))
            }
          }}
          onBlur={(e) => {
            if (e.target.value === '') onChange(0)
          }}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className={`input-field ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-10' : ''}`}
        />
        {suffix && (
          <span className="absolute right-3 text-gray-500 text-sm pointer-events-none select-none">
            {suffix}
          </span>
        )}
      </div>
      {helperText && <p className="text-xs text-gray-400 mt-1">{helperText}</p>}
    </div>
  )
}

// ─── CalcSelect ───────────────────────────────────────────────────────────────
interface SelectProps {
  label: string
  value: string
  onChange: (val: string) => void
  options: { value: string; label: string }[]
  tooltip?: string
}

export function CalcSelect({ label, value, onChange, options, tooltip }: SelectProps) {
  return (
    <div>
      <label className="label flex items-center">
        {label}
        {tooltip && <Tooltip text={tooltip} />}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field bg-white cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

// ─── CalcToggle ───────────────────────────────────────────────────────────────
interface ToggleProps {
  label: string
  value: boolean
  onChange: (val: boolean) => void
  tooltip?: string
  helperText?: string
}

export function CalcToggle({ label, value, onChange, tooltip, helperText }: ToggleProps) {
  const id = `toggle-${label.replace(/\s+/g, '-').toLowerCase()}`
  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="label mb-0 flex items-center cursor-pointer select-none">
          {label}
          {tooltip && <Tooltip text={tooltip} />}
        </label>
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={value}
          onClick={() => onChange(!value)}
          className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
            value ? 'bg-brand-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
              value ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
      {helperText && <p className="text-xs text-gray-400 mt-1">{helperText}</p>}
    </div>
  )
}

// ─── ResultRow ────────────────────────────────────────────────────────────────
interface ResultRowProps {
  label: string
  value: string
  isTotal?: boolean
  isPositive?: boolean
  isNegative?: boolean
  tooltip?: string
}

export function ResultRow({ label, value, isTotal, isPositive, isNegative, tooltip }: ResultRowProps) {
  return (
    <div className={`flex justify-between items-center py-2 border-b border-gray-100 last:border-0 ${isTotal ? 'mt-1' : ''}`}>
      <span className={`flex items-center gap-1 text-sm ${isTotal ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
        {label}
        {tooltip && <Tooltip text={tooltip} />}
      </span>
      <span className={`text-sm tabular-nums ${
        isTotal
          ? `font-bold text-base ${isNegative ? 'text-red-600' : isPositive ? 'text-green-600' : 'text-gray-900'}`
          : isPositive ? 'font-semibold text-green-600'
          : isNegative ? 'font-semibold text-red-600'
          : 'font-medium text-gray-900'
      }`}>
        {value}
      </span>
    </div>
  )
}

// ─── ProfitBadge ──────────────────────────────────────────────────────────────
export function ProfitBadge({ margin }: { margin: number }) {
  const config =
    margin >= 30 ? { color: 'bg-green-100 text-green-700 border-green-200',   label: '✓ Excellent' }
    : margin >= 20 ? { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', label: '✓ Good' }
    : margin >= 10 ? { color: 'bg-yellow-100 text-yellow-700 border-yellow-200',    label: '⚠ Low' }
    : margin >= 0  ? { color: 'bg-orange-100 text-orange-700 border-orange-200',    label: '⚠ Very Low' }
    :                { color: 'bg-red-100 text-red-700 border-red-200',             label: '✗ Loss' }

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-semibold ${config.color}`}>
      {config.label} ({margin.toFixed(1)}%)
    </span>
  )
}

// ─── SectionHeader ────────────────────────────────────────────────────────────
export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="border-b border-gray-100 pb-3 mb-4">
      <h2 className="font-bold text-gray-900 text-base">{title}</h2>
      {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  )
}

// ─── KpiCard ─────────────────────────────────────────────────────────────────
export function KpiCard({
  value, label, color = 'text-gray-900',
}: { value: string; label: string; color?: string }) {
  return (
    <div className="card text-center py-4">
      <div className={`text-xl font-bold tabular-nums ${color}`}>{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  )
}

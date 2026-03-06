'use client'

import { useState, useMemo } from 'react'
import {
  CalcInput, CalcSelect, CalcToggle,
  ResultRow, ProfitBadge, SectionHeader, KpiCard,
} from '@/components/calculators/CalcInputs'
import { calculateProfit, formatCurrency, formatPercent, SHOPIFY_FEES } from '@/lib/calculators'
import type { ProfitInputs } from '@/lib/calculators'

const PLAN_OPTIONS = (Object.keys(SHOPIFY_FEES) as (keyof typeof SHOPIFY_FEES)[]).map((key) => ({
  value: key,
  label: `${key.charAt(0).toUpperCase() + key.slice(1)} ($${SHOPIFY_FEES[key].monthly}/mo)`,
}))

const DEFAULT_INPUTS: ProfitInputs = {
  sellingPrice:      49.99,
  productCost:       15,
  shippingCost:      5,
  shopifyPlan:       'basic',
  useShopifyPayments: true,
  adSpend:           8,
  refundRate:        2,
  otherCosts:        2,
}

export function ProfitCalculatorClient() {
  const [inputs, setInputs] = useState<ProfitInputs>(DEFAULT_INPUTS)
  const [saving,   setSaving]   = useState(false)
  const [savedMsg, setSavedMsg] = useState('')

  const setNum = (key: keyof ProfitInputs) => (val: number) =>
    setInputs((prev) => ({ ...prev, [key]: val }))

  const results  = useMemo(() => calculateProfit(inputs), [inputs])
  const isProfit = results.netProfit >= 0

  async function handleSave() {
    setSaving(true)
    setSavedMsg('')
    try {
      const res  = await fetch('/api/calculations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'PROFIT', inputs, results }),
      })
      const data = await res.json()
      if (res.status === 429) {
        setSavedMsg(data.upgradeRequired ? '⚠️ Daily limit reached. Upgrade to Pro for unlimited.' : (data.error ?? ''))
      } else if (res.ok) {
        setSavedMsg('✓ Saved to dashboard')
      } else if (res.status === 401) {
        setSavedMsg('Please log in to save calculations.')
      } else {
        setSavedMsg('Failed to save. Please try again.')
      }
    } catch {
      setSavedMsg('Network error. Please try again.')
    } finally {
      setSaving(false)
      setTimeout(() => setSavedMsg(''), 5000)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Inputs */}
      <div className="card space-y-4">
        <SectionHeader title="Sale Details" subtitle="Enter your costs and Shopify settings" />

        <CalcInput label="Selling Price" value={inputs.sellingPrice} onChange={setNum('sellingPrice')}
          prefix="$" tooltip="The price your customer pays at checkout" />
        <CalcInput label="Product Cost (COGS)" value={inputs.productCost} onChange={setNum('productCost')}
          prefix="$" tooltip="What you pay your supplier per unit including packaging" />
        <CalcInput label="Shipping Cost" value={inputs.shippingCost} onChange={setNum('shippingCost')}
          prefix="$" tooltip="Your actual fulfillment cost per order. Set 0 if offering free shipping funded by margin." />
        <CalcSelect label="Shopify Plan" value={inputs.shopifyPlan}
          onChange={(v) => setInputs((p) => ({ ...p, shopifyPlan: v as ProfitInputs['shopifyPlan'] }))}
          options={PLAN_OPTIONS} tooltip="Your current Shopify subscription plan affects fee rates" />
        <CalcToggle
          label="Using Shopify Payments?"
          value={inputs.useShopifyPayments}
          onChange={(v) => setInputs((p) => ({ ...p, useShopifyPayments: v }))}
          tooltip="Shopify Payments waives the extra transaction fee (0.5–2%). Highly recommended."
          helperText={inputs.useShopifyPayments ? '✓ Transaction fee waived' : `⚠ +${(SHOPIFY_FEES[inputs.shopifyPlan].transactionFee * 100).toFixed(1)}% extra transaction fee applies`}
        />
        <CalcInput label="Ad Spend Per Sale" value={inputs.adSpend} onChange={setNum('adSpend')}
          prefix="$" tooltip="Average Facebook/Google/TikTok cost to acquire this single sale (Total Ad Spend ÷ Orders)" />
        <CalcInput label="Refund Rate" value={inputs.refundRate} onChange={setNum('refundRate')}
          suffix="%" step={0.5} max={100}
          tooltip="% of orders that get refunded. Industry average: 1–5%. Shopify keeps the processing fee on refunds."
          helperText="Industry average: 1–5%" />
        <CalcInput label="Other Costs Per Sale" value={inputs.otherCosts} onChange={setNum('otherCosts')}
          prefix="$" tooltip="Apps, customer support, packaging inserts — amortized per order" />
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-900">Profit Breakdown</h2>
            <ProfitBadge margin={results.profitMargin} />
          </div>

          <ResultRow label="Selling Price" value={formatCurrency(results.grossRevenue)} />
          <ResultRow label="Processing Fee"
            value={`–${formatCurrency(results.processingFee)}`}
            tooltip={`${(SHOPIFY_FEES[inputs.shopifyPlan].processingFee * 100).toFixed(1)}% + $0.30 per transaction`}
            isNegative />
          {results.shopifyFee > 0 && (
            <ResultRow label="Transaction Fee"
              value={`–${formatCurrency(results.shopifyFee)}`}
              tooltip="Applies only when NOT using Shopify Payments. Switch to save this amount."
              isNegative />
          )}
          {results.refundCost > 0 && (
            <ResultRow label="Refund Reserve"
              value={`–${formatCurrency(results.refundCost)}`}
              tooltip={`${inputs.refundRate}% of selling price set aside for refunds`}
              isNegative />
          )}
          <ResultRow label="Net Revenue" value={formatCurrency(results.netRevenue)}
            tooltip="What Shopify deposits after all fees" />

          <div className="mt-3 pt-3 border-t border-gray-100">
            <ResultRow label="Product + Shipping" value={`–${formatCurrency(results.cogs)}`} isNegative />
            {results.adCost > 0 && (
              <ResultRow label="Ad Spend" value={`–${formatCurrency(results.adCost)}`} isNegative />
            )}
            {results.otherCosts > 0 && (
              <ResultRow label="Other Costs" value={`–${formatCurrency(results.otherCosts)}`} isNegative />
            )}
          </div>

          <div className="mt-3 pt-3 border-t-2 border-gray-300">
            <ResultRow
              label="Net Profit"
              value={formatCurrency(results.netProfit)}
              isTotal isPositive={isProfit} isNegative={!isProfit}
            />
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-3">
          <KpiCard
            value={formatPercent(results.profitMargin)}
            label="Net Margin"
            color={results.profitMargin >= 15 ? 'text-green-600' : 'text-red-600'}
          />
          <KpiCard
            value={formatPercent(results.roi)}
            label="ROI"
            color={results.roi >= 0 ? 'text-green-600' : 'text-red-600'}
          />
          <KpiCard value={formatCurrency(results.totalCosts)} label="Total Costs" />
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button onClick={handleSave} disabled={saving} className="btn-secondary text-sm flex-1">
            {saving ? 'Saving…' : '💾 Save Calculation'}
          </button>
          <button onClick={() => setInputs(DEFAULT_INPUTS)} className="btn-secondary text-sm px-4">
            Reset
          </button>
        </div>

        {savedMsg && (
          <p className={`text-sm text-center ${savedMsg.startsWith('✓') ? 'text-green-600' : 'text-amber-600'}`}>
            {savedMsg}
          </p>
        )}

        {!isProfit && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            <p className="font-semibold mb-1">⚠️ You&apos;re losing money on each sale</p>
            <p className="text-xs text-red-600">Try raising your price, reducing COGS, or cutting ad spend.</p>
          </div>
        )}

        {isProfit && results.profitMargin < 10 && (
          <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-700">
            <p className="font-semibold mb-1">⚠️ Margin is very thin</p>
            <p className="text-xs text-amber-600">Below 10% leaves little room for ad spend or unexpected costs.</p>
          </div>
        )}
      </div>
    </div>
  )
}

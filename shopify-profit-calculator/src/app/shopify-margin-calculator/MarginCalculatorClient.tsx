'use client'

import { useState, useMemo } from 'react'
import { CalcInput, CalcSelect, CalcToggle, ResultRow, SectionHeader, KpiCard } from '@/components/calculators/CalcInputs'
import { calculateMargin, formatCurrency, formatPercent, SHOPIFY_FEES } from '@/lib/calculators'
import type { ShopifyPlan } from '@/lib/calculators'

const PLAN_OPTIONS = (Object.keys(SHOPIFY_FEES) as ShopifyPlan[]).map((k) => ({
  value: k,
  label: `${k.charAt(0).toUpperCase() + k.slice(1)} ($${SHOPIFY_FEES[k].monthly}/mo)`,
}))

export function MarginCalculatorClient() {
  const [sellingPrice, setSellingPrice] = useState(49.99)
  const [cogs,         setCogs]         = useState(15)
  const [plan,         setPlan]         = useState<ShopifyPlan>('basic')
  const [useSP,        setUseSP]        = useState(true)
  const [adSpend,      setAdSpend]      = useState(8)
  const [otherCosts,   setOther]        = useState(2)
  const [targetMargin, setTarget]       = useState(30)

  const r = useMemo(
    () => calculateMargin({ sellingPrice, cogs, shopifyPlan: plan,
                            useShopifyPayments: useSP, adSpend, otherCosts, targetMargin }),
    [sellingPrice, cogs, plan, useSP, adSpend, otherCosts, targetMargin]
  )

  const priceDiff    = r.priceForTargetMargin - sellingPrice
  const isAchievable = r.priceForTargetMargin > 0

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Inputs */}
      <div className="card space-y-4">
        <SectionHeader title="Product Details" subtitle="Enter costs to see your current and target margins" />

        <CalcInput label="Selling Price" value={sellingPrice} onChange={setSellingPrice} prefix="$" />
        <CalcInput label="Product Cost (COGS)" value={cogs} onChange={setCogs} prefix="$"
          tooltip="Supplier cost + packaging per unit" />
        <CalcSelect label="Shopify Plan" value={plan}
          onChange={(v) => setPlan(v as ShopifyPlan)} options={PLAN_OPTIONS} />
        <CalcToggle label="Using Shopify Payments?" value={useSP} onChange={setUseSP}
          tooltip="Waives the extra transaction fee" />
        <CalcInput label="Ad Spend Per Sale" value={adSpend} onChange={setAdSpend} prefix="$"
          tooltip="Your average customer acquisition cost per order" />
        <CalcInput label="Other Costs Per Sale" value={otherCosts} onChange={setOther} prefix="$"
          tooltip="Apps, support, packaging inserts, etc. amortized per order" />

        <div className="border-t border-gray-100 pt-4">
          <CalcInput
            label="Target Profit Margin"
            value={targetMargin}
            onChange={setTarget}
            suffix="%" step={1} min={1} max={95}
            tooltip="The margin % you want to achieve. Most healthy Shopify stores target 20–35%."
            helperText="Recommended: 20–35% for sustainable growth"
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="card">
          <SectionHeader title="Margin Analysis" />

          <ResultRow label="Selling Price" value={formatCurrency(sellingPrice)} />
          <ResultRow label="Shopify Fees" value={`–${formatCurrency(r.totalFees)}`} isNegative
            tooltip={`Processing + ${useSP ? '0' : SHOPIFY_FEES[plan].transactionFee * 100}% transaction fee`} />
          <ResultRow label="COGS + Ad + Other" value={`–${formatCurrency(cogs + adSpend + otherCosts)}`} isNegative />
          <div className="pt-3 border-t-2 border-gray-300 mt-1">
            <ResultRow label="Gross Profit" value={formatCurrency(r.grossProfit)}
              isTotal isPositive={r.grossProfit >= 0} isNegative={r.grossProfit < 0} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <KpiCard
            value={formatPercent(r.currentMargin)}
            label="Current Margin"
            color={r.currentMargin >= 20 ? 'text-green-600' : r.currentMargin >= 0 ? 'text-orange-600' : 'text-red-600'}
          />
          <KpiCard value={formatPercent(r.currentMarkup)} label="Markup on Cost" />
        </div>

        {/* Target price card */}
        <div className={`card border-2 ${isAchievable ? 'border-brand-200 bg-brand-50' : 'border-red-200 bg-red-50'}`}>
          {isAchievable ? (
            <>
              <p className="text-sm font-medium text-brand-700 mb-2">
                Price needed for <strong>{targetMargin}%</strong> margin:
              </p>
              <div className="text-4xl font-bold text-brand-700 tabular-nums mb-2">
                {formatCurrency(r.priceForTargetMargin)}
              </div>
              <p className="text-xs text-brand-600">
                {priceDiff > 0
                  ? `↑ ${formatCurrency(priceDiff)} more than your current price`
                  : `↓ ${formatCurrency(Math.abs(priceDiff))} less than your current price — you're already above target`}
              </p>
              {priceDiff > 0 && (
                <div className="mt-3 bg-white/60 rounded-lg px-3 py-2 text-xs text-gray-600">
                  Consider A/B testing{' '}
                  <strong>{formatCurrency(r.priceForTargetMargin)}</strong> vs your current{' '}
                  <strong>{formatCurrency(sellingPrice)}</strong> — a{' '}
                  {formatPercent((priceDiff / sellingPrice) * 100, 0)} price increase.
                </div>
              )}
            </>
          ) : (
            <div className="text-sm text-red-700">
              <p className="font-semibold mb-1">⚠️ {targetMargin}% margin not achievable</p>
              <p className="text-xs text-red-600">Your costs exceed what&apos;s possible at this margin. Lower COGS, cut ad spend, or reduce target margin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

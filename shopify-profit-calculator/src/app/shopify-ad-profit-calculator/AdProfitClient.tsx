'use client'

import { useState, useMemo } from 'react'
import { CalcInput, CalcSelect, CalcToggle, ResultRow, SectionHeader, KpiCard } from '@/components/calculators/CalcInputs'
import { calculateAdProfit, formatCurrency, formatPercent, SHOPIFY_FEES } from '@/lib/calculators'
import type { ShopifyPlan } from '@/lib/calculators'

const PLAN_OPTIONS = (Object.keys(SHOPIFY_FEES) as ShopifyPlan[]).map((k) => ({
  value: k,
  label: `${k.charAt(0).toUpperCase() + k.slice(1)} ($${SHOPIFY_FEES[k].monthly}/mo)`,
}))

export function AdProfitClient() {
  const [adSpend,   setAdSpend]   = useState(500)
  const [roas,      setRoas]      = useState(3)
  const [aov,       setAov]       = useState(49.99)
  const [cogs,      setCogs]      = useState(350)   // total COGS for campaign
  const [plan,      setPlan]      = useState<ShopifyPlan>('basic')
  const [useSP,     setUseSP]     = useState(true)
  const [otherCosts, setOther]    = useState(50)

  const r = useMemo(
    () => calculateAdProfit({ adSpend, roas, averageOrderValue: aov, cogs, shopifyPlan: plan,
                              useShopifyPayments: useSP, otherCosts }),
    [adSpend, roas, aov, cogs, plan, useSP, otherCosts]
  )

  const isProfit      = r.netProfit >= 0
  const roasIsAboveBE = r.breakEvenRoas > 0 && roas >= r.breakEvenRoas

  async function handleSave() {
    try {
      await fetch('/api/calculations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'AD_PROFIT', inputs: { adSpend, roas, aov, cogs, plan, useSP, otherCosts }, results: r }),
      })
    } catch { /* noop */ }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Inputs */}
      <div className="card space-y-4">
        <SectionHeader title="Campaign Details" subtitle="Enter your ad spend and campaign performance" />

        <CalcInput label="Total Ad Spend" value={adSpend} onChange={setAdSpend} prefix="$"
          tooltip="Total Facebook/Google/TikTok spend for this campaign period" />
        <CalcInput label="ROAS (Return on Ad Spend)" value={roas} onChange={setRoas} suffix="x" step={0.1} min={0}
          tooltip="Revenue ÷ Ad Spend. Example: $1,500 revenue on $500 spend = 3x ROAS"
          helperText={`Revenue generated: ${formatCurrency(adSpend * roas)}`} />
        <CalcInput label="Average Order Value (AOV)" value={aov} onChange={setAov} prefix="$"
          tooltip="Your typical order value — used to estimate order count from this campaign" />
        <CalcInput label="Total COGS for Campaign" value={cogs} onChange={setCogs} prefix="$"
          tooltip="Product + shipping cost for ALL orders this campaign generated. Estimate: AOV × COGS% × orders"
          helperText={r.estimatedOrders > 0 ? `~${r.estimatedOrders} estimated orders` : ''} />
        <CalcSelect label="Shopify Plan" value={plan}
          onChange={(v) => setPlan(v as ShopifyPlan)} options={PLAN_OPTIONS} />
        <CalcToggle label="Using Shopify Payments?" value={useSP} onChange={setUseSP}
          tooltip="Waives the extra transaction fee per order" />
        <CalcInput label="Other Campaign Costs" value={otherCosts} onChange={setOther} prefix="$"
          tooltip="Creative production, agency fees, tools — any costs tied to this campaign" />
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="card">
          <SectionHeader title="Campaign Profitability" />

          <ResultRow label="Total Revenue" value={formatCurrency(r.revenue)}
            tooltip={`${formatCurrency(adSpend)} × ${roas}x ROAS`} />
          <ResultRow label={`Estimated Orders (${r.estimatedOrders})`}
            value={`@ ${formatCurrency(aov)} AOV`} />
          <ResultRow label="Shopify Fees" value={`–${formatCurrency(r.shopifyFees)}`} isNegative
            tooltip="Processing + transaction fees across all orders" />
          <ResultRow label="COGS" value={`–${formatCurrency(r.totalCogs)}`} isNegative />
          <ResultRow label="Ad Spend" value={`–${formatCurrency(r.adSpend)}`} isNegative />
          {r.otherCosts > 0 && (
            <ResultRow label="Other Costs" value={`–${formatCurrency(r.otherCosts)}`} isNegative />
          )}

          <div className="pt-3 mt-1 border-t-2 border-gray-300">
            <ResultRow label="Net Profit" value={formatCurrency(r.netProfit)}
              isTotal isPositive={isProfit} isNegative={!isProfit} />
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-3">
          <KpiCard
            value={formatPercent(r.margin)}
            label="Net Margin"
            color={r.margin >= 10 ? 'text-green-600' : 'text-red-600'}
          />
          <KpiCard
            value={formatPercent(r.roi)}
            label="ROI on Ads"
            color={r.roi >= 0 ? 'text-green-600' : 'text-red-600'}
          />
          <KpiCard value={formatCurrency(r.revenue / (r.estimatedOrders || 1))} label="Rev / Order" />
        </div>

        {/* Break-even ROAS */}
        <div className={`card border-2 ${roasIsAboveBE ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-800 text-sm">Break-Even ROAS</span>
            <span className={`text-2xl font-bold tabular-nums ${roasIsAboveBE ? 'text-green-700' : 'text-amber-700'}`}>
              {r.breakEvenRoas.toFixed(1)}x
            </span>
          </div>
          <p className="text-xs text-gray-600">
            {roasIsAboveBE
              ? `✓ Your ROAS of ${roas}x is above break-even — you're profitable at this ROAS`
              : `⚠ You need ROAS ≥ ${r.breakEvenRoas.toFixed(1)}x to break even. Currently at ${roas}x.`}
          </p>
          <div className="mt-3 bg-white/60 rounded-lg px-3 py-2 text-xs text-gray-500">
            At break-even: revenue covers all costs with $0 profit/loss.
            Every 0.1x above <strong>{r.breakEvenRoas.toFixed(1)}x</strong> adds{' '}
            <strong>{formatCurrency(adSpend * 0.1)}</strong> in profit.
          </div>
        </div>

        {/* Save */}
        <button onClick={handleSave} className="btn-secondary text-sm w-full">
          💾 Save Campaign
        </button>
      </div>
    </div>
  )
}

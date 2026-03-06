'use client'

import { useState, useMemo } from 'react'
import { CalcInput, CalcSelect, CalcToggle, ResultRow, SectionHeader } from '@/components/calculators/CalcInputs'
import { calculateBreakEven, formatCurrency, formatPercent, formatNumber, SHOPIFY_FEES } from '@/lib/calculators'
import type { ShopifyPlan } from '@/lib/calculators'

const PLAN_OPTIONS = (Object.keys(SHOPIFY_FEES) as ShopifyPlan[]).map((k) => ({
  value: k,
  label: `${k.charAt(0).toUpperCase() + k.slice(1)} ($${SHOPIFY_FEES[k].monthly}/mo)`,
}))

export function BreakEvenClient() {
  const [fixedCosts,    setFixed]    = useState(500)
  const [sellingPrice,  setPrice]    = useState(49.99)
  const [variableCost,  setVariable] = useState(20)
  const [plan,          setPlan]     = useState<ShopifyPlan>('basic')
  const [useShopifyPayments, setUseSP] = useState(true)

  const r = useMemo(
    () => calculateBreakEven({ fixedCosts, sellingPrice, variableCostPerUnit: variableCost,
                               shopifyPlan: plan, useShopifyPayments }),
    [fixedCosts, sellingPrice, variableCost, plan, useShopifyPayments]
  )

  const isViable = r.contributionMargin > 0
  // Profit at 2x break-even
  const at2xProfit = isViable ? (r.breakEvenUnits * r.contributionMargin) : 0

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Inputs */}
      <div className="card space-y-4">
        <SectionHeader
          title="Cost Structure"
          subtitle="Enter your fixed and variable costs to find your break-even point"
        />

        <CalcInput
          label="Monthly Fixed Costs"
          value={fixedCosts}
          onChange={setFixed}
          prefix="$"
          tooltip="Costs you pay regardless of sales volume: Shopify subscription ($39–$399), apps, software, staff"
          helperText="Include: Shopify plan + all monthly app subscriptions"
        />
        <CalcInput
          label="Selling Price"
          value={sellingPrice}
          onChange={setPrice}
          prefix="$"
        />
        <CalcInput
          label="Variable Cost Per Unit"
          value={variableCost}
          onChange={setVariable}
          prefix="$"
          tooltip="Costs that scale with each sale: product cost + shipping + ad spend per sale. Shopify fees are added automatically."
          helperText="Shopify fees are added automatically below"
        />
        <CalcSelect label="Shopify Plan" value={plan}
          onChange={(v) => setPlan(v as ShopifyPlan)} options={PLAN_OPTIONS} />
        <CalcToggle label="Using Shopify Payments?" value={useShopifyPayments} onChange={setUseSP} />

        {/* Fees per unit display */}
        <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-600 border border-gray-200">
          <p className="font-semibold mb-1 text-gray-700">Shopify fees added per unit:</p>
          <p className="tabular-nums">
            {formatCurrency(r.feesPerUnit)} total
            {' '}({(SHOPIFY_FEES[plan].processingFee * 100).toFixed(1)}% + $0.30
            {!useShopifyPayments ? ` + ${(SHOPIFY_FEES[plan].transactionFee * 100).toFixed(1)}% txn` : ''})
          </p>
          <p className="mt-1 text-gray-500">
            Total variable cost per unit: <strong>{formatCurrency(variableCost + r.feesPerUnit)}</strong>
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="card">
          <SectionHeader title="Break-Even Analysis" />

          <ResultRow
            label="Contribution Margin / Sale"
            value={formatCurrency(r.contributionMargin)}
            tooltip="Revenue remaining after variable costs — used to cover fixed costs"
            isPositive={r.contributionMargin >= 0}
            isNegative={r.contributionMargin < 0}
          />
          <ResultRow
            label="Contribution Margin Ratio"
            value={formatPercent(r.contributionMarginRatio)}
          />
        </div>

        {isViable ? (
          <>
            {/* Main result */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card bg-brand-50 border-brand-200 border-2 text-center">
                <div className="text-5xl font-bold text-brand-700 tabular-nums">
                  {formatNumber(r.breakEvenUnits)}
                </div>
                <div className="text-sm font-semibold text-brand-600 mt-2">units / month</div>
                <div className="text-xs text-brand-500 mt-0.5">to break even</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-gray-900 tabular-nums">
                  {formatCurrency(r.breakEvenRevenue)}
                </div>
                <div className="text-sm text-gray-500 mt-2">revenue needed</div>
                <div className="text-xs text-gray-400 mt-0.5">per month</div>
              </div>
            </div>

            {/* Insight */}
            <div className="card bg-gray-50 text-sm text-gray-700">
              <p>
                Sell <strong>{formatNumber(r.breakEvenUnits)} units/month</strong> at{' '}
                {formatCurrency(sellingPrice)} each to cover your{' '}
                <strong>{formatCurrency(fixedCosts)}/month</strong> in fixed costs.
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Every unit above break-even generates{' '}
                <strong className="text-green-600">{formatCurrency(r.contributionMargin)}</strong>{' '}
                in pure profit. At {formatNumber(r.breakEvenUnits * 2)} units (2×), your monthly profit would be{' '}
                <strong className="text-green-600">{formatCurrency(at2xProfit)}</strong>.
              </p>
            </div>

            {/* Per-day target */}
            <div className="card text-center">
              <div className="text-3xl font-bold text-gray-900 tabular-nums">
                {(r.breakEvenUnits / 30).toFixed(1)}
              </div>
              <div className="text-sm text-gray-500 mt-1">sales per day needed</div>
              <div className="text-xs text-gray-400 mt-0.5">({formatNumber(r.breakEvenUnits)} ÷ 30 days)</div>
            </div>
          </>
        ) : (
          <div className="card bg-red-50 border-red-200 border-2 text-sm text-red-700">
            <p className="font-semibold mb-2">⚠️ Cannot reach break-even</p>
            <p>
              Your variable costs ({formatCurrency(variableCost)}) + Shopify fees ({formatCurrency(r.feesPerUnit)}) ={' '}
              <strong>{formatCurrency(variableCost + r.feesPerUnit)}</strong> exceed the selling price of{' '}
              <strong>{formatCurrency(sellingPrice)}</strong>.
            </p>
            <p className="mt-2 text-xs text-red-600">You lose money on every sale. Raise your price or reduce costs.</p>
          </div>
        )}
      </div>
    </div>
  )
}

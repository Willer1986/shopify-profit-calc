'use client'

import { useState, useMemo } from 'react'
import { CalcInput, CalcSelect, CalcToggle, ResultRow, SectionHeader } from '@/components/calculators/CalcInputs'
import { calculateFees, formatCurrency, formatPercent, SHOPIFY_FEES } from '@/lib/calculators'
import type { ShopifyPlan } from '@/lib/calculators'

const PLAN_OPTIONS = (Object.keys(SHOPIFY_FEES) as ShopifyPlan[]).map((key) => ({
  value: key,
  label: `${key.charAt(0).toUpperCase() + key.slice(1)} – $${SHOPIFY_FEES[key].monthly}/mo`,
}))

// Show what user would save upgrading to the next plan
function planUpgradeSavings(sellingPrice: number, currentPlan: ShopifyPlan): string | null {
  const upgradeMap: Partial<Record<ShopifyPlan, ShopifyPlan>> = {
    basic: 'shopify',
    shopify: 'advanced',
  }
  const nextPlan = upgradeMap[currentPlan]
  if (!nextPlan) return null
  const current = calculateFees({ sellingPrice, shopifyPlan: currentPlan, useShopifyPayments: true })
  const next    = calculateFees({ sellingPrice, shopifyPlan: nextPlan,    useShopifyPayments: true })
  const saving  = current.totalFees - next.totalFees
  if (saving <= 0) return null
  const nextLabel = nextPlan.charAt(0).toUpperCase() + nextPlan.slice(1)
  return `💡 Upgrade to ${nextLabel} plan and save ${formatCurrency(saving)} per sale in processing fees`
}

export function FeesCalculatorClient() {
  const [sellingPrice,       setSellingPrice]       = useState(49.99)
  const [plan,               setPlan]               = useState<ShopifyPlan>('basic')
  const [useShopifyPayments, setUseShopifyPayments] = useState(true)

  const results = useMemo(
    () => calculateFees({ sellingPrice, shopifyPlan: plan, useShopifyPayments }),
    [sellingPrice, plan, useShopifyPayments]
  )

  const upgradeTip = planUpgradeSavings(sellingPrice, plan)

  // Show comparison across all plans
  const allPlanFees = (Object.keys(SHOPIFY_FEES) as ShopifyPlan[]).map((p) => ({
    plan: p,
    ...calculateFees({ sellingPrice, shopifyPlan: p, useShopifyPayments: true }),
  }))

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Inputs */}
      <div className="card space-y-4">
        <SectionHeader title="Sale Details" />
        <CalcInput
          label="Selling Price"
          value={sellingPrice}
          onChange={setSellingPrice}
          prefix="$"
          tooltip="Enter your product's selling price to see the exact fee breakdown"
        />
        <CalcSelect
          label="Shopify Plan"
          value={plan}
          onChange={(v) => setPlan(v as ShopifyPlan)}
          options={PLAN_OPTIONS}
          tooltip="Higher plans have lower processing fees — the savings add up at scale"
        />
        <CalcToggle
          label="Using Shopify Payments?"
          value={useShopifyPayments}
          onChange={setUseShopifyPayments}
          tooltip="Shopify Payments waives the transaction fee (0.5–2%). Using PayPal, Stripe, etc. adds this fee on top."
          helperText={useShopifyPayments
            ? '✓ No extra transaction fee'
            : `⚠ +${(SHOPIFY_FEES[plan].transactionFee * 100).toFixed(1)}% transaction fee on top of processing`}
        />

        {/* All plans comparison */}
        <div className="rounded-xl border border-gray-200 overflow-hidden mt-2">
          <div className="bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            All Plans — Processing Fee Comparison
          </div>
          {allPlanFees.map(({ plan: p, totalFees, processingFee }) => (
            <div key={p} className={`flex items-center justify-between px-3 py-2.5 border-t border-gray-100 ${p === plan ? 'bg-brand-50' : ''}`}>
              <span className={`text-sm font-medium ${p === plan ? 'text-brand-700' : 'text-gray-700'}`}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
                {p === plan && <span className="ml-1 text-xs text-brand-500">(current)</span>}
              </span>
              <span className={`text-sm tabular-nums ${p === plan ? 'font-bold text-brand-700' : 'text-gray-600'}`}>
                {formatCurrency(processingFee)} ({formatPercent(useShopifyPayments ? processingFee / sellingPrice * 100 : totalFees / sellingPrice * 100)})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="card">
        <SectionHeader title="Fee Breakdown" subtitle={`For a ${formatCurrency(sellingPrice)} sale`} />

        <ResultRow label="Selling Price" value={formatCurrency(sellingPrice)} />
        <ResultRow
          label="Processing Fee"
          value={`–${formatCurrency(results.processingFee)}`}
          tooltip={`${(SHOPIFY_FEES[plan].processingFee * 100).toFixed(1)}% + $0.30 flat fee`}
          isNegative
        />
        {results.transactionFee > 0 ? (
          <ResultRow
            label="Transaction Fee"
            value={`–${formatCurrency(results.transactionFee)}`}
            tooltip="Only applies when using a third-party payment gateway. Use Shopify Payments to waive this."
            isNegative
          />
        ) : (
          <ResultRow
            label="Transaction Fee"
            value="$0.00 (waived)"
            tooltip="✓ Waived because you use Shopify Payments"
          />
        )}

        <div className="pt-3 mt-1 border-t-2 border-gray-300">
          <ResultRow label="Total Fees Charged" value={`–${formatCurrency(results.totalFees)}`} isTotal isNegative />
          <ResultRow label="You Receive" value={formatCurrency(results.youReceive)} isTotal isPositive />
        </div>

        <div className="mt-5 bg-gray-50 rounded-xl px-4 py-4 text-center">
          <div className="text-4xl font-bold text-red-600 tabular-nums">{formatPercent(results.feePercentage)}</div>
          <div className="text-sm text-gray-500 mt-1">of your sale price goes to fees</div>
          <div className="text-xs text-gray-400 mt-0.5">
            On 100 sales at {formatCurrency(sellingPrice)}: {formatCurrency(results.totalFees * 100)} total fees
          </div>
        </div>

        {upgradeTip && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl px-3 py-3 text-xs text-blue-700">
            {upgradeTip}
          </div>
        )}

        {!useShopifyPayments && (
          <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl px-3 py-3 text-xs text-amber-700">
            💡 Switch to Shopify Payments to save{' '}
            <strong>{formatCurrency(results.transactionFee)}</strong> per sale in transaction fees.
          </div>
        )}
      </div>
    </div>
  )
}

// Shopify transaction fees by plan
export const SHOPIFY_FEES = {
  basic:    { monthly: 39,   transactionFee: 0.02,  processingFee: 0.029, fixedFee: 0.30 },
  shopify:  { monthly: 105,  transactionFee: 0.01,  processingFee: 0.026, fixedFee: 0.30 },
  advanced: { monthly: 399,  transactionFee: 0,     processingFee: 0.024, fixedFee: 0.30 },
  plus:     { monthly: 2300, transactionFee: 0,     processingFee: 0.022, fixedFee: 0.30 },
}

export type ShopifyPlan = keyof typeof SHOPIFY_FEES

// ─── Profit Calculator ────────────────────────────────────────────────────────
export interface ProfitInputs {
  sellingPrice: number
  productCost: number
  shippingCost: number
  shopifyPlan: ShopifyPlan
  useShopifyPayments: boolean
  adSpend: number
  refundRate: number
  otherCosts: number
}

export interface ProfitResults {
  grossRevenue: number
  shopifyFee: number
  processingFee: number
  totalFees: number
  netRevenue: number
  cogs: number
  adCost: number
  refundCost: number
  otherCosts: number
  totalCosts: number
  netProfit: number
  profitMargin: number
  roi: number
}

export function calculateProfit(inputs: ProfitInputs): ProfitResults {
  const plan          = SHOPIFY_FEES[inputs.shopifyPlan]
  const grossRevenue  = inputs.sellingPrice
  const processingFee = inputs.sellingPrice * plan.processingFee + plan.fixedFee
  const shopifyFee    = inputs.useShopifyPayments ? 0 : inputs.sellingPrice * plan.transactionFee
  const totalFees     = processingFee + shopifyFee
  const refundCost    = inputs.sellingPrice * (inputs.refundRate / 100)
  const netRevenue    = grossRevenue - totalFees - refundCost
  const cogs          = inputs.productCost + inputs.shippingCost
  const totalCosts    = cogs + inputs.adSpend + inputs.otherCosts
  const netProfit     = netRevenue - totalCosts
  const profitMargin  = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0
  const roi           = totalCosts   > 0 ? (netProfit / totalCosts) * 100 : 0

  return { grossRevenue, shopifyFee, processingFee, totalFees, netRevenue, cogs,
           adCost: inputs.adSpend, refundCost, otherCosts: inputs.otherCosts,
           totalCosts, netProfit, profitMargin, roi }
}

// ─── Fees Calculator ──────────────────────────────────────────────────────────
export interface FeesInputs {
  sellingPrice: number
  shopifyPlan: ShopifyPlan
  useShopifyPayments: boolean
}

export interface FeesResults {
  processingFee: number
  transactionFee: number
  totalFees: number
  feePercentage: number
  youReceive: number
}

export function calculateFees(inputs: FeesInputs): FeesResults {
  const plan           = SHOPIFY_FEES[inputs.shopifyPlan]
  const processingFee  = inputs.sellingPrice * plan.processingFee + plan.fixedFee
  const transactionFee = inputs.useShopifyPayments ? 0 : inputs.sellingPrice * plan.transactionFee
  const totalFees      = processingFee + transactionFee
  const feePercentage  = inputs.sellingPrice > 0 ? (totalFees / inputs.sellingPrice) * 100 : 0
  const youReceive     = inputs.sellingPrice - totalFees
  return { processingFee, transactionFee, totalFees, feePercentage, youReceive }
}

// ─── Ad Profit Calculator ─────────────────────────────────────────────────────
export interface AdProfitInputs {
  adSpend: number
  roas: number
  averageOrderValue: number
  cogs: number
  shopifyPlan: ShopifyPlan
  useShopifyPayments: boolean
  otherCosts: number
}

export interface AdProfitResults {
  revenue: number
  estimatedOrders: number
  shopifyFees: number
  totalCogs: number
  adSpend: number
  otherCosts: number
  netProfit: number
  margin: number
  roi: number
  breakEvenRoas: number
}

export function calculateAdProfit(inputs: AdProfitInputs): AdProfitResults {
  const plan            = SHOPIFY_FEES[inputs.shopifyPlan]
  const revenue         = inputs.adSpend * inputs.roas
  const aov             = inputs.averageOrderValue > 0 ? inputs.averageOrderValue : 50
  const estimatedOrders = revenue > 0 ? Math.round(revenue / aov) : 0
  const feeRate         = plan.processingFee + (inputs.useShopifyPayments ? 0 : plan.transactionFee)
  const shopifyFees     = revenue * feeRate + estimatedOrders * plan.fixedFee
  const netProfit       = revenue - shopifyFees - inputs.cogs - inputs.adSpend - inputs.otherCosts
  const margin          = revenue > 0 ? (netProfit / revenue) * 100 : 0
  const roi             = inputs.adSpend > 0 ? (netProfit / inputs.adSpend) * 100 : 0

  // Break-even: revenue*(1 - feeRate) - fixedFeesTotal - COGS - adSpend - otherCosts = 0
  // adSpend * ROAS * (1 - feeRate) = COGS + adSpend + otherCosts + estimatedOrders*fixedFee
  // Approximate: ignore per-order fixed fee for ROAS formula simplicity
  const nonFeeTotal   = inputs.cogs + inputs.adSpend + inputs.otherCosts
  const denominator   = inputs.adSpend * (1 - feeRate)
  const breakEvenRoas = denominator > 0 ? Math.round((nonFeeTotal / denominator) * 10) / 10 : 0

  return { revenue, estimatedOrders, shopifyFees, totalCogs: inputs.cogs,
           adSpend: inputs.adSpend, otherCosts: inputs.otherCosts,
           netProfit, margin, roi, breakEvenRoas }
}

// ─── Margin Calculator ────────────────────────────────────────────────────────
export interface MarginInputs {
  sellingPrice: number
  cogs: number
  shopifyPlan: ShopifyPlan
  useShopifyPayments: boolean
  adSpend: number
  otherCosts: number
  targetMargin: number
}

export interface MarginResults {
  totalFees: number
  totalCosts: number
  grossProfit: number
  currentMargin: number
  currentMarkup: number
  priceForTargetMargin: number
}

export function calculateMargin(inputs: MarginInputs): MarginResults {
  const plan      = SHOPIFY_FEES[inputs.shopifyPlan]
  const feeRate   = plan.processingFee + (inputs.useShopifyPayments ? 0 : plan.transactionFee)
  const totalFees = inputs.sellingPrice * feeRate + plan.fixedFee
  const totalCosts   = inputs.cogs + totalFees + inputs.adSpend + inputs.otherCosts
  const grossProfit  = inputs.sellingPrice - totalCosts
  const currentMargin = inputs.sellingPrice > 0 ? (grossProfit / inputs.sellingPrice) * 100 : 0
  const currentMarkup = inputs.cogs > 0 ? ((inputs.sellingPrice - inputs.cogs) / inputs.cogs) * 100 : 0
  // price*(1 - feeRate - target/100) = cogs + adSpend + otherCosts + fixedFee
  const nonFeeCosts = inputs.cogs + inputs.adSpend + inputs.otherCosts + plan.fixedFee
  const denom       = 1 - feeRate - inputs.targetMargin / 100
  const priceForTargetMargin = denom > 0 ? nonFeeCosts / denom : 0
  return { totalFees, totalCosts, grossProfit, currentMargin, currentMarkup, priceForTargetMargin }
}

// ─── Break-Even Calculator ────────────────────────────────────────────────────
export interface BreakEvenInputs {
  fixedCosts: number
  sellingPrice: number
  variableCostPerUnit: number
  shopifyPlan: ShopifyPlan
  useShopifyPayments: boolean
}

export interface BreakEvenResults {
  feesPerUnit: number
  contributionMargin: number
  contributionMarginRatio: number
  breakEvenUnits: number
  breakEvenRevenue: number
}

export function calculateBreakEven(inputs: BreakEvenInputs): BreakEvenResults {
  const plan        = SHOPIFY_FEES[inputs.shopifyPlan]
  const feeRate     = plan.processingFee + (inputs.useShopifyPayments ? 0 : plan.transactionFee)
  const feesPerUnit = inputs.sellingPrice * feeRate + plan.fixedFee
  const totalVar    = inputs.variableCostPerUnit + feesPerUnit
  const contributionMargin      = inputs.sellingPrice - totalVar
  const contributionMarginRatio = inputs.sellingPrice > 0
    ? (contributionMargin / inputs.sellingPrice) * 100 : 0
  const breakEvenUnits   = contributionMargin > 0 ? Math.ceil(inputs.fixedCosts / contributionMargin) : 0
  const breakEvenRevenue = breakEvenUnits * inputs.sellingPrice
  return { feesPerUnit, contributionMargin, contributionMarginRatio, breakEvenUnits, breakEvenRevenue }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function formatCurrency(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency,
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(value)
}

export function formatPercent(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

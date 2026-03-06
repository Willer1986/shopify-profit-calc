import { MetadataRoute } from 'next'
import { LONG_TAIL_PAGES } from '@/lib/seo'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://shopifyprofitcalculator.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: APP_URL, priority: 1 },
    { url: `${APP_URL}/shopify-profit-calculator`, priority: 0.9 },
    { url: `${APP_URL}/shopify-fees-calculator`, priority: 0.9 },
    { url: `${APP_URL}/shopify-ad-profit-calculator`, priority: 0.9 },
    { url: `${APP_URL}/shopify-margin-calculator`, priority: 0.9 },
    { url: `${APP_URL}/shopify-break-even-calculator`, priority: 0.9 },
    { url: `${APP_URL}/pricing`, priority: 0.7 },
    { url: `${APP_URL}/about`, priority: 0.5 },
    { url: `${APP_URL}/faq`, priority: 0.6 },
    { url: `${APP_URL}/contact`, priority: 0.4 },
    { url: `${APP_URL}/privacy`, priority: 0.3 },
    { url: `${APP_URL}/terms`, priority: 0.3 },
    { url: `${APP_URL}/disclaimer`, priority: 0.3 },
  ].map(({ url, priority }) => ({
    url,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority,
  }))

  const longTailPages = LONG_TAIL_PAGES.map((page) => ({
    url: `${APP_URL}/shopify-profit-calculator-${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...longTailPages]
}

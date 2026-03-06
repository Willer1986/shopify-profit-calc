# Shopify Profit Calculator — Production SaaS

A production-ready micro-SaaS with 5 Shopify calculators, freemium model ($9/mo Pro), Stripe subscriptions, PostgreSQL, and full deployment support.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Typography plugin |
| Database | PostgreSQL via Prisma ORM |
| Auth | Custom JWT (jose + bcryptjs) |
| Payments | Stripe Subscriptions |
| Deployment | Vercel (recommended) |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Fill in all values in .env.local

# 3. Set up database
npm run db:migrate    # Run migrations
npm run db:generate   # Generate Prisma client

# 4. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

```env
DATABASE_URL=postgresql://user:pass@host:5432/dbname
NEXTAUTH_SECRET=your-32-char-random-secret
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...
NEXT_PUBLIC_APP_URL=https://yourdomain.com
ADMIN_EMAILS=you@example.com
```

Generate `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

---

## Deployment (Vercel)

### Step 1 — Database
Create a PostgreSQL database (recommended: [Supabase](https://supabase.com), [Neon](https://neon.tech), or [Railway](https://railway.app)).

Copy the connection string to `DATABASE_URL`.

### Step 2 — Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set all environment variables in Vercel Dashboard → Project → Settings → Environment Variables.

### Step 3 — Run Database Migration on Production
```bash
# After adding DATABASE_URL to Vercel, run migration
vercel env pull .env.local
npm run db:migrate
```

### Step 4 — Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Create a Product: "Pro Plan" → Price: $9/month recurring
3. Copy the **Price ID** → `STRIPE_PRO_PRICE_ID`
4. Create a Webhook:
   - URL: `https://yourdomain.com/api/stripe/webhook`
   - Events to listen to:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_failed`
     - `invoice.payment_succeeded`
5. Copy the **Webhook Secret** → `STRIPE_WEBHOOK_SECRET`

### Step 5 — Test Stripe
Use Stripe test card: `4242 4242 4242 4242` with any future expiry and any CVC.

### Step 6 — Admin Dashboard
Set `ADMIN_EMAILS=your@email.com` in Vercel env vars. Access at `/admin`.

### Step 7 — Google Search Console
1. Verify domain ownership
2. Submit sitemap: `https://yourdomain.com/sitemap.xml`

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                          # Homepage
│   ├── layout.tsx                        # Root layout (Navbar + Footer)
│   ├── globals.css                       # Tailwind base + component classes
│   ├── sitemap.ts                        # Auto-generated XML sitemap
│   ├── robots.ts                         # robots.txt
│   │
│   ├── shopify-profit-calculator/        # Main profit calculator
│   ├── shopify-fees-calculator/          # Fee breakdown
│   ├── shopify-ad-profit-calculator/     # ROAS / ad profitability
│   ├── shopify-margin-calculator/        # Margin & target price
│   ├── shopify-break-even-calculator/    # Break-even units
│   ├── shopify-profit-calculator-[slug]/ # Long-tail SEO pages
│   │
│   ├── auth/login/                       # Login page
│   ├── auth/signup/                      # Signup page
│   ├── dashboard/                        # User dashboard
│   ├── dashboard/exports/                # Pro export page (CSV/JSON)
│   ├── admin/                            # Admin dashboard
│   │
│   ├── api/auth/login/                   # POST: login
│   ├── api/auth/signup/                  # POST: signup
│   ├── api/auth/logout/                  # POST: logout
│   ├── api/calculations/                 # GET/POST/DELETE: calculations
│   ├── api/contact/                      # POST: contact form
│   ├── api/stripe/checkout/              # POST: create Stripe session
│   ├── api/stripe/portal/                # POST: open billing portal
│   ├── api/stripe/webhook/               # POST: Stripe webhook handler
│   │
│   ├── pricing/                          # Pricing page
│   ├── about/                            # About page
│   ├── faq/                              # FAQ with Schema.org markup
│   ├── contact/                          # Contact form
│   ├── privacy/                          # Privacy policy
│   ├── terms/                            # Terms of service
│   └── disclaimer/                       # Disclaimer
│
├── components/
│   ├── calculators/CalcInputs.tsx        # Reusable input/select/toggle/result components
│   ├── layout/Navbar.tsx                 # Server navbar (reads session)
│   ├── layout/MobileNav.tsx              # Client mobile menu
│   ├── layout/Footer.tsx                 # Footer
│   └── ui/
│       ├── UpgradeButton.tsx             # Stripe checkout trigger
│       ├── BillingPortalButton.tsx       # Stripe portal trigger
│       └── DeleteCalcButton.tsx          # Calculation delete (two-step confirm)
│
├── lib/
│   ├── auth.ts                           # JWT session management
│   ├── calculators.ts                    # All calculator logic + types
│   ├── prisma.ts                         # Prisma singleton
│   ├── rate-limit.ts                     # Daily limit enforcement
│   ├── seo.ts                            # Schema.org helpers + long-tail page configs
│   └── stripe.ts                         # Stripe helper functions
│
├── middleware.ts                         # Route protection for /dashboard, /admin
└── prisma/
    └── schema.prisma                     # Database schema
```

---

## Calculator Formulas

### Profit Calculator
```
Net Revenue   = Selling Price − Processing Fee − Transaction Fee − Refund Reserve
Net Profit    = Net Revenue − COGS − Ad Spend − Other Costs
Profit Margin = Net Profit / Selling Price × 100
ROI           = Net Profit / Total Costs × 100
```

### Break-Even Calculator
```
Fees Per Unit        = Price × (processingRate + transactionRate) + $0.30
Contribution Margin  = Price − Variable Costs − Fees Per Unit
Break-Even Units     = Fixed Costs / Contribution Margin
```

### Ad Profit / Break-Even ROAS
```
Revenue          = Ad Spend × ROAS
Net Profit       = Revenue − Shopify Fees − COGS − Ad Spend − Other Costs
Break-Even ROAS  = (COGS + Ad Spend + Other) / (Ad Spend × (1 − feeRate))
```

---

## Freemium Model

| Feature | Free | Pro ($9/mo) |
|---|---|---|
| All 5 calculators | ✅ | ✅ |
| Daily calculations | 3 | Unlimited |
| Save history | ❌ | ✅ |
| Export CSV/JSON | ❌ | ✅ |
| No limit reset | ❌ | ✅ |

---

## Contact Form Setup

The contact form is wired to `/api/contact/route.ts`. To activate email sending, uncomment the Resend code and add your key:

```bash
npm install resend
```

Then add `RESEND_API_KEY=re_...` to your environment variables.

---

## Adding Long-Tail SEO Pages

Edit `src/lib/seo.ts` → `LONG_TAIL_PAGES` array. Each entry auto-generates:
- A new URL: `/shopify-profit-calculator-{slug}`
- SEO metadata
- Sitemap entry

---

## License
MIT. Not affiliated with Shopify Inc.

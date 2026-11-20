# KitchenHub Elevation Project — Strategic Plan

**Project Codename:** `KITCHENHUB-NEXT`  
**Current Version:** v1.0 (Production on Cloudflare Workers)  
**Target Version:** v2.0 (Platform-ready, multi-vendor, AI-enhanced)  
**Timeline:** 12 weeks (3 phases × 4 weeks)  
**Team:** 4 Skill Agents + 1 Human Orchestrator

---

## 🎯 Executive Summary

Transform KitchenHub from a **single-brand kitchen appliance store** into a **B2B2C marketplace platform** supporting multiple vendors, AI-powered recommendations, headless CMS, and white-label deployments — all on Cloudflare's edge.

**Current State (v1.0):**
- ✅ Astro 7 + Tailwind v4 + Cloudflare Workers
- ✅ D1 database (16 products, 5 collections)
- ✅ SSLCommerz (BD) + Stripe (Intl) payments
- ✅ WhatsApp manual + Email (Resend) notifications
- ✅ 4-step checkout, cart, favorites, addresses
- ✅ GitHub Actions deploy workflow (manual trigger)

**Target State (v2.0):**
- Multi-vendor marketplace (commission-based)
- Headless CMS (Contentful/Sanity) for content
- AI product recommender (embeddings + vector search)
- White-label tenant deployments (subdomains)
- Admin dashboard with analytics, vendor management
- PWA + offline cart sync
- Automated CI/CD with preview deployments

---

## 🏗 Phase 1: Foundation & Platformization (Weeks 1-4)

### Goal: Decouple core commerce logic into reusable platform modules

| Week | Skill Agent | Deliverable |
|------|-------------|-------------|
| 1 | **Backend Architect** (Claude Code) | Extract `commerce-core` package: `ProductService`, `OrderService`, `CartService`, `PaymentGateway` interface with SSLCommerz/Stripe adapters |
| 2 | **Data Engineer** (Codex) | D1 schema v2: add `vendors`, `commissions`, `tenants`, `webhooks`, `audit_logs` tables; migration + seed scripts |
| 3 | **Platform Engineer** (OpenCode) | Tenant middleware: subdomain routing, tenant config KV, feature flags per tenant |
| 4 | **DevOps Agent** (Hermes) | GitHub Actions matrix: `preview` on PR, `staging` on merge, `production` on tag; Cloudflare Preview URLs |

**Technical Milestones:**
- [ ] `npm run build` passes for extracted `commerce-core` package
- [ ] D1 migration v2 applied to local + production
- [ ] Tenant middleware handles `kitchenhub.*.workers.dev` routing
- [ ] Preview deployments work for PRs

**Architecture Diagram:** (Generate with `architecture-diagram` skill)
```
┌─────────────────────────────────────────────────────────────┐
│                     Cloudflare Edge                          │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │  Tenant A    │  │  Tenant B    │  │   Platform Core    │  │
│  │ (kitchenhub) │  │ (whitelabel) │  │  commerce-core     │  │
│  └──────┬───────┘  └──────┬───────┘  └─────────┬──────────┘  │
│         │                 │                     │             │
│         └─────────────────┼─────────────────────┘             │
│                           ▼                                   │
│              ┌────────────────────────┐                       │
│              │   D1 Database (v2)     │                       │
│              │ vendors, tenants,      │                       │
│              │ commissions, webhooks  │                       │
│              └───────────┬────────────┘                       │
│                           │                                   │
│              ┌────────────────────────┐                       │
│              │   KV Namespaces        │                       │
│              │ sessions, carts,       │                       │
│              │ tenant-config, flags   │                       │
│              └────────────────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛒 Phase 2: Marketplace & Multi-Vendor (Weeks 5-8)

### Goal: Enable vendor onboarding, catalog management, and commission automation

| Week | Skill Agent | Deliverable |
|------|-------------|-------------|
| 5 | **Backend Architect** | Vendor API: `POST /api/vendor/register`, `GET /api/vendor/dashboard`, `POST /api/vendor/products` |
| 6 | **Frontend Engineer** (Claude Code) | Vendor Portal (React/Astro Island): product CRUD, order management, earnings view |
| 7 | **Data Engineer** | Commission engine: configurable rates per category, automated payout calculation, webhook to SSLCommerz/Stripe Connect |
| 8 | **QA Agent** (Hermes) | Load test vendor flows (100 concurrent), security audit (vendor data isolation), E2E Cypress tests |

**Technical Milestones:**
- [ ] Vendor self-registration → admin approval → dashboard access
- [ ] Vendor product CRUD with image upload (Cloudflare Images)
- [ ] Commission calculation on order completion (cron job + webhook)
- [ ] Payout webhook to Stripe Connect / SSLCommerz merchant split

**New D1 Tables (v2):**
```sql
-- Vendors
CREATE TABLE vendors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id INTEGER REFERENCES tenants(id),
  user_id INTEGER REFERENCES users(id),
  business_name TEXT NOT NULL,
  business_email TEXT NOT NULL,
  business_phone TEXT,
  commission_rate REAL DEFAULT 0.15, -- 15% default
  status TEXT DEFAULT 'pending', -- pending, approved, suspended
  stripe_connect_id TEXT, -- for automated payouts
  sslcommerz_store_id TEXT,
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER DEFAULT (unixepoch())
);

-- Commissions
CREATE TABLE commissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  vendor_id INTEGER REFERENCES vendors(id),
  order_id INTEGER REFERENCES orders(id),
  amount INTEGER NOT NULL, -- in cents
  rate REAL NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, paid, failed
  paid_at INTEGER,
  created_at INTEGER DEFAULT (unixepoch())
);

-- Tenants (for white-label)
CREATE TABLE tenants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subdomain TEXT UNIQUE NOT NULL, -- 'kitchenhub', 'vendorstore'
  name TEXT NOT NULL,
  theme_config TEXT, -- JSON: colors, logo, fonts
  feature_flags TEXT, -- JSON: enable_blog, enable_reviews, etc.
  custom_domain TEXT,
  status TEXT DEFAULT 'active',
  created_at INTEGER DEFAULT (unixepoch())
);
```

---

## 🤖 Phase 3: AI Intelligence & Scale (Weeks 9-12)

### Goal: AI-powered discovery, personalization, and platform scalability

| Week | Skill Agent | Deliverable |
|------|-------------|-------------|
| 9 | **AI Engineer** (Codex) | Vector embeddings pipeline: product descriptions → Cloudflare Vectorize (or Pinecone) → similarity search API |
| 10 | **ML Engineer** (Claude Code) | Recommender: "Customers also bought", "Similar products", "For you" (collaborative + content-based) |
| 11 | **Platform Engineer** | Headless CMS integration (Sanity): blog, recipes, buying guides; ISR for content pages |
| 12 | **DevOps Agent** | Observability: OpenTelemetry → Cloudflare Logs + Grafana Cloud; SLO dashboards, alerting |

**Technical Milestones:**
- [ ] `/api/ai/recommend?product_id=X` returns 5 similar products (<200ms)
- [ ] `/api/ai/personalize?user_id=Y` returns ranked catalog (<300ms)
- [ ] Content pages (blog/recipes) served from Sanity with ISR
- [ ] P99 latency <500ms globally; error rate <0.1%
- [ ] Automated rollback on SLO breach

**AI Architecture:**
```
┌─────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  Product Data   │────▶│  Embedding Job   │────▶│  Vectorize Index │
│  (D1 + Images)  │     │  (Cloudflare     │     │  (cosine sim)    │
│                 │     │   Workers AI)    │     │                  │
└─────────────────┘     └──────────────────┘     └────────┬─────────┘
                                                          │
                          ┌──────────────────┐            │
                          │  Recommender API │◀───────────┘
                          │  (hybrid: content│
                          │   + collaborative)│
                          └────────┬─────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
             "Similar"       "Also Bought"   "For You"
             Products        Products        (personalized)
```

---

## 🤖 Skill Agent Roster & Responsibilities

| Agent | Role | Tools | Primary Phases |
|-------|------|-------|----------------|
| **Agent-1: Backend Architect** | Core commerce, vendor APIs, payment orchestration | `claude-code`, `github` | 1, 2 |
| **Agent-2: Frontend Engineer** | Vendor portal, admin dashboard, PWA | `claude-code`, `opencode` | 2, 3 |
| **Agent-3: Data/AI Engineer** | D1 schema, Vectorize, recommender, analytics | `codex`, `github` | 1, 3 |
| **Agent-4: Platform/DevOps** | Tenant infra, CI/CD, observability, security | `hermes-agent`, `opencode` | 1, 2, 3 |
| **Human Orchestrator** | Planning, reviews, stakeholder sync, go/no-go | - | All |

**Agent Communication Protocol:**
- Daily standup via GitHub Issues (label: `standup`)
- Async PR reviews (required: 1 approval + CI pass)
- Weekly sync: Human + Agents (30 min)
- Shared context: `PROJECT_NOTES.md` + `ARCHITECTURE.md` in repo

---

## 📋 Detailed Sprint Breakdown

### Sprint 1 (Week 1): Commerce Core Extraction
```
Tasks:
□ Extract commerce/ into @kitchenhub/commerce-core npm package
□ Define PaymentGateway interface (SSLCommerzAdapter, StripeAdapter)
□ Unit tests for CartService, OrderService
□ Update wrangler.jsonc for package workspace
□ Document API in ARCHITECTURE.md

Definition of Done:
- npm run build passes in monorepo
- All existing tests pass
- New package published to GitHub Packages (private)
```

### Sprint 2 (Week 2): D1 Schema v2 + Migrations
```
Tasks:
□ Design v2 schema (vendors, commissions, tenants, webhooks, audit_logs)
□ Create migrations/0002_v2_schema.sql
□ Seed script for vendor/test data
□ Local migration test + rollback test
□ Production migration runbook

Definition of Done:
- wrangler d1 execute --local succeeds
- Seed produces 5 test vendors + 50 products
- Rollback verified (wrangler d1 execute --local --command="DROP TABLE...")
```

### Sprint 3 (Week 3): Tenant Middleware
```
Tasks:
□ Middleware: extract subdomain → tenant_id → inject tenant config
□ KV namespace: tenant-config (JSON: theme, features, domain)
□ Feature flag system (enable_vendor_portal, enable_ai_recs, etc.)
□ Custom domain mapping (CNAME → tenant)
□ Tests: multi-tenant isolation, fallback to default

Definition of Done:
- kitchenhub.workers.dev → tenant: kitchenhub
- vendor1.kitchenhub.workers.dev → tenant: vendor1
- Feature flags toggle correctly
```

### Sprint 4 (Week 4): CI/CD Matrix
```
Tasks:
□ GitHub Actions: preview (PR), staging (main), production (tag)
□ Cloudflare Preview URLs for PRs
□ Environment protection rules (staging: auto, production: manual)
□ Secret rotation workflow
□ Deploy notification to Telegram/Discord

Definition of Done:
- PR #123 → preview URL works
- Merge to main → staging auto-deploys
- Tag v2.0.0 → production deploys with approval
```

### Sprint 5 (Week 5): Vendor API
```
Tasks:
□ POST /api/vendor/register (public) → pending status
□ GET /api/vendor/dashboard (auth: vendor JWT)
□ POST /api/vendor/products (multipart: images + JSON)
□ GET /api/vendor/orders?status=pending
□ PATCH /api/vendor/orders/:id/ship
□ Rate limiting + validation

Definition of Done:
- Vendor registers → admin approves → JWT works
- Product CRUD with Cloudflare Images upload
- Order status transitions logged
```

### Sprint 6 (Week 6): Vendor Portal (Frontend)
```
Tasks:
□ Astro + React Islands: VendorLayout, ProductTable, OrderCard
□ Auth flow: login → JWT → protected routes
□ Product form: title, description, price, variants, images (drag-drop)
□ Dashboard: revenue chart (Chart.js), recent orders, payouts
□ Responsive: mobile-first, PWA manifest

Definition of Done:
- vendor.kitchenhub.workers.dev loads portal
- Full product CRUD works
- Order management works
- Lighthouse >90 on all metrics
```

### Sprint 7 (Week 7): Commission Engine
```
Tasks:
□ Commission calculation: order.total × vendor.commission_rate
□ Cron job (Cloudflare Workers Cron): daily commission calc
□ Webhook: on order confirmed → create commission record
□ Payout integration: Stripe Connect (intl), SSLCommerz split (BD)
□ Admin payout approval UI
□ Vendor payout history + PDF export

Definition of Done:
- Order placed → commission record created
- Daily cron reconciles all commissions
- Stripe Connect payout initiated (test mode)
- Admin approves → vendor receives funds
```

### Sprint 8 (Week 8): Security & Load Test
```
Tasks:
□ Penetration test: vendor data isolation, JWT validation, XSS/CSRF
□ Load test: k6 script (100 VUs, 5 min, checkout flow)
□ Rate limiting: per-vendor, per-IP, per-endpoint
□ Audit logging: all vendor/admin actions
□ Bug fixes + retest

Definition of Done:
- Zero critical vulnerabilities
- P95 <500ms under 100 VUs
- Rate limits enforced
- Audit log queryable
```

### Sprint 9 (Week 9): Vector Embeddings Pipeline
```
Tasks:
□ Cloudflare Vectorize index creation (dimension: 768)
□ Workers AI: `@cf/baai/bge-base-en-v1.5` for embeddings
□ Sync job: product changes → re-embed → upsert Vectorize
□ API: GET /api/ai/similar?product_id=X&limit=5
□ Fallback: content-based (tags, category) if Vectorize down

Definition of Done:
- 100 products embedded in <30s
- Similar products API <150ms
- Relevance >80% (manual eval)
```

### Sprint 10 (Week 10): Hybrid Recommender
```
Tasks:
□ Content-based: product tags + category + embeddings
□ Collaborative: user-item matrix (implicit feedback: views, cart, purchase)
□ Hybrid: weighted merge (0.6 content + 0.4 collaborative)
□ Personalization: user_id → browsing history → ranked catalog
□ A/B test framework: control vs recommender

Definition of Done:
- /api/ai/personalize returns 20 products <300ms
- A/B test running (10% traffic)
- CTR lift >15% vs control
```

### Sprint 11 (Week 11): Headless CMS + Content
```
Tasks:
□ Sanity.io project: schema for BlogPost, Recipe, BuyingGuide
□ Astro content layer: fetch from Sanity at build + ISR
□ Recipe pages: ingredients, steps, nutrition, related products
□ Buying guides: category-specific, SEO-optimized
□ Webhook: Sanity → Cloudflare purge cache

Definition of Done:
- /blog, /recipes, /guides routes work
- ISR: content update → live in <60s
- SEO: meta tags, structured data, sitemap
- Lighthouse SEO >95
```

### Sprint 12 (Week 12): Observability & Launch
```
Tasks:
□ OpenTelemetry instrumentation (fetch, D1, KV, AI)
□ Grafana Cloud: dashboards (latency, errors, business metrics)
□ SLOs: P99 <500ms, error rate <0.1%, availability >99.9%
□ Alerting: PagerDuty/Telegram on SLO breach
□ Runbook: incident response, rollback, vendor comms
□ Load test: 500 VUs, 10 min
□ Go/No-Go decision → Production launch

Definition of Done:
- All SLOs met in staging
- Grafana dashboards live
- Alerting tested (fire drill)
- Runbook documented
- Stakeholder sign-off
```

---

## 📊 Success Metrics (KPIs)

| Category | Metric | Target (v2.0) |
|----------|--------|---------------|
| **Technical** | P99 Latency | <500ms global |
| | Error Rate | <0.1% |
| | Build Time | <3 min |
| | Deploy Time | <2 min |
| **Business** | Vendors Onboarded | 20+ by Week 12 |
| | Products Listed | 500+ |
| | GMV (Monthly) | $50K+ |
| | Commission Revenue | $7.5K+/mo |
| **AI** | Recommender CTR | >15% lift |
| | Personalization Conversion | >20% lift |
| | Vector Search Latency | <150ms |
| **Platform** | Tenant Deploy Time | <5 min |
| | Uptime | 99.9% |
| | Vendor Satisfaction (NPS) | >50 |

---

## 🔐 Security & Compliance Checklist

- [ ] **PCI DSS SAQ-A** (Stripe/SSLCommerz handle card data)
- [ ] **GDPR/PDPA** compliance (user data export, deletion)
- [ ] **Vendor KYC** (business verification before payouts)
- [ ] **Rate Limiting** (per vendor, per IP, per endpoint)
- [ ] **Audit Logging** (all admin/vendor actions)
- [ ] **Secrets Rotation** (quarterly, automated)
- [ ] **Dependency Scanning** (Dependabot + npm audit)
- [ ] **Penetration Test** (Week 8, annual thereafter)

---

## 💰 Budget Estimate (Monthly at Scale)

| Service | Cost (Est.) |
|---------|-------------|
| Cloudflare Workers (Paid) | $5/mo + $0.50/million requests |
| Cloudflare D1 | $5/mo per DB (10GB) |
| Cloudflare KV | $0.50/mo per namespace |
| Cloudflare Vectorize | $0.05/million vectors |
| Cloudflare Images | $1/100K images + $5/100K deliveries |
| Workers AI (embeddings) | $0.011/1K tokens |
| Sanity CMS (Growth) | $99/mo |
| Grafana Cloud (Pro) | $49/mo |
| Stripe Connect | 0.25% + $0.25 per payout |
| **Total (est.)** | **~$200-400/mo** |

---

## 🚀 Go/No-Go Criteria (Week 12)

| Criterion | Pass Threshold |
|-----------|----------------|
| All Sprint 1-12 DoD met | 100% |
| Load test: 500 VUs, 10 min | P99 <500ms, 0% errors |
| Security audit | 0 critical, <5 medium |
| AI recommender A/B test | >15% CTR lift, p<0.05 |
| Vendor portal UAT | 5 vendors complete full cycle |
| Stakeholder demo | Sign-off from 2/3 leads |

---

## 📁 Repository Structure (Target)

```
kitchenhub-platform/
├── .github/
│   └── workflows/
│       ├── ci.yml              # PR checks
│       ├── preview.yml         # PR preview deploy
│       ├── deploy-staging.yml  # Main branch
│       └── deploy-prod.yml     # Tag trigger
├── packages/
│   ├── commerce-core/          # Shared commerce logic (npm package)
│   │   ├── src/
│   │   │   ├── services/
│   │   │   ├── adapters/
│   │   │   └── types/
│   │   └── tests/
│   ├── vendor-portal/          # React + Astro Islands
│   ├── admin-dashboard/        # React + Astro Islands
│   └── ai-recommender/         # Vectorize + Workers AI
├── apps/
│   ├── kitchenhub/             # Main tenant (Astro)
│   └── whitelabel-template/    # White-label base
├── migrations/
│   ├── 0001_initial.sql        # v1 schema (consolidated)
│   └── 0002_v2_marketplace.sql # v2 schema
├── scripts/
│   ├── seed.ts                 # Local seed
│   ├── seed-v2.sql             # Production seed (vendors, etc.)
│   └── embed-products.ts       # Vectorize sync
├── wrangler.jsonc              # Root config (workspaces)
├── turbo.json                  # Turborepo config
├── PROJECT_NOTES.md
├── ARCHITECTURE.md
└── RUNBOOK.md
```

---

## 🎬 Next Immediate Actions (This Week)

1. **Human:** Review & approve this plan
2. **Human:** Create GitHub repo `kitchenhub-platform` (or migrate current)
3. **Agent-1:** Initialize Turborepo monorepo, extract `commerce-core`
4. **Agent-3:** Design D1 v2 schema, create migration
5. **Agent-4:** Set up GitHub Actions matrix, Cloudflare secrets
6. **All:** Daily standup issues, weekly sync calendar invite

---

**Document Version:** 1.0  
**Author:** Human Orchestrator + Skill Agents  
**Status:** Ready for Execution  
**Next Review:** End of Week 1 (Sprint 1 Retrospective)
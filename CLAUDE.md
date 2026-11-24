@AGENTS.md

# Tradesman Global — Architecture Rules (mandatory)

This project uses a **strict feature-based (feature-first) architecture**. These rules are requirements, not preferences.

## Layout

```text
src/
├── app/                    # Routes only. Thin: compose feature components, no business logic, no mock data.
│   ├── (public)/           # /, find-candidates, trade-categories, trade/[slug], country/[slug], worker/[slug], how-it-works
│   ├── (auth)/             # login, register
│   ├── (worker)/worker/    # dashboard, profile/edit
│   └── (admin)/admin/      # overview, candidates
├── features/<feature>/     # One folder per business domain
│   ├── components/ sections/ hooks/ services/ schemas/ types/ utils/ data/   # only what the feature needs
│   └── index.ts            # The feature's ONLY public API
├── components/
│   ├── ui/                 # Business-agnostic primitives (Button, Input, Badge…)
│   ├── shared/             # Business-agnostic composites (Pagination, EmptyState…)
│   └── layouts/            # Site header/footer, dashboard shells
├── lib/                    # utils/, constants/, formatters/ — pure, no feature knowledge
├── data/                   # Cross-feature mock data (mock-workers.ts, mock-candidates.ts, mock-dashboard.ts)
├── hooks/  types/  config/ # Truly global only
```

Features: `homepage`, `candidates`, `workers`, `registration`, `worker-dashboard`, `admin`, `trades`, `countries`.

## Import rules (enforced by ESLint in `eslint.config.mjs`)

1. Other code may import a feature only via its barrel: `@/features/candidates` — never `@/features/candidates/components/...`.
2. Inside a feature, import the feature's own files with **relative** paths.
3. `components/`, `lib/`, `hooks/`, `types/`, `config/` must never import from `features/`.
4. No circular dependencies between features. If two features need the same thing, move it to `components/shared`, `lib`, or `types`.
5. Export from `index.ts` only what other modules actually use.

## Data

- Frontend-only for Phase 1. **No MongoDB/Mongoose yet.**
- Mock data lives in `src/data/` or `features/<f>/data/` — never in components or route files. `src/data/` may reference feature types only via `import type { … } from "@/features/<f>"` (type-only, so no runtime cycles).
- UI reads data through typed async service functions in `features/<f>/services/` (e.g. `getCandidates(filters): Promise<Paginated<Candidate>>`). Phase 2 replaces their bodies with API calls; callers don't change.
- Keep it simple: plain functions + types. No repositories, DI containers, or class hierarchies.
- Service functions start with `"use cache"` (Cache Components is enabled in `next.config.ts`; `dynamicParams` is unavailable). Dynamic routes use `generateStaticParams` + `notFound()`.
- Features reference other features' entities by **slug only** (e.g. `Country.inDemandTradeSlugs`). Route pages do the join by calling both features' public APIs.
- Exception: a feature that *extends* another's entity may import that feature's barrel, one direction only. Current edges: `workers → candidates` (`WorkerProfile = Candidate & details`). Never add the reverse edge.
- Client Components (`"use client"`) must not import a feature barrel that exports services (they carry `"use cache"` server code). Render that feature's components in a Server Component and pass them down as props/children.
- Composition features (`homepage`) may read other features' barrels in their `services/` and map into their own view-model types. Nothing may import a composition feature.
- Only `approved` candidates/workers are ever public; services enforce this, not the UI.
- Link URLs come from `routes` in `src/lib/constants/routes.ts`; never hard-code paths.

## shadcn/ui

`npx shadcn add <component>` mis-resolves the `cn` alias in this repo (it installs an unrelated npm package named `cn` and imports `from "cn"`). After every add: `npm uninstall cn` and change the import to `import { cn } from "@/lib/utils/cn"`.

## Per-feature workflow

Before building a feature: inspect requirements → list its components/types/hooks/schemas/data → define its `index.ts` API → implement with minimal coupling → check for duplication against existing shared modules → run `npm run lint` and `npx tsc --noEmit`, and check the UI in the browser.

## Out of scope for Phase 1

Employer accounts, job posting, applications, recruitment workflows, payments, notifications/messaging, advanced verification. Don't build these; just don't block them.

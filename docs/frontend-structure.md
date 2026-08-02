# Frontend structure

`web` is now **all of notavibe's frontend** — the marketing site *and* the product
(public discovery + authenticated dashboards/portals). Astro, server-render-first
(the AEO thesis: crawlers run zero JS), Terminal Craft brand from `design`.

> **Backend is deliberately not here.** The product frontend talks to an API at
> `PUBLIC_API_BASE_URL`. Which repo serves that API — **`app` or `crm`** — is
> **decided later** (with Ramy). Until it's set, the UI runs on mock data. Picking
> the backend is then a config change, not a code change.

## Layout

```
src/
├─ pages/
│  ├─ index · pricing · manifesto · faq · how-it-works · for-companies   ← marketing (kept)
│  ├─ discover/            ← public catalog (§5)
│  ├─ search/              ← client-filter now, server search later
│  ├─ project/[slug]       ← public project page (§5.14)
│  ├─ maintainer/[handle]  ← public maintainer page
│  └─ app/                 ← authenticated (noindex) — the dashboards/portals
│     ├─ maintainer/  ├─ backer/  └─ admin/   ← role portals (§7.1, §9, §11)
├─ layouts/   Base.astro (marketing) · AppLayout.astro (role-gated app shell)
├─ components/ …marketing… · product/{ProjectCard, HealthSignals}
├─ lib/api/   client.ts (base-URL or mock) · types.ts (the contract surface)
└─ lib/mock/  data.ts (fictional seed; replace via PUBLIC_API_BASE_URL)
```

## Deliberate deferrals (not gaps)

- **SSR adapter** — public dynamic routes prerender from mock via `getStaticPaths()`.
  They flip to real SSR (one generated page per slug, catalog scale) when the backend
  + an Astro server adapter are chosen — an infra decision, bundled with app-vs-crm.
- **Auth** — dashboards render behind a role prop; real GitHub-App sign-in wires up
  with the backend.
- **Brand** — tokens live in `src/styles/tokens.css` (Terminal Craft). `design` is the
  upstream source of truth; keep these in sync with `design/docs/design-system/tokens.css`.

## Status

Structure/scaffold on branch `restructure/frontend`. Supersedes the `templ` product
frontend in `app`; Ramy to be looped in before that retires.

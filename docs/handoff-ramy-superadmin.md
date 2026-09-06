# Superadmin / Founder Portal — Backend Handoff

**Status:** Frontend DONE (prototype, `frontend/scripts/app.js`). Backend needed.
**Owner:** Ramy
**Sprint:** 4
**Date:** 2026-09-06

---

## How to see the prototype

```bash
cd frontend && python3 -m http.server 4321
# open http://localhost:4321/#/admin.pulse
```

All 6 screens live at `admin.*` routes. The admin sidebar ("Superadmin" group at top) navigates between them. Every screen uses illustrative data — your job is to replace it with real API responses.

---

## Architecture

- **All screens** are in `frontend/scripts/app.js` as hand-authored `h()` functions (React.createElement, no JSX).
- **Routing:** `screenFor()` maps `admin.pulse` → `SuperadminPulse`, etc. (lines ~1958–1963).
- **Navigation:** `AdminNavV2` (line ~2157) has a "Superadmin" group with 6 items.
- **Shell:** `NotavibeShell` detects `admin.*` routes and renders the admin chrome (dark sidebar + main content).
- **CSS:** Injected once by `injectSuperadminCSS()` — classes `.nv-sa-toggle`, `.nv-sa-dot--{ok,warn,err}`, `.nv-sa-row`, `.nv-sa-bar`, `.nv-sa-card`.

### Design invariants (do NOT change)

| Rule | Why |
|------|-----|
| Emerald accent only in CSS classes, never inline on `<button>` | The DS escape-hatch rule `button[style*="var(--volt-emerald)"]` hijacks it |
| `prefers-reduced-motion` disables all transitions | Accessibility |
| All aggregate metrics, never visitor-level | Privacy / ADR 0007 |
| Kill switches degrade to "Insufficient data", never fabricate zeros | Honesty invariant |
| Every override action requires a reason string | Audit trail |
| Figures carry "· illustrative data" caption | Founders-preview convention |

---

## Screen-by-screen contract

### 1. `admin.pulse` — SuperadminPulse

**Route:** `#/admin.pulse`
**Function:** `SuperadminPulse` (app.js)
**Width:** 1000px max

**API contract:**

```
GET /api/admin/pulse
→ {
    signups: { today: number, week: number, total: number, delta_pct: number },
    active_7d: { count: number, delta_pct: number },
    claims: { filed: number, granted: number, pending: number, expired: number, delta_pct: number },
    interests: { count: number, distinct_projects: number, delta_pct: number },
    scans: { count: number, with_match: number, delta_pct: number },
    page_views_7d: { count: number, delta_pct: number },
    deck_impressions: { count: number, delta_pct: number },
    nominations: { count: number, approved: number },
    referrers: [ { source: string, pct: number } ],
    sparkline_signups: [ { x: number, y: number } ]  // 8 points, 7-day
  }
```

**UI mapping:**
- Hero row: `signups` (left card with sparkline) + `active_7d` (right card with sparkline)
- 3-column grid: claims, interests, scans, page_views_7d, deck_impressions, nominations
- Each tile shows: value, delta pill (↑/↓/→ + %), caption
- Referrer bar chart: `referrers` array, sorted desc by pct
- Delta colour: positive = `var(--volt-emerald)`, zero/negative = `var(--text-secondary)` — never red (a dip is information, not an error)

---

### 2. `admin.usersmgmt` — SuperadminUsers

**Route:** `#/admin.usersmgmt`
**Function:** `SuperadminUsers` (app.js)
**Width:** 1000px max

**API contract:**

```
GET /api/admin/users?q={search}&offset={n}&limit={n}
→ {
    users: [{
      handle: string,
      email: string,
      provider: "GitHub" | "GitLab" | "Bitbucket",
      status: "active" | "disabled",
      grants: number,
      lists: number,
      interests: number,
      joined: string  // ISO date
    }],
    total: number
  }

POST /api/admin/users/{handle}/disable
  → { ok: true }

POST /api/admin/users/{handle}/enable
  → { ok: true }

POST /api/admin/users/{handle}/delete
  body: { reason: string, typed_name: string }
  → { ok: true }
```

**UI mapping:**
- Search bar filters by handle/email/provider (client-side on current page, server-side across full set)
- Grid columns: Handle (strong), Email (caption), Provider (caption), Grants (center), Lists (center), Status (dot), Actions (Disable/Enable + View)
- Disabled users render at 50% opacity with red status dot
- "View" opens a detail panel (not yet prototyped — for now, no-op)

---

### 3. `admin.invites` — SuperadminInvites

**Route:** `#/admin.invites`
**Function:** `SuperadminInvites` (app.js)
**Width:** 1000px max

**API contract:**

```
GET /api/admin/gate
→ { enabled: boolean, password: string }

PUT /api/admin/gate
  body: { enabled: boolean }

POST /api/admin/gate/regenerate
→ { password: string }

GET /api/admin/invites
→ { codes: [{ code: string, used: boolean, used_by: string|null, used_at: string|null }] }

POST /api/admin/invites/generate
  body: { count: number }
→ { codes: [string] }

DELETE /api/admin/invites/{code}
→ { ok: true }

GET /api/admin/allowlist
→ { entries: [string] }  // emails or @domain patterns

POST /api/admin/allowlist
  body: { entry: string }

DELETE /api/admin/allowlist/{entry}
→ { ok: true }

POST /api/admin/gate/transition-public
→ { ok: true }  // one-way: archives codes + allowlist, disables gate
```

**UI mapping:**
- Password gate: toggle + current password display + regenerate button
- Invite codes: list with used/unused status dots. Unused = Copy + Revoke. Used = shows who + when.
- "Generate 5 more codes" button at bottom
- Allowlist: pill tags with × remove, input + Add button
- Transition card: outline button, one-way action (should confirm before executing)

---

### 4. `admin.features` — SuperadminFeatures

**Route:** `#/admin.features`
**Function:** `SuperadminFeatures` (app.js)
**Width:** 1000px max

**API contract:**

```
GET /api/admin/features
→ {
    flags: [{ name: string, enabled: boolean, description: string }],
    apis: [{ name: string, status: "ok"|"warn"|"err", killed: boolean, label: string }]
  }

PUT /api/admin/features/{name}
  body: { enabled: boolean }

PUT /api/admin/apis/{name}/kill
POST /api/admin/apis/{name}/restore
```

**UI mapping:**
- Feature flags: list of toggles (`.nv-sa-toggle`). Each shows name (strong) + enabled/disabled caption.
- API kill switches: list with status dot + name + label. Button toggles Kill/Restore.
- When killed: dot goes red, label changes to "Killed — serving cached data"
- When restored: dot returns to source status (ok/warn), label returns to health description

**Current flags in prototype:**
1. Deck personalization (on)
2. Stack scan — public (on)
3. Curation chat (on)
4. Editorial verdicts (off)
5. Peer recommendations (off)
6. List discovery on project pages (off)
7. Claim flow — cold entry (on)
8. MCP server (on)

---

### 5. `admin.overrides` — SuperadminOverrides

**Route:** `#/admin.overrides`
**Function:** `SuperadminOverrides` (app.js)
**Width:** 1000px max

**API contract:**

```
POST /api/admin/grants
  body: { slug: string, handle: string, action: "grant"|"revoke", reason: string }
→ { ok: true }

PUT /api/admin/claims/{slug}/state
  body: { state: "active"|"lapsed"|"retired"|"suppressed", reason: string }
→ { ok: true }

POST /api/admin/contests/{id}/force-resolve
  body: { winner_handle: string, reason: string }
→ { ok: true }

POST /api/admin/pages/{slug}/unsuppress
  body: { reason: string }
→ { ok: true }

GET /api/admin/overrides/recent?limit=10
→ { actions: [{ action: string, target: string, by: string, when: string, reason: string }] }
```

**UI mapping:**
- 4 action cards stacked: Grant/Revoke, Override claim state, Force-resolve contest, Emergency unsuppress
- Each has input fields + action button
- **Override claim state** has a required `reason` textarea — button stays disabled until reason is non-empty
- Recent actions feed at bottom: timeline-style, each row shows action + target (strong), actor + timestamp (caption), reason (caption)
- **Every action MUST write to audit log with actor + reason** — this is a hard invariant

---

### 6. `admin.health` — SuperadminHealth

**Route:** `#/admin.health`
**Function:** `SuperadminHealth` (app.js)
**Width:** 1000px max

**API contract:**

```
GET /api/admin/health
→ {
    apis: [{
      name: string,
      status: "ok"|"warn"|"err",
      quota: string,       // "4212/5000" or "—"
      reset: string,       // "53 min" or "—"
      latency: string,     // "89ms"
      label: string
    }],
    ingestion: [{
      source: string,
      status: "ok"|"warn"|"err",
      pages: string,
      rate: string,
      queue: number,
      errors: number
    }],
    errors_7d: [{ day: string, count: number }],
    thresholds: [{ name: string, value: string, active: boolean }]
  }

PUT /api/admin/health/thresholds/{name}
  body: { active: boolean }
```

**UI mapping:**
- API status table: rows with status dot + name/label + quota/reset/latency columns right-aligned
- Ingestion pipeline: same layout but queue/errors instead of quota/reset. Queue > 100 = amber text. Errors > 10 = red text.
- Error bar chart: 7 vertical bars, height proportional to max. Bars > 10 errors = red, else emerald.
- Alert thresholds: toggle list, each shows name (strong) + threshold value (caption)

**Status dot mapping:**
- `ok` → emerald dot with emerald glow (`.nv-sa-dot--ok`)
- `warn` → amber dot with amber glow (`.nv-sa-dot--warn`)
- `err` → red dot with red glow (`.nv-sa-dot--err`)

---

## CSS classes reference

| Class | Purpose |
|-------|---------|
| `.nv-sa-card` | Card container (border, surface bg, 12px radius, 2xl padding). Warms border to emerald on hover. |
| `.nv-sa-toggle` | 44×24px toggle switch. Add `.on` for active state (emerald bg + thumb). |
| `.nv-sa-dot` | 8px status indicator. Variants: `--ok` (emerald), `--warn` (amber), `--err` (red). |
| `.nv-sa-row` | Flex row with bottom border. Last child has no border. |
| `.nv-sa-bar` | 6px progress bar track (void bg). |
| `.nv-sa-bar-fill` | Progress bar fill. Set `width` and `background` inline. Transitions with expo-out. |

## Token reference (from hashicorp-tokens.css)

| Token | Use |
|-------|-----|
| `--volt-emerald` | Primary accent (active states, positive deltas, status dots) |
| `--volt-surface` | Card background |
| `--volt-void` | Recessed backgrounds (inputs, bar tracks) |
| `--volt-border` | All borders |
| `--text-body` | Primary text |
| `--text-secondary` | Captions, labels |
| `--volt-text-500` | Mono eyebrows |
| `--type-display-lg` | Page titles |
| `--type-display-md` | Metric values |
| `--type-body-md-strong` | Row labels, strong text |
| `--type-mono-label` | Eyebrows, delta pills |
| `--type-caption` | Secondary text, timestamps |

---

## Go/templ implementation notes

The prototype uses `React.createElement` — in the real app these become `templ` components with htmx for interactivity:

- **Toggles** → `hx-put` on click, swap the toggle state
- **Search** → `hx-get` with `hx-trigger="input changed delay:300ms"` for debounced server search
- **Tiles** → static render, refresh via `hx-get` with `hx-trigger="every 30s"` for live pulse
- **Bar charts** → server-render as inline SVG or CSS bars (no JS charting library needed)
- **Action forms** → `hx-post` with `hx-confirm` for destructive actions

The admin routes should be behind middleware that checks for the superadmin role (founders only). No public access.

---

## Verification checklist

- [ ] All 6 screens render at the correct routes
- [ ] Sidebar "Superadmin" group appears at top of admin nav
- [ ] Pulse tiles show real metrics with correct deltas
- [ ] User search filters correctly
- [ ] Toggle states persist across page loads
- [ ] Override actions require reason (button disabled without it)
- [ ] Every override writes to audit log
- [ ] Kill switches degrade to "Insufficient data" on affected signals
- [ ] Status dots reflect real API health
- [ ] Alert threshold toggles persist
- [ ] No visitor-level data exposed (aggregate only)
- [ ] Admin routes are access-controlled (founders only)

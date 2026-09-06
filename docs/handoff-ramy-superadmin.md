# Superadmin / Founder Portal — Backend Handoff

**Status:** Frontend DONE (prototype, `frontend/scripts/app.js`). Backend needed.
**Owner:** Ramy
**Sprint:** 4
**Date:** 2026-09-06 (updated)

---

## How to see the prototype

```bash
cd frontend && python3 -m http.server 4321
# open http://localhost:4321/#/admin.pulse
```

All 9 screens live at `admin.*` routes. The admin sidebar has 3 groups with working links: **Superadmin** (6 screens), **Adjudication** (2 screens), **Integrity** (1 screen). Every screen uses illustrative data — your job is to replace it with real API responses.

---

## Architecture

- **All screens** are in `frontend/scripts/app.js` as hand-authored `h()` functions (React.createElement, no JSX).
- **Routing:** `screenFor()` maps `admin.pulse` → `SuperadminPulse`, `admin.contests` → `SuperadminContests`, etc.
- **Navigation:** `AdminNavV2` has 5 groups (Superadmin, Adjudication, Catalog, Integrity, Platform). 9 of 20 items are now built.
- **Shell:** `NotavibeShell` detects `admin.*` routes and renders the admin chrome (dark sidebar + main content).
- **CSS:** Injected once by `injectSuperadminCSS()` — classes `.nv-sa-toggle`, `.nv-sa-dot--{ok,warn,err}`, `.nv-sa-row`, `.nv-sa-bar`, `.nv-sa-card`.
- **Shared UI:** `saConfirmModal()` for destructive action confirmations, `saToast()` for feedback notifications. Both are vanilla DOM — no library dependency.

### Design invariants (do NOT change)

| Rule | Why |
|------|-----|
| Emerald accent only in CSS classes, never inline on `<button>` | The DS escape-hatch rule `button[style*="var(--volt-emerald)"]` hijacks it |
| `prefers-reduced-motion` disables all transitions | Accessibility |
| All aggregate metrics, never visitor-level | Privacy / ADR 0007 |
| Kill switches degrade to "Insufficient data", never fabricate zeros | Honesty invariant |
| Every override/resolve/approve action requires a reason string | Audit trail |
| Figures carry "· illustrative data" caption | Founders-preview convention |
| Destructive actions go through `saConfirmModal` before executing | Safety — no accidental deletes/revokes |

---

## Screen-by-screen contract

### 1. `admin.pulse` — SuperadminPulse

**Route:** `#/admin.pulse`
**Function:** `SuperadminPulse` (app.js)
**Width:** 1000px max
**Interactivity:** Static (backend fills it)

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
**Interactivity:** Full — search, enable/disable with confirm, View detail panel, delete with typed-name confirm

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
- **"View"** opens a slide-in detail panel from the right: user stats (grants/lists/interests as tiles), status dot, email, provider, joined date, and action buttons (Enable/Disable + Delete)
- **"Delete"** requires typing the handle to confirm (modal with text input validation). Destructive red accent.
- Enable/Disable goes through confirmation modal before toggling

---

### 3. `admin.invites` — SuperadminInvites

**Route:** `#/admin.invites`
**Function:** `SuperadminInvites` (app.js)
**Width:** 1000px max
**Interactivity:** Full — all buttons wired with state management + confirmations

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
- Password gate: toggle + current password display + **Copy** (clipboard API) + **Regenerate** (confirmation modal, generates new random password)
- Invite codes: list with used/unused status dots. Unused = **Copy** (clipboard) + **Revoke** (confirmation modal, removes code). Used = shows who + when.
- **"Generate 5 more codes"** button appends 5 new unused codes
- Allowlist: pill tags with **×** remove (instant), controlled input + **Add** button (Enter key supported, dedup check)
- Transition card: **"Transition to public beta"** — destructive confirmation modal, one-way action. Post-transition: gate card shows "Disabled — site is public", transition card shows checkmark.

---

### 4. `admin.features` — SuperadminFeatures

**Route:** `#/admin.features`
**Function:** `SuperadminFeatures` (app.js)
**Width:** 1000px max
**Interactivity:** Full — all toggles wired

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
**Interactivity:** Full — all 4 forms wired with validation, confirmation modals, toast feedback, and live audit log

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
- Each has **controlled input fields** + action button (disabled until required fields filled)
- **Grant/Revoke** — two inputs (slug + handle), both required. Grant = outline button, Revoke = ghost button. Confirmation modal with contextual body text.
- **Override claim state** — slug + state select + required `reason` textarea. Button disabled until slug + reason non-empty.
- **Force-resolve contest** — contest ID + winner handle, both required. Destructive confirmation.
- **Emergency unsuppress** — slug input, required. Non-destructive confirmation.
- **Every submission** prepends to the live audit log at the bottom (action + target + actor + timestamp + reason)
- Forms clear on successful submission
- **Every action MUST write to audit log with actor + reason** — this is a hard invariant

---

### 6. `admin.health` — SuperadminHealth

**Route:** `#/admin.health`
**Function:** `SuperadminHealth` (app.js)
**Width:** 1000px max
**Interactivity:** Full — alert threshold toggles wired

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

### 7. `admin.contests` — SuperadminContests

**Route:** `#/admin.contests`
**Function:** `SuperadminContests` (app.js)
**Width:** 1000px max
**Interactivity:** Full — resolve/dismiss with confirmation, filter by status

**API contract:**

```
GET /api/admin/contests?status={open|expired|resolved|dismissed|all}
→ {
    contests: [{
      id: string,            // "CTX-001"
      slug: string,          // "vercel/next.js"
      claimant_a: string,    // handle
      claimant_b: string,    // handle
      evidence_a: string,    // free-text evidence summary
      evidence_b: string,
      filed: string,         // ISO datetime
      sla_hours: number,     // 72
      status: "open" | "expired" | "resolved" | "dismissed",
      winner: string|null    // handle, only when resolved
    }]
  }

POST /api/admin/contests/{id}/resolve
  body: { winner_handle: string, reason: string }
→ { ok: true }

POST /api/admin/contests/{id}/dismiss
  body: { reason: string }
→ { ok: true }
```

**UI mapping:**
- **Filter bar** — pill buttons: All, Open (count), Expired (count), Resolved, Dismissed. Active pill = emerald bg.
- **Contest cards** — one card per contest:
  - Header row: status dot + contest ID + slug (mono code pill) + SLA countdown pill (right-aligned)
  - SLA countdown: green (>24h), amber (6–24h), red (<6h), "Expired" when past. Computed client-side from `filed` + `sla_hours`.
  - Two-column comparison: Claimant A vs Claimant B. Each column shows handle (strong), evidence (caption), and "Award grant" button.
  - Footer: filed date (caption) + "Dismiss both" ghost button.
- **Resolved/dismissed cards** render at 60% opacity with winner shown or "Dismissed" label. No action buttons.
- Empty state: centered card with "No contests match this filter."

---

### 8. `admin.nominations` — SuperadminNominations

**Route:** `#/admin.nominations`
**Function:** `SuperadminNominations` (app.js)
**Width:** 1000px max
**Interactivity:** Full — approve/reject individual + bulk approve with checkbox multi-select

**API contract:**

```
GET /api/admin/nominations?status={pending|approved|rejected|all}
→ {
    nominations: [{
      id: string,              // "NOM-041"
      slug: string,            // "shadcn/ui"
      nominated_by: string,    // handle
      nominated_at: string,    // ISO datetime
      reason: string,          // nominator's free-text reason
      stars: string,           // "72.4k"
      weekly_downloads: string, // "1.2M"
      status: "pending" | "approved" | "rejected",
      reject_reason: string|null
    }]
  }

POST /api/admin/nominations/{id}/approve
→ { ok: true }

POST /api/admin/nominations/{id}/reject
  body: { reason: string }  // optional
→ { ok: true }

POST /api/admin/nominations/bulk-approve
  body: { ids: [string] }
→ { ok: true }
```

**UI mapping:**
- **Filter bar** — pill buttons: Pending (count), Approved (count), Rejected (count), All (count). Active = emerald.
  - When pending items are checkbox-selected: "Approve selected (N)" button appears right-aligned in the filter bar.
- **Nomination cards** — one card per nomination:
  - Top row: checkbox (pending only) + status dot + slug (strong) + ID (mono caption) + reason (caption, wraps). Right side: Stars + Weekly downloads in stacked stat columns.
  - Footer: "Nominated by {handle} · {date}" + Approve/Reject buttons (pending) or status label (approved/rejected).
- **Approve** — confirmation modal, moves to approved status, toast "Approved {slug} → ingestion queue".
- **Reject** — confirmation modal with optional reason input. Moves to rejected status at 50% opacity.
- **Bulk approve** — confirmation modal listing all selected slugs.
- Rejected cards show "✗ Rejected — {reason}" inline.

---

### 9. `admin.audit` — SuperadminAuditLog

**Route:** `#/admin.audit`
**Function:** `SuperadminAuditLog` (app.js)
**Width:** 1000px max
**Interactivity:** Full — search + category filter + actor filter (all client-side on illustrative data)

**API contract:**

```
GET /api/admin/audit?q={search}&category={cat}&actor={handle}&offset={n}&limit={n}
→ {
    entries: [{
      id: number,
      action: string,          // "Grant revoked", "Feature flag toggled", etc.
      target: string,          // "sara_dev → unjs/unbuild"
      by: string,              // actor handle
      when: string,            // "2026-09-06 09:14"
      category: string,        // "users"|"features"|"overrides"|"invites"|"contests"|"nominations"
      reason: string
    }],
    total: number
  }
```

**UI mapping:**
- **Search bar** — filters across action, target, and reason fields (debounced in production).
- **Category filter** — color-coded pill buttons:
  - `users` = purple (#8b5cf6)
  - `features` = emerald
  - `overrides` = amber
  - `invites` = blue (#3b82f6)
  - `contests` = pink (#ec4899)
  - `nominations` = cyan (#06b6d4)
- **Actor filter** — pill buttons per unique actor (extracted from data).
- **Count badge** — "N of M entries" right-aligned in the card header.
- **Log rows** — each entry shows:
  - Left: category pill (colored, rounded) + action (strong)
  - Right: actor · timestamp (caption)
  - Below: target (body) + reason (caption, right-aligned, max 50% width)
- **Empty state** — centered "No entries match your filters." when filters produce no results.
- **Prototype data:** 20 illustrative entries spanning all 6 categories, both actors (maghraby + ramy).

**Important:** Entries cannot be edited or deleted. This is the canonical audit trail.

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

## Shared UI helpers

| Helper | Purpose |
|--------|---------|
| `saConfirmModal(opts)` | Confirmation modal. Options: `title`, `body`, `confirmLabel`, `destructive` (red accent), `input` (optional React element), `onConfirm`, `onCancel`. Renders as fixed overlay with backdrop blur. |
| `saToast(message, variant)` | Toast notification. Variant: `"ok"` (emerald border) or `"err"` (red border). Auto-dismisses after 3s. Bottom-right positioned. |
| `saHeader(eyebrow, title, sub)` | Page header with eyebrow + h1 + subtitle. |
| `saTile(label, value, cap, delta)` | Metric tile card with optional delta pill. |
| `saToggle(on, onClick)` | Toggle switch component. |
| `saStatusDot(status)` | Status indicator dot (`"ok"`, `"warn"`, `"err"`). |

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
- **Confirm modals** → in htmx, use `hx-confirm` attribute or a custom `hx-trigger` that shows a `<dialog>` before submitting
- **Toasts** → use htmx `afterSwap` event to inject a toast element, or a lightweight `hx-on::after-request` handler
- **Contest SLA countdown** → compute server-side on each render (no client-side timer needed in htmx model)
- **Checkbox bulk actions** → form with checkboxes, `hx-post` to bulk endpoint, `hx-include` to collect checked IDs
- **Filter pills** → `hx-get` with query param, `hx-push-url` to update URL, `hx-target` to swap the list

The admin routes should be behind middleware that checks for the superadmin role (founders only). No public access.

---

## Verification checklist

- [ ] All 9 screens render at the correct routes
- [ ] Sidebar groups (Superadmin, Adjudication, Integrity) navigate correctly
- [ ] Pulse tiles show real metrics with correct deltas
- [ ] User search filters correctly
- [ ] User detail panel shows correct data for selected user
- [ ] User delete requires typed-name confirmation
- [ ] Toggle states persist across page loads
- [ ] Invite Copy writes to clipboard
- [ ] Invite Revoke removes code from list
- [ ] Invite Regenerate changes password
- [ ] Invite Transition is one-way and disables gate permanently
- [ ] Allowlist add/remove updates list
- [ ] Override actions require reason (button disabled without it)
- [ ] Every override writes to audit log
- [ ] Override forms clear after successful submission
- [ ] Kill switches degrade to "Insufficient data" on affected signals
- [ ] Status dots reflect real API health
- [ ] Alert threshold toggles persist
- [ ] Contest SLA countdown computes correctly from filing time
- [ ] Contest resolve awards grant to selected claimant
- [ ] Contest dismiss clears both claims
- [ ] Nomination approve triggers ingestion
- [ ] Nomination reject records reason
- [ ] Bulk approve works with checkbox selection
- [ ] Audit log search filters across action/target/reason
- [ ] Audit log category + actor filters work in combination
- [ ] Audit log entries are immutable (no edit/delete)
- [ ] No visitor-level data exposed (aggregate only)
- [ ] Admin routes are access-controlled (founders only)

---

## Screens still in nav but NOT yet built (11 remaining)

| Group | Screen | Route |
|-------|--------|-------|
| Catalog | Catalog ingestion | `admin.ingestion` |
| Catalog | Page corrections & takedowns | `admin.corrections` |
| Catalog | Taxonomy & categories | `admin.taxonomy` |
| Catalog | Vocabulary contests | `admin.vocab` |
| Catalog | Anomaly quarantine | `admin.anomaly` |
| Integrity | Sybil detection | `admin.sybil` |
| Integrity | Project moderation | `admin.moderation` |
| Platform | User lookup | `admin.users` |
| Platform | Editorial tools | `admin.editorial` |
| Platform | Demand signals | `admin.demand` |
| Platform | Config | `admin.config` |

---
created: 2026-07-27
type: evergreen
project: notavibe
source: founder
tags: [spec, mvp, discovery]
status: open
---

# notavibe — MVP Platform Features & Functional Overview

**v1.0 · discovery-first MVP · draft, pending the founder gate**

---

## 1. Purpose of this document

The build baseline for the first launched version of notavibe. Consumers:
**Maghraby (CPO)** for stories and wireframes, **Ramy (CTO)** for code.

This is a **separate line, not a successor**.
[[notavibe-platform-features-v1.07]] remains canonical as the **full-vision
reference** and is neither superseded nor retired. Where the two disagree about
**MVP scope, this document wins**; about **the full product, v1.07 wins**.
Every foreshadowed system here points at its v1.07 section, so nothing built
later is re-derived.

**Authority.** [[DEC-0041-new-operating-model-and-mvp-reset]] (the reset),
[[DEC-0042-v0.01-scope-rulings]], [[DEC-0043-v0.01-round-1-rulings]],
[[DEC-0044-v0.02-round-2-rulings]], [[DEC-0045-suppression-scope]],
[[DEC-0046-suppression-exits-and-legal-route]]. Derivation from the v1.07 story
layer: [[mvp-v0.01-disposition-ledger]].

**Provenance of delegated rulings.** DEC-0044 and DEC-0046 are **agent-authored
under founder authorization** ("proceed with your recommendations", "rule as
you see fit"). So are three calls inside DEC-0043's fold: the full-13-state
assignment (§14), save-to-list as a third action state (§5.12), and the two
HELD health-signal fallbacks (§5.2). Everything else is a founder ruling. The
DECs carry the detail; this note exists so a later reader need not reconstruct
it from the spec.

**Review history.** Five adversarial rounds, converging 14 P0 → 2 → 2 → 0, with
a targeted post-convergence verification of the claim statechart. Reports:
[[ux-review-2026-07-27-mvp-v0.01]] · [[ux-review-2026-07-27-mvp-v0.02-r2]] ·
[[ux-review-2026-07-27-mvp-v0.03-r3]] · [[ux-review-2026-07-27-mvp-v0.04-r4]] ·
[[ux-review-2026-07-27-mvp-v0.05-r5]].

---

## 2. The thesis this version tests

Discovery is the most broken and least addressed part of open-source funding,
and it is the part that can be built without payment complexity.

The MVP ships **discovery in full** and **money not at all**. It is validated by
generating the **demand side**: we push traffic, people discover projects, and
what they do with what they find is the experiment.

**The supply-side cold start is solved by generation, not recruitment.** Project
pages are created from public sources before any maintainer arrives. A
maintainer may claim their page; the page exists whether or not they ever do.

### 2.1 Scope at a glance

**Built in full** — discovery (front door, Your Deck, filters, search,
categories, Refine, ask-first onboarding, the distribution floor) · health and
ranking signals minus funding health · SEO and AEO · agent surfaces, llms.txt,
ask-your-agent, the catalog MCP, the read API and webhooks · project pages and
the AEO composition · Discover your stack · editorial and Ship Week, re-sized ·
claims and the claim lifecycle · Backer accounts, workspace and lists · visitor
consent · platform campaigns · admin · the quality baseline.

**Built lightweight** — the maintainer platform: claim a page, hold it, keep it
accurate, see who discovered you. **No money surfaces of any kind.**

**Foreshadowed** — subscriptions and tiers · bounties and escrow · voice ballots
and epochs · corporate billing.

**Not in this version** — the enterprise layer (post-MVP, behind open decisions
#4, #6 and #10).

### 2.2 What this version does not change

- Only OSI-approved licenses · no code hosting · no equity, IP or governance
  extraction
- Votes advisory, never binding; escrow on partner rails, never platform
  custody — both foreshadowed, both stated as they will be built
- The brand voice rule and its banned-word list
- **Sam**, the security reviewer who never logs in, keeps his veto (§10.5)
- The zero-tracking floor, narrowing only because pay. and enterprise. hosts do
  not exist yet — **a narrowing that needs a ruling, not a fold** (§10.4)

### 2.3 Inventories

Every row derived by enumeration from this document's own text.

| Inventory | v1.07 | **MVP v1.0** | Enumerated at |
|---|---|---|---|
| Public screens | 7 | **11** | §5.12 |
| Action states | 4 | **3** | §5.12 |
| Backer authenticated screens | 16 | **8** | §9.1 |
| Maintainer screens | 18 | **8** | §4.3 |
| Admin screens | 13 | **15** | §11.1 |
| Entities | 27 | **19** | §12 |
| Transactional emails | 36 | **11** | §13 |
| End-to-end flows | 11 | **11** | §15 |
| Glossary | 65 | new rows written; **carried-row pass open** | §12a, §16 |

---

## 3. The foreshadowed systems

A foreshadowed system is **a specified surface with no functional affordance**.
Common rules: **never a dead form · never a date · never a price in surface
copy** (the spec may name figures; product copy may not) · **descriptions render
on claimed pages only; the interest control renders on both** (§4.5).

| System | v1.07 reference | Demand signal |
|---|---|---|
| Subscriptions and tiers | §3.1 | The interest control, claimed and unclaimed pages alike |
| Bounties and escrow | §3.3 | Project-level interest marker; never issue-level |
| Voice ballots and epochs | §3.2 | None — too abstract for a click to mean anything |
| Corporate billing | §3.1 corporate | The organisation waitlist (§9.5) |

**Voice ballots** are described on the methodology page, **with the log-scaled
credit formula and a worked n² example**. Discovery principle 3 requires the
formula to be published, and foreshadowing quadratic voting without its math is
worse than not mentioning it.

**Bounty interest is project-level, never issue-level** — issue-level targeting
would ask people to negotiate scope for a system that cannot hold escrow.

---

## 4. The generated catalog

The largest addition, with no v1.07 equivalent.

### 4.1 Generation

Project pages are created from public sources at catalog scale — **thousands**,
not the 20–50 hand-recruited wedge v1.07 assumed. DEC-0002's rule holds and now
has to be built for real: multi-source signals with graceful degradation, and
**no health signal may hard-depend on a single provider**.

### 4.2 The unclaimed-generated state

A page state: published, public, indexed, and unclaimed. It is a state of
**Claim** (§12), not a second representation, and it carries its own row in the
claim-state mirror rule (§5.0a).

### 4.3 What an unclaimed page contains

1. **Signals and bands render.** They are sourced facts, honestly labelled, and
   they are the catalog's substance. **"No generated judgment" means verdicts,
   awards and editorial treatment** — not banded signals.
2. **Visible provenance.** Every generated page states that it was generated
   from public sources and is unclaimed, naming its sources and fetch dates.
3. **No commerce descriptions.** No subscription or bounty explainer, no tiers
   and no prices. **The interest control does render** (§4.5).
4. **A pre-claim teaser renders** — list membership, stack membership and the
   interest count, with a claim invitation: *"12 people have this in a list.
   Claim this page to see more."* **Every count carries the below-4
   outcome-only mask** (§10.2): at launch volume "2 people have this in their
   stack" on a niche package is close to naming them.
5. **The claim CTA rides above-fold element 2.** No fifth element (§5.14).
6. **Opt-out without an account** — §8.7's request-first queue.

### 4.4 The standing no-ratings rule, extended

No rating markup, no stars, no composite score, no editorial verdict on a page
nobody claimed. This is what keeps generated pages, alternatives pages and lists
from becoming a review site.

### 4.5 The interest control

**Two mandated labels**, because the reputational exposure lives in the string:

- **Claimed page:** *"I'd fund this"* — the commerce framing, where a maintainer
  exists to receive it.
- **Unclaimed page:** *"Would you fund this? No maintainer has claimed this page
  yet — we'll tell them if they do."* Demand measurement; the absent maintainer
  stated on the control; no promise to anyone.

The aggregate is **held against the numeric repository ID, never a person** — no
payee, no promise, no addressee. Mechanics: §9.4.

### 4.6 Scale changes what discovery is

At thousands, **editorial becomes a quality layer over an algorithmic base**
rather than the base itself, and **ranking (open decision #5) becomes the
central design problem of this version** rather than a parked one.

---

## 5. Discovery

### 5.1 Design principles

All seven carried from v1.07 §3.4.1. Principle 5 ("editorial gates, the
algorithm orders") narrows in scope to the editorial surface; §5.3's ranking
carries the rest. Principle 7 (surface economy) is satisfied by §5.15's
acquisition-surface classification.

### 5.2 The health breakdown — five signals

| Signal | Primary source | Fallback | Cadence |
|---|---|---|---|
| Substantive updates (trailing 90d) | npm publish history | GitHub releases API | daily-capable, weekly floor |
| Merged external PRs | GitHub API | **HELD** | weekly |
| Dependents | npm / ecosyste.ms | Libraries.io | daily |
| Response substance | GitHub issues API | **HELD** | weekly |
| Security posture | OpenSSF Scorecard | own checks | weekly |

Funding health is removed with the money. **Every surviving signal is externally
sourced**, which is what makes generated pages computable.

**HELD — released by a research pass.** Two signals have no fallback while §4.1
asserts DEC-0002 requires one. At thousands, GitHub becomes sole provider for
two of five signals, **one of them ruled above the fold**, so a GitHub incident
empties element 3 catalogue-wide. Writing a fallback would mean inventing facts
about third-party APIs; it is held with markers rather than asserted.

**GitLab-hosted packages** may enter through a package registry and compute no
signals. They are admitted with a **signals-unavailable state, never silent
zeros**.

**"Insufficient data" (S11) is common, not rare.** An unavailable source renders
"insufficient data", never a guess.

### 5.3 Ranking

Decision #5 cannot stay parked: at 20–50 projects ordering is a display choice;
at thousands it is the product.

Carried unchanged: the published formula · no opaque composite · no
maintainer-editable field feeds ranking · the farm test before any signal ships
· the 7-day anomaly quarantine · **the campaign wall** — campaign traffic and
campaign data never touch ranking, health signals, discovery weight, nominations
or Your Deck, the house's campaigns included.

### 5.4 Filters, search and structured vocabulary

**One versioned schema, nine consumers:** the filter UI, Refine, MCP
`search_projects`, agent profiles, the JSON-LD generator, the AEO surface, the
curation chatbot, the alternatives generator, the list-page renderer.

**Search** matches project name and description; vocabulary facets are filters,
never search targets. That holding sentence was adequate at 20–50 projects and
**holds nothing at thousands**, where search is the discovery surface rather
than a convenience. It stands as the floor until decision #5 answers.

**Schema freeze.** v1 freezes after the wedge sessions and the dry-run — the six
vocabulary dimensions, band names and objective facets freeze; all other fields
are additive-only, v1 names never renamed. Verification status and the numeric
repository ID are v1 fields. **§6.4's MCP launches against schema v1.** The
freeze's trigger does not exist in this line (§16).

**Vocabulary at scale.** Most generated projects have no maintainer to declare
anything. **Generated vocabulary is inferred, marked as inferred, and a claim
replaces it with the maintainer's own** — maintainer-first survives as a
precedence rule rather than a source rule. **Inferred vocabulary is a moderated
object** and carries a report control (§11.7).

### 5.5 Browsing

**Front-door modules, order invariant:** (1) intent categories, always first;
(2) Your Deck; (3) discover-your-stack entry; (4) editorial — one featured card;
(5) Refine / curation chat — **one entry, not two**; (6) Ship Week, pinned above
categories only while live. At 360 px every module renders collapsed.

**Refine is the chat's entry point** — a short query filters, a conversation
curates. Two natural-language inputs onto the same schema on the same surface
would break surface economy on the front door itself.

**Your Deck** — 8–12 projects weekly from the preference profile and health
signals, explore dials, the discovery digest as its email form.

Two scale problems are carried openly: **the distribution floor** ("every
project appears in some decks weekly") is a DEC-0002 commitment **arithmetically
impossible at thousands**, and **Your Deck is a cold-start recommender** working
from a survey with no behavioural history. Both route to §16.

### 5.6 Editorial and Ship Week

Founding-team curation, named authors, visible dates, unpurchasable,
staff-awarded. The monthly floor is carried **as a floor, not as coverage**.
**No editorial treatment on an unclaimed page** (§4.3).

**Category editorial** is what the front-door module draws from until the
claimed set can sustain project features — on launch day every page is
unclaimed, and without it module 4 renders empty on the primary surface.

**A category feature may name claimed projects and may not name unclaimed
ones.** Naming an unclaimed project inside an editorial piece is project-level
treatment wearing a category's clothes. **The naming test applies at render, not
at publication**: a name whose project has left Active renders as plain text
without a link or a band. On launch day a category feature is therefore *about
the category* — what it is for, how its signals read, what "good" looks like.

### 5.7 Lists

Created, named, reordered, published or unpublished. Public lists at
`/lists/{handle}/{slug}`. Title, description, ordered items; **no ratings, no
scores** — a curated list is not a review.

**Claim-state rim:** a listed project that goes Retired renders as a dated
record; Revoked drops from public lists; **Suppressed drops from the public
rendering while the list's owner sees a private note that an item was removed on
request** — the project is not named publicly and a curator's artifact is not
silently corrupted.

### 5.8 Alternatives and comparison pages

Two templates — `/alternatives/{slug}` and `/compare/{slug-a}/{slug-b}` —
generated from the §5.4 schema. **Facts and bands side by side, no conclusion
drawn.** Never generated for a pair with insufficient signal on either side.

### 5.9 Reverse dependency

"Who depends on this" — a project-page module and an AEO answer surface, from
dependents data already ingested.

### 5.10 The curation chatbot

Grounded in the catalog only; every recommendation cites a project page; it
cannot discuss projects outside the catalog. **Output is a draft list, not
prose.** Subject to the campaign wall and the no-ratings rule. **DEC-0031's
prohibition on the AI house style binds the surface.** Conversations are never a
ranking input; transcripts are never indexed.

### 5.11 Discover your stack

**Connect providers:** GitHub and GitLab — the scan reads GitLab-hosted
manifests and matches resolve against the catalog.

OAuth (read-minimal) or manifest paste → scan → matches with health breakdowns →
**save to list · register interest · nominate**. "In my stack" default sort,
announced and clearable. Server-side scan, explicit consent.

**The shareable stack page — public-source scans only.** A completed scan may be
published at `/stacks/{handle}/{slug}` **only when its source is a public
repository the platform can verify**. Pasted manifests and private-repository
scans are scannable and never publishable.

The test is **source visibility, not who ran the scan**: the risk is publishing
a dependency inventory that is not otherwise public, identical for a solo
developer's private client project and for a large employer's, and where the
manifest already sits in a public repository the match set discloses nothing
new. Read-minimal OAuth reports repository visibility, so the test is evaluable.

**An interstitial names exactly what is being published**, and states the
reason: the set of matched projects is a dependency inventory.

**Retention.** The manifest and its unmatched entries are not retained beyond
session unless saved; **matched project references persist as an aggregate count
with no scan or account referent**, which is what §4.4's stack-membership
analytics reads.

**Nomination.** Nominators are notified when a nominated project's page **is
published — generated or claimed** — again if it later goes Active, or at 90
days.

### 5.12 Public surfaces (11) and action states (3)

**Public:** Discover front door · Category view · Filter/search results ·
Project page · Ship Week hub · Methodology page · Editorial surface · Public
list page · Alternatives page · Comparison page · Public stack page.

**Action states:** Nominate · Register interest · Save to list.

Register interest and Save to list are full-screen states of the apex project
page, obeying §7's entry-state rule. **Nominate is a state of the scan-result
and search surfaces** — it fires where no project page exists by definition.

### 5.13 Peer recommendations

- **Authored** on Discovery presence — profile, by a claimed maintainer, about
  another project.
- **Rendered on the recommended project's page**, attributed to the recommending
  project by name and linking to it. **The attribution is the mechanism** — the
  growth comes from the recommender's audience seeing it.
- **Claimed projects only, in both directions.**
- Display-only; never feeds ranking. Reports route to **Project moderation**.

**Shoutouts stay out** — supporter-side, post-payment, no capture moment here.

### 5.14 The project page

**Above the fold at 360 px, exactly four elements:**

| # | Element |
|---|---|
| 1 | Identity, carrying the verification indicator |
| 2 | **Claim state and provenance** — carries the claim CTA on an unclaimed page |
| 3 | Two-signal summary — **maintenance rhythm + contribution breadth** |
| 4 | Primary CTA — **Save to list** |

Every element computes for an unclaimed generated page. Consent chrome may
render without adding a fifth element or demoting the four.

**The two-signal pair.** Maintenance rhythm is the substantive-updates signal;
**contribution breadth is merged external PRs**, rendered under its schema-v1
band name. Dependents was rejected as the second signal: it is a popularity
measure, and DEC-0002's thesis is that discovery is broken *because* it is
popularity-ranked. **Stated plainly: every surviving signal is computable from
public sources, so the pair is now differentiated by selection and presentation,
not by exclusive data.**

**Below the fold, order invariant:**

1. **The pre-claim teaser plus the interest control** (unclaimed) or **the
   foreshadow block** (claimed)
2. Full health breakdown — five signals, banded
3. The provenance line with source dates
4. Vocabulary, with its inferred marker where inferred
5. Editorial verdict — claimed only
6. Peer recommendations — claimed only
7. Reverse dependency
8. More from this maintainer — claimed only
9. Ask your agent
10. The badge
11. Report controls — page correction, and vocabulary contest where inferred

**AEO composition:** the identity element's description is the answer-first
summary sentence; the full breakdown renders as a fact table of already-public
numbers; dates are visible; the provenance claim appears in plain text where an
answer engine can quote it.

### 5.15 Acquisition surfaces

**Lists, alternatives pages, comparison pages and stack pages are acquisition
surfaces, not discovery surfaces.** They are reachable from search and from the
object they belong to, and **never** front-door modules. Discovery principle 7 —
"mechanisms are modules, never sibling destinations" — is satisfied by design:
these are landings, not discovery mechanisms.

**Reserved namespace segments**, so none can collide with `/{owner}/{repo}`:
`lists`, `alternatives`, `compare`, `stacks`.

---

## 5.0a Crawl surface, SEO and AEO

**Governing fact:** AI crawlers execute zero JavaScript. SSR is load-bearing; no
catalog fact moves behind client-only rendering.

**Indexed:** marketing · /discover · `/discover/{category}` · project pages,
including generated-unclaimed and Retired dated records · `/editorial` · Ship
Week hub · the methodology page · `/lists/{handle}/{slug}` ·
`/alternatives/{slug}` · `/compare/{a}/{b}` · `/stacks/{handle}/{slug}`.

**Never indexed:** filter permutations and sort orders (robots.txt) · the three
action states (noindex) · Revoked pages · app.notavibe.dev entirely · admin.
blocked outright · curation chat transcripts · private lists · unpublished stack
scans.

**Empty filter results return HTTP 404 carrying the designed S4 relaxation UI** —
status for crawlers, state for humans.

**BreadcrumbList lists only real pages:** Home → Discover → Category on category
pages; Home → {owner}/{repo} on project pages. No `/{owner}` crumb.

**The claim-state mirror rule — one source of truth.** Every machine-readable
trust surface mirrors the verification indicator.

| Claim state | Machine-readable rendering |
|---|---|
| **Generated — unclaimed** | Provenance line states generation, sources and fetch dates; **bands render**; no verification fields; no verdict; no commerce descriptions; JSON-LD carries facts and `codeRepository`, no verification claim |
| Active | Verification fields + provenance line as specced |
| Lapsed | Verification fields switch to re-verification-in-progress; fact table unchanged |
| Retired | Indexed as a dated catalog record; provenance line removed; verification fields dropped |
| Revoked | Renders like Retired + noindex |
| **Suppressed** | **Nothing renders anywhere.** Page 404s and leaves the sitemap; the record drops from search, filters, categories, Your Deck and the front door; removed from MCP responses, the read API, agent profiles and llms.txt; excluded from alternatives and comparison generation; drops from the public rendering of any list |

**Suppression is catalog-level.** A remedy that stops at the HTML page leaves six
machine-readable surfaces answering. Two operational clauses ride with it:
**suppression survives re-ingestion** (keyed to the numeric repository ID and
checked at selection and refresh — §8.4, §8.6) and **suppression is liftable**
(§7.4).

**The survival column.** On a dated record: health breakdown survives frozen ·
vocabulary survives · verdict survives · recommendations drop ·
More-from-this-maintainer drops · ask-your-agent drops · lists containing the
project render it as a dated record. The pattern that decides the next module:
**dated facts survive frozen; live relationships and interactive surfaces
close.**

**Canonical and redirect hygiene:** self-referencing canonicals · lowercase-only
slugs · 301 on case and slash variants · utm and click-ID stripping · chain
rewriting to the final destination · sitemap index with honest lastmod.

**Structured data — generated, never hand-written:** Organization · WebSite ·
BreadcrumbList · SoftwareApplication + SoftwareSourceCode as one @graph per
project page · ItemList on categories and public lists. JSON-LD only; markup
mirrors visible content.

**AI crawlers — allow all** on public surfaces, with edge logging from day one.

**The methodology page** carries verification, the signal table humanized, what
the bands mean, the governance formulas, the campaign wall, **how generated
pages are made and how to opt out**, **how ranking works at catalog scale**, and
**the data-handling section Sam reads** (§10.5).

---

## 6. Agent surfaces, MCP and API

The platform's strongest AI-native surface, and the reason the catalog is worth
generating.

**6.1 Agent-legible profiles.** Stable apex URLs, bands only, including
verification status, the bound `owner/repo` and the numeric repository ID. On
unclaimed pages the profile carries generation provenance in place of
verification fields.

**6.2 llms.txt.** One cheap generated artifact. No AI system has measured
consumption of it; it claims nothing and never substitutes for server-rendered
HTML.

**6.3 Ask your agent.** A labeled external action; a platform-generated prompt
over sanitized fields, instructing verification against the user's codebase and
lockfile. The numeric repository ID makes the repo-match machine-checkable.

**6.4 The catalog MCP (read-only).** Four tools plus profile resources:
`search_projects` · `get_project` · `compare_projects` · `get_lists`.
**`get_lists` returns public lists only.** **Suppressed projects are absent from
every tool's response.** Registry-listed. Auth: none / API key. **Tool
descriptions are treated as a poisoning surface.** Launches against schema v1.

**6.5 The read API.** Project, health breakdown, lists, catalog search. **No
subscribers endpoint** — no subscribers — which discharges v1.07's held consent
instrument and its counsel item.

**6.6 Webhooks.** `project.verification_changed` · `claim.state_changed` ·
`page.published` · `page.suppressed`. HMAC-signed, retries, delivery log.

**6.7 Embeds.** The **badge** ships, generated from claim state. The progress bar
does not — it rendered funding progress.

**6.8 Inbound GitHub App webhooks.** `repository` (rename, transfer, archive,
delete) and `installation` events feed the claim lifecycle; the weekly
`full_name` reconciliation poll covers owner renames, which fire no webhook.

---

## 7. Topology and shell

- **One application serves notavibe.dev and app.notavibe.dev.** The shared
  header is native and the three action states are route-addressed page states.
- **admin.notavibe.dev is a separate deployment** (SSO + VPN isolation).
- **pay.notavibe.dev does not exist in this version.** It returns with
  subscriptions.
- **Session:** a cookie scoped to `.notavibe.dev`.
- **Stack:** Next.js (App Router) + React + Tailwind; **xstate for the claim
  lifecycle — one statechart, not five.**
- **Entry states:** logged out, actions visible and enabled; activating one opens
  a sign-in interstitial scoped to that action; auth lands in the action state,
  never the dashboard.
- **The role switcher is carried.** In this version the dual role is universal —
  every maintainer starts as a visitor and a Backer, finds her page, then claims
  — and the two roles sit at different densities on the same host. Last-used
  context on login; single-role users see no switcher.
- **MoR disclosure is foreshadowed, not deleted.** Processing nothing means
  disclosing nothing, but the sentence and its merchant-of-record subject
  (v1.07 §6.2) stay marked.

| Surface | Audience | URL | Density | Mobile |
|---|---|---|---|---|
| Public catalog | Everyone, incl. agents | notavibe.dev | Comfortable · top nav | Full (mobile-first) |
| Maintainer | Owners and co-maintainers | app.notavibe.dev | Regular · left nav | Full |
| Backer | Signed-in discoverers | app.notavibe.dev | Comfortable · top nav | Full (mobile-first) |
| Admin | Platform operators | admin.notavibe.dev | Compact · left nav · dark | None |

**Backer mobile: 5 tabs** — Discover · My stack · My lists · Activity · More.
**The More index is a Dashboard state, not a screen.**

### 7.1 Personas

| Persona | Role |
|---|---|
| Maya | Maintainer — claims and holds a page; no earnings surface |
| Raj | Backer — discovers, lists, scans, registers interest; no money |
| Evelyn | Corporate buyer — scans a company stack; org waitlist only |
| Alex | Platform operator — owns §11's queues, including two that did not exist |
| Sam | Security reviewer, never logs in; holds a veto (§10.5) |

---

## 8. Claims, the claim lifecycle, and ingestion

### 8.1 The claim flow

A GitHub App requesting only **Metadata (read)** — no write access, ever. Three
steps: sign in with GitHub; install the App on the repo; call
`GET /repos/{owner}/{repo}/collaborators/{login}/permission` under the
installation token, requiring `permission: admin`. Numeric repository and owner
IDs are stored with a slug snapshot.

**What claiming does is inverted from v1.07:** the page already exists and the
claim binds a human to it. The transition is generated-unclaimed → Active, and it
replaces generated content with maintainer-authored content per §5.4's
precedence rule.

**Claim-creates-page — the fallback supply path.** The selection floor (§8.7)
admits the catalog; **it does not bound who may join.** A maintainer who passes
the admin check gets a page whether or not ingestion found the project — below
the floor, outside the wedge, or never reached. **The suppression check is a
different gate and this bypass does not cross it.**

**Entry points:** the above-fold element-2 CTA on a generated page, and a
self-serve entry on the marketing surface for everyone else.

### 8.2 Slug derivation and namespace lifecycle

The slug is `{owner}/{repo}`, a projection of the verified namespace; **the
identity anchor is the numeric repository ID**, with the owner ID maintained on
verified events. Repo rename or transfer re-derives the slug with a 301; owner
rename is detected by the weekly `full_name` reconciliation poll; redirect death,
chain rewriting and retirement sequencing carry from v1.07 §6.1a.2.

**Generated pages obey the same namespace rules** — stale slugs on unclaimed
pages would poison the namespace before anyone claimed anything.

### 8.3 Roles

Co-maintainer is **granted inside notavibe and accepted by the grantee, never
auto-synced from GitHub**. GitHub `maintain or above` is a grant-time
eligibility check via `role_name`; post-grant drift is documented; revocation is
one action; invitations expire unaccepted at 14 days, with decline and expiry
notified in-app to the granting maintainer.

With no bounties there are no stakes, so grants carry no money check. That
machinery is foreshadowed.

### 8.4 The claim lifecycle

**Generated-unclaimed · Active · Lapsed · Retired · Revoked · Suppressed.** One
xstate machine — the only statechart this version ships.

- **Lapsed (30-day cure clock):** the indicator switches to its lapsed state. No
  payout freeze, no held accruals, no billing — foreshadowed. What remains: the
  honest indicator, the cure path, **and an in-app pending action**, because an
  act-by clock may never depend solely on email delivery.
- **Uncured at day 30 → Retired:** the page becomes a dated catalog record and
  stays indexed.
- **Voluntary retirement:** from Project settings, typed-name confirmation.
- **Revoked:** admin-forced for ToS cause; renders like Retired + noindex.
- **Repo archival is a no-op:** logged, rendered honestly, nothing transitions.
- **Transfer:** the protocol defers with the money. A repo that changes hands
  fires the `repository` webhook, IDs match, the slug re-derives. **An
  unconfirmed transfer fires Active → generated-unclaimed** — the page survives
  and the binding does not, which is correct where the repository is live under
  a new owner who may claim it.

**Suppression — four edges.**

| # | Edge | Trigger |
|---|---|---|
| 1 | generated-unclaimed → Suppressed | A suppression request granted (§8.8) |
| 2 | Suppressed → generated-unclaimed | Lift by the original requester, filed as a **lift** PageRequest through the account-free request URL |
| 3 | Suppressed → Active | A verified claim, **only where the basis was own-behalf and the predecessor was generated-unclaimed** |
| 4 | Retired → Suppressed | A request from **someone who proves repo admin now**. Never from Revoked, never from Active |

**A claimed maintainer has both exits.** Retirement leaves the dated record
standing and remains the default; **suppression of her own page is also hers**,
because claiming was consent and consent is withdrawable. Same typed-name
confirmation, no counterparty surface, no SLA — she acts on her own page, so
nobody is acted against.

**Why the dated record yields here and not in v1.07:** v1.07's Retired record
exists because money flowed through the page and supporters needed to know what
happened to a project they had funded. **No money flows here**, so nothing was
relied upon that the record protects.

**Edge 4's guard is current control, not retirement cause.** The §8.1 admin
check already answers it: someone who lost control cannot pass it, and someone
who has it is the person whose consent is at stake.

**Edge 3 is scoped by predecessor as well as basis.** An edge-4 suppression is
own-behalf by construction, so basis alone would let any future repo admin
reverse a maintainer's own withdrawal of consent. **A suppression entered from
Retired lifts only on its own requester's lift request.**

**Never from Revoked** — letting its subject suppress the record would erase an
enforcement action.

**Closed-world statement.** The four edges above, plus the transitions in this
section, are **the complete transition set**. Any state pair not named is not a
transition — notably Lapsed → Suppressed (cure, or let it run to Retired first),
Retired → Active (a Retired record does not reopen; the repository may be
claimed afresh under §8.1), and Revoked → anything. **Revoke-and-reset** (§8.5)
resets the contest, not the claim state.

### 8.5 Claim contests

First verified claim wins; a second admin sees the existing claim and the contest
path. **Contests ride the 72-hour SLA**; revoke-and-reset is the only remedy; no
forced transfer; a contested claim keeps its page live during review.

**The counterparty surface is Claim contest — evidence & outcome** (§4.3 of the
maintainer portal), where either party files evidence and reads the ruling. A
queue with an SLA and no counterparty surface inverts §11.7's own rule.

### 8.6 The verification indicator

"Maintainer verified via GitHub" plus the bound `owner/repo`, a plain-language
explainer, and the lapsed state. Structural, unpurchasable, no ranking weight.

**Its unclaimed state is not a gradation.** The no-gradations rule bars *degrees
of verification* that could become a purchase surface. Unclaimed is **the absence
of a claim, not a weaker claim**: reachable by anyone for free in three steps,
conferring nothing, unpurchasable. A page with no indicator would read as a
failed verification.

### 8.7 Ingestion

**What the pipeline produces:** a Project record, five health signals, inferred
vocabulary, a SourceRecord per source with its fetch date, and a published page
in the generated-unclaimed state.

**Sources:** the §5.2 sources plus the package registries the catalog is drawn
from. Every source wants a named fallback and a degradation path; §5.2 carries
two HELD rows rather than asserting compliance the document does not have.

**Rate limits and quota:** v1.07's quota math does not survive scale. **GraphQL
batching ships at MVP**, not as a growth lever. Per-source rate budgets, backoff,
and a refresh queue that degrades gracefully. **A degraded refresh and an anomaly
must be distinguishable** (§11.5).

**Selection.** Not every public repository. The wedge is JS/TS tooling; entry
criteria are a floor on the same signals that rank, published on the methodology
page. **Selection is a ranking decision wearing an ingestion decision's clothes**
and belongs to decision #5. It bounds the catalog, not who may join.

**The suppression check runs first**, before any other criterion: selection reads
the `Suppressed` state keyed to the numeric repository ID and **excludes the
repository outright**. The same key is re-read at refresh, so a suppression
granted mid-cycle takes effect at the next pass. Without it the next refresh
undoes the remedy on a timer.

**Dedup and identity:** anchored to the numeric repository ID exactly as claims
are. One record per repository across registries.

**Refresh and staleness:** generated pages carry fetch dates visibly. A page
whose sources have gone stale past a published bound **renders as stale rather
than as current**.

### 8.8 Opt-out, suppression and corrections

**A request-first queue, open to anyone.** A suppression request is filed **from
the page itself, from a stable account-free request URL on the methodology page,
or from Project settings on a retired project** (edge 4). The account-free URL
exists because the page-borne form disappears the moment a suppression succeeds,
and lift requests need an inlet that outlives the page.

**GitHub admin proof is an accelerator, not a gate:** a requester who can
complete the §8.1 check is actioned automatically; everyone else is actioned by a
human from §11.4's queue.

**Open to anyone means anyone** — a current admin, a former maintainer, an author
whose repository moved, a legal representative, a trademark or defamation
objection.

**Scope, stated at intake.** Suppression applies to **generated-unclaimed pages
and to Retired pages**. **An Active page is never suppressed while claimed.** The
intake routes the two excluded cases:

- **A maintainer whose page is Active** → **voluntary retirement**. Retirement
  and suppression are both hers: retiring leaves the dated record, and she may
  then suppress it. Edge 4 **writes a PageRequest** (type: suppression, basis:
  own-behalf), so edge 2's trigger exists for it.
- **A third-party objection to a claimed page** → **out of scope for MVP**,
  routed to the legal contact. Stated as the trade it is: a dispute between two
  parties over a claimed page gets an address rather than a product surface,
  because a two-person rota does not adjudicate trademark in 72 hours and a queue
  implying otherwise would be worse than none.

**Scope is re-checked at ruling, not only at intake.** Intake is a moment and the
subject's state is not frozen at it. A request whose subject went Active while
queued is closed as out-of-scope with the same routing. **There is no Active →
Suppressed edge and this is why.**

**The request is a record.** A **PageRequest** (§12) carries type (suppression ·
correction · lift), **basis** (own-behalf · third-party-objection), subject
repository ID, requester address, proof state, outcome and a retention bound.
**The address outlives a granted suppression** — it is edge 2's trigger, so the
bound runs from the request's **final** outcome, lift included. It is the only
record in this version holding an address belonging to a person with no account.

**App uninstall is not a suppression proof.** Uninstalling is a loss-of-control
tripwire under §8.4; the two machines are kept apart so a suppression cannot fire
a lifecycle transition.

**Objection-caused suppression is terminal at MVP.** There is no forum to resolve
one in, so a claim attempt on such a record is refused and routed to the legal
contact. The alternative would be a platform that grants a remedy and hands its
reversal to the party it was granted against.

**The legal contact:** a published route, named on the methodology page and
quoted at intake, carrying an honest commitment — **notavibe responds and does
not adjudicate**. No SLA. **The address is a founder fill** (§16).

**Corrections.** A factual error is reportable from the page by anyone, routing
to §11.4 — the report-control rule applied to a new moderated object.

**Counsel-reviewed, not launch-blocking.**

---

## 9. The maintainer platform, and the Backer workspace

### 9.1 What a maintainer can do

Claim a page, hold it against the lifecycle, keep vocabulary and profile
accurate, author peer recommendations, grant co-maintainers, see discovery
analytics, file and answer claim contests, retire it, and suppress it after
retirement.

**Absent:** Tiers & pricing · Subscribers · Payouts · Bounties inbox · Bounty
detail · Epoch create · Epoch results · Gates · Posts & artifacts · Campaigns ·
Campaign detail. **Maintainer campaigns are out** — a lightweight maintainer
platform does not ship an ad panel.

### 9.2 Maintainer screens (8)

Dashboard · Discovery presence — profile · Discovery presence — reach · Claim
contest — evidence & outcome · API & webhooks · Project settings · Account
settings · Onboarding. A **project switcher** scopes every per-project surface —
navigation, not a screen.

### 9.3 The Dashboard

Two compositions:

- **Discovery analytics roll-up — the claim hook.** Discovery volume, deck
  appearances, **list membership**, **stack membership**, the **interest
  register** per foreshadowed system, referrer split, crawler/human split. Data
  only the platform holds, costing no payment rail.
- **Pending actions across projects.** Required by three carried invariants: the
  default notice-channel posture, the delivery-failure invariant, and the 30-day
  cure clock.

All analytics are aggregate. **No visitor-level data reaches a maintainer.**

**The interest-count rendering rule.** *"I'd fund this" is not "I will pay $5 a
month."* The count renders with a stated constraint on its meaning and **never as
a revenue projection, implied or computed** — the equivalent of DEC-0004's
banded-display rule, for the same reason.

**Aggregating surfaces:** Dashboard, Account settings, the claim-status roll-up.
Per-project: vocabulary, profile, signals, analytics detail, roles,
recommendations.

### 9.4 The primary KPI

v1.07 counts maintainers above $1,000/mo aggregate MRR. This version has none.
**The KPI is claimed pages and their retention** — how many generated pages get
claimed, and how many claimed pages stay Active. The threshold is §16's.

### 9.5 Backer screens (8)

Onboarding & preference profile · Dashboard · Discover-your-stack connect · Scan
results · My lists · List detail · Curation chat · Settings.

**Absent:** Subscribe flow · Checkout · Post-subscribe · My subscriptions ·
Billing & receipts · Corporate billing profile · Invoice history · Bounty detail
· My bounties · Epoch results · Dispute open & evidence.

### 9.6 The Activity surface

| Item type | Trigger | Valence |
|---|---|---|
| Nomination outcome | A nominated project's page is published, or goes Active | Positive |
| A listed project was claimed | A project in the Backer's list gains a maintainer | Positive |
| A list they published was saved | Threshold: **4 saves** | Positive |
| Claim outcome | A claim or contest the Backer filed resolves | Neutral |
| List activity | A listed project reaches a terminal claim state | Negative |
| Interest outcome | A foreshadowed system they registered for opens | Positive |

Deadline-ascending where a deadline exists; overlaps collapsed; acted and expired
items move to Recent outcomes for 14 days; badge counts open items; designed
empty state. **The delivery-failure fallback class is carried.**

### 9.7 Lists

Created from My lists, from the curation chat, or from a project page's
save-to-list action state. **A public list carries a save control** for signed-in
Backers, copying it into the saver's own lists as an independent list — not a
subscription to the original.

### 9.8 The interest register

- **Captured:** account, project, foreshadowed system, timestamp. Nothing else.
- **From whom:** signed-in Backers, **on claimed and unclaimed pages alike**.
  Restricting it to claimed pages would sample the population that has already
  converted, and the instrument would answer a different question than §2 asks
  of it.
- **Consent basis:** the account-holder relationship. It carries no marketing
  permission — **registering interest subscribes no one to anything**, and the
  confirmation says so.
- **One per account per project per system.** Re-clicking withdraws.
- **Rendered to the maintainer** as an aggregate count under §9.3's framing rule,
  never as identities.
- **Anti-gaming:** an account is free and the party with the strongest motive to
  inflate the count is the maintainer whose page displays it. **Sybil detection
  is pointed at the register**, with account-age floors and rate limits. **Alex
  owns detection**; the count is not a decision input until it clears.
- **Purpose:** the threshold that answers "build payments next" (§16).

### 9.9 The organisation waitlist

Evelyn's signal, on the stack-scan result. Writes to **OrgInterest** — company,
stack size, contact, timestamp — **a separate entity from DemandSignal**, which
has a project referent. Retention-bounded; consent basis stated at capture; **not
aggregated into any maintainer's analytics**, having no project to aggregate to.
Read on the **Demand signals** admin screen; Evelyn receives an acknowledgement.

### 9.10 Retention

The discovery digest is the version's only return-trigger email and stream (c) is
off at signup. **Onboarding carries an explicit opt-in moment** — a real choice,
never a pre-ticked box. A discovery product whose sole return-trigger is
opt-out-by-default will not retain, and retention is the KPI.

---

## 10. Consent, disclosure and platform campaigns

**10.1 The principle set.** Server-only, **client pixels never — house
included**. Consent is the fourth, visitor-scoped category on the versioned
consent log, captured **before** click-ID persistence. Custom CMP, not TCF.
Reject-as-easy-as-accept. Consent Mode v2 signals. Evidence-grade records. **One
grant per visitor.** Consent-denied visitors browse identically; only measurement
degrades.

**10.2 The pipeline.** SSR landing capture into an AttributionTouch; last
non-direct click, 30-day window, first-touch paired; Meta CAPI and Google Data
Manager forwarding; notavibe-observed vs platform-reported columns; **the below-4
outcome-only mask on every egress** — rendered table, CSV and API alike; bot
honesty, with crawler hits routed out of campaign tables.

**10.3 The conversion sequence.** One funnel, then a set:

`project_page_view` → `account_created`

Then three **post-account outcomes, alternatives rather than a sequence**, each
reported independently: `save_to_list` · `stack_scan_complete` ·
`interest_registered`. **The dashboard renders them as a set and labels them as
one** — presenting alternatives as a funnel would report conversion above 100% at
every step.

**10.4 The zero-tracking floor.** US-678 enumerates pay., app., admin.,
enterprise. **pay. and enterprise. do not exist in this version**; the floor binds
app. and admin. as written. **Narrowing a founder-confirmed ruling is a ruling,
not a fold** (§16).

**10.5 What Sam can read.** The methodology page carries a **data-handling
section**: what is collected, from whom, retention bounds, sub-processors, the
server-only rule, the scan's retention rule, and the consent record's shape. Sam
never logs in; this is the only surface he reads, and without it he has nothing
to review.

**10.6 Campaign targeting and neutrality.** Platform campaigns promote surfaces
and the platform — **never individual projects**, and **never a
generated-unclaimed page**, which would be the neutrality default's worst case.

A campaign may target `/discover`, a category, the methodology page, Ship Week,
or an **editorially-curated list published under Editorial tools**. It may not
target a Backer's public list, an alternatives page, a comparison page or a stack
page — each promotes named projects, and buying traffic to one is placement
through the side door.

**Since no campaign can target a project page**, v1.07's campaign × claim rim —
Lapsed auto-pause, the Lapsed-before-redirect-death sequencing, the campaign-URL
warning line — cannot fire and is not carried.

**10.7 Controllership** is **sole** in this version — platform campaigns only.
The joint-controllership Art. 26 arrangement with maintainers returns with the
maintainer ad panel, which is out of this version rather than foreshadowed.

---

## 11. Admin

**11.1 Screens (15), grouped.**

- **Adjudication (3)** — Claim contest queue · Contest detail · Nomination inbox
- **Catalog (5)** — Catalog ingestion · Page corrections & takedowns · Taxonomy &
  categories · Vocabulary contests · Anomaly quarantine
- **Integrity (3)** — Sybil detection · Project moderation · Audit log
- **Platform (4)** — User lookup · Editorial tools · Demand signals · Config

**Out:** Payout operations.

**Keyboard-first; typed-name confirmation on destructive actions.** Suppression
is a destructive action.

**11.2 The two adjudication types:** claim contests and page-correction
escalations. Subscription and billing disputes, bounty escalations, transfer
objections, revoked-fund rulings and the refund-failure queue are foreshadowed or
out.

**11.3 Catalog ingestion.** Source health, per-source fetch success and staleness,
refresh-queue depth, quota headroom, dedup conflicts awaiting a call, and the
selection floor's admission rate. **The screen that tells an operator whether the
catalog is telling the truth.**

**11.4 Page corrections and takedowns.** Three lanes matching PageRequest's three
types: suppression requests with or without GitHub proof, **lift requests**, and
factual corrections. A lift outcome rides the takedown-acknowledgement family. **A
direct cost of the generation strategy, staffed as such.**

**11.5 Anomaly quarantine.** The 7-day window is carried, but the degrading
refresh queue means **a source outage and an anomaly look alike**. Quarantine
reads the §11.3 source-health state and **suppresses anomaly flags for signals
whose source is known-degraded** — otherwise every provider incident becomes a
quarantine event.

**11.5a Taxonomy and categories.** At thousands, **category assignment is
automatic with staff correcting it** — the same inversion editorial and
vocabulary undergo. **A correction surface, not an assignment surface.**

**11.6 Vocabulary contests.** Inferred vocabulary on thousands of pages makes each
a moderated object. **This is a second corrections queue** and is counted as one
in the ops plan.

**11.7 The report-control rule.** Every moderated object carries a report control
on its rendering surface routing to the adjudicating queue — inferred vocabulary
to Vocabulary contests, **recommendations to Project moderation**, generated-page
errors to corrections. **A queue never launches without its inlet.**

**11.8 The operating plan.** The hire trigger is carried unchanged — **median
resolution >48 hours or >10 open items for two consecutive weeks** — and
**corrections, takedowns and vocabulary contests all count toward it.**

**The rotation itself is HELD** pending a volume estimate (§16). v1.07's 2-person
twice-daily rota was sized for 20–50 projects and no generated catalog; at
thousands, corrections and vocabulary contests are not Friday batches, and writing
a headcount without an estimate would be the same error as writing a fallback
without a source.

---

## 12. Data model — 19 entities

**Carried (12):** User · Project · **Claim** · Nomination · Recommendation ·
StackScan · Dispute · AuditLog · Integration · Campaign · AttributionTouch ·
ConversionEvent.

**New (7):**

| Entity | Carries |
|---|---|
| **List** | Owner, title, description, ordered project references, visibility, slug |
| **IngestionSource** | Source identity, cadence, quota budget, health state, fallback pointer |
| **SourceRecord** | Per project per source: ingested facts and fetch date — the substrate for visible provenance |
| **DemandSignal** | Account, project, foreshadowed system, timestamp |
| **OrgInterest** | Company, stack size, contact, timestamp. **No project referent** |
| **ConsentRecord** | The visitor-scoped, versioned, evidence-grade consent record |
| **PageRequest** | Type (suppression · correction · lift), **basis** (own-behalf · third-party-objection), subject repository ID, requester address, proof state, outcome, retention bound |

**Out (15):** Organization · Tier · Subscription · Seat · BillingProfile · Gate ·
Post · Artifact · Invoice · Bounty · BountyFunder · Vote · VoteEpoch · Payout ·
SBOM.

**Claim is the single source of truth** for whether a page is generated or
claimed. It carries: claimer (**null while generated-unclaimed**), numeric
repository and owner IDs, slug snapshot, **state**, verified-at, re-verification
log, slug history. **The Suppressed state is keyed to the repository ID and read
by the ingestion pipeline at selection and refresh.**

**Project gains** the inferred-vs-declared vocabulary precedence marker and
per-surface content-changed timestamps.

**Integration's surviving types:** platform-level ad credentials (`ads_meta`,
`ads_google`) and GitHub.

### 12a Glossary — new rows

| Term | Means, exclusively |
|---|---|
| generated-unclaimed | A published, public, indexed page created from public sources with no claim behind it. A Claim state, not a page type |
| provenance line | The plain-text statement of generation, sources and fetch dates on an unclaimed page |
| inferred vocabulary | Vocabulary derived by the pipeline, marked as inferred, replaced by a maintainer's own on claim |
| selection floor | The signal threshold admitting a project to the generated catalog. Bounds the catalog, never who may join |
| interest register | The aggregate of DemandSignals for one project and system |
| demand signal | One Backer's registered interest in one foreshadowed system on one project |
| foreshadowed | A system described with no functional affordance. Never a date, never a price. Descriptions render on claimed pages only; the interest control renders on both |
| contribution breadth | The merged-external-PRs signal, rendered under its schema-v1 band name |
| Backer | The signed-in discoverer persona. **⚠ collides with v1.07's escrow sense — §16** |
| list / public list | A Backer-curated collection; published lists are indexable acquisition surfaces |
| stack page | A published scan result. Publishable only where the scan's source is a verifiable public repository |
| alternatives page / comparison page | Generated acquisition surfaces presenting facts and bands without drawing a conclusion |
| curation chat | The grounded catalog assistant whose output is a draft list |
| acquisition surface | An indexable landing reachable from search and from its object, never a front-door module |
| catalog ingestion | The pipeline producing generated pages |
| page correction | A reported factual error on a generated page |
| suppression | Catalog-wide removal of a generated-unclaimed or Retired page on request. Nothing renders on any surface; distinct from Retired, which stays indexed as a dated record. **Liftable** |
| suppressed | The claim state entered by a granted suppression. Reachable from generated-unclaimed and from Retired. **Never from Active** — a page is never suppressed while claimed — and **never from Revoked** |
| foreshadow block | The subscription and bounty descriptions plus the interest control, first below the fold on a claimed page |
| pre-claim teaser | The count-plus-invitation rendered on an unclaimed page, masked below 4 |
| reverse dependency | The "who depends on this" module |
| IngestionSource · SourceRecord · OrgInterest · ConsentRecord · PageRequest | As defined in §12 |

**Open:** the disposition pass over v1.07's carried 65 rows (§16).

---

## 13. Notifications — 11 transactional emails

**Carried from v1.07 (7):** welcome (2 variants: backer · maintainer) · account
email verification · verification lapsed — action needed · verification restored ·
**project page retired** · claim revoked · co-maintainer grant invitation.

**New in this line (4):** contest resolved · page correction acknowledged ·
takedown acknowledged · organisation waitlist received.

**Recipient classes.** *Project page retired* goes to **Backers who have the
project in a list** — in-app it is the Activity list-activity item. The three
acknowledgements go to a reporter who may have no account; **an address is
captured at request time as the sole purpose of the record**, used once, and they
ride **stream (a)** on the obligation basis.

**The three streams by consent basis:** (a) transactional/obligation, **never
unsubscribable** · (b) project updates · (c) platform, **off at signup with §9.10's
explicit opt-in moment**.

**The delivery-failure invariant:** every stream-(a) email carries delivery
tracking and retry, and on persistent failure the obligation surfaces as an in-app
pending action. **No act-by clock may ever depend solely on email delivery.**

**The default notice-channel posture:** where the spec says "notified" without
naming a channel, the notice is in-app.

**Outside the count:** the discovery digest and the Ship Week digest (stream (c)),
and the rename notice.

---

## 14. Quality baselines

- **Accessibility:** WCAG 2.2 AA by construction; jest-axe per component; async
  screen-reader announcements.
- **State coverage:** baseline 9 of 13 (S1, S2, S4, S5, S8, S9, S11, S12, S13);
  S4's specification is §5.0a's 404-plus-relaxation rule. **Full 13 on the claim
  lifecycle and on flows 1, 7 and 8** — catalog generation, suppression and
  correction. This is the version's most exposed machine: a wrong state there is a
  published page about a real person.
- **Responsive:** 360/768/1024/1280/1536; bottom tab bar.
- **i18n readiness:** English-only at MVP, strings externalized, ICU plurals, Intl
  formatters, logical CSS, pseudo-locale mode.
- **Design tokens as the contract:** OKLCH tokens, generated contrast audit.
- **Search & answer-engine baseline:** generated JSON-LD from the profile schema,
  self-referencing canonicals, honest lastmod, SSR for every catalog fact.
- **Measurement baseline:** server-only, consent-first, campaign-scoped, labeled
  columns.
- **API documentation** at the product bar, example payloads included.

---

## 15. Key end-to-end flows — 11

| # | Flow | Surfaces |
|---|---|---|
| 1 | Catalog generation: source ingest → dedup → signals → generate → publish unclaimed | Platform |
| 2 | Maintainer: find page (or self-serve entry) → claim & verification → profile, vocabulary, recommendations → analytics | Public + Maintainer |
| 3 | Backer discovery: catalog → onboarding → discover → save to list → return | Public + Backer |
| 4 | Discover your stack: connect/paste → scan → "in my stack" → save / nominate / register interest / publish | Public + Backer |
| 5 | List curation: create → add → order → publish → indexed page | Backer + Public |
| 6 | Curation chat: converse → draft list → save | Backer |
| 7 | Suppression: request → scope check at intake and at ruling → proof or human ruling → catalog-wide removal → acknowledgement → lift | Public + Admin |
| 8 | Correction: report → triage → correct or decline → acknowledgement | Public + Admin |
| 9 | Claim contest: file → evidence → adjudicate ≤72h → revoke-and-reset → outcome | Maintainer + Admin |
| 10 | Admin triage: queue → assign → review → decide → notify → audit log | Admin |
| 11 | Platform campaign: connect → create → landing capture (consent-gated) → post-account outcomes → forwarding → dashboard | Public + Admin |

Flows 1, 7 and 8 have no v1.07 ancestor and carry full 13-state coverage with the
claim machine.

---

## 16. Open calls

1. **The `backer` glossary collision** — v1.07 §6.7 reserves `backer` for
   bounty-escrow participants.
2. **The distribution floor at scale** — a DEC-0002 commitment thousands of
   projects invalidate arithmetically.
3. **The demand-signal threshold** — what count, over what window, means "build
   payments next". An apparatus with no decision rule measures nothing.
4. **The primary KPI's number** — claimed pages and retention, at what level.
5. **The zero-tracking floor's host list** — narrowing a founder-confirmed ruling
   is a ruling.
6. **Open decision #5 can no longer stay parked**, and it now carries four
   riders: **search semantics** · **Your Deck's cold start** · **the selection
   floor** · **vocabulary at scale**.
7. **The glossary disposition pass** over v1.07's carried 65 rows.
8. **Counsel's half of §8.8** — the opt-out's legal shape.
9. **HELD — the two fallback-less health signals**, released by a research pass.
10. **HELD — the ops rotation**, released by a volume estimate.
11. **The named legal contact's address** — the route's shape is ruled; the
    address is a founder fill.
12. **The OrgInterest threshold** — what volume answers "build corporate billing
    next".
13. **The schema-v1 freeze has no trigger in this line** — it is keyed to the
    wedge sessions and the dry-run, and generation replaces the first while the
    second's anchor is unset. **The MCP launches against schema v1.**

**Carried from v1.07 §10:** decision #1 (payments partner) is no longer on this
version's critical path — the reason the reset works. Decisions #4, #6 and #10
stay enterprise-phase.

---

## Links

- [[notavibe-platform-features-v1.07]] — the full-vision reference
- [[mvp-v0.01-disposition-ledger]] — what survives the reset, by enumeration
- [[stories-complete-manifest]] — the 302-story layer this re-scopes
- [[00-notavibe-hub]] · [[2026-07-27]]

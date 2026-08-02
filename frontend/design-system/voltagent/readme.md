# VoltAgent Design System

The design language of **VoltAgent** — an open-source, observability-first TypeScript framework for building AI agents, plus **VoltOps**, its cloud/self-hosted console for tracing, evaluating and deploying them.

VoltAgent's surface is one unrelenting near-black canvas broken by a single electric-green accent. It reads like polished documentation that decided to also sell something: hairline-bordered cards, code mockups instead of photography, and a hero headline set at regular weight rather than shouting.

## Sources

Everything here is derived from real code, not from memory:

- **`VoltAgent/voltagent`** — https://github.com/VoltAgent/voltagent (branch `main`). The monorepo; the `website/` package is the live marketing site and docs (Docusaurus + Tailwind). Token values come from `DESIGN.md`, `website/tailwind.config.js`, `website/src/css/{variables,layout,font}.css`; component and layout values from `website/src/components/*`. Product screenshots are the repo's own `website/static/img/ops/*.png`.
- **`VoltAgent/awesome-claude-design`** — https://github.com/VoltAgent/awesome-claude-design (the repo attached to this project). A curated index of `DESIGN.md` files. It contains no code or assets of its own, so it supplied context — VoltAgent's own one-line brand summary ("void-black canvas, emerald accent, terminal-native") — and pointed at the upstream repo above.
- **`getdesign.md/voltagent`** — https://getdesign.md/voltagent/design-md, the public analysis page for this brand.

Reading those repositories directly will let you go deeper than this system does — especially `website/src/components/` for the animated sections this kit deliberately skips.

> Neither repo is an official VoltAgent brand kit. Trademarks and the logo belong to VoltAgent Inc.

## Products represented

| Surface | Where it lives | Kit |
| --- | --- | --- |
| Marketing site (voltagent.dev) | `website/src/pages/index.tsx`, `components/hero`, `components/ops`, `pages/pricing.tsx` | `ui_kits/marketing/` |
| VoltOps Console | closed-source app; captured in `website/static/img/ops/*` | `ui_kits/voltops-console/` |
| Docs site (voltagent.dev/docs) | `website/src/components/doc-navbar`, `docs-widgets/DocsHome.tsx` | `ui_kits/docs/` |

---

## Content fundamentals

**Voice: an engineer explaining their tool to another engineer.** Confident, specific, unembellished. No hype adjectives, no "revolutionary", no exclamation marks outside of a copy-confirmation microcopy.

**Casing is sentence case, everywhere except eyebrows.** Headlines: "Complete toolkit for enterprise level AI agents", "Stay in control at every stage". Eyebrows are UPPERCASE with wide tracking: `EVERYTHING YOU NEED`, `THE PLATFORM`, `OBSERVABILITY`. Buttons are Title-ish but short: "Get Started", "Start free", "Contact sales". Product names keep their exact casing — **VoltAgent**, **VoltOps**, `voltagent` lowercase in the wordmark and in code.

**Second person, implied.** Copy addresses "you" and "your agents"; it never says "we" except in legal and About contexts. "VoltAgent gives you full visibility into your AI agents." "Build agents with open-source TypeScript framework." First person plural appears only as the company: "VoltAgent Inc. ©".

**Sentences are short and load-bearing.** One clause of what it does, optionally one of how. "Enable agents to invoke functions and interact with systems." "Store and recall interactions to enhance your agents intelligence and context." Descriptions run 8–16 words; leads run one sentence.

**The em-dash list is the signature construction.** "Build enterprise multi-agent systems — development, observability, and deployment in one platform." The list items get muted grey so the sentence has internal hierarchy without extra markup.

**Pipe-separated capability runs** stand in for feature bullets: `Memory | RAG | Guardrails | Tools | MCP | Voice | Workflow`, set in emerald with 20%-white pipes. Docs restate the same list as pill tags.

**Terminal literalism.** Anything a developer could type is shown exactly as typed, in mono, with a `$` prefix and a copy affordance: `$ npm create voltagent-app@latest`, `npx getdesign@latest add voltagent`. Package names keep their scope: `@voltagent/core`, `@voltagent/server-hono`.

**Numbers are facts, not decoration.** When a number appears it is real and precise — "30,586 stars", "2202 tokens", "27 events · 17 sec", "820ms p95" — and it is set in mono. Never round a metric to look tidier, and never invent one to fill a card.

**Emoji: no.** Not in product copy, not in headings, not in the console. The repo's README uses badges and a small number of emoji in community docs; the product surfaces use none. Unicode is used only for the `·` separator, the `+` connector between the two platform boxes, `×` for close, and `→`/`←` inside nav affordances.

**Status language is lowercase and mechanical**: `completed`, `paused`, `Connected`, `OFF`. Console labels end with a colon: `Type:`, `Status:`, `Last Update:`, `Input:`, `Output:`.

---

## Visual foundations

### Colour
One accent, four blacks. **Electric green `#00d992`** carries every primary CTA, the bolt glyph, live dots and "completed" states — nothing else. `#2fd6a1` (soft) is the accent-text green used for links, the hero's italic word and capability runs; `#10b981` (deep) is the lockup and footer-hover green; `#34d399` appears on VoltOps buttons. The canvas ramp is `#050507` (landing) → `#0a0a0a` (docs/blog) → `#101010` (bands, default card fill) → `#1a1a1a` (hover/selected/input recess), with `#0A0F15` for cool-shifted console panel headers. There is **no light mode**. Text steps white → `#eeeeee` → `#b8b3b0` (eyebrows) → `#8a8380` (muted, the brand's warm grey) → `#8b949e` (fine print). Indigo, blue, purple and red exist but are quarantined to docs and console contexts. Never fill body text with the green.

### Type
**Inter** for everything narrative; **IBM Plex Mono** for anything typeable and every number. Display sizes hold at weight 400 with negative tracking — 60px/60px at `-0.65px` for the hero, 36px/40px at `-0.9px` for sections — so the page reads like an H1 in documentation rather than a billboard. Body is 16px/26px. The one loud typographic move is the eyebrow: 14px Inter 600, uppercase, `2.52px` tracking. Mono is 13px/18px with an unusual 550 sub-bold for emphasis.

### Spacing & layout
4px base (2 → 64). Bands take 48px vertical padding and 32px gutters; cards take 24px interior padding; grids gap 16px. Content centres in a 1280px container inside a 1440px page wrapper. Docs use a fixed 300px sidebar and a 280px TOC that disappears below 1025px. Feature grids run 3-up on desktop, 2-up on tablet, 1-up on mobile; the hero collapses to one column and drops from 60px to 32px.

### Backgrounds
No photography. No gradient mesh. The only ambient treatment is a **radially-masked dot field** — 1.2px dots at 22px spacing, `#fffdfbb0` at 0.15 opacity, faded out toward the edges (`#94a3b8`/20px in docs). Full-bleed colour bands alternate `#050507` and `#101010` to create rhythm; a third surface is never introduced. The console canvas uses a tighter 18px dot grid. The one gradient in the system is the docs-home headline's white→`#a1a1aa` text clip, and one translucent emerald announcement bar.

### Borders, radii, cards
Borders **are** the elevation system. A card is a 1px `#3d3a39` rectangle at 8px radius on `#101010` — no shadow, ever. Buttons and inputs are 6px; inline chips 4px; 9999px is reserved for status pills and circular icon containers. A 3px hairline marks an emphasised card; a 2px emerald border marks "featured" or "active". Console flow nodes break the rule deliberately with 2px type-coded borders (violet memory, blue agent, amber tool).

### Shadow system
Four levels, and only two of them are shadows. L0 flat for full-bleed bands. L1 hairline — the default for everything. L2 `0 0 15px rgba(92,88,85,0.2)` outer glow for hover/featured. L3 `0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(148,163,184,0.1) inset` for modals only. Docs CTAs carry a separate neo-brutalist stacked shadow (`2/4/6/8px 0 0 #000`) that collapses to two steps on hover — a legacy treatment, not for new marketing work.

### Hover, press and focus
Hover **lightens the border** (`#3d3a39` → `#5c5855`) and **lifts the fill** (`#101010` → `#1a1a1a`) over 300ms — the single most repeated interaction in the system. Text links move grey → emerald. Primary buttons shift emerald → emerald-soft. There is no press scale, no shrink, no bounce: press states just land on the hover colour. Focus turns the border emerald-soft; no glow ring, no outline offset.

### Motion
Restrained and mostly opacity-and-colour. 200ms for small state changes, 300ms as the default transition, 1000ms `fade-in-up` (opacity + 20px translate) for hero reveals staggered at 300ms and 500ms. Marquees run linear and infinite; the hero command types character-by-character at 20–40ms per glyph. `ease-out` / `ease-in-out` only — nothing springy, nothing overshoots.

### Transparency & blur
Sparingly, and always over the dark canvas: `backdrop-filter: blur(12px) saturate(180%)` on the announcement bar, a light `blur(4px)` behind buttons and modal scrims, 8–30% emerald washes behind glyphs and rings, `rgba(255,255,255,0.1)` hairlines in the footer and console, and 20%-white pipe separators. Never blur over imagery — there isn't any.

### Dividers
Three, in order of loudness: a 1px `#3d3a39` hairline for rows and edges; a **1px dashed `rgba(79,93,117,0.4)`** rule as a quiet section rhythm cue — the brand's only ornamental line; and a 2px emerald band edge used once or twice a page at most.

### Imagery
The only images are product screenshots of the VoltOps console: cool, dark, near-monochrome except for emerald status and the type-coded node borders. No grain, no duotone, no stock photography, no illustration suite. When you need a visual, reach for a code mockup first and a real screenshot second.

---

## Iconography

**Heroicons v2 is the system**, imported as `@heroicons/react` throughout the site, docs and footer. 24px outline at 16–20px rendered size is the default; solid is reserved for the bolt glyph (`BoltIcon`) and a handful of status marks (`CheckCircleIcon`, `StarIcon`, `PaperAirplaneIcon`). Glyphs inherit text colour — `#b8b3b0` inside a neutral tile, `#00d992` inside an accent tile.

Recurring glyphs, straight from the source: `bolt` (brand), `chevron-right` (CTA), `wrench`, `window`, `command-line`, `circle-stack` (the four framework capabilities), `rocket-launch`, `bug-ant`, `chart-bar`, `chat-bubble-bottom-center` (the four console capabilities), `code-bracket`, `squares-2x2`, `book-open`, `list-bullet`.

There is **no proprietary icon font and no icon sprite**. Brand and integration marks (~90 of them: Anthropic, OpenAI, Slack, Notion, Langfuse, LangSmith…) live upstream as individual React SVG components under `website/static/img/logos/**/index.tsx` — inline JSX, not `.svg` files, so they could not be copied wholesale. Copy the ones you need from that path. The standalone SVG/PNG assets that *did* exist are in `assets/`.

Emoji are never used as icons. Unicode is used as an icon only for `·`, `+`, `×` and `|`.

**Substitution flagged:** the `Icon` component loads Heroicons from jsDelivr via a CSS mask rather than bundling the React package — same glyph set and version (2.2.0), different delivery.

---

## Fonts — substitution notice

Both faces are the real ones and both are free: **Inter** and **IBM Plex Mono**, loaded from Google Fonts exactly as `website/src/css/font.css` does. Nothing was substituted.

Two caveats worth your attention:
1. `DESIGN.md` documents the mono as **SF Mono**, while the shipped Tailwind config sets `fontFamily.sans` and `fontFamily.heading` to **IBM Plex Mono** and `layout.css` sets `body` to **Inter**. This system follows the shipped code: Inter for narrative, IBM Plex Mono for code and numbers. The hero's command chip uses the platform `monospace` stack, as upstream does.
2. Because the fonts come from Google Fonts via `@import`, there are no local `@font-face` rules or font binaries in this project. **If you have self-hosted Inter / IBM Plex Mono woff2 files, send them over** and I'll swap the `@import` for real `@font-face` declarations.

---

## Index

### Root
| File | What it is |
| --- | --- |
| `readme.md` | This guide |
| `SKILL.md` | Portable Agent Skill wrapper |
| `github.md` | Upstream source association + sync receipt |
| `styles.css` | Global entry point — `@import` list only |
| `thumbnail.html` | Homepage tile |

### `tokens/`
`fonts.css` · `colors.css` · `typography.css` · `spacing.css` · `radius.css` · `elevation.css` · `motion.css` · `semantic.css` (aliases: `--bg-*`, `--text-*`, `--border-*`, `--action-*`)

### `assets/`
`logo.svg` (original hexagon wordmark, `#fdfd96`) · `logo-emerald.svg` (recoloured to `#00d992`) · `favicon.ico` · `social-card.png` · `dot-icon.svg` · `divider-dotted-dark.svg` · `divider-dotted-white.svg` · `divider-slash-light.svg` · `tag-front.svg` · `arrow-blue.svg` · `selected-arrow.svg` · `x-logo.svg` · `open-ai.svg` · `logo-customer-different.svg` · `product/voltops-{agent-list,agent-chat,flow,flow-detail}.png`

### Components

**`components/controls/`** — `Button`, `PillTag`, `TextInput`
**`components/surfaces/`** — `Card`, `CodeMockup`, `CodeChip`, `Modal`, `Toast`, `EmptyState`
**`components/layout/`** — `NavBar`, `HeroBand`, `SectionBand`, `GreenDivider`, `Footer`
**`components/data/`** — `DataTable`, `PricingTier`, `SidebarRow`
**`components/brand/`** — `Logo`, `Eyebrow`, `IconTile`, `Icon`, `DotPattern`

Each directory has a `@dsCard` preview HTML; each component has a `.d.ts` props contract and a `.prompt.md` usage note.

The inventory maps 1:1 onto the component list `DESIGN.md` defines (`nav-bar`, `button-primary` / `-outline-on-dark` / `-ghost-green`, `button-pill-tag`, `text-input`, `card-feature` / `-emphasized`, `code-mockup`, `code-inline-chip`, `hero-band`, `content-band`, `green-divider-band`, `footer`) plus its ten `ex-*` demonstration surfaces (`ex-pricing-tier`, `ex-app-shell-row`, `ex-data-table-cell`, `ex-modal-card`, `ex-empty-state-card`, `ex-toast`, …).

**Intentional additions** — two, both because the source needs them and has no component for them:
- `Icon` — a wrapper for Heroicons v2, the set the repo already imports; without it every consumer would hand-roll SVG.
- `Logo` — the ringed-bolt + wordmark lockup the site composes inline in three separate files (`footer`, `doc-navbar`, mobile nav) with no shared component.

### `guidelines/`
17 specimen cards: Colors (canvas, emerald, text ramp, hairlines, secondary hues) · Type (display, eyebrows, body, mono) · Spacing (scale, bands in use) · Brand (radii, elevation, dividers, dot field, logo lockups, motion).

### `ui_kits/`
`marketing/` (Home + Pricing) · `voltops-console/` (Agents + trace canvas with timeline and assistant chat) · `docs/` (tabbed docs shell). Each has its own README listing exactly what was and wasn't recreated.

---

## Do

- Reserve `#00d992` for primary CTAs, the bolt glyph and live status.
- Build every container as a 1px hairline rectangle. Borders, not shadows.
- Keep the display type at weight 400 with negative tracking.
- Put a code mockup where a marketing page would want a photo.
- Set every number, command and identifier in IBM Plex Mono.
- Use 6px for controls, 8px for cards, 9999px only for status pills.

## Don't

- Don't build a light mode. There isn't one.
- Don't use the green as body text or as a large fill.
- Don't drop a soft drop-shadow on a card.
- Don't bold the hero headline.
- Don't add a second accent hue to a marketing surface — indigo/blue/purple stay in docs and console.
- Don't use emoji, and don't hand-draw an icon when Heroicons has one.
- Don't introduce a third surface colour into a page's rhythm.

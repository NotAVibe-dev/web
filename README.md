# notavibe — web

The public site for **notavibe**: *fund the people behind the code.* This repo
hosts **two sites on one domain** (`notavibe.dev`):

- **landing** — the full Astro scrollytelling site (this project, at the repo root).
- **splash** — a static holding page in **`splash/`** that collects early-access
  emails (maintainer / backer) while the landing is pre-launch.

The deploy workflow publishes whichever you pick (see Deploy). The design system,
brand, and strategy behind it live in the sibling **`design/`** repo.

## Stack & principles

- **Astro**, static output, ships **~0 JS**. The one script (`src/scripts/scroll.js`)
  is a tiny, dependency-free progressive enhancement (color-temperature arc +
  count-up numbers). The whole site is fully readable with **JS disabled** and
  under **`prefers-reduced-motion`**.
- **Motion:** native CSS scroll-driven animations (`animation-timeline` +
  `position: sticky` + `@property --warmth`). No GSAP, no smooth-scroll library.
  Firefox (which still flags scroll-driven animations in early 2026) degrades to a
  calm, static page — by design. See `design/docs/design-system/motion-and-scroll.md`.
- **Type:** JetBrains Mono (brand + all data) + Inter (prose), self-hosted via
  Fontsource. **Tokens** are vendored from the design repo into
  `src/styles/tokens.css` — edit them there and sync, not here.
- **Accessibility & performance are gates:** WCAG 2.2 AA, keyboard, visible focus,
  skip link; target Lighthouse ≥ 95 mobile, LCP < 2.0s, CLS < 0.05.

## Develop

Requires Node 20.3+ (22 recommended; see `.node-version`).

```bash
npm install
npm run dev       # local dev server
npm run build     # static build -> dist/
npm run preview   # serve the built output
```

## Pages

- `/` — the scrollytelling homepage: a maintainer's arc from spark to burnout to
  funded, with the page's color temperature tracking the emotion.
- `/how-it-works` · `/for-companies` · `/manifesto` · `/pricing` · `/faq` · `404`.

## Deploy (GitHub Pages — one repo, one domain, pick a site)

Both sites deploy from this repo to **`notavibe.dev`** via
`.github/workflows/deploy.yml`. Deploys are manual for now — each run you pick
`landing` or `splash` (no default, so nothing ships by accident).

1. Create the repo (e.g. **`NotAVibe-dev/web`**) and push this repo to it.
2. Settings → Pages → **Source: GitHub Actions**.
3. Attach the custom domain **`notavibe.dev`** (apex A/AAAA or ALIAS DNS →
   GitHub Pages), enable "Enforce HTTPS". `public/CNAME` (landing) and
   `splash/CNAME` both pin it, so the domain survives either deploy.
4. **Deploy:** Actions → *Deploy to GitHub Pages* → **Run workflow** → choose
   **`landing`** or **`splash`**. (landing runs `npm ci && npm run build` → `dist`;
   splash is served from `splash/` as-is.)

**At launch**, when only the landing remains: uncomment the `push:` trigger in
the workflow (pushes to `main` then auto-deploy landing) and delete `splash/`.

## Notes / launch TODOs

- **Forms** (`CtaJoin.astro`) currently `mailto:` so they are functional, never
  fake. Wire a real endpoint (Formspree/Buttondown/backend) before launch and
  point `hello@notavibe.dev` at a real inbox.
- **Share image:** `og.png` (2400×1260, a 2× raster of `og.svg`) is the OG/Twitter
  image, referenced by default in `src/layouts/Base.astro`. If you change the
  design, re-render it: `og.svg` is the source. (Raster is used because many
  social scrapers don't render SVG previews.)
- All external claims trace to `design/docs/strategy/oss-funding-facts.md`; the
  protagonist (Sam / `tinsel`) is fictional. Keep it that way.

*This is not a vibe.*

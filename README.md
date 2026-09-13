# notavibe — web

The public site for **notavibe** at `notavibe.dev`, and the **design reference** the
product is built against. Everything that ships lives in **`frontend/`** — a
self-contained static site, no build step, served as-is.

```
/                the public front page — what notavibe is, how it works, the MCP install
/privacy/        the public privacy policy
/prototype.html  the app prototype — front door + every app screen (private preview)
```

`prototype.html` is the high-fidelity prototype of the product: discovery, search,
project pages, the maintainer and backer portals, and the superadmin founder portal.
It sits behind a client-side password gate and is `noindex`. It is **not** a mock-up
to be admired and discarded — the `app` repo (Go + templ + htmx) ports it screen for
screen, pinning the SHA it ported against in `app/web/VERSION`. Treat the rendered
output here as the spec, and `frontend/design-notes/hashicorp.DESIGN.md` as the
intent behind it.

## Run it locally

```bash
python3 -m http.server 4321 --directory frontend
# → http://localhost:4321                 the front page
# → http://localhost:4321/prototype.html  the app prototype
```

The prototype's own `NV_DEV` check is true on localhost, so it draws its authoring
chrome (the PrototypeBar and the `Simulate:` toggles). That is deliberate; append
`?dev` to force it, or serve it under any non-localhost host to see it as a visitor
would.

## Structure

```
frontend/
├─ index.html                 # the front page (self-contained: own styles, own scripts)
├─ privacy/index.html         # privacy policy (self-contained, matches the front page)
├─ prototype.html             # the app prototype — entry + boot
├─ scripts/                   # the prototype's screens + runtime
│  ├─ runtime.js              #   rendering runtime
│  ├─ voltagent-adapter.js    #   maps VoltAgent primitives → the screens' component API
│  ├─ screens.js · app.js · hifi.js · frontdoor.js · search.js
├─ styles/hashicorp-tokens.css   # loaded last; wins the dark base
├─ design-system/voltagent/   # VoltAgent design-system bundle (components + tokens)
├─ design-notes/              # hashicorp.DESIGN.md — design intent, in prose
└─ favicon.svg · favicon.ico · favicon-16/32.png · apple-touch-icon.png
   og.svg · og.png · robots.txt · CNAME
```

The icons and the share card are all the same mark — a logical NOT (¬), drawn in
the site's own `--volt-emerald` rather than the brand file's lighter green, so the
logo matches the buttons beside it. `favicon.svg` is the source the raster sizes
were rendered from; `og.png` is the share card that ships (most social scrapers
won't render an SVG) and `og.svg` beside it is its source. Re-render after editing it — headless Chrome at
1200×630, since Inter is not a system font and ImageMagick alone sets the type wrong.

## Design systems

Built on **VoltAgent** components with **HashiCorp** design tokens.

Typefaces come from Google Fonts at runtime, via the `@import` in
`design-system/voltagent/tokens/fonts.css` — nothing is self-hosted. The prototype
additionally loads React from unpkg and its icons from jsdelivr at runtime, so it
needs a network connection to render.

## Deploy

`.github/workflows/deploy.yml` publishes `frontend/` to GitHub Pages on every push to
`main` that touches it. There is no build. `workflow_dispatch` re-deploys without a
code change.

`sitemap.xml` is **generated at deploy** by `.github/scripts/generate-sitemap.js`
and is not committed — that is why you won't find it in the tree. It lists every
page that doesn't declare `noindex`, uses each page's own `<link rel="canonical">`
as its `<loc>`, and takes `lastmod` from that file's last commit. Run it the way CI
does to see what would ship: `node .github/scripts/generate-sitemap.js`.

The zone is proxied through Cloudflare, whose edge caches assets for 4h, so the
workflow stamps `?v=<sha>` onto every local `.js`/`.css` reference in every page at
deploy time. That is why a deploy is never masked by the edge cache, and why no asset
URL should be hand-versioned.

Infrastructure — DNS, TLS, the Cloudflare zone, Pages settings — is **not** managed
here. It lives in `NotAVibe-dev/infra`; see `CLAUDE.md`.

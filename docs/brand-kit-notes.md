# notavibe brand kit — working notes

Preserved from `~/Documents/work/notavibe/logo/colors.txt` when that folder was retired
and the kit moved into this repo (see `frontend/brand/`).

The usable rules — mark, colour, type, do/don't, derivation — are published at
`/brand/`. What is kept here is the rest: per-file specs, the generated Workspace
lockup recipe, and the known gaps. This file is under `docs/`, which is outside
`frontend/` and therefore **not** published.

---

notavibe logo colours
=====================
Updated 2026-09-13. Covers every colour literal in the four SVGs in this folder.

The mark is the logical NOT (¬) — "not a vibe" in one glyph.

ACCENT (the only brand colour)
------------------------------
#00ca8e   the mark / accent green
          = --volt-emerald in the site's token set
            (web/frontend/styles/hashicorp-tokens.css,
             app/web/static/css/tokens.primitives.css)
          Replaced the older #31E29B on 2026-09-13 so the logo matches the
          colour the site actually paints.

PER FILE
--------
favicon.svg          32x32 tile, stroke 4/32 (heavier so the glyph survives 16px)
  #0C0F0E   tile ground, rx=7. NOT a site token — favicon-only, so the glyph has
            guaranteed contrast whatever a browser paints behind a favicon.
            (The site canvas token is --volt-void #000000.)
  #00ca8e   the mark

logo-mark.svg        24x24, stroke 2.5/24, round caps (Lucide weight)
  #00ca8e   the mark
            No ground — transparent; place it on a dark surface.

logo-mark-mono.svg   24x24, stroke 2.5/24
  currentColor   no literal at all; inherits the text colour of its context.
                 Use at small sizes, in print, and on accent surfaces.

logo-lockup.svg      172x32, mark + wordmark, DARK-surface variant
  #00ca8e   the mark
  #F5F7F6   wordmark "nota"   — foreground ink
  #8A9490   wordmark "vibe"   — muted ink; the green ¬ plus the muted "vibe"
                                is what makes the lockup read as the statement
  Light-surface swap (documented in the file, not a separate asset):
  #101312   replaces #F5F7F6
  #6B7470   replaces #8A9490

  NOTE: the four ink values above are NOT site tokens. The site's ink ramp is
  --ink-1 #ffffff / --ink-3 #b2b6bd on --volt-void #000000. Rebase them if the
  lockup is ever used next to site chrome.

KNOWN GAPS
----------
- The lockup sets its wordmark in a font stack (Geist, Geist Sans, Inter,
  system-ui), not outlined paths, so it renders differently wherever Geist is
  absent. Outline the text before shipping it anywhere that matters.
- No BIMI asset. That needs a separate SVG Tiny PS cut (square viewBox, opaque
  ground, <title> first child, no stroke-only paths). See infra/runbooks/bimi.md.
- No raster exports live here. Generate them on demand — note that ImageMagick's
  internal SVG renderer DROPS stroke-only paths (it renders the tile and loses
  the mark); render with a real SVG engine, or draw the stroke explicitly.

WORKSPACE LOCKUP (generated 2026-09-14, not stored here)
--------------------------------------------------------
The Google Workspace custom logo is a 320x132 PNG — Google's expected size —
built from the parts in this folder rather than kept as a fifth asset:

  ground   #0C0F0E   full-bleed rounded panel, radius 22 (at 1x)
  mark     #00ca8e   favicon.svg geometry (32-grid, stroke 4), drawn at 46px
  "nota"   #ffffff   = --volt-white / --volt-text-100
  "vibe"   #b2b6bd   = --volt-text-500 (ink-muted)

Type is Inter 600 at 42px, letter-spacing -1px — the third entry in the
lockup's font stack, used because Geist is not installed anywhere; the woff2
ships in the app repo at web/static/fonts/inter-latin-600-normal.woff2.
Layout: 44px side margins, mark then 18px gap then the wordmark, vertically
centred. Rendered in a browser at 2x and downscaled, so the glyph edges stay
clean; the rounded corners are an alpha mask, so the panel sits on any surface.

A DARK panel is deliberate: the wordmark's white/muted inks need a dark ground,
and Google's chrome is white. Do not ship the white ink on transparency.

/* notavibe — front door v2. The 13 decisions from the design grilling, applied.
   Loaded after notavibe-hifi.js, so this NvDiscover wins over that one.
   Nothing else in the prototype is touched except the header's Sign in button
   (Decision 11), which lives in notavibe-app.js and is not overridable. */
(function () {
  var h = React.createElement;
  var V = window.VoltAgentDesignSystem_2e3ec5;
  var NS = window.TogetherAIDesignSystem_eaf923;
  var Button = NS.Button, Container = NS.Container;
  var Card = V.Card, PillTag = V.PillTag, CodeMockup = V.CodeMockup,
      DotPattern = V.DotPattern, IconTile = V.IconTile, Icon = V.Icon;

  var col = function (gap, extra) { return Object.assign({ display: "flex", flexDirection: "column", gap: gap }, extra || {}); };

  /* HashiCorp type scale (hashicorp.DESIGN.md §Typography). "Tight on display,
     relaxed on body" — display 1.17–1.21, body 1.50–1.71. Weight range is
     narrow on purpose: 500 body / 600 emphasis / 700 display. */
  var HERO = { margin: 0, fontWeight: 700, fontSize: "clamp(40px, 5.6vw, 80px)", lineHeight: 1.17, letterSpacing: "-0.031em", color: "var(--volt-white)" };
  var H2 = { margin: 0, fontWeight: 700, fontSize: "clamp(32px, 3.6vw, 56px)", lineHeight: 1.18, letterSpacing: "-0.029em", color: "var(--volt-white)" };
  var BODY_LG = { margin: 0, fontWeight: 500, fontSize: "18px", lineHeight: 1.69, color: "var(--volt-text-200)", textWrap: "pretty" };
  var BODY = { margin: 0, fontWeight: 500, fontSize: "16px", lineHeight: 1.5, color: "var(--volt-text-500)", textWrap: "pretty" };
  var SMALL = { margin: 0, fontWeight: 500, fontSize: "14px", lineHeight: 1.71, color: "var(--volt-text-500)", textWrap: "pretty" };
  /* eyebrow: 12px / 600 / +0.6px uppercase — "every meaningful section has one" */
  var EYEBROW = { margin: 0, fontSize: "12px", lineHeight: 1.23, fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", color: "var(--volt-text-400)" };
  /* caption replaces the mono role; --font-mono resolves to the sans under the
     "no mono on marketing" rule, and back to IBM Plex Mono if that's reverted. */
  var MONO = { fontFamily: "var(--font-sans)", fontSize: "13px", lineHeight: 1.38, letterSpacing: "0.2px", color: "var(--volt-text-600)" };

  var LIVE = { generated: true, active: true, lapsed: true };

  function Eyebrow(props) {
    return h("p", { style: Object.assign({}, EYEBROW, props.style || {}) }, props.children);
  }

  function Band(props) {
    return h("section", {
      style: Object.assign({
        position: "relative",
        background: props.tone === "canvas" ? "var(--volt-canvas)" : "var(--volt-void)",
        borderTop: "1px solid var(--volt-border)",
        boxSizing: "border-box"
      }, props.style || {})
    }, h(Container, { style: Object.assign({ padding: "var(--band-padding-y, 48px) 32px" }, col("32px")) }, props.children));
  }

  /* D9: every module title is a real h2, so the page is navigable by heading. */
  function BandHead(props) {
    return h("div", { style: col("16px", { maxWidth: "68ch" }) },
      h(Eyebrow, null, props.eyebrow),
      h("h2", { style: H2 }, props.title),
      /* body-lg is DESIGN.md's documented role for "hero subhead, lead body" */
      props.lead ? h("p", { style: Object.assign({}, BODY_LG, { color: "var(--volt-text-500)", maxWidth: "60ch" }) }, props.lead) : null);
  }

  var GRID = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" };

  /* ── Mouse-reactive dot field ───────────────────────────────────────────────
     Replaces the static DotPattern in the hero. After codepen lukagurovic/jdNxev
     ("Interactive dots on mousemove"): dots near the cursor are drawn toward it
     and ease back when it leaves. Colour blends slate → Nomad green toward the
     pointer, so the accent does the highlighting.

     Restraint is deliberate. HashiCorp's texture is "felt more than seen", so
     displacement peaks at ~6px and the brightening is small — enough to notice
     on movement, not enough to compete with the headline sitting on top of it.

     Two things built in rather than bolted on:
     · prefers-reduced-motion draws the grid once, static, and binds no listeners
     · the rAF loop exits once the ripple has decayed to nothing, so an idle
       page costs zero frames instead of spinning forever
     ────────────────────────────────────────────────────────────────────────── */
  /* ── Shared query ─────────────────────────────────────────────────────────
     The hero field and the header field are separate components in separate
     files, so "the same search" has to be a single value they both read and
     write. A tiny pub/sub on window rather than ctx: the store in the .dc.html
     persists its keys to storage, and a half-typed query is not state worth
     surviving a reload.

     Defined defensively in both files with the ||= guard, because script
     execution order in this runtime is not guaranteed — whichever file runs
     first creates it, the other reuses it. */
  window.NvQuery = window.NvQuery || (function () {
    var value = "", subs = [];
    return {
      get: function () { return value; },
      set: function (v) { value = v; subs.slice().forEach(function (f) { f(v); }); },
      subscribe: function (f) {
        subs.push(f);
        return function () { subs = subs.filter(function (x) { return x !== f; }); };
      }
    };
  })();

  function DotField() {
    var ref = React.useRef(null);

    React.useEffect(function () {
      var canvas = ref.current;
      if (!canvas) return;
      var host = canvas.parentNode;
      var g = canvas.getContext && canvas.getContext("2d");
      if (!g || !host) return;

      var reduce = window.matchMedia
        && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      /* Geometry follows the reference, scaled to a hero. Its 45px hover radius
         covered a good fraction of a 400×250 canvas; at 1280×800 the same number
         would grab about four dots, so the reach is proportional instead.
         The one place this departs from the pen: it tweens every dot in range to
         the cursor's *exact* coordinates, which at this size collapses them into
         a single blob and erases the grid. Here each dot travels a fraction of
         the way, weighted by distance — so the grid bulges toward the pointer,
         and the eased return is what reads as the wave. */
      var SPACING = 28;      /* grid pitch */
      var BASE_R = 1.5;      /* resting dot radius */
      var RADIUS = 165;      /* pull reach, scaled up from the pen's 45 */
      var STRENGTH = 0.62;   /* fraction of the way to the cursor at full pull */
      var EASE = 0.14;       /* per-frame lerp ≈ the pen's 0.4s GSAP tween */
      var dpr = Math.min(window.devicePixelRatio || 1, 2);

      var W = 0, H = 0, dots = [];
      var pxr = -99999, pyr = -99999, active = false;
      var raf = null;

      function build() {
        dots = [];
        for (var y = SPACING / 2; y < H + SPACING; y += SPACING) {
          for (var x = SPACING / 2; x < W + SPACING; x += SPACING) {
            dots.push({ ox: x, oy: y, x: x, y: y, k: 0 });
          }
        }
      }

      /* advance one frame; returns whether anything is still in motion */
      function step() {
        var moving = false;
        for (var i = 0; i < dots.length; i++) {
          var p = dots[i];
          var tx = p.ox, ty = p.oy, k = 0;

          if (active) {
            var dx = pxr - p.ox, dy = pyr - p.oy;
            var d = Math.sqrt(dx * dx + dy * dy);
            if (d < RADIUS) {
              var f = 1 - d / RADIUS;
              k = f * f;                       /* eased falloff */
              tx = p.ox + dx * k * STRENGTH;
              ty = p.oy + dy * k * STRENGTH;
            }
          }

          p.x += (tx - p.x) * EASE;
          p.y += (ty - p.y) * EASE;
          p.k += (k - p.k) * EASE;

          if (Math.abs(tx - p.x) > 0.05 || Math.abs(ty - p.y) > 0.05 || p.k > 0.004) {
            moving = true;
          }
        }
        return moving;
      }

      function render() {
        g.clearRect(0, 0, W, H);
        for (var i = 0; i < dots.length; i++) {
          var p = dots[i], k = p.k;
          /* slate → Nomad green toward the cursor, interpolated so there is no
             visible ring where a threshold would otherwise sit */
          var mix = k > 0 ? Math.min(1, k * 1.5) : 0;
          g.fillStyle = "rgba("
            + Math.round(148 - 148 * mix) + ","
            + Math.round(163 + 39 * mix) + ","
            + Math.round(184 - 42 * mix) + ","
            + (0.17 + k * 0.55).toFixed(3) + ")";
          g.beginPath();
          g.arc(p.x, p.y, BASE_R + k * 1.1, 0, 6.2832);
          g.fill();
        }
      }

      function resize() {
        var rect = host.getBoundingClientRect();
        W = Math.max(1, rect.width);
        H = Math.max(1, rect.height);
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        canvas.style.width = W + "px";
        canvas.style.height = H + "px";
        g.setTransform(dpr, 0, 0, dpr, 0, 0);
        build();
        render();
      }

      function frame() {
        var moving = step();
        render();
        /* pointer gone and everything home → release the loop entirely */
        if (!moving && !active) { raf = null; return; }
        raf = requestAnimationFrame(frame);
      }

      function kick() { if (raf === null) raf = requestAnimationFrame(frame); }

      function onMove(e) {
        var rect = host.getBoundingClientRect();
        pxr = e.clientX - rect.left;
        pyr = e.clientY - rect.top;
        active = true;
        kick();
      }
      function onLeave() { active = false; kick(); }

      resize();

      var ro = null;
      if (window.ResizeObserver) {
        ro = new ResizeObserver(resize);
        ro.observe(host);
      } else {
        window.addEventListener("resize", resize);
      }

      if (!reduce) {
        host.addEventListener("pointermove", onMove);
        host.addEventListener("pointerleave", onLeave);
      }

      return function () {
        if (raf !== null) cancelAnimationFrame(raf);
        if (ro) ro.disconnect(); else window.removeEventListener("resize", resize);
        if (!reduce) {
          host.removeEventListener("pointermove", onMove);
          host.removeEventListener("pointerleave", onLeave);
        }
      };
    }, []);

    return h("canvas", {
      ref: ref,
      "aria-hidden": "true",
      style: { position: "absolute", top: 0, left: 0, zIndex: 1, pointerEvents: "none" }
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     D3 · D4 · D5 — the search-first hero.
     No terminal mockup: it was the second half of a scan pitch module 3
     already owns. The promise stays anti-popularity, the one claim the
     ranking architecture earns. The unclaimed majority stays a number
     rather than a sentence with "yet" doing PR.

     The hero now carries the catalog's single natural-language input. This is
     Refine, promoted out of module 5 rather than a new field — §5.5 forbids two
     natural-language inputs on this surface, and the header's keyword box is
     hidden on /discover the way a search engine's home page hides its own nav
     search. So the page went from three inputs to one.

     D3 still holds in substance: the hero carries no CTA that competes with a
     module. Refine stopped being a module, so there is nothing left to duplicate. */
  /* ── Seed chips ─────────────────────────────────────────────────────────────
     The on-ramp for the visitor who has nothing to type. A cold arrival from a
     campaign (§10.6 targets /discover) meets an empty field with no idea what
     this catalog holds; their only options were guess or scroll.

     These fill the field and run the search — they are input affordances, not a
     second navigation mechanism. That distinction is the whole reason they are
     allowed to exist here: there is still exactly one destination, so this is
     not the same-job-twice mistake that §5.5 warns about and that the duplicate
     scan pitch already made once on this page.

     They are NOT the intent labels. "I need to trust my test suite" typed into
     a field that matches name and description (§5.4) returns nothing — intent
     phrasing is how you think about the problem, not how the catalog is worded.
     Each of these is a phrase verified to appear in real project descriptions:
     test runner → vitest · query builder → drizzle-orm, kysely ·
     web framework → hono · schema validator → valibot.

     Production note: hard-coding four is the "top-4 popularity list" this
     product refuses to be. These should be derived from catalog vocabulary or
     rotated, so the row never becomes an editorially-picked leaderboard. */
  var SEEDS = ["test runner", "query builder", "web framework", "schema validator"];
  var EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";

  /* Reveal runs as a CSS animation rather than a JS timer flipping state.
     Same result, but it does not depend on setTimeout firing — which a throttled
     or zero-height tab will happily defer — and `both` fill mode means the chip
     holds its from-state before the delay elapses without React tracking it.
     Injected once; the reduced-motion query lives here too, so the opt-out is a
     stylesheet rule rather than a branch that has to be remembered. */
  (function injectChipCSS() {
    if (document.getElementById("nv-chip-css")) return;
    var s = document.createElement("style");
    s.id = "nv-chip-css";
    s.textContent =
      "@keyframes nvChipIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}"
      + ".nv-chip{animation:nvChipIn 520ms cubic-bezier(0.16,1,0.3,1) both}"
      /* Category cards use the same on-mount pattern as the chips rather than a
         scroll observer. A scroll-gated reveal left the cards authored at
         opacity:0 and flipped them only once they were already 12% into view —
         so they arrived late and, on any re-entry, popped in "out of nowhere".
         A CSS animation with `both` fill plays once on mount and holds its final
         state forever after, independent of scroll position or re-render. */
      + "@keyframes nvCardIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}"
      + ".nv-cat-card{animation:nvCardIn 560ms cubic-bezier(0.16,1,0.3,1) both}"
      + "@media (prefers-reduced-motion: reduce){"
      + ".nv-chip,.nv-cat-card{animation:none;opacity:1;transform:none}}"
      /* Categories: the weighted 6-column grid (leader span 4, rest span 2)
         collapses on narrower viewports where 38px card columns would be
         unreadable. Two columns on tablet, one on phone; the inline span-4/
         span-2 overrides are dropped so every card claims a full track. */
      + "@media (max-width: 920px){"
      + ".nv-cat-grid{grid-template-columns:repeat(2,1fr)!important}"
      + ".nv-cat-grid>a{grid-column:auto!important}}"
      + "@media (max-width: 520px){"
      + ".nv-cat-grid{grid-template-columns:1fr!important}}";
    document.head.appendChild(s);
  })();

  function SeedChips(props) {
    var ctx = props.ctx;
    var hv = React.useState(-1), hover = hv[0], setHover = hv[1];

    var run = function (term) {
      window.NvQuery.set(term);
      ctx.go({ name: "search", q: term });
    };

    return h("div", {
      style: {
        display: "flex", flexWrap: "wrap", justifyContent: "center",
        gap: "8px", paddingTop: "4px"
      }
    },
      SEEDS.map(function (term, i) {
        var on = hover === i;
        return h("button", {
          key: term,
          className: "nv-chip",
          type: "button",
          onClick: function () { run(term); },
          onMouseEnter: function () { setHover(i); },
          onMouseLeave: function () { setHover(-1); },
          style: {
            padding: "8px 15px",
            borderRadius: "var(--radius-pill, 9999px)",
            background: on ? "var(--volt-surface)" : "transparent",
            color: on ? "var(--volt-white)" : "var(--volt-text-500)",
            border: "1px solid " + (on ? "rgba(0,202,142,0.45)" : "var(--volt-border)"),
            fontFamily: "var(--font-sans)", fontWeight: 500,
            fontSize: "13px", lineHeight: 1.38, letterSpacing: "0.2px",
            cursor: "pointer", whiteSpace: "nowrap",
            /* hover only; the entrance is the CSS animation on .nv-chip */
            transition: "background-color 220ms " + EXPO
              + ", border-color 220ms " + EXPO + ", color 220ms " + EXPO,
            animationDelay: (420 + i * 90) + "ms"
          }
        }, term);
      }));
  }

  function Hero(props) {
    var ctx = props.ctx;
    var total = window.PROJECTS.length;
    var unclaimed = window.PROJECTS.filter(function (p) { return ctx.claimState(p.slug) === "generated"; }).length;

    var st = React.useState(window.NvQuery.get()), q = st[0], setQ = st[1];
    React.useEffect(function () { return window.NvQuery.subscribe(setQ); }, []);
    var fs = React.useState(false), focused = fs[0], setFocused = fs[1];
    var inputRef = React.useRef(null);

    /* ── Rotating placeholder ────────────────────────────────────────────────
       Established search-UX practice rather than decoration: a sample query
       tells you what kind of thing this field accepts. Here it has a second job
       — §5.4 matches name *and description*, which is invisible if the
       placeholder only ever shows one phrase. These four are drawn from real
       catalog descriptions, so they double as proof the catalog is described in
       prose, not just tagged.

       Written straight to the DOM node through a ref instead of through state:
       at ~40ms a character, state would re-render the whole hero 25 times a
       second for a purely cosmetic string.

       Freezes to a static hint the moment the field is focused or has a value —
       text moving under your own typing is a distraction, not a flourish. */
    React.useEffect(function () {
      var el = inputRef.current;
      if (!el) return;

      var EXAMPLES = [
        "A test runner that reads my Vite config",
        "Types derived from the schema I already wrote",
        "One handler that runs on Workers and Node",
        "A validator my bundler can tree-shake"
      ];
      var STATIC = "Describe what you need, or name a package";

      var reduce = window.matchMedia
        && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) { el.placeholder = STATIC; return; }

      var i = 0, n = 0, dir = 1, timer = null, alive = true;

      function tick() {
        if (!alive) return;
        /* hands off while the field is in use */
        if (document.activeElement === el || el.value) {
          el.placeholder = STATIC;
          timer = setTimeout(tick, 400);
          return;
        }
        var full = EXAMPLES[i];
        n += dir;
        el.placeholder = full.slice(0, n) + (n < full.length ? "▏" : "");
        var delay = dir > 0 ? 45 : 22;
        if (n >= full.length) { dir = -1; delay = 2400; }
        else if (n <= 0) { dir = 1; i = (i + 1) % EXAMPLES.length; delay = 380; }
        timer = setTimeout(tick, delay);
      }

      timer = setTimeout(tick, 700);
      return function () { alive = false; clearTimeout(timer); };
    }, []);

    /* One destination. The hero no longer decides between filtering and
       conversing — a button that relabels itself as you type is a mode switch
       wearing a button's clothes, and nothing else on screen disclosed it.
       Everything goes to results; the results page is where a long query can
       offer to continue as a conversation. §5.5 still wants Refine to be the
       chat's entry point, so that offer has to exist there. */
    var submit = function (e) {
      if (e) e.preventDefault();
      if (!q.trim()) return;
      ctx.go({ name: "search", q: q });
    };

    /* Ambient glow behind the hero. Its real job is the glass header: a backdrop
       blur over a flat near-black canvas reads as grey, not glass — the effect
       needs something with hue and gradient underneath it. Both reference headers
       sit over photography for exactly this reason.
       Built from HashiCorp's own tokens: blue-7 navy, documented as "deep navy
       used in unified-core gradients", plus a much fainter pass of the accent.
       Kept low-opacity so the canvas still reads as near-black. */
    return h("section", {
      style: {
        position: "relative",
        /* 90% of the live viewport, content optically centred in it. Not 100:
           the exposed top edge of the next band is what tells you the page
           continues, so a full-height hero would need a scroll cue that this
           one gets for free. --hero-min resolves to dvh where supported. */
        minHeight: "var(--hero-min, 90vh)",
        display: "flex",
        alignItems: "center",
        background: [
          "radial-gradient(120% 90% at 12% -20%, color-mix(in srgb, var(--volt-indigo) 70%, transparent) 0%, transparent 62%)",
          "radial-gradient(80% 70% at 88% -10%, color-mix(in srgb, var(--volt-emerald) 10%, transparent) 0%, transparent 58%)",
          "var(--volt-void)"
        ].join(", "),
        overflow: "hidden"
      }
    },
      h(DotField, null),
      /* Centred: the hero is the search moment, so it composes around the field
         the way a search engine's home page does. The content bands below stay
         left-aligned — centring a nine-card grid and its lead would cost
         scannability, and the contrast marks the hero as a different kind of
         surface rather than reading as inconsistency. */
      /* width 100% because the section is now a flex row — without it the
         container collapses to content width and the centring breaks.
         Asymmetric padding pushes the block below the fixed header's 76px so it
         centres in the *visible* area rather than the geometric one. */
      h(Container, { style: Object.assign({ position: "relative", zIndex: 2, width: "100%", padding: "76px 32px 24px" }, col("24px", { alignItems: "center", textAlign: "center" })) },
        /* Four elements, down from six. The eyebrow and the mode hint are gone:
           the headline already says what this is, and there is no longer a mode
           to disclose. */
        /* nbsp so "open source" never breaks across lines — a split compound is
           the one wrap this headline cannot afford. */
        h("h1", { style: Object.assign({}, HERO, { maxWidth: "18ch" }) }, "Like Google, but for open source"),
        h("p", { style: Object.assign({}, BODY_LG, { maxWidth: "42ch" }) },
          "Except ranked on maintenance, not popularity."),

        h("form", { onSubmit: submit, style: { width: "100%", maxWidth: "680px", paddingTop: "8px" } },
          /* Button inside the field. A plain button rather than the DS one so the
             inset sizing is exact — the bundle writes its padding inline. Styled
             from the same tokens, so it stays HashiCorp's white/black 8px CTA. */
          h("div", { style: { position: "relative" } },
            h("input", {
              ref: inputRef,
              value: q, onChange: function (e) { window.NvQuery.set(e.target.value); },
              onFocus: function () { setFocused(true); },
              onBlur: function () { setFocused(false); },
              "aria-label": "Search the catalog",
              style: {
                width: "100%", boxSizing: "border-box",
                background: focused ? "var(--volt-canvas)" : "var(--volt-surface)",
                color: "var(--volt-text-200)",
                /* Focus bloom: the accent takes the border and an accent-tinted
                   ring plus a soft outer glow fade in. Fires on interaction —
                   deliberately not an idle shimmer, which is the generic AI-
                   product tell and reads badly on a product called notavibe. */
                border: "1px solid " + (focused ? "var(--volt-emerald)" : "var(--volt-border)"),
                boxShadow: focused
                  ? "0 0 0 4px rgba(0,202,142,0.13), 0 0 34px rgba(0,202,142,0.10)"
                  : "0 0 0 0 rgba(0,202,142,0), 0 0 0 rgba(0,202,142,0)",
                transition: "border-color var(--motion-base) ease, box-shadow var(--motion-base) ease, background-color var(--motion-base) ease",
                /* pill, matching the header capsule and its search — HashiCorp
                   puts CTAs on 8px "not a pill", so this is a deliberate
                   departure, taken for internal consistency with the shell */
                borderRadius: "var(--radius-pill, 9999px)",
                padding: "20px 136px 20px 26px",
                fontFamily: "var(--font-sans)", fontWeight: 500,
                fontSize: "18px", lineHeight: 1.5, outline: "none",
                /* the one thing that must not inherit the hero's centring */
                textAlign: "left"
              }
            }),
            h("button", {
              type: "submit",
              style: {
                position: "absolute", right: "8px", top: "8px", bottom: "8px",
                padding: "0 24px", minWidth: "104px",
                background: "var(--primary)", color: "var(--on-primary)",
                border: "none", borderRadius: "var(--radius-pill, 9999px)",
                fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "14px",
                letterSpacing: 0, cursor: "pointer"
              }
            }, "Search"))),

        h(SeedChips, { ctx: ctx }),

        /* D5: the unclaimed count stays visible, but it has to be coherent with
           the catalog figure beside it — "8,412 projects · 8 unclaimed" reads as
           8-of-8412. Scaled off the seed ratio so it still moves as pages are
           claimed in the prototype. Both numbers are placeholders until the real
           catalog is wired. */
        h("span", { style: MONO },
          "8,412 projects · " + Math.round(8412 * unclaimed / total).toLocaleString("en-US")
            + " unclaimed · schema v1")));
  }

  /* ─────────────────────────────────────────────────────────────────
     D10 — Ship Week is dark until it has claimed projects to name.
     §5.6 lets a feature name claimed projects and not unclaimed ones.
     Ship Week is a release roundup, so it is project-named by definition
     and has no category-shaped launch-day form. The gate below is the
     rule, not a flag: every entry must be Active or the band stays down.
     At seed data hono is unclaimed, so the band is dark — which is what
     launch day looks like.
     ───────────────────────────────────────────────────────────────── */
  function shipWeekLive(ctx) {
    var sw = window.SHIP_WEEK;
    if (!sw || !sw.live || !sw.entries.length) return false;
    return sw.entries.every(function (s) { return ctx.claimState(s) === "active"; });
  }

  function ModShipWeek(props) {
    var ctx = props.ctx, sw = window.SHIP_WEEK;
    if (!shipWeekLive(ctx)) return null;
    return h("section", { style: { background: "var(--volt-canvas)", borderTop: "1px solid var(--volt-border)" } },
      h(Container, { style: { padding: "20px 32px", display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" } },
        h(PillTag, { tone: "accent", dot: true }, sw.label.toLowerCase() + " · live"),
        h("span", { style: { fontFamily: "var(--font-sans)", fontSize: "13px", color: "var(--volt-text-500)", minWidth: 0 } },
          sw.entries.map(function (s) { var p = window.findProject(s); return p ? p.name : s; }).join("  ·  ")),
        h("span", { style: { marginLeft: "auto" } },
          h(Button, { variant: "ghost", size: "sm", onClick: function () { ctx.go({ name: "shipweek" }); } }, "Open the hub →"))));
  }

  /* D7 — categories stay first. The nine-intent map is what makes 8,412
     pages feel finite; it is also the first interactive element now that
     the hero carries no CTA. */
  /* Every one of these is a real Heroicons v2 outline name. The previous map
     keyed six entries — web-frameworks, data-layer, cli-tooling, observability,
     auth, ui-libraries — against slugs that do not exist in CATEGORIES, so six
     of nine cards silently fell through to the same squares-2x2 glyph. Icons
     resolve as a CDN mask URL (CDN + variant + "/" + name + ".svg"), so a wrong
     name is a repeated icon at best and a blank square at worst. */
  var CAT_ICON = {
    "build-tooling": "wrench",
    "testing": "beaker",
    "database": "circle-stack",
    "validation": "shield-check",
    "linting": "list-bullet",
    "server": "server-stack",
    "state": "arrow-path",
    "release": "rocket-launch",
    "node-utilities": "command-line"
  };

  var EXPO_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

  /* ── Module 1, weighted ──────────────────────────────────────────────────
     The headline claims "not a taxonomy" while the old layout rendered nine
     identical cards in a uniform 3×3 — which is precisely what a taxonomy looks
     like. The form was arguing against the copy.

     Cards are now sized by real catalog density: the densest intent takes two
     thirds of a row, everything else takes a third. Three consequences, all of
     them the point:
     · the grid stops reading as a taxonomy because it stops being uniform
     · density becomes structural instead of a number in a corner, so thin
       categories no longer look broken — they are simply smaller
     · the layout tells the truth about what is actually in the catalog

     And the selection floor stops producing dead ends. Below it, a card names
     its single project instead of withholding a count — specificity beats a
     blank. Six of nine cards previously ended on nothing.
     ──────────────────────────────────────────────────────────────────────── */
  function ModCategories(props) {
    var ctx = props.ctx;
    var hv = React.useState(-1), hover = hv[0], setHover = hv[1];

    var projectsIn = function (slug) {
      return window.PROJECTS.filter(function (p) {
        return p.categories.indexOf(slug) > -1 && ctx.claimState(p.slug) !== "suppressed";
      });
    };

    var cats = window.CATEGORIES.map(function (c) {
      var ps = projectsIn(c.slug);
      return { c: c, n: ps.length, names: ps.map(function (p) { return p.name; }) };
    });
    var maxN = cats.reduce(function (m, x) { return Math.max(m, x.n); }, 0);
    var leaderIdx = cats.findIndex(function (x) { return x.n === maxN; });

    /* Staggered reveal is a CSS animation on .nv-cat-card (60ms apart via the
       inline animationDelay below), played once on mount — see injectChipCSS.
       No scroll observer: the cards are never gated on scroll position, so they
       cannot arrive late or re-appear on scroll-up. */

    return h(Band, { tone: "canvas" },
      h(BandHead, {
        eyebrow: "Start with an intent",
        title: "Nine intents, not a taxonomy",
        lead: "Categories are what you came to do, not how the code is written. Assignment is automatic and staff-corrected."
      }),
      h("div", {
        className: "nv-cat-grid",
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridAutoFlow: "dense",
          gap: "16px"
        }
      },
        cats.map(function (x, i) {
          var lead = i === leaderIdx;
          var on = hover === i;
          /* leader takes 4 of 6 columns, everyone else 2 — which packs exactly:
             row 1 is leader + one card, rows 2 and 3 are three cards each */
          return h("a", {
            key: x.c.slug,
            href: "#",
            className: "nv-cat-card",
            onClick: function (e) { e.preventDefault(); ctx.go({ name: "category", slug: x.c.slug }); },
            onMouseEnter: function () { setHover(i); },
            onMouseLeave: function () { setHover(-1); },
            style: {
              gridColumn: "span " + (lead ? 4 : 2),
              display: "flex", flexDirection: "column", gap: "14px",
              minHeight: lead ? "196px" : "158px",
              padding: lead ? "28px" : "24px",
              boxSizing: "border-box",
              borderRadius: "12px",
              textDecoration: "none",
              background: on ? "var(--volt-surface)" : "var(--volt-canvas)",
              border: "1px solid " + (on ? "rgba(0,202,142,0.45)" : "var(--volt-border)"),
              /* on-mount cascade; the entrance itself is the .nv-cat-card animation */
              animationDelay: Math.min(i, 8) * 60 + "ms",
              transition: "background-color 260ms " + EXPO_OUT
                + ", border-color 260ms " + EXPO_OUT
            }
          },
            h(IconTile, { tone: "accent", size: lead ? 42 : 36 },
              h(Icon, { name: CAT_ICON[x.c.slug] || "squares-2x2", size: lead ? 21 : 18 })),

            h("span", {
              style: Object.assign({}, BODY_LG, {
                fontWeight: 600,
                color: "var(--volt-white)",
                fontSize: lead ? "26px" : "18px",
                lineHeight: lead ? 1.2 : 1.4,
                letterSpacing: lead ? "-0.4px" : "0"
              })
            }, x.c.intent),

            /* the leader has room to name what is actually inside it */
            lead && x.names.length
              ? h("span", { style: Object.assign({}, MONO, { color: "var(--volt-text-500)" }) },
                  x.names.slice(0, 4).join("  ·  "))
              : null,

            h("span", {
              style: {
                display: "flex", justifyContent: "space-between", gap: "12px",
                marginTop: "auto", alignItems: "center"
              }
            },
              h("span", { style: Object.assign({}, MONO, { color: "var(--volt-text-400)" }) }, x.c.label),
              /* one page is not an embarrassment worth hiding — it is a name */
              h("span", { style: Object.assign({}, MONO, on ? { color: "var(--volt-emerald)" } : {}) },
                x.n === 0 ? "" : x.n === 1 ? x.names[0] : x.n + " pages")));
        })));
  }

  /* ─────────────────────────────────────────────────────────────────
     D6 · D13 — module 2 has two states and both are true.
     Logged out it is "This week's selection", makes no personalization
     claim, and the explore dial is visible and enabled per §7's entry
     rule: touching it opens sign-in scoped to that action.
     Signed in it is Your Deck, and the dial actually reorders the deck —
     it used to only rewrite its own label.
     ───────────────────────────────────────────────────────────────── */
  function ModDeck(props) {
    var ctx = props.ctx;
    var st = React.useState(35), dial = st[0], setDial = st[1];
    var pool = window.PROJECTS.filter(function (p) { return LIVE[ctx.claimState(p.slug)]; });

    /* the dial is a real control: familiar end favours claimed + broad,
       exploratory end rotates in the long tail. */
    var deck = pool.slice().sort(function (a, b) {
      var w = function (p) {
        var claimed = ctx.claimState(p.slug) === "active" ? 1 : 0;
        return dial < 50 ? -claimed : claimed;
      };
      return w(a) - w(b);
    }).slice(0, 4);

    var onDial = function (e) {
      if (!ctx.signedIn) { ctx.go({ name: "signin", next: ctx.route }); return; }
      setDial(Number(e.target.value));
    };

    return h(Band, null,
      h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "32px", flexWrap: "wrap" } },
        ctx.signedIn
          ? h(BandHead, {
              eyebrow: "Your deck",
              title: "Built from your profile, not from what is popular",
              lead: "Eight to twelve projects a week from your preference profile and the health signals. The discovery digest is its email form."
            })
          : h(BandHead, {
              eyebrow: "This week's selection",
              title: "Eight projects, ordered by the published formula",
              lead: "Maintenance rhythm and contribution breadth — never stars, never downloads. Sign in to weight this toward what you already use."
            }),
        h("div", { style: col("8px", { minWidth: "260px", flex: "0 1 300px" }) },
          h("div", { style: { display: "flex", justifyContent: "space-between" } },
            h("span", { style: MONO }, "FAMILIAR"),
            h("span", { style: MONO }, "EXPLORATORY")),
          h("input", {
            type: "range", min: 0, max: 100, value: dial,
            "aria-label": ctx.signedIn ? "Explore dial" : "Explore dial — sign in to weight your deck",
            onChange: onDial,
            style: { width: "100%", accentColor: "var(--volt-emerald)" }
          }),
          h("span", { style: MONO },
            ctx.signedIn ? "explore = " + dial + "% · 8 this week" : "sign in to weight this"))),
      h("div", { style: GRID },
        deck.map(function (p) { return h(window.NvProjectCard, { key: p.slug, project: p, ctx: ctx }); })));
  }

  /* D13 — module 3 stops pitching a scan to someone who already scanned. */
  function ModStack(props) {
    var ctx = props.ctx;
    if (ctx.signedIn) {
      return h(Band, { tone: "canvas" },
        h("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "32px", alignItems: "center" } },
          h("div", { style: col("24px") },
            h(BandHead, {
              eyebrow: "Your stack",
              title: "34 dependencies · 11 in the catalog",
              lead: "Twenty-three are not in the catalog yet. Nominating one asks us to generate its page."
            }),
            h("div", { style: { display: "flex", gap: "16px", flexWrap: "wrap" } },
              h(Button, { variant: "primary", onClick: function () { ctx.go({ name: "stack.results" }); } }, "View my stack"),
              h(Button, { variant: "outline", onClick: function () { ctx.go({ name: "stack.connect" }); } }, "Re-scan")),
            h("span", { style: MONO }, "last scanned from package.json · manifest not retained")),
          h(CodeMockup, { filename: "package.json", code: window.MANIFEST_SAMPLE, language: "json" })));
    }
    return h(Band, { tone: "canvas" },
      h("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "32px", alignItems: "center" } },
        h("div", { style: col("24px") },
          h(BandHead, {
            eyebrow: "Discover your stack",
            title: "Start from what you already depend on",
            lead: "Connect GitHub or GitLab read-minimal, or paste a manifest. The scan runs server-side and matches resolve against the catalog."
          }),
          h("div", { style: { display: "flex", gap: "16px", flexWrap: "wrap" } },
            h(Button, { variant: "primary", onClick: function () { ctx.go({ name: "stack.connect" }); } }, "Scan my stack"),
            h(Button, { variant: "outline", onClick: function () { ctx.go({ name: "methodology" }); } }, "How the scan is handled")),
          h("span", { style: MONO }, "manifests are not retained beyond the session unless you save them")),
        h(CodeMockup, { filename: "package.json", code: window.MANIFEST_SAMPLE, language: "json" })));
  }

  /* D10 fixes — the featured card opens its feature, not the index; and of
     the three integrity pills only "unpurchasable" says anything to Raj. */
  function ModEditorial(props) {
    var ctx = props.ctx;
    var e = window.EDITORIAL[0];
    var cat = window.CATEGORIES.find(function (c) { return c.slug === e.category; });
    var open = function () { ctx.go({ name: "editorial", slug: e.slug || e.category }); };
    return h(Band, null,
      h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px", flexWrap: "wrap" } },
        /* D9's heading rule applies here too: this was the one module with no
           h2, so it was the one module unreachable by heading navigation.
           Same eyebrow styling, real heading semantics. */
        h("h2", { style: EYEBROW }, "Editorial"),
        h("a", {
          href: "#", onClick: function (ev) { ev.preventDefault(); ctx.go({ name: "editorial" }); },
          style: { fontFamily: "var(--font-sans)", fontSize: "13px", color: "var(--link)" }
        }, "all features →")),
      h(Card, {
        interactive: true, padding: "32px", onClick: open,
        style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }
      },
        h("div", { style: col("16px") },
          h("span", { style: MONO }, "CATEGORY FEATURE · " + (cat ? cat.label.toUpperCase() : e.category)),
          h("h3", { style: Object.assign({}, H2, { fontSize: "28px", lineHeight: "34px" }) }, e.title),
          h("span", { style: MONO }, e.author + " · " + e.date)),
        h("div", { style: col("16px", { justifyContent: "center" }) },
          h("p", { style: Object.assign({}, BODY, { fontSize: "18px", lineHeight: "28px" }) }, e.standfirst),
          h("div", { style: { display: "flex", gap: "6px", flexWrap: "wrap" } },
            h(PillTag, null, "unpurchasable")))));
  }

  /* ─────────────────────────────────────────────────────────────────
     D12 — consent. Non-blocking, bottom, page fully usable behind it.
     Both buttons are the same variant at the same size: if you can tell
     which one we want clicked, reject-as-easy-as-accept has failed.
     One grant per visitor, so this is a one-time cost.
     ───────────────────────────────────────────────────────────────── */
  function ConsentBar(props) {
    var ctx = props.ctx;
    var st = React.useState(false), done = st[0], setDone = st[1];
    if (done) return null;
    return h("div", {
      role: "region", "aria-label": "Cookie consent",
      style: {
        /* fixed, not sticky: a sticky bottom bar only appears once its
           container's bottom edge reaches the viewport, so on a short page
           consent would never render — and §10.2 needs the grant captured
           before click-ID persistence, on first paint. */
        position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 20,
        /* surface-2 rather than the band fill: now that --volt-canvas is
           near-black, a consent bar on it would be separated from the page by
           a hairline alone — too little for chrome that has to be noticed. */
        background: "var(--volt-surface)", borderTop: "1px solid var(--volt-border)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)"
      }
    },
      h(Container, { style: { padding: "16px 32px", display: "flex", alignItems: "center", gap: "16px 24px", flexWrap: "wrap" } },
        h("p", { style: Object.assign({}, SMALL, { flex: "1 1 320px", minWidth: 0 }) },
          "We measure campaign traffic server-side. No client pixels, ours included. Declining changes nothing about what you can read here."),
        h("div", { style: { display: "flex", gap: "8px", flexWrap: "wrap" } },
          /* identical variant, identical size, one tap each */
          h(Button, { variant: "outline", size: "sm", onClick: function () { setDone(true); } }, "Accept"),
          h(Button, { variant: "outline", size: "sm", onClick: function () { setDone(true); } }, "Decline"),
          h(Button, {
            variant: "ghost", size: "sm",
            onClick: function () { ctx.go({ name: "methodology" }); }
          }, "What we collect"))));
  }

  /* No `refine` entry: it moved into the hero. ctx.moduleOrder still lists it,
     and an unmapped key renders nothing — so the five remaining modules keep
     their invariant order and the page is not left with two search fields. */
  var MOD = { categories: ModCategories, deck: ModDeck, stack: ModStack, editorial: ModEditorial };

  function NvDiscover(props) {
    var ctx = props.ctx;
    return h("div", null,
      h(Hero, { ctx: ctx }),
      h(ModShipWeek, { ctx: ctx }),
      ctx.moduleOrder.map(function (key) {
        var M = MOD[key];
        return M ? h(M, { key: key, ctx: ctx }) : null;
      }),
      h(ConsentBar, { ctx: ctx }));
  }

  /* the nav shares the gate, so the band, the nav item and the mobile row
     turn on and off together rather than drifting apart. */
  window.NvShipWeekLive = shipWeekLive;
  window.NvFrontDoorV2 = true;

  /* The Design Compiler runtime does not guarantee script execution order, so
     "loaded last wins" is a race: notavibe-hifi.js also assigns NvDiscover and
     sometimes lands after this file.

     Re-asserting on a macrotask and on load was the first attempt and it is not
     enough — it only wins if hifi.js has already run by then, and sometimes it
     has not. A property whose setter ignores writes is order-independent: if
     hifi.js runs first its assignment is simply replaced here, and if it runs
     later its assignment is swallowed. */
  try {
    Object.defineProperty(window, "NvDiscover", {
      configurable: true,
      get: function () { return NvDiscover; },
      set: function () { /* deliberately ignored — see above */ }
    });
  } catch (e) {
    window.NvDiscover = NvDiscover;
  }
})();

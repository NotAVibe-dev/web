/* notavibe — public surfaces in the VoltAgent design language.
   Void/canvas two-surface rhythm, one emerald accent, hairline cards, code
   mockups where a marketing page would want a photo, every number in mono.
   Loaded last, so these win over the annotated spec-walkthrough screens. */
(function () {
  var h = React.createElement;
  var V = window.VoltAgentDesignSystem_2e3ec5;
  var NS = window.TogetherAIDesignSystem_eaf923;
  var Button = NS.Button, Container = NS.Container, Wordmark = NS.Wordmark;
  var Card = V.Card, PillTag = V.PillTag, DataTable = V.DataTable, CodeMockup = V.CodeMockup,
      DotPattern = V.DotPattern, IconTile = V.IconTile, Icon = V.Icon, GreenDivider = V.GreenDivider;

  var col = function (gap, extra) { return Object.assign({ display: "flex", flexDirection: "column", gap: gap }, extra || {}); };

  /* Type — Inter, regular weight, negative tracking. Nothing bolded at display size. */
  var HERO = { margin: 0, fontWeight: 400, fontSize: "clamp(36px, 4.4vw, 60px)", lineHeight: 1.02, letterSpacing: "-0.65px", color: "var(--volt-white)" };
  var H2 = { margin: 0, fontWeight: 400, fontSize: "36px", lineHeight: "40px", letterSpacing: "-0.9px", color: "var(--volt-white)" };
  var H3 = { margin: 0, fontWeight: 600, fontSize: "20px", lineHeight: "28px", color: "var(--volt-white)" };
  var BODY_LG = { margin: 0, fontSize: "18px", lineHeight: "28px", color: "var(--volt-text-200)", textWrap: "pretty" };
  var BODY = { margin: 0, fontSize: "16px", lineHeight: "26px", color: "var(--volt-text-500)", textWrap: "pretty" };
  var SMALL = { margin: 0, fontSize: "14px", lineHeight: "20px", color: "var(--volt-text-500)", textWrap: "pretty" };
  var EYEBROW = { margin: 0, fontSize: "14px", lineHeight: "20px", fontWeight: 600, letterSpacing: "2.52px", textTransform: "uppercase", color: "var(--volt-text-400)" };
  var MONO = { fontFamily: "var(--font-mono)", fontSize: "12px", lineHeight: "16px", color: "var(--volt-text-600)" };
  var MONO_MD = { fontFamily: "var(--font-mono)", fontSize: "13px", lineHeight: "18px", color: "var(--volt-text-500)" };

  function Eyebrow(props) {
    return h("p", { style: Object.assign({}, EYEBROW, props.accent ? { color: "var(--volt-emerald-deep)" } : {}, props.style || {}) }, props.children);
  }

  /* Two surfaces only: void and canvas. Never a third. */
  function Band(props) {
    return h("section", {
      style: Object.assign({
        position: "relative",
        background: props.tone === "canvas" ? "var(--volt-canvas)" : "var(--volt-void)",
        borderTop: "1px solid var(--volt-border)",
        boxSizing: "border-box"
      }, props.style || {})
    }, h(Container, { style: Object.assign({ padding: "48px 32px" }, col("32px")) }, props.children));
  }

  function BandHead(props) {
    return h("div", { style: col("16px", { maxWidth: "68ch" }) },
      h(Eyebrow, null, props.eyebrow),
      h("h2", { style: H2 }, props.title),
      props.lead ? h("p", { style: Object.assign({}, BODY, { fontSize: "20px", lineHeight: "28px", maxWidth: "60ch" }) }, props.lead) : null);
  }

  /* ── band chips: one accent, so strength is emerald and everything else is grey ── */

  var SOLID_LIGHT = { background: "var(--volt-surface)", borderColor: "var(--volt-border)", color: "var(--volt-text-300)" };
  var ACCENT_LIGHT = { color: "var(--volt-emerald-deep)" };

  var TONE = {
    "Steady": "accent", "Broad": "accent", "Substantive": "accent", "Strong": "accent", "Very high": "accent",
    "Intermittent": "default", "Narrowing": "default", "Mixed": "default", "Adequate": "default", "High": "default", "Moderate": "default",
    "Quiet": "solid", "Single-author": "solid", "Sparse": "solid", "Weak": "solid", "Low": "solid",
    "Insufficient data": "held"
  };

  function Chip(props) {
    var t = TONE[props.value] || "held";
    if (t === "held") {
      return h("span", {
        style: Object.assign({ display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: "var(--radius-pill)", border: "1px dashed var(--volt-border-dashed)", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--volt-text-600)", whiteSpace: "nowrap" }, props.style || {})
      }, props.value);
    }
    return h(PillTag, {
      tone: t === "accent" ? "accent" : t,
      dot: t === "accent",
      style: Object.assign({ fontFamily: "var(--font-mono)", fontSize: "11px" }, t === "solid" ? SOLID_LIGHT : {}, t === "accent" ? ACCENT_LIGHT : {}, props.style || {})
    }, props.value);
  }

  function signalOf(project, key, ghDegraded) {
    var s = project.signals[key];
    if (ghDegraded && s.held) return { band: "Insufficient data", detail: "Source unavailable — no value is guessed", source: s.source, fetched: s.fetched };
    return s;
  }

  var LIVE = { generated: true, active: true, lapsed: true };

  /* ── project card ─────────────────────────────────────────────── */

  function ProjectCard(props) {
    var ctx = props.ctx, p = props.project;
    var state = ctx.claimState(p.slug);
    if (state === "suppressed") return null;
    var claimed = state === "active" || state === "lapsed";
    var saved = ctx.isSaved(p.slug);
    return h(Card, { interactive: true, style: col("16px", { height: "100%" }) },
      h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" } },
        h("div", { style: col("2px", { minWidth: 0 }) },
          h("a", {
            href: "#",
            onClick: function (e) { e.preventDefault(); ctx.go({ name: "project", slug: p.slug }); },
            style: Object.assign({}, H3, { color: "var(--volt-white)" })
          }, p.name),
          h("span", { style: MONO }, p.slug)),
        state === "active"
          ? h(PillTag, { tone: "accent", dot: true }, "verified")
          : h(PillTag, { tone: "default" }, state === "generated" ? "unclaimed" : state)),
      h("p", { style: SMALL }, p.description),
      h("div", { style: { display: "flex", gap: "6px", flexWrap: "wrap" } },
        LIVE[state]
          ? [h(Chip, { key: "u", value: signalOf(p, "updates", ctx.ghDegraded).band }),
             h(Chip, { key: "b", value: signalOf(p, "breadth", ctx.ghDegraded).band })]
          : h("span", { style: MONO }, state === "retired" ? "dated record · facts frozen" : "not rendered")),
      h("div", { style: { display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", marginTop: "auto", paddingTop: "4px" } },
        h(Button, { variant: saved ? "ghost" : "outline", size: "sm", onClick: function () { ctx.go({ name: "action.save", slug: p.slug }); } }, saved ? "In a list" : "Save to list"),
        h("a", {
          href: "#",
          onClick: function (e) { e.preventDefault(); ctx.go({ name: "project", slug: p.slug }); },
          style: Object.assign({}, MONO, { color: "var(--volt-text-500)" })
        }, claimed ? "open page →" : "open · unclaimed →")));
  }

  /* ── front door ───────────────────────────────────────────────── */

  var CAT_ICON = {
    "build-tooling": "wrench", "testing": "bug-ant", "web-frameworks": "window",
    "data-layer": "circle-stack", "cli-tooling": "command-line", "observability": "chart-bar",
    "linting": "list-bullet", "auth": "lock-closed", "ui-libraries": "squares-2x2"
  };

  function catCount(slug) {
    return window.PROJECTS.filter(function (p) { return p.categories.indexOf(slug) > -1; }).length;
  }

  function ModShipWeek(props) {
    var ctx = props.ctx, sw = window.SHIP_WEEK;
    if (!sw.live) return null;
    return h("section", { style: { background: "var(--volt-canvas)", borderTop: "1px solid var(--volt-border)" } },
      h(Container, { style: { padding: "20px 32px", display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" } },
        h(PillTag, { tone: "accent", dot: true }, sw.label.toLowerCase() + " · live"),
        h("span", { style: Object.assign({}, MONO_MD, { minWidth: 0 }) },
          sw.entries.map(function (s) { var p = window.findProject(s); return p ? p.name : s; }).join("  ·  ")),
        h("span", { style: { marginLeft: "auto" } },
          h(Button, { variant: "ghost", size: "sm", onClick: function () { ctx.go({ name: "shipweek" }); } }, "Open the hub →"))));
  }

  function ModCategories(props) {
    var ctx = props.ctx;
    return h(Band, { tone: "canvas" },
      h(BandHead, { eyebrow: "Start with an intent", title: "Nine intents, not a taxonomy", lead: "Categories are what you came to do, not how the code is written. Assignment is automatic and staff-corrected." }),
      h("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" } },
        window.CATEGORIES.map(function (c) {
          return h(Card, {
            key: c.slug, interactive: true, onClick: function () { ctx.go({ name: "category", slug: c.slug }); },
            style: col("12px", { minHeight: "132px" })
          },
            h(IconTile, { tone: "accent", size: 36 }, h(Icon, { name: CAT_ICON[c.slug] || "squares-2x2", size: 18 })),
            h("span", { style: Object.assign({}, BODY_LG, { fontWeight: 600 }) }, c.intent),
            h("span", { style: { display: "flex", justifyContent: "space-between", gap: "12px", marginTop: "auto", alignItems: "center" } },
              h("span", { style: Object.assign({}, MONO, { color: "var(--volt-text-400)" }) }, c.label),
              h("span", { style: MONO }, catCount(c.slug) === 1 ? "1 page" : catCount(c.slug) + " pages")));
        })));
  }

  function ModDeck(props) {
    var ctx = props.ctx;
    var st = React.useState(35), dial = st[0], setDial = st[1];
    var deck = window.PROJECTS.filter(function (p) { return LIVE[ctx.claimState(p.slug)]; }).slice(0, 4);
    return h(Band, null,
      h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "32px", flexWrap: "wrap" } },
        h(BandHead, { eyebrow: "Your deck", title: "Built from your profile, not from what is popular", lead: "Eight to twelve projects a week from your preference profile and the health signals. The discovery digest is its email form." }),
        h("div", { style: col("8px", { minWidth: "260px", flex: "0 1 300px" }) },
          h("div", { style: { display: "flex", justifyContent: "space-between" } },
            h("span", { style: MONO }, "FAMILIAR"),
            h("span", { style: MONO }, "EXPLORATORY")),
          h("input", {
            type: "range", min: 0, max: 100, value: dial, "aria-label": "Explore dial",
            onChange: function (e) { setDial(Number(e.target.value)); },
            style: { width: "100%", accentColor: "var(--volt-emerald)" }
          }),
          h("span", { style: MONO }, "explore = " + dial + "%  ·  8 this week"))),
      h("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" } },
        deck.map(function (p) { return h(ProjectCard, { key: p.slug, project: p, ctx: ctx }); })));
  }

  function ModStack(props) {
    var ctx = props.ctx;
    return h(Band, { tone: "canvas" },
      h("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "32px", alignItems: "center" } },
        h("div", { style: col("24px") },
          h(BandHead, { eyebrow: "Discover your stack", title: "Start from what you already depend on", lead: "Connect GitHub or GitLab read-minimal, or paste a manifest. The scan runs server-side and matches resolve against the catalog." }),
          h("div", { style: { display: "flex", gap: "16px", flexWrap: "wrap" } },
            h(Button, { variant: "primary", onClick: function () { ctx.go({ name: "stack.connect" }); } }, "Scan my stack"),
            h(Button, { variant: "outline", onClick: function () { ctx.go({ name: "methodology" }); } }, "How the scan is handled")),
          h("span", { style: MONO }, "manifests are not retained beyond the session unless you save them")),
        h(CodeMockup, { filename: "package.json", code: window.MANIFEST_SAMPLE, language: "json" })));
  }

  function ModEditorial(props) {
    var ctx = props.ctx;
    var e = window.EDITORIAL[0];
    var cat = window.CATEGORIES.find(function (c) { return c.slug === e.category; });
    return h(Band, null,
      h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px", flexWrap: "wrap" } },
        h(Eyebrow, null, "Editorial"),
        h("a", { href: "#", onClick: function (ev) { ev.preventDefault(); ctx.go({ name: "editorial" }); }, style: Object.assign({}, MONO_MD, { color: "var(--volt-emerald-deep)" }) }, "all features →")),
      h(Card, {
        interactive: true, padding: "32px",
        onClick: function () { ctx.go({ name: "editorial" }); },
        style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }
      },
        h("div", { style: col("16px") },
          h("span", { style: MONO }, "CATEGORY FEATURE · " + (cat ? cat.label.toUpperCase() : e.category)),
          h("h3", { style: Object.assign({}, H2, { fontSize: "28px", lineHeight: "34px" }) }, e.title),
          h("span", { style: MONO }, e.author + " · " + e.date)),
        h("div", { style: col("16px", { justifyContent: "center" }) },
          h("p", { style: Object.assign({}, BODY, { fontSize: "18px", lineHeight: "28px" }) }, e.standfirst),
          h("div", { style: { display: "flex", gap: "6px", flexWrap: "wrap" } },
            h(PillTag, null, "unpurchasable"), h(PillTag, null, "staff-awarded"), h(PillTag, null, "named author")))));
  }

  function ModRefine(props) {
    var ctx = props.ctx;
    var st = React.useState(""), q = st[0], setQ = st[1];
    var submit = function (e) {
      e.preventDefault();
      var words = q.trim().split(/\s+/).filter(Boolean).length;
      ctx.go({ name: words > 4 ? "backer.chat" : "search", q: q });
    };
    return h("section", { style: { background: "var(--volt-canvas)", borderTop: "1px solid var(--volt-border)" } },
      h(Container, { style: Object.assign({ padding: "48px 32px" }, col("32px")) },
        h(BandHead, { eyebrow: "Refine", title: "A short query filters. A conversation curates.", lead: "One entry, not two — the same versioned vocabulary behind both. Nothing you type here becomes a ranking input." }),
        h("form", { onSubmit: submit, style: { display: "flex", gap: "12px", flexWrap: "wrap", maxWidth: "780px" } },
          h("input", {
            value: q, onChange: function (e) { setQ(e.target.value); },
            placeholder: "A test runner that reads my Vite config",
            "aria-label": "Refine the catalog",
            style: { flex: "1 1 320px", minWidth: 0, background: "var(--volt-surface)", color: "var(--volt-text-200)", border: "1px solid var(--volt-border)", borderRadius: "var(--radius-sm)", padding: "12px 16px", fontFamily: "var(--font-sans)", fontSize: "16px", lineHeight: "24px", outline: "none" }
          }),
          h(Button, { variant: "primary", onClick: submit }, "Refine")),
        h(GreenDivider, { variant: "dashed" }),
        h("span", { style: MONO }, "GROUNDED IN THE CATALOG ONLY · EVERY RECOMMENDATION CITES A PROJECT PAGE · OUTPUT IS A DRAFT LIST")));
  }

  var MOD = { categories: ModCategories, deck: ModDeck, stack: ModStack, editorial: ModEditorial, refine: ModRefine };

  function NvDiscover(props) {
    var ctx = props.ctx;
    var total = window.PROJECTS.length;
    var unclaimed = window.PROJECTS.filter(function (p) { return ctx.claimState(p.slug) === "generated"; }).length;
    return h("div", null,
      h("section", { style: { position: "relative", background: "var(--volt-void)", overflow: "hidden" } },
        h(DotPattern, { dotColor: "#94a3b8", opacity: 0.5 }),
        h(Container, { style: { position: "relative", zIndex: 2, padding: "48px 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "32px", alignItems: "center" } },
          h("div", { style: col("24px") },
            h(Eyebrow, null, "The open catalog"),
            h("h1", { style: HERO },
              "Find the projects your work ",
              h("span", { style: { color: "var(--volt-emerald-soft)", fontStyle: "italic" } }, "already"),
              " rests on"),
            h("p", { style: Object.assign({}, BODY_LG, { maxWidth: "46ch" }) },
              "Every page is built from public sources and honestly labelled. Most have no maintainer behind them yet."),
            h("div", { style: { display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" } },
              h(Button, { variant: "primary", onClick: function () { ctx.go({ name: "stack.connect" }); } }, "Scan my stack"),
              h(Button, { variant: "outline", onClick: function () { ctx.go({ name: "methodology" }); } }, "How it works")),
            h("span", { style: MONO }, "8,412 pages generated · " + unclaimed + " of the " + total + " seeded here unclaimed · schema v1 · illustrative data")),
          h(CodeMockup, {
            filename: "terminal",
            code: "$ npx notavibe scan\n\n  reading package.json … 34 deps\n  resolving against catalog …\n\n  ✓ 11 matched\n  · 23 not in catalog yet\n\n  vitest        steady     broad\n  hono          steady     narrowing\n  drizzle-orm   quiet      single-author\n\n  → notavibe.dev/stack/a91f2c",
            copyable: false
          }))),
      h(ModShipWeek, { ctx: ctx }),
      ctx.moduleOrder.map(function (key) {
        var M = MOD[key];
        return M ? h(M, { key: key, ctx: ctx }) : null;
      }));
  }

  /* ── category view ────────────────────────────────────────────── */

  function NvCategory(props) {
    var ctx = props.ctx;
    var c = window.CATEGORIES.find(function (x) { return x.slug === (ctx.route.slug || "build-tooling"); }) || window.CATEGORIES[0];
    var list = window.PROJECTS.filter(function (p) { return p.categories.indexOf(c.slug) > -1 && ctx.claimState(p.slug) !== "suppressed"; });
    var feature = window.EDITORIAL.find(function (e) { return e.category === c.slug; });
    return h("div", null,
      h("section", { style: { position: "relative", background: "var(--volt-void)", overflow: "hidden" } },
        h(DotPattern, { dotColor: "#94a3b8", opacity: 0.5 }),
        h(Container, { style: Object.assign({ position: "relative", zIndex: 2, padding: "48px 32px" }, col("16px")) },
          h("span", { style: MONO }, "DISCOVER / " + c.label.toUpperCase()),
          h("h1", { style: Object.assign({}, HERO, { fontSize: "clamp(32px, 3.4vw, 44px)" }) }, c.intent),
          h("span", { style: MONO_MD }, list.length + (list.length === 1 ? " page" : " pages") + " · ordered by the published formula, never by a composite score"))),
      h(Band, { tone: "canvas" },
        feature ? h(Card, {
          interactive: true, onClick: function () { ctx.go({ name: "editorial" }); }, style: col("8px")
        },
          h("span", { style: MONO }, "CATEGORY FEATURE · " + feature.author.toUpperCase() + " · " + feature.date),
          h("span", { style: H3 }, feature.title),
          h("span", { style: SMALL }, feature.standfirst)) : null,
        h("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" } },
          list.map(function (p) { return h(ProjectCard, { key: p.slug, project: p, ctx: ctx }); }))));
  }

  /* ── project page ─────────────────────────────────────────────── */

  function stateLine(state, p) {
    if (state === "active") return { label: "Maintainer verified", body: "Verified against " + p.slug + " on " + (p.verifiedAt || "2026-05-14") + ". Structural, unpurchasable, carries no ranking weight.", tone: "accent" };
    if (state === "lapsed") return { label: "Re-verification in progress", body: "The bound repository stopped answering the permission check. Thirty days to cure; the fact table is unchanged.", tone: "default" };
    if (state === "retired") return { label: "Retired — dated record", body: "Kept as a dated record. Facts are frozen at their last fetch; live relationships are closed.", tone: "default" };
    if (state === "revoked") return { label: "Claim revoked", body: "Revoked for cause by a platform operator. Rendered as a dated record and excluded from indexing.", tone: "default" };
    return { label: "No claim", body: "Generated from public sources. No maintainer has verified it.", tone: "default" };
  }

  function SignalTile(props) {
    return h(Card, { padding: "24px", style: col("12px", { minWidth: 0 }) },
      h("span", { style: Object.assign({}, EYEBROW, { fontSize: "12px", letterSpacing: "1.8px" }) }, props.label),
      h("div", null, h(Chip, { value: props.value, style: { fontSize: "13px", padding: "4px 10px" } })),
      h("span", { style: SMALL }, props.detail));
  }

  function InterestRow(props) {
    var ctx = props.ctx, p = props.project, sys = props.sys, claimed = props.claimed;
    var on = ctx.hasInterest(p.slug, sys.key);
    var count = (p.interest && p.interest[sys.key]) || 0;
    return h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", padding: "16px 0", borderTop: "1px solid var(--volt-border)", flexWrap: "wrap" } },
      h("div", { style: col("4px", { flex: "1 1 320px", minWidth: 0 }) },
        h("span", { style: Object.assign({}, MONO, { color: "var(--volt-text-400)" }) }, sys.label.toUpperCase()),
        h("span", { style: Object.assign({}, BODY, { color: "var(--volt-text-200)", fontWeight: 600, fontSize: "15px" }) },
          claimed ? "I’d fund this" : "Would you fund this? No maintainer has claimed this page yet — we’ll tell them if they do."),
        h("span", { style: MONO }, window.maskNumber(count + (on ? 1 : 0)) + " registered · no promise to anyone")),
      h(Button, { variant: on ? "ghost" : "outline", size: "sm", onClick: function () { ctx.go({ name: "action.interest", slug: p.slug, system: sys.key }); } },
        on ? "Registered — withdraw" : "Register interest"));
  }

  /* Responsive rules for the project page, injected once (same pattern as
     app.js injectAppShellCSS). The health DataTable is a 5-column table whose
     wrapper clips overflow; on phones we reflow it into stacked rows so the
     sourced fact, source and fetched date never disappear off the edge. */
  function ensureProjectCSS() {
    if (typeof document === "undefined" || document.getElementById("nv-project-css")) return;
    var s = document.createElement("style");
    s.id = "nv-project-css";
    s.textContent = [
      "@media (max-width: 640px){",
      ".nv-pp-health table,.nv-pp-health tbody,.nv-pp-health tr,.nv-pp-health td{display:block;width:100%}",
      ".nv-pp-health thead{display:none}",
      ".nv-pp-health tr{padding:14px 0}",
      ".nv-pp-health td{padding:2px 16px!important}",
      ".nv-pp-health td:first-child{font-size:15px;font-weight:600;color:var(--volt-text-200)!important;padding-top:8px!important}",
      ".nv-pp-health td:nth-child(2){padding-top:6px!important;padding-bottom:6px!important}",
      "}"
    ].join("");
    (document.head || document.documentElement).appendChild(s);
  }

  function NvProjectPage(props) {
    ensureProjectCSS();
    var ctx = props.ctx;
    var p = window.findProject(ctx.route.slug || ctx.focusSlug) || window.PROJECTS[0];
    var state = ctx.claimState(p.slug);
    var claimed = state === "active" || state === "lapsed";
    var dated = state === "retired" || state === "revoked";
    var live = !!LIVE[state];
    var saved = ctx.isSaved(p.slug);
    var line = stateLine(state, p);

    if (state === "suppressed") {
      return h(Container, { style: Object.assign({ padding: "48px 32px", maxWidth: "760px" }, col("24px")) },
        h("span", { style: MONO }, "404 · /" + p.slug),
        h("h1", { style: Object.assign({}, HERO, { fontSize: "40px" }) }, "This page is not here"),
        h("p", { style: BODY_LG },
          "Suppression is catalog-level: the page 404s and leaves the sitemap, and the record drops from search, filters, categories, Your Deck, the front door, the MCP tools, the read API, agent profiles and llms.txt."),
        h("div", null, h(Button, { variant: "primary", onClick: function () { ctx.go({ name: "discover" }); } }, "Back to discover")));
    }

    var updates = signalOf(p, "updates", ctx.ghDegraded);
    var breadth = signalOf(p, "breadth", ctx.ghDegraded);
    var systems = [{ key: "subscriptions", label: "Subscriptions and tiers" }, { key: "bounties", label: "Bounties and escrow" }];

    return h("div", null,
      h("section", { style: { position: "relative", background: "var(--volt-void)", overflow: "hidden" } },
        h(DotPattern, { dotColor: "#94a3b8", opacity: 0.5 }),
        h(Container, { style: Object.assign({ position: "relative", zIndex: 2, padding: "48px 32px" }, col("32px")) },
          h("span", { style: MONO }, "HOME / " + p.slug.toUpperCase()),
          h("div", { style: { display: "flex", justifyContent: "space-between", gap: "32px", flexWrap: "wrap", alignItems: "flex-start" } },
            h("div", { style: col("16px", { flex: "1 1 440px", minWidth: 0 }) },
              h("h1", { style: HERO }, p.name),
              h("span", { style: MONO_MD }, p.slug),
              h("p", { style: Object.assign({}, BODY_LG, { maxWidth: "56ch" }) }, p.description),
              h("div", { style: { display: "flex", gap: "16px", flexWrap: "wrap", paddingTop: "8px" } },
                /* Unclaimed pages lead with Claim as the primary action and demote
                   Save to a secondary; claimed / dated pages keep Save primary. */
                state === "generated"
                  ? h(Button, { variant: "primary", onClick: function () { ctx.go({ name: "claim.start", slug: p.slug }); } }, "Claim this page")
                  : null,
                h(Button, { variant: state === "generated" ? "outline" : "primary", onClick: function () { ctx.go({ name: "action.save", slug: p.slug }); } }, saved ? "Saved to a list" : "Save to list"),
                h(Button, { variant: "outline", onClick: function () { ctx.go({ name: "alternatives", slug: p.slug }); } }, "See alternatives"))),
            h(Card, { padding: "24px", style: col("12px", { flex: "0 1 320px" }) },
              h("div", { style: { display: "flex", alignItems: "center", gap: "8px" } },
                h(PillTag, { tone: line.tone, dot: line.tone === "accent" }, line.label.toLowerCase())),
              h("span", { style: SMALL }, line.body),
              !dated ? h("span", { style: MONO },
                "npm " + updates.fetched + " · github " + breadth.fetched + " · ossf " + p.signals.security.fetched) : null)),
          live ? h("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" } },
            h(SignalTile, { label: "Maintenance rhythm", value: updates.band, detail: updates.detail }),
            h(SignalTile, { label: "Contribution breadth", value: breadth.band, detail: breadth.detail })) : null)),

      h(Band, { tone: "canvas" },
        /* Editorial verdict promoted above the fold-break: on a claimed page the
           human read is the answer-first signal, so it leads the section rather
           than sitting under health / vocab / dependents. */
        claimed && p.verdict
          ? h(Card, { emphasized: true, padding: "32px", style: col("12px") },
              h(Eyebrow, { accent: true }, "Editorial verdict"),
              h("p", { style: Object.assign({}, H3, { fontWeight: 400, fontSize: "24px", lineHeight: "32px" }) }, p.verdict.text),
              h("span", { style: MONO }, p.verdict.author.toUpperCase() + " · " + p.verdict.date))
          : null,

        h("div", { style: col("16px") },
          h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px", flexWrap: "wrap" } },
            h("h2", { style: Object.assign({}, H2, { fontSize: "28px", lineHeight: "34px" }) }, "Health breakdown"),
            h("span", { style: MONO }, dated ? "FROZEN AT RETIREMENT" : "FIVE SIGNALS · EXTERNALLY SOURCED · BANDED")),
          h(DataTable, {
            className: "nv-pp-health",
            style: { overflowX: "auto" },
            columns: ["Signal", "Band", "What it counts", "Source", "Fetched"],
            rows: window.SIGNAL_META.map(function (m) {
              var s = signalOf(p, m.key, ctx.ghDegraded);
              return [
                m.label,
                h(Chip, { value: s.band }),
                s.detail,
                h("span", { style: MONO }, s.source),
                h("span", { style: MONO }, s.fetched)
              ];
            })
          }),
          h("p", { style: SMALL }, "Funding health is absent with the money. An unavailable source renders “insufficient data”, never a guess.")),

        h("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" } },
          h("div", { style: col("12px") },
            h(Eyebrow, null, p.inferred ? "Vocabulary · inferred" : "Vocabulary · declared"),
            h("div", { style: col("0") },
              window.VOCAB_DIMENSIONS.map(function (d) {
                return h("div", { key: d, style: { display: "flex", justifyContent: "space-between", gap: "16px", padding: "10px 0", borderTop: "1px solid var(--volt-border)" } },
                  h("span", { style: MONO }, d.toUpperCase()),
                  h("span", { style: Object.assign({}, SMALL, { color: "var(--volt-text-200)" }) }, (p.vocab && p.vocab[d]) || "—"));
              })),
            p.inferred ? h("p", { style: SMALL }, "Derived by the pipeline and marked as inferred. A claim replaces it with the maintainer’s own.") : null),
          h("div", { style: col("12px") },
            h(Eyebrow, null, "Who depends on this"),
            (p.dependents && p.dependents.length)
              ? h("div", { style: { display: "flex", gap: "6px", flexWrap: "wrap" } },
                  p.dependents.map(function (d) { return h(PillTag, { key: d, tone: "solid", style: Object.assign({ fontFamily: "var(--font-mono)" }, SOLID_LIGHT) }, d); }))
              : h("p", { style: SMALL }, "No dependents in the catalog yet."),
            h("div", { style: col("8px", { paddingTop: "16px" }) },
              h(Eyebrow, null, "The badge"),
              h("span", { style: { display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: "8px", border: "1px solid var(--volt-border)", borderRadius: "var(--radius-sm)", padding: "6px 10px", background: "var(--volt-void)" } },
                h(Icon, { name: "bolt", variant: "solid", size: 14, color: "var(--volt-emerald)" }),
                h("span", { style: Object.assign({}, MONO, { color: "var(--volt-text-200)" }) }, "notavibe"),
                h("span", { style: Object.assign({}, MONO, { color: state === "active" ? "var(--volt-emerald-deep)" : "var(--volt-text-600)" }) }, state === "active" ? "verified" : "unclaimed"))))),

        /* Funding demoted below the evidence: the pre-claim teaser and the
           "not yet built" interest systems follow health, vocab and dependents
           rather than opening the section. */
        state === "generated"
          ? h(Card, { padding: "32px", style: col("12px") },
              h(Eyebrow, null, "Pre-claim"),
              h("p", { style: Object.assign({}, H3, { fontWeight: 400, fontSize: "24px", lineHeight: "32px" }) },
                window.maskCount(p.listCount, "have this in a list") + " · " + window.maskCount(p.stackCount, "have this in their stack") + ". Claim this page to see more."),
              h("p", { style: SMALL }, "Every count carries the below-4 outcome-only mask — at launch volume, “2 people have this in their stack” on a niche package is close to naming them."))
          : null,

        claimed || state === "generated"
          ? h(Card, { padding: "32px", style: col("0") },
              h("div", { style: col("8px", { paddingBottom: "16px" }) },
                h(Eyebrow, null, "Coming to notavibe"),
                h("span", { style: H3 }, "Two systems are specified and not yet built"),
                h("span", { style: SMALL }, "Registering interest subscribes you to nothing. One per account per project per system; re-clicking withdraws.")),
              systems.map(function (s) { return h(InterestRow, { key: s.key, ctx: ctx, project: p, sys: s, claimed: claimed }); }))
          : null,

        claimed && p.recommendations && p.recommendations.length
          ? h("div", { style: col("12px") },
              h(Eyebrow, null, "Peer recommendations"),
              p.recommendations.map(function (r) {
                return h(Card, { key: r.from, style: col("8px") },
                  h("p", { style: Object.assign({}, BODY, { color: "var(--volt-text-200)" }) }, "“" + r.text + "”"),
                  h("a", { href: "#", onClick: function (e) { e.preventDefault(); ctx.go({ name: "project", slug: r.from }); }, style: Object.assign({}, MONO, { color: "var(--volt-emerald-deep)" }) }, "recommended by " + r.from));
              }),
              h("p", { style: SMALL }, "Claimed projects only, in both directions. Display-only; never feeds ranking."))
          : null,

        h(GreenDivider, { variant: "hairline" }),
        h("div", { style: { display: "flex", justifyContent: "space-between", gap: "32px", flexWrap: "wrap" } },
          h("div", { style: col("8px", { flex: "1 1 360px" }) },
            h(Eyebrow, null, "Ask your agent"),
            h("p", { style: SMALL }, "A platform-generated prompt over sanitized fields, instructing verification against your own codebase and lockfile."),
            h("span", { style: MONO }, "repository_id " + (p.repoId || "4128907")),
            !dated ? h("div", { style: { paddingTop: "4px" } },
              h(Button, { variant: "outline", size: "sm", icon: h(Icon, { name: "clipboard-document", size: 14 }) }, "Copy the prompt")) : null),
          h("div", { style: col("8px", { flex: "0 1 300px" }) },
            h(Eyebrow, null, "Report"),
            h("div", { style: { display: "flex", gap: "8px", flexWrap: "wrap" } },
              h(Button, { variant: "outline", size: "sm", onClick: function () { ctx.go({ name: "suppress.start", slug: p.slug, type: "correction" }); } }, "Report an error"),
              h(Button, { variant: "outline", size: "sm", onClick: function () { ctx.go({ name: "suppress.start", slug: p.slug }); } }, "Request removal"))))));
  }

  Object.assign(window, { NvDiscover: NvDiscover, NvCategory: NvCategory, NvProjectPage: NvProjectPage, NvProjectCard: ProjectCard });
})();

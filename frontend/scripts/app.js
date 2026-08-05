/* notavibe MVP prototype — router shell + the public surfaces the screen library
   does not carry (editorial, Ship Week, alternatives, comparison, Backer settings).
   Loads after the design-system bundle; reads its screens off window. */
(function () {
  var h = React.createElement;
  var DS = window.TogetherAIDesignSystem_eaf923;
  var Button = DS.Button, Badge = DS.Badge, Eyebrow = DS.Eyebrow, Container = DS.Container,
      Icon = DS.Icon, TextInput = DS.TextInput, StatsCard = DS.StatsCard;

  function W(name) { return window[name]; }
  var col = function (gap, extra) {
    return Object.assign({ display: "flex", flexDirection: "column", gap: gap }, extra || {});
  };
  var PAGE = { padding: "var(--space-3xl) var(--gutter-desktop) var(--space-section)", maxWidth: "1000px" };
  var H1 = { margin: 0, font: "var(--type-display-xl)", letterSpacing: "var(--ls-display-xl)" };
  var H2 = { margin: 0, font: "var(--type-display-md)", letterSpacing: "var(--ls-display-md)" };
  var LEAD = { margin: 0, font: "var(--type-body-lg)", letterSpacing: "var(--ls-body-lg)", color: "var(--text-secondary)", maxWidth: "62ch", textWrap: "pretty" };
  var BODY = { margin: 0, font: "var(--type-body-md)", letterSpacing: "var(--ls-body-md)", textWrap: "pretty" };
  var CARD = { border: "var(--border-level-1)", borderRadius: "var(--radius-sm)", padding: "var(--card-padding)", background: "var(--surface-card)" };
  var MONO = { font: "var(--type-mono-label)", letterSpacing: "var(--ls-mono-label)", textTransform: "uppercase" };

  /* ── App-shell responsive rules ───────────────────────────────────────────
     The backer/maintainer/admin surfaces are a fixed 232–248px sidebar next to
     the screen. Below 860px that sidebar eats half a phone and the content is
     crushed, so the shell stacks: the sidebar becomes a top strip with its links
     scrolling horizontally, and the screen takes the full width beneath it. The
     sidebar's own styles are inline, so these overrides carry !important. Class
     hooks: nv-app-shell (flex wrapper), nv-app-nav (aside), nv-app-navlinks (the
     link list), nv-app-foot (the role-switch footer, hidden on the strip). */
  (function injectAppShellCSS() {
    if (typeof document === "undefined" || document.getElementById("nv-appshell-css")) return;
    var s = document.createElement("style");
    s.id = "nv-appshell-css";
    s.textContent = [
      "@media (max-width: 860px){",
      ".nv-app-shell{flex-direction:column!important}",
      ".nv-app-nav{width:100%!important;flex:none!important;min-height:0!important;",
      "border-right:none!important;border-bottom:1px solid var(--border-hairline)!important;",
      "position:sticky;top:0;z-index:10;padding:12px 16px!important;gap:12px!important}",
      ".nv-app-navlinks{flex-direction:row!important;flex-wrap:nowrap;overflow-x:auto;gap:4px!important;",
      "-webkit-overflow-scrolling:touch;scrollbar-width:none}",
      ".nv-app-navlinks::-webkit-scrollbar{display:none}",
      ".nv-app-navlinks a{white-space:nowrap;flex:0 0 auto}",
      ".nv-app-foot{display:none!important}",
      "}",
      /* Inside the app screens, the fixed multi-column grids (stat rows, side-by-
         side panels) are too tight on a phone. Collapse them by matching their
         compiled inline track strings — scoped to .nv-app-shell so the public
         search meters (which are also repeat(4,1fr)) are never touched. */
      "@media (max-width: 640px){",
      ".nv-app-shell [style*=\"grid-template-columns: repeat(5, 1fr)\"],",
      ".nv-app-shell [style*=\"grid-template-columns: repeat(4, 1fr)\"],",
      ".nv-app-shell [style*=\"grid-template-columns: repeat(3, 1fr)\"]",
      "{grid-template-columns:1fr 1fr!important}",
      ".nv-app-shell [style*=\"grid-template-columns: 260px 1fr\"],",
      ".nv-app-shell [style*=\"grid-template-columns: 180px 1fr\"],",
      ".nv-app-shell [style*=\"grid-template-columns: 1fr 1fr auto\"]",
      "{grid-template-columns:1fr!important}",
      "}",
      /* Signed-in Backers browse discovery inside the workspace shell (see the
         backerDiscovery branch in NotavibeShell). The front door's marketing hero
         pitch and the stars-vs-health Proof are logged-out arguments — strip them
         in-workspace, leaving the search field, intent chips and the browse
         modules. The 90vh hero collapses to just its content. */
      ".nv-app-shell .nv-hero{min-height:0!important;align-items:stretch!important}",
      ".nv-app-shell .nv-hero .nv-hero-pitch{display:none!important}",
      ".nv-app-shell .nv-proof{display:none!important}",
      /* The hero's inner container pads 76px to clear the public fixed header,
         which the workspace shell does not have — reclaim it. */
      ".nv-app-shell .nv-hero > *:last-child{padding-top:var(--space-2xl)!important;padding-bottom:var(--space-2xl)!important}",
      /* Backer Home micro-interactions — custom expo-out easing, no default
         curves. Outcome rows step in on hover; the Deck card warms its border;
         arrows advance. Honoured only where motion is welcome. */
      ".nv-home-seeall{color:var(--volt-emerald)}",
      ".nv-home-seeall:hover{text-decoration:underline;text-underline-offset:3px}",
      /* Scan-target picker + tags — selected/emerald state via class, never inline,
         so the button[style*=emerald] escape-hatch never hijacks these controls. */
      ".nv-target{transition:border-color 200ms cubic-bezier(0.16,1,0.3,1)}",
      ".nv-target:hover{border-color:var(--volt-text-500)}",
      ".nv-target.on{border-color:var(--volt-emerald)!important}",
      ".nv-tag.pub{border-color:var(--volt-emerald)!important;color:var(--volt-emerald)!important}",
      ".nv-deck-cta{transition:border-color 260ms cubic-bezier(0.16,1,0.3,1),background-color 260ms cubic-bezier(0.16,1,0.3,1)}",
      ".nv-deck-cta:hover{border-color:var(--volt-emerald);background-color:var(--volt-canvas,var(--volt-surface))}",
      ".nv-arrow{display:inline-block;transition:transform 260ms cubic-bezier(0.16,1,0.3,1)}",
      ".nv-deck-cta:hover .nv-arrow,.nv-home-seeall:hover .nv-arrow{transform:translateX(4px)}",
      ".nv-deck-cta:focus-visible,.nv-home-seeall:focus-visible{outline:2px solid var(--volt-emerald);outline-offset:3px;border-radius:var(--radius-sm)}",
      "@media (prefers-reduced-motion: reduce){.nv-arrow,.nv-deck-cta{transition:none}}"
    ].join("");
    document.head.appendChild(s);
  })();

  function pageHeader(eyebrow, title, lead) {
    return h("header", { style: col("var(--space-md)") },
      h(Eyebrow, null, eyebrow),
      h("h1", { style: H1 }, title),
      lead ? h("p", { style: LEAD }, lead) : null);
  }

  /* ── Editorial surface ─────────────────────────────────────────── */

  function NamedProjects(props) {
    var ctx = props.ctx;
    return h("div", { style: { display: "flex", flexWrap: "wrap", gap: "var(--inline-gap)", alignItems: "center" } },
      h(Eyebrow, { size: "caption" }, "Named in this piece"),
      props.slugs.map(function (slug) {
        var p = window.findProject(slug);
        if (!p) return null;
        var state = ctx.claimState(p.slug);
        if (state === "suppressed") return null;
        var linkable = state === "active" || state === "lapsed";
        if (!linkable) {
          return h("span", { key: slug, style: { font: "var(--type-body-md)", letterSpacing: "var(--ls-body-md)", color: "var(--text-secondary)" } }, p.name);
        }
        return h("a", {
          key: slug, href: "#",
          onClick: function (e) { e.preventDefault(); ctx.go({ name: "project", slug: p.slug }); },
          style: { font: "var(--type-body-md-strong)", letterSpacing: "var(--ls-body-md)", color: "var(--link)", textUnderlineOffset: "3px" }
        }, p.name);
      }));
  }

  function EditorialSurface(props) {
    var ctx = props.ctx;
    var Note = W("Note"), Held = W("Held"), SectionTitle = W("SectionTitle");
    var pieces = window.EDITORIAL;
    var claimedNamed = window.PROJECTS.filter(function (p) { return ctx.claimState(p.slug) === "active"; }).slice(0, 2).map(function (p) { return p.slug; });
    var unclaimedNamed = window.PROJECTS.filter(function (p) { return ctx.claimState(p.slug) === "generated"; }).slice(0, 2).map(function (p) { return p.slug; });
    return h(Container, { style: Object.assign({}, PAGE, col("var(--space-3xl)")) },
      pageHeader("Editorial", "Category features, written by the founding team",
        "Named authors, visible dates, unpurchasable, staff-awarded. The monthly floor is a floor, not coverage."),
      h("div", { style: col("var(--space-lg)") },
        h(SectionTitle, { count: pieces.length }, "Published"),
        pieces.map(function (e) {
          var cat = window.CATEGORIES.find(function (c) { return c.slug === e.category; });
          return h("article", { key: e.slug, style: Object.assign({}, CARD, col("var(--space-lg)")) },
            h("div", { style: { display: "flex", justifyContent: "space-between", gap: "var(--space-lg)", flexWrap: "wrap" } },
              h(Eyebrow, null, "Category feature · " + (cat ? cat.label : e.category)),
              h(Eyebrow, { size: "caption" }, e.author + " · " + e.date)),
            h("h2", { style: H2 }, e.title),
            h("p", { style: LEAD }, e.standfirst),
            h(NamedProjects, { ctx: ctx, slugs: claimedNamed.concat(unclaimedNamed) }),
            h("div", { style: { display: "flex", gap: "var(--inline-gap)", flexWrap: "wrap" } },
              h(Button, { variant: "outline", onClick: function () { ctx.go({ name: "category", slug: e.category }); } }, "Open the category")));
        })),
      h(Note, null, "The naming test applies at render, not at publication: a claimed project renders as a link, an unclaimed one as plain text with no link and no band. No editorial treatment ever lands on a page nobody claimed."),
      h(Held, { refs: "§5.6" }, "On launch day every page is unclaimed, so a category feature is about the category — what it is for, how its signals read, what “good” looks like. Project features start once the claimed set can sustain them."));
  }

  /* ── Ship Week hub ─────────────────────────────────────────────── */

  function ShipWeekHub(props) {
    var ctx = props.ctx;
    var Note = W("Note"), SectionTitle = W("SectionTitle"), ProjectRow = W("ProjectRow");
    var sw = window.SHIP_WEEK;
    return h(Container, { style: Object.assign({}, PAGE, col("var(--space-3xl)")) },
      pageHeader(sw.label + " · " + sw.window, "Five days of releases from the catalog", sw.blurb),
      h("div", { style: { display: "flex", gap: "var(--inline-gap)", flexWrap: "wrap", alignItems: "center" } },
        h(Badge, { mono: true, tone: sw.live ? "neutral" : "outline" }, sw.live ? "Live" : "Closed"),
        h(Badge, { mono: true, tone: "outline" }, "Unpurchasable"),
        h(Badge, { mono: true, tone: "outline" }, "Staff-awarded")),
      h("div", { style: col("var(--space-md)") },
        h(SectionTitle, { count: sw.entries.length }, "This week"),
        sw.entries.map(function (slug) { return h(ProjectRow, { key: slug, slug: slug, ctx: ctx }); })),
      h(Note, null, "Pinned above categories on the front door only while live. The Ship Week digest rides stream (c) and sits outside the transactional count."));
  }

  /* ── Alternatives + comparison (generated acquisition surfaces) ── */

  function signalRow(label, cells) {
    return h("tr", { style: { borderTop: "var(--border-level-1)" } },
      h("th", { scope: "row", style: { textAlign: "left", padding: "var(--row-padding)", font: "var(--type-body-md)", letterSpacing: "var(--ls-body-md)", fontWeight: 400, color: "var(--text-secondary)", whiteSpace: "nowrap" } }, label),
      cells);
  }

  function SignalMatrix(props) {
    var Band = W("Band");
    var projects = props.projects;
    return h("div", { style: { width: "100%", overflowX: "auto", border: "var(--border-level-1)", borderRadius: "var(--radius-sm)" } },
      h("table", { style: { width: "100%", borderCollapse: "collapse", background: "var(--surface-canvas)" } },
        h("thead", null,
          h("tr", { style: { background: "var(--surface-soft)" } },
            h("th", { style: Object.assign({ textAlign: "left", padding: "var(--row-padding)", color: "var(--text-secondary)", fontWeight: 500 }, { font: "var(--type-mono-eyebrow)", letterSpacing: "var(--ls-mono-eyebrow)", textTransform: "uppercase" }) }, "Signal"),
            projects.map(function (p) {
              return h("th", { key: p.slug, style: { textAlign: "left", padding: "var(--row-padding)", font: "var(--type-mono-eyebrow)", letterSpacing: "var(--ls-mono-eyebrow)", textTransform: "uppercase", color: "var(--text-body)", fontWeight: 500, whiteSpace: "nowrap" } }, p.name);
            }))),
        h("tbody", null,
          window.SIGNAL_META.map(function (m) {
            return signalRow(m.label, projects.map(function (p) {
              var s = p.signals[m.key];
              var degraded = props.ghDegraded && s.held;
              return h("td", { key: p.slug, style: { padding: "var(--row-padding)", verticalAlign: "top" } },
                h("div", { style: col("4px") },
                  h(Band, { value: degraded ? "Insufficient data" : s.band }),
                  h("span", { style: { font: "var(--type-mono-caption)", letterSpacing: "var(--ls-mono-caption)", color: "var(--text-secondary)" } },
                    degraded ? "Source degraded — no guess rendered" : s.detail)));
            }));
          }),
          signalRow("Fetched", projects.map(function (p) {
            return h("td", { key: p.slug, style: { padding: "var(--row-padding)", font: "var(--type-mono-caption)", letterSpacing: "var(--ls-mono-caption)", color: "var(--text-secondary)" } }, p.signals.updates.fetched);
          })))));
  }

  function eligible(ctx, p) {
    if (!p) return false;
    if (ctx.claimState(p.slug) === "suppressed" || ctx.claimState(p.slug) === "revoked") return false;
    return Object.keys(p.signals).every(function (k) { return p.signals[k].band !== "Insufficient data"; });
  }

  function AlternativesPage(props) {
    var ctx = props.ctx;
    var Note = W("Note"), Held = W("Held"), SectionTitle = W("SectionTitle");
    var subject = window.findProject(ctx.route.slug || ctx.focusSlug) || window.PROJECTS[0];
    var pool = window.PROJECTS.filter(function (p) {
      return p.slug !== subject.slug && p.categories.some(function (c) { return subject.categories.indexOf(c) > -1; });
    });
    var shown = pool.filter(function (p) { return eligible(ctx, p); }).slice(0, 3);
    var withheld = pool.length - shown.length;
    return h(Container, { style: Object.assign({}, PAGE, col("var(--space-3xl)")) },
      pageHeader("Alternatives · /alternatives/" + subject.repo, "Alternatives to " + subject.name,
        "Facts and bands side by side. No conclusion drawn, no score, no verdict — the reader draws the comparison."),
      h(Note, null, "An acquisition surface: reachable from search and from " + subject.name + "’s own page, never a front-door module. Generated from schema v1, server-rendered, indexed."),
      eligible(ctx, subject) && shown.length
        ? h(SignalMatrix, { projects: [subject].concat(shown), ghDegraded: ctx.ghDegraded })
        : h(Held, { refs: "§5.8" }, "Not generated: a pair needs sufficient signal on both sides. With " + subject.name + " below that floor this page does not exist rather than rendering a comparison built on gaps."),
      h("div", { style: col("var(--space-md)") },
        h(SectionTitle, { count: shown.length }, "Pages compared"),
        h("div", { style: { display: "flex", gap: "var(--inline-gap)", flexWrap: "wrap" } },
          [subject].concat(shown).map(function (p) {
            return h(Button, { key: p.slug, variant: "outline", onClick: function () { ctx.go({ name: "project", slug: p.slug }); } }, p.name);
          }))),
      shown.length
        ? h("div", { style: { display: "flex", gap: "var(--inline-gap)", flexWrap: "wrap" } },
            shown.map(function (p) {
              return h(Button, { key: p.slug, variant: "primary", onClick: function () { ctx.go({ name: "compare", slug: subject.slug, id: p.slug }); } }, subject.name + " vs " + p.name);
            }))
        : null,
      withheld > 0
        ? h(Note, null, withheld + " project" + (withheld === 1 ? "" : "s") + " in the same categories are held out of this page — insufficient signal, or a claim state that renders nowhere.")
        : null,
      h(Note, null, "Reserved namespace segment: /alternatives can never collide with /{owner}/{repo}."));
  }

  function ComparePage(props) {
    var ctx = props.ctx;
    var Note = W("Note"), Held = W("Held");
    var a = window.findProject(ctx.route.slug || ctx.focusSlug) || window.PROJECTS[0];
    var b = window.findProject(ctx.route.id) || window.PROJECTS.filter(function (p) { return p.slug !== a.slug && eligible(ctx, p); })[0];
    var ok = eligible(ctx, a) && eligible(ctx, b);
    return h(Container, { style: Object.assign({}, PAGE, col("var(--space-3xl)")) },
      pageHeader("Comparison · /compare/" + a.repo + "/" + (b ? b.repo : "—"),
        a.name + " and " + (b ? b.name : "—"),
        "Two pages, the same five signals, the same fetch dates. Nothing here ranks them."),
      ok ? h(SignalMatrix, { projects: [a, b], ghDegraded: ctx.ghDegraded })
         : h(Held, { refs: "§5.8" }, "Never generated for a pair with insufficient signal on either side."),
      ok ? h("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-lg)" } },
            [a, b].map(function (p) {
              var state = ctx.claimState(p.slug);
              return h("div", { key: p.slug, style: Object.assign({}, CARD, col("var(--space-md)")) },
                h(Eyebrow, null, p.slug),
                h("h2", { style: H2 }, p.name),
                h("p", { style: BODY }, p.description),
                h("div", { style: { display: "flex", gap: "var(--space-xs)", flexWrap: "wrap" } },
                  h(Badge, { mono: true, tone: "outline" }, state === "generated" ? "Unclaimed" : state),
                  p.inferred ? h(Badge, { mono: true, tone: "outline" }, "Vocabulary inferred") : null),
                h(Button, { variant: "outline", onClick: function () { ctx.go({ name: "project", slug: p.slug }); } }, "Open the page"));
            }))
        : null,
      h(Note, null, "No ratings, no composite score, no editorial verdict — a comparison page that drew a conclusion would be a review site with a URL scheme."));
  }

  /* ── Backer settings ──────────────────────────────────────────── */

  function StreamRow(props) {
    return h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--space-lg)", padding: "var(--space-lg) 0", borderTop: "var(--border-level-1)" } },
      h("div", { style: col("4px", { maxWidth: "52ch" }) },
        h("span", { style: { font: "var(--type-body-md-strong)", letterSpacing: "var(--ls-body-md)" } }, props.title),
        h("span", { style: { font: "var(--type-caption)", color: "var(--text-secondary)", textWrap: "pretty" } }, props.body)),
      props.locked
        ? h(Badge, { mono: true, tone: "outline" }, "Never unsubscribable")
        : h("button", {
            onClick: props.onToggle,
            style: { minWidth: "96px", minHeight: "32px", cursor: "pointer", borderRadius: "var(--radius-xs)", border: "1px solid var(--border-input)", background: props.on ? "var(--primary)" : "var(--surface-canvas)", color: props.on ? "var(--on-primary)" : "var(--text-body)", font: "var(--type-mono-button)", letterSpacing: "var(--ls-mono-button)", textTransform: "uppercase" }
          }, props.on ? "On" : "Off"));
  }

  function BackerSettings(props) {
    var ctx = props.ctx;
    var Note = W("Note"), Held = W("Held"), SectionTitle = W("SectionTitle");
    var s = React.useState(false), digest = s[0], setDigest = s[1];
    var s2 = React.useState(true), updates = s2[0], setUpdates = s2[1];
    return h(Container, { style: Object.assign({}, PAGE, col("var(--space-3xl)"), { maxWidth: "820px" }) },
      pageHeader("Settings", "Account and notice channels", "One account, both roles. Nothing here processes money, because nothing in this version does."),
      h("div", { style: col("0") },
        h(SectionTitle, null, "Email streams by consent basis"),
        h(StreamRow, { title: "(a) Transactional and obligation", body: "Verification lapsed, verification restored, page retired, claim revoked, acknowledgements. Delivery-tracked with retry; on persistent failure the obligation surfaces as an in-app pending action.", locked: true }),
        h(StreamRow, { title: "(b) Project updates", body: "Claim outcomes and terminal state changes on projects in your lists.", on: updates, onToggle: function () { setUpdates(!updates); } }),
        h(StreamRow, { title: "(c) Platform — the discovery digest", body: "Your Deck as an email. Off at signup; this is the explicit opt-in, never a pre-ticked box.", on: digest, onToggle: function () { setDigest(!digest); } })),
      digest ? h(Note, null, "Opted in. The digest is this version’s only return-trigger email — and retention is the primary KPI.") : h(Held, { refs: "§9.10" }, "Opted out. A discovery product whose sole return-trigger is off will not retain; the opt-in moment in onboarding is where this is won or lost."),
      h("div", { style: col("var(--space-md)") },
        h(SectionTitle, null, "Data"),
        h("p", { style: BODY }, "Scan manifests and their unmatched entries are not retained beyond the session unless you save them. Matched project references persist as an aggregate count with no scan or account referent."),
        h("div", { style: { display: "flex", gap: "var(--inline-gap)", flexWrap: "wrap" } },
          h(Button, { variant: "outline", onClick: function () { ctx.go({ name: "methodology" }); } }, "Read the data-handling section"),
          h(Button, { variant: "outline", onClick: function () { ctx.go({ name: "backer.onboarding" }); } }, "Redo the preference profile"))),
      h(Note, null, "No billing, no receipts, no subscriptions surface — pay.notavibe.dev does not exist in this version."));
  }

  /* ── prototype rail for surfaces product chrome does not link ──── */

  var RAIL = [
    ["Alternatives", "alternatives"], ["Comparison", "compare"],
    ["Backer onboarding", "backer.onboarding"], ["Activity", "backer.activity"],
    ["Curation chat", "backer.chat"], ["Backer settings", "backer.settings"],
    ["Maintainer profile", "maintainer.profile"], ["Maintainer reach", "maintainer.reach"],
    ["API & webhooks", "maintainer.api"], ["Project settings", "maintainer.settings"]
  ];

  var RAIL_BTN = { border: "1px solid var(--volt-border)", background: "var(--volt-canvas)", color: "var(--volt-text-500)" };
  var RAIL_BTN_ON = { border: "1px solid transparent", background: "var(--volt-emerald)", color: "var(--volt-on-emerald)" };

  function PrototypeRail(props) {
    var ctx = props.ctx;
    return h("div", { style: { borderTop: "1px solid var(--volt-border)", background: "var(--volt-void)", padding: "16px 32px" } },
      h("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" } },
        h("span", { style: { fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--volt-text-600)" } }, "Prototype · surfaces reached from search or from their object"),
        h("div", { style: { display: "flex", gap: "6px", flexWrap: "wrap" } },
          RAIL.map(function (r) {
            var on = ctx.route.name === r[1];
            return h("button", {
              key: r[1],
              onClick: function () { ctx.go({ name: r[1], slug: ctx.focusSlug }); },
              style: Object.assign({ borderRadius: "var(--radius-xs)", padding: "4px 8px", fontFamily: "var(--font-mono)", fontSize: "11px", cursor: "pointer", transition: "var(--motion-base)" }, on ? RAIL_BTN_ON : RAIL_BTN)
            }, r[0]);
          }))));
  }

  /* ── public header ────────────────────────────────────────────── */
  /* Owned here rather than read off window: the design-system bundle re-evaluates
     its own copy of the screen library last, and its header cannot compress below
     ~946px — the CTA fell off the viewport at 768 and 1024. */

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

  function NvPublicHeader(props) {
    var ctx = props.ctx;
    var s = React.useState(window.NvQuery.get()), q = s[0], setQ = s[1];
    React.useEffect(function () { return window.NvQuery.subscribe(setQ); }, []);
    var r = ctx.route;
    /* Real, right-clickable URLs. Mirror the router's hash scheme (index.html
       buildHash) so every nav target is a genuine link — open-in-new-tab, copy
       link and middle-click all work — while onClick still drives the in-page
       SPA nav. aria-current marks the active section programmatically, since the
       colour shift alone is not a signal assistive tech can read. */
    var HREF_FIELDS = ["id", "q", "system", "type"];
    var hrefFor = function (route) {
      if (!route || !route.name) return "#/discover";
      var path = "/" + route.name;
      if (route.slug) path += "/" + route.slug; /* slug may hold slashes; leave raw */
      var qs = HREF_FIELDS
        .filter(function (k) { return route[k] != null && route[k] !== ""; })
        .map(function (k) { return k + "=" + encodeURIComponent(route[k]); });
      return "#" + path + (qs.length ? "?" + qs.join("&") : "");
    };
    var link = function (label, route, active) {
      return h("a", {
        key: label, href: hrefFor(route),
        "aria-current": active ? "page" : undefined,
        onClick: function (e) { e.preventDefault(); ctx.go(route); },
        style: { fontSize: "14px", lineHeight: "20px", fontWeight: 500, color: active ? "var(--volt-text-200)" : "var(--volt-text-500)", whiteSpace: "nowrap", transition: "color var(--motion-base) ease" }
      }, label);
    };
    /* ── Floating glass pill ──────────────────────────────────────────────────
       A capsule inset from the viewport edges rather than an edge-to-edge bar.
       Three zones so the nav can genuinely centre: fixed-width left and right,
       flexible middle. Glass = translucent surface-2 + backdrop blur + a
       hairline; no shadow, per HashiCorp's "no drop shadows on dark".

       Two scroll thresholds rather than one:
       · scrolled  (> 24px)            narrows the capsule
       · pastHero  (hero edge cleared) swaps the centre zone — the nav links give
         way to the search field, because the hero's big field has just left the
         screen and the catalog should never be more than one input away. The
         links fold into a burger.

       Departure worth naming: HashiCorp's own nav is a flat full-bleed bar and
       its pill radius is scoped to small chips. The capsule is the reference's
       shape, not the design system's. */
    var sc = React.useState(false), scrolled = sc[0], setScrolled = sc[1];
    var ph = React.useState(false), pastHero = ph[0], setPastHero = ph[1];
    var mo = React.useState(false), menuOpen = mo[0], setMenuOpen = mo[1];

    /* Narrow viewport: below this width the three inline nav links no longer
       fit beside the wordmark and the sign-in link, so they collide (the
       wordmark and "Discover" overprint, and "Sign in" runs off the capsule).
       A matchMedia flag — the same shape as the scroll listener above — folds
       the links into the burger and shows the search field instead, so the pill
       always reflows to wordmark · search · burger · sign-in. */
    /* Seeded from the media query at first render, not defaulted to false, so a
       phone-width mount paints the compact pill directly. Defaulting to false
       flashed the desktop nav for one frame before the effect corrected it —
       and at phone width that frame is the broken overlap this flag exists to
       prevent. */
    var nw = React.useState(function () {
      return !!(window.matchMedia && window.matchMedia("(max-width: 760px)").matches);
    }), narrow = nw[0], setNarrow = nw[1];
    React.useEffect(function () {
      if (!window.matchMedia) return;
      var mq = window.matchMedia("(max-width: 760px)");
      var on = function () { setNarrow(mq.matches); };
      on();
      if (mq.addEventListener) mq.addEventListener("change", on);
      else mq.addListener(on);
      return function () {
        if (mq.removeEventListener) mq.removeEventListener("change", on);
        else mq.removeListener(on);
      };
    }, []);

    React.useEffect(function () {
      var onScroll = function () {
        var y = window.scrollY
          || (document.scrollingElement && document.scrollingElement.scrollTop)
          || 0;
        setScrolled(y > 24);
        /* Swap the moment the hero's own search field clears the header, not
           when the whole 90dvh block ends — the two searches are the same field,
           so the header takes over the instant the hero one scrolls under the
           pill. Measured off the field itself (tagged data-hero-search); the
           hero section is the fallback for any surface without one.
           Guarded on height: this runs once on mount, before layout, and an
           unlaid-out rect reports bottom ≈ 0 — which satisfies the test and
           latches the swapped state on at the top of the page. */
        var field = document.querySelector("[data-hero-search]");
        var box = field ? field.getBoundingClientRect()
          : (function () { var h = document.querySelector("main section"); return h ? h.getBoundingClientRect() : null; })();
        setPastHero(box && box.height > 20 ? box.bottom <= 76 : y > 320);
      };
      onScroll();
      /* one more read after layout has settled, for the same reason */
      var settle = requestAnimationFrame(onScroll);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      return function () {
        cancelAnimationFrame(settle);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }, []);

    /* The search field appears on every surface but the front-door hero: other
       screens own it from the top, while the front door reveals it only once the
       hero's own field has scrolled away (pastHero). This holds at every width —
       on a narrow front door the header is just the emblem and the burger until
       that point, so the hero field stays the primary one. */
    var showSearch = r.name !== "discover" || pastHero;

    /* The search RESULTS page is search-first: there the field claims the whole
       centre and the section links fold into the burger, rather than sitting
       inline beside it. Every other surface keeps nav + search co-visible. */
    var searchDominant = r.name === "search";

    /* The burger holds the nav on narrow viewports, and on the search page at any
       width — that surface gives the field the whole centre, so the section links
       live in the menu. Every other desktop surface shows the nav inline. */
    var burgerVisible = narrow || searchDominant;

    /* the menu cannot outlive the control that opens it */
    React.useEffect(function () { if (!burgerVisible) setMenuOpen(false); }, [burgerVisible]);
    React.useEffect(function () { setMenuOpen(false); }, [r.name]);
    React.useEffect(function () {
      if (!menuOpen) return;
      var onKey = function (e) { if (e.key === "Escape") setMenuOpen(false); };
      document.addEventListener("keydown", onKey);
      return function () { document.removeEventListener("keydown", onKey); };
    }, [menuOpen]);

    var PILL = {
      display: "flex", alignItems: "center", gap: "12px 20px",
      minHeight: scrolled ? "52px" : "60px",
      padding: scrolled ? "6px 10px 6px 20px" : "8px 12px 8px 24px",
      borderRadius: "var(--radius-pill, 9999px)",
      /* denser glass once there is content behind it to sit against */
      background: "color-mix(in srgb, var(--volt-surface) " + (scrolled ? "80%" : "62%") + ", transparent)",
      backdropFilter: "blur(16px) saturate(150%)",
      WebkitBackdropFilter: "blur(16px) saturate(150%)",
      border: "1px solid color-mix(in srgb, var(--volt-border-hover) 55%, transparent)",
      boxSizing: "border-box",
      /* ease-out so the shrink begins immediately on scroll (see the wrapper's
         max-width note); same duration as the wrapper so they move as one. */
      transition: "min-height var(--motion-base) var(--ease-out), padding var(--motion-base) var(--ease-out), background-color var(--motion-base) var(--ease-out)"
    };
    /* Left and right zones both flex:1 so they claim equal width — that is what
       actually centres the middle. With only the middle flexing it centres in
       the leftover space and lands off-axis.
       NO minWidth:0 here (unlike the centre): the sides must keep their
       automatic min-content floor so a wide centre can never shrink a side zone
       BELOW its own content — which let the account button ("My workspace")
       overflow its zone and print over the search. The centre is the one that
       yields; its search field carries minWidth:0. */
    var ZONE = { display: "flex", alignItems: "center", gap: "12px", flex: "1 1 0" };

    /* One source for both the inline row and the burger panel, so they can never
       drift apart. D10: Ship Week shares the band's gate — no link to an empty hub. */
    /* The highest-utility developer action — audit the maintenance health of the
       dependencies you already ship — promoted out of the Discover ModStack
       module into a permanent slot. Editorial and Methodology were removed from
       the nav: Editorial is already surfaced by ModEditorial on Discover and
       publishes only monthly, and Methodology is a read-once trust page better
       reached from a contextual "how is this ranked?" link and the footer. Both
       routes still exist (#/editorial, #/methodology) — this is a one-line
       restore if either earns a slot back. */
    var NAV = [
      { label: "Discover", route: { name: "discover" }, on: r.name === "discover" || r.name === "category" },
      { label: "Scan your stack", route: { name: "stack.connect" }, on: r.name === "stack.connect" || r.name === "stack.results" },
      (window.NvShipWeekLive && window.NvShipWeekLive(ctx))
        ? { label: "Ship Week", route: { name: "shipweek" }, on: r.name === "shipweek" }
        : null
    ].filter(Boolean);

    var searchField = h("form", {
      onSubmit: function (e) { e.preventDefault(); ctx.go({ name: "search", q: q }); },
      style: { display: "flex", alignItems: "center", flex: "1 1 auto", minWidth: 0 }
    },
      h("input", {
        value: q,
        onChange: function (e) { window.NvQuery.set(e.target.value); },
        placeholder: "Search name or description",
        "aria-label": "Search the catalog",
        style: { width: "100%", minWidth: 0, background: "color-mix(in srgb, var(--volt-void) 45%, transparent)", color: "var(--volt-text-200)", border: "1px solid var(--volt-border)", borderRadius: "var(--radius-pill, 9999px)", padding: "9px 18px", fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: "20px", outline: "none" }
      }));

    /* Burger and close are one element, not two icons: the bars rotate into the
       X so the control reads as the same object changing state rather than being
       swapped out from under the cursor. */
    var BAR = {
      position: "absolute", left: "10px", width: "16px", height: "1.5px",
      background: "var(--volt-text-200)", borderRadius: "1px",
      transition: "transform var(--motion-base) ease, top var(--motion-base) ease, opacity var(--motion-fast, 150ms) ease"
    };
    var burger = h("button", {
      type: "button",
      "aria-label": menuOpen ? "Close menu" : "Open menu",
      "aria-expanded": menuOpen ? "true" : "false",
      "aria-controls": "nv-menu",
      onClick: function () { setMenuOpen(!menuOpen); },
      style: { position: "relative", width: "36px", height: "36px", flexShrink: 0, background: "transparent", border: "none", padding: 0, cursor: "pointer" }
    },
      h("span", { key: "t", style: Object.assign({}, BAR, { top: menuOpen ? "17px" : "12px", transform: menuOpen ? "rotate(45deg)" : "none" }) }),
      h("span", { key: "m", style: Object.assign({}, BAR, { top: "17px", opacity: menuOpen ? 0 : 1 }) }),
      h("span", { key: "b", style: Object.assign({}, BAR, { top: menuOpen ? "17px" : "22px", transform: menuOpen ? "rotate(-45deg)" : "none" }) }));

    var EASE_OUT = "cubic-bezier(0.2, 0.9, 0.2, 1)";

    /* ONE persistent desktop layout for all three states — nav-only, nav+search
       co-visible, and search-first — so moving between them ANIMATES rather than
       swapping subtrees. The nav, the search and the burger stay mounted across
       every state; only their width/opacity/margin transition. Keeping the search
       node mounted is also what lets the field hold its focus and value as it
       widens on the way into the search page. Spacing is carried by each item's
       own collapsing margin (not a flex gap), so a collapsed item leaves no
       phantom space behind it. */
    var inlineNav = h("nav", {
      "aria-label": "Sections",
      "aria-hidden": searchDominant ? "true" : "false",
      style: {
        display: "flex", alignItems: "center", gap: "8px 24px",
        flexShrink: 0, overflow: "hidden",
        maxWidth: searchDominant ? "0px" : "360px",
        marginRight: (showSearch && !searchDominant) ? "20px" : "0px",
        opacity: searchDominant ? 0 : 1,
        pointerEvents: searchDominant ? "none" : "auto",
        transition: "max-width 320ms " + EASE_OUT + ", margin-right 320ms " + EASE_OUT + ", opacity 220ms ease"
      }
    }, NAV.map(function (m) { return link(m.label, m.route, m.on); }));

    /* Search width has three stops: closed (0), co-visible, and search-first
       (wider). It GROWS to fill the centre up to a cap and, crucially, SHRINKS
       below that cap (flex-shrink 1 + min-width 0) when the pill narrows on
       scroll. A fixed width here overflowed the centre zone and spilled left over
       the wordmark once the scrolled pill got narrow enough. opacity holds at 1
       whenever it is open, so widening between stops never flashes the field. */
    var searchReveal = h("div", {
      style: {
        flex: showSearch ? "1 1 auto" : "0 1 0px",
        maxWidth: showSearch ? (searchDominant ? "640px" : "340px") : "0px",
        opacity: showSearch ? 1 : 0,
        minWidth: 0, overflow: "hidden",
        transition: "max-width 340ms " + EASE_OUT + ", flex-basis 340ms " + EASE_OUT + ", opacity 240ms ease " + (showSearch ? "80ms" : "0ms")
      }
    }, searchField);

    /* The burger only earns space on the search page; elsewhere on desktop it
       collapses to zero width and fades out instead of popping in and out. */
    var burgerSlot = h("div", {
      "aria-hidden": searchDominant ? "false" : "true",
      style: {
        width: searchDominant ? "36px" : "0px",
        marginLeft: searchDominant ? "8px" : "0px",
        opacity: searchDominant ? 1 : 0,
        flexShrink: 0, overflow: "hidden",
        pointerEvents: searchDominant ? "auto" : "none",
        transition: "width 300ms " + EASE_OUT + ", margin-left 300ms " + EASE_OUT + ", opacity 200ms ease"
      }
    }, burger);

    var centre = h("div", {
      /* nav + search (+ burger on the search page) centred as one cluster. flex 3
         so the zone claims width over the equal sides, keeping it on axis. */
      style: { display: "flex", alignItems: "center", justifyContent: "center", flex: "3 1 auto", minWidth: 0, maxWidth: "760px", height: "40px" }
    }, inlineNav, searchReveal, burgerSlot);


    /* The account action (workspace / sign-in). D11: auth is action-scoped (§7),
       and account_created is step two of §10.3's funnel — so sign-in is a quiet
       escape hatch for returning visitors, never the loudest element on a page
       Raj hasn't read yet. */
    var goAccount = function () {
      if (ctx.signedIn) ctx.go({ name: "backer.dashboard" });
      else ctx.go({ name: "signin", next: ctx.route });
    };
    var accountLabel = ctx.signedIn ? "My workspace" : "Sign in";
    /* signin carries a transient `next` the router deliberately drops, so its
       href is just the bare route — honest and still right-clickable. */
    var accountHref = hrefFor(ctx.signedIn ? { name: "backer.dashboard" } : { name: "signin" });

    /* On a normal-width pill it stays put in the right zone — desktop has the
       room, and the account action is worth a permanent slot. It folds into the
       burger only on a narrow viewport, where the three inline controls would
       otherwise collide (this is the same 760px break the nav links fold at). */
    var right = h("div", { style: Object.assign({}, ZONE, { justifyContent: "flex-end" }) },
      narrow ? null : (ctx.signedIn
        ? h(Button, { variant: "outline", size: "sm", onClick: goAccount, style: { whiteSpace: "nowrap", flexShrink: 0 } }, accountLabel)
        : h("a", {
            href: accountHref,
            onClick: function (e) { e.preventDefault(); goAccount(); },
            style: { fontSize: "14px", lineHeight: "20px", fontWeight: 500, color: "var(--volt-text-200)", whiteSpace: "nowrap", flexShrink: 0, padding: "0 4px" }
          }, "Sign in")));

    /* Panel drops under the capsule. Items are revealed bottom-up in sequence:
       the delay is keyed to the REVERSE index, so the last item leads and the
       reveal travels upward, each link rising into place from below. Closing
       runs every delay at 0 so it collapses at once rather than unwinding. */
    var panel = !burgerVisible ? null : h("nav", {
      id: "nv-menu",
      "aria-label": "Sections",
      style: {
        marginTop: "8px", padding: "10px",
        borderRadius: "22px",
        background: "color-mix(in srgb, var(--volt-surface) 88%, transparent)",
        backdropFilter: "blur(18px) saturate(150%)",
        WebkitBackdropFilter: "blur(18px) saturate(150%)",
        border: "1px solid color-mix(in srgb, var(--volt-border-hover) 55%, transparent)",
        display: "flex", flexDirection: "column", gap: "2px",
        boxSizing: "border-box",
        opacity: menuOpen ? 1 : 0,
        transform: menuOpen ? "translateY(0)" : "translateY(-6px)",
        pointerEvents: menuOpen ? "auto" : "none",
        transition: "opacity var(--motion-base) ease, transform var(--motion-base) ease"
      }
    }, (function () {
      /* Reverse-index reveal: the last item leads and the wave travels upward.
         When the account item is appended (narrow only) it takes the leading
         delay-0 slot, so the section links shift up by one. */
      var items = NAV.map(function (m, i) {
        var base = narrow ? (NAV.length - i) : (NAV.length - 1 - i);
        var delay = menuOpen ? base * 65 : 0;
        return h("a", {
          key: m.label, href: hrefFor(m.route),
          "aria-current": m.on ? "page" : undefined,
          onClick: function (e) { e.preventDefault(); setMenuOpen(false); ctx.go(m.route); },
          style: {
            display: "block", padding: "13px 16px", borderRadius: "12px",
            fontSize: "16px", lineHeight: "22px", fontWeight: 500,
            color: m.on ? "var(--volt-text-200)" : "var(--volt-text-500)",
            textDecoration: "none",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 240ms ease " + delay + "ms, transform 320ms cubic-bezier(0.2,0.9,0.2,1) " + delay + "ms"
          }
        }, m.label);
      });
      /* The account action only lives in the menu on a narrow viewport; on
         desktop it keeps its permanent slot in the right zone, so the menu stays
         sections-only there. Set off by a hairline, bottom-most so it leads the
         reveal and is the closest tap target to the burger that opened it. */
      if (narrow) items.push(h("a", {
        key: "__account", href: accountHref,
        onClick: function (e) { e.preventDefault(); setMenuOpen(false); goAccount(); },
        style: {
          display: "block", padding: "13px 16px", margin: "4px 6px 2px", borderRadius: "12px",
          borderTop: "1px solid color-mix(in srgb, var(--volt-border-hover) 45%, transparent)",
          fontSize: "16px", lineHeight: "22px", fontWeight: 600,
          color: "var(--volt-emerald-deep)", textDecoration: "none",
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 240ms ease 0ms, transform 320ms cubic-bezier(0.2,0.9,0.2,1) 0ms"
        }
      }, accountLabel));
      return items;
    })());

    var emblem = h("a", {
      href: hrefFor({ name: "discover" }),
      "aria-label": "notavibe home",
      onClick: function (e) { e.preventDefault(); ctx.go({ name: "discover" }); },
      style: { display: "inline-flex", flexShrink: 0 }
    }, h(window.NvWordmark, { size: 18, symbolOnly: narrow }));

    /* Narrow layout: one row — emblem, a flexible search that fills the gap
       between it and the burger, and the burger pinned right. The search is kept
       mounted but faded out until showSearch, so the front-door hero keeps its
       own field and the query value survives the reveal. Desktop is untouched:
       the three-zone layout with the account action in the right zone. */
    var pillLeft = narrow
      ? h("div", { style: { display: "flex", alignItems: "center", flexShrink: 0 } }, emblem)
      : h("div", { style: ZONE }, emblem);
    var pillCentre = narrow
      ? h("div", {
          style: {
            flex: "1 1 auto", minWidth: 0, display: "flex", alignItems: "center",
            opacity: showSearch ? 1 : 0,
            transform: showSearch ? "translateY(0)" : "translateY(6px)",
            pointerEvents: showSearch ? "auto" : "none",
            transition: "opacity 240ms ease, transform 300ms " + EASE_OUT
          }
        }, searchField)
      : centre;
    var pillRight = narrow
      ? h("div", { style: { display: "flex", alignItems: "center", flexShrink: 0 } }, burger)
      : right;

    return h("header", { style: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 30, padding: "16px 16px 0", background: "transparent", pointerEvents: "none" } },
      h("div", {
        style: {
          maxWidth: scrolled ? "880px" : "1280px",
          margin: "0 auto",
          pointerEvents: "auto",
          /* ease-out, not ease: `ease` eases *in*, so the capsule barely moved
             for the first ~150ms after you crossed the scroll threshold — which
             read as "the header doesn't shrink right away". ease-out starts at
             full velocity, so the narrow begins the instant `scrolled` flips.
             Matched to the pill's --motion-base so width and padding settle
             together instead of the pill finishing while the width still glides. */
          transition: "max-width var(--motion-base) var(--ease-out)"
        }
      },
        h("div", { style: PILL }, pillLeft, pillCentre, pillRight),
        panel));
  }

  /* ── router ───────────────────────────────────────────────────── */

  function screenFor(name) {
    var NV = { discover: "NvDiscover", project: "NvProjectPage", category: "NvCategory", search: "NvSearch" };
    if (NV[name] && window[NV[name]]) return window[NV[name]];
    /* Resolve the overridden Backer surfaces from local scope, never off window:
       the design-system bundle re-evaluates its copy of the screen library late
       and clobbers window.BackerDashboard back to the compiled dashboard (same
       reason NvPublicHeader is owned here — see the header note above). These are
       hoisted function declarations, so the reference is safe before definition. */
    if (name === "backer.dashboard") return BackerHome;
    if (name === "backer.more") return BackerMore;
    if (name === "stack.connect") return StackConnectV2;
    if (name === "stack.results") return ScanResultsV2;
    var T = {
      discover: "Discover", category: "CategoryView", search: "SearchResults", project: "ProjectPage",
      methodology: "MethodologyPage", "list.public": "PublicListPage", "stack.public": "PublicStackPage",
      editorial: "EditorialSurface", shipweek: "ShipWeekHub", alternatives: "AlternativesPage", compare: "ComparePage",
      "stack.connect": "StackConnect", "stack.results": "ScanResults", "stack.publish": "PublishInterstitial",
      "claim.start": "ClaimFlow", "suppress.start": "SuppressionFlow", signin: "SignInInterstitial",
      "action.save": "SaveToList", "action.interest": "RegisterInterest", "action.nominate": "Nominate",
      "backer.dashboard": "BackerDashboard", "backer.lists": "MyLists", "backer.list": "ListDetail",
      "backer.activity": "BackerActivity", "backer.chat": "CurationChat", "backer.onboarding": "BackerOnboarding",
      "backer.settings": "BackerSettings", "backer.more": "BackerMore",
      "maintainer.dashboard": "MaintainerDashboard", "maintainer.profile": "MaintainerProfile",
      "maintainer.reach": "MaintainerReach", "maintainer.contest": "MaintainerContest",
      "maintainer.api": "MaintainerApi", "maintainer.settings": "MaintainerSettings"
    };
    if (name.indexOf("admin.") === 0) return window.AdminScreen;
    return window[T[name] || "Discover"] || window.Discover;
  }

  var APP_ROUTES = /^(backer\.|maintainer\.|stack\.(connect|results|publish))/;

  function NotavibeShell(props) {
    var ctx = props.ctx;
    window.__ctx = ctx; /* QA handle: drive routes from the console */
    var name = ctx.route.name;
    var Screen = screenFor(name);
    var isAdmin = name.indexOf("admin.") === 0;
    /* Signed-in Backers keep their workspace chrome while browsing: the discovery
       surfaces render inside the app shell (sidebar persists) rather than swapping
       to the public marketing shell. Logged-out visitors still get the public
       front door. (Deliberate deviation from §572's top-nav — see ADR.) */
    var backerDiscovery = ctx.signedIn && /^(discover|category|search|project)$/.test(name);
    var isApp = APP_ROUTES.test(name) || backerDiscovery;

    if (ctx.mobile) {
      return h(React.Fragment, null,
        h(window.MobileShell, { ctx: ctx, Screen: Screen }),
        h(window.PrototypeBar, { ctx: ctx }));
    }

    var body;
    if (isAdmin) {
      body = h("div", { className: "nv-app-shell", style: { display: "flex", minHeight: "100vh", background: "var(--surface-canvas)" } },
        h(window.AdminNav, { ctx: ctx }),
        h("main", { style: { flex: 1, minWidth: 0, display: "flex" } }, h(Screen, { ctx: ctx })));
    } else if (isApp) {
      body = h("div", { className: "nv-app-shell", style: { display: "flex", minHeight: "100vh", background: "var(--surface-canvas)" } },
        h(window.AppNav, { ctx: ctx, kind: name.indexOf("maintainer.") === 0 ? "maintainer" : "backer" }),
        h("main", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column" } },
          h("div", { style: { flex: 1 } }, h(Screen, { ctx: ctx })),
          h(PrototypeRail, { ctx: ctx })));
    } else {
      body = h("div", { style: { minHeight: "100vh", background: "var(--volt-void)", display: "flex", flexDirection: "column" } },
        h(NvPublicHeader, { ctx: ctx }),
        /* The header is fixed, so it reserves no space. The front door wants that
           — its hero runs to the viewport top and the glass sits on the gradient.
           Every other surface opens with a plain page header, so it needs the
           76px (16px inset + 60px capsule) back or its first line hides behind
           the bar. */
        h("main", {
          style: { flex: 1, paddingTop: name === "discover" ? 0 : "76px" }
        }, h(Screen, { ctx: ctx })),
        h(PrototypeRail, { ctx: ctx }),
        h(DS.FooterWordmark, null, "notavibe"));
    }
    return h(React.Fragment, null, body, h(window.PrototypeBar, { ctx: ctx }));
  }

  /* ── Backer Home ──────────────────────────────────────────────────────────
     Overrides the compiled BackerDashboard. The signed-in Backer landing is a
     "since you were here" return surface — the on-site twin of the discovery
     digest — not a stats dashboard. Composition (ADR-grounded, §9.6): context +
     last-visit → outcomes (open badge → recent, deadline-ascending) → Deck delta
     POINTER (never the grid; the Deck lives on Discover) → thin demoted stats.
     Fresh accounts (no saved projects, no interests) get the designed first-visit
     face instead: finish the profile, the Deck is ready. All figures illustrative
     until a backend exists. Route id stays backer.dashboard, relabelled "Home". */
  function BackerHome(props) {
    var ctx = props.ctx;
    var SectionTitle = W("SectionTitle"), Note = W("Note");
    var acts = (window.ACTIVITY || []).filter(function (a) { return a.when !== "—"; });
    var savedCount = ctx.lists.reduce(function (n, l) { return n + l.items.length; }, 0);
    var interests = ctx.interests.length;
    var inStack = ctx.scan ? ctx.scan.matched.length : 0;
    var fresh = savedCount === 0 && interests === 0;
    /* A focused reading column with real hierarchy. The return surface is scanned
       top-to-bottom, so a ~680px measure and generous vertical rhythm keep it
       calm. The outcomes render as a timeline spine (the signature moment), the
       Deck is a considered emerald CTA, and motion is custom-eased (see CSS). */
    var wrap = { maxWidth: "680px", width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-2xl)", padding: "var(--space-section) var(--space-2xl)" };
    var caption = { font: "var(--type-caption)", color: "var(--text-secondary)" };
    var eyebrow = { font: "var(--type-mono-label)", letterSpacing: "var(--ls-mono-label)", textTransform: "uppercase", color: "var(--volt-text-500)" };

    var header = h("header", { style: col("var(--space-sm)") },
      h("span", { style: eyebrow }, ctx.signedIn ? "Backer · Raj" : "Backer"),
      h("h1", { style: { margin: 0, font: "var(--type-display-lg)", letterSpacing: "var(--ls-display-lg)", textWrap: "balance" } }, fresh ? "Welcome to your Deck" : "Your week"),
      h("span", { style: caption }, fresh ? "Your first week of discovery starts here." : "Last visit 6 days ago · illustrative data"));

    /* Deck HERO — the ONE section every backer always has: it refreshes weekly
       regardless of what they've done, and it's the on-site twin of the return
       digest. So it leads. An emerald spine marks it the primary action; the
       border warms and the arrow advances on hover. (Outcomes, by contrast, are
       contribution-contingent — see the adaptive block below.) */
    var deck = h("button", {
        className: "nv-deck-cta", type: "button",
        onClick: function () { ctx.go({ name: "discover" }); },
        style: { position: "relative", overflow: "hidden", textAlign: "left", cursor: "pointer", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--space-lg)", flexWrap: "wrap", border: "1px solid var(--volt-border)", background: "var(--volt-surface)", borderRadius: "12px", padding: "var(--space-2xl)" }
      },
      h("span", { "aria-hidden": "true", style: { position: "absolute", left: 0, top: "16px", bottom: "16px", width: "3px", borderRadius: "0 3px 3px 0", background: "var(--volt-emerald)" } }),
      h("div", { style: col("6px", { paddingLeft: "var(--space-sm)" }) },
        h("span", { style: Object.assign({}, eyebrow, { color: "var(--volt-emerald)" }) }, "Your Deck"),
        h("span", { style: { font: "var(--type-body-lg-strong)", letterSpacing: "var(--ls-body-lg)" } }, fresh ? "Ready when you are" : "5 new picks this week"),
        h("span", { style: caption }, "8–12 projects from your preference profile · illustrative data")),
      h("span", { style: { display: "inline-flex", alignItems: "center", gap: "8px", font: "var(--type-body-md-strong)", letterSpacing: "var(--ls-body-md)", color: "var(--volt-emerald)", whiteSpace: "nowrap" } },
        "Open Discover", h("span", { className: "nv-arrow" }, "→")));

    var CARD = { border: "1px solid var(--volt-border)", background: "var(--volt-surface)", borderRadius: "12px" };
    var dashed = { border: "1px dashed var(--volt-border)", borderRadius: "12px", padding: "var(--space-2xl)" };

    if (fresh) {
      return h("div", { style: wrap },
        header,
        deck,
        h("div", { style: Object.assign({}, dashed, col("var(--space-md)")) },
          h("span", { style: eyebrow }, "Finish setup"),
          h("span", { style: BODY }, "Your Deck sharpens as you tell it what you care about — the preference profile is the one step that makes the weekly digest worth returning for."),
          h("div", { style: { display: "flex", gap: "var(--inline-gap)", flexWrap: "wrap" } },
            h(Button, { variant: "primary", onClick: function () { ctx.go({ name: "backer.onboarding" }); } }, "Finish your preference profile"),
            h(Button, { variant: "ghost", onClick: function () { ctx.go({ name: "backer.settings" }); } }, "Turn on the digest"))));
    }

    var top = acts.slice(0, 4);
    var hasOutcomes = top.length > 0;
    /* Outcomes grouped in a card (Gestalt common-region), threaded on a timeline
       spine: one hairline behind the nodes, each dot ring-punched in the card
       colour. The feed is read-only, so rows carry NO hover affordance — hover
       feedback would imply a click that does not exist. */
    var timeline = h("div", { style: { position: "relative" } },
      h("span", { "aria-hidden": "true", style: { position: "absolute", left: "4px", top: "16px", bottom: "16px", width: "1px", background: "var(--volt-border)" } }),
      top.map(function (a, i) {
        var neg = a.valence === "Negative";
        return h("div", { key: i, style: { position: "relative", display: "flex", gap: "var(--space-lg)", alignItems: "flex-start", padding: "var(--space-md) 0" } },
          h("span", { style: { flex: "0 0 9px", height: "9px", marginTop: "5px", borderRadius: "50%", background: neg ? "var(--volt-text-500)" : "var(--volt-emerald)", boxShadow: "0 0 0 4px var(--volt-surface)" } }),
          h("div", { style: col("3px", { minWidth: 0 }) },
            h("span", { style: { font: "var(--type-body-md)", letterSpacing: "var(--ls-body-md)", textWrap: "pretty" } }, a.text),
            h("span", { style: caption }, a.type + " · " + a.when)));
      }));

    var outcomes = h("section", { style: Object.assign({}, CARD, col("var(--space-lg)", { padding: "var(--space-2xl)" })) },
      h("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--space-md)" } },
        h("span", { style: eyebrow }, "Recent outcomes"),
        h("span", { style: Object.assign({}, eyebrow, { color: "var(--volt-emerald)" }) }, top.length + " new")),
      timeline,
      h("div", { style: { borderTop: "1px solid var(--volt-border)", paddingTop: "var(--space-md)" } },
        h("button", { className: "nv-home-seeall", type: "button", onClick: function () { ctx.go({ name: "backer.activity" }); },
          /* colour lives in the CSS class, NOT inline — the global escape-hatch
             rule button[style*="var(--volt-emerald)"] would hijack it otherwise. */
          style: { display: "inline-flex", alignItems: "center", gap: "6px", WebkitAppearance: "none", appearance: "none", background: "transparent", border: "none", cursor: "pointer", padding: "2px 0", font: "var(--type-body-md-strong)", letterSpacing: "var(--ls-body-md)" } },
          "See all activity", h("span", { className: "nv-arrow" }, "→"))));

    /* Adaptive low state. Outcomes are earned — they only exist once the backer
       nominates, publishes, registers or claims. With none, an empty card reads
       as a broken promise, so we show a teaching nudge instead: what to do to
       start seeing them. This also doubles as onboarding for passive backers. */
    var nudge = h("div", { style: Object.assign({}, dashed, { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--space-lg)", flexWrap: "wrap" }) },
      h("div", { style: col("2px", { minWidth: 0 }) },
        h("span", { style: { font: "var(--type-body-md-strong)", letterSpacing: "var(--ls-body-md)" } }, "No outcomes yet"),
        h("span", { style: caption }, "Nominate a project or publish a list — that's where they show up.")),
      h(Button, { variant: "outline", onClick: function () { ctx.go({ name: "discover" }); } }, "Explore projects"));

    /* Demoted to a single quiet meta line, sitting outside the cards. */
    var stats = h("div", { style: { display: "flex", justifyContent: "space-between", gap: "var(--space-md)", flexWrap: "wrap", padding: "0 var(--space-xs)" } },
      h("span", { style: caption }, savedCount + " in lists · " + interests + " interests · " + inStack + " in your stack"),
      h("span", { style: caption }, "illustrative data"));

    return h("div", { style: wrap }, header, deck, hasOutcomes ? outcomes : nudge, stats);
  }

  /* ── Backer "More" (mobile overflow) ──────────────────────────────────────
     The fifth mobile tab. Home took the first tab and Activity folded into it, so
     More is the overflow index for secondary destinations + the role switch (the
     desktop switcher lives in the sidebar footer, which is hidden on the phone). */
  function BackerMore(props) {
    var ctx = props.ctx;
    var SectionTitle = W("SectionTitle"), Note = W("Note");
    var rows = [
      ["Activity", "Your outcomes — nominations, claims, saves", "backer.activity"],
      ["Curation chat", "Build a list by describing what you want", "backer.chat"],
      ["Settings", "Account and notice channels", "backer.settings"]
    ];
    return h("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-lg)", padding: "var(--space-lg)" } },
      rows.map(function (r) {
        return h("button", { key: r[2], onClick: function () { ctx.go({ name: r[2] }); },
          style: { textAlign: "left", cursor: "pointer", background: "var(--surface-canvas)", border: "var(--border-level-1)", borderRadius: "var(--radius-sm)", padding: "var(--space-lg)", display: "flex", flexDirection: "column", gap: "2px" } },
          h("span", { style: { font: "var(--type-body-md-strong)", letterSpacing: "var(--ls-body-md)" } }, r[0]),
          h("span", { style: { font: "var(--type-caption)", color: "var(--text-secondary)" } }, r[1]));
      }),
      ctx.signedIn ? h("div", { style: { borderTop: "var(--border-level-1)", paddingTop: "var(--space-lg)", display: "flex", flexDirection: "column", gap: "var(--space-sm)" } },
        h(SectionTitle, null, "Role"),
        h(Button, { variant: "outline", onClick: function () { ctx.go({ name: "maintainer.dashboard" }); } }, "Switch to maintainer"),
        h(Note, null, "Shown because this account holds a maintainer grant — a Backer who has claimed a page. Single-role backers see no switcher; last-used context returns on login.")) : null);
  }

  /* ── My stack — scan results (overrides the compiled ScanResults) ──────────
     Signal-led, two-section results per the grill. "In the catalog": matched
     deps, each led by a banded health signal (§171 — bands only, never a verdict),
     with Save-to-list / Register-interest. "Not in the catalog yet": the unmatched
     entries (derived from the manifest — the §373 Nominate surface, hidden before).
     Ephemeral: source + retention stated; nothing here is a stored artifact. */
  function parseManifestDeps(txt) {
    try {
      var m = JSON.parse(txt), out = [];
      ["dependencies", "devDependencies", "peerDependencies"].forEach(function (k) {
        if (m[k]) out = out.concat(Object.keys(m[k]));
      });
      return out;
    } catch (e) { return []; }
  }
  function matchDep(dep) {
    return window.PROJECTS.find(function (p) {
      return p.name === dep || p.slug === dep || p.slug.split("/").pop() === dep;
    });
  }

  var SCAN_TARGETS_V2 = [
    { id: "gh-pub", provider: "GitHub", repo: "raj/oss-dashboard", visibility: "public", publishable: true },
    { id: "gh-priv", provider: "GitHub", repo: "raj/client-billing", visibility: "private", publishable: false },
    { id: "gl-pub", provider: "GitLab", repo: "raj/pipeline-tools", visibility: "public", publishable: true }
  ];

  /* ── My stack — connect & scan entry (overrides compiled StackConnect) ──────
     Two paths to a Scan: connect a provider repository (read-minimal OAuth) or
     paste a manifest. Consent-gated, retention stated. Card system consistent with
     the results screen. Selected-repo highlight lives in the .nv-target CSS class,
     never inline, so it dodges the emerald escape-hatch rule. */
  function StackConnectV2(props) {
    var ctx = props.ctx;
    var Note = W("Note");
    var caption = { font: "var(--type-caption)", color: "var(--text-secondary)" };
    var eyebrow = { font: "var(--type-mono-label)", letterSpacing: "var(--ls-mono-label)", textTransform: "uppercase", color: "var(--volt-text-500)" };
    var metaMono = { font: "var(--type-mono-caption)", letterSpacing: "var(--ls-mono-caption)", textTransform: "uppercase", color: "var(--text-secondary)" };
    var CARD = { border: "1px solid var(--volt-border)", background: "var(--volt-surface)", borderRadius: "12px", padding: "var(--space-2xl)" };

    var s0 = React.useState("oauth"), mode = s0[0], setMode = s0[1];
    var s1 = React.useState(""), manifest = s1[0], setManifest = s1[1];
    var s2 = React.useState(false), consent = s2[0], setConsent = s2[1];
    var s3 = React.useState(SCAN_TARGETS_V2[0].id), target = s3[0], setTarget = s3[1];
    var chosen = SCAN_TARGETS_V2.filter(function (t) { return t.id === target; })[0];

    var run = function () {
      var source = mode === "oauth"
        ? { kind: "repo", provider: chosen.provider, repo: chosen.repo, visibility: chosen.visibility, publishable: chosen.publishable }
        : { kind: "manifest", provider: "Pasted manifest", repo: null, visibility: "not applicable", publishable: false };
      ctx.runScan(source, mode === "oauth" ? window.MANIFEST_SAMPLE : (manifest || window.MANIFEST_SAMPLE));
      ctx.go({ name: "stack.results" });
    };

    var seg = h("div", { style: { display: "inline-flex", gap: "4px", background: "var(--volt-void)", border: "1px solid var(--volt-border)", borderRadius: "999px", padding: "4px", width: "fit-content" } },
      [["oauth", "Connect a provider"], ["paste", "Paste a manifest"]].map(function (m) {
        var on = mode === m[0];
        return h("button", { key: m[0], type: "button", onClick: function () { setMode(m[0]); },
          style: { WebkitAppearance: "none", appearance: "none", cursor: "pointer", border: "none", borderRadius: "999px", padding: "var(--space-sm) var(--space-lg)", background: on ? "var(--volt-surface)" : "transparent", color: on ? "var(--text-body)" : "var(--text-secondary)", font: on ? "var(--type-body-md-strong)" : "var(--type-body-md)", letterSpacing: "var(--ls-body-md)" } }, m[1]);
      }));

    var providerCard = h("section", { style: Object.assign({}, CARD, col("var(--space-md)")) },
      h("span", { style: eyebrow }, "Repositories · read-minimal OAuth"),
      h("div", { style: col("var(--space-sm)") }, SCAN_TARGETS_V2.map(function (t) {
        var on = target === t.id;
        return h("button", { key: t.id, type: "button", className: on ? "nv-target on" : "nv-target", onClick: function () { setTarget(t.id); },
          style: { WebkitAppearance: "none", appearance: "none", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-md)", flexWrap: "wrap", borderRadius: "var(--radius-sm)", padding: "var(--space-md) var(--space-lg)", background: "var(--volt-void)", border: "1px solid var(--volt-border)" } },
          h("span", { style: col("2px", { minWidth: 0 }) },
            h("span", { style: { font: "var(--type-body-md-strong)", letterSpacing: "var(--ls-body-md)" } }, t.repo),
            h("span", { style: metaMono }, t.provider + " · " + t.visibility)),
          h("span", { className: t.publishable ? "nv-tag pub" : "nv-tag", style: { font: "var(--type-mono-caption)", letterSpacing: "var(--ls-mono-caption)", textTransform: "uppercase", borderRadius: "999px", padding: "2px 10px", whiteSpace: "nowrap", border: "1px solid var(--volt-border)", color: "var(--text-secondary)" } }, t.publishable ? "Publishable" : "Scan only"));
      })),
      h(Note, null, "Read-minimal OAuth reports repository visibility, which is what makes the publish test evaluable. The scan reads GitLab-hosted manifests too."));

    var pasteCard = h("section", { style: Object.assign({}, CARD, col("var(--space-md)")) },
      h("span", { style: eyebrow }, "Paste a manifest"),
      h(TextInput, { label: "package.json", multiline: true, rows: 9, value: manifest, onChange: function (e) { setManifest(e.target.value); }, placeholder: window.MANIFEST_SAMPLE }),
      h(Note, null, "Pasted manifests are scannable and never publishable — the test is source visibility, not who ran the scan."));

    var consentRow = h("label", { style: { display: "flex", gap: "var(--space-md)", alignItems: "flex-start", cursor: "pointer", border: "1px dashed var(--volt-border)", borderRadius: "12px", padding: "var(--space-lg) var(--space-2xl)" } },
      h("input", { type: "checkbox", checked: consent, onChange: function (e) { setConsent(e.target.checked); }, style: { marginTop: "4px", accentColor: "var(--volt-emerald)" } }),
      h("span", { style: col("2px") },
        h("span", { style: { font: "var(--type-body-md-strong)", letterSpacing: "var(--ls-body-md)" } }, "Run the scan on the server"),
        h(Note, null, "The manifest and its unmatched entries are not retained beyond this session unless you save them. Matched project references persist only as an aggregate count with no scan or account referent.")));

    var wrap = { maxWidth: "680px", width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-2xl)", padding: "var(--space-section) var(--space-2xl)" };
    return h("div", { style: wrap },
      h("header", { style: col("var(--space-sm)") },
        h("span", { style: eyebrow }, "My stack"),
        h("h1", { style: { margin: 0, font: "var(--type-display-lg)", letterSpacing: "var(--ls-display-lg)", textWrap: "balance" } }, "Find what you already depend on"),
        h("span", { style: { font: "var(--type-body-lg)", letterSpacing: "var(--ls-body-lg)", color: "var(--text-secondary)", textWrap: "pretty" } }, "The scan runs server-side. Matches resolve against the catalog; everything else is discarded.")),
      seg,
      mode === "oauth" ? providerCard : pasteCard,
      consentRow,
      h("div", null, h(Button, { variant: "primary", size: "lg", disabled: !consent, onClick: run }, "Scan")));
  }

  function ScanResultsV2(props) {
    var ctx = props.ctx;
    var scan = ctx.scan;
    if (!scan) return h(StackConnectV2, { ctx: ctx });
    var Note = W("Note");
    var caption = { font: "var(--type-caption)", color: "var(--text-secondary)" };
    var eyebrow = { font: "var(--type-mono-label)", letterSpacing: "var(--ls-mono-label)", textTransform: "uppercase", color: "var(--volt-text-500)" };
    var emEyebrow = Object.assign({}, eyebrow, { color: "var(--volt-emerald)" });
    var CARD = { border: "1px solid var(--volt-border)", background: "var(--volt-surface)", borderRadius: "12px", padding: "var(--space-2xl)" };

    var deps = parseManifestDeps(window.MANIFEST_SAMPLE);
    var seen = {}, matched = [], unmatched = [];
    deps.forEach(function (d) {
      var p = matchDep(d);
      if (p && ctx.claimState(p.slug) !== "suppressed") { if (!seen[p.slug]) { seen[p.slug] = 1; matched.push(p); } }
      else unmatched.push(d);
    });
    var total = deps.length;
    var pct = total ? Math.round(matched.length / total * 100) : 0;
    var pubOK = scan.source && scan.source.publishable;

    var header = h("header", { style: col("var(--space-md)") },
      h("span", { style: eyebrow }, "My stack · scan complete"),
      h("h1", { style: { margin: 0, font: "var(--type-display-lg)", letterSpacing: "var(--ls-display-lg)", textWrap: "balance" } }, matched.length + " of " + total + " dependencies are in the catalog"),
      h("div", { style: { height: "6px", borderRadius: "999px", background: "var(--volt-void)", overflow: "hidden", maxWidth: "340px", border: "1px solid var(--volt-border)" } },
        h("div", { style: { width: pct + "%", height: "100%", background: "var(--volt-emerald)", borderRadius: "999px" } })),
      h("span", { style: caption }, "Source: " + (scan.source ? scan.source.provider + (scan.source.repo ? " · " + scan.source.repo + " · " + scan.source.visibility : "") : "—") + " · the manifest and unmatched entries are not retained."));

    var matchedRows = matched.map(function (p, i) {
      var s = p.signals || {};
      var lead = s.response || s.updates || s.breadth;
      var leadLabel = s.response ? "Responsiveness" : s.updates ? "Release rhythm" : "Contribution";
      return h("div", { key: p.slug, style: { display: "flex", gap: "var(--space-lg)", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", padding: "var(--space-lg) 0", borderTop: i === 0 ? "none" : "1px solid var(--volt-border)" } },
        h("div", { style: col("4px", { minWidth: 0, flex: "1 1 300px" }) },
          lead ? h("span", { style: emEyebrow }, leadLabel + " · " + lead.band) : null,
          h("span", { style: { font: "var(--type-body-lg-strong)", letterSpacing: "var(--ls-body-lg)" } }, p.name, h("span", { style: Object.assign({ marginLeft: "8px" }, caption) }, p.owner)),
          h("span", { style: caption }, lead ? lead.detail : p.description)),
        h("div", { style: { display: "flex", gap: "var(--space-xs)", flexWrap: "wrap", alignItems: "center" } },
          h(Button, { variant: "outline", onClick: function () { ctx.go({ name: "action.save", slug: p.slug }); } }, "Save to list"),
          h(Button, { variant: "ghost", onClick: function () { ctx.go({ name: "action.interest", slug: p.slug }); } }, "Register interest")));
    });
    var matchedCard = h("section", { style: Object.assign({}, CARD, col("var(--space-xs)")) },
      h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "var(--space-md)" } },
        h("span", { style: eyebrow }, "In the catalog"),
        h("span", { style: emEyebrow }, String(matched.length))),
      h("div", null, matchedRows.length ? matchedRows : h("span", { style: caption }, "None of your dependencies are in the catalog yet.")));

    var unmatchedRows = unmatched.map(function (d, i) {
      return h("div", { key: d, style: { display: "flex", gap: "var(--space-md)", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", padding: "var(--space-md) 0", borderTop: i === 0 ? "none" : "1px solid var(--volt-border)" } },
        h("span", { style: { fontFamily: "var(--font-mono)", font: "var(--type-body-md)", letterSpacing: "var(--ls-body-md)" } }, d),
        h("button", { className: "nv-home-seeall", type: "button", onClick: function () { ctx.go({ name: "action.nominate", slug: d, from: { name: "stack.results" } }); },
          style: { display: "inline-flex", alignItems: "center", gap: "6px", WebkitAppearance: "none", appearance: "none", background: "transparent", border: "none", cursor: "pointer", padding: "2px 0", font: "var(--type-body-md-strong)", letterSpacing: "var(--ls-body-md)" } },
          "Nominate", h("span", { className: "nv-arrow" }, "→")));
    });
    var unmatchedCard = unmatched.length ? h("section", { style: Object.assign({}, CARD, col("var(--space-sm)")) },
      h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "var(--space-md)" } },
        h("span", { style: eyebrow }, "Not in the catalog yet"),
        h("span", { style: eyebrow }, String(unmatched.length))),
      h(Note, null, "Nominating asks the platform to generate a page. These entries are not retained beyond this session."),
      h("div", null, unmatchedRows)) : null;

    var publish = h("section", { style: Object.assign({}, CARD, col("var(--space-md)")) },
      h("span", { style: eyebrow }, "Publish this scan"),
      pubOK
        ? h(React.Fragment, null,
            h("span", { style: BODY }, "This scan’s source is a public repository, so the matched set can be published as a shareable stack page."),
            h("div", null, h(Button, { variant: "primary", onClick: function () { ctx.go({ name: "stack.publish" }); } }, "Publish stack page")))
        : h(React.Fragment, null,
            h("span", { style: BODY }, "This scan can’t be published."),
            h(Note, null, (scan.source && scan.source.kind === "manifest") ? "Pasted manifests are never publishable." : "Private-repository scans are never publishable.", " The test is source visibility — never publish a dependency inventory that is not otherwise public.")));

    var org = h("section", { style: Object.assign({}, CARD, col("var(--space-md)")) },
      h("span", { style: eyebrow }, "Scanning for an organisation?"),
      h("span", { style: BODY }, "Tell us and we’ll reach out when the organisation tooling opens."),
      ctx.orgWaitlisted
        ? h(Badge, { tone: "neutral", mono: true }, "Received — acknowledgement sent")
        : h("form", { onSubmit: function (e) { e.preventDefault(); ctx.joinOrgWaitlist(); }, style: { display: "flex", gap: "var(--space-md)", flexWrap: "wrap", alignItems: "flex-end" } },
            h(TextInput, { label: "Company", name: "company", placeholder: "Meridian" }),
            h(Button, { variant: "outline" }, "Join the waitlist")));

    var wrap = { maxWidth: "760px", width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-2xl)", padding: "var(--space-section) var(--space-2xl)" };
    return h("div", { style: wrap }, header, matchedCard, unmatchedCard, publish, org);
  }

  Object.assign(window, {
    NotavibeShell: NotavibeShell,
    EditorialSurface: EditorialSurface,
    ShipWeekHub: ShipWeekHub,
    AlternativesPage: AlternativesPage,
    ComparePage: ComparePage,
    BackerSettings: BackerSettings,
    BackerDashboard: BackerHome,
    BackerMore: BackerMore,
    ScanResults: ScanResultsV2,
    StackConnect: StackConnectV2
  });
})();

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
      "}"
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
    var T = {
      discover: "Discover", category: "CategoryView", search: "SearchResults", project: "ProjectPage",
      methodology: "MethodologyPage", "list.public": "PublicListPage", "stack.public": "PublicStackPage",
      editorial: "EditorialSurface", shipweek: "ShipWeekHub", alternatives: "AlternativesPage", compare: "ComparePage",
      "stack.connect": "StackConnect", "stack.results": "ScanResults", "stack.publish": "PublishInterstitial",
      "claim.start": "ClaimFlow", "suppress.start": "SuppressionFlow", signin: "SignInInterstitial",
      "action.save": "SaveToList", "action.interest": "RegisterInterest", "action.nominate": "Nominate",
      "backer.dashboard": "BackerDashboard", "backer.lists": "MyLists", "backer.list": "ListDetail",
      "backer.activity": "BackerActivity", "backer.chat": "CurationChat", "backer.onboarding": "BackerOnboarding",
      "backer.settings": "BackerSettings",
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
    var isApp = APP_ROUTES.test(name);

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

  Object.assign(window, {
    NotavibeShell: NotavibeShell,
    EditorialSurface: EditorialSurface,
    ShipWeekHub: ShipWeekHub,
    AlternativesPage: AlternativesPage,
    ComparePage: ComparePage,
    BackerSettings: BackerSettings
  });
})();

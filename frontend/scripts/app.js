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

  /* ── Theme (light / dark) ─────────────────────────────────────────────────────
     The resolved theme lives as data-theme on <html> and is set pre-paint by the
     inline script in index.html (remembered choice → OS setting → dark). These
     controls just flip that attribute and persist the choice; because every
     surface is CSS-variable driven, flipping the attribute IS the whole switch —
     nothing in the React tree needs to re-render for the page to restyle. The
     local state below exists only so the control's own icon/label follow the
     current theme, and a broadcast event keeps every mounted control in sync (the
     desktop icon button and the burger segment can both be live at once). */
  var THEME_KEY = "nv-theme";
  function currentTheme() {
    return (typeof document !== "undefined" &&
      document.documentElement.getAttribute("data-theme") === "light") ? "light" : "dark";
  }
  function applyTheme(t) {
    if (t !== "light" && t !== "dark") return;
    document.documentElement.setAttribute("data-theme", t);
    document.documentElement.style.colorScheme = t;
    try { localStorage.setItem(THEME_KEY, t); } catch (e) { /* storage blocked */ }
    try { document.dispatchEvent(new CustomEvent("nv-theme-change", { detail: t })); } catch (e) {}
  }
  /* Subscribe a setter to theme changes from any control; returns the unsubscribe. */
  function onThemeChange(fn) {
    var on = function (e) { fn(e.detail === "light" ? "light" : "dark"); };
    document.addEventListener("nv-theme-change", on);
    return function () { document.removeEventListener("nv-theme-change", on); };
  }
  (function injectThemeCSS() {
    if (typeof document === "undefined" || document.getElementById("nv-theme-css")) return;
    var s = document.createElement("style");
    s.id = "nv-theme-css";
    s.textContent = [
      ".nv-theme-btn{transition:background-color 150ms ease,color 150ms ease,border-color 150ms ease}",
      ".nv-theme-btn:hover{background:color-mix(in srgb, var(--volt-surface) 75%, transparent)!important;color:var(--volt-white)!important}",
      ".nv-theme-btn svg{display:block}",
      ".nv-theme-opt{transition:background-color 150ms ease,color 150ms ease}",
      ".nv-theme-opt:hover{color:var(--volt-white)}"
    ].join("");
    document.head.appendChild(s);
  })();

  var ICON_SUN = h("svg", { viewBox: "0 0 24 24", width: 18, height: 18, fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" },
    h("circle", { cx: 12, cy: 12, r: 4 }),
    h("path", { d: "M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" }));
  var ICON_MOON = h("svg", { viewBox: "0 0 24 24", width: 17, height: 17, fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" },
    h("path", { d: "M20.5 13.4A8.2 8.2 0 1 1 10.6 3.5a6.4 6.4 0 0 0 9.9 9.9z" }));

  /* Desktop: a single icon button in the header right zone. Shows the CURRENT
     theme (moon on dark, sun on light) and flips to the other on click. */
  function ThemeToggle(props) {
    var st = React.useState(currentTheme());
    var theme = st[0], setTheme = st[1];
    React.useEffect(function () { return onThemeChange(setTheme); }, []);
    var next = theme === "light" ? "dark" : "light";
    var label = "Switch to " + next + " theme";
    return h("button", {
      type: "button", className: "nv-theme-btn",
      "aria-label": label, title: label,
      onClick: function () { applyTheme(next); },
      style: Object.assign({
        width: "36px", height: "36px", flexShrink: 0, padding: 0,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        background: "transparent", border: "1px solid transparent",
        borderRadius: "var(--radius-pill, 9999px)",
        color: "var(--volt-text-200)", cursor: "pointer"
      }, props && props.style)
    }, theme === "light" ? ICON_SUN : ICON_MOON);
  }

  /* Burger / touch: an explicit two-option selector so the choice reads as a
     choice, matching the header's other segmented controls. */
  function ThemeSegment(props) {
    var st = React.useState(currentTheme());
    var theme = st[0], setTheme = st[1];
    React.useEffect(function () { return onThemeChange(setTheme); }, []);
    var opts = [ { k: "light", label: "Light", icon: ICON_SUN }, { k: "dark", label: "Dark", icon: ICON_MOON } ];
    return h("div", { style: Object.assign({ display: "flex", alignItems: "center", gap: "10px", justifyContent: "space-between" }, props && props.style) },
      h("span", { style: { font: "var(--type-body-md)", fontWeight: 500, color: "var(--volt-text-500)" } }, "Appearance"),
      h("div", { role: "group", "aria-label": "Theme", style: { display: "inline-flex", gap: "4px", background: "var(--volt-void)", border: "1px solid var(--volt-border)", borderRadius: "999px", padding: "4px" } },
        opts.map(function (o) {
          var on = theme === o.k;
          return h("button", {
            key: o.k, type: "button", className: "nv-theme-opt",
            "aria-pressed": on ? "true" : "false",
            onClick: function () { applyTheme(o.k); },
            style: {
              WebkitAppearance: "none", appearance: "none", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "7px 12px", borderRadius: "999px", border: "none",
              font: "var(--type-caption-strong)",
              background: on ? "var(--volt-surface)" : "transparent",
              color: on ? "var(--volt-white)" : "var(--volt-text-500)"
            }
          }, o.icon, o.label);
        })));
  }
  window.NvThemeToggle = ThemeToggle;
  window.NvThemeSegment = ThemeSegment;

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
      ".nv-listcard{transition:border-color 200ms cubic-bezier(0.16,1,0.3,1)}",
      ".nv-listcard:hover{border-color:var(--volt-emerald)}",
      ".nv-listcard:hover .nv-arrow{transform:translateX(3px)}",
      ".nv-deck-cta{transition:border-color 260ms cubic-bezier(0.16,1,0.3,1),background-color 260ms cubic-bezier(0.16,1,0.3,1)}",
      ".nv-deck-cta:hover{border-color:var(--volt-emerald);background-color:var(--volt-canvas,var(--volt-surface))}",
      ".nv-arrow{display:inline-block;transition:transform 260ms cubic-bezier(0.16,1,0.3,1)}",
      ".nv-deck-cta:hover .nv-arrow,.nv-home-seeall:hover .nv-arrow{transform:translateX(4px)}",
      ".nv-deck-cta:focus-visible,.nv-home-seeall:focus-visible{outline:2px solid var(--volt-emerald);outline-offset:3px;border-radius:var(--radius-sm)}",
      /* Curation chat — the transcript is chrome, the draft list is the payload.
         User turns get an emerald-tinted bubble; the curator answers in a plain
         grounded bubble (no AI house style, per DEC-0031); the draft-list card
         carries the emerald spine that marks the primary object on the screen.
         Emerald tints use rgba literals, never the token in a button style. */
      ".nv-chat-you{align-self:flex-end;max-width:82%;background:rgba(0,202,142,0.12);",
      "border:1px solid rgba(0,202,142,0.34);border-radius:14px 14px 4px 14px;padding:var(--space-md) var(--space-lg)}",
      ".nv-chat-curator{align-self:flex-start;max-width:82%;background:var(--volt-void);",
      "border:1px solid var(--volt-border);border-radius:14px 14px 14px 4px;padding:var(--space-md) var(--space-lg)}",
      ".nv-draft{position:relative;overflow:hidden;animation:nv-draft-in 420ms cubic-bezier(0.16,1,0.3,1) both}",
      "@keyframes nv-draft-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}",
      ".nv-chip{transition:border-color 200ms cubic-bezier(0.16,1,0.3,1),color 200ms cubic-bezier(0.16,1,0.3,1)}",
      ".nv-chip:hover{border-color:var(--volt-emerald)!important;color:var(--volt-emerald)!important}",
      /* Settings consent toggle — the on-state emerald lives in a class, never in
         a button's inline style, so the button[style*=emerald] escape-hatch can't
         hijack it into a white pill. */
      ".nv-toggle{transition:border-color 200ms cubic-bezier(0.16,1,0.3,1),background-color 200ms cubic-bezier(0.16,1,0.3,1),color 200ms cubic-bezier(0.16,1,0.3,1)}",
      ".nv-toggle.on{border-color:var(--volt-emerald)!important;background:rgba(0,202,142,0.14)!important;color:var(--volt-emerald)!important}",
      /* Claim flow — the conversion moment. Each step enters expo-out; the step
         rail marks progress in emerald via CLASS (never inline — escape-hatch safe);
         the success card carries the emerald spine that marks the primary object,
         the same signature used by the Deck hero and the curation draft list. */
      ".nv-claim-step{animation:nv-claim-in 460ms cubic-bezier(0.16,1,0.3,1) both}",
      "@keyframes nv-claim-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}",
      ".nv-steprail{display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap}",
      ".nv-steprail-node{display:flex;align-items:center;gap:var(--space-xs);font:var(--type-mono-label);letter-spacing:var(--ls-mono-label);text-transform:uppercase;color:var(--volt-text-500)}",
      ".nv-steprail-node.on{color:var(--text-primary)}",
      ".nv-steprail-dot{width:22px;height:22px;border-radius:50%;display:grid;place-items:center;border:1px solid var(--volt-border);color:var(--volt-text-500);font-size:11px;flex:0 0 auto;transition:border-color 300ms cubic-bezier(0.16,1,0.3,1),color 300ms cubic-bezier(0.16,1,0.3,1),background-color 300ms cubic-bezier(0.16,1,0.3,1)}",
      ".nv-steprail-node.done .nv-steprail-dot{border-color:var(--volt-emerald);color:var(--volt-emerald)}",
      ".nv-steprail-node.on .nv-steprail-dot{border-color:var(--volt-emerald);background:rgba(0,202,142,0.14);color:var(--volt-emerald)}",
      ".nv-steprail-bar{flex:1;height:1px;min-width:14px;background:var(--volt-border);transition:background-color 400ms cubic-bezier(0.16,1,0.3,1)}",
      ".nv-steprail-bar.done{background:var(--volt-emerald)}",
      ".nv-claim-spine{position:relative;padding-left:calc(var(--space-2xl) + 3px)}",
      ".nv-claim-spine::before{content:\"\";position:absolute;left:0;top:0;bottom:0;width:3px;border-radius:3px;background:var(--volt-emerald)}",
      ".nv-claim-choice{transition:border-color 240ms cubic-bezier(0.16,1,0.3,1)}",
      ".nv-claim-choice:hover{border-color:var(--volt-emerald)}",
      ".nv-claim-choice:hover .nv-arrow{transform:translateX(4px)}",
      ".nv-claim-choice:focus-visible{outline:2px solid var(--volt-emerald);outline-offset:3px;border-radius:12px}",
      /* Success reveal — the payoff choreography: the card enters, then the demand
         reveal rises in a beat later (orchestration, not a simultaneous fade). */
      ".nv-reveal{animation:nv-claim-in 620ms cubic-bezier(0.16,1,0.3,1) 180ms both}",
      ".nv-reveal-up{display:inline-block;animation:nv-rise 760ms cubic-bezier(0.16,1,0.3,1) 440ms both}",
      "@keyframes nv-rise{0%{opacity:0;transform:translateY(7px)}62%{opacity:1;transform:translateY(-2px)}100%{opacity:1;transform:none}}",
      /* Demand-as-motion, literally: the interest line DRAWS itself on entrance
         (stroke-dashoffset), then the leading dot lands. Embodies the thesis the
         copy states — motion, not a number. */
      ".nv-spark-line{stroke-dasharray:200;stroke-dashoffset:200;animation:nv-spark-draw 1000ms cubic-bezier(0.16,1,0.3,1) 340ms forwards}",
      "@keyframes nv-spark-draw{to{stroke-dashoffset:0}}",
      ".nv-spark-dot{opacity:0;animation:nv-spark-pop 320ms cubic-bezier(0.16,1,0.3,1) 1200ms forwards}",
      "@keyframes nv-spark-pop{to{opacity:1}}",
      /* Maintainer form fields — card-system inputs (profile vocabulary, contest
         evidence, settings confirm). Emerald focus border, kept off inline styles. */
      ".nv-field{width:100%;box-sizing:border-box;border:1px solid var(--volt-border);background:var(--volt-void);color:var(--text-primary);border-radius:8px;padding:var(--space-sm) var(--space-md);font:var(--type-body-md);letter-spacing:var(--ls-body-md);transition:border-color 200ms cubic-bezier(0.16,1,0.3,1)}",
      ".nv-field:focus{outline:none;border-color:var(--volt-emerald)}",
      ".nv-field::placeholder{color:var(--volt-text-500)}",
      "textarea.nv-field{resize:vertical;min-height:64px;font-family:inherit;line-height:1.55}",
      "@media (prefers-reduced-motion: reduce){.nv-arrow,.nv-deck-cta,.nv-draft,.nv-claim-step,.nv-steprail-dot,.nv-steprail-bar,.nv-reveal,.nv-reveal-up{transition:none;animation:none}.nv-spark-line{stroke-dashoffset:0;animation:none}.nv-spark-dot{opacity:1;animation:none}}"
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

  /* ── Backer settings (card system) ────────────────────────────────────────
     Brought onto the same 680 reading column + card idiom as the rest of the
     signed-in backer set. Was on the older pageHeader / SectionTitle / StreamRow
     chrome. The consent toggles keep On/Off semantics (honest affordance) but the
     on-state emerald lives in the .nv-toggle class, never inline (footgun-safe). */
  function BackerSettings(props) {
    var ctx = props.ctx;
    var Note = W("Note"), Held = W("Held");
    var caption = { font: "var(--type-caption)", color: "var(--text-secondary)" };
    var eyebrow = { font: "var(--type-mono-label)", letterSpacing: "var(--ls-mono-label)", textTransform: "uppercase", color: "var(--volt-text-500)" };
    var SCARD = { border: "1px solid var(--volt-border)", background: "var(--volt-surface)", borderRadius: "12px", padding: "var(--space-2xl)" };
    var s = React.useState(false), digest = s[0], setDigest = s[1];
    var s2 = React.useState(true), updates = s2[0], setUpdates = s2[1];

    var streams = [
      { title: "(a) Transactional and obligation", body: "Verification lapsed, verification restored, page retired, claim revoked, acknowledgements. Delivery-tracked with retry; on persistent failure the obligation surfaces as an in-app pending action.", locked: true },
      { title: "(b) Project updates", body: "Claim outcomes and terminal state changes on projects in your lists.", on: updates, toggle: function () { setUpdates(!updates); } },
      { title: "(c) Platform — the discovery digest", body: "Your Deck as an email. Off at signup; this is the explicit opt-in, never a pre-ticked box.", on: digest, toggle: function () { setDigest(!digest); } }
    ];
    var streamRow = function (r, i) {
      return h("div", { key: i, style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--space-lg)", padding: "var(--space-lg) 0", borderTop: i === 0 ? "none" : "1px solid var(--volt-border)" } },
        h("div", { style: col("4px", { maxWidth: "52ch", minWidth: 0 }) },
          h("span", { style: { font: "var(--type-body-md-strong)", letterSpacing: "var(--ls-body-md)" } }, r.title),
          h("span", { style: Object.assign({ textWrap: "pretty" }, caption) }, r.body)),
        r.locked
          ? h(Badge, { mono: true, tone: "outline" }, "Never unsubscribable")
          : h("button", { type: "button", className: r.on ? "nv-toggle on" : "nv-toggle", onClick: r.toggle,
              style: { WebkitAppearance: "none", appearance: "none", minWidth: "88px", minHeight: "34px", cursor: "pointer", borderRadius: "999px", border: "1px solid var(--volt-border)", background: "var(--volt-void)", color: "var(--text-secondary)", font: "var(--type-mono-button)", letterSpacing: "var(--ls-mono-button)", textTransform: "uppercase" } },
              r.on ? "On" : "Off"));
    };

    var streamsCard = h("section", { style: Object.assign({}, SCARD, col("var(--space-xs)")) },
      h("span", { style: eyebrow }, "Email streams · by consent basis"),
      h("div", null, streams.map(streamRow)),
      h("div", { style: { paddingTop: "var(--space-md)" } },
        digest
          ? h(Note, null, "Opted in. The digest is this version’s only return-trigger email — and retention is the primary KPI.")
          : h(Held, { refs: "§9.10" }, "Opted out. A discovery product whose sole return-trigger is off will not retain; the opt-in moment in onboarding is where this is won or lost.")));

    var dataCard = h("section", { style: Object.assign({}, SCARD, col("var(--space-md)")) },
      h("span", { style: eyebrow }, "Data"),
      h("p", { style: BODY }, "Scan manifests and their unmatched entries are not retained beyond the session unless you save them. Matched project references persist as an aggregate count with no scan or account referent."),
      h("div", { style: { display: "flex", gap: "var(--inline-gap)", flexWrap: "wrap" } },
        h(Button, { variant: "outline", onClick: function () { ctx.go({ name: "methodology" }); } }, "Read the data-handling section"),
        h(Button, { variant: "outline", onClick: function () { ctx.go({ name: "backer.onboarding" }); } }, "Redo the preference profile")));

    var wrap = { maxWidth: "680px", width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-2xl)", padding: "var(--space-section) var(--space-2xl)" };
    return h("div", { style: wrap },
      h("header", { style: col("var(--space-sm)") },
        h("span", { style: eyebrow }, "Backer · Raj"),
        h("h1", { style: { margin: 0, font: "var(--type-display-lg)", letterSpacing: "var(--ls-display-lg)", textWrap: "balance" } }, "Settings"),
        h("span", { style: { font: "var(--type-body-lg)", letterSpacing: "var(--ls-body-lg)", color: "var(--text-secondary)", textWrap: "pretty" } }, "One account, both roles. Nothing here processes money, because nothing in this version does.")),
      streamsCard,
      dataCard,
      h(Note, null, "No billing, no receipts, no subscriptions surface — pay.notavibe.dev does not exist in this version."));
  }

  /* ── prototype rail for surfaces product chrome does not link ──── */

  /* The rail and the bottom navigator are prototype scaffolding, not product
     chrome. They render in local dev and when ?dev is present, and stay out of
     the deployed product. Same host-detection idiom as the password gate in
     index.html — localhost (and file://) is dev; everything else is production. */
  var NV_DEV = window.NV_DEV = (function () {
    try {
      var host = location.hostname;
      var isLocal = !host || host === "localhost" || host === "127.0.0.1"
        || host === "::1" || host === "[::1]" || /\.localhost$/.test(host);
      var forced = /(?:^|[?&])dev(?:=|&|$)/.test(location.search);
      return isLocal || forced;
    } catch (e) { return false; }
  })();

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
      /* Self-serve maintainer entry (§8.1) — the cold claim path, on the public
         chrome so a maintainer arriving cold can reach it from any marketing page.
         Routes to claim.start with no slug → the value pitch + resolve. */
      { label: "Claim your project", route: { name: "claim.start" }, on: r.name === "claim.start" },
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
      /* Theme switch keeps a permanent desktop slot; on narrow it folds into the
         burger (as a labelled segment) alongside the account action. */
      narrow ? null : h(ThemeToggle, { key: "theme" }),
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
      /* Appearance selector — leads the panel (top slot) on narrow, where the
         desktop right-zone toggle isn't shown. Set off by a hairline below. */
      if (narrow) items.unshift(h("div", {
        key: "__theme",
        style: {
          padding: "6px 10px 12px", margin: "0 6px 6px",
          borderBottom: "1px solid color-mix(in srgb, var(--volt-border-hover) 45%, transparent)",
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 240ms ease 0ms, transform 320ms cubic-bezier(0.2,0.9,0.2,1) 0ms"
        }
      }, h(ThemeSegment, null)));
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

  /* ── Auth surfaces (grill-with-docs 2026-08-05 model) ─────────────────────
     Multi-provider sign-in + account-identity management, hand-authored here and
     returned from screenFor by LOCAL reference (the DS bundle clobbers window
     copies — same reason as BackerHome). Provider marks are the official
     simple-icons paths, filled currentColor so they take the button's own colour. */
  var NV_GH = "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12";
  var NV_GL = "m23.6004 9.5927-.0337-.0862L20.3.9814a.851.851 0 0 0-.3362-.405.8748.8748 0 0 0-.9997.0539.8748.8748 0 0 0-.29.4399l-2.2055 6.748H7.5375l-2.2057-6.748a.8573.8573 0 0 0-.29-.4412.8748.8748 0 0 0-.9997-.0537.8585.8585 0 0 0-.3362.4049L.4332 9.5015l-.0325.0862a6.0657 6.0657 0 0 0 2.0119 7.0105l.0113.0087.03.0213 4.976 3.7264 2.462 1.8633 1.4995 1.1321a1.0085 1.0085 0 0 0 1.2197 0l1.4995-1.1321 2.4619-1.8633 5.006-3.7489.0125-.01a6.0682 6.0682 0 0 0 2.0094-7.003z";
  var NV_BB = "M.778 1.213a.768.768 0 00-.768.892l3.263 19.81c.084.5.515.868 1.022.873H19.95a.772.772 0 00.77-.646l3.27-20.03a.768.768 0 00-.768-.891zM14.52 15.53H9.522L8.17 8.466h7.561z";
  function brandMark(d) {
    return h("svg", { viewBox: "0 0 24 24", width: 16, height: 16, "aria-hidden": "true", style: { display: "block", flex: "0 0 auto" } },
      h("path", { fill: "currentColor", d: d }));
  }
  var PROVIDER_LABEL = { github: "GitHub", gitlab: "GitLab", bitbucket: "Bitbucket" };
  var PROVIDER_MARK = { github: NV_GH, gitlab: NV_GL, bitbucket: NV_BB };

  function SignInV2(props) {
    var ctx = props.ctx, StateShell = W("StateShell"), Note = W("Note");
    var next = ctx.route.next || { name: "discover" };
    var labels = { "action.save": "save this project to a list", "action.interest": "register interest",
      "action.nominate": "nominate this project", "claim.start": "claim this page", "stack.connect": "scan your stack" };
    var scoped = labels[next.name];
    var providers = ["github", "gitlab", "bitbucket"];
    return h(StateShell, { ctx: ctx, eyebrow: "Sign in", title: scoped ? "Sign in to " + scoped : "Sign in to notavibe",
      back: next.name === "signin" ? { name: "discover" } : next },
      h("p", { style: { margin: 0, font: "var(--type-body-lg)", letterSpacing: "var(--ls-body-lg)", color: "var(--text-secondary)" } },
        scoped ? "You were doing something specific, so this is scoped to that action — finishing it brings you straight back."
               : "One account — discover, scan and claim from a single sign-in."),
      h("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-md)" } },
        providers.map(function (p) {
          return h(Button, { key: p, variant: "outline", size: "lg", fullWidth: true, icon: brandMark(PROVIDER_MARK[p]),
            onClick: function () { ctx.signIn(); ctx.go(next); } }, "Continue with " + PROVIDER_LABEL[p]);
        })),
      h(Note, null, "Sign in with any provider — connect the others later from your account. Scanning needs GitHub or GitLab; claiming a page needs GitHub."));
  }

  function AccountIdentities(props) {
    var ctx = props.ctx, StateShell = W("StateShell"), Note = W("Note"), SectionTitle = W("SectionTitle");
    var ids = [
      { prov: "github", handle: "@maghraby", signin: true, blocked: "Resolve or retire your claimed pages first — claims re-verify against GitHub." },
      { prov: "gitlab", handle: "@maghraby-gl", signin: false, blocked: "" }
    ];
    return h(StateShell, { ctx: ctx, eyebrow: "Account", title: "Connected accounts", back: { name: "backer.dashboard" } },
      h("p", { style: { margin: 0, font: "var(--type-body-lg)", letterSpacing: "var(--ls-body-lg)", color: "var(--text-secondary)" } },
        "Sign in with any of these. Connect more to scan your stack (GitHub or GitLab) or claim a page (GitHub)."),
      h("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-md)" } },
        ids.map(function (id) {
          return h("div", { key: id.prov, style: { border: "var(--border-level-1)", borderRadius: "var(--radius-sm)", padding: "var(--space-lg)", background: "var(--surface-canvas)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--space-lg)", flexWrap: "wrap" } },
            h("div", { style: { display: "flex", flexDirection: "column", gap: "4px" } },
              h("span", { style: { display: "flex", alignItems: "center", gap: "var(--space-sm)" } },
                brandMark(PROVIDER_MARK[id.prov]),
                h("span", { style: { font: "var(--type-body-md-strong)", letterSpacing: "var(--ls-body-md)" } }, PROVIDER_LABEL[id.prov]),
                id.signin ? h(Badge, { tone: "outline", mono: true }, "sign-in") : null),
              h("span", { style: { font: "var(--type-mono-caption)", letterSpacing: "var(--ls-mono-caption)", color: "var(--text-secondary)" } }, id.handle),
              id.blocked ? h("span", { style: { font: "var(--type-caption)", color: "var(--text-secondary)", maxWidth: "46ch" } }, id.blocked) : null),
            h(Button, { variant: "outline", disabled: !!id.blocked }, "Disconnect"));
        })),
      h("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-sm)" } },
        h(SectionTitle, null, "Connect another account"),
        h(Button, { variant: "outline", fullWidth: true, icon: brandMark(NV_BB), onClick: function () { ctx.signIn(); } }, "Connect Bitbucket")),
      h("div", { style: { borderTop: "var(--border-level-1)", paddingTop: "var(--space-lg)", display: "flex", flexDirection: "column", gap: "var(--space-sm)" } },
        h(SectionTitle, null, "Danger zone"),
        h(Note, null, "Deleting your account releases your claimed pages (they revert to generated-unclaimed, staying public and claimable) and erases your lists, stacks and registered interest."),
        h("button", { type: "button", onClick: function () { ctx.go({ name: "account.delete" }); },
          style: { alignSelf: "flex-start", cursor: "pointer", background: "none", border: "1px solid var(--status-error, #ef4444)", color: "var(--status-error, #ef4444)", borderRadius: "var(--radius-sm)", padding: "var(--space-sm) var(--space-lg)", font: "var(--type-body-md-strong)", letterSpacing: "var(--ls-body-md)" } },
          "Delete your account")));
  }

  function AccountDelete(props) {
    var ctx = props.ctx, StateShell = W("StateShell"), Note = W("Note");
    var st = React.useState(false), reauthed = st[0], setReauthed = st[1];
    return h(StateShell, { ctx: ctx, eyebrow: "Danger zone", title: "Delete your account", back: { name: "account.identities" } },
      h("div", { style: { border: "1px solid var(--status-error, #ef4444)", borderRadius: "var(--radius-sm)", padding: "var(--space-lg)", background: "rgba(239,68,68,0.08)", display: "flex", flexDirection: "column", gap: "var(--space-sm)" } },
        h("span", { style: { font: "var(--type-body-md-strong)", letterSpacing: "var(--ls-body-md)", color: "var(--status-error, #ef4444)" } }, "This permanently deletes your account"),
        h("ul", { style: { margin: 0, paddingLeft: "var(--space-lg)", font: "var(--type-body-md)", letterSpacing: "var(--ls-body-md)", display: "flex", flexDirection: "column", gap: "4px" } },
          h("li", null, "Your 2 claimed pages revert to generated-unclaimed (they stay public and claimable)."),
          h("li", null, "Your lists, stack pages and registered interest are erased."),
          h("li", null, "This cannot be undone."))),
      reauthed
        ? h("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-md)" } },
            h(TextInput, { label: "Type your username to confirm", name: "login", placeholder: "maghraby" }),
            h("button", { type: "button", onClick: function () { if (ctx.signOut) ctx.signOut(); ctx.go({ name: "discover" }); },
              style: { alignSelf: "flex-start", cursor: "pointer", background: "var(--status-error, #ef4444)", border: "none", color: "#fff", borderRadius: "var(--radius-sm)", padding: "var(--space-sm) var(--space-lg)", font: "var(--type-body-md-strong)", letterSpacing: "var(--ls-body-md)" } },
              "Permanently delete my account"))
        : h("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-sm)" } },
            h(Note, null, "For your security, re-authenticate before deleting."),
            h(Button, { variant: "outline", onClick: function () { setReauthed(true); } }, "Re-authenticate to continue")));
  }

  /* ── Claim flow ───────────────────────────────────────────────────────────
     Overrides the compiled ClaimFlow (the old-chrome 820px spec-explainer wizard).
     The conversion moment that turns a Backer into a Maintainer and a generated
     Page into an Active one — rebuilt into the card system, value-first spine.
     STAGE 0: the four steps (sign in → install → verify → claimed) ported into the
     card idiom with craft — an emerald step rail, expo-out step entrances, the
     signature emerald spine on success. Behaviour is unchanged from the compiled
     flow (the Simulate toggles remain the prototype's engine, gated behind NV_DEV);
     the branch redesigns (identity-first recovery, parked org-approval, cold
     resolve, author-first success, pre-check) land in later stages. Resolved from
     LOCAL scope in screenFor — never window — so the DS bundle can't clobber it. */
  function slugProj(slug) {
    var i = slug.indexOf("/");
    return i < 0 ? { slug: slug, owner: slug, repo: slug, name: slug } : { slug: slug, owner: slug.slice(0, i), repo: slug.slice(i + 1), name: slug.slice(i + 1) };
  }
  /* Pending claims (Q12): a claim that has begun but not yet produced a grant —
     parked on org approval, or held as a contest challenger. The claimant is still
     a Backer, so it lives in Backer context (Home) with a resume link, and clears
     when the grant lands (migrating to the maintainer dashboard's pending actions). */
  function addPending(slug, kind) {
    window.PENDING_CLAIMS = window.PENDING_CLAIMS || [];
    if (!window.PENDING_CLAIMS.some(function (c) { return c.slug === slug; })) window.PENDING_CLAIMS.push({ slug: slug, kind: kind });
  }
  function clearPending(slug) {
    window.PENDING_CLAIMS = (window.PENDING_CLAIMS || []).filter(function (c) { return c.slug !== slug; });
  }
  function ClaimFlowV2(props) {
    var ctx = props.ctx;
    var Note = W("Note");
    /* Entry mode (Q5): in-context = arrived from a project page (route carries a
       slug), so the value pitch already happened there → open straight on verify.
       Cold self-serve = no referrer (no slug) → open on the value pitch, then a
       resolve step (pick from your admin repos, Q11) that folds the GitHub sign-in
       in, then the same verify gate. */
    var cold = !ctx.route.slug;
    var s6 = React.useState(cold ? null : (ctx.route.slug || ctx.focusSlug)), chosen = s6[0], setChosen = s6[1];
    var p = chosen ? (window.findProject(chosen) || slugProj(chosen)) : null;
    /* Pre-check (Q13): a claim on a retired or suppressed predecessor routes before
       the verify gate. For in-context entries we know the state at mount, so we open
       on the pre-check; cold entries hit it after resolve. */
    var predState = p ? ctx.claimState(p.slug) : null;
    var needsPrecheck = predState === "retired" || predState === "suppressed";
    var s0 = React.useState(cold ? "value" : (needsPrecheck ? "precheck" : "signin")), step = s0[0], setStep = s0[1];
    var s7 = React.useState("objection"), supBasis = s7[0], setSupBasis = s7[1];
    var s1 = React.useState("admin"), permission = s1[0], setPermission = s1[1];
    var s2 = React.useState(false), contested = s2[0], setContested = s2[1];
    var s3 = React.useState("solo"), orgApproval = s3[0], setOrgApproval = s3[1];
    var s4 = React.useState(false), linkCopied = s4[0], setLinkCopied = s4[1];
    var s5 = React.useState(false), interested = s5[0], setInterested = s5[1];
    var pageClaimed = p ? ctx.claimState(p.slug) === "active" : false;

    var eyebrow = { font: "var(--type-mono-label)", letterSpacing: "var(--ls-mono-label)", textTransform: "uppercase", color: "var(--volt-text-500)" };
    var CARD = { border: "1px solid var(--volt-border)", background: "var(--volt-surface)", borderRadius: "12px", padding: "var(--space-2xl)" };
    var bodyTxt = { margin: 0, font: "var(--type-body-md)", letterSpacing: "var(--ls-body-md)", color: "var(--text-secondary)" };
    /* The verify-gate rail. Cold entries open the gate with "Repo" (resolve) where
       in-context entries open with "Sign in" — sign-in is folded into resolve for
       the cold path (Q11), so both rails are three nodes. */
    var railSteps = cold ? [["resolve", "Repo"], ["install", "Install"], ["check", "Verify"]] : [["signin", "Sign in"], ["install", "Install"], ["check", "Verify"]];
    var order = cold ? { value: -1, resolve: 0, install: 1, parked: 1, check: 2, done: 3 } : { signin: 0, install: 1, parked: 1, check: 2, done: 3 };
    var cur = order[step];

    function rail() {
      if (step === "value" || step === "precheck") return null;
      var labels = railSteps;
      var nodes = [];
      labels.forEach(function (l, i) {
        var done = i < cur, on = i === cur;
        nodes.push(h("div", { key: l[0], className: "nv-steprail-node " + (done ? "done" : on ? "on" : "") },
          h("span", { className: "nv-steprail-dot" }, done ? "✓" : String(i + 1)),
          h("span", null, l[1])));
        if (i < 2) nodes.push(h("div", { key: "bar" + i, className: "nv-steprail-bar " + (i < cur ? "done" : "") }));
      });
      return h("div", { className: "nv-steprail" }, nodes);
    }

    function permRow(k, v) {
      return h("tr", { key: k, style: { borderTop: "1px solid var(--volt-border)" } },
        h("td", { style: { padding: "var(--space-sm) 0", font: "var(--type-body-md)", letterSpacing: "var(--ls-body-md)" } }, k),
        h("td", { style: { padding: "var(--space-sm) 0", textAlign: "right", font: "var(--type-mono-label)", letterSpacing: "var(--ls-mono-label)", textTransform: "uppercase", color: v === "Read" ? "var(--volt-emerald)" : "var(--volt-text-500)" } }, v));
    }
    function chip(label, active, onClick) {
      return h("button", { key: label, className: "nv-chip", onClick: onClick, style: { border: "1px solid var(--volt-border)", background: active ? "rgba(0,202,142,0.14)" : "transparent", color: active ? "var(--volt-emerald)" : "var(--text-secondary)", borderRadius: "var(--radius-xs)", padding: "var(--space-xs) var(--space-md)", font: "var(--type-mono-label)", letterSpacing: "var(--ls-mono-label)", textTransform: "uppercase", cursor: "pointer" } }, label);
    }
    function simBox(label, chips) {
      return window.NV_DEV ? h("div", { style: Object.assign({}, col("var(--space-sm)"), { padding: "var(--space-md)", border: "1px dashed var(--volt-border)", borderRadius: "10px" }) },
        h("span", { style: Object.assign({}, eyebrow, { color: "var(--volt-text-500)" }) }, label),
        h("div", { style: { display: "flex", gap: "var(--space-xs)", flexWrap: "wrap" } }, chips)) : null;
    }
    function copyRow(url) {
      return h("div", { style: { display: "flex", gap: "var(--space-xs)", alignItems: "stretch", flexWrap: "wrap" } },
        h("code", { style: { flex: "1 1 220px", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", padding: "var(--space-sm) var(--space-md)", border: "1px solid var(--volt-border)", borderRadius: "8px", background: "var(--volt-void)", font: "var(--type-mono-label)", letterSpacing: "var(--ls-mono-label)", color: "var(--text-secondary)" } }, url),
        h(Button, { variant: "outline", onClick: function () { setLinkCopied(true); } }, linkCopied ? "Copied ✓" : "Copy link"));
    }

    function motionStat(label, value, moving) {
      return h("div", { style: col("2px") },
        h("span", { style: { font: "var(--type-mono-label)", letterSpacing: "var(--ls-mono-label)", textTransform: "uppercase", color: "var(--volt-text-500)" } }, label),
        h("span", { style: { display: "flex", alignItems: "baseline", gap: "6px", font: "var(--type-body-md-strong)", letterSpacing: "var(--ls-body-md)", color: "var(--text-primary)" } }, value, moving ? h("span", { style: { font: "var(--type-mono-label)", color: "var(--volt-emerald)" } }, moving) : null));
    }
    function sparkline(w, hgt) {
      w = w || 132; hgt = hgt || 40;
      var pts = [[0, 30], [18, 26], [36, 28], [54, 19], [72, 21], [90, 12], [108, 9], [130, 3]];
      var d = pts.map(function (pt) { return (pt[0] / 130 * (w - 6) + 3).toFixed(1) + "," + (pt[1] / 32 * (hgt - 6) + 3).toFixed(1); });
      var last = d[d.length - 1].split(",");
      return h("svg", { className: "nv-spark", viewBox: "0 0 " + w + " " + hgt, width: w, height: hgt, fill: "none", "aria-hidden": "true", style: { overflow: "visible" } },
        h("polyline", { className: "nv-spark-line", points: d.join(" "), stroke: "var(--volt-emerald)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }),
        h("circle", { className: "nv-spark-dot", cx: last[0], cy: last[1], r: 3, fill: "var(--volt-emerald)" }));
    }
    function repoRow(slug, inCatalog) {
      return h("button", { key: slug, className: "nv-claim-choice", onClick: function () { if (ctx.signIn && !ctx.signedIn) ctx.signIn(); setChosen(slug); var stt = ctx.claimState(slug); setStep(stt === "retired" || stt === "suppressed" ? "precheck" : "install"); }, style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-md)", width: "100%", textAlign: "left", border: "1px solid var(--volt-border)", background: "var(--volt-surface)", borderRadius: "12px", padding: "var(--space-lg) var(--space-xl)", cursor: "pointer", color: "var(--text-primary)" } },
        h("span", { style: col("2px") },
          h("span", { style: { font: "var(--type-body-md-strong)", letterSpacing: "var(--ls-body-md)" } }, slug),
          h("span", { style: { font: "var(--type-mono-label)", letterSpacing: "var(--ls-mono-label)", textTransform: "uppercase", color: inCatalog ? "var(--volt-text-500)" : "var(--volt-emerald)" } }, inCatalog ? "In the catalog" : "New page · we'll generate it")),
        h("span", { className: "nv-arrow", style: { color: "var(--volt-text-500)" } }, "→"));
    }

    var content;
    var afterPrecheck = cold ? "install" : "signin";
    if (step === "precheck") {
      /* Q13 — read the predecessor state before the gate. Retired → claim afresh;
         suppressed/own-behalf → reactivate (edge 3); suppressed/objection → hard
         stop + legal contact, before any sign-in. */
      if (predState === "retired") {
        content = h("div", { style: col("var(--space-lg)") },
          h("div", { style: Object.assign({}, CARD, col("var(--space-md)")) },
            h("span", { style: eyebrow }, "This project was retired"),
            h("p", { style: bodyTxt }, p.owner + "/" + p.repo + " was retired, and its record stays as history — a retired record doesn't reopen. But the repository can be claimed afresh: a new, Active page under the same name."),
            h("div", null, h(Button, { variant: "primary", size: "lg", onClick: function () { setStep(afterPrecheck); } }, "Claim it afresh →"))),
          h(Note, null, "The dated retired record remains indexed; claiming creates a new binding, it doesn't revive the old one."));
      } else {
        var objection = supBasis === "objection";
        content = h("div", { style: col("var(--space-lg)") },
          simBox("Prototype · why was it suppressed?", [
            chip("own request", !objection, function () { setSupBasis("own-behalf"); }),
            chip("third-party objection", objection, function () { setSupBasis("objection"); })
          ]),
          objection
            ? h("div", { style: Object.assign({}, CARD, col("var(--space-md)")) },
                h("span", { style: eyebrow }, "This page is suppressed"),
                h("p", { style: bodyTxt }, "This page was suppressed after a third-party objection. At MVP that's terminal — a claim can't reopen it, because the platform won't hand the reversal to the party the suppression was granted against. We'll route you to our legal contact."),
                h("div", null, h(Button, { variant: "outline", onClick: function () { ctx.go({ name: "methodology" }); } }, "Read the legal route")))
            : h("div", { style: Object.assign({}, CARD, col("var(--space-md)")) },
                h("span", { style: eyebrow }, "You suppressed this page" ),
                h("p", { style: bodyTxt }, "This page was suppressed at your own request. A verified claim reactivates it — suppressed → Active — because claiming was consent and consent is yours to give again."),
                h("div", null, h(Button, { variant: "primary", size: "lg", onClick: function () { setStep(afterPrecheck); } }, "Reactivate by claiming →"))));
      }
    } else if (step === "value") {
      /* The value pitch (Q2/Q3), shown only on the cold self-serve entry. Honest
         per ADR 0007: demand is MOTION, not a roster — no exact small counts, no
         who, no money. The one primary object gets the emerald spine. */
      content = h("div", { style: col("var(--space-lg)") },
        h("div", { className: "nv-claim-spine", style: Object.assign({}, CARD, col("var(--space-lg)")) },
          h("span", { style: Object.assign({}, eyebrow, { color: "var(--volt-emerald)" }) }, "Claim your project"),
          h("h2", { style: { margin: 0, font: "var(--type-display-md)", letterSpacing: "var(--ls-display-md)", textWrap: "balance" } }, "See how interest is moving — and make the page yours."),
          h("p", { style: bodyTxt }, "notavibe already generated a page for your project from public signals. Claim it to watch demand move — how it trends in lists, stacks and interest over time — and to author the page yourself instead of leaving it on auto-generated data."),
          h("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--space-2xl)", flexWrap: "wrap" } },
            h("div", { style: { display: "flex", gap: "var(--space-2xl)", flexWrap: "wrap" } },
              motionStat("In lists", "trending", "↑"),
              motionStat("Interest", "this month", "↑"),
              motionStat("In stacks", "watched", null)),
            h("div", { style: col("4px", { alignItems: "flex-end" }) },
              sparkline(140, 44),
              h("span", { style: { font: "var(--type-mono-label)", letterSpacing: "var(--ls-mono-label)", textTransform: "uppercase", color: "var(--volt-text-500)" } }, "Interest · 8 weeks"))),
          h("div", null, h(Button, { variant: "primary", size: "lg", onClick: function () { setStep("resolve"); } }, "Find your project →"))),
        h(Note, null, "Metadata (read) only, no write access, ever. No money changes hands yet — claiming flips the interest control from “Would you fund this?” to “I'd fund this.” Illustrative data."));
    } else if (step === "resolve") {
      /* Resolve which repo (Q11): connect GitHub, then pick from the repos you
         administer — pre-filtered to what you can actually claim. An uncataloged
         pick generates its page (claim-creates-page). Sign-in is folded in here. */
      var mine = (window.PROJECTS || []).filter(function (x) { return ctx.claimState(x.slug) === "generated"; }).slice(0, 3).map(function (x) { return x.slug; });
      if (!ctx.signedIn) {
        content = h("div", { style: col("var(--space-lg)") },
          h("div", { style: Object.assign({}, CARD, col("var(--space-md)")) },
            h("span", { style: eyebrow }, "Step · Connect GitHub"),
            h("p", { style: bodyTxt }, "Connect GitHub so we can list the repositories you administer. Claiming needs GitHub — metadata (read) only, no write access, ever."),
            h("div", null, h(Button, { variant: "primary", size: "lg", onClick: function () { if (ctx.signIn) ctx.signIn(); }, icon: h(Icon, { name: "github", size: 16, strokeColor: "#fff" }) }, "Connect GitHub"))));
      } else {
        content = h("div", { style: col("var(--space-lg)") },
          h("div", { style: col("var(--space-sm)") },
            h("span", { style: eyebrow }, "Your repositories · admin only"),
            h("p", { style: bodyTxt }, "Pick the project you want to claim. This list is only the repositories you administer, so anything here is claimable.")),
          h("div", { style: col("var(--space-sm)") },
            mine.map(function (s) { return repoRow(s, true); }).concat([repoRow("maghraby/rate-limiter", false)])),
          h(Note, null, "Don't see it? A repo outside the catalog still gets a page the moment you claim it — the floor bounds the catalog, not who may join."));
      }
    } else if (step === "signin") {
      content = h("div", { style: col("var(--space-lg)") },
        h("div", { style: Object.assign({}, CARD, col("var(--space-md)")) },
          h("span", { style: eyebrow }, "Step 1 · GitHub"),
          h("p", { style: bodyTxt }, "Sign in with GitHub so we can check your permission on this repository. Claiming a page needs GitHub — metadata (read) only, no write access, ever."),
          h("div", null, h(Button, { variant: "primary", size: "lg", onClick: function () { if (ctx.signIn) ctx.signIn(); setStep("install"); } }, "Continue with GitHub"))),
        h(Note, null, "A page below the selection floor, outside the wedge, or never reached can still be claimed — the floor bounds the catalog, not who may join."));
    } else if (step === "install") {
      content = h("div", { style: col("var(--space-lg)") },
        simBox("Prototype · will your org approve solo?", [
          chip("solo install", orgApproval === "solo", function () { setOrgApproval("solo"); }),
          chip("needs org approval", orgApproval !== "solo", function () { setOrgApproval("needs-approval"); })
        ]),
        h("div", { style: Object.assign({}, CARD, col("var(--space-lg)")) },
          h("span", { style: eyebrow }, "Step 2 · Claim App permissions"),
          h("table", { style: { borderCollapse: "collapse", width: "100%" } },
            h("tbody", null, permRow("Metadata", "Read"), permRow("Contents", "No access"), permRow("Issues", "No access"), permRow("Pull requests", "No access"), permRow("Actions", "No access"))),
          h(Note, null, "The App install is the ownership proof — GitHub only lets a repo admin perform it. Metadata (read) only. No write access, ever."),
          h("div", null, h(Button, { variant: "primary", size: "lg", onClick: function () { if (orgApproval === "solo") { setStep("check"); } else { addPending(p.slug, "parked"); setStep("parked"); } } }, "Install on " + p.owner + "/" + p.repo))));
    } else if (step === "parked") {
      content = h("div", { style: col("var(--space-lg)") },
        h("div", { style: Object.assign({}, CARD, col("var(--space-md)")) },
          h("span", { style: eyebrow }, "Waiting on your org"),
          h("p", { style: bodyTxt }, "GitHub needs an owner of " + p.owner + " to approve the notavibe Claim App before the install completes. We've requested it — you'll finish the moment it's approved, no need to start over."),
          copyRow("notavibe.dev/approve/" + p.owner),
          h(Note, null, "This claim is saved on your Home while it waits — an act-by step never depends on email alone. Send the link to an org owner to speed it up.")),
        simBox("Prototype · the org owner responds", [
          chip("approve now", false, function () { setStep("check"); })
        ]));
    } else if (step === "check") {
      var sim = simBox("Prototype · simulate the GitHub answer", [
        chip("admin", permission === "admin", function () { setPermission("admin"); }),
        chip("maintain", permission === "maintain", function () { setPermission("maintain"); }),
        chip("write", permission === "write", function () { setPermission("write"); }),
        chip("existing claim", contested, function () { setContested(!contested); })
      ]);

      var verdict;
      if (permission !== "admin") {
        /* Q6 identity-first recovery — the admin check fails for two very different
           reasons the copy must separate: the wrong GitHub identity (personal vs
           work, common), or genuinely not an admin. Lead with connecting another
           identity; the co-maintainer/link fallback is secondary and claim-state
           aware (Q7 — an unclaimed page has no grantor). */
        var fallback = pageClaimed
          ? h("div", { style: col("var(--space-sm)") },
              h("span", { style: eyebrow }, "Not an admin anywhere?"),
              h("p", { style: bodyTxt }, "This page is held by its maintainer. Ask them for a co-maintainer grant — granted inside notavibe and accepted by you, never auto-synced from GitHub."))
          : h("div", { style: col("var(--space-sm)") },
              h("span", { style: eyebrow }, "Not an admin anywhere?"),
              h("p", { style: bodyTxt }, "Only a repo admin can claim " + p.owner + "/" + p.repo + ". Send whoever admins it this link, or register your interest so you're counted — and told if it's claimed."),
              copyRow("notavibe.dev/claim/" + p.slug),
              h("div", null, h(Button, { variant: "outline", onClick: function () { setInterested(true); } }, interested ? "Interest registered ✓" : "Register interest instead")));
        verdict = h("div", { style: Object.assign({}, CARD, col("var(--space-lg)")) },
          h("div", { style: col("var(--space-md)") },
            h("span", { style: eyebrow }, "Not an admin under @maghraby"),
            h("p", { style: bodyTxt }, ["Your permission on " + p.owner + "/" + p.repo + " is ", h("b", { key: "b", style: { fontWeight: 500, color: "var(--text-primary)" } }, permission), ", and a claim needs ", h("b", { key: "a", style: { fontWeight: 500, color: "var(--text-primary)" } }, "admin"), ". Hold admin under a different GitHub account? Personal-vs-work is common — connect the right one."]),
            h("div", null, h(Button, { variant: "primary", size: "lg", onClick: function () { setPermission("admin"); }, icon: h(Icon, { name: "github", size: 16, strokeColor: "#fff" }) }, "Connect another GitHub account"))),
          h("div", { style: { height: 1, background: "var(--volt-border)" } }),
          fallback);
      } else if (contested) {
        verdict = h("div", { style: Object.assign({}, CARD, col("var(--space-md)")) },
          h("span", { style: eyebrow }, "This page is already claimed"),
          h("p", { style: bodyTxt }, "Another verified admin claimed it first. You can open a contest."),
          h(Note, null, "First verified claim wins. Contests ride the 72-hour SLA; revoke-and-reset is the only remedy; no forced transfer; the page stays live during review."),
          h("div", null, h(Button, { variant: "primary", onClick: function () { addPending(p.slug, "contest"); ctx.go({ name: "maintainer.contest" }); } }, "File a contest with evidence")));
      } else {
        verdict = h("div", { style: Object.assign({}, CARD, col("var(--space-md)")) },
          h("span", { style: eyebrow }, "Check passed"),
          h("p", { style: bodyTxt }, "Numeric repository and owner IDs stored with a slug snapshot. The identity anchor is the repository ID, not the slug."),
          h("div", null, h(Button, { variant: "primary", size: "lg", onClick: function () { ctx.setClaimState(p.slug, "active"); clearPending(p.slug); setStep("done"); } }, "Claim " + p.owner + "/" + p.repo)));
      }
      content = h("div", { style: col("var(--space-lg)") }, sim, verdict);
    } else {
      /* Success (Q9): the primary action is AUTHOR — the page is Active but still
         wears generated content, and this is peak engagement. The demand reveal is
         the reward FLOURISH (rises in a beat after the card), honest per ADR 0007:
         motion, never a roster or exact small count. */
      var activeGrants = (window.PROJECTS || []).filter(function (x) { return ctx.claimState(x.slug) === "active"; }).length;
      var firstGrant = activeGrants <= 1; /* Q10 — the Backer just became a Maintainer */
      var reveal = h("div", { className: "nv-reveal", style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-2xl)", flexWrap: "wrap", padding: "var(--space-md) 0", borderTop: "1px solid var(--volt-border)", borderBottom: "1px solid var(--volt-border)" } },
        h("div", { style: { display: "flex", gap: "var(--space-2xl)", flexWrap: "wrap" } },
          motionStat("In lists", "trending", h("span", { className: "nv-reveal-up" }, "↑")),
          motionStat("Interest", "up this month", h("span", { className: "nv-reveal-up" }, "↑")),
          motionStat("In stacks", "watched", null)),
        sparkline(120, 40));
      var onboarding = firstGrant ? h("div", { style: Object.assign({}, CARD, col("var(--space-md)")) },
        h("span", { style: eyebrow }, "You're a maintainer now"),
        h("div", { style: col("var(--space-sm)") },
          h("p", { style: bodyTxt }, ["", h("b", { key: "a", style: { color: "var(--text-primary)", fontWeight: 500 } }, "Switch contexts"), " — a role switcher now flips you between your Backer week and your maintainer view."]),
          h("p", { style: bodyTxt }, ["", h("b", { key: "b", style: { color: "var(--text-primary)", fontWeight: 500 } }, "One page at a time"), " — claim more and a project switcher scopes the maintainer view to each."]),
          h("p", { style: bodyTxt }, ["", h("b", { key: "c", style: { color: "var(--text-primary)", fontWeight: 500 } }, "No payouts yet"), " — you can keep the page accurate and watch demand; funding is foreshadowed, and the interest control now reads “I'd fund this.”"]))) : null;
      content = h("div", { style: col("var(--space-lg)") },
        h("div", { className: "nv-claim-spine", style: Object.assign({}, CARD, col("var(--space-lg)")) },
          h("span", { style: Object.assign({}, eyebrow, { color: "var(--volt-emerald)" }) }, "Claimed"),
          h("h2", { style: { margin: 0, font: "var(--type-display-md)", letterSpacing: "var(--ls-display-md)", textWrap: "balance" } }, "You hold " + p.owner + "/" + p.repo),
          h("p", { style: bodyTxt }, "Here's what was waiting for you —"),
          reveal,
          h("p", { style: bodyTxt }, "The page is Active, but it still shows auto-generated data. Make it yours: fix the vocabulary, write the profile, speak for your project."),
          h("div", { style: { display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" } },
            h(Button, { variant: "primary", size: "lg", onClick: function () { ctx.go({ name: "maintainer.profile", slug: p.slug }); } }, "Author your page →"),
            h(Button, { variant: "outline", onClick: function () { ctx.go({ name: "maintainer.dashboard" }); } }, "See the demand"))),
        onboarding,
        h(Note, null, "Webhooks fired: claim.state_changed, project.verification_changed. Repo rename or transfer re-derives the slug with a 301."));
    }

    var titleText = p ? (p.owner + "/" + p.repo) : (step === "value" ? "Claim your project" : "Find your repository");
    var subText = p ? "The page already exists. Claiming binds a human to it — it doesn't create it."
      : (step === "value" ? "Take authorship of the page notavibe already generated for your work." : "Pick the repository you administer.");
    return h("div", { style: { maxWidth: "680px", width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-2xl)", padding: "var(--space-section) var(--space-2xl)" } },
      h("header", { style: col("var(--space-sm)") },
        h("span", { style: eyebrow }, "Claim a page"),
        h("h1", { style: { margin: 0, font: "var(--type-display-lg)", letterSpacing: "var(--ls-display-lg)", textWrap: "balance" } }, titleText),
        h("span", { style: { font: "var(--type-caption)", color: "var(--text-secondary)" } }, subText)),
      rail(),
      h("div", { className: "nv-claim-step", key: step }, content));
  }

  /* ── Maintainer dashboard ─────────────────────────────────────────────────
     Overrides the compiled MaintainerDashboard (old-chrome StatsCards + primary
     accent) into the card system. The Maintainer-context landing: §9.3's two
     compositions — the discovery-analytics roll-up (the claim hook) + pending
     actions across projects — plus the "what's not here" honesty strip. All
     aggregate, no visitor-level data; the interest count renders with its stated
     constraint, never a revenue projection. This is where "See the demand" lands
     from a claim, so the analytics carry the same demand-as-motion language (ADR
     0007): trend and breakdown, not a roster, and the below-4 mask holds. */
  function MaintainerDashboardV2(props) {
    var ctx = props.ctx;
    var Note = W("Note");
    var p = window.findProject("vitest-dev/vitest") || window.PROJECTS[0];
    var lapsed = ctx.claimState(p.slug) === "lapsed";
    var mask = window.maskNumber || function (n) { return n; };
    var eyebrow = { font: "var(--type-mono-label)", letterSpacing: "var(--ls-mono-label)", textTransform: "uppercase", color: "var(--volt-text-500)" };
    var caption = { font: "var(--type-caption)", color: "var(--text-secondary)" };
    var CARD = { border: "1px solid var(--volt-border)", background: "var(--volt-surface)", borderRadius: "12px", padding: "var(--space-2xl)" };
    var wrap = { maxWidth: "1000px", width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-3xl)", padding: "var(--space-section) var(--space-2xl)" };

    function sparkSvg() {
      var pts = "3,26 20,22 37,24 54,16 71,17 88,10 105,8 128,3";
      return h("svg", { viewBox: "0 0 131 30", width: "100%", height: 34, preserveAspectRatio: "none", fill: "none", "aria-hidden": "true", style: { overflow: "visible", marginTop: "4px" } },
        h("polyline", { className: "nv-spark-line", points: pts, stroke: "var(--volt-emerald)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", vectorEffect: "non-scaling-stroke" }),
        h("circle", { className: "nv-spark-dot", cx: 128, cy: 3, r: 3, fill: "var(--volt-emerald)" }));
    }
    function tile(label, value, cap, spark) {
      return h("div", { style: Object.assign({}, CARD, col("var(--space-xs)")) },
        h("span", { style: eyebrow }, label),
        h("span", { style: { font: "var(--type-display-md)", letterSpacing: "var(--ls-display-md)" } }, value),
        spark ? sparkSvg() : null,
        h("span", { style: caption }, cap));
    }
    function bar(label, pct) {
      return h("div", { key: label, style: col("4px") },
        h("div", { style: { display: "flex", justifyContent: "space-between", font: "var(--type-caption)" } },
          h("span", null, label), h("span", { style: { color: "var(--text-secondary)" } }, pct + "%")),
        h("div", { style: { height: "6px", background: "var(--volt-void)", borderRadius: "3px", overflow: "hidden" } },
          h("div", { style: { width: pct + "%", height: "100%", background: "var(--volt-emerald)", borderRadius: "3px" } })));
    }

    var header = h("header", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "var(--space-lg)", flexWrap: "wrap" } },
      h("div", { style: col("var(--space-sm)") },
        h("span", { style: eyebrow }, "Maintainer · Maya"),
        h("h1", { style: { margin: 0, font: "var(--type-display-lg)", letterSpacing: "var(--ls-display-lg)", textWrap: "balance" } }, p.owner + "/" + p.repo),
        h("span", { style: caption }, "Aggregate discovery analytics · illustrative data")),
      h("label", { style: col("4px") },
        h("span", { style: eyebrow }, "Project"),
        h("select", { style: { border: "1px solid var(--volt-border)", background: "var(--volt-surface)", color: "var(--text-primary)", borderRadius: "8px", padding: "var(--space-sm) var(--space-md)", font: "var(--type-body-md)", letterSpacing: "var(--ls-body-md)", cursor: "pointer" } },
          h("option", null, p.owner + "/" + p.repo), h("option", null, "unjs/unbuild"))));

    var pending = lapsed
      ? h("div", { className: "nv-claim-spine", style: Object.assign({}, CARD, col("var(--space-md)")) },
          h("span", { style: Object.assign({}, eyebrow, { color: "var(--volt-emerald)" }) }, "Pending action · act by day 30"),
          h("p", { style: { margin: 0, font: "var(--type-body-md)", letterSpacing: "var(--ls-body-md)", color: "var(--text-secondary)" } }, "Re-verification is required. Uncured at day 30, this page becomes a dated catalog record and stays indexed."),
          h("div", null, h(Button, { variant: "primary", onClick: function () { ctx.setClaimState(p.slug, "active"); } }, "Re-verify now")),
          h(Note, null, "Surfaced in-app as well as by email, because an act-by clock may never depend solely on email delivery. No payout freeze, no held accruals, no billing — those are foreshadowed."))
      : h("div", { style: Object.assign({}, CARD, col("var(--space-sm)")) },
          h("span", { style: eyebrow }, "Pending actions · across projects"),
          h("span", { style: { font: "var(--type-body-md-strong)", letterSpacing: "var(--ls-body-md)" } }, "Nothing needs you right now"),
          h(Note, null, "This surface exists for three carried invariants: the default in-app notice posture, the delivery-failure fallback, and the 30-day cure clock."));

    var stats = h("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "var(--space-lg)" } },
      tile("Discovery volume", "3,180", "Page views · trending, 30 days", true),
      tile("Deck appearances", "412", "Times shown in a Your Deck"),
      tile("List membership", mask(p.listCount), "Lists containing this project"),
      tile("Stack membership", mask(p.stackCount), "Scans that matched it"));

    var interest = h("div", { style: Object.assign({}, CARD, col("var(--space-md)")) },
      h("span", { style: eyebrow }, "Interest register"),
      [["Subscriptions and tiers", p.interest.subscriptions], ["Bounties and escrow", p.interest.bounties]].map(function (r) {
        return h("div", { key: r[0], style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", borderTop: "1px solid var(--volt-border)", paddingTop: "var(--space-md)" } },
          h("span", { style: { font: "var(--type-body-md)", letterSpacing: "var(--ls-body-md)" } }, r[0]),
          h("span", { style: { font: "var(--type-display-md)", letterSpacing: "var(--ls-display-md)" } }, mask(r[1])));
      }),
      h("div", { style: { border: "1px solid var(--volt-border)", background: "var(--volt-void)", borderRadius: "10px", padding: "var(--space-lg)" } },
        h(Note, null, h("b", { style: { fontWeight: 500, color: "var(--text-primary)" } }, "What this count means."), " “I'd fund this” is not “I will pay $5 a month.” It is an expression of interest in a system that does not exist yet, from people who have committed nothing. It is never a revenue projection, implied or computed.")),
      h(Note, null, "Identities are never shown. No visitor-level data reaches a maintainer."));

    var referrers = h("div", { style: Object.assign({}, CARD, col("var(--space-md)")) },
      h("span", { style: eyebrow }, "Where discovery came from"),
      h("div", { style: col("var(--space-sm)") }, [["Search engines", 46], ["Direct", 21], ["Your Deck", 18], ["Lists and stack pages", 9], ["Editorial", 6]].map(function (r) { return bar(r[0], r[1]); })),
      h("div", { style: { display: "flex", gap: "var(--space-lg)", borderTop: "1px solid var(--volt-border)", paddingTop: "var(--space-md)" } },
        h("span", { style: caption }, "Human 71%"),
        h("span", { style: Object.assign({}, caption, { color: "var(--text-secondary)" }) }, "Crawler 29%")),
      h(Note, null, "Crawler and human traffic are split, not merged. Campaign traffic is absent from this panel by construction — the campaign wall."));

    var analytics = h("section", { style: col("var(--space-lg)") },
      h("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--space-md)", flexWrap: "wrap" } },
        h("span", { style: Object.assign({}, eyebrow, { color: "var(--volt-emerald)" }) }, "Discovery analytics — the claim hook"),
        h("span", { style: eyebrow }, "Aggregate only")),
      stats,
      h("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--space-lg)" } }, interest, referrers),
      h(Note, null, "Data only the platform holds, costing no payment rail. This roll-up is the reason a maintainer claims a page at all."));

    var absent = h("section", { style: col("var(--space-md)") },
      h("span", { style: eyebrow }, "What is not here"),
      h("div", { style: { display: "flex", gap: "var(--space-xs)", flexWrap: "wrap" } },
        ["Tiers & pricing", "Subscribers", "Payouts", "Bounties inbox", "Bounty detail", "Epoch create", "Epoch results", "Gates", "Posts & artifacts", "Campaigns", "Campaign detail"].map(function (x) {
          return h("span", { key: x, style: { font: "var(--type-mono-label)", letterSpacing: "var(--ls-mono-label)", textTransform: "uppercase", color: "var(--volt-text-500)", border: "1px solid var(--volt-border)", borderRadius: "6px", padding: "4px 9px" } }, x);
        })),
      h(Note, null, "No money surfaces of any kind. Maintainer campaigns are out too — a lightweight maintainer platform does not ship an ad panel."));

    return h("div", { style: wrap }, header, pending, analytics, absent);
  }

  /* ── Maintainer surfaces (profile · reach · contest · api · settings) ──────
     The standing per-project surfaces, ported into the card system to match the
     dashboard and the claim flow. Content stays spec-faithful (§8.5, §9.1–9.3);
     every honesty rule is preserved verbatim. Shared card-system helpers below. */
  var MEB = { font: "var(--type-mono-label)", letterSpacing: "var(--ls-mono-label)", textTransform: "uppercase", color: "var(--volt-text-500)" };
  var MCAP = { font: "var(--type-caption)", color: "var(--text-secondary)" };
  var MCARD = { border: "1px solid var(--volt-border)", background: "var(--volt-surface)", borderRadius: "12px", padding: "var(--space-2xl)" };
  var MBODY = { margin: 0, font: "var(--type-body-md)", letterSpacing: "var(--ls-body-md)", color: "var(--text-secondary)" };
  function mWrap(w) { return { maxWidth: (w || 680) + "px", width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-2xl)", padding: "var(--space-section) var(--space-2xl)" }; }
  function mHeader(eb, title, sub) {
    return h("header", { style: col("var(--space-sm)") },
      h("span", { style: MEB }, eb),
      h("h1", { style: { margin: 0, font: "var(--type-display-lg)", letterSpacing: "var(--ls-display-lg)", textWrap: "balance" } }, title),
      sub ? h("span", { style: MCAP }, sub) : null);
  }
  function mField(label, o) {
    o = o || {};
    var el = o.multiline
      ? h("textarea", { className: "nv-field", rows: o.rows || 3, defaultValue: o.value || "", placeholder: o.placeholder || "" })
      : h("input", { className: "nv-field", defaultValue: o.value || "", placeholder: o.placeholder || "" });
    return h("label", { key: label, style: col("6px") }, h("span", { style: MEB }, label), el, o.hint ? h("span", { style: MCAP }, o.hint) : null);
  }
  function mBadge(t) {
    return h("span", { key: t, style: { font: "var(--type-mono-label)", letterSpacing: "var(--ls-mono-label)", textTransform: "uppercase", color: "var(--volt-text-500)", border: "1px solid var(--volt-border)", borderRadius: "6px", padding: "4px 9px", whiteSpace: "nowrap" } }, t);
  }
  function mSparkSvg() {
    return h("svg", { viewBox: "0 0 131 30", width: "100%", height: 34, preserveAspectRatio: "none", fill: "none", "aria-hidden": "true", style: { overflow: "visible", marginTop: "4px" } },
      h("polyline", { className: "nv-spark-line", points: "3,26 20,22 37,24 54,16 71,17 88,10 105,8 128,3", stroke: "var(--volt-emerald)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", vectorEffect: "non-scaling-stroke" }),
      h("circle", { className: "nv-spark-dot", cx: 128, cy: 3, r: 3, fill: "var(--volt-emerald)" }));
  }
  function mTile(label, value, cap, spark) {
    return h("div", { key: label, style: Object.assign({}, MCARD, col("var(--space-xs)")) },
      h("span", { style: MEB }, label),
      h("span", { style: { font: "var(--type-display-md)", letterSpacing: "var(--ls-display-md)" } }, value),
      spark ? mSparkSvg() : null,
      h("span", { style: MCAP }, cap));
  }

  function MaintainerProfileV2(props) {
    var Note = W("Note");
    var p = window.findProject("vitest-dev/vitest") || window.PROJECTS[0];
    return h("div", { style: mWrap(680) },
      mHeader("Discovery presence — profile", "Keep the page accurate", "This is what visitors and the AEO composition read — make it yours instead of leaving it on inferred data."),
      h("div", { style: Object.assign({}, MCARD, col("var(--space-lg)")) },
        mField("Answer-first summary", { multiline: true, rows: 2, value: p.description, hint: "This sentence is what the AEO composition quotes. One sentence." }),
        h("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-lg)" } },
          (window.VOCAB_DIMENSIONS || []).map(function (d) { return mField(d, { value: p.vocab[d] }); })),
        h(Note, null, "Your declared vocabulary replaces whatever the pipeline inferred. No maintainer-editable field feeds ranking — that is what keeps this surface from becoming a placement lever."),
        h("div", null, h(Button, { variant: "primary" }, "Save profile"))),
      h("section", { style: col("var(--space-md)") },
        h("span", { style: MEB }, "Peer recommendations you have authored"),
        h("div", { style: Object.assign({}, MCARD, col("var(--space-sm)")) },
          h("span", { style: { font: "var(--type-body-md)", letterSpacing: "var(--ls-body-md)" } }, "“Does the boring part of shipping a library correctly.”"),
          h("span", { style: MCAP }, "About unjs/unbuild · rendered on their page, attributed to yours")),
        h(Note, null, "Claimed projects only, in both directions. The attribution is the mechanism — the growth comes from your audience seeing it.")));
  }

  function MaintainerReachV2(props) {
    var Note = W("Note");
    return h("div", { style: mWrap(820) },
      mHeader("Discovery presence — reach", "Who discovered you", null),
      h(Note, null, "Aggregate only, at day granularity. There is no visitor-level view here and never will be."),
      h("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--space-lg)" } },
        mTile("Discovery volume", "3,180", "Page views · 30 days", true),
        mTile("Deck appearances", "412", "Times shown in a Your Deck"),
        mTile("Crawler share", "29%", "Split from human traffic")));
  }

  function MaintainerContestV2(props) {
    var fs = React.useState(false), filed = fs[0], setFiled = fs[1];
    var Note = W("Note");
    return h("div", { style: mWrap(680) },
      mHeader("Claim contest — evidence & outcome", "Contest on unjs/unbuild", null),
      h("div", { style: { display: "flex", gap: "var(--space-xs)", flexWrap: "wrap" } }, mBadge("72-hour SLA"), mBadge("Page stays live during review")),
      filed
        ? h("div", { className: "nv-claim-spine", style: Object.assign({}, MCARD, col("var(--space-md)")) },
            h("span", { style: Object.assign({}, MEB, { color: "var(--volt-emerald)" }) }, "Evidence filed"),
            h("p", { style: MBODY }, "Both parties file here and read the ruling here."),
            h(Note, null, "Revoke-and-reset is the only remedy — there is no forced transfer. Revoke-and-reset resets the contest, not the claim state."))
        : h("form", { onSubmit: function (e) { e.preventDefault(); setFiled(true); }, style: Object.assign({}, MCARD, col("var(--space-lg)")) },
            mField("Your evidence", { multiline: true, rows: 4, placeholder: "Why the current claim is wrong, with links." }),
            h("div", null, h(Button, { variant: "primary", size: "lg", type: "submit" }, "File evidence"))),
      h(Note, null, "A queue with an SLA and no counterparty surface would invert the report-control rule. This is that surface."));
  }

  function MaintainerApiV2(props) {
    var Note = W("Note");
    return h("div", { style: mWrap(760) },
      mHeader("API & webhooks", "Read API, MCP and webhooks", null),
      h("section", { style: col("var(--space-md)") },
        h("span", { style: MEB }, "Webhook events"),
        h("div", { style: col("var(--space-sm)") }, ["project.verification_changed", "claim.state_changed", "page.published", "page.suppressed"].map(function (e) {
          return h("div", { key: e, style: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--space-md)", border: "1px solid var(--volt-border)", background: "var(--volt-surface)", borderRadius: "10px", padding: "var(--space-md) var(--space-lg)" } },
            h("span", { style: { font: "var(--type-mono-label)", letterSpacing: "var(--ls-mono-label)", color: "var(--text-primary)" } }, e), mBadge("HMAC-signed"));
        })),
        h(Note, null, "Retries and a delivery log. No subscribers endpoint — there are no subscribers, which discharges the held consent instrument.")),
      h("section", { style: col("var(--space-md)") },
        h("span", { style: MEB }, "Catalog MCP · read-only"),
        h("pre", { style: { margin: 0, border: "1px solid var(--volt-border)", background: "var(--volt-void)", borderRadius: "12px", padding: "var(--space-lg)", overflowX: "auto", font: "var(--type-mono-caption)", letterSpacing: "var(--ls-mono-caption)", color: "var(--text-secondary)", lineHeight: 1.7 } },
          "search_projects\nget_project\ncompare_projects\nget_lists   # public lists only\n\n# suppressed projects are absent from every response\n# launches against schema v1"),
        h(Note, null, "Registry-listed. Auth: none or API key. Tool descriptions are treated as a poisoning surface.")));
  }

  function MaintainerSettingsV2(props) {
    var ctx = props.ctx, Note = W("Note");
    var p = window.findProject("vitest-dev/vitest") || window.PROJECTS[0];
    var name = p.owner + "/" + p.repo;
    var ts = React.useState(""), typed = ts[0], setTyped = ts[1];
    var rs = React.useState(ctx.claimState(p.slug) === "retired"), retired = rs[0], setRetired = rs[1];
    return h("div", { style: mWrap(680) },
      mHeader("Project settings", "Exits", null),
      h("div", { style: Object.assign({}, MCARD, col("var(--space-md)")) },
        h("span", { style: MEB }, "Voluntary retirement · the default"),
        h("p", { style: MBODY }, "The page becomes a dated catalog record and stays indexed. Dated facts survive frozen; live relationships and interactive surfaces close."),
        h("label", { style: col("6px") }, h("span", { style: MEB }, "Type " + name + " to confirm"),
          h("input", { className: "nv-field", value: typed, onChange: function (e) { setTyped(e.target.value); }, placeholder: name })),
        h("div", null, h(Button, { variant: "primary", disabled: typed !== name, onClick: function () { ctx.setClaimState(p.slug, "retired"); setRetired(true); } }, "Retire this page"))),
      h("div", { style: Object.assign({}, MCARD, col("var(--space-md)"), { opacity: retired ? 1 : 0.55 }) },
        h("span", { style: MEB }, "Suppress the retired record"),
        h("p", { style: MBODY }, "Also yours, because claiming was consent and consent is withdrawable. Nothing then renders on any surface."),
        h(Note, null, retired ? "Edge 4 — requires proving repository admin now. Writes a PageRequest (type: suppression, basis: own-behalf) so the lift trigger exists." : "Available once the page is retired. An Active page is never suppressed while claimed."),
        h("div", null, h(Button, { variant: "outline", disabled: !retired, onClick: function () { ctx.go({ name: "suppress.start", slug: p.slug }); } }, "Request suppression"))),
      h(Note, null, "Why the dated record yields here and not in the full-vision spec: no money flows in this version, so nothing was relied upon that the record protects."));
  }

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
    if (name === "backer.lists") return MyListsV2;
    if (name === "backer.list") return ListDetailV2;
    if (name === "list.public") return PublicListPageV2;
    if (name === "backer.activity") return BackerActivityV2;
    if (name === "stack.connect") return StackConnectV2;
    if (name === "stack.results") return ScanResultsV2;
    if (name === "backer.chat") return CurationChatV2;
    if (name === "signin") return SignInV2;
    if (name === "claim.start") return ClaimFlowV2;
    if (name === "maintainer.dashboard") return MaintainerDashboardV2;
    if (name === "maintainer.profile") return MaintainerProfileV2;
    if (name === "maintainer.reach") return MaintainerReachV2;
    if (name === "maintainer.contest") return MaintainerContestV2;
    if (name === "maintainer.api") return MaintainerApiV2;
    if (name === "maintainer.settings") return MaintainerSettingsV2;
    if (name === "account.identities") return AccountIdentities;
    if (name === "account.delete") return AccountDelete;
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

  /* ── AppNav (workspace sidebar) — overrides the compiled screens.js AppNav ──
     The standing side menu for the Backer / Maintainer surfaces. The compiled
     version was a flat, undifferentiated link list: a single grey box marked the
     active item, hover gave no feedback, the brand accent appeared nowhere in
     the nav body, and the long maintainer labels ("Discovery presence — profile")
     wrapped inside 232px. This rebuild keeps every destination and the three
     class hooks the responsive collapse depends on (nv-app-nav / nv-app-navlinks
     / nv-app-foot), and adds: sectioned hierarchy under mono eyebrows (the two
     long maintainer labels shorten to Profile / Reach under a "Discovery presence"
     header), an emerald active state carrying a sliding accent rail — the
     signature, echoing the Backer Home timeline spine and the Deck CTA's emerald
     spine so the nav reads as THIS product — custom expo-out motion on hover /
     focus / entrance, and the role switch rebuilt as a segmented control with a
     sliding thumb (the honest single-role Note is kept). All colour and motion
     live in classes, never inline, so the inline-style escape-hatch rules can't
     hijack them; motion is dropped under prefers-reduced-motion and in the
     collapsed top-strip. Wired from NotavibeShell by LOCAL reference (never
     window) so the DS bundle can't clobber it — same rule as the Backer surfaces. */
  (function injectAppNavCSS() {
    if (typeof document === "undefined" || document.getElementById("nv-appnav-css")) return;
    var s = document.createElement("style");
    s.id = "nv-appnav-css";
    var EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";
    s.textContent = [
      /* Link: the rail lives on ::before so it slides independently; the label
         nudges via padding-left, leaving transform free for the entrance. */
      ".nv-appnav-link{position:relative;display:block;text-decoration:none;",
      "font:var(--type-body-md);letter-spacing:var(--ls-body-md);color:var(--text-secondary);",
      "background:transparent;border-radius:var(--radius-md);padding:8px 12px;",
      "transition:color .3s " + EXPO + ",background .3s " + EXPO + ",padding-left .3s " + EXPO + ";}",
      ".nv-appnav-link::before{content:\"\";position:absolute;left:0;top:7px;bottom:7px;width:3px;",
      "border-radius:0 3px 3px 0;background:var(--volt-emerald);opacity:0;transform:scaleX(0);",
      "transform-origin:left center;transition:transform .4s " + EXPO + ",opacity .3s " + EXPO + ";}",
      ".nv-appnav-link:hover{color:var(--text-body);background:var(--hover-lighten-on-dark);padding-left:16px;}",
      ".nv-appnav-link:hover::before{opacity:.45;transform:scaleX(1);}",
      ".nv-appnav-link:focus-visible{outline:2px solid var(--volt-emerald);outline-offset:2px;}",
      ".nv-appnav-link--on{color:var(--volt-emerald);font:var(--type-body-md-strong);letter-spacing:var(--ls-body-md);background:var(--volt-emerald-08);}",
      ".nv-appnav-link--on::before,.nv-appnav-link--on:hover::before{opacity:1;transform:scaleX(1);}",
      ".nv-appnav-link--on:hover{color:var(--volt-emerald);background:var(--volt-emerald-10);}",
      /* Section eyebrow */
      ".nv-appnav-grouplabel{display:block;font:var(--type-mono-eyebrow);letter-spacing:var(--ls-mono-eyebrow);",
      "text-transform:uppercase;color:var(--volt-text-600);padding:0 12px;margin:18px 0 4px;}",
      /* Entrance stagger — opacity + lift, delay set inline from the index. Runs
         once per mount; the links are keyed by route, so they only remount when
         the workspace kind flips — it plays on entering a workspace, not on
         every in-workspace click. */
      "@keyframes nv-appnav-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}",
      ".nv-appnav-link,.nv-appnav-grouplabel{animation:nv-appnav-in .5s " + EXPO + " both;}",
      /* Role segment — sliding thumb, custom eased. */
      ".nv-appnav-seg{position:relative;display:flex;padding:4px;border:1px solid var(--volt-border);",
      "border-radius:var(--radius-md);background:var(--volt-void);}",
      ".nv-appnav-thumb{position:absolute;top:4px;bottom:4px;left:4px;width:calc((100% - 8px)/2);",
      "border-radius:calc(var(--radius-md) - 2px);background:var(--volt-surface);border:1px solid var(--volt-border);",
      "transition:transform .45s " + EXPO + ";}",
      ".nv-appnav-seg[data-active=\"maintainer\"] .nv-appnav-thumb{transform:translateX(100%);}",
      ".nv-appnav-seg button{position:relative;z-index:1;flex:1 1 0;min-width:0;background:transparent;border:none;",
      "cursor:pointer;padding:8px 4px;font:var(--type-mono-eyebrow);letter-spacing:var(--ls-mono-eyebrow);",
      "text-transform:uppercase;color:var(--text-secondary);transition:color .3s " + EXPO + ";}",
      ".nv-appnav-seg button[aria-pressed=\"true\"]{color:var(--text-body);}",
      ".nv-appnav-seg button:focus-visible{outline:2px solid var(--volt-emerald);outline-offset:2px;border-radius:var(--radius-sm);}",
      /* Admin variant — the admin chrome is a darker surface with its own text
         ramp, so reuse the rail / hover / active / focus from .nv-appnav-link
         but retune colour and scale for it, and swap the per-item entrance for a
         per-group cascade (14 links stagger cleaner by group than one-by-one). */
      ".nv-appnav-admin .nv-appnav-link{font:var(--type-caption);padding:6px 10px;color:var(--text-on-dark-secondary);animation:none;}",
      ".nv-appnav-admin .nv-appnav-link:hover{color:var(--text-on-dark);background:var(--hover-lighten-on-dark);padding-left:14px;}",
      ".nv-appnav-admin .nv-appnav-link--on{color:var(--volt-emerald);font:var(--type-caption-strong);background:var(--volt-emerald-08);}",
      ".nv-appnav-admin .nv-appnav-link--on:hover{color:var(--volt-emerald);background:var(--volt-emerald-10);}",
      ".nv-adminnav-group{animation:nv-appnav-in .5s " + EXPO + " both;}",
      /* Collapsed top-strip (761–860px, above the mobile-tabs breakpoint): drop
         the rail, the section eyebrows and the entrance lift so the horizontal
         scroller stays clean. */
      "@media (max-width:860px){",
      ".nv-appnav-grouplabel{display:none!important}",
      ".nv-appnav-link::before{display:none}",
      ".nv-appnav-link{padding:6px 12px!important}",
      ".nv-appnav-link,.nv-appnav-grouplabel,.nv-adminnav-group{animation:none}",
      "}",
      "@media (prefers-reduced-motion: reduce){",
      ".nv-appnav-link,.nv-appnav-grouplabel,.nv-adminnav-group{animation:none}",
      ".nv-appnav-link,.nv-appnav-link::before,.nv-appnav-thumb{transition:none}",
      "}"
    ].join("");
    document.head.appendChild(s);
  })();

  function AppNavV2(props) {
    var ctx = props.ctx, kind = props.kind;
    var Note = W("Note");
    /* Same destinations as the compiled AppNav; only grouping and the two long
       maintainer labels change (the "Discovery presence" context moves to the
       section header, so the items read Profile / Reach). */
    var groups = kind === "maintainer" ? [
      { items: [["Dashboard", "maintainer.dashboard"]] },
      { label: "Discovery presence", items: [["Profile", "maintainer.profile"], ["Reach", "maintainer.reach"]] },
      { label: "Operations", items: [["Claim contest", "maintainer.contest"], ["API & webhooks", "maintainer.api"], ["Project settings", "maintainer.settings"]] }
    ] : [
      { items: [["Home", "backer.dashboard"], ["Discover", "discover"]] },
      { label: "Your library", items: [["My stack", "stack.connect"], ["My lists", "backer.lists"], ["Curation chat", "backer.chat"]] },
      { label: "Account", items: [["Settings", "backer.settings"]] }
    ];

    /* Flatten to one ordered stream so the links stay DIRECT children of
       .nv-app-navlinks (the responsive collapse targets ".nv-app-navlinks a");
       the eyebrows are siblings, hidden in the collapsed strip. A running index
       drives the entrance stagger across both labels and links. */
    var nodes = [], idx = 0;
    groups.forEach(function (g, gi) {
      if (g.label) {
        nodes.push(h("span", { key: "grp-" + gi, className: "nv-appnav-grouplabel",
          style: { animationDelay: (idx * 45) + "ms" } }, g.label));
        idx++;
      }
      g.items.forEach(function (it) {
        var label = it[0], name = it[1], on = ctx.route.name === name;
        nodes.push(h("a", { key: name, href: "#",
          className: "nv-appnav-link" + (on ? " nv-appnav-link--on" : ""),
          "aria-current": on ? "page" : null,
          style: { animationDelay: (idx * 45) + "ms" },
          onClick: function (e) { e.preventDefault(); ctx.go({ name: name }); } }, label));
        idx++;
      });
    });

    var wordmark = h("a", { href: "#", "aria-label": "notavibe — front door",
      onClick: function (e) { e.preventDefault(); ctx.go({ name: "discover", full: true }); },
      style: { display: "inline-flex", alignItems: "center", alignSelf: "flex-start", textDecoration: "none", cursor: "pointer" } },
      window.NvWordmark ? h(window.NvWordmark, { size: 18 })
        : h("span", { style: { font: "var(--type-body-lg-strong)", letterSpacing: "var(--ls-body-lg)", color: "var(--text-body)" } }, "notavibe"));

    /* Provenance kept honest (the app subdomain), but split into two tidy lines
       so it never wraps mid-token as it did before; the emerald "you are here"
       dot carries the brand into the header. */
    var context = h("div", { style: col("3px", { marginTop: "2px" }) },
      h("span", { style: { font: "var(--type-mono-caption)", letterSpacing: "var(--ls-mono-caption)", color: "var(--volt-text-600)", whiteSpace: "nowrap" } }, "app.notavibe.dev"),
      h("span", { style: { display: "inline-flex", alignItems: "center", gap: "7px", font: "var(--type-caption)", color: "var(--text-secondary)" } },
        h("span", { "aria-hidden": "true", style: { flex: "0 0 6px", width: "6px", height: "6px", borderRadius: "50%", background: "var(--volt-emerald)", boxShadow: "0 0 0 3px var(--volt-emerald-20)" } }),
        (kind === "maintainer" ? "Maintainer" : "Backer") + " workspace"));

    var roles = [["Backer", "backer.dashboard"], ["Maintainer", "maintainer.dashboard"]];
    var segment = h("div", { className: "nv-appnav-seg", "data-active": kind === "maintainer" ? "maintainer" : "backer" },
      h("span", { className: "nv-appnav-thumb", "aria-hidden": "true" }),
      roles.map(function (r) {
        var isCur = (r[0] === "Maintainer") === (kind === "maintainer");
        return h("button", { key: r[0], type: "button", "aria-pressed": isCur ? "true" : "false",
          onClick: function () { ctx.go({ name: r[1] }); } }, r[0]);
      }));

    var foot = h("div", { className: "nv-app-foot", style: { marginTop: "auto", display: "flex", flexDirection: "column", gap: "var(--space-sm)" } },
      h(Eyebrow, { size: "caption" }, "Role"),
      segment,
      h(Note, null, "Last-used context on login. Single-role users see no switcher."));

    return h("aside", { className: "nv-app-nav",
      style: { width: "232px", flex: "0 0 232px", borderRight: "var(--border-level-1)", background: "var(--surface-canvas)",
               padding: "var(--space-2xl) var(--space-lg)", display: "flex", flexDirection: "column", gap: "var(--space-2xl)", minHeight: "100vh" } },
      h("div", { style: col("var(--space-sm)") }, wordmark, context),
      h("nav", { className: "nv-app-navlinks", style: { display: "flex", flexDirection: "column", gap: "2px" } }, nodes),
      foot);
  }

  /* ── AdminNav — overrides the compiled screens.js AdminNav ─────────────────
     The admin console side menu (separate SSO+VPN deployment). Same structure,
     destinations and dark chrome as the compiled version — it keeps its four
     labelled groups and the "Back to catalog" ghost footer untouched — but the
     links gain the same craft as the workspace nav: the emerald active state
     with the sliding accent rail, expo-out hover, and focus-visible, retuned
     for the darker surface (see .nv-appnav-admin in injectAppNavCSS). Entrance
     cascades per group rather than per item. Wired by LOCAL reference. */
  function AdminNavV2(props) {
    var ctx = props.ctx;
    var groups = [
      ["Adjudication", [["Claim contest queue", "admin.contests"], ["Nomination inbox", "admin.nominations"]]],
      ["Catalog", [["Catalog ingestion", "admin.ingestion"], ["Page corrections & takedowns", "admin.corrections"], ["Taxonomy & categories", "admin.taxonomy"], ["Vocabulary contests", "admin.vocab"], ["Anomaly quarantine", "admin.anomaly"]]],
      ["Integrity", [["Sybil detection", "admin.sybil"], ["Project moderation", "admin.moderation"], ["Audit log", "admin.audit"]]],
      ["Platform", [["User lookup", "admin.users"], ["Editorial tools", "admin.editorial"], ["Demand signals", "admin.demand"], ["Config", "admin.config"]]]
    ];

    var link = function (label, name) {
      var on = ctx.route.name === name;
      return h("a", { key: name, href: "#",
        className: "nv-appnav-link" + (on ? " nv-appnav-link--on" : ""),
        "aria-current": on ? "page" : null,
        onClick: function (e) { e.preventDefault(); ctx.go({ name: name }); } }, label);
    };

    var header = h("div", { className: "nv-adminnav-group", style: col("var(--space-xxs)", { animationDelay: "0ms" }) },
      h("span", { style: { font: "var(--type-body-md-strong)", letterSpacing: "var(--ls-body-md)", color: "var(--text-on-dark)" } }, "notavibe admin"),
      h(Eyebrow, { tone: "onDarkMuted", size: "caption" }, "SSO + VPN · separate deployment"));

    var groupEls = groups.map(function (g, i) {
      return h("div", { key: g[0], className: "nv-adminnav-group", style: col("var(--space-xs)", { animationDelay: (70 + i * 70) + "ms" }) },
        h(Eyebrow, { tone: "onDarkMuted", size: "caption" }, g[0]),
        g[1].map(function (it) { return link(it[0], it[1]); }));
    });

    var foot = h("div", { style: { marginTop: "auto" } },
      h(Button, { variant: "ghost", fullWidth: true, onClick: function () { ctx.go({ name: "discover" }); } }, "Back to catalog"));

    return h("aside", { className: "nv-app-nav nv-appnav-admin",
      style: { width: "248px", flex: "0 0 248px", background: "var(--surface-dark)", borderRight: "1px solid var(--border-hairline-dark)",
               padding: "var(--space-lg)", display: "flex", flexDirection: "column", gap: "var(--space-lg)", minHeight: "100vh" } },
      header, groupEls, foot);
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
    var backerDiscovery = ctx.signedIn && !ctx.route.full && /^(discover|category|search|project)$/.test(name);
    /* A logged-out visitor reaching a stack surface (paste needs no account) renders
       in the PUBLIC chrome, not the signed-in Backer workspace — otherwise they'd
       see the workspace sidebar and a signed-in person's connected repositories. */
    var loggedOutStack = !ctx.signedIn && /^stack\.(connect|results|publish)/.test(name);
    var isApp = (APP_ROUTES.test(name) || backerDiscovery) && !loggedOutStack;

    if (ctx.mobile) {
      return h(React.Fragment, null,
        h(window.MobileShell, { ctx: ctx, Screen: Screen }),
        NV_DEV ? h(window.PrototypeBar, { ctx: ctx }) : null);
    }

    var body;
    if (isAdmin) {
      body = h("div", { className: "nv-app-shell", style: { display: "flex", minHeight: "100vh", background: "var(--surface-canvas)" } },
        h(AdminNavV2, { ctx: ctx }),
        h("main", { style: { flex: 1, minWidth: 0, display: "flex" } }, h(Screen, { ctx: ctx })));
    } else if (isApp) {
      body = h("div", { className: "nv-app-shell", style: { display: "flex", minHeight: "100vh", background: "var(--surface-canvas)" } },
        h(AppNavV2, { ctx: ctx, kind: name.indexOf("maintainer.") === 0 ? "maintainer" : "backer" }),
        h("main", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column" } },
          ctx.signedIn ? h("div", { style: { display: "flex", justifyContent: "flex-end", padding: "var(--space-md) var(--gutter-desktop) 0" } },
            h(Button, { variant: "ghost", onClick: function () { ctx.toggleSignedIn(); ctx.go({ name: "discover" }); } }, "Sign out")) : null,
          h("div", { style: { flex: 1 } }, h(Screen, { ctx: ctx })),
          NV_DEV ? h(PrototypeRail, { ctx: ctx }) : null));
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
        NV_DEV ? h(PrototypeRail, { ctx: ctx }) : null,
        h(DS.FooterWordmark, null, "notavibe"));
    }
    return h(React.Fragment, null, body, NV_DEV ? h(window.PrototypeBar, { ctx: ctx }) : null);
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

    /* Pending claims (Q12) — a parked or contested claim has no grant yet, so the
       claimant is still a Backer and it surfaces here with a resume link. Given as
       its own card above outcomes because an org-approval clock is act-by. */
    var pending = window.PENDING_CLAIMS || [];
    var pendingCard = pending.length ? h("section", { style: Object.assign({}, CARD, col("var(--space-md)", { padding: "var(--space-2xl)" })) },
      h("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--space-md)" } },
        h("span", { style: eyebrow }, "Claims in progress"),
        h("span", { style: Object.assign({}, eyebrow, { color: "var(--volt-emerald)" }) }, pending.length + " pending")),
      h("div", null, pending.map(function (c, i) {
        return h("div", { key: c.slug, style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-md)", flexWrap: "wrap", padding: "var(--space-md) 0", borderTop: i === 0 ? "none" : "1px solid var(--volt-border)" } },
          h("div", { style: col("2px", { minWidth: 0 }) },
            h("span", { style: { font: "var(--type-body-md-strong)", letterSpacing: "var(--ls-body-md)" } }, c.slug),
            h("span", { style: caption }, c.kind === "contest" ? "In contest · your page stays live during review" : "Waiting on an org owner to approve the Claim App")),
          h("button", { className: "nv-home-seeall", type: "button", onClick: function () { ctx.go({ name: "claim.start", slug: c.slug }); }, style: { display: "inline-flex", alignItems: "center", gap: "6px", WebkitAppearance: "none", appearance: "none", background: "transparent", border: "none", cursor: "pointer", padding: "2px 0", font: "var(--type-body-md-strong)", letterSpacing: "var(--ls-body-md)" } }, "Resume", h("span", { className: "nv-arrow" }, "→")));
      }))) : null;

    if (fresh) {
      return h("div", { style: wrap },
        header,
        pendingCard,
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

    return h("div", { style: wrap }, header, deck, pendingCard, hasOutcomes ? outcomes : nudge, stats);
  }

  /* ── Backer "More" (mobile overflow) ──────────────────────────────────────
     The fifth mobile tab. Home took the first tab and Activity folded into it, so
     More is the overflow index for secondary destinations + the role switch (the
     desktop switcher lives in the sidebar footer, which is hidden on the phone). */
  function BackerMore(props) {
    var ctx = props.ctx;
    var Note = W("Note");
    var caption = { font: "var(--type-caption)", color: "var(--text-secondary)" };
    var eyebrow = { font: "var(--type-mono-label)", letterSpacing: "var(--ls-mono-label)", textTransform: "uppercase", color: "var(--volt-text-500)" };
    var CARD = { border: "1px solid var(--volt-border)", background: "var(--volt-surface)", borderRadius: "12px" };
    var rows = [
      ["Activity", "Your outcomes — nominations, claims, saves", "backer.activity"],
      ["Curation chat", "Build a list by describing what you want", "backer.chat"],
      ["Connected accounts", "Sign-in providers, linking, and account deletion", "account.identities"],
      ["Settings", "Account and notice channels", "backer.settings"]
    ];
    /* Same "card that navigates" pattern as My lists — card system, warms to
       emerald on hover, arrow advances. Was on the pre-card-system tokens. */
    var links = rows.map(function (r) {
      return h("button", { key: r[2], className: "nv-listcard", type: "button", onClick: function () { ctx.go({ name: r[2] }); },
        style: Object.assign({}, CARD, { padding: "var(--space-lg) var(--space-2xl)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--space-lg)", cursor: "pointer", textAlign: "left", width: "100%", WebkitAppearance: "none", appearance: "none" }) },
        h("span", { style: col("2px", { minWidth: 0 }) },
          h("span", { style: { font: "var(--type-body-lg-strong)", letterSpacing: "var(--ls-body-lg)" } }, r[0]),
          h("span", { style: caption }, r[1])),
        h("span", { className: "nv-arrow", style: { color: "var(--volt-text-500)", font: "var(--type-body-lg-strong)" } }, "→"));
    });

    var role = ctx.signedIn ? h("div", { style: { borderTop: "1px solid var(--volt-border)", paddingTop: "var(--space-2xl)", display: "flex", flexDirection: "column", gap: "var(--space-md)" } },
      h("span", { style: eyebrow }, "Role"),
      h("div", null, h(Button, { variant: "outline", onClick: function () { ctx.go({ name: "maintainer.dashboard" }); } }, "Switch to maintainer")),
      h(Note, null, "Shown because this account holds a maintainer grant — a Backer who has claimed a page. Single-role backers see no switcher; last-used context returns on login.")) : null;

    var signout = ctx.signedIn ? h("div", { style: { borderTop: "1px solid var(--volt-border)", paddingTop: "var(--space-2xl)" } },
      h(Button, { variant: "outline", onClick: function () { ctx.toggleSignedIn(); ctx.go({ name: "discover" }); } }, "Sign out")) : null;

    var wrap = { maxWidth: "680px", width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-2xl)", padding: "var(--space-section) var(--space-2xl)" };
    return h("div", { style: wrap },
      h("header", { style: col("var(--space-sm)") },
        h("span", { style: eyebrow }, "Backer · Raj"),
        h("h1", { style: { margin: 0, font: "var(--type-display-lg)", letterSpacing: "var(--ls-display-lg)" } }, "More")),
      h("div", { style: col("var(--space-md)") }, links),
      role,
      signout);
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

  /* Scripted curation exchange. Each step is the curator's grounded reply plus
     the draft list it revises — the conversation narrows the draft rather than
     producing prose (spec §5.10: "Output is a draft list, not prose"). Illustrative
     only; a real session grounds every reply in the live catalog. */
  var CURATION_SUGGESTIONS = [
    "I need to replace eslint and prettier without a big migration",
    "A fast test runner for a CI-heavy monorepo",
    "Something to replace tsup for library builds"
  ];
  var CURATION_FLOW = [
    { reply: "Two projects in the catalog cover both jobs in one binary. I can only talk about the catalog, and each pick links its own page.", title: "Replacing eslint + prettier", items: ["biomejs/biome", "oxc-project/oxlint"] },
    { reply: "If you'd rather run a single tool, Biome lints and formats on its own — I've dropped oxlint from the draft.", title: "Replacing eslint + prettier", items: ["biomejs/biome"], refine: "Actually, I'd rather run just one tool." },
    { reply: "That's as tight as the catalog gets for this. Save it as a list, or keep refining.", title: "Replacing eslint + prettier", items: ["biomejs/biome"], refine: "Anything else worth pairing with it?" }
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

    /* Logged out, "Connect a provider" is an OAuth prompt — not a pre-loaded repo
       list (which would leak a signed-in person's repositories to a visitor).
       Reading a repo's manifest needs GitHub or GitLab; pasting needs no account. */
    var connectCard = h("section", { style: Object.assign({}, CARD, col("var(--space-md)")) },
      h("span", { style: eyebrow }, "Connect a provider"),
      h("p", { style: { margin: 0, font: "var(--type-body-md)", letterSpacing: "var(--ls-body-md)", color: "var(--text-secondary)" } }, "Scanning a repository needs GitHub or GitLab — read-minimal OAuth that reports only repository visibility. Prefer not to connect? Paste a manifest instead — no account needed."),
      h("div", { style: { display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" } },
        h(Button, { variant: "primary", onClick: function () { if (ctx.signIn) ctx.signIn(); }, icon: h(Icon, { name: "github", size: 16, strokeColor: "#fff" }) }, "Connect GitHub"),
        h(Button, { variant: "outline", onClick: function () { if (ctx.signIn) ctx.signIn(); } }, "Connect GitLab")),
      h(Note, null, "First connection also signs you in — there's no separate signup. Read-minimal only, never any write access."));

    /* The scan controls only make sense once there's something to scan: any paste,
       or a connected provider. Logged out on the connect tab, we show the prompt. */
    var showScan = mode === "paste" || ctx.signedIn;
    var wrap = { maxWidth: "760px", width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-2xl)", padding: "var(--space-section) var(--space-2xl)" };
    return h("div", { style: wrap },
      h("header", { style: col("var(--space-sm)") },
        h("span", { style: eyebrow }, "My stack"),
        h("h1", { style: { margin: 0, font: "var(--type-display-lg)", letterSpacing: "var(--ls-display-lg)", textWrap: "balance" } }, "Find what you already depend on"),
        h("span", { style: { font: "var(--type-body-lg)", letterSpacing: "var(--ls-body-lg)", color: "var(--text-secondary)", textWrap: "pretty" } }, "The scan runs server-side. Matches resolve against the catalog; everything else is discarded.")),
      seg,
      mode === "oauth" ? (ctx.signedIn ? providerCard : connectCard) : pasteCard,
      showScan ? consentRow : null,
      showScan ? h("div", null, h(Button, { variant: "primary", size: "lg", disabled: !consent, onClick: run }, "Scan")) : null);
  }

  /* ── List detail (overrides compiled ListDetail) ──────────────────────────
     Shared by the private list (backer.list) and the public list page
     (list.public) via publicView. Numbered items reuse ProjectRow; retired /
     revoked entries render as dated records; the on-request-removal private
     note and the visibility actions are preserved. */
  function ListDetailV2(props) {
    var ctx = props.ctx;
    var publicView = props.publicView;
    var Note = W("Note"), ProjectRow = W("ProjectRow");
    var caption = { font: "var(--type-caption)", color: "var(--text-secondary)" };
    var eyebrow = { font: "var(--type-mono-label)", letterSpacing: "var(--ls-mono-label)", textTransform: "uppercase", color: "var(--volt-text-500)" };
    var lists = ctx.lists || [];
    var list = lists.filter(function (l) { return l.id === (ctx.route.id || "l1"); })[0] || lists[0];
    if (!list) return h("div", { style: { padding: "var(--space-3xl)" } }, h(Note, null, "List not found."));
    var visible = list.items.filter(function (s) { return ctx.claimState(s) !== "suppressed"; });
    var removedOnRequest = list.items.some(function (s) { return ctx.claimState(s) === "suppressed"; });

    var actions = publicView
      ? h("div", { style: { display: "flex", gap: "var(--inline-gap)", flexWrap: "wrap", alignItems: "center" } },
          h(Button, { variant: "primary", onClick: function () { ctx.saveListCopy(list.id); } }, "Save this list"),
          h(Note, null, "Copies it into your own lists as an independent list — not a subscription to the original."))
      : h("div", { style: { display: "flex", gap: "var(--inline-gap)", flexWrap: "wrap" } },
          h(Button, { variant: "outline", onClick: function () { ctx.toggleVisibility(list.id); } }, list.visibility === "public" ? "Unpublish" : "Publish"),
          h(Button, { variant: "ghost", onClick: function () { ctx.go({ name: "list.public", id: list.id }); } }, "View public page"));

    var header = h("header", { style: col("var(--space-md)") },
      h("span", { style: eyebrow }, publicView ? "/lists/" + list.handle + "/" + list.slug : (list.visibility || "private") + " list"),
      h("h1", { style: { margin: 0, font: "var(--type-display-lg)", letterSpacing: "var(--ls-display-lg)", textWrap: "balance" } }, list.title),
      list.description ? h("span", { style: { font: "var(--type-body-lg)", letterSpacing: "var(--ls-body-lg)", color: "var(--text-secondary)", textWrap: "pretty" } }, list.description) : null,
      actions);

    var itemsList = h("ol", { style: { margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-md)" } },
      visible.map(function (slug, i) {
        var p = window.findProject(slug); var st = ctx.claimState(slug);
        var dated = (st === "retired" || st === "revoked");
        return h("li", { key: slug, style: { display: "flex", gap: "var(--space-md)", alignItems: "center" } },
          h("span", { style: { font: "var(--type-mono-caption)", letterSpacing: "var(--ls-mono-caption)", color: "var(--text-secondary)", flex: "0 0 20px" } }, i + 1),
          h("div", { style: { flex: 1, minWidth: 0 } },
            dated
              ? h("div", { style: { border: "1px dashed var(--volt-border)", borderRadius: "var(--radius-sm)", padding: "var(--space-lg)", display: "flex", flexDirection: "column", gap: "var(--space-xs)" } },
                  h("span", { style: { font: "var(--type-body-md-strong)", letterSpacing: "var(--ls-body-md)" } }, p ? p.name : slug),
                  h(Note, null, "Renders as a dated record — " + (st === "retired" ? ("retired " + ((p && p.retiredAt) || "")) : "revoked and not indexed") + "."))
              : h(ProjectRow, { slug: slug, ctx: ctx, compact: true })),
          !publicView ? h(Button, { variant: "ghost", onClick: function () { ctx.toggleInList(list.id, slug); } }, "Remove") : null);
      }));

    var removed = (removedOnRequest && !publicView) ? h("div", { style: { border: "1px dashed var(--volt-border)", borderRadius: "12px", padding: "var(--space-lg) var(--space-2xl)" } },
      h(Note, null, h("b", { style: { fontWeight: 500, color: "var(--text-body)" } }, "Private note to you:"), " an item was removed from this list on request. It is not named publicly, and your list has not been silently corrupted.")) : null;

    var wrap = publicView
      ? { display: "flex", flexDirection: "column", gap: "var(--space-2xl)" }
      : { maxWidth: "680px", width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-2xl)", padding: "var(--space-section) var(--space-2xl)" };
    return h("div", { style: wrap }, header, itemsList, removed);
  }

  function PublicListPageV2(props) {
    var ctx = props.ctx;
    var Note = W("Note");
    return h(Container, { style: { padding: "var(--space-5xl) var(--gutter-desktop) var(--space-section)", maxWidth: "760px", display: "flex", flexDirection: "column", gap: "var(--space-2xl)" } },
      h(ListDetailV2, { ctx: ctx, publicView: true }),
      h(Note, null, "An acquisition surface: indexed, reachable from search and from its object, never a front-door module. Reserved namespace segment: /lists."));
  }

  /* ── My lists (overrides compiled MyLists) ────────────────────────────────
     List index in the card system. Each list is a clickable card (border warms
     to emerald on hover) → its detail. New-list flow preserved; designed empty
     state; the "not a review" note kept. */
  function MyListsV2(props) {
    var ctx = props.ctx;
    var Note = W("Note");
    var caption = { font: "var(--type-caption)", color: "var(--text-secondary)" };
    var eyebrow = { font: "var(--type-mono-label)", letterSpacing: "var(--ls-mono-label)", textTransform: "uppercase", color: "var(--volt-text-500)" };
    var metaMono = { font: "var(--type-mono-caption)", letterSpacing: "var(--ls-mono-caption)", textTransform: "uppercase", color: "var(--text-secondary)" };
    var CARD = { border: "1px solid var(--volt-border)", background: "var(--volt-surface)", borderRadius: "12px" };
    var lists = ctx.lists || [];
    var cs = React.useState(false), creating = cs[0], setCreating = cs[1];
    var ts = React.useState(""), title = ts[0], setTitle = ts[1];

    var header = h("header", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "var(--space-lg)", flexWrap: "wrap" } },
      h("div", { style: col("var(--space-sm)") },
        h("span", { style: eyebrow }, "Backer · Raj"),
        h("h1", { style: { margin: 0, font: "var(--type-display-lg)", letterSpacing: "var(--ls-display-lg)" } }, "My lists")),
      h(Button, { variant: "primary", onClick: function () { setCreating(true); } }, "New list"));

    var form = creating ? h("form", {
      onSubmit: function (e) { e.preventDefault(); if (title.trim()) { ctx.createList(title.trim()); setTitle(""); setCreating(false); } },
      style: Object.assign({}, CARD, { padding: "var(--space-lg) var(--space-2xl)", display: "flex", gap: "var(--space-md)", alignItems: "flex-end", flexWrap: "wrap" })
    },
      h("div", { style: { flex: "1 1 240px" } }, h(TextInput, { label: "Title", value: title, onChange: function (e) { setTitle(e.target.value); }, placeholder: "Boring infrastructure I would miss" })),
      h(Button, { variant: "primary" }, "Create"),
      h(Button, { variant: "ghost", onClick: function () { setCreating(false); } }, "Cancel")) : null;

    var rows = lists.map(function (l) {
      return h("button", { key: l.id, className: "nv-listcard", type: "button", onClick: function () { ctx.go({ name: "backer.list", id: l.id }); },
        style: Object.assign({}, CARD, { padding: "var(--space-lg) var(--space-2xl)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--space-lg)", cursor: "pointer", textAlign: "left", width: "100%", WebkitAppearance: "none", appearance: "none" }) },
        h("span", { style: col("6px", { minWidth: 0 }) },
          h("span", { style: { font: "var(--type-body-lg-strong)", letterSpacing: "var(--ls-body-lg)" } }, l.title),
          h("span", { style: metaMono }, (l.visibility || "private") + " · " + l.items.length + (l.items.length === 1 ? " item · " : " items · ") + window.maskNumber(l.saves) + " saves")),
        h("span", { className: "nv-arrow", style: { color: "var(--volt-text-500)", font: "var(--type-body-lg-strong)" } }, "→"));
    });

    var body = lists.length
      ? h("div", { style: col("var(--space-md)") }, rows)
      : h("div", { style: { border: "1px dashed var(--volt-border)", borderRadius: "12px", padding: "var(--space-3xl) var(--space-2xl)", display: "flex", flexDirection: "column", gap: "6px", alignItems: "center", textAlign: "center" } },
          h("span", { style: { font: "var(--type-body-md-strong)", letterSpacing: "var(--ls-body-md)" } }, "No lists yet"),
          h("span", { style: caption }, "Save a project from Discover or a scan, or start one here."));

    var wrap = { maxWidth: "680px", width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-2xl)", padding: "var(--space-section) var(--space-2xl)" };
    return h("div", { style: wrap }, header, form, body, h(Note, null, "No ratings, no scores — a curated list is not a review."));
  }

  /* ── Activity (overrides compiled BackerActivity) ─────────────────────────
     The full log behind Home's "See all activity". Same timeline treatment as
     Home for continuity. Open items (badge) vs Recent outcomes (14-day archive),
     per §9.6, with the designed empty state each tab requires. */
  function BackerActivityV2(props) {
    var ctx = props.ctx;
    var Note = W("Note");
    var caption = { font: "var(--type-caption)", color: "var(--text-secondary)" };
    var eyebrow = { font: "var(--type-mono-label)", letterSpacing: "var(--ls-mono-label)", textTransform: "uppercase", color: "var(--volt-text-500)" };
    var CARD = { border: "1px solid var(--volt-border)", background: "var(--volt-surface)", borderRadius: "12px", padding: "var(--space-2xl)" };

    var acts = (window.ACTIVITY || []).filter(function (a) { return a.when !== "—"; });
    var daysOf = function (a) { var m = /(\d+)\s*day/.exec(a.when || ""); return m ? +m[1] : 999; };
    var open = acts.filter(function (a) { return daysOf(a) <= 7; });
    var recent = acts.filter(function (a) { return daysOf(a) > 7; });
    var st = React.useState("open"), tab = st[0], setTab = st[1];
    var items = tab === "open" ? open : recent;

    var timeline = function (list) {
      if (!list.length) return h("div", { style: { padding: "var(--space-2xl) 0", display: "flex", flexDirection: "column", gap: "4px", alignItems: "center", textAlign: "center" } },
        h("span", { style: { font: "var(--type-body-md-strong)", letterSpacing: "var(--ls-body-md)" } }, tab === "open" ? "Nothing needs you right now" : "No recent outcomes"),
        h("span", { style: caption }, tab === "open" ? "Outcomes appear here as your nominations, lists and interests resolve." : "Acted and expired items rest here for 14 days, then clear."));
      return h("div", { style: { position: "relative" } },
        h("span", { "aria-hidden": "true", style: { position: "absolute", left: "4px", top: "16px", bottom: "16px", width: "1px", background: "var(--volt-border)" } }),
        list.map(function (a, i) {
          var neg = a.valence === "Negative";
          return h("div", { key: i, style: { position: "relative", display: "flex", gap: "var(--space-lg)", alignItems: "flex-start", padding: "var(--space-md) 0" } },
            h("span", { style: { flex: "0 0 9px", height: "9px", marginTop: "5px", borderRadius: "50%", background: neg ? "var(--volt-text-500)" : "var(--volt-emerald)", boxShadow: "0 0 0 4px var(--volt-surface)" } }),
            h("div", { style: col("3px", { minWidth: 0 }) },
              h("span", { style: { font: "var(--type-body-md)", letterSpacing: "var(--ls-body-md)", textWrap: "pretty" } }, a.text),
              h("span", { style: caption }, a.type + " · " + a.when)));
        }));
    };

    var seg = h("div", { style: { display: "inline-flex", gap: "4px", background: "var(--volt-void)", border: "1px solid var(--volt-border)", borderRadius: "999px", padding: "4px", width: "fit-content" } },
      [["open", "Open"], ["recent", "Recent outcomes"]].map(function (t) {
        var on = tab === t[0];
        return h("button", { key: t[0], type: "button", onClick: function () { setTab(t[0]); },
          style: { WebkitAppearance: "none", appearance: "none", cursor: "pointer", border: "none", borderRadius: "999px", padding: "var(--space-sm) var(--space-lg)", background: on ? "var(--volt-surface)" : "transparent", color: on ? "var(--text-body)" : "var(--text-secondary)", font: on ? "var(--type-body-md-strong)" : "var(--type-body-md)", letterSpacing: "var(--ls-body-md)" } },
          t[1] + (t[0] === "open" && open.length ? "  " + open.length : ""));
      }));

    var wrap = { maxWidth: "680px", width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-2xl)", padding: "var(--space-section) var(--space-2xl)" };
    return h("div", { style: wrap },
      h("header", { style: col("var(--space-sm)") },
        h("span", { style: eyebrow }, "My week · activity"),
        h("h1", { style: { margin: 0, font: "var(--type-display-lg)", letterSpacing: "var(--ls-display-lg)", textWrap: "balance" } }, "Activity"),
        h("span", { style: { font: "var(--type-body-lg)", letterSpacing: "var(--ls-body-lg)", color: "var(--text-secondary)", textWrap: "pretty" } }, "The outcomes of what you nominated, listed, and registered interest in.")),
      seg,
      h("section", { style: Object.assign({}, CARD, col("var(--space-sm)")) }, timeline(items)),
      h(Note, null, "Deadline-ascending where a deadline exists; overlaps collapsed; acted and expired items move to Recent outcomes for 14 days. Where the spec says “notified” without naming a channel, the notice is in-app."));
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

  /* ── Curation chat (overrides compiled CurationChat) ──────────────────────
     The transcript is chrome; the draft list is the payload. Every exchange
     narrows a draft rather than emitting prose (§5.10). The draft-list card is
     the signature moment — emerald spine, cited pages, one primary action. The
     curator copy is plain and grounded (DEC-0031 bars the AI house style), and
     the "never a ranking input, never indexed" contract sits under every draft. */
  function CurationChatV2(props) {
    var ctx = props.ctx;
    var Note = W("Note"), ProjectRow = W("ProjectRow");
    var caption = { font: "var(--type-caption)", color: "var(--text-secondary)" };
    var eyebrow = { font: "var(--type-mono-label)", letterSpacing: "var(--ls-mono-label)", textTransform: "uppercase", color: "var(--volt-text-500)" };
    var emEyebrow = Object.assign({}, eyebrow, { color: "var(--volt-emerald)" });
    var bubbleText = { font: "var(--type-body-md)", letterSpacing: "var(--ls-body-md)", textWrap: "pretty" };

    var t0 = React.useState([]), turns = t0[0], setTurns = t0[1];
    var i0 = React.useState(""), input = i0[0], setInput = i0[1];
    var scroller = React.useRef(null);
    React.useEffect(function () { var el = scroller.current; if (el) el.scrollTop = el.scrollHeight; }, [turns.length]);

    var advance = function (text) {
      var sent = turns.filter(function (x) { return x.role === "you"; }).length;
      var step = CURATION_FLOW[Math.min(sent, CURATION_FLOW.length - 1)];
      setTurns(turns.concat([
        { role: "you", text: text },
        { role: "curator", text: step.reply },
        { role: "draft", title: step.title, items: step.items }
      ]));
      setInput("");
    };
    var nextRefine = function () {
      var sent = turns.filter(function (x) { return x.role === "you"; }).length;
      var step = CURATION_FLOW[Math.min(sent, CURATION_FLOW.length - 1)];
      return step.refine || "Refine this further.";
    };

    var draftCard = function (turn, key) {
      return h("div", { key: key, className: "nv-draft", style: { border: "1px solid var(--volt-border)", background: "var(--volt-surface)", borderRadius: "12px", padding: "var(--space-2xl)", display: "flex", flexDirection: "column", gap: "var(--space-lg)" } },
        h("span", { "aria-hidden": "true", style: { position: "absolute", left: 0, top: "16px", bottom: "16px", width: "3px", borderRadius: "0 3px 3px 0", background: "var(--volt-emerald)" } }),
        h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "var(--space-md)", paddingLeft: "var(--space-sm)" } },
          h("span", { style: emEyebrow }, "Draft list"),
          h("span", { style: caption }, turn.items.length + (turn.items.length === 1 ? " project · each links its page" : " projects · each links its page"))),
        h("div", { style: col("var(--space-xs)", { paddingLeft: "var(--space-sm)" }) },
          turn.items.map(function (slug) { return h(ProjectRow, { key: slug, slug: slug, ctx: ctx, compact: true }); })),
        h("div", { style: { display: "flex", gap: "var(--inline-gap)", flexWrap: "wrap", paddingLeft: "var(--space-sm)" } },
          h(Button, { variant: "primary", onClick: function () { ctx.createList(turn.title, null, turn.items); ctx.go({ name: "backer.lists" }); } }, "Save as a list"),
          h(Button, { variant: "outline", onClick: function () { advance(nextRefine()); } }, "Refine further")),
        h(Note, null, h("span", { style: { paddingLeft: "var(--space-sm)", display: "block" } }, "No ratings or scores — a curated list is not a review. Conversations are never a ranking input; transcripts are never indexed.")));
    };

    var body = turns.length === 0
      ? h("div", { style: { border: "1px dashed var(--volt-border)", borderRadius: "12px", padding: "var(--space-3xl) var(--space-2xl)", display: "flex", flexDirection: "column", gap: "var(--space-lg)" } },
          h("div", { style: col("4px") },
            h("span", { style: { font: "var(--type-body-lg-strong)", letterSpacing: "var(--ls-body-lg)" } }, "Describe what you're trying to replace or find"),
            h("span", { style: caption }, "The curator answers only from the catalog, and hands back a draft list you can save.")),
          h("div", { style: { display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" } },
            CURATION_SUGGESTIONS.map(function (s) {
              return h("button", { key: s, type: "button", className: "nv-chip", onClick: function () { advance(s); },
                style: { WebkitAppearance: "none", appearance: "none", cursor: "pointer", textAlign: "left", background: "var(--volt-void)", border: "1px solid var(--volt-border)", color: "var(--text-secondary)", borderRadius: "999px", padding: "var(--space-sm) var(--space-lg)", font: "var(--type-body-md)", letterSpacing: "var(--ls-body-md)" } },
                "“" + s + "”");
            })))
      : h("div", { ref: scroller, style: { display: "flex", flexDirection: "column", gap: "var(--space-lg)", maxHeight: "56vh", overflowY: "auto", paddingRight: "4px" } },
          turns.map(function (t, i) {
            if (t.role === "draft") return draftCard(t, i);
            if (t.role === "you") return h("div", { key: i, className: "nv-chat-you", style: bubbleText }, t.text);
            return h("div", { key: i, style: col("4px", { alignSelf: "flex-start", maxWidth: "82%" }) },
              h("span", { style: { display: "inline-flex", alignItems: "center", gap: "6px", font: "var(--type-mono-caption)", letterSpacing: "var(--ls-mono-caption)", textTransform: "uppercase", color: "var(--volt-text-500)" } },
                h("span", { "aria-hidden": "true", style: { width: "6px", height: "6px", borderRadius: "50%", background: "var(--volt-emerald)" } }), "Curator"),
              h("div", { className: "nv-chat-curator", style: bubbleText }, t.text));
          }));

    var form = h("form", { onSubmit: function (e) { e.preventDefault(); if (input.trim()) advance(input.trim()); },
        style: { display: "flex", gap: "var(--space-md)", alignItems: "flex-end" } },
      h("div", { style: { flex: 1 } }, h(TextInput, { label: "Message", value: input, onChange: function (e) { setInput(e.target.value); }, placeholder: "What are you trying to replace or find?" })),
      h(Button, { variant: "primary" }, "Send"));

    var wrap = { maxWidth: "680px", width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-2xl)", padding: "var(--space-section) var(--space-2xl)" };
    return h("div", { style: wrap },
      h("header", { style: col("var(--space-sm)") },
        h("span", { style: eyebrow }, "Curation chat"),
        h("h1", { style: { margin: 0, font: "var(--type-display-lg)", letterSpacing: "var(--ls-display-lg)", textWrap: "balance" } }, "A conversation curates"),
        h("span", { style: { font: "var(--type-body-lg)", letterSpacing: "var(--ls-body-lg)", color: "var(--text-secondary)", textWrap: "pretty" } }, "Grounded in the catalog only. It won't discuss projects outside it, every pick cites a page, and what it hands back is a draft list — never prose.")),
      body,
      form);
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
    MyLists: MyListsV2,
    ListDetail: ListDetailV2,
    PublicListPage: PublicListPageV2,
    BackerActivity: BackerActivityV2,
    ScanResults: ScanResultsV2,
    StackConnect: StackConnectV2,
    CurationChat: CurationChatV2
  });
})();

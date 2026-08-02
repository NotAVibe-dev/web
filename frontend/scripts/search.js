/* notavibe — search results v2.
   Replaces SearchResults from notavibe-screens.js. Installed as window.NvSearch
   and picked up by the NV override map in notavibe-app.js, the same route the
   front door and project page already take.

   The thesis: search is the discovery surface (§5.4), not a convenience, and the
   thing that makes notavibe's search different from a package registry's is that
   the ranking rationale is *visible*. So the signal block is not a decoration on
   the row — it is a fixed column, in a fixed order, on every row, which turns
   maintenance into something you read down the page instead of parsing per item.

   Three constraints shaped this more than any aesthetic call:
   · §5.4 — search matches name and description only. Facets are filters, never
     search targets. Preserved exactly.
   · §5.8 — "facts and bands side by side, no conclusion drawn." So the meters
     are monochrome. A red/amber/green ramp would be the product concluding on
     the maintainer's behalf, which this spec forbids. Colour is reserved for
     interaction state, never for judgement.
   · §5.12 — "Nominate is a state of the scan-result and search surfaces — it
     fires where no project page exists by definition." The old screen put a
     Nominate button on every result row, all of which have pages. Moved to the
     tail card and the empty state, where the definition puts it. */
(function () {
  var h = React.createElement;
  var NS = window.TogetherAIDesignSystem_eaf923;
  var Container = NS.Container;

  var EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";

  var EYEBROW = { margin: 0, fontSize: "12px", lineHeight: 1.23, fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", color: "var(--volt-text-400)" };
  var BODY = { margin: 0, fontWeight: 500, fontSize: "16px", lineHeight: 1.5, color: "var(--volt-text-500)" };
  var SMALL = { margin: 0, fontWeight: 500, fontSize: "14px", lineHeight: 1.5, color: "var(--volt-text-500)" };
  var MICRO = { margin: 0, fontWeight: 500, fontSize: "13px", lineHeight: 1.38, letterSpacing: "0.2px", color: "var(--volt-text-600)" };

  /* Row grid, shared by the column header and every result so the meters line up
     into actual columns. If these two ever drift the whole idea collapses, so
     there is one constant rather than two matching literals. */
  var SPINE_W = 316;
  var ROW_GRID = "38px minmax(0, 1fr) " + SPINE_W + "px";

  /* ── Signal model ─────────────────────────────────────────────────────────
     Five signals, one order, everywhere. Levels are 0–4 on a 4-segment meter:
     `dependents` is the only signal with four bands, and collapsing it to three
     to match the others would throw away the one place the data is finer.

     "Insufficient data" maps to null, not zero. That distinction is the whole
     honesty argument — a project nobody has measured must not render as a
     project measured and found wanting. Null draws an empty dashed track. */
  var SIGNALS = [
    { key: "updates",    label: "Updates" },
    { key: "breadth",    label: "Breadth" },
    { key: "dependents", label: "Dependents" },
    { key: "response",   label: "Response" },
    { key: "security",   label: "Security" }
  ];

  var LEVEL = {
    "Steady": 4, "Intermittent": 2, "Quiet": 1,
    "Broad": 4, "Narrowing": 2, "Single-author": 1,
    "Very high": 4, "High": 3, "Moderate": 2, "Low": 1,
    "Substantive": 4, "Mixed": 2, "Sparse": 1,
    "Strong": 4, "Adequate": 2, "Weak": 1,
    "Insufficient data": null
  };

  var levelOf = function (p, key) {
    var s = p.signals && p.signals[key];
    if (!s) return null;
    var l = LEVEL[s.band];
    return l === undefined ? null : l;
  };

  /* Used only to break ties inside a sort — never rendered as a score. A single
     number on screen would be exactly the "conclusion" §5.8 rules out. */
  var totalLevel = function (p) {
    return SIGNALS.reduce(function (n, s) { return n + (levelOf(p, s.key) || 0); }, 0);
  };

  /* The result count is the page's own answer to "did that do anything?", so it
     reacts when it changes — but it must never *misreport*. So the text is always
     bound straight to the real count; the motion is a CSS pop keyed on the value,
     which under `both` fill lands on its final frame even where rAF is throttled
     (a background or zero-height tab). Animating the integer itself was tried and
     rejected: an rAF tick that stalls can freeze the number mid-count, showing 0
     while three results sit below it — exactly the dishonesty §5.8 rules out. */

  /* ── Stylesheet ───────────────────────────────────────────────────────────
     Entrances run as CSS animations with per-item delays rather than JS timers.
     Same reason as the front door's chips: a throttled or zero-height tab defers
     setTimeout indefinitely, and `both` fill holds the from-state through the
     delay without React having to track it. Reduced-motion opts out here too, so
     it is one stylesheet rule instead of a branch in every component. */
  (function injectCSS() {
    if (document.getElementById("nv-search-css")) return;
    var s = document.createElement("style");
    s.id = "nv-search-css";
    s.textContent = [
      "@keyframes nvRowIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}",
      "@keyframes nvSegIn{from{opacity:0.4;transform:scaleX(0)}to{opacity:1;transform:scaleX(1)}}",
      "@keyframes nvCountIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}",
      /* Page-load cascade for the search band — input, then the count/sort row,
         then the chips — a short staggered rise so the surface assembles rather
         than blinking in whole. Delays are applied inline per element. */
      "@keyframes nvUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}",
      /* Count reaction: re-mounted on every value change, a short rise-and-settle
         so a new result total registers as movement. `both` fill lands it on the
         final frame even where rAF is throttled, so it can never stall part-way. */
      "@keyframes nvCountPop{from{opacity:0;transform:translateY(10px) scale(0.9)}to{opacity:1;transform:none}}",
      ".nv-row{animation:nvRowIn 460ms " + EXPO + " both}",
      ".nv-seg{transform-origin:left center;animation:nvSegIn 420ms " + EXPO + " both}",
      ".nv-count{animation:nvCountIn 420ms " + EXPO + " both}",
      ".nv-enter{animation:nvUp 560ms " + EXPO + " both}",
      ".nv-countpop{animation:nvCountPop 460ms " + EXPO + " both}",
      /* The row is a grid, so the hover affordance cannot be a margin shift
         without reflowing the meters out of their columns. Transform on the
         inner block only: the spine stays locked to its grid track. */
      ".nv-row .nv-rowmove{transition:transform 260ms " + EXPO + "}",
      ".nv-row:hover .nv-rowmove{transform:translateX(5px)}",
      ".nv-row .nv-rule{transition:background-color 260ms " + EXPO + ",transform 300ms " + EXPO + ";transform-origin:left center}",
      ".nv-row:hover .nv-rule,.nv-row:focus-within .nv-rule{background-color:var(--volt-emerald);transform:scaleY(1)}",
      ".nv-row .nv-idx{transition:color 260ms " + EXPO + "}",
      ".nv-row:hover .nv-idx{color:var(--volt-text-300)}",
      /* Keyboard parity: everything hover does, focus-within does too. */
      ".nv-row:focus-within .nv-rowmove{transform:translateX(5px)}",
      ".nv-hit{background:rgba(0,202,142,0.16);color:var(--volt-white);border-radius:2px}",
      ".nv-search-scope ::selection{background:rgba(0,202,142,0.28);color:#fff}",
      ".nv-search-scope :focus-visible{outline:2px solid var(--volt-emerald);outline-offset:2px;border-radius:4px}",
      /* ── Responsive ──────────────────────────────────────────────────────────
         The screen is authored as a fixed 224px filter rail beside a results
         column, each result row a fixed 38 / 1fr / 316px grid. Below the widths
         where those tracks stop fitting the layout reflows: the rail stacks above
         the results, and the signal spine drops to its own full-width line under
         each project name. Overrides use !important because the base tracks are
         inline styles. */
      "@media (max-width: 900px){",
      ".nv-search-layout{grid-template-columns:1fr!important;gap:28px!important}",
      ".nv-search-rail{position:static!important;top:auto!important}}",
      "@media (max-width: 620px){",
      ".nv-result-row{grid-template-columns:22px minmax(0,1fr)!important;gap:8px 14px!important}",
      ".nv-result-row .nv-spine{grid-column:1 / -1!important;margin-top:2px}",
      ".nv-col-header{display:none!important}}",
      "@media (prefers-reduced-motion: reduce){",
      ".nv-row,.nv-seg,.nv-count,.nv-enter,.nv-countpop{animation:none;opacity:1;transform:none}",
      ".nv-row .nv-rowmove,.nv-row:hover .nv-rowmove{transform:none}}"
    ].join("");
    document.head.appendChild(s);
  })();

  /* ── Meter ────────────────────────────────────────────────────────────────
     Four segments, monochrome. Filled segments step in opacity so a level reads
     at a glance without a hue implying a verdict (§5.8).

     `held: true` marks §4.1's fallback-less signals — the ones sourced from a
     single provider with no second source. The marker is a hairline under the
     track rather than an icon: present enough to find in the methodology, quiet
     enough not to read as a warning about the project itself. */
  function Meter(props) {
    var lvl = props.level, delay = props.delay || 0;
    var seg = function (i) {
      var on = lvl !== null && i < lvl;
      return h("span", {
        key: i,
        className: props.animate ? "nv-seg" : null,
        style: {
          height: "4px", borderRadius: "1px",
          background: on
            ? "rgba(255,255,255," + (0.42 + i * 0.18) + ")"
            : (lvl === null ? "transparent" : "rgba(178,182,189,0.13)"),
          border: lvl === null ? "1px dashed rgba(178,182,189,0.22)" : "none",
          boxSizing: "border-box",
          animationDelay: (delay + i * 45) + "ms"
        }
      });
    };
    return h("div", {
      style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "3px", width: "100%" }
    }, [0, 1, 2, 3].map(seg));
  }

  function SignalCell(props) {
    var p = props.project, sig = props.sig;
    var s = p.signals && p.signals[sig.key];
    var lvl = levelOf(p, sig.key);
    var band = s ? s.band : "No data";
    return h("div", {
      /* the full fact lives here — band, the number behind it, and its source,
         which is what makes the meter checkable rather than decorative */
      title: s ? sig.label + ": " + s.band + " — " + s.detail + " (" + s.source + ", read " + s.fetched + ")" : sig.label + ": no data",
      style: { display: "flex", flexDirection: "column", gap: "5px", minWidth: 0 }
    },
      h(Meter, { level: lvl, delay: props.delay, animate: props.animate }),
      h("span", {
        style: {
          fontSize: "10px", lineHeight: 1.3, fontWeight: 500, letterSpacing: "0.2px",
          color: lvl === null ? "var(--volt-text-600)" : "var(--volt-text-500)",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          fontStyle: lvl === null ? "italic" : "normal"
        }
      }, lvl === null ? "no data" : band.toLowerCase()),
      s && s.held
        ? h("span", { style: { height: "1px", background: "rgba(255,207,37,0.42)", width: "14px" }, "aria-hidden": "true" })
        : null);
  }

  /* Marks the matched substring in name and description. §5.4 says search hits
     name and description only — showing *where* it hit is what makes that rule
     legible instead of something the user has to be told in a footnote. */
  function mark(text, needle) {
    if (!needle) return text;
    var i = text.toLowerCase().indexOf(needle);
    if (i < 0) return text;
    return [
      text.slice(0, i),
      h("mark", { key: "m", className: "nv-hit" }, text.slice(i, i + needle.length)),
      text.slice(i + needle.length)
    ];
  }

  var CLAIM_LABEL = { active: "Verified", generated: "Unclaimed", lapsed: "Re-verifying", retired: "Retired", revoked: "Revoked" };

  function ResultRow(props) {
    var p = props.project, ctx = props.ctx, i = props.index, needle = props.needle;
    var open = function () { ctx.go({ name: "project", slug: p.slug }); };
    var claim = ctx.claimState(p.slug);

    return h("div", {
      className: "nv-row nv-result-row",
      style: {
        display: "grid", gridTemplateColumns: ROW_GRID,
        gap: "20px", alignItems: "center",
        padding: "18px 0",
        borderBottom: "1px solid var(--volt-border)",
        animationDelay: Math.min(i, 12) * 45 + "ms"
      }
    },
      /* Index in tabular figures so the column is a straight edge rather than a
         ragged one — at 2 digits the difference is visible. */
      h("span", {
        className: "nv-idx",
        style: {
          fontSize: "13px", fontWeight: 500, color: "var(--volt-text-600)",
          fontVariantNumeric: "tabular-nums", fontFeatureSettings: '"tnum"'
        }
      }, ("0" + (i + 1)).slice(-2)),

      h("div", { style: { display: "flex", gap: "14px", minWidth: 0, alignItems: "stretch" } },
        /* the rule is the hover affordance and the focus affordance at once */
        h("span", {
          className: "nv-rule", "aria-hidden": "true",
          style: { width: "2px", borderRadius: "1px", background: "transparent", transform: "scaleY(0.4)", flex: "0 0 2px" }
        }),
        h("div", { className: "nv-rowmove", style: { display: "flex", flexDirection: "column", gap: "5px", minWidth: 0 } },
          h("div", { style: { display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" } },
            h("a", {
              href: "/" + p.slug,
              onClick: function (e) { e.preventDefault(); open(); },
              style: {
                margin: 0, fontWeight: 600, fontSize: "19px", lineHeight: 1.26,
                letterSpacing: "-0.014em", color: "var(--volt-white)", textDecoration: "none"
              }
            }, mark(p.name, needle)),
            h("span", { style: Object.assign({}, MICRO, { color: "var(--volt-text-600)" }) }, p.slug),
            h("span", {
              style: {
                fontSize: "10px", fontWeight: 600, letterSpacing: "0.4px", textTransform: "uppercase",
                color: claim === "generated" ? "var(--volt-text-600)" : "var(--volt-text-400)",
                border: "1px solid var(--volt-border)", borderRadius: "3px", padding: "2px 6px"
              }
            }, CLAIM_LABEL[claim] || claim),
            p.inferred
              ? h("span", { style: { fontSize: "10px", fontWeight: 500, color: "var(--volt-text-600)", fontStyle: "italic" } }, "inferred vocabulary")
              : null),
          h("p", {
            style: Object.assign({}, SMALL, {
              display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
              overflow: "hidden", color: "var(--volt-text-300)"
            })
          }, mark(p.description, needle)))),

      h("div", {
        className: "nv-spine",
        style: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", alignItems: "start" }
      }, SIGNALS.map(function (sig, k) {
        return h(SignalCell, {
          key: sig.key, sig: sig, project: p,
          animate: true, delay: Math.min(i, 12) * 45 + 120 + k * 35
        });
      })));
  }

  /* ── Constraint chips ─────────────────────────────────────────────────────
     The old screen had twenty checkboxes in a sticky rail and no summary. Once
     you scrolled the results there was no way to know what was applied, and
     removing one meant hunting for its checkbox. Every active constraint is now
     a chip at the top, each individually removable — which is also what makes
     the empty state recoverable in one click rather than a scan. */
  function Chip(props) {
    var hv = React.useState(false), on = hv[0], setOn = hv[1];
    return h("button", {
      type: "button",
      onClick: props.onRemove,
      onMouseEnter: function () { setOn(true); },
      onMouseLeave: function () { setOn(false); },
      "aria-label": "Remove filter " + props.children,
      style: {
        display: "inline-flex", alignItems: "center", gap: "8px",
        padding: "6px 10px 6px 12px", borderRadius: "var(--radius-pill, 9999px)",
        background: on ? "var(--volt-surface)" : "transparent",
        border: "1px solid " + (on ? "rgba(0,202,142,0.45)" : "var(--volt-border)"),
        color: on ? "var(--volt-white)" : "var(--volt-text-300)",
        fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "13px", lineHeight: 1.38,
        cursor: "pointer", whiteSpace: "nowrap",
        transition: "background-color 200ms " + EXPO + ", border-color 200ms " + EXPO + ", color 200ms " + EXPO
      }
    },
      props.dim ? h("span", { style: { color: "var(--volt-text-600)" } }, props.dim) : null,
      h("span", null, props.children),
      h("span", { "aria-hidden": "true", style: { fontSize: "15px", lineHeight: 1, color: on ? "var(--volt-emerald)" : "var(--volt-text-600)" } }, "×"));
  }

  function FacetGroup(props) {
    var os = React.useState(props.openByDefault !== false), open = os[0], setOpen = os[1];
    var selected = props.selected || [];
    return h("div", { style: { display: "flex", flexDirection: "column", gap: "8px" } },
      h("button", {
        type: "button",
        onClick: function () { setOpen(!open); },
        "aria-expanded": open ? "true" : "false",
        style: {
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px",
          background: "none", border: "none", padding: "0 0 2px", cursor: "pointer", width: "100%", textAlign: "left"
        }
      },
        h("span", { style: Object.assign({}, EYEBROW, { color: selected.length ? "var(--volt-white)" : "var(--volt-text-400)" }) },
          props.label, selected.length ? " · " + selected.length : ""),
        h("span", {
          "aria-hidden": "true",
          style: {
            fontSize: "11px", color: "var(--volt-text-600)",
            transform: open ? "rotate(90deg)" : "none",
            transition: "transform 240ms " + EXPO
          }
        }, "›")),
      open ? h("div", { style: { display: "flex", flexDirection: "column", gap: "1px" } },
        props.values.map(function (v) {
          var on = selected.indexOf(v) > -1;
          /* The count is the disclosure that stops a dead end before it happens:
             a value that would return nothing says so before you spend a click
             on it. Counted against the other constraints, not the whole catalog,
             so it answers "if I add this" rather than "how many exist". */
          var n = props.countFor(v);
          return h("button", {
            key: v,
            type: "button",
            onClick: function () { props.onToggle(v); },
            disabled: !on && n === 0,
            style: {
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px",
              background: "none", border: "none", padding: "5px 0", width: "100%", textAlign: "left",
              cursor: !on && n === 0 ? "default" : "pointer",
              opacity: !on && n === 0 ? 0.32 : 1
            }
          },
            h("span", { style: { display: "flex", alignItems: "center", gap: "9px", minWidth: 0 } },
              h("span", {
                "aria-hidden": "true",
                style: {
                  width: "13px", height: "13px", flex: "0 0 13px", borderRadius: "3px", boxSizing: "border-box",
                  border: "1px solid " + (on ? "var(--volt-emerald)" : "var(--volt-border-hover)"),
                  background: on ? "var(--volt-emerald)" : "transparent",
                  transition: "background-color 180ms " + EXPO + ", border-color 180ms " + EXPO
                }
              }),
              h("span", {
                style: {
                  fontSize: "14px", fontWeight: 500, lineHeight: 1.5,
                  color: on ? "var(--volt-white)" : "var(--volt-text-300)",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                }
              }, v)),
            h("span", {
              style: {
                fontSize: "12px", color: "var(--volt-text-600)",
                fontVariantNumeric: "tabular-nums", fontFeatureSettings: '"tnum"'
              }
            }, n)) ;
        })) : null);
  }

  /* Spec annotation, folded away rather than deleted. These notes are why the
     prototype exists — but rendered inline they competed with the product for
     the same attention, which is how a review surface ends up being reviewed as
     a design. Available in one click, absent until asked for. */
  function SpecNotes(props) {
    var os = React.useState(false), open = os[0], setOpen = os[1];
    return h("div", { style: { display: "flex", flexDirection: "column", gap: "12px", paddingTop: "8px", borderTop: "1px solid var(--volt-border)" } },
      h("button", {
        type: "button",
        onClick: function () { setOpen(!open); },
        "aria-expanded": open ? "true" : "false",
        style: { background: "none", border: "none", padding: "10px 0 0", cursor: "pointer", textAlign: "left", color: "var(--volt-text-600)", fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase" }
      }, (open ? "– " : "+ ") + "Spec notes"),
      open ? h("div", { style: { display: "flex", flexDirection: "column", gap: "10px", paddingBottom: "4px" } },
        props.notes.map(function (t, i) {
          return h("p", { key: i, style: Object.assign({}, MICRO, { lineHeight: 1.55 }) }, t);
        })) : null);
  }

  /* ── Screen ───────────────────────────────────────────────────────────── */
  function NvSearch(props) {
    var ctx = props.ctx;

    /* Query lives in NvQuery, the store the hero field and the header field
       already share — not in local state seeded from the route.

       That seeding was a real defect, not a style point: useState(ctx.route.q)
       initialises once, so once this screen was mounted every later search from
       the header changed the URL's q and left the results untouched. Reading the
       shared store means the header field, this field and the result set are the
       same value by construction and cannot drift. */
    var st = React.useState(window.NvQuery ? window.NvQuery.get() : ""), q = st[0], setQ = st[1];
    React.useEffect(function () {
      if (!window.NvQuery) return;
      return window.NvQuery.subscribe(setQ);
    }, []);
    /* An arriving route carries the authoritative query — that is what a shared
       link or a seed chip is. Push it into the store, which then feeds every
       field on the page. */
    React.useEffect(function () {
      var rq = ctx.route.q;
      if (window.NvQuery && typeof rq === "string" && rq !== window.NvQuery.get()) window.NvQuery.set(rq);
    }, [ctx.route.q]);


    var fac = React.useState({}), facets = fac[0], setFacets = fac[1];
    var bnd = React.useState({}), bands = bnd[0], setBands = bnd[1];
    var srt = React.useState("Relevance"), sort = srt[0], setSort = srt[1];

    var toggle = function (setter, obj, k, v) {
      var cur = obj[k] || [];
      var next = cur.indexOf(v) > -1 ? cur.filter(function (x) { return x !== v; }) : cur.concat([v]);
      var out = {};
      Object.keys(obj).forEach(function (kk) { out[kk] = obj[kk]; });
      out[k] = next;
      setter(out);
    };

    /* FACETS and BAND_FILTERS are module-private consts inside the 263KB
       notavibe-screens.js bundle, so they cannot be imported. Mirrored here, and
       read from window first so the bundle can hand them over the moment it
       exports them. Until it does this is a copy that can drift from the frozen
       §5.4 vocabulary — worth closing, since the schema freeze makes exactly one
       of these two the source of truth. */
    var FACETS = window.NV_FACETS || [
      { dim: "Purpose", values: ["Test runner", "Library bundler", "Linter", "SQL toolkit", "HTTP framework", "Schema validation"] },
      { dim: "Maturity", values: ["Emerging", "Established", "Mature"] },
      { dim: "Maintenance model", values: ["Single maintainer", "Small team", "Collective", "Company-backed", "Foundation", "Team"] }
    ];
    var BAND_FILTERS = window.NV_BAND_FILTERS || [
      { key: "updates", label: "Maintenance rhythm", values: ["Steady", "Intermittent", "Quiet"] },
      { key: "breadth", label: "Contribution breadth", values: ["Broad", "Narrowing", "Single-author"] }
    ];

    var needle = q.trim().toLowerCase();

    /* One predicate, parameterised by which constraints to apply — so the facet
       counts are computed by the same code that computes the result set and
       cannot disagree with it. */
    var passes = function (p, skipFacet, skipBand) {
      if (ctx.claimState(p.slug) === "suppressed") return false;
      /* §5.4: name and description only. Vocabulary is a filter, never a search
         target — searching "mature" must not surface everything tagged Mature. */
      if (needle && !(p.name.toLowerCase().indexOf(needle) > -1 || p.description.toLowerCase().indexOf(needle) > -1)) return false;
      var okF = Object.keys(facets).every(function (dim) {
        if (dim === skipFacet) return true;
        var vals = facets[dim];
        return !vals || !vals.length || vals.indexOf(p.vocab[dim]) > -1;
      });
      if (!okF) return false;
      return Object.keys(bands).every(function (key) {
        if (key === skipBand) return true;
        var vals = bands[key];
        return !vals || !vals.length || (p.signals[key] && vals.indexOf(p.signals[key].band) > -1);
      });
    };

    var matches = window.PROJECTS.filter(function (p) { return passes(p); });

    /* Relevance was previously declared and never applied — the three sort
       buttons set state that nothing read, so every one of them produced catalog
       order. Ranked properly here.

       "Recently updated" is deliberately not among them. Nothing in the §5.4
       schema records when a project last moved; the nearest field is the signal
       fetch date, which orders by when notavibe last looked. Sorting on it would
       present notavibe's crawl schedule as project activity. Dependents is
       offered instead — a real field, honestly ordered. */
    var rank = function (p) {
      if (!needle) return 0;
      var n = p.name.toLowerCase(), d = p.description.toLowerCase();
      if (n === needle) return 0;
      if (n.indexOf(needle) === 0) return 1;
      if (n.indexOf(needle) > -1) return 2;
      if (d.indexOf(needle) === 0) return 3;
      return 4;
    };
    var sorted = matches.slice().sort(function (a, b) {
      if (sort === "Maintenance rhythm") {
        var la = levelOf(a, "updates") || 0, lb = levelOf(b, "updates") || 0;
        if (la !== lb) return lb - la;
        return totalLevel(b) - totalLevel(a);
      }
      if (sort === "Dependents") {
        var da = levelOf(a, "dependents") || 0, db = levelOf(b, "dependents") || 0;
        if (da !== db) return db - da;
        return totalLevel(b) - totalLevel(a);
      }
      var ra = rank(a), rb = rank(b);
      if (ra !== rb) return ra - rb;
      return totalLevel(b) - totalLevel(a);
    });

    var activeFacets = Object.keys(facets).filter(function (k) { return facets[k] && facets[k].length; });
    var activeBands = Object.keys(bands).filter(function (k) { return bands[k] && bands[k].length; });
    var constraintCount = activeFacets.reduce(function (n, k) { return n + facets[k].length; }, 0)
      + activeBands.reduce(function (n, k) { return n + bands[k].length; }, 0);

    var removeFacet = function (dim, v) { toggle(setFacets, facets, dim, v); };
    var removeBand = function (key, v) { toggle(setBands, bands, key, v); };
    var clearAll = function () { setFacets({}); setBands({}); };
    var dropLast = function () {
      if (activeBands.length) {
        var k = activeBands[activeBands.length - 1];
        var vals = bands[k];
        return removeBand(k, vals[vals.length - 1]);
      }
      if (activeFacets.length) {
        var d = activeFacets[activeFacets.length - 1];
        var fv = facets[d];
        return removeFacet(d, fv[fv.length - 1]);
      }
    };

    /* Names the constraint that emptied the set instead of saying "no results".
       "Nothing is both Quiet and Broad" is a fact about the catalog and tells you
       which term to drop; "no results" tells you nothing. */
    var emptyHeadline = (function () {
      var parts = [];
      activeBands.forEach(function (k) { bands[k].forEach(function (v) { parts.push(v); }); });
      activeFacets.forEach(function (d) { facets[d].forEach(function (v) { parts.push(v); }); });
      var list = parts.length === 1 ? parts[0]
        : parts.length === 2 ? parts[0] + " and " + parts[1]
        : parts.slice(0, -1).join(", ") + " and " + parts[parts.length - 1];
      var quoted = "“" + q.trim() + "”";
      /* Blame the right thing. A query and a filter can each empty the set, and
         naming the wrong one sends you to fix the wrong control. */
      if (needle && parts.length) return "Nothing matching " + quoted + " is also " + list;
      if (needle) return "Nothing in the catalog matches " + quoted;
      if (parts.length === 1) return "Nothing in the catalog is " + list;
      if (parts.length === 2) return "Nothing is both " + list;
      return "Nothing is all of " + list;
    })();

    /* Re-keys the list whenever the visible set changes — its members or their
       order — so the stagger replays on a filter or a re-sort. Keyed on the slug
       list rather than the raw query: typing that narrows nothing must not re-fire
       the whole reveal on every keystroke, and the match highlight updates through
       props without a remount regardless. */
    var runId = sort + "|" + sorted.map(function (p) { return p.slug; }).join(",");

    var SORTS = ["Relevance", "Maintenance rhythm", "Dependents"];

    var searchBand = h("div", {
      style: {
        /* Same glow as the hero, compressed. The results page has to read as the
           same surface the query was typed into — a flat handoff to a plain page
           is where a search product stops feeling like one product. */
        background: [
          "radial-gradient(90% 140% at 10% -40%, color-mix(in srgb, var(--volt-indigo) 58%, transparent) 0%, transparent 60%)",
          "radial-gradient(60% 120% at 92% -30%, color-mix(in srgb, var(--volt-emerald) 7%, transparent) 0%, transparent 58%)",
          "var(--volt-void)"
        ].join(", "),
        borderBottom: "1px solid var(--volt-border)"
      }
    },
      h(Container, { style: { padding: "40px 32px 30px", display: "flex", flexDirection: "column", gap: "22px" } },
        /* Count as display type. It is the one number that answers "did that do
           anything?", and at 12px next to twenty other 12px labels it never did.
           The scale jump is the hierarchy — nothing else on this band competes.
           With the on-page field removed, the query is driven from the header and
           this count + echo is the band's lead element, so it opens the cascade. */
        h("div", { className: "nv-enter", style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "32px", flexWrap: "wrap", animationDelay: "40ms" } },
          h("div", { style: { display: "flex", alignItems: "baseline", gap: "14px" } },
            h("span", {
              /* Keyed on the value so a changed count re-mounts and replays the
                 pop — the text is always the real number, the motion is only ever
                 cosmetic and cannot desync from it. */
              key: sorted.length,
              className: "nv-countpop",
              style: {
                fontWeight: 700, fontSize: "56px", lineHeight: 1, letterSpacing: "-0.031em",
                color: "var(--volt-white)", fontVariantNumeric: "tabular-nums", fontFeatureSettings: '"tnum"'
              }
            }, sorted.length),
            h("span", { style: Object.assign({}, EYEBROW, { paddingBottom: "4px" }) },
              sorted.length === 1 ? "result" : "results",
              /* the query is echoed as typed — the eyebrow's uppercase transform
                 must not reach it, or a search for "hono" reports back "HONO"
                 and the page appears to have altered what was asked */
              needle ? h("span", { style: { textTransform: "none", color: "var(--volt-text-300)" } }, " for “" + q.trim() + "”") : null)),

          h("div", { style: { display: "flex", alignItems: "center", gap: "6px", paddingBottom: "6px" } },
            h("span", { style: Object.assign({}, EYEBROW, { color: "var(--volt-text-600)", marginRight: "4px" }) }, "Sort"),
            SORTS.map(function (s) {
              var on = sort === s;
              return h("button", {
                key: s,
                type: "button",
                onClick: function () { setSort(s); },
                "aria-pressed": on ? "true" : "false",
                style: {
                  border: "1px solid " + (on ? "transparent" : "var(--volt-border)"),
                  background: on ? "var(--primary)" : "transparent",
                  color: on ? "var(--on-primary)" : "var(--volt-text-300)",
                  borderRadius: "var(--radius-pill, 9999px)",
                  padding: "7px 14px",
                  fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "13px", lineHeight: 1.38,
                  cursor: "pointer", whiteSpace: "nowrap",
                  transition: "background-color 200ms " + EXPO + ", color 200ms " + EXPO + ", border-color 200ms " + EXPO
                }
              }, s);
            }))),

        constraintCount
          ? h("div", { className: "nv-enter", style: { display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", animationDelay: "120ms" } },
              activeBands.map(function (k) {
                var label = (BAND_FILTERS.filter(function (b) { return b.key === k; })[0] || {}).label || k;
                return bands[k].map(function (v) {
                  return h(Chip, { key: k + v, dim: label, onRemove: function () { removeBand(k, v); } }, v);
                });
              }),
              activeFacets.map(function (d) {
                return facets[d].map(function (v) {
                  return h(Chip, { key: d + v, dim: d, onRemove: function () { removeFacet(d, v); } }, v);
                });
              }),
              h("button", {
                type: "button", onClick: clearAll,
                style: { background: "none", border: "none", color: "var(--volt-text-500)", fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: "3px", cursor: "pointer", padding: "6px 4px" }
              }, "Clear all"))
          : null));

    var rail = h("aside", {
      className: "nv-search-rail",
      style: { display: "flex", flexDirection: "column", gap: "22px", position: "sticky", top: "96px", alignSelf: "start" }
    },
      BAND_FILTERS.map(function (b) {
        return h(FacetGroup, {
          key: b.key, label: b.label, values: b.values,
          selected: bands[b.key] || [],
          onToggle: function (v) { toggle(setBands, bands, b.key, v); },
          countFor: function (v) {
            return window.PROJECTS.filter(function (p) {
              return passes(p, null, b.key) && p.signals[b.key] && p.signals[b.key].band === v;
            }).length;
          }
        });
      }),
      FACETS.map(function (f, i) {
        return h(FacetGroup, {
          key: f.dim, label: f.dim, values: f.values,
          openByDefault: i === 0,
          selected: facets[f.dim] || [],
          onToggle: function (v) { toggle(setFacets, facets, f.dim, v); },
          countFor: function (v) {
            return window.PROJECTS.filter(function (p) {
              return passes(p, f.dim, null) && p.vocab[f.dim] === v;
            }).length;
          }
        });
      }),
      h(SpecNotes, {
        notes: [
          "§5.4 — one versioned schema, nine consumers: this filter UI, Refine, MCP search_projects, agent profiles, the JSON-LD generator, the AEO surface, the curation chatbot, the alternatives generator and the list-page renderer.",
          "Search matches project name and description. Vocabulary facets are filters, never search targets.",
          "Filter permutations and sort orders are blocked in robots.txt — they are not indexable surfaces.",
          "§5.8 — facts and bands side by side, no conclusion drawn. The signal meters are monochrome for this reason: a good/bad colour ramp would be the product concluding on the maintainer's behalf.",
          "Open #6 — search matching name and description was adequate at 20–50 projects and holds nothing at thousands, where search is the discovery surface rather than a convenience. It stands as the floor until decision #5 answers, which now carries four riders: search semantics, Your Deck's cold start, the selection floor and vocabulary at scale.",
          "Held — §4.1's two fallback-less signals (contribution breadth, maintainer response) carry a hairline marker under the meter. No health signal may hard-depend on a single provider, and these two currently do."
        ]
      }));

    /* Labels the meter columns once, at the top, instead of repeating a legend on
       every row. Sticky so it survives the scroll — a column of unlabelled bars
       800px down the page is a decoration. */
    var columnHeader = h("div", {
      className: "nv-col-header",
      style: {
        display: "grid", gridTemplateColumns: ROW_GRID, gap: "20px", alignItems: "end",
        padding: "0 0 10px", borderBottom: "1px solid var(--volt-border-hover)",
        position: "sticky", top: "84px", zIndex: 3,
        background: "var(--volt-void)"
      }
    },
      h("span", null),
      h("span", { style: Object.assign({}, EYEBROW, { color: "var(--volt-text-600)" }) }, "Project"),
      h("div", { style: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" } },
        SIGNALS.map(function (s) {
          return h("span", {
            key: s.key,
            style: {
              fontSize: "9px", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase",
              color: "var(--volt-text-600)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
            }
          }, s.label);
        })));

    var empty = h("div", {
      style: { display: "flex", flexDirection: "column", gap: "20px", border: "1px solid var(--volt-border)", borderRadius: "var(--radius-card, 12px)", padding: "40px", background: "var(--volt-canvas)" }
    },
      h("p", { style: Object.assign({}, EYEBROW, { color: "var(--volt-text-600)" }) }, "HTTP 404 · status for crawlers, state for humans"),
      h("h2", { style: { margin: 0, fontWeight: 700, fontSize: "34px", lineHeight: 1.18, letterSpacing: "-0.029em", color: "var(--volt-white)", maxWidth: "24ch" } },
        emptyHeadline),
      h("p", { style: Object.assign({}, BODY, { maxWidth: "56ch" }) },
        constraintCount
          ? "That is a fact about the catalog, not a failure of the query. Drop a term and the set reopens."
          : "Search reads project names and descriptions. If the thing you want exists and is not here, nominating it puts it in the queue."),
      h("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap", paddingTop: "4px" } },
        constraintCount ? h("button", {
          type: "button", onClick: dropLast,
          style: { background: "var(--primary)", color: "var(--on-primary)", border: "none", borderRadius: "var(--radius-button, 8px)", padding: "12px 22px", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "14px", cursor: "pointer" }
        }, "Drop the last filter") : null,
        constraintCount ? h("button", {
          type: "button", onClick: clearAll,
          style: { background: "transparent", color: "var(--volt-white)", border: "1px solid var(--volt-border-hover)", borderRadius: "var(--radius-button, 8px)", padding: "12px 22px", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "14px", cursor: "pointer" }
        }, "Clear all filters") : null,
        /* §5.12 puts Nominate exactly here — the state that fires where no
           project page exists. */
        h("button", {
          type: "button",
          onClick: function () { ctx.go({ name: "action.nominate", q: q }); },
          style: { background: constraintCount ? "transparent" : "var(--primary)", color: constraintCount ? "var(--volt-white)" : "var(--on-primary)", border: constraintCount ? "1px solid var(--volt-border-hover)" : "none", borderRadius: "var(--radius-button, 8px)", padding: "12px 22px", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "14px", cursor: "pointer" }
        }, "Nominate a project")));

    /* Nominate as a tail card rather than a per-row button. The old screen put
       one beside every result, all of which already have pages — §5.12 defines
       the state as firing "where no project page exists by definition", so the
       row was the one place it could not belong. At the end of the list it also
       reads as what it is: the answer to "none of these". */
    var tail = h("div", {
      style: {
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap",
        border: "1px dashed var(--volt-border-hover)", borderRadius: "var(--radius-card, 12px)",
        padding: "22px 26px", marginTop: "10px"
      }
    },
      h("div", { style: { display: "flex", flexDirection: "column", gap: "4px", minWidth: 0 } },
        h("p", { style: { margin: 0, fontWeight: 600, fontSize: "16px", lineHeight: 1.4, color: "var(--volt-white)" } }, "Not in these results?"),
        h("p", { style: Object.assign({}, SMALL, { color: "var(--volt-text-500)" }) },
          "Nominate a project and you are notified when its page is published — generated or claimed.")),
      h("button", {
        type: "button",
        onClick: function () { ctx.go({ name: "action.nominate", q: q }); },
        style: { background: "transparent", color: "var(--volt-white)", border: "1px solid var(--volt-border-hover)", borderRadius: "var(--radius-button, 8px)", padding: "11px 20px", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "14px", cursor: "pointer", flex: "0 0 auto" }
      }, "Nominate"));

    return h("div", {
      className: "nv-search-scope",
      style: { background: "var(--volt-void)", minHeight: "100vh" }
    },
      searchBand,
      h(Container, {
        className: "nv-search-layout",
        style: {
          padding: "34px 32px 96px",
          display: "grid", gridTemplateColumns: "224px minmax(0, 1fr)",
          gap: "56px", alignItems: "start"
        }
      },
        rail,
        h("main", { style: { display: "flex", flexDirection: "column", gap: "0" } },
          /* The count is announced, not just drawn — a filter change that only
             repaints is silent to a screen reader. */
          h("p", { "aria-live": "polite", style: { position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" } },
            sorted.length + (sorted.length === 1 ? " result" : " results") + ", sorted by " + sort.toLowerCase()),

          sorted.length === 0
            ? empty
            : h(React.Fragment, null,
                columnHeader,
                h("div", { key: runId, style: { display: "flex", flexDirection: "column" } },
                  sorted.map(function (p, i) {
                    return h(ResultRow, { key: p.slug, project: p, ctx: ctx, index: i, needle: needle });
                  })),
                tail))));
  }

  /* Same order-independent install as NvDiscover: a property whose setter ignores
     writes, because script execution order in this runtime is not guaranteed and
     notavibe-screens.js also assigns into this namespace. */
  window.NvSearchV2 = true;
  try {
    Object.defineProperty(window, "NvSearch", {
      configurable: true,
      get: function () { return NvSearch; },
      set: function () { /* deliberately ignored */ }
    });
  } catch (e) {
    window.NvSearch = NvSearch;
  }
})();

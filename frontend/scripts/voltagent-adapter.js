/* notavibe on VoltAgent — component adapter.
   The screen library (7k lines, extracted from the previous design system) asks
   window.TogetherAIDesignSystem_eaf923 for eight components. This module answers
   with VoltAgent primitives so every un-rewritten screen re-skins in place.
   Loads after the VoltAgent bundle, before the screens. */
(function () {
  var h = React.createElement;
  var V = window.VoltAgentDesignSystem_2e3ec5;

  /* Button — VoltAgent has primary / outline / ghost and sm / md only. */
  var VARIANT = { primary: "primary", mint: "primary", white: "primary", outline: "outline", ghost: "ghost", danger: "outline" };
  function Button(props) {
    var p = Object.assign({}, props);
    var kids = p.children; delete p.children;
    p.variant = VARIANT[p.variant] || "primary";
    p.size = (p.size === "sm" || p.size === "caption") ? "sm" : "md";
    /* The outline variant hardcodes a near-white hover label for the dark canvas;
       pin it to the body ink so it stays legible on light. */
    if (p.variant === "outline") p.style = Object.assign({ color: "var(--volt-text-200)" }, p.style || {});
    return h(V.Button, p, kids);
  }

  /* Badge — the pill. Status pills are the one place 9999px is allowed. */
  var BADGE_TONE = { outline: "default", neutral: "solid", solid: "solid", accent: "accent", dark: "solid" };
  /* PillTag's solid tone hardcodes a dark zinc fill; on light it needs the
     recessed-surface equivalent. */
  var SOLID_LIGHT = { background: "var(--volt-surface)", borderColor: "var(--volt-border)", color: "var(--volt-text-300)" };
  /* The accent tone paints its label in --volt-emerald, which is a fill colour:
     unreadable as text on light. Deepen the label, keep the dot and border. */
  var ACCENT_LIGHT = { color: "var(--volt-emerald-deep)" };
  function Badge(props) {
    var tone = BADGE_TONE[props.tone] || "default";
    return h(V.PillTag, {
      tone: tone,
      dot: !!props.dot,
      style: Object.assign({},
        tone === "solid" ? SOLID_LIGHT : {},
        tone === "accent" ? ACCENT_LIGHT : {},
        props.mono ? { fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.4px" } : {},
        props.style || {})
    }, props.children);
  }

  /* Eyebrow — uppercase Inter 600. Small by default: the screens use eyebrows as
     field labels, where the 18px variant would outshout its own heading. */
  var EYEBROW_TONE = { accent: "accent", info: "info" };
  function Eyebrow(props) {
    var kids = props.children;
    return h(V.Eyebrow, {
      tone: EYEBROW_TONE[props.tone] || "default",
      size: props.size === "lg" ? "md" : "sm",
      dot: props.dot === undefined ? false : props.dot,
      style: Object.assign(props.size === "caption" ? { fontSize: "12px", lineHeight: "16px", letterSpacing: "1.6px" } : {}, props.style || {})
    }, kids);
  }

  function Container(props) {
    var p = Object.assign({}, props);
    var kids = p.children; delete p.children; delete p.style;
    return h("div", Object.assign({
      style: Object.assign({ maxWidth: "var(--container-max)", margin: "0 auto", width: "100%", boxSizing: "border-box" }, props.style || {})
    }, p), kids);
  }

  /* Heroicons v2 names differ from the old set in a few places. */
  var ICON_ALIAS = {
    "external-link": "arrow-top-right-on-square",
    "check": "check-circle",
    "chevron": "chevron-right",
    "search": "magnifying-glass",
    "warning": "exclamation-triangle",
    "info": "information-circle"
  };
  function Icon(props) {
    var p = Object.assign({}, props);
    p.name = ICON_ALIAS[p.name] || p.name;
    return h(V.Icon, p);
  }

  /* The DS input is single-line; the paste-a-manifest step needs a real textarea,
     so multiline is handled here with the same recessed-surface styling. */
  function TextInput(props) {
    if (!props.multiline) return h(V.TextInput, props);
    return h("label", { style: { display: "flex", flexDirection: "column", gap: "8px", fontFamily: "var(--font-sans)" } },
      props.label ? h("span", { style: { fontSize: "12px", lineHeight: "12px", color: "var(--volt-text-400)" } }, props.label) : null,
      h("textarea", {
        rows: props.rows || 8,
        value: props.value,
        onChange: props.onChange,
        placeholder: props.placeholder,
        spellCheck: false,
        style: {
          background: "var(--volt-surface)", color: "var(--volt-text-200)",
          border: "1px solid var(--volt-border)", borderRadius: "var(--radius-sm)",
          padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: "13px",
          lineHeight: "18px", outline: "none", width: "100%", resize: "vertical", boxSizing: "border-box"
        }
      }));
  }

  /* StatsCard — {value, label, caption}. Numbers are facts: always mono. */
  function StatsCard(props) {
    return h(V.Card, { padding: "20px", style: { display: "flex", flexDirection: "column", gap: "6px", minWidth: 0 } },
      h("span", { style: { fontFamily: "var(--font-mono)", fontSize: "28px", lineHeight: "32px", color: "var(--volt-white)" } }, props.value),
      h("span", { style: { fontSize: "13px", lineHeight: "18px", color: "var(--volt-text-400)" } }, props.label),
      props.caption ? h("span", { style: { fontSize: "12px", lineHeight: "16px", color: "var(--volt-text-600)" } }, props.caption) : null);
  }

  function CodeEditorMockup(props) {
    return h(V.CodeMockup, { filename: props.filename, code: props.code, language: props.language, style: props.style });
  }

  /* The notavibe lockup, built on the brand's ringed-glyph pattern — not the
     VoltAgent wordmark, which belongs to VoltAgent. */
  function Wordmark(props) {
    var size = props.size || 24;
    return h("span", { style: { display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-sans)" } },
      h("span", { style: { width: (size * 1.17) + "px", height: (size * 1.17) + "px", borderRadius: "9999px", border: "2px solid var(--volt-emerald-deep)", background: "var(--volt-emerald-08)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } },
        h(V.Icon, { name: "bolt", variant: "solid", size: Math.round(size * 0.66), color: "var(--volt-emerald-deep)" })),
      /* symbolOnly drops the text lockup and keeps just the ringed glyph — the
         header uses it to reclaim room in the crowded pill; the footer keeps the
         full wordmark. */
      props.symbolOnly ? null : h("span", { style: { fontSize: size + "px", fontWeight: 700, letterSpacing: "-0.02em", color: props.color || "var(--volt-emerald-deep)" } }, "notavibe"));
  }

  function FooterWordmark(props) {
    return h("footer", { style: { borderTop: "1px solid var(--volt-border)", background: "var(--volt-void)" } },
      h(Container, { style: { padding: "32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" } },
        h(Wordmark, { size: 18 }),
        h("span", { style: { fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--volt-text-600)" } },
          "Generated from public sources · schema v1 · notavibe Inc.")));
  }

  var NS = (window.TogetherAIDesignSystem_eaf923 = window.TogetherAIDesignSystem_eaf923 || {});
  NS.__errors = NS.__errors || [];
  Object.assign(NS, {
    Button: Button, Badge: Badge, Eyebrow: Eyebrow, Container: Container, Icon: Icon,
    TextInput: TextInput, StatsCard: StatsCard, CodeEditorMockup: CodeEditorMockup,
    FooterWordmark: FooterWordmark, Wordmark: Wordmark,
    /* VoltAgent primitives, passed through for the rewritten surfaces */
    Card: V.Card, PillTag: V.PillTag, DataTable: V.DataTable, CodeMockup: V.CodeMockup,
    SectionBand: V.SectionBand, HeroBand: V.HeroBand, GreenDivider: V.GreenDivider,
    DotPattern: V.DotPattern, IconTile: V.IconTile, EmptyState: V.EmptyState, Modal: V.Modal, Toast: V.Toast
  });
  window.NvWordmark = Wordmark;
})();

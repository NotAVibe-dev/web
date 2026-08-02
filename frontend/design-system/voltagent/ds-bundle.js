/* @ds-bundle: {"format":4,"namespace":"VoltAgentDesignSystem_2e3ec5","components":[{"name":"DotPattern","sourcePath":"components/brand/DotPattern.jsx"},{"name":"Eyebrow","sourcePath":"components/brand/Eyebrow.jsx"},{"name":"Icon","sourcePath":"components/brand/Icon.jsx"},{"name":"IconTile","sourcePath":"components/brand/IconTile.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Button","sourcePath":"components/controls/Button.jsx"},{"name":"PillTag","sourcePath":"components/controls/PillTag.jsx"},{"name":"TextInput","sourcePath":"components/controls/TextInput.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"PricingTier","sourcePath":"components/data/PricingTier.jsx"},{"name":"SidebarRow","sourcePath":"components/data/SidebarRow.jsx"},{"name":"Footer","sourcePath":"components/layout/Footer.jsx"},{"name":"GreenDivider","sourcePath":"components/layout/GreenDivider.jsx"},{"name":"HeroBand","sourcePath":"components/layout/HeroBand.jsx"},{"name":"NavBar","sourcePath":"components/layout/NavBar.jsx"},{"name":"SectionBand","sourcePath":"components/layout/SectionBand.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"CodeChip","sourcePath":"components/surfaces/CodeChip.jsx"},{"name":"CodeMockup","sourcePath":"components/surfaces/CodeMockup.jsx"},{"name":"EmptyState","sourcePath":"components/surfaces/EmptyState.jsx"},{"name":"Modal","sourcePath":"components/surfaces/Modal.jsx"},{"name":"Toast","sourcePath":"components/surfaces/Toast.jsx"}],"sourceHashes":{"components/brand/DotPattern.jsx":"016f5b1cab39","components/brand/Eyebrow.jsx":"ffef9060db8e","components/brand/Icon.jsx":"d6063be9867e","components/brand/IconTile.jsx":"51662ad2df96","components/brand/Logo.jsx":"0d724976e3c7","components/controls/Button.jsx":"22ed3635eff6","components/controls/PillTag.jsx":"70ab11b4a3a4","components/controls/TextInput.jsx":"ad6e335e2325","components/data/DataTable.jsx":"8214b6b67b82","components/data/PricingTier.jsx":"b5aafab8b864","components/data/SidebarRow.jsx":"d26be6166c02","components/layout/Footer.jsx":"f56668dca6cc","components/layout/GreenDivider.jsx":"5e7969a167fa","components/layout/HeroBand.jsx":"f84246dacacd","components/layout/NavBar.jsx":"0aba6a758039","components/layout/SectionBand.jsx":"19b979aaf16d","components/surfaces/Card.jsx":"c80868a43182","components/surfaces/CodeChip.jsx":"4ea27c7e55fa","components/surfaces/CodeMockup.jsx":"e37baf044123","components/surfaces/EmptyState.jsx":"d42aa371f34a","components/surfaces/Modal.jsx":"440c33294649","components/surfaces/Toast.jsx":"16e68ab74310","ui_kits/docs/DocsScreen.jsx":"915eb97626d0","ui_kits/docs/app.jsx":"3d46a1606286","ui_kits/marketing/HomeScreen.jsx":"92c5e12b7c26","ui_kits/marketing/PricingScreen.jsx":"43440cb5e4a8","ui_kits/marketing/app.jsx":"7eb915bbe621","ui_kits/voltops-console/AgentsScreen.jsx":"5e7b553bfae3","ui_kits/voltops-console/AppShell.jsx":"2028b2ce7ce0","ui_kits/voltops-console/FlowScreen.jsx":"184cbbe2df38","ui_kits/voltops-console/app.jsx":"0588adb5866b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.VoltAgentDesignSystem_2e3ec5 = window.VoltAgentDesignSystem_2e3ec5 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/DotPattern.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function DotPattern({
  dotColor = "#fffdfbb0",
  dotSize = 1.2,
  spacing = 22,
  opacity = 0.15,
  style,
  ...rest
}) {
  const id = React.useId().replace(/:/g, "");
  return /*#__PURE__*/React.createElement("div", _extends({
    style: Object.assign({
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      zIndex: 1
    }, style)
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: "100%",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("title", null, "Decorative dot pattern background"), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "g" + id,
    cx: "50%",
    cy: "50%",
    r: "70%",
    fx: "50%",
    fy: "50%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "white",
    stopOpacity: "1"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "50%",
    stopColor: "white",
    stopOpacity: "0.5"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "white",
    stopOpacity: "0"
  })), /*#__PURE__*/React.createElement("pattern", {
    id: "p" + id,
    x: "0",
    y: "0",
    width: spacing,
    height: spacing,
    patternUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: spacing / 2,
    cy: spacing / 2,
    r: dotSize,
    fill: dotColor
  })), /*#__PURE__*/React.createElement("mask", {
    id: "m" + id
  }, /*#__PURE__*/React.createElement("rect", {
    width: "100%",
    height: "100%",
    fill: "url(#g" + id + ")"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "100%",
    height: "100%",
    fill: "url(#p" + id + ")",
    style: {
      opacity: opacity
    },
    mask: "url(#m" + id + ")"
  })));
}
Object.assign(__ds_scope, { DotPattern });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/DotPattern.jsx", error: String((e && e.message) || e) }); }

// components/brand/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Eyebrow({
  children,
  dot = true,
  tone = "default",
  size = "md",
  style,
  ...rest
}) {
  const tones = {
    default: "var(--volt-text-400)",
    accent: "var(--volt-emerald)",
    info: "var(--volt-indigo)"
  };
  const sizes = {
    sm: {
      fontSize: "14px",
      lineHeight: "20px",
      letterSpacing: "2.52px"
    },
    md: {
      fontSize: "18px",
      lineHeight: "28px",
      letterSpacing: "0.45px"
    }
  };
  return /*#__PURE__*/React.createElement("p", _extends({
    style: Object.assign({
      display: "flex",
      alignItems: "center",
      gap: "8px",
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      textTransform: "uppercase",
      color: tones[tone] || tones.default
    }, sizes[size] || sizes.md, style)
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: "8px",
      height: "8px",
      borderRadius: "9999px",
      background: "var(--volt-emerald-deep)",
      display: "inline-block"
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/brand/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CDN = "https://cdn.jsdelivr.net/npm/heroicons@2.2.0/24/";

/** Heroicons v2 rendered through a CSS mask so the glyph inherits currentColor. */
function Icon({
  name,
  size = 20,
  variant = "outline",
  color = "currentColor",
  style,
  ...rest
}) {
  const url = CDN + variant + "/" + name + ".svg";
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "img",
    "aria-label": name,
    style: Object.assign({
      display: "inline-block",
      width: size + "px",
      height: size + "px",
      flexShrink: 0,
      background: color,
      WebkitMaskImage: "url(" + url + ")",
      maskImage: "url(" + url + ")",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskPosition: "center",
      maskPosition: "center"
    }, style)
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Icon.jsx", error: String((e && e.message) || e) }); }

// components/brand/IconTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconTile({
  children,
  tone = "neutral",
  size = 40,
  style,
  ...rest
}) {
  const tones = {
    neutral: "rgba(184,179,176,0.1)",
    accent: "var(--volt-emerald-10)"
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: Object.assign({
      width: size + "px",
      height: size + "px",
      borderRadius: "var(--radius-sm)",
      background: tones[tone] || tones.neutral,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      color: tone === "accent" ? "var(--volt-emerald)" : "var(--volt-text-400)"
    }, style)
  }, rest), children);
}
Object.assign(__ds_scope, { IconTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/IconTile.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Logo({
  size = "md",
  wordmark = true,
  color = "var(--volt-emerald-deep)",
  style,
  ...rest
}) {
  const dims = {
    sm: {
      ring: 22,
      glyph: 12,
      text: 18
    },
    md: {
      ring: 28,
      glyph: 16,
      text: 24
    },
    lg: {
      ring: 36,
      glyph: 20,
      text: 32
    }
  };
  const d = dims[size] || dims.md;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: Object.assign({
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      fontFamily: "var(--font-sans)"
    }, style)
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: d.ring + "px",
      height: d.ring + "px",
      borderRadius: "9999px",
      border: "2px solid " + color,
      borderStyle: "solid",
      background: "var(--volt-emerald-08)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "bolt",
    variant: "solid",
    size: d.glyph,
    color: color
  })), wordmark ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: d.text + "px",
      fontWeight: 700,
      color: color,
      letterSpacing: "-0.02em"
    }
  }, "voltagent") : null);
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/controls/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    fontSize: "14px",
    lineHeight: "20px",
    padding: "8px 12px"
  },
  md: {
    fontSize: "16px",
    lineHeight: "24px",
    padding: "12px 16px"
  }
};
function Button({
  variant = "primary",
  size = "md",
  children,
  href,
  icon,
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    fontSize: s.fontSize,
    lineHeight: s.lineHeight,
    padding: s.padding,
    borderRadius: "var(--radius-sm)",
    border: "1px solid transparent",
    borderStyle: "solid",
    textDecoration: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    transition: "background-color var(--motion-base) ease, border-color var(--motion-base) ease, color var(--motion-base) ease",
    outline: "none",
    backdropFilter: "blur(4px)"
  };
  const looks = {
    primary: {
      background: hover && !disabled ? "var(--volt-emerald-soft)" : "var(--volt-emerald)",
      color: "var(--volt-on-emerald)",
      borderColor: "transparent"
    },
    outline: {
      background: "transparent",
      color: hover && !disabled ? "#f3f4f6" : "var(--volt-text-200)",
      borderColor: hover && !disabled ? "var(--volt-border-hover)" : "var(--volt-border)"
    },
    ghost: {
      background: hover && !disabled ? "var(--volt-canvas)" : "transparent",
      color: "var(--volt-emerald-soft)",
      borderColor: "transparent"
    }
  };
  const props = {
    style: Object.assign({}, base, looks[variant] || looks.primary, style),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: disabled ? undefined : onClick,
    ...rest
  };
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, icon, children);
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href
    }, props), inner);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled
  }, props), inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/controls/Button.jsx", error: String((e && e.message) || e) }); }

// components/controls/PillTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PillTag({
  children,
  tone = "default",
  dot = false,
  style,
  ...rest
}) {
  const tones = {
    default: {
      color: "var(--volt-text-500)",
      borderColor: "var(--volt-border)",
      background: "transparent"
    },
    accent: {
      color: "var(--volt-emerald)",
      borderColor: "var(--volt-emerald-30)",
      background: "var(--volt-emerald-10)"
    },
    solid: {
      color: "var(--volt-zinc-300)",
      borderColor: "rgba(63,63,70,0.5)",
      background: "rgba(39,39,42,0.8)"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: Object.assign({
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      fontFamily: "var(--font-sans)",
      fontSize: "12px",
      lineHeight: "16px",
      fontWeight: 400,
      padding: "2px 8px",
      borderRadius: "var(--radius-pill)",
      border: "1px solid",
      borderStyle: "solid",
      whiteSpace: "nowrap"
    }, tones[tone] || tones.default, style)
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: "6px",
      height: "6px",
      borderRadius: "9999px",
      background: "var(--volt-emerald)",
      display: "inline-block"
    }
  }) : null, children);
}
Object.assign(__ds_scope, { PillTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/controls/PillTag.jsx", error: String((e && e.message) || e) }); }

// components/controls/TextInput.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TextInput({
  label,
  placeholder,
  value,
  onChange,
  mono = false,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || "volt-input";
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      fontFamily: "var(--font-sans)"
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "12px",
      lineHeight: "12px",
      color: "var(--volt-text-400)"
    }
  }, label) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: Object.assign({
      background: "var(--volt-surface)",
      color: "var(--volt-text-200)",
      border: "1px solid " + (focus ? "var(--volt-emerald-soft)" : "var(--volt-border)"),
      borderStyle: "solid",
      borderRadius: "var(--radius-sm)",
      padding: "12px 16px",
      fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)",
      fontSize: mono ? "13px" : "14px",
      lineHeight: "20px",
      outline: "none",
      transition: "border-color var(--motion-base) ease",
      width: "100%",
      boxSizing: "border-box"
    }, style)
  }, rest)));
}
Object.assign(__ds_scope, { TextInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/controls/TextInput.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function DataTable({
  columns = [],
  rows = [],
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: Object.assign({
      border: "1px solid var(--volt-border)",
      borderStyle: "solid",
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      fontFamily: "var(--font-sans)"
    }, style)
  }, rest), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: "var(--volt-surface)"
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c,
    style: {
      textAlign: "left",
      padding: "12px 16px",
      fontSize: "12px",
      lineHeight: "16px",
      fontWeight: 600,
      letterSpacing: "1.2px",
      textTransform: "uppercase",
      color: "var(--volt-text-400)",
      borderBottom: "1px solid var(--volt-border)"
    }
  }, c)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--volt-border)"
    }
  }, r.map((cell, j) => /*#__PURE__*/React.createElement("td", {
    key: j,
    style: {
      padding: "12px 16px",
      fontSize: "14px",
      lineHeight: "20px",
      color: j === 0 ? "var(--volt-text-200)" : "var(--volt-text-500)"
    }
  }, cell)))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/PricingTier.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PricingTier({
  name,
  price,
  cadence = "/mo",
  blurb,
  features = [],
  featured = false,
  action,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: Object.assign({
      background: featured ? "var(--volt-text-100)" : "var(--volt-surface)",
      color: featured ? "var(--volt-on-emerald)" : "var(--volt-text-200)",
      border: "1px solid " + (featured ? "var(--volt-emerald)" : "var(--volt-border)"),
      borderStyle: "solid",
      borderRadius: "var(--radius-md)",
      padding: "24px",
      fontFamily: "var(--font-sans)",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      boxSizing: "border-box"
    }, style)
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "14px",
      fontWeight: 600,
      letterSpacing: "2.52px",
      textTransform: "uppercase",
      color: featured ? "#4b4b4b" : "var(--volt-text-400)"
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "4px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "36px",
      lineHeight: "40px",
      letterSpacing: "-0.9px",
      fontFamily: "var(--font-mono)"
    }
  }, price), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "14px",
      color: featured ? "#4b4b4b" : "var(--volt-text-500)"
    }
  }, cadence)), blurb ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "14px",
      lineHeight: "20px",
      color: featured ? "#4b4b4b" : "var(--volt-text-500)"
    }
  }, blurb) : null, /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      flex: 1
    }
  }, features.map(ft => /*#__PURE__*/React.createElement("li", {
    key: ft,
    style: {
      display: "flex",
      gap: "8px",
      fontSize: "14px",
      lineHeight: "20px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: featured ? "var(--volt-emerald-deep)" : "var(--volt-emerald)"
    }
  }, "+"), ft))), action);
}
Object.assign(__ds_scope, { PricingTier });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/PricingTier.jsx", error: String((e && e.message) || e) }); }

// components/data/SidebarRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SidebarRow({
  icon,
  label,
  active = false,
  badge,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: Object.assign({
      display: "flex",
      alignItems: "center",
      gap: "12px",
      width: "100%",
      textAlign: "left",
      padding: "12px 16px",
      borderRadius: "var(--radius-sm)",
      border: "none",
      background: active || hover ? "var(--volt-surface)" : "transparent",
      color: active ? "var(--volt-white)" : "var(--volt-text-500)",
      fontFamily: "var(--font-sans)",
      fontSize: "14px",
      lineHeight: "20px",
      cursor: "pointer",
      position: "relative",
      transition: "background-color var(--motion-fast) ease, color var(--motion-fast) ease",
      boxSizing: "border-box"
    }, style)
  }, rest), active ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      top: "8px",
      bottom: "8px",
      width: "2px",
      background: "var(--volt-emerald)",
      borderRadius: "9999px"
    }
  }) : null, icon, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, label), badge);
}
Object.assign(__ds_scope, { SidebarRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/SidebarRow.jsx", error: String((e && e.message) || e) }); }

// components/layout/Footer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Footer({
  columns = [],
  email = "info@voltagent.dev",
  social = [],
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("footer", _extends({
    style: Object.assign({
      borderTop: "1px solid var(--volt-border-faint)",
      padding: "48px 32px",
      color: "var(--volt-text-300)",
      fontFamily: "var(--font-sans)",
      boxSizing: "border-box"
    }, style)
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, null), social.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "24px",
      color: "var(--volt-gray-400)"
    }
  }, social) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--volt-emerald-deep)",
      fontSize: "14px"
    }
  }, email), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--volt-gray-400)",
      fontSize: "12px"
    }
  }, "VoltAgent Inc. \xA9 ", new Date().getFullYear())), columns.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.title,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "20px",
      fontWeight: 500,
      color: "var(--volt-text-300)"
    }
  }, col.title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }
  }, col.links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l
  }, /*#__PURE__*/React.createElement(FooterLink, null, l))))))));
}
function FooterLink({
  children
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      color: hover ? "var(--volt-emerald-deep)" : "var(--volt-gray-400)",
      fontSize: "14px",
      textDecoration: "none",
      transition: "color var(--motion-fast) ease"
    }
  }, children);
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Footer.jsx", error: String((e && e.message) || e) }); }

// components/layout/GreenDivider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function GreenDivider({
  variant = "green",
  style,
  ...rest
}) {
  if (variant === "dashed") {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: Object.assign({
        borderTop: "1px dashed var(--volt-border-dashed)",
        height: 0
      }, style)
    }, rest));
  }
  if (variant === "hairline") {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: Object.assign({
        borderTop: "1px solid var(--volt-border)",
        height: 0
      }, style)
    }, rest));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    style: Object.assign({
      borderTop: "2px solid var(--volt-emerald)",
      borderBottom: "2px solid var(--volt-emerald)",
      height: "0",
      background: "var(--volt-canvas)"
    }, style)
  }, rest));
}
Object.assign(__ds_scope, { GreenDivider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/GreenDivider.jsx", error: String((e && e.message) || e) }); }

// components/layout/HeroBand.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function HeroBand({
  eyebrow,
  headline,
  accent,
  subhead,
  actions,
  aside,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({
    style: Object.assign({
      position: "relative",
      padding: "48px 32px",
      background: "var(--volt-void)",
      fontFamily: "var(--font-sans)",
      boxSizing: "border-box"
    }, style)
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: aside ? "1fr 1fr" : "1fr",
      gap: "32px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, eyebrow ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "8px"
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "0 0 24px",
      fontSize: "60px",
      lineHeight: "60px",
      letterSpacing: "-0.65px",
      fontWeight: 400,
      color: "var(--volt-white)"
    }
  }, headline, accent ? /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--volt-emerald-soft)",
      fontStyle: "italic"
    }
  }, accent)) : null), subhead ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 48px",
      fontSize: "18px",
      lineHeight: "28px",
      color: "var(--volt-text-200)",
      maxWidth: "46ch",
      textWrap: "pretty"
    }
  }, subhead) : null, actions ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "16px",
      alignItems: "center"
    }
  }, actions) : null), aside ? /*#__PURE__*/React.createElement("div", null, aside) : null));
}
Object.assign(__ds_scope, { HeroBand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/HeroBand.jsx", error: String((e && e.message) || e) }); }

// components/layout/NavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function NavBar({
  links = [],
  active,
  cta,
  onNavigate,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: Object.assign({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "24px",
      padding: "12px 32px",
      background: "var(--volt-canvas)",
      borderBottom: "1px solid var(--volt-border-faint)",
      fontFamily: "var(--font-sans)",
      boxSizing: "border-box"
    }, style)
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    size: "sm",
    color: "var(--volt-emerald-deep)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "24px"
    }
  }, links.map(l => /*#__PURE__*/React.createElement(NavLink, {
    key: l.label,
    label: l.label,
    isActive: active === l.label,
    onClick: () => onNavigate && onNavigate(l.label)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px"
    }
  }, cta ? cta : /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm"
  }, "Get Started")));
}
function NavLink({
  label,
  isActive,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: "transparent",
      border: "none",
      padding: 0,
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: "14px",
      lineHeight: "20px",
      color: isActive ? "var(--volt-white)" : hover ? "var(--volt-text-200)" : "var(--volt-text-500)",
      transition: "color var(--motion-fast) ease"
    }
  }, label);
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/layout/SectionBand.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SectionBand({
  eyebrow,
  title,
  description,
  children,
  tone = "canvas",
  style,
  ...rest
}) {
  const fills = {
    canvas: "var(--volt-canvas)",
    void: "var(--volt-void)",
    docs: "var(--volt-ink-black)"
  };
  return /*#__PURE__*/React.createElement("section", _extends({
    style: Object.assign({
      background: fills[tone] || fills.canvas,
      padding: "48px 32px",
      fontFamily: "var(--font-sans)",
      boxSizing: "border-box"
    }, style)
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto"
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "16px"
    }
  }, eyebrow) : null, title ? /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 16px",
      fontSize: "36px",
      lineHeight: "40px",
      letterSpacing: "-0.9px",
      fontWeight: 400,
      color: "var(--volt-white)"
    }
  }, title) : null, description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 32px",
      fontSize: "20px",
      lineHeight: "28px",
      color: "var(--volt-text-500)",
      maxWidth: "60ch",
      textWrap: "pretty"
    }
  }, description) : null, children));
}
Object.assign(__ds_scope, { SectionBand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SectionBand.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  children,
  emphasized = false,
  interactive = false,
  selected = false,
  padding = "24px",
  style,
  onClick,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const lit = selected || interactive && hover;
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: Object.assign({
      background: lit ? "var(--volt-surface)" : "var(--volt-canvas)",
      border: (emphasized ? "3px solid " : "1px solid ") + (lit ? "var(--volt-border-hover)" : "var(--volt-border)"),
      borderStyle: "solid",
      borderRadius: "var(--radius-md)",
      padding: padding,
      color: "var(--volt-text-200)",
      fontFamily: "var(--font-sans)",
      transition: "background-color var(--motion-base) ease, border-color var(--motion-base) ease",
      cursor: interactive ? "pointer" : "default",
      boxSizing: "border-box"
    }, style)
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/CodeChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function CodeChip({
  children,
  prefix = "$",
  style,
  onClick,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: Object.assign({
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      background: hover ? "var(--volt-canvas)" : "var(--volt-surface)",
      color: "var(--text-code)",
      fontFamily: "var(--font-command)",
      fontSize: "13px",
      lineHeight: "18px",
      padding: "2px 8px",
      borderRadius: "var(--radius-sm)",
      border: "1px solid var(--volt-border)",
      borderStyle: "solid",
      cursor: onClick ? "pointer" : "text",
      transition: "background-color var(--motion-base) ease"
    }, style)
  }, rest), prefix ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--volt-emerald-soft)"
    }
  }, prefix) : null, children);
}
Object.assign(__ds_scope, { CodeChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/CodeChip.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/CodeMockup.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function CodeMockup({
  filename = "index.ts",
  code = "",
  language,
  copyable = true,
  style,
  ...rest
}) {
  const [copied, setCopied] = React.useState(false);
  const lines = String(code).split("\n");
  return /*#__PURE__*/React.createElement("div", _extends({
    style: Object.assign({
      background: "var(--volt-canvas)",
      border: "1px solid var(--volt-border)",
      borderStyle: "solid",
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      fontFamily: "var(--font-mono)",
      boxSizing: "border-box"
    }, style)
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      padding: "10px 16px",
      borderBottom: "1px solid var(--volt-border)",
      background: "var(--volt-panel)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "8px",
      height: "8px",
      borderRadius: "9999px",
      background: "var(--volt-emerald)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "12px",
      color: "var(--volt-text-500)"
    }
  }, filename)), copyable ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    },
    style: {
      background: "transparent",
      border: "1px solid var(--volt-border)",
      borderStyle: "solid",
      borderRadius: "var(--radius-xs)",
      color: copied ? "var(--volt-emerald)" : "var(--volt-text-500)",
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      padding: "2px 8px",
      cursor: "pointer",
      transition: "color var(--motion-base) ease"
    }
  }, copied ? "copied" : "copy") : null), /*#__PURE__*/React.createElement("pre", {
    style: {
      margin: 0,
      padding: "20px",
      fontSize: "13px",
      lineHeight: "18px",
      color: "var(--text-code)",
      overflowX: "auto",
      fontFamily: "var(--font-mono)"
    }
  }, lines.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--volt-text-600)",
      opacity: 0.5,
      userSelect: "none",
      minWidth: "16px",
      textAlign: "right"
    }
  }, i + 1), /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: "pre"
    }
  }, l)))));
}
Object.assign(__ds_scope, { CodeMockup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/CodeMockup.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/EmptyState.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function EmptyState({
  icon,
  title,
  description,
  action,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: Object.assign({
      background: "var(--volt-surface)",
      border: "1px dashed var(--volt-border-dashed)",
      borderStyle: "dashed",
      borderRadius: "var(--radius-md)",
      padding: "32px",
      textAlign: "center",
      fontFamily: "var(--font-sans)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
      boxSizing: "border-box"
    }, style)
  }, rest), icon, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 600,
      color: "var(--volt-white)"
    }
  }, title), description ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "14px",
      lineHeight: "20px",
      color: "var(--volt-text-500)",
      maxWidth: "36ch"
    }
  }, description) : null, action ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "8px"
    }
  }, action) : null);
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Modal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Modal({
  title,
  children,
  footer,
  open = true,
  onClose,
  width = "480px",
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(5,5,7,0.72)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 50
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", _extends({
    onClick: e => e.stopPropagation(),
    style: Object.assign({
      width: width,
      maxWidth: "92%",
      background: "var(--volt-canvas)",
      border: "1px solid var(--volt-border)",
      borderStyle: "solid",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--elev-3)",
      fontFamily: "var(--font-sans)",
      boxSizing: "border-box"
    }, style)
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 24px 0",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "20px",
      lineHeight: "28px",
      fontWeight: 600,
      color: "var(--volt-white)"
    }
  }, title), onClose ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    style: {
      background: "transparent",
      border: "none",
      color: "var(--volt-text-500)",
      fontSize: "18px",
      cursor: "pointer",
      lineHeight: 1
    }
  }, "\xD7") : null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 24px 24px",
      fontSize: "14px",
      lineHeight: "20px",
      color: "var(--volt-text-500)"
    }
  }, children), footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 24px",
      borderTop: "1px solid var(--volt-border)",
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px"
    }
  }, footer) : null));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Modal.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Toast({
  children,
  tone = "success",
  onDismiss,
  style,
  ...rest
}) {
  const accents = {
    success: "var(--volt-emerald)",
    error: "var(--volt-red)",
    info: "var(--volt-indigo)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: Object.assign({
      display: "inline-flex",
      alignItems: "center",
      gap: "12px",
      background: "var(--volt-canvas)",
      border: "1px solid var(--volt-border)",
      borderStyle: "solid",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--elev-2)",
      padding: "12px 16px",
      fontFamily: "var(--font-sans)",
      fontSize: "14px",
      lineHeight: "20px",
      color: "var(--volt-text-200)"
    }, style)
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: "8px",
      height: "8px",
      borderRadius: "9999px",
      background: accents[tone] || accents.success,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", null, children), onDismiss ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onDismiss,
    "aria-label": "Dismiss",
    style: {
      background: "transparent",
      border: "none",
      color: "var(--volt-text-500)",
      cursor: "pointer",
      fontSize: "16px",
      lineHeight: 1
    }
  }, "\xD7") : null);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Toast.jsx", error: String((e && e.message) || e) }); }

// ui_kits/docs/DocsScreen.jsx
try { (() => {
const {
  Logo,
  Icon,
  PillTag,
  CodeMockup,
  Card,
  TextInput,
  Button,
  DotPattern,
  EmptyState
} = window.VoltAgentDesignSystem_2e3ec5;
const TABS = ["Home", "VoltAgent Framework", "Models", "Observability", "Evaluation", "Prompt Engineering", "Deployment", "Recipes & Guides"];
const SIDEBAR = [{
  group: "Getting started",
  items: ["Introduction", "Quick Start", "Installation", "Project structure"]
}, {
  group: "Core",
  items: ["Agents", "Memory", "RAG", "Tools", "MCP", "Guardrails", "Voice", "Workflow"]
}, {
  group: "Providers",
  items: ["OpenAI", "Anthropic", "Google", "Ollama"]
}];
const CORE_FEATURES = ["Memory", "RAG", "Guardrails", "Tools", "MCP", "Voice", "Workflow"];
const QUICK_LINKS = [{
  title: "Quick Start",
  description: "Get up and running with VoltAgent in minutes.",
  icon: "rocket-launch"
}, {
  title: "Recipes & Guides",
  description: "Ready-to-use patterns and best practices.",
  icon: "book-open"
}, {
  title: "5 Steps Tutorial",
  description: "Learn the fundamentals with hands-on examples.",
  icon: "list-bullet"
}];
const CODE = `import { VoltAgent, Agent } from "@voltagent/core";
import { honoServer } from "@voltagent/server-hono";
import { openai } from "@ai-sdk/openai";

const agent = new Agent({
  name: "my-voltagent-app",
  instructions: "A helpful assistant that answers questions",
  model: openai("gpt-4o-mini"),
});

new VoltAgent({
  agents: { agent },
  server: honoServer(),
});`;
function DocNavbar({
  tab,
  onTab
}) {
  return /*#__PURE__*/React.createElement("nav", {
    className: "dk-nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dk-top"
  }, /*#__PURE__*/React.createElement(Logo, {
    wordmark: false,
    color: "var(--volt-emerald)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "12px",
      color: "var(--volt-text-500)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chat-bubble-left-right",
    size: 18
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "code-bracket-square",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "220px"
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    placeholder: "Search docs\u2026"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dk-tabs"
  }, TABS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    type: "button",
    className: "dk-tab" + (t === tab ? " on" : ""),
    onClick: () => onTab(t)
  }, t))));
}
function Sidebar({
  active,
  onSelect
}) {
  return /*#__PURE__*/React.createElement("aside", {
    className: "dk-side"
  }, SIDEBAR.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.group
  }, /*#__PURE__*/React.createElement("div", {
    className: "dk-grp"
  }, g.group), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "2px"
    }
  }, g.items.map(it => {
    const on = it === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it,
      type: "button",
      onClick: () => onSelect(it),
      style: {
        textAlign: "left",
        padding: "7px 12px",
        borderRadius: "var(--radius-sm)",
        border: "none",
        background: on ? "var(--volt-surface)" : "transparent",
        color: on ? "var(--volt-emerald-soft)" : "var(--volt-text-500)",
        fontFamily: "var(--font-sans)",
        fontSize: "14px",
        cursor: "pointer",
        transition: "background-color var(--motion-fast) ease, color var(--motion-fast) ease"
      }
    }, it);
  })))));
}
function DocsHomeArticle() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "32px 0 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "48px",
      lineHeight: 1.2,
      fontWeight: 600,
      marginBottom: "16px",
      background: "linear-gradient(to right,#ffffff,#a1a1aa)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    }
  }, "Build \xB7 Observe \xB7 Automate \xB7 Ship", /*#__PURE__*/React.createElement("br", null), "AI Agents"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "18px",
      color: "var(--volt-white)",
      maxWidth: "36rem",
      margin: "0 auto"
    }
  }, "AI Agent Engineering Platform for ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#b2b2b2"
    }
  }, "development"), ", ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#b2b2b2"
    }
  }, "observability"), ", ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#b2b2b2"
    }
  }, "evaluation"), ", and ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#b2b2b2"
    }
  }, "deployment"), " in one place.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "12px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "code-bracket",
    size: 24,
    color: "var(--volt-emerald)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "24px",
      fontWeight: 600,
      color: "var(--volt-white)"
    }
  }, "Core"), /*#__PURE__*/React.createElement(PillTag, {
    tone: "solid"
  }, "Open Source TypeScript Framework")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "16px",
      color: "var(--volt-zinc-400)",
      marginBottom: "16px"
    }
  }, "Everything you need to build production-ready AI agents in TypeScript."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginBottom: "24px"
    }
  }, CORE_FEATURES.map(ft => /*#__PURE__*/React.createElement(PillTag, {
    key: ft,
    tone: "solid"
  }, ft)), /*#__PURE__*/React.createElement(PillTag, {
    tone: "solid"
  }, "and more\u2026")), /*#__PURE__*/React.createElement(CodeMockup, {
    filename: "src/index.ts",
    code: CODE
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "16px",
      marginBottom: "32px"
    }
  }, QUICK_LINKS.map(l => /*#__PURE__*/React.createElement(Card, {
    key: l.title,
    interactive: true,
    padding: "16px",
    style: {
      background: "transparent",
      borderColor: "var(--volt-zinc-800)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "12px",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: l.icon,
    size: 20,
    color: "var(--volt-emerald)"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "16px",
      color: "var(--volt-white)",
      fontWeight: 500
    }
  }, l.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "14px",
      color: "#b2b2b2",
      marginTop: "4px"
    }
  }, l.description)))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "12px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "squares-2x2",
    size: 24,
    color: "var(--volt-emerald)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "24px",
      fontWeight: 600,
      color: "var(--volt-white)"
    }
  }, "VoltOps Console"), /*#__PURE__*/React.createElement(PillTag, {
    tone: "solid"
  }, "Cloud / Self-Hosted Platform")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "16px",
      color: "var(--volt-zinc-400)",
      marginBottom: "16px"
    }
  }, "Enterprise-grade platform to take AI agents from development to production."), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/product/voltops-flow-detail.png",
    alt: "VoltOps trace detail",
    style: {
      width: "100%",
      display: "block",
      border: "1px solid var(--volt-border)",
      borderRadius: "var(--radius-md)"
    }
  })));
}
function DocArticle({
  page
}) {
  if (page === "Introduction" || page === "Home") return /*#__PURE__*/React.createElement(DocsHomeArticle, null);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      alignItems: "center",
      fontSize: "14px",
      color: "var(--volt-text-500)",
      marginBottom: "16px"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Docs"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 12
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--volt-text-200)"
    }
  }, page)), /*#__PURE__*/React.createElement("h1", {
    className: "dk-h1",
    style: {
      marginBottom: "12px"
    }
  }, page), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "16px",
      lineHeight: "26px",
      color: "var(--volt-text-500)",
      marginBottom: "24px",
      maxWidth: "68ch"
    }
  }, "This page is a layout stand-in. The real content for ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--volt-text-200)"
    }
  }, page), " lives in", " ", /*#__PURE__*/React.createElement("code", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "13px",
      background: "var(--volt-surface)",
      padding: "2px 6px",
      borderRadius: "var(--radius-sm)"
    }
  }, "website/docs/"), " upstream \u2014 the kit reproduces the chrome, not the prose."), /*#__PURE__*/React.createElement(CodeMockup, {
    filename: page.toLowerCase().replace(/\s+/g, "-") + ".ts",
    code: CODE
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "24px"
    }
  }, /*#__PURE__*/React.createElement(EmptyState, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "document-text",
      size: 24,
      color: "var(--volt-text-500)"
    }),
    title: "Body copy not recreated",
    description: "Docs prose is authored upstream; this kit exists to show the navbar, sidebar, code chrome and TOC."
  })));
}
function Toc({
  page
}) {
  const items = page === "Introduction" || page === "Home" ? ["Core", "Quick links", "VoltOps Console"] : ["Overview", "Installation", "Usage", "API reference"];
  return /*#__PURE__*/React.createElement("aside", {
    className: "dk-toc"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dk-grp",
    style: {
      padding: "0 0 8px"
    }
  }, "On this page"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      borderLeft: "1px solid var(--volt-border)",
      paddingLeft: "12px"
    }
  }, items.map((i, n) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    style: {
      fontSize: "13px",
      color: n === 0 ? "var(--volt-emerald-soft)" : "var(--volt-text-500)",
      textDecoration: "none"
    }
  }, i))));
}
function DocsScreen() {
  const [tab, setTab] = React.useState("Home");
  const [page, setPage] = React.useState("Introduction");
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DocNavbar, {
    tab: tab,
    onTab: setTab
  }), /*#__PURE__*/React.createElement("div", {
    className: "dk-body"
  }, /*#__PURE__*/React.createElement(Sidebar, {
    active: page,
    onSelect: setPage
  }), /*#__PURE__*/React.createElement("article", {
    className: "dk-art"
  }, /*#__PURE__*/React.createElement(DotPattern, {
    dotColor: "#94a3b8",
    spacing: 20
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement(DocArticle, {
    page: page
  }))), /*#__PURE__*/React.createElement(Toc, {
    page: page
  })));
}
Object.assign(window, {
  DocsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/docs/DocsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/docs/app.jsx
try { (() => {
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(DocsScreen, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/docs/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/HomeScreen.jsx
try { (() => {
const {
  HeroBand,
  SectionBand,
  GreenDivider,
  Card,
  CodeMockup,
  CodeChip,
  Button,
  Icon,
  IconTile,
  Eyebrow,
  PillTag
} = window.VoltAgentDesignSystem_2e3ec5;
const heroCode = `import { VoltAgent, Agent } from "@voltagent/core";
import { honoServer } from "@voltagent/server-hono";
import { openai } from "@ai-sdk/openai";

const agent = new Agent({
  name: "my-voltagent-app",
  instructions: "A helpful assistant that answers questions",
  model: openai("gpt-4o-mini"),
});

new VoltAgent({
  agents: { agent },
  server: honoServer(),
});`;
const TOOLKIT = [{
  key: "tools",
  icon: "wrench",
  title: "Tool calling",
  body: "Enable agents to invoke functions and interact with systems."
}, {
  key: "api",
  icon: "window",
  title: "Unified API",
  body: "Seamlessly switch between different AI providers with a simple code update."
}, {
  key: "prompt",
  icon: "command-line",
  title: "Dynamic Prompting",
  body: "Experiment, fine-tune, and iterate your AI prompts in an integrated environment."
}, {
  key: "memory",
  icon: "circle-stack",
  title: "Persistent Memory",
  body: "Store and recall interactions to enhance your agents intelligence and context."
}];
const SNIPPETS = {
  tools: `const weather = createTool({\n  name: "get_weather",\n  parameters: z.object({ city: z.string() }),\n  execute: async ({ city }) => fetchWeather(city),\n});`,
  api: `const agent = new Agent({\n  model: anthropic("claude-sonnet-4-5"),\n  // swap providers with one line\n});`,
  prompt: `const prompt = await voltops.getPrompt("triage", {\n  variables: { tone: "concise" },\n});`,
  memory: `const memory = new Memory({\n  storage: new LibSQLMemoryAdapter(),\n});`
};
const OPS = [{
  icon: "rocket-launch",
  title: "Deployment",
  body: "Deploy your Agents in seconds with VoltAgent Deployment.",
  shot: "voltops-agent-list.png"
}, {
  icon: "bug-ant",
  title: "Debugging",
  body: "Debug and analyze your agent's behavior with visual flows.",
  shot: "voltops-flow.png"
}, {
  icon: "chart-bar",
  title: "Observability",
  body: "Connect your agents to popular observability platforms.",
  shot: "voltops-flow-detail.png"
}, {
  icon: "chat-bubble-bottom-center",
  title: "AI Chat",
  body: "Interact with your AI agent through natural language chat.",
  shot: "voltops-agent-chat.png"
}];
function PlatformBox({
  title,
  tags,
  features,
  blurb
}) {
  return /*#__PURE__*/React.createElement(Card, {
    interactive: true,
    padding: "24px",
    style: {
      background: "var(--volt-void)",
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--volt-white)",
      fontWeight: 600,
      fontSize: "20px"
    }
  }, title), tags.map(t => /*#__PURE__*/React.createElement(PillTag, {
    key: t
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
      color: "var(--volt-emerald-soft)"
    }
  }, features.map((ft, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: ft
  }, i > 0 ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "rgba(255,255,255,0.2)"
    }
  }, "|") : null, /*#__PURE__*/React.createElement("span", null, ft)))), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--volt-text-200)",
      fontSize: "16px"
    }
  }, blurb));
}
function HomeScreen() {
  const [feature, setFeature] = React.useState("tools");
  const [copied, setCopied] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(HeroBand, {
    eyebrow: /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        fontSize: "24px",
        color: "var(--volt-emerald-soft)",
        fontWeight: 400,
        textDecoration: "none"
      }
    }, "The end-to-end"),
    headline: "AI Agent Engineering",
    accent: "Platform",
    subhead: /*#__PURE__*/React.createElement(React.Fragment, null, "Build enterprise multi-agent systems \u2014 ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--volt-text-500)"
      }
    }, "development"), ",", " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--volt-text-500)"
      }
    }, "observability"), ", and", " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--volt-text-500)"
      }
    }, "deployment"), " in one platform."),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-right",
        size: 22
      }),
      style: {
        fontFamily: "var(--font-mono)",
        fontWeight: 700
      }
    }, "Get Started"), /*#__PURE__*/React.createElement(CodeChip, {
      onClick: () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      },
      style: {
        height: "53px",
        padding: "12px 16px",
        borderRadius: "var(--radius-md)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: "220px",
        display: "inline-block"
      }
    }, copied ? "Copied to clipboard!" : "npm create voltagent-app@latest"))),
    aside: /*#__PURE__*/React.createElement(CodeMockup, {
      filename: "index.ts",
      code: heroCode
    })
  }), /*#__PURE__*/React.createElement(SectionBand, {
    eyebrow: /*#__PURE__*/React.createElement(Eyebrow, {
      style: {
        justifyContent: "center"
      }
    }, "The Platform"),
    style: {
      paddingTop: "40px",
      paddingBottom: "40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr auto 1fr",
      gap: "16px",
      alignItems: "stretch",
      marginTop: "24px"
    }
  }, /*#__PURE__*/React.createElement(PlatformBox, {
    title: "Core Framework",
    tags: ["Open Source"],
    features: ["Memory", "RAG", "Guardrails", "Tools", "MCP", "Voice", "Workflow"],
    blurb: "Build agents with open-source TypeScript framework."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "rgba(255,255,255,0.3)",
      fontSize: "24px",
      fontWeight: 300
    }
  }, "+"), /*#__PURE__*/React.createElement(PlatformBox, {
    title: "VoltOps Console",
    tags: ["Cloud", "Self-Hosted"],
    features: ["Observability", "Automation", "Deployment", "Evals", "Guardrails", "Prompts"],
    blurb: "Automate, debug, and deploy your agents with console."
  }))), /*#__PURE__*/React.createElement(GreenDivider, {
    variant: "dashed"
  }), /*#__PURE__*/React.createElement(SectionBand, {
    tone: "void",
    eyebrow: /*#__PURE__*/React.createElement(Eyebrow, {
      size: "sm"
    }, "Enterprise-level AI agents"),
    title: "Complete toolkit for enterprise level AI agents",
    description: "Design production-ready agents with unified APIs, tools, and memory."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "32px",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-grid2"
  }, TOOLKIT.map(t => /*#__PURE__*/React.createElement(Card, {
    key: t.key,
    interactive: true,
    selected: feature === t.key,
    padding: "12px",
    onClick: () => setFeature(t.key)
  }, /*#__PURE__*/React.createElement(IconTile, {
    style: {
      marginBottom: "8px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: t.icon,
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "16px",
      fontWeight: 600,
      color: "var(--volt-white)",
      marginBottom: "8px"
    }
  }, t.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "12px",
      lineHeight: "18px",
      color: "var(--volt-text-500)"
    }
  }, t.body)))), /*#__PURE__*/React.createElement(CodeMockup, {
    filename: feature + ".ts",
    code: SNIPPETS[feature]
  }))), /*#__PURE__*/React.createElement(SectionBand, {
    eyebrow: /*#__PURE__*/React.createElement(Eyebrow, {
      dot: false,
      tone: "info",
      size: "sm"
    }, "Observability"),
    title: "Stay in control at every stage",
    description: "From tracking deployments to debugging and live interaction, VoltAgent gives you full visibility into your AI agents."
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-grid2"
  }, OPS.map(o => /*#__PURE__*/React.createElement("div", {
    key: o.title,
    style: {
      border: "1px solid var(--volt-border-faint)",
      borderRadius: "var(--radius-md)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px",
      borderBottom: "1px solid var(--volt-border-faint)",
      background: "var(--volt-panel)",
      display: "flex",
      gap: "16px",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    tone: "accent"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: o.icon,
    size: 20
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "16px",
      fontWeight: 600,
      color: "var(--volt-white)",
      marginBottom: "4px"
    }
  }, o.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "14px",
      lineHeight: "20px",
      color: "var(--volt-gray-400)"
    }
  }, o.body))), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/product/" + o.shot,
    alt: o.title,
    style: {
      width: "100%",
      display: "block"
    }
  }))))));
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/PricingScreen.jsx
try { (() => {
const {
  SectionBand,
  PricingTier,
  Button,
  Card,
  DataTable,
  PillTag,
  Eyebrow,
  Icon,
  GreenDivider
} = window.VoltAgentDesignSystem_2e3ec5;
const TIERS = [{
  name: "Core",
  price: "$0",
  cadence: "",
  blurb: "The open-source TypeScript framework, self-hosted.",
  features: ["Unlimited agents", "Memory, RAG, MCP, Workflow", "Community support"],
  cta: "Install"
}, {
  name: "Pro",
  price: "$50",
  blurb: "For teams taking agents to production.",
  features: ["100k traces / month", "Evals + prompt management", "Deployment", "Email support"],
  featured: true,
  cta: "Start free"
}, {
  name: "Enterprise",
  price: "Custom",
  cadence: "",
  blurb: "Self-hosted VoltOps, SSO and SLAs.",
  features: ["Unlimited traces", "Self-hosted console", "SSO / SAML", "Dedicated support"],
  cta: "Talk to us"
}];
function PricingScreen() {
  const [annual, setAnnual] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SectionBand, {
    tone: "void",
    eyebrow: /*#__PURE__*/React.createElement(Eyebrow, {
      size: "sm"
    }, "Pricing"),
    title: "Start free. Scale when your agents do.",
    description: "The framework is open source forever. VoltOps is priced on traces, not seats."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      alignItems: "center",
      marginBottom: "24px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: annual ? "outline" : "primary",
    onClick: () => setAnnual(false)
  }, "Monthly"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: annual ? "primary" : "outline",
    onClick: () => setAnnual(true)
  }, "Annual \xB7 2 months free")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "16px",
      alignItems: "stretch"
    }
  }, TIERS.map(t => /*#__PURE__*/React.createElement(PricingTier, {
    key: t.name,
    name: t.name,
    price: t.name === "Pro" && annual ? "$500" : t.price,
    cadence: t.name === "Pro" ? annual ? "/yr" : "/mo" : t.cadence,
    blurb: t.blurb,
    features: t.features,
    featured: t.featured,
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: t.featured ? "primary" : "outline"
    }, t.cta)
  })))), /*#__PURE__*/React.createElement(GreenDivider, {
    variant: "dashed"
  }), /*#__PURE__*/React.createElement(SectionBand, {
    title: "What's included",
    description: "Every plan ships the full framework. Limits apply to the console only."
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: ["Capability", "Core", "Pro", "Enterprise"],
    rows: [["Agents & workflows", "Unlimited", "Unlimited", "Unlimited"], ["Traces retained", "Local only", "100k / mo", "Unlimited"], ["Evals & guardrails", "—", /*#__PURE__*/React.createElement(PillTag, {
      tone: "accent",
      dot: true
    }, "Included"), /*#__PURE__*/React.createElement(PillTag, {
      tone: "accent",
      dot: true
    }, "Included")], ["Prompt management", "—", /*#__PURE__*/React.createElement(PillTag, {
      tone: "accent",
      dot: true
    }, "Included"), /*#__PURE__*/React.createElement(PillTag, {
      tone: "accent",
      dot: true
    }, "Included")], ["Deployment", "Self-managed", "Managed", "Managed or self-hosted"], ["SSO / SAML", "—", "—", /*#__PURE__*/React.createElement(PillTag, {
      tone: "accent",
      dot: true
    }, "Included")]]
  }), /*#__PURE__*/React.createElement(Card, {
    style: {
      marginTop: "16px",
      display: "flex",
      gap: "16px",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "16px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "building-office-2",
    size: 24,
    color: "var(--volt-emerald)"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--volt-white)",
      fontWeight: 600,
      fontSize: "16px"
    }
  }, "Need it inside your own VPC?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "14px",
      color: "var(--volt-text-500)"
    }
  }, "VoltOps self-hosted runs alongside your agents with no data leaving your network."))), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost"
  }, "Contact sales"))));
}
Object.assign(window, {
  PricingScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/PricingScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/app.jsx
try { (() => {
const DS = window.VoltAgentDesignSystem_2e3ec5;
function App() {
  const [route, setRoute] = React.useState("Home");
  const {
    NavBar,
    Footer,
    DotPattern,
    Button
  } = DS;
  return /*#__PURE__*/React.createElement("div", {
    className: "mk-shell"
  }, /*#__PURE__*/React.createElement(DotPattern, null), /*#__PURE__*/React.createElement("div", {
    className: "mk-band"
  }, /*#__PURE__*/React.createElement(NavBar, {
    links: [{
      label: "Home"
    }, {
      label: "Pricing"
    }],
    active: route,
    onNavigate: setRoute,
    cta: /*#__PURE__*/React.createElement(Button, {
      size: "sm"
    }, "Start free"),
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20
    }
  }), route === "Home" ? /*#__PURE__*/React.createElement(HomeScreen, null) : /*#__PURE__*/React.createElement(PricingScreen, null), /*#__PURE__*/React.createElement(Footer, {
    columns: [{
      title: "Resources",
      links: ["Getting Started", "Blog", "Changelog", "Docs", "Tutorial", "llms.txt"]
    }, {
      title: "Community",
      links: ["Contributing", "About us", "OSS Friends"]
    }]
  })));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/voltops-console/AgentsScreen.jsx
try { (() => {
const {
  DataTable,
  PillTag,
  Card,
  Button,
  Icon,
  IconTile,
  EmptyState,
  Eyebrow,
  SidebarRow
} = window.VoltAgentDesignSystem_2e3ec5;
const AGENTS = [["supervisor", "Agent", "1,284", "820ms", "completed"], ["stars_fetcher", "Sub-agent", "1,284", "310ms", "completed"], ["contributors_fetcher", "Sub-agent", "1,281", "402ms", "completed"], ["invoice-parser", "Workflow", "417", "1.2s", "paused"], ["rag-search", "Agent", "9,032", "340ms", "completed"]];
function StatCard({
  label,
  value,
  sub,
  icon
}) {
  return /*#__PURE__*/React.createElement(Card, {
    padding: "16px",
    style: {
      display: "flex",
      gap: "12px",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    tone: "accent",
    size: 36
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "11px",
      letterSpacing: "1.6px",
      textTransform: "uppercase",
      color: "var(--volt-text-500)",
      fontWeight: 600
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "vo-mono",
    style: {
      fontSize: "24px",
      color: "var(--volt-white)",
      lineHeight: "32px"
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "12px",
      color: "var(--volt-text-500)"
    }
  }, sub)));
}
function AgentsScreen({
  onOpenFlow
}) {
  const [filter, setFilter] = React.useState("All");
  const rows = AGENTS.filter(a => filter === "All" || (filter === "Agents" ? a[1] !== "Workflow" : a[1] === "Workflow"));
  return /*#__PURE__*/React.createElement("div", {
    className: "vo-scroll",
    style: {
      flex: 1,
      padding: "24px",
      background: "var(--volt-ink-black)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "16px",
      flexWrap: "wrap",
      alignItems: "flex-end",
      marginBottom: "20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: "260px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    size: "sm"
  }, "Observability"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "36px",
      lineHeight: "40px",
      letterSpacing: "-0.9px",
      fontWeight: 400,
      color: "var(--volt-white)",
      marginTop: "8px"
    }
  }, "Agents")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px"
    }
  }, ["All", "Agents", "Workflows"].map(f => /*#__PURE__*/React.createElement(Button, {
    key: f,
    size: "sm",
    variant: filter === f ? "primary" : "outline",
    onClick: () => setFilter(f)
  }, f)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "16px",
      marginBottom: "20px"
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Traces",
    value: "12,014",
    sub: "last 24h",
    icon: "chart-bar"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "p95 latency",
    value: "820ms",
    sub: "\u221212% vs yesterday",
    icon: "bolt"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Tokens",
    value: "2.7M",
    sub: "prompt + completion",
    icon: "circle-stack"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Failures",
    value: "3",
    sub: "0.02% of runs",
    icon: "bug-ant"
  })), /*#__PURE__*/React.createElement(DataTable, {
    columns: ["Name", "Type", "Runs", "p95", "Status"],
    rows: rows.map(a => [/*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onOpenFlow,
      className: "vo-mono",
      style: {
        background: "transparent",
        border: "none",
        color: "var(--volt-emerald-soft)",
        cursor: "pointer",
        padding: 0,
        fontSize: "14px"
      }
    }, a[0]), a[1], a[2], a[3], a[4] === "completed" ? /*#__PURE__*/React.createElement(PillTag, {
      tone: "accent",
      dot: true
    }, "completed") : /*#__PURE__*/React.createElement(PillTag, null, "paused")])
  }), rows.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "16px"
    }
  }, /*#__PURE__*/React.createElement(EmptyState, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "inbox",
      size: 24,
      color: "var(--volt-text-500)"
    }),
    title: "Nothing matches that filter",
    description: "Try another type, or run an agent locally to stream spans in."
  })) : null);
}
Object.assign(window, {
  AgentsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/voltops-console/AgentsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/voltops-console/AppShell.jsx
try { (() => {
const {
  Icon,
  PillTag,
  Logo
} = window.VoltAgentDesignSystem_2e3ec5;
function RailButton({
  name,
  active,
  dot,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      width: "40px",
      height: "40px",
      borderRadius: "var(--radius-sm)",
      border: "none",
      background: active || hover ? "var(--volt-surface)" : "transparent",
      color: active ? "var(--volt-emerald)" : "var(--volt-text-500)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color var(--motion-fast) ease, color var(--motion-fast) ease"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: name,
    size: 20
  }), dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "8px",
      right: "8px",
      width: "6px",
      height: "6px",
      borderRadius: "9999px",
      background: "var(--volt-emerald)"
    }
  }) : null);
}
function Rail({
  route,
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "56px",
      flexShrink: 0,
      background: "var(--volt-ink-black)",
      borderRight: "1px solid var(--volt-border)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "12px 0",
      gap: "8px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "8px"
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    size: "sm",
    wordmark: false,
    color: "var(--volt-emerald)"
  })), /*#__PURE__*/React.createElement(RailButton, {
    name: "squares-2x2",
    active: route === "agents",
    onClick: () => onNavigate("agents")
  }), /*#__PURE__*/React.createElement(RailButton, {
    name: "share",
    active: route === "flow",
    onClick: () => onNavigate("flow")
  }), /*#__PURE__*/React.createElement(RailButton, {
    name: "document-text"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(RailButton, {
    name: "bell",
    dot: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "32px",
      height: "32px",
      borderRadius: "9999px",
      background: "linear-gradient(160deg,#2fd6a1,#1f2937)",
      marginTop: "8px"
    }
  }));
}
function TopBar({
  agentName
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: "56px",
      flexShrink: 0,
      borderBottom: "1px solid var(--volt-border)",
      background: "var(--volt-ink-black)",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      padding: "0 16px"
    }
  }, agentName ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "18px",
      fontWeight: 600,
      color: "var(--volt-white)"
    }
  }, agentName) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      border: "1px solid var(--volt-border)",
      borderRadius: "var(--radius-md)",
      padding: "8px 14px",
      background: "var(--volt-node-fill)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "8px",
      height: "8px",
      borderRadius: "9999px",
      background: "var(--volt-emerald)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "vo-mono",
    style: {
      fontSize: "13px",
      color: "var(--volt-text-200)"
    }
  }, "http://localhost:3141")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "var(--volt-text-200)",
      fontSize: "14px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle",
    variant: "solid",
    size: 18,
    color: "var(--volt-emerald)"
  }), "Connected"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      color: "var(--volt-text-500)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    variant: "solid",
    size: 18,
    color: "#eab308"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "code-bracket-square",
    size: 20
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "chat-bubble-left-right",
    size: 20
  })));
}
function PanelHeader({
  title,
  collapsed,
  onToggle,
  right
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "vo-hdr"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onToggle,
    style: {
      width: "28px",
      height: "28px",
      border: "1px solid var(--volt-border)",
      borderRadius: "var(--radius-sm)",
      background: "transparent",
      color: "var(--volt-text-400)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: collapsed ? "chevron-down" : "chevron-up",
    size: 14
  })), /*#__PURE__*/React.createElement("span", {
    className: "vo-ttl"
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), right);
}
Object.assign(window, {
  Rail,
  TopBar,
  PanelHeader,
  RailButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/voltops-console/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/voltops-console/FlowScreen.jsx
try { (() => {
const {
  Icon,
  PillTag,
  TextInput,
  Button
} = window.VoltAgentDesignSystem_2e3ec5;
const NODE_ACCENT = {
  memory: "var(--volt-node-memory)",
  agent: "var(--volt-node-agent)",
  tool: "var(--volt-node-tool)"
};
function FlowNode({
  kind,
  title,
  icon,
  rows,
  prompt,
  status,
  x,
  y,
  selected,
  onSelect
}) {
  const accent = NODE_ACCENT[kind];
  return /*#__PURE__*/React.createElement("div", {
    onClick: onSelect,
    style: {
      position: "absolute",
      left: x,
      top: y,
      width: "260px",
      cursor: "pointer",
      background: "var(--volt-node-fill)",
      borderRadius: "var(--radius-md)",
      border: "2px solid " + accent,
      boxShadow: selected ? "0 0 0 3px rgba(0,217,146,0.18)" : "none",
      transition: "box-shadow var(--motion-fast) ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 12px",
      borderBottom: "1px solid var(--volt-border)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "24px",
      height: "24px",
      borderRadius: "9999px",
      border: "1px solid var(--volt-border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--volt-text-300)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 13
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "14px",
      fontWeight: 600,
      color: "var(--volt-white)"
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      width: "6px",
      height: "6px",
      borderRadius: "9999px",
      background: accent
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "eye",
    size: 14,
    color: "var(--volt-text-500)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 12px"
    }
  }, prompt ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "12px",
      lineHeight: "18px",
      color: "var(--volt-text-300)",
      marginBottom: "8px"
    }
  }, prompt) : null, (rows || []).map(r => /*#__PURE__*/React.createElement("div", {
    className: "vo-row",
    key: r[0]
  }, /*#__PURE__*/React.createElement("span", {
    className: "vo-k"
  }, r[0]), /*#__PURE__*/React.createElement("span", {
    className: "vo-v"
  }, r[1]))), ["Input:", "Output:"].map(l => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "var(--volt-node-row)",
      borderRadius: "var(--radius-xs)",
      padding: "6px 8px",
      marginTop: "6px",
      fontSize: "12px",
      color: accent
    }
  }, /*#__PURE__*/React.createElement("span", null, l), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--volt-text-500)"
    }
  }, "+"))), status ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "8px",
      paddingTop: "8px",
      borderTop: "1px solid var(--volt-border)",
      fontSize: "12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      color: "var(--volt-emerald)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "6px",
      height: "6px",
      borderRadius: "9999px",
      background: "var(--volt-emerald)"
    }
  }), "Status: ", status), /*#__PURE__*/React.createElement("em", {
    style: {
      color: "var(--volt-text-500)"
    }
  }, "Completed")) : null));
}
function IoPanel({
  direction,
  body,
  tokens
}) {
  const isIn = direction === "Input";
  return /*#__PURE__*/React.createElement("div", {
    className: "vo-panel",
    style: {
      width: "300px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "vo-hdr",
    style: {
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "24px",
      height: "24px",
      borderRadius: "9999px",
      border: "1px solid var(--volt-border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--volt-text-300)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: isIn ? "chevron-double-right" : "chevron-double-left",
    size: 12
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "14px",
      fontWeight: 600,
      color: "var(--volt-white)"
    }
  }, direction), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), isIn ? /*#__PURE__*/React.createElement(Icon, {
    name: "eye",
    size: 14,
    color: "var(--volt-text-500)"
  }) : /*#__PURE__*/React.createElement(PillTag, {
    tone: "accent"
  }, "completed")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "12px",
      lineHeight: "18px",
      color: "var(--volt-text-300)"
    }
  }, body), !isIn ? /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontSize: "11px",
      display: "block",
      textAlign: "right",
      marginTop: "6px"
    }
  }, "Show More") : null, tokens ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "10px",
      paddingTop: "10px",
      borderTop: "1px solid var(--volt-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "11px",
      color: "var(--volt-text-500)",
      marginBottom: "6px"
    }
  }, "LLM Usage Statistics:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "18px"
    }
  }, [["Prompt", tokens[0], "var(--volt-blue-soft)"], ["Completion", tokens[1], "var(--volt-emerald)"], ["Total", tokens[2], "var(--volt-text-300)"]].map(([k, v, c]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "11px",
      color: c
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    className: "vo-mono",
    style: {
      fontSize: "11px",
      color: "var(--volt-text-300)"
    }
  }, v, " tokens"))))) : null));
}
const EVENTS = ["07:09:55 AM", "07:09:55 AM", "07:09:55 AM", "07:09:55 AM", "07:09:55 AM", "07:10:02 AM", "07:10:02 AM"];
function TimelinePanel({
  index,
  onIndex
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "vo-panel",
    style: {
      width: "300px",
      display: "flex",
      flexDirection: "column",
      maxHeight: "100%"
    }
  }, /*#__PURE__*/React.createElement(PanelHeader, {
    title: "Timeline",
    collapsed: false,
    onToggle: () => {}
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--volt-emerald)",
      fontSize: "16px",
      fontWeight: 600,
      marginBottom: "10px"
    },
    className: "vo-mono"
  }, "27 events \xB7 17 sec"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      marginBottom: "10px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline",
    onClick: () => onIndex(0),
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-double-up",
      size: 14
    })
  }, "First"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "play",
      variant: "solid",
      size: 14
    })
  }, "Play"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    onClick: () => onIndex(EVENTS.length - 1)
  }, "Last")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      border: "1px solid var(--volt-border)",
      borderRadius: "var(--radius-sm)",
      padding: "8px 10px",
      fontSize: "13px",
      color: "var(--volt-text-300)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: "8px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "viewfinder-circle",
    size: 15
  }), "Auto-zoom to node"), /*#__PURE__*/React.createElement("span", {
    className: "vo-mono",
    style: {
      color: "var(--volt-text-500)",
      fontSize: "11px"
    }
  }, "OFF"))), /*#__PURE__*/React.createElement("div", {
    className: "vo-scroll",
    style: {
      borderTop: "1px solid var(--volt-border)",
      flex: 1
    }
  }, EVENTS.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    type: "button",
    onClick: () => onIndex(i),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "10px 14px",
      background: i === index ? "var(--volt-surface)" : "transparent",
      border: "none",
      borderBottom: "1px solid var(--volt-border)",
      cursor: "pointer",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i === EVENTS.length - 1 ? "check-circle" : "circle-stack",
    size: 16,
    color: i === EVENTS.length - 1 ? "var(--volt-emerald)" : "var(--volt-text-500)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "vo-mono",
    style: {
      flex: 1,
      textAlign: "right",
      fontSize: "12px",
      color: "var(--volt-text-300)"
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--volt-border)",
      padding: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: "13px",
      color: "var(--volt-text-500)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "4px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left",
    size: 14
  }), "Prev."), /*#__PURE__*/React.createElement("span", {
    className: "vo-mono",
    style: {
      color: "var(--volt-text-200)"
    }
  }, index + 1, " / ", EVENTS.length), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "4px"
    }
  }, "Next", /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 14
  }))));
}
function ChatPanel({
  onClose
}) {
  const [msgs, setMsgs] = React.useState([{
    from: "user",
    text: "Please analyze the refinedev/refine GitHub repository."
  }, {
    from: "agent",
    text: "Here is the analysis of the refinedev/refine GitHub repository:"
  }, {
    from: "agent",
    text: "Stars: The repository has 30,590 stars, indicating its popularity and positive reception within the community."
  }, {
    from: "agent",
    text: "Contributors: There are a total of 30 contributors. The top contributors are omeraplak (2090), refine-bot (693), necatiozmen (618)."
  }]);
  const [draft, setDraft] = React.useState("");
  const send = () => {
    if (!draft.trim()) return;
    setMsgs(m => m.concat([{
      from: "user",
      text: draft
    }, {
      from: "agent",
      text: "Running supervisor → stars_fetcher…"
    }]));
    setDraft("");
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "vo-panel",
    style: {
      width: "380px",
      display: "flex",
      flexDirection: "column",
      maxHeight: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "vo-hdr"
  }, /*#__PURE__*/React.createElement("span", {
    className: "vo-ttl"
  }, "Assistant"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: {
      background: "transparent",
      border: "none",
      color: "var(--volt-text-300)",
      fontSize: "13px",
      cursor: "pointer",
      display: "flex",
      gap: "6px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 14
  }), "New Chat"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Collapse",
    style: {
      background: "transparent",
      border: "none",
      color: "var(--volt-text-500)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "vo-scroll",
    style: {
      flex: 1,
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "14px"
    }
  }, msgs.map((m, i) => m.from === "user" ? /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      alignSelf: "flex-end",
      maxWidth: "88%",
      background: "var(--volt-emerald-deep)",
      color: "#fff",
      borderRadius: "var(--radius-md)",
      padding: "12px 14px",
      fontSize: "14px",
      lineHeight: "22px"
    }
  }, m.text) : /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: "14px",
      lineHeight: "24px",
      color: "var(--volt-text-200)"
    }
  }, m.text))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--volt-border)",
      padding: "12px",
      display: "flex",
      gap: "8px",
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    placeholder: "Type a message...",
    value: draft,
    onChange: e => setDraft(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter") send();
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: send,
    "aria-label": "Send",
    style: {
      width: "44px",
      height: "44px",
      borderRadius: "var(--radius-sm)",
      border: "none",
      background: "var(--volt-emerald-deep)",
      color: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "paper-airplane",
    variant: "solid",
    size: 18,
    color: "#fff"
  }))));
}
function FlowScreen() {
  const [selected, setSelected] = React.useState("Supervisor");
  const [event, setEvent] = React.useState(6);
  const [chatOpen, setChatOpen] = React.useState(true);
  return /*#__PURE__*/React.createElement("div", {
    className: "vo-canvas"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vo-dots"
  }), /*#__PURE__*/React.createElement("svg", {
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M300 300 C 460 300, 520 420, 660 470",
    fill: "none",
    stroke: "var(--volt-border-hover)",
    strokeWidth: "1",
    strokeDasharray: "4 5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M300 300 C 470 320, 540 560, 660 610",
    fill: "none",
    stroke: "var(--volt-border-hover)",
    strokeWidth: "1",
    strokeDasharray: "4 5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M170 210 L 170 300",
    fill: "none",
    stroke: "var(--volt-border-hover)",
    strokeWidth: "1",
    strokeDasharray: "4 5"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "16px",
      top: "16px",
      width: "280px"
    },
    className: "vo-panel"
  }, /*#__PURE__*/React.createElement(PanelHeader, {
    title: "Recent Executions",
    collapsed: false,
    onToggle: () => {}
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--volt-emerald)",
      borderRadius: "var(--radius-sm)",
      padding: "12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "8px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "vo-mono",
    style: {
      fontSize: "14px",
      color: "var(--volt-text-200)"
    }
  }, "7:09:45 AM"), /*#__PURE__*/React.createElement(PillTag, {
    tone: "accent"
  }, "completed")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "13px",
      color: "var(--volt-text-300)"
    }
  }, "Please analyze the refine\u2026")))), /*#__PURE__*/React.createElement(FlowNode, {
    kind: "memory",
    title: "Memory",
    icon: "circle-stack",
    x: "40px",
    y: "240px",
    selected: selected === "Memory",
    onSelect: () => setSelected("Memory"),
    rows: [["Type:", "LibSQLStorage"], ["Status:", "Completed"], ["Last Update:", "7:10:02 AM"]]
  }), /*#__PURE__*/React.createElement(FlowNode, {
    kind: "agent",
    title: "Supervisor",
    icon: "cpu-chip",
    x: "40px",
    y: "520px",
    selected: selected === "Supervisor",
    onSelect: () => setSelected("Supervisor"),
    prompt: "You are a GitHub repository analyzer. When given a GitHub repository URL o\u2026",
    status: "completed",
    rows: []
  }), /*#__PURE__*/React.createElement(FlowNode, {
    kind: "tool",
    title: "delegate_task",
    icon: "wrench-screwdriver",
    x: "380px",
    y: "430px",
    selected: selected === "delegate_task",
    onSelect: () => setSelected("delegate_task"),
    rows: [["Status:", "completed"], ["Last Update:", "7:09:48 AM"]]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: chatOpen ? "412px" : "332px",
      top: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement(IoPanel, {
    direction: "Input",
    body: "Task handed off from Supervisor to Stars Fetcher: Fetch the number of stars for the refinedev/refine GitHub repository Context: {}"
  }), /*#__PURE__*/React.createElement(IoPanel, {
    direction: "Output",
    body: "The GitHub repository refinedev/refine has 30,586 stars.",
    tokens: [323, 44, 367]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: "16px",
      top: "16px",
      bottom: "16px",
      display: "flex",
      gap: "12px",
      alignItems: "stretch"
    }
  }, chatOpen ? /*#__PURE__*/React.createElement(ChatPanel, {
    onClose: () => setChatOpen(false)
  }) : null, /*#__PURE__*/React.createElement(TimelinePanel, {
    index: event,
    onIndex: setEvent
  })), !chatOpen ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setChatOpen(true),
    style: {
      position: "absolute",
      right: "336px",
      bottom: "20px",
      width: "44px",
      height: "44px",
      borderRadius: "9999px",
      border: "2px solid var(--volt-emerald)",
      background: "var(--volt-emerald-08)",
      color: "var(--volt-emerald)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chat-bubble-bottom-center",
    size: 20
  })) : null);
}
Object.assign(window, {
  FlowScreen,
  FlowNode,
  IoPanel,
  TimelinePanel,
  ChatPanel
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/voltops-console/FlowScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/voltops-console/app.jsx
try { (() => {
function ConsoleApp() {
  const [route, setRoute] = React.useState("flow");
  return /*#__PURE__*/React.createElement("div", {
    className: "vo-app"
  }, /*#__PURE__*/React.createElement(Rail, {
    route: route,
    onNavigate: setRoute
  }), /*#__PURE__*/React.createElement("div", {
    className: "vo-main"
  }, /*#__PURE__*/React.createElement(TopBar, {
    agentName: route === "flow" ? "Supervisor" : null
  }), route === "flow" ? /*#__PURE__*/React.createElement(FlowScreen, null) : /*#__PURE__*/React.createElement(AgentsScreen, {
    onOpenFlow: () => setRoute("flow")
  })));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(ConsoleApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/voltops-console/app.jsx", error: String((e && e.message) || e) }); }

__ds_ns.DotPattern = __ds_scope.DotPattern;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconTile = __ds_scope.IconTile;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.PillTag = __ds_scope.PillTag;

__ds_ns.TextInput = __ds_scope.TextInput;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.PricingTier = __ds_scope.PricingTier;

__ds_ns.SidebarRow = __ds_scope.SidebarRow;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.GreenDivider = __ds_scope.GreenDivider;

__ds_ns.HeroBand = __ds_scope.HeroBand;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.SectionBand = __ds_scope.SectionBand;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CodeChip = __ds_scope.CodeChip;

__ds_ns.CodeMockup = __ds_scope.CodeMockup;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.Toast = __ds_scope.Toast;

})();

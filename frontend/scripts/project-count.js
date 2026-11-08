/* project-count.js — the live catalog count in the hero line.
 *
 * index.html ships "JS/TS projects · …" with an empty #project-count span, so
 * the page never claims a number it has not been given. On load this asks
 * /stats.json (same origin) for `projects` and prepends "N+ ".
 *
 * N is rounded DOWN, so the page never shows more than the real count (no
 * invented facts):
 *   10-999            to the 10 below         999 -> "990+"
 *   1,000-9,999       to the 100 below, "k"   1,623 -> "1.6k+", 1,000 -> "1k+"
 *   10,000-999,999    to the 1,000 below, "k" 12,345 -> "12k+"
 *   1,000,000 and up  to the 100,000 below, small "m"  1,234,567 -> "1.2m+"
 * No ".0": 2,000 is "2k+", 2,000,000 is "2m+". Under 10 would read "0+", so
 * it shows no number instead.
 *
 * That, 0, a missing or non-numeric value, a non-2xx response, a network
 * error or bad JSON all leave the line without a number. Nothing is logged.
 *
 * roundDownCount/countLabel are exported for tests/project-count.test.js.
 */
(function () {
  "use strict";

  function roundDownCount(p) {
    if (typeof p !== "number" || !isFinite(p) || p <= 0) return 0;
    var step = p < 1e3 ? 10 : p < 1e4 ? 100 : p < 1e6 ? 1e3 : 1e5;
    return Math.floor(p / step) * step;
  }

  function countLabel(p) {
    var n = roundDownCount(p);
    if (n <= 0) return "";
    // n is a whole number of 100s or 100,000s here, so n / 1e3 or n / 1e6 has
    // at most one decimal and String() prints it without a trailing ".0".
    var text = n < 1e3 ? String(n) : n < 1e6 ? n / 1e3 + "k" : n / 1e6 + "m";
    return text + "+ ";
  }

  if (typeof module === "object" && module.exports) {
    module.exports = { roundDownCount: roundDownCount, countLabel: countLabel };
    return;
  }

  var el = document.getElementById("project-count");
  if (!el || !window.fetch) return;
  fetch("/stats.json").then(function (r) {
    return r.ok ? r.json() : null;
  }).then(function (d) {
    var label = countLabel(d && d.projects);
    if (label) el.textContent = label;
  }).catch(function () {});
})();

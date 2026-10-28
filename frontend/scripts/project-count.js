/* project-count.js — the live catalog count in the hero line.
 *
 * index.html ships "JS/TS projects · …" with an empty #project-count span, so
 * the page never claims a number it has not been given. On load this asks
 * /stats.json (same origin) for `projects` and prepends "N+ ".
 *
 * N is rounded DOWN, so the page never shows more than the real count (no
 * invented facts): under 1,000 to the 10 below, 1,000 and over to the 100
 * below. Under 10 would read "0+", so it shows no number instead.
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
    var step = p < 1000 ? 10 : 100;
    return Math.floor(p / step) * step;
  }

  function countLabel(p) {
    var n = roundDownCount(p);
    return n > 0 ? n.toLocaleString("en-US") + "+ " : "";
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

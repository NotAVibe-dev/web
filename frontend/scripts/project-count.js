/* project-count.js — the live catalog count in the hero line.
 *
 * index.html ships "JS/TS projects · …" with an empty #project-count span, so
 * the page never claims a number it has not been given. On load this asks
 * /stats.json (same origin) for `projects` and prepends "~N ".
 *
 * N is rounded UP: under 100 to the next 10, 100–999 to the next 100, 1,000
 * and over to the next 1,000; an exact multiple stays as it is. Because N can
 * be larger than the real count, it is shown as "~N", never "N+".
 *
 * 0, a missing or non-numeric value, a non-2xx response, a network error or
 * bad JSON all leave the line without a number. Nothing is logged.
 *
 * roundUpCount/countLabel are exported for tests/project-count.test.js.
 */
(function () {
  "use strict";

  function roundUpCount(p) {
    if (typeof p !== "number" || !isFinite(p) || p <= 0) return 0;
    var step = p < 100 ? 10 : p < 1000 ? 100 : 1000;
    return Math.ceil(p / step) * step;
  }

  function countLabel(p) {
    var n = roundUpCount(p);
    return n > 0 ? "~" + n.toLocaleString("en-US") + " " : "";
  }

  if (typeof module === "object" && module.exports) {
    module.exports = { roundUpCount: roundUpCount, countLabel: countLabel };
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

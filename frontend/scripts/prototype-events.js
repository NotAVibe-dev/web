/* prototype-events.js — what reviewers actually look at in the private preview.
 *
 * The homepage's events (scripts/events.js) do not port here. prototype.html has
 * no hero CTAs, no install tabs, no Copy buttons and no waitlist form — it is the
 * app itself, behind a password gate. The equivalent question is not "did they
 * convert" but "which screens did they open, and how far did they get".
 *
 * Three events, each hung off a hook this page genuinely exposes rather than a
 * CSS selector that could silently stop matching:
 *
 *   prototype_unlocked      the #nv-gate element is removed from the DOM
 *   prototype_screen_viewed the `hashchange` the router itself fires
 *   theme_toggled           the `nv-theme-change` CustomEvent app.js dispatches
 *
 * WHY HASHCHANGE IS TRUSTWORTHY HERE. prototype.html is hash-routed, and state
 * is the source of truth with the URL trailing it: componentDidUpdate() writes
 * buildHash(route) to location.hash on EVERY route change, whoever caused it —
 * a go() call, runScan(), a shared link. So one `hashchange` listener sees every
 * navigation in the app, including the ones no link was clicked for. Screen
 * names below mirror the router's own scheme, aliases included.
 *
 * CONSENT AND PII: identical rules to the homepage. Everything routes through
 * posthog.capture(), which stays silent until the banner is answered, so a
 * reviewer who never decides is never recorded. The only free-text value
 * captured is the route slug — a public project identifier like `honojs/hono`,
 * never anything a person typed about themselves. The gate PASSWORD is never
 * read, never captured, and this file never touches the gate's form.
 */
(function () {
  "use strict";

  /* Mirrors ROUTE_ALIAS_REVERSE in prototype.html — short URL names promoted
   * back to their canonical internal ones, so `#/backer` and an internal
   * `backer.dashboard` are not counted as two different screens. */
  var ROUTE_ALIAS_REVERSE = {
    maintainer: "maintainer.dashboard",
    backer: "backer.dashboard",
  };

  /* The router's default when the hash is empty (`startRoute` prop, itself
   * defaulting to "discover"). Without this, every landing would report an
   * empty screen name. */
  var DEFAULT_SCREEN = "discover";

  function track(name, props) {
    try {
      if (window.posthog && typeof window.posthog.capture === "function") {
        window.posthog.capture(name, props || {});
      }
    } catch (e) { /* analytics must never break the prototype */ }
  }

  /* Same parse as prototype.html's parseHash(), reduced to the two fields worth
   * reporting. Query params are dropped deliberately — URL_FIELDS carry view
   * state, not identity, and none of it is worth the noise. */
  function readScreen() {
    var raw = (window.location.hash || "").replace(/^#/, "");
    var path = raw.indexOf("?") >= 0 ? raw.slice(0, raw.indexOf("?")) : raw;
    var segs = path.replace(/^\//, "").split("/").filter(Boolean);
    if (!segs.length) return { screen: DEFAULT_SCREEN, slug: "" };
    return {
      screen: ROUTE_ALIAS_REVERSE[segs[0]] || segs[0],
      slug: segs.length > 1 ? decodeURIComponent(segs.slice(1).join("/")) : "",
    };
  }

  var lastKey = null;
  function reportScreen() {
    var r = readScreen();
    var key = r.screen + "|" + r.slug;
    /* The router can write the same hash twice (its own _lastHash guard is
     * about loops, not duplicates). Without this, one navigation can report
     * twice and every per-screen count is quietly inflated. */
    if (key === lastKey) return;
    lastKey = key;
    track("prototype_screen_viewed", { screen: r.screen, slug: r.slug });
  }

  /* ── The gate ─────────────────────────────────────────────────────────
   * Getting past the password is the preview's only real milestone: it
   * separates people you gave access to from people who found the URL.
   *
   * Detected by the gate element leaving the DOM rather than by hooking the
   * form, because the form submits on a WRONG password too — and a failed
   * attempt is not an unlock. It also means nothing here goes anywhere near
   * the password field.
   *
   * A visitor who already unlocked earlier this session never sees the gate at
   * all (it is removed synchronously from sessionStorage before this file
   * runs), so they produce no unlock event — only screen views. That is the
   * honest reading: they unlocked once, on an earlier visit. */
  var gate = document.getElementById("nv-gate");
  if (gate && typeof MutationObserver === "function") {
    var observer = new MutationObserver(function () {
      if (!document.getElementById("nv-gate")) {
        observer.disconnect();
        track("prototype_unlocked", readScreen());
      }
    });
    observer.observe(document.body, { childList: true });
  }

  /* ── Screens ──────────────────────────────────────────────────────────
   * The initial read is deferred a tick: the router resolves its starting
   * route during mount, and reading before that can catch an empty hash on a
   * page that was about to land somewhere else. */
  window.addEventListener("hashchange", reportScreen);
  setTimeout(reportScreen, 0);

  /* ── Theme ────────────────────────────────────────────────────────────
   * app.js broadcasts `nv-theme-change` so every mounted control can stay in
   * sync — the desktop icon button and the burger segment can both be live at
   * once. Listening to the broadcast means one listener covers every control,
   * present and future, instead of a selector per button. Same event name as
   * the homepage, so the two surfaces stack in one chart. */
  document.addEventListener("nv-theme-change", function (e) {
    track("theme_toggled", { theme: e && e.detail === "light" ? "light" : "dark" });
  });
})();

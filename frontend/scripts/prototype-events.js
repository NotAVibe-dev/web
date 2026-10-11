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

  /* ── Search ───────────────────────────────────────────────────────────
   * Searching does not necessarily change the route, so screen tracking misses
   * it entirely — that is why this event exists rather than being folded into
   * prototype_screen_viewed.
   *
   * NvQuery is the shared store the hero field and the header field both write
   * to, so one subscription covers every search box on the page. It notifies on
   * every set(), i.e. per KEYSTROKE, so this debounces: "hono" typed as four
   * characters is one search, not four. 800ms is long enough to sit past normal
   * typing and short enough that a pause mid-thought still reads as a search.
   *
   * THE QUERY TEXT IS NOT CAPTURED — only how long it was. That is a real loss:
   * "what do people search for" is most of why you would track search at all.
   * It is deliberate. /privacy/ §2.4 describes this analytics as understanding
   * "which pages lead to which, where people stop reading, and whether someone
   * who arrives from a link comes back later". Recording what a visitor typed
   * is not in that description, so capturing terms would make a published
   * policy incomplete. Add the term here only together with a line in §2.4
   * saying so — the policy first, then the code, which is the order §9 of that
   * document promises. */
  var searchTimer = null;
  if (window.NvQuery && typeof window.NvQuery.subscribe === "function") {
    window.NvQuery.subscribe(function (q) {
      var text = typeof q === "string" ? q.trim() : "";
      /* Bail BEFORE touching the timer. Clearing the box is not a search — but
       * it must not cancel the one already pending either. Ordering these the
       * other way round meant typing "hono" and then clearing it within the
       * debounce window recorded nothing at all, and anything that resets the
       * shared store (a route change, a remount) silently swallowed the search
       * that preceded it. Caught by the debounce test, not by reading. */
      if (!text) return;
      if (searchTimer) clearTimeout(searchTimer);
      searchTimer = setTimeout(function () {
        track("search_performed", { length: text.length });
      }, 800);
    });
  }

  /* ── Stack scan ───────────────────────────────────────────────────────
   * The core of the product demo: paste a manifest, find out what you depend
   * on. Arriving at the results screen is already a screen view, so what this
   * adds is the SHAPE of the scan — how many dependencies went in, and how many
   * the catalog recognised. A demo where `matched` is usually near zero is a
   * demo that lands badly, and no navigation event would ever tell you that.
   *
   * Counts only. The manifest text and the matched project slugs are both
   * withheld at the source (see runScan in prototype.html) — together they
   * would describe someone's real dependency tree, which is not ours to
   * collect for analytics. */
  document.addEventListener("nv-stack-scan", function (e) {
    var d = (e && e.detail) || {};
    track("stack_scan_run", {
      source: d.source || "",
      total: d.total || 0,
      matched: d.matched || 0,
      unmatched: d.unmatched || 0,
    });
  });

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

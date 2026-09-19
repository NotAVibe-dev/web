/* events.js — what visitors actually DO on notavibe.dev.
 *
 * Loaded after scripts/consent.js, which owns the PostHog bootstrap. This file
 * only describes behaviour; it never initialises anything and never decides
 * whether capture is allowed.
 *
 * CONSENT IS NOT THIS FILE'S JOB, AND THAT IS DELIBERATE. Every call here goes
 * through `track()` into `posthog.capture()`, and PostHog is running in
 * `cookieless_mode: 'on_reject'` — it captures nothing at all until the visitor
 * has answered the banner, then either cookied (accept) or storage-free
 * server-hash counting (decline). So there is no consent check to write here,
 * and adding one would be a second, conflicting source of truth.
 *
 * The honest cost: an action taken BEFORE the banner is answered is not
 * recorded. Someone who lands, immediately copies the install command, and only
 * then clicks Accept produces no `install_command_copied`. That is the correct
 * trade — capturing it would mean capturing before consent — but it does mean
 * these counts are a floor, not a total. Worth remembering before reading too
 * much into a low number.
 *
 * NO PERSONAL DATA. EVER. The waitlist form on this page contains an email
 * address. It is NOT captured, not hashed, not reduced to a domain — the event
 * records only THAT someone joined. That address was given for one purpose,
 * "tell me when notavibe launches" (privacy policy §2.1), and analytics is not
 * that purpose. Reusing it here would be a new processing activity nobody
 * disclosed or agreed to. The same rule binds every property below: no emails,
 * no text a visitor typed, no identifiers.
 *
 * NAMED EVENTS ALONGSIDE AUTOCAPTURE. PostHog's autocapture already records raw
 * clicks, so nothing here is strictly required. It exists because
 * `install_command_copied {method: "npm"}` is a question you can answer in one
 * glance, and "clicks on button.copy-btn[data-copy=npm]" is one you have to
 * reconstruct every time you ask.
 */
(function () {
  "use strict";

  /* Never throws, never assumes. On localhost consent.js bails before the
   * loader runs, so `window.posthog` does not exist at all — that is the case
   * this guard mostly exists for. Before array.js arrives the stub queues
   * calls, so an early capture is held rather than lost. */
  function track(name, props) {
    try {
      if (window.posthog && typeof window.posthog.capture === "function") {
        window.posthog.capture(name, props || {});
      }
    } catch (e) { /* analytics must never break the page */ }
  }

  function on(node, type, fn) {
    if (node) node.addEventListener(type, fn);
  }

  /* ── 1. Hero intent ───────────────────────────────────────────────────
   * Which promise sends people down the page — "Install in 30 seconds" or
   * "See the signals". The split tells you whether the pitch or the proof is
   * doing the work. */
  document.querySelectorAll(".hero-cta-row .btn").forEach(function (a) {
    on(a, "click", function () {
      track("cta_clicked", {
        cta: (a.textContent || "").trim(),
        href: a.getAttribute("href") || "",
        location: "hero",
      });
    });
  });

  /* ── 2. How far they get ──────────────────────────────────────────────
   * A marketing page's real funnel is scroll depth. Each section fires once
   * per page load, when at least a quarter of it has been on screen — enough
   * to mean "read", not "flew past". IntersectionObserver is guarded: without
   * it you lose these four events and nothing else. */
  if (typeof IntersectionObserver === "function") {
    var seen = {};
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.id;
        if (!entry.isIntersecting || seen[id]) return;
        seen[id] = true;
        track("section_viewed", { section: id });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.25 });

    ["how-it-works", "install", "why", "signup"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  /* ── 3. Which install method they want ────────────────────────────────
   * Three tabs, and you are guessing which one matters until this exists.
   * If everyone switches to Manual, the quick-start command is not landing. */
  document.querySelectorAll(".install-tab").forEach(function (tab) {
    on(tab, "click", function () {
      track("install_tab_selected", { method: tab.getAttribute("data-tab") });
    });
  });

  /* ── 4. THE CONVERSION ────────────────────────────────────────────────
   * Copying the install command is the closest this page gets to intent to
   * use the product — someone is about to paste it into a terminal. If you
   * watch one number on this page, watch this one, and watch it against
   * `section_viewed {section: "install"}` to see how many who saw it acted. */
  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    on(btn, "click", function () {
      track("install_command_copied", { method: btn.getAttribute("data-copy") });
    });
  });

  /* ── 5. The other conversion ──────────────────────────────────────────
   * Fires on submit, carrying NOTHING. Not the address, not its domain, not
   * its length. See the header: that email was given for the waitlist, and
   * analytics is a different purpose. The count is the insight; the identity
   * is not ours to take. */
  on(document.getElementById("signup-form"), "submit", function () {
    track("waitlist_submitted");
  });

  /* ── 6. Theme ─────────────────────────────────────────────────────────
   * Cheap to collect and settles an argument: if nobody ever switches to
   * light, the dark default is right and the toggle is furniture. Records the
   * theme moved TO.
   *
   * Read on the next tick, not inline. index.html's own click handler is what
   * flips data-theme, and it was registered first (that script is parsed
   * inline; this file is deferred), so reading during our own handler happens
   * to see the NEW value today — but only by registration order. A setTimeout
   * lands after every handler has run, so the value is right whichever order
   * they were bound in, and stays right if either file is ever reorganised. */
  on(document.getElementById("theme-btn"), "click", function () {
    setTimeout(function () {
      track("theme_toggled", {
        theme: document.documentElement.getAttribute("data-theme") || "dark",
      });
    }, 0);
  });
})();

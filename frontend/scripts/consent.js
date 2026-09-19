/* consent.js — the notavibe.dev consent banner + PostHog bootstrap.
 *
 * LOADED BY index.html AND prototype.html. One script, one host, one cookie:
 * a decision made on the front page already applies to the preview, so nobody
 * is asked twice, and the front page's footer control withdraws it for both.
 * /privacy/ deliberately does NOT load this — it stays script-free, as its own
 * header comment requires, and links to the /#consent route instead.
 *
 * WHY THIS EXISTS. Until now the site set no cookies of its own, which is why
 * the privacy policy could say "there is nothing to consent to" and carry no
 * banner. PostHog changes that: on accept it writes a first-party cookie, so
 * PECR/GDPR require PRIOR consent — the cookie may not exist before the visitor
 * has chosen. This file is what makes that true in code rather than in prose.
 *
 * THE MODE IS `on_reject` (PostHog's consent shape), and it is the reason a
 * reject is not a blackout. Three states, not two:
 *
 *   pending  — nothing stored, nothing captured. PostHog blocks its own capture
 *              until a decision exists, so the banner is not racing a beacon.
 *   accept   — the full cookied product: a first-party cookie, a stable
 *              distinct_id, cross-day and cross-session identity.
 *   reject   — STILL COUNTED, storage-free. PostHog counts the visitor with a
 *              hash computed on its servers from a salt it rotates daily and
 *              deletes once that day's events are processed. Pageviews, paths,
 *              referrers and same-day funnels survive; the visitor reads as a
 *              NEW person tomorrow, so weekly/monthly uniques inflate, there is
 *              no cross-device link, and identify()/alias() are unavailable
 *              (alias events are dropped at ingestion).
 *
 * This mirrors the platform's own consent ruling (app SPEC §10.1): "consent-
 * denied visitors browse identically; only measurement degrades."
 *
 * REQUIRES a one-time project setting: PostHog → Project settings → Web
 * analytics → "Cookieless server hash mode" must be ENABLED, or `on_reject`
 * has no reject path to fall back to.
 *
 * SCOPE — `cross_subdomain_cookie: false` IS LOAD-BEARING. Left at its default
 * the cookie is set on the apex and rides onto every subdomain, including
 * app. and admin. — which SPEC §10.4's zero-tracking floor puts off limits.
 * Host-scoping the cookie enforces that floor at the cookie itself rather than
 * trusting that PostHog is never loaded over there.
 *
 * The token below is a PostHog PROJECT token: write-only, designed to ship in
 * client code, and public in this repo by intent. It is not a secret.
 */
(function () {
  "use strict";

  /* EU REGION. Data is stored in PostHog Cloud EU (AWS eu-central-1,
   * Frankfurt), matching the EEA-residency choice already made for Resend's
   * eu-west-1 in infra's gdpr-baseline.md. The loader derives its asset host
   * from this one (eu.i.posthog.com → eu-assets.i.posthog.com), so this is the
   * only URL to change.
   *
   * A PostHog project is REGION-BOUND: this token belongs to EU project 278842
   * (organisation Notavibe, created 2026-09-19) and only works against the EU
   * host. They are a matched pair — swapping one without the other sends every
   * event into a void that returns 200. The previous US project (phc_wSL6…) is
   * dead; do not resurrect it here.
   *
   * The token is a PROJECT token: write-only, designed to ship in client code,
   * and public in this repo by intent. It is not a secret. */
  var TOKEN = "phc_qfaTBFDxbpETb6rhgx5nxJ5GyhHyj96kZJNFNAYp3myy";
  var API_HOST = "https://eu.i.posthog.com";

  /* LOCAL DEVELOPMENT IS NOT TRAFFIC. Without this, every `npx serve frontend`
   * session lands in the same project as real visitors and quietly inflates
   * it — and a banner nobody asked for interrupts every dev reload. Same host
   * test the prototype's access gate uses, for the same reason. Bail before
   * the loader runs, so no script is fetched and `window.posthog` never
   * exists locally. */
  var host = location.hostname;
  if (!host || host === "localhost" || host === "127.0.0.1" || host === "::1"
      || host === "[::1]" || /\.localhost$/.test(host)) {
    window.nvConsent = { open: function () {} };
    return;
  }

  /* FAIL SAFE, NOT FAIL SILENT. Until the EU project's token is pasted above,
   * do nothing at all: no loader, no cookie, no banner. The failure mode that
   * matters is the other one — shipping a placeholder against a live host
   * captures nothing while every surface claims measurement is running, and
   * the privacy policy describes a cookie that was never set. Better the site
   * is visibly un-instrumented than invisibly lying. */
  if (TOKEN.indexOf("__") === 0) {
    window.nvConsent = { open: function () {} };
    if (window.console && console.warn) {
      console.warn("[notavibe] consent.js: no PostHog token configured — analytics disabled.");
    }
    return;
  }

  /* ── PostHog loader (official snippet, unmodified) ───────────────────── */
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}p||((p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",p.onerror=function(){p=null},(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r));var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],Object.defineProperty(u,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e}}),Object.defineProperty(u.people,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(){return u.toString(1)+".people (stub)"}}),o="vu fu pu gu bu init Hu zu qu ju Gu Xl Bu Qu Du eh ih nh sh rh oh capture getExtension Uu cu hh calculateEventProperties uh register register_once register_for_session unregister unregister_for_session gh Nu dh getFeatureFlag getFeatureFlagPayload getFeatureFlagResult getAllFeatureFlags isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync mh identify setPersonProperties unsetPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset yh shutdown setIdentity clearIdentity get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException addExceptionStep captureLog startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty fh Xu createPersonProfile setInternalOrTestUser ph wu opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing Ju debug Yl Os getPageViewId captureTraceFeedback captureTraceMetric Ru".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

  posthog.init(TOKEN, {
    api_host: API_HOST,
    defaults: "2026-05-30",
    person_profiles: "identified_only",
    // The consent contract: no storage, no capture, until a decision exists.
    cookieless_mode: "on_reject",
    // Host-scope the cookie so it never reaches app./admin. (SPEC §10.4).
    cross_subdomain_cookie: false,
    loaded: function (ph) {
      // `loaded` is the only safe place to read consent state — before array.js
      // arrives every method on the stub is a queue push returning undefined.
      if (ph.get_explicit_consent_status() === "pending") open();
      if (location.hash === "#consent") open();
    },
  });

  /* ── Banner ──────────────────────────────────────────────────────────── */

  var node = null;

  function styles() {
    if (document.getElementById("nv-consent-css")) return;
    var css = document.createElement("style");
    css.id = "nv-consent-css";
    // Every token carries a hex fallback. On prototype.html the design-system
    // stylesheets are hoisted from <helmet> by the runtime and may not have
    // resolved when this paints — the access gate hardcodes fallbacks for the
    // same reason. Fallbacks are the LIGHT values, matching that page's
    // default; under dark the tokens resolve long before anyone reads this.
    //
    // z-index sits BELOW the prototype's access gate (2147483000) on purpose.
    // A locked visitor is shown the password card, not a consent question, and
    // PostHog stays in `pending` behind it — nothing stored, nothing captured.
    // The banner is simply there once they unlock.
    css.textContent = [
      "#nv-consent{position:fixed;left:0;right:0;bottom:0;z-index:9000;",
      "background:var(--volt-panel,#eceef1);",
      "border-top:1px solid var(--volt-border,rgba(11,13,16,.12));",
      "padding:20px 24px;box-shadow:0 -8px 32px rgba(0,0,0,.18);",
      "font-family:var(--font-sans,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif)}",
      "#nv-consent .nv-c-inner{max-width:1120px;margin:0 auto;display:flex;",
      "flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px}",
      "#nv-consent p{margin:0;max-width:64ch;font-size:14px;line-height:1.65;",
      "color:var(--volt-text-500,#5e646c)}",
      "#nv-consent strong{color:var(--volt-text-100,#141719);font-weight:600}",
      "#nv-consent a{color:var(--volt-emerald-deep,#047857);text-decoration:underline;",
      "text-underline-offset:2px}",
      "#nv-consent a:hover{color:var(--volt-emerald,#00ca8e)}",
      "#nv-consent .nv-c-actions{display:flex;gap:12px;flex-shrink:0}",
      "#nv-consent button{font:inherit;font-size:14px;font-weight:600;",
      "padding:10px 20px;border-radius:8px;cursor:pointer;min-height:40px;",
      "border:1px solid var(--volt-border-hover,rgba(11,13,16,.22));background:transparent;",
      "color:var(--volt-text-100,#141719)}",
      "#nv-consent button:hover{border-color:var(--volt-emerald,#00ca8e);",
      "color:var(--volt-emerald,#00ca8e)}",
      "#nv-consent button:focus-visible{outline:2px solid var(--volt-emerald,#00ca8e);",
      "outline-offset:2px}",
      "@media(max-width:640px){#nv-consent .nv-c-actions{width:100%}",
      "#nv-consent button{flex:1}}",
    ].join("");
    document.head.appendChild(css);
  }

  function open() {
    if (node) return;
    styles();
    node = document.createElement("section");
    node.id = "nv-consent";
    node.setAttribute("role", "region");
    node.setAttribute("aria-label", "Cookie choices");
    node.innerHTML =
      '<div class="nv-c-inner">' +
      "<p><strong>We'd like to measure how this site is used.</strong> " +
      "Accept and we set one first-party cookie so we can tell a returning " +
      "reader from a new one. Decline and we still count the visit, but " +
      "store nothing on your device. Either way the site works identically " +
      'and nothing is shared with advertisers. <a href="/privacy/">Privacy policy</a>.</p>' +
      '<div class="nv-c-actions">' +
      '<button type="button" data-nv-consent="reject">Decline</button>' +
      '<button type="button" data-nv-consent="accept">Accept</button>' +
      "</div></div>";

    // REJECT-AS-EASY-AS-ACCEPT: two buttons, one variant, same size, same row,
    // one click each. Neither is styled to be the one you reach for.
    node.addEventListener("click", function (e) {
      var choice = e.target.getAttribute("data-nv-consent");
      if (!choice) return;
      decide(choice === "accept");
    });

    document.body.appendChild(node);
  }

  function close() {
    if (!node) return;
    node.parentNode.removeChild(node);
    node = null;
  }

  function decide(accepted) {
    try {
      if (accepted) posthog.opt_in_capturing();
      else posthog.opt_out_capturing();
    } catch (e) {}
    close();
  }

  /* Re-opening the choice. Withdrawal has to be as easy as granting, so the
   * footer control and /privacy/'s section 4 both land here — from any page,
   * via the /#consent hash. `clear_opt_in_out_capturing` returns the visitor
   * to `pending`, which is the honest starting state for a fresh decision. */
  window.nvConsent = {
    open: function () {
      try { posthog.clear_opt_in_out_capturing(); } catch (e) {}
      open();
    },
  };

  window.addEventListener("hashchange", function () {
    if (location.hash === "#consent") window.nvConsent.open();
  });
})();

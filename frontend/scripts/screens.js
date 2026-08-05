/* notavibe MVP prototype — screen library.
   Extracted from the design-system bundle into the project and re-ordered so each
   module resolves its dependencies at evaluation time (the bundle publishes its
   namespace only at the end, so in-bundle order left every reference undefined). */
(() => {
const __ds_ns = (window.TogetherAIDesignSystem_eaf923 = window.TogetherAIDesignSystem_eaf923 || {});
(__ds_ns.__errors = __ds_ns.__errors || []);
const __ds_scope = __ds_ns;

// prototypes/notavibe/data.js
try { (() => {
/* notavibe prototype — sample catalog. Real JS/TS packages (the wedge), invented numbers. */

const FETCH = {
  npm: "2026-07-29",
  gh: "2026-07-28",
  eco: "2026-07-29",
  ossf: "2026-07-26"
};
const BANDS = {
  updates: ["Steady", "Intermittent", "Quiet", "Insufficient data"],
  breadth: ["Broad", "Narrowing", "Single-author", "Insufficient data"],
  dependents: ["Very high", "High", "Moderate", "Low", "Insufficient data"],
  response: ["Substantive", "Mixed", "Sparse", "Insufficient data"],
  security: ["Strong", "Adequate", "Weak", "Insufficient data"]
};

/* The six schema-v1 vocabulary dimensions. ILLUSTRATIVE — the spec freezes six
   dimensions but does not name them, so these stand in and are flagged as such. */
const VOCAB_DIMENSIONS = ["Purpose", "Runtime", "Integration", "Maturity", "Maintenance model", "Interface"];
function sig(band, detail, source, fetched, held) {
  return {
    band,
    detail,
    source,
    fetched,
    held: !!held
  };
}
const PROJECTS = [{
  slug: "vitest-dev/vitest",
  name: "vitest",
  owner: "vitest-dev",
  repo: "vitest",
  description: "A test runner that reads the project's own Vite config, so tests resolve modules exactly as the app does.",
  claim: "active",
  verifiedAt: "2026-05-14",
  categories: ["testing", "build-tooling"],
  listCount: 41,
  stackCount: 96,
  interest: {
    subscriptions: 128,
    bounties: 54
  },
  vocab: {
    Purpose: "Test runner",
    Runtime: "Node · browser",
    Integration: "Vite",
    Maturity: "Mature",
    "Maintenance model": "Team",
    Interface: "CLI · programmatic"
  },
  inferred: false,
  signals: {
    updates: sig("Steady", "22 substantive updates, trailing 90d", "npm publish history", FETCH.npm),
    breadth: sig("Broad", "74 merged external PRs from 41 authors", "GitHub API", FETCH.gh, true),
    dependents: sig("Very high", "41,900 dependents", "npm / ecosyste.ms", FETCH.eco),
    response: sig("Substantive", "Median first substantive reply: 1 day", "GitHub issues API", FETCH.gh, true),
    security: sig("Strong", "OpenSSF Scorecard 8.4", "OpenSSF Scorecard", FETCH.ossf)
  },
  verdict: {
    author: "Nour A.",
    date: "2026-06-02",
    text: "The clearest example in the wedge of a tool that wins by deleting configuration rather than adding features."
  },
  recommendations: [{
    from: "unjs/unbuild",
    text: "Our own test suite runs on it; the Vite config reuse is the whole reason."
  }],
  dependents: ["hono", "drizzle-orm", "@tanstack/query", "valibot"]
}, {
  slug: "honojs/hono",
  name: "hono",
  owner: "honojs",
  repo: "hono",
  description: "A web framework built on Web Standards, so the same handler runs on Workers, Deno, Bun and Node without a shim layer.",
  claim: "generated",
  categories: ["server", "web-framework"],
  listCount: 27,
  stackCount: 12,
  interest: {
    subscriptions: 61,
    bounties: 23
  },
  vocab: {
    Purpose: "HTTP framework",
    Runtime: "Multi-runtime",
    Integration: "Web Standards",
    Maturity: "Mature",
    "Maintenance model": "Team",
    Interface: "Programmatic"
  },
  inferred: true,
  signals: {
    updates: sig("Steady", "31 substantive updates, trailing 90d", "npm publish history", FETCH.npm),
    breadth: sig("Broad", "58 merged external PRs from 34 authors", "GitHub API", FETCH.gh, true),
    dependents: sig("High", "12,400 dependents", "npm / ecosyste.ms", FETCH.eco),
    response: sig("Substantive", "Median first substantive reply: 2 days", "GitHub issues API", FETCH.gh, true),
    security: sig("Strong", "OpenSSF Scorecard 7.9", "OpenSSF Scorecard", FETCH.ossf)
  },
  dependents: ["@hono/zod-validator"]
}, {
  slug: "drizzle-team/drizzle-orm",
  name: "drizzle-orm",
  owner: "drizzle-team",
  repo: "drizzle-orm",
  description: "A SQL query builder whose types are derived from the schema you already wrote, rather than from a separate modelling language.",
  claim: "generated",
  categories: ["database"],
  listCount: 33,
  stackCount: 21,
  interest: {
    subscriptions: 84,
    bounties: 47
  },
  vocab: {
    Purpose: "SQL toolkit",
    Runtime: "Node · edge",
    Integration: "Postgres · MySQL · SQLite",
    Maturity: "Mature",
    "Maintenance model": "Company-backed",
    Interface: "Programmatic · CLI"
  },
  inferred: true,
  signals: {
    updates: sig("Steady", "18 substantive updates, trailing 90d", "npm publish history", FETCH.npm),
    breadth: sig("Narrowing", "12 merged external PRs from 6 authors", "GitHub API", FETCH.gh, true),
    dependents: sig("High", "9,780 dependents", "npm / ecosyste.ms", FETCH.eco),
    response: sig("Mixed", "Median first substantive reply: 9 days", "GitHub issues API", FETCH.gh, true),
    security: sig("Adequate", "OpenSSF Scorecard 6.2", "OpenSSF Scorecard", FETCH.ossf)
  },
  dependents: ["drizzle-kit"]
}, {
  slug: "fabian-hiller/valibot",
  name: "valibot",
  owner: "fabian-hiller",
  repo: "valibot",
  description: "A schema validator whose modular API lets a bundler drop every validation rule the app does not import.",
  claim: "generated",
  categories: ["validation"],
  listCount: 19,
  stackCount: 8,
  interest: {
    subscriptions: 44,
    bounties: 12
  },
  vocab: {
    Purpose: "Schema validation",
    Runtime: "Universal",
    Integration: "Standard Schema",
    Maturity: "Established",
    "Maintenance model": "Single maintainer",
    Interface: "Programmatic"
  },
  inferred: true,
  signals: {
    updates: sig("Steady", "14 substantive updates, trailing 90d", "npm publish history", FETCH.npm),
    breadth: sig("Narrowing", "9 merged external PRs from 5 authors", "GitHub API", FETCH.gh, true),
    dependents: sig("Moderate", "2,140 dependents", "npm / ecosyste.ms", FETCH.eco),
    response: sig("Substantive", "Median first substantive reply: 3 days", "GitHub issues API", FETCH.gh, true),
    security: sig("Adequate", "OpenSSF Scorecard 5.8", "OpenSSF Scorecard", FETCH.ossf)
  },
  dependents: []
}, {
  slug: "unjs/unbuild",
  name: "unbuild",
  owner: "unjs",
  repo: "unbuild",
  description: "A bundler wrapper that reads package.json's own export map and emits the build most libraries were configuring by hand.",
  claim: "active",
  verifiedAt: "2026-06-30",
  categories: ["build-tooling"],
  listCount: 11,
  stackCount: 6,
  interest: {
    subscriptions: 22,
    bounties: 9
  },
  vocab: {
    Purpose: "Library bundler",
    Runtime: "Node",
    Integration: "rollup · mkdist",
    Maturity: "Established",
    "Maintenance model": "Collective",
    Interface: "CLI"
  },
  inferred: false,
  signals: {
    updates: sig("Intermittent", "5 substantive updates, trailing 90d", "npm publish history", FETCH.npm),
    breadth: sig("Narrowing", "7 merged external PRs from 4 authors", "GitHub API", FETCH.gh, true),
    dependents: sig("Moderate", "3,410 dependents", "npm / ecosyste.ms", FETCH.eco),
    response: sig("Mixed", "Median first substantive reply: 11 days", "GitHub issues API", FETCH.gh, true),
    security: sig("Adequate", "OpenSSF Scorecard 6.0", "OpenSSF Scorecard", FETCH.ossf)
  },
  verdict: {
    author: "Dara K.",
    date: "2026-07-04",
    text: "Unglamorous infrastructure that hundreds of libraries quietly depend on, maintained by a collective with no funding surface anywhere."
  },
  recommendations: [{
    from: "vitest-dev/vitest",
    text: "Does the boring part of shipping a library correctly."
  }],
  dependents: []
}, {
  slug: "kysely-org/kysely",
  name: "kysely",
  owner: "kysely-org",
  repo: "kysely",
  description: "A typed SQL query builder that fails at compile time when a column referenced in a query does not exist in the schema.",
  claim: "generated",
  categories: ["database"],
  listCount: 14,
  stackCount: 3,
  interest: {
    subscriptions: 29,
    bounties: 8
  },
  vocab: {
    Purpose: "SQL query builder",
    Runtime: "Node · edge",
    Integration: "Postgres · MySQL · SQLite",
    Maturity: "Established",
    "Maintenance model": "Small team",
    Interface: "Programmatic"
  },
  inferred: true,
  signals: {
    updates: sig("Intermittent", "4 substantive updates, trailing 90d", "npm publish history", FETCH.npm),
    breadth: sig("Narrowing", "11 merged external PRs from 7 authors", "GitHub API", FETCH.gh, true),
    dependents: sig("Moderate", "1,890 dependents", "npm / ecosyste.ms", FETCH.eco),
    response: sig("Mixed", "Median first substantive reply: 14 days", "GitHub issues API", FETCH.gh, true),
    security: sig("Adequate", "OpenSSF Scorecard 5.4", "OpenSSF Scorecard", FETCH.ossf)
  },
  dependents: []
}, {
  slug: "changesets/changesets",
  name: "changesets",
  owner: "changesets",
  repo: "changesets",
  description: "A release workflow that keeps version intent in reviewable files, so the changelog is written when the change is, not at publish time.",
  claim: "lapsed",
  verifiedAt: "2025-11-02",
  lapsedAt: "2026-07-11",
  categories: ["release", "monorepo"],
  listCount: 23,
  stackCount: 17,
  interest: {
    subscriptions: 51,
    bounties: 19
  },
  vocab: {
    Purpose: "Release tooling",
    Runtime: "Node",
    Integration: "npm · pnpm · yarn",
    Maturity: "Mature",
    "Maintenance model": "Collective",
    Interface: "CLI"
  },
  inferred: false,
  signals: {
    updates: sig("Quiet", "1 substantive update, trailing 90d", "npm publish history", FETCH.npm),
    breadth: sig("Single-author", "3 merged external PRs from 2 authors", "GitHub API", FETCH.gh, true),
    dependents: sig("High", "7,120 dependents", "npm / ecosyste.ms", FETCH.eco),
    response: sig("Sparse", "Median first substantive reply: 41 days", "GitHub issues API", FETCH.gh, true),
    security: sig("Weak", "OpenSSF Scorecard 4.1", "OpenSSF Scorecard", FETCH.ossf)
  },
  verdict: {
    author: "Nour A.",
    date: "2026-03-19",
    text: "Load-bearing for a large share of the monorepo ecosystem, and visibly under-resourced against that load."
  },
  recommendations: [],
  dependents: []
}, {
  slug: "oxc-project/oxlint",
  name: "oxlint",
  owner: "oxc-project",
  repo: "oxlint",
  description: "A linter written in Rust that reports the same class of findings as its JavaScript predecessor at a fraction of the wall time.",
  claim: "generated",
  categories: ["linting", "build-tooling"],
  listCount: 31,
  stackCount: 2,
  interest: {
    subscriptions: 73,
    bounties: 31
  },
  vocab: {
    Purpose: "Linter",
    Runtime: "Node · native",
    Integration: "ESLint config",
    Maturity: "Emerging",
    "Maintenance model": "Company-backed",
    Interface: "CLI · editor"
  },
  inferred: true,
  signals: {
    updates: sig("Steady", "27 substantive updates, trailing 90d", "npm publish history", FETCH.npm),
    breadth: sig("Broad", "63 merged external PRs from 38 authors", "GitHub API", FETCH.gh, true),
    dependents: sig("Low", "410 dependents", "npm / ecosyste.ms", FETCH.eco),
    response: sig("Substantive", "Median first substantive reply: 1 day", "GitHub issues API", FETCH.gh, true),
    security: sig("Adequate", "OpenSSF Scorecard 6.7", "OpenSSF Scorecard", FETCH.ossf)
  },
  dependents: []
}, {
  slug: "sindresorhus/execa",
  name: "execa",
  owner: "sindresorhus",
  repo: "execa",
  description: "A process runner that turns child_process's four calling conventions into one, with errors that say which command failed and why.",
  claim: "retired",
  retiredAt: "2026-06-18",
  categories: ["node-utilities"],
  listCount: 9,
  stackCount: 44,
  interest: {
    subscriptions: 17,
    bounties: 4
  },
  vocab: {
    Purpose: "Process execution",
    Runtime: "Node",
    Integration: "child_process",
    Maturity: "Mature",
    "Maintenance model": "Single maintainer",
    Interface: "Programmatic"
  },
  inferred: false,
  signals: {
    updates: sig("Quiet", "0 substantive updates, trailing 90d", "npm publish history", "2026-06-18"),
    breadth: sig("Single-author", "1 merged external PR from 1 author", "GitHub API", "2026-06-18", true),
    dependents: sig("Very high", "38,600 dependents", "npm / ecosyste.ms", "2026-06-18"),
    response: sig("Sparse", "Median first substantive reply: 63 days", "GitHub issues API", "2026-06-18", true),
    security: sig("Adequate", "OpenSSF Scorecard 6.1", "OpenSSF Scorecard", "2026-06-18")
  },
  verdict: {
    author: "Dara K.",
    date: "2026-02-11",
    text: "A utility whose dependent count is a fair proxy for how much of the ecosystem's tooling it silently underwrites."
  },
  recommendations: [],
  dependents: []
}, {
  slug: "gitlab-org/gitlab-svgs",
  name: "gitlab-svgs",
  owner: "gitlab-org",
  repo: "gitlab-svgs",
  description: "An icon and illustration set published as a package, consumed by GitLab's own front end and by external tooling.",
  claim: "generated",
  host: "gitlab",
  categories: ["assets"],
  listCount: 2,
  stackCount: 1,
  interest: {
    subscriptions: 3,
    bounties: 1
  },
  vocab: {
    Purpose: "Icon set",
    Runtime: "Build-time",
    Integration: "SVG sprite",
    Maturity: "Mature",
    "Maintenance model": "Company-backed",
    Interface: "Package"
  },
  inferred: true,
  signalsUnavailable: "GitLab-hosted. Admitted through the package registry; the GitHub-sourced signals do not compute for this repository.",
  signals: {
    updates: sig("Steady", "9 substantive updates, trailing 90d", "npm publish history", FETCH.npm),
    breadth: sig("Insufficient data", "No source available for this signal", "—", FETCH.gh),
    dependents: sig("Low", "260 dependents", "npm / ecosyste.ms", FETCH.eco),
    response: sig("Insufficient data", "No source available for this signal", "—", FETCH.gh),
    security: sig("Insufficient data", "No source available for this signal", "—", FETCH.ossf)
  },
  dependents: []
}, {
  slug: "biomejs/biome",
  name: "biome",
  owner: "biomejs",
  repo: "biome",
  description: "One binary that formats and lints, so a project stops reconciling two tools' opinions about the same file.",
  claim: "generated",
  categories: ["linting", "formatting"],
  listCount: 26,
  stackCount: 19,
  interest: {
    subscriptions: 66,
    bounties: 28
  },
  vocab: {
    Purpose: "Formatter · linter",
    Runtime: "Native",
    Integration: "LSP · CLI",
    Maturity: "Established",
    "Maintenance model": "Collective",
    Interface: "CLI · editor"
  },
  inferred: true,
  signals: {
    updates: sig("Steady", "16 substantive updates, trailing 90d", "npm publish history", FETCH.npm),
    breadth: sig("Broad", "49 merged external PRs from 27 authors", "GitHub API", FETCH.gh, true),
    dependents: sig("Moderate", "1,640 dependents", "npm / ecosyste.ms", FETCH.eco),
    response: sig("Substantive", "Median first substantive reply: 2 days", "GitHub issues API", FETCH.gh, true),
    security: sig("Strong", "OpenSSF Scorecard 7.4", "OpenSSF Scorecard", FETCH.ossf)
  },
  dependents: []
}, {
  slug: "TanStack/query",
  name: "@tanstack/query",
  owner: "TanStack",
  repo: "query",
  description: "A server-state cache that treats a request's freshness, retry and invalidation as one declared policy instead of scattered effects.",
  claim: "generated",
  categories: ["state", "data-fetching"],
  listCount: 38,
  stackCount: 71,
  interest: {
    subscriptions: 91,
    bounties: 34
  },
  vocab: {
    Purpose: "Async state cache",
    Runtime: "Browser · Node",
    Integration: "React · Vue · Svelte",
    Maturity: "Mature",
    "Maintenance model": "Company-backed",
    Interface: "Programmatic"
  },
  inferred: true,
  signals: {
    updates: sig("Steady", "20 substantive updates, trailing 90d", "npm publish history", FETCH.npm),
    breadth: sig("Broad", "44 merged external PRs from 29 authors", "GitHub API", FETCH.gh, true),
    dependents: sig("Very high", "22,300 dependents", "npm / ecosyste.ms", FETCH.eco),
    response: sig("Mixed", "Median first substantive reply: 6 days", "GitHub issues API", FETCH.gh, true),
    security: sig("Strong", "OpenSSF Scorecard 7.1", "OpenSSF Scorecard", FETCH.ossf)
  },
  dependents: []
}, {
  slug: "egoist/tsup",
  name: "tsup",
  owner: "egoist",
  repo: "tsup",
  description: "A zero-config TypeScript bundler for libraries, wrapping esbuild with the defaults most packages end up choosing anyway.",
  claim: "revoked",
  revokedAt: "2026-05-22",
  categories: ["build-tooling"],
  listCount: 16,
  stackCount: 28,
  interest: {
    subscriptions: 31,
    bounties: 11
  },
  vocab: {
    Purpose: "Library bundler",
    Runtime: "Node",
    Integration: "esbuild",
    Maturity: "Mature",
    "Maintenance model": "Single maintainer",
    Interface: "CLI"
  },
  inferred: true,
  signals: {
    updates: sig("Intermittent", "3 substantive updates, trailing 90d", "npm publish history", FETCH.npm),
    breadth: sig("Single-author", "2 merged external PRs from 2 authors", "GitHub API", FETCH.gh, true),
    dependents: sig("High", "14,700 dependents", "npm / ecosyste.ms", FETCH.eco),
    response: sig("Sparse", "Median first substantive reply: 33 days", "GitHub issues API", FETCH.gh, true),
    security: sig("Weak", "OpenSSF Scorecard 4.6", "OpenSSF Scorecard", FETCH.ossf)
  },
  dependents: []
}, {
  slug: "nodejs/undici",
  name: "undici",
  owner: "nodejs",
  repo: "undici",
  description: "Node's HTTP client, written from scratch to expose connection pooling and dispatch as first-class rather than incidental.",
  claim: "suppressed",
  suppressedAt: "2026-07-20",
  suppressionBasis: "own-behalf",
  categories: ["server", "node-utilities"],
  listCount: 12,
  stackCount: 52,
  interest: {
    subscriptions: 24,
    bounties: 6
  },
  vocab: {
    Purpose: "HTTP client",
    Runtime: "Node",
    Integration: "fetch",
    Maturity: "Mature",
    "Maintenance model": "Foundation",
    Interface: "Programmatic"
  },
  inferred: true,
  signals: {
    updates: sig("Steady", "12 substantive updates, trailing 90d", "npm publish history", FETCH.npm),
    breadth: sig("Broad", "38 merged external PRs from 22 authors", "GitHub API", FETCH.gh, true),
    dependents: sig("Very high", "31,200 dependents", "npm / ecosyste.ms", FETCH.eco),
    response: sig("Substantive", "Median first substantive reply: 2 days", "GitHub issues API", FETCH.gh, true),
    security: sig("Strong", "OpenSSF Scorecard 8.0", "OpenSSF Scorecard", FETCH.ossf)
  },
  dependents: []
}];
const CATEGORIES = [{
  slug: "build-tooling",
  label: "Build tooling",
  intent: "I need to ship a library"
}, {
  slug: "testing",
  label: "Testing",
  intent: "I need to trust my test suite"
}, {
  slug: "database",
  label: "Database access",
  intent: "I need to talk to Postgres"
}, {
  slug: "validation",
  label: "Validation",
  intent: "I need to trust my inputs"
}, {
  slug: "linting",
  label: "Linting & formatting",
  intent: "I need one opinion, not three"
}, {
  slug: "server",
  label: "Servers & runtimes",
  intent: "I need to serve requests"
}, {
  slug: "state",
  label: "State & data fetching",
  intent: "I need to cache server state"
}, {
  slug: "release",
  label: "Release & monorepo",
  intent: "I need to publish without ceremony"
}, {
  slug: "node-utilities",
  label: "Node utilities",
  intent: "I need the boring primitives"
}];
const SIGNAL_META = [{
  key: "updates",
  label: "Maintenance rhythm",
  spec: "Substantive updates, trailing 90d",
  primary: "npm publish history",
  fallback: "GitHub releases API",
  cadence: "Daily-capable, weekly floor"
}, {
  key: "breadth",
  label: "Contribution breadth",
  spec: "Merged external PRs",
  primary: "GitHub API",
  fallback: "HELD",
  cadence: "Weekly"
}, {
  key: "dependents",
  label: "Dependents",
  spec: "Reverse dependency count",
  primary: "npm / ecosyste.ms",
  fallback: "Libraries.io",
  cadence: "Daily"
}, {
  key: "response",
  label: "Response substance",
  spec: "Substance of maintainer replies",
  primary: "GitHub issues API",
  fallback: "HELD",
  cadence: "Weekly"
}, {
  key: "security",
  label: "Security posture",
  spec: "Scorecard checks",
  primary: "OpenSSF Scorecard",
  fallback: "Own checks",
  cadence: "Weekly"
}];
const EDITORIAL = [{
  kind: "category",
  slug: "what-good-looks-like-in-build-tooling",
  category: "build-tooling",
  title: "What “good” looks like in build tooling",
  standfirst: "How to read the five signals on a bundler, and why contribution breadth matters more here than dependent count.",
  author: "Nour A.",
  date: "2026-07-22"
}, {
  kind: "category",
  slug: "reading-response-substance",
  category: "testing",
  title: "Reading response substance without reading a scoreboard",
  standfirst: "A median reply time is not a verdict. What the band is measuring, and what it refuses to measure.",
  author: "Dara K.",
  date: "2026-07-15"
}];
const SHIP_WEEK = {
  live: true,
  label: "Ship Week",
  window: "27 July – 2 August",
  blurb: "Five days of releases from projects in the catalog, curated by the founding team. Unpurchasable, staff-awarded.",
  entries: ["oxc-project/oxlint", "biomejs/biome", "honojs/hono"]
};
const SEED_LISTS = [{
  id: "l1",
  title: "Boring infrastructure I would miss",
  handle: "raj",
  slug: "boring-infrastructure",
  visibility: "public",
  description: "Things nothing works without and nobody writes about.",
  items: ["sindresorhus/execa", "changesets/changesets", "unjs/unbuild"],
  saves: 7
}, {
  id: "l2",
  title: "Replacing the JS toolchain",
  handle: "raj",
  slug: "replacing-the-js-toolchain",
  visibility: "public",
  description: "The native-binary wave, tracked as it lands.",
  items: ["oxc-project/oxlint", "biomejs/biome"],
  saves: 2
}, {
  id: "l3",
  title: "Read later",
  handle: "raj",
  slug: "read-later",
  visibility: "private",
  description: "",
  items: ["kysely-org/kysely"],
  saves: 0
}];
const MANIFEST_SAMPLE = `{
  "dependencies": {
    "hono": "^4.6.3",
    "drizzle-orm": "^0.36.0",
    "@tanstack/query": "^5.59.0",
    "valibot": "^1.0.0",
    "internal-billing-sdk": "^2.1.0"
  },
  "devDependencies": {
    "vitest": "^3.0.1",
    "oxlint": "^0.15.2",
    "tsup": "^8.3.0"
  }
}`;
const CLAIM_STATES = [{
  key: "generated",
  label: "Generated — unclaimed",
  indexed: true
}, {
  key: "active",
  label: "Active",
  indexed: true
}, {
  key: "lapsed",
  label: "Lapsed",
  indexed: true
}, {
  key: "retired",
  label: "Retired",
  indexed: true
}, {
  key: "revoked",
  label: "Revoked",
  indexed: false
}, {
  key: "suppressed",
  label: "Suppressed",
  indexed: false
}];

/* Below-4 outcome-only mask (§10.2, §4.3). Renders the outcome, never the number. */
function maskCount(n, phrase) {
  if (n >= 4) return n + " people " + phrase;
  return "People " + phrase + " — exact count hidden below 4";
}
function maskNumber(n) {
  return n >= 4 ? String(n) : "‹ 4";
}
function findProject(slug) {
  return PROJECTS.find(p => p.slug === slug);
}
Object.assign(window, {
  PROJECTS,
  CATEGORIES,
  SIGNAL_META,
  BANDS,
  VOCAB_DIMENSIONS,
  EDITORIAL,
  SHIP_WEEK,
  SEED_LISTS,
  MANIFEST_SAMPLE,
  CLAIM_STATES,
  maskCount,
  maskNumber,
  findProject
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/notavibe/data.js", error: String((e && e.message) || e) }); }

// prototypes/notavibe/Chrome.jsx
try { (() => {
const DS = window.TogetherAIDesignSystem_eaf923;
const {
  Button,
  Badge,
  Eyebrow,
  Icon,
  Container,
  TextInput
} = DS;

/* ── shared atoms ─────────────────────────────────────────────── */

const BAND_TONE = {
  "Steady": "strong",
  "Broad": "strong",
  "Substantive": "strong",
  "Strong": "strong",
  "Very high": "strong",
  "Intermittent": "mid",
  "Narrowing": "mid",
  "Mixed": "mid",
  "Adequate": "mid",
  "High": "mid",
  "Moderate": "mid",
  "Quiet": "low",
  "Single-author": "low",
  "Sparse": "low",
  "Weak": "low",
  "Low": "low",
  "Insufficient data": "none"
};
function Band({
  value,
  onDark
}) {
  const tone = BAND_TONE[value] || "none";
  const fill = {
    strong: "var(--accent-mint)",
    mid: "var(--accent-periwinkle)",
    low: "var(--surface-soft)",
    none: "transparent"
  }[tone];
  const border = tone === "none" ? "1px dashed " + (onDark ? "var(--border-hairline-dark)" : "var(--border-hairline)") : "1px solid " + fill;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      padding: "var(--space-xxs) var(--space-sm)",
      borderRadius: "var(--radius-sm)",
      background: tone === "none" ? "transparent" : fill,
      border,
      color: tone === "none" ? onDark ? "var(--text-on-dark-secondary)" : "var(--text-secondary)" : "var(--text-body)",
      font: "var(--type-mono-label)",
      letterSpacing: "var(--ls-mono-label)",
      textTransform: "uppercase",
      whiteSpace: "nowrap"
    }
  }, value);
}

/** Renders an unresolved item from the spec's own open list, visibly. */
function Held({
  children,
  ref: _r,
  refs
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-sm)",
      alignItems: "flex-start",
      border: "1px dashed var(--accent-magenta)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-md)",
      background: "rgba(239,44,193,0.04)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono-label)",
      letterSpacing: "var(--ls-mono-label)",
      textTransform: "uppercase",
      color: "var(--accent-magenta)",
      whiteSpace: "nowrap"
    }
  }, refs || "Held"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-caption)",
      color: "var(--text-secondary)"
    }
  }, children));
}
function Note({
  children
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-caption)",
      color: "var(--text-secondary)"
    }
  }, children);
}
function SectionTitle({
  children,
  count,
  onDark
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: "var(--space-md)",
      borderBottom: onDark ? "1px solid var(--border-hairline-dark)" : "var(--border-level-1)",
      paddingBottom: "var(--space-sm)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: onDark ? "onDarkMuted" : "muted"
  }, children), count != null ? /*#__PURE__*/React.createElement(Eyebrow, {
    size: "caption",
    tone: onDark ? "onDarkMuted" : "muted"
  }, count) : null);
}

/* ── product chrome ───────────────────────────────────────────── */

function PublicHeader({
  ctx
}) {
  const [q, setQ] = React.useState("");
  const link = (label, route, active) => /*#__PURE__*/React.createElement("a", {
    key: label,
    href: "#",
    onClick: e => {
      e.preventDefault();
      ctx.go(route);
    },
    style: {
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)",
      textDecoration: "none",
      color: active ? "var(--text-body)" : "var(--text-secondary)",
      whiteSpace: "nowrap"
    }
  }, label);
  const r = ctx.route;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 30,
      background: "var(--surface-canvas)",
      borderBottom: "var(--border-level-1)"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    style: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "var(--space-lg) var(--space-2xl)",
      minHeight: "64px",
      padding: "var(--space-md) var(--gutter-desktop)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      ctx.go({
        name: "discover"
      });
    },
    style: {
      font: "var(--type-body-lg-strong)",
      letterSpacing: "var(--ls-body-lg)",
      textDecoration: "none",
      color: "var(--text-body)"
    }
  }, "notavibe"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-sm) var(--space-2xl)",
      flex: "1 1 auto",
      minWidth: "0"
    }
  }, link("Discover", {
    name: "discover"
  }, r.name === "discover" || r.name === "category"), link("Ship Week", {
    name: "shipweek"
  }, r.name === "shipweek"), link("Editorial", {
    name: "editorial"
  }, r.name === "editorial"), link("Methodology", {
    name: "methodology"
  }, r.name === "methodology")), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      ctx.go({
        name: "search",
        q
      });
    },
    style: {
      display: "flex",
      gap: "var(--space-sm)",
      alignItems: "center",
      flex: "1 1 160px",
      minWidth: "0",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Search name or description",
    style: {
      width: "100%",
      minWidth: "0",
      maxWidth: "230px",
      background: "var(--surface-canvas)",
      border: "1px solid var(--border-input)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-sm) var(--space-md)",
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)",
      outline: "none"
    }
  })), ctx.signedIn ? /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => ctx.go({
      name: "backer.dashboard"
    })
  }, "My workspace") : /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => ctx.go({
      name: "signin",
      next: ctx.route
    })
  }, "Sign in")));
}
function AppNav({
  ctx,
  kind
}) {
  const items = kind === "maintainer" ? [["Dashboard", "maintainer.dashboard"], ["Discovery presence — profile", "maintainer.profile"], ["Discovery presence — reach", "maintainer.reach"], ["Claim contest", "maintainer.contest"], ["API & webhooks", "maintainer.api"], ["Project settings", "maintainer.settings"]] : [["Home", "backer.dashboard"], ["Discover", "discover"], ["My stack", "stack.connect"], ["My lists", "backer.lists"], ["Curation chat", "backer.chat"], ["Settings", "backer.settings"]];
  const dark = kind === "admin";
  return /*#__PURE__*/React.createElement("aside", {
    className: "nv-app-nav",
    style: {
      width: "232px",
      flex: "0 0 232px",
      borderRight: dark ? "1px solid var(--border-hairline-dark)" : "var(--border-level-1)",
      background: dark ? "var(--surface-dark)" : "var(--surface-canvas)",
      padding: "var(--space-2xl) var(--space-lg)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)",
      minHeight: "100vh"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-xs)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-lg-strong)",
      letterSpacing: "var(--ls-body-lg)",
      color: dark ? "var(--text-on-dark)" : "var(--text-body)"
    }
  }, "notavibe"), /*#__PURE__*/React.createElement(Eyebrow, {
    tone: dark ? "onDarkMuted" : "muted",
    size: "caption"
  }, kind === "maintainer" ? "app.notavibe.dev · maintainer" : "app.notavibe.dev · backer")), /*#__PURE__*/React.createElement("nav", {
    className: "nv-app-navlinks",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-xxs)"
    }
  }, items.map(([label, name]) => {
    const on = ctx.route.name === name;
    return /*#__PURE__*/React.createElement("a", {
      key: name,
      href: "#",
      onClick: e => {
        e.preventDefault();
        ctx.go({
          name
        });
      },
      style: {
        font: on ? "var(--type-body-md-strong)" : "var(--type-body-md)",
        letterSpacing: "var(--ls-body-md)",
        textDecoration: "none",
        color: on ? "var(--text-body)" : "var(--text-secondary)",
        background: on ? "var(--surface-soft)" : "transparent",
        borderRadius: "var(--radius-sm)",
        padding: "var(--space-sm) var(--space-md)"
      }
    }, label);
  })), /*#__PURE__*/React.createElement("div", {
    className: "nv-app-foot",
    style: {
      marginTop: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    size: "caption"
  }, "Role"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-xs)"
    }
  }, [["Backer", "backer.dashboard"], ["Maintainer", "maintainer.dashboard"]].map(([l, n]) => /*#__PURE__*/React.createElement("button", {
    key: l,
    onClick: () => ctx.go({
      name: n
    }),
    style: {
      flex: 1,
      border: "1px solid var(--border-input)",
      background: kind === "maintainer" === (l === "Maintainer") ? "var(--primary)" : "var(--surface-canvas)",
      color: kind === "maintainer" === (l === "Maintainer") ? "var(--on-primary)" : "var(--text-body)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-sm)",
      font: "var(--type-mono-label)",
      letterSpacing: "var(--ls-mono-label)",
      textTransform: "uppercase",
      cursor: "pointer"
    }
  }, l))), /*#__PURE__*/React.createElement(Note, null, "Last-used context on login. Single-role users see no switcher.")));
}
function AdminNav({
  ctx
}) {
  const groups = [["Adjudication", [["Claim contest queue", "admin.contests"], ["Nomination inbox", "admin.nominations"]]], ["Catalog", [["Catalog ingestion", "admin.ingestion"], ["Page corrections & takedowns", "admin.corrections"], ["Taxonomy & categories", "admin.taxonomy"], ["Vocabulary contests", "admin.vocab"], ["Anomaly quarantine", "admin.anomaly"]]], ["Integrity", [["Sybil detection", "admin.sybil"], ["Project moderation", "admin.moderation"], ["Audit log", "admin.audit"]]], ["Platform", [["User lookup", "admin.users"], ["Editorial tools", "admin.editorial"], ["Demand signals", "admin.demand"], ["Config", "admin.config"]]]];
  return /*#__PURE__*/React.createElement("aside", {
    className: "nv-app-nav",
    style: {
      width: "248px",
      flex: "0 0 248px",
      background: "var(--surface-dark)",
      borderRight: "1px solid var(--border-hairline-dark)",
      padding: "var(--space-lg)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)",
      minHeight: "100vh"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-xxs)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-md-strong)",
      letterSpacing: "var(--ls-body-md)",
      color: "var(--text-on-dark)"
    }
  }, "notavibe admin"), /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onDarkMuted",
    size: "caption"
  }, "SSO + VPN \xB7 separate deployment")), groups.map(([title, items]) => /*#__PURE__*/React.createElement("div", {
    key: title,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-xs)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onDarkMuted",
    size: "caption"
  }, title), items.map(([label, name]) => {
    const on = ctx.route.name === name;
    return /*#__PURE__*/React.createElement("a", {
      key: name,
      href: "#",
      onClick: e => {
        e.preventDefault();
        ctx.go({
          name
        });
      },
      style: {
        font: "var(--type-caption)",
        textDecoration: "none",
        color: on ? "var(--text-on-dark)" : "var(--text-on-dark-secondary)",
        background: on ? "var(--surface-dark-soft)" : "transparent",
        borderRadius: "var(--radius-sm)",
        padding: "6px var(--space-sm)"
      }
    }, label);
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    fullWidth: true,
    onClick: () => ctx.go({
      name: "discover"
    })
  }, "Back to catalog")));
}

/* ── prototype navigator (not product chrome) ─────────────────── */

const NAV_GROUPS = [["Public", [["Front door", "discover"], ["Search / filters", "search"], ["Project page", "project"], ["Methodology", "methodology"], ["Public list", "list.public"], ["Public stack", "stack.public"]]], ["Flows", [["Claim", "claim.start"], ["Suppression", "suppress.start"], ["Stack scan", "stack.connect"]]], ["Backer", [["Dashboard", "backer.dashboard"], ["My lists", "backer.lists"], ["Curation chat", "backer.chat"]]], ["Maintainer", [["Dashboard", "maintainer.dashboard"]]], ["Admin", [["Corrections & takedowns", "admin.corrections"], ["Vocabulary contests", "admin.vocab"], ["Catalog ingestion", "admin.ingestion"]]]];
function PrototypeBar({
  ctx
}) {
  const [open, setOpen] = React.useState(false);
  const p = window.findProject(ctx.focusSlug);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      right: "var(--space-lg)",
      bottom: "var(--space-lg)",
      zIndex: 60,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: "var(--space-sm)"
    }
  }, open ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: "320px",
      maxHeight: "78vh",
      overflowY: "auto",
      background: "var(--surface-dark)",
      color: "var(--text-on-dark)",
      border: "1px solid var(--border-hairline-dark)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)",
      boxShadow: "var(--shadow-float)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onDark"
  }, "Prototype navigator"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(false),
    style: {
      background: "none",
      border: "none",
      color: "var(--text-on-dark-secondary)",
      cursor: "pointer",
      font: "var(--type-mono-label)",
      textTransform: "uppercase"
    }
  }, "Close")), NAV_GROUPS.map(([title, items]) => /*#__PURE__*/React.createElement("div", {
    key: title,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-xs)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onDarkMuted",
    size: "caption"
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-xs)"
    }
  }, items.map(([label, name]) => /*#__PURE__*/React.createElement("button", {
    key: name,
    onClick: () => ctx.go({
      name,
      slug: name === "project" ? ctx.focusSlug : undefined
    }),
    style: {
      border: "1px solid var(--border-hairline-dark)",
      background: ctx.route.name === name ? "var(--surface-dark-soft)" : "transparent",
      color: "var(--text-on-dark)",
      borderRadius: "var(--radius-sm)",
      padding: "4px 8px",
      font: "var(--type-mono-caption)",
      letterSpacing: "var(--ls-mono-caption)",
      textTransform: "uppercase",
      cursor: "pointer"
    }
  }, label))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)",
      borderTop: "1px solid var(--border-hairline-dark)",
      paddingTop: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onDarkMuted",
    size: "caption"
  }, "Claim state \u2014 ", p ? p.name : "—"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-xs)"
    }
  }, window.CLAIM_STATES.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.key,
    onClick: () => ctx.setClaimState(ctx.focusSlug, s.key),
    style: {
      border: "1px solid var(--border-hairline-dark)",
      background: ctx.claimState(ctx.focusSlug) === s.key ? "var(--accent-mint)" : "transparent",
      color: ctx.claimState(ctx.focusSlug) === s.key ? "var(--black)" : "var(--text-on-dark)",
      borderRadius: "var(--radius-sm)",
      padding: "4px 8px",
      font: "var(--type-mono-caption)",
      letterSpacing: "var(--ls-mono-caption)",
      textTransform: "uppercase",
      cursor: "pointer"
    }
  }, s.label))), /*#__PURE__*/React.createElement(Note, null, "Mirrors across the page, JSON-LD, MCP, API and llms.txt panels.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)",
      borderTop: "1px solid var(--border-hairline-dark)",
      paddingTop: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onDarkMuted",
    size: "caption"
  }, "Front-door module order"), ctx.moduleOrder.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: m,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono-caption)",
      color: "var(--text-on-dark-secondary)",
      width: "14px"
    }
  }, i + 1), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-caption)",
      flex: 1
    }
  }, window.MODULE_LABELS[m]), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.moveModule(i, -1),
    disabled: i === 0,
    style: {
      background: "none",
      border: "1px solid var(--border-hairline-dark)",
      color: "var(--text-on-dark)",
      borderRadius: "var(--radius-sm)",
      cursor: i === 0 ? "not-allowed" : "pointer",
      opacity: i === 0 ? 0.35 : 1,
      padding: "0 6px"
    }
  }, "\u2191"), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.moveModule(i, 1),
    disabled: i === ctx.moduleOrder.length - 1,
    style: {
      background: "none",
      border: "1px solid var(--border-hairline-dark)",
      color: "var(--text-on-dark)",
      borderRadius: "var(--radius-sm)",
      cursor: "pointer",
      opacity: i === ctx.moduleOrder.length - 1 ? 0.35 : 1,
      padding: "0 6px"
    }
  }, "\u2193"))), ctx.orderViolated ? /*#__PURE__*/React.createElement(Held, {
    refs: "Invariant"
  }, "Module order is specified as invariant (\xA75.5). This arrangement violates it \u2014 the front door would ship the canonical order.") : /*#__PURE__*/React.createElement(Note, null, "Canonical order. \xA75.5 states it is invariant."), /*#__PURE__*/React.createElement("button", {
    onClick: ctx.resetOrder,
    style: {
      background: "none",
      border: "1px solid var(--border-hairline-dark)",
      color: "var(--text-on-dark)",
      borderRadius: "var(--radius-sm)",
      padding: "4px 8px",
      font: "var(--type-mono-caption)",
      textTransform: "uppercase",
      cursor: "pointer"
    }
  }, "Reset to canonical")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)",
      borderTop: "1px solid var(--border-hairline-dark)",
      paddingTop: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onDarkMuted",
    size: "caption"
  }, "Simulate"), [["360 px viewport", ctx.mobile, ctx.toggleMobile], ["GitHub sole-provider outage", ctx.ghDegraded, ctx.toggleGh], ["Signed in as Raj (Backer)", ctx.signedIn, ctx.toggleSignedIn]].map(([label, on, fn]) => /*#__PURE__*/React.createElement("button", {
    key: label,
    onClick: fn,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "var(--space-sm)",
      border: "1px solid var(--border-hairline-dark)",
      background: on ? "var(--surface-dark-soft)" : "transparent",
      color: "var(--text-on-dark)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-sm)",
      cursor: "pointer",
      font: "var(--type-caption)",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono-caption)",
      textTransform: "uppercase",
      color: on ? "var(--accent-mint)" : "var(--text-on-dark-secondary)"
    }
  }, on ? "On" : "Off"))))) : null, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(!open),
    style: {
      background: "var(--primary)",
      color: "var(--on-primary)",
      border: "none",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-md) var(--space-lg)",
      font: "var(--type-mono-button)",
      letterSpacing: "var(--ls-mono-button)",
      textTransform: "uppercase",
      cursor: "pointer",
      boxShadow: "var(--shadow-float)"
    }
  }, open ? "Prototype" : "Prototype · " + ctx.route.name));
}
Object.assign(window, {
  Band,
  Held,
  Note,
  SectionTitle,
  PublicHeader,
  AppNav,
  AdminNav,
  PrototypeBar,
  DS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/notavibe/Chrome.jsx", error: String((e && e.message) || e) }); }

// prototypes/notavibe/Discover.jsx
try { (() => {
const {
  Button,
  Badge,
  Eyebrow,
  Icon,
  Container
} = window.TogetherAIDesignSystem_eaf923;
const {
  Band,
  Held,
  Note,
  SectionTitle
} = window;
const MODULE_LABELS = {
  categories: "Intent categories",
  deck: "Your Deck",
  stack: "Discover your stack",
  editorial: "Editorial — one featured card",
  refine: "Refine / curation chat",
  shipweek: "Ship Week"
};
function ProjectRow({
  slug,
  ctx,
  compact
}) {
  const p = window.findProject(slug);
  if (!p) return null;
  const state = ctx.claimState(p.slug);
  if (state === "suppressed") return null;
  const gh = ctx.ghDegraded;
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      ctx.go({
        name: "project",
        slug: p.slug
      });
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)",
      textDecoration: "none",
      color: "var(--text-body)",
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: compact ? "var(--space-md)" : "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--space-sm)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-md-strong)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, p.name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono-caption)",
      letterSpacing: "var(--ls-mono-caption)",
      color: "var(--text-secondary)"
    }
  }, p.owner, "/", p.repo), state === "generated" ? /*#__PURE__*/React.createElement(Badge, {
    tone: "outline",
    mono: true
  }, "Unclaimed") : null, state === "active" ? /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    mono: true
  }, "Verified") : null, state === "lapsed" ? /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    mono: true
  }, "Re-verifying") : null, state === "retired" ? /*#__PURE__*/React.createElement(Badge, {
    tone: "outline",
    mono: true
  }, "Dated record") : null, state === "revoked" ? /*#__PURE__*/React.createElement(Badge, {
    tone: "outline",
    mono: true
  }, "Revoked") : null), !compact ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)",
      color: "var(--text-secondary)"
    }
  }, p.description) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-sm)",
      flexWrap: "wrap",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Band, {
    value: gh ? "Insufficient data" : p.signals.updates.band
  }), /*#__PURE__*/React.createElement(Band, {
    value: gh ? "Insufficient data" : p.signals.breadth.band
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono-caption)",
      letterSpacing: "var(--ls-mono-caption)",
      color: "var(--text-secondary)"
    }
  }, "maintenance rhythm \xB7 contribution breadth")));
}

/* ── the six front-door modules ───────────────────────────────── */

function ModCategories({
  ctx
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, "Start with an intent"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "var(--space-md)"
    }
  }, window.CATEGORIES.map(c => /*#__PURE__*/React.createElement("a", {
    key: c.slug,
    href: "#",
    onClick: e => {
      e.preventDefault();
      ctx.go({
        name: "category",
        slug: c.slug
      });
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-xs)",
      textDecoration: "none",
      color: "var(--text-body)",
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-md-strong)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, c.intent), /*#__PURE__*/React.createElement(Eyebrow, {
    size: "caption"
  }, c.label)))));
}
function ModDeck({
  ctx
}) {
  const [explore, setExplore] = React.useState(40);
  const picks = window.PROJECTS.filter(p => ctx.claimState(p.slug) !== "suppressed").slice(0, explore > 60 ? 10 : 8);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    count: picks.length + " this week"
  }, "Your Deck"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-lg)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-sm)",
      font: "var(--type-caption)",
      color: "var(--text-secondary)"
    }
  }, "Familiar", /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: "100",
    value: explore,
    onChange: e => setExplore(Number(e.target.value)),
    style: {
      width: "180px",
      accentColor: "var(--primary)"
    }
  }), "Exploratory"), /*#__PURE__*/React.createElement(Note, null, "8\u201312 projects weekly from the preference profile and health signals. The discovery digest is its email form.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "var(--space-md)"
    }
  }, picks.map(p => /*#__PURE__*/React.createElement(ProjectRow, {
    key: p.slug,
    slug: p.slug,
    ctx: ctx
  }))), /*#__PURE__*/React.createElement(Held, {
    refs: "Open #2 / #6"
  }, "Two scale problems, carried openly: the distribution floor (\u201Cevery project appears in some decks weekly\u201D) is arithmetically impossible at thousands, and Your Deck is a cold-start recommender working from a survey with no behavioural history."));
}
function ModStack({
  ctx
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, "Discover your stack"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-2xl)",
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)",
      maxWidth: "56ch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-display-md)",
      letterSpacing: "var(--ls-display-md)"
    }
  }, "Find the projects you already depend on"), /*#__PURE__*/React.createElement(Note, null, "Connect GitHub or GitLab read-minimal, or paste a manifest. Server-side scan, explicit consent.")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => ctx.go({
      name: "stack.connect"
    })
  }, "Scan my stack")));
}
function ModEditorial({
  ctx
}) {
  const e = window.EDITORIAL[0];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    count: "one featured card"
  }, "Editorial"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: ev => {
      ev.preventDefault();
      ctx.go({
        name: "editorial"
      });
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)",
      textDecoration: "none",
      color: "var(--text-body)",
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Category feature \xB7 ", e.category), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-display-lg)",
      letterSpacing: "var(--ls-display-lg)"
    }
  }, e.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-lg)",
      letterSpacing: "var(--ls-body-lg)",
      color: "var(--text-secondary)"
    }
  }, e.standfirst), /*#__PURE__*/React.createElement(Eyebrow, {
    size: "caption"
  }, e.author, " \xB7 ", e.date)), /*#__PURE__*/React.createElement(Note, null, "On launch day every page is unclaimed, so the module draws from category editorial: a feature may name claimed projects and may not name unclaimed ones. The naming test applies at render, not at publication."));
}
function ModRefine({
  ctx
}) {
  const [q, setQ] = React.useState("");
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    count: "one entry, not two"
  }, "Refine"), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      ctx.go({
        name: q.trim().split(/\s+/).length > 4 ? "backer.chat" : "search",
        q
      });
    },
    style: {
      display: "flex",
      gap: "var(--space-sm)",
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-md)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16,
    strokeColor: "var(--text-secondary)"
  }), /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "A short query filters. A conversation curates.",
    style: {
      flex: 1,
      border: "none",
      outline: "none",
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)",
      background: "transparent"
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Refine")), /*#__PURE__*/React.createElement(Note, null, "Refine is the chat\u2019s entry point. Two natural-language inputs onto the same schema on the same surface would break surface economy on the front door itself."));
}
function ModShipWeek({
  ctx
}) {
  const sw = window.SHIP_WEEK;
  if (!sw.live) return null;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)",
      background: "var(--surface-dark)",
      color: "var(--text-on-dark)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: "var(--space-lg)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onDark",
    style: {
      whiteSpace: "nowrap"
    }
  }, sw.label + " · live"), /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onDarkMuted",
    size: "caption"
  }, sw.window)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-lg)",
      letterSpacing: "var(--ls-body-lg)",
      color: "var(--text-on-dark-secondary)",
      maxWidth: "70ch"
    }
  }, sw.blurb), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--chip-gap)",
      flexWrap: "wrap"
    }
  }, sw.entries.map(s => {
    const p = window.findProject(s);
    return /*#__PURE__*/React.createElement(Badge, {
      key: s,
      tone: "dark",
      mono: true
    }, p ? p.name : s);
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => ctx.go({
      name: "shipweek"
    })
  }, "Open the hub")), /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onDarkMuted",
    size: "caption"
  }, "Pinned above categories only while live."));
}
const MODULES = {
  categories: ModCategories,
  deck: ModDeck,
  stack: ModStack,
  editorial: ModEditorial,
  refine: ModRefine,
  shipweek: ModShipWeek
};
function Discover({
  ctx
}) {
  return /*#__PURE__*/React.createElement(Container, {
    style: {
      padding: "var(--space-5xl) var(--gutter-desktop) var(--space-section)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-6xl)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)",
      maxWidth: "68ch"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Discover"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-xl)",
      letterSpacing: "var(--ls-display-xl)"
    }
  }, "Find the open-source projects your work already rests on"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-lg)",
      letterSpacing: "var(--ls-body-lg)",
      color: "var(--text-secondary)"
    }
  }, "Every page here is built from public sources and honestly labelled. Most have no maintainer behind them yet.")), ctx.moduleOrder.map(key => {
    const M = MODULES[key];
    return M ? /*#__PURE__*/React.createElement(M, {
      key: key,
      ctx: ctx
    }) : null;
  }), /*#__PURE__*/React.createElement(Note, null, "At 360 px every module renders collapsed. Lists, alternatives, comparison and stack pages are acquisition surfaces \u2014 reachable from search and from their object, never front-door modules."));
}
function CategoryView({
  ctx
}) {
  const cat = window.CATEGORIES.find(c => c.slug === ctx.route.slug) || window.CATEGORIES[0];
  const list = window.PROJECTS.filter(p => p.categories.includes(cat.slug) && ctx.claimState(p.slug) !== "suppressed");
  const feature = window.EDITORIAL.find(e => e.category === cat.slug);
  return /*#__PURE__*/React.createElement(Container, {
    style: {
      padding: "var(--space-5xl) var(--gutter-desktop) var(--space-section)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3xl)"
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: "var(--space-sm)",
      font: "var(--type-mono-caption)",
      letterSpacing: "var(--ls-mono-caption)",
      textTransform: "uppercase",
      color: "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      ctx.go({
        name: "discover"
      });
    },
    style: {
      color: "inherit"
    }
  }, "Home"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      ctx.go({
        name: "discover"
      });
    },
    style: {
      color: "inherit"
    }
  }, "Discover"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("span", null, cat.label)), /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, cat.intent), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-xl)",
      letterSpacing: "var(--ls-display-xl)"
    }
  }, cat.label)), feature ? /*#__PURE__*/React.createElement("div", {
    style: {
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Category feature"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-display-md)",
      letterSpacing: "var(--ls-display-md)"
    }
  }, feature.title), /*#__PURE__*/React.createElement(Note, null, feature.standfirst, " \u2014 about the category: what it is for, how its signals read, what \u201Cgood\u201D looks like. It names no unclaimed project.")) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, list.map(p => /*#__PURE__*/React.createElement(ProjectRow, {
    key: p.slug,
    slug: p.slug,
    ctx: ctx
  }))), /*#__PURE__*/React.createElement(Note, null, "Category assignment is automatic with staff correcting it \u2014 a correction surface, not an assignment surface."));
}
Object.assign(window, {
  Discover,
  CategoryView,
  ProjectRow,
  MODULE_LABELS,
  MODULES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/notavibe/Discover.jsx", error: String((e && e.message) || e) }); }

// prototypes/notavibe/ProjectPage.jsx
try { (() => {
const {
  Button,
  Badge,
  Eyebrow,
  Icon,
  Container,
  CodeEditorMockup
} = window.TogetherAIDesignSystem_eaf923;
const {
  Band,
  Held,
  Note,
  SectionTitle
} = window;

/* ── above-fold: exactly four elements at 360px (§5.14) ───────── */

function ElementFrame({
  n,
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "28px 1fr",
      gap: "var(--space-lg)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    title: "Above-fold element " + n + ": " + label,
    style: {
      font: "var(--type-mono-caption)",
      letterSpacing: "var(--ls-mono-caption)",
      color: "var(--text-secondary)",
      border: "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-sm)",
      textAlign: "center",
      padding: "2px 0"
    }
  }, n), /*#__PURE__*/React.createElement("div", null, children));
}
function VerificationIndicator({
  state,
  project
}) {
  if (state === "generated") {
    return /*#__PURE__*/React.createElement(Badge, {
      tone: "outline",
      mono: true
    }, "No claim \u2014 unclaimed page");
  }
  if (state === "lapsed") {
    return /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral",
      mono: true
    }, "Re-verification in progress");
  }
  if (state === "retired" || state === "revoked") return null;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-sm)"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    mono: true
  }, "Maintainer verified via GitHub"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono-caption)",
      letterSpacing: "var(--ls-mono-caption)",
      color: "var(--text-secondary)"
    }
  }, project.owner, "/", project.repo));
}
function Identity({
  project,
  state
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--space-md)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-xl)",
      letterSpacing: "var(--ls-display-xl)"
    }
  }, project.name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono-label)",
      letterSpacing: "var(--ls-mono-label)",
      textTransform: "uppercase",
      color: "var(--text-secondary)"
    }
  }, project.owner, "/", project.repo)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-lg)",
      letterSpacing: "var(--ls-body-lg)",
      maxWidth: "68ch"
    }
  }, project.description), /*#__PURE__*/React.createElement(VerificationIndicator, {
    state: state,
    project: project
  }), /*#__PURE__*/React.createElement(Note, null, "The description above is the answer-first summary sentence the AEO composition quotes."));
}
function ClaimAndProvenance({
  project,
  state,
  ctx
}) {
  const dates = [["npm publish history", project.signals.updates.fetched], ["GitHub API", project.signals.breadth.fetched], ["npm / ecosyste.ms", project.signals.dependents.fetched], ["OpenSSF Scorecard", project.signals.security.fetched]];
  if (state === "generated") {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-md)",
        border: "var(--border-level-1)",
        borderRadius: "var(--radius-sm)",
        padding: "var(--space-lg)",
        background: "var(--surface-soft)"
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "Claim state and provenance"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        font: "var(--type-body-md)",
        letterSpacing: "var(--ls-body-md)"
      }
    }, "This page was generated from public sources and is unclaimed. No maintainer has verified it."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-md)"
      }
    }, dates.map(([s, d]) => /*#__PURE__*/React.createElement("span", {
      key: s,
      style: {
        font: "var(--type-mono-caption)",
        letterSpacing: "var(--ls-mono-caption)",
        color: "var(--text-secondary)",
        whiteSpace: "nowrap"
      }
    }, s, " \xB7 fetched ", d))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "var(--inline-gap)",
        flexWrap: "wrap",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: () => ctx.go({
        name: "claim.start",
        slug: project.slug
      })
    }, "Claim this page"), /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        ctx.go({
          name: "suppress.start",
          slug: project.slug
        });
      },
      style: {
        font: "var(--type-caption)",
        color: "var(--text-secondary)"
      }
    }, "Request removal \u2014 no account needed")));
  }
  if (state === "lapsed") {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-sm)",
        border: "var(--border-level-1)",
        borderRadius: "var(--radius-sm)",
        padding: "var(--space-lg)"
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "Claim state and provenance"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        font: "var(--type-body-md)",
        letterSpacing: "var(--ls-body-md)"
      }
    }, "Claimed by a verified maintainer. Re-verification is in progress; the maintainer has a 30-day cure window."), /*#__PURE__*/React.createElement(Note, null, "Lapsed ", project.lapsedAt, " \xB7 the cure path also surfaces as an in-app pending action, because an act-by clock never depends solely on email."));
  }
  if (state === "retired" || state === "revoked") {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-sm)",
        border: "var(--border-level-1)",
        borderRadius: "var(--radius-sm)",
        padding: "var(--space-lg)",
        background: "var(--surface-soft)"
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "Claim state and provenance"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        font: "var(--type-body-md)",
        letterSpacing: "var(--ls-body-md)"
      }
    }, state === "retired" ? "This is a dated catalog record. The page was retired on " + (project.retiredAt || "18 June 2026") + " and its facts are frozen as of that date." : "This claim was revoked for terms-of-service cause on " + (project.revokedAt || "22 May 2026") + ". The record is a dated catalog record and is not indexed."), /*#__PURE__*/React.createElement(Note, null, "Provenance line removed; verification fields dropped."));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)",
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Claim state and provenance"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "Claimed and verified on ", project.verifiedAt, ". Content on this page is maintainer-authored."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-md)"
    }
  }, dates.slice(0, 2).map(([s, d]) => /*#__PURE__*/React.createElement("span", {
    key: s,
    style: {
      font: "var(--type-mono-caption)",
      letterSpacing: "var(--ls-mono-caption)",
      color: "var(--text-secondary)",
      whiteSpace: "nowrap"
    }
  }, s, " \xB7 fetched ", d))));
}
function TwoSignalSummary({
  project,
  ctx
}) {
  const gh = ctx.ghDegraded;
  const pair = [{
    label: "Maintenance rhythm",
    s: project.signals.updates,
    degraded: false
  }, {
    label: "Contribution breadth",
    s: project.signals.breadth,
    degraded: gh
  }];
  const emptied = gh;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-lg)"
    }
  }, pair.map(({
    label,
    s,
    degraded
  }) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)",
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, label), /*#__PURE__*/React.createElement(Band, {
    value: degraded ? "Insufficient data" : s.band
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-caption)",
      color: "var(--text-secondary)"
    }
  }, degraded ? "Source unavailable — no value is guessed." : s.detail)))), emptied ? /*#__PURE__*/React.createElement(Held, {
    refs: "\xA75.2 held"
  }, "GitHub is the sole provider for contribution breadth. With no fallback ruled, a provider incident empties half of above-fold element 3 catalogue-wide \u2014 the exposure the HELD marker names.") : null, /*#__PURE__*/React.createElement(Note, null, "Dependents was rejected as the second signal: it is a popularity measure, and the thesis is that discovery is broken because it is popularity-ranked."));
}
function PrimaryCTA({
  project,
  ctx
}) {
  const saved = ctx.isSaved(project.slug);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--inline-gap)",
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => ctx.go({
      name: "action.save",
      slug: project.slug
    })
  }, saved ? "Saved to a list" : "Save to list"), /*#__PURE__*/React.createElement(Note, null, "Route-addressed page state. Logged out it is visible and enabled; activating it opens a sign-in interstitial scoped to this action."));
}

/* ── below the fold, order invariant (§5.14) ───────────────────── */

function InterestControl({
  project,
  state,
  ctx
}) {
  const claimed = state === "active" || state === "lapsed";
  const rows = [{
    key: "subscriptions",
    label: "Subscriptions and tiers"
  }, {
    key: "bounties",
    label: "Bounties and escrow"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)"
    }
  }, claimed ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)",
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Coming to notavibe"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500
    }
  }, "Subscriptions and tiers."), " Recurring support for a maintainer, with tiers the maintainer defines. Not open yet."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500
    }
  }, "Bounties and escrow."), " Funds held on partner rails, never in platform custody, released on a maintainer-confirmed outcome. Project-level, never issue-level. Not open yet."), /*#__PURE__*/React.createElement(Note, null, "Descriptions render on claimed pages only. No dates, no prices, no form.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)",
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)",
      background: "var(--surface-soft)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Pre-claim teaser"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, window.maskCount(project.listCount, "have this in a list"), " \xB7 ", window.maskCount(project.stackCount, "have this in their stack"), ". Claim this page to see more."), /*#__PURE__*/React.createElement(Note, null, "Every count carries the below-4 outcome-only mask. At launch volume, \u201C2 people have this in their stack\u201D on a niche package is close to naming them.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, rows.map(r => {
    const on = ctx.hasInterest(project.slug, r.key);
    const count = project.interest[r.key] + (on ? 1 : 0);
    return /*#__PURE__*/React.createElement("div", {
      key: r.key,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-sm)",
        border: "var(--border-level-1)",
        borderRadius: "var(--radius-sm)",
        padding: "var(--space-lg)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "var(--space-lg)",
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, null, r.label), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-mono-caption)",
        letterSpacing: "var(--ls-mono-caption)",
        color: "var(--text-secondary)"
      }
    }, window.maskNumber(count), " registered")), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        font: "var(--type-body-md)",
        letterSpacing: "var(--ls-body-md)"
      }
    }, claimed ? "I’d fund this" : "Would you fund this? No maintainer has claimed this page yet — we’ll tell them if they do."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "var(--inline-gap)",
        alignItems: "center",
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: on ? "outline" : "primary",
      onClick: () => ctx.go({
        name: "action.interest",
        slug: project.slug,
        system: r.key
      })
    }, on ? "Registered — withdraw" : claimed ? "I’d fund this" : "Register interest"), /*#__PURE__*/React.createElement(Note, null, "Registering interest subscribes you to nothing. One per account per project per system; re-clicking withdraws.")));
  }), /*#__PURE__*/React.createElement(Note, null, "The aggregate is held against the numeric repository ID, never a person. No payee, no promise, no addressee.")));
}
function HealthBreakdown({
  project,
  ctx
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, project.signalsUnavailable ? /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px dashed var(--border-hairline)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Note, null, project.signalsUnavailable, " Signals-unavailable state, never silent zeros.")) : null, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: "var(--surface-soft)"
    }
  }, ["Signal", "Band", "Sourced fact", "Source", "Fetched"].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: "left",
      font: "var(--type-mono-eyebrow)",
      letterSpacing: "var(--ls-mono-eyebrow)",
      textTransform: "uppercase",
      color: "var(--text-secondary)",
      padding: "var(--row-padding)",
      fontWeight: 500
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, window.SIGNAL_META.map(m => {
    const s = project.signals[m.key];
    const degraded = ctx.ghDegraded && m.fallback === "HELD";
    return /*#__PURE__*/React.createElement("tr", {
      key: m.key,
      style: {
        borderTop: "var(--border-level-1)"
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "var(--row-padding)",
        font: "var(--type-body-md-strong)",
        letterSpacing: "var(--ls-body-md)"
      }
    }, m.label), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "var(--row-padding)"
      }
    }, /*#__PURE__*/React.createElement(Band, {
      value: degraded ? "Insufficient data" : s.band
    })), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "var(--row-padding)",
        font: "var(--type-body-md)",
        letterSpacing: "var(--ls-body-md)",
        color: "var(--text-secondary)"
      }
    }, degraded ? "Source unavailable" : s.detail), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "var(--row-padding)",
        font: "var(--type-mono-caption)",
        letterSpacing: "var(--ls-mono-caption)",
        color: "var(--text-secondary)"
      }
    }, degraded ? "—" : s.source), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "var(--row-padding)",
        font: "var(--type-mono-caption)",
        letterSpacing: "var(--ls-mono-caption)",
        color: "var(--text-secondary)"
      }
    }, s.fetched));
  }))), /*#__PURE__*/React.createElement(Note, null, "Funding health is removed with the money. Every surviving signal is externally sourced, which is what makes generated pages computable. An unavailable source renders \u201Cinsufficient data\u201D, never a guess."));
}
function VocabularyBlock({
  project,
  ctx
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "var(--space-md)"
    }
  }, window.VOCAB_DIMENSIONS.map(d => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-xxs)",
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    size: "caption"
  }, d), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, project.vocab[d] || "—")))), project.inferred ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--inline-gap)",
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "outline",
    mono: true
  }, "Inferred by the pipeline"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      ctx.go({
        name: "admin.vocab"
      });
    },
    style: {
      font: "var(--type-caption)",
      color: "var(--text-secondary)"
    }
  }, "Contest this vocabulary"), /*#__PURE__*/React.createElement(Note, null, "A claim replaces inferred vocabulary with the maintainer\u2019s own. Maintainer-first survives as a precedence rule, not a source rule.")) : /*#__PURE__*/React.createElement(Note, null, "Maintainer-declared."), /*#__PURE__*/React.createElement(Held, {
    refs: "Illustrative"
  }, "The six schema-v1 dimensions are frozen by the spec but not named in it. These six stand in and would be replaced by the real vocabulary."));
}
function MachineReadablePanel({
  project,
  state
}) {
  const rows = {
    generated: [["JSON-LD", "Facts + codeRepository. No verification claim."], ["Provenance", "Generation, sources and fetch dates, in plain text."], ["Bands", "Render."], ["Verdict / commerce", "Absent."], ["Indexed", "Yes."]],
    active: [["JSON-LD", "Facts + verification fields."], ["Provenance", "As specced."], ["Bands", "Render."], ["Verdict / commerce", "Verdict renders; commerce descriptions render."], ["Indexed", "Yes."]],
    lapsed: [["JSON-LD", "Verification fields switch to re-verification-in-progress."], ["Provenance", "Unchanged."], ["Bands", "Fact table unchanged."], ["Verdict / commerce", "Unchanged."], ["Indexed", "Yes."]],
    retired: [["JSON-LD", "Dated catalog record. Verification fields dropped."], ["Provenance", "Removed."], ["Bands", "Survive frozen."], ["Verdict / commerce", "Verdict survives; recommendations, more-from-maintainer and ask-your-agent drop."], ["Indexed", "Yes, as a dated record."]],
    revoked: [["JSON-LD", "As Retired."], ["Provenance", "Removed."], ["Bands", "Survive frozen."], ["Verdict / commerce", "As Retired."], ["Indexed", "No — noindex."]],
    suppressed: [["Everywhere", "Nothing renders. 404, out of the sitemap."], ["MCP / read API / agent profiles / llms.txt", "Absent from every response."], ["Alternatives & comparison generation", "Excluded."], ["Lists", "Dropped from public rendering; owner sees a private removed-on-request note."], ["Re-ingestion", "Suppression survives it — keyed to the numeric repository ID, re-read at selection and refresh."]]
  }[state];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)",
      background: "var(--surface-dark)",
      border: "var(--border-level-2)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onDark"
  }, "Claim-state mirror \u2014 machine-readable surfaces"), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("tbody", null, rows.map(([k, v]) => /*#__PURE__*/React.createElement("tr", {
    key: k,
    style: {
      borderTop: "1px solid var(--border-hairline-dark)"
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "var(--row-padding)",
      width: "30%",
      font: "var(--type-mono-caption)",
      letterSpacing: "var(--ls-mono-caption)",
      textTransform: "uppercase",
      color: "var(--text-on-dark-secondary)",
      verticalAlign: "top"
    }
  }, k), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "var(--row-padding)",
      font: "var(--type-caption)",
      color: "var(--text-on-dark)"
    }
  }, v))))), /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onDarkMuted",
    size: "caption"
  }, "One source of truth: every machine-readable trust surface mirrors the verification indicator."));
}
function BelowFold({
  project,
  state,
  ctx
}) {
  const claimed = state === "active" || state === "lapsed";
  const terminal = state === "retired" || state === "revoked";
  const item = (n, label, body, present) => /*#__PURE__*/React.createElement("section", {
    key: n,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    count: present ? null : "closed"
  }, n, ". ", label), present ? body : /*#__PURE__*/React.createElement(Note, null, terminal ? "Closes on a dated record — live relationships and interactive surfaces close; dated facts survive frozen." : "Claimed pages only."));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5xl)"
    }
  }, item(1, claimed ? "Foreshadow block" : "Pre-claim teaser and interest control", /*#__PURE__*/React.createElement(InterestControl, {
    project: project,
    state: state,
    ctx: ctx
  }), !terminal), item(2, "Full health breakdown", /*#__PURE__*/React.createElement(HealthBreakdown, {
    project: project,
    ctx: ctx
  }), true), item(3, "Provenance line with source dates", /*#__PURE__*/React.createElement(Note, null, "Generated from npm publish history, GitHub API, npm / ecosyste.ms and OpenSSF Scorecard. Fetch dates are rendered in element 2 above and in the breakdown. A page whose sources have gone stale past the published bound renders as stale rather than as current."), state === "generated"), item(4, "Vocabulary", /*#__PURE__*/React.createElement(VocabularyBlock, {
    project: project,
    ctx: ctx
  }), true), item(5, "Editorial verdict", project.verdict ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-lg)",
      letterSpacing: "var(--ls-body-lg)"
    }
  }, project.verdict.text), /*#__PURE__*/React.createElement(Eyebrow, {
    size: "caption"
  }, project.verdict.author, " \xB7 ", project.verdict.date)) : /*#__PURE__*/React.createElement(Note, null, "No verdict published."), claimed || terminal && !!project.verdict), item(6, "Peer recommendations", (project.recommendations || []).length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, project.recommendations.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.from,
    style: {
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "\u201C", r.text, "\u201D"), /*#__PURE__*/React.createElement(Eyebrow, {
    size: "caption"
  }, "Recommended by ", r.from))), /*#__PURE__*/React.createElement(Note, null, "Claimed projects only, in both directions. The attribution is the mechanism. Display-only; never feeds ranking.")) : /*#__PURE__*/React.createElement(Note, null, "None yet."), claimed), item(7, "Reverse dependency", (project.dependents || []).length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--chip-gap)",
      flexWrap: "wrap"
    }
  }, project.dependents.map(d => /*#__PURE__*/React.createElement(Badge, {
    key: d,
    tone: "neutral"
  }, d))), /*#__PURE__*/React.createElement(Note, null, "Who depends on this \u2014 from dependents data already ingested. Also an AEO answer surface.")) : /*#__PURE__*/React.createElement(Note, null, "No catalog dependents recorded."), !terminal), item(8, "More from this maintainer", /*#__PURE__*/React.createElement(Note, null, "Other claimed pages held by the same verified maintainer."), claimed), item(9, "Ask your agent", /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(CodeEditorMockup, {
    filename: "platform-generated prompt",
    code: "Check whether " + project.name + " (repository ID 4128907) appears in my\nlockfile, and compare the version I resolve against the\nband facts published at notavibe.dev/" + project.slug + ".\nVerify against my codebase before acting."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--inline-gap)",
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "external-link",
      size: 14
    })
  }, "Open in your agent"), /*#__PURE__*/React.createElement(Note, null, "A labeled external action over sanitized fields. The numeric repository ID makes the repo-match machine-checkable."))), !terminal), item(10, "The badge", /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--inline-gap)",
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "stretch",
      borderRadius: "var(--radius-sm)",
      overflow: "hidden",
      border: "var(--border-level-1)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: "var(--surface-soft)",
      padding: "4px 8px",
      font: "var(--type-mono-caption)",
      letterSpacing: "var(--ls-mono-caption)",
      textTransform: "uppercase"
    }
  }, "notavibe"), /*#__PURE__*/React.createElement("span", {
    style: {
      background: state === "active" ? "var(--accent-mint)" : "var(--surface-canvas)",
      padding: "4px 8px",
      font: "var(--type-mono-caption)",
      letterSpacing: "var(--ls-mono-caption)",
      textTransform: "uppercase"
    }
  }, state === "active" ? "verified maintainer" : state === "generated" ? "unclaimed" : state)), /*#__PURE__*/React.createElement(Note, null, "Generated from claim state. The funding-progress bar does not ship \u2014 it rendered funding progress.")), !terminal), item(11, "Report controls", /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--inline-gap)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => ctx.go({
      name: "suppress.start",
      slug: project.slug,
      type: "correction"
    })
  }, "Report a factual error"), project.inferred ? /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => ctx.go({
      name: "admin.vocab"
    })
  }, "Contest vocabulary") : null, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => ctx.go({
      name: "suppress.start",
      slug: project.slug
    })
  }, "Request removal")), true), /*#__PURE__*/React.createElement(MachineReadablePanel, {
    project: project,
    state: state
  }));
}

/* ── suppressed: nothing renders anywhere ─────────────────────── */

function SuppressedPage({
  project,
  ctx
}) {
  return /*#__PURE__*/React.createElement(Container, {
    style: {
      padding: "var(--space-section) var(--gutter-desktop)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)",
      maxWidth: "780px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "HTTP 404"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-xl)",
      letterSpacing: "var(--ls-display-xl)"
    }
  }, "This page is not available"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-lg)",
      letterSpacing: "var(--ls-body-lg)",
      color: "var(--text-secondary)"
    }
  }, "Nothing is disclosed about why, or about whether a record ever existed here."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => ctx.go({
      name: "discover"
    })
  }, "Back to discover"), /*#__PURE__*/React.createElement(MachineReadablePanel, {
    project: project,
    state: "suppressed"
  }), /*#__PURE__*/React.createElement(Held, {
    refs: "\xA78.4 edge 2"
  }, "Suppression is liftable by its original requester, filed as a lift PageRequest through the account-free request URL on the methodology page \u2014 which exists precisely because the page-borne form disappears the moment a suppression succeeds."));
}

/* ── the page ─────────────────────────────────────────────────── */

function ProjectPage({
  ctx
}) {
  const project = window.findProject(ctx.route.slug || ctx.focusSlug) || window.PROJECTS[0];
  const state = ctx.claimState(project.slug);
  if (state === "suppressed") return /*#__PURE__*/React.createElement(SuppressedPage, {
    project: project,
    ctx: ctx
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Container, {
    style: {
      padding: "var(--space-3xl) var(--gutter-desktop) 0"
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: "var(--space-sm)",
      alignItems: "center",
      font: "var(--type-mono-caption)",
      letterSpacing: "var(--ls-mono-caption)",
      textTransform: "uppercase",
      color: "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      ctx.go({
        name: "discover"
      });
    },
    style: {
      color: "inherit"
    }
  }, "Home"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("span", null, project.owner, "/", project.repo), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "var(--space-md)",
      color: "var(--text-secondary)"
    }
  }, "BreadcrumbList lists only real pages \u2014 no /", project.owner, " crumb"))), /*#__PURE__*/React.createElement(Container, {
    style: {
      padding: "var(--space-2xl) var(--gutter-desktop)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)",
      maxWidth: "980px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-lg)",
      flexWrap: "wrap",
      borderBottom: "var(--border-level-1)",
      paddingBottom: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Above the fold \u2014 exactly four elements at 360px"), /*#__PURE__*/React.createElement(Eyebrow, {
    size: "caption",
    style: {
      textAlign: "right",
      maxWidth: "46ch"
    }
  }, "Consent chrome may render without adding a fifth element or demoting the four")), /*#__PURE__*/React.createElement(ElementFrame, {
    n: 1,
    label: "Identity, carrying the verification indicator"
  }, /*#__PURE__*/React.createElement(Identity, {
    project: project,
    state: state
  })), /*#__PURE__*/React.createElement(ElementFrame, {
    n: 2,
    label: "Claim state and provenance"
  }, /*#__PURE__*/React.createElement(ClaimAndProvenance, {
    project: project,
    state: state,
    ctx: ctx
  })), /*#__PURE__*/React.createElement(ElementFrame, {
    n: 3,
    label: "Two-signal summary"
  }, /*#__PURE__*/React.createElement(TwoSignalSummary, {
    project: project,
    ctx: ctx
  })), /*#__PURE__*/React.createElement(ElementFrame, {
    n: 4,
    label: "Primary CTA"
  }, /*#__PURE__*/React.createElement(PrimaryCTA, {
    project: project,
    ctx: ctx
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "var(--border-level-1)",
      background: "var(--surface-canvas)"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    style: {
      padding: "var(--space-5xl) var(--gutter-desktop) var(--space-section)",
      maxWidth: "980px"
    }
  }, /*#__PURE__*/React.createElement(BelowFold, {
    project: project,
    state: state,
    ctx: ctx
  }))));
}
Object.assign(window, {
  ProjectPage,
  Band,
  InterestControl,
  HealthBreakdown,
  MachineReadablePanel
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/notavibe/ProjectPage.jsx", error: String((e && e.message) || e) }); }

// prototypes/notavibe/Backer.jsx
try { (() => {
const {
  Button,
  Badge,
  Eyebrow,
  Icon,
  Container,
  TextInput,
  StatsCard
} = window.TogetherAIDesignSystem_eaf923;
const {
  Band,
  Held,
  Note,
  SectionTitle,
  ProjectRow
} = window;
function BackerDashboard({
  ctx
}) {
  const saved = ctx.lists.reduce((n, l) => n + l.items.length, 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3xl)",
      padding: "var(--space-3xl)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Backer"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-lg)",
      letterSpacing: "var(--ls-display-lg)"
    }
  }, "Raj")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(StatsCard, {
    value: String(saved),
    label: "Projects in lists"
  }), /*#__PURE__*/React.createElement(StatsCard, {
    value: String(ctx.interests.length),
    label: "Interests registered",
    tint: "periwinkle"
  }), /*#__PURE__*/React.createElement(StatsCard, {
    value: ctx.scan ? String(ctx.scan.matched.length) : "—",
    label: "In my stack",
    tint: "soft"
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    count: "8\u201312 weekly"
  }, "Your Deck"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "var(--space-md)"
    }
  }, window.PROJECTS.slice(0, 4).map(p => /*#__PURE__*/React.createElement(ProjectRow, {
    key: p.slug,
    slug: p.slug,
    ctx: ctx
  })))), /*#__PURE__*/React.createElement(BackerActivity, {
    ctx: ctx,
    embedded: true
  }));
}
const ACTIVITY = [{
  type: "Nomination outcome",
  valence: "Positive",
  text: "kysely-org/kysely — the page you nominated is now published.",
  when: "2 days ago"
}, {
  type: "A listed project was claimed",
  valence: "Positive",
  text: "unjs/unbuild gained a verified maintainer.",
  when: "5 days ago"
}, {
  type: "A list you published was saved",
  valence: "Positive",
  text: "“Boring infrastructure I would miss” reached 4 saves.",
  when: "6 days ago"
}, {
  type: "List activity",
  valence: "Negative",
  text: "A project in one of your lists reached a terminal claim state and now renders as a dated record.",
  when: "12 days ago"
}, {
  type: "Interest outcome",
  valence: "Positive",
  text: "Nothing yet — you will hear when a system you registered for opens.",
  when: "—"
}];
function BackerActivity({
  ctx,
  embedded
}) {
  const [tab, setTab] = React.useState("Open");
  const items = tab === "Open" ? ACTIVITY.slice(0, 4) : ACTIVITY.slice(3);
  const body = /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    count: "badge: " + ACTIVITY.slice(0, 4).length
  }, "Activity"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-xs)"
    }
  }, ["Open", "Recent outcomes"].map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setTab(t),
    style: {
      border: "1px solid var(--border-input)",
      background: tab === t ? "var(--primary)" : "var(--surface-canvas)",
      color: tab === t ? "var(--on-primary)" : "var(--text-body)",
      borderRadius: "var(--radius-xs)",
      padding: "var(--space-sm) var(--space-md)",
      font: "var(--type-mono-label)",
      letterSpacing: "var(--ls-mono-label)",
      textTransform: "uppercase",
      cursor: "pointer"
    }
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)"
    }
  }, items.map(a => /*#__PURE__*/React.createElement("div", {
    key: a.text,
    style: {
      display: "flex",
      gap: "var(--space-lg)",
      alignItems: "flex-start",
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: a.valence === "Negative" ? "outline" : "neutral",
    mono: true
  }, a.type), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, a.text), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono-caption)",
      letterSpacing: "var(--ls-mono-caption)",
      color: "var(--text-secondary)"
    }
  }, a.when)))), /*#__PURE__*/React.createElement(Note, null, "Deadline-ascending where a deadline exists; overlaps collapsed; acted and expired items move to Recent outcomes for 14 days. Where the spec says \u201Cnotified\u201D without naming a channel, the notice is in-app."));
  return embedded ? body : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-3xl)"
    }
  }, body);
}
function MyLists({
  ctx
}) {
  const [creating, setCreating] = React.useState(false);
  const [title, setTitle] = React.useState("");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)",
      padding: "var(--space-3xl)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "var(--space-lg)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-lg)",
      letterSpacing: "var(--ls-display-lg)"
    }
  }, "My lists"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => setCreating(true)
  }, "New list")), creating ? /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      if (title.trim()) {
        ctx.createList(title.trim());
        setTitle("");
        setCreating(false);
      }
    },
    style: {
      display: "flex",
      gap: "var(--space-md)",
      alignItems: "end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    label: "Title",
    value: title,
    onChange: e => setTitle(e.target.value),
    placeholder: "Things I would miss"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Create"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => setCreating(false)
  }, "Cancel")) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, ctx.lists.map(l => /*#__PURE__*/React.createElement("button", {
    key: l.id,
    onClick: () => ctx.go({
      name: "backer.list",
      id: l.id
    }),
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "var(--space-lg)",
      border: "var(--border-level-1)",
      background: "var(--surface-canvas)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      cursor: "pointer",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-xs)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-display-md)",
      letterSpacing: "var(--ls-display-md)"
    }
  }, l.title), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono-caption)",
      letterSpacing: "var(--ls-mono-caption)",
      textTransform: "uppercase",
      color: "var(--text-secondary)"
    }
  }, l.visibility, " \xB7 ", l.items.length, " items \xB7 ", window.maskNumber(l.saves), " saves")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 20,
    strokeColor: "var(--text-secondary)"
  })))), /*#__PURE__*/React.createElement(Note, null, "No ratings, no scores \u2014 a curated list is not a review."));
}
function ListDetail({
  ctx,
  publicView
}) {
  const list = ctx.lists.find(l => l.id === (ctx.route.id || "l1")) || ctx.lists[0];
  const removedOnRequest = list.items.some(s => ctx.claimState(s) === "suppressed");
  const visible = list.items.filter(s => ctx.claimState(s) !== "suppressed");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)",
      padding: publicView ? "0" : "var(--space-3xl)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, publicView ? "/lists/" + list.handle + "/" + list.slug : list.visibility + " list"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-xl)",
      letterSpacing: "var(--ls-display-xl)"
    }
  }, list.title), list.description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-lg)",
      letterSpacing: "var(--ls-body-lg)",
      color: "var(--text-secondary)"
    }
  }, list.description) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--inline-gap)",
      flexWrap: "wrap",
      alignItems: "center"
    }
  }, publicView ? /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => ctx.saveListCopy(list.id)
  }, "Save this list") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => ctx.toggleVisibility(list.id)
  }, list.visibility === "public" ? "Unpublish" : "Publish"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => ctx.go({
      name: "list.public",
      id: list.id
    })
  }, "View public page")), publicView ? /*#__PURE__*/React.createElement(Note, null, "Copies it into your own lists as an independent list \u2014 not a subscription to the original.") : null)), /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, visible.map((slug, i) => {
    const p = window.findProject(slug);
    const st = ctx.claimState(slug);
    return /*#__PURE__*/React.createElement("li", {
      key: slug,
      style: {
        display: "flex",
        gap: "var(--space-md)",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-mono-caption)",
        letterSpacing: "var(--ls-mono-caption)",
        color: "var(--text-secondary)",
        width: "20px"
      }
    }, i + 1), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, st === "retired" || st === "revoked" ? /*#__PURE__*/React.createElement("div", {
      style: {
        border: "1px dashed var(--border-hairline)",
        borderRadius: "var(--radius-sm)",
        padding: "var(--space-lg)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-xs)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-body-md-strong)",
        letterSpacing: "var(--ls-body-md)"
      }
    }, p.name), /*#__PURE__*/React.createElement(Note, null, "Renders as a dated record \u2014 ", st === "retired" ? "retired " + (p.retiredAt || "") : "revoked and not indexed", ".")) : /*#__PURE__*/React.createElement(ProjectRow, {
      slug: slug,
      ctx: ctx,
      compact: true
    })), !publicView ? /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      onClick: () => ctx.toggleInList(list.id, slug)
    }, "Remove") : null);
  })), removedOnRequest && !publicView ? /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px dashed var(--accent-magenta)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(Note, null, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500
    }
  }, "Private note to you:"), " an item was removed from this list on request. It is not named publicly, and your list has not been silently corrupted.")) : null);
}
function PublicListPage({
  ctx
}) {
  return /*#__PURE__*/React.createElement(Container, {
    style: {
      padding: "var(--space-5xl) var(--gutter-desktop) var(--space-section)",
      maxWidth: "860px"
    }
  }, /*#__PURE__*/React.createElement(ListDetail, {
    ctx: ctx,
    publicView: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-3xl)"
    }
  }, /*#__PURE__*/React.createElement(Note, null, "An acquisition surface: indexed, reachable from search and from its object, never a front-door module. Reserved namespace segment: /lists.")));
}
const CHAT_SCRIPT = [{
  role: "user",
  text: "I need to replace eslint and prettier without a big migration"
}, {
  role: "bot",
  text: "Two projects in the catalog cover both jobs in one binary. I can only talk about the catalog, and every recommendation links its page."
}, {
  role: "draft",
  items: ["biomejs/biome", "oxc-project/oxlint"]
}];
function CurationChat({
  ctx
}) {
  const [turns, setTurns] = React.useState([]);
  const [input, setInput] = React.useState("");
  const advance = text => {
    const next = [...turns, {
      role: "user",
      text
    }];
    next.push(CHAT_SCRIPT[1]);
    next.push(CHAT_SCRIPT[2]);
    setTurns(next);
    setInput("");
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)",
      padding: "var(--space-3xl)",
      maxWidth: "820px"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Curation chat"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-lg)",
      letterSpacing: "var(--ls-display-lg)"
    }
  }, "A conversation curates"), /*#__PURE__*/React.createElement(Note, null, "Grounded in the catalog only. It cannot discuss projects outside it, every recommendation cites a project page, and its output is a draft list rather than prose.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)"
    }
  }, turns.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px dashed var(--border-hairline)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Note, null, "Try: \u201C", CHAT_SCRIPT[0].text, "\u201D"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => advance(CHAT_SCRIPT[0].text)
  }, "Use that"))) : null, turns.map((t, i) => {
    if (t.role === "draft") {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          border: "1px solid var(--primary)",
          borderRadius: "var(--radius-sm)",
          padding: "var(--space-2xl)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-md)"
        }
      }, /*#__PURE__*/React.createElement(Eyebrow, null, "Draft list"), t.items.map(s => /*#__PURE__*/React.createElement(ProjectRow, {
        key: s,
        slug: s,
        ctx: ctx,
        compact: true
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: "var(--inline-gap)",
          flexWrap: "wrap"
        }
      }, /*#__PURE__*/React.createElement(Button, {
        variant: "primary",
        onClick: () => {
          ctx.createList("Replacing eslint + prettier", null, t.items);
          ctx.go({
            name: "backer.lists"
          });
        }
      }, "Save as a list"), /*#__PURE__*/React.createElement(Button, {
        variant: "outline"
      }, "Refine further")), /*#__PURE__*/React.createElement(Note, null, "Conversations are never a ranking input; transcripts are never indexed."));
    }
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        alignSelf: t.role === "user" ? "flex-end" : "flex-start",
        maxWidth: "78%",
        background: t.role === "user" ? "var(--primary)" : "var(--surface-soft)",
        color: t.role === "user" ? "var(--on-primary)" : "var(--text-body)",
        borderRadius: "var(--radius-sm)",
        padding: "var(--space-md) var(--space-lg)",
        font: "var(--type-body-md)",
        letterSpacing: "var(--ls-body-md)"
      }
    }, t.text);
  })), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      if (input.trim()) advance(input.trim());
    },
    style: {
      display: "flex",
      gap: "var(--space-md)",
      alignItems: "end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    label: "Message",
    value: input,
    onChange: e => setInput(e.target.value),
    placeholder: "What are you trying to replace or find?"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Send")));
}
function BackerOnboarding({
  ctx
}) {
  const [digest, setDigest] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)",
      padding: "var(--space-3xl)",
      maxWidth: "760px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Onboarding \xB7 ask first"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-lg)",
      letterSpacing: "var(--ls-display-lg)"
    }
  }, "What do you work on?"), /*#__PURE__*/React.createElement(Note, null, "The preference profile Your Deck is built from. It is a survey, which is the cold-start problem stated plainly."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, ["Libraries and tooling", "Product application code", "Infrastructure and platform", "Data and ML"].map(o => /*#__PURE__*/React.createElement("button", {
    key: o,
    style: {
      border: "var(--border-level-1)",
      background: "var(--surface-canvas)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)",
      cursor: "pointer",
      textAlign: "left",
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, o))), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      gap: "var(--space-md)",
      alignItems: "flex-start",
      border: "1px solid var(--primary)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: digest,
    onChange: e => setDigest(e.target.checked),
    style: {
      marginTop: "3px",
      accentColor: "var(--primary)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-xs)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-md-strong)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "Send me the weekly discovery digest"), /*#__PURE__*/React.createElement(Note, null, "Stream (c), off at signup. A real choice, never a pre-ticked box \u2014 and the version\u2019s only return-trigger email."))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => {
      ctx.signIn();
      ctx.go({
        name: "backer.dashboard"
      });
    }
  }, "Start discovering"));
}
Object.assign(window, {
  BackerDashboard,
  BackerActivity,
  ACTIVITY,
  MyLists,
  ListDetail,
  PublicListPage,
  CurationChat,
  BackerOnboarding
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/notavibe/Backer.jsx", error: String((e && e.message) || e) }); }

// prototypes/notavibe/Search.jsx
try { (() => {
const {
  Button,
  Badge,
  Eyebrow,
  Icon,
  Container
} = window.TogetherAIDesignSystem_eaf923;
const {
  Band,
  Held,
  Note,
  SectionTitle,
  ProjectRow
} = window;
const FACETS = [{
  dim: "Purpose",
  values: ["Test runner", "Library bundler", "Linter", "SQL toolkit", "HTTP framework", "Schema validation"]
}, {
  dim: "Maturity",
  values: ["Emerging", "Established", "Mature"]
}, {
  dim: "Maintenance model",
  values: ["Single maintainer", "Small team", "Collective", "Company-backed", "Foundation", "Team"]
}];
const BAND_FILTERS = [{
  key: "updates",
  label: "Maintenance rhythm",
  values: ["Steady", "Intermittent", "Quiet"]
}, {
  key: "breadth",
  label: "Contribution breadth",
  values: ["Broad", "Narrowing", "Single-author"]
}];
function Checkbox({
  on,
  label,
  onToggle
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onToggle,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-sm)",
      background: "none",
      border: "none",
      padding: "2px 0",
      cursor: "pointer",
      textAlign: "left",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "14px",
      height: "14px",
      flex: "0 0 14px",
      border: "1px solid " + (on ? "var(--primary)" : "var(--border-input)"),
      background: on ? "var(--primary)" : "var(--surface-canvas)",
      borderRadius: "2px",
      display: "grid",
      placeItems: "center"
    }
  }, on ? /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 10,
    strokeColor: "#fff"
  }) : null), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)",
      color: on ? "var(--text-body)" : "var(--text-secondary)"
    }
  }, label));
}
function SearchResults({
  ctx
}) {
  const [q, setQ] = React.useState(ctx.route.q || "");
  const [facets, setFacets] = React.useState({});
  const [bands, setBands] = React.useState({});
  const [sort, setSort] = React.useState("Relevance");
  const toggle = (setter, obj, k, v) => {
    const cur = obj[k] || [];
    const next = cur.includes(v) ? cur.filter(x => x !== v) : cur.concat(v);
    setter({
      ...obj,
      [k]: next
    });
  };
  const activeFacets = Object.entries(facets).filter(([, v]) => v && v.length);
  const activeBands = Object.entries(bands).filter(([, v]) => v && v.length);
  const matches = window.PROJECTS.filter(p => {
    if (ctx.claimState(p.slug) === "suppressed") return false;
    const needle = q.trim().toLowerCase();
    // Search matches project name and description only. Facets are filters, never search targets.
    if (needle && !(p.name.toLowerCase().includes(needle) || p.description.toLowerCase().includes(needle))) return false;
    for (const [dim, vals] of activeFacets) if (!vals.includes(p.vocab[dim])) return false;
    for (const [key, vals] of activeBands) if (!vals.includes(p.signals[key].band)) return false;
    return true;
  });
  const relax = () => {
    setFacets({});
    setBands({});
  };
  const dropOne = () => {
    if (activeBands.length) {
      const [k] = activeBands[activeBands.length - 1];
      setBands({
        ...bands,
        [k]: []
      });
      return;
    }
    if (activeFacets.length) {
      const [k] = activeFacets[activeFacets.length - 1];
      setFacets({
        ...facets,
        [k]: []
      });
    }
  };
  return /*#__PURE__*/React.createElement(Container, {
    style: {
      padding: "var(--space-3xl) var(--gutter-desktop) var(--space-section)",
      display: "grid",
      gridTemplateColumns: "260px 1fr",
      gap: "var(--space-5xl)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)",
      position: "sticky",
      top: "88px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, "Search"), /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Name or description",
    style: {
      border: "1px solid var(--border-input)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-md)",
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)",
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement(Note, null, "Matches project name and description. Vocabulary facets are filters, never search targets.")), BAND_FILTERS.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.key,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)"
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, b.label), b.values.map(v => /*#__PURE__*/React.createElement(Checkbox, {
    key: v,
    label: v,
    on: (bands[b.key] || []).includes(v),
    onToggle: () => toggle(setBands, bands, b.key, v)
  })))), FACETS.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.dim,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)"
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, f.dim), f.values.map(v => /*#__PURE__*/React.createElement(Checkbox, {
    key: v,
    label: v,
    on: (facets[f.dim] || []).includes(v),
    onToggle: () => toggle(setFacets, facets, f.dim, v)
  })))), /*#__PURE__*/React.createElement(Note, null, "One versioned schema, nine consumers: this filter UI, Refine, MCP search_projects, agent profiles, the JSON-LD generator, the AEO surface, the curation chatbot, the alternatives generator and the list-page renderer.")), /*#__PURE__*/React.createElement("main", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "var(--space-lg)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, matches.length, " ", matches.length === 1 ? "result" : "results"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-xs)"
    }
  }, ["Relevance", "Maintenance rhythm", "Recently updated"].map(s => /*#__PURE__*/React.createElement("button", {
    key: s,
    onClick: () => setSort(s),
    style: {
      border: "1px solid var(--border-input)",
      background: sort === s ? "var(--primary)" : "var(--surface-canvas)",
      color: sort === s ? "var(--on-primary)" : "var(--text-body)",
      borderRadius: "var(--radius-xs)",
      padding: "var(--space-sm) var(--space-md)",
      font: "var(--type-mono-label)",
      letterSpacing: "var(--ls-mono-label)",
      textTransform: "uppercase",
      cursor: "pointer"
    }
  }, s)))), /*#__PURE__*/React.createElement(Note, null, "Filter permutations and sort orders are blocked in robots.txt \u2014 they are not indexable surfaces."), matches.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)",
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-3xl)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "HTTP 404 \xB7 S4 empty state"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--type-display-lg)",
      letterSpacing: "var(--ls-display-lg)"
    }
  }, "Nothing matches all of those at once"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)",
      color: "var(--text-secondary)"
    }
  }, "Status for crawlers, state for humans: this URL returns 404 and still renders the designed relaxation UI."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--inline-gap)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: dropOne
  }, "Drop the last filter"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: relax
  }, "Clear all filters"), q ? /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => setQ("")
  }, "Clear the query") : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    size: "caption"
  }, "Nearest without the last filter"), window.PROJECTS.slice(0, 3).map(p => /*#__PURE__*/React.createElement(ProjectRow, {
    key: p.slug,
    slug: p.slug,
    ctx: ctx,
    compact: true
  })))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, matches.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.slug,
    style: {
      display: "flex",
      gap: "var(--space-md)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(ProjectRow, {
    slug: p.slug,
    ctx: ctx
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    style: {
      flex: "0 0 auto"
    },
    onClick: () => ctx.go({
      name: "action.nominate",
      slug: p.slug
    })
  }, "Nominate")))), /*#__PURE__*/React.createElement(Held, {
    refs: "Open #6"
  }, "Search matching name and description was adequate at 20\u201350 projects and holds nothing at thousands, where search is the discovery surface rather than a convenience. It stands as the floor until decision #5 answers \u2014 which now carries four riders: search semantics, Your Deck\u2019s cold start, the selection floor and vocabulary at scale.")));
}
Object.assign(window, {
  SearchResults
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/notavibe/Search.jsx", error: String((e && e.message) || e) }); }

// prototypes/notavibe/Stack.jsx
try { (() => {
const {
  Button,
  Badge,
  Eyebrow,
  Icon,
  Container,
  TextInput,
  CodeEditorMockup
} = window.TogetherAIDesignSystem_eaf923;
const {
  Band,
  Held,
  Note,
  SectionTitle,
  ProjectRow
} = window;
const SCAN_TARGETS = [{
  id: "gh-pub",
  provider: "GitHub",
  repo: "raj/oss-dashboard",
  visibility: "public",
  publishable: true
}, {
  id: "gh-priv",
  provider: "GitHub",
  repo: "raj/client-billing",
  visibility: "private",
  publishable: false
}, {
  id: "gl-pub",
  provider: "GitLab",
  repo: "raj/pipeline-tools",
  visibility: "public",
  publishable: true
}];
function StackConnect({
  ctx
}) {
  const [mode, setMode] = React.useState("oauth");
  const [manifest, setManifest] = React.useState("");
  const [consent, setConsent] = React.useState(false);
  const [target, setTarget] = React.useState(SCAN_TARGETS[0].id);
  const chosen = SCAN_TARGETS.find(t => t.id === target);
  const run = () => {
    const source = mode === "oauth" ? {
      kind: "repo",
      provider: chosen.provider,
      repo: chosen.repo,
      visibility: chosen.visibility,
      publishable: chosen.publishable
    } : {
      kind: "manifest",
      provider: "Pasted manifest",
      repo: null,
      visibility: "not applicable",
      publishable: false
    };
    ctx.runScan(source, mode === "oauth" ? window.MANIFEST_SAMPLE : manifest || window.MANIFEST_SAMPLE);
  };
  return /*#__PURE__*/React.createElement(Container, {
    style: {
      padding: "var(--space-5xl) var(--gutter-desktop) var(--space-section)",
      maxWidth: "860px",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Discover your stack"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-xl)",
      letterSpacing: "var(--ls-display-xl)"
    }
  }, "Find what you already depend on"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-lg)",
      letterSpacing: "var(--ls-body-lg)",
      color: "var(--text-secondary)"
    }
  }, "The scan runs server-side. Matches resolve against the catalog; everything else is discarded.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-xs)",
      background: "var(--surface-soft)",
      borderRadius: "var(--radius-md)",
      padding: "var(--space-xs)",
      width: "fit-content"
    }
  }, [["oauth", "Connect a provider"], ["paste", "Paste a manifest"]].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setMode(k),
    style: {
      border: "none",
      cursor: "pointer",
      borderRadius: "var(--radius-md)",
      padding: "var(--space-md) var(--space-2xl)",
      background: mode === k ? "var(--surface-canvas)" : "transparent",
      color: mode === k ? "var(--text-body)" : "var(--text-secondary)",
      font: mode === k ? "var(--type-body-md-strong)" : "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, l))), mode === "oauth" ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, "Repositories \u2014 read-minimal OAuth"), SCAN_TARGETS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    onClick: () => setTarget(t.id),
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-md)",
      border: "1px solid " + (target === t.id ? "var(--primary)" : "var(--border-hairline)"),
      background: "var(--surface-canvas)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)",
      cursor: "pointer",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "2px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-md-strong)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, t.repo), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono-caption)",
      letterSpacing: "var(--ls-mono-caption)",
      textTransform: "uppercase",
      color: "var(--text-secondary)"
    }
  }, t.provider, " \xB7 ", t.visibility)), /*#__PURE__*/React.createElement(Badge, {
    tone: t.publishable ? "neutral" : "outline",
    mono: true
  }, t.publishable ? "Publishable" : "Scan only"))), /*#__PURE__*/React.createElement(Note, null, "Read-minimal OAuth reports repository visibility, which is what makes the publish test evaluable. The scan reads GitLab-hosted manifests too.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    label: "package.json",
    multiline: true,
    rows: 9,
    value: manifest,
    onChange: e => setManifest(e.target.value),
    placeholder: window.MANIFEST_SAMPLE
  }), /*#__PURE__*/React.createElement(Note, null, "Pasted manifests are scannable and never publishable \u2014 the test is source visibility, not who ran the scan.")), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      gap: "var(--space-md)",
      alignItems: "flex-start",
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: consent,
    onChange: e => setConsent(e.target.checked),
    style: {
      marginTop: "3px",
      accentColor: "var(--primary)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-xs)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-md-strong)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "Run the scan on the server"), /*#__PURE__*/React.createElement(Note, null, "The manifest and its unmatched entries are not retained beyond this session unless you save them. Matched project references persist only as an aggregate count with no scan or account referent."))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    disabled: !consent,
    onClick: run
  }, "Scan"));
}
function ScanResults({
  ctx
}) {
  const scan = ctx.scan;
  const [sortInStack, setSortInStack] = React.useState(true);
  if (!scan) return /*#__PURE__*/React.createElement(StackConnect, {
    ctx: ctx
  });
  const matched = scan.matched.map(window.findProject).filter(Boolean).filter(p => ctx.claimState(p.slug) !== "suppressed");
  const ordered = sortInStack ? matched : matched.slice().reverse();
  return /*#__PURE__*/React.createElement(Container, {
    style: {
      padding: "var(--space-3xl) var(--gutter-desktop) var(--space-section)",
      maxWidth: "980px",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Scan complete"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-lg)",
      letterSpacing: "var(--ls-display-lg)"
    }
  }, matched.length, " of ", scan.total, " dependencies are in the catalog"), /*#__PURE__*/React.createElement(Note, null, "Source: ", scan.source.provider, scan.source.repo ? " · " + scan.source.repo + " · " + scan.source.visibility : "", ". ", scan.unmatched, " entries matched nothing and are not retained.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--inline-gap)",
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSortInStack(!sortInStack),
    style: {
      border: "1px solid var(--border-input)",
      background: sortInStack ? "var(--primary)" : "var(--surface-canvas)",
      color: sortInStack ? "var(--on-primary)" : "var(--text-body)",
      borderRadius: "var(--radius-xs)",
      padding: "var(--space-sm) var(--space-md)",
      font: "var(--type-mono-label)",
      letterSpacing: "var(--ls-mono-label)",
      textTransform: "uppercase",
      cursor: "pointer"
    }
  }, "Sort: in my stack"), /*#__PURE__*/React.createElement(Note, null, "\u201CIn my stack\u201D is the default sort, announced and clearable.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, ordered.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.slug,
    style: {
      display: "flex",
      gap: "var(--space-md)",
      alignItems: "stretch",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 420px"
    }
  }, /*#__PURE__*/React.createElement(ProjectRow, {
    slug: p.slug,
    ctx: ctx
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-xs)",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => ctx.go({
      name: "action.save",
      slug: p.slug
    })
  }, "Save to list"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => ctx.go({
      name: "action.interest",
      slug: p.slug
    })
  }, "Register interest"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => ctx.go({
      name: "action.nominate",
      slug: p.slug,
      from: {
        name: "stack.results"
      }
    })
  }, "Nominate"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)",
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Publish this scan"), scan.source.publishable ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "This scan\u2019s source is a public repository the platform can verify, so it may be published at a stack page."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => ctx.go({
      name: "stack.publish"
    })
  }, "Publish stack page"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "This scan cannot be published."), /*#__PURE__*/React.createElement(Note, null, scan.source.kind === "manifest" ? "Pasted manifests are never publishable." : "Private-repository scans are never publishable.", " The risk is publishing a dependency inventory that is not otherwise public \u2014 identical for a solo developer\u2019s private client project and for a large employer\u2019s."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)",
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Organisation waitlist"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "Scanning a company stack? Tell us and we\u2019ll get in touch when the organisation tooling opens."), ctx.orgWaitlisted ? /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    mono: true
  }, "Received \u2014 acknowledgement sent") : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      ctx.joinOrgWaitlist();
    },
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr auto",
      gap: "var(--space-md)",
      alignItems: "end"
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    label: "Company",
    name: "company",
    placeholder: "Meridian"
  }), /*#__PURE__*/React.createElement(TextInput, {
    label: "Stack size",
    name: "size",
    placeholder: "~180 packages"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Join")), /*#__PURE__*/React.createElement(Note, null, "Writes to OrgInterest \u2014 a separate entity from DemandSignal, with no project referent, so it aggregates into no maintainer\u2019s analytics. No price, no date, no tier.")));
}
function PublishInterstitial({
  ctx
}) {
  const scan = ctx.scan;
  const matched = (scan ? scan.matched : []).map(window.findProject).filter(Boolean);
  const [slug, setSlug] = React.useState("pipeline-dependencies");
  return /*#__PURE__*/React.createElement(Container, {
    style: {
      padding: "var(--space-5xl) var(--gutter-desktop) var(--space-section)",
      maxWidth: "760px",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Before you publish"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-lg)",
      letterSpacing: "var(--ls-display-lg)"
    }
  }, "What will be published, exactly"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)",
      border: "1px solid var(--primary)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md-strong)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "The set of matched projects below is a dependency inventory. Publishing it makes that inventory public at a permanent URL."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--chip-gap)",
      flexWrap: "wrap"
    }
  }, matched.map(p => /*#__PURE__*/React.createElement(Badge, {
    key: p.slug,
    tone: "neutral"
  }, p.name))), /*#__PURE__*/React.createElement(Note, null, "Unmatched entries are not published and are not retained. The scan\u2019s source is ", scan ? scan.source.repo : "—", ", a public repository, so the match set discloses nothing that is not already public \u2014 which is the reason this is permitted.")), /*#__PURE__*/React.createElement(TextInput, {
    label: "Stack page slug",
    value: slug,
    onChange: e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-")),
    hint: "Published at /stacks/raj/" + slug + " · lowercase-only slugs"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--inline-gap)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => {
      ctx.publishStack(slug);
      ctx.go({
        name: "stack.public"
      });
    }
  }, "Publish"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => ctx.go({
      name: "stack.results"
    })
  }, "Cancel")));
}
function PublicStackPage({
  ctx
}) {
  const scan = ctx.scan;
  const matched = (scan ? scan.matched : window.PROJECTS.slice(0, 5).map(p => p.slug)).map(window.findProject).filter(Boolean).filter(p => ctx.claimState(p.slug) !== "suppressed");
  return /*#__PURE__*/React.createElement(Container, {
    style: {
      padding: "var(--space-5xl) var(--gutter-desktop) var(--space-section)",
      maxWidth: "900px",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "/stacks/raj/", ctx.publishedStack || "pipeline-dependencies"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-xl)",
      letterSpacing: "var(--ls-display-xl)"
    }
  }, "What raj/pipeline-tools depends on"), /*#__PURE__*/React.createElement(Note, null, "An acquisition surface: indexed, reachable from search and from the object it belongs to, never a front-door module. Published from a public-repository scan."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, matched.map(p => /*#__PURE__*/React.createElement(ProjectRow, {
    key: p.slug,
    slug: p.slug,
    ctx: ctx
  }))), /*#__PURE__*/React.createElement(Note, null, "No ratings, no scores, no conclusion drawn. Reserved namespace segment so it cannot collide with /", "{owner}/{repo}", "."));
}
Object.assign(window, {
  StackConnect,
  ScanResults,
  PublishInterstitial,
  PublicStackPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/notavibe/Stack.jsx", error: String((e && e.message) || e) }); }

// prototypes/notavibe/ActionStates.jsx
try { (() => {
const {
  Button,
  Badge,
  Eyebrow,
  Icon,
  Container,
  TextInput
} = window.TogetherAIDesignSystem_eaf923;
const {
  Held,
  Note,
  SectionTitle
} = window;
function StateShell({
  ctx,
  eyebrow,
  title,
  children,
  back
}) {
  return /*#__PURE__*/React.createElement(Container, {
    style: {
      padding: "var(--space-5xl) var(--gutter-desktop) var(--space-section)",
      maxWidth: "760px",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, eyebrow), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.go(back),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      font: "var(--type-mono-label)",
      letterSpacing: "var(--ls-mono-label)",
      textTransform: "uppercase",
      color: "var(--text-secondary)"
    }
  }, "Close")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-lg)",
      letterSpacing: "var(--ls-display-lg)"
    }
  }, title), children, /*#__PURE__*/React.createElement(Note, null, "A route-addressed full-screen page state, noindex. Auth lands here, never on the dashboard."));
}
function SignInInterstitial({
  ctx
}) {
  const next = ctx.route.next || {
    name: "discover"
  };
  const labels = {
    "action.save": "save this project to a list",
    "action.interest": "register interest",
    "action.nominate": "nominate this project"
  };
  const scoped = labels[next.name];
  return /*#__PURE__*/React.createElement(StateShell, {
    ctx: ctx,
    eyebrow: "Sign in",
    title: scoped ? "Sign in to " + scoped : "Sign in to notavibe",
    back: next.name === "signin" ? {
      name: "discover"
    } : next
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-lg)",
      letterSpacing: "var(--ls-body-lg)",
      color: "var(--text-secondary)"
    }
  }, scoped ? "You were doing something specific, so this is scoped to that action — finishing it brings you straight back." : "One account, both roles."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "github",
      size: 16,
      strokeColor: "#fff"
    }),
    onClick: () => {
      ctx.signIn();
      ctx.go(next);
    }
  }, "Continue with GitHub"), /*#__PURE__*/React.createElement(TextInput, {
    label: "Or email",
    name: "email",
    placeholder: "you@example.com"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    fullWidth: true,
    onClick: () => {
      ctx.signIn();
      ctx.go(next);
    }
  }, "Email me a link")), /*#__PURE__*/React.createElement(Note, null, "The action stays visible and enabled while logged out. Activating it is what opens this."));
}
function SaveToList({
  ctx
}) {
  const p = window.findProject(ctx.route.slug);
  const [creating, setCreating] = React.useState(false);
  const [title, setTitle] = React.useState("");
  if (!ctx.signedIn) return /*#__PURE__*/React.createElement(SignInInterstitial, {
    ctx: {
      ...ctx,
      route: {
        name: "signin",
        next: ctx.route
      }
    }
  });
  return /*#__PURE__*/React.createElement(StateShell, {
    ctx: ctx,
    eyebrow: "Save to list",
    title: "Save " + p.name + " to a list",
    back: {
      name: "project",
      slug: p.slug
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)"
    }
  }, ctx.lists.map(l => {
    const on = l.items.includes(p.slug);
    return /*#__PURE__*/React.createElement("button", {
      key: l.id,
      onClick: () => ctx.toggleInList(l.id, p.slug),
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-md)",
        border: "var(--border-level-1)",
        background: "var(--surface-canvas)",
        borderRadius: "var(--radius-sm)",
        padding: "var(--space-lg)",
        cursor: "pointer",
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "2px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-body-md-strong)",
        letterSpacing: "var(--ls-body-md)"
      }
    }, l.title), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-mono-caption)",
        letterSpacing: "var(--ls-mono-caption)",
        textTransform: "uppercase",
        color: "var(--text-secondary)"
      }
    }, l.visibility, " \xB7 ", l.items.length, " items")), /*#__PURE__*/React.createElement(Badge, {
      tone: on ? "neutral" : "outline",
      mono: true
    }, on ? "In this list" : "Add"));
  })), creating ? /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      if (title.trim()) {
        ctx.createList(title.trim(), p.slug);
        setTitle("");
        setCreating(false);
      }
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    label: "New list title",
    value: title,
    onChange: e => setTitle(e.target.value),
    placeholder: "Things I would miss"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--inline-gap)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Create and add"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => setCreating(false)
  }, "Cancel"))) : /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => setCreating(true)
  }, "New list"), /*#__PURE__*/React.createElement(Note, null, "Lists carry no ratings and no scores \u2014 a curated list is not a review."));
}
function RegisterInterest({
  ctx
}) {
  const p = window.findProject(ctx.route.slug);
  const system = ctx.route.system || "subscriptions";
  const state = ctx.claimState(p.slug);
  const claimed = state === "active" || state === "lapsed";
  const on = ctx.hasInterest(p.slug, system);
  if (!ctx.signedIn) return /*#__PURE__*/React.createElement(SignInInterstitial, {
    ctx: {
      ...ctx,
      route: {
        name: "signin",
        next: ctx.route
      }
    }
  });
  const label = {
    subscriptions: "Subscriptions and tiers",
    bounties: "Bounties and escrow"
  }[system];
  return /*#__PURE__*/React.createElement(StateShell, {
    ctx: ctx,
    eyebrow: "Register interest",
    title: label,
    back: {
      name: "project",
      slug: p.slug
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-lg)",
      letterSpacing: "var(--ls-body-lg)"
    }
  }, claimed ? "I’d fund this" : "Would you fund this? No maintainer has claimed this page yet — we’ll tell them if they do."), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "What is recorded"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "Your account, this project, this system, and a timestamp. Nothing else."), /*#__PURE__*/React.createElement(Note, null, "Consent basis: the account-holder relationship. It carries no marketing permission \u2014 registering interest subscribes you to nothing. The aggregate is held against the numeric repository ID, never a person.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--inline-gap)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => {
      ctx.toggleInterest(p.slug, system);
      ctx.go({
        name: "project",
        slug: p.slug
      });
    }
  }, on ? "Withdraw" : "Register interest"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => ctx.go({
      name: "project",
      slug: p.slug
    })
  }, "Back to the page")), !claimed ? /*#__PURE__*/React.createElement(Note, null, "No date and no price appears anywhere in this flow, and there is no form to fill \u2014 the system it points at does not exist yet.") : null);
}
function Nominate({
  ctx
}) {
  const [sent, setSent] = React.useState(false);
  const [value, setValue] = React.useState(ctx.route.slug || "");
  if (!ctx.signedIn) return /*#__PURE__*/React.createElement(SignInInterstitial, {
    ctx: {
      ...ctx,
      route: {
        name: "signin",
        next: ctx.route
      }
    }
  });
  const back = ctx.route.from || {
    name: "search"
  };
  return /*#__PURE__*/React.createElement(StateShell, {
    ctx: ctx,
    eyebrow: "Nominate",
    title: "Nominate a project for the catalog",
    back: back
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 24
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-lg)",
      letterSpacing: "var(--ls-body-lg)"
    }
  }, "Nomination filed."), /*#__PURE__*/React.createElement(Note, null, "You\u2019ll be notified when its page is published \u2014 generated or claimed \u2014 again if it later goes Active, or at 90 days."), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => ctx.go(back)
  }, "Done")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    label: "Repository",
    name: "repo",
    value: value,
    onChange: e => setValue(e.target.value),
    placeholder: "owner/repo",
    required: true,
    hint: "Nominate is a state of the scan-result and search surfaces \u2014 it fires where no project page exists by definition."
  }), /*#__PURE__*/React.createElement(TextInput, {
    label: "Why it belongs",
    name: "why",
    multiline: true,
    rows: 3,
    placeholder: "What it does that the catalog is missing."
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg"
  }, "File nomination")));
}
Object.assign(window, {
  SignInInterstitial,
  SaveToList,
  RegisterInterest,
  Nominate,
  StateShell
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/notavibe/ActionStates.jsx", error: String((e && e.message) || e) }); }

// prototypes/notavibe/Admin.jsx
try { (() => {
const {
  Button,
  Badge,
  Eyebrow,
  Icon,
  TextInput
} = window.TogetherAIDesignSystem_eaf923;
const {
  Band,
  Held,
  Note,
  SectionTitle
} = window;
function AdminShell({
  title,
  sub,
  children,
  actions
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)",
      padding: "var(--space-2xl)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "var(--space-lg)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-xs)"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-md)",
      letterSpacing: "var(--ls-display-md)"
    }
  }, title), sub ? /*#__PURE__*/React.createElement(Note, null, sub) : null), actions), children);
}
function Table({
  columns,
  rows,
  renderCell
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: "var(--surface-soft)"
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c,
    style: {
      textAlign: "left",
      font: "var(--type-mono-eyebrow)",
      letterSpacing: "var(--ls-mono-eyebrow)",
      textTransform: "uppercase",
      color: "var(--text-secondary)",
      padding: "var(--space-sm) var(--space-md)",
      fontWeight: 500,
      whiteSpace: "nowrap"
    }
  }, c)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: r.id || i,
    style: {
      borderTop: "var(--border-level-1)"
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c,
    style: {
      padding: "var(--space-sm) var(--space-md)",
      font: "var(--type-caption)",
      verticalAlign: "middle"
    }
  }, renderCell(r, c))))))));
}

/* ── 11.4 Page corrections and takedowns — three lanes ────────── */

const SEED_REQUESTS = [{
  id: "PR-1042",
  type: "suppression",
  basis: "own-behalf",
  subject: "nodejs/undici",
  repoId: "4128907",
  proof: "GitHub admin — verified",
  age: "auto-actioned",
  state: "Granted",
  address: "m…@…"
}, {
  id: "PR-1043",
  type: "suppression",
  basis: "third-party-objection",
  subject: "egoist/tsup",
  repoId: "3390118",
  proof: "Unproven",
  age: "9h",
  state: "Open",
  address: "legal@…"
}, {
  id: "PR-1044",
  type: "lift",
  basis: "own-behalf",
  subject: "nodejs/undici",
  repoId: "4128907",
  proof: "Original requester",
  age: "2h",
  state: "Open",
  address: "m…@…"
}, {
  id: "PR-1045",
  type: "correction",
  basis: "own-behalf",
  subject: "kysely-org/kysely",
  repoId: "5510023",
  proof: "n/a",
  age: "31h",
  state: "Open",
  address: "r…@…"
}, {
  id: "PR-1046",
  type: "correction",
  basis: "third-party-objection",
  subject: "biomejs/biome",
  repoId: "6120774",
  proof: "n/a",
  age: "4d",
  state: "Open",
  address: "—"
}];
function AdminCorrections({
  ctx
}) {
  const [lane, setLane] = React.useState("suppression");
  const [rows, setRows] = React.useState(SEED_REQUESTS.concat(ctx.requests.map((r, i) => ({
    id: "PR-2" + String(100 + i),
    type: r.type,
    basis: r.basis,
    subject: r.slug,
    repoId: "4128907",
    proof: r.proof ? "GitHub admin — verified" : "Unproven",
    age: "just now",
    state: "Open",
    address: r.address || "—"
  }))));
  const shown = rows.filter(r => r.type === lane);
  const decide = (id, state) => setRows(rows.map(r => r.id === id ? {
    ...r,
    state
  } : r));
  const lanes = [["suppression", "Suppression requests"], ["lift", "Lift requests"], ["correction", "Factual corrections"]];
  const open = rows.filter(r => r.state === "Open").length;
  return /*#__PURE__*/React.createElement(AdminShell, {
    title: "Page corrections & takedowns",
    sub: "Three lanes matching PageRequest\u2019s three types. A direct cost of the generation strategy, staffed as such.",
    actions: /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral",
      mono: true
    }, open, " open")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-xs)",
      flexWrap: "wrap"
    }
  }, lanes.map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setLane(k),
    style: {
      border: "1px solid var(--border-input)",
      background: lane === k ? "var(--primary)" : "var(--surface-canvas)",
      color: lane === k ? "var(--on-primary)" : "var(--text-body)",
      borderRadius: "var(--radius-xs)",
      padding: "var(--space-sm) var(--space-md)",
      font: "var(--type-mono-label)",
      letterSpacing: "var(--ls-mono-label)",
      textTransform: "uppercase",
      cursor: "pointer"
    }
  }, l, " (", rows.filter(r => r.type === k).length, ")"))), /*#__PURE__*/React.createElement(Table, {
    columns: ["Request", "Basis", "Subject", "Repo ID", "Proof", "Age", "State", "Action"],
    rows: shown,
    renderCell: (r, c) => {
      if (c === "Request") return /*#__PURE__*/React.createElement("span", {
        style: {
          font: "var(--type-mono-caption)"
        }
      }, r.id);
      if (c === "Basis") return /*#__PURE__*/React.createElement(Badge, {
        tone: "outline",
        mono: true
      }, r.basis);
      if (c === "Subject") return r.subject;
      if (c === "Repo ID") return /*#__PURE__*/React.createElement("span", {
        style: {
          font: "var(--type-mono-caption)",
          color: "var(--text-secondary)"
        }
      }, r.repoId);
      if (c === "Proof") return r.proof;
      if (c === "Age") return /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--text-secondary)"
        }
      }, r.age);
      if (c === "State") return /*#__PURE__*/React.createElement(Badge, {
        tone: r.state === "Open" ? "outline" : "neutral",
        mono: true
      }, r.state);
      return r.state === "Open" ? /*#__PURE__*/React.createElement("span", {
        style: {
          display: "flex",
          gap: "var(--space-xs)"
        }
      }, /*#__PURE__*/React.createElement(Button, {
        variant: "primary",
        onClick: () => {
          decide(r.id, r.type === "lift" ? "Lifted" : "Granted");
          if (r.type === "suppression") ctx.setClaimState(r.subject, "suppressed");
          if (r.type === "lift") ctx.setClaimState(r.subject, "generated");
        }
      }, "Grant"), /*#__PURE__*/React.createElement(Button, {
        variant: "outline",
        onClick: () => decide(r.id, "Declined")
      }, "Decline")) : /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--text-secondary)"
        }
      }, "Acknowledged");
    }
  }), lane === "suppression" ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Note, null, "Scope is re-checked at ruling, not only at intake \u2014 a request whose subject went Active while queued closes as out-of-scope with the same routing. Suppression is a destructive action and takes typed-name confirmation."), /*#__PURE__*/React.createElement(Note, null, "PR-1043 is a third-party objection against a claimed page: out of scope for MVP, routed to the legal contact rather than adjudicated here.")) : null, lane === "lift" ? /*#__PURE__*/React.createElement(Note, null, "A lift outcome rides the takedown-acknowledgement family. The requester address outlives the granted suppression precisely so this lane has an inlet.") : null, /*#__PURE__*/React.createElement(Held, {
    refs: "Open #10"
  }, "The ops rotation is HELD pending a volume estimate. The hire trigger is median resolution >48h or >10 open items for two consecutive weeks \u2014 and corrections, takedowns and vocabulary contests all count toward it."));
}

/* ── 11.6 Vocabulary contests — the second corrections queue ─── */

const SEED_VOCAB = [{
  id: "VC-231",
  subject: "honojs/hono",
  dim: "Maturity",
  inferred: "Mature",
  proposed: "Established",
  reporter: "anonymous",
  age: "6h",
  state: "Open"
}, {
  id: "VC-232",
  subject: "oxc-project/oxlint",
  dim: "Purpose",
  inferred: "Linter",
  proposed: "Linter · formatter",
  reporter: "signed-in Backer",
  age: "1d",
  state: "Open"
}, {
  id: "VC-233",
  subject: "drizzle-team/drizzle-orm",
  dim: "Maintenance model",
  inferred: "Company-backed",
  proposed: "Collective",
  reporter: "anonymous",
  age: "3d",
  state: "Open"
}, {
  id: "VC-234",
  subject: "TanStack/query",
  dim: "Integration",
  inferred: "React · Vue · Svelte",
  proposed: "React · Vue · Svelte · Solid",
  reporter: "anonymous",
  age: "5d",
  state: "Open"
}];
function AdminVocab({
  ctx
}) {
  const [rows, setRows] = React.useState(SEED_VOCAB);
  const decide = (id, state) => setRows(rows.map(r => r.id === id ? {
    ...r,
    state
  } : r));
  return /*#__PURE__*/React.createElement(AdminShell, {
    title: "Vocabulary contests",
    sub: "Inferred vocabulary on thousands of pages makes each one a moderated object. This is a second corrections queue and is counted as one in the ops plan.",
    actions: /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral",
      mono: true
    }, rows.filter(r => r.state === "Open").length, " open")
  }, /*#__PURE__*/React.createElement(Table, {
    columns: ["Contest", "Subject", "Dimension", "Inferred", "Proposed", "Reporter", "Age", "State", "Action"],
    rows: rows,
    renderCell: (r, c) => {
      if (c === "Contest") return /*#__PURE__*/React.createElement("span", {
        style: {
          font: "var(--type-mono-caption)"
        }
      }, r.id);
      if (c === "Subject") return r.subject;
      if (c === "Dimension") return r.dim;
      if (c === "Inferred") return /*#__PURE__*/React.createElement(Badge, {
        tone: "outline",
        mono: true
      }, r.inferred);
      if (c === "Proposed") return /*#__PURE__*/React.createElement(Badge, {
        tone: "neutral",
        mono: true
      }, r.proposed);
      if (c === "Reporter") return /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--text-secondary)"
        }
      }, r.reporter);
      if (c === "Age") return /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--text-secondary)"
        }
      }, r.age);
      if (c === "State") return /*#__PURE__*/React.createElement(Badge, {
        tone: r.state === "Open" ? "outline" : "neutral",
        mono: true
      }, r.state);
      return r.state === "Open" ? /*#__PURE__*/React.createElement("span", {
        style: {
          display: "flex",
          gap: "var(--space-xs)"
        }
      }, /*#__PURE__*/React.createElement(Button, {
        variant: "primary",
        onClick: () => decide(r.id, "Accepted")
      }, "Accept"), /*#__PURE__*/React.createElement(Button, {
        variant: "outline",
        onClick: () => decide(r.id, "Kept")
      }, "Keep")) : /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--text-secondary)"
        }
      }, "Closed");
    }
  }), /*#__PURE__*/React.createElement(Note, null, "The report control that feeds this queue sits on the vocabulary block of every page where vocabulary is inferred. A queue never launches without its inlet."), /*#__PURE__*/React.createElement(Note, null, "A claim also resolves the object: the maintainer\u2019s own vocabulary replaces the inferred value outright."));
}

/* ── 11.3 Catalog ingestion + 11.5 anomaly quarantine ─────────── */

function AdminIngestion({
  ctx
}) {
  const gh = ctx.ghDegraded;
  const sources = [{
    id: "npm registry",
    role: "Selection + updates signal",
    health: gh ? "Healthy" : "Healthy",
    success: "99.7%",
    staleness: "4h",
    quota: "72% headroom",
    fallback: "GitHub releases API"
  }, {
    id: "GitHub API",
    role: "Contribution breadth",
    health: gh ? "Degraded" : "Healthy",
    success: gh ? "31%" : "99.1%",
    staleness: gh ? "26h" : "9h",
    quota: gh ? "rate-limited" : "48% headroom",
    fallback: "HELD"
  }, {
    id: "GitHub issues API",
    role: "Response substance",
    health: gh ? "Degraded" : "Healthy",
    success: gh ? "28%" : "98.4%",
    staleness: gh ? "26h" : "11h",
    quota: gh ? "rate-limited" : "44% headroom",
    fallback: "HELD"
  }, {
    id: "npm / ecosyste.ms",
    role: "Dependents",
    health: "Healthy",
    success: "99.9%",
    staleness: "2h",
    quota: "81% headroom",
    fallback: "Libraries.io"
  }, {
    id: "OpenSSF Scorecard",
    role: "Security posture",
    health: "Healthy",
    success: "97.2%",
    staleness: "3d",
    quota: "n/a",
    fallback: "Own checks"
  }];
  const anomalies = [{
    id: "AQ-88",
    subject: "changesets/changesets",
    signal: "Maintenance rhythm",
    delta: "Steady → Quiet in one cycle",
    state: "Quarantined · day 3 of 7",
    suppressed: false
  }, {
    id: "AQ-89",
    subject: "honojs/hono",
    signal: "Contribution breadth",
    delta: "Broad → Insufficient data",
    state: gh ? "Flag suppressed — source known-degraded" : "Quarantined · day 1 of 7",
    suppressed: gh
  }];
  return /*#__PURE__*/React.createElement(AdminShell, {
    title: "Catalog ingestion",
    sub: "The screen that tells an operator whether the catalog is telling the truth.",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: gh ? "primary" : "outline",
      onClick: ctx.toggleGh
    }, gh ? "Clear the simulated outage" : "Simulate a GitHub outage")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "var(--space-md)"
    }
  }, [["Catalog size", "8,412 pages"], ["Refresh-queue depth", gh ? "11,908" : "1,204"], ["Admission rate", "6.1% of scanned repos"], ["Dedup conflicts", "3 awaiting a call"]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-xs)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    size: "caption"
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-display-md)",
      letterSpacing: "var(--ls-display-md)"
    }
  }, v)))), /*#__PURE__*/React.createElement(SectionTitle, null, "Source health"), /*#__PURE__*/React.createElement(Table, {
    columns: ["Source", "Feeds", "Health", "Fetch success", "Staleness", "Quota", "Fallback"],
    rows: sources,
    renderCell: (r, c) => {
      if (c === "Source") return /*#__PURE__*/React.createElement("span", {
        style: {
          font: "var(--type-body-md-strong)",
          letterSpacing: "var(--ls-body-md)"
        }
      }, r.id);
      if (c === "Feeds") return /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--text-secondary)"
        }
      }, r.role);
      if (c === "Health") return /*#__PURE__*/React.createElement(Badge, {
        tone: r.health === "Healthy" ? "neutral" : "outline",
        mono: true
      }, r.health);
      if (c === "Fetch success") return r.success;
      if (c === "Staleness") return r.staleness;
      if (c === "Quota") return /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--text-secondary)"
        }
      }, r.quota);
      return r.fallback === "HELD" ? /*#__PURE__*/React.createElement("span", {
        style: {
          font: "var(--type-mono-caption)",
          letterSpacing: "var(--ls-mono-caption)",
          color: "var(--accent-magenta)",
          textTransform: "uppercase"
        }
      }, "Held \u2014 none") : /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--text-secondary)"
        }
      }, r.fallback);
    }
  }), /*#__PURE__*/React.createElement(Held, {
    refs: "Open #9"
  }, "No health signal may hard-depend on a single provider, yet GitHub is sole provider for two of five \u2014 one of them ruled above the fold. Writing a fallback would mean inventing facts about third-party APIs, so it is held with markers rather than asserted. Released by a research pass."), /*#__PURE__*/React.createElement(Note, null, "GraphQL batching ships at MVP, not as a growth lever. Per-source rate budgets, backoff, and a refresh queue that degrades gracefully."), /*#__PURE__*/React.createElement(SectionTitle, null, "Anomaly quarantine \xB7 7-day window"), /*#__PURE__*/React.createElement(Table, {
    columns: ["Flag", "Subject", "Signal", "Change", "State"],
    rows: anomalies,
    renderCell: (r, c) => {
      if (c === "Flag") return /*#__PURE__*/React.createElement("span", {
        style: {
          font: "var(--type-mono-caption)"
        }
      }, r.id);
      if (c === "Subject") return r.subject;
      if (c === "Signal") return r.signal;
      if (c === "Change") return /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--text-secondary)"
        }
      }, r.delta);
      return /*#__PURE__*/React.createElement(Badge, {
        tone: r.suppressed ? "neutral" : "outline",
        mono: true
      }, r.state);
    }
  }), /*#__PURE__*/React.createElement(Note, null, "A degraded refresh and an anomaly must be distinguishable. Quarantine reads the source-health state above and suppresses anomaly flags for signals whose source is known-degraded \u2014 otherwise every provider incident becomes a quarantine event."), /*#__PURE__*/React.createElement(SectionTitle, null, "Selection floor"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)"
    }
  }, /*#__PURE__*/React.createElement(Note, null, "The wedge is JS/TS tooling. Entry criteria are a floor on the same signals that rank, published on the methodology page. ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500,
      color: "var(--text-body)"
    }
  }, "The suppression check runs first"), ", before any other criterion: selection reads the Suppressed state keyed to the numeric repository ID and excludes the repository outright. The same key is re-read at refresh."), /*#__PURE__*/React.createElement(Held, {
    refs: "Open #6"
  }, "Selection is a ranking decision wearing an ingestion decision\u2019s clothes, and belongs to decision #5.")));
}

/* ── the remaining admin screens, honestly thin ───────────────── */

function AdminStub({
  title,
  sub,
  bullets
}) {
  return /*#__PURE__*/React.createElement(AdminShell, {
    title: title,
    sub: sub
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px dashed var(--border-hairline)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Specified, not drawn in this pass"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: "1.1em",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)",
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)",
      color: "var(--text-secondary)"
    }
  }, bullets.map(b => /*#__PURE__*/React.createElement("li", {
    key: b
  }, b)))));
}
const ADMIN_STUBS = {
  "admin.contests": {
    title: "Claim contest queue",
    sub: "One of the two adjudication types. 72-hour SLA.",
    bullets: ["Queue with SLA countdown, assignment and outcome.", "Counterparty surface lives in the maintainer portal — both parties file evidence and read the ruling there.", "Revoke-and-reset is the only remedy; no forced transfer."]
  },
  "admin.nominations": {
    title: "Nomination inbox",
    sub: "Nominations from search and scan-result surfaces.",
    bullets: ["Nominators are notified when a page is published — generated or claimed — again if it later goes Active, or at 90 days."]
  },
  "admin.taxonomy": {
    title: "Taxonomy & categories",
    sub: "At thousands, category assignment is automatic with staff correcting it.",
    bullets: ["A correction surface, not an assignment surface — the same inversion editorial and vocabulary undergo."]
  },
  "admin.anomaly": {
    title: "Anomaly quarantine",
    sub: "Lives inside Catalog ingestion in this prototype.",
    bullets: ["7-day window carried.", "Flags suppressed for signals whose source is known-degraded."]
  },
  "admin.sybil": {
    title: "Sybil detection",
    sub: "Pointed at the interest register.",
    bullets: ["An account is free, and the party with the strongest motive to inflate the count is the maintainer whose page displays it.", "Account-age floors and rate limits. Alex owns detection.", "The count is not a decision input until it clears."]
  },
  "admin.moderation": {
    title: "Project moderation",
    sub: "Where recommendation reports route.",
    bullets: ["Peer recommendations are display-only and never feed ranking; reports land here."]
  },
  "admin.audit": {
    title: "Audit log",
    sub: "Every destructive action, with the operator and the typed confirmation.",
    bullets: ["Suppression is a destructive action."]
  },
  "admin.users": {
    title: "User lookup",
    sub: "Accounts, roles and claim bindings.",
    bullets: ["Dual role is universal in this version — every maintainer starts as a visitor and a Backer."]
  },
  "admin.editorial": {
    title: "Editorial tools",
    sub: "Founding-team curation, named authors, visible dates.",
    bullets: ["Unpurchasable, staff-awarded. Monthly floor carried as a floor, not as coverage.", "Category editorial is what the front-door module draws from until the claimed set can sustain project features.", "A feature may name claimed projects and may not name unclaimed ones — tested at render, not at publication.", "An editorially-curated list published here is the only list a platform campaign may target."]
  },
  "admin.demand": {
    title: "Demand signals",
    sub: "The interest register and the organisation waitlist.",
    bullets: ["DemandSignal: account, project, foreshadowed system, timestamp.", "OrgInterest: company, stack size, contact, timestamp — no project referent, so it aggregates into no maintainer’s analytics.", "HELD: the threshold that answers “build payments next” is unset (open call #3). An apparatus with no decision rule measures nothing."]
  },
  "admin.config": {
    title: "Config",
    sub: "Platform campaign credentials, consent version, schema version.",
    bullets: ["Integration types surviving: ads_meta, ads_google, GitHub.", "Platform campaigns may never target a project page — and never a generated-unclaimed one.", "Controllership is sole in this version."]
  }
};
function AdminScreen({
  ctx
}) {
  const name = ctx.route.name;
  if (name === "admin.corrections") return /*#__PURE__*/React.createElement(AdminCorrections, {
    ctx: ctx
  });
  if (name === "admin.vocab") return /*#__PURE__*/React.createElement(AdminVocab, {
    ctx: ctx
  });
  if (name === "admin.ingestion") return /*#__PURE__*/React.createElement(AdminIngestion, {
    ctx: ctx
  });
  const s = ADMIN_STUBS[name] || ADMIN_STUBS["admin.contests"];
  return /*#__PURE__*/React.createElement(AdminStub, s);
}
Object.assign(window, {
  AdminScreen,
  AdminCorrections,
  AdminVocab,
  AdminIngestion
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/notavibe/Admin.jsx", error: String((e && e.message) || e) }); }

// prototypes/notavibe/Claim.jsx
try { (() => {
const {
  Button,
  Badge,
  Eyebrow,
  Icon,
  Container,
  TextInput,
  CodeEditorMockup
} = window.TogetherAIDesignSystem_eaf923;
const {
  Held,
  Note,
  SectionTitle
} = window;
const STEPS = [{
  key: "signin",
  label: "Sign in with GitHub"
}, {
  key: "install",
  label: "Install the App on the repo"
}, {
  key: "check",
  label: "Permission check"
}, {
  key: "done",
  label: "Claimed"
}];
function StepRail({
  current
}) {
  const i = STEPS.findIndex(s => s.key === current);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-md)",
      flexWrap: "wrap"
    }
  }, STEPS.map((s, n) => {
    const on = n === i,
      past = n < i;
    return /*#__PURE__*/React.createElement("span", {
      key: s.key,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-sm)",
        border: "1px solid " + (on ? "var(--primary)" : "var(--border-hairline)"),
        background: past ? "var(--surface-soft)" : "var(--surface-canvas)",
        borderRadius: "var(--radius-sm)",
        padding: "var(--space-sm) var(--space-md)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-mono-caption)",
        letterSpacing: "var(--ls-mono-caption)",
        color: "var(--text-secondary)"
      }
    }, n + 1), /*#__PURE__*/React.createElement("span", {
      style: {
        font: on ? "var(--type-body-md-strong)" : "var(--type-body-md)",
        letterSpacing: "var(--ls-body-md)",
        color: on ? "var(--text-body)" : "var(--text-secondary)"
      }
    }, s.label));
  }));
}
function ClaimFlow({
  ctx
}) {
  const p = window.findProject(ctx.route.slug || ctx.focusSlug);
  const [step, setStep] = React.useState("signin");
  const [permission, setPermission] = React.useState("admin");
  const [contested, setContested] = React.useState(false);
  const shell = children => /*#__PURE__*/React.createElement(Container, {
    style: {
      padding: "var(--space-5xl) var(--gutter-desktop) var(--space-section)",
      maxWidth: "820px",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Claim a page"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-lg)",
      letterSpacing: "var(--ls-display-lg)"
    }
  }, p.owner, "/", p.repo), /*#__PURE__*/React.createElement(Note, null, "The page already exists. Claiming binds a human to it \u2014 it does not create it.")), /*#__PURE__*/React.createElement(StepRail, {
    current: step
  }), children);
  if (step === "signin") return shell(/*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Step 1"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "Sign in with GitHub so we can check your permission on this repository."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "github",
      size: 16,
      strokeColor: "#fff"
    }),
    onClick: () => {
      ctx.signIn();
      setStep("install");
    }
  }, "Continue with GitHub"))), /*#__PURE__*/React.createElement(Note, null, "A page below the selection floor, outside the wedge, or never reached can still be claimed \u2014 the floor bounds the catalog, not who may join. The self-serve entry lives on the marketing surface.")));
  if (step === "install") return shell(/*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Step 2 \xB7 GitHub App permissions"), /*#__PURE__*/React.createElement("table", {
    style: {
      borderCollapse: "collapse",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("tbody", null, [["Metadata", "Read"], ["Contents", "No access"], ["Issues", "No access"], ["Pull requests", "No access"], ["Actions", "No access"]].map(([k, v]) => /*#__PURE__*/React.createElement("tr", {
    key: k,
    style: {
      borderTop: "var(--border-level-1)"
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "var(--row-padding)",
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, k), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "var(--row-padding)",
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: v === "Read" ? "neutral" : "outline",
    mono: true
  }, v)))))), /*#__PURE__*/React.createElement(Note, null, "Metadata (read) only. No write access, ever."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => setStep("check")
  }, "Install on ", p.owner, "/", p.repo)))));
  if (step === "check") return shell(/*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(CodeEditorMockup, {
    filename: "under the installation token",
    code: "GET /repos/" + p.owner + "/" + p.repo + "/collaborators/raj/permission\n\n{ \"permission\": \"" + permission + "\" }\n\n# requires permission: admin"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-xs)",
      flexWrap: "wrap"
    }
  }, ["admin", "maintain", "write"].map(v => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => setPermission(v),
    style: {
      border: "1px solid var(--border-input)",
      background: permission === v ? "var(--primary)" : "var(--surface-canvas)",
      color: permission === v ? "var(--on-primary)" : "var(--text-body)",
      borderRadius: "var(--radius-xs)",
      padding: "var(--space-sm) var(--space-md)",
      font: "var(--type-mono-label)",
      letterSpacing: "var(--ls-mono-label)",
      textTransform: "uppercase",
      cursor: "pointer"
    }
  }, "Simulate: ", v)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setContested(!contested),
    style: {
      border: "1px solid var(--border-input)",
      background: contested ? "var(--primary)" : "var(--surface-canvas)",
      color: contested ? "var(--on-primary)" : "var(--text-body)",
      borderRadius: "var(--radius-xs)",
      padding: "var(--space-sm) var(--space-md)",
      font: "var(--type-mono-label)",
      letterSpacing: "var(--ls-mono-label)",
      textTransform: "uppercase",
      cursor: "pointer"
    }
  }, "Simulate: existing claim")), permission !== "admin" ? /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--primary)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Check failed"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "Your permission on this repository is ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500
    }
  }, permission), ". A claim requires ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500
    }
  }, "admin"), "."), /*#__PURE__*/React.createElement(Note, null, "A co-maintainer role is granted inside notavibe and accepted by the grantee \u2014 never auto-synced from GitHub. Ask the admin who holds this page to grant you one.")) : contested ? /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--primary)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "This page is already claimed"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "Another verified admin claimed it first. You can open a contest."), /*#__PURE__*/React.createElement(Note, null, "First verified claim wins. Contests ride the 72-hour SLA; revoke-and-reset is the only remedy; no forced transfer; the page stays live during review."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => ctx.go({
      name: "maintainer.contest"
    })
  }, "File a contest with evidence"))) : /*#__PURE__*/React.createElement("div", {
    style: {
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Check passed"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "Numeric repository and owner IDs stored with a slug snapshot. The identity anchor is the repository ID, not the slug."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => {
      ctx.setClaimState(p.slug, "active");
      setStep("done");
    }
  }, "Claim ", p.owner, "/", p.repo)))));
  return shell(/*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 24
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--type-display-md)",
      letterSpacing: "var(--ls-display-md)"
    }
  }, "Claimed. The page transitioned generated-unclaimed \u2192 Active."), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: "1.1em",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)",
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, /*#__PURE__*/React.createElement("li", null, "The verification indicator now reads \u201CMaintainer verified via GitHub\u201D with the bound ", p.owner, "/", p.repo, "."), /*#__PURE__*/React.createElement("li", null, "Inferred vocabulary is replaced by yours \u2014 maintainer-first as a precedence rule."), /*#__PURE__*/React.createElement("li", null, "Commerce descriptions and the editorial verdict now render below the fold."), /*#__PURE__*/React.createElement("li", null, "The interest register you had no access to is now on your dashboard, as an aggregate.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--inline-gap)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => ctx.go({
      name: "maintainer.dashboard"
    })
  }, "Open the dashboard"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => ctx.go({
      name: "project",
      slug: p.slug
    })
  }, "View the page"))), /*#__PURE__*/React.createElement(Note, null, "Webhooks fired: claim.state_changed, project.verification_changed. Repo rename or transfer re-derives the slug with a 301; owner rename is caught by the weekly full_name reconciliation poll.")));
}
Object.assign(window, {
  ClaimFlow
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/notavibe/Claim.jsx", error: String((e && e.message) || e) }); }

// prototypes/notavibe/Maintainer.jsx
try { (() => {
const {
  Button,
  Badge,
  Eyebrow,
  Icon,
  Container,
  TextInput,
  StatsCard,
  CodeEditorMockup
} = window.TogetherAIDesignSystem_eaf923;
const {
  Band,
  Held,
  Note,
  SectionTitle
} = window;
function MaintainerDashboard({
  ctx
}) {
  const p = window.findProject("vitest-dev/vitest");
  const state = ctx.claimState(p.slug);
  const lapsed = state === "lapsed";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3xl)",
      padding: "var(--space-3xl)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "var(--space-lg)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Maintainer \xB7 Maya"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-lg)",
      letterSpacing: "var(--ls-display-lg)"
    }
  }, p.owner, "/", p.repo)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-sm)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    size: "caption"
  }, "Project switcher"), /*#__PURE__*/React.createElement("select", {
    style: {
      border: "1px solid var(--border-input)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-sm) var(--space-md)",
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, /*#__PURE__*/React.createElement("option", null, p.owner, "/", p.repo), /*#__PURE__*/React.createElement("option", null, "unjs/unbuild")))), lapsed ? /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--primary)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Pending action \xB7 act by day 30"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "Re-verification is required. Uncured at day 30, this page becomes a dated catalog record and stays indexed."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => ctx.setClaimState(p.slug, "active")
  }, "Re-verify now")), /*#__PURE__*/React.createElement(Note, null, "Surfaced in-app as well as by email, because an act-by clock may never depend solely on email delivery. No payout freeze, no held accruals, no billing \u2014 those are foreshadowed.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    count: "across projects"
  }, "Pending actions"), /*#__PURE__*/React.createElement(Note, null, "Nothing needs you right now. This surface exists for three carried invariants: the default in-app notice posture, the delivery-failure fallback, and the 30-day cure clock.")), /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    count: "aggregate only"
  }, "Discovery analytics \u2014 the claim hook"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(StatsCard, {
    value: "3,180",
    label: "Discovery volume",
    caption: "Page views, 30 days."
  }), /*#__PURE__*/React.createElement(StatsCard, {
    value: "412",
    label: "Deck appearances",
    tint: "periwinkle",
    caption: "Times shown in a Your Deck."
  }), /*#__PURE__*/React.createElement(StatsCard, {
    value: window.maskNumber(p.listCount),
    label: "List membership",
    tint: "soft",
    caption: "Lists containing this project."
  }), /*#__PURE__*/React.createElement(StatsCard, {
    value: window.maskNumber(p.stackCount),
    label: "Stack membership",
    caption: "Scans that matched it."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Interest register"), [["Subscriptions and tiers", p.interest.subscriptions], ["Bounties and escrow", p.interest.bounties]].map(([l, n]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      borderTop: "var(--border-level-1)",
      paddingTop: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, l), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-display-md)",
      letterSpacing: "var(--ls-display-md)"
    }
  }, window.maskNumber(n)))), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--primary)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(Note, null, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500,
      color: "var(--text-body)"
    }
  }, "What this count means."), " \u201CI\u2019d fund this\u201D is not \u201CI will pay $5 a month.\u201D It is an expression of interest in a system that does not exist yet, from people who have committed nothing. It is never a revenue projection, implied or computed.")), /*#__PURE__*/React.createElement(Note, null, "Identities are never shown. No visitor-level data reaches a maintainer.")), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Where discovery came from"), [["Search engines", 46], ["Direct", 21], ["Your Deck", 18], ["Lists and stack pages", 9], ["Editorial", 6]].map(([l, n]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "4px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      font: "var(--type-caption)"
    }
  }, /*#__PURE__*/React.createElement("span", null, l), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)"
    }
  }, n, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: "6px",
      background: "var(--surface-soft)",
      borderRadius: "2px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: n + "%",
      height: "100%",
      background: "var(--primary)",
      borderRadius: "2px"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-lg)",
      borderTop: "var(--border-level-1)",
      paddingTop: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-caption)"
    }
  }, "Human 71%"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-caption)",
      color: "var(--text-secondary)"
    }
  }, "Crawler 29%")), /*#__PURE__*/React.createElement(Note, null, "Crawler and human traffic are split, not merged. Campaign traffic is absent from this panel by construction \u2014 the campaign wall."))), /*#__PURE__*/React.createElement(Note, null, "Data only the platform holds, costing no payment rail. This roll-up is the reason a maintainer claims a page at all.")), /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, "What is not here"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--chip-gap)",
      flexWrap: "wrap"
    }
  }, ["Tiers & pricing", "Subscribers", "Payouts", "Bounties inbox", "Bounty detail", "Epoch create", "Epoch results", "Gates", "Posts & artifacts", "Campaigns", "Campaign detail"].map(x => /*#__PURE__*/React.createElement(Badge, {
    key: x,
    tone: "outline",
    mono: true
  }, x))), /*#__PURE__*/React.createElement(Note, null, "No money surfaces of any kind. Maintainer campaigns are out too \u2014 a lightweight maintainer platform does not ship an ad panel.")));
}
function MaintainerProfile({
  ctx
}) {
  const p = window.findProject("vitest-dev/vitest");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)",
      padding: "var(--space-3xl)",
      maxWidth: "820px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Discovery presence \u2014 profile"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-lg)",
      letterSpacing: "var(--ls-display-lg)"
    }
  }, "Keep the page accurate"), /*#__PURE__*/React.createElement(TextInput, {
    label: "Answer-first summary",
    multiline: true,
    rows: 2,
    value: p.description,
    onChange: () => {},
    hint: "This sentence is what the AEO composition quotes. One sentence."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-lg)"
    }
  }, window.VOCAB_DIMENSIONS.map(d => /*#__PURE__*/React.createElement(TextInput, {
    key: d,
    label: d,
    value: p.vocab[d],
    onChange: () => {}
  }))), /*#__PURE__*/React.createElement(Note, null, "Your declared vocabulary replaces whatever the pipeline inferred. No maintainer-editable field feeds ranking \u2014 that is what keeps this surface from becoming a placement lever."), /*#__PURE__*/React.createElement(SectionTitle, null, "Peer recommendations you have authored"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "\u201CDoes the boring part of shipping a library correctly.\u201D"), /*#__PURE__*/React.createElement(Eyebrow, {
    size: "caption"
  }, "About unjs/unbuild \xB7 rendered on their page, attributed to yours")), /*#__PURE__*/React.createElement(Note, null, "Claimed projects only, in both directions. The attribution is the mechanism \u2014 the growth comes from your audience seeing it."));
}
function MaintainerReach({
  ctx
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)",
      padding: "var(--space-3xl)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Discovery presence \u2014 reach"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-lg)",
      letterSpacing: "var(--ls-display-lg)"
    }
  }, "Who discovered you"), /*#__PURE__*/React.createElement(Note, null, "Aggregate only, at day granularity. There is no visitor-level view here and never will be."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(StatsCard, {
    value: "3,180",
    label: "Discovery volume"
  }), /*#__PURE__*/React.createElement(StatsCard, {
    value: "412",
    label: "Deck appearances",
    tint: "periwinkle"
  }), /*#__PURE__*/React.createElement(StatsCard, {
    value: "29%",
    label: "Crawler share",
    tint: "soft"
  })));
}
function MaintainerContest({
  ctx
}) {
  const [filed, setFiled] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)",
      padding: "var(--space-3xl)",
      maxWidth: "820px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Claim contest \u2014 evidence & outcome"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-lg)",
      letterSpacing: "var(--ls-display-lg)"
    }
  }, "Contest on unjs/unbuild"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--inline-gap)",
      flexWrap: "wrap",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    mono: true
  }, "72-hour SLA"), /*#__PURE__*/React.createElement(Badge, {
    tone: "outline",
    mono: true
  }, "Page stays live during review")), filed ? /*#__PURE__*/React.createElement("div", {
    style: {
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 20
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "Evidence filed. Both parties file here and read the ruling here."), /*#__PURE__*/React.createElement(Note, null, "Revoke-and-reset is the only remedy \u2014 there is no forced transfer. Revoke-and-reset resets the contest, not the claim state.")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setFiled(true);
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    label: "Your evidence",
    multiline: true,
    rows: 4,
    placeholder: "Why the current claim is wrong, with links."
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg"
  }, "File evidence")), /*#__PURE__*/React.createElement(Note, null, "A queue with an SLA and no counterparty surface would invert the report-control rule. This is that surface."));
}
function MaintainerApi({
  ctx
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)",
      padding: "var(--space-3xl)",
      maxWidth: "900px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "API & webhooks"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-lg)",
      letterSpacing: "var(--ls-display-lg)"
    }
  }, "Read API, MCP and webhooks"), /*#__PURE__*/React.createElement(SectionTitle, null, "Webhook events"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)"
    }
  }, ["project.verification_changed", "claim.state_changed", "page.published", "page.suppressed"].map(e => /*#__PURE__*/React.createElement("div", {
    key: e,
    style: {
      display: "flex",
      justifyContent: "space-between",
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-md) var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono-caption)",
      letterSpacing: "var(--ls-mono-caption)"
    }
  }, e), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    mono: true
  }, "HMAC-signed")))), /*#__PURE__*/React.createElement(Note, null, "Retries and a delivery log. No subscribers endpoint \u2014 there are no subscribers, which discharges the held consent instrument."), /*#__PURE__*/React.createElement(SectionTitle, null, "Catalog MCP \xB7 read-only"), /*#__PURE__*/React.createElement(CodeEditorMockup, {
    filename: "tools",
    code: "search_projects\nget_project\ncompare_projects\nget_lists   # public lists only\n\n# suppressed projects are absent from every response\n# launches against schema v1"
  }), /*#__PURE__*/React.createElement(Note, null, "Registry-listed. Auth: none or API key. Tool descriptions are treated as a poisoning surface."));
}
function MaintainerSettings({
  ctx
}) {
  const p = window.findProject("vitest-dev/vitest");
  const [typed, setTyped] = React.useState("");
  const [retired, setRetired] = React.useState(ctx.claimState(p.slug) === "retired");
  const name = p.owner + "/" + p.repo;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)",
      padding: "var(--space-3xl)",
      maxWidth: "820px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Project settings"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-lg)",
      letterSpacing: "var(--ls-display-lg)"
    }
  }, "Exits"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Voluntary retirement \xB7 the default"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "The page becomes a dated catalog record and stays indexed. Dated facts survive frozen; live relationships and interactive surfaces close."), /*#__PURE__*/React.createElement(TextInput, {
    label: "Type " + name + " to confirm",
    value: typed,
    onChange: e => setTyped(e.target.value),
    placeholder: name
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    disabled: typed !== name,
    onClick: () => {
      ctx.setClaimState(p.slug, "retired");
      setRetired(true);
    }
  }, "Retire this page"))), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)",
      opacity: retired ? 1 : 0.55
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Suppress the retired record"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "Also yours, because claiming was consent and consent is withdrawable. Nothing then renders on any surface."), /*#__PURE__*/React.createElement(Note, null, retired ? "Edge 4 — requires proving repository admin now. Writes a PageRequest (type: suppression, basis: own-behalf) so the lift trigger exists." : "Available once the page is retired. An Active page is never suppressed while claimed."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    disabled: !retired,
    onClick: () => ctx.go({
      name: "suppress.start",
      slug: p.slug
    })
  }, "Request suppression"))), /*#__PURE__*/React.createElement(Note, null, "Why the dated record yields here and not in the full-vision spec: no money flows in this version, so nothing was relied upon that the record protects."));
}
Object.assign(window, {
  MaintainerDashboard,
  MaintainerProfile,
  MaintainerReach,
  MaintainerContest,
  MaintainerApi,
  MaintainerSettings
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/notavibe/Maintainer.jsx", error: String((e && e.message) || e) }); }

// prototypes/notavibe/Mobile.jsx
try { (() => {
const {
  Button,
  Badge,
  Eyebrow,
  Icon
} = window.TogetherAIDesignSystem_eaf923;
const {
  Band,
  Held,
  Note,
  SectionTitle
} = window;
const FRAME_W = 360,
  FRAME_H = 780,
  HEADER_H = 52,
  TABBAR_H = 56;
const FOLD = FRAME_H - HEADER_H - TABBAR_H;

/* Narrow-viewport corrections for surfaces authored desktop-first. Scoped to the frame. */
const FRAME_CSS = `
.nv-mobile{--gutter-desktop:16px}
.nv-mobile [style*="repeat(3"],.nv-mobile [style*="repeat(2"]{grid-template-columns:1fr!important}
.nv-mobile [style*="grid-template-columns: 28px"]{grid-template-columns:1fr!important;gap:8px!important}
.nv-mobile table{table-layout:fixed;width:100%}
.nv-mobile td,.nv-mobile th{word-break:break-word}
.nv-mobile input,.nv-mobile textarea{max-width:100%}
.nv-mobile button,.nv-mobile a[role="button"]{min-height:44px}
`;
function DeviceFrame({
  children,
  label,
  fold
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "var(--surface-dark)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "var(--space-lg)",
      padding: "var(--space-3xl) var(--space-lg) var(--space-6xl)"
    }
  }, /*#__PURE__*/React.createElement("style", null, FRAME_CSS), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onDark"
  }, label), /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onDarkMuted",
    size: "caption"
  }, "360 \xD7 780 \xB7 the mandated narrow case")), /*#__PURE__*/React.createElement("div", {
    className: "nv-mobile",
    style: {
      position: "relative",
      width: FRAME_W + "px",
      height: FRAME_H + "px",
      background: "var(--surface-canvas)",
      border: "1px solid var(--border-hairline-dark)",
      borderRadius: "20px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      boxShadow: "var(--shadow-float)"
    }
  }, children), fold ? /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onDarkMuted",
    size: "caption"
  }, "The dashed rule inside the scroll is the fold at this height.") : null);
}
function FoldRule() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      top: FOLD + "px",
      borderTop: "1px dashed var(--accent-magenta)",
      pointerEvents: "none",
      display: "flex",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono-caption)",
      letterSpacing: "var(--ls-mono-caption)",
      textTransform: "uppercase",
      color: "var(--accent-magenta)",
      background: "var(--surface-canvas)",
      padding: "0 4px"
    }
  }, "fold"));
}
function MobileHeader({
  ctx,
  title,
  back
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      flex: "0 0 " + HEADER_H + "px",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-md)",
      padding: "0 var(--space-lg)",
      borderBottom: "var(--border-level-1)",
      background: "var(--surface-canvas)"
    }
  }, back ? /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.go(back),
    "aria-label": "Back",
    style: {
      background: "none",
      border: "none",
      padding: 0,
      cursor: "pointer",
      color: "var(--text-body)",
      font: "var(--type-body-lg)",
      minHeight: "44px",
      width: "24px",
      textAlign: "left"
    }
  }, "\u2190") : null, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      font: "var(--type-body-md-strong)",
      letterSpacing: "var(--ls-body-md)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, title || "notavibe"), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.go({
      name: "search"
    }),
    "aria-label": "Search",
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      minHeight: "44px",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 18,
    strokeColor: "var(--text-secondary)"
  })));
}
const TABS = [["Home", "backer.dashboard", "home"], ["Discover", "discover", "search"], ["My lists", "backer.lists", "bookmark"], ["My stack", "stack.connect", "layers"], ["More", "backer.more", "menu"]];
function MobileTabBar({
  ctx
}) {
  const active = name => ctx.route.name === name || name === "discover" && ["category", "project", "search"].includes(ctx.route.name) || name === "stack.connect" && ctx.route.name.startsWith("stack.") || name === "backer.lists" && ctx.route.name === "backer.list" || name === "backer.more" && ["backer.more", "backer.chat", "backer.settings", "backer.activity"].includes(ctx.route.name);
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      flex: "0 0 " + TABBAR_H + "px",
      display: "grid",
      gridTemplateColumns: "repeat(5,1fr)",
      borderTop: "var(--border-level-1)",
      background: "var(--surface-canvas)"
    }
  }, TABS.map(([label, name]) => {
    const on = active(name);
    return /*#__PURE__*/React.createElement("button", {
      key: name,
      onClick: () => ctx.go({
        name
      }),
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2px",
        minHeight: "44px",
        border: "none",
        background: "none",
        cursor: "pointer",
        padding: "0 2px",
        color: on ? "var(--text-body)" : "var(--text-secondary)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: "18px",
        height: "3px",
        borderRadius: "2px",
        background: on ? "var(--primary)" : "transparent"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-mono-caption)",
        letterSpacing: "var(--ls-mono-caption)",
        textTransform: "uppercase",
        fontSize: "9px",
        textAlign: "center",
        lineHeight: 1.2
      }
    }, label));
  }));
}

/* ── front door: every module collapsed at 360 (§5.5) ─────────── */

const MODULE_SUMMARY = {
  categories: "Six intents",
  deck: "8 this week",
  stack: "Scan a manifest",
  editorial: "One featured card",
  refine: "One entry, not two",
  shipweek: "Live now"
};
function CollapsedModule({
  id,
  ctx,
  open,
  onToggle
}) {
  const M = window.MODULES[id];
  if (!M) return null;
  if (id === "shipweek" && !window.SHIP_WEEK.live) return null;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      borderBottom: "var(--border-level-1)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onToggle,
    "aria-expanded": open,
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-md)",
      minHeight: "56px",
      padding: "var(--space-md) var(--space-lg)",
      background: "none",
      border: "none",
      cursor: "pointer",
      textAlign: "left",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      font: "var(--type-body-md-strong)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, window.MODULE_LABELS[id]), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono-caption)",
      letterSpacing: "var(--ls-mono-caption)",
      color: "var(--text-secondary)",
      whiteSpace: "nowrap"
    }
  }, MODULE_SUMMARY[id]), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)",
      transform: open ? "rotate(180deg)" : "none"
    }
  }, "\u2193")), open ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 var(--space-lg) var(--space-2xl)"
    }
  }, /*#__PURE__*/React.createElement(M, {
    ctx: ctx
  })) : null);
}
function MobileDiscover({
  ctx
}) {
  const [open, setOpen] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)",
      padding: "var(--space-2xl) var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Discover"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-md)",
      letterSpacing: "var(--ls-display-md)"
    }
  }, "Find the open-source projects your work already rests on")), ctx.moduleOrder.map(id => /*#__PURE__*/React.createElement(CollapsedModule, {
    key: id,
    id: id,
    ctx: ctx,
    open: open === id,
    onToggle: () => setOpen(open === id ? null : id)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-2xl) var(--space-lg)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Note, null, "Collapsed is the specified 360\xA0px default for all six, in the invariant order. One opens at a time here so the order stays legible; the spec fixes the order, not the expansion rule."), /*#__PURE__*/React.createElement(Held, {
    refs: "Open #6"
  }, "Ship Week is pinned above categories only while live, so the invariant order has two legal arrangements at 360 and the collapsed rail is where that reads most sharply.")));
}

/* ── project page: exactly four above the fold (§5.14) ────────── */

function MobileFourUp({
  project,
  state,
  ctx
}) {
  const dates = [["npm publish history", project.signals.updates.fetched], ["GitHub API", project.signals.breadth.fetched]];
  const gh = ctx.ghDegraded;
  const saved = ctx.isSaved(project.slug);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)",
      padding: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-md)",
      letterSpacing: "var(--ls-display-md)"
    }
  }, project.name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono-caption)",
      letterSpacing: "var(--ls-mono-caption)",
      color: "var(--text-secondary)"
    }
  }, project.owner, "/", project.repo), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex"
    }
  }, state === "generated" ? /*#__PURE__*/React.createElement(Badge, {
    tone: "outline",
    mono: true
  }, "No claim \u2014 unclaimed page") : state === "lapsed" ? /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    mono: true
  }, "Re-verifying") : state === "active" ? /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    mono: true
  }, "Maintainer verified via GitHub") : /*#__PURE__*/React.createElement(Badge, {
    tone: "outline",
    mono: true
  }, "Dated record"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)",
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-md)",
      background: state === "generated" ? "var(--surface-soft)" : "transparent"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, state === "generated" ? "Generated from public sources. Unclaimed — no maintainer has verified it." : state === "lapsed" ? "Claimed by a verified maintainer. Re-verification in progress." : state === "active" ? "Claimed and verified on " + project.verifiedAt + "." : "Dated catalog record. Facts frozen."), state === "generated" ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono-caption)",
      letterSpacing: "var(--ls-mono-caption)",
      color: "var(--text-secondary)"
    }
  }, dates.map(([s, d]) => s + " · " + d).join(" · ")) : null, state === "generated" ? /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    onClick: () => ctx.go({
      name: "claim.start",
      slug: project.slug
    })
  }, "Claim this page") : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-sm)"
    }
  }, [["Maintenance rhythm", project.signals.updates, false], ["Contribution breadth", project.signals.breadth, gh]].map(([label, s, degraded]) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-xs)",
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    size: "caption"
  }, label), /*#__PURE__*/React.createElement(Band, {
    value: degraded ? "Insufficient data" : s.band
  })))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    onClick: () => ctx.go({
      name: "action.save",
      slug: project.slug
    })
  }, saved ? "Saved to a list" : "Save to list"));
}
function MobileProject({
  ctx
}) {
  const project = window.findProject(ctx.route.slug || ctx.focusSlug) || window.PROJECTS[0];
  const state = ctx.claimState(project.slug);
  const [open, setOpen] = React.useState(null);
  if (state === "suppressed") {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "var(--space-3xl) var(--space-lg)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-lg)"
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "HTTP 404"), /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: 0,
        font: "var(--type-display-md)",
        letterSpacing: "var(--ls-display-md)"
      }
    }, "This page is not available"), /*#__PURE__*/React.createElement(Note, null, "Nothing is disclosed about why, or about whether a record ever existed here."), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      fullWidth: true,
      onClick: () => ctx.go({
        name: "discover"
      })
    }, "Back to discover"));
  }
  const claimed = state === "active" || state === "lapsed";
  const terminal = state === "retired" || state === "revoked";
  const sections = [[claimed ? "Foreshadow block" : "Pre-claim teaser and interest control", !terminal, () => /*#__PURE__*/React.createElement(window.InterestControl, {
    project: project,
    state: state,
    ctx: ctx
  })], ["Full health breakdown", true, () => /*#__PURE__*/React.createElement(window.HealthBreakdown, {
    project: project,
    ctx: ctx
  })], ["Provenance line with source dates", state === "generated", () => /*#__PURE__*/React.createElement(Note, null, "Generated from npm publish history, GitHub API, npm / ecosyste.ms and OpenSSF Scorecard.")], ["Vocabulary", true, () => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)"
    }
  }, window.VOCAB_DIMENSIONS.map(d => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    size: "caption"
  }, d), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-caption)",
      textAlign: "right"
    }
  }, project.vocab[d] || "—"))), project.inferred ? /*#__PURE__*/React.createElement(Badge, {
    tone: "outline",
    mono: true
  }, "Inferred by the pipeline") : null)]];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MobileFourUp, {
    project: project,
    state: state,
    ctx: ctx
  }), /*#__PURE__*/React.createElement(FoldRule, null), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "var(--border-level-1)",
      marginTop: "var(--space-2xl)"
    }
  }, sections.map(([label, present, body], i) => /*#__PURE__*/React.createElement("section", {
    key: label,
    style: {
      borderBottom: "var(--border-level-1)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(open === label ? null : label),
    "aria-expanded": open === label,
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-md)",
      minHeight: "56px",
      padding: "var(--space-md) var(--space-lg)",
      background: "none",
      border: "none",
      cursor: "pointer",
      textAlign: "left",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono-caption)",
      letterSpacing: "var(--ls-mono-caption)",
      color: "var(--text-secondary)",
      width: "12px"
    }
  }, i + 1), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, label), present ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)"
    }
  }, "\u2193") : /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono-caption)",
      color: "var(--text-secondary)",
      textTransform: "uppercase"
    }
  }, "closed")), open === label ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 var(--space-lg) var(--space-2xl)"
    }
  }, present ? body() : /*#__PURE__*/React.createElement(Note, null, terminal ? "Closes on a dated record." : "Claimed pages only.")) : null))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-2xl) var(--space-lg)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Note, null, "Four elements above the fold and no fifth. Consent chrome, when it renders, sits inside element 2 rather than becoming an element."), /*#__PURE__*/React.createElement(window.MachineReadablePanel, {
    project: project,
    state: state
  })));
}

/* ── admin has no mobile surface (§5.15) ──────────────────────── */

function MobileAdminRefusal({
  ctx
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-3xl) var(--space-lg)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "admin.notavibe.dev"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-md)",
      letterSpacing: "var(--ls-display-md)"
    }
  }, "Admin has no mobile surface"), /*#__PURE__*/React.createElement(Note, null, "Compact density, left nav, dark, desktop only \u2014 behind SSO and VPN on a separate deployment. This is a stated non-goal, not an unbuilt screen: adjudication queues are where a wrong tap publishes a page about a real person."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    onClick: () => ctx.go({
      name: "discover"
    })
  }, "Back to catalog"));
}
const MOBILE_SCREENS = {
  discover: MobileDiscover,
  project: MobileProject
};
const MOBILE_TITLES = {
  discover: "notavibe",
  search: "Search",
  category: "Category",
  "backer.lists": "My lists",
  "backer.activity": "Activity",
  "backer.dashboard": "Home",
  "backer.more": "More",
  "backer.chat": "Curation chat",
  "backer.settings": "Settings",
  "stack.connect": "My stack"
};
function MobileShell({
  ctx,
  Screen
}) {
  const isAdmin = ctx.route.name.startsWith("admin.");
  const M = MOBILE_SCREENS[ctx.route.name];
  const Body = isAdmin ? MobileAdminRefusal : M || Screen;
  const showTabs = !isAdmin;
  const back = ["project", "search", "category", "backer.list"].includes(ctx.route.name) ? {
    name: "discover"
  } : null;
  const focus = window.findProject(ctx.focusSlug);
  const title = ctx.route.name === "project" ? focus ? focus.name : "Project" : MOBILE_TITLES[ctx.route.name] || ctx.route.name.replace(/^[a-z]+\./, "").replace(/\./g, " ");
  return /*#__PURE__*/React.createElement(DeviceFrame, {
    label: isAdmin ? "Admin at 360 — refused by design" : "Backer / public at 360",
    fold: ctx.route.name === "project"
  }, /*#__PURE__*/React.createElement(MobileHeader, {
    ctx: ctx,
    title: title,
    back: back
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Body, {
    ctx: ctx
  })), showTabs ? /*#__PURE__*/React.createElement(MobileTabBar, {
    ctx: ctx
  }) : null);
}
Object.assign(window, {
  MobileShell,
  MobileDiscover,
  MobileProject,
  MobileTabBar,
  DeviceFrame
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/notavibe/Mobile.jsx", error: String((e && e.message) || e) }); }

// prototypes/notavibe/Suppression.jsx
try { (() => {
const {
  Button,
  Badge,
  Eyebrow,
  Icon,
  Container,
  TextInput
} = window.TogetherAIDesignSystem_eaf923;
const {
  Held,
  Note,
  SectionTitle
} = window;
function Row({
  k,
  v
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "180px 1fr",
      gap: "var(--space-lg)",
      borderTop: "var(--border-level-1)",
      padding: "var(--space-md) 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono-label)",
      letterSpacing: "var(--ls-mono-label)",
      textTransform: "uppercase",
      color: "var(--text-secondary)"
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, v));
}
function SuppressionFlow({
  ctx
}) {
  const p = window.findProject(ctx.route.slug || ctx.focusSlug);
  const initialType = ctx.route.type === "correction" ? "correction" : "suppression";
  const [step, setStep] = React.useState("intake");
  const [type, setType] = React.useState(initialType);
  const [basis, setBasis] = React.useState("own-behalf");
  const [address, setAddress] = React.useState("");
  const [detail, setDetail] = React.useState("");
  const [proof, setProof] = React.useState(false);
  const [wentActive, setWentActive] = React.useState(false);
  const subject = ctx.claimState(p.slug);
  const inScope = type !== "suppression" || subject === "generated" || subject === "retired";
  const routing = subject === "active" || subject === "lapsed" ? basis === "own-behalf" ? "voluntary-retirement" : "legal" : subject === "revoked" ? "never" : null;
  const shell = children => /*#__PURE__*/React.createElement(Container, {
    style: {
      padding: "var(--space-5xl) var(--gutter-desktop) var(--space-section)",
      maxWidth: "820px",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Page request \xB7 no account needed"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-lg)",
      letterSpacing: "var(--ls-display-lg)"
    }
  }, p.owner, "/", p.repo), /*#__PURE__*/React.createElement(Note, null, "Filed from this page, from the stable account-free request URL on the methodology page, or from Project settings on a retired project.")), children);
  if (step === "intake") return shell(/*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, "What are you asking for"), [["suppression", "Remove this page from the catalog"], ["correction", "Correct a factual error on this page"], ["lift", "Restore a page that was removed on my request"]].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setType(k),
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-md)",
      border: "1px solid " + (type === k ? "var(--primary)" : "var(--border-hairline)"),
      background: "var(--surface-canvas)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)",
      cursor: "pointer",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: type === k ? "var(--type-body-md-strong)" : "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, l)))), type === "suppression" ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, "On whose behalf"), [["own-behalf", "This is my project, or I control the repository"], ["third-party-objection", "I am objecting on other grounds — trademark, defamation, or a legal representative"]].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setBasis(k),
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-md)",
      border: "1px solid " + (basis === k ? "var(--primary)" : "var(--border-hairline)"),
      background: "var(--surface-canvas)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)",
      cursor: "pointer",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: basis === k ? "var(--type-body-md-strong)" : "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, l))), /*#__PURE__*/React.createElement(Note, null, "Open to anyone means anyone: a current admin, a former maintainer, an author whose repository moved, a legal representative, a trademark or defamation objection.")) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--primary)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Scope check \xB7 at intake"), /*#__PURE__*/React.createElement(Row, {
    k: "Subject state",
    v: window.CLAIM_STATES.find(s => s.key === subject).label
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Request type",
    v: type
  }), type === "suppression" ? /*#__PURE__*/React.createElement(Row, {
    k: "Basis",
    v: basis
  }) : null, /*#__PURE__*/React.createElement(Row, {
    k: "In scope",
    v: type !== "suppression" ? "Yes — corrections and lifts are always in scope" : inScope ? "Yes — suppression applies to generated-unclaimed and Retired pages" : "No"
  }), routing === "voluntary-retirement" ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)",
      background: "var(--surface-soft)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "An Active page is never suppressed while claimed. Because you claimed it, both exits are yours: retire the page first \u2014 which leaves a dated record \u2014 and you may then suppress that record."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => ctx.go({
      name: "maintainer.settings"
    })
  }, "Go to voluntary retirement")), /*#__PURE__*/React.createElement(Note, null, "Typed-name confirmation, no counterparty surface, no SLA \u2014 you act on your own page, so nobody is acted against. Edge 4 writes a PageRequest so the lift trigger exists for it.")) : null, routing === "legal" ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)",
      background: "var(--surface-soft)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "A third-party objection to a claimed page is out of scope for this version. It routes to the legal contact."), /*#__PURE__*/React.createElement(Held, {
    refs: "Open #11"
  }, "The route\u2019s shape is ruled; the named address is a founder fill. notavibe responds and does not adjudicate. No SLA."), /*#__PURE__*/React.createElement(Note, null, "Stated as the trade it is: a two-person rota does not adjudicate trademark in 72 hours, and a queue implying otherwise would be worse than none.")) : null, routing === "never" ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-soft)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "Never from Revoked \u2014 letting its subject suppress the record would erase an enforcement action.")) : null), inScope && !routing ? /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setStep(proof ? "auto" : "queued");
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    label: "Where we reply",
    value: address,
    onChange: e => setAddress(e.target.value),
    placeholder: "you@example.com",
    required: true,
    hint: "An address is captured as the sole purpose of this record. It outlives a granted suppression, because it is the lift trigger."
  }), /*#__PURE__*/React.createElement(TextInput, {
    label: "Anything we should know",
    multiline: true,
    rows: 3,
    value: detail,
    onChange: e => setDetail(e.target.value),
    placeholder: "Optional."
  }), subject === "retired" ? /*#__PURE__*/React.createElement(Note, null, "Edge 4 requires proving repository admin ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500
    }
  }, "now"), " \u2014 the guard is current control, not retirement cause.") : null, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      gap: "var(--space-md)",
      alignItems: "flex-start",
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: proof,
    onChange: e => setProof(e.target.checked),
    style: {
      marginTop: "3px",
      accentColor: "var(--primary)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-xs)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-md-strong)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "Prove repository admin via GitHub (optional)"), /*#__PURE__*/React.createElement(Note, null, "GitHub admin proof is an accelerator, not a gate. With it you are actioned automatically; without it a human actions it from the corrections and takedowns queue."))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    disabled: !address.trim()
  }, "File the request")) : null));
  if (step === "auto" || step === "queued") return shell(/*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "PageRequest filed"), /*#__PURE__*/React.createElement(Row, {
    k: "Type",
    v: type
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Basis",
    v: basis
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Subject repository ID",
    v: "4128907"
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Requester address",
    v: address || "—"
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Proof state",
    v: proof ? "GitHub admin — verified" : "Unproven — human ruling required"
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Outcome",
    v: "Pending"
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Retention bound",
    v: "Runs from the request\u2019s final outcome, lift included"
  }), /*#__PURE__*/React.createElement(Note, null, "The only record in this version holding an address belonging to a person with no account.")), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--primary)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Scope check \xB7 at ruling"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "Intake is a moment and the subject\u2019s state is not frozen at it. Scope is re-checked before the ruling lands."), /*#__PURE__*/React.createElement("button", {
    onClick: () => setWentActive(!wentActive),
    style: {
      alignSelf: "flex-start",
      border: "1px solid var(--border-input)",
      background: wentActive ? "var(--primary)" : "var(--surface-canvas)",
      color: wentActive ? "var(--on-primary)" : "var(--text-body)",
      borderRadius: "var(--radius-xs)",
      padding: "var(--space-sm) var(--space-md)",
      font: "var(--type-mono-label)",
      letterSpacing: "var(--ls-mono-label)",
      textTransform: "uppercase",
      cursor: "pointer"
    }
  }, "Simulate: subject went Active while queued"), wentActive ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-soft)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-lg)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "Closed as out-of-scope, with the same routing as at intake. There is no Active \u2192 Suppressed edge, and this is why."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => setStep("intake")
  }, "Back to intake"))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--inline-gap)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => {
      ctx.setClaimState(p.slug, "suppressed");
      ctx.fileRequest({
        slug: p.slug,
        type,
        basis,
        address,
        proof
      });
      setStep("granted");
    }
  }, proof ? "Auto-action now" : "Rule: grant (as Alex)"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => setStep("intake")
  }, "Cancel")))));
  return shell(/*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 24
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--type-display-md)",
      letterSpacing: "var(--ls-display-md)"
    }
  }, "Granted. Removal is catalog-level, not page-level."), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: "1.1em",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)",
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, /*#__PURE__*/React.createElement("li", null, "The page 404s and leaves the sitemap."), /*#__PURE__*/React.createElement("li", null, "Dropped from search, filters, categories, Your Deck and the front door."), /*#__PURE__*/React.createElement("li", null, "Removed from MCP responses, the read API, agent profiles and llms.txt."), /*#__PURE__*/React.createElement("li", null, "Excluded from alternatives and comparison generation."), /*#__PURE__*/React.createElement("li", null, "Dropped from the public rendering of every list; each list owner sees a private note that an item was removed on request \u2014 the project is not named."), /*#__PURE__*/React.createElement("li", null, "Survives re-ingestion: keyed to the numeric repository ID and re-read at selection and at refresh.")), /*#__PURE__*/React.createElement(Note, null, "Takedown acknowledgement sent to ", address || "the address on the request", " \u2014 stream (a), obligation basis, used once.")), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "var(--border-level-1)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Lift \xB7 edge 2"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "Suppression is liftable by its original requester, filed as a lift PageRequest through the account-free URL."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--inline-gap)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => {
      ctx.setClaimState(p.slug, "generated");
      ctx.go({
        name: "project",
        slug: p.slug
      });
    }
  }, "File a lift request and grant it"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => ctx.go({
      name: "project",
      slug: p.slug
    })
  }, "View the suppressed URL")), basis === "third-party-objection" ? /*#__PURE__*/React.createElement(Held, {
    refs: "Terminal"
  }, "Objection-caused suppression is terminal at MVP. A claim attempt on such a record is refused and routed to the legal contact \u2014 the alternative would be granting a remedy and handing its reversal to the party it was granted against.") : /*#__PURE__*/React.createElement(Note, null, "Edge 3 also exists: a verified claim lifts a suppression straight to Active, but only where the basis was own-behalf and the predecessor was generated-unclaimed. A suppression entered from Retired lifts only on its own requester\u2019s lift request."))));
}
function MethodologyPage({
  ctx
}) {
  const sections = [["Verification", "What “Maintainer verified via GitHub” means, and what it does not: it is structural, unpurchasable, and carries no ranking weight. Unclaimed is the absence of a claim, not a weaker claim."], ["The signal table, humanized", "Five signals, their sources, their fallbacks and their cadence. Two rows carry no fallback and say so."], ["What the bands mean", "Each band, its threshold, and why “insufficient data” is common rather than rare."], ["The governance formulas", "The voice-ballot credit formula, log-scaled, with a worked n² example — published because foreshadowing quadratic voting without its math is worse than not mentioning it."], ["The campaign wall", "Campaign traffic and campaign data never touch ranking, health signals, discovery weight, nominations or Your Deck — the house’s campaigns included."], ["How generated pages are made, and how to opt out", "The pipeline, the sources, the fetch cadence, and the stable account-free request URL."], ["How ranking works at catalog scale", "The published formula. No opaque composite; no maintainer-editable field feeds ranking."], ["Data handling", "What is collected, from whom, retention bounds, sub-processors, the server-only rule, the scan’s retention rule, and the consent record’s shape."]];
  return /*#__PURE__*/React.createElement(Container, {
    style: {
      padding: "var(--space-5xl) var(--gutter-desktop) var(--space-section)",
      maxWidth: "820px",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2xl)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Methodology"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-display-xl)",
      letterSpacing: "var(--ls-display-xl)"
    }
  }, "How the catalog works")), sections.map(([t, b]) => /*#__PURE__*/React.createElement("section", {
    key: t,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-sm)"
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)",
      color: "var(--text-secondary)"
    }
  }, b))), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--primary)",
      borderRadius: "var(--radius-sm)",
      padding: "var(--space-2xl)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Request a page be removed, corrected, or restored"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-md)",
      letterSpacing: "var(--ls-body-md)"
    }
  }, "A stable URL that needs no account, and outlives any page it concerns."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => ctx.go({
      name: "suppress.start",
      slug: ctx.focusSlug
    })
  }, "Open the request form")), /*#__PURE__*/React.createElement(Held, {
    refs: "Open #11"
  }, "The legal contact\u2019s named address is a founder fill. The commitment is honest and narrow: notavibe responds and does not adjudicate.")), /*#__PURE__*/React.createElement(Note, null, "The section Sam reads is \u201CData handling\u201D. He never logs in; this is the only surface he reads, and without it he has nothing to review \u2014 and he holds a veto."));
}
Object.assign(window, {
  SuppressionFlow,
  MethodologyPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/notavibe/Suppression.jsx", error: String((e && e.message) || e) }); }

})();

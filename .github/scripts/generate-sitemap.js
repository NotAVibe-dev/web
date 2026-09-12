/**
 * Generates frontend/sitemap.xml at deploy time.
 *
 * Built rather than committed, for the same reason the asset cache-busting is:
 * it is a pure function of the tree, so generating it makes it impossible for the
 * published sitemap to drift from the pages it describes.
 *
 * Two rules, both borrowed from the app repo's crawl-surface policy so that the
 * two sitemaps cannot contradict each other:
 *
 *   1. A page is listed unless it declares `noindex`. That keeps the sitemap and
 *      the robots meta tag from ever disagreeing, and it means the private
 *      preview excludes itself without anyone maintaining a deny-list.
 *   2. `lastmod` is the page's own last commit date — never wall-clock, and
 *      omitted entirely rather than fabricated when git cannot answer.
 *
 * A page's <loc> is its own `<link rel="canonical">` when it declares one, so the
 * sitemap cannot disagree with the canonical either.
 *
 * Run it locally the same way CI does: `node .github/scripts/generate-sitemap.js`
 *
 * The HTML is matched with regexes rather than parsed. That is deliberate: it
 * keeps the deploy free of an `npm install` for a job this small, and the inputs
 * are three static files in this repo rather than arbitrary documents.
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ORIGIN = "https://notavibe.dev";
const ROOT = "frontend";

const pages = fs
  .readdirSync(ROOT, { recursive: true })
  .map((p) => path.join(ROOT, p))
  .filter((p) => p.endsWith(".html"))
  .sort();

const urls = [];

for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");

  const robots = /<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i.exec(html);
  if (robots && /noindex/i.test(robots[1])) {
    console.log(`  skip  ${file} (noindex)`);
    continue;
  }

  const canonical = /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i.exec(html);
  const loc = canonical
    ? canonical[1]
    : ORIGIN + "/" + file.slice(ROOT.length + 1).replace(/(^|\/)index\.html$/, "$1");

  // Requires full history. A shallow checkout reports the deploy commit for every
  // file, which is a fabricated date wearing a real one's clothes — hence
  // fetch-depth: 0 on the checkout step.
  let lastmod = "";
  try {
    lastmod = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
      encoding: "utf8",
    }).trim();
  } catch {
    lastmod = "";
  }

  urls.push({ loc, lastmod });
  console.log(`  add   ${loc}${lastmod ? "  lastmod " + lastmod.slice(0, 10) : "  (no lastmod)"}`);
}

if (!urls.length) {
  console.error("no indexable pages found — refusing to write an empty sitemap");
  process.exit(1);
}

const body = urls
  .map(
    (u) =>
      "  <url>\n" +
      `    <loc>${u.loc}</loc>\n` +
      (u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : "") +
      "  </url>\n"
  )
  .join("");

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  body +
  "</urlset>\n";

const out = path.join(ROOT, "sitemap.xml");
fs.writeFileSync(out, xml);
console.log(`wrote ${out} with ${urls.length} url(s)`);

// Progressive enhancement for the homepage story. Dependency-free.
// The page is fully readable and complete without this file — it only adds the
// color-temperature arc and the count-up numbers. Everything degrades safely.

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// 1) Color-temperature arc.
// Sets --warmth on :root to the target of whichever act is centered in view.
// A CSS transition on the registered @property --warmth (see home.css) makes it
// smooth; the global reduced-motion rule zeroes that transition automatically,
// so this is safe to run for everyone (color, not movement). Without JS the page
// simply stays at the default warmth — still fully legible.
function initWarmth() {
  const root = document.documentElement;
  const acts = document.querySelectorAll('[data-warmth]');
  if (!acts.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const w = e.target.getAttribute('data-warmth');
        if (w != null) root.style.setProperty('--warmth', w);
      }
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  );
  acts.forEach((a) => io.observe(a));
}

// 2) Count-up numbers.
// The real, final value is already in the DOM (both textContent and data-count),
// so with no JS or under reduced motion the correct number is shown immediately.
function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length || reduce || !('IntersectionObserver' in window)) return;
  const fmt = new Intl.NumberFormat('en-US');
  const io = new IntersectionObserver(
    (entries, obs) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target;
        obs.unobserve(el);
        const target = parseInt(el.getAttribute('data-count'), 10);
        if (!Number.isFinite(target)) continue;
        const dur = 1400;
        const start = performance.now();
        const step = (now) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt.format(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(step);
        };
        el.textContent = fmt.format(0);
        requestAnimationFrame(step);
      }
    },
    { threshold: 0.6 }
  );
  els.forEach((el) => io.observe(el));
}

initWarmth();
initCounters();

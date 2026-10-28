// Run: node --test tests/project-count.test.js
const test = require("node:test");
const assert = require("node:assert/strict");
const { roundDownCount, countLabel } = require("../frontend/scripts/project-count.js");

test("rounds down: <1000 to 10s, >=1000 to 100s", () => {
  const cases = [
    [0, 0], [9, 0], [10, 10], [99, 90], [100, 100], [101, 100], [281, 280],
    [999, 990], [1000, 1000], [1001, 1000], [1004, 1000], [14, 10], [12345, 12300],
  ];
  for (const [p, want] of cases) assert.equal(roundDownCount(p), want, `projects=${p}`);
});

test("never shows more than the real count", () => {
  for (let p = 1; p <= 5000; p++) assert.ok(roundDownCount(p) <= p, `projects=${p}`);
});

test("no number below 10, or for 0, missing, negative or non-numeric values", () => {
  for (const p of [0, 3, 9, undefined, null, -5, NaN, Infinity, "300", {}]) {
    assert.equal(countLabel(p), "", `projects=${String(p)}`);
  }
});

test("label is N+ with commas and a trailing space", () => {
  assert.equal(countLabel(10), "10+ ");
  assert.equal(countLabel(14), "10+ ");
  assert.equal(countLabel(281), "280+ ");
  assert.equal(countLabel(1004), "1,000+ ");
  assert.equal(countLabel(12345), "12,300+ ");
});

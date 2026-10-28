// Run: node --test tests/project-count.test.js
const test = require("node:test");
const assert = require("node:assert/strict");
const { roundUpCount, countLabel } = require("../frontend/scripts/project-count.js");

test("rounds up: <100 to 10s, 100–999 to 100s, >=1000 to 1000s", () => {
  const cases = [
    [0, 0], [9, 10], [10, 10], [99, 100], [100, 100], [101, 200],
    [999, 1000], [1000, 1000], [1001, 2000],
    [14, 20], [281, 300], [300, 300], [1004, 2000],
  ];
  for (const [p, want] of cases) assert.equal(roundUpCount(p), want, `projects=${p}`);
});

test("no number for 0, missing, negative or non-numeric values", () => {
  for (const p of [0, undefined, null, -5, NaN, Infinity, "300", {}]) {
    assert.equal(countLabel(p), "", `projects=${String(p)}`);
  }
});

test("label is ~N with commas and a trailing space", () => {
  assert.equal(countLabel(9), "~10 ");
  assert.equal(countLabel(281), "~300 ");
  assert.equal(countLabel(1001), "~2,000 ");
  assert.equal(countLabel(12345), "~13,000 ");
});

// Run: node --test tests/project-count.test.js
const test = require("node:test");
const assert = require("node:assert/strict");
const { roundDownCount, countLabel } = require("../frontend/scripts/project-count.js");

test("rounds down: <1k to 10s, <10k to 100s, <1m to 1,000s, then to 100,000s", () => {
  const cases = [
    [0, 0], [9, 0], [10, 10], [14, 10], [99, 90], [100, 100], [101, 100], [281, 280],
    [999, 990], [1000, 1000], [1001, 1000], [1099, 1000], [1623, 1600], [9999, 9900],
    [10000, 10000], [12345, 12000], [999999, 999000], [1000000, 1000000],
    [1234567, 1200000], [2000000, 2000000], [12345678, 12300000],
  ];
  for (const [p, want] of cases) assert.equal(roundDownCount(p), want, `projects=${p}`);
});

test("never shows more than the real count", () => {
  for (let p = 1; p <= 20000; p++) assert.ok(roundDownCount(p) <= p, `projects=${p}`);
  for (const p of [99999, 100001, 999999, 1000001, 1999999, 98765432]) {
    assert.ok(roundDownCount(p) <= p, `projects=${p}`);
  }
});

test("no number below 10, or for 0, missing, negative or non-numeric values", () => {
  for (const p of [0, 3, 9, undefined, null, -5, NaN, Infinity, "300", {}]) {
    assert.equal(countLabel(p), "", `projects=${String(p)}`);
  }
});

test("label is N+, Nk+ or Nm+ with a trailing space and no .0", () => {
  const cases = [
    [10, "10+ "], [14, "10+ "], [281, "280+ "], [999, "990+ "],
    [1000, "1k+ "], [1099, "1k+ "], [1623, "1.6k+ "], [2000, "2k+ "], [9999, "9.9k+ "],
    [10000, "10k+ "], [12345, "12k+ "], [999999, "999k+ "],
    [1000000, "1m+ "], [1234567, "1.2m+ "], [2000000, "2m+ "], [12345678, "12.3m+ "],
  ];
  for (const [p, want] of cases) assert.equal(countLabel(p), want, `projects=${p}`);
});

test("one decimal at most, at every step from 1k to 10m", () => {
  for (let p = 1000; p < 1e7; p += 100) {
    assert.match(countLabel(p), /^\d+(\.\d)?[km]\+ $/, `projects=${p}`);
  }
});

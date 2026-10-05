import test from "node:test";
import assert from "node:assert/strict";
import { maskFractionalChangeRatios as mask } from "../scripts/lib/polarity-notation-audit.mjs";

const ratios = text => [...mask(text).matchAll(/\b[PE]\s*\/\s*[PE]\b/g)].map(m => m[0]);

test("fractional-change math is not a polarity inventory", () => {
  for (const text of ["$\\Delta E/E=1$", "$$\n\\Delta E/E=1\n$$", "\\(\\Delta P/P\\)", "\\[\\Delta E / E\\]"])
    assert.deepEqual(ratios(text), [], text);
});

test("real shorthand and ambiguous uses remain visible", () => {
  for (const text of ["P/E", "E/P", "$E/E$", "$P/P$", "$\\Delta E/P$", "\\Delta E/E", "$\\text{\\Delta E/E}$"])
    assert.equal(ratios(text).length, 1, text);
  assert.deepEqual(ratios("$\\Delta E/E$ and P/E; $\\Delta P/P + E/P$"), ["P/E", "E/P"]);
});

test("mask retains line numbers and offsets and leaves code alone", () => {
  const text = "before\n$$\n\\Delta E/E\n$$\nP/E";
  assert.equal(mask(text).length, text.length);
  assert.deepEqual(mask(text).split("\n").map(x => x.length), text.split("\n").map(x => x.length));
  assert.equal(mask(text).indexOf("P/E"), text.indexOf("P/E"));
  assert.equal(mask("`$\\Delta E/E$`"), "`$\\Delta E/E$`");
});

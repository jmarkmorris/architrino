import test from "node:test";
import assert from "node:assert/strict";
import { maskFractionalChangeRatios as mask } from "../scripts/lib/polarity-notation-audit.mjs";
import { maskNonPolarityNotation } from "../scripts/lib/polarity-notation-audit.mjs";

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

test("response-law comparisons and explicitly scalar enclosures are not inventories", () => {
  const text = "E/E+M ablation; scalar E/P enclosures; P/E inventory; E/P and E/E";
  const classified = maskNonPolarityNotation(text);
  assert.equal(classified.length, text.length);
  assert.deepEqual([...classified.matchAll(/\b[PE]\s*\/\s*[PE]\b/g)].map(m => m[0]), ["P/E", "E/P", "E/E"]);
  assert.equal(classified.indexOf("P/E"), text.indexOf("P/E"));
});

test("paired law gain inequalities require mathematical row-sum context", () => {
  for (const q of ["q_E", "q_{E}"]) {
    const text = `The row sum is $0.8<${q}<0.9$ and $q_{E+M}<0.8$. P/E remains invalid.`;
    const classified = maskNonPolarityNotation(text);
    assert(!classified.includes(q));
    assert(classified.includes("P/E"));
    assert.equal(classified.length, text.length);
  }
});

test("charge symbols and ambiguous gain mentions remain findings", () => {
  for (const text of [
    "$q_E<1$", "The row sum is $q_E<1$.",
    "The charge row sum is $q_E<1$ and $q_{E+M}<1$.",
    "The row sum is $q_E=1$ and $q_{E+M}<1$.",
    "The row sum is q_E<1 and $q_{E+M}<1$.",
    "The row sum is $q_E<1$.\n\nAnother paragraph has $q_{E+M}<1$.",
    "The row sum is $q_E<1$ and `$q_{E+M}<1$`.",
    "The row sum is $\\text{q_E<1}$ and $q_{E+M}<1$.",
  ]) assert(maskNonPolarityNotation(text).includes("q_E"), text);
});

test("gain context does not mask other notation or alter line offsets", () => {
  const text = "The row sum is\n$q_E<0.9$ and $q_{E+M}<0.8$; $q_P<1$ and E/P.\n\n$q_E<1$";
  const classified = maskNonPolarityNotation(text);
  assert(classified.includes("q_P"));
  assert(classified.endsWith("$q_E<1$"));
  assert.equal(classified.indexOf("E/P"), text.indexOf("E/P"));
  assert.deepEqual(classified.split("\n").map(s => s.length), text.split("\n").map(s => s.length));
});

import test from "node:test";
import assert from "node:assert/strict";
import { findTheoryAbbreviationCandidates as audit } from "../scripts/lib/theory-abbreviation-audit.mjs";

test("ordinary prose, inline code and standalone math names remain findings", () => {
  for (const text of ["A^3 theory", "A³ theory", "`A^3` theory", "$A^3$ theory", "$$A^3$$", "\\(A^3\\)"]) {
    assert.equal(audit(text).length, 1, text);
  }
});

test("defined function cubes in algebra are not theory abbreviations", () => {
  const definition = "Define\n$$\nA(t)=\\sum_m e^{-tm^2},\\quad B(t)=1.\n$$\n";
  assert.deepEqual(audit(definition + "$$\nA^3-B^3=C^3<1.\n$$"), []);
  assert.deepEqual(audit("$A=2$\n$A^3=8$"), []);
  assert.deepEqual(audit("\\[A(t)=2\\]\n\\[A^3-B^3=1\\]"), []);
  assert.deepEqual(audit("\\(A=2\\)\n\\(A³=8\\)"), []);
});

test("definition is required and does not excuse subsequent branding", () => {
  assert.equal(audit("$$A^3-B^3=C^3$$").length, 1);
  assert.equal(audit("$$A^3=8$$\n$A=2$").length, 1);
  assert.equal(audit("$A=2$\n$A^3$ theory").length, 1);
  assert.equal(audit("$A=2$\n$\\text{A^3 theory}=1$").length, 1);
  assert.equal(audit("$A=2$\nA^3=8 outside math").length, 1);
  assert.equal(audit("`$A=2$`\n$A^3=8$").length, 1);
  assert.equal(audit("$A=2$\n`$A^3=8$`").length, 1);
});

test("diagnostic exemption applies only to quoted tokens", () => {
  assert.deepEqual(audit("The validator flags `A^3`; this is a false positive."), []);
  assert.deepEqual(audit("The checker reports a false-positive `A³` finding."), []);
  assert.equal(audit("The validator flags A^3; this is a false positive.").length, 1);
  assert.equal(audit("Use `A^3` as our name.").length, 1);
  const text = "The validator's false positive is `A^3`, but A^3 is our name.";
  assert.deepEqual(audit(text), [{ index: text.lastIndexOf("A^3"), label: "A^3" }]);
});

test("reports exact source offsets for multiple findings", () => {
  const text = "first\nA^3 then A³";
  assert.deepEqual(audit(text), [{ index: 6, label: "A^3" }, { index: 15, label: "A³" }]);
});

test("defined cubes in arithmetic expressions need no relation sign", () => {
  for (const expression of ["2\\pi\\sqrt{A^3/k}", "A^3/2", "A^3+B", "A³*2"]) {
    assert.deepEqual(audit(`$A=k/(2e)$ then $${expression}$.`), [], expression);
    assert.equal(audit(`$${expression}$`).length, 1, expression);
  }
  for (const expression of ["A^3", "A^3/theory", "\\text{A^3/k}", "A^3 theory"]) {
    assert.equal(audit(`$A=2$ then $${expression}$.`).length, 1, expression);
  }
  const text = "$A=2$ then $2\\pi\\sqrt{A^3/k}$ and A^3 theory.";
  assert.deepEqual(audit(text), [{ index: text.lastIndexOf("A^3"), label: "A^3" }]);
});

test("defined scale cubes support denominators and implicit multiplication", () => {
  for (const formula of ["\\tau=\\frac{s-s_0}{A^3}", "s-s_*=A^3\\tau", "x=A^3z", "x=A^3"]) {
    assert.deepEqual(audit(`At scale $A=H(s_0)$.\n$$${formula}$$`), [], formula);
    assert.deepEqual(audit(`Freeze a reception scale $A$ and use $${formula}$.`), [], formula);
  }
});

test("scale definitions do not exempt names, text, or undefined powers", () => {
  for (const suffix of ["$A^3$ theory", "$A^3 theory=1$", "$\\text{A^3}=1$", "A^3 in prose", "`$x=A^3$`"])
    assert.equal(audit(`Freeze a scale $A$. ${suffix}`).length, 1, suffix);
  assert.equal(audit("$x=A^3\\tau$").length, 1);
  assert.equal(audit("`scale $A$` then $x=A^3\\tau$").length, 1);
  assert.equal(audit("$x=A^3$ then define scale $A$.").length, 1);
  const text = "Freeze a scale $A$. $x=A^3\\tau$ and A^3 theory.";
  assert.deepEqual(audit(text), [{index: text.lastIndexOf("A^3"), label: "A^3"}]);
});

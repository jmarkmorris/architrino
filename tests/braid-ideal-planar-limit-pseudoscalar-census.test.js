import assert from "node:assert/strict";
import test from "node:test";

import {
  SCHEMA,
  census,
  closedForm,
  flatteningScaling,
  parityCheck,
  randomizedTheoremTest,
  report,
} from "../scripts/braid-ideal/planar-limit-pseudoscalar-census.mjs";

let cached;
function rep() { return cached ??= report(); }

test("census schema is declared", () => {
  assert.equal(SCHEMA, "planar_limit_pseudoscalar_census.v1");
  assert.equal(rep().schema, SCHEMA);
});

// Evidence independence: the brute tensor contraction and the hand-derived closed
// form are separate code paths. This is the independent-reference check AGENTS.md
// requires before any number here is treated as a result.
test("brute moment contraction agrees with the hand-derived closed form", () => {
  const p = parityCheck({ draws: 200 });
  assert.equal(p.agrees, true);
  assert.ok(p.worstAbsDiff < 1e-12, `worst diff ${p.worstAbsDiff}`);
});

// The polarity-signed quadrupole named in the closure goal vanishes IDENTICALLY for
// antipodal pol=sgn binaries, at every tilt -- not only in the planar limit.
test("polarity-signed quadrupole is identically zero at every tilt, not just planar", () => {
  for (const cfg of [
    { alphaI: 0.4, alphaM: 0, alphaO: 0.9 },
    { alphaI: 0, alphaM: 0, alphaO: 0 },
    { qI: 1.3, qO: 0.7, alphaI: -0.8, alphaM: 0.3, alphaO: 1.1 },
  ]) {
    const c = census(cfg, { t: 0.41 });
    assert.equal(c.parityEven.QmaxAbs, 0);
    assert.equal(c.parityEven.SQS, 0);
    assert.equal(c.parityEven.trQ, 0);
  }
});

// Live-wire check: the instrument must be able to SEE a pseudoscalar when one is
// present, otherwise its planar zero is uninformative (AGENTS.md: absence of output
// is not evidence of absence when the instrument could not have produced output).
test("instrument reports nonzero pseudoscalars on tilted geometry", () => {
  const c = census({ qI: 0.5, qO: 1.6, alphaI: 0.4, alphaM: 0, alphaO: 0.9 });
  assert.ok(Math.abs(c.pseudoscalars.pDotS) > 1e-3);
  assert.ok(Math.abs(c.pseudoscalars.M3SSS) > 1e-3);
});

// The sigma_h theorem, tested adversarially on randomized radii, phases, times, and
// an explicit generic cap azimuthal offset.
test("every pseudoscalar vanishes in the planar limit for arbitrary radii and stagger", () => {
  const r = randomizedTheoremTest({ draws: 400 });
  assert.equal(r.theoremHolds, true);
  assert.equal(r.maxPlanarPseudoscalar, 0);
  assert.equal(r.instrumentIsLive, true);
  assert.ok(r.minTiltedPseudoscalar > 1e-6);
});

// The cap azimuthal offset -- the second obligation Entry 40 named -- does not
// rescue chirality in the plane.
test("cap azimuthal offset does not create a planar pseudoscalar", () => {
  for (const offset of [0.1, 0.7, 1.3, 2.2, 3.0, 4.4, 5.9]) {
    const c = census({ qI: 0.5, qO: 1.6, alphaI: 0, alphaM: 0, alphaO: 0, phases: [0, 2.0, 4.0 + offset] }, { t: 0.63 });
    assert.equal(c.pseudoscalars.pDotS, 0);
    assert.equal(c.pseudoscalars.M3SSS, 0);
  }
});

// Magnitude vanishes continuously; the SIGN does not. This is the correction to
// Entry 40's "near-planar" wording: chi = sign(p.S) is +/-1 for any alpha != 0.
test("chiral magnitude scales as alpha and alpha^3 while chi's sign stays sharp", () => {
  const s = flatteningScaling();
  assert.ok(Math.abs(s.exponentPDotS - 1) < 0.05, `p.S exponent ${s.exponentPDotS}`);
  assert.ok(Math.abs(s.exponentM3SSS - 3) < 0.05, `M3 exponent ${s.exponentM3SSS}`);
  for (const row of s.rows) assert.equal(row.chiSign, 1);
});

// Achirality and quietness are INDEPENDENT conditions: sigma_h gives achirality for
// any planar config, but p -> 0 additionally needs the rho-symmetric equal-radius
// balanced-phase arrangement. The tabled nested family is achiral yet dipole-loud.
test("planar limit is achiral for all radii but quiet only under rho-symmetry", () => {
  const nested = census({ qI: 0.5, qO: 1.6, alphaI: 0, alphaM: 0, alphaO: 0 }, { t: 0.9 });
  assert.equal(nested.pseudoscalars.pDotS, 0);
  assert.ok(nested.diagnostics.pTransverse > 1e-3, "nested planar braid is NOT dipole-quiet");

  const rhoSym = census({ qI: 1, qO: 1, alphaI: 0, alphaM: 0, alphaO: 0 }, { t: 0.9 });
  assert.equal(rhoSym.pseudoscalars.pDotS, 0);
  assert.ok(rhoSym.diagnostics.pTransverse < 1e-12, "rho-symmetric planar braid IS dipole-quiet");
});

test("closed form predicts the identically-vanishing quadrupole", () => {
  assert.equal(closedForm({ alphaI: 0.4, alphaO: 0.9 }).QpredictedZero, 0);
});

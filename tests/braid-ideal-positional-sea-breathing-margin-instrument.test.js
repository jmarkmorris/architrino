import test from "node:test";
import assert from "node:assert/strict";
import {
  prepareEnvironment, breathingCell, phaseScanM, middleRowReadout, breathingMarginMap,
  nearFieldReadout, settledNt, FAIL_CLOSED,
} from "../scripts/braid-ideal/positional-sea-breathing-margin-instrument.mjs";
import { saturationMarginPerP0, braidAxialDipole } from "../scripts/braid-ideal/sh0-sea-orientation-saturation-margin-estimate.mjs";

// Positional-sea (breathing-shell) margin instrument (fresh-numbered spec
// section, cite by title). Claim-bearing rows: the frozen-orientation
// positional DELTA (dt-witnessed, linear at small eps, sub-field slew
// guarded) and the SCOPED-NEGATIVE verdict — the band-limited monopole
// breathing response cannot feed the middle at any declared cell; the
// best-phase ceiling at valid (sub-field) booking falls an order of
// magnitude short of the orientational M hole.

const p0 = braidAxialDipole();
const env34 = prepareEnvironment({ Rsea: 3.4, Nt: 32 });

test("anchor: the eps=0 relax-orientation baseline reproduces the parent instrument's exact-delay rows", () => {
  const ref = saturationMarginPerP0({ Rsea: 3.4, mode: "relax", Nt: 32, gammaOverOmega: 2, exactDelays: true });
  const base = breathingCell(env34, { eps: 0, breathMode: "off", orientMode: "relax" });
  for (const L of ["I", "M", "O"]) {
    assert.ok(Math.abs(base.baseRadPerP0[L] - ref.marginPerP0[L]) * p0 < 2e-3,
      `radial ${L}: ${base.baseRadPerP0[L] * p0} vs parent ${ref.marginPerP0[L] * p0}`);
    assert.ok(Math.abs(base.baseTanPerP0[L] - ref.tanRowPerP0[L]) * p0 < 2e-3,
      `tangential ${L}: ${base.baseTanPerP0[L] * p0} vs parent ${ref.tanRowPerP0[L] * p0}`);
  }
  // the orientational M hole is present in the anchor frame
  assert.ok(base.baseRadPerP0.M * p0 < -0.03, `orientational M hole: ${base.baseRadPerP0.M * p0}`);
});

test("the settled-grade guard raises Nt for fast relaxation", () => {
  assert.equal(settledNt({ Nt: 32, gammaBreathOverOmega: 2 }).NtEff, 32);
  const fast = settledNt({ Nt: 32, gammaBreathOverOmega: 10 });
  assert.ok(fast.NtEff >= 79 && fast.gammaDtMax <= 0.8, `Nt ${fast.NtEff}, gamma*dt ${fast.gammaDtMax}`);
});

test("dt witness: the frozen-frame positional delta and the phase-scan ceiling are stable under dt-halving", () => {
  const env64 = prepareEnvironment({ Rsea: 3.4, Nt: 64 });
  const c32 = breathingCell(env34, { eps: 0.1, breathMode: "fast" });
  const c64 = breathingCell(env64, { eps: 0.1, breathMode: "fast" });
  assert.ok(Math.abs(c32.positionalDeltaRadPerP0.M - c64.positionalDeltaRadPerP0.M) * p0 < 1e-3,
    `deltaM 32/64: ${c32.positionalDeltaRadPerP0.M * p0} / ${c64.positionalDeltaRadPerP0.M * p0}`);
  const s32 = phaseScanM(env34, { eps: 0.1, Nphi: 8 });
  const s64 = phaseScanM(env64, { eps: 0.1, Nphi: 8 });
  assert.ok(Math.abs(s32.best.deltaMPerP0 - s64.best.deltaMPerP0) * p0 < 1e-3,
    `scan best 32/64: ${s32.best.deltaMPerP0 * p0} / ${s64.best.deltaMPerP0 * p0}`);
});

test("linearity witness at small eps; polar sites carry no radial cadence drive; slew guard binds", () => {
  const c2 = breathingCell(env34, { eps: -0.02, breathMode: "fast" });
  const c4 = breathingCell(env34, { eps: -0.04, breathMode: "fast" });
  const s2 = c2.positionalDeltaRadPerP0.M / -0.02, s4 = c4.positionalDeltaRadPerP0.M / -0.04;
  assert.ok(Math.abs(s2 - s4) < 0.5 * Math.abs(s4) + 1e-9, `slopes ${s2} vs ${s4}`);
  // axis points see a time-constant radial field under rigid rotation: no AC drive
  assert.ok(c4.breathingAmplitude[4] < 1e-3 && c4.breathingAmplitude[5] < 1e-3,
    `polar amplitudes ${c4.breathingAmplitude[4]}, ${c4.breathingAmplitude[5]}`);
  // sub-field slew: valid at eps=0.1, violated by eps=0.2 (the declared ceiling is real)
  const ok = breathingCell(env34, { eps: 0.1, breathMode: "fast" });
  const bad = breathingCell(env34, { eps: 0.2, breathMode: "fast" });
  assert.ok(ok.subFieldSlewOk && ok.breathVMax < 1, `vMax at 0.1: ${ok.breathVMax}`);
  assert.ok(!bad.subFieldSlewOk, `vMax at 0.2: ${bad.breathVMax}`);
});

test("SCOPED NEGATIVE (the decisive first readout): the breathing channel cannot feed the middle in any declared cell", () => {
  // best-phase ceiling per spacing at eps=0.1 stays below 0.005 per p0 everywhere in the band
  for (const a of [3.0, 3.25, 3.4]) {
    const env = a === 3.4 ? env34 : prepareEnvironment({ Rsea: a, Nt: 32 });
    const scan = phaseScanM(env, { eps: 0.1, Nphi: 8 });
    assert.ok(scan.best.deltaMPerP0 * p0 < 5e-3,
      `best-phase M feed at a=${a}: ${scan.best.deltaMPerP0 * p0}`);
  }
  const r = middleRowReadout({ Rsea: 3.4, Nt: 32 });
  assert.ok(r.radM_orientOnly6_relax < -0.03, `orientational hole ${r.radM_orientOnly6_relax}`);
  assert.ok(!r.mRowPositiveReachableSubfield, "no sub-field amplitude reaches a positive M row");
  assert.ok(r.shortfallFactorSeaRow === null || r.shortfallFactorSeaRow > 5,
    `shortfall factor ${r.shortfallFactorSeaRow} (measured ~35x at 3.4)`);
});

test("map wiring: composite cells carry both grades and the verdict flag", () => {
  const map = breathingMarginMap({ spacings: [3.4], gammasBreath: [2], epsList: [0.1, -0.1], Nt: 32, includeFast: false });
  assert.equal(map.cells.length, 2);
  for (const c of map.cells) {
    assert.ok(c.radM_orient6 < 0, "orientational baseline hole present in the composite");
    assert.ok(Math.abs(c.deltaM6) < 0.01, `positional delta small: ${c.deltaM6}`);
    assert.ok(c.dressedSupport6.M < 1, "middle support stays short of the corridor");
    assert.ok(c.minSupport6 < 0.97, "no closing cell");
    assert.ok(c.subFieldSlewOk, "declared cells run inside the slew guard");
  }
  assert.equal(map.anyPositionalMRescue, false);
  assert.equal(map.anyCellCloses, false);
  assert.equal(map.verdictHint, "no_positional_m_rescue_in_declared_cells");
});

test("near-field anchor: the finite-pair return reproduces the dipole rows as d -> 0", () => {
  const zero = { eps: 0, breathMode: "off" };
  const dip = breathingCell(env34, { ...zero, returnModel: "dipole" });
  const pair = breathingCell(env34, { ...zero, returnModel: "finitePair", dPair: 0.1 });
  for (const L of ["I", "M", "O"]) {
    assert.ok(Math.abs(pair.baseRadPerP0[L] - dip.baseRadPerP0[L]) * p0 < 5e-4,
      `rad ${L}: pair(d=0.1) ${pair.baseRadPerP0[L] * p0} vs dipole ${dip.baseRadPerP0[L] * p0}`);
  }
});

test("NEAR-FIELD CELL (Section 49 route (a)): the finite pair feeds the caps, not the middle — the response family closes", () => {
  const r = nearFieldReadout({ spacings: [3.4], Nphi: 8 });
  const row = r.spacingRows[0];
  // the near-field correction to the middle is tiny and does not open the channel
  assert.ok(row.nearFieldDeltaM_frozen < 0.005 && Math.abs(row.nearFieldDeltaM_frozen) < 0.01,
    `frozen near-field deltaM ${row.nearFieldDeltaM_frozen} (measured -0.0012)`);
  // the orientational middle hole persists at pair grade
  assert.ok(row.radM_pair_relax < -0.03, `pair-grade M hole ${row.radM_pair_relax}`);
  // the outer feed amplifies severalfold: the endpoints sit at cap latitude
  assert.ok(row.radO_pair_frozen > 2.5 * row.radO_dipole_frozen,
    `pair O ${row.radO_pair_frozen} vs dipole O ${row.radO_dipole_frozen}`);
  // the breathing ceiling does not improve at pair grade
  assert.ok(row.breathingCeilingM_pair < 5e-3, `pair breathing ceiling ${row.breathingCeilingM_pair}`);
  // the tangential inner feed survives at pair grade (the durable capability)
  assert.ok(row.tanI_pair_relax > 0.03, `pair tangential inner feed ${row.tanI_pair_relax}`);
  // honesty: the relax-pair rows are kernel-grade only (super-field arm slew)
  assert.ok(row.armSlewHalfD > 1, `arm slew ${row.armSlewHalfD} c_f`);
});

test("fail-closed", () => {
  assert.equal(FAIL_CLOSED.retainedBranchClaim, false);
  assert.equal(FAIL_CLOSED.acceptedSameLevelBranchClaim, false);
  assert.equal(FAIL_CLOSED.scoreMovement, "no_score_increase");
  assert.equal(FAIL_CLOSED.acceptedSeedPathCertificate, false);
});

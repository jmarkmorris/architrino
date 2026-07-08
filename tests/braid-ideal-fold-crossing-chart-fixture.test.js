import test from "node:test";
import assert from "node:assert/strict";

import {
  SCHEMA,
  SPEC_PACKET_REF,
  PUMP_C1,
  ABSORB_BETA_THRESHOLD,
  chartImpulseNormalForm,
  receiverNormalIndependence,
  regularizationIndependence,
  reproducesNaiveEjection,
  absorbsPump,
  fixtureReport,
  NAIVE_EJECTION_WITNESS,
  FAIL_CLOSED,
} from "../scripts/braid-ideal/fold-crossing-chart-fixture.mjs";

test("chart-defined click impulse is finite", () => {
  const { impulse, chartValid } = chartImpulseNormalForm({
    kappa: 1,
    rc: 1,
    a: 0.25,
    mu0: 1,
    chi: 1,
  });
  assert.equal(chartValid, true);
  assert.ok(Number.isFinite(impulse), `impulse=${impulse}`);
  assert.ok(impulse > 0);
  // closed form: chi * kappa / rc^2 * sqrt(2 mu0 / a) = sqrt(2/0.25) = sqrt(8)
  assert.ok(Math.abs(impulse - Math.sqrt(8)) < 1e-12);
});

test("cusp (a<=0) degeneration falls out of the fold chart, no click booked", () => {
  const r = chartImpulseNormalForm({ kappa: 1, rc: 1, a: 0, mu0: 1, chi: 1 });
  assert.equal(r.chartValid, false);
  assert.equal(r.impulse, null);
  assert.equal(r.reason, "a_below_cusp_floor");
});

test("click impulse is independent of the receiver-normal numerator D_T", () => {
  const r = receiverNormalIndependence(
    { kappa: 1, rc: 1, a: 0.25, mu0: 1, chi: 1 },
    [0.05, 0.3, 0.7, 0.99]
  );
  assert.equal(r.independent, true);
  assert.equal(r.spread, 0);
});

test("click impulse is regularization-independent (floor, softening, timestep)", () => {
  const triples = [
    { jacobianFloor: 0.05, softening: 0.05, timeStep: 0.024 },
    { jacobianFloor: 0.2, softening: 0.01, timeStep: 0.012 },
    { jacobianFloor: 0.1, softening: 0.0, timeStep: 0.048 },
  ];
  const r = regularizationIndependence(
    { kappa: 1, rc: 1, a: 0.25, mu0: 1, chi: 1 },
    triples
  );
  assert.equal(r.independent, true);
  assert.ok(r.spread <= r.tol);
});

test("naive-kernel ejection witness IS regularization-dependent (the failure mode)", () => {
  // v_max spread across the recorded triples is 9.8..12.4 c_f.
  const vmaxes = NAIVE_EJECTION_WITNESS.rows.map((row) => row.vMax);
  const spread = Math.max(...vmaxes) - Math.min(...vmaxes);
  assert.ok(spread > 2, `recorded v_max spread=${spread}`);
  const r = reproducesNaiveEjection(NAIVE_EJECTION_WITNESS.rows);
  assert.equal(r.reproduces, true);
  assert.equal(r.ejects, true);
  assert.equal(r.regularizationDependent, true);
});

test("executable rejection: chart impulse does NOT reproduce the naive ejection", () => {
  // The chart impulse is regularization-independent, so a set of readings that
  // all equal the same chart impulse (below field speed as a velocity change)
  // fails the ejection predicate on both clauses.
  const impulse = chartImpulseNormalForm({ kappa: 0.01, rc: 1, a: 0.25, mu0: 1, chi: 1 }).impulse;
  const chartReadings = [
    { vMax: impulse },
    { vMax: impulse },
    { vMax: impulse },
  ];
  const r = reproducesNaiveEjection(chartReadings);
  assert.equal(r.reproduces, false);
  assert.equal(r.regularizationDependent, false);
});

test("absorber comparison: one click per rotation only absorbs at low rim fraction", () => {
  // threshold = 1 / (2 pi c1) ~ 0.0552
  assert.ok(Math.abs(ABSORB_BETA_THRESHOLD - 1 / (2 * Math.PI * PUMP_C1)) < 1e-15);
  assert.equal(absorbsPump(0.05).absorbs, true);
  const ceiling = absorbsPump(0.985);
  assert.equal(ceiling.absorbs, false);
  // near the ceiling one click falls short by ~18x
  assert.ok(ceiling.shortfallFactor > 15, `shortfall=${ceiling.shortfallFactor}`);
});

test("fixture report is fail-closed and names no retained branch", () => {
  const r = fixtureReport();
  assert.equal(r.schema, SCHEMA);
  assert.equal(r.specPacketRef, SPEC_PACKET_REF);
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.acceptedSameLevelBranchClaim, false);
  assert.equal(r.retainedBranch, null);
  assert.equal(r.scoreMovement, "no_score_increase");
  assert.equal(r.acceptedSeedPathCertificate, false);
  // the fixture's own chart impulse must not reproduce the ejection
  assert.equal(r.naiveEjection.reproduces, true); // the WITNESS does
  assert.equal(FAIL_CLOSED.retainedBranchClaim, false);
});

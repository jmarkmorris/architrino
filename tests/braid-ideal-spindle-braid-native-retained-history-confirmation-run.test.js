import test from "node:test";
import assert from "node:assert/strict";

import {
  SCHEMA,
  FAIL_CLOSED,
  DECLARED,
  TABLED_ROWS,
  selectTabledRow,
  buildSites,
  rigidPosition,
  rigidVelocity,
  heldSourceModel,
  seedRecordEvaluation,
  runRelease,
} from "../scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs";
import { evaluateMovingCircularSourceHistory } from "../src/solver/app/AbsoluteHistoryRootRuntime.mjs";
import { residuals as prescribedResiduals } from "../scripts/braid-ideal/rigid-tilted-nested-braid-evaluator.mjs";

const deg = (d) => (d * Math.PI) / 180;

test("candidate-row geometry matches the handoff packet table", () => {
  const sites = buildSites();
  assert.equal(sites.length, 6);
  const betas = {};
  for (const s of sites) {
    betas[s.layer] = Math.hypot(...rigidVelocity(s, 0));
  }
  assert.ok(Math.abs(betas.I - 0.489) < 5e-4);
  assert.ok(Math.abs(betas.M - 1.0) < 1e-12); // the c_f rail, exact
  assert.ok(Math.abs(betas.O - 0.172) < 5e-4);
});

test("held source model agrees with the rigid worldline on the production runtime", () => {
  const sites = buildSites();
  for (const s of sites) {
    for (const t of [-3.7, -1, 0, 2.4]) {
      const sample = evaluateMovingCircularSourceHistory(heldSourceModel(s), t);
      const p = rigidPosition(s, t);
      const v = rigidVelocity(s, t);
      assert.ok(Math.abs(sample.position.x - p[0]) < 1e-12);
      assert.ok(Math.abs(sample.position.y - p[1]) < 1e-12);
      assert.ok(Math.abs(sample.position.z - p[2]) < 1e-12);
      assert.ok(Math.abs(sample.velocity.x - v[0]) < 1e-12);
      assert.ok(Math.abs(sample.velocity.y - v[1]) < 1e-12);
    }
  }
});

test("native seed record reproduces the prescribed-evaluator champion anchor", () => {
  const sites = buildSites();
  const heldOnly = sites.map((s) => ({
    site: s,
    ts: [],
    xs: [],
    vs: [],
    maxRadiusSeen: Math.hypot(s.rho, s.z0),
    positionAt: (tE) => rigidPosition(s, tE),
    segment: () => null,
  }));
  const seed = seedRecordEvaluation(sites, heldOnly);
  const prescribed = prescribedResiduals({
    qI: 0.5,
    qO: 1.65,
    alphaI: deg(-12),
    alphaM: 0,
    alphaO: deg(84),
    phases: [0, deg(120), deg(330)],
  });
  assert.ok(Math.abs(seed.globalRelResidual - prescribed.globalRelResidual) < 1e-3);
  assert.ok(Math.abs(seed.kappaStar - prescribed.kappaStar) < 1e-3);
});

test("epicyclic-hunt knobs: a.m.-matched apses, exact prehistory, exact regression", () => {
  const saved = {
    epicycle: { ...DECLARED.epicycle },
    apsidalPhase: { ...DECLARED.apsidalPhase },
    apsisStart: { ...DECLARED.apsisStart },
  };
  try {
    // periapsis start + apsidal phase offset on the middle layer
    DECLARED.epicycle.M = 0.1;
    DECLARED.apsisStart.M = "peri";
    DECLARED.apsidalPhase.M = deg(37);
    const circular = (() => {
      DECLARED.epicycle.M = 0;
      DECLARED.apsidalPhase.M = 0;
      DECLARED.apsisStart.M = "apo";
      const s = buildSites();
      DECLARED.epicycle.M = 0.1;
      DECLARED.apsisStart.M = "peri";
      DECLARED.apsidalPhase.M = deg(37);
      return s;
    })();
    const sites = buildSites();
    const mPlus = sites.find((s) => s.id === "M+");
    const mCirc = circular.find((s) => s.id === "M+");
    // periapsis radius rho*(1-e), faster matched circle omega/(1-e)^2
    assert.ok(Math.abs(mPlus.rho - mCirc.rho * 0.9) < 1e-12);
    assert.ok(Math.abs(mPlus.omegaHeld - 1 / (0.9 * 0.9)) < 1e-12);
    // angular momentum matched to the tabled circular seed: rho*beta invariant
    const beta = Math.hypot(...rigidVelocity(mPlus, 0));
    assert.ok(Math.abs(mPlus.rho * beta - mCirc.rho * Math.hypot(...rigidVelocity(mCirc, 0))) < 1e-12);
    // apsidal phase offset places the release azimuth at theta + phi
    assert.ok(Math.abs(mPlus.phase - (deg(120) + deg(37))) < 1e-12);
    // release is at an apsis: zero radial velocity against the held circle
    const x = rigidPosition(mPlus, 0);
    const v = rigidVelocity(mPlus, 0);
    assert.ok(Math.abs(x[0] * v[0] + x[1] * v[1]) < 1e-12);
    // exact prehistory: the held source model reproduces the worldline
    for (const t of [-2.2, 0]) {
      const sample = evaluateMovingCircularSourceHistory(heldSourceModel(mPlus), t);
      const p = rigidPosition(mPlus, t);
      assert.ok(Math.abs(sample.position.x - p[0]) < 1e-12);
      assert.ok(Math.abs(sample.position.y - p[1]) < 1e-12);
    }
    // e=0, phi=0, apo regression is exact
    DECLARED.epicycle.M = 0;
    DECLARED.apsidalPhase.M = 0;
    DECLARED.apsisStart.M = "apo";
    const regressed = buildSites();
    for (let i = 0; i < regressed.length; i += 1) {
      assert.ok(Math.abs(regressed[i].rho - circular[i].rho) < 1e-15);
      assert.ok(Math.abs(regressed[i].phase - circular[i].phase) < 1e-15);
      assert.ok(Math.abs(regressed[i].omegaHeld - circular[i].omegaHeld) < 1e-15);
    }
  } finally {
    Object.assign(DECLARED.epicycle, saved.epicycle);
    Object.assign(DECLARED.apsidalPhase, saved.apsidalPhase);
    Object.assign(DECLARED.apsisStart, saved.apsisStart);
  }
});

test("seed record reports both hunt conventions (fitted/circular, frozen/held-circle)", () => {
  const saved = { M: DECLARED.epicycle.M };
  try {
    DECLARED.epicycle.M = 0.05;
    const sites = buildSites();
    const heldOnly = sites.map((s) => ({
      site: s,
      ts: [],
      xs: [],
      vs: [],
      maxRadiusSeen: Math.hypot(s.rho, s.z0),
      positionAt: (tE) => rigidPosition(s, tE),
      segment: () => null,
    }));
    const seed = seedRecordEvaluation(sites, heldOnly, null, 0.315105);
    // spec Section 36 rows at e_M = 0.05: fitted/circular 0.4531,
    // frozen/held-circle 0.4417
    assert.ok(Math.abs(seed.conventionPair.fittedCircularNeed.globalRelResidual - 0.4531) < 2e-3);
    assert.ok(Math.abs(seed.conventionPair.frozenHeldCircleNeed.globalRelResidual - 0.4417) < 2e-3);
    assert.equal(seed.conventionPair.frozenHeldCircleNeed.kappa, 0.315105);
  } finally {
    DECLARED.epicycle.M = saved.M;
  }
});

test("Candidate Row 2 seed record validates against the support-search anchors", () => {
  try {
    selectTabledRow(2);
    assert.equal(DECLARED.candidateRow, 2);
    // pinned transverse cadence: beta_M = omega R_M cos(alpha_M) = 1 exactly
    const sites = buildSites();
    const betas = {};
    for (const s of sites) betas[s.layer] = Math.hypot(...rigidVelocity(s, 0));
    assert.ok(Math.abs(betas.M - 1.0) < 1e-12);
    assert.ok(Math.abs(betas.I - 0.4548) < 5e-4);
    assert.ok(Math.abs(betas.O - 0.1293) < 5e-4);
    // native seed record vs the tabling instrument (spindle-support-ratio-
    // targeted-search.mjs on v1): kappa* 0.30041, closure 0.32397,
    // support ratios (0.9595, 0.8803, 0.9796)
    const heldOnly = sites.map((s) => ({
      site: s,
      ts: [],
      xs: [],
      vs: [],
      maxRadiusSeen: Math.hypot(s.rho, s.z0),
      positionAt: (tE) => rigidPosition(s, tE),
      segment: () => null,
    }));
    const seed = seedRecordEvaluation(sites, heldOnly);
    assert.ok(Math.abs(seed.kappaStar - 0.30041) < 2e-3);
    assert.ok(Math.abs(seed.globalRelResidual - 0.32397) < 2e-3);
    const sup = seed.supportRatios.atFittedKappa;
    assert.ok(Math.abs(sup.I - 0.9595) < 0.02);
    assert.ok(Math.abs(sup.M - 0.8803) < 0.02);
    assert.ok(Math.abs(sup.O - 0.9796) < 0.02);
  } finally {
    selectTabledRow(1);
  }
});

test("Row 1 seed support ratios reproduce the native run rows", () => {
  // spec Section 30: support ratios 0.90/0.76/0.53 at the unified kappa*
  const sites = buildSites();
  const heldOnly = sites.map((s) => ({
    site: s,
    ts: [],
    xs: [],
    vs: [],
    maxRadiusSeen: Math.hypot(s.rho, s.z0),
    positionAt: (tE) => rigidPosition(s, tE),
    segment: () => null,
  }));
  const seed = seedRecordEvaluation(sites, heldOnly);
  const sup = seed.supportRatios.atFittedKappa;
  assert.ok(Math.abs(sup.I - 0.9) < 0.02);
  assert.ok(Math.abs(sup.M - 0.76) < 0.02);
  assert.ok(Math.abs(sup.O - 0.53) < 0.02);
  assert.equal(TABLED_ROWS[1], DECLARED.layers);
});

test("release is fail-closed and books the poised-clicker same-source opening", () => {
  assert.equal(FAIL_CLOSED.retainedBranchClaim, false);
  assert.equal(FAIL_CLOSED.scoreMovement, "no_score_increase");
  assert.equal(SCHEMA, "spindle_braid_native_retained_history_confirmation_run.v0");
  const sites = buildSites();
  const heldOnly = sites.map((s) => ({
    site: s,
    ts: [],
    xs: [],
    vs: [],
    maxRadiusSeen: Math.hypot(s.rho, s.z0),
    positionAt: (tE) => rigidPosition(s, tE),
    segment: () => null,
  }));
  const seed = seedRecordEvaluation(sites, heldOnly);
  const short = runRelease({ rotations: 0.02, kappa: seed.kappaStar, recordRotations: [] });
  assert.ok(short.completed);
  // the middle binary's same-source ledger opens at release (root birth at the rail)
  const mClicks = short.clickLedger.entries.filter((e) => e.site.startsWith("M"));
  assert.ok(mClicks.length >= 2);
  assert.ok(mClicks.every((e) => e.integerDelta === 1));
  // declared memory window and stratum discipline are wired
  assert.ok(DECLARED.sameSourceMinimumDelay < DECLARED.coincidenceStratum);
});

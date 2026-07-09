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

test("Row 3 responsive sea: FCC-12 geometry and named quantities are wired, not knobs", async () => {
  const m = await import("../scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs");
  selectTabledRow(2);
  DECLARED.responsiveSea.enabled = true;
  try {
    const sea = m.buildResponsiveSeaState();
    assert.equal(sea.sites.length, 12);
    for (const s of sea.sites) {
      assert.ok(Math.abs(Math.hypot(...s.position) - 4.25) < 1e-12);
    }
    // FCC first-shell angular structure: direction cosines in {+-0.5, 0, -1}
    const dirs = sea.sites.map((s) => s.position.map((c) => c / 4.25));
    for (let a = 0; a < 12; a += 1) {
      for (let b = a + 1; b < 12; b += 1) {
        const dot = dirs[a][0] * dirs[b][0] + dirs[a][1] * dirs[b][1] + dirs[a][2] * dirs[b][2];
        assert.ok(
          [0.5, 0, -0.5, -1].some((v) => Math.abs(dot - v) < 1e-9),
          `non-FCC pair angle: ${dot}`
        );
      }
    }
    // p0 is the spindle's own axial polarity dipole at v1 (named, not fit)
    let pz = 0;
    for (const s of buildSites()) pz += s.pol * s.z0;
    assert.ok(Math.abs(Math.abs(pz) - sea.p0) < 0.01);
    // gamma is the measured one-sided fast-alignment floor 2*omega_braid
    assert.ok(Math.abs(sea.gamma - 2 * DECLARED.omega) < 1e-12);
  } finally {
    DECLARED.responsiveSea.enabled = false;
    selectTabledRow(1);
  }
});

test("Row 3 responsive sea: settled seed record keeps the bare Row 2 anchor and adds sea rows", async () => {
  const m = await import("../scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs");
  selectTabledRow(2);
  DECLARED.responsiveSea.enabled = true;
  try {
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
    const sea = m.settleResponsiveSea(m.buildResponsiveSeaState(), sites, 0);
    // settle record spans the declared window at run dt
    assert.ok(sea.ts.length >= 3 * Math.round((2 * Math.PI) / DECLARED.timeStep));
    assert.ok(Math.abs(sea.ts[sea.ts.length - 1] - 0) <= DECLARED.timeStep + 1e-9);
    const order = m.seaOrderParameter(sea);
    assert.ok(order.meanVectorMagnitude > 0 && order.meanVectorMagnitude <= 1);
    const seed = seedRecordEvaluation(sites, heldOnly, null, null, sea);
    // kappa* fit discipline: bare braid channel only -> Row 2 anchor unchanged
    assert.ok(Math.abs(seed.kappaStar - 0.30048) < 2e-3);
    assert.ok(Math.abs(seed.globalRelResidual - 0.32404) < 2e-3);
    // sea rows present, finite, and separately booked (metabolism ledger seed anchor)
    assert.ok(seed.seaRows);
    for (const L of ["I", "M", "O"]) {
      assert.ok(Number.isFinite(seed.seaRows.radialSupplyFraction[L]));
      assert.ok(Number.isFinite(seed.seaRows.tangentialRowPerLayer[L]));
      assert.ok(Number.isFinite(seed.seaRows.supportRatiosDressed[L]));
    }
    assert.ok(Number.isFinite(seed.seaRows.netSeaTorqueZ));
    // dressed = bare + sea supply, same-record consistency
    for (const L of ["I", "M", "O"]) {
      const bare = seed.supportRatios.atFittedKappa[L];
      const dressed = seed.seaRows.supportRatiosDressed[L];
      const supply = seed.seaRows.radialSupplyFraction[L];
      assert.ok(Math.abs(dressed - (bare + supply)) < 1e-9);
    }
  } finally {
    DECLARED.responsiveSea.enabled = false;
    selectTabledRow(1);
  }
});

test("Row 3 responsive sea: short dressed release runs, retains sea history, no clamped lookups", async () => {
  const m = await import("../scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs");
  selectTabledRow(2);
  DECLARED.responsiveSea.enabled = true;
  try {
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
    const sea = m.settleResponsiveSea(m.buildResponsiveSeaState(), sites, 0);
    const seed = seedRecordEvaluation(sites, heldOnly, null, null, sea);
    const short = runRelease({ rotations: 0.02, kappa: seed.kappaStar, recordRotations: [] });
    assert.ok(short.completed);
    assert.ok(short.responsiveSeaState);
    // orientation record advanced through the released window
    const lastT = short.responsiveSeaState.ts[short.responsiveSeaState.ts.length - 1];
    assert.ok(lastT > 0);
    // settle depth covers every emission-time lookup (honesty row stays zero)
    assert.equal(short.responsiveSeaState.clampedLookups, 0);
    // per-step sea diagnostics are booked
    const d = short.diag[short.diag.length - 1];
    assert.ok(d.seaRows && Number.isFinite(d.seaRows.netTorqueZ));
    assert.ok(d.seaOrder && d.seaOrder.meanVectorMagnitude > 0);
    // the environment channel is additive: sea acceleration rows are nonzero
    assert.ok(
      Math.abs(d.seaRows.rows.I.radial) + Math.abs(d.seaRows.rows.O.radial) > 1e-6
    );
  } finally {
    DECLARED.responsiveSea.enabled = false;
    selectTabledRow(1);
  }
});

test("Row 4 responsive sea at a=3.40: exact-delay seed rows land on the confining side", async () => {
  const m = await import("../scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs");
  selectTabledRow(2);
  DECLARED.responsiveSea.enabled = true;
  const priorSpacing = DECLARED.responsiveSea.spacing;
  DECLARED.responsiveSea.spacing = 3.4;
  try {
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
    const sea = m.settleResponsiveSea(m.buildResponsiveSeaState(), sites, 0);
    for (const s of sea.sites) {
      assert.ok(Math.abs(Math.hypot(...s.position) - 3.4) < 1e-12);
    }
    const seed = seedRecordEvaluation(sites, heldOnly, null, null, sea);
    // bare braid anchor unchanged by the environment (kappa* fit discipline)
    assert.ok(Math.abs(seed.kappaStar - 0.30048) < 2e-3);
    assert.ok(Math.abs(seed.globalRelResidual - 0.32404) < 2e-3);
    // exact-delay fixed-point side: mean radial sea supply POSITIVE (surplus),
    // inner tangential sea torque FORWARD (the Row 4 tabling expectations)
    const r = seed.seaRows.radialSupplyFraction;
    const meanRad = (r.I + r.M + r.O) / 3;
    assert.ok(meanRad > 0, `mean radial sea supply not surplus-side: ${meanRad}`);
    assert.ok(
      seed.seaRows.tangentialRowPerLayer.I > 0,
      `inner sea torque not forward: ${seed.seaRows.tangentialRowPerLayer.I}`
    );
  } finally {
    DECLARED.responsiveSea.spacing = priorSpacing;
    DECLARED.responsiveSea.enabled = false;
    selectTabledRow(1);
  }
});

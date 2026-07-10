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

test("Row 5 static pair sea: tabled V3 geometry, tilted-rail cadence, environment selected by the row", () => {
  try {
    selectTabledRow(5);
    assert.equal(DECLARED.candidateRow, 5);
    // Row 5's environment is part of the tabled row, not a separate flag
    assert.equal(DECLARED.staticPairSea.enabled, true);
    // tilted-rail cadence: omega = 1/cos(alpha_M), beta_M = 1 exact, all sub-field
    assert.ok(Math.abs(DECLARED.omega - 1 / Math.cos(deg(-29.04))) < 1e-12);
    const sites = buildSites();
    const betas = {};
    for (const s of sites) betas[s.layer] = Math.hypot(...rigidVelocity(s, 0));
    assert.ok(Math.abs(betas.M - 1.0) < 1e-12);
    assert.ok(Math.abs(betas.I - 0.5633) < 5e-4);
    assert.ok(Math.abs(betas.O - 0.4535) < 5e-4);
  } finally {
    selectTabledRow(1);
    assert.equal(DECLARED.staticPairSea.enabled, false);
  }
});

test("Row 5 static pair sea: true FCC-12 placement, in-build frozen pairs, Nt witness", async () => {
  const m = await import("../scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs");
  try {
    selectTabledRow(5);
    const sites = buildSites();
    const sea = m.buildStaticPairSeaSites(sites);
    // 12 sites at the tabled spacing, TRUE FCC first-shell angular structure
    assert.equal(sea.shell.length, 12);
    assert.equal(sea.endpoints.length, 24);
    assert.ok(Math.abs(sea.spacing - 2.453) < 1e-12);
    const dirs = sea.shell.map((s) => s.center.map((c) => c / 2.453));
    for (let a = 0; a < 12; a += 1) {
      assert.ok(Math.abs(Math.hypot(...sea.shell[a].center) - 2.453) < 1e-9);
      for (let b = a + 1; b < 12; b += 1) {
        const dot = dirs[a][0] * dirs[b][0] + dirs[a][1] * dirs[b][1] + dirs[a][2] * dirs[b][2];
        assert.ok(
          [0.5, 0, -0.5, -1].some((v) => Math.abs(dot - v) < 1e-9),
          `non-FCC pair angle: ${dot}`
        );
      }
    }
    // p0 is the braid's OWN axial polarity dipole (in-build, not a knob):
    // |sum pol*z0| = |sum_layers 2 R sin alpha| ~ 0.8806 at V3
    assert.ok(Math.abs(sea.p0 - m.braidAxialDipole(sites)) < 1e-15);
    assert.ok(Math.abs(sea.p0 - 0.8806) < 1e-3);
    // each site is its antipodal unit-polarity pair at +- p0/2 along pHat
    for (let k = 0; k < 12; k += 1) {
      const plus = sea.endpoints[2 * k];
      const minus = sea.endpoints[2 * k + 1];
      assert.equal(plus.pol, 1);
      assert.equal(minus.pol, -1);
      const sep = Math.hypot(
        plus.position[0] - minus.position[0],
        plus.position[1] - minus.position[1],
        plus.position[2] - minus.position[2]
      );
      assert.ok(Math.abs(sep - sea.p0) < 1e-12);
      assert.ok(Math.abs(Math.hypot(...sea.shell[k].pHat) - 1) < 1e-12);
    }
    // binding obligation 2 (Section 52 aliasing trap): the slow-limit
    // orientations must be sampling-stable between declared Nt and witness Nt
    const witness = m.buildStaticPairSeaSites(sites, DECLARED.staticPairSea.ntWitness);
    for (let k = 0; k < 12; k += 1) {
      const a = sea.shell[k].pHat;
      const b = witness.shell[k].pHat;
      const dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
      assert.ok((Math.acos(Math.max(-1, Math.min(1, dot))) * 180) / Math.PI < 0.5);
    }
  } finally {
    selectTabledRow(1);
  }
});

test("Row 5 seed record: bare rows on the V3 evaluator anchors, kappa* fit stays bare-channel", async () => {
  const m = await import("../scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs");
  try {
    selectTabledRow(5);
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
    const sea = m.buildStaticPairSeaSites(sites);
    const seed = seedRecordEvaluation(sites, heldOnly, null, null, null, sea);
    // native seed vs the tabling instrument (SELF_CONSISTENT_V3, spec Section
    // 52 by title): kappa* 0.4539, closure 0.2058, bare support
    // 1.0035/1.0008/0.677 — the environment must NOT move the bare anchors
    assert.ok(Math.abs(seed.kappaStar - 0.4539) < 2e-3);
    assert.ok(Math.abs(seed.globalRelResidual - 0.2058) < 2e-3);
    const sup = seed.supportRatios.atFittedKappa;
    assert.ok(Math.abs(sup.I - 1.0035) < 0.02);
    assert.ok(Math.abs(sup.M - 1.0008) < 0.02);
    assert.ok(Math.abs(sup.O - 0.677) < 0.02);
    // sea rows separately booked (split channel), dressed = bare + supply
    assert.ok(seed.seaRows);
    for (const L of ["I", "M", "O"]) {
      const bare = sup[L];
      const dressed = seed.seaRows.supportRatiosDressed[L];
      const supply = seed.seaRows.radialSupplyFraction[L];
      assert.ok(Math.abs(dressed - (bare + supply)) < 1e-9);
    }
  } finally {
    selectTabledRow(1);
  }
});

test("Row 5 in-build credit: native booking anchors to the instrument on 6-axial x2, and true FCC-12 placement flips it (the 2026-07-09 run finding)", async () => {
  const m = await import("../scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs");
  const savedDirs = DECLARED.sea.fccDirections;
  try {
    selectTabledRow(5);
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
    // anchor: the native booking on the instrument's own 6-axial convention,
    // x2 count-scaled, reproduces the tabled credit 0.3172 (within the
    // regularizer-grade difference of the production booking)
    DECLARED.sea.fccDirections = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
    const sea6 = m.buildStaticPairSeaSites(sites);
    const seed6 = seedRecordEvaluation(sites, heldOnly, null, null, null, sea6);
    assert.ok(Math.abs(2 * seed6.seaRows.radialSupplyFraction.O - 0.3172) < 0.012);
    // the credit is polar-concentrated: the two on-axis sites carry it
    DECLARED.sea.fccDirections = [[0, 0, 1], [0, 0, -1]];
    const seaP = m.buildStaticPairSeaSites(sites);
    const seedP = seedRecordEvaluation(sites, heldOnly, null, null, null, seaP);
    assert.ok(seedP.seaRows.radialSupplyFraction.O > 0.15);
    // true FCC-12 placement has NO polar sites: the in-build credit flips
    // slightly negative and the dressed cap row leaves the corridor —
    // the Row 5 corridor gate must fail closed (measured -0.034; dressed
    // O ~ 0.643 vs [0.97, 1.03])
    DECLARED.sea.fccDirections = savedDirs;
    const sea12 = m.buildStaticPairSeaSites(sites);
    const seed12 = seedRecordEvaluation(sites, heldOnly, null, null, null, sea12);
    const credit = seed12.seaRows.radialSupplyFraction.O;
    assert.ok(Math.abs(credit - -0.0338) < 0.01);
    const dressedO = seed12.seaRows.supportRatiosDressed.O;
    assert.ok(dressedO < DECLARED.staticPairSea.corridor[0]);
  } finally {
    DECLARED.sea.fccDirections = savedDirs;
    selectTabledRow(1);
  }
});

test("Row 6 held cage: tabled V4 geometry, tilted-rail cadence, octahedral environment selected by the row", () => {
  try {
    selectTabledRow(6);
    assert.equal(DECLARED.candidateRow, 6);
    // Row 6's environment is part of the tabled row (held octahedral cage)
    assert.equal(DECLARED.staticPairSea.enabled, true);
    assert.equal(DECLARED.staticPairSea.placement, "octahedral6");
    assert.ok(Math.abs(DECLARED.staticPairSea.spacing - 1.645 * Math.SQRT2) < 1e-12);
    // tilted-rail cadence: omega = 1/cos(alpha_M) ~ 1.156, beta_M = 1 exact
    assert.ok(Math.abs(DECLARED.omega - 1 / Math.cos(deg(-30.16))) < 1e-12);
    assert.ok(Math.abs(DECLARED.omega - 1.156) < 1e-3);
    const sites = buildSites();
    const betas = {};
    for (const s of sites) betas[s.layer] = Math.hypot(...rigidVelocity(s, 0));
    assert.ok(Math.abs(betas.M - 1.0) < 1e-12);
    // all layers sub-field: speeds ~ 0.57 / 1.00 / 0.49 (packet Row 6)
    assert.ok(Math.abs(betas.I - 0.57) < 5e-3);
    assert.ok(Math.abs(betas.O - 0.49) < 5e-3);
  } finally {
    selectTabledRow(1);
    assert.equal(DECLARED.staticPairSea.enabled, false);
  }
});

test("Row 6 held cage: six sites at 2.326 (two polar, four equatorial), frozen antipodal pairs, Nt witness", async () => {
  const m = await import("../scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs");
  try {
    selectTabledRow(6);
    const sites = buildSites();
    const sea = m.buildStaticPairSeaSites(sites);
    assert.equal(sea.placement, "octahedral6");
    assert.equal(sea.shell.length, 6);
    assert.equal(sea.endpoints.length, 12);
    const polar = sea.shell.filter((s) => s.siteClass === "polar");
    const eq = sea.shell.filter((s) => s.siteClass === "equatorial");
    assert.equal(polar.length, 2);
    assert.equal(eq.length, 4);
    for (const s of sea.shell) {
      assert.ok(Math.abs(Math.hypot(...s.center) - 1.645 * Math.SQRT2) < 1e-9);
    }
    // polar sites on +-z exactly; equatorial in the plane
    for (const s of polar) assert.ok(Math.abs(s.center[0]) < 1e-12 && Math.abs(s.center[1]) < 1e-12);
    for (const s of eq) assert.ok(Math.abs(s.center[2]) < 1e-12);
    // p0 is the braid's OWN axial polarity dipole at V4 (in-build, not a knob):
    // |sum_layers 2 R sin alpha| ~ 1.088
    assert.ok(Math.abs(sea.p0 - m.braidAxialDipole(sites)) < 1e-15);
    assert.ok(Math.abs(sea.p0 - 1.088) < 2e-3);
    // antipodal unit-polarity pairs at +- p0/2 along frozen orientations
    for (let k = 0; k < 6; k += 1) {
      const plus = sea.endpoints[2 * k];
      const minus = sea.endpoints[2 * k + 1];
      assert.equal(plus.pol, 1);
      assert.equal(minus.pol, -1);
      assert.equal(plus.siteClass, sea.shell[k].siteClass);
      const sep = Math.hypot(
        plus.position[0] - minus.position[0],
        plus.position[1] - minus.position[1],
        plus.position[2] - minus.position[2]
      );
      assert.ok(Math.abs(sep - sea.p0) < 1e-12);
    }
    // binding obligation 2: orientation sampling witness (no aliased shortcut)
    const witness = m.buildStaticPairSeaSites(sites, DECLARED.staticPairSea.ntWitness);
    for (let k = 0; k < 6; k += 1) {
      const a = sea.shell[k].pHat;
      const b = witness.shell[k].pHat;
      const dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
      assert.ok((Math.acos(Math.max(-1, Math.min(1, dot))) * 180) / Math.PI < 0.5);
    }
  } finally {
    selectTabledRow(1);
  }
});

test("Row 6 seed record: bare rows on the V4 instrument anchors, in-build credit near tabled, corridor holds", async () => {
  const m = await import("../scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs");
  try {
    selectTabledRow(6);
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
    const sea = m.buildStaticPairSeaSites(sites);
    const seed = seedRecordEvaluation(sites, heldOnly, null, null, null, sea);
    // native seed vs the tabling instrument (OCTAHEDRAL_CAGE_V4, spec Section
    // 54 by title): closure 0.2474, bare support 0.9993/1.0061/0.5759
    assert.ok(Math.abs(seed.globalRelResidual - 0.2474) < 2e-3);
    const sup = seed.supportRatios.atFittedKappa;
    assert.ok(Math.abs(sup.I - 0.9993) < 0.02);
    assert.ok(Math.abs(sup.M - 1.0061) < 0.02);
    assert.ok(Math.abs(sup.O - 0.5759) < 0.02);
    // in-build CYCLE-AVERAGED sea rows near the tabled anchors
    // (+0.0013/-0.0100/+0.4178 — the Section 54 instrument convention);
    // totals near 1.0006/0.9961/0.9937 and inside the corridor. The
    // single-phase t=0 sample differs by the cage's 4-fold equatorial
    // ripple (reported, not gated).
    const cyc = m.cycleAveragedSeaRows(sites, sea.endpoints, seed.kappaStar, 16);
    assert.ok(Math.abs(cyc.rows.O - 0.4178) < 0.03, `cap credit off tabled: ${cyc.rows.O}`);
    assert.ok(Math.abs(cyc.rows.M - -0.01) < 0.02, `M sea row off tabled: ${cyc.rows.M}`);
    assert.ok(Math.abs(cyc.rows.I - 0.0013) < 0.02, `I sea row off tabled: ${cyc.rows.I}`);
    for (const L of ["I", "M", "O"]) {
      const dressed = sup[L] + cyc.rows[L];
      assert.ok(
        dressed >= DECLARED.staticPairSea.corridor[0] &&
          dressed <= DECLARED.staticPairSea.corridor[1],
        `dressed ${L} out of corridor: ${dressed}`
      );
    }
    // Nt witness on the cycle average (binding obligation 2)
    const cycW = m.cycleAveragedSeaRows(sites, sea.endpoints, seed.kappaStar, 32);
    for (const L of ["I", "M", "O"]) {
      assert.ok(Math.abs(cyc.rows[L] - cycW.rows[L]) < 5e-3);
    }
    // axis-declared split: the polar pair carries ~111% of the O credit
    const polar = m.cycleAveragedSeaRows(
      sites, sea.endpoints.filter((e) => e.siteClass === "polar"), seed.kappaStar, 16);
    assert.ok(Math.abs(polar.rows.O / cyc.rows.O - 1.11) < 0.06,
      `polar fraction off tabled 1.11: ${polar.rows.O / cyc.rows.O}`);
  } finally {
    selectTabledRow(1);
  }
});

test("Row 6 cage rows: honesty row reproduces the Section 55 strain, steric and axis rows are wired", async () => {
  const m = await import("../scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs");
  try {
    selectTabledRow(6);
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
    const sea = m.buildStaticPairSeaSites(sites);
    const seed = seedRecordEvaluation(sites, heldOnly, null, null, null, sea);
    // cage honesty at the held seed vs Section 55: polar -0.641 inward,
    // equatorial +0.09..0.15, torques ~0 (all over the corridor force scale)
    const honesty = m.cageHonestyRow(sea, sites, heldOnly, 0, seed.kappaStar);
    assert.ok(Math.abs(honesty.polarMeanFradOverNeedO - -0.641) < 0.05,
      `polar strain off declared: ${honesty.polarMeanFradOverNeedO}`);
    assert.ok(honesty.equatorialMeanFradOverNeedO > 0 && honesty.equatorialMeanFradOverNeedO < 0.2,
      `equatorial strain off declared band: ${honesty.equatorialMeanFradOverNeedO}`);
    assert.ok(honesty.maxTorqueOverNeedO < 0.02,
      `torque not ~0: ${honesty.maxTorqueOverNeedO}`);
    // steric declaration: closest approach ~0.8 (Section 54 caveat)
    const steric = m.stericSeedDeclaration(sea, sites);
    assert.ok(steric.closestApproachOverall > 0.5 && steric.closestApproachOverall < 1.1,
      `steric clearance off declared ~0.8: ${steric.closestApproachOverall}`);
    // axis row: the prescribed family is precession-free at the seed — the
    // best-fit rigid rotation vector is exactly +z at the tabled cadence
    const states = sites.map((s) => ({ x: rigidPosition(s, 0), v: rigidVelocity(s, 0) }));
    const axis = m.braidAxisRow(states);
    assert.ok(axis.axisTiltDeg < 1e-6, `seed axis tilted: ${axis.axisTiltDeg}`);
    assert.ok(Math.abs(axis.omegaFit - DECLARED.omega) < 1e-9);
  } finally {
    selectTabledRow(1);
  }
});

test("Row 7 bare V5: tabled geometry, tilted-rail cadence, NO environment, gate armed", () => {
  try {
    selectTabledRow(7);
    assert.equal(DECLARED.candidateRow, 7);
    // Row 7 is the bare self-equilibrated candidate: no environment of any kind
    assert.equal(DECLARED.staticPairSea.enabled, false);
    assert.equal(DECLARED.bareGate.enabled, true);
    // tilted-rail cadence: omega = 1/cos(alpha_M) ~ 1.0415, beta_M = 1 exact
    assert.ok(Math.abs(DECLARED.omega - 1 / Math.cos(deg(16.24))) < 1e-12);
    assert.ok(Math.abs(DECLARED.omega - 1.0415) < 1e-3);
    const sites = buildSites();
    const betas = {};
    for (const s of sites) betas[s.layer] = Math.hypot(...rigidVelocity(s, 0));
    assert.ok(Math.abs(betas.M - 1.0) < 1e-12);
    // all layers sub-field: speeds ~ 0.51 / 1.00 / 0.34 (packet Row 7)
    assert.ok(Math.abs(betas.I - 0.51) < 5e-3);
    assert.ok(Math.abs(betas.O - 0.34) < 5e-3);
  } finally {
    selectTabledRow(1);
    assert.equal(DECLARED.bareGate.enabled, false);
  }
});

test("Row 7 in-build stability gate: full Sections 57-59 gate re-derived, all checks pass, gauge-invariant release coupling", async () => {
  const m = await import("../scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs");
  try {
    selectTabledRow(7);
    const gate = m.bareStabilityGateInBuild();
    assert.ok(gate.pass, `gate failed: ${JSON.stringify(gate.checks)}`);
    for (const [k, v] of Object.entries(gate.checks)) assert.ok(v, `gate check failed: ${k}`);
    // binding obligation 2 (frozen-kappa discipline): the release coupling is
    // the gauge-invariant equilibrium value kappa_eq = kappa_fit/lambda =
    // 1/R_M(eq); R_M(eq) ~ 3.494 kappa*eps^2/c_f^2 (Section 58 Result 3;
    // consistent with the certificate gauge 0.4615 x 1.6125 orbit)
    assert.ok(Math.abs(gate.ReqOverKappa - 3.494) < 0.01, `ReqOverKappa: ${gate.ReqOverKappa}`);
    assert.ok(Math.abs(gate.kappaRelease - 1 / gate.ReqOverKappa) < 1e-12);
    assert.ok(Math.abs(gate.kappaRelease - 0.2862) < 1e-3);
    // radial basin at the release gauge (certificate spectrum scales as
    // lambda^2: 0.674 x (-0.63, -2.00, -6.27) ~ (-0.43, -1.36, -4.27))
    const spec = gate.equilibrium.railPinnedSpectrum;
    assert.ok(spec.every((v) => v < 0));
    assert.ok(Math.abs(spec[0] - -0.429) < 0.02 && Math.abs(spec[2] - -4.269) < 0.15);
    // tangential ledger at the re-derived equilibrium (anchors 0.0006/0.0004;
    // the middle's +0.227 rail pump is the escapement's, reported not gated)
    assert.ok(Math.abs(gate.tangential.tauI) < 0.002);
    assert.ok(Math.abs(gate.tangential.tauO) < 0.002);
    assert.ok(Math.abs(gate.tangential.railPumpM - 0.227) < 0.01);
    // tilt block: exact global null, restoring quotient spectrum (anchors
    // -0.1247/-0.7485 at the tabled shape; small shift at the re-derived shape)
    assert.ok(gate.tilt.globalModeResidual < 1e-9);
    assert.ok(gate.tilt.relativeEigen.every((e) => e.re < 0 && e.im === 0));
    assert.ok(Math.abs(gate.tilt.relativeEigen[0].re - -0.123) < 0.02);
    // the re-derived equilibrium shape is the tabled shape to <1% (correction
    // reported: the export rounds to 0.55/0.75)
    assert.ok(Math.abs(gate.equilibrium.shapeCorrectionVsTabled.qI) < 0.01);
    assert.ok(Math.abs(gate.equilibrium.shapeCorrectionVsTabled.qO) < 0.01);
    // closure metric openly disagrees with the ledgers (Section 58: ~0.425)
    assert.ok(Math.abs(gate.closureAtEquilibrium - 0.425) < 5e-3);
  } finally {
    selectTabledRow(1);
  }
});

test("Row 7 seed record: native stack validates the instrument at the release protocol (support = 1 by self-adjustment)", async () => {
  const m = await import("../scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs");
  try {
    selectTabledRow(7);
    const gate = m.bareStabilityGateInBuild();
    // release-only-from-the-re-derived-equilibrium: radii re-anchored in place
    DECLARED.layers = DECLARED.layers.map((L) =>
      L.name === "I"
        ? { ...L, R: gate.equilibrium.geo.qI }
        : L.name === "O"
          ? { ...L, R: gate.equilibrium.geo.qO }
          : { ...L }
    );
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
    const seed = seedRecordEvaluation(sites, heldOnly, null, gate.kappaRelease);
    // native bare-channel fit agrees with the instrument fit (validation anchor)
    assert.ok(Math.abs(seed.kappaStar - gate.kappaFitBareChannel) < 2e-3);
    assert.ok(Math.abs(seed.globalRelResidual - 0.4248) < 2e-3);
    // at the frozen release coupling the seed IS the equilibrium: support = 1
    // on every layer BY SELF-ADJUSTMENT (Section 58 Result 1, native stack)
    const sup = seed.supportRatios.atFrozenKappa;
    for (const L of ["I", "M", "O"]) {
      assert.ok(Math.abs(sup[L] - 1) < 5e-3, `support ${L} off equilibrium: ${sup[L]}`);
    }
    // at the fitted kappa the deficit is the pure dilation gauge (uniform ~lambda)
    const supF = seed.supportRatios.atFittedKappa;
    const vals = ["I", "M", "O"].map((L) => supF[L]);
    assert.ok(Math.max(...vals) - Math.min(...vals) < 5e-3, "dilation deficit not uniform");
    assert.ok(Math.abs(vals[1] - gate.lambda) < 0.01);
  } finally {
    selectTabledRow(1);
  }
});

test("Row 8 marginal-stratum row: seed identical to Row 7, gate armed, stratum-map block declared, no environment", () => {
  try {
    selectTabledRow(8);
    assert.equal(DECLARED.candidateRow, 8);
    // seed IDENTICAL to Row 7 (packet Row 8): geometry aliases the Row 7 table
    assert.equal(DECLARED.layers, TABLED_ROWS[7]);
    assert.equal(DECLARED.bareGate.enabled, true);
    assert.equal(DECLARED.row8.enabled, true);
    assert.equal(DECLARED.staticPairSea.enabled, false);
    assert.ok(Math.abs(DECLARED.omega - 1 / Math.cos(deg(16.24))) < 1e-12);
    // the declared stratum grid spans [0.005, 0.08], log-spaced, >= 6 cells
    const g = DECLARED.row8.stratumGrid;
    assert.ok(g.length >= 6);
    assert.ok(Math.abs(g[0] - 0.005) < 1e-12 && Math.abs(g[g.length - 1] - 0.08) < 1e-12);
    for (let k = 0; k + 2 < g.length; k += 1) {
      const r1 = g[k + 1] / g[k];
      const r2 = g[k + 2] / g[k + 1];
      assert.ok(Math.abs(r1 - r2) / r1 < 0.01, "grid not log-spaced");
    }
    // the packet pump constant and the marginal target are declared
    assert.ok(Math.abs(DECLARED.row8.pumpDeclared - 0.2274) < 1e-12);
    assert.equal(DECLARED.row8.marginalTarget, 1.0);
  } finally {
    selectTabledRow(1);
    assert.equal(DECLARED.row8.enabled, false);
    assert.equal(DECLARED.bareGate.enabled, false);
  }
});

test("Row 8 stratum-map cell: soft reference books zero absorption; chart cell books the same-source channel; regulators restored", async () => {
  const m = await import("../scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs");
  try {
    selectTabledRow(8);
    const kappaEq = 0.28623; // frozen gauge-invariant release coupling (wiring test)
    const savedRc = DECLARED.coincidenceStratum;
    const savedChart = DECLARED.chart.enabled;
    const savedDt = DECLARED.timeStep;
    // canonical soft booking = the zero-absorption reference
    const soft = m.stratumMapCell({ rhoC: null, kappa: kappaEq, rotations: 0.02 });
    assert.equal(soft.booking, "canonical_soft_pointwise");
    assert.equal(soft.bookedSteps, 0);
    assert.ok(Math.abs(soft.absorbedPumpFractionPerRotation) === 0);
    assert.ok(Number.isFinite(soft.railResidence.fractionInBand));
    assert.ok(Number.isFinite(soft.railResidence.betaMClimbRatePerUnitTime));
    // chart cell at a grid stratum: the same-source channel books, absorbed
    // fraction is finite, witness rows are booked on crossing events
    const cell = m.stratumMapCell({ rhoC: 0.050397, kappa: kappaEq, rotations: 0.02 });
    assert.equal(cell.booking, "chart_d0_stratum");
    assert.ok(cell.bookedSteps > 0);
    assert.ok(Number.isFinite(cell.absorbedPumpFractionPerRotation));
    assert.ok(Number.isFinite(cell.clicksPerRotation));
    // regulator restoration (the cell must not leak its booking into DECLARED)
    assert.equal(DECLARED.coincidenceStratum, savedRc);
    assert.equal(DECLARED.chart.enabled, savedChart);
    assert.equal(DECLARED.timeStep, savedDt);
    // dt-halving wiring: dtFactor scales the cell's integration step
    const half = m.stratumMapCell({ rhoC: 0.050397, kappa: kappaEq, rotations: 0.01, dtFactor: 0.5 });
    assert.ok(Math.abs(half.dt - savedDt * 0.5) < 1e-15);
    assert.equal(DECLARED.timeStep, savedDt);
  } finally {
    selectTabledRow(1);
  }
});

test("Row 8 marginal-cell locator: log-interpolated crossing from above, scoped-negative bookkeeping", async () => {
  const m = await import("../scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs");
  // the Row 7 regime-map shape: absorption decreases with rho_c
  const rows = [
    { rhoC: 0.02, absorbedPumpFractionPerRotation: 2.1 },
    { rhoC: 0.032, absorbedPumpFractionPerRotation: 1.4 },
    { rhoC: 0.05, absorbedPumpFractionPerRotation: 0.7 },
  ];
  const hit = m.locateMarginalStratum(rows, 1.0);
  assert.equal(hit.found, true);
  assert.ok(hit.rhoCStar > 0.032 && hit.rhoCStar < 0.05);
  assert.deepEqual(hit.bracket, [0.032, 0.05]);
  // log-linear interpolation: exact on the synthetic bracket
  const [f0, f1] = hit.bracketFractions;
  const expected = Math.exp(
    Math.log(0.032) + ((1.0 - f0) * (Math.log(0.05) - Math.log(0.032))) / (f1 - f0)
  );
  assert.ok(Math.abs(hit.rhoCStar - expected) < 1e-15);
  // no crossing in span = the scoped-negative branch (booked honestly upstream)
  const over = m.locateMarginalStratum(
    rows.map((r) => ({ ...r, absorbedPumpFractionPerRotation: r.absorbedPumpFractionPerRotation + 2 })),
    1.0
  );
  assert.equal(over.found, false);
  assert.equal(over.note, "all_cells_over_absorb");
});

test("impulse-resolved booking: declared regulator block, guarded kernel, poised-window ghost regression", async () => {
  const m = await import("../scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs");
  // declared regulator-honesty block (Sections 62/63 follow-up instrument)
  const P = DECLARED.chart.impulse;
  assert.ok(P.atol > 0 && P.rtol > 0 && P.dsGuard > 0);
  assert.ok(P.dsGuard < DECLARED.soft, "tangency guard must sit below the canonical soft");
  assert.ok(P.witnessTolFactor < 1 && P.witnessGuardFactor < 1);
  // extended re-map span + tilt projection anchors are declared on row8
  const ext = DECLARED.row8.impulseSpanExtension;
  assert.ok(ext.length >= 1 && Math.abs(ext[ext.length - 1] - 0.112) < 1e-12);
  assert.ok(Math.abs(DECLARED.row8.tiltProjection.dStarIsotropic - 1.02) < 1e-12);
  assert.ok(DECLARED.row8.tiltProjection.tReadBase > 2.0, "readout base must clear the same-source chart delay cap");
  try {
    selectTabledRow(8);
    DECLARED.chart.enabled = true;
    const savedRc = DECLARED.coincidenceStratum;
    DECLARED.coincidenceStratum = 0.05;
    const sites = buildSites();
    const histories = sites.map((s) => ({
      site: s,
      ts: [0],
      xs: [rigidPosition(s, 0)],
      vs: [rigidVelocity(s, 0)],
      maxRadiusSeen: Math.hypot(s.rho, s.z0),
      positionAt: (tE) => (tE <= 0 ? rigidPosition(s, tE) : rigidPosition(s, 0).map((c, k) => c + rigidVelocity(s, 0)[k] * tE)),
      segment: (k) => ({ t: 0, x: rigidPosition(s, 0), v: rigidVelocity(s, 0) }),
    }));
    const i = sites.findIndex((s) => s.id === "M+");
    const booking = m.chartWindowIntegrate({
      histories,
      sites,
      i,
      t0: 0,
      dt: DECLARED.timeStep,
      x0: rigidPosition(sites[i], 0),
      v0: rigidVelocity(sites[i], 0),
      aFrozen: [0, 0, 0],
      kappa: 0.28623,
      });
    // ghost regression: the release-instant poised window books ~ZERO under
    // the guarded kernel (the refined uniform ladder's limit), not the
    // O(1e-2) tangency-noise artifact of unguarded event sampling
    assert.ok(Math.hypot(...booking.dv) < 1e-8, `poised window booked ${Math.hypot(...booking.dv)}`);
    assert.equal(booking.quadrature.unconverged, false);
    assert.equal(booking.quadrature.scheme, "adaptive_embedded_euler_trapezoid_event_localized_guarded");
    assert.ok(Array.isArray(booking.clickEvents));
    // per-event rows carry time/kind/impulse
    for (const ev of booking.clickEvents) {
      assert.ok(["root_birth", "root_death"].includes(ev.kind));
      assert.ok(Array.isArray(ev.impulse) && ev.impulse.length === 3);
    }
    DECLARED.coincidenceStratum = savedRc;
    DECLARED.chart.enabled = false;
  } finally {
    selectTabledRow(1);
  }
});

test("impulse-resolved stratum cell: perClick stats booked, witness carries guard metadata", async () => {
  const m = await import("../scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs");
  try {
    selectTabledRow(8);
    const cell = m.stratumMapCell({ rhoC: 0.050397, kappa: 0.28623, rotations: 0.02 });
    assert.ok(cell.perClick != null);
    assert.ok(Number.isFinite(cell.perClick.events));
    if (cell.perClick.events > 0) {
      assert.ok(Number.isFinite(cell.perClick.meanTangentialImpulse));
      assert.ok(Number.isFinite(cell.perClick.eventsPerRotation));
    }
    assert.ok(Number.isFinite(cell.absorbedPumpFractionPerRotation));
  } finally {
    selectTabledRow(1);
  }
});

test("escapement-under-tilt projection: prescribed family wired, torque response finite, conventions declared", async () => {
  const m = await import("../scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs");
  try {
    selectTabledRow(8);
    const savedRc = DECLARED.coincidenceStratum;
    const savedChart = DECLARED.chart.enabled;
    const row = m.escapementUnderTiltProjection({ kappa: 0.28623, rhoC: 0.05, readouts: 2 });
    // regulator restoration
    assert.equal(DECLARED.coincidenceStratum, savedRc);
    assert.equal(DECLARED.chart.enabled, savedChart);
    assert.ok(Number.isFinite(row.PclickXX));
    assert.ok(Number.isFinite(row.baselineTx));
    assert.ok(Math.abs(row.dStarIsotropic - 1.02) < 1e-12);
    assert.ok(row.convention.includes("anti-damping"));
    // damping supply fraction is only nonzero when the diagonal is negative
    if (row.PclickXX >= 0) assert.equal(row.dampingSupplyFractionOfDStar, 0);
    else assert.ok(row.dampingSupplyFractionOfDStar > 0);
  } finally {
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

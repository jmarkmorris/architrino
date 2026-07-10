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

import test from "node:test";
import assert from "node:assert/strict";

import {
  SCHEMA,
  FAIL_CLOSED,
  DECLARED,
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

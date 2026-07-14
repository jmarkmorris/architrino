import assert from "node:assert/strict";
import test from "node:test";

import {
  FULL_DOF_STACKED_TILTED_SCHEMA,
  controlReproduction,
  evaluateFullDofPoint,
  fullDofStackedTiltedBraid,
  measureFullDofRecord,
  normalizeFullDofConfig,
  randomNoTiltExploration,
  section98FullDofSearch,
} from "../scripts/braid-ideal/full-dof-stacked-tilted-braid.mjs";
import { FULL_DOF_STACKED_TILTED_FIXTURE as FIXTURE } from "../scripts/braid-ideal/full-dof-stacked-tilted-braid-fixture.mjs";

let cached;
function report() { return cached ??= fullDofStackedTiltedBraid(); }
let cached98;
function report98() { return cached98 ??= section98FullDofSearch(); }
let cachedNoTilt;
function noTiltReport() { return cachedNoTilt ??= randomNoTiltExploration(); }

test("§97 accepts one config schema for the flat and tilted corners", () => {
  const flat = normalizeFullDofConfig(FIXTURE.flatControl);
  const spindle = normalizeFullDofConfig(FIXTURE.spindleControl);
  assert.equal(flat.rings.every((r) => r.tilt === 0), true);
  assert.equal(spindle.rings.some((r) => r.tilt !== 0), true);
  assert.equal(flat.rings.length, 3);
  assert.equal(spindle.rings.length, 3);
  assert.equal(flat.payload.type, "none");
  assert.equal(spindle.sea.enabled, false);
});

test("§97 reproduces the §96 and tilted-spindle controls", () => {
  const c = controlReproduction();
  assert.equal(c.flat.passes, true);
  assert.equal(c.spindle.passes, true);
  assert.ok(Math.abs(c.flat.generalized.binding.relativeClosureResidual - 0.04922985482410258) < 1e-9);
  assert.ok(Math.abs(c.flat.generalized.pump.netSecularAxialTorque - 13.376219577754473) < 1e-9);
  assert.ok(Math.abs(c.flat.generalized.stability.flutterLeadingRe - 0.7354151803988713) < 1e-9);
  assert.ok(Math.abs(c.spindle.generalized.pump.netSecularAxialTorque - 0.4240300292341333) < 1e-9);
  assert.ok(Math.abs(c.spindle.generalized.stability.flutterLeadingRe - 0.19885688497216406) < 1e-9);
});

test("§98 pins the no-controlFamily generalized pencil on both known geometries", () => {
  const c = report98().controls;
  assert.equal(c.generalizedPencilKnownAnswers.spindle.passes, true);
  assert.equal(c.generalizedPencilKnownAnswers.flat.passes, true);
  assert.ok(Math.abs(c.generalizedPencilKnownAnswers.spindle.actual.leadingRe - 0.66928185985594) < 1e-12);
  assert.ok(Math.abs(c.generalizedPencilKnownAnswers.spindle.actual.flutterLeadingRe - 0.16020715030587) < 1e-12);
  assert.equal(c.generalizedPencilKnownAnswers.spindle.actual.unstableCount, 8);
  assert.ok(Math.abs(c.generalizedPencilKnownAnswers.flat.actual.leadingRe - 1.9851829825890848) < 1e-12);
  assert.ok(Math.abs(c.generalizedPencilKnownAnswers.flat.actual.flutterLeadingRe - 0.5847274223758064) < 1e-12);
  assert.equal(c.generalizedPencilKnownAnswers.flat.actual.unstableCount, 5);
});

test("§98 exposes the specialized-corner discrepancy and labels search spectra as coarse screens", () => {
  const c = report98().controls.correctedSearchPencil;
  assert.ok(Math.abs(c.cornerDiscrepancy.spindleValidatedLeadingRe - 0.19885688497216406) < 1e-12);
  assert.ok(Math.abs(c.cornerDiscrepancy.spindleCorrectedLeadingRe - 0.6307311702346153) < 1e-12);
  assert.equal(c.spindle.pencilMode, "gyroscopic_family");
  assert.equal(c.spindle.cornerComparable, false);
  assert.match(c.spindle.claimLevel, /coarse_generalized_screen/);
});

test("§97 activates production same-source roots on supra-field rows", () => {
  const c = structuredClone(FIXTURE.spindleControl);
  delete c.controlFamily;
  c.couplingFit = "radial";
  c.includeSelfHits = true;
  c.rings[1].omega = 1.2 / Math.abs(c.rings[1].radius * Math.cos(c.rings[1].tilt));
  const r = evaluateFullDofPoint({ config: c, includeStability: false });
  assert.ok(r.record.selfRootCount > 0);
  assert.match(r.record.recordKind, /production_moving_circular_roots/);
  const rate = measureFullDofRecord({ config: c, qDot: Array(6).fill(0.01), dynamicRateRecord: true, cycleSamples: 1 });
  assert.ok(rate.selfRootCount > 0);
  assert.match(rate.recordKind, /production_retained_linear_segments/);
});

test("§97 staged search reports exact coverage and stays fail-closed", () => {
  const r = report();
  assert.equal(r.schema, FULL_DOF_STACKED_TILTED_SCHEMA);
  assert.equal(r.sharedRecord.centralSolverTouched, false);
  assert.equal(r.search.evaluatedPointCount, 105);
  assert.equal(r.search.shortlist.length, 3);
  assert.deepEqual(r.search.persistentBlockersOnFullyScoredShortlist, ["bind", "pump", "flutter"]);
  assert.equal(r.search.supraFieldSelfHitWitness.rows, 6);
  assert.equal(r.search.supraFieldSelfHitWitness.rowsWithSelfRoots, 6);
  assert.equal(r.search.best.result.gates.closes, false);
  assert.ok(r.search.best.result.objective > 0);
  assert.equal(r.pair.gated, true);
  assert.equal(r.payload.gated, true);
  assert.equal(r.releaseGate.nativeRetainedHistoryReleaseAuthorized, false);
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
});

test("§97 exposes optional DOFs without silently activating them", () => {
  const r = report();
  for (const key of ["eccentricity", "breathingAmplitude", "axisMisalignment", "axialModeAmplitude", "chargeCount=3"]) {
    assert.ok(r.exposedButDefaultedOff.includes(key));
  }
  assert.ok(r.search.coverage.unswept.includes("ambient-sea response"));
  assert.ok(r.search.coverage.unswept.includes("payload internal configurations"));
});

test("§98 jointly varies radii and gaps and defers pump at the single-triple gate", () => {
  const r = report98().jointOptimization;
  assert.equal(r.optimizer, "bounded_nelder_mead");
  assert.equal(r.branches, 24);
  assert.ok(r.evaluations >= 600);
  assert.ok(r.continuousCoordinates.includes("R_i"));
  assert.ok(r.continuousCoordinates.includes("z_i"));
  assert.equal(r.discreteCoverage.orders.length, 6);
  assert.equal(r.discreteCoverage.speedRegimes.length, 3);
  assert.ok(Math.abs(r.growthFloorAcrossCoarseBranchMinima - 0.019797800802254524) < 1e-12);
  assert.equal(r.nonpositiveGrowthBranchMinima, 0);
  assert.equal(r.accepted.gates.bind, false);
  assert.equal(r.accepted.gates.flutterFree, false);
  assert.ok(Math.abs(r.accepted.pump.netSecularAxialTorque) > 0.02, "pump is recorded but does not decide the triple gate");
  assert.equal(r.triplePasses, r.accepted.gates.bind && r.accepted.gates.flutterFree);
});

test("§98 convergence uses 3, 6, 12, and 24 samples and accepts the 24-sample verdict", () => {
  const r = report98().jointOptimization;
  assert.deepEqual(r.convergence.map((x) => x.samples), [3, 6, 12, 24]);
  assert.deepEqual(r.accepted, r.convergence.at(-1));
  assert.ok(r.convergence.every((x) => x.stability.leadingRe > 0));
});

test("§98 random scan exercises the full exposed schema and fail-closes coarse mirages", () => {
  const r = report98().randomExploration;
  assert.equal(r.points, 100);
  assert.equal(r.distribution.bind, 1);
  assert.equal(r.distribution.flutterFree, 0);
  assert.equal(r.distribution.pumpFree, 11);
  assert.equal(r.distribution.jointlyBindPumpFlutter, 0);
  assert.equal(r.distribution.finiteSpectrumScores + r.distribution.failClosedNonfiniteSpectrumScores, 100);
  assert.equal(r.coverage.discrete.axialOrdersObserved.length, 6);
  assert.deepEqual(r.coverage.discrete.chargeCount, [2, 3]);
  assert.deepEqual(r.coverage.discrete.seaEnabled, [false, true]);
  assert.equal(r.bestProbeConvergence.binding.at(-1).gates.bind, false);
  assert.equal(r.bestProbeConvergence.flutter.at(-1).gates.flutterFree, false);
});

test("§98 gates pair, payload, and native release on a converged binding flutter-free triple", () => {
  const r = report98();
  assert.equal(r.jointOptimization.triplePasses, false);
  assert.equal(r.pair.gated, true);
  assert.equal(r.payload.gated, true);
  assert.equal(r.releaseGate.nativeRetainedHistoryReleaseAuthorized, false);
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
});

test("§98 no-tilt continuation pins 1,000 deterministic samples and keeps every alpha at zero", () => {
  const r = noTiltReport(), expected = FIXTURE.section98.noTiltRandomKnownAnswers;
  assert.equal(r.points, 1000);
  assert.equal(r.constraints.allRingTiltsZero, true);
  assert.deepEqual(r.coverage.observedRanges.tilt, [0, 0]);
  assert.deepEqual(r.distribution, expected.distribution);
  assert.equal(r.best.binding.index, expected.bestBinding.index);
  assert.ok(Math.abs(r.best.binding.binding.coupling - expected.bestBinding.coupling) < 1e-12);
  assert.ok(Math.abs(r.best.binding.binding.relativeClosureResidual - expected.bestBinding.residual) < 1e-12);
  assert.equal(r.best.flutter.index, expected.bestFlutter.index);
  assert.ok(Math.abs(r.best.flutter.stability.leadingRe - expected.bestFlutter.leadingRe) < 1e-12);
  assert.equal(r.best.pump.index, expected.bestPump.index);
  assert.ok(Math.abs(Math.abs(r.best.pump.pump.netSecularAxialTorque) - expected.bestPump.absoluteTorque) < 1e-12);
  assert.equal(r.best.joint.index, expected.bestJoint.index);
  assert.ok(Math.abs(r.best.joint.jointObjective - expected.bestJoint.objective) < 1e-12);
  assert.equal(r.bestProbeConvergence.binding.at(-1).gates.bind, false);
  assert.equal(r.bestProbeConvergence.flutter.at(-1).gates.flutterFree, false);
});

import assert from "node:assert/strict";
import test from "node:test";

import {
  PLANAR_ASSEMBLED_FREE_PARTICLE_SCHEMA,
  buildSection99Payload,
  planarAssembledFreeParticleCompletion,
  planarPencilAnalyticAnchor,
  section99CoordinateNames,
  section99PairConfiguration,
} from "../scripts/braid-ideal/planar-assembled-free-particle.mjs";

let cached;
function report() { return cached ??= planarAssembledFreeParticleCompletion(); }

test("§99 validates the symmetric instantaneous planar pencil against the analytic eigenpair", () => {
  const anchor = planarPencilAnalyticAnchor();
  assert.equal(anchor.passes, true);
  assert.ok(anchor.error < 1e-9);
  assert.ok(Math.abs(anchor.actualLeading.re) < 1e-9);
});

test("§99 models the complete pair directly and carries every declared assembly coordinate", () => {
  const photon = section99PairConfiguration(0);
  const electron = section99PairConfiguration(0);
  electron.object = "electron";
  electron.payload = { arrangement: "two_triangles", mode: "counter_rotating", scaleFactor: 1 };
  assert.deepEqual(section99CoordinateNames(photon), ["relative_phase", "pocket_width", "R_pro_I", "R_pro_M", "R_pro_O", "R_anti_I", "R_anti_M", "R_anti_O"]);
  assert.deepEqual(section99CoordinateNames(electron).slice(-3), ["payload_radius", "payload_half_split", "payload_phase"]);
  assert.equal(buildSection99Payload(electron).length, 6);
  assert.ok(buildSection99Payload(electron).every((site) => site.chargeUnits === -1 && site.polarity === -1));
});

test("§99 replays §92, §93, and §95 controls and keeps the central solver untouched", () => {
  const r = report();
  assert.equal(r.schema, PLANAR_ASSEMBLED_FREE_PARTICLE_SCHEMA);
  assert.equal(r.validation.controls.allPass, true);
  assert.equal(r.validation.magnitudesAdjudicationEligible, true);
  assert.equal(r.sharedRecord.centralSolverTouched, false);
  assert.equal(r.object.isolatedTripleGate, false);
});

test("§99 reports exact photon and electron coverage, including every explicit payload family", () => {
  const r = report();
  assert.equal(r.coverage.photon.evaluatedConfigurations, 60);
  assert.equal(r.coverage.electron.evaluatedConfigurations, 320);
  assert.deepEqual(r.coverage.electron.payloadArrangements, ["column", "ring", "octahedron", "two_triangles"]);
  assert.deepEqual(r.coverage.electron.payloadModes, ["static", "co_rotating", "counter_rotating"]);
  assert.deepEqual(r.coverage.shared.occupancies, ["2-2-2", "3-2-3"]);
  assert.deepEqual(r.coverage.shared.orderings, ["pro_pocket_anti", "anti_pocket_pro"]);
  assert.equal(r.coverage.shared.notExercised.includes("constitutive Noether sea"), true);
});

test("§99 continues one photon geometry toward field speed and one electron rest branch through boosts", () => {
  const r = report();
  assert.deepEqual(r.photon.continuation.map((row) => row.drift), [0, 0.9, 0.99, 0.999, 0.9999]);
  assert.deepEqual(r.electron.continuation.map((row) => row.drift), [0, 0.25, 0.5, 0.75]);
  assert.equal(r.electron.sameRestBranchBoosted, true);
  assert.ok(r.electron.continuation.every((row) => row.chargeInE === -1));
  assert.ok(r.photon.continuation.every((row) => row.chargeInE === 0));
});

test("§99 remains fail-closed because neither planar assembly binds, locks, and stabilizes together", () => {
  const r = report();
  assert.equal(r.photon.recovered, false);
  assert.equal(r.electron.recovered, false);
  assert.ok(r.photon.continuation.every((row) => row.gates.fullAssemblyPass === false));
  assert.ok(r.electron.continuation.every((row) => row.gates.fullAssemblyPass === false));
  assert.equal(r.gates.nativeRetainedHistoryReleaseAuthorized, false);
  assert.equal(r.decision, "neither_planar_assembly_closes_in_declared_geometry_payload_and_proxy_sea_coverage");
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
});

test("§99 converges the confirmatory tilt sweep and keeps cap and chirality claims out of scope", () => {
  const r = report();
  assert.ok(r.planarityTest.photon.every((row) => row.cycleSamples === 12));
  assert.ok(r.planarityTest.electron.every((row) => row.cycleSamples === 12));
  assert.equal(r.planarityTest.planarPreferred, true);
  assert.equal(r.planarityTest.capClaimAuthorized, false);
  assert.match(r.chiralityBoundary, /cap-free planar model does not adjudicate/);
  assert.match(r.seaBoundary, /does not adjudicate the constitutive Noether sea law/);
});

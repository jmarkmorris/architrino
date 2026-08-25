import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  buildAdaptiveBackgroundExistencePacket,
  evaluateAssemblyWorldline,
} from "../scripts/mapping-electromagnetism/adaptive-cubic-background-packet.mjs";

const PERIOD = 2 * Math.PI;
const SEGMENTS_PER_PERIOD = 64;

function vectorAdd(left, right) {
  return left.map((entry, index) => entry + right[index]);
}

function vectorScale(value, factor) {
  return value.map((entry) => entry * factor);
}

function hermiteSegment(start, end, left, right) {
  const duration = end - start;
  return {
    startTime: String(start),
    endTime: String(end),
    coefficients: [0, 1, 2].map((axis) => {
      const displacement = right.position[axis] - left.position[axis];
      return [
        left.position[axis],
        left.velocity[axis],
        (3 * displacement / duration - 2 * left.velocity[axis] -
          right.velocity[axis]) / duration,
        (-2 * displacement / duration + left.velocity[axis] +
          right.velocity[axis]) / duration ** 2,
      ].map(String);
    }),
    positionErrors: ["2e-8", "2e-8", "2e-8"],
    velocityErrors: ["5e-5", "5e-5", "5e-5"],
    positionError: "2e-8",
    velocityError: "5e-5",
  };
}

function orientation(label) {
  const index = (label[0] + 3 * label[1] + 9 * label[2]) % 3;
  return [
    { p: [1, 0, 0], q: [0, 1, 0], normal: [0, 0, 1] },
    { p: [0, 1, 0], q: [0, 0, 1], normal: [1, 0, 0] },
    { p: [0, 0, 1], q: [1, 0, 0], normal: [0, 1, 0] },
  ][index];
}

function analyticState(label, time, driftRate) {
  const center = label.map((value) => value - 1);
  const basis = orientation(label);
  const orbit = vectorScale(vectorAdd(
    vectorScale(basis.p, Math.cos(time)),
    vectorScale(basis.q, Math.sin(time))), 0.05);
  const orbitVelocity = vectorScale(vectorAdd(
    vectorScale(basis.p, -Math.sin(time)),
    vectorScale(basis.q, Math.cos(time))), 0.05);
  return {
    position: vectorAdd(vectorAdd(center, orbit), [driftRate * time, 0, 0]),
    velocity: vectorAdd(orbitVelocity, [driftRate, 0, 0]),
  };
}

function makeWorldline(label, driftRate) {
  const polarity = label.reduce((sum, value) => sum + value, 0) % 2 === 0
    ? 1 : -1;
  const id = `g${label.join("_")}${polarity > 0 ? "+" : "-"}`;
  const segments = [];
  const step = PERIOD / SEGMENTS_PER_PERIOD;
  for (let index = -SEGMENTS_PER_PERIOD; index < SEGMENTS_PER_PERIOD; index += 1) {
    const start = index * step;
    const end = (index + 1) * step;
    segments.push(hermiteSegment(start, end,
      analyticState(label, start, driftRate),
      analyticState(label, end, driftRate)));
  }
  return {
    id,
    pathKey: 1,
    polarity,
    coverageStart: String(-PERIOD),
    coverageEnd: String(PERIOD),
    interpolation: "certified-piecewise-cubic-v0",
    historyFingerprint: `analytic-circle-${id}-${driftRate}`,
    declaredPrehistorySegmentCount: SEGMENTS_PER_PERIOD,
    evolvedSegmentCount: SEGMENTS_PER_PERIOD,
    segments,
  };
}

function writeFixture({ driftRate = 0, boundaryStatus = "periodic_exact" } = {}) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "adaptive-cubic-packet-"));
  const worldlines = [];
  for (let x = 0; x < 3; x += 1) {
    for (let y = 0; y < 3; y += 1) {
      for (let z = 0; z < 3; z += 1) {
        worldlines.push(makeWorldline([x, y, z], driftRate));
      }
    }
  }
  worldlines.forEach((worldline, index) => {
    worldline.pathKey = index + 1;
  });
  fs.writeFileSync(path.join(directory, "run-manifest.json"), JSON.stringify({
    schema: "eom_attractor_ensemble_run_manifest/v1",
    runId: `analytic-adaptive-${driftRate}`,
    seedFamily: "adaptive-site-local-analytic-fixture-v1",
    population: worldlines.length,
    requestedEndTime: PERIOD,
    acceptedEndTime: String(PERIOD),
    status: "completed",
    releaseRootClearance: "certified_complete",
    modelFingerprint: "analytic-fixture-model",
    adaptiveCubicMediumCoordinate: { spacing: 1, boundaryStatus },
  }));
  fs.writeFileSync(path.join(directory, "assembly-view-record.json"), JSON.stringify({
    schema: "assembly-view-record.v0",
    provenance: {
      engineId: "eom-solver",
      claimGrade: "evolved-record",
      recordAuthority: "analytic-fixture-not-physical-evidence",
    },
    worldlines,
  }));
  fs.writeFileSync(path.join(directory, "census.jsonl"), `${JSON.stringify({
    time: String(PERIOD),
    minPairDistanceInChunk: 0.9,
    maxSpeed: 0.051,
    engine: { status: "completed", rejectedSteps: 0 },
  })}\n`);
  return directory;
}

const OPTIONS = {
  period: PERIOD,
  returnWindow: PERIOD,
  returnTolerance: 2e-4,
  chartTolerance: 1e-6,
  clearanceFloor: 0.05,
  historySamples: 33,
  planeConditioningFloor: 1e-8,
  gapFloor: 1e-6,
  independentReturnVerification: {
    status: "verified",
    independence: "independent_of_subject_consumer",
    kind: "analytic_closed_form_circular_history",
    fingerprint: "test-analytic-circle-v1",
  },
};

test("piecewise-cubic evaluator follows the declared local polynomial", () => {
  const worldline = {
    id: "g0_0_0+",
    polarity: 1,
    coverageStart: "0",
    coverageEnd: "1",
    segments: [{
      startTime: "0",
      endTime: "1",
      coefficients: [["1", "2", "3", "4"], ["0", "0", "0", "0"],
        ["0", "0", "0", "0"]],
      positionErrors: ["1e-9", "1e-9", "1e-9"],
      velocityErrors: ["2e-9", "2e-9", "2e-9"],
    }],
  };
  const evaluated = evaluateAssemblyWorldline(worldline, 0.5);
  assert.ok(Math.abs(evaluated.position[0] - 3.25) < 1e-14);
  assert.ok(Math.abs(evaluated.velocity[0] - 8) < 1e-14);
});

test("analytic site-local circles pass the structural background-return packet", () => {
  const packet = buildAdaptiveBackgroundExistencePacket(writeFixture(), OPTIONS);
  assert.equal(packet.decision,
    "adaptive_background_accepted_for_directional_source_receiver_campaign");
  assert.equal(packet.historyReturn.decision, "history_return_accepted");
  assert.equal(packet.neighborLedger.decision, "no_reclassification");
  assert.equal(packet.siteLocal.beforeAnalysis.allNeighborRanksCertified, true);
  assert.ok(packet.orientation.before.maximumOrderTensorMagnitude < 1e-10);
  const centerMember = packet.siteLocal.before.members.find((row) =>
    row.id === "g1_1_1-");
  assert.ok(Math.hypot(...centerMember.siteHistory.center) < 1e-10);
});

test("analytic common drift falsifies identity history return", () => {
  const packet = buildAdaptiveBackgroundExistencePacket(
    writeFixture({ driftRate: 1e-3 }), { ...OPTIONS, chartTolerance: 1e-2 });
  assert.equal(packet.decision, "adaptive_background_history_return_rejected");
  assert.equal(packet.historyReturn.decision, "history_return_rejected");
  assert.ok(packet.historyReturn.maximumPositionLower > 1e-3);
  assert.equal(packet.responseRows, "not_run");
});

test("finite boundary blocks a numerically returning fixture", () => {
  const packet = buildAdaptiveBackgroundExistencePacket(
    writeFixture({ boundaryStatus: "finite_replicated_diagnostic" }), OPTIONS);
  assert.equal(packet.decision, "adaptive_background_blocked");
  assert.ok(packet.blockers.includes("boundary_closed"));
  assert.equal(packet.historyReturn.decision, "history_return_accepted");
});

test("continuous enclosure catches an excursion between sparse witness samples", () => {
  const directory = writeFixture();
  const assemblyPath = path.join(directory, "assembly-view-record.json");
  const assembly = JSON.parse(fs.readFileSync(assemblyPath, "utf8"));
  const worldline = assembly.worldlines[0];
  const firstEvolved = worldline.declaredPrehistorySegmentCount + 15;
  const leftSegment = worldline.segments[firstEvolved];
  const rightSegment = worldline.segments[firstEvolved + 1];
  const start = Number(leftSegment.startTime);
  const middle = Number(leftSegment.endTime);
  const end = Number(rightSegment.endTime);
  const label = [0, 0, 0];
  const left = analyticState(label, start, 0);
  const displacedMiddle = analyticState(label, middle, 0);
  displacedMiddle.position[0] += 1e-2;
  const right = analyticState(label, end, 0);
  worldline.segments[firstEvolved] = hermiteSegment(
    start, middle, left, displacedMiddle);
  worldline.segments[firstEvolved + 1] = hermiteSegment(
    middle, end, displacedMiddle, right);
  fs.writeFileSync(assemblyPath, JSON.stringify(assembly));

  const packet = buildAdaptiveBackgroundExistencePacket(directory, {
    ...OPTIONS,
    historySamples: 3,
  });
  assert.equal(packet.historyReturn.decision, "history_return_rejected");
  assert.ok(packet.historyReturn.maximumPositionLower > 1e-3);
});

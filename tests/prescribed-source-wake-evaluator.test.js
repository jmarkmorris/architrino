import fs from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

import {
  EXACT_PRESCRIBED_SOURCE_RECORD_SCHEMA,
  evaluateExactPrescribedSourceState,
  evaluatePrescribedSourceWake,
} from "../src/prescribed-path-analysis/index.mjs";
import {
  createSpindleExactSourceRecord,
  evaluateSpindleSite,
} from "../scripts/eom/generate-spindle-chart-record.mjs";

function sourceRecord(sources, history = { start: 0, end: 4 }) {
  return {
    schema: EXACT_PRESCRIBED_SOURCE_RECORD_SCHEMA,
    sourceId: "closed-form-test-record",
    sourceSchema: "closed-form-test.v1",
    engineId: "prescribed-geometry",
    engineVersion: "independent-test-fixture.v1",
    claimGrade: "chart-hypothesis",
    evidenceStatus: "test-fixture",
    history,
    sources,
  };
}

function linearSource(id, charge, velocity = { x: 0, y: 0, z: 0 }) {
  return {
    id,
    charge,
    trajectory: {
      kind: "moving-circular.v1",
      epochTime: 0,
      centerAtEpoch: { x: 0, y: 0, z: 0 },
      centerVelocity: velocity,
      radiusU: { x: 0, y: 0, z: 0 },
      radiusV: { x: 0, y: 0, z: 0 },
      angularVelocity: 0,
      angularAcceleration: 0,
      phaseAtEpoch: 0,
    },
  };
}

function assertNear(actual, expected, tolerance = 1e-11) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `expected ${actual} to be within ${tolerance} of ${expected}`,
  );
}

test("static closed form independently fixes the causal root, wake, and probe acceleration", () => {
  const result = evaluatePrescribedSourceWake({
    sourceRecord: sourceRecord([linearSource("positive-static", 1)]),
    observationTime: 2,
    probePosition: { x: 1, y: 0, z: 0 },
    probeCharge: 1,
    fieldSpeed: 2,
    coupling: 1,
  });

  assert.equal(result.claimGrade, "derived");
  assert.equal(result.dynamicalEvidence, false);
  assert.equal(result.stabilityEvidence, false);
  assert.equal(result.contributionCount, 1);
  const [row] = result.contributions;
  assertNear(row.emissionTime, 1.5);
  assertNear(row.distance, 1);
  assertNear(row.transmitterFactor, 2);
  assertNear(result.signedWake, 1 / (8 * Math.PI));
  assertNear(result.unsignedWake, 1 / (8 * Math.PI));
  assertNear(result.virtualProbeAcceleration.x, 1);
  assertNear(result.virtualProbeAcceleration.y, 0);
  assertNear(result.virtualProbeAcceleration.z, 0);
});

test("opposite coincident sources cancel signed wake and probe response without hiding raw exposure", () => {
  const result = evaluatePrescribedSourceWake({
    sourceRecord: sourceRecord([
      linearSource("positive-static", 1),
      linearSource("negative-static", -1),
    ]),
    observationTime: 2,
    probePosition: { x: 1, y: 0, z: 0 },
    probeCharge: 1,
    fieldSpeed: 2,
    coupling: 1,
  });

  assertNear(result.signedWake, 0);
  assertNear(result.unsignedWake, 1 / (4 * Math.PI));
  assertNear(result.cancellationRatio, 0);
  assertNear(result.virtualProbeAcceleration.x, 0);
});

test("uniformly translating closed form exercises the transmitter-side causal factor", () => {
  const result = evaluatePrescribedSourceWake({
    sourceRecord: sourceRecord([
      linearSource("moving-positive", 1, { x: 0.25, y: 0, z: 0 }),
    ]),
    observationTime: 3,
    probePosition: { x: 2, y: 0, z: 0 },
    probeCharge: 1,
    fieldSpeed: 1,
    coupling: 1,
  });

  const [row] = result.contributions;
  assertNear(row.emissionTime, 4 / 3);
  assertNear(row.distance, 5 / 3);
  assertNear(row.transmitterFactor, 3 / 4);
  assertNear(result.signedWake, 3 / (25 * Math.PI));
  assertNear(result.virtualProbeAcceleration.x, 12 / 25);
});

test("spindle adapter preserves every exact source path and supports a six-source evaluation", () => {
  const spec = JSON.parse(fs.readFileSync(
    new URL(
      "../reference/priorities/braid-program/configurations/illustrative-spindle-chart-hypothesis.v0.json",
      import.meta.url,
    ),
    "utf8",
  ));
  const exactRecord = createSpindleExactSourceRecord(spec);
  assert.equal(exactRecord.schema, EXACT_PRESCRIBED_SOURCE_RECORD_SCHEMA);
  assert.equal(exactRecord.engineId, "prescribed-geometry");
  assert.equal(exactRecord.sources.length, 6);

  const testTime = 1.2345;
  spec.layers.forEach((layer, layerIndex) => {
    layer.worldlineIds.forEach((worldlineId, endpointIndex) => {
      const source = exactRecord.sources.find((row) => row.id === worldlineId);
      const actual = evaluateExactPrescribedSourceState(source, testTime);
      const expected = evaluateSpindleSite(spec, layerIndex, endpointIndex, testTime);
      assertNear(actual.position.x, expected.position[0], 1e-12);
      assertNear(actual.position.y, expected.position[1], 1e-12);
      assertNear(actual.position.z, expected.position[2], 1e-12);
      assertNear(actual.velocity.x, expected.velocity[0], 1e-12);
      assertNear(actual.velocity.y, expected.velocity[1], 1e-12);
      assertNear(actual.velocity.z, expected.velocity[2], 1e-12);
    });
  });

  const result = evaluatePrescribedSourceWake({
    sourceRecord: exactRecord,
    observationTime: 4,
    probePosition: { x: 1, y: 0.25, z: 0.1 },
    probeCharge: 1,
    fieldSpeed: 1,
    coupling: 1,
  });
  assert.equal(result.contributionCount, 6);
  assert.equal(result.noRootCount, 0);
  assert.ok(result.maximumRootResidual <= result.protocol.rootTolerance);
  assert.ok(Number.isFinite(result.signedWake));
  assert.ok(Number.isFinite(result.unsignedWake));
  assert.ok(Number.isFinite(result.virtualProbeAcceleration.x));
});

test("first evaluator fails closed outside the certified unique-root speed domain", () => {
  assert.throws(() => evaluatePrescribedSourceWake({
    sourceRecord: sourceRecord([
      linearSource("field-speed-source", 1, { x: 1, y: 0, z: 0 }),
    ]),
    observationTime: 3,
    probePosition: { x: 2, y: 0, z: 0 },
    probeCharge: 1,
    fieldSpeed: 1,
  }), /speed bound .* must remain below fieldSpeed/);
});

import fs from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

import {
  ALL_RETAINED_SIMPLE_ROOTS_POLICY,
  EXACT_PRESCRIBED_SOURCE_RECORD_SCHEMA,
  PRESCRIBED_RECORD_ANALYSIS_PROTOCOL_SCHEMA,
  evaluateExactPrescribedSourceState,
  evaluatePrescribedRecordAnalysis,
  evaluatePrescribedSourceWake,
} from "../src/prescribed-path-analysis/index.mjs";
import {
  DEFAULT_B1_ANALYSIS_PROTOCOL_PATH,
  DEFAULT_B1_ANALYSIS_RESULT_PATH,
  evaluateSpindleAnalysisFromFiles,
  serializePrescribedRecordAnalysis,
} from "../scripts/eom/evaluate-prescribed-source-wake.mjs";
import {
  createSpindleExactSourceRecord,
  evaluateSpindleSite,
} from "../scripts/eom/generate-spindle-chart-record.mjs";

function sourceRecord(sources, history = { start: 0, end: 4 }) {
  return {
    schema: EXACT_PRESCRIBED_SOURCE_RECORD_SCHEMA,
    recordId: "closed-form-test-record",
    sourceSchema: "closed-form-test.v1",
    engineId: "prescribed-geometry",
    engineVersion: "independent-test-fixture.v1",
    claimGrade: "chart-hypothesis",
    evidenceStatus: "test-fixture",
    history,
    sources,
  };
}

function linearSource(
  id,
  charge,
  velocity = { x: 0, y: 0, z: 0 },
  centerAtEpoch = { x: 0, y: 0, z: 0 },
) {
  return {
    id,
    charge,
    trajectory: {
      kind: "moving-circular.v1",
      epochTime: 0,
      centerAtEpoch,
      centerVelocity: velocity,
      radiusU: { x: 0, y: 0, z: 0 },
      radiusV: { x: 0, y: 0, z: 0 },
      angularVelocity: 0,
      angularAcceleration: 0,
      phaseAtEpoch: 0,
    },
  };
}

function analysisProtocol({
  observationTime = 2,
  position = { x: 1, y: 0, z: 0 },
  fieldSpeed = 2,
  returnPeriod = 2,
  minimumSeparationFloor = 0,
} = {}) {
  return {
    schema: PRESCRIBED_RECORD_ANALYSIS_PROTOCOL_SCHEMA,
    protocolId: "independent-analytical-test-protocol-v1",
    fieldSpeed,
    coupling: 1,
    history: { start: 0, end: 4, minimumDelay: 1e-12 },
    returnWindow: { start: 0, period: returnPeriod },
    rootPolicy: {
      id: ALL_RETAINED_SIMPLE_ROOTS_POLICY,
      tolerance: 1e-12,
      maxIterations: 128,
    },
    tolerances: {
      cancellationFloor: 1e-30,
      rootTransversalityFloor: 1e-10,
      minimumSeparationFloor,
      convergenceAbsolute: 1e-9,
    },
    geometry: { minimumSeparationSamples: 32 },
    convergence: {
      rootTolerance: 1e-14,
      maxIterations: 192,
      minimumSeparationSamples: 64,
    },
    probes: [{
      id: "independent-static-probe",
      kind: "stationary-coordinate-probe.v1",
      position,
      observationTimes: [observationTime],
      polarities: [1, -1],
    }],
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

test("canonical evaluator matches a separately derived static root, wake, and both probe polarities", () => {
  const result = evaluatePrescribedRecordAnalysis({
    sourceRecord: sourceRecord([
      linearSource("positive-static", 1),
      linearSource("far-static", 1, { x: 0, y: 0, z: 0 }, { x: 100, y: 0, z: 0 }),
    ]),
    protocol: analysisProtocol(),
  });

  assert.equal(result.schema, "prescribed-path-analysis/result-packet.v1");
  assert.equal(result.evaluator.eomSolverInvoked, false);
  assert.match(result.source.sourceHash, /^[0-9a-f]{64}$/);
  assert.match(result.protocolHash, /^[0-9a-f]{64}$/);
  assert.match(result.resultHash, /^[0-9a-f]{64}$/);
  const event = result.rawLedgers.causalRoots[0];
  assert.equal(event.rootCount, 1);
  assert.equal(event.noRootCount, 1);
  assert.equal(event.rootCompletenessCertification.complete, true);
  const [root] = event.roots;
  assertNear(root.emissionTime, 1.5);
  assertNear(root.distance, 1);
  assertNear(root.transmitterSideFactorDt, 2);
  const reduced = result.reducedMeasures.events[0];
  assertNear(reduced.signedWake, 1 / (8 * Math.PI));
  assertNear(reduced.unsignedWake, 1 / (8 * Math.PI));
  assertNear(reduced.probeResponses[0].acceleration.x, 1);
  assertNear(reduced.probeResponses[1].acceleration.x, -1);
  assert.equal(result.reducedMeasures.numericalConvergence.passed, true);
});

test("symmetry-protected coincident opposite sources cancel signed wake and both responses", () => {
  const result = evaluatePrescribedRecordAnalysis({
    sourceRecord: sourceRecord([
      linearSource("positive-static", 1),
      linearSource("negative-static", -1),
    ]),
    protocol: analysisProtocol(),
  });

  const reduced = result.reducedMeasures.events[0];
  assertNear(reduced.signedWake, 0);
  assertNear(reduced.unsignedWake, 1 / (4 * Math.PI));
  assertNear(reduced.signedCancellationRatio, 0);
  reduced.probeResponses.forEach(({ acceleration }) => {
    assertNear(acceleration.x, 0);
    assertNear(acceleration.y, 0);
    assertNear(acceleration.z, 0);
  });
});

test("static separated sources independently fix period closure and minimum separation", () => {
  const result = evaluatePrescribedRecordAnalysis({
    sourceRecord: sourceRecord([
      linearSource("left-static", 1, { x: 0, y: 0, z: 0 }, { x: -2, y: 0, z: 0 }),
      linearSource("right-static", -1, { x: 0, y: 0, z: 0 }, { x: 2, y: 0, z: 0 }),
    ]),
    protocol: analysisProtocol({
      observationTime: 3,
      position: { x: 10, y: 0, z: 0 },
    }),
  });

  const closure = result.reducedMeasures.prescribedPeriodClosure;
  assertNear(closure.maximumPositionResidual, 0);
  assertNear(closure.maximumVelocityResidual, 0);
  assertNear(closure.maximumPhaseResidual, 0);
  assertNear(result.reducedMeasures.minimumSeparation.value, 4);
});

test("canonical translating-source case independently exercises the transmitter-side margin", () => {
  const result = evaluatePrescribedRecordAnalysis({
    sourceRecord: sourceRecord([
      linearSource("moving-positive", 1, { x: 0.25, y: 0, z: 0 }),
      linearSource("far-static", 1, { x: 0, y: 0, z: 0 }, { x: 100, y: 0, z: 0 }),
    ]),
    protocol: analysisProtocol({
      observationTime: 3,
      position: { x: 2, y: 0, z: 0 },
      fieldSpeed: 1,
    }),
  });

  const root = result.rawLedgers.causalRoots[0].roots.find(
    (row) => row.transmitterId === "moving-positive",
  );
  assertNear(root.emissionTime, 4 / 3);
  assertNear(root.distance, 5 / 3);
  assertNear(root.transmitterSideFactorDt, 3 / 4);
  assertNear(result.reducedMeasures.events[0].signedWake, 3 / (25 * Math.PI));
  assertNear(result.reducedMeasures.events[0].probeResponses[0].acceleration.x, 12 / 25);
});

test("canonical protocol fails closed when convergence inputs are incomplete", () => {
  const protocol = analysisProtocol();
  delete protocol.convergence.rootTolerance;
  assert.throws(() => evaluatePrescribedRecordAnalysis({
    sourceRecord: sourceRecord([
      linearSource("left-static", 1, { x: 0, y: 0, z: 0 }, { x: -1, y: 0, z: 0 }),
      linearSource("right-static", -1, { x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }),
    ]),
    protocol,
  }), /protocol\.convergence\.rootTolerance must be finite/);
});

test("checked-in B1 fixture packet is the deterministic canonical evaluation", () => {
  const expected = fs.readFileSync(DEFAULT_B1_ANALYSIS_RESULT_PATH, "utf8");
  const actual = serializePrescribedRecordAnalysis(evaluateSpindleAnalysisFromFiles({
    protocolPath: DEFAULT_B1_ANALYSIS_PROTOCOL_PATH,
  }));
  assert.equal(actual, expected);
  const parsed = JSON.parse(actual);
  assert.equal(parsed.source.recordId, "illustrative-spindle-chart-hypothesis-v0");
  assert.equal(parsed.reducedMeasures.events[0].rootCount, 6);
  assert.equal(parsed.reducedMeasures.validity.passed, true);
});

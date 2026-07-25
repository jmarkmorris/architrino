import fs from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

import {
  ALL_RETAINED_ROOTS_POLICY,
  ALL_RETAINED_SIMPLE_ROOTS_POLICY,
  CausalRootEnumerationError,
  EXACT_PRESCRIBED_SOURCE_RECORD_SCHEMA,
  PRESCRIBED_RECORD_ANALYSIS_PROTOCOL_SCHEMA,
  PRESCRIBED_RECORD_COMPACT_EVENT_BATCH_SCHEMA,
  createPrescribedRecordAnalysisSession,
  evaluateExactPrescribedSourceState,
  evaluatePrescribedRecordAnalysis,
  evaluatePrescribedSourceWake,
  getPrescribedRecordAnalysisSessionStats,
  verifyIndependentCaseAcceptance,
} from "../src/prescribed-path-analysis/index.mjs";
import {
  DEFAULT_B1_ANALYSIS_PROTOCOL_PATH,
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

function multipleRootProtocol(options = {}) {
  const protocol = analysisProtocol(options);
  protocol.rootPolicy = {
    id: ALL_RETAINED_ROOTS_POLICY,
    tolerance: 1e-12,
    maxIterations: 128,
    initialSubdivisionCount: 16,
    maximumSubdivisionDepth: 20,
    maximumCandidateIntervals: 100000,
  };
  return protocol;
}

function circularSource(id, charge, angularVelocity) {
  return {
    id,
    charge,
    trajectory: {
      kind: "moving-circular.v1",
      epochTime: 0,
      centerAtEpoch: { x: 0, y: 0, z: 0 },
      centerVelocity: { x: 0, y: 0, z: 0 },
      radiusU: { x: 1, y: 0, z: 0 },
      radiusV: { x: 0, y: 1, z: 0 },
      angularVelocity,
      angularAcceleration: 0,
      phaseAtEpoch: 0,
    },
  };
}

function independentlyBracketCircularRoots({
  angularVelocity,
  observationTime,
  probePosition,
  fieldSpeed,
  sampleCount = 200000,
}) {
  const residual = (time) => {
    const x = Math.cos(angularVelocity * time);
    const y = Math.sin(angularVelocity * time);
    return Math.hypot(probePosition.x - x, probePosition.y - y, probePosition.z) -
      fieldSpeed * (observationTime - time);
  };
  const roots = [];
  let leftTime = 0;
  let leftValue = residual(leftTime);
  const retainedEnd = observationTime - 1e-12;
  for (let index = 1; index <= sampleCount; index += 1) {
    let rightTime = retainedEnd * index / sampleCount;
    let rightValue = residual(rightTime);
    if (leftValue * rightValue < 0) {
      let low = leftTime;
      let high = rightTime;
      let lowValue = leftValue;
      for (let iteration = 0; iteration < 80; iteration += 1) {
        const middle = (low + high) / 2;
        const middleValue = residual(middle);
        if (lowValue * middleValue < 0) high = middle;
        else {
          low = middle;
          lowValue = middleValue;
        }
      }
      roots.push((low + high) / 2);
    }
    leftTime = rightTime;
    leftValue = rightValue;
  }
  return roots;
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

test("compatibility adapter preserves every exact B1 source path and supports a six-source evaluation", () => {
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
  spec.braids[0].binaries.forEach((binary, binaryIndex) => {
    binary.worldlineIds.forEach((worldlineId, endpointIndex) => {
      const source = exactRecord.sources.find((row) => row.id === worldlineId);
      const actual = evaluateExactPrescribedSourceState(source, testTime);
      const expected = evaluateSpindleSite(spec, binaryIndex, endpointIndex, testTime);
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

test("first evaluator does not advance outside the certified unique-root speed domain", () => {
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

test("event-specific isolation enumerates every independently bracketed super-wake-speed root", () => {
  const observationTime = 3;
  const probePosition = { x: 2, y: 0, z: 0 };
  const angularVelocity = 4;
  const expectedRoots = independentlyBracketCircularRoots({
    angularVelocity,
    observationTime,
    probePosition,
    fieldSpeed: 1,
  });
  assert.equal(expectedRoots.length, 3);

  const result = evaluatePrescribedRecordAnalysis({
    sourceRecord: sourceRecord([
      circularSource("super-wake-speed", 1, angularVelocity),
      linearSource(
        "far-static",
        -1,
        { x: 0, y: 0, z: 0 },
        { x: 100, y: 0, z: 0 },
      ),
    ]),
    protocol: multipleRootProtocol({
      observationTime,
      position: probePosition,
      fieldSpeed: 1,
      returnPeriod: Math.PI / 2,
    }),
  });

  const event = result.rawLedgers.causalRoots[0];
  const actualRoots = event.roots.filter(
    (root) => root.transmitterId === "super-wake-speed",
  );
  assert.equal(event.rootCompletenessCertification.policy, ALL_RETAINED_ROOTS_POLICY);
  assert.equal(event.rootCompletenessCertification.complete, true);
  assert.equal(actualRoots.length, expectedRoots.length);
  actualRoots.forEach((root, index) => {
    assertNear(root.emissionTime, expectedRoots[index], 1e-10);
    assert.equal(root.rootOrdinal, index);
    assert.equal(root.rootIsolationCertificate.method,
      "event-specific-derivative-isolation.v2");
    assert.ok(Math.abs(root.transmitterSideFactorDt) > 1e-8);
  });
  assert.ok(
    actualRoots.some((root) => root.transmitterSideFactorDt < 0),
    "the fixture must retain a descending causal branch",
  );
  const acceptance = verifyIndependentCaseAcceptance(
    Buffer.from(JSON.stringify(result)),
  );
  assert.equal(acceptance.accepted, true);
  assert.equal(
    acceptance.gates.some((gate) =>
      gate.gateId === "causal-root-domain" && gate.passed),
    true,
  );
  assert.equal(
    acceptance.gates.some((gate) => gate.gateId === "source-speed"),
    false,
  );
});

test("event-specific enumeration reports unresolved possible roots or folds structurally", () => {
  const protocol = multipleRootProtocol({
    observationTime: 3,
    position: { x: 2, y: 0, z: 0 },
    fieldSpeed: 1,
    returnPeriod: Math.PI / 2,
  });
  protocol.rootPolicy.initialSubdivisionCount = 1;
  protocol.rootPolicy.maximumSubdivisionDepth = 1;
  protocol.rootPolicy.maximumCandidateIntervals = 8;
  assert.throws(
    () => evaluatePrescribedRecordAnalysis({
      sourceRecord: sourceRecord([
        circularSource("unresolved-super-wake-speed", 1, 4),
        linearSource(
          "far-static",
          -1,
          { x: 0, y: 0, z: 0 },
          { x: 100, y: 0, z: 0 },
        ),
      ]),
      protocol,
    }),
    (error) => {
      assert.equal(error instanceof CausalRootEnumerationError, true);
      assert.equal(error.code, "causal_root_enumeration_incomplete");
      assert.equal(
        error.details.transmitterId,
        "unresolved-super-wake-speed",
      );
      assert.equal(Array.isArray(error.details.unresolvedIntervals), true);
      assert.equal(error.details.unresolvedIntervals.length > 0, true);
      assert.equal(
        error.details.unresolvedIntervals[0].reason,
        "possible-root-or-fold-not-isolated",
      );
      return true;
    },
  );
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
  assertNear(result.reducedMeasures.minimumSeparation.certifiedContinuousLowerBound, 4);
  assert.equal(
    result.reducedMeasures.minimumSeparation.certificateRule,
    "periodic-sample-lipschitz-lower-bound.v1",
  );
  assert.equal(result.reducedMeasures.numericalConvergence.passed, true);
});

test("minimum-separation grid refinement is diagnostic while the continuous lower bound gates", () => {
  const rotatingSource = (id, phaseAtEpoch) => ({
    id,
    charge: 1,
    trajectory: {
      kind: "moving-circular.v1",
      epochTime: 0,
      centerAtEpoch: { x: 0, y: 0, z: 0 },
      centerVelocity: { x: 0, y: 0, z: 0 },
      radiusU: { x: 1, y: 0, z: 0 },
      radiusV: { x: 0, y: 1, z: 0 },
      angularVelocity: Math.PI,
      angularAcceleration: 0,
      phaseAtEpoch,
    },
  });
  const result = evaluatePrescribedRecordAnalysis({
    sourceRecord: sourceRecord([
      rotatingSource("phase-zero", 0),
      rotatingSource("phase-offset", 0.3),
    ]),
    protocol: analysisProtocol({
      fieldSpeed: 4,
      returnPeriod: 2,
      minimumSeparationFloor: 0.2,
    }),
  });

  const convergence = result.reducedMeasures.numericalConvergence;
  assert.equal(
    convergence.passed,
    convergence.eventConvergence.rootIdentitiesMatch &&
      convergence.eventConvergence.maximumChange <= convergence.absoluteTolerance,
  );
  assert.equal(
    convergence.maximumReportedChange,
    convergence.eventConvergence.maximumChange,
  );
  assert.equal(result.reducedMeasures.validity.minimumSeparationPassed, false);
  assert.ok(result.reducedMeasures.minimumSeparation.value > 0.2);
  assert.ok(
    result.reducedMeasures.minimumSeparation.certifiedContinuousLowerBound < 0.2,
  );
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
  const [separationRow] = result.rawLedgers.minimumSeparation;
  assert.equal(separationRow.relativePeriodClosed, false);
  assertNear(
    separationRow.sampleCoveringRadius,
    result.protocol.returnWindow.period / result.protocol.geometry.minimumSeparationSamples,
  );
});

test("moving endpoint receiver independently fixes D_r without changing instantaneous acceleration", () => {
  const receiver = {
    id: "moving-receiver",
    charge: -1,
    trajectory: {
      kind: "moving-circular.v1",
      epochTime: 0,
      centerAtEpoch: { x: 2, y: 0, z: 0 },
      centerVelocity: { x: 0, y: 0, z: 0 },
      radiusU: { x: 0.2, y: 0, z: 0 },
      radiusV: { x: 0, y: 0.2, z: 0 },
      angularVelocity: Math.PI,
      angularAcceleration: 0,
      phaseAtEpoch: 0,
    },
  };
  const observationTime = 2.25;
  const angle = Math.PI / 4;
  const receiverPosition = {
    x: 2 + 0.2 * Math.cos(angle),
    y: 0.2 * Math.sin(angle),
    z: 0,
  };
  const receiverVelocity = {
    x: -0.2 * Math.PI * Math.sin(angle),
    y: 0.2 * Math.PI * Math.cos(angle),
    z: 0,
  };
  const distance = Math.hypot(receiverPosition.x, receiverPosition.y);
  const radialSpeed = (
    receiverVelocity.x * receiverPosition.x + receiverVelocity.y * receiverPosition.y
  ) / distance;
  const protocol = analysisProtocol({ observationTime });
  protocol.probes = [{
    id: "moving-endpoint",
    kind: "prescribed-source-endpoint-probe.v1",
    transmitterId: receiver.id,
    selfHitPolicy: "exclude-same-transmitter-id.v1",
    observationTimes: [observationTime],
    polarities: [1],
  }];
  const result = evaluatePrescribedRecordAnalysis({
    sourceRecord: sourceRecord([linearSource("static-transmitter", 1), receiver]),
    protocol,
  });
  const event = result.rawLedgers.causalRoots[0];
  assert.equal(event.expectedTransmitterCount, 1);
  assert.equal(event.rootCount, 1);
  assert.equal(event.receiverSourceId, receiver.id);
  const [root] = event.roots;
  assert.equal(root.transmitterId, "static-transmitter");
  assertNear(root.receiverRadialSpeed, radialSpeed);
  assertNear(root.receiverSideFactorDr, 2 - radialSpeed);
  assertNear(root.rootPlaybackDerivative, (2 - radialSpeed) / 2);
  const expectedAccelerationMagnitude = 1 / (distance * distance);
  const acceleration = event.measures.probeResponses[0].acceleration;
  assertNear(Math.hypot(acceleration.x, acceleration.y, acceleration.z), expectedAccelerationMagnitude);
});

test("canonical protocol does not advance when convergence inputs are incomplete", () => {
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

test("analysis sessions preserve full packets and reuse source-invariant geometry", () => {
  const record = sourceRecord([
    linearSource("left-static", 1, undefined, { x: -2, y: 0, z: 0 }),
    linearSource("right-static", -1, undefined, { x: 2, y: 0, z: 0 }),
  ]);
  const protocol = analysisProtocol({
    observationTime: 3,
    position: { x: 10, y: 0, z: 0 },
  });
  const baseline = evaluatePrescribedRecordAnalysis({
    sourceRecord: record,
    protocol,
  });
  const session = createPrescribedRecordAnalysisSession(record);
  const sessionFull = evaluatePrescribedRecordAnalysis({
    sourceRecord: record,
    protocol,
    session,
  });
  const compact = evaluatePrescribedRecordAnalysis({
    sourceRecord: record,
    protocol,
    session,
    resultMode: "compact-event-batch",
  });

  assert.deepEqual(sessionFull, baseline);
  assert.equal(compact.schema, PRESCRIBED_RECORD_COMPACT_EVENT_BATCH_SCHEMA);
  assert.deepEqual(
    compact.rawLedgers.causalRoots,
    baseline.rawLedgers.causalRoots,
  );
  assert.deepEqual(
    compact.rawLedgers.numericalConvergence,
    baseline.rawLedgers.numericalConvergence,
  );
  assert.deepEqual(
    compact.reducedMeasures.validity,
    baseline.reducedMeasures.validity,
  );
  assert.equal("resultHash" in compact, false);
  assert.equal("protocol" in compact, false);
  assert.equal("parameterVector" in compact.source, false);
  assert.deepEqual(getPrescribedRecordAnalysisSessionStats(session), {
    sourceHash: baseline.source.sourceHash,
    sourceCount: 2,
    invariantCacheEntryCount: 1,
    invariantEvaluationCount: 1,
    invariantCacheHitCount: 1,
  });
});

test("identical B1 source and protocol inputs produce deterministic packet bytes", () => {
  const first = serializePrescribedRecordAnalysis(evaluateSpindleAnalysisFromFiles({
    protocolPath: DEFAULT_B1_ANALYSIS_PROTOCOL_PATH,
  }));
  const second = serializePrescribedRecordAnalysis(evaluateSpindleAnalysisFromFiles({
    protocolPath: DEFAULT_B1_ANALYSIS_PROTOCOL_PATH,
  }));
  assert.equal(first, second);
  const parsed = JSON.parse(first);
  assert.equal(parsed.source.recordId, "illustrative-spindle-chart-hypothesis-v0");
  assert.equal(parsed.reducedMeasures.events[0].rootCount, 6);
  assert.equal(parsed.reducedMeasures.validity.passed, true);
});

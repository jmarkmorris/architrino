import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import {
  ALL_RETAINED_ROOTS_POLICY,
  evaluatePrescribedRecordAnalysis,
} from '../src/prescribed-path-analysis/AnalyticalBraidEvaluator.mjs';

const SQRT2 = Math.sqrt(2);
const VERTICES = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];
const DIFFERENCE_EDGE_CHART = {
  id: 'difference-edge',
  axis: [1 / SQRT2, 0, -1 / SQRT2],
  polarities: [1, 1, 1, -1, -1, -1],
};
const SUM_EDGE_CHART = {
  id: 'antipodal-sum-edge',
  axis: [1 / SQRT2, 0, 1 / SQRT2],
  polarities: [1, -1, 1, -1, 1, -1],
};
const MIXED_FACE_CHART = {
  id: 'antipodal-mixed-face',
  axis: [1 / Math.sqrt(3), 1 / Math.sqrt(3), -1 / Math.sqrt(3)],
  polarities: [1, -1, 1, -1, 1, -1],
};

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function cross(left, right) {
  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ];
}

function scale(vector, scalar) {
  return vector.map((value) => value * scalar);
}

function subtract(left, right) {
  return left.map((value, index) => value - right[index]);
}

function independentLedger(beta, chart) {
  const period = 2 * Math.PI / beta;
  const sources = VERTICES.map((vertex, index) => {
    const centerAtEpoch = scale(chart.axis, dot(chart.axis, vertex));
    const radiusU = subtract(vertex, centerAtEpoch);
    return {
      id: `source-${index}`,
      charge: chart.polarities[index],
      trajectory: {
        kind: 'moving-circular.v1',
        epochTime: 0,
        centerAtEpoch,
        centerVelocity: [0, 0, 0],
        radiusU,
        radiusV: cross(chart.axis, radiusU),
        angularVelocity: beta,
        angularAcceleration: 0,
        phaseAtEpoch: 0,
      },
    };
  });
  const history = { start: -2.05, end: period };
  const modelRevisionSha256 = createHash('sha256').update(JSON.stringify({
    history,
    sources,
    fieldSpeed: 1,
    sourceLaw: 'default uncapped emission-site acceleration law',
  })).digest('hex');
  return evaluatePrescribedRecordAnalysis({
    sourceRecord: {
      schema: 'prescribed-path-analysis/exact-source-record.v1',
      assemblyId: `asm-${modelRevisionSha256.slice(0, 32)}`,
      modelRevisionSha256,
      recordId: `octahedral-nine-channel-${chart.id}-independent-${beta}`,
      engineId: 'prescribed-geometry',
      history,
      sources,
    },
    protocol: {
      schema: 'prescribed-path-analysis/analysis-protocol.v1',
      protocolId: 'octahedral-nine-channel-edge-axis-independent-cross-check',
      fieldSpeed: 1,
      coupling: 1,
      history: { start: -2.05, end: period, minimumDelay: 1e-9 },
      returnWindow: { start: 0, period },
      rootPolicy: {
        id: ALL_RETAINED_ROOTS_POLICY,
        tolerance: 1e-12,
        maxIterations: 180,
        initialSubdivisionCount: 128,
        maximumSubdivisionDepth: 28,
        maximumCandidateIntervals: 32768,
      },
      tolerances: {
        cancellationFloor: 1e-14,
        rootTransversalityFloor: 1e-8,
        minimumSeparationFloor: 1e-6,
        convergenceAbsolute: 1e-7,
      },
      geometry: { minimumSeparationSamples: 64 },
      convergence: {
        rootTolerance: 1e-13,
        maxIterations: 200,
        minimumSeparationSamples: 128,
      },
      probes: VERTICES.map((_, index) => ({
        id: `probe-${index}`,
        kind: 'prescribed-source-endpoint-probe.v1',
        transmitterId: `source-${index}`,
        selfHitPolicy: 'exclude-same-transmitter-id.v1',
        observationTimes: [0],
        polarities: [chart.polarities[index]],
      })),
    },
  });
}

test('unchanged generic evaluator independently samples the certified octahedral obstruction', () => {
  for (const beta of [0.1, 0.25, 0.5, 0.75, 0.9, 0.99]) {
    const packet = independentLedger(beta, DIFFERENCE_EDGE_CHART);
    assert.equal(packet.reducedMeasures.validity.passed, true,
      JSON.stringify(packet.reducedMeasures.numericalConvergence));
    assert.equal(packet.rawLedgers.causalRoots.length, 6);
    assert.equal(packet.rawLedgers.causalRoots.every((event) => event.rootCount === 5), true);
    const receiverPlusX = packet.rawLedgers.causalRoots[0];
    const accelerationY = receiverPlusX.measures.probeResponses[0].acceleration.y;
    assert.ok(accelerationY >= -0.820273791914345 && accelerationY <= -0.450045806431959,
      `beta=${beta} produced y acceleration ${accelerationY} outside the certified cover`);
    assert.ok(accelerationY < -0.45,
      `beta=${beta} did not preserve the certified strict-negative obstruction`);
  }
});

test('unchanged generic evaluator independently samples the antipodal sum-edge obstruction', () => {
  for (const beta of [0.1, 0.25, 0.5, 0.75, 0.9, 0.99]) {
    const packet = independentLedger(beta, SUM_EDGE_CHART);
    assert.equal(packet.reducedMeasures.validity.passed, true,
      JSON.stringify(packet.reducedMeasures.numericalConvergence));
    assert.equal(packet.rawLedgers.causalRoots.length, 6);
    assert.equal(packet.rawLedgers.causalRoots.every((event) => event.rootCount === 5), true);
    const receiverPlusY = packet.rawLedgers.causalRoots[2];
    const accelerationX = receiverPlusY.measures.probeResponses[0].acceleration.x;
    assert.ok(accelerationX >= -1.679296800677345 && accelerationX <= -0.650075702972164,
      `beta=${beta} produced x acceleration ${accelerationX} outside the certified cover`);
    assert.ok(accelerationX < -0.65,
      `beta=${beta} did not preserve the certified strict-negative obstruction`);
  }
});

test('unchanged generic evaluator independently samples the antipodal mixed-face obstruction', () => {
  for (const beta of [0.1, 0.25, 0.5, 0.75, 0.9, 0.99]) {
    const packet = independentLedger(beta, MIXED_FACE_CHART);
    assert.equal(packet.reducedMeasures.validity.passed, true,
      JSON.stringify(packet.reducedMeasures.numericalConvergence));
    assert.equal(packet.rawLedgers.causalRoots.length, 6);
    assert.equal(packet.rawLedgers.causalRoots.every((event) => event.rootCount === 5), true);
    const acceleration = packet.rawLedgers.causalRoots[0].measures.probeResponses[0].acceleration;
    const obstruction = (acceleration.y + acceleration.z) / Math.sqrt(2);
    assert.ok(obstruction < -0.59,
      `beta=${beta} did not preserve the certified strict-negative obstruction: ${obstruction}`);
  }
});

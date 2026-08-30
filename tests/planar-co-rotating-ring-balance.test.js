import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  ALL_RETAINED_ROOTS_POLICY,
  evaluatePrescribedRecordAnalysis,
} from "../src/prescribed-path-analysis/AnalyticalBraidEvaluator.mjs";
import {
  alternatingPolarityClass,
  classifyPlanarRingTaxonomy,
  enumerateBalancedPolarityClasses,
  evaluatePlanarCoRotatingRing,
  regularRingPhases,
  verifyReflectionCovariance,
  verifyRotationCovariance,
} from "../src/prescribed-path-analysis/PlanarCoRotatingRingBalance.mjs";
import {
  ledgerAt,
  partnerRoots,
  selfRoots,
} from "../scripts/equation-mapping/analyze-circular-self-hit-binary.mjs";

const closeTo = (actual, expected, tolerance = 2e-9) => {
  assert.ok(Math.abs(actual - expected) <= tolerance,
    `expected ${actual} within ${tolerance} of ${expected}`);
};

function crossAcceleration(evaluation, receiverIndex) {
  const acceleration = [0, 0, 0];
  for (const pair of evaluation.receivers[receiverIndex].directedPairs) {
    if (pair.transmitterIndex === receiverIndex) continue;
    for (const root of pair.roots) {
      root.acceleration.forEach((value, axis) => { acceleration[axis] += value; });
    }
  }
  return acceleration;
}

function genericCrossLedger({
  phases,
  polarities,
  beta,
  rootTolerance = 1e-11,
  refinedRootTolerance = 1e-12,
  maxIterations = 160,
  refinedMaxIterations = 180,
}) {
  const period = 2 * Math.PI / beta;
  const sourceRecord = {
    schema: "prescribed-path-analysis/exact-source-record.v1",
    recordId: "planar-ring-independent-cross-root-check",
    engineId: "prescribed-geometry",
    history: { start: -2.05, end: period },
    sources: phases.map((phase, index) => ({
      id: `source-${index}`,
      charge: polarities[index],
      trajectory: {
        kind: "moving-circular.v1",
        epochTime: 0,
        centerAtEpoch: [0, 0, 0],
        centerVelocity: [0, 0, 0],
        radiusU: [1, 0, 0],
        radiusV: [0, 1, 0],
        angularVelocity: beta,
        angularAcceleration: 0,
        phaseAtEpoch: phase,
      },
    })),
  };
  const protocol = {
    schema: "prescribed-path-analysis/analysis-protocol.v1",
    protocolId: "planar-ring-independent-cross-root-check",
    fieldSpeed: 1,
    coupling: 1,
    history: { start: -2.05, end: period, minimumDelay: 1e-9 },
    returnWindow: { start: 0, period },
    rootPolicy: {
      id: ALL_RETAINED_ROOTS_POLICY,
      tolerance: rootTolerance,
      maxIterations,
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
      rootTolerance: refinedRootTolerance,
      maxIterations: refinedMaxIterations,
      minimumSeparationSamples: 128,
    },
    probes: phases.map((_, index) => ({
      id: `probe-${index}`,
      kind: "prescribed-source-endpoint-probe.v1",
      transmitterId: `source-${index}`,
      selfHitPolicy: "exclude-same-transmitter-id.v1",
      observationTimes: [0],
      polarities: [polarities[index]],
    })),
  };
  return evaluatePrescribedRecordAnalysis({ sourceRecord, protocol });
}

test("balanced polarity orbits retain alternating, neutral-antipodal, and remaining subclasses", () => {
  const expectedClassCounts = new Map([[2, 2], [3, 3], [4, 7], [5, 13], [6, 35]]);
  for (const [n, expectedCount] of expectedClassCounts) {
    const classes = enumerateBalancedPolarityClasses(n, { includeReflection: true });
    assert.equal(classes.length, expectedCount);
    const alternating = classes.find((row) => row.alternating);
    assert.ok(alternating);
    assert.equal(alternating.allAntipodesNeutral, n % 2 === 1);
    assert.ok(classes.some((row) => row.allAntipodesNeutral));
    if (n >= 3) assert.ok(classes.some((row) => row.subclass === "remaining-balanced"));
  }
});

test("the unchanged circular-binary instrument independently matches every specialized N=1 root and projection", () => {
  for (const beta of [1.2, 3.070356625390253, 8]) {
    const evaluation = evaluatePlanarCoRotatingRing({
      phases: regularRingPhases(1),
      polarities: [1, -1],
      beta,
    });
    const receiver = evaluation.receivers[0];
    const selfCount = receiver.directedPairs[0].rootCount;
    const partnerCount = receiver.directedPairs[1].rootCount;
    assert.equal(selfCount, selfRoots(beta).length);
    assert.equal(partnerCount, partnerRoots(beta).length);
    const independent = ledgerAt(beta).fullCircular;
    closeTo(receiver.radialCoefficient, independent.radial, 3e-10);
    closeTo(receiver.tangentialCoefficient, independent.tangential, 3e-10);
  }
});

test("the unchanged generic all-root evaluator independently matches cross-root counts and acceleration", () => {
  const phases = [0, 0.73, Math.PI, 4.2];
  const polarities = [1, -1, 1, -1];
  const beta = 3.070356625390253;
  const specialized = evaluatePlanarCoRotatingRing({ phases, polarities, beta });
  const generic = genericCrossLedger({ phases, polarities, beta });
  assert.equal(generic.reducedMeasures.validity.passed, true, JSON.stringify(generic.reducedMeasures.numericalConvergence));
  generic.rawLedgers.causalRoots.forEach((event, receiverIndex) => {
    const specializedCount = specialized.receivers[receiverIndex].directedPairs.reduce(
      (sum, pair) => sum + (pair.transmitterIndex === receiverIndex ? 0 : pair.rootCount), 0);
    assert.equal(event.rootCount, specializedCount);
    const expectedAcceleration = crossAcceleration(specialized, receiverIndex);
    const actualAcceleration = event.measures.probeResponses[0].acceleration;
    closeTo(actualAcceleration.x, expectedAcceleration[0], 4e-8);
    closeTo(actualAcceleration.y, expectedAcceleration[1], 4e-8);
    closeTo(actualAcceleration.z, expectedAcceleration[2], 4e-8);
  });
});

test("rotation and reflection-plus-circulation-reversal preserve the complete projected ledger", () => {
  const phases = [0, 0.61, 1.77, 3.19, 4.52, 5.4];
  const polarities = [1, 1, -1, 1, -1, -1];
  const beta = 3.070356625390253;
  for (let index = 0; index <= 16; index += 1) {
    const check = verifyRotationCovariance({
      phases,
      polarities,
      beta,
      rotation: 2 * Math.PI * index / 16,
    });
    assert.equal(check.passed, true);
  }
  assert.equal(verifyReflectionCovariance({ phases, polarities, beta }).passed, true);
});

test("the B1.3 mapping is exact only for a six-member antipodal-neutral common-circle record", () => {
  const phases = [0, Math.PI, 0.7, 0.7 + Math.PI, 2.2, 2.2 + Math.PI];
  const polarities = [1, -1, -1, 1, 1, -1];
  const b13 = classifyPlanarRingTaxonomy({ n: 3, phases, polarities });
  assert.equal(b13.memberId, "B1.3");
  assert.equal(b13.allAntipodesNeutral, true);
  const twelve = classifyPlanarRingTaxonomy({
    n: 6,
    phases: regularRingPhases(6),
    polarities: enumerateBalancedPolarityClasses(6).find((row) => row.allAntipodesNeutral).polarities,
  });
  assert.equal(twelve.memberId, null);
  assert.match(twelve.classification, /not C5\/C6 because d_C=0/);

  const twentyFour = classifyPlanarRingTaxonomy({
    n: 12,
    phases: regularRingPhases(12),
    polarities: alternatingPolarityClass(12).polarities,
  });
  assert.equal(twentyFour.memberId, null);
  assert.equal(twentyFour.allAntipodesNeutral, false);
  assert.match(twentyFour.classification, /outside B1\.3 inventory/);
});

test("the live B1.3 source record satisfies the independent coordinate mapping", () => {
  const path = new URL("../reference/priorities/braid-program/configurations/illustrative-planar-tri-binary-spindle-boundary.v2.json", import.meta.url);
  const spec = JSON.parse(readFileSync(path, "utf8"));
  const constituents = new Map(spec.constituents.map((row) => [row.id, row]));
  const phases = spec.worldlines.map((row) => {
    const operator = row.operator;
    const x = operator.radiusU[0] * Math.cos(operator.phaseAtEpoch) +
      operator.radiusV[0] * Math.sin(operator.phaseAtEpoch);
    const y = operator.radiusU[1] * Math.cos(operator.phaseAtEpoch) +
      operator.radiusV[1] * Math.sin(operator.phaseAtEpoch);
    return Math.atan2(y, x);
  });
  const polarities = spec.worldlines.map((row) => constituents.get(row.constituentId).polarity);
  const centers = new Set(spec.worldlines.map((row) => JSON.stringify(row.operator.centerAtEpoch)));
  const frequencies = new Set(spec.worldlines.map((row) => row.operator.angularVelocity));
  const normals = new Set(spec.worldlines.map((row) => JSON.stringify([
    row.operator.radiusU[1] * row.operator.radiusV[2] - row.operator.radiusU[2] * row.operator.radiusV[1],
    row.operator.radiusU[2] * row.operator.radiusV[0] - row.operator.radiusU[0] * row.operator.radiusV[2],
    row.operator.radiusU[0] * row.operator.radiusV[1] - row.operator.radiusU[1] * row.operator.radiusV[0],
  ].map((value) => Math.sign(value)))));
  assert.equal(spec.constituents.length, 6);
  assert.equal(centers.size, 1);
  assert.equal(frequencies.size, 1);
  assert.equal(normals.size, 1);
  assert.ok(spec.worldlines.every((row) => row.operator.angularVelocity > 0));
  const taxonomy = classifyPlanarRingTaxonomy({ n: 3, phases, polarities });
  assert.equal(taxonomy.memberId, "B1.3");
});

test("every promoted regular candidate matches both unchanged independent root instruments", () => {
  const evidencePath = new URL("../reference/priorities/braid-program/evidence/2026-08-29-planar-co-rotating-n-n-circular-balance.receipt.v1.json", import.meta.url);
  const evidence = JSON.parse(readFileSync(evidencePath, "utf8"));
  assert.equal(evidence.decision.balancedCandidateCount, 5);
  assert.equal(evidence.rawArtifact.requiredForTests, false);
  for (const candidate of evidence.balancedCandidateScopes) {
    const n = candidate.n;
    const phases = regularRingPhases(n);
    const polarities = Array.from({ length: 2 * n }, (_, index) => index % 2 === 0 ? 1 : -1);
    const beta = candidate.beta;
    const specialized = evaluatePlanarCoRotatingRing({ phases, polarities, beta });
    const generic = genericCrossLedger({ phases, polarities, beta });
    assert.equal(generic.reducedMeasures.validity.passed, true, `generic validity for N=${n}`);
    const independentSelf = selfRoots(beta).map((value) => 2 * value);
    generic.rawLedgers.causalRoots.forEach((event, receiverIndex) => {
      const receiver = specialized.receivers[receiverIndex];
      const selfLedger = receiver.directedPairs[receiverIndex];
      assert.equal(selfLedger.rootCount, independentSelf.length);
      selfLedger.roots.forEach((root, rootIndex) => closeTo(root.delayAngle, independentSelf[rootIndex], 4e-10));
      const specializedCount = receiver.directedPairs.reduce(
        (sum, pair) => sum + (pair.transmitterIndex === receiverIndex ? 0 : pair.rootCount), 0);
      assert.equal(event.rootCount, specializedCount);
      const expectedAcceleration = crossAcceleration(specialized, receiverIndex);
      const actualAcceleration = event.measures.probeResponses[0].acceleration;
      closeTo(actualAcceleration.x, expectedAcceleration[0], 7e-8);
      closeTo(actualAcceleration.y, expectedAcceleration[1], 7e-8);
      closeTo(actualAcceleration.z, expectedAcceleration[2], 7e-8);
    });
  }
});

test("the regular alternating 12:12 candidate balances and matches both unchanged independent root instruments", () => {
  const n = 12;
  const evidencePath = new URL("../reference/priorities/braid-program/evidence/2026-08-29-planar-co-rotating-12-12-alternating.receipt.v1.json", import.meta.url);
  const evidence = JSON.parse(readFileSync(evidencePath, "utf8"));
  assert.equal(evidence.rawArtifact.requiredForTests, false);
  assert.equal(evidence.declaredScope.coverage,
    "one exact symmetry class; not a census of all balanced 12:12 polarity classes and not a nonuniform-phase search");
  assert.equal(evidence.taxonomyDecision.verdict, "outside-B1.3");
  const beta = evidence.regularResult.best.beta;
  const phases = regularRingPhases(n);
  const polarities = alternatingPolarityClass(n).polarities;
  const specialized = evaluatePlanarCoRotatingRing({ phases, polarities, beta, rootTolerance: 2e-14, foldTolerance: 2e-11 });
  assert.equal(specialized.rootCompleteness.complete, true);
  assert.equal(specialized.rootCount, 624);
  assert.equal(evidence.regularResult.best.rootCount, specialized.rootCount);
  assert.ok(specialized.compatibleScale > 0);
  assert.ok(specialized.residuals.maximumFullVector <= 2e-8);
  const taxonomy = classifyPlanarRingTaxonomy({ n, phases, polarities });
  assert.equal(taxonomy.memberId, null);
  assert.equal(taxonomy.allAntipodesNeutral, false);

  const generic = genericCrossLedger({
    phases,
    polarities,
    beta,
    rootTolerance: 1e-12,
    refinedRootTolerance: 1e-13,
    maxIterations: 180,
    refinedMaxIterations: 200,
  });
  assert.equal(generic.reducedMeasures.validity.passed, true, JSON.stringify(generic.reducedMeasures.numericalConvergence));
  const independentSelf = selfRoots(beta).map((value) => 2 * value);
  generic.rawLedgers.causalRoots.forEach((event, receiverIndex) => {
    const receiver = specialized.receivers[receiverIndex];
    const selfLedger = receiver.directedPairs[receiverIndex];
    assert.equal(selfLedger.rootCount, independentSelf.length);
    selfLedger.roots.forEach((root, rootIndex) => closeTo(root.delayAngle, independentSelf[rootIndex], 4e-10));
    const specializedCount = receiver.directedPairs.reduce(
      (sum, pair) => sum + (pair.transmitterIndex === receiverIndex ? 0 : pair.rootCount), 0);
    assert.equal(event.rootCount, specializedCount);
    const expectedAcceleration = crossAcceleration(specialized, receiverIndex);
    const actualAcceleration = event.measures.probeResponses[0].acceleration;
    closeTo(actualAcceleration.x, expectedAcceleration[0], 7e-8);
    closeTo(actualAcceleration.y, expectedAcceleration[1], 7e-8);
    closeTo(actualAcceleration.z, expectedAcceleration[2], 7e-8);
  });
});

test("the regular alternating N=7 through N=11 candidates match both unchanged independent root instruments", () => {
  const candidates = [
    { n: 7, beta: 2.971792998251308, rootCount: 392 },
    { n: 8, beta: 1.39081847593345, rootCount: 288 },
    { n: 9, beta: 1.3584259179735925, rootCount: 360 },
    { n: 10, beta: 1.3318963796099441, rootCount: 440 },
    { n: 11, beta: 1.3097107443722018, rootCount: 528 },
  ];
  for (const candidate of candidates) {
    const phases = regularRingPhases(candidate.n);
    const polarities = alternatingPolarityClass(candidate.n).polarities;
    const specialized = evaluatePlanarCoRotatingRing({
      phases,
      polarities,
      beta: candidate.beta,
      rootTolerance: 2e-14,
      foldTolerance: 2e-11,
    });
    assert.equal(specialized.rootCompleteness.complete, true, `specialized completeness for N=${candidate.n}`);
    assert.equal(specialized.rootCount, candidate.rootCount);
    assert.ok(specialized.compatibleScale > 0);
    assert.ok(specialized.residuals.maximumFullVector <= 2e-8);

    const generic = genericCrossLedger({
      phases,
      polarities,
      beta: candidate.beta,
      rootTolerance: 1e-12,
      refinedRootTolerance: 1e-13,
      maxIterations: 180,
      refinedMaxIterations: 200,
    });
    assert.equal(generic.reducedMeasures.validity.passed, true,
      `generic validity for N=${candidate.n}: ${JSON.stringify(generic.reducedMeasures.numericalConvergence)}`);
    const independentSelf = selfRoots(candidate.beta).map((value) => 2 * value);
    generic.rawLedgers.causalRoots.forEach((event, receiverIndex) => {
      const receiver = specialized.receivers[receiverIndex];
      const selfLedger = receiver.directedPairs[receiverIndex];
      assert.equal(selfLedger.rootCount, independentSelf.length);
      selfLedger.roots.forEach((root, rootIndex) => closeTo(root.delayAngle, independentSelf[rootIndex], 4e-10));
      const specializedCount = receiver.directedPairs.reduce(
        (sum, pair) => sum + (pair.transmitterIndex === receiverIndex ? 0 : pair.rootCount), 0);
      assert.equal(event.rootCount, specializedCount);
      const expectedAcceleration = crossAcceleration(specialized, receiverIndex);
      const actualAcceleration = event.measures.probeResponses[0].acceleration;
      closeTo(actualAcceleration.x, expectedAcceleration[0], 7e-8);
      closeTo(actualAcceleration.y, expectedAcceleration[1], 7e-8);
      closeTo(actualAcceleration.z, expectedAcceleration[2], 7e-8);
    });
  }
});

import assert from "node:assert/strict";
import test from "node:test";

import {
  CYCLIC_AXIS,
  MATCHED_COORDINATE_NAMES,
  auditMatchedFiveCoordinateInitializations,
  buildMatchedFiveCoordinateInitializations,
  recoverMatchedFiveCoordinates,
  runDeclaredMatchedLedgerAudit,
} from "../scripts/mapping-electromagnetism/three-binary-five-coordinate-initialization-ledger.mjs";
import { analyzeGeometry } from "../scripts/mapping-electromagnetism/three-binary-orbiting-endpoint-geometry.mjs";

const seed = (overrides = {}) => ({
  h: 0.28,
  rho: 0.19,
  theta: 0.42,
  hDot: 0.01,
  rhoDot: -0.02,
  thetaDot: 0.3,
  ...overrides,
});

const close = (actual, expected, tolerance = 1e-11) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);

const vectorClose = (actual, expected, tolerance = 1e-11) =>
  actual.forEach((entry, index) => close(entry, expected[index], tolerance));

const subtract = (left, right) => left.map((entry, index) => entry - right[index]);
const add = (left, right) => left.map((entry, index) => entry + right[index]);
const scale = (value, scalar) => value.map((entry) => entry * scalar);
const dot = (left, right) => left.reduce((sum, entry, index) => sum + entry * right[index], 0);

test("declared ledger closes the five-coordinate metric, inverse, center, clearance, and speed checks", () => {
  const report = runDeclaredMatchedLedgerAudit();
  assert.equal(report.cF, 1);
  assert.deepEqual(report.coordinateNames, MATCHED_COORDINATE_NAMES);
  assert.equal(buildMatchedFiveCoordinateInitializations({ seed: seed() }).candidateB.shortName, "SD3");
  assert.equal(report.candidateA.tangent.rank, 5);
  assert.equal(report.candidateB.tangent.rank, 5);
  assert.equal(report.decision.sharedMemberwiseDirections, 3);
  assert.equal(report.decision.structuralComplementDimension, 2);
  assert.equal(report.decision.geometryPrerequisiteClosed, true);
  assert.ok(report.candidateA.minimumPairDistance > 0);
  assert.ok(report.candidateB.minimumPairDistance > 0);
});

test("the common three-coordinate locus gives identical member positions and velocities", () => {
  const built = buildMatchedFiveCoordinateInitializations({
    seed: seed(),
    coordinates: [0.03, -0.02, 0.01, 0, 0],
    rates: [-0.04, 0.02, 0.03, 0, 0],
  });
  const candidateB = new Map(built.candidateB.members.map((member) => [member.id, member]));
  for (const member of built.candidateA.members) {
    vectorClose(member.position, candidateB.get(member.id).position);
    vectorClose(member.velocity, candidateB.get(member.id).velocity);
  }
});

test("the two structural complements have opposite declared polarity parity", () => {
  const base = buildMatchedFiveCoordinateInitializations({ seed: seed() });
  const shifted = buildMatchedFiveCoordinateInitializations({
    seed: seed(),
    coordinates: [0, 0, 0, 0.017, -0.011],
  });
  for (const candidate of ["candidateA", "candidateB"]) {
    const baseById = new Map(base[candidate].members.map((member) => [member.id, member]));
    const shiftedById = new Map(shifted[candidate].members.map((member) => [member.id, member]));
    for (let module = 0; module < 3; module += 1) {
      const positiveDelta = subtract(shiftedById.get(`${module + 1}+`).position, baseById.get(`${module + 1}+`).position);
      const negativeDelta = subtract(shiftedById.get(`${module + 1}-`).position, baseById.get(`${module + 1}-`).position);
      vectorClose(negativeDelta, scale(positiveDelta, candidate === "candidateA" ? -1 : 1));
    }
  }
});

test("SD3 gauge removes common cyclic-axis translation exactly", () => {
  const built = buildMatchedFiveCoordinateInitializations({
    seed: seed(),
    coordinates: [0.02, 0.01, -0.015, 0.021, 0.013],
  });
  const positive = built.candidateB.metadata.representativePositive;
  const negative = built.candidateB.metadata.representativeNegative;
  const midpoint = scale(add(positive, negative), 0.5);
  close(dot(midpoint, CYCLIC_AXIS), 0);
  close(analyzeGeometry(built.candidateB).centroidResidual, 0);
});

test("both affine maps recover coordinates and rates with a moving declared center", () => {
  const coordinates = [-0.017, 0.023, 0.009, -0.014, 0.018];
  const rates = [0.031, -0.027, 0.019, 0.012, -0.016];
  const built = buildMatchedFiveCoordinateInitializations({
    seed: seed(),
    coordinates,
    rates,
    center: [1.1, -0.7, 0.4],
    centerVelocity: [0.05, -0.03, 0.02],
  });
  for (const candidate of [built.candidateA, built.candidateB]) {
    const recovered = recoverMatchedFiveCoordinates(candidate);
    vectorClose(recovered.coordinates, coordinates);
    vectorClose(recovered.rates, rates);
  }
});

test("each coordinate has the same six-member displacement and speed norm in both candidates", () => {
  for (let coordinate = 0; coordinate < 5; coordinate += 1) {
    const coordinates = [0, 0, 0, 0, 0];
    const rates = [0, 0, 0, 0, 0];
    coordinates[coordinate] = 0.01;
    rates[coordinate] = 0.02;
    const report = auditMatchedFiveCoordinateInitializations({ seed: seed(), coordinates, rates });
    close(report.exactChecks.candidateATangentGram[coordinate][coordinate], 6);
    close(report.exactChecks.candidateBTangentGram[coordinate][coordinate], 6);
  }
});

test("malformed and physically unguarded declared samples fail closed", () => {
  assert.throws(() => buildMatchedFiveCoordinateInitializations({ seed: seed({ h: 0, rho: 0 }) }), /nonzero/);
  assert.throws(() => buildMatchedFiveCoordinateInitializations({ seed: seed(), coordinates: [0, 0, 0, 0, Number.NaN] }), /finite/);
  assert.throws(() => auditMatchedFiveCoordinateInitializations({
    seed: seed(),
    coordinates: [-0.28, -0.19, 0, 0, 0],
    rates: [0, 0, 0, 0, 0],
  }), /clearance/);
  assert.throws(() => auditMatchedFiveCoordinateInitializations({
    seed: seed(),
    coordinates: [0, 0, 0, 0, 0],
    rates: [2, 0, 0, 0, 0],
  }), /speed guard/);
});

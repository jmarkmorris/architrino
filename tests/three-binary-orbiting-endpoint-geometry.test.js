import assert from "node:assert/strict";
import test from "node:test";
import {
  analyzeGeometry,
  buildPairConjugate,
  buildSectorDifferential,
  declaredFrame,
  runDeclaredAudit,
  tetrahedralSubsetAudit,
} from "../scripts/mapping-electromagnetism/three-binary-orbiting-endpoint-geometry.mjs";

const close = (actual, expected, tolerance = 1e-11) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);

const row = (overrides = {}) => ({
  h: 0.3,
  rho: 0.2,
  theta: 0.4,
  hDot: 0.03,
  rhoDot: -0.02,
  thetaDot: 0.7,
  ...overrides,
});

test("pair conjugacy gives exact midpoint, antipodality, and rank-nine generic A3 tangent", () => {
  const audit = analyzeGeometry(buildPairConjugate({ modules: [row(), row({ theta: 0.9 }), row({ h: 0.4 })] }));
  close(audit.centroidResidual, 0);
  close(Math.max(...audit.binaryRows.map((entry) => entry.antipodalityResidual)), 0);
  assert.equal(audit.tangent.rank, 9);
  close(audit.minimumPairDistance > 0 ? 1 : 0, 1);
});

test("A1 is the zero-axial-offset boundary without loss of generic tangent rank", () => {
  const audit = analyzeGeometry(buildPairConjugate({ modules: [row({ h: 0 }), row({ h: 0, theta: 1.1 }), row({ h: 0, theta: -0.7 })] }));
  assert.equal(audit.tangent.rank, 9);
  close(audit.centroidResidual, 0);
});

test("cyclic A2 locus has exact order-three spatial residual", () => {
  const audit = analyzeGeometry(buildPairConjugate({ modules: [row(), row(), row()] }));
  close(audit.cyclicSymmetryResidual, 0);
});

test("centered cyclic sector-differential chart is exact-center but rank five", () => {
  const audit = analyzeGeometry(buildSectorDifferential({
    positive: row({ h: 0.33, theta: 0.2 }),
    negative: row({ h: 0.25, rho: 0.16, theta: 1.2 }),
    centered: true,
  }));
  close(audit.centroidResidual, 0);
  close(audit.cyclicSymmetryResidual, 0);
  assert.equal(audit.tangent.rank, 5);
});

test("uncentered cyclic sector-differential chart keeps six parameters but misses its declared center", () => {
  const audit = analyzeGeometry(buildSectorDifferential({
    positive: row({ h: 0.33, theta: 0.2 }),
    negative: row({ h: 0.25, rho: 0.16, theta: 1.2 }),
    centered: false,
  }));
  assert.equal(audit.tangent.rank, 6);
  assert.ok(audit.centroidResidual > 1e-3);
});

test("sector-differential pair-conjugate reduction exactly recovers A3 pair geometry", () => {
  const positive = row();
  const negative = row({ theta: Math.PI - positive.theta, thetaDot: -positive.thetaDot });
  const audit = analyzeGeometry(buildSectorDifferential({ positive, negative, centered: true }));
  close(Math.max(...audit.binaryRows.map((entry) => entry.antipodalityResidual)), 0);
  close(audit.centroidResidual, 0);
});

test("three-of-four tetrahedral identities are independently numerical and exact", () => {
  const audit = tetrahedralSubsetAudit();
  close(audit.determinant, 16 / 27);
  close(audit.missingAxisResidual, 0);
  close(audit.secondMomentResidual, 0);
  audit.eigenvalues.forEach((value, index) => close(value, [1 / 3, 4 / 3, 4 / 3][index]));
});

test("collision and malformed-frame controls fail closed", () => {
  const zero = row({ h: 0, rho: 0, hDot: 0, rhoDot: 0, thetaDot: 0 });
  const audit = analyzeGeometry(buildPairConjugate({ modules: [zero, row({ theta: 1 }), row({ theta: 2 })] }));
  close(audit.minimumPairDistance, 0);
  assert.throws(() => declaredFrame({ axes: [[1, 0, 0], [1, 0, 0], [0, 0, 1]] }), /rank-three/);
  assert.throws(() => buildPairConjugate({ modules: [row(), row(), row({ rho: Number.NaN })] }), /finite/);
});

test("declared audit covers every required comparison sample", () => {
  const audit = runDeclaredAudit();
  assert.equal(audit.cF, 1);
  assert.deepEqual(Object.keys(audit.samples), [
    "symmetricA2",
    "genericA3",
    "a1Boundary",
    "b1AxisBoundary",
    "genericSectorDifferentialRaw",
    "genericSectorDifferentialCentered",
    "pairConjugateReduction",
    "deliberateCollision",
    "tetrahedralSubset",
  ]);
  assert.equal(audit.decisionInputs.cyclicCenteredSectorTangentRank, 5);
});

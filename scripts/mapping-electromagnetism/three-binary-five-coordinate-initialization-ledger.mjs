import { pathToFileURL } from "node:url";

import {
  CF,
  PHASE_OFFSETS,
  analyzeGeometry,
  declaredFrame,
} from "./three-binary-orbiting-endpoint-geometry.mjs";

// Geometry-only matched initialization ledger. It does not evaluate the Master
// Equation and cannot establish binding, return, retention, or stability.

export const MATCHED_COORDINATE_NAMES = [
  "commonAxial",
  "commonRadial",
  "commonTangential",
  "structuralCosine",
  "structuralSine",
];

export const CYCLIC_AXIS = [1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)];
export const CYCLIC_TRANSVERSE_BASIS = [
  [1 / Math.sqrt(2), -1 / Math.sqrt(2), 0],
  [1 / Math.sqrt(6), 1 / Math.sqrt(6), -2 / Math.sqrt(6)],
];

const CYCLIC_ROTATION = [
  [0, 0, 1],
  [1, 0, 0],
  [0, 1, 0],
];
const EPS = 1e-12;

function finiteNumber(value, name) {
  if (!Number.isFinite(value)) throw new TypeError(`${name} must be finite`);
  return value;
}

function vector(value, name, length = 3) {
  if (!Array.isArray(value) || value.length !== length) {
    throw new TypeError(`${name} must contain ${length} finite values`);
  }
  return value.map((entry, index) => finiteNumber(entry, `${name}[${index}]`));
}

function add(...values) {
  return values[0].map((_, index) => values.reduce((sum, value) => sum + value[index], 0));
}

function subtract(left, right) {
  return left.map((entry, index) => entry - right[index]);
}

function scale(value, scalar) {
  return value.map((entry) => entry * scalar);
}

function dot(left, right) {
  return left.reduce((sum, entry, index) => sum + entry * right[index], 0);
}

function norm(value) {
  return Math.hypot(...value);
}

function unit(value, name) {
  const magnitude = norm(value);
  if (!(magnitude > EPS)) throw new RangeError(`${name} must be nonzero`);
  return scale(value, 1 / magnitude);
}

function meanVectors(values) {
  return scale(values.reduce((sum, value) => add(sum, value), [0, 0, 0]), 1 / values.length);
}

function matrixVector(matrix, value) {
  return matrix.map((row) => dot(row, value));
}

function rotateModule(value, module) {
  let rotated = [...value];
  for (let index = 0; index < module; index += 1) rotated = matrixVector(CYCLIC_ROTATION, rotated);
  return rotated;
}

function unrotateModule(value, module) {
  return rotateModule(value, (3 - module) % 3);
}

function radialDirections(frame, phase) {
  return {
    radial: add(scale(frame.u, Math.cos(phase)), scale(frame.v, Math.sin(phase))),
    tangent: add(scale(frame.u, -Math.sin(phase)), scale(frame.v, Math.cos(phase))),
  };
}

function flattenMemberVectors(memberVectors) {
  return memberVectors.flatMap((value) => value);
}

function gram(columns) {
  return columns.map((left) => columns.map((right) => dot(left, right)));
}

function matrixMaximumResidual(left, right) {
  return Math.max(...left.flatMap((row, i) => row.map((entry, j) => Math.abs(entry - right[i][j]))));
}

function maximumVectorResidual(left, right) {
  return Math.max(...left.map((entry, index) => Math.abs(entry - right[index])), 0);
}

function maximumMemberResidual(left, right, field) {
  const rightById = new Map(right.members.map((member) => [member.id, member]));
  return Math.max(...left.members.map((member) => norm(subtract(member[field], rightById.get(member.id)[field]))));
}

function memberId(module, polarity) {
  return `${module + 1}${polarity > 0 ? "+" : "-"}`;
}

function validateSeed(seed) {
  if (!seed || typeof seed !== "object") throw new TypeError("seed must be an object");
  const checked = {};
  for (const key of ["h", "rho", "theta", "hDot", "rhoDot", "thetaDot"]) {
    checked[key] = finiteNumber(seed[key], `seed.${key}`);
  }
  if (checked.rho < 0) throw new RangeError("seed.rho must be nonnegative");
  return checked;
}

function seedBasis(seed, frame) {
  const checked = validateSeed(seed);
  const { radial, tangent } = radialDirections(frame.frames[0], checked.theta);
  const axial = frame.axes[0];
  const displacement = add(scale(axial, checked.h), scale(radial, checked.rho));
  const displacementVelocity = add(
    scale(axial, checked.hDot),
    scale(radial, checked.rhoDot),
    scale(tangent, checked.rho * checked.thetaDot),
  );
  return {
    seed: checked,
    axial,
    radial,
    tangent,
    scaleDirection: unit(displacement, "seed displacement"),
    displacement,
    displacementVelocity,
  };
}

function coordinateVectors(coordinates, rates, basis) {
  const q = vector(coordinates, "coordinates", 5);
  const qDot = vector(rates, "rates", 5);
  const common = add(
    scale(basis.axial, q[0]),
    scale(basis.radial, q[1]),
    scale(basis.tangent, q[2]),
  );
  const commonVelocity = add(
    scale(basis.axial, qDot[0]),
    scale(basis.radial, qDot[1]),
    scale(basis.tangent, qDot[2]),
  );
  const midpoint = add(
    scale(CYCLIC_TRANSVERSE_BASIS[0], q[3]),
    scale(CYCLIC_TRANSVERSE_BASIS[1], q[4]),
  );
  const midpointVelocity = add(
    scale(CYCLIC_TRANSVERSE_BASIS[0], qDot[3]),
    scale(CYCLIC_TRANSVERSE_BASIS[1], qDot[4]),
  );
  return { q, qDot, common, commonVelocity, midpoint, midpointVelocity };
}

function pairConjugateTangentColumns(basis) {
  return [basis.axial, basis.radial, basis.tangent, null, null].map((direction, coordinate) =>
    flattenMemberVectors([0, 1, 2].flatMap((module) => {
      const phase = PHASE_OFFSETS[module];
      const local = coordinate < 3
        ? direction
        : scale(
          basis.scaleDirection,
          Math.SQRT2 * (coordinate === 3 ? Math.cos(phase) : Math.sin(phase)),
        );
      const rotated = rotateModule(local, module);
      return [rotated, scale(rotated, -1)];
    })));
}

function sectorDifferentialTangentColumns(basis) {
  return [basis.axial, basis.radial, basis.tangent, ...CYCLIC_TRANSVERSE_BASIS].map((direction, coordinate) =>
    flattenMemberVectors([0, 1, 2].flatMap((module) => {
      const rotated = rotateModule(direction, module);
      return coordinate < 3 ? [rotated, scale(rotated, -1)] : [rotated, rotated];
    })));
}

export function buildMatchedFiveCoordinateInitializations({
  seed,
  coordinates = [0, 0, 0, 0, 0],
  rates = [0, 0, 0, 0, 0],
  center = [0, 0, 0],
  centerVelocity = [0, 0, 0],
  frame,
} = {}) {
  const declared = frame ?? declaredFrame();
  const centroid = vector(center, "center");
  const centroidVelocity = vector(centerVelocity, "centerVelocity");
  const basis = seedBasis(seed, declared);
  const coordinateData = coordinateVectors(coordinates, rates, basis);
  const pairMembers = [];
  const sectorMembers = [];

  const positiveRepresentative = add(basis.displacement, coordinateData.common, coordinateData.midpoint);
  const negativeRepresentative = add(
    scale(basis.displacement, -1),
    scale(coordinateData.common, -1),
    coordinateData.midpoint,
  );
  const positiveRepresentativeVelocity = add(
    basis.displacementVelocity,
    coordinateData.commonVelocity,
    coordinateData.midpointVelocity,
  );
  const negativeRepresentativeVelocity = add(
    scale(basis.displacementVelocity, -1),
    scale(coordinateData.commonVelocity, -1),
    coordinateData.midpointVelocity,
  );

  for (let module = 0; module < 3; module += 1) {
    const phase = PHASE_OFFSETS[module];
    const structuralAmplitude = Math.SQRT2 * (
      coordinateData.q[3] * Math.cos(phase) + coordinateData.q[4] * Math.sin(phase)
    );
    const structuralRate = Math.SQRT2 * (
      coordinateData.qDot[3] * Math.cos(phase) + coordinateData.qDot[4] * Math.sin(phase)
    );
    const pairDisplacement = rotateModule(add(
      basis.displacement,
      coordinateData.common,
      scale(basis.scaleDirection, structuralAmplitude),
    ), module);
    const pairVelocity = rotateModule(add(
      basis.displacementVelocity,
      coordinateData.commonVelocity,
      scale(basis.scaleDirection, structuralRate),
    ), module);
    const sectorPositive = rotateModule(positiveRepresentative, module);
    const sectorNegative = rotateModule(negativeRepresentative, module);
    const sectorPositiveVelocity = rotateModule(positiveRepresentativeVelocity, module);
    const sectorNegativeVelocity = rotateModule(negativeRepresentativeVelocity, module);

    for (const polarity of [1, -1]) {
      pairMembers.push({
        id: memberId(module, polarity),
        module,
        polarity,
        position: add(centroid, scale(pairDisplacement, polarity)),
        velocity: add(centroidVelocity, scale(pairVelocity, polarity)),
      });
    }
    sectorMembers.push({
      id: memberId(module, 1), module, polarity: 1,
      position: add(centroid, sectorPositive),
      velocity: add(centroidVelocity, sectorPositiveVelocity),
    });
    sectorMembers.push({
      id: memberId(module, -1), module, polarity: -1,
      position: add(centroid, sectorNegative),
      velocity: add(centroidVelocity, sectorNegativeVelocity),
    });
  }

  const metadata = {
    coordinateNames: [...MATCHED_COORDINATE_NAMES],
    coordinates: coordinateData.q,
    rates: coordinateData.qDot,
    seed: basis.seed,
    seedBasis: {
      axial: basis.axial,
      radial: basis.radial,
      tangent: basis.tangent,
      scaleDirection: basis.scaleDirection,
      displacement: basis.displacement,
      displacementVelocity: basis.displacementVelocity,
    },
  };
  return {
    candidateA: {
      shortName: "A3 pair-conjugate slice",
      kind: "matched-five-coordinate-pair-conjugate",
      members: pairMembers,
      tangentColumns: pairConjugateTangentColumns(basis),
      center: centroid,
      centerVelocity: centroidVelocity,
      frame: declared,
      metadata,
    },
    candidateB: {
      shortName: "SD3",
      kind: "matched-five-coordinate-sector-differential",
      members: sectorMembers,
      tangentColumns: sectorDifferentialTangentColumns(basis),
      center: centroid,
      centerVelocity: centroidVelocity,
      frame: declared,
      metadata: {
        ...metadata,
        representativePositive: positiveRepresentative,
        representativeNegative: negativeRepresentative,
        representativePositiveVelocity: positiveRepresentativeVelocity,
        representativeNegativeVelocity: negativeRepresentativeVelocity,
      },
    },
  };
}

function recoverPairConjugateVectors(geometry, basis, field, centerField, baseVector) {
  const pulled = [0, 1, 2].map((module) => {
    const positive = geometry.members.find((member) => member.module === module && member.polarity === 1);
    const negative = geometry.members.find((member) => member.module === module && member.polarity === -1);
    const pairVector = scale(subtract(positive[field], negative[field]), 0.5);
    return unrotateModule(pairVector, module);
  });
  const average = meanVectors(pulled);
  const common = subtract(average, baseVector);
  const scalars = pulled.map((value) => dot(subtract(value, average), basis.scaleDirection));
  return [
    dot(common, basis.axial),
    dot(common, basis.radial),
    dot(common, basis.tangent),
    Math.SQRT2 / 3 * scalars.reduce((sum, value, module) => sum + value * Math.cos(PHASE_OFFSETS[module]), 0),
    Math.SQRT2 / 3 * scalars.reduce((sum, value, module) => sum + value * Math.sin(PHASE_OFFSETS[module]), 0),
  ];
}

function recoverSectorDifferentialVectors(geometry, basis, field, centerField, baseVector) {
  const positive = geometry.members.find((member) => member.module === 0 && member.polarity === 1);
  const negative = geometry.members.find((member) => member.module === 0 && member.polarity === -1);
  const positiveRelative = subtract(positive[field], geometry[centerField]);
  const negativeRelative = subtract(negative[field], geometry[centerField]);
  const common = subtract(scale(subtract(positiveRelative, negativeRelative), 0.5), baseVector);
  const midpoint = scale(add(positiveRelative, negativeRelative), 0.5);
  return [
    dot(common, basis.axial),
    dot(common, basis.radial),
    dot(common, basis.tangent),
    dot(midpoint, CYCLIC_TRANSVERSE_BASIS[0]),
    dot(midpoint, CYCLIC_TRANSVERSE_BASIS[1]),
  ];
}

export function recoverMatchedFiveCoordinates(geometry) {
  const basis = geometry.metadata?.seedBasis;
  if (!basis) throw new TypeError("geometry does not contain matched-ledger seed metadata");
  if (geometry.kind === "matched-five-coordinate-pair-conjugate") {
    return {
      coordinates: recoverPairConjugateVectors(geometry, basis, "position", "center", basis.displacement),
      rates: recoverPairConjugateVectors(geometry, basis, "velocity", "centerVelocity", basis.displacementVelocity),
    };
  }
  if (geometry.kind === "matched-five-coordinate-sector-differential") {
    return {
      coordinates: recoverSectorDifferentialVectors(geometry, basis, "position", "center", basis.displacement),
      rates: recoverSectorDifferentialVectors(geometry, basis, "velocity", "centerVelocity", basis.displacementVelocity),
    };
  }
  throw new TypeError(`unsupported matched-ledger geometry kind: ${geometry.kind}`);
}

export function auditMatchedFiveCoordinateInitializations(input) {
  const built = buildMatchedFiveCoordinateInitializations(input);
  const declaredCoordinates = built.candidateA.metadata.coordinates;
  const declaredRates = built.candidateA.metadata.rates;
  const expectedGram = Array.from({ length: 5 }, (_, row) =>
    Array.from({ length: 5 }, (_, column) => row === column ? 6 : 0));
  const pairGram = gram(built.candidateA.tangentColumns);
  const sectorGram = gram(built.candidateB.tangentColumns);
  const recoveredA = recoverMatchedFiveCoordinates(built.candidateA);
  const recoveredB = recoverMatchedFiveCoordinates(built.candidateB);
  const commonInput = {
    ...input,
    coordinates: [...declaredCoordinates.slice(0, 3), 0, 0],
    rates: [...declaredRates.slice(0, 3), 0, 0],
  };
  const common = buildMatchedFiveCoordinateInitializations(commonInput);
  const analyzedA = analyzeGeometry(built.candidateA);
  const analyzedB = analyzeGeometry(built.candidateB);
  const gaugeResidual = Math.abs(dot(
    scale(add(
      built.candidateB.metadata.representativePositive,
      built.candidateB.metadata.representativeNegative,
    ), 0.5),
    CYCLIC_AXIS,
  ));
  const gaugeRateResidual = Math.abs(dot(
    scale(add(
      built.candidateB.metadata.representativePositiveVelocity,
      built.candidateB.metadata.representativeNegativeVelocity,
    ), 0.5),
    CYCLIC_AXIS,
  ));
  const report = {
    status: "geometry-only",
    cF: CF,
    coordinateNames: [...MATCHED_COORDINATE_NAMES],
    input: {
      seed: built.candidateA.metadata.seed,
      coordinates: built.candidateA.metadata.coordinates,
      rates: built.candidateA.metadata.rates,
    },
    exactChecks: {
      expectedTangentGram: expectedGram,
      candidateATangentGram: pairGram,
      candidateBTangentGram: sectorGram,
      candidateATangentGramResidual: matrixMaximumResidual(pairGram, expectedGram),
      candidateBTangentGramResidual: matrixMaximumResidual(sectorGram, expectedGram),
      candidateACoordinateRecoveryResidual: maximumVectorResidual(recoveredA.coordinates, declaredCoordinates),
      candidateARateRecoveryResidual: maximumVectorResidual(recoveredA.rates, declaredRates),
      candidateBCoordinateRecoveryResidual: maximumVectorResidual(recoveredB.coordinates, declaredCoordinates),
      candidateBRateRecoveryResidual: maximumVectorResidual(recoveredB.rates, declaredRates),
      candidateBGaugeResidual: gaugeResidual,
      candidateBGaugeRateResidual: gaugeRateResidual,
      commonLocusPositionResidual: maximumMemberResidual(common.candidateA, common.candidateB, "position"),
      commonLocusVelocityResidual: maximumMemberResidual(common.candidateA, common.candidateB, "velocity"),
    },
    candidateA: analyzedA,
    candidateB: analyzedB,
    recovery: { candidateA: recoveredA, candidateB: recoveredB },
    decision: {
      matchedDimension: 5,
      sharedMemberwiseDirections: 3,
      structuralComplementDimension: 2,
      structuralComplementRelation: "polarity-antisymmetric Candidate-A scale doublet versus polarity-symmetric SD3 midpoint doublet",
      geometryPrerequisiteClosed: true,
      scope: "initial position and velocity ledger only; no Master-Equation or return claim",
    },
  };
  const conditions = [
    [analyzedA.centroidResidual < 1e-12, "Candidate-A centroid"],
    [analyzedB.centroidResidual < 1e-12, "SD3 centroid"],
    [analyzedA.tangent.rank === 5, "Candidate-A tangent rank"],
    [analyzedB.tangent.rank === 5, "SD3 tangent rank"],
    [report.exactChecks.candidateATangentGramResidual < 1e-11, "Candidate-A tangent metric"],
    [report.exactChecks.candidateBTangentGramResidual < 1e-11, "SD3 tangent metric"],
    [report.exactChecks.candidateACoordinateRecoveryResidual < 1e-11, "Candidate-A inverse map"],
    [report.exactChecks.candidateARateRecoveryResidual < 1e-11, "Candidate-A inverse rate map"],
    [report.exactChecks.candidateBCoordinateRecoveryResidual < 1e-11, "SD3 inverse map"],
    [report.exactChecks.candidateBRateRecoveryResidual < 1e-11, "SD3 inverse rate map"],
    [gaugeResidual < 1e-12, "SD3 gauge"],
    [gaugeRateResidual < 1e-12, "SD3 gauge rate"],
    [report.exactChecks.commonLocusPositionResidual < 1e-12, "common-locus positions"],
    [report.exactChecks.commonLocusVelocityResidual < 1e-12, "common-locus velocities"],
    [analyzedA.minimumPairDistance > 0, "Candidate-A clearance"],
    [analyzedB.minimumPairDistance > 0, "SD3 clearance"],
    [Math.max(...analyzedA.speedBudget.map((row) => row.speed)) < CF, "Candidate-A speed guard"],
    [Math.max(...analyzedB.speedBudget.map((row) => row.speed)) < CF, "SD3 speed guard"],
  ];
  for (const [condition, name] of conditions) {
    if (!condition) throw new RangeError(`matched ledger identity failed: ${name}`);
  }
  return report;
}

export function runDeclaredMatchedLedgerAudit() {
  return auditMatchedFiveCoordinateInitializations({
    seed: { h: 0.28, rho: 0.19, theta: 0.42, hDot: 0.01, rhoDot: -0.02, thetaDot: 0.3 },
    coordinates: [0.02, -0.015, 0.01, 0.012, -0.008],
    rates: [0.03, -0.02, 0.04, 0.01, -0.015],
  });
}

const invokedPath = process.argv[1] ? pathToFileURL(process.argv[1]).href : null;
if (invokedPath === import.meta.url) {
  process.stdout.write(`${JSON.stringify(runDeclaredMatchedLedgerAudit(), null, 2)}\n`);
}

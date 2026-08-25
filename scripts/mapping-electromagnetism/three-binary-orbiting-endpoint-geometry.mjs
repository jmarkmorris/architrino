import { pathToFileURL } from "node:url";

// Geometry-only comparison instrument. It does not evaluate the Master Equation
// and cannot establish binding, return, retention, stability, or particle roles.

export const CF = 1;
export const PHASE_OFFSETS = [0, 2 * Math.PI / 3, 4 * Math.PI / 3];
export const CYCLIC_PERMUTATION = [1, 2, 0];
export const CYCLIC_ROTATION = [
  [0, 0, 1],
  [1, 0, 0],
  [0, 1, 0],
];

const DEFAULT_AXES = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

const CYCLIC_BASE_FRAMES = [
  { u: [0, 1, 0], v: [0, 0, 1] },
  { u: [0, 0, 1], v: [1, 0, 0] },
  { u: [1, 0, 0], v: [0, 1, 0] },
];

const EPS = 1e-12;

function finiteNumber(value, name) {
  if (!Number.isFinite(value)) {
    throw new TypeError(`${name} must be finite`);
  }
  return value;
}

function vector(value, name) {
  if (!Array.isArray(value) || value.length !== 3) {
    throw new TypeError(`${name} must be a three-vector`);
  }
  return value.map((entry, index) => finiteNumber(entry, `${name}[${index}]`));
}

function add(...values) {
  return values[0].map((_, index) =>
    values.reduce((sum, value) => sum + value[index], 0));
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

function cross(left, right) {
  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ];
}

function norm(value) {
  return Math.hypot(...value);
}

function unit(value, name) {
  const magnitude = norm(value);
  if (!(magnitude > EPS)) {
    throw new RangeError(`${name} is degenerate`);
  }
  return scale(value, 1 / magnitude);
}

function meanVectors(values) {
  return scale(values.reduce((sum, value) => add(sum, value), [0, 0, 0]), 1 / values.length);
}

function matrixVector(matrix, value) {
  return matrix.map((row) => dot(row, value));
}

function outer(left, right) {
  return left.map((entry) => right.map((other) => entry * other));
}

function addMatrices(left, right) {
  return left.map((row, i) => row.map((entry, j) => entry + right[i][j]));
}

function zeroMatrix(size) {
  return Array.from({ length: size }, () => Array(size).fill(0));
}

function determinant3(matrix) {
  const [[a, b, c], [d, e, f], [g, h, i]] = matrix;
  return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
}

function symmetricEigenvalues(input) {
  const matrix = input.map((row) => [...row]);
  const size = matrix.length;
  for (let iteration = 0; iteration < 100 * size * size; iteration += 1) {
    let p = 0;
    let q = 1;
    let largest = 0;
    for (let i = 0; i < size; i += 1) {
      for (let j = i + 1; j < size; j += 1) {
        if (Math.abs(matrix[i][j]) > largest) {
          largest = Math.abs(matrix[i][j]);
          p = i;
          q = j;
        }
      }
    }
    if (largest < 1e-14) break;
    const angle = 0.5 * Math.atan2(2 * matrix[p][q], matrix[q][q] - matrix[p][p]);
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    for (let k = 0; k < size; k += 1) {
      if (k === p || k === q) continue;
      const mkp = matrix[k][p];
      const mkq = matrix[k][q];
      matrix[k][p] = matrix[p][k] = cosine * mkp - sine * mkq;
      matrix[k][q] = matrix[q][k] = sine * mkp + cosine * mkq;
    }
    const app = matrix[p][p];
    const aqq = matrix[q][q];
    const apq = matrix[p][q];
    matrix[p][p] = cosine ** 2 * app - 2 * sine * cosine * apq + sine ** 2 * aqq;
    matrix[q][q] = sine ** 2 * app + 2 * sine * cosine * apq + cosine ** 2 * aqq;
    matrix[p][q] = matrix[q][p] = 0;
  }
  return matrix.map((row, index) => Math.max(0, row[index])).sort((a, b) => a - b);
}

function gram(vectors) {
  return vectors.map((left) => vectors.map((right) => dot(left, right)));
}

function rankFromGram(gramMatrix) {
  const eigenvalues = symmetricEigenvalues(gramMatrix);
  const maximum = Math.max(...eigenvalues, 0);
  const floor = Math.max(1e-12, maximum * 1e-10);
  return {
    eigenvalues,
    floor,
    rank: eigenvalues.filter((value) => value > floor).length,
  };
}

function flattenMemberVectors(memberVectors) {
  return memberVectors.flatMap((value) => value);
}

function rotateFrame(frame, phase) {
  return {
    u: add(scale(frame.u, Math.cos(phase)), scale(frame.v, -Math.sin(phase))),
    v: add(scale(frame.u, Math.sin(phase)), scale(frame.v, Math.cos(phase))),
  };
}

export function declaredFrame({ axes = DEFAULT_AXES } = {}) {
  if (!Array.isArray(axes) || axes.length !== 3) {
    throw new TypeError("axes must contain exactly three vectors");
  }
  const normalizedAxes = axes.map((axis, index) => unit(vector(axis, `axes[${index}]`), `axes[${index}]`));
  const axisGram = gram(normalizedAxes);
  const determinant = determinant3(axisGram);
  if (!(determinant > 1e-10)) {
    throw new RangeError("axes must form a nondegenerate rank-three frame");
  }
  const isDefault = normalizedAxes.every((axis, index) =>
    norm(subtract(axis, DEFAULT_AXES[index])) < EPS);
  if (!isDefault) {
    throw new RangeError("this controlled instrument requires the declared orthonormal comparison frame");
  }
  const frames = CYCLIC_BASE_FRAMES.map((frame, index) => rotateFrame(frame, PHASE_OFFSETS[index]));
  frames.forEach((frame, index) => {
    const residual = Math.max(
      Math.abs(dot(normalizedAxes[index], frame.u)),
      Math.abs(dot(normalizedAxes[index], frame.v)),
      Math.abs(dot(frame.u, frame.v)),
      Math.abs(norm(frame.u) - 1),
      Math.abs(norm(frame.v) - 1),
      norm(subtract(cross(normalizedAxes[index], frame.u), frame.v)),
    );
    if (residual > 1e-11) throw new RangeError(`local frame ${index} is malformed`);
  });
  const eigenvalues = symmetricEigenvalues(axisGram);
  return {
    axes: normalizedAxes,
    frames,
    phaseOffsets: [...PHASE_OFFSETS],
    axisAudit: {
      gram: axisGram,
      determinant,
      eigenvalues,
      conditionNumber: Math.max(...eigenvalues) / Math.min(...eigenvalues),
      axisSum: normalizedAxes.reduce((sum, axis) => add(sum, axis), [0, 0, 0]),
      secondMoment: normalizedAxes.reduce(
        (sum, axis) => addMatrices(sum, outer(axis, axis)),
        zeroMatrix(3),
      ),
    },
  };
}

function radialDirections(frame, phase) {
  const radial = add(scale(frame.u, Math.cos(phase)), scale(frame.v, Math.sin(phase)));
  const tangent = add(scale(frame.u, -Math.sin(phase)), scale(frame.v, Math.cos(phase)));
  return { radial, tangent };
}

function memberId(module, polarity) {
  return `${module + 1}${polarity > 0 ? "+" : "-"}`;
}

function validateStateRow(row, name) {
  for (const key of ["h", "rho", "theta", "hDot", "rhoDot", "thetaDot"]) {
    finiteNumber(row[key], `${name}.${key}`);
  }
  if (row.rho < 0) throw new RangeError(`${name}.rho must be nonnegative`);
}

export function buildPairConjugate({ modules, center = [0, 0, 0], centerVelocity = [0, 0, 0], frame } = {}) {
  const declared = frame ?? declaredFrame();
  if (!Array.isArray(modules) || modules.length !== 3) {
    throw new TypeError("pair-conjugate modules must contain three rows");
  }
  const centroid = vector(center, "center");
  const centroidVelocity = vector(centerVelocity, "centerVelocity");
  const members = [];
  const tangentColumns = [];
  modules.forEach((row, module) => {
    validateStateRow(row, `modules[${module}]`);
    const axis = declared.axes[module];
    const phase = row.theta + declared.phaseOffsets[module];
    const { radial, tangent } = radialDirections(declared.frames[module], phase);
    const displacement = add(scale(axis, row.h), scale(radial, row.rho));
    const displacementVelocity = add(
      scale(axis, row.hDot),
      scale(radial, row.rhoDot),
      scale(tangent, row.rho * row.thetaDot),
    );
    for (const polarity of [1, -1]) {
      members.push({
        id: memberId(module, polarity), module, polarity,
        position: add(centroid, scale(displacement, polarity)),
        velocity: add(centroidVelocity, scale(displacementVelocity, polarity)),
      });
    }
    for (const basis of [axis, radial, scale(tangent, row.rho)]) {
      tangentColumns.push(flattenMemberVectors(Array.from({ length: 6 }, (_, index) => {
        const indexModule = Math.floor(index / 2);
        const polarity = index % 2 === 0 ? 1 : -1;
        return indexModule === module ? scale(basis, polarity) : [0, 0, 0];
      })));
    }
  });
  return { kind: "pair-conjugate", members, tangentColumns, center: centroid, centerVelocity: centroidVelocity, frame: declared };
}

function sectorRawRows(sector, polarity, declared) {
  validateStateRow(sector, polarity > 0 ? "positive" : "negative");
  return declared.axes.map((axis, module) => {
    const phase = polarity * sector.theta + declared.phaseOffsets[module];
    const { radial, tangent } = radialDirections(declared.frames[module], phase);
    return {
      module,
      polarity,
      position: add(scale(axis, polarity * sector.h), scale(radial, sector.rho)),
      velocity: add(
        scale(axis, polarity * sector.hDot),
        scale(radial, sector.rhoDot),
        scale(tangent, polarity * sector.rho * sector.thetaDot),
      ),
      basis: [scale(axis, polarity), radial, scale(tangent, polarity * sector.rho)],
    };
  });
}

export function buildSectorDifferential({ positive, negative, center = [0, 0, 0], centerVelocity = [0, 0, 0], frame, centered = true } = {}) {
  const declared = frame ?? declaredFrame();
  const centroid = vector(center, "center");
  const centroidVelocity = vector(centerVelocity, "centerVelocity");
  const rawRows = [
    ...sectorRawRows(positive, 1, declared),
    ...sectorRawRows(negative, -1, declared),
  ];
  const rawCentroidOffset = meanVectors(rawRows.map((row) => row.position));
  const rawCentroidVelocity = meanVectors(rawRows.map((row) => row.velocity));
  const correction = centered ? rawCentroidOffset : [0, 0, 0];
  const velocityCorrection = centered ? rawCentroidVelocity : [0, 0, 0];
  const members = rawRows.map((row) => ({
    id: memberId(row.module, row.polarity),
    module: row.module,
    polarity: row.polarity,
    position: add(centroid, subtract(row.position, correction)),
    velocity: add(centroidVelocity, subtract(row.velocity, velocityCorrection)),
  }));
  const tangentColumns = [];
  for (const polarity of [1, -1]) {
    for (let coordinate = 0; coordinate < 3; coordinate += 1) {
      const rawBasis = rawRows.map((row) =>
        row.polarity === polarity ? row.basis[coordinate] : [0, 0, 0]);
      const basisMean = centered ? meanVectors(rawBasis) : [0, 0, 0];
      tangentColumns.push(flattenMemberVectors(rawBasis.map((basis) => subtract(basis, basisMean))));
    }
  }
  return {
    kind: centered ? "sector-differential-centered" : "sector-differential-raw",
    members,
    tangentColumns,
    center: centroid,
    centerVelocity: centroidVelocity,
    frame: declared,
    rawCentroidOffset,
    rawCentroidVelocity,
  };
}

function byPolarity(geometry, polarity) {
  return geometry.members.filter((member) => member.polarity === polarity);
}

function relative(member, center) {
  return subtract(member.position, center);
}

function momentTensor(members, center, polarityWeighted = false) {
  return members.reduce((sum, member) => {
    const weight = polarityWeighted ? member.polarity : 1;
    return addMatrices(sum, outer(relative(member, center), scale(relative(member, center), weight)));
  }, zeroMatrix(3));
}

function maximumNorm(values) {
  return Math.max(...values.map(norm), 0);
}

function cyclicSymmetryResidual(geometry) {
  const memberMap = new Map(geometry.members.map((member) => [member.id, member]));
  const residuals = [];
  for (const member of geometry.members) {
    const target = memberMap.get(memberId(CYCLIC_PERMUTATION[member.module], member.polarity));
    residuals.push(subtract(
      matrixVector(CYCLIC_ROTATION, relative(member, geometry.center)),
      relative(target, geometry.center),
    ));
  }
  return maximumNorm(residuals);
}

export function analyzeGeometry(geometry) {
  const totalCentroid = meanVectors(geometry.members.map((member) => member.position));
  const sectorCentroids = Object.fromEntries([[1, "positive"], [-1, "negative"]].map(([polarity, name]) => [
    name,
    meanVectors(byPolarity(geometry, polarity).map((member) => member.position)),
  ]));
  const dipole = geometry.members.reduce(
    (sum, member) => add(sum, scale(relative(member, geometry.center), member.polarity)),
    [0, 0, 0],
  );
  const pairDistances = [];
  for (let left = 0; left < geometry.members.length; left += 1) {
    for (let right = left + 1; right < geometry.members.length; right += 1) {
      pairDistances.push({
        pair: [geometry.members[left].id, geometry.members[right].id],
        distance: norm(subtract(geometry.members[left].position, geometry.members[right].position)),
      });
    }
  }
  const binaryRows = [0, 1, 2].map((module) => {
    const positive = geometry.members.find((member) => member.module === module && member.polarity === 1);
    const negative = geometry.members.find((member) => member.module === module && member.polarity === -1);
    const midpoint = scale(add(positive.position, negative.position), 0.5);
    return {
      module: module + 1,
      midpoint,
      midpointOffset: subtract(midpoint, geometry.center),
      antipodalityResidual: norm(subtract(add(positive.position, negative.position), scale(geometry.center, 2))),
      relativeAreaRate: cross(
        subtract(positive.position, negative.position),
        subtract(positive.velocity, negative.velocity),
      ),
    };
  });
  const currentLikeMoment = geometry.members.reduce((sum, member) => add(
    sum,
    scale(cross(relative(member, geometry.center), subtract(member.velocity, geometry.centerVelocity)), member.polarity),
  ), [0, 0, 0]);
  const tangent = rankFromGram(gram(geometry.tangentColumns));
  return {
    kind: geometry.kind,
    cF: CF,
    memberInventory: geometry.members.map(({ id, module, polarity }) => ({ id, module: module + 1, polarity })),
    centroid: totalCentroid,
    centroidResidual: norm(subtract(totalCentroid, geometry.center)),
    sectorCentroids,
    polarityDipole: dipole,
    binaryRows,
    axisAudit: geometry.frame.axisAudit,
    firstMoment: geometry.members.reduce((sum, member) => add(sum, relative(member, geometry.center)), [0, 0, 0]),
    secondMoment: momentTensor(geometry.members, geometry.center),
    polarityWeightedSecondMoment: momentTensor(geometry.members, geometry.center, true),
    pairDistances,
    minimumPairDistance: Math.min(...pairDistances.map((row) => row.distance)),
    speedBudget: geometry.members.map((member) => ({ id: member.id, speed: norm(subtract(member.velocity, geometry.centerVelocity)) })),
    currentLikeMoment,
    cyclicSymmetryResidual: cyclicSymmetryResidual(geometry),
    tangent,
    rawCentroidOffset: geometry.rawCentroidOffset,
    rawCentroidVelocity: geometry.rawCentroidVelocity,
  };
}

export function tetrahedralSubsetAudit() {
  const axes = [
    [1, 1, 1],
    [1, -1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
  ].map((axis) => unit(axis, "tetrahedral axis"));
  const subset = axes.slice(0, 3);
  const subsetGram = gram(subset);
  const secondMoment = subset.reduce((sum, axis) => addMatrices(sum, outer(axis, axis)), zeroMatrix(3));
  const expectedSecondMoment = addMatrices(
    [[4 / 3, 0, 0], [0, 4 / 3, 0], [0, 0, 4 / 3]],
    outer(axes[3], scale(axes[3], -1)),
  );
  return {
    gram: subsetGram,
    determinant: determinant3(subsetGram),
    eigenvalues: symmetricEigenvalues(subsetGram),
    axisSum: subset.reduce((sum, axis) => add(sum, axis), [0, 0, 0]),
    missingAxisResidual: norm(add(...subset, axes[3])),
    secondMoment,
    secondMomentResidual: Math.sqrt(secondMoment.flat().reduce(
      (sum, value, index) => sum + (value - expectedSecondMoment.flat()[index]) ** 2,
      0,
    )),
  };
}

function sampleRows() {
  return {
    a2: [0, 1, 2].map(() => ({ h: 0.34, rho: 0.22, theta: 0.41, hDot: -0.07, rhoDot: 0.04, thetaDot: 0.63 })),
    a3: [
      { h: 0.31, rho: 0.19, theta: 0.23, hDot: 0.04, rhoDot: -0.03, thetaDot: 0.71 },
      { h: 0.27, rho: 0.24, theta: 1.07, hDot: -0.06, rhoDot: 0.02, thetaDot: -0.43 },
      { h: 0.38, rho: 0.16, theta: -0.64, hDot: 0.01, rhoDot: 0.05, thetaDot: 0.52 },
    ],
    sector: {
      positive: { h: 0.33, rho: 0.21, theta: 0.37, hDot: 0.05, rhoDot: -0.02, thetaDot: 0.61 },
      negative: { h: 0.26, rho: 0.17, theta: 1.18, hDot: -0.04, rhoDot: 0.03, thetaDot: -0.48 },
    },
  };
}

export function runDeclaredAudit() {
  const samples = sampleRows();
  const pairReductionPositive = { h: 0.3, rho: 0.2, theta: 0.4, hDot: 0.03, rhoDot: -0.02, thetaDot: 0.7 };
  const pairReductionNegative = {
    h: pairReductionPositive.h,
    rho: pairReductionPositive.rho,
    theta: Math.PI - pairReductionPositive.theta,
    hDot: pairReductionPositive.hDot,
    rhoDot: pairReductionPositive.rhoDot,
    thetaDot: -pairReductionPositive.thetaDot,
  };
  const zero = { h: 0, rho: 0, theta: 0, hDot: 0, rhoDot: 0, thetaDot: 0 };
  const report = {
    status: "geometry-only",
    cF: CF,
    samples: {
      symmetricA2: analyzeGeometry(buildPairConjugate({ modules: samples.a2 })),
      genericA3: analyzeGeometry(buildPairConjugate({ modules: samples.a3 })),
      a1Boundary: analyzeGeometry(buildPairConjugate({ modules: samples.a3.map((row) => ({ ...row, h: 0, hDot: 0 })) })),
      b1AxisBoundary: {
        declaredAxisGramDeterminant: 0,
        acceptedByRankThreeFrame: false,
      },
      genericSectorDifferentialRaw: analyzeGeometry(buildSectorDifferential({ ...samples.sector, centered: false })),
      genericSectorDifferentialCentered: analyzeGeometry(buildSectorDifferential({ ...samples.sector, centered: true })),
      pairConjugateReduction: analyzeGeometry(buildSectorDifferential({
        positive: pairReductionPositive,
        negative: pairReductionNegative,
        centered: true,
      })),
      deliberateCollision: analyzeGeometry(buildPairConjugate({ modules: [zero, samples.a3[1], samples.a3[2]] })),
      tetrahedralSubset: tetrahedralSubsetAudit(),
    },
    decisionInputs: {
      cyclicCenteredSectorTangentRank: 5,
      declaredSectorParameterCount: 6,
      exactIndependentSectorCenteringWithRankThreeAxes: false,
      reason: "three rank-three axes have nonzero sum; centering the matched cyclic sector chart removes one translation-like tangent direction",
    },
  };
  const samplesAudit = report.samples;
  const maximumAntipodality = (audit) => Math.max(
    ...audit.binaryRows.map((row) => row.antipodalityResidual),
  );
  const requireResidual = (condition, message) => {
    if (!condition) throw new RangeError(`declared identity failed: ${message}`);
  };
  requireResidual(samplesAudit.symmetricA2.centroidResidual < 1e-12, "A2 centroid");
  requireResidual(samplesAudit.symmetricA2.cyclicSymmetryResidual < 1e-12, "A2 cyclic symmetry");
  requireResidual(maximumAntipodality(samplesAudit.symmetricA2) < 1e-12, "A2 antipodality");
  requireResidual(samplesAudit.genericA3.tangent.rank === 9, "generic A3 tangent rank");
  requireResidual(maximumAntipodality(samplesAudit.genericA3) < 1e-12, "generic A3 antipodality");
  requireResidual(samplesAudit.a1Boundary.centroidResidual < 1e-12, "A1 centroid");
  requireResidual(samplesAudit.genericSectorDifferentialRaw.tangent.rank === 6, "raw sector tangent rank");
  requireResidual(samplesAudit.genericSectorDifferentialRaw.centroidResidual > 1e-6, "raw sector center offset");
  requireResidual(samplesAudit.genericSectorDifferentialCentered.centroidResidual < 1e-12, "centered sector centroid");
  requireResidual(samplesAudit.genericSectorDifferentialCentered.cyclicSymmetryResidual < 1e-12, "centered sector cyclic symmetry");
  requireResidual(samplesAudit.genericSectorDifferentialCentered.tangent.rank === 5, "centered sector tangent rank");
  requireResidual(maximumAntipodality(samplesAudit.pairConjugateReduction) < 1e-12, "sector pair reduction");
  requireResidual(Math.abs(samplesAudit.tetrahedralSubset.determinant - 16 / 27) < 1e-12, "tetrahedral determinant");
  requireResidual(samplesAudit.tetrahedralSubset.missingAxisResidual < 1e-12, "tetrahedral missing-axis sum");
  requireResidual(samplesAudit.tetrahedralSubset.secondMomentResidual < 1e-12, "tetrahedral second moment");
  requireResidual(samplesAudit.deliberateCollision.minimumPairDistance === 0, "collision control");
  return report;
}

const invokedPath = process.argv[1] ? pathToFileURL(process.argv[1]).href : null;
if (invokedPath === import.meta.url) {
  process.stdout.write(`${JSON.stringify(runDeclaredAudit(), null, 2)}\n`);
}

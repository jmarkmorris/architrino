#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { BORG_BRAID_RECORD_CATALOG } from "../../src/apps/borg/BorgBraidRecordCatalog.js";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const DEFAULT_TOLERANCE = 1e-6;

export function rigidPairResidual({
  betaF,
  separationDirection,
  driftDirection,
  weightedInverseSquare = 1,
}) {
  requireSubFieldBeta(betaF);
  const n = normalizeVector(separationDirection, "separationDirection");
  const e = normalizeVector(driftDirection, "driftDirection");
  const cosine = dot(n, e);
  return scaleVector(
    subtractVectors(e, scaleVector(n, 2 * cosine)),
    2 * betaF * weightedInverseSquare,
  );
}

export function transmitterHistoryCandidateAcceleration({
  causalSeparation,
  transmitterVelocity,
  delay,
  coupling = 1,
  signedChargeProduct = 1,
  scalarWeight,
}) {
  if (!Number.isFinite(delay) || delay < 0) {
    throw new RangeError("delay must be finite and nonnegative");
  }
  const r = requireFiniteVector(causalSeparation, "causalSeparation");
  const velocity = requireFiniteVector(transmitterVelocity, "transmitterVelocity");
  const extrapolated = subtractVectors(r, scaleVector(velocity, delay));
  const distance = vectorNorm(extrapolated);
  if (!(distance > 0)) {
    throw new RangeError("extrapolated separation must be nonzero");
  }
  const betaSquared = dot(velocity, velocity);
  requireSubFieldBeta(Math.sqrt(betaSquared));
  const zeta = dot(velocity, extrapolated) / distance;
  const weight =
    scalarWeight?.({ betaSquared, zetaSquared: zeta * zeta }) ??
    Math.sqrt(1 - betaSquared);
  if (!Number.isFinite(weight)) {
    throw new TypeError("scalarWeight must return a finite value");
  }
  return scaleVector(
    extrapolated,
    coupling * signedChargeProduct * weight / (distance * distance * distance),
  );
}

export function rigidResidualOperator(sites) {
  if (!Array.isArray(sites) || sites.length < 2) {
    throw new TypeError("rigid residual operator requires at least two sites");
  }
  const operator = zeroMatrix();
  for (let i = 0; i < sites.length; i += 1) {
    for (let j = i + 1; j < sites.length; j += 1) {
      const displacement = subtractVectors(sites[i].position, sites[j].position);
      const distanceSquared = dot(displacement, displacement);
      if (!(distanceSquared > 0)) {
        throw new RangeError(`rigid residual operator has coincident sites ${i} and ${j}`);
      }
      const direction = scaleVector(displacement, 1 / Math.sqrt(distanceSquared));
      const weight = Number(sites[i].polarity) * Number(sites[j].polarity) / distanceSquared;
      addScaledIdentity(operator, weight);
      addOuterProduct(operator, direction, -2 * weight);
    }
  }
  return operator;
}

export function evaluateWorldlinePosition(worldline, time) {
  const segment = worldline.segments.find(
    (candidate, index) =>
      time >= candidate.startTime - 1e-12 &&
      (time < candidate.endTime - 1e-12 ||
        (index === worldline.segments.length - 1 && time <= candidate.endTime + 1e-12)),
  );
  if (!segment) {
    throw new RangeError(`worldline ${worldline.id} does not cover T=${time}`);
  }
  const u = time - segment.startTime;
  return segment.coefficients.map(([a0, a1, a2, a3]) =>
    a0 + a1 * u + a2 * u * u + a3 * u * u * u,
  );
}

export function analyzePrescribedRecord(record, { tolerance = DEFAULT_TOLERANCE } = {}) {
  if (record?.provenance?.engineId !== "prescribed-geometry") {
    throw new TypeError("catalog null-space analysis accepts prescribed-geometry records only");
  }
  if (record?.provenance?.evidenceStatus !== "display-only") {
    throw new TypeError("catalog null-space analysis requires display-only provenance");
  }
  const period = Number(record.provenance.prescribedGeometry.prescribedReturnPeriod);
  const start = Number(record.window.start);
  const stop = Math.min(Number(record.window.end), start + period);
  const times = record.worldlines[0].segments
    .map((segment) => segment.startTime)
    .filter((time) => time >= start - 1e-12 && time < stop - 1e-12);
  if (times.length === 0) {
    throw new RangeError(`record ${record.sourceId} has no samples in its return period`);
  }

  const gram = zeroMatrix();
  const operators = [];
  let maximumOperatorNorm = 0;
  let maximumAxisResiduals = [0, 0, 0];
  for (const time of times) {
    const sites = record.worldlines.map((worldline) => ({
      position: evaluateWorldlinePosition(worldline, time),
      polarity: worldline.polarity,
    }));
    const operator = rigidResidualOperator(sites);
    operators.push(operator);
    maximumOperatorNorm = Math.max(maximumOperatorNorm, frobeniusNorm(operator));
    for (let axis = 0; axis < 3; axis += 1) {
      maximumAxisResiduals[axis] = Math.max(
        maximumAxisResiduals[axis],
        vectorNorm(matrixVectorProduct(operator, basisVector(axis))),
      );
    }
    addMatrix(gram, matrixMultiply(transpose(operator), operator));
  }
  scaleMatrixInPlace(gram, 1 / times.length);
  const eigensystem = symmetricEigenDecomposition(gram);
  const commonResidual = Math.sqrt(Math.max(0, eigensystem.values[0]));
  const bestFixedDriftDirection = eigensystem.vectors[0];
  const maximumCommonResidual = operators.reduce(
    (maximum, operator) =>
      Math.max(maximum, vectorNorm(matrixVectorProduct(operator, bestFixedDriftDirection))),
    0,
  );
  const scale = Math.max(maximumOperatorNorm, Number.EPSILON);
  const relativeCommonResidual = maximumCommonResidual / scale;
  return Object.freeze({
    sourceId: record.sourceId,
    title: record.title,
    sampleCount: times.length,
    interval: [times[0], times[times.length - 1]],
    maximumOperatorNorm,
    maximumAxisResiduals,
    commonResidual,
    maximumCommonResidual,
    relativeCommonResidual,
    bestFixedDriftDirection,
    status: relativeCommonResidual <= tolerance ? "pass" : "fail",
    tolerance,
    authority: "frozen-geometry display-only necessary-condition diagnostic",
  });
}

export function analyzeBorgCatalog({ tolerance = DEFAULT_TOLERANCE } = {}) {
  return BORG_BRAID_RECORD_CATALOG.entries.map((entry) => {
    const recordPath = path.join(REPO_ROOT, entry.recordUrl);
    const record = JSON.parse(fs.readFileSync(recordPath, "utf8"));
    return Object.freeze({
      catalogId: entry.id,
      familyId: entry.familyId,
      label: entry.label,
      recordUrl: entry.recordUrl,
      ...analyzePrescribedRecord(record, { tolerance }),
    });
  });
}

function requireSubFieldBeta(betaF) {
  if (!Number.isFinite(betaF) || betaF < 0 || betaF >= 1) {
    throw new RangeError("betaF must satisfy 0 <= betaF < 1");
  }
}

function normalizeVector(vector, label) {
  const finiteVector = requireFiniteVector(vector, label);
  const norm = vectorNorm(finiteVector);
  if (!(norm > 0)) {
    throw new RangeError(`${label} must be nonzero`);
  }
  return scaleVector(finiteVector, 1 / norm);
}

function requireFiniteVector(vector, label) {
  if (!Array.isArray(vector) || vector.length !== 3 || vector.some((value) => !Number.isFinite(value))) {
    throw new TypeError(`${label} must be a finite three-vector`);
  }
  return [...vector];
}

function zeroMatrix() {
  return Array.from({ length: 3 }, () => [0, 0, 0]);
}

function basisVector(axis) {
  return [axis === 0 ? 1 : 0, axis === 1 ? 1 : 0, axis === 2 ? 1 : 0];
}

function dot(left, right) {
  return left[0] * right[0] + left[1] * right[1] + left[2] * right[2];
}

function vectorNorm(vector) {
  return Math.sqrt(dot(vector, vector));
}

function scaleVector(vector, scalar) {
  return vector.map((value) => value * scalar);
}

function subtractVectors(left, right) {
  return left.map((value, index) => value - right[index]);
}

function addScaledIdentity(matrix, scalar) {
  for (let axis = 0; axis < 3; axis += 1) {
    matrix[axis][axis] += scalar;
  }
}

function addOuterProduct(matrix, vector, scalar) {
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 3; column += 1) {
      matrix[row][column] += scalar * vector[row] * vector[column];
    }
  }
}

function addMatrix(target, source) {
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 3; column += 1) {
      target[row][column] += source[row][column];
    }
  }
}

function scaleMatrixInPlace(matrix, scalar) {
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 3; column += 1) {
      matrix[row][column] *= scalar;
    }
  }
}

function transpose(matrix) {
  return matrix[0].map((_, column) => matrix.map((row) => row[column]));
}

function matrixMultiply(left, right) {
  const result = zeroMatrix();
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 3; column += 1) {
      for (let inner = 0; inner < 3; inner += 1) {
        result[row][column] += left[row][inner] * right[inner][column];
      }
    }
  }
  return result;
}

function matrixVectorProduct(matrix, vector) {
  return matrix.map((row) => dot(row, vector));
}

function frobeniusNorm(matrix) {
  return Math.sqrt(matrix.flat().reduce((sum, value) => sum + value * value, 0));
}

function symmetricEigenDecomposition(input) {
  const matrix = input.map((row) => [...row]);
  const vectors = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  for (let iteration = 0; iteration < 32; iteration += 1) {
    let p = 0;
    let q = 1;
    let largest = Math.abs(matrix[p][q]);
    for (const [candidateP, candidateQ] of [[0, 2], [1, 2]]) {
      const magnitude = Math.abs(matrix[candidateP][candidateQ]);
      if (magnitude > largest) {
        p = candidateP;
        q = candidateQ;
        largest = magnitude;
      }
    }
    if (largest <= 1e-15 * Math.max(1, frobeniusNorm(matrix))) {
      break;
    }
    const angle = 0.5 * Math.atan2(2 * matrix[p][q], matrix[q][q] - matrix[p][p]);
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    const rotation = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];
    rotation[p][p] = cosine;
    rotation[q][q] = cosine;
    rotation[p][q] = sine;
    rotation[q][p] = -sine;
    const rotated = matrixMultiply(matrixMultiply(transpose(rotation), matrix), rotation);
    for (let row = 0; row < 3; row += 1) {
      for (let column = 0; column < 3; column += 1) {
        matrix[row][column] = rotated[row][column];
      }
    }
    const updatedVectors = matrixMultiply(vectors, rotation);
    for (let row = 0; row < 3; row += 1) {
      for (let column = 0; column < 3; column += 1) {
        vectors[row][column] = updatedVectors[row][column];
      }
    }
  }
  return [0, 1, 2]
    .map((index) => ({
      value: matrix[index][index],
      vector: normalizeVector(vectors.map((row) => row[index]), `eigenvector ${index}`),
    }))
    .sort((left, right) => left.value - right.value)
    .reduce(
      (result, entry) => {
        result.values.push(entry.value);
        result.vectors.push(entry.vector);
        return result;
      },
      { values: [], vectors: [] },
    );
}

function parseArguments(argv) {
  const options = { catalog: false, json: false, tolerance: DEFAULT_TOLERANCE };
  for (const argument of argv) {
    if (argument === "--catalog") {
      options.catalog = true;
    } else if (argument === "--json") {
      options.json = true;
    } else if (argument.startsWith("--tolerance=")) {
      options.tolerance = Number(argument.slice("--tolerance=".length));
    } else {
      throw new Error(`unknown argument: ${argument}`);
    }
  }
  return options;
}

function main() {
  const options = parseArguments(process.argv.slice(2));
  if (!options.catalog) {
    throw new Error("usage: analyze-rigid-translation-residual.mjs --catalog [--json] [--tolerance=N]");
  }
  const results = analyzeBorgCatalog({ tolerance: options.tolerance });
  if (options.json) {
    process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
    return;
  }
  for (const result of results) {
    process.stdout.write(
      [
        result.catalogId,
        result.status,
        `relative=${result.relativeCommonResidual.toExponential(6)}`,
        `direction=${result.bestFixedDriftDirection.map((value) => value.toFixed(6)).join(",")}`,
        `samples=${result.sampleCount}`,
      ].join("\t") + "\n",
    );
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}

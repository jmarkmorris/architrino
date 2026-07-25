/*
 * Analytic negative controls for the fixed point-cloud ansatz
 *
 *   X_i(T) = R_i + U T.
 *
 * These helpers intentionally assume zero internal velocity and constant pair
 * distances. They are not moving-assembly evaluators and must not be used to
 * adjudicate prescribed or evolved braid catalogs.
 */

export function fixedPointCloudPairResidual({
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

export function fixedPointCloudResidualOperator(sites) {
  if (!Array.isArray(sites) || sites.length < 2) {
    throw new TypeError("fixed point-cloud operator requires at least two sites");
  }
  const operator = zeroMatrix();
  for (let i = 0; i < sites.length; i += 1) {
    for (let j = i + 1; j < sites.length; j += 1) {
      const displacement = subtractVectors(sites[i].position, sites[j].position);
      const distanceSquared = dot(displacement, displacement);
      if (!(distanceSquared > 0)) {
        throw new RangeError(`fixed point-cloud operator has coincident sites ${i} and ${j}`);
      }
      const direction = scaleVector(displacement, 1 / Math.sqrt(distanceSquared));
      const weight = Number(sites[i].polarity) * Number(sites[j].polarity) / distanceSquared;
      addScaledIdentity(operator, weight);
      addOuterProduct(operator, direction, -2 * weight);
    }
  }
  return operator;
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
  if (
    !Array.isArray(vector) ||
    vector.length !== 3 ||
    vector.some((value) => !Number.isFinite(value))
  ) {
    throw new TypeError(`${label} must be a finite three-vector`);
  }
  return [...vector];
}

function zeroMatrix() {
  return Array.from({ length: 3 }, () => [0, 0, 0]);
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

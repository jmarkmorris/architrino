export const PRESCRIBED_WORLDLINE_OPERATOR_KINDS = Object.freeze([
  "stationary.v1",
  "inertial.v1",
  "moving-circular.v1",
  "sd3-centered-linear-member.v1",
  "f6c-harmonic-member.v1",
]);

const GEOMETRY_TOLERANCE = 1e-12;

export function validatePrescribedWorldlineOperator(raw, label = "worldline.operator") {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new TypeError(`${label} must be an object.`);
  }
  if (!PRESCRIBED_WORLDLINE_OPERATOR_KINDS.includes(raw.kind)) {
    throw new TypeError(`${label}.kind ${raw.kind} is not a registered prescribed-worldline operator.`);
  }
  if (raw.kind === "stationary.v1") {
    return Object.freeze({
      kind: raw.kind,
      epochTime: finite(raw.epochTime ?? 0, `${label}.epochTime`),
      position: freezeVector(vector3(raw.position, `${label}.position`)),
    });
  }
  if (raw.kind === "inertial.v1" || raw.kind === "sd3-centered-linear-member.v1") {
    return Object.freeze({
      kind: raw.kind,
      epochTime: finite(raw.epochTime ?? 0, `${label}.epochTime`),
      positionAtEpoch: freezeVector(vector3(raw.positionAtEpoch, `${label}.positionAtEpoch`)),
      velocity: freezeVector(vector3(raw.velocity, `${label}.velocity`)),
      reconstruction: raw.reconstruction == null ? null : structuredClone(raw.reconstruction),
    });
  }
  if (raw.kind === "moving-circular.v1") {
    const radiusU = vector3(raw.radiusU, `${label}.radiusU`);
    const radiusV = vector3(raw.radiusV, `${label}.radiusV`);
    requireNear(norm(radiusU), norm(radiusV), GEOMETRY_TOLERANCE, `${label} equal radii`);
    requireNear(dot(radiusU, radiusV), 0, GEOMETRY_TOLERANCE, `${label} orthogonal radii`);
    return Object.freeze({
      kind: raw.kind,
      epochTime: finite(raw.epochTime ?? 0, `${label}.epochTime`),
      centerAtEpoch: freezeVector(vector3(raw.centerAtEpoch, `${label}.centerAtEpoch`)),
      centerVelocity: freezeVector(vector3(raw.centerVelocity, `${label}.centerVelocity`)),
      radiusU: freezeVector(radiusU),
      radiusV: freezeVector(radiusV),
      angularVelocity: finite(raw.angularVelocity, `${label}.angularVelocity`),
      angularAcceleration: finite(raw.angularAcceleration ?? 0, `${label}.angularAcceleration`),
      phaseAtEpoch: finite(raw.phaseAtEpoch ?? 0, `${label}.phaseAtEpoch`),
    });
  }
  const axis = vector3(raw.axis, `${label}.axis`);
  const transverseU = vector3(raw.transverseU, `${label}.transverseU`);
  const transverseV = vector3(raw.transverseV, `${label}.transverseV`);
  validateOrthonormalFrame(axis, transverseU, transverseV, label);
  if (raw.polarity !== -1 && raw.polarity !== 1) {
    throw new TypeError(`${label}.polarity must be -1 or +1.`);
  }
  if (raw.circulationSign !== -1 && raw.circulationSign !== 1) {
    throw new TypeError(`${label}.circulationSign must be -1 or +1.`);
  }
  return Object.freeze({
    kind: raw.kind,
    epochTime: finite(raw.epochTime ?? 0, `${label}.epochTime`),
    assemblyCenterAtEpoch: freezeVector(vector3(
      raw.assemblyCenterAtEpoch ?? [0, 0, 0],
      `${label}.assemblyCenterAtEpoch`,
    )),
    assemblyVelocity: freezeVector(vector3(
      raw.assemblyVelocity ?? [0, 0, 0],
      `${label}.assemblyVelocity`,
    )),
    axis: freezeVector(axis),
    transverseU: freezeVector(transverseU),
    transverseV: freezeVector(transverseV),
    polarity: raw.polarity,
    circulationSign: raw.circulationSign,
    phaseOffset: finite(raw.phaseOffset, `${label}.phaseOffset`),
    axial: validateHarmonic(raw.axial, `${label}.axial`),
    radial: validateHarmonic(raw.radial, `${label}.radial`),
    phase: validatePhaseHistory(raw.phase, `${label}.phase`),
    reconstruction: raw.reconstruction == null ? null : structuredClone(raw.reconstruction),
  });
}

export function evaluatePrescribedWorldlineOperator(rawOperator, time) {
  const operator = validatePrescribedWorldlineOperator(rawOperator);
  const T = finite(time, "worldline evaluation time");
  const dt = T - operator.epochTime;
  if (operator.kind === "stationary.v1") {
    return freezeState(operator.position, [0, 0, 0]);
  }
  if (operator.kind === "inertial.v1" || operator.kind === "sd3-centered-linear-member.v1") {
    return freezeState(add(operator.positionAtEpoch, scale(operator.velocity, dt)), operator.velocity);
  }
  if (operator.kind === "moving-circular.v1") {
    const angularRate = operator.angularVelocity + operator.angularAcceleration * dt;
    const phase = operator.phaseAtEpoch + operator.angularVelocity * dt
      + 0.5 * operator.angularAcceleration * dt ** 2;
    const center = add(operator.centerAtEpoch, scale(operator.centerVelocity, dt));
    const radial = add(scale(operator.radiusU, Math.cos(phase)), scale(operator.radiusV, Math.sin(phase)));
    const tangent = add(scale(operator.radiusU, -Math.sin(phase)), scale(operator.radiusV, Math.cos(phase)));
    return freezeState(add(center, radial), add(operator.centerVelocity, scale(tangent, angularRate)));
  }
  const axial = evaluateHarmonic(operator.axial, dt);
  const radial = evaluateHarmonic(operator.radial, dt);
  const phase = evaluatePhaseHistory(operator.phase, dt);
  const psi = operator.polarity * operator.circulationSign * phase.value + operator.phaseOffset;
  const radialDirection = add(
    scale(operator.transverseU, Math.cos(psi)),
    scale(operator.transverseV, Math.sin(psi)),
  );
  const tangentDirection = add(
    scale(operator.transverseU, -Math.sin(psi)),
    scale(operator.transverseV, Math.cos(psi)),
  );
  const center = add(operator.assemblyCenterAtEpoch, scale(operator.assemblyVelocity, dt));
  const position = add(
    center,
    scale(operator.axis, operator.polarity * axial.value),
    scale(radialDirection, radial.value),
  );
  const velocity = add(
    operator.assemblyVelocity,
    scale(operator.axis, operator.polarity * axial.derivative),
    scale(radialDirection, radial.derivative),
    scale(
      tangentDirection,
      radial.value * operator.polarity * operator.circulationSign * phase.derivative,
    ),
  );
  return freezeState(position, velocity);
}

export function prescribedWorldlineSpeedBound(rawOperator, startTime, endTime) {
  const operator = validatePrescribedWorldlineOperator(rawOperator);
  if (operator.kind === "stationary.v1") return 0;
  if (operator.kind === "inertial.v1" || operator.kind === "sd3-centered-linear-member.v1") {
    return norm(operator.velocity);
  }
  if (operator.kind === "moving-circular.v1") {
    const startRate = operator.angularVelocity
      + operator.angularAcceleration * (startTime - operator.epochTime);
    const endRate = operator.angularVelocity
      + operator.angularAcceleration * (endTime - operator.epochTime);
    return norm(operator.centerVelocity)
      + Math.max(Math.abs(startRate), Math.abs(endRate)) * norm(operator.radiusU);
  }
  const axialSpeed = Math.abs(operator.axial.amplitude * operator.axial.angularFrequency);
  const radialSpeed = Math.abs(operator.radial.amplitude * operator.radial.angularFrequency);
  const maximumRadius = operator.radial.base + Math.abs(operator.radial.amplitude);
  const phaseSpeed = Math.abs(operator.phase.rate)
    + Math.abs(operator.phase.modulationAmplitude * operator.phase.modulationAngularFrequency);
  return norm(operator.assemblyVelocity) + Math.hypot(axialSpeed, radialSpeed, maximumRadius * phaseSpeed);
}

function validateHarmonic(raw, label) {
  if (!raw || typeof raw !== "object") throw new TypeError(`${label} is required.`);
  const base = finite(raw.base, `${label}.base`);
  const amplitude = finite(raw.amplitude ?? 0, `${label}.amplitude`);
  const angularFrequency = finite(raw.angularFrequency ?? 0, `${label}.angularFrequency`);
  const phase = finite(raw.phase ?? 0, `${label}.phase`);
  if (!(base - Math.abs(amplitude) > 0)) {
    throw new RangeError(`${label} must remain positive over its complete harmonic cycle.`);
  }
  return Object.freeze({ base, amplitude, angularFrequency, phase });
}

function validatePhaseHistory(raw, label) {
  if (!raw || typeof raw !== "object") throw new TypeError(`${label} is required.`);
  return Object.freeze({
    offset: finite(raw.offset ?? 0, `${label}.offset`),
    rate: finite(raw.rate, `${label}.rate`),
    modulationAmplitude: finite(raw.modulationAmplitude ?? 0, `${label}.modulationAmplitude`),
    modulationAngularFrequency: finite(
      raw.modulationAngularFrequency ?? 0,
      `${label}.modulationAngularFrequency`,
    ),
    modulationPhase: finite(raw.modulationPhase ?? 0, `${label}.modulationPhase`),
  });
}

function evaluateHarmonic(row, dt) {
  const phase = row.angularFrequency * dt + row.phase;
  return {
    value: row.base + row.amplitude * Math.sin(phase),
    derivative: row.amplitude * row.angularFrequency * Math.cos(phase),
  };
}

function evaluatePhaseHistory(row, dt) {
  const phase = row.modulationAngularFrequency * dt + row.modulationPhase;
  return {
    value: row.offset + row.rate * dt + row.modulationAmplitude * Math.cos(phase),
    derivative: row.rate - row.modulationAmplitude * row.modulationAngularFrequency * Math.sin(phase),
  };
}

function validateOrthonormalFrame(axis, u, v, label) {
  requireNear(norm(axis), 1, GEOMETRY_TOLERANCE, `${label}.axis unit length`);
  requireNear(norm(u), 1, GEOMETRY_TOLERANCE, `${label}.transverseU unit length`);
  requireNear(norm(v), 1, GEOMETRY_TOLERANCE, `${label}.transverseV unit length`);
  requireNear(dot(axis, u), 0, GEOMETRY_TOLERANCE, `${label}.axis/transverseU orthogonality`);
  requireNear(dot(axis, v), 0, GEOMETRY_TOLERANCE, `${label}.axis/transverseV orthogonality`);
  requireNear(dot(u, v), 0, GEOMETRY_TOLERANCE, `${label} transverse orthogonality`);
  if (norm(subtract(cross(u, v), axis)) > GEOMETRY_TOLERANCE) {
    throw new RangeError(`${label} frame must be right-handed.`);
  }
}

function freezeState(position, velocity) {
  return Object.freeze({ position: freezeVector(position), velocity: freezeVector(velocity) });
}

function freezeVector(value) {
  return Object.freeze([...value]);
}

function finite(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new TypeError(`${label} must be finite.`);
  return number;
}

function vector3(value, label) {
  if (!Array.isArray(value) || value.length !== 3) {
    throw new TypeError(`${label} must be a three-vector.`);
  }
  return value.map((entry, index) => finite(entry, `${label}[${index}]`));
}

function requireNear(actual, expected, tolerance, label) {
  if (Math.abs(actual - expected) > tolerance) {
    throw new RangeError(`${label} must be within ${tolerance}; received ${actual}, expected ${expected}.`);
  }
}

function add(...vectors) {
  return [0, 1, 2].map((axis) => vectors.reduce((sum, vector) => sum + vector[axis], 0));
}

function subtract(left, right) {
  return left.map((value, index) => value - right[index]);
}

function scale(vector, scalar) {
  return vector.map((value) => value * scalar);
}

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

function norm(vector) {
  return Math.hypot(...vector);
}

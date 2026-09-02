function vector(position, label) {
  if (!Array.isArray(position) || position.length !== 3 ||
      position.some((entry) => !Number.isFinite(entry))) {
    throw new TypeError(`${label} must be a finite three-vector.`);
  }
  return position;
}

function subtract(left, right) {
  return left.map((value, index) => value - right[index]);
}

function scale(value, scalar) {
  return value.map((entry) => entry * scalar);
}

function add(left, right) {
  return left.map((entry, index) => entry + right[index]);
}

function dot(left, right) {
  return left.reduce((sum, entry, index) => sum + entry * right[index], 0);
}

function norm(value) {
  return Math.sqrt(dot(value, value));
}

export function stellaOctangulaClosedFormCoefficient(circumradius = 0.5, coupling = 1) {
  if (!(Number.isFinite(circumradius) && circumradius > 0)) {
    throw new RangeError("circumradius must be positive.");
  }
  if (!Number.isFinite(coupling)) throw new TypeError("coupling must be finite.");
  const unitRadiusCoefficient = 3 * Math.sqrt(6) / 8 -
    (1 + 3 * Math.sqrt(3)) / 4;
  return coupling * unitRadiusCoefficient / circumradius ** 3;
}

export function evaluateIndependentStationaryPairSum(sources, coupling = 1) {
  if (!Array.isArray(sources) || sources.length < 2) {
    throw new TypeError("sources must contain at least two stationary members.");
  }
  if (!Number.isFinite(coupling)) throw new TypeError("coupling must be finite.");
  const normalized = sources.map((source, index) => ({
    id: String(source.id),
    charge: Number(source.charge),
    position: vector(source.position, `sources[${index}].position`),
  }));
  if (normalized.some((source) => !Number.isFinite(source.charge) || source.charge === 0)) {
    throw new RangeError("every source charge must be finite and nonzero.");
  }

  return normalized.map((receiver, receiverIndex) => {
    let acceleration = [0, 0, 0];
    const pairRows = [];
    normalized.forEach((transmitter, transmitterIndex) => {
      if (transmitterIndex === receiverIndex) return;
      const displacement = subtract(receiver.position, transmitter.position);
      const distance = norm(displacement);
      if (!(distance > 0)) throw new RangeError("distinct source ids must occupy distinct positions.");
      const contribution = scale(
        displacement,
        coupling * receiver.charge * transmitter.charge / distance ** 3,
      );
      acceleration = add(acceleration, contribution);
      pairRows.push({
        transmitterId: transmitter.id,
        transmitterCharge: transmitter.charge,
        distance,
        contribution,
      });
    });
    const radiusSquared = dot(receiver.position, receiver.position);
    const radialCoefficient = dot(acceleration, receiver.position) / radiusSquared;
    const radialAcceleration = scale(receiver.position, radialCoefficient);
    const tangentialResidual = subtract(acceleration, radialAcceleration);
    return {
      receiverId: receiver.id,
      receiverCharge: receiver.charge,
      position: receiver.position,
      acceleration,
      accelerationMagnitude: norm(acceleration),
      radialCoefficient,
      tangentialResidual,
      tangentialResidualMagnitude: norm(tangentialResidual),
      pairRows,
    };
  });
}

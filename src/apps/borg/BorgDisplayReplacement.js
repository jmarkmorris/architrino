export function createRandomBorgDisplayPosition({
  center,
  radius,
  random = Math.random,
}) {
  const numericRadius = Number(radius);
  if (![center?.x, center?.y, center?.z].every(Number.isFinite) ||
      !(numericRadius > 0) || typeof random !== "function") {
    throw new TypeError(
      "Borg display replacement requires a finite center, positive radius, and random source.",
    );
  }
  for (let attempt = 0; attempt < 256; attempt += 1) {
    const offset = {
      x: (random() * 2 - 1) * numericRadius,
      y: (random() * 2 - 1) * numericRadius,
      z: (random() * 2 - 1) * numericRadius,
    };
    if (Math.hypot(offset.x, offset.y, offset.z) <= numericRadius) {
      return Object.freeze({
        x: Number(center.x) + offset.x,
        y: Number(center.y) + offset.y,
        z: Number(center.z) + offset.z,
      });
    }
  }
  throw new RangeError("Borg could not place a replacement inside the sphere.");
}

export function createBorgDisplayReplacementTransform({
  solverPosition,
  displayPosition,
  generation,
  startTime = Number.NEGATIVE_INFINITY,
}) {
  return {
    generation: Number(generation),
    startTime: Number(startTime),
    solverAnchor: copyPosition(solverPosition),
    displayAnchor: copyPosition(displayPosition),
  };
}

export function applyBorgDisplayReplacementTransform(
  position,
  transform,
  time = Number.POSITIVE_INFINITY,
) {
  if (!transform || Number(time) < Number(transform.startTime)) {
    return position;
  }
  return Object.freeze({
    x: transform.displayAnchor.x + position.x - transform.solverAnchor.x,
    y: transform.displayAnchor.y + position.y - transform.solverAnchor.y,
    z: transform.displayAnchor.z + position.z - transform.solverAnchor.z,
  });
}

export function borgNdcPositionIsOutsideScreen(position) {
  return !position ||
    ![position.x, position.y, position.z].every(Number.isFinite) ||
    Math.abs(position.x) > 1 ||
    Math.abs(position.y) > 1 ||
    position.z < -1 ||
    position.z > 1;
}

function copyPosition(position) {
  if (![position?.x, position?.y, position?.z].every(Number.isFinite)) {
    throw new TypeError("Borg display replacement requires a finite position.");
  }
  return Object.freeze({
    x: Number(position.x),
    y: Number(position.y),
    z: Number(position.z),
  });
}

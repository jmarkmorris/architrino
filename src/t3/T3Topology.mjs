export const T3_TOPOLOGY_SCHEMA = "t3-topology.v1";

export function createT3Topology(input = {}) {
  const baseUnitLength = positiveFiniteNumber(
    input.baseUnitLength ?? input.U ?? input.unitLength ?? 1,
    "baseUnitLength"
  );
  const scaleFactor = positiveFiniteNumber(input.scaleFactor ?? input.N ?? 1, "scaleFactor");
  const sideLength = positiveFiniteNumber(input.sideLength ?? baseUnitLength * scaleFactor, "sideLength");
  const halfSideLength = sideLength / 2;

  return Object.freeze({
    schema: T3_TOPOLOGY_SCHEMA,
    baseUnitLength,
    scaleFactor,
    sideLength,
    volume: sideLength ** 3,
    wrapComponent(value) {
      return wrapComponent(value, sideLength);
    },
    wrapPositionInPlace(positions, particleIndex, imageOffsets = null) {
      return wrapPositionInPlace(positions, particleIndex, sideLength, imageOffsets);
    },
    wrapVector(vector) {
      return [
        wrapComponent(vector[0], sideLength).value,
        wrapComponent(vector[1], sideLength).value,
        wrapComponent(vector[2], sideLength).value,
      ];
    },
    nearestImageDelta(fromValue, toValue) {
      return nearestImageDelta(fromValue, toValue, sideLength);
    },
    nearestImageDisplacement(fromPositions, fromIndex, toPositions, toIndex, out = [0, 0, 0]) {
      return nearestImageDisplacement(fromPositions, fromIndex, toPositions, toIndex, sideLength, out);
    },
    nearestImageDistanceSquared(fromPositions, fromIndex, toPositions, toIndex) {
      return nearestImageDistanceSquared(fromPositions, fromIndex, toPositions, toIndex, sideLength);
    },
    nearestImageDistance(fromPositions, fromIndex, toPositions, toIndex) {
      return Math.sqrt(
        nearestImageDistanceSquared(fromPositions, fromIndex, toPositions, toIndex, sideLength)
      );
    },
    isInsideWrappedRange(value) {
      return value >= 0 && value < sideLength;
    },
    halfSideLength,
  });
}

export function wrapComponent(value, sideLength) {
  const numericValue = finiteNumber(value, "coordinate");
  const numericSideLength = positiveFiniteNumber(sideLength, "sideLength");
  const imageDelta = Math.floor(numericValue / numericSideLength);
  let wrapped = numericValue - imageDelta * numericSideLength;
  if (wrapped >= numericSideLength) {
    wrapped = 0;
  } else if (wrapped < 0) {
    wrapped += numericSideLength;
  }
  return { value: wrapped, imageDelta };
}

export function wrapPositionInPlace(positions, particleIndex, sideLength, imageOffsets = null) {
  const offset = vectorOffset(particleIndex);
  let crossed = false;
  for (let axis = 0; axis < 3; axis += 1) {
    const wrapped = wrapComponent(positions[offset + axis], sideLength);
    positions[offset + axis] = wrapped.value;
    if (imageOffsets && wrapped.imageDelta !== 0) {
      imageOffsets[offset + axis] += wrapped.imageDelta;
      crossed = true;
    }
  }
  return crossed;
}

export function nearestImageDelta(fromValue, toValue, sideLength) {
  const delta = finiteNumber(toValue, "toValue") - finiteNumber(fromValue, "fromValue");
  const numericSideLength = positiveFiniteNumber(sideLength, "sideLength");
  return delta - numericSideLength * Math.round(delta / numericSideLength);
}

export function nearestImageDisplacement(
  fromPositions,
  fromIndex,
  toPositions,
  toIndex,
  sideLength,
  out = [0, 0, 0]
) {
  const fromOffset = vectorOffset(fromIndex);
  const toOffset = vectorOffset(toIndex);
  out[0] = nearestImageDelta(fromPositions[fromOffset], toPositions[toOffset], sideLength);
  out[1] = nearestImageDelta(fromPositions[fromOffset + 1], toPositions[toOffset + 1], sideLength);
  out[2] = nearestImageDelta(fromPositions[fromOffset + 2], toPositions[toOffset + 2], sideLength);
  return out;
}

export function nearestImageDistanceSquared(fromPositions, fromIndex, toPositions, toIndex, sideLength) {
  const fromOffset = vectorOffset(fromIndex);
  const toOffset = vectorOffset(toIndex);
  const dx = nearestImageDelta(fromPositions[fromOffset], toPositions[toOffset], sideLength);
  const dy = nearestImageDelta(fromPositions[fromOffset + 1], toPositions[toOffset + 1], sideLength);
  const dz = nearestImageDelta(fromPositions[fromOffset + 2], toPositions[toOffset + 2], sideLength);
  return dx * dx + dy * dy + dz * dz;
}

export function vectorOffset(particleIndex) {
  const index = Number(particleIndex);
  if (!Number.isInteger(index) || index < 0) {
    throw new TypeError("particleIndex must be a nonnegative integer");
  }
  return index * 3;
}

function finiteNumber(value, fieldName) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    throw new TypeError(`${fieldName} must be finite`);
  }
  return numericValue;
}

function positiveFiniteNumber(value, fieldName) {
  const numericValue = finiteNumber(value, fieldName);
  if (numericValue <= 0) {
    throw new TypeError(`${fieldName} must be positive`);
  }
  return numericValue;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function finiteNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export const C1_CUBIC_HERMITE_INTERPOLATION = "c1-cubic-hermite";

export function usesC1TimedPathInterpolation(path) {
  return path?.interpolationMode === C1_CUBIC_HERMITE_INTERPOLATION;
}

function getTimedPathTangent(path, index, key) {
  if (key === "x") {
    return getMonotoneTimedPathTangent(path, index, key);
  }
  const previous = path[Math.max(0, index - 1)];
  const next = path[Math.min(path.length - 1, index + 1)];
  const timeSpan = finiteNumber(next?.t) - finiteNumber(previous?.t);
  if (!(timeSpan > 0)) {
    return 0;
  }
  return (finiteNumber(next?.[key]) - finiteNumber(previous?.[key])) / timeSpan;
}

function getTimedPathSecant(path, leftIndex, key) {
  const start = path[leftIndex];
  const end = path[leftIndex + 1];
  const timeSpan = finiteNumber(end?.t) - finiteNumber(start?.t);
  if (!(timeSpan > 0)) {
    return null;
  }
  return {
    slope: (finiteNumber(end?.[key]) - finiteNumber(start?.[key])) / timeSpan,
    timeSpan,
  };
}

function getMonotoneTimedPathTangent(path, index, key) {
  if (!Array.isArray(path) || path.length < 2) {
    return 0;
  }
  if (index <= 0) {
    return getTimedPathSecant(path, 0, key)?.slope ?? 0;
  }
  if (index >= path.length - 1) {
    return getTimedPathSecant(path, path.length - 2, key)?.slope ?? 0;
  }
  const previous = getTimedPathSecant(path, index - 1, key);
  const next = getTimedPathSecant(path, index, key);
  if (
    !previous ||
    !next ||
    previous.slope <= 0 ||
    next.slope <= 0
  ) {
    return 0;
  }
  const previousWeight = 2 * next.timeSpan + previous.timeSpan;
  const nextWeight = next.timeSpan + 2 * previous.timeSpan;
  return (
    (previousWeight + nextWeight) /
    (previousWeight / previous.slope + nextWeight / next.slope)
  );
}

export function getC1TimedPathBezierSegment(path, leftIndex) {
  if (!Array.isArray(path) || leftIndex < 0 || leftIndex >= path.length - 1) {
    return null;
  }
  const start = path[leftIndex];
  const end = path[leftIndex + 1];
  const timeSpan = finiteNumber(end?.t) - finiteNumber(start?.t);
  if (!(timeSpan > 0)) {
    return null;
  }
  const keys = ["x", "y", "z"];
  const controlStart = {};
  const controlEnd = {};
  for (const key of keys) {
    controlStart[key] =
      finiteNumber(start?.[key]) +
      getTimedPathTangent(path, leftIndex, key) * timeSpan / 3;
    controlEnd[key] =
      finiteNumber(end?.[key]) -
      getTimedPathTangent(path, leftIndex + 1, key) * timeSpan / 3;
  }
  return {
    start,
    end,
    controlStart,
    controlEnd,
    timeSpan,
  };
}

function sampleC1TimedPathSegment(path, leftIndex, time) {
  const segment = getC1TimedPathBezierSegment(path, leftIndex);
  if (!segment) {
    return null;
  }
  const amount = clamp(
    (time - finiteNumber(segment.start?.t)) / segment.timeSpan,
    0,
    1,
  );
  const inverse = 1 - amount;
  const cubic = (key) =>
    inverse ** 3 * finiteNumber(segment.start?.[key]) +
    3 * inverse ** 2 * amount * finiteNumber(segment.controlStart?.[key]) +
    3 * inverse * amount ** 2 * finiteNumber(segment.controlEnd?.[key]) +
    amount ** 3 * finiteNumber(segment.end?.[key]);
  return {
    t: time,
    x: cubic("x"),
    y: cubic("y"),
    z: cubic("z"),
  };
}

export function getTimedPathRange(path) {
  let start = Number.POSITIVE_INFINITY;
  let end = Number.NEGATIVE_INFINITY;
  for (const point of path ?? []) {
    const time = Number(point?.t);
    if (!Number.isFinite(time)) {
      continue;
    }
    start = Math.min(start, time);
    end = Math.max(end, time);
  }
  if (!Number.isFinite(start) || !Number.isFinite(end)) {
    return [0, 0];
  }
  return [start, end];
}

export function sampleTimedPath(path, sampleTime) {
  if (!Array.isArray(path) || path.length === 0) {
    return null;
  }
  const firstTime = finiteNumber(path[0]?.t);
  const last = path.at(-1);
  const lastTime = finiteNumber(last?.t);
  const time = finiteNumber(sampleTime, firstTime);
  if (time < firstTime || time > lastTime) {
    return null;
  }
  if (path.length === 1 || time === firstTime) {
    return { ...path[0], t: firstTime };
  }
  if (time === lastTime) {
    return { ...last, t: lastTime };
  }

  let low = 1;
  let high = path.length - 1;
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    if (finiteNumber(path[middle]?.t) < time) {
      low = middle + 1;
    } else {
      high = middle;
    }
  }
  const rightIndex = low;
  const left = path[rightIndex - 1];
  const right = path[rightIndex] ?? last;
  if (usesC1TimedPathInterpolation(path)) {
    const smoothPoint = sampleC1TimedPathSegment(path, rightIndex - 1, time);
    if (smoothPoint) {
      return {
        ...smoothPoint,
        vx: finiteNumber(left?.vx),
        vy: finiteNumber(left?.vy),
        vz: finiteNumber(left?.vz),
      };
    }
  }
  const span = finiteNumber(right?.t) - finiteNumber(left?.t);
  const amount = span === 0
    ? 0
    : clamp((time - finiteNumber(left?.t)) / span, 0, 1);
  return {
    t: time,
    x: finiteNumber(left?.x) + (finiteNumber(right?.x) - finiteNumber(left?.x)) * amount,
    y: finiteNumber(left?.y) + (finiteNumber(right?.y) - finiteNumber(left?.y)) * amount,
    z: finiteNumber(left?.z) + (finiteNumber(right?.z) - finiteNumber(left?.z)) * amount,
    vx: finiteNumber(left?.vx) + (finiteNumber(right?.vx) - finiteNumber(left?.vx)) * amount,
    vy: finiteNumber(left?.vy) + (finiteNumber(right?.vy) - finiteNumber(left?.vy)) * amount,
    vz: finiteNumber(left?.vz) + (finiteNumber(right?.vz) - finiteNumber(left?.vz)) * amount,
  };
}

export function sampleTimedPathByArcLength(path, sampleTime) {
  if (!Array.isArray(path) || path.length < 2) {
    return sampleTimedPath(path, sampleTime);
  }
  const first = path[0];
  const last = path.at(-1);
  const startTime = Number(first?.t);
  const endTime = Number(last?.t);
  const span = endTime - startTime;
  if (!Number.isFinite(startTime) || !Number.isFinite(endTime) || !(span > 0)) {
    return sampleTimedPath(path, sampleTime);
  }
  const time = clamp(finiteNumber(sampleTime, startTime), startTime, endTime);
  const arcSamples = usesC1TimedPathInterpolation(path)
    ? path.flatMap((point, index) => {
        if (index >= path.length - 1) {
          return [];
        }
        const next = path[index + 1];
        return Array.from({ length: 8 }, (_unused, subdivision) =>
          sampleTimedPath(
            path,
            finiteNumber(point?.t) +
              (finiteNumber(next?.t) - finiteNumber(point?.t)) *
              (subdivision / 8),
          ));
      }).concat(sampleTimedPath(path, endTime))
    : path;
  const cumulativeLengths = [0];
  for (let index = 1; index < arcSamples.length; index += 1) {
    const left = arcSamples[index - 1];
    const right = arcSamples[index];
    cumulativeLengths.push(
      cumulativeLengths.at(-1) +
      Math.hypot(
        finiteNumber(right?.x) - finiteNumber(left?.x),
        finiteNumber(right?.y) - finiteNumber(left?.y),
        finiteNumber(right?.z) - finiteNumber(left?.z),
      ),
    );
  }
  const totalLength = cumulativeLengths.at(-1);
  if (!(totalLength > 0)) {
    return sampleTimedPath(path, time);
  }
  const targetLength = totalLength * ((time - startTime) / span);
  if (targetLength <= 0) {
    return { ...first, t: time };
  }
  if (targetLength >= totalLength) {
    return { ...last, t: time };
  }
  let low = 1;
  let high = cumulativeLengths.length - 1;
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    if (cumulativeLengths[middle] < targetLength) {
      low = middle + 1;
    } else {
      high = middle;
    }
  }
  const rightIndex = low;
  const left = arcSamples[rightIndex - 1];
  const right = arcSamples[rightIndex];
  const traveled = cumulativeLengths[rightIndex - 1];
  const segmentLength = cumulativeLengths[rightIndex] - traveled;
  const amount = segmentLength > 0
    ? clamp((targetLength - traveled) / segmentLength, 0, 1)
    : 0;
  const arcTime =
    finiteNumber(left?.t) +
    (finiteNumber(right?.t) - finiteNumber(left?.t)) * amount;
  return usesC1TimedPathInterpolation(path)
    ? { ...sampleTimedPath(path, arcTime), t: time }
    : {
        t: time,
        x: finiteNumber(left?.x) + (finiteNumber(right?.x) - finiteNumber(left?.x)) * amount,
        y: finiteNumber(left?.y) + (finiteNumber(right?.y) - finiteNumber(left?.y)) * amount,
        z: finiteNumber(left?.z) + (finiteNumber(right?.z) - finiteNumber(left?.z)) * amount,
      };
}

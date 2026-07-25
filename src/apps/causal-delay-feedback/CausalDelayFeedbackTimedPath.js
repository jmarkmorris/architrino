function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function finiteNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
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

import {
  TOPO_DEFAULT_DISPLAY_SCALE,
  TOPO_INVERSE_SQUARE_SCALE,
  normalizeTopoDisplayScale,
  normalizeTopoFieldColorValue,
} from "./TopoInteractionContract.js";

export const TOPO_CIRCULAR_BINARY_SCENARIO_ID = "orbiting-binary";
export const TOPO_CIRCULAR_BINARY_CONTRACT_ID =
  "topo_prescribed_circular_binary/v1";
export const TOPO_CIRCULAR_BINARY_FIELD_SPEED = 1;
export const TOPO_CIRCULAR_BINARY_CENTER = Object.freeze({ x: 0.5, y: 0.5 });
export const TOPO_CIRCULAR_BINARY_DEFAULT_RADIUS = 0.3;
export const TOPO_CIRCULAR_BINARY_MIN_RADIUS = 0.01;
export const TOPO_CIRCULAR_BINARY_MAX_RADIUS = 0.45;
export const TOPO_CIRCULAR_BINARY_RADIUS = TOPO_CIRCULAR_BINARY_DEFAULT_RADIUS;
export const TOPO_CIRCULAR_BINARY_KAPPA = TOPO_INVERSE_SQUARE_SCALE;
export const TOPO_CIRCULAR_BINARY_PLAYBACK_SECONDS = 8;
export const TOPO_CIRCULAR_BINARY_HISTORY_POLICY =
  "one-orbit-warmup-plus-one-orbit-replay/v1";
export const TOPO_CIRCULAR_BINARY_VERTICAL_OVERFLOW_POLICY =
  "clip-stage-preserve-world-scale/v1";
export const TOPO_CIRCULAR_BINARY_DIRECTION = Object.freeze({
  COUNTERCLOCKWISE: "counterclockwise",
  CLOCKWISE: "clockwise",
});

const TWO_PI = 2 * Math.PI;
const DEFAULT_ROOT_TOLERANCE = 1e-10;
const DEFAULT_ROOT_ITERATIONS = 64;
const DEFAULT_SOURCE_MASK_RADIUS = 0;

function finiteNumber(value, label) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    throw new TypeError(label + " must be finite.");
  }
  return numeric;
}

function normalizeBeta(value) {
  const beta = finiteNumber(value, "beta");
  if (beta < 0 || beta > 1) {
    throw new RangeError("beta must lie in [0, 1].");
  }
  return beta;
}

function normalizeProgress(value) {
  return Math.min(1, Math.max(0, finiteNumber(value, "progress")));
}

function normalizeOrbitalRadius(value) {
  const radius = finiteNumber(value, "radius");
  if (
    radius < TOPO_CIRCULAR_BINARY_MIN_RADIUS ||
    radius > TOPO_CIRCULAR_BINARY_MAX_RADIUS
  ) {
    throw new RangeError(
      "radius must lie in [" + TOPO_CIRCULAR_BINARY_MIN_RADIUS + ", " +
      TOPO_CIRCULAR_BINARY_MAX_RADIUS + "].",
    );
  }
  return radius;
}

function normalizeSourceSign(value) {
  const sign = finiteNumber(value, "sourceSign");
  if (sign !== -1 && sign !== 1) {
    throw new RangeError("sourceSign must be -1 or 1.");
  }
  return sign;
}

function normalizeDirection(value) {
  if (
    value !== TOPO_CIRCULAR_BINARY_DIRECTION.COUNTERCLOCKWISE &&
    value !== TOPO_CIRCULAR_BINARY_DIRECTION.CLOCKWISE
  ) {
    throw new RangeError("direction must be counterclockwise or clockwise.");
  }
  return value;
}

function directionSign(value) {
  return normalizeDirection(value) === TOPO_CIRCULAR_BINARY_DIRECTION.CLOCKWISE
    ? -1
    : 1;
}

export function createTopoCircularBinaryChart({
  width,
  height,
  radius = TOPO_CIRCULAR_BINARY_DEFAULT_RADIUS,
  displayScale = TOPO_DEFAULT_DISPLAY_SCALE,
} = {}) {
  const canvasWidth = Math.max(1, finiteNumber(width, "width"));
  const canvasHeight = Math.max(1, finiteNumber(height, "height"));
  const horizontalPixelSpan = Math.max(1, canvasWidth - 1);
  const orbitalRadius = normalizeOrbitalRadius(radius);
  const mapScale = normalizeTopoDisplayScale(displayScale);
  const visibleWorldWidth = 1 / mapScale;
  const visibleWorldHeight = Math.max(1, canvasHeight - 1) /
    horizontalPixelSpan / mapScale;
  const minimumX = TOPO_CIRCULAR_BINARY_CENTER.x - visibleWorldWidth / 2;
  const maximumX = TOPO_CIRCULAR_BINARY_CENTER.x + visibleWorldWidth / 2;
  const minimumY = TOPO_CIRCULAR_BINARY_CENTER.y - visibleWorldHeight / 2;
  const maximumY = TOPO_CIRCULAR_BINARY_CENTER.y + visibleWorldHeight / 2;
  return Object.freeze({
    id: "topo_binary_visible_x_euclidean/v1",
    minimumX,
    maximumX,
    minimumY,
    maximumY,
    worldUnitsPerPixel: 1 / (horizontalPixelSpan * mapScale),
    displayScale: mapScale,
    center: TOPO_CIRCULAR_BINARY_CENTER,
    radius: orbitalRadius,
    orbitClippedVertically:
      visibleWorldHeight < 2 * orbitalRadius,
    verticalOverflowPolicy: TOPO_CIRCULAR_BINARY_VERTICAL_OVERFLOW_POLICY,
  });
}

export function topoCircularBinaryWorldPointForCanvasPixel({
  pixelX,
  pixelY,
  width,
  height,
  displayScale = TOPO_DEFAULT_DISPLAY_SCALE,
} = {}) {
  const chart = createTopoCircularBinaryChart({
    width,
    height,
    displayScale,
  });
  return Object.freeze({
    x: chart.minimumX + finiteNumber(pixelX, "pixelX") *
      chart.worldUnitsPerPixel,
    y: chart.maximumY - finiteNumber(pixelY, "pixelY") *
      chart.worldUnitsPerPixel,
  });
}

export function createTopoCircularBinaryPlayback({
  beta = 0.5,
  progress = 0,
  radius = TOPO_CIRCULAR_BINARY_DEFAULT_RADIUS,
  direction = TOPO_CIRCULAR_BINARY_DIRECTION.COUNTERCLOCKWISE,
} = {}) {
  const normalizedBeta = normalizeBeta(beta);
  const normalizedProgress = normalizeProgress(progress);
  const orbitalRadius = normalizeOrbitalRadius(radius);
  const normalizedDirection = normalizeDirection(direction);
  const angularVelocity = directionSign(normalizedDirection) *
    normalizedBeta / orbitalRadius;
  const orbitPeriod = normalizedBeta === 0
    ? null
    : TWO_PI / Math.abs(angularVelocity);
  const observationTime = normalizedBeta === 0
    ? TWO_PI * orbitalRadius
    : orbitPeriod * (1 + normalizedProgress);
  return Object.freeze({
    beta: normalizedBeta,
    progress: normalizedBeta === 0 ? 0 : normalizedProgress,
    angularVelocity,
    orbitPeriod,
    observationTime,
    radius: orbitalRadius,
    direction: normalizedDirection,
    playbackEnabled: normalizedBeta > 0,
    complete: normalizedBeta === 0 || normalizedProgress >= 1,
    historyPolicy: TOPO_CIRCULAR_BINARY_HISTORY_POLICY,
  });
}

export function topoCircularBinarySourcePosition({
  sourceSign,
  time,
  beta = 0.5,
  radius = TOPO_CIRCULAR_BINARY_DEFAULT_RADIUS,
  direction = TOPO_CIRCULAR_BINARY_DIRECTION.COUNTERCLOCKWISE,
} = {}) {
  const sign = normalizeSourceSign(sourceSign);
  const normalizedTime = finiteNumber(time, "time");
  const orbitalRadius = normalizeOrbitalRadius(radius);
  const angularVelocity = directionSign(direction) *
    normalizeBeta(beta) / orbitalRadius;
  const initialPhase = sign < 0 ? Math.PI : 0;
  const phase = initialPhase + angularVelocity * normalizedTime;
  return Object.freeze({
    x: TOPO_CIRCULAR_BINARY_CENTER.x +
      orbitalRadius * Math.cos(phase),
    y: TOPO_CIRCULAR_BINARY_CENTER.y +
      orbitalRadius * Math.sin(phase),
    phase,
  });
}

export function topoCircularBinaryCausalResidual({
  point,
  sourceSign,
  observationTime,
  delay,
  beta = 0.5,
  radius = TOPO_CIRCULAR_BINARY_DEFAULT_RADIUS,
  direction = TOPO_CIRCULAR_BINARY_DIRECTION.COUNTERCLOCKWISE,
} = {}) {
  const sampleX = finiteNumber(point?.x, "point.x");
  const sampleY = finiteNumber(point?.y, "point.y");
  const receptionTime = finiteNumber(observationTime, "observationTime");
  const tau = finiteNumber(delay, "delay");
  if (receptionTime < 0 || tau < 0 || tau > receptionTime) {
    throw new RangeError("delay must lie in [0, observationTime].");
  }
  const source = topoCircularBinarySourcePosition({
    sourceSign,
    time: receptionTime - tau,
    beta,
    radius,
    direction,
  });
  return Math.hypot(sampleX - source.x, sampleY - source.y) - tau;
}

export function solveTopoCircularBinaryCausalDelay({
  point,
  sourceSign,
  observationTime,
  beta = 0.5,
  radius = TOPO_CIRCULAR_BINARY_DEFAULT_RADIUS,
  direction = TOPO_CIRCULAR_BINARY_DIRECTION.COUNTERCLOCKWISE,
  rootTolerance = DEFAULT_ROOT_TOLERANCE,
  maxIterations = DEFAULT_ROOT_ITERATIONS,
  sourceMaskRadius = DEFAULT_SOURCE_MASK_RADIUS,
} = {}) {
  const normalizedBeta = normalizeBeta(beta);
  const orbitalRadius = normalizeOrbitalRadius(radius);
  const normalizedDirection = normalizeDirection(direction);
  const sign = normalizeSourceSign(sourceSign);
  const receptionTime = finiteNumber(observationTime, "observationTime");
  const tolerance = finiteNumber(rootTolerance, "rootTolerance");
  const iterationsLimit = Math.round(finiteNumber(maxIterations, "maxIterations"));
  const maskRadius = finiteNumber(sourceMaskRadius, "sourceMaskRadius");
  if (!(receptionTime > 0)) {
    return Object.freeze({
      state: "unavailable:no_retained_history",
      delay: null,
      bracket: Object.freeze([0, receptionTime]),
      endpoint: normalizedBeta === 1,
    });
  }
  if (!(tolerance > 0) || iterationsLimit < 1 || maskRadius < 0) {
    throw new RangeError("root tolerance and iterations must be positive; mask radius must be nonnegative.");
  }

  const currentSource = topoCircularBinarySourcePosition({
    sourceSign: sign,
    time: receptionTime,
    beta: normalizedBeta,
    radius: orbitalRadius,
    direction: normalizedDirection,
  });
  const currentDistance = Math.hypot(
    finiteNumber(point?.x, "point.x") - currentSource.x,
    finiteNumber(point?.y, "point.y") - currentSource.y,
  );
  if (currentDistance <= maskRadius) {
    return Object.freeze({
      state: normalizedBeta === 1
        ? "nonordinary:endpoint_source"
        : "singular:endpoint_source",
      delay: null,
      bracket: Object.freeze([0, 0]),
      endpoint: normalizedBeta === 1,
    });
  }

  const startResidual = currentDistance;
  const endResidual = topoCircularBinaryCausalResidual({
    point,
    sourceSign: sign,
    observationTime: receptionTime,
    delay: receptionTime,
    beta: normalizedBeta,
    radius: orbitalRadius,
    direction: normalizedDirection,
  });
  if (endResidual > tolerance) {
    return Object.freeze({
      state: "unavailable:no_ordinary_root_in_retained_history",
      delay: null,
      bracket: Object.freeze([0, receptionTime]),
      endpointResiduals: Object.freeze([startResidual, endResidual]),
      endpoint: normalizedBeta === 1,
    });
  }
  if (Math.abs(endResidual) <= tolerance) {
    return Object.freeze({
      state: "ordinary",
      delay: receptionTime,
      residual: endResidual,
      bracket: Object.freeze([receptionTime, receptionTime]),
      iterations: 0,
      endpoint: normalizedBeta === 1,
      uniqueness: normalizedBeta < 1
        ? "strict-sub-field-speed"
        : "circular-endpoint-monotone",
    });
  }

  let low = 0;
  let high = receptionTime;
  let iterations = 0;
  for (; iterations < iterationsLimit; iterations += 1) {
    const mid = (low + high) / 2;
    const residual = topoCircularBinaryCausalResidual({
      point,
      sourceSign: sign,
      observationTime: receptionTime,
      delay: mid,
      beta: normalizedBeta,
      radius: orbitalRadius,
      direction: normalizedDirection,
    });
    if (residual > 0) {
      low = mid;
    } else {
      high = mid;
    }
  }
  const finalDelay = (low + high) / 2;
  const finalResidual = topoCircularBinaryCausalResidual({
    point,
    sourceSign: sign,
    observationTime: receptionTime,
    delay: finalDelay,
    beta: normalizedBeta,
    radius: orbitalRadius,
    direction: normalizedDirection,
  });
  if (!(finalDelay > 0) || Math.abs(finalResidual) > tolerance * 8) {
    return Object.freeze({
      state: "unresolved:numeric_failure",
      delay: null,
      residual: finalResidual,
      bracket: Object.freeze([low, high]),
      iterations,
      endpoint: normalizedBeta === 1,
    });
  }
  return Object.freeze({
    state: "ordinary",
    delay: finalDelay,
    residual: finalResidual,
    bracket: Object.freeze([low, high]),
    iterations,
    endpoint: normalizedBeta === 1,
    uniqueness: normalizedBeta < 1
      ? "strict-sub-field-speed"
      : "circular-endpoint-monotone",
  });
}

export function sampleTopoCircularBinaryWake({
  point,
  beta = 0.5,
  radius = TOPO_CIRCULAR_BINARY_DEFAULT_RADIUS,
  progress = 0,
  observationTime,
  kappa = TOPO_CIRCULAR_BINARY_KAPPA,
  sourceMaskRadius = DEFAULT_SOURCE_MASK_RADIUS,
  direction = TOPO_CIRCULAR_BINARY_DIRECTION.COUNTERCLOCKWISE,
} = {}) {
  const playback = createTopoCircularBinaryPlayback({
    beta,
    progress,
    radius,
    direction,
  });
  const receptionTime = observationTime == null
    ? playback.observationTime
    : finiteNumber(observationTime, "observationTime");
  const scale = finiteNumber(kappa, "kappa");
  if (!(scale > 0)) {
    throw new RangeError("kappa must be positive.");
  }
  const roots = [-1, 1].map((sourceSign) =>
    solveTopoCircularBinaryCausalDelay({
      point,
      sourceSign,
      observationTime: receptionTime,
      beta: playback.beta,
      radius: playback.radius,
      direction: playback.direction,
      sourceMaskRadius,
    }));
  const sourceState = roots.find(({ state }) =>
    state === "singular:endpoint_source" ||
    state === "nonordinary:endpoint_source");
  if (sourceState) {
    return Object.freeze({
      state: sourceState.state,
      rawValue: null,
      roots: Object.freeze(roots),
      playback,
    });
  }
  if (roots.some(({ state }) => state !== "ordinary")) {
    const unresolved = roots.some(({ state }) => state.startsWith("unresolved:"));
    return Object.freeze({
      state: unresolved
        ? "unresolved:numeric_failure"
        : "unavailable:incomplete_source_ledger",
      rawValue: null,
      roots: Object.freeze(roots),
      playback,
    });
  }
  const rawValue = (-scale / roots[0].delay ** 2) +
    (scale / roots[1].delay ** 2);
  return Object.freeze({
    state: "ordinary",
    rawValue,
    displayCoordinate: normalizeTopoFieldColorValue(rawValue),
    roots: Object.freeze(roots),
    playback,
  });
}

export function createTopoCircularBinaryRawSampler({
  beta = 0.5,
  radius = TOPO_CIRCULAR_BINARY_DEFAULT_RADIUS,
  progress = 0,
  observationTime,
  sourceMaskRadius = DEFAULT_SOURCE_MASK_RADIUS,
  direction = TOPO_CIRCULAR_BINARY_DIRECTION.COUNTERCLOCKWISE,
} = {}) {
  return (x, y) => {
    const result = sampleTopoCircularBinaryWake({
      point: { x, y },
      beta,
      radius,
      progress,
      observationTime,
      sourceMaskRadius,
      direction,
    });
    if (result.state === "ordinary") {
      return result.rawValue;
    }
    if (result.state.startsWith("singular:") || result.state.startsWith("nonordinary:")) {
      return Number.NaN;
    }
    return Number.POSITIVE_INFINITY;
  };
}

export function createTopoCircularBinaryFrameIdentity({
  beta = 0.5,
  progress = 0,
  radius = TOPO_CIRCULAR_BINARY_DEFAULT_RADIUS,
  direction = TOPO_CIRCULAR_BINARY_DIRECTION.COUNTERCLOCKWISE,
} = {}) {
  const playback = createTopoCircularBinaryPlayback({
    beta,
    progress,
    radius,
    direction,
  });
  return [
    TOPO_CIRCULAR_BINARY_CONTRACT_ID,
    "beta=" + playback.beta.toFixed(2),
    "orbit=" + playback.progress.toFixed(6),
    "radius=" + playback.radius.toFixed(2),
    "direction=" + playback.direction,
    "T=" + playback.observationTime.toFixed(9),
  ].join(":");
}

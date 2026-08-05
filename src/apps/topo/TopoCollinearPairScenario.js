import {
  TOPO_INVERSE_SQUARE_SCALE,
} from "./TopoInteractionContract.js";

export const TOPO_COLLINEAR_PAIR_SCENARIO_ID =
  "approaching-collinear-electrino-positrino";
export const TOPO_COLLINEAR_PAIR_PLAYBACK_SECONDS = 21.6;
export const TOPO_COLLINEAR_PAIR_REFERENCE_BETA = 0.5;
export const TOPO_COLLINEAR_PAIR_TRAVEL_DISTANCE = 3 / 5;
export const TOPO_COLLINEAR_PAIR_START = Object.freeze({
  electrino: Object.freeze({ x: 1 / 5, y: 1 / 2 }),
  positrino: Object.freeze({ x: 4 / 5, y: 1 / 2 }),
});

const SOURCE_RECORDS = Object.freeze([
  Object.freeze({
    id: "electrino",
    polaritySign: -1,
    direction: 1,
    start: TOPO_COLLINEAR_PAIR_START.electrino,
  }),
  Object.freeze({
    id: "positrino",
    polaritySign: 1,
    direction: -1,
    start: TOPO_COLLINEAR_PAIR_START.positrino,
  }),
]);

function requireFiniteNumber(value, label) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    throw new TypeError(label + " must be finite.");
  }
  return numericValue;
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function requireHorizontalWorldSpan(value) {
  const span = requireFiniteNumber(value, "horizontalWorldSpan");
  if (span <= 0) {
    throw new RangeError("horizontalWorldSpan must be positive.");
  }
  return span;
}

export function topoCollinearPairWorldXForScreenFraction(
  screenFraction,
  horizontalWorldSpan = 1,
) {
  const fraction = requireFiniteNumber(screenFraction, "screenFraction");
  const span = requireHorizontalWorldSpan(horizontalWorldSpan);
  return 2 / 3 + (fraction - 2 / 3) * span;
}

export function resolveTopoCollinearPairPlaybackSeconds(beta = 0.5) {
  const speed = requireFiniteNumber(beta, "beta");
  if (speed < 0 || speed > 1) {
    throw new RangeError("beta must lie in [0, 1].");
  }
  return speed > 0
    ? TOPO_COLLINEAR_PAIR_PLAYBACK_SECONDS *
      TOPO_COLLINEAR_PAIR_REFERENCE_BETA / speed
    : Number.POSITIVE_INFINITY;
}

export function createTopoCollinearPairFrame({
  beta = 0.5,
  phase = 0,
  horizontalWorldSpan = 1,
} = {}) {
  const speed = requireFiniteNumber(beta, "beta");
  if (speed < 0 || speed > 1) {
    throw new RangeError("beta must lie in [0, 1].");
  }
  const worldSpan = requireHorizontalWorldSpan(horizontalWorldSpan);
  const requestedPhase = clamp(requireFiniteNumber(phase, "phase"), 0, 1);
  const replayPhase = speed > 0 ? requestedPhase : 0;
  const travelDistance = TOPO_COLLINEAR_PAIR_TRAVEL_DISTANCE * worldSpan;
  const observationTime = speed > 0
    ? replayPhase * travelDistance / speed
    : 0;
  const sources = SOURCE_RECORDS.map((source) => {
    const velocityBeta = source.direction * speed;
    const start = Object.freeze({
      x: topoCollinearPairWorldXForScreenFraction(source.start.x, worldSpan),
      y: source.start.y,
    });
    return Object.freeze({
      ...source,
      screenStart: source.start,
      start,
      velocityBeta,
      historyStartTime: 0,
      observationTime,
      position: Object.freeze({
        x: start.x + velocityBeta * observationTime,
        y: start.y,
      }),
      screenPosition: Object.freeze({
        x: source.start.x +
          source.direction * replayPhase *
            TOPO_COLLINEAR_PAIR_TRAVEL_DISTANCE,
        y: source.start.y,
      }),
    });
  });
  return Object.freeze({
    scenarioId: TOPO_COLLINEAR_PAIR_SCENARIO_ID,
    beta: speed,
    phase: replayPhase,
    horizontalWorldSpan: worldSpan,
    travelDistance,
    observationTime,
    sources: Object.freeze(sources),
  });
}

function causalDelayForPrescribedSource(x, y, source) {
  const offsetX = x - source.position.x;
  const offsetY = y - source.position.y;
  const radiusSquared = offsetX ** 2 + offsetY ** 2;
  if (radiusSquared === 0) {
    return 0;
  }
  const velocityBeta = source.velocityBeta;
  if (Math.abs(velocityBeta) === 1) {
    if (velocityBeta * offsetX >= 0) {
      return null;
    }
    return -radiusSquared / (2 * velocityBeta * offsetX);
  }
  const lambda = Math.sqrt(
    offsetX ** 2 + (1 - velocityBeta ** 2) * offsetY ** 2,
  );
  return radiusSquared / (lambda - velocityBeta * offsetX);
}

export function createTopoCollinearPairRawSampler({
  beta = 0.5,
  phase = 0,
  horizontalWorldSpan = 1,
  sourceMaskRadius = 0.01,
} = {}) {
  const frame = createTopoCollinearPairFrame({
    beta,
    phase,
    horizontalWorldSpan,
  });
  const maskRadius = requireFiniteNumber(sourceMaskRadius, "sourceMaskRadius");
  if (maskRadius < 0) {
    throw new RangeError("sourceMaskRadius must be nonnegative.");
  }
  return (candidateX, candidateY) => {
    const x = requireFiniteNumber(candidateX, "x");
    const y = requireFiniteNumber(candidateY, "y");
    if (frame.sources.some((source) =>
      Math.hypot(x - source.position.x, y - source.position.y) <= maskRadius)) {
      return Number.NaN;
    }
    let signedSum = 0;
    for (const source of frame.sources) {
      const causalDelay = causalDelayForPrescribedSource(x, y, source);
      if (
        causalDelay == null ||
        causalDelay <= 0 ||
        causalDelay > frame.observationTime + 1e-12
      ) {
        continue;
      }
      signedSum += source.polaritySign *
        TOPO_INVERSE_SQUARE_SCALE / causalDelay ** 2;
    }
    return signedSum;
  };
}

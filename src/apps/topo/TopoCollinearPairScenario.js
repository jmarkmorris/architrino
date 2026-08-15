import {
  TOPO_DEFAULT_PARTNER_WAKE_OBSERVER,
  TOPO_INVERSE_SQUARE_SCALE,
  normalizeTopoPartnerWakeObserver,
  topoPartnerWakeSourceSign,
} from "./TopoInteractionContract.js";

export const TOPO_COLLINEAR_PAIR_SCENARIO_ID =
  "approaching-collinear-electrino-positrino";
export const TOPO_COLLINEAR_PAIR_PLAYBACK_SECONDS = 21.6;
export const TOPO_COLLINEAR_PAIR_REFERENCE_BETA = 0.5;
export const TOPO_COLLINEAR_PAIR_TRAVEL_DISTANCE = 3 / 5;
export const TOPO_COLLINEAR_PAIR_HISTORY_MODEL =
  "stationary-prehistory-instantaneous-prescribed-launch/v1";
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
      historyStartTime: Number.NEGATIVE_INFINITY,
      historyModel: TOPO_COLLINEAR_PAIR_HISTORY_MODEL,
      launchTime: 0,
      prelaunchPosition: start,
      prelaunchVelocityBeta: 0,
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

export function solveTopoCollinearPairCausalDelay(x, y, source) {
  const offsetX = x - source.position.x;
  const offsetY = y - source.position.y;
  const radiusSquared = offsetX ** 2 + offsetY ** 2;
  if (radiusSquared === 0) {
    return 0;
  }
  const velocityBeta = source.velocityBeta;
  let constantVelocityDelay = null;
  if (Math.abs(velocityBeta) === 1) {
    if (velocityBeta * offsetX < 0) {
      constantVelocityDelay = -radiusSquared / (2 * velocityBeta * offsetX);
    }
  } else {
    const lambda = Math.sqrt(
      offsetX ** 2 + (1 - velocityBeta ** 2) * offsetY ** 2,
    );
    constantVelocityDelay = radiusSquared / (lambda - velocityBeta * offsetX);
  }
  if (constantVelocityDelay != null && constantVelocityDelay > 0 &&
      source.observationTime - constantVelocityDelay >= -1e-12) {
    return constantVelocityDelay;
  }
  const stationaryPrehistoryDelay = Math.hypot(
    x - source.prelaunchPosition.x,
    y - source.prelaunchPosition.y,
  );
  return source.observationTime - stationaryPrehistoryDelay <= 1e-12
    ? stationaryPrehistoryDelay
    : null;
}

export function createTopoCollinearPartnerCharacteristicDiagnostic({
  phase = 0.517,
  observerId = "electrino",
  horizontalWorldSpan = 1,
} = {}) {
  const frame = createTopoCollinearPairFrame({
    beta: 1,
    phase,
    horizontalWorldSpan,
  });
  const observer = frame.sources.find((source) => source.id === observerId);
  const partner = frame.sources.find((source) => source.id !== observerId);
  if (!observer || !partner) {
    throw new RangeError("observerId must identify one of the prescribed sources.");
  }
  const causalDelay = solveTopoCollinearPairCausalDelay(
    observer.position.x,
    observer.position.y,
    partner,
  );
  const ordinaryRoot = causalDelay != null && causalDelay > 0 &&
    causalDelay <= frame.observationTime + 1e-12;
  const emissionTime = ordinaryRoot
    ? frame.observationTime - causalDelay
    : null;
  const emissionLocation = ordinaryRoot
    ? Object.freeze({
      x: partner.start.x + partner.velocityBeta * emissionTime,
      y: partner.start.y,
    })
    : null;
  const characteristicDirection = ordinaryRoot
    ? Math.sign(observer.position.x - emissionLocation.x)
    : 0;
  return Object.freeze({
    frame,
    observer,
    partner,
    ordinaryRoot,
    causalDelay,
    emissionTime,
    emissionLocation,
    characteristicDirection,
    partnerCharacteristic: ordinaryRoot &&
      characteristicDirection === -Math.sign(partner.velocityBeta)
      ? "trailing"
      : "leading",
    partnerWakeValue: ordinaryRoot
      ? partner.polaritySign * TOPO_INVERSE_SQUARE_SCALE / causalDelay ** 2
      : null,
  });
}

export function createTopoCollinearPairRawSampler({
  beta = 0.5,
  phase = 0,
  horizontalWorldSpan = 1,
  sourceMaskRadius = 0,
  observerId = TOPO_DEFAULT_PARTNER_WAKE_OBSERVER,
  superposition = false,
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
  const sources = superposition
    ? frame.sources
    : [frame.sources.find((source) =>
      source.polaritySign === topoPartnerWakeSourceSign(
        normalizeTopoPartnerWakeObserver(observerId),
      ))];
  if (sources.some((source) => !source)) {
    throw new Error("The selected view has no source ledger.");
  }
  return (candidateX, candidateY) => {
    const x = requireFiniteNumber(candidateX, "x");
    const y = requireFiniteNumber(candidateY, "y");
    if (sources.some((source) =>
      Math.hypot(x - source.position.x, y - source.position.y) <= maskRadius)) {
      return Number.NaN;
    }
    let rawValue = 0;
    for (const source of sources) {
      const causalDelay = solveTopoCollinearPairCausalDelay(x, y, source);
      if (causalDelay == null || causalDelay <= 0) {
        return Number.POSITIVE_INFINITY;
      }
      if (frame.observationTime - causalDelay < source.historyStartTime - 1e-12) {
        return Number.POSITIVE_INFINITY;
      }
      rawValue += source.polaritySign *
        TOPO_INVERSE_SQUARE_SCALE / causalDelay ** 2;
    }
    return rawValue;
  };
}

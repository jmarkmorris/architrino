export const PHOTON_LAYER_ORDER = Object.freeze(["I", "M", "O"]);

export const PHOTON_LAYER_META = Object.freeze({
  I: { id: "I", label: "I", color: "#7dd3fc", role: "inner" },
  M: { id: "M", label: "M", color: "#fbbf24", role: "middle" },
  O: { id: "O", label: "O", color: "#f472b6", role: "outer" },
});

export const PHOTON_CHARGE_COLORS = Object.freeze({
  positrino: "#ff0000",
  electrino: "#0000ff",
  neutral: "#800080",
});

const TWO_PI = Math.PI * 2;
const PHOTON_MIN_SEPARATION_LOG10_RATIO = -10;
const PHOTON_MAX_SEPARATION_LOG10_RATIO = 5;
const PHOTON_CONTROL_RANGES_MIN_PAIR_SEPARATION = 0.2 * 10 ** PHOTON_MIN_SEPARATION_LOG10_RATIO;
const PHOTON_CONTROL_RANGES_MAX_PAIR_SEPARATION = 2.4 * 10 ** PHOTON_MAX_SEPARATION_LOG10_RATIO;
const PHOTON_MIN_FREQUENCY_EXPONENT = 0;
const PHOTON_MAX_FREQUENCY_EXPONENT = 5;
export const PHOTON_DEFAULT_PLAYBACK_SPEED_MULTIPLIER = 0.2;

export const PHOTON_LAYER_SPEED_RATIO_TARGETS = Object.freeze({
  I: 1.2,
  M: 1,
  O: 0.8,
});

export const PHOTON_DEFAULT_LAYER_FREQUENCIES_HZ = Object.freeze({
  I: 4,
  M: 2,
  O: 1,
});

export const PHOTON_DEFAULT_LAYER_RADII = Object.freeze({
  I: getPhotonRadiusForSpeedRatio(
    PHOTON_DEFAULT_LAYER_FREQUENCIES_HZ.I,
    PHOTON_LAYER_SPEED_RATIO_TARGETS.I
  ),
  M: getPhotonRadiusForSpeedRatio(
    PHOTON_DEFAULT_LAYER_FREQUENCIES_HZ.M,
    PHOTON_LAYER_SPEED_RATIO_TARGETS.M
  ),
  O: getPhotonRadiusForSpeedRatio(
    PHOTON_DEFAULT_LAYER_FREQUENCIES_HZ.O,
    PHOTON_LAYER_SPEED_RATIO_TARGETS.O
  ),
});

export const PHOTON_DEFAULT_LAYER_PHASES_DEG = Object.freeze({
  I: 0,
  M: 0,
  O: 0,
});

export function getPhotonRadiusForSpeedRatio(frequencyHz, speedRatio, fieldSpeed = 1) {
  const frequencyNumber = Number(frequencyHz);
  const speedNumber = Number(speedRatio);
  const fieldSpeedNumber = Number(fieldSpeed);
  if (
    !Number.isFinite(frequencyNumber) ||
    frequencyNumber <= 0 ||
    !Number.isFinite(speedNumber)
  ) {
    return 0;
  }
  const safeFieldSpeed = Number.isFinite(fieldSpeedNumber) && fieldSpeedNumber > 0 ? fieldSpeedNumber : 1;
  return (speedNumber * safeFieldSpeed) / (TWO_PI * frequencyNumber);
}

export function getPhotonFrequencyForSpeedRatio(radius, speedRatio, fieldSpeed = 1) {
  const radiusNumber = Number(radius);
  const speedNumber = Number(speedRatio);
  const fieldSpeedNumber = Number(fieldSpeed);
  if (!Number.isFinite(radiusNumber) || radiusNumber <= 0 || !Number.isFinite(speedNumber)) {
    return 0;
  }
  const safeFieldSpeed = Number.isFinite(fieldSpeedNumber) && fieldSpeedNumber > 0 ? fieldSpeedNumber : 1;
  return (speedNumber * safeFieldSpeed) / (TWO_PI * radiusNumber);
}

export function getPhotonFrequencyFromExponent(exponent) {
  const number = Number(exponent);
  const safeExponent = Math.min(
    PHOTON_MAX_FREQUENCY_EXPONENT,
    Math.max(PHOTON_MIN_FREQUENCY_EXPONENT, Number.isFinite(number) ? Math.round(number) : 0)
  );
  return 2 ** safeExponent;
}

export function getPhotonFrequencyExponent(frequency) {
  const number = Number(frequency);
  if (!Number.isFinite(number) || number <= 0) {
    return PHOTON_MIN_FREQUENCY_EXPONENT;
  }
  return Math.min(
    PHOTON_MAX_FREQUENCY_EXPONENT,
    Math.max(PHOTON_MIN_FREQUENCY_EXPONENT, Math.round(Math.log2(number)))
  );
}

export function snapPhotonFrequencyToPowerOfTwo(frequency, fallback = 1) {
  const number = Number(frequency);
  const safeFrequency = Number.isFinite(number) && number > 0 ? number : fallback;
  return getPhotonFrequencyFromExponent(getPhotonFrequencyExponent(safeFrequency));
}

function createPhotonDefaultLayer(layerId) {
  const radius = PHOTON_DEFAULT_LAYER_RADII[layerId];
  return {
    enabled: true,
    radius,
    frequencyHz: PHOTON_DEFAULT_LAYER_FREQUENCIES_HZ[layerId],
    phaseDeg: PHOTON_DEFAULT_LAYER_PHASES_DEG[layerId],
  };
}

function createPhotonDefaultLayers() {
  return {
    I: createPhotonDefaultLayer("I"),
    M: createPhotonDefaultLayer("M"),
    O: createPhotonDefaultLayer("O"),
  };
}

export const PHOTON_CONTROL_RANGES = Object.freeze({
  frequencyHz: {
    min: getPhotonFrequencyFromExponent(PHOTON_MIN_FREQUENCY_EXPONENT),
    max: getPhotonFrequencyFromExponent(PHOTON_MAX_FREQUENCY_EXPONENT),
    step: 1,
  },
  frequencyExponent: {
    min: PHOTON_MIN_FREQUENCY_EXPONENT,
    max: PHOTON_MAX_FREQUENCY_EXPONENT,
    step: 1,
  },
  radius: { min: 0.01, max: 2.4, step: 0.0001 },
  phaseDeg: { min: 0, max: 360, step: 1 },
  pairSeparation: {
    min: PHOTON_CONTROL_RANGES_MIN_PAIR_SEPARATION,
    max: PHOTON_CONTROL_RANGES_MAX_PAIR_SEPARATION,
    step: 0.05,
  },
  pairSeparationLog10Ratio: {
    min: PHOTON_MIN_SEPARATION_LOG10_RATIO,
    max: PHOTON_MAX_SEPARATION_LOG10_RATIO,
    step: "any",
  },
  speedMultiplier: { min: 0.025, max: 1.6, step: 0.001 },
  analyzerAngleDeg: { min: 0, max: 180, step: 1 },
  virtualObserverX: { min: -10, max: 10, step: 0.05 },
  virtualObserverY: { min: -4, max: 4, step: 0.05 },
  virtualObserverZ: { min: -4, max: 4, step: 0.05 },
});

export const DEFAULT_PHOTON_STATE = Object.freeze({
  app: "photon",
  version: 1,
  time: {
    paused: false,
    speedMultiplier: PHOTON_DEFAULT_PLAYBACK_SPEED_MULTIPLIER,
    cycleReferenceLayer: "M",
    cycleCount: 3,
  },
  view: {
    pathsVisible: true,
    rawPolarizationVisible: true,
  },
  pair: {
    speedMode: "cf",
    pairSeparation: PHOTON_DEFAULT_LAYER_RADII.O,
    left: {
      role: "trailing",
      direction: "ccw",
      layers: createPhotonDefaultLayers(),
    },
    right: {
      role: "leading",
      direction: "cw",
      layers: createPhotonDefaultLayers(),
    },
  },
  polarization: {
    analyzerAngleDeg: 0,
  },
  measurement: {
    virtualObserver: {
      x: 0,
      y: 0,
      z: 0,
    },
    emissionSpeedCf: 1,
  },
});

export function clampPhotonNumber(value, min, max, fallback = min) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, number));
}

export function normalizePhotonDegrees(value, fallback = 0) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return ((number % 360) + 360) % 360;
}

export function clonePhotonState(state = DEFAULT_PHOTON_STATE) {
  return JSON.parse(JSON.stringify(state));
}

function normalizeLayerState(layer = {}, fallbackLayer = {}) {
  return {
    enabled: layer.enabled !== false,
    radius: clampPhotonNumber(
      layer.radius,
      PHOTON_CONTROL_RANGES.radius.min,
      PHOTON_CONTROL_RANGES.radius.max,
      fallbackLayer.radius ?? 1
    ),
    frequencyHz: snapPhotonFrequencyToPowerOfTwo(
      layer.frequencyHz,
      fallbackLayer.frequencyHz ?? 1
    ),
    phaseDeg: normalizePhotonDegrees(layer.phaseDeg, fallbackLayer.phaseDeg ?? 0),
  };
}

function normalizeSwarmState(swarm = {}, fallbackSwarm = {}, side = "left") {
  const lockedDirection = side === "left" ? "ccw" : "cw";
  const lockedRole = side === "left" ? "trailing" : "leading";
  const layers = {};
  PHOTON_LAYER_ORDER.forEach((layerId) => {
    layers[layerId] = normalizeLayerState(
      swarm.layers?.[layerId],
      fallbackSwarm.layers?.[layerId]
    );
  });
  return {
    role: lockedRole,
    direction: lockedDirection,
    layers,
  };
}

export function normalizePhotonState(input = DEFAULT_PHOTON_STATE) {
  const fallback = DEFAULT_PHOTON_STATE;
  const state = input && typeof input === "object" ? input : fallback;
  const left = normalizeSwarmState(state.pair?.left, fallback.pair.left, "left");
  const right = normalizeSwarmState(state.pair?.right, fallback.pair.right, "right");
  const pairShell = { pair: { left, right } };
  return {
    app: "photon",
    version: 1,
    time: {
      paused: !!state.time?.paused,
      speedMultiplier: clampPhotonNumber(
        state.time?.speedMultiplier,
        PHOTON_CONTROL_RANGES.speedMultiplier.min,
        PHOTON_CONTROL_RANGES.speedMultiplier.max,
        fallback.time.speedMultiplier
      ),
      cycleReferenceLayer: PHOTON_LAYER_ORDER.includes(state.time?.cycleReferenceLayer)
        ? state.time.cycleReferenceLayer
        : fallback.time.cycleReferenceLayer,
      cycleCount: clampPhotonNumber(state.time?.cycleCount, 1, 12, fallback.time.cycleCount),
    },
    view: {
      pathsVisible: state.view?.pathsVisible !== false,
      rawPolarizationVisible: state.view?.rawPolarizationVisible !== false,
    },
    pair: {
      speedMode: "cf",
      pairSeparation: clampPhotonPairSeparationForState(
        pairShell,
        state.pair?.pairSeparation,
        fallback.pair.pairSeparation
      ),
      left,
      right,
    },
    polarization: {
      analyzerAngleDeg: clampPhotonNumber(
        state.polarization?.analyzerAngleDeg,
        PHOTON_CONTROL_RANGES.analyzerAngleDeg.min,
        PHOTON_CONTROL_RANGES.analyzerAngleDeg.max,
        fallback.polarization.analyzerAngleDeg
      ),
    },
    measurement: {
      virtualObserver: {
        x: clampPhotonNumber(
          state.measurement?.virtualObserver?.x,
          PHOTON_CONTROL_RANGES.virtualObserverX.min,
          PHOTON_CONTROL_RANGES.virtualObserverX.max,
          fallback.measurement.virtualObserver.x
        ),
        y: clampPhotonNumber(
          state.measurement?.virtualObserver?.y,
          PHOTON_CONTROL_RANGES.virtualObserverY.min,
          PHOTON_CONTROL_RANGES.virtualObserverY.max,
          fallback.measurement.virtualObserver.y
        ),
        z: clampPhotonNumber(
          state.measurement?.virtualObserver?.z,
          PHOTON_CONTROL_RANGES.virtualObserverZ.min,
          PHOTON_CONTROL_RANGES.virtualObserverZ.max,
          fallback.measurement.virtualObserver.z
        ),
      },
      emissionSpeedCf: 1,
    },
  };
}

export function createDefaultPhotonState() {
  return normalizePhotonState(DEFAULT_PHOTON_STATE);
}

export function getPhotonLayer(state, swarmId, layerId) {
  return state?.pair?.[swarmId]?.layers?.[layerId] ?? DEFAULT_PHOTON_STATE.pair[swarmId].layers[layerId];
}

export function getPhotonLayerEnabled(state, swarmId, layerId) {
  return getPhotonLayer(state, swarmId, layerId).enabled !== false;
}

export function getPhotonLayerRadiusBounds(state, swarmId, layerId) {
  const range = PHOTON_CONTROL_RANGES.radius;
  const layerRadius = (id) =>
    clampPhotonNumber(getPhotonLayer(state, swarmId, id).radius, range.min, range.max, range.min);
  let min = range.min;
  let max = range.max;
  if (layerId === "I") {
    max = layerRadius("M");
  } else if (layerId === "M") {
    min = layerRadius("I");
    max = layerRadius("O");
  } else if (layerId === "O") {
    min = layerRadius("M");
  }
  if (min > max) {
    return { min: max, max: min };
  }
  return { min, max };
}

export function getPhotonSeparationReferenceRadius(state) {
  const enabledRadii = [];
  const fallbackRadii = [];
  ["left", "right"].forEach((swarmId) => {
    PHOTON_LAYER_ORDER.forEach((layerId) => {
      const layer = getPhotonLayer(state, swarmId, layerId);
      const radius = Number(layer.radius);
      if (!Number.isFinite(radius) || radius <= 0) {
        return;
      }
      fallbackRadii.push(radius);
      if (layer.enabled !== false) {
        enabledRadii.push(radius);
      }
    });
  });
  const radii = enabledRadii.length ? enabledRadii : fallbackRadii;
  return radii.length ? Math.max(...radii) : PHOTON_DEFAULT_LAYER_RADII.O;
}

export function getPhotonPairSeparationFromLog10Ratio(state, log10Ratio) {
  const range = PHOTON_CONTROL_RANGES.pairSeparationLog10Ratio;
  const clampedLog10Ratio = clampPhotonNumber(log10Ratio, range.min, range.max, range.max);
  return getPhotonSeparationReferenceRadius(state) * 10 ** clampedLog10Ratio;
}

export function getPhotonSeparationLog10Ratio(state) {
  const range = PHOTON_CONTROL_RANGES.pairSeparationLog10Ratio;
  const referenceRadius = getPhotonSeparationReferenceRadius(state);
  const rawSeparation = Number(state?.pair?.pairSeparation);
  const safeSeparation =
    Number.isFinite(rawSeparation) && rawSeparation > 0
      ? rawSeparation
      : getPhotonPairSeparationFromLog10Ratio(state, range.max);
  const ratio = safeSeparation / Math.max(referenceRadius, Number.EPSILON);
  return clampPhotonNumber(Math.log10(Math.max(ratio, 10 ** range.min)), range.min, range.max, range.max);
}

export function setPhotonPairSeparationLog10Ratio(state, log10Ratio) {
  if (!state?.pair) {
    return;
  }
  state.pair.pairSeparation = getPhotonPairSeparationFromLog10Ratio(state, log10Ratio);
}

export function clampPhotonPairSeparationForState(state, value, fallback = DEFAULT_PHOTON_STATE.pair.pairSeparation) {
  const range = PHOTON_CONTROL_RANGES.pairSeparationLog10Ratio;
  const min = getPhotonPairSeparationFromLog10Ratio(state, range.min);
  const max = getPhotonPairSeparationFromLog10Ratio(state, range.max);
  const safeFallback = clampPhotonNumber(fallback, min, max, max);
  return clampPhotonNumber(
    value,
    min,
    max,
    safeFallback
  );
}

export function setPhotonLayerEnabled(state, swarmId, layerId, enabled) {
  if (!state?.pair?.[swarmId]?.layers?.[layerId]) {
    return;
  }
  state.pair[swarmId].layers[layerId].enabled = !!enabled;
}

export function getPhotonReferenceFrequency(state) {
  const layerId = state?.time?.cycleReferenceLayer ?? "M";
  const left = getPhotonLayer(state, "left", layerId).frequencyHz;
  const right = getPhotonLayer(state, "right", layerId).frequencyHz;
  return Math.max(0.0001, (left + right) / 2);
}

export function getPhotonCycleDuration(state) {
  return 1 / getPhotonReferenceFrequency(state);
}

export function getPhotonRunDuration(state) {
  const cycleCount = Math.max(1, Number(state?.time?.cycleCount ?? 3) || 3);
  return cycleCount * getPhotonCycleDuration(state);
}

export function getPhotonMiddleCycleBounds(state) {
  const cycleDuration = getPhotonCycleDuration(state);
  return {
    start: cycleDuration,
    end: cycleDuration * 2,
  };
}

export function wrapPhotonTime(state, timeSeconds) {
  const runDuration = getPhotonRunDuration(state);
  if (!Number.isFinite(timeSeconds) || runDuration <= 0) {
    return 0;
  }
  return ((timeSeconds % runDuration) + runDuration) % runDuration;
}

export function getPhotonDirectionSign(state, swarmId) {
  return state?.pair?.[swarmId]?.direction === "cw" ? -1 : 1;
}

export function getPhotonLayerTangentialSpeedRatio(state, swarmId, layerId, fieldSpeed = 1) {
  const layer = getPhotonLayer(state, swarmId, layerId);
  const speed = TWO_PI * Math.abs(Number(layer.radius) || 0) * Math.abs(Number(layer.frequencyHz) || 0);
  const fieldSpeedNumber = Number(fieldSpeed);
  const safeFieldSpeed = Number.isFinite(fieldSpeedNumber) && fieldSpeedNumber > 0 ? fieldSpeedNumber : 1;
  return speed / safeFieldSpeed;
}

export function getPhotonLayerAngleRadians(state, swarmId, layerId, timeSeconds, chargeType = "positrino") {
  const layer = getPhotonLayer(state, swarmId, layerId);
  const directionSign = getPhotonDirectionSign(state, swarmId);
  const phase = (normalizePhotonDegrees(layer.phaseDeg) / 360) * TWO_PI;
  const chargeOffset = chargeType === "electrino" ? Math.PI : 0;
  return phase + chargeOffset + directionSign * TWO_PI * layer.frequencyHz * timeSeconds;
}

export function setPhotonLayerValue(state, swarmId, layerId, key, value) {
  if (!state?.pair?.[swarmId]?.layers?.[layerId]) {
    return;
  }
  const layer = state.pair[swarmId].layers[layerId];
  if (key === "phaseDeg") {
    layer.phaseDeg = normalizePhotonDegrees(value, layer.phaseDeg);
    return;
  }
  if (key === "frequencyHz") {
    layer.frequencyHz = snapPhotonFrequencyToPowerOfTwo(
      value,
      layer.frequencyHz
    );
    return;
  }
  if (key === "radius") {
    const radiusBounds = getPhotonLayerRadiusBounds(state, swarmId, layerId);
    layer.radius = clampPhotonNumber(
      value,
      radiusBounds.min,
      radiusBounds.max,
      layer.radius
    );
  }
}

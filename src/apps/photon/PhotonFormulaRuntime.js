import {
  PHOTON_LAYER_ORDER,
  getPhotonDirectionSign,
  getPhotonLayer,
  getPhotonLayerEnabled,
  getPhotonLayerAngleRadians,
  getPhotonReferenceFrequency,
  getPhotonRunDuration,
  getPhotonMiddleCycleBounds,
  wrapPhotonTime,
  getPhotonSeparationReferenceRadius,
} from "./PhotonStateRuntime.js";

const TWO_PI = Math.PI * 2;
const EPSILON = 1e-9;
const MIN_FIELD_DISTANCE = 0.08;
const MAX_DELAY_SOLVE_STEPS = 24;
const DELAY_SOLVE_TOLERANCE = 1e-5;
const DEFAULT_ANALYZER_AVERAGE_SAMPLES = 48;
const PHOTON_CHARGE_TYPES = Object.freeze(["positrino", "electrino"]);
const PHOTON_CHARGE_SIGN = Object.freeze({
  positrino: 1,
  electrino: -1,
});

export function degreesToPhotonRadians(degrees) {
  return (Number(degrees) || 0) * Math.PI / 180;
}

export function resolvePhotonPolarizationParameters(state) {
  const basis = state?.polarization?.basis ?? "linear";
  const intensity = Math.max(0, Number(state?.polarization?.intensity ?? 1) || 0);
  if (basis === "right_circular") {
    return {
      basis,
      intensity,
      alpha: Math.PI / 4,
      phaseLag: -Math.PI / 2,
    };
  }
  if (basis === "left_circular") {
    return {
      basis,
      intensity,
      alpha: Math.PI / 4,
      phaseLag: Math.PI / 2,
    };
  }
  const alpha = degreesToPhotonRadians(state?.polarization?.linearAngleDeg ?? 0);
  const rawPhaseLag = degreesToPhotonRadians(state?.polarization?.phaseLagDeg ?? 0);
  const ellipticity = Math.max(-1, Math.min(1, Number(state?.polarization?.ellipticity ?? 0) || 0));
  return {
    basis,
    intensity,
    alpha,
    phaseLag: basis === "elliptical" ? rawPhaseLag + ellipticity * Math.PI / 2 : 0,
  };
}

export function resolvePhotonMeasurementParameters(state) {
  return {
    testPoint: {
      x: Number(state?.measurement?.testPoint?.x ?? 0) || 0,
      y: Number(state?.measurement?.testPoint?.y ?? 0) || 0,
      z: Number(state?.measurement?.testPoint?.z ?? 0) || 0,
    },
    emissionSpeedCf: 1,
    nearFieldWeight: Math.max(0, Math.min(1, Number(state?.measurement?.nearFieldWeight ?? 0.12) || 0)),
    fieldGain: Math.max(0.01, Number(state?.measurement?.fieldGain ?? 0.04) || 0.04),
  };
}

function getPhotonSwarmCenterX(state, swarmId) {
  const fallbackSeparation = getPhotonSeparationReferenceRadius(state);
  const separation = Math.max(0, Number(state?.pair?.pairSeparation) || fallbackSeparation);
  return swarmId === "left" ? -separation / 2 : separation / 2;
}

function subtractVector(a, b) {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
    z: a.z - b.z,
  };
}

function addVector(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
    z: a.z + b.z,
  };
}

function scaleVector(vector, scale) {
  return {
    x: vector.x * scale,
    y: vector.y * scale,
    z: vector.z * scale,
  };
}

function dotVector(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function vectorMagnitude(vector) {
  return Math.sqrt(dotVector(vector, vector));
}

function crossVector(a, b) {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

function safeDirectionVector(delta) {
  const distance = Math.max(MIN_FIELD_DISTANCE, vectorMagnitude(delta));
  return {
    distance,
    direction: scaleVector(delta, 1 / distance),
  };
}

export function getPhotonArchitrinoKinematics(state, swarmId, layerId, chargeType, timeSeconds) {
  const layer = getPhotonLayer(state, swarmId, layerId);
  const directionSign = getPhotonDirectionSign(state, swarmId);
  const angle = getPhotonLayerAngleRadians(state, swarmId, layerId, timeSeconds, chargeType);
  const angularVelocity = directionSign * TWO_PI * layer.frequencyHz;
  const radius = layer.radius;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const centerX = getPhotonSwarmCenterX(state, swarmId);
  return {
    swarmId,
    layerId,
    chargeType,
    chargeSign: PHOTON_CHARGE_SIGN[chargeType] ?? 0,
    angle,
    angularVelocity,
    radius,
    position: {
      x: centerX,
      y: radius * cos,
      z: radius * sin,
    },
    velocity: {
      x: 0,
      y: -radius * angularVelocity * sin,
      z: radius * angularVelocity * cos,
    },
    acceleration: {
      x: 0,
      y: -radius * angularVelocity * angularVelocity * cos,
      z: -radius * angularVelocity * angularVelocity * sin,
    },
  };
}

function solvePhotonDelayedEmission(state, sourceRef, observationTime, testPoint, emissionSpeedCf) {
  let emissionTime = observationTime;
  let kinematics = getPhotonArchitrinoKinematics(
    state,
    sourceRef.swarmId,
    sourceRef.layerId,
    sourceRef.chargeType,
    emissionTime
  );
  let delta = subtractVector(testPoint, kinematics.position);
  let delay = vectorMagnitude(delta) / emissionSpeedCf;
  let delaySolveGap = Number.POSITIVE_INFINITY;
  let solveIterations = 0;

  for (let index = 0; index < MAX_DELAY_SOLVE_STEPS; index += 1) {
    emissionTime = observationTime - delay;
    kinematics = getPhotonArchitrinoKinematics(
      state,
      sourceRef.swarmId,
      sourceRef.layerId,
      sourceRef.chargeType,
      emissionTime
    );
    delta = subtractVector(testPoint, kinematics.position);
    delay = Math.max(MIN_FIELD_DISTANCE, vectorMagnitude(delta)) / emissionSpeedCf;
    delaySolveGap = Math.abs((observationTime - emissionTime) - delay);
    solveIterations = index + 1;
    if (delaySolveGap <= DELAY_SOLVE_TOLERANCE) {
      break;
    }
  }

  const { distance, direction } = safeDirectionVector(delta);
  const sourceSpeedRatio = vectorMagnitude(kinematics.velocity) / Math.max(EPSILON, emissionSpeedCf);
  return {
    emissionTime,
    delay,
    delaySolveGap,
    solveIterations,
    distance,
    direction,
    kinematics,
    sourceSpeedRatio,
  };
}

function computePhotonDelayedContribution(state, sourceRef, observationTime, measurement) {
  const delayed = solvePhotonDelayedEmission(
    state,
    sourceRef,
    observationTime,
    measurement.testPoint,
    measurement.emissionSpeedCf
  );
  const n = delayed.direction;
  const acceleration = delayed.kinematics.acceleration;
  const charge = delayed.kinematics.chargeSign;
  const nDotA = dotVector(n, acceleration);
  const radiationVector = subtractVector(scaleVector(n, nDotA), acceleration);
  const nearVector = scaleVector(n, measurement.nearFieldWeight / (delayed.distance * delayed.distance));
  const electric = scaleVector(
    addVector(scaleVector(radiationVector, 1 / delayed.distance), nearVector),
    charge * measurement.fieldGain
  );
  const comparisonB = scaleVector(crossVector(n, electric), 1 / measurement.emissionSpeedCf);

  return {
    ...delayed,
    electric,
    comparisonB,
  };
}

export function buildPhotonArchitrinoSourceRefs(state = null) {
  return ["left", "right"].flatMap((swarmId) =>
    PHOTON_LAYER_ORDER.flatMap((layerId) => {
      if (state && !getPhotonLayerEnabled(state, swarmId, layerId)) {
        return [];
      }
      return PHOTON_CHARGE_TYPES.map((chargeType) => ({ swarmId, layerId, chargeType }));
    })
  );
}

export function computePhotonDelayedEmissionField(state, observationTime) {
  const measurement = resolvePhotonMeasurementParameters(state);
  const sourceRefs = buildPhotonArchitrinoSourceRefs(state);
  const contributions = sourceRefs.map((sourceRef) =>
    computePhotonDelayedContribution(state, sourceRef, observationTime, measurement)
  );
  const electric = contributions.reduce(
    (sum, contribution) => addVector(sum, contribution.electric),
    { x: 0, y: 0, z: 0 }
  );
  const comparisonB = contributions.reduce(
    (sum, contribution) => addVector(sum, contribution.comparisonB),
    { x: 0, y: 0, z: 0 }
  );
  const delaySum = contributions.reduce((sum, contribution) => sum + contribution.delay, 0);
  const distanceMin = contributions.reduce(
    (minimum, contribution) => Math.min(minimum, contribution.distance),
    Number.POSITIVE_INFINITY
  );
  const delaySolveGapMax = contributions.reduce(
    (maximum, contribution) => Math.max(maximum, contribution.delaySolveGap),
    0
  );
  const maxSourceSpeedRatio = contributions.reduce(
    (maximum, contribution) => Math.max(maximum, contribution.sourceSpeedRatio),
    0
  );
  const unstableSourceCount = contributions.filter(
    (contribution) => contribution.sourceSpeedRatio > 1 || contribution.delaySolveGap > 0.05
  ).length;

  return {
    sourceMode: "delayed_architrino_emissions",
    measurement,
    contributions,
    sourceCount: contributions.length,
    averageDelay: contributions.length > 0 ? delaySum / contributions.length : 0,
    delaySolveGapMax,
    maxSourceSpeedRatio,
    unstableSourceCount,
    nearestSourceDistance: Number.isFinite(distanceMin) ? distanceMin : 0,
    electric,
    comparisonB,
  };
}

export function computePhotonObserverField(state, timeSeconds) {
  const referenceFrequency = getPhotonReferenceFrequency(state);
  const phase = TWO_PI * referenceFrequency * timeSeconds;
  const polarization = resolvePhotonPolarizationParameters(state);
  const delayedField = computePhotonDelayedEmissionField(state, timeSeconds);
  const ey = delayedField.electric.y;
  const ez = delayedField.electric.z;
  const by = delayedField.comparisonB.y;
  const bz = delayedField.comparisonB.z;
  const analyzerAngle = degreesToPhotonRadians(state?.polarization?.analyzerAngleDeg ?? 0);
  const analyzerY = Math.cos(analyzerAngle);
  const analyzerZ = Math.sin(analyzerAngle);
  const projection = ey * analyzerY + ez * analyzerZ;
  const fieldNormSquared = ey * ey + ez * ez;
  const passMeasure = projection * projection / (fieldNormSquared + EPSILON);
  return {
    timeSeconds,
    referenceFrequency,
    phase,
    polarization,
    sourceMode: delayedField.sourceMode,
    measurement: delayedField.measurement,
    sourceCount: delayedField.sourceCount,
    averageDelay: delayedField.averageDelay,
    delaySolveGapMax: delayedField.delaySolveGapMax,
    maxSourceSpeedRatio: delayedField.maxSourceSpeedRatio,
    unstableSourceCount: delayedField.unstableSourceCount,
    nearestSourceDistance: delayedField.nearestSourceDistance,
    contributions: delayedField.contributions,
    electric: { y: ey, z: ez, magnitude: Math.sqrt(fieldNormSquared) },
    comparisonB: { y: by, z: bz, magnitude: Math.sqrt(by * by + bz * bz) },
    analyzer: {
      angle: analyzerAngle,
      y: analyzerY,
      z: analyzerZ,
      projection,
      passMeasure,
    },
  };
}

export function computePhotonStokes(state) {
  const polarization = resolvePhotonPolarizationParameters(state);
  const amplitude = Math.sqrt(polarization.intensity);
  const eyAmplitude = amplitude * Math.cos(polarization.alpha);
  const ezAmplitude = amplitude * Math.sin(polarization.alpha);
  const s0 = eyAmplitude * eyAmplitude + ezAmplitude * ezAmplitude;
  const s1 = eyAmplitude * eyAmplitude - ezAmplitude * ezAmplitude;
  const s2 = 2 * eyAmplitude * ezAmplitude * Math.cos(polarization.phaseLag);
  const s3 = -2 * eyAmplitude * ezAmplitude * Math.sin(polarization.phaseLag);
  return { s0, s1, s2, s3 };
}

export function computePhotonPolarizationAnalyzerPassTarget(state) {
  const polarization = resolvePhotonPolarizationParameters(state);
  const amplitude = Math.sqrt(polarization.intensity);
  const eyAmplitude = amplitude * Math.cos(polarization.alpha);
  const ezAmplitude = amplitude * Math.sin(polarization.alpha);
  const analyzerAngle = degreesToPhotonRadians(state?.polarization?.analyzerAngleDeg ?? 0);
  const analyzerY = Math.cos(analyzerAngle);
  const analyzerZ = Math.sin(analyzerAngle);
  const numerator =
    analyzerY * analyzerY * eyAmplitude * eyAmplitude +
    analyzerZ * analyzerZ * ezAmplitude * ezAmplitude +
    2 *
      analyzerY *
      analyzerZ *
      eyAmplitude *
      ezAmplitude *
      Math.cos(polarization.phaseLag);
  const denominator = eyAmplitude * eyAmplitude + ezAmplitude * ezAmplitude + EPSILON;
  return numerator / denominator;
}

export function computePhotonAverageAnalyzerPass(state, sampleCount = DEFAULT_ANALYZER_AVERAGE_SAMPLES) {
  const runDuration = getPhotonRunDuration(state);
  const count = Math.max(8, Math.round(sampleCount));
  let passSum = 0;
  for (let index = 0; index < count; index += 1) {
    const t = (index / count) * runDuration;
    passSum += computePhotonObserverField(state, t).analyzer.passMeasure;
  }
  return passSum / count;
}

export function computePhotonMalusTarget(state) {
  const polarization = resolvePhotonPolarizationParameters(state);
  const analyzerAngle = degreesToPhotonRadians(state?.polarization?.analyzerAngleDeg ?? 0);
  if (polarization.basis !== "linear") {
    return computePhotonPolarizationAnalyzerPassTarget(state);
  }
  const delta = analyzerAngle - polarization.alpha;
  return Math.cos(delta) ** 2;
}

export function computePhotonFormulaSummary(state, timeSeconds) {
  const wrappedTime = wrapPhotonTime(state, timeSeconds);
  const field = computePhotonObserverField(state, wrappedTime);
  const stokes = computePhotonStokes(state);
  const averagePass = computePhotonAverageAnalyzerPass(state);
  const malusTarget = computePhotonMalusTarget(state);
  return {
    wrappedTime,
    runDuration: getPhotonRunDuration(state),
    middleCycle: getPhotonMiddleCycleBounds(state),
    field,
    stokes,
    averagePass,
    malusTarget,
    malusResidual: averagePass - malusTarget,
  };
}

export function buildPhotonPlotSamples(state, timeSeconds, sampleCount = 360) {
  const runDuration = getPhotonRunDuration(state);
  const currentTime = wrapPhotonTime(state, timeSeconds);
  const samples = [];
  let amplitudeScale = 1;
  for (let index = 0; index <= sampleCount; index += 1) {
    const t = (index / sampleCount) * runDuration;
    const field = computePhotonObserverField(state, t);
    amplitudeScale = Math.max(
      amplitudeScale,
      Math.abs(field.electric.y),
      Math.abs(field.electric.z)
    );
    samples.push({
      t,
      progress: runDuration > 0 ? t / runDuration : 0,
      active: t <= currentTime,
      ey: field.electric.y,
      ez: field.electric.z,
      passMeasure: field.analyzer.passMeasure,
    });
  }
  return {
    runDuration,
    currentTime,
    middleCycle: getPhotonMiddleCycleBounds(state),
    amplitudeScale,
    samples,
  };
}

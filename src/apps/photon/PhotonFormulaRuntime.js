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
const ROOT_SCAN_MIN_STEPS = 48;
const ROOT_SCAN_MAX_STEPS = 720;
const ROOT_SCAN_STEPS_PER_CYCLE = 40;
const ROOT_BISECTION_STEPS = 32;
const ROOT_RESIDUAL_TOLERANCE = 1e-5;
const ROOT_DEDUP_DELAY_TOLERANCE = 1e-4;
const JACOBIAN_FLOOR = 1e-4;
const DEFAULT_ANALYZER_AVERAGE_SAMPLES = 48;
const DEFAULT_POLARIZATION_FIT_SAMPLES = 144;
const POLARIZATION_LINEAR_S3_TOLERANCE = 0.12;
const POLARIZATION_CIRCULAR_S3_MIN = 0.82;
const POLARIZATION_CIRCULAR_TRANSVERSE_TOLERANCE = 0.35;
const POLARIZATION_SINGLE_AXIS_RATIO = 0.08;
const X_HAT = Object.freeze({ x: 1, y: 0, z: 0 });
const PHOTON_CHARGE_TYPES = Object.freeze(["positrino", "electrino"]);
const PHOTON_CHARGE_SIGN = Object.freeze({
  positrino: 1,
  electrino: -1,
});

export function degreesToPhotonRadians(degrees) {
  return (Number(degrees) || 0) * Math.PI / 180;
}

function radiansToPhotonDegrees(radians) {
  return (Number(radians) || 0) * 180 / Math.PI;
}

function wrapPhotonSignedRadians(radians) {
  const number = Number(radians) || 0;
  return ((((number + Math.PI) % TWO_PI) + TWO_PI) % TWO_PI) - Math.PI;
}

function formatPhotonPolarizationClassification(classification, stokes = {}, phaseLagDefined = true) {
  if (classification === "right_circular") {
    return "Right circular";
  }
  if (classification === "left_circular") {
    return "Left circular";
  }
  if (classification === "elliptical") {
    return "Elliptical";
  }
  if (classification === "weak") {
    return "Weak field";
  }
  if (!phaseLagDefined) {
    return "Linear";
  }
  const s2 = Number(stokes.s2) || 0;
  return s2 < 0 ? "Linear anti-phase" : "Linear";
}

export function resolvePhotonMeasurementParameters(state) {
  return {
    virtualObserver: {
      x: Number(state?.measurement?.virtualObserver?.x ?? 0) || 0,
      y: Number(state?.measurement?.virtualObserver?.y ?? 0) || 0,
      z: Number(state?.measurement?.virtualObserver?.z ?? 0) || 0,
    },
    emissionSpeedCf: 1,
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

function getPhotonCausalRootResidual(state, sourceRef, observationTime, delay, measurement) {
  const emissionTime = observationTime - delay;
  const kinematics = getPhotonArchitrinoKinematics(
    state,
    sourceRef.swarmId,
    sourceRef.layerId,
    sourceRef.chargeType,
    emissionTime
  );
  const delta = subtractVector(measurement.virtualObserver, kinematics.position);
  const { distance, direction } = safeDirectionVector(delta);
  return {
    emissionTime,
    delay,
    residual: distance - measurement.emissionSpeedCf * delay,
    distance,
    direction,
    kinematics,
  };
}

function getPhotonSourceMaxDelay(state, sourceRef, measurement) {
  const layer = getPhotonLayer(state, sourceRef.swarmId, sourceRef.layerId);
  const centerX = getPhotonSwarmCenterX(state, sourceRef.swarmId);
  const observer = measurement.virtualObserver;
  const dx = observer.x - centerX;
  const transverseObserverRadius = Math.hypot(observer.y, observer.z);
  const maxTransverseDistance = transverseObserverRadius + Math.max(0, Number(layer.radius) || 0);
  const maxDistance = Math.max(
    MIN_FIELD_DISTANCE,
    Math.hypot(dx, maxTransverseDistance)
  );
  return (maxDistance + MIN_FIELD_DISTANCE) / measurement.emissionSpeedCf;
}

function pushPhotonRoot(roots, root) {
  const duplicate = roots.some((existingRoot) =>
    Math.abs(existingRoot.delay - root.delay) <= ROOT_DEDUP_DELAY_TOLERANCE
  );
  if (!duplicate) {
    roots.push(root);
  }
}

function refinePhotonRootDelay(state, sourceRef, observationTime, measurement, lowDelay, highDelay) {
  let low = getPhotonCausalRootResidual(state, sourceRef, observationTime, lowDelay, measurement);
  let high = getPhotonCausalRootResidual(state, sourceRef, observationTime, highDelay, measurement);
  for (let index = 0; index < ROOT_BISECTION_STEPS; index += 1) {
    const midDelay = (low.delay + high.delay) / 2;
    const mid = getPhotonCausalRootResidual(state, sourceRef, observationTime, midDelay, measurement);
    if (Math.abs(mid.residual) <= ROOT_RESIDUAL_TOLERANCE) {
      return { ...mid, solveIterations: index + 1 };
    }
    if (Math.sign(low.residual) === Math.sign(mid.residual)) {
      low = mid;
    } else {
      high = mid;
    }
  }
  const result = Math.abs(low.residual) < Math.abs(high.residual) ? low : high;
  return { ...result, solveIterations: ROOT_BISECTION_STEPS };
}

export function solvePhotonCausalRoots(state, sourceRef, observationTime, measurement = resolvePhotonMeasurementParameters(state)) {
  const layer = getPhotonLayer(state, sourceRef.swarmId, sourceRef.layerId);
  const maxDelay = getPhotonSourceMaxDelay(state, sourceRef, measurement);
  const frequency = Math.max(0, Math.abs(Number(layer.frequencyHz) || 0));
  const scanSteps = Math.min(
    ROOT_SCAN_MAX_STEPS,
    Math.max(ROOT_SCAN_MIN_STEPS, Math.ceil(maxDelay * frequency * ROOT_SCAN_STEPS_PER_CYCLE))
  );
  const roots = [];
  let previous = getPhotonCausalRootResidual(state, sourceRef, observationTime, 0, measurement);
  if (Math.abs(previous.residual) <= ROOT_RESIDUAL_TOLERANCE) {
    pushPhotonRoot(roots, { ...previous, solveIterations: 0 });
  }

  for (let index = 1; index <= scanSteps; index += 1) {
    const delay = (maxDelay * index) / scanSteps;
    const current = getPhotonCausalRootResidual(state, sourceRef, observationTime, delay, measurement);
    if (Math.abs(current.residual) <= ROOT_RESIDUAL_TOLERANCE) {
      pushPhotonRoot(roots, { ...current, solveIterations: 0 });
    }
    if (Math.sign(previous.residual) !== Math.sign(current.residual)) {
      pushPhotonRoot(
        roots,
        refinePhotonRootDelay(
          state,
          sourceRef,
          observationTime,
          measurement,
          previous.delay,
          current.delay
        )
      );
    }
    previous = current;
  }

  return roots.sort((a, b) => a.delay - b.delay);
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

function computePhotonDelayedContribution(root, measurement) {
  const n = root.direction;
  const sourceRadialSpeed = dotVector(root.kinematics.velocity, n);
  const jacobian = 1 - sourceRadialSpeed / Math.max(EPSILON, measurement.emissionSpeedCf);
  const jacobianAbs = Math.abs(jacobian);
  const jacobianWeight = 1 / Math.max(JACOBIAN_FLOOR, jacobianAbs);
  const sourceSpeedRatio = vectorMagnitude(root.kinematics.velocity) / Math.max(EPSILON, measurement.emissionSpeedCf);
  const receiverAcceleration = scaleVector(
    n,
    root.kinematics.chargeSign * jacobianWeight / (root.distance * root.distance)
  );
  const electric = receiverAcceleration;
  const comparisonB = scaleVector(crossVector(X_HAT, electric), 1 / measurement.emissionSpeedCf);

  return {
    ...root,
    delaySolveGap: Math.abs(root.residual),
    jacobian,
    jacobianAbs,
    jacobianWeight,
    sourceRadialSpeed,
    sourceSpeedRatio,
    receiverAcceleration,
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
  const rootSets = sourceRefs.map((sourceRef) => ({
    sourceRef,
    roots: solvePhotonCausalRoots(state, sourceRef, observationTime, measurement),
  }));
  const contributions = rootSets.flatMap(({ roots }) =>
    roots.map((root) => computePhotonDelayedContribution(root, measurement))
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
  const jacobianAbsMin = contributions.reduce(
    (minimum, contribution) => Math.min(minimum, contribution.jacobianAbs),
    Number.POSITIVE_INFINITY
  );
  const unresolvedSourceCount = rootSets.filter((rootSet) => rootSet.roots.length === 0).length;
  const unstableSourceCount = contributions.filter(
    (contribution) =>
      contribution.delaySolveGap > 0.05 ||
      contribution.jacobianAbs <= JACOBIAN_FLOOR
  ).length;

  return {
    sourceMode: "virtual_observer_branch_sum",
    measurement,
    contributions,
    sourceCount: sourceRefs.length,
    rootCount: contributions.length,
    averageDelay: contributions.length > 0 ? delaySum / contributions.length : 0,
    delaySolveGapMax,
    maxSourceSpeedRatio,
    jacobianAbsMin: Number.isFinite(jacobianAbsMin) ? jacobianAbsMin : 0,
    unresolvedSourceCount,
    unstableSourceCount,
    nearestSourceDistance: Number.isFinite(distanceMin) ? distanceMin : 0,
    electric,
    comparisonB,
  };
}

export function computePhotonObserverField(state, timeSeconds) {
  const referenceFrequency = getPhotonReferenceFrequency(state);
  const phase = TWO_PI * referenceFrequency * timeSeconds;
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
  const analyzerFraction = projection * projection / (fieldNormSquared + EPSILON);
  return {
    timeSeconds,
    referenceFrequency,
    phase,
    sourceMode: delayedField.sourceMode,
    measurement: delayedField.measurement,
    sourceCount: delayedField.sourceCount,
    rootCount: delayedField.rootCount,
    averageDelay: delayedField.averageDelay,
    delaySolveGapMax: delayedField.delaySolveGapMax,
    maxSourceSpeedRatio: delayedField.maxSourceSpeedRatio,
    jacobianAbsMin: delayedField.jacobianAbsMin,
    unresolvedSourceCount: delayedField.unresolvedSourceCount,
    unstableSourceCount: delayedField.unstableSourceCount,
    nearestSourceDistance: delayedField.nearestSourceDistance,
    contributions: delayedField.contributions,
    receiverAcceleration: delayedField.electric,
    electric: { y: ey, z: ez, magnitude: Math.sqrt(fieldNormSquared) },
    comparisonB: { y: by, z: bz, magnitude: Math.sqrt(by * by + bz * bz) },
    analyzer: {
      angle: analyzerAngle,
      y: analyzerY,
      z: analyzerZ,
      projection,
      fraction: analyzerFraction,
    },
  };
}

function fitPhotonSignalComponent(samples, key) {
  const count = samples.length;
  if (count === 0) {
    return {
      dc: 0,
      cosCoefficient: 0,
      sinCoefficient: 0,
      amplitude: 0,
      phase: 0,
    };
  }
  const dc = samples.reduce((sum, sample) => sum + (Number(sample[key]) || 0), 0) / count;
  let cosCoefficient = 0;
  let sinCoefficient = 0;
  samples.forEach((sample) => {
    const phase = Number.isFinite(sample.phase)
      ? sample.phase
      : TWO_PI * (Number(sample.progress) || 0);
    const value = (Number(sample[key]) || 0) - dc;
    cosCoefficient += value * Math.cos(phase);
    sinCoefficient += value * Math.sin(phase);
  });
  cosCoefficient *= 2 / count;
  sinCoefficient *= 2 / count;
  return {
    dc,
    cosCoefficient,
    sinCoefficient,
    amplitude: Math.hypot(cosCoefficient, sinCoefficient),
    phase: Math.atan2(-sinCoefficient, cosCoefficient),
  };
}

function evaluatePhotonFittedComponent(component, phase) {
  return (
    component.dc +
    component.cosCoefficient * Math.cos(phase) +
    component.sinCoefficient * Math.sin(phase)
  );
}

function computePhotonPolarizationFitResidual(samples, yFit, zFit) {
  const safeSamples = Array.isArray(samples) ? samples : [];
  if (safeSamples.length === 0) {
    return 0;
  }
  const totals = safeSamples.reduce(
    (sum, sample) => {
      const phase = Number.isFinite(sample.phase)
        ? sample.phase
        : TWO_PI * (Number(sample.progress) || 0);
      const rawY = Number(sample.ey) || 0;
      const rawZ = Number(sample.ez) || 0;
      const fittedY = evaluatePhotonFittedComponent(yFit, phase);
      const fittedZ = evaluatePhotonFittedComponent(zFit, phase);
      const errorY = rawY - fittedY;
      const errorZ = rawZ - fittedZ;
      return {
        errorPower: sum.errorPower + errorY * errorY + errorZ * errorZ,
        signalPower: sum.signalPower + rawY * rawY + rawZ * rawZ,
      };
    },
    { errorPower: 0, signalPower: 0 }
  );
  return Math.sqrt(totals.errorPower / Math.max(EPSILON, totals.signalPower));
}

function classifyPhotonPolarization(stokes, normalizedStokes, amplitudeY, amplitudeZ) {
  const maxAmplitude = Math.max(amplitudeY, amplitudeZ);
  if (stokes.s0 <= EPSILON || maxAmplitude <= EPSILON) {
    return "weak";
  }
  const minAmplitude = Math.min(amplitudeY, amplitudeZ);
  const axisRatio = minAmplitude / Math.max(EPSILON, maxAmplitude);
  if (axisRatio <= POLARIZATION_SINGLE_AXIS_RATIO) {
    return "linear";
  }
  if (
    Math.abs(normalizedStokes.s3) >= POLARIZATION_CIRCULAR_S3_MIN &&
    Math.abs(normalizedStokes.s1) <= POLARIZATION_CIRCULAR_TRANSVERSE_TOLERANCE &&
    Math.abs(normalizedStokes.s2) <= POLARIZATION_CIRCULAR_TRANSVERSE_TOLERANCE
  ) {
    return normalizedStokes.s3 >= 0 ? "right_circular" : "left_circular";
  }
  if (Math.abs(normalizedStokes.s3) <= POLARIZATION_LINEAR_S3_TOLERANCE) {
    return "linear";
  }
  return "elliptical";
}

function clampPhotonUnitInterval(value) {
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Math.max(0, Math.min(1, value));
}

export function fitPhotonPolarizationFromSamples(samples, analyzerAngleRadians = 0) {
  const safeSamples = Array.isArray(samples) ? samples : [];
  const yFit = fitPhotonSignalComponent(safeSamples, "ey");
  const zFit = fitPhotonSignalComponent(safeSamples, "ez");
  const fitResidual = computePhotonPolarizationFitResidual(safeSamples, yFit, zFit);
  const amplitudeY = yFit.amplitude;
  const amplitudeZ = zFit.amplitude;
  const phaseLag = wrapPhotonSignedRadians(zFit.phase - yFit.phase);
  const s0 = amplitudeY * amplitudeY + amplitudeZ * amplitudeZ;
  const s1 = amplitudeY * amplitudeY - amplitudeZ * amplitudeZ;
  const s2 = 2 * amplitudeY * amplitudeZ * Math.cos(phaseLag);
  const s3 = -2 * amplitudeY * amplitudeZ * Math.sin(phaseLag);
  const normalizer = Math.max(EPSILON, s0);
  const maxAmplitude = Math.max(amplitudeY, amplitudeZ);
  const minAmplitude = Math.min(amplitudeY, amplitudeZ);
  const axisRatio = minAmplitude / Math.max(EPSILON, maxAmplitude);
  const phaseLagDefined = s0 > EPSILON && maxAmplitude > EPSILON && axisRatio > POLARIZATION_SINGLE_AXIS_RATIO;
  const stokes = { s0, s1, s2, s3 };
  const normalizedStokes = {
    s1: s1 / normalizer,
    s2: s2 / normalizer,
    s3: s3 / normalizer,
  };
  const classification = classifyPhotonPolarization(
    stokes,
    normalizedStokes,
    amplitudeY,
    amplitudeZ
  );
  const analyzerAngle = Number(analyzerAngleRadians) || 0;
  const analyzerY = Math.cos(analyzerAngle);
  const analyzerZ = Math.sin(analyzerAngle);
  const analyzerNumerator =
    analyzerY * analyzerY * amplitudeY * amplitudeY +
    analyzerZ * analyzerZ * amplitudeZ * amplitudeZ +
    2 * analyzerY * analyzerZ * amplitudeY * amplitudeZ * Math.cos(phaseLag);
  const analyzerFractionTarget = clampPhotonUnitInterval(analyzerNumerator / normalizer);
  const orientationAngle = 0.5 * Math.atan2(s2, s1);

  return {
    components: {
      y: yFit,
      z: zFit,
    },
    amplitudes: {
      y: amplitudeY,
      z: amplitudeZ,
      relative: amplitudeZ / Math.max(EPSILON, amplitudeY),
    },
    phaseLag,
    phaseLagDeg: radiansToPhotonDegrees(phaseLag),
    orientationAngle,
    orientationAngleDeg: ((radiansToPhotonDegrees(orientationAngle) % 180) + 180) % 180,
    ellipticity: s3 / normalizer,
    fitResidual,
    phaseLagDefined,
    stokes,
    normalizedStokes,
    classification,
    classificationLabel: formatPhotonPolarizationClassification(
      classification,
      normalizedStokes,
      phaseLagDefined
    ),
    analyzer: {
      angle: analyzerAngle,
      y: analyzerY,
      z: analyzerZ,
    },
    analyzerFractionTarget,
  };
}

export function buildPhotonDerivedPolarizationTrace(
  state,
  timeSeconds,
  sampleCount = DEFAULT_POLARIZATION_FIT_SAMPLES
) {
  const referenceFrequency = getPhotonReferenceFrequency(state);
  const cycleDuration = 1 / referenceFrequency;
  const currentTime = Number.isFinite(timeSeconds) ? timeSeconds : 0;
  const fitCycleStart = getPhotonMiddleCycleBounds(state).start;
  const currentProgress =
    ((((currentTime - fitCycleStart) / cycleDuration) % 1) + 1) % 1;
  const currentPhase = TWO_PI * currentProgress;
  const count = Math.max(24, Math.round(sampleCount));
  const rawSamples = [];

  for (let index = 0; index < count; index += 1) {
    const progress = index / count;
    const phase = TWO_PI * progress;
    const t = fitCycleStart + progress * cycleDuration;
    const field = computePhotonObserverField(state, t);
    rawSamples.push({
      t,
      progress,
      phase,
      ey: field.electric.y,
      ez: field.electric.z,
    });
  }

  const analyzerAngle = degreesToPhotonRadians(state?.polarization?.analyzerAngleDeg ?? 0);
  const fit = fitPhotonPolarizationFromSamples(rawSamples, analyzerAngle);
  const samples = [];
  for (let index = 0; index <= count; index += 1) {
    const progress = index / count;
    const phase = TWO_PI * progress;
    samples.push({
      progress,
      phase,
      ey: evaluatePhotonFittedComponent(fit.components.y, phase),
      ez: evaluatePhotonFittedComponent(fit.components.z, phase),
    });
  }

  const currentField = computePhotonObserverField(state, currentTime);
  const rawCurrent = {
    ey: currentField.electric.y,
    ez: currentField.electric.z,
  };
  const fittedCurrent = {
    progress: currentProgress,
    phase: currentPhase,
    ey: evaluatePhotonFittedComponent(fit.components.y, currentPhase),
    ez: evaluatePhotonFittedComponent(fit.components.z, currentPhase),
  };
  const current = fittedCurrent;
  const projection = current.ey * fit.analyzer.y + current.ez * fit.analyzer.z;
  const scale = Math.max(
    1e-9,
    ...samples.flatMap((sample) => [Math.abs(sample.ey), Math.abs(sample.ez)]),
    ...rawSamples.flatMap((sample) => [Math.abs(sample.ey), Math.abs(sample.ez)])
  );

  return {
    ...fit,
    referenceFrequency,
    cycleDuration,
    fitCycleStart,
    rawSamples,
    rawCurrent,
    samples,
    currentProgress,
    currentPhase,
    current,
    fittedCurrent,
    projection,
    scale,
  };
}

export function computePhotonAverageAnalyzerFraction(
  state,
  sampleCount = DEFAULT_ANALYZER_AVERAGE_SAMPLES
) {
  const runDuration = getPhotonRunDuration(state);
  const count = Math.max(8, Math.round(sampleCount));
  let fractionSum = 0;
  for (let index = 0; index < count; index += 1) {
    const t = (index / count) * runDuration;
    fractionSum += computePhotonObserverField(state, t).analyzer.fraction;
  }
  return fractionSum / count;
}

export function computePhotonFormulaSummary(state, timeSeconds) {
  const wrappedTime = wrapPhotonTime(state, timeSeconds);
  const field = computePhotonObserverField(state, wrappedTime);
  const polarization = buildPhotonDerivedPolarizationTrace(state, wrappedTime);
  const stokes = polarization.stokes;
  const averageAnalyzerFraction = computePhotonAverageAnalyzerFraction(state);
  const analyzerTarget = polarization.analyzerFractionTarget;
  const analyzerResidual = averageAnalyzerFraction - analyzerTarget;
  return {
    wrappedTime,
    runDuration: getPhotonRunDuration(state),
    middleCycle: getPhotonMiddleCycleBounds(state),
    field,
    polarization,
    stokes,
    averageAnalyzerFraction,
    analyzerTarget,
    analyzerResidual,
    fitResidual: polarization.fitResidual,
  };
}

export function buildPhotonPlotSamples(state, timeSeconds, sampleCount = 360) {
  const runDuration = getPhotonRunDuration(state);
  const currentTime = wrapPhotonTime(state, timeSeconds);
  const samples = [];
  let amplitudeScale = 0;
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
      ey: field.electric.y,
      ez: field.electric.z,
      analyzerFraction: field.analyzer.fraction,
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

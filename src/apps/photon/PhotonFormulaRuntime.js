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
const X_HAT = Object.freeze({ x: 1, y: 0, z: 0 });
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
    virtualObserver: {
      x: Number(state?.measurement?.virtualObserver?.x ?? 0) || 0,
      y: Number(state?.measurement?.virtualObserver?.y ?? 0) || 0,
      z: Number(state?.measurement?.virtualObserver?.z ?? 0) || 0,
    },
    emissionSpeedCf: 1,
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
    root.kinematics.chargeSign * measurement.fieldGain * jacobianWeight / (root.distance * root.distance)
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
      contribution.sourceSpeedRatio > 1 ||
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

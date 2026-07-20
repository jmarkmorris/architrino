const TWO_PI = Math.PI * 2;
const EPSILON = 1e-9;
const STATUS_OK = 0;
const STATUS_SMALL_JACOBIAN = 14;
const STATUS_CAUSAL_FACTOR_DEGENERATE = 25;

function finiteNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function positiveNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function positiveInteger(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? Math.max(1, Math.round(number)) : fallback;
}

function vector(value = {}) {
  return {
    x: finiteNumber(value.x),
    y: finiteNumber(value.y),
    z: finiteNumber(value.z),
  };
}

function add(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
    z: a.z + b.z,
  };
}

function subtract(a, b) {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
    z: a.z - b.z,
  };
}

function scale(a, scalar) {
  return {
    x: a.x * scalar,
    y: a.y * scalar,
    z: a.z * scalar,
  };
}

function dot(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function magnitude(a) {
  return Math.sqrt(dot(a, a));
}

function causalFactorFields({ direction, transmitterVelocity, receiverVelocity, signalSpeed }) {
  const transmitterRadialSpeedAtEmission = dot(transmitterVelocity, direction);
  const receiverRadialSpeedAtReception = dot(receiverVelocity, direction);
  const transmitterFactor = signalSpeed - transmitterRadialSpeedAtEmission;
  const receiverFactor = signalSpeed - receiverRadialSpeedAtReception;
  const receiverCrossingRatio = receiverFactor / signalSpeed;
  const rootPlayback = receiverFactor / transmitterFactor;
  const accelerationWeight = signalSpeed / Math.abs(transmitterFactor);
  let causalFactorStatusCode = STATUS_OK;
  if (
    !Number.isFinite(rootPlayback) ||
    !Number.isFinite(receiverCrossingRatio) ||
    !Number.isFinite(accelerationWeight)
  ) {
    causalFactorStatusCode = STATUS_CAUSAL_FACTOR_DEGENERATE;
  } else if (Math.abs(transmitterFactor) <= EPSILON) {
    causalFactorStatusCode = STATUS_SMALL_JACOBIAN;
  }
  return {
    transmitterRadialSpeedAtEmission,
    receiverRadialSpeedAtReception,
    transmitterFactor,
    receiverFactor,
    receiverCrossingRatio,
    rootPlayback,
    accelerationWeight,
    causalFactorStatusCode,
  };
}

function phaseRecord(rawPhase) {
  const wrapped = ((rawPhase % TWO_PI) + TWO_PI) % TWO_PI;
  return {
    rawRadians: rawPhase,
    radians: wrapped,
    degrees: wrapped * 180 / Math.PI,
    cycleIndex: Math.floor(rawPhase / TWO_PI),
  };
}

export function evaluateMovingCircularTransmitterPhase(transmitter = {}, timeSeconds = 0) {
  const epochTime = finiteNumber(transmitter.epochTime);
  const phaseAtEpoch = finiteNumber(transmitter.phaseAtEpoch);
  const angularVelocity = finiteNumber(transmitter.angularVelocity);
  // Optional constant angular acceleration alpha (default 0 preserves the
  // fixed-omega rigid circle exactly). With alpha != 0 the tangential speed
  // omega(t)*|r| sweeps through the field-speed edge, so a same-transmitter root can
  // realize the pump-driven crossing rather than the reflection-locked m = +1.
  const angularAcceleration = finiteNumber(transmitter.angularAcceleration);
  const dt = finiteNumber(timeSeconds) - epochTime;
  return phaseRecord(
    phaseAtEpoch + angularVelocity * dt + 0.5 * angularAcceleration * dt * dt
  );
}

export function evaluateMovingCircularTransmitterHistory(transmitter = {}, timeSeconds = 0) {
  const time = finiteNumber(timeSeconds);
  const epochTime = finiteNumber(transmitter.epochTime);
  const dt = time - epochTime;
  const centerAtEpoch = vector(transmitter.centerAtEpoch ?? transmitter.center);
  const centerVelocity = vector(transmitter.centerVelocity);
  const radiusU = vector(transmitter.radiusU);
  const radiusV = vector(transmitter.radiusV);
  const angularVelocity = finiteNumber(transmitter.angularVelocity);
  const angularAcceleration = finiteNumber(transmitter.angularAcceleration);
  const phase = evaluateMovingCircularTransmitterPhase(transmitter, time);
  const cos = Math.cos(phase.rawRadians);
  const sin = Math.sin(phase.rawRadians);
  const center = add(centerAtEpoch, scale(centerVelocity, dt));
  const radiusOffset = add(scale(radiusU, cos), scale(radiusV, sin));
  // Instantaneous angular rate omega(t) = omega_0 + alpha * dt; at alpha = 0
  // this is exactly the prior fixed-omega tangential velocity.
  const instantaneousAngularVelocity = angularVelocity + angularAcceleration * dt;
  const tangentialVelocity = add(
    scale(radiusU, -instantaneousAngularVelocity * sin),
    scale(radiusV, instantaneousAngularVelocity * cos)
  );
  return {
    time,
    phase,
    center,
    position: add(center, radiusOffset),
    velocity: add(centerVelocity, tangentialVelocity),
  };
}

export function evaluateLinearHistoryPoint(segment = {}, timeSeconds = 0) {
  const startTime = finiteNumber(segment.startTime);
  const dt = finiteNumber(timeSeconds) - startTime;
  return add(vector(segment.positionAtStart), scale(vector(segment.velocity), dt));
}

function normalizeLinearReceiverHistoryForHit(receiver = {}, hitTime = 0, errorBoundFallback = 0) {
  const safeHitTime = finiteNumber(hitTime);
  const receiverStartTime = finiteNumber(receiver.startTime);
  const receiverEndTime = Number.isFinite(Number(receiver.endTime))
    ? Number(receiver.endTime)
    : safeHitTime;
  const velocity = vector(receiver.velocity);
  const positionAtStart = vector(receiver.positionAtStart);
  if (receiverStartTime <= safeHitTime) {
    return {
      startTime: receiverStartTime,
      endTime: Math.max(receiverEndTime, safeHitTime),
      positionAtStart,
      velocity,
      errorBound: finiteNumber(receiver.errorBound, errorBoundFallback),
    };
  }
  return {
    startTime: safeHitTime,
    endTime: Math.max(receiverEndTime, safeHitTime),
    positionAtStart: add(positionAtStart, scale(velocity, safeHitTime - receiverStartTime)),
    velocity,
    errorBound: finiteNumber(receiver.errorBound, errorBoundFallback),
  };
}

function movingCircularResidual(request, emissionTime) {
  const hitTime = finiteNumber(request.hitTime);
  const signalSpeed = positiveNumber(request.signalSpeed, 1);
  const transmitterSample = evaluateMovingCircularTransmitterHistory(request.transmitter, emissionTime);
  const receiverPoint = evaluateLinearHistoryPoint(request.receiver, hitTime);
  const delta = subtract(receiverPoint, transmitterSample.position);
  const distance = magnitude(delta);
  return {
    residual: distance - signalSpeed * (hitTime - emissionTime),
    transmitterSample,
    receiverPoint,
    delta,
    distance,
  };
}

function movingCircularSameTransmitterResidual(request, emissionTime) {
  const hitTime = finiteNumber(request.hitTime);
  const signalSpeed = positiveNumber(request.signalSpeed, 1);
  const transmitterSample = evaluateMovingCircularTransmitterHistory(request.transmitter, emissionTime);
  const receiverSample = evaluateMovingCircularTransmitterHistory(request.transmitter, hitTime);
  const delta = subtract(receiverSample.position, transmitterSample.position);
  const distance = magnitude(delta);
  return {
    residual: distance - signalSpeed * (hitTime - emissionTime),
    transmitterSample,
    receiverSample,
    receiverPoint: receiverSample.position,
    delta,
    distance,
  };
}

function buildMovingCircularRoot(request, emissionTime, rootId, residualInfo = null, iterations = 0) {
  const hitTime = finiteNumber(request.hitTime);
  const signalSpeed = positiveNumber(request.signalSpeed, 1);
  const info = residualInfo ?? movingCircularResidual(request, emissionTime);
  const safeDistance = Math.max(EPSILON, info.distance);
  const direction = scale(info.delta, 1 / safeDistance);
  const causalFactors = causalFactorFields({
    direction,
    transmitterVelocity: info.transmitterSample.velocity,
    receiverVelocity: vector(request.receiver?.velocity),
    signalSpeed,
  });
  const jacobian = causalFactors.transmitterFactor;
  const accelerationWeight = Number.isFinite(causalFactors.accelerationWeight)
    ? causalFactors.accelerationWeight
    : 0;
  return {
    rootId,
    statusCode: 0,
    emissionTime,
    hitTime,
    delay: Math.max(0, hitTime - emissionTime),
    distance: info.distance,
    residual: info.residual,
    jacobian,
    accelerationWeight,
    ...causalFactors,
    transmitterPoint: info.transmitterSample.position,
    receiverPoint: info.receiverPoint,
    transmitterVelocity: info.transmitterSample.velocity,
    transmitterPhase: info.transmitterSample.phase,
    iterationCount: iterations,
    transmitterHistoryKind: "moving-circular-transmitter",
  };
}

function buildMovingCircularSameTransmitterRoot(request, emissionTime, rootId, residualInfo = null, iterations = 0) {
  const hitTime = finiteNumber(request.hitTime);
  const signalSpeed = positiveNumber(request.signalSpeed, 1);
  const info = residualInfo ?? movingCircularSameTransmitterResidual(request, emissionTime);
  const safeDistance = Math.max(EPSILON, info.distance);
  const direction = scale(info.delta, 1 / safeDistance);
  const causalFactors = causalFactorFields({
    direction,
    transmitterVelocity: info.transmitterSample.velocity,
    receiverVelocity: info.receiverSample.velocity,
    signalSpeed,
  });
  const jacobian = causalFactors.transmitterFactor;
  const accelerationWeight = Number.isFinite(causalFactors.accelerationWeight)
    ? causalFactors.accelerationWeight
    : 0;
  return {
    rootId,
    statusCode: 0,
    rootKind: "same-transmitter",
    emissionTime,
    hitTime,
    delay: Math.max(0, hitTime - emissionTime),
    distance: info.distance,
    residual: info.residual,
    jacobian,
    accelerationWeight,
    ...causalFactors,
    transmitterPoint: info.transmitterSample.position,
    receiverPoint: info.receiverPoint,
    transmitterVelocity: info.transmitterSample.velocity,
    receiverVelocity: info.receiverSample.velocity,
    transmitterPhase: info.transmitterSample.phase,
    receiverPhase: info.receiverSample.phase,
    iterationCount: iterations,
    transmitterHistoryKind: "moving-circular-same-transmitter",
  };
}

function refineMovingCircularRoot(request, lowTime, highTime, lowResidual, highResidual, maxIterations) {
  let low = lowTime;
  let high = highTime;
  let fLow = lowResidual;
  let fHigh = highResidual;
  let bestTime = Math.abs(fLow) <= Math.abs(fHigh) ? low : high;
  let bestInfo = movingCircularResidual(request, bestTime);
  let iterations = 0;

  for (; iterations < maxIterations; iterations += 1) {
    const mid = (low + high) / 2;
    const midInfo = movingCircularResidual(request, mid);
    const fMid = midInfo.residual;
    if (Math.abs(fMid) < Math.abs(bestInfo.residual)) {
      bestTime = mid;
      bestInfo = midInfo;
    }
    if (Math.abs(fMid) <= positiveNumber(request.rootTolerance, 1e-12)) {
      return buildMovingCircularRoot(request, mid, 0, midInfo, iterations + 1);
    }
    if (Math.sign(fLow) === Math.sign(fMid)) {
      low = mid;
      fLow = fMid;
    } else {
      high = mid;
      fHigh = fMid;
    }
  }

  return buildMovingCircularRoot(request, bestTime, 0, bestInfo, iterations);
}

function refineMovingCircularSameTransmitterRoot(request, lowTime, highTime, lowResidual, highResidual, maxIterations) {
  let low = lowTime;
  let high = highTime;
  let fLow = lowResidual;
  let fHigh = highResidual;
  let bestTime = Math.abs(fLow) <= Math.abs(fHigh) ? low : high;
  let bestInfo = movingCircularSameTransmitterResidual(request, bestTime);
  let iterations = 0;

  for (; iterations < maxIterations; iterations += 1) {
    const mid = (low + high) / 2;
    const midInfo = movingCircularSameTransmitterResidual(request, mid);
    const fMid = midInfo.residual;
    if (Math.abs(fMid) < Math.abs(bestInfo.residual)) {
      bestTime = mid;
      bestInfo = midInfo;
    }
    if (Math.abs(fMid) <= positiveNumber(request.rootTolerance, 1e-12)) {
      return buildMovingCircularSameTransmitterRoot(request, mid, 0, midInfo, iterations + 1);
    }
    if (Math.sign(fLow) === Math.sign(fMid)) {
      low = mid;
      fLow = fMid;
    } else {
      high = mid;
      fHigh = fMid;
    }
  }

  return buildMovingCircularSameTransmitterRoot(request, bestTime, 0, bestInfo, iterations);
}

function dedupeRoots(roots, tolerance = 1e-9) {
  const seen = [];
  return roots
    .slice()
    .sort((a, b) => a.emissionTime - b.emissionTime)
    .filter((root) => {
      if (seen.some((time) => Math.abs(time - root.emissionTime) <= tolerance)) {
        return false;
      }
      seen.push(root.emissionTime);
      return true;
    })
    .map((root, index) => ({ ...root, rootId: index }));
}

function createMovingCircularScanSummary({
  start,
  end,
  steps,
  startInfo,
  endInfo,
  minResidual,
  maxResidual,
  minAbsResidual,
  minAbsTime,
  signChangeCount,
  sampledCount,
  rootLimitReached,
}) {
  return {
    transmitterStartTime: start,
    transmitterEndTime: end,
    scanSubdivisions: steps,
    sampledCount,
    startResidual: startInfo?.residual ?? 0,
    endResidual: endInfo?.residual ?? 0,
    minResidual,
    maxResidual,
    minAbsResidual,
    minAbsTime,
    signChangeCount,
    rootLimitReached,
  };
}

function classifyMovingCircularRootScan(scan, tolerance) {
  if (!scan) {
    return {
      code: "no_scan",
      severity: "warning",
      rejectedReason: "no_scan",
      message: "moving circular root scan was not available",
    };
  }
  if (scan.rootLimitReached) {
    return {
      code: "root_limit_reached",
      severity: "warning",
      rejectedReason: "root_limit_reached",
      message: "moving circular root scan reached the maximum retained root count",
    };
  }
  if (Math.abs(scan.minAbsResidual) <= tolerance * 10) {
    return {
      code: "near_miss",
      severity: "warning",
      rejectedReason: "near_miss",
      message: "moving circular root scan found a near miss but no retained root",
    };
  }
  if (scan.minResidual > 0) {
    return {
      code: "no_catch_up_root",
      severity: "warning",
      rejectedReason: "no_catch_up_root",
      message: "transmitter influence did not catch the receiver within the scanned history window",
    };
  }
  if (scan.maxResidual < 0) {
    return {
      code: "stale_history_window",
      severity: "warning",
      rejectedReason: "stale_history_window",
      message: "scanned transmitter history appears older than the arrival window",
    };
  }
  return {
    code: "unisolated_root_candidate",
    severity: "warning",
    rejectedReason: "unisolated_root_candidate",
    message: "moving circular root scan saw a candidate window but did not retain a root",
  };
}

export function createMovingCircularTransmitterRootRequest({
  transmitter,
  receiver,
  hitTime,
  signalSpeed,
  transmitterStartTime,
  transmitterEndTime,
  rootTolerance = 1e-12,
  maxIterations = 96,
  scanSubdivisions = 128,
  maxRoots = 32,
  transmitterRef = undefined,
} = {}) {
  const safeHitTime = finiteNumber(hitTime);
  const safeTransmitterEnd = Number.isFinite(Number(transmitterEndTime))
    ? Math.min(Number(transmitterEndTime), safeHitTime)
    : safeHitTime;
  const safeTransmitterStart = Number.isFinite(Number(transmitterStartTime))
    ? Math.min(Number(transmitterStartTime), safeTransmitterEnd)
    : safeTransmitterEnd - 1;
  const receiverHistory = normalizeLinearReceiverHistoryForHit(receiver, safeHitTime);
  return {
    transmitterRef,
    transmitterHistoryKind: "moving-circular-transmitter",
    transmitter: {
      centerAtEpoch: vector(transmitter?.centerAtEpoch ?? transmitter?.center),
      centerVelocity: vector(transmitter?.centerVelocity),
      radiusU: vector(transmitter?.radiusU),
      radiusV: vector(transmitter?.radiusV),
      angularVelocity: finiteNumber(transmitter?.angularVelocity),
      angularAcceleration: finiteNumber(transmitter?.angularAcceleration),
      phaseAtEpoch: finiteNumber(transmitter?.phaseAtEpoch),
      epochTime: finiteNumber(transmitter?.epochTime),
      errorBound: finiteNumber(transmitter?.errorBound),
    },
    receiver: receiverHistory,
    hitTime: safeHitTime,
    signalSpeed: positiveNumber(signalSpeed, 1),
    transmitterStartTime: safeTransmitterStart,
    transmitterEndTime: safeTransmitterEnd,
    rootTolerance: positiveNumber(rootTolerance, 1e-12),
    maxIterations: positiveInteger(maxIterations, 96),
    scanSubdivisions: positiveInteger(scanSubdivisions, 128),
    maxRoots: positiveInteger(maxRoots, 32),
  };
}

export function solveMovingCircularTransmitterCausalRoots(request = {}) {
  const normalized = createMovingCircularTransmitterRootRequest(request);
  const start = normalized.transmitterStartTime;
  const end = normalized.transmitterEndTime;
  const duration = Math.max(0, end - start);
  if (duration <= EPSILON) {
    return {
      roots: [],
      rejectedReason: "empty_window",
      scan: createMovingCircularScanSummary({
        start,
        end,
        steps: 0,
        startInfo: null,
        endInfo: null,
        minResidual: 0,
        maxResidual: 0,
        minAbsResidual: 0,
        minAbsTime: start,
        signChangeCount: 0,
        sampledCount: 0,
        rootLimitReached: false,
      }),
      status: { code: "empty_window", severity: "warning", message: "moving circular root window is empty" },
    };
  }

  const tolerance = normalized.rootTolerance;
  const steps = normalized.scanSubdivisions;
  const roots = [];
  let priorTime = start;
  let priorInfo = movingCircularResidual(normalized, priorTime);
  let endInfo = priorInfo;
  let minResidual = priorInfo.residual;
  let maxResidual = priorInfo.residual;
  let minAbsResidual = Math.abs(priorInfo.residual);
  let minAbsTime = priorTime;
  let signChangeCount = 0;
  let sampledCount = 1;
  let rootLimitReached = false;

  if (Math.abs(priorInfo.residual) <= tolerance) {
    roots.push(buildMovingCircularRoot(normalized, priorTime, roots.length, priorInfo, 0));
  }

  for (let index = 1; index <= steps; index += 1) {
    const time = start + (duration * index) / steps;
    const info = movingCircularResidual(normalized, time);
    sampledCount += 1;
    endInfo = info;
    const priorResidual = priorInfo.residual;
    const residual = info.residual;
    minResidual = Math.min(minResidual, residual);
    maxResidual = Math.max(maxResidual, residual);
    if (Math.abs(residual) < minAbsResidual) {
      minAbsResidual = Math.abs(residual);
      minAbsTime = time;
    }
    const hasSignChange = Math.sign(priorResidual) !== Math.sign(residual);
    if (hasSignChange) {
      signChangeCount += 1;
    }
    if (roots.length < normalized.maxRoots) {
      if (Math.abs(residual) <= tolerance) {
        roots.push(buildMovingCircularRoot(normalized, time, roots.length, info, 0));
      } else if (hasSignChange) {
        roots.push(refineMovingCircularRoot(
          normalized,
          priorTime,
          time,
          priorResidual,
          residual,
          normalized.maxIterations
        ));
      }
    } else if (Math.abs(residual) <= tolerance || hasSignChange) {
      rootLimitReached = true;
    }
    priorTime = time;
    priorInfo = info;
  }

  const retained = dedupeRoots(roots, Math.max(tolerance * 10, 1e-9)).slice(0, normalized.maxRoots);
  const scan = createMovingCircularScanSummary({
    start,
    end,
    steps,
    startInfo: movingCircularResidual(normalized, start),
    endInfo,
    minResidual,
    maxResidual,
    minAbsResidual,
    minAbsTime,
    signChangeCount,
    sampledCount,
    rootLimitReached: rootLimitReached || roots.length > retained.length,
  });
  const noRootStatus = classifyMovingCircularRootScan(scan, tolerance);
  return {
    roots: retained,
    rejectedReason: retained.length > 0 ? "" : noRootStatus.rejectedReason,
    scan,
    status: {
      code: retained.length > 0 ? (scan.rootLimitReached ? "partial" : "ok") : noRootStatus.code,
      severity: retained.length > 0 ? (scan.rootLimitReached ? "warning" : "ok") : noRootStatus.severity,
      message: retained.length > 0
        ? "moving circular transmitter causal roots solved"
        : noRootStatus.message,
    },
  };
}

export function createMovingCircularSameTransmitterRootRequest({
  transmitter,
  hitTime,
  signalSpeed,
  transmitterStartTime,
  transmitterEndTime,
  rootTolerance = 1e-12,
  minimumDelay = 1e-6,
  maxIterations = 96,
  scanSubdivisions = 128,
  maxRoots = 32,
  transmitterRef = undefined,
} = {}) {
  const safeHitTime = finiteNumber(hitTime);
  const safeMinimumDelay = positiveNumber(minimumDelay, 1e-6);
  const latestEmissionTime = safeHitTime - safeMinimumDelay;
  const safeTransmitterEnd = Number.isFinite(Number(transmitterEndTime))
    ? Math.min(Number(transmitterEndTime), latestEmissionTime)
    : latestEmissionTime;
  const safeTransmitterStart = Number.isFinite(Number(transmitterStartTime))
    ? Math.min(Number(transmitterStartTime), safeTransmitterEnd)
    : safeTransmitterEnd - 1;
  return {
    transmitterRef,
    transmitterHistoryKind: "moving-circular-same-transmitter",
    transmitter: {
      centerAtEpoch: vector(transmitter?.centerAtEpoch ?? transmitter?.center),
      centerVelocity: vector(transmitter?.centerVelocity),
      radiusU: vector(transmitter?.radiusU),
      radiusV: vector(transmitter?.radiusV),
      angularVelocity: finiteNumber(transmitter?.angularVelocity),
      angularAcceleration: finiteNumber(transmitter?.angularAcceleration),
      phaseAtEpoch: finiteNumber(transmitter?.phaseAtEpoch),
      epochTime: finiteNumber(transmitter?.epochTime),
      errorBound: finiteNumber(transmitter?.errorBound),
    },
    hitTime: safeHitTime,
    signalSpeed: positiveNumber(signalSpeed, 1),
    transmitterStartTime: safeTransmitterStart,
    transmitterEndTime: safeTransmitterEnd,
    minimumDelay: safeMinimumDelay,
    rootTolerance: positiveNumber(rootTolerance, 1e-12),
    maxIterations: positiveInteger(maxIterations, 96),
    scanSubdivisions: positiveInteger(scanSubdivisions, 128),
    maxRoots: positiveInteger(maxRoots, 32),
  };
}

export function solveMovingCircularSameTransmitterCausalRoots(request = {}) {
  const normalized = createMovingCircularSameTransmitterRootRequest(request);
  const start = normalized.transmitterStartTime;
  const end = normalized.transmitterEndTime;
  const duration = Math.max(0, end - start);
  if (duration <= EPSILON) {
    return {
      roots: [],
      rejectedReason: "empty_window",
      scan: createMovingCircularScanSummary({
        start,
        end,
        steps: 0,
        startInfo: null,
        endInfo: null,
        minResidual: 0,
        maxResidual: 0,
        minAbsResidual: 0,
        minAbsTime: start,
        signChangeCount: 0,
        sampledCount: 0,
        rootLimitReached: false,
      }),
      status: { code: "empty_window", severity: "warning", message: "moving circular same-transmitter root window is empty" },
    };
  }

  const tolerance = normalized.rootTolerance;
  const steps = normalized.scanSubdivisions;
  const roots = [];
  let priorTime = start;
  let priorInfo = movingCircularSameTransmitterResidual(normalized, priorTime);
  let endInfo = priorInfo;
  let minResidual = priorInfo.residual;
  let maxResidual = priorInfo.residual;
  let minAbsResidual = Math.abs(priorInfo.residual);
  let minAbsTime = priorTime;
  let signChangeCount = 0;
  let sampledCount = 1;
  let rootLimitReached = false;

  if (Math.abs(priorInfo.residual) <= tolerance) {
    roots.push(buildMovingCircularSameTransmitterRoot(normalized, priorTime, roots.length, priorInfo, 0));
  }

  for (let index = 1; index <= steps; index += 1) {
    const time = start + (duration * index) / steps;
    const info = movingCircularSameTransmitterResidual(normalized, time);
    sampledCount += 1;
    endInfo = info;
    const priorResidual = priorInfo.residual;
    const residual = info.residual;
    minResidual = Math.min(minResidual, residual);
    maxResidual = Math.max(maxResidual, residual);
    if (Math.abs(residual) < minAbsResidual) {
      minAbsResidual = Math.abs(residual);
      minAbsTime = time;
    }
    const hasSignChange = Math.sign(priorResidual) !== Math.sign(residual);
    if (hasSignChange) {
      signChangeCount += 1;
    }
    if (roots.length < normalized.maxRoots) {
      if (Math.abs(residual) <= tolerance) {
        roots.push(buildMovingCircularSameTransmitterRoot(normalized, time, roots.length, info, 0));
      } else if (hasSignChange) {
        roots.push(refineMovingCircularSameTransmitterRoot(
          normalized,
          priorTime,
          time,
          priorResidual,
          residual,
          normalized.maxIterations
        ));
      }
    } else if (Math.abs(residual) <= tolerance || hasSignChange) {
      rootLimitReached = true;
    }
    priorTime = time;
    priorInfo = info;
  }

  const retained = dedupeRoots(roots, Math.max(tolerance * 10, 1e-9)).slice(0, normalized.maxRoots);
  const scan = createMovingCircularScanSummary({
    start,
    end,
    steps,
    startInfo: movingCircularSameTransmitterResidual(normalized, start),
    endInfo,
    minResidual,
    maxResidual,
    minAbsResidual,
    minAbsTime,
    signChangeCount,
    sampledCount,
    rootLimitReached: rootLimitReached || roots.length > retained.length,
  });
  const noRootStatus = classifyMovingCircularRootScan(scan, tolerance);
  return {
    roots: retained,
    rejectedReason: retained.length > 0 ? "" : noRootStatus.rejectedReason,
    scan,
    status: {
      code: retained.length > 0 ? (scan.rootLimitReached ? "partial" : "ok") : noRootStatus.code,
      severity: retained.length > 0 ? (scan.rootLimitReached ? "warning" : "ok") : noRootStatus.severity,
      message: retained.length > 0
        ? "moving circular same-transmitter causal roots solved"
        : noRootStatus.message,
    },
  };
}

export function createMovingCircularTransmitterLinearizedRootRequests({
  transmitter,
  receiver,
  hitTime,
  signalSpeed,
  transmitterStartTime,
  transmitterEndTime,
  segmentCount = 24,
  rootTolerance = 1e-12,
  maxIterations = 64,
  scanSubdivisions = 8,
  maxRoots = 4,
  maxHits = 4,
  transmitterErrorBound = 0,
  receiverErrorBound = 0,
  transmitterRef = undefined,
} = {}) {
  const safeHitTime = finiteNumber(hitTime);
  const safeTransmitterEnd = Number.isFinite(Number(transmitterEndTime))
    ? Number(transmitterEndTime)
    : safeHitTime;
  const safeTransmitterStart = Number.isFinite(Number(transmitterStartTime))
    ? Number(transmitterStartTime)
    : safeTransmitterEnd - 1;
  const duration = Math.max(EPSILON, safeTransmitterEnd - safeTransmitterStart);
  const safeSegmentCount = positiveInteger(segmentCount, 24);
  const safeSignalSpeed = positiveNumber(signalSpeed, 1);
  const receiverBase = normalizeLinearReceiverHistoryForHit(
    receiver,
    safeHitTime,
    receiverErrorBound
  );
  const receiverVelocity = receiverBase.velocity;
  const transmitterHistory = {
    kind: "moving-circular-transmitter-linearized",
    transmitterRef,
    transmitter: {
      centerAtEpoch: vector(transmitter?.centerAtEpoch ?? transmitter?.center),
      centerVelocity: vector(transmitter?.centerVelocity),
      radiusU: vector(transmitter?.radiusU),
      radiusV: vector(transmitter?.radiusV),
      angularVelocity: finiteNumber(transmitter?.angularVelocity),
      phaseAtEpoch: finiteNumber(transmitter?.phaseAtEpoch),
      epochTime: finiteNumber(transmitter?.epochTime),
      errorBound: finiteNumber(transmitter?.errorBound, transmitterErrorBound),
    },
    receiver: receiverBase,
    segmentCount: safeSegmentCount,
    approximationPolicy: "linearized-moving-circular-transmitter-segments",
  };

  return Array.from({ length: safeSegmentCount }, (_, index) => {
    const segmentStart = safeTransmitterStart + (duration * index) / safeSegmentCount;
    const segmentEnd = safeTransmitterStart + (duration * (index + 1)) / safeSegmentCount;
    const transmitterSample = evaluateMovingCircularTransmitterHistory(transmitterHistory.transmitter, segmentStart);
    const receiverStart = Math.min(segmentStart, safeHitTime);
    const receiverPoint = evaluateLinearHistoryPoint(receiverBase, receiverStart);
    return {
      transmitterRef,
      segmentIndex: index,
      transmitterHistory,
      transmitter: {
        startTime: segmentStart,
        endTime: segmentEnd,
        positionAtStart: transmitterSample.position,
        velocity: transmitterSample.velocity,
        errorBound: finiteNumber(transmitter?.errorBound, transmitterErrorBound),
      },
      receiver: {
        startTime: receiverStart,
        endTime: safeHitTime,
        positionAtStart: receiverPoint,
        velocity: receiverVelocity,
        errorBound: finiteNumber(receiver?.errorBound, receiverErrorBound),
      },
      hitTime: safeHitTime,
      signalSpeed: safeSignalSpeed,
      rootTolerance,
      maxIterations,
      scanSubdivisions: positiveInteger(scanSubdivisions, 8),
      maxRoots: positiveInteger(maxRoots, 4),
      maxHits: positiveInteger(maxHits, 4),
    };
  });
}

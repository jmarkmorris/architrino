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

function causalFactorFields({ direction, sourceVelocity, receiverVelocity, signalSpeed }) {
  const transmitterRadialSpeedAtEmission = dot(sourceVelocity, direction);
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

export function evaluateMovingCircularSourcePhase(source = {}, timeSeconds = 0) {
  const epochTime = finiteNumber(source.epochTime);
  const phaseAtEpoch = finiteNumber(source.phaseAtEpoch);
  const angularVelocity = finiteNumber(source.angularVelocity);
  // Optional constant angular acceleration alpha (default 0 preserves the
  // fixed-omega rigid circle exactly). With alpha != 0 the tangential speed
  // omega(t)*|r| sweeps through the field-speed edge, so a same-transmitter root can
  // realize the pump-driven crossing rather than the reflection-locked m = +1.
  const angularAcceleration = finiteNumber(source.angularAcceleration);
  const dt = finiteNumber(timeSeconds) - epochTime;
  return phaseRecord(
    phaseAtEpoch + angularVelocity * dt + 0.5 * angularAcceleration * dt * dt
  );
}

export function evaluateMovingCircularSourceHistory(source = {}, timeSeconds = 0) {
  const time = finiteNumber(timeSeconds);
  const epochTime = finiteNumber(source.epochTime);
  const dt = time - epochTime;
  const centerAtEpoch = vector(source.centerAtEpoch ?? source.center);
  const centerVelocity = vector(source.centerVelocity);
  const radiusU = vector(source.radiusU);
  const radiusV = vector(source.radiusV);
  const angularVelocity = finiteNumber(source.angularVelocity);
  const angularAcceleration = finiteNumber(source.angularAcceleration);
  const phase = evaluateMovingCircularSourcePhase(source, time);
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
  const sourceSample = evaluateMovingCircularSourceHistory(request.source, emissionTime);
  const receiverPoint = evaluateLinearHistoryPoint(request.receiver, hitTime);
  const delta = subtract(receiverPoint, sourceSample.position);
  const distance = magnitude(delta);
  return {
    residual: distance - signalSpeed * (hitTime - emissionTime),
    sourceSample,
    receiverPoint,
    delta,
    distance,
  };
}

function movingCircularSameSourceResidual(request, emissionTime) {
  const hitTime = finiteNumber(request.hitTime);
  const signalSpeed = positiveNumber(request.signalSpeed, 1);
  const sourceSample = evaluateMovingCircularSourceHistory(request.source, emissionTime);
  const receiverSample = evaluateMovingCircularSourceHistory(request.source, hitTime);
  const delta = subtract(receiverSample.position, sourceSample.position);
  const distance = magnitude(delta);
  return {
    residual: distance - signalSpeed * (hitTime - emissionTime),
    sourceSample,
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
    sourceVelocity: info.sourceSample.velocity,
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
    sourcePoint: info.sourceSample.position,
    receiverPoint: info.receiverPoint,
    sourceVelocity: info.sourceSample.velocity,
    sourcePhase: info.sourceSample.phase,
    iterationCount: iterations,
    sourceHistoryKind: "moving-circular-transmitter",
  };
}

function buildMovingCircularSameSourceRoot(request, emissionTime, rootId, residualInfo = null, iterations = 0) {
  const hitTime = finiteNumber(request.hitTime);
  const signalSpeed = positiveNumber(request.signalSpeed, 1);
  const info = residualInfo ?? movingCircularSameSourceResidual(request, emissionTime);
  const safeDistance = Math.max(EPSILON, info.distance);
  const direction = scale(info.delta, 1 / safeDistance);
  const causalFactors = causalFactorFields({
    direction,
    sourceVelocity: info.sourceSample.velocity,
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
    sourcePoint: info.sourceSample.position,
    receiverPoint: info.receiverPoint,
    sourceVelocity: info.sourceSample.velocity,
    receiverVelocity: info.receiverSample.velocity,
    sourcePhase: info.sourceSample.phase,
    receiverPhase: info.receiverSample.phase,
    iterationCount: iterations,
    sourceHistoryKind: "moving-circular-same-transmitter",
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

function refineMovingCircularSameSourceRoot(request, lowTime, highTime, lowResidual, highResidual, maxIterations) {
  let low = lowTime;
  let high = highTime;
  let fLow = lowResidual;
  let fHigh = highResidual;
  let bestTime = Math.abs(fLow) <= Math.abs(fHigh) ? low : high;
  let bestInfo = movingCircularSameSourceResidual(request, bestTime);
  let iterations = 0;

  for (; iterations < maxIterations; iterations += 1) {
    const mid = (low + high) / 2;
    const midInfo = movingCircularSameSourceResidual(request, mid);
    const fMid = midInfo.residual;
    if (Math.abs(fMid) < Math.abs(bestInfo.residual)) {
      bestTime = mid;
      bestInfo = midInfo;
    }
    if (Math.abs(fMid) <= positiveNumber(request.rootTolerance, 1e-12)) {
      return buildMovingCircularSameSourceRoot(request, mid, 0, midInfo, iterations + 1);
    }
    if (Math.sign(fLow) === Math.sign(fMid)) {
      low = mid;
      fLow = fMid;
    } else {
      high = mid;
      fHigh = fMid;
    }
  }

  return buildMovingCircularSameSourceRoot(request, bestTime, 0, bestInfo, iterations);
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
    sourceStartTime: start,
    sourceEndTime: end,
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
      message: "source influence did not catch the receiver within the scanned history window",
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

export function createMovingCircularSourceRootRequest({
  source,
  receiver,
  hitTime,
  signalSpeed,
  sourceStartTime,
  sourceEndTime,
  rootTolerance = 1e-12,
  maxIterations = 96,
  scanSubdivisions = 128,
  maxRoots = 32,
  sourceRef = undefined,
} = {}) {
  const safeHitTime = finiteNumber(hitTime);
  const safeSourceEnd = Number.isFinite(Number(sourceEndTime))
    ? Math.min(Number(sourceEndTime), safeHitTime)
    : safeHitTime;
  const safeSourceStart = Number.isFinite(Number(sourceStartTime))
    ? Math.min(Number(sourceStartTime), safeSourceEnd)
    : safeSourceEnd - 1;
  const receiverHistory = normalizeLinearReceiverHistoryForHit(receiver, safeHitTime);
  return {
    sourceRef,
    sourceHistoryKind: "moving-circular-transmitter",
    source: {
      centerAtEpoch: vector(source?.centerAtEpoch ?? source?.center),
      centerVelocity: vector(source?.centerVelocity),
      radiusU: vector(source?.radiusU),
      radiusV: vector(source?.radiusV),
      angularVelocity: finiteNumber(source?.angularVelocity),
      angularAcceleration: finiteNumber(source?.angularAcceleration),
      phaseAtEpoch: finiteNumber(source?.phaseAtEpoch),
      epochTime: finiteNumber(source?.epochTime),
      errorBound: finiteNumber(source?.errorBound),
    },
    receiver: receiverHistory,
    hitTime: safeHitTime,
    signalSpeed: positiveNumber(signalSpeed, 1),
    sourceStartTime: safeSourceStart,
    sourceEndTime: safeSourceEnd,
    rootTolerance: positiveNumber(rootTolerance, 1e-12),
    maxIterations: positiveInteger(maxIterations, 96),
    scanSubdivisions: positiveInteger(scanSubdivisions, 128),
    maxRoots: positiveInteger(maxRoots, 32),
  };
}

export function solveMovingCircularSourceCausalRoots(request = {}) {
  const normalized = createMovingCircularSourceRootRequest(request);
  const start = normalized.sourceStartTime;
  const end = normalized.sourceEndTime;
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
        ? "moving circular source causal roots solved"
        : noRootStatus.message,
    },
  };
}

export function createMovingCircularSameSourceRootRequest({
  source,
  hitTime,
  signalSpeed,
  sourceStartTime,
  sourceEndTime,
  rootTolerance = 1e-12,
  minimumDelay = 1e-6,
  maxIterations = 96,
  scanSubdivisions = 128,
  maxRoots = 32,
  sourceRef = undefined,
} = {}) {
  const safeHitTime = finiteNumber(hitTime);
  const safeMinimumDelay = positiveNumber(minimumDelay, 1e-6);
  const latestEmissionTime = safeHitTime - safeMinimumDelay;
  const safeSourceEnd = Number.isFinite(Number(sourceEndTime))
    ? Math.min(Number(sourceEndTime), latestEmissionTime)
    : latestEmissionTime;
  const safeSourceStart = Number.isFinite(Number(sourceStartTime))
    ? Math.min(Number(sourceStartTime), safeSourceEnd)
    : safeSourceEnd - 1;
  return {
    sourceRef,
    sourceHistoryKind: "moving-circular-same-transmitter",
    source: {
      centerAtEpoch: vector(source?.centerAtEpoch ?? source?.center),
      centerVelocity: vector(source?.centerVelocity),
      radiusU: vector(source?.radiusU),
      radiusV: vector(source?.radiusV),
      angularVelocity: finiteNumber(source?.angularVelocity),
      angularAcceleration: finiteNumber(source?.angularAcceleration),
      phaseAtEpoch: finiteNumber(source?.phaseAtEpoch),
      epochTime: finiteNumber(source?.epochTime),
      errorBound: finiteNumber(source?.errorBound),
    },
    hitTime: safeHitTime,
    signalSpeed: positiveNumber(signalSpeed, 1),
    sourceStartTime: safeSourceStart,
    sourceEndTime: safeSourceEnd,
    minimumDelay: safeMinimumDelay,
    rootTolerance: positiveNumber(rootTolerance, 1e-12),
    maxIterations: positiveInteger(maxIterations, 96),
    scanSubdivisions: positiveInteger(scanSubdivisions, 128),
    maxRoots: positiveInteger(maxRoots, 32),
  };
}

export function solveMovingCircularSameSourceCausalRoots(request = {}) {
  const normalized = createMovingCircularSameSourceRootRequest(request);
  const start = normalized.sourceStartTime;
  const end = normalized.sourceEndTime;
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
  let priorInfo = movingCircularSameSourceResidual(normalized, priorTime);
  let endInfo = priorInfo;
  let minResidual = priorInfo.residual;
  let maxResidual = priorInfo.residual;
  let minAbsResidual = Math.abs(priorInfo.residual);
  let minAbsTime = priorTime;
  let signChangeCount = 0;
  let sampledCount = 1;
  let rootLimitReached = false;

  if (Math.abs(priorInfo.residual) <= tolerance) {
    roots.push(buildMovingCircularSameSourceRoot(normalized, priorTime, roots.length, priorInfo, 0));
  }

  for (let index = 1; index <= steps; index += 1) {
    const time = start + (duration * index) / steps;
    const info = movingCircularSameSourceResidual(normalized, time);
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
        roots.push(buildMovingCircularSameSourceRoot(normalized, time, roots.length, info, 0));
      } else if (hasSignChange) {
        roots.push(refineMovingCircularSameSourceRoot(
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
    startInfo: movingCircularSameSourceResidual(normalized, start),
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

export function createMovingCircularSourceLinearizedRootRequests({
  source,
  receiver,
  hitTime,
  signalSpeed,
  sourceStartTime,
  sourceEndTime,
  segmentCount = 24,
  rootTolerance = 1e-12,
  maxIterations = 64,
  scanSubdivisions = 8,
  maxRoots = 4,
  maxHits = 4,
  sourceErrorBound = 0,
  receiverErrorBound = 0,
  sourceRef = undefined,
} = {}) {
  const safeHitTime = finiteNumber(hitTime);
  const safeSourceEnd = Number.isFinite(Number(sourceEndTime))
    ? Number(sourceEndTime)
    : safeHitTime;
  const safeSourceStart = Number.isFinite(Number(sourceStartTime))
    ? Number(sourceStartTime)
    : safeSourceEnd - 1;
  const duration = Math.max(EPSILON, safeSourceEnd - safeSourceStart);
  const safeSegmentCount = positiveInteger(segmentCount, 24);
  const safeSignalSpeed = positiveNumber(signalSpeed, 1);
  const receiverBase = normalizeLinearReceiverHistoryForHit(
    receiver,
    safeHitTime,
    receiverErrorBound
  );
  const receiverVelocity = receiverBase.velocity;
  const sourceHistory = {
    kind: "moving-circular-transmitter-linearized",
    sourceRef,
    source: {
      centerAtEpoch: vector(source?.centerAtEpoch ?? source?.center),
      centerVelocity: vector(source?.centerVelocity),
      radiusU: vector(source?.radiusU),
      radiusV: vector(source?.radiusV),
      angularVelocity: finiteNumber(source?.angularVelocity),
      phaseAtEpoch: finiteNumber(source?.phaseAtEpoch),
      epochTime: finiteNumber(source?.epochTime),
      errorBound: finiteNumber(source?.errorBound, sourceErrorBound),
    },
    receiver: receiverBase,
    segmentCount: safeSegmentCount,
    approximationPolicy: "linearized-moving-circular-transmitter-segments",
  };

  return Array.from({ length: safeSegmentCount }, (_, index) => {
    const segmentStart = safeSourceStart + (duration * index) / safeSegmentCount;
    const segmentEnd = safeSourceStart + (duration * (index + 1)) / safeSegmentCount;
    const sourceSample = evaluateMovingCircularSourceHistory(sourceHistory.source, segmentStart);
    const receiverStart = Math.min(segmentStart, safeHitTime);
    const receiverPoint = evaluateLinearHistoryPoint(receiverBase, receiverStart);
    return {
      sourceRef,
      segmentIndex: index,
      sourceHistory,
      source: {
        startTime: segmentStart,
        endTime: segmentEnd,
        positionAtStart: sourceSample.position,
        velocity: sourceSample.velocity,
        errorBound: finiteNumber(source?.errorBound, sourceErrorBound),
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

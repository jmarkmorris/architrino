const TWO_PI = Math.PI * 2;
const EPSILON = 1e-9;

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

function scale(a, scalar) {
  return {
    x: a.x * scalar,
    y: a.y * scalar,
    z: a.z * scalar,
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
  return phaseRecord(phaseAtEpoch + angularVelocity * (finiteNumber(timeSeconds) - epochTime));
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
  const phase = evaluateMovingCircularSourcePhase(source, time);
  const cos = Math.cos(phase.rawRadians);
  const sin = Math.sin(phase.rawRadians);
  const center = add(centerAtEpoch, scale(centerVelocity, dt));
  const radiusOffset = add(scale(radiusU, cos), scale(radiusV, sin));
  const tangentialVelocity = add(
    scale(radiusU, -angularVelocity * sin),
    scale(radiusV, angularVelocity * cos)
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
  const receiverVelocity = vector(receiver?.velocity);
  const receiverStartTime = finiteNumber(receiver?.startTime);
  const receiverBase = {
    startTime: receiverStartTime,
    endTime: Number.isFinite(Number(receiver?.endTime)) ? Number(receiver.endTime) : safeHitTime,
    positionAtStart: vector(receiver?.positionAtStart),
    velocity: receiverVelocity,
    errorBound: finiteNumber(receiver?.errorBound, receiverErrorBound),
  };
  const sourceHistory = {
    kind: "moving-circular-source-linearized",
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
    approximationPolicy: "linearized-moving-circular-source-segments",
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

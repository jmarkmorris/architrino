import {
  createMovingCircularSameTransmitterRootRequest as createMovingCircularSameTransmitterRootRequestKernel,
  createMovingCircularTransmitterLinearizedRootRequests as createMovingCircularTransmitterLinearizedRootRequestsKernel,
  createMovingCircularTransmitterRootRequest as createMovingCircularTransmitterRootRequestKernel,
  evaluateLinearHistoryPoint as evaluateLinearHistoryPointKernel,
  evaluateMovingCircularTransmitterHistory as evaluateMovingCircularTransmitterHistoryKernel,
  evaluateMovingCircularTransmitterPhase as evaluateMovingCircularTransmitterPhaseKernel,
  solveMovingCircularSameTransmitterCausalRoots as solveMovingCircularSameTransmitterCausalRootsKernel,
  solveMovingCircularTransmitterCausalRoots as solveMovingCircularTransmitterCausalRootsKernel,
} from "./PrescribedOrbitCausalRoots.mjs";

export const PRESCRIBED_PATH_ANALYSIS_API_VERSION = "prescribed-path-analysis.v1";
export const PRESCRIBED_PATH_ANALYSIS_ID = "prescribed-path-analysis";
export const PRESCRIBED_PATH_ANALYSIS_EVIDENCE_GRADE = "display-only-visualization";

const STATUS_OK = 0;
const STATUS_INSUFFICIENT_HISTORY_DEPTH = 9;
const STATUS_ROOT_NOT_BRACKETED = 12;
const STATUS_ROOT_UNRESOLVED = 13;
const STATUS_SMALL_JACOBIAN = 14;
const STATUS_INTERNAL_ERROR = 24;
const EPSILON = 1e-12;

function evidenceLabel() {
  return {
    evidenceGrade: PRESCRIBED_PATH_ANALYSIS_EVIDENCE_GRADE,
    nonEvidence: true,
    dynamicalEvidence: false,
    retainedBranchEvidence: false,
  };
}

function labelRecord(record = {}) {
  return { ...record, ...evidenceLabel() };
}

function labelRecords(records) {
  return Array.isArray(records) ? records.map((record) => labelRecord(record)) : [];
}

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

function add(left, right) {
  return { x: left.x + right.x, y: left.y + right.y, z: left.z + right.z };
}

function subtract(left, right) {
  return { x: left.x - right.x, y: left.y - right.y, z: left.z - right.z };
}

function scale(value, scalar) {
  return { x: value.x * scalar, y: value.y * scalar, z: value.z * scalar };
}

function dot(left, right) {
  return left.x * right.x + left.y * right.y + left.z * right.z;
}

function magnitude(value) {
  return Math.sqrt(dot(value, value));
}

function cross(left, right) {
  return {
    x: left.y * right.z - left.z * right.y,
    y: left.z * right.x - left.x * right.z,
    z: left.x * right.y - left.y * right.x,
  };
}

function createStatus(code = "ok", severity = "ok", message = "prescribed-path analysis completed") {
  return labelRecord({ code, severity, message });
}

export function evaluateMovingCircularTransmitterPhase(transmitter = {}, timeSeconds = 0) {
  return labelRecord(evaluateMovingCircularTransmitterPhaseKernel(transmitter, timeSeconds));
}

export function evaluateMovingCircularTransmitterHistory(transmitter = {}, timeSeconds = 0) {
  return labelRecord(evaluateMovingCircularTransmitterHistoryKernel(transmitter, timeSeconds));
}

export function evaluateLinearHistoryPoint(segment = {}, timeSeconds = 0) {
  return labelRecord(evaluateLinearHistoryPointKernel(segment, timeSeconds));
}

export function createMovingCircularTransmitterRootRequest(request = {}) {
  return labelRecord(createMovingCircularTransmitterRootRequestKernel(request));
}

export function createMovingCircularSameTransmitterRootRequest(request = {}) {
  return labelRecord(createMovingCircularSameTransmitterRootRequestKernel(request));
}

export function createMovingCircularTransmitterLinearizedRootRequests(request = {}) {
  return labelRecords(createMovingCircularTransmitterLinearizedRootRequestsKernel(request));
}

export function solveMovingCircularTransmitterCausalRoots(request = {}) {
  const response = solveMovingCircularTransmitterCausalRootsKernel(request);
  return labelRecord({
    ...response,
    schema: "prescribed-path-analysis/moving-circular-transmitter-causal-roots.v2",
    roots: labelRecords(response.roots),
    status: labelRecord(response.status ?? createStatus()),
  });
}

export function solveMovingCircularSameTransmitterCausalRoots(request = {}) {
  const response = solveMovingCircularSameTransmitterCausalRootsKernel(request);
  return labelRecord({
    ...response,
    schema: "prescribed-path-analysis/moving-circular-same-transmitter-causal-roots.v2",
    roots: labelRecords(response.roots),
    status: labelRecord(response.status ?? createStatus()),
  });
}

function causalFactorFields(direction, transmitterVelocity, receiverVelocity, signalSpeed) {
  const transmitterRadialSpeedAtEmission = dot(transmitterVelocity, direction);
  const receiverRadialSpeedAtReception = dot(receiverVelocity, direction);
  const transmitterFactor = signalSpeed - transmitterRadialSpeedAtEmission;
  const receiverFactor = signalSpeed - receiverRadialSpeedAtReception;
  const receiverCrossingRatio = receiverFactor / signalSpeed;
  const rootPlayback = receiverFactor / transmitterFactor;
  const accelerationWeight = signalSpeed / Math.abs(transmitterFactor);
  const causalFactorStatusCode = !Number.isFinite(rootPlayback)
    ? 25
    : Math.abs(transmitterFactor) <= EPSILON
      ? STATUS_SMALL_JACOBIAN
      : !Number.isFinite(accelerationWeight)
        ? 25
        : STATUS_OK;
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

function linearResidual(request, emissionTime) {
  const hitTime = finiteNumber(request.hitTime);
  const signalSpeed = positiveNumber(request.signalSpeed, 1);
  const transmitterPoint = evaluateLinearHistoryPointKernel(request.transmitter, emissionTime);
  const receiverPoint = evaluateLinearHistoryPointKernel(request.receiver, hitTime);
  const delta = subtract(receiverPoint, transmitterPoint);
  const distance = magnitude(delta);
  return {
    residual: distance - signalSpeed * (hitTime - emissionTime),
    transmitterPoint,
    receiverPoint,
    delta,
    distance,
  };
}

function buildLinearRoot(request, emissionTime, rootId, bracketStart, bracketEnd, iterations) {
  const info = linearResidual(request, emissionTime);
  const distance = Math.max(EPSILON, info.distance);
  const direction = scale(info.delta, 1 / distance);
  const transmitterVelocity = vector(request.transmitter?.velocity);
  const receiverVelocity = vector(request.receiver?.velocity);
  const signalSpeed = positiveNumber(request.signalSpeed, 1);
  const normal = causalFactorFields(direction, transmitterVelocity, receiverVelocity, signalSpeed);
  return labelRecord({
    receiverId: request.receiverId ?? "receiver",
    transmitterId: request.transmitterId ?? "transmitter",
    rootId,
    rootKind: "partner",
    statusCode: Math.abs(normal.transmitterFactor) <= positiveNumber(request.rootTolerance, 1e-12)
      ? STATUS_SMALL_JACOBIAN
      : STATUS_OK,
    emissionTime,
    hitTime: finiteNumber(request.hitTime),
    delay: finiteNumber(request.hitTime) - emissionTime,
    distance: info.distance,
    residual: info.residual,
    jacobian: normal.transmitterFactor,
    accelerationWeight: Number.isFinite(normal.accelerationWeight)
      ? normal.accelerationWeight
      : Number.POSITIVE_INFINITY,
    ...normal,
    bracketStart,
    bracketEnd,
    iterationCount: iterations,
    transmitterPoint: info.transmitterPoint,
    receiverPoint: info.receiverPoint,
    transmitterVelocity,
  });
}

function duplicateRoot(roots, emissionTime, tolerance) {
  return roots.some((root) => Math.abs(root.emissionTime - emissionTime) <= tolerance);
}

export function solveLinearPrescribedPathCausalRoots(request = {}) {
  const lower = finiteNumber(request.transmitter?.startTime);
  const upper = Math.min(
    finiteNumber(request.transmitter?.endTime, finiteNumber(request.hitTime)),
    finiteNumber(request.hitTime)
  );
  const tolerance = positiveNumber(request.rootTolerance, 1e-12);
  const subdivisions = positiveInteger(request.scanSubdivisions, 64);
  const maxIterations = positiveInteger(request.maxIterations, 96);
  const maxRoots = positiveInteger(request.maxRoots, subdivisions + 1);
  const roots = [];
  if (upper < lower) {
    const status = createStatus(
      "insufficient_history_depth",
      "warn",
      "transmitter history ends before the prescribed causal search window starts"
    );
    return labelRecord({
      schema: "prescribed-path-analysis/linear-causal-roots.v2",
      request: labelRecord(request),
      roots,
      status,
      statuses: [status],
    });
  }
  const step = (upper - lower) / subdivisions;
  let previousTime = lower;
  let previousInfo = linearResidual(request, lower);
  if (Math.abs(previousInfo.residual) <= tolerance) {
    roots.push(buildLinearRoot(request, lower, roots.length, lower, lower, 0));
  }
  for (let index = 1; index <= subdivisions && roots.length < maxRoots; index += 1) {
    const currentTime = index === subdivisions ? upper : lower + step * index;
    const currentInfo = linearResidual(request, currentTime);
    if (Math.abs(currentInfo.residual) <= tolerance && !duplicateRoot(roots, currentTime, tolerance)) {
      roots.push(buildLinearRoot(request, currentTime, roots.length, currentTime, currentTime, 0));
    } else if (Math.sign(previousInfo.residual) !== Math.sign(currentInfo.residual)) {
      let low = previousTime;
      let high = currentTime;
      let lowResidual = previousInfo.residual;
      let highResidual = currentInfo.residual;
      let iterations = 0;
      for (; iterations < maxIterations; iterations += 1) {
        const middle = (low + high) / 2;
        const middleResidual = linearResidual(request, middle).residual;
        if (Math.abs(middleResidual) <= tolerance || Math.abs(high - low) <= tolerance) {
          low = middle;
          high = middle;
          lowResidual = middleResidual;
          highResidual = middleResidual;
          break;
        }
        if (Math.sign(lowResidual) !== Math.sign(middleResidual)) {
          high = middle;
          highResidual = middleResidual;
        } else {
          low = middle;
          lowResidual = middleResidual;
        }
      }
      const emissionTime = (low + high) / 2;
      if (!duplicateRoot(roots, emissionTime, tolerance)) {
        const root = buildLinearRoot(
          request,
          emissionTime,
          roots.length,
          previousTime,
          currentTime,
          iterations
        );
        if (Math.abs(lowResidual) > tolerance && Math.abs(highResidual) > tolerance) {
          root.statusCode = STATUS_ROOT_UNRESOLVED;
        }
        roots.push(root);
      }
    }
    previousTime = currentTime;
    previousInfo = currentInfo;
  }
  const status = roots.length > 0
    ? createStatus("ok", "ok", "prescribed linear causal roots solved")
    : createStatus("root_not_bracketed", "info", "no causal roots were found on the prescribed path");
  return labelRecord({
    schema: "prescribed-path-analysis/linear-causal-roots.v2",
    request: labelRecord(request),
    roots,
    status,
    statuses: [status],
  });
}

export function solveCircularTransmitterRootsAndHits(request = {}) {
  const response = solveMovingCircularTransmitterCausalRoots({
    ...request,
    transmitter: {
      ...request.transmitter,
      centerAtEpoch: request.transmitter?.centerAtEpoch ?? request.transmitter?.center,
      centerVelocity: request.transmitter?.centerVelocity ?? { x: 0, y: 0, z: 0 },
      angularAcceleration: request.transmitter?.angularAcceleration ?? 0,
    },
    transmitterStartTime: request.transmitterStartTime ?? request.transmitter?.startTime,
    transmitterEndTime: request.transmitterEndTime ?? request.transmitter?.endTime,
  });
  const hits = response.roots.map((root, eventId) => labelRecord({
    eventId,
    receiverId: root.receiverId ?? request.receiverId ?? "receiver",
    transmitterId: root.transmitterId ?? request.transmitterId ?? "transmitter",
    rootId: root.rootId,
    emissionTime: root.emissionTime,
    hitTime: root.hitTime,
    delay: root.delay,
    distance: root.distance,
    jacobian: root.jacobian,
    strength: root.accelerationWeight,
    emissionPoint: root.transmitterPoint,
    transmitterPoint: root.transmitterPoint,
    receiverPoint: root.receiverPoint,
    unitDirection: magnitude(subtract(root.receiverPoint, root.transmitterPoint)) > EPSILON
      ? scale(
          subtract(root.receiverPoint, root.transmitterPoint),
          1 / magnitude(subtract(root.receiverPoint, root.transmitterPoint))
        )
      : { x: 0, y: 0, z: 0 },
    transmitterRadialSpeedAtEmission: root.transmitterRadialSpeedAtEmission,
    receiverRadialSpeedAtReception: root.receiverRadialSpeedAtReception,
    transmitterFactor: root.transmitterFactor,
    receiverFactor: root.receiverFactor,
    receiverCrossingRatio: root.receiverCrossingRatio,
    rootPlayback: root.rootPlayback,
    causalFactorStatusCode: root.causalFactorStatusCode,
    statusCode: root.statusCode,
  }));
  const rootLedgerDetails = response.roots.map((root) => labelRecord({
    entryKind: 1,
    rootId: root.rootId,
    statusCode: root.statusCode,
    emissionTime: root.emissionTime,
    hitTime: root.hitTime,
    residual: root.residual,
  }));
  return labelRecord({
    ...response,
    schema: "prescribed-path-analysis/circular-transmitter-roots-and-hits.v2",
    hits,
    rootLedgerDetails,
  });
}

function resolveCausalFactorRecord(branch = {}, signalSpeed = 1) {
  const accelerationWeight = Number(branch.accelerationWeight);
  const transmitterFactor = Number(branch.transmitterFactor);
  const receiverFactor = Number(branch.receiverFactor);
  const rootPlayback = Number(branch.rootPlayback);
  const complete = [
    accelerationWeight,
    transmitterFactor,
    receiverFactor,
    rootPlayback,
  ].every(Number.isFinite);
  const valid = complete &&
    accelerationWeight >= 0 &&
    Math.abs(transmitterFactor) > EPSILON &&
    Math.abs(rootPlayback - receiverFactor / transmitterFactor) <= 1e-9 * Math.max(1, Math.abs(rootPlayback)) &&
    Math.abs(accelerationWeight - signalSpeed / Math.abs(transmitterFactor)) <= 1e-9 * Math.max(1, accelerationWeight);
  return {
    accelerationWeight: valid ? accelerationWeight : 0,
    transmitterFactor: Number.isFinite(transmitterFactor) ? transmitterFactor : 0,
    receiverFactor: Number.isFinite(receiverFactor) ? receiverFactor : 0,
    rootPlayback: Number.isFinite(rootPlayback) ? rootPlayback : 0,
    evidenceStatus: valid
      ? "ok"
      : complete
        ? "causal_factor_record_invalid"
        : "causal_factor_record_missing",
  };
}

export function computeMovingCircularObserverField(request = {}) {
  const signalSpeed = Math.max(EPSILON, finiteNumber(request.signalSpeed, 1));
  const minimumDistance = Math.max(EPSILON, finiteNumber(request.minimumDistance, EPSILON));
  const branches = Array.isArray(request.branches) ? request.branches : [];
  const contributions = branches.map((branch, branchIndex) => {
    const direction = vector(branch.direction);
    const transmitterVelocity = vector(branch.transmitterVelocity);
    const distance = Math.max(minimumDistance, finiteNumber(branch.distance));
    const normal = resolveCausalFactorRecord(branch, signalSpeed);
    const electric = scale(
      direction,
      finiteNumber(branch.chargeSign) * normal.accelerationWeight / (distance * distance)
    );
    return labelRecord({
      branchIndex,
      transmitterRootRequestIndex: Number.isFinite(Number(branch.transmitterRootRequestIndex))
        ? Number(branch.transmitterRootRequestIndex)
        : 0,
      transmitterRootIndex: Number.isFinite(Number(branch.transmitterRootIndex))
        ? Number(branch.transmitterRootIndex)
        : branchIndex,
      delay: Math.max(0, finiteNumber(branch.delay)),
      distance,
      delaySolveGap: Math.abs(finiteNumber(branch.residual)),
      jacobian: normal.transmitterFactor,
      jacobianAbs: Math.abs(normal.transmitterFactor),
      ...normal,
      transmitterRadialSpeedAtEmission: finiteNumber(branch.transmitterRadialSpeedAtEmission, dot(transmitterVelocity, direction)),
      receiverRadialSpeedAtReception: finiteNumber(branch.receiverRadialSpeedAtReception),
      receiverCrossingRatio: finiteNumber(branch.receiverCrossingRatio),
      causalFactorStatusCode: Number.isFinite(Number(branch.causalFactorStatusCode))
        ? Number(branch.causalFactorStatusCode)
        : normal.evidenceStatus === "ok" ? STATUS_OK : -1,
      causalFactorEvidenceStatus: normal.evidenceStatus,
      transmitterSpeedRatio: magnitude(transmitterVelocity) / signalSpeed,
      receiverAcceleration: electric,
      electric,
      // Diagnostic plane-wave comparison only: the global +x propagation
      // convention is not a branch-local magnetic reconstruction off axis.
      comparisonB: scale(cross({ x: 1, y: 0, z: 0 }, electric), 1 / signalSpeed),
    });
  });
  const electric = contributions.reduce(
    (sum, contribution) => add(sum, contribution.electric),
    { x: 0, y: 0, z: 0 }
  );
  const comparisonB = contributions.reduce(
    (sum, contribution) => add(sum, contribution.comparisonB),
    { x: 0, y: 0, z: 0 }
  );
  const missingReceiverNormalCount = contributions.filter(
    (contribution) => contribution.causalFactorEvidenceStatus !== "ok"
  ).length;
  const delaySum = contributions.reduce((sum, contribution) => sum + contribution.delay, 0);
  const status = missingReceiverNormalCount > 0
    ? createStatus(
        contributions.find((row) => row.causalFactorEvidenceStatus !== "ok")
          ?.causalFactorEvidenceStatus ?? "causal_factor_record_missing",
        "warn",
        "prescribed observer-field branches are missing receiver-side root-playback records"
      )
    : createStatus("ok", "ok", "prescribed moving-circular observer field computed");
  return labelRecord({
    schema: "prescribed-path-analysis/moving-circular-observer-field.v2",
    transmitterHistoryKind: "moving-circular-transmitter",
    branchCount: branches.length,
    contributionCount: contributions.length,
    contributions,
    averageDelay: contributions.length > 0 ? delaySum / contributions.length : 0,
    delaySolveGapMax: contributions.reduce(
      (maximum, contribution) => Math.max(maximum, contribution.delaySolveGap),
      0
    ),
    maxTransmitterSpeedRatio: contributions.reduce(
      (maximum, contribution) => Math.max(maximum, contribution.transmitterSpeedRatio),
      0
    ),
    jacobianAbsMin: contributions.length > 0
      ? Math.min(...contributions.map((contribution) => contribution.jacobianAbs))
      : 0,
    unstableContributionCount: contributions.filter(
      (contribution) =>
        contribution.causalFactorEvidenceStatus !== "ok" ||
        contribution.delaySolveGap > finiteNumber(request.unstableGapThreshold, 0.05) ||
        contribution.jacobianAbs <= Math.max(EPSILON, finiteNumber(request.jacobianFloor, 1e-4))
    ).length,
    nearestTransmitterDistance: contributions.length > 0
      ? Math.min(...contributions.map((contribution) => contribution.distance))
      : 0,
    receiverAcceleration: electric,
    electric,
    comparisonB,
    rowProductionOwner: PRESCRIBED_PATH_ANALYSIS_ID,
    status,
    statuses: [status],
  });
}

function createObserverFieldBranch(root, rootResponse, requestIndex, rootIndex) {
  const transmitterPoint = vector(root.transmitterPoint);
  const receiverPoint = vector(root.receiverPoint);
  const delta = subtract(receiverPoint, transmitterPoint);
  const deltaDistance = magnitude(delta);
  const distance = Math.max(EPSILON, finiteNumber(root.distance, deltaDistance));
  return labelRecord({
    transmitterRootRequestIndex: requestIndex,
    transmitterRootIndex: rootIndex,
    transmitterRef: rootResponse.transmitterRef ?? rootResponse.request?.transmitterRef ?? null,
    chargeSign: finiteNumber(rootResponse.branchChargeSign),
    direction: deltaDistance > EPSILON ? scale(delta, 1 / deltaDistance) : { x: 1, y: 0, z: 0 },
    transmitterVelocity: vector(root.transmitterVelocity),
    distance,
    residual: root.residual,
    delay: root.delay,
    accelerationWeight: root.accelerationWeight,
    transmitterRadialSpeedAtEmission: root.transmitterRadialSpeedAtEmission,
    receiverRadialSpeedAtReception: root.receiverRadialSpeedAtReception,
    transmitterFactor: root.transmitterFactor,
    receiverFactor: root.receiverFactor,
    receiverCrossingRatio: root.receiverCrossingRatio,
    rootPlayback: root.rootPlayback,
    causalFactorStatusCode: root.causalFactorStatusCode,
    transmitterHistoryKind: root.transmitterHistoryKind,
  });
}

export function solveMovingCircularAbsoluteHistoryRun(request = {}) {
  const transmitterRootRequests = Array.isArray(request.transmitterRootRequests)
    ? request.transmitterRootRequests
    : [];
  const transmitterRootResponses = transmitterRootRequests.map((transmitterRootRequest, requestIndex) =>
    labelRecord({
      ...solveMovingCircularTransmitterCausalRoots(transmitterRootRequest),
      requestIndex,
      transmitterRef: transmitterRootRequest.transmitterRef ?? null,
      branchChargeSign: finiteNumber(transmitterRootRequest.branchChargeSign),
    })
  );
  const roots = transmitterRootResponses.flatMap((response, requestIndex) =>
    response.roots.map((root, transmitterRootIndex) => labelRecord({
      ...root,
      transmitterRootRequestIndex: requestIndex,
      transmitterRootIndex,
      transmitterRef: response.transmitterRef,
      branchChargeSign: response.branchChargeSign,
    }))
  );
  const branches = roots.map((root) =>
    createObserverFieldBranch(
      root,
      transmitterRootResponses[root.transmitterRootRequestIndex],
      root.transmitterRootRequestIndex,
      root.transmitterRootIndex
    )
  );
  const observerField = computeMovingCircularObserverField({
    ...(request.observerFieldRequest ?? {}),
    signalSpeed:
      request.observerFieldRequest?.signalSpeed ??
      request.signalSpeed ??
      transmitterRootResponses[0]?.request?.signalSpeed ??
      1,
    branches,
  });
  const status = createStatus(
    "ok",
    "ok",
    "prescribed moving-circular roots and observer field computed"
  );
  return labelRecord({
    schema: "prescribed-path-analysis/moving-circular-absolute-history-run.v2",
    transmitterHistoryProvider: request.transmitterHistoryProvider ?? null,
    analysisBoundary: request.solverBoundary ?? request.analysisBoundary ?? null,
    transmitterRootRequests: labelRecords(transmitterRootRequests),
    transmitterRootResponses,
    roots,
    branches,
    observerField,
    rootCount: roots.length,
    transmitterRootRequestCount: transmitterRootRequests.length,
    unresolvedTransmitterCount: transmitterRootResponses.filter((response) => response.roots.length === 0).length,
    rowProductionOwner: PRESCRIBED_PATH_ANALYSIS_ID,
    status,
    statuses: [status, ...transmitterRootResponses.flatMap((response) => response.statuses ?? [])],
  });
}

export function computeDelayedPotential(request = {}, itemIndex = 0) {
  const transmitter = request.transmitter ?? {};
  const samplePoint = vector(request.samplePoint);
  const observationTime = finiteNumber(request.observationTime);
  const fieldSpeed = Math.max(0.001, finiteNumber(request.fieldSpeed, 6));
  const softening = Math.max(0.0001, finiteNumber(request.softening, 0.08));
  const iterations = positiveInteger(request.iterations, 4);
  let tau = magnitude(subtract(samplePoint, evaluateLinearHistoryPointKernel(transmitter, observationTime))) /
    fieldSpeed;
  for (let index = 0; index < iterations; index += 1) {
    const emittedPosition = evaluateLinearHistoryPointKernel(transmitter, observationTime - tau);
    tau = magnitude(subtract(samplePoint, emittedPosition)) / fieldSpeed;
  }
  const emissionTime = observationTime - tau;
  const emissionPoint = evaluateLinearHistoryPointKernel(transmitter, emissionTime);
  const displacement = subtract(samplePoint, emissionPoint);
  const distance = Math.max(0.0001, magnitude(displacement));
  let denominator = Math.sqrt(distance * distance + softening * softening);
  let kappa = 1;
  if (request.useCausalDenominator === true) {
    const direction = scale(displacement, 1 / distance);
    kappa = 1 - dot(direction, vector(transmitter.velocity)) / fieldSpeed;
    denominator *= Math.max(0.08, Math.abs(kappa));
  }
  const potential = finiteNumber(request.normalization, 1) *
    finiteNumber(request.transmitterCharge, 1) /
    denominator;
  let statusCode = emissionTime < finiteNumber(transmitter.startTime) || emissionTime > finiteNumber(transmitter.endTime)
    ? STATUS_INSUFFICIENT_HISTORY_DEPTH
    : STATUS_OK;
  if (![tau, emissionTime, distance, denominator, potential, kappa].every(Number.isFinite)) {
    statusCode = STATUS_INTERNAL_ERROR;
  }
  return labelRecord({
    itemIndex,
    statusCode,
    tau,
    emissionTime,
    emissionPoint,
    displacement,
    distance,
    denominator,
    potential,
    kappa,
    iterations,
    usedCausalDenominator: request.useCausalDenominator === true,
  });
}

export function computeDelayedPotentials(requests = []) {
  return labelRecords(requests.map((request, index) => computeDelayedPotential(request, index)));
}

function circularSelfHitResidual(angle, fieldSpeedRatio) {
  return 2 * Math.sin(angle / 2) - angle / fieldSpeedRatio;
}

export function solveCircularSelfHitSpan(request = {}, itemIndex = 0) {
  const fieldSpeedRatio = positiveNumber(request.fieldSpeedRatio, 1);
  const fieldSpeedTolerance = Math.max(0, finiteNumber(request.fieldSpeedTolerance, 0.015));
  const tolerance = Math.max(0, finiteNumber(request.tolerance, 1e-12));
  const maxAngle = positiveNumber(request.maxAngle, Math.PI * 1.96);
  const maxIterations = positiveInteger(request.maxIterations, 48);
  const scanSubdivisions = positiveInteger(request.scanSubdivisions, 72);
  const regime = fieldSpeedRatio < 1 - fieldSpeedTolerance
    ? "sub_field"
    : fieldSpeedRatio > 1 + fieldSpeedTolerance
      ? "super_field"
      : "field_speed";
  if (fieldSpeedRatio <= 1 + fieldSpeedTolerance) {
    return labelRecord({
      itemIndex,
      statusCode: STATUS_OK,
      fieldSpeedRatio,
      fieldSpeedTolerance,
      regime,
      resultKind: "below_threshold",
      span: 0,
      rootFound: false,
      bracketLow: 0,
      bracketHigh: 0,
      residual: 0,
      iterations: 0,
    });
  }
  const step = Math.PI / scanSubdivisions;
  let low = step;
  let high = maxAngle;
  let previousAngle = low;
  let previousValue = circularSelfHitResidual(previousAngle, fieldSpeedRatio);
  let foundHigh = false;
  for (let angle = low + step; angle <= maxAngle + step * 1e-12; angle += step) {
    const value = circularSelfHitResidual(angle, fieldSpeedRatio);
    if (previousValue > 0 && value <= 0) {
      low = previousAngle;
      high = angle;
      foundHigh = true;
      break;
    }
    previousAngle = angle;
    previousValue = value;
  }
  if (!foundHigh) {
    return labelRecord({
      itemIndex,
      statusCode: STATUS_ROOT_NOT_BRACKETED,
      fieldSpeedRatio,
      fieldSpeedTolerance,
      regime,
      resultKind: "fallback_pi",
      span: Math.PI,
      rootFound: false,
      bracketLow: low,
      bracketHigh: high,
      residual: circularSelfHitResidual(Math.PI, fieldSpeedRatio),
      iterations: 0,
    });
  }
  let iterations = 0;
  for (; iterations < maxIterations; iterations += 1) {
    const middle = (low + high) / 2;
    const value = circularSelfHitResidual(middle, fieldSpeedRatio);
    if (Math.abs(value) <= tolerance || Math.abs(high - low) <= tolerance) {
      low = middle;
      high = middle;
      break;
    }
    if (value > 0) {
      low = middle;
    } else {
      high = middle;
    }
  }
  const span = (low + high) / 2;
  return labelRecord({
    itemIndex,
    statusCode: STATUS_OK,
    fieldSpeedRatio,
    fieldSpeedTolerance,
    regime,
    resultKind: "root_solved",
    span,
    rootFound: true,
    bracketLow: low,
    bracketHigh: high,
    residual: circularSelfHitResidual(span, fieldSpeedRatio),
    iterations,
  });
}

export function solveCircularSelfHitSpans(requests = []) {
  return labelRecords(requests.map((request, index) => solveCircularSelfHitSpan(request, index)));
}

function normalizedPhase(value) {
  const phase = value % 1;
  return phase < 0 ? phase + 1 : phase;
}

function signedPhaseDelta(transmitterPhase, receiverPhase) {
  let delta = receiverPhase - transmitterPhase;
  while (delta > 0.5) delta -= 1;
  while (delta < -0.5) delta += 1;
  return delta;
}

export function computePhaseAtHits(request = {}) {
  const roots = Array.isArray(request.roots) ? request.roots : [];
  const transmitterClock = request.transmitterClock ?? {};
  const receiverClock = request.receiverClock ?? {};
  const metadata = Array.isArray(request.metadata) ? request.metadata : [];
  const records = roots.map((root, index) => {
    const transmitterCyclePosition =
      (finiteNumber(root.emissionTime) - finiteNumber(transmitterClock.epoch)) /
        positiveNumber(transmitterClock.period, 1) +
      finiteNumber(transmitterClock.phaseOffset);
    const receiverCyclePosition =
      (finiteNumber(root.hitTime) - finiteNumber(receiverClock.epoch)) /
        positiveNumber(receiverClock.period, 1) +
      finiteNumber(receiverClock.phaseOffset);
    const transmitterPhase = normalizedPhase(transmitterCyclePosition);
    const receiverPhase = normalizedPhase(receiverCyclePosition);
    const phaseDelta = signedPhaseDelta(transmitterPhase, receiverPhase);
    const recordMetadata = metadata[index] ?? {};
    return labelRecord({
      rootId: root.rootId ?? index,
      statusCode: root.statusCode ?? STATUS_OK,
      transmitterCycleIndex: Math.floor(transmitterCyclePosition),
      receiverCycleIndex: Math.floor(receiverCyclePosition),
      emissionTime: finiteNumber(root.emissionTime),
      hitTime: finiteNumber(root.hitTime),
      transmitterPhase,
      receiverPhase,
      phaseDelta,
      phaseSpread: Math.abs(phaseDelta),
      rootKind: recordMetadata.rootKind ?? 0,
      transmitterLayerCode: recordMetadata.transmitterLayerCode ?? 0,
      receiverLayerCode: recordMetadata.receiverLayerCode ?? 0,
      transmitterRoleCode: recordMetadata.transmitterRoleCode ?? 0,
      receiverRoleCode: recordMetadata.receiverRoleCode ?? 0,
      transmitterChargeSign: recordMetadata.transmitterChargeSign ?? 0,
      receiverChargeSign: recordMetadata.receiverChargeSign ?? 0,
      stateFlags: recordMetadata.stateFlags ?? 0,
    });
  });
  const status = createStatus("ok", "ok", "prescribed phase-at-hit diagnostics computed");
  return labelRecord({ records, status, statuses: [status], buffers: [] });
}

export function summarizePhaseAtHits(request = {}) {
  const records = Array.isArray(request.records) ? request.records : [];
  const numericRange = (key) => records.length > 0
    ? {
        start: Math.min(...records.map((record) => finiteNumber(record[key]))),
        end: Math.max(...records.map((record) => finiteNumber(record[key]))),
      }
    : { start: 0, end: 0 };
  const numericMean = (key) => records.length > 0
    ? records.reduce((sum, record) => sum + finiteNumber(record[key]), 0) / records.length
    : 0;
  const statusCounts = [...records.reduce((counts, record) => {
    const statusCode = record.statusCode ?? STATUS_OK;
    counts.set(statusCode, (counts.get(statusCode) ?? 0) + 1);
    return counts;
  }, new Map()).entries()]
    .sort(([left], [right]) => left - right)
    .map(([statusCode, recordCount]) => ({ statusCode, recordCount }));
  const status = createStatus("ok", "ok", "prescribed phase diagnostics summarized");
  return labelRecord({
    summary: labelRecord({
      schema: "solver-phase-at-hit-summary.v1",
      recordCount: records.length,
      rootIdRange: numericRange("rootId"),
      statusCounts,
      transmitterCycleIndexRange: numericRange("transmitterCycleIndex"),
      receiverCycleIndexRange: numericRange("receiverCycleIndex"),
      emissionTimeRange: numericRange("emissionTime"),
      hitTimeRange: numericRange("hitTime"),
      transmitterPhaseRange: numericRange("transmitterPhase"),
      receiverPhaseRange: numericRange("receiverPhase"),
      phaseDeltaRange: numericRange("phaseDelta"),
      phaseSpreadRange: numericRange("phaseSpread"),
      meanPhaseDelta: numericMean("phaseDelta"),
      meanPhaseSpread: numericMean("phaseSpread"),
      maxPhaseSpread: records.length > 0
        ? Math.max(...records.map((record) => finiteNumber(record.phaseSpread)))
        : 0,
    }),
    status,
    statuses: [status],
  });
}

export function computePrescribedPathGeometry(request = {}) {
  const status = createStatus("ok", "ok", "prescribed-path geometry computed");
  return labelRecord({
    delayedPotentials: computeDelayedPotentials(request.delayedPotentials ?? []),
    circularSelfHitSpans: solveCircularSelfHitSpans(request.circularSelfHitSpans ?? []),
    status,
    statuses: [status],
  });
}

export async function runPrescribedPathAnalysisRequest(request = {}) {
  const runId = request.runId ?? "prescribed-path-analysis-run";
  const datasetId = request.datasetId ?? `${runId}-dataset`;
  let response;
  if (request.runKind === "causalRoots" || request.runKind === "delayedHits") {
    const rootRequest = request.config?.rootRequest ?? request.rootRequest ?? request;
    const solved = solveLinearPrescribedPathCausalRoots(rootRequest);
    response = labelRecord({
      runId,
      datasetId,
      roots: solved.roots,
      hits: labelRecords(solved.roots.map((root, eventId) => ({
        eventId,
        rootId: root.rootId,
        emissionTime: root.emissionTime,
        hitTime: root.hitTime,
        delay: root.delay,
        distance: root.distance,
        jacobian: root.jacobian,
        strength: root.accelerationWeight,
        emissionPoint: root.transmitterPoint,
        transmitterPoint: root.transmitterPoint,
        receiverPoint: root.receiverPoint,
        unitDirection: magnitude(subtract(root.receiverPoint, root.transmitterPoint)) > EPSILON
          ? scale(
              subtract(root.receiverPoint, root.transmitterPoint),
              1 / magnitude(subtract(root.receiverPoint, root.transmitterPoint))
            )
          : { x: 0, y: 0, z: 0 },
        transmitterRadialSpeedAtEmission: root.transmitterRadialSpeedAtEmission,
        receiverRadialSpeedAtReception: root.receiverRadialSpeedAtReception,
        transmitterFactor: root.transmitterFactor,
        receiverFactor: root.receiverFactor,
        receiverCrossingRatio: root.receiverCrossingRatio,
        rootPlayback: root.rootPlayback,
        causalFactorStatusCode: root.causalFactorStatusCode,
        statusCode: root.statusCode,
      }))),
      rootLedgerDetails: labelRecords(solved.roots.map((root) => ({
        entryKind: 1,
        rootId: root.rootId,
        statusCode: root.statusCode,
        emissionTime: root.emissionTime,
        hitTime: root.hitTime,
        residual: root.residual,
      }))),
      status: solved.status,
      statuses: solved.statuses,
    });
  } else if (request.runKind === "phaseDiagnostics") {
    const phase = computePhaseAtHits(request.config?.phaseRequest ?? {});
    const phaseSummary = summarizePhaseAtHits({ records: phase.records });
    response = labelRecord({
      runId,
      datasetId,
      phaseRecords: phase.records,
      phaseSummary: phaseSummary.summary,
      status: phase.status,
      statuses: [...phase.statuses, ...phaseSummary.statuses],
    });
  } else if (request.runKind === "sharedGeometry") {
    response = labelRecord({
      runId,
      datasetId,
      geometry: computePrescribedPathGeometry(request.config?.geometryRequest ?? {}),
      status: createStatus("ok", "ok", "prescribed-path geometry run completed"),
    });
  } else {
    throw new TypeError(`Unsupported prescribed-path analysis run kind: ${request.runKind}`);
  }
  return labelRecord({
    analysisId: PRESCRIBED_PATH_ANALYSIS_ID,
    runId,
    datasetId,
    response,
  });
}

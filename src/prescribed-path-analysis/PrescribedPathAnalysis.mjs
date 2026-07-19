import {
  createMovingCircularSameSourceRootRequest as createMovingCircularSameSourceRootRequestKernel,
  createMovingCircularSourceLinearizedRootRequests as createMovingCircularSourceLinearizedRootRequestsKernel,
  createMovingCircularSourceRootRequest as createMovingCircularSourceRootRequestKernel,
  evaluateLinearHistoryPoint as evaluateLinearHistoryPointKernel,
  evaluateMovingCircularSourceHistory as evaluateMovingCircularSourceHistoryKernel,
  evaluateMovingCircularSourcePhase as evaluateMovingCircularSourcePhaseKernel,
  solveMovingCircularSameSourceCausalRoots as solveMovingCircularSameSourceCausalRootsKernel,
  solveMovingCircularSourceCausalRoots as solveMovingCircularSourceCausalRootsKernel,
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

function labelRows(rows) {
  return Array.isArray(rows) ? rows.map((row) => labelRecord(row)) : [];
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

export function evaluateMovingCircularSourcePhase(source = {}, timeSeconds = 0) {
  return labelRecord(evaluateMovingCircularSourcePhaseKernel(source, timeSeconds));
}

export function evaluateMovingCircularSourceHistory(source = {}, timeSeconds = 0) {
  return labelRecord(evaluateMovingCircularSourceHistoryKernel(source, timeSeconds));
}

export function evaluateLinearHistoryPoint(segment = {}, timeSeconds = 0) {
  return labelRecord(evaluateLinearHistoryPointKernel(segment, timeSeconds));
}

export function createMovingCircularSourceRootRequest(request = {}) {
  return labelRecord(createMovingCircularSourceRootRequestKernel(request));
}

export function createMovingCircularSameSourceRootRequest(request = {}) {
  return labelRecord(createMovingCircularSameSourceRootRequestKernel(request));
}

export function createMovingCircularSourceLinearizedRootRequests(request = {}) {
  return labelRows(createMovingCircularSourceLinearizedRootRequestsKernel(request));
}

export function solveMovingCircularSourceCausalRoots(request = {}) {
  const response = solveMovingCircularSourceCausalRootsKernel(request);
  return labelRecord({
    ...response,
    schema: "prescribed-path-analysis/moving-circular-source-causal-roots.v1",
    roots: labelRows(response.roots),
    status: labelRecord(response.status ?? createStatus()),
  });
}

export function solveMovingCircularSameSourceCausalRoots(request = {}) {
  const response = solveMovingCircularSameSourceCausalRootsKernel(request);
  return labelRecord({
    ...response,
    schema: "prescribed-path-analysis/moving-circular-same-source-causal-roots.v1",
    roots: labelRows(response.roots),
    status: labelRecord(response.status ?? createStatus()),
  });
}

function receiverNormalFields(direction, sourceVelocity, receiverVelocity, signalSpeed) {
  const sourceNormalSpeed = dot(sourceVelocity, direction);
  const receiverNormalSpeed = dot(receiverVelocity, direction);
  const sourceNormalDenominator = signalSpeed - sourceNormalSpeed;
  const receiverNormalNumerator = signalSpeed - receiverNormalSpeed;
  const receiverNormalCrossingFactor = receiverNormalNumerator / signalSpeed;
  const receiverNormalFactor = receiverNormalNumerator / sourceNormalDenominator;
  const unsignedReceiverNormalFactor = Math.abs(receiverNormalFactor);
  const receiverNormalStatusCode = !Number.isFinite(receiverNormalFactor)
    ? 25
    : Math.abs(sourceNormalDenominator) <= EPSILON
      ? STATUS_SMALL_JACOBIAN
      : Math.abs(receiverNormalNumerator) <= EPSILON
        ? 25
        : STATUS_OK;
  return {
    sourceNormalSpeed,
    receiverNormalSpeed,
    sourceNormalDenominator,
    receiverNormalNumerator,
    receiverNormalCrossingFactor,
    receiverNormalFactor,
    unsignedReceiverNormalFactor,
    signedBranchOrientation: receiverNormalFactor,
    receiverNormalStatusCode,
  };
}

function linearResidual(request, emissionTime) {
  const hitTime = finiteNumber(request.hitTime);
  const signalSpeed = positiveNumber(request.signalSpeed, 1);
  const sourcePoint = evaluateLinearHistoryPointKernel(request.source, emissionTime);
  const receiverPoint = evaluateLinearHistoryPointKernel(request.receiver, hitTime);
  const delta = subtract(receiverPoint, sourcePoint);
  const distance = magnitude(delta);
  return {
    residual: distance - signalSpeed * (hitTime - emissionTime),
    sourcePoint,
    receiverPoint,
    delta,
    distance,
  };
}

function buildLinearRoot(request, emissionTime, rootId, bracketStart, bracketEnd, iterations) {
  const info = linearResidual(request, emissionTime);
  const distance = Math.max(EPSILON, info.distance);
  const direction = scale(info.delta, 1 / distance);
  const sourceVelocity = vector(request.source?.velocity);
  const receiverVelocity = vector(request.receiver?.velocity);
  const signalSpeed = positiveNumber(request.signalSpeed, 1);
  const normal = receiverNormalFields(direction, sourceVelocity, receiverVelocity, signalSpeed);
  return labelRecord({
    receiverId: request.receiverId ?? "receiver",
    sourceId: request.sourceId ?? "source",
    rootId,
    rootKind: "partner",
    statusCode: Math.abs(normal.sourceNormalDenominator) <= positiveNumber(request.rootTolerance, 1e-12)
      ? STATUS_SMALL_JACOBIAN
      : STATUS_OK,
    emissionTime,
    hitTime: finiteNumber(request.hitTime),
    delay: finiteNumber(request.hitTime) - emissionTime,
    distance: info.distance,
    residual: info.residual,
    jacobian: normal.sourceNormalDenominator,
    branchWeight: Number.isFinite(normal.unsignedReceiverNormalFactor)
      ? normal.unsignedReceiverNormalFactor
      : Number.POSITIVE_INFINITY,
    ...normal,
    bracketStart,
    bracketEnd,
    iterationCount: iterations,
    sourcePoint: info.sourcePoint,
    receiverPoint: info.receiverPoint,
    sourceVelocity,
  });
}

function duplicateRoot(roots, emissionTime, tolerance) {
  return roots.some((root) => Math.abs(root.emissionTime - emissionTime) <= tolerance);
}

export function solveLinearPrescribedPathCausalRoots(request = {}) {
  const lower = finiteNumber(request.source?.startTime);
  const upper = Math.min(
    finiteNumber(request.source?.endTime, finiteNumber(request.hitTime)),
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
      "source history ends before the prescribed causal search window starts"
    );
    return labelRecord({
      schema: "prescribed-path-analysis/linear-causal-roots.v1",
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
    schema: "prescribed-path-analysis/linear-causal-roots.v1",
    request: labelRecord(request),
    roots,
    status,
    statuses: [status],
  });
}

export function solveCircularSourceRootsAndHits(request = {}) {
  const response = solveMovingCircularSourceCausalRoots({
    ...request,
    source: {
      ...request.source,
      centerAtEpoch: request.source?.centerAtEpoch ?? request.source?.center,
      centerVelocity: request.source?.centerVelocity ?? { x: 0, y: 0, z: 0 },
      angularAcceleration: request.source?.angularAcceleration ?? 0,
    },
    sourceStartTime: request.sourceStartTime ?? request.source?.startTime,
    sourceEndTime: request.sourceEndTime ?? request.source?.endTime,
  });
  const hits = response.roots.map((root, eventId) => labelRecord({
    eventId,
    receiverId: root.receiverId ?? request.receiverId ?? "receiver",
    sourceId: root.sourceId ?? request.sourceId ?? "source",
    rootId: root.rootId,
    emissionTime: root.emissionTime,
    hitTime: root.hitTime,
    delay: root.delay,
    distance: root.distance,
    jacobian: root.jacobian,
    strength: root.branchWeight,
    emissionPoint: root.sourcePoint,
    sourcePoint: root.sourcePoint,
    receiverPoint: root.receiverPoint,
    unitDirection: magnitude(subtract(root.receiverPoint, root.sourcePoint)) > EPSILON
      ? scale(
          subtract(root.receiverPoint, root.sourcePoint),
          1 / magnitude(subtract(root.receiverPoint, root.sourcePoint))
        )
      : { x: 0, y: 0, z: 0 },
    sourceNormalSpeed: root.sourceNormalSpeed,
    receiverNormalSpeed: root.receiverNormalSpeed,
    sourceNormalDenominator: root.sourceNormalDenominator,
    receiverNormalNumerator: root.receiverNormalNumerator,
    receiverNormalCrossingFactor: root.receiverNormalCrossingFactor,
    receiverNormalFactor: root.receiverNormalFactor,
    unsignedReceiverNormalFactor: root.unsignedReceiverNormalFactor,
    receiverNormalStatusCode: root.receiverNormalStatusCode,
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
    schema: "prescribed-path-analysis/circular-source-roots-and-hits.v1",
    hits,
    rootLedgerDetails,
  });
}

function resolveReceiverNormalRows(branch = {}) {
  const branchWeight = Number(branch.branchWeight);
  const sourceNormalDenominator = Number(branch.sourceNormalDenominator);
  const receiverNormalNumerator = Number(branch.receiverNormalNumerator);
  const receiverNormalFactor = Number(branch.receiverNormalFactor);
  const unsignedReceiverNormalFactor = Number(branch.unsignedReceiverNormalFactor);
  const complete = [
    branchWeight,
    sourceNormalDenominator,
    receiverNormalNumerator,
    receiverNormalFactor,
    unsignedReceiverNormalFactor,
  ].every(Number.isFinite);
  const valid = complete &&
    branchWeight >= 0 &&
    unsignedReceiverNormalFactor >= 0 &&
    Math.abs(sourceNormalDenominator) > EPSILON &&
    Math.abs(receiverNormalFactor - receiverNormalNumerator / sourceNormalDenominator) <= 1e-9 * Math.max(1, Math.abs(receiverNormalFactor)) &&
    Math.abs(unsignedReceiverNormalFactor - Math.abs(receiverNormalFactor)) <= 1e-9 * Math.max(1, unsignedReceiverNormalFactor) &&
    Math.abs(branchWeight - unsignedReceiverNormalFactor) <= 1e-9 * Math.max(1, branchWeight);
  return {
    branchWeight: valid ? branchWeight : 0,
    sourceNormalDenominator: Number.isFinite(sourceNormalDenominator) ? sourceNormalDenominator : 0,
    receiverNormalNumerator: Number.isFinite(receiverNormalNumerator) ? receiverNormalNumerator : 0,
    receiverNormalFactor: Number.isFinite(receiverNormalFactor) ? receiverNormalFactor : 0,
    unsignedReceiverNormalFactor: Number.isFinite(unsignedReceiverNormalFactor)
      ? unsignedReceiverNormalFactor
      : 0,
    evidenceStatus: valid
      ? "ok"
      : complete
        ? "receiver_normal_branch_rows_invalid"
        : "receiver_normal_branch_rows_missing",
  };
}

export function computeMovingCircularObserverField(request = {}) {
  const signalSpeed = Math.max(EPSILON, finiteNumber(request.signalSpeed, 1));
  const branches = Array.isArray(request.branches) ? request.branches : [];
  const contributions = branches.map((branch, branchIndex) => {
    const direction = vector(branch.direction);
    const sourceVelocity = vector(branch.sourceVelocity);
    const distance = Math.max(EPSILON, finiteNumber(branch.distance));
    const normal = resolveReceiverNormalRows(branch);
    const electric = scale(
      direction,
      finiteNumber(branch.chargeSign) * normal.branchWeight / (distance * distance)
    );
    return labelRecord({
      branchIndex,
      delay: Math.max(0, finiteNumber(branch.delay)),
      distance,
      delaySolveGap: Math.abs(finiteNumber(branch.residual)),
      jacobian: normal.sourceNormalDenominator,
      jacobianAbs: Math.abs(normal.sourceNormalDenominator),
      ...normal,
      sourceNormalSpeed: finiteNumber(branch.sourceNormalSpeed, dot(sourceVelocity, direction)),
      receiverNormalSpeed: finiteNumber(branch.receiverNormalSpeed),
      receiverNormalCrossingFactor: finiteNumber(branch.receiverNormalCrossingFactor),
      receiverNormalStatusCode: Number.isFinite(Number(branch.receiverNormalStatusCode))
        ? Number(branch.receiverNormalStatusCode)
        : normal.evidenceStatus === "ok" ? STATUS_OK : -1,
      receiverNormalEvidenceStatus: normal.evidenceStatus,
      sourceSpeedRatio: magnitude(sourceVelocity) / signalSpeed,
      receiverAcceleration: electric,
      electric,
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
    (contribution) => contribution.receiverNormalEvidenceStatus !== "ok"
  ).length;
  const delaySum = contributions.reduce((sum, contribution) => sum + contribution.delay, 0);
  const status = missingReceiverNormalCount > 0
    ? createStatus(
        contributions.find((row) => row.receiverNormalEvidenceStatus !== "ok")
          ?.receiverNormalEvidenceStatus ?? "receiver_normal_branch_rows_missing",
        "warn",
        "prescribed observer-field branches are missing receiver-side root-playback rows"
      )
    : createStatus("ok", "ok", "prescribed moving-circular observer field computed");
  return labelRecord({
    schema: "prescribed-path-analysis/moving-circular-observer-field.v1",
    sourceHistoryKind: "moving-circular-source",
    branchCount: branches.length,
    contributionCount: contributions.length,
    contributions,
    averageDelay: contributions.length > 0 ? delaySum / contributions.length : 0,
    delaySolveGapMax: contributions.reduce(
      (maximum, contribution) => Math.max(maximum, contribution.delaySolveGap),
      0
    ),
    maxSourceSpeedRatio: contributions.reduce(
      (maximum, contribution) => Math.max(maximum, contribution.sourceSpeedRatio),
      0
    ),
    jacobianAbsMin: contributions.length > 0
      ? Math.min(...contributions.map((contribution) => contribution.jacobianAbs))
      : 0,
    unstableContributionCount: contributions.filter(
      (contribution) =>
        contribution.receiverNormalEvidenceStatus !== "ok" ||
        contribution.delaySolveGap > finiteNumber(request.unstableGapThreshold, 0.05) ||
        contribution.jacobianAbs <= Math.max(EPSILON, finiteNumber(request.jacobianFloor, 1e-4))
    ).length,
    nearestSourceDistance: contributions.length > 0
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

function createObserverFieldBranch(root, rootResponse, requestIndex) {
  const sourcePoint = vector(root.sourcePoint);
  const receiverPoint = vector(root.receiverPoint);
  const delta = subtract(receiverPoint, sourcePoint);
  const deltaDistance = magnitude(delta);
  const distance = Math.max(EPSILON, finiteNumber(root.distance, deltaDistance));
  return labelRecord({
    sourceRootRequestIndex: requestIndex,
    sourceRef: rootResponse.sourceRef ?? rootResponse.request?.sourceRef ?? null,
    chargeSign: finiteNumber(rootResponse.branchChargeSign),
    direction: deltaDistance > EPSILON ? scale(delta, 1 / deltaDistance) : { x: 1, y: 0, z: 0 },
    sourceVelocity: vector(root.sourceVelocity),
    distance,
    residual: root.residual,
    delay: root.delay,
    branchWeight: root.branchWeight,
    sourceNormalSpeed: root.sourceNormalSpeed,
    receiverNormalSpeed: root.receiverNormalSpeed,
    sourceNormalDenominator: root.sourceNormalDenominator,
    receiverNormalNumerator: root.receiverNormalNumerator,
    receiverNormalCrossingFactor: root.receiverNormalCrossingFactor,
    receiverNormalFactor: root.receiverNormalFactor,
    unsignedReceiverNormalFactor: root.unsignedReceiverNormalFactor,
    receiverNormalStatusCode: root.receiverNormalStatusCode,
    sourceHistoryKind: root.sourceHistoryKind,
  });
}

export function solveMovingCircularAbsoluteHistoryRun(request = {}) {
  const sourceRootRequests = Array.isArray(request.sourceRootRequests)
    ? request.sourceRootRequests
    : [];
  const sourceRootResponses = sourceRootRequests.map((sourceRootRequest, requestIndex) =>
    labelRecord({
      ...solveMovingCircularSourceCausalRoots(sourceRootRequest),
      requestIndex,
      sourceRef: sourceRootRequest.sourceRef ?? null,
      branchChargeSign: finiteNumber(sourceRootRequest.branchChargeSign),
    })
  );
  const roots = sourceRootResponses.flatMap((response, requestIndex) =>
    response.roots.map((root, sourceRootIndex) => labelRecord({
      ...root,
      sourceRootRequestIndex: requestIndex,
      sourceRootIndex,
      sourceRef: response.sourceRef,
      branchChargeSign: response.branchChargeSign,
    }))
  );
  const branches = roots.map((root) =>
    createObserverFieldBranch(root, sourceRootResponses[root.sourceRootRequestIndex], root.sourceRootRequestIndex)
  );
  const observerField = computeMovingCircularObserverField({
    ...(request.observerFieldRequest ?? {}),
    signalSpeed:
      request.observerFieldRequest?.signalSpeed ??
      request.signalSpeed ??
      sourceRootResponses[0]?.request?.signalSpeed ??
      1,
    branches,
  });
  const status = createStatus(
    "ok",
    "ok",
    "prescribed moving-circular roots and observer field computed"
  );
  return labelRecord({
    schema: "prescribed-path-analysis/moving-circular-absolute-history-run.v1",
    sourceHistoryProvider: request.sourceHistoryProvider ?? null,
    analysisBoundary: request.solverBoundary ?? request.analysisBoundary ?? null,
    sourceRootRequests: labelRows(sourceRootRequests),
    sourceRootResponses,
    roots,
    branches,
    observerField,
    rootCount: roots.length,
    sourceRootRequestCount: sourceRootRequests.length,
    unresolvedSourceCount: sourceRootResponses.filter((response) => response.roots.length === 0).length,
    rowProductionOwner: PRESCRIBED_PATH_ANALYSIS_ID,
    status,
    statuses: [status, ...sourceRootResponses.flatMap((response) => response.statuses ?? [])],
  });
}

export function computeDelayedPotential(request = {}, itemIndex = 0) {
  const source = request.source ?? {};
  const samplePoint = vector(request.samplePoint);
  const observationTime = finiteNumber(request.observationTime);
  const fieldSpeed = Math.max(0.001, finiteNumber(request.fieldSpeed, 6));
  const softening = Math.max(0.0001, finiteNumber(request.softening, 0.08));
  const iterations = positiveInteger(request.iterations, 4);
  let tau = magnitude(subtract(samplePoint, evaluateLinearHistoryPointKernel(source, observationTime))) /
    fieldSpeed;
  for (let index = 0; index < iterations; index += 1) {
    const emittedPosition = evaluateLinearHistoryPointKernel(source, observationTime - tau);
    tau = magnitude(subtract(samplePoint, emittedPosition)) / fieldSpeed;
  }
  const emissionTime = observationTime - tau;
  const emissionPoint = evaluateLinearHistoryPointKernel(source, emissionTime);
  const displacement = subtract(samplePoint, emissionPoint);
  const distance = Math.max(0.0001, magnitude(displacement));
  let denominator = Math.sqrt(distance * distance + softening * softening);
  let kappa = 1;
  if (request.useCausalDenominator === true) {
    const direction = scale(displacement, 1 / distance);
    kappa = 1 - dot(direction, vector(source.velocity)) / fieldSpeed;
    denominator *= Math.max(0.08, Math.abs(kappa));
  }
  const potential = finiteNumber(request.normalization, 1) *
    finiteNumber(request.sourceCharge, 1) /
    denominator;
  let statusCode = emissionTime < finiteNumber(source.startTime) || emissionTime > finiteNumber(source.endTime)
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
  return labelRows(requests.map((request, index) => computeDelayedPotential(request, index)));
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
  return labelRows(requests.map((request, index) => solveCircularSelfHitSpan(request, index)));
}

function normalizedPhase(value) {
  const phase = value % 1;
  return phase < 0 ? phase + 1 : phase;
}

function signedPhaseDelta(sourcePhase, receiverPhase) {
  let delta = receiverPhase - sourcePhase;
  while (delta > 0.5) delta -= 1;
  while (delta < -0.5) delta += 1;
  return delta;
}

export function computePhaseAtHits(request = {}) {
  const roots = Array.isArray(request.roots) ? request.roots : [];
  const sourceClock = request.sourceClock ?? {};
  const receiverClock = request.receiverClock ?? {};
  const metadata = Array.isArray(request.metadata) ? request.metadata : [];
  const rows = roots.map((root, index) => {
    const sourceCyclePosition =
      (finiteNumber(root.emissionTime) - finiteNumber(sourceClock.epoch)) /
        positiveNumber(sourceClock.period, 1) +
      finiteNumber(sourceClock.phaseOffset);
    const receiverCyclePosition =
      (finiteNumber(root.hitTime) - finiteNumber(receiverClock.epoch)) /
        positiveNumber(receiverClock.period, 1) +
      finiteNumber(receiverClock.phaseOffset);
    const sourcePhase = normalizedPhase(sourceCyclePosition);
    const receiverPhase = normalizedPhase(receiverCyclePosition);
    const phaseDelta = signedPhaseDelta(sourcePhase, receiverPhase);
    const rowMetadata = metadata[index] ?? {};
    return labelRecord({
      rootId: root.rootId ?? index,
      statusCode: root.statusCode ?? STATUS_OK,
      sourceCycleIndex: Math.floor(sourceCyclePosition),
      receiverCycleIndex: Math.floor(receiverCyclePosition),
      emissionTime: finiteNumber(root.emissionTime),
      hitTime: finiteNumber(root.hitTime),
      sourcePhase,
      receiverPhase,
      phaseDelta,
      phaseSpread: Math.abs(phaseDelta),
      rootKind: rowMetadata.rootKind ?? 0,
      sourceLayerCode: rowMetadata.sourceLayerCode ?? 0,
      receiverLayerCode: rowMetadata.receiverLayerCode ?? 0,
      sourceRoleCode: rowMetadata.sourceRoleCode ?? 0,
      receiverRoleCode: rowMetadata.receiverRoleCode ?? 0,
      sourceChargeSign: rowMetadata.sourceChargeSign ?? 0,
      receiverChargeSign: rowMetadata.receiverChargeSign ?? 0,
      stateFlags: rowMetadata.stateFlags ?? 0,
    });
  });
  const status = createStatus("ok", "ok", "prescribed phase-at-hit diagnostics computed");
  return labelRecord({ rows, status, statuses: [status], buffers: [] });
}

export function summarizePhaseAtHits(request = {}) {
  const rows = Array.isArray(request.rows) ? request.rows : [];
  const numericRange = (key) => rows.length > 0
    ? {
        start: Math.min(...rows.map((row) => finiteNumber(row[key]))),
        end: Math.max(...rows.map((row) => finiteNumber(row[key]))),
      }
    : { start: 0, end: 0 };
  const numericMean = (key) => rows.length > 0
    ? rows.reduce((sum, row) => sum + finiteNumber(row[key]), 0) / rows.length
    : 0;
  const statusCounts = [...rows.reduce((counts, row) => {
    const statusCode = row.statusCode ?? STATUS_OK;
    counts.set(statusCode, (counts.get(statusCode) ?? 0) + 1);
    return counts;
  }, new Map()).entries()]
    .sort(([left], [right]) => left - right)
    .map(([statusCode, rowCount]) => ({ statusCode, rowCount }));
  const status = createStatus("ok", "ok", "prescribed phase diagnostics summarized");
  return labelRecord({
    summary: labelRecord({
      schema: "solver-phase-at-hit-summary.v1",
      rowCount: rows.length,
      rootIdRange: numericRange("rootId"),
      statusCounts,
      sourceCycleIndexRange: numericRange("sourceCycleIndex"),
      receiverCycleIndexRange: numericRange("receiverCycleIndex"),
      emissionTimeRange: numericRange("emissionTime"),
      hitTimeRange: numericRange("hitTime"),
      sourcePhaseRange: numericRange("sourcePhase"),
      receiverPhaseRange: numericRange("receiverPhase"),
      phaseDeltaRange: numericRange("phaseDelta"),
      phaseSpreadRange: numericRange("phaseSpread"),
      meanPhaseDelta: numericMean("phaseDelta"),
      meanPhaseSpread: numericMean("phaseSpread"),
      maxPhaseSpread: rows.length > 0
        ? Math.max(...rows.map((row) => finiteNumber(row.phaseSpread)))
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
      hits: labelRows(solved.roots.map((root, eventId) => ({
        eventId,
        rootId: root.rootId,
        emissionTime: root.emissionTime,
        hitTime: root.hitTime,
        delay: root.delay,
        distance: root.distance,
        jacobian: root.jacobian,
        strength: root.branchWeight,
        emissionPoint: root.sourcePoint,
        sourcePoint: root.sourcePoint,
        receiverPoint: root.receiverPoint,
        unitDirection: magnitude(subtract(root.receiverPoint, root.sourcePoint)) > EPSILON
          ? scale(
              subtract(root.receiverPoint, root.sourcePoint),
              1 / magnitude(subtract(root.receiverPoint, root.sourcePoint))
            )
          : { x: 0, y: 0, z: 0 },
        sourceNormalSpeed: root.sourceNormalSpeed,
        receiverNormalSpeed: root.receiverNormalSpeed,
        sourceNormalDenominator: root.sourceNormalDenominator,
        receiverNormalNumerator: root.receiverNormalNumerator,
        receiverNormalCrossingFactor: root.receiverNormalCrossingFactor,
        receiverNormalFactor: root.receiverNormalFactor,
        unsignedReceiverNormalFactor: root.unsignedReceiverNormalFactor,
        receiverNormalStatusCode: root.receiverNormalStatusCode,
        statusCode: root.statusCode,
      }))),
      rootLedgerDetails: labelRows(solved.roots.map((root) => ({
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
    const phaseSummary = summarizePhaseAtHits({ rows: phase.rows });
    response = labelRecord({
      runId,
      datasetId,
      phaseRows: phase.rows,
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

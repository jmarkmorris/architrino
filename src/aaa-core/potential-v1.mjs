import {
  PRESCRIBED_PATH_ANALYSIS_ID,
  runPrescribedPathAnalysisRequest,
} from "../prescribed-path-analysis/PrescribedPathAnalysis.mjs";

export const AAA_CORE_POTENTIAL_API_ID = "aaa_core_potential/v1";
export const AAA_CORE_POTENTIAL_SOFTENING = 0.08;
export const AAA_CORE_POTENTIAL_SUPPORTED_CONSUMERS = Object.freeze([
  "ideal-braid",
  "topo",
]);

const DEFAULT_MEMORY_BUDGET_BYTES = 64 * 1024 * 1024;
const DEFAULT_FLIGHT_TIME_TOLERANCE = 1e-12;
const DEFAULT_TRANSMITTER_HISTORY_DEPTH = 10;

export class AAACorePotentialError extends Error {
  constructor(code, detail) {
    super(`${code}: ${detail}`);
    this.name = "AAACorePotentialError";
    this.code = code;
  }
}

function fail(code, detail) {
  throw new AAACorePotentialError(code, detail);
}

function requireFinite(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    fail("invalid_potential_request", `${label} must be finite`);
  }
  return number;
}

function requirePositive(value, label) {
  const number = requireFinite(value, label);
  if (number <= 0) {
    fail("invalid_potential_request", `${label} must be positive`);
  }
  return number;
}

function requirePositiveInteger(value, label) {
  const number = requirePositive(value, label);
  if (!Number.isSafeInteger(number)) {
    fail("invalid_potential_request", `${label} must be a positive integer`);
  }
  return number;
}

function requireVector(value, label) {
  if (!value || typeof value !== "object") {
    fail("invalid_potential_request", `${label} must be a vector`);
  }
  return {
    x: requireFinite(value.x, `${label}.x`),
    y: requireFinite(value.y, `${label}.y`),
    z: requireFinite(value.z, `${label}.z`),
  };
}

function requireConsumer(consumerId) {
  if (!AAA_CORE_POTENTIAL_SUPPORTED_CONSUMERS.includes(consumerId)) {
    fail("unsupported_potential_consumer", String(consumerId));
  }
  return consumerId;
}

function normalizeSamplePoints(samplePoints) {
  const points = Array.isArray(samplePoints) ? samplePoints : [samplePoints];
  if (points.length === 0) {
    fail("invalid_potential_request", "samplePoints must not be empty");
  }
  return points.map((point, index) => requireVector(point, `samplePoints[${index}]`));
}

function normalizeTransmitters(model) {
  const transmitters = Array.isArray(model?.architrinos) ? model.architrinos : [];
  if (transmitters.length === 0) {
    fail("invalid_potential_request", "model.architrinos must not be empty");
  }
  return transmitters;
}

function createTransmitterSegment(transmitter, observationTime, options) {
  if (options.transmitterSegment && typeof options.transmitterSegment === "object") {
    return cloneSegment(options.transmitterSegment);
  }
  const endTime = options.transmitterEndTime === undefined
    ? observationTime
    : requireFinite(options.transmitterEndTime, "transmitterEndTime");
  const historyDepth = options.transmitterHistoryDepth === undefined
    ? DEFAULT_TRANSMITTER_HISTORY_DEPTH
    : requirePositive(options.transmitterHistoryDepth, "transmitterHistoryDepth");
  const startTime = options.transmitterStartTime === undefined
    ? endTime - historyDepth
    : requireFinite(options.transmitterStartTime, "transmitterStartTime");
  const linearizationTime = options.transmitterLinearizationTime === undefined
    ? endTime
    : requireFinite(options.transmitterLinearizationTime, "transmitterLinearizationTime");
  if (startTime > endTime || linearizationTime < startTime || linearizationTime > endTime) {
    fail("invalid_potential_request", "transmitter history interval is inconsistent");
  }
  const velocity = requireVector(
    typeof transmitter?.velocityAt === "function"
      ? transmitter.velocityAt(linearizationTime)
      : transmitter?.velocity,
    "transmitter.velocity",
  );
  const anchorPosition = requireVector(
    typeof transmitter?.positionAt === "function"
      ? transmitter.positionAt(linearizationTime)
      : transmitter?.position ?? transmitter,
    "transmitter.position",
  );
  const anchorOffset = linearizationTime - startTime;
  return {
    startTime,
    endTime,
    positionAtStart: {
      x: anchorPosition.x - velocity.x * anchorOffset,
      y: anchorPosition.y - velocity.y * anchorOffset,
      z: anchorPosition.z - velocity.z * anchorOffset,
    },
    velocity,
    errorBound: options.transmitterErrorBound === undefined
      ? 0
      : Math.max(0, requireFinite(options.transmitterErrorBound, "transmitterErrorBound")),
  };
}

function cloneSegment(segment) {
  const startTime = requireFinite(segment.startTime, "transmitterSegment.startTime");
  const endTime = requireFinite(segment.endTime, "transmitterSegment.endTime");
  if (startTime > endTime) {
    fail("invalid_potential_request", "transmitterSegment startTime exceeds endTime");
  }
  return {
    startTime,
    endTime,
    positionAtStart: requireVector(
      segment.positionAtStart ?? segment.start,
      "transmitterSegment.positionAtStart",
    ),
    velocity: requireVector(segment.velocity, "transmitterSegment.velocity"),
    errorBound: segment.errorBound === undefined
      ? 0
      : Math.max(0, requireFinite(segment.errorBound, "transmitterSegment.errorBound")),
  };
}

function createDefaultModel(consumerId) {
  return {
    modelId: `aaa.${consumerId}`,
    equationVersion: "delayed-potential-samples-v1",
    forceLawVersion: "causal-delay-v1",
    constantsHash: `constants:${consumerId}`,
    causalSpeedPolicy: "field-speed",
    branchPolicy: "batched-linear-transmitter-segments",
    unitConvention: "relative",
    compatiblePrecisionPaths: ["scaled_f64_strict", "event_root_focused", "extended_precision"],
  };
}

function createEnvelope({transmitters, observationTime, sampleCount, memoryBudgetBytes}) {
  const startTime = Math.min(...transmitters.map((transmitter) => transmitter.startTime));
  const duration = Math.max(0, observationTime - startTime);
  const stepHint = duration > 0 ? duration / 64 : 1;
  return {
    entityCount: transmitters.length,
    assemblyCount: Math.max(1, transmitters.length),
    timeWindow: {start: startTime, end: observationTime, stepHint, units: "seconds"},
    timeResolutionHint: stepHint,
    interactionPolicy: "batched-delayed-potential-surface",
    expectedBranchComplexity: "medium",
    outputDetail: "geometry",
    memoryBudgetBytes,
    storageBudgetBytes: memoryBudgetBytes,
    latencyTarget: "interactive",
    simplificationPolicy: "linear-transmitter-segments",
    sampleCount,
    transmitterCount: transmitters.length,
  };
}

function createErrorBudget(tolerance) {
  return {
    globalTolerance: tolerance,
    rootIsolationTolerance: tolerance,
    delayedHitTolerance: tolerance,
    integrationTolerance: tolerance,
    streamEncodingTolerance: tolerance,
    readbackTolerance: tolerance,
    projectionTolerance: 1e-9,
    displayTolerance: 1e-6,
  };
}

export function createPotentialSamplesRunRequest(request = {}) {
  const consumerId = requireConsumer(request.consumerId);
  const samplePoints = normalizeSamplePoints(request.samplePoints);
  const sourceTransmitters = normalizeTransmitters(request.model);
  const observationTime = requireFinite(request.observationTime, "observationTime");
  const fieldSpeed = request.fieldSpeed === undefined
    ? requirePositive(request.model?.fieldSpeed ?? 1, "fieldSpeed")
    : requirePositive(request.fieldSpeed, "fieldSpeed");
  const iterations = request.iterations === undefined
    ? 4
    : requirePositiveInteger(request.iterations, "iterations");
  const tolerance = request.tolerance === undefined
    ? DEFAULT_FLIGHT_TIME_TOLERANCE
    : Math.max(0, requireFinite(request.tolerance, "tolerance"));
  const memoryBudgetBytes = request.memoryBudgetBytes === undefined
    ? DEFAULT_MEMORY_BUDGET_BYTES
    : requirePositiveInteger(request.memoryBudgetBytes, "memoryBudgetBytes");
  const softening = request.softening === undefined
    ? AAA_CORE_POTENTIAL_SOFTENING
    : requirePositive(request.softening, "softening");
  const normalization = request.normalization === undefined
    ? 1
    : requireFinite(request.normalization, "normalization");
  const transmitters = sourceTransmitters.map((transmitter) =>
    createTransmitterSegment(transmitter, observationTime, request));
  const delayedPotentials = samplePoints.flatMap((samplePoint) =>
    sourceTransmitters.map((transmitter, transmitterIndex) => ({
      transmitter: structuredClone(transmitters[transmitterIndex]),
      samplePoint: structuredClone(samplePoint),
      observationTime,
      fieldSpeed,
      normalization,
      softening,
      transmitterCharge: requireFinite(
        request.transmitterCharge ?? transmitter?.q ?? 1,
        "transmitterCharge",
      ),
      iterations,
      useCausalDenominator: request.useCausalDenominator === true,
    })));
  const runId = request.runId ??
    `aaa-core-potential-${consumerId}-${formatIdNumber(observationTime)}-${samplePoints.length}x${transmitters.length}`;
  return {
    appId: consumerId,
    runKind: "sharedGeometry",
    requestId: request.requestId ?? `${runId}-request`,
    runId,
    datasetId: request.datasetId ?? `${runId}-dataset`,
    claimLevel: request.claimLevel ?? "interactive-preview",
    precisionPath: request.precisionPath ?? "auto",
    configVersion: request.configVersion ?? AAA_CORE_POTENTIAL_API_ID,
    configHash: request.configHash ??
      `${AAA_CORE_POTENTIAL_API_ID}:${consumerId}:${formatIdNumber(observationTime)}:${samplePoints.length}:${transmitters.length}`,
    model: request.analysisModel ?? createDefaultModel(consumerId),
    envelope: request.envelope ?? createEnvelope({
      transmitters,
      observationTime,
      sampleCount: samplePoints.length,
      memoryBudgetBytes,
    }),
    errorBudget: request.errorBudget ?? createErrorBudget(tolerance),
    config: {geometryRequest: {delayedPotentials}},
    output: request.output ?? {
      outputs: ["geometryBuffer", "diagnostics"],
      streamTarget: request.streamTarget ?? "caller-buffer",
      memoryBudgetBytes,
      deterministic: request.deterministic ?? true,
    },
  };
}

function extractPotentialSnapshot(runHandle, {sampleCount, transmitterCount}) {
  const response = runHandle?.response ?? runHandle;
  const geometry = response?.geometry ?? response;
  const rows = Array.isArray(geometry?.delayedPotentials) ? geometry.delayedPotentials : null;
  const expectedRowCount = sampleCount * transmitterCount;
  if (!rows || rows.length !== expectedRowCount) {
    fail("potential_output_unavailable", `expected ${expectedRowCount} contribution rows`);
  }
  const orderedRows = Array.from({length: expectedRowCount});
  rows.forEach((row, fallbackIndex) => {
    const itemIndex = Number.isSafeInteger(row?.itemIndex) ? row.itemIndex : fallbackIndex;
    if (itemIndex < 0 || itemIndex >= expectedRowCount || orderedRows[itemIndex]) {
      fail("potential_output_unavailable", `invalid contribution row identity ${itemIndex}`);
    }
    if (row.statusCode !== 0 || !Number.isFinite(Number(row.potential))) {
      fail(
        "potential_output_unavailable",
        `contribution row ${itemIndex} has status ${String(row.statusCode)}`,
      );
    }
    orderedRows[itemIndex] = structuredClone(row);
  });
  if (orderedRows.some((row) => !row)) {
    fail("potential_output_unavailable", "contribution rows are not complete");
  }
  const contributionsBySample = Array.from({length: sampleCount}, (_, sampleIndex) =>
    orderedRows.slice(sampleIndex * transmitterCount, (sampleIndex + 1) * transmitterCount));
  const samplePotentials = contributionsBySample.map((contributions) =>
    contributions.reduce((sum, row) => sum + Number(row.potential), 0));
  if (!samplePotentials.every(Number.isFinite)) {
    fail("potential_output_unavailable", "sample reduction is nonfinite");
  }
  const min = Math.min(...samplePotentials);
  const max = Math.max(...samplePotentials);
  return {
    apiId: AAA_CORE_POTENTIAL_API_ID,
    analysisId: PRESCRIBED_PATH_ANALYSIS_ID,
    runId: response?.runId ?? runHandle?.runId ?? "",
    datasetId: response?.datasetId ?? runHandle?.datasetId ?? "",
    samplePotentials,
    contributionsBySample,
    delayedPotentials: orderedRows,
    surfaceRange: {
      min,
      max,
      maxAbs: Math.max(0.0001, ...samplePotentials.map((value) => Math.abs(value))),
    },
    status: response?.status ?? runHandle?.status ?? geometry?.status,
  };
}

export async function computePotentialSamples(request = {}, dependencies = {}) {
  const consumerId = requireConsumer(request.consumerId);
  const samplePoints = normalizeSamplePoints(request.samplePoints);
  const transmitters = normalizeTransmitters(request.model);
  const runRequest = request.runRequest ?? createPotentialSamplesRunRequest({...request, consumerId});
  if (runRequest.appId !== consumerId || runRequest.configVersion !== AAA_CORE_POTENTIAL_API_ID) {
    fail("invalid_potential_request", "run request does not match the Core Potential API identity");
  }
  const run = dependencies.runPrescribedPathAnalysis ?? runPrescribedPathAnalysisRequest;
  if (typeof run !== "function") {
    fail("potential_output_unavailable", "prescribed-path analysis provider is unavailable");
  }
  let runHandle;
  try {
    runHandle = await run(runRequest);
  } catch (error) {
    fail("potential_output_unavailable", error instanceof Error ? error.message : String(error));
  }
  return extractPotentialSnapshot(runHandle, {
    sampleCount: samplePoints.length,
    transmitterCount: transmitters.length,
  });
}

function formatIdNumber(value) {
  return String(value).replaceAll(".", "_").replaceAll("-", "neg_");
}

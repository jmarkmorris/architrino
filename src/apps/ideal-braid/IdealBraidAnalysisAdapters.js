import {
  PRESCRIBED_PATH_ANALYSIS_ID,
  runPrescribedPathAnalysisRequest,
} from "../../prescribed-path-analysis/PrescribedPathAnalysis.mjs";
import {
  normalizeNonnegativeNumber,
  normalizePositiveInteger,
  normalizePositiveNumber,
} from "./IdealBraidNumeric.js";

const DEFAULT_SOLVER_MEMORY_BUDGET_BYTES = 64 * 1024 * 1024;
const DEFAULT_FLIGHT_TIME_TOLERANCE = 1e-12;
const DEFAULT_FLIGHT_TIME_TRANSMITTER_HISTORY_DEPTH = 10;

export const IDEAL_BRAID_POTENTIAL_SOFTENING = 0.08;

export function createIdealBraidPotentialSamplesRunRequest(
  samplePoints,
  model,
  observationTime,
  options = {}
) {
  const points = normalizeSolverSamplePoints(samplePoints);
  const architrinos = normalizeSolverArchitrinos(model);
  const fieldSpeed = Math.max(
    0.001,
    Number(options.fieldSpeed ?? model?.fieldSpeed ?? 1) || 1
  );
  const iterations = Math.max(1, Math.round(Number(options.iterations ?? 4) || 4));
  const tolerance = normalizeNonnegativeSolverNumber(
    options.tolerance,
    DEFAULT_FLIGHT_TIME_TOLERANCE
  );
  const memoryBudgetBytes = normalizePositiveSolverInteger(
    options.memoryBudgetBytes,
    DEFAULT_SOLVER_MEMORY_BUDGET_BYTES
  );
  const transmitters = architrinos.map((architrino) =>
    createIdealBraidFlightTimeTransmitterSegment(architrino, observationTime, options)
  );
  const delayedPotentials = points.flatMap((samplePoint) =>
    architrinos.map((architrino, transmitterIndex) => ({
      transmitter: cloneSolverSegment(transmitters[transmitterIndex]),
      samplePoint: vectorToPrescribedPathAnalysis(samplePoint),
      observationTime: Number(observationTime) || 0,
      fieldSpeed,
      normalization: Number(options.normalization ?? 1) || 1,
      softening: Math.max(
        0.0001,
        Number(options.softening ?? IDEAL_BRAID_POTENTIAL_SOFTENING) ||
          IDEAL_BRAID_POTENTIAL_SOFTENING
      ),
      transmitterCharge: Number(options.transmitterCharge ?? architrino?.q ?? 1) || 1,
      iterations,
      useCausalDenominator: options.useCausalDenominator === true,
    }))
  );
  const runId =
    options.runId ??
    `ideal-braid-potential-samples-${formatSolverIdNumber(observationTime)}-${points.length}x${architrinos.length}`;
  return {
    appId: "ideal-braid",
    runKind: "sharedGeometry",
    requestId: options.requestId ?? `${runId}-request`,
    runId,
    datasetId: options.datasetId ?? `${runId}-dataset`,
    claimLevel: options.claimLevel ?? "interactive-preview",
    precisionPath: options.precisionPath ?? "auto",
    configVersion: options.configVersion ?? "ideal-braid-potential-samples-adapter.v1",
    configHash:
      options.configHash ??
      `ideal-braid-potential-samples:${formatSolverIdNumber(observationTime)}:${points.length}:${architrinos.length}`,
    model: options.model ?? createDefaultIdealBraidPotentialSamplesModel(),
    envelope:
      options.envelope ??
      createDefaultIdealBraidPotentialSamplesEnvelope({
        transmitters,
        observationTime,
        sampleCount: points.length,
        transmitterCount: architrinos.length,
        memoryBudgetBytes,
      }),
    errorBudget: options.errorBudget ?? createDefaultIdealBraidErrorBudget(tolerance),
    config: {
      geometryRequest: {
        delayedPotentials,
      },
    },
    output: options.output ?? {
      outputs: ["geometryBuffer", "diagnostics"],
      streamTarget: options.streamTarget ?? "caller-buffer",
      memoryBudgetBytes,
      deterministic: options.deterministic ?? true,
    },
  };
}

export async function computePotentialSamplesWithPrescribedPathAnalysis(
  samplePoints,
  model,
  observationTime,
  options = {}
) {
  const points = normalizeSolverSamplePoints(samplePoints);
  const architrinos = normalizeSolverArchitrinos(model);
  const runRequest =
    options.runRequest ??
    createIdealBraidPotentialSamplesRunRequest(points, model, observationTime, options);
  const run = options.runPrescribedPathAnalysis ?? runPrescribedPathAnalysisRequest;
  const runHandle = await run(runRequest);
  return extractIdealBraidPotentialSamplesSnapshot(runHandle, {
    sampleCount: points.length,
    transmitterCount: architrinos.length,
  });
}

function extractIdealBraidPotentialSamplesSnapshot(
  runHandle = {},
  { sampleCount = 0, transmitterCount = 0 } = {}
) {
  const response = runHandle.response ?? runHandle;
  const geometry = response.geometry ?? response;
  const rows = Array.isArray(geometry.delayedPotentials) ? geometry.delayedPotentials : [];
  const samplePotentials = Array.from({ length: sampleCount }, () => 0);
  const contributionsBySample = Array.from({ length: sampleCount }, () => []);
  const rowTransmitterCount = Math.max(1, transmitterCount);
  rows.forEach((row, rowIndex) => {
    const itemIndex = Number.isInteger(row.itemIndex) ? row.itemIndex : rowIndex;
    const sampleIndex = Math.floor(itemIndex / rowTransmitterCount);
    if (sampleIndex < 0 || sampleIndex >= sampleCount) {
      return;
    }
    contributionsBySample[sampleIndex].push(row);
    if (row.statusCode !== 0) {
      return;
    }
    const potential = Number(row.potential);
    if (Number.isFinite(potential)) {
      samplePotentials[sampleIndex] += potential;
    }
  });
  const maxAbs = Math.max(0.0001, ...samplePotentials.map((value) => Math.abs(value)));
  const min = samplePotentials.length > 0 ? Math.min(...samplePotentials) : 0;
  const max = samplePotentials.length > 0 ? Math.max(...samplePotentials) : 0;
  return {
    analysisId: PRESCRIBED_PATH_ANALYSIS_ID,
    runId: response.runId ?? runHandle.runId ?? "",
    datasetId: response.datasetId ?? runHandle.datasetId ?? "",
    samplePotentials,
    contributionsBySample,
    delayedPotentials: rows,
    surfaceRange: { min, max, maxAbs },
    status: response.status ?? runHandle.status ?? geometry.status,
  };
}

function createIdealBraidFlightTimeTransmitterSegment(architrino, observationTime, options = {}) {
  if (options.transmitterSegment && typeof options.transmitterSegment === "object") {
    return cloneSolverSegment(options.transmitterSegment);
  }
  const endTime = Number.isFinite(Number(options.transmitterEndTime))
    ? Number(options.transmitterEndTime)
    : Number(observationTime) || 0;
  const historyDepth = normalizePositiveNumber(
    options.transmitterHistoryDepth,
    DEFAULT_FLIGHT_TIME_TRANSMITTER_HISTORY_DEPTH
  );
  const startTime = Number.isFinite(Number(options.transmitterStartTime))
    ? Number(options.transmitterStartTime)
    : endTime - historyDepth;
  const linearizationTime = Number.isFinite(Number(options.transmitterLinearizationTime))
    ? Number(options.transmitterLinearizationTime)
    : endTime;
  const velocity =
    typeof architrino?.velocityAt === "function"
      ? vectorToPrescribedPathAnalysis(architrino.velocityAt(linearizationTime))
      : vectorToPrescribedPathAnalysis(architrino?.velocity);
  const anchorPosition =
    typeof architrino?.positionAt === "function"
      ? vectorToPrescribedPathAnalysis(architrino.positionAt(linearizationTime))
      : vectorToPrescribedPathAnalysis(architrino?.position ?? architrino);
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
    errorBound: normalizeNonnegativeNumber(options.transmitterErrorBound, 0),
  };
}

function cloneSolverSegment(segment = {}) {
  return {
    startTime: Number(segment.startTime) || 0,
    endTime: Number(segment.endTime) || 0,
    positionAtStart: vectorToPrescribedPathAnalysis(segment.positionAtStart ?? segment.start),
    velocity: vectorToPrescribedPathAnalysis(segment.velocity),
    errorBound: normalizeNonnegativeNumber(segment.errorBound, 0),
  };
}

function createDefaultIdealBraidPotentialSamplesModel() {
  return {
    modelId: "aaa.ideal-braid",
    equationVersion: "delayed-potential-samples-v1",
    forceLawVersion: "causal-delay-v1",
    constantsHash: "constants:ideal-braid",
    causalSpeedPolicy: "field-speed",
    branchPolicy: "batched-linear-transmitter-segments",
    unitConvention: "relative",
    compatiblePrecisionPaths: ["scaled_f64_strict", "event_root_focused", "extended_precision"],
  };
}

function createDefaultIdealBraidPotentialSamplesEnvelope({
  transmitters = [],
  observationTime,
  sampleCount = 0,
  transmitterCount = 0,
  memoryBudgetBytes,
} = {}) {
  const startTime = Math.min(
    ...transmitters.map((transmitter) => Number(transmitter?.startTime)).filter(Number.isFinite),
    Number(observationTime) || 0
  );
  const endTime = Number.isFinite(Number(observationTime)) ? Number(observationTime) : startTime;
  const duration = Math.max(0, endTime - startTime);
  const stepHint = duration > 0 ? duration / 64 : 1;
  return {
    entityCount: transmitterCount,
    assemblyCount: Math.max(1, transmitterCount),
    timeWindow: { start: startTime, end: endTime, stepHint, units: "seconds" },
    timeResolutionHint: stepHint,
    interactionPolicy: "batched-delayed-potential-surface",
    expectedBranchComplexity: "medium",
    outputDetail: "geometry",
    memoryBudgetBytes,
    storageBudgetBytes: memoryBudgetBytes,
    latencyTarget: "interactive",
    simplificationPolicy: "linear-transmitter-segments",
    sampleCount,
    transmitterCount,
  };
}

function createDefaultIdealBraidErrorBudget(tolerance = DEFAULT_FLIGHT_TIME_TOLERANCE) {
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

function normalizeSolverSamplePoints(samplePoints) {
  const points = Array.isArray(samplePoints) ? samplePoints : [samplePoints];
  return points.filter(Boolean);
}

function normalizeSolverArchitrinos(model) {
  const architrinos = Array.isArray(model?.architrinos) ? model.architrinos : [];
  if (architrinos.length === 0) {
    throw new TypeError("A1 Lorentz Geometry potential sample request requires at least one architrino.");
  }
  return architrinos;
}

function vectorToPrescribedPathAnalysis(value = {}) {
  return {
    x: Number(value?.x) || 0,
    y: Number(value?.y) || 0,
    z: Number(value?.z) || 0,
  };
}

function normalizeNonnegativeSolverNumber(value, fallback) {
  return normalizeNonnegativeNumber(value, fallback);
}

function normalizePositiveSolverInteger(value, fallback) {
  return normalizePositiveInteger(value, fallback);
}

function formatSolverIdNumber(value) {
  return String(Number(value) || 0).replaceAll(".", "_").replaceAll("-", "neg_");
}

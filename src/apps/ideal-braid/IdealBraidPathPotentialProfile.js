import { createIdealBraidSharedGeometryRunRequest } from "../../solver/app/SolverAppAdapters.mjs";
import {
  runSolverAppBridgeRequest,
} from "../../solver/app/SolverAppBridgeClientResolver.mjs";

const QUARTER_TURN = Math.PI / 2;
const NO_FORWARD_SPAN = 0;
const FIELD_SPEED_TOLERANCE = 0.015;
const SELF_HIT_SOLVE_ITERATIONS = 28;
const SELF_HIT_SCAN_SUBDIVISIONS = 72;
const SELF_HIT_TOLERANCE = 1e-12;
const SELF_HIT_MAX_ANGLE = Math.PI * 1.96;
const DEFAULT_SOLVER_MEMORY_BUDGET_BYTES = 64 * 1024 * 1024;
const IDEAL_BRAID_SOLVER_BRIDGE_ENGINE_ID = "architrino-solver-app-bridge";
const DEFAULT_PATH_SPEED_PRODUCTS = Object.freeze({
  inner: 0.5 * 0.42,
  middle: 0.7 * 0.26,
  outer: 0.9 * 0.16,
});

export const BINARY_FIELD_SPEED_RATIOS = Object.freeze({
  inner: DEFAULT_PATH_SPEED_PRODUCTS.inner / DEFAULT_PATH_SPEED_PRODUCTS.middle,
  middle: 1,
  outer: DEFAULT_PATH_SPEED_PRODUCTS.outer / DEFAULT_PATH_SPEED_PRODUCTS.middle,
});

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function lerpNumber(start, end, progress) {
  return start + (end - start) * progress;
}

function normalizeFieldSpeedRatio(value) {
  const ratio = Number(value);
  return Number.isFinite(ratio) && ratio > 0 ? ratio : 1;
}

function normalizeFieldSpeedRatios(values) {
  const ratios = Array.isArray(values) ? values : [values];
  const normalized = ratios.map((value) => normalizeFieldSpeedRatio(value));
  return normalized.length > 0 ? normalized : [1];
}

function getBinaryId(binaryOrId) {
  return typeof binaryOrId === "string" ? binaryOrId : binaryOrId?.id;
}

export function getBinaryFieldSpeedRatio(binaryOrId) {
  const explicitRatio =
    typeof binaryOrId === "object" && binaryOrId ? binaryOrId.fieldSpeedRatio : undefined;
  return normalizeFieldSpeedRatio(
    explicitRatio ?? BINARY_FIELD_SPEED_RATIOS[getBinaryId(binaryOrId)]
  );
}

export function getFieldSpeedRegimeLabel(fieldSpeedRatio) {
  const ratio = normalizeFieldSpeedRatio(fieldSpeedRatio);
  if (ratio < 1 - FIELD_SPEED_TOLERANCE) {
    return "slower";
  }
  if (ratio > 1 + FIELD_SPEED_TOLERANCE) {
    return "faster";
  }
  return "field speed";
}

export function createIdealBraidCircularSelfHitSpanRunRequest(fieldSpeedRatio, options = {}) {
  return createIdealBraidCircularSelfHitSpansRunRequest([fieldSpeedRatio], options);
}

export function createIdealBraidCircularSelfHitSpansRunRequest(fieldSpeedRatios, options = {}) {
  const ratios = normalizeFieldSpeedRatios(fieldSpeedRatios);
  const tolerance = normalizeNonnegativeNumber(options.tolerance, SELF_HIT_TOLERANCE);
  const fieldSpeedTolerance = normalizeNonnegativeNumber(
    options.fieldSpeedTolerance,
    FIELD_SPEED_TOLERANCE
  );
  const maxAngle = normalizePositiveNumber(options.maxAngle, SELF_HIT_MAX_ANGLE);
  const maxIterations = normalizePositiveInteger(options.maxIterations, SELF_HIT_SOLVE_ITERATIONS);
  const scanSubdivisions = normalizePositiveInteger(
    options.scanSubdivisions,
    SELF_HIT_SCAN_SUBDIVISIONS
  );
  const memoryBudgetBytes = normalizePositiveInteger(
    options.memoryBudgetBytes,
    DEFAULT_SOLVER_MEMORY_BUDGET_BYTES
  );
  const ratioId = ratios.map((ratio) => ratio.toString().replaceAll(".", "_")).join("-");
  const runId = options.runId ?? `ideal-braid-self-hit-${ratioId}`;
  return createIdealBraidSharedGeometryRunRequest({
    requestId: options.requestId ?? `${runId}-request`,
    runId,
    datasetId: options.datasetId ?? `${runId}-dataset`,
    claimLevel: options.claimLevel ?? "interactive-preview",
    precisionPath: options.precisionPath ?? "auto",
    configVersion: options.configVersion ?? "ideal-braid-circular-self-hit-adapter.v1",
    configHash: options.configHash ?? `ideal-braid-circular-self-hit:${ratios.join(",")}`,
    model: options.model ?? createDefaultIdealBraidGeometryModel(),
    envelope: options.envelope ?? createDefaultIdealBraidGeometryEnvelope({
      fieldSpeedRatio: Math.max(...ratios),
      memoryBudgetBytes,
    }),
    errorBudget: options.errorBudget ?? createDefaultIdealBraidGeometryErrorBudget(tolerance),
    geometryRequest: {
      circularSelfHitSpans: ratios.map((ratio) => ({
        fieldSpeedRatio: ratio,
        fieldSpeedTolerance,
        tolerance,
        maxIterations,
        scanSubdivisions,
        maxAngle,
      })),
    },
    output: options.output ?? {
      outputs: ["geometryBuffer", "diagnostics"],
      streamTarget: options.streamTarget ?? "caller-buffer",
      memoryBudgetBytes,
      deterministic: options.deterministic ?? true,
    },
  });
}

export async function solveCircularSelfHitSpanWithSolverBridge(fieldSpeedRatio, options = {}) {
  const row = await solveCircularSelfHitSpanRowWithSolverBridge(fieldSpeedRatio, options);
  return Number(row.span) || 0;
}

export async function solveCircularSelfHitSpanRowWithSolverBridge(fieldSpeedRatio, options = {}) {
  const rows = await solveCircularSelfHitSpanRowsWithSolverBridge([fieldSpeedRatio], options);
  if (rows.length === 0) {
    throw new Error("Ideal Braid solver bridge response did not include a circular self-hit span row.");
  }
  return rows[0];
}

export async function solveCircularSelfHitSpanRowsWithSolverBridge(
  fieldSpeedRatios,
  options = {}
) {
  const runRequest =
    options.runRequest ??
    createIdealBraidCircularSelfHitSpansRunRequest(fieldSpeedRatios, options);
  const runHandle = typeof options.runSolverBridge === "function"
    ? await options.runSolverBridge(runRequest)
    : await runIdealBraidSolverBridgeClient(options, fieldSpeedRatios, runRequest);
  return extractCircularSelfHitSpanRows(runHandle);
}

async function runIdealBraidSolverBridgeClient(options, fieldSpeedRatios, runRequest) {
  return runSolverAppBridgeRequest({
    appId: "ideal-braid",
    request: runRequest,
    options,
    factoryRequest: {
      fieldSpeedRatio: normalizeFieldSpeedRatios(fieldSpeedRatios)[0],
      fieldSpeedRatios: normalizeFieldSpeedRatios(fieldSpeedRatios),
    },
    requestedCapabilities: ["sharedGeometry", "delayedHits"],
    storagePolicy: {
      target: options.streamTarget ?? "caller-buffer",
      durable: options.streamTarget === "native-file",
      maxBytes: options.memoryBudgetBytes ?? DEFAULT_SOLVER_MEMORY_BUDGET_BYTES,
    },
    threadingPolicy: {
      mode: options.threadingMode ?? "single-thread",
      deterministic: options.deterministic ?? true,
    },
    missingClientMessage:
      "Ideal Braid solver bridge request requires a solver client, runSolverBridge option, client factory, worker, or solver WASM module factory.",
  });
}

function extractCircularSelfHitSpanRows(runHandle = {}) {
  const response = runHandle.response ?? runHandle;
  const geometry = response.geometry ?? response;
  const rows = Array.isArray(geometry.circularSelfHitSpans) ? geometry.circularSelfHitSpans : [];
  if (rows.length === 0) {
    throw new Error("Ideal Braid solver bridge response did not include a circular self-hit span row.");
  }
  return rows.map((row) => ({
    solverEngineId: IDEAL_BRAID_SOLVER_BRIDGE_ENGINE_ID,
    runId: response.runId ?? runHandle.runId ?? "",
    datasetId: response.datasetId ?? runHandle.datasetId ?? "",
    ...row,
  }));
}

function createDefaultIdealBraidGeometryModel() {
  return {
    modelId: "aaa.ideal-braid",
    equationVersion: "circular-self-hit-v1",
    forceLawVersion: "causal-delay-v1",
    constantsHash: "constants:ideal-braid",
    causalSpeedPolicy: "field-speed-ratio",
    branchPolicy: "first-positive-self-hit",
    unitConvention: "dimensionless-ratio",
    compatiblePrecisionPaths: ["scaled_f64_strict", "event_root_focused", "extended_precision"],
  };
}

function createDefaultIdealBraidGeometryEnvelope({
  fieldSpeedRatio,
  memoryBudgetBytes,
} = {}) {
  return {
    entityCount: 1,
    assemblyCount: 1,
    timeWindow: {
      start: 0,
      end: SELF_HIT_MAX_ANGLE / (Math.PI * 2),
      stepHint: 1 / (SELF_HIT_SCAN_SUBDIVISIONS * 2),
      units: "cycles",
    },
    timeResolutionHint: 1 / (SELF_HIT_SCAN_SUBDIVISIONS * 2),
    interactionPolicy: "single-path-self-hit",
    expectedBranchComplexity:
      normalizeFieldSpeedRatio(fieldSpeedRatio) > 1 + FIELD_SPEED_TOLERANCE ? "medium" : "low",
    outputDetail: "geometry",
    memoryBudgetBytes,
    storageBudgetBytes: memoryBudgetBytes,
    latencyTarget: "interactive",
    simplificationPolicy: "none",
  };
}

function createDefaultIdealBraidGeometryErrorBudget(tolerance = SELF_HIT_TOLERANCE) {
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

function normalizePositiveNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function normalizeNonnegativeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
}

function normalizePositiveInteger(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? Math.max(1, Math.round(number)) : fallback;
}

function createSubFieldProfile(fieldSpeedRatio) {
  const subProgress = clampNumber((1 - fieldSpeedRatio) / 0.3, 0, 1);
  return {
    fieldSpeedRatio,
    regime: getFieldSpeedRegimeLabel(fieldSpeedRatio),
    forwardSpan: QUARTER_TURN,
    backwardSpan: lerpNumber(QUARTER_TURN, Math.PI / 6, subProgress),
    falloff: lerpNumber(0.95, 1.05, subProgress),
    forwardGain: lerpNumber(1.12, 1, subProgress),
    backwardGain: lerpNumber(1.05, 0.72, subProgress),
    forwardWidthScale: lerpNumber(1, 0.58, subProgress),
    wakeWidthScale: lerpNumber(1.2, 2.65, subProgress),
    selfHitSpan: 0,
  };
}

function createFieldSpeedProfile() {
  return {
    fieldSpeedRatio: 1,
    regime: "field speed",
    forwardSpan: NO_FORWARD_SPAN,
    backwardSpan: QUARTER_TURN,
    falloff: 0.78,
    forwardGain: 0,
    backwardGain: 1.35,
    forwardWidthScale: 1,
    wakeWidthScale: 1.52,
    selfHitSpan: 0,
  };
}

function createSuperFieldProfile(fieldSpeedRatio, selfHitSpanInput = 0) {
  const superProgress = clampNumber((fieldSpeedRatio - 1) / 0.35, 0, 1);
  const selfHitSpan = normalizeNonnegativeNumber(selfHitSpanInput, 0);
  const displayedSpan = selfHitSpan > 0 ? selfHitSpan : QUARTER_TURN;
  return {
    fieldSpeedRatio,
    regime: getFieldSpeedRegimeLabel(fieldSpeedRatio),
    forwardSpan: NO_FORWARD_SPAN,
    backwardSpan: clampNumber(displayedSpan, QUARTER_TURN, Math.PI * 0.92),
    falloff: lerpNumber(0.85, 0.72, superProgress),
    forwardGain: 0,
    backwardGain: lerpNumber(0.78, 0.9, superProgress),
    forwardWidthScale: 1,
    wakeWidthScale: lerpNumber(1.05, 1.26, superProgress),
    selfHitSpan,
    solverProfileStatus: selfHitSpan > 0 ? "solver-row" : "pending-solver-row",
  };
}

export function getOrbitPathTintProfile(binaryOrId, options = {}) {
  const fieldSpeedRatio = getBinaryFieldSpeedRatio(binaryOrId);
  if (fieldSpeedRatio < 1 - FIELD_SPEED_TOLERANCE) {
    return createSubFieldProfile(fieldSpeedRatio);
  }
  if (fieldSpeedRatio > 1 + FIELD_SPEED_TOLERANCE) {
    return createSuperFieldProfile(fieldSpeedRatio, resolveSelfHitSpan(binaryOrId, options));
  }
  return createFieldSpeedProfile();
}

export async function getOrbitPathTintProfileWithSolverBridge(binaryOrId, options = {}) {
  const fieldSpeedRatio = getBinaryFieldSpeedRatio(binaryOrId);
  if (fieldSpeedRatio <= 1 + FIELD_SPEED_TOLERANCE) {
    return getOrbitPathTintProfile(binaryOrId, options);
  }
  const row = await solveCircularSelfHitSpanRowWithSolverBridge(fieldSpeedRatio, options);
  return {
    ...createSuperFieldProfile(fieldSpeedRatio, row.span),
    solverEngineId: row.solverEngineId,
    solverRunId: row.runId,
    solverDatasetId: row.datasetId,
    solverRow: row,
  };
}

export function getOrbitPathBranchGain(profile, travelSign) {
  return travelSign > 0 ? profile.forwardGain : profile.backwardGain;
}

function resolveSelfHitSpan(binaryOrId, options = {}) {
  const explicitSpan = Number(options.selfHitSpan);
  if (Number.isFinite(explicitSpan) && explicitSpan >= 0) {
    return explicitSpan;
  }
  if (typeof options.selfHitSpanByBinaryId === "function") {
    return normalizeNonnegativeNumber(
      options.selfHitSpanByBinaryId(getBinaryId(binaryOrId)),
      0
    );
  }
  if (options.selfHitSpanByBinaryId && typeof options.selfHitSpanByBinaryId === "object") {
    return normalizeNonnegativeNumber(
      options.selfHitSpanByBinaryId[getBinaryId(binaryOrId)],
      0
    );
  }
  const binarySpan = Number(binaryOrId?.solverSelfHitSpan);
  return Number.isFinite(binarySpan) && binarySpan >= 0 ? binarySpan : 0;
}

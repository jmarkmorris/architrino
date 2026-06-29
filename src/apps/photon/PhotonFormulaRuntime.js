import {
  createPhotonCausalRootsRunRequest,
  createSharedGeometryRunRequest,
} from "../../solver/app/SolverAppAdapters.mjs";
import {
  runSolverAppBridgeRequest,
} from "../../solver/app/SolverAppBridgeClientResolver.mjs";
import {
  createMovingCircularSourceLinearizedRootRequests,
  createMovingCircularSameSourceRootRequest,
  createMovingCircularSourceRootRequest,
  evaluateLinearHistoryPoint,
  evaluateMovingCircularSourceHistory,
  solveMovingCircularSameSourceCausalRoots,
  solveMovingCircularSourceCausalRoots,
} from "../../solver/app/AbsoluteHistoryRootRuntime.mjs";
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
  resolvePhotonSpeedSettings,
} from "./PhotonStateRuntime.js";

const TWO_PI = Math.PI * 2;
const EPSILON = 1e-9;
const MIN_FIELD_DISTANCE = 0.08;
const ROOT_SCAN_MIN_STEPS = 48;
const ROOT_SCAN_MAX_STEPS = 720;
const ROOT_SCAN_STEPS_PER_CYCLE = 40;
const DEFAULT_ABSOLUTE_HISTORY_SEGMENTS = 24;
const DEFAULT_ABSOLUTE_HISTORY_CYCLES = 2;
const DEFAULT_SELF_HIT_TOLERANCE = 1e-12;
const DEFAULT_SELF_HIT_FIELD_SPEED_TOLERANCE = 0.015;
const DEFAULT_SELF_HIT_SOLVE_ITERATIONS = 28;
const DEFAULT_SELF_HIT_SCAN_SUBDIVISIONS = 96;
const DEFAULT_SELF_HIT_MAX_ANGLE = TWO_PI;
const JACOBIAN_FLOOR = 1e-4;
const DEFAULT_ANALYZER_AVERAGE_SAMPLES = 48;
const DEFAULT_POLARIZATION_FIT_SAMPLES = 144;
const DEFAULT_SOLVER_MEMORY_BUDGET_BYTES = 64 * 1024 * 1024;
const DEFAULT_PHOTON_ROOT_TOLERANCE = 1e-12;
const PHOTON_SOLVER_BRIDGE_ENGINE_ID = "architrino-solver-app-bridge";
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
  const speedSettings = resolvePhotonSpeedSettings(state);
  const signalSpeedCf = Math.max(EPSILON, speedSettings.signalSpeedCf);
  const photonSpeedCf = Math.max(0, speedSettings.photonSpeedCf);
  return {
    virtualObserver: {
      x: Number(state?.measurement?.virtualObserver?.x ?? 0) || 0,
      y: Number(state?.measurement?.virtualObserver?.y ?? 0) || 0,
      z: Number(state?.measurement?.virtualObserver?.z ?? 0) || 0,
    },
    signalSpeedCf,
    emissionSpeedCf: signalSpeedCf,
    photonSpeedCf,
    speedMode: speedSettings.speedMode,
    localLorentzFactor: speedSettings.localLorentzFactor,
    sourceHistoryMode: state?.measurement?.sourceHistoryMode === "absolute_history"
      ? "absolute_history"
      : "co_moving",
  };
}

function getPhotonBraidCenterX(state, braidId) {
  const fallbackSeparation = getPhotonSeparationReferenceRadius(state);
  const separation = Math.max(0, Number(state?.pair?.pairSeparation) || fallbackSeparation);
  return braidId === "left" ? -separation / 2 : separation / 2;
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

function getPhotonSourceMaxDelay(state, sourceRef, measurement) {
  const layer = getPhotonLayer(state, sourceRef.braidId, sourceRef.layerId);
  const centerX = getPhotonBraidCenterX(state, sourceRef.braidId);
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

export function createPhotonCausalRootsSolverRunRequest(rootRequest, options = {}) {
  const memoryBudgetBytes = normalizePositiveSolverInteger(
    options.memoryBudgetBytes,
    DEFAULT_SOLVER_MEMORY_BUDGET_BYTES
  );
  const runId = options.runId ?? `photon-causal-roots-${formatSolverIdNumber(rootRequest?.hitTime)}`;
  return createPhotonCausalRootsRunRequest({
    requestId: options.requestId ?? `${runId}-request`,
    runId,
    datasetId: options.datasetId ?? `${runId}-dataset`,
    claimLevel: options.claimLevel ?? "migration-parity",
    precisionPath: options.precisionPath ?? "auto",
    configVersion: options.configVersion ?? "photon-causal-roots-linear-adapter.v1",
    configHash: options.configHash ?? `photon-causal-roots:${formatSolverIdNumber(rootRequest?.hitTime)}`,
    model: options.model ?? createDefaultPhotonCausalRootsModel(),
    envelope: options.envelope ?? createDefaultPhotonCausalRootsEnvelope({
      rootRequest,
      memoryBudgetBytes,
    }),
    errorBudget: options.errorBudget ?? createDefaultPhotonCausalRootsErrorBudget(
      rootRequest?.rootTolerance ?? options.tolerance
    ),
    rootRequest,
    output: options.output ?? {
      outputs: ["rootLedger", "delayedHitEvents", "diagnostics"],
      streamTarget: options.streamTarget ?? "caller-buffer",
      memoryBudgetBytes,
      deterministic: options.deterministic ?? true,
    },
  });
}

export async function solvePhotonCausalRootsWithSolverBridge(rootRequest, options = {}) {
  const runHandle = await runPhotonCausalRootsWithSolverBridge(rootRequest, options);
  return Array.isArray(runHandle.response?.roots) ? runHandle.response.roots : [];
}

export function createPhotonCircularSourceCausalRootRequest(
  state,
  sourceRef,
  observationTime,
  options = {}
) {
  const measurement = options.measurement ?? resolvePhotonMeasurementParameters(state);
  const layer = getPhotonLayer(state, sourceRef.braidId, sourceRef.layerId);
  const hitTime = Number(observationTime) || 0;
  const maxDelay = normalizeNonnegativeSolverNumber(
    options.maxDelay,
    getPhotonSourceMaxDelay(state, sourceRef, measurement)
  );
  const sourceEndTime = Number.isFinite(Number(options.sourceEndTime))
    ? Number(options.sourceEndTime)
    : hitTime;
  const sourceStartTime = Number.isFinite(Number(options.sourceStartTime))
    ? Number(options.sourceStartTime)
    : sourceEndTime - maxDelay;
  const frequency = Math.max(0, Math.abs(Number(layer.frequencyHz) || 0));
  const scanSubdivisions = normalizePositiveSolverInteger(
    options.scanSubdivisions,
    Math.min(
      ROOT_SCAN_MAX_STEPS,
      Math.max(ROOT_SCAN_MIN_STEPS, Math.ceil(maxDelay * frequency * ROOT_SCAN_STEPS_PER_CYCLE))
    )
  );
  const radius = Number(layer.radius) || 0;
  const centerX = getPhotonBraidCenterX(state, sourceRef.braidId);
  const angularVelocity = getPhotonDirectionSign(state, sourceRef.braidId) *
    TWO_PI *
    (Number(layer.frequencyHz) || 0);

  const request = {
    source: {
      startTime: sourceStartTime,
      endTime: sourceEndTime,
      center: { x: centerX, y: 0, z: 0 },
      radiusU: { x: 0, y: radius, z: 0 },
      radiusV: { x: 0, y: 0, z: radius },
      angularVelocity,
      phaseAtEpoch: getPhotonLayerAngleRadians(
        state,
        sourceRef.braidId,
        sourceRef.layerId,
        0,
        sourceRef.chargeType
      ),
      epochTime: 0,
      errorBound: options.sourceErrorBound ?? 0,
    },
    receiver: {
      startTime: Math.min(sourceStartTime, hitTime),
      endTime: Math.max(sourceEndTime, hitTime),
      positionAtStart: measurement.virtualObserver,
      velocity: { x: 0, y: 0, z: 0 },
      errorBound: options.receiverErrorBound ?? 0,
    },
    hitTime,
    signalSpeed: measurement.emissionSpeedCf,
    rootTolerance: options.rootTolerance ?? DEFAULT_PHOTON_ROOT_TOLERANCE,
    maxIterations: options.maxIterations ?? 96,
    scanSubdivisions,
    maxRoots: normalizePositiveSolverInteger(options.maxRoots, Math.max(16, scanSubdivisions + 1)),
  };
  if (typeof options.streamId === "string" && options.streamId.length > 0) {
    request.streamId = options.streamId;
  }
  return request;
}

export async function solvePhotonCircularSourceRootsHitsLedgerWithSolverBridge(
  state,
  sourceRef,
  observationTime,
  options = {}
) {
  const request = options.request ??
    createPhotonCircularSourceCausalRootRequest(state, sourceRef, observationTime, options);
  const response = typeof options.solveCircularSourceRootsHitsLedger === "function"
    ? await options.solveCircularSourceRootsHitsLedger(request)
    : await runPhotonCircularSourceSolverBridgeClient(options, request);
  return {
    solverEngineId: PHOTON_SOLVER_BRIDGE_ENGINE_ID,
    ...response,
  };
}

export async function solvePhotonCircularSourceCausalRootsWithSolverBridge(
  state,
  sourceRef,
  observationTime,
  options = {}
) {
  const response = await solvePhotonCircularSourceRootsHitsLedgerWithSolverBridge(
    state,
    sourceRef,
    observationTime,
    options
  );
  return Array.isArray(response?.roots) ? response.roots : [];
}

export async function runPhotonCausalRootsWithSolverBridge(rootRequest, options = {}) {
  const runRequest =
    options.runRequest ?? createPhotonCausalRootsSolverRunRequest(rootRequest, options);
  const runHandle = typeof options.runSolverBridge === "function"
    ? await options.runSolverBridge(runRequest)
    : await runPhotonSolverBridgeClient(options, rootRequest, runRequest);
  return {
    solverEngineId: PHOTON_SOLVER_BRIDGE_ENGINE_ID,
    ...runHandle,
  };
}

async function runPhotonSolverBridgeClient(options, rootRequest, runRequest) {
  return runSolverAppBridgeRequest({
    appId: "photon",
    request: runRequest,
    options,
    factoryRequest: rootRequest,
    requestedCapabilities: ["causalRoots", "delayedHits"],
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
      "Photon solver bridge request requires a solver client, runSolverBridge option, client factory, worker, or solver WASM module factory.",
  });
}

async function runPhotonCircularSourceSolverBridgeClient(options, request) {
  return runSolverAppBridgeRequest({
    appId: "photon",
    methodName: "solveCircularSourceRootsHitsLedgerF64",
    request,
    options,
    factoryRequest: request,
    requestedCapabilities: ["causalRoots", "delayedHits"],
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
      "Photon circular-source solver bridge request requires a solver client, solveCircularSourceRootsHitsLedger option, client factory, worker, or solver WASM module factory.",
  });
}

function createDefaultPhotonCausalRootsModel() {
  return {
    modelId: "aaa.photon",
    equationVersion: "causal-root-linear-source-v1",
    forceLawVersion: "causal-delay-v1",
    constantsHash: "constants:photon",
    causalSpeedPolicy: "fixed-field-speed",
    branchPolicy: "all-positive-roots",
    unitConvention: "relative",
    compatiblePrecisionPaths: ["scaled_f64_strict", "event_root_focused", "extended_precision"],
  };
}

function createDefaultPhotonCausalRootsEnvelope({
  rootRequest,
  memoryBudgetBytes,
} = {}) {
  const sourceStart = Number(rootRequest?.source?.startTime) || 0;
  const receiverStart = Number(rootRequest?.receiver?.startTime) || 0;
  const hitTime = Number(rootRequest?.hitTime) || 0;
  const start = Math.min(sourceStart, receiverStart, hitTime);
  const end = Math.max(
    Number(rootRequest?.source?.endTime) || hitTime,
    Number(rootRequest?.receiver?.endTime) || hitTime,
    hitTime
  );
  const duration = Math.max(0, end - start);
  const stepHint = duration > 0 ? duration / 64 : 1;
  return {
    entityCount: 2,
    assemblyCount: 0,
    timeWindow: { start, end, stepHint, units: "seconds" },
    timeResolutionHint: stepHint,
    interactionPolicy: "single-source-receiver-causal-root",
    expectedBranchComplexity: "low",
    outputDetail: "root-ledger",
    memoryBudgetBytes,
    storageBudgetBytes: memoryBudgetBytes,
    latencyTarget: "interactive",
    simplificationPolicy: "linear-source-and-receiver-segments",
  };
}

function createDefaultPhotonCausalRootsErrorBudget(tolerance = DEFAULT_PHOTON_ROOT_TOLERANCE) {
  const normalizedTolerance = normalizeNonnegativeSolverNumber(tolerance, DEFAULT_PHOTON_ROOT_TOLERANCE);
  return {
    globalTolerance: normalizedTolerance,
    rootIsolationTolerance: normalizedTolerance,
    delayedHitTolerance: normalizedTolerance,
    integrationTolerance: normalizedTolerance,
    streamEncodingTolerance: normalizedTolerance,
    readbackTolerance: normalizedTolerance,
    projectionTolerance: 1e-9,
    displayTolerance: 1e-6,
  };
}

function createDefaultPhotonSelfHitGeometryModel() {
  return {
    modelId: "aaa.photon",
    equationVersion: "circular-helical-self-hit-v1",
    forceLawVersion: "causal-delay-v1",
    constantsHash: "constants:photon",
    causalSpeedPolicy: "branch-signal-speed-ratio",
    branchPolicy: "first-positive-same-source-root",
    unitConvention: "relative-speed-ratio",
    compatiblePrecisionPaths: ["scaled_f64_strict", "event_root_focused", "extended_precision"],
  };
}

function createDefaultPhotonSelfHitGeometryEnvelope({
  rows = [],
  memoryBudgetBytes = DEFAULT_SOLVER_MEMORY_BUDGET_BYTES,
} = {}) {
  const maxRatio = rows.reduce(
    (maximum, row) => Math.max(maximum, Number(row.fieldSpeedRatio) || 0),
    0
  );
  return {
    entityCount: rows.length,
    assemblyCount: rows.length > 0 ? 1 : 0,
    timeWindow: {
      start: 0,
      end: DEFAULT_SELF_HIT_MAX_ANGLE / TWO_PI,
      stepHint: 1 / (DEFAULT_SELF_HIT_SCAN_SUBDIVISIONS * 2),
      units: "cycles",
    },
    timeResolutionHint: 1 / (DEFAULT_SELF_HIT_SCAN_SUBDIVISIONS * 2),
    interactionPolicy: "same-source-enabled",
    expectedBranchComplexity:
      maxRatio > 1 + DEFAULT_SELF_HIT_FIELD_SPEED_TOLERANCE ? "medium" : "low",
    outputDetail: "geometry",
    memoryBudgetBytes,
    storageBudgetBytes: memoryBudgetBytes,
    latencyTarget: "interactive",
    simplificationPolicy: "circular-self-hit-span",
  };
}

function normalizePositiveSolverInteger(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? Math.max(1, Math.round(number)) : fallback;
}

function normalizeNonnegativeSolverNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
}

function normalizePositiveSolverNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function formatSolverIdNumber(value) {
  return String(Number(value) || 0).replaceAll(".", "_").replaceAll("-", "neg_");
}

export function getPhotonArchitrinoKinematics(state, braidId, layerId, chargeType, timeSeconds) {
  const layer = getPhotonLayer(state, braidId, layerId);
  const directionSign = getPhotonDirectionSign(state, braidId);
  const angle = getPhotonLayerAngleRadians(state, braidId, layerId, timeSeconds, chargeType);
  const angularVelocity = directionSign * TWO_PI * layer.frequencyHz;
  const radius = layer.radius;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const centerX = getPhotonBraidCenterX(state, braidId);
  return {
    braidId,
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

function getPhotonAbsoluteObserverPositionAtTime(measurement, timeSeconds) {
  const photonSpeed = Number(measurement.photonSpeedCf) || 0;
  return {
    x: measurement.virtualObserver.x + photonSpeed * timeSeconds,
    y: measurement.virtualObserver.y,
    z: measurement.virtualObserver.z,
  };
}

function createPhotonAbsoluteMovingCircularSourceHistory(state, sourceRef, measurement) {
  const layer = getPhotonLayer(state, sourceRef.braidId, sourceRef.layerId);
  const radius = Number(layer.radius) || 0;
  return {
    centerAtEpoch: {
      x: getPhotonBraidCenterX(state, sourceRef.braidId),
      y: 0,
      z: 0,
    },
    centerVelocity: {
      x: Number(measurement.photonSpeedCf) || 0,
      y: 0,
      z: 0,
    },
    radiusU: { x: 0, y: radius, z: 0 },
    radiusV: { x: 0, y: 0, z: radius },
    angularVelocity:
      getPhotonDirectionSign(state, sourceRef.braidId) *
      TWO_PI *
      (Number(layer.frequencyHz) || 0),
    phaseAtEpoch: getPhotonLayerAngleRadians(
      state,
      sourceRef.braidId,
      sourceRef.layerId,
      0,
      sourceRef.chargeType
    ),
    epochTime: 0,
  };
}

function createPhotonAbsoluteVirtualObserverHistory(measurement) {
  return {
    startTime: 0,
    endTime: 0,
    positionAtStart: getPhotonAbsoluteObserverPositionAtTime(measurement, 0),
    velocity: {
      x: Number(measurement.photonSpeedCf) || 0,
      y: 0,
      z: 0,
    },
  };
}

function buildPhotonSelfHitLayerDescriptors(state, measurement = resolvePhotonMeasurementParameters(state)) {
  const signalSpeed = Math.max(EPSILON, Number(measurement.emissionSpeedCf) || 1);
  const photonSpeedCf = Math.max(0, Number(measurement.photonSpeedCf) || 0);
  return ["left", "right"].flatMap((braidId) =>
    PHOTON_LAYER_ORDER.flatMap((layerId) => {
      if (!getPhotonLayerEnabled(state, braidId, layerId)) {
        return [];
      }
      const layer = getPhotonLayer(state, braidId, layerId);
      const orbitalSpeedCf = Math.abs(TWO_PI * layer.radius * layer.frequencyHz);
      const absoluteSpeedCf = Math.hypot(photonSpeedCf, orbitalSpeedCf);
      const fieldSpeedRatio = absoluteSpeedCf / signalSpeed;
      return [{
        braidId,
        role: state?.pair?.[braidId]?.role ?? braidId,
        layerId,
        frequencyHz: layer.frequencyHz,
        radius: layer.radius,
        orbitalSpeedCf,
        photonSpeedCf,
        signalSpeedCf: signalSpeed,
        absoluteSpeedCf,
        fieldSpeedRatio,
      }];
    })
  );
}

export function createPhotonCircularSelfHitSpansRunRequest(state, options = {}) {
  const measurement = options.measurement ?? resolvePhotonMeasurementParameters(state);
  const descriptors = options.descriptors ?? buildPhotonSelfHitLayerDescriptors(state, measurement);
  const tolerance = normalizeNonnegativeSolverNumber(
    options.selfHitTolerance ?? options.tolerance,
    DEFAULT_SELF_HIT_TOLERANCE
  );
  const fieldSpeedTolerance = normalizeNonnegativeSolverNumber(
    options.selfHitFieldSpeedTolerance ?? options.fieldSpeedTolerance,
    DEFAULT_SELF_HIT_FIELD_SPEED_TOLERANCE
  );
  const maxIterations = normalizePositiveSolverInteger(
    options.selfHitMaxIterations ?? options.maxIterations,
    DEFAULT_SELF_HIT_SOLVE_ITERATIONS
  );
  const scanSubdivisions = normalizePositiveSolverInteger(
    options.selfHitScanSubdivisions ?? options.scanSubdivisions,
    DEFAULT_SELF_HIT_SCAN_SUBDIVISIONS
  );
  const maxAngle = normalizePositiveSolverNumber(
    options.selfHitMaxAngle ?? options.maxAngle,
    DEFAULT_SELF_HIT_MAX_ANGLE
  );
  const memoryBudgetBytes = normalizePositiveSolverInteger(
    options.memoryBudgetBytes,
    DEFAULT_SOLVER_MEMORY_BUDGET_BYTES
  );
  const ratioId = descriptors
    .map((descriptor) => formatSolverIdNumber(descriptor.fieldSpeedRatio.toFixed(6)))
    .join("-");
  const runId = options.runId ?? `photon-self-hit-${ratioId || "none"}`;
  return createSharedGeometryRunRequest({
    appId: "photon",
    requestId: options.requestId ?? `${runId}-request`,
    runId,
    datasetId: options.datasetId ?? `${runId}-dataset`,
    claimLevel: options.claimLevel ?? "interactive-preview",
    precisionPath: options.precisionPath ?? "auto",
    configVersion: options.configVersion ?? "photon-circular-self-hit-adapter.v1",
    configHash: options.configHash ?? `photon-circular-self-hit:${ratioId || "none"}`,
    model: options.model ?? createDefaultPhotonSelfHitGeometryModel(),
    envelope: options.envelope ?? createDefaultPhotonSelfHitGeometryEnvelope({
      rows: descriptors,
      memoryBudgetBytes,
    }),
    errorBudget: options.errorBudget ?? createDefaultPhotonCausalRootsErrorBudget(tolerance),
    geometryRequest: {
      circularSelfHitSpans: descriptors.map((descriptor) => ({
        fieldSpeedRatio: descriptor.fieldSpeedRatio,
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

function hasPhotonSelfHitSolverBridgeOption(options = {}) {
  return typeof options.runSolverBridge === "function" ||
    (options.solverClient && typeof options.solverClient.runSimulation === "function") ||
    typeof options.createSolverBridgeClient === "function" ||
    options.solverWorker != null ||
    typeof options.createWasmModule === "function" ||
    options.allowNoWasmBridgeClient === true ||
    options?.solverBridgeConfig?.allowNoWasmBridgeClient === true;
}

function hasPhotonMovingCircularSolverBridgeOption(options = {}, methodName) {
  return (
    typeof options[methodName] === "function" ||
    (options.solverClient && typeof options.solverClient[methodName] === "function") ||
    typeof options.createSolverBridgeClient === "function" ||
    options.solverWorker != null ||
    typeof options.createWasmModule === "function" ||
    options.allowNoWasmBridgeClient === true ||
    options?.solverBridgeConfig?.allowNoWasmBridgeClient === true
  );
}

async function runPhotonMovingCircularSourceSolverBridgeClient(options, request) {
  return runSolverAppBridgeRequest({
    appId: "photon",
    methodName: "solveMovingCircularSourceCausalRootsF64",
    request,
    options,
    factoryRequest: request,
    requestedCapabilities: ["causalRoots", "delayedHits"],
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
      "Photon moving-circular source solver bridge request requires a solver client, solveMovingCircularSourceCausalRootsF64 option, client factory, worker, or solver WASM module factory.",
  });
}

async function runPhotonMovingCircularSameSourceSolverBridgeClient(options, request) {
  return runSolverAppBridgeRequest({
    appId: "photon",
    methodName: "solveMovingCircularSameSourceCausalRootsF64",
    request,
    options,
    factoryRequest: request,
    requestedCapabilities: ["causalRoots", "delayedHits"],
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
      "Photon moving-circular same-source solver bridge request requires a solver client, solveMovingCircularSameSourceCausalRootsF64 option, client factory, worker, or solver WASM module factory.",
  });
}

async function runPhotonMovingCircularObserverFieldSolverBridgeClient(options, request) {
  return runSolverAppBridgeRequest({
    appId: "photon",
    methodName: "computeMovingCircularObserverFieldF64",
    request,
    options,
    factoryRequest: request,
    requestedCapabilities: ["causalRoots", "delayedHits"],
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
      "Photon moving-circular observer-field bridge request requires a solver client, computeMovingCircularObserverFieldF64 option, client factory, worker, or solver WASM module factory.",
  });
}

async function runPhotonSelfHitSolverBridgeClient(options, descriptors, runRequest) {
  return runSolverAppBridgeRequest({
    appId: "photon",
    request: runRequest,
    options,
    factoryRequest: {
      fieldSpeedRatios: descriptors.map((descriptor) => descriptor.fieldSpeedRatio),
      descriptors,
    },
    requestedCapabilities: ["sharedGeometry", "diagnostics"],
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
      "Photon self-hit diagnostics require a solver client, runSolverBridge option, client factory, worker, or solver WASM module factory.",
  });
}

function extractPhotonCircularSelfHitRows(runHandle = {}, descriptors = []) {
  const response = runHandle.response ?? runHandle;
  const geometry = response.geometry ?? response;
  const rows = Array.isArray(geometry.circularSelfHitSpans) ? geometry.circularSelfHitSpans : [];
  return descriptors.map((descriptor, index) => {
    const row = rows.find((candidate) => candidate.itemIndex === index) ?? rows[index] ?? {};
    return {
      solverEngineId: PHOTON_SOLVER_BRIDGE_ENGINE_ID,
      runId: response.runId ?? runHandle.runId ?? "",
      datasetId: response.datasetId ?? runHandle.datasetId ?? "",
      ...descriptor,
      itemIndex: index,
      statusCode: Number.isFinite(Number(row.statusCode)) ? Number(row.statusCode) : -1,
      regime: row.regime ?? (
        descriptor.fieldSpeedRatio > 1 + DEFAULT_SELF_HIT_FIELD_SPEED_TOLERANCE
          ? "super_field"
          : descriptor.fieldSpeedRatio < 1 - DEFAULT_SELF_HIT_FIELD_SPEED_TOLERANCE
            ? "sub_field"
            : "field_speed"
      ),
      resultKind: row.resultKind ?? "missing_solver_row",
      span: Number(row.span) || 0,
      rootFound: row.rootFound === true,
      bracketLow: Number(row.bracketLow) || 0,
      bracketHigh: Number(row.bracketHigh) || 0,
      residual: Number.isFinite(Number(row.residual)) ? Number(row.residual) : 0,
      iterations: Number.isFinite(Number(row.iterations)) ? Number(row.iterations) : 0,
    };
  });
}

function computePhotonCircularSpreadDegrees(phases = []) {
  const finitePhases = phases
    .map((phase) => Number(phase))
    .filter((phase) => Number.isFinite(phase));
  if (finitePhases.length <= 1) {
    return 0;
  }
  const sum = finitePhases.reduce((accumulator, phase) => {
    const radians = phase * Math.PI / 180;
    accumulator.cos += Math.cos(radians);
    accumulator.sin += Math.sin(radians);
    return accumulator;
  }, { cos: 0, sin: 0 });
  const resultant = Math.hypot(sum.cos, sum.sin) / finitePhases.length;
  return (1 - Math.min(1, Math.max(0, resultant))) * 180;
}

function formatPhotonChargeLabel(chargeType) {
  if (chargeType === "positrino") {
    return "+";
  }
  if (chargeType === "electrino") {
    return "-";
  }
  return String(chargeType ?? "?");
}

function summarizePhotonHelicalSelfHitPhaseFamilies(helicalRows = []) {
  const groups = new Map();
  (Array.isArray(helicalRows) ? helicalRows : []).forEach((row) => {
    const roots = Array.isArray(row.roots) ? row.roots : [];
    roots.forEach((root) => {
      const phase = root.phaseAtHit ?? row.phaseAtHit;
      if (!phase || phase.rootKind !== "same-source") {
        return;
      }
      const sourceCycleIndex = Number.isFinite(Number(phase.sourcePhaseCycleIndex))
        ? Number(phase.sourcePhaseCycleIndex)
        : 0;
      const role = row.role ?? phase.sourceRole ?? row.braidId ?? "source";
      const layerId = row.layerId ?? phase.sourceLayerId ?? "?";
      const chargeType = row.chargeType ?? phase.sourceChargeType ?? "?";
      const chargeSign = Number.isFinite(Number(row.chargeSign))
        ? Number(row.chargeSign)
        : Number(phase.sourceChargeSign) || 0;
      const key = [role, layerId, chargeType, sourceCycleIndex].join("|");
      if (!groups.has(key)) {
        groups.set(key, {
          key,
          role,
          layerId,
          chargeType,
          chargeSign,
          sourceCycleIndex,
          sourcePhases: [],
          receiverPhases: [],
          minJacobianAbs: Number.POSITIVE_INFINITY,
          rootCount: 0,
        });
      }
      const group = groups.get(key);
      group.rootCount += 1;
      if (Number.isFinite(Number(phase.sourcePhaseDegrees))) {
        group.sourcePhases.push(Number(phase.sourcePhaseDegrees));
      }
      if (Number.isFinite(Number(phase.receiverPhaseDegrees))) {
        group.receiverPhases.push(Number(phase.receiverPhaseDegrees));
      }
      group.minJacobianAbs = Math.min(
        group.minJacobianAbs,
        Math.abs(Number(root.jacobian) || Number(row.jacobian) || 0)
      );
    });
  });

  const families = Array.from(groups.values())
    .map((group) => {
      const sourcePhaseSpreadDeg = computePhotonCircularSpreadDegrees(group.sourcePhases);
      const receiverPhaseSpreadDeg = computePhotonCircularSpreadDegrees(group.receiverPhases);
      const label = [
        group.role,
        group.layerId,
        formatPhotonChargeLabel(group.chargeType),
        `c${group.sourceCycleIndex}`,
      ].join(" ");
      return {
        key: group.key,
        label,
        role: group.role,
        layerId: group.layerId,
        chargeType: group.chargeType,
        chargeSign: group.chargeSign,
        sourceCycleIndex: group.sourceCycleIndex,
        rootCount: group.rootCount,
        sourcePhaseSpreadDeg,
        receiverPhaseSpreadDeg,
        minJacobianAbs: Number.isFinite(group.minJacobianAbs) ? group.minJacobianAbs : 0,
      };
    })
    .sort((a, b) =>
      b.rootCount - a.rootCount ||
      a.sourcePhaseSpreadDeg - b.sourcePhaseSpreadDeg ||
      a.label.localeCompare(b.label)
    );
  const stableFamilies = families.filter(
    (family) => family.rootCount >= 2 && family.sourcePhaseSpreadDeg <= 15
  );
  const bestFamily = stableFamilies[0] ?? families[0] ?? null;
  return {
    families,
    familyCount: families.length,
    stableFamilyCount: stableFamilies.length,
    bestFamily,
  };
}

function summarizePhotonSelfHitRows(rows = [], status = "ok", message = "", helicalRows = []) {
  const safeRows = Array.isArray(rows) ? rows : [];
  const safeHelicalRows = Array.isArray(helicalRows) ? helicalRows : [];
  const helicalPhaseFamilies = summarizePhotonHelicalSelfHitPhaseFamilies(safeHelicalRows);
  const maxFieldSpeedRatio = safeRows.reduce(
    (maximum, row) => Math.max(maximum, Number(row.fieldSpeedRatio) || 0),
    0
  );
  const rootFoundCount = safeRows.filter((row) => row.rootFound === true).length;
  const candidateCount = safeRows.filter(
    (row) => (Number(row.fieldSpeedRatio) || 0) > 1 + DEFAULT_SELF_HIT_FIELD_SPEED_TOLERANCE
  ).length;
  const helicalRootFoundCount = safeHelicalRows.filter((row) => row.rootFound === true).length;
  const helicalCandidateCount = safeHelicalRows.filter(
    (row) => (Number(row.fieldSpeedRatio) || 0) > 1 + DEFAULT_SELF_HIT_FIELD_SPEED_TOLERANCE
  ).length;
  const helicalMaxFieldSpeedRatio = safeHelicalRows.reduce(
    (maximum, row) => Math.max(maximum, Number(row.fieldSpeedRatio) || 0),
    0
  );
  return {
    solverEngineId: PHOTON_SOLVER_BRIDGE_ENGINE_ID,
    status,
    message,
    rows: safeRows,
    rowCount: safeRows.length,
    candidateCount,
    rootFoundCount,
    maxFieldSpeedRatio,
    helicalRows: safeHelicalRows,
    helicalRowCount: safeHelicalRows.length,
    helicalCandidateCount,
    helicalRootFoundCount,
    helicalMaxFieldSpeedRatio,
    helicalPhaseFamilies: helicalPhaseFamilies.families,
    helicalPhaseFamilyCount: helicalPhaseFamilies.familyCount,
    helicalStablePhaseFamilyCount: helicalPhaseFamilies.stableFamilyCount,
    helicalBestPhaseFamily: helicalPhaseFamilies.bestFamily,
  };
}

function createPhotonHelicalSelfHitRootRequest(state, sourceRef, measurement, hitTime, options = {}) {
  const layer = getPhotonLayer(state, sourceRef.braidId, sourceRef.layerId);
  const frequency = Math.max(EPSILON, Math.abs(Number(layer.frequencyHz) || 0));
  const historyCycles = normalizePositiveSolverNumber(
    options.helicalSelfHitHistoryCycles ?? options.selfHitHistoryCycles,
    DEFAULT_ABSOLUTE_HISTORY_CYCLES
  );
  const maxDelay = normalizePositiveSolverNumber(
    options.helicalSelfHitMaxDelay ?? options.selfHitMaxDelay,
    historyCycles / frequency
  );
  const scanSubdivisions = normalizePositiveSolverInteger(
    options.helicalSelfHitScanSubdivisions ?? options.selfHitScanSubdivisions,
    Math.min(
      ROOT_SCAN_MAX_STEPS,
      Math.max(ROOT_SCAN_MIN_STEPS, Math.ceil(historyCycles * ROOT_SCAN_STEPS_PER_CYCLE))
    )
  );
  return createMovingCircularSameSourceRootRequest({
    source: createPhotonAbsoluteMovingCircularSourceHistory(state, sourceRef, measurement),
    hitTime,
    signalSpeed: measurement.emissionSpeedCf,
    sourceStartTime: hitTime - maxDelay,
    sourceEndTime: hitTime,
    minimumDelay: options.helicalSelfHitMinimumDelay ?? options.selfHitMinimumDelay ?? 1e-6,
    rootTolerance: options.helicalSelfHitRootTolerance ?? options.rootTolerance ?? DEFAULT_PHOTON_ROOT_TOLERANCE,
    maxIterations: options.helicalSelfHitMaxIterations ?? options.maxIterations ?? 96,
    scanSubdivisions,
    maxRoots: normalizePositiveSolverInteger(options.helicalSelfHitMaxRoots ?? options.maxRoots, 8),
    sourceRef,
  });
}

function getPhotonSelfHitRegime(fieldSpeedRatio) {
  if (fieldSpeedRatio > 1 + DEFAULT_SELF_HIT_FIELD_SPEED_TOLERANCE) {
    return "super_field";
  }
  if (fieldSpeedRatio < 1 - DEFAULT_SELF_HIT_FIELD_SPEED_TOLERANCE) {
    return "sub_field";
  }
  return "field_speed";
}

async function createPhotonHelicalSelfHitRow(state, descriptor, chargeType, itemIndex, measurement, options = {}) {
  const sourceRef = {
    braidId: descriptor.braidId,
    layerId: descriptor.layerId,
    chargeType,
  };
  const hitTime = Number.isFinite(Number(options.selfHitObservationTime))
    ? Number(options.selfHitObservationTime)
    : 0;
  const request = createPhotonHelicalSelfHitRootRequest(state, sourceRef, measurement, hitTime, options);
  const response = typeof options.solveMovingCircularSameSourceRoots === "function"
    ? await options.solveMovingCircularSameSourceRoots(request)
    : hasPhotonMovingCircularSolverBridgeOption(options, "solveMovingCircularSameSourceCausalRootsF64")
      ? await runPhotonMovingCircularSameSourceSolverBridgeClient(options, request)
      : solveMovingCircularSameSourceCausalRoots(request);
  const roots = (Array.isArray(response?.roots) ? response.roots : [])
    .map((root) => ({
      ...root,
      phaseAtHit: createPhotonSelfHitPhaseAtHitRecord(
        state,
        sourceRef,
        root.emissionTime,
        root.sourcePhase,
        root.hitTime,
        root.receiverPhase
      ),
    }))
    .sort((a, b) => a.delay - b.delay);
  const firstRoot = roots[0] ?? null;
  return {
    solverEngineId: PHOTON_SOLVER_BRIDGE_ENGINE_ID,
    itemIndex,
    sourceHistoryKind: "moving-circular-same-source",
    ...descriptor,
    chargeType,
    chargeSign: PHOTON_CHARGE_SIGN[chargeType] ?? 0,
    regime: getPhotonSelfHitRegime(descriptor.fieldSpeedRatio),
    resultKind: firstRoot ? "root_solved" : response?.rejectedReason || response?.status?.code || "no_roots",
    statusCode: firstRoot ? 0 : -1,
    rootFound: Boolean(firstRoot),
    rootCount: roots.length,
    roots,
    delay: Number(firstRoot?.delay) || 0,
    residual: Number.isFinite(Number(firstRoot?.residual)) ? Number(firstRoot.residual) : 0,
    jacobian: Number.isFinite(Number(firstRoot?.jacobian)) ? Number(firstRoot.jacobian) : 0,
    jacobianAbs: Math.abs(Number(firstRoot?.jacobian) || 0),
    sourcePhaseDegrees: Number.isFinite(Number(firstRoot?.phaseAtHit?.sourcePhaseDegrees))
      ? Number(firstRoot.phaseAtHit.sourcePhaseDegrees)
      : null,
    receiverPhaseDegrees: Number.isFinite(Number(firstRoot?.phaseAtHit?.receiverPhaseDegrees))
      ? Number(firstRoot.phaseAtHit.receiverPhaseDegrees)
      : null,
    phaseAtHit: firstRoot?.phaseAtHit ?? null,
    rejectedReason: firstRoot ? "" : response?.rejectedReason || response?.status?.code || "no_roots",
    scan: response?.scan ?? null,
  };
}

async function createPhotonHelicalSelfHitRows(state, measurement, descriptors, options = {}) {
  const rows = await Promise.all(
    descriptors.flatMap((descriptor) =>
      PHOTON_CHARGE_TYPES.map((chargeType, chargeIndex) => {
        const itemIndex = rowsIndexForPhotonSelfHit(descriptor, chargeIndex);
        return createPhotonHelicalSelfHitRow(
          state,
          descriptor,
          chargeType,
          itemIndex,
          measurement,
          options
        );
      })
    )
  );
  return rows.map((row, index) => ({ ...row, itemIndex: index }));
}

function rowsIndexForPhotonSelfHit(descriptor, chargeIndex) {
  const braidOffset = descriptor.braidId === "right" ? PHOTON_LAYER_ORDER.length * PHOTON_CHARGE_TYPES.length : 0;
  const layerOffset = Math.max(0, PHOTON_LAYER_ORDER.indexOf(descriptor.layerId)) * PHOTON_CHARGE_TYPES.length;
  return braidOffset + layerOffset + chargeIndex;
}

export async function computePhotonSelfHitDiagnosticsWithSolverBridge(state, options = {}) {
  const measurement = options.measurement ?? resolvePhotonMeasurementParameters(state);
  const descriptors = buildPhotonSelfHitLayerDescriptors(state, measurement);
  if (descriptors.length === 0) {
    return summarizePhotonSelfHitRows([], "empty", "No enabled photon binaries.");
  }
  const helicalRows = await createPhotonHelicalSelfHitRows(state, measurement, descriptors, options);
  if (options.skipSpanSelfHitDiagnostics === true) {
    const rows = descriptors.map((descriptor, index) => ({
      solverEngineId: PHOTON_SOLVER_BRIDGE_ENGINE_ID,
      ...descriptor,
      itemIndex: index,
      statusCode: 0,
      regime: getPhotonSelfHitRegime(descriptor.fieldSpeedRatio),
      resultKind: "span_skipped",
      span: 0,
      rootFound: false,
      bracketLow: 0,
      bracketHigh: 0,
      residual: 0,
      iterations: 0,
    }));
    return summarizePhotonSelfHitRows(
      rows,
      "span-skipped",
      "Self-hit span rows skipped; helical same-source rows computed.",
      helicalRows
    );
  }
  if (!hasPhotonSelfHitSolverBridgeOption(options)) {
    const rows = descriptors.map((descriptor, index) => ({
      solverEngineId: PHOTON_SOLVER_BRIDGE_ENGINE_ID,
      ...descriptor,
      itemIndex: index,
      statusCode: -1,
      regime: descriptor.fieldSpeedRatio > 1 + DEFAULT_SELF_HIT_FIELD_SPEED_TOLERANCE
        ? "super_field"
        : descriptor.fieldSpeedRatio < 1 - DEFAULT_SELF_HIT_FIELD_SPEED_TOLERANCE
          ? "sub_field"
          : "field_speed",
      resultKind: "solver_unavailable",
      span: 0,
      rootFound: false,
      bracketLow: 0,
      bracketHigh: 0,
      residual: 0,
      iterations: 0,
    }));
    return summarizePhotonSelfHitRows(
      rows,
      "unavailable",
      "Self-hit span rows need the shared-geometry solver bridge.",
      helicalRows
    );
  }
  const runRequest = options.selfHitRunRequest ??
    createPhotonCircularSelfHitSpansRunRequest(state, {
      ...options,
      measurement,
      descriptors,
    });
  const runHandle = typeof options.runSolverBridge === "function"
    ? await options.runSolverBridge(runRequest)
    : await runPhotonSelfHitSolverBridgeClient(options, descriptors, runRequest);
  return summarizePhotonSelfHitRows(
    extractPhotonCircularSelfHitRows(runHandle, descriptors),
    "ok",
    "Self-hit span rows computed from shared-geometry solver bridge.",
    helicalRows
  );
}

function getPhotonAbsoluteSourceMaxDelay(state, sourceRef, measurement) {
  const layer = getPhotonLayer(state, sourceRef.braidId, sourceRef.layerId);
  const centerX = getPhotonBraidCenterX(state, sourceRef.braidId);
  const observerX = measurement.virtualObserver.x;
  const longitudinalGap = Math.abs(observerX - centerX);
  const transverseGap =
    Math.hypot(measurement.virtualObserver.y, measurement.virtualObserver.z) +
    Math.max(0, Number(layer.radius) || 0);
  const signalSpeed = Math.max(EPSILON, measurement.emissionSpeedCf);
  const photonSpeed = Math.max(0, Number(measurement.photonSpeedCf) || 0);
  const catchupMargin = Math.max(0, signalSpeed - photonSpeed);
  const coMovingDelay = getPhotonSourceMaxDelay(state, sourceRef, measurement);
  const catchupDelay = catchupMargin > EPSILON
    ? (longitudinalGap + transverseGap + MIN_FIELD_DISTANCE) / catchupMargin
    : Number.POSITIVE_INFINITY;
  const cycleWindow = Math.max(
    coMovingDelay,
    DEFAULT_ABSOLUTE_HISTORY_CYCLES / Math.max(EPSILON, getPhotonReferenceFrequency(state))
  );
  const requested = Math.min(catchupDelay, cycleWindow);
  return Number.isFinite(requested) && requested > 0 ? requested : cycleWindow;
}

export function createPhotonAbsoluteSourceSegmentCausalRootRequests(
  state,
  sourceRef,
  observationTime,
  options = {}
) {
  const measurement = options.measurement ?? resolvePhotonMeasurementParameters(state);
  const hitTime = Number(observationTime) || 0;
  const maxDelay = normalizeNonnegativeSolverNumber(
    options.maxDelay,
    getPhotonAbsoluteSourceMaxDelay(state, sourceRef, measurement)
  );
  const segmentCount = normalizePositiveSolverInteger(
    options.absoluteHistorySegments,
    DEFAULT_ABSOLUTE_HISTORY_SEGMENTS
  );
  const sourceStartTime = Number.isFinite(Number(options.sourceStartTime))
    ? Number(options.sourceStartTime)
    : hitTime - maxDelay;
  const sourceEndTime = Number.isFinite(Number(options.sourceEndTime))
    ? Number(options.sourceEndTime)
    : hitTime;
  return createMovingCircularSourceLinearizedRootRequests({
    source: createPhotonAbsoluteMovingCircularSourceHistory(state, sourceRef, measurement),
    receiver: createPhotonAbsoluteVirtualObserverHistory(measurement),
    hitTime,
    signalSpeed: measurement.emissionSpeedCf,
    sourceStartTime,
    sourceEndTime,
    segmentCount,
    rootTolerance: options.rootTolerance ?? DEFAULT_PHOTON_ROOT_TOLERANCE,
    maxIterations: options.maxIterations ?? 64,
    scanSubdivisions: normalizePositiveSolverInteger(options.scanSubdivisions, 8),
    maxRoots: normalizePositiveSolverInteger(options.maxRoots, 4),
    maxHits: normalizePositiveSolverInteger(options.maxHits, 4),
    sourceErrorBound: options.sourceErrorBound ?? 0,
    receiverErrorBound: options.receiverErrorBound ?? 0,
    sourceRef,
  });
}

export function createPhotonAbsoluteMovingCircularCausalRootRequest(
  state,
  sourceRef,
  observationTime,
  options = {}
) {
  const measurement = options.measurement ?? resolvePhotonMeasurementParameters(state);
  const hitTime = Number(observationTime) || 0;
  const maxDelay = normalizeNonnegativeSolverNumber(
    options.maxDelay,
    getPhotonAbsoluteSourceMaxDelay(state, sourceRef, measurement)
  );
  const sourceStartTime = Number.isFinite(Number(options.sourceStartTime))
    ? Number(options.sourceStartTime)
    : hitTime - maxDelay;
  const sourceEndTime = Number.isFinite(Number(options.sourceEndTime))
    ? Number(options.sourceEndTime)
    : hitTime;
  const layer = getPhotonLayer(state, sourceRef.braidId, sourceRef.layerId);
  const frequency = Math.max(0, Math.abs(Number(layer.frequencyHz) || 0));
  const scanSubdivisions = normalizePositiveSolverInteger(
    options.scanSubdivisions,
    Math.min(
      ROOT_SCAN_MAX_STEPS,
      Math.max(ROOT_SCAN_MIN_STEPS, Math.ceil(maxDelay * frequency * ROOT_SCAN_STEPS_PER_CYCLE))
    )
  );
  return createMovingCircularSourceRootRequest({
    source: createPhotonAbsoluteMovingCircularSourceHistory(state, sourceRef, measurement),
    receiver: createPhotonAbsoluteVirtualObserverHistory(measurement),
    hitTime,
    signalSpeed: measurement.emissionSpeedCf,
    sourceStartTime,
    sourceEndTime,
    rootTolerance: options.rootTolerance ?? DEFAULT_PHOTON_ROOT_TOLERANCE,
    maxIterations: options.maxIterations ?? 96,
    scanSubdivisions,
    maxRoots: normalizePositiveSolverInteger(options.maxRoots, Math.max(16, scanSubdivisions + 1)),
    sourceRef,
  });
}

function createPhotonPhaseAtHitRecord(state, sourceRef, emissionTime, sourcePhase = null) {
  const rawPhase = Number.isFinite(Number(sourcePhase?.rawRadians))
    ? Number(sourcePhase.rawRadians)
    : getPhotonLayerAngleRadians(
      state,
      sourceRef.braidId,
      sourceRef.layerId,
      emissionTime,
      sourceRef.chargeType
    );
  const wrappedPhase = Number.isFinite(Number(sourcePhase?.radians))
    ? Number(sourcePhase.radians)
    : ((rawPhase % TWO_PI) + TWO_PI) % TWO_PI;
  return {
    rootKind: "source-to-virtual-observer",
    sourceRole: state?.pair?.[sourceRef.braidId]?.role ?? sourceRef.braidId,
    sourceBraidId: sourceRef.braidId,
    sourceLayerId: sourceRef.layerId,
    sourceChargeType: sourceRef.chargeType,
    sourceChargeSign: PHOTON_CHARGE_SIGN[sourceRef.chargeType] ?? 0,
    sourceEmissionTime: emissionTime,
    sourcePhaseRadians: wrappedPhase,
    sourcePhaseDegrees: wrappedPhase * 180 / Math.PI,
    sourcePhaseRawRadians: rawPhase,
    sourcePhaseCycleIndex: Number.isFinite(Number(sourcePhase?.cycleIndex))
      ? Number(sourcePhase.cycleIndex)
      : Math.floor(rawPhase / TWO_PI),
    receiverKind: "virtual-observer",
    receiverPhaseRadians: null,
    receiverPhaseDegrees: null,
    receiverPhaseCycleIndex: null,
  };
}

function createPhotonSelfHitPhaseAtHitRecord(
  state,
  sourceRef,
  emissionTime,
  sourcePhase = null,
  hitTime = 0,
  receiverPhase = null
) {
  const sourceRecord = createPhotonPhaseAtHitRecord(state, sourceRef, emissionTime, sourcePhase);
  const receiverRawPhase = Number.isFinite(Number(receiverPhase?.rawRadians))
    ? Number(receiverPhase.rawRadians)
    : getPhotonLayerAngleRadians(
      state,
      sourceRef.braidId,
      sourceRef.layerId,
      hitTime,
      sourceRef.chargeType
    );
  const receiverWrappedPhase = Number.isFinite(Number(receiverPhase?.radians))
    ? Number(receiverPhase.radians)
    : ((receiverRawPhase % TWO_PI) + TWO_PI) % TWO_PI;
  return {
    ...sourceRecord,
    rootKind: "same-source",
    receiverKind: "same-source",
    receiverRole: sourceRecord.sourceRole,
    receiverBraidId: sourceRef.braidId,
    receiverLayerId: sourceRef.layerId,
    receiverChargeType: sourceRef.chargeType,
    receiverChargeSign: PHOTON_CHARGE_SIGN[sourceRef.chargeType] ?? 0,
    receiverHitTime: hitTime,
    receiverPhaseRadians: receiverWrappedPhase,
    receiverPhaseDegrees: receiverWrappedPhase * 180 / Math.PI,
    receiverPhaseRawRadians: receiverRawPhase,
    receiverPhaseCycleIndex: Number.isFinite(Number(receiverPhase?.cycleIndex))
      ? Number(receiverPhase.cycleIndex)
      : Math.floor(receiverRawPhase / TWO_PI),
  };
}

function mapPhotonMovingCircularRootToDelayedRoot(state, sourceRef, measurement, request, root = {}) {
  const emissionTime = Number(root.emissionTime) || 0;
  const hitTime = Number(root.hitTime) || request.hitTime || 0;
  const delay = Number.isFinite(Number(root.delay))
    ? Number(root.delay)
    : Math.max(0, hitTime - emissionTime);
  const movingSourceSample = evaluateMovingCircularSourceHistory(request.source, emissionTime);
  const sourcePoint = root.sourcePoint && typeof root.sourcePoint === "object"
    ? root.sourcePoint
    : movingSourceSample.position;
  const receiverPoint = root.receiverPoint && typeof root.receiverPoint === "object"
    ? root.receiverPoint
    : evaluateLinearHistoryPoint(request.receiver, hitTime);
  const delta = subtractVector(receiverPoint, sourcePoint);
  const { distance, direction } = safeDirectionVector(delta);
  const coMovingKinematics = getPhotonArchitrinoKinematics(
    state,
    sourceRef.braidId,
    sourceRef.layerId,
    sourceRef.chargeType,
    emissionTime
  );
  return {
    ...root,
    emissionTime,
    hitTime,
    delay,
    residual: Number.isFinite(Number(root.residual)) ? Number(root.residual) : 0,
    distance: Number.isFinite(Number(root.distance)) ? Number(root.distance) : distance,
    direction,
    kinematics: {
      ...coMovingKinematics,
      sourceHistoryMode: "absolute_history_moving_circular",
      position: {
        x: Number(sourcePoint.x) || 0,
        y: Number(sourcePoint.y) || 0,
        z: Number(sourcePoint.z) || 0,
      },
      velocity: {
        x: Number(root.sourceVelocity?.x ?? movingSourceSample.velocity.x) || 0,
        y: Number(root.sourceVelocity?.y ?? movingSourceSample.velocity.y) || 0,
        z: Number(root.sourceVelocity?.z ?? movingSourceSample.velocity.z) || 0,
      },
    },
    receiverPoint,
    sourceHistoryKind: root.sourceHistoryKind ?? request.sourceHistoryKind ?? "moving-circular-source",
    phaseAtHit: createPhotonPhaseAtHitRecord(
      state,
      sourceRef,
      emissionTime,
      root.sourcePhase ?? movingSourceSample.phase
    ),
    solveIterations: Number.isFinite(Number(root.iterationCount))
      ? Number(root.iterationCount)
      : Number(root.solveIterations) || 0,
    solverEngineId: PHOTON_SOLVER_BRIDGE_ENGINE_ID,
  };
}

function mapPhotonLinearSegmentRootToDelayedRoot(state, sourceRef, measurement, request, root = {}) {
  const emissionTime = Number(root.emissionTime) || 0;
  const hitTime = Number(root.hitTime) || request.hitTime || 0;
  const delay = Number.isFinite(Number(root.delay))
    ? Number(root.delay)
    : Math.max(0, hitTime - emissionTime);
  const movingSourceSample = request.sourceHistory?.source
    ? evaluateMovingCircularSourceHistory(request.sourceHistory.source, emissionTime)
    : null;
  const sourcePoint = root.sourcePoint && typeof root.sourcePoint === "object"
    ? root.sourcePoint
    : movingSourceSample?.position ?? evaluateLinearHistoryPoint(request.source, emissionTime);
  const receiverPoint = root.receiverPoint && typeof root.receiverPoint === "object"
    ? root.receiverPoint
    : evaluateLinearHistoryPoint(request.receiver, hitTime);
  const delta = subtractVector(receiverPoint, sourcePoint);
  const { distance, direction } = safeDirectionVector(delta);
  const coMovingKinematics = getPhotonArchitrinoKinematics(
    state,
    sourceRef.braidId,
    sourceRef.layerId,
    sourceRef.chargeType,
    emissionTime
  );
  return {
    ...root,
    emissionTime,
    hitTime,
    delay,
    residual: Number.isFinite(Number(root.residual)) ? Number(root.residual) : 0,
    distance: Number.isFinite(Number(root.distance)) ? Number(root.distance) : distance,
    direction,
    kinematics: {
      ...coMovingKinematics,
      sourceHistoryMode: "absolute_history_segmented",
      position: {
        x: Number(sourcePoint.x) || 0,
        y: Number(sourcePoint.y) || 0,
        z: Number(sourcePoint.z) || 0,
      },
      velocity: {
        x: Number(movingSourceSample?.velocity?.x ?? request.source.velocity.x) || 0,
        y: Number(movingSourceSample?.velocity?.y ?? request.source.velocity.y) || 0,
        z: Number(movingSourceSample?.velocity?.z ?? request.source.velocity.z) || 0,
      },
    },
    receiverPoint,
    segmentIndex: request.segmentIndex,
    sourceHistoryKind: request.sourceHistory?.kind ?? "linear-source-segment",
    phaseAtHit: createPhotonPhaseAtHitRecord(
      state,
      sourceRef,
      emissionTime,
      movingSourceSample?.phase
    ),
    solveIterations: Number.isFinite(Number(root.iterationCount))
      ? Number(root.iterationCount)
      : Number(root.solveIterations) || 0,
    solverEngineId: PHOTON_SOLVER_BRIDGE_ENGINE_ID,
  };
}

function dedupePhotonDelayedRoots(roots) {
  const seen = new Set();
  return roots
    .slice()
    .sort((a, b) => a.delay - b.delay)
    .filter((root) => {
      const key = `${root.emissionTime.toFixed(10)}:${root.hitTime.toFixed(10)}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
}

function readPhotonFiniteNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function readPhotonOptionalFiniteNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function closePhotonScaled(left, right, tolerance = 1e-9) {
  const scale = Math.max(1, Math.abs(left), Math.abs(right));
  return Math.abs(left - right) <= tolerance * scale;
}

function resolvePhotonReceiverNormalRows(root = {}) {
  const branchWeight = readPhotonOptionalFiniteNumber(root.branchWeight);
  const sourceNormalDenominator = readPhotonOptionalFiniteNumber(root.sourceNormalDenominator);
  const receiverNormalNumerator = readPhotonOptionalFiniteNumber(root.receiverNormalNumerator);
  const receiverNormalFactor = readPhotonOptionalFiniteNumber(root.receiverNormalFactor);
  const unsignedReceiverNormalFactor = readPhotonOptionalFiniteNumber(root.unsignedReceiverNormalFactor);
  if (
    branchWeight === null ||
    sourceNormalDenominator === null ||
    receiverNormalNumerator === null ||
    receiverNormalFactor === null ||
    unsignedReceiverNormalFactor === null
  ) {
    return {
      branchWeight: 0,
      sourceNormalDenominator: sourceNormalDenominator ?? 0,
      receiverNormalNumerator: receiverNormalNumerator ?? 0,
      receiverNormalFactor: receiverNormalFactor ?? 0,
      unsignedReceiverNormalFactor: unsignedReceiverNormalFactor ?? 0,
      evidenceStatus: "receiver_normal_branch_rows_missing",
    };
  }
  const expectedReceiverNormalFactor = receiverNormalNumerator / sourceNormalDenominator;
  if (
    branchWeight < 0 ||
    unsignedReceiverNormalFactor < 0 ||
    Math.abs(sourceNormalDenominator) <= EPSILON ||
    !Number.isFinite(expectedReceiverNormalFactor) ||
    !closePhotonScaled(receiverNormalFactor, expectedReceiverNormalFactor) ||
    !closePhotonScaled(unsignedReceiverNormalFactor, Math.abs(receiverNormalFactor)) ||
    !closePhotonScaled(branchWeight, unsignedReceiverNormalFactor)
  ) {
    return {
      branchWeight: 0,
      sourceNormalDenominator,
      receiverNormalNumerator,
      receiverNormalFactor,
      unsignedReceiverNormalFactor,
      evidenceStatus: "receiver_normal_branch_rows_invalid",
    };
  }
  return {
    branchWeight,
    sourceNormalDenominator,
    receiverNormalNumerator,
    receiverNormalFactor,
    unsignedReceiverNormalFactor,
    evidenceStatus: "ok",
  };
}

function computePhotonDelayedContribution(root, measurement) {
  const n = root.direction;
  const signalSpeed = Math.max(EPSILON, measurement.emissionSpeedCf);
  const sourceNormalSpeed = readPhotonFiniteNumber(
    root.sourceNormalSpeed,
    dotVector(root.kinematics.velocity, n)
  );
  const receiverNormalSpeed = readPhotonFiniteNumber(root.receiverNormalSpeed, 0);
  const receiverNormalCrossingFactor = readPhotonFiniteNumber(root.receiverNormalCrossingFactor, 0);
  const {
    branchWeight,
    sourceNormalDenominator,
    receiverNormalNumerator,
    receiverNormalFactor,
    unsignedReceiverNormalFactor,
    evidenceStatus,
  } = resolvePhotonReceiverNormalRows(root);
  const jacobian = sourceNormalDenominator;
  const jacobianAbs = Math.abs(jacobian);
  const sourceSpeedRatio = vectorMagnitude(root.kinematics.velocity) / signalSpeed;
  const receiverAcceleration = scaleVector(
    n,
    root.kinematics.chargeSign * branchWeight / (root.distance * root.distance)
  );
  const electric = receiverAcceleration;
  const comparisonB = scaleVector(crossVector(X_HAT, electric), 1 / signalSpeed);

  return {
    ...root,
    delaySolveGap: Math.abs(root.residual),
    jacobian,
    jacobianAbs,
    branchWeight,
    sourceNormalSpeed,
    receiverNormalSpeed,
    sourceNormalDenominator,
    receiverNormalNumerator,
    receiverNormalCrossingFactor,
    receiverNormalFactor,
    unsignedReceiverNormalFactor,
    receiverNormalStatusCode: Number.isFinite(Number(root.receiverNormalStatusCode))
      ? Number(root.receiverNormalStatusCode)
      : evidenceStatus === "ok" ? 0 : -1,
    receiverNormalEvidenceStatus: evidenceStatus,
    sourceSpeedRatio,
    receiverAcceleration,
    electric,
    comparisonB,
  };
}

function createPhotonObserverFieldBranchSumRequest(roots = [], measurement = {}) {
  return {
    signalSpeed: measurement.emissionSpeedCf,
    jacobianFloor: JACOBIAN_FLOOR,
    unstableGapThreshold: 0.05,
    branches: roots.map((root) => ({
      chargeSign: root.kinematics?.chargeSign ?? 0,
      direction: root.direction,
      sourceVelocity: root.kinematics?.velocity,
      distance: root.distance,
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
    })),
  };
}

async function computePhotonAbsoluteObserverFieldContributionsWithSolverBridge(
  roots,
  measurement,
  options = {}
) {
  const request = createPhotonObserverFieldBranchSumRequest(roots, measurement);
  const response = typeof options.computeMovingCircularObserverField === "function"
    ? await options.computeMovingCircularObserverField(request)
    : hasPhotonMovingCircularSolverBridgeOption(options, "computeMovingCircularObserverFieldF64")
      ? await runPhotonMovingCircularObserverFieldSolverBridgeClient(options, request)
      : null;
  if (!response) {
    const contributions = roots.map((root) => computePhotonDelayedContribution(root, measurement));
    return {
      sourceMode: "solver_bridge_absolute_history_receiver_normal_root_branch_sum",
      contributions,
      electric: contributions.reduce(
        (sum, contribution) => addVector(sum, contribution.electric),
        { x: 0, y: 0, z: 0 }
      ),
      comparisonB: contributions.reduce(
        (sum, contribution) => addVector(sum, contribution.comparisonB),
        { x: 0, y: 0, z: 0 }
      ),
      averageDelay: contributions.length > 0
        ? contributions.reduce((sum, contribution) => sum + contribution.delay, 0) / contributions.length
        : 0,
      delaySolveGapMax: contributions.reduce(
        (maximum, contribution) => Math.max(maximum, contribution.delaySolveGap),
        0
      ),
      maxSourceSpeedRatio: contributions.reduce(
        (maximum, contribution) => Math.max(maximum, contribution.sourceSpeedRatio),
        0
      ),
      jacobianAbsMin: contributions.reduce(
        (minimum, contribution) => Math.min(minimum, contribution.jacobianAbs),
        Number.POSITIVE_INFINITY
      ),
      unstableSourceCount: contributions.filter(
        (contribution) =>
          contribution.receiverNormalEvidenceStatus !== "ok" ||
          contribution.delaySolveGap > 0.05 ||
          contribution.jacobianAbs <= JACOBIAN_FLOOR
      ).length,
      nearestSourceDistance: contributions.reduce(
        (minimum, contribution) => Math.min(minimum, contribution.distance),
        Number.POSITIVE_INFINITY
      ),
    };
  }
  const solverContributions = Array.isArray(response.contributions) ? response.contributions : [];
  const contributions = roots.map((root, index) => ({
    ...root,
    ...(solverContributions[index] ?? computePhotonDelayedContribution(root, measurement)),
  }));
  return {
    sourceMode: "solver_bridge_absolute_history_receiver_normal_root_branch_sum",
    solverFieldSchema: response.schema ?? "",
    contributions,
    electric: contributions.reduce(
      (sum, contribution) => addVector(sum, contribution.electric),
      { x: 0, y: 0, z: 0 }
    ),
    comparisonB: contributions.reduce(
      (sum, contribution) => addVector(sum, contribution.comparisonB),
      { x: 0, y: 0, z: 0 }
    ),
    averageDelay: Number(response.averageDelay) || 0,
    delaySolveGapMax: Number(response.delaySolveGapMax) || 0,
    maxSourceSpeedRatio: Number(response.maxSourceSpeedRatio) || 0,
    jacobianAbsMin: Number.isFinite(Number(response.jacobianAbsMin))
      ? Number(response.jacobianAbsMin)
      : 0,
    unstableSourceCount: Number(response.unstableContributionCount) || 0,
    nearestSourceDistance: Number(response.nearestSourceDistance) || 0,
  };
}

export function buildPhotonArchitrinoSourceRefs(state = null) {
  return ["left", "right"].flatMap((braidId) =>
    PHOTON_LAYER_ORDER.flatMap((layerId) => {
      if (state && !getPhotonLayerEnabled(state, braidId, layerId)) {
        return [];
      }
      return PHOTON_CHARGE_TYPES.map((chargeType) => ({ braidId, layerId, chargeType }));
    })
  );
}

function mapPhotonCircularSourceRootToDelayedRoot(state, sourceRef, measurement, root = {}) {
  const emissionTime = Number(root.emissionTime) || 0;
  const hitTime = Number(root.hitTime) || 0;
  const delay = Number.isFinite(Number(root.delay))
    ? Number(root.delay)
    : Math.max(0, hitTime - emissionTime);
  const kinematics = getPhotonArchitrinoKinematics(
    state,
    sourceRef.braidId,
    sourceRef.layerId,
    sourceRef.chargeType,
    emissionTime
  );
  const sourcePoint = root.sourcePoint && typeof root.sourcePoint === "object"
    ? root.sourcePoint
    : kinematics.position;
  const receiverPoint = root.receiverPoint && typeof root.receiverPoint === "object"
    ? root.receiverPoint
    : measurement.virtualObserver;
  const delta = subtractVector(receiverPoint, sourcePoint);
  const { distance, direction } = safeDirectionVector(delta);
  return {
    ...root,
    emissionTime,
    delay,
    residual: Number.isFinite(Number(root.residual)) ? Number(root.residual) : 0,
    distance: Number.isFinite(Number(root.distance)) ? Number(root.distance) : distance,
    direction,
    kinematics: {
      ...kinematics,
      position: {
        x: Number(sourcePoint.x) || 0,
        y: Number(sourcePoint.y) || 0,
        z: Number(sourcePoint.z) || 0,
      },
    },
    sourceHistoryKind: "co_moving_circular_source",
    phaseAtHit: createPhotonPhaseAtHitRecord(state, sourceRef, emissionTime),
    solveIterations: Number.isFinite(Number(root.iterationCount))
      ? Number(root.iterationCount)
      : Number(root.solveIterations) || 0,
    solverEngineId: PHOTON_SOLVER_BRIDGE_ENGINE_ID,
  };
}

export async function solvePhotonCoMovingCausalRootsForSourceWithSolverBridge(
  state,
  sourceRef,
  observationTime,
  options = {}
) {
  const measurement = options.measurement ?? resolvePhotonMeasurementParameters(state);
  const response = await solvePhotonCircularSourceRootsHitsLedgerWithSolverBridge(
    state,
    sourceRef,
    observationTime,
    {
      ...options,
      measurement,
    }
  );
  return (Array.isArray(response?.roots) ? response.roots : [])
    .map((root) => mapPhotonCircularSourceRootToDelayedRoot(
      state,
      sourceRef,
      measurement,
      root
    ))
    .sort((a, b) => a.delay - b.delay);
}

export async function solvePhotonAbsoluteCausalRootsForSourceWithSolverBridge(
  state,
  sourceRef,
  observationTime,
  options = {}
) {
  const rootSet = await solvePhotonAbsoluteCausalRootSetForSourceWithSolverBridge(
    state,
    sourceRef,
    observationTime,
    options
  );
  return rootSet.roots;
}

async function solvePhotonAbsoluteCausalRootSetForSourceWithSolverBridge(
  state,
  sourceRef,
  observationTime,
  options = {}
) {
  const measurement = options.measurement ?? resolvePhotonMeasurementParameters(state);
  const request = createPhotonAbsoluteMovingCircularCausalRootRequest(
    state,
    sourceRef,
    observationTime,
    {
      ...options,
      measurement,
    }
  );
  const response = typeof options.solveMovingCircularSourceRoots === "function"
    ? await options.solveMovingCircularSourceRoots(request)
    : hasPhotonMovingCircularSolverBridgeOption(options, "solveMovingCircularSourceCausalRootsF64")
      ? await runPhotonMovingCircularSourceSolverBridgeClient(options, request)
      : solveMovingCircularSourceCausalRoots(request);
  const roots = Array.isArray(response?.roots) ? response.roots : [];
  const mappedRoots = roots
    .map((root) => mapPhotonMovingCircularRootToDelayedRoot(
      state,
      sourceRef,
      measurement,
      request,
      root
    ))
    .sort((a, b) => a.delay - b.delay);
  return {
    sourceRef,
    roots: mappedRoots,
    rootDiagnostics: createPhotonSourceRootDiagnostics(
      sourceRef,
      measurement,
      response,
      mappedRoots
    ),
  };
}

export async function solvePhotonCausalRootsForSourceWithSolverBridge(
  state,
  sourceRef,
  observationTime,
  options = {}
) {
  const measurement = options.measurement ?? resolvePhotonMeasurementParameters(state);
  if (measurement.sourceHistoryMode === "absolute_history") {
    return solvePhotonAbsoluteCausalRootsForSourceWithSolverBridge(
      state,
      sourceRef,
      observationTime,
      {
        ...options,
        measurement,
      }
    );
  }
  return solvePhotonCoMovingCausalRootsForSourceWithSolverBridge(
    state,
    sourceRef,
    observationTime,
    {
      ...options,
      measurement,
    }
  );
}

function createPhotonSourceRootDiagnostics(sourceRef, measurement, response = {}, roots = []) {
  const scan = response?.scan && typeof response.scan === "object" ? response.scan : null;
  const status = response?.status && typeof response.status === "object" ? response.status : {};
  const rootCount = Array.isArray(roots) ? roots.length : 0;
  const rejectedReason = rootCount > 0
    ? ""
    : response?.rejectedReason || status.code || "no_roots";
  return {
    sourceRef,
    sourceHistoryMode: measurement?.sourceHistoryMode ?? "co_moving",
    rootCount,
    statusCode: status.code ?? (rootCount > 0 ? "ok" : "no_roots"),
    statusSeverity: status.severity ?? (rootCount > 0 ? "ok" : "warning"),
    rejectedReason,
    rootLimitReached: scan?.rootLimitReached === true || status.code === "partial",
    signChangeCount: Number(scan?.signChangeCount) || 0,
    minResidual: Number.isFinite(Number(scan?.minResidual)) ? Number(scan.minResidual) : 0,
    maxResidual: Number.isFinite(Number(scan?.maxResidual)) ? Number(scan.maxResidual) : 0,
    minAbsResidual: Number.isFinite(Number(scan?.minAbsResidual)) ? Number(scan.minAbsResidual) : 0,
    minAbsTime: Number.isFinite(Number(scan?.minAbsTime)) ? Number(scan.minAbsTime) : null,
    sourceStartTime: Number.isFinite(Number(scan?.sourceStartTime)) ? Number(scan.sourceStartTime) : null,
    sourceEndTime: Number.isFinite(Number(scan?.sourceEndTime)) ? Number(scan.sourceEndTime) : null,
  };
}

function summarizePhotonRootDiagnostics(rootSets = []) {
  const sourceDiagnostics = rootSets
    .map((rootSet) => rootSet.rootDiagnostics)
    .filter((diagnostic) => diagnostic && typeof diagnostic === "object");
  const rejectedReasonCounts = {};
  let rejectedSourceCount = 0;
  let noCatchUpSourceCount = 0;
  let staleHistorySourceCount = 0;
  let nearMissSourceCount = 0;
  let unisolatedCandidateCount = 0;
  let emptyWindowSourceCount = 0;
  let rootLimitReachedCount = 0;
  let closestMissResidual = Number.POSITIVE_INFINITY;

  sourceDiagnostics.forEach((diagnostic) => {
    if (diagnostic.rootLimitReached) {
      rootLimitReachedCount += 1;
    }
    if (diagnostic.rootCount > 0) {
      return;
    }
    rejectedSourceCount += 1;
    const reason = diagnostic.rejectedReason || "no_roots";
    rejectedReasonCounts[reason] = (rejectedReasonCounts[reason] ?? 0) + 1;
    if (reason === "no_catch_up_root") {
      noCatchUpSourceCount += 1;
    } else if (reason === "stale_history_window") {
      staleHistorySourceCount += 1;
    } else if (reason === "near_miss") {
      nearMissSourceCount += 1;
    } else if (reason === "unisolated_root_candidate") {
      unisolatedCandidateCount += 1;
    } else if (reason === "empty_window") {
      emptyWindowSourceCount += 1;
    }
    closestMissResidual = Math.min(
      closestMissResidual,
      Math.abs(Number(diagnostic.minAbsResidual) || 0)
    );
  });

  return {
    sourceDiagnostics,
    rejectedSourceCount,
    noCatchUpSourceCount,
    staleHistorySourceCount,
    nearMissSourceCount,
    unisolatedCandidateCount,
    emptyWindowSourceCount,
    rootLimitReachedCount,
    closestMissResidual: Number.isFinite(closestMissResidual) ? closestMissResidual : 0,
    rejectedReasonCounts,
  };
}

export async function computePhotonDelayedEmissionFieldWithSolverBridge(
  state,
  observationTime,
  options = {}
) {
  const measurement = options.measurement ?? resolvePhotonMeasurementParameters(state);
  const sourceRefs = buildPhotonArchitrinoSourceRefs(state);
  const solveRootSet = async (sourceRef) => {
    if (measurement.sourceHistoryMode === "absolute_history") {
      return solvePhotonAbsoluteCausalRootSetForSourceWithSolverBridge(
        state,
        sourceRef,
        observationTime,
        {
          ...options,
          measurement,
        }
      );
    }
    return {
      sourceRef,
      roots: await solvePhotonCoMovingCausalRootsForSourceWithSolverBridge(
        state,
        sourceRef,
        observationTime,
        {
          ...options,
          measurement,
        }
      ),
      rootDiagnostics: null,
    };
  };
  const rootSets = options.parallel === false
    ? []
    : await Promise.all(sourceRefs.map((sourceRef) => solveRootSet(sourceRef)));
  if (options.parallel === false) {
    for (const sourceRef of sourceRefs) {
      rootSets.push(await solveRootSet(sourceRef));
    }
  }
  const roots = rootSets.flatMap((rootSet) => rootSet.roots);
  const fieldSum = measurement.sourceHistoryMode === "absolute_history"
    ? await computePhotonAbsoluteObserverFieldContributionsWithSolverBridge(
        roots,
        measurement,
        options
      )
    : (() => {
        const contributions = roots.map((root) => computePhotonDelayedContribution(root, measurement));
        return {
          sourceMode: "solver_bridge_circular_source_branch_sum",
          contributions,
          electric: contributions.reduce(
            (sum, contribution) => addVector(sum, contribution.electric),
            { x: 0, y: 0, z: 0 }
          ),
          comparisonB: contributions.reduce(
            (sum, contribution) => addVector(sum, contribution.comparisonB),
            { x: 0, y: 0, z: 0 }
          ),
          averageDelay: contributions.length > 0
            ? contributions.reduce((sum, contribution) => sum + contribution.delay, 0) / contributions.length
            : 0,
          delaySolveGapMax: contributions.reduce(
            (maximum, contribution) => Math.max(maximum, contribution.delaySolveGap),
            0
          ),
          maxSourceSpeedRatio: contributions.reduce(
            (maximum, contribution) => Math.max(maximum, contribution.sourceSpeedRatio),
            0
          ),
          jacobianAbsMin: contributions.reduce(
            (minimum, contribution) => Math.min(minimum, contribution.jacobianAbs),
            Number.POSITIVE_INFINITY
          ),
          unstableSourceCount: contributions.filter(
            (contribution) =>
              contribution.receiverNormalEvidenceStatus !== "ok" ||
              contribution.delaySolveGap > 0.05 ||
              contribution.jacobianAbs <= JACOBIAN_FLOOR
          ).length,
          nearestSourceDistance: contributions.reduce(
            (minimum, contribution) => Math.min(minimum, contribution.distance),
            Number.POSITIVE_INFINITY
          ),
        };
      })();
  const contributions = fieldSum.contributions;
  const unresolvedSourceCount = rootSets.filter((rootSet) => rootSet.roots.length === 0).length;
  const rootDiagnostics = summarizePhotonRootDiagnostics(rootSets);

  return {
    sourceMode: fieldSum.sourceMode,
    solverFieldSchema: fieldSum.solverFieldSchema ?? "",
    solverEngineId: PHOTON_SOLVER_BRIDGE_ENGINE_ID,
    measurement,
    contributions,
    sourceCount: sourceRefs.length,
    rootCount: contributions.length,
    averageDelay: fieldSum.averageDelay,
    delaySolveGapMax: fieldSum.delaySolveGapMax,
    maxSourceSpeedRatio: fieldSum.maxSourceSpeedRatio,
    jacobianAbsMin: Number.isFinite(fieldSum.jacobianAbsMin) ? fieldSum.jacobianAbsMin : 0,
    unresolvedSourceCount,
    unstableSourceCount: fieldSum.unstableSourceCount,
    rootDiagnostics,
    noCatchUpSourceCount: rootDiagnostics.noCatchUpSourceCount,
    staleHistorySourceCount: rootDiagnostics.staleHistorySourceCount,
    nearMissSourceCount: rootDiagnostics.nearMissSourceCount,
    rootLimitReachedCount: rootDiagnostics.rootLimitReachedCount,
    closestMissResidual: rootDiagnostics.closestMissResidual,
    nearestSourceDistance: Number.isFinite(fieldSum.nearestSourceDistance)
      ? fieldSum.nearestSourceDistance
      : 0,
    electric: fieldSum.electric,
    comparisonB: fieldSum.comparisonB,
  };
}

export async function computePhotonObserverFieldWithSolverBridge(state, timeSeconds, options = {}) {
  const referenceFrequency = getPhotonReferenceFrequency(state);
  const phase = TWO_PI * referenceFrequency * timeSeconds;
  const delayedField = await computePhotonDelayedEmissionFieldWithSolverBridge(
    state,
    timeSeconds,
    options
  );
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
    solverEngineId: PHOTON_SOLVER_BRIDGE_ENGINE_ID,
    measurement: delayedField.measurement,
    sourceCount: delayedField.sourceCount,
    rootCount: delayedField.rootCount,
    averageDelay: delayedField.averageDelay,
    delaySolveGapMax: delayedField.delaySolveGapMax,
    maxSourceSpeedRatio: delayedField.maxSourceSpeedRatio,
    jacobianAbsMin: delayedField.jacobianAbsMin,
    unresolvedSourceCount: delayedField.unresolvedSourceCount,
    unstableSourceCount: delayedField.unstableSourceCount,
    rootDiagnostics: delayedField.rootDiagnostics,
    noCatchUpSourceCount: delayedField.noCatchUpSourceCount,
    staleHistorySourceCount: delayedField.staleHistorySourceCount,
    nearMissSourceCount: delayedField.nearMissSourceCount,
    rootLimitReachedCount: delayedField.rootLimitReachedCount,
    closestMissResidual: delayedField.closestMissResidual,
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

function evaluatePhotonCenteredFittedComponent(component, phase) {
  return evaluatePhotonFittedComponent(component, phase) - (Number(component?.dc) || 0);
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

export async function buildPhotonDerivedPolarizationTraceWithSolverBridge(
  state,
  timeSeconds,
  sampleCount = DEFAULT_POLARIZATION_FIT_SAMPLES,
  options = {}
) {
  const referenceFrequency = getPhotonReferenceFrequency(state);
  const cycleDuration = 1 / referenceFrequency;
  const currentTime = Number.isFinite(timeSeconds) ? timeSeconds : 0;
  const fitCycleStart = getPhotonMiddleCycleBounds(state).start;
  const currentProgress =
    ((((currentTime - fitCycleStart) / cycleDuration) % 1) + 1) % 1;
  const currentPhase = TWO_PI * currentProgress;
  const minimumSampleCount = Math.max(
    3,
    Math.round(options.minimumPolarizationSampleCount ?? 24)
  );
  const count = Math.max(minimumSampleCount, Math.round(sampleCount));
  const rawSamples = await Promise.all(
    Array.from({ length: count }, async (_, index) => {
      const progress = index / count;
      const phase = TWO_PI * progress;
      const t = fitCycleStart + progress * cycleDuration;
      const field = await computePhotonObserverFieldWithSolverBridge(state, t, options);
      return {
        t,
        progress,
        phase,
        ey: field.electric.y,
        ez: field.electric.z,
      };
    })
  );

  const analyzerAngle = degreesToPhotonRadians(state?.polarization?.analyzerAngleDeg ?? 0);
  const fit = fitPhotonPolarizationFromSamples(rawSamples, analyzerAngle);
  const samples = [];
  for (let index = 0; index <= count; index += 1) {
    const progress = index / count;
    const phase = TWO_PI * progress;
    samples.push({
      progress,
      phase,
      ey: evaluatePhotonCenteredFittedComponent(fit.components.y, phase),
      ez: evaluatePhotonCenteredFittedComponent(fit.components.z, phase),
    });
  }

  const currentField = await computePhotonObserverFieldWithSolverBridge(
    state,
    currentTime,
    options
  );
  const rawCurrent = {
    ey: currentField.electric.y,
    ez: currentField.electric.z,
  };
  const fittedCurrent = {
    progress: currentProgress,
    phase: currentPhase,
    ey: evaluatePhotonCenteredFittedComponent(fit.components.y, currentPhase),
    ez: evaluatePhotonCenteredFittedComponent(fit.components.z, currentPhase),
  };
  const current = fittedCurrent;
  const projection = current.ey * fit.analyzer.y + current.ez * fit.analyzer.z;
  const scale = Math.max(
    1e-9,
    ...samples.flatMap((sample) => [Math.abs(sample.ey), Math.abs(sample.ez)]),
    ...rawSamples.flatMap((sample) => [
      Math.abs(sample.ey - fit.components.y.dc),
      Math.abs(sample.ez - fit.components.z.dc),
    ])
  );

  return {
    ...fit,
    solverEngineId: PHOTON_SOLVER_BRIDGE_ENGINE_ID,
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

export async function computePhotonAverageAnalyzerFractionWithSolverBridge(
  state,
  sampleCount = DEFAULT_ANALYZER_AVERAGE_SAMPLES,
  options = {}
) {
  const runDuration = getPhotonRunDuration(state);
  const minimumSampleCount = Math.max(
    1,
    Math.round(options.minimumAnalyzerSampleCount ?? 8)
  );
  const count = Math.max(minimumSampleCount, Math.round(sampleCount));
  const fractions = await Promise.all(
    Array.from({ length: count }, async (_, index) => {
      const t = (index / count) * runDuration;
      const field = await computePhotonObserverFieldWithSolverBridge(state, t, options);
      return field.analyzer.fraction;
    })
  );
  return fractions.reduce((sum, fraction) => sum + fraction, 0) / count;
}

export async function computePhotonFormulaSummaryWithSolverBridge(
  state,
  timeSeconds,
  options = {}
) {
  const wrappedTime = wrapPhotonTime(state, timeSeconds);
  const field = await computePhotonObserverFieldWithSolverBridge(state, wrappedTime, options);
  const polarization = await buildPhotonDerivedPolarizationTraceWithSolverBridge(
    state,
    wrappedTime,
    options.polarizationSampleCount ?? DEFAULT_POLARIZATION_FIT_SAMPLES,
    options
  );
  const stokes = polarization.stokes;
  const averageAnalyzerFraction = await computePhotonAverageAnalyzerFractionWithSolverBridge(
    state,
    options.analyzerSampleCount ?? DEFAULT_ANALYZER_AVERAGE_SAMPLES,
    options
  );
  const analyzerTarget = polarization.analyzerFractionTarget;
  const analyzerResidual = averageAnalyzerFraction - analyzerTarget;
  const selfHitDiagnostics = options.skipSelfHitDiagnostics === true
    ? summarizePhotonSelfHitRows([], "skipped", "Self-hit diagnostics skipped for this solve.")
    : await computePhotonSelfHitDiagnosticsWithSolverBridge(
      state,
      {
        ...options,
        measurement: field.measurement,
        selfHitObservationTime: wrappedTime,
      }
    );
  return {
    wrappedTime,
    solverEngineId: PHOTON_SOLVER_BRIDGE_ENGINE_ID,
    runDuration: getPhotonRunDuration(state),
    middleCycle: getPhotonMiddleCycleBounds(state),
    field,
    polarization,
    stokes,
    averageAnalyzerFraction,
    analyzerTarget,
    analyzerResidual,
    fitResidual: polarization.fitResidual,
    selfHitDiagnostics,
  };
}

export async function buildPhotonPlotSamplesWithSolverBridge(
  state,
  timeSeconds,
  sampleCount = 360,
  options = {}
) {
  const runDuration = getPhotonRunDuration(state);
  const currentTime = wrapPhotonTime(state, timeSeconds);
  const fields = await Promise.all(
    Array.from({ length: sampleCount + 1 }, async (_, index) => {
      const t = (index / sampleCount) * runDuration;
      const field = await computePhotonObserverFieldWithSolverBridge(state, t, options);
      return { index, t, field };
    })
  );
  let amplitudeScale = 0;
  const samples = fields.map(({ index, t, field }) => {
    amplitudeScale = Math.max(
      amplitudeScale,
      Math.abs(field.electric.y),
      Math.abs(field.electric.z)
    );
    return {
      t,
      progress: runDuration > 0 ? index / sampleCount : 0,
      ey: field.electric.y,
      ez: field.electric.z,
      analyzerFraction: field.analyzer.fraction,
    };
  });
  return {
    runDuration,
    currentTime,
    sourceMode: fields[0]?.field?.sourceMode ?? "",
    solverEngineId: PHOTON_SOLVER_BRIDGE_ENGINE_ID,
    middleCycle: getPhotonMiddleCycleBounds(state),
    amplitudeScale,
    samples,
  };
}

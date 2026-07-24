import {
  PRESCRIBED_PATH_ANALYSIS_ID,
  computeMovingCircularObserverField,
  createMovingCircularTransmitterLinearizedRootRequests,
  createMovingCircularSameTransmitterRootRequest,
  createMovingCircularTransmitterRootRequest,
  evaluateLinearHistoryPoint,
  evaluateMovingCircularTransmitterHistory,
  runPrescribedPathAnalysisRequest,
  solveCircularTransmitterRootsAndHits,
  solveMovingCircularAbsoluteHistoryRun,
  solveMovingCircularSameTransmitterCausalRoots,
  solveMovingCircularTransmitterCausalRoots,
} from "../../prescribed-path-analysis/PrescribedPathAnalysis.mjs";
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
  resolvePhotonSpeedSettings,
} from "./PhotonStateRuntime.js";
import {
  PHOTON_TRANSMITTER_HISTORY_BOUNDARY,
  PHOTON_TRANSMITTER_HISTORY_PROVIDER_ID,
  createPhotonConstrainedTransmitterHistoryProvider,
  getPhotonConstrainedBraidCenterX,
} from "./PhotonTransmitterHistoryRuntime.js";

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
const PHOTON_PHASE_LOCK_STABLE_SPREAD_DEG = 5;
const PHOTON_PHASE_LOCK_CANDIDATE_SPREAD_DEG = 15;
const PHOTON_PHASE_LOCK_DIFFUSE_SPREAD_DEG = 45;
const PHOTON_PHASE_LOCK_MIN_ROOT_COUNT = 2;
const JACOBIAN_FLOOR = 1e-4;
const DEFAULT_ANALYZER_AVERAGE_SAMPLES = 48;
const DEFAULT_POLARIZATION_FIT_SAMPLES = 144;
const DEFAULT_POLARIZATION_TRACE_SAMPLES = 144;
const MINIMUM_POLARIZATION_TRACE_SAMPLES = 72;
const DEFAULT_SOLVER_MEMORY_BUDGET_BYTES = 64 * 1024 * 1024;
const DEFAULT_PHOTON_ROOT_TOLERANCE = 1e-12;
const PHOTON_ANALYSIS_ID = PRESCRIBED_PATH_ANALYSIS_ID;
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

function createPhotonCausalRootsRunRequest(input = {}) {
  return {
    ...input,
    appId: "photon",
    runKind: "causalRoots",
    config: {
      appId: "photon",
      rootRequest: input.rootRequest,
    },
  };
}

function createSharedGeometryRunRequest(input = {}) {
  return {
    ...input,
    runKind: "sharedGeometry",
    config: {
      appId: input.appId,
      geometryRequest: input.geometryRequest,
    },
  };
}

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
    transmitterHistoryMode: state?.measurement?.transmitterHistoryMode === "absolute_history"
      ? "absolute_history"
      : "co_moving",
  };
}

function getPhotonBraidCenterX(state, braidId) {
  return getPhotonConstrainedBraidCenterX(state, braidId);
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

function getPhotonTransmitterMaxDelay(state, transmitterRef, measurement) {
  const layer = getPhotonLayer(state, transmitterRef.braidId, transmitterRef.layerId);
  const centerX = getPhotonBraidCenterX(state, transmitterRef.braidId);
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

export async function solvePhotonCausalRootsWithPrescribedPathAnalysis(rootRequest, options = {}) {
  const runHandle = await runPhotonCausalRootsWithPrescribedPathAnalysis(rootRequest, options);
  return Array.isArray(runHandle.response?.roots) ? runHandle.response.roots : [];
}

export function createPhotonCircularTransmitterCausalRootRequest(
  state,
  transmitterRef,
  observationTime,
  options = {}
) {
  const measurement = options.measurement ?? resolvePhotonMeasurementParameters(state);
  const layer = getPhotonLayer(state, transmitterRef.braidId, transmitterRef.layerId);
  const hitTime = Number(observationTime) || 0;
  const maxDelay = normalizeNonnegativeSolverNumber(
    options.maxDelay,
    getPhotonTransmitterMaxDelay(state, transmitterRef, measurement)
  );
  const transmitterEndTime = Number.isFinite(Number(options.transmitterEndTime))
    ? Number(options.transmitterEndTime)
    : hitTime;
  const transmitterStartTime = Number.isFinite(Number(options.transmitterStartTime))
    ? Number(options.transmitterStartTime)
    : transmitterEndTime - maxDelay;
  const frequency = Math.max(0, Math.abs(Number(layer.frequencyHz) || 0));
  const scanSubdivisions = normalizePositiveSolverInteger(
    options.scanSubdivisions,
    Math.min(
      ROOT_SCAN_MAX_STEPS,
      Math.max(ROOT_SCAN_MIN_STEPS, Math.ceil(maxDelay * frequency * ROOT_SCAN_STEPS_PER_CYCLE))
    )
  );
  const radius = Number(layer.radius) || 0;
  const centerX = getPhotonBraidCenterX(state, transmitterRef.braidId);
  const angularVelocity = getPhotonDirectionSign(state, transmitterRef.braidId) *
    TWO_PI *
    (Number(layer.frequencyHz) || 0);

  const request = {
    transmitter: {
      startTime: transmitterStartTime,
      endTime: transmitterEndTime,
      center: { x: centerX, y: 0, z: 0 },
      radiusU: { x: 0, y: radius, z: 0 },
      radiusV: { x: 0, y: 0, z: radius },
      angularVelocity,
      phaseAtEpoch: getPhotonLayerAngleRadians(
        state,
        transmitterRef.braidId,
        transmitterRef.layerId,
        0,
        transmitterRef.chargeType
      ),
      epochTime: 0,
      errorBound: options.transmitterErrorBound ?? 0,
    },
    receiver: {
      startTime: Math.min(transmitterStartTime, hitTime),
      endTime: Math.max(transmitterEndTime, hitTime),
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

export async function solvePhotonCircularTransmitterRootsHitsLedgerWithPrescribedPathAnalysis(
  state,
  transmitterRef,
  observationTime,
  options = {}
) {
  const request = options.request ??
    createPhotonCircularTransmitterCausalRootRequest(state, transmitterRef, observationTime, options);
  const response = typeof options.solveCircularTransmitterRootsHitsLedger === "function"
    ? await options.solveCircularTransmitterRootsHitsLedger(request)
    : await runPhotonCircularTransmitterPrescribedPathAnalysis(options, request);
  return {
    analysisId: PHOTON_ANALYSIS_ID,
    ...response,
  };
}

export async function solvePhotonCircularTransmitterCausalRootsWithPrescribedPathAnalysis(
  state,
  transmitterRef,
  observationTime,
  options = {}
) {
  const response = await solvePhotonCircularTransmitterRootsHitsLedgerWithPrescribedPathAnalysis(
    state,
    transmitterRef,
    observationTime,
    options
  );
  return Array.isArray(response?.roots) ? response.roots : [];
}

export async function runPhotonCausalRootsWithPrescribedPathAnalysis(rootRequest, options = {}) {
  const runRequest =
    options.runRequest ?? createPhotonCausalRootsSolverRunRequest(rootRequest, options);
  const runHandle = await runPhotonPrescribedPathAnalysis(options, rootRequest, runRequest);
  return {
    analysisId: PHOTON_ANALYSIS_ID,
    ...runHandle,
  };
}

async function runPhotonPrescribedPathAnalysis(options, rootRequest, runRequest) {
  const run = options.runPrescribedPathAnalysis ?? runPrescribedPathAnalysisRequest;
  return run(runRequest);
}

async function runPhotonCircularTransmitterPrescribedPathAnalysis(options, request) {
  const solve = options.solveCircularTransmitterRootsAndHits ?? solveCircularTransmitterRootsAndHits;
  return solve(request);
}

function createDefaultPhotonCausalRootsModel() {
  return {
    modelId: "aaa.photon",
    equationVersion: "causal-root-linear-transmitter-v1",
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
  const transmitterStart = Number(rootRequest?.transmitter?.startTime) || 0;
  const receiverStart = Number(rootRequest?.receiver?.startTime) || 0;
  const hitTime = Number(rootRequest?.hitTime) || 0;
  const start = Math.min(transmitterStart, receiverStart, hitTime);
  const end = Math.max(
    Number(rootRequest?.transmitter?.endTime) || hitTime,
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
    interactionPolicy: "single-transmitter-receiver-causal-root",
    expectedBranchComplexity: "low",
    outputDetail: "root-ledger",
    memoryBudgetBytes,
    storageBudgetBytes: memoryBudgetBytes,
    latencyTarget: "interactive",
    simplificationPolicy: "linear-transmitter-and-receiver-segments",
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
    branchPolicy: "first-positive-same-transmitter-root",
    unitConvention: "relative-speed-ratio",
    compatiblePrecisionPaths: ["scaled_f64_strict", "event_root_focused", "extended_precision"],
  };
}

function createDefaultPhotonSelfHitGeometryEnvelope({
  records = [],
  memoryBudgetBytes = DEFAULT_SOLVER_MEMORY_BUDGET_BYTES,
} = {}) {
  const maxRatio = records.reduce(
    (maximum, record) => Math.max(maximum, Number(record.fieldSpeedRatio) || 0),
    0
  );
  return {
    entityCount: records.length,
    assemblyCount: records.length > 0 ? 1 : 0,
    timeWindow: {
      start: 0,
      end: DEFAULT_SELF_HIT_MAX_ANGLE / TWO_PI,
      stepHint: 1 / (DEFAULT_SELF_HIT_SCAN_SUBDIVISIONS * 2),
      units: "cycles",
    },
    timeResolutionHint: 1 / (DEFAULT_SELF_HIT_SCAN_SUBDIVISIONS * 2),
    interactionPolicy: "same-transmitter-enabled",
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
        speedBudgetKind: "orthogonal_local_c_translation_plus_transverse_orbital",
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
      records: descriptors,
      memoryBudgetBytes,
    }),
    errorBudget: options.errorBudget ?? createDefaultPhotonCausalRootsErrorBudget(tolerance),
    geometryRequest: {
      circularSelfHitSpans: descriptors.map((descriptor) => ({
        fieldSpeedRatio: descriptor.fieldSpeedRatio,
        speedBudgetKind: descriptor.speedBudgetKind,
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

async function runPhotonMovingCircularTransmitterPrescribedPathAnalysis(options, request) {
  const solve = options.solveMovingCircularTransmitterCausalRoots ?? solveMovingCircularTransmitterCausalRoots;
  return solve(request);
}

async function runPhotonMovingCircularSameTransmitterPrescribedPathAnalysis(options, request) {
  const solve = options.solveMovingCircularSameTransmitterCausalRoots ??
    solveMovingCircularSameTransmitterCausalRoots;
  return solve(request);
}

async function runPhotonMovingCircularObserverFieldPrescribedPathAnalysis(options, request) {
  const compute = options.computeMovingCircularObserverField ?? computeMovingCircularObserverField;
  return compute(request);
}

async function runPhotonMovingCircularAbsoluteHistoryRunPrescribedPathAnalysis(options, request) {
  const solve = options.solveMovingCircularAbsoluteHistoryRun ??
    solveMovingCircularAbsoluteHistoryRun;
  return solve(request);
}

async function runPhotonSelfHitPrescribedPathAnalysis(options, descriptors, runRequest) {
  const run = options.runPrescribedPathAnalysis ?? runPrescribedPathAnalysisRequest;
  return run(runRequest);
}

function extractPhotonCircularSelfHitRecords(runHandle = {}, descriptors = []) {
  const response = runHandle.response ?? runHandle;
  const geometry = response.geometry ?? response;
  const records = Array.isArray(geometry.circularSelfHitSpans) ? geometry.circularSelfHitSpans : [];
  return descriptors.map((descriptor, index) => {
    const record = records.find((candidate) => candidate.itemIndex === index) ?? records[index] ?? {};
    return {
      analysisId: PHOTON_ANALYSIS_ID,
      runId: response.runId ?? runHandle.runId ?? "",
      datasetId: response.datasetId ?? runHandle.datasetId ?? "",
      ...descriptor,
      itemIndex: index,
      statusCode: Number.isFinite(Number(record.statusCode)) ? Number(record.statusCode) : -1,
      regime: record.regime ?? (
        descriptor.fieldSpeedRatio > 1 + DEFAULT_SELF_HIT_FIELD_SPEED_TOLERANCE
          ? "super_field"
          : descriptor.fieldSpeedRatio < 1 - DEFAULT_SELF_HIT_FIELD_SPEED_TOLERANCE
            ? "sub_field"
            : "field_speed"
      ),
      resultKind: record.resultKind ?? "missing_analysis_record",
      span: Number(record.span) || 0,
      rootFound: record.rootFound === true,
      bracketLow: Number(record.bracketLow) || 0,
      bracketHigh: Number(record.bracketHigh) || 0,
      residual: Number.isFinite(Number(record.residual)) ? Number(record.residual) : 0,
      iterations: Number.isFinite(Number(record.iterations)) ? Number(record.iterations) : 0,
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

function createPhotonSelfHitRegimeCounts() {
  return {
    sub_field: 0,
    field_speed: 0,
    super_field: 0,
  };
}

function incrementPhotonSelfHitRegimeCount(counts, regime) {
  if (regime === "super_field") {
    counts.super_field += 1;
  } else if (regime === "field_speed") {
    counts.field_speed += 1;
  } else {
    counts.sub_field += 1;
  }
}

function summarizePhotonSelfHitSpeedRegimes(records = []) {
  const recordCounts = createPhotonSelfHitRegimeCounts();
  const rootCounts = createPhotonSelfHitRegimeCounts();
  (Array.isArray(records) ? records : []).forEach((record) => {
    const regime = record.regime ?? getPhotonSelfHitRegime(record.fieldSpeedRatio);
    incrementPhotonSelfHitRegimeCount(recordCounts, regime);
    if (record.rootFound === true) {
      incrementPhotonSelfHitRegimeCount(rootCounts, regime);
    }
  });
  return {
    recordCounts,
    rootCounts,
    subFieldRecords: recordCounts.sub_field,
    fieldSpeedRecords: recordCounts.field_speed,
    selfHitCandidateRecords: recordCounts.super_field,
    subFieldRoots: rootCounts.sub_field,
    fieldSpeedRoots: rootCounts.field_speed,
    selfHitRoots: rootCounts.super_field,
  };
}

function classifyPhotonSelfHitSpeedFamily(regimeCounts) {
  if ((regimeCounts?.super_field ?? 0) > 0) {
    return {
      speedFamily: "self_hit",
      speedFamilyLabel: "self-hit",
    };
  }
  if ((regimeCounts?.field_speed ?? 0) > 0) {
    return {
      speedFamily: "field_speed_boundary",
      speedFamilyLabel: "field-speed boundary",
    };
  }
  return {
    speedFamily: "sub_field",
    speedFamilyLabel: "sub-field",
  };
}

function classifyPhotonHelicalSelfHitPhaseFamily({
  rootCount,
  transmitterPhaseSpreadDeg,
  receiverPhaseSpreadDeg,
  minJacobianAbs,
} = {}) {
  const roots = Number.isFinite(Number(rootCount)) ? Number(rootCount) : 0;
  const transmitterSpread = Number.isFinite(Number(transmitterPhaseSpreadDeg))
    ? Number(transmitterPhaseSpreadDeg)
    : 0;
  const receiverSpread = Number.isFinite(Number(receiverPhaseSpreadDeg))
    ? Number(receiverPhaseSpreadDeg)
    : 0;
  const maxPhaseSpreadDeg = Math.max(transmitterSpread, receiverSpread);
  const jacobianAbs = Number.isFinite(Number(minJacobianAbs)) ? Number(minJacobianAbs) : 0;
  if (roots < PHOTON_PHASE_LOCK_MIN_ROOT_COUNT) {
    return {
      phaseLockClassification: "single_hit",
      phaseLockLabel: "single-hit",
      phaseLockStable: false,
      phaseLockCandidate: false,
      maxPhaseSpreadDeg,
    };
  }
  if (jacobianAbs <= JACOBIAN_FLOOR) {
    return {
      phaseLockClassification: "singular_candidate",
      phaseLockLabel: "singular candidate",
      phaseLockStable: false,
      phaseLockCandidate: false,
      maxPhaseSpreadDeg,
    };
  }
  if (maxPhaseSpreadDeg <= PHOTON_PHASE_LOCK_STABLE_SPREAD_DEG) {
    return {
      phaseLockClassification: "stable_phase_lock",
      phaseLockLabel: "stable phase-lock",
      phaseLockStable: true,
      phaseLockCandidate: true,
      maxPhaseSpreadDeg,
    };
  }
  if (maxPhaseSpreadDeg <= PHOTON_PHASE_LOCK_CANDIDATE_SPREAD_DEG) {
    return {
      phaseLockClassification: "candidate_phase_lock",
      phaseLockLabel: "phase-lock candidate",
      phaseLockStable: false,
      phaseLockCandidate: true,
      maxPhaseSpreadDeg,
    };
  }
  if (maxPhaseSpreadDeg <= PHOTON_PHASE_LOCK_DIFFUSE_SPREAD_DEG) {
    return {
      phaseLockClassification: "diffuse_phase_family",
      phaseLockLabel: "diffuse phase family",
      phaseLockStable: false,
      phaseLockCandidate: false,
      maxPhaseSpreadDeg,
    };
  }
  return {
    phaseLockClassification: "phase_drift",
    phaseLockLabel: "phase drift",
    phaseLockStable: false,
    phaseLockCandidate: false,
    maxPhaseSpreadDeg,
  };
}

function summarizePhotonHelicalSelfHitPhaseFamilies(helicalRecords = []) {
  const groups = new Map();
  (Array.isArray(helicalRecords) ? helicalRecords : []).forEach((record) => {
    const roots = Array.isArray(record.roots) ? record.roots : [];
    roots.forEach((root) => {
      const phase = root.phaseAtHit ?? record.phaseAtHit;
      if (!phase || phase.rootKind !== "same-transmitter") {
        return;
      }
      const transmitterCycleIndex = Number.isFinite(Number(phase.transmitterPhaseCycleIndex))
        ? Number(phase.transmitterPhaseCycleIndex)
        : 0;
      const role = record.role ?? phase.transmitterRole ?? record.braidId ?? "transmitter";
      const layerId = record.layerId ?? phase.transmitterLayerId ?? "?";
      const chargeType = record.chargeType ?? phase.transmitterChargeType ?? "?";
      const chargeSign = Number.isFinite(Number(record.chargeSign))
        ? Number(record.chargeSign)
        : Number(phase.transmitterChargeSign) || 0;
      const regime = record.regime ?? getPhotonSelfHitRegime(record.fieldSpeedRatio);
      const key = [role, layerId, chargeType, transmitterCycleIndex].join("|");
      if (!groups.has(key)) {
        groups.set(key, {
          key,
          role,
          layerId,
          chargeType,
          chargeSign,
          transmitterCycleIndex,
          transmitterPhases: [],
          receiverPhases: [],
          regimeCounts: createPhotonSelfHitRegimeCounts(),
          maxFieldSpeedRatio: 0,
          minJacobianAbs: Number.POSITIVE_INFINITY,
          rootCount: 0,
        });
      }
      const group = groups.get(key);
      group.rootCount += 1;
      incrementPhotonSelfHitRegimeCount(group.regimeCounts, regime);
      group.maxFieldSpeedRatio = Math.max(
        group.maxFieldSpeedRatio,
        Number(record.fieldSpeedRatio) || 0
      );
      if (Number.isFinite(Number(phase.transmitterPhaseDegrees))) {
        group.transmitterPhases.push(Number(phase.transmitterPhaseDegrees));
      }
      if (Number.isFinite(Number(phase.receiverPhaseDegrees))) {
        group.receiverPhases.push(Number(phase.receiverPhaseDegrees));
      }
      group.minJacobianAbs = Math.min(
        group.minJacobianAbs,
        Math.abs(Number(root.jacobian) || Number(record.jacobian) || 0)
      );
    });
  });

  const families = Array.from(groups.values())
    .map((group) => {
      const transmitterPhaseSpreadDeg = computePhotonCircularSpreadDegrees(group.transmitterPhases);
      const receiverPhaseSpreadDeg = computePhotonCircularSpreadDegrees(group.receiverPhases);
      const minJacobianAbs = Number.isFinite(group.minJacobianAbs) ? group.minJacobianAbs : 0;
      const phaseLock = classifyPhotonHelicalSelfHitPhaseFamily({
        rootCount: group.rootCount,
        transmitterPhaseSpreadDeg,
        receiverPhaseSpreadDeg,
        minJacobianAbs,
      });
      const speedFamily = classifyPhotonSelfHitSpeedFamily(group.regimeCounts);
      const label = [
        group.role,
        group.layerId,
        formatPhotonChargeLabel(group.chargeType),
        `c${group.transmitterCycleIndex}`,
      ].join(" ");
      return {
        key: group.key,
        label,
        role: group.role,
        layerId: group.layerId,
        chargeType: group.chargeType,
        chargeSign: group.chargeSign,
        transmitterCycleIndex: group.transmitterCycleIndex,
        rootCount: group.rootCount,
        transmitterPhaseSpreadDeg,
        receiverPhaseSpreadDeg,
        minJacobianAbs,
        maxFieldSpeedRatio: group.maxFieldSpeedRatio,
        regimeCounts: group.regimeCounts,
        ...speedFamily,
        ...phaseLock,
      };
    })
    .sort((a, b) =>
      Number(b.phaseLockStable) - Number(a.phaseLockStable) ||
      Number(b.phaseLockCandidate) - Number(a.phaseLockCandidate) ||
      b.rootCount - a.rootCount ||
      a.transmitterPhaseSpreadDeg - b.transmitterPhaseSpreadDeg ||
      a.label.localeCompare(b.label)
    );
  const stableFamilies = families.filter(
    (family) => family.phaseLockCandidate === true
  );
  const bestFamily = stableFamilies[0] ?? families[0] ?? null;
  return {
    families,
    familyCount: families.length,
    stableFamilyCount: stableFamilies.length,
    stablePhaseLockFamilyCount: families.filter((family) => family.phaseLockStable === true).length,
    candidatePhaseLockFamilyCount: families.filter((family) => family.phaseLockCandidate === true).length,
    singularCandidateFamilyCount: families.filter(
      (family) => family.phaseLockClassification === "singular_candidate"
    ).length,
    diffusePhaseFamilyCount: families.filter(
      (family) => family.phaseLockClassification === "diffuse_phase_family"
    ).length,
    phaseDriftFamilyCount: families.filter(
      (family) => family.phaseLockClassification === "phase_drift"
    ).length,
    singleHitFamilyCount: families.filter(
      (family) => family.phaseLockClassification === "single_hit"
    ).length,
    selfHitFamilyCount: families.filter((family) => family.speedFamily === "self_hit").length,
    subFieldFamilyCount: families.filter((family) => family.speedFamily === "sub_field").length,
    fieldSpeedBoundaryFamilyCount: families.filter((family) => family.speedFamily === "field_speed_boundary").length,
    bestFamily,
  };
}

function summarizePhotonSelfHitRecords(records = [], status = "ok", message = "", helicalRecords = []) {
  const safeRecords = Array.isArray(records) ? records : [];
  const safeHelicalRecords = Array.isArray(helicalRecords) ? helicalRecords : [];
  const helicalPhaseFamilies = summarizePhotonHelicalSelfHitPhaseFamilies(safeHelicalRecords);
  const speedRegimeSummary = summarizePhotonSelfHitSpeedRegimes(safeRecords);
  const helicalSpeedRegimeSummary = summarizePhotonSelfHitSpeedRegimes(safeHelicalRecords);
  const maxFieldSpeedRatio = safeRecords.reduce(
    (maximum, record) => Math.max(maximum, Number(record.fieldSpeedRatio) || 0),
    0
  );
  const rootFoundCount = safeRecords.filter((record) => record.rootFound === true).length;
  const candidateCount = safeRecords.filter(
    (record) => (Number(record.fieldSpeedRatio) || 0) > 1 + DEFAULT_SELF_HIT_FIELD_SPEED_TOLERANCE
  ).length;
  const helicalRootFoundCount = safeHelicalRecords.filter((record) => record.rootFound === true).length;
  const helicalCandidateCount = safeHelicalRecords.filter(
    (record) => (Number(record.fieldSpeedRatio) || 0) > 1 + DEFAULT_SELF_HIT_FIELD_SPEED_TOLERANCE
  ).length;
  const helicalMaxFieldSpeedRatio = safeHelicalRecords.reduce(
    (maximum, record) => Math.max(maximum, Number(record.fieldSpeedRatio) || 0),
    0
  );
  return {
    analysisId: PHOTON_ANALYSIS_ID,
    status,
    message,
    records: safeRecords,
    recordCount: safeRecords.length,
    candidateCount,
    rootFoundCount,
    maxFieldSpeedRatio,
    speedRegimeSummary,
    helicalRecords: safeHelicalRecords,
    helicalRecordCount: safeHelicalRecords.length,
    helicalCandidateCount,
    helicalRootFoundCount,
    helicalMaxFieldSpeedRatio,
    helicalSpeedRegimeSummary,
    helicalPhaseFamilies: helicalPhaseFamilies.families,
    helicalPhaseFamilyCount: helicalPhaseFamilies.familyCount,
    helicalStablePhaseFamilyCount: helicalPhaseFamilies.stableFamilyCount,
    helicalStablePhaseLockFamilyCount: helicalPhaseFamilies.stablePhaseLockFamilyCount,
    helicalCandidatePhaseLockFamilyCount: helicalPhaseFamilies.candidatePhaseLockFamilyCount,
    helicalSingularCandidateFamilyCount: helicalPhaseFamilies.singularCandidateFamilyCount,
    helicalDiffusePhaseFamilyCount: helicalPhaseFamilies.diffusePhaseFamilyCount,
    helicalPhaseDriftFamilyCount: helicalPhaseFamilies.phaseDriftFamilyCount,
    helicalSingleHitFamilyCount: helicalPhaseFamilies.singleHitFamilyCount,
    helicalSelfHitFamilyCount: helicalPhaseFamilies.selfHitFamilyCount,
    helicalSubFieldFamilyCount: helicalPhaseFamilies.subFieldFamilyCount,
    helicalFieldSpeedBoundaryFamilyCount: helicalPhaseFamilies.fieldSpeedBoundaryFamilyCount,
    helicalBestPhaseFamily: helicalPhaseFamilies.bestFamily,
  };
}

function createPhotonHelicalSelfHitRootRequest(state, transmitterRef, measurement, hitTime, options = {}) {
  const provider = createPhotonConstrainedTransmitterHistoryProvider(state, transmitterRef, measurement, {
    transmitterHistoryKind: "moving-circular-same-transmitter",
    receiverHistoryKind: "same-constrained-architrino-transmitter",
  });
  const layer = getPhotonLayer(state, transmitterRef.braidId, transmitterRef.layerId);
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
  return {
    ...createMovingCircularSameTransmitterRootRequest({
      transmitter: provider.transmitter,
      hitTime,
      signalSpeed: measurement.emissionSpeedCf,
      transmitterStartTime: hitTime - maxDelay,
      transmitterEndTime: hitTime,
      minimumDelay: options.helicalSelfHitMinimumDelay ?? options.selfHitMinimumDelay ?? 1e-6,
      rootTolerance: options.helicalSelfHitRootTolerance ?? options.rootTolerance ?? DEFAULT_PHOTON_ROOT_TOLERANCE,
      maxIterations: options.helicalSelfHitMaxIterations ?? options.maxIterations ?? 96,
      scanSubdivisions,
      maxRoots: normalizePositiveSolverInteger(options.helicalSelfHitMaxRoots ?? options.maxRoots, 8),
      transmitterRef,
    }),
    transmitterHistoryProvider: provider,
    analysisBoundary: PHOTON_TRANSMITTER_HISTORY_BOUNDARY,
  };
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

async function createPhotonHelicalSelfHitRecord(state, descriptor, chargeType, itemIndex, measurement, options = {}) {
  const transmitterRef = {
    braidId: descriptor.braidId,
    layerId: descriptor.layerId,
    chargeType,
  };
  const hitTime = Number.isFinite(Number(options.selfHitObservationTime))
    ? Number(options.selfHitObservationTime)
    : 0;
  const request = createPhotonHelicalSelfHitRootRequest(state, transmitterRef, measurement, hitTime, options);
  const response = typeof options.solveMovingCircularSameTransmitterRoots === "function"
    ? await options.solveMovingCircularSameTransmitterRoots(request)
    : await runPhotonMovingCircularSameTransmitterPrescribedPathAnalysis(options, request);
  const roots = (Array.isArray(response?.roots) ? response.roots : [])
    .map((root) => ({
      ...root,
      phaseAtHit: createPhotonSelfHitPhaseAtHitRecord(
        state,
        transmitterRef,
        root.emissionTime,
        root.transmitterPhase,
        root.hitTime,
        root.receiverPhase
      ),
    }))
    .sort((a, b) => a.delay - b.delay);
  const firstRoot = roots[0] ?? null;
  return {
    analysisId: PHOTON_ANALYSIS_ID,
    itemIndex,
    transmitterHistoryKind: "moving-circular-same-transmitter",
    transmitterHistoryProviderId:
      request.transmitterHistoryProvider?.providerId ?? PHOTON_TRANSMITTER_HISTORY_PROVIDER_ID,
    transmitterHistoryProviderKind:
      request.transmitterHistoryProvider?.providerKind ?? "constrained_architrino_motion",
    analysisBoundary: request.analysisBoundary ?? PHOTON_TRANSMITTER_HISTORY_BOUNDARY,
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
    transmitterPhaseDegrees: Number.isFinite(Number(firstRoot?.phaseAtHit?.transmitterPhaseDegrees))
      ? Number(firstRoot.phaseAtHit.transmitterPhaseDegrees)
      : null,
    receiverPhaseDegrees: Number.isFinite(Number(firstRoot?.phaseAtHit?.receiverPhaseDegrees))
      ? Number(firstRoot.phaseAtHit.receiverPhaseDegrees)
      : null,
    phaseAtHit: firstRoot?.phaseAtHit ?? null,
    rejectedReason: firstRoot ? "" : response?.rejectedReason || response?.status?.code || "no_roots",
    scan: response?.scan ?? null,
  };
}

async function createPhotonHelicalSelfHitRecords(state, measurement, descriptors, options = {}) {
  const records = await Promise.all(
    descriptors.flatMap((descriptor) =>
      PHOTON_CHARGE_TYPES.map((chargeType, chargeIndex) => {
        const itemIndex = recordIndexForPhotonSelfHit(descriptor, chargeIndex);
        return createPhotonHelicalSelfHitRecord(
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
  return records.map((record, index) => ({ ...record, itemIndex: index }));
}

function recordIndexForPhotonSelfHit(descriptor, chargeIndex) {
  const braidOffset = descriptor.braidId === "right" ? PHOTON_LAYER_ORDER.length * PHOTON_CHARGE_TYPES.length : 0;
  const layerOffset = Math.max(0, PHOTON_LAYER_ORDER.indexOf(descriptor.layerId)) * PHOTON_CHARGE_TYPES.length;
  return braidOffset + layerOffset + chargeIndex;
}

export async function computePhotonSelfHitDiagnosticsWithPrescribedPathAnalysis(state, options = {}) {
  const measurement = options.measurement ?? resolvePhotonMeasurementParameters(state);
  const descriptors = buildPhotonSelfHitLayerDescriptors(state, measurement);
  if (descriptors.length === 0) {
    return summarizePhotonSelfHitRecords([], "empty", "No enabled photon binaries.");
  }
  const helicalRecords = await createPhotonHelicalSelfHitRecords(state, measurement, descriptors, options);
  if (options.skipSpanSelfHitDiagnostics === true) {
    const records = descriptors.map((descriptor, index) => ({
      analysisId: PHOTON_ANALYSIS_ID,
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
    return summarizePhotonSelfHitRecords(
      records,
      "span-skipped",
      "Self-hit span records skipped; helical same-transmitter causal hits computed.",
      helicalRecords
    );
  }
  const runRequest = options.selfHitRunRequest ??
    createPhotonCircularSelfHitSpansRunRequest(state, {
      ...options,
      measurement,
      descriptors,
    });
  const runHandle = await runPhotonSelfHitPrescribedPathAnalysis(options, descriptors, runRequest);
  return summarizePhotonSelfHitRecords(
    extractPhotonCircularSelfHitRecords(runHandle, descriptors),
    "ok",
    "Self-hit span records computed by prescribed-path analysis.",
    helicalRecords
  );
}

function getPhotonAbsoluteTransmitterMaxDelay(state, transmitterRef, measurement) {
  const layer = getPhotonLayer(state, transmitterRef.braidId, transmitterRef.layerId);
  const centerX = getPhotonBraidCenterX(state, transmitterRef.braidId);
  const observerX = measurement.virtualObserver.x;
  const longitudinalGap = Math.abs(observerX - centerX);
  const transverseGap =
    Math.hypot(measurement.virtualObserver.y, measurement.virtualObserver.z) +
    Math.max(0, Number(layer.radius) || 0);
  const signalSpeed = Math.max(EPSILON, measurement.emissionSpeedCf);
  const photonSpeed = Math.max(0, Number(measurement.photonSpeedCf) || 0);
  const catchupMargin = Math.max(0, signalSpeed - photonSpeed);
  const coMovingDelay = getPhotonTransmitterMaxDelay(state, transmitterRef, measurement);
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

export function createPhotonAbsoluteTransmitterSegmentCausalRootRequests(
  state,
  transmitterRef,
  observationTime,
  options = {}
) {
  const measurement = options.measurement ?? resolvePhotonMeasurementParameters(state);
  const provider = createPhotonConstrainedTransmitterHistoryProvider(state, transmitterRef, measurement, {
    transmitterHistoryKind: "moving-circular-transmitter-linearized",
    approximationPolicy: "linearized-moving-circular-transmitter-segments",
  });
  const hitTime = Number(observationTime) || 0;
  const maxDelay = normalizeNonnegativeSolverNumber(
    options.maxDelay,
    getPhotonAbsoluteTransmitterMaxDelay(state, transmitterRef, measurement)
  );
  const segmentCount = normalizePositiveSolverInteger(
    options.absoluteHistorySegments,
    DEFAULT_ABSOLUTE_HISTORY_SEGMENTS
  );
  const transmitterStartTime = Number.isFinite(Number(options.transmitterStartTime))
    ? Number(options.transmitterStartTime)
    : hitTime - maxDelay;
  const transmitterEndTime = Number.isFinite(Number(options.transmitterEndTime))
    ? Number(options.transmitterEndTime)
    : hitTime;
  return createMovingCircularTransmitterLinearizedRootRequests({
    transmitter: provider.transmitter,
    receiver: provider.receiver,
    hitTime,
    signalSpeed: measurement.emissionSpeedCf,
    transmitterStartTime,
    transmitterEndTime,
    segmentCount,
    rootTolerance: options.rootTolerance ?? DEFAULT_PHOTON_ROOT_TOLERANCE,
    maxIterations: options.maxIterations ?? 64,
    scanSubdivisions: normalizePositiveSolverInteger(options.scanSubdivisions, 8),
    maxRoots: normalizePositiveSolverInteger(options.maxRoots, 4),
    maxHits: normalizePositiveSolverInteger(options.maxHits, 4),
    transmitterErrorBound: options.transmitterErrorBound ?? 0,
    receiverErrorBound: options.receiverErrorBound ?? 0,
    transmitterRef,
  }).map((request) => ({
    ...request,
    transmitterHistoryProvider: provider,
    analysisBoundary: PHOTON_TRANSMITTER_HISTORY_BOUNDARY,
  }));
}

export function createPhotonAbsoluteMovingCircularCausalRootRequest(
  state,
  transmitterRef,
  observationTime,
  options = {}
) {
  const measurement = options.measurement ?? resolvePhotonMeasurementParameters(state);
  const provider = createPhotonConstrainedTransmitterHistoryProvider(state, transmitterRef, measurement);
  const hitTime = Number(observationTime) || 0;
  const maxDelay = normalizeNonnegativeSolverNumber(
    options.maxDelay,
    getPhotonAbsoluteTransmitterMaxDelay(state, transmitterRef, measurement)
  );
  const transmitterStartTime = Number.isFinite(Number(options.transmitterStartTime))
    ? Number(options.transmitterStartTime)
    : hitTime - maxDelay;
  const transmitterEndTime = Number.isFinite(Number(options.transmitterEndTime))
    ? Number(options.transmitterEndTime)
    : hitTime;
  const layer = getPhotonLayer(state, transmitterRef.braidId, transmitterRef.layerId);
  const frequency = Math.max(0, Math.abs(Number(layer.frequencyHz) || 0));
  const scanSubdivisions = normalizePositiveSolverInteger(
    options.scanSubdivisions,
    Math.min(
      ROOT_SCAN_MAX_STEPS,
      Math.max(ROOT_SCAN_MIN_STEPS, Math.ceil(maxDelay * frequency * ROOT_SCAN_STEPS_PER_CYCLE))
    )
  );
  return {
    ...createMovingCircularTransmitterRootRequest({
      transmitter: provider.transmitter,
      receiver: provider.receiver,
      hitTime,
      signalSpeed: measurement.emissionSpeedCf,
      transmitterStartTime,
      transmitterEndTime,
      rootTolerance: options.rootTolerance ?? DEFAULT_PHOTON_ROOT_TOLERANCE,
      maxIterations: options.maxIterations ?? 96,
      scanSubdivisions,
      maxRoots: normalizePositiveSolverInteger(options.maxRoots, Math.max(16, scanSubdivisions + 1)),
      transmitterRef,
    }),
    transmitterHistoryProvider: provider,
    analysisBoundary: PHOTON_TRANSMITTER_HISTORY_BOUNDARY,
  };
}

export function createPhotonAbsoluteHistoryRunRequest(
  state,
  observationTime,
  options = {}
) {
  const measurement = options.measurement ?? resolvePhotonMeasurementParameters(state);
  const transmitterRefs = Array.isArray(options.transmitterRefs)
    ? options.transmitterRefs
    : buildPhotonArchitrinoTransmitterRefs(state);
  return {
    transmitterHistoryProviderId: PHOTON_TRANSMITTER_HISTORY_PROVIDER_ID,
    analysisBoundary: PHOTON_TRANSMITTER_HISTORY_BOUNDARY,
    signalSpeed: measurement.emissionSpeedCf,
    observerFieldRequest: {
      signalSpeed: measurement.emissionSpeedCf,
      jacobianFloor: JACOBIAN_FLOOR,
      unstableGapThreshold: 0.05,
      transmitterHistoryProviderId: PHOTON_TRANSMITTER_HISTORY_PROVIDER_ID,
      analysisBoundary: PHOTON_TRANSMITTER_HISTORY_BOUNDARY,
    },
    transmitterRootRequests: transmitterRefs.map((transmitterRef) => ({
      ...createPhotonAbsoluteMovingCircularCausalRootRequest(
        state,
        transmitterRef,
        observationTime,
        {
          ...options,
          measurement,
        }
      ),
      branchChargeSign: PHOTON_CHARGE_SIGN[transmitterRef.chargeType] ?? 0,
    })),
  };
}

function createPhotonPhaseAtHitRecord(state, transmitterRef, emissionTime, transmitterPhase = null) {
  const rawPhase = Number.isFinite(Number(transmitterPhase?.rawRadians))
    ? Number(transmitterPhase.rawRadians)
    : getPhotonLayerAngleRadians(
      state,
      transmitterRef.braidId,
      transmitterRef.layerId,
      emissionTime,
      transmitterRef.chargeType
    );
  const wrappedPhase = Number.isFinite(Number(transmitterPhase?.radians))
    ? Number(transmitterPhase.radians)
    : ((rawPhase % TWO_PI) + TWO_PI) % TWO_PI;
  return {
    rootKind: "transmitter-to-virtual-observer",
    transmitterRole: state?.pair?.[transmitterRef.braidId]?.role ?? transmitterRef.braidId,
    transmitterBraidId: transmitterRef.braidId,
    transmitterLayerId: transmitterRef.layerId,
    transmitterChargeType: transmitterRef.chargeType,
    transmitterChargeSign: PHOTON_CHARGE_SIGN[transmitterRef.chargeType] ?? 0,
    transmitterEmissionTime: emissionTime,
    transmitterPhaseRadians: wrappedPhase,
    transmitterPhaseDegrees: wrappedPhase * 180 / Math.PI,
    transmitterPhaseRawRadians: rawPhase,
    transmitterPhaseCycleIndex: Number.isFinite(Number(transmitterPhase?.cycleIndex))
      ? Number(transmitterPhase.cycleIndex)
      : Math.floor(rawPhase / TWO_PI),
    receiverKind: "virtual-observer",
    receiverPhaseRadians: null,
    receiverPhaseDegrees: null,
    receiverPhaseCycleIndex: null,
  };
}

function createPhotonSelfHitPhaseAtHitRecord(
  state,
  transmitterRef,
  emissionTime,
  transmitterPhase = null,
  hitTime = 0,
  receiverPhase = null
) {
  const transmitterRecord = createPhotonPhaseAtHitRecord(state, transmitterRef, emissionTime, transmitterPhase);
  const receiverRawPhase = Number.isFinite(Number(receiverPhase?.rawRadians))
    ? Number(receiverPhase.rawRadians)
    : getPhotonLayerAngleRadians(
      state,
      transmitterRef.braidId,
      transmitterRef.layerId,
      hitTime,
      transmitterRef.chargeType
    );
  const receiverWrappedPhase = Number.isFinite(Number(receiverPhase?.radians))
    ? Number(receiverPhase.radians)
    : ((receiverRawPhase % TWO_PI) + TWO_PI) % TWO_PI;
  return {
    ...transmitterRecord,
    rootKind: "same-transmitter",
    receiverKind: "same-transmitter",
    receiverRole: transmitterRecord.transmitterRole,
    receiverBraidId: transmitterRef.braidId,
    receiverLayerId: transmitterRef.layerId,
    receiverChargeType: transmitterRef.chargeType,
    receiverChargeSign: PHOTON_CHARGE_SIGN[transmitterRef.chargeType] ?? 0,
    receiverHitTime: hitTime,
    receiverPhaseRadians: receiverWrappedPhase,
    receiverPhaseDegrees: receiverWrappedPhase * 180 / Math.PI,
    receiverPhaseRawRadians: receiverRawPhase,
    receiverPhaseCycleIndex: Number.isFinite(Number(receiverPhase?.cycleIndex))
      ? Number(receiverPhase.cycleIndex)
      : Math.floor(receiverRawPhase / TWO_PI),
  };
}

function mapPhotonMovingCircularRootToDelayedRoot(state, transmitterRef, measurement, request, root = {}) {
  const emissionTime = Number(root.emissionTime) || 0;
  const hitTime = Number(root.hitTime) || request.hitTime || 0;
  const delay = Number.isFinite(Number(root.delay))
    ? Number(root.delay)
    : Math.max(0, hitTime - emissionTime);
  const movingTransmitterSample = evaluateMovingCircularTransmitterHistory(request.transmitter, emissionTime);
  const transmitterPoint = root.transmitterPoint && typeof root.transmitterPoint === "object"
    ? root.transmitterPoint
    : movingTransmitterSample.position;
  const receiverPoint = root.receiverPoint && typeof root.receiverPoint === "object"
    ? root.receiverPoint
    : evaluateLinearHistoryPoint(request.receiver, hitTime);
  const delta = subtractVector(receiverPoint, transmitterPoint);
  const { distance, direction } = safeDirectionVector(delta);
  const coMovingKinematics = getPhotonArchitrinoKinematics(
    state,
    transmitterRef.braidId,
    transmitterRef.layerId,
    transmitterRef.chargeType,
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
      transmitterHistoryMode: "absolute_history_moving_circular",
      position: {
        x: Number(transmitterPoint.x) || 0,
        y: Number(transmitterPoint.y) || 0,
        z: Number(transmitterPoint.z) || 0,
      },
      velocity: {
        x: Number(root.transmitterVelocity?.x ?? movingTransmitterSample.velocity.x) || 0,
        y: Number(root.transmitterVelocity?.y ?? movingTransmitterSample.velocity.y) || 0,
        z: Number(root.transmitterVelocity?.z ?? movingTransmitterSample.velocity.z) || 0,
      },
    },
    receiverPoint,
    transmitterHistoryKind: root.transmitterHistoryKind ?? request.transmitterHistoryKind ?? "moving-circular-transmitter",
    transmitterHistoryProviderId:
      request.transmitterHistoryProvider?.providerId ?? PHOTON_TRANSMITTER_HISTORY_PROVIDER_ID,
    transmitterHistoryProviderKind:
      request.transmitterHistoryProvider?.providerKind ?? "constrained_architrino_motion",
    analysisBoundary: request.analysisBoundary ?? PHOTON_TRANSMITTER_HISTORY_BOUNDARY,
    phaseAtHit: createPhotonPhaseAtHitRecord(
      state,
      transmitterRef,
      emissionTime,
      root.transmitterPhase ?? movingTransmitterSample.phase
    ),
    solveIterations: Number.isFinite(Number(root.iterationCount))
      ? Number(root.iterationCount)
      : Number(root.solveIterations) || 0,
    analysisId: PHOTON_ANALYSIS_ID,
  };
}

function mapPhotonLinearSegmentRootToDelayedRoot(state, transmitterRef, measurement, request, root = {}) {
  const emissionTime = Number(root.emissionTime) || 0;
  const hitTime = Number(root.hitTime) || request.hitTime || 0;
  const delay = Number.isFinite(Number(root.delay))
    ? Number(root.delay)
    : Math.max(0, hitTime - emissionTime);
  const movingTransmitterSample = request.transmitterHistory?.transmitter
    ? evaluateMovingCircularTransmitterHistory(request.transmitterHistory.transmitter, emissionTime)
    : null;
  const transmitterPoint = root.transmitterPoint && typeof root.transmitterPoint === "object"
    ? root.transmitterPoint
    : movingTransmitterSample?.position ?? evaluateLinearHistoryPoint(request.transmitter, emissionTime);
  const receiverPoint = root.receiverPoint && typeof root.receiverPoint === "object"
    ? root.receiverPoint
    : evaluateLinearHistoryPoint(request.receiver, hitTime);
  const delta = subtractVector(receiverPoint, transmitterPoint);
  const { distance, direction } = safeDirectionVector(delta);
  const coMovingKinematics = getPhotonArchitrinoKinematics(
    state,
    transmitterRef.braidId,
    transmitterRef.layerId,
    transmitterRef.chargeType,
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
      transmitterHistoryMode: "absolute_history_segmented",
      position: {
        x: Number(transmitterPoint.x) || 0,
        y: Number(transmitterPoint.y) || 0,
        z: Number(transmitterPoint.z) || 0,
      },
      velocity: {
        x: Number(movingTransmitterSample?.velocity?.x ?? request.transmitter.velocity.x) || 0,
        y: Number(movingTransmitterSample?.velocity?.y ?? request.transmitter.velocity.y) || 0,
        z: Number(movingTransmitterSample?.velocity?.z ?? request.transmitter.velocity.z) || 0,
      },
    },
    receiverPoint,
    segmentIndex: request.segmentIndex,
    transmitterHistoryKind: request.transmitterHistory?.kind ?? "linear-transmitter-segment",
    transmitterHistoryProviderId:
      request.transmitterHistoryProvider?.providerId ?? PHOTON_TRANSMITTER_HISTORY_PROVIDER_ID,
    transmitterHistoryProviderKind:
      request.transmitterHistoryProvider?.providerKind ?? "constrained_architrino_motion",
    analysisBoundary: request.analysisBoundary ?? PHOTON_TRANSMITTER_HISTORY_BOUNDARY,
    phaseAtHit: createPhotonPhaseAtHitRecord(
      state,
      transmitterRef,
      emissionTime,
      movingTransmitterSample?.phase
    ),
    solveIterations: Number.isFinite(Number(root.iterationCount))
      ? Number(root.iterationCount)
      : Number(root.solveIterations) || 0,
    analysisId: PHOTON_ANALYSIS_ID,
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

function resolvePhotonCausalFactorRecord(root = {}, signalSpeed = 1) {
  const accelerationWeight = readPhotonOptionalFiniteNumber(root.accelerationWeight);
  const transmitterFactor = readPhotonOptionalFiniteNumber(root.transmitterFactor);
  const receiverFactor = readPhotonOptionalFiniteNumber(root.receiverFactor);
  const rootPlayback = readPhotonOptionalFiniteNumber(root.rootPlayback);
  if (
    accelerationWeight === null ||
    transmitterFactor === null ||
    receiverFactor === null ||
    rootPlayback === null
  ) {
    return {
      accelerationWeight: 0,
      transmitterFactor: transmitterFactor ?? 0,
      receiverFactor: receiverFactor ?? 0,
      rootPlayback: rootPlayback ?? 0,
      evidenceStatus: "causal_factor_record_missing",
    };
  }
  const expectedRootPlayback = receiverFactor / transmitterFactor;
  const expectedAccelerationWeight = signalSpeed / Math.abs(transmitterFactor);
  if (
    accelerationWeight < 0 ||
    Math.abs(transmitterFactor) <= EPSILON ||
    !Number.isFinite(expectedRootPlayback) ||
    !Number.isFinite(expectedAccelerationWeight) ||
    !closePhotonScaled(rootPlayback, expectedRootPlayback) ||
    !closePhotonScaled(accelerationWeight, expectedAccelerationWeight)
  ) {
    return {
      accelerationWeight: 0,
      transmitterFactor,
      receiverFactor,
      rootPlayback,
      evidenceStatus: "causal_factor_record_invalid",
    };
  }
  return {
    accelerationWeight,
    transmitterFactor,
    receiverFactor,
    rootPlayback,
    evidenceStatus: "ok",
  };
}

function computePhotonDelayedContribution(root, measurement) {
  const n = root.direction;
  const signalSpeed = Math.max(EPSILON, measurement.emissionSpeedCf);
  const transmitterRadialSpeedAtEmission = readPhotonFiniteNumber(
    root.transmitterRadialSpeedAtEmission,
    dotVector(root.kinematics.velocity, n)
  );
  const receiverRadialSpeedAtReception = readPhotonFiniteNumber(root.receiverRadialSpeedAtReception, 0);
  const receiverCrossingRatio = readPhotonFiniteNumber(root.receiverCrossingRatio, 0);
  const {
    accelerationWeight,
    transmitterFactor,
    receiverFactor,
    rootPlayback,
    evidenceStatus,
  } = resolvePhotonCausalFactorRecord(root, signalSpeed);
  const jacobian = transmitterFactor;
  const jacobianAbs = Math.abs(jacobian);
  const transmitterSpeedRatio = vectorMagnitude(root.kinematics.velocity) / signalSpeed;
  const receiverAcceleration = scaleVector(
    n,
    root.kinematics.chargeSign * accelerationWeight / (root.distance * root.distance)
  );
  const electric = receiverAcceleration;
  const comparisonB = scaleVector(crossVector(X_HAT, electric), 1 / signalSpeed);

  return {
    ...root,
    delaySolveGap: Math.abs(root.residual),
    jacobian,
    jacobianAbs,
    accelerationWeight,
    transmitterRadialSpeedAtEmission,
    receiverRadialSpeedAtReception,
    transmitterFactor,
    receiverFactor,
    receiverCrossingRatio,
    rootPlayback,
    causalFactorStatusCode: Number.isFinite(Number(root.causalFactorStatusCode))
      ? Number(root.causalFactorStatusCode)
      : evidenceStatus === "ok" ? 0 : -1,
    causalFactorEvidenceStatus: evidenceStatus,
    transmitterSpeedRatio,
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
    transmitterHistoryProviderId: PHOTON_TRANSMITTER_HISTORY_PROVIDER_ID,
    analysisBoundary: PHOTON_TRANSMITTER_HISTORY_BOUNDARY,
    branches: roots.map((root) => ({
      chargeSign: root.kinematics?.chargeSign ?? 0,
      direction: root.direction,
      transmitterVelocity: root.kinematics?.velocity,
      distance: root.distance,
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
      transmitterHistoryProviderId: root.transmitterHistoryProviderId ?? PHOTON_TRANSMITTER_HISTORY_PROVIDER_ID,
      analysisBoundary: root.analysisBoundary ?? PHOTON_TRANSMITTER_HISTORY_BOUNDARY,
    })),
  };
}

function createPhotonAbsoluteObserverFieldContributionsFromSolverResponse(
  roots,
  measurement,
  response = {}
) {
  const solverContributions = Array.isArray(response.contributions) ? response.contributions : [];
  const contributions = roots.map((root, index) => ({
    ...root,
    ...(solverContributions[index] ?? computePhotonDelayedContribution(root, measurement)),
  }));
  return {
    transmitterMode: "prescribed_path_absolute_history_transmitter_acceleration_sum",
    transmitterHistoryProviderId: PHOTON_TRANSMITTER_HISTORY_PROVIDER_ID,
    fieldReconstructionOwner: PHOTON_TRANSMITTER_HISTORY_BOUNDARY.fieldReconstructionOwner,
    rootPlaybackOwner: PHOTON_TRANSMITTER_HISTORY_BOUNDARY.rootPlaybackOwner,
    analysisFieldSchema: response.schema ?? "",
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
    maxTransmitterSpeedRatio: Number(response.maxTransmitterSpeedRatio) || 0,
    jacobianAbsMin: Number.isFinite(Number(response.jacobianAbsMin))
      ? Number(response.jacobianAbsMin)
      : 0,
    unstableTransmitterCount: Number(response.unstableContributionCount) || 0,
    nearestTransmitterDistance: Number(response.nearestTransmitterDistance) || 0,
  };
}

async function computePhotonAbsoluteObserverFieldContributionsWithPrescribedPathAnalysis(
  roots,
  measurement,
  options = {}
) {
  const request = createPhotonObserverFieldBranchSumRequest(roots, measurement);
  const response = typeof options.computeMovingCircularObserverField === "function"
    ? await options.computeMovingCircularObserverField(request)
    : await runPhotonMovingCircularObserverFieldPrescribedPathAnalysis(options, request);
  return createPhotonAbsoluteObserverFieldContributionsFromSolverResponse(
    roots,
    measurement,
    response
  );
}

export function buildPhotonArchitrinoTransmitterRefs(state = null) {
  return ["left", "right"].flatMap((braidId) =>
    PHOTON_LAYER_ORDER.flatMap((layerId) => {
      if (state && !getPhotonLayerEnabled(state, braidId, layerId)) {
        return [];
      }
      return PHOTON_CHARGE_TYPES.map((chargeType) => ({ braidId, layerId, chargeType }));
    })
  );
}

function mapPhotonCircularTransmitterRootToDelayedRoot(state, transmitterRef, measurement, root = {}) {
  const emissionTime = Number(root.emissionTime) || 0;
  const hitTime = Number(root.hitTime) || 0;
  const delay = Number.isFinite(Number(root.delay))
    ? Number(root.delay)
    : Math.max(0, hitTime - emissionTime);
  const kinematics = getPhotonArchitrinoKinematics(
    state,
    transmitterRef.braidId,
    transmitterRef.layerId,
    transmitterRef.chargeType,
    emissionTime
  );
  const transmitterPoint = root.transmitterPoint && typeof root.transmitterPoint === "object"
    ? root.transmitterPoint
    : kinematics.position;
  const receiverPoint = root.receiverPoint && typeof root.receiverPoint === "object"
    ? root.receiverPoint
    : measurement.virtualObserver;
  const delta = subtractVector(receiverPoint, transmitterPoint);
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
        x: Number(transmitterPoint.x) || 0,
        y: Number(transmitterPoint.y) || 0,
        z: Number(transmitterPoint.z) || 0,
      },
    },
    transmitterHistoryKind: "co_moving_circular_transmitter",
    phaseAtHit: createPhotonPhaseAtHitRecord(state, transmitterRef, emissionTime),
    solveIterations: Number.isFinite(Number(root.iterationCount))
      ? Number(root.iterationCount)
      : Number(root.solveIterations) || 0,
    analysisId: PHOTON_ANALYSIS_ID,
  };
}

export async function solvePhotonCoMovingCausalRootsForTransmitterWithPrescribedPathAnalysis(
  state,
  transmitterRef,
  observationTime,
  options = {}
) {
  const measurement = options.measurement ?? resolvePhotonMeasurementParameters(state);
  const response = await solvePhotonCircularTransmitterRootsHitsLedgerWithPrescribedPathAnalysis(
    state,
    transmitterRef,
    observationTime,
    {
      ...options,
      measurement,
    }
  );
  return (Array.isArray(response?.roots) ? response.roots : [])
    .map((root) => mapPhotonCircularTransmitterRootToDelayedRoot(
      state,
      transmitterRef,
      measurement,
      root
    ))
    .sort((a, b) => a.delay - b.delay);
}

export async function solvePhotonAbsoluteCausalRootsForTransmitterWithPrescribedPathAnalysis(
  state,
  transmitterRef,
  observationTime,
  options = {}
) {
  const rootSet = await solvePhotonAbsoluteCausalRootSetForTransmitterWithPrescribedPathAnalysis(
    state,
    transmitterRef,
    observationTime,
    options
  );
  return rootSet.roots;
}

async function solvePhotonAbsoluteCausalRootSetForTransmitterWithPrescribedPathAnalysis(
  state,
  transmitterRef,
  observationTime,
  options = {}
) {
  const measurement = options.measurement ?? resolvePhotonMeasurementParameters(state);
  const request = createPhotonAbsoluteMovingCircularCausalRootRequest(
    state,
    transmitterRef,
    observationTime,
    {
      ...options,
      measurement,
    }
  );
  const response = typeof options.solveMovingCircularTransmitterRoots === "function"
    ? await options.solveMovingCircularTransmitterRoots(request)
    : await runPhotonMovingCircularTransmitterPrescribedPathAnalysis(options, request);
  const roots = Array.isArray(response?.roots) ? response.roots : [];
  const mappedRoots = roots
    .map((root) => mapPhotonMovingCircularRootToDelayedRoot(
      state,
      transmitterRef,
      measurement,
      request,
      root
    ))
    .sort((a, b) => a.delay - b.delay);
  return {
    transmitterRef,
    roots: mappedRoots,
    rootDiagnostics: createPhotonTransmitterRootDiagnostics(
      transmitterRef,
      measurement,
      response,
      mappedRoots
    ),
  };
}

export async function solvePhotonCausalRootsForTransmitterWithPrescribedPathAnalysis(
  state,
  transmitterRef,
  observationTime,
  options = {}
) {
  const measurement = options.measurement ?? resolvePhotonMeasurementParameters(state);
  if (measurement.transmitterHistoryMode === "absolute_history") {
    return solvePhotonAbsoluteCausalRootsForTransmitterWithPrescribedPathAnalysis(
      state,
      transmitterRef,
      observationTime,
      {
        ...options,
        measurement,
      }
    );
  }
  return solvePhotonCoMovingCausalRootsForTransmitterWithPrescribedPathAnalysis(
    state,
    transmitterRef,
    observationTime,
    {
      ...options,
      measurement,
    }
  );
}

function createPhotonTransmitterRootDiagnostics(transmitterRef, measurement, response = {}, roots = []) {
  const scan = response?.scan && typeof response.scan === "object" ? response.scan : null;
  const status = response?.status && typeof response.status === "object" ? response.status : {};
  const rootCount = Array.isArray(roots) ? roots.length : 0;
  const rejectedReason = rootCount > 0
    ? ""
    : response?.rejectedReason || status.code || "no_roots";
  return {
    transmitterRef,
    transmitterHistoryMode: measurement?.transmitterHistoryMode ?? "co_moving",
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
    transmitterStartTime: Number.isFinite(Number(scan?.transmitterStartTime)) ? Number(scan.transmitterStartTime) : null,
    transmitterEndTime: Number.isFinite(Number(scan?.transmitterEndTime)) ? Number(scan.transmitterEndTime) : null,
  };
}

function summarizePhotonRootDiagnostics(rootSets = []) {
  const transmitterDiagnostics = rootSets
    .map((rootSet) => rootSet.rootDiagnostics)
    .filter((diagnostic) => diagnostic && typeof diagnostic === "object");
  const rejectedReasonCounts = {};
  let rejectedTransmitterCount = 0;
  let noCatchUpTransmitterCount = 0;
  let staleHistoryTransmitterCount = 0;
  let nearMissTransmitterCount = 0;
  let unisolatedCandidateCount = 0;
  let emptyWindowTransmitterCount = 0;
  let rootLimitReachedCount = 0;
  let closestMissResidual = Number.POSITIVE_INFINITY;

  transmitterDiagnostics.forEach((diagnostic) => {
    if (diagnostic.rootLimitReached) {
      rootLimitReachedCount += 1;
    }
    if (diagnostic.rootCount > 0) {
      return;
    }
    rejectedTransmitterCount += 1;
    const reason = diagnostic.rejectedReason || "no_roots";
    rejectedReasonCounts[reason] = (rejectedReasonCounts[reason] ?? 0) + 1;
    if (reason === "no_catch_up_root") {
      noCatchUpTransmitterCount += 1;
    } else if (reason === "stale_history_window") {
      staleHistoryTransmitterCount += 1;
    } else if (reason === "near_miss") {
      nearMissTransmitterCount += 1;
    } else if (reason === "unisolated_root_candidate") {
      unisolatedCandidateCount += 1;
    } else if (reason === "empty_window") {
      emptyWindowTransmitterCount += 1;
    }
    closestMissResidual = Math.min(
      closestMissResidual,
      Math.abs(Number(diagnostic.minAbsResidual) || 0)
    );
  });

  return {
    transmitterDiagnostics,
    rejectedTransmitterCount,
    noCatchUpTransmitterCount,
    staleHistoryTransmitterCount,
    nearMissTransmitterCount,
    unisolatedCandidateCount,
    emptyWindowTransmitterCount,
    rootLimitReachedCount,
    closestMissResidual: Number.isFinite(closestMissResidual) ? closestMissResidual : 0,
    rejectedReasonCounts,
  };
}

function createPhotonDelayedEmissionFieldResult(fieldSum, rootSets, transmitterRefs, measurement) {
  const contributions = fieldSum.contributions;
  const unresolvedTransmitterCount = rootSets.filter((rootSet) => rootSet.roots.length === 0).length;
  const rootDiagnostics = summarizePhotonRootDiagnostics(rootSets);

  return {
    transmitterMode: fieldSum.transmitterMode,
    analysisFieldSchema: fieldSum.analysisFieldSchema ?? "",
    analysisId: PHOTON_ANALYSIS_ID,
    transmitterHistoryProviderId: fieldSum.transmitterHistoryProviderId ?? "",
    fieldReconstructionOwner: fieldSum.fieldReconstructionOwner ?? "",
    rootPlaybackOwner: fieldSum.rootPlaybackOwner ?? "",
    measurement,
    contributions,
    transmitterCount: transmitterRefs.length,
    rootCount: contributions.length,
    averageDelay: fieldSum.averageDelay,
    delaySolveGapMax: fieldSum.delaySolveGapMax,
    maxTransmitterSpeedRatio: fieldSum.maxTransmitterSpeedRatio,
    jacobianAbsMin: Number.isFinite(fieldSum.jacobianAbsMin) ? fieldSum.jacobianAbsMin : 0,
    unresolvedTransmitterCount,
    unstableTransmitterCount: fieldSum.unstableTransmitterCount,
    rootDiagnostics,
    noCatchUpTransmitterCount: rootDiagnostics.noCatchUpTransmitterCount,
    staleHistoryTransmitterCount: rootDiagnostics.staleHistoryTransmitterCount,
    nearMissTransmitterCount: rootDiagnostics.nearMissTransmitterCount,
    rootLimitReachedCount: rootDiagnostics.rootLimitReachedCount,
    closestMissResidual: rootDiagnostics.closestMissResidual,
    nearestTransmitterDistance: Number.isFinite(fieldSum.nearestTransmitterDistance)
      ? fieldSum.nearestTransmitterDistance
      : 0,
    electric: fieldSum.electric,
    comparisonB: fieldSum.comparisonB,
  };
}

async function computePhotonAbsoluteDelayedEmissionFieldWithFacadeRun(
  state,
  observationTime,
  transmitterRefs,
  measurement,
  options = {}
) {
  const request = createPhotonAbsoluteHistoryRunRequest(state, observationTime, {
    ...options,
    transmitterRefs,
    measurement,
  });
  const response = typeof options.solveMovingCircularAbsoluteHistoryRun === "function"
    ? await options.solveMovingCircularAbsoluteHistoryRun(request)
    : await runPhotonMovingCircularAbsoluteHistoryRunPrescribedPathAnalysis(options, request);
  const transmitterRootResponses = Array.isArray(response?.transmitterRootResponses)
    ? response.transmitterRootResponses
    : [];
  const rootSets = transmitterRefs.map((fallbackTransmitterRef, transmitterIndex) => {
    const rootResponse = transmitterRootResponses.find((candidate, responseIndex) => {
      const requestIndex = Number.isFinite(Number(candidate?.requestIndex))
        ? Number(candidate.requestIndex)
        : responseIndex;
      return requestIndex === transmitterIndex;
    });
    if (!rootResponse) {
      return {
        transmitterRef: fallbackTransmitterRef,
        roots: [],
        rootDiagnostics: createPhotonTransmitterRootDiagnostics(
          fallbackTransmitterRef,
          measurement,
          {
            rejectedReason: "missing_analysis_response",
            status: {
              code: "missing_analysis_response",
              severity: "warning",
            },
          },
          []
        ),
      };
    }
    const requestIndex = Number.isFinite(Number(rootResponse.requestIndex))
      ? Number(rootResponse.requestIndex)
      : transmitterIndex;
    const transmitterRef = rootResponse.transmitterRef ?? fallbackTransmitterRef;
    const transmitterRootRequest = request.transmitterRootRequests[requestIndex] ?? rootResponse.request ?? {};
    const roots = (Array.isArray(rootResponse.roots) ? rootResponse.roots : [])
      .map((root) => mapPhotonMovingCircularRootToDelayedRoot(
        state,
        transmitterRef,
        measurement,
        transmitterRootRequest,
        root
      ))
      .sort((a, b) => a.delay - b.delay);
    return {
      transmitterRef,
      roots,
      rootDiagnostics: createPhotonTransmitterRootDiagnostics(
        transmitterRef,
        measurement,
        rootResponse,
        roots
      ),
    };
  });
  const roots = rootSets.flatMap((rootSet) => rootSet.roots);
  const fieldSum = createPhotonAbsoluteObserverFieldContributionsFromSolverResponse(
    roots,
    measurement,
    response?.observerField ?? {}
  );
  return createPhotonDelayedEmissionFieldResult(fieldSum, rootSets, transmitterRefs, measurement);
}

export async function computePhotonDelayedEmissionFieldWithPrescribedPathAnalysis(
  state,
  observationTime,
  options = {}
) {
  const measurement = options.measurement ?? resolvePhotonMeasurementParameters(state);
  const transmitterRefs = buildPhotonArchitrinoTransmitterRefs(state);
  if (
    measurement.transmitterHistoryMode === "absolute_history" &&
    options.useSeparateAbsoluteHistorySolverSteps !== true
  ) {
    return computePhotonAbsoluteDelayedEmissionFieldWithFacadeRun(
      state,
      observationTime,
      transmitterRefs,
      measurement,
      options
    );
  }
  const solveRootSet = async (transmitterRef) => {
    if (measurement.transmitterHistoryMode === "absolute_history") {
      return solvePhotonAbsoluteCausalRootSetForTransmitterWithPrescribedPathAnalysis(
        state,
        transmitterRef,
        observationTime,
        {
          ...options,
          measurement,
        }
      );
    }
    return {
      transmitterRef,
      roots: await solvePhotonCoMovingCausalRootsForTransmitterWithPrescribedPathAnalysis(
        state,
        transmitterRef,
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
    : await Promise.all(transmitterRefs.map((transmitterRef) => solveRootSet(transmitterRef)));
  if (options.parallel === false) {
    for (const transmitterRef of transmitterRefs) {
      rootSets.push(await solveRootSet(transmitterRef));
    }
  }
  const roots = rootSets.flatMap((rootSet) => rootSet.roots);
  const fieldSum = measurement.transmitterHistoryMode === "absolute_history"
    ? await computePhotonAbsoluteObserverFieldContributionsWithPrescribedPathAnalysis(
        roots,
        measurement,
        options
      )
    : (() => {
        const contributions = roots.map((root) => computePhotonDelayedContribution(root, measurement));
        return {
          transmitterMode: "prescribed_path_circular_transmitter_branch_sum",
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
          maxTransmitterSpeedRatio: contributions.reduce(
            (maximum, contribution) => Math.max(maximum, contribution.transmitterSpeedRatio),
            0
          ),
          jacobianAbsMin: contributions.reduce(
            (minimum, contribution) => Math.min(minimum, contribution.jacobianAbs),
            Number.POSITIVE_INFINITY
          ),
          unstableTransmitterCount: contributions.filter(
            (contribution) =>
              contribution.causalFactorEvidenceStatus !== "ok" ||
              contribution.delaySolveGap > 0.05 ||
              contribution.jacobianAbs <= JACOBIAN_FLOOR
          ).length,
          nearestTransmitterDistance: contributions.reduce(
            (minimum, contribution) => Math.min(minimum, contribution.distance),
            Number.POSITIVE_INFINITY
          ),
        };
      })();
  return createPhotonDelayedEmissionFieldResult(fieldSum, rootSets, transmitterRefs, measurement);
}

export async function computePhotonObserverFieldWithPrescribedPathAnalysis(state, timeSeconds, options = {}) {
  const referenceFrequency = getPhotonReferenceFrequency(state);
  const phase = TWO_PI * referenceFrequency * timeSeconds;
  const delayedField = await computePhotonDelayedEmissionFieldWithPrescribedPathAnalysis(
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
    transmitterMode: delayedField.transmitterMode,
    analysisFieldSchema: delayedField.analysisFieldSchema ?? "",
    analysisId: PHOTON_ANALYSIS_ID,
    transmitterHistoryProviderId: delayedField.transmitterHistoryProviderId ?? "",
    fieldReconstructionOwner: delayedField.fieldReconstructionOwner ?? "",
    rootPlaybackOwner: delayedField.rootPlaybackOwner ?? "",
    measurement: delayedField.measurement,
    transmitterCount: delayedField.transmitterCount,
    rootCount: delayedField.rootCount,
    averageDelay: delayedField.averageDelay,
    delaySolveGapMax: delayedField.delaySolveGapMax,
    maxTransmitterSpeedRatio: delayedField.maxTransmitterSpeedRatio,
    jacobianAbsMin: delayedField.jacobianAbsMin,
    unresolvedTransmitterCount: delayedField.unresolvedTransmitterCount,
    unstableTransmitterCount: delayedField.unstableTransmitterCount,
    rootDiagnostics: delayedField.rootDiagnostics,
    noCatchUpTransmitterCount: delayedField.noCatchUpTransmitterCount,
    staleHistoryTransmitterCount: delayedField.staleHistoryTransmitterCount,
    nearMissTransmitterCount: delayedField.nearMissTransmitterCount,
    rootLimitReachedCount: delayedField.rootLimitReachedCount,
    closestMissResidual: delayedField.closestMissResidual,
    nearestTransmitterDistance: delayedField.nearestTransmitterDistance,
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

export async function buildPhotonDerivedPolarizationTraceWithPrescribedPathAnalysis(
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
      const field = await computePhotonObserverFieldWithPrescribedPathAnalysis(state, t, options);
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
  const traceSampleCount = Math.max(
    count,
    Math.round(options.polarizationTraceSampleCount ?? DEFAULT_POLARIZATION_TRACE_SAMPLES),
    Math.round(options.minimumPolarizationTraceSampleCount ?? MINIMUM_POLARIZATION_TRACE_SAMPLES)
  );
  const samples = [];
  for (let index = 0; index <= traceSampleCount; index += 1) {
    const progress = index / traceSampleCount;
    const phase = TWO_PI * progress;
    samples.push({
      progress,
      phase,
      ey: evaluatePhotonCenteredFittedComponent(fit.components.y, phase),
      ez: evaluatePhotonCenteredFittedComponent(fit.components.z, phase),
    });
  }

  const currentField = await computePhotonObserverFieldWithPrescribedPathAnalysis(
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
    analysisId: PHOTON_ANALYSIS_ID,
    analysisFieldSchema: currentField.analysisFieldSchema ?? "",
    transmitterHistoryProviderId: currentField.transmitterHistoryProviderId ?? "",
    fieldReconstructionOwner: currentField.fieldReconstructionOwner ?? "",
    rootPlaybackOwner: currentField.rootPlaybackOwner ?? "",
    referenceFrequency,
    cycleDuration,
    fitCycleStart,
    rawSamples,
    rawCurrent,
    samples,
    traceSampleCount,
    currentProgress,
    currentPhase,
    current,
    fittedCurrent,
    projection,
    scale,
  };
}

export async function computePhotonAverageAnalyzerFractionWithPrescribedPathAnalysis(
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
      const field = await computePhotonObserverFieldWithPrescribedPathAnalysis(state, t, options);
      return field.analyzer.fraction;
    })
  );
  return fractions.reduce((sum, fraction) => sum + fraction, 0) / count;
}

export async function computePhotonFormulaSummaryWithPrescribedPathAnalysis(
  state,
  timeSeconds,
  options = {}
) {
  const wrappedTime = wrapPhotonTime(state, timeSeconds);
  const field = await computePhotonObserverFieldWithPrescribedPathAnalysis(state, wrappedTime, options);
  const polarization = await buildPhotonDerivedPolarizationTraceWithPrescribedPathAnalysis(
    state,
    wrappedTime,
    options.polarizationSampleCount ?? DEFAULT_POLARIZATION_FIT_SAMPLES,
    options
  );
  const stokes = polarization.stokes;
  const averageAnalyzerFraction = await computePhotonAverageAnalyzerFractionWithPrescribedPathAnalysis(
    state,
    options.analyzerSampleCount ?? DEFAULT_ANALYZER_AVERAGE_SAMPLES,
    options
  );
  const analyzerTarget = polarization.analyzerFractionTarget;
  const analyzerResidual = averageAnalyzerFraction - analyzerTarget;
  const selfHitDiagnostics = options.skipSelfHitDiagnostics === true
    ? summarizePhotonSelfHitRecords([], "skipped", "Self-hit diagnostics skipped for this solve.")
    : await computePhotonSelfHitDiagnosticsWithPrescribedPathAnalysis(
      state,
      {
        ...options,
        measurement: field.measurement,
        selfHitObservationTime: wrappedTime,
      }
    );
  return {
    wrappedTime,
    analysisId: PHOTON_ANALYSIS_ID,
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

export async function buildPhotonPlotSamplesWithPrescribedPathAnalysis(
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
      const field = await computePhotonObserverFieldWithPrescribedPathAnalysis(state, t, options);
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
    transmitterMode: fields[0]?.field?.transmitterMode ?? "",
    analysisFieldSchema: fields[0]?.field?.analysisFieldSchema ?? "",
    analysisId: PHOTON_ANALYSIS_ID,
    transmitterHistoryProviderId: fields[0]?.field?.transmitterHistoryProviderId ?? "",
    fieldReconstructionOwner: fields[0]?.field?.fieldReconstructionOwner ?? "",
    rootPlaybackOwner: fields[0]?.field?.rootPlaybackOwner ?? "",
    middleCycle: getPhotonMiddleCycleBounds(state),
    amplitudeScale,
    samples,
  };
}

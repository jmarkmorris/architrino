import {
  createPhotonCausalRootsRunRequest,
} from "../../solver/app/SolverAppAdapters.mjs";
import {
  runSolverAppBridgeRequest,
} from "../../solver/app/SolverAppBridgeClientResolver.mjs";
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
} from "./PhotonStateRuntime.js";

const TWO_PI = Math.PI * 2;
const EPSILON = 1e-9;
const MIN_FIELD_DISTANCE = 0.08;
const ROOT_SCAN_MIN_STEPS = 48;
const ROOT_SCAN_MAX_STEPS = 720;
const ROOT_SCAN_STEPS_PER_CYCLE = 40;
const ROOT_BISECTION_STEPS = 32;
const ROOT_RESIDUAL_TOLERANCE = 1e-5;
const ROOT_DEDUP_DELAY_TOLERANCE = 1e-4;
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
  return {
    virtualObserver: {
      x: Number(state?.measurement?.virtualObserver?.x ?? 0) || 0,
      y: Number(state?.measurement?.virtualObserver?.y ?? 0) || 0,
      z: Number(state?.measurement?.virtualObserver?.z ?? 0) || 0,
    },
    emissionSpeedCf: 1,
  };
}

function getPhotonSwarmCenterX(state, swarmId) {
  const fallbackSeparation = getPhotonSeparationReferenceRadius(state);
  const separation = Math.max(0, Number(state?.pair?.pairSeparation) || fallbackSeparation);
  return swarmId === "left" ? -separation / 2 : separation / 2;
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

function getPhotonCausalRootResidual(state, sourceRef, observationTime, delay, measurement) {
  const emissionTime = observationTime - delay;
  const kinematics = getPhotonArchitrinoKinematics(
    state,
    sourceRef.swarmId,
    sourceRef.layerId,
    sourceRef.chargeType,
    emissionTime
  );
  const delta = subtractVector(measurement.virtualObserver, kinematics.position);
  const { distance, direction } = safeDirectionVector(delta);
  return {
    emissionTime,
    delay,
    residual: distance - measurement.emissionSpeedCf * delay,
    distance,
    direction,
    kinematics,
  };
}

function getPhotonSourceMaxDelay(state, sourceRef, measurement) {
  const layer = getPhotonLayer(state, sourceRef.swarmId, sourceRef.layerId);
  const centerX = getPhotonSwarmCenterX(state, sourceRef.swarmId);
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

function pushPhotonRoot(roots, root) {
  const duplicate = roots.some((existingRoot) =>
    Math.abs(existingRoot.delay - root.delay) <= ROOT_DEDUP_DELAY_TOLERANCE
  );
  if (!duplicate) {
    roots.push(root);
  }
}

function refinePhotonRootDelay(state, sourceRef, observationTime, measurement, lowDelay, highDelay) {
  let low = getPhotonCausalRootResidual(state, sourceRef, observationTime, lowDelay, measurement);
  let high = getPhotonCausalRootResidual(state, sourceRef, observationTime, highDelay, measurement);
  for (let index = 0; index < ROOT_BISECTION_STEPS; index += 1) {
    const midDelay = (low.delay + high.delay) / 2;
    const mid = getPhotonCausalRootResidual(state, sourceRef, observationTime, midDelay, measurement);
    if (Math.abs(mid.residual) <= ROOT_RESIDUAL_TOLERANCE) {
      return { ...mid, solveIterations: index + 1 };
    }
    if (Math.sign(low.residual) === Math.sign(mid.residual)) {
      low = mid;
    } else {
      high = mid;
    }
  }
  const result = Math.abs(low.residual) < Math.abs(high.residual) ? low : high;
  return { ...result, solveIterations: ROOT_BISECTION_STEPS };
}

export function solvePhotonCausalRoots(state, sourceRef, observationTime, measurement = resolvePhotonMeasurementParameters(state)) {
  const layer = getPhotonLayer(state, sourceRef.swarmId, sourceRef.layerId);
  const maxDelay = getPhotonSourceMaxDelay(state, sourceRef, measurement);
  const frequency = Math.max(0, Math.abs(Number(layer.frequencyHz) || 0));
  const scanSteps = Math.min(
    ROOT_SCAN_MAX_STEPS,
    Math.max(ROOT_SCAN_MIN_STEPS, Math.ceil(maxDelay * frequency * ROOT_SCAN_STEPS_PER_CYCLE))
  );
  const roots = [];
  let previous = getPhotonCausalRootResidual(state, sourceRef, observationTime, 0, measurement);
  if (Math.abs(previous.residual) <= ROOT_RESIDUAL_TOLERANCE) {
    pushPhotonRoot(roots, { ...previous, solveIterations: 0 });
  }

  for (let index = 1; index <= scanSteps; index += 1) {
    const delay = (maxDelay * index) / scanSteps;
    const current = getPhotonCausalRootResidual(state, sourceRef, observationTime, delay, measurement);
    if (Math.abs(current.residual) <= ROOT_RESIDUAL_TOLERANCE) {
      pushPhotonRoot(roots, { ...current, solveIterations: 0 });
    }
    if (Math.sign(previous.residual) !== Math.sign(current.residual)) {
      pushPhotonRoot(
        roots,
        refinePhotonRootDelay(
          state,
          sourceRef,
          observationTime,
          measurement,
          previous.delay,
          current.delay
        )
      );
    }
    previous = current;
  }

  return roots.sort((a, b) => a.delay - b.delay);
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
  const layer = getPhotonLayer(state, sourceRef.swarmId, sourceRef.layerId);
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
  const centerX = getPhotonSwarmCenterX(state, sourceRef.swarmId);
  const angularVelocity = getPhotonDirectionSign(state, sourceRef.swarmId) *
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
        sourceRef.swarmId,
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

function normalizePositiveSolverInteger(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? Math.max(1, Math.round(number)) : fallback;
}

function normalizeNonnegativeSolverNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
}

function formatSolverIdNumber(value) {
  return String(Number(value) || 0).replaceAll(".", "_").replaceAll("-", "neg_");
}

export function getPhotonArchitrinoKinematics(state, swarmId, layerId, chargeType, timeSeconds) {
  const layer = getPhotonLayer(state, swarmId, layerId);
  const directionSign = getPhotonDirectionSign(state, swarmId);
  const angle = getPhotonLayerAngleRadians(state, swarmId, layerId, timeSeconds, chargeType);
  const angularVelocity = directionSign * TWO_PI * layer.frequencyHz;
  const radius = layer.radius;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const centerX = getPhotonSwarmCenterX(state, swarmId);
  return {
    swarmId,
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

function computePhotonDelayedContribution(root, measurement) {
  const n = root.direction;
  const sourceRadialSpeed = dotVector(root.kinematics.velocity, n);
  const jacobian = 1 - sourceRadialSpeed / Math.max(EPSILON, measurement.emissionSpeedCf);
  const jacobianAbs = Math.abs(jacobian);
  const jacobianWeight = 1 / Math.max(JACOBIAN_FLOOR, jacobianAbs);
  const sourceSpeedRatio = vectorMagnitude(root.kinematics.velocity) / Math.max(EPSILON, measurement.emissionSpeedCf);
  const receiverAcceleration = scaleVector(
    n,
    root.kinematics.chargeSign * jacobianWeight / (root.distance * root.distance)
  );
  const electric = receiverAcceleration;
  const comparisonB = scaleVector(crossVector(X_HAT, electric), 1 / measurement.emissionSpeedCf);

  return {
    ...root,
    delaySolveGap: Math.abs(root.residual),
    jacobian,
    jacobianAbs,
    jacobianWeight,
    sourceRadialSpeed,
    sourceSpeedRatio,
    receiverAcceleration,
    electric,
    comparisonB,
  };
}

export function buildPhotonArchitrinoSourceRefs(state = null) {
  return ["left", "right"].flatMap((swarmId) =>
    PHOTON_LAYER_ORDER.flatMap((layerId) => {
      if (state && !getPhotonLayerEnabled(state, swarmId, layerId)) {
        return [];
      }
      return PHOTON_CHARGE_TYPES.map((chargeType) => ({ swarmId, layerId, chargeType }));
    })
  );
}

export function computePhotonDelayedEmissionField(state, observationTime) {
  const measurement = resolvePhotonMeasurementParameters(state);
  const sourceRefs = buildPhotonArchitrinoSourceRefs(state);
  const rootSets = sourceRefs.map((sourceRef) => ({
    sourceRef,
    roots: solvePhotonCausalRoots(state, sourceRef, observationTime, measurement),
  }));
  const contributions = rootSets.flatMap(({ roots }) =>
    roots.map((root) => computePhotonDelayedContribution(root, measurement))
  );
  const electric = contributions.reduce(
    (sum, contribution) => addVector(sum, contribution.electric),
    { x: 0, y: 0, z: 0 }
  );
  const comparisonB = contributions.reduce(
    (sum, contribution) => addVector(sum, contribution.comparisonB),
    { x: 0, y: 0, z: 0 }
  );
  const delaySum = contributions.reduce((sum, contribution) => sum + contribution.delay, 0);
  const distanceMin = contributions.reduce(
    (minimum, contribution) => Math.min(minimum, contribution.distance),
    Number.POSITIVE_INFINITY
  );
  const delaySolveGapMax = contributions.reduce(
    (maximum, contribution) => Math.max(maximum, contribution.delaySolveGap),
    0
  );
  const maxSourceSpeedRatio = contributions.reduce(
    (maximum, contribution) => Math.max(maximum, contribution.sourceSpeedRatio),
    0
  );
  const jacobianAbsMin = contributions.reduce(
    (minimum, contribution) => Math.min(minimum, contribution.jacobianAbs),
    Number.POSITIVE_INFINITY
  );
  const unresolvedSourceCount = rootSets.filter((rootSet) => rootSet.roots.length === 0).length;
  const unstableSourceCount = contributions.filter(
    (contribution) =>
      contribution.delaySolveGap > 0.05 ||
      contribution.jacobianAbs <= JACOBIAN_FLOOR
  ).length;

  return {
    sourceMode: "virtual_observer_branch_sum",
    measurement,
    contributions,
    sourceCount: sourceRefs.length,
    rootCount: contributions.length,
    averageDelay: contributions.length > 0 ? delaySum / contributions.length : 0,
    delaySolveGapMax,
    maxSourceSpeedRatio,
    jacobianAbsMin: Number.isFinite(jacobianAbsMin) ? jacobianAbsMin : 0,
    unresolvedSourceCount,
    unstableSourceCount,
    nearestSourceDistance: Number.isFinite(distanceMin) ? distanceMin : 0,
    electric,
    comparisonB,
  };
}

function mapPhotonCircularSourceRootToDelayedRoot(state, sourceRef, measurement, root = {}) {
  const emissionTime = Number(root.emissionTime) || 0;
  const hitTime = Number(root.hitTime) || 0;
  const delay = Number.isFinite(Number(root.delay))
    ? Number(root.delay)
    : Math.max(0, hitTime - emissionTime);
  const kinematics = getPhotonArchitrinoKinematics(
    state,
    sourceRef.swarmId,
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
    solveIterations: Number.isFinite(Number(root.iterationCount))
      ? Number(root.iterationCount)
      : Number(root.solveIterations) || 0,
    solverEngineId: PHOTON_SOLVER_BRIDGE_ENGINE_ID,
  };
}

export async function solvePhotonCausalRootsForSourceWithSolverBridge(
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

export async function computePhotonDelayedEmissionFieldWithSolverBridge(
  state,
  observationTime,
  options = {}
) {
  const measurement = options.measurement ?? resolvePhotonMeasurementParameters(state);
  const sourceRefs = buildPhotonArchitrinoSourceRefs(state);
  const solveRootSet = async (sourceRef) => ({
    sourceRef,
    roots: await solvePhotonCausalRootsForSourceWithSolverBridge(
      state,
      sourceRef,
      observationTime,
      {
        ...options,
        measurement,
      }
    ),
  });
  const rootSets = options.parallel === false
    ? []
    : await Promise.all(sourceRefs.map((sourceRef) => solveRootSet(sourceRef)));
  if (options.parallel === false) {
    for (const sourceRef of sourceRefs) {
      rootSets.push(await solveRootSet(sourceRef));
    }
  }
  const contributions = rootSets.flatMap(({ roots }) =>
    roots.map((root) => computePhotonDelayedContribution(root, measurement))
  );
  const electric = contributions.reduce(
    (sum, contribution) => addVector(sum, contribution.electric),
    { x: 0, y: 0, z: 0 }
  );
  const comparisonB = contributions.reduce(
    (sum, contribution) => addVector(sum, contribution.comparisonB),
    { x: 0, y: 0, z: 0 }
  );
  const delaySum = contributions.reduce((sum, contribution) => sum + contribution.delay, 0);
  const distanceMin = contributions.reduce(
    (minimum, contribution) => Math.min(minimum, contribution.distance),
    Number.POSITIVE_INFINITY
  );
  const delaySolveGapMax = contributions.reduce(
    (maximum, contribution) => Math.max(maximum, contribution.delaySolveGap),
    0
  );
  const maxSourceSpeedRatio = contributions.reduce(
    (maximum, contribution) => Math.max(maximum, contribution.sourceSpeedRatio),
    0
  );
  const jacobianAbsMin = contributions.reduce(
    (minimum, contribution) => Math.min(minimum, contribution.jacobianAbs),
    Number.POSITIVE_INFINITY
  );
  const unresolvedSourceCount = rootSets.filter((rootSet) => rootSet.roots.length === 0).length;
  const unstableSourceCount = contributions.filter(
    (contribution) =>
      contribution.delaySolveGap > 0.05 ||
      contribution.jacobianAbs <= JACOBIAN_FLOOR
  ).length;

  return {
    sourceMode: "solver_bridge_circular_source_branch_sum",
    solverEngineId: PHOTON_SOLVER_BRIDGE_ENGINE_ID,
    measurement,
    contributions,
    sourceCount: sourceRefs.length,
    rootCount: contributions.length,
    averageDelay: contributions.length > 0 ? delaySum / contributions.length : 0,
    delaySolveGapMax,
    maxSourceSpeedRatio,
    jacobianAbsMin: Number.isFinite(jacobianAbsMin) ? jacobianAbsMin : 0,
    unresolvedSourceCount,
    unstableSourceCount,
    nearestSourceDistance: Number.isFinite(distanceMin) ? distanceMin : 0,
    electric,
    comparisonB,
  };
}

export function computePhotonObserverField(state, timeSeconds) {
  const referenceFrequency = getPhotonReferenceFrequency(state);
  const phase = TWO_PI * referenceFrequency * timeSeconds;
  const delayedField = computePhotonDelayedEmissionField(state, timeSeconds);
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
    measurement: delayedField.measurement,
    sourceCount: delayedField.sourceCount,
    rootCount: delayedField.rootCount,
    averageDelay: delayedField.averageDelay,
    delaySolveGapMax: delayedField.delaySolveGapMax,
    maxSourceSpeedRatio: delayedField.maxSourceSpeedRatio,
    jacobianAbsMin: delayedField.jacobianAbsMin,
    unresolvedSourceCount: delayedField.unresolvedSourceCount,
    unstableSourceCount: delayedField.unstableSourceCount,
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

export function buildPhotonDerivedPolarizationTrace(
  state,
  timeSeconds,
  sampleCount = DEFAULT_POLARIZATION_FIT_SAMPLES
) {
  const referenceFrequency = getPhotonReferenceFrequency(state);
  const cycleDuration = 1 / referenceFrequency;
  const currentTime = Number.isFinite(timeSeconds) ? timeSeconds : 0;
  const fitCycleStart = getPhotonMiddleCycleBounds(state).start;
  const currentProgress =
    ((((currentTime - fitCycleStart) / cycleDuration) % 1) + 1) % 1;
  const currentPhase = TWO_PI * currentProgress;
  const count = Math.max(24, Math.round(sampleCount));
  const rawSamples = [];

  for (let index = 0; index < count; index += 1) {
    const progress = index / count;
    const phase = TWO_PI * progress;
    const t = fitCycleStart + progress * cycleDuration;
    const field = computePhotonObserverField(state, t);
    rawSamples.push({
      t,
      progress,
      phase,
      ey: field.electric.y,
      ez: field.electric.z,
    });
  }

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

  const currentField = computePhotonObserverField(state, currentTime);
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

export function computePhotonAverageAnalyzerFraction(
  state,
  sampleCount = DEFAULT_ANALYZER_AVERAGE_SAMPLES
) {
  const runDuration = getPhotonRunDuration(state);
  const count = Math.max(8, Math.round(sampleCount));
  let fractionSum = 0;
  for (let index = 0; index < count; index += 1) {
    const t = (index / count) * runDuration;
    fractionSum += computePhotonObserverField(state, t).analyzer.fraction;
  }
  return fractionSum / count;
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

export function computePhotonFormulaSummary(state, timeSeconds, options = {}) {
  const wrappedTime = wrapPhotonTime(state, timeSeconds);
  const field = computePhotonObserverField(state, wrappedTime);
  const polarization = buildPhotonDerivedPolarizationTrace(
    state,
    wrappedTime,
    options.polarizationSampleCount ?? DEFAULT_POLARIZATION_FIT_SAMPLES
  );
  const stokes = polarization.stokes;
  const averageAnalyzerFraction = computePhotonAverageAnalyzerFraction(
    state,
    options.analyzerSampleCount ?? DEFAULT_ANALYZER_AVERAGE_SAMPLES
  );
  const analyzerTarget = polarization.analyzerFractionTarget;
  const analyzerResidual = averageAnalyzerFraction - analyzerTarget;
  return {
    wrappedTime,
    runDuration: getPhotonRunDuration(state),
    middleCycle: getPhotonMiddleCycleBounds(state),
    field,
    polarization,
    stokes,
    averageAnalyzerFraction,
    analyzerTarget,
    analyzerResidual,
    fitResidual: polarization.fitResidual,
  };
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
  };
}

export function buildPhotonPlotSamples(state, timeSeconds, sampleCount = 360) {
  const runDuration = getPhotonRunDuration(state);
  const currentTime = wrapPhotonTime(state, timeSeconds);
  const samples = [];
  let amplitudeScale = 0;
  for (let index = 0; index <= sampleCount; index += 1) {
    const t = (index / sampleCount) * runDuration;
    const field = computePhotonObserverField(state, t);
    amplitudeScale = Math.max(
      amplitudeScale,
      Math.abs(field.electric.y),
      Math.abs(field.electric.z)
    );
    samples.push({
      t,
      progress: runDuration > 0 ? t / runDuration : 0,
      ey: field.electric.y,
      ez: field.electric.z,
      analyzerFraction: field.analyzer.fraction,
    });
  }
  return {
    runDuration,
    currentTime,
    middleCycle: getPhotonMiddleCycleBounds(state),
    amplitudeScale,
    samples,
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
    solverEngineId: PHOTON_SOLVER_BRIDGE_ENGINE_ID,
    middleCycle: getPhotonMiddleCycleBounds(state),
    amplitudeScale,
    samples,
  };
}

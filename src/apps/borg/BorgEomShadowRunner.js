import {
  BORG_DEFAULT_CERTIFIED_BUDGET_ID,
  canonicalStringify,
  getBorgCertifiedBudgetPreset,
} from "./BorgCertifiedBudgets.js";
import {
  BORG_DISPLAY_HOST_MEMORY_ENVELOPE_SCHEMA,
  createBorgDisplayHostMemoryEnvelope,
} from "./BorgDisplayHostMemoryEnvelope.js";
import {
  applyBorgCausalHistoryRetention,
  createBorgCausalHistoryRetentionRequest,
  validateBorgCausalHistoryRetentionCertificate,
} from "./BorgCausalHistoryRetention.js";
import {
  BORG_ELECTRINO_STATE_FLAG,
  BORG_POSITRINO_STATE_FLAG,
} from "./BorgPolarityDiagnostics.js";
import {
  validateBorgEomBoundaryDiagnosticsRequest,
  validateBorgEomWakeBoundaryProducts,
} from "./BorgEomWakeBoundaryProducts.js";
import {
  evaluateEomCubicHistoryAtTime,
} from "../shared/EomCubicHistoryEvaluation.mjs";
export {
  BORG_EOM_CERTIFIED_EXECUTION_TIMEOUT,
} from "./BorgEomHttpClient.js";

export const BORG_EOM_SHADOW_RUNNER_VERSION = "borg-eom-shadow-runner.v0";
export const BORG_EOM_SHADOW_RUN_SOURCE = "computed-eom-shadow-chunks";
export const BORG_EOM_REQUEST_SCHEMA = "eom_borg_shadow_request/v1";
export const BORG_EOM_CONTRACT_ID = "eom_evolution_contract/v1";
export const BORG_EOM_MODEL_BINDING_ID = "master_eom_binding/v1";
export const BORG_EOM_COMPATIBILITY_HISTORY_PROVENANCE =
  "non-eom-history";
export const BORG_EOM_ACCEPTED_INITIAL_HISTORY_EVOLUTION_CLAIM_LEVEL =
  "eom-evolution-conditioned-on-accepted-initial-history";
export const BORG_EOM_RUN_GRADE_CERTIFIED = "certified";
export const BORG_EOM_RUN_GRADE_DISPLAY = "display";
const BORG_EOM_CERTIFIED_COMPLETED_EVIDENCE_STATUSES = Object.freeze(new Set([
  "canonical",
  "executable_architecture_evidence",
]));
const BORG_EOM_CERTIFIED_HALTED_EVIDENCE_STATUS = "failed";

let borgEomRunSequence = 0;

function normalizeBorgEomRunGrade(value) {
  if (value == null) {
    return BORG_EOM_RUN_GRADE_CERTIFIED;
  }
  if (value === BORG_EOM_RUN_GRADE_CERTIFIED || value === BORG_EOM_RUN_GRADE_DISPLAY) {
    return value;
  }
  throw new TypeError(`Unsupported Borg EOM run grade: ${value}.`);
}

export function createBorgEomShadowRunner(manifest, options = {}) {
  if (!manifest || typeof manifest !== "object") {
    throw new TypeError("Borg EOM shadow runner requires a dataset manifest.");
  }
  const client = options.eomClient;
  if (!client || typeof client.evolveRetainedHistories !== "function") {
    throw new TypeError(
      "Borg EOM shadow runner requires an EOM client with evolveRetainedHistories(request).",
    );
  }
  const config = createBorgEomShadowRunConfig(manifest, options);
  // A declared C1 initial datum is required. It is not EOM output; every live
  // extension remains explicitly conditioned on this accepted input history.
  const suppliedHistories = options.initialRetainedHistories;
  if (
    (!Array.isArray(options.initialFrameRows) || options.initialFrameRows.length === 0) &&
    (!Array.isArray(suppliedHistories) || suppliedHistories.length === 0)
  ) {
    throw new TypeError(
        "Borg EOM shadow runner requires initialFrameRows or exact initialRetainedHistories.",
    );
  }
  let histories = Array.isArray(suppliedHistories) && suppliedHistories.length > 0
    ? validateBorgInitialRetainedHistories(suppliedHistories, config)
    : createBorgContinuousRetainedHistories(
        options.initialFrameRows,
        manifest,
        {
          historyStartTime: config.historyStartTime,
          historyEndTime: config.startTime,
          expectedPathCount: config.pathCount,
          sourceProvenance: options.initialHistoryProvenance,
          sourceClaimLevel: options.initialHistoryClaimLevel,
        },
      );
  const runGrade = config.runGrade;
  const initialHistoryAccepted = histories.every(
    (history) => history.sourceAcceptedInitialDatum === true,
  );
  let displayHistoryProjectionCount = 0;
  if (runGrade === BORG_EOM_RUN_GRADE_DISPLAY) {
    histories = projectBorgHistoriesToDisplayGrade(histories);
    displayHistoryProjectionCount = 1;
  }
  let nextStartTime = config.startTime;
  let nextStartTimeToken = String(histories[0].coverageEnd);
  let targetDuration = config.targetDuration;
  let chunkDuration = config.chunkDuration;
  let controllerStepSize = config.initialStep;
  let chunkIndex = 0;
  let disposed = false;
  let runReleased = false;

  return Object.freeze({
    schema: BORG_EOM_SHADOW_RUNNER_VERSION,
    config,
    get nextStartTime() {
      return nextStartTime;
    },
    get chunkIndex() {
      return chunkIndex;
    },
    get phase() {
      return "live";
    },
    get targetDuration() {
      return targetDuration;
    },
    get chunkDuration() {
      return chunkDuration;
    },
    get runGrade() {
      return runGrade;
    },
    canComputeNextChunk() {
      return !disposed && nextStartTime < targetDuration;
    },
    setRunLimits(nextLimits = {}) {
      if (nextLimits.targetDuration === Number.POSITIVE_INFINITY) {
        targetDuration = Number.POSITIVE_INFINITY;
      }
      const requestedChunk = Number(nextLimits.chunkDuration);
      if (Number.isFinite(requestedChunk) && requestedChunk > 0) {
        chunkDuration = Math.min(
          config.chunkDuration,
          Math.max(config.sampleInterval, requestedChunk),
        );
      }
    },
    async computeNextChunk() {
      if (disposed) {
        throw new Error("Borg EOM shadow runner has been disposed.");
      }
      if (nextStartTime >= targetDuration) {
        return createCompleteChunk(
          config, chunkIndex, nextStartTime,
        );
      }
      const startTime = nextStartTime;
      const endTime = Math.min(
        targetDuration,
        roundTime(startTime + chunkDuration),
      );
      const endTimeToken = String(endTime);
      const request = createBorgEomShadowRequest({
        manifest,
        config,
        histories,
        chunkIndex,
        startTime,
        endTime,
        startTimeToken: nextStartTimeToken,
        endTimeToken,
        initialStep: controllerStepSize,
        runGrade,
        displayGradeBoundary: null,
        displayHistoryProjectionCount,
      });
      let rawResponse;
      try {
        rawResponse = await client.evolveRetainedHistories(request);
      } catch (error) {
        disposed = true;
        throw error;
      }
      const response = normalizeEomResponse(rawResponse, request);
      controllerStepSize = response.controllerStepSize;
      nextStartTime = response.acceptedEndTime;
      nextStartTimeToken = response.acceptedEndTimeToken;
      histories = runGrade === BORG_EOM_RUN_GRADE_DISPLAY
        ? response.histories.every(
            (history) => history.serverExactHistory === true,
          )
          ? response.histories
          : applyBorgCausalHistoryRetention(
              response.histories,
              response.causalHistoryRetention,
            )
        : retainBorgHistoryWindow(response.histories, {
            minimumCoverageStart: roundTime(nextStartTime - config.historyDepth),
          });
      const retainedHistoryStart = Number(histories[0].coverageStart);
      const retainedHistoryEnd = Number(histories[0].coverageEnd);
      const frames = createFramesFromHistories(
        histories,
        startTime,
        response.acceptedEndTime,
        config.sampleInterval,
        chunkIndex,
        response.evidenceStatus,
        response.claimGrade,
        initialHistoryAccepted,
      );
      chunkIndex += 1;
      if (response.terminalHalt) {
        disposed = true;
      }
      if (!response.terminalHalt && nextStartTime >= targetDuration &&
          !runReleased && typeof client.releaseRun === "function") {
        runReleased = true;
        await client.releaseRun();
      }
      return Object.freeze({
        schema: BORG_EOM_SHADOW_RUNNER_VERSION,
        source: BORG_EOM_SHADOW_RUN_SOURCE,
        statusCode: response.terminalHalt
            ? "halted-prefix"
            : "ok",
        chunkIndex: chunkIndex - 1,
        requestId: request.requestId,
        runId: request.runId,
        startTime,
        endTime: response.acceptedEndTime,
        terminalHalt: response.terminalHalt,
        runGrade,
        activeRunGrade: runGrade,
        transitionedToDisplayGrade: false,
        displayGradeBoundary: null,
        displayHistoryProjectionCount,
        sampleInterval: config.sampleInterval,
        controllerStepSize,
        phase: "live",
        initialHistoryAccepted,
        coreScale: response.coreScale,
        memoryBudgetBytes: response.memoryBudgetBytes,
        hostMemoryEnvelope: response.hostMemoryEnvelope,
        causalHistoryRetention: response.causalHistoryRetention,
        wakeBoundaryProducts: response.wakeBoundaryProducts,
        budgetProvenance: response.budgetProvenance,
        retainedHistoryStart,
        retainedHistoryEnd,
        retainedHistoryPolicy: runGrade === BORG_EOM_RUN_GRADE_DISPLAY
          ? response.historyStorage?.enabled === true
            ? response.causalHistoryRetention == null
              ? "solver-disk-backed-exact-history-no-retirement"
              : "solver-disk-backed-exact-history-with-certified-retirement"
            : response.causalHistoryRetention == null
              ? "append-only-display-grade-point-history"
              : "solver-cleared-fixed-envelope-display-history"
          : "rolling-certified-history-window",
        claimGrade: response.claimGrade,
        evolutionClaimLevel: runGrade === BORG_EOM_RUN_GRADE_DISPLAY
          ? "display-only-eom-evolution-from-point-projected-history"
          : initialHistoryAccepted
            ? BORG_EOM_ACCEPTED_INITIAL_HISTORY_EVOLUTION_CLAIM_LEVEL
            : "eom-evolution-conditioned-on-unaccepted-history",
        frames: Object.freeze(frames),
        histories,
        evidenceStatus: response.evidenceStatus,
        promotionEligible:
          runGrade === BORG_EOM_RUN_GRADE_CERTIFIED &&
          initialHistoryAccepted &&
          isBorgEomPromotionEligible(response, options.acceptanceGate),
        diagnostics: Object.freeze(response.diagnostics),
        bufferCount: 0,
        bufferByteLength: response.memoryEstimateBytes,
      });
    },
    async dispose() {
      disposed = true;
      runReleased = true;
      if (typeof client.dispose === "function") {
        await client.dispose();
      }
    },
  });
}

export function validateBorgInitialRetainedHistories(histories, config) {
  if (!Array.isArray(histories) || histories.length !== config.pathCount) {
    throw new Error("Borg exact initial retained histories must cover every path identity.");
  }
  const pathIds = new Set();
  const normalized = histories.map((history, historyIndex) => {
    const pathId = String(history?.pathId ?? "");
    if (!pathId || pathIds.has(pathId)) {
      throw new Error("Borg exact initial retained histories require unique path identities.");
    }
    pathIds.add(pathId);
    if (!Array.isArray(history.segments) || history.segments.length === 0) {
      throw new Error(`Borg exact initial retained history ${pathId} has no segments.`);
    }
    history.segments.forEach((segment, segmentIndex) => {
      const start = requiredFiniteNumber(
        segment.startTime,
        `initial retained segment ${historyIndex}:${segmentIndex} start`,
      );
      const end = requiredFiniteNumber(
        segment.endTime,
        `initial retained segment ${historyIndex}:${segmentIndex} end`,
      );
      if (!(end > start)) {
        throw new Error(`Borg exact initial retained history ${pathId} has a nonpositive segment.`);
      }
      if (segmentIndex > 0 &&
          String(history.segments[segmentIndex - 1].endTime) !== String(segment.startTime)) {
        throw new Error(`Borg exact initial retained history ${pathId} is not contiguous.`);
      }
      if (!Array.isArray(segment.coefficients) || segment.coefficients.length !== 3 ||
          segment.coefficients.some((axis) => !Array.isArray(axis) || axis.length !== 4)) {
        throw new Error(`Borg exact initial retained history ${pathId} has invalid cubic coefficients.`);
      }
    });
    if (String(history.coverageStart) !== String(history.segments[0].startTime) ||
        String(history.coverageEnd) !== String(history.segments.at(-1).endTime) ||
        Number(history.coverageEnd) !== config.startTime) {
      throw new Error(
        `Borg exact initial retained history ${pathId} must end at the selected evolution cut.`,
      );
    }
    return Object.freeze({
      ...history,
      pathId,
      pathKey: history.pathKey ?? Number(pathId),
      segments: Object.freeze([...history.segments]),
    });
  });
  return Object.freeze(normalized);
}

export function createBorgEomShadowRunConfig(manifest, options = {}) {
  const certifiedBudget = getBorgCertifiedBudgetPreset(
    options.certifiedBudgetId ?? BORG_DEFAULT_CERTIFIED_BUDGET_ID,
  );
  const runGrade = normalizeBorgEomRunGrade(options.runGrade);
  const budget = certifiedBudget.allocations;
  const sampleInterval = positiveNumber(
    options.sampleInterval,
    manifest.simulationEnvelope?.sampleInterval ?? 0.2,
  );
  const startTime = finiteNumber(
    options.startTime,
    // The history cut is the end of the accepted initial history. When a
    // replayed record is supplied it declares this bound itself.
    manifest.trajectoryRecord?.historyEndTime,
  );
  const chunkDuration = positiveNumber(options.chunkDuration, sampleInterval);
  const maximumPathCount = positiveInteger(
    manifest.population?.maximumArchitrinoCount,
    Number.MAX_SAFE_INTEGER,
  );
  const pathCount = positiveInteger(
    options.pathCount,
    manifest.population?.architrinoCount ?? maximumPathCount,
  );
  if (pathCount > maximumPathCount) {
    throw new RangeError(
      `Borg EOM path count ${pathCount} exceeds the ${maximumPathCount} retained histories available.`,
    );
  }
  const outerRadius = positiveNumber(
    options.simulationOuterRadius,
    manifest.simulationEnvelope?.outerRadius ?? 50,
  );
  const simulationCenter = requiredFiniteVector3(
    options.simulationCenter ?? manifest.simulationEnvelope?.center ?? { x: 0, y: 0, z: 0 },
    "simulation center",
  );
  const fieldSpeed = positiveNumber(
    options.fieldSpeed,
    manifest.simulationEnvelope?.fieldSpeed ?? 1,
  );
  const geometricDelayBound = (2 * outerRadius) / fieldSpeed;
  const historySafetyMargin = positiveNumber(
    options.historySafetyMargin,
    Math.max(sampleInterval * 2, geometricDelayBound * 0.05),
  );
  const historyDepth = positiveNumber(
    options.historyDepth,
    manifest.simulationEnvelope?.historyDepth ?? 10,
  );
  const minimumHistoryDepth = geometricDelayBound + historySafetyMargin;
  const historyCoverageTolerance =
    Number.EPSILON * Math.max(1, historyDepth, minimumHistoryDepth) * 8;
  if (historyDepth + historyCoverageTolerance < minimumHistoryDepth) {
    throw new RangeError(
      `Borg EOM history depth ${historyDepth} must cover the geometric delay bound ${geometricDelayBound} plus safety margin ${historySafetyMargin}.`,
    );
  }
  const causalHistoryRetention = createBorgCausalHistoryRetentionRequest({
    enabled:
      runGrade === BORG_EOM_RUN_GRADE_DISPLAY &&
      options.causalHistoryRetention === true,
    center: simulationCenter,
    radius: outerRadius,
  });
  const coreScale = Number(budget.finiteWidth.coreScale);
  const farFieldEnclosureFraction = budget.ordinary.farFieldEnclosureFraction;
  const targetDuration = finiteNumber(
    options.targetDuration,
    roundTime(startTime + chunkDuration),
  );
  if (targetDuration <= startTime) {
    throw new RangeError("Borg EOM target duration must exceed its initial-history cut.");
  }
  assertAtomicPresetValue(
    options.initialStep,
    budget.controller.initialStep,
    "initialStep",
  );
  assertAtomicPresetValue(
    options.minimumStep,
    budget.controller.minimumStep,
    "minimumStep",
  );
  assertAtomicPresetValue(
    options.maximumStep,
    budget.controller.maximumStep,
    "maximumStep",
  );
  assertAtomicPresetValue(
    options.useAdaptiveStepGrowth,
    budget.controller.adaptiveGrowth,
    "useAdaptiveStepGrowth",
  );
  const initialStep = requiredPositiveToken(
    budget.controller.initialStep,
    "initialStep",
  );
  const minimumStep = requiredPositiveToken(
    budget.controller.minimumStep,
    "minimumStep",
  );
  const maximumStep = requiredPositiveToken(
    budget.controller.maximumStep,
    "maximumStep",
  );
  if (Number(minimumStep) > Number(initialStep) ||
      Number(initialStep) > Number(maximumStep)) {
    throw new RangeError(
      "Borg EOM steps must satisfy minimumStep <= initialStep <= maximumStep.",
    );
  }
  const runId = String(options.runId ??
    `borg-eom-shadow-run:${Date.now()}:${++borgEomRunSequence}`);
  return Object.freeze({
    schema: BORG_EOM_SHADOW_RUNNER_VERSION,
    runSource: BORG_EOM_SHADOW_RUN_SOURCE,
    runId,
    runGrade,
    startTime,
    targetDuration,
    chunkDuration,
    pathCount,
    sampleInterval,
    fieldSpeed,
    simulationCenter,
    simulationOuterRadius: outerRadius,
    historyStartTime: roundTime(startTime - historyDepth),
    historyDepth,
    causalHistoryRetention,
    boundaryDiagnostics: options.boundaryDiagnostics ?? null,
    coreScale,
    geometricDelayBound,
    historySafetyMargin,
    minimumHistoryDepth,
    coupling: requiredNumericToken(
      options.coupling ?? manifest.modelControls?.coupling ?? "1",
      "coupling",
    ),
    initialStep,
    minimumStep,
    maximumStep,
    useAdaptiveStepGrowth: requiredBoolean(
      budget.controller.adaptiveGrowth,
      "useAdaptiveStepGrowth",
    ),
    rootTolerance: budget.ordinary.rootTimeEnclosure,
    accelerationTolerance: budget.ordinary.accelerationEnclosure,
    farFieldEnclosureFraction,
    positionTolerance: budget.ordinary.acceptedStepPosition,
    velocityTolerance: budget.ordinary.acceptedStepVelocity,
    correctionTolerance: budget.ordinary.correctionAccelerationResidual,
    threadCount: budget.resources.workerThreads,
    memoryBudgetBytes: budget.resources.requestMemoryBytes,
    certifiedBudget,
    modelBindingId: options.modelBindingId ?? BORG_EOM_MODEL_BINDING_ID,
  });
}

export function createBorgContinuousRetainedHistories(
  frameRows,
  manifest,
  {
    historyStartTime,
    historyEndTime,
    expectedPathCount,
    sourceProvenance,
    sourceClaimLevel,
  } = {},
) {
  if (!Array.isArray(frameRows) || frameRows.length === 0) {
    throw new TypeError("Borg EOM evolution requires retained path-history rows.");
  }
  const cutTime = finiteNumber(historyEndTime, Math.max(...frameRows.map((row) => Number(row.time))));
  const requestedStart = finiteNumber(
    historyStartTime,
    Math.min(...frameRows.map((row) => Number(row.time))),
  );
  const grouped = new Map();
  frameRows.forEach((row) => {
    const pathKey = Number(row.pathKey);
    const time = Number(row.time);
    if (
      !Number.isFinite(pathKey) ||
      !Number.isFinite(time) ||
      time < requestedStart ||
      time > cutTime
    ) {
      return;
    }
    const rows = grouped.get(pathKey) ?? [];
    rows.push(row);
    grouped.set(pathKey, rows);
  });
  const requiredPathCount = positiveInteger(
    expectedPathCount,
    manifest.population?.architrinoCount,
  );
  if (Number.isInteger(requiredPathCount) && grouped.size !== requiredPathCount) {
    throw new Error("Borg EOM retained history does not cover every path identity.");
  }
  const histories = [...grouped.entries()]
    .sort(([left], [right]) => left - right)
    .map(([pathKey, rows]) => {
      rows.sort((left, right) => Number(left.time) - Number(right.time));
      const uniqueRows = rows.filter(
        (row, index) => index === 0 || Number(row.time) > Number(rows[index - 1].time),
      );
      if (uniqueRows.length < 2 || Number(uniqueRows.at(-1).time) !== cutTime) {
        throw new Error(
          `Borg EOM path ${pathKey} lacks continuous retained history through ${cutTime}.`,
        );
      }
      const segments = createRetainedHistorySegments(uniqueRows);
      return Object.freeze({
        pathId: String(pathKey),
        pathKey,
        charge: String(chargeForStateFlags(uniqueRows[0].stateFlags, manifest)),
        stateFlags: uniqueRows[0].stateFlags ?? 0,
        coverageStart: String(uniqueRows[0].time),
        coverageEnd: String(cutTime),
        interpolation: uniqueRows[0].historyInterpolation ?? "piecewise-cubic-hermite/v0",
        sourceProvenance:
          sourceProvenance ??
          uniqueRows[0].historySourceProvenance ??
          BORG_EOM_COMPATIBILITY_HISTORY_PROVENANCE,
        sourceClaimLevel:
          sourceClaimLevel ??
          uniqueRows[0].historySourceClaimLevel ??
          "conditional-non-eom-history",
        sourceAcceptedInitialDatum:
          uniqueRows[0].historySourceAcceptedInitialDatum === true,
        sourceIsEomOutput:
          uniqueRows[0].historySourceIsEomOutput === true,
        segments: Object.freeze(segments),
      });
    });
  return Object.freeze(histories);
}

export function createBorgEomShadowRequest({
  manifest,
  config,
  histories,
  chunkIndex,
  startTime,
  endTime,
  startTimeToken = String(startTime),
  endTimeToken = String(endTime),
  initialStep = config.initialStep,
  runGrade = BORG_EOM_RUN_GRADE_CERTIFIED,
  displayGradeBoundary = null,
  displayHistoryProjectionCount = 0,
}) {
  if (!Array.isArray(histories) || histories.length === 0) {
    throw new TypeError("Borg EOM request requires continuous retained histories.");
  }
  histories.forEach((history) => {
    if (String(history.coverageEnd) !== String(startTimeToken)) {
      throw new Error("Borg EOM histories must end at the requested evolution start.");
    }
  });
  if (![BORG_EOM_RUN_GRADE_CERTIFIED, BORG_EOM_RUN_GRADE_DISPLAY].includes(runGrade)) {
    throw new TypeError(`Unsupported Borg EOM run grade: ${runGrade}.`);
  }
  const boundaryDiagnostics = validateBorgEomBoundaryDiagnosticsRequest(
    config.boundaryDiagnostics ?? null,
    {
      runId: config.runId,
      fieldSpeed: config.fieldSpeed,
      pathIds: histories.map((history) => history.pathId),
    },
  );
  return Object.freeze({
    schema: BORG_EOM_REQUEST_SCHEMA,
    contractId: BORG_EOM_CONTRACT_ID,
    contractAmendmentIds: Object.freeze([]),
    requestId: `borg-eom-shadow-request:chunk-${chunkIndex}`,
    runId: config.runId ?? "borg-eom-shadow-run",
    runGrade,
    claimLevel: "eom-forward-evolution-request",
    modelBindingId: config.modelBindingId,
    absoluteTimeInterval: Object.freeze({
      start: String(startTimeToken),
      end: String(endTimeToken),
    }),
    histories,
    numericalControls: Object.freeze({
      integrationMode: "adaptive-coupled",
      initialStep,
      minimumStep: config.minimumStep,
      maximumStep: config.maximumStep,
      useAdaptiveStepGrowth: config.useAdaptiveStepGrowth,
      rootTolerance: config.rootTolerance,
      accelerationTolerance: config.accelerationTolerance,
      farFieldEnclosureFraction: config.farFieldEnclosureFraction,
      positionTolerance: config.positionTolerance,
      velocityTolerance: config.velocityTolerance,
      correctionTolerance: config.correctionTolerance,
      deterministicReduction: true,
      threadCount: config.threadCount,
    }),
    certifiedBudget: Object.freeze({
      schema: config.certifiedBudget.allocations.schema,
      presetId: config.certifiedBudget.id,
      label: config.certifiedBudget.label,
      allocationHash: config.certifiedBudget.allocationHash,
      allocationCanonicalJson:
        config.certifiedBudget.allocationCanonicalJson,
      allocations: config.certifiedBudget.allocations,
    }),
    modelControls: Object.freeze({
      fieldSpeed: String(config.fieldSpeed),
      coupling: config.coupling,
      coreScale: String(config.coreScale),
      selfPairs: "included-except-coincident-endpoint",
      futurePathPolicy: "prohibited",
    }),
    resourceEnvelope: Object.freeze({
      memoryBudgetBytes: config.memoryBudgetBytes,
      failurePolicy: "fail-closed",
      causalHistoryRetention: config.causalHistoryRetention,
      boundaryDiagnostics,
    }),
    provenance: Object.freeze({
      appId: "borg",
      sourceManifestId: manifest.manifestId,
      importedHistoryAuthority:
        histories[0].sourceProvenance ?? BORG_EOM_COMPATIBILITY_HISTORY_PROVENANCE,
      importedHistoryIsEomEvidence: false,
      importedHistoryIsEomOutput: histories.every(
        (history) => history.sourceIsEomOutput === true,
      ),
      importedHistoryIsAcceptedInitialDatum: histories.every(
        (history) => history.sourceAcceptedInitialDatum === true,
      ),
      retainedHistoryStart: histories[0].coverageStart,
      retainedHistoryEnd: histories[0].coverageEnd,
      geometricDelayBound: config.geometricDelayBound,
      historySafetyMargin: config.historySafetyMargin,
      displayGradeBoundary,
      displayHistoryProjectionCount,
    }),
  });
}

export function projectBorgHistoriesToDisplayGrade(histories) {
  if (!Array.isArray(histories) || histories.length === 0) {
    throw new TypeError("Display-grade projection requires retained histories.");
  }
  return Object.freeze(histories.map((history) => Object.freeze({
    ...history,
    sourceProvenance: "borg-display-grade-point-history/v1",
    sourceClaimLevel: "display-only",
    sourceAcceptedInitialDatum: false,
    segments: projectHistorySegmentsToPointTrajectory(history.segments),
  })));
}

function projectHistorySegmentsToPointTrajectory(segments) {
  const projected = [];
  let continuousStartTokens = null;
  segments.forEach((segment, segmentIndex) => {
    const startTime = requiredFiniteNumber(
      segment.startTime,
      `display projection segment ${segmentIndex} start`,
    );
    const endTime = requiredFiniteNumber(
      segment.endTime,
      `display projection segment ${segmentIndex} end`,
    );
    if (!(endTime > startTime)) {
      throw new Error("Display-grade retained-history segments must have positive duration.");
    }
    const coefficients = segment.coefficients.map((axis, axisIndex) => {
      const projectedAxis = [...axis];
      if (continuousStartTokens) {
        projectedAxis[0] = continuousStartTokens.position[axisIndex];
        projectedAxis[1] = continuousStartTokens.velocity[axisIndex];
      }
      return Object.freeze(projectedAxis.map(String));
    });
    const pointSegment = Object.freeze({
      ...segment,
      coefficients: Object.freeze(coefficients),
      positionErrors: Object.freeze(["0", "0", "0"]),
      velocityErrors: Object.freeze(["0", "0", "0"]),
      evidenceStatus: "display-only",
      claimGrade: "display-only",
    });
    projected.push(pointSegment);
    continuousStartTokens = evaluateExactDecimalSegmentEnd(
      coefficients,
      exactDecimalSubtract(segment.endTime, segment.startTime),
    );
  });
  return Object.freeze(projected);
}

function evaluateExactDecimalSegmentEnd(coefficients, localTime) {
  const time = parseExactDecimal(localTime);
  const position = [];
  const velocity = [];
  coefficients.forEach((axis) => {
    const [c0, c1, c2, c3] = axis.map(parseExactDecimal);
    position.push(formatExactDecimal(exactDecimalAdd(
      c0,
      exactDecimalMultiply(time, exactDecimalAdd(
        c1,
        exactDecimalMultiply(time, exactDecimalAdd(
          c2,
          exactDecimalMultiply(time, c3),
        )),
      )),
    )));
    velocity.push(formatExactDecimal(exactDecimalAdd(
      c1,
      exactDecimalAdd(
        exactDecimalMultiply(
          { numerator: 2n, scale: 0 },
          exactDecimalMultiply(time, c2),
        ),
        exactDecimalMultiply(
          { numerator: 3n, scale: 0 },
          exactDecimalMultiply(exactDecimalMultiply(time, time), c3),
        ),
      ),
    )));
  });
  return { position, velocity };
}

function exactDecimalSubtract(left, right) {
  const negativeRight = parseExactDecimal(right);
  negativeRight.numerator = -negativeRight.numerator;
  return formatExactDecimal(exactDecimalAdd(parseExactDecimal(left), negativeRight));
}

function parseExactDecimal(token) {
  const match = String(token).trim().match(
    /^([+-]?)(\d+)(?:\.(\d*))?(?:[eE]([+-]?\d+))?$/u,
  );
  if (!match) {
    throw new TypeError(`Invalid exact decimal token: ${token}.`);
  }
  const sign = match[1] === "-" ? -1n : 1n;
  const fraction = match[3] ?? "";
  const exponent = Number(match[4] ?? 0);
  let numerator = sign * BigInt(`${match[2]}${fraction}`);
  let scale = fraction.length - exponent;
  if (scale < 0) {
    numerator *= 10n ** BigInt(-scale);
    scale = 0;
  }
  return normalizeExactDecimal({ numerator, scale });
}

function exactDecimalAdd(left, right) {
  const scale = Math.max(left.scale, right.scale);
  return normalizeExactDecimal({
    numerator:
      left.numerator * 10n ** BigInt(scale - left.scale) +
      right.numerator * 10n ** BigInt(scale - right.scale),
    scale,
  });
}

function exactDecimalMultiply(left, right) {
  return normalizeExactDecimal({
    numerator: left.numerator * right.numerator,
    scale: left.scale + right.scale,
  });
}

function normalizeExactDecimal(value) {
  while (value.scale > 0 && value.numerator % 10n === 0n) {
    value.numerator /= 10n;
    value.scale -= 1;
  }
  return value;
}

function formatExactDecimal(value) {
  const normalized = normalizeExactDecimal({ ...value });
  const negative = normalized.numerator < 0n;
  const digits = (negative ? -normalized.numerator : normalized.numerator).toString();
  if (normalized.scale === 0) {
    return `${negative ? "-" : ""}${digits}`;
  }
  const padded = digits.padStart(normalized.scale + 1, "0");
  const split = padded.length - normalized.scale;
  return `${negative ? "-" : ""}${padded.slice(0, split)}.${padded.slice(split)}`;
}

export function retainBorgHistoryWindow(histories, { minimumCoverageStart } = {}) {
  const lowerBound = requiredFiniteNumber(
    minimumCoverageStart,
    "retained-history minimum coverage start",
  );
  return Object.freeze(histories.map((history) => {
    const segments = history.segments.filter(
      (segment) => Number(segment.endTime) > lowerBound + 1e-9,
    );
    if (segments.length === 0) {
      throw new Error(
        `Borg EOM retained history ${history.pathId} has no segment covering ${lowerBound}.`,
      );
    }
    return Object.freeze({
      ...history,
      coverageStart: String(Number(segments[0].startTime)),
      segments: Object.freeze(segments),
    });
  }));
}

export function isBorgEomPromotionEligible(response, acceptanceGate) {
  return Boolean(
    response?.status === "completed" &&
      response?.evidenceStatus === "canonical" &&
      acceptanceGate?.schema === "eom_acceptance_gate/v0" &&
      acceptanceGate?.status === "passed" &&
      acceptanceGate?.borgMigrationAuthorized === true,
  );
}

function createHermiteHistorySegment(start, end) {
  const t0 = Number(start.time);
  const t1 = Number(end.time);
  const duration = t1 - t0;
  if (!(duration > 0)) {
    throw new Error("Borg retained-history rows must have strictly increasing times.");
  }
  const exactInertial =
    start.historyInterpolation === "exact-inertial-polynomial/v1" &&
    end.historyInterpolation === "exact-inertial-polynomial/v1";
  const coefficients = ["x", "y", "z"].map((axis) => {
    const x0 = requiredFiniteNumber(start.position?.[axis], `${axis} start position`);
    const x1 = requiredFiniteNumber(end.position?.[axis], `${axis} end position`);
    const v0 = requiredFiniteNumber(start.velocity?.[axis], `${axis} start velocity`);
    const v1 = requiredFiniteNumber(end.velocity?.[axis], `${axis} end velocity`);
    if (exactInertial) {
      if (v0 !== v1) {
        throw new Error("Borg accepted inertial seed must have constant velocity.");
      }
      return Object.freeze([String(x0), String(v0), "0", "0"]);
    }
    const delta = x1 - x0;
    return Object.freeze([
      String(x0),
      String(v0),
      String((3 * delta) / duration ** 2 - (2 * v0 + v1) / duration),
      String((-2 * delta) / duration ** 3 + (v0 + v1) / duration ** 2),
    ]);
  });
  return Object.freeze({
    startTime: String(t0),
    endTime: String(t1),
    coefficients: Object.freeze(coefficients),
    positionErrors: Object.freeze(Array(3).fill(
      String(Math.max(Number(start.errorBound) || 0, Number(end.errorBound) || 0)),
    )),
    velocityErrors: Object.freeze(Array(3).fill(
      String(Math.max(Number(start.errorBound) || 0, Number(end.errorBound) || 0)),
    )),
  });
}

function createRetainedHistorySegments(rows) {
  const exactInertial = rows.every(
    (row) => row.historyInterpolation === "exact-inertial-polynomial/v1",
  );
  if (exactInertial) {
    const first = rows[0];
    const firstTime = Number(first.time);
    const axes = ["x", "y", "z"];
    const singlePolynomial = rows.every((row) => {
      const elapsed = Number(row.time) - firstTime;
      return axes.every((axis) => {
        const velocity = Number(first.velocity?.[axis]);
        return Number(row.velocity?.[axis]) === velocity &&
          Math.abs(
            Number(row.position?.[axis]) -
            (Number(first.position?.[axis]) + elapsed * velocity)
          ) <= 1e-12 * Math.max(1, Math.abs(Number(row.position?.[axis])));
      });
    });
    if (singlePolynomial) {
      return [createHermiteHistorySegment(first, rows.at(-1))];
    }
  }
  const segments = [];
  for (let index = 0; index + 1 < rows.length; index += 1) {
    segments.push(createHermiteHistorySegment(rows[index], rows[index + 1]));
  }
  return segments;
}

function normalizeEomResponse(rawResponse, request) {
  const response = rawResponse?.response ?? rawResponse;
  const acceptedEndTime = Number(response?.acceptedEndTime);
  const acceptedEndTimeToken = String(response?.acceptedEndTime ?? "");
  const requestStart = Number(request.absoluteTimeInterval.start);
  const requestEnd = Number(request.absoluteTimeInterval.end);
  const completed = response?.status === "completed" &&
    response?.allStepsAtomic === true &&
    Number.isFinite(acceptedEndTime) && acceptedEndTime === requestEnd;
  const certifiedPrefix = response?.status === "halted" &&
    response?.allStepsAtomic === true &&
    Number.isFinite(acceptedEndTime) && acceptedEndTime > requestStart &&
    acceptedEndTime < requestEnd;
  if (!response || (!completed && !certifiedPrefix)) {
    const failure = response?.haltCode ?? response?.failureCode ?? "eom_shadow_run_failed";
    const diagnosticDetail = String(response?.diagnosticDetail ?? "").trim();
    const error = new Error(
      `Borg EOM shadow run failed closed: ${failure}.` +
      (diagnosticDetail ? ` ${diagnosticDetail}` : ""),
    );
    error.code = failure;
    error.eomResponse = response ?? null;
    throw error;
  }
  const histories = response.histories ?? response.publishedHistories;
  if (!Array.isArray(histories) || histories.length !== request.histories.length) {
    throw new Error("Borg EOM shadow response lacks the complete path-history domain.");
  }
  const expectedIds = request.histories.map((history) => history.pathId);
  histories.forEach((history, index) => {
    if (String(history.pathId) !== expectedIds[index] ||
        Number(history.coverageEnd) !== (completed ? requestEnd : acceptedEndTime) ||
        !Array.isArray(history.segments) || history.segments.length === 0) {
      throw new Error("Borg EOM shadow response has incomplete or reordered histories.");
    }
  });
  const coreScale = Number(requiredPositiveToken(
    response.coreScale ?? request.modelControls.coreScale,
    "response coreScale",
  ));
  const claimGrade = String(response.claimGrade ?? response.evidenceStatus ?? "failed");
  const responseRunGrade = String(response.runGrade ?? request.runGrade);
  const expectedEvidenceStatus = request.runGrade === BORG_EOM_RUN_GRADE_DISPLAY
    ? "display-only"
    : certifiedPrefix
      ? BORG_EOM_CERTIFIED_HALTED_EVIDENCE_STATUS
      : BORG_EOM_CERTIFIED_COMPLETED_EVIDENCE_STATUSES.has(
          String(response.evidenceStatus ?? ""),
        )
        ? String(response.evidenceStatus)
        : null;
  const memoryBudgetBytes = requiredPositiveInteger(
    response.memoryBudgetBytes ?? request.resourceEnvelope.memoryBudgetBytes,
    "response memoryBudgetBytes",
  );
  const memoryEstimateBytes = requiredNonnegativeInteger(
    response.memoryEstimateBytes ?? 0,
    "response memoryEstimateBytes",
  );
  const budgetProvenance = response.budgetProvenance;
  const requestedBudget = request.certifiedBudget;
  const provenanceMismatches = [];
  let hostMemoryEnvelope = null;
  if (response.hostMemoryEnvelope != null) {
    try {
      const expectedHostMemoryEnvelope = createBorgDisplayHostMemoryEnvelope({
        hostTotalMemoryBytes:
          response.hostMemoryEnvelope.hostTotalMemoryBytes,
        hostAvailableMemoryBytes:
          response.hostMemoryEnvelope.hostAvailableMemoryBytes,
        workerResidentBytes:
          response.hostMemoryEnvelope.workerResidentBytes,
        previousMemoryEstimateBytes:
          response.hostMemoryEnvelope.previousMemoryEstimateBytes,
      });
      if (request.runGrade !== BORG_EOM_RUN_GRADE_DISPLAY ||
          response.hostMemoryEnvelope.schema !==
            BORG_DISPLAY_HOST_MEMORY_ENVELOPE_SCHEMA ||
          response.hostMemoryEnvelope.admitted !== true ||
          canonicalStringify(response.hostMemoryEnvelope) !==
            canonicalStringify(expectedHostMemoryEnvelope)) {
        provenanceMismatches.push("hostMemoryEnvelope");
      } else {
        hostMemoryEnvelope = expectedHostMemoryEnvelope;
      }
    } catch {
      provenanceMismatches.push("hostMemoryEnvelope");
    }
  }
  const expectedMemoryBudgetBytes = hostMemoryEnvelope == null
    ? Number(request.resourceEnvelope.memoryBudgetBytes)
    : hostMemoryEnvelope.requestMemoryBudgetBytes;
  if (coreScale !== Number(request.modelControls.coreScale)) {
    provenanceMismatches.push("coreScale");
  }
  if (memoryBudgetBytes !== expectedMemoryBudgetBytes) {
    provenanceMismatches.push("memoryBudgetBytes");
  }
  if (memoryEstimateBytes > memoryBudgetBytes) {
    provenanceMismatches.push("memoryEstimateBytes exceeds memoryBudgetBytes");
  }
  if (responseRunGrade !== request.runGrade) {
    provenanceMismatches.push(
      `runGrade expected ${request.runGrade} but received ${responseRunGrade}`,
    );
  }
  if (expectedEvidenceStatus == null) {
    provenanceMismatches.push(
      "evidenceStatus expected one of canonical, executable_architecture_evidence",
    );
  } else if (String(response.evidenceStatus ?? "failed") !== expectedEvidenceStatus) {
    provenanceMismatches.push(`evidenceStatus expected ${expectedEvidenceStatus}`);
  }
  if (claimGrade !== expectedEvidenceStatus) {
    provenanceMismatches.push(`claimGrade expected ${expectedEvidenceStatus}`);
  }
  if (budgetProvenance?.schema !== requestedBudget.schema) {
    provenanceMismatches.push("certifiedBudget.schema");
  }
  if (budgetProvenance?.presetId !== requestedBudget.presetId) {
    provenanceMismatches.push("certifiedBudget.presetId");
  }
  if (budgetProvenance?.allocationHash !== requestedBudget.allocationHash) {
    provenanceMismatches.push("certifiedBudget.allocationHash");
  }
  if (budgetProvenance?.allocationCanonicalJson !==
      requestedBudget.allocationCanonicalJson) {
    provenanceMismatches.push("certifiedBudget.allocationCanonicalJson");
  }
  if (canonicalStringify(budgetProvenance?.allocations) !==
      requestedBudget.allocationCanonicalJson) {
    provenanceMismatches.push("certifiedBudget.allocations");
  }
  if (provenanceMismatches.length > 0) {
    throw new Error(
      "Borg EOM shadow response has inconsistent provenance: " +
      `${provenanceMismatches.join(", ")}.`,
    );
  }
  let causalHistoryRetention = null;
  try {
    causalHistoryRetention = validateBorgCausalHistoryRetentionCertificate(
      response.causalHistoryRetention ?? null,
      request.resourceEnvelope.causalHistoryRetention ?? null,
    );
  } catch (error) {
    throw new Error(
      `Borg EOM shadow response has inconsistent causal-history provenance: ${error.message}`,
    );
  }
  const historyStorage = validateHistoryStorage(response.historyStorage);
  if (request.resourceEnvelope.boundaryDiagnostics != null &&
      response.wakeBoundaryProducts == null) {
    throw new Error(
      "Borg EOM shadow response omitted requested wake/boundary diagnostics.",
    );
  }
  const wakeBoundaryProducts = response.wakeBoundaryProducts == null
    ? null
    : validateBorgEomWakeBoundaryProducts(response.wakeBoundaryProducts, {
        runId: request.runId,
        acceptedEndTime: acceptedEndTimeToken,
        pathIds: request.histories.map((history) => history.pathId),
        boundaryDiagnostics: request.resourceEnvelope.boundaryDiagnostics,
      });
  return Object.freeze({
    status: response.status,
    runGrade: responseRunGrade,
    evidenceStatus: expectedEvidenceStatus,
    coreScale,
    memoryBudgetBytes,
    memoryEstimateBytes,
    hostMemoryEnvelope,
    causalHistoryRetention,
    historyStorage,
    wakeBoundaryProducts,
    claimGrade,
    budgetProvenance: Object.freeze({
      schema: budgetProvenance.schema,
      presetId: budgetProvenance.presetId,
      allocationHash: budgetProvenance.allocationHash,
      allocationCanonicalJson: budgetProvenance.allocationCanonicalJson,
      allocations: budgetProvenance.allocations,
    }),
    controllerStepSize: String(Number(requiredPositiveToken(
      response.controllerStepSize ?? request.numericalControls.initialStep,
      "response controllerStepSize",
    ))),
    acceptedEndTime: completed ? requestEnd : acceptedEndTime,
    acceptedEndTimeToken: completed
      ? String(request.absoluteTimeInterval.end)
      : acceptedEndTimeToken,
    terminalHalt: certifiedPrefix ? Object.freeze({
      code: String(response.haltCode ?? "eom_shadow_run_failed"),
      failedCandidateRejected: true,
      acceptedPrefixEndTime: acceptedEndTime,
    }) : null,
    histories: Object.freeze(histories),
    diagnostics: Array.isArray(response.diagnostics) ? response.diagnostics : [],
  });
}

function validateHistoryStorage(value) {
  if (value == null) {
    return null;
  }
  const maximumDiskBytes = Number(value.maximumDiskBytes);
  const diskBytes = Number(value.diskBytes);
  const blockFileCount = Number(value.blockFileCount);
  const cachedBlocksPerThread = Number(value.cachedBlocksPerThread);
  if (value.schema !== "eom_exact_history_disk_store/v1" ||
      value.mode !== "disk-backed-exact-blocks" ||
      value.enabled !== true ||
      !Number.isSafeInteger(maximumDiskBytes) || maximumDiskBytes <= 0 ||
      maximumDiskBytes > 1024 ** 4 ||
      !Number.isSafeInteger(diskBytes) || diskBytes < 0 ||
      diskBytes > maximumDiskBytes ||
      !Number.isSafeInteger(blockFileCount) || blockFileCount < 0 ||
      !Number.isSafeInteger(cachedBlocksPerThread) ||
      cachedBlocksPerThread < 2) {
    throw new Error("Borg EOM shadow response has invalid exact-history storage provenance.");
  }
  return Object.freeze({
    schema: value.schema,
    mode: value.mode,
    enabled: true,
    maximumDiskBytes,
    diskBytes,
    blockFileCount,
    cachedBlocksPerThread,
  });
}

function createFramesFromHistories(
  histories,
  startTime,
  endTime,
  sampleInterval,
  chunkIndex,
  evidenceStatus,
  claimGrade,
  initialHistoryAccepted,
  valueAuthorityOverride = null,
) {
  const frames = [];
  const sampleCount = Math.round((endTime - startTime) / sampleInterval);
  let previousFrameIndex = Number.NEGATIVE_INFINITY;
  for (let sampleIndex = 0; sampleIndex <= sampleCount; sampleIndex += 1) {
    const time = sampleIndex === sampleCount
      ? endTime
      : roundTime(startTime + sampleIndex * sampleInterval);
    const roundedFrameIndex = Math.round(time / sampleInterval);
    const frameIndex = Math.max(roundedFrameIndex, previousFrameIndex + 1);
    previousFrameIndex = frameIndex;
    histories.forEach((history) => {
      const state = evaluateEomCubicHistoryAtTime(history, time, {
        historyId: history.pathId,
        entityLabel: "history",
        timeRole: "output",
      });
      frames.push(Object.freeze({
        pathKey: Number(history.pathKey ?? history.pathId),
        frameIndex,
        time,
        position: Object.freeze(state.position),
        velocity: Object.freeze(state.velocity),
        errorBound: state.errorBound,
        stateFlags: history.stateFlags ?? 0,
        dynamicChunkIndex: chunkIndex,
        runSource: BORG_EOM_SHADOW_RUN_SOURCE,
        valueAuthority: valueAuthorityOverride ?? (initialHistoryAccepted
          ? evidenceStatus === "canonical"
            ? "canonical-eom-output-conditioned-on-accepted-initial-history"
            : "eom-shadow-output-conditioned-on-accepted-initial-history"
          : evidenceStatus === "canonical"
            ? "canonical-eom-output"
            : "eom-shadow-output"),
      }));
    });
  }
  return frames;
}

function createCompleteChunk(
  config,
  chunkIndex,
  time,
) {
  return Object.freeze({
    schema: BORG_EOM_SHADOW_RUNNER_VERSION,
    source: BORG_EOM_SHADOW_RUN_SOURCE,
    statusCode: "complete",
    chunkIndex,
    startTime: time,
    endTime: time,
    sampleInterval: config.sampleInterval,
    initialHistoryAccepted: false,
    coreScale: config.coreScale,
    budgetProvenance: Object.freeze({
      schema: config.certifiedBudget.allocations.schema,
      presetId: config.certifiedBudget.id,
      allocationHash: config.certifiedBudget.allocationHash,
      allocationCanonicalJson:
        config.certifiedBudget.allocationCanonicalJson,
      allocations: config.certifiedBudget.allocations,
    }),
    claimGrade: "not-applicable",
    evolutionClaimLevel: "not-applicable",
    frames: Object.freeze([]),
    histories: Object.freeze([]),
    evidenceStatus: "failed",
    promotionEligible: false,
    diagnostics: Object.freeze([]),
    bufferCount: 0,
    bufferByteLength: 0,
  });
}

function chargeForStateFlags(stateFlags, manifest) {
  if (stateFlags === BORG_POSITRINO_STATE_FLAG) {
    return manifest.initialConditions?.positrinoCharge ?? 1;
  }
  if (stateFlags === BORG_ELECTRINO_STATE_FLAG) {
    return manifest.initialConditions?.electrinoCharge ?? -1;
  }
  throw new Error("Borg EOM evolution requires a declared path polarity.");
}

function roundTime(value) {
  return Number(value.toPrecision(15));
}

function requiredFiniteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new TypeError(`Borg EOM ${label} must be finite.`);
  }
  return number;
}

function requiredFiniteVector3(value, label) {
  return Object.freeze({
    x: requiredFiniteNumber(value?.x, `${label} x`),
    y: requiredFiniteNumber(value?.y, `${label} y`),
    z: requiredFiniteNumber(value?.z, `${label} z`),
  });
}

function finiteNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function positiveNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function positiveInteger(value, fallback) {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : fallback;
}

function requiredNumericToken(value, label) {
  const token = String(value);
  if (!Number.isFinite(Number(token))) {
    throw new TypeError(`Borg EOM ${label} must be a finite numeric token.`);
  }
  return token;
}

function requiredNonnegativeInteger(value, label) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < 0) {
    throw new TypeError(`Borg EOM ${label} must be a nonnegative integer.`);
  }
  return number;
}

function requiredPositiveInteger(value, label) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) {
    throw new TypeError(`Borg EOM ${label} must be a positive integer.`);
  }
  return number;
}

function requiredPositiveToken(value, label) {
  const token = requiredNumericToken(value, label);
  if (!(Number(token) > 0)) {
    throw new RangeError(`Borg EOM ${label} must be positive.`);
  }
  return token;
}

function requiredBoolean(value, label) {
  if (typeof value !== "boolean") {
    throw new TypeError(`Borg EOM ${label} must be Boolean.`);
  }
  return value;
}

function assertAtomicPresetValue(actual, expected, label) {
  if (actual == null) return;
  if (typeof expected === "boolean") {
    if (requiredBoolean(actual, label) !== expected) {
      throw new RangeError(
        `Borg ${label} is fixed by the selected certified budget.`,
      );
    }
    return;
  }
  if (Number(actual) !== Number(expected)) {
    throw new RangeError(
      `Borg ${label} is fixed by the selected certified budget.`,
    );
  }
}

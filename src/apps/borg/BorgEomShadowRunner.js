import {
  BORG_CERTIFIED_RUN_GRADE,
  BORG_DISPLAY_RUN_GRADE,
} from "./BorgRunGradeControl.js";

export const BORG_EOM_SHADOW_RUNNER_VERSION = "borg-eom-shadow-runner.v0";
export const BORG_EOM_SHADOW_RUN_SOURCE = "computed-eom-shadow-chunks";
export const BORG_EOM_COMPATIBILITY_HISTORY_PROVENANCE =
  "non-eom-history";
export const BORG_EOM_ACCEPTED_INITIAL_HISTORY_EVOLUTION_CLAIM_LEVEL =
  "eom-evolution-conditioned-on-accepted-initial-history";
export { BORG_DISPLAY_RUN_GRADE, BORG_CERTIFIED_RUN_GRADE };
export const BORG_DISPLAY_CLAIM_LEVEL = "display-only";

const POSITRINO_STATE_FLAG = 1;
const ELECTRINO_STATE_FLAG = 2;
const DEFAULT_MEMORY_BUDGET_BYTES = 64 * 1024 * 1024;

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
  if (!Array.isArray(options.initialFrameRows) || options.initialFrameRows.length === 0) {
    throw new TypeError(
        "Borg EOM shadow runner requires initialFrameRows carrying an accepted continuous seed history.",
    );
  }
  let histories = createBorgContinuousRetainedHistories(
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
  let nextStartTime = config.startTime;
  let targetDuration = config.targetDuration;
  let chunkDuration = config.chunkDuration;
  let controllerStepSize = config.initialStep;
  let chunkIndex = 0;
  let causticWarningCount = 0;
  let firstCausticWarningTime = null;
  let causticWarningPairs = Object.freeze([]);
  const initialHistoryAccepted = histories.every(
    (history) => history.sourceAcceptedInitialDatum === true,
  );
  let disposed = false;

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
          causticWarningCount, firstCausticWarningTime,
          causticWarningPairs,
        );
      }
      const startTime = nextStartTime;
      const endTime = Math.min(
        targetDuration,
        roundTime(startTime + chunkDuration),
      );
      const request = createBorgEomShadowRequest({
        manifest,
        config,
        histories,
        chunkIndex,
        startTime,
        endTime,
        initialStep: controllerStepSize,
        causticWarningCount,
        firstCausticWarningTime,
        causticWarningPairs,
      });
      const rawResponse = await client.evolveRetainedHistories(request);
      const response = normalizeEomResponse(rawResponse, request);
      controllerStepSize = response.controllerStepSize;
      causticWarningCount = response.causticWarningCount;
      firstCausticWarningTime = response.firstCausticWarningTime;
      causticWarningPairs = Object.freeze(response.causticWarningPairs);
      nextStartTime = endTime;
      histories = config.runGrade === BORG_DISPLAY_RUN_GRADE
        ? Object.freeze(response.histories)
        : retainBorgHistoryWindow(response.histories, {
            minimumCoverageStart: roundTime(nextStartTime - config.historyDepth),
          });
      const retainedHistoryStart = Number(histories[0].coverageStart);
      const retainedHistoryEnd = Number(histories[0].coverageEnd);
      const frames = createFramesFromHistories(
        histories,
        startTime,
        endTime,
        config.sampleInterval,
        chunkIndex,
        response.evidenceStatus,
        response.claimGrade,
        initialHistoryAccepted,
      );
      chunkIndex += 1;
      return Object.freeze({
        schema: BORG_EOM_SHADOW_RUNNER_VERSION,
        source: BORG_EOM_SHADOW_RUN_SOURCE,
        statusCode: "ok",
        chunkIndex: chunkIndex - 1,
        requestId: request.requestId,
        runId: request.runId,
        startTime,
        endTime,
        sampleInterval: config.sampleInterval,
        controllerStepSize,
        phase: "live",
        initialHistoryAccepted,
        runGrade: config.runGrade,
        coreScale: response.coreScale,
        retainedHistoryStart,
        retainedHistoryEnd,
        retainedHistoryPolicy: config.runGrade === BORG_DISPLAY_RUN_GRADE
          ? "full-evolved-display-history"
          : "rolling-certified-history-window",
        causticWarningCount,
        firstCausticWarningTime,
        causticWarnings: Object.freeze(response.causticWarnings),
        causticWarningPairs,
        claimGrade: response.claimGrade,
        evolutionClaimLevel: response.runGrade === BORG_DISPLAY_RUN_GRADE
          ? BORG_DISPLAY_CLAIM_LEVEL
          : initialHistoryAccepted
            ? BORG_EOM_ACCEPTED_INITIAL_HISTORY_EVOLUTION_CLAIM_LEVEL
            : "eom-evolution-conditioned-on-unaccepted-history",
        frames: Object.freeze(frames),
        histories,
        evidenceStatus: response.evidenceStatus,
        promotionEligible:
          initialHistoryAccepted &&
          isBorgEomPromotionEligible(response, options.acceptanceGate),
        diagnostics: Object.freeze(response.diagnostics),
        bufferCount: 0,
        bufferByteLength: response.memoryEstimateBytes,
      });
    },
    async dispose() {
      disposed = true;
      if (typeof client.dispose === "function") {
        await client.dispose();
      }
    },
  });
}

export function createBorgEomShadowRunConfig(manifest, options = {}) {
  const runGrade = requiredRunGrade(
    options.runGrade ?? BORG_DISPLAY_RUN_GRADE,
  );
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
  const coreScale = positiveNumber(options.coreScale, 0.2);
  const requestedFarFieldEnclosureFraction = requiredFractionToken(
    options.farFieldEnclosureFraction ?? "0.25",
    "farFieldEnclosureFraction",
  );
  const targetDuration = finiteNumber(
    options.targetDuration,
    roundTime(startTime + chunkDuration),
  );
  if (targetDuration <= startTime) {
    throw new RangeError("Borg EOM target duration must exceed its initial-history cut.");
  }
  const initialStep = requiredPositiveToken(options.initialStep ?? "0.1", "initialStep");
  const minimumStep = requiredPositiveToken(
    options.minimumStep ?? String(sampleInterval / 16),
    "minimumStep",
  );
  const maximumStep = requiredPositiveToken(
    options.maximumStep ?? String(Math.max(Number(initialStep), chunkDuration)),
    "maximumStep",
  );
  if (Number(minimumStep) > Number(initialStep) ||
      Number(initialStep) > Number(maximumStep)) {
    throw new RangeError(
      "Borg EOM steps must satisfy minimumStep <= initialStep <= maximumStep.",
    );
  }
  return Object.freeze({
    schema: BORG_EOM_SHADOW_RUNNER_VERSION,
    runSource: BORG_EOM_SHADOW_RUN_SOURCE,
    startTime,
    targetDuration,
    chunkDuration,
    pathCount,
    sampleInterval,
    fieldSpeed,
    simulationOuterRadius: outerRadius,
    historyStartTime: roundTime(startTime - historyDepth),
    historyDepth,
    coreScale,
    geometricDelayBound,
    historySafetyMargin,
    coupling: requiredNumericToken(
      options.coupling ?? manifest.modelControls?.coupling ?? "1",
      "coupling",
    ),
    initialStep,
    minimumStep,
    maximumStep,
    useAdaptiveStepGrowth: requiredBoolean(
      options.useAdaptiveStepGrowth ?? true,
      "useAdaptiveStepGrowth",
    ),
    rootTolerance: requiredPositiveToken(options.rootTolerance ?? "1e-12", "rootTolerance"),
    accelerationTolerance: requiredPositiveToken(
      options.accelerationTolerance ?? "1e-8",
      "accelerationTolerance",
    ),
    // Display evaluates every ordered pair. Keep the protocol field for the
    // certified route, whose behavior and token remain unchanged.
    farFieldEnclosureFraction: runGrade === BORG_DISPLAY_RUN_GRADE
      ? "0"
      : requestedFarFieldEnclosureFraction,
    runGrade,
    positionTolerance: requiredPositiveToken(
      options.positionTolerance ?? "1e-10",
      "positionTolerance",
    ),
    velocityTolerance: requiredPositiveToken(
      options.velocityTolerance ?? "1e-10",
      "velocityTolerance",
    ),
    correctionTolerance: requiredPositiveToken(
      options.correctionTolerance ?? "1e-8",
      "correctionTolerance",
    ),
    threadCount: positiveInteger(options.threadCount, 1),
    memoryBudgetBytes: positiveInteger(options.memoryBudgetBytes, DEFAULT_MEMORY_BUDGET_BYTES),
    modelBindingId: options.modelBindingId ?? "master_eom_binding/v0",
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
    throw new TypeError("Borg EOM migration requires retained path-history rows.");
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
  initialStep = config.initialStep,
  causticWarningCount = 0,
  firstCausticWarningTime = null,
  causticWarningPairs = [],
}) {
  if (!Array.isArray(histories) || histories.length === 0) {
    throw new TypeError("Borg EOM request requires continuous retained histories.");
  }
  histories.forEach((history) => {
    if (Number(history.coverageEnd) !== Number(startTime)) {
      throw new Error("Borg EOM histories must end at the requested evolution start.");
    }
  });
  return Object.freeze({
    schema: "eom_borg_shadow_request/v0",
    contractId: "eom_evolution_contract/v0",
    contractAmendmentIds: Object.freeze(["eom_evolution_contract/v0/amendment-1"]),
    requestId: `borg-eom-shadow-request:chunk-${chunkIndex}`,
    runId: `borg-eom-shadow-run:chunk-${chunkIndex}`,
    claimLevel: "migration-shadow",
    modelBindingId: config.modelBindingId,
    absoluteTimeInterval: Object.freeze({ start: String(startTime), end: String(endTime) }),
    histories,
    numericalControls: Object.freeze({
      integrationMode: "adaptive-coupled",
      initialStep,
      minimumStep: config.minimumStep,
      maximumStep: config.maximumStep,
      useAdaptiveStepGrowth: config.useAdaptiveStepGrowth,
      runGrade: config.runGrade,
      rootTolerance: config.rootTolerance,
      accelerationTolerance: config.accelerationTolerance,
      farFieldEnclosureFraction: config.farFieldEnclosureFraction,
      positionTolerance: config.positionTolerance,
      velocityTolerance: config.velocityTolerance,
      correctionTolerance: config.correctionTolerance,
      deterministicReduction: true,
      threadCount: config.threadCount,
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
      runGrade: config.runGrade,
      causticWarningCount,
      firstCausticWarningTime,
      causticWarningPairs: Object.freeze(causticWarningPairs.map((pair) =>
        Object.freeze([...pair]))),
    }),
  });
}

export function trimBorgRetainedHistories(histories, { coverageStart } = {}) {
  const lowerBound = requiredFiniteNumber(coverageStart, "retained-history coverage start");
  return Object.freeze(histories.map((history) => {
    const segments = history.segments.filter(
      (segment) => Number(segment.endTime) > lowerBound + 1e-9,
    );
    const exactLowerBound = Number(segments[0]?.startTime);
    if (
      segments.length === 0 ||
      Math.abs(exactLowerBound - lowerBound) > 1e-9
    ) {
      throw new Error(
        `Borg EOM retained-history window does not align with an exact segment boundary at ${lowerBound}.`,
      );
    }
    return Object.freeze({
      ...history,
      coverageStart: String(exactLowerBound),
      segments: Object.freeze(segments),
    });
  }));
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
      response?.runGrade === BORG_CERTIFIED_RUN_GRADE &&
      response?.causticWarningCount === 0 &&
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
    positionError: String(Math.max(Number(start.errorBound) || 0, Number(end.errorBound) || 0)),
    velocityError: String(Math.max(Number(start.errorBound) || 0, Number(end.errorBound) || 0)),
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
  if (!response || response.status !== "completed") {
    const failure = response?.haltCode ?? response?.failureCode ?? "eom_shadow_run_failed";
    const error = new Error(`Borg EOM shadow run failed closed: ${failure}.`);
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
        Number(history.coverageEnd) !== Number(request.absoluteTimeInterval.end) ||
        !Array.isArray(history.segments) || history.segments.length === 0) {
      throw new Error("Borg EOM shadow response has incomplete or reordered histories.");
    }
  });
  const runGrade = requiredRunGrade(response.runGrade);
  const coreScale = Number(requiredPositiveToken(
    response.coreScale ?? request.modelControls.coreScale,
    "response coreScale",
  ));
  const causticWarningCount = requiredNonnegativeInteger(
    response.causticWarningCount,
    "response causticWarningCount",
  );
  const firstCausticWarningTime = response.firstCausticWarningTime == null
    ? null
    : String(response.firstCausticWarningTime);
  const priorWarningCount = request.provenance.causticWarningCount;
  const causticWarningPairs = requiredWarningPairs(response.causticWarningPairs);
  const claimGrade = String(response.claimGrade ?? response.evidenceStatus ?? "failed");
  const memoryBudgetBytes = requiredPositiveInteger(
    response.memoryBudgetBytes ?? request.resourceEnvelope.memoryBudgetBytes,
    "response memoryBudgetBytes",
  );
  const memoryEstimateBytes = requiredNonnegativeInteger(
    response.memoryEstimateBytes ?? 0,
    "response memoryEstimateBytes",
  );
  if (runGrade !== request.numericalControls.runGrade ||
      coreScale !== Number(request.modelControls.coreScale) ||
      memoryBudgetBytes !== Number(request.resourceEnvelope.memoryBudgetBytes) ||
      memoryEstimateBytes > memoryBudgetBytes ||
      causticWarningCount < priorWarningCount ||
      (causticWarningCount === 0) !== (causticWarningPairs.length === 0) ||
      (causticWarningCount === 0) !== (firstCausticWarningTime == null) ||
      (runGrade === BORG_DISPLAY_RUN_GRADE &&
       (claimGrade !== BORG_DISPLAY_CLAIM_LEVEL ||
        response.evidenceStatus !== "display-only")) ||
      (runGrade === BORG_CERTIFIED_RUN_GRADE &&
       causticWarningCount > 0)) {
    throw new Error("Borg EOM shadow response has inconsistent run-grade provenance.");
  }
  return Object.freeze({
    status: response.status,
    evidenceStatus: response.evidenceStatus ?? "failed",
    runGrade,
    coreScale,
    memoryBudgetBytes,
    memoryEstimateBytes,
    claimGrade,
    causticWarningCount,
    firstCausticWarningTime,
    causticWarningPairs,
    causticWarnings: Array.isArray(response.causticWarnings)
      ? response.causticWarnings
      : [],
    controllerStepSize: String(Number(requiredPositiveToken(
      response.controllerStepSize ?? request.numericalControls.initialStep,
      "response controllerStepSize",
    ))),
    histories: Object.freeze(histories),
    diagnostics: Array.isArray(response.diagnostics) ? response.diagnostics : [],
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
) {
  const frames = [];
  const sampleCount = Math.round((endTime - startTime) / sampleInterval);
  for (let sampleIndex = 0; sampleIndex <= sampleCount; sampleIndex += 1) {
    const time = sampleIndex === sampleCount
      ? endTime
      : roundTime(startTime + sampleIndex * sampleInterval);
    histories.forEach((history) => {
      const state = evaluateHistory(history, time);
      frames.push(Object.freeze({
        pathKey: Number(history.pathKey ?? history.pathId),
        frameIndex: Math.round(time / sampleInterval),
        time,
        position: Object.freeze(state.position),
        velocity: Object.freeze(state.velocity),
        errorBound: state.errorBound,
        stateFlags: history.stateFlags ?? 0,
        dynamicChunkIndex: chunkIndex,
        runSource: BORG_EOM_SHADOW_RUN_SOURCE,
        valueAuthority: claimGrade === BORG_DISPLAY_CLAIM_LEVEL
          ? BORG_DISPLAY_CLAIM_LEVEL
          : initialHistoryAccepted
          ? evidenceStatus === "canonical"
            ? "canonical-eom-output-conditioned-on-accepted-initial-history"
            : "eom-shadow-output-conditioned-on-accepted-initial-history"
          : evidenceStatus === "canonical"
            ? "canonical-eom-output"
            : "eom-shadow-output",
      }));
    });
  }
  return frames;
}

function evaluateHistory(history, time) {
  const segment = history.segments.find(
    (candidate, index) =>
      Number(candidate.startTime) <= time &&
      (time < Number(candidate.endTime) || index + 1 === history.segments.length),
  );
  if (!segment) {
    throw new Error(`EOM history ${history.pathId} does not cover output time ${time}.`);
  }
  const localTime = time - Number(segment.startTime);
  const position = {};
  const velocity = {};
  ["x", "y", "z"].forEach((axis, axisIndex) => {
    const coefficients = segment.coefficients[axisIndex].map(Number);
    position[axis] =
      coefficients[0] + localTime * (coefficients[1] + localTime * (coefficients[2] + localTime * coefficients[3]));
    velocity[axis] =
      coefficients[1] + localTime * (2 * coefficients[2] + localTime * 3 * coefficients[3]);
  });
  return {
    position,
    velocity,
    errorBound: Math.max(Number(segment.positionError) || 0, Number(segment.velocityError) || 0),
  };
}

function createCompleteChunk(
  config,
  chunkIndex,
  time,
  causticWarningCount,
  firstCausticWarningTime,
  causticWarningPairs = [],
) {
  return Object.freeze({
    schema: BORG_EOM_SHADOW_RUNNER_VERSION,
    source: BORG_EOM_SHADOW_RUN_SOURCE,
    statusCode: "complete",
    chunkIndex,
    startTime: time,
    endTime: time,
    sampleInterval: config.sampleInterval,
    phase: "live",
    initialHistoryAccepted: false,
    runGrade: config.runGrade,
    coreScale: config.coreScale,
    causticWarningCount,
    firstCausticWarningTime,
    causticWarningPairs: Object.freeze(causticWarningPairs),
    causticWarnings: Object.freeze([]),
    claimGrade: config.runGrade === BORG_DISPLAY_RUN_GRADE
      ? BORG_DISPLAY_CLAIM_LEVEL
      : "not-applicable",
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
  if (stateFlags === POSITRINO_STATE_FLAG) {
    return manifest.initialConditions?.positrinoCharge ?? 1;
  }
  if (stateFlags === ELECTRINO_STATE_FLAG) {
    return manifest.initialConditions?.electrinoCharge ?? -1;
  }
  throw new Error("Borg EOM migration requires a declared path polarity.");
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

function requiredRunGrade(value) {
  if (value !== BORG_DISPLAY_RUN_GRADE && value !== BORG_CERTIFIED_RUN_GRADE) {
    throw new TypeError("Borg EOM runGrade must be display or certified.");
  }
  return value;
}

function requiredWarningPairs(value) {
  if (!Array.isArray(value) || value.some((pair) =>
    !Array.isArray(pair) || pair.length !== 2 ||
    pair.some((pathId) => typeof pathId !== "string" || pathId.length === 0))) {
    throw new TypeError("Borg EOM causticWarningPairs must contain path-id pairs.");
  }
  return value.map((pair) => Object.freeze([...pair]));
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

function requiredFractionToken(value, label) {
  const token = requiredNumericToken(value, label);
  if (!(Number(token) >= 0 && Number(token) < 1)) {
    throw new RangeError(`Borg EOM ${label} must lie in [0, 1).`);
  }
  return token;
}

function requiredBoolean(value, label) {
  if (typeof value !== "boolean") {
    throw new TypeError(`Borg EOM ${label} must be Boolean.`);
  }
  return value;
}

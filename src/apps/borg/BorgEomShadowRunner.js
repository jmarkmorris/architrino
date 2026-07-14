export const BORG_EOM_SHADOW_RUNNER_VERSION = "borg-eom-shadow-runner.v0";
export const BORG_EOM_SHADOW_RUN_SOURCE = "computed-eom-shadow-chunks";
export const BORG_EOM_COMPATIBILITY_HISTORY_PROVENANCE =
  "central-solver-compatibility-history-non-eom";

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
  let histories = createBorgContinuousRetainedHistories(
    options.initialFrameRows ?? manifest.currentStateFrames,
    manifest,
    {
      historyStartTime: config.historyStartTime,
      historyEndTime: config.startTime,
    },
  );
  let nextStartTime = config.startTime;
  let targetDuration = config.targetDuration;
  let chunkDuration = config.chunkDuration;
  let chunkIndex = 0;
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
      const requestedTarget = Number(nextLimits.targetDuration);
      if (Number.isFinite(requestedTarget) && requestedTarget > config.startTime) {
        targetDuration = Math.max(nextStartTime, requestedTarget);
      }
      const requestedChunk = Number(nextLimits.chunkDuration);
      if (Number.isFinite(requestedChunk) && requestedChunk > 0) {
        chunkDuration = Math.max(config.sampleInterval, requestedChunk);
      }
    },
    async computeNextChunk() {
      if (disposed) {
        throw new Error("Borg EOM shadow runner has been disposed.");
      }
      if (nextStartTime >= targetDuration) {
        return createCompleteChunk(config, chunkIndex, nextStartTime);
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
      });
      const rawResponse = await client.evolveRetainedHistories(request);
      const response = normalizeEomResponse(rawResponse, request);
      histories = response.histories;
      const frames = createFramesFromHistories(
        histories,
        startTime,
        endTime,
        config.sampleInterval,
        chunkIndex,
        response.evidenceStatus,
      );
      nextStartTime = endTime;
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
        frames: Object.freeze(frames),
        histories,
        evidenceStatus: response.evidenceStatus,
        promotionEligible: isBorgEomPromotionEligible(response, options.acceptanceGate),
        diagnostics: Object.freeze(response.diagnostics),
        bufferCount: 0,
        bufferByteLength: 0,
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
  const sampleInterval = positiveNumber(
    options.sampleInterval,
    manifest.simulationEnvelope?.sampleInterval ?? 0.2,
  );
  const startTime = finiteNumber(
    options.startTime,
    Math.max(...(manifest.currentStateFrames ?? []).map((row) => Number(row.time))),
  );
  const chunkDuration = positiveNumber(options.chunkDuration, sampleInterval);
  const targetDuration = finiteNumber(
    options.targetDuration,
    roundTime(startTime + chunkDuration),
  );
  if (targetDuration <= startTime) {
    throw new RangeError("Borg EOM shadow target duration must exceed its history cut time.");
  }
  const sideLength = positiveNumber(manifest.simulationEnvelope?.sideLength, 100);
  const fieldSpeed = positiveNumber(
    options.fieldSpeed,
    manifest.simulationEnvelope?.fieldSpeed ?? 3,
  );
  const geometricDelayBound = (Math.sqrt(3) * sideLength) / fieldSpeed;
  const historySafetyMargin = positiveNumber(
    options.historySafetyMargin,
    Math.max(sampleInterval * 2, geometricDelayBound * 0.05),
  );
  const historyDepth = positiveNumber(
    options.historyDepth,
    geometricDelayBound + historySafetyMargin,
  );
  return Object.freeze({
    schema: BORG_EOM_SHADOW_RUNNER_VERSION,
    runSource: BORG_EOM_SHADOW_RUN_SOURCE,
    startTime,
    targetDuration,
    chunkDuration,
    sampleInterval,
    fieldSpeed,
    historyStartTime: roundTime(Math.max(
      Math.min(...(manifest.currentStateFrames ?? []).map((row) => Number(row.time))),
      startTime - historyDepth,
    )),
    historyDepth,
    geometricDelayBound,
    historySafetyMargin,
    coupling: requiredNumericToken(options.coupling ?? "1", "coupling"),
    initialStep: requiredPositiveToken(options.initialStep ?? String(sampleInterval), "initialStep"),
    minimumStep: requiredPositiveToken(
      options.minimumStep ?? String(sampleInterval / 16),
      "minimumStep",
    ),
    rootTolerance: requiredPositiveToken(options.rootTolerance ?? "1e-12", "rootTolerance"),
    accelerationTolerance: requiredPositiveToken(
      options.accelerationTolerance ?? "1e-8",
      "accelerationTolerance",
    ),
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
  { historyStartTime, historyEndTime } = {},
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
  const expectedPathCount = manifest.population?.architrinoCount;
  if (Number.isInteger(expectedPathCount) && grouped.size !== expectedPathCount) {
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
      const segments = [];
      for (let index = 0; index + 1 < uniqueRows.length; index += 1) {
        segments.push(createHermiteHistorySegment(uniqueRows[index], uniqueRows[index + 1]));
      }
      return Object.freeze({
        pathId: String(pathKey),
        pathKey,
        charge: String(chargeForStateFlags(uniqueRows[0].stateFlags, manifest)),
        stateFlags: uniqueRows[0].stateFlags ?? 0,
        coverageStart: String(uniqueRows[0].time),
        coverageEnd: String(cutTime),
        interpolation: "piecewise-cubic-hermite/v0",
        sourceProvenance: BORG_EOM_COMPATIBILITY_HISTORY_PROVENANCE,
        sourceClaimLevel: "conditional-non-eom-history",
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
}) {
  if (!Array.isArray(histories) || histories.length === 0) {
    throw new TypeError("Borg EOM request requires continuous retained histories.");
  }
  histories.forEach((history) => {
    if (Number(history.coverageEnd) !== startTime) {
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
      initialStep: config.initialStep,
      minimumStep: config.minimumStep,
      rootTolerance: config.rootTolerance,
      accelerationTolerance: config.accelerationTolerance,
      positionTolerance: config.positionTolerance,
      velocityTolerance: config.velocityTolerance,
      correctionTolerance: config.correctionTolerance,
      deterministicReduction: true,
      threadCount: config.threadCount,
    }),
    modelControls: Object.freeze({
      fieldSpeed: String(config.fieldSpeed),
      coupling: config.coupling,
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
      importedHistoryAuthority: BORG_EOM_COMPATIBILITY_HISTORY_PROVENANCE,
      importedHistoryIsEomEvidence: false,
      retainedHistoryStart: histories[0].coverageStart,
      retainedHistoryEnd: histories[0].coverageEnd,
      geometricDelayBound: config.geometricDelayBound,
      historySafetyMargin: config.historySafetyMargin,
    }),
  });
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
  const coefficients = ["x", "y", "z"].map((axis) => {
    const x0 = requiredFiniteNumber(start.position?.[axis], `${axis} start position`);
    const x1 = requiredFiniteNumber(end.position?.[axis], `${axis} end position`);
    const v0 = requiredFiniteNumber(start.velocity?.[axis], `${axis} start velocity`);
    const v1 = requiredFiniteNumber(end.velocity?.[axis], `${axis} end velocity`);
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

function normalizeEomResponse(rawResponse, request) {
  const response = rawResponse?.response ?? rawResponse;
  if (!response || response.status !== "completed") {
    const failure = response?.haltCode ?? response?.failureCode ?? "eom_shadow_run_failed";
    throw new Error(`Borg EOM shadow run failed closed: ${failure}.`);
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
  return Object.freeze({
    status: response.status,
    evidenceStatus: response.evidenceStatus ?? "failed",
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
        valueAuthority: evidenceStatus === "canonical"
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

function createCompleteChunk(config, chunkIndex, time) {
  return Object.freeze({
    schema: BORG_EOM_SHADOW_RUNNER_VERSION,
    source: BORG_EOM_SHADOW_RUN_SOURCE,
    statusCode: "complete",
    chunkIndex,
    startTime: time,
    endTime: time,
    sampleInterval: config.sampleInterval,
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

function requiredPositiveToken(value, label) {
  const token = requiredNumericToken(value, label);
  if (!(Number(token) > 0)) {
    throw new RangeError(`Borg EOM ${label} must be positive.`);
  }
  return token;
}

// Shared EOM history-dataset display adapter.
//
// Ingests `eom_evolution_contract/v0` retained-history records (the format the
// EOM solver emits and the Borg shadow client consumes) and exposes the
// frame/trail interface that viewer apps draw from.
//
// Viewer-not-instrument rule: this module computes no physics. Evaluating a
// record's own piecewise-cubic segments at a requested time is declared
// arithmetic over recorded data — the same rule the assembly-view-record.v0
// sketch sanctions for derived display quantities. There is no integrator,
// no interaction law, and no causal-root solving here, and none may be added.
//
// It also ingests `assembly-view-record.v0`, the braid-program viewer record
// schema (finalized in reference/priorities/braid-program/campaigns/
// instrument-gate.md): `provenance` (engine, run id, claim grade), `window`,
// `worldlines[]` (id, polarity, retained segments; optional display samples),
// `events[]`. Retained segments are the authoritative state in both schemas;
// sampled rows are display convenience only and are never evaluated.

export const EOM_EVOLUTION_CONTRACT_ID = "eom_evolution_contract/v0";
export const ASSEMBLY_VIEW_RECORD_SCHEMA = "assembly-view-record.v0";
export const EOM_HISTORY_DATASET_SCHEMA = "eom-history-dataset.v0";
export const EOM_HISTORY_DEFAULT_ENGINE_ID = "eom-solver";
export const ASSEMBLY_VIEW_CLAIM_GRADES = Object.freeze(["chart-hypothesis", "evolved-record"]);

const AXES = Object.freeze(["x", "y", "z"]);
const CUBIC_COEFFICIENT_COUNT = 4;

export function createEomHistoryDataset(record, options = {}) {
  if (!record || typeof record !== "object") {
    throw new TypeError(
      "EOM history dataset requires an eom_evolution_contract/v0 or assembly-view-record.v0 record.",
    );
  }
  const isAssemblyViewRecord = record.schema === ASSEMBLY_VIEW_RECORD_SCHEMA;
  if (!isAssemblyViewRecord && record.contractId !== EOM_EVOLUTION_CONTRACT_ID) {
    throw new TypeError(
      `EOM history dataset requires contractId ${EOM_EVOLUTION_CONTRACT_ID} or schema ${ASSEMBLY_VIEW_RECORD_SCHEMA}; received ${String(record.contractId ?? record.schema ?? "none")}.`,
    );
  }
  if (isAssemblyViewRecord) {
    rejectNonfiniteNumbers(record, "record");
  }
  const provenance = normalizeProvenance(record, options, { isAssemblyViewRecord });
  const worldlines = normalizeWorldlines(
    record.histories ?? record.worldlines,
    { isAssemblyViewRecord },
  );
  const window = normalizeWindow(record, worldlines, { isAssemblyViewRecord });
  if (isAssemblyViewRecord) {
    validateAssemblyViewMetadata(record);
  }
  const duplicateWorldlineId = firstDuplicate(worldlines.map((worldline) => worldline.id));
  if (isAssemblyViewRecord && duplicateWorldlineId != null) {
    throw new TypeError(
      `assembly-view-record.v0 worldline id ${duplicateWorldlineId} is duplicated; source ids must remain stable and unique.`,
    );
  }
  const worldlinesById = new Map(worldlines.map((worldline) => [worldline.id, worldline]));

  function requireWorldline(worldlineId) {
    const worldline = worldlinesById.get(String(worldlineId));
    if (!worldline) {
      throw new RangeError(`EOM history dataset has no worldline ${String(worldlineId)}.`);
    }
    return worldline;
  }

  function evaluateWorldline(worldlineId, time) {
    const worldline = requireWorldline(worldlineId);
    return evaluateWorldlineSegments(worldline, Number(time));
  }

  function createFrameSamples({
    start = window.start,
    end = window.end,
    sampleInterval = window.sampleInterval,
    frameCount,
    worldlineIds,
  } = {}) {
    const startTime = requiredFiniteNumber(start, "frame sample start");
    const endTime = requiredFiniteNumber(end, "frame sample end");
    if (!(endTime >= startTime)) {
      throw new RangeError("EOM frame sampling requires end >= start.");
    }
    const selected = (worldlineIds ?? worldlines.map((worldline) => worldline.id)).map(
      (worldlineId) => requireWorldline(worldlineId),
    );
    const sampleCount = resolveSampleCount({ startTime, endTime, sampleInterval, frameCount });
    const frames = [];
    for (let index = 0; index < sampleCount; index += 1) {
      const time = sampleCount === 1
        ? startTime
        : startTime + ((endTime - startTime) * index) / (sampleCount - 1);
      frames.push(Object.freeze({
        frameIndex: index,
        time,
        states: Object.freeze(selected.map((worldline) => Object.freeze({
          worldlineId: worldline.id,
          pathKey: worldline.pathKey,
          polarity: worldline.polarity,
          ...evaluateWorldlineSegments(worldline, time),
        }))),
      }));
    }
    return Object.freeze(frames);
  }

  function createTrailSamples({ worldlineId, time = window.end, depth, sampleCount = 16 } = {}) {
    const worldline = requireWorldline(worldlineId);
    const endTime = requiredFiniteNumber(time, "trail end time");
    const trailDepth = requiredFiniteNumber(depth ?? window.end - window.start, "trail depth");
    const count = Math.max(2, Math.floor(Number(sampleCount) || 0));
    const startTime = Math.max(worldline.coverage.start, endTime - Math.max(0, trailDepth));
    const samples = [];
    for (let index = 0; index < count; index += 1) {
      const sampleTime = startTime + ((endTime - startTime) * index) / (count - 1);
      samples.push(Object.freeze({
        time: sampleTime,
        ...evaluateWorldlineSegments(worldline, sampleTime),
      }));
    }
    return Object.freeze(samples);
  }

  return Object.freeze({
    schema: EOM_HISTORY_DATASET_SCHEMA,
    contractId: EOM_EVOLUTION_CONTRACT_ID,
    sourceSchema: isAssemblyViewRecord ? ASSEMBLY_VIEW_RECORD_SCHEMA : EOM_EVOLUTION_CONTRACT_ID,
    provenance,
    window,
    worldlines,
    rawRecord: record,
    events: Object.freeze(Array.isArray(record.events) ? [...record.events] : []),
    binaries: Object.freeze(Array.isArray(record.binaries) ? [...record.binaries] : []),
    ansatz: Object.freeze(Array.isArray(record.ansatz) ? [...record.ansatz] : []),
    navigation: Object.freeze(
      record.navigation && typeof record.navigation === "object"
        ? { ...record.navigation }
        : {},
    ),
    evaluateWorldline,
    createFrameSamples,
    createTrailSamples,
  });
}

function normalizeProvenance(record, options, { isAssemblyViewRecord = false } = {}) {
  const claimGrade =
    record.provenance?.claimGrade ??
    record.claimGrade ?? record.claimLevel ?? options.claimGrade ?? options.claimLevel;
  if (typeof claimGrade !== "string" || claimGrade.length === 0) {
    throw new TypeError(
      "EOM history dataset requires a claim grade (record.claimGrade/claimLevel); displayed datasets must carry provenance.",
    );
  }
  if (isAssemblyViewRecord && !ASSEMBLY_VIEW_CLAIM_GRADES.includes(claimGrade)) {
    throw new TypeError(
      `assembly-view-record.v0 claim grade must be one of ${ASSEMBLY_VIEW_CLAIM_GRADES.join("|")}; received ${claimGrade}.`,
    );
  }
  const runId = record.provenance?.runId ?? record.runId ?? options.runId;
  if (typeof runId !== "string" || runId.length === 0) {
    throw new TypeError("EOM history dataset requires a runId; displayed datasets must carry provenance.");
  }
  const engineId = record.provenance?.engineId ?? options.engineId ?? EOM_HISTORY_DEFAULT_ENGINE_ID;
  const engineVersion = record.provenance?.engineVersion ?? null;
  const evidenceStatus = record.provenance?.evidenceStatus ?? record.evidenceStatus ?? null;
  const generatingSpec = record.provenance?.generatingSpec ?? null;
  const date = record.provenance?.date ?? null;
  if (isAssemblyViewRecord) {
    requireConcreteString(claimGrade, "provenance.claimGrade");
    requireConcreteString(runId, "provenance.runId");
    requireConcreteString(engineId, "provenance.engineId");
    if (engineId !== EOM_HISTORY_DEFAULT_ENGINE_ID) {
      throw new TypeError(
        `assembly-view-record.v0 provenance.engineId must be ${EOM_HISTORY_DEFAULT_ENGINE_ID}; received ${engineId}.`,
      );
    }
    requireConcreteString(engineVersion, "provenance.engineVersion");
    requireConcreteString(evidenceStatus, "provenance.evidenceStatus");
    requireConcreteString(generatingSpec, "provenance.generatingSpec");
    requireConcreteString(date, "provenance.date");
  }
  return Object.freeze({
    engineId,
    engineVersion,
    runId,
    requestId: record.requestId ?? null,
    contractId: EOM_EVOLUTION_CONTRACT_ID,
    claimGrade,
    evidenceStatus,
    generatingSpec,
    date,
    conversion: record.provenance?.conversion ?? null,
    sourceProvenance: record.provenance?.importedHistoryAuthority ?? null,
  });
}

function normalizeWindow(record, worldlines, { isAssemblyViewRecord = false } = {}) {
  const coverageStart = Math.max(...worldlines.map((worldline) => worldline.coverage.start));
  const coverageEnd = Math.min(...worldlines.map((worldline) => worldline.coverage.end));
  const start = isAssemblyViewRecord
    ? requiredFiniteNumber(record.window?.start, "window.start")
    : finiteNumber(record.window?.start ?? record.absoluteTimeInterval?.start, coverageStart);
  const end = isAssemblyViewRecord
    ? requiredFiniteNumber(record.window?.end, "window.end")
    : finiteNumber(record.window?.end ?? record.absoluteTimeInterval?.end, coverageEnd);
  if (!(end > start) && !(end === start)) {
    throw new RangeError("EOM history dataset window is empty or inverted.");
  }
  if (start < coverageStart || end > coverageEnd) {
    throw new RangeError(
      `EOM history dataset window [${start}, ${end}] exceeds common recorded coverage [${coverageStart}, ${coverageEnd}].`,
    );
  }
  const sampleInterval = isAssemblyViewRecord
    ? requiredPositiveNumber(record.window?.sampleInterval, "window.sampleInterval")
    : finiteNumber(record.window?.sampleInterval ?? record.sampleInterval, null);
  const delayHorizon = isAssemblyViewRecord
    ? requiredNonnegativeNumber(record.window?.delayHorizon, "window.delayHorizon")
    : finiteNumber(record.window?.delayHorizon, null);
  return Object.freeze({
    start,
    end,
    coverageStart,
    coverageEnd,
    sampleInterval,
    delayHorizon,
  });
}

function normalizeWorldlines(histories, { isAssemblyViewRecord = false } = {}) {
  if (!Array.isArray(histories) || histories.length === 0) {
    throw new TypeError("EOM history dataset requires a nonempty histories/worldlines array.");
  }
  return Object.freeze(histories.map((history, sourceIndex) =>
    normalizeWorldline(history, { isAssemblyViewRecord, sourceIndex }),
  ));
}

function normalizeWorldline(history, { isAssemblyViewRecord = false, sourceIndex = 0 } = {}) {
  if (!history || typeof history !== "object") {
    throw new TypeError("EOM history dataset worldline must be an object.");
  }
  const id = String(history.pathId ?? history.id ?? "");
  if (id.length === 0) {
    throw new TypeError("EOM history dataset worldline requires a pathId/id.");
  }
  const charge = requiredFiniteNumber(
    history.charge ?? history.polarity,
    `worldline ${id} charge/polarity`,
  );
  if (!Array.isArray(history.segments) || history.segments.length === 0) {
    throw new TypeError(
      isAssemblyViewRecord
        ? `assembly-view-record worldline ${id} lacks retained segments; the state of a delay ` +
          "system is its history, so sampled-only worldlines cannot be animated as state."
        : `EOM worldline ${id} lacks retained segments.`,
    );
  }
  const segments = history.segments.map((segment, index) =>
    normalizeSegment(segment, id, index, { isAssemblyViewRecord }),
  );
  for (let index = 0; index + 1 < segments.length; index += 1) {
    if (segments[index].endTime !== segments[index + 1].startTime) {
      throw new RangeError(
        `EOM worldline ${id} segments are not contiguous at index ${index + 1}.`,
      );
    }
  }
  const coverage = Object.freeze({
    start: isAssemblyViewRecord
      ? requiredFiniteNumber(history.coverageStart, `worldline ${id} coverageStart`)
      : finiteNumber(history.coverageStart, segments[0].startTime),
    end: isAssemblyViewRecord
      ? requiredFiniteNumber(history.coverageEnd, `worldline ${id} coverageEnd`)
      : finiteNumber(history.coverageEnd, segments.at(-1).endTime),
  });
  if (coverage.start !== segments[0].startTime || coverage.end !== segments.at(-1).endTime) {
    throw new RangeError(
      `EOM worldline ${id} declared coverage [${coverage.start}, ${coverage.end}] does not match retained segments [${segments[0].startTime}, ${segments.at(-1).endTime}].`,
    );
  }
  const interpolation = history.interpolation;
  if (isAssemblyViewRecord) {
    requireConcreteString(interpolation, `worldline ${id} interpolation`);
  }
  validateOptionalSamples(history.samples, id);
  return Object.freeze({
    id,
    sourceIndex,
    pathKey: history.pathKey ?? id,
    polarity: Math.sign(charge),
    charge,
    stateFlags: Number(history.stateFlags) || 0,
    coverage,
    interpolation: interpolation ?? "piecewise-cubic-hermite/v0",
    sourceProvenance: history.sourceProvenance ?? null,
    sourceClaimLevel: history.sourceClaimLevel ?? null,
    segments: Object.freeze(segments),
    declaredPrehistorySegmentCount: finiteIntegerOrNull(history.declaredPrehistorySegmentCount),
    evolvedSegmentCount: finiteIntegerOrNull(history.evolvedSegmentCount),
    historyFingerprint: history.historyFingerprint ?? null,
    rawWorldline: history,
    // Optional display-only sampled rows (assembly-view-record.v0 sidecar);
    // never evaluated as state.
    samples: Object.freeze(Array.isArray(history.samples) ? [...history.samples] : []),
  });
}

function normalizeSegment(segment, worldlineId, index, { isAssemblyViewRecord = false } = {}) {
  const startTime = requiredFiniteNumber(
    segment?.startTime,
    `worldline ${worldlineId} segment ${index} startTime`,
  );
  const endTime = requiredFiniteNumber(
    segment?.endTime,
    `worldline ${worldlineId} segment ${index} endTime`,
  );
  if (!(endTime > startTime)) {
    throw new RangeError(`EOM worldline ${worldlineId} segment ${index} has a non-increasing time span.`);
  }
  if (!Array.isArray(segment.coefficients) || segment.coefficients.length !== AXES.length) {
    throw new TypeError(
      `EOM worldline ${worldlineId} segment ${index} requires ${AXES.length} per-axis coefficient rows.`,
    );
  }
  const coefficients = segment.coefficients.map((axisCoefficients, axisIndex) => {
    if (!Array.isArray(axisCoefficients) || axisCoefficients.length !== CUBIC_COEFFICIENT_COUNT) {
      throw new TypeError(
        `EOM worldline ${worldlineId} segment ${index} axis ${AXES[axisIndex]} requires ${CUBIC_COEFFICIENT_COUNT} cubic coefficients.`,
      );
    }
    return Object.freeze(axisCoefficients.map((value, coefficientIndex) =>
      requiredFiniteNumber(
        value,
        `worldline ${worldlineId} segment ${index} axis ${AXES[axisIndex]} coefficient ${coefficientIndex}`,
      ),
    ));
  });
  const positionError = isAssemblyViewRecord
    ? requiredNonnegativeNumber(segment.positionError, `worldline ${worldlineId} segment ${index} positionError`)
    : optionalErrorBound(segment.positionError ?? segment.positionErrors);
  const velocityError = isAssemblyViewRecord
    ? requiredNonnegativeNumber(segment.velocityError, `worldline ${worldlineId} segment ${index} velocityError`)
    : optionalErrorBound(segment.velocityError ?? segment.velocityErrors);
  return Object.freeze({
    startTime,
    endTime,
    coefficients: Object.freeze(coefficients),
    positionError,
    velocityError,
  });
}

function validateAssemblyViewMetadata(record) {
  if (!record.provenance || typeof record.provenance !== "object") {
    throw new TypeError("assembly-view-record.v0 requires provenance.");
  }
  if (!record.window || typeof record.window !== "object") {
    throw new TypeError("assembly-view-record.v0 requires window.");
  }
  for (const field of ["binaries", "ansatz", "events"]) {
    if (record[field] != null && !Array.isArray(record[field])) {
      throw new TypeError(`assembly-view-record.v0 ${field} must be an array when present.`);
    }
    rejectNonfiniteNumbers(record[field], field);
  }
  (record.binaries ?? []).forEach((binary, index) => {
    for (const field of ["frequency", "planarOffset", "separation", "phase"]) {
      if (binary?.[field] != null) {
        requiredFiniteNumber(binary[field], `binaries[${index}].${field}`);
      }
    }
    const normal = binary?.planeOrientation?.normal ?? binary?.planeNormal;
    if (normal != null) {
      for (const axis of AXES) {
        requiredFiniteNumber(normal?.[axis], `binaries[${index}].planeNormal.${axis}`);
      }
    }
  });
  (record.ansatz ?? []).forEach((row, rowIndex) => {
    const points = row?.points ?? row?.samples ?? row?.polyline;
    if (!Array.isArray(points)) {
      throw new TypeError(`assembly-view-record.v0 ansatz[${rowIndex}] requires a sampled polyline.`);
    }
    points.forEach((point, pointIndex) => {
      const position = point?.position ?? point;
      for (const axis of AXES) {
        requiredFiniteNumber(
          position?.[axis],
          `ansatz[${rowIndex}].points[${pointIndex}].${axis}`,
        );
      }
    });
  });
  (record.events ?? []).forEach((event, index) => {
    requiredFiniteNumber(event?.time, `events[${index}].time`);
  });
  if (record.provenance.claimGrade === "evolved-record") {
    record.worldlines.forEach((worldline, index) => {
      const label = `worldlines[${index}]`;
      const declaredCount = requiredNonnegativeInteger(
        worldline.declaredPrehistorySegmentCount,
        `${label}.declaredPrehistorySegmentCount`,
      );
      const evolvedCount = requiredNonnegativeInteger(
        worldline.evolvedSegmentCount,
        `${label}.evolvedSegmentCount`,
      );
      requireConcreteString(worldline.historyFingerprint, `${label}.historyFingerprint`);
      if (declaredCount + evolvedCount !== worldline.segments.length) {
        throw new RangeError(
          `assembly-view-record.v0 ${label} segment counts do not match segments.length.`,
        );
      }
    });
  }
}

function validateOptionalSamples(samples, worldlineId) {
  if (samples == null) {
    return;
  }
  if (!Array.isArray(samples)) {
    throw new TypeError(`assembly-view-record worldline ${worldlineId} samples must be an array.`);
  }
  samples.forEach((sample, index) => {
    requiredFiniteNumber(sample?.t, `worldline ${worldlineId} sample ${index} t`);
    AXES.forEach((axis) => {
      requiredFiniteNumber(
        sample?.position?.[axis],
        `worldline ${worldlineId} sample ${index} position.${axis}`,
      );
      if (sample?.velocity != null) {
        requiredFiniteNumber(
          sample.velocity?.[axis],
          `worldline ${worldlineId} sample ${index} velocity.${axis}`,
        );
      }
    });
  });
}

function rejectNonfiniteNumbers(value, path) {
  if (typeof value === "number" && !Number.isFinite(value)) {
    throw new TypeError(`assembly-view-record.v0 ${path} must not contain non-finite numbers.`);
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) => rejectNonfiniteNumbers(entry, `${path}[${index}]`));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, entry]) =>
      rejectNonfiniteNumbers(entry, `${path}.${key}`),
    );
  }
}

function optionalErrorBound(value) {
  if (Array.isArray(value)) {
    return Math.max(0, ...value.map((entry) => Math.abs(Number(entry)) || 0));
  }
  const number = Number(value);
  return Number.isFinite(number) ? Math.abs(number) : 0;
}

function firstDuplicate(values) {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
  }
  return null;
}

function finiteIntegerOrNull(value) {
  const number = Number(value);
  return Number.isSafeInteger(number) && number >= 0 ? number : null;
}

function requiredNonnegativeInteger(value, label) {
  const number = Number(value);
  if (!Number.isSafeInteger(number) || number < 0) {
    throw new TypeError(`assembly-view-record.v0 ${label} must be a nonnegative safe integer.`);
  }
  return number;
}

function requireConcreteString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0 || value === "unspecified") {
    throw new TypeError(`assembly-view-record.v0 ${label} must be concrete.`);
  }
  return value;
}

function requiredPositiveNumber(value, label) {
  const number = requiredFiniteNumber(value, label);
  if (!(number > 0)) {
    throw new RangeError(`EOM history dataset ${label} must be greater than zero.`);
  }
  return number;
}

function requiredNonnegativeNumber(value, label) {
  const number = requiredFiniteNumber(value, label);
  if (number < 0) {
    throw new RangeError(`EOM history dataset ${label} must be nonnegative.`);
  }
  return number;
}


function evaluateWorldlineSegments(worldline, time) {
  if (!Number.isFinite(time)) {
    throw new TypeError(`EOM worldline ${worldline.id} cannot be evaluated at a non-finite time.`);
  }
  const segment = worldline.segments.find(
    (candidate, index) =>
      candidate.startTime <= time &&
      (time < candidate.endTime || index + 1 === worldline.segments.length),
  );
  if (!segment || time < segment.startTime || time > segment.endTime + 1e-12) {
    throw new RangeError(
      `EOM worldline ${worldline.id} does not cover display time ${time}; recorded coverage is [${worldline.coverage.start}, ${worldline.coverage.end}].`,
    );
  }
  const localTime = time - segment.startTime;
  const position = {};
  const velocity = {};
  AXES.forEach((axis, axisIndex) => {
    const [c0, c1, c2, c3] = segment.coefficients[axisIndex];
    position[axis] = c0 + localTime * (c1 + localTime * (c2 + localTime * c3));
    velocity[axis] = c1 + localTime * (2 * c2 + localTime * 3 * c3);
  });
  return {
    position: Object.freeze(position),
    velocity: Object.freeze(velocity),
    errorBound: Math.max(segment.positionError, segment.velocityError),
  };
}

function resolveSampleCount({ startTime, endTime, sampleInterval, frameCount }) {
  if (Number.isFinite(Number(frameCount)) && Number(frameCount) >= 1) {
    return Math.floor(Number(frameCount));
  }
  const interval = Number(sampleInterval);
  if (Number.isFinite(interval) && interval > 0) {
    return Math.max(1, Math.round((endTime - startTime) / interval) + 1);
  }
  throw new TypeError("EOM frame sampling requires a sampleInterval or frameCount.");
}

function requiredFiniteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new TypeError(`EOM history dataset ${label} must be finite.`);
  }
  return number;
}

function finiteNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

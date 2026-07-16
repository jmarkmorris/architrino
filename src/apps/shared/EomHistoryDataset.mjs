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
// Field naming is aligned with the planned `assembly-view-record.v0` schema
// where cheap: `provenance` (engine, run id, claim grade), `window`,
// `worldlines[]` (id, polarity, sampled t/position/velocity), `events[]`.

export const EOM_EVOLUTION_CONTRACT_ID = "eom_evolution_contract/v0";
export const EOM_HISTORY_DATASET_SCHEMA = "eom-history-dataset.v0";
export const EOM_HISTORY_DEFAULT_ENGINE_ID = "eom-solver";

const AXES = Object.freeze(["x", "y", "z"]);
const CUBIC_COEFFICIENT_COUNT = 4;

export function createEomHistoryDataset(record, options = {}) {
  if (!record || typeof record !== "object") {
    throw new TypeError("EOM history dataset requires an eom_evolution_contract/v0 record.");
  }
  if (record.contractId !== EOM_EVOLUTION_CONTRACT_ID) {
    throw new TypeError(
      `EOM history dataset requires contractId ${EOM_EVOLUTION_CONTRACT_ID}; received ${String(record.contractId ?? "none")}.`,
    );
  }
  const provenance = normalizeProvenance(record, options);
  const worldlines = normalizeWorldlines(record.histories);
  const window = normalizeWindow(record, worldlines);
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
    provenance,
    window,
    worldlines,
    events: Object.freeze(Array.isArray(record.events) ? [...record.events] : []),
    evaluateWorldline,
    createFrameSamples,
    createTrailSamples,
  });
}

function normalizeProvenance(record, options) {
  const claimGrade =
    record.claimGrade ?? record.claimLevel ?? options.claimGrade ?? options.claimLevel;
  if (typeof claimGrade !== "string" || claimGrade.length === 0) {
    throw new TypeError(
      "EOM history dataset requires a claim grade (record.claimGrade/claimLevel); displayed datasets must carry provenance.",
    );
  }
  const runId = record.runId ?? options.runId;
  if (typeof runId !== "string" || runId.length === 0) {
    throw new TypeError("EOM history dataset requires a runId; displayed datasets must carry provenance.");
  }
  return Object.freeze({
    engineId:
      record.provenance?.engineId ?? options.engineId ?? EOM_HISTORY_DEFAULT_ENGINE_ID,
    engineVersion: record.provenance?.engineVersion ?? null,
    runId,
    requestId: record.requestId ?? null,
    contractId: EOM_EVOLUTION_CONTRACT_ID,
    claimGrade,
    evidenceStatus: record.evidenceStatus ?? null,
    sourceProvenance: record.provenance?.importedHistoryAuthority ?? null,
  });
}

function normalizeWindow(record, worldlines) {
  const coverageStart = Math.max(...worldlines.map((worldline) => worldline.coverage.start));
  const coverageEnd = Math.min(...worldlines.map((worldline) => worldline.coverage.end));
  const start = finiteNumber(record.absoluteTimeInterval?.start, coverageStart);
  const end = finiteNumber(record.absoluteTimeInterval?.end, coverageEnd);
  if (!(end > start) && !(end === start)) {
    throw new RangeError("EOM history dataset window is empty or inverted.");
  }
  return Object.freeze({
    start,
    end,
    coverageStart,
    coverageEnd,
    sampleInterval: finiteNumber(record.window?.sampleInterval ?? record.sampleInterval, null),
    delayHorizon: finiteNumber(record.window?.delayHorizon, null),
  });
}

function normalizeWorldlines(histories) {
  if (!Array.isArray(histories) || histories.length === 0) {
    throw new TypeError("EOM history dataset requires a nonempty histories array.");
  }
  return Object.freeze(histories.map((history) => normalizeWorldline(history)));
}

function normalizeWorldline(history) {
  if (!history || typeof history !== "object") {
    throw new TypeError("EOM history dataset worldline must be an object.");
  }
  const id = String(history.pathId ?? "");
  if (id.length === 0) {
    throw new TypeError("EOM history dataset worldline requires a pathId.");
  }
  const charge = requiredFiniteNumber(history.charge, `worldline ${id} charge`);
  if (!Array.isArray(history.segments) || history.segments.length === 0) {
    throw new TypeError(`EOM worldline ${id} lacks retained segments.`);
  }
  const segments = history.segments.map((segment, index) =>
    normalizeSegment(segment, id, index),
  );
  for (let index = 0; index + 1 < segments.length; index += 1) {
    if (segments[index].endTime !== segments[index + 1].startTime) {
      throw new RangeError(
        `EOM worldline ${id} segments are not contiguous at index ${index + 1}.`,
      );
    }
  }
  const coverage = Object.freeze({
    start: finiteNumber(history.coverageStart, segments[0].startTime),
    end: finiteNumber(history.coverageEnd, segments.at(-1).endTime),
  });
  return Object.freeze({
    id,
    pathKey: Number.isFinite(Number(history.pathKey)) ? Number(history.pathKey) : null,
    polarity: Math.sign(charge),
    charge,
    stateFlags: Number(history.stateFlags) || 0,
    coverage,
    interpolation: history.interpolation ?? "piecewise-cubic-hermite/v0",
    sourceProvenance: history.sourceProvenance ?? null,
    sourceClaimLevel: history.sourceClaimLevel ?? null,
    segments: Object.freeze(segments),
  });
}

function normalizeSegment(segment, worldlineId, index) {
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
  return Object.freeze({
    startTime,
    endTime,
    coefficients: Object.freeze(coefficients),
    positionError: Math.abs(Number(segment.positionError)) || 0,
    velocityError: Math.abs(Number(segment.velocityError)) || 0,
  });
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

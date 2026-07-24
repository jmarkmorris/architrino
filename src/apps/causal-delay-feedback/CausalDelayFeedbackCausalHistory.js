import {
  getTimedPathRange,
  sampleTimedPath,
} from "./CausalDelayFeedbackTimedPath.js";

const ROOT_TIME_EPSILON = 1e-8;
const DEFAULT_SCAN_STEPS = 256;
const DEFAULT_REFINE_STEPS = 48;
const DEFAULT_TRANSVERSALITY_FLOOR = 1e-5;

export const NORMALIZED_FIELD_SPEED = 1;
export const DEFAULT_CANVAS_DISTANCE_SCALE = 1 / 3000;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function finiteNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export function createCausalDelayResidual({
  sourcePath,
  receiverPath,
  receiverTime,
  signalSpeed = NORMALIZED_FIELD_SPEED,
  distanceScale = DEFAULT_CANVAS_DISTANCE_SCALE,
}) {
  const reception = sampleTimedPath(receiverPath, receiverTime);
  if (!reception) {
    return () => Number.NaN;
  }
  return (emissionTime) => {
    const emission = sampleTimedPath(sourcePath, emissionTime);
    if (!emission) {
      return Number.NaN;
    }
    const distance = Math.hypot(
      reception.x - emission.x,
      reception.y - emission.y,
      finiteNumber(reception.z) - finiteNumber(emission.z),
    ) * distanceScale;
    return distance - signalSpeed * (receiverTime - emissionTime);
  };
}

export function evaluateScalarRootSet({
  residualAt,
  start,
  end,
  scanSteps = DEFAULT_SCAN_STEPS,
  refineSteps = DEFAULT_REFINE_STEPS,
  rootTolerance = ROOT_TIME_EPSILON,
  tangentTolerance = 2e-5,
  derivativeStep,
} = {}) {
  if (typeof residualAt !== "function" || !Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
    return { roots: [], samples: [], rejected: [{ reason: "invalid_root_interval" }] };
  }
  const count = Math.max(8, Math.floor(scanSteps));
  const samples = Array.from({ length: count + 1 }, (_unused, index) => {
    const time = start + ((end - start) * index) / count;
    return { time, value: Number(residualAt(time)) };
  });
  const candidates = [];
  const rejected = [];
  const addCandidate = (time, detection = "sign_change") => {
    if (!Number.isFinite(time)) {
      return;
    }
    const duplicate = candidates.find(
      (candidate) => Math.abs(candidate.time - time) <= Math.max(rootTolerance * 8, 1e-7),
    );
    if (duplicate) {
      if (detection === "tangent_minimum") {
        duplicate.detection = detection;
      }
      return;
    }
    candidates.push({ time, detection });
  };

  const nearZero = samples.map(
    (sample) => Number.isFinite(sample.value) && Math.abs(sample.value) <= rootTolerance,
  );
  for (let index = 0; index < nearZero.length;) {
    if (!nearZero[index]) {
      index += 1;
      continue;
    }
    const runStart = index;
    while (index + 1 < nearZero.length && nearZero[index + 1]) {
      index += 1;
    }
    const runEnd = index;
    if (runEnd > runStart) {
      rejected.push({
        reason: "degenerate_zero_interval",
        start: samples[runStart].time,
        end: samples[runEnd].time,
      });
    } else {
      addCandidate(samples[runStart].time, "sample_zero");
    }
    index += 1;
  }

  for (let index = 1; index < samples.length; index += 1) {
    const left = samples[index - 1];
    const right = samples[index];
    if (!Number.isFinite(left.value) || !Number.isFinite(right.value)) {
      continue;
    }
    if (nearZero[index - 1] || nearZero[index] || Math.sign(left.value) === Math.sign(right.value)) {
      continue;
    }
    let low = left.time;
    let high = right.time;
    let lowValue = left.value;
    for (let refine = 0; refine < refineSteps; refine += 1) {
      const mid = (low + high) * 0.5;
      const midValue = Number(residualAt(mid));
      if (!Number.isFinite(midValue)) {
        break;
      }
      if (Math.abs(midValue) <= rootTolerance) {
        low = mid;
        high = mid;
        break;
      }
      if (Math.sign(midValue) === Math.sign(lowValue)) {
        low = mid;
        lowValue = midValue;
      } else {
        high = mid;
      }
    }
    addCandidate((low + high) * 0.5, "sign_change");
  }

  for (let index = 1; index < samples.length - 1; index += 1) {
    const left = samples[index - 1];
    const sample = samples[index];
    const right = samples[index + 1];
    if (
      !nearZero[index] &&
      Number.isFinite(left.value) &&
      Number.isFinite(sample.value) &&
      Number.isFinite(right.value) &&
      Math.abs(sample.value) <= Math.abs(left.value) &&
      Math.abs(sample.value) <= Math.abs(right.value) &&
      Math.sign(left.value) === Math.sign(right.value)
    ) {
      let low = left.time;
      let high = right.time;
      for (let refine = 0; refine < refineSteps; refine += 1) {
        const third = (high - low) / 3;
        const leftProbe = low + third;
        const rightProbe = high - third;
        const leftValue = Math.abs(Number(residualAt(leftProbe)));
        const rightValue = Math.abs(Number(residualAt(rightProbe)));
        if (!Number.isFinite(leftValue) || !Number.isFinite(rightValue)) {
          break;
        }
        if (leftValue <= rightValue) {
          high = rightProbe;
        } else {
          low = leftProbe;
        }
      }
      const tangentTime = (low + high) * 0.5;
      if (Math.abs(Number(residualAt(tangentTime))) <= tangentTolerance) {
        addCandidate(tangentTime, "tangent_minimum");
      }
    }
  }

  const step = Number.isFinite(derivativeStep)
    ? Math.abs(derivativeStep)
    : Math.max((end - start) / (count * 8), 1e-7);
  const roots = candidates
    .sort((left, right) => left.time - right.time)
    .map((candidate) => {
      const { time } = candidate;
      const leftTime = clamp(time - step, start, end);
      const rightTime = clamp(time + step, start, end);
      const span = rightTime - leftTime;
      const derivative = span > 0
        ? (Number(residualAt(rightTime)) - Number(residualAt(leftTime))) / span
        : Number.NaN;
      const residual = Number(residualAt(time));
      return {
        time,
        residual,
        derivative,
        tangent: Math.abs(derivative) <= Math.sqrt(tangentTolerance),
        detection: candidate.detection,
      };
    })
    .filter((root) => Number.isFinite(root.residual) && Math.abs(root.residual) <= tangentTolerance * 2);

  return { roots, samples, rejected };
}

export function evaluateCausalRoots({
  sourceId,
  receiverId,
  sourcePath,
  receiverPath,
  receiverTime,
  signalSpeed = NORMALIZED_FIELD_SPEED,
  distanceScale = DEFAULT_CANVAS_DISTANCE_SCALE,
  transversalityFloor = DEFAULT_TRANSVERSALITY_FLOOR,
  includeCoincident = false,
  selfHit = sourceId === receiverId,
  scanSteps = DEFAULT_SCAN_STEPS,
} = {}) {
  const [sourceStart, sourceEnd] = getTimedPathRange(sourcePath);
  const receiverRange = getTimedPathRange(receiverPath);
  if (
    receiverTime < receiverRange[0] ||
    receiverTime > receiverRange[1] ||
    sourceEnd <= sourceStart
  ) {
    return {
      sourceId: String(sourceId),
      receiverId: String(receiverId),
      receiverTime,
      signalSpeed,
      distanceScale,
      roots: [],
      acceptedRoots: [],
      rejectedRoots: [],
      samples: [],
      diagnostics: [{ reason: "insufficient_path_coverage" }],
    };
  }
  const upperBound = Math.min(sourceEnd, receiverTime - ROOT_TIME_EPSILON);
  if (upperBound <= sourceStart) {
    return {
      sourceId: String(sourceId),
      receiverId: String(receiverId),
      receiverTime,
      signalSpeed,
      distanceScale,
      roots: [],
      acceptedRoots: [],
      rejectedRoots: [],
      samples: [],
      diagnostics: [{ reason: "no_positive_delay_interval" }],
    };
  }
  const residualAt = createCausalDelayResidual({
    sourcePath,
    receiverPath,
    receiverTime,
    signalSpeed,
    distanceScale,
  });
  const scalar = evaluateScalarRootSet({
    residualAt,
    start: sourceStart,
    end: upperBound,
    scanSteps,
  });
  const reception = sampleTimedPath(receiverPath, receiverTime);
  const rows = scalar.roots.map((root, ordinal) => {
    const emission = sampleTimedPath(sourcePath, root.time);
    const delay = receiverTime - root.time;
    const separation = emission && reception
      ? Math.hypot(
          reception.x - emission.x,
          reception.y - emission.y,
          finiteNumber(reception.z) - finiteNumber(emission.z),
        ) * distanceScale
      : Number.NaN;
    const coincidentDistanceTolerance = Math.abs(signalSpeed) * ROOT_TIME_EPSILON;
    const coincident = selfHit && separation <= coincidentDistanceTolerance;
    const simple = Math.abs(root.derivative) >= transversalityFloor;
    const accepted = delay > ROOT_TIME_EPSILON && (!coincident || includeCoincident) && simple;
    const reason = delay <= ROOT_TIME_EPSILON
      ? "nonpositive_delay"
      : coincident && !includeCoincident
        ? "coincident_same_source_root_unresolved"
        : root.tangent
          ? "tangent_root_unresolved"
        : !simple
          ? "transversality_floor_failed"
          : "accepted_simple_root";
    return {
      id: `${String(sourceId)}:${String(receiverId)}:root:${ordinal + 1}`,
      ordinal: ordinal + 1,
      sourceId: String(sourceId),
      receiverId: String(receiverId),
      emissionTime: root.time,
      receiverTime,
      delay,
      signalSpeed,
      distanceScale,
      residual: root.residual,
      transversality: root.derivative,
      tangent: root.tangent,
      simple,
      coincident,
      accepted,
      reason,
      rootKind: selfHit ? "self_hit" : "pair_hit",
      emission,
      reception,
    };
  });
  return {
    sourceId: String(sourceId),
    receiverId: String(receiverId),
    receiverTime,
    signalSpeed,
    distanceScale,
    roots: rows,
    acceptedRoots: rows.filter((row) => row.accepted),
    rejectedRoots: rows.filter((row) => !row.accepted),
    samples: scalar.samples.map((sample) => ({
      emissionTime: sample.time,
      value: sample.value,
    })),
    diagnostics: scalar.rejected,
  };
}

function createReplayAuthority(dataset, loadState = "ready", loadError = null) {
  const source = String(dataset?.datasetSource ?? "unavailable_provider");
  const isRepresentative = source === "representative_mock_solver_replay";
  const isRecordedEom = source === "eom_history_replay";
  return {
    source,
    adapter: String(dataset?.solverIntegrationPath ?? "unavailable_provider"),
    loadState,
    label: isRecordedEom
      ? "EOM record replay"
      : isRepresentative
        ? "representative mock replay"
        : source === "direct_manipulation_draft_preview"
          ? "guided teaching replay"
          : "unavailable provider",
    authority: isRecordedEom
      ? "recorded display replay"
      : isRepresentative
        ? "representative teaching data"
        : "display-only unavailable state",
    guidedTeachingReplay: "guided teaching replay",
    error: loadError ? String(loadError?.message ?? loadError) : null,
  };
}

function createProducerBranchRows(dataset, receiverTime) {
  return (dataset?.wakeLinks ?? []).map((row, index) => {
    const retainedEmission = dataset?.history?.[row.sourceKind]?.find(
      (point) => Number(point.depth) === Number(row.sourceDepth),
    );
    const retainedReception = dataset?.history?.[row.receiverKind]?.find(
      (point) => Number(point.depth) === Number(row.receiverDepth),
    );
    const emission = Number.isFinite(Number(row.source?.t)) ? row.source : retainedEmission ?? row.source ?? null;
    const reception = Number.isFinite(Number(row.receiver?.t)) ? row.receiver : retainedReception ?? row.receiver ?? null;
    const rootCount = Number.isFinite(Number(row.rootCount)) ? Number(row.rootCount) : null;
    const hitCount = Number.isFinite(Number(row.solverHitCount)) ? Number(row.solverHitCount) : null;
    const explicitStatus = String(row.status ?? "");
    const accepted = !["rejected", "inactive", "stale"].includes(explicitStatus)
      && !(hitCount === 0 && rootCount != null);
    const reason = explicitStatus === "stale"
      ? row.reason ?? "stale_solver_row"
      : accepted
        ? hitCount > 0
          ? "producer_delayed_hit_accepted"
          : "representative_replay_row"
        : row.reason ??
          row.rootStatus?.code ??
          (rootCount > 0 ? "root_without_accepted_hit" : "no_delayed_hit");
    return {
      id: row.id ?? `producer-branch:${index + 1}`,
      ordinal: index + 1,
      sourceId: row.sourceKind ?? "unknown",
      receiverId: row.receiverKind ?? "unknown",
      emissionTime: finiteNumber(row.emissionTime ?? emission?.t, Number.NaN),
      receiverTime: finiteNumber(row.hitTime ?? reception?.t, receiverTime),
      emission,
      reception,
      accepted,
      reason,
      rootKind: "producer_carried_row",
      acceleration: row.acceleration ?? null,
      producerRow: row,
    };
  });
}

export function createCanonicalLearnerState(dataset, {
  receiverTime = 0.62,
  mode = "story",
  signalSpeed = NORMALIZED_FIELD_SPEED,
  distanceScale = DEFAULT_CANVAS_DISTANCE_SCALE,
  loadState = "ready",
  loadError = null,
} = {}) {
  const state = {
    mode,
    storyStep: 0,
    predictionState: "unanswered",
    selectedPredictionId: null,
    selectedSelfHitScenarioId: "super_cf_curved",
    sourceId: "positrino",
    receiverId: "electrino",
    paths: dataset?.paths ?? { positrino: [], electrino: [] },
    retainedHistory: dataset?.history ?? { positrino: [], electrino: [] },
    receiverTime,
    emissionTime: null,
    roots: [],
    reciprocalRoots: [],
    acceptedBranchRows: [],
    rejectedBranchRows: [],
    branchFilters: {
      historyAgeLimit: Number.POSITIVE_INFINITY,
      minimumContribution: 0,
      rootKind: "all",
      transversalityFloor: 0,
    },
    sourceGeometry: null,
    receiverGeometry: null,
    wakeGeometry: [],
    selectedRootId: null,
    selectedReciprocalRootId: null,
    playback: {
      playing: false,
      reducedMotion: false,
      rate: 1,
    },
    replay: createReplayAuthority(dataset, loadState, loadError),
    dataset,
  };
  return refreshCanonicalLearnerState(state, { signalSpeed, distanceScale });
}

export function refreshCanonicalLearnerState(state, {
  dataset = state.dataset,
  receiverTime = state.receiverTime,
  signalSpeed = NORMALIZED_FIELD_SPEED,
  distanceScale = DEFAULT_CANVAS_DISTANCE_SCALE,
  loadState = state.replay?.loadState ?? "ready",
  loadError = state.replay?.error ?? null,
} = {}) {
  state.dataset = dataset;
  state.paths = dataset?.paths ?? state.paths;
  state.retainedHistory = dataset?.history ?? state.retainedHistory;
  state.receiverTime = receiverTime;
  state.replay = createReplayAuthority(dataset, loadState, loadError);
  const causalEvaluationAvailable = dataset?.causalEvaluation?.enabled !== false;
  const unavailableEvaluation = {
    roots: [],
    acceptedRoots: [],
    rejectedRoots: [],
    samples: [],
    diagnostics: [{
      reason: dataset?.causalEvaluation?.reason ?? "causal_evaluation_unavailable",
    }],
  };
  const evaluation = causalEvaluationAvailable
    ? evaluateCausalRoots({
        sourceId: state.sourceId,
        receiverId: state.receiverId,
        sourcePath: state.paths?.[state.sourceId] ?? [],
        receiverPath: state.paths?.[state.receiverId] ?? [],
        receiverTime,
        signalSpeed,
        distanceScale,
      })
    : unavailableEvaluation;
  const reciprocalEvaluation = causalEvaluationAvailable
    ? evaluateCausalRoots({
        sourceId: state.receiverId,
        receiverId: state.sourceId,
        sourcePath: state.paths?.[state.receiverId] ?? [],
        receiverPath: state.paths?.[state.sourceId] ?? [],
        receiverTime,
        signalSpeed,
        distanceScale,
      })
    : unavailableEvaluation;
  state.causalEvaluationAvailable = causalEvaluationAvailable;
  state.causalEvaluationReason = causalEvaluationAvailable
    ? null
    : dataset?.causalEvaluation?.reason ?? "causal_evaluation_unavailable";
  state.causalDiagnostics = evaluation.diagnostics ?? [];
  state.roots = evaluation.roots;
  state.reciprocalRoots = reciprocalEvaluation.roots;
  const producerRows = createProducerBranchRows(dataset, receiverTime).filter(
    (row) => row.sourceId === state.sourceId && row.receiverId === state.receiverId,
  );
  const branchRows = producerRows.length > 0 ? producerRows : evaluation.roots;
  state.acceptedBranchRows = branchRows.filter((row) => row.accepted);
  state.rejectedBranchRows = branchRows.filter((row) => !row.accepted);
  const selected = evaluation.acceptedRoots.find((root) => root.id === state.selectedRootId)
    ?? evaluation.acceptedRoots.at(-1)
    ?? evaluation.roots.at(-1)
    ?? null;
  state.selectedRootId = selected?.id ?? null;
  const selectedReciprocal =
    reciprocalEvaluation.acceptedRoots.find((root) => root.id === state.selectedReciprocalRootId)
    ?? reciprocalEvaluation.acceptedRoots.at(-1)
    ?? reciprocalEvaluation.roots.at(-1)
    ?? null;
  state.selectedReciprocalRootId = selectedReciprocal?.id ?? null;
  state.emissionTime = selected?.emissionTime ?? null;
  state.sourceGeometry = selected?.emission ?? sampleTimedPath(state.paths?.[state.sourceId], receiverTime);
  state.receiverGeometry = selected?.reception ?? sampleTimedPath(state.paths?.[state.receiverId], receiverTime);
  state.delayMap = evaluation.samples;
  return state;
}

export function createPredictionChoices(state, { count = 3 } = {}) {
  const root = state.roots.find((candidate) => candidate.id === state.selectedRootId)
    ?? state.acceptedBranchRows.at(-1);
  if (!root) {
    return [];
  }
  const [start, end] = getTimedPathRange(state.paths?.[state.sourceId]);
  const spread = Math.max(0.06, root.delay * 0.42);
  const upperBound = Math.min(end, state.receiverTime - ROOT_TIME_EPSILON);
  const times = [root.emissionTime];
  for (const offset of [-spread, spread, -2 * spread, 2 * spread]) {
    const candidate = clamp(root.emissionTime + offset, start, upperBound);
    if (!times.some((time) => Math.abs(time - candidate) <= ROOT_TIME_EPSILON)) {
      times.push(candidate);
    }
    if (times.length >= Math.max(2, count)) {
      break;
    }
  }
  const hash = [...String(root.id)].reduce(
    (value, character) => ((value * 33) ^ character.codePointAt(0)) >>> 0,
    5381,
  );
  const choiceCount = Math.min(times.length, Math.max(2, count));
  const correctIndex = (hash >>> 8) % choiceCount;
  const distractors = times.slice(1).sort((left, right) => left - right);
  const orderedTimes = Array.from({ length: choiceCount }, (_unused, index) =>
    index === correctIndex ? root.emissionTime : distractors.shift(),
  );
  return orderedTimes.map((time, index) => ({
    id: `${root.id}:choice:${index + 1}`,
    emissionTime: time,
    point: sampleTimedPath(state.paths?.[state.sourceId], time),
    correct: Math.abs(time - root.emissionTime) <= ROOT_TIME_EPSILON,
    label: `Earlier position ${index + 1}`,
  }));
}

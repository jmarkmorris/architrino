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

function pathTimeRange(path) {
  const times = (path ?? []).map((point) => Number(point?.t)).filter(Number.isFinite);
  if (times.length === 0) {
    return [0, 0];
  }
  return [Math.min(...times), Math.max(...times)];
}

export function sampleCausalHistoryPath(path, sampleTime) {
  if (!Array.isArray(path) || path.length === 0) {
    return null;
  }
  const time = finiteNumber(sampleTime, finiteNumber(path[0]?.t));
  if (path.length === 1 || time <= finiteNumber(path[0]?.t)) {
    return { ...path[0], t: time };
  }
  const last = path.at(-1);
  if (time >= finiteNumber(last?.t)) {
    return { ...last, t: time };
  }
  let rightIndex = path.findIndex((point) => finiteNumber(point?.t) >= time);
  if (rightIndex < 1) {
    rightIndex = 1;
  }
  const left = path[rightIndex - 1];
  const right = path[rightIndex] ?? last;
  const span = finiteNumber(right?.t) - finiteNumber(left?.t);
  const amount = span === 0 ? 0 : clamp((time - finiteNumber(left?.t)) / span, 0, 1);
  return {
    t: time,
    x: finiteNumber(left?.x) + (finiteNumber(right?.x) - finiteNumber(left?.x)) * amount,
    y: finiteNumber(left?.y) + (finiteNumber(right?.y) - finiteNumber(left?.y)) * amount,
    vx: finiteNumber(left?.vx) + (finiteNumber(right?.vx) - finiteNumber(left?.vx)) * amount,
    vy: finiteNumber(left?.vy) + (finiteNumber(right?.vy) - finiteNumber(left?.vy)) * amount,
  };
}

export function createCausalDelayResidual({
  sourcePath,
  receiverPath,
  receiverTime,
  signalSpeed = NORMALIZED_FIELD_SPEED,
  distanceScale = DEFAULT_CANVAS_DISTANCE_SCALE,
}) {
  const reception = sampleCausalHistoryPath(receiverPath, receiverTime);
  if (!reception) {
    return () => Number.NaN;
  }
  return (emissionTime) => {
    const emission = sampleCausalHistoryPath(sourcePath, emissionTime);
    if (!emission) {
      return Number.NaN;
    }
    const distance = Math.hypot(reception.x - emission.x, reception.y - emission.y) * distanceScale;
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
  const candidateTimes = [];
  const addCandidate = (time) => {
    if (!Number.isFinite(time)) {
      return;
    }
    if (candidateTimes.some((candidate) => Math.abs(candidate - time) <= Math.max(rootTolerance * 8, 1e-7))) {
      return;
    }
    candidateTimes.push(time);
  };

  for (let index = 1; index < samples.length; index += 1) {
    const left = samples[index - 1];
    const right = samples[index];
    if (!Number.isFinite(left.value) || !Number.isFinite(right.value)) {
      continue;
    }
    if (Math.abs(left.value) <= rootTolerance) {
      addCandidate(left.time);
    }
    if (left.value === 0 || right.value === 0 || Math.sign(left.value) === Math.sign(right.value)) {
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
    addCandidate((low + high) * 0.5);
  }
  const tangentCandidates = [];
  for (let index = 1; index < samples.length - 1; index += 1) {
    const left = samples[index - 1];
    const sample = samples[index];
    const right = samples[index + 1];
    if (
      Number.isFinite(sample.value) &&
      Math.abs(sample.value) <= tangentTolerance &&
      Math.abs(sample.value) <= Math.abs(left.value) &&
      Math.abs(sample.value) <= Math.abs(right.value)
    ) {
      addCandidate(sample.time);
      tangentCandidates.push(sample.time);
    }
  }

  const step = Number.isFinite(derivativeStep)
    ? Math.abs(derivativeStep)
    : Math.max((end - start) / (count * 8), 1e-7);
  const roots = candidateTimes
    .sort((left, right) => left - right)
    .map((time) => {
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
        detection: tangentCandidates.some((candidate) => Math.abs(candidate - time) <= step)
          ? "tangent_minimum"
          : "sign_change",
      };
    })
    .filter((root) => Number.isFinite(root.residual) && Math.abs(root.residual) <= tangentTolerance * 2);

  return { roots, samples, rejected: [] };
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
  const [sourceStart, sourceEnd] = pathTimeRange(sourcePath);
  const upperBound = Math.min(sourceEnd, receiverTime - ROOT_TIME_EPSILON);
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
  const reception = sampleCausalHistoryPath(receiverPath, receiverTime);
  const rows = scalar.roots.map((root, ordinal) => {
    const emission = sampleCausalHistoryPath(sourcePath, root.time);
    const delay = receiverTime - root.time;
    const separation = emission && reception
      ? Math.hypot(reception.x - emission.x, reception.y - emission.y) * distanceScale
      : Number.NaN;
    const coincident = selfHit && separation <= ROOT_TIME_EPSILON;
    const simple = Math.abs(root.derivative) >= transversalityFloor;
    const accepted = delay > ROOT_TIME_EPSILON && (!coincident || includeCoincident) && simple;
    const reason = delay <= ROOT_TIME_EPSILON
      ? "nonpositive_delay"
      : coincident && !includeCoincident
        ? "coincident_same_source_root_unresolved"
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
    constrainedBoundaryReplay:
      "current constrained pair-interaction boundary replay: separate implementation-grade path",
    strongerPhysicalSolver: "open",
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
  const evaluation = evaluateCausalRoots({
    sourceId: state.sourceId,
    receiverId: state.receiverId,
    sourcePath: state.paths?.[state.sourceId] ?? [],
    receiverPath: state.paths?.[state.receiverId] ?? [],
    receiverTime,
    signalSpeed,
    distanceScale,
  });
  const reciprocalEvaluation = evaluateCausalRoots({
    sourceId: state.receiverId,
    receiverId: state.sourceId,
    sourcePath: state.paths?.[state.receiverId] ?? [],
    receiverPath: state.paths?.[state.sourceId] ?? [],
    receiverTime,
    signalSpeed,
    distanceScale,
  });
  state.roots = evaluation.roots;
  state.reciprocalRoots = reciprocalEvaluation.roots;
  const producerRows = createProducerBranchRows(dataset, receiverTime);
  state.acceptedBranchRows = [
    ...evaluation.acceptedRoots,
    ...producerRows.filter((row) => row.accepted),
  ];
  state.rejectedBranchRows = [
    ...evaluation.rejectedRoots,
    ...producerRows.filter((row) => !row.accepted),
  ];
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
  state.sourceGeometry = selected?.emission ?? sampleCausalHistoryPath(state.paths?.[state.sourceId], receiverTime);
  state.receiverGeometry = selected?.reception ?? sampleCausalHistoryPath(state.paths?.[state.receiverId], receiverTime);
  state.delayMap = evaluation.samples;
  return state;
}

export function createPredictionChoices(state, { count = 3 } = {}) {
  const root = state.roots.find((candidate) => candidate.id === state.selectedRootId)
    ?? state.acceptedBranchRows.at(-1);
  if (!root) {
    return [];
  }
  const [start] = pathTimeRange(state.paths?.[state.sourceId]);
  const spread = Math.max(0.06, root.delay * 0.42);
  const times = [
    clamp(root.emissionTime - spread, start, state.receiverTime),
    root.emissionTime,
    clamp(root.emissionTime + spread, start, state.receiverTime - ROOT_TIME_EPSILON),
  ].slice(0, Math.max(2, count));
  return times.map((time, index) => ({
    id: `${root.id}:choice:${index + 1}`,
    emissionTime: time,
    point: sampleCausalHistoryPath(state.paths?.[state.sourceId], time),
    correct: Math.abs(time - root.emissionTime) <= ROOT_TIME_EPSILON,
    label: `Earlier position ${index + 1}`,
  }));
}

export const BORG_LIVE_RUN_RETENTION_POLICY_VERSION = "borg-live-run-retention-policy.v1";

export const BORG_LIVE_RUN_RETENTION_POLICY_V1 = Object.freeze({
  schema: BORG_LIVE_RUN_RETENTION_POLICY_VERSION,
  policyId: "borg-live-run-retention-policy-developer-test.v1",
  status: "developer-test-runtime-policy",
  retainedFrameSetLimit: 720,
  compactionTriggerFrameSetLimit: 900,
  compactionSampleStride: 8,
  compactedPointsPerPathLimit: 512,
  retainedFrameAuthority: "authoritative-recent-native-frame-rows",
  compactedPathHistoryAuthority: "display-only-compacted-path-history",
  claimBoundary:
    "Retention limits browser display memory only. It does not alter EOM solver state, EOM chunk requests, or authoritative recent frame rows.",
});

export function createBorgLiveRunRetentionSnapshot({
  frameRows = [],
  compactedPathHistory = {},
  policy = BORG_LIVE_RUN_RETENTION_POLICY_V1,
  status = "retaining-recent-native-frame-rows",
} = {}) {
  return Object.freeze({
    schema: BORG_LIVE_RUN_RETENTION_POLICY_VERSION,
    policyId: policy.policyId,
    status,
    retainedFrameRows: frameRows.length,
    retainedFrameSetCount: countFrameSets(frameRows),
    compactedPathKeyCount: Object.keys(compactedPathHistory).length,
    compactedPathPointCount: countCompactedPoints(compactedPathHistory),
    compactedFrameSetCount: countCompactedFrameSets(compactedPathHistory),
    retainedFrameSetLimit: policy.retainedFrameSetLimit,
    compactionTriggerFrameSetLimit: policy.compactionTriggerFrameSetLimit,
    compactedPointsPerPathLimit: policy.compactedPointsPerPathLimit,
    compactedThisPass: false,
  });
}

export function createBorgLiveRunRetentionAppendSnapshot({
  previousSnapshot,
  retainedFrameRowCount,
  retainedFrameSetCount,
} = {}) {
  const previous = previousSnapshot ?? createBorgLiveRunRetentionSnapshot();
  return Object.freeze({
    ...previous,
    status: previous.status === "compacted-path-history"
      ? previous.status
      : "retaining-recent-native-frame-rows",
    retainedFrameRows: nonnegativeInteger(
      retainedFrameRowCount,
      previous.retainedFrameRows,
    ),
    retainedFrameSetCount: nonnegativeInteger(
      retainedFrameSetCount,
      previous.retainedFrameSetCount,
    ),
    compactedThisPass: false,
  });
}

export function applyBorgLiveRunRetention({
  frameRows = [],
  compactedPathHistory = {},
  policy = BORG_LIVE_RUN_RETENTION_POLICY_V1,
} = {}) {
  const normalizedRows = normalizeFrameRows(frameRows);
  const normalizedCompacted = normalizeCompactedPathHistory(compactedPathHistory);
  const frameIndexes = sortedFrameIndexes(normalizedRows);
  const triggerLimit = positiveInteger(
    policy.compactionTriggerFrameSetLimit,
    policy.retainedFrameSetLimit,
  );
  if (frameIndexes.length <= triggerLimit) {
    return Object.freeze({
      frameRows: Object.freeze(normalizedRows),
      compactedPathHistory: normalizedCompacted,
      summary: createBorgLiveRunRetentionSnapshot({
        frameRows: normalizedRows,
        compactedPathHistory: normalizedCompacted,
        policy,
      }),
    });
  }

  const retainedLimit = positiveInteger(policy.retainedFrameSetLimit, triggerLimit);
  const retainStartIndex = Math.max(0, frameIndexes.length - retainedLimit);
  const compactFrameIndexes = new Set(frameIndexes.slice(0, retainStartIndex + 1));
  const retainFrameIndexes = new Set(frameIndexes.slice(retainStartIndex));
  const compactRows = normalizedRows.filter((row) => compactFrameIndexes.has(row.frameIndex));
  const retainedRows = normalizedRows.filter((row) => retainFrameIndexes.has(row.frameIndex));
  const nextCompacted = compactPathRows(compactRows, normalizedCompacted, policy);

  return Object.freeze({
    frameRows: Object.freeze(retainedRows),
    compactedPathHistory: nextCompacted,
    summary: Object.freeze({
      ...createBorgLiveRunRetentionSnapshot({
        frameRows: retainedRows,
        compactedPathHistory: nextCompacted,
        policy,
        status: "compacted-path-history",
      }),
      compactedThisPass: true,
    }),
  });
}

function compactPathRows(frameRows, compactedPathHistory, policy) {
  const byPathKey = new Map();
  frameRows.forEach((row) => {
    const key = String(row.pathKey);
    const rows = byPathKey.get(key) ?? [];
    rows.push(row);
    byPathKey.set(key, rows);
  });

  const next = { ...compactedPathHistory };
  byPathKey.forEach((rows, key) => {
    const sampleStride = positiveInteger(policy.compactionSampleStride, 1);
    const sampled = sampleRowsByStride(
      rows.sort(compareFrameRows),
      sampleStride,
    ).map((row) => ({
      frameIndex: row.frameIndex,
      time: row.time,
      position: clonePosition(row.position),
    }));
    const merged = dedupeCompactedPoints([...(next[key] ?? []), ...sampled]);
    next[key] = Object.freeze(limitCompactedPoints(
      merged,
      positiveInteger(policy.compactedPointsPerPathLimit, 512),
      sampleStride,
    ));
  });

  return deepFreezeCompactedPathHistory(next);
}

function sampleRowsByStride(rows, stride) {
  if (rows.length <= 2 || stride <= 1) {
    return rows;
  }
  return selectStableFrameLattice(rows, stride);
}

function limitCompactedPoints(points, limit, baseStride) {
  if (points.length <= limit) {
    return points;
  }
  if (limit <= 2) {
    return [points[0], points.at(-1)];
  }
  // Keep a fixed absolute frame lattice. When the cap is reached, double the
  // stride until the points fit. Every coarser lattice is a subset of the
  // previous one, so old trail vertices disappear occasionally but never
  // slide to different historical frames as new chunks arrive.
  let stride = Math.max(1, positiveInteger(baseStride, 1));
  let limited = selectStableFrameLattice(points, stride);
  while (limited.length > limit) {
    stride *= 2;
    limited = selectStableFrameLattice(points, stride);
  }
  return limited;
}

function selectStableFrameLattice(points, stride) {
  const lastIndex = points.length - 1;
  return points.filter((point, index) => (
    index === 0 ||
    index === lastIndex ||
    Number(point.frameIndex) % stride === 0
  ));
}

function dedupeCompactedPoints(points) {
  const byKey = new Map();
  points.forEach((point) => {
    byKey.set(`${point.frameIndex}:${point.time}`, point);
  });
  return [...byKey.values()].sort(compareCompactedPoints);
}

function normalizeFrameRows(frameRows) {
  return frameRows
    .filter((row) => Number.isFinite(Number(row?.frameIndex)) && row?.position)
    .map((row) => ({
      ...row,
      frameIndex: Number(row.frameIndex),
      time: Number(row.time),
      position: clonePosition(row.position),
    }))
    .sort(compareFrameRows);
}

function normalizeCompactedPathHistory(compactedPathHistory) {
  const normalized = {};
  Object.entries(compactedPathHistory ?? {}).forEach(([key, points]) => {
    if (!Array.isArray(points)) {
      return;
    }
    normalized[key] = Object.freeze(
      points
        .filter((point) => Number.isFinite(Number(point?.frameIndex)) && point?.position)
        .map((point) => ({
          frameIndex: Number(point.frameIndex),
          time: Number(point.time),
          position: clonePosition(point.position),
        }))
        .sort(compareCompactedPoints),
    );
  });
  return deepFreezeCompactedPathHistory(normalized);
}

function deepFreezeCompactedPathHistory(compactedPathHistory) {
  const frozen = {};
  Object.entries(compactedPathHistory).forEach(([key, points]) => {
    frozen[key] = Object.freeze([...points]);
  });
  return Object.freeze(frozen);
}

function sortedFrameIndexes(frameRows) {
  return [...new Set(frameRows.map((row) => row.frameIndex))].sort((left, right) => left - right);
}

function countFrameSets(frameRows) {
  return sortedFrameIndexes(normalizeFrameRows(frameRows)).length;
}

function countCompactedPoints(compactedPathHistory) {
  return Object.values(compactedPathHistory ?? {}).reduce(
    (sum, points) => sum + (Array.isArray(points) ? points.length : 0),
    0,
  );
}

function countCompactedFrameSets(compactedPathHistory) {
  const indexes = new Set();
  Object.values(compactedPathHistory ?? {}).forEach((points) => {
    if (!Array.isArray(points)) {
      return;
    }
    points.forEach((point) => indexes.add(point.frameIndex));
  });
  return indexes.size;
}

function clonePosition(position = {}) {
  return Object.freeze({
    x: finiteNumber(position.x, 0),
    y: finiteNumber(position.y, 0),
    z: finiteNumber(position.z, 0),
  });
}

function compareFrameRows(left, right) {
  return left.frameIndex - right.frameIndex || left.pathKey - right.pathKey;
}

function compareCompactedPoints(left, right) {
  return left.frameIndex - right.frameIndex || left.time - right.time;
}

function positiveInteger(value, fallback) {
  const number = Math.floor(Number(value));
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function nonnegativeInteger(value, fallback) {
  const number = Number(value);
  return Number.isInteger(number) && number >= 0 ? number : fallback;
}

function finiteNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

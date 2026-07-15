import assert from "node:assert/strict";
import { test } from "node:test";

import {
  BORG_LIVE_RUN_RETENTION_POLICY_VERSION,
  applyBorgLiveRunRetention,
  createBorgLiveRunRetentionSnapshot,
} from "../src/apps/borg/BorgLiveRunRetentionPolicy.js";

const TEST_POLICY = Object.freeze({
  policyId: "test-retention-policy",
  retainedFrameSetLimit: 4,
  compactionTriggerFrameSetLimit: 6,
  compactionSampleStride: 2,
  compactedPointsPerPathLimit: 5,
});

test("Borg live run retention leaves short runs as retained native frame rows", () => {
  const frameRows = createFrameRows({ frameSetCount: 5, pathCount: 2 });
  const result = applyBorgLiveRunRetention({
    frameRows,
    policy: TEST_POLICY,
  });

  assert.equal(result.summary.schema, BORG_LIVE_RUN_RETENTION_POLICY_VERSION);
  assert.equal(result.summary.status, "retaining-recent-native-frame-rows");
  assert.equal(result.summary.compactedThisPass, false);
  assert.equal(result.summary.retainedFrameSetCount, 5);
  assert.equal(result.frameRows.length, frameRows.length);
  assert.deepEqual(result.compactedPathHistory, {});
});

test("Borg live run retention compacts older path history and keeps recent display rows", () => {
  const frameRows = createFrameRows({ frameSetCount: 10, pathCount: 2 });
  const result = applyBorgLiveRunRetention({
    frameRows,
    policy: TEST_POLICY,
  });
  const retainedFrameIndexes = uniqueFrameIndexes(result.frameRows);

  assert.equal(result.summary.status, "compacted-path-history");
  assert.equal(result.summary.compactedThisPass, true);
  assert.deepEqual(retainedFrameIndexes, [6, 7, 8, 9]);
  assert.equal(result.summary.retainedFrameSetCount, 4);
  assert.equal(result.summary.retainedFrameRows, 8);
  assert.equal(result.summary.compactedPathKeyCount, 2);
  assert.ok(result.summary.compactedPathPointCount > 0);
  assert.ok(result.compactedPathHistory[0].length <= TEST_POLICY.compactedPointsPerPathLimit);
  assert.deepEqual(
    result.compactedPathHistory[0].at(-1).position,
    { x: 6, y: 0, z: 0 },
  );
});

test("Borg live run retention continues compacting without unbounded trail points", () => {
  const first = applyBorgLiveRunRetention({
    frameRows: createFrameRows({ frameSetCount: 10, pathCount: 2 }),
    policy: TEST_POLICY,
  });
  const second = applyBorgLiveRunRetention({
    frameRows: createFrameRows({ frameSetCount: 16, pathCount: 2, startFrameIndex: 10 }),
    compactedPathHistory: first.compactedPathHistory,
    policy: TEST_POLICY,
  });

  assert.equal(second.summary.status, "compacted-path-history");
  assert.equal(second.summary.retainedFrameSetCount, 4);
  Object.values(second.compactedPathHistory).forEach((points) => {
    assert.ok(points.length <= TEST_POLICY.compactedPointsPerPathLimit);
  });
});

test("Borg compacted history coarsens on a stable absolute frame lattice", () => {
  const first = applyBorgLiveRunRetention({
    frameRows: createFrameRows({ frameSetCount: 10, pathCount: 1 }),
    policy: TEST_POLICY,
  });
  const second = applyBorgLiveRunRetention({
    frameRows: [
      ...first.frameRows,
      ...createFrameRows({ frameSetCount: 6, pathCount: 1, startFrameIndex: 10 }),
    ],
    compactedPathHistory: first.compactedPathHistory,
    policy: TEST_POLICY,
  });

  assert.deepEqual(
    second.compactedPathHistory[0].map((point) => point.frameIndex),
    [0, 4, 8, 12],
    "the capped path keeps absolute multiples of four instead of shifting samples",
  );
});

test("Borg live run retention snapshot reports compacted display-memory state", () => {
  const snapshot = createBorgLiveRunRetentionSnapshot({
    frameRows: createFrameRows({ frameSetCount: 2, pathCount: 2 }),
    compactedPathHistory: {
      0: [
        { frameIndex: 0, time: 0, position: { x: 0, y: 0, z: 0 } },
        { frameIndex: 1, time: 1, position: { x: 1, y: 0, z: 0 } },
      ],
    },
    policy: TEST_POLICY,
  });

  assert.equal(snapshot.schema, BORG_LIVE_RUN_RETENTION_POLICY_VERSION);
  assert.equal(snapshot.retainedFrameRows, 4);
  assert.equal(snapshot.compactedPathKeyCount, 1);
  assert.equal(snapshot.compactedPathPointCount, 2);
});

function createFrameRows({ frameSetCount, pathCount, startFrameIndex = 0 }) {
  const rows = [];
  for (let frameIndex = startFrameIndex; frameIndex < startFrameIndex + frameSetCount; frameIndex += 1) {
    for (let pathKey = 0; pathKey < pathCount; pathKey += 1) {
      rows.push({
        frameIndex,
        pathKey,
        time: frameIndex,
        position: {
          x: frameIndex,
          y: pathKey,
          z: 0,
        },
      });
    }
  }
  return rows;
}

function uniqueFrameIndexes(frameRows) {
  return [...new Set(frameRows.map((row) => row.frameIndex))].sort((left, right) => left - right);
}

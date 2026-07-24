import assert from "node:assert/strict";
import test from "node:test";

import {
  createBorgWorkspaceSnapshotState,
  disposeBorgWorkspaceSnapshotRunners,
  restoreBorgWorkspaceState,
} from "../src/apps/borg/BorgWorkspaceState.js";

test("Borg workspace snapshots omit stale asynchronous orchestration state", () => {
  const runner = { dispose() {} };
  const pending = Promise.resolve();
  const snapshot = createBorgWorkspaceSnapshotState({
    dynamicRunGeneration: 7,
    playbackPrefillPromise: pending,
    dynamicChunkPromise: pending,
    dynamicChunkStartedAt: 123,
    dynamicRunner: runner,
    activeLayers: new Set(["path-history"]),
    playing: true,
    playbackRequested: true,
    playFrameRequestId: 42,
    playFrameRequestKind: "animation",
  });

  assert.equal("dynamicRunGeneration" in snapshot, false);
  assert.equal("playbackPrefillPromise" in snapshot, false);
  assert.equal(snapshot.dynamicChunkPromise, null);
  assert.equal(snapshot.dynamicChunkStartedAt, null);
  assert.equal(snapshot.playing, false);
  assert.equal(snapshot.playbackRequested, false);
  assert.equal(snapshot.dynamicRunner, runner);

  const restored = restoreBorgWorkspaceState(
    { dynamicRunGeneration: 19 },
    snapshot,
  );
  assert.equal(restored.dynamicRunGeneration, 20);
  assert.equal(restored.playbackPrefillPromise, null);
  assert.notEqual(restored.activeLayers, snapshot.activeLayers);
  assert.deepEqual([...restored.activeLayers], ["path-history"]);
});

test("Borg unmount disposes every distinct snapshotted runner exactly once", () => {
  const disposed = [];
  const snapshottedRunner = { dispose: () => disposed.push("snapshot") };
  const activeRunner = { dispose: () => disposed.push("active") };
  const snapshots = new Map([
    ["random", { state: { dynamicRunner: snapshottedRunner } }],
    ["same-runner", { state: { dynamicRunner: snapshottedRunner } }],
    ["active", { state: { dynamicRunner: activeRunner } }],
  ]);

  assert.equal(
    disposeBorgWorkspaceSnapshotRunners(snapshots, { activeRunner }),
    1,
  );
  assert.deepEqual(disposed, ["snapshot"]);
  assert.equal(snapshots.size, 0);
});

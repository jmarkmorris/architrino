import test from "node:test";
import assert from "node:assert/strict";

import { createAnimatorTimelineOverlayRuntime } from "../src/apps/animator/AnimatorTimelineOverlayRuntime.js";

function createClassListRecorder() {
  const values = new Map();
  return {
    values,
    toggle(name, enabled) {
      values.set(name, !!enabled);
    },
  };
}

test("animator timeline overlay runtime parses authored transfers", () => {
  const runtime = createAnimatorTimelineOverlayRuntime({
    sanitizeEntityId(value, fallback = "") {
      const cleaned = String(value ?? "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9_-]+/g, "_")
        .replace(/^_+|_+$/g, "");
      return cleaned || fallback;
    },
  });

  const parsed = runtime.parseAnimatorTransfers(`
assembly_a.alpha -> assembly_b.beta @ 12.5
bad line
assembly_c.gamma -> assembly_d.delta
  `);

  assert.equal(parsed.entries.length, 2);
  assert.equal(parsed.entries[0]?.id, "transfer_authored_2");
  assert.deepEqual(parsed.entries[0]?.source, { assemblyId: "assembly_a", memberId: "alpha" });
  assert.deepEqual(parsed.entries[0]?.target, { assemblyId: "assembly_b", memberId: "beta" });
  assert.equal(parsed.entries[0]?.t, 12.5);
  assert.equal(parsed.entries[1].t, null);
  assert.deepEqual(parsed.errors, [3]);
});

test("animator timeline overlay runtime reads timing state from pause and warp inputs", () => {
  const runtime = createAnimatorTimelineOverlayRuntime({
    dom: {
      sceneDurationInput: { value: "12" },
      sceneLoopInput: { checked: true },
      pauseListInput: { value: "1, 2\n8, 0\n4, 3" },
      warpListInput: { value: "3, 6, 0.5\nbad\n9, 10, 2" },
    },
  });

  const timing = runtime.readAnimatorTimingState();

  assert.equal(timing.time.end, 12);
  assert.equal(timing.time.loop, true);
  assert.equal(timing.pauses.length, 2);
  assert.deepEqual(timing.pauses[0], {
    id: "pause_authored_1",
    start: 1,
    duration: 2,
  });
  assert.equal(timing.timeWarps.length, 2);
  assert.deepEqual(timing.diagnostics.pauseErrorLines, [2]);
  assert.deepEqual(timing.diagnostics.warpErrorLines, [2]);
});

test("animator timeline overlay runtime updates diagnostics using document markers", () => {
  const markerStatus = { textContent: "", classList: createClassListRecorder() };
  const pauseStatus = { textContent: "", classList: createClassListRecorder() };
  const warpStatus = { textContent: "", classList: createClassListRecorder() };
  const transferStatus = { textContent: "", classList: createClassListRecorder() };
  const markerListInput = { classList: createClassListRecorder() };
  const pauseListInput = { classList: createClassListRecorder() };
  const warpListInput = { classList: createClassListRecorder() };
  const transferListInput = { classList: createClassListRecorder() };

  const runtime = createAnimatorTimelineOverlayRuntime({
    dom: {
      markerStatus,
      pauseStatus,
      warpStatus,
      transferStatus,
      markerListInput,
      pauseListInput,
      warpListInput,
      transferListInput,
    },
  });

  const statusModels = runtime.updateAnimatorTimingDiagnostics(
    {
      scene: {
        markers: [{ id: "m1" }, { id: "m2" }],
        pauses: [{ id: "p1" }],
        timeWarps: [{ id: "w1" }],
      },
      transfers: [{ id: "t1" }],
    },
    {
      markerHasInput: true,
      pauseHasInput: true,
      warpHasInput: true,
      transferHasInput: true,
      markerErrorLines: [],
      pauseErrorLines: [3],
      warpErrorLines: [],
      transferErrorLines: [],
    }
  );

  assert.equal(statusModels.markerStatus.text, "Parsed 2 timeline notes.");
  assert.equal(statusModels.pauseStatus.invalid, true);
  assert.equal(markerStatus.textContent, "Parsed 2 timeline notes.");
  assert.equal(pauseStatus.classList.values.get("is-invalid"), true);
  assert.equal(warpStatus.classList.values.get("is-invalid"), false);
  assert.equal(transferStatus.textContent, "Parsed 1 transfer.");
  assert.equal(pauseListInput.classList.values.get("is-invalid"), true);
});

test("animator timeline overlay runtime resolves graphic targets and target radius", () => {
  const runtime = createAnimatorTimelineOverlayRuntime({
    vectorFromTriplet([x = 0, y = 0, z = 0]) {
      return {
        x,
        y,
        z,
        length() {
          return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
        },
      };
    },
    normalizeMemberList(members) {
      return Array.isArray(members) ? members : [];
    },
    normalizeSubassemblyList(subassemblies) {
      return Array.isArray(subassemblies) ? subassemblies : [];
    },
    isBareArchitrinoAssembly() {
      return false;
    },
  });

  const assemblyCenters = new Map([
    [
      "assembly_a",
      {
        clone() {
          return { kind: "center" };
        },
      },
    ],
  ]);
  const documentData = {
    paths: [
      {
        metadata: { ownerAssemblyId: "assembly_b" },
        payload: { points: [[1, 2, 3]] },
      },
    ],
  };

  assert.deepEqual(
    runtime.resolveAnimatorGraphicTargetPosition(
      { type: "assembly", assemblyId: "assembly_a" },
      assemblyCenters,
      documentData
    ),
    { kind: "center" }
  );
  const pathPoint = runtime.resolveAnimatorGraphicTargetPosition(
    { type: "path_point", assemblyId: "assembly_b", pointIndex: 0 },
    assemblyCenters,
    documentData
  );
  assert.equal(pathPoint?.x, 1);
  assert.equal(pathPoint?.y, 2);
  assert.equal(pathPoint?.z, 3);
  assert.equal(typeof pathPoint?.length, "function");
  assert.equal(
    runtime.getAnimatorAssemblyGraphicTargetRadius({
      members: [{ id: "a" }, { id: "b" }],
      subassemblies: [{ position: [1, 0, 0], members: ["c"] }],
    }) > 1,
    true
  );
});

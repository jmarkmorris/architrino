import test from "node:test";
import assert from "node:assert/strict";

import {
  createAnimatorDefaultCoreSpec,
  createAnimatorDefaultPathPoints,
  createDefaultAnimatorAssemblyDraft,
  sanitizeAnimatorEntityId,
  sanitizeAnimatorId,
} from "../src/apps/animator/AnimatorDraftScaffoldRuntime.js";

test("animator draft scaffold sanitizes scene and entity ids", () => {
  assert.equal(sanitizeAnimatorId(" My Scene! "), "my_scene");
  assert.equal(sanitizeAnimatorId(""), "animator_scene");
  assert.equal(sanitizeAnimatorEntityId(" Proton A "), "proton_a");
  assert.equal(sanitizeAnimatorEntityId("", "fallback_id"), "fallback_id");
});

test("animator draft scaffold builds default path points relative to the anchor", () => {
  assert.deepEqual(createAnimatorDefaultPathPoints([1, 2, 3]), [
    [1, 2, 3],
    [3.35, 3.2, 3.6],
    [5.1, 2.55, 2.3],
    [6.6, 3.45, 3.25],
  ]);
});

test("animator draft scaffold builds the default primary assembly draft and core", () => {
  const draft = createDefaultAnimatorAssemblyDraft(0);
  const core = createAnimatorDefaultCoreSpec("assembly_9", { binaryCount: 2 });

  assert.equal(draft.id, "assembly_1");
  assert.equal(draft.name, "Primary Assembly");
  assert.equal(draft.members.length, 6);
  assert.equal(draft.pathPoints.length, 4);
  assert.equal(draft.core?.coreType, "noether");
  assert.equal(core.binaries.length, 2);
  assert.equal(core.shells.length, 4);
  assert.deepEqual(core.alignment.planeNormals, [
    [0, 1, 0],
    [1, 0, 0],
  ]);
});

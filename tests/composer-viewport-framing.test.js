import test from "node:test";
import assert from "node:assert/strict";

import {
  formatComposerViewportFramingSummary,
  getComposerActiveCameraPathId,
  normalizeComposerCameraShots,
  resolveComposerViewportFramingState,
} from "../src/runtime/ComposerViewportFramingRuntime.js";

test("camera shot normalization upgrades legacy framing strings into authored framing objects", () => {
  const shots = normalizeComposerCameraShots(
    [
      {
        id: "shot_1",
        cameraPath: "camera_close",
        framing: "tight",
      },
    ],
    "camera_main",
    0,
    24
  );

  assert.equal(shots.length, 1);
  assert.deepEqual(shots[0].framing, {
    preset: "tight",
    autoscale: "manual",
    defaultAssemblyPolicy: "optional",
    requiredAssemblyIds: [],
    optionalAssemblyIds: [],
  });
});

test("active camera path follows the current shot before falling back to the scene default", () => {
  const documentData = {
    scene: {
      time: { start: 0, end: 24 },
      view: { activeCameraPath: "camera_wide" },
    },
    cameraPaths: [{ id: "camera_wide" }, { id: "camera_close" }],
    cameraShots: normalizeComposerCameraShots(
      [
        {
          id: "shot_1",
          cameraPath: "camera_close",
          timing: { start: 4, fadeIn: 0, hold: 6, fadeOut: 0 },
          framing: { preset: "medium" },
        },
      ],
      "camera_wide",
      0,
      24
    ),
  };

  assert.equal(getComposerActiveCameraPathId(documentData, 2), "camera_wide");
  assert.equal(getComposerActiveCameraPathId(documentData, 5), "camera_close");
});

test("viewport framing state merges assembly keep-in-view defaults with shot overrides", () => {
  const documentData = {
    scene: {
      time: { start: 0, end: 24 },
      view: { activeCameraPath: "camera_main" },
    },
    assemblies: [
      { id: "assembly_a", metadata: { viewport: { keepInView: true } } },
      { id: "assembly_b" },
      { id: "assembly_c" },
    ],
    cameraPaths: [{ id: "camera_main" }],
    cameraShots: normalizeComposerCameraShots(
      [
        {
          id: "shot_1",
          cameraPath: "camera_main",
          timing: { start: 0, fadeIn: 0, hold: 24, fadeOut: 0 },
          framing: {
            preset: "wide",
            autoscale: "keep_required",
            requiredAssemblyIds: ["assembly_b"],
            optionalAssemblyIds: ["assembly_a"],
          },
        },
      ],
      "camera_main",
      0,
      24
    ),
  };

  const state = resolveComposerViewportFramingState(documentData, 8, {
    start: 0,
    end: 24,
  });

  assert.deepEqual(state.requiredAssemblyIds.sort(), ["assembly_b"]);
  assert.deepEqual(state.optionalAssemblyIds.sort(), ["assembly_a", "assembly_c"]);
  assert.equal(
    formatComposerViewportFramingSummary(state),
    "1 required • 2 optional • wide • keep_required"
  );
});

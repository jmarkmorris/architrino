import test from "node:test";
import assert from "node:assert/strict";

import {
  computeAnimatorViewportAutoscaleCameraState,
  formatAnimatorViewportFramingSummary,
  getAnimatorViewportAutoscaleTargetIds,
  getAnimatorActiveCameraPathId,
  normalizeAnimatorCameraShots,
  resolveAnimatorViewportFramingState,
} from "../src/runtime/AnimatorViewportFramingRuntime.js";

test("camera shot normalization upgrades legacy framing strings into authored framing objects", () => {
  const shots = normalizeAnimatorCameraShots(
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
    autoscale: "keep_required",
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
    cameraShots: normalizeAnimatorCameraShots(
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

  assert.equal(getAnimatorActiveCameraPathId(documentData, 2), "camera_wide");
  assert.equal(getAnimatorActiveCameraPathId(documentData, 5), "camera_close");
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
    cameraShots: normalizeAnimatorCameraShots(
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

  const state = resolveAnimatorViewportFramingState(documentData, 8, {
    start: 0,
    end: 24,
  });

  assert.deepEqual(state.requiredAssemblyIds.sort(), ["assembly_b"]);
  assert.deepEqual(state.optionalAssemblyIds.sort(), ["assembly_a", "assembly_c"]);
  assert.equal(
    formatAnimatorViewportFramingSummary(state),
    "1 required • 2 optional • wide • keep_required"
  );
});

test("autoscale target ids use required assemblies only and stay inactive without authored targets", () => {
  assert.deepEqual(
    getAnimatorViewportAutoscaleTargetIds(
      {
        framing: { autoscale: "keep_required" },
        requiredAssemblyIds: ["assembly_b"],
        optionalAssemblyIds: ["assembly_a"],
      },
      ["assembly_a", "assembly_b", "assembly_c"]
    ),
    ["assembly_b"]
  );

  assert.deepEqual(
    getAnimatorViewportAutoscaleTargetIds(
      {
        framing: { autoscale: "keep_required" },
        requiredAssemblyIds: [],
        optionalAssemblyIds: ["assembly_a"],
      },
      ["assembly_a", "assembly_b", "assembly_c"]
    ),
    []
  );
});

test("autoscale camera state recenters on the target set and only expands distance when needed", () => {
  const state = computeAnimatorViewportAutoscaleCameraState({
    cameraState: {
      position: { x: 0, y: 0, z: 5 },
      lookAt: { x: 0, y: 0, z: 0 },
    },
    targetSpheres: [
      { id: "assembly_a", center: { x: -2, y: 0, z: 0 }, radius: 0.75 },
      { id: "assembly_b", center: { x: 2, y: 0, z: 0 }, radius: 0.75 },
    ],
    verticalFovDegrees: 45,
    aspect: 1.6,
  });

  assert.ok(state);
  assert.deepEqual(state.targetIds.sort(), ["assembly_a", "assembly_b"]);
  assert.equal(state.lookAt.x, 0);
  assert.equal(state.lookAt.y, 0);
  assert.equal(state.lookAt.z, 0);
  assert.ok(state.requiredDistance > 5);
  assert.ok(state.position.z > 5);
});

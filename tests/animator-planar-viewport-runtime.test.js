import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { normalizeAnimatorSceneDocument } from "../src/runtime/Animator2SceneDocumentRuntime.js";
import {
  computeAnimatorPlanarCameraState,
  getAnimatorInitialViewportProjection,
  isAnimatorPlanarSimulationDocument,
  normalizeAnimatorViewportProjection,
} from "../src/apps/animator/AnimatorPlanarViewportRuntime.js";

function readFixtureDocument() {
  const fixtureUrl = new URL(
    "../content/archive/pdg/animator-simulation-fixture.json",
    import.meta.url
  );
  return JSON.parse(readFileSync(fixtureUrl, "utf8")).scene.animator.document;
}

test("animator planar viewport runtime detects planar simulation documents", () => {
  const documentData = normalizeAnimatorSceneDocument(readFixtureDocument());

  assert.equal(normalizeAnimatorViewportProjection("2d"), "planar-2d");
  assert.equal(documentData.scene.mode, "planar-2d");
  assert.equal(isAnimatorPlanarSimulationDocument(documentData), true);
  assert.equal(getAnimatorInitialViewportProjection(documentData), "planar-2d");
  assert.equal(getAnimatorInitialViewportProjection({ scene: { mode: "3d" } }), "3d");
});

test("animator planar viewport runtime frames the full planar fixture path", () => {
  const documentData = normalizeAnimatorSceneDocument(readFixtureDocument());
  const cameraState = computeAnimatorPlanarCameraState(documentData, {
    aspect: 1,
    verticalFovDegrees: 45,
    minDistance: 6,
  });

  assert.equal(cameraState.projection, "planar-2d");
  assert.equal(Number(cameraState.lookAt[2].toFixed(3)), 0);
  assert.equal(cameraState.position[2] > 6, true);
  assert.equal(cameraState.bounds.minX <= -6.55, true);
  assert.equal(cameraState.bounds.maxX >= 6.55, true);
  assert.equal(cameraState.bounds.minY <= -2.35, true);
  assert.equal(cameraState.bounds.maxY >= 2.35, true);
});

test("animator planar viewport runtime ignores live assembly centers by default", () => {
  const documentData = normalizeAnimatorSceneDocument(readFixtureDocument());
  const stableCameraState = computeAnimatorPlanarCameraState(documentData, {
    aspect: 1,
    verticalFovDegrees: 45,
    minDistance: 6,
  });
  const shiftedCameraState = computeAnimatorPlanarCameraState(documentData, {
    aspect: 1,
    verticalFovDegrees: 45,
    minDistance: 6,
    assemblyCenters: new Map([
      ["solver_particle_e", { x: -100, y: -100, z: 0 }],
      ["solver_particle_p", { x: 100, y: 100, z: 0 }],
    ]),
  });

  assert.deepEqual(shiftedCameraState.position, stableCameraState.position);
  assert.deepEqual(shiftedCameraState.lookAt, stableCameraState.lookAt);
  assert.deepEqual(shiftedCameraState.bounds, stableCameraState.bounds);
});

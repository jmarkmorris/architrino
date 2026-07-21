import assert from "node:assert/strict";
import test from "node:test";

import * as THREE from "../vendor/three/three.module.js";
import { createBorgAssemblyViewScene } from "../src/apps/borg/BorgAssemblyViewScene.js";

test("Borg merges coincident binary axes and renders light-purple chart curves", () => {
  const root = new THREE.Group();
  let renderCount = 0;
  const scene = createBorgAssemblyViewScene({
    group: root,
    toWorld(source, target) {
      return target.set(Number(source.x), Number(source.y), Number(source.z));
    },
    render() {
      renderCount += 1;
    },
  });
  const binary = (id, normal) => ({
    id,
    frequency: 0.25,
    planeOrientation: { normal },
    axisPoint: { x: 0, y: 0, z: 0 },
    axisDisplayHalfLength: 0.45,
  });
  scene.setRecord({
    dataset: {
      window: { start: 0 },
      binaries: [
        binary("I", { x: 0, y: 0, z: 1 }),
        binary("M", { x: 0, y: 0, z: 1 }),
        binary("O", { x: 0, y: 0, z: 1 }),
      ],
      ansatz: [{
        id: "curve",
        points: [{ x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }],
      }],
    },
  });

  const axisGroup = root.children.find((child) =>
    child.userData.kind === "source-carried-binary-axes"
  );
  const ansatzGroup = root.children.find((child) =>
    child.userData.kind === "source-carried-ansatz-curves"
  );
  assert.equal(axisGroup.children.length, 1);
  assert.deepEqual(
    axisGroup.children[0].userData.sourceBinaryIds,
    ["I", "M", "O"],
  );
  assert.equal(axisGroup.children[0].userData.coincidentSourceCount, 3);
  assert.equal(axisGroup.children[0].material.isLineBasicMaterial, true);
  assert.equal(ansatzGroup.children.length, 1);
  assert.equal(ansatzGroup.children[0].material.color.getHex(), 0xc6b6ff);

  scene.setDisplayMode("chart-pose");
  assert.equal(axisGroup.visible, true);
  assert.equal(ansatzGroup.visible, true);
  scene.setPathVisible(false);
  assert.equal(axisGroup.visible, true);
  assert.equal(ansatzGroup.visible, false);
  scene.setPathVisible(true);
  assert.equal(ansatzGroup.visible, true);
  scene.setDisplayMode("animated");
  assert.equal(axisGroup.visible, true);
  assert.equal(ansatzGroup.visible, false);

  scene.setRecord({
    dataset: {
      window: { start: 0 },
      binaries: [
        binary("I", { x: 0, y: 0, z: 1 }),
        binary("M", { x: 0, y: 0, z: -1 }),
        binary("O", { x: 1, y: 0, z: 0 }),
      ],
      ansatz: [],
    },
  });
  assert.equal(axisGroup.children.length, 2);
  assert.deepEqual(axisGroup.children[0].userData.sourceBinaryIds, ["I", "M"]);
  assert.deepEqual(axisGroup.children[1].userData.sourceBinaryIds, ["O"]);
  assert.ok(renderCount >= 3);
  scene.dispose();
  assert.equal(root.children.length, 0);
});

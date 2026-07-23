import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import * as THREE from "../vendor/three/three.module.js";
import { createBorgAssemblyViewScene } from "../src/apps/borg/BorgAssemblyViewScene.js";
import { createEomHistoryDataset } from "../src/apps/shared/EomHistoryDataset.mjs";

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

test("canonical prescribed records render one axis per distinct geometric line", () => {
  const cases = [
    ["family-a-a1-general.assembly-view-record.v0.json", 3],
    ["illustrative-spindle-chart-hypothesis.assembly-view-record.v0.json", 1],
    ["family-c-c1-co-rotating-general.assembly-view-record.v0.json", 1],
    ["family-c-c2-counter-rotating-general.assembly-view-record.v0.json", 1],
    ["family-c-c1-co-rotating-b1-pair.assembly-view-record.v0.json", 1],
    ["family-c-c2-counter-rotating-b1-pair.assembly-view-record.v0.json", 1],
  ];
  for (const [filename, expectedAxisCount] of cases) {
    const record = JSON.parse(readFileSync(new URL(
      `../content/assets/borg/records/${filename}`,
      import.meta.url,
    )));
    const root = new THREE.Group();
    const scene = createBorgAssemblyViewScene({
      group: root,
      toWorld(source, target) {
        return target.set(Number(source.x), Number(source.y), Number(source.z));
      },
      render() {},
    });
    scene.setRecord({ dataset: createEomHistoryDataset(record) });
    const axisGroup = root.children.find((child) =>
      child.userData.kind === "source-carried-binary-axes"
    );
    assert.equal(axisGroup.children.length, expectedAxisCount, filename);
    scene.dispose();
  }
});

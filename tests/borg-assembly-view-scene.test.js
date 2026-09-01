import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import * as THREE from "../vendor/three/three.module.js";
import { createBorgAssemblyViewScene } from "../src/apps/borg/BorgAssemblyViewScene.js";
import {
  borgCoRotatingCameraAvailable,
} from "../src/apps/borg/BorgAssemblyViewControls.js";
import {
  BORG_PRESCRIBED_DISPLAY_FRAME_CO_TRANSLATING,
} from "../src/apps/borg/BorgPrescribedTranslation.js";
import { createEomHistoryDataset } from "../src/apps/shared/EomHistoryDataset.mjs";

test("Borg merges coincident binary axes without unowned chart-path overlays", () => {
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
  assert.equal(axisGroup.children.length, 1);
  assert.deepEqual(
    axisGroup.children[0].userData.sourceBinaryIds,
    ["I", "M", "O"],
  );
  assert.equal(axisGroup.children[0].userData.coincidentSourceCount, 3);
  assert.equal(axisGroup.children[0].material.isLineBasicMaterial, true);
  assert.equal(root.children.some(child => child.userData.kind === "source-carried-ansatz-curves"), false);

  scene.setDisplayMode("chart-pose");
  assert.equal(axisGroup.visible, true);
  scene.setPathVisible(false);
  assert.equal(axisGroup.visible, true);
  scene.setPathVisible(true);
  scene.setDisplayMode("animated");
  assert.equal(axisGroup.visible, true);

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
    ["three-axis-circular-coincident-midpoints.assembly-view-record.v0.json", 3],
    ["axial-transverse-three-binary-interior.assembly-view-record.v0.json", 1],
    ["coincident-center-two-component-circular-co-rotating.assembly-view-record.v0.json", 1],
    ["coincident-center-two-component-circular-counter-rotating.assembly-view-record.v0.json", 1],
    ["coaxial-separated-two-component-circular-co-rotating.assembly-view-record.v0.json", 1],
    ["coaxial-separated-two-component-circular-counter-rotating.assembly-view-record.v0.json", 1],
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

test("prescribed strands and selected tubes share the finite no-future display window", () => {
  const root = new THREE.Group();
  const scene = createBorgAssemblyViewScene({
    group: root,
    toWorld(source, target) {
      return target.set(Number(source.x), Number(source.y), Number(source.z));
    },
    render() {},
  });
  const dataset = prescribedDataset({
    group: {
      centerAtEpoch: [0, 0, 0],
      velocity: [1, 0, 0],
    },
  });
  scene.setRecord({ sourceId: "translated", dataset });
  scene.setHistoryDepth(1);
  scene.updateTime(2);

  const pathGroup = root.children.find((child) =>
    child.userData.kind === "prescribed-path-history-strands"
  );
  const tubeGroup = root.children.find((child) =>
    child.userData.kind === "display-only-path-history-tubes"
  );
  const strand = pathGroup.children[0];
  assert.deepEqual(strand.geometry.drawRange, { start: 0, count: 2 });
  assert.equal(strand.frustumCulled, false);
  assert.ok(strand.geometry.boundingSphere);

  scene.setTranslationFrame(BORG_PRESCRIBED_DISPLAY_FRAME_CO_TRANSLATING);
  const coPositions = strand.geometry.getAttribute("position");
  assert.equal(strand.frustumCulled, false);
  assert.ok(strand.geometry.boundingSphere);
  assert.deepEqual(
    Array.from({ length: strand.geometry.drawRange.count }, (_, index) => coPositions.getX(index)),
    [0, 0],
  );

  scene.setSelectedWorldlineId("worldline-0");
  scene.setTubeOptions({ visible: true, radius: 0.04, opacity: 0.3 });
  assert.equal(tubeGroup.children.length, 1);
  assert.equal(tubeGroup.children[0].userData.throughTime, 2);
  assert.equal(tubeGroup.children[0].userData.historyDepth, 1);
  assert.equal(tubeGroup.children[0].userData.sourceRadius, 0.04);
  assert.equal(
    tubeGroup.children[0].userData.valueAuthority,
    "display-only-envelope-around-recorded-path-samples",
  );
  scene.setRecord({ sourceId: "replacement", dataset });
  scene.setHistoryDepth(1);
  scene.updateTime(2);
  scene.setSelectedWorldlineId("worldline-0");
  assert.equal(
    tubeGroup.children.length,
    0,
    "a record switch resets both the scene tube and the unchecked UI state",
  );
  scene.dispose();
});

test("co-rotating control availability follows the scene carrier", () => {
  const root = new THREE.Group();
  const scene = createBorgAssemblyViewScene({
    group: root,
    toWorld(source, target) {
      return target.set(Number(source.x), Number(source.y), Number(source.z));
    },
    render() {},
  });
  const noFrequency = prescribedDataset({ group: null });
  noFrequency.binaries = [{
    frequency: 0,
    planeOrientation: { normal: { x: 0, y: 0, z: 1 } },
  }];
  scene.setRecord({ sourceId: "no-frequency", dataset: noFrequency });
  assert.equal(
    borgCoRotatingCameraAvailable(() => scene.hasCoRotatingCarrier),
    false,
  );

  const rotating = prescribedDataset({ group: null });
  rotating.binaries = [{
    frequency: 0.25,
    planeOrientation: { normal: { x: 0, y: 0, z: 1 } },
  }];
  scene.setRecord({ sourceId: "rotating", dataset: rotating });
  assert.equal(
    borgCoRotatingCameraAvailable(() => scene.hasCoRotatingCarrier),
    true,
  );
  scene.dispose();
});

test("missing common translation preserves the fixed strand and rejects only co-translation", () => {
  const root = new THREE.Group();
  const scene = createBorgAssemblyViewScene({
    group: root,
    toWorld(source, target) {
      return target.set(Number(source.x), Number(source.y), Number(source.z));
    },
    render() {},
  });
  scene.setRecord({
    sourceId: "fixed-only",
    dataset: prescribedDataset({ group: null }),
  });
  const pathGroup = root.children.find((child) =>
    child.userData.kind === "prescribed-path-history-strands"
  );
  assert.equal(pathGroup.children.length, 1);
  assert.throws(
    () => scene.setTranslationFrame(
      BORG_PRESCRIBED_DISPLAY_FRAME_CO_TRANSLATING,
    ),
    /Missing carrier/,
  );
  scene.dispose();
});

function prescribedDataset({ group }) {
  const times = [0, 1, 2, 3];
  return {
    provenance: {
      engineId: "prescribed-geometry",
      prescribedGeometry: {
        coordinates: { ...(group == null ? {} : { group }), worldlines: [{ id: "worldline-0", operator: { kind: "inertial.v1" } }] },
      },
    },
    window: {
      start: 0,
      end: 3,
      sampleInterval: 1,
    },
    binaries: [],
    ansatz: [],
    worldlines: [{
      id: "worldline-0",
      pathKey: "path-0",
      polarity: 1,
    }],
    createFrameSamples() {
      return times.map((time) => ({
        time,
        states: [{
          worldlineId: "worldline-0",
          position: { x: time, y: time, z: 0 },
        }],
      }));
    },
    createTrailSamples({ time, depth, sampleCount }) {
      return Array.from({ length: sampleCount }, (_, index) => {
        const sampleTime = time - depth +
          depth * index / Math.max(1, sampleCount - 1);
        return {
          time: sampleTime,
          position: { x: sampleTime, y: sampleTime, z: 0 },
        };
      });
    },
  };
}

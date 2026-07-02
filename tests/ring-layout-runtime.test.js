import test from "node:test";
import assert from "node:assert/strict";

import { createSceneGraphRuntime } from "../src/runtime/SceneGraphRuntime.js";
import { normalizeRingLayoutOptions } from "../src/runtime/RingLayoutRuntime.js";

function createVector3(x = 0, y = 0, z = 0) {
  return {
    x,
    y,
    z,
    set(nextX = 0, nextY = 0, nextZ = 0) {
      this.x = nextX;
      this.y = nextY;
      this.z = nextZ;
      return this;
    },
    copy(source) {
      this.x = source?.x ?? 0;
      this.y = source?.y ?? 0;
      this.z = source?.z ?? 0;
      return this;
    },
    clone() {
      return createVector3(this.x, this.y, this.z);
    },
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    },
  };
}

class TestGroup {
  constructor() {
    this.children = [];
    this.position = createVector3();
  }

  add(child) {
    this.children.push(child);
  }
}

function createTestSceneGraphRuntime(nodes, layoutConfig) {
  const levels = new Map();
  const runtime = createSceneGraphRuntime({
    THREE: {
      Group: TestGroup,
    },
    levels,
    levelConfigs: {
      test_scene: {
        layout: "static",
        layoutType: "rings",
        layoutConfig,
        centerOn: layoutConfig?.centerNode ?? null,
        sceneName: "Test Scene",
        nodes,
        links: [],
      },
    },
    cloneNodeData(nodeData) {
      return JSON.parse(JSON.stringify(nodeData));
    },
    createNode(nodeData) {
      return {
        data: nodeData,
        group: new TestGroup(),
      };
    },
    layoutRootLevel() {},
    buildLevelLinks() {},
    updateLevelMotions() {},
  });
  return runtime.buildLevel("test_scene");
}

function uniqueRoundedCoordinateCount(positions, axis) {
  return new Set(positions.map((position) => position[axis].toFixed(2))).size;
}

test("ring layout options allow scenes to disable inner rings", () => {
  assert.equal(normalizeRingLayoutOptions().allowInnerRings, true);
  assert.equal(normalizeRingLayoutOptions({ allowInnerRings: false }).allowInnerRings, false);
  assert.equal(normalizeRingLayoutOptions({}, { allowInnerRings: false }).allowInnerRings, false);
  assert.equal(
    normalizeRingLayoutOptions({ allowInnerRings: true }, { allowInnerRings: false })
      .allowInnerRings,
    true
  );
});

test("ring layout centers overview and orders twelve sections from noon", () => {
  const nodes = [
    { id: "overview", name: "Overview", radius: 1 },
    ...Array.from({ length: 12 }, (_, index) => ({
      id: `section_${index + 1}`,
      name: `Section ${index + 1}`,
      radius: 1,
    })),
  ];

  const level = createTestSceneGraphRuntime(nodes, {
    type: "rings",
    centerNode: "overview",
    direction: "clockwise",
    order: "objects",
    allowInnerRings: false,
  });

  const overview = level.nodeById.get("overview");
  assert.deepEqual(
    [overview.group.position.x, overview.group.position.y, overview.group.position.z],
    [0, 0, 0]
  );

  const ringPositions = nodes
    .slice(1)
    .map((node) => level.nodeById.get(node.id).group.position);
  const ringRadius = ringPositions[0].length();
  assert.ok(ringRadius > 0);
  ringPositions.forEach((position) => {
    assert.ok(Math.abs(position.length() - ringRadius) < 0.01);
  });

  assert.equal(ringPositions[0].x, 0);
  assert.ok(ringPositions[0].y > 0);
  assert.ok(ringPositions[1].x > 0);
  assert.ok(ringPositions[1].y > 0);
});

test("ring layout keeps twelve or fewer auto nodes on the standard single circle", () => {
  for (let count = 2; count <= 12; count += 1) {
    const nodes = Array.from({ length: count }, (_, index) => ({
      id: `application_${count}_${index + 1}`,
      name: `Application ${index + 1}`,
      radius: 1,
    }));

    const level = createTestSceneGraphRuntime(nodes, {
      type: "rings",
      direction: "clockwise",
      order: "objects",
    });

    const ringPositions = nodes.map((node) => level.nodeById.get(node.id).group.position);
    const ringRadius = ringPositions[0].length();
    assert.ok(ringRadius > 0);
    ringPositions.forEach((position) => {
      assert.ok(Math.abs(position.length() - ringRadius) < 0.01);
    });
  }
});

test("ring layout switches fifteen or more auto nodes to grid", () => {
  const nodes = Array.from({ length: 15 }, (_, index) => ({
    id: `application_${index + 1}`,
    name: `Application ${index + 1}`,
    radius: 1,
  }));

  const level = createTestSceneGraphRuntime(nodes, {
    type: "rings",
    direction: "clockwise",
    order: "objects",
  });

  assert.equal(level.layoutType, "grid");

  const positions = nodes.map((node) => level.nodeById.get(node.id).group.position);
  assert.equal(uniqueRoundedCoordinateCount(positions, "x"), 5);
  assert.equal(uniqueRoundedCoordinateCount(positions, "y"), 3);
});

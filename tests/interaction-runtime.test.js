import test from "node:test";
import assert from "node:assert/strict";

import {
  createInteractionRuntime,
  findPointerCircleNode,
  findPointerLabelNode,
} from "../src/runtime/InteractionRuntime.js";

function createLabelNode(id, rect, style = {}) {
  return {
    data: { id },
    labelObject: {
      element: {
        style,
        getBoundingClientRect() {
          return rect;
        },
      },
    },
  };
}

test("findPointerLabelNode treats the full visible label as a node hit area", () => {
  const node = createLabelNode("notebook-entry", {
    left: 100,
    right: 360,
    top: 200,
    bottom: 260,
  });

  assert.equal(findPointerLabelNode([node], 358, 230), node);
  assert.equal(findPointerLabelNode([node], 361, 230), null);
});

test("findPointerLabelNode ignores labels hidden by scene transitions", () => {
  const rect = { left: 100, right: 360, top: 200, bottom: 260 };
  const hiddenNode = createLabelNode("hidden", rect, { visibility: "hidden" });
  const transparentNode = createLabelNode("transparent", rect, { opacity: "0" });

  assert.equal(findPointerLabelNode([hiddenNode, transparentNode], 200, 230), null);
});

test("findPointerLabelNode resolves overlapping labels by nearest center", () => {
  const wideNode = createLabelNode("wide", {
    left: 100,
    right: 400,
    top: 180,
    bottom: 280,
  });
  const closeNode = createLabelNode("close", {
    left: 240,
    right: 340,
    top: 210,
    bottom: 250,
  });

  assert.equal(findPointerLabelNode([wideNode, closeNode], 300, 230), closeNode);
});

test("findPointerCircleNode treats the entire projected sphere disk as interactive", () => {
  const node = { data: { id: "corner-sphere" } };
  const getScreenCircle = () => ({ centerX: 200, centerY: 300, radius: 40 });

  assert.equal(findPointerCircleNode([node], 239.9, 300, getScreenCircle), node);
  assert.equal(findPointerCircleNode([node], 240.1, 300, getScreenCircle), null);
});

test("findPointerCircleNode resolves overlapping projected spheres by nearest center", () => {
  const leftNode = { data: { id: "left" } };
  const rightNode = { data: { id: "right" } };
  const circles = new Map([
    [leftNode, { centerX: 100, centerY: 100, radius: 50 }],
    [rightNode, { centerX: 150, centerY: 100, radius: 50 }],
  ]);

  assert.equal(
    findPointerCircleNode([leftNode, rightNode], 140, 100, (node) => circles.get(node)),
    rightNode
  );
});

test("rapid missed taps cannot trigger implicit home navigation", () => {
  let resetCount = 0;
  let clickCount = 0;
  const canvas = {
    clientHeight: 800,
    setPointerCapture() {},
  };
  const runtime = createInteractionRuntime({
    canvas,
    camera: { top: 10, bottom: -10, zoom: 1 },
    worldGroup: { position: { x: 0, y: 0 } },
    zoomState: { active: false },
    applyZoom() {},
    isTransitionActive: () => false,
    getCurrentLevel: () => ({ id: "research-notebook" }),
    rootScenePath: "home",
    resetToRootScene() {
      resetCount += 1;
    },
    focusOnPointer: () => false,
    updateDetailHover() {},
    updateGenerationTransitionHover() {},
    setLastZoomGestureTime() {},
    onSuccessfulSphereClick() {
      clickCount += 1;
    },
  });

  for (const pointerId of [1, 2]) {
    runtime.onPointerDown({ pointerId, clientX: 358, clientY: 230 });
    runtime.onPointerUp({ pointerId, clientX: 358, clientY: 230 });
  }

  assert.equal(clickCount, 0);
  assert.equal(resetCount, 0);
});

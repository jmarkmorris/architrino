import test from "node:test";
import assert from "node:assert/strict";

import { createAnimatorCanvasBootstrapRuntime } from "../src/apps/animator/AnimatorCanvasBootstrapRuntime.js";

function createFakeButton() {
  const listeners = new Map();
  return {
    dataset: {},
    disabled: false,
    addEventListener(type, listener) {
      listeners.set(type, listener);
    },
    click() {
      listeners.get("click")?.({ preventDefault() {} });
    },
  };
}

function createFakeThree() {
  class Object3D {
    constructor() {
      this.children = [];
    }

    add(child) {
      this.children.push(child);
    }
  }

  return {
    WebGLRenderer: class {
      setPixelRatio() {}
      setClearColor() {}
    },
    Scene: class extends Object3D {},
    PerspectiveCamera: class {
      constructor() {
        this.rotation = {};
      }
    },
    Group: class extends Object3D {},
    Vector3: class {
      constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
      }
    },
    LineBasicMaterial: class {
      constructor(options = {}) {
        this.options = options;
      }
    },
    MeshBasicMaterial: class {
      constructor(options = {}) {
        this.options = options;
      }
    },
    BufferGeometry: class {
      setFromPoints(points) {
        this.points = points;
        return this;
      }
    },
    Line: class {
      constructor(geometry, material) {
        this.geometry = geometry;
        this.material = material;
      }
    },
    SphereGeometry: class {},
    Mesh: class {
      constructor(geometry, material) {
        this.geometry = geometry;
        this.material = material;
      }
    },
    Raycaster: class {},
  };
}

test("animator viewport display toggles do not rebuild the authoring preview", () => {
  const historyToggle = createFakeButton();
  let renderJsonPreviewCount = 0;
  let toggleKey = null;
  let applyDisplayCount = 0;

  const runtime = createAnimatorCanvasBootstrapRuntime({
    THREE: createFakeThree(),
    windowLike: { devicePixelRatio: 1 },
    dom: {
      animatorCanvas: {},
      hudViewportToggleBindings: [{ button: historyToggle, key: "showHistoryTraces" }],
    },
    operations: {
      renderAssemblyEditor() {},
      renderJsonPreview() {
        renderJsonPreviewCount += 1;
      },
      toggleViewportDisplayFlag(key) {
        toggleKey = key;
      },
      applyViewportDisplayState() {
        applyDisplayCount += 1;
      },
    },
  });

  runtime.initAnimatorCanvas();

  assert.equal(renderJsonPreviewCount, 1);
  historyToggle.click();
  assert.equal(toggleKey, "showHistoryTraces");
  assert.equal(applyDisplayCount, 1);
  assert.equal(renderJsonPreviewCount, 1);
});

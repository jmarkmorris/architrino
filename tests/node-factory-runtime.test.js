import test from "node:test";
import assert from "node:assert/strict";

import { createNodeFactory } from "../src/runtime/NodeFactoryRuntime.js";

class TestObject3D {
  constructor() {
    this.children = [];
    this.userData = {};
  }

  add(child) {
    this.children.push(child);
  }

  remove(child) {
    this.children = this.children.filter((entry) => entry !== child);
  }
}

class TestGeometry {
  constructor(...args) {
    this.args = args;
    this.disposed = false;
  }

  dispose() {
    this.disposed = true;
  }
}

class TestMaterial {
  constructor(options = {}) {
    Object.assign(this, options);
    this.options = options;
    this.opacity = options.opacity ?? 1;
    this.disposed = false;
  }

  dispose() {
    this.disposed = true;
  }
}

function createFakeElement() {
  return {
    className: "",
    innerHTML: "",
    style: {},
    classList: {
      add() {},
    },
  };
}

function installFakeDocument(t) {
  const previousDocument = globalThis.document;
  globalThis.document = {
    createElement() {
      return createFakeElement();
    },
  };
  t.after(() => {
    if (previousDocument === undefined) {
      delete globalThis.document;
      return;
    }
    globalThis.document = previousDocument;
  });
}

function createFakeThree() {
  return {
    Group: class extends TestObject3D {},
    Mesh: class extends TestObject3D {
      constructor(geometry, material) {
        super();
        this.geometry = geometry;
        this.material = material;
      }
    },
    LineSegments: class extends TestObject3D {
      constructor(geometry, material) {
        super();
        this.geometry = geometry;
        this.material = material;
      }
    },
    SphereGeometry: class extends TestGeometry {},
    EdgesGeometry: class extends TestGeometry {},
    TorusGeometry: class extends TestGeometry {},
    MeshBasicMaterial: TestMaterial,
    LineBasicMaterial: TestMaterial,
    DoubleSide: "DoubleSide",
    NormalBlending: "NormalBlending",
    AdditiveBlending: "AdditiveBlending",
  };
}

class TestCss2dObject {
  constructor(element) {
    this.element = element;
  }
}

function createFactory(THREE = createFakeThree()) {
  return createNodeFactory({
    THREE,
    CSS2DObject: TestCss2dObject,
    binaryStyle: {},
  });
}

test("center context sphere uses one dark-purple glow-thickness halo", (t) => {
  installFakeDocument(t);
  const THREE = createFakeThree();
  const factory = createFactory(THREE);

  const centerSphere = factory.createCenterContextSphere({
    title: "Architrino Assembly Architecture",
    countLabel: "12 sections",
    radius: 2,
  });

  assert.deepEqual(centerSphere.ring.geometry.args, [2.08, 0.12, 12, 64]);
  assert.equal(centerSphere.ring.material.color, "#25143a");
  assert.equal(centerSphere.ring.material.opacity, 0.34);
  assert.equal(centerSphere.ring.material.blending, THREE.NormalBlending);
  assert.equal(centerSphere.ring.userData.innerRim, undefined);
  assert.equal(centerSphere.ring.children.length, 0);
});

test("center context update removes any legacy inner rim", (t) => {
  installFakeDocument(t);
  const THREE = createFakeThree();
  const factory = createFactory(THREE);
  const centerSphere = factory.createCenterContextSphere({
    title: "Architrino Assembly Architecture",
    radius: 2,
  });
  const legacyInnerRim = new THREE.Mesh(
    new THREE.TorusGeometry(1.98, 0.036, 12, 64),
    new THREE.MeshBasicMaterial({ opacity: 0.4 })
  );
  centerSphere.ring.userData.innerRim = legacyInnerRim;
  centerSphere.ring.userData.innerRimBaseOpacity = 0.4;
  centerSphere.ring.userData.innerRimStyle = { ringScale: 0.99, ringThickness: 0.036 };
  centerSphere.ring.add(legacyInnerRim);

  factory.updateCenterContextSphere(centerSphere, {
    title: "Architrino Assembly Architecture",
    radius: 3,
  });

  assert.equal(centerSphere.ring.userData.innerRim, undefined);
  assert.equal(centerSphere.ring.userData.innerRimBaseOpacity, undefined);
  assert.equal(centerSphere.ring.userData.innerRimStyle, undefined);
  assert.equal(centerSphere.ring.children.includes(legacyInnerRim), false);
  assert.equal(legacyInnerRim.geometry.disposed, true);
  assert.equal(legacyInnerRim.material.disposed, true);
  assert.deepEqual(centerSphere.ring.geometry.args, [3.12, 0.18, 12, 64]);
});

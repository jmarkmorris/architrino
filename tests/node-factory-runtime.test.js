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
    Color: class {
      constructor(value) {
        this.value = value;
      }

      clone() {
        return new this.constructor(this.value);
      }

      multiplyScalar(value) {
        this.scalar = value;
        return this;
      }
    },
    MeshBasicMaterial: TestMaterial,
    MeshPhongMaterial: class extends TestMaterial {
      constructor(options = {}) {
        super(options);
        this.materialType = "MeshPhongMaterial";
      }
    },
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

test("center context sphere uses a dark-purple context shell instead of a halo ring", (t) => {
  installFakeDocument(t);
  const THREE = createFakeThree();
  const factory = createFactory(THREE);

  const centerSphere = factory.createCenterContextSphere({
    title: "Architrino Assembly Architecture",
    countLabel: "12 sections",
    radius: 2,
  });

  assert.equal(centerSphere.ring, undefined);
  assert.deepEqual(centerSphere.shell.geometry.args, [2.16, 32, 20]);
  assert.equal(centerSphere.shell.material.color, "#25143a");
  assert.equal(centerSphere.shell.material.opacity, 0.18);
  assert.equal(centerSphere.shell.material.blending, THREE.NormalBlending);
  assert.equal(centerSphere.shell.material.side, THREE.DoubleSide);
  assert.equal(centerSphere.mesh.material.materialType, "MeshPhongMaterial");
  assert.equal(centerSphere.mesh.material.opacity, 0.72);
  assert.equal(centerSphere.mesh.material.specular, "#d8c6ff");
  assert.equal(centerSphere.mesh.material.shininess, 6);
});

test("center context update removes any legacy inner rim", (t) => {
  installFakeDocument(t);
  const THREE = createFakeThree();
  const factory = createFactory(THREE);
  const centerSphere = factory.createCenterContextSphere({
    title: "Architrino Assembly Architecture",
    radius: 2,
  });
  const legacyRing = new THREE.Mesh(
    new THREE.TorusGeometry(2.08, 0.12, 12, 64),
    new THREE.MeshBasicMaterial({ opacity: 0.34 })
  );
  const legacyInnerRim = new THREE.Mesh(
    new THREE.TorusGeometry(1.98, 0.036, 12, 64),
    new THREE.MeshBasicMaterial({ opacity: 0.4 })
  );
  legacyRing.userData.innerRim = legacyInnerRim;
  legacyRing.userData.innerRimBaseOpacity = 0.4;
  legacyRing.userData.innerRimStyle = { ringScale: 0.99, ringThickness: 0.036 };
  legacyRing.add(legacyInnerRim);
  centerSphere.ring = legacyRing;
  centerSphere.group.add(legacyRing);

  factory.updateCenterContextSphere(centerSphere, {
    title: "Architrino Assembly Architecture",
    radius: 3,
  });

  assert.equal(centerSphere.ring, null);
  assert.equal(centerSphere.group.children.includes(legacyRing), false);
  assert.equal(centerSphere.shell.geometry.args[0], 3.24);
  assert.equal(legacyRing.geometry.disposed, true);
  assert.equal(legacyRing.material.disposed, true);
  assert.equal(legacyInnerRim.geometry.disposed, true);
  assert.equal(legacyInnerRim.material.disposed, true);
});

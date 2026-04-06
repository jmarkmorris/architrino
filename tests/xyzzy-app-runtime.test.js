import test from "node:test";
import assert from "node:assert/strict";

import { createXyzzyAppRuntime } from "../src/apps/xyzzy/XyzzyAppRuntime.js";
import { createDefaultXyzzyDocument } from "../src/apps/xyzzy/XyzzyDocumentRuntime.js";

class FakeElement {
  constructor() {
    this.textContent = "";
    this.children = [];
    this.listeners = new Map();
    this._innerHTML = "";
    this.disabled = false;
  }

  get innerHTML() {
    return this._innerHTML;
  }

  set innerHTML(value) {
    this._innerHTML = String(value ?? "");
    this.children = [];
  }

  appendChild(child) {
    this.children.push(child);
    return child;
  }

  addEventListener(type, listener) {
    this.listeners.set(type, listener);
  }
}

class FakeTextAreaElement extends FakeElement {
  constructor() {
    super();
    this.value = "";
  }
}

function withFakeDom(testBody) {
  return async () => {
    const previousWindow = globalThis.window;
    const previousDocument = globalThis.document;
    globalThis.window = {
      addEventListener() {},
    };
    globalThis.document = {
      createElement() {
        return new FakeElement();
      },
    };
    try {
      await testBody();
    } finally {
      globalThis.window = previousWindow;
      globalThis.document = previousDocument;
    }
  };
}

function createRuntimeHarness(options = {}) {
  const initialDocument = options.initialDocument ?? createDefaultXyzzyDocument();
  const statusElement = new FakeElement();
  const diagnosticsElement = new FakeElement();
  const jsonTextarea = new FakeTextAreaElement();
  const applyJsonButton = new FakeElement();
  const resetExampleButton = new FakeElement();
  const exportJsonButton = new FakeElement();
  const runtime = createXyzzyAppRuntime({
    root: new FakeElement(),
    statusElement,
    diagnosticsElement,
    jsonTextarea,
    applyJsonButton,
    resetExampleButton,
    exportJsonButton,
    initialDocument,
    renderSurface() {},
    downloadJsonImpl() {
      return true;
    },
  });

  return {
    runtime,
    statusElement,
    diagnosticsElement,
    jsonTextarea,
    exportJsonButton,
  };
}

test(
  "xyzzy app runtime authors a new neighboring-band spline with Shift-click and ignores duplicates",
  withFakeDom(async () => {
    const initialDocument = createDefaultXyzzyDocument();
    initialDocument.links = [];
    initialDocument.compositeLabels = [];
    const harness = createRuntimeHarness({ initialDocument });

    await harness.runtime.init();
    harness.runtime.handleObjectClick("assembly_reactant_neutron", { shiftKey: true });
    harness.runtime.handleObjectClick("operator_dissociate", { shiftKey: true });

    assert.equal(harness.runtime.getDocument().links.length, 1);
    assert.match(harness.statusElement.textContent, /routing column 6/);
    assert.match(harness.jsonTextarea.value, /"endpointA": "assembly_reactant_neutron"/);

    harness.runtime.handleObjectClick("assembly_reactant_neutron", { shiftKey: true });
    harness.runtime.handleObjectClick("operator_dissociate", { shiftKey: true });

    assert.equal(harness.runtime.getDocument().links.length, 1);
    assert.match(harness.statusElement.textContent, /ignored/);
  })
);

test(
  "xyzzy app runtime deletes a spline on plain click and rejects invalid JSON applies",
  withFakeDom(async () => {
    const initialDocument = createDefaultXyzzyDocument();
    initialDocument.compositeLabels = [];
    const harness = createRuntimeHarness({ initialDocument });

    await harness.runtime.init();
    const initialLinkId = harness.runtime.getDocument().links[0].id;
    harness.runtime.handleLinkClick(initialLinkId, { shiftKey: false });

    assert.equal(harness.runtime.getDocument().links.length, initialDocument.links.length - 1);
    assert.match(harness.statusElement.textContent, /Spline deleted/);

    harness.jsonTextarea.value = "{ this is not valid json";
    const applied = harness.runtime.handleApplyJson();

    assert.equal(applied, false);
    assert.match(harness.statusElement.textContent, /could not be parsed/);
    assert.equal(harness.diagnosticsElement.children.length > 0, true);
  })
);

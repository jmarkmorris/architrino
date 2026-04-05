import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { createReactionAppRuntime } from "../src/apps/reaction/ReactionAppRuntime.js";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

class FakeElement {
  constructor() {
    this.textContent = "";
    this.dataset = {};
    this.attributes = new Map();
    this.listeners = new Map();
  }

  addEventListener(type, listener) {
    this.listeners.set(type, listener);
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }
}

class FakeButtonElement extends FakeElement {
  constructor() {
    super();
    this.disabled = false;
  }
}

function withFakeDom(testBody) {
  return async () => {
    const previousWindow = globalThis.window;
    const previousHTMLElement = globalThis.HTMLElement;
    const previousHTMLButtonElement = globalThis.HTMLButtonElement;
    globalThis.window = {
      sessionStorage: null,
    };
    globalThis.HTMLElement = FakeElement;
    globalThis.HTMLButtonElement = FakeButtonElement;
    try {
      await testBody();
    } finally {
      globalThis.window = previousWindow;
      globalThis.HTMLElement = previousHTMLElement;
      globalThis.HTMLButtonElement = previousHTMLButtonElement;
    }
  };
}

function createCanvasRuntimeStub(initialSnapshot = { participants: [], mappings: [] }) {
  let currentSnapshot = initialSnapshot;
  const replaceCalls = [];
  let setActiveCalls = 0;
  return {
    replaceCalls,
    get setActiveCalls() {
      return setActiveCalls;
    },
    runtime: {
      getSnapshot() {
        return currentSnapshot;
      },
      replaceSnapshot(snapshot = {}) {
        replaceCalls.push(snapshot);
        currentSnapshot = snapshot;
        return currentSnapshot;
      },
      setActive() {
        setActiveCalls += 1;
      },
    },
  };
}

function createCommitRuntimeStub() {
  return {
    observeSnapshot() {
      return false;
    },
    reset() {},
    getCommitState(snapshot = {}) {
      const hasContent =
        (Array.isArray(snapshot?.participants) ? snapshot.participants.length : 0) > 0 ||
        (Array.isArray(snapshot?.mappings) ? snapshot.mappings.length : 0) > 0;
      return {
        hasContent,
        status: "draft",
        needsReaccept: false,
        canAccept: hasContent,
        canExport: false,
      };
    },
    buildExportReview() {
      return {
        status: "draft",
      };
    },
    acceptCurrentSnapshot() {
      return null;
    },
  };
}

function createReactionAppRuntimeHarness(options = {}) {
  const statusElement = new FakeElement();
  const reviewStateElement = new FakeElement();
  const acceptButton = new FakeButtonElement();
  const exportButton = new FakeButtonElement();
  const canvasRuntimeStub = createCanvasRuntimeStub(options.initialSnapshot);
  let defaultLibraryLoadCalls = 0;
  const runtime = createReactionAppRuntime({
    statusElement,
    reviewStateElement,
    acceptButton,
    exportButton,
    initialSolverRequest: options.initialSolverRequest ?? null,
    createCommitRuntime: () => createCommitRuntimeStub(),
    createCanvasRuntime: () => canvasRuntimeStub.runtime,
    createFlowExportRuntime: () => ({
      exportDocument() {
        return {};
      },
    }),
    loadDefaultReactionLibraryEntry: async () => {
      defaultLibraryLoadCalls += 1;
      return options.defaultLibraryPayload;
    },
  });
  return {
    runtime,
    statusElement,
    reviewStateElement,
    acceptButton,
    exportButton,
    canvasRuntimeStub,
    getDefaultLibraryLoadCalls: () => defaultLibraryLoadCalls,
  };
}

const defaultLibraryPayload = {
  entry: {
    id: "free_neutron_beta",
    title: "Free neutron beta decay",
  },
  snapshot: {
    participants: [
      {
        id: "reactant_neutron",
        side: "reactant",
        templateId: "neutron",
        label: "Neutron",
      },
    ],
    mappings: [],
  },
  exportOverrides: {
    reactionId: "free_neutron_beta_001",
    title: "Free Neutron Beta Reaction",
  },
};

test(
  "reaction app runtime loads the default built-in reaction when startup finds no authored session",
  withFakeDom(async () => {
    const harness = createReactionAppRuntimeHarness({
      initialSnapshot: { participants: [], mappings: [] },
      defaultLibraryPayload,
    });

    await harness.runtime.init();

    assert.equal(harness.getDefaultLibraryLoadCalls(), 1);
    assert.equal(harness.canvasRuntimeStub.setActiveCalls, 1);
    assert.equal(harness.canvasRuntimeStub.replaceCalls.length, 1);
    assert.deepEqual(harness.canvasRuntimeStub.replaceCalls[0], defaultLibraryPayload.snapshot);
    assert.equal(
      harness.statusElement.textContent,
      "Built-in reaction loaded: Free neutron beta decay. Accept it to emit accepted reaction-flow/v1 JSON downstream of review."
    );
    assert.equal(
      harness.reviewStateElement.textContent,
      "Draft. Accept this reaction to mark it downstream-ready."
    );
    assert.equal(harness.acceptButton.disabled, false);
    assert.equal(harness.exportButton.disabled, true);
  })
);

test(
  "reaction app runtime keeps an existing authored session instead of forcing the default built-in reaction",
  withFakeDom(async () => {
    const harness = createReactionAppRuntimeHarness({
      initialSnapshot: {
        participants: [
          {
            id: "existing_reactant",
            side: "reactant",
            templateId: "neutron",
            label: "Existing neutron",
          },
        ],
        mappings: [],
      },
      defaultLibraryPayload,
    });

    await harness.runtime.init();

    assert.equal(harness.getDefaultLibraryLoadCalls(), 0);
    assert.equal(harness.canvasRuntimeStub.replaceCalls.length, 0);
    assert.equal(
      harness.statusElement.textContent,
      "Reaction app ready. Use the left and right + controls to build a reaction."
    );
    assert.equal(
      harness.reviewStateElement.textContent,
      "Draft. Accept this reaction to mark it downstream-ready."
    );
  })
);

test(
  "reaction app runtime keeps solver-request startup imports ahead of the default built-in reaction",
  withFakeDom(async () => {
    const harness = createReactionAppRuntimeHarness({
      initialSnapshot: { participants: [], mappings: [] },
      defaultLibraryPayload,
      initialSolverRequest: readJson(
        "content/contracts/examples/pdg/v1/generated/free_neutron_beta_decay.solver-request.v1.json"
      ),
    });

    await harness.runtime.init();

    assert.equal(harness.getDefaultLibraryLoadCalls(), 0);
    assert.equal(harness.canvasRuntimeStub.replaceCalls.length, 1);
    assert.equal(
      harness.statusElement.textContent,
      "PDG review candidate loaded: Free neutron beta decay. Accept it to emit accepted reaction-flow/v1 JSON downstream of review."
    );
  })
);

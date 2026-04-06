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
    this.children = [];
    this.innerHTML = "";
    this.className = "";
    this.classList = {
      add: (...tokens) => {
        const current = new Set(String(this.className || "").split(/\s+/).filter(Boolean));
        tokens.forEach((token) => current.add(String(token)));
        this.className = [...current].join(" ");
      },
    };
  }

  addEventListener(type, listener) {
    this.listeners.set(type, listener);
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  appendChild(child) {
    this.children.push(child);
    return child;
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
    const previousDocument = globalThis.document;
    const previousHTMLElement = globalThis.HTMLElement;
    const previousHTMLButtonElement = globalThis.HTMLButtonElement;
    globalThis.window = {
      sessionStorage: null,
    };
    globalThis.document = {
      createElement(tagName) {
        if (tagName === "button") {
          return new FakeButtonElement();
        }
        return new FakeElement();
      },
    };
    globalThis.HTMLElement = FakeElement;
    globalThis.HTMLButtonElement = FakeButtonElement;
    try {
      await testBody();
    } finally {
      globalThis.window = previousWindow;
      globalThis.document = previousDocument;
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
    getSnapshotValidation(snapshot = {}) {
      const hasContent =
        (Array.isArray(snapshot?.participants) ? snapshot.participants.length : 0) > 0 ||
        (Array.isArray(snapshot?.mappings) ? snapshot.mappings.length : 0) > 0;
      return {
        valid: hasContent,
        diagnostics: [],
        message: "",
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
  let libraryEntries = [];
  let selectedLibraryId = "";
  let libraryPickerOnSelect = null;
  let defaultLibraryLoadCalls = 0;
  let specificLibraryLoadCalls = [];
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
    createLibraryPickerRuntime: (pickerOptions = {}) => {
      libraryPickerOnSelect =
        typeof pickerOptions?.onSelect === "function" ? pickerOptions.onSelect : null;
      return {
        setEntries(entries = [], pickerOptions = {}) {
          libraryEntries = [...entries];
          selectedLibraryId = String(pickerOptions?.selectedId ?? entries[0]?.id ?? "");
        },
        setSelectedId(entryId = "") {
          selectedLibraryId = String(entryId ?? "");
        },
        getSelectedId() {
          return selectedLibraryId;
        },
      };
    },
    builtInLibraryEntries: options.builtInLibraryEntries ?? [
      { id: "free_neutron_beta_decay", title: "Free neutron beta decay", isDefault: true },
      { id: "muon_decay", title: "Muon decay" },
      { id: "charged_pion_to_muon_neutrino", title: "Charged pion to muon neutrino" },
    ],
    loadDefaultReactionLibraryEntry: async () => {
      defaultLibraryLoadCalls += 1;
      return options.defaultLibraryPayload;
    },
    loadReactionLibraryEntry: async (entryId) => {
      specificLibraryLoadCalls.push(entryId);
      return options.libraryPayloads?.[entryId] ?? options.defaultLibraryPayload;
    },
  });
  return {
    runtime,
    statusElement,
    reviewStateElement,
    libraryEntries,
    getLibraryEntries: () => [...libraryEntries],
    getSelectedLibraryId: () => selectedLibraryId,
    setSelectedLibraryId: (entryId) => {
      selectedLibraryId = String(entryId ?? "");
    },
    async selectLibraryEntry(entryId) {
      selectedLibraryId = String(entryId ?? "");
      await Promise.resolve(libraryPickerOnSelect?.(selectedLibraryId));
    },
    acceptButton,
    exportButton,
    canvasRuntimeStub,
    getDefaultLibraryLoadCalls: () => defaultLibraryLoadCalls,
    getSpecificLibraryLoadCalls: () => specificLibraryLoadCalls,
  };
}

const defaultLibraryPayload = {
  entry: {
    id: "free_neutron_beta_decay",
    title: "Free neutron beta decay",
  },
  snapshot: {
    participants: [
      {
        id: "reactant_neutron_1",
        side: "reactant",
        templateId: "neutron",
        label: "Neutron",
      },
    ],
    mappings: [],
  },
  exportOverrides: {
    reactionId: "free_neutron_beta_decay",
    title: "Free neutron beta decay",
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
    assert.deepEqual(
      harness.getLibraryEntries().map((entry) => entry.id),
      ["free_neutron_beta_decay", "muon_decay", "charged_pion_to_muon_neutrino"]
    );
    assert.equal(harness.getSelectedLibraryId(), "free_neutron_beta_decay");
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
  "reaction app runtime lets the user load a specific built-in library entry from the selector",
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
      libraryPayloads: {
        muon_decay: {
          entry: {
            id: "muon_decay",
            title: "Muon decay",
          },
          snapshot: {
            participants: [
              {
                id: "reactant_pro_muon_1",
                side: "reactant",
                templateId: "muon",
                label: "Pro Muon",
              },
            ],
            mappings: [],
          },
          exportOverrides: {
            reactionId: "muon_decay",
            title: "Muon decay",
          },
        },
      },
    });

    await harness.runtime.init();
    harness.setSelectedLibraryId("muon_decay");
    await harness.runtime.loadSelectedBuiltInReactionLibraryEntry();

    assert.deepEqual(harness.getSpecificLibraryLoadCalls(), ["muon_decay"]);
    assert.equal(harness.canvasRuntimeStub.replaceCalls.length, 1);
    assert.equal(
      harness.statusElement.textContent,
      "Built-in reaction loaded: Muon decay. Accept it to emit accepted reaction-flow/v1 JSON downstream of review."
    );
  })
);

test(
  "reaction app runtime auto-loads the newly selected built-in library entry",
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
      libraryPayloads: {
        charged_pion_to_muon_neutrino: {
          entry: {
            id: "charged_pion_to_muon_neutrino",
            title: "Charged pion to muon neutrino",
          },
          snapshot: {
            participants: [
              {
                id: "reactant_positive_pion_1",
                side: "reactant",
                templateId: "pi_plus",
                label: "Positive Pion",
              },
            ],
            mappings: [],
          },
          exportOverrides: {
            reactionId: "charged_pion_to_muon_neutrino",
            title: "Charged pion to muon neutrino",
          },
        },
      },
    });

    await harness.runtime.init();
    await harness.selectLibraryEntry("charged_pion_to_muon_neutrino");

    assert.deepEqual(harness.getSpecificLibraryLoadCalls(), ["charged_pion_to_muon_neutrino"]);
    assert.equal(harness.canvasRuntimeStub.replaceCalls.length, 1);
    assert.equal(
      harness.statusElement.textContent,
      "Built-in reaction loaded: Charged pion to muon neutrino. Accept it to emit accepted reaction-flow/v1 JSON downstream of review."
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

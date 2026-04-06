import test from "node:test";
import assert from "node:assert/strict";

import { createReactionAnchorRenderRuntime } from "../src/apps/reaction/ReactionAnchorRenderRuntime.js";
import { createReactionBinaryGlyphRuntime } from "../src/apps/reaction/ReactionBinaryGlyphRuntime.js";
import { createReactionParticipantRenderRuntime } from "../src/apps/reaction/ReactionParticipantRenderRuntime.js";

class FakeElement {
  constructor() {
    this.type = "";
    this.className = "";
    this.dataset = {};
    this.disabled = false;
    this.attributes = new Map();
    this.listeners = new Map();
    this.children = [];
    this.textContent = "";
    this.style = {
      setProperty: () => {},
    };
    this.classList = {
      add: (...tokens) => {
        const current = new Set(String(this.className || "").split(/\s+/).filter(Boolean));
        tokens.forEach((token) => current.add(String(token)));
        this.className = [...current].join(" ");
      },
    };
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  addEventListener(type, listener) {
    this.listeners.set(type, listener);
  }

  appendChild(child) {
    this.children.push(child);
    return child;
  }

  append(...children) {
    children.forEach((child) => this.appendChild(child));
  }
}

test("reaction render runtimes expose the expected reaction-side render interfaces", () => {
  const anchorRenderRuntime = createReactionAnchorRenderRuntime();
  const binaryGlyphRuntime = createReactionBinaryGlyphRuntime();
  const participantRenderRuntime = createReactionParticipantRenderRuntime({
    buildNodeKey: (participantId, nodeId) => `${participantId}::${nodeId}`,
    createAnchorButton: () => ({ nodeType: "anchor" }),
    createBinaryGlyph: () => ({ nodeType: "glyph" }),
    createInlineAnchorSlot: () => ({ nodeType: "slot" }),
  });

  assert.equal(typeof anchorRenderRuntime.createAnchorButton, "function");
  assert.equal(typeof anchorRenderRuntime.createInlineAnchorSlot, "function");
  assert.equal(typeof binaryGlyphRuntime.createBinaryGlyph, "function");
  assert.equal(typeof participantRenderRuntime.renderParticipantCard, "function");
  assert.equal(typeof participantRenderRuntime.createOperatorParticipantCard, "function");
});

test("reaction anchor render runtime labels anchor buttons through the registry aria helper", () => {
  const previousDocument = globalThis.document;
  const previousHTMLElement = globalThis.HTMLElement;

  globalThis.document = {
    createElement() {
      return new FakeElement();
    },
  };
  globalThis.HTMLElement = FakeElement;

  try {
    const runtime = createReactionAnchorRenderRuntime();
    const anchor = runtime.createAnchorButton(
      { side: "reactant" },
      { label: "Pro Muon" },
      "reactant_pro_muon_1::root"
    );

    assert.equal(
      anchor.attributes.get("aria-label"),
      "Reactant attach point for Pro Muon"
    );
  } finally {
    globalThis.document = previousDocument;
    globalThis.HTMLElement = previousHTMLElement;
  }
});

test("reaction anchor render runtime stamps explicit terminal indices on anchor buttons", () => {
  const previousDocument = globalThis.document;
  const previousHTMLElement = globalThis.HTMLElement;

  globalThis.document = {
    createElement() {
      return new FakeElement();
    },
  };
  globalThis.HTMLElement = FakeElement;

  try {
    const runtime = createReactionAnchorRenderRuntime();
    const centerInputAnchor = runtime.createAnchorButton(
      { side: "reactant" },
      { label: "Pro Noether Core" },
      "center_core::root",
      {
        anchorRole: "center",
        anchorInstanceIndex: 0,
      }
    );
    const centerOutputAnchor = runtime.createAnchorButton(
      { side: "reactant" },
      { label: "Pro Noether Core" },
      "center_core::root",
      {
        anchorRole: "center",
        anchorInstanceIndex: 1,
      }
    );

    assert.equal(centerInputAnchor.dataset.anchorTerminalIndex, "0");
    assert.equal(centerOutputAnchor.dataset.anchorTerminalIndex, "1");
  } finally {
    globalThis.document = previousDocument;
    globalThis.HTMLElement = previousHTMLElement;
  }
});

test("reaction participant render runtime emits explicit center input and output anchors", () => {
  const previousDocument = globalThis.document;
  const previousHTMLElement = globalThis.HTMLElement;
  const anchorCalls = [];

  globalThis.document = {
    createElement() {
      return new FakeElement();
    },
  };
  globalThis.HTMLElement = FakeElement;

  try {
    const runtime = createReactionParticipantRenderRuntime({
      buildNodeKey: (participantId, nodeId) => `${participantId}::${nodeId}`,
      createAnchorButton: (_participant, _node, _nodeKey, options = {}) => {
        anchorCalls.push({
          role: options.anchorRole ?? null,
          anchorInstanceIndex: options.anchorInstanceIndex ?? null,
          extraClassNames: [...(options.extraClassNames ?? [])],
        });
        return new FakeElement();
      },
      createBinaryGlyph: () => new FakeElement(),
      createInlineAnchorSlot: () => new FakeElement(),
      getParticipantCardMeta: () => ({ accent: "#b889ff" }),
      getParticipantCardLabelLines: (label) => [label],
      getParticipantRootNode: (participant) => participant?.hierarchy?.[0] ?? null,
      isCenterAssemblyParticipant: (participant) => participant?.surfaceColumn === "center-assembly",
    });

    runtime.renderParticipantCard({
      id: "center_source_core",
      side: "reactant",
      surfaceColumn: "center-assembly",
      templateId: "noether_core",
      label: "Pro Noether core",
      hierarchy: [
        {
          id: "center_source_core_root",
          label: "Pro Noether core",
          renderMode: "label",
          children: [],
        },
      ],
    });

    assert.equal(
      anchorCalls.some(
        (call) =>
          call.role === "center" &&
          call.anchorInstanceIndex === 0 &&
          call.extraClassNames.includes("is-center-assembly-input")
      ),
      true
    );
    assert.equal(
      anchorCalls.some(
        (call) => call.role === "center" && call.anchorInstanceIndex === 1
      ),
      true
    );
  } finally {
    globalThis.document = previousDocument;
    globalThis.HTMLElement = previousHTMLElement;
  }
});

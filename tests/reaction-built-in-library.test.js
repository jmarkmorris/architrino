import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";

import { createReactionAnchorRenderRuntime } from "../src/apps/reaction/ReactionAnchorRenderRuntime.js";
import {
  DEFAULT_REACTION_BUILTIN_LIBRARY_ENTRY_ID,
  buildReactionSnapshotFromReactionFlowDocument,
  loadDefaultReactionBuiltInLibraryEntry,
  loadReactionBuiltInLibraryManifest,
  loadReactionBuiltInLibraryEntry,
} from "../src/apps/reaction/ReactionBuiltInLibraryRuntime.js";
import { parseReactionNodeKey } from "../src/apps/reaction/ReactionNodeKeyRuntime.js";
import { createReactionParticipantRenderRuntime } from "../src/apps/reaction/ReactionParticipantRenderRuntime.js";
import { buildReactionParticipantStructure } from "../src/apps/reaction/ReactionStructureBridgeRuntime.js";
import {
  buildReactionStructureDescriptorTree,
  shouldRenderReactionStructureDescriptorChildren,
} from "../src/apps/reaction/ReactionStructureDescriptorRuntime.js";

class FakeElement {
  constructor() {
    this.type = "";
    this.className = "";
    this.dataset = {};
    this.disabled = false;
    this.parentElement = null;
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
    if (child && typeof child === "object") {
      child.parentElement = this;
    }
    this.children.push(child);
    return child;
  }

  append(...children) {
    children.forEach((child) => this.appendChild(child));
  }
}

async function readJson(url) {
  return JSON.parse(await fs.readFile(url, "utf8"));
}

const FIXTURE_LIBRARY_MANIFEST = Object.freeze({
  schema: "reaction-built-in-library-manifest/v1",
  defaultEntryId: "muon_decay",
  entries: Object.freeze([
    Object.freeze({
      id: "muon_decay",
      title: "Muon decay",
      displayTitle: "Muon decay",
      description: "Fixture muon decay entry.",
      documentPath: "../../../content/contracts/examples/reaction-flow/muon_decay.v1.json",
      version: "fixture-muon",
      isDefault: true,
      solveExact: true,
    }),
    Object.freeze({
      id: "free_neutron_beta",
      title: "Free neutron beta decay",
      displayTitle: "Free neutron beta decay",
      description: "Fixture neutron entry.",
      documentPath: "../../../content/contracts/examples/reaction-flow/free_neutron_beta.v1.json",
      version: "fixture-neutron",
      solveExact: true,
    }),
    Object.freeze({
      id: "charged_pion_to_muon_neutrino",
      title: "Charged pion to muon neutrino",
      displayTitle: "Charged pion to muon neutrino",
      description: "Fixture pion entry.",
      documentPath: "../../../content/contracts/examples/reaction-flow/charged_pion_to_muon_neutrino.v1.json",
      version: "fixture-pion",
      solveExact: true,
    }),
  ]),
});

function createFixtureFetch() {
  return async function fetchFixture(url) {
    if (String(url).endsWith("content/generated/reaction-built-in-library/manifest.v1.json")) {
      return {
        ok: true,
        async json() {
          return FIXTURE_LIBRARY_MANIFEST;
        },
      };
    }
    const document = await readJson(url);
    return {
      ok: true,
      async json() {
        return document;
      },
    };
  };
}

function collectParticipantNodeIds(participant = {}) {
  const nodeIds = new Set();
  const queue = [...(Array.isArray(participant?.hierarchy) ? participant.hierarchy : [])];
  while (queue.length) {
    const node = queue.shift();
    if (!node || typeof node !== "object") {
      continue;
    }
    if (node.id) {
      nodeIds.add(node.id);
    }
    queue.push(...(Array.isArray(node.children) ? node.children : []));
  }
  return nodeIds;
}

function classifySnapshotLane(participant = {}) {
  if (participant?.side === "operator") {
    return Number(participant?.operatorLaneIndex) === 0 ? 2 : 4;
  }
  if (participant?.surfaceColumn === "center-assembly") {
    return 3;
  }
  if (participant?.side === "product") {
    return 5;
  }
  return 1;
}

function normalizeAnchorInstanceIndex(anchorInstanceIndex = null) {
  if (
    anchorInstanceIndex === null ||
    anchorInstanceIndex === undefined ||
    anchorInstanceIndex === ""
  ) {
    return null;
  }
  const normalized = Number(anchorInstanceIndex);
  return Number.isInteger(normalized) && normalized >= 0 ? normalized : null;
}

function buildRenderedAnchorKey(nodeKey = "", role = "", anchorInstanceIndex = null) {
  return `${nodeKey}|${String(role ?? "")}|${String(normalizeAnchorInstanceIndex(anchorInstanceIndex) ?? "null")}`;
}

function buildRenderedAnchorDirectionKey(nodeKey = "", direction = "output") {
  return `${nodeKey}|${String(direction ?? "")}`;
}

function getRenderedAnchorDirection(role = "", anchorInstanceIndex = null) {
  const normalizedRole = String(role ?? "");
  const normalizedAnchorInstanceIndex = normalizeAnchorInstanceIndex(anchorInstanceIndex);
  if (normalizedRole === "product" || normalizedRole === "operator-input") {
    return "input";
  }
  if (normalizedRole === "reactant" || normalizedRole === "operator-output") {
    return "output";
  }
  return normalizedAnchorInstanceIndex === 0 ? "input" : "output";
}

function collectRenderedAnchors(snapshot = {}) {
  const renderedElements = renderSnapshotElements(snapshot);
  const renderedAnchorMap = new Map();
  renderedElements.forEach((element) => {
    if (element?.dataset?.anchorKey && element?.dataset?.anchorSide) {
      renderedAnchorMap.set(
        buildRenderedAnchorKey(
          element.dataset.anchorKey,
          element.dataset.anchorSide,
          element.dataset.anchorInstanceIndex
        ),
        {
          nodeKey: element.dataset.anchorKey,
          role: element.dataset.anchorSide,
          anchorInstanceIndex: normalizeAnchorInstanceIndex(element.dataset.anchorInstanceIndex),
        }
      );
    }
  });
  return renderedAnchorMap;
}

function collectRenderedAnchorsByDirection(snapshot = {}) {
  const renderedElements = renderSnapshotElements(snapshot);
  const renderedAnchorMap = new Map();
  renderedElements.forEach((element) => {
    if (!(element?.dataset?.anchorKey && element?.dataset?.anchorSide)) {
      return;
    }
    const direction = getRenderedAnchorDirection(
      element.dataset.anchorSide,
      element.dataset.anchorInstanceIndex
    );
    const mapKey = buildRenderedAnchorDirectionKey(element.dataset.anchorKey, direction);
    const existingAnchors = renderedAnchorMap.get(mapKey) ?? [];
    existingAnchors.push({
      nodeKey: element.dataset.anchorKey,
      role: element.dataset.anchorSide,
      anchorInstanceIndex: normalizeAnchorInstanceIndex(element.dataset.anchorInstanceIndex),
      direction,
    });
    renderedAnchorMap.set(mapKey, existingAnchors);
  });
  return renderedAnchorMap;
}

function hasResolvedRenderedAnchor(
  renderedAnchorMap = new Map(),
  renderedAnchorsByDirection = new Map(),
  nodeKey = "",
  role = "",
  anchorInstanceIndex = null,
  endpoint = "source"
) {
  if (renderedAnchorMap.has(buildRenderedAnchorKey(nodeKey, role, anchorInstanceIndex))) {
    return true;
  }
  const direction = endpoint === "target" ? "input" : "output";
  return (
    (renderedAnchorsByDirection.get(
      buildRenderedAnchorDirectionKey(nodeKey, direction)
    )?.length ?? 0) === 1
  );
}

function renderSnapshotElements(snapshot = {}) {
  const previousDocument = globalThis.document;
  const previousHTMLElement = globalThis.HTMLElement;
  globalThis.document = {
    createElement() {
      return new FakeElement();
    },
  };
  globalThis.HTMLElement = FakeElement;

  try {
    const getMappingIdsForAnchor = (nodeKey, role, anchorInstanceIndex = null) =>
      (Array.isArray(snapshot?.mappings) ? snapshot.mappings : [])
        .filter((mapping) => {
          const normalizedAnchorInstanceIndex = normalizeAnchorInstanceIndex(anchorInstanceIndex);
          return (
            (mapping.sourceKey === nodeKey &&
              mapping.sourceRole === role &&
              normalizeAnchorInstanceIndex(mapping.sourceAnchorInstanceIndex) === normalizedAnchorInstanceIndex) ||
            (mapping.targetKey === nodeKey &&
              mapping.targetRole === role &&
              normalizeAnchorInstanceIndex(mapping.targetAnchorInstanceIndex) === normalizedAnchorInstanceIndex)
          );
        })
        .map((mapping) => mapping.id);

    const anchorRuntime = createReactionAnchorRenderRuntime({
      getAnchorAvailability: () => ({ disabled: false, reason: "" }),
      findMappingsByNodeKey: (nodeKey, role, anchorInstanceIndex = null) =>
        (Array.isArray(snapshot?.mappings) ? snapshot.mappings : []).filter((mapping) => {
          const normalizedAnchorInstanceIndex = normalizeAnchorInstanceIndex(anchorInstanceIndex);
          return (
            (mapping.sourceKey === nodeKey &&
              mapping.sourceRole === role &&
              normalizeAnchorInstanceIndex(mapping.sourceAnchorInstanceIndex) === normalizedAnchorInstanceIndex) ||
            (mapping.targetKey === nodeKey &&
              mapping.targetRole === role &&
              normalizeAnchorInstanceIndex(mapping.targetAnchorInstanceIndex) === normalizedAnchorInstanceIndex)
          );
        }),
      getMappingIdsForAnchor,
    });

    const participantRenderRuntime = createReactionParticipantRenderRuntime({
      buildNodeKey: (participantId, nodeId) => `${participantId}::${nodeId}`,
      createAnchorButton: anchorRuntime.createAnchorButton,
      createInlineAnchorSlot: anchorRuntime.createInlineAnchorSlot,
      createBinaryGlyph: () => new FakeElement(),
      getMappings: () => Array.isArray(snapshot?.mappings) ? snapshot.mappings : [],
      findMappingsByNodeKey: (nodeKey, role = "", anchorInstanceIndex = null) =>
        (Array.isArray(snapshot?.mappings) ? snapshot.mappings : []).filter((mapping) => {
          const normalizedAnchorInstanceIndex = normalizeAnchorInstanceIndex(anchorInstanceIndex);
          return (
            (mapping.sourceKey === nodeKey &&
              String(mapping.sourceRole ?? "") === String(role ?? "") &&
              normalizeAnchorInstanceIndex(mapping.sourceAnchorInstanceIndex) === normalizedAnchorInstanceIndex) ||
            (mapping.targetKey === nodeKey &&
              String(mapping.targetRole ?? "") === String(role ?? "") &&
              normalizeAnchorInstanceIndex(mapping.targetAnchorInstanceIndex) === normalizedAnchorInstanceIndex)
          );
        }),
      getParticipantCardMeta: () => ({ accent: "#b889ff" }),
      getParticipantCardLabelLines: (label) => [label],
      getParticipantRootNode: (participant) => participant?.hierarchy?.[0] ?? null,
      getOperatorNode: (participant) => participant?.hierarchy?.[0] ?? null,
      isCenterAssemblyParticipant: (participant) => participant?.surfaceColumn === "center-assembly",
      isCompositeParticipant: (participant) =>
        participant?.hierarchy?.[0]?.renderMode === "assembly-cluster-grid",
      isReactantCompositeParticipant: (participant) =>
        participant?.side === "reactant" &&
        participant?.hierarchy?.[0]?.renderMode === "assembly-cluster-grid",
      isProductCompositeParticipant: (participant) =>
        participant?.side === "product" &&
        participant?.hierarchy?.[0]?.renderMode === "assembly-cluster-grid",
      shouldRenderChildNodes: shouldRenderReactionStructureDescriptorChildren,
    });

    const renderedElements = [];
    const visitElement = (element) => {
      if (!element || typeof element !== "object") {
        return;
      }
      renderedElements.push(element);
      (Array.isArray(element.children) ? element.children : []).forEach((child) => visitElement(child));
    };

    (Array.isArray(snapshot?.participants) ? snapshot.participants : []).forEach((participant) => {
      const card =
        participant?.side === "operator"
          ? participantRenderRuntime.createOperatorParticipantCard(participant)
          : participantRenderRuntime.renderParticipantCard(participant);
      visitElement(card);
    });
    return renderedElements;
  } finally {
    globalThis.document = previousDocument;
    globalThis.HTMLElement = previousHTMLElement;
  }
}

function hasAncestorClassName(element = null, className = "") {
  const normalizedClassName = String(className ?? "").trim();
  let current = element?.parentElement ?? null;
  while (current) {
    const classNames = String(current?.className ?? "").split(/\s+/).filter(Boolean);
    if (classNames.includes(normalizedClassName)) {
      return true;
    }
    current = current.parentElement ?? null;
  }
  return false;
}

function assertRenderedAnchorsAvoidVisualScaffolding(snapshot = {}, messagePrefix = "snapshot") {
  const renderedElements = renderSnapshotElements(snapshot);
  const anchors = renderedElements.filter(
    (element) =>
      element?.dataset?.anchorKey &&
      element?.dataset?.anchorSide
  );
  for (const anchor of anchors) {
    assert.equal(
      String(anchor?.className ?? "").includes("composer-reaction-canvas-composite-collector"),
      false,
      `${messagePrefix}: rendered anchors must never be the decorative composite collector`
    );
    assert.equal(
      hasAncestorClassName(anchor, "composer-reaction-canvas-composite-visual-rail"),
      false,
      `${messagePrefix}: rendered anchors must never live inside the composite title rail`
    );
    assert.equal(
      hasAncestorClassName(anchor, "composer-reaction-canvas-particle"),
      false,
      `${messagePrefix}: rendered anchors must never live inside a participant title tile`
    );
  }
}

function buildRequiredRootConnectorSpecs(snapshot = {}) {
  return (Array.isArray(snapshot?.participants) ? snapshot.participants : []).flatMap((participant) => {
    const rootNodeId = String(participant?.hierarchy?.[0]?.id ?? "").trim();
    if (!rootNodeId) {
      return [];
    }
    const nodeKey = `${participant.id}::${rootNodeId}`;
    const lane = classifySnapshotLane(participant);
    if (lane === 1) {
      if (participant?.isDissociatedComposite || participant?.isAutoDissociatedComposite) {
        return [];
      }
      return [{ nodeKey, role: "reactant", anchorInstanceIndex: null, direction: "output", lane }];
    }
    if (lane === 2 || lane === 4) {
      return [
        { nodeKey, role: "operator-input", anchorInstanceIndex: 0, direction: "input", lane },
        { nodeKey, role: "operator-output", anchorInstanceIndex: 0, direction: "output", lane },
      ];
    }
    if (lane === 3) {
      const baseSpecs = [
        { nodeKey, role: "center", anchorInstanceIndex: 0, direction: "input", lane },
      ];
      if (participant?.templateId === "free_architrinos") {
        return [
          ...baseSpecs,
          {
            nodeKey,
            role: "center",
            anchorInstanceIndex: 1,
            direction: "output",
            lane,
            allowAnyConnectedInstance: true,
          },
        ];
      }
      return [
        ...baseSpecs,
        { nodeKey, role: "center", anchorInstanceIndex: 1, direction: "output", lane },
      ];
    }
    if (lane === 5) {
      return [{ nodeKey, role: "product", anchorInstanceIndex: null, direction: "input", lane }];
    }
    return [];
  });
}

function assertFullSolveLaneConnectivity(snapshot = {}, messagePrefix = "snapshot") {
  const renderedAnchors = collectRenderedAnchors(snapshot);
  const renderedAnchorsByDirection = collectRenderedAnchorsByDirection(snapshot);
  const mappings = Array.isArray(snapshot?.mappings) ? snapshot.mappings : [];

  for (const mapping of mappings) {
    assert.equal(
      hasResolvedRenderedAnchor(
        renderedAnchors,
        renderedAnchorsByDirection,
        mapping.sourceKey,
        mapping.sourceRole,
        mapping.sourceAnchorInstanceIndex,
        "source"
      ),
      true,
      `${messagePrefix}: mapping ${mapping.id} source ${mapping.sourceKey} ${mapping.sourceRole} must resolve to a rendered anchor`
    );
    assert.equal(
      hasResolvedRenderedAnchor(
        renderedAnchors,
        renderedAnchorsByDirection,
        mapping.targetKey,
        mapping.targetRole,
        mapping.targetAnchorInstanceIndex,
        "target"
      ),
      true,
      `${messagePrefix}: mapping ${mapping.id} target ${mapping.targetKey} ${mapping.targetRole} must resolve to a rendered anchor`
    );
  }

  for (const connector of buildRequiredRootConnectorSpecs(snapshot)) {
    const connectorKey = buildRenderedAnchorKey(
      connector.nodeKey,
      connector.role,
      connector.anchorInstanceIndex
    );
    assert.equal(
      hasResolvedRenderedAnchor(
        renderedAnchors,
        renderedAnchorsByDirection,
        connector.nodeKey,
        connector.role,
        connector.anchorInstanceIndex,
        connector.direction === "input" ? "target" : "source"
      ),
      true,
      `${messagePrefix}: lane ${connector.lane} connector ${connectorKey} must be visibly rendered`
    );
    const isConnected =
      connector.direction === "input"
        ? mappings.some(
            (mapping) =>
              mapping.targetKey === connector.nodeKey &&
              mapping.targetRole === connector.role &&
              (
                connector.allowAnyConnectedInstance ||
                normalizeAnchorInstanceIndex(mapping.targetAnchorInstanceIndex) ===
                  normalizeAnchorInstanceIndex(connector.anchorInstanceIndex)
              )
          )
        : mappings.some(
            (mapping) =>
              mapping.sourceKey === connector.nodeKey &&
              mapping.sourceRole === connector.role &&
              (
                connector.allowAnyConnectedInstance ||
                normalizeAnchorInstanceIndex(mapping.sourceAnchorInstanceIndex) ===
                  normalizeAnchorInstanceIndex(connector.anchorInstanceIndex)
              )
          );
    assert.equal(
      isConnected,
      true,
      `${messagePrefix}: lane ${connector.lane} connector ${connectorKey} must be connected on its ${connector.direction} side`
    );
  }

  const openedCompositeParticipants = (Array.isArray(snapshot?.participants) ? snapshot.participants : []).filter(
    (participant) => participant?.isDissociatedComposite || participant?.isAutoDissociatedComposite
  );
  for (const participant of openedCompositeParticipants) {
    const rootNodeId = String(participant?.hierarchy?.[0]?.id ?? "").trim();
    if (!rootNodeId) {
      continue;
    }
    const rootNodeKey = `${participant.id}::${rootNodeId}`;
    const expectedSourceRole = classifySnapshotLane(participant) === 3 ? "center" : "reactant";
    const routedToDownstreamOperator = mappings.some((mapping) => {
      const target = parseReactionNodeKey(mapping.targetKey);
      const targetParticipant =
        (Array.isArray(snapshot?.participants) ? snapshot.participants : []).find(
          (entry) => entry.id === target.participantId
        ) ?? null;
      return (
        parseReactionNodeKey(mapping.sourceKey).participantId === participant.id &&
        mapping.sourceRole === expectedSourceRole &&
        targetParticipant?.side === "operator" &&
        mapping.targetRole === "operator-input"
      );
    });
    assert.equal(
      routedToDownstreamOperator,
      true,
      `${messagePrefix}: opened composite ${participant.id} must route through a downstream operator`
    );
  }
}

test("reaction built-in library seeds muon decay as the default entry", async () => {
  const fixture = await readJson(
    new URL("../content/contracts/examples/reaction-flow/muon_decay.v1.json", import.meta.url)
  );
  const fetchImpl = createFixtureFetch();
  const manifest = await loadReactionBuiltInLibraryManifest({ fetchImpl });
  const loaded = await loadDefaultReactionBuiltInLibraryEntry({ fetchImpl });

  assert.equal(DEFAULT_REACTION_BUILTIN_LIBRARY_ENTRY_ID, "");
  assert.equal(manifest.defaultEntryId, "muon_decay");
  assert.equal(manifest.entries[0]?.id, "muon_decay");
  assert.equal(loaded.entry.id, "muon_decay");
  assert.equal(loaded.entry.title, "Muon decay");
  assert.equal(loaded.document.reactionId, fixture.reactionId);
  assert.equal(loaded.exportOverrides.reactionId, fixture.reactionId);
  assert.equal(loaded.exportOverrides.title, fixture.title);
  assert.deepEqual(loaded.exportOverrides.sourceDocumentIds, fixture.provenance.sourceDocumentIds);
  assert.deepEqual(loaded.exportOverrides.semanticTags, fixture.hints.semanticTags);
  assert.equal(loaded.exportOverrides.suggestedSceneId, fixture.hints.suggestedSceneId);
  assert.equal(
    loaded.snapshot.participants.some(
      (participant) => participant.id === "product_anti_electron_neutrino_2" && participant.templateId === "neutrino"
    ),
    true
  );
  assert.equal(
    loaded.snapshot.participants.some(
      (participant) => participant.id === "product_pro_muon_neutrino_3" && participant.templateId === "neutrino"
    ),
    true
  );
  assert.equal(
    loaded.snapshot.participants.some(
      (participant) => participant.id === "reactant_pro_muon_1"
    ),
    true
  );
  assert.equal(
    loaded.snapshot.participants.some(
      (participant) => participant.id === "product_pro_electron_1" && participant.label === "Pro Electron"
    ),
    true
  );
  assert.equal(loaded.snapshot.participants.length >= 3, true);
  assert.equal(loaded.snapshot.mappings.length >= 2, true);
});

test("reaction built-in library resolves browser-served content paths from the page base URL", async () => {
  const previousDocument = globalThis.document;
  const browserStyleManifest = {
    schema: "reaction-built-in-library-manifest/v1",
    defaultEntryId: "muon_decay",
    entries: [
      {
        id: "muon_decay",
        title: "Muon decay",
        displayTitle: "Muon decay",
        description: "Browser path fixture.",
        documentPath: "content/contracts/examples/reaction-flow/muon_decay.v1.json",
        version: "browser-fixture",
        isDefault: true,
        solveExact: true,
      },
    ],
  };
  let fetchedUrl = "";
  globalThis.document = {
    baseURI: "http://localhost:5173/reaction.html",
  };

  try {
    const loaded = await loadDefaultReactionBuiltInLibraryEntry({
      manifest: browserStyleManifest,
      fetchImpl: async (url) => {
        fetchedUrl = String(url);
        return {
          ok: true,
          async json() {
            return readJson(
              new URL("../content/contracts/examples/reaction-flow/muon_decay.v1.json", import.meta.url)
            );
          },
        };
      },
    });

    assert.equal(
      fetchedUrl,
      "http://localhost:5173/content/contracts/examples/reaction-flow/muon_decay.v1.json?v=browser-fixture"
    );
    assert.equal(loaded.entry.id, "muon_decay");
    assert.equal(loaded.document.schema, "reaction-flow/v1");
  } finally {
    globalThis.document = previousDocument;
  }
});

test("reaction built-in library now includes the first accepted PDG-backed solved entries", async () => {
  const muonFixture = await readJson(
    new URL("../content/contracts/examples/reaction-flow/muon_decay.v1.json", import.meta.url)
  );
  const pionFixture = await readJson(
    new URL("../content/contracts/examples/reaction-flow/charged_pion_to_muon_neutrino.v1.json", import.meta.url)
  );
  const fetchImpl = createFixtureFetch();

  assert.deepEqual(
    FIXTURE_LIBRARY_MANIFEST.entries.map((entry) => entry.id),
    ["muon_decay", "free_neutron_beta", "charged_pion_to_muon_neutrino"]
  );

  const loadedMuon = await loadReactionBuiltInLibraryEntry("muon_decay", { fetchImpl });
  const loadedNeutron = await loadReactionBuiltInLibraryEntry("free_neutron_beta", { fetchImpl });
  const loadedPion = await loadReactionBuiltInLibraryEntry("charged_pion_to_muon_neutrino", { fetchImpl });

  assert.equal(loadedMuon.entry.title, "Muon decay");
  assert.equal(loadedMuon.document.reactionId, muonFixture.reactionId);
  assert.equal(loadedMuon.document.review.status, "accepted");
  assert.deepEqual(loadedMuon.exportOverrides.sourceDocumentIds, muonFixture.provenance.sourceDocumentIds);
  assert.equal(loadedMuon.snapshot.participants.some((participant) => participant.id === "reactant_pro_muon_1"), true);
  assert.equal(
    loadedMuon.snapshot.participants.some(
      (participant) => participant.id === "reactant_pro_muon_1" && participant.label === "Pro Muon"
    ),
    true
  );
  assert.equal(
    loadedMuon.snapshot.participants.some(
      (participant) =>
        participant.id === "product_pro_muon_neutrino_3" && participant.label === "Pro Muon Neutrino"
    ),
    true
  );
  assert.equal(
    loadedMuon.snapshot.participants.some(
      (participant) =>
        participant.id === "center_weak-lepton-decay_base_free_architrinos" &&
        participant.surfaceColumn === "center-assembly"
    ),
    true
  );
  assert.equal(
    loadedMuon.snapshot.participants.some(
      (participant) =>
        participant.id === "center_weak-lepton-decay_base_noether_pair_1" &&
        participant.surfaceColumn !== "center-assembly" &&
        (participant.isDissociatedComposite === true ||
          participant.isAutoDissociatedComposite === true)
      ),
    true
  );
  assert.equal(
    loadedMuon.snapshot.participants.some(
      (participant) =>
        participant.id === "center_weak-lepton-decay_base_source_core" &&
        participant.surfaceColumn === "center-assembly"
    ),
    true
  );
  assert.equal(
    loadedMuon.snapshot.participants.some(
      (participant) => participant.side === "operator" && participant.templateId === "dissociate"
    ),
    true
  );
  assert.equal(
    loadedMuon.snapshot.participants.some(
      (participant) => participant.side === "operator" && participant.templateId === "pass_thru"
    ),
    true
  );
  assert.equal(
    loadedMuon.snapshot.participants.some(
      (participant) =>
        participant.id === "center_weak-lepton-decay_base_free_architrinos" &&
        participant.surfaceColumn === "center-assembly"
    ),
    true
  );

  assert.equal(loadedPion.entry.title, "Charged pion to muon neutrino");
  assert.equal(loadedPion.document.reactionId, pionFixture.reactionId);
  assert.equal(loadedPion.document.review.status, "accepted");
  assert.deepEqual(loadedPion.exportOverrides.sourceDocumentIds, pionFixture.provenance.sourceDocumentIds);
  assert.equal(
    loadedPion.snapshot.participants.some((participant) => participant.id === "reactant_positive_pion_1"),
    true
  );

  const participantNodeIdsById = new Map(
    loadedNeutron.snapshot.participants.map((participant) => [participant.id, collectParticipantNodeIds(participant)])
  );
  for (const mapping of loadedNeutron.snapshot.mappings) {
    const sourceKey = parseReactionNodeKey(mapping.sourceKey);
    const targetKey = parseReactionNodeKey(mapping.targetKey);
    assert.equal(participantNodeIdsById.get(sourceKey.participantId)?.has(sourceKey.nodeId) ?? false, true);
    assert.equal(participantNodeIdsById.get(targetKey.participantId)?.has(targetKey.nodeId) ?? false, true);
  }
});

test("reaction built-in library solved entries satisfy full-solve lane connectivity", async () => {
  const fetchImpl = createFixtureFetch();
  for (const entryId of [
    "muon_decay",
    "free_neutron_beta",
    "charged_pion_to_muon_neutrino",
  ]) {
    const loaded = await loadReactionBuiltInLibraryEntry(entryId, { fetchImpl });
    assertFullSolveLaneConnectivity(loaded.snapshot, entryId);
    assertRenderedAnchorsAvoidVisualScaffolding(loaded.snapshot, entryId);
  }
});

test("rendered group connectors never duplicate the same node direction", async () => {
  const fetchImpl = createFixtureFetch();
  for (const entryId of [
    "muon_decay",
    "free_neutron_beta",
    "charged_pion_to_muon_neutrino",
  ]) {
    const loaded = await loadReactionBuiltInLibraryEntry(entryId, { fetchImpl });
    const directionCounts = new Map();
    renderSnapshotElements(loaded.snapshot)
      .filter((element) => element?.dataset?.anchorKey && element?.dataset?.anchorSide)
      .forEach((element) => {
        const direction = getRenderedAnchorDirection(
          element.dataset.anchorSide,
          element.dataset.anchorInstanceIndex
        );
        const directionKey = buildRenderedAnchorDirectionKey(
          element.dataset.anchorKey,
          direction
        );
        directionCounts.set(directionKey, (directionCounts.get(directionKey) ?? 0) + 1);
      });

    for (const [directionKey, count] of directionCounts.entries()) {
      assert.equal(
        count <= 1,
        true,
        `${entryId}: ${directionKey} should render at most one visible connector`
      );
    }
  }
});

test("generated muon decay preserves dissociated noether-pair row anchors instead of collapsing them to the whole root", async () => {
  const document = await readJson(
    new URL(
      "../content/generated/reaction-built-in-library/entries/muon_decay.reaction-flow.v1.json",
      import.meta.url
    )
  );
  const snapshot = buildReactionSnapshotFromReactionFlowDocument(document);
  const participantId = "center_weak-lepton-decay_base_noether_pair_1";
  const rootNodeId = "center_weak-lepton-decay_base_noether_pair_1_structure";
  const rowSourceKeys = snapshot.mappings
    .filter((mapping) => mapping.sourceKey.startsWith(`${participantId}::`))
    .map((mapping) => mapping.sourceKey)
    .sort();
  const renderedElements = renderSnapshotElements(snapshot);
  const rootAnchor = renderedElements.find(
    (element) =>
      String(element?.className ?? "").includes("composer-reaction-canvas-composite-exterior-root-anchor") &&
      element?.dataset?.anchorKey === `${participantId}::${rootNodeId}`
  );

  assert.deepEqual(rowSourceKeys, [
    `${participantId}::${rootNodeId}/core_anti_1`,
    `${participantId}::${rootNodeId}/core_pro_1`,
  ]);
  assert.equal(rootAnchor ?? null, null);
});

test("reaction built-in library renders composite root connectors on the exterior side, not on the title collector", async () => {
  const fetchImpl = createFixtureFetch();
  const loaded = await loadReactionBuiltInLibraryEntry("charged_pion_to_muon_neutrino", { fetchImpl });
  const renderedElements = renderSnapshotElements(loaded.snapshot);
  const participant =
    loaded.snapshot.participants.find((entry) => entry.id === "reactant_positive_pion_1") ?? null;
  const rootNodeId = String(participant?.hierarchy?.[0]?.id ?? "").trim();
  const collector = renderedElements.find(
    (element) =>
      String(element?.className ?? "").includes("composer-reaction-canvas-composite-collector") &&
      element?.dataset?.compositeCollectorId === "reactant_positive_pion_1"
  );
  const rootAnchor = renderedElements.find(
    (element) =>
      String(element?.className ?? "").includes("composer-reaction-canvas-composite-exterior-root-anchor") &&
      element?.dataset?.anchorKey === `reactant_positive_pion_1::${rootNodeId}` &&
      element?.dataset?.anchorSide === "reactant"
  );

  assert.ok(rootNodeId);
  assert.ok(collector);
  assert.equal(Boolean(collector?.dataset?.anchorKey), false);
  assert.ok(rootAnchor);
});

test("reaction built-in library keeps product composite root connectors off the title collector too", async () => {
  const fetchImpl = createFixtureFetch();
  const loaded = await loadReactionBuiltInLibraryEntry("free_neutron_beta", { fetchImpl });
  const renderedElements = renderSnapshotElements(loaded.snapshot);
  const participant =
    loaded.snapshot.participants.find((entry) => entry.id === "product_proton_1") ?? null;
  const rootNodeId = String(participant?.hierarchy?.[0]?.id ?? "").trim();
  const collector = renderedElements.find(
    (element) =>
      String(element?.className ?? "").includes("composer-reaction-canvas-composite-collector") &&
      element?.dataset?.compositeCollectorId === "product_proton_1"
  );
  const rootAnchor = renderedElements.find(
    (element) =>
      String(element?.className ?? "").includes("composer-reaction-canvas-composite-exterior-root-anchor") &&
      element?.dataset?.anchorKey === `product_proton_1::${rootNodeId}` &&
      element?.dataset?.anchorSide === "product"
  );

  assert.ok(rootNodeId);
  assert.ok(collector);
  assert.equal(Boolean(collector?.dataset?.anchorKey), false);
  assert.ok(rootAnchor);
});

test("dissociated noether pair does not render a whole-particle button when only the child rows are used", () => {
  const structure = buildReactionParticipantStructure("noether_pair", {
    id: "reactant_noether_pair_structure",
    label: "Noether Pair",
  });
  const hierarchy = buildReactionStructureDescriptorTree(structure.root);
  const coreNodeId = String(hierarchy?.[0]?.children?.[0]?.id ?? "").trim();
  const rootNodeId = String(hierarchy?.[0]?.id ?? "").trim();
  const snapshot = {
    participants: [
      {
        id: "reactant_noether_pair",
        side: "reactant",
        templateId: "noether_pair",
        label: "Noether Pair",
        structure: structure.root,
        structureValidation: structure.validation,
        hierarchy,
        binarySelections: {},
        surfaceRowIndex: 0,
        isAutoDissociatedComposite: true,
      },
    ],
    mappings: [
      {
        id: "map_noether_pair_core_only",
        sourceKey: `reactant_noether_pair::${coreNodeId}`,
        sourceRole: "reactant",
        targetKey: "operator_1::operator_root",
        targetRole: "operator-input",
        targetAnchorInstanceIndex: 0,
      },
    ],
  };
  const renderedElements = renderSnapshotElements(snapshot);
  const rootAnchor = renderedElements.find(
    (element) =>
      String(element?.className ?? "").includes("composer-reaction-canvas-composite-exterior-root-anchor") &&
      element?.dataset?.anchorKey === `reactant_noether_pair::${rootNodeId}`
  );

  assert.ok(coreNodeId);
  assert.ok(rootNodeId);
  assert.equal(rootAnchor ?? null, null);
});

test("reaction built-in library import assigns explicit center connector instances", async () => {
  const fetchImpl = createFixtureFetch();
  const loaded = await loadReactionBuiltInLibraryEntry("muon_decay", { fetchImpl });

  const centerInputMappings = loaded.snapshot.mappings.filter((mapping) => mapping.targetRole === "center");
  assert.equal(centerInputMappings.length > 0, true);
  assert.equal(
    centerInputMappings.every((mapping) => mapping.targetAnchorInstanceIndex === 0),
    true
  );

  const sourceCoreOutputMappings = loaded.snapshot.mappings.filter((mapping) => {
    const source = parseReactionNodeKey(mapping.sourceKey);
    return (
      source.participantId === "center_weak-lepton-decay_base_source_core" &&
      mapping.sourceRole === "center"
    );
  });
  assert.equal(sourceCoreOutputMappings.length > 0, true);
  assert.equal(
    sourceCoreOutputMappings.every((mapping) => mapping.sourceAnchorInstanceIndex === 1),
    true
  );

  const freeArchitrinosOutputIndices = loaded.snapshot.mappings
    .filter((mapping) => {
      const source = parseReactionNodeKey(mapping.sourceKey);
      return (
        source.participantId === "center_weak-lepton-decay_base_free_architrinos" &&
        mapping.sourceRole === "center"
      );
    })
    .map((mapping) => mapping.sourceAnchorInstanceIndex)
    .sort((left, right) => Number(left) - Number(right));
  assert.deepEqual(freeArchitrinosOutputIndices, [1, 2, 3]);
});

test("reaction built-in library import rejects backward or sink-side-only mappings", () => {
  assert.throws(
    () =>
      buildReactionSnapshotFromReactionFlowDocument({
        schema: "reaction-flow/v1",
        reactionId: "invalid_reaction_flow",
        title: "Invalid Reaction Flow",
        review: { status: "draft" },
        participants: [
          {
            id: "reactant_muon",
            side: "reactant",
            label: "Pro Muon",
            structureKey: "electron",
            layout: {
              column: "left",
              row: 0,
            },
          },
          {
            id: "reactant_noether_pair",
            side: "reactant",
            label: "Noether Pair",
            structureKey: "noether_pair",
            layout: {
              column: "left",
              row: 1,
            },
          },
        ],
        operators: [],
        mappings: [
          {
            id: "map_invalid_sink_target",
            from: {
              participantId: "reactant_muon",
              anchorId: "reactant_muon_structure",
              role: "reactant",
            },
            to: {
              participantId: "reactant_noether_pair",
              anchorId: "reactant_noether_pair_structure",
              role: "reactant",
            },
            stageId: "stage_manual_authoring",
          },
        ],
      }),
    /skips lanes|cannot use input endpoint/i
  );
});

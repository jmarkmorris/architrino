import {
  classifyComposerReactionNode,
  evaluateComposerReactionMappingCandidate,
} from "./ComposerReactionStructureMappingRuntime.js";
import {
  createComposerReactionParticipantMutationRuntime,
} from "./ComposerReactionParticipantMutationRuntime.js";
import {
  createComposerReactionAnchorRenderRuntime,
} from "./ComposerReactionAnchorRenderRuntime.js";
import {
  createComposerReactionBinaryGlyphRuntime,
} from "./ComposerReactionBinaryGlyphRuntime.js";
import {
  buildNodeKey,
  createComposerReactionAnchorStateRuntime,
  nodeKeysConflict,
  parseNodeKey,
} from "./ComposerReactionAnchorStateRuntime.js";
import {
  createComposerReactionBinarySelectionRuntime,
  getBinaryPersonalityChoice,
  invertBinaryChoiceId,
} from "./ComposerReactionBinarySelectionRuntime.js";
import {
  buildReactionParticipantStructureForPickerCell,
  getComposerReactionAddPickerCells,
} from "./ComposerReactionAddPickerRuntime.js";
import { buildReactionParticipantStructure } from "./ComposerReactionStructureBridgeRuntime.js";
import {
  createComposerReactionParticipantRenderRuntime,
} from "./ComposerReactionParticipantRenderRuntime.js";
import {
  buildReactionStructureDescriptorTree,
  findReactionStructureDescriptorNode,
  isReactionStructureCompositeGridRenderMode,
  isReactionStructureInlineAnchorRenderMode,
  REACTION_STRUCTURE_RENDER_MODES,
  supportsReactionStructureDescriptorTree,
  walkReactionStructureDescriptorTree,
  shouldRenderReactionStructureDescriptorChildren,
} from "./ComposerReactionStructureDescriptorRuntime.js";
import {
  getNoetherCoreSlotBinaryPresence,
} from "../domain/structure/StructureClassification.js";
import {
  cloneStructureNode,
  getStructureNodeChildren,
  getStructureTrait,
  STRUCTURE_CHARGE_TYPES,
  STRUCTURE_CLASSIFICATION_FAMILIES,
  STRUCTURE_KINDS,
} from "../domain/structure/StructureSchema.js";
import { findStructureNodeById } from "../domain/structure/StructureTraversal.js";
import {
  applyStructurePolarity,
} from "../domain/structure/StructureTransforms.js";
import { validateStructureTree } from "../domain/structure/StructureValidation.js";

const solverTemplateMeta = Object.freeze({
  noether_core: { shortLabel: "NC", accent: "#a259ff" },
  higgs_cluster: { shortLabel: "HC", accent: "#a259ff" },
  photon: { shortLabel: "Ph", accent: "#a259ff" },
  neutron: { shortLabel: "N", accent: "#a259ff" },
  proton: { shortLabel: "P", accent: "#ff5a4a" },
  transmute: { shortLabel: "T", accent: "#a259ff" },
  electron: { shortLabel: "e-", accent: "#2d8cff" },
  neutrino: { shortLabel: "𝜈", accent: "#a259ff" },
  down_quark: { shortLabel: "d", accent: "#4a78ff" },
  up_quark: { shortLabel: "u", accent: "#ff5a4a" },
  fermion_gen1: { shortLabel: "F1", accent: "#c2d5ff" },
});

const reducedBinaryPersonalityChoiceIds = Object.freeze(["ee", "pe", "pp"]);
const binarySlotRankByCode = Object.freeze({
  I: 0,
  M: 1,
  O: 2,
});

const participantPolarityTemplateIds = new Set([
  "noether_core",
  "electron",
  "neutrino",
  "down_quark",
  "up_quark",
  "fermion_gen1",
]);

const templatePickerOrder = Object.freeze([
  "proton",
  "up_quark",
  "higgs_cluster",
  "photon",
  "neutron",
  "neutrino",
  "noether_core",
  "down_quark",
  "electron",
]);

function dedupeTemplateEntries(templateMenuRows = [], extraEntries = []) {
  const entries = [];
  const seen = new Set();
  const allEntries = [
    ...templateMenuRows.flatMap((row) => (Array.isArray(row) ? row : [])),
    { template: "neutron", label: "Neutron" },
    { template: "proton", label: "Proton" },
    { template: "photon", label: "Photon" },
    { template: "neutrino", label: "Neutrino", initialPolarity: "pro" },
    ...extraEntries,
  ];
  allEntries.forEach((entry) => {
    const template = String(entry?.template ?? "").trim();
    const initialPolarity = supportsParticipantPolarity(template)
      ? normalizeParticipantPolarity(entry?.initialPolarity)
      : "";
    const entryKey = `${template}::${initialPolarity}`;
    if (!template || seen.has(entryKey)) {
      return;
    }
    seen.add(entryKey);
    entries.push({
      template,
      label: String(entry?.label ?? template).trim() || template,
      initialPolarity,
    });
  });
  return entries;
}

function sortTemplatePickerEntries(entries = []) {
  return [...entries].sort((left, right) => {
    const leftTemplate = String(left?.template ?? "").trim().toLowerCase();
    const rightTemplate = String(right?.template ?? "").trim().toLowerCase();
    const leftIndex = templatePickerOrder.indexOf(leftTemplate);
    const rightIndex = templatePickerOrder.indexOf(rightTemplate);
    const leftRank = leftIndex >= 0 ? leftIndex : Number.MAX_SAFE_INTEGER;
    const rightRank = rightIndex >= 0 ? rightIndex : Number.MAX_SAFE_INTEGER;
    if (leftRank !== rightRank) {
      return leftRank - rightRank;
    }
    return String(left?.label ?? "").localeCompare(String(right?.label ?? ""));
  });
}

function supportsParticipantPolarity(templateId) {
  return participantPolarityTemplateIds.has(String(templateId ?? "").trim().toLowerCase());
}

function normalizeParticipantPolarity(polarity) {
  return String(polarity ?? "").trim().toLowerCase() === "anti" ? "anti" : "pro";
}

const {
  binaryAssignmentsMatch,
  getAllowedBinaryChoiceIds,
  getBinaryChoiceInventory,
  getBinarySelectorRuleForParticipant,
  getBinarySelectorNodes,
  getInitialParticipantBinarySelections,
  getParticipantBinarySelectorGroups,
  getResolvedBinarySelectionMap,
  findBestBinarySelectionAssignment,
  enumerateValidBinarySelectionAssignments,
  pickBestBinaryAssignmentCandidate,
  resolveBinarySelectorGroup,
} = createComposerReactionBinarySelectionRuntime({
  supportsParticipantPolarity,
  normalizeParticipantPolarity,
});

const {
  buildSplitParticipantsFromChildStructures,
  getNextParticipantGenerationTrimAction,
  inferParticipantBaseLabelFromStructure,
  inferParticipantPolarityFromStructure,
  inferTemplateIdFromStructure,
  refreshParticipantFromStructure,
  trimParticipantGenerationStructure,
} = createComposerReactionParticipantMutationRuntime({
  supportsParticipantPolarity,
  formatParticipantLabel,
  buildParticipantHierarchy,
  getInitialParticipantBinarySelections,
});

function stripLeadingParticipantPolarity(label = "") {
  return String(label ?? "").trim().replace(/^(pro|anti)\s+/i, "") || String(label ?? "").trim();
}

function formatParticipantLabel(baseLabel = "", templateId = "", polarity = "") {
  const cleanedBaseLabel = stripLeadingParticipantPolarity(baseLabel) || "?";
  if (!supportsParticipantPolarity(templateId)) {
    return cleanedBaseLabel;
  }
  return `${normalizeParticipantPolarity(polarity)} ${cleanedBaseLabel}`;
}

function buildParticipantStructure(
  participantId,
  templateId,
  baseLabel,
  polarity = "",
  structureOptions = null
) {
  const structureId = `${participantId}__structure`;
  return buildReactionParticipantStructure(templateId, {
    id: structureId,
    label: formatParticipantLabel(baseLabel, templateId, polarity),
    polarity,
    ...(structureOptions && typeof structureOptions === "object" ? structureOptions : {}),
  });
}

function buildParticipantHierarchy(structureRoot, fallbackHierarchy = []) {
  const derivedHierarchy = supportsReactionStructureDescriptorTree(structureRoot)
    ? buildReactionStructureDescriptorTree(structureRoot)
    : [];
  return Array.isArray(derivedHierarchy) && derivedHierarchy.length
    ? derivedHierarchy
    : Array.isArray(fallbackHierarchy)
      ? fallbackHierarchy
      : [];
}

function syncParticipantHierarchyForPolarity(participant) {
  if (!participant || !supportsParticipantPolarity(participant.templateId)) {
    return;
  }
  const polarity = normalizeParticipantPolarity(participant.polarity);
  const topNode = Array.isArray(participant.hierarchy) ? participant.hierarchy[0] ?? null : null;
  if (!topNode) {
    return;
  }
  topNode.label = `${polarity} Noether core`;
  topNode.inventory = polarity === "anti" ? { antiCore: 1 } : { proCore: 1 };
}

function inferDescriptorPolarity(node = null) {
  const antiCoreCount = Number(node?.inventory?.antiCore ?? 0);
  const proCoreCount = Number(node?.inventory?.proCore ?? 0);
  if (antiCoreCount > proCoreCount) {
    return "anti";
  }
  if (proCoreCount > antiCoreCount) {
    return "pro";
  }
  const normalizedLabel = String(node?.label ?? "").trim().toLowerCase();
  if (normalizedLabel.startsWith("anti ")) {
    return "anti";
  }
  if (normalizedLabel.startsWith("pro ")) {
    return "pro";
  }
  return "";
}

function resolveBinaryGlyphPolarity(participant, node = null) {
  return inferDescriptorPolarity(node) || normalizeParticipantPolarity(participant?.polarity);
}

function buildFallbackHierarchyForTemplate(templateId, label) {
  if (String(templateId ?? "").trim().toLowerCase() === "transmute") {
    return [
      {
        id: "root",
        label: "Transmute",
        renderMode: REACTION_STRUCTURE_RENDER_MODES.TRANSMUTE_TILE,
        children: [],
      },
    ];
  }
  return [
    {
      id: "root",
      label: String(label ?? "").trim() || "Structure",
      children: [],
    },
  ];
}

function getTemplateMeta(templateId, label = "") {
  const normalized = String(templateId ?? "").trim().toLowerCase();
  const entry = solverTemplateMeta[normalized] ?? null;
  if (entry) {
    return entry;
  }
  const words = String(label || normalized || "?")
    .split(/\s+/)
    .filter(Boolean);
  const shortLabel = words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase?.() ?? "")
    .join("")
    .slice(0, 3);
  return {
    shortLabel: shortLabel || "?",
    accent: "#9fb0e1",
  };
}

function getParticipantCardMeta(participant = null) {
  const baseMeta = getTemplateMeta(participant?.templateId, participant?.label);
  const polarity = normalizeParticipantPolarity(participant?.polarity);
  const templateId = String(participant?.templateId ?? "").trim().toLowerCase();
  if (templateId === "neutron") {
    return {
      ...baseMeta,
      accent: "#a259ff",
    };
  }
  if (templateId === "photon") {
    return {
      ...baseMeta,
      accent: "#a259ff",
    };
  }
  if (templateId === "electron" || templateId === "down_quark") {
    return {
      ...baseMeta,
      accent: polarity === "anti" ? "#ff5a4a" : "#2d8cff",
    };
  }
  if (templateId === "up_quark") {
    return {
      ...baseMeta,
      accent: polarity === "anti" ? "#2d8cff" : "#ff5a4a",
    };
  }
  return baseMeta;
}

function getDefaultParticipantBaseLabel(templateId = "", fallbackLabel = "") {
  const normalizedTemplateId = String(templateId ?? "").trim().toLowerCase();
  if (normalizedTemplateId === "noether_core") {
    return "Noether core";
  }
  if (normalizedTemplateId === "up_quark") {
    return "Up Quark";
  }
  if (normalizedTemplateId === "down_quark") {
    return "Down Quark";
  }
  if (normalizedTemplateId === "electron") {
    return "Electron";
  }
  if (normalizedTemplateId === "neutrino") {
    return "Neutrino";
  }
  if (normalizedTemplateId === "proton") {
    return "Proton";
  }
  if (normalizedTemplateId === "photon") {
    return "Photon";
  }
  if (normalizedTemplateId === "transmute") {
    return "Transmute";
  }
  if (normalizedTemplateId === "neutron") {
    return "Neutron";
  }
  if (normalizedTemplateId === "higgs_cluster") {
    return "Higgs cluster";
  }
  return String(fallbackLabel || normalizedTemplateId || "?").trim() || "?";
}

function getParticipantCardLabelLines(label = "", participant = null) {
  const words = String(label || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const normalizedTemplateId = String(participant?.templateId ?? "").trim().toLowerCase();
  if (
    normalizedTemplateId === "noether_core" &&
    words.length >= 3
  ) {
    const [polarityWord = "", secondWord = "", thirdWord = ""] = words;
    return [
      polarityWord ? polarityWord[0].toUpperCase() + polarityWord.slice(1).toLowerCase() : "?",
      secondWord ? secondWord[0].toUpperCase() + secondWord.slice(1).toLowerCase() : "",
      thirdWord ? thirdWord.toLowerCase() : "",
    ].filter(Boolean);
  }
  if (supportsParticipantPolarity(normalizedTemplateId) && words.length >= 2) {
    const [polarityWord = "", ...restWords] = words;
    return [
      polarityWord ? polarityWord[0].toUpperCase() + polarityWord.slice(1).toLowerCase() : "?",
      ...restWords.map((word) => word[0]?.toUpperCase?.() + word.slice(1).toLowerCase()),
    ].filter(Boolean);
  }
  if (words.length <= 1) {
    return [String(label || "").trim() || "?"];
  }
  if (words.length === 2) {
    return words;
  }
  return [words.slice(0, -1).join(" "), words.at(-1) ?? ""];
}

function countDescendants(node) {
  const children = Array.isArray(node?.children) ? node.children : [];
  return children.reduce((total, child) => total + 1 + countDescendants(child), 0);
}

function shouldRenderChildNodes(node) {
  return shouldRenderReactionStructureDescriptorChildren(node);
}

function isQuarkTemplateId(templateId) {
  const normalizedTemplateId = String(templateId ?? "").trim().toLowerCase();
  return normalizedTemplateId === "up_quark" || normalizedTemplateId === "down_quark";
}

function topLevelHierarchyHasRenderMode(nodes = [], renderMode = "") {
  return (Array.isArray(nodes) ? nodes : []).some((node) => node?.renderMode === renderMode);
}

function isCompositeGridRenderMode(renderMode = "") {
  return isReactionStructureCompositeGridRenderMode(renderMode);
}

function getParticipantRootNode(participant) {
  return Array.isArray(participant?.hierarchy) ? participant.hierarchy[0] ?? null : null;
}

function getTransmuteNode(participant) {
  return participant?.templateId === "transmute" ? getParticipantRootNode(participant) : null;
}

function isCompositeParticipant(participant) {
  return isCompositeGridRenderMode(getParticipantRootNode(participant)?.renderMode ?? "");
}

function isReactantCompositeParticipant(participant) {
  return participant?.side === "reactant" && isCompositeParticipant(participant);
}

function isProductCompositeParticipant(participant) {
  return participant?.side === "product" && isCompositeParticipant(participant);
}

function isTransmuteParticipant(participant) {
  return participant?.side === "center" && String(participant?.templateId ?? "") === "transmute";
}

function isSingleMappingAnchorRole(role = "") {
  return role === "reactant" || role === "product";
}

function canStartMappingFromRole(role = "") {
  return role === "reactant" || role === "transmute-output";
}

function canTargetMappingRole(role = "") {
  return role === "product" || role === "transmute-input";
}

const transmuteCardHeightPx = 72;
const transmuteSlotStepPx = 108;
const recentRouteFadeMs = 400;
const transmuteSlotEdgePaddingPx = 18;

function getParticipantSideLabel(side = "", options = {}) {
  const label =
    side === "product" ? "product" : side === "center" ? "transmute tile" : "reactant";
  if (!options.capitalized) {
    return label;
  }
  return label[0]?.toUpperCase() + label.slice(1);
}

function createSvgElement(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}

function clampMenuPosition(clientX, clientY, menu, boundsElement) {
  if (!menu || !boundsElement) {
    return { left: clientX, top: clientY };
  }
  const bounds = boundsElement.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();
  const maxLeft = bounds.right - menuRect.width - 12;
  const maxTop = bounds.bottom - menuRect.height - 12;
  return {
    left: Math.max(bounds.left + 12, Math.min(clientX, maxLeft)),
    top: Math.max(bounds.top + 12, Math.min(clientY, maxTop)),
  };
}

function readPersistedSolverActive(storage, storageKey) {
  if (!storage || !storageKey) {
    return false;
  }
  try {
    return storage.getItem(storageKey) === "true";
  } catch (_error) {
    return false;
  }
}

function persistSolverActive(storage, storageKey, active) {
  if (!storage || !storageKey) {
    return;
  }
  try {
    storage.setItem(storageKey, active ? "true" : "false");
  } catch (_error) {
    // Ignore storage failures and keep the solver working in-memory.
  }
}

export function createComposerReactionSolverUiRuntime(deps) {
  const {
    toggleButton,
    root,
    surface,
    reactantsColumn,
    productsColumn,
    mapHint,
    emptyState,
    mapSvg,
    menu,
    templateMenuRows = [],
    extraTemplateEntries = [],
    setStatus = () => {},
    closeExternalMenus = () => {},
    onActiveChange = () => {},
    storage = null,
    storageKey = "",
  } = deps;

  const centerColumn = root?.querySelector(".composer-reaction-solver-center") ?? null;
  const templateEntries = dedupeTemplateEntries(templateMenuRows, extraTemplateEntries);
  const sortedTemplateEntries = sortTemplatePickerEntries(templateEntries);
  const addPickerCells = getComposerReactionAddPickerCells();
  const state = {
    active: false,
    nextParticipantId: 1,
    nextMappingId: 1,
    nextSplitGroupId: 1,
    participants: [],
    mappings: [],
    pendingSourceKey: "",
    pendingSourceRole: "",
    menuMode: "root",
    menuSide: "reactant",
    menuParticipantId: "",
    menuOpen: false,
    menuClientX: 0,
    menuClientY: 0,
    menuAnchorElement: null,
    anchorRegistry: new Map(),
    dragParticipantId: "",
    dragPointerId: null,
    hoveredMappingIds: [],
    recentMappingIds: [],
  };

  let drawFrameId = 0;
  let applyHoveredRouteState = () => {};
  let createAnchorButton = () => document.createElement("button");
  let createInlineAnchorLane = () => document.createElement("div");
  let createSideSlotHeader = () => document.createElement("div");
  let createTransmuteParticipantCard = () => document.createElement("article");
  let renderParticipantCard = () => document.createElement("article");
  let setHoveredMappingIds = () => {};

  const anchorStateRuntime = createComposerReactionAnchorStateRuntime({
    canTargetMappingRole,
    getMappings: () => state.mappings,
    getNodeContext,
    getRecentMappingIds: () => state.recentMappingIds,
    getPendingSourceKey: () => state.pendingSourceKey,
    getPendingSourceRole: () => state.pendingSourceRole,
    isSingleMappingAnchorRole,
    onRecentStateChange: () => applyHoveredRouteState(),
    recentRouteFadeMs,
    resolvePendingTargetAvailability: ({
      pendingSourceKey,
      pendingSourceRole,
      role,
      sourceContext,
      targetContext,
    }) => {
      if (pendingSourceRole === "reactant" && role === "product") {
        const evaluation = evaluateComposerReactionMappingCandidate({
          sourceParticipant: sourceContext?.participant,
          sourceNode: sourceContext?.node,
          targetParticipant: targetContext?.participant,
          targetNode: targetContext?.node,
          resolveBinaryChoiceInventory,
        });
        if (!evaluation.allowed) {
          return {
            disabled: true,
            reason: evaluation.reason,
          };
        }
      }
      if (pendingSourceRole === "transmute-output" && role === "product") {
        const transmuteId = parseNodeKey(pendingSourceKey).participantId;
        const transmuteSummary = getTransmuteLedgerSummary(transmuteId);
        const candidateLedger = addLedgers(
          transmuteSummary.outgoingLedger,
          classifyComposerReactionNode(targetContext?.participant, targetContext?.node, {
            resolveBinaryChoiceInventory,
          })?.inventory
        );
        if (!hasLedger(transmuteSummary.incomingLedger)) {
          return {
            disabled: true,
            reason: "Add conservative reactant inputs to this transmute tile first.",
          };
        }
        if (!ledgerFitsWithin(transmuteSummary.incomingLedger, candidateLedger)) {
          return {
            disabled: true,
            reason: `Transmute output would exceed its incoming ledger: ${formatLedger(transmuteSummary.incomingLedger)} available.`,
          };
        }
      }
      if (pendingSourceRole === "transmute-output" && role === "transmute-input") {
        return {
          disabled: true,
          reason: "Transmute outputs connect to product targets only.",
        };
      }
      return null;
    },
    setRecentMappingIds: (mappingIds) => {
      state.recentMappingIds = Array.isArray(mappingIds) ? mappingIds : [];
    },
  });
  const {
    clearAllRecentRouteState,
    findMappingByNodeKey,
    findMappingsByNodeKey,
    getAnchorAvailability,
    getConflictingMappings,
    getMappingIdsForAnchor,
    markMappingsRecent,
    pruneRecentRouteState,
  } = anchorStateRuntime;
  const anchorRenderRuntime = createComposerReactionAnchorRenderRuntime({
    findMappingsByNodeKey,
    getAnchorAvailability,
    getHoveredMappingIds: () => state.hoveredMappingIds,
    getMappingIdsForAnchor,
    getPendingSourceKey: () => state.pendingSourceKey,
    getPendingSourceRole: () => state.pendingSourceRole,
    getRecentMappingIds: () => state.recentMappingIds,
    handleAnchorClick,
    isSingleMappingAnchorRole,
    mapSvg,
    markMappingsRecent,
    setHoveredMappingIdsState: (mappingIds) => {
      state.hoveredMappingIds = Array.isArray(mappingIds) ? mappingIds : [];
    },
    surface,
  });
  ({
    applyHoveredRouteState,
    createAnchorButton,
    createInlineAnchorLane,
    setHoveredMappingIds,
  } = anchorRenderRuntime);
  const binaryGlyphRuntime = createComposerReactionBinaryGlyphRuntime({
    createSvgElement,
    normalizeParticipantPolarity,
    structureChargeTypes: STRUCTURE_CHARGE_TYPES,
  });
  const { createBinaryGlyph } = binaryGlyphRuntime;
  const participantRenderRuntime = createComposerReactionParticipantRenderRuntime({
    buildNodeKey,
    countDescendants,
    createAnchorButton,
    createBinaryGlyph,
    createInlineAnchorLane,
    cycleQuarkBinaryPreset,
    findMappingByNodeKey,
    formatLedger,
    formatParticipantLabel,
    getAllowedBinaryChoiceIds,
    getAnchorAvailability,
    getBinaryPersonalitySelection,
    getDefaultParticipantBaseLabel,
    getIsDraggingParticipant: (participantId) => state.dragParticipantId === participantId,
    getParticipantCardLabelLines,
    getParticipantCardMeta,
    getParticipantRootNode,
    getPendingSourceKey: () => state.pendingSourceKey,
    getTransmuteCardTop,
    getTransmuteLedgerSummary,
    getTransmuteNode,
    isCompositeParticipant,
    isProductCompositeParticipant,
    isQuarkTemplateId,
    isReactantCompositeParticipant,
    openParticipantMenuAt,
    reducedBinaryPersonalityChoiceIds,
    resolveBinaryGlyphPolarity,
    setBinaryPersonalitySelection,
    shouldRenderChildNodes,
    startTransmuteDrag,
    supportsParticipantPolarity,
    topLevelHierarchyHasRenderMode,
  });
  ({
    createSideSlotHeader,
    createTransmuteParticipantCard,
    renderParticipantCard,
  } = participantRenderRuntime);

  function findParticipantById(participantId) {
    return state.participants.find((participant) => participant?.id === participantId) ?? null;
  }

  function createParticipantRecord({
    side,
    templateId,
    label,
    hierarchy,
    structure = null,
    structureOptions = null,
    structureFactory = null,
    extraFields = {},
  }) {
    const resolvedTemplateId = templateId || inferTemplateIdFromStructure(structure?.root ?? structure);
    const resolvedBaseLabel = stripLeadingParticipantPolarity(
      label || inferParticipantBaseLabelFromStructure(structure?.root ?? structure)
    );
    const resolvedPolarity = supportsParticipantPolarity(resolvedTemplateId)
      ? normalizeParticipantPolarity(
          extraFields.polarity ?? inferParticipantPolarityFromStructure(structure?.root ?? structure)
        )
      : "";
    const participant = {
      id: `solver_participant_${state.nextParticipantId++}`,
      side,
      templateId: resolvedTemplateId,
      baseLabel: resolvedBaseLabel,
      polarity: resolvedPolarity,
      label: formatParticipantLabel(resolvedBaseLabel, resolvedTemplateId, resolvedPolarity),
      hierarchy: Array.isArray(hierarchy) ? hierarchy : [],
      binarySelections: {},
      ...extraFields,
    };
    const factoryStructure =
      !structure && typeof structureFactory === "function"
        ? structureFactory({
            participant,
            participantId: participant.id,
            templateId: participant.templateId,
            baseLabel: participant.baseLabel,
            polarity: participant.polarity,
          })
        : null;
    const sourceStructure = structure ?? factoryStructure;
    const participantStructure = sourceStructure?.root
      ? {
          root: cloneStructureNode(sourceStructure.root),
          validation:
            sourceStructure.validation ?? validateStructureTree(sourceStructure.root),
        }
      : sourceStructure
        ? {
            root: cloneStructureNode(sourceStructure),
            validation: validateStructureTree(sourceStructure),
          }
        : buildParticipantStructure(
            participant.id,
            participant.templateId,
            participant.baseLabel,
            participant.polarity,
            structureOptions
          );
    participant.structure = participantStructure.root;
    participant.structureValidation = participantStructure.validation;
    participant.hierarchy = buildParticipantHierarchy(participantStructure.root, hierarchy);
    syncParticipantHierarchyForPolarity(participant);
    participant.binarySelections = getInitialParticipantBinarySelections(participant);
    return participant;
  }

  function getNodeContext(nodeKey) {
    if (!nodeKey) {
      return null;
    }
    const existingContext = state.anchorRegistry.get(nodeKey) ?? null;
    if (existingContext) {
      return existingContext;
    }
    return rebuildAnchorRegistry().get(nodeKey) ?? null;
  }

  function resolveBinaryChoiceInventory(participant, node, groupNode = null) {
    const choice = getBinaryPersonalitySelection(participant, node, groupNode);
    const baseInventory = getBinaryChoiceInventory(choice?.id);
    const slotName = String(node?.slotName ?? "").trim().toLowerCase() || ({
      I: "inner",
      M: "middle",
      O: "outer",
    }[String(node?.slotCode ?? "").trim().toUpperCase()] ?? "");
    const groupRecord = resolveBinarySelectorGroup(participant, groupNode ?? node);
    const structureNode = participant?.structure && groupRecord?.id
      ? findStructureNodeById(participant.structure, groupRecord.id)
      : null;
    const coreNode =
      structureNode?.kind === STRUCTURE_KINDS.NOETHER_CORE
        ? structureNode
        : getStructureNodeChildren(structureNode).find(
            (childNode) => childNode?.kind === STRUCTURE_KINDS.NOETHER_CORE
          ) ?? null;
    const binaryPresence = getNoetherCoreSlotBinaryPresence(coreNode);
    if (!slotName || binaryPresence[slotName] !== false) {
      return baseInventory;
    }
    return {
      electrino: Math.max(0, Number(baseInventory.electrino ?? 0) - 1),
      positrino: Math.max(0, Number(baseInventory.positrino ?? 0) - 1),
    };
  }

  function createAnchorContext(participant, node) {
    if (!participant || !node?.id) {
      return null;
    }
    const descriptorNode =
      findReactionStructureDescriptorNode(participant?.hierarchy, node.id) ?? node;
    return {
      participant,
      node: descriptorNode,
      structureNode: participant.structure
        ? findStructureNodeById(participant.structure, descriptorNode.id)
        : null,
    };
  }

  function rebuildAnchorRegistry() {
    const registry = new Map();
    state.participants.forEach((participant) => {
      walkReactionStructureDescriptorTree(participant.hierarchy, (node) => {
        const nodeKey = buildNodeKey(participant.id, node.id);
        const context = createAnchorContext(participant, node);
        if (context) {
          registry.set(nodeKey, context);
        }
      });
    });
    state.anchorRegistry = registry;
    return registry;
  }

  function createEmptyLedger() {
    return {
      electrino: 0,
      positrino: 0,
    };
  }

  function addLedgers(leftLedger = null, rightLedger = null) {
    return {
      electrino: Number(leftLedger?.electrino ?? 0) + Number(rightLedger?.electrino ?? 0),
      positrino: Number(leftLedger?.positrino ?? 0) + Number(rightLedger?.positrino ?? 0),
    };
  }

  function ledgerFitsWithin(limitLedger = null, candidateLedger = null) {
    const limit = createEmptyLedger();
    const candidate = createEmptyLedger();
    limit.electrino = Number(limitLedger?.electrino ?? 0);
    limit.positrino = Number(limitLedger?.positrino ?? 0);
    candidate.electrino = Number(candidateLedger?.electrino ?? 0);
    candidate.positrino = Number(candidateLedger?.positrino ?? 0);
    return (
      candidate.electrino <= limit.electrino &&
      candidate.positrino <= limit.positrino
    );
  }

  function ledgersMatch(leftLedger = null, rightLedger = null) {
    return (
      Number(leftLedger?.electrino ?? 0) === Number(rightLedger?.electrino ?? 0) &&
      Number(leftLedger?.positrino ?? 0) === Number(rightLedger?.positrino ?? 0)
    );
  }

  function hasLedger(ledger = null) {
    return Number(ledger?.electrino ?? 0) > 0 || Number(ledger?.positrino ?? 0) > 0;
  }

  function formatLedger(ledger = null) {
    const parts = [];
    const electrinoCount = Number(ledger?.electrino ?? 0);
    const positrinoCount = Number(ledger?.positrino ?? 0);
    if (electrinoCount) {
      parts.push(`${electrinoCount} electrino`);
    }
    if (positrinoCount) {
      parts.push(`${positrinoCount} positrino`);
    }
    return parts.join(" + ") || "empty ledger";
  }

  function getNodeLedger(nodeKey) {
    const context = getNodeContext(nodeKey);
    const spec = context
      ? classifyComposerReactionNode(context.participant, context.node, {
          resolveBinaryChoiceInventory,
        })
      : null;
    return spec?.inventory ?? createEmptyLedger();
  }

  function getTransmuteLedgerSummary(participantId) {
    const incomingMappings = state.mappings.filter((mapping) => {
      const { participantId: targetParticipantId } = parseNodeKey(mapping.targetKey);
      return targetParticipantId === participantId && mapping.targetRole === "transmute-input";
    });
    const outgoingMappings = state.mappings.filter((mapping) => {
      const { participantId: sourceParticipantId } = parseNodeKey(mapping.sourceKey);
      return sourceParticipantId === participantId && mapping.sourceRole === "transmute-output";
    });
    const incomingLedger = incomingMappings.reduce(
      (ledger, mapping) => addLedgers(ledger, getNodeLedger(mapping.sourceKey)),
      createEmptyLedger()
    );
    const outgoingLedger = outgoingMappings.reduce(
      (ledger, mapping) => addLedgers(ledger, getNodeLedger(mapping.targetKey)),
      createEmptyLedger()
    );
    return {
      incomingLedger,
      outgoingLedger,
      isBalanced: hasLedger(incomingLedger) && hasLedger(outgoingLedger) && ledgersMatch(incomingLedger, outgoingLedger),
    };
  }

  function isTransmuteParticipantBalanced(participantId) {
    return getTransmuteLedgerSummary(participantId).isBalanced;
  }

  function removeMappingById(mappingId) {
    const beforeCount = state.mappings.length;
    state.mappings = state.mappings.filter((mapping) => mapping.id !== mappingId);
    pruneRecentRouteState();
    return beforeCount !== state.mappings.length;
  }

  function removeMappingsForParticipant(participantId) {
    const beforeCount = state.mappings.length;
    state.mappings = state.mappings.filter((mapping) => {
      const sourceParticipantId = parseNodeKey(mapping.sourceKey).participantId;
      const targetParticipantId = parseNodeKey(mapping.targetKey).participantId;
      return sourceParticipantId !== participantId && targetParticipantId !== participantId;
    });
    if (parseNodeKey(state.pendingSourceKey).participantId === participantId) {
      state.pendingSourceKey = "";
      state.pendingSourceRole = "";
    }
    state.hoveredMappingIds = state.hoveredMappingIds.filter((mappingId) =>
      state.mappings.some((mapping) => mapping.id === mappingId)
    );
    pruneRecentRouteState();
    return beforeCount !== state.mappings.length;
  }

  function removeParticipantById(participantId) {
    const participant = findParticipantById(participantId);
    if (!participant) {
      return false;
    }
    state.participants = state.participants.filter(
      (entry) => String(entry?.id ?? "") !== participantId
    );
    removeMappingsForParticipant(participantId);
    closeMenu();
    render();
    setStatus(
      `${getParticipantSideLabel(participant.side, { capitalized: true })} ${participant.label} removed from the reaction solver.`
    );
    return true;
  }

  function setParticipantPolarity(participantId, nextPolarity) {
    const participant = findParticipantById(participantId);
    if (!participant || !supportsParticipantPolarity(participant.templateId)) {
      return false;
    }
    const resolvedPolarity = normalizeParticipantPolarity(nextPolarity);
    if (participant.polarity === resolvedPolarity) {
      return false;
    }
    const currentSelections = getResolvedBinarySelectionMap(participant);
    participant.polarity = resolvedPolarity;
    syncParticipantHierarchyForPolarity(participant);
    removeMappingsForParticipant(participantId);
    participant.binarySelections = Object.fromEntries(
      Object.entries(currentSelections).map(([nodeId, choiceId]) => [
        nodeId,
        invertBinaryChoiceId(choiceId),
      ])
    );
    participant.label = formatParticipantLabel(
      participant.baseLabel ?? participant.label,
      participant.templateId,
      resolvedPolarity
    );
    const nextStructure = applyStructurePolarity(participant.structure, resolvedPolarity);
    refreshParticipantFromStructure(participant, nextStructure, {
      preserveBinarySelections: true,
    });
    closeMenu();
    render();
    setStatus(
      `${getParticipantSideLabel(participant.side, { capitalized: true })} ${participant.label} updated.`
    );
    return true;
  }

  function trimParticipantGenerationSlot(participantId, slotName) {
    const participant = findParticipantById(participantId);
    const nextStructure = trimParticipantGenerationStructure(participant, slotName);
    if (!nextStructure) {
      return false;
    }
    removeMappingsForParticipant(participantId);
    refreshParticipantFromStructure(participant, nextStructure, {
      preserveBinarySelections: true,
    });
    closeMenu();
    render();
    setStatus(
      `${getParticipantSideLabel(participant.side, { capitalized: true })} reclassified as ${participant.label}.`
    );
    return true;
  }

  function splitHiggsParticipantById(participantId) {
    const participantIndex = state.participants.findIndex(
      (entry) => String(entry?.id ?? "") === participantId
    );
    const participant =
      participantIndex >= 0 ? state.participants[participantIndex] ?? null : null;
    if (!participant || participant.templateId !== "higgs_cluster") {
      return false;
    }

    const splitGroupId = `solver_split_group_${state.nextSplitGroupId++}`;
    const childStructures = getStructureNodeChildren(participant.structure);
    const replacementParticipants = buildSplitParticipantsFromChildStructures(
      participant,
      childStructures,
      createParticipantRecord,
      (childStructure, index) => ({
        splitGroupId,
        splitOriginTemplateId: "higgs_cluster",
        splitOriginRole: inferParticipantPolarityFromStructure(childStructure),
        splitOriginIndex: index,
      })
    );
    if (!replacementParticipants.length) {
      return false;
    }

    state.participants.splice(participantIndex, 1, ...replacementParticipants);
    removeMappingsForParticipant(participantId);
    closeMenu();
    render();
    setStatus(
      `${participant.side === "reactant" ? "Reactant" : "Product"} Higgs cluster split into four Noether core assemblies.`
    );
    return true;
  }

  function splitCompositeParticipantById(participantId) {
    const participant = findParticipantById(participantId);
    if (!participant) {
      return false;
    }
    if (participant.templateId === "higgs_cluster") {
      return splitHiggsParticipantById(participantId);
    }
    if (
      participant.templateId !== "neutron" &&
      participant.templateId !== "proton" &&
      participant.templateId !== "photon"
    ) {
      return false;
    }

    const participantIndex = state.participants.findIndex(
      (entry) => String(entry?.id ?? "") === participantId
    );
    const splitGroupId = `solver_split_group_${state.nextSplitGroupId++}`;
    const childStructures = getStructureNodeChildren(participant.structure);
    const replacementParticipants = buildSplitParticipantsFromChildStructures(
      participant,
      childStructures,
      createParticipantRecord,
      (_childStructure, index) => ({
        splitGroupId,
        splitOriginTemplateId: participant.templateId,
        splitOriginIndex: index,
      })
    );
    if (!replacementParticipants.length) {
      return false;
    }

    state.participants.splice(participantIndex, 1, ...replacementParticipants);
    removeMappingsForParticipant(participantId);
    closeMenu();
    render();
    const splitSummary =
      participant.templateId === "photon"
        ? "split into pro and anti Noether core assemblies."
        : participant.templateId === "higgs_cluster"
          ? "split into four Noether core assemblies."
          : "split into constituent quarks.";
    setStatus(
      `${participant.side === "reactant" ? "Reactant" : "Product"} ${participant.label} ${splitSummary}`
    );
    return true;
  }

  function addOrReplaceMapping(sourceKey, sourceRole, targetKey, targetRole) {
    state.mappings = state.mappings.filter((mapping) => {
      const sourceConflict = isSingleMappingAnchorRole(sourceRole)
        ? nodeKeysConflict(mapping.sourceKey, sourceKey) || nodeKeysConflict(mapping.targetKey, sourceKey)
        : false;
      const targetConflict = isSingleMappingAnchorRole(targetRole)
        ? nodeKeysConflict(mapping.sourceKey, targetKey) || nodeKeysConflict(mapping.targetKey, targetKey)
        : false;
      return !(sourceConflict || targetConflict);
    });
    pruneRecentRouteState();
    const mappingId = `solver_mapping_${state.nextMappingId++}`;
    state.mappings.push({
      id: mappingId,
      sourceKey,
      targetKey,
      sourceRole,
      targetRole,
    });
    state.hoveredMappingIds = [];
    return mappingId;
  }

  function clearPendingSource() {
    if (!state.pendingSourceKey) {
      return;
    }
    state.pendingSourceKey = "";
    state.pendingSourceRole = "";
    render();
  }

  function getAnchorDisabled(role, nodeKey) {
    return getAnchorAvailability(role, nodeKey).disabled;
  }

  function countEligibleTargets() {
    if (!state.pendingSourceKey) {
      return 0;
    }
    let count = 0;
    state.participants
      .filter((participant) => participant.side === "product" || participant.side === "center")
      .forEach((participant) => {
        const visit = (nodes = []) => {
          nodes.forEach((node) => {
            const nodeKey = buildNodeKey(participant.id, node.id);
            if (participant.side === "product") {
              if (!getAnchorAvailability("product", nodeKey).disabled) {
                count += 1;
              }
            } else if (participant.side === "center") {
              const transmuteNode = getTransmuteNode(participant);
              if (transmuteNode && node.id === transmuteNode.id) {
                if (!getAnchorAvailability("transmute-input", nodeKey).disabled) {
                  count += 1;
                }
              }
            }
            if (shouldRenderChildNodes(node)) {
              visit(node.children);
            }
          });
        };
        visit(participant.hierarchy);
      });
    return count;
  }

  function getBinaryPersonalitySelection(participant, node, groupNode = null) {
    const selectionMap = getResolvedBinarySelectionMap(participant, groupNode);
    return getBinaryPersonalityChoice(selectionMap[node?.id]);
  }

  function setBinaryPersonalitySelection(participantId, nodeId, choiceId) {
    const participant = findParticipantById(participantId);
    if (!participant || !nodeId) {
      return;
    }
    const groupNode = resolveBinarySelectorGroup(participant, nodeId);
    const nextSelections =
      findBestBinarySelectionAssignment(participant, groupNode, {
        pinnedNodeId: nodeId,
        pinnedChoiceId: getBinaryPersonalityChoice(choiceId).id,
      }) ?? null;
    if (!nextSelections) {
      return;
    }
    participant.binarySelections = nextSelections;
    render();
  }

  function cycleQuarkBinaryPreset(participantId, nodeId) {
    const participant = findParticipantById(participantId);
    if (!participant || !nodeId) {
      return;
    }
    const groupNode = resolveBinarySelectorGroup(participant, nodeId);
    if (!groupNode || !isQuarkTemplateId(groupNode.templateId)) {
      return;
    }
    const nodes = getBinarySelectorNodes(participant, groupNode);
    const clickedNode = nodes.find((node) => node.id === nodeId);
    if (!clickedNode) {
      return;
    }
    const currentSelections = getResolvedBinarySelectionMap(participant, groupNode);
    const validAssignments = enumerateValidBinarySelectionAssignments(participant, groupNode);
    if (!validAssignments.length) {
      return;
    }

    const choiceCycle = getBinarySelectorRuleForParticipant({
      ...participant,
      templateId: groupNode.templateId,
    }).visibleChoiceIds
      .filter((choiceId) =>
        validAssignments.some((assignment) => assignment[clickedNode.id] === choiceId)
      );
    if (!choiceCycle.length) {
      return;
    }
    const currentChoiceId = currentSelections[clickedNode.id];
    const currentChoiceIndex = Math.max(0, choiceCycle.indexOf(currentChoiceId));
    const nextChoiceId = choiceCycle[(currentChoiceIndex + 1) % choiceCycle.length];
    const candidateAssignments = validAssignments.filter(
      (assignment) =>
        assignment[clickedNode.id] === nextChoiceId &&
        !binaryAssignmentsMatch(assignment, currentSelections, nodes)
    );
    const nextSelections = pickBestBinaryAssignmentCandidate({
      participant,
      groupNode,
      assignments: candidateAssignments,
      currentSelections,
      pinnedNodeId: clickedNode.id,
    });
    if (!nextSelections) {
      return;
    }
    participant.binarySelections = nextSelections;
    render();
  }

  function closeMenu() {
    if (!menu) {
      return;
    }
    state.menuOpen = false;
    state.menuAnchorElement = null;
    menu.hidden = true;
    menu.setAttribute("aria-hidden", "true");
    menu.innerHTML = "";
  }

  function updateMenuPosition() {
    if (!state.menuOpen || !menu || !root) {
      return;
    }
    if (
      state.menuMode === "template-grid-picker" &&
      state.menuAnchorElement instanceof Element
    ) {
      const bounds = state.menuAnchorElement.getBoundingClientRect();
      state.menuClientX =
        state.menuSide === "product" ? bounds.right - 12 : bounds.left;
      state.menuClientY = bounds.bottom + 10;
    }
    const { left, top } = clampMenuPosition(
      state.menuClientX,
      state.menuClientY,
      menu,
      root
    );
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
  }

  function renderMenuTitle(text) {
    const title = document.createElement("div");
    title.className = "composer-reaction-solver-menu-title";
    title.textContent = text;
    menu.appendChild(title);
  }

  function renderMenuButton(text, options = {}) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "composer-reaction-solver-menu-button";
    if (Array.isArray(options.extraClassNames)) {
      options.extraClassNames.filter(Boolean).forEach((className) => {
        button.classList.add(className);
      });
    }
    if (Array.isArray(options.lines) && options.lines.length) {
      options.lines.forEach((line) => {
        const lineElement = document.createElement("span");
        lineElement.className = "composer-reaction-solver-menu-button-line";
        lineElement.textContent = String(line ?? "");
        button.appendChild(lineElement);
      });
    } else {
      button.textContent = text;
    }
    button.disabled = !!options.disabled;
    if (options.kind) {
      button.dataset.kind = options.kind;
    }
    if (typeof options.onClick === "function") {
      button.addEventListener("click", options.onClick);
    }
    menu.appendChild(button);
    return button;
  }

  function createPickerTilePreview(pickerCell = null) {
    const preview = document.createElement("div");
    preview.className = "composer-reaction-solver-particle composer-reaction-solver-picker-card";
    if (!pickerCell || pickerCell.vacant) {
      preview.classList.add("is-vacant");
      preview.setAttribute("aria-hidden", "true");
      return preview;
    }
    const previewParticipant = {
      templateId: pickerCell.templateId,
      label: pickerCell.label,
      polarity: "",
    };
    const meta = getParticipantCardMeta(previewParticipant);
    preview.style.setProperty("--solver-accent", meta.accent);
    const label = document.createElement("div");
    label.className = "composer-reaction-solver-particle-label";
    getParticipantCardLabelLines(pickerCell.label, previewParticipant).forEach((line) => {
      const lineElement = document.createElement("span");
      lineElement.className = "composer-reaction-solver-particle-label-line";
      lineElement.textContent = line;
      label.appendChild(lineElement);
    });
    preview.appendChild(label);
    return preview;
  }

  function createColumnAddButton(side) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "composer-reaction-solver-add-button";
    button.dataset.addSide = side;
    button.setAttribute(
      "aria-label",
      side === "product" ? "Add product" : side === "center" ? "Add transmute tile" : "Add reactant"
    );
    if (
      state.menuOpen &&
      state.menuMode === "template-grid-picker" &&
      state.menuSide === side
    ) {
      button.classList.add("is-active");
    }
    button.textContent = "+";
    if (side === "center") {
      button.addEventListener("click", () => addTransmuteParticipant());
    } else {
      button.addEventListener("click", (event) => openTemplateGridPicker(side, event.currentTarget));
    }
    return button;
  }

  function createColumnAddControl(side) {
    const control = document.createElement("div");
    control.className = `composer-reaction-solver-add-control is-${side}`;
    control.appendChild(createColumnAddButton(side));
    return control;
  }

  function openTemplatePicker(side) {
    state.menuMode = "template-picker";
    state.menuSide = side === "product" ? "product" : "reactant";
    state.menuParticipantId = "";
    renderMenu();
  }

  function openTemplateGridPicker(side, triggerElement = null) {
    if (!state.active || !menu || !triggerElement) {
      return;
    }
    const resolvedSide = side === "product" ? "product" : "reactant";
    if (
      state.menuOpen &&
      state.menuMode === "template-grid-picker" &&
      state.menuSide === resolvedSide
    ) {
      closeMenu();
      return;
    }
    closeExternalMenus();
    const bounds = triggerElement.getBoundingClientRect();
    state.menuClientX =
      resolvedSide === "product" ? bounds.right - 12 : bounds.left;
    state.menuClientY = bounds.bottom + 10;
    state.menuAnchorElement = triggerElement;
    state.menuMode = "template-grid-picker";
    state.menuSide = resolvedSide;
    state.menuParticipantId = "";
    state.menuOpen = true;
    renderMenu();
  }

  function openParticipantMenuAt(participantId, clientX, clientY) {
    if (!state.active || !menu || !findParticipantById(participantId)) {
      return;
    }
    closeExternalMenus();
    state.menuClientX = clientX;
    state.menuClientY = clientY;
    state.menuAnchorElement = null;
    state.menuMode = "participant-actions";
    state.menuParticipantId = participantId;
    state.menuOpen = true;
    renderMenu();
  }

  function insertParticipantAtTopOfSide(participant) {
    if (!participant) {
      return;
    }
    const insertionIndex = state.participants.findIndex(
      (entry) => String(entry?.side ?? "") === String(participant.side ?? "")
    );
    if (insertionIndex < 0) {
      state.participants.push(participant);
      return;
    }
    state.participants.splice(insertionIndex, 0, participant);
  }

  function addParticipant(side, templateId, options = {}) {
    const templateEntry =
      templateEntries.find((entry) => entry.template === templateId) ??
      templateEntries[0] ??
      null;
    if (!templateEntry) {
      return;
    }
    const participantLabel =
      getDefaultParticipantBaseLabel(templateEntry.template, templateEntry.label);
    const participant = createParticipantRecord({
      side,
      templateId: templateEntry.template,
      label: participantLabel,
      hierarchy: buildFallbackHierarchyForTemplate(templateEntry.template, participantLabel),
      extraFields: {
        polarity: options.initialPolarity ?? templateEntry.initialPolarity ?? "",
      },
    });
    insertParticipantAtTopOfSide(participant);
    state.pendingSourceKey = "";
    closeMenu();
    render();
    setStatus(
      `${side === "reactant" ? "Reactant" : "Product"} ${participant.label} added to the reaction solver.`
    );
  }

  function addParticipantFromPickerCell(side, pickerCell = null) {
    if (!pickerCell?.templateId || pickerCell.vacant) {
      return;
    }
    const participant = createParticipantRecord({
      side,
      templateId: pickerCell.templateId,
      label: pickerCell.label,
      structureFactory: ({ participantId, polarity }) =>
        buildReactionParticipantStructureForPickerCell(pickerCell, {
          participantId,
          label: pickerCell.label,
          polarity,
        }),
    });
    insertParticipantAtTopOfSide(participant);
    state.pendingSourceKey = "";
    state.pendingSourceRole = "";
    closeMenu();
    render();
    setStatus(
      `${side === "reactant" ? "Reactant" : "Product"} ${participant.label} added to the reaction solver.`
    );
  }

  function addTransmuteParticipant() {
    const participant = createParticipantRecord({
      side: "center",
      templateId: "transmute",
      label: "Transmute",
      hierarchy: buildFallbackHierarchyForTemplate("transmute", "Transmute"),
      extraFields: {
        centerSlotIndex: 0,
        centerYRatio: 0.5,
      },
    });
    state.participants.push(participant);
    assignTransmuteParticipantToSlot(participant, getFirstAvailableTransmuteSlotIndex(participant.id));
    state.pendingSourceKey = "";
    state.pendingSourceRole = "";
    closeMenu();
    render();
    setStatus("Transmute tile added to the reaction solver.");
  }

  function clearReactionCanvas() {
    if (!state.participants.length && !state.mappings.length && !state.pendingSourceKey) {
      closeMenu();
      render();
      setStatus("Reaction canvas is already clear.");
      return;
    }
    state.participants = [];
    state.mappings = [];
    state.pendingSourceKey = "";
    state.pendingSourceRole = "";
    state.hoveredMappingIds = [];
    clearAllRecentRouteState();
    closeMenu();
    render();
    setStatus("Reaction canvas cleared.");
  }

  function renderMenu() {
    if (!menu) {
      return;
    }
    menu.hidden = false;
    menu.setAttribute("aria-hidden", "false");
    menu.innerHTML = "";
    menu.dataset.menuMode = state.menuMode;
    if (state.menuMode === "template-picker") {
      renderMenuTitle(
        state.menuSide === "product" ? "Choose product" : "Choose reactant"
      );
      sortedTemplateEntries.forEach((entry) => {
        const itemButton = renderMenuButton(entry.label, {
          onClick: () =>
            addParticipant(state.menuSide, entry.template, {
              initialPolarity: entry.initialPolarity,
            }),
        });
        const meta = getTemplateMeta(entry.template, entry.label);
        itemButton.style.setProperty("--solver-entry-accent", meta.accent);
        itemButton.dataset.shortLabel = meta.shortLabel;
      });
      renderMenuButton("Back", {
        kind: "secondary",
        onClick: () => {
          state.menuMode = "root";
          state.menuParticipantId = "";
          renderMenu();
        },
      });
    } else if (state.menuMode === "template-grid-picker") {
      renderMenuTitle(state.menuSide === "product" ? "Add Product" : "Add Reactant");
      addPickerCells.forEach((pickerCell) => {
        if (pickerCell.vacant) {
          const vacantCell = document.createElement("span");
          vacantCell.className = "composer-reaction-solver-picker-vacant";
          vacantCell.style.gridColumn = String(pickerCell.columnIndex + 1);
          vacantCell.style.gridRow = String(pickerCell.rowIndex + 2);
          vacantCell.appendChild(createPickerTilePreview(pickerCell));
          menu.appendChild(vacantCell);
          return;
        }
        const tileButton = document.createElement("button");
        tileButton.type = "button";
        tileButton.className = "composer-reaction-solver-picker-tile";
        tileButton.style.gridColumn = String(pickerCell.columnIndex + 1);
        tileButton.style.gridRow = String(pickerCell.rowIndex + 2);
        tileButton.setAttribute(
          "aria-label",
          `${state.menuSide === "product" ? "Add product" : "Add reactant"} ${pickerCell.label}`
        );
        tileButton.appendChild(createPickerTilePreview(pickerCell));
        tileButton.addEventListener("click", () =>
          addParticipantFromPickerCell(state.menuSide, pickerCell)
        );
        menu.appendChild(tileButton);
      });
    } else if (state.menuMode === "participant-actions") {
      const participant = findParticipantById(state.menuParticipantId);
      if (!participant) {
        state.menuMode = "root";
        state.menuParticipantId = "";
        renderMenu();
        return;
      }
      renderMenuTitle(participant.label);
      if (
        participant.templateId === "higgs_cluster" ||
        participant.templateId === "photon" ||
        participant.templateId === "neutron" ||
        participant.templateId === "proton"
      ) {
        renderMenuButton("Split assembly", {
          onClick: () => splitCompositeParticipantById(participant.id),
        });
      }
      const generationTrimAction = getNextParticipantGenerationTrimAction(participant);
      if (generationTrimAction) {
        renderMenuButton(generationTrimAction.menuLabel, {
          onClick: () => trimParticipantGenerationSlot(participant.id, generationTrimAction.slotName),
        });
      }
      if (supportsParticipantPolarity(participant.templateId)) {
        renderMenuButton(
          participant.polarity === "anti" ? "Make pro" : "Make anti",
          {
            onClick: () =>
              setParticipantPolarity(
                participant.id,
                participant.polarity === "anti" ? "pro" : "anti"
              ),
          }
        );
      }
      renderMenuButton(
        `Remove ${getParticipantSideLabel(participant.side)}`,
        {
          onClick: () => removeParticipantById(participant.id),
        }
      );
      renderMenuButton("Back", {
        kind: "secondary",
        onClick: () => {
          state.menuMode = "root";
          state.menuParticipantId = "";
          renderMenu();
        },
      });
    } else {
      renderMenuTitle("Reaction");
      renderMenuButton("Add reactant", {
        lines: ["Add", "Reactant"],
        extraClassNames: ["is-root-tile"],
        onClick: () => openTemplatePicker("reactant"),
      });
      renderMenuButton("Add product", {
        lines: ["Add", "Product"],
        extraClassNames: ["is-root-tile"],
        onClick: () => openTemplatePicker("product"),
      });
      renderMenuButton("Add transmute", {
        lines: ["Add", "Transmute"],
        extraClassNames: ["is-wide", "is-root-tile"],
        onClick: () => addTransmuteParticipant(),
      });
      renderMenuButton("Clear reaction canvas", {
        kind: "secondary",
        extraClassNames: ["is-wide"],
        disabled: !state.participants.length && !state.mappings.length && !state.pendingSourceKey,
        onClick: () => clearReactionCanvas(),
      });
      renderMenuButton("Auto solve (not yet implemented)", {
        disabled: true,
        extraClassNames: ["is-wide"],
      });
    }
    updateMenuPosition();
  }

  function openMenuAt(clientX, clientY) {
    if (!state.active || !menu) {
      return;
    }
    closeExternalMenus();
    state.menuClientX = clientX;
    state.menuClientY = clientY;
    state.menuAnchorElement = null;
    state.menuMode = "root";
    state.menuParticipantId = "";
    state.menuOpen = true;
    renderMenu();
  }

  function setActive(nextValue, options = {}) {
    const { persist = true, announce = true } = options;
    const nextActive = !!nextValue;
    if (state.active === nextActive) {
      return;
    }
    state.active = nextActive;
    state.pendingSourceKey = "";
    state.pendingSourceRole = "";
    closeMenu();
    closeExternalMenus();
    if (root) {
      root.classList.toggle("is-open", nextActive);
      root.setAttribute("aria-hidden", nextActive ? "false" : "true");
    }
    if (toggleButton) {
      toggleButton.classList.toggle("is-active", nextActive);
      toggleButton.setAttribute("aria-pressed", nextActive ? "true" : "false");
    }
    onActiveChange(nextActive);
    if (persist) {
      persistSolverActive(storage, storageKey, nextActive);
    }
    render();
    if (announce) {
      setStatus(
        nextActive
          ? "Reaction solver opened. Use the + controls to add reactants, products, or a transmute tile."
          : "Reaction solver closed."
      );
    }
  }

  function toggleActive() {
    setActive(!state.active);
  }

  function handleAnchorClick(role, nodeKey) {
    if (isSingleMappingAnchorRole(role)) {
      const existingMapping = findMappingByNodeKey(nodeKey);
      if (existingMapping) {
        state.pendingSourceKey = "";
        state.pendingSourceRole = "";
        if (removeMappingById(existingMapping.id)) {
          render();
          setStatus("Removed reaction mapping.");
        }
        return;
      }
    }

    const anchorAvailability = getAnchorAvailability(role, nodeKey);
    if (anchorAvailability.disabled) {
      if (anchorAvailability.reason) {
        setStatus(anchorAvailability.reason);
      }
      return;
    }

    if (canStartMappingFromRole(role)) {
      const isClearingPending =
        state.pendingSourceKey === nodeKey && state.pendingSourceRole === role;
      state.pendingSourceKey = isClearingPending ? "" : nodeKey;
      state.pendingSourceRole = isClearingPending ? "" : role;
      render();
      if (!state.pendingSourceKey) {
        setStatus(
          role === "transmute-output"
            ? "Transmute output anchor cleared."
            : "Reactant anchor cleared."
        );
        return;
      }
      const eligibleTargetCount = countEligibleTargets();
      if (role === "transmute-output") {
        setStatus(
          eligibleTargetCount
            ? "Transmute output selected. Conservative product targets remain active; incompatible targets are dimmed."
            : "Transmute output selected, but no conservative product targets are currently available."
        );
        return;
      }
      setStatus(
        eligibleTargetCount
          ? "Reactant anchor selected. Conservative product and Transmute targets remain active; incompatible targets are dimmed."
          : "Reactant anchor selected, but no conservative targets are currently available."
      );
      return;
    }

    if (!state.pendingSourceKey || !state.pendingSourceRole) {
      setStatus("Choose a reactant or Transmute output anchor first.");
      return;
    }

    if (
      state.pendingSourceRole === "reactant" &&
      role !== "product" &&
      role !== "transmute-input"
    ) {
      setStatus("Reactant anchors connect to products or to a Transmute input.");
      return;
    }
    if (state.pendingSourceRole === "transmute-output" && role !== "product") {
      setStatus("Transmute outputs connect to product anchors only.");
      return;
    }

    const mappingId = addOrReplaceMapping(
      state.pendingSourceKey,
      state.pendingSourceRole,
      nodeKey,
      role
    );
    markMappingsRecent([mappingId]);
    state.pendingSourceKey = "";
    state.pendingSourceRole = "";
    render();
    setStatus(
      role === "transmute-input" ? "Reactant routed into Transmute." : "Reaction mapping added."
    );
  }


  function getTransmuteCardTop(centerYRatio = 0.5) {
    return `${Math.max(0.08, Math.min(0.92, Number(centerYRatio) || 0.5)) * 100}%`;
  }

  function getCenterLaneFallbackSlotRatios(requiredCount = 1) {
    const fallbackCount = Math.max(1, requiredCount);
    const startRatio = 0.28;
    const stepRatio = 0.18;
    return Array.from({ length: fallbackCount }, (_, index) =>
      Math.max(0.08, Math.min(0.92, startRatio + index * stepRatio))
    );
  }

  function getTransmuteSlotRatios(requiredCount = 1) {
    if (!centerColumn) {
      return getCenterLaneFallbackSlotRatios(requiredCount);
    }
    const bounds = centerColumn.getBoundingClientRect();
    const height = Math.max(1, bounds.height);
    const minCenter = transmuteCardHeightPx / 2 + transmuteSlotEdgePaddingPx;
    const maxCenter = Math.max(minCenter, height - transmuteCardHeightPx / 2 - transmuteSlotEdgePaddingPx);

    const baseCenters = [
      ...surface.querySelectorAll(".composer-reaction-solver-participant:not(.is-center)"),
    ]
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return rect.top + rect.height / 2 - bounds.top;
      })
      .filter((value) => Number.isFinite(value))
      .sort((left, right) => left - right)
      .reduce((centers, value) => {
        if (!centers.length || Math.abs(centers[centers.length - 1] - value) > 16) {
          centers.push(Math.max(minCenter, Math.min(maxCenter, value)));
        }
        return centers;
      }, []);

    if (!baseCenters.length) {
      return getCenterLaneFallbackSlotRatios(requiredCount);
    }

    const deltas = [];
    for (let index = 1; index < baseCenters.length; index += 1) {
      deltas.push(baseCenters[index] - baseCenters[index - 1]);
    }
    const sortedDeltas = deltas.filter((value) => value > 0).sort((left, right) => left - right);
    const derivedStep =
      sortedDeltas.length > 0
        ? sortedDeltas[Math.floor(sortedDeltas.length / 2)]
        : transmuteSlotStepPx;
    const slotStep = Math.max(64, derivedStep || transmuteSlotStepPx);
    const centers = [...baseCenters];

    while (centers.length < requiredCount) {
      const nextCenter = centers[centers.length - 1] + slotStep;
      if (nextCenter > maxCenter + 0.5) {
        break;
      }
      centers.push(nextCenter);
    }
    while (centers.length < requiredCount) {
      const previousCenter = centers[0] - slotStep;
      if (previousCenter < minCenter - 0.5) {
        break;
      }
      centers.unshift(previousCenter);
    }

    return centers.map((center) => center / height);
  }

  function getOccupiedTransmuteSlotIndexes(excludedParticipantId = "") {
    return new Set(
      state.participants
        .filter(
          (participant) =>
            isTransmuteParticipant(participant) && String(participant.id) !== String(excludedParticipantId)
        )
        .map((participant) => Number(participant.centerSlotIndex))
        .filter((slotIndex) => Number.isInteger(slotIndex) && slotIndex >= 0)
    );
  }

  function getFirstAvailableTransmuteSlotIndex(excludedParticipantId = "") {
    const occupied = getOccupiedTransmuteSlotIndexes(excludedParticipantId);
    let slotIndex = 0;
    while (occupied.has(slotIndex)) {
      slotIndex += 1;
    }
    return slotIndex;
  }

  function findNearestAvailableTransmuteSlotIndex(targetIndex, excludedParticipantId = "") {
    const occupied = getOccupiedTransmuteSlotIndexes(excludedParticipantId);
    const preferredIndex = Math.max(0, Math.round(Number(targetIndex) || 0));
    if (!occupied.has(preferredIndex)) {
      return preferredIndex;
    }
    for (let distance = 1; distance < 64; distance += 1) {
      const lowerIndex = preferredIndex - distance;
      const upperIndex = preferredIndex + distance;
      if (lowerIndex >= 0 && !occupied.has(lowerIndex)) {
        return lowerIndex;
      }
      if (!occupied.has(upperIndex)) {
        return upperIndex;
      }
    }
    return getFirstAvailableTransmuteSlotIndex(excludedParticipantId);
  }

  function assignTransmuteParticipantToSlot(participant, requestedSlotIndex) {
    if (!participant || !isTransmuteParticipant(participant)) {
      return;
    }
    const resolvedSlotIndex = findNearestAvailableTransmuteSlotIndex(
      requestedSlotIndex,
      participant.id
    );
    const slotRatios = getTransmuteSlotRatios(resolvedSlotIndex + 1);
    const resolvedRatio =
      slotRatios[resolvedSlotIndex] ??
      slotRatios[slotRatios.length - 1] ??
      getCenterLaneFallbackSlotRatios(resolvedSlotIndex + 1)[resolvedSlotIndex] ??
      0.5;
    participant.centerSlotIndex = resolvedSlotIndex;
    participant.centerYRatio = resolvedRatio;
  }

  function syncTransmuteCardPosition(participantId) {
    if (!surface) {
      return;
    }
    const participant = findParticipantById(participantId);
    const card = surface.querySelector(
      `.composer-reaction-solver-participant.is-center[data-participant-id="${CSS.escape(participantId)}"]`
    );
    if (!participant || !card) {
      return;
    }
    assignTransmuteParticipantToSlot(participant, participant.centerSlotIndex);
    card.style.top = getTransmuteCardTop(participant.centerYRatio);
  }

  function updateTransmuteDrag(clientY) {
    if (!state.dragParticipantId || !centerColumn) {
      return;
    }
    const participant = findParticipantById(state.dragParticipantId);
    if (!participant) {
      return;
    }
    const bounds = centerColumn.getBoundingClientRect();
    const height = Math.max(1, bounds.height);
    const targetRatio = Math.max(0.08, Math.min(0.92, (clientY - bounds.top) / height));
    const slotRatios = getTransmuteSlotRatios(
      Math.max(
        getFirstAvailableTransmuteSlotIndex(participant.id) + 1,
        state.participants.filter((entry) => isTransmuteParticipant(entry)).length + 2
      )
    );
    const nearestSlotIndex = slotRatios.reduce((bestIndex, ratio, index) => {
      if (bestIndex < 0) {
        return index;
      }
      return Math.abs(ratio - targetRatio) < Math.abs(slotRatios[bestIndex] - targetRatio)
        ? index
        : bestIndex;
    }, -1);
    const nextSlotIndex = findNearestAvailableTransmuteSlotIndex(
      nearestSlotIndex,
      participant.id
    );
    const nextRatio = slotRatios[nextSlotIndex] ?? participant.centerYRatio ?? 0.5;
    if (
      participant.centerSlotIndex === nextSlotIndex &&
      Math.abs((participant.centerYRatio ?? 0.5) - nextRatio) < 0.001
    ) {
      return;
    }
    participant.centerSlotIndex = nextSlotIndex;
    participant.centerYRatio = nextRatio;
    syncTransmuteCardPosition(participant.id);
    scheduleMappingDraw();
  }

  function stopTransmuteDrag() {
    if (!state.dragParticipantId || !surface) {
      state.dragParticipantId = "";
      state.dragPointerId = null;
      return;
    }
    const card = surface.querySelector(
      `.composer-reaction-solver-participant.is-center[data-participant-id="${CSS.escape(state.dragParticipantId)}"]`
    );
    if (card) {
      card.classList.remove("is-dragging");
    }
    state.dragParticipantId = "";
    state.dragPointerId = null;
  }

  function startTransmuteDrag(event, participantId) {
    if (event.button !== 0 || !centerColumn) {
      return;
    }
    const target = event.target;
    if (target instanceof Element && target.closest(".composer-reaction-solver-anchor")) {
      return;
    }
    state.dragParticipantId = participantId;
    state.dragPointerId = event.pointerId;
    const card = event.currentTarget;
    if (card instanceof HTMLElement) {
      card.classList.add("is-dragging");
      if (typeof card.setPointerCapture === "function") {
        try {
          card.setPointerCapture(event.pointerId);
        } catch (_error) {
          // Ignore capture failures and continue with document-level dragging.
        }
      }
    }
    updateTransmuteDrag(event.clientY);
    event.preventDefault();
  }

  function updateHint() {
    if (!mapHint || !emptyState) {
      return;
    }
    const hasParticipants = state.participants.length > 0;
    emptyState.hidden = hasParticipants;
    emptyState.setAttribute("aria-hidden", hasParticipants ? "true" : "false");
    if (!hasParticipants) {
      mapHint.textContent =
        "Use the + controls to add reactants, products, or a transmute tile.";
      return;
    }
    if (state.pendingSourceKey) {
      mapHint.textContent =
        state.pendingSourceRole === "transmute-output"
          ? "transmute output selected. Conservative product targets remain active; incompatible targets are dimmed."
          : "Source anchor selected. Conservative product and transmute targets remain active; incompatible targets are dimmed.";
      return;
    }
    if (!state.mappings.length) {
      mapHint.textContent =
        "Choose a reactant anchor, then a product or transmute anchor, to author the first mapping.";
      return;
    }
    mapHint.textContent = `${state.mappings.length} mapping${state.mappings.length === 1 ? "" : "s"} authored. Click any mapped anchor to remove it.`;
  }

  function getElementCenterWithinSurface(element, bounds) {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - bounds.left,
      y: rect.top + rect.height / 2 - bounds.top,
    };
  }

  function drawCompositeLinks(bounds) {
    state.participants
      .filter((participant) => isCompositeParticipant(participant))
      .forEach((participant) => {
        const rootNode = getParticipantRootNode(participant);
        const rootNodeKey = rootNode ? buildNodeKey(participant.id, rootNode.id) : "";
        const isIneligible =
          !!state.pendingSourceKey &&
          participant.side === "product" &&
          !!rootNodeKey &&
          getAnchorAvailability(participant.side, rootNodeKey).disabled;
        const collector = surface.querySelector(
          `.composer-reaction-solver-composite-collector[data-composite-collector-id="${CSS.escape(participant.id)}"]`
        );
        if (!collector) {
          return;
        }
        const targetPoint = getElementCenterWithinSurface(collector, bounds);
        const sourceAnchors = Array.from(
          surface.querySelectorAll(
            `.composer-reaction-solver-anchor[data-composite-participant-id="${CSS.escape(participant.id)}"][data-composite-source-key]`
          )
        );
        sourceAnchors.forEach((sourceAnchor) => {
          const sourcePoint = getElementCenterWithinSurface(sourceAnchor, bounds);
          const deltaX = Math.max(28, Math.abs(targetPoint.x - sourcePoint.x) * 0.55);
          const direction = targetPoint.x >= sourcePoint.x ? 1 : -1;
          const path = createSvgElement("path");
          path.setAttribute(
            "d",
            `M ${sourcePoint.x} ${sourcePoint.y} C ${sourcePoint.x + deltaX * direction} ${sourcePoint.y}, ${targetPoint.x - deltaX * 0.6 * direction} ${targetPoint.y}, ${targetPoint.x} ${targetPoint.y}`
          );
          path.setAttribute("class", "composer-reaction-solver-composite-link");
          if (isIneligible) {
            path.classList.add("is-ineligible");
          }
          mapSvg.appendChild(path);
        });
      });
  }

  function drawMappings() {
    drawFrameId = 0;
    if (!state.active || !surface || !mapSvg) {
      return;
    }
    const bounds = surface.getBoundingClientRect();
    const width = Math.max(1, Math.round(bounds.width));
    const height = Math.max(1, Math.round(bounds.height));
    mapSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    mapSvg.innerHTML = "";
    drawCompositeLinks(bounds);
    state.mappings.forEach((mapping) => {
      const sourceAnchor = surface.querySelector(
        `.composer-reaction-solver-anchor[data-anchor-key="${CSS.escape(mapping.sourceKey)}"][data-anchor-side="${CSS.escape(mapping.sourceRole)}"]`
      );
      const targetAnchor = surface.querySelector(
        `.composer-reaction-solver-anchor[data-anchor-key="${CSS.escape(mapping.targetKey)}"][data-anchor-side="${CSS.escape(mapping.targetRole)}"]`
      );
      if (!sourceAnchor || !targetAnchor) {
        return;
      }
      const sourceRect = sourceAnchor.getBoundingClientRect();
      const targetRect = targetAnchor.getBoundingClientRect();
      const startX = sourceRect.left + sourceRect.width / 2 - bounds.left;
      const startY = sourceRect.top + sourceRect.height / 2 - bounds.top;
      const endX = targetRect.left + targetRect.width / 2 - bounds.left;
      const endY = targetRect.top + targetRect.height / 2 - bounds.top;
      const deltaX = Math.max(96, Math.abs(endX - startX) * 0.35);
      const path = createSvgElement("path");
      path.setAttribute(
        "d",
        `M ${startX} ${startY} C ${startX + deltaX} ${startY}, ${endX - deltaX} ${endY}, ${endX} ${endY}`
      );
      path.setAttribute("class", "composer-reaction-solver-path");
      path.dataset.mappingId = mapping.id;
      path.addEventListener("pointerenter", () => setHoveredMappingIds([mapping.id]));
      path.addEventListener("pointerleave", () => setHoveredMappingIds([]));
      mapSvg.appendChild(path);
    });
    applyHoveredRouteState();
  }

  function scheduleMappingDraw() {
    if (drawFrameId) {
      cancelAnimationFrame(drawFrameId);
    }
    drawFrameId = requestAnimationFrame(drawMappings);
  }

  function render() {
    if (!root || !reactantsColumn || !productsColumn || !centerColumn) {
      return;
    }
    root.classList.toggle("is-open", state.active);
    root.setAttribute("aria-hidden", state.active ? "false" : "true");
    reactantsColumn.innerHTML = "";
    centerColumn.innerHTML = "";
    productsColumn.innerHTML = "";
    if (!state.active) {
      if (mapSvg) {
        mapSvg.innerHTML = "";
      }
      state.anchorRegistry = new Map();
      state.hoveredMappingIds = [];
      return;
    }
    rebuildAnchorRegistry();
    const reactantParticipants = state.participants.filter(
      (participant) => participant.side === "reactant"
    );
    const productParticipants = state.participants.filter(
      (participant) => participant.side === "product"
    );
    const centerParticipants = state.participants.filter(
      (participant) => participant.side === "center"
    );
    reactantsColumn.appendChild(createColumnAddControl("reactant"));
    if (reactantParticipants.length) {
      reactantsColumn.appendChild(createSideSlotHeader("reactant"));
    }
    reactantParticipants.forEach((participant) => {
      reactantsColumn.appendChild(renderParticipantCard(participant));
    });
    productsColumn.appendChild(createColumnAddControl("product"));
    centerColumn.appendChild(createColumnAddControl("center"));
    if (productParticipants.length) {
      productsColumn.appendChild(createSideSlotHeader("product"));
    }
    productParticipants.forEach((participant) => {
      productsColumn.appendChild(renderParticipantCard(participant));
    });
    centerParticipants.forEach((participant) => {
      assignTransmuteParticipantToSlot(participant, participant.centerSlotIndex);
      centerColumn.appendChild(createTransmuteParticipantCard(participant));
    });
    updateHint();
    scheduleMappingDraw();
  }

  function handleSurfaceContextMenu(event) {
    if (!state.active) {
      return;
    }
    event.preventDefault();
  }

  function handleDocumentPointerDown(event) {
    if (!state.active || !state.menuOpen || !menu) {
      return;
    }
    if (menu.contains(event.target)) {
      return;
    }
    closeMenu();
  }

  function handleDocumentPointerMove(event) {
    if (!state.active || !state.dragParticipantId) {
      return;
    }
    if (state.dragPointerId !== null && event.pointerId !== state.dragPointerId) {
      return;
    }
    updateTransmuteDrag(event.clientY);
  }

  function handleDocumentPointerUp(event) {
    if (!state.active || !state.dragParticipantId) {
      return;
    }
    if (state.dragPointerId !== null && event.pointerId !== state.dragPointerId) {
      return;
    }
    stopTransmuteDrag();
  }

  function handleRootKeyDown(event) {
    if (!state.active) {
      return;
    }
    if (event.key === "Escape") {
      if (state.menuOpen) {
        closeMenu();
        return;
      }
      if (state.pendingSourceKey) {
        clearPendingSource();
      }
    }
  }

  function wireListeners() {
    if (toggleButton && !toggleButton.dataset.solverBound) {
      toggleButton.dataset.solverBound = "true";
      toggleButton.addEventListener("click", () => {
        toggleActive();
      });
    }
    if (root && !root.dataset.solverBound) {
      root.dataset.solverBound = "true";
      root.addEventListener("contextmenu", handleSurfaceContextMenu);
      root.addEventListener("keydown", handleRootKeyDown);
      root.addEventListener(
        "scroll",
        () => {
          if (state.active) {
            updateMenuPosition();
            scheduleMappingDraw();
          }
        },
        true
      );
    }
    if (!document.body.dataset.composerReactionSolverDocumentBound) {
      document.body.dataset.composerReactionSolverDocumentBound = "true";
      document.addEventListener("pointerdown", handleDocumentPointerDown, true);
      document.addEventListener("pointermove", handleDocumentPointerMove, true);
      document.addEventListener("pointerup", handleDocumentPointerUp, true);
      document.addEventListener("pointercancel", handleDocumentPointerUp, true);
      window.addEventListener("resize", () => {
        if (state.active) {
          updateMenuPosition();
          scheduleMappingDraw();
        }
      });
    }
  }

  wireListeners();
  if (readPersistedSolverActive(storage, storageKey)) {
    setActive(true, { persist: false, announce: false });
  }
  render();

  return {
    isActive: () => state.active,
    setActive,
    toggleActive,
    closeMenu,
    render,
  };
}

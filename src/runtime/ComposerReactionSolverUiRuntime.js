import {
  createComposerReactionMappingRulesRuntime,
} from "./ComposerReactionMappingRulesRuntime.js";
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
import {
  getReactionCompositeModeLabel,
  normalizeReactionCompositeMode,
  supportsReactionCompositeModes,
} from "./ComposerReactionCompositeModeRuntime.js";
import { buildReactionParticipantStructure } from "./ComposerReactionStructureBridgeRuntime.js";
import {
  createComposerReactionParticipantRenderRuntime,
} from "./ComposerReactionParticipantRenderRuntime.js";
import {
  applyReactionSolverLayoutCssVars,
  applyReactionSolverSurfaceGridLayout,
  getReactionSurfaceLaneFallbackRatios,
  measureReactionSurfaceLaneRatios,
  REACTION_SOLVER_OPERATOR_LANE_WIDTH_PX,
  REACTION_SOLVER_LAYOUT,
} from "./ComposerReactionSolverLayoutRuntime.js";
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
  l_polar_transform: { shortLabel: "LP", accent: "#52a7ff" },
  r_polar_transform: { shortLabel: "RP", accent: "#ff7f66" },
  associate: { shortLabel: "As", accent: "#35b59a" },
  dissociate: { shortLabel: "Ds", accent: "#ff8a52" },
  electron: { shortLabel: "e-", accent: "#2d8cff" },
  neutrino: { shortLabel: "𝜈", accent: "#a259ff" },
  down_quark: { shortLabel: "d", accent: "#4a78ff" },
  up_quark: { shortLabel: "u", accent: "#ff5a4a" },
  fermion_gen1: { shortLabel: "F1", accent: "#c2d5ff" },
});

export const REACTION_OPERATOR_ENTRIES = Object.freeze([
  { templateId: "transmute", label: "Transmute" },
  { templateId: "l_polar_transform", label: "L Polar Transform" },
  { templateId: "r_polar_transform", label: "R Polar Transform" },
  { templateId: "associate", label: "Associate" },
  { templateId: "dissociate", label: "Dissociate" },
]);
export const REACTION_OPERATOR_LANE_COUNT = 2;
const operatorEntries = REACTION_OPERATOR_ENTRIES;
export const REACTION_OPERATOR_LANE_LAYOUT = Object.freeze([
  Object.freeze({
    laneIndex: 0,
    templateId: "polarity_transform",
    label: "Polarity Transform",
    pickerEntries: Object.freeze([
      Object.freeze({
        templateId: "l_polar_transform",
        label: "Polarity Plus",
      }),
      Object.freeze({
        templateId: "r_polar_transform",
        label: "Polarity Minus",
      }),
    ]),
    enabled: true,
  }),
  Object.freeze({
    laneIndex: 1,
    templateId: "operator",
    label: "Operator",
    pickerEntries: Object.freeze([
      Object.freeze({
        templateId: "associate",
        label: "Associate",
      }),
      Object.freeze({
        templateId: "transmute",
        label: "Transmute",
      }),
    ]),
    enabled: true,
  }),
]);
const operatorTemplateIds = new Set(
  operatorEntries.map((entry) => entry.templateId)
);

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

function isOperatorTemplateId(templateId = "") {
  return operatorTemplateIds.has(String(templateId ?? "").trim().toLowerCase());
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
  if (isOperatorTemplateId(templateId)) {
    return [
      {
        id: "root",
        label: String(label ?? "").trim() || getDefaultParticipantBaseLabel(templateId, "Transformer"),
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

function syncParticipantCompositeMode(participant) {
  if (!participant) {
    return "";
  }
  const nextMode = supportsReactionCompositeModes(participant.templateId)
    ? normalizeReactionCompositeMode(
        participant.templateId,
        participant.compositeMode,
        participant.side
      )
    : "";
  if (nextMode) {
    participant.compositeMode = nextMode;
    return nextMode;
  }
  delete participant.compositeMode;
  return "";
}

function getParticipantCompositeModeLabel(participant) {
  const mode = supportsReactionCompositeModes(participant?.templateId)
    ? normalizeReactionCompositeMode(
        participant?.templateId,
        participant?.compositeMode,
        participant?.side
      )
    : "";
  return mode ? getReactionCompositeModeLabel(mode) : "";
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
  if (normalizedTemplateId === "l_polar_transform") {
    return "L Polar Transform";
  }
  if (normalizedTemplateId === "r_polar_transform") {
    return "R Polar Transform";
  }
  if (normalizedTemplateId === "associate") {
    return "Associate";
  }
  if (normalizedTemplateId === "dissociate") {
    return "Dissociate";
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

function getOperatorNode(participant) {
  return isOperatorTemplateId(participant?.templateId) ? getParticipantRootNode(participant) : null;
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

function isOperatorParticipant(participant) {
  return participant?.side === "operator" && isOperatorTemplateId(participant?.templateId);
}

function isSingleMappingAnchorRole(role = "") {
  return role === "reactant" || role === "product";
}

function canStartMappingFromRole(role = "") {
  return role === "reactant" || role === "operator-output";
}

function canTargetMappingRole(role = "") {
  return role === "product" || role === "operator-input";
}

function normalizeAnchorInstanceIndex(anchorInstanceIndex) {
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

const operatorCardHeightPx = REACTION_SOLVER_LAYOUT.binaryChoiceSizePx;
const solverTileGapPx = REACTION_SOLVER_LAYOUT.tileGapPx;
const operatorTrackWidthPx = REACTION_SOLVER_OPERATOR_LANE_WIDTH_PX;
const operatorSlotStepPx = REACTION_SOLVER_LAYOUT.operatorSlotStepPx;
const recentRouteFadeMs = 400;
const operatorSlotEdgePaddingPx = REACTION_SOLVER_LAYOUT.operatorSlotEdgePaddingPx;
const operatorLaneCount = REACTION_OPERATOR_LANE_COUNT;
const operatorLaneEdgePaddingPx = REACTION_SOLVER_LAYOUT.operatorLaneEdgePaddingPx;
const solverRouteAnchorGapPx = REACTION_SOLVER_LAYOUT.routeAnchorGapPx;
const operatorGraphicConnectionStepPx =
  REACTION_SOLVER_LAYOUT.operatorGraphicConnectionStepPx;
const solverAddButtonSizePx = REACTION_SOLVER_LAYOUT.addButtonSizePx;

function getParticipantSideLabel(side = "", options = {}) {
  const label =
    side === "product" ? "product" : side === "operator" ? "operator" : "reactant";
  if (!options.capitalized) {
    return label;
  }
  return label[0]?.toUpperCase() + label.slice(1);
}

function createSvgElement(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}

function normalizeOperatorLaneIndex(laneIndex = 0) {
  return Math.max(0, Math.min(operatorLaneCount - 1, Math.round(Number(laneIndex) || 0)));
}

function getOperatorLaneLayoutEntry(laneIndex = 0) {
  const resolvedLaneIndex = normalizeOperatorLaneIndex(laneIndex);
  return (
    REACTION_OPERATOR_LANE_LAYOUT.find((entry) => entry.laneIndex === resolvedLaneIndex) ??
    REACTION_OPERATOR_LANE_LAYOUT[resolvedLaneIndex] ??
    null
  );
}

function getEnabledOperatorLaneLayoutEntries() {
  return REACTION_OPERATOR_LANE_LAYOUT.filter((entry) => entry.enabled);
}

function getOperatorLanePickerEntries(columnEntry = null) {
  return Array.isArray(columnEntry?.pickerEntries) ? columnEntry.pickerEntries : [];
}

function getOperatorRootMenuEntries() {
  return REACTION_OPERATOR_LANE_LAYOUT.flatMap((entry) => {
    if (!entry?.enabled) {
      return [];
    }
    const pickerEntries = getOperatorLanePickerEntries(entry);
    if (pickerEntries.length) {
      return pickerEntries.map((pickerEntry) => ({
        laneIndex: entry.laneIndex,
        templateId: pickerEntry.templateId,
        label: pickerEntry.label,
      }));
    }
    return [
      {
        laneIndex: entry.laneIndex,
        templateId: entry.templateId,
        label: entry.label,
      },
    ];
  });
}

function getReactionSurfaceLaneEntries() {
  return [
    { side: "reactant", operatorLaneIndex: null },
    ...getEnabledOperatorLaneLayoutEntries().map((entry) => ({
      side: "operator",
      operatorLaneIndex: entry.laneIndex,
    })),
    { side: "product", operatorLaneIndex: null },
  ];
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

  applyReactionSolverLayoutCssVars(surface);
  applyReactionSolverSurfaceGridLayout({
    surface,
    reactantsColumn,
    productsColumn,
  });

  const operatorLayer = root?.querySelector(".composer-reaction-solver-operator-layer") ?? null;
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
    pendingSourceAnchorInstanceIndex: null,
    menuMode: "root",
    menuSide: "reactant",
    menuParticipantId: "",
    menuOperatorLaneIndex: 0,
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
  let operatorLayoutFrameId = 0;
  let applyHoveredRouteState = () => {};
  let createAnchorButton = () => document.createElement("button");
  let createInlineAnchorLane = () => document.createElement("div");
  let createSideSlotHeader = () => document.createElement("div");
  let createOperatorParticipantCard = () => document.createElement("article");
  let renderParticipantCard = () => document.createElement("article");
  let setHoveredMappingIds = () => {};
  let syncOperatorFan = () => {};
  const mappingRulesRuntime = createComposerReactionMappingRulesRuntime({
    getNodeContext,
    getOperatorInputNodeContexts,
    getOperatorLedgerSummary,
    parseNodeKey,
    resolveBinaryChoiceInventory,
  });

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
    resolvePendingTargetAvailability: (payload) =>
      mappingRulesRuntime.evaluatePendingTargetAvailability(payload),
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
    getPendingSourceAnchorInstanceIndex: () => state.pendingSourceAnchorInstanceIndex,
    getPendingSourceKey: () => state.pendingSourceKey,
    getPendingSourceRole: () => state.pendingSourceRole,
    getRecentMappingIds: () => state.recentMappingIds,
    handleAnchorClick,
    isSingleMappingAnchorRole,
    mapSvg,
    markMappingsRecent,
    shouldSuppressRouteState: () => !!state.pendingSourceKey,
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
    getOperatorGraphicOffsets,
    getDefaultParticipantBaseLabel,
    getIsDraggingParticipant: (participantId) => state.dragParticipantId === participantId,
    getParticipantCardLabelLines,
    getParticipantCardMeta,
    getParticipantRootNode,
    getPendingSourceKey: () => state.pendingSourceKey,
    getOperatorCardLeft,
    getOperatorCardTop,
    getOperatorLedgerSummary,
    getOperatorNode,
    isCompositeParticipant,
    isProductCompositeParticipant,
    isQuarkTemplateId,
    isReactantCompositeParticipant,
    openParticipantMenuAt,
    reducedBinaryPersonalityChoiceIds,
    resolveBinaryGlyphPolarity,
    setBinaryPersonalitySelection,
    shouldRenderChildNodes,
    startOperatorDrag,
    supportsParticipantPolarity,
    topLevelHierarchyHasRenderMode,
  });
  ({
    createSideSlotHeader,
    createOperatorParticipantCard,
    renderParticipantCard,
    syncOperatorFan,
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
    const resolvedPolarity = supportsParticipantPolarity(resolvedTemplateId)
      ? normalizeParticipantPolarity(
          extraFields.polarity ?? inferParticipantPolarityFromStructure(structure?.root ?? structure)
        )
      : "";
    const participantId = `solver_participant_${state.nextParticipantId++}`;
    const pendingBaseLabel = stripLeadingParticipantPolarity(String(label ?? "").trim());
    const factoryStructure =
      !structure && typeof structureFactory === "function"
        ? structureFactory({
            participantId,
            templateId: resolvedTemplateId,
            baseLabel: pendingBaseLabel,
            polarity: resolvedPolarity,
          })
        : null;
    const sourceStructure = structure ?? factoryStructure;
    const resolvedBaseLabel = stripLeadingParticipantPolarity(
      pendingBaseLabel || inferParticipantBaseLabelFromStructure(sourceStructure?.root ?? sourceStructure)
    );
    const participant = {
      id: participantId,
      side,
      templateId: resolvedTemplateId,
      baseLabel: resolvedBaseLabel,
      polarity: resolvedPolarity,
      label: formatParticipantLabel(resolvedBaseLabel, resolvedTemplateId, resolvedPolarity),
      hierarchy: Array.isArray(hierarchy) ? hierarchy : [],
      binarySelections: {},
      ...extraFields,
    };
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
    syncParticipantCompositeMode(participant);
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

  function subtractLedgers(leftLedger = null, rightLedger = null) {
    return {
      electrino: Math.max(
        0,
        Number(leftLedger?.electrino ?? 0) - Number(rightLedger?.electrino ?? 0)
      ),
      positrino: Math.max(
        0,
        Number(leftLedger?.positrino ?? 0) - Number(rightLedger?.positrino ?? 0)
      ),
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
    return mappingRulesRuntime.getNodeLedgerFromContext(
      context,
      resolveBinaryChoiceInventory
    );
  }

  function getOperatorInputNodeContexts(participantId) {
    return state.mappings
      .filter((mapping) => {
        const { participantId: targetParticipantId } = parseNodeKey(mapping.targetKey);
        return targetParticipantId === participantId && mapping.targetRole === "operator-input";
      })
      .map((mapping) => getNodeContext(mapping.sourceKey))
      .filter(Boolean);
  }

  function getOperatorLedgerSummary(participantId) {
    const cache = new Map();
    const activeStack = new Set();

    function resolveOperatorSummary(targetParticipantId) {
      const normalizedParticipantId = String(targetParticipantId ?? "").trim();
      if (!normalizedParticipantId) {
        return {
          incomingLedger: createEmptyLedger(),
          outputLedger: createEmptyLedger(),
          outgoingLedger: createEmptyLedger(),
          routedOutgoingLedger: createEmptyLedger(),
          undischargedLedger: createEmptyLedger(),
          incomingCount: 0,
          outgoingCount: 0,
          isOpen: false,
          isInvalid: false,
          isBalanced: false,
        };
      }
      if (cache.has(normalizedParticipantId)) {
        return cache.get(normalizedParticipantId);
      }
      if (activeStack.has(normalizedParticipantId)) {
        return {
          incomingLedger: createEmptyLedger(),
          outputLedger: createEmptyLedger(),
          outgoingLedger: createEmptyLedger(),
          routedOutgoingLedger: createEmptyLedger(),
          undischargedLedger: createEmptyLedger(),
          incomingCount: 0,
          outgoingCount: 0,
          isOpen: false,
          isInvalid: false,
          isBalanced: false,
        };
      }

      activeStack.add(normalizedParticipantId);
      const participant = findParticipantById(normalizedParticipantId);
      const incomingMappings = state.mappings.filter((mapping) => {
        const { participantId: mappingTargetParticipantId } = parseNodeKey(mapping.targetKey);
        return (
          mappingTargetParticipantId === normalizedParticipantId &&
          mapping.targetRole === "operator-input"
        );
      });
      const outgoingMappings = state.mappings.filter((mapping) => {
        const { participantId: mappingSourceParticipantId } = parseNodeKey(mapping.sourceKey);
        return (
          mappingSourceParticipantId === normalizedParticipantId &&
          mapping.sourceRole === "operator-output"
        );
      });
      const incomingLedger = incomingMappings.reduce((ledger, mapping) => {
        const sourceLedger =
          mapping.sourceRole === "operator-output"
            ? resolveOperatorSummary(parseNodeKey(mapping.sourceKey).participantId).outputLedger
            : getNodeLedger(mapping.sourceKey);
        return addLedgers(ledger, sourceLedger);
      }, createEmptyLedger());
      const outputLedger =
        participant?.side === "operator" && hasLedger(incomingLedger)
          ? { ...incomingLedger }
          : createEmptyLedger();
      const routedOutgoingLedger = outgoingMappings.reduce((ledger, mapping) => {
        const mappedLedger =
          mapping.targetRole === "operator-input"
            ? outputLedger
            : getNodeLedger(mapping.targetKey);
        return addLedgers(ledger, mappedLedger);
      }, createEmptyLedger());
      const isInvalid =
        hasLedger(outputLedger) && !ledgerFitsWithin(outputLedger, routedOutgoingLedger);
      const isBalanced =
        hasLedger(outputLedger) &&
        hasLedger(routedOutgoingLedger) &&
        ledgersMatch(outputLedger, routedOutgoingLedger);
      const isOpen = hasLedger(outputLedger) && !isInvalid && !isBalanced;
      const summary = {
        incomingLedger,
        outputLedger,
        outgoingLedger: routedOutgoingLedger,
        routedOutgoingLedger,
        undischargedLedger: subtractLedgers(outputLedger, routedOutgoingLedger),
        incomingCount: incomingMappings.length,
        outgoingCount: outgoingMappings.length,
        isOpen,
        isInvalid,
        isBalanced,
      };
      activeStack.delete(normalizedParticipantId);
      cache.set(normalizedParticipantId, summary);
      return summary;
    }

    return resolveOperatorSummary(participantId);
  }

  function isOperatorParticipantBalanced(participantId) {
    return getOperatorLedgerSummary(participantId).isBalanced;
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
      state.pendingSourceAnchorInstanceIndex = null;
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
    syncParticipantCompositeMode(participant);
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
    syncParticipantCompositeMode(participant);
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
      `${participant.side === "reactant" ? "Reactant" : "Product"} Higgs cluster dissociated into four Noether core assemblies.`
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
    const dissociationSummary =
      participant.templateId === "photon"
        ? "dissociated into pro and anti Noether core assemblies."
        : participant.templateId === "higgs_cluster"
          ? "dissociated into four Noether core assemblies."
          : "dissociated into constituent quarks.";
    setStatus(
      `${participant.side === "reactant" ? "Reactant" : "Product"} ${participant.label} ${dissociationSummary}`
    );
    return true;
  }

  function addOrReplaceMapping(
    sourceKey,
    sourceRole,
    targetKey,
    targetRole,
    {
      sourceAnchorInstanceIndex = null,
      targetAnchorInstanceIndex = null,
    } = {}
  ) {
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
      sourceAnchorInstanceIndex,
      targetAnchorInstanceIndex,
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
    state.pendingSourceAnchorInstanceIndex = null;
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
      .filter((participant) => participant.side === "product" || participant.side === "operator")
      .forEach((participant) => {
        const visit = (nodes = []) => {
          nodes.forEach((node) => {
            const nodeKey = buildNodeKey(participant.id, node.id);
            if (participant.side === "product") {
              if (!getAnchorAvailability("product", nodeKey).disabled) {
                count += 1;
              }
            } else if (participant.side === "operator") {
              const operatorNode = getOperatorNode(participant);
              if (operatorNode && node.id === operatorNode.id) {
                if (!getAnchorAvailability("operator-input", nodeKey).disabled) {
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

  function createColumnAddButton(side, options = {}) {
    const operatorLaneIndex = normalizeOperatorLaneIndex(options.operatorLaneIndex);
    const operatorLayerEntry =
      side === "operator" ? getOperatorLaneLayoutEntry(operatorLaneIndex) : null;
    const operatorPickerEntries = getOperatorLanePickerEntries(operatorLayerEntry);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "composer-reaction-solver-add-button";
    button.dataset.addSide = side;
    if (side === "operator") {
      button.dataset.operatorLaneIndex = String(operatorLaneIndex);
    }
    button.setAttribute(
      "aria-label",
      side === "product"
        ? "Add product"
        : side === "operator"
          ? operatorLayerEntry?.enabled
            ? operatorPickerEntries.length
              ? `Choose ${operatorLayerEntry.label}`
              : `Add ${operatorLayerEntry.label}`
            : `${operatorLayerEntry?.label ?? "Operator"} is disabled`
          : "Add reactant"
    );
    if (
      state.menuOpen &&
      ((state.menuMode === "template-grid-picker" && state.menuSide === side) ||
        (side === "operator" &&
          state.menuMode === "operator-picker" &&
          state.menuOperatorLaneIndex === operatorLaneIndex))
    ) {
      button.classList.add("is-active");
    }
    button.textContent = "+";
    if (side === "operator") {
      if (operatorLayerEntry?.enabled) {
        if (operatorPickerEntries.length > 0) {
          button.addEventListener("click", (event) =>
            openOperatorPicker(operatorLaneIndex, event.currentTarget)
          );
        } else {
          button.addEventListener("click", () =>
            addOperatorParticipant(operatorLayerEntry.templateId, operatorLaneIndex)
          );
        }
      } else {
        button.disabled = true;
      }
    } else {
      button.addEventListener("click", (event) => openTemplateGridPicker(side, event.currentTarget));
    }
    return button;
  }

  function openOperatorPicker(operatorLaneIndex, triggerElement = null) {
    if (!state.active || !menu || !triggerElement) {
      return;
    }
    const resolvedLaneIndex = normalizeOperatorLaneIndex(operatorLaneIndex);
    const operatorLayerEntry = getOperatorLaneLayoutEntry(resolvedLaneIndex);
    if (!operatorLayerEntry?.enabled || !getOperatorLanePickerEntries(operatorLayerEntry).length) {
      return;
    }
    if (
      state.menuOpen &&
      state.menuMode === "operator-picker" &&
      state.menuOperatorLaneIndex === resolvedLaneIndex
    ) {
      closeMenu();
      return;
    }
    closeExternalMenus();
    const bounds = triggerElement.getBoundingClientRect();
    state.menuClientX = bounds.left + bounds.width / 2;
    state.menuClientY = bounds.bottom + 10;
    state.menuAnchorElement = triggerElement;
    state.menuMode = "operator-picker";
    state.menuOperatorLaneIndex = resolvedLaneIndex;
    state.menuParticipantId = "";
    state.menuOpen = true;
    renderMenu();
  }

  function createColumnAddControl(side, options = {}) {
    const control = document.createElement("div");
    control.className = `composer-reaction-solver-add-control is-${side}`;
    if (side === "operator") {
      const resolvedLaneIndex = normalizeOperatorLaneIndex(options.operatorLaneIndex);
      control.dataset.operatorLaneIndex = String(resolvedLaneIndex);
      control.style.left = getOperatorCardLeft(resolvedLaneIndex);
    }
    control.appendChild(createColumnAddButton(side, options));
    return control;
  }

  function createOperatorAddControls() {
    const controls = document.createElement("div");
    const laneEntries = getReactionSurfaceLaneEntries();
    const laneRatios = getReactionSurfaceLaneRatios(laneEntries.length);
    controls.className = "composer-reaction-solver-surface-add-controls";
    laneEntries.forEach((entry, laneIndex) => {
      const control = createColumnAddControl(entry.side, {
        operatorLaneIndex: entry.operatorLaneIndex,
      });
      control.dataset.surfaceLaneIndex = String(laneIndex);
      control.style.left = `${(laneRatios[laneIndex] ?? 0.5) * 100}%`;
      controls.appendChild(control);
    });
    return controls;
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
    state.pendingSourceAnchorInstanceIndex = null;
    closeMenu();
    render();
    const compositeModeLabel = getParticipantCompositeModeLabel(participant);
    setStatus(
      `${side === "reactant" ? "Reactant" : "Product"} ${participant.label} added to the reaction solver${
        compositeModeLabel ? ` in ${compositeModeLabel.toLowerCase()} mode` : ""
      }.`
    );
  }

  function addParticipantFromPickerCell(side, pickerCell = null) {
    if (!pickerCell?.templateId || pickerCell.vacant) {
      return;
    }
    const participant = createParticipantRecord({
      side,
      templateId: pickerCell.templateId,
      structureFactory: ({ participantId, polarity }) =>
        buildReactionParticipantStructureForPickerCell(pickerCell, {
          participantId,
          polarity,
        }),
    });
    insertParticipantAtTopOfSide(participant);
    state.pendingSourceKey = "";
    state.pendingSourceRole = "";
    state.pendingSourceAnchorInstanceIndex = null;
    closeMenu();
    render();
    const compositeModeLabel = getParticipantCompositeModeLabel(participant);
    setStatus(
      `${side === "reactant" ? "Reactant" : "Product"} ${participant.label} added to the reaction solver${
        compositeModeLabel ? ` in ${compositeModeLabel.toLowerCase()} mode` : ""
      }.`
    );
  }

  function addOperatorParticipant(templateId = "transmute", operatorLaneIndex = 1) {
    const normalizedTemplateId = isOperatorTemplateId(templateId) ? templateId : "transmute";
    const resolvedLaneIndex = normalizeOperatorLaneIndex(operatorLaneIndex);
    const participant = createParticipantRecord({
      side: "operator",
      templateId: normalizedTemplateId,
      label: getDefaultParticipantBaseLabel(normalizedTemplateId, "Transmute"),
      hierarchy: buildFallbackHierarchyForTemplate(
        normalizedTemplateId,
        getDefaultParticipantBaseLabel(normalizedTemplateId, "Transmute")
      ),
      extraFields: {
        operatorLaneIndex: resolvedLaneIndex,
        operatorSlotIndex: 0,
        operatorYRatio: 0.5,
      },
    });
    state.participants.push(participant);
    assignOperatorParticipantToSlot(
      participant,
      getFirstAvailableOperatorSlotIndex(participant.id, resolvedLaneIndex)
    );
    state.pendingSourceKey = "";
    state.pendingSourceRole = "";
    state.pendingSourceAnchorInstanceIndex = null;
    closeMenu();
    render();
    setStatus(`${participant.label} added to the reaction solver.`);
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
    state.pendingSourceAnchorInstanceIndex = null;
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
    } else if (state.menuMode === "operator-picker") {
      const operatorLayerEntry = getOperatorLaneLayoutEntry(state.menuOperatorLaneIndex);
      const pickerEntries = getOperatorLanePickerEntries(operatorLayerEntry);
      renderMenuTitle(operatorLayerEntry?.label || "Choose operator");
      pickerEntries.forEach((entry) => {
        renderMenuButton(entry.label, {
          onClick: () => addOperatorParticipant(entry.templateId, state.menuOperatorLaneIndex),
        });
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
      const compositeModeLabel = getParticipantCompositeModeLabel(participant);
      if (compositeModeLabel) {
        renderMenuButton(`Mode: ${compositeModeLabel}`, {
          disabled: true,
          kind: "secondary",
        });
      }
      if (
        participant.templateId === "higgs_cluster" ||
        participant.templateId === "photon" ||
        participant.templateId === "neutron" ||
        participant.templateId === "proton"
      ) {
        renderMenuButton("Dissociate", {
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
      getOperatorRootMenuEntries().forEach((entry) => {
        renderMenuButton(`Add ${entry.label.toLowerCase()}`, {
          lines: ["Add", entry.label],
          extraClassNames: ["is-wide", "is-root-tile"],
          onClick: () => addOperatorParticipant(entry.templateId, entry.laneIndex),
        });
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
    state.pendingSourceAnchorInstanceIndex = null;
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
          ? "Reaction solver opened. Use the left + for reactants, lane 2 + for polarity operators, lane 3 + for associate or transmute, and the right + for products."
          : "Reaction solver closed."
      );
    }
  }

  function toggleActive() {
    setActive(!state.active);
  }

  function handleAnchorClick(role, nodeKey, anchorInstanceIndex = null) {
    if (isSingleMappingAnchorRole(role)) {
      const existingMapping = findMappingByNodeKey(nodeKey);
      if (existingMapping) {
        state.pendingSourceKey = "";
        state.pendingSourceRole = "";
        state.pendingSourceAnchorInstanceIndex = null;
        if (removeMappingById(existingMapping.id)) {
          render();
          setStatus("Removed reaction mapping.");
        }
        return;
      }
    }

    const anchorAvailability = getAnchorAvailability(role, nodeKey, anchorInstanceIndex);
    if (anchorAvailability.disabled) {
      if (anchorAvailability.reason) {
        setStatus(anchorAvailability.reason);
      }
      return;
    }

    if (canStartMappingFromRole(role)) {
      const isClearingPending =
        state.pendingSourceKey === nodeKey &&
        state.pendingSourceRole === role &&
        state.pendingSourceAnchorInstanceIndex === anchorInstanceIndex;
      state.pendingSourceKey = isClearingPending ? "" : nodeKey;
      state.pendingSourceRole = isClearingPending ? "" : role;
      state.pendingSourceAnchorInstanceIndex = isClearingPending ? null : anchorInstanceIndex;
      setHoveredMappingIds([]);
      render();
      if (!state.pendingSourceKey) {
        setStatus(
          role === "operator-output"
            ? "Operator output anchor cleared."
            : "Reactant anchor cleared."
        );
        return;
      }
      const eligibleTargetCount = countEligibleTargets();
      if (role === "operator-output") {
        setStatus(
          eligibleTargetCount
            ? "Operator output selected. All targets remain available; rule-breaking connections will stay red until fixed."
            : "Operator output selected."
        );
        return;
      }
      setStatus(
        eligibleTargetCount
          ? "Reactant anchor selected. All targets remain available; rule-breaking connections will stay red until fixed."
          : "Reactant anchor selected."
      );
      return;
    }

    if (!state.pendingSourceKey || !state.pendingSourceRole) {
      setStatus("Choose a reactant or operator output anchor first.");
      return;
    }

    if (
      state.pendingSourceRole === "reactant" &&
      role !== "product" &&
      role !== "operator-input"
    ) {
      setStatus("Reactant anchors connect to products or to an operator input.");
      return;
    }
    if (state.pendingSourceRole === "operator-output" && role !== "product" && role !== "operator-input") {
      setStatus("Operator outputs connect to product anchors or operator inputs.");
      return;
    }

    const sourceRole = state.pendingSourceRole;
    const mappingId = addOrReplaceMapping(
      state.pendingSourceKey,
      sourceRole,
      nodeKey,
      role,
      {
        sourceAnchorInstanceIndex: state.pendingSourceAnchorInstanceIndex,
        targetAnchorInstanceIndex: anchorInstanceIndex,
      }
    );
    markMappingsRecent([mappingId]);
    state.pendingSourceKey = "";
    state.pendingSourceRole = "";
    state.pendingSourceAnchorInstanceIndex = null;
    render();
    const validation = getMappingValidation(
      state.mappings.find((mapping) => mapping.id === mappingId) ?? null
    );
    setStatus(
      validation.valid
        ? role === "operator-input" && sourceRole === "reactant"
          ? "Reactant routed into operator."
          : role === "operator-input" && sourceRole === "operator-output"
            ? "Operator routed into operator."
          : "Reaction mapping added."
        : `Connection added but invalid: ${validation.reason}`
    );
  }


  function getOperatorCardTop(operatorYRatio = 0.5) {
    return `${Math.max(0.08, Math.min(0.92, Number(operatorYRatio) || 0.5)) * 100}%`;
  }

  function getOperatorGraphicOffsets(participant, connectionCount = 4) {
    if (!participant) {
      return [];
    }
    const count =
      participant.templateId === "associate" || participant.templateId === "dissociate"
        ? 2
        : Math.max(1, Math.round(Number(connectionCount) || 0));
    const centerIndex = (count - 1) / 2;
    return Array.from({ length: count }, (_, index) =>
      (index - centerIndex) * operatorGraphicConnectionStepPx
    );
  }

  function getMappingValidation(mapping) {
    return mappingRulesRuntime.getMappingValidation(mapping);
  }

  function getOperatorLaneFallbackRatios(requiredCount = operatorLaneCount) {
    if (requiredCount <= 1) {
      return [0.5];
    }
    const minRatio = 0.18;
    const maxRatio = 0.82;
    const step = (maxRatio - minRatio) / (requiredCount - 1);
    return Array.from({ length: requiredCount }, (_, index) => minRatio + step * index);
  }

  function getReactionSurfaceLaneRatios(requiredCount = getReactionSurfaceLaneEntries().length) {
    const count = Math.max(1, requiredCount);
    const laneEntries = getReactionSurfaceLaneEntries();
    if (!surface) {
      return getReactionSurfaceLaneFallbackRatios(laneEntries).slice(0, count);
    }
    if (count <= 1) {
      return [0.5];
    }
    if (!reactantsColumn || !productsColumn) {
      return getReactionSurfaceLaneFallbackRatios(laneEntries).slice(0, count);
    }
    const measuredRatios = measureReactionSurfaceLaneRatios({
      surface,
      reactantsColumn,
      productsColumn,
      laneEntries,
    });
    if (!Array.isArray(measuredRatios) || measuredRatios.length !== laneEntries.length) {
      return getReactionSurfaceLaneFallbackRatios(laneEntries).slice(0, count);
    }
    return measuredRatios.slice(0, count);
  }

  function getOperatorLaneRatios(requiredCount = operatorLaneCount) {
    const visibleLaneEntries = getReactionSurfaceLaneEntries();
    const laneRatios = getReactionSurfaceLaneRatios(visibleLaneEntries.length);
    const visibleOperatorEntries = visibleLaneEntries.filter((entry) => entry.side === "operator");
    const visibleOperatorRatios = visibleOperatorEntries
      .map((entry) => {
        const laneIndex = visibleLaneEntries.findIndex(
          (laneEntry) =>
            laneEntry.side === "operator" &&
            normalizeOperatorLaneIndex(laneEntry.operatorLaneIndex) ===
              normalizeOperatorLaneIndex(entry.operatorLaneIndex)
        );
        return laneRatios[laneIndex];
      })
      .filter((ratio) => Number.isFinite(ratio));
    if (visibleOperatorRatios.length) {
      return visibleOperatorRatios;
    }

    const count = Math.max(1, requiredCount);
    if (!operatorLayer) {
      return getOperatorLaneFallbackRatios(count);
    }
    const bounds = operatorLayer.getBoundingClientRect();
    const width = Math.max(1, bounds.width);
    const minCenter = operatorTrackWidthPx / 2 + operatorLaneEdgePaddingPx;
    const maxCenter = Math.max(
      minCenter,
      width - operatorTrackWidthPx / 2 - operatorLaneEdgePaddingPx
    );
    if (count <= 1 || maxCenter - minCenter <= 1) {
      return Array.from({ length: count }, () => 0.5);
    }
    const fullSpreadStep = (maxCenter - minCenter) / (count - 1);
    const fullSpreadGap = Math.max(0, fullSpreadStep - operatorTrackWidthPx);
    const compressedGap = fullSpreadGap * 0.25;
    const step = operatorTrackWidthPx + compressedGap;
    const availableClusterStart = Math.max(minCenter, maxCenter - step * (count - 1));
    const centeredStart = width / 2 - (step * (count - 1)) / 2;
    const startCenter = Math.max(minCenter, Math.min(centeredStart, availableClusterStart));
    return Array.from({ length: count }, (_, index) => (startCenter + step * index) / width);
  }

  function getOperatorCardLeft(operatorLaneIndex = 1) {
    const resolvedLaneIndex = normalizeOperatorLaneIndex(operatorLaneIndex);
    const laneEntries = getReactionSurfaceLaneEntries();
    const laneIndex = laneEntries.findIndex(
      (entry) =>
        entry.side === "operator" &&
        normalizeOperatorLaneIndex(entry.operatorLaneIndex) === resolvedLaneIndex
    );
    const laneRatios = getReactionSurfaceLaneRatios(laneEntries.length);
    return `${(laneRatios[laneIndex] ?? 0.5) * 100}%`;
  }

  function getOperatorLaneSlotElement(operatorLaneIndex = null) {
    if (!surface || operatorLaneIndex === null || operatorLaneIndex === undefined) {
      return null;
    }
    return surface.querySelector(
      `.composer-reaction-solver-lane-slot[data-operator-lane-index="${CSS.escape(String(
        normalizeOperatorLaneIndex(operatorLaneIndex)
      ))}"]`
    );
  }

  function getOperatorLaneFallbackSlotRatios(requiredCount = 1) {
    const fallbackCount = Math.max(1, requiredCount);
    const startRatio = 0.28;
    const stepRatio = 0.18;
    return Array.from({ length: fallbackCount }, (_, index) =>
      Math.max(0.08, Math.min(0.92, startRatio + index * stepRatio))
    );
  }

  function getOperatorSlotRatios(requiredCount = 1) {
    if (!operatorLayer) {
      return getOperatorLaneFallbackSlotRatios(requiredCount);
    }
    const bounds = operatorLayer.getBoundingClientRect();
    const height = Math.max(1, bounds.height);
    const minCenter = operatorCardHeightPx / 2 + operatorSlotEdgePaddingPx;
    const maxCenter = Math.max(minCenter, height - operatorCardHeightPx / 2 - operatorSlotEdgePaddingPx);

    const renderedTrackCenters = [
      ...surface.querySelectorAll(
        ".composer-reaction-solver-column .composer-reaction-solver-noether-core-grid-track, .composer-reaction-solver-column .composer-reaction-solver-binary-selector-grid-track"
      ),
    ]
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return rect.top + rect.height / 2 - bounds.top;
      })
      .filter((value) => Number.isFinite(value))
      .sort((left, right) => left - right)
      .reduce((centers, value) => {
        if (!centers.length || Math.abs(centers[centers.length - 1] - value) > 8) {
          centers.push(Math.max(minCenter, Math.min(maxCenter, value)));
        }
        return centers;
      }, []);

    const baseCenters =
      renderedTrackCenters.length > 0
        ? renderedTrackCenters
        : [
            ...surface.querySelectorAll(".composer-reaction-solver-participant:not(.is-operator)"),
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
      const topAlignedStartCenter = Math.max(
        minCenter,
        solverAddButtonSizePx + solverTileGapPx + operatorCardHeightPx / 2
      );
      const fallbackStepPx = Math.max(64, operatorCardHeightPx + solverTileGapPx * 2);
      return Array.from({ length: Math.max(1, requiredCount) }, (_, index) =>
        Math.min(maxCenter, topAlignedStartCenter + fallbackStepPx * index) / height
      );
    }

    const deltas = [];
    for (let index = 1; index < baseCenters.length; index += 1) {
      deltas.push(baseCenters[index] - baseCenters[index - 1]);
    }
    const sortedDeltas = deltas.filter((value) => value > 0).sort((left, right) => left - right);
    const derivedStep =
      sortedDeltas.length > 0
        ? sortedDeltas[Math.floor(sortedDeltas.length / 2)]
        : operatorSlotStepPx;
    const slotStep = Math.max(64, derivedStep || operatorSlotStepPx);
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

  function getOccupiedOperatorSlotIndexes(excludedParticipantId = "", operatorLaneIndex = null) {
    const normalizedColumnIndex =
      operatorLaneIndex === null ? null : normalizeOperatorLaneIndex(operatorLaneIndex);
    return new Set(
      state.participants
        .filter(
          (participant) =>
            isOperatorParticipant(participant) &&
            String(participant.id) !== String(excludedParticipantId) &&
            (normalizedColumnIndex === null ||
              normalizeOperatorLaneIndex(participant.operatorLaneIndex) === normalizedColumnIndex)
        )
        .map((participant) => Number(participant.operatorSlotIndex))
        .filter((slotIndex) => Number.isInteger(slotIndex) && slotIndex >= 0)
    );
  }

  function getFirstAvailableOperatorSlotIndex(excludedParticipantId = "", operatorLaneIndex = null) {
    const occupied = getOccupiedOperatorSlotIndexes(excludedParticipantId, operatorLaneIndex);
    let slotIndex = 0;
    while (occupied.has(slotIndex)) {
      slotIndex += 1;
    }
    return slotIndex;
  }

  function findNearestAvailableOperatorSlotIndex(
    targetIndex,
    excludedParticipantId = "",
    operatorLaneIndex = null
  ) {
    const occupied = getOccupiedOperatorSlotIndexes(excludedParticipantId, operatorLaneIndex);
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
    return getFirstAvailableOperatorSlotIndex(excludedParticipantId, operatorLaneIndex);
  }

  function assignOperatorParticipantToSlot(participant, requestedSlotIndex) {
    if (!participant || !isOperatorParticipant(participant)) {
      return;
    }
    const resolvedLaneIndex = normalizeOperatorLaneIndex(participant.operatorLaneIndex);
    const resolvedSlotIndex = findNearestAvailableOperatorSlotIndex(
      requestedSlotIndex,
      participant.id,
      resolvedLaneIndex
    );
    const slotRatios = getOperatorSlotRatios(resolvedSlotIndex + 1);
    const resolvedRatio =
      slotRatios[resolvedSlotIndex] ??
      slotRatios[slotRatios.length - 1] ??
      getOperatorLaneFallbackSlotRatios(resolvedSlotIndex + 1)[resolvedSlotIndex] ??
      0.5;
    participant.operatorLaneIndex = resolvedLaneIndex;
    participant.operatorSlotIndex = resolvedSlotIndex;
    participant.operatorYRatio = resolvedRatio;
  }

  function syncOperatorCardPosition(participantId) {
    if (!surface) {
      return;
    }
    const participant = findParticipantById(participantId);
    const card = surface.querySelector(
      `.composer-reaction-solver-participant.is-operator[data-participant-id="${CSS.escape(participantId)}"]`
    );
    if (!participant || !card) {
      return;
    }
    assignOperatorParticipantToSlot(participant, participant.operatorSlotIndex);
    card.style.left = getOperatorCardLeft(participant.operatorLaneIndex);
    card.style.top = getOperatorCardTop(participant.operatorYRatio);
    syncOperatorFan(card, participant);
  }

  function updateOperatorDrag(clientY) {
    if (!state.dragParticipantId || !operatorLayer) {
      return;
    }
    const participant = findParticipantById(state.dragParticipantId);
    if (!participant) {
      return;
    }
    const bounds = operatorLayer.getBoundingClientRect();
    const height = Math.max(1, bounds.height);
    const targetRatio = Math.max(0.08, Math.min(0.92, (clientY - bounds.top) / height));
    const slotRatios = getOperatorSlotRatios(
      Math.max(
        getFirstAvailableOperatorSlotIndex(participant.id, participant.operatorLaneIndex) + 1,
        state.participants.filter(
          (entry) =>
            isOperatorParticipant(entry) &&
            normalizeOperatorLaneIndex(entry.operatorLaneIndex) ===
              normalizeOperatorLaneIndex(participant.operatorLaneIndex)
        ).length + 2
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
    const nextSlotIndex = findNearestAvailableOperatorSlotIndex(
      nearestSlotIndex,
      participant.id,
      participant.operatorLaneIndex
    );
    const nextRatio = slotRatios[nextSlotIndex] ?? participant.operatorYRatio ?? 0.5;
    if (
      participant.operatorSlotIndex === nextSlotIndex &&
      Math.abs((participant.operatorYRatio ?? 0.5) - nextRatio) < 0.001
    ) {
      return;
    }
    participant.operatorSlotIndex = nextSlotIndex;
    participant.operatorYRatio = nextRatio;
    syncOperatorCardPosition(participant.id);
    scheduleMappingDraw();
  }

  function stopOperatorDrag() {
    if (!state.dragParticipantId || !surface) {
      state.dragParticipantId = "";
      state.dragPointerId = null;
      return;
    }
    const card = surface.querySelector(
      `.composer-reaction-solver-participant.is-operator[data-participant-id="${CSS.escape(state.dragParticipantId)}"]`
    );
    if (card) {
      card.classList.remove("is-dragging");
    }
    state.dragParticipantId = "";
    state.dragPointerId = null;
  }

  function startOperatorDrag(event, participantId) {
    if (event.button !== 0 || !operatorLayer) {
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
    updateOperatorDrag(event.clientY);
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
        "Use the left + for reactants, lane 2 + for polarity operators, lane 3 + for associate or transmute, and the right + for products.";
      return;
    }
    if (state.pendingSourceKey) {
      mapHint.textContent =
        state.pendingSourceRole === "operator-output"
          ? "Operator output selected. Rule-breaking connections remain visible in red until fixed."
          : "Source anchor selected. Rule-breaking connections remain visible in red until fixed.";
      return;
    }
    if (!state.mappings.length) {
      mapHint.textContent =
        "Choose a reactant anchor, then a product or operator anchor, to author the first mapping.";
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

  function getAnchorRadiusFromBounds(element) {
    if (!(element instanceof Element)) {
      return 0;
    }
    const rect = element.getBoundingClientRect();
    return Math.max(0, Math.min(rect.width, rect.height) / 2);
  }

  function getTrimmedRouteEndpoints(
    sourceElement,
    targetElement,
    bounds,
    edgeInset = solverRouteAnchorGapPx
  ) {
    const sourcePoint = getElementCenterWithinSurface(sourceElement, bounds);
    const targetPoint = getElementCenterWithinSurface(targetElement, bounds);
    const deltaX = targetPoint.x - sourcePoint.x;
    const deltaY = targetPoint.y - sourcePoint.y;
    const distance = Math.hypot(deltaX, deltaY);
    if (distance <= 0.001) {
      return {
        startX: sourcePoint.x,
        startY: sourcePoint.y,
        endX: targetPoint.x,
        endY: targetPoint.y,
      };
    }
    const unitX = deltaX / distance;
    const unitY = deltaY / distance;
    const sourceRadius = Math.max(0, getAnchorRadiusFromBounds(sourceElement) - edgeInset);
    const targetRadius = Math.max(0, getAnchorRadiusFromBounds(targetElement) - edgeInset);
    const totalInset = sourceRadius + targetRadius;
    if (totalInset >= distance) {
      const midpointX = (sourcePoint.x + targetPoint.x) / 2;
      const midpointY = (sourcePoint.y + targetPoint.y) / 2;
      return {
        startX: midpointX,
        startY: midpointY,
        endX: midpointX,
        endY: midpointY,
      };
    }
    return {
      startX: sourcePoint.x + unitX * sourceRadius,
      startY: sourcePoint.y + unitY * sourceRadius,
      endX: targetPoint.x - unitX * targetRadius,
      endY: targetPoint.y - unitY * targetRadius,
    };
  }

  function getCompositeBusRouteEndpoints(
    spanStem,
    collector,
    bounds,
    edgeInset = solverRouteAnchorGapPx
  ) {
    if (!(spanStem instanceof Element) || !(collector instanceof Element)) {
      return getTrimmedRouteEndpoints(spanStem, collector, bounds, edgeInset);
    }
    const collectorPoint = getElementCenterWithinSurface(collector, bounds);
    const stemRect = spanStem.getBoundingClientRect();
    const stemX = stemRect.left + stemRect.width / 2 - bounds.left;
    const stemTop = stemRect.top - bounds.top;
    const stemBottom = stemRect.bottom - bounds.top;
    const stemPoint = {
      x: stemX,
      y: Math.max(stemTop, Math.min(collectorPoint.y, stemBottom)),
    };
    const deltaX = collectorPoint.x - stemPoint.x;
    const deltaY = collectorPoint.y - stemPoint.y;
    const distance = Math.hypot(deltaX, deltaY);
    if (distance <= 0.001) {
      return {
        startX: stemPoint.x,
        startY: stemPoint.y,
        endX: collectorPoint.x,
        endY: collectorPoint.y,
      };
    }
    const unitX = deltaX / distance;
    const unitY = deltaY / distance;
    const collectorRadius = Math.max(0, getAnchorRadiusFromBounds(collector) - edgeInset);
    return {
      startX: stemPoint.x,
      startY: stemPoint.y,
      endX: collectorPoint.x - unitX * collectorRadius,
      endY: collectorPoint.y - unitY * collectorRadius,
    };
  }

  function drawCompositeLinks(bounds) {
    state.participants
      .filter((participant) => isCompositeParticipant(participant))
      .forEach((participant) => {
        const collector = surface.querySelector(
          `.composer-reaction-solver-composite-collector[data-composite-collector-id="${CSS.escape(participant.id)}"]`
        );
        if (!collector) {
          return;
        }
        const spanStem = surface.querySelector(
          `.composer-reaction-solver-composite-span-stem[data-composite-span-participant-id="${CSS.escape(participant.id)}"]`
        );
        if (spanStem) {
          const { startX, startY, endX, endY } = getCompositeBusRouteEndpoints(
            spanStem,
            collector,
            bounds
          );
          if (Math.abs(endX - startX) < 0.5 && Math.abs(endY - startY) < 0.5) {
            return;
          }
          const deltaX = endX - startX;
          const controlStartX = startX + deltaX * 0.42;
          const controlEndX = startX + deltaX * 0.82;
          const path = createSvgElement("path");
          path.setAttribute(
            "d",
            `M ${startX} ${startY} C ${controlStartX} ${startY}, ${controlEndX} ${endY}, ${endX} ${endY}`
          );
          path.setAttribute("class", "composer-reaction-solver-composite-link");
          mapSvg.appendChild(path);
          return;
        }
        const sourceAnchors = Array.from(
          surface.querySelectorAll(
            `.composer-reaction-solver-anchor[data-composite-participant-id="${CSS.escape(participant.id)}"][data-composite-source-key]`
          )
        );
        sourceAnchors.forEach((sourceAnchor) => {
          const { startX, startY, endX, endY } = getTrimmedRouteEndpoints(
            sourceAnchor,
            collector,
            bounds
          );
          const deltaX = endX - startX;
          const controlStartX = startX + deltaX * 0.42;
          const controlEndX = startX + deltaX * 0.82;
          const path = createSvgElement("path");
          path.setAttribute(
            "d",
            `M ${startX} ${startY} C ${controlStartX} ${startY}, ${controlEndX} ${endY}, ${endX} ${endY}`
          );
          path.setAttribute("class", "composer-reaction-solver-composite-link");
          mapSvg.appendChild(path);
        });
      });
  }

  function getRenderedAnchorsForNodeRole(nodeKey, role) {
    if (!surface) {
      return [];
    }
    return Array.from(
      surface.querySelectorAll(
        `.composer-reaction-solver-anchor[data-anchor-key="${CSS.escape(nodeKey)}"][data-anchor-side="${CSS.escape(role)}"]`
      )
    ).sort((leftAnchor, rightAnchor) => {
      const leftIndex = Number(leftAnchor.dataset.anchorInstanceIndex ?? 0);
      const rightIndex = Number(rightAnchor.dataset.anchorInstanceIndex ?? 0);
      if (leftIndex !== rightIndex) {
        return leftIndex - rightIndex;
      }
      const leftTop = leftAnchor.getBoundingClientRect().top;
      const rightTop = rightAnchor.getBoundingClientRect().top;
      return leftTop - rightTop;
    });
  }

  function getRenderedMappingAnchor(mapping, endpoint = "source") {
    if (!mapping) {
      return null;
    }
    const isSource = endpoint !== "target";
    const anchorKey = isSource ? mapping.sourceKey : mapping.targetKey;
    const anchorRole = isSource ? mapping.sourceRole : mapping.targetRole;
    const anchorInstanceIndex = isSource
      ? mapping.sourceAnchorInstanceIndex
      : mapping.targetAnchorInstanceIndex;
    const anchors = getRenderedAnchorsForNodeRole(anchorKey, anchorRole);
    if (!anchors.length) {
      return null;
    }
    const normalizedAnchorInstanceIndex = normalizeAnchorInstanceIndex(anchorInstanceIndex);
    if (normalizedAnchorInstanceIndex !== null) {
      const exactAnchor =
        anchors.find(
          (anchor) =>
            normalizeAnchorInstanceIndex(anchor.dataset.anchorInstanceIndex) ===
            normalizedAnchorInstanceIndex
        ) ?? null;
      if (exactAnchor) {
        return exactAnchor;
      }
    }
    if (anchors.length === 1) {
      return anchors[0];
    }
    const matchingMappings = state.mappings.filter((entry) =>
      isSource
        ? entry.sourceKey === anchorKey && entry.sourceRole === anchorRole
        : entry.targetKey === anchorKey && entry.targetRole === anchorRole
    );
    const mappingIndex = matchingMappings.findIndex((entry) => entry.id === mapping.id);
    if (mappingIndex < 0) {
      return anchors[0];
    }
    return anchors[mappingIndex % anchors.length] ?? anchors[0];
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
      const sourceAnchor = getRenderedMappingAnchor(mapping, "source");
      const targetAnchor = getRenderedMappingAnchor(mapping, "target");
      if (!sourceAnchor || !targetAnchor) {
        return;
      }
      const { startX, startY, endX, endY } = getTrimmedRouteEndpoints(
        sourceAnchor,
        targetAnchor,
        bounds
      );
      const deltaX = Math.max(96, Math.abs(endX - startX) * 0.35);
      const validation = getMappingValidation(mapping);
      const path = createSvgElement("path");
      path.setAttribute(
        "d",
        `M ${startX} ${startY} C ${startX + deltaX} ${startY}, ${endX - deltaX} ${endY}, ${endX} ${endY}`
      );
      path.setAttribute("class", "composer-reaction-solver-path");
      path.dataset.mappingId = mapping.id;
      path.classList.toggle("is-invalid", !validation.valid);
      if (validation.reason) {
        const title = createSvgElement("title");
        title.textContent = validation.reason;
        path.appendChild(title);
      }
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

  function syncOperatorLaneLayout() {
    if (!state.active || !operatorLayer) {
      return false;
    }
    const bounds = operatorLayer.getBoundingClientRect();
    if (bounds.width <= 1 || bounds.height <= 1) {
      return false;
    }

    const laneRatios = getReactionSurfaceLaneRatios(getReactionSurfaceLaneEntries().length);
    Array.from(
      operatorLayer.querySelectorAll(
        ".composer-reaction-solver-surface-add-controls > .composer-reaction-solver-add-control"
      )
    ).forEach((control, index) => {
      const resolvedLaneIndex = Math.max(
        0,
        Math.round(Number(control.dataset.surfaceLaneIndex) || index)
      );
      control.style.left = `${(laneRatios[resolvedLaneIndex] ?? 0.5) * 100}%`;
    });

    state.participants
      .filter((participant) => participant.side === "operator")
      .forEach((participant) => {
        syncOperatorCardPosition(participant.id);
      });

    scheduleMappingDraw();
    return true;
  }

  function syncSideColumnTrackAlignment(columnElement, side) {
    if (!(columnElement instanceof HTMLElement)) {
      return false;
    }
    const columnBounds = columnElement.getBoundingClientRect();
    if (columnBounds.width <= 1 || columnBounds.height <= 1) {
      return false;
    }
    const header = columnElement.querySelector(
      `.composer-reaction-solver-side-slot-header.is-${CSS.escape(side)}`
    );
    const participants = Array.from(
      columnElement.querySelectorAll(`.composer-reaction-solver-participant.is-${CSS.escape(side)}`)
    );
    const trackGeometries = participants
      .map((participantElement) => {
        if (!(participantElement instanceof HTMLElement)) {
          return null;
        }
        participantElement.style.setProperty("--solver-track-align-shift", "0px");
        const trackElement = participantElement.querySelector(
          ".composer-reaction-solver-noether-core-grid-track, .composer-reaction-solver-binary-selector-grid-track"
        );
        if (!(trackElement instanceof HTMLElement)) {
          return null;
        }
        const trackBounds = trackElement.getBoundingClientRect();
        return {
          start: trackBounds.left - columnBounds.left,
          width: trackBounds.width,
        };
      })
      .filter(Boolean);
    if (!trackGeometries.length) {
      if (header instanceof HTMLElement) {
        header.style.setProperty("--solver-slot-header-offset", "0px");
      }
      return false;
    }
    const sortedStarts = trackGeometries
      .map((entry) => entry.start)
      .sort((left, right) => left - right);
    const targetStart = sortedStarts[Math.floor(sortedStarts.length / 2)] ?? 0;
    const trackWidth = Math.max(...trackGeometries.map((entry) => entry.width));
    if (header instanceof HTMLElement) {
      const headerOffset =
        side === "product"
          ? Math.max(0, columnBounds.width - targetStart - trackWidth)
          : Math.max(0, targetStart);
      header.style.setProperty("--solver-slot-header-offset", `${headerOffset}px`);
    }
    return true;
  }

  function syncSideColumnGeometry() {
    if (!state.active || !reactantsColumn || !productsColumn) {
      return false;
    }
    const reactantsSynced = syncSideColumnTrackAlignment(reactantsColumn, "reactant");
    const productsSynced = syncSideColumnTrackAlignment(productsColumn, "product");
    if (reactantsSynced || productsSynced) {
      scheduleMappingDraw();
      return true;
    }
    return false;
  }

  function scheduleOperatorLaneLayout(attemptsRemaining = 2) {
    if (operatorLayoutFrameId) {
      cancelAnimationFrame(operatorLayoutFrameId);
    }
    operatorLayoutFrameId = requestAnimationFrame(() => {
      operatorLayoutFrameId = 0;
      const synced = syncOperatorLaneLayout();
      if (!synced && attemptsRemaining > 0) {
        scheduleOperatorLaneLayout(attemptsRemaining - 1);
      }
    });
  }

  function scheduleSideColumnGeometry(attemptsRemaining = 2) {
    requestAnimationFrame(() => {
      const synced = syncSideColumnGeometry();
      if (!synced && attemptsRemaining > 0) {
        scheduleSideColumnGeometry(attemptsRemaining - 1);
      }
    });
  }

  function render() {
    if (!root || !reactantsColumn || !productsColumn || !operatorLayer) {
      return;
    }
    root.classList.toggle("is-open", state.active);
    root.setAttribute("aria-hidden", state.active ? "false" : "true");
    reactantsColumn.innerHTML = "";
    operatorLayer.innerHTML = "";
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
    const operatorParticipants = state.participants.filter(
      (participant) => participant.side === "operator"
    );
    if (reactantParticipants.length) {
      reactantsColumn.appendChild(createSideSlotHeader(reactantParticipants, "reactant"));
    }
    reactantParticipants.forEach((participant) => {
      reactantsColumn.appendChild(renderParticipantCard(participant));
    });
    operatorLayer.appendChild(createOperatorAddControls());
    if (productParticipants.length) {
      productsColumn.appendChild(createSideSlotHeader(productParticipants, "product"));
    }
    productParticipants.forEach((participant) => {
      productsColumn.appendChild(renderParticipantCard(participant));
    });
    operatorParticipants.forEach((participant) => {
      assignOperatorParticipantToSlot(participant, participant.operatorSlotIndex);
      operatorLayer.appendChild(createOperatorParticipantCard(participant));
    });
    updateHint();
    scheduleSideColumnGeometry();
    scheduleMappingDraw();
    scheduleOperatorLaneLayout();
  }

  function handleSurfaceContextMenu(event) {
    if (!state.active) {
      return;
    }
    event.preventDefault();
    if (menu?.contains(event.target) || event.target instanceof Element && event.target.closest(".composer-reaction-solver-anchor")) {
      return;
    }
    openMenuAt(event.clientX, event.clientY);
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
    updateOperatorDrag(event.clientY);
  }

  function handleDocumentPointerUp(event) {
    if (!state.active || !state.dragParticipantId) {
      return;
    }
    if (state.dragPointerId !== null && event.pointerId !== state.dragPointerId) {
      return;
    }
    stopOperatorDrag();
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
          scheduleSideColumnGeometry();
          scheduleOperatorLaneLayout();
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

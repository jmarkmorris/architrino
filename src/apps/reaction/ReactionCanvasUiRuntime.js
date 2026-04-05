import {
  createReactionMappingRulesRuntime as defaultCreateMappingRulesRuntime,
} from "./ReactionMappingRulesRuntime.js";
import {
  createReactionParticipantMutationRuntime as defaultCreateParticipantMutationRuntime,
} from "./ReactionParticipantMutationRuntime.js";
import {
  createReactionAnchorRenderRuntime as defaultCreateAnchorRenderRuntime,
} from "./ReactionAnchorRenderRuntime.js";
import {
  createReactionBinaryGlyphRuntime as defaultCreateBinaryGlyphRuntime,
} from "./ReactionBinaryGlyphRuntime.js";
import {
  createReactionBinaryInventoryRuntime as defaultCreateBinaryInventoryRuntime,
} from "./ReactionBinaryInventoryRuntime.js";
import {
  buildReactionNodeKey as defaultBuildNodeKey,
  parseReactionNodeKey as defaultParseNodeKey,
  reactionNodeKeysConflict as defaultNodeKeysConflict,
} from "./ReactionNodeKeyRuntime.js";
import { createReactionAnchorStateRuntime as defaultCreateAnchorStateRuntime } from "./ReactionAnchorStateRuntime.js";
import { createReactionCanvasMappingRuntime as defaultCreateCanvasMappingRuntime } from "./ReactionCanvasMappingRuntime.js";
import { createReactionCanvasRouteRenderRuntime as defaultCreateCanvasRouteRenderRuntime } from "./ReactionCanvasRouteRenderRuntime.js";
import {
  createReactionBinarySelectionRuntime as defaultCreateBinarySelectionRuntime,
  getBinaryPersonalityChoice,
  invertBinaryChoiceId,
} from "./ReactionBinarySelectionRuntime.js";
import {
  buildReactionParticipantStructureForPickerCell as defaultBuildReactionParticipantStructureForPickerCell,
  getReactionAddPickerCells as defaultGetReactionAddPickerCells,
} from "./ReactionAddPickerRuntime.js";
import { buildReactionSolveState as defaultBuildSolveState } from "./ReactionSolveStateRuntime.js";
import {
  describeReactionSolvePlan as defaultDescribeSolvePlan,
} from "./ReactionSolveProposalRuntime.js";
import { applyReactionSolvePlan as defaultApplySolvePlan } from "./ReactionSolveProjectionRuntime.js";
import { solveReactionSnapshot as defaultSolveSnapshot } from "./ReactionSolverContractRuntime.js";
import { buildReactionSolverExecutionStatusNote } from "./ReactionSolverExecutionRuntime.js";
import {
  getReactionCompositeModeLabel,
  normalizeReactionCompositeMode,
  supportsReactionCompositeModes,
} from "./ReactionCompositeModeRuntime.js";
import { buildReactionParticipantStructure } from "./ReactionStructureBridgeRuntime.js";
import {
  createReactionParticipantRenderRuntime as defaultCreateParticipantRenderRuntime,
  getReactionSideSlotHeaderProfile,
} from "./ReactionParticipantRenderRuntime.js";
import {
  createReactionParticleTileElement,
  getReactionParticleTileLabelLines,
} from "./ReactionParticleTileRuntime.js";
import {
  applyReactionCanvasLayoutCssVars,
  applyReactionCanvasSurfaceGridLayout,
  getReactionSurfaceColumnGroupFallbackRatios,
  measureReactionSurfaceColumnGroupRatios,
  REACTION_CANVAS_OPERATOR_LANE_WIDTH_PX,
  REACTION_CANVAS_LAYOUT,
  REACTION_CANVAS_SURFACE_ROW_COUNT,
} from "./ReactionCanvasLayoutRuntime.js";
import {
  buildReactionStructureDescriptorTree,
  findReactionStructureDescriptorNode,
  isReactionStructureCompositeGridRenderMode,
  isReactionStructureInlineAnchorRenderMode,
  REACTION_STRUCTURE_RENDER_MODES,
  supportsReactionStructureDescriptorTree,
  walkReactionStructureDescriptorTree,
  shouldRenderReactionStructureDescriptorChildren,
} from "./ReactionStructureDescriptorRuntime.js";
import {
  cloneStructureNode,
  getStructureNodeChildren,
  getStructureTrait,
  STRUCTURE_CHARGE_TYPES,
  STRUCTURE_CLASSIFICATION_FAMILIES,
  STRUCTURE_KINDS,
} from "../../domain/structure/StructureSchema.js";
import {
  getStructureAssemblyDisplayLabel,
  isNoetherAssemblyTemplateId,
  normalizeStructureAssemblyTemplateId,
} from "../../domain/structure/StructureAssemblyCatalog.js";
import { getReactionCanonicalBaseLabel } from "./ReactionLabelCatalogRuntime.js";
import { findStructureNodeById } from "../../domain/structure/StructureTraversal.js";
import {
  applyStructurePolarity,
} from "../../domain/structure/StructureTransforms.js";
import { validateStructureTree } from "../../domain/structure/StructureValidation.js";

const canvasTemplateMeta = Object.freeze({
  noether_core: { shortLabel: "NC", accent: "#a259ff" },
  noether_pair: { shortLabel: "NP", accent: "#a259ff" },
  noether_quad: { shortLabel: "NQ", accent: "#a259ff" },
  photon: { shortLabel: "Ph", accent: "#a259ff" },
  neutron: { shortLabel: "N", accent: "#a259ff" },
  proton: { shortLabel: "P", accent: "#ff5a4a" },
  associate: { shortLabel: "As", accent: "#35b59a" },
  dissociate: { shortLabel: "Ds", accent: "#ff8a52" },
  w_minus_boson: { shortLabel: "W-", accent: "#2d8cff" },
  w_plus_boson: { shortLabel: "W+", accent: "#ff5a4a" },
  electron: { shortLabel: "e-", accent: "#2d8cff" },
  neutrino: { shortLabel: "𝜈", accent: "#a259ff" },
  z_boson: { shortLabel: "Z", accent: "#a259ff" },
  free_architrinos: { shortLabel: "FA", accent: "#7db2ff" },
  down_quark: { shortLabel: "d", accent: "#4a78ff" },
  up_quark: { shortLabel: "u", accent: "#ff5a4a" },
  pi_plus: { shortLabel: "Pi+", accent: "#ff5a4a" },
  pi_minus: { shortLabel: "Pi-", accent: "#2d8cff" },
  upi0: { shortLabel: "Pi0", accent: "#a259ff" },
  dpi0: { shortLabel: "Pi0", accent: "#a259ff" },
  k_plus: { shortLabel: "K+", accent: "#ff5a4a" },
  k_minus: { shortLabel: "K-", accent: "#2d8cff" },
  dk0: { shortLabel: "dK0", accent: "#a259ff" },
  sk0: { shortLabel: "sK0", accent: "#a259ff" },
  b_plus: { shortLabel: "B+", accent: "#ff5a4a" },
  b_minus: { shortLabel: "B-", accent: "#2d8cff" },
  db0: { shortLabel: "dB0", accent: "#a259ff" },
  bb0: { shortLabel: "bB0", accent: "#a259ff" },
  fermion_gen1: { shortLabel: "F1", accent: "#c2d5ff" },
});

export const REACTION_OPERATOR_ENTRIES = Object.freeze([
  { templateId: "associate", label: "Associate" },
  { templateId: "dissociate", label: "Dissociate" },
]);
export const REACTION_OPERATOR_LANE_COUNT = 2;
export const REACTION_CENTER_ASSEMBLY_PICKER_ENTRIES = Object.freeze([
  Object.freeze({
    templateId: "noether_core",
    label: "Noether Core",
  }),
  Object.freeze({
    templateId: "w_minus_boson",
    label: "Negative W Boson",
  }),
  Object.freeze({
    templateId: "z_boson",
    label: "Neutral Z Boson",
  }),
  Object.freeze({
    templateId: "w_plus_boson",
    label: "Positive W Boson",
  }),
  Object.freeze({
    templateId: "free_architrinos",
    label: "Free Architrinos",
  }),
]);
const operatorEntries = REACTION_OPERATOR_ENTRIES;
export const REACTION_OPERATOR_LANE_LAYOUT = Object.freeze([
  Object.freeze({
    laneIndex: 0,
    templateId: "assembly",
    label: "Assembly",
    pickerEntries: Object.freeze([
      Object.freeze({
        templateId: "dissociate",
        label: "Dissociate",
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
    ]),
    enabled: true,
  }),
]);
const operatorTemplateIds = new Set(
  operatorEntries.map((entry) => entry.templateId)
);
const SIDE_DISABLED_TEMPLATE_GRID_PICKER_CELLS = Object.freeze([
  Object.freeze({
    id: "side_disabled_z_boson",
    label: "Neutral Z Boson",
    templateId: "z_boson",
    vacant: false,
    disabled: true,
    columnId: "side_disabled_bosons",
    columnIndex: -1,
    rowIndex: -1,
    structureBuildOptions: null,
  }),
  Object.freeze({
    id: "side_disabled_w_minus_boson",
    label: "Negative W Boson",
    templateId: "w_minus_boson",
    vacant: false,
    disabled: true,
    columnId: "side_disabled_bosons",
    columnIndex: -1,
    rowIndex: -1,
    structureBuildOptions: null,
  }),
  Object.freeze({
    id: "side_disabled_w_plus_boson",
    label: "Positive W Boson",
    templateId: "w_plus_boson",
    vacant: false,
    disabled: true,
    columnId: "side_disabled_bosons",
    columnIndex: -1,
    rowIndex: -1,
    structureBuildOptions: null,
  }),
]);

const reducedBinaryPersonalityChoiceIds = Object.freeze(["ee", "pe", "pp"]);
const binarySlotRankByCode = Object.freeze({
  I: 0,
  M: 1,
  O: 2,
});
const dissociableFermionFamilies = new Set([
  STRUCTURE_CLASSIFICATION_FAMILIES.CHARGED_LEPTON,
  STRUCTURE_CLASSIFICATION_FAMILIES.NEUTRINO,
  STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK,
  STRUCTURE_CLASSIFICATION_FAMILIES.DOWN_TYPE_QUARK,
]);

const participantPolarityTemplateIds = new Set([
  "noether_core",
  "electron",
  "neutrino",
  "down_quark",
  "up_quark",
  "fermion_gen1",
]);

function cloneSerializableValue(value) {
  if (typeof globalThis.structuredClone === "function") {
    return globalThis.structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function ensureCenterAssembliesColumn(surface) {
  if (!(surface instanceof HTMLElement)) {
    return null;
  }
  const existingColumn =
    surface.querySelector(".composer-reaction-canvas-column.is-center-assemblies") ?? null;
  if (existingColumn instanceof HTMLElement) {
    return existingColumn;
  }
  const column = document.createElement("div");
  column.className = "composer-reaction-canvas-column is-center-assemblies";
  surface.appendChild(column);
  return column;
}

function dedupeTemplateEntries(templateMenuRows = [], extraEntries = []) {
  const entries = [];
  const seen = new Set();
  const allEntries = [
    ...templateMenuRows.flatMap((row) => (Array.isArray(row) ? row : [])),
    { template: "neutron", label: getReactionCanonicalBaseLabel("neutron") },
    { template: "proton", label: getReactionCanonicalBaseLabel("proton") },
    { template: "photon", label: getReactionCanonicalBaseLabel("photon") },
    {
      template: "neutrino",
      label: getReactionCanonicalBaseLabel("neutrino"),
      initialPolarity: "pro",
    },
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

function supportsParticipantPolarity(templateId) {
  return participantPolarityTemplateIds.has(String(templateId ?? "").trim().toLowerCase());
}

function isOperatorTemplateId(templateId = "") {
  return operatorTemplateIds.has(String(templateId ?? "").trim().toLowerCase());
}

function normalizeParticipantPolarity(polarity) {
  return String(polarity ?? "").trim().toLowerCase() === "anti" ? "anti" : "pro";
}

function shouldPreserveLeadingPolarityLabel(templateId = "") {
  const normalizedTemplateId = String(templateId ?? "").trim().toLowerCase();
  return normalizedTemplateId === "proton" || normalizedTemplateId === "neutron";
}

function stripLeadingParticipantPolarity(label = "") {
  return String(label ?? "").trim().replace(/^(pro|anti)\s+/i, "") || String(label ?? "").trim();
}

function formatParticipantLabel(baseLabel = "", templateId = "", polarity = "") {
  if (shouldPreserveLeadingPolarityLabel(templateId)) {
    return String(baseLabel ?? "").trim() || "?";
  }
  const cleanedBaseLabel = stripLeadingParticipantPolarity(baseLabel) || "?";
  if (!supportsParticipantPolarity(templateId)) {
    return cleanedBaseLabel;
  }
  return `${normalizeParticipantPolarity(polarity) === "anti" ? "Anti" : "Pro"} ${cleanedBaseLabel}`;
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
  topNode.label = `${polarity === "anti" ? "Anti" : "Pro"} Noether Core`;
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
        label: String(label ?? "").trim() || getDefaultParticipantBaseLabel(templateId, "Operator"),
        renderMode: REACTION_STRUCTURE_RENDER_MODES.OPERATOR_TILE,
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
  const entry = canvasTemplateMeta[normalized] ?? null;
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
  if (templateId === "pi_plus" || templateId === "upi0") {
    return {
      ...baseMeta,
      accent: templateId === "pi_plus" ? "#ff5a4a" : "#a259ff",
    };
  }
  if (templateId === "pi_minus" || templateId === "dpi0") {
    return {
      ...baseMeta,
      accent: templateId === "pi_minus" ? "#2d8cff" : "#a259ff",
    };
  }
  if (templateId === "k_plus" || templateId === "dk0") {
    return {
      ...baseMeta,
      accent: templateId === "k_plus" ? "#ff5a4a" : "#a259ff",
    };
  }
  if (templateId === "k_minus" || templateId === "sk0") {
    return {
      ...baseMeta,
      accent: templateId === "k_minus" ? "#2d8cff" : "#a259ff",
    };
  }
  if (templateId === "b_plus" || templateId === "db0") {
    return {
      ...baseMeta,
      accent: templateId === "b_plus" ? "#ff5a4a" : "#a259ff",
    };
  }
  if (templateId === "b_minus" || templateId === "bb0") {
    return {
      ...baseMeta,
      accent: templateId === "b_minus" ? "#2d8cff" : "#a259ff",
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
  return getReactionCanonicalBaseLabel(templateId, {
    fallbackLabel:
      isNoetherAssemblyTemplateId(normalizeStructureAssemblyTemplateId(templateId))
        ? getStructureAssemblyDisplayLabel(normalizeStructureAssemblyTemplateId(templateId))
        : fallbackLabel,
  });
}

function getTemplateGridPickerLayout(pickerCells = []) {
  const cellById = new Map(
    [...(Array.isArray(pickerCells) ? pickerCells : []), ...SIDE_DISABLED_TEMPLATE_GRID_PICKER_CELLS]
      .map((cell) => [String(cell?.id ?? ""), cell])
  );
  return [
    ["uni_binary", "tau_neutrino", "tau", "bottom", "top"],
    ["bi_binary", "muon_neutrino", "muon", "strange", "charm"],
    ["tri_binary", "neutrino", "electron", "down", "up"],
    ["noether_pair", "upi0", "dpi0", "pi_minus", "pi_plus"],
    ["noether_quad", "dk0", "sk0", "k_minus", "k_plus"],
    ["neutron", "dB0", "bB0", "b_minus", "b_plus"],
    ["photon", "proton", "side_disabled_z_boson", "side_disabled_w_minus_boson", "side_disabled_w_plus_boson"],
  ].flatMap((row, rowIndex) =>
    row.map((cellId, columnIndex) => ({
      rowIndex,
      columnIndex,
      cell: cellId ? (cellById.get(cellId) ?? null) : null,
    }))
  );
}

function normalizeParticipantBaseLabel(label = "", templateId = "") {
  const trimmedLabel = String(label ?? "").trim();
  if (shouldPreserveLeadingPolarityLabel(templateId)) {
    return getDefaultParticipantBaseLabel(templateId, trimmedLabel);
  }
  return stripLeadingParticipantPolarity(trimmedLabel);
}

function getParticipantCardLabelLines(label = "", participant = null) {
  return getReactionParticleTileLabelLines(label, participant, {
    supportsParticipantPolarity,
  });
}

function getPickerTileLabelLines(pickerCell = null, participant = null) {
  return getReactionParticleTileLabelLines(pickerCell?.label, {
    ...participant,
    templateId: pickerCell?.templateId ?? participant?.templateId ?? "",
  }, {
    includeCompositePreviewLines: true,
    supportsParticipantPolarity,
  });
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

function isCenterAssemblyParticipant(participant) {
  return participant?.side === "reactant" && participant?.surfaceColumn === "center-assembly";
}

function getParticipantCollectionKey(participant = null) {
  if (isCenterAssemblyParticipant(participant)) {
    return "center-assembly";
  }
  if (isOperatorParticipant(participant)) {
    return `operator:${normalizeOperatorLaneIndex(participant.operatorLaneIndex)}`;
  }
  return participant?.side === "product" ? "product" : "reactant";
}

function isSingleMappingAnchorRole(role = "") {
  const normalizedRole =
    typeof role === "object" && role !== null
      ? String(role.role ?? "").trim()
      : String(role ?? "").trim();
  return normalizedRole === "reactant" || normalizedRole === "product";
}

function canTargetMappingRole(role = "") {
  return role === "product" || role === "operator-input";
}

function getSlotNameFromCode(slotCode = "") {
  const normalizedSlotCode = String(slotCode ?? "").trim().toUpperCase();
  if (normalizedSlotCode === "I") {
    return "inner";
  }
  if (normalizedSlotCode === "M") {
    return "middle";
  }
  if (normalizedSlotCode === "O") {
    return "outer";
  }
  return "";
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

const operatorCardHeightPx = REACTION_CANVAS_LAYOUT.binaryChoiceSizePx;
const canvasTileGapPx = REACTION_CANVAS_LAYOUT.tileGapPx;
const operatorTrackWidthPx = REACTION_CANVAS_OPERATOR_LANE_WIDTH_PX;
const operatorSlotStepPx = REACTION_CANVAS_LAYOUT.operatorSlotStepPx;
const recentRouteFadeMs = 400;
const operatorSlotEdgePaddingPx = REACTION_CANVAS_LAYOUT.operatorSlotEdgePaddingPx;
const operatorLaneCount = REACTION_OPERATOR_LANE_COUNT;
const operatorLaneEdgePaddingPx = REACTION_CANVAS_LAYOUT.operatorLaneEdgePaddingPx;
const canvasRouteAnchorGapPx = REACTION_CANVAS_LAYOUT.routeAnchorGapPx;
const operatorGraphicConnectionStepPx =
  REACTION_CANVAS_LAYOUT.operatorGraphicConnectionStepPx;
const canvasAddButtonSizePx = REACTION_CANVAS_LAYOUT.addButtonSizePx;
const canvasRowHeightPx = REACTION_CANVAS_LAYOUT.binaryChoiceSizePx;
const canvasRowStepPx =
  REACTION_CANVAS_LAYOUT.binaryChoiceSizePx + REACTION_CANVAS_LAYOUT.contentStackGapPx;
const canvasSurfaceMaxRowIndex = REACTION_CANVAS_SURFACE_ROW_COUNT - 1;

function getParticipantSideLabel(side = "", options = {}) {
  const label =
    side === "product"
      ? "product"
      : side === "operator"
        ? "operator"
        : side === "center"
          ? "assembly"
          : "reactant";
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

function getReactionSurfaceColumnGroupEntries() {
  const enabledOperatorLaneEntries = getEnabledOperatorLaneLayoutEntries();
  const leftOperatorLaneEntry =
    enabledOperatorLaneEntries.find((entry) => entry.laneIndex === 0) ?? null;
  const rightOperatorLaneEntry =
    enabledOperatorLaneEntries.find((entry) => entry.laneIndex === 1) ?? null;
  return [
    { side: "reactant", operatorLaneIndex: null },
    ...(leftOperatorLaneEntry
      ? [{ side: "operator", operatorLaneIndex: leftOperatorLaneEntry.laneIndex }]
      : []),
    { side: "center", operatorLaneIndex: null },
    ...(rightOperatorLaneEntry
      ? [{ side: "operator", operatorLaneIndex: rightOperatorLaneEntry.laneIndex }]
      : []),
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

function readPersistedCanvasActive(storage, storageKey) {
  if (!storage || !storageKey) {
    return false;
  }
  try {
    return storage.getItem(storageKey) === "true";
  } catch (_error) {
    return false;
  }
}

function persistCanvasActive(storage, storageKey, active) {
  if (!storage || !storageKey) {
    return;
  }
  try {
    storage.setItem(storageKey, active ? "true" : "false");
  } catch (_error) {
    // Ignore storage failures and keep the canvas working in-memory.
  }
}

export function createReactionCanvasUiRuntime(deps = {}) {
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
    clearButton = null,
    solveButton = null,
    templateMenuRows = [],
    extraTemplateEntries = [],
    setStatus = () => {},
    onSnapshotChange = () => {},
    closeExternalMenus = () => {},
    onActiveChange = () => {},
    storage = null,
    storageKey = "",
    buildNodeKey = defaultBuildNodeKey,
    parseNodeKey = defaultParseNodeKey,
    nodeKeysConflict = defaultNodeKeysConflict,
    createAnchorRenderRuntime = defaultCreateAnchorRenderRuntime,
    createBinaryGlyphRuntime = defaultCreateBinaryGlyphRuntime,
    createParticipantRenderRuntime = defaultCreateParticipantRenderRuntime,
    createBinarySelectionRuntime = defaultCreateBinarySelectionRuntime,
    createBinaryInventoryRuntime = defaultCreateBinaryInventoryRuntime,
    createParticipantMutationRuntime = defaultCreateParticipantMutationRuntime,
    buildReactionParticipantStructureForPickerCell =
      defaultBuildReactionParticipantStructureForPickerCell,
    getReactionAddPickerCells = defaultGetReactionAddPickerCells,
    createMappingRulesRuntime = defaultCreateMappingRulesRuntime,
    createAnchorStateRuntime = defaultCreateAnchorStateRuntime,
    createCanvasMappingRuntime = defaultCreateCanvasMappingRuntime,
    createCanvasRouteRenderRuntime = defaultCreateCanvasRouteRenderRuntime,
    buildSolveState = defaultBuildSolveState,
    describeSolvePlan = defaultDescribeSolvePlan,
    applySolvePlan = defaultApplySolvePlan,
    solveSnapshot = defaultSolveSnapshot,
  } = deps;

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
  } = createBinarySelectionRuntime({
    supportsParticipantPolarity,
    normalizeParticipantPolarity,
  });

  const { resolveBinaryChoiceInventory } = createBinaryInventoryRuntime({
    getBinaryChoiceInventory,
    getResolvedBinarySelectionMap,
    resolveBinarySelectorGroup,
  });

  const {
    buildSplitParticipantsFromChildStructures,
    getNextParticipantGenerationTrimAction,
    inferParticipantBaseLabelFromStructure,
    inferParticipantPolarityFromStructure,
    inferTemplateIdFromStructure,
    refreshParticipantFromStructure,
    trimParticipantGenerationStructure,
  } = createParticipantMutationRuntime({
    supportsParticipantPolarity,
    formatParticipantLabel,
    buildParticipantHierarchy,
    getInitialParticipantBinarySelections,
  });

  const centerAssembliesColumn = ensureCenterAssembliesColumn(surface);
  applyReactionCanvasLayoutCssVars(root);
  applyReactionCanvasLayoutCssVars(surface);
  applyReactionCanvasSurfaceGridLayout({
    surface,
    reactantsColumn,
    centerAssembliesColumn,
    productsColumn,
  });

  const operatorLayer = root?.querySelector(".composer-reaction-canvas-operator-layer") ?? null;
  const templateEntries = dedupeTemplateEntries(templateMenuRows, extraTemplateEntries);
  const addPickerCells = getReactionAddPickerCells();
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
    menuMode: "",
    menuSide: "reactant",
    menuParticipantId: "",
    menuOperatorLaneIndex: 0,
    menuOpen: false,
    menuClientX: 0,
    menuClientY: 0,
    menuAnchorElement: null,
    anchorRegistry: new Map(),
    dragParticipantId: "",
    dragParticipantMode: "",
    dragPointerId: null,
    hoveredMappingIds: [],
    recentMappingIds: [],
    isSolving: false,
  };
  let lastSnapshotChangeSignature = "";

  let operatorLayoutFrameId = 0;
  let applyHoveredRouteState = () => {};
  let createAnchorButton = () => document.createElement("button");
  let createInlineAnchorSlot = () => document.createElement("div");
  let createSideSlotHeader = () => document.createElement("div");
  let createOperatorParticipantCard = () => document.createElement("article");
  let renderParticipantCard = () => document.createElement("article");
  let setHoveredMappingIds = () => {};
  let addOrReplaceMapping = () => "";
  let handleAnchorClick = () => {};
  let scheduleMappingDraw = () => {};
  let syncOperatorFan = () => {};
  const mappingRulesRuntime = createMappingRulesRuntime({
    getNodeContext,
    getOperatorInputNodeContexts,
    getOperatorLedgerSummary,
    getOperatorOutputLedger: (participantId, anchorInstanceIndex, operatorSummary) =>
      getOperatorOutputLedgerForAnchor(participantId, operatorSummary, anchorInstanceIndex),
    parseNodeKey,
    resolveBinaryChoiceInventory,
  });

  const anchorStateRuntime = createAnchorStateRuntime({
    canTargetMappingRole,
    getMappings: () => state.mappings,
    getNodeContext,
    getRecentMappingIds: () => state.recentMappingIds,
    getPendingSourceKey: () => state.pendingSourceKey,
    getPendingSourceAnchorInstanceIndex: () => state.pendingSourceAnchorInstanceIndex,
    getPendingSourceRole: () => state.pendingSourceRole,
    isSingleMappingAnchorRole: isSingleMappingAnchorRoleForNode,
    onRecentStateChange: () => applyHoveredRouteState(),
    nodeKeysConflict,
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
  const anchorRenderRuntime = createAnchorRenderRuntime({
    findMappingsByNodeKey,
    getAnchorAvailability,
    getHoveredMappingIds: () => state.hoveredMappingIds,
    getMappingIdsForAnchor,
    getPendingSourceAnchorInstanceIndex: () => state.pendingSourceAnchorInstanceIndex,
    getPendingSourceKey: () => state.pendingSourceKey,
    getPendingSourceRole: () => state.pendingSourceRole,
    getRecentMappingIds: () => state.recentMappingIds,
    handleAnchorClick: (...args) => handleAnchorClick(...args),
    isSingleMappingAnchorRole: isSingleMappingAnchorRoleForNode,
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
    createInlineAnchorSlot,
    setHoveredMappingIds,
  } = anchorRenderRuntime);
  const binaryGlyphRuntime = createBinaryGlyphRuntime({
    createSvgElement,
    normalizeParticipantPolarity,
    structureChargeTypes: STRUCTURE_CHARGE_TYPES,
  });
  const { createBinaryGlyph } = binaryGlyphRuntime;
  const participantRenderRuntime = createParticipantRenderRuntime({
    buildNodeKey,
    countDescendants,
    createAnchorButton,
    createBinaryGlyph,
    createInlineAnchorSlot,
    cycleQuarkBinaryPreset,
    cycleFreeArchitrinoPreset,
    findMappingByNodeKey,
    formatLedger,
    formatParticipantLabel,
    getAllowedBinaryChoiceIds,
    getAnchorAvailability,
    getBinaryPersonalitySelection,
    getOperatorGraphicOffsets,
    getDefaultParticipantBaseLabel,
    getIsDraggingParticipant: (participantId) => state.dragParticipantId === participantId,
    isCenterAssemblyParticipant,
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
    handleParticipantVisualClick,
    reducedBinaryPersonalityChoiceIds,
    resolveBinaryGlyphPolarity,
    resolveBinaryChoiceInventory,
    setBinaryPersonalitySelection,
    shouldRenderChildNodes,
    startOperatorDrag,
    startSideParticipantDrag,
    supportsParticipantPolarity,
    topLevelHierarchyHasRenderMode,
  });
  ({
    createSideSlotHeader,
    createOperatorParticipantCard,
    renderParticipantCard,
  } = participantRenderRuntime);
  if (typeof participantRenderRuntime.syncOperatorFan === "function") {
    syncOperatorFan = participantRenderRuntime.syncOperatorFan;
  }
  ({
    addOrReplaceMapping,
    handleAnchorClick,
  } = createCanvasMappingRuntime({
    state,
    getAnchorAvailability,
    setStatus,
    render,
    isSingleMappingAnchorRoleForNode,
    nodeKeysConflict,
    pruneRecentRouteState,
    markCompositeReactantDissociatedForNodeKey,
    parseNodeKey,
    findParticipantById,
    syncAutoGeneratedDissociateAssembliesForOperator,
    markMappingsRecent,
    setHoveredMappingIds,
    countEligibleTargets,
    getMappingValidation,
  }));
  ({
    scheduleMappingDraw,
  } = createCanvasRouteRenderRuntime({
    state,
    surface,
    mapSvg,
    canvasRouteAnchorGapPx,
    createSvgElement,
    getParticipants: () => state.participants,
    getMappings: () => state.mappings,
    isActive: () => state.active,
    isCompositeParticipant,
    getMappingValidation,
    setHoveredMappingIds,
    removeMappingById,
    render,
    setStatus,
    applyHoveredRouteState,
    normalizeAnchorInstanceIndex,
  }));

  function findParticipantById(participantId) {
    return state.participants.find((participant) => participant?.id === participantId) ?? null;
  }

  function clearDragState() {
    state.dragParticipantId = "";
    state.dragParticipantMode = "";
    state.dragPointerId = null;
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
    const resolvedTemplateId = normalizeStructureAssemblyTemplateId(
      templateId || inferTemplateIdFromStructure(structure?.root ?? structure)
    );
    const resolvedPolarity = supportsParticipantPolarity(resolvedTemplateId)
      ? normalizeParticipantPolarity(
          extraFields.polarity ?? inferParticipantPolarityFromStructure(structure?.root ?? structure)
        )
      : "";
    const participantId = `canvas_participant_${state.nextParticipantId++}`;
    const pendingBaseLabel = normalizeParticipantBaseLabel(label, resolvedTemplateId);
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
    const resolvedBaseLabel = normalizeParticipantBaseLabel(
      pendingBaseLabel || inferParticipantBaseLabelFromStructure(sourceStructure?.root ?? sourceStructure),
      resolvedTemplateId
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

  function buildSerializableSnapshot() {
    return {
      participants: cloneSerializableValue(state.participants),
      mappings: cloneSerializableValue(state.mappings),
    };
  }

  function inferNextSequenceValue(values = [], prefix = "") {
    return (
      values.reduce((maxValue, value) => {
        const match = String(value ?? "").match(new RegExp(`^${prefix}(\\d+)$`));
        if (!match) {
          return maxValue;
        }
        return Math.max(maxValue, Number(match[1]) || 0);
      }, 0) + 1
    );
  }

  function notifySnapshotChange() {
    const snapshot = buildSerializableSnapshot();
    const nextSnapshotSignature = JSON.stringify(snapshot);
    if (nextSnapshotSignature === lastSnapshotChangeSignature) {
      return snapshot;
    }
    lastSnapshotChangeSignature = nextSnapshotSignature;
    onSnapshotChange(snapshot);
    return snapshot;
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

  function isSingleMappingAnchorRoleForNode(role = "") {
    const normalizedRole =
      typeof role === "object" && role !== null
        ? String(role.role ?? "").trim()
        : String(role ?? "").trim();
    const nodeKey =
      typeof role === "object" && role !== null ? String(role.nodeKey ?? "").trim() : "";
    if (normalizedRole === "product") {
      return true;
    }
    if (normalizedRole !== "reactant") {
      return false;
    }
    const nodeContext = nodeKey ? getNodeContext(nodeKey) : null;
    const rootNode = nodeContext?.participant ? getParticipantRootNode(nodeContext.participant) : null;
    const isFreeArchitrinosRoot =
      nodeContext?.participant?.templateId === "free_architrinos" &&
      String(nodeContext?.node?.id ?? "") === String(rootNode?.id ?? "");
    return !isFreeArchitrinosRoot;
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

  function getLedgerFromBinaryAssignment(assignment = {}, nodes = []) {
    return nodes.reduce(
      (ledger, node) => addLedgers(ledger, getBinaryChoiceInventory(assignment?.[node?.id])),
      createEmptyLedger()
    );
  }

  function getLedgerSignature(ledger = null) {
    return `${Number(ledger?.electrino ?? 0)}:${Number(ledger?.positrino ?? 0)}`;
  }

  function getOperatorOutputLedgerForAnchor(participantOrId, operatorSummary = null, anchorInstanceIndex = null) {
    const baseLedger = hasLedger(operatorSummary?.outputLedger)
      ? operatorSummary.outputLedger
      : operatorSummary?.incomingLedger;
    return {
      electrino: Number(baseLedger?.electrino ?? 0),
      positrino: Number(baseLedger?.positrino ?? 0),
    };
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
      const outputLedgerByAnchorInstance = {
        0: getOperatorOutputLedgerForAnchor(participant, { incomingLedger, outputLedger }, 0),
      };
      const routedOutgoingLedgerByAnchorInstance = {};
      const routedOutgoingLedger = outgoingMappings.reduce((ledger, mapping) => {
        const sourceAnchorInstanceIndex =
          normalizeAnchorInstanceIndex(mapping.sourceAnchorInstanceIndex) ?? 0;
        const mappedLedger =
          mapping.targetRole === "operator-input"
            ? (outputLedgerByAnchorInstance[sourceAnchorInstanceIndex] ?? outputLedger)
            : getNodeLedger(mapping.targetKey);
        routedOutgoingLedgerByAnchorInstance[sourceAnchorInstanceIndex] = addLedgers(
          routedOutgoingLedgerByAnchorInstance[sourceAnchorInstanceIndex] ?? createEmptyLedger(),
          mappedLedger
        );
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
        outputLedgerByAnchorInstance,
        outgoingLedger: routedOutgoingLedger,
        routedOutgoingLedger,
        routedOutgoingLedgerByAnchorInstance,
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
    const removedMapping =
      state.mappings.find((mapping) => String(mapping.id) === String(mappingId)) ?? null;
    const beforeCount = state.mappings.length;
    state.mappings = state.mappings.filter((mapping) => mapping.id !== mappingId);
    state.hoveredMappingIds = state.hoveredMappingIds.filter((entry) => entry !== mappingId);
    pruneRecentRouteState();
    const targetParticipantId = parseNodeKey(removedMapping?.targetKey).participantId;
    if (
      removedMapping?.sourceRole === "reactant" &&
      removedMapping?.targetRole === "operator-input" &&
      findParticipantById(targetParticipantId)?.templateId === "dissociate"
    ) {
      syncAutoGeneratedDissociateAssembliesForOperator(targetParticipantId);
    }
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

  function clearReactionMappings() {
    if (!state.mappings.length && !state.hoveredMappingIds.length) {
      if (!state.pendingSourceKey) {
        return false;
      }
    }
    state.mappings = [];
    state.hoveredMappingIds = [];
    state.pendingSourceKey = "";
    state.pendingSourceRole = "";
    state.pendingSourceAnchorInstanceIndex = null;
    clearAllRecentRouteState();
    clearAutoGeneratedDissociateAssemblies();
    return true;
  }

  function clearReactionWorkspaceParticipants() {
    const beforeCount = state.participants.length;
    state.participants = state.participants.filter(
      (participant) => participant?.side === "reactant" || participant?.side === "product"
    );
    state.participants.forEach((participant) => {
      if (participant?.isAutoDissociatedComposite) {
        participant.isAutoDissociatedComposite = false;
      }
    });
    clearReactionMappings();
    return beforeCount !== state.participants.length;
  }

  function clearReactionOperatorsAndMappings() {
    const beforeCount = state.participants.length;
    state.participants = state.participants.filter((participant) => participant?.side !== "operator");
    state.participants.forEach((participant) => {
      if (participant?.isAutoDissociatedComposite) {
        participant.isAutoDissociatedComposite = false;
      }
    });
    const removedMappings = clearReactionMappings();
    return beforeCount !== state.participants.length || removedMappings;
  }

  function removeParticipantById(participantId) {
    const participant = findParticipantById(participantId);
    if (!participant) {
      return false;
    }
    state.participants = state.participants.filter(
      (entry) => String(entry?.id ?? "") !== participantId
    );
    if (participant.side === "reactant" || participant.side === "product") {
      clearReactionWorkspaceParticipants();
    } else {
      if (participant.templateId === "dissociate") {
        removeAutoGeneratedDissociateAssemblies(participant.id);
      }
      removeMappingsForParticipant(participantId);
    }
    closeMenu();
    render();
    setStatus(
      `${getParticipantSideLabel(participant.side, { capitalized: true })} ${participant.label} removed from the reaction canvas.`
    );
    return true;
  }

  function clearReactionCanvas() {
    const hasCanvasState =
      state.participants.length > 0 ||
      state.mappings.length > 0 ||
      !!state.pendingSourceKey ||
      !!state.pendingSourceRole;
    if (!hasCanvasState) {
      render();
      setStatus("Reaction canvas is already clear.");
      return false;
    }
    clearDragState();
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
    return true;
  }

  function replaceSnapshot(snapshot = {}, options = {}) {
    const nextParticipants = cloneSerializableValue(
      Array.isArray(snapshot?.participants) ? snapshot.participants : []
    );
    const nextMappings = cloneSerializableValue(Array.isArray(snapshot?.mappings) ? snapshot.mappings : []);
    clearDragState();
    state.participants = nextParticipants;
    state.mappings = nextMappings;
    state.pendingSourceKey = "";
    state.pendingSourceRole = "";
    state.pendingSourceAnchorInstanceIndex = null;
    state.hoveredMappingIds = [];
    state.isSolving = false;
    clearAllRecentRouteState();
    state.nextParticipantId = inferNextSequenceValue(
      nextParticipants.map((participant) => participant?.id),
      "canvas_participant_"
    );
    state.nextMappingId = inferNextSequenceValue(
      nextMappings.map((mapping) => mapping?.id),
      "canvas_mapping_"
    );
    closeMenu();
    render();
    notifySnapshotChange();
    if (options?.announce) {
      setStatus(
        normalizeText(options?.statusMessage) || "Reaction review candidate loaded into the canvas."
      );
    }
    return buildSerializableSnapshot();
  }

  async function solveReactionCanvas() {
    if (!state.active) {
      setStatus("Open the reaction app before running solve.");
      return false;
    }
    if (state.isSolving) {
      setStatus("Reaction solve is already running.");
      return false;
    }
    let solveState = buildSolveState({
      participants: state.participants,
      mappings: state.mappings,
      buildNodeKey,
      getParticipantRootNode,
      isCenterAssemblyParticipant,
      isOperatorParticipant,
    });
    if (!solveState.hasReactants || !solveState.hasProducts) {
      setStatus("Solve needs at least one reactant and one product.");
      return false;
    }
    if (solveState.hasUnsupportedParticipants) {
      setStatus(
        "Solve v1 only supports reactants, products, center assemblies, and existing operators on the canvas."
      );
      return false;
    }
    resetSolveDerivedArtifacts();
    solveState = buildSolveState({
      participants: state.participants,
      mappings: state.mappings,
      buildNodeKey,
      getParticipantRootNode,
      isCenterAssemblyParticipant,
      isOperatorParticipant,
    });

    state.isSolving = true;
    syncHeaderActionButtons();
    setStatus("Running external Reaction solve...");

    try {
      const solution = await Promise.resolve(
        solveSnapshot(
          {
            participants: cloneSerializableValue(state.participants),
            mappings: cloneSerializableValue(state.mappings),
          },
          {
            requestId: "reaction_canvas",
            origin: {
              sourceKind: "reaction",
              sourceDocumentId: "reaction_canvas",
              title: "Reaction Canvas",
            },
            buildNodeKey,
            resolveBinaryChoiceInventory,
          }
        )
      );
      const result = solution?.result ?? null;
      if (!Array.isArray(result?.mappings) || !result.mappings.length) {
        setStatus("Solve v1 could not find any conservative reactant-to-product matches.");
        return false;
      }

      clearDragState();
      closeMenu();
      state.pendingSourceKey = "";
      state.pendingSourceRole = "";
      state.pendingSourceAnchorInstanceIndex = null;
      state.hoveredMappingIds = [];
      state.mappings = [];
      clearAllRecentRouteState();
      const { appliedMappingIds } = applySolvePlan({
        result,
        createOperatorParticipant,
        getParticipantRootNode,
        buildNodeKey,
        markParticipantAutoDissociated,
        addOrReplaceMapping,
      });
      markMappingsRecent(appliedMappingIds);
      render();

      const unresolvedProductCount = Number(solution?.unresolvedTargetCount ?? 0);
      const unresolvedReactantCount = Number(solution?.unresolvedReactantCount ?? 0);
      const executionStatusNote = buildReactionSolverExecutionStatusNote(solution?.execution);
      setStatus(
        `Solve v1 mapped ${normalizeText(solution?.planDescription) || describeSolvePlan({})}. ${unresolvedProductCount} product${
          unresolvedProductCount === 1 ? "" : "s"
        } and ${unresolvedReactantCount} reactant${
          unresolvedReactantCount === 1 ? "" : "s"
        } remain unresolved.${executionStatusNote ? ` ${executionStatusNote}` : ""}`
      );
      return true;
    } catch (error) {
      setStatus(normalizeText(error?.message) || "Reaction solve failed.");
      return false;
    } finally {
      state.isSolving = false;
      syncHeaderActionButtons();
    }
  }

  function resetSolveDerivedArtifacts() {
    state.participants = state.participants.filter(
      (participant) => !(participant?.side === "operator" && participant?.isSolveGenerated)
    );
    state.participants.forEach((participant) => {
      if (participant?.isAutoDissociatedComposite) {
        participant.isAutoDissociatedComposite = false;
      }
    });
    state.mappings = [];
    state.hoveredMappingIds = [];
    clearAllRecentRouteState();
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
    if (participant.side === "reactant" || participant.side === "product") {
      clearReactionOperatorsAndMappings();
    } else {
      removeMappingsForParticipant(participantId);
    }
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

  function splitNoetherAssemblyParticipantById(participantId) {
    const participantIndex = state.participants.findIndex(
      (entry) => String(entry?.id ?? "") === participantId
    );
    const participant =
      participantIndex >= 0 ? state.participants[participantIndex] ?? null : null;
    const assemblyTemplateId = normalizeStructureAssemblyTemplateId(participant?.templateId);
    if (!participant || !isNoetherAssemblyTemplateId(assemblyTemplateId)) {
      return false;
    }
    if (participant.side !== "reactant") {
      setStatus("Only reactant composites can be marked dissociated.");
      return false;
    }

    if (participant.isDissociatedComposite) {
      setStatus(
        `${participant.side === "reactant" ? "Reactant" : "Product"} ${participant.label} is already marked dissociated.`
      );
      return false;
    }
    participant.isDissociatedComposite = true;
    participant.isAutoDissociatedComposite = false;
    closeMenu();
    render();
    setStatus(
      `${participant.side === "reactant" ? "Reactant" : "Product"} ${participant.label} marked dissociated.`
    );
    return true;
  }

  function splitCompositeParticipantById(participantId) {
    const participant = findParticipantById(participantId);
    if (!participant) {
      return false;
    }
    if (participant.side !== "reactant") {
      setStatus("Only reactant composites can be marked dissociated.");
      return false;
    }
    if (isNoetherAssemblyTemplateId(participant.templateId)) {
      return splitNoetherAssemblyParticipantById(participantId);
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
    if (participantIndex < 0) {
      return false;
    }
    if (participant.isDissociatedComposite) {
      setStatus(
        `${participant.side === "reactant" ? "Reactant" : "Product"} ${participant.label} is already marked dissociated.`
      );
      return false;
    }
    participant.isDissociatedComposite = true;
    participant.isAutoDissociatedComposite = false;
    closeMenu();
    render();
    setStatus(
      `${participant.side === "reactant" ? "Reactant" : "Product"} ${participant.label} marked dissociated.`
    );
    return true;
  }

  function markCompositeReactantDissociatedForNodeKey(nodeKey, role = "") {
    if (role !== "reactant" || !nodeKey) {
      return false;
    }
    const { participantId, nodeId } = parseNodeKey(nodeKey);
    const participant = findParticipantById(participantId);
    if (!participant || participant.side !== "reactant" || !isCompositeParticipant(participant)) {
      return false;
    }
    const rootNode = getParticipantRootNode(participant);
    if (!rootNode?.id || String(rootNode.id) === String(nodeId ?? "")) {
      return false;
    }
    return markParticipantAutoDissociated(participant);
  }

  function markParticipantAutoDissociated(participantOrId = null) {
    const participant =
      typeof participantOrId === "string" ? findParticipantById(participantOrId) : participantOrId;
    if (!participant || participant.side !== "reactant" || !isCompositeParticipant(participant)) {
      return false;
    }
    if (participant.isDissociatedComposite || participant.isAutoDissociatedComposite) {
      return false;
    }
    participant.isAutoDissociatedComposite = true;
    return true;
  }

  function getPrimaryNoetherCoreForDissociation(structureNode = null) {
    if (!structureNode) {
      return null;
    }
    if (structureNode.kind === STRUCTURE_KINDS.NOETHER_CORE) {
      return structureNode;
    }
    return (
      getStructureNodeChildren(structureNode).find(
        (childNode) => childNode?.kind === STRUCTURE_KINDS.NOETHER_CORE
      ) ?? null
    );
  }

  function getOccupiedSlotNamesFromCoreNode(coreNode = null) {
    if (!coreNode) {
      return [];
    }
    return getStructureNodeChildren(coreNode)
      .map((slotNode) => String(getStructureTrait(slotNode, "slot", "")).trim().toLowerCase())
      .filter((slotName) => slotName === "inner" || slotName === "middle" || slotName === "outer")
      .filter((slotName, index, slotNames) => slotNames.indexOf(slotName) === index)
      .filter((slotName) => {
        const slotNode = getStructureNodeChildren(coreNode).find(
          (childNode) => String(getStructureTrait(childNode, "slot", "")).trim().toLowerCase() === slotName
        );
        return getStructureNodeChildren(slotNode).length > 0;
      });
  }

  function getOccupiedSlotNamesFromDescriptorNode(node = null) {
    return (Array.isArray(node?.children) ? node.children : [])
      .filter((childNode) => childNode?.slotCode && childNode?.hasBinary !== false)
      .map((childNode) => getSlotNameFromCode(childNode.slotCode))
      .filter(Boolean);
  }

  function getBinarySelectionsBySlotCode(participant, groupNode = null) {
    const slotNodes = getBinarySelectorNodes(participant, groupNode);
    if (!slotNodes.length) {
      return {};
    }
    const resolvedSelections = getResolvedBinarySelectionMap(participant, groupNode);
    return Object.fromEntries(
      slotNodes.map((slotNode) => [String(slotNode?.slotCode ?? "").trim().toUpperCase(), resolvedSelections[slotNode.id]])
    );
  }

  function applyBinarySelectionsBySlotCode(participant, selectionsBySlotCode = {}) {
    const groupNode = getParticipantBinarySelectorGroups(participant)[0] ?? null;
    const slotNodes = getBinarySelectorNodes(participant, groupNode);
    if (!groupNode || !slotNodes.length) {
      return;
    }
    const nextSelections = { ...participant.binarySelections };
    slotNodes.forEach((slotNode) => {
      const slotCode = String(slotNode?.slotCode ?? "").trim().toUpperCase();
      const choiceId = selectionsBySlotCode[slotCode];
      if (!choiceId) {
        return;
      }
      nextSelections[slotNode.id] = choiceId;
    });
    participant.binarySelections = nextSelections;
  }

  function buildAutoGeneratedDissociateAssemblies(sourceKey = "") {
    const sourceContext = getNodeContext(sourceKey);
    if (!sourceContext?.participant || !sourceContext?.node || !sourceContext?.structureNode) {
      return [];
    }
    const sourceGroupNode =
      getParticipantBinarySelectorGroups(sourceContext.participant).find(
        (groupNode) =>
          String(groupNode?.id ?? "") === String(sourceContext.node?.id ?? "") ||
          (Array.isArray(groupNode?.slotNodes) &&
            groupNode.slotNodes.some(
              (slotNode) => String(slotNode?.id ?? "") === String(sourceContext.node?.id ?? "")
            ))
      ) ?? sourceContext.node;
    const sourceCoreNode = getPrimaryNoetherCoreForDissociation(sourceContext.structureNode);
    const occupiedSlots =
      getOccupiedSlotNamesFromDescriptorNode(sourceGroupNode).length > 0
        ? getOccupiedSlotNamesFromDescriptorNode(sourceGroupNode)
        : getOccupiedSlotNamesFromCoreNode(sourceCoreNode);
    if (sourceContext.structureNode.kind === STRUCTURE_KINDS.NOETHER_CORE) {
      return [{
        templateId: "free_architrinos",
        occupiedSlots,
      }];
    }
    const family = String(sourceContext.structureNode?.classification?.family ?? "").trim();
    if (!dissociableFermionFamilies.has(family)) {
      return [];
    }
    return [
      {
        templateId: "noether_core",
        polarity: inferParticipantPolarityFromStructure(sourceContext.structureNode),
        occupiedSlots,
      },
      {
        templateId: "free_architrinos",
        occupiedSlots,
        binarySelectionsBySlotCode: getBinarySelectionsBySlotCode(
          sourceContext.participant,
          sourceGroupNode
        ),
      },
    ];
  }

  function removeAutoGeneratedDissociateAssemblies(operatorId = "") {
    const autoGeneratedParticipantIds = state.participants
      .filter(
        (participant) =>
          participant?.autoGeneratedByDissociateParticipantId &&
          String(participant.autoGeneratedByDissociateParticipantId) === String(operatorId)
      )
      .map((participant) => String(participant.id));
    if (!autoGeneratedParticipantIds.length) {
      return false;
    }
    const autoGeneratedParticipantIdSet = new Set(autoGeneratedParticipantIds);
    state.participants = state.participants.filter(
      (participant) => !autoGeneratedParticipantIdSet.has(String(participant?.id ?? ""))
    );
    state.mappings = state.mappings.filter((mapping) => {
      const sourceParticipantId = parseNodeKey(mapping.sourceKey).participantId;
      const targetParticipantId = parseNodeKey(mapping.targetKey).participantId;
      return (
        !autoGeneratedParticipantIdSet.has(String(sourceParticipantId)) &&
        !autoGeneratedParticipantIdSet.has(String(targetParticipantId))
      );
    });
    if (autoGeneratedParticipantIdSet.has(parseNodeKey(state.pendingSourceKey).participantId)) {
      state.pendingSourceKey = "";
      state.pendingSourceRole = "";
      state.pendingSourceAnchorInstanceIndex = null;
    }
    state.hoveredMappingIds = state.hoveredMappingIds.filter((mappingId) =>
      state.mappings.some((mapping) => mapping.id === mappingId)
    );
    pruneRecentRouteState();
    return true;
  }

  function clearAutoGeneratedDissociateAssemblies() {
    const operatorIds = [
      ...new Set(
        state.participants
          .filter((participant) => participant?.autoGeneratedByDissociateParticipantId)
          .map((participant) => String(participant.autoGeneratedByDissociateParticipantId))
          .filter(Boolean)
      ),
    ];
    let removedAny = false;
    operatorIds.forEach((operatorId) => {
      if (removeAutoGeneratedDissociateAssemblies(operatorId)) {
        removedAny = true;
      }
    });
    return removedAny;
  }

  function createCenterAssemblyParticipantRecord(templateId = "w_minus_boson", options = {}) {
    const normalizedTemplateId = String(templateId ?? "").trim().toLowerCase();
    const resolvedTemplateId =
      normalizedTemplateId === "noether_core" ||
      normalizedTemplateId === "w_plus_boson" ||
      normalizedTemplateId === "z_boson" ||
      normalizedTemplateId === "free_architrinos"
        ? normalizedTemplateId
        : "w_minus_boson";
    return createParticipantRecord({
      side: "reactant",
      templateId: resolvedTemplateId,
      label:
        options.label ?? getDefaultParticipantBaseLabel(resolvedTemplateId, "Assembly"),
      hierarchy: buildFallbackHierarchyForTemplate(
        resolvedTemplateId,
        options.label ?? getDefaultParticipantBaseLabel(resolvedTemplateId, "Assembly")
      ),
      structureOptions: options.structureOptions ?? null,
      extraFields: {
        polarity: options.initialPolarity ?? "pro",
        surfaceColumn: "center-assembly",
        ...options.extraFields,
      },
    });
  }

  function syncAutoGeneratedDissociateAssembliesForOperator(operatorId = "") {
    const operator = findParticipantById(operatorId);
    if (!operator || operator.side !== "operator" || operator.templateId !== "dissociate") {
      return false;
    }
    removeAutoGeneratedDissociateAssemblies(operatorId);
    const dissociateInputMappings = state.mappings.filter((mapping) => {
      if (mapping.sourceRole !== "reactant" || mapping.targetRole !== "operator-input") {
        return false;
      }
      return String(parseNodeKey(mapping.targetKey).participantId) === String(operatorId);
    });
    if (dissociateInputMappings.length !== 1) {
      return false;
    }
    const sourceMapping = dissociateInputMappings[0];
    const autoGeneratedEntries = buildAutoGeneratedDissociateAssemblies(sourceMapping.sourceKey);
    if (!autoGeneratedEntries.length) {
      return false;
    }
    const operatorNode = getOperatorNode(operator);
    const baseSurfaceRowIndex = getParticipantSurfaceRowIndex(
      operator,
      Number(operator.operatorSlotIndex ?? 0)
    );
    autoGeneratedEntries.forEach((entry, index) => {
      const participant = createCenterAssemblyParticipantRecord(entry.templateId, {
        initialPolarity: entry.polarity ?? "pro",
        structureOptions: {
          occupiedSlots: entry.occupiedSlots,
        },
        extraFields: {
          autoGeneratedByDissociateParticipantId: operator.id,
          isAutoGeneratedDissociateAssembly: true,
        },
      });
      insertParticipantAtTopOfCollection(participant);
      placeParticipantOnSurfaceGrid("center-assembly", participant.id, baseSurfaceRowIndex + index);
      applyBinarySelectionsBySlotCode(participant, entry.binarySelectionsBySlotCode);
      const participantRootNode = getParticipantRootNode(participant);
      if (!operatorNode?.id || !participantRootNode?.id) {
        return;
      }
      addOrReplaceMapping(
        buildNodeKey(operator.id, operatorNode.id),
        "operator-output",
        buildNodeKey(participant.id, participantRootNode.id),
        "operator-input",
        {
          syncAutoGeneratedDissociateAssemblies: false,
        }
      );
    });
    return true;
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

  function cycleFreeArchitrinoPreset(participantId, nodeId) {
    const participant = findParticipantById(participantId);
    if (!participant || !nodeId) {
      return;
    }
    const groupNode = resolveBinarySelectorGroup(participant, nodeId);
    if (!groupNode || String(groupNode.templateId ?? "").trim().toLowerCase() !== "free_architrinos") {
      return;
    }
    const nodes = getBinarySelectorNodes(participant, groupNode);
    if (!nodes.length) {
      return;
    }
    const currentSelections = getResolvedBinarySelectionMap(participant, groupNode);
    const validAssignments = enumerateValidBinarySelectionAssignments(participant, groupNode);
    if (!validAssignments.length) {
      return;
    }

    const assignmentsByLedgerSignature = new Map();
    validAssignments.forEach((assignment) => {
      const signature = getLedgerSignature(getLedgerFromBinaryAssignment(assignment, nodes));
      const existingAssignments = assignmentsByLedgerSignature.get(signature) ?? [];
      existingAssignments.push(assignment);
      assignmentsByLedgerSignature.set(signature, existingAssignments);
    });

    const uniqueLedgerAssignments = [...assignmentsByLedgerSignature.entries()]
      .map(([signature, assignments]) => ({
        signature,
        ledger: getLedgerFromBinaryAssignment(assignments[0], nodes),
        assignment:
          pickBestBinaryAssignmentCandidate({
            participant,
            groupNode,
            assignments,
            currentSelections,
          }) ?? assignments[0],
      }))
      .sort((left, right) => {
        const electrinoDelta =
          Number(left.ledger?.electrino ?? 0) - Number(right.ledger?.electrino ?? 0);
        if (electrinoDelta !== 0) {
          return electrinoDelta;
        }
        return Number(left.ledger?.positrino ?? 0) - Number(right.ledger?.positrino ?? 0);
      });
    if (!uniqueLedgerAssignments.length) {
      return;
    }

    const currentLedgerSignature = getLedgerSignature(
      getLedgerFromBinaryAssignment(currentSelections, nodes)
    );
    const currentLedgerIndex = Math.max(
      0,
      uniqueLedgerAssignments.findIndex((entry) => entry.signature === currentLedgerSignature)
    );
    const nextSelections =
      uniqueLedgerAssignments[(currentLedgerIndex + 1) % uniqueLedgerAssignments.length]?.assignment ?? null;
    if (!nextSelections) {
      return;
    }
    participant.binarySelections = nextSelections;
    render();
  }

  function handleParticipantVisualClick(participant, event) {
    if (
      !participant ||
      participant.templateId !== "noether_core" ||
      participant.surfaceColumn !== "center-assembly"
    ) {
      return false;
    }
    event?.preventDefault?.();
    event?.stopPropagation?.();
    setParticipantPolarity(
      participant.id,
      participant.polarity === "anti" ? "pro" : "anti"
    );
    return true;
  }

  function closeMenu() {
    if (!menu) {
      return;
    }
    state.menuMode = "";
    state.menuParticipantId = "";
    state.menuOpen = false;
    state.menuAnchorElement = null;
    menu.hidden = true;
    menu.setAttribute("aria-hidden", "true");
    menu.innerHTML = "";
  }

  function syncHeaderActionButtons() {
    const canClear =
      state.active &&
      !state.isSolving &&
      (state.participants.length > 0 ||
        state.mappings.length > 0 ||
        !!state.pendingSourceKey ||
        !!state.pendingSourceRole);
    if (clearButton instanceof HTMLButtonElement) {
      clearButton.disabled = !canClear;
      clearButton.setAttribute("aria-disabled", canClear ? "false" : "true");
    }
    if (solveButton instanceof HTMLButtonElement) {
      const canSolve = state.active && !state.isSolving;
      solveButton.disabled = !canSolve;
      solveButton.setAttribute("aria-disabled", canSolve ? "false" : "true");
    }
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
    title.className = "composer-reaction-canvas-menu-title";
    title.textContent = text;
    menu.appendChild(title);
  }

  function renderMenuButton(text, options = {}) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "composer-reaction-canvas-menu-button";
    if (Array.isArray(options.extraClassNames)) {
      options.extraClassNames.filter(Boolean).forEach((className) => {
        button.classList.add(className);
      });
    }
    if (Array.isArray(options.lines) && options.lines.length) {
      options.lines.forEach((line) => {
        const lineElement = document.createElement("span");
        lineElement.className = "composer-reaction-canvas-menu-button-line";
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
    if (!pickerCell || pickerCell.vacant) {
      const preview = createReactionParticleTileElement(null, {
        classNames: ["composer-reaction-canvas-picker-card"],
      });
      preview.classList.add("is-vacant");
      preview.setAttribute("aria-hidden", "true");
      return preview;
    }
    const previewParticipant = {
      templateId: pickerCell.templateId,
      label: pickerCell.label,
      polarity: "",
    };
    return createReactionParticleTileElement(previewParticipant, {
      classNames: ["composer-reaction-canvas-picker-card"],
      getParticipantCardMeta,
      getParticipantCardLabelLines: () => getPickerTileLabelLines(pickerCell, previewParticipant),
    });
  }

  function createCenterAssemblyPickerCell(entry = null) {
    if (!entry?.templateId) {
      return null;
    }
    return {
      id: String(entry.templateId),
      label: String(entry.label ?? ""),
      templateId: String(entry.templateId),
      vacant: false,
      disabled: false,
    };
  }

  function createColumnAddButton(side, options = {}) {
    const operatorLaneIndex = normalizeOperatorLaneIndex(options.operatorLaneIndex);
    const operatorLayerEntry =
      side === "operator" ? getOperatorLaneLayoutEntry(operatorLaneIndex) : null;
    const operatorPickerEntries = getOperatorLanePickerEntries(operatorLayerEntry);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "composer-reaction-canvas-add-button";
    button.dataset.addSide = side;
    if (side === "operator") {
      button.dataset.operatorLaneIndex = String(operatorLaneIndex);
    }
    button.setAttribute(
      "aria-label",
      side === "product"
        ? "Add product"
        : side === "center"
          ? "Add center assembly"
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
        (side === "center" && state.menuMode === "center-assembly-picker") ||
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
    } else if (side === "center") {
      button.addEventListener("click", (event) =>
        openCenterAssemblyPicker(event.currentTarget)
      );
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

  function openCenterAssemblyPicker(triggerElement = null) {
    if (!state.active || !menu || !triggerElement) {
      return;
    }
    if (state.menuOpen && state.menuMode === "center-assembly-picker") {
      closeMenu();
      return;
    }
    closeExternalMenus();
    const bounds = triggerElement.getBoundingClientRect();
    state.menuClientX = bounds.left + bounds.width / 2;
    state.menuClientY = bounds.bottom + 10;
    state.menuAnchorElement = triggerElement;
    state.menuMode = "center-assembly-picker";
    state.menuParticipantId = "";
    state.menuOpen = true;
    renderMenu();
  }

  function createColumnAddControl(side, options = {}) {
    const control = document.createElement("div");
    control.className = `composer-reaction-canvas-add-control is-${side}`;
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
    const columnGroupEntries = getReactionSurfaceColumnGroupEntries();
    const columnGroupRatios = getReactionSurfaceColumnGroupRatios(columnGroupEntries.length);
    controls.className = "composer-reaction-canvas-surface-add-controls";
    columnGroupEntries.forEach((entry, columnGroupIndex) => {
      const control = createColumnAddControl(entry.side, {
        operatorLaneIndex: entry.operatorLaneIndex,
      });
      control.dataset.surfaceColumnGroupIndex = String(columnGroupIndex);
      control.style.left = `${(columnGroupRatios[columnGroupIndex] ?? 0.5) * 100}%`;
      controls.appendChild(control);
    });
    return controls;
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

  function insertParticipantAtTopOfCollection(participant) {
    if (!participant) {
      return;
    }
    const targetCollectionKey = getParticipantCollectionKey(participant);
    const insertionIndex = state.participants.findIndex(
      (entry) => getParticipantCollectionKey(entry) === targetCollectionKey
    );
    if (insertionIndex < 0) {
      state.participants.push(participant);
    } else {
      state.participants.splice(insertionIndex, 0, participant);
    }
    setParticipantSurfaceRowIndex(
      participant,
      getFirstAvailableCollectionRowIndex(
        targetCollectionKey,
        participant.id,
        getParticipantSurfaceRowSpan(participant)
      )
    );
    ensureCollectionSurfaceRows(targetCollectionKey);
  }

  function normalizeSurfaceRowIndex(rowIndex, fallbackIndex = 0) {
    const normalizedRowIndex = Math.round(Number(rowIndex));
    const resolvedFallbackIndex = Math.max(
      0,
      Math.min(canvasSurfaceMaxRowIndex, Math.round(Number(fallbackIndex) || 0))
    );
    return Number.isFinite(normalizedRowIndex)
      ? Math.max(0, Math.min(canvasSurfaceMaxRowIndex, normalizedRowIndex))
      : resolvedFallbackIndex;
  }

  function normalizeSurfaceRowSpan(rowSpan, fallbackSpan = 1) {
    const normalizedRowSpan = Math.round(Number(rowSpan));
    const resolvedFallbackSpan = Math.max(
      1,
      Math.min(REACTION_CANVAS_SURFACE_ROW_COUNT, Math.round(Number(fallbackSpan) || 1))
    );
    return Number.isFinite(normalizedRowSpan)
      ? Math.max(1, Math.min(REACTION_CANVAS_SURFACE_ROW_COUNT, normalizedRowSpan))
      : resolvedFallbackSpan;
  }

  function normalizeSurfaceRowStartIndex(rowIndex, rowSpan = 1, fallbackIndex = 0) {
    const resolvedRowSpan = normalizeSurfaceRowSpan(rowSpan);
    const maxStartRowIndex = Math.max(0, canvasSurfaceMaxRowIndex - resolvedRowSpan + 1);
    const normalizedRowIndex = Math.round(Number(rowIndex));
    const resolvedFallbackIndex = Math.max(
      0,
      Math.min(maxStartRowIndex, Math.round(Number(fallbackIndex) || 0))
    );
    return Number.isFinite(normalizedRowIndex)
      ? Math.max(0, Math.min(maxStartRowIndex, normalizedRowIndex))
      : resolvedFallbackIndex;
  }

  function getParticipantSurfaceRowSpan(participant) {
    if (!participant || isOperatorParticipant(participant) || !isCompositeParticipant(participant)) {
      return 1;
    }
    const rootNode = getParticipantRootNode(participant);
    return normalizeSurfaceRowSpan(Array.isArray(rootNode?.children) ? rootNode.children.length : 1);
  }

  function getParticipantSurfaceRowIndex(participant, fallbackIndex = 0) {
    const legacyRowIndex = isOperatorParticipant(participant)
      ? participant?.operatorSlotIndex
      : participant?.canvasRowIndex;
    return normalizeSurfaceRowStartIndex(
      participant?.surfaceRowIndex ?? legacyRowIndex,
      getParticipantSurfaceRowSpan(participant),
      fallbackIndex
    );
  }

  function setParticipantSurfaceRowIndex(participant, rowIndex) {
    if (!participant) {
      return 0;
    }
    const resolvedRowIndex = normalizeSurfaceRowStartIndex(
      rowIndex,
      getParticipantSurfaceRowSpan(participant)
    );
    participant.surfaceRowIndex = resolvedRowIndex;
    participant.canvasRowIndex = resolvedRowIndex;
    if (isOperatorParticipant(participant)) {
      participant.operatorSlotIndex = resolvedRowIndex;
    }
    return resolvedRowIndex;
  }

  function buildSplitParticipantsPreservingSurfaceRows(
    participant,
    childStructures = [],
    extraFieldsByIndex = () => ({})
  ) {
    const baseRowIndex = getParticipantSurfaceRowIndex(participant);
    const inheritedSurfaceColumn =
      typeof participant?.surfaceColumn === "string" && participant.surfaceColumn
        ? participant.surfaceColumn
        : "";
    return buildSplitParticipantsFromChildStructures(
      participant,
      childStructures,
      createParticipantRecord,
      (childStructure, index) => ({
        ...extraFieldsByIndex(childStructure, index),
        ...(inheritedSurfaceColumn ? { surfaceColumn: inheritedSurfaceColumn } : {}),
        surfaceRowIndex: normalizeSurfaceRowStartIndex(baseRowIndex + index, 1, baseRowIndex + index),
      })
    );
  }

  function getCollectionParticipants(collectionKey) {
    const normalizedCollectionKey = String(collectionKey ?? "").trim();
    return state.participants.filter(
      (participant) => getParticipantCollectionKey(participant) === normalizedCollectionKey
    );
  }

  function canOccupySurfaceRowRange(occupiedRowIndexes, rowIndex, rowSpan = 1) {
    const resolvedRowSpan = normalizeSurfaceRowSpan(rowSpan);
    const resolvedRowIndex = normalizeSurfaceRowStartIndex(rowIndex, resolvedRowSpan);
    for (let offset = 0; offset < resolvedRowSpan; offset += 1) {
      if (occupiedRowIndexes.has(resolvedRowIndex + offset)) {
        return false;
      }
    }
    return true;
  }

  function markOccupiedSurfaceRowRange(occupiedRowIndexes, rowIndex, rowSpan = 1) {
    const resolvedRowSpan = normalizeSurfaceRowSpan(rowSpan);
    const resolvedRowIndex = normalizeSurfaceRowStartIndex(rowIndex, resolvedRowSpan);
    for (let offset = 0; offset < resolvedRowSpan; offset += 1) {
      occupiedRowIndexes.add(resolvedRowIndex + offset);
    }
  }

  function getFirstAvailableRowIndexFromOccupied(occupiedRowIndexes, fallbackIndex = 0, rowSpan = 1) {
    const resolvedRowSpan = normalizeSurfaceRowSpan(rowSpan);
    const maxStartRowIndex = Math.max(0, canvasSurfaceMaxRowIndex - resolvedRowSpan + 1);
    for (let rowIndex = 0; rowIndex <= maxStartRowIndex; rowIndex += 1) {
      if (canOccupySurfaceRowRange(occupiedRowIndexes, rowIndex, resolvedRowSpan)) {
        return rowIndex;
      }
    }
    return normalizeSurfaceRowStartIndex(fallbackIndex, resolvedRowSpan);
  }

  function findNearestAvailableRowIndexFromOccupied(
    occupiedRowIndexes,
    targetRowIndex = 0,
    rowSpan = 1
  ) {
    const resolvedRowSpan = normalizeSurfaceRowSpan(rowSpan);
    const preferredRowIndex = normalizeSurfaceRowStartIndex(targetRowIndex, resolvedRowSpan);
    if (canOccupySurfaceRowRange(occupiedRowIndexes, preferredRowIndex, resolvedRowSpan)) {
      return preferredRowIndex;
    }
    for (let distance = 1; distance <= REACTION_CANVAS_SURFACE_ROW_COUNT; distance += 1) {
      const lowerRowIndex = preferredRowIndex - distance;
      const upperRowIndex = preferredRowIndex + distance;
      if (
        lowerRowIndex >= 0 &&
        canOccupySurfaceRowRange(occupiedRowIndexes, lowerRowIndex, resolvedRowSpan)
      ) {
        return lowerRowIndex;
      }
      if (
        upperRowIndex <= canvasSurfaceMaxRowIndex &&
        canOccupySurfaceRowRange(occupiedRowIndexes, upperRowIndex, resolvedRowSpan)
      ) {
        return upperRowIndex;
      }
    }
    return preferredRowIndex;
  }

  function getOccupiedCollectionRowIndexes(collectionKey, excludedParticipantId = "") {
    const normalizedCollectionKey = String(collectionKey ?? "").trim();
    const occupiedRowIndexes = new Set();
    getCollectionParticipants(normalizedCollectionKey)
      .filter((participant) => String(participant.id) !== String(excludedParticipantId))
      .forEach((participant, index) => {
        markOccupiedSurfaceRowRange(
          occupiedRowIndexes,
          getParticipantSurfaceRowIndex(participant, index),
          getParticipantSurfaceRowSpan(participant)
        );
      });
    return occupiedRowIndexes;
  }

  function getFirstAvailableCollectionRowIndex(
    collectionKey,
    excludedParticipantId = "",
    rowSpan = 1
  ) {
    return getFirstAvailableRowIndexFromOccupied(
      getOccupiedCollectionRowIndexes(collectionKey, excludedParticipantId),
      0,
      rowSpan
    );
  }

  function findNearestAvailableCollectionRowIndex(
    collectionKey,
    targetRowIndex = 0,
    excludedParticipantId = "",
    rowSpan = 1
  ) {
    return findNearestAvailableRowIndexFromOccupied(
      getOccupiedCollectionRowIndexes(collectionKey, excludedParticipantId),
      targetRowIndex,
      rowSpan
    );
  }

  function ensureCollectionSurfaceRows(collectionKey) {
    const normalizedCollectionKey = String(collectionKey ?? "").trim();
    const collectionParticipants = getCollectionParticipants(normalizedCollectionKey);
    const usedRowIndexes = new Set();
    collectionParticipants.forEach((participant, index) => {
      const rowSpan = getParticipantSurfaceRowSpan(participant);
      const preferredRowIndex = getParticipantSurfaceRowIndex(participant, index);
      const resolvedRowIndex = findNearestAvailableRowIndexFromOccupied(
        usedRowIndexes,
        preferredRowIndex,
        rowSpan
      );
      setParticipantSurfaceRowIndex(participant, resolvedRowIndex);
      markOccupiedSurfaceRowRange(usedRowIndexes, resolvedRowIndex, rowSpan);
    });
    return collectionParticipants;
  }

  function getCollectionParticipantsForRender(collectionKey) {
    const normalizedCollectionKey = String(collectionKey ?? "").trim();
    const collectionParticipants = ensureCollectionSurfaceRows(normalizedCollectionKey);
    return [...collectionParticipants].sort((left, right) => {
      const leftRowIndex = getParticipantSurfaceRowIndex(left);
      const rightRowIndex = getParticipantSurfaceRowIndex(right);
      if (leftRowIndex !== rightRowIndex) {
        return leftRowIndex - rightRowIndex;
      }
      return collectionParticipants.indexOf(left) - collectionParticipants.indexOf(right);
    });
  }

  function placeParticipantOnSurfaceGrid(collectionKey, participantId, targetRowIndex = 0) {
    const normalizedCollectionKey = String(collectionKey ?? "").trim();
    const collectionParticipants = ensureCollectionSurfaceRows(normalizedCollectionKey);
    const participant = collectionParticipants.find(
      (entry) => String(entry.id) === String(participantId)
    );
    if (!participant) {
      return false;
    }
    const rowSpan = getParticipantSurfaceRowSpan(participant);
    const resolvedRowIndex = findNearestAvailableCollectionRowIndex(
      normalizedCollectionKey,
      targetRowIndex,
      participant.id,
      rowSpan
    );
    if (getParticipantSurfaceRowIndex(participant) === resolvedRowIndex) {
      return false;
    }
    setParticipantSurfaceRowIndex(participant, resolvedRowIndex);
    return true;
  }

  function getCanvasGridTargetRowIndex(columnElement, side, clientY) {
    if (!(columnElement instanceof HTMLElement)) {
      return 0;
    }
    const header = columnElement.querySelector(
      `.composer-reaction-canvas-side-slot-header.is-${CSS.escape(side)}`
    );
    const columnBounds = columnElement.getBoundingClientRect();
    const headerBounds =
      header instanceof HTMLElement ? header.getBoundingClientRect() : null;
    const gridStartY = headerBounds
      ? headerBounds.bottom + REACTION_CANVAS_LAYOUT.contentStackGapPx
      : columnBounds.top;
    const targetRowIndex = Math.round(
      (clientY - (gridStartY + canvasRowHeightPx / 2)) / canvasRowStepPx
    );
    return normalizeSurfaceRowIndex(targetRowIndex);
  }

  function reorderParticipantCollection(collectionKey, orderedParticipantIds = []) {
    const normalizedCollectionKey = String(collectionKey ?? "").trim();
    const currentCollectionParticipants = state.participants.filter(
      (participant) => getParticipantCollectionKey(participant) === normalizedCollectionKey
    );
    if (currentCollectionParticipants.length <= 1) {
      return false;
    }
    const participantsById = new Map(
      currentCollectionParticipants.map((participant) => [String(participant.id), participant])
    );
    const reorderedParticipants = orderedParticipantIds
      .map((participantId) => participantsById.get(String(participantId)) ?? null)
      .filter(Boolean);
    if (reorderedParticipants.length !== currentCollectionParticipants.length) {
      return false;
    }
    const currentOrder = currentCollectionParticipants.map((participant) => String(participant.id));
    const nextOrder = reorderedParticipants.map((participant) => String(participant.id));
    if (currentOrder.every((participantId, index) => participantId === nextOrder[index])) {
      return false;
    }
    let reorderedIndex = 0;
    state.participants = state.participants.map((participant) => {
      if (getParticipantCollectionKey(participant) === normalizedCollectionKey) {
        return reorderedParticipants[reorderedIndex++] ?? participant;
      }
      return participant;
    });
    return true;
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
    insertParticipantAtTopOfCollection(participant);
    state.pendingSourceKey = "";
    state.pendingSourceAnchorInstanceIndex = null;
    closeMenu();
    render();
    const compositeModeLabel = getParticipantCompositeModeLabel(participant);
    setStatus(
      `${side === "reactant" ? "Reactant" : "Product"} ${participant.label} added to the reaction canvas${
        compositeModeLabel ? ` in ${compositeModeLabel.toLowerCase()} mode` : ""
      }.`
    );
  }

  function addParticipantFromPickerCell(side, pickerCell = null) {
    if (!pickerCell?.templateId || pickerCell.vacant || pickerCell.disabled) {
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
    insertParticipantAtTopOfCollection(participant);
    state.pendingSourceKey = "";
    state.pendingSourceRole = "";
    state.pendingSourceAnchorInstanceIndex = null;
    closeMenu();
    render();
    const compositeModeLabel = getParticipantCompositeModeLabel(participant);
    setStatus(
      `${side === "reactant" ? "Reactant" : "Product"} ${participant.label} added to the reaction canvas${
        compositeModeLabel ? ` in ${compositeModeLabel.toLowerCase()} mode` : ""
      }.`
    );
  }

  function addCenterAssemblyParticipant(templateId = "w_minus_boson") {
    const participant = createCenterAssemblyParticipantRecord(templateId);
    insertParticipantAtTopOfCollection(participant);
    state.pendingSourceKey = "";
    state.pendingSourceRole = "";
    state.pendingSourceAnchorInstanceIndex = null;
    closeMenu();
    render();
    setStatus(`Center assembly ${participant.label} added to the reaction canvas.`);
  }

  function createOperatorParticipant(templateId = "associate", operatorLaneIndex = 1, options = {}) {
    const normalizedTemplateId = isOperatorTemplateId(templateId) ? templateId : "associate";
    const resolvedLaneIndex = normalizeOperatorLaneIndex(operatorLaneIndex);
    const requestedOperatorSlotIndex =
      options?.operatorSlotIndex === null || options?.operatorSlotIndex === undefined
        ? null
        : Math.round(Number(options.operatorSlotIndex) || 0);
    const participant = createParticipantRecord({
      side: "operator",
      templateId: normalizedTemplateId,
      label: getDefaultParticipantBaseLabel(normalizedTemplateId, "Associate"),
      hierarchy: buildFallbackHierarchyForTemplate(
        normalizedTemplateId,
        getDefaultParticipantBaseLabel(normalizedTemplateId, "Associate")
      ),
      extraFields: {
        operatorLaneIndex: resolvedLaneIndex,
        operatorSlotIndex: 0,
        surfaceRowIndex: 0,
        isSolveGenerated: Boolean(options?.isSolveGenerated),
      },
    });
    state.participants.push(participant);
    assignOperatorParticipantToSlot(
      participant,
      requestedOperatorSlotIndex ??
        getFirstAvailableOperatorSlotIndex(participant.id, resolvedLaneIndex)
    );
    return participant;
  }

  function addOperatorParticipant(templateId = "associate", operatorLaneIndex = 1) {
    const participant = createOperatorParticipant(templateId, operatorLaneIndex);
    state.pendingSourceKey = "";
    state.pendingSourceRole = "";
    state.pendingSourceAnchorInstanceIndex = null;
    closeMenu();
    render();
    setStatus(`${participant.label} added to the reaction canvas.`);
  }

  function renderMenu() {
    if (!menu) {
      return;
    }
    menu.hidden = false;
    menu.setAttribute("aria-hidden", "false");
    menu.innerHTML = "";
    menu.dataset.menuMode = state.menuMode;
    if (state.menuMode === "operator-picker") {
      const operatorLayerEntry = getOperatorLaneLayoutEntry(state.menuOperatorLaneIndex);
      const pickerEntries = getOperatorLanePickerEntries(operatorLayerEntry);
      renderMenuTitle(operatorLayerEntry?.label || "Choose operator");
      pickerEntries.forEach((entry) => {
        renderMenuButton(entry.label, {
          onClick: () => addOperatorParticipant(entry.templateId, state.menuOperatorLaneIndex),
        });
      });
      renderMenuButton("Close", {
        kind: "secondary",
        onClick: () => closeMenu(),
      });
    } else if (state.menuMode === "center-assembly-picker") {
      renderMenuTitle("Add Assembly");
      REACTION_CENTER_ASSEMBLY_PICKER_ENTRIES.forEach((entry) => {
        const pickerCell = createCenterAssemblyPickerCell(entry);
        if (!pickerCell) {
          return;
        }
        const tileButton = document.createElement("button");
        tileButton.type = "button";
        tileButton.className = "composer-reaction-canvas-picker-tile";
        tileButton.style.gridColumn = String(REACTION_CENTER_ASSEMBLY_PICKER_ENTRIES.indexOf(entry) + 1);
        tileButton.style.gridRow = "2";
        tileButton.setAttribute("aria-label", `Add center assembly ${pickerCell.label}`);
        tileButton.appendChild(createPickerTilePreview(pickerCell));
        tileButton.addEventListener("click", () => addCenterAssemblyParticipant(entry.templateId));
        menu.appendChild(tileButton);
      });
    } else if (state.menuMode === "template-grid-picker") {
      renderMenuTitle(state.menuSide === "product" ? "Add Product" : "Add Reactant");
      getTemplateGridPickerLayout(addPickerCells).forEach((entry) => {
        const pickerCell = entry?.cell ?? null;
        const gridColumn = String((entry?.columnIndex ?? 0) + 1);
        const gridRow = String((entry?.rowIndex ?? 0) + 2);
        if (!pickerCell) {
          const vacantCell = document.createElement("span");
          vacantCell.className = "composer-reaction-canvas-picker-vacant";
          vacantCell.style.gridColumn = gridColumn;
          vacantCell.style.gridRow = gridRow;
          vacantCell.appendChild(createPickerTilePreview(null));
          menu.appendChild(vacantCell);
          return;
        }
        const tileButton = document.createElement("button");
        tileButton.type = "button";
        tileButton.className = "composer-reaction-canvas-picker-tile";
        tileButton.style.gridColumn = gridColumn;
        tileButton.style.gridRow = gridRow;
        if (pickerCell.disabled) {
          tileButton.disabled = true;
          tileButton.setAttribute("aria-disabled", "true");
          tileButton.style.opacity = "0.5";
          tileButton.style.cursor = "not-allowed";
        }
        tileButton.setAttribute(
          "aria-label",
          `${state.menuSide === "product" ? "Add product" : "Add reactant"} ${pickerCell.label}`
        );
        tileButton.appendChild(createPickerTilePreview(pickerCell));
        if (!pickerCell.disabled) {
          tileButton.addEventListener("click", () =>
            addParticipantFromPickerCell(state.menuSide, pickerCell)
          );
        }
        menu.appendChild(tileButton);
      });
    } else if (state.menuMode === "participant-actions") {
      const participant = findParticipantById(state.menuParticipantId);
      if (!participant) {
        closeMenu();
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
        participant.side === "reactant" &&
        (
          isNoetherAssemblyTemplateId(participant.templateId) ||
          participant.templateId === "photon" ||
          participant.templateId === "neutron" ||
          participant.templateId === "proton" ||
          participant.templateId === "pi_plus" ||
          participant.templateId === "pi_minus" ||
          participant.templateId === "upi0" ||
          participant.templateId === "dpi0" ||
          participant.templateId === "k_plus" ||
          participant.templateId === "k_minus" ||
          participant.templateId === "dk0" ||
          participant.templateId === "sk0" ||
          participant.templateId === "b_plus" ||
          participant.templateId === "b_minus" ||
          participant.templateId === "dB0" ||
          participant.templateId === "bB0"
        )
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
      renderMenuButton("Close", {
        kind: "secondary",
        onClick: () => closeMenu(),
      });
    } else {
      closeMenu();
      return;
    }
    updateMenuPosition();
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
      persistCanvasActive(storage, storageKey, nextActive);
    }
    render();
    if (announce) {
      setStatus(
        nextActive
          ? "Reaction app opened. Use the left + for reactants, the inner-left + for dissociate, the center + for Noether core, W-, W+, Z, or Free Architrinos assemblies, the inner-right + for associate, and the right + for products."
          : "Reaction app closed."
      );
    }
  }

  function toggleActive() {
    setActive(!state.active);
  }

  function getOperatorCardTop(operatorSlotIndex = 0) {
    return `${getReactionSurfaceRowCenterPx(operatorSlotIndex)}px`;
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

  function getReactionSurfaceColumnGroupRatios(
    requiredCount = getReactionSurfaceColumnGroupEntries().length
  ) {
    const count = Math.max(1, requiredCount);
    const columnGroupEntries = getReactionSurfaceColumnGroupEntries();
    if (!surface) {
      return getReactionSurfaceColumnGroupFallbackRatios(columnGroupEntries).slice(0, count);
    }
    if (count <= 1) {
      return [0.5];
    }
    if (!reactantsColumn || !centerAssembliesColumn || !productsColumn) {
      return getReactionSurfaceColumnGroupFallbackRatios(columnGroupEntries).slice(0, count);
    }
    const measuredRatios = measureReactionSurfaceColumnGroupRatios({
      surface,
      reactantsColumn,
      centerAssembliesColumn,
      productsColumn,
      columnGroupEntries,
    });
    if (!Array.isArray(measuredRatios) || measuredRatios.length !== columnGroupEntries.length) {
      return getReactionSurfaceColumnGroupFallbackRatios(columnGroupEntries).slice(0, count);
    }
    return measuredRatios.slice(0, count);
  }

  function getOperatorLaneRatios(requiredCount = operatorLaneCount) {
    const visibleColumnGroupEntries = getReactionSurfaceColumnGroupEntries();
    const columnGroupRatios = getReactionSurfaceColumnGroupRatios(
      visibleColumnGroupEntries.length
    );
    const visibleOperatorEntries = visibleColumnGroupEntries.filter(
      (entry) => entry.side === "operator"
    );
    const visibleOperatorRatios = visibleOperatorEntries
      .map((entry) => {
        const columnGroupIndex = visibleColumnGroupEntries.findIndex(
          (columnGroupEntry) =>
            columnGroupEntry.side === "operator" &&
            normalizeOperatorLaneIndex(columnGroupEntry.operatorLaneIndex) ===
              normalizeOperatorLaneIndex(entry.operatorLaneIndex)
        );
        return columnGroupRatios[columnGroupIndex];
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
    const columnGroupEntries = getReactionSurfaceColumnGroupEntries();
    const columnGroupIndex = columnGroupEntries.findIndex(
      (entry) =>
        entry.side === "operator" &&
        normalizeOperatorLaneIndex(entry.operatorLaneIndex) === resolvedLaneIndex
    );
    const columnGroupRatios = getReactionSurfaceColumnGroupRatios(columnGroupEntries.length);
    return `${(columnGroupRatios[columnGroupIndex] ?? 0.5) * 100}%`;
  }

  function getOperatorLaneSlotElement(operatorLaneIndex = null) {
    if (!surface || operatorLaneIndex === null || operatorLaneIndex === undefined) {
      return null;
    }
    return surface.querySelector(
      `.composer-reaction-canvas-column-group-slot[data-operator-lane-index="${CSS.escape(String(
        normalizeOperatorLaneIndex(operatorLaneIndex)
      ))}"]`
    );
  }

  function getReactionSurfaceGridStartOffsetPx() {
    if (!surface || typeof surface.getBoundingClientRect !== "function") {
      return canvasRowHeightPx / 2;
    }
    const surfaceBounds = surface.getBoundingClientRect();
    const headerBottomOffsets = [
      ...surface.querySelectorAll(".composer-reaction-canvas-side-slot-header"),
    ]
      .filter((element) => element instanceof HTMLElement)
      .map((element) => element.getBoundingClientRect())
      .filter((bounds) => bounds.height > 0)
      .map((bounds) => bounds.bottom - surfaceBounds.top);
    if (headerBottomOffsets.length) {
      return Math.max(...headerBottomOffsets) + REACTION_CANVAS_LAYOUT.contentStackGapPx;
    }
    return REACTION_CANVAS_LAYOUT.topControlRowHeightPx - 4;
  }

  function getReactionSurfaceRowCenterPx(rowIndex = 0) {
    const resolvedRowIndex = normalizeSurfaceRowIndex(rowIndex);
    const operatorLayerOffsetPx =
      !surface ||
      !operatorLayer ||
      typeof surface.getBoundingClientRect !== "function" ||
      typeof operatorLayer.getBoundingClientRect !== "function"
        ? 0
        : operatorLayer.getBoundingClientRect().top - surface.getBoundingClientRect().top;
    return (
      getReactionSurfaceGridStartOffsetPx() -
      operatorLayerOffsetPx +
      canvasRowHeightPx / 2 +
      resolvedRowIndex * canvasRowStepPx
    );
  }

  function getOperatorGridTargetRowIndex(clientY) {
    if (!operatorLayer) {
      return 0;
    }
    const bounds = operatorLayer.getBoundingClientRect();
    const gridStartY = bounds.top + getReactionSurfaceGridStartOffsetPx();
    const targetRowIndex = Math.round(
      (clientY - (gridStartY + canvasRowHeightPx / 2)) / canvasRowStepPx
    );
    return normalizeSurfaceRowIndex(targetRowIndex);
  }

  function getOccupiedOperatorSlotIndexes(excludedParticipantId = "", operatorLaneIndex = null) {
    return getOccupiedCollectionRowIndexes(
      `operator:${normalizeOperatorLaneIndex(operatorLaneIndex)}`,
      excludedParticipantId
    );
  }

  function getFirstAvailableOperatorSlotIndex(excludedParticipantId = "", operatorLaneIndex = null) {
    return getFirstAvailableCollectionRowIndex(
      `operator:${normalizeOperatorLaneIndex(operatorLaneIndex)}`,
      excludedParticipantId
    );
  }

  function findNearestAvailableOperatorSlotIndex(
    targetIndex,
    excludedParticipantId = "",
    operatorLaneIndex = null
  ) {
    return findNearestAvailableCollectionRowIndex(
      `operator:${normalizeOperatorLaneIndex(operatorLaneIndex)}`,
      targetIndex,
      excludedParticipantId
    );
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
    participant.operatorLaneIndex = resolvedLaneIndex;
    setParticipantSurfaceRowIndex(participant, resolvedSlotIndex);
  }

  function syncOperatorCardPosition(participantId) {
    if (!surface) {
      return;
    }
    const participant = findParticipantById(participantId);
    const card = surface.querySelector(
      `.composer-reaction-canvas-participant.is-operator[data-participant-id="${CSS.escape(participantId)}"]`
    );
    if (!participant || !card) {
      return;
    }
    assignOperatorParticipantToSlot(participant, participant.operatorSlotIndex);
    card.style.left = getOperatorCardLeft(participant.operatorLaneIndex);
    card.style.top = getOperatorCardTop(participant.operatorSlotIndex);
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
    const targetSlotIndex = getOperatorGridTargetRowIndex(clientY);
    const nextSlotIndex = findNearestAvailableOperatorSlotIndex(
      targetSlotIndex,
      participant.id,
      participant.operatorLaneIndex
    );
    if (participant.operatorSlotIndex === nextSlotIndex) {
      return;
    }
    setParticipantSurfaceRowIndex(participant, nextSlotIndex);
    syncOperatorCardPosition(participant.id);
    scheduleMappingDraw();
  }

  function updateSideParticipantDrag(clientY) {
    if (!state.dragParticipantId) {
      return;
    }
    const participant = findParticipantById(state.dragParticipantId);
    if (
      !participant ||
      (participant.side !== "reactant" && participant.side !== "product")
    ) {
      return;
    }
    const collectionKey = getParticipantCollectionKey(participant);
    const columnElement =
      collectionKey === "center-assembly"
        ? centerAssembliesColumn
        : participant.side === "product"
          ? productsColumn
          : reactantsColumn;
    if (!(columnElement instanceof HTMLElement)) {
      return;
    }
    const targetSide = collectionKey === "center-assembly" ? "center" : participant.side;
    if (!placeParticipantOnSurfaceGrid(
      collectionKey,
      participant.id,
      getCanvasGridTargetRowIndex(columnElement, targetSide, clientY)
    )) {
      return;
    }
    render();
  }

  function stopParticipantDrag() {
    if (!state.dragParticipantId || !surface) {
      clearDragState();
      return;
    }
    const card = surface.querySelector(
      `.composer-reaction-canvas-participant[data-participant-id="${CSS.escape(
        state.dragParticipantId
      )}"]`
    );
    if (card) {
      card.classList.remove("is-dragging");
    }
    clearDragState();
  }

  function startOperatorDrag(event, participantId) {
    if (event.button !== 0 || !operatorLayer) {
      return;
    }
    const target = event.target;
    if (target instanceof Element && target.closest(".composer-reaction-canvas-anchor")) {
      return;
    }
    state.dragParticipantId = participantId;
    state.dragParticipantMode = "operator";
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

  function startSideParticipantDrag(event, participantId) {
    if (event.button !== 0) {
      return;
    }
    const participant = findParticipantById(participantId);
    if (
      !participant ||
      (participant.side !== "reactant" && participant.side !== "product")
    ) {
      return;
    }
    const target = event.target;
    if (
      target instanceof Element &&
      target.closest(
        ".composer-reaction-canvas-anchor, button, input, select, textarea, label"
      )
    ) {
      return;
    }
    state.dragParticipantId = participantId;
    state.dragParticipantMode = "side";
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
    updateSideParticipantDrag(event.clientY);
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
        "Use the left + for reactants, the inner-left + for dissociate, the center + for Noether core, W-, W+, Z, or Free Architrinos assemblies, the inner-right + for associate, and the right + for products.";
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

  function syncOperatorLaneLayout() {
    if (!state.active || !operatorLayer) {
      return false;
    }
    const bounds = operatorLayer.getBoundingClientRect();
    if (bounds.width <= 1 || bounds.height <= 1) {
      return false;
    }
    const columnGroupRatios = getReactionSurfaceColumnGroupRatios(
      getReactionSurfaceColumnGroupEntries().length
    );
    Array.from(
      operatorLayer.querySelectorAll(
        ".composer-reaction-canvas-surface-add-controls > .composer-reaction-canvas-add-control"
      )
    ).forEach((control, index) => {
      const resolvedColumnGroupIndex = Math.max(
        0,
        Math.round(Number(control.dataset.surfaceColumnGroupIndex) || index)
      );
      control.style.left = `${(columnGroupRatios[resolvedColumnGroupIndex] ?? 0.5) * 100}%`;
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
    const header = columnElement.querySelector(
      `.composer-reaction-canvas-side-slot-header.is-${CSS.escape(side)}`
    );
    const sideParticipants = state.participants.filter(
      (participant) => {
        if (side === "center") {
          return isCenterAssemblyParticipant(participant);
        }
        if (side === "reactant") {
          return participant?.side === "reactant" && !isCenterAssemblyParticipant(participant);
        }
        return participant?.side === side;
      }
    );
    if (!sideParticipants.length) {
      if (header instanceof HTMLElement) {
        header.style.setProperty("--reaction-canvas-slot-header-offset", "0px");
      }
      return false;
    }
    if (header instanceof HTMLElement) {
      const profile = getReactionSideSlotHeaderProfile(sideParticipants, side);
      header.style.setProperty("--reaction-canvas-slot-header-offset", profile.offset);
    }
    return true;
  }

  function syncSideColumnGeometry() {
    if (!state.active || !reactantsColumn || !centerAssembliesColumn || !productsColumn) {
      return false;
    }
    const reactantsSynced = syncSideColumnTrackAlignment(reactantsColumn, "reactant");
    const centerSynced = syncSideColumnTrackAlignment(centerAssembliesColumn, "center");
    const productsSynced = syncSideColumnTrackAlignment(productsColumn, "product");
    if (reactantsSynced || centerSynced || productsSynced) {
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
    if (!root || !reactantsColumn || !centerAssembliesColumn || !productsColumn || !operatorLayer) {
      return;
    }
    notifySnapshotChange();
    syncHeaderActionButtons();
    root.classList.toggle("is-open", state.active);
    root.setAttribute("aria-hidden", state.active ? "false" : "true");
    reactantsColumn.innerHTML = "";
    centerAssembliesColumn.innerHTML = "";
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
    const reactantParticipants = getCollectionParticipantsForRender("reactant");
    const centerAssemblyParticipants = getCollectionParticipantsForRender("center-assembly");
    const productParticipants = getCollectionParticipantsForRender("product");
    const operatorParticipants = state.participants
      .filter((participant) => participant.side === "operator")
      .sort((left, right) => {
        const leftLaneIndex = normalizeOperatorLaneIndex(left.operatorLaneIndex);
        const rightLaneIndex = normalizeOperatorLaneIndex(right.operatorLaneIndex);
        if (leftLaneIndex !== rightLaneIndex) {
          return leftLaneIndex - rightLaneIndex;
        }
        return getParticipantSurfaceRowIndex(left) - getParticipantSurfaceRowIndex(right);
      });
    if (reactantParticipants.length) {
      reactantsColumn.appendChild(createSideSlotHeader(reactantParticipants, "reactant"));
    }
    reactantParticipants.forEach((participant) => {
      const card = renderParticipantCard(participant);
      card.style.gridRow = `${getParticipantSurfaceRowIndex(participant) + 2} / span ${getParticipantSurfaceRowSpan(participant)}`;
      reactantsColumn.appendChild(card);
    });
    if (centerAssemblyParticipants.length) {
      centerAssembliesColumn.appendChild(
        createSideSlotHeader(centerAssemblyParticipants, "center")
      );
    }
    centerAssemblyParticipants.forEach((participant) => {
      const card = renderParticipantCard(participant);
      card.style.gridRow = `${getParticipantSurfaceRowIndex(participant) + 2} / span ${getParticipantSurfaceRowSpan(participant)}`;
      centerAssembliesColumn.appendChild(card);
    });
    operatorLayer.appendChild(createOperatorAddControls());
    if (productParticipants.length) {
      productsColumn.appendChild(createSideSlotHeader(productParticipants, "product"));
    }
    productParticipants.forEach((participant) => {
      const card = renderParticipantCard(participant);
      card.style.gridRow = `${getParticipantSurfaceRowIndex(participant) + 2} / span ${getParticipantSurfaceRowSpan(participant)}`;
      productsColumn.appendChild(card);
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
    if (state.dragParticipantMode === "side") {
      updateSideParticipantDrag(event.clientY);
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
    stopParticipantDrag();
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
    if (toggleButton && !toggleButton.dataset.canvasBound) {
      toggleButton.dataset.canvasBound = "true";
      toggleButton.addEventListener("click", () => {
        toggleActive();
      });
    }
    if (root && !root.dataset.canvasBound) {
      root.dataset.canvasBound = "true";
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
    if (clearButton instanceof HTMLButtonElement && !clearButton.dataset.canvasBound) {
      clearButton.dataset.canvasBound = "true";
      clearButton.addEventListener("click", () => {
        clearReactionCanvas();
      });
    }
    if (solveButton instanceof HTMLButtonElement && !solveButton.dataset.canvasBound) {
      solveButton.dataset.canvasBound = "true";
      solveButton.addEventListener("click", async () => {
        await solveReactionCanvas();
      });
    }
    if (!document.body.dataset.composerReactionCanvasDocumentBound) {
      document.body.dataset.composerReactionCanvasDocumentBound = "true";
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
  if (readPersistedCanvasActive(storage, storageKey)) {
    setActive(true, { persist: false, announce: false });
  }
  render();

  return {
    isActive: () => state.active,
    clearCanvas: clearReactionCanvas,
    getSnapshot: buildSerializableSnapshot,
    replaceSnapshot,
    solveCanvas: solveReactionCanvas,
    setActive,
    toggleActive,
    closeMenu,
    render,
  };
}

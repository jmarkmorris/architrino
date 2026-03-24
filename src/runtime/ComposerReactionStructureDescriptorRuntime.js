import {
  getNoetherCoreSlotBinaryPresence,
  getNoetherCoreSlotOccupancy,
} from "../domain/structure/StructureClassification.js";
import {
  getStructureNodeChildren,
  getStructureTrait,
  STRUCTURE_CLASSIFICATION_FAMILIES,
  STRUCTURE_KINDS,
  STRUCTURE_SLOT_ORDER,
} from "../domain/structure/StructureSchema.js";

export const REACTION_STRUCTURE_RENDER_MODES = Object.freeze({
  BINARY_SELECTOR: "binary-selector",
  BINARY_SELECTOR_GRID: "binary-selector-grid",
  BINARY_BARE: "binary-bare",
  NOETHER_CORE_GRID: "noether-core-grid",
  HIGGS_CLUSTER_GRID: "higgs-cluster-grid",
  ASSEMBLY_CLUSTER_GRID: "assembly-cluster-grid",
  TRANSMUTE_TILE: "transmute-tile",
});

function createInventory(electrino = 0, positrino = 0, extra = {}) {
  return {
    ...extra,
    electrino,
    positrino,
  };
}

function createLeafDescriptor(id, label, inventory, options = {}) {
  return {
    id,
    label,
    children: [],
    inventory,
    ...(options.provenanceMode ? { provenanceMode: options.provenanceMode } : {}),
  };
}

function createBinarySlotDescriptor(id, label, slotCode, options = {}) {
  return {
    id,
    label,
    renderMode: options.renderMode ?? REACTION_STRUCTURE_RENDER_MODES.BINARY_SELECTOR,
    slotCode,
    hasBinary: options.hasBinary !== false,
    children: options.withPersonality === false
      ? [
          createLeafDescriptor(`${id}/binary`, "binary", createInventory(1, 1)),
        ]
      : [
          createLeafDescriptor(`${id}/binary`, "inner binary", createInventory(1, 1)),
          createLeafDescriptor(
            `${id}/personality_1`,
            "electrino personality architrino",
            createInventory(1, 0),
            { provenanceMode: "guessed" }
          ),
          createLeafDescriptor(
            `${id}/personality_2`,
            "positrino personality architrino",
            createInventory(0, 1),
            { provenanceMode: "guessed" }
          ),
        ],
  };
}

function getSlotCode(slotName = "") {
  const normalized = String(slotName ?? "").trim().toLowerCase();
  if (normalized === "inner") {
    return "I";
  }
  if (normalized === "middle") {
    return "M";
  }
  if (normalized === "outer") {
    return "O";
  }
  return "?";
}

function getBinarySelectorGroupLabel(structureRoot = null) {
  const polarity = String(getStructureTrait(structureRoot, "polarity", "")).trim().toLowerCase();
  const prefix = polarity === "anti" ? "anti" : "pro";
  return `${prefix} Noether core`;
}

function getBinarySelectorTemplateId(structureRoot = null) {
  const family = String(structureRoot?.classification?.family ?? "").trim();
  if (family === STRUCTURE_CLASSIFICATION_FAMILIES.CHARGED_LEPTON) {
    return "electron";
  }
  if (family === STRUCTURE_CLASSIFICATION_FAMILIES.NEUTRINO) {
    return "neutrino";
  }
  if (family === STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK) {
    return "up_quark";
  }
  if (family === STRUCTURE_CLASSIFICATION_FAMILIES.DOWN_TYPE_QUARK) {
    return "down_quark";
  }
  return "";
}

function getPrimaryNoetherCore(node = null) {
  if (!node) {
    return null;
  }
  if (node.kind === STRUCTURE_KINDS.NOETHER_CORE) {
    return node;
  }
  return getStructureNodeChildren(node).find((child) => child?.kind === STRUCTURE_KINDS.NOETHER_CORE) ?? null;
}

function buildNoetherCoreDescriptorTree(coreNode) {
  const coreLabel = String(coreNode?.label ?? "Noether core").trim() || "Noether core";
  const polarity = String(getStructureTrait(coreNode, "polarity", "")).trim().toLowerCase();
  return [{
    id: String(coreNode?.id ?? "root"),
    label: coreLabel,
    renderMode: REACTION_STRUCTURE_RENDER_MODES.NOETHER_CORE_GRID,
    inventory: polarity === "anti" ? { antiCore: 1 } : { proCore: 1 },
    children: STRUCTURE_SLOT_ORDER.map((slotName) =>
      createBinarySlotDescriptor(
        `${coreNode?.id ?? "root"}/${slotName}`,
        `${slotName} binary`,
        getSlotCode(slotName),
        {
          withPersonality: false,
          renderMode: REACTION_STRUCTURE_RENDER_MODES.BINARY_BARE,
        }
      )
    ),
  }];
}

function buildFamilyParticleDescriptorTree(structureRoot) {
  const coreNode = getPrimaryNoetherCore(structureRoot);
  const templateId = getBinarySelectorTemplateId(structureRoot);
  const occupancy = getNoetherCoreSlotOccupancy(coreNode);
  const binaryPresence = getNoetherCoreSlotBinaryPresence(coreNode);
  return [{
    id: String(structureRoot?.id ?? "root"),
    label: getBinarySelectorGroupLabel(structureRoot),
    templateId,
    renderMode: REACTION_STRUCTURE_RENDER_MODES.BINARY_SELECTOR_GRID,
    children: STRUCTURE_SLOT_ORDER.map((slotName) =>
      createBinarySlotDescriptor(
        `${structureRoot?.id ?? "root"}/${slotName}`,
        `${slotName} binary with personality`,
        getSlotCode(slotName),
        { hasBinary: binaryPresence[slotName] }
      )
    ),
    traits: {
      occupancy,
      binaryPresence,
    },
  }];
}

function getQuarkDescriptorLabel(family = "") {
  return family === STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK ? "Up quark" : "Down quark";
}

function buildCoreAssemblyDescriptorTree(structureRoot, fallbackLabel) {
  return [{
    id: String(structureRoot?.id ?? "root"),
    label: String(structureRoot?.label ?? fallbackLabel).trim() || fallbackLabel,
    renderMode: REACTION_STRUCTURE_RENDER_MODES.ASSEMBLY_CLUSTER_GRID,
    children: getStructureNodeChildren(structureRoot).map((childNode, index) => ({
      id: childNode.id || `core_${index + 1}`,
      label: String(childNode?.label ?? "Noether core").trim() || "Noether core",
      renderMode: REACTION_STRUCTURE_RENDER_MODES.NOETHER_CORE_GRID,
      inventory: String(getStructureTrait(childNode, "polarity", "")).trim().toLowerCase() === "anti"
        ? { antiCore: 1 }
        : { proCore: 1 },
      children: STRUCTURE_SLOT_ORDER.map((slotName) =>
        createBinarySlotDescriptor(
          `${childNode.id}/${slotName}`,
          `${slotName} binary`,
          getSlotCode(slotName),
          {
            withPersonality: false,
            renderMode: REACTION_STRUCTURE_RENDER_MODES.BINARY_BARE,
          }
        )
      ),
    })),
  }];
}

function buildCompositeParticleDescriptorTree(structureRoot) {
  const family = String(structureRoot?.classification?.family ?? "").trim();
  if (family === STRUCTURE_CLASSIFICATION_FAMILIES.BARYON) {
    return [{
      id: String(structureRoot?.id ?? "root"),
      label: String(structureRoot?.label ?? structureRoot?.species ?? "Composite").trim() || "Composite",
      renderMode: REACTION_STRUCTURE_RENDER_MODES.ASSEMBLY_CLUSTER_GRID,
      children: getStructureNodeChildren(structureRoot).map((childNode, index) => {
        const childFamily = String(childNode?.classification?.family ?? "").trim();
        const childBinaryPresence = getNoetherCoreSlotBinaryPresence(getPrimaryNoetherCore(childNode));
        return {
          id: childNode.id || `quark_${index + 1}`,
          label: getQuarkDescriptorLabel(childFamily),
          templateId:
            childFamily === STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK ? "up_quark" : "down_quark",
          renderMode: REACTION_STRUCTURE_RENDER_MODES.BINARY_SELECTOR_GRID,
          children: STRUCTURE_SLOT_ORDER.map((slotName) =>
            createBinarySlotDescriptor(
              `${childNode.id}/${slotName}`,
              `${slotName} binary with personality`,
              getSlotCode(slotName),
              { hasBinary: childBinaryPresence[slotName] }
            )
          ),
        };
      }),
    }];
  }

  if (String(structureRoot?.species ?? "").trim() === "higgs_cluster") {
    return buildCoreAssemblyDescriptorTree(structureRoot, "Higgs cluster");
  }

  if (String(structureRoot?.species ?? "").trim() === "photon") {
    return buildCoreAssemblyDescriptorTree(structureRoot, "Photon");
  }

  if (String(structureRoot?.species ?? "").trim() === "transmute") {
    return [{
      id: String(structureRoot?.id ?? "root"),
      label: String(structureRoot?.label ?? "Transmute").trim() || "Transmute",
      renderMode: REACTION_STRUCTURE_RENDER_MODES.TRANSMUTE_TILE,
      children: [],
    }];
  }

  return null;
}

export function isReactionStructureCompositeGridRenderMode(renderMode = "") {
  return (
    renderMode === REACTION_STRUCTURE_RENDER_MODES.HIGGS_CLUSTER_GRID ||
    renderMode === REACTION_STRUCTURE_RENDER_MODES.ASSEMBLY_CLUSTER_GRID
  );
}

export function isReactionStructureInlineAnchorRenderMode(renderMode = "") {
  return (
    renderMode === REACTION_STRUCTURE_RENDER_MODES.NOETHER_CORE_GRID ||
    renderMode === REACTION_STRUCTURE_RENDER_MODES.BINARY_SELECTOR_GRID ||
    renderMode === REACTION_STRUCTURE_RENDER_MODES.HIGGS_CLUSTER_GRID ||
    renderMode === REACTION_STRUCTURE_RENDER_MODES.ASSEMBLY_CLUSTER_GRID
  );
}

export function shouldRenderReactionStructureDescriptorChildren(node = null) {
  const renderMode = String(node?.renderMode ?? "").trim();
  return (
    renderMode !== REACTION_STRUCTURE_RENDER_MODES.BINARY_SELECTOR &&
    renderMode !== REACTION_STRUCTURE_RENDER_MODES.BINARY_SELECTOR_GRID &&
    renderMode !== REACTION_STRUCTURE_RENDER_MODES.HIGGS_CLUSTER_GRID &&
    renderMode !== REACTION_STRUCTURE_RENDER_MODES.ASSEMBLY_CLUSTER_GRID &&
    renderMode !== REACTION_STRUCTURE_RENDER_MODES.BINARY_BARE
  );
}

export function buildReactionStructureDescriptorTree(structureRoot) {
  if (!structureRoot) {
    return [];
  }
  if (structureRoot.kind === STRUCTURE_KINDS.NOETHER_CORE) {
    return buildNoetherCoreDescriptorTree(structureRoot);
  }
  if (structureRoot.kind === STRUCTURE_KINDS.PARTICLE) {
    const family = String(structureRoot?.classification?.family ?? "").trim();
    if (
      family === STRUCTURE_CLASSIFICATION_FAMILIES.CHARGED_LEPTON ||
      family === STRUCTURE_CLASSIFICATION_FAMILIES.NEUTRINO ||
      family === STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK ||
      family === STRUCTURE_CLASSIFICATION_FAMILIES.DOWN_TYPE_QUARK
    ) {
      return buildFamilyParticleDescriptorTree(structureRoot);
    }
    const compositeDescriptorTree = buildCompositeParticleDescriptorTree(structureRoot);
    if (compositeDescriptorTree) {
      return compositeDescriptorTree;
    }
  }
  if (
    structureRoot.kind === STRUCTURE_KINDS.COMPOSITE &&
    String(structureRoot?.species ?? "").trim() === "transmute"
  ) {
    return [{
      id: String(structureRoot?.id ?? "root"),
      label: String(structureRoot?.label ?? "Transmute").trim() || "Transmute",
      renderMode: REACTION_STRUCTURE_RENDER_MODES.TRANSMUTE_TILE,
      children: [],
    }];
  }
  return [];
}

export function buildReactionSolverHierarchyFromStructure(structureRoot) {
  return buildReactionStructureDescriptorTree(structureRoot);
}

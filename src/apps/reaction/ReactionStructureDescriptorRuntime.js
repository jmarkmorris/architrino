import {
  getNoetherCoreSlotBinaryPresence,
  getNoetherCoreSlotOccupancy,
} from "../../domain/structure/StructureClassification.js";
import {
  getStructureNodeChildren,
  getStructureTrait,
  STRUCTURE_CLASSIFICATION_FAMILIES,
  STRUCTURE_KINDS,
  STRUCTURE_SLOT_ORDER,
} from "../../domain/structure/StructureSchema.js";

export const REACTION_STRUCTURE_RENDER_MODES = Object.freeze({
  BINARY_SELECTOR: "binary-selector",
  BINARY_SELECTOR_GRID: "binary-selector-grid",
  BINARY_BARE: "binary-bare",
  NOETHER_CORE_GRID: "noether-core-grid",
  HIGGS_CLUSTER_GRID: "higgs-cluster-grid",
  ASSEMBLY_CLUSTER_GRID: "assembly-cluster-grid",
  OPERATOR_TILE: "operator-tile",
});

const REACTION_STRUCTURE_TRACK_SLOT_CODES = Object.freeze({
  reactant: Object.freeze(["I", "M", "O"]),
  product: Object.freeze(["O", "M", "I"]),
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

export function getReactionStructureTrackSlotCodes(side = "reactant") {
  return REACTION_STRUCTURE_TRACK_SLOT_CODES[
    side === "product" ? "product" : "reactant"
  ];
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
  const prefix = polarity === "anti" ? "Anti" : "Pro";
  return `${prefix} Noether Core`;
}

function getCanonicalNoetherCoreLabel(polarity = "") {
  return String(polarity ?? "").trim().toLowerCase() === "anti"
    ? "Anti Noether Core"
    : "Pro Noether Core";
}

function getBinarySelectorTemplateId(structureRoot = null) {
  const species = String(structureRoot?.species ?? "").trim().toLowerCase();
  if (species === "w_minus_boson") {
    return "w_minus_boson";
  }
  if (species === "w_plus_boson") {
    return "w_plus_boson";
  }
  if (species === "z_boson") {
    return "z_boson";
  }
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
  const coreLabel = String(coreNode?.label ?? "Noether Core").trim() || "Noether Core";
  const polarity = String(getStructureTrait(coreNode, "polarity", "")).trim().toLowerCase();
  const binaryPresence = getNoetherCoreSlotBinaryPresence(coreNode);
  return [{
    id: String(coreNode?.id ?? "root"),
    label: coreLabel,
    templateId: "noether_core",
    polarity,
    renderMode: REACTION_STRUCTURE_RENDER_MODES.NOETHER_CORE_GRID,
    layoutRole: "track-row",
    inventory: polarity === "anti" ? { antiCore: 1 } : { proCore: 1 },
    children: STRUCTURE_SLOT_ORDER.map((slotName) =>
      createBinarySlotDescriptor(
        `${coreNode?.id ?? "root"}/${slotName}`,
        `${slotName} binary`,
        getSlotCode(slotName),
        {
          hasBinary: binaryPresence[slotName],
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
    polarity: "pro",
    renderMode: REACTION_STRUCTURE_RENDER_MODES.BINARY_SELECTOR_GRID,
    layoutRole: "track-row",
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

function buildZBosonDescriptorTree(structureRoot) {
  const coreNode = getPrimaryNoetherCore(structureRoot);
  const occupancy = getNoetherCoreSlotOccupancy(coreNode);
  const binaryPresence = getNoetherCoreSlotBinaryPresence(coreNode);
  return [{
    id: String(structureRoot?.id ?? "root"),
    label: String(structureRoot?.label ?? "Z Boson").trim() || "Z Boson",
    templateId: "z_boson",
    renderMode: REACTION_STRUCTURE_RENDER_MODES.BINARY_SELECTOR_GRID,
    layoutRole: "track-row",
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

function buildWBosonDescriptorTree(structureRoot, templateId, fallbackLabel) {
  const coreNode = getPrimaryNoetherCore(structureRoot);
  const occupancy = getNoetherCoreSlotOccupancy(coreNode);
  const binaryPresence = getNoetherCoreSlotBinaryPresence(coreNode);
  return [{
    id: String(structureRoot?.id ?? "root"),
    label: String(structureRoot?.label ?? fallbackLabel).trim() || fallbackLabel,
    templateId,
    renderMode: REACTION_STRUCTURE_RENDER_MODES.BINARY_SELECTOR_GRID,
    layoutRole: "track-row",
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

function buildFreeArchitrinosDescriptorTree(structureRoot) {
  return [{
    id: String(structureRoot?.id ?? "root"),
    label: String(structureRoot?.label ?? "Free Architrinos").trim() || "Free Architrinos",
    templateId: "free_architrinos",
    renderMode: REACTION_STRUCTURE_RENDER_MODES.BINARY_SELECTOR_GRID,
    layoutRole: "track-row",
    children: STRUCTURE_SLOT_ORDER.map((slotName) =>
      createBinarySlotDescriptor(
        `${structureRoot?.id ?? "root"}/${slotName}`,
        `${slotName} free architrinos`,
        getSlotCode(slotName),
        { hasBinary: false }
      )
    ),
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
    children: getStructureNodeChildren(structureRoot).map((childNode, index) => {
      const polarity = String(getStructureTrait(childNode, "polarity", "")).trim().toLowerCase();
      const childBinaryPresence = getNoetherCoreSlotBinaryPresence(childNode);
      return {
        id: childNode.id || `core_${index + 1}`,
        label: getCanonicalNoetherCoreLabel(polarity),
        templateId: "noether_core",
        polarity,
        renderMode: REACTION_STRUCTURE_RENDER_MODES.NOETHER_CORE_GRID,
        layoutRole: "composite-row",
        inventory: polarity === "anti" ? { antiCore: 1 } : { proCore: 1 },
        children: STRUCTURE_SLOT_ORDER
          .filter((slotName) => childBinaryPresence[slotName])
          .map((slotName) =>
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
      };
    }),
  }];
}

function buildCompositeParticleDescriptorTree(structureRoot) {
  const normalizedSpecies = String(structureRoot?.species ?? "").trim().toLowerCase();
  const family = String(structureRoot?.classification?.family ?? "").trim();
  if (
    family === STRUCTURE_CLASSIFICATION_FAMILIES.BARYON ||
    family === STRUCTURE_CLASSIFICATION_FAMILIES.MESON
  ) {
    return [{
      id: String(structureRoot?.id ?? "root"),
      label: String(structureRoot?.label ?? structureRoot?.species ?? "Composite").trim() || "Composite",
      renderMode: REACTION_STRUCTURE_RENDER_MODES.ASSEMBLY_CLUSTER_GRID,
      children: getStructureNodeChildren(structureRoot).map((childNode, index) => {
        const childFamily = String(childNode?.classification?.family ?? "").trim();
        const childBinaryPresence = getNoetherCoreSlotBinaryPresence(getPrimaryNoetherCore(childNode));
        const childPolarity = String(getStructureTrait(childNode, "polarity", "")).trim().toLowerCase();
        return {
          id: childNode.id || `quark_${index + 1}`,
          label: getQuarkDescriptorLabel(childFamily),
          templateId:
            childFamily === STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK ? "up_quark" : "down_quark",
          polarity: childPolarity === "anti" ? "anti" : "pro",
          renderMode: REACTION_STRUCTURE_RENDER_MODES.BINARY_SELECTOR_GRID,
          layoutRole: "composite-row",
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

  if (normalizedSpecies === "higgs_cluster") {
    return buildCoreAssemblyDescriptorTree(structureRoot, "Higgs cluster");
  }

  if (normalizedSpecies === "photon") {
    return buildCoreAssemblyDescriptorTree(structureRoot, "Photon");
  }

  if (normalizedSpecies === "associate" || normalizedSpecies === "dissociate") {
    return [{
      id: String(structureRoot?.id ?? "root"),
      label:
        String(
          structureRoot?.label ??
            (normalizedSpecies === "associate"
              ? "Associate"
              : "Dissociate")
        ).trim() ||
        "Operator",
      renderMode: REACTION_STRUCTURE_RENDER_MODES.OPERATOR_TILE,
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

export function walkReactionStructureDescriptorTree(nodes = [], visitor = () => {}) {
  (Array.isArray(nodes) ? nodes : []).forEach((node) => {
    visitor(node);
    walkReactionStructureDescriptorTree(node?.children, visitor);
  });
}

export function findReactionStructureDescriptorNode(nodes = [], nodeId = "") {
  const normalizedId = String(nodeId ?? "").trim();
  if (!normalizedId) {
    return null;
  }
  for (const node of Array.isArray(nodes) ? nodes : []) {
    if (String(node?.id ?? "").trim() === normalizedId) {
      return node;
    }
    const childMatch = findReactionStructureDescriptorNode(node?.children, normalizedId);
    if (childMatch) {
      return childMatch;
    }
  }
  return null;
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
    const normalizedSpecies = String(structureRoot?.species ?? "").trim().toLowerCase();
    const family = String(structureRoot?.classification?.family ?? "").trim();
    if (normalizedSpecies === "w_minus_boson") {
      return buildWBosonDescriptorTree(structureRoot, "w_minus_boson", "W- Boson");
    }
    if (normalizedSpecies === "w_plus_boson") {
      return buildWBosonDescriptorTree(structureRoot, "w_plus_boson", "W+ Boson");
    }
    if (normalizedSpecies === "z_boson") {
      return buildZBosonDescriptorTree(structureRoot);
    }
    if (normalizedSpecies === "free_architrinos") {
      return buildFreeArchitrinosDescriptorTree(structureRoot);
    }
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
    (
      String(structureRoot?.species ?? "").trim() === "associate" ||
      String(structureRoot?.species ?? "").trim() === "dissociate"
    )
  ) {
    const normalizedSpecies = String(structureRoot?.species ?? "").trim().toLowerCase();
    return [{
      id: String(structureRoot?.id ?? "root"),
      label:
        String(
          structureRoot?.label ??
            (normalizedSpecies === "associate"
              ? "Associate"
              : "Dissociate")
        ).trim() ||
        "Operator",
      renderMode: REACTION_STRUCTURE_RENDER_MODES.OPERATOR_TILE,
      children: [],
    }];
  }
  return [];
}

export function supportsReactionStructureDescriptorTree(structureRoot) {
  return buildReactionStructureDescriptorTree(structureRoot).length > 0;
}

export function getReactionBinarySelectorGroups(structureRoot) {
  const descriptorTree = buildReactionStructureDescriptorTree(structureRoot);
  const groups = [];
  walkReactionStructureDescriptorTree(descriptorTree, (node) => {
    if (node?.renderMode !== REACTION_STRUCTURE_RENDER_MODES.BINARY_SELECTOR_GRID) {
      return;
    }
    const slotNodes = Array.isArray(node?.children)
      ? node.children.filter(
          (childNode) =>
            childNode?.renderMode === REACTION_STRUCTURE_RENDER_MODES.BINARY_SELECTOR ||
            childNode?.renderMode === REACTION_STRUCTURE_RENDER_MODES.BINARY_BARE
        )
      : [];
    groups.push({
      id: String(node?.id ?? "").trim(),
      templateId: String(node?.templateId ?? "").trim().toLowerCase(),
      label: String(node?.label ?? "").trim(),
      slotNodes,
      occupancy: node?.traits?.occupancy ?? null,
      binaryPresence: node?.traits?.binaryPresence ?? null,
    });
  });
  return groups;
}

export function findReactionBinarySelectorGroup(structureRoot, targetNodeId = "") {
  const normalizedId = String(targetNodeId ?? "").trim();
  if (!normalizedId) {
    return null;
  }
  return (
    getReactionBinarySelectorGroups(structureRoot).find(
      (group) =>
        group.id === normalizedId ||
        group.slotNodes.some((slotNode) => slotNode?.id === normalizedId)
    ) ?? null
  );
}

export function buildReactionSolverHierarchyFromStructure(structureRoot) {
  return buildReactionStructureDescriptorTree(structureRoot);
}

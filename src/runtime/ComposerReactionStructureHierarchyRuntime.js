import {
  getNoetherCoreSlotOccupancy,
} from "../domain/structure/StructureClassification.js";
import {
  getStructureNodeChildren,
  getStructureTrait,
  STRUCTURE_ARCHITRINO_ROLES,
  STRUCTURE_CLASSIFICATION_FAMILIES,
  STRUCTURE_KINDS,
  STRUCTURE_SLOT_ORDER,
} from "../domain/structure/StructureSchema.js";

function createInventory(electrino = 0, positrino = 0, extra = {}) {
  return {
    ...extra,
    electrino,
    positrino,
  };
}

function createLeafNode(id, label, inventory, options = {}) {
  return {
    id,
    label,
    children: [],
    inventory,
    ...(options.provenanceMode ? { provenanceMode: options.provenanceMode } : {}),
  };
}

function createBinarySelectorNode(id, label, slotCode, options = {}) {
  return {
    id,
    label,
    renderMode: options.renderMode ?? "binary-selector",
    slotCode,
    children: options.withPersonality === false
      ? [
          createLeafNode(`${id}/binary`, "binary", createInventory(1, 1)),
        ]
      : [
          createLeafNode(`${id}/binary`, "inner binary", createInventory(1, 1)),
          createLeafNode(`${id}/personality_1`, "electrino personality architrino", createInventory(1, 0), {
            provenanceMode: "guessed",
          }),
          createLeafNode(`${id}/personality_2`, "positrino personality architrino", createInventory(0, 1), {
            provenanceMode: "guessed",
          }),
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
  const family = String(structureRoot?.classification?.family ?? "").trim();
  if (family === STRUCTURE_CLASSIFICATION_FAMILIES.NEUTRINO) {
    return `${prefix} Noether core`;
  }
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

function buildNoetherCoreGridHierarchy(coreNode) {
  const coreLabel = String(coreNode?.label ?? "Noether core").trim() || "Noether core";
  const polarity = String(getStructureTrait(coreNode, "polarity", "")).trim().toLowerCase();
  return [{
    id: String(coreNode?.id ?? "root"),
    label: coreLabel,
    renderMode: "noether-core-grid",
    inventory: polarity === "anti" ? { antiCore: 1 } : { proCore: 1 },
    children: STRUCTURE_SLOT_ORDER.map((slotName) =>
      createBinarySelectorNode(
        `${coreNode?.id ?? "root"}/${slotName}`,
        `${slotName} binary`,
        getSlotCode(slotName),
        { withPersonality: false, renderMode: "binary-bare" }
      )
    ),
  }];
}

function buildFamilyParticleHierarchy(structureRoot) {
  const coreNode = getPrimaryNoetherCore(structureRoot);
  const templateId = getBinarySelectorTemplateId(structureRoot);
  return [{
    id: String(structureRoot?.id ?? "root"),
    label: getBinarySelectorGroupLabel(structureRoot),
    templateId,
    renderMode: "binary-selector-grid",
    children: STRUCTURE_SLOT_ORDER.map((slotName) =>
      createBinarySelectorNode(
        `${structureRoot?.id ?? "root"}/${slotName}`,
        `${slotName} binary with personality`,
        getSlotCode(slotName)
      )
    ),
    traits: {
      occupancy: getNoetherCoreSlotOccupancy(coreNode),
    },
  }];
}

function getQuarkNodeLabel(family = "") {
  return family === STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK ? "Up quark" : "Down quark";
}

function buildCompositeParticleHierarchy(structureRoot) {
  const family = String(structureRoot?.classification?.family ?? "").trim();
  if (family === STRUCTURE_CLASSIFICATION_FAMILIES.BARYON) {
    return [{
      id: String(structureRoot?.id ?? "root"),
      label: String(structureRoot?.label ?? structureRoot?.species ?? "Composite").trim() || "Composite",
      renderMode: "assembly-cluster-grid",
      children: getStructureNodeChildren(structureRoot).map((childNode, index) => {
        const childFamily = String(childNode?.classification?.family ?? "").trim();
        return {
          id: childNode.id || `quark_${index + 1}`,
          label: getQuarkNodeLabel(childFamily),
          templateId:
            childFamily === STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK ? "up_quark" : "down_quark",
          renderMode: "binary-selector-grid",
          children: STRUCTURE_SLOT_ORDER.map((slotName) =>
            createBinarySelectorNode(
              `${childNode.id}/${slotName}`,
              `${slotName} binary with personality`,
              getSlotCode(slotName)
            )
          ),
        };
      }),
    }];
  }

  if (String(structureRoot?.species ?? "").trim() === "higgs_cluster") {
    return [{
      id: String(structureRoot?.id ?? "root"),
      label: String(structureRoot?.label ?? "Higgs cluster").trim() || "Higgs cluster",
      renderMode: "assembly-cluster-grid",
      children: getStructureNodeChildren(structureRoot).map((childNode, index) => ({
        id: childNode.id || `core_${index + 1}`,
        label: String(childNode?.label ?? "Noether core").trim() || "Noether core",
        renderMode: "noether-core-grid",
        inventory: String(getStructureTrait(childNode, "polarity", "")).trim().toLowerCase() === "anti"
          ? { antiCore: 1 }
          : { proCore: 1 },
        children: STRUCTURE_SLOT_ORDER.map((slotName) =>
          createBinarySelectorNode(
            `${childNode.id}/${slotName}`,
            `${slotName} binary`,
            getSlotCode(slotName),
            { withPersonality: false, renderMode: "binary-bare" }
          )
        ),
      })),
    }];
  }

  if (String(structureRoot?.species ?? "").trim() === "transmute") {
    return [{
      id: String(structureRoot?.id ?? "root"),
      label: String(structureRoot?.label ?? "Transmute").trim() || "Transmute",
      renderMode: "transmute-tile",
      children: [],
    }];
  }

  return null;
}

export function buildReactionSolverHierarchyFromStructure(structureRoot) {
  if (!structureRoot) {
    return [];
  }
  if (structureRoot.kind === STRUCTURE_KINDS.NOETHER_CORE) {
    return buildNoetherCoreGridHierarchy(structureRoot);
  }
  if (structureRoot.kind === STRUCTURE_KINDS.PARTICLE) {
    const family = String(structureRoot?.classification?.family ?? "").trim();
    if (
      family === STRUCTURE_CLASSIFICATION_FAMILIES.CHARGED_LEPTON ||
      family === STRUCTURE_CLASSIFICATION_FAMILIES.NEUTRINO ||
      family === STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK ||
      family === STRUCTURE_CLASSIFICATION_FAMILIES.DOWN_TYPE_QUARK
    ) {
      return buildFamilyParticleHierarchy(structureRoot);
    }
    const compositeHierarchy = buildCompositeParticleHierarchy(structureRoot);
    if (compositeHierarchy) {
      return compositeHierarchy;
    }
  }
  if (structureRoot.kind === STRUCTURE_KINDS.COMPOSITE && String(structureRoot?.species ?? "").trim() === "transmute") {
    return [{
      id: String(structureRoot?.id ?? "root"),
      label: String(structureRoot?.label ?? "Transmute").trim() || "Transmute",
      renderMode: "transmute-tile",
      children: [],
    }];
  }
  return [];
}


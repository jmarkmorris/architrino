import {
  getNoetherCoreSlotBinaryPresence,
  getNoetherCoreSlotOccupancy,
} from "../domain/structure/StructureClassification.js";
import {
  getStructureNodeChildren,
  STRUCTURE_CLASSIFICATION_FAMILIES,
  STRUCTURE_KINDS,
  STRUCTURE_SLOT_ORDER,
} from "../domain/structure/StructureSchema.js";
import { walkStructure } from "../domain/structure/StructureTraversal.js";

const familyTemplateIds = Object.freeze({
  [STRUCTURE_CLASSIFICATION_FAMILIES.CHARGED_LEPTON]: "electron",
  [STRUCTURE_CLASSIFICATION_FAMILIES.NEUTRINO]: "neutrino",
  [STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK]: "up_quark",
  [STRUCTURE_CLASSIFICATION_FAMILIES.DOWN_TYPE_QUARK]: "down_quark",
});

function getPrimaryNoetherCore(node = null) {
  if (!node) {
    return null;
  }
  if (node.kind === STRUCTURE_KINDS.NOETHER_CORE) {
    return node;
  }
  return (
    getStructureNodeChildren(node).find(
      (childNode) => childNode?.kind === STRUCTURE_KINDS.NOETHER_CORE
    ) ?? null
  );
}

function getSlotCode(slotName = "") {
  if (slotName === "inner") {
    return "I";
  }
  if (slotName === "middle") {
    return "M";
  }
  if (slotName === "outer") {
    return "O";
  }
  return "?";
}

function createBinarySelectorSlotNode(groupId, slotName, options = {}) {
  return {
    id: `${groupId}/${slotName}`,
    slotName,
    slotCode: getSlotCode(slotName),
    label: `${slotName} binary with personality`,
    renderMode: "binary-selector",
    hasBinary: options.hasBinary !== false,
    children: [],
  };
}

export function getReactionBinarySelectorGroups(structureRoot) {
  if (!structureRoot) {
    return [];
  }
  const groups = [];
  walkStructure(structureRoot, (node) => {
    if (node?.kind !== STRUCTURE_KINDS.PARTICLE) {
      return;
    }
    const family = String(node?.classification?.family ?? "").trim();
    const templateId = familyTemplateIds[family] ?? "";
    if (!templateId || !node?.id) {
      return;
    }
    const coreNode = getPrimaryNoetherCore(node);
    if (!coreNode) {
      return;
    }
    const occupancy = getNoetherCoreSlotOccupancy(coreNode);
    const binaryPresence = getNoetherCoreSlotBinaryPresence(coreNode);
    const slotNodes = STRUCTURE_SLOT_ORDER.filter((slotName) => occupancy[slotName]).map(
      (slotName) => createBinarySelectorSlotNode(node.id, slotName, {
        hasBinary: binaryPresence[slotName],
      })
    );
    groups.push({
      id: node.id,
      templateId,
      label: String(node?.label ?? "").trim(),
      slotNodes,
      occupancy,
      binaryPresence,
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
        group.slotNodes.some((slotNode) => slotNode.id === normalizedId)
    ) ?? null
  );
}

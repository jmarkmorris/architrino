import { classifyStructureTree } from "./StructureClassification.js";
import {
  cloneStructureNode,
  getStructureNodeChildren,
  getStructureTrait,
  STRUCTURE_ARCHITRINO_ROLES,
  STRUCTURE_CHARGE_TYPES,
  STRUCTURE_KINDS,
} from "./StructureSchema.js";
import { mapStructure, updateStructureNodeById } from "./StructureTraversal.js";

function normalizePolarity(polarity) {
  return String(polarity ?? "").trim().toLowerCase() === "anti" ? "anti" : "pro";
}

function invertBinaryMemberCharge(charge) {
  const normalized = String(charge ?? "").trim();
  if (normalized === STRUCTURE_CHARGE_TYPES.POSITRINO) {
    return STRUCTURE_CHARGE_TYPES.ELECTRINO;
  }
  if (normalized === STRUCTURE_CHARGE_TYPES.ELECTRINO) {
    return STRUCTURE_CHARGE_TYPES.POSITRINO;
  }
  return charge;
}

function invertBinaryMemberLabel(label) {
  const normalized = String(label ?? "").trim().toLowerCase();
  if (normalized === STRUCTURE_CHARGE_TYPES.ELECTRINO) {
    return STRUCTURE_CHARGE_TYPES.POSITRINO;
  }
  if (normalized === STRUCTURE_CHARGE_TYPES.POSITRINO) {
    return STRUCTURE_CHARGE_TYPES.ELECTRINO;
  }
  return label;
}

export function replaceStructureNodeById(root, nodeId, replacementNode) {
  const targetId = String(nodeId ?? "").trim();
  if (!root || !targetId || !replacementNode) {
    return cloneStructureNode(root);
  }
  return updateStructureNodeById(root, targetId, () => cloneStructureNode(replacementNode));
}

export function removeStructureNodeById(root, nodeId) {
  const targetId = String(nodeId ?? "").trim();
  if (!root || !targetId) {
    return cloneStructureNode(root);
  }
  if (root.id === targetId) {
    return null;
  }
  return updateStructureNodeById(root, root.id, (node) => ({
    ...node,
    children: getStructureNodeChildren(node)
      .filter((child) => child?.id !== targetId)
      .map((child) => removeStructureNodeById(child, targetId))
      .filter(Boolean),
  }));
}

export function clearNoetherBraidSlotOccupant(root, noetherBraidId, slotName) {
  const targetCoreId = String(noetherBraidId ?? "").trim();
  const targetSlotName = String(slotName ?? "").trim();
  if (!root || !targetCoreId || !targetSlotName) {
    return cloneStructureNode(root);
  }
  const nextRoot = updateStructureNodeById(root, targetCoreId, (node) => {
    if (node?.kind !== STRUCTURE_KINDS.NOETHER_BRAID) {
      return node;
    }
    return {
      ...node,
      children: getStructureNodeChildren(node).map((child) => {
        if (
          child?.kind === STRUCTURE_KINDS.SLOT &&
          String(getStructureTrait(child, "slot", "")).trim() === targetSlotName
        ) {
          const occupant = getStructureNodeChildren(child).find(
            (slotChild) => slotChild?.kind === STRUCTURE_KINDS.PERSONALITY_DRESSED_BINARY
          );
          if (!occupant) {
            return child;
          }
          return {
            ...child,
            children: [
              {
                ...occupant,
                children: getStructureNodeChildren(occupant).filter(
                  (occupantChild) => occupantChild?.kind !== STRUCTURE_KINDS.BINARY
                ),
              },
            ],
          };
        }
        return child;
      }),
    };
  });
  return classifyStructureTree(nextRoot);
}

export function applyStructurePolarity(root, nextPolarity) {
  if (!root) {
    return null;
  }
  const resolvedPolarity = normalizePolarity(nextPolarity);
  return mapStructure(root, (node, context) => {
    const updates = {};
    const nodeRole = String(getStructureTrait(node, "role", "")).trim();
    if (
      node.kind === STRUCTURE_KINDS.ARCHITRINO &&
      nodeRole === STRUCTURE_ARCHITRINO_ROLES.BINARY_MEMBER
    ) {
      updates.traits = {
        ...(node.traits ?? {}),
        charge: invertBinaryMemberCharge(getStructureTrait(node, "charge", "")),
      };
      const nextLabel = invertBinaryMemberLabel(node.label);
      if (nextLabel !== node.label) {
        updates.label = nextLabel;
      }
    }
    if (context.parent == null || node.kind === STRUCTURE_KINDS.NOETHER_BRAID) {
      updates.traits = {
        ...(updates.traits ?? node.traits ?? {}),
        polarity: resolvedPolarity,
      };
    }
    return Object.keys(updates).length ? { ...node, ...updates } : node;
  });
}

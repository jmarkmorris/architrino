import { classifyStructureTree } from "./StructureClassification.js";
import { cloneStructureNode, getStructureNodeChildren, getStructureTrait, STRUCTURE_KINDS } from "./StructureSchema.js";
import { updateStructureNodeById } from "./StructureTraversal.js";

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

export function clearNoetherCoreSlotOccupant(root, noetherCoreId, slotName) {
  const targetCoreId = String(noetherCoreId ?? "").trim();
  const targetSlotName = String(slotName ?? "").trim();
  if (!root || !targetCoreId || !targetSlotName) {
    return cloneStructureNode(root);
  }
  const nextRoot = updateStructureNodeById(root, targetCoreId, (node) => {
    if (node?.kind !== STRUCTURE_KINDS.NOETHER_CORE) {
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

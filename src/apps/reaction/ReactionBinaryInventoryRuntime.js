import { getNoetherCoreSlotBinaryPresence } from "../../domain/structure/StructureClassification.js";
import { findStructureNodeById } from "../../domain/structure/StructureTraversal.js";
import {
  getStructureNodeChildren,
  STRUCTURE_KINDS,
} from "../../domain/structure/StructureSchema.js";

function defaultGetBinaryChoiceInventory() {
  return {
    electrino: 0,
    positrino: 0,
  };
}

function defaultGetResolvedBinarySelectionMap(participant = null) {
  return participant?.binarySelections ?? {};
}

export function createReactionBinaryInventoryRuntime(options = {}) {
  const getBinaryChoiceInventory =
    typeof options.getBinaryChoiceInventory === "function"
      ? options.getBinaryChoiceInventory
      : defaultGetBinaryChoiceInventory;
  const getResolvedBinarySelectionMap =
    typeof options.getResolvedBinarySelectionMap === "function"
      ? options.getResolvedBinarySelectionMap
      : defaultGetResolvedBinarySelectionMap;
  const resolveBinarySelectorGroup =
    typeof options.resolveBinarySelectorGroup === "function"
      ? options.resolveBinarySelectorGroup
      : () => null;

  function resolveBinaryChoiceInventory(participant, node, groupNode = null) {
    const selectionMap = getResolvedBinarySelectionMap(participant);
    const choiceId = selectionMap?.[node?.id] ?? "";
    const baseInventory = getBinaryChoiceInventory(choiceId);
    const slotName =
      String(node?.slotName ?? "").trim().toLowerCase() ||
      ({
        I: "inner",
        M: "middle",
        O: "outer",
      }[String(node?.slotCode ?? "").trim().toUpperCase()] ??
        "");
    const groupRecord = resolveBinarySelectorGroup(participant, groupNode ?? node);
    const structureNode =
      participant?.structure && groupRecord?.id
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

  return {
    resolveBinaryChoiceInventory,
  };
}

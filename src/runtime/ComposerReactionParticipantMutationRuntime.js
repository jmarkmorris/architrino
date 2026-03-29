import {
  getNoetherCoreSlotBinaryPresence,
} from "../domain/structure/StructureClassification.js";
import {
  cloneStructureNode,
  getStructureNodeChildren,
  getStructureTrait,
  STRUCTURE_CLASSIFICATION_FAMILIES,
  STRUCTURE_KINDS,
} from "../domain/structure/StructureSchema.js";
import {
  clearNoetherCoreSlotOccupant,
} from "../domain/structure/StructureTransforms.js";
import { validateStructureTree } from "../domain/structure/StructureValidation.js";
import { resolveStructureDisplayLabel } from "../domain/structure/StructureDisplayLabel.js";

export function createComposerReactionParticipantMutationRuntime(options = {}) {
  const supportsParticipantPolarity =
    typeof options.supportsParticipantPolarity === "function"
      ? options.supportsParticipantPolarity
      : () => false;
  const formatParticipantLabel =
    typeof options.formatParticipantLabel === "function"
      ? options.formatParticipantLabel
      : (label) => String(label ?? "").trim() || "?";
  const buildParticipantHierarchy =
    typeof options.buildParticipantHierarchy === "function"
      ? options.buildParticipantHierarchy
      : (_structureRoot, fallbackHierarchy = []) => fallbackHierarchy;
  const getInitialParticipantBinarySelections =
    typeof options.getInitialParticipantBinarySelections === "function"
      ? options.getInitialParticipantBinarySelections
      : () => ({});

  function inferTemplateIdFromStructure(structureRoot) {
    if (!structureRoot) {
      return "noether_core";
    }
    const structureKind = String(structureRoot?.kind ?? "").trim();
    const structureSpecies = String(structureRoot?.species ?? "").trim().toLowerCase();
    const family = String(structureRoot?.classification?.family ?? "").trim();
    if (structureKind === STRUCTURE_KINDS.NOETHER_CORE) {
      return "noether_core";
    }
    if (structureSpecies === "higgs_cluster") {
      return "higgs_cluster";
    }
    if (structureSpecies === "photon") {
      return "photon";
    }
    if (structureSpecies === "z_boson") {
      return "z_boson";
    }
    if (structureSpecies === "proton") {
      return "proton";
    }
    if (structureSpecies === "neutron") {
      return "neutron";
    }
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
    return structureSpecies || "noether_core";
  }

  function inferParticipantPolarityFromStructure(structureRoot) {
    const polarity = String(getStructureTrait(structureRoot, "polarity", "")).trim().toLowerCase();
    return polarity === "anti" ? "anti" : "pro";
  }

  function inferParticipantBaseLabelFromStructure(structureRoot) {
    return resolveStructureDisplayLabel(structureRoot);
  }

  function refreshParticipantFromStructure(participant, nextStructure, options = {}) {
    if (!participant || !nextStructure) {
      return false;
    }
    const resolvedStructure = cloneStructureNode(nextStructure);
    const resolvedTemplateId = inferTemplateIdFromStructure(resolvedStructure);
    const resolvedPolarity = supportsParticipantPolarity(resolvedTemplateId)
      ? inferParticipantPolarityFromStructure(resolvedStructure)
      : participant.polarity;
    const resolvedBaseLabel = inferParticipantBaseLabelFromStructure(resolvedStructure);

    participant.templateId = resolvedTemplateId;
    participant.polarity = resolvedPolarity;
    participant.baseLabel = resolvedBaseLabel;
    participant.label = formatParticipantLabel(
      resolvedBaseLabel,
      resolvedTemplateId,
      resolvedPolarity
    );
    participant.structure = resolvedStructure;
    participant.structureValidation = validateStructureTree(resolvedStructure);
    participant.hierarchy = buildParticipantHierarchy(
      resolvedStructure,
      options.fallbackHierarchy ?? participant.hierarchy
    );
    if (options.preserveBinarySelections !== true) {
      participant.binarySelections = getInitialParticipantBinarySelections(participant);
    }
    return true;
  }

  function getParticipantPrimaryNoetherCore(participant) {
    if (!participant?.structure) {
      return null;
    }
    if (participant.structure.kind === STRUCTURE_KINDS.NOETHER_CORE) {
      return participant.structure;
    }
    return (
      getStructureNodeChildren(participant.structure).find(
        (childNode) => childNode?.kind === STRUCTURE_KINDS.NOETHER_CORE
      ) ?? null
    );
  }

  function getNextParticipantGenerationTrimAction(participant) {
    const family = String(participant?.structure?.classification?.family ?? "").trim();
    const supportedFamilies = new Set([
      STRUCTURE_CLASSIFICATION_FAMILIES.CHARGED_LEPTON,
      STRUCTURE_CLASSIFICATION_FAMILIES.NEUTRINO,
      STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK,
      STRUCTURE_CLASSIFICATION_FAMILIES.DOWN_TYPE_QUARK,
    ]);
    if (!supportedFamilies.has(family)) {
      return null;
    }
    const coreNode = getParticipantPrimaryNoetherCore(participant);
    const binaryPresence = getNoetherCoreSlotBinaryPresence(coreNode);
    if (binaryPresence.outer) {
      return {
        slotName: "outer",
        menuLabel: "Remove outer binary",
      };
    }
    if (binaryPresence.middle) {
      return {
        slotName: "middle",
        menuLabel: "Remove middle binary",
      };
    }
    return null;
  }

  function trimParticipantGenerationStructure(participant, slotName) {
    const coreNode = getParticipantPrimaryNoetherCore(participant);
    if (!participant?.structure || !coreNode?.id) {
      return null;
    }
    return clearNoetherCoreSlotOccupant(participant.structure, coreNode.id, slotName);
  }

  function buildSplitParticipantsFromChildStructures(
    participant,
    childStructures = [],
    createParticipantRecord,
    extraFieldsByIndex = () => ({})
  ) {
    if (typeof createParticipantRecord !== "function") {
      return [];
    }
    return (Array.isArray(childStructures) ? childStructures : []).map((childStructure, index) =>
      createParticipantRecord({
        side: participant.side,
        templateId: inferTemplateIdFromStructure(childStructure),
        label: inferParticipantBaseLabelFromStructure(childStructure),
        structure: childStructure,
        hierarchy: buildParticipantHierarchy(childStructure, []),
        extraFields: {
          polarity: inferParticipantPolarityFromStructure(childStructure),
          ...extraFieldsByIndex(childStructure, index),
        },
      })
    );
  }

  return {
    buildSplitParticipantsFromChildStructures,
    getNextParticipantGenerationTrimAction,
    getParticipantPrimaryNoetherCore,
    inferParticipantBaseLabelFromStructure,
    inferParticipantPolarityFromStructure,
    inferTemplateIdFromStructure,
    refreshParticipantFromStructure,
    trimParticipantGenerationStructure,
  };
}

import {
  getStructureNodeChildren,
  getStructureTrait,
  STRUCTURE_CLASSIFICATION_FAMILIES,
  STRUCTURE_KINDS,
  STRUCTURE_SLOT_ORDER,
} from "./StructureSchema.js";
import { mapStructure } from "./StructureTraversal.js";

const familySpeciesByOccupancyKey = Object.freeze({
  [STRUCTURE_CLASSIFICATION_FAMILIES.CHARGED_LEPTON]: Object.freeze({
    inner_middle_outer: { species: "electron", generation: 1 },
    inner_middle: { species: "muon", generation: 2 },
    inner: { species: "tau", generation: 3 },
  }),
  [STRUCTURE_CLASSIFICATION_FAMILIES.NEUTRINO]: Object.freeze({
    inner_middle_outer: { species: "electron_neutrino", generation: 1 },
    inner_middle: { species: "muon_neutrino", generation: 2 },
    inner: { species: "tau_neutrino", generation: 3 },
  }),
  [STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK]: Object.freeze({
    inner_middle_outer: { species: "up_quark", generation: 1 },
    inner_middle: { species: "charm_quark", generation: 2 },
    inner: { species: "top_quark", generation: 3 },
  }),
  [STRUCTURE_CLASSIFICATION_FAMILIES.DOWN_TYPE_QUARK]: Object.freeze({
    inner_middle_outer: { species: "down_quark", generation: 1 },
    inner_middle: { species: "strange_quark", generation: 2 },
    inner: { species: "bottom_quark", generation: 3 },
  }),
});

function getPrimaryNoetherBraid(node) {
  if (!node) {
    return null;
  }
  if (node.kind === STRUCTURE_KINDS.NOETHER_BRAID) {
    return node;
  }
  return getStructureNodeChildren(node).find((child) => child?.kind === STRUCTURE_KINDS.NOETHER_BRAID) ?? null;
}

function getSlotOccupant(slotNode) {
  return getStructureNodeChildren(slotNode).find(
    (child) => child?.kind === STRUCTURE_KINDS.PERSONALITY_DRESSED_BINARY
  ) ?? null;
}

export function getNoetherBraidSlotOccupancy(coreNode) {
  const occupancy = {
    inner: false,
    middle: false,
    outer: false,
  };
  if (!coreNode || coreNode.kind !== STRUCTURE_KINDS.NOETHER_BRAID) {
    return occupancy;
  }
  getStructureNodeChildren(coreNode)
    .filter((child) => child?.kind === STRUCTURE_KINDS.SLOT)
    .forEach((slotNode) => {
      const slotName = String(getStructureTrait(slotNode, "slot", "")).trim();
      if (!STRUCTURE_SLOT_ORDER.includes(slotName)) {
        return;
      }
      occupancy[slotName] = getStructureNodeChildren(slotNode).length > 0;
    });
  return occupancy;
}

export function getNoetherBraidSlotBinaryPresence(coreNode) {
  const presence = {
    inner: false,
    middle: false,
    outer: false,
  };
  if (!coreNode || coreNode.kind !== STRUCTURE_KINDS.NOETHER_BRAID) {
    return presence;
  }
  getStructureNodeChildren(coreNode)
    .filter((child) => child?.kind === STRUCTURE_KINDS.SLOT)
    .forEach((slotNode) => {
      const slotName = String(getStructureTrait(slotNode, "slot", "")).trim();
      if (!STRUCTURE_SLOT_ORDER.includes(slotName)) {
        return;
      }
      const occupant = getSlotOccupant(slotNode);
      presence[slotName] = getStructureNodeChildren(occupant).some(
        (child) => child?.kind === STRUCTURE_KINDS.BINARY
      );
    });
  return presence;
}

export function getNoetherBraidOccupancyKey(coreNode) {
  const occupancy = getNoetherBraidSlotOccupancy(coreNode);
  return STRUCTURE_SLOT_ORDER.filter((slotName) => occupancy[slotName]).join("_");
}

export function getNoetherBraidBinaryPresenceKey(coreNode) {
  const presence = getNoetherBraidSlotBinaryPresence(coreNode);
  return STRUCTURE_SLOT_ORDER.filter((slotName) => presence[slotName]).join("_");
}

export function deriveStructureClassification(node) {
  const family = String(node?.classification?.family ?? "").trim();
  if (!family) {
    return {
      species: node?.species,
      classification: node?.classification ? { ...node.classification } : undefined,
    };
  }
  const familySpeciesMap = familySpeciesByOccupancyKey[family] ?? null;
  if (!familySpeciesMap) {
    return {
      species: node?.species ?? family,
      classification: {
        ...node?.classification,
        source: node?.classification?.source ?? "derived",
      },
    };
  }
  const binaryPresenceKey = getNoetherBraidBinaryPresenceKey(getPrimaryNoetherBraid(node));
  const derived = familySpeciesMap[binaryPresenceKey] ?? null;
  return {
    species: derived?.species ?? node?.species,
    classification: {
      ...node?.classification,
      generation: derived?.generation ?? null,
      source: node?.classification?.source === "authored_override" ? "authored_override" : "derived",
    },
  };
}

export function classifyStructureTree(root) {
  return mapStructure(root, (node) => {
    if (node?.kind !== STRUCTURE_KINDS.PARTICLE) {
      return node;
    }
    if (node?.classification?.source === "authored_override") {
      return node;
    }
    const derived = deriveStructureClassification(node);
    return {
      ...node,
      species: derived.species,
      classification: derived.classification,
    };
  });
}

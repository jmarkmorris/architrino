import {
  getStructureNodeChildren,
  getStructureTrait,
  isExoticStructureNode,
  STRUCTURE_ARCHITRINO_ROLES,
  STRUCTURE_CHARGE_TYPES,
  STRUCTURE_KINDS,
  STRUCTURE_SLOT_ORDER,
} from "./StructureSchema.js";
import { walkStructure } from "./StructureTraversal.js";

function pushError(errors, code, message, node = null) {
  errors.push({
    code,
    message,
    nodeId: node?.id ?? "",
    nodeKind: node?.kind ?? "",
  });
}

function validateBinaryNode(node, errors) {
  const children = getStructureNodeChildren(node);
  if (children.length !== 2) {
    pushError(errors, "binary.child_count", "Binary nodes must have exactly two children.", node);
    return;
  }
  const members = children.filter((child) => child?.kind === STRUCTURE_KINDS.ARCHITRINO);
  if (members.length !== 2) {
    pushError(errors, "binary.child_kind", "Binary nodes must contain exactly two architrinos.", node);
    return;
  }
  const roleErrors = members.some(
    (child) => getStructureTrait(child, "role") !== STRUCTURE_ARCHITRINO_ROLES.BINARY_MEMBER
  );
  if (roleErrors) {
    pushError(errors, "binary.child_role", "Binary architrinos must be marked as binary members.", node);
  }
  const chargeKey = (child) => String(getStructureTrait(child, "charge", "")).trim();
  const charges = members.map(chargeKey).sort();
  if (
    charges[0] !== STRUCTURE_CHARGE_TYPES.ELECTRINO ||
    charges[1] !== STRUCTURE_CHARGE_TYPES.POSITRINO
  ) {
    pushError(
      errors,
      "binary.child_charge",
      "Binary nodes must contain one electrino and one positrino.",
      node
    );
  }
}

function validatePersonalityDressedBinaryNode(node, errors) {
  if (isExoticStructureNode(node)) {
    return;
  }
  const children = getStructureNodeChildren(node);
  const binaryChildren = children.filter((child) => child?.kind === STRUCTURE_KINDS.BINARY);
  const personalityChildren = children.filter(
    (child) =>
      child?.kind === STRUCTURE_KINDS.ARCHITRINO &&
      getStructureTrait(child, "role") === STRUCTURE_ARCHITRINO_ROLES.PERSONALITY_CHARGE
  );
  if (binaryChildren.length > 1) {
    pushError(
      errors,
      "personality_dressed_binary.binary_count",
      "Personality-dressed binaries may contain at most one binary child.",
      node
    );
  }
  if (personalityChildren.length !== 2) {
    pushError(
      errors,
      "personality_dressed_binary.personality_count",
      "Personality-dressed binaries must contain exactly two personality charges.",
      node
    );
  }
}

function validateSlotNode(node, errors) {
  const slotName = String(getStructureTrait(node, "slot", "")).trim();
  if (!STRUCTURE_SLOT_ORDER.includes(slotName)) {
    pushError(errors, "slot.name", "Slot nodes must declare inner, middle, or outer.", node);
  }
  const children = getStructureNodeChildren(node);
  if (children.length > 1) {
    pushError(errors, "slot.child_count", "Slot nodes may contain at most one child.", node);
  }
  if (
    children.length === 1 &&
    children[0]?.kind !== STRUCTURE_KINDS.PERSONALITY_DRESSED_BINARY &&
    !isExoticStructureNode(node)
  ) {
    pushError(
      errors,
      "slot.child_kind",
      "Canonical slot occupancy must be a personality-dressed binary.",
      node
    );
  }
}

function validateNoetherSwarmNode(node, errors) {
  if (isExoticStructureNode(node)) {
    return;
  }
  const children = getStructureNodeChildren(node);
  const slotChildren = children.filter((child) => child?.kind === STRUCTURE_KINDS.SLOT);
  if (slotChildren.length !== 3) {
    pushError(errors, "noether_swarm.slot_count", "Canonical Noether swarms must contain three slots.", node);
    return;
  }
  const seen = new Set();
  slotChildren.forEach((slotNode) => {
    const slotName = String(getStructureTrait(slotNode, "slot", "")).trim();
    if (seen.has(slotName)) {
      pushError(errors, "noether_swarm.slot_duplicate", `Duplicate ${slotName} slot.`, node);
      return;
    }
    seen.add(slotName);
  });
  STRUCTURE_SLOT_ORDER.forEach((slotName) => {
    if (!seen.has(slotName)) {
      pushError(errors, "noether_swarm.slot_missing", `Missing ${slotName} slot.`, node);
    }
  });
}

export function validateStructureTree(root) {
  const errors = [];
  const ids = new Set();
  walkStructure(root, (node) => {
    if (!node?.id) {
      pushError(errors, "node.id_missing", "Every structure node must have an id.", node);
    } else if (ids.has(node.id)) {
      pushError(errors, "node.id_duplicate", `Duplicate structure id ${node.id}.`, node);
    } else {
      ids.add(node.id);
    }
    if (!node?.kind) {
      pushError(errors, "node.kind_missing", "Every structure node must declare a kind.", node);
      return;
    }
    if (node.kind === STRUCTURE_KINDS.BINARY) {
      validateBinaryNode(node, errors);
      return;
    }
    if (node.kind === STRUCTURE_KINDS.PERSONALITY_DRESSED_BINARY) {
      validatePersonalityDressedBinaryNode(node, errors);
      return;
    }
    if (node.kind === STRUCTURE_KINDS.SLOT) {
      validateSlotNode(node, errors);
      return;
    }
    if (node.kind === STRUCTURE_KINDS.NOETHER_SWARM) {
      validateNoetherSwarmNode(node, errors);
    }
  });
  return {
    valid: errors.length === 0,
    errors,
  };
}

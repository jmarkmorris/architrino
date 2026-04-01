import {
  getNoetherCoreSlotBinaryPresence,
  getNoetherCoreSlotOccupancy,
} from "../domain/structure/StructureClassification.js";
import {
  getStructureNodeChildren,
  getStructureTrait,
  STRUCTURE_ARCHITRINO_ROLES,
  STRUCTURE_CHARGE_TYPES,
  STRUCTURE_KINDS,
  STRUCTURE_SLOT_ORDER,
} from "../domain/structure/StructureSchema.js";
import { findStructureNodeById, walkStructure } from "../domain/structure/StructureTraversal.js";

const reactionInventoryKeys = Object.freeze(["proCore", "antiCore", "electrino", "positrino"]);
const reactionLedgerKeys = Object.freeze(["electrino", "positrino"]);

function normalizeText(value = "") {
  return String(value ?? "").trim().toLowerCase();
}

function createEmptyInventory() {
  return {
    proCore: 0,
    antiCore: 0,
    electrino: 0,
    positrino: 0,
  };
}

function normalizeInventory(rawInventory = null) {
  const inventory = createEmptyInventory();
  if (!rawInventory || typeof rawInventory !== "object") {
    return inventory;
  }
  reactionInventoryKeys.forEach((key) => {
    const value = Number(rawInventory[key] ?? 0);
    inventory[key] = Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0;
  });
  return inventory;
}

function addInventories(leftInventory = null, rightInventory = null) {
  const sum = createEmptyInventory();
  const left = normalizeInventory(leftInventory);
  const right = normalizeInventory(rightInventory);
  reactionInventoryKeys.forEach((key) => {
    sum[key] = left[key] + right[key];
  });
  return sum;
}

function hasInventory(inventory = null) {
  const normalized = normalizeInventory(inventory);
  return reactionInventoryKeys.some((key) => normalized[key] > 0);
}

function ledgersEqual(leftInventory = null, rightInventory = null) {
  const left = normalizeInventory(leftInventory);
  const right = normalizeInventory(rightInventory);
  return reactionLedgerKeys.every((key) => left[key] === right[key]);
}

function formatLedger(inventory = null) {
  const normalized = normalizeInventory(inventory);
  const parts = reactionLedgerKeys
    .filter((key) => normalized[key])
    .map((key) => `${normalized[key]} ${key}`);
  return parts.join(" + ") || "empty ledger";
}

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
  const normalized = normalizeText(slotName);
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

function getSlotNameFromNode(node = null) {
  if (!node) {
    return "";
  }
  const directSlotCode = String(node.slotCode ?? "").trim().toUpperCase();
  if (directSlotCode === "I") {
    return "inner";
  }
  if (directSlotCode === "M") {
    return "middle";
  }
  if (directSlotCode === "O") {
    return "outer";
  }
  const nodeId = String(node.id ?? "").trim().toLowerCase();
  if (nodeId.endsWith("/inner")) {
    return "inner";
  }
  if (nodeId.endsWith("/middle")) {
    return "middle";
  }
  if (nodeId.endsWith("/outer")) {
    return "outer";
  }
  return "";
}

function createSyntheticBinarySelectorNode(groupNodeId = "", slotName = "") {
  return {
    id: `${String(groupNodeId ?? "").trim()}/${slotName}`,
    slotCode: getSlotCode(slotName),
    label: `${slotName} binary with personality`,
    renderMode: "binary-selector",
    children: [],
  };
}

function getNodeKeyKind(node = null, fallback = "") {
  const label = String(node?.label ?? "").trim();
  if (label) {
    return normalizeText(label).replace(/\s+/g, "_");
  }
  return normalizeText(fallback);
}

function getCanonicalStructureInventory(node = null) {
  if (!node) {
    return createEmptyInventory();
  }
  if (node.kind === STRUCTURE_KINDS.ARCHITRINO) {
    const charge = normalizeText(getStructureTrait(node, "charge", ""));
    return normalizeInventory({
      electrino: charge === STRUCTURE_CHARGE_TYPES.ELECTRINO ? 1 : 0,
      positrino: charge === STRUCTURE_CHARGE_TYPES.POSITRINO ? 1 : 0,
    });
  }
  const inventory = createEmptyInventory();
  if (node.kind === STRUCTURE_KINDS.NOETHER_CORE) {
    const polarity = normalizeText(getStructureTrait(node, "polarity", ""));
    inventory[polarity === "anti" ? "antiCore" : "proCore"] += 1;
  }
  return getStructureNodeChildren(node).reduce(
    (sum, childNode) => addInventories(sum, getCanonicalStructureInventory(childNode)),
    inventory
  );
}

function getCanonicalStructureProvenanceMode(node = null) {
  if (!node) {
    return "direct";
  }
  let guessed = false;
  walkStructure(node, (childNode) => {
    if (
      childNode?.kind === STRUCTURE_KINDS.ARCHITRINO &&
      normalizeText(getStructureTrait(childNode, "role", "")) ===
        STRUCTURE_ARCHITRINO_ROLES.PERSONALITY_CHARGE
    ) {
      guessed = true;
    }
  });
  return guessed ? "guessed" : "direct";
}

function classifyDirectStructureNode(participant = null, node = null, structureNode = null) {
  if (!structureNode) {
    return null;
  }
  const inventory = getCanonicalStructureInventory(structureNode);
  return {
    kind: getNodeKeyKind(node, structureNode?.kind ?? structureNode?.species ?? ""),
    label: String(node?.label ?? structureNode?.label ?? "").trim(),
    inventory,
    provenanceMode: getCanonicalStructureProvenanceMode(structureNode),
    hasInventory: hasInventory(inventory),
  };
}

function classifyBinarySelectorNode(participant = null, node = null, resolveBinaryChoiceInventory) {
  const inventory = normalizeInventory(resolveBinaryChoiceInventory?.(participant, node));
  return {
    kind: getNodeKeyKind(node, "binary_selector"),
    label: String(node?.label ?? "").trim(),
    inventory,
    provenanceMode: "guessed",
    hasInventory: hasInventory(inventory),
  };
}

function classifyBareBinaryNode(node = null) {
  const inventory = normalizeInventory({
    electrino: 1,
    positrino: 1,
  });
  return {
    kind: getNodeKeyKind(node, "binary"),
    label: String(node?.label ?? "").trim(),
    inventory,
    provenanceMode: "direct",
    hasInventory: true,
  };
}

function classifyBinarySelectorGroupNode(
  participant = null,
  node = null,
  structureNode = null,
  resolveBinaryChoiceInventory
) {
  const primaryCore = getPrimaryNoetherCore(structureNode);
  const occupancy = getNoetherCoreSlotOccupancy(primaryCore);
  const binaryPresence = getNoetherCoreSlotBinaryPresence(primaryCore);
  const corePolarity = normalizeText(getStructureTrait(primaryCore, "polarity", ""));
  const inventory = STRUCTURE_SLOT_ORDER.reduce((sum, slotName) => {
    if (!occupancy[slotName]) {
      return sum;
    }
    return addInventories(
      sum,
      resolveBinaryChoiceInventory?.(
        participant,
        createSyntheticBinarySelectorNode(node?.id, slotName)
      )
    );
  }, createEmptyInventory());
  return {
    kind: getNodeKeyKind(node, structureNode?.species ?? "binary_selector_group"),
    label: String(node?.label ?? structureNode?.label ?? "").trim(),
    inventory,
    provenanceMode: "guessed",
    hasInventory: hasInventory(inventory),
    corePolarity,
    binarySlotCount: STRUCTURE_SLOT_ORDER.filter((slotName) => binaryPresence[slotName]).length,
  };
}

function classifyNoetherCoreGridNode(node = null, structureNode = null) {
  const occupancy = getNoetherCoreSlotOccupancy(structureNode);
  const binaryPresence = getNoetherCoreSlotBinaryPresence(structureNode);
  const inventory = createEmptyInventory();
  const corePolarity = normalizeText(getStructureTrait(structureNode, "polarity", ""));
  inventory[corePolarity === "anti" ? "antiCore" : "proCore"] += 1;
  STRUCTURE_SLOT_ORDER.forEach((slotName) => {
    if (!occupancy[slotName]) {
      return;
    }
    inventory.electrino += 1;
    inventory.positrino += 1;
  });
  return {
    kind: getNodeKeyKind(node, "noether_core"),
    label: String(node?.label ?? structureNode?.label ?? "").trim(),
    inventory,
    provenanceMode: "direct",
    hasInventory: hasInventory(inventory),
    corePolarity,
    binarySlotCount: STRUCTURE_SLOT_ORDER.filter((slotName) => binaryPresence[slotName]).length,
  };
}

function isFullTriBinaryCoreSpec(spec = null) {
  return (
    Number(spec?.binarySlotCount ?? 0) === 3 &&
    spec?.provenanceMode === "direct"
  );
}

function classifyAggregateHierarchyNode(participant = null, node = null, options = {}) {
  const childSpecs = (Array.isArray(node?.children) ? node.children : [])
    .map((childNode) => classifyComposerReactionNode(participant, childNode, options))
    .filter(Boolean);
  const inventory = childSpecs.reduce(
    (sum, childSpec) => addInventories(sum, childSpec.inventory),
    createEmptyInventory()
  );
  return {
    kind: getNodeKeyKind(node, "aggregate"),
    label: String(node?.label ?? "").trim(),
    inventory,
    provenanceMode: childSpecs.some((childSpec) => childSpec.provenanceMode === "guessed")
      ? "guessed"
      : "direct",
    hasInventory: hasInventory(inventory),
  };
}

export function classifyComposerReactionNode(participant = null, node = null, options = {}) {
  const resolveBinaryChoiceInventory =
    typeof options.resolveBinaryChoiceInventory === "function"
      ? options.resolveBinaryChoiceInventory
      : () => null;
  const fallbackClassify =
    typeof options.fallbackClassify === "function" ? options.fallbackClassify : null;
  const structureRoot = participant?.structure ?? null;
  const renderMode = normalizeText(node?.renderMode);
  const structureNode =
    structureRoot && node?.id ? findStructureNodeById(structureRoot, node.id) : null;

  if (renderMode === "binary-selector") {
    return classifyBinarySelectorNode(participant, node, resolveBinaryChoiceInventory);
  }
  if (renderMode === "binary-bare") {
    return classifyBareBinaryNode(node);
  }
  if (
    renderMode === "binary-selector-grid" &&
    normalizeText(node?.templateId) === "free_architrinos"
  ) {
    return classifyAggregateHierarchyNode(participant, node, options);
  }
  if (renderMode === "binary-selector-grid" && structureNode) {
    return classifyBinarySelectorGroupNode(
      participant,
      node,
      structureNode,
      resolveBinaryChoiceInventory
    );
  }
  if (renderMode === "noether-core-grid" && structureNode) {
    return classifyNoetherCoreGridNode(node, structureNode);
  }
  if (renderMode === "assembly-cluster-grid" || renderMode === "higgs-cluster-grid") {
    return classifyAggregateHierarchyNode(participant, node, options);
  }
  if (structureNode) {
    return classifyDirectStructureNode(participant, node, structureNode);
  }
  return fallbackClassify ? fallbackClassify(participant, node) : null;
}

export function evaluateComposerReactionMappingCandidate({
  sourceParticipant = null,
  sourceNode = null,
  targetParticipant = null,
  targetNode = null,
  resolveBinaryChoiceInventory = null,
  fallbackClassify = null,
} = {}) {
  const sourceSpec = classifyComposerReactionNode(sourceParticipant, sourceNode, {
    resolveBinaryChoiceInventory,
    fallbackClassify,
  });
  const targetSpec = classifyComposerReactionNode(targetParticipant, targetNode, {
    resolveBinaryChoiceInventory,
    fallbackClassify,
  });

  if (!sourceSpec || !targetSpec || !sourceSpec.hasInventory || !targetSpec.hasInventory) {
    return {
      allowed: false,
      reason: "Unknown provenance inventory.",
      sourceSpec,
      targetSpec,
    };
  }

  if (!ledgersEqual(sourceSpec.inventory, targetSpec.inventory)) {
    return {
      allowed: false,
      reason: `Not conservative: ${formatLedger(sourceSpec.inventory)} cannot map to ${formatLedger(
        targetSpec.inventory
      )}.`,
      sourceSpec,
      targetSpec,
    };
  }

  if (
    isFullTriBinaryCoreSpec(sourceSpec) &&
    isFullTriBinaryCoreSpec(targetSpec) &&
    sourceSpec.corePolarity &&
    targetSpec.corePolarity &&
    sourceSpec.corePolarity !== targetSpec.corePolarity
  ) {
    return {
      allowed: false,
      reason: "Full tri-binary pro and anti Noether cores cannot map directly to each other.",
      sourceSpec,
      targetSpec,
    };
  }

  const provenanceMode =
    sourceSpec.provenanceMode === "guessed" || targetSpec.provenanceMode === "guessed"
      ? "guessed"
      : "direct";

  return {
    allowed: true,
    reason:
      provenanceMode === "guessed"
        ? `Conservative with guessed provenance: ${formatLedger(sourceSpec.inventory)}.`
        : `Conservative with direct provenance: ${formatLedger(sourceSpec.inventory)}.`,
    sourceSpec,
    targetSpec,
    provenanceMode,
  };
}

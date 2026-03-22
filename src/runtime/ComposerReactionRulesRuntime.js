export const composerReactionRuleRegistry = Object.freeze([
  {
    id: "inventory-conservation",
    category: "core",
    description:
      "Mappings must conserve pro-core and anti-core polarity counts together with exact electrino and positrino counts for the mapped unit.",
  },
  {
    id: "provenance-required",
    category: "core",
    description:
      "Every allowed mapping must carry provenance, even when some leaf-level architrino provenance is currently guessed.",
  },
  {
    id: "prevent-invalid-product-targets",
    category: "ui",
    description:
      "When a reactant source is selected, product targets that do not conserve inventory should gray out and deactivate.",
  },
]);

const reactionInventoryKeys = Object.freeze(["proCore", "antiCore", "electrino", "positrino"]);

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

function getNodeInventory(node = null) {
  const baseInventory = normalizeInventory(node?.inventory);
  const children = Array.isArray(node?.children) ? node.children : [];
  return children.reduce((inventory, child) => addInventories(inventory, getNodeInventory(child)), baseInventory);
}

function hasInventory(inventory = null) {
  const normalized = normalizeInventory(inventory);
  return reactionInventoryKeys.some((key) => normalized[key] > 0);
}

function getNodeProvenanceMode(node = null) {
  const localMode = normalizeText(node?.provenanceMode);
  if (localMode === "guessed") {
    return "guessed";
  }
  const children = Array.isArray(node?.children) ? node.children : [];
  return children.some((child) => getNodeProvenanceMode(child) === "guessed") ? "guessed" : "direct";
}

function inventoriesEqual(leftInventory = null, rightInventory = null) {
  const left = normalizeInventory(leftInventory);
  const right = normalizeInventory(rightInventory);
  return reactionInventoryKeys.every((key) => left[key] === right[key]);
}

function formatInventory(inventory = null) {
  const normalized = normalizeInventory(inventory);
  const parts = [];
  if (normalized.proCore) {
    parts.push(`${normalized.proCore} pro`);
  }
  if (normalized.antiCore) {
    parts.push(`${normalized.antiCore} anti`);
  }
  if (normalized.electrino) {
    parts.push(`${normalized.electrino} electrino`);
  }
  if (normalized.positrino) {
    parts.push(`${normalized.positrino} positrino`);
  }
  return parts.join(" + ") || "empty inventory";
}

export function classifyComposerReactionNode(participant = null, node = null) {
  const templateId = normalizeText(participant?.templateId);
  const nodeId = String(node?.id ?? "").trim();
  const label = String(node?.label ?? "").trim();
  if (!templateId || !nodeId || !label) {
    return null;
  }
  const inventory = getNodeInventory(node);
  return {
    kind: normalizeText(label).replace(/\s+/g, "_"),
    label,
    inventory,
    provenanceMode: getNodeProvenanceMode(node),
    hasInventory: hasInventory(inventory),
  };
}

export function evaluateComposerReactionMappingCandidate({
  sourceParticipant = null,
  sourceNode = null,
  targetParticipant = null,
  targetNode = null,
} = {}) {
  const sourceSpec = classifyComposerReactionNode(sourceParticipant, sourceNode);
  const targetSpec = classifyComposerReactionNode(targetParticipant, targetNode);

  if (!sourceSpec || !targetSpec || !sourceSpec.hasInventory || !targetSpec.hasInventory) {
    return {
      allowed: false,
      reason: "Unknown provenance inventory.",
      sourceSpec,
      targetSpec,
    };
  }

  if (!inventoriesEqual(sourceSpec.inventory, targetSpec.inventory)) {
    return {
      allowed: false,
      reason: `Not conservative: ${formatInventory(sourceSpec.inventory)} cannot map to ${formatInventory(
        targetSpec.inventory
      )}.`,
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
        ? `Conservative with guessed provenance: ${formatInventory(sourceSpec.inventory)}.`
        : `Conservative with direct provenance: ${formatInventory(sourceSpec.inventory)}.`,
    sourceSpec,
    targetSpec,
    provenanceMode,
  };
}

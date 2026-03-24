export const STRUCTURE_KINDS = Object.freeze({
  PARTICLE: "particle",
  COMPOSITE: "composite",
  NOETHER_CORE: "noether_core",
  SLOT: "slot",
  PERSONALITY_DRESSED_BINARY: "personality_dressed_binary",
  BINARY: "binary",
  ARCHITRINO: "architrino",
});

export const STRUCTURE_SLOT_NAMES = Object.freeze({
  INNER: "inner",
  MIDDLE: "middle",
  OUTER: "outer",
});

export const STRUCTURE_SLOT_ORDER = Object.freeze([
  STRUCTURE_SLOT_NAMES.INNER,
  STRUCTURE_SLOT_NAMES.MIDDLE,
  STRUCTURE_SLOT_NAMES.OUTER,
]);

export const STRUCTURE_CHARGE_TYPES = Object.freeze({
  ELECTRINO: "electrino",
  POSITRINO: "positrino",
});

export const STRUCTURE_ARCHITRINO_ROLES = Object.freeze({
  BINARY_MEMBER: "binary_member",
  PERSONALITY_CHARGE: "personality_charge",
});

export const STRUCTURE_CLASSIFICATION_FAMILIES = Object.freeze({
  CHARGED_LEPTON: "charged_lepton",
  NEUTRINO: "neutrino",
  UP_TYPE_QUARK: "up_type_quark",
  DOWN_TYPE_QUARK: "down_type_quark",
  BARYON: "baryon",
  MESON: "meson",
  BOSON: "boson",
  EXOTIC: "exotic",
});

function cloneChildren(children = []) {
  return Array.isArray(children) ? children.map((child) => createStructureNode(child)) : [];
}

function cloneObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? { ...value } : undefined;
}

export function createStructureNode(rawNode = {}) {
  const kind = String(rawNode.kind ?? "").trim();
  return {
    id: String(rawNode.id ?? "").trim(),
    kind,
    species: rawNode.species == null ? undefined : String(rawNode.species).trim() || undefined,
    label: rawNode.label == null ? undefined : String(rawNode.label).trim() || undefined,
    children: cloneChildren(rawNode.children),
    transform: cloneObject(rawNode.transform),
    traits: cloneObject(rawNode.traits),
    classification: cloneObject(rawNode.classification),
    authoring: cloneObject(rawNode.authoring),
  };
}

export function cloneStructureNode(node = null) {
  return node ? createStructureNode(node) : null;
}

export function isStructureKind(value, expectedKind) {
  return String(value ?? "").trim() === String(expectedKind ?? "").trim();
}

export function getStructureNodeChildren(node = null) {
  return Array.isArray(node?.children) ? node.children : [];
}

export function getStructureTrait(node = null, key = "", fallback = undefined) {
  if (!node?.traits || typeof node.traits !== "object") {
    return fallback;
  }
  return node.traits[key] ?? fallback;
}

export function isExoticStructureNode(node = null) {
  return node?.classification?.family === STRUCTURE_CLASSIFICATION_FAMILIES.EXOTIC ||
    getStructureTrait(node, "variant") === "exotic" ||
    getStructureTrait(node, "allowNonCanonicalChildren") === true;
}

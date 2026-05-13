const ELEMENT_SCENE_PATH_PREFIX = "content/scenes/elements/";
const PERIODIC_SCENE_PATH_SUFFIX = "/periodic_table_scene.json";
const HYDE_PERIODIC_SCENE_PATH_SUFFIX = "/hyde_periodic_table_scene.json";
const ATOM_SCENE_PATH_SUFFIX = "/nuclear/atom.json";
const STANDARD_MODEL_SCENE_PATH_SUFFIX = "/standard_model.json";

const STRUCTURED_PALETTE_EXCLUDED_SCENE_PATHS = new Set([
  "content/scenes/archie/archie.json",
  "content/scenes/architrino-theory/electrino.json",
  "content/scenes/architrino-theory/positrino.json",
  "content/scenes/standard-model-particles/higgs_boson.json",
  "content/scenes/nuclear/proton.json",
  "content/scenes/nuclear/neutron.json",
  "content/scenes/chemistry/periodic_table_scene.json",
]);

const STRUCTURED_PALETTE_EXCLUDED_SCENE_IDS = new Set([
  "electrino",
  "positrino",
  "higgs_boson",
  "proton",
  "neutron",
]);

const ATOMIC_PARTICLE_CATEGORIES = new Set(["proton", "neutron", "electron"]);
const ATOMIC_PARTICLE_LABELS = new Set(["p", "n", "e"]);

function normalizeSceneToken(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function getSceneDescriptor(source, overrides = {}) {
  const sourceObject = source && typeof source === "object" ? source : null;
  const overrideObject = overrides && typeof overrides === "object" ? overrides : null;
  return {
    sceneId: normalizeSceneToken(
      overrideObject?.sceneId ?? sourceObject?.sceneId ?? sourceObject?.scene?.id
    ),
    scenePath: normalizeSceneToken(
      overrideObject?.scenePath ??
        sourceObject?.scenePath ??
        sourceObject?.id ??
        sourceObject?.scene?.path
    ),
  };
}

export function isElementScene(source, overrides = {}) {
  const { scenePath } = getSceneDescriptor(source, overrides);
  return scenePath.startsWith(ELEMENT_SCENE_PATH_PREFIX);
}

export function extractElementSymbolFromScene(
  source,
  { scenePathPattern } = {}
) {
  if (!isElementScene(source)) {
    return null;
  }
  const { sceneId, scenePath } = getSceneDescriptor(source);
  if (sceneId) {
    return sceneId;
  }
  if (scenePathPattern instanceof RegExp) {
    const match = scenePath.match(scenePathPattern);
    if (match?.[1]) {
      return normalizeSceneToken(match[1]);
    }
  }
  const filename = scenePath.split("/").pop() ?? "";
  return normalizeSceneToken(filename.replace(/\.json$/i, ""));
}

export function isPeriodicTableScene(source, { periodicSceneId = "periodic_table" } = {}) {
  const { sceneId, scenePath } = getSceneDescriptor(source);
  return sceneId === normalizeSceneToken(periodicSceneId) || scenePath.endsWith(PERIODIC_SCENE_PATH_SUFFIX);
}

export function isHydePeriodicTableScene(
  source,
  { hydePeriodicSceneId = "hyde_periodic_table" } = {}
) {
  const { sceneId, scenePath } = getSceneDescriptor(source);
  return (
    sceneId === normalizeSceneToken(hydePeriodicSceneId) ||
    scenePath.endsWith(HYDE_PERIODIC_SCENE_PATH_SUFFIX)
  );
}

export function isAtomScene(source) {
  const { sceneId, scenePath } = getSceneDescriptor(source);
  return sceneId === "atom" || scenePath.endsWith(ATOM_SCENE_PATH_SUFFIX);
}

export function isAtomContextScene(source) {
  return isElementScene(source) || isAtomScene(source);
}

export function isStandardModelScene(source) {
  const { sceneId, scenePath } = getSceneDescriptor(source);
  return sceneId === "standard_model" || scenePath.endsWith(STANDARD_MODEL_SCENE_PATH_SUFFIX);
}

export function isAtomicParticleFocusTarget(node) {
  if (!node?.data) {
    return false;
  }
  const category = normalizeSceneToken(node.data.category);
  const label = normalizeSceneToken(node.data.label);
  return ATOMIC_PARTICLE_CATEGORIES.has(category) || ATOMIC_PARTICLE_LABELS.has(label);
}

export function shouldExcludeStructuredSpherePalette(source, overrides = {}) {
  const { sceneId, scenePath } = getSceneDescriptor(source, overrides);
  return (
    scenePath.startsWith("runtime:markdown:") ||
    STRUCTURED_PALETTE_EXCLUDED_SCENE_PATHS.has(scenePath) ||
    isElementScene({ id: scenePath }) ||
    STRUCTURED_PALETTE_EXCLUDED_SCENE_IDS.has(sceneId)
  );
}

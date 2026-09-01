import { createHash } from "node:crypto";

export const ASSEMBLY_SCIENTIFIC_IDENTITY_SCHEMA = "assembly-scientific-identity.v1";

const PRESENTATION_KEYS = new Set([
  "alias",
  "aliases",
  "candidateId",
  "canonSource",
  "date",
  "description",
  "display",
  "displayLabel",
  "familyId",
  "familyLabel",
  "geometryOwner",
  "label",
  "memberId",
  "memberLabel",
  "provenanceDescription",
  "recordUrl",
  "status",
  "taxonomy",
  "title",
]);

const RELATIONSHIP_COLLECTIONS = Object.freeze([
  "neutralPairs",
  "pairings",
  "componentBraids",
  "polaritySectors",
  "symmetryOrbits",
  "accessorySets",
  "equivalences",
  "permutations",
]);

export function canonicalAssemblyScientificModel(rawSpec) {
  if (!rawSpec || typeof rawSpec !== "object" || Array.isArray(rawSpec)) {
    throw new TypeError("assembly scientific identity requires one prescribed assembly specification.");
  }
  const sourceOrder = rawSpec.relationships?.sourceOrder;
  if (!Array.isArray(sourceOrder) || sourceOrder.length === 0) {
    throw new TypeError("assembly scientific identity requires a nonempty persistent source order.");
  }

  const tokens = collectIdentifierTokens(rawSpec, sourceOrder);
  const constituentById = new Map((rawSpec.constituents ?? []).map((row) => [row.id, row]));
  const worldlineById = new Map((rawSpec.worldlines ?? []).map((row) => [row.id, row]));
  const members = sourceOrder.map((constituentId) => {
    const constituent = constituentById.get(constituentId);
    const worldline = worldlineById.get(constituent?.worldlineId);
    if (!constituent || !worldline) {
      throw new TypeError(`assembly scientific identity cannot resolve persistent member ${String(constituentId)}.`);
    }
    return {
      polarity: constituent.polarity,
      role: constituent.role,
      constituent: normalizeScientificValue(constituent, tokens),
      worldline: normalizeScientificValue(worldline, tokens),
    };
  });

  const relationships = {};
  for (const collection of RELATIONSHIP_COLLECTIONS) {
    if (rawSpec.relationships?.[collection] != null) {
      relationships[collection] = normalizeScientificValue(rawSpec.relationships[collection], tokens);
    }
  }

  return sortObjectDeep({
    schema: ASSEMBLY_SCIENTIFIC_IDENTITY_SCHEMA,
    sourceSchema: rawSpec.schema,
    sourceLawVersion: "prescribed-assembly-evaluator.v2",
    normalizedFieldSpeed: 1,
    members,
    relationships,
    geometry: normalizeScientificValue(rawSpec.geometry, tokens),
    history: normalizeScientificValue(rawSpec.history, tokens),
    motionPolicy: normalizeScientificValue(rawSpec.constraints?.speedGuard, tokens),
  });
}

export function serializeCanonicalAssemblyScientificModel(rawSpec) {
  return JSON.stringify(canonicalAssemblyScientificModel(rawSpec));
}

export function deriveAssemblyScientificIdentity(rawSpec) {
  const canonicalModel = serializeCanonicalAssemblyScientificModel(rawSpec);
  const modelRevisionSha256 = createHash("sha256").update(canonicalModel).digest("hex");
  return Object.freeze({
    assemblyId: `asm-${modelRevisionSha256.slice(0, 32)}`,
    modelRevisionSha256,
    canonicalModel,
  });
}

function collectIdentifierTokens(rawSpec, sourceOrder) {
  const tokens = new Map();
  sourceOrder.forEach((id, index) => tokens.set(id, `member-${index}`));
  const orderedWorldlines = sourceOrder.map((constituentId) =>
    (rawSpec.constituents ?? []).find((row) => row.id === constituentId)?.worldlineId);
  orderedWorldlines.forEach((id, index) => {
    if (typeof id === "string") tokens.set(id, `worldline-${index}`);
  });
  for (const collection of RELATIONSHIP_COLLECTIONS) {
    (rawSpec.relationships?.[collection] ?? []).forEach((row, index) => {
      if (typeof row?.id === "string") tokens.set(row.id, `${collection}-${index}`);
    });
  }
  collectAdditionalIdentifiers(rawSpec.geometry, tokens, "geometry");
  return tokens;
}

function collectAdditionalIdentifiers(value, tokens, prefix) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => collectAdditionalIdentifiers(entry, tokens, `${prefix}-${index}`));
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, entry] of Object.entries(value)) {
    if (typeof entry === "string" && (key === "id" || key.endsWith("Id")) && !tokens.has(entry)) {
      tokens.set(entry, `${prefix}-${key}`);
    }
    collectAdditionalIdentifiers(entry, tokens, `${prefix}-${key}`);
  }
}

function normalizeScientificValue(value, tokens) {
  if (Array.isArray(value)) return value.map((entry) => normalizeScientificValue(entry, tokens));
  if (!value || typeof value !== "object") {
    return typeof value === "string" && tokens.has(value) ? tokens.get(value) : value;
  }
  const result = {};
  for (const [key, entry] of Object.entries(value)) {
    if (PRESENTATION_KEYS.has(key) || key === "compatibility" || entry === undefined) continue;
    result[key] = normalizeScientificValue(entry, tokens);
  }
  return sortObjectDeep(result);
}

function sortObjectDeep(value) {
  if (Array.isArray(value)) return value.map(sortObjectDeep);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.keys(value).sort().map((key) => [key, sortObjectDeep(value[key])]));
}

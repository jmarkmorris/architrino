import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import {
  canonicalAssemblyScientificModel,
  deriveAssemblyScientificIdentity,
  serializeCanonicalAssemblyScientificModel,
} from "../src/prescribed-geometry/AssemblyScientificIdentity.mjs";
import { generatePrescribedBraidRecord } from "../scripts/eom/generate-prescribed-braid-record.mjs";

const sourceUrl = new URL(
  "../reference/priorities/braid-program/configurations/equal-radius-planar-three-binary-balance-beta-2p974307176117293.v3.json",
  import.meta.url,
);

const paritySourceUrls = [
  sourceUrl,
  new URL("../reference/priorities/braid-program/configurations/co-spherical-two-planar-braid-co-rotating.v3.json", import.meta.url),
  new URL("../reference/priorities/braid-program/configurations/centered-five-coordinate-linear-history.v3.json", import.meta.url),
  new URL("../reference/priorities/braid-program/configurations/phase-varying-prescribed-display-history.v3.json", import.meta.url),
];

async function sourceSpec() {
  return JSON.parse(await readFile(sourceUrl, "utf8"));
}

test("canonical scientific identity ignores presentation and internal identifier spelling", async () => {
  const source = await sourceSpec();
  const renamed = structuredClone(source);
  renamed.specId = "current-factual-source";
  renamed.label = "Current factual label";
  renamed.provenanceDescription = "Current factual description.";
  renamed.date = "2099-01-01";
  Object.assign(renamed.identity, {
    candidateId: "current-factual-candidate",
    displayLabel: "Current factual display label",
    geometryOwner: "current/factual/owner.md",
    status: "current",
  });
  renamed.identity.presentationNote = "Current presentation-only note";

  const memberRename = new Map(renamed.relationships.sourceOrder.map((id, index) => [id, `member-current-${index}`]));
  const worldlineRename = new Map(renamed.worldlines.map((row, index) => [row.id, `worldline-current-${index}`]));
  renamed.constituents.forEach((row) => {
    row.id = memberRename.get(row.id);
    row.worldlineId = worldlineRename.get(row.worldlineId);
  });
  renamed.worldlines.forEach((row) => {
    row.id = worldlineRename.get(row.id);
    row.constituentId = memberRename.get(row.constituentId);
  });
  renamed.relationships.sourceOrder = renamed.relationships.sourceOrder.map((id) => memberRename.get(id));
  const relationshipRenames = new Map();
  for (const collection of ["neutralPairs", "componentBraids", "polaritySectors", "symmetryOrbits"]) {
    (renamed.relationships[collection] ?? []).forEach((row, index) => {
      const replacementId = `${collection}-current-${index}`;
      relationshipRenames.set(row.id, replacementId);
      row.id = replacementId;
      row.members = row.members.map((id) => memberRename.get(id));
    });
  }
  (renamed.relationships.neutralPairs ?? []).forEach((row) => {
    if (row.componentBraidId) row.componentBraidId = relationshipRenames.get(row.componentBraidId);
  });

  assert.deepEqual(canonicalAssemblyScientificModel(renamed), canonicalAssemblyScientificModel(source));
  assert.equal(serializeCanonicalAssemblyScientificModel(renamed), serializeCanonicalAssemblyScientificModel(source));
  assert.deepEqual(deriveAssemblyScientificIdentity(renamed), deriveAssemblyScientificIdentity(source));
});

test("independent canonical projection agrees for planar, spatial, nonperiodic, and phase-varying sources", async () => {
  for (const url of paritySourceUrls) {
    const source = JSON.parse(await readFile(url, "utf8"));
    const referenceCanonical = JSON.stringify(referenceCanonicalScientificModel(source));
    const referenceHash = createHash("sha256").update(referenceCanonical).digest("hex");
    assert.equal(serializeCanonicalAssemblyScientificModel(source), referenceCanonical, url.pathname);
    assert.deepEqual(deriveAssemblyScientificIdentity(source), {
      assemblyId: `asm-${referenceHash.slice(0, 32)}`,
      modelRevisionSha256: referenceHash,
      canonicalModel: referenceCanonical,
    }, url.pathname);
  }
});

test("nested ownership and provenance changes remain presentation-only", async () => {
  const source = await sourceSpec();
  const changed = structuredClone(source);
  changed.worldlines[0].operator.owner = "renamed/current-owner.md";
  changed.worldlines[0].operator.provenanceDescription = "Current presentation-only source note.";
  changed.geometry.owner = "renamed/current-geometry-owner.md";
  changed.relationships.neutralPairs[0].owner = "renamed/current-pair-owner.md";
  assert.deepEqual(deriveAssemblyScientificIdentity(changed), deriveAssemblyScientificIdentity(source));
});

test("every identity-bearing scientific mutation changes both exact identifiers", async () => {
  const source = await sourceSpec();
  const baseline = deriveAssemblyScientificIdentity(source);
  const mutations = [
    (spec) => { spec.constituents[0].polarity *= -1; },
    (spec) => { spec.relationships.sourceOrder.reverse(); },
    (spec) => { spec.worldlines[0].operator.radiusU[0] += 0.001; },
    (spec) => { spec.worldlines[0].operator.phaseAtEpoch += 0.001; },
    (spec) => { spec.history.end += spec.history.returnPeriod; },
    (spec) => { spec.constraints.speedGuard.policy = "reject"; },
  ];
  for (const mutate of mutations) {
    const changed = structuredClone(source);
    mutate(changed);
    const identity = deriveAssemblyScientificIdentity(changed);
    assert.notEqual(identity.assemblyId, baseline.assemblyId);
    assert.notEqual(identity.modelRevisionSha256, baseline.modelRevisionSha256);
  }
});

test("emitted records carry the exact scientific identity", async () => {
  const source = await sourceSpec();
  const identity = deriveAssemblyScientificIdentity(source);
  const record = generatePrescribedBraidRecord(source, { generatingSpec: "fixture.json" });
  assert.equal(record.assemblyId, identity.assemblyId);
  assert.equal(record.modelRevisionSha256, identity.modelRevisionSha256);
  assert.match(record.assemblyId, /^asm-[a-f0-9]{32}$/);
  assert.match(record.modelRevisionSha256, /^[a-f0-9]{64}$/);
});

function referenceCanonicalScientificModel(spec) {
  const sourceOrder = spec.relationships.sourceOrder;
  const constituentIndex = new Map(sourceOrder.map((id, index) => [id, `member-${index}`]));
  const worldlineIndex = new Map(sourceOrder.map((id, index) => {
    const constituent = spec.constituents.find((row) => row.id === id);
    return [constituent.worldlineId, `worldline-${index}`];
  }));
  const relationshipIndex = new Map();
  const relationshipCollections = [
    "neutralPairs", "pairings", "componentBraids", "polaritySectors",
    "symmetryOrbits", "accessorySets", "equivalences", "permutations",
  ];
  for (const collection of relationshipCollections) {
    (spec.relationships[collection] ?? []).forEach((row, index) => {
      if (typeof row.id === "string") relationshipIndex.set(row.id, `${collection}-${index}`);
    });
  }
  const identifiers = new Map([...constituentIndex, ...worldlineIndex, ...relationshipIndex]);
  referenceCollectGeometryIdentifiers(spec.geometry, identifiers, "geometry");
  const normalize = (value) => referenceNormalizeScientificValue(value, identifiers);
  const constituentById = new Map(spec.constituents.map((row) => [row.id, row]));
  const worldlineById = new Map(spec.worldlines.map((row) => [row.id, row]));
  const relationships = {};
  for (const collection of relationshipCollections) {
    if (spec.relationships[collection] != null) relationships[collection] = normalize(spec.relationships[collection]);
  }
  return referenceSortDeep({
    schema: "assembly-scientific-identity.v1",
    sourceLawVersion: "prescribed-assembly-evaluator.v2",
    normalizedFieldSpeed: 1,
    members: sourceOrder.map((id) => {
      const constituent = constituentById.get(id);
      return {
        polarity: constituent.polarity,
        role: constituent.role,
        constituent: normalize(constituent),
        worldline: normalize(worldlineById.get(constituent.worldlineId)),
      };
    }),
    relationships,
    geometry: normalize(spec.geometry),
    history: normalize(spec.history),
    motionPolicy: normalize({
      policy: spec.constraints?.speedGuard?.policy,
      maxAllowedSpeed: spec.constraints?.speedGuard?.maxAllowedSpeed,
    }),
  });
}

const REFERENCE_PRESENTATION_KEYS = new Set([
  "candidateId", "date", "description", "display", "displayLabel", "geometryOwner", "label",
  "owner", "presentationNote", "provenanceDescription", "recordUrl", "status", "title",
]);

function referenceCollectGeometryIdentifiers(value, identifiers, prefix) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => referenceCollectGeometryIdentifiers(entry, identifiers, `${prefix}-${index}`));
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, entry] of Object.entries(value)) {
    if (typeof entry === "string" && (key === "id" || key.endsWith("Id")) && !identifiers.has(entry)) {
      identifiers.set(entry, `${prefix}-${key}`);
    }
    referenceCollectGeometryIdentifiers(entry, identifiers, `${prefix}-${key}`);
  }
}

function referenceNormalizeScientificValue(value, identifiers) {
  if (Array.isArray(value)) return value.map((entry) => referenceNormalizeScientificValue(entry, identifiers));
  if (!value || typeof value !== "object") {
    return typeof value === "string" && identifiers.has(value) ? identifiers.get(value) : value;
  }
  const result = {};
  for (const [key, entry] of Object.entries(value)) {
    if (REFERENCE_PRESENTATION_KEYS.has(key) || entry === undefined) continue;
    result[identifiers.get(key) ?? key] = referenceNormalizeScientificValue(entry, identifiers);
  }
  return referenceSortDeep(result);
}

function referenceSortDeep(value) {
  if (Array.isArray(value)) return value.map(referenceSortDeep);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.keys(value).sort().map((key) => [key, referenceSortDeep(value[key])]));
}

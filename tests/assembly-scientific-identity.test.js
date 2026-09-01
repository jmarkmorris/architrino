import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import {
  canonicalAssemblyScientificModel,
  deriveAssemblyScientificIdentity,
  serializeCanonicalAssemblyScientificModel,
} from "../src/prescribed-geometry/AssemblyScientificIdentity.mjs";
import { generatePrescribedBraidRecord } from "../scripts/eom/generate-prescribed-braid-record.mjs";

const sourceUrl = new URL(
  "../reference/priorities/braid-program/configurations/shared-circle-03-alternating.v2.json",
  import.meta.url,
);

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
  renamed.identity.taxonomy = {
    familyId: "current",
    familyLabel: "Current",
    memberId: "current",
    memberLabel: "Current",
    displayLabel: "Current",
    canonSource: "current/factual/owner.md",
  };
  renamed.compatibility = { retainedIdentifiers: [{ kind: "obsolete", value: "old", reason: "test" }] };

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

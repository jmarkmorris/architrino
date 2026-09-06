import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createBorgAssemblyRegistryDatabase } from "../src/apps/borg/registry/BorgAssemblyRegistryDatabase.mjs";
import { compareBorgIdentity, validateBorgAssemblyRegistry } from "../src/apps/borg/registry/BorgAssemblyRegistryContract.mjs";
import { createSpherePreview } from "../src/apps/borg/library/BorgSpherePreview.js";

const registryUrl = new URL("../reference/priorities/app-borg/contracts/assembly-registry.v1.json", import.meta.url);
const loadRegistry = async () => validateBorgAssemblyRegistry(JSON.parse(await readFile(registryUrl)));

test("registry migration has complete exact, braid, taxonomy, facet, and visual coverage", async () => {
  const registry = await loadRegistry();
  assert.equal(registry.entries.length, 145);
  assert.equal(registry.braids.length, 46);
  assert.equal(registry.coverage.missingVisualRepresentatives, 0);
  assert.equal(registry.coverage.silentlySubstitutedRows, 0);
  assert.equal(registry.coverage.deterministicPosters, 145);
  assert.equal(registry.taxonomy.memberships.length, 46);
  assert.deepEqual(registry.facetDescriptor.facets.map((row) => row.key), [
    "assemblySpan", "braidCount", "braidDimension", "count", "radii", "circleOccupancy", "breathing", "speedPolicy", "platonicRelationship",
  ]);
  assert.equal(registry.entries.filter((row) => row.facets.platonicRelationship.includes("exact-vertex-set")).length, 6);
  assert.equal(registry.entries.filter((row) => row.facets.platonicRelationship.includes("unavailable")).length, 139);
  assert.ok(registry.entries.every((row) => row.occurrence.state === "unavailable" && row.visualCoverage.animationMode));
});

test("preview contract carries component braid identity and exposes isolation without changing record identity", async () => {
  const [descriptorSource, previewSource, pageSource] = await Promise.all([
    readFile(new URL("../src/apps/borg/library/BorgLibraryDescriptors.mjs", import.meta.url), "utf8"),
    readFile(new URL("../src/apps/borg/library/BorgSpherePreview.js", import.meta.url), "utf8"),
    readFile(new URL("../borg-library.html", import.meta.url), "utf8"),
  ]);
  assert.match(descriptorSource, /componentBraidId/);
  assert.match(previewSource, /setComponentBraid/);
  assert.match(previewSource, /path\.componentBraidId !== activeComponentBraidId/);
  assert.match(pageSource, /id="component-isolation"/);
  assert.equal(typeof createSpherePreview, "function");
});

test("typed sameness relations never substitute record, braid, lineage, causal-state, morphology, or taxonomy equality", async () => {
  const registry = await loadRegistry();
  const grouped = registry.braids.find((row) => row.members.length === 100);
  const left = registry.entries.find((row) => row.assemblyId === grouped.members[0].assemblyId);
  const right = registry.entries.find((row) => row.assemblyId === grouped.members[1].assemblyId);
  assert.equal(compareBorgIdentity(left, right, "braid-entry").equal, true);
  assert.equal(compareBorgIdentity(left, right, "exact-model").equal, false);
  assert.equal(compareBorgIdentity(left, right, "sealed-record").equal, false);
  assert.deepEqual(compareBorgIdentity(left, right, "occurrence-lineage").equal, null);
  assert.deepEqual(compareBorgIdentity(left, right, "future-causal-state").available, false);
  assert.equal(compareBorgIdentity(left, right, "morphology").available, false);
  assert.equal(compareBorgIdentity(left, right, "taxonomy-co-membership").available, false);
});

test("indexed registry resolves exact ids, hashes, text, source identity, facets, and stable pages", async () => {
  const registry = await loadRegistry();
  const database = createBorgAssemblyRegistryDatabase({ registry });
  try {
    const target = registry.entries[0];
    assert.equal(database.count, 145);
    assert.equal(database.getExact(target.assemblyId, target.modelRevisionSha256).braidId, target.braidId);
    assert.equal(database.findExactByRecord(target.recordSha256).assemblyId, target.assemblyId);
    assert.equal(database.lookupHashPrefix(target.modelRevisionSha256.slice(0, 12)).status, "exact");
    assert.equal(database.select(new URLSearchParams({ q: target.braidId })).some((row) => row.assemblyId === target.assemblyId), true);
    assert.equal(database.select(new URLSearchParams({ q: target.sourceIdentity })).some((row) => row.assemblyId === target.assemblyId), true);
    assert.ok(database.select(new URLSearchParams("assemblySpan=3d")).every((row) => row.facets.assemblySpan === "3d"));
  } finally { database.close(); }
});

test("short hash ambiguity fails closed without retargeting either exact model", async () => {
  const registry = structuredClone(await loadRegistry());
  for (const [index, entry] of registry.entries.slice(0, 2).entries()) {
    const former = { assemblyId: entry.assemblyId, modelRevisionSha256: entry.modelRevisionSha256 };
    entry.modelRevisionSha256 = `deadbeef${String(index + 1).repeat(56)}`;
    entry.assemblyId = `asm-${entry.modelRevisionSha256.slice(0, 32)}`;
    const member = registry.braids.flatMap((row) => row.members).find((row) => row.assemblyId === former.assemblyId && row.modelRevisionSha256 === former.modelRevisionSha256);
    Object.assign(member, { assemblyId: entry.assemblyId, modelRevisionSha256: entry.modelRevisionSha256 });
  }
  const database = createBorgAssemblyRegistryDatabase({ registry });
  try {
    assert.equal(database.lookupHashPrefix("deadbeef").status, "ambiguous");
    assert.throws(() => database.select(new URLSearchParams("q=deadbeef")), /Ambiguous hash prefix/);
  } finally { database.close(); }
});

#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { BORG_ASSEMBLY_RECORD_CATALOG, BORG_ASSEMBLY_RECORD_CATALOG_ID } from "../../src/apps/borg/BorgAssemblyRecordCatalog.js";
import { validateBorgScientificStatusProjection } from "../../src/apps/borg/BorgScientificStatus.mjs";
import { validateBorgPlatonicRelationshipAssignments } from "../../src/apps/borg/BorgPlatonicRelationships.mjs";
import { validateLibraryClassifications } from "../../src/apps/borg/library/BorgLibraryComposition.mjs";
import { describeLibraryRecord, LIBRARY_DESCRIPTOR_VERSION } from "../../src/apps/borg/library/BorgLibraryDescriptors.mjs";
import { LIBRARY_FACETS } from "../../src/apps/borg/library/BorgLibraryQuery.mjs";
import { BORG_ASSEMBLY_REGISTRY_SCHEMA, BORG_FACET_DESCRIPTOR_SCHEMA, BORG_TAXONOMY_GRAPH_SCHEMA, validateBorgAssemblyRegistry } from "../../src/apps/borg/registry/BorgAssemblyRegistryContract.mjs";

const repoRoot = resolve(fileURLToPath(new URL("../../", import.meta.url)));
const outputPath = resolve(repoRoot, "reference/priorities/app-borg/assembly-registry.v1.json");
const classificationPath = resolve(repoRoot, "reference/priorities/app-borg/library-classifications.v4.json");
const projectionPath = resolve(repoRoot, "reference/priorities/braid-program/braid-candidate-adjudication-projection.v1.json");
const platonicPath = resolve(repoRoot, "reference/priorities/braid-program/borg-platonic-relationship-assignments.v1.json");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const opaque = (prefix, domain, value) => `${prefix}-${sha256(`${domain}\0${value}`).slice(0, 32)}`;

async function build() {
  const classificationBytes = await readFile(classificationPath);
  const classifications = validateLibraryClassifications(JSON.parse(classificationBytes));
  const projectionBytes = await readFile(projectionPath);
  const projection = validateBorgScientificStatusProjection(JSON.parse(projectionBytes));
  const platonicBytes = await readFile(platonicPath);
  const platonicAssignments = validateBorgPlatonicRelationshipAssignments(JSON.parse(platonicBytes));
  const ownerBytes = await readFile(resolve(repoRoot, projection.source));
  const platonicOwnerBytes = await readFile(resolve(repoRoot, platonicAssignments.source));
  const integrity = { sourceSha256: sha256(ownerBytes), sourceText: ownerBytes.toString("utf8"), brokenEvidenceLinks: [] };
  const described = [];
  for (const catalogEntry of BORG_ASSEMBLY_RECORD_CATALOG.entries) {
    const recordBytes = await readFile(resolve(repoRoot, catalogEntry.recordUrl));
    const record = JSON.parse(recordBytes);
    const summary = describeLibraryRecord(record, catalogEntry, sha256(recordBytes), classifications, projection, integrity, platonicAssignments, { sourceSha256: sha256(platonicOwnerBytes) }).summary;
    const sourceSpec = record.provenance?.generatingSpec;
    const source = JSON.parse(await readFile(resolve(repoRoot, sourceSpec)));
    const anchor = summary.variantSet ? `variant-set:${summary.variantSet.id}` : `source:${sourceSpec}`;
    described.push({ catalogEntry, record, summary, source, sourceSpec, anchor });
  }
  const braidGroups = Map.groupBy(described, (row) => row.anchor);
  const braids = [...braidGroups].map(([anchor, members]) => ({
    braidId: opaque("brd", "borg-braid-id.v1", anchor),
    anchor: { kind: anchor.startsWith("variant-set:") ? "source-declared-variant-set" : "source-specification", value: anchor.replace(/^[^:]+:/, "") },
    relationRevision: "borg-braid-entry-relation.2026-09-01.v1",
    members: members.map(({ catalogEntry }) => ({ assemblyId: catalogEntry.assemblyId, modelRevisionSha256: catalogEntry.modelRevisionSha256 })),
  })).sort((a, b) => a.braidId.localeCompare(b.braidId));
  const braidByAnchor = new Map([...braidGroups.keys()].map((anchor) => [anchor, opaque("brd", "borg-braid-id.v1", anchor)]));
  const entries = described.map(({ catalogEntry, record, summary, source, sourceSpec, anchor }) => {
    const staticRecord = record.worldlines.every((line) => line.segments.every((segment) => segment.coefficients.every((axis) => axis.slice(1).every((value) => value === 0))));
    const braidId = braidByAnchor.get(anchor);
    const nodeId = summary.facets.braidCount === "unavailable" ? "tax-node-registered-assembly-v1" : "tax-node-source-declared-braid-v1";
    return {
      assemblyId: catalogEntry.assemblyId,
      modelRevisionSha256: catalogEntry.modelRevisionSha256,
      braidId,
      occurrence: { state: "unavailable", reason: "Prescribed display records identify repeatable models, not source-carried evolved occurrences or formation lineages." },
      recordSha256: summary.recordSha256,
      recordSchema: record.schema,
      recordUrl: catalogEntry.recordUrl,
      sourceSpec,
      sourceIdentity: source.specId ?? source.identity?.candidateId ?? sourceSpec,
      label: catalogEntry.label,
      taxonomyMemberships: [{ revision: "borg-taxonomy.2026-09-01.v1", nodeId }],
      facetDescriptorVersion: LIBRARY_DESCRIPTOR_VERSION,
      facets: summary.facets,
      facetReasons: summary.reasons,
      visualCoverage: {
        poster: "deterministic-default-camera",
        inspection: "loadable-source-only-three-dimensional-scene",
        animationMode: staticRecord ? "camera-turntable" : "prescribed-worldlines",
        componentIsolation: summary.braids.length > 1 ? "source-membership-available" : "not-applicable",
      },
    };
  }).sort((a, b) => a.assemblyId.localeCompare(b.assemblyId));
  const memberships = braids.map((braid) => {
    const memberRows = braid.members.map((member) => entries.find((entry) => entry.assemblyId === member.assemblyId && entry.modelRevisionSha256 === member.modelRevisionSha256));
    const nodeId = memberRows.every((row) => row.taxonomyMemberships[0].nodeId === "tax-node-source-declared-braid-v1") ? "tax-node-source-declared-braid-v1" : "tax-node-registered-assembly-v1";
    return { membershipId: opaque("txn", "borg-taxonomy-membership.v1", `${braid.braidId}:${nodeId}`), braidId: braid.braidId, nodeId, lifecycle: "active", source: "content/markdown/aaa/noether-braid/braid-taxonomy.md" };
  });
  const result = {
    schema: BORG_ASSEMBLY_REGISTRY_SCHEMA,
    revision: "borg-assembly-registry.2026-09-01.v1",
    sourceCatalogId: BORG_ASSEMBLY_RECORD_CATALOG_ID,
    authorityBoundary: "Identity, taxonomy, query, and display coverage only; no acceleration balance, evolution, retention, stability, binding, physical identity, or scientific acceptance.",
    identityContract: {
      assemblyId: "Opaque exact registered model identity; scientific-content changes create a new model identity.",
      modelRevisionSha256: "Full SHA-256 of assembly-scientific-identity.v1 canonical scientific bytes.",
      braidId: "Permanent opaque Borg braid-entry identity; presentation and model-revision changes do not encode into the identifier.",
      occurrenceId: "Opaque evolved occurrence or formation-lineage identity; absent from prescribed model records and never inferred.",
      recordSha256: "Exact sealed display-record byte identity.",
      futureCausalState: "Unavailable until an accepted future-sufficient EOM checkpoint contract exists.",
    },
    facetDescriptor: {
      schema: BORG_FACET_DESCRIPTOR_SCHEMA,
      revision: LIBRARY_DESCRIPTOR_VERSION,
      unavailableSemantics: "A missing or unsupported source carrier is unavailable, never false.",
      facets: Object.entries(LIBRARY_FACETS).map(([key, value]) => ({ key, label: value.label, values: value.options.map(([id, label]) => ({ id, label })), owner: "src/apps/borg/library/BorgLibraryDescriptors.mjs" })),
    },
    taxonomy: {
      schema: BORG_TAXONOMY_GRAPH_SCHEMA,
      revision: "borg-taxonomy.2026-09-01.v1",
      nodes: [
        { nodeId: "tax-node-source-declared-braid-v1", primaryName: "Source-declared braid", lifecycle: "active" },
        { nodeId: "tax-node-registered-assembly-v1", primaryName: "Registered assembly without complete braid assignment", lifecycle: "active" },
      ],
      memberships,
    },
    braids,
    entries,
    coverage: {
      schema: "borg-assembly-registry-coverage.v1",
      registeredExactModels: entries.length,
      braidEntries: braids.length,
      sourceDeclaredRepresentatives: entries.length,
      deterministicPosters: entries.length,
      loadableInspectionScenes: entries.length,
      honestAnimationDispositions: entries.length,
      unavailableOccurrenceIdentities: entries.filter((row) => row.occurrence.state === "unavailable").length,
      unavailableFutureCausalStates: entries.length,
      missingVisualRepresentatives: 0,
      silentlySubstitutedRows: 0,
    },
  };
  validateBorgAssemblyRegistry(result);
  return `${JSON.stringify(result, null, 2)}\n`;
}

const built = await build();
if (process.argv.includes("--write")) {
  await writeFile(outputPath, built);
  console.log(`wrote ${outputPath}`);
} else if (process.argv.includes("--check")) {
  const current = await readFile(outputPath, "utf8").catch(() => "");
  if (current !== built) { console.error(`stale ${outputPath}; run node scripts/borg/build-assembly-registry.mjs --write`); process.exitCode = 1; }
  else console.log(`assembly registry current: ${JSON.parse(built).entries.length} exact models, ${JSON.parse(built).braids.length} braid entries`);
} else console.log(built);

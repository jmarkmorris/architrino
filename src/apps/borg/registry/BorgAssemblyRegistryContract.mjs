export const BORG_ASSEMBLY_REGISTRY_SCHEMA = "borg-assembly-registry.v1";
export const BORG_TAXONOMY_GRAPH_SCHEMA = "borg-taxonomy-relation-graph.v1";
export const BORG_FACET_DESCRIPTOR_SCHEMA = "borg-facet-descriptor.v1";

const SHA256 = /^[a-f0-9]{64}$/;
const OPAQUE_ID = /^(?:asm|brd|occ|txn)-[a-f0-9]{32}$/;

export function validateBorgAssemblyRegistry(value) {
  if (!value || value.schema !== BORG_ASSEMBLY_REGISTRY_SCHEMA || !Array.isArray(value.entries) || !Array.isArray(value.braids)) {
    throw new TypeError(`Borg registry must use ${BORG_ASSEMBLY_REGISTRY_SCHEMA}.`);
  }
  if (value.taxonomy?.schema !== BORG_TAXONOMY_GRAPH_SCHEMA || !Array.isArray(value.taxonomy.nodes) || !Array.isArray(value.taxonomy.memberships)) {
    throw new TypeError(`Borg registry taxonomy must use ${BORG_TAXONOMY_GRAPH_SCHEMA}.`);
  }
  if (value.facetDescriptor?.schema !== BORG_FACET_DESCRIPTOR_SCHEMA || !Array.isArray(value.facetDescriptor.facets)) {
    throw new TypeError(`Borg registry facets must use ${BORG_FACET_DESCRIPTOR_SCHEMA}.`);
  }
  const braidIds = uniqueOpaque(value.braids.map((row) => row.braidId), "braidId", "brd-");
  const entries = new Map();
  const recordHashes = new Set();
  for (const [index, row] of value.entries.entries()) {
    if (!OPAQUE_ID.test(row.assemblyId ?? "") || !row.assemblyId.startsWith("asm-")) throw new TypeError(`Registry entry ${index} has an invalid assemblyId.`);
    if (!SHA256.test(row.modelRevisionSha256 ?? "") || !SHA256.test(row.recordSha256 ?? "")) throw new TypeError(`Registry entry ${index} has an invalid revision or record hash.`);
    if (row.assemblyId !== `asm-${row.modelRevisionSha256.slice(0, 32)}`) throw new TypeError(`Registry entry ${index} has an inconsistent exact model identity.`);
    if (!braidIds.has(row.braidId)) throw new TypeError(`Registry entry ${index} has an unknown braidId.`);
    if (row.occurrence?.state !== "unavailable" && (!OPAQUE_ID.test(row.occurrence?.occurrenceId ?? "") || !row.occurrence.occurrenceId.startsWith("occ-"))) {
      throw new TypeError(`Registry entry ${index} occurrence identity must be opaque or explicitly unavailable.`);
    }
    if (!row.visualCoverage?.poster || !row.visualCoverage?.inspection || !["prescribed-worldlines", "evolved-history", "camera-turntable"].includes(row.visualCoverage?.animationMode)) {
      throw new TypeError(`Registry entry ${index} lacks honest visual coverage.`);
    }
    const key = exactModelKey(row);
    if (entries.has(key) || recordHashes.has(row.recordSha256)) throw new TypeError(`Registry entry ${index} duplicates an exact model or sealed record.`);
    entries.set(key, row); recordHashes.add(row.recordSha256);
  }
  for (const braid of value.braids) {
    if (!Array.isArray(braid.members) || braid.members.length === 0) throw new TypeError(`${braid.braidId} has no exact members.`);
    for (const member of braid.members) {
      const row = entries.get(exactModelKey(member));
      if (!row || row.braidId !== braid.braidId) throw new TypeError(`${braid.braidId} has a missing or inconsistent member.`);
    }
  }
  const membershipIds = uniqueOpaque(value.taxonomy.memberships.map((row) => row.membershipId), "taxonomy membership", "txn-");
  const nodeIds = new Set(value.taxonomy.nodes.map((row) => row.nodeId));
  for (const relation of value.taxonomy.memberships) {
    if (!nodeIds.has(relation.nodeId) || !braidIds.has(relation.braidId) || relation.lifecycle !== "active") {
      throw new TypeError(`Taxonomy membership ${relation.membershipId} is invalid.`);
    }
  }
  const coverage = value.coverage;
  if (coverage?.registeredExactModels !== entries.size || coverage?.braidEntries !== braidIds.size || coverage?.missingVisualRepresentatives !== 0 || coverage?.silentlySubstitutedRows !== 0) {
    throw new TypeError("Registry coverage totals do not match the validated registry.");
  }
  return Object.freeze(value);
}

export const exactModelKey = (row) => `${row.assemblyId}:${row.modelRevisionSha256}`;

export function compareBorgIdentity(left, right, relation, options = {}) {
  if (!left || !right) throw new TypeError("Identity comparison requires two registry objects.");
  if (relation === "exact-model") return { relation, available: true, equal: exactModelKey(left) === exactModelKey(right) };
  if (relation === "sealed-record") return { relation, available: true, equal: left.recordSha256 === right.recordSha256 };
  if (relation === "braid-entry") return { relation, available: true, equal: left.braidId === right.braidId };
  if (relation === "occurrence-lineage") {
    if (left.occurrence?.state === "unavailable" || right.occurrence?.state === "unavailable") return { relation, available: false, equal: null, reason: "Occurrence lineage is not carried by one or both records." };
    return { relation, available: true, equal: left.occurrence.occurrenceId === right.occurrence.occurrenceId };
  }
  if (relation === "future-causal-state") return { relation, available: false, equal: null, reason: "No accepted future-sufficient EOM checkpoint contract exists." };
  if (relation === "morphology") {
    if (typeof options.metric !== "function" || !Number.isFinite(options.tolerance) || options.tolerance < 0) return { relation, available: false, equal: null, reason: "A morphology comparison requires a named metric implementation and nonnegative tolerance." };
    const distance = options.metric(left, right);
    return { relation, available: Number.isFinite(distance), equal: Number.isFinite(distance) ? distance <= options.tolerance : null, distance, tolerance: options.tolerance };
  }
  if (relation === "taxonomy-co-membership") {
    if (typeof options.taxonomyRevision !== "string" || typeof options.nodeId !== "string") return { relation, available: false, equal: null, reason: "Taxonomy comparison requires an exact taxonomy revision and node identity." };
    const contains = (row) => row.taxonomyMemberships?.some((membership) => membership.revision === options.taxonomyRevision && membership.nodeId === options.nodeId);
    return { relation, available: true, equal: Boolean(contains(left) && contains(right)), taxonomyRevision: options.taxonomyRevision, nodeId: options.nodeId };
  }
  throw new RangeError(`Unknown Borg identity relation ${relation}.`);
}

function uniqueOpaque(values, label, prefix) {
  const result = new Set();
  for (const value of values) {
    if (!OPAQUE_ID.test(value ?? "") || !value.startsWith(prefix) || result.has(value)) throw new TypeError(`Registry ${label} must be unique opaque identifiers.`);
    result.add(value);
  }
  return result;
}

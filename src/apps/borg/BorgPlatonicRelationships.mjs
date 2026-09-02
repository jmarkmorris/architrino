export const BORG_PLATONIC_RELATIONSHIP_SCHEMA = "borg-platonic-relationship-assignments.v1";
export const BORG_PLATONIC_RELATIONSHIP_VALUES = Object.freeze([
  "exact-vertex-set",
  "platonic-component",
  "platonic-compound",
  "platonic-cell-complex",
]);

const SHA256 = /^[a-f0-9]{64}$/;
const ASSEMBLY_ID = /^asm-[a-f0-9]{32}$/;
const ASSIGNMENT_ID = /^[a-z0-9][a-z0-9.-]*$/;
const SOLID = new Set(["tetrahedron", "cube", "octahedron", "dodecahedron", "icosahedron"]);
const RELATIONSHIP = new Set(BORG_PLATONIC_RELATIONSHIP_VALUES);

function requiredText(value, label) {
  if (typeof value !== "string" || value.trim() === "") throw new TypeError(`${label} must be a nonempty string.`);
  return value;
}

export function validateBorgPlatonicRelationshipAssignments(value) {
  if (value?.schema !== BORG_PLATONIC_RELATIONSHIP_SCHEMA) throw new TypeError(`Platonic relationships must use ${BORG_PLATONIC_RELATIONSHIP_SCHEMA}.`);
  requiredText(value.revision, "Platonic assignment revision");
  requiredText(value.sourceOwner, "Platonic assignment source owner");
  requiredText(value.source, "Platonic assignment source");
  requiredText(value.authorityBoundary, "Platonic assignment authority boundary");
  requiredText(value.unassignedReason, "Platonic unassigned reason");
  if (!SHA256.test(value.sourceSha256 ?? "")) throw new TypeError("Platonic assignment sourceSha256 must be SHA-256.");
  if (!Array.isArray(value.assignments)) throw new TypeError("Platonic assignments must be an array.");
  const ids = new Set(); const targets = new Set();
  value.assignments.forEach((assignment, index) => {
    const label = `Platonic assignments[${index}]`;
    if (!ASSIGNMENT_ID.test(assignment?.assignmentId ?? "") || ids.has(assignment.assignmentId)) throw new TypeError(`${label} must have a unique opaque assignmentId.`);
    if (!ASSEMBLY_ID.test(assignment.assemblyId ?? "") || !SHA256.test(assignment.modelRevisionSha256 ?? "")) throw new TypeError(`${label} must carry an exact assemblyId + modelRevisionSha256 target.`);
    if (assignment.assemblyId !== `asm-${assignment.modelRevisionSha256.slice(0, 32)}`) throw new TypeError(`${label} has an inconsistent exact model identity.`);
    const target = `${assignment.assemblyId}:${assignment.modelRevisionSha256}`;
    if (targets.has(target)) throw new TypeError(`${label} duplicates an exact target; use one multi-value assignment row.`);
    if (!Array.isArray(assignment.relationships) || assignment.relationships.length === 0 || new Set(assignment.relationships).size !== assignment.relationships.length || assignment.relationships.some((relationship) => !RELATIONSHIP.has(relationship))) throw new TypeError(`${label}.relationships must contain unique controlled relationship values.`);
    if (!Array.isArray(assignment.solids) || assignment.solids.length === 0 || new Set(assignment.solids).size !== assignment.solids.length || assignment.solids.some((solid) => !SOLID.has(solid))) throw new TypeError(`${label}.solids must contain unique controlled Platonic-solid names.`);
    requiredText(assignment.sourceSpec, `${label}.sourceSpec`);
    requiredText(assignment.reason, `${label}.reason`);
    if (typeof assignment.braidQualified !== "boolean") throw new TypeError(`${label}.braidQualified must be boolean.`);
    ids.add(assignment.assignmentId); targets.add(target);
  });
  return Object.freeze(value);
}

export function describeBorgPlatonicRelationships(identity, assignments = null, integrity = {}) {
  if (!ASSEMBLY_ID.test(identity?.assemblyId ?? "") || !SHA256.test(identity?.modelRevisionSha256 ?? "")) throw new TypeError("Platonic relationship lookup requires an exact assembly identity.");
  if (!assignments) return Object.freeze({ state: "unavailable", values: Object.freeze(["unavailable"]), assignments: Object.freeze([]), reason: "Platonic relationship source is unavailable.", revision: null, sourceOwner: null, source: null });
  let validated;
  try { validated = validateBorgPlatonicRelationshipAssignments(assignments); }
  catch (error) { return Object.freeze({ state: "unavailable", values: Object.freeze(["unavailable"]), assignments: Object.freeze([]), reason: error.message, revision: null, sourceOwner: null, source: null }); }
  if (integrity.sourceSha256 && integrity.sourceSha256 !== validated.sourceSha256) return Object.freeze({ state: "unavailable", values: Object.freeze(["unavailable"]), assignments: Object.freeze([]), reason: "Platonic relationship source revision changed.", revision: validated.revision, sourceOwner: validated.sourceOwner, source: validated.source });
  const exact = validated.assignments.filter((assignment) => assignment.assemblyId === identity.assemblyId && assignment.modelRevisionSha256 === identity.modelRevisionSha256);
  const changed = validated.assignments.some((assignment) => assignment.assemblyId === identity.assemblyId && assignment.modelRevisionSha256 !== identity.modelRevisionSha256);
  if (changed && exact.length === 0) return Object.freeze({ state: "unavailable", values: Object.freeze(["unavailable"]), assignments: Object.freeze([]), reason: "The source assignment targets a different model revision; no classification was inherited.", revision: validated.revision, sourceOwner: validated.sourceOwner, source: validated.source });
  return Object.freeze({
    state: exact.length ? "assigned" : "unassigned",
    values: Object.freeze(exact.length ? [...new Set(exact.flatMap((assignment) => assignment.relationships))] : ["unavailable"]),
    assignments: Object.freeze(exact),
    reason: exact.length ? exact.map((assignment) => assignment.reason).join(" ") : validated.unassignedReason,
    revision: validated.revision,
    sourceOwner: validated.sourceOwner,
    source: validated.source,
    authorityBoundary: validated.authorityBoundary,
  });
}

async function sha256Text(value, cryptoLike) {
  if (!cryptoLike?.subtle) throw new Error("SHA-256 verification is unavailable.");
  const digest = await cryptoLike.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function loadBorgPlatonicRelationships({ fetchLike, identity,
  assignmentsUrl = "./reference/priorities/braid-program/borg-platonic-relationship-assignments.v1.json",
  cryptoLike = globalThis.crypto } = {}) {
  try {
    if (typeof fetchLike !== "function") throw new Error("Platonic relationship loading requires fetch().");
    const response = await fetchLike(assignmentsUrl);
    if (!response?.ok) throw new Error(`Platonic relationship fetch failed (${response?.status ?? "no response"}).`);
    const assignments = validateBorgPlatonicRelationshipAssignments(await response.json());
    const sourceResponse = await fetchLike(`./${assignments.source}`);
    if (!sourceResponse?.ok) throw new Error(`Platonic relationship source fetch failed (${sourceResponse?.status ?? "no response"}).`);
    return describeBorgPlatonicRelationships(identity, assignments, { sourceSha256: await sha256Text(await sourceResponse.text(), cryptoLike) });
  } catch (error) {
    return Object.freeze({ state: "unavailable", values: Object.freeze(["unavailable"]), assignments: Object.freeze([]), reason: error?.message ?? String(error), revision: null, sourceOwner: null, source: null });
  }
}

const SHA256 = /^[a-f0-9]{64}$/;
const ID = /^[a-z0-9][a-z0-9.-]*$/;
const MATCH_KINDS = new Set(["exact-configuration-set", "balance-source", "exact-configuration"]);

function fail(message) { throw new TypeError(message); }
function text(value, label) {
  if (typeof value !== "string" || value.length === 0) fail(`${label} must be a nonempty string.`);
  return value;
}

export function validateLibraryFindingRelations(value) {
  if (value?.schema !== "borg-library-finding-relations.v1") fail("Unsupported Borg Library finding-relation schema.");
  text(value.revision, "finding relation revision");
  text(value.source, "finding relation source");
  if (!Array.isArray(value.relations)) fail("Finding relations must be an array.");
  const ids = new Set();
  for (const [index, relation] of value.relations.entries()) {
    const prefix = `relations[${index}]`;
    const findingId = text(relation?.findingId, `${prefix}.findingId`);
    if (!ID.test(findingId) || ids.has(findingId)) fail(`${prefix}.findingId must be unique and opaque.`);
    ids.add(findingId);
    if (relation.status !== "active") fail(`${prefix}.status must be active in the current index.`);
    if (!["derived", "measured", "inferred", "guessed"].includes(relation.claimGrade)) fail(`${prefix}.claimGrade is unsupported.`);
    text(relation.summary, `${prefix}.summary`);
    text(relation.evidenceUrl, `${prefix}.evidenceUrl`);
    if (!relation.evidenceUrl.startsWith("reference/priorities/braid-program/")) fail(`${prefix}.evidenceUrl must be Braid Program owned.`);
    if (!MATCH_KINDS.has(relation.match?.kind)) fail(`${prefix}.match.kind is unsupported.`);
    if (relation.match.kind === "balance-source") {
      text(relation.match.schema, `${prefix}.match.schema`);
      if (!SHA256.test(relation.match.sourceSha256 ?? "")) fail(`${prefix}.match.sourceSha256 must be SHA-256.`);
    }
    if (relation.match.kind === "exact-configuration-set") {
      if (!Array.isArray(relation.match.configurations) || relation.match.configurations.length === 0) fail(`${prefix}.match.configurations must be nonempty.`);
      const identities = new Set();
      for (const [memberIndex, member] of relation.match.configurations.entries()) {
        if (!/^asm-[a-f0-9]{32}$/.test(member?.assemblyId ?? "") || !SHA256.test(member?.modelRevisionSha256 ?? "")) {
          fail(`${prefix}.match.configurations[${memberIndex}] must carry one exact configuration identity.`);
        }
        const identity = `${member.assemblyId}:${member.modelRevisionSha256}`;
        if (identities.has(identity)) fail(`${prefix}.match.configurations must not repeat an identity.`);
        identities.add(identity);
      }
    }
    if (relation.match.kind === "exact-configuration") {
      if (!/^asm-[a-f0-9]{32}$/.test(relation.match.assemblyId ?? "") || !SHA256.test(relation.match.modelRevisionSha256 ?? "")) {
        fail(`${prefix}.match must carry one exact configuration identity.`);
      }
    }
  }
  return value;
}

function relationMatches(relation, coordinates, identity) {
  if (relation.match.kind === "exact-configuration-set") return relation.match.configurations.some((member) =>
    member.assemblyId === identity.assemblyId && member.modelRevisionSha256 === identity.modelRevisionSha256);
  if (relation.match.kind === "balance-source") {
    const row = coordinates?.geometry?.balanceParameters;
    return row?.schema === relation.match.schema && row?.sourceSha256 === relation.match.sourceSha256;
  }
  return identity.assemblyId === relation.match.assemblyId &&
    identity.modelRevisionSha256 === relation.match.modelRevisionSha256;
}

export function describeLibraryFindings(coordinates, identity, registry = null) {
  if (!registry) return Object.freeze({
    relationRevision: null,
    relationSource: null,
    active: Object.freeze([]),
    indexed: false,
  });
  const validated = validateLibraryFindingRelations(registry);
  const active = validated.relations.filter((relation) => relationMatches(relation, coordinates, identity)).map((relation) => Object.freeze({
    findingId: relation.findingId,
    claimGrade: relation.claimGrade,
    summary: relation.summary,
    evidenceUrl: relation.evidenceUrl,
  }));
  return Object.freeze({
    relationRevision: validated.revision,
    relationSource: validated.source,
    active: Object.freeze(active),
    indexed: true,
  });
}

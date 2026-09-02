export const BORG_SCIENTIFIC_STATUS_SCHEMA = "borg-scientific-status-projection.v1";

const SHA256 = /^[a-f0-9]{64}$/;
const ASSEMBLY_ID = /^asm-[a-f0-9]{32}$/;
const OPAQUE_ID = /^[a-z0-9][a-z0-9.-]*$/;
const REQUIREMENT_IDS = Object.freeze(["H1", "H2", "H3", "H4", "H5"]);
const REQUIREMENT_TOKENS = new Set(["P[D]", "P[M]", "P[I]", "P[G]", "P[D/M]", "F[D]", "F[M]", "F[I]", "F[G]", "F[D/M]", "U", "N/A"]);
const LIFECYCLES = new Set(["active", "superseded", "withdrawn"]);
const SCOPES = new Set(["exact-configuration", "slice-only", "broader-family"]);
const MATCH_KINDS = new Set(["exact-configuration", "exact-configuration-set", "balance-source", "context-target"]);
const DISPOSITIONS = new Set(["excluded-prescribed-balance"]);

const GRADE_LABELS = Object.freeze({
  D: "derived",
  M: "measured",
  I: "inferred",
  G: "guessed",
  "D/M": "derived and measured",
});

export const BORG_REQUIREMENT_LABELS = Object.freeze({
  H1: "Closed model inventory",
  H2: "Geometry and coincidence",
  H3: "Causal roots",
  H4: "Bounded ordinary evolution",
  H5: "Retained branch",
});

function fail(message) { throw new TypeError(message); }
function requiredText(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) fail(`${label} must be a nonempty string.`);
  return value;
}
function exactIdentity(value, label) {
  if (!ASSEMBLY_ID.test(value?.assemblyId ?? "") || !SHA256.test(value?.modelRevisionSha256 ?? "")) {
    fail(`${label} must carry one exact assemblyId + modelRevisionSha256 identity.`);
  }
  return value;
}

export function parseBorgRequirementToken(token) {
  if (!REQUIREMENT_TOKENS.has(token)) fail(`Unsupported Borg adjudication requirement token ${String(token)}.`);
  if (token === "U") return Object.freeze({ token, state: "unknown", claimGrade: "not established" });
  if (token === "N/A") return Object.freeze({ token, state: "not-applicable", claimGrade: "not applicable" });
  const match = /^([PF])\[([^\]]+)\]$/.exec(token);
  return Object.freeze({
    token,
    state: match[1] === "P" ? "pass" : "fail",
    claimGrade: GRADE_LABELS[match[2]] ?? fail(`Unsupported Borg adjudication claim grade ${match[2]}.`),
  });
}

function validateMatch(match, label, scope) {
  if (!MATCH_KINDS.has(match?.kind)) fail(`${label}.kind is unsupported.`);
  if (scope === "exact-configuration" && match.kind !== "exact-configuration") {
    fail(`${label} must use an exact-configuration match for an exact adjudication.`);
  }
  if (match.kind === "exact-configuration") exactIdentity(match, label);
  if (match.kind === "context-target") exactIdentity(match, label);
  if (match.kind === "exact-configuration-set") {
    if (!Array.isArray(match.configurations) || match.configurations.length === 0) fail(`${label}.configurations must be nonempty.`);
    const identities = new Set();
    match.configurations.forEach((identity, index) => {
      exactIdentity(identity, `${label}.configurations[${index}]`);
      const key = `${identity.assemblyId}:${identity.modelRevisionSha256}`;
      if (identities.has(key)) fail(`${label}.configurations must not repeat an exact identity.`);
      identities.add(key);
    });
  }
  if (match.kind === "balance-source") {
    requiredText(match.schema, `${label}.schema`);
    if (!SHA256.test(match.sourceSha256 ?? "")) fail(`${label}.sourceSha256 must be SHA-256.`);
  }
}

export function validateBorgScientificStatusProjection(value) {
  if (value?.schema !== BORG_SCIENTIFIC_STATUS_SCHEMA) fail("Unsupported Borg scientific-status projection schema.");
  requiredText(value.revision, "projection revision");
  requiredText(value.source, "projection source");
  if (!SHA256.test(value.sourceSha256 ?? "")) fail("Projection sourceSha256 must be SHA-256.");
  if (!Array.isArray(value.relations)) fail("Projection relations must be an array.");
  const ids = new Set();
  const activeExactTargets = new Set();
  value.relations.forEach((relation, index) => {
    const prefix = `relations[${index}]`;
    const relationId = requiredText(relation?.relationId, `${prefix}.relationId`);
    if (!OPAQUE_ID.test(relationId) || ids.has(relationId)) fail(`${prefix}.relationId must be unique and opaque.`);
    ids.add(relationId);
    if (!LIFECYCLES.has(relation.lifecycle)) fail(`${prefix}.lifecycle is unsupported.`);
    if (!SCOPES.has(relation.scope)) fail(`${prefix}.scope is unsupported.`);
    if (!['adjudication', 'finding-context'].includes(relation.kind)) fail(`${prefix}.kind is unsupported.`);
    if (relation.disposition != null && !DISPOSITIONS.has(relation.disposition)) fail(`${prefix}.disposition is unsupported.`);
    validateMatch(relation.match, `${prefix}.match`, relation.scope);
    requiredText(relation.candidate, `${prefix}.candidate`);
    requiredText(relation.sourceAnchor, `${prefix}.sourceAnchor`);
    if (!relation.sourceAnchor.startsWith("#")) fail(`${prefix}.sourceAnchor must be a Markdown anchor.`);
    requiredText(relation.sourceRow, `${prefix}.sourceRow`);
    if (!Array.isArray(relation.evidenceLinks) || relation.evidenceLinks.length === 0) fail(`${prefix}.evidenceLinks must be nonempty.`);
    relation.evidenceLinks.forEach((link, linkIndex) => {
      requiredText(link?.label, `${prefix}.evidenceLinks[${linkIndex}].label`);
      const url = requiredText(link?.url, `${prefix}.evidenceLinks[${linkIndex}].url`);
      if (!url.startsWith("reference/priorities/")) fail(`${prefix}.evidenceLinks[${linkIndex}].url must be priority-owned.`);
    });
    for (const field of ["testedRealization", "parameterDomain", "instrument", "establishes", "doesNotEstablish", "currentBlocker", "falsifier"]) {
      requiredText(relation[field], `${prefix}.${field}`);
    }
    if (!Array.isArray(relation.assumptions) || relation.assumptions.length === 0) fail(`${prefix}.assumptions must be nonempty.`);
    relation.assumptions.forEach((assumption, assumptionIndex) => requiredText(assumption, `${prefix}.assumptions[${assumptionIndex}]`));
    if (relation.horizon != null) requiredText(relation.horizon, `${prefix}.horizon`);
    if (relation.kind === "adjudication") {
      if (!relation.requirements || Object.keys(relation.requirements).sort().join(",") !== REQUIREMENT_IDS.join(",")) {
        fail(`${prefix}.requirements must carry exactly H1 through H5.`);
      }
      REQUIREMENT_IDS.forEach((requirement) => parseBorgRequirementToken(relation.requirements[requirement]));
      if (relation.lifecycle === "active" && relation.scope === "exact-configuration") {
        const key = `${relation.match.assemblyId}:${relation.match.modelRevisionSha256}`;
        if (activeExactTargets.has(key)) fail(`Duplicate active exact adjudication for ${key}.`);
        activeExactTargets.add(key);
      }
    }
  });
  return value;
}

function matches(relation, coordinates, identity) {
  const match = relation.match;
  if (match.kind === "exact-configuration" || match.kind === "context-target") {
    return match.assemblyId === identity.assemblyId && match.modelRevisionSha256 === identity.modelRevisionSha256;
  }
  if (match.kind === "exact-configuration-set") return match.configurations.some((candidate) =>
    candidate.assemblyId === identity.assemblyId && candidate.modelRevisionSha256 === identity.modelRevisionSha256);
  const row = coordinates?.geometry?.balanceParameters;
  return row?.schema === match.schema && row?.sourceSha256 === match.sourceSha256;
}

function verdictFor(relation) {
  if (!relation) return "No adjudication linked";
  if (relation.disposition === "excluded-prescribed-balance") return "Excluded prescribed history in the tested scope";
  const h4 = parseBorgRequirementToken(relation.requirements.H4);
  const h5 = parseBorgRequirementToken(relation.requirements.H5);
  if (h5.state === "pass") return "Retained branch established";
  if (h5.state === "fail") return "Retained-branch claim falsified within the tested scope";
  if (h4.state === "fail") return "This exact realization failed bounded release";
  if (relation.searchOutcome === "no-success") return `No solution found in the searched domain: ${relation.parameterDomain}`;
  return "No retained branch established yet";
}

function requirementRows(relation) {
  return REQUIREMENT_IDS.map((id) => Object.freeze({ id, label: BORG_REQUIREMENT_LABELS[id], ...parseBorgRequirementToken(relation.requirements[id]) }));
}

export function describeBorgScientificStatus(coordinates, identity, projection = null, integrity = {}) {
  exactIdentity(identity, "scientific-status identity");
  if (!projection) return Object.freeze({
    coverage: "invalid", verdict: "Projection stale or invalid", causes: Object.freeze(["projection unavailable"]),
    projection: null, current: null, context: Object.freeze([]), requirements: Object.freeze([]), aggregateCategory: "stale",
  });
  let validated;
  try { validated = validateBorgScientificStatusProjection(projection); }
  catch (error) {
    return Object.freeze({ coverage: "invalid", verdict: "Projection stale or invalid", causes: Object.freeze([error.message]), projection: null, current: null, context: Object.freeze([]), requirements: Object.freeze([]), aggregateCategory: "stale" });
  }
  const causes = [...(integrity.causes ?? [])];
  if (integrity.sourceSha256 && integrity.sourceSha256 !== validated.sourceSha256) causes.push("adjudication source revision changed");
  const broken = new Set(integrity.brokenEvidenceLinks ?? []);
  const matching = validated.relations.filter((relation) => relation.lifecycle === "active" && matches(relation, coordinates, identity));
  for (const relation of matching) {
    relation.evidenceLinks.forEach((link) => { if (broken.has(link.url)) causes.push(`broken evidence link: ${link.url}`); });
    if (relation.kind === "adjudication" && integrity.sourceText && !integrity.sourceText.includes(relation.sourceRow)) causes.push(`missing source row: ${relation.relationId}`);
  }
  const changedRevision = validated.relations.find((relation) => relation.lifecycle === "active" && relation.scope === "exact-configuration" &&
    relation.match.assemblyId === identity.assemblyId && relation.match.modelRevisionSha256 !== identity.modelRevisionSha256);
  if (changedRevision) causes.push(`model revision changed for ${identity.assemblyId}`);
  const currentRelations = matching.filter((relation) => relation.kind === "adjudication" && relation.scope === "exact-configuration");
  if (currentRelations.length > 1) causes.push("duplicate active exact adjudication");
  if (causes.length) return Object.freeze({
    coverage: "invalid", verdict: "Projection stale or invalid", causes: Object.freeze([...new Set(causes)]),
    projection: Object.freeze({ revision: validated.revision, source: validated.source, sourceSha256: validated.sourceSha256 }), current: null,
    context: Object.freeze([]), requirements: Object.freeze([]), aggregateCategory: "stale",
  });
  const current = currentRelations[0] ?? null;
  const context = matching.filter((relation) => relation !== current);
  if (!current) return Object.freeze({
    coverage: "unlinked", verdict: "No adjudication linked", causes: Object.freeze([]),
    projection: Object.freeze({ revision: validated.revision, source: validated.source, sourceSha256: validated.sourceSha256 }), current: null,
    context: Object.freeze(context), requirements: Object.freeze([]), aggregateCategory: "unindexed",
  });
  const rows = requirementRows(current);
  const hasFailure = rows.some((row) => row.state === "fail");
  const hasReleasePass = rows.find((row) => row.id === "H4")?.state === "pass" || rows.find((row) => row.id === "H5")?.state === "pass";
  return Object.freeze({
    coverage: "current", verdict: verdictFor(current), causes: Object.freeze([]),
    projection: Object.freeze({ revision: validated.revision, source: validated.source, sourceSha256: validated.sourceSha256 }),
    current, context: Object.freeze(context), requirements: Object.freeze(rows),
    aggregateCategory: current.disposition === "excluded-prescribed-balance" || hasFailure ? "scoped-fail" : hasReleasePass ? "pass" : "unknown",
  });
}

export function aggregateBorgScientificStatus(rows) {
  const counts = { pass: 0, "scoped-fail": 0, unknown: 0, unindexed: 0, stale: 0 };
  for (const row of rows) counts[row?.scientificStatus?.aggregateCategory ?? "stale"] += 1;
  return Object.freeze({ complete: Object.values(counts).reduce((sum, value) => sum + value, 0) === rows.length, memberCount: rows.length, counts: Object.freeze(counts) });
}

async function sha256Text(value, cryptoLike) {
  if (!cryptoLike?.subtle) throw new Error("SHA-256 verification is unavailable.");
  const digest = await cryptoLike.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function loadBorgScientificStatus({ fetchLike, coordinates, identity,
  projectionUrl = "./reference/priorities/braid-program/braid-candidate-adjudication-projection.v1.json",
  cryptoLike = globalThis.crypto } = {}) {
  try {
    if (typeof fetchLike !== "function") throw new Error("projection loading requires fetch()");
    const projectionResponse = await fetchLike(projectionUrl);
    if (!projectionResponse?.ok) throw new Error(`projection fetch failed (${projectionResponse?.status ?? "no response"})`);
    const projection = validateBorgScientificStatusProjection(await projectionResponse.json());
    const sourceResponse = await fetchLike(`./${projection.source}`);
    if (!sourceResponse?.ok) throw new Error(`adjudication source fetch failed (${sourceResponse?.status ?? "no response"})`);
    const sourceText = await sourceResponse.text();
    const sourceSha256 = await sha256Text(sourceText, cryptoLike);
    const provisional = describeBorgScientificStatus(coordinates, identity, projection);
    const brokenEvidenceLinks = [];
    const links = new Set([provisional.current, ...provisional.context].filter(Boolean).flatMap((relation) => relation.evidenceLinks.map((link) => link.url)));
    for (const evidenceUrl of links) {
      const response = await fetchLike(`./${evidenceUrl.split("#")[0]}`);
      if (!response?.ok) brokenEvidenceLinks.push(evidenceUrl);
    }
    return describeBorgScientificStatus(coordinates, identity, projection, { sourceText, sourceSha256, brokenEvidenceLinks });
  } catch (error) {
    return Object.freeze({ coverage: "invalid", verdict: "Projection stale or invalid", causes: Object.freeze([error?.message ?? String(error)]), projection: null, current: null, context: Object.freeze([]), requirements: Object.freeze([]), aggregateCategory: "stale" });
  }
}

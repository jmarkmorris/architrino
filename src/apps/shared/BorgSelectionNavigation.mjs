export const BORG_SELECTION_SCHEMA = "borg-selection.v1";

export const BORG_SELECTION_STATUS = Object.freeze({
  VALID: "valid",
  MISSING: "missing",
  STALE: "stale",
  INVALID: "invalid",
});

const ASSEMBLY_ID_PATTERN = /^asm-[a-f0-9]{32}$/u;
const BRAID_ID_PATTERN = /^brd-[a-f0-9]{32}$/u;
const SHA256_PATTERN = /^[a-f0-9]{64}$/u;

export function validateBorgSelection(value, label = "Borg selection") {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError(`${label} must be an object.`);
  }
  if (value.schema !== BORG_SELECTION_SCHEMA) {
    throw new TypeError(`${label} must use ${BORG_SELECTION_SCHEMA}.`);
  }
  if (!BRAID_ID_PATTERN.test(value.braidId ?? "")) {
    throw new TypeError(`${label}.braidId must be a permanent Borg braid identity.`);
  }
  if (!ASSEMBLY_ID_PATTERN.test(value.assemblyId ?? "")) {
    throw new TypeError(`${label}.assemblyId must be an exact assembly identity.`);
  }
  if (!SHA256_PATTERN.test(value.modelRevisionSha256 ?? "")) {
    throw new TypeError(`${label}.modelRevisionSha256 must be a lowercase SHA-256.`);
  }
  if (value.assemblyId !== `asm-${value.modelRevisionSha256.slice(0, 32)}`) {
    throw new TypeError(`${label} has an inconsistent exact assembly identity pair.`);
  }
  return Object.freeze({
    schema: BORG_SELECTION_SCHEMA,
    braidId: value.braidId,
    assemblyId: value.assemblyId,
    modelRevisionSha256: value.modelRevisionSha256,
  });
}

export function resolveBorgSelectionRequest(
  queryOrSearch,
  entries,
) {
  const query = queryOrSearch instanceof URLSearchParams
    ? new URLSearchParams(queryOrSearch)
    : new URLSearchParams(queryOrSearch ?? "");
  const assemblyId = query.get("assemblyId");
  const modelRevisionSha256 = query.get("modelRevisionSha256");
  const recordSha256 = query.get("recordSha256");
  const hasAnyIdentity = assemblyId !== null ||
    modelRevisionSha256 !== null || recordSha256 !== null;
  if (!hasAnyIdentity) {
    return Object.freeze({
      status: BORG_SELECTION_STATUS.MISSING,
      reason: "No Borg assembly identity was requested.",
      entry: null,
    });
  }
  if (assemblyId === null || modelRevisionSha256 === null) {
    return Object.freeze({
      status: BORG_SELECTION_STATUS.MISSING,
      reason: "The Borg selection is missing assemblyId or modelRevisionSha256.",
      entry: null,
    });
  }
  if (!ASSEMBLY_ID_PATTERN.test(assemblyId) ||
      !SHA256_PATTERN.test(modelRevisionSha256) ||
      (recordSha256 !== null && !SHA256_PATTERN.test(recordSha256))) {
    return Object.freeze({
      status: BORG_SELECTION_STATUS.INVALID,
      reason: "The Borg selection contains an invalid identity token.",
      entry: null,
    });
  }
  const assemblyEntry = entries.find((entry) =>
    entry.assemblyId === assemblyId) ?? null;
  if (!assemblyEntry) {
    return Object.freeze({
      status: BORG_SELECTION_STATUS.MISSING,
      reason: "The requested assembly identity is not in the current Borg catalog.",
      entry: null,
    });
  }
  if (assemblyEntry.modelRevisionSha256 !== modelRevisionSha256) {
    return Object.freeze({
      status: BORG_SELECTION_STATUS.STALE,
      reason: "The requested assembly revision is stale; Borg did not retarget it.",
      entry: null,
      currentEntry: assemblyEntry,
    });
  }
  return Object.freeze({
    status: BORG_SELECTION_STATUS.VALID,
    reason: null,
    entry: assemblyEntry,
    recordSha256,
  });
}

export function buildBorgWorkbenchHref({
  selection,
  returnTo = null,
  path = "./borg.html",
} = {}) {
  const exact = validateBorgSelection(selection);
  const query = new URLSearchParams({
    assemblyId: exact.assemblyId,
    modelRevisionSha256: exact.modelRevisionSha256,
  });
  if (returnTo) query.set("returnTo", String(returnTo));
  return `${path}?${query}`;
}

export function buildBorgLibraryHref({
  selection,
  returnTo = null,
  path = "./borg-library.html",
} = {}) {
  const exact = validateBorgSelection(selection);
  const query = new URLSearchParams({ q: exact.braidId });
  if (returnTo) query.set("returnTo", String(returnTo));
  return `${path}?${query}`;
}

export function buildBraidSearchAnalysisHref({
  selection = null,
  returnTo = null,
  path = "./braid-search.html",
} = {}) {
  const query = new URLSearchParams({ view: "evidence" });
  if (selection) {
    const exact = validateBorgSelection(selection);
    query.set("assemblyId", exact.assemblyId);
    query.set("modelRevisionSha256", exact.modelRevisionSha256);
  }
  if (returnTo) query.set("returnTo", String(returnTo));
  return `${path}?${query}`;
}

export function resolveBraidSearchReturnHref(
  value,
  locationLike = globalThis.location,
) {
  return resolveSameOriginRouteHref(value, locationLike, "/braid-search.html");
}

export function resolveBorgLibraryReturnHref(
  value,
  locationLike = globalThis.location,
) {
  return resolveSameOriginRouteHref(value, locationLike, "/borg-library.html");
}

function resolveSameOriginRouteHref(value, locationLike, pathnameSuffix) {
  if (!value || !locationLike?.href) return null;
  let target;
  let current;
  try {
    current = new URL(locationLike.href);
    target = new URL(String(value), current);
  } catch {
    return null;
  }
  if (target.origin !== current.origin ||
      !target.pathname.endsWith(pathnameSuffix) ||
      target.username || target.password) {
    return null;
  }
  return `${target.pathname}${target.search}${target.hash}`;
}

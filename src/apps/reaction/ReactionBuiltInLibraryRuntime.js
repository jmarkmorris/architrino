import { buildReactionReviewCandidateFromSolverRequest } from "./ReactionReviewImportRuntime.js";
import { buildReactionSnapshotFromSolverResult } from "./ReactionSolverResultAdapterRuntime.js";

export const REACTION_BUILTIN_LIBRARY_MANIFEST_SCHEMA = "reaction-built-in-library-manifest/v1";
export const REACTION_BUILTIN_LIBRARY_MANIFEST_PATH =
  "../../../content/contracts/examples/reaction-library/manifest.v1.json";
export const REACTION_BUILTIN_LIBRARY_ENTRIES = Object.freeze([]);
export const DEFAULT_REACTION_BUILTIN_LIBRARY_ENTRY_ID = "";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function buildBuiltInLibraryPageBaseUrl(fallbackUrl = import.meta.url, pageBaseUrl = "") {
  const resolvedPageBaseUrl =
    normalizeText(pageBaseUrl) ||
    normalizeText(globalThis.document?.baseURI) ||
    normalizeText(globalThis.window?.location?.href);
  return new URL(resolvedPageBaseUrl || fallbackUrl, fallbackUrl);
}

function resolveBuiltInLibraryAssetUrl(assetPath = "", options = {}) {
  const normalizedAssetPath = normalizeText(assetPath);
  if (!normalizedAssetPath) {
    throw new Error("Built-in reaction library asset path is required.");
  }
  if (/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(normalizedAssetPath)) {
    return new URL(normalizedAssetPath);
  }
  if (normalizedAssetPath.startsWith("/") || normalizedAssetPath.startsWith("content/")) {
    return new URL(
      normalizedAssetPath,
      buildBuiltInLibraryPageBaseUrl(options?.baseUrl ?? import.meta.url, options?.pageBaseUrl)
    );
  }
  return new URL(normalizedAssetPath, options?.baseUrl ?? import.meta.url);
}

function getBuiltInReactionLibraryEntry(entryId = "", entries = []) {
  return (
    (Array.isArray(entries) ? entries : []).find((entry) => entry.id === normalizeText(entryId)) ??
    null
  );
}

function resolveBuiltInEntry(entryId = "", entries = [], defaultEntryId = "") {
  const resolvedEntryId =
    normalizeText(entryId) ||
    normalizeText(defaultEntryId) ||
    normalizeText((Array.isArray(entries) ? entries : []).find((entry) => entry?.isDefault)?.id) ||
    normalizeText((Array.isArray(entries) ? entries : [])[0]?.id) ||
    DEFAULT_REACTION_BUILTIN_LIBRARY_ENTRY_ID;
  const entry = getBuiltInReactionLibraryEntry(resolvedEntryId, entries);
  if (!entry) {
    throw new Error(`Unknown built-in reaction library entry: ${resolvedEntryId || "(empty)"}`);
  }
  return entry;
}

function normalizeBuiltInManifest(manifest = {}) {
  const entries = (Array.isArray(manifest?.entries) ? manifest.entries : [])
    .map((entry) => ({
      id: normalizeText(entry?.id),
      requestId: normalizeText(entry?.requestId),
      title: normalizeText(entry?.title),
      displayTitle: normalizeText(entry?.displayTitle),
      description: normalizeText(entry?.description),
      sourceRequestPath: normalizeText(entry?.sourceRequestPath),
      isDefault: entry?.isDefault === true,
      solveExact: entry?.solveExact === true,
    }))
    .filter((entry) => entry.id && entry.sourceRequestPath);
  const defaultEntryId =
    normalizeText(manifest?.defaultEntryId) ||
    normalizeText(entries.find((entry) => entry?.isDefault)?.id) ||
    normalizeText(entries[0]?.id);
  return {
    schema: REACTION_BUILTIN_LIBRARY_MANIFEST_SCHEMA,
    defaultEntryId,
    entries,
  };
}

function resolveBrowserFetch(fetchImpl = null) {
  if (typeof fetchImpl === "function") {
    return fetchImpl;
  }
  if (typeof globalThis.fetch === "function") {
    return globalThis.fetch.bind(globalThis);
  }
  return null;
}

export async function loadReactionBuiltInLibraryManifest(options = {}) {
  if (Array.isArray(options?.entries) && options.entries.length) {
    return normalizeBuiltInManifest({
      schema: REACTION_BUILTIN_LIBRARY_MANIFEST_SCHEMA,
      defaultEntryId: options?.defaultEntryId,
      entries: options.entries,
    });
  }
  if (options?.manifest && typeof options.manifest === "object") {
    return normalizeBuiltInManifest(options.manifest);
  }
  const fetchImpl = resolveBrowserFetch(options?.fetchImpl);
  if (typeof fetchImpl !== "function") {
    throw new Error("Built-in reaction library loading requires fetch().");
  }
  const manifestUrl = resolveBuiltInLibraryAssetUrl(
    normalizeText(options?.manifestPath) || REACTION_BUILTIN_LIBRARY_MANIFEST_PATH,
    options
  );
  const response = await fetchImpl(manifestUrl);
  if (response?.ok === false) {
    throw new Error("Built-in reaction library manifest fetch failed.");
  }
  const manifest = await response.json();
  if (normalizeText(manifest?.schema) !== REACTION_BUILTIN_LIBRARY_MANIFEST_SCHEMA) {
    throw new Error("Built-in reaction library manifest is invalid.");
  }
  return normalizeBuiltInManifest(manifest);
}

async function loadJsonSolverRequestFromBuiltInEntry(entry = {}, options = {}) {
  const sourceRequestPath = normalizeText(entry?.sourceRequestPath);
  if (!sourceRequestPath) {
    throw new Error(`Built-in reaction library entry ${entry?.id || "(missing id)"} is missing sourceRequestPath.`);
  }
  const fetchImpl = resolveBrowserFetch(options?.fetchImpl);
  if (typeof fetchImpl !== "function") {
    throw new Error("Built-in reaction library loading requires fetch().");
  }
  const requestUrl = resolveBuiltInLibraryAssetUrl(sourceRequestPath, options);
  const response = await fetchImpl(requestUrl);
  if (response?.ok === false) {
    throw new Error(`Built-in reaction solver-request fetch failed for ${entry.id}.`);
  }
  const request = await response.json();
  if (normalizeText(request?.schema) !== "solver-request/v1") {
    throw new Error(`Built-in reaction library entry ${entry.id} is not solver-request/v1.`);
  }
  return request;
}

export async function loadReactionBuiltInLibraryEntry(entryId = "", options = {}) {
  const manifest = await loadReactionBuiltInLibraryManifest(options);
  const entry = resolveBuiltInEntry(entryId, manifest.entries, manifest.defaultEntryId);
  const solveRequest = typeof options?.solveRequest === "function" ? options.solveRequest : null;
  if (!solveRequest) {
    throw new Error("Built-in reaction library loading requires solveRequest().");
  }
  const request = await loadJsonSolverRequestFromBuiltInEntry(entry, options);
  const solution = await Promise.resolve(
    solveRequest(request, {
      requestId: normalizeText(request?.requestId) || normalizeText(entry?.requestId) || normalizeText(entry?.id),
      origin: request?.origin,
    })
  );
  const reviewCandidate = buildReactionReviewCandidateFromSolverRequest(request);
  return {
    entry,
    manifest,
    request,
    solution,
    snapshot: buildReactionSnapshotFromSolverResult(solution?.result ?? {}),
    exportOverrides: reviewCandidate.exportOverrides,
  };
}

export async function loadDefaultReactionBuiltInLibraryEntry(options = {}) {
  return loadReactionBuiltInLibraryEntry(
    normalizeText(options?.defaultEntryId) || DEFAULT_REACTION_BUILTIN_LIBRARY_ENTRY_ID,
    options
  );
}

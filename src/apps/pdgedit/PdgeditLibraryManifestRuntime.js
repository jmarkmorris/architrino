function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeBoolean(value) {
  return value === true;
}

function normalizeSourceKind(value, documentPath = "") {
  const normalizedValue = normalizeText(value);
  if (normalizedValue === "example" || normalizedValue === "exact") {
    return normalizedValue;
  }
  const normalizedPath = normalizeText(documentPath);
  if (
    normalizedPath.startsWith(".tmp/pdgsolve/pdgedit/documents/") ||
    normalizedPath.includes("/.tmp/pdgsolve/pdgedit/documents/")
  ) {
    return "exact";
  }
  return "example";
}

export function createPdgeditLibraryManifestEntry({
  id = "",
  title = "",
  displayTitle = "",
  documentPath = "",
  sourceKind = "",
  isDefault = false,
} = {}) {
  const normalizedTitle = normalizeText(title);
  const normalizedDocumentPath = normalizeText(documentPath);
  const entry = {
    id: normalizeText(id),
    title: normalizedTitle,
    displayTitle: normalizeText(displayTitle) || normalizedTitle,
    documentPath: normalizedDocumentPath,
    sourceKind: normalizeSourceKind(sourceKind, normalizedDocumentPath),
  };
  if (normalizeBoolean(isDefault)) {
    entry.isDefault = true;
  }
  return entry;
}

export function normalizePdgeditLibraryManifestEntry(entry = {}) {
  return createPdgeditLibraryManifestEntry({
    id: entry?.id,
    title: entry?.title,
    displayTitle: entry?.displayTitle,
    documentPath: entry?.documentPath,
    sourceKind: entry?.sourceKind,
    isDefault: entry?.isDefault,
  });
}

export function normalizePdgeditLibraryManifest(rawManifest = {}) {
  return {
    schema: normalizeText(rawManifest?.schema),
    defaultEntryId: normalizeText(rawManifest?.defaultEntryId),
    entries: Array.isArray(rawManifest?.entries)
      ? rawManifest.entries
          .map((entry) => normalizePdgeditLibraryManifestEntry(entry))
          .filter((entry) => entry.id && entry.documentPath)
      : [],
  };
}

export function mergePdgeditLibraryManifests(...manifests) {
  const normalizedManifests = manifests.map((manifest) => normalizePdgeditLibraryManifest(manifest));
  const entryById = new Map();
  let defaultEntryId = "";
  normalizedManifests.forEach((manifest) => {
    if (!defaultEntryId && manifest.defaultEntryId && manifest.entries.some((entry) => entry.id === manifest.defaultEntryId)) {
      defaultEntryId = manifest.defaultEntryId;
    }
    manifest.entries.forEach((entry) => {
      entryById.set(entry.id, entry);
    });
  });
  return {
    schema: "pdgedit-library-manifest/v1",
    defaultEntryId,
    entries: [...entryById.values()],
  };
}

export function getPdgeditLibraryManifestEntryById(manifest = {}, entryId = "") {
  const normalizedManifest = normalizePdgeditLibraryManifest(manifest);
  const normalizedEntryId = normalizeText(entryId);
  if (!normalizedEntryId) {
    return null;
  }
  return normalizedManifest.entries.find((entry) => entry.id === normalizedEntryId) ?? null;
}

export function selectDefaultPdgeditLibraryManifestEntry(manifest = {}) {
  const normalizedManifest = normalizePdgeditLibraryManifest(manifest);
  return (
    getPdgeditLibraryManifestEntryById(normalizedManifest, normalizedManifest.defaultEntryId) ??
    normalizedManifest.entries[0] ??
    null
  );
}

export async function loadPdgeditLibraryManifest({
  fetchImpl = globalThis.fetch?.bind(globalThis),
  specUrl,
  allowMissing = false,
} = {}) {
  if (typeof fetchImpl !== "function") {
    throw new Error("pdgedit library manifest loading requires fetch().");
  }
  const response = await fetchImpl(specUrl, { cache: "no-store" });
  if (allowMissing && response.status === 404) {
    return normalizePdgeditLibraryManifest({
      schema: "pdgedit-library-manifest/v1",
      defaultEntryId: "",
      entries: [],
    });
  }
  if (!response.ok) {
    throw new Error(`Failed to load pdgedit library manifest: ${response.status} ${response.statusText}`);
  }
  const rawManifest = await response.json();
  return normalizePdgeditLibraryManifest(rawManifest);
}

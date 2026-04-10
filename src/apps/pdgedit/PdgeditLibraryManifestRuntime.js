function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeBoolean(value) {
  return value === true;
}

export function createPdgeditLibraryManifestEntry({
  id = "",
  title = "",
  displayTitle = "",
  documentPath = "",
  isDefault = false,
} = {}) {
  const normalizedTitle = normalizeText(title);
  const entry = {
    id: normalizeText(id),
    title: normalizedTitle,
    displayTitle: normalizeText(displayTitle) || normalizedTitle,
    documentPath: normalizeText(documentPath),
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
} = {}) {
  if (typeof fetchImpl !== "function") {
    throw new Error("pdgedit library manifest loading requires fetch().");
  }
  const response = await fetchImpl(specUrl, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load pdgedit library manifest: ${response.status} ${response.statusText}`);
  }
  const rawManifest = await response.json();
  return normalizePdgeditLibraryManifest(rawManifest);
}

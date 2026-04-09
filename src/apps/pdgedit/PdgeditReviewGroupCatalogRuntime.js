function normalizeText(value) {
  return typeof value === "string" ? value : "";
}

function normalizeTileRow(row) {
  if (!Array.isArray(row)) {
    return [];
  }
  return row.slice(0, 4).map((tileKey) => normalizeText(tileKey));
}

function normalizeGroup(group) {
  return {
    key: normalizeText(group?.key),
    title: normalizeText(group?.title),
    rows: Array.isArray(group?.rows) ? group.rows.map(normalizeTileRow).filter((row) => row.length) : [],
  };
}

export function normalizePdgeditReviewGroupCatalog(rawCatalog) {
  return {
    version: Number(rawCatalog?.version) || 1,
    specialGroups: Array.isArray(rawCatalog?.specialGroups)
      ? rawCatalog.specialGroups.map(normalizeGroup).filter((group) => group.key && group.rows.length)
      : [],
    singleRowGroups: Array.isArray(rawCatalog?.singleRowGroups)
      ? rawCatalog.singleRowGroups.map(normalizeGroup).filter((group) => group.key && group.rows.length)
      : [],
    quarkColorGroups: Array.isArray(rawCatalog?.quarkColorGroups)
      ? rawCatalog.quarkColorGroups.map(normalizeGroup).filter((group) => group.key && group.rows.length)
      : [],
    compositeGroups: Array.isArray(rawCatalog?.compositeGroups)
      ? rawCatalog.compositeGroups.map(normalizeGroup).filter((group) => group.key && group.rows.length)
      : [],
  };
}

export async function loadPdgeditReviewGroupCatalog({
  fetchImpl = globalThis.fetch?.bind(globalThis),
  specUrl,
} = {}) {
  if (typeof fetchImpl !== "function") {
    throw new Error("pdgedit review group loading requires fetch().");
  }
  const response = await fetchImpl(specUrl, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load pdgedit review groups: ${response.status} ${response.statusText}`);
  }
  const rawCatalog = await response.json();
  return normalizePdgeditReviewGroupCatalog(rawCatalog);
}

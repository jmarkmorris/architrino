export const LIBRARY_FACETS = Object.freeze({
  count: { label: "Architrinos", options: [] },
  braidCount: { label: "Braids in assembly", options: [["1", "1"], ["2", "2"], ["3", "3"]] },
  breathing: { label: "Breathing", options: [["yes", "Breather"], ["no", "Non-breather"]] },
  radii: { label: "Assembly radii", options: [["iso", "Iso-radii"], ["hetero", "Hetero-radii"]] },
  circleOccupancy: { label: "Circle occupancy", options: [["one", "One per circle"], ["multiple", "Multiple per circle"], ["mixed", "Mixed"]] },
  assemblySpan: { label: "Assembly span", options: [["boundary", "1D"], ["2d", "2D · planar"], ["3d", "3D · spatial"]] },
  braidDimension: { label: "Braid dimensionality", options: [["2d", "2D · planar"], ["3d", "3D · spatial"], ["mixed", "Mixed"]] },
  shape: { label: "Shape", options: [["circles", "Circular paths"], ["sphere", "Spherical distribution"], ["spindle", "Spindle envelope"], ["unavailable", "Unclassified"]] },
  speedPolicy: { label: "Speed policy", options: [["uncapped", "Uncapped"], ["capped-cf", "Capped at c_f"]] },
});

export function isLibrarySelectorValue(key, value) {
  return key === "count" ? /^[1-9]\d*$/.test(value) : LIBRARY_FACETS[key]?.options.some(([option]) => option === value) ?? false;
}

// Retired menu choices must not reappear through saved links or browser Back.
// Missing values remain in record metadata and API queries, never converted to no.
export function validateLibraryBrowseParams(params) {
  const validated = new URLSearchParams(params);
  const allowed = new Set([
    ...Object.keys(LIBRARY_FACETS),
    "q",
    "groupBy",
    "cursor",
    "assemblyId",
    "modelRevisionSha256",
    "recordSha256",
  ]);
  for (const key of validated.keys()) {
    if (!allowed.has(key)) throw new RangeError(`Unsupported Borg Library query key ${key}.`);
  }
  for (const key of Object.keys(LIBRARY_FACETS)) {
    for (const value of validated.getAll(key)) {
      if (!isLibrarySelectorValue(key, value)) {
        throw new RangeError(`Unsupported ${key} selector value ${value}.`);
      }
    }
  }
  const groupBy = validated.get("groupBy");
  if (groupBy && groupBy !== "none" && !["count", "braidCount", "assemblySpan", "braidDimension", "breathing"].includes(groupBy)) {
    throw new RangeError(`Unsupported Borg Library grouping ${groupBy}.`);
  }
  return validated;
}

export function matchesLibraryFilters(row, params, omitFacet = null) {
  const query = (params.get("q") ?? "").trim().toLowerCase();
  const textMatch = [row.label, row.assemblyId, row.description].join(" ").toLowerCase().includes(query);
  const hashMatch = /^[a-f0-9]{8,64}$/.test(query) &&
    (row.recordSha256?.startsWith(query) || row.modelRevisionSha256?.startsWith(query));
  if (query && !textMatch && !hashMatch) return false;
  return Object.keys(LIBRARY_FACETS).every((key) => {
    const selected = params.getAll(key).filter(Boolean);
    const actual = [].concat(row.facets[key] ?? "unavailable");
    return key === omitFacet || selected.length === 0 || selected.some((value) => actual.includes(value));
  });
}

export function queryLibraryRows(rows, params) {
  validateLibraryBrowseParams(params);
  const matches = rows.filter((row) => matchesLibraryFilters(row, params));
  const counts = Object.fromEntries(Object.keys(LIBRARY_FACETS).map((key) => {
    const values = {};
    for (const row of rows.filter((r) => matchesLibraryFilters(r, params, key))) {
      for (const value of [].concat(row.facets[key] ?? "unavailable")) values[value] = (values[value] ?? 0) + 1;
    }
    return [key, values];
  }));
  const groupBy = params.get("groupBy");
  if (!groupBy || groupBy === "none") return { total: matches.length, results: matches.map((row) => ({ kind: "leaf", ...row })), counts };
  if (!["count", "braidCount", "assemblySpan", "braidDimension", "breathing"].includes(groupBy)) throw new RangeError("Unsupported grouping.");
  const groups = new Map();
  for (const row of matches) {
    const value = row.facets[groupBy];
    if (!groups.has(value)) groups.set(value, []);
    groups.get(value).push(row);
  }
  const results = [...groups].map(([value, members]) => ({ kind: "group", id: `group:${groupBy}:${value}`,
    groupBy, value, memberCount: members.length, representative: members[0] }));
  return { total: matches.length, results, counts };
}

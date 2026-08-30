export const LIBRARY_FACETS = Object.freeze({
  count: { label: "Architrinos", options: [] },
  breathing: { label: "Breathing", options: [["yes", "Breather"], ["no", "Non-breather"], ["unavailable", "Unavailable"]] },
  nested: { label: "Nesting", options: [["yes", "Nested"], ["no", "Not nested"], ["unavailable", "Unavailable"]] },
  dimension: { label: "Dimensions", options: [["2d", "2D · planar"], ["3d", "3D · spatial"], ["boundary", "Line / point"], ["unavailable", "Unavailable"]] },
  shape: { label: "Shape", options: [["circles", "Circular paths"], ["sphere", "Spherical distribution"], ["spindle", "Spindle envelope"], ["unavailable", "Unclassified"]] },
  speedPolicy: { label: "Speed policy", options: [["uncapped", "Uncapped"], ["capped-cf", "Capped at c_f"], ["unavailable", "Unavailable"]] },
});

export function matchesLibraryFilters(row, params, omitFacet = null) {
  const query = (params.get("q") ?? "").trim().toLowerCase();
  const textMatch = [row.label, row.alias, row.id, row.sourceId, row.description].join(" ").toLowerCase().includes(query);
  const hashMatch = /^[a-f0-9]{8,64}$/.test(query) && row.recordSha256?.startsWith(query);
  if (query && !textMatch && !hashMatch) return false;
  return Object.keys(LIBRARY_FACETS).every((key) => {
    const selected = params.getAll(key).filter(Boolean);
    const actual = [].concat(row.facets[key] ?? "unavailable");
    return key === omitFacet || selected.length === 0 || selected.some((value) => actual.includes(value));
  });
}

export function queryLibraryRows(rows, params) {
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
  if (!["count", "dimension", "breathing"].includes(groupBy)) throw new RangeError("Unsupported grouping.");
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

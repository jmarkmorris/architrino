import { isLibraryVariantSetId } from "./BorgLibraryVariants.mjs";
import { aggregateBorgScientificStatus } from "../BorgScientificStatus.mjs";

export const LIBRARY_FACETS = Object.freeze({
  assemblySpan: { label: "Assembly span", options: [["boundary", "1D"], ["2d", "2D · planar"], ["3d", "3D · spatial"]] },
  braidCount: { label: "Braids in assembly", options: [["1", "1"], ["2", "2"], ["3", "3"]] },
  braidDimension: { label: "Braid dimensionality", options: [["2d", "2D · planar"], ["3d", "3D · spatial"], ["mixed", "Mixed"]] },
  count: { label: "Architrinos", options: [] },
  radii: { label: "Assembly radii", options: [["iso", "Iso-radii"], ["hetero", "Hetero-radii"]] },
  circleOccupancy: { label: "Circle occupancy", options: [["one", "One per circle"], ["multiple", "Multiple per circle"], ["mixed", "Mixed"]] },
  breathing: { label: "Breathing", options: [["yes", "Breather"], ["no", "Non-breather"]] },
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
    "variantSet",
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
  const variantSets = validated.getAll("variantSet");
  if (variantSets.length > 1 || (variantSets.length === 1 && !isLibraryVariantSetId(variantSets[0]))) {
    throw new RangeError("Unsupported Borg Library variant set.");
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

function facetCountIdentity(row, selectedVariantSet) {
  if (!selectedVariantSet && row.variantSet) return row.variantSet.id;
  return `leaf:${row.assemblyId}:${row.modelRevisionSha256}:${row.recordSha256}`;
}

function countFacetConfigurations(rows, selectedVariantSet, facetKey) {
  const identities = new Map();
  for (const row of rows) {
    const identity = facetCountIdentity(row, selectedVariantSet);
    for (const value of [].concat(row.facets[facetKey] ?? "unavailable")) {
      if (!identities.has(value)) identities.set(value, new Set());
      identities.get(value).add(identity);
    }
  }
  return Object.fromEntries([...identities].map(([value, members]) => [value, members.size]));
}

function countFindingConfigurations(rows) {
  return new Set(rows.filter((row) => row.activeFindingConfiguration).map((row) =>
    `${row.assemblyId}:${row.modelRevisionSha256}`)).size;
}

export function queryLibraryRows(rows, params) {
  validateLibraryBrowseParams(params);
  const selectedVariantSet = params.get("variantSet");
  const variantRows = selectedVariantSet ? rows.filter((row) => row.variantSet?.id === selectedVariantSet) : rows;
  const matches = variantRows.filter((row) => matchesLibraryFilters(row, params));
  const counts = Object.fromEntries(Object.keys(LIBRARY_FACETS).map((key) => {
    const candidates = variantRows.filter((row) => matchesLibraryFilters(row, params, key));
    return [key, countFacetConfigurations(candidates, selectedVariantSet, key)];
  }));
  const groupBy = params.get("groupBy");
  if (!groupBy || groupBy === "none") {
    if (selectedVariantSet) return { total: matches.length, activeFindingConfigurationCount: countFindingConfigurations(matches), results: matches.map((row) => ({ kind: "leaf", activeFindingConfigurationCount: row.activeFindingConfiguration ? 1 : 0, ...row })), counts };
    const ordered = [], variantGroups = new Map();
    for (const row of matches) {
      if (!row.variantSet) { ordered.push({ kind: "leaf", activeFindingConfigurationCount: row.activeFindingConfiguration ? 1 : 0, ...row }); continue; }
      let group = variantGroups.get(row.variantSet.id);
      if (!group) {
        group = { kind: "variant-group", id: row.variantSet.id, variantSetId: row.variantSet.id,
          label: row.variantSet.label, parameterLabels: row.variantSet.parameterLabels, members: [] };
        variantGroups.set(row.variantSet.id, group); ordered.push(group);
      }
      group.members.push(row);
    }
    const results = ordered.map((result) => {
      if (result.kind !== "variant-group") return result;
      if (result.members.length === 1) return { kind: "leaf", activeFindingConfigurationCount: result.members[0].activeFindingConfiguration ? 1 : 0, ...result.members[0] };
      const representative = result.members.reduce((best, row) =>
        row.variantSet.order < best.variantSet.order ? row : best, result.members[0]);
      return { kind: result.kind, id: result.id, variantSetId: result.variantSetId, label: result.label,
        parameterLabels: result.parameterLabels, memberCount: result.members.length,
        activeFindingConfigurationCount: countFindingConfigurations(result.members), scientificCoverage: aggregateBorgScientificStatus(result.members), representative };
    });
    return { total: matches.length, activeFindingConfigurationCount: countFindingConfigurations(matches), results, counts };
  }
  if (!["count", "braidCount", "assemblySpan", "braidDimension", "breathing"].includes(groupBy)) throw new RangeError("Unsupported grouping.");
  const groups = new Map();
  for (const row of matches) {
    const value = row.facets[groupBy];
    if (!groups.has(value)) groups.set(value, []);
    groups.get(value).push(row);
  }
  const results = [...groups].map(([value, members]) => ({ kind: "group", id: `group:${groupBy}:${value}`,
    groupBy, value, memberCount: members.length, activeFindingConfigurationCount: countFindingConfigurations(members), scientificCoverage: aggregateBorgScientificStatus(members), representative: members[0] }));
  return { total: matches.length, activeFindingConfigurationCount: countFindingConfigurations(matches), results, counts };
}

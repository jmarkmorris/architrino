// Counts declared, disjoint constituent groups; never divide particle count by six.
export function describeBraidComposition(coordinates) {
  const inventory = coordinates?.constituentInventory;
  const groups = coordinates?.relationships?.componentBraids;
  const unavailable = { braidCount: "unavailable", braids: [], reason: "Requires complete, disjoint source-declared braid memberships covering the constituent inventory." };
  if (!Array.isArray(inventory) || !inventory.length || !Array.isArray(groups) || !groups.length) return unavailable;
  const ids = new Set(inventory.map((row) => row?.id));
  const groupIds = new Set(), covered = new Set();
  if (ids.size !== inventory.length || inventory.some((row) => typeof row?.id !== "string" || !row.id)) return unavailable;
  for (const group of groups) {
    if (typeof group?.id !== "string" || !group.id || groupIds.has(group.id) || !Array.isArray(group.members) || !group.members.length) return unavailable;
    groupIds.add(group.id);
    for (const id of group.members) {
      if (!ids.has(id) || covered.has(id)) return unavailable;
      covered.add(id);
    }
  }
  if (covered.size !== ids.size) return unavailable;
  return { braidCount: String(groups.length), braids: groups.map((group) => ({ id: group.id, members: [...group.members], memberCount: group.members.length })),
    reason: `${groups.length} source-declared component braid${groups.length === 1 ? "" : "s"} cover the assembly without overlap. This characteristic reports explicit source membership; it does not assert independent binding.` };
}

export function validateLibraryClassifications(value) {
  if (value?.schema !== "borg-library-classifications.v3" || value.authority !== "operator" || typeof value.revision !== "string" || !value.revision || typeof value.source !== "string" || !value.source) throw new TypeError("Invalid library classification authority or revision.");
  if ("nested" in value || "radii" in value) throw new TypeError("Radius equality is source-derived; retired nesting assignments cannot override it.");
  for (const facet of ["spindle"]) {
    if (!Array.isArray(value[facet])) throw new TypeError(`Missing ${facet} classification rows.`);
    const hashes = new Set();
    for (const row of value[facet]) {
      if (!/^[a-f0-9]{64}$/.test(row?.recordSha256) || hashes.has(row.recordSha256)) throw new TypeError(`Invalid or duplicate ${facet} record pin.`);
      if (typeof row.value !== "boolean") throw new TypeError(`Missing boolean ${facet} classification value.`);
      hashes.add(row.recordSha256);
    }
  }
  return value;
}

export function recordClassification(classifications, recordSha256, facet) {
  return classifications?.[facet]?.find((row) => row.recordSha256 === recordSha256)?.value ?? null;
}

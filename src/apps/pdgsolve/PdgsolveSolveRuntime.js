import {
  classifyPdgsolveRequestScenario,
  solvePdgsolveRowSearch,
} from "./PdgsolveRowSearchRuntime.js";

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

export { classifyPdgsolveRequestScenario };

export function solvePdgsolveRequest(request = {}) {
  return solvePdgsolveRowSearch(request);
}

export function selectPdgsolveResultFamily(result = {}, familyId = "") {
  const normalizedFamilyId = normalizeText(familyId);
  const families = Array.isArray(result?.optionFamilies) ? result.optionFamilies : [];
  if (normalizedFamilyId) {
    return families.find((family) => family.familyId === normalizedFamilyId) ?? null;
  }
  return families.find((family) => family.familyId === result?.bestFamilyId) ?? families[0] ?? null;
}

const NOETHER_PAIR_CORE_POLARITIES = Object.freeze(["pro", "anti"]);
const NOETHER_QUAD_CORE_POLARITIES = Object.freeze(["pro", "anti", "pro", "anti"]);

const noetherAssemblyDisplayLabels = Object.freeze({
  noether_pair: "Noether Pair",
  noether_quad: "Noether Quad",
});

const noetherAssemblyCorePolarities = Object.freeze({
  noether_pair: NOETHER_PAIR_CORE_POLARITIES,
  noether_quad: NOETHER_QUAD_CORE_POLARITIES,
});

function normalizeText(value = "") {
  return String(value ?? "").trim().toLowerCase();
}

export function normalizeStructureAssemblyTemplateId(templateId = "") {
  return normalizeText(templateId);
}

export function getStructureAssemblyDisplayLabel(templateId = "", fallbackLabel = "") {
  const normalizedTemplateId = normalizeText(templateId);
  return (
    noetherAssemblyDisplayLabels[normalizedTemplateId] ??
    String(fallbackLabel ?? "").trim()
  );
}

export function getStructureAssemblyCorePolarities(templateId = "") {
  return (
    noetherAssemblyCorePolarities[normalizeText(templateId)] ??
    Object.freeze([])
  );
}

export function isNoetherAssemblyTemplateId(templateId = "") {
  return getStructureAssemblyCorePolarities(templateId).length > 0;
}

export function isNoetherQuadTemplateId(templateId = "") {
  return normalizeStructureAssemblyTemplateId(templateId) === "noether_quad";
}

const NOETHER_PAIR_CORE_ORIENTATIONS = Object.freeze(["pro", "anti"]);
const NOETHER_QUAD_CORE_ORIENTATIONS = Object.freeze(["pro", "anti", "pro", "anti"]);

const noetherAssemblyDisplayLabels = Object.freeze({
  noether_pair: "Pro/anti-orientation Noether-braid composite",
  noether_quad: "Noether Quad",
});

const noetherAssemblyCoreOrientations = Object.freeze({
  noether_pair: NOETHER_PAIR_CORE_ORIENTATIONS,
  noether_quad: NOETHER_QUAD_CORE_ORIENTATIONS,
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

export function getStructureAssemblyCoreOrientations(templateId = "") {
  return (
    noetherAssemblyCoreOrientations[normalizeText(templateId)] ??
    Object.freeze([])
  );
}

export function isNoetherAssemblyTemplateId(templateId = "") {
  return getStructureAssemblyCoreOrientations(templateId).length > 0;
}

export function isNoetherQuadTemplateId(templateId = "") {
  return normalizeStructureAssemblyTemplateId(templateId) === "noether_quad";
}

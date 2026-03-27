const HIGGS_CLUSTER_REACTION_MODES = Object.freeze(["associate", "dissociate"]);

function normalizeTemplateId(templateId = "") {
  return String(templateId ?? "").trim().toLowerCase();
}

function normalizeSide(side = "") {
  return String(side ?? "").trim().toLowerCase();
}

export function supportsReactionCompositeModes(templateId = "") {
  return normalizeTemplateId(templateId) === "higgs_cluster";
}

export function getSupportedReactionCompositeModes(templateId = "") {
  return supportsReactionCompositeModes(templateId) ? HIGGS_CLUSTER_REACTION_MODES : [];
}

export function getDefaultReactionCompositeMode(templateId = "", side = "") {
  if (!supportsReactionCompositeModes(templateId)) {
    return "";
  }
  return normalizeSide(side) === "product" ? "dissociate" : "associate";
}

export function normalizeReactionCompositeMode(templateId = "", mode = "", side = "") {
  const supportedModes = getSupportedReactionCompositeModes(templateId);
  if (!supportedModes.length) {
    return "";
  }
  const normalizedMode = String(mode ?? "").trim().toLowerCase();
  if (supportedModes.includes(normalizedMode)) {
    return normalizedMode;
  }
  return getDefaultReactionCompositeMode(templateId, side);
}

export function getReactionCompositeModeLabel(mode = "") {
  return String(mode ?? "").trim().toLowerCase() === "dissociate"
    ? "Dissociate"
    : "Associate";
}

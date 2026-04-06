import reactionObjectRegistryJson from "./ReactionObjectRegistryData.js";

import { STRUCTURE_SLOT_ORDER } from "../../domain/structure/StructureSchema.js";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function normalizeLowerText(value = "") {
  return normalizeText(value).toLowerCase();
}

function normalizeOccupiedCount(value = null) {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  return Math.max(0, Math.round(Number(value) || 0));
}

function buildAliasTemplateIdMap() {
  const aliasMap = new Map();
  Object.entries(reactionObjectRegistryJson?.templates ?? {}).forEach(([templateId, spec]) => {
    aliasMap.set(normalizeLowerText(templateId), normalizeLowerText(templateId));
    (Array.isArray(spec?.aliases) ? spec.aliases : []).forEach((alias) => {
      const normalizedAlias = normalizeLowerText(alias);
      if (normalizedAlias) {
        aliasMap.set(normalizedAlias, normalizeLowerText(templateId));
      }
    });
  });
  return aliasMap;
}

const reactionObjectAliasTemplateIdMap = buildAliasTemplateIdMap();

function cloneEntry(entry = null) {
  if (!entry || typeof entry !== "object") {
    return entry;
  }
  if (typeof globalThis.structuredClone === "function") {
    return globalThis.structuredClone(entry);
  }
  return JSON.parse(JSON.stringify(entry));
}

function getTemplateSpecRecord(templateId = "") {
  const normalizedTemplateId = normalizeReactionObjectTemplateId(templateId);
  return reactionObjectRegistryJson?.templates?.[normalizedTemplateId] ?? null;
}

function resolveVariantEntries(templateId = "") {
  return Array.isArray(getTemplateSpecRecord(templateId)?.variants)
    ? getTemplateSpecRecord(templateId).variants
    : [];
}

export function inferReactionOccupiedCountFromLabel(templateId = "", label = "") {
  const normalizedLabel = stripLeadingParticipantPolarity(label).toLowerCase();
  if (!normalizedLabel) {
    return null;
  }
  const matchedVariant = resolveVariantEntries(templateId).find((variant) => {
    return stripLeadingParticipantPolarity(variant?.label).toLowerCase() === normalizedLabel;
  });
  return normalizeOccupiedCount(matchedVariant?.occupiedCount);
}

function resolveOccupiedCountFromOptions(options = {}) {
  if (Array.isArray(options?.occupiedSlots) && options.occupiedSlots.length) {
    return normalizeOccupiedCount(options.occupiedSlots.length);
  }
  const inferredFromLabel = inferReactionOccupiedCountFromLabel(options?.templateId, options?.label);
  if (inferredFromLabel !== null) {
    return inferredFromLabel;
  }
  return normalizeOccupiedCount(options?.occupiedCount);
}

function resolveVariantRecord(templateId = "", options = {}) {
  const variants = resolveVariantEntries(templateId);
  if (!variants.length) {
    return null;
  }
  const occupiedCount = resolveOccupiedCountFromOptions(options);
  if (occupiedCount !== null) {
    const exactVariant = variants.find(
      (variant) => normalizeOccupiedCount(variant?.occupiedCount) === occupiedCount
    );
    if (exactVariant) {
      return exactVariant;
    }
  }
  const defaultCount = normalizeOccupiedCount(getTemplateSpecRecord(templateId)?.structure?.defaultOccupiedCount);
  return (
    variants.find((variant) => normalizeOccupiedCount(variant?.occupiedCount) === defaultCount) ??
    variants[variants.length - 1] ??
    null
  );
}

function stripLeadingParticipantPolarity(label = "") {
  return normalizeText(label).replace(/^(pro|anti)\s+/i, "") || normalizeText(label);
}

export const reactionObjectRegistrySchema =
  reactionObjectRegistryJson?.schema ?? "reaction-object-registry/v1";

export const reactionObjectRegistryPickerColumns = Object.freeze(
  (Array.isArray(reactionObjectRegistryJson?.pickerColumns)
    ? reactionObjectRegistryJson.pickerColumns
    : []
  ).map((column) =>
    Object.freeze({
      id: normalizeText(column?.id),
      entries: Object.freeze(
        (Array.isArray(column?.entries) ? column.entries : []).map((entry) =>
          Object.freeze(cloneEntry(entry))
        )
      ),
    })
  )
);

export const reactionObjectRegistryCenterAssemblyPickerEntries = Object.freeze(
  (Array.isArray(reactionObjectRegistryJson?.centerAssemblyPickerEntries)
    ? reactionObjectRegistryJson.centerAssemblyPickerEntries
    : []
  ).map((entry) => Object.freeze(cloneEntry(entry)))
);

export const reactionObjectRegistryOperatorEntries = Object.freeze(
  (Array.isArray(reactionObjectRegistryJson?.operatorEntries)
    ? reactionObjectRegistryJson.operatorEntries
    : []
  ).map((entry) => Object.freeze(cloneEntry(entry)))
);

export function normalizeReactionObjectTemplateId(templateId = "") {
  const normalizedTemplateId = normalizeLowerText(templateId);
  return reactionObjectAliasTemplateIdMap.get(normalizedTemplateId) ?? normalizedTemplateId;
}

export function getReactionObjectSpec(templateId = "") {
  const normalizedTemplateId = normalizeReactionObjectTemplateId(templateId);
  if (!normalizedTemplateId) {
    return null;
  }
  const spec = getTemplateSpecRecord(normalizedTemplateId);
  if (!spec) {
    return null;
  }
  return Object.freeze({
    templateId: normalizedTemplateId,
    ...cloneEntry(spec),
  });
}

export function supportsReactionObjectPolarity(templateId = "") {
  return Boolean(getReactionObjectSpec(templateId)?.supportsPolarity);
}

export function normalizeReactionObjectPolarity(polarity = "") {
  return normalizeLowerText(polarity) === "anti" ? "anti" : "pro";
}

export function shouldPreserveReactionLeadingPolarityLabel(templateId = "") {
  return Boolean(getReactionObjectSpec(templateId)?.preserveLeadingPolarityLabel);
}

export function getReactionObjectVariant(templateId = "", options = {}) {
  return cloneEntry(resolveVariantRecord(templateId, options));
}

export function getReactionObjectVariants(templateId = "") {
  return resolveVariantEntries(templateId).map((variant) => cloneEntry(variant));
}

export function getReactionObjectOccupiedSlots(templateId = "", options = {}) {
  if (Array.isArray(options?.occupiedSlots) && options.occupiedSlots.length) {
    return STRUCTURE_SLOT_ORDER.filter((slotName) =>
      options.occupiedSlots.map((slot) => normalizeText(slot)).includes(slotName)
    );
  }
  const variant = resolveVariantRecord(templateId, options);
  if (Array.isArray(variant?.occupiedSlots) && variant.occupiedSlots.length) {
    return STRUCTURE_SLOT_ORDER.filter((slotName) =>
      variant.occupiedSlots.map((slot) => normalizeText(slot)).includes(slotName)
    );
  }
  const defaultCount = normalizeOccupiedCount(getReactionObjectSpec(templateId)?.structure?.defaultOccupiedCount);
  if (defaultCount !== null) {
    return STRUCTURE_SLOT_ORDER.slice(0, Math.min(defaultCount, STRUCTURE_SLOT_ORDER.length));
  }
  return [...STRUCTURE_SLOT_ORDER];
}

export function getReactionObjectGeneration(templateId = "", options = {}) {
  return normalizeText(resolveVariantRecord(templateId, options)?.generation);
}

export function getReactionObjectHBasis(templateId = "", options = {}) {
  return [...(Array.isArray(resolveVariantRecord(templateId, options)?.hBasis)
    ? resolveVariantRecord(templateId, options).hBasis
    : [])];
}

export function getReactionCanonicalBaseLabel(templateId = "", options = {}) {
  const spec = getReactionObjectSpec(templateId);
  const fallbackLabel = normalizeText(options?.fallbackLabel);
  if (!spec) {
    return fallbackLabel || normalizeText(templateId) || "?";
  }
  const variant = resolveVariantRecord(templateId, options);
  if (normalizeText(variant?.label)) {
    return normalizeText(variant.label);
  }
  return normalizeText(spec.defaultLabel) || fallbackLabel || normalizeText(templateId) || "?";
}

export function formatReactionCanonicalLabel(baseLabel = "", templateId = "", polarity = "") {
  const resolvedBaseLabel = normalizeText(baseLabel) || "?";
  if (shouldPreserveReactionLeadingPolarityLabel(templateId)) {
    return resolvedBaseLabel;
  }
  if (!supportsReactionObjectPolarity(templateId)) {
    return stripLeadingParticipantPolarity(resolvedBaseLabel) || resolvedBaseLabel;
  }
  const cleanedBaseLabel = stripLeadingParticipantPolarity(resolvedBaseLabel) || "?";
  return `${normalizeReactionObjectPolarity(polarity) === "anti" ? "Anti" : "Pro"} ${cleanedBaseLabel}`;
}

export function getReactionCanonicalLabel(templateId = "", options = {}) {
  return formatReactionCanonicalLabel(
    getReactionCanonicalBaseLabel(templateId, options),
    templateId,
    options?.polarity
  );
}

export function getReactionObjectAllowedPlacementClasses(templateId = "") {
  return [...(Array.isArray(getReactionObjectSpec(templateId)?.allowedPlacementClasses)
    ? getReactionObjectSpec(templateId).allowedPlacementClasses
    : [])];
}

export function isReactionObjectPlacementAllowed(templateId = "", placementClass = "") {
  const normalizedPlacementClass = normalizeLowerText(placementClass);
  return getReactionObjectAllowedPlacementClasses(templateId).includes(normalizedPlacementClass);
}

export function getReactionObjectConnectorPolicy(templateId = "", placementClass = "") {
  const normalizedPlacementClass = normalizeLowerText(placementClass);
  if (!isReactionObjectPlacementAllowed(templateId, normalizedPlacementClass)) {
    return null;
  }
  return cloneEntry(reactionObjectRegistryJson?.placementClasses?.[normalizedPlacementClass] ?? null);
}

export const reactionObjectRegistryConnectionPolicyId =
  normalizeText(reactionObjectRegistryJson?.connectionPolicy?.policyId) ||
  "reaction-forward-lane-policy/v1";

export function getReactionConnectionPolicy() {
  return cloneEntry(reactionObjectRegistryJson?.connectionPolicy ?? null);
}

export function getReactionPlacementClassLaneNumbers(placementClass = "") {
  return [
    ...((Array.isArray(
      reactionObjectRegistryJson?.placementClasses?.[normalizeLowerText(placementClass)]?.laneNumbers
    )
      ? reactionObjectRegistryJson.placementClasses[normalizeLowerText(placementClass)].laneNumbers
      : []
    ).map((laneNumber) => Number(laneNumber)).filter((laneNumber) => Number.isInteger(laneNumber)))
  ];
}

export function isReactionConnectionAllowed(options = {}) {
  const sourcePlacementClass = normalizeLowerText(options?.sourcePlacementClass);
  const sourceRole = normalizeLowerText(options?.sourceRole);
  const sourceLaneNumber = Number(options?.sourceLaneNumber);
  const targetPlacementClass = normalizeLowerText(options?.targetPlacementClass);
  const targetRole = normalizeLowerText(options?.targetRole);
  const targetLaneNumber = Number(options?.targetLaneNumber);
  const allowedConnections = Array.isArray(reactionObjectRegistryJson?.connectionPolicy?.allowedConnections)
    ? reactionObjectRegistryJson.connectionPolicy.allowedConnections
    : [];
  return allowedConnections.some((connection) => {
    return (
      normalizeLowerText(connection?.sourcePlacementClass) === sourcePlacementClass &&
      normalizeLowerText(connection?.sourceRole) === sourceRole &&
      normalizeLowerText(connection?.targetPlacementClass) === targetPlacementClass &&
      normalizeLowerText(connection?.targetRole) === targetRole &&
      (Array.isArray(connection?.sourceLaneNumbers)
        ? connection.sourceLaneNumbers.map((value) => Number(value)).includes(sourceLaneNumber)
        : false) &&
      (Array.isArray(connection?.targetLaneNumbers)
        ? connection.targetLaneNumbers.map((value) => Number(value)).includes(targetLaneNumber)
        : false)
    );
  });
}

export function getReactionParticipantPlacementClass(participant = {}) {
  if (participant?.side === "operator") {
    return "operator";
  }
  if (participant?.surfaceColumn === "center-assembly") {
    return "center";
  }
  if (participant?.side === "product") {
    return "product";
  }
  return "reactant";
}

export function getReactionParticipantFamilyTag(templateId = "") {
  return normalizeText(getReactionObjectSpec(templateId)?.familyTag);
}

export function inferReactionGenerationFromLabel(templateId = "", label = "") {
  const matchedVariant = getReactionObjectVariants(templateId).find(
    (variant) =>
      normalizeOccupiedCount(variant?.occupiedCount) ===
      inferReactionOccupiedCountFromLabel(templateId, label)
  );
  return normalizeText(matchedVariant?.generation);
}

export function isReactionParticipantPlacementValid(participant = {}) {
  return isReactionObjectPlacementAllowed(
    participant?.templateId,
    getReactionParticipantPlacementClass(participant)
  );
}

export function getReactionAnchorAttachmentSide(anchorRole = "", endpointKind = "source") {
  const normalizedRole = normalizeText(anchorRole);
  const normalizedEndpointKind = normalizeText(endpointKind) === "target" ? "target" : "source";
  for (const connectorPolicy of Object.values(reactionObjectRegistryJson?.placementClasses ?? {})) {
    if (!connectorPolicy) {
      continue;
    }
    if (
      normalizedEndpointKind === "source" &&
      normalizeText(connectorPolicy?.outputRole) === normalizedRole
    ) {
      return normalizeText(connectorPolicy?.outputSide);
    }
    if (
      normalizedEndpointKind === "target" &&
      normalizeText(connectorPolicy?.inputRole) === normalizedRole
    ) {
      return normalizeText(connectorPolicy?.inputSide);
    }
  }
  return "";
}

export function getReactionAnchorAriaLabel(anchorRole = "", nodeLabel = "") {
  const normalizedRole = normalizeText(anchorRole);
  const labelPrefix =
    normalizedRole === "product"
      ? "Product"
      : normalizedRole === "operator-input"
        ? "Operator input"
        : normalizedRole === "operator-output"
          ? "Operator output"
          : normalizedRole === "center"
            ? "Center"
            : "Reactant";
  return `${labelPrefix} attach point for ${normalizeText(nodeLabel) || "node"}`;
}

export function inferReactionTemplateIdFromStructure(structureRoot = null) {
  const species = normalizeReactionObjectTemplateId(structureRoot?.species);
  if (species && getReactionObjectSpec(species)) {
    return species;
  }
  const family = normalizeLowerText(structureRoot?.classification?.family);
  if (family === "charged_lepton") {
    return "electron";
  }
  if (family === "neutrino") {
    return "neutrino";
  }
  if (family === "up_type_quark") {
    return "up_quark";
  }
  if (family === "down_type_quark") {
    return "down_quark";
  }
  if (normalizeLowerText(structureRoot?.kind) === "noether_core") {
    return "noether_core";
  }
  return species || "noether_core";
}

import {
  formatReactionCanonicalLabel as formatReactionCanonicalRegistryLabel,
  getReactionCanonicalBaseLabel as getReactionRegistryCanonicalBaseLabel,
  getReactionCanonicalLabel as getReactionRegistryCanonicalLabel,
  reactionObjectRegistryPickerColumns,
} from "./ReactionObjectRegistryRuntime.js";

export const reactionPickerLabelColumns = reactionObjectRegistryPickerColumns;

export function getReactionCanonicalBaseLabel(templateId = "", options = {}) {
  return getReactionRegistryCanonicalBaseLabel(templateId, options);
}

export function formatReactionCanonicalLabel(baseLabel = "", templateId = "", polarity = "") {
  return formatReactionCanonicalRegistryLabel(baseLabel, templateId, polarity);
}

export function getReactionCanonicalLabel(templateId = "", options = {}) {
  return getReactionRegistryCanonicalLabel(templateId, options);
}

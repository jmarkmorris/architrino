function normalizeText(value = "") {
  return String(value ?? "").trim().toLowerCase();
}

export const REACTION_LEFT_TERMINAL_INDEX = 0;
export const REACTION_RIGHT_TERMINAL_INDEX = 1;

export function normalizeReactionAnchorInstanceIndex(anchorInstanceIndex = null) {
  if (
    anchorInstanceIndex === null ||
    anchorInstanceIndex === undefined ||
    anchorInstanceIndex === ""
  ) {
    return null;
  }
  const normalized = Number(anchorInstanceIndex);
  return Number.isInteger(normalized) && normalized >= 0 ? normalized : null;
}

export function getReactionAnchorTerminalIndex(descriptor = {}) {
  const role =
    typeof descriptor === "object" && descriptor !== null
      ? normalizeText(descriptor.role)
      : normalizeText(descriptor);
  const anchorInstanceIndex =
    typeof descriptor === "object" && descriptor !== null
      ? normalizeReactionAnchorInstanceIndex(descriptor.anchorInstanceIndex)
      : null;

  if (role === "product" || role === "operator-input") {
    return REACTION_LEFT_TERMINAL_INDEX;
  }
  if (role === "reactant" || role === "operator-output") {
    return REACTION_RIGHT_TERMINAL_INDEX;
  }
  if (role === "center") {
    if (anchorInstanceIndex === REACTION_LEFT_TERMINAL_INDEX) {
      return REACTION_LEFT_TERMINAL_INDEX;
    }
    if (anchorInstanceIndex !== null) {
      return REACTION_RIGHT_TERMINAL_INDEX;
    }
  }
  return null;
}

export function isReactionSourceTerminal(descriptor = {}) {
  return getReactionAnchorTerminalIndex(descriptor) === REACTION_RIGHT_TERMINAL_INDEX;
}

export function isReactionTargetTerminal(descriptor = {}) {
  return getReactionAnchorTerminalIndex(descriptor) === REACTION_LEFT_TERMINAL_INDEX;
}

export function getReactionAnchorAttachmentSideFromTerminalIndex(terminalIndex = null) {
  if (terminalIndex === REACTION_LEFT_TERMINAL_INDEX) {
    return "left";
  }
  if (terminalIndex === REACTION_RIGHT_TERMINAL_INDEX) {
    return "right";
  }
  return "";
}

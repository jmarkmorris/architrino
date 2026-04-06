import {
  getReactionParticipantPlacementClass,
  isReactionConnectionAllowed,
} from "./ReactionObjectRegistryRuntime.js";
import {
  REACTION_LEFT_TERMINAL_INDEX,
  REACTION_RIGHT_TERMINAL_INDEX,
  getReactionAnchorTerminalIndex,
  normalizeReactionAnchorInstanceIndex,
} from "./ReactionAnchorTerminalRuntime.js";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function normalizeLowerText(value = "") {
  return normalizeText(value).toLowerCase();
}

function normalizeOperatorLaneNumber(operatorLaneIndex = null) {
  return Math.max(0, Math.round(Number(operatorLaneIndex) || 0)) === 0 ? 2 : 4;
}

export function getReactionMappingEndpointPlacementClass(participant = {}, role = "") {
  const normalizedRole = normalizeLowerText(role);
  if (normalizedRole === "operator-input" || normalizedRole === "operator-output") {
    return "operator";
  }
  if (normalizedRole === "center") {
    return "center";
  }
  if (normalizedRole === "product") {
    return "product";
  }
  if (normalizedRole === "reactant") {
    return "reactant";
  }
  return getReactionParticipantPlacementClass(participant);
}

export function getReactionMappingEndpointLaneNumber(participant = {}, role = "") {
  const normalizedRole = normalizeLowerText(role);
  if (normalizedRole === "operator-input" || normalizedRole === "operator-output") {
    return normalizeOperatorLaneNumber(participant?.operatorLaneIndex);
  }
  if (normalizedRole === "center") {
    return 3;
  }
  if (normalizedRole === "product") {
    return 5;
  }
  if (normalizedRole === "reactant") {
    return 1;
  }

  const placementClass = getReactionParticipantPlacementClass(participant);
  if (placementClass === "operator") {
    return normalizeOperatorLaneNumber(participant?.operatorLaneIndex);
  }
  if (placementClass === "center") {
    return 3;
  }
  if (placementClass === "product") {
    return 5;
  }
  return 1;
}

export function getReactionMappingEndpointTerminalIndex(role = "", anchorInstanceIndex = null) {
  return getReactionAnchorTerminalIndex({
    role,
    anchorInstanceIndex: normalizeReactionAnchorInstanceIndex(anchorInstanceIndex),
  });
}

export function evaluateReactionConnectionPolicy(options = {}) {
  const sourceParticipant = options?.sourceParticipant ?? null;
  const targetParticipant = options?.targetParticipant ?? null;
  const sourceRole = normalizeLowerText(options?.sourceRole);
  const targetRole = normalizeLowerText(options?.targetRole);
  const sourceAnchorInstanceIndex = normalizeReactionAnchorInstanceIndex(
    options?.sourceAnchorInstanceIndex
  );
  const targetAnchorInstanceIndex = normalizeReactionAnchorInstanceIndex(
    options?.targetAnchorInstanceIndex
  );

  if (!sourceParticipant || !targetParticipant) {
    return {
      allowed: false,
      reason: "Mapping references an unavailable source or target participant.",
    };
  }

  const sourcePlacementClass = getReactionMappingEndpointPlacementClass(
    sourceParticipant,
    sourceRole
  );
  const targetPlacementClass = getReactionMappingEndpointPlacementClass(
    targetParticipant,
    targetRole
  );
  const sourceLaneNumber = getReactionMappingEndpointLaneNumber(sourceParticipant, sourceRole);
  const targetLaneNumber = getReactionMappingEndpointLaneNumber(targetParticipant, targetRole);
  const sourceTerminalIndex = getReactionMappingEndpointTerminalIndex(
    sourceRole,
    sourceAnchorInstanceIndex
  );
  const targetTerminalIndex = getReactionMappingEndpointTerminalIndex(
    targetRole,
    targetAnchorInstanceIndex
  );

  if (sourceTerminalIndex !== REACTION_RIGHT_TERMINAL_INDEX) {
    return {
      allowed: false,
      reason: "Mappings must start from the right-side connector of the source row group.",
    };
  }
  if (targetTerminalIndex !== REACTION_LEFT_TERMINAL_INDEX) {
    return {
      allowed: false,
      reason: "Mappings must end at the left-side connector of the target row group.",
    };
  }
  if (targetLaneNumber !== sourceLaneNumber + 1) {
    return {
      allowed: false,
      reason: `Reaction mappings must advance exactly one lane at a time: lane ${sourceLaneNumber} can only connect to lane ${sourceLaneNumber + 1}.`,
    };
  }
  if (
    !isReactionConnectionAllowed({
      sourcePlacementClass,
      sourceRole,
      sourceLaneNumber,
      targetPlacementClass,
      targetRole,
      targetLaneNumber,
    })
  ) {
    return {
      allowed: false,
      reason: `The ${sourcePlacementClass} ${sourceRole || "source"} connector cannot feed the ${targetPlacementClass} ${targetRole || "target"} connector in the next lane.`,
    };
  }

  return {
    allowed: true,
    reason: "",
  };
}

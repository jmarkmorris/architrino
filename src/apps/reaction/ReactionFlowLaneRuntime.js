function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function normalizeInteger(value, fallback = null) {
  const normalized = Number(value);
  return Number.isInteger(normalized) ? normalized : fallback;
}

export const REACTION_FLOW_LANE = Object.freeze({
  REACTANT: 1,
  LEFT_OPERATOR: 2,
  CENTER: 3,
  RIGHT_OPERATOR: 4,
  PRODUCT: 5,
});

export function normalizeReactionDocumentOperatorLane(lane = null) {
  const normalizedLane = normalizeInteger(lane, null);
  if (normalizedLane === REACTION_FLOW_LANE.LEFT_OPERATOR || normalizedLane === 0) {
    return REACTION_FLOW_LANE.LEFT_OPERATOR;
  }
  if (normalizedLane === REACTION_FLOW_LANE.RIGHT_OPERATOR || normalizedLane === 1) {
    return REACTION_FLOW_LANE.RIGHT_OPERATOR;
  }
  return null;
}

export function normalizeReactionSnapshotOperatorLaneIndex(lane = null) {
  const normalizedLane = normalizeInteger(lane, null);
  if (normalizedLane === REACTION_FLOW_LANE.RIGHT_OPERATOR || normalizedLane === 1) {
    return 1;
  }
  return 0;
}

export function getReactionDocumentColumnForLane(lane = null) {
  const normalizedLane = normalizeInteger(lane, null);
  if (normalizedLane === REACTION_FLOW_LANE.REACTANT) {
    return "left";
  }
  if (normalizedLane === REACTION_FLOW_LANE.CENTER) {
    return "center";
  }
  if (normalizedLane === REACTION_FLOW_LANE.PRODUCT) {
    return "right";
  }
  return "";
}

export function inferReactionDocumentLaneFromLayout(layout = {}, side = "") {
  const explicitLane = normalizeInteger(layout?.lane, null);
  if (explicitLane !== null) {
    return explicitLane;
  }
  const column = normalizeText(layout?.column).toLowerCase();
  if (column === "left") {
    return REACTION_FLOW_LANE.REACTANT;
  }
  if (column === "center") {
    return REACTION_FLOW_LANE.CENTER;
  }
  if (column === "right") {
    return REACTION_FLOW_LANE.PRODUCT;
  }
  const normalizedSide = normalizeText(side).toLowerCase();
  if (normalizedSide === "product") {
    return REACTION_FLOW_LANE.PRODUCT;
  }
  if (normalizedSide === "intermediate") {
    return REACTION_FLOW_LANE.CENTER;
  }
  return REACTION_FLOW_LANE.REACTANT;
}

export function getReactionSnapshotLaneNumber(participant = {}) {
  if (participant?.side === "operator") {
    return normalizeReactionDocumentOperatorLane(participant?.operatorLaneIndex);
  }
  if (participant?.surfaceColumn === "center-assembly") {
    return REACTION_FLOW_LANE.CENTER;
  }
  if (participant?.side === "product") {
    return REACTION_FLOW_LANE.PRODUCT;
  }
  return REACTION_FLOW_LANE.REACTANT;
}

export function isAdjacentReactionLaneProgress(sourceLane = null, targetLane = null) {
  return normalizeInteger(targetLane, null) - normalizeInteger(sourceLane, null) === 1;
}

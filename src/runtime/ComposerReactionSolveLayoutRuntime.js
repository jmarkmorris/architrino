import { REACTION_SOLVER_SURFACE_ROW_COUNT } from "./ComposerReactionSolverLayoutRuntime.js";

function normalizeSurfaceRowIndex(rowIndex = 0) {
  const normalizedRowIndex = Math.round(Number(rowIndex) || 0);
  return Math.max(0, Math.min(REACTION_SOLVER_SURFACE_ROW_COUNT - 1, normalizedRowIndex));
}

function getParticipantSurfaceRowSpan(entry = null) {
  const rootNode = entry?.rootNode ?? null;
  const childCount = Array.isArray(rootNode?.children) ? rootNode.children.filter(Boolean).length : 0;
  return Math.max(1, childCount || 1);
}

function getParticipantSurfaceRowIndex(entry = null) {
  const participant = entry?.participant ?? null;
  const legacyRowIndex = participant?.side === "operator"
    ? participant?.operatorSlotIndex
    : participant?.canvasRowIndex;
  return normalizeSurfaceRowIndex(participant?.surfaceRowIndex ?? legacyRowIndex ?? 0);
}

function treeContainsNode(node = null, targetNodeId = "") {
  if (!node || !targetNodeId) {
    return false;
  }
  if (String(node.id ?? "") === targetNodeId) {
    return true;
  }
  const children = Array.isArray(node.children) ? node.children : [];
  return children.some((childNode) => treeContainsNode(childNode, targetNodeId));
}

function getTopLevelChildOffset(rootNode = null, targetNodeId = "") {
  if (!rootNode || !targetNodeId) {
    return null;
  }
  const children = Array.isArray(rootNode.children) ? rootNode.children.filter(Boolean) : [];
  const childIndex = children.findIndex((childNode) => treeContainsNode(childNode, targetNodeId));
  return childIndex >= 0 ? childIndex : null;
}

function getNodeSurfaceRow(entry = null, node = null) {
  const baseRowIndex = getParticipantSurfaceRowIndex(entry);
  const rowSpan = getParticipantSurfaceRowSpan(entry);
  const rootNode = entry?.rootNode ?? null;
  const nodeId = String(node?.id ?? "");
  if (!rootNode?.id || !nodeId) {
    return baseRowIndex;
  }
  if (String(rootNode.id) === nodeId) {
    return normalizeSurfaceRowIndex(baseRowIndex + Math.round((rowSpan - 1) / 2));
  }
  const topLevelOffset = getTopLevelChildOffset(rootNode, nodeId);
  if (topLevelOffset === null) {
    return baseRowIndex;
  }
  return normalizeSurfaceRowIndex(baseRowIndex + topLevelOffset);
}

function buildSolveEntryMap(solveState = {}) {
  const entries = [
    ...(Array.isArray(solveState.reactants) ? solveState.reactants : []),
    ...(Array.isArray(solveState.products) ? solveState.products : []),
    ...(Array.isArray(solveState.centerAssemblies) ? solveState.centerAssemblies : []),
    ...(Array.isArray(solveState.operators) ? solveState.operators : []),
  ];
  return new Map(
    entries
      .filter((entry) => entry?.participant?.id)
      .map((entry) => [String(entry.participant.id), entry])
  );
}

function resolveConnectedRowIndex(mapping = null, operatorRef = "", entryMap = new Map()) {
  if (String(mapping?.targetEndpoint?.participantRef ?? "") === operatorRef) {
    const participantId = String(mapping?.sourceParticipant?.id ?? "");
    const entry = entryMap.get(participantId) ?? null;
    return getNodeSurfaceRow(entry, mapping?.sourceNode ?? null);
  }
  if (String(mapping?.sourceEndpoint?.participantRef ?? "") === operatorRef) {
    const participantId = String(mapping?.targetParticipant?.id ?? "");
    const entry = entryMap.get(participantId) ?? null;
    return getNodeSurfaceRow(entry, mapping?.targetNode ?? null);
  }
  return null;
}

function getRowCenter(rowIndexes = []) {
  const resolvedRows = rowIndexes.filter((rowIndex) => Number.isFinite(rowIndex));
  if (!resolvedRows.length) {
    return null;
  }
  return resolvedRows.reduce((sum, rowIndex) => sum + rowIndex, 0) / resolvedRows.length;
}

function buildOperatorPlacementRequest(addition = null, plan = {}, entryMap = new Map()) {
  const operatorRef = String(addition?.ref ?? "");
  if (!operatorRef) {
    return null;
  }
  const sourceRowIndexes = [];
  const targetRowIndexes = [];
  (Array.isArray(plan?.selectedMappings) ? plan.selectedMappings : []).forEach((mapping) => {
    const resolvedRowIndex = resolveConnectedRowIndex(mapping, operatorRef, entryMap);
    if (!Number.isFinite(resolvedRowIndex)) {
      return;
    }
    if (String(mapping?.targetEndpoint?.participantRef ?? "") === operatorRef) {
      sourceRowIndexes.push(resolvedRowIndex);
      return;
    }
    if (String(mapping?.sourceEndpoint?.participantRef ?? "") === operatorRef) {
      targetRowIndexes.push(resolvedRowIndex);
    }
  });
  const connectedRowIndexes = [...sourceRowIndexes, ...targetRowIndexes];
  if (!connectedRowIndexes.length) {
    return {
      ...addition,
      operatorSlotIndex: 0,
      connectedRowIndexes: [],
      sourceRowIndexes: [],
      targetRowIndexes: [],
      rowSpan: 0,
      targetRowIndex: 0,
    };
  }
  const minRowIndex = Math.min(...connectedRowIndexes);
  const maxRowIndex = Math.max(...connectedRowIndexes);
  const sourceCenter = getRowCenter(sourceRowIndexes);
  const targetCenter = getRowCenter(targetRowIndexes);
  const preferredCenter =
    String(addition?.templateId ?? "") === "associate" && Number.isFinite(targetCenter)
      ? targetCenter
      : targetCenter ?? sourceCenter ?? getRowCenter(connectedRowIndexes) ?? 0;
  const targetRowIndex = normalizeSurfaceRowIndex(preferredCenter);
  return {
    ...addition,
    connectedRowIndexes,
    sourceRowIndexes,
    targetRowIndexes,
    rowSpan: maxRowIndex - minRowIndex,
    targetRowIndex,
  };
}

function compareOperatorPlacementRequests(left = null, right = null) {
  const spanDelta = Number(left?.rowSpan ?? 0) - Number(right?.rowSpan ?? 0);
  if (spanDelta !== 0) {
    return spanDelta;
  }
  const targetDelta = Number(left?.targetRowIndex ?? 0) - Number(right?.targetRowIndex ?? 0);
  if (targetDelta !== 0) {
    return targetDelta;
  }
  return String(left?.ref ?? "").localeCompare(String(right?.ref ?? ""));
}

function findNearestAvailableRowIndex(targetRowIndex = 0, occupiedRowIndexes = new Set()) {
  const resolvedTargetRowIndex = normalizeSurfaceRowIndex(targetRowIndex);
  for (let distance = 0; distance < REACTION_SOLVER_SURFACE_ROW_COUNT; distance += 1) {
    const upwardCandidate = resolvedTargetRowIndex - distance;
    if (upwardCandidate >= 0 && !occupiedRowIndexes.has(upwardCandidate)) {
      return upwardCandidate;
    }
    const downwardCandidate = resolvedTargetRowIndex + distance;
    if (
      distance > 0 &&
      downwardCandidate < REACTION_SOLVER_SURFACE_ROW_COUNT &&
      !occupiedRowIndexes.has(downwardCandidate)
    ) {
      return downwardCandidate;
    }
  }
  return resolvedTargetRowIndex;
}

export function applyComposerReactionSolveLayout(options = {}) {
  const plan = options.plan ?? {};
  const solveState = options.solveState ?? {};
  const participantAdditions = Array.isArray(plan.participantAdditions)
    ? plan.participantAdditions
    : [];
  if (!participantAdditions.length) {
    return plan;
  }
  const entryMap = buildSolveEntryMap(solveState);
  const occupiedRowsByLane = new Map();
  (Array.isArray(solveState.operators) ? solveState.operators : []).forEach((entry) => {
    const laneIndex = Math.max(0, Math.round(Number(entry?.participant?.operatorLaneIndex) || 0));
    const occupiedRows = occupiedRowsByLane.get(laneIndex) ?? new Set();
    occupiedRows.add(getParticipantSurfaceRowIndex(entry));
    occupiedRowsByLane.set(laneIndex, occupiedRows);
  });

  const placementByRef = new Map();
  participantAdditions
    .map((addition) => buildOperatorPlacementRequest(addition, plan, entryMap))
    .filter(Boolean)
    .sort(compareOperatorPlacementRequests)
    .forEach((request) => {
      const laneIndex = Math.max(0, Math.round(Number(request.operatorLaneIndex) || 0));
      const occupiedRows = occupiedRowsByLane.get(laneIndex) ?? new Set();
      const operatorSlotIndex = findNearestAvailableRowIndex(
        request.targetRowIndex,
        occupiedRows
      );
      occupiedRows.add(operatorSlotIndex);
      occupiedRowsByLane.set(laneIndex, occupiedRows);
      placementByRef.set(String(request.ref), operatorSlotIndex);
    });

  return {
    ...plan,
    participantAdditions: participantAdditions.map((addition) => ({
      ...addition,
      operatorSlotIndex:
        placementByRef.get(String(addition?.ref ?? "")) ??
        normalizeSurfaceRowIndex(addition?.operatorSlotIndex ?? 0),
    })),
  };
}

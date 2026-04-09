export function buildReactionNodeKey(participantId, nodeId) {
  return `${participantId}::${nodeId}`;
}

export function parseReactionNodeKey(nodeKey) {
  const [participantId = "", ...rest] = String(nodeKey ?? "").split("::");
  return {
    participantId,
    nodeId: rest.join("::"),
  };
}

function isSameOrAncestorReactionNodePath(candidatePath, targetPath) {
  if (!candidatePath || !targetPath) {
    return false;
  }
  return targetPath === candidatePath || targetPath.startsWith(`${candidatePath}/`);
}

export function reactionNodeKeysConflict(leftKey, rightKey) {
  const left = parseReactionNodeKey(leftKey);
  const right = parseReactionNodeKey(rightKey);
  if (!left.participantId || !right.participantId || left.participantId !== right.participantId) {
    return false;
  }
  return (
    isSameOrAncestorReactionNodePath(left.nodeId, right.nodeId) ||
    isSameOrAncestorReactionNodePath(right.nodeId, left.nodeId)
  );
}

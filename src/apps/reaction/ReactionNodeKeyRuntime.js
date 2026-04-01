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

function resolveParticipantRootNode(getParticipantRootNode, participant = null) {
  return typeof getParticipantRootNode === "function" ? getParticipantRootNode(participant) : null;
}

function resolveMappingEndpoint(endpoint = {}, addedParticipantMap = new Map(), options = {}) {
  const getParticipantRootNode = options.getParticipantRootNode;
  const buildNodeKey = options.buildNodeKey;
  if (endpoint?.nodeKey) {
    return {
      nodeKey: endpoint.nodeKey,
      role: endpoint.role,
      anchorInstanceIndex: endpoint.anchorInstanceIndex ?? null,
    };
  }
  const participant =
    endpoint?.participant ??
    addedParticipantMap.get(String(endpoint?.participantRef ?? "").trim()) ??
    null;
  const rootNode =
    endpoint?.node ??
    resolveParticipantRootNode(getParticipantRootNode, participant);
  if (!participant?.id || !rootNode?.id || typeof buildNodeKey !== "function") {
    return null;
  }
  return {
    nodeKey: buildNodeKey(participant.id, rootNode.id),
    role: endpoint.role,
    anchorInstanceIndex: endpoint.anchorInstanceIndex ?? null,
  };
}

export function applyComposerReactionSolvePlan(options = {}) {
  const plan = options.plan ?? {};
  const participantAdditions = Array.isArray(plan.participantAdditions)
    ? plan.participantAdditions
    : [];
  const dissociatedCompositeParticipants = Array.isArray(plan.dissociatedCompositeParticipants)
    ? plan.dissociatedCompositeParticipants.filter(Boolean)
    : [];
  const selectedMappings = Array.isArray(plan.selectedMappings) ? plan.selectedMappings : [];
  const createOperatorParticipant =
    typeof options.createOperatorParticipant === "function"
      ? options.createOperatorParticipant
      : null;
  const getParticipantRootNode =
    typeof options.getParticipantRootNode === "function"
      ? options.getParticipantRootNode
      : null;
  const buildNodeKey =
    typeof options.buildNodeKey === "function" ? options.buildNodeKey : null;
  const addOrReplaceMapping =
    typeof options.addOrReplaceMapping === "function" ? options.addOrReplaceMapping : null;
  const markParticipantAutoDissociated =
    typeof options.markParticipantAutoDissociated === "function"
      ? options.markParticipantAutoDissociated
      : null;

  const addedParticipantMap = new Map();
  const addedParticipants = [];
  participantAdditions.forEach((addition) => {
    if (addition?.kind !== "operator" || !createOperatorParticipant) {
      return;
    }
    const participant = createOperatorParticipant(
      addition.templateId,
      addition.operatorLaneIndex,
      {
        render: false,
        announce: false,
        operatorSlotIndex: addition.operatorSlotIndex ?? null,
        isSolveGenerated: true,
      }
    );
    if (!participant) {
      return;
    }
    const ref = String(addition.ref ?? "").trim();
    if (ref) {
      addedParticipantMap.set(ref, participant);
    }
    addedParticipants.push(participant);
  });

  const markedDissociatedParticipantIds = [];
  dissociatedCompositeParticipants.forEach((participant) => {
    if (!participant?.id) {
      return;
    }
    const wasMarked = markParticipantAutoDissociated
      ? markParticipantAutoDissociated(participant)
      : (() => {
          if (participant.isDissociatedComposite || participant.isAutoDissociatedComposite) {
            return false;
          }
          participant.isAutoDissociatedComposite = true;
          return true;
        })();
    if (wasMarked) {
      markedDissociatedParticipantIds.push(String(participant.id));
    }
  });

  const appliedMappingIds = [];
  selectedMappings.forEach((mapping) => {
    if (!addOrReplaceMapping) {
      return;
    }
    const sourceEndpoint = resolveMappingEndpoint(
      mapping.sourceEndpoint ?? {
        nodeKey: mapping.sourceKey,
        role: mapping.sourceRole,
        anchorInstanceIndex: mapping.sourceAnchorInstanceIndex ?? null,
      },
      addedParticipantMap,
      { getParticipantRootNode, buildNodeKey }
    );
    const targetEndpoint = resolveMappingEndpoint(
      mapping.targetEndpoint ?? {
        nodeKey: mapping.targetKey,
        role: mapping.targetRole,
        anchorInstanceIndex: mapping.targetAnchorInstanceIndex ?? null,
      },
      addedParticipantMap,
      { getParticipantRootNode, buildNodeKey }
    );
    if (!sourceEndpoint?.nodeKey || !targetEndpoint?.nodeKey) {
      return;
    }
    appliedMappingIds.push(
      addOrReplaceMapping(
        sourceEndpoint.nodeKey,
        sourceEndpoint.role,
        targetEndpoint.nodeKey,
        targetEndpoint.role,
        {
          sourceAnchorInstanceIndex: sourceEndpoint.anchorInstanceIndex,
          targetAnchorInstanceIndex: targetEndpoint.anchorInstanceIndex,
        }
      )
    );
  });

  return {
    addedParticipants,
    appliedMappingIds,
    markedDissociatedParticipantIds,
  };
}

import { findReactionStructureDescriptorNode } from "./ReactionStructureDescriptorRuntime.js";
import { buildReactionSolveProjectionPlanFromSolverResult } from "./ReactionSolverResultAdapterRuntime.js";

function resolveParticipantRootNode(getParticipantRootNode, participant = null) {
  return typeof getParticipantRootNode === "function" ? getParticipantRootNode(participant) : null;
}

function resolveParticipantById(participantId = "", options = {}) {
  const normalizedParticipantId = String(participantId ?? "").trim();
  if (!normalizedParticipantId) {
    return null;
  }
  if (typeof options.getParticipantById === "function") {
    return options.getParticipantById(normalizedParticipantId) ?? null;
  }
  const participants = Array.isArray(options.participants) ? options.participants : [];
  return (
    participants.find(
      (participant) => String(participant?.id ?? "").trim() === normalizedParticipantId
    ) ?? null
  );
}

function defaultFindParticipantNodeById(participant = null, anchorId = "", options = {}) {
  const normalizedAnchorId = String(anchorId ?? "").trim();
  if (!participant || !normalizedAnchorId) {
    return null;
  }
  const rootNode = resolveParticipantRootNode(options.getParticipantRootNode, participant);
  if (String(rootNode?.id ?? "").trim() === normalizedAnchorId) {
    return rootNode;
  }
  return findReactionStructureDescriptorNode(participant?.hierarchy, normalizedAnchorId) ?? null;
}

function resolveParticipantAnchorNode(endpoint = {}, participant = null, options = {}) {
  const getParticipantRootNode = options.getParticipantRootNode;
  const normalizedAnchorId = String(endpoint?.anchorId ?? "").trim();
  const rootNode = resolveParticipantRootNode(getParticipantRootNode, participant);
  if (!normalizedAnchorId) {
    return rootNode;
  }
  const findParticipantNodeById =
    typeof options.findParticipantNodeById === "function"
      ? options.findParticipantNodeById
      : defaultFindParticipantNodeById;
  const anchoredNode =
    findParticipantNodeById(participant, normalizedAnchorId, { getParticipantRootNode }) ?? null;
  if (anchoredNode) {
    return anchoredNode;
  }
  if (endpoint?.participantRef) {
    return rootNode;
  }
  return null;
}

function resolveMappingEndpoint(endpoint = {}, addedParticipantMap = new Map(), options = {}) {
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
    resolveParticipantById(endpoint?.participantId, options) ??
    null;
  const rootNode =
    endpoint?.node ??
    resolveParticipantAnchorNode(endpoint, participant, options);
  if (!participant?.id || !rootNode?.id || typeof buildNodeKey !== "function") {
    return null;
  }
  return {
    nodeKey: buildNodeKey(participant.id, rootNode.id),
    role: endpoint.role,
    anchorInstanceIndex: endpoint.anchorInstanceIndex ?? null,
  };
}

export function applyReactionSolvePlan(options = {}) {
  const plan =
    options.plan ??
    (options.result ? buildReactionSolveProjectionPlanFromSolverResult(options.result) : {});
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
  dissociatedCompositeParticipants.forEach((participantOrId) => {
    const participant =
      typeof participantOrId === "string"
        ? resolveParticipantById(participantOrId, options)
        : participantOrId;
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
      {
        ...options,
        getParticipantRootNode,
        buildNodeKey,
      }
    );
    const targetEndpoint = resolveMappingEndpoint(
      mapping.targetEndpoint ?? {
        nodeKey: mapping.targetKey,
        role: mapping.targetRole,
        anchorInstanceIndex: mapping.targetAnchorInstanceIndex ?? null,
      },
      addedParticipantMap,
      {
        ...options,
        getParticipantRootNode,
        buildNodeKey,
      }
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

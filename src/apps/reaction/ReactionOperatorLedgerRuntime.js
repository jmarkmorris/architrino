import {
  addReactionLedgers,
  createEmptyReactionLedger,
  hasReactionLedger,
  reactionLedgerFitsWithin,
  reactionLedgersMatch,
  subtractReactionLedgers,
} from "./ReactionLedgerRuntime.js";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function normalizeAnchorInstanceIndex(anchorInstanceIndex = null) {
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

export function createReactionOperatorLedgerRuntime(options = {}) {
  const findParticipantById =
    typeof options?.findParticipantById === "function" ? options.findParticipantById : () => null;
  const getMappings =
    typeof options?.getMappings === "function" ? options.getMappings : () => [];
  const getNodeLedger =
    typeof options?.getNodeLedger === "function"
      ? options.getNodeLedger
      : () => createEmptyReactionLedger();
  const parseNodeKey =
    typeof options?.parseNodeKey === "function"
      ? options.parseNodeKey
      : () => ({ participantId: "" });
  const resolveOperatorOutputLedger =
    typeof options?.resolveOperatorOutputLedger === "function"
      ? options.resolveOperatorOutputLedger
      : (_participant, operatorSummary = null, _anchorInstanceIndex = null) =>
          hasReactionLedger(operatorSummary?.outputLedger)
            ? operatorSummary.outputLedger
            : operatorSummary?.incomingLedger;

  function getOperatorLedgerSummary(participantId = "") {
    const cache = new Map();
    const activeStack = new Set();

    function resolveOperatorSummary(targetParticipantId = "") {
      const normalizedParticipantId = normalizeText(targetParticipantId);
      if (!normalizedParticipantId) {
        return {
          incomingLedger: createEmptyReactionLedger(),
          outputLedger: createEmptyReactionLedger(),
          outgoingLedger: createEmptyReactionLedger(),
          routedOutgoingLedger: createEmptyReactionLedger(),
          undischargedLedger: createEmptyReactionLedger(),
          incomingCount: 0,
          outgoingCount: 0,
          isOpen: false,
          isInvalid: false,
          isBalanced: false,
        };
      }
      if (cache.has(normalizedParticipantId)) {
        return cache.get(normalizedParticipantId);
      }
      if (activeStack.has(normalizedParticipantId)) {
        return {
          incomingLedger: createEmptyReactionLedger(),
          outputLedger: createEmptyReactionLedger(),
          outgoingLedger: createEmptyReactionLedger(),
          routedOutgoingLedger: createEmptyReactionLedger(),
          undischargedLedger: createEmptyReactionLedger(),
          incomingCount: 0,
          outgoingCount: 0,
          isOpen: false,
          isInvalid: false,
          isBalanced: false,
        };
      }

      activeStack.add(normalizedParticipantId);
      const participant = findParticipantById(normalizedParticipantId);
      const mappings = getMappings();
      const incomingMappings = mappings.filter((mapping) => {
        const { participantId: mappingTargetParticipantId } = parseNodeKey(mapping?.targetKey);
        return (
          mappingTargetParticipantId === normalizedParticipantId &&
          mapping?.targetRole === "operator-input"
        );
      });
      const outgoingMappings = mappings.filter((mapping) => {
        const { participantId: mappingSourceParticipantId } = parseNodeKey(mapping?.sourceKey);
        return (
          mappingSourceParticipantId === normalizedParticipantId &&
          mapping?.sourceRole === "operator-output"
        );
      });
      const incomingLedger = incomingMappings.reduce((ledger, mapping) => {
        const sourceLedger =
          mapping?.sourceRole === "operator-output"
            ? resolveOperatorSummary(parseNodeKey(mapping?.sourceKey).participantId).outputLedger
            : getNodeLedger(mapping?.sourceKey);
        return addReactionLedgers(ledger, sourceLedger);
      }, createEmptyReactionLedger());
      const outputLedger =
        participant?.side === "operator" && hasReactionLedger(incomingLedger)
          ? { ...incomingLedger }
          : createEmptyReactionLedger();
      const outputLedgerByAnchorInstance = {
        0: resolveOperatorOutputLedger(participant, { incomingLedger, outputLedger }, 0),
      };
      const routedOutgoingLedgerByAnchorInstance = {};
      const routedOutgoingLedger = outgoingMappings.reduce((ledger, mapping) => {
        const sourceAnchorInstanceIndex =
          normalizeAnchorInstanceIndex(mapping?.sourceAnchorInstanceIndex) ?? 0;
        const mappedLedger =
          mapping?.targetRole === "operator-input"
            ? (outputLedgerByAnchorInstance[sourceAnchorInstanceIndex] ?? outputLedger)
            : getNodeLedger(mapping?.targetKey);
        routedOutgoingLedgerByAnchorInstance[sourceAnchorInstanceIndex] = addReactionLedgers(
          routedOutgoingLedgerByAnchorInstance[sourceAnchorInstanceIndex] ?? createEmptyReactionLedger(),
          mappedLedger
        );
        return addReactionLedgers(ledger, mappedLedger);
      }, createEmptyReactionLedger());
      const isInvalid =
        hasReactionLedger(outputLedger) &&
        !reactionLedgerFitsWithin(outputLedger, routedOutgoingLedger);
      const isBalanced =
        hasReactionLedger(outputLedger) &&
        hasReactionLedger(routedOutgoingLedger) &&
        reactionLedgersMatch(outputLedger, routedOutgoingLedger);
      const isOpen = hasReactionLedger(outputLedger) && !isInvalid && !isBalanced;
      const summary = {
        incomingLedger,
        outputLedger,
        outputLedgerByAnchorInstance,
        outgoingLedger: routedOutgoingLedger,
        routedOutgoingLedger,
        routedOutgoingLedgerByAnchorInstance,
        undischargedLedger: subtractReactionLedgers(outputLedger, routedOutgoingLedger),
        incomingCount: incomingMappings.length,
        outgoingCount: outgoingMappings.length,
        isOpen,
        isInvalid,
        isBalanced,
      };
      activeStack.delete(normalizedParticipantId);
      cache.set(normalizedParticipantId, summary);
      return summary;
    }

    return resolveOperatorSummary(participantId);
  }

  return {
    getOperatorLedgerSummary,
  };
}

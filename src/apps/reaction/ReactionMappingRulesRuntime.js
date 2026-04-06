import {
  classifyReactionNode,
  evaluateReactionMappingCandidate,
} from "./ReactionStructureMappingRuntime.js";
import { evaluateReactionConnectionPolicy } from "./ReactionConnectionPolicyRuntime.js";
import {
  addReactionLedgers,
  createEmptyReactionLedger,
  formatReactionLedger,
  hasReactionLedger,
  normalizeReactionLedger,
  reactionLedgerFitsWithin,
  reactionLedgersMatch,
  subtractReactionLedgers,
} from "./ReactionLedgerRuntime.js";
import { parseReactionNodeKey } from "./ReactionNodeKeyRuntime.js";

function normalizeAnchorInstanceIndex(anchorInstanceIndex) {
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

function getNodeLedgerFromContext(nodeContext = null, resolveBinaryChoiceInventory) {
  const spec = nodeContext
    ? classifyReactionNode(nodeContext.participant, nodeContext.node, {
        resolveBinaryChoiceInventory,
      })
    : null;
  return spec?.inventory ?? createEmptyReactionLedger();
}

export function createReactionMappingRulesRuntime(options = {}) {
  const getNodeContext =
    typeof options.getNodeContext === "function" ? options.getNodeContext : () => null;
  const getOperatorInputNodeContexts =
    typeof options.getOperatorInputNodeContexts === "function"
      ? options.getOperatorInputNodeContexts
      : () => [];
  const getOperatorLedgerSummary =
    typeof options.getOperatorLedgerSummary === "function"
      ? options.getOperatorLedgerSummary
      : () => ({
          incomingLedger: createEmptyReactionLedger(),
          outputLedger: createEmptyReactionLedger(),
          outgoingLedger: createEmptyReactionLedger(),
          routedOutgoingLedger: createEmptyReactionLedger(),
          incomingCount: 0,
          outgoingCount: 0,
          isBalanced: false,
        });
  const getOperatorOutputLedger =
    typeof options.getOperatorOutputLedger === "function"
      ? options.getOperatorOutputLedger
      : (_participantId, _anchorInstanceIndex, operatorSummary) =>
          hasReactionLedger(operatorSummary?.outputLedger)
            ? normalizeReactionLedger(operatorSummary.outputLedger)
            : normalizeReactionLedger(operatorSummary?.incomingLedger);
  const parseNodeKey =
    typeof options.parseNodeKey === "function"
      ? options.parseNodeKey
      : parseReactionNodeKey;
  const resolveBinaryChoiceInventory =
    typeof options.resolveBinaryChoiceInventory === "function"
      ? options.resolveBinaryChoiceInventory
      : () => null;

  function evaluateOperatorOutputLedger(
    operatorSummary = null,
    outputLedger = null,
    availableOutputLedgerOverride = null
  ) {
    const normalizedSummary = operatorSummary ?? {
      incomingLedger: createEmptyReactionLedger(),
      outputLedger: createEmptyReactionLedger(),
      outgoingLedger: createEmptyReactionLedger(),
      routedOutgoingLedger: createEmptyReactionLedger(),
      incomingCount: 0,
      outgoingCount: 0,
    };
    const availableOutputLedger = hasReactionLedger(availableOutputLedgerOverride)
      ? normalizeReactionLedger(availableOutputLedgerOverride)
      : hasReactionLedger(normalizedSummary.outputLedger)
        ? normalizedSummary.outputLedger
        : normalizedSummary.incomingLedger;
    const candidateLedger = normalizeReactionLedger(outputLedger);
    if (!hasReactionLedger(availableOutputLedger)) {
      return {
        valid: false,
        reason: "Add conservative reactant inputs to this operator first.",
      };
    }
    if (!reactionLedgerFitsWithin(availableOutputLedger, candidateLedger)) {
      return {
        valid: false,
        reason: `Operator output would exceed its available ledger: ${formatReactionLedger(availableOutputLedger)} available.`,
      };
    }
    if (!reactionLedgersMatch(availableOutputLedger, candidateLedger)) {
      const remainingLedger = subtractReactionLedgers(availableOutputLedger, candidateLedger);
      return {
        valid: false,
        reason: `Operator output remains incomplete: ${formatReactionLedger(remainingLedger)} still unmatched.`,
      };
    }
    return {
      valid: true,
      reason: "Operator output is fully conservative.",
    };
  }

  function evaluateOperatorStructureCompatibility(
    operatorId = "",
    operatorSummary = null,
    candidateTargetContext = null,
    { includePendingTarget = false } = {}
  ) {
    const normalizedSummary = operatorSummary ?? {
      incomingCount: 0,
      outgoingCount: 0,
    };
    const incomingCount = Math.max(0, Number(normalizedSummary.incomingCount ?? 0));
    const outgoingCount = Math.max(0, Number(normalizedSummary.outgoingCount ?? 0));
    const effectiveOutgoingCount = includePendingTarget ? outgoingCount + 1 : outgoingCount;
    if (incomingCount !== 1 || effectiveOutgoingCount !== 1 || !candidateTargetContext) {
      return {
        valid: true,
        reason: "",
      };
    }

    const [incomingSourceContext] = getOperatorInputNodeContexts(operatorId);
    if (!incomingSourceContext) {
      return {
        valid: true,
        reason: "",
      };
    }

    const evaluation = evaluateReactionMappingCandidate({
      sourceParticipant: incomingSourceContext.participant,
      sourceNode: incomingSourceContext.node,
      targetParticipant: candidateTargetContext.participant,
      targetNode: candidateTargetContext.node,
      resolveBinaryChoiceInventory,
    });
    if (evaluation.allowed) {
      return {
        valid: true,
        reason: "",
      };
    }
    return {
      valid: false,
      reason: `Single-source operator output must still respect source-to-target structure compatibility. ${evaluation.reason}`,
    };
  }

  function evaluateOperatorOutputCandidate(
    operatorId = "",
    candidateTargetContext = null,
    sourceAnchorInstanceIndex = null
  ) {
    const operatorSummary = getOperatorLedgerSummary(operatorId);
    const normalizedSourceAnchorInstanceIndex = normalizeAnchorInstanceIndex(
      sourceAnchorInstanceIndex
    );
    const selectedOutputLedger = getOperatorOutputLedger(
      operatorId,
      normalizedSourceAnchorInstanceIndex,
      operatorSummary
    );
    const routedOutgoingLedgerByAnchorInstance =
      operatorSummary?.routedOutgoingLedgerByAnchorInstance ?? {};
    const currentAnchorOutgoingLedger =
      routedOutgoingLedgerByAnchorInstance[
        String(normalizedSourceAnchorInstanceIndex ?? 0)
      ] ?? createEmptyReactionLedger();
    const candidateLedger = addReactionLedgers(
      currentAnchorOutgoingLedger,
      getNodeLedgerFromContext(candidateTargetContext, resolveBinaryChoiceInventory)
    );
    const ledgerEvaluation = evaluateOperatorOutputLedger(
      operatorSummary,
      candidateLedger,
      selectedOutputLedger
    );
    if (!ledgerEvaluation.valid) {
      return ledgerEvaluation;
    }
    const compatibilityEvaluation = evaluateOperatorStructureCompatibility(
      operatorId,
      operatorSummary,
      candidateTargetContext,
      { includePendingTarget: true }
    );
    return compatibilityEvaluation.valid ? ledgerEvaluation : compatibilityEvaluation;
  }

  function evaluateOperatorInputValidation(targetContext = null) {
    const targetParticipant = targetContext?.participant ?? null;
    if (!targetParticipant) {
      return {
        valid: false,
        reason: "Operator input references an unavailable operator.",
      };
    }
    if (targetParticipant.templateId === "associate") {
      const incomingCount = Math.max(
        0,
        Number(getOperatorLedgerSummary(targetParticipant.id)?.incomingCount ?? 0)
      );
      if (incomingCount < 2) {
        return {
          valid: false,
          reason: "Associate needs at least two reactant inputs.",
        };
      }
    }
    if (targetParticipant.templateId === "dissociate") {
      const incomingCount = Math.max(
        0,
        Number(getOperatorLedgerSummary(targetParticipant.id)?.incomingCount ?? 0)
      );
      if (incomingCount < 1) {
        return {
          valid: false,
          reason: "Dissociate needs exactly one reactant input.",
        };
      }
      if (incomingCount > 1) {
        return {
          valid: false,
          reason: "Dissociate accepts exactly one reactant input.",
        };
      }
    }
    return {
      valid: true,
      reason: "Reactant routed into operator.",
    };
  }

  function getMappingValidation(mapping = null) {
    if (!mapping) {
      return { valid: true, reason: "" };
    }
    const sourceContext = getNodeContext(mapping.sourceKey);
    const targetContext = getNodeContext(mapping.targetKey);
    if (!sourceContext || !targetContext) {
      return {
        valid: false,
        reason: "Mapping references an unavailable source or target node.",
      };
    }
    const connectionPolicyEvaluation = evaluateReactionConnectionPolicy({
      sourceParticipant: sourceContext.participant,
      sourceNodeId: sourceContext?.node?.id,
      sourceRole: mapping.sourceRole,
      sourceAnchorInstanceIndex: mapping.sourceAnchorInstanceIndex,
      targetParticipant: targetContext.participant,
      targetNodeId: targetContext?.node?.id,
      targetRole: mapping.targetRole,
      targetAnchorInstanceIndex: mapping.targetAnchorInstanceIndex,
    });
    if (!connectionPolicyEvaluation.allowed) {
      return {
        valid: false,
        reason: connectionPolicyEvaluation.reason,
      };
    }
    if (mapping.sourceRole === "reactant" && mapping.targetRole === "operator-input") {
      return evaluateOperatorInputValidation(targetContext);
    }
    if (mapping.sourceRole === "center" && mapping.targetRole === "operator-input") {
      return evaluateOperatorInputValidation(targetContext);
    }
    if (mapping.sourceRole === "operator-output" && mapping.targetRole === "product") {
      const { participantId: operatorId } = parseNodeKey(mapping.sourceKey);
      const operatorSummary = getOperatorLedgerSummary(operatorId);
      const selectedOutputLedger = getOperatorOutputLedger(
        operatorId,
        mapping.sourceAnchorInstanceIndex,
        operatorSummary
      );
      const ledgerEvaluation = evaluateOperatorOutputLedger(
        operatorSummary,
        operatorSummary?.routedOutgoingLedgerByAnchorInstance?.[
          String(normalizeAnchorInstanceIndex(mapping.sourceAnchorInstanceIndex) ?? 0)
        ] ?? operatorSummary.routedOutgoingLedger ?? operatorSummary.outgoingLedger,
        selectedOutputLedger
      );
      if (!ledgerEvaluation.valid) {
        return ledgerEvaluation;
      }
      const compatibilityEvaluation = evaluateOperatorStructureCompatibility(
        operatorId,
        operatorSummary,
        targetContext
      );
      return compatibilityEvaluation.valid ? ledgerEvaluation : compatibilityEvaluation;
    }
    if (mapping.sourceRole === "operator-output" && mapping.targetRole === "center") {
      const { participantId: operatorId } = parseNodeKey(mapping.sourceKey);
      const operatorSummary = getOperatorLedgerSummary(operatorId);
      const selectedOutputLedger = getOperatorOutputLedger(
        operatorId,
        mapping.sourceAnchorInstanceIndex,
        operatorSummary
      );
      const ledgerEvaluation = evaluateOperatorOutputLedger(
        operatorSummary,
        operatorSummary?.routedOutgoingLedgerByAnchorInstance?.[
          String(normalizeAnchorInstanceIndex(mapping.sourceAnchorInstanceIndex) ?? 0)
        ] ?? operatorSummary.routedOutgoingLedger ?? operatorSummary.outgoingLedger,
        selectedOutputLedger
      );
      if (!ledgerEvaluation.valid) {
        return ledgerEvaluation;
      }
      const compatibilityEvaluation = evaluateOperatorStructureCompatibility(
        operatorId,
        operatorSummary,
        targetContext
      );
      return compatibilityEvaluation.valid ? ledgerEvaluation : compatibilityEvaluation;
    }
    return {
      valid: false,
      reason: "This connection direction breaks the current reaction-mapping rules.",
    };
  }

  function resolvePendingTargetAvailability({
    pendingSourceKey,
    pendingSourceRole,
    pendingSourceAnchorInstanceIndex = null,
    role,
    targetAnchorInstanceIndex = null,
    sourceContext,
    targetContext,
  } = {}) {
    const connectionPolicyEvaluation = evaluateReactionConnectionPolicy({
      sourceParticipant: sourceContext?.participant,
      sourceNodeId: sourceContext?.node?.id,
      sourceRole: pendingSourceRole,
      sourceAnchorInstanceIndex: pendingSourceAnchorInstanceIndex,
      targetParticipant: targetContext?.participant,
      targetNodeId: targetContext?.node?.id,
      targetRole: role,
      targetAnchorInstanceIndex,
    });
    if (!connectionPolicyEvaluation.allowed) {
      return {
        disabled: true,
        reason: connectionPolicyEvaluation.reason,
      };
    }
    if (pendingSourceRole === "reactant" && role === "operator-input") {
      return null;
    }
    if (pendingSourceRole === "center" && role === "operator-input") {
      return null;
    }
    if (pendingSourceRole === "operator-output" && role === "product") {
      const { participantId: operatorId } = parseNodeKey(pendingSourceKey);
      const evaluation = evaluateOperatorOutputCandidate(
        operatorId,
        targetContext,
        pendingSourceAnchorInstanceIndex
      );
      if (evaluation.valid) {
        return null;
      }
      return {
        disabled: false,
        reason: evaluation.reason,
        invalid: true,
      };
    }
    if (pendingSourceRole === "operator-output" && role === "center") {
      const { participantId: operatorId } = parseNodeKey(pendingSourceKey);
      const evaluation = evaluateOperatorOutputCandidate(
        operatorId,
        targetContext,
        pendingSourceAnchorInstanceIndex
      );
      if (evaluation.valid) {
        return null;
      }
      return {
        disabled: false,
        reason: evaluation.reason,
        invalid: true,
      };
    }
    return null;
  }

  return {
    addLedgers: addReactionLedgers,
    createEmptyLedger: createEmptyReactionLedger,
    evaluatePendingTargetAvailability: resolvePendingTargetAvailability,
    formatLedger: formatReactionLedger,
    getMappingValidation,
    getNodeLedgerFromContext,
    hasLedger: hasReactionLedger,
    ledgerFitsWithin: reactionLedgerFitsWithin,
    ledgersMatch: reactionLedgersMatch,
  };
}

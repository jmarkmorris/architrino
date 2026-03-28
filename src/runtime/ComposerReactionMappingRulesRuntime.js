import {
  classifyComposerReactionNode,
  evaluateComposerReactionMappingCandidate,
} from "./ComposerReactionStructureMappingRuntime.js";

function createEmptyLedger() {
  return {
    electrino: 0,
    positrino: 0,
  };
}

function normalizeLedger(ledger = null) {
  return {
    electrino: Math.max(0, Number(ledger?.electrino ?? 0)),
    positrino: Math.max(0, Number(ledger?.positrino ?? 0)),
  };
}

function addLedgers(leftLedger = null, rightLedger = null) {
  const left = normalizeLedger(leftLedger);
  const right = normalizeLedger(rightLedger);
  return {
    electrino: left.electrino + right.electrino,
    positrino: left.positrino + right.positrino,
  };
}

function subtractLedgers(leftLedger = null, rightLedger = null) {
  const left = normalizeLedger(leftLedger);
  const right = normalizeLedger(rightLedger);
  return {
    electrino: Math.max(0, left.electrino - right.electrino),
    positrino: Math.max(0, left.positrino - right.positrino),
  };
}

function ledgerFitsWithin(limitLedger = null, candidateLedger = null) {
  const limit = normalizeLedger(limitLedger);
  const candidate = normalizeLedger(candidateLedger);
  return (
    candidate.electrino <= limit.electrino &&
    candidate.positrino <= limit.positrino
  );
}

function ledgersMatch(leftLedger = null, rightLedger = null) {
  const left = normalizeLedger(leftLedger);
  const right = normalizeLedger(rightLedger);
  return (
    left.electrino === right.electrino &&
    left.positrino === right.positrino
  );
}

function hasLedger(ledger = null) {
  const normalized = normalizeLedger(ledger);
  return normalized.electrino > 0 || normalized.positrino > 0;
}

function formatLedger(ledger = null) {
  const normalized = normalizeLedger(ledger);
  const parts = [];
  if (normalized.electrino) {
    parts.push(`${normalized.electrino} electrino`);
  }
  if (normalized.positrino) {
    parts.push(`${normalized.positrino} positrino`);
  }
  return parts.join(" + ") || "empty ledger";
}

function getNodeLedgerFromContext(nodeContext = null, resolveBinaryChoiceInventory) {
  const spec = nodeContext
    ? classifyComposerReactionNode(nodeContext.participant, nodeContext.node, {
        resolveBinaryChoiceInventory,
      })
    : null;
  return spec?.inventory ?? createEmptyLedger();
}

export function createComposerReactionMappingRulesRuntime(options = {}) {
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
          incomingLedger: createEmptyLedger(),
          outgoingLedger: createEmptyLedger(),
          incomingCount: 0,
          outgoingCount: 0,
          isBalanced: false,
        });
  const parseNodeKey =
    typeof options.parseNodeKey === "function"
      ? options.parseNodeKey
      : (nodeKey = "") => ({ participantId: String(nodeKey ?? "").split("::")[0] ?? "" });
  const resolveBinaryChoiceInventory =
    typeof options.resolveBinaryChoiceInventory === "function"
      ? options.resolveBinaryChoiceInventory
      : () => null;

  function evaluateOperatorOutputLedger(operatorSummary = null, outputLedger = null) {
    const normalizedSummary = operatorSummary ?? {
      incomingLedger: createEmptyLedger(),
      outgoingLedger: createEmptyLedger(),
      incomingCount: 0,
      outgoingCount: 0,
    };
    const candidateLedger = normalizeLedger(outputLedger);
    if (!hasLedger(normalizedSummary.incomingLedger)) {
      return {
        valid: false,
        reason: "Add conservative reactant inputs to this operator first.",
      };
    }
    if (!ledgerFitsWithin(normalizedSummary.incomingLedger, candidateLedger)) {
      return {
        valid: false,
        reason: `Operator output would exceed its incoming ledger: ${formatLedger(normalizedSummary.incomingLedger)} available.`,
      };
    }
    if (!ledgersMatch(normalizedSummary.incomingLedger, candidateLedger)) {
      const remainingLedger = subtractLedgers(normalizedSummary.incomingLedger, candidateLedger);
      return {
        valid: false,
        reason: `Operator output remains incomplete: ${formatLedger(remainingLedger)} still unmatched.`,
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

    const evaluation = evaluateComposerReactionMappingCandidate({
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
      reason: `Single-source operator output must still respect source-to-product structure compatibility. ${evaluation.reason}`,
    };
  }

  function evaluateOperatorOutputCandidate(operatorId = "", candidateTargetContext = null) {
    const operatorSummary = getOperatorLedgerSummary(operatorId);
    const candidateLedger = addLedgers(
      operatorSummary.outgoingLedger,
      getNodeLedgerFromContext(candidateTargetContext, resolveBinaryChoiceInventory)
    );
    const ledgerEvaluation = evaluateOperatorOutputLedger(operatorSummary, candidateLedger);
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
          reason: "Associate needs exactly two reactant inputs.",
        };
      }
      if (incomingCount > 2) {
        return {
          valid: false,
          reason: "Associate accepts exactly two reactant inputs.",
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
    if (mapping.sourceRole === "reactant" && mapping.targetRole === "product") {
      const evaluation = evaluateComposerReactionMappingCandidate({
        sourceParticipant: sourceContext.participant,
        sourceNode: sourceContext.node,
        targetParticipant: targetContext.participant,
        targetNode: targetContext.node,
        resolveBinaryChoiceInventory,
      });
      return {
        valid: evaluation.allowed,
        reason: evaluation.reason,
      };
    }
    if (mapping.sourceRole === "reactant" && mapping.targetRole === "operator-input") {
      return evaluateOperatorInputValidation(targetContext);
    }
    if (mapping.sourceRole === "operator-output" && mapping.targetRole === "product") {
      const { participantId: operatorId } = parseNodeKey(mapping.sourceKey);
      const operatorSummary = getOperatorLedgerSummary(operatorId);
      const ledgerEvaluation = evaluateOperatorOutputLedger(
        operatorSummary,
        operatorSummary.outgoingLedger
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
    role,
    sourceContext,
    targetContext,
  } = {}) {
    if (pendingSourceRole === "reactant" && role === "product") {
      const evaluation = evaluateComposerReactionMappingCandidate({
        sourceParticipant: sourceContext?.participant,
        sourceNode: sourceContext?.node,
        targetParticipant: targetContext?.participant,
        targetNode: targetContext?.node,
        resolveBinaryChoiceInventory,
      });
      if (!evaluation.allowed) {
        return {
          disabled: false,
          reason: evaluation.reason,
          invalid: true,
        };
      }
      return null;
    }
    if (pendingSourceRole === "reactant" && role === "operator-input") {
      return null;
    }
    if (pendingSourceRole === "operator-output" && role === "product") {
      const { participantId: operatorId } = parseNodeKey(pendingSourceKey);
      const evaluation = evaluateOperatorOutputCandidate(operatorId, targetContext);
      if (evaluation.valid) {
        return null;
      }
      return {
        disabled: false,
        reason: evaluation.reason,
        invalid: true,
      };
    }
    if (pendingSourceRole === "operator-output" && role === "operator-input") {
      return {
        disabled: false,
        reason: "Operator outputs connect to product targets only.",
        invalid: true,
      };
    }
    return null;
  }

  return {
    addLedgers,
    createEmptyLedger,
    evaluatePendingTargetAvailability: resolvePendingTargetAvailability,
    formatLedger,
    getMappingValidation,
    getNodeLedgerFromContext,
    hasLedger,
    ledgerFitsWithin,
    ledgersMatch,
  };
}

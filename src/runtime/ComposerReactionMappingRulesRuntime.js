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
  const getTransmuteInputNodeContexts =
    typeof options.getTransmuteInputNodeContexts === "function"
      ? options.getTransmuteInputNodeContexts
      : () => [];
  const getTransmuteLedgerSummary =
    typeof options.getTransmuteLedgerSummary === "function"
      ? options.getTransmuteLedgerSummary
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

  function evaluateTransmuteOutputLedger(transmuteSummary = null, outputLedger = null) {
    const normalizedSummary = transmuteSummary ?? {
      incomingLedger: createEmptyLedger(),
      outgoingLedger: createEmptyLedger(),
      incomingCount: 0,
      outgoingCount: 0,
    };
    const candidateLedger = normalizeLedger(outputLedger);
    if (!hasLedger(normalizedSummary.incomingLedger)) {
      return {
        valid: false,
        reason: "Add conservative reactant inputs to this transmute node first.",
      };
    }
    if (!ledgerFitsWithin(normalizedSummary.incomingLedger, candidateLedger)) {
      return {
        valid: false,
        reason: `Center transformer output would exceed its incoming ledger: ${formatLedger(normalizedSummary.incomingLedger)} available.`,
      };
    }
    if (!ledgersMatch(normalizedSummary.incomingLedger, candidateLedger)) {
      const remainingLedger = subtractLedgers(normalizedSummary.incomingLedger, candidateLedger);
      return {
        valid: false,
        reason: `Center transformer output remains incomplete: ${formatLedger(remainingLedger)} still unmatched.`,
      };
    }
    return {
      valid: true,
      reason: "Transmute output is fully conservative.",
    };
  }

  function evaluateTransmuteStructureCompatibility(
    transmuteId = "",
    transmuteSummary = null,
    candidateTargetContext = null,
    { includePendingTarget = false } = {}
  ) {
    const normalizedSummary = transmuteSummary ?? {
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

    const [incomingSourceContext] = getTransmuteInputNodeContexts(transmuteId);
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
      reason: `Single-source transmute output must still respect source-to-product structure compatibility. ${evaluation.reason}`,
    };
  }

  function evaluateTransmuteOutputCandidate(transmuteId = "", candidateTargetContext = null) {
    const transmuteSummary = getTransmuteLedgerSummary(transmuteId);
    const candidateLedger = addLedgers(
      transmuteSummary.outgoingLedger,
      getNodeLedgerFromContext(candidateTargetContext, resolveBinaryChoiceInventory)
    );
    const ledgerEvaluation = evaluateTransmuteOutputLedger(transmuteSummary, candidateLedger);
    if (!ledgerEvaluation.valid) {
      return ledgerEvaluation;
    }
    return evaluateTransmuteStructureCompatibility(
      transmuteId,
      transmuteSummary,
      candidateTargetContext,
      { includePendingTarget: true }
    );
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
    if (mapping.sourceRole === "reactant" && mapping.targetRole === "transmute-input") {
      return {
        valid: true,
        reason: "Reactant routed into transmute node.",
      };
    }
    if (mapping.sourceRole === "transmute-output" && mapping.targetRole === "product") {
      const { participantId: transmuteId } = parseNodeKey(mapping.sourceKey);
      const transmuteSummary = getTransmuteLedgerSummary(transmuteId);
      const ledgerEvaluation = evaluateTransmuteOutputLedger(
        transmuteSummary,
        transmuteSummary.outgoingLedger
      );
      if (!ledgerEvaluation.valid) {
        return ledgerEvaluation;
      }
      return evaluateTransmuteStructureCompatibility(
        transmuteId,
        transmuteSummary,
        targetContext
      );
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
    if (pendingSourceRole === "transmute-output" && role === "product") {
      const { participantId: transmuteId } = parseNodeKey(pendingSourceKey);
      const evaluation = evaluateTransmuteOutputCandidate(transmuteId, targetContext);
      if (evaluation.valid) {
        return null;
      }
      return {
        disabled: false,
        reason: evaluation.reason,
        invalid: true,
      };
    }
    if (pendingSourceRole === "transmute-output" && role === "transmute-input") {
      return {
        disabled: false,
        reason: "Center transformer outputs connect to product targets only.",
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

import { evaluateComposerReactionMappingCandidate } from "./ComposerReactionStructureMappingRuntime.js";

function normalizeText(value = "") {
  return String(value ?? "").trim().toLowerCase();
}

function compareText(left = "", right = "") {
  return String(left ?? "").localeCompare(String(right ?? ""));
}

function scoreDirectRootCandidate(candidate = null) {
  if (!candidate) {
    return Number.NEGATIVE_INFINITY;
  }
  let score = 0;
  if (candidate.sourceParticipant?.templateId === candidate.targetParticipant?.templateId) {
    score += 1000;
  }
  if (
    normalizeText(candidate.sourceParticipant?.polarity) ===
    normalizeText(candidate.targetParticipant?.polarity)
  ) {
    score += 100;
  }
  if (candidate.evaluation?.provenanceMode === "direct") {
    score += 25;
  }
  if (
    normalizeText(candidate.evaluation?.sourceSpec?.kind) ===
    normalizeText(candidate.evaluation?.targetSpec?.kind)
  ) {
    score += 10;
  }
  if (
    normalizeText(candidate.sourceParticipant?.baseLabel || candidate.sourceParticipant?.label) ===
    normalizeText(candidate.targetParticipant?.baseLabel || candidate.targetParticipant?.label)
  ) {
    score += 5;
  }
  return score;
}

function compareDirectRootCandidates(left = null, right = null) {
  const scoreDelta = scoreDirectRootCandidate(right) - scoreDirectRootCandidate(left);
  if (scoreDelta !== 0) {
    return scoreDelta;
  }
  const sourceTemplateDelta = compareText(
    left?.sourceParticipant?.templateId,
    right?.sourceParticipant?.templateId
  );
  if (sourceTemplateDelta !== 0) {
    return sourceTemplateDelta;
  }
  const targetTemplateDelta = compareText(
    left?.targetParticipant?.templateId,
    right?.targetParticipant?.templateId
  );
  if (targetTemplateDelta !== 0) {
    return targetTemplateDelta;
  }
  const sourceIdDelta = compareText(left?.sourceParticipant?.id, right?.sourceParticipant?.id);
  if (sourceIdDelta !== 0) {
    return sourceIdDelta;
  }
  return compareText(left?.targetParticipant?.id, right?.targetParticipant?.id);
}

export function buildComposerReactionDirectRootPlan(options = {}) {
  const solveState = options.solveState ?? {};
  const reactants = Array.isArray(solveState.reactants) ? solveState.reactants : [];
  const products = Array.isArray(solveState.products) ? solveState.products : [];
  const resolveBinaryChoiceInventory =
    typeof options.resolveBinaryChoiceInventory === "function"
      ? options.resolveBinaryChoiceInventory
      : null;

  const candidates = [];
  reactants.forEach((reactantEntry) => {
    products.forEach((productEntry) => {
      if (!reactantEntry?.rootNode || !productEntry?.rootNode) {
        return;
      }
      if (!reactantEntry.rootNodeKey || !productEntry.rootNodeKey) {
        return;
      }
      const evaluation = evaluateComposerReactionMappingCandidate({
        sourceParticipant: reactantEntry.participant,
        sourceNode: reactantEntry.rootNode,
        targetParticipant: productEntry.participant,
        targetNode: productEntry.rootNode,
        resolveBinaryChoiceInventory,
      });
      if (!evaluation.allowed) {
        return;
      }
      candidates.push({
        sourceParticipant: reactantEntry.participant,
        targetParticipant: productEntry.participant,
        sourceKey: reactantEntry.rootNodeKey,
        targetKey: productEntry.rootNodeKey,
        sourceRole: "reactant",
        targetRole: "product",
        evaluation,
      });
    });
  });

  const selectedMappings = [];
  const usedReactantIds = new Set();
  const usedProductIds = new Set();
  candidates.sort(compareDirectRootCandidates).forEach((candidate) => {
    const sourceParticipantId = String(candidate?.sourceParticipant?.id ?? "");
    const targetParticipantId = String(candidate?.targetParticipant?.id ?? "");
    if (!sourceParticipantId || !targetParticipantId) {
      return;
    }
    if (usedReactantIds.has(sourceParticipantId) || usedProductIds.has(targetParticipantId)) {
      return;
    }
    usedReactantIds.add(sourceParticipantId);
    usedProductIds.add(targetParticipantId);
    selectedMappings.push({
      ...candidate,
      score: scoreDirectRootCandidate(candidate),
    });
  });

  return {
    mode: "direct-root",
    selectedMappings,
    matchedReactantCount: usedReactantIds.size,
    matchedProductCount: usedProductIds.size,
    unresolvedReactants: reactants.filter(
      (entry) => !usedReactantIds.has(String(entry?.participant?.id ?? ""))
    ),
    unresolvedProducts: products.filter(
      (entry) => !usedProductIds.has(String(entry?.participant?.id ?? ""))
    ),
  };
}

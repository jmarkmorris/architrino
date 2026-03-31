import { evaluateComposerReactionMappingCandidate } from "./ComposerReactionStructureMappingRuntime.js";

function normalizeText(value = "") {
  return String(value ?? "").trim().toLowerCase();
}

function compareText(left = "", right = "") {
  return String(left ?? "").localeCompare(String(right ?? ""));
}

function getParticipantIdentityScore(sourceParticipant = null, targetParticipant = null) {
  let score = 0;
  if (sourceParticipant?.templateId === targetParticipant?.templateId) {
    score += 1000;
  }
  if (
    normalizeText(sourceParticipant?.polarity) === normalizeText(targetParticipant?.polarity)
  ) {
    score += 100;
  }
  if (
    normalizeText(sourceParticipant?.baseLabel || sourceParticipant?.label) ===
    normalizeText(targetParticipant?.baseLabel || targetParticipant?.label)
  ) {
    score += 10;
  }
  return score;
}

function participantsShareDirectIdentity(sourceParticipant = null, targetParticipant = null) {
  if (sourceParticipant?.templateId !== targetParticipant?.templateId) {
    return false;
  }
  return normalizeText(sourceParticipant?.polarity) === normalizeText(targetParticipant?.polarity);
}

function scoreDirectRootCandidate(candidate = null) {
  if (!candidate) {
    return Number.NEGATIVE_INFINITY;
  }
  let score = getParticipantIdentityScore(
    candidate.sourceParticipant,
    candidate.targetParticipant
  );
  if (candidate.evaluation?.provenanceMode === "direct") {
    score += 25;
  }
  if (
    normalizeText(candidate.evaluation?.sourceSpec?.kind) ===
    normalizeText(candidate.evaluation?.targetSpec?.kind)
  ) {
    score += 10;
  }
  return score;
}

function scoreCompositeCarryThroughCandidate(candidate = null) {
  if (!candidate) {
    return Number.NEGATIVE_INFINITY;
  }
  return (
    5000 +
    getParticipantIdentityScore(candidate.sourceParticipant, candidate.targetParticipant) +
    candidate.mappings.length * 50
  );
}

function compareSolveCandidates(left = null, right = null) {
  const scoreDelta = Number(right?.score ?? 0) - Number(left?.score ?? 0);
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

function createDirectRootCandidate(
  reactantEntry,
  productEntry,
  resolveBinaryChoiceInventory = null
) {
  if (
    !participantsShareDirectIdentity(reactantEntry?.participant, productEntry?.participant)
  ) {
    return null;
  }
  if (!reactantEntry?.rootNode || !productEntry?.rootNode) {
    return null;
  }
  if (!reactantEntry.rootNodeKey || !productEntry.rootNodeKey) {
    return null;
  }
  const evaluation = evaluateComposerReactionMappingCandidate({
    sourceParticipant: reactantEntry.participant,
    sourceNode: reactantEntry.rootNode,
    targetParticipant: productEntry.participant,
    targetNode: productEntry.rootNode,
    resolveBinaryChoiceInventory,
  });
  if (!evaluation.allowed) {
    return null;
  }
  const candidate = {
    type: "direct-root",
    sourceParticipant: reactantEntry.participant,
    targetParticipant: productEntry.participant,
    productResolutionKind: "direct",
    mappings: [
      {
        sourceParticipant: reactantEntry.participant,
        targetParticipant: productEntry.participant,
        sourceKey: reactantEntry.rootNodeKey,
        targetKey: productEntry.rootNodeKey,
        sourceRole: "reactant",
        targetRole: "product",
        evaluation,
      },
    ],
    evaluation,
  };
  candidate.score = scoreDirectRootCandidate(candidate);
  return candidate;
}

function createCompositeCarryThroughCandidate(
  reactantEntry,
  productEntry,
  resolveBinaryChoiceInventory = null,
  buildNodeKey = null
) {
  const sourceParticipant = reactantEntry?.participant ?? null;
  const targetParticipant = productEntry?.participant ?? null;
  const sourceRootNode = reactantEntry?.rootNode ?? null;
  const targetRootNode = productEntry?.rootNode ?? null;
  if (!sourceParticipant || !targetParticipant || !sourceRootNode || !targetRootNode) {
    return null;
  }
  if (sourceParticipant.templateId !== targetParticipant.templateId) {
    return null;
  }
  if (
    normalizeText(sourceParticipant.polarity) !== normalizeText(targetParticipant.polarity)
  ) {
    return null;
  }
  const sourceChildren = Array.isArray(sourceRootNode.children) ? sourceRootNode.children : [];
  const targetChildren = Array.isArray(targetRootNode.children) ? targetRootNode.children : [];
  if (!sourceChildren.length || sourceChildren.length !== targetChildren.length) {
    return null;
  }
  if (typeof buildNodeKey !== "function") {
    return null;
  }

  const mappings = [];
  for (let index = 0; index < sourceChildren.length; index += 1) {
    const sourceNode = sourceChildren[index];
    const targetNode = targetChildren[index];
    if (!sourceNode?.id || !targetNode?.id) {
      return null;
    }
    const evaluation = evaluateComposerReactionMappingCandidate({
      sourceParticipant,
      sourceNode,
      targetParticipant,
      targetNode,
      resolveBinaryChoiceInventory,
    });
    if (!evaluation.allowed) {
      return null;
    }
    mappings.push({
      sourceParticipant,
      targetParticipant,
      sourceKey: buildNodeKey(sourceParticipant.id, sourceNode.id),
      targetKey: buildNodeKey(targetParticipant.id, targetNode.id),
      sourceRole: "reactant",
      targetRole: "product",
      evaluation,
    });
  }

  const candidate = {
    type: "composite-carry-through",
    sourceParticipant,
    targetParticipant,
    productResolutionKind: "composite",
    mappings,
  };
  candidate.score = scoreCompositeCarryThroughCandidate(candidate);
  return candidate;
}

function formatCount(count = 0, singular = "", plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function describeComposerReactionSolvePlan(plan = {}) {
  const directProductCount = Number(plan.directProductCount ?? 0);
  const compositeProductCount = Number(plan.compositeProductCount ?? 0);
  const parts = [];
  if (directProductCount > 0) {
    parts.push(formatCount(directProductCount, "direct product"));
  }
  if (compositeProductCount > 0) {
    parts.push(formatCount(compositeProductCount, "composite product"));
  }
  if (!parts.length) {
    return "0 products";
  }
  return parts.join(" and ");
}

export function buildComposerReactionSolvePlan(options = {}) {
  const solveState = options.solveState ?? {};
  const reactants = Array.isArray(solveState.reactants) ? solveState.reactants : [];
  const products = Array.isArray(solveState.products) ? solveState.products : [];
  const resolveBinaryChoiceInventory =
    typeof options.resolveBinaryChoiceInventory === "function"
      ? options.resolveBinaryChoiceInventory
      : null;
  const buildNodeKey =
    typeof options.buildNodeKey === "function" ? options.buildNodeKey : null;

  const candidates = [];
  reactants.forEach((reactantEntry) => {
    products.forEach((productEntry) => {
      const compositeCandidate = createCompositeCarryThroughCandidate(
        reactantEntry,
        productEntry,
        resolveBinaryChoiceInventory,
        buildNodeKey
      );
      if (compositeCandidate) {
        candidates.push(compositeCandidate);
        return;
      }
      const directCandidate = createDirectRootCandidate(
        reactantEntry,
        productEntry,
        resolveBinaryChoiceInventory
      );
      if (directCandidate) {
        candidates.push(directCandidate);
      }
    });
  });

  const selectedCandidates = [];
  const selectedMappings = [];
  const usedReactantIds = new Set();
  const usedProductIds = new Set();
  candidates.sort(compareSolveCandidates).forEach((candidate) => {
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
    selectedCandidates.push(candidate);
    selectedMappings.push(...candidate.mappings);
  });

  return {
    mode: "direct-v1",
    selectedCandidates,
    selectedMappings,
    directProductCount: selectedCandidates.filter(
      (candidate) => candidate.productResolutionKind === "direct"
    ).length,
    compositeProductCount: selectedCandidates.filter(
      (candidate) => candidate.productResolutionKind === "composite"
    ).length,
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

export const buildComposerReactionDirectRootPlan = buildComposerReactionSolvePlan;

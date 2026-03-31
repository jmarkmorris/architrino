import { evaluateComposerReactionMappingCandidate } from "./ComposerReactionStructureMappingRuntime.js";
import { createAssociatePhotonCandidate } from "./ComposerReactionSolveAssociateRuntime.js";
import { buildBestCompositeChildMatchPlan } from "./ComposerReactionSolveMatchRuntime.js";

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

function scorePartialCompositeCandidate(candidate = null) {
  if (!candidate) {
    return Number.NEGATIVE_INFINITY;
  }
  return (
    2000 +
    getParticipantIdentityScore(candidate.sourceParticipant, candidate.targetParticipant) +
    candidate.mappings.length * 100 +
    Number(candidate.pairScoreTotal ?? 0)
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
        sourceNode: reactantEntry.rootNode,
        targetNode: productEntry.rootNode,
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
  if (!participantsShareDirectIdentity(sourceParticipant, targetParticipant)) {
    return null;
  }
  const childMatchPlan = buildBestCompositeChildMatchPlan({
    sourceParticipant,
    targetParticipant,
    sourceRootNode: reactantEntry?.rootNode ?? null,
    targetRootNode: productEntry?.rootNode ?? null,
    resolveBinaryChoiceInventory,
    buildNodeKey,
  });
  if (!childMatchPlan?.sourceFullyMatched || !childMatchPlan?.targetFullyMatched) {
    return null;
  }

  const candidate = {
    type: "composite-carry-through",
    sourceParticipant,
    targetParticipant,
    productResolutionKind: "composite",
    mappings: childMatchPlan.mappings,
    pairScoreTotal: childMatchPlan.pairScoreTotal,
  };
  candidate.score = scoreCompositeCarryThroughCandidate(candidate);
  return candidate;
}

function createPartialCompositeCandidate(
  reactantEntry,
  productEntry,
  resolveBinaryChoiceInventory = null,
  buildNodeKey = null
) {
  const sourceParticipant = reactantEntry?.participant ?? null;
  const targetParticipant = productEntry?.participant ?? null;
  const childMatchPlan = buildBestCompositeChildMatchPlan({
    sourceParticipant,
    targetParticipant,
    sourceRootNode: reactantEntry?.rootNode ?? null,
    targetRootNode: productEntry?.rootNode ?? null,
    resolveBinaryChoiceInventory,
    buildNodeKey,
  });
  if (!childMatchPlan?.mappings?.length) {
    return null;
  }
  if (childMatchPlan.sourceFullyMatched && childMatchPlan.targetFullyMatched) {
    return null;
  }
  const candidate = {
    type: "partial-composite-direct",
    sourceParticipant,
    targetParticipant,
    productResolutionKind: "partial-composite",
    mappings: childMatchPlan.mappings,
    pairScoreTotal: childMatchPlan.pairScoreTotal,
    matchedSourceNodeIds: childMatchPlan.matchedSourceNodeIds,
    matchedTargetNodeIds: childMatchPlan.matchedTargetNodeIds,
  };
  candidate.score = scorePartialCompositeCandidate(candidate);
  return candidate;
}

function formatCount(count = 0, singular = "", plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function describeComposerReactionSolvePlan(plan = {}) {
  const directProductCount = Number(plan.directProductCount ?? 0);
  const compositeProductCount = Number(plan.compositeProductCount ?? 0);
  const partialCompositeProductCount = Number(plan.partialCompositeProductCount ?? 0);
  const associatedProductCount = Number(plan.associatedProductCount ?? 0);
  const parts = [];
  if (directProductCount > 0) {
    parts.push(formatCount(directProductCount, "direct product"));
  }
  if (compositeProductCount > 0) {
    parts.push(formatCount(compositeProductCount, "composite product"));
  }
  if (partialCompositeProductCount > 0) {
    parts.push(formatCount(partialCompositeProductCount, "partial composite product"));
  }
  if (associatedProductCount > 0) {
    parts.push(formatCount(associatedProductCount, "associated product"));
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
  const partialCandidates = [];
  const associateCandidates = [];
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
        return;
      }
      const partialCompositeCandidate = createPartialCompositeCandidate(
        reactantEntry,
        productEntry,
        resolveBinaryChoiceInventory,
        buildNodeKey
      );
      if (partialCompositeCandidate) {
        partialCandidates.push(partialCompositeCandidate);
      }
    });
  });
  for (let leftIndex = 0; leftIndex < reactants.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < reactants.length; rightIndex += 1) {
      products.forEach((productEntry) => {
        const associateCandidate = createAssociatePhotonCandidate({
          leftReactantEntry: reactants[leftIndex],
          rightReactantEntry: reactants[rightIndex],
          productEntry,
          resolveBinaryChoiceInventory,
        });
        if (associateCandidate) {
          associateCandidates.push(associateCandidate);
        }
      });
    }
  }

  const selectedCandidates = [];
  const selectedPartialCandidates = [];
  const selectedAssociateCandidates = [];
  const selectedMappings = [];
  const participantAdditions = [];
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
  const partialReactantIds = new Set();
  const partialProductIds = new Set();
  partialCandidates.sort(compareSolveCandidates).forEach((candidate) => {
    const sourceParticipantId = String(candidate?.sourceParticipant?.id ?? "");
    const targetParticipantId = String(candidate?.targetParticipant?.id ?? "");
    if (!sourceParticipantId || !targetParticipantId) {
      return;
    }
    if (usedReactantIds.has(sourceParticipantId) || usedProductIds.has(targetParticipantId)) {
      return;
    }
    if (partialReactantIds.has(sourceParticipantId) || partialProductIds.has(targetParticipantId)) {
      return;
    }
    partialReactantIds.add(sourceParticipantId);
    partialProductIds.add(targetParticipantId);
    selectedPartialCandidates.push(candidate);
    selectedMappings.push(...candidate.mappings);
  });
  associateCandidates.sort(compareSolveCandidates).forEach((candidate) => {
    const sourceParticipantIds = (candidate?.sourceParticipants ?? []).map((participant) =>
      String(participant?.id ?? "")
    );
    const targetParticipantId = String(candidate?.targetParticipant?.id ?? "");
    if (!targetParticipantId || sourceParticipantIds.some((participantId) => !participantId)) {
      return;
    }
    if (
      sourceParticipantIds.some(
        (participantId) =>
          usedReactantIds.has(participantId) || partialReactantIds.has(participantId)
      ) ||
      usedProductIds.has(targetParticipantId) ||
      partialProductIds.has(targetParticipantId)
    ) {
      return;
    }
    sourceParticipantIds.forEach((participantId) => usedReactantIds.add(participantId));
    usedProductIds.add(targetParticipantId);
    selectedAssociateCandidates.push(candidate);
    participantAdditions.push(...(candidate.participantAdditions ?? []));
    selectedMappings.push(...candidate.mappings);
  });

  return {
    mode: "direct-v1",
    selectedCandidates,
    selectedPartialCandidates,
    selectedAssociateCandidates,
    selectedMappings,
    participantAdditions,
    directProductCount: selectedCandidates.filter(
      (candidate) => candidate.productResolutionKind === "direct"
    ).length,
    compositeProductCount: selectedCandidates.filter(
      (candidate) => candidate.productResolutionKind === "composite"
    ).length,
    partialCompositeProductCount: selectedPartialCandidates.length,
    associatedProductCount: selectedAssociateCandidates.length,
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

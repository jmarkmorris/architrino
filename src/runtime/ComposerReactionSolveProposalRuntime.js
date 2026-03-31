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

function scoreFragmentRootCandidate(candidate = null) {
  if (!candidate) {
    return Number.NEGATIVE_INFINITY;
  }
  let score = 3000;
  if (candidate.sourceNode?.templateId === candidate.targetParticipant?.templateId) {
    score += 200;
  }
  if (
    normalizeText(candidate.sourceNode?.polarity) ===
    normalizeText(candidate.targetParticipant?.polarity)
  ) {
    score += 50;
  }
  if (candidate.evaluation?.provenanceMode === "direct") {
    score += 25;
  }
  return score;
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
  buildNodeKey = null,
  options = {}
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
    excludedSourceNodeIds: options.excludedSourceNodeIds ?? [],
    excludedTargetNodeIds: options.excludedTargetNodeIds ?? [],
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
    sourceFragmentKeys: childMatchPlan.mappings.map((mapping) => String(mapping?.sourceKey ?? "")),
  };
  candidate.score = scorePartialCompositeCandidate(candidate);
  return candidate;
}

function collectCompositeChildSourceEntries(reactants = [], buildNodeKey = null) {
  if (typeof buildNodeKey !== "function") {
    return [];
  }
  const entries = [];
  reactants.forEach((reactantEntry) => {
    const participant = reactantEntry?.participant ?? null;
    const rootNode = reactantEntry?.rootNode ?? null;
    if (!participant || !rootNode) {
      return;
    }
    const topLevelChildren = Array.isArray(rootNode.children) ? rootNode.children.filter(Boolean) : [];
    topLevelChildren.forEach((childNode) => {
      if (!childNode?.id) {
        return;
      }
      entries.push({
        participant,
        rootNode,
        sourceNode: childNode,
        sourceNodeKey: buildNodeKey(participant.id, childNode.id),
        sourceFragmentKey: buildNodeKey(participant.id, childNode.id),
        consumesWholeParticipant: false,
      });
    });
  });
  return entries;
}

function createFragmentRootCandidate(
  sourceEntry,
  productEntry,
  resolveBinaryChoiceInventory = null
) {
  const sourceParticipant = sourceEntry?.participant ?? null;
  const sourceNode = sourceEntry?.sourceNode ?? null;
  const targetParticipant = productEntry?.participant ?? null;
  const targetNode = productEntry?.rootNode ?? null;
  if (!sourceParticipant || !sourceNode || !targetParticipant || !targetNode) {
    return null;
  }
  if (normalizeText(sourceNode?.templateId) !== normalizeText(targetParticipant?.templateId)) {
    return null;
  }
  if (
    normalizeText(sourceNode?.polarity) &&
    normalizeText(targetParticipant?.polarity) &&
    normalizeText(sourceNode?.polarity) !== normalizeText(targetParticipant?.polarity)
  ) {
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
  const candidate = {
    type: "fragment-root-direct",
    sourceParticipant,
    sourceNode,
    targetParticipant,
    targetNode,
    sourceFragmentKey: String(sourceEntry?.sourceFragmentKey ?? sourceEntry?.sourceNodeKey ?? ""),
    productResolutionKind: "direct",
    mappings: [
      {
        sourceParticipant,
        sourceNode,
        targetParticipant,
        targetNode,
        sourceKey: sourceEntry.sourceNodeKey,
        targetKey: productEntry.rootNodeKey,
        sourceRole: "reactant",
        targetRole: "product",
        evaluation,
      },
    ],
    evaluation,
  };
  candidate.score = scoreFragmentRootCandidate(candidate);
  return candidate;
}

function formatCount(count = 0, singular = "", plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function collectAssociateSourceEntries(reactants = [], buildNodeKey = null) {
  if (typeof buildNodeKey !== "function") {
    return [];
  }
  const entries = [];
  reactants.forEach((reactantEntry) => {
    const participant = reactantEntry?.participant ?? null;
    const rootNode = reactantEntry?.rootNode ?? null;
    if (!participant || !rootNode) {
      return;
    }
    if (normalizeText(rootNode.templateId) === "noether_core" && reactantEntry.rootNodeKey) {
      entries.push({
        participant,
        rootNode,
        sourceNode: rootNode,
        sourceNodeKey: reactantEntry.rootNodeKey,
        sourceFragmentKey: reactantEntry.rootNodeKey,
        consumesWholeParticipant: true,
      });
      return;
    }
    const topLevelChildren = Array.isArray(rootNode.children) ? rootNode.children : [];
    topLevelChildren.forEach((childNode) => {
      if (normalizeText(childNode?.templateId) !== "noether_core" || !childNode?.id) {
        return;
      }
      const sourceNodeKey = buildNodeKey(participant.id, childNode.id);
      entries.push({
        participant,
        rootNode,
        sourceNode: childNode,
        sourceNodeKey,
        sourceFragmentKey: sourceNodeKey,
        consumesWholeParticipant: false,
      });
    });
  });
  return entries;
}

function getParticipantMatchedSourceNodeIds(selectedMappings = [], participantId = "") {
  const matchedNodeIds = new Set();
  selectedMappings.forEach((mapping) => {
    if (String(mapping?.sourceParticipant?.id ?? "") !== participantId) {
      return;
    }
    const sourceNodeId = String(mapping?.sourceNode?.id ?? "");
    if (sourceNodeId) {
      matchedNodeIds.add(sourceNodeId);
    }
  });
  return matchedNodeIds;
}

function getParticipantMatchedTargetNodeIds(selectedMappings = [], participantId = "") {
  const matchedNodeIds = new Set();
  selectedMappings.forEach((mapping) => {
    if (String(mapping?.targetParticipant?.id ?? "") !== participantId) {
      return;
    }
    const targetNodeId = String(mapping?.targetNode?.id ?? "");
    if (targetNodeId) {
      matchedNodeIds.add(targetNodeId);
    }
  });
  return matchedNodeIds;
}

function isReactantEntryResolved(entry = null, usedReactantIds = new Set(), selectedMappings = []) {
  const participantId = String(entry?.participant?.id ?? "");
  if (!participantId) {
    return false;
  }
  if (usedReactantIds.has(participantId)) {
    return true;
  }
  const rootNode = entry?.rootNode ?? null;
  if (!rootNode?.id) {
    return false;
  }
  const matchedNodeIds = getParticipantMatchedSourceNodeIds(selectedMappings, participantId);
  const topLevelChildren = Array.isArray(rootNode.children) ? rootNode.children.filter(Boolean) : [];
  if (!topLevelChildren.length) {
    return matchedNodeIds.has(rootNode.id);
  }
  return topLevelChildren.every((childNode) => matchedNodeIds.has(String(childNode?.id ?? "")));
}

function isProductEntryResolved(entry = null, usedProductIds = new Set(), selectedMappings = []) {
  const participantId = String(entry?.participant?.id ?? "");
  if (!participantId) {
    return false;
  }
  if (usedProductIds.has(participantId)) {
    return true;
  }
  const rootNode = entry?.rootNode ?? null;
  if (!rootNode?.id) {
    return false;
  }
  const matchedNodeIds = getParticipantMatchedTargetNodeIds(selectedMappings, participantId);
  const topLevelChildren = Array.isArray(rootNode.children) ? rootNode.children.filter(Boolean) : [];
  if (!topLevelChildren.length) {
    return matchedNodeIds.has(rootNode.id);
  }
  return topLevelChildren.every((childNode) => matchedNodeIds.has(String(childNode?.id ?? "")));
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
  const fragmentCandidates = [];
  const associateCandidates = [];
  const associateSourceEntries = collectAssociateSourceEntries(reactants, buildNodeKey);
  const compositeChildSourceEntries = collectCompositeChildSourceEntries(reactants, buildNodeKey);
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
    });
  });
  compositeChildSourceEntries.forEach((sourceEntry) => {
    products.forEach((productEntry) => {
      const fragmentCandidate = createFragmentRootCandidate(
        sourceEntry,
        productEntry,
        resolveBinaryChoiceInventory
      );
      if (fragmentCandidate) {
        fragmentCandidates.push(fragmentCandidate);
      }
    });
  });
  for (let leftIndex = 0; leftIndex < associateSourceEntries.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < associateSourceEntries.length; rightIndex += 1) {
      products.forEach((productEntry) => {
        const associateCandidate = createAssociatePhotonCandidate({
          leftReactantEntry: associateSourceEntries[leftIndex],
          rightReactantEntry: associateSourceEntries[rightIndex],
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
  const selectedFragmentCandidates = [];
  const selectedPartialCandidates = [];
  const selectedAssociateCandidates = [];
  const selectedMappings = [];
  const participantAdditions = [];
  const usedReactantIds = new Set();
  const usedProductIds = new Set();
  const usedReactantSourceFragmentKeys = new Set();
  const claimedPartialProductIds = new Set();
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
  fragmentCandidates.sort(compareSolveCandidates).forEach((candidate) => {
    const sourceParticipantId = String(candidate?.sourceParticipant?.id ?? "");
    const sourceFragmentKey = String(candidate?.sourceFragmentKey ?? "");
    const targetParticipantId = String(candidate?.targetParticipant?.id ?? "");
    if (!sourceParticipantId || !sourceFragmentKey || !targetParticipantId) {
      return;
    }
    if (
      usedReactantIds.has(sourceParticipantId) ||
      usedReactantSourceFragmentKeys.has(sourceFragmentKey) ||
      usedProductIds.has(targetParticipantId)
    ) {
      return;
    }
    usedReactantSourceFragmentKeys.add(sourceFragmentKey);
    usedProductIds.add(targetParticipantId);
    selectedFragmentCandidates.push(candidate);
    selectedMappings.push(...candidate.mappings);
  });
  associateCandidates.sort(compareSolveCandidates).forEach((candidate) => {
    const sourceEntries = Array.isArray(candidate?.sourceEntries) ? candidate.sourceEntries : [];
    const sourceParticipantIds = sourceEntries.map((entry) =>
      String(entry?.participant?.id ?? "")
    );
    const sourceFragmentKeys = sourceEntries.map((entry) =>
      String(entry?.sourceFragmentKey ?? entry?.sourceNodeKey ?? "")
    );
    const targetParticipantId = String(candidate?.targetParticipant?.id ?? "");
    if (
      !targetParticipantId ||
      sourceParticipantIds.some((participantId) => !participantId) ||
      sourceFragmentKeys.some((fragmentKey) => !fragmentKey)
    ) {
      return;
    }
    if (
      sourceParticipantIds.some(
        (participantId) => usedReactantIds.has(participantId)
      ) ||
      sourceFragmentKeys.some((fragmentKey) => usedReactantSourceFragmentKeys.has(fragmentKey)) ||
      usedProductIds.has(targetParticipantId)
    ) {
      return;
    }
    sourceFragmentKeys.forEach((fragmentKey) => usedReactantSourceFragmentKeys.add(fragmentKey));
    sourceEntries.forEach((entry) => {
      if (entry?.consumesWholeParticipant) {
        usedReactantIds.add(String(entry?.participant?.id ?? ""));
      }
    });
    usedProductIds.add(targetParticipantId);
    selectedAssociateCandidates.push(candidate);
    participantAdditions.push(...(candidate.participantAdditions ?? []));
    selectedMappings.push(...candidate.mappings);
  });
  reactants.forEach((reactantEntry) => {
    products.forEach((productEntry) => {
      const sourceParticipantId = String(reactantEntry?.participant?.id ?? "");
      const targetParticipantId = String(productEntry?.participant?.id ?? "");
      if (!sourceParticipantId || !targetParticipantId) {
        return;
      }
      if (
        usedReactantIds.has(sourceParticipantId) ||
        usedProductIds.has(targetParticipantId) ||
        claimedPartialProductIds.has(targetParticipantId)
      ) {
        return;
      }
      const excludedSourceNodeIds = Array.from(usedReactantSourceFragmentKeys)
        .filter((fragmentKey) => fragmentKey.startsWith(`${sourceParticipantId}:`))
        .map((fragmentKey) => fragmentKey.slice(sourceParticipantId.length + 1))
        .filter(Boolean);
      const candidate = createPartialCompositeCandidate(
        reactantEntry,
        productEntry,
        resolveBinaryChoiceInventory,
        buildNodeKey,
        { excludedSourceNodeIds }
      );
      if (!candidate) {
        return;
      }
      if (
        (candidate.sourceFragmentKeys ?? []).some((fragmentKey) =>
          usedReactantSourceFragmentKeys.has(String(fragmentKey ?? ""))
        )
      ) {
        return;
      }
      (candidate.sourceFragmentKeys ?? []).forEach((fragmentKey) =>
        usedReactantSourceFragmentKeys.add(String(fragmentKey ?? ""))
      );
      selectedPartialCandidates.push(candidate);
      claimedPartialProductIds.add(targetParticipantId);
      selectedMappings.push(...candidate.mappings);
    });
  });

  return {
    mode: "direct-v1",
    selectedCandidates,
    selectedFragmentCandidates,
    selectedPartialCandidates,
    selectedAssociateCandidates,
    selectedMappings,
    participantAdditions,
    directProductCount:
      selectedFragmentCandidates.length +
      selectedCandidates.filter(
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
      (entry) => !isReactantEntryResolved(entry, usedReactantIds, selectedMappings)
    ),
    unresolvedProducts: products.filter(
      (entry) => !isProductEntryResolved(entry, usedProductIds, selectedMappings)
    ),
  };
}

export const buildComposerReactionDirectRootPlan = buildComposerReactionSolvePlan;

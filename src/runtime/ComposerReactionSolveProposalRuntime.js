import { evaluateComposerReactionMappingCandidate } from "./ComposerReactionStructureMappingRuntime.js";
import {
  createAssociateCompositeCandidate,
  createAssociatePhotonCandidate,
  createAssociateStandaloneCandidate,
} from "./ComposerReactionSolveAssociateRuntime.js";
import { buildBestCompositeChildMatchPlan } from "./ComposerReactionSolveMatchRuntime.js";
import { selectBestComposerReactionSolveCandidates } from "./ComposerReactionSolveSelectionRuntime.js";

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

function scoreCenterRootCandidate(candidate = null) {
  if (!candidate) {
    return Number.NEGATIVE_INFINITY;
  }
  let score = 2400;
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

function scoreProductChildCandidate(candidate = null) {
  if (!candidate) {
    return Number.NEGATIVE_INFINITY;
  }
  let score = 2800;
  if (candidate.sourceNode?.templateId === candidate.targetNode?.templateId) {
    score += 200;
  }
  if (
    normalizeText(candidate.sourceNode?.polarity) === normalizeText(candidate.targetNode?.polarity)
  ) {
    score += 50;
  }
  if (candidate.evaluation?.provenanceMode === "direct") {
    score += 25;
  }
  return score;
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
  if (
    !entryHasTopLevelConstituentChildren(reactantEntry) ||
    !entryHasTopLevelConstituentChildren(productEntry)
  ) {
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

function entryHasTopLevelConstituentChildren(entry = null) {
  const rootNode = entry?.rootNode ?? null;
  const topLevelChildren = Array.isArray(rootNode?.children)
    ? rootNode.children.filter((childNode) => childNode && childNode.templateId)
    : [];
  return topLevelChildren.length > 0;
}

function createCenterRootCandidate(
  sourceEntry,
  productEntry,
  resolveBinaryChoiceInventory = null
) {
  const sourceParticipant = sourceEntry?.participant ?? null;
  const sourceNode = sourceEntry?.rootNode ?? null;
  const targetParticipant = productEntry?.participant ?? null;
  const targetNode = productEntry?.rootNode ?? null;
  if (
    !sourceEntry?.isCenterAssembly ||
    !sourceParticipant ||
    !sourceNode ||
    !targetParticipant ||
    !targetNode ||
    entryHasTopLevelConstituentChildren(productEntry)
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
    type: "center-root-direct",
    sourceParticipant,
    sourceNode,
    targetParticipant,
    targetNode,
    productResolutionKind: "direct",
    mappings: [
      {
        sourceParticipant,
        sourceNode,
        targetParticipant,
        targetNode,
        sourceKey: sourceEntry.rootNodeKey,
        targetKey: productEntry.rootNodeKey,
        sourceRole: "reactant",
        targetRole: "product",
        evaluation,
      },
    ],
    evaluation,
  };
  candidate.score = scoreCenterRootCandidate(candidate);
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

function collectStandaloneRootSourceEntries(reactants = []) {
  const entries = [];
  reactants.forEach((reactantEntry) => {
    const participant = reactantEntry?.participant ?? null;
    const rootNode = reactantEntry?.rootNode ?? null;
    const topLevelConstituentChildren = Array.isArray(rootNode?.children)
      ? rootNode.children.filter((childNode) => childNode && childNode.templateId)
      : [];
    if (!participant || !rootNode || topLevelConstituentChildren.length) {
      return;
    }
    entries.push({
      participant,
      rootNode,
      sourceNode: rootNode,
      sourceNodeKey: reactantEntry.rootNodeKey,
      sourceFragmentKey: reactantEntry.rootNodeKey,
      consumesWholeParticipant: true,
    });
  });
  return entries;
}

function collectCompositeChildTargetEntries(products = [], buildNodeKey = null, options = {}) {
  if (typeof buildNodeKey !== "function") {
    return [];
  }
  const allowedParticipantIds =
    options.allowedParticipantIds instanceof Set ? options.allowedParticipantIds : null;
  const entries = [];
  products.forEach((productEntry) => {
    const participant = productEntry?.participant ?? null;
    const rootNode = productEntry?.rootNode ?? null;
    if (!participant || !rootNode) {
      return;
    }
    if (allowedParticipantIds && !allowedParticipantIds.has(String(participant.id ?? ""))) {
      return;
    }
    const topLevelChildren = Array.isArray(rootNode.children) ? rootNode.children.filter(Boolean) : [];
    topLevelChildren.forEach((targetNode) => {
      if (!targetNode?.id) {
        return;
      }
      entries.push({
        participant,
        rootNode,
        targetNode,
        targetNodeKey: buildNodeKey(participant.id, targetNode.id),
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

function createProductChildCandidate(
  sourceEntry,
  targetEntry,
  resolveBinaryChoiceInventory = null
) {
  const sourceParticipant = sourceEntry?.participant ?? null;
  const sourceNode = sourceEntry?.sourceNode ?? null;
  const targetParticipant = targetEntry?.participant ?? null;
  const targetNode = targetEntry?.targetNode ?? null;
  if (!sourceParticipant || !sourceNode || !targetParticipant || !targetNode) {
    return null;
  }
  if (normalizeText(sourceNode?.templateId) !== normalizeText(targetNode?.templateId)) {
    return null;
  }
  if (
    normalizeText(sourceNode?.polarity) &&
    normalizeText(targetNode?.polarity) &&
    normalizeText(sourceNode?.polarity) !== normalizeText(targetNode?.polarity)
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
    type: "product-child-direct",
    sourceParticipant,
    sourceNode,
    targetParticipant,
    targetNode,
    sourceFragmentKey: String(sourceEntry?.sourceFragmentKey ?? sourceEntry?.sourceNodeKey ?? ""),
    targetFragmentKey: String(targetEntry?.targetNodeKey ?? ""),
    consumesWholeParticipant: Boolean(sourceEntry?.consumesWholeParticipant),
    productResolutionKind: "partial-composite",
    mappings: [
      {
        sourceParticipant,
        sourceNode,
        targetParticipant,
        targetNode,
        sourceKey: sourceEntry.sourceNodeKey,
        targetKey: targetEntry.targetNodeKey,
        sourceRole: "reactant",
        targetRole: "product",
        evaluation,
      },
    ],
    evaluation,
  };
  candidate.score = scoreProductChildCandidate(candidate);
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
    if (normalizeText(rootNode.templateId) === "free_architrinos" && reactantEntry.rootNodeKey) {
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

function collectPlanDissociatedCompositeParticipants(reactants = [], selectedMappings = []) {
  const compositeReactantsById = new Map();
  reactants.forEach((entry) => {
    const participant = entry?.participant ?? null;
    const rootNode = entry?.rootNode ?? null;
    const topLevelChildren = Array.isArray(rootNode?.children)
      ? rootNode.children.filter((childNode) => childNode?.id && childNode?.templateId)
      : [];
    if (!participant?.id || !rootNode?.id || !topLevelChildren.length) {
      return;
    }
    compositeReactantsById.set(String(participant.id), {
      participant,
      rootNodeId: String(rootNode.id),
    });
  });

  const seenParticipantIds = new Set();
  const dissociatedCompositeParticipants = [];
  selectedMappings.forEach((mapping) => {
    const participantId = String(mapping?.sourceParticipant?.id ?? "");
    const sourceNodeId = String(mapping?.sourceNode?.id ?? "");
    if (!participantId || !sourceNodeId || seenParticipantIds.has(participantId)) {
      return;
    }
    const compositeEntry = compositeReactantsById.get(participantId) ?? null;
    if (!compositeEntry || sourceNodeId === compositeEntry.rootNodeId) {
      return;
    }
    seenParticipantIds.add(participantId);
    dissociatedCompositeParticipants.push(compositeEntry.participant);
  });
  return dissociatedCompositeParticipants;
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
  const centerAssemblies = Array.isArray(solveState.centerAssemblies) ? solveState.centerAssemblies : [];
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
  const productChildCandidates = [];
  const sourceEntries = [...reactants, ...centerAssemblies];
  const associateSourceEntries = collectAssociateSourceEntries(sourceEntries, buildNodeKey);
  const compositeChildSourceEntries = collectCompositeChildSourceEntries(sourceEntries, buildNodeKey);
  const standaloneRootSourceEntries = collectStandaloneRootSourceEntries(sourceEntries);
  const associateCompositeSourceEntries = [
    ...standaloneRootSourceEntries,
    ...compositeChildSourceEntries,
  ];
  sourceEntries.forEach((reactantEntry) => {
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
      const centerCandidate = createCenterRootCandidate(
        reactantEntry,
        productEntry,
        resolveBinaryChoiceInventory
      );
      if (centerCandidate) {
        candidates.push(centerCandidate);
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
  products.forEach((productEntry) => {
    if (
      reactants.some((reactantEntry) =>
        participantsShareDirectIdentity(reactantEntry?.participant, productEntry?.participant)
      )
    ) {
      return;
    }
    const standaloneAssociateCandidate = createAssociateStandaloneCandidate({
      sourceEntries: associateSourceEntries,
      productEntry,
      resolveBinaryChoiceInventory,
    });
    if (standaloneAssociateCandidate) {
      associateCandidates.push(standaloneAssociateCandidate);
      return;
    }
    const associateCandidate = createAssociateCompositeCandidate({
      sourceEntries: associateCompositeSourceEntries,
      productEntry,
      resolveBinaryChoiceInventory,
    });
    if (associateCandidate) {
      associateCandidates.push(associateCandidate);
    }
  });

  const selectedCandidates = [];
  const selectedMappings = [];
  const participantAdditions = [];
  const selectedBaseCandidateSet = selectBestComposerReactionSolveCandidates([
    ...candidates,
    ...fragmentCandidates,
    ...associateCandidates,
  ]);
  const selectedFragmentCandidates = Array.isArray(
    selectedBaseCandidateSet.selectedFragmentCandidates
  )
    ? selectedBaseCandidateSet.selectedFragmentCandidates
    : [];
  const selectedAssociateCandidates = Array.isArray(
    selectedBaseCandidateSet.selectedAssociateCandidates
  )
    ? selectedBaseCandidateSet.selectedAssociateCandidates
    : [];
  selectedCandidates.push(
    ...(
      Array.isArray(selectedBaseCandidateSet.selectedCandidates)
        ? selectedBaseCandidateSet.selectedCandidates
        : []
    )
  );
  [
    ...selectedCandidates,
    ...selectedFragmentCandidates,
    ...selectedAssociateCandidates,
  ].forEach((candidate) => {
    selectedMappings.push(...(candidate?.mappings ?? []));
    participantAdditions.push(...(candidate?.participantAdditions ?? []));
  });

  const usedReactantIds = new Set(
    selectedCandidates
      .map((candidate) => String(candidate?.sourceParticipant?.id ?? ""))
      .filter(Boolean)
  );
  const usedProductIds = new Set(
    [
      ...selectedCandidates,
      ...selectedFragmentCandidates,
      ...selectedAssociateCandidates,
    ]
      .map((candidate) => String(candidate?.targetParticipant?.id ?? ""))
      .filter(Boolean)
  );
  selectedAssociateCandidates.forEach((candidate) => {
    (Array.isArray(candidate?.sourceEntries) ? candidate.sourceEntries : []).forEach((entry) => {
      if (entry?.consumesWholeParticipant) {
        usedReactantIds.add(String(entry?.participant?.id ?? ""));
      }
    });
  });
  const usedReactantSourceFragmentKeys = new Set(
    [
      ...selectedFragmentCandidates.flatMap((candidate) => candidate?.sourceFragmentKey ?? []),
      ...selectedAssociateCandidates.flatMap((candidate) =>
        Array.isArray(candidate?.sourceEntries)
          ? candidate.sourceEntries.map(
              (entry) => entry?.sourceFragmentKey ?? entry?.sourceNodeKey ?? ""
            )
          : []
      ),
    ]
      .flat()
      .map((fragmentKey) => String(fragmentKey ?? ""))
      .filter(Boolean)
  );

  const partialCandidates = [];
  reactants.forEach((reactantEntry) => {
    products.forEach((productEntry) => {
      const sourceParticipantId = String(reactantEntry?.participant?.id ?? "");
      const targetParticipantId = String(productEntry?.participant?.id ?? "");
      if (!sourceParticipantId || !targetParticipantId) {
        return;
      }
      if (
        usedReactantIds.has(sourceParticipantId) ||
        usedProductIds.has(targetParticipantId)
      ) {
        return;
      }
      const candidate = createPartialCompositeCandidate(
        reactantEntry,
        productEntry,
        resolveBinaryChoiceInventory,
        buildNodeKey
      );
      if (!candidate) {
        return;
      }
      partialCandidates.push(candidate);
    });
  });

  const selectedPartialSet = selectBestComposerReactionSolveCandidates(
    partialCandidates.filter(
      (candidate) =>
        !(candidate?.sourceFragmentKeys ?? []).some((fragmentKey) =>
          usedReactantSourceFragmentKeys.has(String(fragmentKey ?? ""))
        )
    )
  );
  const selectedPartialCandidates = Array.isArray(selectedPartialSet.selectedPartialCandidates)
    ? selectedPartialSet.selectedPartialCandidates
    : [];
  const claimedPartialProductIds = new Set(
    selectedPartialCandidates
      .map((candidate) => String(candidate?.targetParticipant?.id ?? ""))
      .filter(Boolean)
  );
  selectedPartialCandidates.forEach((candidate) => {
    (candidate?.sourceFragmentKeys ?? []).forEach((fragmentKey) =>
      usedReactantSourceFragmentKeys.add(String(fragmentKey ?? ""))
    );
    selectedMappings.push(...(candidate?.mappings ?? []));
  });

  const usedProductTargetFragmentKeys = new Set(
    selectedMappings
      .map((mapping) => {
        const targetParticipantId = String(mapping?.targetParticipant?.id ?? "");
        const targetNodeId = String(mapping?.targetNode?.id ?? "");
        return targetParticipantId && targetNodeId && typeof buildNodeKey === "function"
          ? buildNodeKey(targetParticipantId, targetNodeId)
          : "";
      })
      .filter(Boolean)
  );
  const selectedProductChildSet = selectBestComposerReactionSolveCandidates(
    productChildCandidates.filter((candidate) => {
      const sourceParticipantId = String(candidate?.sourceParticipant?.id ?? "");
      const sourceFragmentKey = String(candidate?.sourceFragmentKey ?? "");
      const targetFragmentKey = String(candidate?.targetFragmentKey ?? "");
      if (!sourceParticipantId || !sourceFragmentKey || !targetFragmentKey) {
        return false;
      }
      return (
        !usedReactantIds.has(sourceParticipantId) &&
        !usedReactantSourceFragmentKeys.has(sourceFragmentKey) &&
        !usedProductTargetFragmentKeys.has(targetFragmentKey)
      );
    })
  );
  const selectedProductChildCandidates = Array.isArray(
    selectedProductChildSet.selectedProductChildCandidates
  )
    ? selectedProductChildSet.selectedProductChildCandidates
    : [];
  selectedProductChildCandidates.forEach((candidate) => {
    if (candidate?.consumesWholeParticipant) {
      usedReactantIds.add(String(candidate?.sourceParticipant?.id ?? ""));
    }
    usedReactantSourceFragmentKeys.add(String(candidate?.sourceFragmentKey ?? ""));
    usedProductTargetFragmentKeys.add(String(candidate?.targetFragmentKey ?? ""));
    selectedMappings.push(...(candidate?.mappings ?? []));
  });

  const dissociatedCompositeParticipants = collectPlanDissociatedCompositeParticipants(
    reactants,
    selectedMappings
  );

  return {
    mode: "direct-v1",
    selectedCandidates,
    selectedFragmentCandidates,
    selectedPartialCandidates,
    selectedAssociateCandidates,
    selectedProductChildCandidates,
    selectedMappings,
    participantAdditions,
    dissociatedCompositeParticipants,
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

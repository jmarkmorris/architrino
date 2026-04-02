import {
  classifyReactionNode,
  evaluateReactionMappingCandidate,
} from "./ReactionStructureMappingRuntime.js";
import {
  createAssociateCompositeCandidate,
  createAssociatePhotonCandidate,
  createAssociateStandaloneCandidate,
} from "./ReactionSolveAssociateRuntime.js";
import { buildBestCompositeChildMatchPlan } from "./ReactionSolveMatchRuntime.js";
import { selectBestReactionSolveCandidates } from "./ReactionSolveSelectionRuntime.js";

function normalizeText(value = "") {
  return String(value ?? "").trim().toLowerCase();
}

function compareText(left = "", right = "") {
  return String(left ?? "").localeCompare(String(right ?? ""));
}

function createEmptyInventory() {
  return {
    proCore: 0,
    antiCore: 0,
    electrino: 0,
    positrino: 0,
  };
}

function normalizeInventory(inventory = null) {
  const normalized = createEmptyInventory();
  if (!inventory || typeof inventory !== "object") {
    return normalized;
  }
  Object.keys(normalized).forEach((key) => {
    normalized[key] = Math.max(0, Number(inventory?.[key] ?? 0));
  });
  return normalized;
}

function addInventories(left = null, right = null) {
  const sum = createEmptyInventory();
  const leftInventory = normalizeInventory(left);
  const rightInventory = normalizeInventory(right);
  Object.keys(sum).forEach((key) => {
    sum[key] = leftInventory[key] + rightInventory[key];
  });
  return sum;
}

function inventoriesEqual(left = null, right = null) {
  const leftInventory = normalizeInventory(left);
  const rightInventory = normalizeInventory(right);
  return Object.keys(leftInventory).every((key) => leftInventory[key] === rightInventory[key]);
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
  const evaluation = evaluateReactionMappingCandidate({
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

function allowsDirectCenterCompositeProductMapping(sourceParticipant = null, targetParticipant = null) {
  return (
    normalizeText(sourceParticipant?.templateId) === "z_boson" &&
    normalizeText(targetParticipant?.templateId) === "photon"
  );
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
    (entryHasTopLevelConstituentChildren(productEntry) &&
      !allowsDirectCenterCompositeProductMapping(sourceParticipant, targetParticipant))
  ) {
    return null;
  }
  const evaluation = evaluateReactionMappingCandidate({
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
  const evaluation = evaluateReactionMappingCandidate({
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
  const evaluation = evaluateReactionMappingCandidate({
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

function getParticipantTopLevelChildNodes(rootNode = null) {
  return Array.isArray(rootNode?.children)
    ? rootNode.children.filter((childNode) => childNode?.id && childNode?.templateId)
    : [];
}

function sortTextList(values = []) {
  return values
    .map((value) => String(value ?? ""))
    .filter(Boolean)
    .sort((left, right) => left.localeCompare(right));
}

function buildParticipantResidueEntry(entry = null, matchedNodeIds = new Set()) {
  const participant = entry?.participant ?? null;
  const rootNode = entry?.rootNode ?? null;
  const participantId = String(participant?.id ?? "");
  const rootNodeId = String(rootNode?.id ?? "");
  if (!participantId || !rootNodeId) {
    return null;
  }
  const topLevelChildren = getParticipantTopLevelChildNodes(rootNode);
  const unresolvedNodeIds = topLevelChildren.length
    ? sortTextList(
        topLevelChildren
          .map((childNode) => String(childNode?.id ?? ""))
          .filter((nodeId) => nodeId && !matchedNodeIds.has(nodeId))
      )
    : matchedNodeIds.has(rootNodeId)
      ? []
      : [rootNodeId];
  if (!unresolvedNodeIds.length) {
    return null;
  }
  return {
    participantId,
    templateId: normalizeText(participant?.templateId),
    polarity: normalizeText(participant?.polarity),
    rootNodeId,
    residueKind: topLevelChildren.length ? "fragments" : "whole-participant",
    unresolvedNodeIds,
  };
}

function collectPlanResidueEntries(entries = [], selectedMappings = [], target = "source") {
  const matchNodeIds =
    target === "target" ? getParticipantMatchedTargetNodeIds : getParticipantMatchedSourceNodeIds;
  return entries
    .map((entry) =>
      buildParticipantResidueEntry(
        entry,
        matchNodeIds(selectedMappings, String(entry?.participant?.id ?? ""))
      )
    )
    .filter(Boolean);
}

function collectPlanAutoDissociationSummary(reactants = [], selectedMappings = []) {
  const compositeReactants = [];
  reactants.forEach((entry) => {
    const participant = entry?.participant ?? null;
    const rootNode = entry?.rootNode ?? null;
    const topLevelChildren = getParticipantTopLevelChildNodes(rootNode);
    if (!participant?.id || !rootNode?.id || !topLevelChildren.length) {
      return;
    }
    compositeReactants.push({
      participant,
      templateId: normalizeText(participant?.templateId),
      rootNodeId: String(rootNode.id),
      topLevelChildren,
    });
  });

  return compositeReactants
    .map((entry) => {
      const matchedNodeIds = getParticipantMatchedSourceNodeIds(
        selectedMappings,
        String(entry?.participant?.id ?? "")
      );
      const consumedNodeIds = sortTextList(
        entry.topLevelChildren
          .map((childNode) => String(childNode?.id ?? ""))
          .filter((nodeId) => nodeId && matchedNodeIds.has(nodeId))
      );
      if (!consumedNodeIds.length || matchedNodeIds.has(entry.rootNodeId)) {
        return null;
      }
      const remainingNodeIds = sortTextList(
        entry.topLevelChildren
          .map((childNode) => String(childNode?.id ?? ""))
          .filter((nodeId) => nodeId && !matchedNodeIds.has(nodeId))
      );
      return {
        participantId: String(entry.participant.id),
        templateId: entry.templateId,
        rootNodeId: entry.rootNodeId,
        consumedNodeIds,
        remainingNodeIds,
      };
    })
    .filter(Boolean);
}

function resolveAssociateSourceInventory(entry = null, resolveBinaryChoiceInventory = null) {
  const participant = entry?.participant ?? null;
  const sourceNode = entry?.sourceNode ?? entry?.rootNode ?? null;
  if (!participant || !sourceNode) {
    return createEmptyInventory();
  }
  const sourceSpec = classifyReactionNode(participant, sourceNode, {
    resolveBinaryChoiceInventory,
  });
  return normalizeInventory(sourceSpec?.inventory);
}

function isSourceEntryTemplate(entry = null, templateId = "") {
  return normalizeText(
    entry?.sourceNode?.templateId ?? entry?.rootNode?.templateId ?? entry?.participant?.templateId ?? ""
  ) === normalizeText(templateId);
}

function getSourceEntryPolarity(entry = null) {
  return normalizeText(
    entry?.sourceNode?.polarity ?? entry?.rootNode?.polarity ?? entry?.participant?.polarity ?? ""
  );
}

function buildExactCenterBosonRecognitions(
  selectedAssociateCandidates = [],
  centerAssemblies = [],
  unresolvedReactants = [],
  unresolvedProducts = [],
  resolveBinaryChoiceInventory = null
) {
  if (unresolvedReactants.length || unresolvedProducts.length) {
    return [];
  }
  const centerParticipantIds = new Set(
    centerAssemblies.map((entry) => String(entry?.participant?.id ?? "")).filter(Boolean)
  );
  return selectedAssociateCandidates
    .map((candidate) => {
      const sourceEntries = Array.isArray(candidate?.sourceEntries) ? candidate.sourceEntries : [];
      if (
        sourceEntries.length !== 2 ||
        sourceEntries.some(
          (entry) => !centerParticipantIds.has(String(entry?.participant?.id ?? ""))
        )
      ) {
        return null;
      }
      const targetParticipant = candidate?.targetParticipant ?? null;
      const targetTemplateId = normalizeText(targetParticipant?.templateId);
      const targetPolarity = normalizeText(targetParticipant?.polarity);
      const orderedSourceRefs = sourceEntries
        .map((entry) => ({
          participantId: String(entry?.participant?.id ?? ""),
          nodeId: String(entry?.sourceNode?.id ?? entry?.rootNode?.id ?? ""),
        }))
        .sort(
          (left, right) =>
            compareText(left?.participantId, right?.participantId) ||
            compareText(left?.nodeId, right?.nodeId)
        );
      const sourceParticipantIds = orderedSourceRefs.map((entry) => entry.participantId);
      const sourceNodeIds = orderedSourceRefs.map((entry) => entry.nodeId);
      const coreEntry = sourceEntries.find((entry) => isSourceEntryTemplate(entry, "noether_core")) ?? null;
      const freeEntry =
        sourceEntries.find((entry) => isSourceEntryTemplate(entry, "free_architrinos")) ?? null;
      const coreEntries = sourceEntries.filter((entry) => isSourceEntryTemplate(entry, "noether_core"));
      if (
        coreEntry &&
        freeEntry &&
        targetTemplateId === "electron" &&
        targetPolarity === "pro" &&
        getSourceEntryPolarity(coreEntry) === "pro" &&
        inventoriesEqual(resolveAssociateSourceInventory(freeEntry, resolveBinaryChoiceInventory), {
          electrino: 6,
          positrino: 0,
        })
      ) {
        return {
          kind: "late-center-exact",
          templateId: "w_minus_boson",
          targetParticipantId: String(targetParticipant?.id ?? ""),
          targetTemplateId,
          sourceParticipantIds,
          sourceNodeIds,
          sourcePattern: {
            corePolarities: ["pro"],
            freeArchitrinoLedger: {
              electrino: 6,
              positrino: 0,
            },
          },
        };
      }
      if (
        coreEntry &&
        freeEntry &&
        targetTemplateId === "electron" &&
        targetPolarity === "anti" &&
        getSourceEntryPolarity(coreEntry) === "anti" &&
        inventoriesEqual(resolveAssociateSourceInventory(freeEntry, resolveBinaryChoiceInventory), {
          electrino: 0,
          positrino: 6,
        })
      ) {
        return {
          kind: "late-center-exact",
          templateId: "w_plus_boson",
          targetParticipantId: String(targetParticipant?.id ?? ""),
          targetTemplateId,
          sourceParticipantIds,
          sourceNodeIds,
          sourcePattern: {
            corePolarities: ["anti"],
            freeArchitrinoLedger: {
              electrino: 0,
              positrino: 6,
            },
          },
        };
      }
      if (
        targetTemplateId === "photon" &&
        coreEntries.length === 2 &&
        new Set(coreEntries.map((entry) => getSourceEntryPolarity(entry))).size === 2 &&
        coreEntries.every((entry) => {
          const polarity = getSourceEntryPolarity(entry);
          return polarity === "pro" || polarity === "anti";
        })
      ) {
        return {
          kind: "late-center-exact",
          templateId: "z_boson",
          targetParticipantId: String(targetParticipant?.id ?? ""),
          targetTemplateId,
          sourceParticipantIds,
          sourceNodeIds,
          sourcePattern: {
            corePolarities: coreEntries
              .map((entry) => getSourceEntryPolarity(entry))
              .sort((left, right) => compareText(left, right)),
          },
        };
      }
      return null;
    })
    .filter(Boolean)
    .sort((left, right) => compareText(left?.templateId, right?.templateId));
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

export function describeReactionSolvePlan(plan = {}) {
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

export function buildReactionSolvePlan(options = {}) {
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
  const selectedBaseCandidateSet = selectBestReactionSolveCandidates([
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

  const selectedPartialSet = selectBestReactionSolveCandidates(
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
  const selectedProductChildSet = selectBestReactionSolveCandidates(
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

  const unresolvedReactants = reactants.filter(
    (entry) => !isReactantEntryResolved(entry, usedReactantIds, selectedMappings)
  );
  const unresolvedProducts = products.filter(
    (entry) => !isProductEntryResolved(entry, usedProductIds, selectedMappings)
  );
  const autoDissociatedParticipants = collectPlanAutoDissociationSummary(reactants, selectedMappings);
  const autoDissociatedParticipantIds = autoDissociatedParticipants.map(
    (entry) => entry.participantId
  );
  const dissociatedCompositeParticipants = autoDissociatedParticipantIds
    .map((participantId) =>
      reactants.find((entry) => String(entry?.participant?.id ?? "") === participantId)?.participant ?? null
    )
    .filter(Boolean);
  const residue = {
    source: collectPlanResidueEntries(unresolvedReactants, selectedMappings, "source"),
    target: collectPlanResidueEntries(unresolvedProducts, selectedMappings, "target"),
  };
  const recognizedCenterBosons = buildExactCenterBosonRecognitions(
    selectedAssociateCandidates,
    centerAssemblies,
    unresolvedReactants,
    unresolvedProducts,
    resolveBinaryChoiceInventory
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
    dissociation: {
      autoDissociatedParticipantIds,
      autoDissociatedParticipants,
    },
    residue,
    recognizedCenterBosons,
    recognizedCenterBosonCount: recognizedCenterBosons.length,
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
    unresolvedReactants,
    unresolvedProducts,
  };
}

export const buildReactionDirectRootPlan = buildReactionSolvePlan;

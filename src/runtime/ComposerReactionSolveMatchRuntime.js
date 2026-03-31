import { evaluateComposerReactionMappingCandidate } from "./ComposerReactionStructureMappingRuntime.js";

function normalizeText(value = "") {
  return String(value ?? "").trim().toLowerCase();
}

function compareText(left = "", right = "") {
  return String(left ?? "").localeCompare(String(right ?? ""));
}

function scoreCompositeChildPair(sourceNode = null, targetNode = null, evaluation = null) {
  let score = 0;
  if (sourceNode?.templateId === targetNode?.templateId) {
    score += 100;
  }
  if (normalizeText(sourceNode?.label) === normalizeText(targetNode?.label)) {
    score += 20;
  }
  if (evaluation?.provenanceMode === "direct") {
    score += 5;
  }
  return score;
}

function compareMappingEntries(left = null, right = null) {
  const scoreDelta = Number(right?.pairScore ?? 0) - Number(left?.pairScore ?? 0);
  if (scoreDelta !== 0) {
    return scoreDelta;
  }
  const leftSourceTemplate = compareText(left?.sourceNode?.templateId, right?.sourceNode?.templateId);
  if (leftSourceTemplate !== 0) {
    return leftSourceTemplate;
  }
  const leftTargetTemplate = compareText(left?.targetNode?.templateId, right?.targetNode?.templateId);
  if (leftTargetTemplate !== 0) {
    return leftTargetTemplate;
  }
  const leftSourceId = compareText(left?.sourceNode?.id, right?.sourceNode?.id);
  if (leftSourceId !== 0) {
    return leftSourceId;
  }
  return compareText(left?.targetNode?.id, right?.targetNode?.id);
}

function compareCompositeMatchPlans(left = null, right = null) {
  const mappingCountDelta =
    Number((right?.mappings ?? []).length) - Number((left?.mappings ?? []).length);
  if (mappingCountDelta !== 0) {
    return mappingCountDelta;
  }
  const scoreDelta = Number(right?.pairScoreTotal ?? 0) - Number(left?.pairScoreTotal ?? 0);
  if (scoreDelta !== 0) {
    return scoreDelta;
  }
  return compareText(left?.sourceParticipant?.id, right?.sourceParticipant?.id);
}

export function buildBestCompositeChildMatchPlan(options = {}) {
  const sourceParticipant = options.sourceParticipant ?? null;
  const targetParticipant = options.targetParticipant ?? null;
  const sourceRootNode = options.sourceRootNode ?? null;
  const targetRootNode = options.targetRootNode ?? null;
  const resolveBinaryChoiceInventory =
    typeof options.resolveBinaryChoiceInventory === "function"
      ? options.resolveBinaryChoiceInventory
      : null;
  const buildNodeKey =
    typeof options.buildNodeKey === "function" ? options.buildNodeKey : null;
  const excludedSourceNodeIds = new Set(
    Array.isArray(options.excludedSourceNodeIds) ? options.excludedSourceNodeIds.map((nodeId) => String(nodeId ?? "")) : []
  );
  const excludedTargetNodeIds = new Set(
    Array.isArray(options.excludedTargetNodeIds) ? options.excludedTargetNodeIds.map((nodeId) => String(nodeId ?? "")) : []
  );
  if (!sourceParticipant || !targetParticipant || !sourceRootNode || !targetRootNode || !buildNodeKey) {
    return null;
  }
  const sourceChildren = Array.isArray(sourceRootNode.children) ? sourceRootNode.children : [];
  const targetChildren = Array.isArray(targetRootNode.children) ? targetRootNode.children : [];
  if (!sourceChildren.length || !targetChildren.length) {
    return null;
  }

  const pairMatrix = sourceChildren.map((sourceNode, sourceIndex) =>
    targetChildren.map((targetNode, targetIndex) => {
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
      return {
        sourceParticipant,
        targetParticipant,
        sourceNode,
        targetNode,
        sourceIndex,
        targetIndex,
        sourceKey: buildNodeKey(sourceParticipant.id, sourceNode.id),
        targetKey: buildNodeKey(targetParticipant.id, targetNode.id),
        sourceRole: "reactant",
        targetRole: "product",
        evaluation,
        pairScore: scoreCompositeChildPair(sourceNode, targetNode, evaluation),
      };
    })
  );

  let bestPlan = null;

  function visit(sourceIndex = 0, currentMappings = [], usedTargetIndexes = new Set(), pairScoreTotal = 0) {
    if (sourceIndex >= sourceChildren.length) {
      const candidatePlan = {
        sourceParticipant,
        targetParticipant,
        mappings: [...currentMappings].sort(compareMappingEntries),
        pairScoreTotal,
      };
      if (!bestPlan || compareCompositeMatchPlans(candidatePlan, bestPlan) < 0) {
        bestPlan = candidatePlan;
      }
      return;
    }

    const sourceNode = sourceChildren[sourceIndex] ?? null;
    if (excludedSourceNodeIds.has(String(sourceNode?.id ?? ""))) {
      visit(sourceIndex + 1, currentMappings, usedTargetIndexes, pairScoreTotal);
      return;
    }

    visit(sourceIndex + 1, currentMappings, usedTargetIndexes, pairScoreTotal);

    const pairEntries = pairMatrix[sourceIndex] ?? [];
    pairEntries.forEach((pairEntry) => {
      if (
        !pairEntry ||
        usedTargetIndexes.has(pairEntry.targetIndex) ||
        excludedTargetNodeIds.has(String(pairEntry?.targetNode?.id ?? ""))
      ) {
        return;
      }
      usedTargetIndexes.add(pairEntry.targetIndex);
      currentMappings.push(pairEntry);
      visit(
        sourceIndex + 1,
        currentMappings,
        usedTargetIndexes,
        pairScoreTotal + Number(pairEntry.pairScore ?? 0)
      );
      currentMappings.pop();
      usedTargetIndexes.delete(pairEntry.targetIndex);
    });
  }

  visit();

  if (!bestPlan || !bestPlan.mappings.length) {
    return null;
  }

  const matchedSourceNodeIds = bestPlan.mappings.map((mapping) => mapping.sourceNode.id);
  const matchedTargetNodeIds = bestPlan.mappings.map((mapping) => mapping.targetNode.id);
  return {
    ...bestPlan,
    sourceChildCount: sourceChildren.length,
    targetChildCount: targetChildren.length,
    matchedSourceNodeIds,
    matchedTargetNodeIds,
    sourceFullyMatched: matchedSourceNodeIds.length === sourceChildren.length,
    targetFullyMatched: matchedTargetNodeIds.length === targetChildren.length,
  };
}

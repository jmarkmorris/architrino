function compareText(left = "", right = "") {
  return String(left ?? "").localeCompare(String(right ?? ""));
}

function getCandidateType(candidate = null) {
  return String(candidate?.type ?? "").trim().toLowerCase();
}

function isAssociateCandidateType(candidateType = "") {
  return (
    candidateType === "associate-photon" ||
    candidateType === "associate-composite" ||
    candidateType === "associate-standalone"
  );
}

function buildCandidateIdentity(candidate = null) {
  if (!candidate) {
    return "";
  }
  const participantAdditionRef = String(candidate?.participantAdditions?.[0]?.ref ?? "");
  if (participantAdditionRef) {
    return participantAdditionRef;
  }
  const sourceParticipantId = String(candidate?.sourceParticipant?.id ?? "");
  const sourceNodeId = String(candidate?.sourceNode?.id ?? "");
  const targetParticipantId = String(candidate?.targetParticipant?.id ?? "");
  const targetNodeId = String(candidate?.targetNode?.id ?? "");
  return [
    getCandidateType(candidate),
    sourceParticipantId,
    sourceNodeId,
    targetParticipantId,
    targetNodeId,
  ].join(":");
}

function getCandidateFamily(candidate = null) {
  switch (getCandidateType(candidate)) {
    case "direct-root":
    case "composite-carry-through":
      return "selectedCandidates";
    case "fragment-root-direct":
      return "selectedFragmentCandidates";
    case "partial-composite-direct":
      return "selectedPartialCandidates";
    case "associate-photon":
    case "associate-composite":
    case "associate-standalone":
      return "selectedAssociateCandidates";
    case "product-child-direct":
      return "selectedProductChildCandidates";
    default:
      return "selectedCandidates";
  }
}

function getCandidateWholeReactantIds(candidate = null) {
  const candidateType = getCandidateType(candidate);
  if (isAssociateCandidateType(candidateType)) {
    return (Array.isArray(candidate?.sourceEntries) ? candidate.sourceEntries : [])
      .filter((entry) => entry?.consumesWholeParticipant)
      .map((entry) => String(entry?.participant?.id ?? ""))
      .filter(Boolean);
  }
  if (candidateType === "fragment-root-direct" || candidateType === "product-child-direct") {
    return candidate?.consumesWholeParticipant
      ? [String(candidate?.sourceParticipant?.id ?? "")].filter(Boolean)
      : [];
  }
  if (candidateType === "partial-composite-direct") {
    return [];
  }
  return [String(candidate?.sourceParticipant?.id ?? "")].filter(Boolean);
}

function getCandidateWholeProductIds(candidate = null) {
  if (
    getCandidateType(candidate) === "partial-composite-direct" ||
    getCandidateType(candidate) === "product-child-direct"
  ) {
    return [];
  }
  return [String(candidate?.targetParticipant?.id ?? "")].filter(Boolean);
}

function getCandidatePartialProductIds(candidate = null) {
  return getCandidateType(candidate) === "partial-composite-direct"
    ? [String(candidate?.targetParticipant?.id ?? "")].filter(Boolean)
    : [];
}

function getCandidateSourceFragmentKeys(candidate = null) {
  const candidateType = getCandidateType(candidate);
  if (isAssociateCandidateType(candidateType)) {
    return (Array.isArray(candidate?.sourceEntries) ? candidate.sourceEntries : [])
      .map((entry) => String(entry?.sourceFragmentKey ?? entry?.sourceNodeKey ?? ""))
      .filter(Boolean);
  }
  if (candidateType === "partial-composite-direct") {
    return Array.isArray(candidate?.sourceFragmentKeys)
      ? candidate.sourceFragmentKeys.map((fragmentKey) => String(fragmentKey ?? "")).filter(Boolean)
      : [];
  }
  return [String(candidate?.sourceFragmentKey ?? "")].filter(Boolean);
}

function getCandidateTargetFragmentKeys(candidate = null) {
  return (Array.isArray(candidate?.mappings) ? candidate.mappings : [])
    .map((mapping) => String(mapping?.targetKey ?? ""))
    .filter(Boolean);
}

function getCandidateMatchedTargetNodeCount(candidate = null) {
  return (Array.isArray(candidate?.mappings) ? candidate.mappings : []).filter(
    (mapping) => mapping?.targetNode?.id
  ).length;
}

function getCandidateMatchedSourceNodeCount(candidate = null) {
  return (Array.isArray(candidate?.mappings) ? candidate.mappings : []).filter(
    (mapping) => mapping?.sourceNode?.id
  ).length;
}

function getCandidateResolvedProductCount(candidate = null) {
  return getCandidateWholeProductIds(candidate).length;
}

function getCandidatePartialProductCount(candidate = null) {
  return getCandidateType(candidate) === "partial-composite-direct" ? 1 : 0;
}

function getCandidateProfile(candidate = null) {
  return {
    candidate,
    identity: buildCandidateIdentity(candidate),
    family: getCandidateFamily(candidate),
    wholeReactantIds: getCandidateWholeReactantIds(candidate),
    wholeProductIds: getCandidateWholeProductIds(candidate),
    partialProductIds: getCandidatePartialProductIds(candidate),
    sourceFragmentKeys: getCandidateSourceFragmentKeys(candidate),
    targetFragmentKeys: getCandidateTargetFragmentKeys(candidate),
    resolvedProductCount: getCandidateResolvedProductCount(candidate),
    matchedTargetNodeCount: getCandidateMatchedTargetNodeCount(candidate),
    matchedSourceNodeCount: getCandidateMatchedSourceNodeCount(candidate),
    partialProductCount: getCandidatePartialProductCount(candidate),
    score: Number(candidate?.score ?? 0),
  };
}

function compareCandidateProfiles(left = null, right = null) {
  const resolvedProductDelta =
    Number(right?.resolvedProductCount ?? 0) - Number(left?.resolvedProductCount ?? 0);
  if (resolvedProductDelta !== 0) {
    return resolvedProductDelta;
  }
  const targetNodeDelta =
    Number(right?.matchedTargetNodeCount ?? 0) - Number(left?.matchedTargetNodeCount ?? 0);
  if (targetNodeDelta !== 0) {
    return targetNodeDelta;
  }
  const partialDelta =
    Number(left?.partialProductCount ?? 0) - Number(right?.partialProductCount ?? 0);
  if (partialDelta !== 0) {
    return partialDelta;
  }
  const scoreDelta = Number(right?.score ?? 0) - Number(left?.score ?? 0);
  if (scoreDelta !== 0) {
    return scoreDelta;
  }
  return compareText(left?.identity, right?.identity);
}

function createEmptySelectionState() {
  return {
    usedWholeReactantIds: new Set(),
    usedWholeProductIds: new Set(),
    usedSourceFragmentKeys: new Set(),
    usedTargetFragmentKeys: new Set(),
    claimedPartialProductIds: new Set(),
  };
}

function createEmptySelectionResult() {
  return {
    selectedProfiles: [],
    resolvedProductCount: 0,
    matchedTargetNodeCount: 0,
    matchedSourceNodeCount: 0,
    partialProductCount: 0,
    scoreTotal: 0,
  };
}

function cloneSet(source = new Set()) {
  return new Set(source);
}

function hasFragmentKeyForParticipant(fragmentKeys = new Set(), participantId = "") {
  const prefix = `${participantId}:`;
  for (const fragmentKey of fragmentKeys) {
    if (String(fragmentKey ?? "").startsWith(prefix)) {
      return true;
    }
  }
  return false;
}

function canSelectCandidate(profile = null, state = createEmptySelectionState()) {
  if (!profile) {
    return false;
  }

  if (
    profile.wholeReactantIds.some(
      (participantId) =>
        state.usedWholeReactantIds.has(participantId) ||
        hasFragmentKeyForParticipant(state.usedSourceFragmentKeys, participantId)
    )
  ) {
    return false;
  }

  if (
    profile.sourceFragmentKeys.some((fragmentKey) => state.usedSourceFragmentKeys.has(fragmentKey))
  ) {
    return false;
  }

  const sourceFragmentOwners = new Set(
    profile.sourceFragmentKeys
      .map((fragmentKey) => String(fragmentKey ?? "").split(":")[0] ?? "")
      .filter(Boolean)
  );
  if (
    Array.from(sourceFragmentOwners).some((participantId) =>
      state.usedWholeReactantIds.has(participantId)
    )
  ) {
    return false;
  }

  if (
    profile.wholeProductIds.some(
      (participantId) =>
        state.usedWholeProductIds.has(participantId) ||
        state.claimedPartialProductIds.has(participantId)
    )
  ) {
    return false;
  }

  if (
    profile.partialProductIds.some(
      (participantId) =>
        state.usedWholeProductIds.has(participantId) ||
        state.claimedPartialProductIds.has(participantId)
    )
  ) {
    return false;
  }

  if (
    profile.targetFragmentKeys.some((fragmentKey) => state.usedTargetFragmentKeys.has(fragmentKey))
  ) {
    return false;
  }

  return true;
}

function applySelectedCandidate(profile = null, state = createEmptySelectionState()) {
  const nextState = {
    usedWholeReactantIds: cloneSet(state.usedWholeReactantIds),
    usedWholeProductIds: cloneSet(state.usedWholeProductIds),
    usedSourceFragmentKeys: cloneSet(state.usedSourceFragmentKeys),
    usedTargetFragmentKeys: cloneSet(state.usedTargetFragmentKeys),
    claimedPartialProductIds: cloneSet(state.claimedPartialProductIds),
  };
  profile.wholeReactantIds.forEach((participantId) => nextState.usedWholeReactantIds.add(participantId));
  profile.wholeProductIds.forEach((participantId) => nextState.usedWholeProductIds.add(participantId));
  profile.sourceFragmentKeys.forEach((fragmentKey) => nextState.usedSourceFragmentKeys.add(fragmentKey));
  profile.targetFragmentKeys.forEach((fragmentKey) => nextState.usedTargetFragmentKeys.add(fragmentKey));
  profile.partialProductIds.forEach((participantId) => nextState.claimedPartialProductIds.add(participantId));
  return nextState;
}

function buildSelectionStateKey(index = 0, state = createEmptySelectionState()) {
  return [
    index,
    Array.from(state.usedWholeReactantIds).sort().join(","),
    Array.from(state.usedWholeProductIds).sort().join(","),
    Array.from(state.usedSourceFragmentKeys).sort().join(","),
    Array.from(state.usedTargetFragmentKeys).sort().join(","),
    Array.from(state.claimedPartialProductIds).sort().join(","),
  ].join("|");
}

function buildSelectionIdentity(result = createEmptySelectionResult()) {
  return result.selectedProfiles
    .map((profile) => String(profile?.identity ?? ""))
    .filter(Boolean)
    .join(";");
}

function isSelectionResultBetter(left = null, right = null) {
  const leftResolvedProducts = Number(left?.resolvedProductCount ?? 0);
  const rightResolvedProducts = Number(right?.resolvedProductCount ?? 0);
  if (leftResolvedProducts !== rightResolvedProducts) {
    return leftResolvedProducts > rightResolvedProducts;
  }

  const leftTargetNodes = Number(left?.matchedTargetNodeCount ?? 0);
  const rightTargetNodes = Number(right?.matchedTargetNodeCount ?? 0);
  if (leftTargetNodes !== rightTargetNodes) {
    return leftTargetNodes > rightTargetNodes;
  }

  const leftPartialProducts = Number(left?.partialProductCount ?? 0);
  const rightPartialProducts = Number(right?.partialProductCount ?? 0);
  if (leftPartialProducts !== rightPartialProducts) {
    return leftPartialProducts < rightPartialProducts;
  }

  const leftSourceNodes = Number(left?.matchedSourceNodeCount ?? 0);
  const rightSourceNodes = Number(right?.matchedSourceNodeCount ?? 0);
  if (leftSourceNodes !== rightSourceNodes) {
    return leftSourceNodes > rightSourceNodes;
  }

  const leftScore = Number(left?.scoreTotal ?? 0);
  const rightScore = Number(right?.scoreTotal ?? 0);
  if (leftScore !== rightScore) {
    return leftScore > rightScore;
  }

  return compareText(buildSelectionIdentity(left), buildSelectionIdentity(right)) < 0;
}

function prependSelectionProfile(profile = null, result = createEmptySelectionResult()) {
  return {
    selectedProfiles: [profile, ...(Array.isArray(result?.selectedProfiles) ? result.selectedProfiles : [])],
    resolvedProductCount:
      Number(profile?.resolvedProductCount ?? 0) + Number(result?.resolvedProductCount ?? 0),
    matchedTargetNodeCount:
      Number(profile?.matchedTargetNodeCount ?? 0) + Number(result?.matchedTargetNodeCount ?? 0),
    matchedSourceNodeCount:
      Number(profile?.matchedSourceNodeCount ?? 0) + Number(result?.matchedSourceNodeCount ?? 0),
    partialProductCount:
      Number(profile?.partialProductCount ?? 0) + Number(result?.partialProductCount ?? 0),
    scoreTotal: Number(profile?.score ?? 0) + Number(result?.scoreTotal ?? 0),
  };
}

export function selectBestComposerReactionSolveCandidates(candidates = []) {
  const profiles = candidates.map((candidate) => getCandidateProfile(candidate)).sort(compareCandidateProfiles);
  const memo = new Map();

  function visit(index = 0, state = createEmptySelectionState()) {
    if (index >= profiles.length) {
      return createEmptySelectionResult();
    }

    const stateKey = buildSelectionStateKey(index, state);
    if (memo.has(stateKey)) {
      return memo.get(stateKey);
    }

    let bestResult = visit(index + 1, state);
    const profile = profiles[index] ?? null;
    if (canSelectCandidate(profile, state)) {
      const nextState = applySelectedCandidate(profile, state);
      const takenResult = prependSelectionProfile(profile, visit(index + 1, nextState));
      if (isSelectionResultBetter(takenResult, bestResult)) {
        bestResult = takenResult;
      }
    }

    memo.set(stateKey, bestResult);
    return bestResult;
  }

  const result = visit();
  const groupedSelections = {
    selectedCandidates: [],
    selectedFragmentCandidates: [],
    selectedPartialCandidates: [],
    selectedAssociateCandidates: [],
    selectedProductChildCandidates: [],
  };

  result.selectedProfiles.forEach((profile) => {
    const family = getCandidateFamily(profile?.candidate);
    groupedSelections[family].push(profile.candidate);
  });

  return {
    ...groupedSelections,
    resolvedProductCount: result.resolvedProductCount,
    matchedTargetNodeCount: result.matchedTargetNodeCount,
    matchedSourceNodeCount: result.matchedSourceNodeCount,
    partialProductCount: result.partialProductCount,
    scoreTotal: result.scoreTotal,
  };
}

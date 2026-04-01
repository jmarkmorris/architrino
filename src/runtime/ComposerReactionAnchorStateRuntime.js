function defaultParseNodeKey(nodeKey) {
  const [participantId = "", ...rest] = String(nodeKey ?? "").split("::");
  return {
    participantId,
    nodeId: rest.join("::"),
  };
}

function isSameOrAncestorPath(candidatePath, targetPath) {
  if (!candidatePath || !targetPath) {
    return false;
  }
  return targetPath === candidatePath || targetPath.startsWith(`${candidatePath}/`);
}

function normalizeAnchorInstanceIndex(anchorInstanceIndex) {
  if (
    anchorInstanceIndex === null ||
    anchorInstanceIndex === undefined ||
    anchorInstanceIndex === ""
  ) {
    return null;
  }
  const normalized = Number(anchorInstanceIndex);
  return Number.isInteger(normalized) && normalized >= 0 ? normalized : null;
}

function mappingMatchesAnchorInstance(
  mappingInstanceIndex,
  anchorInstanceIndex
) {
  return normalizeAnchorInstanceIndex(mappingInstanceIndex) ===
    normalizeAnchorInstanceIndex(anchorInstanceIndex);
}

export function buildNodeKey(participantId, nodeId) {
  return `${participantId}::${nodeId}`;
}

export function parseNodeKey(nodeKey) {
  return defaultParseNodeKey(nodeKey);
}

export function nodeKeysConflict(leftKey, rightKey) {
  const left = parseNodeKey(leftKey);
  const right = parseNodeKey(rightKey);
  if (!left.participantId || !right.participantId || left.participantId !== right.participantId) {
    return false;
  }
  return (
    isSameOrAncestorPath(left.nodeId, right.nodeId) ||
    isSameOrAncestorPath(right.nodeId, left.nodeId)
  );
}

export function createComposerReactionAnchorStateRuntime(options = {}) {
  const nodeKeysConflictFn =
    typeof options.nodeKeysConflict === "function" ? options.nodeKeysConflict : nodeKeysConflict;
  const getMappings =
    typeof options.getMappings === "function" ? options.getMappings : () => [];
  const getRecentMappingIds =
    typeof options.getRecentMappingIds === "function" ? options.getRecentMappingIds : () => [];
  const setRecentMappingIds =
    typeof options.setRecentMappingIds === "function" ? options.setRecentMappingIds : () => {};
  const scheduleTimeout =
    typeof options.scheduleTimeout === "function" ? options.scheduleTimeout : globalThis.setTimeout;
  const clearScheduledTimeout =
    typeof options.clearScheduledTimeout === "function"
      ? options.clearScheduledTimeout
      : globalThis.clearTimeout;
  const onRecentStateChange =
    typeof options.onRecentStateChange === "function" ? options.onRecentStateChange : () => {};
  const recentRouteFadeMs = Number(options.recentRouteFadeMs) > 0 ? Number(options.recentRouteFadeMs) : 400;
  const isSingleMappingAnchorRole =
    typeof options.isSingleMappingAnchorRole === "function"
      ? options.isSingleMappingAnchorRole
      : () => false;
  const canTargetMappingRole =
    typeof options.canTargetMappingRole === "function"
      ? options.canTargetMappingRole
      : () => false;
  const getPendingSourceKey =
    typeof options.getPendingSourceKey === "function" ? options.getPendingSourceKey : () => "";
  const getPendingSourceRole =
    typeof options.getPendingSourceRole === "function" ? options.getPendingSourceRole : () => "";
  const getPendingSourceAnchorInstanceIndex =
    typeof options.getPendingSourceAnchorInstanceIndex === "function"
      ? options.getPendingSourceAnchorInstanceIndex
      : () => null;
  const getNodeContext =
    typeof options.getNodeContext === "function" ? options.getNodeContext : () => null;
  const resolvePendingTargetAvailability =
    typeof options.resolvePendingTargetAvailability === "function"
      ? options.resolvePendingTargetAvailability
      : () => null;

  const recentRouteTimeoutIds = new Map();

  function clearRecentRouteTimeout(mappingId) {
    const timeoutId = recentRouteTimeoutIds.get(mappingId);
    if (!timeoutId) {
      return;
    }
    clearScheduledTimeout(timeoutId);
    recentRouteTimeoutIds.delete(mappingId);
  }

  function getMappedKeyForRole(mapping, role) {
    if (mapping?.sourceRole === role) {
      return mapping.sourceKey;
    }
    if (mapping?.targetRole === role) {
      return mapping.targetKey;
    }
    return "";
  }

  function findMappingsByNodeKey(nodeKey, role = "", anchorInstanceIndex = null) {
    const normalizedRole = String(role ?? "").trim();
    return getMappings().filter((mapping) => {
      const sourceMatches =
        mapping.sourceKey === nodeKey &&
        (!normalizedRole || mapping.sourceRole === normalizedRole) &&
        (!normalizedRole ||
          mappingMatchesAnchorInstance(mapping.sourceAnchorInstanceIndex, anchorInstanceIndex));
      const targetMatches =
        mapping.targetKey === nodeKey &&
        (!normalizedRole || mapping.targetRole === normalizedRole) &&
        (!normalizedRole ||
          mappingMatchesAnchorInstance(mapping.targetAnchorInstanceIndex, anchorInstanceIndex));
      return sourceMatches || targetMatches;
    });
  }

  function findMappingByNodeKey(nodeKey, role = "", anchorInstanceIndex = null) {
    return findMappingsByNodeKey(nodeKey, role, anchorInstanceIndex)[0] ?? null;
  }

  function getMappingIdsForAnchor(nodeKey, role, anchorInstanceIndex = null) {
    return getMappings()
      .filter(
        (mapping) =>
          (mapping.sourceKey === nodeKey &&
            mapping.sourceRole === role &&
            mappingMatchesAnchorInstance(mapping.sourceAnchorInstanceIndex, anchorInstanceIndex)) ||
          (mapping.targetKey === nodeKey &&
            mapping.targetRole === role &&
            mappingMatchesAnchorInstance(mapping.targetAnchorInstanceIndex, anchorInstanceIndex))
      )
      .map((mapping) => mapping.id);
  }

  function getConflictingMappings(nodeKey, role, anchorInstanceIndex = null) {
    return getMappings().filter((mapping) => {
      const mappedKey = getMappedKeyForRole(mapping, role);
      return isSingleMappingAnchorRole({
        role,
        nodeKey,
        anchorInstanceIndex,
      }) && mappedKey
        ? nodeKeysConflictFn(mappedKey, nodeKey)
        : false;
    });
  }

  function getAnchorAvailability(role, nodeKey, anchorInstanceIndex = null) {
    const existingMappings = findMappingsByNodeKey(nodeKey, role, anchorInstanceIndex);
    if (
      existingMappings.length &&
      isSingleMappingAnchorRole({ role, nodeKey, anchorInstanceIndex })
    ) {
      return { disabled: false, reason: "" };
    }
    const hasConflict =
      isSingleMappingAnchorRole({ role, nodeKey, anchorInstanceIndex }) &&
      getConflictingMappings(nodeKey, role, anchorInstanceIndex).some((mapping) => {
        const mappedKey = getMappedKeyForRole(mapping, role);
        return mappedKey && mappedKey !== nodeKey;
      });
    if (hasConflict) {
      return {
        disabled: true,
        reason: "Blocked by an existing ancestor or descendant mapping.",
      };
    }
    const pendingSourceKey = getPendingSourceKey();
    if (canTargetMappingRole(role) && pendingSourceKey) {
      const pendingAvailability = resolvePendingTargetAvailability({
        nodeKey,
        pendingSourceKey,
        pendingSourceRole: getPendingSourceRole(),
        pendingSourceAnchorInstanceIndex: getPendingSourceAnchorInstanceIndex(),
        role,
        targetAnchorInstanceIndex: normalizeAnchorInstanceIndex(anchorInstanceIndex),
        sourceContext: getNodeContext(pendingSourceKey),
        targetContext: getNodeContext(nodeKey),
      });
      if (pendingAvailability) {
        return pendingAvailability;
      }
    }
    return { disabled: false, reason: "" };
  }

  function pruneRecentRouteState() {
    const activeMappingIds = new Set(getMappings().map((mapping) => mapping.id));
    setRecentMappingIds(
      getRecentMappingIds().filter((mappingId) => activeMappingIds.has(mappingId))
    );
    [...recentRouteTimeoutIds.keys()].forEach((mappingId) => {
      if (!activeMappingIds.has(mappingId)) {
        clearRecentRouteTimeout(mappingId);
      }
    });
  }

  function clearAllRecentRouteState() {
    [...recentRouteTimeoutIds.keys()].forEach((mappingId) => clearRecentRouteTimeout(mappingId));
    setRecentMappingIds([]);
  }

  function markMappingsRecent(mappingIds = []) {
    pruneRecentRouteState();
    const activeMappingIds = new Set(getMappings().map((mapping) => mapping.id));
    const nextRecentIds = [
      ...new Set(mappingIds.filter((mappingId) => activeMappingIds.has(mappingId))),
    ];
    if (!nextRecentIds.length) {
      return;
    }
    const recentIds = new Set(getRecentMappingIds());
    let didChange = false;
    nextRecentIds.forEach((mappingId) => {
      if (!recentIds.has(mappingId)) {
        recentIds.add(mappingId);
        didChange = true;
      }
      clearRecentRouteTimeout(mappingId);
      recentRouteTimeoutIds.set(
        mappingId,
        scheduleTimeout(() => {
          recentRouteTimeoutIds.delete(mappingId);
          const nextIds = getRecentMappingIds().filter((entry) => entry !== mappingId);
          if (nextIds.length === getRecentMappingIds().length) {
            return;
          }
          setRecentMappingIds(nextIds);
          onRecentStateChange();
        }, recentRouteFadeMs)
      );
    });
    if (didChange) {
      setRecentMappingIds([...recentIds]);
    }
    onRecentStateChange();
  }

  return {
    clearAllRecentRouteState,
    findMappingByNodeKey,
    findMappingsByNodeKey,
    getAnchorAvailability,
    getConflictingMappings,
    getMappedKeyForRole,
    getMappingIdsForAnchor,
    markMappingsRecent,
    pruneRecentRouteState,
  };
}

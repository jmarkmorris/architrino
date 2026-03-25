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

  function findMappingsByNodeKey(nodeKey) {
    return getMappings().filter(
      (mapping) => mapping.sourceKey === nodeKey || mapping.targetKey === nodeKey
    );
  }

  function findMappingByNodeKey(nodeKey) {
    return findMappingsByNodeKey(nodeKey)[0] ?? null;
  }

  function getMappingIdsForAnchor(nodeKey, role) {
    return getMappings()
      .filter(
        (mapping) =>
          (mapping.sourceKey === nodeKey && mapping.sourceRole === role) ||
          (mapping.targetKey === nodeKey && mapping.targetRole === role)
      )
      .map((mapping) => mapping.id);
  }

  function getConflictingMappings(nodeKey, role) {
    return getMappings().filter((mapping) => {
      const mappedKey = getMappedKeyForRole(mapping, role);
      return mappedKey ? nodeKeysConflict(mappedKey, nodeKey) : false;
    });
  }

  function getAnchorAvailability(role, nodeKey) {
    const existingMappings = findMappingsByNodeKey(nodeKey);
    if (existingMappings.length && isSingleMappingAnchorRole(role)) {
      return { disabled: false, reason: "" };
    }
    const hasConflict = isSingleMappingAnchorRole(role) && getConflictingMappings(nodeKey, role).some((mapping) => {
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
        role,
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

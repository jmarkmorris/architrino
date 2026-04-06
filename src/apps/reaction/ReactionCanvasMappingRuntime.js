import {
  isReactionSourceTerminal,
  isReactionTargetTerminal,
} from "./ReactionAnchorTerminalRuntime.js";

function getAnchorDescriptor(role = "", anchorInstanceIndex = null) {
  if (typeof role === "object" && role !== null) {
    return {
      role: String(role.role ?? "").trim(),
      anchorInstanceIndex: role.anchorInstanceIndex ?? null,
    };
  }
  return {
    role: String(role ?? "").trim(),
    anchorInstanceIndex,
  };
}

function canStartReactionCanvasMappingFromRole(role = "", anchorInstanceIndex = null) {
  return isReactionSourceTerminal(getAnchorDescriptor(role, anchorInstanceIndex));
}

function canTargetReactionCanvasMappingRole(role = "", anchorInstanceIndex = null) {
  return isReactionTargetTerminal(getAnchorDescriptor(role, anchorInstanceIndex));
}

export function createReactionCanvasMappingRuntime(deps = {}) {
  const {
    state = null,
    getAnchorAvailability = () => ({ disabled: false, reason: "" }),
    setStatus = () => {},
    render = () => {},
    isSingleMappingAnchorRoleForNode = () => false,
    nodeKeysConflict = () => false,
    pruneRecentRouteState = () => {},
    markMappingsRecent = () => {},
    setHoveredMappingIds = () => {},
    countEligibleTargets = () => 0,
    getMappingValidation = () => ({ valid: true, reason: "" }),
  } = deps;

  function addOrReplaceMapping(
    sourceKey,
    sourceRole,
    targetKey,
    targetRole,
    {
      sourceAnchorInstanceIndex = null,
      targetAnchorInstanceIndex = null,
    } = {}
  ) {
    if (!state) {
      return "";
    }
    state.mappings = state.mappings.filter((mapping) => {
      const sourceConflict = isSingleMappingAnchorRoleForNode({
        role: sourceRole,
        nodeKey: sourceKey,
        anchorInstanceIndex: sourceAnchorInstanceIndex,
      })
        ? nodeKeysConflict(mapping.sourceKey, sourceKey) || nodeKeysConflict(mapping.targetKey, sourceKey)
        : false;
      const targetConflict = isSingleMappingAnchorRoleForNode({
        role: targetRole,
        nodeKey: targetKey,
        anchorInstanceIndex: targetAnchorInstanceIndex,
      })
        ? nodeKeysConflict(mapping.sourceKey, targetKey) || nodeKeysConflict(mapping.targetKey, targetKey)
        : false;
      return !(sourceConflict || targetConflict);
    });
    pruneRecentRouteState();
    const mappingId = `canvas_mapping_${state.nextMappingId++}`;
    state.mappings.push({
      id: mappingId,
      sourceKey,
      targetKey,
      sourceRole,
      targetRole,
      sourceAnchorInstanceIndex,
      targetAnchorInstanceIndex,
    });
    state.hoveredMappingIds = [];
    return mappingId;
  }

  function handleAnchorClick(role, nodeKey, anchorInstanceIndex = null) {
    if (!state) {
      return;
    }
    const anchorDescriptor = getAnchorDescriptor(role, anchorInstanceIndex);
    const anchorAvailability = getAnchorAvailability(role, nodeKey, anchorInstanceIndex);
    if (anchorAvailability.disabled) {
      if (anchorAvailability.reason) {
        setStatus(anchorAvailability.reason);
      }
      return;
    }

    if (canStartReactionCanvasMappingFromRole(anchorDescriptor)) {
      const isClearingPending =
        state.pendingSourceKey === nodeKey &&
        state.pendingSourceRole === role &&
        state.pendingSourceAnchorInstanceIndex === anchorInstanceIndex;
      state.pendingSourceKey = isClearingPending ? "" : nodeKey;
      state.pendingSourceRole = isClearingPending ? "" : role;
      state.pendingSourceAnchorInstanceIndex = isClearingPending ? null : anchorInstanceIndex;
      setHoveredMappingIds([]);
      render();
      if (!state.pendingSourceKey) {
        setStatus(
          role === "operator-output"
            ? "Operator output anchor cleared."
            : role === "center"
              ? "Center assembly output anchor cleared."
              : "Reactant anchor cleared."
        );
        return;
      }
      const eligibleTargetCount = countEligibleTargets();
      if (role === "operator-output") {
        setStatus(
          eligibleTargetCount
            ? "Operator output selected. All targets remain available; rule-breaking connections will stay red until fixed."
            : "Operator output selected."
        );
        return;
      }
      if (role === "center") {
        setStatus(
          eligibleTargetCount
            ? "Center assembly output selected. All targets remain available; rule-breaking connections will stay red until fixed."
            : "Center assembly output selected."
        );
        return;
      }
      setStatus(
        eligibleTargetCount
          ? "Reactant anchor selected. All targets remain available; rule-breaking connections will stay red until fixed."
          : "Reactant anchor selected."
      );
      return;
    }

    if (!state.pendingSourceKey || !state.pendingSourceRole) {
      setStatus("Choose a right-side source anchor first.");
      return;
    }

    if (
      !canTargetReactionCanvasMappingRole(role, anchorInstanceIndex)
    ) {
      setStatus("Source anchors connect only to left-side target anchors in the next lane.");
      return;
    }

    const sourceRole = state.pendingSourceRole;
    const mappingId = addOrReplaceMapping(
      state.pendingSourceKey,
      sourceRole,
      nodeKey,
      role,
      {
        sourceAnchorInstanceIndex: state.pendingSourceAnchorInstanceIndex,
        targetAnchorInstanceIndex: anchorInstanceIndex,
      }
    );
    markMappingsRecent([mappingId]);
    state.pendingSourceKey = "";
    state.pendingSourceRole = "";
    state.pendingSourceAnchorInstanceIndex = null;
    render();
    const validation = getMappingValidation(
      state.mappings.find((mapping) => mapping.id === mappingId) ?? null
    );
    setStatus(
      validation.valid
        ? role === "operator-input" && sourceRole === "reactant"
          ? "Reactant routed into operator."
          : role === "operator-input" && sourceRole === "operator-output"
            ? "Operator routed into operator."
            : "Reaction mapping added."
        : `Connection added but invalid: ${validation.reason}`
    );
  }

  return {
    addOrReplaceMapping,
    handleAnchorClick,
  };
}

export {
  canStartReactionCanvasMappingFromRole,
  canTargetReactionCanvasMappingRole,
};

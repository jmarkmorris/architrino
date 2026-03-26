function getAnchorAriaLabel(anchorRole, nodeLabel) {
  if (anchorRole === "product") {
    return `Product attach point for ${nodeLabel}`;
  }
  if (anchorRole === "transmute-input") {
    return `Center transformer input attach point for ${nodeLabel}`;
  }
  if (anchorRole === "transmute-output") {
    return `Center transformer output attach point for ${nodeLabel}`;
  }
  return `Reactant attach point for ${nodeLabel}`;
}

export function createComposerReactionAnchorRenderRuntime(options = {}) {
  const surface = options.surface ?? null;
  const mapSvg = options.mapSvg ?? null;
  const getHoveredMappingIds =
    typeof options.getHoveredMappingIds === "function" ? options.getHoveredMappingIds : () => [];
  const setHoveredMappingIdsState =
    typeof options.setHoveredMappingIdsState === "function"
      ? options.setHoveredMappingIdsState
      : () => {};
  const getRecentMappingIds =
    typeof options.getRecentMappingIds === "function" ? options.getRecentMappingIds : () => [];
  const markMappingsRecent =
    typeof options.markMappingsRecent === "function" ? options.markMappingsRecent : () => {};
  const getMappingIdsForAnchor =
    typeof options.getMappingIdsForAnchor === "function" ? options.getMappingIdsForAnchor : () => [];
  const getAnchorAvailability =
    typeof options.getAnchorAvailability === "function"
      ? options.getAnchorAvailability
      : () => ({ disabled: false, reason: "" });
  const findMappingsByNodeKey =
    typeof options.findMappingsByNodeKey === "function" ? options.findMappingsByNodeKey : () => [];
  const isSingleMappingAnchorRole =
    typeof options.isSingleMappingAnchorRole === "function"
      ? options.isSingleMappingAnchorRole
      : () => false;
  const getPendingSourceKey =
    typeof options.getPendingSourceKey === "function" ? options.getPendingSourceKey : () => "";
  const getPendingSourceRole =
    typeof options.getPendingSourceRole === "function" ? options.getPendingSourceRole : () => "";
  const handleAnchorClick =
    typeof options.handleAnchorClick === "function" ? options.handleAnchorClick : () => {};
  const shouldSuppressRouteState =
    typeof options.shouldSuppressRouteState === "function"
      ? options.shouldSuppressRouteState
      : () => false;

  function applyHoveredRouteState() {
    if (!surface || !mapSvg) {
      return;
    }
    if (shouldSuppressRouteState()) {
      surface
        .querySelectorAll(".composer-reaction-solver-anchor[data-anchor-key][data-anchor-side]")
        .forEach((anchor) => {
          anchor.classList.remove(
            "is-route-highlighted",
            "is-route-recent",
            "is-route-dimmed"
          );
        });
      mapSvg.querySelectorAll(".composer-reaction-solver-path[data-mapping-id]").forEach((path) => {
        path.classList.remove("is-route-highlighted", "is-route-recent", "is-route-dimmed");
      });
      return;
    }
    const hoveredMappingIds = new Set(getHoveredMappingIds());
    const recentMappingIds = new Set(getRecentMappingIds());

    surface
      .querySelectorAll(".composer-reaction-solver-anchor[data-anchor-key][data-anchor-side]")
      .forEach((anchor) => {
        const anchorKey = anchor.getAttribute("data-anchor-key") ?? "";
        const anchorRole = anchor.getAttribute("data-anchor-side") ?? "";
        const mappingIds = getMappingIdsForAnchor(anchorKey, anchorRole);
        const isMapped = mappingIds.length > 0;
        const isHighlighted =
          isMapped && mappingIds.some((mappingId) => hoveredMappingIds.has(mappingId));
        const isRecent =
          isMapped && mappingIds.some((mappingId) => recentMappingIds.has(mappingId));
        anchor.classList.toggle("is-route-highlighted", isHighlighted);
        anchor.classList.toggle("is-route-recent", !isHighlighted && isRecent);
        anchor.classList.toggle("is-route-dimmed", isMapped && !isHighlighted && !isRecent);
      });

    mapSvg.querySelectorAll(".composer-reaction-solver-path[data-mapping-id]").forEach((path) => {
      const mappingId = path.getAttribute("data-mapping-id") ?? "";
      const isHighlighted = hoveredMappingIds.has(mappingId);
      const isRecent = recentMappingIds.has(mappingId);
      path.classList.toggle("is-route-highlighted", isHighlighted);
      path.classList.toggle("is-route-recent", !isHighlighted && isRecent);
      path.classList.toggle("is-route-dimmed", !isHighlighted && !isRecent);
    });
  }

  function setHoveredMappingIds(mappingIds = []) {
    if (shouldSuppressRouteState()) {
      if (getHoveredMappingIds().length) {
        setHoveredMappingIdsState([]);
      }
      applyHoveredRouteState();
      return;
    }
    const nextIds = [...new Set(mappingIds.filter(Boolean))].sort();
    const currentIds = [...getHoveredMappingIds()].sort();
    if (
      nextIds.length === currentIds.length &&
      nextIds.every((mappingId, index) => mappingId === currentIds[index])
    ) {
      return;
    }
    if (!nextIds.length && currentIds.length) {
      markMappingsRecent(currentIds);
    }
    setHoveredMappingIdsState(nextIds);
    applyHoveredRouteState();
  }

  function createAnchorButton(participant, node, nodeKey, options = {}) {
    const { extraClassNames = [], anchorRole = participant.side } = options;
    const anchorAvailability = getAnchorAvailability(anchorRole, nodeKey);
    const mappings = findMappingsByNodeKey(nodeKey);
    const mapping = isSingleMappingAnchorRole(anchorRole) ? mappings[0] ?? null : null;
    const hasRoleMapping = isSingleMappingAnchorRole(anchorRole)
      ? !!mapping
      : mappings.some((entry) =>
          entry.sourceRole === anchorRole || entry.targetRole === anchorRole
        );
    const anchor = document.createElement("button");
    anchor.type = "button";
    anchor.className = "composer-reaction-solver-anchor";
    extraClassNames.filter(Boolean).forEach((className) => anchor.classList.add(className));
    anchor.dataset.anchorKey = nodeKey;
    anchor.dataset.anchorSide = anchorRole;
    anchor.setAttribute("aria-label", getAnchorAriaLabel(anchorRole, node.label));
    anchor.disabled = anchorAvailability.disabled;
    if (anchorAvailability.reason) {
      anchor.title = anchorAvailability.reason;
    }
    if (getPendingSourceKey() === nodeKey && getPendingSourceRole() === anchorRole) {
      anchor.classList.add("is-pending");
    }
    if (hasRoleMapping) {
      anchor.classList.add("is-mapped");
    }
    anchor.addEventListener("pointerenter", () =>
      setHoveredMappingIds(getMappingIdsForAnchor(nodeKey, anchorRole))
    );
    anchor.addEventListener("pointerleave", () => setHoveredMappingIds([]));
    anchor.addEventListener("click", () => {
      markMappingsRecent(getMappingIdsForAnchor(nodeKey, anchorRole));
      handleAnchorClick(anchorRole, nodeKey);
    });
    return anchor;
  }

  function createInlineAnchorLane(participant, node, nodeKey) {
    const lane = document.createElement("div");
    lane.className = `composer-reaction-solver-inline-anchor-lane is-${participant.side}`;
    lane.appendChild(createAnchorButton(participant, node, nodeKey));
    return lane;
  }

  return {
    applyHoveredRouteState,
    createAnchorButton,
    createInlineAnchorLane,
    setHoveredMappingIds,
  };
}

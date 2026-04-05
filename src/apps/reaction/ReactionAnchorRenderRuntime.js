import { getReactionAnchorAriaLabel } from "./ReactionObjectRegistryRuntime.js";

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

export function createReactionAnchorRenderRuntime(options = {}) {
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
  const getPendingSourceAnchorInstanceIndex =
    typeof options.getPendingSourceAnchorInstanceIndex === "function"
      ? options.getPendingSourceAnchorInstanceIndex
      : () => null;
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
        .querySelectorAll(".composer-reaction-canvas-anchor[data-anchor-key][data-anchor-side]")
        .forEach((anchor) => {
          anchor.classList.remove(
            "is-route-highlighted",
            "is-route-recent"
          );
        });
      mapSvg.querySelectorAll(".composer-reaction-canvas-path[data-mapping-id]").forEach((path) => {
        path.classList.remove("is-route-highlighted", "is-route-recent");
      });
      return;
    }
    const hoveredMappingIds = new Set(getHoveredMappingIds());
    const recentMappingIds = new Set(getRecentMappingIds());

    surface
      .querySelectorAll(".composer-reaction-canvas-anchor[data-anchor-key][data-anchor-side]")
      .forEach((anchor) => {
        const anchorKey = anchor.getAttribute("data-anchor-key") ?? "";
        const anchorRole = anchor.getAttribute("data-anchor-side") ?? "";
        const anchorInstanceIndex = normalizeAnchorInstanceIndex(
          anchor.getAttribute("data-anchor-instance-index")
        );
        const mappingIds = getMappingIdsForAnchor(anchorKey, anchorRole, anchorInstanceIndex);
        const isMapped = mappingIds.length > 0;
        const isHighlighted =
          isMapped && mappingIds.some((mappingId) => hoveredMappingIds.has(mappingId));
        const isRecent =
          isMapped && mappingIds.some((mappingId) => recentMappingIds.has(mappingId));
        anchor.classList.toggle("is-route-highlighted", isHighlighted);
        anchor.classList.toggle("is-route-recent", !isHighlighted && isRecent);
        anchor.classList.remove("is-route-dimmed");
      });

    mapSvg.querySelectorAll(".composer-reaction-canvas-path[data-mapping-id]").forEach((path) => {
      const mappingId = path.getAttribute("data-mapping-id") ?? "";
      const isHighlighted = hoveredMappingIds.has(mappingId);
      const isRecent = recentMappingIds.has(mappingId);
      path.classList.toggle("is-route-highlighted", isHighlighted);
      path.classList.toggle("is-route-recent", !isHighlighted && isRecent);
      path.classList.remove("is-route-dimmed");
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
    const {
      extraClassNames = [],
      anchorRole = participant.side,
      anchorInstanceIndex = null,
    } = options;
    const normalizedAnchorInstanceIndex = normalizeAnchorInstanceIndex(anchorInstanceIndex);
    const anchorAvailability = getAnchorAvailability(
      anchorRole,
      nodeKey,
      normalizedAnchorInstanceIndex
    );
    const mappings = findMappingsByNodeKey(
      nodeKey,
      anchorRole,
      normalizedAnchorInstanceIndex
    );
    const mapping = isSingleMappingAnchorRole({
      role: anchorRole,
      nodeKey,
      anchorInstanceIndex: normalizedAnchorInstanceIndex,
    })
      ? mappings[0] ?? null
      : null;
    const hasRoleMapping = isSingleMappingAnchorRole({
      role: anchorRole,
      nodeKey,
      anchorInstanceIndex: normalizedAnchorInstanceIndex,
    })
      ? !!mapping
      : mappings.length > 0;
    const anchor = document.createElement("button");
    anchor.type = "button";
    anchor.className = "composer-reaction-canvas-anchor";
    extraClassNames.filter(Boolean).forEach((className) => anchor.classList.add(className));
    anchor.dataset.anchorKey = nodeKey;
    anchor.dataset.anchorSide = anchorRole;
    if (normalizedAnchorInstanceIndex !== null) {
      anchor.dataset.anchorInstanceIndex = String(normalizedAnchorInstanceIndex);
    }
    anchor.setAttribute("aria-label", getReactionAnchorAriaLabel(anchorRole, node.label));
    anchor.disabled = anchorAvailability.disabled;
    if (anchorAvailability.reason) {
      anchor.title = anchorAvailability.reason;
    }
    if (
      getPendingSourceKey() === nodeKey &&
      getPendingSourceRole() === anchorRole &&
      normalizeAnchorInstanceIndex(getPendingSourceAnchorInstanceIndex()) ===
        normalizedAnchorInstanceIndex
    ) {
      anchor.classList.add("is-pending");
    }
    if (
      getPendingSourceKey() &&
      getPendingSourceKey() !== nodeKey &&
      (anchorRole === "product" || anchorRole === "operator-input") &&
      !anchorAvailability.disabled &&
      !anchorAvailability.invalid
    ) {
      anchor.classList.add("is-target-ready");
    }
    if (hasRoleMapping) {
      anchor.classList.add("is-mapped");
    }
    anchor.addEventListener("pointerenter", () =>
      setHoveredMappingIds(
        getMappingIdsForAnchor(nodeKey, anchorRole, normalizedAnchorInstanceIndex)
      )
    );
    anchor.addEventListener("pointerleave", () => setHoveredMappingIds([]));
    anchor.addEventListener("click", () => {
      markMappingsRecent(
        getMappingIdsForAnchor(nodeKey, anchorRole, normalizedAnchorInstanceIndex)
      );
      handleAnchorClick(anchorRole, nodeKey, normalizedAnchorInstanceIndex);
    });
    return anchor;
  }

  function createInlineAnchorSlot(participant, node, nodeKey) {
    const slot = document.createElement("div");
    slot.className = `composer-reaction-canvas-inline-anchor-slot is-${participant.side}`;
    slot.appendChild(createAnchorButton(participant, node, nodeKey));
    return slot;
  }

  return {
    applyHoveredRouteState,
    createAnchorButton,
    createInlineAnchorSlot,
    setHoveredMappingIds,
  };
}

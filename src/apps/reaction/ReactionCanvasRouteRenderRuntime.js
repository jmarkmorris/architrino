import {
  getReactionAnchorAttachmentSideFromTerminalIndex,
  normalizeReactionAnchorInstanceIndex,
} from "./ReactionAnchorTerminalRuntime.js";

function isElement(value) {
  return typeof globalThis.Element === "function" && value instanceof globalThis.Element;
}

function escapeCssSelector(value = "") {
  if (typeof globalThis.CSS?.escape === "function") {
    return globalThis.CSS.escape(value);
  }
  return String(value ?? "");
}

export function buildReactionCanvasDirectPath({ startX, startY, endX, endY }) {
  return `M ${startX} ${startY} L ${endX} ${endY}`;
}

export function buildReactionCanvasCurvePath({ startX, startY, endX, endY }) {
  const deltaX = Math.max(96, Math.abs(endX - startX) * 0.35);
  return `M ${startX} ${startY} C ${startX + deltaX} ${startY}, ${endX - deltaX} ${endY}, ${endX} ${endY}`;
}

export function createReactionCanvasRouteRenderRuntime(deps = {}) {
  const {
    state = null,
    surface = null,
    mapSvg = null,
    canvasRouteAnchorGapPx = 0,
    createSvgElement = () => null,
    getMappings = () => state?.mappings ?? [],
    isActive = () => Boolean(state?.active),
    getMappingValidation = () => ({ valid: true, reason: "" }),
    setHoveredMappingIds = () => {},
    removeMappingById = () => false,
    render = () => {},
    setStatus = () => {},
    applyHoveredRouteState = () => {},
    normalizeAnchorInstanceIndex = (anchorInstanceIndex) => anchorInstanceIndex,
    requestAnimationFrameImpl =
      typeof globalThis.requestAnimationFrame === "function"
        ? globalThis.requestAnimationFrame.bind(globalThis)
        : (callback) => globalThis.setTimeout(callback, 16),
    cancelAnimationFrameImpl =
      typeof globalThis.cancelAnimationFrame === "function"
        ? globalThis.cancelAnimationFrame.bind(globalThis)
        : (frameId) => globalThis.clearTimeout(frameId),
  } = deps;

  let drawFrameId = 0;

  function getElementCenterWithinSurface(element, bounds) {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - bounds.left,
      y: rect.top + rect.height / 2 - bounds.top,
    };
  }

  function getAnchorRadiusFromBounds(element) {
    if (!isElement(element)) {
      return 0;
    }
    const rect = element.getBoundingClientRect();
    return Math.max(0, Math.min(rect.width, rect.height) / 2);
  }

  function getFixedAnchorAttachmentPoint(
    element,
    bounds,
    edgeInset = canvasRouteAnchorGapPx
  ) {
    if (!isElement(element)) {
      return null;
    }
    const center = getElementCenterWithinSurface(element, bounds);
    const radius = Math.max(0, getAnchorRadiusFromBounds(element) - edgeInset);
    const terminalIndex = normalizeReactionAnchorInstanceIndex(
      element.getAttribute("data-anchor-terminal-index")
    );
    const attachmentSide = getReactionAnchorAttachmentSideFromTerminalIndex(terminalIndex);
    if (attachmentSide === "right") {
      return {
        x: center.x + radius,
        y: center.y,
      };
    }
    if (attachmentSide === "left") {
      return {
        x: center.x - radius,
        y: center.y,
      };
    }
    return null;
  }

  function getTrimmedRouteEndpoints(
    sourceElement,
    targetElement,
    bounds,
    edgeInset = canvasRouteAnchorGapPx
  ) {
    const sourcePoint =
      getFixedAnchorAttachmentPoint(sourceElement, bounds, edgeInset) ??
      getElementCenterWithinSurface(sourceElement, bounds);
    const targetPoint =
      getFixedAnchorAttachmentPoint(targetElement, bounds, edgeInset) ??
      getElementCenterWithinSurface(targetElement, bounds);
    return {
      startX: sourcePoint.x,
      startY: sourcePoint.y,
      endX: targetPoint.x,
      endY: targetPoint.y,
    };
  }

  function getRenderedAnchorsForNodeRole(nodeKey, role) {
    if (!surface) {
      return [];
    }
    return Array.from(
      surface.querySelectorAll(
        `.composer-reaction-canvas-anchor[data-anchor-key="${escapeCssSelector(nodeKey)}"][data-anchor-side="${escapeCssSelector(role)}"]`
      )
    ).sort((leftAnchor, rightAnchor) => {
      const leftIndex = Number(leftAnchor.dataset.anchorInstanceIndex ?? 0);
      const rightIndex = Number(rightAnchor.dataset.anchorInstanceIndex ?? 0);
      if (leftIndex !== rightIndex) {
        return leftIndex - rightIndex;
      }
      const leftTop = leftAnchor.getBoundingClientRect().top;
      const rightTop = rightAnchor.getBoundingClientRect().top;
      return leftTop - rightTop;
    });
  }

  function getRenderedMappingAnchor(mapping, endpoint = "source") {
    if (!mapping) {
      return null;
    }
    const isSource = endpoint !== "target";
    const anchorKey = isSource ? mapping.sourceKey : mapping.targetKey;
    const anchorRole = isSource ? mapping.sourceRole : mapping.targetRole;
    const anchorInstanceIndex = isSource
      ? mapping.sourceAnchorInstanceIndex
      : mapping.targetAnchorInstanceIndex;
    const anchors = getRenderedAnchorsForNodeRole(anchorKey, anchorRole);
    if (!anchors.length) {
      return null;
    }
    const normalizedIndex = normalizeAnchorInstanceIndex(anchorInstanceIndex);
    if (normalizedIndex !== null) {
      const exactAnchor =
        anchors.find(
          (anchor) =>
            normalizeAnchorInstanceIndex(anchor.dataset.anchorInstanceIndex) === normalizedIndex
        ) ?? null;
      if (exactAnchor) {
        return exactAnchor;
      }
    }
    if (anchors.length === 1) {
      return anchors[0];
    }
    const matchingMappings = getMappings().filter((entry) =>
      isSource
        ? entry.sourceKey === anchorKey && entry.sourceRole === anchorRole
        : entry.targetKey === anchorKey && entry.targetRole === anchorRole
    );
    const mappingIndex = matchingMappings.findIndex((entry) => entry.id === mapping.id);
    if (mappingIndex < 0) {
      return anchors[0];
    }
    return anchors[mappingIndex % anchors.length] ?? anchors[0];
  }

  function drawMappings() {
    drawFrameId = 0;
    if (!isActive() || !surface || !mapSvg) {
      return;
    }
    const bounds = surface.getBoundingClientRect();
    const width = Math.max(1, Math.round(bounds.width));
    const height = Math.max(1, Math.round(bounds.height));
    mapSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    mapSvg.innerHTML = "";
    getMappings().forEach((mapping) => {
      const sourceAnchor = getRenderedMappingAnchor(mapping, "source");
      const targetAnchor = getRenderedMappingAnchor(mapping, "target");
      if (!sourceAnchor || !targetAnchor) {
        return;
      }
      const { startX, startY, endX, endY } = getTrimmedRouteEndpoints(
        sourceAnchor,
        targetAnchor,
        bounds
      );
      const validation = getMappingValidation(mapping);
      const path = createSvgElement("path");
      path?.setAttribute?.(
        "d",
        buildReactionCanvasCurvePath({ startX, startY, endX, endY })
      );
      path?.setAttribute?.("class", "composer-reaction-canvas-path");
      if (path?.dataset) {
        path.dataset.mappingId = mapping.id;
      }
      path?.classList?.toggle?.("is-invalid", !validation.valid);
      if (validation.reason) {
        const title = createSvgElement("title");
        title?.append?.(validation.reason);
        path?.appendChild?.(title);
      }
      path?.addEventListener?.("pointerenter", () => setHoveredMappingIds([mapping.id]));
      path?.addEventListener?.("pointerleave", () => setHoveredMappingIds([]));
      path?.addEventListener?.("click", () => {
        if (!removeMappingById(mapping.id)) {
          return;
        }
        render();
        setStatus("Removed reaction mapping.");
      });
      mapSvg.appendChild(path);
    });
    applyHoveredRouteState();
  }

  function scheduleMappingDraw() {
    if (drawFrameId) {
      cancelAnimationFrameImpl(drawFrameId);
    }
    drawFrameId = requestAnimationFrameImpl(drawMappings);
  }

  return {
    drawMappings,
    scheduleMappingDraw,
    getTrimmedRouteEndpoints,
  };
}

import {
  CANVAS_COLORS,
  DEFAULT_BACKGROUND_ID,
  DEFAULT_COMMENT_FONT_SIZE,
  DEFAULT_EQUATION_MAP_DOCUMENT_ID,
  DEFAULT_EQUATION_SCALE,
  DEFAULT_SECTION_LINE_PLACEMENT,
  createSeedEquationMapDocuments,
  getCanvasColorById,
  normalizeBackgroundId,
  normalizeCommentFontSize,
  normalizeEquationMapDocuments,
  normalizeEquationScale,
} from "./EquationMappingData.js";
import { renderEquationSidebar, revealEquationInSidebar } from "./EquationMappingSidebar.js";
import {
  createEquationMapSemanticId,
  resolveEquationMapDocumentId,
} from "./EquationMappingRegistry.js";
import { createStandaloneAppNavigationRuntime } from "../navigator/StandaloneAppNavigationRuntime.js";
import { createPanelCollapseIconSvg } from "../../runtime/PanelCollapseIcons.js";
import { resolveEquationMappingReturnHref } from "../../runtime/EquationMappingNavigation.js";
import { createEquationMappingSymbolTooltip } from "./EquationMappingSymbolTooltip.js";

const SETTINGS_STORAGE_KEY = "architrino.equationMapping.settings.v7";
const SIZE_CALIBRATION_VERSION = 3;
const CONTROL_STRIP_TITLE_GAP_PX = 16;
const SETTINGS_ACTION_ID = "equation-mapping-settings-toggle";
const SETTINGS_PANEL_ID = "equation-mapping-settings-panel";
const SVG_NS = "http://www.w3.org/2000/svg";
const EQUATION_AUTO_FIT_MIN_FONT_SIZE = Object.freeze({
  small: 11,
  medium: 13,
  large: 15,
});
const SECTION_LINE_OFFSET_PX = Object.freeze({
  above: -16,
  below: -14,
});
const SECTION_MARKER_DEFAULT_INSET_RATIO = 0.18;
const SECTION_MARKER_MIN_INSET_PX = 8;
const COMMENT_CONNECTOR_INSET_PX = 32;
const CALLOUT_LAYOUT_MARGIN_PX = 32;
const CALLOUT_LAYOUT_EQUATION_GAP_PX = 28;
const CALLOUT_LAYOUT_ITEM_GAP_PX = 24;
const CALLOUT_LAYOUT_BAND_PADDING_PX = 240;
const CALLOUT_LAYOUT_TITLE_GAP_PX = 18;
const SYMBOL_TOOLTIP_GAP_PX = 8;
const SYMBOL_TOOLTIP_CALLOUT_GAP_PX = 16;
const COORDINATE_EFFECTIVE_OVERLAY_ID = "effective-coordinates";
const COORDINATE_EFFECTIVE_ANCHOR_ID = "effectiveLayer";
const SIDE_CALLOUT_GAP_PX = 32;
const COORDINATE_CAROUSEL_CLEARANCE_PX = 16;

function createElement(documentLike, tag, className = "", textContent) {
  const element = documentLike.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (textContent != null) {
    element.textContent = textContent;
  }
  return element;
}

function createSvgElement(documentLike, tag) {
  return documentLike.createElementNS(SVG_NS, tag);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getRectCenter(rect) {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

function isTextEntryTarget(target) {
  const tagName = String(target?.tagName ?? "").toLowerCase();
  return (
    tagName === "input" ||
    tagName === "textarea" ||
    tagName === "select" ||
    Boolean(target?.isContentEditable) ||
    Boolean(target?.closest?.("[contenteditable='true'], [contenteditable='plaintext-only']"))
  );
}

function getLocalRect(rect, stageRect) {
  return {
    left: rect.left - stageRect.left,
    top: rect.top - stageRect.top,
    right: rect.right - stageRect.left,
    bottom: rect.bottom - stageRect.top,
    width: rect.width,
    height: rect.height,
  };
}

function getSectionMarkerTargetRect(anchorElement) {
  const rect = anchorElement.getBoundingClientRect();
  const markerLeftPercent = Number(anchorElement.dataset.sectionMarkerLeft);
  const markerWidthPercent = Number(anchorElement.dataset.sectionMarkerWidth);
  if (Number.isFinite(markerLeftPercent) && Number.isFinite(markerWidthPercent)) {
    const left = rect.left + (rect.width * markerLeftPercent) / 100;
    const width = (rect.width * markerWidthPercent) / 100;
    return {
      left,
      top: rect.top,
      right: left + width,
      bottom: rect.bottom,
      width,
      height: rect.height,
    };
  }
  const insetPx = Math.max(SECTION_MARKER_MIN_INSET_PX, rect.width * SECTION_MARKER_DEFAULT_INSET_RATIO);
  const width = Math.max(1, rect.width - insetPx * 2);
  return {
    left: rect.left + insetPx,
    top: rect.top,
    right: rect.left + insetPx + width,
    bottom: rect.bottom,
    width,
    height: rect.height,
  };
}

function isFormulaBreakElement(element) {
  return Boolean(element?.classList?.contains?.("equation-mapping-formula-break"));
}

function getMeasuredElementWidth(element) {
  const rect = element?.getBoundingClientRect?.();
  return Math.max(
    Number(element?.scrollWidth) || 0,
    Number(element?.offsetWidth) || 0,
    Number(element?.clientWidth) || 0,
    Number(rect?.width) || 0
  );
}

function hasExplicitFormulaBreak(equation) {
  return Array.from(equation?.children ?? []).some(isFormulaBreakElement);
}

function measureEquationNaturalRows(equation, window) {
  const children = Array.from(equation?.children ?? []);
  if (!children.length) {
    return [{ naturalWidth: Number(equation?.scrollWidth) || 0, fixedWidth: 0 }];
  }
  const rows = [];
  let row = { naturalWidth: 0, fixedWidth: 0 };
  children.forEach((child) => {
    if (isFormulaBreakElement(child)) {
      rows.push(row);
      row = { naturalWidth: 0, fixedWidth: 0 };
      return;
    }
    // A centered row can overflow before the scroll origin, beyond scrollWidth.
    row.naturalWidth += getMeasuredElementWidth(child);
    const style = window?.getComputedStyle?.(child);
    // Formula-part padding is in pixels and does not shrink with the glyphs.
    row.fixedWidth += (Number.parseFloat(style?.paddingLeft) || 0)
      + (Number.parseFloat(style?.paddingRight) || 0);
  });
  rows.push(row);
  return rows;
}

function getUnionRect(rects = []) {
  const measuredRects = rects.filter(
    (rect) =>
      rect &&
      Number.isFinite(rect.left + rect.top + rect.right + rect.bottom)
  );
  if (!measuredRects.length) {
    return null;
  }
  const left = Math.min(...measuredRects.map((rect) => rect.left));
  const top = Math.min(...measuredRects.map((rect) => rect.top));
  const right = Math.max(...measuredRects.map((rect) => rect.right));
  const bottom = Math.max(...measuredRects.map((rect) => rect.bottom));
  return {
    left,
    top,
    right,
    bottom,
    width: right - left,
    height: bottom - top,
  };
}

function measureEquationRowRects(equation, stageRect) {
  const children = Array.from(equation?.children ?? []);
  const rows = [];
  let currentRow = [];
  children.forEach((child) => {
    if (isFormulaBreakElement(child)) {
      const rowRect = getUnionRect(
        currentRow.map((element) => getLocalRect(element.getBoundingClientRect(), stageRect))
      );
      if (rowRect) {
        rows.push(rowRect);
      }
      currentRow = [];
      return;
    }
    currentRow.push(child);
  });
  const finalRowRect = getUnionRect(
    currentRow.map((element) => getLocalRect(element.getBoundingClientRect(), stageRect))
  );
  if (finalRowRect) {
    rows.push(finalRowRect);
  }
  return rows;
}

export function resolveEquationLineClearancePx(
  rowRects = [],
  fallbackPx = CALLOUT_LAYOUT_EQUATION_GAP_PX
) {
  const measuredRowHeight = rowRects.reduce((maxHeight, rect) => {
    const height = Number(rect?.height);
    return Number.isFinite(height) && height > 0
      ? Math.max(maxHeight, height)
      : maxHeight;
  }, 0);
  const fallback = Number(fallbackPx);
  return Math.max(
    CALLOUT_LAYOUT_EQUATION_GAP_PX,
    measuredRowHeight,
    Number.isFinite(fallback) && fallback > 0 ? fallback : 0
  );
}

export function resolveEquationVerticalShift({
  stageHeight = 0,
  equationShellRect = null,
  rowRects = [],
  aboveCalloutRects = [],
  belowCalloutRects = [],
  marginPx = CALLOUT_LAYOUT_MARGIN_PX,
  minimumGapPx = 0,
} = {}) {
  if (stageHeight > 0 && equationShellRect && aboveCalloutRects.length && minimumGapPx > 0) {
    const clearanceShift = Math.max(...aboveCalloutRects.map(rect => rect.bottom)) + minimumGapPx - equationShellRect.top;
    // A tall upper explainer needs real content space, even on a short screen.
    // The stage can scroll; capping this shift would recreate the collision.
    if (clearanceShift > 0) return clearanceShift;
  }
  if (
    stageHeight <= 0 ||
    !equationShellRect ||
    rowRects.length < 2 ||
    aboveCalloutRects.length === 0 ||
    belowCalloutRects.length > 0
  ) {
    return 0;
  }
  const firstRow = rowRects[0];
  const secondRow = rowRects[1];
  const rowAdvancePx = secondRow.top - firstRow.top;
  if (!Number.isFinite(rowAdvancePx) || rowAdvancePx <= 0) {
    return 0;
  }
  const maxAboveBottom = Math.max(...aboveCalloutRects.map((rect) => rect.bottom));
  if (firstRow.top >= maxAboveBottom + rowAdvancePx) {
    return 0;
  }
  const maxShiftPx = Math.max(
    0,
    stageHeight - marginPx - equationShellRect.bottom
  );
  return Math.min(rowAdvancePx, maxShiftPx);
}

function getFormulaAnchorPositions(document = {}) {
  const anchorPositions = new Map();
  let rowIndex = 0;
  let partIndex = 0;
  (document.formulaParts ?? []).forEach((part) => {
    if (part.kind === "break") {
      rowIndex += 1;
      return;
    }
    if (part.anchorId && !anchorPositions.has(part.anchorId)) {
      anchorPositions.set(part.anchorId, { rowIndex, partIndex });
    }
    partIndex += 1;
  });
  return {
    anchorPositions,
    rowCount: rowIndex + 1,
  };
}

function getOverlayTargetPosition(overlay, anchorPositions, fallbackIndex) {
  return anchorPositions.get(overlay.targetAnchorId) ?? {
    rowIndex: 0,
    partIndex: Number.MAX_SAFE_INTEGER + fallbackIndex,
  };
}

function resolveConnectorAlignedRowShift({
  positioned = [],
  hardLeft = 0,
  hardRight = 0,
  connectorInsetPx = COMMENT_CONNECTOR_INSET_PX,
} = {}) {
  if (!positioned.length || hardRight <= hardLeft) {
    return 0;
  }
  const first = positioned[0];
  const last = positioned[positioned.length - 1];
  let minDelta = hardLeft - first.x;
  let maxDelta = hardRight - (last.x + last.item.width);

  positioned.forEach((entry) => {
    const width = Math.max(0, entry.item.width);
    const inset = Math.min(connectorInsetPx, width / 2);
    const verticalLeft = entry.item.targetCenterX - (width - inset);
    const verticalRight = entry.item.targetCenterX - inset;
    minDelta = Math.max(minDelta, verticalLeft - entry.x);
    maxDelta = Math.min(maxDelta, verticalRight - entry.x);
  });

  if (minDelta > maxDelta) {
    return 0;
  }
  if (minDelta <= 0 && maxDelta >= 0) {
    return 0;
  }
  return minDelta > 0 ? minDelta : maxDelta;
}

function isCoordinateEffectiveSideCallout(document, overlay) {
  return (
    document?.id === DEFAULT_EQUATION_MAP_DOCUMENT_ID &&
    overlay?.id === COORDINATE_EFFECTIVE_OVERLAY_ID &&
    overlay?.targetAnchorId === COORDINATE_EFFECTIVE_ANCHOR_ID
  );
}

export function resolveCalloutPlacements(document = {}) {
  const overlays = document.overlays ?? [];
  const { anchorPositions, rowCount } = getFormulaAnchorPositions(document);
  const placementByOverlayId = new Map();

  if (document.calloutPlacementMode === "explicit") {
    overlays.forEach((overlay) => {
      placementByOverlayId.set(
        overlay.id,
        overlay.sectionLinePlacement ?? DEFAULT_SECTION_LINE_PLACEMENT
      );
    });
    return placementByOverlayId;
  }

  if (rowCount > 1) {
    const overlayTargets = overlays.map((overlay, index) => ({
      overlay,
      index,
      targetPosition: getOverlayTargetPosition(overlay, anchorPositions, index),
    }));
    const crowdedFirstRowOverlays = overlayTargets
      .filter(({ targetPosition }) => targetPosition.rowIndex === 0)
      .sort((left, right) =>
        left.targetPosition.partIndex - right.targetPosition.partIndex ||
        left.index - right.index
      );
    const crowdedFirstRowPlacementById = new Map();
    if (crowdedFirstRowOverlays.length >= 4) {
      crowdedFirstRowOverlays.forEach(({ overlay }, index) => {
        crowdedFirstRowPlacementById.set(overlay.id, index % 2 === 0 ? "above" : "below");
      });
    }
    overlayTargets.forEach(({ overlay, targetPosition }) => {
      placementByOverlayId.set(
        overlay.id,
        crowdedFirstRowPlacementById.get(overlay.id) ??
          (targetPosition.rowIndex === 0 ? "above" : "below")
      );
    });
    return placementByOverlayId;
  }

  overlays
    .map((overlay, index) => ({
      overlay,
      index,
      targetPosition: getOverlayTargetPosition(overlay, anchorPositions, index),
    }))
    .sort((left, right) =>
      left.targetPosition.partIndex - right.targetPosition.partIndex ||
      left.index - right.index
    )
    .forEach(({ overlay }, index) => {
      placementByOverlayId.set(overlay.id, index % 2 === 0 ? "above" : "below");
    });

  return placementByOverlayId;
}

function resolveHorizontalCalloutPositions({
  stageWidth = 0,
  equationRect = null,
  items = [],
  marginPx = CALLOUT_LAYOUT_MARGIN_PX,
  itemGapPx = CALLOUT_LAYOUT_ITEM_GAP_PX,
  bandPaddingPx = CALLOUT_LAYOUT_BAND_PADDING_PX,
} = {}) {
  const sortedItems = [...items].sort(
    (left, right) => left.targetCenterX - right.targetCenterX
  );
  if (!sortedItems.length || !equationRect || stageWidth <= 0) {
    return new Map();
  }
  const hardLeft = marginPx;
  const hardRight = Math.max(hardLeft, stageWidth - marginPx);
  const hardWidth = hardRight - hardLeft;
  const widthSum = sortedItems.reduce((sum, item) => sum + item.width, 0);
  const gapCount = Math.max(0, sortedItems.length - 1);
  const gapPx =
    gapCount > 0 && widthSum + itemGapPx * gapCount > hardWidth
      ? Math.max(8, (hardWidth - widthSum) / gapCount)
      : itemGapPx;
  const totalWidth = Math.min(hardWidth, widthSum + gapPx * gapCount);
  const equationCenter = equationRect.left + equationRect.width / 2;
  const preferredBandWidth = Math.max(
    totalWidth,
    equationRect.width + bandPaddingPx * 2
  );
  const bandWidth = Math.min(hardWidth, preferredBandWidth);
  const bandLeft = clamp(
    equationCenter - bandWidth / 2,
    hardLeft,
    hardRight - bandWidth
  );
  const bandRight = bandLeft + bandWidth;
  const positioned = sortedItems.map((item) => ({
    item,
    x: clamp(item.targetCenterX - item.width / 2, bandLeft, bandRight - item.width),
  }));

  for (let index = 1; index < positioned.length; index += 1) {
    const previous = positioned[index - 1];
    const current = positioned[index];
    current.x = Math.max(current.x, previous.x + previous.item.width + gapPx);
  }

  const last = positioned[positioned.length - 1];
  const overflowRight = last.x + last.item.width - bandRight;
  if (overflowRight > 0) {
    positioned.forEach((entry) => {
      entry.x -= overflowRight;
    });
  }

  const underflowLeft = bandLeft - positioned[0].x;
  if (underflowLeft > 0) {
    positioned.forEach((entry) => {
      entry.x += underflowLeft;
    });
  }

  const connectorAlignedShift = resolveConnectorAlignedRowShift({
    positioned,
    hardLeft,
    hardRight,
  });
  if (connectorAlignedShift !== 0) {
    positioned.forEach((entry) => {
      entry.x += connectorAlignedShift;
    });
  }

  return new Map(
    positioned.map(({ item, x }) => [
      item.id,
      {
        x: clamp(x, hardLeft, Math.max(hardLeft, hardRight - item.width)),
      },
    ])
  );
}

export function resolveCalloutRowLayout({
  stageWidth = 0,
  stageHeight = 0,
  equationRect = null,
  titleRect = null,
  items = [],
  placement = DEFAULT_SECTION_LINE_PLACEMENT,
  marginPx = CALLOUT_LAYOUT_MARGIN_PX,
  equationGapPx = CALLOUT_LAYOUT_EQUATION_GAP_PX,
  itemGapPx = CALLOUT_LAYOUT_ITEM_GAP_PX,
  bandPaddingPx = CALLOUT_LAYOUT_BAND_PADDING_PX,
  minBelowY = equationRect?.bottom ?? 0,
} = {}) {
  const horizontalPositions = resolveHorizontalCalloutPositions({
    stageWidth,
    equationRect,
    items,
    marginPx,
    itemGapPx,
    bandPaddingPx,
  });
  if (!horizontalPositions.size || !equationRect || stageHeight <= 0) {
    return new Map();
  }
  const maxHeight = Math.max(...items.map((item) => item.height));
  const titleBottom = Number.isFinite(titleRect?.bottom)
    ? titleRect.bottom + CALLOUT_LAYOUT_TITLE_GAP_PX
    : marginPx;
  const safeTop = Math.max(marginPx, titleBottom);
  const safeBottom = Math.max(safeTop, stageHeight - marginPx);
  const unclampedY =
    placement === "above"
      ? equationRect.top - equationGapPx - maxHeight
      : equationRect.bottom + equationGapPx;
  const y =
    placement === "above"
      ? clamp(unclampedY, safeTop, Math.max(safeTop, equationRect.top - maxHeight))
      : Math.max(minBelowY, clamp(unclampedY, equationRect.bottom, Math.max(equationRect.bottom, safeBottom - maxHeight)));

  return new Map(
    items.map((item) => [
      item.id,
      {
        x: horizontalPositions.get(item.id)?.x ?? item.targetCenterX - item.width / 2,
        y,
      },
    ])
  );
}

export function resolveSideCalloutPosition({
  stageWidth = 0,
  stageHeight = 0,
  targetRect = null,
  commentRect = null,
  marginPx = CALLOUT_LAYOUT_MARGIN_PX,
  gapPx = SIDE_CALLOUT_GAP_PX,
} = {}) {
  if (!targetRect || !commentRect || stageWidth <= 0 || stageHeight <= 0) {
    return null;
  }
  const hardLeft = marginPx;
  const hardRight = Math.max(hardLeft, stageWidth - marginPx);
  const hardBottom = Math.max(marginPx, stageHeight - marginPx);
  const preferredX = targetRect.left - commentRect.width - gapPx;
  const preferredY = targetRect.top + targetRect.height / 2 - commentRect.height / 2;
  return {
    x: clamp(preferredX, hardLeft, Math.max(hardLeft, hardRight - commentRect.width)),
    y: clamp(preferredY, marginPx, Math.max(marginPx, hardBottom - commentRect.height)),
  };
}

export function resolveCarouselClearanceCalloutPosition({
  position = null,
  commentRect = null,
  carouselRect = null,
  marginPx = CALLOUT_LAYOUT_MARGIN_PX,
  clearancePx = COORDINATE_CAROUSEL_CLEARANCE_PX,
  minY = marginPx,
} = {}) {
  if (!position || !commentRect || !carouselRect) {
    return position;
  }
  const maxY = carouselRect.top - clearancePx - commentRect.height;
  if (!Number.isFinite(maxY) || position.y <= maxY) {
    return position;
  }
  return {
    ...position,
    y: Math.max(minY, maxY),
  };
}

export function calculateEquationAutoFit({
  availableWidth = 0,
  naturalWidth = 0,
  fixedWidth = 0,
  baseFontSize = 0,
  minFontSize = 0,
} = {}) {
  const width = Number(availableWidth);
  const natural = Number(naturalWidth);
  const base = Number(baseFontSize);
  const minimum = Number(minFontSize);
  if (
    width <= 0 ||
    natural <= 0 ||
    base <= 0 ||
    minimum <= 0 ||
    !Number.isFinite(width + natural + base + minimum)
  ) {
    return { fontSize: base || minimum || 0, shouldWrap: true, mode: "unmeasured" };
  }
  if (natural <= width) {
    return { fontSize: base, shouldWrap: false, mode: "base" };
  }
  const fixed = Math.max(0, Number(fixedWidth) || 0);
  const scalableWidth = natural - fixed;
  const fitFontSize = scalableWidth > 0 ? ((width - fixed) / scalableWidth) * base : 0;
  if (fitFontSize >= minimum) {
    return { fontSize: fitFontSize, shouldWrap: false, mode: "scaled" };
  }
  const minimumWidth = (scalableWidth / base) * minimum + fixed;
  return {
    fontSize: minimum,
    shouldWrap: minimumWidth > width,
    mode: minimumWidth > width ? "wrapped" : "minimum",
  };
}

export function createPointerLineGeometry(
  stageRect,
  targetRect,
  commentRect,
  placement = DEFAULT_SECTION_LINE_PLACEMENT,
  sectionLineOffsetPx = SECTION_LINE_OFFSET_PX[placement] ?? 0
) {
  const targetCenter = getRectCenter(targetRect);
  const targetY = placement === "above" ? targetRect.top + sectionLineOffsetPx : targetRect.bottom - sectionLineOffsetPx;
  const targetX = clamp(targetCenter.x, targetRect.left, targetRect.right);
  const sourceLeft = Math.min(commentRect.right, commentRect.left + COMMENT_CONNECTOR_INSET_PX);
  const sourceRight = Math.max(sourceLeft, commentRect.right - COMMENT_CONNECTOR_INSET_PX);
  const sourceX = clamp(
    targetX,
    sourceLeft,
    sourceRight
  );
  const sourceY = placement === "above" ? commentRect.bottom : commentRect.top;
  return {
    x1: sourceX - stageRect.left,
    y1: sourceY - stageRect.top,
    x2: targetX - stageRect.left,
    y2: targetY - stageRect.top,
  };
}

export function createSidePointerLineGeometry(stageRect, targetRect, commentRect) {
  const targetY = targetRect.top + targetRect.height / 2;
  const sourceY = clamp(
    targetY,
    commentRect.top + COMMENT_CONNECTOR_INSET_PX,
    commentRect.bottom - COMMENT_CONNECTOR_INSET_PX
  );
  return {
    x1: commentRect.right - stageRect.left,
    y1: sourceY - stageRect.top,
    x2: targetRect.left - stageRect.left,
    y2: targetY - stageRect.top,
  };
}

function renderMath(windowLike, element, tex, { displayMode = false } = {}) {
  const katex = windowLike?.katex;
  if (katex && typeof katex.render === "function") {
    katex.render(tex, element, {
      displayMode,
      throwOnError: false,
    });
    return;
  }
  element.textContent = displayMode ? `$$${tex}$$` : tex;
  element.classList.add("equation-mapping-math-fallback");
}

function appendInlineMathText(windowLike, documentLike, parent, text) {
  const source = String(text ?? "");
  const inlineMathPattern = /\$([^$\n]+)\$/g;
  let cursor = 0;
  let match;
  while ((match = inlineMathPattern.exec(source))) {
    if (match.index > cursor) {
      parent.append(documentLike.createTextNode(source.slice(cursor, match.index)));
    }
    const math = createElement(documentLike, "span", "equation-mapping-inline-math");
    renderMath(windowLike, math, match[1], { displayMode: false });
    parent.append(math);
    cursor = match.index + match[0].length;
  }
  if (cursor < source.length) {
    parent.append(documentLike.createTextNode(source.slice(cursor)));
  }
  return parent;
}

function createInlineMathTextElement(windowLike, documentLike, tag, className, text) {
  return appendInlineMathText(windowLike, documentLike, createElement(documentLike, tag, className), text);
}

function readSavedSettings(windowLike) {
  try {
    const value = windowLike?.localStorage?.getItem?.(SETTINGS_STORAGE_KEY);
    return value ? JSON.parse(value) : {};
  } catch {
    return {};
  }
}

function saveSettings(windowLike, settings) {
  try {
    windowLike?.localStorage?.setItem?.(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Browser-local settings are optional for file and test contexts.
  }
}

function normalizeExpandedSubjectIds(value) {
  if (!Array.isArray(value)) {
    return new Set();
  }
  return new Set(value.map((entry) => String(entry ?? "").trim()).filter(Boolean));
}

function readLocationHashId(windowLike) {
  const hash = String(windowLike?.location?.hash ?? "").replace(/^#/u, "").trim();
  if (!hash) {
    return "";
  }
  try {
    return decodeURIComponent(hash);
  } catch {
    return hash;
  }
}

function replaceLocationHashForDocument(windowLike, document) {
  const hashId = createEquationMapSemanticId(document.id, document.title);
  if (!hashId || !windowLike?.location) {
    return;
  }
  const nextHash = `#${encodeURIComponent(hashId)}`;
  if (windowLike.location.hash === nextHash) {
    return;
  }
  if (typeof windowLike.history?.replaceState === "function" && windowLike.location.href) {
    const url = new URL(windowLike.location.href);
    url.hash = hashId;
    windowLike.history.replaceState(windowLike.history.state ?? null, "", url.href);
    return;
  }
  windowLike.location.hash = nextHash;
}

// Only the carousel chevrons and the return link draw their own icons. Every
// top-right control icon belongs to the canonical top control bar; duplicating
// its markup here is what produced two identical, differently behaving
// magnifiers in the corner.
function createIconSvg(name) {
  switch (name) {
    case "previous":
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 5 8 12 15 19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    case "next":
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 5 16 12 9 19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    default:
      return "";
  }
}

export function mountEquationMappingApp(options = {}) {
  return new EquationMappingRuntime(options).init();
}

export class EquationMappingRuntime {
  constructor(options = {}) {
    this.document = options.document ?? globalThis.document;
    this.window = options.window ?? globalThis.window;
    // The corpus is the only authority for equation-map content. The app reads it
    // and never writes it back, so there is no browser-local document draft.
    this.documents = normalizeEquationMapDocuments(options.documents ?? createSeedEquationMapDocuments());
    const savedSettings = readSavedSettings(this.window);
    const requestedDocumentId =
      options.initialDocumentId ||
      readLocationHashId(this.window);
    this.activeDocumentId =
      resolveEquationMapDocumentId(this.documents, requestedDocumentId) ||
      this.documents.find((document) => document.id === DEFAULT_EQUATION_MAP_DOCUMENT_ID)?.id ||
      this.documents[0].id;
    this.activeOverlayId = this.activeDocument.overlays.some((overlay) => overlay.id === savedSettings.activeOverlayId)
      ? savedSettings.activeOverlayId
      : this.activeDocument.overlays[0]?.id ?? "";
    this.activeAnchorId = this.activeDocument.anchors.some((anchor) => anchor.id === savedSettings.activeAnchorId)
      ? savedSettings.activeAnchorId
      : this.activeDocument.anchors[0]?.id ?? "";
    this.backgroundId = normalizeBackgroundId(
      options.backgroundId ?? savedSettings.backgroundId ?? this.activeDocument.backgroundId ?? DEFAULT_BACKGROUND_ID
    );
    const savedSizeSettingsAreCurrent = savedSettings.sizeCalibrationVersion === SIZE_CALIBRATION_VERSION;
    this.equationScale = normalizeEquationScale(
      options.equationScale ??
        (savedSizeSettingsAreCurrent ? savedSettings.equationScale : DEFAULT_EQUATION_SCALE)
    );
    this.commentFontSize = normalizeCommentFontSize(
      options.commentFontSize ??
        (savedSizeSettingsAreCurrent ? savedSettings.commentFontSize : DEFAULT_COMMENT_FONT_SIZE)
    );
    const compactViewportDefault = Boolean(
      this.window?.matchMedia?.("(max-width: 760px)")?.matches
    );
    this.indexCollapsed = Boolean(
      options.indexCollapsed ?? (compactViewportDefault ? true : savedSettings.indexCollapsed ?? false)
    );
    this.expandedSubjectIds = normalizeExpandedSubjectIds(
      options.expandedSubjectIds ?? savedSettings.expandedSubjectIds
    );
    this.navigationView = "key";
    this.expandedChapterIds = new Set();
    this.expandedSectionIds = new Set();
    if (resolveEquationMapDocumentId(this.documents, requestedDocumentId)) {
      const fromPage = Boolean(resolveEquationMappingReturnHref(this.window?.location?.href));
      revealEquationInSidebar(this, this.activeDocument, { all: fromPage });
      if (fromPage || !this.activeDocument.promoted) this.indexCollapsed = false;
      this.revealSidebarSelection = true;
    }
    this.settingsOpen = false;
    // The symbols and source rail mirrors the equations rail on the left: it is
    // always present and collapses to an icon-width strip, so source context
    // stays reachable on an equation that defines no symbols.
    this.referenceCollapsed = Boolean(
      options.referenceCollapsed ?? savedSettings.referenceCollapsed ?? true
    );
    this.globalSearchOpen = false;
    this.activeSymbolId = this.activeDocument.symbols[0]?.id ?? "";
    this.searchQuery = "";
    this.anchorElements = new Map();
    this.overlayElements = new Map();
    this.pointerLines = [];
    this.equationShellElement = null;
    this.equationElement = null;
    this.equationTitleElement = null;
    this.handleKeyDown = null;
    this.navigationRuntime = null;
  }

  get activeDocument() {
    return this.documents.find((document) => document.id === this.activeDocumentId) ?? this.documents[0];
  }

  get activeOverlay() {
    const document = this.activeDocument;
    return document.overlays.find((overlay) => overlay.id === this.activeOverlayId) ?? document.overlays[0] ?? null;
  }

  get activeAnchor() {
    const document = this.activeDocument;
    return document.anchors.find((anchor) => anchor.id === this.activeAnchorId) ?? document.anchors[0] ?? null;
  }

  init() {
    this.root = this.document.getElementById("equation-mapping-app");
    if (!this.root) {
      throw new Error("Missing #equation-mapping-app");
    }
    const navigationHost = this.document.getElementById("scene-hud-tools");
    if (!navigationHost) {
      throw new Error("Missing #scene-hud-tools");
    }
    // Canvas settings joins the canonical strip as an extension action, in the
    // accepted shared order, so the page presents one row of controls instead
    // of a private second row beneath it.
    this.navigationRuntime = createStandaloneAppNavigationRuntime({
      host: navigationHost,
      document: this.document,
      window: this.window,
      search: {
        onOpenChange: (isOpen) => {
          this.globalSearchOpen = isOpen;
          if (isOpen) {
            this.settingsOpen = false;
          }
          this.render();
        },
      },
      extensionActions: [
        {
          kind: "settings",
          id: SETTINGS_ACTION_ID,
          label: "Canvas settings",
          title: "Canvas settings",
          controls: SETTINGS_PANEL_ID,
          pressed: false,
          onActivate: () => {
            this.settingsOpen = !this.settingsOpen;
            this.render();
          },
        },
      ],
    }).init();
    this.handleResize = () => {
      this.symbolTooltip?.hide();
      this.scheduleEquationLayout();
    };
    this.handleKeyDown = (event) => this.handleDocumentKeyDown(event);
    this.handleHashChange = () => this.syncActiveDocumentFromLocation();
    this.window?.addEventListener?.("resize", this.handleResize);
    this.window?.addEventListener?.("keydown", this.handleKeyDown);
    this.window?.addEventListener?.("hashchange", this.handleHashChange);
    this.render();
    return this;
  }

  destroy() {
    this.symbolTooltip?.hide();
    this.window?.removeEventListener?.("resize", this.handleResize);
    this.window?.removeEventListener?.("keydown", this.handleKeyDown);
    this.window?.removeEventListener?.("hashchange", this.handleHashChange);
    this.navigationRuntime?.destroy?.();
    this.navigationRuntime = null;
  }

  persistSettings() {
    saveSettings(this.window, {
      activeDocumentId: this.activeDocumentId,
      activeOverlayId: this.activeOverlayId,
      activeAnchorId: this.activeAnchorId,
      backgroundId: this.backgroundId,
      equationScale: this.equationScale,
      commentFontSize: this.commentFontSize,
      sizeCalibrationVersion: SIZE_CALIBRATION_VERSION,
      indexCollapsed: this.indexCollapsed,
      referenceCollapsed: this.referenceCollapsed,
      expandedSubjectIds: [...this.expandedSubjectIds],
    });
  }

  setActiveDocument(documentId) {
    const nextDocument = this.documents.find((document) => document.id === documentId);
    if (!nextDocument) {
      return;
    }
    this.activeDocumentId = nextDocument.id;
    this.activeAnchorId = nextDocument.anchors[0]?.id ?? "";
    this.activeOverlayId = nextDocument.overlays[0]?.id ?? "";
    this.activeSymbolId = nextDocument.symbols[0]?.id ?? "";
    revealEquationInSidebar(this, nextDocument);
    this.revealSidebarSelection = true;
    replaceLocationHashForDocument(this.window, nextDocument);
    this.persistSettings();
    this.render();
  }

  syncActiveDocumentFromLocation() {
    const requestedDocumentId = readLocationHashId(this.window);
    const documentId = resolveEquationMapDocumentId(this.documents, requestedDocumentId);
    if (!documentId || documentId === this.activeDocument.id) return false;
    const nextDocument = this.documents.find((document) => document.id === documentId);
    if (!nextDocument) return false;
    this.activeDocumentId = nextDocument.id;
    this.activeAnchorId = nextDocument.anchors[0]?.id ?? "";
    this.activeOverlayId = nextDocument.overlays[0]?.id ?? "";
    this.activeSymbolId = nextDocument.symbols[0]?.id ?? "";
    revealEquationInSidebar(this, nextDocument, { all: true });
    this.indexCollapsed = false;
    this.searchQuery = "";
    this.revealSidebarSelection = true;
    this.persistSettings();
    this.render();
    return true;
  }

  getVisibleDocumentList() {
    return this.documents;
  }

  getCarouselDocumentList() {
    return this.documents.filter((document) => document.promoted);
  }

  getDocumentByOffset(offset) {
    const list = this.getCarouselDocumentList();
    const currentIndex = list.findIndex((document) => document.id === this.activeDocument.id);
    if (currentIndex < 0) {
      return null;
    }
    const nextIndex = currentIndex + offset;
    if (nextIndex < 0 || nextIndex >= list.length) {
      return null;
    }
    return list[nextIndex];
  }

  navigateActiveDocumentByOffset(offset) {
    const nextDocument = this.getDocumentByOffset(offset);
    if (!nextDocument) {
      return false;
    }
    this.setActiveDocument(nextDocument.id);
    return true;
  }

  handleDocumentKeyDown(event) {
    if (event?.key === "Escape") this.symbolTooltip?.hide();
    if (
      event?.defaultPrevented ||
      event?.altKey ||
      event?.ctrlKey ||
      event?.metaKey ||
      event?.target?.closest?.(".equation-mapping-index") ||
      isTextEntryTarget(event?.target)
    ) {
      return false;
    }
    const offsetByKey = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };
    const offset = offsetByKey[event?.key];
    if (!offset) {
      return false;
    }
    const didNavigate = this.navigateActiveDocumentByOffset(offset);
    if (didNavigate) {
      event.preventDefault?.();
    }
    return didNavigate;
  }

  setActiveOverlay(overlayId) {
    if (!this.activeDocument.overlays.some((overlay) => overlay.id === overlayId)) {
      return;
    }
    this.activeOverlayId = overlayId;
    this.persistSettings();
    this.render();
  }

  render() {
    this.symbolTooltip?.hide();
    this.symbolTooltip = null;
    this.anchorElements = new Map();
    this.overlayElements = new Map();
    this.root.textContent = "";
    this.root.append(this.renderShell());
    this.navigationRuntime?.update?.({ settings: { pressed: this.settingsOpen && !this.globalSearchOpen } });
    this.scheduleEquationLayout();
    if (this.revealSidebarSelection) {
      this.revealSidebarSelection = false;
      this.root.querySelector?.(".equation-mapping-index-groups .is-active")?.scrollIntoView?.({ block: "nearest" });
    }
    if (this.revealReferenceSelection) {
      this.revealReferenceSelection = false;
      this.root
        .querySelector?.(".equation-mapping-reference-body .equation-mapping-symbol-definition.is-active")
        ?.scrollIntoView?.({ block: "nearest" });
    }
  }

  renderShell() {
    const shell = createElement(this.document, "div", "equation-mapping-shell");
    shell.dataset.background = this.backgroundId;
    shell.dataset.indexCollapsed = this.indexCollapsed ? "true" : "false";
    shell.dataset.referenceCollapsed = this.referenceCollapsed ? "true" : "false";
    shell.dataset.equationScale = this.equationScale;
    shell.dataset.commentFontSize = this.commentFontSize;
    shell.style.setProperty("--equation-mapping-background", getCanvasColorById(this.backgroundId).color);
    shell.append(this.renderSubjectIndex(), this.renderCanvas(), this.renderReferenceRail());
    return shell;
  }

  renderSubjectIndex() {
    const index = createElement(this.document, "aside", "equation-mapping-index");
    index.setAttribute("aria-label", "Equations");
    const header = createElement(this.document, "div", "equation-mapping-index-header");
    const title = createElement(this.document, "strong", "", "Equations");
    const collapse = createElement(this.document, "button", "equation-mapping-icon-button equation-mapping-index-collapse");
    collapse.type = "button";
    collapse.title = this.indexCollapsed ? "Open equations" : "Collapse equations";
    collapse.setAttribute("aria-label", collapse.title);
    collapse.innerHTML = createPanelCollapseIconSvg(this.indexCollapsed);
    collapse.addEventListener("click", () => {
      this.indexCollapsed = !this.indexCollapsed;
      this.persistSettings();
      this.render();
    });
    const returnLink = this.renderReturnLink();
    if (returnLink) header.append(returnLink);
    header.append(title, collapse);
    const body = renderEquationSidebar({
      document: this.document,
      documents: this.getVisibleDocumentList(),
      state: this,
      renderItem: (entry, label) => this.renderIndexItem(entry, label),
      renderText: (tag, text) => createInlineMathTextElement(this.window, this.document, tag, "", text),
      onSelect: entry => {
        this.searchQuery = "";
        revealEquationInSidebar(this, entry, { all: true });
        this.setActiveDocument(entry.id);
      },
      onChange: () => this.persistSettings(),
    });
    // The equation search field lives in this body. A collapsed rail must not
    // present it, so hide the body from the accessibility tree and the focus
    // order rather than relying on a stylesheet rule alone.
    body.hidden = this.indexCollapsed;
    index.append(header, body);
    return index;
  }

  renderIndexItem(entry, label = entry.title) {
    const button = createElement(this.document, "button", "equation-mapping-index-item");
    button.type = "button";
    button.classList.toggle("is-active", entry.id === this.activeDocument.id);
    if (entry.id === this.activeDocument.id) button.setAttribute("aria-current", "true");
    button.append(createInlineMathTextElement(this.window, this.document, "span", "", label));
    button.addEventListener("click", () => this.setActiveDocument(entry.id));
    return button;
  }

  renderCanvas() {
    const canvas = createElement(this.document, "main", "equation-mapping-canvas");
    canvas.append(this.renderPanelLayer(), this.renderEquationCarousel(), this.renderStage());
    return canvas;
  }

  renderEquationCarousel() {
    const carousel = createElement(this.document, "nav", "equation-mapping-carousel");
    carousel.setAttribute("aria-label", "Equation navigation");
    carousel.hidden = !this.activeDocument.promoted;
    carousel.append(
      this.renderCarouselButton("previous", -1, "Previous equation"),
      this.renderCarouselButton("next", 1, "Next equation")
    );
    return carousel;
  }

  renderCarouselButton(iconName, offset, fallbackLabel) {
    const targetDocument = this.getDocumentByOffset(offset);
    const button = createElement(
      this.document,
      "button",
      `equation-mapping-carousel-button is-${iconName}`
    );
    button.type = "button";
    button.disabled = !targetDocument;
    const label = targetDocument ? `${fallbackLabel}: ${targetDocument.title}` : fallbackLabel;
    button.title = label;
    button.setAttribute("aria-label", label);
    button.innerHTML = createIconSvg(iconName);
    button.addEventListener("click", () => {
      this.navigateActiveDocumentByOffset(offset);
    });
    return button;
  }

  renderReturnLink() {
    const returnHref = resolveEquationMappingReturnHref(this.window?.location?.href);
    if (!returnHref) return null;
    const link = createElement(this.document, "a", "equation-mapping-icon-button equation-mapping-return-link");
    link.href = returnHref;
    link.title = "Return to page";
    link.setAttribute("aria-label", "Return to page");
    // The same left chevron as the scene shell's Go back control.
    link.innerHTML = createIconSvg("previous");
    return link;
  }

  // The canonical top control bar owns every top-right button on this page,
  // including Canvas settings. This layer only positions the panel that the
  // shared settings action opens, so the app never renders a second icon row.
  renderPanelLayer() {
    const layer = createElement(this.document, "div", "equation-mapping-panel-layer");
    const panelOpen = this.settingsOpen && !this.globalSearchOpen;
    layer.hidden = !panelOpen;
    if (panelOpen) {
      layer.append(this.renderSettingsPanel());
    }
    return layer;
  }

  renderSettingsPanel() {
    const panel = createElement(this.document, "section", "equation-mapping-popover equation-mapping-settings-panel");
    panel.id = SETTINGS_PANEL_ID;
    panel.setAttribute("aria-label", "Canvas settings");
    const colorRow = createElement(this.document, "div", "equation-mapping-settings-row");
    colorRow.append(createElement(this.document, "span", "equation-mapping-settings-label", "Background"));
    const swatches = createElement(this.document, "div", "equation-mapping-swatches");
    CANVAS_COLORS.forEach((entry) => {
      const button = createElement(this.document, "button", "equation-mapping-swatch");
      button.type = "button";
      button.title = entry.label;
      button.setAttribute("aria-label", entry.label);
      button.dataset.colorId = entry.id;
      button.classList.toggle("is-active", entry.id === this.backgroundId);
      button.style.background = entry.color;
      button.addEventListener("click", () => {
        this.backgroundId = entry.id;
        this.persistSettings();
        this.render();
      });
      swatches.append(button);
    });
    colorRow.append(swatches);
    panel.append(
      colorRow,
      this.renderSegmentedSetting("Equation", ["small", "medium", "large"], this.equationScale, (value) => {
        this.equationScale = normalizeEquationScale(value);
        this.persistSettings();
        this.render();
      }),
      this.renderSegmentedSetting("Comment size", ["small", "medium", "large"], this.commentFontSize, (value) => {
        this.commentFontSize = normalizeCommentFontSize(value);
        this.persistSettings();
        this.render();
      })
    );
    return panel;
  }

  renderSegmentedSetting(label, values, activeValue, onSelect) {
    const row = createElement(this.document, "div", "equation-mapping-settings-row");
    row.append(createElement(this.document, "span", "equation-mapping-settings-label", label));
    const group = createElement(this.document, "div", "equation-mapping-segmented");
    values.forEach((value) => {
      const button = createElement(this.document, "button", "equation-mapping-segment");
      button.type = "button";
      button.textContent = value;
      button.classList.toggle("is-active", value === activeValue);
      button.addEventListener("click", () => onSelect(value));
      group.append(button);
    });
    row.append(group);
    return row;
  }

  renderStage() {
    const stage = createElement(this.document, "section", "equation-mapping-stage");
    stage.setAttribute("aria-label", this.activeDocument.title);
    stage.dataset.documentId = this.activeDocument.id;
    stage.addEventListener("scroll", () => this.symbolTooltip?.reposition(), { passive: true });
    this.stageElement = stage;
    const pointerSvg = createSvgElement(this.document, "svg");
    pointerSvg.classList.add("equation-mapping-pointer-layer");
    pointerSvg.setAttribute("aria-hidden", "true");
    this.pointerSvg = pointerSvg;
    stage.append(
      pointerSvg,
      this.renderEquationTitle(),
      this.renderEquation(),
      this.renderOverlayLayer()
    );
    return stage;
  }

  // The title carries the title only. Symbols and source are reached from the
  // right rail's own control or by pressing a symbol beneath the equation, so
  // no control sits beside the title pushing it off centre.
  renderEquationTitle() {
    const title = createElement(this.document, "div", "equation-mapping-equation-title");
    this.equationTitleElement = title;
    title.append(createElement(this.document, "strong", "", this.activeDocument.title));
    return title;
  }

  renderSymbolStrip() {
    const strip = createElement(this.document, "div", "equation-mapping-symbol-strip");
    this.symbolStripElement = strip;
    strip.setAttribute("aria-label", "Equation symbols");
    if (this.activeDocument.symbols.length === 0) {
      strip.append(createElement(this.document, "span", "equation-mapping-symbol-empty", "No variable symbols"));
      return strip;
    }
    this.symbolTooltip = createEquationMappingSymbolTooltip({
      document: this.document,
      strip,
      renderText: (parent, text) => appendInlineMathText(this.window, this.document, parent, text),
    });
    this.activeDocument.symbols.forEach((symbol) => {
      const button = createElement(this.document, "button", "equation-mapping-symbol-chip");
      button.type = "button";
      button.setAttribute("aria-label", symbol.tex);
      button.classList.toggle("is-active", symbol.id === this.activeSymbolId && !this.referenceCollapsed);
      renderMath(this.window, button, symbol.tex, { displayMode: false });
      this.symbolTooltip.bind(button, symbol.definition);
      button.addEventListener("click", () => {
        this.activeSymbolId = symbol.id;
        this.referenceCollapsed = false;
        this.revealReferenceSelection = true;
        this.persistSettings();
        this.render();
      });
      strip.append(button);
    });
    return strip;
  }

  renderReferenceRail() {
    const rail = createElement(this.document, "aside", "equation-mapping-reference");
    rail.setAttribute("aria-label", "Equation symbols and source context");
    const header = createElement(this.document, "div", "equation-mapping-reference-header");
    const collapse = createElement(this.document, "button", "equation-mapping-icon-button equation-mapping-reference-collapse");
    collapse.type = "button";
    collapse.title = this.referenceCollapsed ? "Open symbols and source" : "Collapse symbols and source";
    collapse.setAttribute("aria-label", collapse.title);
    collapse.setAttribute("aria-expanded", String(!this.referenceCollapsed));
    collapse.innerHTML = createPanelCollapseIconSvg(this.referenceCollapsed);
    collapse.addEventListener("click", () => {
      this.referenceCollapsed = !this.referenceCollapsed;
      this.persistSettings();
      this.render();
    });
    // The collapse control leads on this side so it stays adjacent to the
    // canvas edge, mirroring the equations rail whose control sits on its own
    // canvas-facing edge.
    header.append(collapse, createElement(this.document, "strong", "", "Symbols & source"));
    const body = createElement(this.document, "div", "equation-mapping-reference-body");
    body.hidden = this.referenceCollapsed;
    this.referenceBodyElement = body;
    rail.append(header, body);
    body.append(this.renderReferenceSections());
    return rail;
  }

  renderReferenceSections() {
    const panel = createElement(this.document, "div", "equation-mapping-reference-sections");
    const source = this.activeDocument.source;
    const sourceSection = createElement(this.document, "section", "equation-mapping-reference-section");
    sourceSection.append(createElement(this.document, "h2", "", "Source context"));
    const sourceLink = createElement(this.document, "a", "equation-mapping-source-link", source.sourceHeading || "Open source");
    sourceLink.href = source.sourceHref || source.sourcePath;
    sourceSection.append(sourceLink);
    sourceSection.append(createElement(
      this.document,
      "p",
      "equation-mapping-source-path",
      [source.sourcePath, source.startLine ? `lines ${source.startLine}–${source.endLine ?? source.startLine}` : ""]
        .filter(Boolean)
        .join(" · ")
    ));
    if (source.contextBefore) {
      sourceSection.append(createInlineMathTextElement(
        this.window,
        this.document,
        "p",
        "equation-mapping-source-excerpt",
        source.contextBefore
      ));
    }
    if (source.contextAfter) {
      sourceSection.append(createInlineMathTextElement(
        this.window,
        this.document,
        "p",
        "equation-mapping-source-excerpt",
        source.contextAfter
      ));
    }

    const symbolsSection = createElement(this.document, "section", "equation-mapping-reference-section");
    symbolsSection.append(createElement(this.document, "h2", "", "Symbol definitions"));
    if (this.activeDocument.symbols.length === 0) {
      symbolsSection.append(createElement(
        this.document,
        "p",
        "equation-mapping-empty",
        "This equation contains no variable symbols requiring definitions."
      ));
    }
    this.activeDocument.symbols.forEach((symbol) => {
      const item = createElement(this.document, "article", "equation-mapping-symbol-definition");
      item.classList.toggle("is-active", symbol.id === this.activeSymbolId);
      const symbolElement = createElement(this.document, "strong", "equation-mapping-symbol-definition-tex");
      renderMath(this.window, symbolElement, symbol.tex, { displayMode: false });
      item.append(
        symbolElement,
        createInlineMathTextElement(this.window, this.document, "p", "", symbol.definition)
      );
      const definitionBasis = symbol.definitionSource === "source-context"
        ? "local source context"
        : "shared corpus notation";
      item.append(createElement(
        this.document,
        "small",
        "",
        [symbol.scope ? `Scope: ${symbol.scope}` : "", `Definition basis: ${definitionBasis}`].filter(Boolean).join(" · ")
      ));
      symbolsSection.append(item);
    });

    panel.append(sourceSection, symbolsSection);
    return panel;
  }

  renderEquation() {
    const document = this.activeDocument;
    const equationShell = createElement(this.document, "div", "equation-mapping-equation-shell");
    const equation = createElement(this.document, "div", "equation-mapping-equation");
    this.equationShellElement = equationShell;
    this.equationElement = equation;
    equation.setAttribute("role", "img");
    equation.setAttribute("aria-label", document.formulaTeX);
    const placementByOverlayId = resolveCalloutPlacements(document);
    const targetPlacementByAnchor = new Map(
      document.overlays.map((overlay) => [
        overlay.targetAnchorId,
        isCoordinateEffectiveSideCallout(document, overlay)
          ? "side-left"
          : placementByOverlayId.get(overlay.id) ?? DEFAULT_SECTION_LINE_PLACEMENT,
      ])
    );
    const targetToneByAnchor = new Map(
      document.overlays.map((overlay) => [overlay.targetAnchorId, overlay.tone ?? "standard"])
    );
    document.formulaParts.forEach((part) => {
      if (part.kind === "break") {
        const breakElement = createElement(this.document, "span", "equation-mapping-formula-break");
        breakElement.dataset.partId = part.id;
        equation.append(breakElement);
        return;
      }
      const partElement = createElement(
        this.document,
        "span",
        part.kind === "text" ? "equation-mapping-formula-text" : "equation-mapping-formula-part"
      );
      if (part.anchorId) {
        partElement.dataset.anchorId = part.anchorId;
        if (part.sectionMarker) {
          partElement.dataset.sectionMarkerLeft = String(part.sectionMarker.left);
          partElement.dataset.sectionMarkerWidth = String(part.sectionMarker.width);
          partElement.style.setProperty("--section-marker-left", `${part.sectionMarker.left}%`);
          partElement.style.setProperty("--section-marker-right", "auto");
          partElement.style.setProperty("--section-marker-width", `${part.sectionMarker.width}%`);
        }
        this.anchorElements.set(part.anchorId, partElement);
        if (targetPlacementByAnchor.has(part.anchorId)) {
          partElement.classList.add("is-targeted");
          partElement.dataset.sectionLine = targetPlacementByAnchor.get(part.anchorId);
          partElement.dataset.sectionTone = targetToneByAnchor.get(part.anchorId) ?? "standard";
        }
      }
      if (part.kind === "text") {
        partElement.textContent = part.text;
      } else {
        renderMath(this.window, partElement, part.tex);
      }
      equation.append(partElement);
    });
    equationShell.append(equation, this.renderSymbolStrip());
    return equationShell;
  }

  renderOverlayLayer() {
    const layer = createElement(this.document, "div", "equation-mapping-overlay-layer");
    this.activeDocument.overlays.forEach((overlay) => {
      const comment = createElement(this.document, "article", "equation-mapping-comment");
      comment.dataset.overlayId = overlay.id;
      comment.dataset.tone = overlay.tone ?? "standard";
      comment.classList.toggle("is-active", overlay.id === this.activeOverlay?.id);
      comment.style.setProperty("--overlay-x", String(overlay.position.x));
      comment.style.setProperty("--overlay-y", String(overlay.position.y));
      comment.style.setProperty("--overlay-width", String(overlay.position.width));
      if (Number.isFinite(overlay.position.maxWidth)) {
        comment.style.setProperty("--overlay-max-width", `${overlay.position.maxWidth}px`);
      }
      const header = createElement(this.document, "header", "equation-mapping-comment-header");
      header.append(createElement(this.document, "strong", "", overlay.title));
      const body = createElement(this.document, "div", "equation-mapping-comment-body");
      const mathBlocks = overlay.content.filter((block) => block.type === "math");
      mathBlocks.forEach((block) => {
        const mathElement = createElement(this.document, "span", "equation-mapping-comment-math equation-mapping-comment-target");
        renderMath(this.window, mathElement, block.tex, { displayMode: false });
        header.append(mathElement);
      });
      overlay.content.forEach((block) => {
        if (block.type === "text") {
          body.append(createInlineMathTextElement(this.window, this.document, "p", "", block.text));
        }
      });
      comment.append(header, body);
      comment.addEventListener("click", () => this.setActiveOverlay(overlay.id));
      this.overlayElements.set(overlay.id, comment);
      layer.append(comment);
    });
    return layer;
  }

  // The equation title sits in the same band as the top control strip, so its
  // right inset must clear whatever that strip currently occupies. Measure the
  // strip rather than restating its width here: it gains and loses controls,
  // and a hard-coded inset silently starts overlapping the title when it grows.
  applyControlStripClearance() {
    const shell = this.root?.querySelector?.(".equation-mapping-shell");
    const bar = this.document?.getElementById?.("scene-hud-tools");
    if (!shell || !bar) {
      return;
    }
    const barRect = bar.getBoundingClientRect?.();
    const viewportWidth = this.window?.innerWidth ?? 0;
    if (!barRect?.width || !viewportWidth) {
      return;
    }
    const clearance = Math.max(0, Math.ceil(viewportWidth - barRect.left) + CONTROL_STRIP_TITLE_GAP_PX);
    shell.style.setProperty("--control-strip-clearance", `${clearance}px`);
  }

  scheduleEquationLayout() {
    const run = () => {
      const scrollTop = this.stageElement?.scrollTop ?? 0;
      if (this.stageElement) this.stageElement.scrollTop = 0;
      this.applyControlStripClearance();
      this.resetEquationVerticalLayout();
      this.applyEquationAutoFit();
      this.symbolTooltipClearance = this.activeDocument.overlays.length && this.symbolTooltip
        ? this.symbolTooltip.measureMaxHeight() + SYMBOL_TOOLTIP_GAP_PX + SYMBOL_TOOLTIP_CALLOUT_GAP_PX
        : 0;
      this.stageElement?.style?.setProperty("--symbol-tooltip-clearance", `${this.symbolTooltipClearance}px`);
      this.applyCalloutLayout();
      this.applyEquationVerticalClearance();
      this.updatePointerLines();
      this.updateEquationScrollExtent();
      if (this.stageElement) this.stageElement.scrollTop = scrollTop;
    };
    if (typeof this.window?.requestAnimationFrame === "function") {
      this.window.requestAnimationFrame(run);
      return;
    }
    run();
  }

  applyEquationAutoFit() {
    const equation = this.equationElement;
    const shell = this.equationShellElement;
    if (!equation || !shell) {
      return null;
    }
    equation.style.removeProperty("--equation-fit-font-size");
    equation.dataset.fitMode = "measuring";
    equation.style.flexWrap = "nowrap";
    const shouldPreserveFormulaBreaks = hasExplicitFormulaBreak(equation);
    const computedStyle = this.window?.getComputedStyle?.(equation);
    const baseFontSize = Number.parseFloat(computedStyle?.fontSize ?? "");
    const shellRect = shell.getBoundingClientRect();
    const availableWidth = shell.clientWidth || shellRect.width;
    const fits = measureEquationNaturalRows(equation, this.window).map((row) => calculateEquationAutoFit({
      availableWidth,
      ...row,
      baseFontSize,
      minFontSize:
        EQUATION_AUTO_FIT_MIN_FONT_SIZE[this.equationScale] ?? EQUATION_AUTO_FIT_MIN_FONT_SIZE.medium,
    }));
    const fit = fits.reduce((smallest, candidate) =>
      candidate.fontSize < smallest.fontSize
        || (candidate.fontSize === smallest.fontSize && candidate.shouldWrap)
        ? candidate : smallest
    );
    if (fit.mode === "unmeasured") {
      equation.style.removeProperty("--equation-fit-font-size");
      if (shouldPreserveFormulaBreaks) {
        equation.style.flexWrap = "wrap";
      } else {
        equation.style.removeProperty("flex-wrap");
      }
      equation.dataset.fitMode = "unmeasured";
      return fit;
    }
    if (fit.fontSize < baseFontSize) {
      const fittedFontSize = Math.floor(fit.fontSize * 100) / 100;
      equation.style.setProperty("--equation-fit-font-size", `${fittedFontSize.toFixed(2)}px`);
    }
    equation.style.flexWrap = fit.shouldWrap || shouldPreserveFormulaBreaks ? "wrap" : "nowrap";
    equation.dataset.fitMode = fit.mode;
    return fit;
  }

  resetEquationVerticalLayout() {
    this.equationShellElement?.style?.removeProperty?.("--equation-layout-y");
  }

  measureEquationLineClearance(stageRect) {
    const equation = this.equationElement;
    if (!equation) {
      return CALLOUT_LAYOUT_EQUATION_GAP_PX;
    }
    const computedStyle = this.window?.getComputedStyle?.(equation);
    const lineHeight = Number.parseFloat(computedStyle?.lineHeight ?? "");
    const fontSize = Number.parseFloat(computedStyle?.fontSize ?? "");
    const fallbackPx = Number.isFinite(lineHeight)
      ? lineHeight
      : Number.isFinite(fontSize)
        ? fontSize * 1.25
        : CALLOUT_LAYOUT_EQUATION_GAP_PX;
    return resolveEquationLineClearancePx(
      measureEquationRowRects(equation, stageRect),
      fallbackPx
    );
  }

  applyCalloutLayout() {
    if (!this.stageElement || !this.equationElement) {
      return [];
    }
    const stageRect = this.stageElement.getBoundingClientRect();
    const equationRect = getLocalRect(this.equationElement.getBoundingClientRect(), stageRect);
    const equationGapPx = this.measureEquationLineClearance(stageRect);
    const symbolStripRect = this.symbolStripElement
      ? getLocalRect(this.symbolStripElement.getBoundingClientRect(), stageRect)
      : null;
    const minBelowY = symbolStripRect && this.symbolTooltipClearance
      ? symbolStripRect.bottom + this.symbolTooltipClearance
      : equationRect.bottom;
    const titleRect = this.equationTitleElement
      ? getLocalRect(this.equationTitleElement.getBoundingClientRect(), stageRect)
      : null;
    const carouselElement = this.root?.querySelector?.(".equation-mapping-carousel") ?? null;
    const carouselRect = carouselElement
      ? getLocalRect(carouselElement.getBoundingClientRect(), stageRect)
      : null;
    const itemsByPlacement = new Map([
      ["above", []],
      ["below", []],
    ]);
    const sideItems = [];
    const placementByOverlayId = resolveCalloutPlacements(this.activeDocument);
    this.activeDocument.overlays.forEach((overlay) => {
      const anchorElement = this.anchorElements.get(overlay.targetAnchorId);
      const commentElement = this.overlayElements.get(overlay.id);
      if (!anchorElement || !commentElement) {
        return;
      }
      const computedStyle = this.window?.getComputedStyle?.(commentElement);
      if (computedStyle?.position && computedStyle.position !== "absolute") {
        commentElement.style.removeProperty("--overlay-layout-x");
        commentElement.style.removeProperty("--overlay-layout-y");
        return;
      }
      const commentRect = commentElement.getBoundingClientRect();
      const targetRect = getLocalRect(anchorElement.getBoundingClientRect(), stageRect);
      if (isCoordinateEffectiveSideCallout(this.activeDocument, overlay)) {
        sideItems.push({
          id: overlay.id,
          element: commentElement,
          commentRect: getLocalRect(commentRect, stageRect),
          targetRect,
        });
        return;
      }
      const placement = placementByOverlayId.get(overlay.id) ?? DEFAULT_SECTION_LINE_PLACEMENT;
      const items = itemsByPlacement.get(placement);
      if (!items) {
        return;
      }
      items.push({
        id: overlay.id,
        element: commentElement,
        width: commentRect.width,
        height: commentRect.height,
        commentRect: getLocalRect(commentRect, stageRect),
        targetCenterX: targetRect.left + targetRect.width / 2,
      });
    });

    const placements = [];
    itemsByPlacement.forEach((items, placement) => {
      const layout = resolveCalloutRowLayout({
        stageWidth: stageRect.width,
        stageHeight: stageRect.height,
        equationRect,
        titleRect,
        items,
        placement,
        equationGapPx,
        minBelowY,
      });
      items.forEach((item) => {
        let position = layout.get(item.id);
        if (!position) {
          return;
        }
        if (placement === "below") {
          position = resolveCarouselClearanceCalloutPosition({
            position,
            commentRect: item.commentRect,
            carouselRect,
            minY: minBelowY,
          });
        }
        item.element.style.setProperty("--overlay-layout-x", `${position.x.toFixed(1)}px`);
        item.element.style.setProperty("--overlay-layout-y", `${position.y.toFixed(1)}px`);
        placements.push({ id: item.id, placement, ...position });
      });
    });
    sideItems.forEach((item) => {
      const position = resolveSideCalloutPosition({
        stageWidth: stageRect.width,
        stageHeight: stageRect.height,
        targetRect: item.targetRect,
        commentRect: item.commentRect,
      });
      if (!position) {
        return;
      }
      item.element.style.setProperty("--overlay-layout-x", `${position.x.toFixed(1)}px`);
      item.element.style.setProperty("--overlay-layout-y", `${position.y.toFixed(1)}px`);
      placements.push({ id: item.id, placement: "side-left", ...position });
    });
    return placements;
  }

  updateEquationScrollExtent() {
    if (!this.stageElement) return;
    const stageRect = this.stageElement.getBoundingClientRect();
    const bottom = Math.max(this.equationShellElement?.getBoundingClientRect().bottom ?? stageRect.top, ...[...this.overlayElements.values()].map(element => element.getBoundingClientRect().bottom));
    // Leave room to scroll the last explainer above the fixed carousel.
    const carousel = this.root?.querySelector?.(".equation-mapping-carousel");
    const footerHeight = carousel?.getBoundingClientRect().height ?? 0;
    const contentHeight = Math.max(stageRect.height - 1, bottom - stageRect.top + footerHeight + CALLOUT_LAYOUT_MARGIN_PX);
    this.stageElement.style.setProperty("--equation-content-height", `${contentHeight}px`);
  }

  applyEquationVerticalClearance() {
    if (!this.stageElement || !this.equationShellElement || !this.equationElement) {
      return null;
    }
    if (this.window?.getComputedStyle?.(this.equationShellElement)?.position === "static") {
      return { shiftPx: 0 };
    }
    const stageRect = this.stageElement.getBoundingClientRect();
    const equationShellRect = getLocalRect(
      this.equationShellElement.getBoundingClientRect(),
      stageRect
    );
    const rowRects = measureEquationRowRects(this.equationElement, stageRect);
    const aboveCalloutRects = [];
    const belowCalloutRects = [];
    const placementByOverlayId = resolveCalloutPlacements(this.activeDocument);
    this.activeDocument.overlays.forEach((overlay) => {
      if (isCoordinateEffectiveSideCallout(this.activeDocument, overlay)) return;
      const commentElement = this.overlayElements.get(overlay.id);
      if (!commentElement) {
        return;
      }
      const rect = getLocalRect(commentElement.getBoundingClientRect(), stageRect);
      const placement = placementByOverlayId.get(overlay.id) ?? DEFAULT_SECTION_LINE_PLACEMENT;
      if (placement === "above") {
        aboveCalloutRects.push(rect);
      } else {
        belowCalloutRects.push(rect);
      }
    });
    const shiftPx = resolveEquationVerticalShift({
      stageHeight: stageRect.height,
      equationShellRect,
      rowRects,
      aboveCalloutRects,
      belowCalloutRects,
      minimumGapPx: this.measureEquationLineClearance(stageRect),
    });
    if (shiftPx <= 0) {
      return { shiftPx: 0 };
    }
    const nextCenterY = equationShellRect.top + equationShellRect.height / 2 + shiftPx;
    this.equationShellElement.style.setProperty(
      "--equation-layout-y",
      `${nextCenterY.toFixed(1)}px`
    );
    this.activeDocument.overlays.forEach((overlay) => {
      if (!isCoordinateEffectiveSideCallout(this.activeDocument, overlay) && placementByOverlayId.get(overlay.id) !== "below") {
        return;
      }
      const commentElement = this.overlayElements.get(overlay.id);
      const currentY = Number.parseFloat(
        commentElement?.style?.getPropertyValue?.("--overlay-layout-y") ?? ""
      );
      if (Number.isFinite(currentY)) {
        commentElement.style.setProperty("--overlay-layout-y", `${(currentY + shiftPx).toFixed(1)}px`);
      }
    });
    return { shiftPx, nextCenterY };
  }

  updatePointerLines() {
    if (!this.stageElement || !this.pointerSvg) {
      return [];
    }
    const stageRect = this.stageElement.getBoundingClientRect();
    this.pointerSvg.setAttribute("viewBox", `0 0 ${Math.max(stageRect.width, 1)} ${Math.max(stageRect.height, 1)}`);
    this.pointerSvg.textContent = "";
    this.pointerLines = [];
    const placementByOverlayId = resolveCalloutPlacements(this.activeDocument);
    this.activeDocument.overlays.forEach((overlay) => {
      const anchorElement = this.anchorElements.get(overlay.targetAnchorId);
      const commentElement = this.overlayElements.get(overlay.id);
      if (!anchorElement || !commentElement) {
        return;
      }
      const geometry = isCoordinateEffectiveSideCallout(this.activeDocument, overlay)
        ? createSidePointerLineGeometry(
            stageRect,
            anchorElement.getBoundingClientRect(),
            commentElement.getBoundingClientRect()
          )
        : createPointerLineGeometry(
            stageRect,
            getSectionMarkerTargetRect(anchorElement),
            commentElement.getBoundingClientRect(),
            placementByOverlayId.get(overlay.id) ?? DEFAULT_SECTION_LINE_PLACEMENT
          );
      const line = createSvgElement(this.document, "line");
      line.classList.add("equation-mapping-pointer-line");
      line.dataset.tone = overlay.tone ?? "standard";
      line.classList.toggle("is-active", overlay.id === this.activeOverlay?.id);
      line.setAttribute("x1", String(geometry.x1));
      line.setAttribute("y1", String(geometry.y1));
      line.setAttribute("x2", String(geometry.x2));
      line.setAttribute("y2", String(geometry.y2));
      this.pointerSvg.append(line);
      this.pointerLines.push({ overlayId: overlay.id, targetAnchorId: overlay.targetAnchorId, ...geometry });
    });
    return this.pointerLines;
  }
}

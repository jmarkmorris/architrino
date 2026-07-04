import {
  CANVAS_COLORS,
  DEFAULT_BACKGROUND_ID,
  DEFAULT_COMMENT_FONT_SIZE,
  DEFAULT_EQUATION_MAP_DOCUMENT_ID,
  DEFAULT_EQUATION_SCALE,
  DEFAULT_SECTION_LINE_PLACEMENT,
  createSeedEquationMapDocuments,
  filterEquationMapDocuments,
  getCanvasColorById,
  groupEquationMapDocumentsBySubject,
  normalizeBackgroundId,
  normalizeCommentFontSize,
  normalizeEquationMapDocument,
  normalizeEquationMapDocuments,
  normalizeEquationScale,
} from "./EquationMappingData.js";
import {
  createEditableEquationMapDocument,
  createEquationAnchor,
  createEquationOverlay,
  getFormulaPartTeXForAnchor,
  getOverlayContentDraft,
  updateEquationAnchor,
  updateEquationOverlay,
} from "./EquationMappingEditor.js";
import {
  navigateStandaloneAppHome,
  resolveStandaloneAppHomeHref,
} from "../navigator/StandaloneAppHomeRuntime.js";

const SETTINGS_STORAGE_KEY = "architrino.equationMapping.settings.v7";
const SIZE_CALIBRATION_VERSION = 3;
const DOCUMENTS_STORAGE_KEY = "architrino.equationMapping.documents.v1";
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
const COMMENT_CONNECTOR_INSET_PX = 18;
const CALLOUT_LAYOUT_MARGIN_PX = 32;
const CALLOUT_LAYOUT_EQUATION_GAP_PX = 28;
const CALLOUT_LAYOUT_ITEM_GAP_PX = 24;
const CALLOUT_LAYOUT_BAND_PADDING_PX = 150;
const CALLOUT_LAYOUT_TITLE_GAP_PX = 18;

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

function measureEquationNaturalWidth(equation) {
  const children = Array.from(equation?.children ?? []);
  if (!children.length) {
    return Number(equation?.scrollWidth) || 0;
  }
  let maxLineWidth = 0;
  let currentLineWidth = 0;
  let sawBreak = false;
  children.forEach((child) => {
    if (isFormulaBreakElement(child)) {
      sawBreak = true;
      maxLineWidth = Math.max(maxLineWidth, currentLineWidth);
      currentLineWidth = 0;
      return;
    }
    currentLineWidth += getMeasuredElementWidth(child);
  });
  maxLineWidth = Math.max(maxLineWidth, currentLineWidth);
  return sawBreak ? maxLineWidth : Number(equation?.scrollWidth) || maxLineWidth;
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
} = {}) {
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
      : clamp(unclampedY, equationRect.bottom, Math.max(equationRect.bottom, safeBottom - maxHeight));

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

export function calculateEquationAutoFit({
  availableWidth = 0,
  naturalWidth = 0,
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
  const fitFontSize = (width / natural) * base;
  if (fitFontSize >= minimum) {
    return { fontSize: fitFontSize, shouldWrap: false, mode: "scaled" };
  }
  const minimumWidth = (natural / base) * minimum;
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

export function createEquationMappingHomeHref(windowLike = globalThis.window) {
  return resolveStandaloneAppHomeHref(windowLike?.location?.href);
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

function createIconSvg(name) {
  switch (name) {
    case "home":
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5M5.5 10.5V20h5v-5h3v5h5v-9.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    case "search":
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><line x1="15.5" y1="15.5" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    case "settings":
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.2 2h-.4a2 2 0 0 0-2 2v.2a2 2 0 0 1-1 1.7l-.4.2a2 2 0 0 1-2 0l-.2-.1a2 2 0 0 0-2.7.7l-.2.4A2 2 0 0 0 4 9.8l.2.1a2 2 0 0 1 1 1.7v.6a2 2 0 0 1-1 1.7l-.2.1a2 2 0 0 0-.7 2.7l.2.4a2 2 0 0 0 2.7.7l.2-.1a2 2 0 0 1 2 0l.4.2a2 2 0 0 1 1 1.7v.4a2 2 0 0 0 2 2h.4a2 2 0 0 0 2-2v-.2a2 2 0 0 1 1-1.7l.4-.2a2 2 0 0 1 2 0l.2.1a2 2 0 0 0 2.7-.7l.2-.4a2 2 0 0 0-.7-2.7l-.2-.1a2 2 0 0 1-1-1.7v-.6a2 2 0 0 1 1-1.7l.2-.1a2 2 0 0 0 .7-2.7l-.2-.4a2 2 0 0 0-2.7-.7l-.2.1a2 2 0 0 1-2 0l-.4-.2a2 2 0 0 1-1-1.7V4a2 2 0 0 0-2-2Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
    case "edit":
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4.5L19 9.5 14.5 5 4 15.5V20Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="m13.5 6 4.5 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    case "collapse":
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6 9 12l6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    default:
      return "";
  }
}

function readSavedDocuments(windowLike) {
  try {
    const value = windowLike?.localStorage?.getItem?.(DOCUMENTS_STORAGE_KEY);
    return value ? normalizeEquationMapDocuments(JSON.parse(value)) : null;
  } catch {
    return null;
  }
}

function mergeSeedAndSavedDocuments(seedDocuments, savedDocuments) {
  if (!Array.isArray(savedDocuments) || savedDocuments.length === 0) {
    return seedDocuments;
  }
  const savedById = new Map(savedDocuments.map((document) => [document.id, document]));
  const mergedDocuments = seedDocuments.map((seedDocument) => savedById.get(seedDocument.id) ?? seedDocument);
  const seedIds = new Set(seedDocuments.map((document) => document.id));
  savedDocuments.forEach((document) => {
    if (!seedIds.has(document.id)) {
      mergedDocuments.push(document);
    }
  });
  return mergedDocuments;
}

function saveDocuments(windowLike, documents) {
  try {
    windowLike?.localStorage?.setItem?.(DOCUMENTS_STORAGE_KEY, JSON.stringify(documents));
  } catch {
    // Browser-local draft documents are optional for file and test contexts.
  }
}

function clearSavedDocuments(windowLike) {
  try {
    windowLike?.localStorage?.removeItem?.(DOCUMENTS_STORAGE_KEY);
  } catch {
    // Browser-local draft documents are optional for file and test contexts.
  }
}

export function mountEquationMappingApp(options = {}) {
  return new EquationMappingRuntime(options).init();
}

export class EquationMappingRuntime {
  constructor(options = {}) {
    this.document = options.document ?? globalThis.document;
    this.window = options.window ?? globalThis.window;
    const seedDocuments = createSeedEquationMapDocuments();
    const savedDocuments = options.documents == null ? readSavedDocuments(this.window) : null;
    this.documents = normalizeEquationMapDocuments(
      options.documents ?? mergeSeedAndSavedDocuments(seedDocuments, savedDocuments)
    );
    const savedSettings = readSavedSettings(this.window);
    this.activeDocumentId =
      options.initialDocumentId ??
      savedSettings.activeDocumentId ??
      this.documents.find((document) => document.id === DEFAULT_EQUATION_MAP_DOCUMENT_ID)?.id ??
      this.documents[0].id;
    this.activeOverlayId = savedSettings.activeOverlayId ?? this.activeDocument.overlays[0]?.id ?? "";
    this.activeAnchorId = savedSettings.activeAnchorId ?? this.activeDocument.anchors[0]?.id ?? "";
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
    this.indexCollapsed = Boolean(options.indexCollapsed ?? savedSettings.indexCollapsed ?? false);
    this.searchOpen = false;
    this.settingsOpen = false;
    this.editorOpen = false;
    this.searchQuery = "";
    this.anchorElements = new Map();
    this.overlayElements = new Map();
    this.pointerLines = [];
    this.equationShellElement = null;
    this.equationElement = null;
    this.equationTitleElement = null;
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
    this.handleResize = () => this.scheduleEquationLayout();
    this.window?.addEventListener?.("resize", this.handleResize);
    this.render();
    return this;
  }

  destroy() {
    this.window?.removeEventListener?.("resize", this.handleResize);
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
    });
  }

  persistDocuments() {
    saveDocuments(this.window, this.documents);
  }

  replaceActiveDocument(nextDocument, nextState = {}) {
    const currentIndex = Math.max(
      this.documents.findIndex((document) => document.id === this.activeDocument.id),
      0
    );
    const normalizedDocument = normalizeEquationMapDocument(nextDocument, currentIndex);
    this.documents = this.documents.map((document, index) => (index === currentIndex ? normalizedDocument : document));
    this.activeDocumentId = normalizedDocument.id;
    this.activeAnchorId =
      nextState.activeAnchorId && normalizedDocument.anchors.some((anchor) => anchor.id === nextState.activeAnchorId)
        ? nextState.activeAnchorId
        : normalizedDocument.anchors.find((anchor) => anchor.id === this.activeAnchorId)?.id ?? normalizedDocument.anchors[0]?.id ?? "";
    this.activeOverlayId =
      nextState.activeOverlayId && normalizedDocument.overlays.some((overlay) => overlay.id === nextState.activeOverlayId)
        ? nextState.activeOverlayId
        : normalizedDocument.overlays.find((overlay) => overlay.id === this.activeOverlayId)?.id ??
          normalizedDocument.overlays[0]?.id ??
          "";
    this.persistDocuments();
    this.persistSettings();
    this.render();
  }

  resetDocumentDrafts() {
    clearSavedDocuments(this.window);
    this.documents = createSeedEquationMapDocuments();
    this.activeDocumentId =
      this.documents.find((document) => document.id === DEFAULT_EQUATION_MAP_DOCUMENT_ID)?.id ?? this.documents[0].id;
    this.activeAnchorId = this.activeDocument.anchors[0]?.id ?? "";
    this.activeOverlayId = this.activeDocument.overlays[0]?.id ?? "";
    this.persistSettings();
    this.render();
  }

  setActiveDocument(documentId) {
    const nextDocument = this.documents.find((document) => document.id === documentId);
    if (!nextDocument) {
      return;
    }
    this.activeDocumentId = nextDocument.id;
    this.activeAnchorId = nextDocument.anchors[0]?.id ?? "";
    this.activeOverlayId = nextDocument.overlays[0]?.id ?? "";
    this.persistSettings();
    this.render();
  }

  setActiveOverlay(overlayId) {
    if (!this.activeDocument.overlays.some((overlay) => overlay.id === overlayId)) {
      return;
    }
    this.activeOverlayId = overlayId;
    this.persistSettings();
    this.render();
  }

  setActiveAnchor(anchorId) {
    if (!this.activeDocument.anchors.some((anchor) => anchor.id === anchorId)) {
      return;
    }
    this.activeAnchorId = anchorId;
    this.persistSettings();
    this.render();
  }

  addAnchor() {
    const nextDocument = createEquationAnchor(this.activeDocument);
    const activeAnchorId = nextDocument.anchors[nextDocument.anchors.length - 1]?.id ?? "";
    this.replaceActiveDocument(nextDocument, { activeAnchorId });
  }

  applyAnchorEdit(sectionElement) {
    const activeAnchor = this.activeAnchor;
    if (!activeAnchor) {
      return;
    }
    const nextDocument = updateEquationAnchor(this.activeDocument, activeAnchor.id, {
      label: sectionElement.querySelector('[name="anchor-label"]')?.value,
      searchText: sectionElement.querySelector('[name="anchor-search-text"]')?.value,
      tex: sectionElement.querySelector('[name="anchor-tex"]')?.value,
    });
    this.replaceActiveDocument(nextDocument, { activeAnchorId: activeAnchor.id });
  }

  addOverlay() {
    const nextDocument = createEquationOverlay(this.activeDocument, {
      targetAnchorId: this.activeAnchor?.id,
    });
    const activeOverlayId = nextDocument.overlays[nextDocument.overlays.length - 1]?.id ?? "";
    this.replaceActiveDocument(nextDocument, { activeOverlayId });
  }

  applyOverlayEdit(sectionElement) {
    const activeOverlay = this.activeOverlay;
    if (!activeOverlay) {
      return;
    }
    const nextDocument = updateEquationOverlay(this.activeDocument, activeOverlay.id, {
      title: sectionElement.querySelector('[name="overlay-title"]')?.value,
      targetAnchorId: sectionElement.querySelector('[name="overlay-target"]')?.value,
      sectionLinePlacement: sectionElement.querySelector('[name="overlay-line"]')?.value,
      text: sectionElement.querySelector('[name="overlay-text"]')?.value,
      mathTex: sectionElement.querySelector('[name="overlay-math"]')?.value,
      position: {
        x: sectionElement.querySelector('[name="overlay-x"]')?.value,
        y: sectionElement.querySelector('[name="overlay-y"]')?.value,
        width: sectionElement.querySelector('[name="overlay-width"]')?.value,
      },
    });
    this.replaceActiveDocument(nextDocument, {
      activeAnchorId: sectionElement.querySelector('[name="overlay-target"]')?.value,
      activeOverlayId: activeOverlay.id,
    });
  }

  render() {
    this.anchorElements = new Map();
    this.overlayElements = new Map();
    this.root.textContent = "";
    this.root.append(this.renderShell());
    this.scheduleEquationLayout();
  }

  renderShell() {
    const shell = createElement(this.document, "div", "equation-mapping-shell");
    shell.dataset.background = this.backgroundId;
    shell.dataset.indexCollapsed = this.indexCollapsed ? "true" : "false";
    shell.dataset.equationScale = this.equationScale;
    shell.dataset.commentFontSize = this.commentFontSize;
    shell.style.setProperty("--equation-mapping-background", getCanvasColorById(this.backgroundId).color);
    shell.append(this.renderSubjectIndex(), this.renderCanvas());
    return shell;
  }

  renderSubjectIndex() {
    const index = createElement(this.document, "aside", "equation-mapping-index");
    index.setAttribute("aria-label", "Equation subjects");
    const header = createElement(this.document, "div", "equation-mapping-index-header");
    const title = createElement(this.document, "strong", "", "Equations");
    const collapse = createElement(this.document, "button", "equation-mapping-icon-button equation-mapping-index-collapse");
    collapse.type = "button";
    collapse.title = this.indexCollapsed ? "Open subjects" : "Collapse subjects";
    collapse.setAttribute("aria-label", collapse.title);
    collapse.innerHTML = createIconSvg("collapse");
    collapse.addEventListener("click", () => {
      this.indexCollapsed = !this.indexCollapsed;
      this.persistSettings();
      this.render();
    });
    header.append(title, collapse);
    const groups = createElement(this.document, "div", "equation-mapping-index-groups");
    groupEquationMapDocumentsBySubject(this.documents).forEach(([subject, entries]) => {
      const group = createElement(this.document, "section", "equation-mapping-index-group");
      group.append(createElement(this.document, "h2", "", subject));
      entries.forEach((entry) => {
        const button = createElement(this.document, "button", "equation-mapping-index-item");
        button.type = "button";
        button.classList.toggle("is-active", entry.id === this.activeDocument.id);
        button.append(createElement(this.document, "span", "", entry.title));
        button.addEventListener("click", () => this.setActiveDocument(entry.id));
        group.append(button);
      });
      groups.append(group);
    });
    index.append(header, groups);
    return index;
  }

  renderCanvas() {
    const canvas = createElement(this.document, "main", "equation-mapping-canvas");
    canvas.append(this.renderControls(), this.renderStage());
    return canvas;
  }

  renderControls() {
    const controls = createElement(this.document, "div", "equation-mapping-controls");
    controls.append(
      this.renderIconButton("home", "Go to home", () => {
        navigateStandaloneAppHome(
          this.window?.location,
          createEquationMappingHomeHref(this.window),
          {
            windowLike: this.window,
          }
        );
      }),
      this.renderIconButton("search", "Search equations", () => {
        this.searchOpen = !this.searchOpen;
        this.settingsOpen = false;
        this.editorOpen = false;
        this.render();
      }, this.searchOpen),
      this.renderIconButton("edit", "Edit map", () => {
        this.editorOpen = !this.editorOpen;
        this.searchOpen = false;
        this.settingsOpen = false;
        this.render();
      }, this.editorOpen),
      this.renderIconButton("settings", "Canvas settings", () => {
        this.settingsOpen = !this.settingsOpen;
        this.searchOpen = false;
        this.editorOpen = false;
        this.render();
      }, this.settingsOpen)
    );
    if (this.searchOpen) {
      controls.append(this.renderSearchPanel());
    }
    if (this.editorOpen) {
      controls.append(this.renderEditorPanel());
    }
    if (this.settingsOpen) {
      controls.append(this.renderSettingsPanel());
    }
    return controls;
  }

  renderIconButton(iconName, label, onClick, active = false) {
    const button = createElement(this.document, "button", "equation-mapping-icon-button");
    button.type = "button";
    button.title = label;
    button.setAttribute("aria-label", label);
    button.setAttribute("aria-pressed", active ? "true" : "false");
    button.classList.toggle("is-active", active);
    button.innerHTML = createIconSvg(iconName);
    button.addEventListener("click", onClick);
    return button;
  }

  renderSearchPanel() {
    const panel = createElement(this.document, "section", "equation-mapping-popover equation-mapping-search-panel");
    panel.setAttribute("aria-label", "Search equations");
    const input = createElement(this.document, "input", "equation-mapping-search-input");
    input.type = "search";
    input.placeholder = "Search equations";
    input.value = this.searchQuery;
    input.addEventListener("input", () => {
      this.searchQuery = input.value;
      this.render();
    });
    const results = createElement(this.document, "div", "equation-mapping-search-results");
    filterEquationMapDocuments(this.documents, this.searchQuery).forEach((entry) => {
      const button = createElement(this.document, "button", "equation-mapping-search-result");
      button.type = "button";
      button.append(
        createElement(this.document, "strong", "", entry.title),
        createElement(this.document, "span", "", entry.subject)
      );
      button.addEventListener("click", () => {
        this.searchOpen = false;
        this.setActiveDocument(entry.id);
      });
      results.append(button);
    });
    if (!results.childElementCount) {
      results.append(createElement(this.document, "p", "equation-mapping-empty", "No equations found."));
    }
    panel.append(input, results);
    setTimeout(() => input.focus?.(), 0);
    return panel;
  }

  renderEditorPanel() {
    const panel = createElement(this.document, "section", "equation-mapping-popover equation-mapping-editor-panel");
    panel.setAttribute("aria-label", "Edit equation map");
    const header = createElement(this.document, "header", "equation-mapping-editor-panel-header");
    header.append(createElement(this.document, "strong", "", "Edit map"));
    const resetButton = this.renderEditorAction("Reset draft", () => this.resetDocumentDrafts(), "secondary");
    header.append(resetButton);
    panel.append(header, this.renderAnchorEditor(), this.renderOverlayEditor());
    return panel;
  }

  renderAnchorEditor() {
    const section = createElement(this.document, "section", "equation-mapping-editor-section");
    const header = createElement(this.document, "header", "equation-mapping-editor-section-header");
    header.append(createElement(this.document, "strong", "", "Formula sections"));
    header.append(this.renderEditorAction("Add section", () => this.addAnchor()));
    const activeAnchor = this.activeAnchor;
    const selector = this.renderEditorSelect(
      "Section",
      "anchor-select",
      activeAnchor?.id ?? "",
      this.activeDocument.anchors.map((anchor) => ({ value: anchor.id, label: anchor.label }))
    );
    selector.querySelector("select")?.addEventListener("change", (event) => this.setActiveAnchor(event.target.value));
    const fields = createElement(this.document, "div", "equation-mapping-editor-grid");
    fields.append(
      this.renderEditorInput("Label", "anchor-label", activeAnchor?.label ?? ""),
      this.renderEditorInput("Formula", "anchor-tex", getFormulaPartTeXForAnchor(this.activeDocument, activeAnchor?.id)),
      this.renderEditorInput("Search text", "anchor-search-text", activeAnchor?.searchText ?? "")
    );
    const actions = createElement(this.document, "div", "equation-mapping-editor-actions");
    actions.append(this.renderEditorAction("Apply section", () => this.applyAnchorEdit(section)));
    section.append(header, selector, fields, actions);
    return section;
  }

  renderOverlayEditor() {
    const section = createElement(this.document, "section", "equation-mapping-editor-section");
    const header = createElement(this.document, "header", "equation-mapping-editor-section-header");
    header.append(createElement(this.document, "strong", "", "Comments"));
    header.append(this.renderEditorAction("Add comment", () => this.addOverlay()));
    const activeOverlay = this.activeOverlay;
    const contentDraft = getOverlayContentDraft(activeOverlay ?? {});
    const selector = this.renderEditorSelect(
      "Comment",
      "overlay-select",
      activeOverlay?.id ?? "",
      this.activeDocument.overlays.map((overlay) => ({ value: overlay.id, label: overlay.title }))
    );
    selector.querySelector("select")?.addEventListener("change", (event) => this.setActiveOverlay(event.target.value));
    const fields = createElement(this.document, "div", "equation-mapping-editor-grid");
    fields.append(
      this.renderEditorInput("Title", "overlay-title", activeOverlay?.title ?? ""),
      this.renderEditorSelect(
        "Target",
        "overlay-target",
        activeOverlay?.targetAnchorId ?? "",
        this.activeDocument.anchors.map((anchor) => ({ value: anchor.id, label: anchor.label }))
      ),
      this.renderEditorSelect("Line", "overlay-line", activeOverlay?.sectionLinePlacement ?? DEFAULT_SECTION_LINE_PLACEMENT, [
        { value: "above", label: "above" },
        { value: "below", label: "below" },
      ]),
      this.renderEditorInput("Left", "overlay-x", activeOverlay?.position?.x ?? 18, "number"),
      this.renderEditorInput("Top", "overlay-y", activeOverlay?.position?.y ?? 32, "number"),
      this.renderEditorInput("Width", "overlay-width", activeOverlay?.position?.width ?? 26, "number"),
      this.renderEditorTextarea("Text", "overlay-text", contentDraft.text),
      this.renderEditorTextarea("Equation", "overlay-math", contentDraft.mathTex)
    );
    const actions = createElement(this.document, "div", "equation-mapping-editor-actions");
    actions.append(this.renderEditorAction("Apply comment", () => this.applyOverlayEdit(section)));
    section.append(header, selector, fields, actions);
    return section;
  }

  renderEditorInput(labelText, name, value, type = "text") {
    const label = createElement(this.document, "label", "equation-mapping-editor-field");
    label.append(createElement(this.document, "span", "", labelText));
    const input = createElement(this.document, "input", "equation-mapping-editor-input");
    input.name = name;
    input.type = type;
    input.value = String(value ?? "");
    if (type === "number") {
      input.step = "1";
    }
    label.append(input);
    return label;
  }

  renderEditorTextarea(labelText, name, value) {
    const label = createElement(this.document, "label", "equation-mapping-editor-field equation-mapping-editor-field-wide");
    label.append(createElement(this.document, "span", "", labelText));
    const textarea = createElement(this.document, "textarea", "equation-mapping-editor-textarea");
    textarea.name = name;
    textarea.rows = 3;
    textarea.value = String(value ?? "");
    label.append(textarea);
    return label;
  }

  renderEditorSelect(labelText, name, value, options) {
    const label = createElement(this.document, "label", "equation-mapping-editor-field");
    label.append(createElement(this.document, "span", "", labelText));
    const select = createElement(this.document, "select", "equation-mapping-editor-select");
    select.name = name;
    options.forEach((option) => {
      const element = createElement(this.document, "option", "", option.label);
      element.value = option.value;
      element.selected = option.value === value;
      select.append(element);
    });
    label.append(select);
    return label;
  }

  renderEditorAction(label, onClick, tone = "primary") {
    const button = createElement(this.document, "button", `equation-mapping-editor-action is-${tone}`, label);
    button.type = "button";
    button.addEventListener("click", onClick);
    return button;
  }

  renderSettingsPanel() {
    const panel = createElement(this.document, "section", "equation-mapping-popover equation-mapping-settings-panel");
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
    this.stageElement = stage;
    const pointerSvg = createSvgElement(this.document, "svg");
    pointerSvg.classList.add("equation-mapping-pointer-layer");
    pointerSvg.setAttribute("aria-hidden", "true");
    this.pointerSvg = pointerSvg;
    stage.append(pointerSvg, this.renderEquationTitle(), this.renderEquation(), this.renderOverlayLayer());
    return stage;
  }

  renderEquationTitle() {
    const title = createElement(this.document, "div", "equation-mapping-equation-title");
    this.equationTitleElement = title;
    title.append(createElement(this.document, "strong", "", this.activeDocument.title));
    return title;
  }

  renderEquation() {
    const document = this.activeDocument;
    const equationShell = createElement(this.document, "div", "equation-mapping-equation-shell");
    const equation = createElement(this.document, "div", "equation-mapping-equation");
    this.equationShellElement = equationShell;
    this.equationElement = equation;
    equation.setAttribute("role", "img");
    equation.setAttribute("aria-label", document.formulaTeX);
    const activeTargetId = this.activeOverlay?.targetAnchorId ?? "";
    const targetPlacementByAnchor = new Map(
      document.overlays.map((overlay) => [
        overlay.targetAnchorId,
        overlay.sectionLinePlacement ?? DEFAULT_SECTION_LINE_PLACEMENT,
      ])
    );
    document.formulaParts.forEach((part) => {
      if (part.kind === "break") {
        equation.append(createElement(this.document, "span", "equation-mapping-formula-break"));
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
        }
        if (part.anchorId === activeTargetId) {
          partElement.classList.add("is-active-target");
        }
        if (part.anchorId === this.activeAnchor?.id) {
          partElement.classList.add("is-editor-selected-anchor");
        }
      }
      if (part.kind === "text") {
        partElement.textContent = part.text;
      } else {
        renderMath(this.window, partElement, part.tex);
      }
      equation.append(partElement);
    });
    equationShell.append(equation);
    return equationShell;
  }

  renderOverlayLayer() {
    const layer = createElement(this.document, "div", "equation-mapping-overlay-layer");
    this.activeDocument.overlays.forEach((overlay) => {
      const comment = createElement(this.document, "article", "equation-mapping-comment");
      comment.dataset.overlayId = overlay.id;
      comment.classList.toggle("is-active", overlay.id === this.activeOverlay?.id);
      comment.style.setProperty("--overlay-x", String(overlay.position.x));
      comment.style.setProperty("--overlay-y", String(overlay.position.y));
      comment.style.setProperty("--overlay-width", String(overlay.position.width));
      const header = createElement(this.document, "header", "equation-mapping-comment-header");
      header.append(createElement(this.document, "strong", "", overlay.title));
      const body = createElement(this.document, "div", "equation-mapping-comment-body");
      overlay.content.forEach((block) => {
        if (block.type === "math") {
          const mathElement = createElement(this.document, block.displayMode ? "div" : "span", "equation-mapping-comment-math");
          renderMath(this.window, mathElement, block.tex, { displayMode: block.displayMode });
          body.append(mathElement);
        } else {
          body.append(createElement(this.document, "p", "", block.text));
        }
      });
      comment.append(header, body);
      comment.addEventListener("click", () => this.setActiveOverlay(overlay.id));
      this.overlayElements.set(overlay.id, comment);
      layer.append(comment);
    });
    return layer;
  }

  scheduleEquationLayout() {
    const run = () => {
      this.resetEquationVerticalLayout();
      this.applyEquationAutoFit();
      this.applyCalloutLayout();
      this.applyEquationVerticalClearance();
      this.updatePointerLines();
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
    const naturalWidth = measureEquationNaturalWidth(equation);
    const fit = calculateEquationAutoFit({
      availableWidth,
      naturalWidth,
      baseFontSize,
      minFontSize:
        EQUATION_AUTO_FIT_MIN_FONT_SIZE[this.equationScale] ?? EQUATION_AUTO_FIT_MIN_FONT_SIZE.medium,
    });
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
      equation.style.setProperty("--equation-fit-font-size", `${fit.fontSize.toFixed(2)}px`);
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
    const titleRect = this.equationTitleElement
      ? getLocalRect(this.equationTitleElement.getBoundingClientRect(), stageRect)
      : null;
    const itemsByPlacement = new Map([
      ["above", []],
      ["below", []],
    ]);
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
      const placement = overlay.sectionLinePlacement ?? DEFAULT_SECTION_LINE_PLACEMENT;
      const items = itemsByPlacement.get(placement);
      if (!items) {
        return;
      }
      items.push({
        id: overlay.id,
        element: commentElement,
        width: commentRect.width,
        height: commentRect.height,
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
      });
      items.forEach((item) => {
        const position = layout.get(item.id);
        if (!position) {
          return;
        }
        item.element.style.setProperty("--overlay-layout-x", `${position.x.toFixed(1)}px`);
        item.element.style.setProperty("--overlay-layout-y", `${position.y.toFixed(1)}px`);
        placements.push({ id: item.id, placement, ...position });
      });
    });
    return placements;
  }

  applyEquationVerticalClearance() {
    if (!this.stageElement || !this.equationShellElement || !this.equationElement) {
      return null;
    }
    const stageRect = this.stageElement.getBoundingClientRect();
    const equationShellRect = getLocalRect(
      this.equationShellElement.getBoundingClientRect(),
      stageRect
    );
    const rowRects = measureEquationRowRects(this.equationElement, stageRect);
    const aboveCalloutRects = [];
    const belowCalloutRects = [];
    this.activeDocument.overlays.forEach((overlay) => {
      const commentElement = this.overlayElements.get(overlay.id);
      if (!commentElement) {
        return;
      }
      const rect = getLocalRect(commentElement.getBoundingClientRect(), stageRect);
      const placement = overlay.sectionLinePlacement ?? DEFAULT_SECTION_LINE_PLACEMENT;
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
    });
    if (shiftPx <= 0) {
      return { shiftPx: 0 };
    }
    const nextCenterY = equationShellRect.top + equationShellRect.height / 2 + shiftPx;
    this.equationShellElement.style.setProperty(
      "--equation-layout-y",
      `${nextCenterY.toFixed(1)}px`
    );
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
    this.activeDocument.overlays.forEach((overlay) => {
      const anchorElement = this.anchorElements.get(overlay.targetAnchorId);
      const commentElement = this.overlayElements.get(overlay.id);
      if (!anchorElement || !commentElement) {
        return;
      }
      const geometry = createPointerLineGeometry(
        stageRect,
        getSectionMarkerTargetRect(anchorElement),
        commentElement.getBoundingClientRect(),
        overlay.sectionLinePlacement ?? DEFAULT_SECTION_LINE_PLACEMENT
      );
      const line = createSvgElement(this.document, "line");
      line.classList.add("equation-mapping-pointer-line");
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

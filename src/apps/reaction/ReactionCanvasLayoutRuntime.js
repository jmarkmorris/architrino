import {
  isReactionStructureCompositeGridRenderMode,
  isReactionStructureInlineAnchorRenderMode,
} from "./ReactionStructureDescriptorRuntime.js";

export const REACTION_CANVAS_LAYOUT = Object.freeze({
  addButtonSizePx: 32,
  attachmentGapPx: 3,
  anchorSizePx: 16,
  binaryChoiceSizePx: 72,
  compositeNodeSizePx: Math.round(16 * 0.35),
  compositeParticipantGapPx: 0,
  contentStackGapPx: 10,
  operatorGraphicConnectionStepPx: 79,
  operatorTileCount: 4,
  surfaceColumnGapPx: 72 / 16,
  routeAnchorGapPx: 0.25,
  tileGapPx: 7,
  topControlRowHeightPx: 38,
  operatorLaneEdgePaddingPx: 18,
  operatorSlotEdgePaddingPx: 18,
  operatorSlotStepPx: 108,
});

export const REACTION_CANVAS_SURFACE_COLUMN_COUNT = 16;
export const REACTION_CANVAS_SURFACE_COLUMN_GROUP_COUNT = 5;
export const REACTION_CANVAS_SURFACE_ROW_COUNT = 11;
export const REACTION_CANVAS_SURFACE_COLUMN_GROUP_LAYOUT = Object.freeze([
  Object.freeze({
    side: "reactant",
    operatorLaneIndex: null,
    start: 1,
    span: 4,
  }),
  Object.freeze({
    side: "operator",
    operatorLaneIndex: 0,
    start: 4,
    span: 4,
  }),
  Object.freeze({
    side: "center",
    operatorLaneIndex: null,
    start: 7,
    span: 4,
  }),
  Object.freeze({
    side: "operator",
    operatorLaneIndex: 1,
    start: 10,
    span: 4,
  }),
  Object.freeze({
    side: "product",
    operatorLaneIndex: null,
    start: 13,
    span: 4,
  }),
]);

export const REACTION_CANVAS_OPERATOR_LANE_WIDTH_PX =
  REACTION_CANVAS_LAYOUT.binaryChoiceSizePx * REACTION_CANVAS_LAYOUT.operatorTileCount +
  REACTION_CANVAS_LAYOUT.tileGapPx * (REACTION_CANVAS_LAYOUT.operatorTileCount - 1);
export const REACTION_CANVAS_COMPOSITE_CONNECTOR_SPAN_PX = REACTION_CANVAS_LAYOUT.tileGapPx;
export const REACTION_CANVAS_COMPOSITE_NODE_INSET_PX = Math.max(
  0,
  (REACTION_CANVAS_COMPOSITE_CONNECTOR_SPAN_PX - REACTION_CANVAS_LAYOUT.compositeNodeSizePx) / 2
);
export const REACTION_CANVAS_COMPOSITE_NODE_CENTER_PX =
  REACTION_CANVAS_LAYOUT.compositeNodeSizePx / 2;
export const REACTION_CANVAS_ANCHOR_CENTER_OFFSET_PX =
  REACTION_CANVAS_LAYOUT.anchorSizePx / 2;
export const REACTION_CANVAS_ANCHOR_ATTACHMENT_OFFSET_PX =
  REACTION_CANVAS_LAYOUT.attachmentGapPx;
export const REACTION_CANVAS_TRACK_HEADER_INSET_PX =
  REACTION_CANVAS_LAYOUT.anchorSizePx + REACTION_CANVAS_LAYOUT.attachmentGapPx;

export function getReactionParticipantTrackStartOffsetPx(renderMode = "") {
  if (isReactionStructureCompositeGridRenderMode(renderMode)) {
    return REACTION_CANVAS_LAYOUT.binaryChoiceSizePx + REACTION_CANVAS_LAYOUT.tileGapPx;
  }
  if (isReactionStructureInlineAnchorRenderMode(renderMode)) {
    return REACTION_CANVAS_LAYOUT.binaryChoiceSizePx + REACTION_CANVAS_LAYOUT.tileGapPx;
  }
  return 0;
}

export function getReactionParticipantTrackStartOffsetCss(renderMode = "") {
  return `${getReactionParticipantTrackStartOffsetPx(renderMode)}px`;
}

export function getReactionParticipantTrackHeaderInsetPx(renderMode = "") {
  if (isReactionStructureCompositeGridRenderMode(renderMode)) {
    return REACTION_CANVAS_TRACK_HEADER_INSET_PX;
  }
  if (isReactionStructureInlineAnchorRenderMode(renderMode)) {
    return REACTION_CANVAS_TRACK_HEADER_INSET_PX;
  }
  return 0;
}

export function getReactionParticipantTrackHeaderInsetCss(renderMode = "") {
  return `${getReactionParticipantTrackHeaderInsetPx(renderMode)}px`;
}

function setReactionCanvasLayoutVar(surface, name, value) {
  if (!surface?.style || typeof surface.style.setProperty !== "function") {
    return;
  }
  surface.style.setProperty(name, value);
}

export function applyReactionCanvasLayoutCssVars(surface) {
  setReactionCanvasLayoutVar(
    surface,
    "--binary-choice-size",
    `${REACTION_CANVAS_LAYOUT.binaryChoiceSizePx}px`
  );
  setReactionCanvasLayoutVar(
    surface,
    "--reaction-canvas-surface-column-count",
    String(REACTION_CANVAS_SURFACE_COLUMN_COUNT)
  );
  setReactionCanvasLayoutVar(
    surface,
    "--reaction-canvas-add-button-size",
    `${REACTION_CANVAS_LAYOUT.addButtonSizePx}px`
  );
  setReactionCanvasLayoutVar(
    surface,
    "--reaction-canvas-surface-column-gap",
    `${REACTION_CANVAS_LAYOUT.surfaceColumnGapPx}px`
  );
  setReactionCanvasLayoutVar(
    surface,
    "--reaction-canvas-small-gap",
    `${REACTION_CANVAS_LAYOUT.tileGapPx}px`
  );
  setReactionCanvasLayoutVar(
    surface,
    "--reaction-canvas-attachment-gap",
    `${REACTION_CANVAS_LAYOUT.attachmentGapPx}px`
  );
  setReactionCanvasLayoutVar(
    surface,
    "--reaction-canvas-anchor-size",
    `${REACTION_CANVAS_LAYOUT.anchorSizePx}px`
  );
  setReactionCanvasLayoutVar(
    surface,
    "--reaction-canvas-anchor-center-offset",
    `${REACTION_CANVAS_ANCHOR_CENTER_OFFSET_PX}px`
  );
  setReactionCanvasLayoutVar(
    surface,
    "--reaction-canvas-anchor-attachment-offset",
    `${REACTION_CANVAS_ANCHOR_ATTACHMENT_OFFSET_PX}px`
  );
  setReactionCanvasLayoutVar(
    surface,
    "--reaction-canvas-composite-node-size",
    `${REACTION_CANVAS_LAYOUT.compositeNodeSizePx}px`
  );
  setReactionCanvasLayoutVar(
    surface,
    "--reaction-canvas-composite-node-center",
    `${REACTION_CANVAS_COMPOSITE_NODE_CENTER_PX}px`
  );
  setReactionCanvasLayoutVar(
    surface,
    "--reaction-canvas-composite-connector-span",
    `${REACTION_CANVAS_COMPOSITE_CONNECTOR_SPAN_PX}px`
  );
  setReactionCanvasLayoutVar(
    surface,
    "--reaction-canvas-composite-node-inset",
    `${REACTION_CANVAS_COMPOSITE_NODE_INSET_PX}px`
  );
  setReactionCanvasLayoutVar(
    surface,
    "--reaction-canvas-composite-participant-gap",
    `${REACTION_CANVAS_LAYOUT.compositeParticipantGapPx}px`
  );
  setReactionCanvasLayoutVar(
    surface,
    "--reaction-canvas-stack-gap",
    `${REACTION_CANVAS_LAYOUT.contentStackGapPx}px`
  );
  setReactionCanvasLayoutVar(
    surface,
    "--reaction-canvas-tile-gap",
    `${REACTION_CANVAS_LAYOUT.tileGapPx}px`
  );
  setReactionCanvasLayoutVar(
    surface,
    "--reaction-canvas-top-control-row-height",
    `${REACTION_CANVAS_LAYOUT.topControlRowHeightPx}px`
  );
}

function getReactionCanvasSurfaceColumnGroupLayoutEntry(side, operatorLaneIndex = null) {
  return (
    REACTION_CANVAS_SURFACE_COLUMN_GROUP_LAYOUT.find(
      (entry) =>
        entry.side === side &&
        entry.operatorLaneIndex ===
          (operatorLaneIndex === null || operatorLaneIndex === undefined
            ? null
            : Number(operatorLaneIndex))
    ) ?? null
  );
}

function getOperatorLaneSlotElement(surface, operatorLaneIndex) {
  if (!surface || operatorLaneIndex === null || operatorLaneIndex === undefined) {
    return null;
  }
  return (
    surface.querySelector(
      `.composer-reaction-canvas-column-group-slot[data-operator-lane-index="${String(operatorLaneIndex)}"]`
    ) ?? null
  );
}

function getLaneGridColumnVarName(side, operatorLaneIndex = null) {
  if (side === "center") {
    return "--reaction-canvas-center-assemblies-grid-column";
  }
  const normalizedIndex = Number(operatorLaneIndex);
  if (normalizedIndex === 0) {
    return "--reaction-canvas-operator-lane-0-grid-column";
  }
  if (normalizedIndex === 1) {
    return "--reaction-canvas-operator-lane-1-grid-column";
  }
  return "";
}

export function applyReactionCanvasSurfaceGridLayout({
  surface,
  reactantsColumn,
  centerAssembliesColumn,
  productsColumn,
}) {
  const reactantEntry = getReactionCanvasSurfaceColumnGroupLayoutEntry("reactant");
  if (reactantsColumn?.style && reactantEntry && typeof reactantsColumn.style.setProperty === "function") {
    reactantsColumn.style.setProperty(
      "--reaction-canvas-reactants-grid-column",
      `${reactantEntry.start} / span ${reactantEntry.span}`
    );
  }

  const centerEntry = getReactionCanvasSurfaceColumnGroupLayoutEntry("center");
  if (
    centerAssembliesColumn?.style &&
    centerEntry &&
    typeof centerAssembliesColumn.style.setProperty === "function"
  ) {
    centerAssembliesColumn.style.setProperty(
      "--reaction-canvas-center-assemblies-grid-column",
      `${centerEntry.start} / span ${centerEntry.span}`
    );
  }

  const productEntry = getReactionCanvasSurfaceColumnGroupLayoutEntry("product");
  if (productsColumn?.style && productEntry && typeof productsColumn.style.setProperty === "function") {
    productsColumn.style.setProperty(
      "--reaction-canvas-products-grid-column",
      `${productEntry.start} / span ${productEntry.span}`
    );
  }

  REACTION_CANVAS_SURFACE_COLUMN_GROUP_LAYOUT.filter((entry) => entry.side === "operator").forEach((entry) => {
    const slotElement = getOperatorLaneSlotElement(surface, entry.operatorLaneIndex);
    const operatorGridColumnVarName = getLaneGridColumnVarName(
      entry.side,
      entry.operatorLaneIndex
    );
    if (
      operatorGridColumnVarName &&
      slotElement?.style &&
      typeof slotElement.style.setProperty === "function"
    ) {
      slotElement.style.setProperty(
        operatorGridColumnVarName,
        `${entry.start} / span ${entry.span}`
      );
    }
  });
}

function getReactionSurfaceColumnGroupElement({
  surface,
  reactantsColumn,
  centerAssembliesColumn,
  productsColumn,
  laneEntry,
}) {
  if (laneEntry?.side === "reactant") {
    return reactantsColumn ?? null;
  }
  if (laneEntry?.side === "center") {
    return centerAssembliesColumn ?? null;
  }
  if (laneEntry?.side === "product") {
    return productsColumn ?? null;
  }
  if (laneEntry?.side === "operator") {
    return getOperatorLaneSlotElement(surface, laneEntry.operatorLaneIndex);
  }
  return null;
}

export function getReactionSurfaceColumnGroupFallbackRatios(columnGroupEntries = []) {
  if (!Array.isArray(columnGroupEntries) || !columnGroupEntries.length) {
    return [0.5];
  }
  return columnGroupEntries.map((columnGroupEntry) => {
    const layoutEntry = getReactionCanvasSurfaceColumnGroupLayoutEntry(
      columnGroupEntry?.side,
      columnGroupEntry?.operatorLaneIndex ?? null
    );
    if (!layoutEntry) {
      return 0.5;
    }
    return (layoutEntry.start - 1 + layoutEntry.span / 2) / REACTION_CANVAS_SURFACE_COLUMN_COUNT;
  });
}

export function measureReactionSurfaceColumnGroupRatios({
  surface,
  reactantsColumn,
  centerAssembliesColumn,
  productsColumn,
  columnGroupEntries = [],
}) {
  if (!surface || typeof surface.getBoundingClientRect !== "function") {
    return null;
  }
  const bounds = surface.getBoundingClientRect();
  const width = Math.max(1, bounds.width);
  if (width <= 1) {
    return null;
  }
  const ratios = [];
  for (const columnGroupEntry of columnGroupEntries) {
    const laneElement = getReactionSurfaceColumnGroupElement({
      surface,
      reactantsColumn,
      centerAssembliesColumn,
      productsColumn,
      laneEntry: columnGroupEntry,
    });
    if (!laneElement || typeof laneElement.getBoundingClientRect !== "function") {
      return null;
    }
    const laneBounds = laneElement.getBoundingClientRect();
    if (!laneBounds || laneBounds.width <= 1) {
      return null;
    }
    ratios.push((laneBounds.left - bounds.left + laneBounds.width / 2) / width);
  }
  return ratios.length ? ratios : null;
}

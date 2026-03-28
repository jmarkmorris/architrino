export const REACTION_SOLVER_LAYOUT = Object.freeze({
  addButtonSizePx: 42,
  binaryChoiceSizePx: 72,
  centerTransformerGraphicConnectionStepPx: 79,
  centerTransformerTileCount: 4,
  laneGapPx: 72 / 16,
  routeAnchorGapPx: 0.25,
  tileGapPx: 7,
  topControlRowHeightPx: 42,
  transmuteColumnEdgePaddingPx: 18,
  transmuteSlotEdgePaddingPx: 18,
  transmuteSlotStepPx: 108,
});

export const REACTION_SOLVER_SURFACE_COLUMN_COUNT = 16;
export const REACTION_SOLVER_SURFACE_SLOT_LAYOUT = Object.freeze([
  Object.freeze({
    side: "reactant",
    centerColumnIndex: null,
    start: 1,
    span: 4,
  }),
  Object.freeze({
    side: "center",
    centerColumnIndex: 0,
    start: 5,
    span: 4,
  }),
  Object.freeze({
    side: "center",
    centerColumnIndex: 1,
    start: 9,
    span: 4,
  }),
  Object.freeze({
    side: "product",
    centerColumnIndex: null,
    start: 13,
    span: 4,
  }),
]);

export const REACTION_SOLVER_CENTER_LANE_WIDTH_PX =
  REACTION_SOLVER_LAYOUT.binaryChoiceSizePx * REACTION_SOLVER_LAYOUT.centerTransformerTileCount +
  REACTION_SOLVER_LAYOUT.tileGapPx * (REACTION_SOLVER_LAYOUT.centerTransformerTileCount - 1);

function setReactionSolverLayoutVar(surface, name, value) {
  if (!surface?.style || typeof surface.style.setProperty !== "function") {
    return;
  }
  surface.style.setProperty(name, value);
}

export function applyReactionSolverLayoutCssVars(surface) {
  setReactionSolverLayoutVar(
    surface,
    "--binary-choice-size",
    `${REACTION_SOLVER_LAYOUT.binaryChoiceSizePx}px`
  );
  setReactionSolverLayoutVar(
    surface,
    "--solver-surface-column-count",
    String(REACTION_SOLVER_SURFACE_COLUMN_COUNT)
  );
  setReactionSolverLayoutVar(
    surface,
    "--solver-add-button-size",
    `${REACTION_SOLVER_LAYOUT.addButtonSizePx}px`
  );
  setReactionSolverLayoutVar(
    surface,
    "--solver-lane-gap",
    `${REACTION_SOLVER_LAYOUT.laneGapPx}px`
  );
  setReactionSolverLayoutVar(
    surface,
    "--solver-small-gap",
    `${REACTION_SOLVER_LAYOUT.tileGapPx}px`
  );
  setReactionSolverLayoutVar(
    surface,
    "--solver-tile-gap",
    `${REACTION_SOLVER_LAYOUT.tileGapPx}px`
  );
  setReactionSolverLayoutVar(
    surface,
    "--solver-top-control-row-height",
    `${REACTION_SOLVER_LAYOUT.topControlRowHeightPx}px`
  );
}

function getReactionSolverSurfaceSlotLayoutEntry(side, centerColumnIndex = null) {
  return (
    REACTION_SOLVER_SURFACE_SLOT_LAYOUT.find(
      (entry) =>
        entry.side === side &&
        entry.centerColumnIndex ===
          (centerColumnIndex === null || centerColumnIndex === undefined
            ? null
            : Number(centerColumnIndex))
    ) ?? null
  );
}

function getCenterLaneSlotElement(surface, centerColumnIndex) {
  if (!surface || centerColumnIndex === null || centerColumnIndex === undefined) {
    return null;
  }
  return (
    surface.querySelector(
      `.composer-reaction-solver-lane-slot[data-center-column-index="${String(centerColumnIndex)}"]`
    ) ?? null
  );
}

function getCenterGridColumnVarName(centerColumnIndex) {
  const normalizedIndex = Number(centerColumnIndex);
  if (normalizedIndex === 0) {
    return "--solver-center-left-grid-column";
  }
  if (normalizedIndex === 1) {
    return "--solver-center-right-grid-column";
  }
  return "";
}

export function applyReactionSolverSurfaceGridLayout({
  surface,
  reactantsColumn,
  productsColumn,
}) {
  const reactantEntry = getReactionSolverSurfaceSlotLayoutEntry("reactant");
  if (reactantsColumn?.style && reactantEntry && typeof reactantsColumn.style.setProperty === "function") {
    reactantsColumn.style.setProperty(
      "--solver-reactants-grid-column",
      `${reactantEntry.start} / span ${reactantEntry.span}`
    );
  }

  const productEntry = getReactionSolverSurfaceSlotLayoutEntry("product");
  if (productsColumn?.style && productEntry && typeof productsColumn.style.setProperty === "function") {
    productsColumn.style.setProperty(
      "--solver-products-grid-column",
      `${productEntry.start} / span ${productEntry.span}`
    );
  }

  REACTION_SOLVER_SURFACE_SLOT_LAYOUT.filter((entry) => entry.side === "center").forEach((entry) => {
    const slotElement = getCenterLaneSlotElement(surface, entry.centerColumnIndex);
    const centerGridColumnVarName = getCenterGridColumnVarName(entry.centerColumnIndex);
    if (
      centerGridColumnVarName &&
      slotElement?.style &&
      typeof slotElement.style.setProperty === "function"
    ) {
      slotElement.style.setProperty(
        centerGridColumnVarName,
        `${entry.start} / span ${entry.span}`
      );
    }
  });
}

function getReactionSurfaceLaneElement({
  surface,
  reactantsColumn,
  productsColumn,
  laneEntry,
}) {
  if (laneEntry?.side === "reactant") {
    return reactantsColumn ?? null;
  }
  if (laneEntry?.side === "product") {
    return productsColumn ?? null;
  }
  if (laneEntry?.side === "center") {
    return getCenterLaneSlotElement(surface, laneEntry.centerColumnIndex);
  }
  return null;
}

export function getReactionSurfaceLaneFallbackRatios(laneEntries = []) {
  if (!Array.isArray(laneEntries) || !laneEntries.length) {
    return [0.5];
  }
  return laneEntries.map((laneEntry) => {
    const layoutEntry = getReactionSolverSurfaceSlotLayoutEntry(
      laneEntry?.side,
      laneEntry?.centerColumnIndex ?? null
    );
    if (!layoutEntry) {
      return 0.5;
    }
    return (layoutEntry.start - 1 + layoutEntry.span / 2) / REACTION_SOLVER_SURFACE_COLUMN_COUNT;
  });
}

export function measureReactionSurfaceLaneRatios({
  surface,
  reactantsColumn,
  productsColumn,
  laneEntries = [],
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
  for (const laneEntry of laneEntries) {
    const laneElement = getReactionSurfaceLaneElement({
      surface,
      reactantsColumn,
      productsColumn,
      laneEntry,
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

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
    "--solver-add-button-size",
    `${REACTION_SOLVER_LAYOUT.addButtonSizePx}px`
  );
  setReactionSolverLayoutVar(
    surface,
    "--solver-center-lane-width",
    `${REACTION_SOLVER_CENTER_LANE_WIDTH_PX}px`
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
    if (laneBounds.width <= 1) {
      return null;
    }
    ratios.push((laneBounds.left - bounds.left + laneBounds.width / 2) / width);
  }
  return ratios.length ? ratios : null;
}

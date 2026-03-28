export const REACTION_SOLVER_LAYOUT = Object.freeze({
  addButtonSizePx: 42,
  binaryChoiceSizePx: 72,
  operatorGraphicConnectionStepPx: 79,
  operatorTileCount: 4,
  laneGapPx: 72 / 16,
  routeAnchorGapPx: 0.25,
  tileGapPx: 7,
  topControlRowHeightPx: 42,
  operatorLaneEdgePaddingPx: 18,
  operatorSlotEdgePaddingPx: 18,
  operatorSlotStepPx: 108,
});

export const REACTION_SOLVER_SURFACE_COLUMN_COUNT = 16;
export const REACTION_SOLVER_SURFACE_SLOT_LAYOUT = Object.freeze([
  Object.freeze({
    side: "reactant",
    operatorLaneIndex: null,
    start: 1,
    span: 4,
  }),
  Object.freeze({
    side: "operator",
    operatorLaneIndex: 0,
    start: 5,
    span: 4,
  }),
  Object.freeze({
    side: "operator",
    operatorLaneIndex: 1,
    start: 9,
    span: 4,
  }),
  Object.freeze({
    side: "product",
    operatorLaneIndex: null,
    start: 13,
    span: 4,
  }),
]);

export const REACTION_SOLVER_OPERATOR_LANE_WIDTH_PX =
  REACTION_SOLVER_LAYOUT.binaryChoiceSizePx * REACTION_SOLVER_LAYOUT.operatorTileCount +
  REACTION_SOLVER_LAYOUT.tileGapPx * (REACTION_SOLVER_LAYOUT.operatorTileCount - 1);

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

function getReactionSolverSurfaceSlotLayoutEntry(side, operatorLaneIndex = null) {
  return (
    REACTION_SOLVER_SURFACE_SLOT_LAYOUT.find(
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
      `.composer-reaction-solver-lane-slot[data-operator-lane-index="${String(operatorLaneIndex)}"]`
    ) ?? null
  );
}

function getOperatorGridColumnVarName(operatorLaneIndex) {
  const normalizedIndex = Number(operatorLaneIndex);
  if (normalizedIndex === 0) {
    return "--solver-operator-lane-0-grid-column";
  }
  if (normalizedIndex === 1) {
    return "--solver-operator-lane-1-grid-column";
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

  REACTION_SOLVER_SURFACE_SLOT_LAYOUT.filter((entry) => entry.side === "operator").forEach((entry) => {
    const slotElement = getOperatorLaneSlotElement(surface, entry.operatorLaneIndex);
    const operatorGridColumnVarName = getOperatorGridColumnVarName(entry.operatorLaneIndex);
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
  if (laneEntry?.side === "operator") {
    return getOperatorLaneSlotElement(surface, laneEntry.operatorLaneIndex);
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
      laneEntry?.operatorLaneIndex ?? null
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

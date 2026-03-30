import test from "node:test";
import assert from "node:assert/strict";

import {
  applyReactionSolverLayoutCssVars,
  applyReactionSolverSurfaceGridLayout,
  getReactionParticipantTrackHeaderInsetCss,
  getReactionParticipantTrackHeaderInsetPx,
  getReactionParticipantTrackStartOffsetCss,
  getReactionParticipantTrackStartOffsetPx,
  REACTION_SOLVER_COMPOSITE_CONNECTOR_SPAN_PX,
  REACTION_SOLVER_COMPOSITE_NODE_CENTER_PX,
  REACTION_SOLVER_COMPOSITE_NODE_INSET_PX,
  getReactionSurfaceColumnGroupFallbackRatios,
  measureReactionSurfaceColumnGroupRatios,
  REACTION_SOLVER_SURFACE_COLUMN_GROUP_COUNT,
  REACTION_SOLVER_SURFACE_COLUMN_COUNT,
  REACTION_SOLVER_LAYOUT,
} from "../src/runtime/ComposerReactionSolverLayoutRuntime.js";

test("reaction solver layout applies shared css variables from one source of truth", () => {
  const applied = new Map();
  applyReactionSolverLayoutCssVars({
    style: {
      setProperty(name, value) {
        applied.set(name, value);
      },
    },
  });
  assert.equal(
    applied.get("--solver-surface-column-gap"),
    `${REACTION_SOLVER_LAYOUT.surfaceColumnGapPx}px`
  );
  assert.equal(
    applied.get("--solver-attachment-gap"),
    `${REACTION_SOLVER_LAYOUT.attachmentGapPx}px`
  );
  assert.equal(
    applied.get("--solver-anchor-size"),
    `${REACTION_SOLVER_LAYOUT.anchorSizePx}px`
  );
  assert.equal(
    applied.get("--solver-composite-node-size"),
    `${REACTION_SOLVER_LAYOUT.compositeNodeSizePx}px`
  );
  assert.equal(
    applied.get("--solver-composite-node-center"),
    `${REACTION_SOLVER_COMPOSITE_NODE_CENTER_PX}px`
  );
  assert.equal(
    applied.get("--solver-composite-connector-span"),
    `${REACTION_SOLVER_COMPOSITE_CONNECTOR_SPAN_PX}px`
  );
  assert.equal(
    applied.get("--solver-composite-node-inset"),
    `${REACTION_SOLVER_COMPOSITE_NODE_INSET_PX}px`
  );
  assert.equal(
    applied.get("--solver-composite-participant-gap"),
    `${REACTION_SOLVER_LAYOUT.compositeParticipantGapPx}px`
  );
  assert.equal(
    applied.get("--solver-stack-gap"),
    `${REACTION_SOLVER_LAYOUT.contentStackGapPx}px`
  );
  assert.equal(
    applied.get("--solver-top-control-row-height"),
    `${REACTION_SOLVER_LAYOUT.topControlRowHeightPx}px`
  );
  assert.equal(
    applied.get("--solver-surface-column-count"),
    String(REACTION_SOLVER_SURFACE_COLUMN_COUNT)
  );
  assert.equal(REACTION_SOLVER_SURFACE_COLUMN_GROUP_COUNT, 5);
});

test("reaction solver layout derives explicit track-start offsets for standalone and composite grids", () => {
  assert.equal(
    getReactionParticipantTrackStartOffsetPx("binary-selector-grid"),
    REACTION_SOLVER_LAYOUT.binaryChoiceSizePx + REACTION_SOLVER_LAYOUT.tileGapPx
  );
  assert.equal(
    getReactionParticipantTrackStartOffsetPx("assembly-cluster-grid"),
    REACTION_SOLVER_LAYOUT.binaryChoiceSizePx + REACTION_SOLVER_LAYOUT.tileGapPx
  );
  assert.equal(
    getReactionParticipantTrackStartOffsetCss("assembly-cluster-grid"),
    `${REACTION_SOLVER_LAYOUT.binaryChoiceSizePx + REACTION_SOLVER_LAYOUT.tileGapPx}px`
  );
  assert.equal(
    getReactionParticipantTrackHeaderInsetPx("binary-selector-grid"),
    REACTION_SOLVER_LAYOUT.anchorSizePx + REACTION_SOLVER_LAYOUT.attachmentGapPx
  );
  assert.equal(
    getReactionParticipantTrackHeaderInsetCss("assembly-cluster-grid"),
    `${REACTION_SOLVER_LAYOUT.anchorSizePx + REACTION_SOLVER_LAYOUT.attachmentGapPx}px`
  );
});

test("reaction solver layout applies periodic-table grid spans to visible lane elements", () => {
  const reactantsApplied = new Map();
  const centerApplied = new Map();
  const productsApplied = new Map();
  const operatorLane0Applied = new Map();
  const operatorLane1Applied = new Map();
  applyReactionSolverSurfaceGridLayout({
    surface: {
      querySelector(selector) {
        if (selector.includes('data-operator-lane-index="0"')) {
          return {
            style: {
              setProperty(name, value) {
                operatorLane0Applied.set(name, value);
              },
            },
          };
        }
        if (selector.includes('data-operator-lane-index="1"')) {
          return {
            style: {
              setProperty(name, value) {
                operatorLane1Applied.set(name, value);
              },
            },
          };
        }
        return null;
      },
    },
    reactantsColumn: {
      style: {
        setProperty(name, value) {
          reactantsApplied.set(name, value);
        },
      },
    },
    centerAssembliesColumn: {
      style: {
        setProperty(name, value) {
          centerApplied.set(name, value);
        },
      },
    },
    productsColumn: {
      style: {
        setProperty(name, value) {
          productsApplied.set(name, value);
        },
      },
    },
  });
  assert.equal(reactantsApplied.get("--solver-reactants-grid-column"), "1 / span 4");
  assert.equal(centerApplied.get("--solver-center-assemblies-grid-column"), "7 / span 4");
  assert.equal(productsApplied.get("--solver-products-grid-column"), "13 / span 4");
  assert.equal(operatorLane0Applied.get("--solver-operator-lane-0-grid-column"), "4 / span 4");
  assert.equal(operatorLane1Applied.get("--solver-operator-lane-1-grid-column"), "10 / span 4");
});

test("reaction solver layout derives fallback column-group ratios from periodic-table slot spans", () => {
  const ratios = getReactionSurfaceColumnGroupFallbackRatios([
    { side: "reactant", operatorLaneIndex: null },
    { side: "operator", operatorLaneIndex: 0 },
    { side: "center", operatorLaneIndex: null },
    { side: "operator", operatorLaneIndex: 1 },
    { side: "product", operatorLaneIndex: null },
  ]);
  assert.deepEqual(
    ratios.map((ratio) => Number(ratio.toFixed(4))),
    [0.125, 0.3125, 0.5, 0.6875, 0.875]
  );
});

test("reaction solver layout measures operator column-group centers from explicit group slots", () => {
  const columnGroupEntries = [
    { side: "reactant", operatorLaneIndex: null },
    { side: "operator", operatorLaneIndex: 0 },
    { side: "center", operatorLaneIndex: null },
    { side: "operator", operatorLaneIndex: 1 },
    { side: "product", operatorLaneIndex: null },
  ];
  const operatorLane0 = {
    getBoundingClientRect: () => ({ left: 420, width: 260 }),
  };
  const centerLane = {
    getBoundingClientRect: () => ({ left: 650, width: 260 }),
  };
  const operatorLane1 = {
    getBoundingClientRect: () => ({ left: 840, width: 260 }),
  };
  const ratios = measureReactionSurfaceColumnGroupRatios({
    surface: {
      getBoundingClientRect: () => ({ left: 100, width: 1280 }),
      querySelector(selector) {
        if (selector.includes('data-operator-lane-index="0"')) {
          return operatorLane0;
        }
        if (selector.includes('data-operator-lane-index="1"')) {
          return operatorLane1;
        }
        return null;
      },
    },
    reactantsColumn: {
      getBoundingClientRect: () => ({ left: 120, width: 260 }),
    },
    centerAssembliesColumn: centerLane,
    productsColumn: {
      getBoundingClientRect: () => ({ left: 1220, width: 260 }),
    },
    columnGroupEntries,
  });
  assert.deepEqual(
    ratios.map((ratio) => Number(ratio.toFixed(4))),
    [0.1172, 0.3516, 0.5313, 0.6797, 0.9766]
  );
});

test("reaction solver layout measures outer column-group centers from fixed periodic grid spans", () => {
  const columnGroupEntries = [
    { side: "reactant", operatorLaneIndex: null },
    { side: "operator", operatorLaneIndex: 0 },
    { side: "center", operatorLaneIndex: null },
    { side: "operator", operatorLaneIndex: 1 },
    { side: "product", operatorLaneIndex: null },
  ];
  const ratios = measureReactionSurfaceColumnGroupRatios({
    surface: {
      getBoundingClientRect: () => ({ left: 100, width: 1600 }),
      querySelector(selector) {
        if (selector.includes('data-operator-lane-index="0"')) {
          return {
            getBoundingClientRect: () => ({ left: 500, width: 280 }),
          };
        }
        if (selector.includes('data-operator-lane-index="1"')) {
          return {
            getBoundingClientRect: () => ({ left: 900, width: 280 }),
          };
        }
        return null;
      },
    },
    reactantsColumn: {
      getBoundingClientRect: () => ({ left: 100, width: 320 }),
    },
    centerAssembliesColumn: {
      getBoundingClientRect: () => ({ left: 700, width: 280 }),
    },
    productsColumn: {
      getBoundingClientRect: () => ({ left: 1300, width: 320 }),
    },
    columnGroupEntries,
  });
  assert.deepEqual(
    ratios.map((ratio) => Number(ratio.toFixed(4))),
    [0.1, 0.3375, 0.4625, 0.5875, 0.85]
  );
});

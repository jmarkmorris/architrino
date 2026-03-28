import test from "node:test";
import assert from "node:assert/strict";

import {
  applyReactionSolverLayoutCssVars,
  applyReactionSolverSurfaceGridLayout,
  getReactionSurfaceLaneFallbackRatios,
  measureReactionSurfaceLaneRatios,
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
    applied.get("--solver-lane-gap"),
    `${REACTION_SOLVER_LAYOUT.laneGapPx}px`
  );
  assert.equal(
    applied.get("--solver-top-control-row-height"),
    `${REACTION_SOLVER_LAYOUT.topControlRowHeightPx}px`
  );
  assert.equal(
    applied.get("--solver-surface-column-count"),
    String(REACTION_SOLVER_SURFACE_COLUMN_COUNT)
  );
});

test("reaction solver layout applies periodic-table grid spans to visible lane elements", () => {
  const reactantsApplied = new Map();
  const productsApplied = new Map();
  const centerLeftApplied = new Map();
  const centerRightApplied = new Map();
  applyReactionSolverSurfaceGridLayout({
    surface: {
      querySelector(selector) {
        if (selector.includes('data-center-column-index="0"')) {
          return {
            style: {
              setProperty(name, value) {
                centerLeftApplied.set(name, value);
              },
            },
          };
        }
        if (selector.includes('data-center-column-index="2"')) {
          return {
            style: {
              setProperty(name, value) {
                centerRightApplied.set(name, value);
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
    productsColumn: {
      style: {
        setProperty(name, value) {
          productsApplied.set(name, value);
        },
      },
    },
  });
  assert.equal(reactantsApplied.get("--solver-reactants-grid-column"), "1 / span 5");
  assert.equal(productsApplied.get("--solver-products-grid-column"), "14 / span 5");
  assert.equal(centerLeftApplied.get("--solver-center-left-grid-column"), "6 / span 4");
  assert.equal(centerRightApplied.get("--solver-center-right-grid-column"), "10 / span 4");
});

test("reaction solver layout derives fallback lane ratios from periodic-table slot spans", () => {
  const ratios = getReactionSurfaceLaneFallbackRatios([
    { side: "reactant", centerColumnIndex: null },
    { side: "center", centerColumnIndex: 0 },
    { side: "center", centerColumnIndex: 2 },
    { side: "product", centerColumnIndex: null },
  ]);
  assert.deepEqual(
    ratios.map((ratio) => Number(ratio.toFixed(4))),
    [0.1389, 0.3889, 0.6111, 0.8611]
  );
});

test("reaction solver layout measures lane centers from explicit lane slots", () => {
  const laneEntries = [
    { side: "reactant", centerColumnIndex: null },
    { side: "center", centerColumnIndex: 0 },
    { side: "center", centerColumnIndex: 2 },
    { side: "product", centerColumnIndex: null },
  ];
  const centerLeft = {
    getBoundingClientRect: () => ({ left: 480, width: 309 }),
  };
  const centerRight = {
    getBoundingClientRect: () => ({ left: 820, width: 309 }),
  };
  const ratios = measureReactionSurfaceLaneRatios({
    surface: {
      getBoundingClientRect: () => ({ left: 100, width: 1400 }),
      querySelector(selector) {
        if (selector.includes('data-center-column-index="0"')) {
          return centerLeft;
        }
        if (selector.includes('data-center-column-index="2"')) {
          return centerRight;
        }
        return null;
      },
    },
    reactantsColumn: {
      getBoundingClientRect: () => ({ left: 120, width: 340 }),
    },
    productsColumn: {
      getBoundingClientRect: () => ({ left: 1160, width: 340 }),
    },
    laneEntries,
  });
  assert.deepEqual(
    ratios.map((ratio) => Number(ratio.toFixed(4))),
    [0.1357, 0.3818, 0.6246, 0.8786]
  );
});

test("reaction solver layout measures outer lane centers from fixed periodic lane spans", () => {
  const laneEntries = [
    { side: "reactant", centerColumnIndex: null },
    { side: "center", centerColumnIndex: 0 },
    { side: "center", centerColumnIndex: 2 },
    { side: "product", centerColumnIndex: null },
  ];
  const ratios = measureReactionSurfaceLaneRatios({
    surface: {
      getBoundingClientRect: () => ({ left: 100, width: 1800 }),
      querySelector(selector) {
        if (selector.includes('data-center-column-index="0"')) {
          return {
            getBoundingClientRect: () => ({ left: 760, width: 309 }),
          };
        }
        if (selector.includes('data-center-column-index="2"')) {
          return {
            getBoundingClientRect: () => ({ left: 1082, width: 309 }),
          };
        }
        return null;
      },
    },
    reactantsColumn: {
      getBoundingClientRect: () => ({ left: 120, width: 620 }),
    },
    productsColumn: {
      getBoundingClientRect: () => ({ left: 1260, width: 640 }),
    },
    laneEntries,
  });
  assert.deepEqual(
    ratios.map((ratio) => Number(ratio.toFixed(4))),
    [0.1833, 0.4525, 0.6314, 0.8222]
  );
});

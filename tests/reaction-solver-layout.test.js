import test from "node:test";
import assert from "node:assert/strict";

import {
  applyReactionSolverLayoutCssVars,
  measureReactionSurfaceLaneRatios,
  REACTION_SOLVER_CENTER_LANE_WIDTH_PX,
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
    applied.get("--solver-center-lane-width"),
    `${REACTION_SOLVER_CENTER_LANE_WIDTH_PX}px`
  );
  assert.equal(
    applied.get("--solver-lane-gap"),
    `${REACTION_SOLVER_LAYOUT.laneGapPx}px`
  );
  assert.equal(
    applied.get("--solver-top-control-row-height"),
    `${REACTION_SOLVER_LAYOUT.topControlRowHeightPx}px`
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

test("reaction solver layout measures outer lane centers from rendered content bounds", () => {
  const laneEntries = [
    { side: "reactant", centerColumnIndex: null },
    { side: "center", centerColumnIndex: 0 },
    { side: "center", centerColumnIndex: 2 },
    { side: "product", centerColumnIndex: null },
  ];
  const reactantRects = [
    { left: 220, right: 720, width: 500, height: 120 },
  ];
  const productRects = [
    { left: 1300, right: 1780, width: 480, height: 120 },
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
      querySelectorAll: () =>
        reactantRects.map((rect) => ({
          getBoundingClientRect: () => rect,
        })),
      getBoundingClientRect: () => ({ left: 120, width: 620 }),
    },
    productsColumn: {
      querySelectorAll: () =>
        productRects.map((rect) => ({
          getBoundingClientRect: () => rect,
        })),
      getBoundingClientRect: () => ({ left: 1260, width: 640 }),
    },
    laneEntries,
  });
  assert.deepEqual(
    ratios.map((ratio) => Number(ratio.toFixed(4))),
    [0.2056, 0.4525, 0.6314, 0.8]
  );
});

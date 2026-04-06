import test from "node:test";
import assert from "node:assert/strict";

import {
  buildReactionCanvasCurvePath,
  buildReactionCanvasDirectPath,
  createReactionCanvasRouteRenderRuntime,
} from "../src/apps/reaction/ReactionCanvasRouteRenderRuntime.js";

test("route render runtime exposes direct and curved canvas path builders", () => {
  assert.equal(
    buildReactionCanvasDirectPath({ startX: 1, startY: 2, endX: 3, endY: 4 }),
    "M 1 2 L 3 4"
  );
  assert.equal(
    buildReactionCanvasCurvePath({ startX: 10, startY: 20, endX: 110, endY: 40 }),
    "M 10 20 C 106 20, 14 40, 110 40"
  );
});

test("route render runtime returns the canvas route scheduling interface", () => {
  const runtime = createReactionCanvasRouteRenderRuntime({
    state: { active: false, participants: [], mappings: [] },
    createSvgElement: () => ({
      setAttribute() {},
      appendChild() {},
      addEventListener() {},
      classList: { toggle() {} },
      dataset: {},
    }),
  });

  assert.equal(typeof runtime.drawMappings, "function");
  assert.equal(typeof runtime.scheduleMappingDraw, "function");
  assert.equal(typeof runtime.createCompositeBusPath, "function");
  assert.equal(typeof runtime.getTrimmedRouteEndpoints, "function");
});

test("route render runtime no longer looks for legacy composite source anchors", async () => {
  const fs = await import("node:fs/promises");
  const runtimeSource = await fs.readFile(
    new URL("../src/apps/reaction/ReactionCanvasRouteRenderRuntime.js", import.meta.url),
    "utf8"
  );

  assert.doesNotMatch(runtimeSource, /data-composite-source-key/);
  assert.doesNotMatch(runtimeSource, /data-composite-participant-id/);
});

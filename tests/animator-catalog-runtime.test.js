import test from "node:test";
import assert from "node:assert/strict";

import { animatorAssemblyTemplateMenuRows } from "../src/runtime/AnimatorCatalogRuntime.js";

test("animator assembly catalog exposes Noether Pair and Noether Quad alongside Noether braid", () => {
  assert.deepEqual(animatorAssemblyTemplateMenuRows[0], [
    { template: "noether_swarm", label: "Pro Noether braid" },
    { template: "noether_pair", label: "Noether Pair" },
    { template: "noether_quad", label: "Noether Quad" },
  ]);
});

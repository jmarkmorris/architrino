import test from "node:test";
import assert from "node:assert/strict";

import { composerAssemblyTemplateMenuRows } from "../src/runtime/ComposerCatalogRuntime.js";

test("composer assembly catalog exposes Noether Pair and Noether Quad alongside Noether Core", () => {
  assert.deepEqual(composerAssemblyTemplateMenuRows[0], [
    { template: "noether_core", label: "Pro Noether Core" },
    { template: "noether_pair", label: "Noether Pair" },
    { template: "noether_quad", label: "Noether Quad" },
  ]);
});

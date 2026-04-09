import test from "node:test";
import assert from "node:assert/strict";

import { pdgviewAssemblyTemplateMenuRows } from "../src/runtime/PdgviewCatalogRuntime.js";

test("pdgview assembly catalog exposes Noether Pair and Noether Quad alongside Noether Core", () => {
  assert.deepEqual(pdgviewAssemblyTemplateMenuRows[0], [
    { template: "noether_core", label: "Pro Noether Core" },
    { template: "noether_pair", label: "Noether Pair" },
    { template: "noether_quad", label: "Noether Quad" },
  ]);
});

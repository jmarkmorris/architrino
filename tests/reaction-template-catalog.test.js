import test from "node:test";
import assert from "node:assert/strict";

import { reactionAssemblyTemplateMenuRows } from "../src/apps/reaction/ReactionTemplateCatalogRuntime.js";

test("reaction template catalog exposes the current manual-authoring picker rows", () => {
  assert.deepEqual(reactionAssemblyTemplateMenuRows, [
    [
      { template: "noether_core", label: "Pro Noether Core" },
      { template: "higgs_cluster", label: "Higgs Cluster" },
    ],
    [
      { template: "electron", label: "Pro Electron" },
    ],
    [
      { template: "down_quark", label: "Pro Down Quark" },
      { template: "up_quark", label: "Pro Up Quark" },
    ],
    [
      { template: "pi_plus", label: "Pi+" },
      { template: "pi_minus", label: "Pi-" },
      { template: "upi0", label: "Pi0 (u anti-u)" },
      { template: "dpi0", label: "Pi0 (d anti-d)" },
    ],
  ]);
});

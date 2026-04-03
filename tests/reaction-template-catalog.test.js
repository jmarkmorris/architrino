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
      { template: "pi_plus", label: "Positive Pion" },
      { template: "pi_minus", label: "Negative Pion" },
      { template: "upi0", label: "Neutral Pion (u anti-u)" },
      { template: "dpi0", label: "Neutral Pion (d anti-d)" },
    ],
    [
      { template: "k_minus", label: "Negative Kaon" },
      { template: "k_plus", label: "Positive Kaon" },
      { template: "sk0", label: "Neutral Kaon (s anti-d)" },
      { template: "dk0", label: "Neutral Kaon (d anti-s)" },
    ],
    [
      { template: "b_minus", label: "Negative B Meson" },
      { template: "b_plus", label: "Positive B Meson" },
      { template: "bB0", label: "Neutral B Meson (b anti-d)" },
      { template: "dB0", label: "Neutral B Meson (d anti-b)" },
    ],
  ]);
});

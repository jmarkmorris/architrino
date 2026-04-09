import test from "node:test";
import assert from "node:assert/strict";

import { getReactionAddPickerCells } from "../src/apps/reaction/ReactionAddPickerRuntime.js";
import {
  formatReactionCanonicalLabel,
  getReactionCanonicalBaseLabel,
  getReactionCanonicalLabel,
} from "../src/apps/reaction/ReactionLabelCatalogRuntime.js";

test("reaction label catalog uses picker-canonical default labels for known templates", () => {
  assert.equal(getReactionCanonicalBaseLabel("neutrino"), "Pro Electron Neutrino");
  assert.equal(getReactionCanonicalBaseLabel("electron"), "Pro Electron");
  assert.equal(getReactionCanonicalBaseLabel("proton"), "Pro Proton");
  assert.equal(getReactionCanonicalBaseLabel("neutron"), "Pro Neutron");
});

test("reaction label catalog resolves occupied-count picker variants for known families", () => {
  assert.equal(getReactionCanonicalBaseLabel("neutrino", { occupiedCount: 1 }), "Pro Tau Neutrino");
  assert.equal(getReactionCanonicalBaseLabel("neutrino", { occupiedCount: 2 }), "Pro Muon Neutrino");
  assert.equal(getReactionCanonicalBaseLabel("neutrino", { occupiedCount: 3 }), "Pro Electron Neutrino");
  assert.equal(getReactionCanonicalBaseLabel("down_quark", { occupiedCount: 2 }), "Pro Strange Quark");
  assert.equal(getReactionCanonicalBaseLabel("noether_core", { occupiedCount: 1 }), "Pro Uni Binary");
});

test("reaction label catalog formats anti labels from the picker-canonical base names", () => {
  assert.equal(getReactionCanonicalLabel("neutrino", { polarity: "anti" }), "Anti Electron Neutrino");
  assert.equal(getReactionCanonicalLabel("electron", { polarity: "anti" }), "Anti Electron");
  assert.equal(formatReactionCanonicalLabel("Pro Muon Neutrino", "neutrino", "anti"), "Anti Muon Neutrino");
});

test("reaction add-picker cells reject legacy non-canonical known labels", () => {
  const forbiddenLabels = new Set([
    "Pro Neutrino",
    "Anti Neutrino",
    "Electron Antineutrino",
  ]);
  const offender = getReactionAddPickerCells().find((cell) => forbiddenLabels.has(String(cell?.label ?? "").trim()));

  assert.equal(offender, undefined);
});

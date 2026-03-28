import test from "node:test";
import assert from "node:assert/strict";

import {
  buildReactionStructureDescriptorTree,
  REACTION_STRUCTURE_RENDER_MODES,
  supportsReactionStructureDescriptorTree,
} from "../src/runtime/ComposerReactionStructureDescriptorRuntime.js";
import { buildReactionParticipantStructure } from "../src/runtime/ComposerReactionStructureBridgeRuntime.js";
import { clearNoetherCoreSlotOccupant } from "../src/domain/structure/StructureTransforms.js";

function createStructure(templateId, polarity = "pro", label = templateId) {
  return buildReactionParticipantStructure(templateId, {
    id: `${templateId}_${polarity}`,
    label,
    polarity,
  }).root;
}

test("electron descriptor tree exposes a tri-slot binary selector grid", () => {
  const descriptorTree = buildReactionStructureDescriptorTree(createStructure("electron", "pro", "Electron"));
  const [root] = descriptorTree;

  assert.equal(root.renderMode, REACTION_STRUCTURE_RENDER_MODES.BINARY_SELECTOR_GRID);
  assert.equal(root.templateId, "electron");
  assert.deepEqual(root.children.map((child) => child.slotCode), ["I", "M", "O"]);
  assert.deepEqual(root.children.map((child) => child.hasBinary), [true, true, true]);
});

test("trimmed electron keeps three tiles but marks the stripped slot as binary-free", () => {
  const baseStructure = createStructure("electron", "pro", "Electron");
  const trimmedStructure = clearNoetherCoreSlotOccupant(
    baseStructure,
    "electron_pro/core",
    "outer"
  );
  const descriptorTree = buildReactionStructureDescriptorTree(trimmedStructure);
  const [root] = descriptorTree;

  assert.equal(root.renderMode, REACTION_STRUCTURE_RENDER_MODES.BINARY_SELECTOR_GRID);
  assert.deepEqual(root.children.map((child) => child.slotCode), ["I", "M", "O"]);
  assert.deepEqual(root.children.map((child) => child.hasBinary), [true, true, false]);
});

test("proton descriptor tree expands to up/down/up quark rows", () => {
  const descriptorTree = buildReactionStructureDescriptorTree(createStructure("proton", "pro", "Proton"));
  const [root] = descriptorTree;

  assert.equal(root.renderMode, REACTION_STRUCTURE_RENDER_MODES.ASSEMBLY_CLUSTER_GRID);
  assert.deepEqual(
    root.children.map((child) => child.templateId),
    ["up_quark", "down_quark", "up_quark"]
  );
});

test("higgs cluster descriptor tree expands to four alternating core rows", () => {
  const descriptorTree = buildReactionStructureDescriptorTree(
    createStructure("higgs_cluster", "pro", "Higgs cluster")
  );
  const [root] = descriptorTree;

  assert.equal(root.renderMode, REACTION_STRUCTURE_RENDER_MODES.ASSEMBLY_CLUSTER_GRID);
  assert.equal(root.children.length, 4);
  assert.deepEqual(
    root.children.map((child) => child.inventory?.antiCore ?? 0),
    [0, 1, 0, 1]
  );
});

test("transmute descriptor tree produces a single transmute tile", () => {
  const descriptorTree = buildReactionStructureDescriptorTree(
    createStructure("transmute", "pro", "Transmute")
  );
  const [root] = descriptorTree;

  assert.equal(root.renderMode, REACTION_STRUCTURE_RENDER_MODES.TRANSMUTE_TILE);
  assert.equal(root.label, "Transmute");
  assert.equal(root.children.length, 0);
});

test("polar transform descriptor tree produces a single transform tile", () => {
  const descriptorTree = buildReactionStructureDescriptorTree(
    createStructure("l_polar_transform", "pro", "L Polar Transform")
  );
  const [root] = descriptorTree;

  assert.equal(root.renderMode, REACTION_STRUCTURE_RENDER_MODES.TRANSMUTE_TILE);
  assert.equal(root.label, "L Polar Transform");
  assert.equal(root.children.length, 0);
});

test("descriptor runtime reports unsupported structures explicitly", () => {
  const unsupportedStructure = {
    id: "unsupported_structure",
    kind: "composite",
    species: "custom_exotic",
    children: [],
  };

  assert.equal(supportsReactionStructureDescriptorTree(unsupportedStructure), false);
  assert.deepEqual(buildReactionStructureDescriptorTree(unsupportedStructure), []);
});

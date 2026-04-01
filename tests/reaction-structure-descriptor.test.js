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

test("Z boson descriptor tree keeps the tri-binary particle row without a neutrino label", () => {
  const descriptorTree = buildReactionStructureDescriptorTree(
    createStructure("z_boson", "pro", "Z Boson")
  );
  const [root] = descriptorTree;

  assert.equal(root.renderMode, REACTION_STRUCTURE_RENDER_MODES.BINARY_SELECTOR_GRID);
  assert.equal(root.templateId, "z_boson");
  assert.equal(root.label, "Z Boson");
  assert.deepEqual(root.children.map((child) => child.slotCode), ["I", "M", "O"]);
});

test("W- boson descriptor tree uses the standard tri-binary particle row", () => {
  const descriptorTree = buildReactionStructureDescriptorTree(
    createStructure("w_minus_boson", "pro", "W- Boson")
  );
  const [root] = descriptorTree;

  assert.equal(root.renderMode, REACTION_STRUCTURE_RENDER_MODES.BINARY_SELECTOR_GRID);
  assert.equal(root.templateId, "w_minus_boson");
  assert.equal(root.label, "W- Boson");
  assert.deepEqual(root.children.map((child) => child.slotCode), ["I", "M", "O"]);
});

test("W+ boson descriptor tree uses the standard tri-binary particle row", () => {
  const descriptorTree = buildReactionStructureDescriptorTree(
    createStructure("w_plus_boson", "pro", "W+ Boson")
  );
  const [root] = descriptorTree;

  assert.equal(root.renderMode, REACTION_STRUCTURE_RENDER_MODES.BINARY_SELECTOR_GRID);
  assert.equal(root.templateId, "w_plus_boson");
  assert.equal(root.label, "W+ Boson");
  assert.deepEqual(root.children.map((child) => child.slotCode), ["I", "M", "O"]);
});

test("free architrinos descriptor tree uses a tri-slot grid with personality-only tiles", () => {
  const descriptorTree = buildReactionStructureDescriptorTree(
    createStructure("free_architrinos", "pro", "Free Architrinos")
  );
  const [root] = descriptorTree;

  assert.equal(root.renderMode, REACTION_STRUCTURE_RENDER_MODES.BINARY_SELECTOR_GRID);
  assert.equal(root.templateId, "free_architrinos");
  assert.equal(root.label, "Free Architrinos");
  assert.deepEqual(root.children.map((child) => child.slotCode), ["I", "M", "O"]);
  assert.deepEqual(root.children.map((child) => child.hasBinary), [false, false, false]);
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

test("associate descriptor tree produces a single operator tile", () => {
  const descriptorTree = buildReactionStructureDescriptorTree(
    createStructure("associate", "pro", "Associate")
  );
  const [root] = descriptorTree;

  assert.equal(root.renderMode, REACTION_STRUCTURE_RENDER_MODES.OPERATOR_TILE);
  assert.equal(root.label, "Associate");
  assert.equal(root.children.length, 0);
});

test("dissociate descriptor tree produces a single operator tile", () => {
  const descriptorTree = buildReactionStructureDescriptorTree(
    createStructure("dissociate", "pro", "Dissociate")
  );
  const [root] = descriptorTree;

  assert.equal(root.renderMode, REACTION_STRUCTURE_RENDER_MODES.OPERATOR_TILE);
  assert.equal(root.label, "Dissociate");
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

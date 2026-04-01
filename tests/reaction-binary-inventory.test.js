import test from "node:test";
import assert from "node:assert/strict";

import { createComposerReactionBinaryInventoryRuntime } from "../src/runtime/ComposerReactionBinaryInventoryRuntime.js";
import { createComposerReactionBinarySelectionRuntime } from "../src/runtime/ComposerReactionBinarySelectionRuntime.js";
import { buildReactionParticipantStructure } from "../src/apps/reaction/ReactionStructureBridgeRuntime.js";
import { buildReactionStructureDescriptorTree } from "../src/apps/reaction/ReactionStructureDescriptorRuntime.js";
import { clearNoetherCoreSlotOccupant } from "../src/domain/structure/StructureTransforms.js";

const supportsParticipantPolarity = (templateId) =>
  new Set(["noether_core", "electron", "neutrino", "down_quark", "up_quark", "fermion_gen1"]).has(
    String(templateId ?? "").trim().toLowerCase()
  );
const normalizeParticipantPolarity = (polarity) =>
  String(polarity ?? "").trim().toLowerCase() === "anti" ? "anti" : "pro";
const binarySelectionRuntime = createComposerReactionBinarySelectionRuntime({
  supportsParticipantPolarity,
  normalizeParticipantPolarity,
});
const { resolveBinaryChoiceInventory } = createComposerReactionBinaryInventoryRuntime({
  getBinaryChoiceInventory: binarySelectionRuntime.getBinaryChoiceInventory,
  getResolvedBinarySelectionMap: binarySelectionRuntime.getResolvedBinarySelectionMap,
  resolveBinarySelectorGroup: binarySelectionRuntime.resolveBinarySelectorGroup,
});

function createParticipant({ id, templateId, polarity = "pro", label = templateId, structure = null }) {
  const sourceStructure =
    structure ??
    buildReactionParticipantStructure(templateId, {
      id: `${id}_structure`,
      label,
      polarity,
    }).root;
  const participant = {
    id,
    side: "reactant",
    templateId,
    polarity,
    label,
    baseLabel: label,
    structure: sourceStructure,
    hierarchy: buildReactionStructureDescriptorTree(sourceStructure),
  };
  participant.binarySelections = binarySelectionRuntime.getInitialParticipantBinarySelections(participant);
  return participant;
}

test("binary inventory runtime resolves default up-quark slot inventories from participant selections", () => {
  const participant = createParticipant({
    id: "up_quark_a",
    templateId: "up_quark",
    label: "Up quark",
  });
  const innerNode = participant.hierarchy[0].children[0];

  assert.deepEqual(resolveBinaryChoiceInventory(participant, innerNode), {
    electrino: 1,
    positrino: 3,
  });
});

test("binary inventory runtime subtracts the hidden binary pair for trimmed slots", () => {
  const baseStructure = buildReactionParticipantStructure("electron", {
    id: "electron_trimmed",
    label: "Electron",
    polarity: "pro",
  }).root;
  const trimmedStructure = clearNoetherCoreSlotOccupant(
    baseStructure,
    "electron_trimmed/core",
    "outer"
  );
  const participant = createParticipant({
    id: "electron_trimmed",
    templateId: "electron",
    label: "Electron",
    structure: trimmedStructure,
  });
  const outerNode = participant.hierarchy[0].children[2];

  assert.equal(outerNode.hasBinary, false);
  assert.deepEqual(resolveBinaryChoiceInventory(participant, outerNode), {
    electrino: 2,
    positrino: 0,
  });
});

test("free architrinos resolve personality-only inventory without a Noether core wrapper", () => {
  const participant = createParticipant({
    id: "free_architrinos_a",
    templateId: "free_architrinos",
    label: "Free Architrinos",
  });
  const innerNode = participant.hierarchy[0].children[0];

  assert.equal(innerNode.hasBinary, false);
  assert.deepEqual(resolveBinaryChoiceInventory(participant, innerNode), {
    electrino: 1,
    positrino: 1,
  });
});

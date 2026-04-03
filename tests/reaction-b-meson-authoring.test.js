import test from "node:test";
import assert from "node:assert/strict";

import { buildReactionFlowDocument } from "../src/apps/reaction/ReactionFlowExportRuntime.js";
import { buildReactionParticipantStructure } from "../src/apps/reaction/ReactionStructureBridgeRuntime.js";
import { buildReactionStructureDescriptorTree } from "../src/apps/reaction/ReactionStructureDescriptorRuntime.js";
import { buildReactionSolverRequestDocument } from "../src/apps/reaction/ReactionSolverRequestExportRuntime.js";
import { createReactionBinaryInventoryRuntime } from "../src/apps/reaction/ReactionBinaryInventoryRuntime.js";
import { createReactionBinarySelectionRuntime } from "../src/apps/reaction/ReactionBinarySelectionRuntime.js";

const supportsParticipantPolarity = (templateId) =>
  new Set(["noether_core", "electron", "neutrino", "down_quark", "up_quark", "fermion_gen1"]).has(
    String(templateId ?? "").trim().toLowerCase()
  );
const normalizeParticipantPolarity = (polarity) =>
  String(polarity ?? "").trim().toLowerCase() === "anti" ? "anti" : "pro";

const {
  getBinaryChoiceInventory,
  getInitialParticipantBinarySelections,
  getResolvedBinarySelectionMap,
  resolveBinarySelectorGroup,
} = createReactionBinarySelectionRuntime({
  supportsParticipantPolarity,
  normalizeParticipantPolarity,
});
const { resolveBinaryChoiceInventory } = createReactionBinaryInventoryRuntime({
  getBinaryChoiceInventory,
  getResolvedBinarySelectionMap,
  resolveBinarySelectorGroup,
});

function createParticipant({ id, side, templateId, polarity = "", label }) {
  const structure = buildReactionParticipantStructure(templateId, {
    id: `${id}_structure`,
    label,
    polarity,
  });
  const participant = {
    id,
    side,
    templateId,
    polarity,
    baseLabel: label,
    label,
    structure: structure.root,
    hierarchy: buildReactionStructureDescriptorTree(structure.root),
    binarySelections: {},
  };
  participant.binarySelections = getInitialParticipantBinarySelections(participant);
  return participant;
}

test("b meson authored templates build explicit meson assemblies with bottom-quark occupancy", () => {
  const bPlus = buildReactionParticipantStructure("b_plus", {
    id: "b_plus_structure",
    label: "Positive B Meson",
  }).root;
  const antiB0 = buildReactionParticipantStructure("anti_b0", {
    id: "anti_b0_structure",
    label: "Neutral B Meson (b anti-d)",
  }).root;

  assert.equal(bPlus.classification?.family, "meson");
  assert.deepEqual(
    bPlus.children.map((child) => [child.species, child.traits?.polarity]),
    [
      ["up_quark", "pro"],
      ["bottom_quark", "anti"],
    ]
  );
  assert.deepEqual(
    antiB0.children.map((child) => [child.species, child.traits?.polarity]),
    [
      ["bottom_quark", "pro"],
      ["down_quark", "anti"],
    ]
  );
});

test("b meson descriptor trees preserve explicit bottom-quark labels", () => {
  const descriptorTree = buildReactionStructureDescriptorTree(
    buildReactionParticipantStructure("b0", {
      id: "b0_structure",
      label: "Neutral B Meson (d anti-b)",
    }).root
  );

  assert.equal(descriptorTree[0]?.label, "Neutral B Meson (d anti-b)");
  assert.deepEqual(
    descriptorTree[0]?.children?.map((child) => [child.label, child.templateId, child.polarity]),
    [
      ["Down Quark", "down_quark", "pro"],
      ["Bottom Quark", "down_quark", "anti"],
    ]
  );
});

test("solver request exporter classifies authored b mesons as mesons", () => {
  const snapshot = {
    participants: [
      createParticipant({
        id: "reactant_b_plus",
        side: "reactant",
        templateId: "b_plus",
        label: "Positive B Meson",
      }),
      createParticipant({
        id: "product_anti_b0",
        side: "product",
        templateId: "anti_b0",
        label: "Neutral B Meson (b anti-d)",
      }),
    ],
    mappings: [],
  };

  const document = buildReactionSolverRequestDocument({
    snapshot,
    resolveBinaryChoiceInventory,
  });

  assert.equal(document.participants[0]?.family, "meson");
  assert.equal(document.participants[1]?.family, "meson");
  assert.deepEqual(
    document.participants[0]?.nodes.map((node) => [node.templateId, node.polarity ?? ""]),
    [
      ["b_plus", ""],
      ["up_quark", "pro"],
      ["down_quark", "anti"],
    ]
  );
});

test("reaction-flow export keeps neutral b meson identities distinct on the shared contract path", () => {
  const snapshot = {
    participants: [
      createParticipant({
        id: "reactant_b0",
        side: "reactant",
        templateId: "b0",
        label: "Neutral B Meson (d anti-b)",
      }),
      createParticipant({
        id: "product_anti_b0",
        side: "product",
        templateId: "anti_b0",
        label: "Neutral B Meson (b anti-d)",
      }),
    ],
    mappings: [],
  };

  const document = buildReactionFlowDocument({
    snapshot,
    reactionId: "b_meson_test",
  });

  assert.equal(document.schema, "reaction-flow/v1");
  assert.equal(document.participants[0]?.structureKey, "b0");
  assert.equal(document.participants[1]?.structureKey, "anti_b0");
  assert(document.participants[0]?.tags.includes("b0"));
  assert(document.participants[1]?.tags.includes("anti_b0"));
  assert.notDeepEqual(document.participants[0], document.participants[1]);
});

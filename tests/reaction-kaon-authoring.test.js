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

test("kaon authored templates build explicit meson assemblies with strange-quark occupancy", () => {
  const kPlus = buildReactionParticipantStructure("k_plus", {
    id: "k_plus_structure",
    label: "Positive Kaon",
  }).root;
  const antiK0 = buildReactionParticipantStructure("sk0", {
    id: "sk0_structure",
    label: "Neutral Kaon (s anti-d)",
  }).root;

  assert.equal(kPlus.classification?.family, "meson");
  assert.deepEqual(
    kPlus.children.map((child) => [child.species, child.traits?.polarity]),
    [
      ["up_quark", "pro"],
      ["strange_quark", "anti"],
    ]
  );
  assert.deepEqual(
    antiK0.children.map((child) => [child.species, child.traits?.polarity]),
    [
      ["strange_quark", "pro"],
      ["down_quark", "anti"],
    ]
  );
});

test("kaon descriptor trees preserve explicit strange-quark labels", () => {
  const descriptorTree = buildReactionStructureDescriptorTree(
    buildReactionParticipantStructure("dk0", {
      id: "dk0_structure",
      label: "Neutral Kaon (d anti-s)",
    }).root
  );

  assert.equal(descriptorTree[0]?.label, "Neutral Kaon (d anti-s)");
  assert.deepEqual(
    descriptorTree[0]?.children?.map((child) => [child.label, child.templateId, child.polarity]),
    [
      ["Down Quark", "down_quark", "pro"],
      ["Strange Quark", "down_quark", "anti"],
    ]
  );
});

test("solver request exporter classifies authored kaons as mesons", () => {
  const snapshot = {
    participants: [
      createParticipant({
        id: "reactant_k_plus",
        side: "reactant",
        templateId: "k_plus",
        label: "Positive Kaon",
      }),
      createParticipant({
        id: "product_sk0",
        side: "product",
        templateId: "sk0",
        label: "Neutral Kaon (s anti-d)",
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
      ["k_plus", ""],
      ["up_quark", "pro"],
      ["down_quark", "anti"],
    ]
  );
});

test("reaction-flow export keeps neutral kaon identities distinct on the shared contract path", () => {
  const snapshot = {
    participants: [
      createParticipant({
        id: "reactant_k0",
        side: "reactant",
        templateId: "dk0",
        label: "Neutral Kaon (d anti-s)",
      }),
      createParticipant({
        id: "product_sk0",
        side: "product",
        templateId: "sk0",
        label: "Neutral Kaon (s anti-d)",
      }),
    ],
    mappings: [],
  };

  const document = buildReactionFlowDocument({
    snapshot,
    reactionId: "kaon_test",
  });

  assert.equal(document.schema, "reaction-flow/v1");
  assert.equal(document.participants[0]?.structureKey, "dk0");
  assert.equal(document.participants[1]?.structureKey, "sk0");
  assert(document.participants[0]?.tags.includes("dk0"));
  assert(document.participants[1]?.tags.includes("sk0"));
  assert.notDeepEqual(document.participants[0], document.participants[1]);
});

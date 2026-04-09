import test from "node:test";
import assert from "node:assert/strict";

import { buildReactionParticipantStructure } from "../src/apps/reaction/ReactionStructureBridgeRuntime.js";
import { buildReactionStructureDescriptorTree } from "../src/apps/reaction/ReactionStructureDescriptorRuntime.js";
import { buildReactionFlowDocument } from "../src/apps/reaction/ReactionFlowExportRuntime.js";
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

test("pion authored templates build explicit meson assemblies", () => {
  const neutralUp = buildReactionParticipantStructure("upi0", {
    id: "upi0_structure",
    label: "Neutral Pion (u anti-u)",
  }).root;
  const chargedPlus = buildReactionParticipantStructure("pi_plus", {
    id: "pi_plus_structure",
    label: "Positive Pion",
  }).root;

  assert.equal(neutralUp.classification?.family, "meson");
  assert.deepEqual(
    neutralUp.children.map((child) => [child.classification?.family, child.traits?.polarity]),
    [
      ["up_type_quark", "pro"],
      ["up_type_quark", "anti"],
    ]
  );
  assert.deepEqual(
    chargedPlus.children.map((child) => [child.classification?.family, child.traits?.polarity]),
    [
      ["up_type_quark", "pro"],
      ["down_type_quark", "anti"],
    ]
  );
});

test("pion descriptor trees preserve authored anti-quark rows", () => {
  const descriptorTree = buildReactionStructureDescriptorTree(
      buildReactionParticipantStructure("dpi0", {
        id: "dpi0_structure",
        label: "Neutral Pion (d anti-d)",
      }).root
  );

  assert.equal(descriptorTree[0]?.label, "Neutral Pion (d anti-d)");
  assert.deepEqual(
    descriptorTree[0]?.children?.map((child) => [child.templateId, child.polarity]),
    [
      ["down_quark", "pro"],
      ["down_quark", "anti"],
    ]
  );
});

test("solver request exporter classifies authored pions as mesons", () => {
  const snapshot = {
    participants: [
      createParticipant({
        id: "reactant_upi0",
        side: "reactant",
        templateId: "upi0",
        label: "Neutral Pion (u anti-u)",
      }),
      createParticipant({
        id: "product_pi_minus",
        side: "product",
        templateId: "pi_minus",
        label: "Negative Pion",
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
  assert.equal(document.participants[0]?.nodes.length, 3);
  assert.deepEqual(
    document.participants[0]?.nodes.map((node) => [node.templateId, node.parentId ?? "", node.polarity ?? ""]),
    [
      ["upi0", "", ""],
      ["up_quark", "reactant_upi0_structure", "pro"],
      ["up_quark", "reactant_upi0_structure", "anti"],
    ]
  );
  assert.equal(document.participants[1]?.nodes.length, 3);
  assert.deepEqual(
    document.participants[1]?.nodes.map((node) => [node.templateId, node.parentId ?? "", node.polarity ?? ""]),
    [
      ["pi_minus", "", ""],
      ["down_quark", "product_pi_minus_structure", "pro"],
      ["up_quark", "product_pi_minus_structure", "anti"],
    ]
  );
});

test("reaction-flow export keeps explicit neutral-pion authored form visible", () => {
  const snapshot = {
    participants: [
      createParticipant({
        id: "reactant_upi0",
        side: "reactant",
        templateId: "upi0",
        label: "Neutral Pion (u anti-u)",
      }),
      createParticipant({
        id: "product_upi0",
        side: "product",
        templateId: "upi0",
        label: "Neutral Pion (u anti-u)",
      }),
    ],
    mappings: [
      {
        id: "map_upi0_identity",
        sourceKey: "reactant_upi0::reactant_upi0_structure",
        targetKey: "product_upi0::product_upi0_structure",
        sourceRole: "reactant",
        targetRole: "product",
      },
    ],
  };

  const document = buildReactionFlowDocument({
    snapshot,
    reactionId: "pion_test",
  });

  assert.equal(document.participants[0]?.structureKey, "upi0");
  assert(document.participants[0]?.tags.includes("pi0"));
  assert(document.participants[0]?.tags.includes("upi0"));
});

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
    label: "Pi0 (u anti-u)",
  }).root;
  const chargedPlus = buildReactionParticipantStructure("pi_plus", {
    id: "pi_plus_structure",
    label: "Pi+",
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
      label: "Pi0 (d anti-d)",
    }).root
  );

  assert.equal(descriptorTree[0]?.label, "Pi0 (d anti-d)");
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
        label: "Pi0 (u anti-u)",
      }),
      createParticipant({
        id: "product_pi_minus",
        side: "product",
        templateId: "pi_minus",
        label: "Pi-",
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
});

test("reaction-flow export keeps explicit neutral-pion authored form visible", () => {
  const snapshot = {
    participants: [
      createParticipant({
        id: "reactant_upi0",
        side: "reactant",
        templateId: "upi0",
        label: "Pi0 (u anti-u)",
      }),
    ],
    mappings: [],
  };

  const document = buildReactionFlowDocument({
    snapshot,
    reactionId: "pion_test",
  });

  assert.equal(document.participants[0]?.structureKey, "upi0");
  assert(document.participants[0]?.tags.includes("pi0"));
  assert(document.participants[0]?.tags.includes("upi0"));
});

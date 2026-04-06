import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import {
  getReactionAnchorAttachmentSide,
  getReactionConnectionPolicy,
  isReactionConnectionAllowed,
  getReactionObjectSpec,
  getReactionObjectOccupiedSlots,
  inferReactionGenerationFromLabel,
  supportsReactionObjectPolarity,
} from "../src/apps/reaction/ReactionObjectRegistryRuntime.js";
import reactionObjectRegistryData from "../src/apps/reaction/ReactionObjectRegistryData.js";
import { buildReactionFlowDocument } from "../src/apps/reaction/ReactionFlowExportRuntime.js";
import { buildReactionParticipantStructure } from "../src/apps/reaction/ReactionStructureBridgeRuntime.js";
import { buildReactionStructureDescriptorTree } from "../src/apps/reaction/ReactionStructureDescriptorRuntime.js";

test("browser ESM registry data stays identical to the canonical JSON registry", () => {
  const canonicalJsonRegistry = JSON.parse(
    fs.readFileSync(
      new URL("../src/apps/reaction/reaction-object-registry.v1.json", import.meta.url),
      "utf8"
    )
  );

  assert.deepEqual(reactionObjectRegistryData, canonicalJsonRegistry);
});

test("reaction object registry exposes canonical placement and connector policy for center-only Free Architrinos", () => {
  const spec = getReactionObjectSpec("free_architrinos");

  assert.deepEqual(spec?.allowedPlacementClasses, ["center"]);
  assert.equal(getReactionAnchorAttachmentSide("center", "source"), "right");
  assert.equal(getReactionAnchorAttachmentSide("center", "target"), "left");
});

test("reaction object registry resolves anchor attachment sides from the registry placement policy", () => {
  assert.equal(getReactionAnchorAttachmentSide("reactant", "source"), "right");
  assert.equal(getReactionAnchorAttachmentSide("operator-input", "target"), "left");
  assert.equal(getReactionAnchorAttachmentSide("operator-output", "source"), "right");
  assert.equal(getReactionAnchorAttachmentSide("product", "target"), "left");
  assert.equal(getReactionAnchorAttachmentSide("center", "source"), "right");
  assert.equal(getReactionAnchorAttachmentSide("center", "target"), "left");
});

test("reaction object registry keeps Noether Pair and Noether Quad out of the center lane", () => {
  assert.deepEqual(getReactionObjectSpec("noether_pair")?.allowedPlacementClasses, [
    "reactant",
    "product",
  ]);
  assert.deepEqual(getReactionObjectSpec("noether_quad")?.allowedPlacementClasses, [
    "reactant",
    "product",
  ]);
});

test("reaction object registry encodes the forward-only connection policy", () => {
  const policy = getReactionConnectionPolicy();

  assert.equal(policy?.requireForwardLaneProgress, true);
  assert.equal(
    isReactionConnectionAllowed({
      sourcePlacementClass: "reactant",
      sourceRole: "reactant",
      sourceLaneNumber: 1,
      targetPlacementClass: "operator",
      targetRole: "operator-input",
      targetLaneNumber: 2,
    }),
    true
  );
  assert.equal(
    isReactionConnectionAllowed({
      sourcePlacementClass: "reactant",
      sourceRole: "reactant",
      sourceLaneNumber: 1,
      targetPlacementClass: "center",
      targetRole: "center",
      targetLaneNumber: 3,
    }),
    false
  );
  assert.equal(
    isReactionConnectionAllowed({
      sourcePlacementClass: "operator",
      sourceRole: "operator-output",
      sourceLaneNumber: 4,
      targetPlacementClass: "center",
      targetRole: "center",
      targetLaneNumber: 3,
    }),
    false
  );
  assert.equal(
    isReactionConnectionAllowed({
      sourcePlacementClass: "operator",
      sourceRole: "operator-output",
      sourceLaneNumber: 4,
      targetPlacementClass: "product",
      targetRole: "product",
      targetLaneNumber: 5,
    }),
    true
  );
});

test("reaction object registry remains the shared polarity authority for polarized families", () => {
  assert.equal(supportsReactionObjectPolarity("electron"), true);
  assert.equal(supportsReactionObjectPolarity("neutrino"), true);
  assert.equal(supportsReactionObjectPolarity("proton"), true);
});

test("reaction object registry resolves generation variants from canonical labels", () => {
  assert.equal(inferReactionGenerationFromLabel("electron", "Pro Muon"), "2");
  assert.equal(inferReactionGenerationFromLabel("neutrino", "Pro Electron Neutrino"), "1");
  assert.equal(inferReactionGenerationFromLabel("down_quark", "Anti Strange Quark"), "2");
});

test("reaction object registry resolves reduced noether-core occupied slots from the canonical label", () => {
  assert.deepEqual(
    getReactionObjectOccupiedSlots("noether_core", { label: "Pro Bi Binary" }),
    ["inner", "middle"]
  );
  assert.deepEqual(
    getReactionObjectOccupiedSlots("noether_core", { label: "Anti Uni Binary" }),
    ["inner"]
  );
});

test("reaction structure bridge infers occupied slots from registry-backed muon labels", () => {
  const structure = buildReactionParticipantStructure("electron", {
    id: "reactant_pro_muon_1_structure",
    polarity: "pro",
    label: "Pro Muon",
  });
  const [root] = buildReactionStructureDescriptorTree(structure.root);

  assert.deepEqual(root.children.map((child) => child.hasBinary), [true, true, false]);
});

test("reaction flow export rejects placements forbidden by the canonical registry", () => {
  const structure = buildReactionParticipantStructure("free_architrinos", {
    id: "invalid_free_architrinos_structure",
    label: "Free Architrinos",
  });
  const hierarchy = buildReactionStructureDescriptorTree(structure.root);
  const snapshot = {
    participants: [
      {
        id: "invalid_free_architrinos",
        side: "reactant",
        templateId: "free_architrinos",
        label: "Free Architrinos",
        provenanceId: "test",
        structure: structure.root,
        structureValidation: structure.validation,
        hierarchy,
        binarySelections: {},
        surfaceRowIndex: 0,
      },
    ],
    mappings: [],
  };

  assert.throws(
    () => buildReactionFlowDocument({ snapshot }),
    /cannot place invalid_free_architrinos as reactant for free_architrinos/i
  );
});

import test from "node:test";
import assert from "node:assert/strict";

import {
  classifyReactionNode,
  evaluateReactionMappingCandidate,
} from "../src/apps/reaction/ReactionStructureMappingRuntime.js";
import { createReactionBinarySelectionRuntime } from "../src/apps/reaction/ReactionBinarySelectionRuntime.js";
import { createReactionBinaryInventoryRuntime } from "../src/apps/reaction/ReactionBinaryInventoryRuntime.js";
import { buildReactionParticipantStructure } from "../src/apps/reaction/ReactionStructureBridgeRuntime.js";
import { buildReactionStructureDescriptorTree } from "../src/apps/reaction/ReactionStructureDescriptorRuntime.js";
import { clearNoetherCoreSlotOccupant } from "../src/domain/structure/StructureTransforms.js";

function createParticipant(templateId, polarity = "pro", overrideStructure = null) {
  const structure = overrideStructure
    ? { root: overrideStructure }
    : buildReactionParticipantStructure(templateId, {
        id: `${templateId}_${polarity}`,
        label: templateId,
        polarity,
      });
  return {
    id: `${templateId}_${polarity}`,
    templateId,
    polarity,
    structure: structure.root,
    hierarchy: buildReactionStructureDescriptorTree(structure.root),
  };
}

function createResolveBinaryChoiceInventory() {
  const binarySelectionRuntime = createReactionBinarySelectionRuntime();
  const { resolveBinaryChoiceInventory } = createReactionBinaryInventoryRuntime({
    getBinaryChoiceInventory: binarySelectionRuntime.getBinaryChoiceInventory,
    getResolvedBinarySelectionMap: binarySelectionRuntime.getResolvedBinarySelectionMap,
    resolveBinarySelectorGroup: binarySelectionRuntime.resolveBinarySelectorGroup,
  });
  return resolveBinaryChoiceInventory;
}

test("full tri-binary pro and anti Noether cores cannot map directly", () => {
  const sourceParticipant = createParticipant("noether_core", "pro");
  const targetParticipant = createParticipant("noether_core", "anti");
  const sourceNode = sourceParticipant.hierarchy[0];
  const targetNode = targetParticipant.hierarchy[0];

  const result = evaluateReactionMappingCandidate({
    sourceParticipant,
    sourceNode,
    targetParticipant,
    targetNode,
  });

  assert.equal(result.allowed, false);
  assert.match(result.reason, /cannot map directly/i);
});

test("gen II opposite-polarity Noether cores are allowed when conservative", () => {
  const proStructure = clearNoetherCoreSlotOccupant(
    buildReactionParticipantStructure("noether_core", {
      id: "pro_core",
      label: "Pro Noether core",
      polarity: "pro",
    }).root,
    "pro_core",
    "outer"
  );
  const antiStructure = clearNoetherCoreSlotOccupant(
    buildReactionParticipantStructure("noether_core", {
      id: "anti_core",
      label: "Anti Noether core",
      polarity: "anti",
    }).root,
    "anti_core",
    "outer"
  );

  const sourceParticipant = createParticipant("noether_core", "pro", proStructure);
  const targetParticipant = createParticipant("noether_core", "anti", antiStructure);
  const sourceNode = sourceParticipant.hierarchy[0];
  const targetNode = targetParticipant.hierarchy[0];

  const result = evaluateReactionMappingCandidate({
    sourceParticipant,
    sourceNode,
    targetParticipant,
    targetNode,
  });

  assert.equal(result.allowed, true);
});

test("muon root row-group inventory includes its reduced outer selector slot", () => {
  const participant = createParticipant("electron", "pro");
  participant.structure = buildReactionParticipantStructure("electron", {
    id: "muon_pro",
    label: "Pro Muon",
    polarity: "pro",
  }).root;
  participant.hierarchy = buildReactionStructureDescriptorTree(participant.structure);

  const result = classifyReactionNode(participant, participant.hierarchy[0], {
    resolveBinaryChoiceInventory: createResolveBinaryChoiceInventory(),
  });

  assert.deepEqual(result?.inventory, {
    proCore: 0,
    antiCore: 0,
    electrino: 8,
    positrino: 2,
  });
});

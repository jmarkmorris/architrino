import test from "node:test";
import assert from "node:assert/strict";

import { evaluateComposerReactionMappingCandidate } from "../src/runtime/ComposerReactionStructureMappingRuntime.js";
import { buildReactionParticipantStructure } from "../src/runtime/ComposerReactionStructureBridgeRuntime.js";
import { buildReactionStructureDescriptorTree } from "../src/runtime/ComposerReactionStructureDescriptorRuntime.js";
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

test("full tri-binary pro and anti Noether cores cannot map directly", () => {
  const sourceParticipant = createParticipant("noether_core", "pro");
  const targetParticipant = createParticipant("noether_core", "anti");
  const sourceNode = sourceParticipant.hierarchy[0];
  const targetNode = targetParticipant.hierarchy[0];

  const result = evaluateComposerReactionMappingCandidate({
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

  const result = evaluateComposerReactionMappingCandidate({
    sourceParticipant,
    sourceNode,
    targetParticipant,
    targetNode,
  });

  assert.equal(result.allowed, true);
});

import test from "node:test";
import assert from "node:assert/strict";

import { buildComposerReactionSolveState } from "../src/runtime/ComposerReactionSolveStateRuntime.js";
import { buildComposerReactionDirectRootPlan } from "../src/runtime/ComposerReactionSolveProposalRuntime.js";
import { buildReactionParticipantStructure } from "../src/runtime/ComposerReactionStructureBridgeRuntime.js";
import { buildReactionStructureDescriptorTree } from "../src/runtime/ComposerReactionStructureDescriptorRuntime.js";

function createParticipant({ id, side, templateId, polarity = "pro", label = templateId }) {
  const structure = buildReactionParticipantStructure(templateId, {
    id: `${id}_structure`,
    label,
    polarity,
  });
  return {
    id,
    side,
    templateId,
    polarity,
    baseLabel: label,
    label,
    structure: structure.root,
    hierarchy: buildReactionStructureDescriptorTree(structure.root),
  };
}

function buildSolveState(participants) {
  return buildComposerReactionSolveState({
    participants,
    buildNodeKey: (participantId, nodeId) => `${participantId}:${nodeId}`,
  });
}

test("direct-root plan maps exact conservative root-level provenance pairs", () => {
  const reactantProCore = createParticipant({
    id: "reactant_pro_core",
    side: "reactant",
    templateId: "noether_core",
    polarity: "pro",
    label: "Noether core",
  });
  const reactantAntiCore = createParticipant({
    id: "reactant_anti_core",
    side: "reactant",
    templateId: "noether_core",
    polarity: "anti",
    label: "Noether core",
  });
  const productAntiCore = createParticipant({
    id: "product_anti_core",
    side: "product",
    templateId: "noether_core",
    polarity: "anti",
    label: "Noether core",
  });
  const productProCore = createParticipant({
    id: "product_pro_core",
    side: "product",
    templateId: "noether_core",
    polarity: "pro",
    label: "Noether core",
  });

  const plan = buildComposerReactionDirectRootPlan({
    solveState: buildSolveState([
      reactantProCore,
      reactantAntiCore,
      productAntiCore,
      productProCore,
    ]),
  });

  assert.equal(plan.selectedMappings.length, 2);
  assert.deepEqual(
    plan.selectedMappings.map((entry) => [
      entry.sourceParticipant.polarity,
      entry.targetParticipant.polarity,
    ]),
    [
      ["anti", "anti"],
      ["pro", "pro"],
    ]
  );
  assert.equal(plan.unresolvedReactants.length, 0);
  assert.equal(plan.unresolvedProducts.length, 0);
});

test("direct-root plan leaves unsupported product matches unresolved", () => {
  const reactantCore = createParticipant({
    id: "reactant_core",
    side: "reactant",
    templateId: "noether_core",
    polarity: "pro",
    label: "Noether core",
  });
  const productCore = createParticipant({
    id: "product_core",
    side: "product",
    templateId: "noether_core",
    polarity: "anti",
    label: "Noether core",
  });

  const plan = buildComposerReactionDirectRootPlan({
    solveState: buildSolveState([reactantCore, productCore]),
  });

  assert.equal(plan.selectedMappings.length, 0);
  assert.equal(plan.unresolvedReactants.length, 1);
  assert.equal(plan.unresolvedProducts.length, 1);
});

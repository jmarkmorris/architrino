import test from "node:test";
import assert from "node:assert/strict";

import { buildComposerReactionSolveState } from "../src/runtime/ComposerReactionSolveStateRuntime.js";
import {
  buildComposerReactionSolvePlan,
  describeComposerReactionSolvePlan,
} from "../src/runtime/ComposerReactionSolveProposalRuntime.js";
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

function resolveCompositeBinaryChoiceInventory(participant = null, node = null) {
  const nodeId = String(node?.id ?? "");
  const templateId = String(participant?.templateId ?? "");
  let quarkKind = "";
  if (templateId === "neutron") {
    if (nodeId.includes("/quark_1/") || nodeId.includes("/quark_3/")) {
      quarkKind = "down";
    }
    if (nodeId.includes("/quark_2/")) {
      quarkKind = "up";
    }
  }
  if (templateId === "proton") {
    if (nodeId.includes("/quark_1/") || nodeId.includes("/quark_3/")) {
      quarkKind = "up";
    }
    if (nodeId.includes("/quark_2/")) {
      quarkKind = "down";
    }
  }
  if (quarkKind === "up") {
    return { positrino: 1 };
  }
  if (quarkKind === "down") {
    return { electrino: 1 };
  }
  return null;
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

  const plan = buildComposerReactionSolvePlan({
    solveState: buildSolveState([
      reactantProCore,
      reactantAntiCore,
      productAntiCore,
      productProCore,
    ]),
  });

  assert.equal(plan.selectedMappings.length, 2);
  assert.equal(plan.directProductCount, 2);
  assert.equal(plan.compositeProductCount, 0);
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

test("solve plan maps identical composite participants through their top-level child rows", () => {
  const participants = [
    createParticipant({
      id: "reactant_neutron",
      side: "reactant",
      templateId: "neutron",
      label: "Neutron",
    }),
    createParticipant({
      id: "reactant_proton",
      side: "reactant",
      templateId: "proton",
      label: "Proton",
    }),
    createParticipant({
      id: "reactant_higgs",
      side: "reactant",
      templateId: "higgs_cluster",
      label: "Higgs Cluster",
    }),
    createParticipant({
      id: "product_neutron",
      side: "product",
      templateId: "neutron",
      label: "Neutron",
    }),
    createParticipant({
      id: "product_proton",
      side: "product",
      templateId: "proton",
      label: "Proton",
    }),
    createParticipant({
      id: "product_higgs",
      side: "product",
      templateId: "higgs_cluster",
      label: "Higgs Cluster",
    }),
  ];

  const plan = buildComposerReactionSolvePlan({
    solveState: buildSolveState(participants),
    buildNodeKey: (participantId, nodeId) => `${participantId}:${nodeId}`,
    resolveBinaryChoiceInventory: resolveCompositeBinaryChoiceInventory,
  });

  assert.equal(plan.directProductCount, 0);
  assert.equal(plan.compositeProductCount, 3);
  assert.equal(plan.selectedCandidates.length, 3);
  assert.equal(plan.selectedMappings.length, 10);
  assert.equal(describeComposerReactionSolvePlan(plan), "3 composite products");
  assert.deepEqual(
    plan.selectedMappings.map((mapping) => [
      mapping.sourceParticipant.templateId,
      mapping.targetParticipant.templateId,
    ]),
    [
      ["higgs_cluster", "higgs_cluster"],
      ["higgs_cluster", "higgs_cluster"],
      ["higgs_cluster", "higgs_cluster"],
      ["higgs_cluster", "higgs_cluster"],
      ["neutron", "neutron"],
      ["neutron", "neutron"],
      ["neutron", "neutron"],
      ["proton", "proton"],
      ["proton", "proton"],
      ["proton", "proton"],
    ]
  );
  assert.equal(plan.unresolvedReactants.length, 0);
  assert.equal(plan.unresolvedProducts.length, 0);
});

test("solve plan leaves unsupported product matches unresolved", () => {
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

  const plan = buildComposerReactionSolvePlan({
    solveState: buildSolveState([reactantCore, productCore]),
  });

  assert.equal(plan.selectedMappings.length, 0);
  assert.equal(plan.unresolvedReactants.length, 1);
  assert.equal(plan.unresolvedProducts.length, 1);
});

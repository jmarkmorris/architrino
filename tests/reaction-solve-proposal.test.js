import test from "node:test";
import assert from "node:assert/strict";

import { buildComposerReactionSolveState } from "../src/runtime/ComposerReactionSolveStateRuntime.js";
import {
  buildComposerReactionSolvePlan,
  describeComposerReactionSolvePlan,
} from "../src/runtime/ComposerReactionSolveProposalRuntime.js";
import { createComposerReactionBinaryInventoryRuntime } from "../src/runtime/ComposerReactionBinaryInventoryRuntime.js";
import { createComposerReactionBinarySelectionRuntime } from "../src/runtime/ComposerReactionBinarySelectionRuntime.js";
import { buildReactionParticipantStructure } from "../src/runtime/ComposerReactionStructureBridgeRuntime.js";
import { buildReactionStructureDescriptorTree } from "../src/runtime/ComposerReactionStructureDescriptorRuntime.js";

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
} = createComposerReactionBinarySelectionRuntime({
  supportsParticipantPolarity,
  normalizeParticipantPolarity,
});
const { resolveBinaryChoiceInventory } = createComposerReactionBinaryInventoryRuntime({
  getBinaryChoiceInventory,
  getResolvedBinarySelectionMap,
  resolveBinarySelectorGroup,
});

function createParticipant({ id, side, templateId, polarity = "pro", label = templateId }) {
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
  };
  participant.binarySelections = getInitialParticipantBinarySelections(participant);
  return participant;
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
    resolveBinaryChoiceInventory,
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

test("solve plan preserves direct constituent rows across neutron-to-proton carry-through", () => {
  const reactantNeutron = createParticipant({
    id: "reactant_neutron",
    side: "reactant",
    templateId: "neutron",
    label: "Neutron",
  });
  const productProton = createParticipant({
    id: "product_proton",
    side: "product",
    templateId: "proton",
    label: "Proton",
  });

  const plan = buildComposerReactionSolvePlan({
    solveState: buildSolveState([reactantNeutron, productProton]),
    buildNodeKey: (participantId, nodeId) => `${participantId}:${nodeId}`,
    resolveBinaryChoiceInventory,
  });

  assert.equal(plan.directProductCount, 0);
  assert.equal(plan.compositeProductCount, 0);
  assert.equal(plan.partialCompositeProductCount, 1);
  assert.equal(plan.selectedCandidates.length, 0);
  assert.equal(plan.selectedPartialCandidates.length, 1);
  assert.equal(plan.selectedMappings.length, 2);
  assert.equal(describeComposerReactionSolvePlan(plan), "1 partial composite product");
  assert.deepEqual(
    plan.selectedMappings.map((mapping) => [
      mapping.sourceParticipant.templateId,
      mapping.sourceNode.templateId,
      mapping.targetParticipant.templateId,
      mapping.targetNode.templateId,
    ]),
    [
      ["neutron", "down_quark", "proton", "down_quark"],
      ["neutron", "up_quark", "proton", "up_quark"],
    ]
  );
  assert.equal(plan.unresolvedReactants.length, 1);
  assert.equal(plan.unresolvedProducts.length, 1);
});

test("solve plan can map a remaining neutron down-quark row to a standalone down-quark product", () => {
  const reactantNeutron = createParticipant({
    id: "reactant_neutron",
    side: "reactant",
    templateId: "neutron",
    label: "Neutron",
  });
  const productProton = createParticipant({
    id: "product_proton",
    side: "product",
    templateId: "proton",
    label: "Proton",
  });
  const productDownQuark = createParticipant({
    id: "product_down_quark",
    side: "product",
    templateId: "down_quark",
    polarity: "pro",
    label: "Down Quark",
  });

  const plan = buildComposerReactionSolvePlan({
    solveState: buildSolveState([reactantNeutron, productProton, productDownQuark]),
    buildNodeKey: (participantId, nodeId) => `${participantId}:${nodeId}`,
    resolveBinaryChoiceInventory,
  });

  assert.equal(plan.directProductCount, 1);
  assert.equal(plan.partialCompositeProductCount, 1);
  assert.equal(plan.selectedFragmentCandidates.length, 1);
  assert.equal(plan.selectedPartialCandidates.length, 1);
  assert.equal(plan.selectedMappings.length, 3);
  assert.equal(
    plan.selectedFragmentCandidates[0]?.targetParticipant?.templateId,
    "down_quark"
  );
  assert.deepEqual(
    plan.selectedMappings.map((mapping) => [
      mapping.sourceParticipant.templateId,
      mapping.sourceNode.templateId,
      mapping.targetParticipant.templateId,
      mapping.targetNode.templateId,
    ]),
    [
      ["neutron", "down_quark", "down_quark", "down_quark"],
      ["neutron", "down_quark", "proton", "down_quark"],
      ["neutron", "up_quark", "proton", "up_quark"],
    ]
  );
  assert.equal(plan.unresolvedReactants.length, 0);
  assert.equal(plan.unresolvedProducts.length, 1);
});

test("solve plan can map a standalone up-quark reactant into the remaining proton child row", () => {
  const reactantNeutron = createParticipant({
    id: "reactant_neutron",
    side: "reactant",
    templateId: "neutron",
    label: "Neutron",
  });
  const reactantUpQuark = createParticipant({
    id: "reactant_up_quark",
    side: "reactant",
    templateId: "up_quark",
    polarity: "pro",
    label: "Up Quark",
  });
  const productProton = createParticipant({
    id: "product_proton",
    side: "product",
    templateId: "proton",
    label: "Proton",
  });
  const productDownQuark = createParticipant({
    id: "product_down_quark",
    side: "product",
    templateId: "down_quark",
    polarity: "pro",
    label: "Down Quark",
  });

  const plan = buildComposerReactionSolvePlan({
    solveState: buildSolveState([
      reactantNeutron,
      reactantUpQuark,
      productProton,
      productDownQuark,
    ]),
    buildNodeKey: (participantId, nodeId) => `${participantId}:${nodeId}`,
    resolveBinaryChoiceInventory,
  });

  assert.equal(plan.directProductCount, 1);
  assert.equal(plan.partialCompositeProductCount, 1);
  assert.equal(plan.selectedFragmentCandidates.length, 1);
  assert.equal(plan.selectedPartialCandidates.length, 1);
  assert.equal(plan.selectedProductChildCandidates.length, 1);
  assert.equal(plan.selectedMappings.length, 4);
  assert.deepEqual(
    plan.selectedMappings.map((mapping) => [
      mapping.sourceParticipant.templateId,
      mapping.sourceNode.templateId,
      mapping.targetParticipant.templateId,
      mapping.targetNode.templateId,
    ]),
    [
      ["neutron", "down_quark", "down_quark", "down_quark"],
      ["neutron", "down_quark", "proton", "down_quark"],
      ["neutron", "up_quark", "proton", "up_quark"],
      ["up_quark", "up_quark", "proton", "up_quark"],
    ]
  );
  assert.equal(plan.unresolvedReactants.length, 0);
  assert.equal(plan.unresolvedProducts.length, 0);
});

test("solve plan inserts an associate operator for pro and anti Noether cores forming a photon", () => {
  const reactantProCore = createParticipant({
    id: "reactant_pro_core",
    side: "reactant",
    templateId: "noether_core",
    polarity: "pro",
    label: "Pro Noether core",
  });
  const reactantAntiCore = createParticipant({
    id: "reactant_anti_core",
    side: "reactant",
    templateId: "noether_core",
    polarity: "anti",
    label: "Anti Noether core",
  });
  const productPhoton = createParticipant({
    id: "product_photon",
    side: "product",
    templateId: "photon",
    label: "Photon",
  });

  const plan = buildComposerReactionSolvePlan({
    solveState: buildSolveState([reactantProCore, reactantAntiCore, productPhoton]),
    buildNodeKey: (participantId, nodeId) => `${participantId}:${nodeId}`,
    resolveBinaryChoiceInventory,
  });

  assert.equal(plan.associatedProductCount, 1);
  assert.equal(plan.selectedAssociateCandidates.length, 1);
  assert.equal(plan.participantAdditions.length, 1);
  assert.equal(plan.participantAdditions[0]?.kind, "operator");
  assert.equal(plan.participantAdditions[0]?.templateId, "associate");
  assert.equal(plan.participantAdditions[0]?.operatorLaneIndex, 1);
  assert.match(
    String(plan.participantAdditions[0]?.ref ?? ""),
    /^associate:reactant_pro_core:[^:]+:reactant_anti_core:[^:]+:product_photon$/
  );
  assert.equal(plan.selectedMappings.length, 4);
  assert.equal(describeComposerReactionSolvePlan(plan), "1 associated product");
  assert.deepEqual(
    plan.selectedMappings.map((mapping) => [
      mapping.sourceEndpoint?.role ?? null,
      mapping.targetEndpoint?.role ?? null,
      mapping.targetNode?.polarity ?? null,
    ]),
    [
      ["reactant", "operator-input", null],
      ["reactant", "operator-input", null],
      ["operator-output", "product", "pro"],
      ["operator-output", "product", "anti"],
    ]
  );
  assert.equal(plan.unresolvedReactants.length, 0);
  assert.equal(plan.unresolvedProducts.length, 0);
});

test("solve plan can consume Higgs-cluster noether-core rows into two associated photons", () => {
  const reactantHiggs = createParticipant({
    id: "reactant_higgs",
    side: "reactant",
    templateId: "higgs_cluster",
    label: "Higgs Cluster",
  });
  const productPhotonA = createParticipant({
    id: "product_photon_a",
    side: "product",
    templateId: "photon",
    label: "Photon",
  });
  const productPhotonB = createParticipant({
    id: "product_photon_b",
    side: "product",
    templateId: "photon",
    label: "Photon",
  });

  const plan = buildComposerReactionSolvePlan({
    solveState: buildSolveState([reactantHiggs, productPhotonA, productPhotonB]),
    buildNodeKey: (participantId, nodeId) => `${participantId}:${nodeId}`,
    resolveBinaryChoiceInventory,
  });

  assert.equal(plan.associatedProductCount, 2);
  assert.equal(plan.partialCompositeProductCount, 0);
  assert.equal(plan.selectedAssociateCandidates.length, 2);
  assert.equal(plan.participantAdditions.length, 2);
  assert.equal(plan.selectedMappings.length, 8);
  assert.equal(describeComposerReactionSolvePlan(plan), "2 associated products");
  assert.deepEqual(
    plan.selectedMappings.map((mapping) => [
      mapping.sourceEndpoint?.role ?? null,
      mapping.targetEndpoint?.role ?? null,
    ]),
    [
      ["reactant", "operator-input"],
      ["reactant", "operator-input"],
      ["operator-output", "product"],
      ["operator-output", "product"],
      ["reactant", "operator-input"],
      ["reactant", "operator-input"],
      ["operator-output", "product"],
      ["operator-output", "product"],
    ]
  );
  assert.equal(plan.unresolvedReactants.length, 0);
  assert.equal(plan.unresolvedProducts.length, 0);
});

test("solve plan prefers two full associate photons over fragment-plus-partial residue", () => {
  const reactantHiggs = createParticipant({
    id: "reactant_higgs",
    side: "reactant",
    templateId: "higgs_cluster",
    label: "Higgs Cluster",
  });
  const productPhotonA = createParticipant({
    id: "product_photon_a",
    side: "product",
    templateId: "photon",
    label: "Photon A",
  });
  const productPhotonB = createParticipant({
    id: "product_photon_b",
    side: "product",
    templateId: "photon",
    label: "Photon B",
  });
  const productCore = createParticipant({
    id: "product_core",
    side: "product",
    templateId: "noether_core",
    polarity: "pro",
    label: "Pro Noether core",
  });

  const plan = buildComposerReactionSolvePlan({
    solveState: buildSolveState([
      reactantHiggs,
      productPhotonA,
      productPhotonB,
      productCore,
    ]),
    buildNodeKey: (participantId, nodeId) => `${participantId}:${nodeId}`,
    resolveBinaryChoiceInventory,
  });

  assert.equal(plan.directProductCount, 0);
  assert.equal(plan.associatedProductCount, 2);
  assert.equal(plan.partialCompositeProductCount, 0);
  assert.equal(plan.selectedFragmentCandidates.length, 0);
  assert.equal(plan.selectedAssociateCandidates.length, 2);
  assert.equal(plan.selectedMappings.length, 8);
  assert.equal(describeComposerReactionSolvePlan(plan), "2 associated products");
  assert.deepEqual(
    plan.selectedAssociateCandidates.map((candidate) => candidate.targetParticipant.id),
    ["product_photon_a", "product_photon_b"]
  );
  assert.equal(plan.unresolvedReactants.length, 0);
  assert.deepEqual(
    plan.unresolvedProducts.map((entry) => entry.participant.id),
    ["product_core"]
  );
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

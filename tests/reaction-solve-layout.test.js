import test from "node:test";
import assert from "node:assert/strict";

import { applyReactionSolveLayout } from "../src/apps/reaction/ReactionSolveLayoutRuntime.js";

function createEntry({
  participantId,
  side,
  templateId,
  surfaceRowIndex,
  rootId,
  childIds = [],
}) {
  return {
    participant: {
      id: participantId,
      side,
      templateId,
      surfaceRowIndex,
    },
    rootNode: {
      id: rootId,
      templateId,
      children: childIds.map((childId, index) => ({
        id: childId,
        templateId: "noether_core",
        polarity: index % 2 === 0 ? "pro" : "anti",
      })),
    },
  };
}

test("solve layout places inserted operators near the midpoint of their connected rows", () => {
  const reactantHiggs = createEntry({
    participantId: "reactant_higgs",
    side: "reactant",
    templateId: "higgs_cluster",
    surfaceRowIndex: 0,
    rootId: "reactant_higgs_root",
    childIds: [
      "reactant_higgs_pro_1",
      "reactant_higgs_anti_1",
      "reactant_higgs_pro_2",
      "reactant_higgs_anti_2",
    ],
  });
  const productPhotonA = createEntry({
    participantId: "product_photon_a",
    side: "product",
    templateId: "photon",
    surfaceRowIndex: 0,
    rootId: "product_photon_a_root",
    childIds: ["product_photon_a_pro", "product_photon_a_anti"],
  });
  const productPhotonB = createEntry({
    participantId: "product_photon_b",
    side: "product",
    templateId: "photon",
    surfaceRowIndex: 2,
    rootId: "product_photon_b_root",
    childIds: ["product_photon_b_pro", "product_photon_b_anti"],
  });

  const laidOutPlan = applyReactionSolveLayout({
    solveState: {
      reactants: [reactantHiggs],
      products: [productPhotonA, productPhotonB],
      operators: [],
      centerAssemblies: [],
    },
    plan: {
      participantAdditions: [
        {
          ref: "associate:upper",
          kind: "operator",
          templateId: "associate",
          operatorLaneIndex: 1,
        },
        {
          ref: "associate:lower",
          kind: "operator",
          templateId: "associate",
          operatorLaneIndex: 1,
        },
      ],
      selectedMappings: [
        {
          sourceParticipant: reactantHiggs.participant,
          sourceNode: reactantHiggs.rootNode.children[0],
          sourceEndpoint: { participant: reactantHiggs.participant, node: reactantHiggs.rootNode.children[0], role: "reactant" },
          targetEndpoint: { participantRef: "associate:upper", role: "operator-input", anchorInstanceIndex: 0 },
        },
        {
          sourceParticipant: reactantHiggs.participant,
          sourceNode: reactantHiggs.rootNode.children[1],
          sourceEndpoint: { participant: reactantHiggs.participant, node: reactantHiggs.rootNode.children[1], role: "reactant" },
          targetEndpoint: { participantRef: "associate:upper", role: "operator-input", anchorInstanceIndex: 0 },
        },
        {
          sourceEndpoint: { participantRef: "associate:upper", role: "operator-output", anchorInstanceIndex: 0 },
          targetParticipant: productPhotonA.participant,
          targetNode: productPhotonA.rootNode.children[0],
          targetEndpoint: { participant: productPhotonA.participant, node: productPhotonA.rootNode.children[0], role: "product" },
        },
        {
          sourceEndpoint: { participantRef: "associate:upper", role: "operator-output", anchorInstanceIndex: 0 },
          targetParticipant: productPhotonA.participant,
          targetNode: productPhotonA.rootNode.children[1],
          targetEndpoint: { participant: productPhotonA.participant, node: productPhotonA.rootNode.children[1], role: "product" },
        },
        {
          sourceParticipant: reactantHiggs.participant,
          sourceNode: reactantHiggs.rootNode.children[2],
          sourceEndpoint: { participant: reactantHiggs.participant, node: reactantHiggs.rootNode.children[2], role: "reactant" },
          targetEndpoint: { participantRef: "associate:lower", role: "operator-input", anchorInstanceIndex: 0 },
        },
        {
          sourceParticipant: reactantHiggs.participant,
          sourceNode: reactantHiggs.rootNode.children[3],
          sourceEndpoint: { participant: reactantHiggs.participant, node: reactantHiggs.rootNode.children[3], role: "reactant" },
          targetEndpoint: { participantRef: "associate:lower", role: "operator-input", anchorInstanceIndex: 0 },
        },
        {
          sourceEndpoint: { participantRef: "associate:lower", role: "operator-output", anchorInstanceIndex: 0 },
          targetParticipant: productPhotonB.participant,
          targetNode: productPhotonB.rootNode.children[0],
          targetEndpoint: { participant: productPhotonB.participant, node: productPhotonB.rootNode.children[0], role: "product" },
        },
        {
          sourceEndpoint: { participantRef: "associate:lower", role: "operator-output", anchorInstanceIndex: 0 },
          targetParticipant: productPhotonB.participant,
          targetNode: productPhotonB.rootNode.children[1],
          targetEndpoint: { participant: productPhotonB.participant, node: productPhotonB.rootNode.children[1], role: "product" },
        },
      ],
    },
  });

  assert.deepEqual(
    laidOutPlan.participantAdditions.map((entry) => entry.operatorSlotIndex),
    [1, 3]
  );
});

test("solve layout anchors associate operators on their product-side row centers in mixed-height solves", () => {
  const reactantHiggs = createEntry({
    participantId: "reactant_higgs",
    side: "reactant",
    templateId: "higgs_cluster",
    surfaceRowIndex: 0,
    rootId: "reactant_higgs_root",
    childIds: [
      "reactant_higgs_pro_1",
      "reactant_higgs_anti_1",
      "reactant_higgs_pro_2",
      "reactant_higgs_anti_2",
    ],
  });
  const productPhotonA = createEntry({
    participantId: "product_photon_a",
    side: "product",
    templateId: "photon",
    surfaceRowIndex: 3,
    rootId: "product_photon_a_root",
    childIds: ["product_photon_a_pro", "product_photon_a_anti"],
  });
  const productPhotonB = createEntry({
    participantId: "product_photon_b",
    side: "product",
    templateId: "photon",
    surfaceRowIndex: 5,
    rootId: "product_photon_b_root",
    childIds: ["product_photon_b_pro", "product_photon_b_anti"],
  });

  const laidOutPlan = applyReactionSolveLayout({
    solveState: {
      reactants: [reactantHiggs],
      products: [productPhotonA, productPhotonB],
      operators: [],
      centerAssemblies: [],
    },
    plan: {
      participantAdditions: [
        {
          ref: "associate:upper",
          kind: "operator",
          templateId: "associate",
          operatorLaneIndex: 1,
        },
        {
          ref: "associate:lower",
          kind: "operator",
          templateId: "associate",
          operatorLaneIndex: 1,
        },
      ],
      selectedMappings: [
        {
          sourceParticipant: reactantHiggs.participant,
          sourceNode: reactantHiggs.rootNode.children[0],
          sourceEndpoint: { participant: reactantHiggs.participant, node: reactantHiggs.rootNode.children[0], role: "reactant" },
          targetEndpoint: { participantRef: "associate:upper", role: "operator-input", anchorInstanceIndex: 0 },
        },
        {
          sourceParticipant: reactantHiggs.participant,
          sourceNode: reactantHiggs.rootNode.children[1],
          sourceEndpoint: { participant: reactantHiggs.participant, node: reactantHiggs.rootNode.children[1], role: "reactant" },
          targetEndpoint: { participantRef: "associate:upper", role: "operator-input", anchorInstanceIndex: 0 },
        },
        {
          sourceEndpoint: { participantRef: "associate:upper", role: "operator-output", anchorInstanceIndex: 0 },
          targetParticipant: productPhotonA.participant,
          targetNode: productPhotonA.rootNode.children[0],
          targetEndpoint: { participant: productPhotonA.participant, node: productPhotonA.rootNode.children[0], role: "product" },
        },
        {
          sourceEndpoint: { participantRef: "associate:upper", role: "operator-output", anchorInstanceIndex: 0 },
          targetParticipant: productPhotonA.participant,
          targetNode: productPhotonA.rootNode.children[1],
          targetEndpoint: { participant: productPhotonA.participant, node: productPhotonA.rootNode.children[1], role: "product" },
        },
        {
          sourceParticipant: reactantHiggs.participant,
          sourceNode: reactantHiggs.rootNode.children[2],
          sourceEndpoint: { participant: reactantHiggs.participant, node: reactantHiggs.rootNode.children[2], role: "reactant" },
          targetEndpoint: { participantRef: "associate:lower", role: "operator-input", anchorInstanceIndex: 0 },
        },
        {
          sourceParticipant: reactantHiggs.participant,
          sourceNode: reactantHiggs.rootNode.children[3],
          sourceEndpoint: { participant: reactantHiggs.participant, node: reactantHiggs.rootNode.children[3], role: "reactant" },
          targetEndpoint: { participantRef: "associate:lower", role: "operator-input", anchorInstanceIndex: 0 },
        },
        {
          sourceEndpoint: { participantRef: "associate:lower", role: "operator-output", anchorInstanceIndex: 0 },
          targetParticipant: productPhotonB.participant,
          targetNode: productPhotonB.rootNode.children[0],
          targetEndpoint: { participant: productPhotonB.participant, node: productPhotonB.rootNode.children[0], role: "product" },
        },
        {
          sourceEndpoint: { participantRef: "associate:lower", role: "operator-output", anchorInstanceIndex: 0 },
          targetParticipant: productPhotonB.participant,
          targetNode: productPhotonB.rootNode.children[1],
          targetEndpoint: { participant: productPhotonB.participant, node: productPhotonB.rootNode.children[1], role: "product" },
        },
      ],
    },
  });

  assert.deepEqual(
    laidOutPlan.participantAdditions.map((entry) => entry.operatorSlotIndex),
    [4, 6]
  );
});

test("solve layout preserves source-side vertical order when multiple associates share one target row center", () => {
  const reactantMid = createEntry({
    participantId: "reactant_mid",
    side: "reactant",
    templateId: "higgs_cluster",
    surfaceRowIndex: 6,
    rootId: "reactant_mid_root",
    childIds: ["reactant_mid_pro", "reactant_mid_anti"],
  });
  const reactantLow = createEntry({
    participantId: "reactant_low",
    side: "reactant",
    templateId: "higgs_cluster",
    surfaceRowIndex: 8,
    rootId: "reactant_low_root",
    childIds: ["reactant_low_pro", "reactant_low_anti"],
  });
  const productPhotonA = createEntry({
    participantId: "product_photon_a",
    side: "product",
    templateId: "photon",
    surfaceRowIndex: 3,
    rootId: "product_photon_a_root",
    childIds: ["product_photon_a_pro", "product_photon_a_anti"],
  });
  const productPhotonB = createEntry({
    participantId: "product_photon_b",
    side: "product",
    templateId: "photon",
    surfaceRowIndex: 3,
    rootId: "product_photon_b_root",
    childIds: ["product_photon_b_pro", "product_photon_b_anti"],
  });

  const laidOutPlan = applyReactionSolveLayout({
    solveState: {
      reactants: [reactantMid, reactantLow],
      products: [productPhotonA, productPhotonB],
      operators: [],
      centerAssemblies: [],
    },
    plan: {
      participantAdditions: [
        {
          ref: "associate:a_mid",
          kind: "operator",
          templateId: "associate",
          operatorLaneIndex: 1,
        },
        {
          ref: "associate:b_low",
          kind: "operator",
          templateId: "associate",
          operatorLaneIndex: 1,
        },
      ],
      selectedMappings: [
        {
          sourceParticipant: reactantMid.participant,
          sourceNode: reactantMid.rootNode.children[0],
          sourceEndpoint: { participant: reactantMid.participant, node: reactantMid.rootNode.children[0], role: "reactant" },
          targetEndpoint: { participantRef: "associate:a_mid", role: "operator-input", anchorInstanceIndex: 0 },
        },
        {
          sourceParticipant: reactantMid.participant,
          sourceNode: reactantMid.rootNode.children[1],
          sourceEndpoint: { participant: reactantMid.participant, node: reactantMid.rootNode.children[1], role: "reactant" },
          targetEndpoint: { participantRef: "associate:a_mid", role: "operator-input", anchorInstanceIndex: 0 },
        },
        {
          sourceEndpoint: { participantRef: "associate:a_mid", role: "operator-output", anchorInstanceIndex: 0 },
          targetParticipant: productPhotonA.participant,
          targetNode: productPhotonA.rootNode.children[0],
          targetEndpoint: { participant: productPhotonA.participant, node: productPhotonA.rootNode.children[0], role: "product" },
        },
        {
          sourceEndpoint: { participantRef: "associate:a_mid", role: "operator-output", anchorInstanceIndex: 0 },
          targetParticipant: productPhotonA.participant,
          targetNode: productPhotonA.rootNode.children[1],
          targetEndpoint: { participant: productPhotonA.participant, node: productPhotonA.rootNode.children[1], role: "product" },
        },
        {
          sourceParticipant: reactantLow.participant,
          sourceNode: reactantLow.rootNode.children[0],
          sourceEndpoint: { participant: reactantLow.participant, node: reactantLow.rootNode.children[0], role: "reactant" },
          targetEndpoint: { participantRef: "associate:b_low", role: "operator-input", anchorInstanceIndex: 0 },
        },
        {
          sourceParticipant: reactantLow.participant,
          sourceNode: reactantLow.rootNode.children[1],
          sourceEndpoint: { participant: reactantLow.participant, node: reactantLow.rootNode.children[1], role: "reactant" },
          targetEndpoint: { participantRef: "associate:b_low", role: "operator-input", anchorInstanceIndex: 0 },
        },
        {
          sourceEndpoint: { participantRef: "associate:b_low", role: "operator-output", anchorInstanceIndex: 0 },
          targetParticipant: productPhotonB.participant,
          targetNode: productPhotonB.rootNode.children[0],
          targetEndpoint: { participant: productPhotonB.participant, node: productPhotonB.rootNode.children[0], role: "product" },
        },
        {
          sourceEndpoint: { participantRef: "associate:b_low", role: "operator-output", anchorInstanceIndex: 0 },
          targetParticipant: productPhotonB.participant,
          targetNode: productPhotonB.rootNode.children[1],
          targetEndpoint: { participant: productPhotonB.participant, node: productPhotonB.rootNode.children[1], role: "product" },
        },
      ],
    },
  });

  assert.deepEqual(
    Object.fromEntries(
      laidOutPlan.participantAdditions.map((entry) => [entry.ref, entry.operatorSlotIndex])
    ),
    {
      "associate:a_mid": 4,
      "associate:b_low": 5,
    }
  );
});

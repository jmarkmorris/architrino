import test from "node:test";
import assert from "node:assert/strict";

import { applyComposerReactionSolvePlan } from "../src/runtime/ComposerReactionSolveProjectionRuntime.js";

test("solve projection creates operator participants and resolves deferred mapping endpoints", () => {
  const productParticipant = {
    id: "product_photon",
    templateId: "photon",
    hierarchy: [{ id: "product_photon_root" }],
  };
  const createdOperators = [];
  const appliedMappings = [];

  const result = applyComposerReactionSolvePlan({
    plan: {
      participantAdditions: [
        {
          ref: "associate:1",
          kind: "operator",
          templateId: "associate",
          operatorLaneIndex: 1,
          operatorSlotIndex: 3,
        },
      ],
      selectedMappings: [
        {
          sourceEndpoint: {
            nodeKey: "reactant_pro_core:reactant_pro_core_root",
            role: "reactant",
          },
          targetEndpoint: {
            participantRef: "associate:1",
            role: "operator-input",
            anchorInstanceIndex: 0,
          },
        },
        {
          sourceEndpoint: {
            participantRef: "associate:1",
            role: "operator-output",
            anchorInstanceIndex: 0,
          },
          targetEndpoint: {
            participant: productParticipant,
            node: productParticipant.hierarchy[0],
            role: "product",
          },
        },
      ],
    },
    createOperatorParticipant: (templateId, operatorLaneIndex, options = {}) => {
      const participant = {
        id: `operator_${createdOperators.length + 1}`,
        templateId,
        operatorLaneIndex,
        operatorSlotIndex: options.operatorSlotIndex ?? null,
        isSolveGenerated: options.isSolveGenerated ?? false,
        hierarchy: [{ id: `operator_${createdOperators.length + 1}_root` }],
      };
      createdOperators.push(participant);
      return participant;
    },
    getParticipantRootNode: (participant) => participant?.hierarchy?.[0] ?? null,
    buildNodeKey: (participantId, nodeId) => `${participantId}:${nodeId}`,
    addOrReplaceMapping: (
      sourceKey,
      sourceRole,
      targetKey,
      targetRole,
      sourceAnchorInstanceIndex,
      targetAnchorInstanceIndex
    ) => {
      appliedMappings.push({
        sourceKey,
        sourceRole,
        targetKey,
        targetRole,
        sourceAnchorInstanceIndex,
        targetAnchorInstanceIndex,
      });
      return `mapping_${appliedMappings.length}`;
    },
  });

  assert.equal(createdOperators.length, 1);
  assert.equal(result.addedParticipants.length, 1);
  assert.equal(createdOperators[0].operatorSlotIndex, 3);
  assert.equal(createdOperators[0].isSolveGenerated, true);
  assert.deepEqual(result.appliedMappingIds, ["mapping_1", "mapping_2"]);
  assert.deepEqual(appliedMappings, [
    {
      sourceKey: "reactant_pro_core:reactant_pro_core_root",
      sourceRole: "reactant",
      targetKey: "operator_1:operator_1_root",
      targetRole: "operator-input",
      sourceAnchorInstanceIndex: {
        sourceAnchorInstanceIndex: null,
        targetAnchorInstanceIndex: 0,
      },
      targetAnchorInstanceIndex: undefined,
    },
    {
      sourceKey: "operator_1:operator_1_root",
      sourceRole: "operator-output",
      targetKey: "product_photon:product_photon_root",
      targetRole: "product",
      sourceAnchorInstanceIndex: {
        sourceAnchorInstanceIndex: 0,
        targetAnchorInstanceIndex: null,
      },
      targetAnchorInstanceIndex: undefined,
    },
  ]);
});

test("solve projection marks explicit dissociated composites before applying mappings", () => {
  const reactantHiggs = {
    id: "reactant_higgs",
    side: "reactant",
    templateId: "higgs_cluster",
    isAutoDissociatedComposite: false,
    hierarchy: [{ id: "reactant_higgs_root" }],
  };
  const markedParticipants = [];

  const result = applyComposerReactionSolvePlan({
    plan: {
      dissociatedCompositeParticipants: [reactantHiggs],
      selectedMappings: [],
    },
    markParticipantAutoDissociated: (participant) => {
      participant.isAutoDissociatedComposite = true;
      markedParticipants.push(participant.id);
      return true;
    },
  });

  assert.deepEqual(markedParticipants, ["reactant_higgs"]);
  assert.deepEqual(result.markedDissociatedParticipantIds, ["reactant_higgs"]);
  assert.equal(reactantHiggs.isAutoDissociatedComposite, true);
});

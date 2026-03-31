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
    createOperatorParticipant: (templateId, operatorLaneIndex) => {
      const participant = {
        id: `operator_${createdOperators.length + 1}`,
        templateId,
        operatorLaneIndex,
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

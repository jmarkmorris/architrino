import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { applyReactionSolvePlan } from "../src/apps/reaction/ReactionSolveProjectionRuntime.js";
import { buildReactionParticipantStructure } from "../src/apps/reaction/ReactionStructureBridgeRuntime.js";
import { buildReactionStructureDescriptorTree } from "../src/apps/reaction/ReactionStructureDescriptorRuntime.js";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

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

test("solve projection creates operator participants and resolves deferred mapping endpoints", () => {
  const productParticipant = {
    id: "product_photon",
    templateId: "photon",
    hierarchy: [{ id: "product_photon_root" }],
  };
  const createdOperators = [];
  const appliedMappings = [];

  const result = applyReactionSolvePlan({
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
    templateId: "noether_quad",
    isAutoDissociatedComposite: false,
    hierarchy: [{ id: "reactant_higgs_root" }],
  };
  const markedParticipants = [];

  const result = applyReactionSolvePlan({
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

test("solve projection accepts semantic dissociation records without legacy participant objects", () => {
  const reactantHiggs = {
    id: "reactant_higgs",
    side: "reactant",
    templateId: "noether_quad",
    isAutoDissociatedComposite: false,
    hierarchy: [{ id: "reactant_higgs_root" }],
  };
  const participants = [reactantHiggs];

  const result = applyReactionSolvePlan({
    plan: {
      dissociation: {
        autoDissociatedParticipants: [
          {
            participantId: "reactant_higgs",
            rootNodeId: "reactant_higgs_root",
            consumedNodeIds: ["reactant_higgs_root/core_pro_1"],
            remainingNodeIds: ["reactant_higgs_root/core_anti_1"],
          },
        ],
      },
      selectedMappings: [],
    },
    participants,
    markParticipantAutoDissociated: (participant) => {
      participant.isAutoDissociatedComposite = true;
      return true;
    },
  });

  assert.deepEqual(result.markedDissociatedParticipantIds, ["reactant_higgs"]);
  assert.equal(reactantHiggs.isAutoDissociatedComposite, true);
});

test("solve projection accepts solver-result fixtures with semantic endpoints and placement hints", () => {
  const resultFixture = readJson("content/contracts/examples/solver-result/associate_photon_result.v1.json");
  const participants = [
    createParticipant({
      id: "reactant_pro_core",
      side: "reactant",
      templateId: "noether_core",
      polarity: "pro",
      label: "Pro Noether core",
    }),
    createParticipant({
      id: "reactant_anti_core",
      side: "reactant",
      templateId: "noether_core",
      polarity: "anti",
      label: "Anti Noether core",
    }),
    createParticipant({
      id: "product_photon",
      side: "product",
      templateId: "photon",
      label: "Photon",
    }),
  ];
  const participantsById = new Map(participants.map((participant) => [participant.id, participant]));
  const createdOperators = [];
  const appliedMappings = [];

  const projection = applyReactionSolvePlan({
    result: resultFixture,
    getParticipantById: (participantId) => participantsById.get(participantId) ?? null,
    getParticipantRootNode: (participant) => participant?.hierarchy?.[0] ?? null,
    buildNodeKey: (participantId, nodeId) => `${participantId}:${nodeId}`,
    createOperatorParticipant: (templateId, operatorLaneIndex, options = {}) => {
      const participant = {
        id: `operator_${createdOperators.length + 1}`,
        side: "operator",
        templateId,
        operatorLaneIndex,
        operatorSlotIndex: options.operatorSlotIndex ?? null,
        isSolveGenerated: options.isSolveGenerated ?? false,
        hierarchy: [{ id: `operator_${createdOperators.length + 1}_root` }],
      };
      createdOperators.push(participant);
      return participant;
    },
    addOrReplaceMapping: (sourceKey, sourceRole, targetKey, targetRole, mappingOptions = {}) => {
      appliedMappings.push({
        sourceKey,
        sourceRole,
        targetKey,
        targetRole,
        sourceAnchorInstanceIndex: mappingOptions.sourceAnchorInstanceIndex ?? null,
        targetAnchorInstanceIndex: mappingOptions.targetAnchorInstanceIndex ?? null,
      });
      return `mapping_${appliedMappings.length}`;
    },
  });

  assert.equal(createdOperators.length, 1);
  assert.equal(createdOperators[0].templateId, "associate");
  assert.equal(createdOperators[0].operatorLaneIndex, 1);
  assert.equal(createdOperators[0].operatorSlotIndex, 1);
  assert.equal(createdOperators[0].isSolveGenerated, true);
  assert.equal(projection.addedParticipants.length, 1);
  assert.deepEqual(projection.markedDissociatedParticipantIds, []);
  assert.deepEqual(projection.appliedMappingIds, ["mapping_1", "mapping_2", "mapping_3", "mapping_4"]);
  assert.deepEqual(
    appliedMappings.map((mapping) => [mapping.sourceRole, mapping.targetRole]),
    [
      ["reactant", "operator-input"],
      ["reactant", "operator-input"],
      ["operator-output", "product"],
      ["operator-output", "product"],
    ]
  );
  assert.deepEqual(
    appliedMappings.map((mapping) => [mapping.sourceKey, mapping.targetKey]),
    [
      ["reactant_pro_core:reactant_pro_core_structure", "operator_1:operator_1_root"],
      ["reactant_anti_core:reactant_anti_core_structure", "operator_1:operator_1_root"],
      ["operator_1:operator_1_root", "product_photon:product_photon_structure/core_pro_1"],
      ["operator_1:operator_1_root", "product_photon:product_photon_structure/core_anti_1"],
    ]
  );
});

test("solve projection preserves JS-side dissociation and multiple operator placements from solver-result fixtures", () => {
  const resultFixture = readJson("content/contracts/examples/solver-result/higgs_two_photons_result.v1.json");
  const reactantHiggs = createParticipant({
    id: "reactant_higgs",
    side: "reactant",
    templateId: "noether_quad",
    label: "Noether Quad",
  });
  const participants = [
    reactantHiggs,
    createParticipant({
      id: "product_photon_a",
      side: "product",
      templateId: "photon",
      label: "Photon A",
    }),
    createParticipant({
      id: "product_photon_b",
      side: "product",
      templateId: "photon",
      label: "Photon B",
    }),
  ];
  const participantsById = new Map(participants.map((participant) => [participant.id, participant]));
  const createdOperators = [];
  const markedParticipants = [];

  const projection = applyReactionSolvePlan({
    result: resultFixture,
    getParticipantById: (participantId) => participantsById.get(participantId) ?? null,
    getParticipantRootNode: (participant) => participant?.hierarchy?.[0] ?? null,
    buildNodeKey: (participantId, nodeId) => `${participantId}:${nodeId}`,
    createOperatorParticipant: (templateId, operatorLaneIndex, options = {}) => {
      const participant = {
        id: `operator_${createdOperators.length + 1}`,
        side: "operator",
        templateId,
        operatorLaneIndex,
        operatorSlotIndex: options.operatorSlotIndex ?? null,
        hierarchy: [{ id: `operator_${createdOperators.length + 1}_root` }],
      };
      createdOperators.push(participant);
      return participant;
    },
    addOrReplaceMapping: () => "mapping",
    markParticipantAutoDissociated: (participant) => {
      participant.isAutoDissociatedComposite = true;
      markedParticipants.push(participant.id);
      return true;
    },
  });

  assert.deepEqual(
    createdOperators.map((participant) => ({
      templateId: participant.templateId,
      lane: participant.operatorLaneIndex,
      slot: participant.operatorSlotIndex,
    })),
    [
      { templateId: "associate", lane: 1, slot: 1 },
      { templateId: "associate", lane: 1, slot: 3 },
    ]
  );
  assert.deepEqual(markedParticipants, ["reactant_higgs"]);
  assert.deepEqual(projection.markedDissociatedParticipantIds, ["reactant_higgs"]);
  assert.equal(reactantHiggs.isAutoDissociatedComposite, true);
});

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { selectBestReactionSolveCandidates } from "../src/apps/reaction/ReactionSolveSelectionRuntime.js";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

function createMapping({
  sourceNodeId = "",
  targetNodeId = "",
  targetKey = "",
} = {}) {
  return {
    sourceNode: sourceNodeId ? { id: sourceNodeId } : null,
    targetNode: targetNodeId ? { id: targetNodeId } : null,
    targetKey,
  };
}

function createDirectCandidate({
  sourceParticipantId,
  targetParticipantId,
  sourceNodeId = "source_root",
  targetNodeId = "target_root",
  score = 0,
  type = "direct-root",
  mappingCount = 1,
} = {}) {
  return {
    type,
    sourceParticipant: { id: sourceParticipantId },
    sourceNode: { id: sourceNodeId },
    targetParticipant: { id: targetParticipantId },
    targetNode: { id: targetNodeId },
    score,
    mappings: Array.from({ length: mappingCount }, (_, index) =>
      createMapping({
        sourceNodeId: mappingCount === 1 ? sourceNodeId : `${sourceNodeId}_${index + 1}`,
        targetNodeId: mappingCount === 1 ? targetNodeId : `${targetNodeId}_${index + 1}`,
        targetKey: `${targetParticipantId}:${mappingCount === 1 ? targetNodeId : `${targetNodeId}_${index + 1}`}`,
      })
    ),
  };
}

function createPartialCandidate({
  sourceParticipantId,
  targetParticipantId,
  sourceFragmentKeys = [],
  targetKey = "",
  score = 0,
} = {}) {
  return {
    type: "partial-composite-direct",
    sourceParticipant: { id: sourceParticipantId },
    targetParticipant: { id: targetParticipantId },
    sourceFragmentKeys,
    score,
    mappings: [
      createMapping({
        sourceNodeId: "source_fragment",
        targetNodeId: "target_fragment",
        targetKey,
      }),
    ],
  };
}

function createAssociateCandidate({
  ref,
  sourceParticipantIds,
  targetParticipantId,
  score = 0,
} = {}) {
  return {
    type: "associate-standalone",
    sourceEntries: sourceParticipantIds.map((participantId, index) => ({
      participant: { id: participantId },
      sourceFragmentKey: `${participantId}:root`,
      sourceNodeKey: `${participantId}:root`,
      consumesWholeParticipant: true,
      sourceNode: { id: `source_${index + 1}` },
    })),
    targetParticipant: { id: targetParticipantId },
    participantAdditions: [
      {
        ref,
        kind: "operator",
        templateId: "associate",
        operatorLaneIndex: 1,
      },
    ],
    score,
    mappings: [
      createMapping({
        sourceNodeId: "source_1",
        targetNodeId: "target_root",
        targetKey: `${targetParticipantId}:target_root`,
      }),
    ],
  };
}

test("selection prefers whole-product closure over a higher-scoring partial candidate", () => {
  const wholeCandidate = createDirectCandidate({
    sourceParticipantId: "reactant_1",
    targetParticipantId: "product_1",
    score: 1,
  });
  const partialCandidate = createPartialCandidate({
    sourceParticipantId: "reactant_1",
    targetParticipantId: "product_1",
    sourceFragmentKeys: ["reactant_1:fragment_a"],
    targetKey: "product_1:fragment_a",
    score: 999,
  });

  const result = selectBestReactionSolveCandidates([partialCandidate, wholeCandidate]);

  assert.deepEqual(result.selectedCandidates, [wholeCandidate]);
  assert.deepEqual(result.selectedPartialCandidates, []);
});

test("selection prefers stronger whole-product structural closure before raw score", () => {
  const directCandidate = createDirectCandidate({
    sourceParticipantId: "reactant_composite",
    targetParticipantId: "product_composite",
    score: 50,
    mappingCount: 1,
  });
  const compositeCarryThroughCandidate = createDirectCandidate({
    sourceParticipantId: "reactant_composite",
    targetParticipantId: "product_composite",
    sourceNodeId: "source_child",
    targetNodeId: "target_child",
    score: 1,
    type: "composite-carry-through",
    mappingCount: 3,
  });

  const result = selectBestReactionSolveCandidates([
    directCandidate,
    compositeCarryThroughCandidate,
  ]);

  assert.deepEqual(result.selectedCandidates, [compositeCarryThroughCandidate]);
});

test("selection uses lexical candidate identity as the final deterministic tie-break", () => {
  const laterIdentity = createAssociateCandidate({
    ref: "associate:2",
    sourceParticipantIds: ["reactant_a", "reactant_b"],
    targetParticipantId: "product_target",
    score: 10,
  });
  const earlierIdentity = createAssociateCandidate({
    ref: "associate:1",
    sourceParticipantIds: ["reactant_c", "reactant_d"],
    targetParticipantId: "product_target",
    score: 10,
  });

  const result = selectBestReactionSolveCandidates([laterIdentity, earlierIdentity]);

  assert.deepEqual(result.selectedAssociateCandidates, [earlierIdentity]);
});

test("solver result fixtures use compact external operator ids and unpacked anchor identities", () => {
  const fixturePaths = [
    "content/contracts/examples/solver-result/associate_photon_result.v1.json",
    "content/contracts/examples/solver-result/center_neutrino_assembly_result.v1.json",
    "content/contracts/examples/solver-result/higgs_two_photons_result.v1.json",
  ];

  fixturePaths.forEach((fixturePath) => {
    const fixture = readJson(fixturePath);
    const operatorIds = (Array.isArray(fixture.operators) ? fixture.operators : []).map((entry) => entry.id);

    operatorIds.forEach((operatorId, index) => {
      assert.equal(operatorId, `associate:${index + 1}`);
    });

    (Array.isArray(fixture.mappings) ? fixture.mappings : []).forEach((mapping) => {
      if (mapping?.viaOperatorId) {
        assert.match(mapping.viaOperatorId, /^associate:\d+$/);
      }
      assert.doesNotMatch(String(mapping?.from?.anchorId ?? ""), /::/);
      assert.doesNotMatch(String(mapping?.to?.anchorId ?? ""), /::/);
    });
  });
});

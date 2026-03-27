import test from "node:test";
import assert from "node:assert/strict";

import {
  createComposerReactionMappingRulesRuntime,
} from "../src/runtime/ComposerReactionMappingRulesRuntime.js";
import { buildReactionParticipantStructure } from "../src/runtime/ComposerReactionStructureBridgeRuntime.js";
import { buildReactionStructureDescriptorTree } from "../src/runtime/ComposerReactionStructureDescriptorRuntime.js";

function createParticipant(templateId, polarity = "pro") {
  const structure = buildReactionParticipantStructure(templateId, {
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

function createNodeContext(participant) {
  return {
    participant,
    node: participant.hierarchy[0],
  };
}

test("transmute output remains invalid until outgoing ledger exactly matches incoming", () => {
  const targetParticipant = createParticipant("noether_core", "pro");
  const targetContext = createNodeContext(targetParticipant);
  const sourceContext = {
    participant: { id: "transmute_a", templateId: "transmute" },
    node: { id: "transmute_a/output" },
  };
  const rules = createComposerReactionMappingRulesRuntime({
    getNodeContext: (nodeKey) =>
      ({
        "transmute_a::output": sourceContext,
        "noether_core_pro::root": targetContext,
      }[nodeKey] ?? null),
    getTransmuteLedgerSummary: () => ({
      incomingLedger: { electrino: 6, positrino: 6 },
      outgoingLedger: { electrino: 0, positrino: 0 },
      isBalanced: false,
    }),
    parseNodeKey: (nodeKey = "") => {
      const [participantId = "", nodeId = ""] = String(nodeKey ?? "").split("::");
      return { participantId, nodeId };
    },
  });

  const validation = rules.getMappingValidation({
    sourceKey: "transmute_a::output",
    targetKey: "noether_core_pro::root",
    sourceRole: "transmute-output",
    targetRole: "product",
  });

  assert.equal(validation.valid, false);
  assert.match(validation.reason, /remains incomplete/i);
});

test("transmute output becomes valid only when the candidate closes the ledger exactly", () => {
  const targetParticipant = createParticipant("noether_core", "pro");
  const targetContext = createNodeContext(targetParticipant);
  const sourceContext = {
    participant: { id: "transmute_b", templateId: "transmute" },
    node: { id: "transmute_b/output" },
  };
  const rules = createComposerReactionMappingRulesRuntime({
    getNodeContext: (nodeKey) =>
      ({
        "transmute_b::output": sourceContext,
        "noether_core_pro::root": targetContext,
      }[nodeKey] ?? null),
    getTransmuteLedgerSummary: () => ({
      incomingLedger: { electrino: 3, positrino: 3 },
      outgoingLedger: { electrino: 0, positrino: 0 },
      isBalanced: false,
    }),
    parseNodeKey: (nodeKey = "") => {
      const [participantId = "", nodeId = ""] = String(nodeKey ?? "").split("::");
      return { participantId, nodeId };
    },
  });

  const validation = rules.getMappingValidation({
    sourceKey: "transmute_b::output",
    targetKey: "noether_core_pro::root",
    sourceRole: "transmute-output",
    targetRole: "product",
  });

  assert.equal(validation.valid, true);
  assert.match(validation.reason, /fully conservative/i);
});

test("direct reactant to product checks still enforce structured conservation rules", () => {
  const sourceParticipant = createParticipant("noether_core", "pro");
  const targetParticipant = createParticipant("noether_core", "anti");
  const sourceContext = createNodeContext(sourceParticipant);
  const targetContext = createNodeContext(targetParticipant);
  const rules = createComposerReactionMappingRulesRuntime({
    getNodeContext: (nodeKey) =>
      ({
        "noether_core_pro::root": sourceContext,
        "noether_core_anti::root": targetContext,
      }[nodeKey] ?? null),
    parseNodeKey: (nodeKey = "") => {
      const [participantId = "", nodeId = ""] = String(nodeKey ?? "").split("::");
      return { participantId, nodeId };
    },
  });

  const validation = rules.getMappingValidation({
    sourceKey: "noether_core_pro::root",
    targetKey: "noether_core_anti::root",
    sourceRole: "reactant",
    targetRole: "product",
  });

  assert.equal(validation.valid, false);
  assert.match(validation.reason, /cannot map directly/i);
});

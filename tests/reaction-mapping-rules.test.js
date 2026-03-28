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
    getOperatorLedgerSummary: () => ({
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
    sourceRole: "operator-output",
    targetRole: "product",
  });

  assert.equal(validation.valid, false);
  assert.match(validation.reason, /remains incomplete/i);
});

test("pending transmute output target becomes available when the candidate closes the ledger exactly", () => {
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
    getOperatorLedgerSummary: () => ({
      incomingLedger: { electrino: 3, positrino: 3 },
      outgoingLedger: { electrino: 0, positrino: 0 },
      isBalanced: false,
    }),
    parseNodeKey: (nodeKey = "") => {
      const [participantId = "", nodeId = ""] = String(nodeKey ?? "").split("::");
      return { participantId, nodeId };
    },
  });

  const availability = rules.evaluatePendingTargetAvailability({
    pendingSourceKey: "transmute_b::output",
    pendingSourceRole: "operator-output",
    role: "product",
    sourceContext,
    targetContext,
  });

  assert.equal(availability, null);
});

test("committed transmute output mapping stays valid when the existing outgoing ledger is already balanced", () => {
  const targetParticipant = createParticipant("noether_core", "pro");
  const targetContext = createNodeContext(targetParticipant);
  const sourceContext = {
    participant: { id: "transmute_c", templateId: "transmute" },
    node: { id: "transmute_c/output" },
  };
  const rules = createComposerReactionMappingRulesRuntime({
    getNodeContext: (nodeKey) =>
      ({
        "transmute_c::output": sourceContext,
        "noether_core_pro::root": targetContext,
      }[nodeKey] ?? null),
    getOperatorLedgerSummary: () => ({
      incomingLedger: { electrino: 3, positrino: 3 },
      outgoingLedger: { electrino: 3, positrino: 3 },
      isBalanced: true,
    }),
    parseNodeKey: (nodeKey = "") => {
      const [participantId = "", nodeId = ""] = String(nodeKey ?? "").split("::");
      return { participantId, nodeId };
    },
  });

  const validation = rules.getMappingValidation({
    sourceKey: "transmute_c::output",
    targetKey: "noether_core_pro::root",
    sourceRole: "operator-output",
    targetRole: "product",
  });

  assert.equal(validation.valid, true);
  assert.match(validation.reason, /fully conservative/i);
});

test("single-source transmute output cannot bypass direct structure compatibility", () => {
  const sourceParticipant = createParticipant("noether_core", "pro");
  const targetParticipant = createParticipant("noether_core", "anti");
  const sourceContext = createNodeContext(sourceParticipant);
  const targetContext = createNodeContext(targetParticipant);
  const transmuteOutputContext = {
    participant: { id: "transmute_d", templateId: "transmute" },
    node: { id: "transmute_d/output" },
  };
  const rules = createComposerReactionMappingRulesRuntime({
    getNodeContext: (nodeKey) =>
      ({
        "transmute_d::output": transmuteOutputContext,
        "noether_core_anti::root": targetContext,
      }[nodeKey] ?? null),
    getOperatorInputNodeContexts: () => [sourceContext],
    getOperatorLedgerSummary: () => ({
      incomingLedger: { electrino: 3, positrino: 3 },
      outgoingLedger: { electrino: 3, positrino: 3 },
      incomingCount: 1,
      outgoingCount: 1,
      isBalanced: true,
    }),
    parseNodeKey: (nodeKey = "") => {
      const [participantId = "", nodeId = ""] = String(nodeKey ?? "").split("::");
      return { participantId, nodeId };
    },
  });

  const validation = rules.getMappingValidation({
    sourceKey: "transmute_d::output",
    targetKey: "noether_core_anti::root",
    sourceRole: "operator-output",
    targetRole: "product",
  });

  assert.equal(validation.valid, false);
  assert.match(validation.reason, /single-source operator output/i);
  assert.match(validation.reason, /cannot map directly/i);
});

test("multi-source transmute outputs stay ledger-based when no single direct structure should dominate", () => {
  const sourceParticipant = createParticipant("noether_core", "pro");
  const targetParticipant = createParticipant("noether_core", "anti");
  const sourceContext = createNodeContext(sourceParticipant);
  const targetContext = createNodeContext(targetParticipant);
  const transmuteOutputContext = {
    participant: { id: "transmute_e", templateId: "transmute" },
    node: { id: "transmute_e/output" },
  };
  const rules = createComposerReactionMappingRulesRuntime({
    getNodeContext: (nodeKey) =>
      ({
        "transmute_e::output": transmuteOutputContext,
        "noether_core_anti::root": targetContext,
      }[nodeKey] ?? null),
    getOperatorInputNodeContexts: () => [sourceContext],
    getOperatorLedgerSummary: () => ({
      incomingLedger: { electrino: 3, positrino: 3 },
      outgoingLedger: { electrino: 3, positrino: 3 },
      incomingCount: 2,
      outgoingCount: 1,
      isBalanced: true,
    }),
    parseNodeKey: (nodeKey = "") => {
      const [participantId = "", nodeId = ""] = String(nodeKey ?? "").split("::");
      return { participantId, nodeId };
    },
  });

  const validation = rules.getMappingValidation({
    sourceKey: "transmute_e::output",
    targetKey: "noether_core_anti::root",
    sourceRole: "operator-output",
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

test("associate input targets stay live during authoring", () => {
  const sourceParticipant = createParticipant("noether_core", "pro");
  const sourceContext = createNodeContext(sourceParticipant);
  const targetContext = {
    participant: { id: "associate_a", templateId: "associate" },
    node: { id: "associate_a::root" },
  };
  const rules = createComposerReactionMappingRulesRuntime({
    getOperatorLedgerSummary: (participantId = "") => ({
      incomingLedger: { electrino: 6, positrino: 6 },
      outgoingLedger: { electrino: 0, positrino: 0 },
      incomingCount: participantId === "associate_a" ? 2 : 0,
      outgoingCount: 0,
      isBalanced: false,
    }),
    parseNodeKey: (nodeKey = "") => {
      const [participantId = "", nodeId = ""] = String(nodeKey ?? "").split("::");
      return { participantId, nodeId };
    },
  });

  const availability = rules.evaluatePendingTargetAvailability({
    pendingSourceKey: "noether_core_pro::root",
    pendingSourceRole: "reactant",
    role: "operator-input",
    sourceContext,
    targetContext,
  });

  assert.equal(availability, null);
});

test("operator outputs can target operator inputs and stay red until conservative", () => {
  const targetContext = {
    participant: { id: "associate_operator", templateId: "associate" },
    node: { id: "associate_operator::root" },
  };
  const rules = createComposerReactionMappingRulesRuntime({
    getOperatorLedgerSummary: (participantId = "") => ({
      incomingLedger:
        participantId === "polarity_plus"
          ? { electrino: 0, positrino: 0 }
          : { electrino: 3, positrino: 3 },
      outgoingLedger: { electrino: 0, positrino: 0 },
      incomingCount: participantId === "associate_operator" ? 1 : 0,
      outgoingCount: 0,
      isBalanced: false,
    }),
    parseNodeKey: (nodeKey = "") => {
      const [participantId = "", nodeId = ""] = String(nodeKey ?? "").split("::");
      return { participantId, nodeId };
    },
  });

  const availability = rules.evaluatePendingTargetAvailability({
    pendingSourceKey: "polarity_plus::output",
    pendingSourceRole: "operator-output",
    role: "operator-input",
    targetContext,
  });

  assert.equal(availability?.disabled, false);
  assert.equal(availability?.invalid, true);
  assert.match(availability?.reason ?? "", /operator|associate/i);
});

test("committed operator output to operator input can become valid once conservative", () => {
  const sourceContext = {
    participant: { id: "polarity_plus", templateId: "l_polar_transform" },
    node: { id: "polarity_plus::output" },
  };
  const targetContext = {
    participant: { id: "associate_operator", templateId: "associate" },
    node: { id: "associate_operator::root" },
  };
  const rules = createComposerReactionMappingRulesRuntime({
    getNodeContext: (nodeKey) =>
      ({
        "polarity_plus::output": sourceContext,
        "associate_operator::root": targetContext,
      }[nodeKey] ?? null),
    getOperatorLedgerSummary: (participantId = "") => ({
      incomingLedger: { electrino: 3, positrino: 3 },
      outgoingLedger: { electrino: 3, positrino: 3 },
      incomingCount: participantId === "associate_operator" ? 2 : 1,
      outgoingCount: 1,
      isBalanced: true,
    }),
    parseNodeKey: (nodeKey = "") => {
      const [participantId = "", nodeId = ""] = String(nodeKey ?? "").split("::");
      return { participantId, nodeId };
    },
  });

  const validation = rules.getMappingValidation({
    sourceKey: "polarity_plus::output",
    targetKey: "associate_operator::root",
    sourceRole: "operator-output",
    targetRole: "operator-input",
  });

  assert.equal(validation.valid, true);
  assert.match(validation.reason, /operator routed into operator/i);
});

test("associate input mapping stays red until exactly two reactants are attached", () => {
  const sourceParticipant = createParticipant("noether_core", "pro");
  const sourceContext = createNodeContext(sourceParticipant);
  const targetContext = {
    participant: { id: "associate_b", templateId: "associate" },
    node: { id: "associate_b::root" },
  };
  const rules = createComposerReactionMappingRulesRuntime({
    getNodeContext: (nodeKey) =>
      ({
        "noether_core_pro::root": sourceContext,
        "associate_b::root": targetContext,
      }[nodeKey] ?? null),
    getOperatorLedgerSummary: () => ({
      incomingLedger: { electrino: 3, positrino: 3 },
      outgoingLedger: { electrino: 0, positrino: 0 },
      incomingCount: 1,
      outgoingCount: 0,
      isBalanced: false,
    }),
    parseNodeKey: (nodeKey = "") => {
      const [participantId = "", nodeId = ""] = String(nodeKey ?? "").split("::");
      return { participantId, nodeId };
    },
  });

  const validation = rules.getMappingValidation({
    sourceKey: "noether_core_pro::root",
    targetKey: "associate_b::root",
    sourceRole: "reactant",
    targetRole: "operator-input",
  });

  assert.equal(validation.valid, false);
  assert.match(validation.reason, /exactly two reactant inputs/i);
});

test("associate input mapping returns to normal once two reactants are attached", () => {
  const sourceParticipant = createParticipant("noether_core", "pro");
  const sourceContext = createNodeContext(sourceParticipant);
  const targetContext = {
    participant: { id: "associate_c", templateId: "associate" },
    node: { id: "associate_c::root" },
  };
  const rules = createComposerReactionMappingRulesRuntime({
    getNodeContext: (nodeKey) =>
      ({
        "noether_core_pro::root": sourceContext,
        "associate_c::root": targetContext,
      }[nodeKey] ?? null),
    getOperatorLedgerSummary: () => ({
      incomingLedger: { electrino: 6, positrino: 6 },
      outgoingLedger: { electrino: 0, positrino: 0 },
      incomingCount: 2,
      outgoingCount: 0,
      isBalanced: false,
    }),
    parseNodeKey: (nodeKey = "") => {
      const [participantId = "", nodeId = ""] = String(nodeKey ?? "").split("::");
      return { participantId, nodeId };
    },
  });

  const validation = rules.getMappingValidation({
    sourceKey: "noether_core_pro::root",
    targetKey: "associate_c::root",
    sourceRole: "reactant",
    targetRole: "operator-input",
  });

  assert.equal(validation.valid, true);
  assert.match(validation.reason, /reactant routed into operator/i);
});

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

test("associate output remains invalid until outgoing ledger exactly matches incoming", () => {
  const targetParticipant = createParticipant("noether_core", "pro");
  const targetContext = createNodeContext(targetParticipant);
  const sourceContext = {
    participant: { id: "associate_a", templateId: "associate" },
    node: { id: "associate_a/output" },
  };
  const rules = createComposerReactionMappingRulesRuntime({
    getNodeContext: (nodeKey) =>
      ({
        "associate_a::output": sourceContext,
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
    sourceKey: "associate_a::output",
    targetKey: "noether_core_pro::root",
    sourceRole: "operator-output",
    targetRole: "product",
  });

  assert.equal(validation.valid, false);
  assert.match(validation.reason, /remains incomplete/i);
});

test("pending associate output target becomes available when the candidate closes the ledger exactly", () => {
  const targetParticipant = createParticipant("noether_core", "pro");
  const targetContext = createNodeContext(targetParticipant);
  const sourceContext = {
    participant: { id: "associate_b", templateId: "associate" },
    node: { id: "associate_b/output" },
  };
  const rules = createComposerReactionMappingRulesRuntime({
    getNodeContext: (nodeKey) =>
      ({
        "associate_b::output": sourceContext,
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
    pendingSourceKey: "associate_b::output",
    pendingSourceRole: "operator-output",
    role: "product",
    sourceContext,
    targetContext,
  });

  assert.equal(availability, null);
});

test("committed associate output mapping stays valid when the existing outgoing ledger is already balanced", () => {
  const targetParticipant = createParticipant("noether_core", "pro");
  const targetContext = createNodeContext(targetParticipant);
  const sourceContext = {
    participant: { id: "associate_c", templateId: "associate" },
    node: { id: "associate_c/output" },
  };
  const rules = createComposerReactionMappingRulesRuntime({
    getNodeContext: (nodeKey) =>
      ({
        "associate_c::output": sourceContext,
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
    sourceKey: "associate_c::output",
    targetKey: "noether_core_pro::root",
    sourceRole: "operator-output",
    targetRole: "product",
  });

  assert.equal(validation.valid, true);
  assert.match(validation.reason, /fully conservative/i);
});

test("single-source associate output cannot bypass direct structure compatibility", () => {
  const sourceParticipant = createParticipant("noether_core", "pro");
  const targetParticipant = createParticipant("noether_core", "anti");
  const sourceContext = createNodeContext(sourceParticipant);
  const targetContext = createNodeContext(targetParticipant);
  const associateOutputContext = {
    participant: { id: "associate_d", templateId: "associate" },
    node: { id: "associate_d/output" },
  };
  const rules = createComposerReactionMappingRulesRuntime({
    getNodeContext: (nodeKey) =>
      ({
        "associate_d::output": associateOutputContext,
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
    sourceKey: "associate_d::output",
    targetKey: "noether_core_anti::root",
    sourceRole: "operator-output",
    targetRole: "product",
  });

  assert.equal(validation.valid, false);
  assert.match(validation.reason, /single-source operator output/i);
  assert.match(validation.reason, /cannot map directly/i);
});

test("multi-source associate outputs stay ledger-based when no single direct structure should dominate", () => {
  const sourceParticipant = createParticipant("noether_core", "pro");
  const targetParticipant = createParticipant("noether_core", "anti");
  const sourceContext = createNodeContext(sourceParticipant);
  const targetContext = createNodeContext(targetParticipant);
  const associateOutputContext = {
    participant: { id: "associate_e", templateId: "associate" },
    node: { id: "associate_e/output" },
  };
  const rules = createComposerReactionMappingRulesRuntime({
    getNodeContext: (nodeKey) =>
      ({
        "associate_e::output": associateOutputContext,
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
    sourceKey: "associate_e::output",
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

test("associate can accept more than two reactant inputs for composite reassembly", () => {
  const sourceParticipant = createParticipant("up_quark", "pro");
  const sourceContext = createNodeContext(sourceParticipant);
  const targetContext = {
    participant: { id: "associate_multi", templateId: "associate" },
    node: { id: "associate_multi::root" },
  };
  const rules = createComposerReactionMappingRulesRuntime({
    getNodeContext: (nodeKey) =>
      ({
        "up_quark_pro::root": sourceContext,
        "associate_multi::root": targetContext,
      }[nodeKey] ?? null),
    getOperatorLedgerSummary: (participantId = "") => ({
      incomingLedger: { electrino: 9, positrino: 6 },
      outgoingLedger: { electrino: 0, positrino: 0 },
      incomingCount: participantId === "associate_multi" ? 3 : 0,
      outgoingCount: 0,
      isBalanced: false,
    }),
    parseNodeKey: (nodeKey = "") => {
      const [participantId = "", nodeId = ""] = String(nodeKey ?? "").split("::");
      return { participantId, nodeId };
    },
  });

  const validation = rules.getMappingValidation({
    sourceKey: "up_quark_pro::root",
    targetKey: "associate_multi::root",
    sourceRole: "reactant",
    targetRole: "operator-input",
  });

  assert.equal(validation.valid, true);
  assert.match(validation.reason, /reactant routed into operator/i);
});

test("operator outputs can target operator inputs and stay red until conservative", () => {
  const targetContext = {
    participant: { id: "associate_operator", templateId: "associate" },
    node: { id: "associate_operator::root" },
  };
  const rules = createComposerReactionMappingRulesRuntime({
    getOperatorLedgerSummary: (participantId = "") => ({
      incomingLedger:
        participantId === "associate_source"
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
    pendingSourceKey: "associate_source::output",
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
    participant: { id: "associate_source", templateId: "associate" },
    node: { id: "associate_source::output" },
  };
  const targetContext = {
    participant: { id: "associate_operator", templateId: "associate" },
    node: { id: "associate_operator::root" },
  };
  const rules = createComposerReactionMappingRulesRuntime({
    getNodeContext: (nodeKey) =>
      ({
        "associate_source::output": sourceContext,
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
    sourceKey: "associate_source::output",
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
  assert.match(validation.reason, /at least two reactant inputs/i);
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

test("dissociate input mapping stays red until exactly one reactant is attached", () => {
  const sourceParticipant = createParticipant("noether_core", "pro");
  const sourceContext = createNodeContext(sourceParticipant);
  const targetContext = {
    participant: { id: "dissociate_a", templateId: "dissociate" },
    node: { id: "dissociate_a::root" },
  };
  const rules = createComposerReactionMappingRulesRuntime({
    getNodeContext: (nodeKey) =>
      ({
        "noether_core_pro::root": sourceContext,
        "dissociate_a::root": targetContext,
      }[nodeKey] ?? null),
    getOperatorLedgerSummary: () => ({
      incomingLedger: { electrino: 3, positrino: 3 },
      outgoingLedger: { electrino: 0, positrino: 0 },
      incomingCount: 0,
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
    targetKey: "dissociate_a::root",
    sourceRole: "reactant",
    targetRole: "operator-input",
  });

  assert.equal(validation.valid, false);
  assert.match(validation.reason, /exactly one reactant input/i);
});

test("dissociate output uses a single shared output ledger", () => {
  const targetContext = {
    participant: { id: "associate_sink", templateId: "associate" },
    node: { id: "associate_sink::root" },
  };
  const rules = createComposerReactionMappingRulesRuntime({
    getNodeContext: (nodeKey) =>
      ({
        "dissociate_op::root": { participant: { id: "dissociate_op", templateId: "dissociate" }, node: { id: "dissociate_op::root" } },
        "associate_sink::root": targetContext,
      }[nodeKey] ?? null),
    getOperatorLedgerSummary: (participantId = "") => ({
      incomingLedger: { electrino: 3, positrino: 3 },
      outputLedger: { electrino: 3, positrino: 3 },
      outputLedgerByAnchorInstance: {
        0: { electrino: 3, positrino: 3 },
      },
      routedOutgoingLedger: { electrino: 0, positrino: 0 },
      routedOutgoingLedgerByAnchorInstance:
        participantId === "dissociate_op"
          ? {
              0: { electrino: 3, positrino: 3 },
            }
          : {},
      incomingCount: participantId === "associate_sink" ? 2 : 1,
      outgoingCount: 1,
      isBalanced: participantId === "associate_sink",
    }),
    getOperatorOutputLedger: (_participantId = "", anchorInstanceIndex = null, operatorSummary = null) =>
      operatorSummary?.outputLedgerByAnchorInstance?.[anchorInstanceIndex ?? 0] ?? operatorSummary?.outputLedger,
    parseNodeKey: (nodeKey = "") => {
      const [participantId = "", nodeId = ""] = String(nodeKey ?? "").split("::");
      return { participantId, nodeId };
    },
  });

  const validation = rules.getMappingValidation({
    sourceKey: "dissociate_op::root",
    targetKey: "associate_sink::root",
    sourceRole: "operator-output",
    targetRole: "operator-input",
    sourceAnchorInstanceIndex: 0,
  });

  assert.equal(validation.valid, true);
  assert.match(validation.reason, /operator routed into operator/i);
});

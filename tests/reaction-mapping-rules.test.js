import test from "node:test";
import assert from "node:assert/strict";

import {
  createReactionMappingRulesRuntime,
} from "../src/apps/reaction/ReactionMappingRulesRuntime.js";
import { buildReactionParticipantStructure } from "../src/apps/reaction/ReactionStructureBridgeRuntime.js";
import { buildReactionStructureDescriptorTree } from "../src/apps/reaction/ReactionStructureDescriptorRuntime.js";

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
    participant: { id: "associate_a", templateId: "associate", side: "operator", operatorLaneIndex: 1 },
    node: { id: "associate_a/output" },
  };
  const rules = createReactionMappingRulesRuntime({
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
    participant: { id: "associate_b", templateId: "associate", side: "operator", operatorLaneIndex: 1 },
    node: { id: "associate_b/output" },
  };
  const rules = createReactionMappingRulesRuntime({
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
    participant: { id: "associate_c", templateId: "associate", side: "operator", operatorLaneIndex: 1 },
    node: { id: "associate_c/output" },
  };
  const rules = createReactionMappingRulesRuntime({
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
    participant: { id: "associate_d", templateId: "associate", side: "operator", operatorLaneIndex: 1 },
    node: { id: "associate_d/output" },
  };
  const rules = createReactionMappingRulesRuntime({
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
    participant: { id: "associate_e", templateId: "associate", side: "operator", operatorLaneIndex: 1 },
    node: { id: "associate_e/output" },
  };
  const rules = createReactionMappingRulesRuntime({
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

test("lane-1 single-row reactant roots cannot bypass the lane-2 operator stage", () => {
  const sourceParticipant = createParticipant("noether_core", "pro");
  const targetParticipant = createParticipant("noether_core", "anti");
  const sourceContext = createNodeContext(sourceParticipant);
  const targetContext = createNodeContext(targetParticipant);
  const rules = createReactionMappingRulesRuntime({
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
  assert.match(validation.reason, /exactly one lane at a time/i);
});

test("pending product targets are disabled for lane-1 single-row reactant roots", () => {
  const sourceParticipant = createParticipant("electron", "pro");
  const targetParticipant = createParticipant("electron", "pro");
  targetParticipant.side = "product";
  const sourceContext = createNodeContext(sourceParticipant);
  const targetContext = createNodeContext(targetParticipant);
  const rules = createReactionMappingRulesRuntime({
    getNodeContext: (nodeKey) =>
      ({
        "electron_pro::root": sourceContext,
        "electron_pro_product::root": targetContext,
      }[nodeKey] ?? null),
    parseNodeKey: (nodeKey = "") => {
      const [participantId = "", nodeId = ""] = String(nodeKey ?? "").split("::");
      return { participantId, nodeId };
    },
  });

  targetParticipant.id = "electron_pro_product";

  const availability = rules.evaluatePendingTargetAvailability({
    pendingSourceKey: "electron_pro::root",
    pendingSourceRole: "reactant",
    role: "product",
    sourceContext,
    targetContext,
  });

  assert.equal(availability?.disabled, true);
  assert.match(String(availability?.reason ?? ""), /exactly one lane at a time/i);
});

test("associate input targets stay live during authoring", () => {
  const sourceParticipant = createParticipant("noether_core", "pro");
  const sourceContext = createNodeContext(sourceParticipant);
  const targetContext = {
    participant: { id: "associate_a", templateId: "associate" },
    node: { id: "associate_a::root" },
  };
  const rules = createReactionMappingRulesRuntime({
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
  const rules = createReactionMappingRulesRuntime({
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

test("operator outputs can target center inputs and stay red until conservative", () => {
  const sourceContext = {
    participant: {
      id: "associate_source",
      templateId: "associate",
      side: "operator",
      operatorLaneIndex: 0,
    },
    node: { id: "associate_source::output" },
  };
  const targetContext = {
    participant: {
      id: "center_core",
      templateId: "noether_core",
      side: "reactant",
      surfaceColumn: "center-assembly",
    },
    node: { id: "center_core::root" },
  };
  const rules = createReactionMappingRulesRuntime({
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
    role: "center",
    targetAnchorInstanceIndex: 0,
    sourceContext,
    targetContext,
  });

  assert.equal(availability?.disabled, false);
  assert.equal(availability?.invalid, true);
  assert.match(availability?.reason ?? "", /operator|associate/i);
});

test("committed operator output to center input can become valid once conservative", () => {
  const sourceContext = {
    participant: {
      id: "associate_source",
      templateId: "associate",
      side: "operator",
      operatorLaneIndex: 0,
    },
    node: { id: "associate_source::output" },
  };
  const targetContext = {
    participant: {
      id: "center_core",
      templateId: "noether_core",
      side: "reactant",
      surfaceColumn: "center-assembly",
    },
    node: { id: "center_core::root" },
  };
  const rules = createReactionMappingRulesRuntime({
    getNodeContext: (nodeKey) =>
      ({
        "associate_source::output": sourceContext,
        "center_core::root": targetContext,
      }[nodeKey] ?? null),
    getOperatorLedgerSummary: (participantId = "") => ({
      incomingLedger: { electrino: 3, positrino: 3 },
      outgoingLedger: { electrino: 3, positrino: 3 },
      incomingCount: participantId === "center_core" ? 2 : 1,
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
    targetKey: "center_core::root",
    sourceRole: "operator-output",
    targetRole: "center",
    targetAnchorInstanceIndex: 0,
  });

  assert.equal(validation.valid, true);
  assert.match(validation.reason, /fully conservative/i);
});

test("associate input mapping stays red until exactly two reactants are attached", () => {
  const sourceParticipant = createParticipant("noether_core", "pro");
  const sourceContext = createNodeContext(sourceParticipant);
  const targetContext = {
    participant: { id: "associate_b", templateId: "associate" },
    node: { id: "associate_b::root" },
  };
  const rules = createReactionMappingRulesRuntime({
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
  const rules = createReactionMappingRulesRuntime({
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
  const rules = createReactionMappingRulesRuntime({
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

test("dissociate output uses a single shared output ledger when feeding the next center lane", () => {
  const targetContext = {
    participant: {
      id: "center_sink",
      templateId: "noether_core",
      side: "reactant",
      surfaceColumn: "center-assembly",
    },
    node: { id: "center_sink::root" },
  };
  const rules = createReactionMappingRulesRuntime({
    getNodeContext: (nodeKey) =>
      ({
        "dissociate_op::root": {
          participant: {
            id: "dissociate_op",
            templateId: "dissociate",
            side: "operator",
            operatorLaneIndex: 0,
          },
          node: { id: "dissociate_op::root" },
        },
        "center_sink::root": targetContext,
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
      incomingCount: participantId === "center_sink" ? 2 : 1,
      outgoingCount: 1,
      isBalanced: participantId === "center_sink",
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
    targetKey: "center_sink::root",
    sourceRole: "operator-output",
    targetRole: "center",
    sourceAnchorInstanceIndex: 0,
    targetAnchorInstanceIndex: 0,
  });

  assert.equal(validation.valid, true);
  assert.match(validation.reason, /fully conservative/i);
});

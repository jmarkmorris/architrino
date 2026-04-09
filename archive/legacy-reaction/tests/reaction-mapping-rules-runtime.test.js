import test from "node:test";
import assert from "node:assert/strict";

import { createReactionMappingRulesRuntime } from "../src/apps/reaction/ReactionMappingRulesRuntime.js";

test("reaction mapping-rules runtime parses operator ids with the reaction node-key runtime", () => {
  const runtime = createReactionMappingRulesRuntime({
    getNodeContext: (nodeKey) =>
      nodeKey === "product_1::root"
        ? {
            participant: { id: "product_1", side: "product" },
            node: { id: "root" },
          }
        : null,
    getOperatorInputNodeContexts: () => [],
    getOperatorLedgerSummary: (participantId) => ({
      incomingLedger: { electrino: 1, positrino: 0 },
      outputLedger: { electrino: 1, positrino: 0 },
      outgoingLedger: { electrino: 0, positrino: 0 },
      routedOutgoingLedger: { electrino: 0, positrino: 0 },
      routedOutgoingLedgerByAnchorInstance: {},
      incomingCount: participantId === "operator_1" ? 1 : 0,
      outgoingCount: 0,
      isBalanced: false,
    }),
    getOperatorOutputLedger: () => ({ electrino: 1, positrino: 0 }),
    resolveBinaryChoiceInventory: () => null,
  });

  const availability = runtime.evaluatePendingTargetAvailability({
    pendingSourceKey: "operator_1::root",
    pendingSourceRole: "operator-output",
    role: "operator-input",
    sourceContext: {
      participant: { id: "operator_1", side: "operator" },
      node: { id: "root" },
    },
    targetContext: {
      participant: { id: "target_operator", templateId: "associate", side: "operator" },
      node: { id: "root" },
    },
  });

  assert.equal(availability?.invalid, true);
  assert.match(
    String(availability?.reason ?? ""),
    /Operator output remains incomplete|Associate needs at least two reactant inputs|Target operator remains unresolved/
  );
});

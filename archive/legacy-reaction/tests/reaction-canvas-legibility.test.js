import test from "node:test";
import assert from "node:assert/strict";

import {
  REACTION_CORRIDOR_LEGEND_ENTRIES,
  REACTION_OPERATOR_GRAMMAR_ENTRIES,
  buildReactionLegibilitySnapshot,
} from "../src/apps/reaction/ReactionCanvasLegibilityRuntime.js";

test("reaction legibility runtime exposes explicit operator grammar entries", () => {
  assert.deepEqual(
    REACTION_OPERATOR_GRAMMAR_ENTRIES.map((entry) => ({
      templateId: entry.templateId,
      laneIndex: entry.laneIndex,
      laneLabel: entry.laneLabel,
    })),
    [
      {
        templateId: "dissociate",
        laneIndex: 0,
        laneLabel: "Inner-left lane",
      },
      {
        templateId: "associate",
        laneIndex: 1,
        laneLabel: "Inner-right lane",
      },
    ]
  );
  assert.equal(
    REACTION_OPERATOR_GRAMMAR_ENTRIES[0].detail.includes("visible corridors"),
    true
  );
  assert.equal(
    REACTION_OPERATOR_GRAMMAR_ENTRIES[1].detail.includes("assembled downstream participant"),
    true
  );
});

test("reaction legibility runtime keeps anchor legend entries explicit", () => {
  assert.deepEqual(
    REACTION_CORRIDOR_LEGEND_ENTRIES.map((entry) => ({
      key: entry.key,
      tone: entry.tone,
      label: entry.label,
    })),
    [
      { key: "pending", tone: "warning", label: "Selected source" },
      { key: "ready", tone: "neutral", label: "Ready target" },
      { key: "mapped", tone: "valid", label: "Authored corridor" },
      { key: "invalid", tone: "danger", label: "Rule break" },
    ]
  );
});

test("reaction legibility snapshot aggregates corridor and operator surface state", () => {
  const snapshot = buildReactionLegibilitySnapshot({
    participants: [
      { id: "reactant_1", side: "reactant" },
      { id: "operator_1", side: "operator" },
      { id: "operator_2", side: "operator" },
      { id: "operator_3", side: "operator" },
    ],
    mappings: [
      { id: "mapping_1" },
      { id: "mapping_2" },
    ],
    getMappingValidation: (mapping) => ({
      valid: mapping.id !== "mapping_2",
    }),
    getOperatorLedgerSummary: (participantId) => ({
      isBalanced: participantId === "operator_1",
      isOpen: participantId === "operator_2",
      isInvalid: participantId === "operator_3",
    }),
  });

  assert.equal(snapshot.focusState.kind, "invalid-corridor");
  assert.equal(snapshot.corridorState.totalCount, 2);
  assert.equal(snapshot.corridorState.conservativeCount, 1);
  assert.equal(snapshot.corridorState.invalidCount, 1);
  assert.deepEqual(
    snapshot.corridorState.pillEntries.map((entry) => entry.label),
    ["2 corridors", "1 conservative corridor", "1 invalid corridor"]
  );
  assert.equal(snapshot.operatorState.totalCount, 3);
  assert.equal(snapshot.operatorState.balancedCount, 1);
  assert.equal(snapshot.operatorState.openCount, 1);
  assert.equal(snapshot.operatorState.invalidCount, 1);
});

test("reaction legibility snapshot prioritizes pending source guidance over aggregate counts", () => {
  const snapshot = buildReactionLegibilitySnapshot({
    participants: [
      { id: "reactant_1", side: "reactant" },
      { id: "product_1", side: "product" },
    ],
    mappings: [],
    pendingSourceKey: "reactant_1::root",
    pendingSourceRole: "reactant",
  });

  assert.equal(snapshot.focusState.kind, "pending-source");
  assert.match(snapshot.focusState.summary, /Finish the corridor/);
});

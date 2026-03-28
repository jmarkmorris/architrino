import test from "node:test";
import assert from "node:assert/strict";

import {
  REACTION_OPERATOR_LANE_LAYOUT,
  REACTION_OPERATOR_LANE_COUNT,
  REACTION_OPERATOR_ENTRIES,
} from "../src/runtime/ComposerReactionSolverUiRuntime.js";

test("reaction solver keeps two operator lanes available", () => {
  assert.equal(REACTION_OPERATOR_LANE_COUNT, 2);
});

test("reaction solver operator registry includes transmute and polar transforms", () => {
  assert.deepEqual(
    REACTION_OPERATOR_ENTRIES.map((entry) => entry.templateId),
    [
      "transmute",
      "l_polar_transform",
      "r_polar_transform",
      "associate",
      "dissociate",
    ]
  );
});

test("reaction solver operator lane layout uses a shared polar lane and a lane-3 operator picker", () => {
  assert.deepEqual(
    REACTION_OPERATOR_LANE_LAYOUT.map((entry) => ({
      laneIndex: entry.laneIndex,
      templateId: entry.templateId,
      enabled: entry.enabled,
    })),
    [
      { laneIndex: 0, templateId: "polarity_transform", enabled: true },
      { laneIndex: 1, templateId: "operator", enabled: true },
    ]
  );
  assert.deepEqual(
    REACTION_OPERATOR_LANE_LAYOUT[0].pickerEntries.map((entry) => entry.templateId),
    ["l_polar_transform", "r_polar_transform"]
  );
  assert.deepEqual(
    REACTION_OPERATOR_LANE_LAYOUT[1].pickerEntries.map((entry) => entry.templateId),
    ["associate", "transmute"]
  );
});

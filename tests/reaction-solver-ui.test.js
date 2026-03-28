import test from "node:test";
import assert from "node:assert/strict";

import {
  REACTION_CENTER_COLUMN_LAYOUT,
  REACTION_CENTER_TRANSFORMER_COLUMN_COUNT,
  REACTION_CENTER_TRANSFORMER_ENTRIES,
} from "../src/runtime/ComposerReactionSolverUiRuntime.js";

test("reaction solver keeps two center transformer lanes available", () => {
  assert.equal(REACTION_CENTER_TRANSFORMER_COLUMN_COUNT, 2);
});

test("reaction solver center transformer registry includes transmute and polar transforms", () => {
  assert.deepEqual(
    REACTION_CENTER_TRANSFORMER_ENTRIES.map((entry) => entry.templateId),
    [
      "transmute",
      "l_polar_transform",
      "r_polar_transform",
      "associate",
      "dissociate",
    ]
  );
});

test("reaction solver center column layout uses a shared polar lane and an associate lane", () => {
  assert.deepEqual(
    REACTION_CENTER_COLUMN_LAYOUT.map((entry) => ({
      columnIndex: entry.columnIndex,
      templateId: entry.templateId,
      enabled: entry.enabled,
    })),
    [
      { columnIndex: 0, templateId: "polar_transform", enabled: true },
      { columnIndex: 1, templateId: "associate", enabled: true },
    ]
  );
});

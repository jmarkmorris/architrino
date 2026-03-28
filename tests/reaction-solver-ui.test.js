import test from "node:test";
import assert from "node:assert/strict";

import {
  REACTION_CENTER_COLUMN_LAYOUT,
  REACTION_CENTER_TRANSFORMER_COLUMN_COUNT,
  REACTION_CENTER_TRANSFORMER_ENTRIES,
} from "../src/runtime/ComposerReactionSolverUiRuntime.js";

test("reaction solver keeps three center transformer columns available", () => {
  assert.equal(REACTION_CENTER_TRANSFORMER_COLUMN_COUNT, 3);
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

test("reaction solver center column layout enables left and right polar transforms while middle stays disabled", () => {
  assert.deepEqual(
    REACTION_CENTER_COLUMN_LAYOUT.map((entry) => ({
      columnIndex: entry.columnIndex,
      templateId: entry.templateId,
      enabled: entry.enabled,
    })),
    [
      { columnIndex: 0, templateId: "l_polar_transform", enabled: true },
      { columnIndex: 1, templateId: "transmute", enabled: false },
      { columnIndex: 2, templateId: "r_polar_transform", enabled: true },
    ]
  );
});

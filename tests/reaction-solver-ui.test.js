import test from "node:test";
import assert from "node:assert/strict";

import {
  REACTION_CENTER_TRANSFORMER_COLUMN_COUNT,
  REACTION_CENTER_TRANSFORMER_ENTRIES,
} from "../src/runtime/ComposerReactionSolverUiRuntime.js";

test("reaction solver keeps three center transformer columns available", () => {
  assert.equal(REACTION_CENTER_TRANSFORMER_COLUMN_COUNT, 3);
});

test("reaction solver center transformer picker includes transmute, associate, and dissociate", () => {
  assert.deepEqual(
    REACTION_CENTER_TRANSFORMER_ENTRIES.map((entry) => entry.templateId),
    ["transmute", "associate", "dissociate"]
  );
});

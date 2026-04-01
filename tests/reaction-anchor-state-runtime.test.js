import test from "node:test";
import assert from "node:assert/strict";

import { createReactionAnchorStateRuntime } from "../src/apps/reaction/ReactionAnchorStateRuntime.js";

test("reaction anchor-state runtime uses reaction node-key conflict semantics", () => {
  const runtime = createReactionAnchorStateRuntime({
    getMappings: () => [
      {
        id: "map_1",
        sourceKey: "p1::root",
        targetKey: "p2::root",
        sourceRole: "reactant",
        targetRole: "product",
      },
    ],
    getRecentMappingIds: () => [],
    setRecentMappingIds: () => {},
    isSingleMappingAnchorRole: ({ role }) => role === "reactant",
  });

  const conflicts = runtime.getConflictingMappings("p1::root/inner", "reactant");

  assert.equal(conflicts.length, 1);
  assert.equal(conflicts[0].id, "map_1");
});

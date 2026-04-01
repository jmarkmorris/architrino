import test from "node:test";
import assert from "node:assert/strict";

import {
  buildReactionNodeKey,
  parseReactionNodeKey,
} from "../src/apps/reaction/ReactionNodeKeyRuntime.js";

test("reaction node key runtime builds and parses participant/node ids", () => {
  const nodeKey = buildReactionNodeKey("participant_1", "root/inner");

  assert.equal(nodeKey, "participant_1::root/inner");
  assert.deepEqual(parseReactionNodeKey(nodeKey), {
    participantId: "participant_1",
    nodeId: "root/inner",
  });
});

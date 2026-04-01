import test from "node:test";
import assert from "node:assert/strict";

import {
  buildReactionNodeKey,
  parseReactionNodeKey,
  reactionNodeKeysConflict,
} from "../src/apps/reaction/ReactionNodeKeyRuntime.js";

test("reaction node key runtime builds and parses participant/node ids", () => {
  const nodeKey = buildReactionNodeKey("participant_1", "root/inner");

  assert.equal(nodeKey, "participant_1::root/inner");
  assert.deepEqual(parseReactionNodeKey(nodeKey), {
    participantId: "participant_1",
    nodeId: "root/inner",
  });
});

test("reaction node key runtime detects ancestor-path conflicts on the same participant", () => {
  assert.equal(reactionNodeKeysConflict("p1::root", "p1::root/inner"), true);
  assert.equal(reactionNodeKeysConflict("p1::root/inner", "p1::root"), true);
  assert.equal(reactionNodeKeysConflict("p1::root/inner", "p2::root/inner"), false);
});

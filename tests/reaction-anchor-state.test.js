import test from "node:test";
import assert from "node:assert/strict";

import {
  createReactionAnchorStateRuntime,
  nodeKeysConflict,
} from "../src/apps/reaction/ReactionAnchorStateRuntime.js";

test("node key conflicts detect ancestor and descendant anchors within one participant", () => {
  assert.equal(nodeKeysConflict("p1::root", "p1::root/inner"), true);
  assert.equal(nodeKeysConflict("p1::root/inner", "p1::root"), true);
  assert.equal(nodeKeysConflict("p1::root/inner", "p2::root/inner"), false);
});

test("anchor availability blocks conflicting single-role mappings", () => {
  const runtime = createReactionAnchorStateRuntime({
    getMappings: () => [
      {
        id: "m1",
        sourceKey: "p1::root",
        sourceRole: "reactant",
        targetKey: "p2::root",
        targetRole: "product",
      },
    ],
    isSingleMappingAnchorRole: (role) => role === "reactant" || role === "product",
  });

  const result = runtime.getAnchorAvailability("reactant", "p1::root/inner");

  assert.equal(result.disabled, true);
  assert.match(result.reason, /ancestor or descendant mapping/i);
});

test("recent-route state is pruned and faded through the runtime callbacks", () => {
  const scheduled = [];
  const recentMappingIds = [];
  const mappings = [{ id: "m1" }];
  let changeCount = 0;

  const runtime = createReactionAnchorStateRuntime({
    getMappings: () => mappings,
    getRecentMappingIds: () => recentMappingIds,
    setRecentMappingIds: (nextIds) => {
      recentMappingIds.splice(0, recentMappingIds.length, ...nextIds);
    },
    scheduleTimeout: (callback) => {
      scheduled.push(callback);
      return scheduled.length;
    },
    clearScheduledTimeout: () => {},
    onRecentStateChange: () => {
      changeCount += 1;
    },
  });

  runtime.markMappingsRecent(["m1"]);
  assert.deepEqual(recentMappingIds, ["m1"]);
  assert.equal(changeCount, 1);

  scheduled[0]?.();
  assert.deepEqual(recentMappingIds, []);
  assert.equal(changeCount, 2);
});

test("anchor mapping ids can target distinct operator input instances on the same node", () => {
  const runtime = createReactionAnchorStateRuntime({
    getMappings: () => [
      {
        id: "m_top",
        sourceKey: "p1::out",
        sourceRole: "reactant",
        targetKey: "associate::root",
        targetRole: "operator-input",
        targetAnchorInstanceIndex: 0,
      },
      {
        id: "m_bottom",
        sourceKey: "p2::out",
        sourceRole: "reactant",
        targetKey: "associate::root",
        targetRole: "operator-input",
        targetAnchorInstanceIndex: 1,
      },
    ],
  });

  assert.deepEqual(
    runtime.getMappingIdsForAnchor("associate::root", "operator-input", 0),
    ["m_top"]
  );
  assert.deepEqual(
    runtime.getMappingIdsForAnchor("associate::root", "operator-input", 1),
    ["m_bottom"]
  );
});

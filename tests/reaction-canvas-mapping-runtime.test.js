import test from "node:test";
import assert from "node:assert/strict";

import {
  canStartReactionCanvasMappingFromRole,
  canTargetReactionCanvasMappingRole,
  createReactionCanvasMappingRuntime,
} from "../src/apps/reaction/ReactionCanvasMappingRuntime.js";

test("mapping runtime exposes the authored start and target role grammar", () => {
  assert.equal(canStartReactionCanvasMappingFromRole("reactant"), true);
  assert.equal(canStartReactionCanvasMappingFromRole("operator-output"), true);
  assert.equal(canStartReactionCanvasMappingFromRole("product"), false);
  assert.equal(canStartReactionCanvasMappingFromRole({ role: "center", anchorInstanceIndex: 0 }), false);
  assert.equal(canStartReactionCanvasMappingFromRole({ role: "center", anchorInstanceIndex: 1 }), true);
  assert.equal(canTargetReactionCanvasMappingRole("product"), true);
  assert.equal(canTargetReactionCanvasMappingRole("operator-input"), true);
  assert.equal(canTargetReactionCanvasMappingRole("reactant"), false);
  assert.equal(canTargetReactionCanvasMappingRole({ role: "center", anchorInstanceIndex: 0 }), true);
  assert.equal(canTargetReactionCanvasMappingRole({ role: "center", anchorInstanceIndex: 1 }), false);
});

test("mapping runtime replaces conflicting single-anchor mappings", () => {
  const state = {
    mappings: [
      {
        id: "canvas_mapping_0",
        sourceKey: "reactant_1::root",
        targetKey: "product_1::root",
        sourceRole: "reactant",
        targetRole: "product",
        sourceAnchorInstanceIndex: null,
        targetAnchorInstanceIndex: null,
      },
    ],
    nextMappingId: 1,
    hoveredMappingIds: ["canvas_mapping_0"],
  };
  const runtime = createReactionCanvasMappingRuntime({
    state,
    isSingleMappingAnchorRoleForNode: ({ role }) => role === "reactant" || role === "product",
    nodeKeysConflict: (left, right) => left === right,
    pruneRecentRouteState: () => {},
  });

  const mappingId = runtime.addOrReplaceMapping(
    "reactant_1::root",
    "reactant",
    "product_2::root",
    "product"
  );

  assert.equal(mappingId, "canvas_mapping_1");
  assert.deepEqual(
    state.mappings.map((mapping) => ({
      id: mapping.id,
      sourceKey: mapping.sourceKey,
      targetKey: mapping.targetKey,
    })),
    [
      {
        id: "canvas_mapping_1",
        sourceKey: "reactant_1::root",
        targetKey: "product_2::root",
      },
    ]
  );
  assert.deepEqual(state.hoveredMappingIds, []);
});

test("mapping runtime routes a pending reactant into an operator input and clears pending state", () => {
  const state = {
    mappings: [],
    nextMappingId: 1,
    pendingSourceKey: "reactant_1::root",
    pendingSourceRole: "reactant",
    pendingSourceAnchorInstanceIndex: null,
    hoveredMappingIds: ["stale"],
  };
  const statuses = [];
  const recentMappingIds = [];
  let renderCount = 0;
  const runtime = createReactionCanvasMappingRuntime({
    state,
    getAnchorAvailability: () => ({ disabled: false, reason: "" }),
    setStatus: (status) => statuses.push(status),
    render: () => {
      renderCount += 1;
    },
    isSingleMappingAnchorRoleForNode: ({ role }) => role === "reactant" || role === "product",
    nodeKeysConflict: (left, right) => left === right,
    pruneRecentRouteState: () => {},
    markMappingsRecent: (mappingIds) => {
      recentMappingIds.push(mappingIds);
    },
    setHoveredMappingIds: (mappingIds) => {
      state.hoveredMappingIds = mappingIds;
    },
    countEligibleTargets: () => 2,
    getMappingValidation: () => ({ valid: true, reason: "" }),
  });

  runtime.handleAnchorClick("operator-input", "dissociate_1::root");

  assert.equal(state.mappings.length, 1);
  assert.equal(state.pendingSourceKey, "");
  assert.equal(state.pendingSourceRole, "");
  assert.equal(state.pendingSourceAnchorInstanceIndex, null);
  assert.deepEqual(recentMappingIds, [["canvas_mapping_1"]]);
  assert.equal(renderCount, 1);
  assert.equal(statuses.at(-1), "Reactant routed into operator.");
});

test("mapping runtime does not start a rightward route from a center input connector", () => {
  const state = {
    mappings: [],
    nextMappingId: 1,
    pendingSourceKey: "",
    pendingSourceRole: "",
    pendingSourceAnchorInstanceIndex: null,
    hoveredMappingIds: [],
  };
  const statuses = [];
  let renderCount = 0;
  const runtime = createReactionCanvasMappingRuntime({
    state,
    getAnchorAvailability: () => ({ disabled: false, reason: "" }),
    setStatus: (status) => statuses.push(status),
    render: () => {
      renderCount += 1;
    },
  });

  runtime.handleAnchorClick("center", "center_free_architrinos::root", 0);

  assert.equal(state.pendingSourceKey, "");
  assert.equal(state.pendingSourceRole, "");
  assert.equal(state.pendingSourceAnchorInstanceIndex, null);
  assert.equal(renderCount, 0);
  assert.equal(statuses.at(-1), "Center input connectors cannot start a rightward route.");
});

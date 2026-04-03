import test from "node:test";
import assert from "node:assert/strict";

import { createReactionCommitStateRuntime } from "../src/apps/reaction/ReactionCommitStateRuntime.js";

test("reaction commit state starts as draft and accepts non-empty snapshots", () => {
  let snapshot = {
    participants: [{ id: "reactant_neutron" }],
    mappings: [],
  };
  const runtime = createReactionCommitStateRuntime({
    getSnapshot: () => snapshot,
    now: () => "2026-04-03T09:00:00.000Z",
  });

  assert.deepEqual(runtime.getCommitState(), {
    status: "draft",
    acceptedAt: "",
    hasContent: true,
    needsReaccept: false,
    canAccept: true,
    canExport: false,
  });

  runtime.acceptCurrentSnapshot();

  assert.deepEqual(runtime.getCommitState(), {
    status: "accepted",
    acceptedAt: "2026-04-03T09:00:00.000Z",
    hasContent: true,
    needsReaccept: false,
    canAccept: true,
    canExport: true,
  });
  assert.deepEqual(runtime.buildExportReview(), {
    status: "accepted",
    acceptedAt: "2026-04-03T09:00:00.000Z",
  });
});

test("reaction commit state invalidates acceptance after the canvas changes", () => {
  let snapshot = {
    participants: [{ id: "reactant_neutron" }],
    mappings: [],
  };
  const runtime = createReactionCommitStateRuntime({
    getSnapshot: () => snapshot,
    now: () => "2026-04-03T09:00:00.000Z",
  });

  runtime.acceptCurrentSnapshot();
  snapshot = {
    participants: [{ id: "reactant_neutron" }, { id: "product_proton" }],
    mappings: [],
  };

  assert.equal(runtime.observeSnapshot(), true);
  assert.deepEqual(runtime.getCommitState(), {
    status: "draft",
    acceptedAt: "",
    hasContent: true,
    needsReaccept: true,
    canAccept: true,
    canExport: false,
  });
  assert.deepEqual(runtime.buildExportReview(), {
    status: "draft",
  });
});

test("reaction commit state clears acceptance when the canvas is emptied", () => {
  let snapshot = {
    participants: [{ id: "reactant_neutron" }],
    mappings: [],
  };
  const runtime = createReactionCommitStateRuntime({
    getSnapshot: () => snapshot,
    now: () => "2026-04-03T09:00:00.000Z",
  });

  runtime.acceptCurrentSnapshot();
  snapshot = {
    participants: [],
    mappings: [],
  };

  assert.equal(runtime.observeSnapshot(), true);
  assert.deepEqual(runtime.getCommitState(), {
    status: "draft",
    acceptedAt: "",
    hasContent: false,
    needsReaccept: false,
    canAccept: false,
    canExport: false,
  });
});

import test from "node:test";
import assert from "node:assert/strict";

import { animatorAssemblyTemplateMenuRows } from "../src/runtime/AnimatorCatalogRuntime.js";
import { createBuiltInAnimatorAssemblyDraftRuntime } from "../src/runtime/AnimatorAssemblyFactoryRuntime.js";

test("animator assembly catalog exposes the typed two-braid composite and Noether Quad alongside Noether braid", () => {
  assert.deepEqual(animatorAssemblyTemplateMenuRows[0], [
    { template: "noether_braid", label: "Pro Noether braid" },
    { template: "noether_pair", label: "Pro/anti-orientation Noether-braid composite" },
    { template: "noether_quad", label: "Noether Quad" },
  ]);
});

test("legacy noether_pair template expands to two six-worldline orientation records", () => {
  const draft = createBuiltInAnimatorAssemblyDraftRuntime("noether_pair", [1, 2, 3], {
    normalizeSceneRole: () => "assembly",
    normalizeAssemblyDraft: (value) => value,
    getDraftCount: () => 0,
    getNextAssemblyId: () => "noether_pair",
    createDefaultPathPoints: () => [],
  });

  assert.equal(draft.name, "Pro/anti-orientation Noether-braid composite");
  assert.equal(draft.role, "noether_pair");
  assert.equal(draft.members.length, 12);
  assert.deepEqual(
    draft.subassemblies.map((entry) => ({
      id: entry.id,
      memberCount: entry.members.length,
    })),
    [
      { id: "pro_orientation_noether_braid", memberCount: 6 },
      { id: "anti_orientation_noether_braid", memberCount: 6 },
    ]
  );
  assert.equal(draft.core, undefined);
});

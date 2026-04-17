import test from "node:test";
import assert from "node:assert/strict";

import { buildPdgeditLinkRenderModels } from "../src/apps/pdgedit/PdgeditAppRuntime.js";

function createAssembly({ id, x, y }) {
  return {
    id,
    kind: "assembly",
    x,
    y,
    title: id,
    role: "reactant",
    tiles: ["tile_a", "tile_b", "tile_c", "tile_d"],
  };
}

function createOperator({ id, x, y }) {
  return {
    id,
    kind: "operator",
    x,
    y,
    type: "associate",
    title: id,
    positrinoCount: 1,
    electrinoCount: 1,
  };
}

test("link render models sort shared routing columns by geometry rather than link id", () => {
  const topAssembly = createAssembly({ id: "reactant_top", x: 2, y: 0 });
  const bottomAssembly = createAssembly({ id: "reactant_bottom", x: 2, y: 1 });
  const topOperator = createOperator({ id: "operator_top", x: 7, y: 0 });
  const bottomOperator = createOperator({ id: "operator_bottom", x: 7, y: 1 });
  const objectsById = new Map(
    [topAssembly, bottomAssembly, topOperator, bottomOperator].map((record) => [record.id, record])
  );

  const models = buildPdgeditLinkRenderModels(
    {
      links: [
        { id: "z_top", endpointA: "reactant_top", endpointB: "operator_top" },
        { id: "a_bottom", endpointA: "reactant_bottom", endpointB: "operator_bottom" },
      ],
    },
    (objectId) => objectsById.get(objectId) ?? null
  );

  assert.deepEqual(
    models.map((model) => [model.link.id, model.slotOffsetPx]),
    [
      ["z_top", -3],
      ["a_bottom", 3],
    ]
  );
});

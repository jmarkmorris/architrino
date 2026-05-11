import test from "node:test";
import assert from "node:assert/strict";

import { SceneRepository } from "../src/services/SceneRepository.js";

function createRepository() {
  return new SceneRepository({
    colorTokens: {},
    autoMarkdownPalettes: {},
  });
}

test("fixed-position Scene-Index hub nodes are eligible for runtime palette colors", () => {
  const repository = createRepository();
  const nodes = [
    {
      id: "center",
      color: "#111111",
      fixedPosition: true,
    },
    {
      id: "peripheral",
      color: "#222222",
      fixedPosition: true,
    },
  ];

  assert.equal(
    repository.shouldIncludeFixedPositionInStructuredPalette({
      scene: { type: "Scene-Index" },
    }),
    true
  );

  repository.applyStructuredSpherePalette(nodes, ["#aaaaaa"], {
    includeFixedPosition: true,
  });

  assert.deepEqual(
    nodes.map((node) => node.color),
    ["#aaaaaa", "#aaaaaa"]
  );
});

test("fixed-position non-hub diagram nodes keep authored semantic colors", () => {
  const repository = createRepository();
  const nodes = [
    {
      id: "fixed_particle",
      color: "#111111",
      fixedPosition: true,
    },
    {
      id: "floating_navigation_node",
      color: "#222222",
      fixedPosition: false,
    },
  ];

  assert.equal(
    repository.shouldIncludeFixedPositionInStructuredPalette({
      scene: { type: "Scene-Diagram" },
    }),
    false
  );

  repository.applyStructuredSpherePalette(nodes, ["#aaaaaa"], {
    includeFixedPosition: false,
  });

  assert.deepEqual(
    nodes.map((node) => node.color),
    ["#111111", "#aaaaaa"]
  );
});

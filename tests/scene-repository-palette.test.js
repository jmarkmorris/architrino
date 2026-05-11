import test from "node:test";
import assert from "node:assert/strict";

import { SceneRepository } from "../src/services/SceneRepository.js";

function createRepository() {
  return new SceneRepository({
    colorTokens: {},
    autoMarkdownPalettes: {},
  });
}

function createRepositoryWithScenes(scenesByPath) {
  return new SceneRepository({
    colorTokens: {},
    autoMarkdownPalettes: {},
    levelConfigs: {},
    sceneConfigCache: new Map(),
    appendCacheBust: (path) => path,
    buildAutoMarkdownNodes: async () => [],
    fetchImpl: async (path) => {
      const scene = scenesByPath[path];
      return {
        ok: Boolean(scene),
        json: async () => scene,
      };
    },
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

test("Scene-Index nodes infer doc badges from markdown child scenes", async () => {
  const repository = createRepositoryWithScenes({
    "content/scenes/example/markdown_child.json": {
      scene: {
        type: "Scene-Markdown-View",
        source: {
          type: "markdown",
          path: "content/markdown/example.md",
        },
      },
      objects: [],
    },
    "content/scenes/example/plain_child.json": {
      scene: {
        type: "Scene-Diagram",
      },
      objects: [],
    },
  });

  const config = await repository.createConfigFromSceneData(
    "content/scenes/example/index.json",
    {
      scene: {
        type: "Scene-Index",
        children: [
          {
            nodeId: "markdown_child",
            scenePath: "content/scenes/example/markdown_child.json",
          },
          {
            nodeId: "plain_child",
            scenePath: "content/scenes/example/plain_child.json",
          },
          {
            nodeId: "explicit_badge",
            scenePath: "content/scenes/example/markdown_child.json",
          },
        ],
      },
      objects: [
        {
          id: "markdown_child",
        },
        {
          id: "plain_child",
        },
        {
          id: "explicit_badge",
          labelBadge: "diagram",
        },
      ],
    }
  );

  assert.equal(
    config.nodes.find((node) => node.id === "markdown_child")?.labelBadge,
    "doc"
  );
  assert.equal(config.nodes.find((node) => node.id === "plain_child")?.labelBadge, null);
  assert.equal(
    config.nodes.find((node) => node.id === "explicit_badge")?.labelBadge,
    "diagram"
  );
});

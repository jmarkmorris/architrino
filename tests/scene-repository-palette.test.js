import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { SceneRepository } from "../src/services/SceneRepository.js";

function createRepository() {
  return new SceneRepository({
    colorTokens: {},
    autoMarkdownPalettes: {},
  });
}

function createRepositoryWithScenes(scenesByPath, overrides = {}) {
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
    ...overrides,
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

test("structured sphere palettes assign stable colors by node order", () => {
  const repository = createRepository();
  const nodes = [{ id: "alpha" }, { id: "beta" }, { id: "gamma" }];

  repository.applyStructuredSpherePalette(nodes, ["#111111", "#222222"], {});

  assert.deepEqual(
    nodes.map((node) => node.color),
    ["#111111", "#222222", "#111111"]
  );
});

test("markdown section ring scenes default to stable single-ring order", async () => {
  let observedSplitRuntimeScene = null;
  const repository = createRepositoryWithScenes(
    {},
    {
      buildAutoMarkdownNodes: async (scene) => {
        observedSplitRuntimeScene = scene;
        return [];
      },
    }
  );

  const config = await repository.createConfigFromSceneData(
    "content/scenes/example/sectioned.json",
    {
      scene: {
        id: "example_sectioned",
        title: "Example Sectioned",
        type: "Scene-Markdown-Split",
        centerOn: "example_overview",
        layout: {
          type: "rings",
        },
        source: {
          type: "markdown",
          path: "content/markdown/example.md",
          split: {
            headingLevel: 2,
            maxDepth: 1,
          },
        },
      },
      objects: [],
    }
  );

  assert.deepEqual(config.layoutConfig, {
    type: "rings",
    centerNode: "example_overview",
    direction: "clockwise",
    order: "objects",
    allowInnerRings: false,
  });
  assert.equal(observedSplitRuntimeScene.layoutConfig, config.layoutConfig);
});

test("Archie hub keeps authored colors from the standard sphere palette", async () => {
  const archieSceneData = JSON.parse(
    await readFile(
      new URL("../content/scenes/archie/archie.json", import.meta.url),
      "utf8"
    )
  );
  const repository = createRepositoryWithScenes(
    {},
    {
      autoMarkdownPalettes: {
        jewel: ["#aaaaaa"],
      },
      defaultSphereColorSchemeName: "jewel",
    }
  );

  const config = await repository.createConfigFromSceneData(
    "content/scenes/archie/archie.json",
    archieSceneData
  );

  assert.deepEqual(
    config.nodes.map((node) => node.color),
    [
      "#9d174d",
      "#1d4ed8",
      "#a21caf",
      "#166534",
      "#7a5a2f",
      "#7a5a2f",
      "#4b5e2f",
      "#3f5f6f",
      "#be123c",
      "#243d8f",
    ]
  );
});

test("textbook PDF review spheres expose generated PDF files", async () => {
  const sceneData = JSON.parse(
    await readFile(
      new URL("../content/scenes/archie/textbook_pdf_snapshots.json", import.meta.url),
      "utf8"
    )
  );
  const repository = createRepositoryWithScenes({});

  const config = await repository.createConfigFromSceneData(
    "content/scenes/archie/textbook_pdf_snapshots.json",
    sceneData
  );
  const readingCopyNodes = config.nodes.filter(
    (node) => node.id.startsWith("pdf_snapshot_") && node.id !== "pdf_snapshot_overview"
  );

  assert.equal(readingCopyNodes.length, 13);
  assert.ok(
    readingCopyNodes.some(
      (node) =>
        node.id === "pdf_snapshot_comparative_glossary" &&
        node.filePath ===
          "content/generated/pdf/textbook/review-copies/comparative-glossary.pdf"
    )
  );
  for (const node of readingCopyNodes) {
    assert.equal(node.markdownPath, null);
    assert.equal(node.fileSourceType, "pdf");
    assert.equal(node.fileOpenMode, "new-tab");
    assert.equal(node.fileDownload, false);
    assert.equal(node.fileOpenEligible, true);
    assert.match(node.filePath, /^content\/generated\/pdf\/textbook\/review-copies\/.+\.pdf$/);
  }
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

test("Scene-Index nodes receive textbook chapter labels from resolver", async () => {
  const repository = createRepositoryWithScenes(
    {
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
    },
    {
      resolveTextbookChapterLabel: async (node) =>
        node.childScene === "content/scenes/example/markdown_child.json" ? "Ch 3.2" : null,
    }
  );

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
        ],
      },
      objects: [
        {
          id: "markdown_child",
        },
      ],
    }
  );

  assert.equal(
    config.nodes.find((node) => node.id === "markdown_child")?.textbookChapterLabel,
    "Ch 3.2"
  );
});

test("Scene-Index can opt out of runtime textbook chapter labels", async () => {
  const repository = createRepositoryWithScenes(
    {
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
    },
    {
      resolveTextbookChapterLabel: async (node) =>
        node.childScene === "content/scenes/example/markdown_child.json" ? "Ch 3.2" : null,
    }
  );

  const config = await repository.createConfigFromSceneData(
    "content/scenes/example/status-card.json",
    {
      scene: {
        type: "Scene-Index",
        textbookToc: {
          hideChapterLabels: true,
        },
        children: [
          {
            nodeId: "markdown_child",
            scenePath: "content/scenes/example/markdown_child.json",
          },
        ],
      },
      objects: [
        {
          id: "markdown_child",
        },
      ],
    }
  );

  assert.equal(
    config.nodes.find((node) => node.id === "markdown_child")?.textbookChapterLabel ?? null,
    null
  );

  const hiddenChildrenConfig = await repository.createConfigFromSceneData(
    "content/scenes/example/hidden-children-card.json",
    {
      scene: {
        type: "Scene-Index",
        textbookToc: {
          hideChildren: true,
        },
        children: [
          {
            nodeId: "markdown_child",
            scenePath: "content/scenes/example/markdown_child.json",
          },
        ],
      },
      objects: [
        {
          id: "markdown_child",
        },
      ],
    }
  );

  assert.equal(
    hiddenChildrenConfig.nodes.find((node) => node.id === "markdown_child")?.textbookChapterLabel ??
      null,
    null
  );
});

test("authored scene nodes are normalized to one visible sphere radius", async () => {
  const repository = createRepositoryWithScenes({});

  const config = await repository.createConfigFromSceneData(
    "content/scenes/example/mixed-radius.json",
    {
      scene: {
        type: "Scene-Index",
      },
      objects: [
        {
          id: "small",
          radius: 0.8,
        },
        {
          id: "middle",
          radius: 1.2,
        },
        {
          id: "large",
          radius: 2.4,
        },
        {
          id: "legend",
          category: "legend",
          radius: 99,
        },
        {
          id: "hidden",
          hideSphere: true,
          radius: 42,
        },
      ],
    }
  );

  assert.equal(config.sceneSphereRadius, 1.2);
  assert.deepEqual(
    config.nodes.map((node) => node.radius),
    [1.2, 1.2, 1.2, 99, 42]
  );
});

test("markdown view options propagate to runtime nodes", async () => {
  const repository = createRepositoryWithScenes({});

  const config = await repository.createConfigFromSceneData(
    "content/scenes/example/downloads.json",
    {
      scene: {
        type: "Scene-Markdown-View",
      },
      objects: [
        {
          id: "reading_copy",
          title: "Reading Copy",
          source: {
            type: "markdown",
            path: "content/generated/markdown/textbook/reading-copies/foundations.md",
          },
          view: {
            columns: 1,
            autoOpen: false,
            downloadOnly: true,
          },
        },
      ],
    }
  );

  const node = config.nodes.find((entry) => entry.id === "reading_copy");
  assert.equal(
    node?.markdownPath,
    "content/generated/markdown/textbook/reading-copies/foundations.md"
  );
  assert.equal(node?.markdownColumns, 1);
  assert.equal(node?.markdownAutoOpen, false);
  assert.equal(node?.markdownDownloadOnly, true);
});

test("markdown split grid gap options propagate to runtime config", async () => {
  let capturedScene = null;
  const repository = createRepositoryWithScenes(
    {},
    {
      buildAutoMarkdownNodes: async (scene) => {
        capturedScene = scene;
        return [];
      },
    }
  );

  const config = await repository.createConfigFromSceneData(
    "content/scenes/example/notebook.json",
    {
      scene: {
        type: "Scene-Markdown-Split",
        layout: {
          type: "grid",
        },
        view: {
          fit: "viewport",
        },
        source: {
          type: "markdown",
          path: "content/markdown/example.md",
          split: {
            headingLevel: 2,
            maxDepth: 1,
            nodeRadius: 1.76,
            gridGapMultiplier: 2,
            gridSpacing: 4.75,
          },
        },
      },
      objects: [],
    }
  );

  assert.equal(config.splitGridGapMultiplier, 2);
  assert.equal(config.splitGridSpacing, 4.75);
  assert.equal(config.splitNodeRadius, 1.76);
  assert.equal(config.viewportFit, "viewport");
  assert.equal(capturedScene?.splitGridGapMultiplier, 2);
  assert.equal(capturedScene?.splitGridSpacing, 4.75);
  assert.equal(capturedScene?.splitNodeRadius, 1.76);
  assert.equal(capturedScene?.viewportFit, "viewport");
});

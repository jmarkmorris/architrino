import test from "node:test";
import assert from "node:assert/strict";

import {
  isSceneHiddenFromMainApp,
  isSceneVisibleInMainApp,
} from "../src/services/MainAppSceneVisibility.js";
import { SceneRepository } from "../src/services/SceneRepository.js";

test("main app scene visibility hides scenes marked with mainAppHidden", () => {
  const hiddenScene = {
    scene: {
      id: "reaction_designer",
      title: "Reaction Designer",
      mainAppHidden: true,
    },
  };

  assert.equal(isSceneHiddenFromMainApp(hiddenScene), true);
  assert.equal(isSceneVisibleInMainApp(hiddenScene), false);
  assert.equal(isSceneHiddenFromMainApp({ scene: { id: "composer" } }), false);
});

test("scene repository refuses to load scenes hidden from the main app", async () => {
  const repository = new SceneRepository({
    fetchImpl: async () => ({
      ok: true,
      async json() {
        return {
          scene: {
            id: "reaction_designer",
            title: "Reaction Designer",
            type: "Scene-Diagram",
            mainAppHidden: true,
            layout: {
              type: "rings",
            },
          },
          objects: [],
        };
      },
    }),
    appendCacheBust: (scenePath) => scenePath,
    sceneConfigCache: new Map(),
    sceneLoadPromises: new Map(),
    levelConfigs: {},
    normalizeVelocity: (value) => value,
    colorTokens: {},
    buildAutoMarkdownNodes: async () => [],
    resolveMarkdownFileSize: async () => 0,
    resolveMarkdownFileCharacterCount: async () => 0,
  });

  const config = await repository.loadSceneConfig(
    "content/scenes/archie/reaction_designer.json"
  );

  assert.equal(config, null);
});

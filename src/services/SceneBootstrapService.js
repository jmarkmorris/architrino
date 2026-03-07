export function createSceneBootstrapService(deps = {}) {
  const levelConfigs = deps.levelConfigs ?? {};
  const sceneRepository = deps.sceneRepository;
  const markdownSceneRegistry = deps.markdownSceneRegistry;
  const rootScenePath = deps.rootScenePath;

  async function loadSceneConfig(scenePath) {
    if (levelConfigs[scenePath]) {
      return levelConfigs[scenePath];
    }
    if (
      markdownSceneRegistry &&
      typeof markdownSceneRegistry.ensureRuntimeMarkdownScene === "function"
    ) {
      const resolvedTarget = await markdownSceneRegistry.ensureRuntimeMarkdownScene(scenePath);
      if (typeof resolvedTarget === "string" && levelConfigs[resolvedTarget]) {
        return levelConfigs[resolvedTarget];
      }
    }
    if (!sceneRepository || typeof sceneRepository.loadSceneConfig !== "function") {
      return null;
    }
    return sceneRepository.loadSceneConfig(scenePath);
  }

  async function ensureDynamicSceneConfig(sceneId) {
    if (!sceneRepository || typeof sceneRepository.ensureDynamicSceneConfig !== "function") {
      return null;
    }
    return sceneRepository.ensureDynamicSceneConfig(sceneId);
  }

  async function ensureSceneReady(scenePath) {
    const config = levelConfigs[scenePath] ?? (await loadSceneConfig(scenePath));
    if (!config) {
      return null;
    }
    await ensureDynamicSceneConfig(scenePath);
    return config;
  }

  async function resolveInitialScene(requestedScenePath) {
    let initialScenePath = requestedScenePath || rootScenePath;
    let initialConfig = await loadSceneConfig(initialScenePath);
    if (!initialConfig && initialScenePath !== rootScenePath) {
      initialScenePath = rootScenePath;
      initialConfig = await loadSceneConfig(initialScenePath);
    }
    if (!initialConfig) {
      return null;
    }
    await ensureDynamicSceneConfig(initialScenePath);
    return {
      scenePath: initialScenePath,
      config: initialConfig,
    };
  }

  return {
    loadSceneConfig,
    ensureDynamicSceneConfig,
    ensureSceneReady,
    resolveInitialScene,
  };
}

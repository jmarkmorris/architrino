export function createSceneSearchCoordinatorService(deps = {}) {
  const sceneIndexService = deps.sceneIndexService;
  const sceneSearchRuntime = deps.sceneSearchRuntime;
  const fetchImpl = deps.fetchImpl;
  const sceneGraphManifestPath = deps.sceneGraphManifestPath;

  async function ensureSceneIndex() {
    if (
      !sceneIndexService ||
      typeof sceneIndexService.ensure !== "function" ||
      typeof fetchImpl !== "function"
    ) {
      return;
    }
    await sceneIndexService.ensure(fetchImpl, sceneGraphManifestPath);
  }

  async function toggleSearchPanel() {
    if (!sceneSearchRuntime || typeof sceneSearchRuntime.isSearchOpen !== "function") {
      return;
    }
    if (!sceneSearchRuntime.isSearchOpen()) {
      await ensureSceneIndex();
    }
    sceneSearchRuntime.setSearchOpen(!sceneSearchRuntime.isSearchOpen());
  }

  async function openSearchPanel() {
    if (!sceneSearchRuntime || typeof sceneSearchRuntime.isSearchOpen !== "function") {
      return;
    }
    if (!sceneSearchRuntime.isSearchOpen()) {
      await ensureSceneIndex();
      sceneSearchRuntime.setSearchOpen(true);
    }
  }

  function closeSearchPanel() {
    if (!sceneSearchRuntime || typeof sceneSearchRuntime.setSearchOpen !== "function") {
      return;
    }
    sceneSearchRuntime.setSearchOpen(false);
  }

  return {
    ensureSceneIndex,
    toggleSearchPanel,
    openSearchPanel,
    closeSearchPanel,
  };
}

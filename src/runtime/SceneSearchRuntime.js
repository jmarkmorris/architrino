export function createSceneSearchRuntime(deps) {
  const {
    sceneSearch,
    sceneSearchToggle,
    sceneSearchPanel,
    sceneSearchInput,
    sceneSearchResults,
    sceneIndexService,
    getCurrentLevel,
    navigationStack,
    searchBackStack,
    jumpToScene,
  } = deps;

  function normalizeSearch(text) {
    return text.trim().toLowerCase();
  }

  function getSearchEntries() {
    if (sceneIndexService && typeof sceneIndexService.getSearchEntries === "function") {
      return sceneIndexService.getSearchEntries();
    }
    return sceneIndexService.getScenes();
  }

  function updateSearchResults(query) {
    if (!sceneSearchResults) {
      return;
    }
    const normalized = normalizeSearch(query);
    const matches = getSearchEntries().filter((scene) => {
      if (!normalized) {
        return true;
      }
      const name = (scene.name || "").toLowerCase();
      const id = (scene.id || "").toLowerCase();
      const path = (scene.path || "").toLowerCase();
      const nodeType = (scene.nodeType || "").toLowerCase();
      return (
        name.includes(normalized) ||
        id.includes(normalized) ||
        path.includes(normalized) ||
        nodeType.includes(normalized)
      );
    });

    sceneSearchResults.innerHTML = "";
    matches.slice(0, 10).forEach((scene) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "scene-search-item";
      item.textContent = scene.name ?? scene.id ?? scene.path;
      item.addEventListener("click", () => {
        const currentLevel = getCurrentLevel();
        if (currentLevel) {
          searchBackStack.push({
            levelId: currentLevel.id,
            navigationStack: navigationStack.map((entry) => ({
              levelId: entry.levelId,
              focusNodeId: entry.focusNodeId,
            })),
          });
        }
        setSearchOpen(false);
        jumpToScene(scene.path, { mode: "jump" });
      });
      sceneSearchResults.appendChild(item);
    });
  }

  function setSearchOpen(isOpen) {
    if (!sceneSearchPanel) {
      return;
    }
    if (!isOpen && sceneSearchPanel.contains(document.activeElement)) {
      sceneSearchToggle?.focus();
    }
    sceneSearch?.classList.toggle("is-open", isOpen);
    sceneSearchPanel.classList.toggle("is-open", isOpen);
    sceneSearchPanel.setAttribute("aria-hidden", String(!isOpen));
    sceneSearchPanel.inert = !isOpen;
    if (isOpen && sceneSearchInput) {
      sceneSearchInput.value = "";
      updateSearchResults("");
      sceneSearchInput.focus();
    }
  }

  function isSearchOpen() {
    return sceneSearchPanel?.classList.contains("is-open");
  }

  function isSearchEventTarget(target) {
    return sceneSearchPanel?.contains(target) || sceneSearchToggle?.contains(target);
  }

  return {
    setSearchOpen,
    isSearchOpen,
    isSearchEventTarget,
    updateSearchResults,
  };
}

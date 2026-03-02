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

  function toSearchFields(scene) {
    return {
      name: String(scene?.name ?? "").toLowerCase(),
      id: String(scene?.id ?? "").toLowerCase(),
      path: String(scene?.path ?? "").toLowerCase(),
      nodeType: String(scene?.nodeType ?? "").toLowerCase(),
    };
  }

  function rankMatch(fields, normalizedQuery) {
    if (!normalizedQuery) {
      return 0;
    }
    if (fields.name.startsWith(normalizedQuery)) {
      return 0;
    }
    if (fields.id.startsWith(normalizedQuery)) {
      return 1;
    }
    if (fields.name.includes(normalizedQuery)) {
      return 2;
    }
    if (fields.id.includes(normalizedQuery)) {
      return 3;
    }
    if (fields.path.includes(normalizedQuery)) {
      return 4;
    }
    if (fields.nodeType.includes(normalizedQuery)) {
      return 5;
    }
    return Number.POSITIVE_INFINITY;
  }

  function updateSearchResults(query) {
    if (!sceneSearchResults) {
      return;
    }
    const normalized = normalizeSearch(query);
    const matches = getSearchEntries()
      .map((scene) => {
        const fields = toSearchFields(scene);
        return {
          scene,
          rank: rankMatch(fields, normalized),
          sortName: fields.name || fields.id || fields.path,
        };
      })
      .filter((entry) => !normalized || Number.isFinite(entry.rank))
      .sort((a, b) => {
        if (a.rank !== b.rank) {
          return a.rank - b.rank;
        }
        return a.sortName.localeCompare(b.sortName);
      })
      .map((entry) => entry.scene);

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

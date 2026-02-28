export function createSceneSearchUiRuntime(deps) {
  const {
    sceneSearchToggle,
    sceneSearchInput,
    sceneSearchResults,
    sceneSearchRuntime,
    sceneSearchCoordinator,
    documentRef = document,
    windowRef = window,
  } = deps;

  function wireListeners() {
    if (sceneSearchToggle) {
      sceneSearchToggle.addEventListener("click", async () => {
        await sceneSearchCoordinator.toggleSearchPanel();
      });
    }

    if (sceneSearchInput) {
      sceneSearchInput.addEventListener("input", (event) => {
        sceneSearchRuntime.updateSearchResults(event.target.value);
      });
      sceneSearchInput.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          sceneSearchCoordinator.closeSearchPanel();
          return;
        }
        if (event.key === "Enter") {
          const firstItem = sceneSearchResults?.querySelector(".scene-search-item");
          if (firstItem) {
            firstItem.click();
          }
        }
      });
    }

    documentRef.addEventListener("pointerdown", (event) => {
      if (!sceneSearchRuntime.isSearchOpen()) {
        return;
      }
      if (sceneSearchRuntime.isSearchEventTarget(event.target)) {
        return;
      }
      sceneSearchCoordinator.closeSearchPanel();
    });

    documentRef.addEventListener("focusin", (event) => {
      if (!sceneSearchRuntime.isSearchOpen()) {
        return;
      }
      if (sceneSearchRuntime.isSearchEventTarget(event.target)) {
        return;
      }
      sceneSearchCoordinator.closeSearchPanel();
    });

    windowRef.addEventListener("keydown", async (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (!sceneSearchRuntime.isSearchOpen()) {
          await sceneSearchCoordinator.openSearchPanel();
        } else {
          sceneSearchCoordinator.closeSearchPanel();
        }
      } else if (event.key === "Escape" && sceneSearchRuntime.isSearchOpen()) {
        sceneSearchCoordinator.closeSearchPanel();
      }
    });
  }

  return {
    wireListeners,
  };
}

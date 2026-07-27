export function createSceneSearchUiRuntime(deps) {
  const {
    sceneSearchToggle,
    sceneSearchInput,
    sceneSearchResults,
    sceneSearchRuntime,
    sceneSearchCoordinator,
    documentRef = document,
    windowRef = window,
    eventSignal,
  } = deps;
  const listenerOptions = eventSignal ? { signal: eventSignal } : undefined;

  function wireListeners() {
    if (sceneSearchToggle) {
      sceneSearchToggle.addEventListener("click", async () => {
        await sceneSearchCoordinator.toggleSearchPanel();
      }, listenerOptions);
    }

    if (sceneSearchInput) {
      sceneSearchInput.addEventListener("input", (event) => {
        sceneSearchRuntime.updateSearchResults(event.target.value);
      }, listenerOptions);
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
      }, listenerOptions);
    }

    documentRef.addEventListener("pointerdown", (event) => {
      if (!sceneSearchRuntime.isSearchOpen()) {
        return;
      }
      if (sceneSearchRuntime.isSearchEventTarget(event.target)) {
        return;
      }
      sceneSearchCoordinator.closeSearchPanel();
    }, listenerOptions);

    documentRef.addEventListener("focusin", (event) => {
      if (!sceneSearchRuntime.isSearchOpen()) {
        return;
      }
      if (sceneSearchRuntime.isSearchEventTarget(event.target)) {
        return;
      }
      sceneSearchCoordinator.closeSearchPanel();
    }, listenerOptions);

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
    }, listenerOptions);
  }

  return {
    wireListeners,
  };
}

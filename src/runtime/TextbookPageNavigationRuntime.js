export function createTextbookPageNavigationRuntime(deps = {}) {
  const container = deps.container ?? null;
  const previousButton = deps.previousButton ?? null;
  const nextButton = deps.nextButton ?? null;
  const navigationService = deps.navigationService ?? null;
  const navigateToPage = deps.navigateToPage;
  const getCurrentLevel = deps.getCurrentLevel;
  const isTransitionActive = deps.isTransitionActive;
  const documentRef = deps.document ?? globalThis.document;
  const logger = deps.logger ?? console;

  let activeNavigation = null;
  let syncVersion = 0;
  let transitionActive = false;
  let wired = false;

  function isActiveTransition() {
    return transitionActive || isTransitionActive?.() === true;
  }

  function setContainerVisible(visible) {
    container?.classList?.toggle?.("is-visible", visible);
    container?.setAttribute?.("aria-hidden", String(!visible));
    documentRef?.body?.classList?.toggle?.("has-textbook-page-nav", visible);
  }

  function setButtonState(button, entry, label) {
    if (!button) {
      return;
    }
    const enabled = !!entry && !isActiveTransition();
    button.disabled = !enabled;
    button.classList?.toggle?.("is-disabled", !entry);
    const ariaLabel = entry
      ? `${label} textbook page: ${entry.title}`
      : `${label} textbook page`;
    button.setAttribute?.("aria-label", ariaLabel);
    button.title = ariaLabel;
  }

  function applyNavigation(navigation) {
    activeNavigation = navigation;
    const visible = !!navigation && navigation.total > 1;
    setContainerVisible(visible);
    setButtonState(previousButton, visible ? navigation.previous : null, "Previous");
    setButtonState(nextButton, visible ? navigation.next : null, "Next");
  }

  function setTransitionActive(active) {
    transitionActive = !!active;
    setButtonState(previousButton, activeNavigation?.previous ?? null, "Previous");
    setButtonState(nextButton, activeNavigation?.next ?? null, "Next");
  }

  async function syncCurrentLevel(level = getCurrentLevel?.() ?? null) {
    const version = ++syncVersion;
    const hasLookupTarget = !!(
      level?.markdownPath ||
      level?.id ||
      level?.scenePath ||
      level?.childScene
    );
    if (!hasLookupTarget || !navigationService?.resolvePageNavigation) {
      applyNavigation(null);
      return null;
    }

    try {
      const navigation = await navigationService.resolvePageNavigation(level);
      if (version !== syncVersion) {
        return null;
      }
      applyNavigation(navigation);
      return navigation;
    } catch (error) {
      if (version === syncVersion) {
        applyNavigation(null);
      }
      logger?.warn?.("Failed to sync textbook page navigation", error);
      return null;
    }
  }

  async function move(direction) {
    if (isActiveTransition()) {
      return false;
    }
    const entry = direction === "previous" ? activeNavigation?.previous : activeNavigation?.next;
    if (!entry || typeof navigateToPage !== "function") {
      return false;
    }
    setTransitionActive(true);
    try {
      const moved = await navigateToPage(entry, {
        direction,
        navigation: activeNavigation,
      });
      if (moved === false) {
        setTransitionActive(false);
        return false;
      }
      return true;
    } catch (error) {
      logger?.warn?.("Failed to navigate textbook page", error);
      setTransitionActive(false);
      return false;
    }
  }

  function wireListeners() {
    if (wired) {
      return;
    }
    previousButton?.addEventListener?.("click", (event) => {
      event?.preventDefault?.();
      return move("previous");
    });
    nextButton?.addEventListener?.("click", (event) => {
      event?.preventDefault?.();
      return move("next");
    });
    wired = true;
  }

  return {
    syncCurrentLevel,
    setTransitionActive,
    wireListeners,
  };
}

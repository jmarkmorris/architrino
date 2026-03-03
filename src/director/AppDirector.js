export class AppDirector {
  constructor(deps) {
    this.deps = deps;
  }

  async init() {
    return this.deps.initialize();
  }

  isTransitionActive() {
    return Boolean(this.deps.getTransitionState()?.active);
  }

  async navigateTo(scenePath, options = {}) {
    if (this.isTransitionActive()) {
      return;
    }
    return this.deps.jumpToScene(scenePath, options);
  }

  async resetHome() {
    if (this.isTransitionActive()) {
      return;
    }
    return this.deps.resetToRootScene();
  }

  async goBack() {
    if (this.isTransitionActive()) {
      return false;
    }

    const popBackEntry = this.deps.popHistoryBackEntry;
    const pushForwardEntry = this.deps.pushHistoryForwardEntry;
    const captureHistoryEntry = this.deps.captureHistoryEntry;
    if (
      typeof popBackEntry === "function" &&
      typeof pushForwardEntry === "function" &&
      typeof captureHistoryEntry === "function"
    ) {
      const previousEntry = popBackEntry();
      if (!previousEntry?.levelId) {
        return false;
      }
      const currentEntry = captureHistoryEntry();
      if (currentEntry?.levelId) {
        pushForwardEntry(currentEntry);
      }
      await this.deps.jumpToScene(previousEntry.levelId, {
        mode: "jump",
        restoreNavStack: previousEntry.navigationStack,
        historyTraversal: true,
      });
      return true;
    }

    const generationStack = this.deps.getGenerationBackStack?.() ?? [];
    if (generationStack.length > 0) {
      const backState = generationStack.pop();
      if (backState?.levelId) {
        await this.deps.jumpToScene(backState.levelId, {
          restoreNavStack: backState.navigationStack,
          preserveGenerationBackStack: true,
          preserveWorldPosition: true,
          preserveLevelPosition: true,
        });
        return true;
      }
      return false;
    }

    const navStack = this.deps.getNavigationStack();
    if (navStack.length > 0) {
      this.deps.startLevelTransitionOut();
      return true;
    }

    const searchStack = this.deps.getSearchBackStack();
    if (searchStack.length > 0) {
      const backState = searchStack.pop();
      if (backState?.levelId) {
        await this.deps.jumpToScene(backState.levelId, {
          restoreNavStack: backState.navigationStack,
        });
        return true;
      }
      return false;
    }

    const metaStack = this.deps.getMetaBackStack();
    if (metaStack.length > 0) {
      const backState = metaStack.pop();
      if (backState?.levelId) {
        await this.deps.jumpToScene(backState.levelId, {
          restoreNavStack: backState.navigationStack,
        });
        return true;
      }
    }
    return false;
  }

  async goForward() {
    if (this.isTransitionActive()) {
      return false;
    }

    const popForwardEntry = this.deps.popHistoryForwardEntry;
    const pushBackEntry = this.deps.pushHistoryBackEntry;
    const captureHistoryEntry = this.deps.captureHistoryEntry;
    if (
      typeof popForwardEntry !== "function" ||
      typeof pushBackEntry !== "function" ||
      typeof captureHistoryEntry !== "function"
    ) {
      return false;
    }
    const nextEntry = popForwardEntry();
    if (!nextEntry?.levelId) {
      return false;
    }
    const currentEntry = captureHistoryEntry();
    if (currentEntry?.levelId) {
      pushBackEntry(currentEntry);
    }
    await this.deps.jumpToScene(nextEntry.levelId, {
      mode: "jump",
      restoreNavStack: nextEntry.navigationStack,
      historyTraversal: true,
    });
    return true;
  }
}

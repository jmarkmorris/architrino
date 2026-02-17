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
      return;
    }

    const navStack = this.deps.getNavigationStack();
    if (navStack.length > 0) {
      this.deps.startLevelTransitionOut();
      return;
    }

    const searchStack = this.deps.getSearchBackStack();
    if (searchStack.length > 0) {
      const backState = searchStack.pop();
      if (backState?.levelId) {
        await this.deps.jumpToScene(backState.levelId, {
          restoreNavStack: backState.navigationStack,
        });
      }
      return;
    }

    const metaStack = this.deps.getMetaBackStack();
    if (metaStack.length > 0) {
      const backState = metaStack.pop();
      if (backState?.levelId) {
        await this.deps.jumpToScene(backState.levelId, {
          restoreNavStack: backState.navigationStack,
        });
      }
    }
  }
}

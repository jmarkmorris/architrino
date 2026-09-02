import { createTopDynamicControlBar } from "../../runtime/TopDynamicControlBarRuntime.js";
import {
  navigateStandaloneAppHome,
  resolveStandaloneAppHomeHref,
} from "./StandaloneAppHomeRuntime.js";
import {
  createStandaloneAppSceneSearchRuntime,
  resolveStandaloneGlobalSceneHref,
  TEXTBOOK_TOC_SCENE_PATH,
} from "./StandaloneAppSceneSearchRuntime.js";

function normalizeCapability(value, defaults) {
  if (value === false) {
    return null;
  }
  return {
    ...defaults,
    ...(value && typeof value === "object" ? value : {}),
  };
}

function navigateWithReturn(windowLike, href) {
  return navigateStandaloneAppHome(windowLike?.location, href, {
    windowLike,
    returnHref: windowLike?.location?.href,
  });
}

export function createStandaloneAppNavigationRuntime({
  host,
  document: documentLike = globalThis.document,
  window: windowLike = globalThis.window,
  fetchImpl,
  label = "Webapp navigation",
  toc = {},
  back = {},
  forward = {},
  home = {},
  search = {},
  extensionActions = [],
  sceneSearchFactory = createStandaloneAppSceneSearchRuntime,
} = {}) {
  if (!host) {
    throw new Error("Standalone app navigation requires a host.");
  }
  const tocCapability = normalizeCapability(toc, {
    label: "Open textbook table of contents",
    title: "Table of Contents",
  });
  const backCapability = normalizeCapability(back, {
    label: "Go back",
    title: "Back",
  });
  const forwardCapability = normalizeCapability(forward, {
    label: "Go forward",
    title: "Forward",
  });
  const homeCapability = normalizeCapability(home, {
    label: "Go to Applications",
    title: "Applications",
  });
  const searchCapability = normalizeCapability(search, {
    label: "Search scenes",
    title: "Search",
  });
  let sceneSearchRuntime = null;
  let initialized = false;
  let destroyed = false;

  const actions = [];
  if (tocCapability) {
    actions.push({
      ...tocCapability,
      kind: "toc",
      id: "textbook-toc-button",
      onActivate: tocCapability.onActivate ?? (() => {
        navigateWithReturn(
          windowLike,
          resolveStandaloneGlobalSceneHref(
            TEXTBOOK_TOC_SCENE_PATH,
            windowLike?.location?.href,
          ),
        );
      }),
    });
  }
  if (backCapability) {
    actions.push({
      ...backCapability,
      kind: "back",
      id: "nav-up",
      historyGroupId: "scene-nav-history",
      historyLabel: backCapability.historyLabel ?? "Browser history",
      onActivate: backCapability.onActivate ?? (() => windowLike?.history?.back?.()),
    });
  }
  if (forwardCapability) {
    actions.push({
      ...forwardCapability,
      kind: "forward",
      id: "nav-forward",
      onActivate: forwardCapability.onActivate ?? (() => windowLike?.history?.forward?.()),
    });
  }
  if (homeCapability) {
    actions.push({
      ...homeCapability,
      kind: "home",
      id: "home-button",
      onActivate: homeCapability.onActivate ?? (() => {
        navigateWithReturn(
          windowLike,
          resolveStandaloneAppHomeHref(windowLike?.location?.href),
        );
      }),
    });
  }
  if (searchCapability) {
    actions.push({
      ...searchCapability,
      kind: "search",
      id: "scene-search-toggle",
      onActivate: async ({ expanded }) => {
        if (expanded) {
          const coordinator = sceneSearchRuntime?.sceneSearchCoordinator;
          const searchRuntime = sceneSearchRuntime?.sceneSearchRuntime;
          if (typeof coordinator?.ensureSceneIndex === "function") {
            await coordinator.ensureSceneIndex();
          }
          if (typeof searchRuntime?.setSearchOpen === "function") {
            searchRuntime.setSearchOpen(true);
          } else {
            await coordinator?.openSearchPanel?.();
          }
        } else {
          sceneSearchRuntime?.sceneSearchCoordinator?.closeSearchPanel?.();
        }
      },
      popover: {
        containerId: "scene-search",
        id: "scene-search-panel",
        input: {
          id: "scene-search-input",
          type: "search",
          placeholder: "Search scenes",
          autocomplete: "off",
          label: "Search scenes",
        },
        resultsId: "scene-search-results",
      },
    });
  }
  actions.push(...extensionActions);

  const topDynamicControlBarRuntime = createTopDynamicControlBar({
    host,
    label,
    actions,
    document: documentLike,
    window: windowLike,
  });
  host.classList.add("is-standalone");

  if (searchCapability) {
    sceneSearchRuntime = sceneSearchFactory({
      document: documentLike,
      window: windowLike,
      fetchImpl,
      topDynamicControlBarRuntime,
      topBarOwnsPopover: true,
      onOpenChange: (isOpen) => {
        topDynamicControlBarRuntime.update({ search: { expanded: isOpen } });
        searchCapability.onOpenChange?.(isOpen);
      },
    });
  }

  return {
    root: host,
    topDynamicControlBarRuntime,
    get sceneSearchRuntime() {
      return sceneSearchRuntime;
    },
    init() {
      if (!initialized && !destroyed) {
        initialized = true;
        sceneSearchRuntime?.init?.();
      }
      return this;
    },
    update(nextState) {
      topDynamicControlBarRuntime.update(nextState);
    },
    getElement(kindOrId) {
      return topDynamicControlBarRuntime.getElement(kindOrId);
    },
    destroy() {
      if (destroyed) {
        return;
      }
      destroyed = true;
      sceneSearchRuntime?.destroy?.();
      sceneSearchRuntime = null;
      topDynamicControlBarRuntime.destroy();
      host.classList.remove("is-standalone");
    },
  };
}

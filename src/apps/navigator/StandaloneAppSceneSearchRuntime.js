import { createSceneSearchRuntime } from "../../runtime/SceneSearchRuntime.js";
import { createSceneSearchUiRuntime } from "../../runtime/SceneSearchUiRuntime.js";
import { SceneIndexService } from "../../services/SceneIndexService.js";
import { createSceneSearchCoordinatorService } from "../../services/SceneSearchCoordinatorService.js";
import {
  isPublicProductSceneSearchEntry,
  resolveStandaloneAppHrefForScene,
} from "./StandaloneAppLaunchRuntime.js";

export const GLOBAL_SCENE_GRAPH_MANIFEST_PATH = "content/graph/scene_graph.json";
export const TEXTBOOK_TOC_SCENE_PATH = "content/scenes/archie/textbook_toc.json";

export function resolveStandaloneGlobalSceneHref(scenePath = "", currentHref = "") {
  const normalizedScenePath = String(scenePath ?? "").trim();
  if (!normalizedScenePath) {
    return null;
  }
  const baseHref = String(currentHref ?? "").trim() || "http://localhost/";
  const standaloneHref = resolveStandaloneAppHrefForScene(normalizedScenePath, baseHref);
  if (standaloneHref) {
    return standaloneHref;
  }
  const url = new URL("./index.html", baseHref);
  const params = new URLSearchParams();
  params.set("scene", normalizedScenePath);
  url.hash = params.toString();
  return url.href;
}

export const resolveStandaloneGlobalSearchHref = resolveStandaloneGlobalSceneHref;

export function createStandaloneAppSceneSearchRuntime({
  document: documentLike = globalThis.document,
  window: windowLike = globalThis.window,
  fetchImpl = (...args) => windowLike.fetch(...args),
  sceneGraphManifestPath = GLOBAL_SCENE_GRAPH_MANIFEST_PATH,
  onOpenChange,
  topDynamicControlBarRuntime = null,
  topBarOwnsPopover = Boolean(topDynamicControlBarRuntime),
} = {}) {
  const AbortControllerCtor =
    windowLike?.AbortController ?? globalThis.AbortController;
  const listenerController =
    typeof AbortControllerCtor === "function"
      ? new AbortControllerCtor()
      : null;
  const sceneSearch =
    topDynamicControlBarRuntime?.actions?.get("search")?.wrapper ??
    documentLike.querySelector("#scene-search");
  const sceneSearchToggle =
    topDynamicControlBarRuntime?.getElement?.("search") ??
    documentLike.querySelector("#scene-search-toggle");
  const sceneSearchPanel =
    topDynamicControlBarRuntime?.getPopoverElement?.("search") ??
    documentLike.querySelector("#scene-search-panel");
  const sceneSearchInput =
    topDynamicControlBarRuntime?.getPopoverInput?.("search") ??
    documentLike.querySelector("#scene-search-input");
  const sceneSearchResults =
    topDynamicControlBarRuntime?.getPopoverResults?.("search") ??
    documentLike.querySelector("#scene-search-results");
  if (
    !sceneSearch ||
    !sceneSearchToggle ||
    !sceneSearchPanel ||
    !sceneSearchInput ||
    !sceneSearchResults
  ) {
    throw new Error("Missing shared standalone-app scene-search elements.");
  }

  const sceneIndexService = new SceneIndexService();
  const sceneSearchRuntime = createSceneSearchRuntime({
    sceneSearch,
    sceneSearchToggle,
    sceneSearchPanel,
    sceneSearchInput,
    sceneSearchResults,
    sceneIndexService,
    getCurrentLevel: () => null,
    navigationStack: [],
    searchBackStack: [],
    jumpToScene: (scenePath) => {
      const href = resolveStandaloneGlobalSceneHref(
        scenePath,
        windowLike?.location?.href,
      );
      if (href && typeof windowLike?.location?.assign === "function") {
        windowLike.location.assign(href);
      }
    },
    documentRef: documentLike,
    onOpenChange,
    isSearchEntryVisible: isPublicProductSceneSearchEntry,
  });
  const sceneSearchCoordinator = createSceneSearchCoordinatorService({
    sceneIndexService,
    sceneSearchRuntime,
    fetchImpl,
    sceneGraphManifestPath,
  });
  const sceneSearchUiRuntime = createSceneSearchUiRuntime({
    sceneSearchToggle,
    sceneSearchInput,
    sceneSearchResults,
    sceneSearchRuntime,
    sceneSearchCoordinator,
    documentRef: documentLike,
    windowRef: windowLike,
    eventSignal: listenerController?.signal,
    topBarOwnsPopover,
  });

  return {
    init() {
      sceneSearchRuntime.setSearchOpen(false);
      sceneSearchUiRuntime.wireListeners();
      return this;
    },
    destroy() {
      listenerController?.abort();
      sceneSearchRuntime.setSearchOpen(false);
    },
    sceneIndexService,
    sceneSearchRuntime,
    sceneSearchCoordinator,
  };
}

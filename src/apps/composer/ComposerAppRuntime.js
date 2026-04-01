import { createComposerUiRuntime } from "../../runtime/ComposerUiRuntime.js";
import { createComposerControlsUiRuntime } from "../../runtime/ComposerControlsUiRuntime.js";
import { createComposerEditorStore } from "../../runtime/ComposerStoreRuntime.js";
import { createComposerEditorStoreFacade } from "./ComposerEditorStoreFacadeRuntime.js";

const defaultComposerPanelEntries = Object.freeze([
  ["composer_tree", "tree"],
  ["composer_path", "path"],
  ["composer_orbit", "orbit"],
  ["composer_interactions", "interactions"],
  ["composer_preview", "preview"],
  ["composer_export", "export"],
]);

export function createComposerPanelMap() {
  return new Map(defaultComposerPanelEntries);
}

export function createComposerAppStore(options = {}) {
  const panelMap = createComposerPanelMap();
  const palette = Array.isArray(options.palette) ? options.palette : [];
  const editorStore = createComposerEditorStore({
    pathState: {
      points: [],
      interpolate: "spline",
      closed: false,
      ownerAssemblyId: null,
    },
  });

  return {
    panelMap,
    palette,
    editorStore,
    pathState: editorStore.getPathState(),
    storeFacade: createComposerEditorStoreFacade(editorStore),
  };
}

export function createComposerAppRuntime(options = {}) {
  const composerUiRuntime = createComposerUiRuntime(options.ui ?? {});
  const composerControlsUiRuntime = createComposerControlsUiRuntime({
    ...(options.controls ?? {}),
    composerUiRuntime,
  });

  return {
    composerUiRuntime,
    composerControlsUiRuntime,
    wireListeners() {
      composerControlsUiRuntime.wireListeners?.();
    },
  };
}

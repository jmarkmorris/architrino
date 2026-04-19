import { createAnimatorUiRuntime } from "../../runtime/AnimatorUiRuntime.js";
import { createAnimatorControlsUiRuntime } from "../../runtime/AnimatorControlsUiRuntime.js";
import { createAnimatorEditorStore } from "../../runtime/AnimatorStoreRuntime.js";
import { createAnimatorEditorStoreFacade } from "./AnimatorEditorStoreFacadeRuntime.js";

const defaultAnimatorPanelEntries = Object.freeze([
  ["animator_tree", "tree"],
  ["animator_path", "path"],
  ["animator_orbit", "orbit"],
  ["animator_interactions", "interactions"],
  ["animator_preview", "preview"],
  ["animator_export", "export"],
]);

export function createAnimatorPanelMap() {
  return new Map(defaultAnimatorPanelEntries);
}

export function createAnimatorAppStore(options = {}) {
  const panelMap = createAnimatorPanelMap();
  const palette = Array.isArray(options.palette) ? options.palette : [];
  const editorStore = createAnimatorEditorStore({
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
    storeFacade: createAnimatorEditorStoreFacade(editorStore),
  };
}

export function createAnimatorAppRuntime(options = {}) {
  const animatorUiRuntime = createAnimatorUiRuntime(options.ui ?? {});
  const animatorControlsUiRuntime = createAnimatorControlsUiRuntime({
    ...(options.controls ?? {}),
    animatorUiRuntime,
  });

  return {
    animatorUiRuntime,
    animatorControlsUiRuntime,
    wireListeners() {
      animatorControlsUiRuntime.wireListeners?.();
    },
  };
}

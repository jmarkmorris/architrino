import { createPdgviewUiRuntime } from "../../runtime/PdgviewUiRuntime.js";
import { createPdgviewControlsUiRuntime } from "../../runtime/PdgviewControlsUiRuntime.js";
import { createPdgviewEditorStore } from "../../runtime/PdgviewStoreRuntime.js";
import { createPdgviewEditorStoreFacade } from "./PdgviewEditorStoreFacadeRuntime.js";

const defaultPdgviewPanelEntries = Object.freeze([
  ["pdgview_tree", "tree"],
  ["pdgview_path", "path"],
  ["pdgview_orbit", "orbit"],
  ["pdgview_interactions", "interactions"],
  ["pdgview_preview", "preview"],
  ["pdgview_export", "export"],
]);

export function createPdgviewPanelMap() {
  return new Map(defaultPdgviewPanelEntries);
}

export function createPdgviewAppStore(options = {}) {
  const panelMap = createPdgviewPanelMap();
  const palette = Array.isArray(options.palette) ? options.palette : [];
  const editorStore = createPdgviewEditorStore({
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
    storeFacade: createPdgviewEditorStoreFacade(editorStore),
  };
}

export function createPdgviewAppRuntime(options = {}) {
  const pdgviewUiRuntime = createPdgviewUiRuntime(options.ui ?? {});
  const pdgviewControlsUiRuntime = createPdgviewControlsUiRuntime({
    ...(options.controls ?? {}),
    pdgviewUiRuntime,
  });

  return {
    pdgviewUiRuntime,
    pdgviewControlsUiRuntime,
    wireListeners() {
      pdgviewControlsUiRuntime.wireListeners?.();
    },
  };
}

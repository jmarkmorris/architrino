export function createComposerEditorStore(initialState = {}) {
  const state = {
    assemblyDrafts: Array.isArray(initialState.assemblyDrafts) ? initialState.assemblyDrafts : [],
    graphicOverlayDrafts: Array.isArray(initialState.graphicOverlayDrafts) ? initialState.graphicOverlayDrafts : [],
    selectedPointIndex:
      Number.isInteger(initialState.selectedPointIndex) ? initialState.selectedPointIndex : null,
    selectedAssemblyId: initialState.selectedAssemblyId ?? null,
    pendingTransferSource: initialState.pendingTransferSource ?? null,
    pathState:
      initialState.pathState && typeof initialState.pathState === "object"
        ? initialState.pathState
        : {
            points: [],
            interpolate: "spline",
            closed: false,
            ownerAssemblyId: null,
          },
  };

  return {
    getAssemblyDrafts: () => state.assemblyDrafts,
    setAssemblyDrafts: (nextValue) => {
      state.assemblyDrafts = Array.isArray(nextValue) ? nextValue : [];
      return state.assemblyDrafts;
    },
    getGraphicOverlayDrafts: () => state.graphicOverlayDrafts,
    setGraphicOverlayDrafts: (nextValue) => {
      state.graphicOverlayDrafts = Array.isArray(nextValue) ? nextValue : [];
      return state.graphicOverlayDrafts;
    },
    getSelectedPointIndex: () => state.selectedPointIndex,
    setSelectedPointIndex: (nextValue) => {
      state.selectedPointIndex = Number.isInteger(nextValue) ? nextValue : null;
      return state.selectedPointIndex;
    },
    getSelectedAssemblyId: () => state.selectedAssemblyId,
    setSelectedAssemblyId: (nextValue) => {
      state.selectedAssemblyId = nextValue ?? null;
      return state.selectedAssemblyId;
    },
    getPendingTransferSource: () => state.pendingTransferSource,
    setPendingTransferSource: (nextValue) => {
      state.pendingTransferSource = nextValue ?? null;
      return state.pendingTransferSource;
    },
    clearPendingTransferSource: () => {
      state.pendingTransferSource = null;
      return state.pendingTransferSource;
    },
    getPathState: () => state.pathState,
  };
}

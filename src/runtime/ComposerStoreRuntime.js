export function createComposerEditorStore(initialState = {}) {
  const state = {
    assemblyDrafts: Array.isArray(initialState.assemblyDrafts) ? initialState.assemblyDrafts : [],
    graphicOverlayDrafts: Array.isArray(initialState.graphicOverlayDrafts) ? initialState.graphicOverlayDrafts : [],
    selectedPointIndex:
      Number.isInteger(initialState.selectedPointIndex) ? initialState.selectedPointIndex : null,
    selectedAssemblyId: initialState.selectedAssemblyId ?? null,
    pendingTransferSource: initialState.pendingTransferSource ?? null,
    transferListRawState: String(initialState.transferListRawState ?? ""),
    reactionListRawState: String(initialState.reactionListRawState ?? ""),
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
    appendAssemblyDraft: (draft) => {
      state.assemblyDrafts = [...state.assemblyDrafts, draft];
      return state.assemblyDrafts;
    },
    removeAssemblyDraftById: (assemblyId) => {
      state.assemblyDrafts = state.assemblyDrafts.filter((entry) => entry?.id !== assemblyId);
      return state.assemblyDrafts;
    },
    getGraphicOverlayDrafts: () => state.graphicOverlayDrafts,
    setGraphicOverlayDrafts: (nextValue) => {
      state.graphicOverlayDrafts = Array.isArray(nextValue) ? nextValue : [];
      return state.graphicOverlayDrafts;
    },
    upsertGraphicOverlayDraft: (overlayDraft) => {
      const existingIndex = state.graphicOverlayDrafts.findIndex((entry) => entry?.id === overlayDraft?.id);
      if (existingIndex >= 0) {
        const nextDrafts = [...state.graphicOverlayDrafts];
        nextDrafts[existingIndex] = overlayDraft;
        state.graphicOverlayDrafts = nextDrafts;
      } else {
        state.graphicOverlayDrafts = [...state.graphicOverlayDrafts, overlayDraft];
      }
      return state.graphicOverlayDrafts;
    },
    removeGraphicOverlayDraftById: (overlayId) => {
      state.graphicOverlayDrafts = state.graphicOverlayDrafts.filter((entry) => entry?.id !== overlayId);
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
    getTransferListRawState: () => state.transferListRawState,
    setTransferListRawState: (nextValue) => {
      state.transferListRawState = String(nextValue ?? "");
      return state.transferListRawState;
    },
    getReactionListRawState: () => state.reactionListRawState,
    setReactionListRawState: (nextValue) => {
      state.reactionListRawState = String(nextValue ?? "");
      return state.reactionListRawState;
    },
    getPathState: () => state.pathState,
  };
}

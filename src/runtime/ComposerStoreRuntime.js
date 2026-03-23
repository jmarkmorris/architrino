export function createComposerEditorStore(initialState = {}) {
  const state = {
    assemblyDrafts: Array.isArray(initialState.assemblyDrafts) ? initialState.assemblyDrafts : [],
    graphicOverlayDrafts: Array.isArray(initialState.graphicOverlayDrafts) ? initialState.graphicOverlayDrafts : [],
    selectedPointIndex:
      Number.isInteger(initialState.selectedPointIndex) ? initialState.selectedPointIndex : null,
    selectedAssemblyId: initialState.selectedAssemblyId ?? null,
    pendingTransferSource: initialState.pendingTransferSource ?? null,
    transferListRawState: String(initialState.transferListRawState ?? ""),
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
    updateAssemblyDraftById: (assemblyId, updater) => {
      const draftIndex = state.assemblyDrafts.findIndex((entry) => entry?.id === assemblyId);
      if (draftIndex < 0 || typeof updater !== "function") {
        return null;
      }
      const currentDraft = state.assemblyDrafts[draftIndex];
      const nextDraft = updater(currentDraft);
      if (!nextDraft || nextDraft === currentDraft) {
        return nextDraft ?? currentDraft ?? null;
      }
      const nextDrafts = [...state.assemblyDrafts];
      nextDrafts[draftIndex] = nextDraft;
      state.assemblyDrafts = nextDrafts;
      return nextDraft;
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
    updateGraphicOverlayDraftById: (overlayId, updater) => {
      const draftIndex = state.graphicOverlayDrafts.findIndex((entry) => entry?.id === overlayId);
      if (draftIndex < 0 || typeof updater !== "function") {
        return null;
      }
      const currentDraft = state.graphicOverlayDrafts[draftIndex];
      const nextDraft = updater(currentDraft);
      if (!nextDraft || nextDraft === currentDraft) {
        return nextDraft ?? currentDraft ?? null;
      }
      const nextDrafts = [...state.graphicOverlayDrafts];
      nextDrafts[draftIndex] = nextDraft;
      state.graphicOverlayDrafts = nextDrafts;
      return nextDraft;
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
    getPathState: () => state.pathState,
    updatePathPointAt: (index, updater) => {
      if (!Number.isInteger(index) || index < 0 || index >= state.pathState.points.length || typeof updater !== "function") {
        return null;
      }
      const point = state.pathState.points[index];
      updater(point, state.pathState);
      return point ?? null;
    },
    mutatePathState: (mutator) => {
      if (typeof mutator === "function") {
        mutator(state.pathState);
      }
      return state.pathState;
    },
  };
}

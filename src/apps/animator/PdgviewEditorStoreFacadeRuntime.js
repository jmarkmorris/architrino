export function createPdgviewEditorStoreFacade(editorStore = null) {
  const store = editorStore ?? {};

  return {
    getPdgviewAssemblyDraftsState() {
      return store.getAssemblyDrafts?.() ?? [];
    },
    getPdgviewGraphicOverlayDraftsState() {
      return store.getGraphicOverlayDrafts?.() ?? [];
    },
    getPdgviewSelectedPointIndexState() {
      return store.getSelectedPointIndex?.() ?? null;
    },
    getPdgviewSelectedAssemblyIdState() {
      return store.getSelectedAssemblyId?.() ?? null;
    },
    getPdgviewPendingTransferSourceState() {
      return store.getPendingTransferSource?.() ?? null;
    },
    getPdgviewTransferListRawStateValue() {
      return store.getTransferListRawState?.() ?? "";
    },
    setPdgviewAssemblyDraftsState(nextValue) {
      return store.setAssemblyDrafts?.(nextValue) ?? [];
    },
    appendPdgviewAssemblyDraftState(draft) {
      return store.appendAssemblyDraft?.(draft) ?? [];
    },
    removePdgviewAssemblyDraftByIdState(assemblyId) {
      return store.removeAssemblyDraftById?.(assemblyId) ?? [];
    },
    updatePdgviewAssemblyDraftByIdState(assemblyId, updater) {
      return store.updateAssemblyDraftById?.(assemblyId, updater) ?? null;
    },
    setPdgviewGraphicOverlayDraftsState(nextValue) {
      return store.setGraphicOverlayDrafts?.(nextValue) ?? [];
    },
    upsertPdgviewGraphicOverlayDraftState(overlayDraft) {
      return store.upsertGraphicOverlayDraft?.(overlayDraft) ?? [];
    },
    removePdgviewGraphicOverlayDraftByIdState(overlayId) {
      return store.removeGraphicOverlayDraftById?.(overlayId) ?? [];
    },
    updatePdgviewGraphicOverlayDraftByIdState(overlayId, updater) {
      return store.updateGraphicOverlayDraftById?.(overlayId, updater) ?? null;
    },
    setPdgviewSelectedPointIndexState(nextValue) {
      return store.setSelectedPointIndex?.(nextValue) ?? null;
    },
    setPdgviewSelectedAssemblyIdState(nextValue) {
      return store.setSelectedAssemblyId?.(nextValue) ?? null;
    },
    setPdgviewPendingTransferSourceState(nextValue) {
      return store.setPendingTransferSource?.(nextValue) ?? null;
    },
    clearPdgviewPendingTransferSourceState() {
      return store.clearPendingTransferSource?.() ?? null;
    },
    setPdgviewTransferListRawStateValue(nextValue) {
      return store.setTransferListRawState?.(nextValue) ?? "";
    },
    updatePdgviewPathPointAtState(index, updater) {
      return store.updatePathPointAt?.(index, updater) ?? null;
    },
    mutatePdgviewPathStateState(mutator) {
      return store.mutatePathState?.(mutator) ?? null;
    },
  };
}

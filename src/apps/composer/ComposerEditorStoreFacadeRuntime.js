export function createComposerEditorStoreFacade(editorStore = null) {
  const store = editorStore ?? {};

  return {
    getComposerAssemblyDraftsState() {
      return store.getAssemblyDrafts?.() ?? [];
    },
    getComposerGraphicOverlayDraftsState() {
      return store.getGraphicOverlayDrafts?.() ?? [];
    },
    getComposerSelectedPointIndexState() {
      return store.getSelectedPointIndex?.() ?? null;
    },
    getComposerSelectedAssemblyIdState() {
      return store.getSelectedAssemblyId?.() ?? null;
    },
    getComposerPendingTransferSourceState() {
      return store.getPendingTransferSource?.() ?? null;
    },
    getComposerTransferListRawStateValue() {
      return store.getTransferListRawState?.() ?? "";
    },
    setComposerAssemblyDraftsState(nextValue) {
      return store.setAssemblyDrafts?.(nextValue) ?? [];
    },
    appendComposerAssemblyDraftState(draft) {
      return store.appendAssemblyDraft?.(draft) ?? [];
    },
    removeComposerAssemblyDraftByIdState(assemblyId) {
      return store.removeAssemblyDraftById?.(assemblyId) ?? [];
    },
    updateComposerAssemblyDraftByIdState(assemblyId, updater) {
      return store.updateAssemblyDraftById?.(assemblyId, updater) ?? null;
    },
    setComposerGraphicOverlayDraftsState(nextValue) {
      return store.setGraphicOverlayDrafts?.(nextValue) ?? [];
    },
    upsertComposerGraphicOverlayDraftState(overlayDraft) {
      return store.upsertGraphicOverlayDraft?.(overlayDraft) ?? [];
    },
    removeComposerGraphicOverlayDraftByIdState(overlayId) {
      return store.removeGraphicOverlayDraftById?.(overlayId) ?? [];
    },
    updateComposerGraphicOverlayDraftByIdState(overlayId, updater) {
      return store.updateGraphicOverlayDraftById?.(overlayId, updater) ?? null;
    },
    setComposerSelectedPointIndexState(nextValue) {
      return store.setSelectedPointIndex?.(nextValue) ?? null;
    },
    setComposerSelectedAssemblyIdState(nextValue) {
      return store.setSelectedAssemblyId?.(nextValue) ?? null;
    },
    setComposerPendingTransferSourceState(nextValue) {
      return store.setPendingTransferSource?.(nextValue) ?? null;
    },
    clearComposerPendingTransferSourceState() {
      return store.clearPendingTransferSource?.() ?? null;
    },
    setComposerTransferListRawStateValue(nextValue) {
      return store.setTransferListRawState?.(nextValue) ?? "";
    },
    updateComposerPathPointAtState(index, updater) {
      return store.updatePathPointAt?.(index, updater) ?? null;
    },
    mutateComposerPathStateState(mutator) {
      return store.mutatePathState?.(mutator) ?? null;
    },
  };
}

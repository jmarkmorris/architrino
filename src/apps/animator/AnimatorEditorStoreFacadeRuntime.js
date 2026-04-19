export function createAnimatorEditorStoreFacade(editorStore = null) {
  const store = editorStore ?? {};

  return {
    getAnimatorAssemblyDraftsState() {
      return store.getAssemblyDrafts?.() ?? [];
    },
    getAnimatorGraphicOverlayDraftsState() {
      return store.getGraphicOverlayDrafts?.() ?? [];
    },
    getAnimatorSelectedPointIndexState() {
      return store.getSelectedPointIndex?.() ?? null;
    },
    getAnimatorSelectedAssemblyIdState() {
      return store.getSelectedAssemblyId?.() ?? null;
    },
    getAnimatorPendingTransferSourceState() {
      return store.getPendingTransferSource?.() ?? null;
    },
    getAnimatorTransferListRawStateValue() {
      return store.getTransferListRawState?.() ?? "";
    },
    setAnimatorAssemblyDraftsState(nextValue) {
      return store.setAssemblyDrafts?.(nextValue) ?? [];
    },
    appendAnimatorAssemblyDraftState(draft) {
      return store.appendAssemblyDraft?.(draft) ?? [];
    },
    removeAnimatorAssemblyDraftByIdState(assemblyId) {
      return store.removeAssemblyDraftById?.(assemblyId) ?? [];
    },
    updateAnimatorAssemblyDraftByIdState(assemblyId, updater) {
      return store.updateAssemblyDraftById?.(assemblyId, updater) ?? null;
    },
    setAnimatorGraphicOverlayDraftsState(nextValue) {
      return store.setGraphicOverlayDrafts?.(nextValue) ?? [];
    },
    upsertAnimatorGraphicOverlayDraftState(overlayDraft) {
      return store.upsertGraphicOverlayDraft?.(overlayDraft) ?? [];
    },
    removeAnimatorGraphicOverlayDraftByIdState(overlayId) {
      return store.removeGraphicOverlayDraftById?.(overlayId) ?? [];
    },
    updateAnimatorGraphicOverlayDraftByIdState(overlayId, updater) {
      return store.updateGraphicOverlayDraftById?.(overlayId, updater) ?? null;
    },
    setAnimatorSelectedPointIndexState(nextValue) {
      return store.setSelectedPointIndex?.(nextValue) ?? null;
    },
    setAnimatorSelectedAssemblyIdState(nextValue) {
      return store.setSelectedAssemblyId?.(nextValue) ?? null;
    },
    setAnimatorPendingTransferSourceState(nextValue) {
      return store.setPendingTransferSource?.(nextValue) ?? null;
    },
    clearAnimatorPendingTransferSourceState() {
      return store.clearPendingTransferSource?.() ?? null;
    },
    setAnimatorTransferListRawStateValue(nextValue) {
      return store.setTransferListRawState?.(nextValue) ?? "";
    },
    updateAnimatorPathPointAtState(index, updater) {
      return store.updatePathPointAt?.(index, updater) ?? null;
    },
    mutateAnimatorPathStateState(mutator) {
      return store.mutatePathState?.(mutator) ?? null;
    },
  };
}

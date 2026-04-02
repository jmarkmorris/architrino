export function createComposerDraftStateRuntime(options = {}) {
  const storeFacade = options.storeFacade ?? {};
  const normalizeAssemblyDraft =
    typeof options.normalizeAssemblyDraft === "function"
      ? options.normalizeAssemblyDraft
      : (draft) => draft;

  function getAssemblyDraftsState() {
    return storeFacade.getComposerAssemblyDraftsState?.() ?? [];
  }

  function getGraphicOverlayDraftsState() {
    return storeFacade.getComposerGraphicOverlayDraftsState?.() ?? [];
  }

  function getSelectedPointIndexState() {
    return storeFacade.getComposerSelectedPointIndexState?.() ?? null;
  }

  function getSelectedAssemblyIdState() {
    return storeFacade.getComposerSelectedAssemblyIdState?.() ?? null;
  }

  function getPendingTransferSourceState() {
    return storeFacade.getComposerPendingTransferSourceState?.() ?? null;
  }

  function getTransferListRawStateValue() {
    return storeFacade.getComposerTransferListRawStateValue?.() ?? "";
  }

  function setAssemblyDraftsState(nextValue) {
    return storeFacade.setComposerAssemblyDraftsState?.(nextValue) ?? [];
  }

  function appendAssemblyDraftState(draft) {
    return storeFacade.appendComposerAssemblyDraftState?.(draft) ?? [];
  }

  function removeAssemblyDraftByIdState(assemblyId) {
    return storeFacade.removeComposerAssemblyDraftByIdState?.(assemblyId) ?? [];
  }

  function updateAssemblyDraftByIdState(assemblyId, updater) {
    return storeFacade.updateComposerAssemblyDraftByIdState?.(assemblyId, updater) ?? null;
  }

  function setGraphicOverlayDraftsState(nextValue) {
    return storeFacade.setComposerGraphicOverlayDraftsState?.(nextValue) ?? [];
  }

  function upsertGraphicOverlayDraftState(overlayDraft) {
    return storeFacade.upsertComposerGraphicOverlayDraftState?.(overlayDraft) ?? [];
  }

  function removeGraphicOverlayDraftByIdState(overlayId) {
    return storeFacade.removeComposerGraphicOverlayDraftByIdState?.(overlayId) ?? [];
  }

  function updateGraphicOverlayDraftByIdState(overlayId, updater) {
    return storeFacade.updateComposerGraphicOverlayDraftByIdState?.(overlayId, updater) ?? null;
  }

  function setSelectedPointIndexState(nextValue) {
    return storeFacade.setComposerSelectedPointIndexState?.(nextValue) ?? null;
  }

  function setSelectedAssemblyIdState(nextValue) {
    return storeFacade.setComposerSelectedAssemblyIdState?.(nextValue) ?? null;
  }

  function setPendingTransferSourceState(nextValue) {
    return storeFacade.setComposerPendingTransferSourceState?.(nextValue) ?? null;
  }

  function clearPendingTransferSourceState() {
    return storeFacade.clearComposerPendingTransferSourceState?.() ?? null;
  }

  function setTransferListRawStateValue(nextValue) {
    return storeFacade.setComposerTransferListRawStateValue?.(nextValue) ?? "";
  }

  function updatePathPointAtState(index, updater) {
    return storeFacade.updateComposerPathPointAtState?.(index, updater) ?? null;
  }

  function mutatePathStateState(mutator) {
    return storeFacade.mutateComposerPathStateState?.(mutator) ?? null;
  }

  function getAssemblyDraftIndexById(assemblyId) {
    return getAssemblyDraftsState().findIndex((assembly) => assembly?.id === assemblyId);
  }

  function getAssemblyDraftById(assemblyId) {
    const assemblyDrafts = getAssemblyDraftsState();
    const index = getAssemblyDraftIndexById(assemblyId);
    return index >= 0 ? assemblyDrafts[index] ?? null : null;
  }

  function ensureAssemblyDrafts() {
    const assemblyDrafts = getAssemblyDraftsState();
    if (!Array.isArray(assemblyDrafts) || !assemblyDrafts.length) {
      setAssemblyDraftsState([]);
      return [];
    }
    const normalizedDrafts = assemblyDrafts.map((draft, index) =>
      normalizeAssemblyDraft(draft, index)
    );
    setAssemblyDraftsState(normalizedDrafts);
    return normalizedDrafts;
  }

  function getSelectedAssembly() {
    ensureAssemblyDrafts();
    return (
      getAssemblyDraftById(getSelectedAssemblyIdState()) ??
      getAssemblyDraftsState()[0] ??
      null
    );
  }

  function validateSelectedAssemblyId(preferredAssemblyId = getSelectedAssemblyIdState()) {
    const assemblyDrafts = ensureAssemblyDrafts();
    if (assemblyDrafts.some((assembly) => assembly?.id === preferredAssemblyId)) {
      setSelectedAssemblyIdState(preferredAssemblyId);
      return getSelectedAssemblyIdState();
    }
    setSelectedAssemblyIdState(assemblyDrafts[0]?.id ?? null);
    return getSelectedAssemblyIdState();
  }

  return {
    getAssemblyDraftsState,
    getGraphicOverlayDraftsState,
    getSelectedPointIndexState,
    getSelectedAssemblyIdState,
    getPendingTransferSourceState,
    getTransferListRawStateValue,
    setAssemblyDraftsState,
    appendAssemblyDraftState,
    removeAssemblyDraftByIdState,
    updateAssemblyDraftByIdState,
    setGraphicOverlayDraftsState,
    upsertGraphicOverlayDraftState,
    removeGraphicOverlayDraftByIdState,
    updateGraphicOverlayDraftByIdState,
    setSelectedPointIndexState,
    setSelectedAssemblyIdState,
    setPendingTransferSourceState,
    clearPendingTransferSourceState,
    setTransferListRawStateValue,
    updatePathPointAtState,
    mutatePathStateState,
    getAssemblyDraftIndexById,
    getAssemblyDraftById,
    ensureAssemblyDrafts,
    getSelectedAssembly,
    validateSelectedAssemblyId,
  };
}

export function createAnimatorDraftStateRuntime(options = {}) {
  const storeFacade = options.storeFacade ?? {};
  const normalizeAssemblyDraft =
    typeof options.normalizeAssemblyDraft === "function"
      ? options.normalizeAssemblyDraft
      : (draft) => draft;

  function getAssemblyDraftsState() {
    return storeFacade.getAnimatorAssemblyDraftsState?.() ?? [];
  }

  function getGraphicOverlayDraftsState() {
    return storeFacade.getAnimatorGraphicOverlayDraftsState?.() ?? [];
  }

  function getSelectedPointIndexState() {
    return storeFacade.getAnimatorSelectedPointIndexState?.() ?? null;
  }

  function getSelectedAssemblyIdState() {
    return storeFacade.getAnimatorSelectedAssemblyIdState?.() ?? null;
  }

  function getPendingTransferSourceState() {
    return storeFacade.getAnimatorPendingTransferSourceState?.() ?? null;
  }

  function getTransferListRawStateValue() {
    return storeFacade.getAnimatorTransferListRawStateValue?.() ?? "";
  }

  function setAssemblyDraftsState(nextValue) {
    return storeFacade.setAnimatorAssemblyDraftsState?.(nextValue) ?? [];
  }

  function appendAssemblyDraftState(draft) {
    return storeFacade.appendAnimatorAssemblyDraftState?.(draft) ?? [];
  }

  function removeAssemblyDraftByIdState(assemblyId) {
    return storeFacade.removeAnimatorAssemblyDraftByIdState?.(assemblyId) ?? [];
  }

  function updateAssemblyDraftByIdState(assemblyId, updater) {
    return storeFacade.updateAnimatorAssemblyDraftByIdState?.(assemblyId, updater) ?? null;
  }

  function setGraphicOverlayDraftsState(nextValue) {
    return storeFacade.setAnimatorGraphicOverlayDraftsState?.(nextValue) ?? [];
  }

  function upsertGraphicOverlayDraftState(overlayDraft) {
    return storeFacade.upsertAnimatorGraphicOverlayDraftState?.(overlayDraft) ?? [];
  }

  function removeGraphicOverlayDraftByIdState(overlayId) {
    return storeFacade.removeAnimatorGraphicOverlayDraftByIdState?.(overlayId) ?? [];
  }

  function updateGraphicOverlayDraftByIdState(overlayId, updater) {
    return storeFacade.updateAnimatorGraphicOverlayDraftByIdState?.(overlayId, updater) ?? null;
  }

  function setSelectedPointIndexState(nextValue) {
    return storeFacade.setAnimatorSelectedPointIndexState?.(nextValue) ?? null;
  }

  function setSelectedAssemblyIdState(nextValue) {
    return storeFacade.setAnimatorSelectedAssemblyIdState?.(nextValue) ?? null;
  }

  function setPendingTransferSourceState(nextValue) {
    return storeFacade.setAnimatorPendingTransferSourceState?.(nextValue) ?? null;
  }

  function clearPendingTransferSourceState() {
    return storeFacade.clearAnimatorPendingTransferSourceState?.() ?? null;
  }

  function setTransferListRawStateValue(nextValue) {
    return storeFacade.setAnimatorTransferListRawStateValue?.(nextValue) ?? "";
  }

  function updatePathPointAtState(index, updater) {
    return storeFacade.updateAnimatorPathPointAtState?.(index, updater) ?? null;
  }

  function mutatePathStateState(mutator) {
    return storeFacade.mutateAnimatorPathStateState?.(mutator) ?? null;
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

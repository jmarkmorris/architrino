export function createPdgviewDraftStateRuntime(options = {}) {
  const storeFacade = options.storeFacade ?? {};
  const normalizeAssemblyDraft =
    typeof options.normalizeAssemblyDraft === "function"
      ? options.normalizeAssemblyDraft
      : (draft) => draft;

  function getAssemblyDraftsState() {
    return storeFacade.getPdgviewAssemblyDraftsState?.() ?? [];
  }

  function getGraphicOverlayDraftsState() {
    return storeFacade.getPdgviewGraphicOverlayDraftsState?.() ?? [];
  }

  function getSelectedPointIndexState() {
    return storeFacade.getPdgviewSelectedPointIndexState?.() ?? null;
  }

  function getSelectedAssemblyIdState() {
    return storeFacade.getPdgviewSelectedAssemblyIdState?.() ?? null;
  }

  function getPendingTransferSourceState() {
    return storeFacade.getPdgviewPendingTransferSourceState?.() ?? null;
  }

  function getTransferListRawStateValue() {
    return storeFacade.getPdgviewTransferListRawStateValue?.() ?? "";
  }

  function setAssemblyDraftsState(nextValue) {
    return storeFacade.setPdgviewAssemblyDraftsState?.(nextValue) ?? [];
  }

  function appendAssemblyDraftState(draft) {
    return storeFacade.appendPdgviewAssemblyDraftState?.(draft) ?? [];
  }

  function removeAssemblyDraftByIdState(assemblyId) {
    return storeFacade.removePdgviewAssemblyDraftByIdState?.(assemblyId) ?? [];
  }

  function updateAssemblyDraftByIdState(assemblyId, updater) {
    return storeFacade.updatePdgviewAssemblyDraftByIdState?.(assemblyId, updater) ?? null;
  }

  function setGraphicOverlayDraftsState(nextValue) {
    return storeFacade.setPdgviewGraphicOverlayDraftsState?.(nextValue) ?? [];
  }

  function upsertGraphicOverlayDraftState(overlayDraft) {
    return storeFacade.upsertPdgviewGraphicOverlayDraftState?.(overlayDraft) ?? [];
  }

  function removeGraphicOverlayDraftByIdState(overlayId) {
    return storeFacade.removePdgviewGraphicOverlayDraftByIdState?.(overlayId) ?? [];
  }

  function updateGraphicOverlayDraftByIdState(overlayId, updater) {
    return storeFacade.updatePdgviewGraphicOverlayDraftByIdState?.(overlayId, updater) ?? null;
  }

  function setSelectedPointIndexState(nextValue) {
    return storeFacade.setPdgviewSelectedPointIndexState?.(nextValue) ?? null;
  }

  function setSelectedAssemblyIdState(nextValue) {
    return storeFacade.setPdgviewSelectedAssemblyIdState?.(nextValue) ?? null;
  }

  function setPendingTransferSourceState(nextValue) {
    return storeFacade.setPdgviewPendingTransferSourceState?.(nextValue) ?? null;
  }

  function clearPendingTransferSourceState() {
    return storeFacade.clearPdgviewPendingTransferSourceState?.() ?? null;
  }

  function setTransferListRawStateValue(nextValue) {
    return storeFacade.setPdgviewTransferListRawStateValue?.(nextValue) ?? "";
  }

  function updatePathPointAtState(index, updater) {
    return storeFacade.updatePdgviewPathPointAtState?.(index, updater) ?? null;
  }

  function mutatePathStateState(mutator) {
    return storeFacade.mutatePdgviewPathStateState?.(mutator) ?? null;
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

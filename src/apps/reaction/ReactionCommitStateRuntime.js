function cloneSnapshot(snapshot = {}) {
  return {
    participants: Array.isArray(snapshot?.participants) ? snapshot.participants : [],
    mappings: Array.isArray(snapshot?.mappings) ? snapshot.mappings : [],
  };
}

export function buildReactionCommitSnapshotSignature(snapshot = {}) {
  return JSON.stringify(cloneSnapshot(snapshot));
}

export function createReactionCommitStateRuntime(options = {}) {
  const getSnapshot =
    typeof options?.getSnapshot === "function"
      ? options.getSnapshot
      : () => ({ participants: [], mappings: [] });
  const now =
    typeof options?.now === "function"
      ? options.now
      : () => new Date().toISOString();

  const state = {
    acceptedSnapshotSignature: "",
    acceptedAt: "",
    needsReaccept: false,
  };

  function hasContent(snapshot = getSnapshot()) {
    return (
      (Array.isArray(snapshot?.participants) && snapshot.participants.length > 0) ||
      (Array.isArray(snapshot?.mappings) && snapshot.mappings.length > 0)
    );
  }

  function reset(options = {}) {
    state.acceptedSnapshotSignature = "";
    state.acceptedAt = "";
    state.needsReaccept = options?.needsReaccept === true;
    return getCommitState();
  }

  function observeSnapshot(snapshot = getSnapshot()) {
    if (!hasContent(snapshot)) {
      const changed =
        !!state.acceptedSnapshotSignature || !!state.acceptedAt || !!state.needsReaccept;
      reset();
      return changed;
    }
    if (!state.acceptedSnapshotSignature) {
      return false;
    }
    const currentSnapshotSignature = buildReactionCommitSnapshotSignature(snapshot);
    if (currentSnapshotSignature === state.acceptedSnapshotSignature) {
      return false;
    }
    reset({ needsReaccept: true });
    return true;
  }

  function acceptCurrentSnapshot(snapshot = getSnapshot()) {
    if (!hasContent(snapshot)) {
      return null;
    }
    state.acceptedSnapshotSignature = buildReactionCommitSnapshotSignature(snapshot);
    state.acceptedAt = String(now() ?? "").trim();
    state.needsReaccept = false;
    return getCommitState(snapshot);
  }

  function getCommitState(snapshot = getSnapshot()) {
    const snapshotHasContent = hasContent(snapshot);
    const accepted =
      snapshotHasContent &&
      !!state.acceptedSnapshotSignature &&
      buildReactionCommitSnapshotSignature(snapshot) === state.acceptedSnapshotSignature;
    return {
      status: accepted ? "accepted" : "draft",
      acceptedAt: accepted ? state.acceptedAt : "",
      hasContent: snapshotHasContent,
      needsReaccept: !accepted && state.needsReaccept,
      canAccept: snapshotHasContent,
      canExport: accepted,
    };
  }

  function buildExportReview(snapshot = getSnapshot()) {
    const commitState = getCommitState(snapshot);
    if (commitState.status === "accepted") {
      return {
        status: "accepted",
        acceptedAt: commitState.acceptedAt,
      };
    }
    return {
      status: "draft",
    };
  }

  return {
    acceptCurrentSnapshot,
    buildExportReview,
    getCommitState,
    observeSnapshot,
    reset,
  };
}

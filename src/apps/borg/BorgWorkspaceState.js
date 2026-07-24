export function createBorgWorkspaceSnapshotState(state) {
  const {
    dynamicRunGeneration: _dynamicRunGeneration,
    playbackPrefillPromise: _playbackPrefillPromise,
    ...snapshotState
  } = state;
  return Object.freeze({
    ...snapshotState,
    activeLayers: new Set(state.activeLayers),
    playing: false,
    playbackRequested: false,
    playFrameRequestId: null,
    playFrameRequestKind: null,
    dynamicChunkPromise: null,
    dynamicChunkStartedAt: null,
  });
}

export function restoreBorgWorkspaceState(currentState, snapshotState) {
  return {
    ...snapshotState,
    activeLayers: new Set(snapshotState.activeLayers),
    dynamicRunGeneration: currentState.dynamicRunGeneration + 1,
    playbackPrefillPromise: null,
  };
}

export function disposeBorgWorkspaceSnapshotRunners(
  snapshots,
  { activeRunner = null } = {},
) {
  const runners = new Set();
  for (const snapshot of snapshots?.values?.() ?? []) {
    const runner = snapshot?.state?.dynamicRunner;
    if (runner && runner !== activeRunner) {
      runners.add(runner);
    }
  }
  snapshots?.clear?.();
  runners.forEach((runner) => runner.dispose?.());
  return runners.size;
}

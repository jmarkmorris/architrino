import {
  IDEAL_BRAID_POTENTIAL_SOFTENING,
  computePotentialSamplesWithPrescribedPathAnalysis,
  createIdealBraidPotentialSamplesRunRequest,
} from "./IdealBraidAnalysisAdapters.js";

export const IDEAL_BRAID_SURFACE_SOLVER_TIME_QUANTUM_SECONDS = 1 / 8;
export const IDEAL_BRAID_SURFACE_SOLVER_MIN_INTERVAL_MS = 180;
export const IDEAL_BRAID_SURFACE_SOLVER_EDIT_DEBOUNCE_MS = 120;
export const IDEAL_BRAID_SURFACE_SOLVER_FAILURE_BACKOFF_MS = 1000;

export function quantizeIdealBraidSurfaceSolverTime(timeSeconds) {
  const time = Number.isFinite(Number(timeSeconds)) ? Number(timeSeconds) : 0;
  return (
    Math.round(time / IDEAL_BRAID_SURFACE_SOLVER_TIME_QUANTUM_SECONDS) *
    IDEAL_BRAID_SURFACE_SOLVER_TIME_QUANTUM_SECONDS
  );
}

export function createIdealBraidSurfaceSolverScheduler({
  model,
  getStateKey,
  getModelTime,
  getSamplePoints,
  isVisible = () => true,
  nowMs = () => Date.now(),
  prescribedPathAnalysisOptions = {},
  memoryBudgetBytes = 64 * 1024 * 1024,
  onSnapshot = () => {},
  onError = () => {},
  onErrorCleared = () => {},
} = {}) {
  if (!model || typeof getStateKey !== "function" || typeof getSamplePoints !== "function") {
    throw new TypeError("A1 Lorentz Geometry surface scheduler requires model and state accessors.");
  }

  let destroyed = false;
  let generation = 0;
  let snapshot = null;
  let pendingPromise = null;
  let lastRequestAtMs = -Infinity;
  let lastStateChangeAtMs = -Infinity;
  let nextAllowedRequestAtMs = -Infinity;
  let interactiveUpdatePending = false;
  let error = null;

  function clearForStateChange({ preserveSnapshot = true } = {}) {
    generation += 1;
    lastStateChangeAtMs = nowMs();
    interactiveUpdatePending = preserveSnapshot;
    if (!preserveSnapshot) {
      snapshot = null;
    }
    if (error) {
      error = null;
      onErrorCleared();
    }
  }

  function getCurrentSnapshot() {
    const stateKey = getStateKey();
    if (snapshot?.stateKey === stateKey) {
      return snapshot;
    }
    // Hold the last solved preview during the edit debounce instead of flashing an empty surface.
    return interactiveUpdatePending ? snapshot : null;
  }

  function schedule({ force = false } = {}) {
    if (destroyed || pendingPromise || !isVisible()) {
      return false;
    }
    const solveTime = quantizeIdealBraidSurfaceSolverTime(getModelTime?.() ?? 0);
    const stateKey = getStateKey();
    const snapshotMatches =
      snapshot?.stateKey === stateKey &&
      Math.abs((snapshot.solveTime ?? 0) - solveTime) <= 1e-12;
    if (snapshotMatches) {
      return false;
    }
    const requestStartedAtMs = nowMs();
    if (
      !force &&
      interactiveUpdatePending &&
      requestStartedAtMs - lastStateChangeAtMs <
        IDEAL_BRAID_SURFACE_SOLVER_EDIT_DEBOUNCE_MS
    ) {
      return false;
    }
    if (
      !force &&
      (requestStartedAtMs - lastRequestAtMs < IDEAL_BRAID_SURFACE_SOLVER_MIN_INTERVAL_MS ||
        requestStartedAtMs < nextAllowedRequestAtMs)
    ) {
      return false;
    }

    const requestGeneration = generation;
    const samplePoints = getSamplePoints();
    const requestOptions = {
      fieldSpeed: model.fieldSpeed,
      softening: IDEAL_BRAID_POTENTIAL_SOFTENING,
      memoryBudgetBytes,
    };
    const runRequest = createIdealBraidPotentialSamplesRunRequest(
      samplePoints,
      model,
      solveTime,
      requestOptions
    );
    lastRequestAtMs = requestStartedAtMs;
    interactiveUpdatePending = false;
    if (error) {
      error = null;
      onErrorCleared();
    }

    pendingPromise = computePotentialSamplesWithPrescribedPathAnalysis(
      samplePoints,
      model,
      solveTime,
      {
        ...prescribedPathAnalysisOptions,
        ...requestOptions,
        runRequest,
      }
    );
    pendingPromise
      .then((nextSnapshot) => {
        pendingPromise = null;
        if (
          destroyed ||
          requestGeneration !== generation ||
          getStateKey() !== stateKey
        ) {
          return;
        }
        snapshot = {
          ...nextSnapshot,
          stateKey,
          solveTime,
          surfacePotentials: nextSnapshot.samplePotentials,
        };
        interactiveUpdatePending = false;
        nextAllowedRequestAtMs = -Infinity;
        onSnapshot(snapshot);
      })
      .catch((nextError) => {
        pendingPromise = null;
        if (destroyed || requestGeneration !== generation) {
          return;
        }
        interactiveUpdatePending = false;
        error = nextError;
        nextAllowedRequestAtMs = nowMs() + IDEAL_BRAID_SURFACE_SOLVER_FAILURE_BACKOFF_MS;
        onError(nextError);
      });
    return true;
  }

  function destroy() {
    destroyed = true;
    generation += 1;
    pendingPromise = null;
  }

  return {
    clearForStateChange,
    destroy,
    getCurrentSnapshot,
    getError: () => error,
    isPending: () => pendingPromise !== null,
    schedule,
  };
}

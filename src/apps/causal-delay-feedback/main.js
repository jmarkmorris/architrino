import {
  CENTRAL_SOLVER_MOTION_REPLAY_MODE,
  createCausalDelayFeedbackCentralBridgeAdapter,
} from "./CausalDelayFeedbackCentralBridgeAdapter.js";
import { createCausalDelayFeedbackRuntime } from "./CausalDelayFeedbackRuntime.js";
import { createTemporaryMockReplayAdapter } from "./CausalDelayFeedbackReplayAdapter.js";
import { createCausalDelayFeedbackSolverBridgeOptions } from "./CausalDelayFeedbackSolverBridgeOptions.js";

const CENTRAL_REPLAY_QUERY_VALUES = new Set(["central", "bridge", "solver", "central_solver_bridge"]);
const MOCK_REPLAY_QUERY_VALUES = new Set([
  "mock",
  "representative",
  "representative_mock",
  "temporary_mock",
  "temporary_mock_adapter",
  "off",
  "false",
]);
const MOTION_REPLAY_QUERY_VALUES = new Set([
  "motion",
  "motion-simulation",
  "motionsimulation",
  "motion_solver",
  "solver_motion",
]);
const APP_PLAYBACK_REPLAY_QUERY_VALUES = new Set([
  "app",
  "app-playback",
  "appplayback",
  "playback",
  "bridge-playback",
]);

function getInitialQueryValue(windowLike, key) {
  try {
    return new URL(windowLike?.location?.href ?? "http://localhost/").searchParams.get(key);
  } catch {
    return null;
  }
}

export function shouldUseCentralBridgeReplay(windowLike = globalThis.window) {
  if (shouldUseTemporaryMockReplay(windowLike)) {
    return false;
  }
  return true;
}

function shouldUseTemporaryMockReplay(windowLike = globalThis.window) {
  return ["replay", "solver", "adapter"].some((key) => {
    const value = getInitialQueryValue(windowLike, key);
    return value ? MOCK_REPLAY_QUERY_VALUES.has(value.toLowerCase()) : false;
  });
}

function hasExplicitCentralBridgeReplay(windowLike = globalThis.window) {
  return ["replay", "solver", "adapter"].some((key) => {
    const value = getInitialQueryValue(windowLike, key);
    return value ? CENTRAL_REPLAY_QUERY_VALUES.has(value.toLowerCase()) : false;
  });
}

export function getCentralBridgeReplayMode(windowLike = globalThis.window, { defaultMode } = {}) {
  const value =
    getInitialQueryValue(windowLike, "solverReplay") ??
    getInitialQueryValue(windowLike, "replayMode");
  if (!value) {
    return defaultMode;
  }
  const normalizedValue = value.toLowerCase();
  if (MOTION_REPLAY_QUERY_VALUES.has(normalizedValue)) {
    return CENTRAL_SOLVER_MOTION_REPLAY_MODE;
  }
  if (APP_PLAYBACK_REPLAY_QUERY_VALUES.has(normalizedValue)) {
    return undefined;
  }
  return defaultMode;
}

export function createCausalDelayFeedbackRuntimeForPage(windowLike = globalThis.window) {
  const fallbackReplayAdapter = createTemporaryMockReplayAdapter();
  const useCentralBridgeReplay = shouldUseCentralBridgeReplay(windowLike);
  const solverReplayMode = getCentralBridgeReplayMode(windowLike, {
    defaultMode: hasExplicitCentralBridgeReplay(windowLike) ? undefined : CENTRAL_SOLVER_MOTION_REPLAY_MODE,
  });
  const replayAdapter = useCentralBridgeReplay
    ? createCausalDelayFeedbackCentralBridgeAdapter(
        createCausalDelayFeedbackSolverBridgeOptions(windowLike, {
          solverReplayMode,
        }),
      )
    : fallbackReplayAdapter;
  return createCausalDelayFeedbackRuntime({
    window: windowLike,
    replayAdapter,
    fallbackReplayAdapter,
  });
}

function reportCausalDelayFeedbackBootstrapError(error, documentLike = globalThis.document, windowLike = globalThis.window) {
  const message = error instanceof Error ? error.message : String(error);
  if (windowLike) {
    windowLike.__ARCHITRINO_CAUSAL_DELAY_FEEDBACK_BOOT_ERROR__ = message;
  }
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(error);
  }
  const appElement = documentLike?.getElementById?.("causal-delay-feedback-app");
  if (!appElement) {
    return;
  }
  const banner = documentLike.createElement("div");
  banner.id = "causal-delay-feedback-boot-error";
  banner.textContent = `causal delay feedback failed to initialize: ${message}`;
  appElement.append(banner);
}

if (typeof document !== "undefined") {
  try {
    const runtime = createCausalDelayFeedbackRuntimeForPage(window);
    if (typeof window !== "undefined") {
      window.__ARCHITRINO_CAUSAL_DELAY_FEEDBACK_RUNTIME__ = runtime;
    }
    runtime.init();
  } catch (error) {
    reportCausalDelayFeedbackBootstrapError(error, document, window);
  }
}

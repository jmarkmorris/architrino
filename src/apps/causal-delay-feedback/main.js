import { createCausalDelayFeedbackEomReplayAdapter } from "./CausalDelayFeedbackEomReplayAdapter.js";
import { createCausalDelayFeedbackRuntime } from "./CausalDelayFeedbackRuntime.js";
import { createTemporaryMockReplayAdapter } from "./CausalDelayFeedbackReplayAdapter.js";

const MOCK_REPLAY_QUERY_VALUES = new Set([
  "mock",
  "representative",
  "representative_mock",
  "temporary_mock",
  "temporary_mock_adapter",
  "off",
  "false",
]);

function getInitialQueryValue(windowLike, key) {
  try {
    return new URL(windowLike?.location?.href ?? "http://localhost/").searchParams.get(key);
  } catch {
    return null;
  }
}

function getInitialPositiveQueryNumber(windowLike, key) {
  const value = getInitialQueryValue(windowLike, key);
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : undefined;
}

export function shouldUseEomReplay(windowLike = globalThis.window) {
  return !shouldUseTemporaryMockReplay(windowLike);
}

function shouldUseTemporaryMockReplay(windowLike = globalThis.window) {
  return ["replay", "solver", "adapter"].some((key) => {
    const value = getInitialQueryValue(windowLike, key);
    return value ? MOCK_REPLAY_QUERY_VALUES.has(value.toLowerCase()) : false;
  });
}

export function createCausalDelayFeedbackEomReplayOptions(windowLike = globalThis.window) {
  const scopeOptions = windowLike?.ARCHITRINO_CAUSAL_DELAY_FEEDBACK_EOM_REPLAY;
  if (scopeOptions && typeof scopeOptions === "object") {
    return scopeOptions;
  }
  const recordUrl = getInitialQueryValue(windowLike, "eomRecord");
  if (recordUrl) {
    return {
      async loadEomRecord() {
        const fetchLike = windowLike?.fetch ?? globalThis.fetch;
        const response = await fetchLike(recordUrl);
        if (!response?.ok) {
          throw new Error(`EOM record fetch failed (${response?.status ?? "no response"}): ${recordUrl}`);
        }
        return response.json();
      },
    };
  }
  return {};
}

export function createCausalDelayFeedbackInitialReplayRequestOptions(windowLike = globalThis.window) {
  const requestOptions = {};
  const frameCount =
    getInitialPositiveQueryNumber(windowLike, "frameCount") ??
    getInitialPositiveQueryNumber(windowLike, "solverFrameCount");
  if (frameCount != null) {
    requestOptions.frameCount = Math.max(2, Math.floor(frameCount));
  }
  const historyDepth = getInitialPositiveQueryNumber(windowLike, "historyDepth");
  if (historyDepth != null) {
    requestOptions.historyDepth = Math.max(2, Math.floor(historyDepth));
  }
  const spaceAxis = getInitialQueryValue(windowLike, "spaceAxis");
  if (spaceAxis) {
    requestOptions.spaceAxis = spaceAxis;
  }
  const positrinoWorldlineId = getInitialQueryValue(windowLike, "positrinoWorldline");
  if (positrinoWorldlineId) {
    requestOptions.positrinoWorldlineId = positrinoWorldlineId;
  }
  const electrinoWorldlineId = getInitialQueryValue(windowLike, "electrinoWorldline");
  if (electrinoWorldlineId) {
    requestOptions.electrinoWorldlineId = electrinoWorldlineId;
  }
  return requestOptions;
}

export function createCausalDelayFeedbackRuntimeForPage(windowLike = globalThis.window) {
  const fallbackReplayAdapter = createTemporaryMockReplayAdapter();
  const replayAdapter = shouldUseEomReplay(windowLike)
    ? createCausalDelayFeedbackEomReplayAdapter(
        createCausalDelayFeedbackEomReplayOptions(windowLike),
      )
    : fallbackReplayAdapter;
  return createCausalDelayFeedbackRuntime({
    window: windowLike,
    replayAdapter,
    fallbackReplayAdapter,
    replayRequestOptions: createCausalDelayFeedbackInitialReplayRequestOptions(windowLike),
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

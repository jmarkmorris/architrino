export const DEFAULT_CAUSAL_DELAY_FEEDBACK_MODE = "story";
export const CAUSAL_DELAY_FEEDBACK_MODE_QUERY_PARAMETER = "mode";

export const CAUSAL_DELAY_FEEDBACK_MODES = Object.freeze([
  { id: "story", label: "Lessons", renderMethod: "renderStory" },
  { id: "roots", label: "Roots", renderMethod: "renderRoots" },
  { id: "sandbox", label: "Laboratory", renderMethod: null },
]);

export function normalizeCausalDelayFeedbackMode(
  mode,
  fallback = DEFAULT_CAUSAL_DELAY_FEEDBACK_MODE,
) {
  return CAUSAL_DELAY_FEEDBACK_MODES.some((candidate) => candidate.id === mode)
    ? mode
    : fallback;
}

export function getCausalDelayFeedbackModeFromHref(
  href,
  fallback = DEFAULT_CAUSAL_DELAY_FEEDBACK_MODE,
) {
  try {
    const url = new URL(String(href ?? ""), "http://localhost/causal-delay-feedback.html");
    return normalizeCausalDelayFeedbackMode(
      url.searchParams.get(CAUSAL_DELAY_FEEDBACK_MODE_QUERY_PARAMETER),
      fallback,
    );
  } catch {
    return fallback;
  }
}

export function createCausalDelayFeedbackModeHref(href, mode) {
  try {
    const url = new URL(String(href ?? ""), "http://localhost/causal-delay-feedback.html");
    const normalizedMode = normalizeCausalDelayFeedbackMode(mode);
    if (normalizedMode === DEFAULT_CAUSAL_DELAY_FEEDBACK_MODE) {
      url.searchParams.delete(CAUSAL_DELAY_FEEDBACK_MODE_QUERY_PARAMETER);
    } else {
      url.searchParams.set(CAUSAL_DELAY_FEEDBACK_MODE_QUERY_PARAMETER, normalizedMode);
    }
    return url.href;
  } catch {
    return null;
  }
}

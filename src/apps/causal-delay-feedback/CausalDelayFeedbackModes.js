export const DEFAULT_CAUSAL_DELAY_FEEDBACK_MODE = "story";

export const CAUSAL_DELAY_FEEDBACK_MODES = Object.freeze([
  { id: "story", label: "Lessons", renderMethod: "renderStory" },
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

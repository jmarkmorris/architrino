export const DEFAULT_CAUSAL_DELAY_FEEDBACK_MODE = "story";

export const CAUSAL_DELAY_FEEDBACK_MODES = Object.freeze([
  { id: "story", label: "Story", renderMethod: "renderStory" },
  { id: "prediction", label: "Prediction", renderMethod: "renderPrediction" },
  { id: "history", label: "Path History", renderMethod: "renderHistory" },
  { id: "roots", label: "Roots", renderMethod: "renderRoots" },
  { id: "self-hit", label: "Self-Hit", renderMethod: "renderSelfHit" },
  { id: "branch-lab", label: "Branch Lab", renderMethod: "renderBranchLab" },
  { id: "sandbox", label: "Sandbox", renderMethod: null },
]);

export function normalizeCausalDelayFeedbackMode(
  mode,
  fallback = DEFAULT_CAUSAL_DELAY_FEEDBACK_MODE,
) {
  return CAUSAL_DELAY_FEEDBACK_MODES.some((candidate) => candidate.id === mode)
    ? mode
    : fallback;
}

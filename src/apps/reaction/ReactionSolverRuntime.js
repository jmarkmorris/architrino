import { createReactionSolverUiRuntime } from "./ReactionSolverUiRuntime.js";

export function createReactionSolverRuntime(deps = {}) {
  return createReactionSolverUiRuntime(deps);
}

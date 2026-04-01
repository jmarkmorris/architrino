import { createComposerReactionSolverUiRuntime } from "../../runtime/ComposerReactionSolverUiRuntime.js";

export function createReactionSolverRuntime(deps = {}) {
  const solverRuntime = createComposerReactionSolverUiRuntime(deps);

  return {
    ...solverRuntime,
    getSnapshot:
      typeof solverRuntime.getSnapshot === "function"
        ? solverRuntime.getSnapshot
        : () => ({ participants: [], mappings: [] }),
  };
}

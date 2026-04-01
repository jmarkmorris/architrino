import { createComposerReactionSolverUiRuntime } from "../../runtime/ComposerReactionSolverUiRuntime.js";
import {
  buildReactionNodeKey,
  parseReactionNodeKey,
  reactionNodeKeysConflict,
} from "./ReactionNodeKeyRuntime.js";

export function createReactionSolverRuntime(deps = {}) {
  const solverRuntime = createComposerReactionSolverUiRuntime({
    ...deps,
    buildNodeKey: buildReactionNodeKey,
    parseNodeKey: parseReactionNodeKey,
    nodeKeysConflict: reactionNodeKeysConflict,
  });

  return {
    ...solverRuntime,
    getSnapshot:
      typeof solverRuntime.getSnapshot === "function"
        ? solverRuntime.getSnapshot
        : () => ({ participants: [], mappings: [] }),
  };
}

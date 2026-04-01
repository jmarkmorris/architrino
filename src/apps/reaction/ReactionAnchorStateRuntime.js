import { createComposerReactionAnchorStateRuntime } from "../../runtime/ComposerReactionAnchorStateRuntime.js";
import { reactionNodeKeysConflict } from "./ReactionNodeKeyRuntime.js";

export function createReactionAnchorStateRuntime(options = {}) {
  return createComposerReactionAnchorStateRuntime({
    ...options,
    nodeKeysConflict: reactionNodeKeysConflict,
  });
}

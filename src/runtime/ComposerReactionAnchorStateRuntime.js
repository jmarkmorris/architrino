import {
  buildNodeKey,
  createReactionAnchorStateRuntime,
  nodeKeysConflict,
  parseNodeKey,
} from "../apps/reaction/ReactionAnchorStateRuntime.js";

export { buildNodeKey, nodeKeysConflict, parseNodeKey };

export function createComposerReactionAnchorStateRuntime(options = {}) {
  return createReactionAnchorStateRuntime({
    ...options,
    nodeKeysConflict:
      typeof options.nodeKeysConflict === "function" ? options.nodeKeysConflict : nodeKeysConflict,
  });
}

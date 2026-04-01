import { createComposerReactionMappingRulesRuntime } from "../../runtime/ComposerReactionMappingRulesRuntime.js";
import { parseReactionNodeKey } from "./ReactionNodeKeyRuntime.js";

export function createReactionMappingRulesRuntime(options = {}) {
  return createComposerReactionMappingRulesRuntime({
    ...options,
    parseNodeKey: parseReactionNodeKey,
  });
}

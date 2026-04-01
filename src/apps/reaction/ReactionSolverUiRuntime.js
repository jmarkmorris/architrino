import { createComposerReactionSolverUiRuntime } from "../../runtime/ComposerReactionSolverUiRuntime.js";
import { createReactionAnchorStateRuntime } from "./ReactionAnchorStateRuntime.js";
import {
  buildReactionParticipantStructureFromPickerCell,
  getReactionAddPickerCells,
} from "./ReactionAddPickerRuntime.js";
import { createReactionAnchorRenderRuntime } from "./ReactionAnchorRenderRuntime.js";
import { createReactionBinaryInventoryRuntime } from "./ReactionBinaryInventoryRuntime.js";
import { createReactionBinaryGlyphRuntime } from "./ReactionBinaryGlyphRuntime.js";
import { createReactionBinarySelectionRuntime } from "./ReactionBinarySelectionRuntime.js";
import { createReactionMappingRulesRuntime } from "./ReactionMappingRulesRuntime.js";
import { createReactionParticipantMutationRuntime } from "./ReactionParticipantMutationRuntime.js";
import { createReactionParticipantRenderRuntime } from "./ReactionParticipantRenderRuntime.js";
import {
  buildReactionNodeKey,
  parseReactionNodeKey,
  reactionNodeKeysConflict,
} from "./ReactionNodeKeyRuntime.js";

export function createReactionSolverUiRuntime(deps = {}) {
  const solverRuntime = createComposerReactionSolverUiRuntime({
    ...deps,
    buildNodeKey: buildReactionNodeKey,
    parseNodeKey: parseReactionNodeKey,
    nodeKeysConflict: reactionNodeKeysConflict,
    createAnchorRenderRuntime: createReactionAnchorRenderRuntime,
    createBinaryGlyphRuntime: createReactionBinaryGlyphRuntime,
    createParticipantRenderRuntime: createReactionParticipantRenderRuntime,
    createBinarySelectionRuntime: createReactionBinarySelectionRuntime,
    createBinaryInventoryRuntime: createReactionBinaryInventoryRuntime,
    createParticipantMutationRuntime: createReactionParticipantMutationRuntime,
    buildReactionParticipantStructureForPickerCell:
      buildReactionParticipantStructureFromPickerCell,
    getReactionAddPickerCells,
    createMappingRulesRuntime: createReactionMappingRulesRuntime,
    createAnchorStateRuntime: createReactionAnchorStateRuntime,
  });

  return {
    ...solverRuntime,
    getSnapshot:
      typeof solverRuntime.getSnapshot === "function"
        ? solverRuntime.getSnapshot
        : () => ({ participants: [], mappings: [] }),
  };
}

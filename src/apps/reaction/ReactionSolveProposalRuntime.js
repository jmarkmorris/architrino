import {
  buildComposerReactionSolvePlan,
  describeComposerReactionSolvePlan,
} from "../../runtime/ComposerReactionSolveProposalRuntime.js";

export function buildReactionSolvePlan(options = {}) {
  return buildComposerReactionSolvePlan(options);
}

export function describeReactionSolvePlan(plan = {}) {
  return describeComposerReactionSolvePlan(plan);
}

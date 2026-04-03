export const REACTION_OPERATOR_GRAMMAR_ENTRIES = Object.freeze([
  Object.freeze({
    templateId: "dissociate",
    laneIndex: 0,
    laneLabel: "Inner-left lane",
    title: "Dissociate opens carried structure",
    detail:
      "Use Dissociate to open one source-side participant or center assembly so its constituents can continue through visible corridors.",
  }),
  Object.freeze({
    templateId: "associate",
    laneIndex: 1,
    laneLabel: "Inner-right lane",
    title: "Associate gathers to one output",
    detail:
      "Use Associate to collect available constituents and commit them into one assembled downstream participant.",
  }),
]);

export const REACTION_CORRIDOR_LEGEND_ENTRIES = Object.freeze([
  Object.freeze({
    key: "pending",
    tone: "warning",
    label: "Selected source",
    detail: "A corridor has started here and still needs a destination.",
  }),
  Object.freeze({
    key: "ready",
    tone: "neutral",
    label: "Ready target",
    detail: "This destination can accept the current source without breaking the visible rules.",
  }),
  Object.freeze({
    key: "mapped",
    tone: "valid",
    label: "Authored corridor",
    detail: "This anchor is already carrying authored provenance.",
  }),
  Object.freeze({
    key: "invalid",
    tone: "danger",
    label: "Rule break",
    detail: "A red corridor still violates conservation or structure compatibility and needs correction.",
  }),
]);

function pluralize(count = 0, singular = "", plural = "") {
  const resolvedCount = Math.max(0, Number(count) || 0);
  if (resolvedCount === 1) {
    return `1 ${singular}`;
  }
  return `${resolvedCount} ${plural || `${singular}s`}`;
}

function buildPillEntry(label = "", tone = "neutral") {
  return Object.freeze({
    label: String(label ?? "").trim(),
    tone: String(tone ?? "").trim() || "neutral",
  });
}

export function buildReactionLegibilitySnapshot(options = {}) {
  const participants = Array.isArray(options.participants) ? options.participants : [];
  const mappings = Array.isArray(options.mappings) ? options.mappings : [];
  const pendingSourceKey = String(options.pendingSourceKey ?? "").trim();
  const pendingSourceRole = String(options.pendingSourceRole ?? "").trim();
  const getMappingValidation =
    typeof options.getMappingValidation === "function"
      ? options.getMappingValidation
      : () => ({ valid: true, reason: "" });
  const getOperatorLedgerSummary =
    typeof options.getOperatorLedgerSummary === "function"
      ? options.getOperatorLedgerSummary
      : () => ({
          isBalanced: false,
          isOpen: false,
          isInvalid: false,
        });

  const operatorParticipants = participants.filter((participant) => participant?.side === "operator");
  const conservativeCorridorCount = mappings.reduce((count, mapping) => {
    const validation = getMappingValidation(mapping);
    return validation?.valid ? count + 1 : count;
  }, 0);
  const invalidCorridorCount = Math.max(0, mappings.length - conservativeCorridorCount);
  const operatorStateCounts = operatorParticipants.reduce(
    (counts, participant) => {
      const summary = getOperatorLedgerSummary(participant?.id);
      if (summary?.isInvalid) {
        counts.invalid += 1;
        return counts;
      }
      if (summary?.isOpen) {
        counts.open += 1;
        return counts;
      }
      if (summary?.isBalanced) {
        counts.balanced += 1;
        return counts;
      }
      counts.idle += 1;
      return counts;
    },
    { balanced: 0, open: 0, invalid: 0, idle: 0 }
  );

  let focusKind = "idle";
  let focusSummary = "Select a reactant or operator output to start the first corridor.";
  if (!participants.length) {
    focusKind = "empty";
    focusSummary =
      "Add reactants on the left, products on the right, and use the center lanes only when the visible provenance story needs them.";
  } else if (pendingSourceKey) {
    focusKind = "pending-source";
    focusSummary =
      pendingSourceRole === "operator-output"
        ? "Selected source: operator output. Finish the corridor on a product or another operator input."
        : "Selected source: reactant or center-side source. Finish the corridor on a product or operator input.";
  } else if (invalidCorridorCount > 0) {
    focusKind = "invalid-corridor";
    focusSummary =
      "Red corridors still break conservation or structure compatibility. They stay visible until the authored route is corrected.";
  } else if (operatorStateCounts.invalid > 0) {
    focusKind = "invalid-operator";
    focusSummary =
      "At least one operator is over-emitting relative to its available ledger. Fix the surrounding corridors before accepting the surface.";
  } else if (operatorStateCounts.open > 0) {
    focusKind = "open-operator";
    focusSummary =
      "At least one operator is still open. Its emitted ledger has not yet been fully discharged into downstream corridors.";
  } else if (conservativeCorridorCount > 0 || operatorStateCounts.balanced > 0) {
    focusKind = "conservative-surface";
    focusSummary =
      "The visible surface is conservative so far. Review the authored corridors and balanced operators before handoff.";
  }

  return Object.freeze({
    focusState: Object.freeze({
      kind: focusKind,
      summary: focusSummary,
    }),
    workflowLines: Object.freeze([
      "Start a corridor from a reactant or operator output anchor.",
      "Finish it on a product or operator input anchor.",
      "Use red routes and open operators as visible review signals, not hidden solver-only state.",
    ]),
    operatorGrammarEntries: REACTION_OPERATOR_GRAMMAR_ENTRIES,
    corridorLegendEntries: REACTION_CORRIDOR_LEGEND_ENTRIES,
    corridorState: Object.freeze({
      totalCount: mappings.length,
      conservativeCount: conservativeCorridorCount,
      invalidCount: invalidCorridorCount,
      pillEntries: Object.freeze([
        buildPillEntry(pluralize(mappings.length, "corridor"), "neutral"),
        buildPillEntry(pluralize(conservativeCorridorCount, "conservative corridor"), "valid"),
        buildPillEntry(pluralize(invalidCorridorCount, "invalid corridor"), "danger"),
      ]),
    }),
    operatorState: Object.freeze({
      totalCount: operatorParticipants.length,
      balancedCount: operatorStateCounts.balanced,
      openCount: operatorStateCounts.open,
      invalidCount: operatorStateCounts.invalid,
      idleCount: operatorStateCounts.idle,
      pillEntries: Object.freeze([
        buildPillEntry(pluralize(operatorParticipants.length, "operator"), "neutral"),
        buildPillEntry(pluralize(operatorStateCounts.balanced, "balanced operator"), "valid"),
        buildPillEntry(pluralize(operatorStateCounts.open, "open operator"), "warning"),
        buildPillEntry(pluralize(operatorStateCounts.invalid, "invalid operator"), "danger"),
      ]),
    }),
  });
}

export const COMPOSER_REACTION_ACTION_KINDS = Object.freeze([
  "spawn",
  "despawn",
  "transform",
  "detach",
  "attach",
  "mapping",
  "reassemble",
]);

const composerReactionActionKindSet = new Set(COMPOSER_REACTION_ACTION_KINDS);

export function normalizeComposerReactionAction(rawAction) {
  const normalized = String(rawAction ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");
  if (normalized === "handoff") {
    return "mapping";
  }
  return composerReactionActionKindSet.has(normalized) ? normalized : null;
}

export function splitComposerDelimitedTopLevel(rawText, delimiter = ",") {
  const source = String(rawText ?? "");
  const parts = [];
  let depth = 0;
  let current = "";
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (character === "(") {
      depth += 1;
      current += character;
      continue;
    }
    if (character === ")") {
      depth = Math.max(0, depth - 1);
      current += character;
      continue;
    }
    if (character === delimiter && depth === 0) {
      parts.push(current.trim());
      current = "";
      continue;
    }
    current += character;
  }
  if (current.trim()) {
    parts.push(current.trim());
  }
  return parts.filter(Boolean);
}

export function parseComposerReactionStageSpecs(
  rawActions,
  {
    transferById = new Map(),
    allowedTransferIds = [],
    normalizeTransferRef = null,
  } = {}
) {
  const allowed = new Set(Array.isArray(allowedTransferIds) ? allowedTransferIds : []);
  const tokens = splitComposerDelimitedTopLevel(rawActions || "mapping");
  return tokens
    .map((token) => {
      const match = token.match(/^([a-zA-Z_\s-]+?)(?:\(([^)]*)\))?$/);
      if (!match) {
        return null;
      }
      const action = normalizeComposerReactionAction(match[1]);
      if (!action) {
        return null;
      }
      const stageTransferIds = match[2]
        ? splitComposerDelimitedTopLevel(match[2])
            .map((part) =>
              typeof normalizeTransferRef === "function"
                ? normalizeTransferRef(part, transferById)
                : null
            )
            .filter((transferId) => transferId && allowed.has(transferId))
        : [];
      if (match[2] && !stageTransferIds.length) {
        return null;
      }
      return {
        action,
        transferIds: stageTransferIds,
      };
    })
    .filter(Boolean);
}

export function buildComposerReactionStages(
  stageSpecs = [],
  start = 0,
  end = 0,
  fallbackTransferIds = []
) {
  const normalizedStages = Array.isArray(stageSpecs) ? stageSpecs.filter(Boolean) : [];
  if (!normalizedStages.length || end <= start) {
    return [];
  }
  const duration = end - start;
  const fallbackIds = Array.isArray(fallbackTransferIds) ? [...new Set(fallbackTransferIds)] : [];
  return normalizedStages.map((stageSpec, index) => {
    const stageStart = Number((start + (duration * index) / normalizedStages.length).toFixed(3));
    const stageEnd =
      index === normalizedStages.length - 1
        ? Number(end.toFixed(3))
        : Number((start + (duration * (index + 1)) / normalizedStages.length).toFixed(3));
    return {
      id: `stage_${index + 1}`,
      action: stageSpec.action,
      start: stageStart,
      end: stageEnd,
      transferIds:
        Array.isArray(stageSpec.transferIds) && stageSpec.transferIds.length
          ? [...new Set(stageSpec.transferIds)]
          : fallbackIds,
    };
  });
}

export function parseComposerReactions(
  rawText,
  {
    transfers = [],
    duration = 24,
    parseTimingLines,
    clampTimelineSpan,
    normalizeTransferRef,
  } = {}
) {
  if (typeof parseTimingLines !== "function" || typeof clampTimelineSpan !== "function") {
    return [];
  }
  const transferById = new Map(
    (Array.isArray(transfers) ? transfers : []).map((transfer) => [transfer?.id, transfer])
  );
  return parseTimingLines(rawText, (line, lineNumber) => {
    const match = line.match(
      /^(.+?)\s*@\s*(-?\d*\.?\d+)\s*-\s*(-?\d*\.?\d+)(?:\s*:\s*([^|]+?))?(?:\s*\|\s*(.+))?$/
    );
    if (!match) {
      return null;
    }
    const [, rawLabel, rawStart, rawEnd, rawTransfers, rawActions] = match;
    const span = clampTimelineSpan(Number(rawStart), Number(rawEnd), duration);
    const transferIds = rawTransfers
      ? rawTransfers
          .split(",")
          .map((part) =>
            typeof normalizeTransferRef === "function"
              ? normalizeTransferRef(part, transferById)
              : null
          )
          .filter(Boolean)
      : [];
    const dedupedTransferIds = [...new Set(transferIds)];
    const stageSpecs = parseComposerReactionStageSpecs(rawActions, {
      transferById,
      allowedTransferIds: dedupedTransferIds,
      normalizeTransferRef,
    });
    const normalizedStageSpecs = stageSpecs.length
      ? stageSpecs
      : [
          {
            action: "mapping",
            transferIds: dedupedTransferIds,
          },
        ];
    return {
      id: `reaction_authored_${lineNumber}`,
      label: rawLabel.trim() || `Reaction ${lineNumber}`,
      start: span.start,
      end: span.end,
      transferIds: dedupedTransferIds,
      stages: buildComposerReactionStages(
        normalizedStageSpecs,
        span.start,
        span.end,
        dedupedTransferIds
      ),
    };
  });
}

export function formatComposerReactionTransferRefs(transferIds = []) {
  return transferIds
    .map((transferId) => {
      const match = String(transferId ?? "").match(/^transfer_authored_(\d+)$/);
      return match ? match[1] : transferId;
    })
    .join(", ");
}

export function formatComposerReactionTransferRef(transferId) {
  return formatComposerReactionTransferRefs([transferId]);
}

export function formatComposerReactionList(reactions = []) {
  return reactions
    .map((reaction) => {
      const label = reaction?.label ?? reaction?.id ?? "reaction";
      const start = Number(reaction?.start ?? reaction?.timing?.start ?? 0);
      const end = Number(reaction?.end ?? reaction?.timing?.end ?? 0);
      const transferRefs = formatComposerReactionTransferRefs(reaction?.transferIds);
      const fallbackRefs = transferRefs;
      const actionRefs = Array.isArray(reaction?.stages)
        ? reaction.stages
            .map((stage) => {
              if (!stage?.action) {
                return null;
              }
              const stageRefs = formatComposerReactionTransferRefs(stage?.transferIds);
              return stageRefs && stageRefs !== fallbackRefs
                ? `${stage.action}(${stageRefs})`
                : stage.action;
            })
            .filter(Boolean)
            .join(", ")
        : "";
      const transferPart = transferRefs ? `: ${transferRefs}` : "";
      return `${label} @ ${start}-${end}${transferPart}${actionRefs ? ` | ${actionRefs}` : ""}`;
    })
    .join("\n");
}

export function buildComposerReactionActionString(stageDrafts = []) {
  return stageDrafts
    .map((stageDraft) => {
      const action = normalizeComposerReactionAction(stageDraft?.action);
      if (!action) {
        return null;
      }
      const refs = String(stageDraft?.transferRefs ?? "")
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean)
        .join(", ");
      return refs ? `${action}(${refs})` : action;
    })
    .filter(Boolean)
    .join(", ");
}

export function resolveComposerReactionTransferRefs(
  rawTransferRefs,
  transfers = [],
  { normalizeTransferRef } = {}
) {
  const transferById = new Map(
    (Array.isArray(transfers) ? transfers : []).map((transfer) => [transfer?.id, transfer])
  );
  const requestedRefs = String(rawTransferRefs ?? "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
  const resolvedIds = requestedRefs
    .map((ref) =>
      typeof normalizeTransferRef === "function" ? normalizeTransferRef(ref, transferById) : null
    )
    .filter(Boolean);
  return {
    requestedRefs,
    resolvedIds: [...new Set(resolvedIds)],
    transferById,
  };
}

export function getComposerReactionStageDrafts(reaction = null) {
  if (reaction && Array.isArray(reaction.stages) && reaction.stages.length) {
    return reaction.stages.map((stage) => ({
      action: normalizeComposerReactionAction(stage?.action) ?? "mapping",
      transferRefs: formatComposerReactionTransferRefs(stage?.transferIds),
    }));
  }
  return [
    { action: "detach", transferRefs: "" },
    { action: "mapping", transferRefs: "" },
    { action: "reassemble", transferRefs: "" },
  ];
}

export function getComposerReactionActionOptions() {
  return COMPOSER_REACTION_ACTION_KINDS.map((action) => ({
    value: action,
    label: action.replace(/_/g, " "),
  }));
}

export function shortenComposerTimelineBandLabel(label, maxLength = 12) {
  const text = String(label ?? "").trim();
  if (!text) {
    return "";
  }
  return text.length > maxLength ? `${text.slice(0, Math.max(1, maxLength - 1))}\u2026` : text;
}

export function formatComposerReactionBandLabel(
  reaction,
  participantSummary = "",
  widthFraction = 0
) {
  const baseLabel = String(reaction?.label ?? reaction?.id ?? "Reaction").trim() || "Reaction";
  if (widthFraction <= 0.035) {
    return participantSummary || "";
  }
  if (widthFraction <= 0.065) {
    return participantSummary || shortenComposerTimelineBandLabel(baseLabel, 6);
  }
  if (widthFraction <= 0.1) {
    return participantSummary
      ? `${shortenComposerTimelineBandLabel(baseLabel, 8)} ${participantSummary}`
      : shortenComposerTimelineBandLabel(baseLabel, 10);
  }
  return participantSummary
    ? `${shortenComposerTimelineBandLabel(baseLabel, 14)} ${participantSummary}`
    : shortenComposerTimelineBandLabel(baseLabel, 18);
}

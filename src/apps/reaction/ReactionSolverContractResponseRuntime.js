function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function normalizeLowerText(value = "") {
  return normalizeText(value).toLowerCase();
}

function formatCount(count = 0, singular = "item") {
  const normalizedCount = Math.max(0, Number(count) || 0);
  return `${normalizedCount} ${singular}${normalizedCount === 1 ? "" : "s"}`;
}

export function describeReactionSolverResult(result = {}) {
  const counts = {
    direct: 0,
    composite: 0,
    partialComposite: 0,
    associate: 0,
  };
  (Array.isArray(result?.steps) ? result.steps : []).forEach((step) => {
    const resolvedCount = Math.max(
      1,
      Array.isArray(step?.resolvedTargetIds) ? step.resolvedTargetIds.length : 0
    );
    const kind = normalizeLowerText(step?.kind);
    const ruleFamily = normalizeLowerText(step?.ruleFamily);
    if (kind === "associate") {
      counts.associate += resolvedCount;
      return;
    }
    if (kind === "carry-through") {
      counts.composite += resolvedCount;
      return;
    }
    if (ruleFamily.includes("partial")) {
      counts.partialComposite += resolvedCount;
      return;
    }
    if (kind === "direct-map") {
      counts.direct += resolvedCount;
    }
  });
  const parts = [];
  if (counts.direct > 0) {
    parts.push(formatCount(counts.direct, "direct product"));
  }
  if (counts.composite > 0) {
    parts.push(formatCount(counts.composite, "composite product"));
  }
  if (counts.partialComposite > 0) {
    parts.push(formatCount(counts.partialComposite, "partial composite product"));
  }
  if (counts.associate > 0) {
    parts.push(formatCount(counts.associate, "associated product"));
  }
  if (!parts.length) {
    return "0 products";
  }
  return parts.join(" and ");
}

export function buildReactionSolverContractResponse(request = {}, result = {}, extra = {}) {
  return {
    request,
    result,
    planDescription: describeReactionSolverResult(result),
    unresolvedReactantCount: Array.isArray(result?.residue?.unusedSourceIds)
      ? result.residue.unusedSourceIds.length
      : 0,
    unresolvedTargetCount: Math.max(0, Number(result?.summary?.unresolvedTargetCount ?? 0) || 0),
    execution: extra?.execution ?? null,
  };
}

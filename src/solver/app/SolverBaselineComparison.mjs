const DEFAULT_BASELINE_TOLERANCE = 1e-10;
const DEFAULT_REFINEMENT_TOLERANCE = 1e-6;

export function classifySolverBaselineResponse(options = {}) {
  const baseline = options.baseline;
  const candidate = options.candidate;
  const tolerance = options.tolerance ?? DEFAULT_BASELINE_TOLERANCE;
  const refinementTolerance = options.refinementTolerance ?? DEFAULT_REFINEMENT_TOLERANCE;
  const differences = [];

  if (!baseline || !candidate) {
    return createComparisonResult("baseline_investigation_required_mismatch", differences, {
      message: "baseline and candidate responses are required",
    });
  }

  compareArrayLengths(differences, "roots", baseline.roots, candidate.roots);
  compareArrayLengths(differences, "hits", baseline.hits, candidate.hits);
  compareArrayLengths(differences, "rootLedgerDetails", baseline.rootLedgerDetails, candidate.rootLedgerDetails);
  compareArrayLengths(differences, "frames", baseline.frames, candidate.frames);
  compareArrayLengths(differences, "phaseRows", baseline.phaseRows, candidate.phaseRows);
  compareArrayLengths(differences, "buffers", baseline.buffers, candidate.buffers);
  if (differences.some((difference) => difference.kind === "length")) {
    return createComparisonResult("baseline_investigation_required_mismatch", differences);
  }

  compareValue(differences, "roots", baseline.roots, candidate.roots);
  compareValue(differences, "hits", baseline.hits, candidate.hits);
  compareValue(differences, "rootLedgerDetails", baseline.rootLedgerDetails, candidate.rootLedgerDetails);
  compareValue(differences, "frames", baseline.frames, candidate.frames);
  compareValue(differences, "phaseRows", baseline.phaseRows, candidate.phaseRows);
  compareValue(differences, "phaseSummary", baseline.phaseSummary, candidate.phaseSummary);
  compareValue(differences, "pathHistory", baseline.pathHistory, candidate.pathHistory);
  compareValue(
    differences,
    "dynamicReplayValidation",
    baseline.dynamicReplayValidation,
    candidate.dynamicReplayValidation
  );
  compareValue(differences, "buffers", baseline.buffers, candidate.buffers);
  compareValue(differences, "geometry", baseline.geometry, candidate.geometry);
  compareValue(differences, "status.code", baseline.status?.code, candidate.status?.code);

  const numericDifferences = differences.filter((difference) => difference.kind === "number");
  const maxAbsoluteDifference = numericDifferences.reduce(
    (maxValue, difference) => Math.max(maxValue, difference.absoluteDifference),
    0
  );
  const nonNumericMismatch = differences.some((difference) => difference.kind !== "number");

  if (!nonNumericMismatch && maxAbsoluteDifference <= tolerance) {
    return createComparisonResult("baseline_within_tolerance", differences, { maxAbsoluteDifference });
  }

  if (
    !nonNumericMismatch &&
    maxAbsoluteDifference <= refinementTolerance &&
    residualsDoNotWorsen(baseline, candidate)
  ) {
    return createComparisonResult("baseline_refined_result", differences, { maxAbsoluteDifference });
  }

  if (nonNumericMismatch && differences.every((difference) => difference.path.startsWith("status."))) {
    return createComparisonResult("baseline_model_boundary_difference", differences, {
      maxAbsoluteDifference,
    });
  }

  return createComparisonResult("baseline_investigation_required_mismatch", differences, {
    maxAbsoluteDifference,
  });
}

function compareArrayLengths(differences, path, baseline, candidate) {
  if (!Array.isArray(baseline) || !Array.isArray(candidate)) {
    if (baseline !== candidate) {
      differences.push({
        kind: "type",
        path,
        baselineType: typeof baseline,
        candidateType: typeof candidate,
      });
    }
    return;
  }
  if (baseline.length !== candidate.length) {
    differences.push({
      kind: "length",
      path,
      baselineLength: baseline.length,
      candidateLength: candidate.length,
    });
  }
}

function compareValue(differences, path, baseline, candidate) {
  if (typeof baseline === "number" || typeof candidate === "number") {
    if (!Number.isFinite(baseline) || !Number.isFinite(candidate)) {
      if (baseline !== candidate) {
        differences.push({ kind: "number", path, baseline, candidate, absoluteDifference: Infinity });
      }
      return;
    }
    const absoluteDifference = Math.abs(baseline - candidate);
    if (absoluteDifference > 0) {
      differences.push({ kind: "number", path, baseline, candidate, absoluteDifference });
    }
    return;
  }

  if (Array.isArray(baseline) && Array.isArray(candidate)) {
    if (baseline.length !== candidate.length) {
      differences.push({
        kind: "length",
        path,
        baselineLength: baseline.length,
        candidateLength: candidate.length,
      });
    }
    const count = Math.min(baseline.length, candidate.length);
    for (let index = 0; index < count; index += 1) {
      compareValue(differences, `${path}[${index}]`, baseline[index], candidate[index]);
    }
    return;
  }

  if (isPlainObject(baseline) && isPlainObject(candidate)) {
    const keys = new Set([...Object.keys(baseline), ...Object.keys(candidate)]);
    [...keys].sort().forEach((key) => {
      compareValue(differences, `${path}.${key}`, baseline[key], candidate[key]);
    });
    return;
  }

  if (baseline !== candidate) {
    differences.push({ kind: "value", path, baseline, candidate });
  }
}

function residualsDoNotWorsen(baseline, candidate) {
  const baselineResidual = maxResidualMagnitude(baseline);
  const candidateResidual = maxResidualMagnitude(candidate);
  return candidateResidual <= baselineResidual;
}

function maxResidualMagnitude(response) {
  const roots = Array.isArray(response?.roots) ? response.roots : [];
  return roots.reduce((maxValue, root) => {
    const residual = Math.abs(root?.residual ?? 0);
    return Number.isFinite(residual) ? Math.max(maxValue, residual) : Infinity;
  }, 0);
}

function isPlainObject(value) {
  return value != null && typeof value === "object" && !Array.isArray(value);
}

function createComparisonResult(classification, differences, options = {}) {
  const severity = classification === "baseline_within_tolerance" ? "ok" : "warning";
  return {
    classification,
    maxAbsoluteDifference: options.maxAbsoluteDifference ?? 0,
    differences,
    status: {
      code: classification,
      severity,
      message: options.message || classification.replaceAll("_", " "),
      recoverable: classification !== "baseline_within_tolerance",
    },
  };
}

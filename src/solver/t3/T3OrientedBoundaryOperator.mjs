export const T3_ORIENTED_BOUNDARY_PROTOTYPE_SCHEMA = "t3-oriented-boundary-prototype.v1";

const AXES = ["x", "y", "z"];
const BOUNDARY_EVENT_PATTERN = /boundary|wrap|periodic|seam|image/i;

export function createT3OrientedBoundaryPrototype(runSummary, options = {}) {
  if (!runSummary || runSummary.schema !== "t3-run-summary.v1") {
    throw new TypeError("T3 oriented boundary prototype requires a t3-run-summary.v1 record");
  }

  const seamOwnershipRows = createSeamOwnershipRows(runSummary.periodicWrapEvidence);
  const neighborPairBoundaryRows = createNeighborPairBoundaryRows(runSummary.neighborPairCounts);
  const eventBoundaryRows = createEventBoundaryRows(runSummary.eventSummary);
  const boundarySignalCounts = {
    seamOwnershipRowCount: seamOwnershipRows.filter((row) => row.status !== "absent").length,
    neighborPairTransitionCount: neighborPairBoundaryRows.filter((row) => row.signedNeighborPairDelta !== 0).length,
    eventBoundaryLikeCount: nonnegativeInteger(runSummary.eventSummary?.boundaryLikeEventCount ?? 0),
  };

  return {
    schema: T3_ORIENTED_BOUNDARY_PROTOTYPE_SCHEMA,
    promotionStatus: "priority-only executable evidence",
    claimLevel:
      "prototype-only; does not construct retained causal-root rows and does not prove branch admissibility",
    input: {
      runSummarySchema: runSummary.schema,
      solverEngine: runSummary.solverEngine,
      executionPath: runSummary.executionPath,
      interactionPreset: runSummary.interactionPreset,
      stepCount: runSummary.stepCount,
      particleCount: runSummary.particleCount,
    },
    retainedBoundaryOperator: {
      notation: "partial_top R_act",
      rowDomain: "retained winding-labeled causal-root rows on T_L^3",
      signConvention:
        "positive imageDelta contributes +e_axis seam-transfer demand; negative imageDelta contributes -e_axis seam-transfer demand",
      coefficientSources: {
        seamOwnership: "periodicWrapEvidence.imageDeltaTotals and absoluteImageDeltaTotals",
        neighborPopulation: "finite differences of neighborPairCounts.perStep",
        runEvents: "eventSummary.eventTypeCounts and boundaryLikeEventCount",
      },
    },
    seamOwnershipRows,
    neighborPairBoundaryRows,
    eventBoundaryRows,
    boundarySignalCounts,
    discipline: {
      imageDeltas:
        "signed periodic image deltas discipline which winding directions require seam ownership rows",
      seamOwnership:
        "zero absolute image delta means absent seam evidence; cancelling signed totals are only paired seam-transfer candidates until same-record owners are supplied",
      neighborCounts:
        "neighbor-pair count changes discipline native pair-population changes, not causal-root multiplicity",
      runEvents:
        "already-emitted detector events can mark boundary-like rows, but event counts are not wake-history event-ledger proof",
    },
    remainingUnproven: [
      "retained winding-labeled causal-root rows are not constructed from the run envelope",
      "the absent, paired, or routed same-record boundary map is not supplied",
      "Jacobian floors, caustic routes, endpoint rows, memory-window rows, and collision/core rows are not derived",
      "native neighbor-pair counts are interaction-neighborhood counts, not causal-root counts",
      "event summaries are detector aggregates, not accepted wake-history event ledger rows",
      "branch admissibility for downstream EOM, action, wake-history, Noether sea, or cross-sector consumers is not proved",
    ],
    result: {
      status: "priority_only_oriented_boundary_prototype",
      masterEomDependency: false,
      retainedBranch: false,
      provesBranchAdmissibility: false,
      updatesLiveValidationGate: false,
    },
    metadata: clonePlainObject(options.metadata ?? {}),
  };
}

function createSeamOwnershipRows(periodicWrapEvidence = {}) {
  const signedTotals = periodicWrapEvidence?.imageDeltaTotals ?? {};
  const absoluteTotals = periodicWrapEvidence?.absoluteImageDeltaTotals ?? {};
  return AXES.map((axis) => {
    const signedImageDelta = integer(signedTotals[axis] ?? 0, `imageDeltaTotals.${axis}`);
    const absoluteImageDelta = nonnegativeInteger(absoluteTotals[axis] ?? Math.abs(signedImageDelta));
    let status = "absent";
    let orientation = "none";
    if (absoluteImageDelta > 0 && signedImageDelta === 0) {
      status = "paired_seam_transfer_candidate";
      orientation = "opposite_winding_orientations_cancel_in_summary";
    } else if (signedImageDelta > 0) {
      status = "same_record_seam_owner_required";
      orientation = "positive_winding_orientation";
    } else if (signedImageDelta < 0) {
      status = "same_record_seam_owner_required";
      orientation = "negative_winding_orientation";
    }
    return {
      axis,
      signedImageDelta,
      absoluteImageDelta,
      orientedBoundaryCoefficient: signedImageDelta,
      orientation,
      status,
      boundaryStratum: "winding/seam",
    };
  });
}

function createNeighborPairBoundaryRows(neighborPairCounts = {}) {
  const perStep = Array.isArray(neighborPairCounts?.perStep) ? neighborPairCounts.perStep : [];
  const rows = [];
  for (let stepIndex = 1; stepIndex < perStep.length; stepIndex += 1) {
    const previousCount = nullableFiniteNumber(perStep[stepIndex - 1]);
    const currentCount = nullableFiniteNumber(perStep[stepIndex]);
    if (previousCount == null || currentCount == null) {
      rows.push({
        fromStep: stepIndex - 1,
        toStep: stepIndex,
        previousCount,
        currentCount,
        signedNeighborPairDelta: null,
        orientation: "unknown",
        status: "neighbor_count_missing",
      });
      continue;
    }
    const signedNeighborPairDelta = currentCount - previousCount;
    rows.push({
      fromStep: stepIndex - 1,
      toStep: stepIndex,
      previousCount,
      currentCount,
      signedNeighborPairDelta,
      orientation: neighborPairDeltaOrientation(signedNeighborPairDelta),
      status:
        signedNeighborPairDelta === 0
          ? "neighbor_population_unchanged"
          : "candidate_neighbor_population_boundary",
    });
  }
  return rows;
}

function createEventBoundaryRows(eventSummary = {}) {
  const eventTypeCounts = eventSummary?.eventTypeCounts ?? {};
  const rows = [
    {
      eventType: "boundary_like_event_aggregate",
      count: nonnegativeInteger(eventSummary?.boundaryLikeEventCount ?? 0),
      orientation: "detector_declared_no_sign",
      status:
        nonnegativeInteger(eventSummary?.boundaryLikeEventCount ?? 0) > 0
          ? "boundary_like_event_rows_present"
          : "absent",
    },
  ];
  for (const eventType of Object.keys(eventTypeCounts).sort()) {
    const count = nonnegativeInteger(eventTypeCounts[eventType]);
    rows.push({
      eventType,
      count,
      orientation: "detector_declared_no_sign",
      status: BOUNDARY_EVENT_PATTERN.test(eventType) ? "boundary_like_event_type" : "event_count_only",
    });
  }
  return rows;
}

function neighborPairDeltaOrientation(delta) {
  if (delta > 0) {
    return "pair_contact_birth_candidate";
  }
  if (delta < 0) {
    return "pair_contact_death_candidate";
  }
  return "none";
}

function nullableFiniteNumber(value) {
  if (value == null) {
    return null;
  }
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
}

function integer(value, fieldName) {
  const numericValue = Number(value);
  if (!Number.isInteger(numericValue)) {
    throw new TypeError(`${fieldName} must be an integer`);
  }
  return numericValue;
}

function nonnegativeInteger(value) {
  const numericValue = Number(value ?? 0);
  if (!Number.isInteger(numericValue) || numericValue < 0) {
    throw new TypeError("T3 boundary prototype count must be a nonnegative integer");
  }
  return numericValue;
}

function clonePlainObject(value) {
  return JSON.parse(JSON.stringify(value ?? {}));
}

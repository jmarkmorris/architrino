export const T3_ORIENTED_BOUNDARY_PROTOTYPE_SCHEMA = "t3-oriented-boundary-prototype.v1";

const AXES = ["x", "y", "z"];
const BOUNDARY_EVENT_PATTERN = /boundary|wrap|periodic|seam|image/i;
const SAME_RECORD_REPLAY_BOUNDARY_SCHEMA = "t3-same-record-replay-boundary.v1";
const SAME_RECORD_REPLAY_PRODUCER_TARGET = "t3-retained-causal-root-replay.v1";
const COMMON_REPLAY_FIELDS_REQUIRED = [
  "sameRecordReplayId",
  "retainedSourceRecordId",
  "retainedCausalRootRowId",
  "rowFamilyIdentity",
  "boundaryOrientation",
  "windingLabel",
  "jacobianFloorOrDeclaredStratum",
  "endpointRoute",
  "memoryWindowRoute",
  "collisionCoreRoute",
  "omittedRowRoute",
];

export function createT3OrientedBoundaryPrototype(runSummary, options = {}) {
  if (!runSummary || runSummary.schema !== "t3-run-summary.v1") {
    throw new TypeError("T3 oriented boundary prototype requires a t3-run-summary.v1 record");
  }

  const seamOwnershipRows = createSeamOwnershipRows(runSummary.periodicWrapEvidence);
  const neighborPairBoundaryRows = createNeighborPairBoundaryRows(runSummary.neighborPairCounts);
  const eventBoundaryRows = createEventBoundaryRows(runSummary.eventSummary);
  const retainedBoundaryTarget = createRetainedBoundaryTarget({
    seamOwnershipRows,
    neighborPairBoundaryRows,
    eventBoundaryRows,
  });
  const negativeControlMatrix = createNegativeControlMatrix(retainedBoundaryTarget);
  const retainedBoundaryChronology = createRetainedBoundaryChronology({
    runSummary,
    negativeControlMatrix,
  });
  const sameRecordReplayBoundary = createSameRecordReplayBoundary(retainedBoundaryChronology);
  const boundarySignalCounts = {
    seamOwnershipRowCount: seamOwnershipRows.filter((row) => row.status !== "absent").length,
    neighborPairTransitionCount: neighborPairBoundaryRows.filter((row) => row.signedNeighborPairDelta !== 0).length,
    eventBoundaryLikeCount: nonnegativeInteger(runSummary.eventSummary?.boundaryLikeEventCount ?? 0),
    unresolvedBoundaryTargetRowCount: retainedBoundaryTarget.summary.unresolvedRowCount,
    chronologyRowCount: retainedBoundaryChronology.summary.rowCount,
    replayBoundaryRowCount: sameRecordReplayBoundary.summary.blockedReplayRowCount,
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
    retainedBoundaryTarget,
    negativeControlMatrix,
    retainedBoundaryChronology,
    sameRecordReplayBoundary,
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
      boundaryMatrixStatus: retainedBoundaryTarget.summary.matrixStatus,
      chronologyStatus: retainedBoundaryChronology.summary.status,
      sameRecordReplayStatus: sameRecordReplayBoundary.summary.replayStatus,
      firstFailureStatus:
        retainedBoundaryTarget.summary.firstUnresolvedRowId == null
          ? "no_summary_boundary_signal"
          : `retained_boundary_target_unresolved:${retainedBoundaryTarget.summary.firstUnresolvedRowId}`,
      firstRequiredEvidence:
        retainedBoundaryTarget.rows.find(
          (row) => row.rowId === retainedBoundaryTarget.summary.firstUnresolvedRowId
        )?.requiredRetainedEvidence ?? null,
      firstReplayBoundaryStatus:
        sameRecordReplayBoundary.summary.firstReplayBoundaryRowId == null
          ? "no_same_record_replay_candidate"
          : `same_record_replay_boundary:${sameRecordReplayBoundary.summary.firstReplayBoundaryRowId}`,
      firstProducerObjectRequired: sameRecordReplayBoundary.summary.firstProducerObjectRequired,
    },
    metadata: clonePlainObject(options.metadata ?? {}),
  };
}

function createSameRecordReplayBoundary(retainedBoundaryChronology) {
  const replayCandidateRows = retainedBoundaryChronology.rows.filter(
    (row) => row.closureStatus !== "absent"
  );
  const rows = replayCandidateRows.map(sameRecordReplayBoundaryRow);
  const negativeControls = createReplayNegativeControls(retainedBoundaryChronology);
  const producerRowSourceBoundary = createProducerRowSourceBoundary({
    retainedBoundaryChronology,
    rows,
    negativeControls,
  });
  return {
    schema: SAME_RECORD_REPLAY_BOUNDARY_SCHEMA,
    rowDomain:
      "retained chronology rows that still require same-record causal-root replay",
    producerTarget: SAME_RECORD_REPLAY_PRODUCER_TARGET,
    producerRowSourceBoundary,
    rows,
    negativeControls,
    missingFieldCatalog: {
      common: COMMON_REPLAY_FIELDS_REQUIRED,
      seam: [
        "seamPairingMapOrWindingOwnerRowId",
        "imageDeltaAxis",
        "signedImageDeltaWitness",
      ],
      neighbor: [
        "neighborPairDeltaRole",
        "causalRootMultiplicityDelta",
        "sameRecordPairContactBirthDeathRoute",
      ],
      detectorEvent: [
        "retainedEventRowId",
        "eventRowOrientation",
        "declaredBoundaryStratum",
      ],
      unresolvedRoot: [
        "rootLedgerRecordId",
        "causticRoute",
        "sourcePathSegmentId",
      ],
      signedBalance: [
        "sameRecordCancellationPairingMap",
        "absentPairedOrRoutedRowMap",
      ],
    },
    summary: {
      chronologyRowCount: retainedBoundaryChronology.summary.rowCount,
      replayCandidateRowCount: replayCandidateRows.length,
      acceptedReplayRowCount: 0,
      blockedReplayRowCount: rows.length,
      negativeControlCount: negativeControls.length,
      producerRowSourceStatus: producerRowSourceBoundary.summary.status,
      expectedSourceObjectSchema: producerRowSourceBoundary.expectedSourceObject.schema,
      replayStatus:
        rows.length > 0
          ? "fail_closed_missing_same_record_replay"
          : "no_replay_candidate_rows",
      firstReplayBoundaryRowId: rows[0]?.rowId ?? null,
      firstMissingField: rows[0]?.missingFields?.[0] ?? null,
      firstMissingProducerField:
        producerRowSourceBoundary.summary.firstMissingProducerField ?? null,
      firstProducerObjectRequired: SAME_RECORD_REPLAY_PRODUCER_TARGET,
      retainedBranch: false,
      provesBranchAdmissibility: false,
    },
  };
}

function createProducerRowSourceBoundary(input) {
  const { retainedBoundaryChronology, rows, negativeControls } = input;
  const activeFamilies = Array.from(
    new Set(rows.map((row) => row.rowFamily))
  ).sort();
  return {
    schema: "t3-retained-causal-root-replay-source-boundary.v1",
    observedSourceObject: {
      schema: "t3-run-summary.v1",
      retainedProducerRowSourcePresent: false,
      retainedProducerRowCount: 0,
      sourceStatus: "aggregate_and_step_summary_only",
      availableChronologyFields: [
        "stepIndex",
        "rowFamily",
        "rowKind",
        "evidenceMagnitude",
        "signedBalance",
        "candidateBoundaryOrientation",
        "firstBlocker",
      ],
      aggregateOrStepOnlyChannels: [
        "periodicWrapEvidence.imageDeltaTotals",
        "periodicWrapEvidence.absoluteImageDeltaTotals",
        "periodicWrapEvidence.perStep",
        "neighborPairCounts.perStep",
        "eventSummary.eventTypeCounts",
        "eventSummary.perStep",
      ],
      unsupportedReplayAttempt:
        "aggregate or per-step run-summary channels do not carry a retained source record id or retained causal-root row id",
    },
    expectedSourceObject: {
      schema: SAME_RECORD_REPLAY_PRODUCER_TARGET,
      rowDomain:
        "one retained causal-root replay row per active retained-boundary chronology row",
      requiredFields: COMMON_REPLAY_FIELDS_REQUIRED,
      familySpecificRequiredFields: {
        seam: [
          "seamPairingMapOrWindingOwnerRowId",
          "imageDeltaAxis",
          "signedImageDeltaWitness",
        ],
        neighbor: [
          "neighborPairDeltaRole",
          "causalRootMultiplicityDelta",
          "sameRecordPairContactBirthDeathRoute",
        ],
        detectorEvent: [
          "retainedEventRowId",
          "eventRowOrientation",
          "declaredBoundaryStratum",
        ],
        unresolvedRoot: [
          "rootLedgerRecordId",
          "causticRoute",
          "sourcePathSegmentId",
        ],
        signedBalance: [
          "sameRecordCancellationPairingMap",
          "absentPairedOrRoutedRowMap",
        ],
      },
    },
    blockedReplayAuthorization: {
      crossStepOrAggregateOnly:
        "must fail until every chronology row has its own retained source record and retained causal-root row id",
      zeroSignedBalanceCancellation:
        "must fail until the retained source record carries the same-record cancellation pairing or routing map",
      negativeControlIds: negativeControls.map((row) => row.controlId),
    },
    summary: {
      status: "missing_retained_causal_root_replay_source",
      activeChronologyRowCount: rows.length,
      activeChronologyFamilies: activeFamilies,
      observedChronologyRowCount: retainedBoundaryChronology.summary.rowCount,
      retainedProducerRowSourcePresent: false,
      retainedProducerRowCount: 0,
      acceptedReplayRowCount: 0,
      firstMissingProducerField: COMMON_REPLAY_FIELDS_REQUIRED[0],
      firstProducerObjectRequired: SAME_RECORD_REPLAY_PRODUCER_TARGET,
      retainedBranch: false,
      provesBranchAdmissibility: false,
    },
  };
}

function sameRecordReplayBoundaryRow(chronologyRow) {
  return {
    rowId: `same_record_replay_boundary_${chronologyRow.rowId}`,
    chronologyRowId: chronologyRow.rowId,
    stepIndex: chronologyRow.stepIndex,
    rowFamily: chronologyRow.rowFamily,
    rowKind: chronologyRow.rowKind,
    evidenceMagnitude: chronologyRow.evidenceMagnitude,
    signedBalance: chronologyRow.signedBalance,
    boundaryOrientation: replayBoundaryOrientation(chronologyRow),
    chronologyFirstBlocker: chronologyRow.firstBlocker,
    replayStatus: "blocked_missing_same_record_replay",
    producerTarget: SAME_RECORD_REPLAY_PRODUCER_TARGET,
    availableChronologyFields: [
      "stepIndex",
      "rowFamily",
      "rowKind",
      "evidenceMagnitude",
      "signedBalance",
      "candidateBoundaryOrientation",
      "firstBlocker",
    ],
    missingFields: replayMissingFields(chronologyRow),
    retainedBoundaryTargetRow: chronologyRow.retainedBoundaryTargetRow,
    detectorRow: chronologyRow.detectorRow,
    neighborRow: chronologyRow.neighborRow,
    negativeControlRow: chronologyRow.negativeControlRow,
  };
}

function replayMissingFields(chronologyRow) {
  const fields = [...COMMON_REPLAY_FIELDS_REQUIRED];
  if (chronologyRow.rowFamily === "seam") {
    fields.push(
      "seamPairingMapOrWindingOwnerRowId",
      "imageDeltaAxis",
      "signedImageDeltaWitness"
    );
  } else if (chronologyRow.rowFamily === "neighbor") {
    fields.push(
      "neighborPairDeltaRole",
      "causalRootMultiplicityDelta",
      "sameRecordPairContactBirthDeathRoute"
    );
  } else if (chronologyRow.rowFamily === "detector-event") {
    fields.push("retainedEventRowId", "eventRowOrientation", "declaredBoundaryStratum");
  } else if (chronologyRow.rowFamily === "unresolved-root") {
    fields.push("rootLedgerRecordId", "causticRoute", "sourcePathSegmentId");
  } else if (chronologyRow.rowFamily === "signed-balance") {
    fields.push("sameRecordCancellationPairingMap", "absentPairedOrRoutedRowMap");
  }
  return fields;
}

function replayBoundaryOrientation(chronologyRow) {
  if (chronologyRow.signedBalance > 0) {
    return "positive_boundary_orientation_candidate";
  }
  if (chronologyRow.signedBalance < 0) {
    return "negative_boundary_orientation_candidate";
  }
  if (chronologyRow.signedBalance === 0) {
    return "zero_or_cancelled_summary_balance_not_replay_orientation";
  }
  return "orientation_not_available_from_run_summary";
}

function createReplayNegativeControls(retainedBoundaryChronology) {
  const controls = [];
  const activeRows = retainedBoundaryChronology.rows.filter((row) => row.closureStatus !== "absent");
  const activeSteps = new Set(activeRows.map((row) => row.stepIndex));
  if (activeSteps.size > 1 || activeRows.length > 1) {
    controls.push({
      controlId: "cross_step_or_aggregate_only_replay_without_chronology_row_identity",
      expectedFailure:
        "aggregate or cross-step boundary evidence cannot replay a retained causal-root row without preserving the chronology row identity",
      replayStatus: "blocked_missing_same_record_replay",
      producerTarget: SAME_RECORD_REPLAY_PRODUCER_TARGET,
      requiredEvidence:
        "one same-record retained causal-root replay row per chronology row before aggregation",
      promotionBlocked: true,
    });
  }
  const zeroSignedControlRow = retainedBoundaryChronology.rows.find(
    (row) =>
      row.negativeControlRow === true &&
      row.signedBalance === 0 &&
      row.evidenceMagnitude > 0
  );
  if (zeroSignedControlRow) {
    controls.push({
      controlId: "zero_signed_balance_replay_without_same_record_pairing_map",
      chronologyRowId: zeroSignedControlRow.rowId,
      stepIndex: zeroSignedControlRow.stepIndex,
      expectedFailure:
        "zero signed balance cannot replay a retained boundary cancellation without the same-record pairing or routing map",
      replayStatus: "blocked_missing_same_record_replay",
      producerTarget: SAME_RECORD_REPLAY_PRODUCER_TARGET,
      requiredEvidence:
        "same-record cancellation pairing map plus absent, paired, or routed row map",
      promotionBlocked: true,
    });
  }
  return controls;
}

function createRetainedBoundaryChronology(input) {
  const { runSummary, negativeControlMatrix } = input;
  const stepCount = nonnegativeInteger(runSummary.stepCount ?? 0);
  const rows = [];
  for (let stepIndex = 0; stepIndex < stepCount; stepIndex += 1) {
    const stepRows = [
      ...stepSeamChronologyRows(stepIndex, runSummary.periodicWrapEvidence?.perStep?.[stepIndex]),
      ...stepNeighborChronologyRows(stepIndex, runSummary.neighborPairCounts?.perStep),
      ...stepEventChronologyRows(stepIndex, runSummary.eventSummary?.perStep?.[stepIndex]),
      unresolvedRootChronologyRow(stepIndex),
    ];
    rows.push(...stepRows, ...stepNegativeControlRows(stepIndex, stepRows, negativeControlMatrix));
  }
  const failClosedRows = rows.filter((row) => row.closureStatus !== "absent");
  return {
    schema: "t3-retained-boundary-chronology.v1",
    rowDomain:
      "per-step T3 run-summary boundary signals before same-record causal-root replay",
    rows,
    summary: {
      stepCount,
      rowCount: rows.length,
      failClosedRowCount: failClosedRows.length,
      status: failClosedRows.length > 0 ? "fail_closed_priority_only" : "no_step_boundary_signal",
      firstFailureStatus: failClosedRows[0]?.firstBlocker ?? null,
    },
  };
}

function stepSeamChronologyRows(stepIndex, periodicWrapStep) {
  const signedTotals = periodicWrapStep?.imageDeltaTotals ?? {};
  const absoluteTotals = periodicWrapStep?.absoluteImageDeltaTotals ?? {};
  return AXES.map((axis) => {
    const signedBalance = integer(signedTotals[axis] ?? 0, `perStep[${stepIndex}].imageDeltaTotals.${axis}`);
    const evidenceMagnitude = nonnegativeInteger(absoluteTotals[axis] ?? Math.abs(signedBalance));
    const closureStatus = evidenceMagnitude > 0 ? "unresolved_boundary_target" : "absent";
    return chronologyRow({
      stepIndex,
      rowFamily: "seam",
      rowKind: "retained-boundary-target",
      rowId: `step_${stepIndex}_seam_${axis}`,
      evidenceMagnitude,
      signedBalance,
      firstBlocker: seamChronologyBlocker(signedBalance, evidenceMagnitude),
      closureStatus,
    });
  });
}

function stepNeighborChronologyRows(stepIndex, neighborPairCounts = []) {
  if (stepIndex === 0 || !Array.isArray(neighborPairCounts)) {
    return [];
  }
  const previousCount = nullableFiniteNumber(neighborPairCounts[stepIndex - 1]);
  const currentCount = nullableFiniteNumber(neighborPairCounts[stepIndex]);
  const signedBalance = previousCount == null || currentCount == null ? null : currentCount - previousCount;
  const evidenceMagnitude = signedBalance == null ? null : Math.abs(signedBalance);
  return [
    chronologyRow({
      stepIndex,
      rowFamily: "neighbor",
      rowKind: "neighbor-row",
      rowId: `step_${stepIndex}_neighbor_${stepIndex - 1}_${stepIndex}`,
      evidenceMagnitude,
      signedBalance,
      firstBlocker:
        signedBalance == null
          ? "neighbor_count_missing"
          : signedBalance === 0
            ? null
            : "neighbor_pair_delta_without_retained_causal_root_rows",
      closureStatus:
        signedBalance == null
          ? "unresolved_missing_summary_row"
          : signedBalance === 0
            ? "absent"
            : "unresolved_boundary_target",
    }),
  ];
}

function stepEventChronologyRows(stepIndex, eventStep) {
  const rows = [];
  const boundaryLikeEventCount = nonnegativeInteger(eventStep?.boundaryLikeEventCount ?? 0);
  rows.push(
    chronologyRow({
      stepIndex,
      rowFamily: "detector-event",
      rowKind: "detector-row",
      rowId: `step_${stepIndex}_event_boundary_like_event_aggregate`,
      evidenceMagnitude: boundaryLikeEventCount,
      signedBalance: null,
      firstBlocker:
        boundaryLikeEventCount > 0 ? "boundary_like_detector_event_without_retained_event_row" : null,
      closureStatus: boundaryLikeEventCount > 0 ? "unresolved_boundary_target" : "absent",
    })
  );
  const eventTypeCounts = eventStep?.eventTypeCounts ?? {};
  for (const eventType of Object.keys(eventTypeCounts).sort()) {
    const count = nonnegativeInteger(eventTypeCounts[eventType]);
    const boundaryLike = BOUNDARY_EVENT_PATTERN.test(eventType);
    rows.push(
      chronologyRow({
        stepIndex,
        rowFamily: "detector-event",
        rowKind: "detector-row",
        rowId: `step_${stepIndex}_event_${stableRowId(eventType)}`,
        evidenceMagnitude: count,
        signedBalance: null,
        firstBlocker: boundaryLike
          ? "boundary_like_detector_event_without_retained_event_row"
          : "generic_event_count_without_boundary_stratum",
        closureStatus: count > 0 ? "unresolved_boundary_target" : "absent",
      })
    );
  }
  return rows;
}

function unresolvedRootChronologyRow(stepIndex) {
  return chronologyRow({
    stepIndex,
    rowFamily: "unresolved-root",
    rowKind: "retained-boundary-target",
    rowId: `step_${stepIndex}_unresolved_root_rows`,
    evidenceMagnitude: null,
    signedBalance: null,
    firstBlocker: "run_summary_without_retained_causal_root_rows",
    closureStatus: "unresolved_boundary_target",
  });
}

function stepNegativeControlRows(stepIndex, stepRows, negativeControlMatrix) {
  const signedBalance = stepRows.reduce(
    (sum, row) => (Number.isFinite(row.signedBalance) ? sum + row.signedBalance : sum),
    0
  );
  const evidenceMagnitude = stepRows.reduce(
    (sum, row) => (Number.isFinite(row.evidenceMagnitude) ? sum + row.evidenceMagnitude : sum),
    0
  );
  const hasUnresolvedRows = stepRows.some((row) => row.closureStatus !== "absent");
  if (signedBalance !== 0 || evidenceMagnitude <= 0 || !hasUnresolvedRows) {
    return [];
  }
  const control = negativeControlMatrix.controls.find(
    (row) => row.controlId === "zero_signed_boundary_sum_without_same_record_routing"
  );
  return [
    chronologyRow({
      stepIndex,
      rowFamily: "signed-balance",
      rowKind: "negative-control-row",
      rowId: `step_${stepIndex}_zero_signed_boundary_sum`,
      evidenceMagnitude,
      signedBalance,
      firstBlocker: control?.controlId ?? "zero_signed_boundary_sum_without_same_record_routing",
      closureStatus: "unresolved_negative_control",
    }),
  ];
}

function chronologyRow(input) {
  return {
    stepIndex: input.stepIndex,
    rowFamily: input.rowFamily,
    rowKind: input.rowKind,
    rowId: input.rowId,
    evidenceMagnitude: input.evidenceMagnitude,
    signedBalance: input.signedBalance,
    firstBlocker: input.firstBlocker,
    closureStatus: input.closureStatus,
    retainedBoundaryTargetRow:
      input.rowKind === "retained-boundary-target" || input.rowKind === "neighbor-row",
    detectorRow: input.rowKind === "detector-row",
    neighborRow: input.rowKind === "neighbor-row",
    negativeControlRow: input.rowKind === "negative-control-row",
  };
}

function seamChronologyBlocker(signedBalance, evidenceMagnitude) {
  if (evidenceMagnitude === 0) {
    return null;
  }
  if (signedBalance === 0) {
    return "cancelled_image_delta_without_same_record_pairing";
  }
  return "signed_image_delta_without_winding_owner";
}

function createRetainedBoundaryTarget(input) {
  const rows = [
    ...input.seamOwnershipRows.map(seamBoundaryTargetRow),
    ...input.neighborPairBoundaryRows.map(neighborBoundaryTargetRow),
    ...input.eventBoundaryRows.map(eventBoundaryTargetRow),
    unresolvedRootBoundaryTargetRow(),
  ];
  const unresolvedRows = rows.filter((row) => row.closureStatus !== "absent");
  const coefficientBalance = rows.reduce(
    (balance, row) => {
      if (row.orientedCoefficient == null) {
        balance.unsignedOrUnorientedRowCount += row.closureStatus === "absent" ? 0 : 1;
      } else {
        balance.signedCoefficientTotal += row.orientedCoefficient;
        balance.absoluteCoefficientTotal += Math.abs(row.orientedCoefficient);
      }
      if (Number.isFinite(row.evidenceMagnitude)) {
        balance.evidenceMagnitudeTotal += row.evidenceMagnitude;
      }
      return balance;
    },
    {
      signedCoefficientTotal: 0,
      absoluteCoefficientTotal: 0,
      evidenceMagnitudeTotal: 0,
      unsignedOrUnorientedRowCount: 0,
    }
  );
  const signedBalanceStatus = boundarySignedBalanceStatus(coefficientBalance, unresolvedRows.length);
  return {
    schema: "t3-retained-boundary-target.v1",
    targetExpression:
      "partial_top R_act = Delta_seam_T3 + Delta_neighbor_T3 + Delta_event_T3 + Delta_unresolved_root",
    rowDomainRequired: "retained winding-labeled causal-root rows with same-record boundary routing",
    rows,
    coefficientBalance,
    summary: {
      rowCount: rows.length,
      unresolvedRowCount: unresolvedRows.length,
      matrixStatus:
        unresolvedRows.length === 0 ? "no_boundary_signal_in_summary" : "fail_closed_priority_only",
      signedBalanceStatus,
      firstUnresolvedRowId: unresolvedRows[0]?.rowId ?? null,
    },
  };
}

function seamBoundaryTargetRow(row) {
  if (row.status === "absent") {
    return {
      rowId: `seam_${row.axis}`,
      sourceChannel: "periodicWrapEvidence",
      boundaryStratum: row.boundaryStratum,
      orientedCoefficient: 0,
      evidenceMagnitude: 0,
      requiredRetainedEvidence: "none for this axis in the run summary",
      negativeControl: "zero_absolute_image_delta_has_no_seam_boundary_signal",
      closureStatus: "absent",
    };
  }
  return {
    rowId: `seam_${row.axis}`,
    sourceChannel: "periodicWrapEvidence",
    boundaryStratum: row.boundaryStratum,
    orientedCoefficient: row.orientedBoundaryCoefficient,
    evidenceMagnitude: row.absoluteImageDelta,
    requiredRetainedEvidence:
      row.status === "paired_seam_transfer_candidate"
        ? "same-record pairing map proving the cancelling image deltas are the same retained seam transfer"
        : "same-record winding-owner row for the signed seam-transfer demand",
    negativeControl:
      row.status === "paired_seam_transfer_candidate"
        ? "cancelled_image_delta_without_same_record_pairing"
        : "signed_image_delta_without_winding_owner",
    closureStatus: "unresolved_boundary_target",
  };
}

function neighborBoundaryTargetRow(row) {
  if (row.status === "neighbor_population_unchanged") {
    return {
      rowId: `neighbor_${row.fromStep}_${row.toStep}`,
      sourceChannel: "neighborPairCounts",
      boundaryStratum: "native-neighbor-population",
      orientedCoefficient: 0,
      evidenceMagnitude: 0,
      requiredRetainedEvidence: "none from this transition in the run summary",
      negativeControl: "unchanged_neighbor_count_has_no_population_boundary_signal",
      closureStatus: "absent",
    };
  }
  return {
    rowId: `neighbor_${row.fromStep}_${row.toStep}`,
    sourceChannel: "neighborPairCounts",
    boundaryStratum: "native-neighbor-population",
    orientedCoefficient: row.signedNeighborPairDelta,
    evidenceMagnitude:
      row.signedNeighborPairDelta == null ? null : Math.abs(row.signedNeighborPairDelta),
    requiredRetainedEvidence:
      "retained causal-root row delta with winding owner, Jacobian floor or declared stratum, and same-record source identity",
    negativeControl: "neighbor_pair_delta_without_retained_causal_root_rows",
    closureStatus:
      row.status === "neighbor_count_missing"
        ? "unresolved_missing_summary_row"
        : "unresolved_boundary_target",
  };
}

function eventBoundaryTargetRow(row) {
  if (row.status === "absent" || row.count === 0) {
    return {
      rowId: `event_${stableRowId(row.eventType)}`,
      sourceChannel: "eventSummary",
      boundaryStratum: "detector-event",
      orientedCoefficient: null,
      evidenceMagnitude: 0,
      requiredRetainedEvidence: "none from this event row in the run summary",
      negativeControl: "zero_event_count_has_no_event_boundary_signal",
      closureStatus: "absent",
    };
  }
  return {
    rowId: `event_${stableRowId(row.eventType)}`,
    sourceChannel: "eventSummary",
    boundaryStratum: "detector-event",
    orientedCoefficient: null,
    evidenceMagnitude: row.count,
    requiredRetainedEvidence:
      "same-record retained event row with explicit orientation sign before any wake-history event-ledger consumer may use it",
    negativeControl:
      row.status === "boundary_like_event_type" || row.status === "boundary_like_event_rows_present"
        ? "boundary_like_detector_event_without_retained_event_row"
        : "generic_event_count_without_boundary_stratum",
    closureStatus: "unresolved_boundary_target",
  };
}

function unresolvedRootBoundaryTargetRow() {
  return {
    rowId: "unresolved_root_rows",
    sourceChannel: "t3-run-summary-envelope",
    boundaryStratum: "retained-causal-root-ledger",
    orientedCoefficient: null,
    evidenceMagnitude: null,
    requiredRetainedEvidence:
      "retained winding-labeled causal-root rows with endpoint, memory-window, caustic, collision/core, omitted-row, and seam routing",
    negativeControl: "run_summary_without_retained_causal_root_rows",
    closureStatus: "unresolved_boundary_target",
  };
}

function createNegativeControlMatrix(retainedBoundaryTarget) {
  const controls = retainedBoundaryTarget.rows
    .filter((row) => row.closureStatus !== "absent")
    .map((row) => ({
      controlId: row.negativeControl,
      rowId: row.rowId,
      expectedFailure:
        "must remain priority-only unless the required retained evidence is supplied on the same retained source record",
      requiredEvidence: row.requiredRetainedEvidence,
      promotionBlocked: true,
    }));
  if (retainedBoundaryTarget.summary.signedBalanceStatus === "signed_balance_is_not_boundary_closure") {
    controls.push({
      controlId: "zero_signed_boundary_sum_without_same_record_routing",
      rowId: "coefficient_balance",
      expectedFailure:
        "zero signed coefficient total must not be treated as closure while unresolved retained-boundary rows remain",
      requiredEvidence:
        "same-record absent, paired, or routed map for every unresolved retained-boundary target row",
      promotionBlocked: true,
    });
  }
  return {
    schema: "t3-oriented-boundary-negative-control-matrix.v1",
    controls,
    summary: {
      controlCount: controls.length,
      promotionBlocked: controls.length > 0,
      retainedBranch: false,
      provesBranchAdmissibility: false,
    },
  };
}

function boundarySignedBalanceStatus(coefficientBalance, unresolvedRowCount) {
  if (unresolvedRowCount === 0) {
    return "no_unresolved_boundary_rows";
  }
  if (
    coefficientBalance.signedCoefficientTotal === 0 &&
    (coefficientBalance.absoluteCoefficientTotal > 0 ||
      coefficientBalance.evidenceMagnitudeTotal > 0 ||
      coefficientBalance.unsignedOrUnorientedRowCount > 0)
  ) {
    return "signed_balance_is_not_boundary_closure";
  }
  return "unresolved_boundary_rows_not_closed_by_summary";
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

function stableRowId(value) {
  return String(value ?? "row")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "") || "row";
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

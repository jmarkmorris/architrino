export const BORG_EOM_WAKE_BOUNDARY_PRODUCTS_SCHEMA =
  "eom_borg_wake_boundary_products/v1";
export const BORG_EOM_BOUNDARY_DIAGNOSTICS_REQUEST_SCHEMA =
  "eom_borg_boundary_diagnostics_request/v1";

const SHELL_ENVELOPE_SCHEMA = "eom_borg_shell_extraction_request/v1";
const SHELL_PARTITION_SCHEMA = "eom_borg_shell_partition/v1";
const SHELL_TIME_BIN_SCHEMA = "eom_borg_shell_time_bin/v1";
const REPLAY_SOURCE_SCHEMA = "eom_borg_boundary_shell_replay_source/v1";
const RESIDUAL_SPEC_SCHEMA = "eom_borg_residual_spec/v1";
const RESIDUAL_SAMPLE_SCHEMA = "eom_borg_paired_residual_sample/v1";

const RESIDUAL_DOMAINS = Object.freeze(new Map([
  ["shell_self_similarity", "shell-statistic-component"],
  ["shell_replay_residual", "shell-influence-component"],
  ["boundary_to_central_residual", "central-acceleration-component"],
]));
const RESIDUAL_LABELS = Object.freeze([...RESIDUAL_DOMAINS.keys()]);
const BOUNDARY_MODES = new Set([
  "local-window",
  "statistical-boundary-shell",
  "display-only-preview",
]);
const REFERENCE_AUTHORITIES = new Set([
  "retained-local-evidence",
  "authoritative-solver-output",
  "executable_architecture_evidence",
  "canonical",
]);
const BOUNDARY_AUTHORITIES = new Set([
  "retained-local-evidence",
  "reduced-model-boundary",
  "boundary-generated-value",
  "authoritative-solver-output",
]);

export function validateBorgEomBoundaryDiagnosticsRequest(value, {
  runId,
  fieldSpeed,
  pathIds = [],
} = {}) {
  if (value == null) return null;
  if (value?.schema !== BORG_EOM_BOUNDARY_DIAGNOSTICS_REQUEST_SCHEMA ||
      !value.envelope || !value.partition ||
      !Array.isArray(value.timeBins) ||
      !Array.isArray(value.residualSpecs)) {
    throw new TypeError("Borg EOM boundary diagnostics request is malformed.");
  }

  const envelope = value.envelope;
  if (envelope.schema !== SHELL_ENVELOPE_SCHEMA ||
      !requiredString(envelope.envelopeId) ||
      !requiredString(envelope.extractionWindowId) ||
      !requiredString(envelope.centralObservationWindowId) ||
      !requiredString(envelope.comparisonSetId) ||
      !BOUNDARY_MODES.has(envelope.boundaryMode) ||
      typeof envelope.replayConsumesValues !== "boolean") {
    throw new TypeError("Borg EOM shell-envelope request is malformed.");
  }
  const center = requiredVector3(envelope.center, "shell-envelope center");
  const outerRadius = positiveFinite(envelope.outerRadius, "outerRadius");
  const centralBallRadius = positiveFinite(
    envelope.centralBallRadius,
    "centralBallRadius",
  );
  const radialBufferMargin = positiveFinite(
    envelope.radialBufferMargin,
    "radialBufferMargin",
  );
  const historyDepth = positiveFinite(envelope.historyDepth, "historyDepth");
  const wakeHorizon = positiveFinite(envelope.wakeHorizon, "wakeHorizon");
  nonnegativeFinite(envelope.wakeFloor, "wakeFloor");
  const extractionStart = finiteNumber(envelope.extractionStart, "extractionStart");
  const extractionEnd = finiteNumber(envelope.extractionEnd, "extractionEnd");
  const observationStart = finiteNumber(
    envelope.centralObservationStart,
    "centralObservationStart",
  );
  const observationEnd = finiteNumber(
    envelope.centralObservationEnd,
    "centralObservationEnd",
  );
  if (!(centralBallRadius < outerRadius) ||
      !nearlyEqual(radialBufferMargin, outerRadius - centralBallRadius) ||
      !(extractionEnd > extractionStart) ||
      !(observationEnd > observationStart) ||
      observationStart < extractionStart || observationEnd > extractionEnd) {
    throw new RangeError("Borg EOM shell-envelope geometry or windows are inconsistent.");
  }
  const numericFieldSpeed = positiveFinite(fieldSpeed, "fieldSpeed");
  if (!nearlyEqual(wakeHorizon, numericFieldSpeed * historyDepth)) {
    throw new RangeError("Borg EOM wakeHorizon must equal fieldSpeed times historyDepth.");
  }
  if (envelope.centralVelocityBound != null) {
    nonnegativeFinite(envelope.centralVelocityBound, "centralVelocityBound");
  }

  const partition = value.partition;
  if (partition.schema !== SHELL_PARTITION_SCHEMA ||
      String(partition.envelopeId) !== String(envelope.envelopeId) ||
      !requiredString(partition.surfacePartitionId) ||
      partition.policy !== "equal-area-zphi/v1" ||
      !positiveInteger(partition.zBandCount) ||
      !positiveInteger(partition.azimuthSectorCount)) {
    throw new TypeError("Borg EOM shell partition is malformed.");
  }
  const quaternion = requiredVector4(
    partition.orientationQuaternion,
    "shell-partition orientation quaternion",
  );
  const quaternionNorm = Math.sqrt(quaternion.reduce(
    (sum, component) => sum + component * component,
    0,
  ));
  if (!nearlyEqual(quaternionNorm, 1) ||
      nonnegativeFinite(partition.uncoveredAreaBound, "uncoveredAreaBound") !== 0) {
    throw new RangeError(
      "Borg EOM shell partition must have a unit orientation and zero uncovered area.",
    );
  }

  if (value.timeBins.length === 0 ||
      Number(envelope.timeBinCount) !== value.timeBins.length) {
    throw new Error("Borg EOM shell time-bin count is incomplete.");
  }
  let expectedStart = extractionStart;
  const timeBinIds = new Set();
  value.timeBins.forEach((bin, index) => {
    if (bin?.schema !== SHELL_TIME_BIN_SCHEMA ||
        String(bin.envelopeId) !== String(envelope.envelopeId) ||
        !requiredString(bin.timeBinId) || Number(bin.ordinal) !== index ||
        timeBinIds.has(String(bin.timeBinId))) {
      throw new TypeError("Borg EOM shell time bin is malformed or duplicated.");
    }
    const start = finiteNumber(bin.start, "shell time-bin start");
    const end = finiteNumber(bin.end, "shell time-bin end");
    if (!(end > start) || !nearlyEqual(start, expectedStart)) {
      throw new RangeError("Borg EOM shell time bins must be contiguous and ordered.");
    }
    expectedStart = end;
    timeBinIds.add(String(bin.timeBinId));
  });
  if (!nearlyEqual(expectedStart, extractionEnd)) {
    throw new RangeError("Borg EOM shell time bins do not cover the extraction window.");
  }

  validateReplaySource(value.replaySource ?? null, {
    replayConsumesValues: envelope.replayConsumesValues,
    runId,
  });

  if (Number(envelope.residualSpecCount) !== RESIDUAL_LABELS.length ||
      value.residualSpecs.length !== RESIDUAL_LABELS.length) {
    throw new Error("Borg EOM boundary diagnostics require exactly three residual specs.");
  }
  const pathIdSet = new Set(pathIds.map(String));
  const comparisonIds = new Set();
  value.residualSpecs.forEach((spec, specIndex) => {
    const expectedLabel = RESIDUAL_LABELS[specIndex];
    const expectedDomain = RESIDUAL_DOMAINS.get(expectedLabel);
    if (spec?.schema !== RESIDUAL_SPEC_SCHEMA ||
        String(spec.comparisonSetId) !== String(envelope.comparisonSetId) ||
        !requiredString(spec.comparisonId) ||
        comparisonIds.has(String(spec.comparisonId)) ||
        spec.residualLabel !== expectedLabel ||
        spec.sampleDomain !== expectedDomain ||
        !requiredString(spec.referenceRunId) ||
        String(spec.boundaryRunId) !== String(runId) ||
        String(spec.referenceRunId) === String(spec.boundaryRunId) ||
        !requiredString(spec.comparisonWindowId) ||
        spec.decisionNormId !== "relative-weighted-l2/v1" ||
        !REFERENCE_AUTHORITIES.has(spec.referenceValueAuthority) ||
        !BOUNDARY_AUTHORITIES.has(spec.boundaryValueAuthority) ||
        typeof spec.requiredForAdvancement !== "boolean" ||
        !Array.isArray(spec.samples)) {
      throw new TypeError(`Borg EOM residual spec ${expectedLabel} is malformed.`);
    }
    nonnegativeFinite(spec.tolerance, `${expectedLabel} tolerance`);
    positiveFinite(spec.epsilon0, `${expectedLabel} epsilon0`);
    if (!positiveInteger(spec.expectedSampleCount) ||
        Number(spec.expectedSampleCount) !== spec.samples.length) {
      throw new Error(`Borg EOM residual spec ${expectedLabel} has incomplete samples.`);
    }
    validateResidualSamples(spec, {
      comparisonSetId: envelope.comparisonSetId,
      observationStart,
      observationEnd,
      extractionStart,
      extractionEnd,
      pathIdSet,
      timeBinIds,
    });
    comparisonIds.add(String(spec.comparisonId));
  });
  return deepFreeze(structuredClone({ ...value, envelope: { ...envelope, center } }));
}

export function createBorgEomBoundaryDiagnosticsRecords(value, context = {}) {
  const request = validateBorgEomBoundaryDiagnosticsRequest(value, context);
  if (request == null) return Object.freeze([]);
  const envelope = request.envelope;
  const records = [
    [
      "BORG_SHELL_ENVELOPE",
      envelope.schema,
      envelope.envelopeId,
      ...envelope.center,
      envelope.outerRadius,
      envelope.centralBallRadius,
      envelope.radialBufferMargin,
      envelope.historyDepth,
      envelope.wakeHorizon,
      envelope.wakeFloor,
      envelope.boundaryMode,
      envelope.extractionWindowId,
      envelope.extractionStart,
      envelope.extractionEnd,
      envelope.centralObservationWindowId,
      envelope.centralObservationStart,
      envelope.centralObservationEnd,
      envelope.centralVelocityBound ?? "NONE",
      request.timeBins.length,
      request.residualSpecs.length,
      envelope.replayConsumesValues ? "1" : "0",
      envelope.comparisonSetId,
    ],
    [
      "BORG_SHELL_PARTITION",
      request.partition.schema,
      request.partition.envelopeId,
      request.partition.surfacePartitionId,
      request.partition.policy,
      request.partition.zBandCount,
      request.partition.azimuthSectorCount,
      ...request.partition.orientationQuaternion,
      request.partition.uncoveredAreaBound,
    ],
    ...request.timeBins.map((bin) => [
      "BORG_SHELL_TIME_BIN",
      bin.schema,
      bin.envelopeId,
      bin.timeBinId,
      bin.ordinal,
      bin.start,
      bin.end,
    ]),
  ];
  if (request.replaySource != null) {
    const source = request.replaySource;
    records.push([
      "BORG_REPLAY_SOURCE",
      source.schema,
      source.replaySourceId,
      source.summarySetId,
      source.targetRunId,
      source.samplingSeed,
      source.surfaceMappingPolicy,
      source.timeMapping,
      source.velocitySamplingResultId,
      source.polaritySamplingPolicy,
      source.historyHidingPolicy,
      source.wakeReconstructionPolicy,
      source.valueAuthority,
    ]);
  }
  request.residualSpecs.forEach((spec) => records.push([
    "BORG_RESIDUAL_SPEC",
    spec.schema,
    spec.comparisonSetId,
    spec.comparisonId,
    spec.residualLabel,
    spec.sampleDomain,
    spec.referenceRunId,
    spec.boundaryRunId,
    spec.comparisonWindowId,
    spec.decisionNormId,
    spec.tolerance,
    spec.epsilon0,
    spec.expectedSampleCount,
    spec.referenceValueAuthority,
    spec.boundaryValueAuthority,
    spec.requiredForAdvancement ? "1" : "0",
  ]));
  request.residualSpecs.forEach((spec) => spec.samples.forEach((sample) => {
    records.push([
      "BORG_RESIDUAL_SAMPLE",
      sample.schema,
      sample.comparisonSetId,
      sample.comparisonId,
      sample.sampleId,
      sample.ordinal,
      sample.entityId,
      sample.surfacePatchId ?? "NONE",
      sample.timeBinId ?? "NONE",
      sample.receiverPathId ?? "NONE",
      sample.sampleTime ?? "NONE",
      sample.componentId,
      sample.reference.lower,
      sample.reference.upper,
      sample.boundary.lower,
      sample.boundary.upper,
      sample.weight.lower,
      sample.weight.upper,
      sample.reference.sourceRowId,
      sample.boundary.sourceRowId,
    ]);
  }));
  return deepFreeze(records);
}

export function validateBorgEomWakeBoundaryProducts(value, {
  runId,
  acceptedEndTime,
  pathIds = [],
  boundaryDiagnostics = null,
} = {}) {
  if (value?.schema !== BORG_EOM_WAKE_BOUNDARY_PRODUCTS_SCHEMA ||
      !["native-products-ready", "fail-closed"].includes(value.status) ||
      String(value.runId) !== String(runId) ||
      !Array.isArray(value.pathHistoryRows) ||
      !Array.isArray(value.resolvedWakeInteractionRows) ||
      !Array.isArray(value.failureWakeRows) ||
      !Array.isArray(value.accelerationContributionRows)) {
    throw new TypeError("Borg EOM wake/boundary products are malformed.");
  }
  if (value.sourceSnapshotReceptionTime != null &&
      String(value.sourceSnapshotReceptionTime) !== String(acceptedEndTime)) {
    throw new Error(
      "Borg EOM wake/boundary products do not bind the accepted final snapshot.",
    );
  }
  if (!Array.isArray(pathIds) || value.pathHistoryRows.length !== pathIds.length ||
      value.pathHistoryRows.some((row, index) =>
        row?.schema !== "eom_borg_retained_path_history/v1" ||
        String(row.pathId) !== String(pathIds[index]) ||
        String(row.coverageEnd) !== String(acceptedEndTime) ||
        !row.historyId || !row.historyFingerprint ||
        !Number.isSafeInteger(Number(row.segmentCount)) ||
        Number(row.segmentCount) <= 0)) {
    throw new Error("Borg EOM retained path-history product is incomplete.");
  }
  const pathIdSet = new Set(pathIds.map(String));
  const accelerationContributionIds = validateWakeRows(value, pathIdSet);
  validateBoundaryProducts(value.boundaryShell, {
    pathIdSet,
    boundaryDiagnostics,
    accelerationContributionIds,
  });
  validateResidualDecisions(value.residualDecisions, boundaryDiagnostics);
  return deepFreeze(structuredClone(value));
}

function validateWakeRows(value, pathIdSet) {
  const counts = value.rowConservationCounts;
  const integerFields = [
    "candidateWakeRowCount",
    "resolvedWakeRowCount",
    "aggregatedWakeRowCount",
    "boundaryGeneratedWakeRowCount",
    "failureWakeRowCount",
    "conservationResidual",
  ];
  if (!counts || integerFields.some((field) =>
    !Number.isSafeInteger(Number(counts[field]))) ||
      Number(counts.resolvedWakeRowCount) !==
        value.resolvedWakeInteractionRows.length ||
      Number(counts.failureWakeRowCount) !== value.failureWakeRows.length) {
    throw new Error("Borg EOM wake-row counts do not match their row domains.");
  }
  const classified = Number(counts.resolvedWakeRowCount) +
    Number(counts.aggregatedWakeRowCount) +
    Number(counts.boundaryGeneratedWakeRowCount) +
    Number(counts.failureWakeRowCount);
  const residual = Number(counts.candidateWakeRowCount) - classified;
  if (residual !== Number(counts.conservationResidual) ||
      residual !== 0 || value.rowConservationStatus !== "passed") {
    throw new Error("Borg EOM wake-row conservation failed closed.");
  }
  const resolvedRows = new Map(value.resolvedWakeInteractionRows.map((row) => {
    requirePairRow(row, "eom_borg_retained_wake_interaction/v1");
    if (!row.rootCertificateRowId ||
        !pathIdSet.has(String(row.receiverPathId)) ||
        !pathIdSet.has(String(row.transmitterPathId))) {
      throw new TypeError("Borg EOM wake row lacks its causal-root certificate identity.");
    }
    return [String(row.rowId), row];
  }));
  value.failureWakeRows.forEach((row) => {
    requirePairRow(row, "eom_borg_wake_failure/v1");
    if (row.valueAuthority !== "fail-closed-value" || !row.firstFailureCode ||
        !pathIdSet.has(String(row.receiverPathId)) ||
        !pathIdSet.has(String(row.transmitterPathId))) {
      throw new Error("Borg EOM wake failure row lacks fail-closed authority.");
    }
  });
  value.accelerationContributionRows.forEach((row) => {
    requirePairRow(row, "eom_borg_acceleration_contribution/v1");
    const wakeRow = resolvedRows.get(String(row.rowId));
    if (!wakeRow ||
        String(row.rootCertificateRowId) !== String(wakeRow.rootCertificateRowId) ||
        !Array.isArray(row.acceleration) || row.acceleration.length !== 3) {
      throw new Error(
        "Borg EOM acceleration contribution is not bound to a resolved wake row.",
      );
    }
    row.acceleration.forEach(requireInterval);
  });
  return new Set(value.accelerationContributionRows.map((row) => String(row.rowId)));
}

function validateBoundaryProducts(boundary, {
  pathIdSet,
  boundaryDiagnostics,
  accelerationContributionIds,
}) {
  if (boundary?.schema !== "eom_borg_boundary_shell_products/v1" ||
      !Array.isArray(boundary.shellCrossingRows) ||
      !Array.isArray(boundary.coverageRows) ||
      !Array.isArray(boundary.shellInfluenceRows) ||
      !Array.isArray(boundary.replaySourceRows)) {
    throw new TypeError("Borg EOM boundary-shell product is malformed.");
  }
  if (boundary.coverageStatus !== "boundary-shell-complete") {
    if (boundary.valueAuthority !== "fail-closed-value" ||
        !boundary.firstFailureCode ||
        boundary.shellInfluenceRows.length !== 0 ||
        boundary.replaySourceRows.length !== 0) {
      throw new Error("Incomplete Borg boundary-shell coverage did not fail closed.");
    }
    return;
  }
  const request = boundaryDiagnostics;
  if (!request) {
    throw new Error("Complete Borg boundary-shell output lacks its request binding.");
  }
  const expectedCoverageIds = new Set();
  const zBands = Number(request.partition.zBandCount);
  const sectors = Number(request.partition.azimuthSectorCount);
  request.timeBins.forEach((bin) => {
    for (let z = 0; z < zBands; ++z) {
      for (let phi = 0; phi < sectors; ++phi) {
        expectedCoverageIds.add([
          "coverage",
          request.partition.surfacePartitionId,
          `z${z}`,
          `phi${phi}`,
          bin.timeBinId,
        ].join(":"));
      }
    }
  });
  const actualCoverageIds = new Set();
  boundary.coverageRows.forEach((row) => {
    if (row?.schema !== "eom_borg_shell_patch_time_coverage/v1" ||
        !requiredString(row.rowId) ||
        !requiredString(row.surfacePatchId) ||
        !requiredString(row.timeBinId) ||
        !Array.isArray(row.crossingEventIds) ||
        !["accepted", "certified-empty"].includes(row.status) ||
        (row.status === "accepted" && row.crossingEventIds.length === 0) ||
        (row.status === "certified-empty" && row.crossingEventIds.length !== 0) ||
        actualCoverageIds.has(String(row.rowId))) {
      throw new Error("Borg EOM boundary-shell coverage row is malformed.");
    }
    actualCoverageIds.add(String(row.rowId));
  });
  if (expectedCoverageIds.size !== actualCoverageIds.size ||
      [...expectedCoverageIds].some((id) => !actualCoverageIds.has(id))) {
    throw new Error("Borg EOM boundary-shell coverage domain is incomplete.");
  }
  const crossingIds = new Set();
  boundary.shellCrossingRows.forEach((row) => {
    if (row?.schema !== "eom_borg_shell_crossing/v1" ||
        !requiredString(row.rowId) || !pathIdSet.has(String(row.pathId)) ||
        !Number.isSafeInteger(Number(row.segmentIndex)) ||
        !Number.isFinite(Number(row.segmentStart)) ||
        !Number.isFinite(Number(row.segmentEnd)) ||
        !["outbound", "inbound"].includes(row.direction) ||
        !requiredString(row.surfacePatchId) || !requiredString(row.timeBinId)) {
      throw new Error("Borg EOM shell-crossing row is malformed or unresolved.");
    }
    requireInterval(row.crossingTime);
    if (crossingIds.has(String(row.rowId))) {
      throw new Error("Borg EOM shell-crossing row identity is duplicated.");
    }
    crossingIds.add(String(row.rowId));
  });
  const coveredCrossingIds = boundary.coverageRows.flatMap(
    (row) => row.crossingEventIds.map(String),
  );
  if (coveredCrossingIds.length !== crossingIds.size ||
      new Set(coveredCrossingIds).size !== crossingIds.size ||
      coveredCrossingIds.some((id) => !crossingIds.has(id))) {
    throw new Error("Borg EOM shell crossings are not covered exactly once.");
  }
  const coverageCounts = boundary.coverageCounts;
  const countFields = [
    "segmentCount",
    "certifiedEmptySegmentCount",
    "crossingSegmentCount",
    "unresolvedSegmentCount",
    "patchTimeCellCount",
  ];
  if (!coverageCounts || countFields.some((field) =>
    !Number.isSafeInteger(Number(coverageCounts[field])) ||
    Number(coverageCounts[field]) < 0) ||
      Number(coverageCounts.patchTimeCellCount) !== expectedCoverageIds.size ||
      Number(coverageCounts.crossingSegmentCount) !== crossingIds.size ||
      Number(coverageCounts.unresolvedSegmentCount) !== 0 ||
      Number(coverageCounts.segmentCount) !==
        Number(coverageCounts.certifiedEmptySegmentCount) +
        Number(coverageCounts.crossingSegmentCount)) {
    throw new Error("Borg EOM boundary-shell segment coverage is not conserved.");
  }
  if (request.envelope.replayConsumesValues) {
    if (boundary.shellInfluenceRows.length !== crossingIds.size ||
        boundary.replaySourceRows.length === 0) {
      throw new Error("Replay-consuming Borg output lacks influence or replay rows.");
    }
    boundary.shellInfluenceRows.forEach((row) => {
      if (row?.schema !== "borg-boundary-shell-influence-model.v1" ||
          !requiredString(row.rowId) ||
          !crossingIds.has(String(row.shellCrossingEventId)) ||
          !pathIdSet.has(String(row.sourcePathId)) ||
          !requiredString(row.interactionKernelId) ||
          !Array.isArray(row.accelerationContributionRowIds) ||
          row.accelerationContributionRowIds.length === 0 ||
          row.accelerationContributionRowIds.some((id) =>
            !requiredString(id) || !accelerationContributionIds.has(String(id))) ||
          row.mappingStatus !== "path-derived-ready" ||
          row.valueAuthority !== "retained-local-evidence") {
        throw new Error("Borg EOM shell-influence row lacks path-derived authority.");
      }
    });
    boundary.replaySourceRows.forEach((row) => {
      if (row?.schema !== "borg-boundary-shell-replay-source.v1" ||
          String(row.replaySourceId) !== String(request.replaySource.replaySourceId) ||
          String(row.targetRunId) !== String(request.replaySource.targetRunId) ||
          !["reduced-model-boundary", "fail-closed-value"].includes(
            row.valueAuthority,
          )) {
        throw new Error("Borg EOM replay-source row is not bound to the request.");
      }
    });
  }
}

function validateResidualDecisions(rows, boundaryDiagnostics) {
  if (!Array.isArray(rows) || rows.length !== RESIDUAL_LABELS.length) {
    throw new Error("Borg EOM residual-decision domain is incomplete.");
  }
  RESIDUAL_LABELS.forEach((label, index) => {
    const row = rows[index];
    if (row?.schema !== "eom_borg_residual_decision/v1" ||
        row.residualLabel !== label ||
        !["passed", "failed", "not-measured", "fail-closed"].includes(row.status)) {
      throw new Error("Borg EOM residual-decision domain is incomplete.");
    }
    const spec = boundaryDiagnostics?.residualSpecs?.[index] ?? null;
    if (spec && (String(row.comparisonId) !== String(spec.comparisonId) ||
        Number(row.tolerance) !== Number(spec.tolerance))) {
      throw new Error("Borg EOM residual decision is not bound to its request spec.");
    }
    if (row.status === "passed") {
      requireInterval(row.residualInterval);
      if (Number(row.residualInterval.upper) > Number(row.tolerance) ||
          row.firstFailureCode != null) {
        throw new Error("Borg EOM passing residual exceeds its declared tolerance.");
      }
    } else if (row.valueAuthority !== "fail-closed-value" ||
        !requiredString(row.firstFailureCode)) {
      throw new Error("Borg EOM non-passing residual did not fail closed.");
    }
  });
}

function validateReplaySource(source, { replayConsumesValues, runId }) {
  if (!replayConsumesValues) {
    if (source != null) {
      throw new Error("Borg EOM replay source is forbidden when replay is not consumed.");
    }
    return;
  }
  const fields = [
    "replaySourceId",
    "summarySetId",
    "samplingSeed",
    "surfaceMappingPolicy",
    "timeMapping",
    "velocitySamplingResultId",
    "polaritySamplingPolicy",
    "historyHidingPolicy",
    "wakeReconstructionPolicy",
  ];
  if (source?.schema !== REPLAY_SOURCE_SCHEMA ||
      fields.some((field) => !requiredString(source[field])) ||
      String(source.targetRunId) !== String(runId) ||
      source.valueAuthority !== "reduced-model-boundary") {
    throw new TypeError("Borg EOM replay source is malformed or unbound.");
  }
}

function validateResidualSamples(spec, context) {
  const sampleIds = new Set();
  const sourcePairs = new Set();
  spec.samples.forEach((sample, index) => {
    if (sample?.schema !== RESIDUAL_SAMPLE_SCHEMA ||
        String(sample.comparisonSetId) !== String(context.comparisonSetId) ||
        String(sample.comparisonId) !== String(spec.comparisonId) ||
        !requiredString(sample.sampleId) || Number(sample.ordinal) !== index ||
        !requiredString(sample.entityId) || !requiredString(sample.componentId) ||
        !requiredString(sample.reference?.sourceRowId) ||
        !requiredString(sample.boundary?.sourceRowId) ||
        sampleIds.has(String(sample.sampleId))) {
      throw new TypeError(`Borg EOM residual sample ${index} is malformed or duplicated.`);
    }
    requireInterval(sample.reference);
    requireInterval(sample.boundary);
    requireInterval(sample.weight);
    if (!(Number(sample.weight.lower) > 0)) {
      throw new RangeError("Borg EOM residual sample weight must be strictly positive.");
    }
    const sourcePair = `${sample.reference.sourceRowId}\u0000${sample.boundary.sourceRowId}`;
    if (sourcePairs.has(sourcePair)) {
      throw new Error("Borg EOM residual sample source pair is duplicated.");
    }
    sourcePairs.add(sourcePair);
    if (spec.sampleDomain === "shell-statistic-component") {
      requireShellDomain(sample, context, false);
      if (sample.receiverPathId != null || sample.sampleTime != null) {
        throw new Error("Shell-statistic samples cannot carry receiver-event fields.");
      }
    } else if (spec.sampleDomain === "shell-influence-component") {
      requireShellDomain(sample, context, true);
      if (sample.receiverPathId != null) {
        throw new Error("Shell-influence samples cannot carry receiver identities.");
      }
    } else {
      if (!context.pathIdSet.has(String(sample.receiverPathId)) ||
          sample.surfacePatchId != null || sample.timeBinId != null) {
        throw new Error("Central residual sample has the wrong receiver domain.");
      }
      const time = finiteNumber(sample.sampleTime, "central residual sample time");
      if (time < context.observationStart || time > context.observationEnd) {
        throw new RangeError("Central residual sample lies outside its observation window.");
      }
    }
    sampleIds.add(String(sample.sampleId));
  });
}

function requireShellDomain(sample, context, requiresTime) {
  if (!requiredString(sample.surfacePatchId) ||
      !context.timeBinIds.has(String(sample.timeBinId))) {
    throw new Error("Shell residual sample lacks its patch/time-bin domain.");
  }
  if (requiresTime) {
    const time = finiteNumber(sample.sampleTime, "shell residual sample time");
    if (time < context.extractionStart || time > context.extractionEnd) {
      throw new RangeError("Shell residual sample lies outside its extraction window.");
    }
  }
}

function requirePairRow(row, schema) {
  if (row?.schema !== schema || !row.rowId || !row.receiverPathId ||
      !row.transmitterPathId) {
    throw new TypeError(`Borg EOM ${schema} row is malformed.`);
  }
}

function requireInterval(value) {
  const lower = Number(value?.lower);
  const upper = Number(value?.upper);
  if (!Number.isFinite(lower) || !Number.isFinite(upper) || lower > upper) {
    throw new TypeError("Borg EOM interval is malformed.");
  }
}

function requiredString(value) {
  return typeof value === "string" && value.length > 0 &&
    !/[\t\r\n]/u.test(value);
}

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new TypeError(`Borg EOM ${label} must be finite.`);
  }
  return number;
}

function positiveFinite(value, label) {
  const number = finiteNumber(value, label);
  if (!(number > 0)) throw new RangeError(`Borg EOM ${label} must be positive.`);
  return number;
}

function nonnegativeFinite(value, label) {
  const number = finiteNumber(value, label);
  if (number < 0) throw new RangeError(`Borg EOM ${label} must be nonnegative.`);
  return number;
}

function positiveInteger(value) {
  const number = Number(value);
  return Number.isSafeInteger(number) && number > 0;
}

function requiredVector3(value, label) {
  const vector = Array.isArray(value)
    ? value
    : [value?.x, value?.y, value?.z];
  if (vector.length !== 3) throw new TypeError(`Borg EOM ${label} must have three axes.`);
  return vector.map((component) => finiteNumber(component, label));
}

function requiredVector4(value, label) {
  if (!Array.isArray(value) || value.length !== 4) {
    throw new TypeError(`Borg EOM ${label} must have four components.`);
  }
  return value.map((component) => finiteNumber(component, label));
}

function nearlyEqual(left, right) {
  const scale = Math.max(1, Math.abs(left), Math.abs(right));
  return Math.abs(left - right) <= Number.EPSILON * scale * 16;
}

function deepFreeze(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    Object.values(value).forEach(deepFreeze);
  }
  return value;
}

import assert from "node:assert/strict";
import test from "node:test";

import {
  BORG_NATIVE_EOM_PROCESS_CLIENT_VERSION,
  BORG_NATIVE_EOM_PROTOCOL_MAGIC,
  encodeNativeRequest,
} from "../scripts/eom/BorgNativeEomProcessClient.mjs";
import { BORG_DATASET_MANIFEST_V1 } from "../src/apps/borg/BorgAppManifest.js";
import {
  createBorgEomShadowRequest,
  createBorgEomShadowRunConfig,
} from "../src/apps/borg/BorgEomShadowRunner.js";
import {
  createBorgEomBoundaryDiagnosticsRecords,
  validateBorgEomBoundaryDiagnosticsRequest,
  validateBorgEomWakeBoundaryProducts,
} from "../src/apps/borg/BorgEomWakeBoundaryProducts.js";

const LABELS = [
  ["shell_self_similarity", "shell-statistic-component", "0.05"],
  ["shell_replay_residual", "shell-influence-component", "0.01"],
  ["boundary_to_central_residual", "central-acceleration-component", "0.001"],
];

function boundaryDiagnostics({ replayConsumesValues = true } = {}) {
  const comparisonSetId = "comparison-set-1";
  const surfacePatchId = "partition-1:z0:phi0";
  return {
    schema: "eom_borg_boundary_diagnostics_request/v1",
    envelope: {
      schema: "eom_borg_shell_extraction_request/v1",
      envelopeId: "envelope-1",
      center: ["0", "0", "0"],
      outerRadius: "0.5",
      centralBallRadius: "0.25",
      radialBufferMargin: "0.25",
      historyDepth: "10",
      wakeHorizon: "10",
      wakeFloor: "0",
      boundaryMode: "statistical-boundary-shell",
      extractionWindowId: "extraction-window-1",
      extractionStart: "-10",
      extractionEnd: "0.1",
      centralObservationWindowId: "central-window-1",
      centralObservationStart: "0",
      centralObservationEnd: "0.1",
      centralVelocityBound: "0.01",
      timeBinCount: 1,
      residualSpecCount: 3,
      replayConsumesValues,
      comparisonSetId,
    },
    partition: {
      schema: "eom_borg_shell_partition/v1",
      envelopeId: "envelope-1",
      surfacePartitionId: "partition-1",
      policy: "equal-area-zphi/v1",
      zBandCount: 1,
      azimuthSectorCount: 1,
      orientationQuaternion: ["1", "0", "0", "0"],
      uncoveredAreaBound: "0",
    },
    timeBins: [{
      schema: "eom_borg_shell_time_bin/v1",
      envelopeId: "envelope-1",
      timeBinId: "bin-0",
      ordinal: 0,
      start: "-10",
      end: "0.1",
    }],
    replaySource: replayConsumesValues ? {
      schema: "eom_borg_boundary_shell_replay_source/v1",
      replaySourceId: "replay-source-1",
      summarySetId: "summary-set-1",
      targetRunId: "run-1",
      samplingSeed: "seed-1",
      surfaceMappingPolicy: "observed-zphi-rotation/v1",
      timeMapping: "observed-bin-resample/v1",
      velocitySamplingResultId: "velocity-result-1",
      polaritySamplingPolicy: "preserve-observed-inventory/v1",
      historyHidingPolicy: "new-inbound-identities/v1",
      wakeReconstructionPolicy: "path-index-reconstruction/v1",
      valueAuthority: "reduced-model-boundary",
    } : null,
    residualSpecs: LABELS.map(([residualLabel, sampleDomain, tolerance], index) => {
      const shellDomain = index < 2;
      const sampleTime = index === 0 ? null : "0.05";
      return {
        schema: "eom_borg_residual_spec/v1",
        comparisonSetId,
        comparisonId: `comparison-${index}`,
        residualLabel,
        sampleDomain,
        referenceRunId: `reference-run-${index}`,
        boundaryRunId: "run-1",
        comparisonWindowId: index === 2 ? "central-window-1" : "extraction-window-1",
        decisionNormId: "relative-weighted-l2/v1",
        tolerance,
        epsilon0: "1e-12",
        expectedSampleCount: 1,
        referenceValueAuthority: "authoritative-solver-output",
        boundaryValueAuthority: "reduced-model-boundary",
        requiredForAdvancement: true,
        samples: [{
          schema: "eom_borg_paired_residual_sample/v1",
          comparisonSetId,
          comparisonId: `comparison-${index}`,
          sampleId: `sample-${index}`,
          ordinal: 0,
          entityId: shellDomain ? `shell-entity-${index}` : "central-event-a",
          surfacePatchId: shellDomain ? surfacePatchId : null,
          timeBinId: shellDomain ? "bin-0" : null,
          receiverPathId: shellDomain ? null : "a",
          sampleTime,
          componentId: index === 0 ? "outbound-count" : "x",
          reference: {
            lower: "1",
            upper: "1",
            sourceRowId: `reference-row-${index}`,
          },
          boundary: {
            lower: "1",
            upper: "1",
            sourceRowId: `boundary-row-${index}`,
          },
          weight: { lower: "1", upper: "1" },
        }],
      };
    }),
  };
}

function validProducts() {
  return {
    schema: "eom_borg_wake_boundary_products/v1",
    status: "native-products-ready",
    runId: "run-1",
    sourceSnapshotReceptionTime: "0.1",
    valueAuthority: "executable_architecture_evidence",
    pathHistoryRows: ["a", "b"].map((pathId) => ({
      schema: "eom_borg_retained_path_history/v1",
      pathId,
      historyId: `history:${pathId}`,
      historyFingerprint: `fingerprint:${pathId}`,
      coverageStart: "-10",
      coverageEnd: "0.1",
      segmentCount: 2,
      valueAuthority: "retained-local-evidence",
    })),
    resolvedWakeInteractionRows: [{
      schema: "eom_borg_retained_wake_interaction/v1",
      rowId: "pair:0/root:0",
      receiverPathId: "a",
      transmitterPathId: "b",
      rootCertificateRowId: "root:pair:0",
    }],
    failureWakeRows: [],
    rowConservationCounts: {
      candidateWakeRowCount: 1,
      resolvedWakeRowCount: 1,
      aggregatedWakeRowCount: 0,
      boundaryGeneratedWakeRowCount: 0,
      failureWakeRowCount: 0,
      conservationResidual: 0,
      firstFailureCode: null,
    },
    rowConservationStatus: "passed",
    accelerationContributionRows: [{
      schema: "eom_borg_acceleration_contribution/v1",
      rowId: "pair:0/root:0",
      receiverPathId: "a",
      transmitterPathId: "b",
      rootCertificateRowId: "root:pair:0",
      acceleration: [
        { lower: "-1", upper: "0" },
        { lower: "0", upper: "1" },
        { lower: "0", upper: "0" },
      ],
    }],
    boundaryShell: {
      schema: "eom_borg_boundary_shell_products/v1",
      shellCrossingRows: [],
      coverageRows: [],
      coverageStatus: "fail-closed",
      shellInfluenceRows: [],
      replaySourceRows: [],
      firstFailureCode: "missing_boundary_shell_crossing_coverage",
      valueAuthority: "fail-closed-value",
    },
    residualDecisions: LABELS.map(([residualLabel]) => ({
      schema: "eom_borg_residual_decision/v1",
      residualLabel,
      status: "not-measured",
      firstFailureCode: "required_residual_unmeasured",
      valueAuthority: "fail-closed-value",
    })),
  };
}

function completedBoundaryProducts() {
  const products = validProducts();
  products.boundaryShell = {
    schema: "eom_borg_boundary_shell_products/v1",
    shellCrossingRows: [{
      schema: "eom_borg_shell_crossing/v1",
      rowId: "crossing-1",
      pathId: "a",
      segmentIndex: 0,
      segmentStart: "0",
      segmentEnd: "0.1",
      surfacePatchId: "partition-1:z0:phi0",
      timeBinId: "bin-0",
      direction: "outbound",
      crossingTime: { lower: "0.05", upper: "0.05" },
    }],
    coverageRows: [{
      schema: "eom_borg_shell_patch_time_coverage/v1",
      rowId: "coverage:partition-1:z0:phi0:bin-0",
      surfacePatchId: "partition-1:z0:phi0",
      timeBinId: "bin-0",
      crossingEventIds: ["crossing-1"],
      status: "accepted",
    }],
    coverageCounts: {
      segmentCount: 1,
      certifiedEmptySegmentCount: 0,
      crossingSegmentCount: 1,
      unresolvedSegmentCount: 0,
      patchTimeCellCount: 1,
    },
    coverageStatus: "boundary-shell-complete",
    shellInfluenceRows: [{
      schema: "borg-boundary-shell-influence-model.v1",
      rowId: "influence-1",
      shellCrossingEventId: "crossing-1",
      sourcePathId: "a",
      interactionKernelId: "eom-master-equation-acceleration/v1",
      accelerationContributionRowIds: ["pair:0/root:0"],
      mappingStatus: "path-derived-ready",
      valueAuthority: "retained-local-evidence",
    }],
    replaySourceRows: [{
      schema: "borg-boundary-shell-replay-source.v1",
      replaySourceId: "replay-source-1",
      targetRunId: "run-1",
      valueAuthority: "reduced-model-boundary",
    }],
    firstFailureCode: null,
    valueAuthority: "reduced-model-boundary",
  };
  products.residualDecisions = LABELS.map(([residualLabel, , tolerance], index) => ({
    schema: "eom_borg_residual_decision/v1",
    comparisonId: `comparison-${index}`,
    residualLabel,
    residualInterval: { lower: "0", upper: "0" },
    residualValue: "0",
    tolerance,
    status: "passed",
    firstFailureCode: null,
    valueAuthority: "reduced-model-boundary",
  }));
  return products;
}

function retainedHistory(pathId) {
  return {
    pathId,
    pathKey: pathId,
    charge: pathId === "a" ? "1" : "-1",
    stateFlags: 0,
    coverageStart: "-10",
    coverageEnd: "0",
    sourceAcceptedInitialDatum: true,
    sourceIsEomOutput: false,
    segments: [{
      startTime: "-10",
      endTime: "0",
      coefficients: [
        ["0", "0", "0", "0"],
        ["0", "0", "0", "0"],
        ["0", "0", "0", "0"],
      ],
      positionErrors: ["0", "0", "0"],
      velocityErrors: ["0", "0", "0"],
    }],
  };
}

test("V11 request validator and encoder emit typed records before END", () => {
  const diagnostics = boundaryDiagnostics();
  const validated = validateBorgEomBoundaryDiagnosticsRequest(diagnostics, {
    runId: "run-1",
    fieldSpeed: "1",
    pathIds: ["a", "b"],
  });
  assert.equal(Object.isFrozen(validated), true);
  const records = createBorgEomBoundaryDiagnosticsRecords(diagnostics, {
    runId: "run-1",
    fieldSpeed: "1",
    pathIds: ["a", "b"],
  });
  assert.deepEqual(records.map((record) => record[0]), [
    "BORG_SHELL_ENVELOPE",
    "BORG_SHELL_PARTITION",
    "BORG_SHELL_TIME_BIN",
    "BORG_REPLAY_SOURCE",
    "BORG_RESIDUAL_SPEC",
    "BORG_RESIDUAL_SPEC",
    "BORG_RESIDUAL_SPEC",
    "BORG_RESIDUAL_SAMPLE",
    "BORG_RESIDUAL_SAMPLE",
    "BORG_RESIDUAL_SAMPLE",
  ]);
  assert.equal(records[0].length, 24);
  assert.equal(records[1].length, 12);
  assert.equal(records[3].length, 13);
  assert.equal(records[4].length, 16);
  assert.equal(records.at(-1).length, 20);

  const config = createBorgEomShadowRunConfig(BORG_DATASET_MANIFEST_V1, {
    runId: "run-1",
    pathCount: 2,
    startTime: 0,
    targetDuration: 0.1,
    chunkDuration: 0.1,
    boundaryDiagnostics: diagnostics,
  });
  const request = createBorgEomShadowRequest({
    manifest: BORG_DATASET_MANIFEST_V1,
    config,
    histories: [retainedHistory("a"), retainedHistory("b")],
    chunkIndex: 0,
    startTime: 0,
    endTime: 0.1,
    startTimeToken: "0",
    endTimeToken: "0.1",
  });
  const wire = encodeNativeRequest(request);
  assert.equal(BORG_NATIVE_EOM_PROCESS_CLIENT_VERSION, "borg-native-eom-process-client.v11");
  assert.equal(BORG_NATIVE_EOM_PROTOCOL_MAGIC, "EOM_BORG_NATIVE_V11");
  assert.equal(wire.startsWith("EOM_BORG_NATIVE_V11\nRUN\t"), true);
  assert.equal(wire.indexOf("\nBORG_SHELL_ENVELOPE\t") > wire.indexOf("\nSEG\t"), true);
  assert.equal(wire.indexOf("\nBORG_RESIDUAL_SPEC\t") < wire.indexOf("\nBORG_RESIDUAL_SAMPLE\t"), true);
  assert.equal(wire.endsWith("\nEND\n"), true);
});

test("request validation rejects unbound replay and incomplete comparisons", () => {
  const unbound = boundaryDiagnostics();
  unbound.replaySource.targetRunId = "foreign-run";
  assert.throws(() => validateBorgEomBoundaryDiagnosticsRequest(unbound, {
    runId: "run-1",
    fieldSpeed: 1,
    pathIds: ["a", "b"],
  }), /replay source is malformed or unbound/);

  const incomplete = boundaryDiagnostics();
  incomplete.residualSpecs[1].samples = [];
  assert.throws(() => validateBorgEomBoundaryDiagnosticsRequest(incomplete, {
    runId: "run-1",
    fieldSpeed: 1,
    pathIds: ["a", "b"],
  }), /incomplete samples/);
});

test("Borg accepts conserved local rows while absent shell evidence fails closed", () => {
  const products = validateBorgEomWakeBoundaryProducts(validProducts(), {
    runId: "run-1",
    acceptedEndTime: "0.1",
    pathIds: ["a", "b"],
  });
  assert.equal(products.rowConservationStatus, "passed");
  assert.equal(products.boundaryShell.valueAuthority, "fail-closed-value");
  assert.equal(Object.isFrozen(products.residualDecisions), true);
});

test("Borg accepts a complete patch-by-time replay and paired residual domain", () => {
  const request = validateBorgEomBoundaryDiagnosticsRequest(boundaryDiagnostics(), {
    runId: "run-1",
    fieldSpeed: 1,
    pathIds: ["a", "b"],
  });
  const products = validateBorgEomWakeBoundaryProducts(completedBoundaryProducts(), {
    runId: "run-1",
    acceptedEndTime: "0.1",
    pathIds: ["a", "b"],
    boundaryDiagnostics: request,
  });
  assert.equal(products.boundaryShell.coverageStatus, "boundary-shell-complete");
  assert.equal(products.residualDecisions.every((row) => row.status === "passed"), true);
});

test("complete boundary status rejects missing coverage or replay domains", () => {
  const request = validateBorgEomBoundaryDiagnosticsRequest(boundaryDiagnostics(), {
    runId: "run-1",
    fieldSpeed: 1,
    pathIds: ["a", "b"],
  });
  const missingCoverage = completedBoundaryProducts();
  missingCoverage.boundaryShell.coverageRows = [];
  assert.throws(() => validateBorgEomWakeBoundaryProducts(missingCoverage, {
    runId: "run-1",
    acceptedEndTime: "0.1",
    pathIds: ["a", "b"],
    boundaryDiagnostics: request,
  }), /coverage domain is incomplete/);

  const missingInfluence = completedBoundaryProducts();
  missingInfluence.boundaryShell.shellInfluenceRows = [];
  assert.throws(() => validateBorgEomWakeBoundaryProducts(missingInfluence, {
    runId: "run-1",
    acceptedEndTime: "0.1",
    pathIds: ["a", "b"],
    boundaryDiagnostics: request,
  }), /lacks influence or replay rows/);
});

test("a complete shell domain preserves a native non-passing residual fail closed", () => {
  const request = validateBorgEomBoundaryDiagnosticsRequest(boundaryDiagnostics(), {
    runId: "run-1",
    fieldSpeed: 1,
    pathIds: ["a", "b"],
  });
  const products = completedBoundaryProducts();
  products.boundaryShell.valueAuthority = "fail-closed-value";
  products.boundaryShell.replaySourceRows[0].valueAuthority = "fail-closed-value";
  products.residualDecisions[1] = {
    ...products.residualDecisions[1],
    residualInterval: { lower: "0.02", upper: "0.03" },
    residualValue: "0.03",
    status: "failed",
    firstFailureCode: "residual_tolerance_exceeded",
    valueAuthority: "fail-closed-value",
  };
  const validated = validateBorgEomWakeBoundaryProducts(products, {
    runId: "run-1",
    acceptedEndTime: "0.1",
    pathIds: ["a", "b"],
    boundaryDiagnostics: request,
  });
  assert.equal(validated.residualDecisions[1].status, "failed");
  assert.equal(validated.boundaryShell.valueAuthority, "fail-closed-value");
});

test("Borg rejects silent wake loss and detached acceleration rows", () => {
  const lost = validProducts();
  lost.rowConservationCounts.candidateWakeRowCount = 2;
  assert.throws(() => validateBorgEomWakeBoundaryProducts(lost, {
    runId: "run-1",
    acceptedEndTime: "0.1",
    pathIds: ["a", "b"],
  }), /conservation failed closed/);

  const detached = validProducts();
  detached.accelerationContributionRows[0].rowId = "foreign-row";
  assert.throws(() => validateBorgEomWakeBoundaryProducts(detached, {
    runId: "run-1",
    acceptedEndTime: "0.1",
    pathIds: ["a", "b"],
  }), /not bound to a resolved wake row/);
});

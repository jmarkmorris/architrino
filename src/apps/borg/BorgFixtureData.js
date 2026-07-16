function deepFreeze(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    Object.values(value).forEach((entry) => deepFreeze(entry));
  }
  return value;
}

export const BORG_DATASET_MANIFEST_V1 = deepFreeze({
  "schema": "borg-dataset-manifest.v1",
  "manifestId": "borg-first-native-backed-fixture-manifest",
  "runId": "borg-first-native-backed-fixture",
  "modelContractId": "aaa.central-solver/borg-first-native-backed-fixture.v1",
  "nativeSolverStatus": "native-backed-now",
  "nativeSolverVersion": "local-wasm:architrino_solver_wasm_smoke",
  "bridgeSchemaVersion": "solver-app-bridge.v1",
  "claimLevel": "developer-test",
  "firstFailureCode": "required_residual_unmeasured",
  "sourceBridgeRun": {
    "appId": "causal-delay-feedback",
    "runKind": "masterEquation",
    "nativeRunId": "borg-first-native-backed-fixture-native-run:master-equation-probe",
    "nativeDatasetId": "borg-first-native-backed-fixture-native-dataset:master-equation-probe",
    "requestId": "borg-first-native-backed-fixture-request:master-equation-probe",
    "fixtureProfileId": "borg-first-native-default-motion-fixture.v1",
    "acceptedPrecisionPath": "event_root_focused",
    "executionPath": "native_c_abi",
    "statusCode": "ok",
    "frameCount": 24016,
    "nativeKeyframeCount": 1501,
    "sampleInterval": 0.2,
    "playbackFrameSource": "native-keyframes",
    "interpolationAuthority": "display-only-between-native-keyframes",
    "solverMode": "native-fixed-parameter-master-equation",
    "motionLaw": "architrino-master-equation-v1",
    "fixedPhysicalParameterSetId": "borg-fixed-physical-parameters.v1",
    "fixedPhysicalParameterAuthority": "manifest-declared-fixed-parameter-contract",
    "fixedPhysicalParameters": {
      "parameterSetId": "borg-fixed-physical-parameters.v1",
      "duration": 300,
      "sampleInterval": 0.2,
      "fieldSpeed": 1,
      "historyDepth": 10,
      "acceleration": {
        "x": 0,
        "y": 0,
        "z": 0
      },
      "integrationTolerance": 1e-11,
      "integrationMethod": 1,
      "masterEquationCoupling": 0.0001,
      "masterEquationSofteningLength": 1,
      "durationNormalization": "none",
      "positrinoCharge": 1,
      "electrinoCharge": -1,
      "visualTuningStatus": "not-visual-tuned"
    },
    "accelerationPolicy": "native-many-body-master-equation",
    "acceleration": null,
    "visualTuningStatus": "not-visual-tuned",
    "visualBehaviorAuthority": "native-output-only",
    "pathCount": 16,
    "pathRowCount": 24000,
    "chunkCount": 1500,
    "pathHistoryStreamId": "borg-first-native-backed-fixture:path-history",
    "nativeMasterEquationStatus": "native-fixed-parameter-master-equation",
    "nativeMasterEquationProbeStatusCode": "ok",
    "nativeMasterEquationProbeRunId": "borg-first-native-backed-fixture-native-run:master-equation-probe",
    "nativeMasterEquationProbeExecutionPath": "native_c_abi",
    "nativeMasterEquationProbeFirstFailureCode": "none",
    "nativeMasterEquationRequiredNativeExport": "architrino_solver_integrate_master_equation_motion_f64",
    "masterEquationFallbackDecision": "native-master-equation-selected",
    "canonicalEomEvidence": false,
    "eomEvidenceStatus": "non_eom_compatibility_output",
    "eomEvidenceReason": "The central-solver compatibility ABI emitted frames without retained-history causal roots, self-pairs, receiver-normal factors, or certified EOM evolution.",
    "nextSolverBurden": "migrate-borg-through-certified-eom-shadow-run",
    "valueAuthority": "authoritative-solver-output"
  },
  "nativeMasterEquationProbe": {
    "schema": "borg-native-master-equation-probe.v1",
    "runKind": "masterEquation",
    "runId": "borg-first-native-backed-fixture-native-run:master-equation-probe",
    "requestId": "borg-first-native-backed-fixture-request:master-equation-probe",
    "statusCode": "ok",
    "severity": "ok",
    "executionPath": "native_c_abi",
    "nativeMasterEquationStatus": "native-fixed-parameter-master-equation",
    "fixedPhysicalParameterSetId": "borg-fixed-physical-parameters.v1",
    "fixedPhysicalParameterAuthority": "manifest-declared-fixed-parameter-contract",
    "masterEquationVersion": "master-equation-fixed-parameter-v1",
    "forceLawVersion": "architrino-master-equation-v1",
    "canonicalEomEvidence": false,
    "eomEvidenceStatus": "non_eom_compatibility_output",
    "eomEvidenceReason": "The central-solver compatibility ABI emitted frames without retained-history causal roots, self-pairs, receiver-normal factors, or certified EOM evolution.",
    "firstFailureCode": "none",
    "requiredNativeExport": "architrino_solver_integrate_master_equation_motion_f64",
    "fallbackDecision": "native-master-equation-selected",
    "fallbackRunKind": null,
    "valueAuthority": "authoritative-solver-output"
  },
  "simulationEnvelope": {
    "sideLength": 100,
    "centralVolume": {
      "kind": "cube",
      "center": {
        "x": 50,
        "y": 50,
        "z": 50
      },
      "bounds": {
        "x": [
          10,
          90
        ],
        "y": [
          10,
          90
        ],
        "z": [
          10,
          90
        ]
      },
      "coordinateChart": "outer-cube-cartesian"
    },
    "centralVolumeSideLength": 80,
    "faceBufferMargin": 10,
    "scaleFactor": 1,
    "boundaryMode": "statistical-face-boundary",
    "timeStepPolicy": "fixed",
    "duration": 300,
    "sampleInterval": 0.2,
    "historyDepth": 10,
    "fieldSpeed": 1,
    "wakeHorizon": 10,
    "wakeFloor": null,
    "aggregationBins": [],
    "centralVelocityBound": 0.08905050860171246,
    "centralObservationInterval": 300,
    "centralBoundaryTolerance": 0.001,
    "strictCentralBufferStatus": "failed"
  },
  "population": {
    "centralArchitrinoCount": 8,
    "architrinoCount": 16,
    "bufferArchitrinoCount": 8,
    "centralNumberDensity": 0.000015625,
    "countDerivation": {
      "formulaId": "N_calc=ceil(N_C*(1+2*b_face/L_C)^3)",
      "centralArchitrinoCount": 8,
      "centralVolumeSideLength": 80,
      "faceBufferMargin": 10,
      "exactPreCeiling": 15.625,
      "roundedValue": 16
    }
  },
  "initialConditions": {
    "initialConditionFamily": "seeded-random",
    "initialConditionSeed": "borg-sixteen-random-interior-position-seed.v1",
    "electrinoCount": 8,
    "positrinoCount": 8,
    "polarityAssignmentSource": "seeded-balanced",
    "polaritySignConvention": "positrino-positive-electrino-negative",
    "positrinoCharge": 1,
    "electrinoCharge": -1,
    "velocityPolicy": "seeded-random-small-3d",
    "initialLinePolicy": "seeded-random-interior-cube",
    "velocitySeed": "borg-sixteen-random-small-3d-velocity-seed.v1",
    "randomVelocityMaxComponentMagnitude": 0.042,
    "randomVelocityMinSpeed": 0.0144,
    "velocityBoundScaleFromV1": 1.2,
    "resolvedInitialStateId": "borg-first-native-backed-fixture-native-run:seeded-random-sixteen-initial-state",
    "customEditStatus": "accepted",
    "integrationWeightAuthority": "legacy-bridge-numeric-weight-only"
  },
  "currentStateFrames": [
    {
      "pathKey": 1001,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 28.622897029388696,
        "y": 37.55313183530234,
        "z": 70.80189431738108
      },
      "velocity": {
        "x": 0.0358692372366786,
        "y": -0.020034176976419987,
        "z": 0.04058927833568305
      },
      "errorBound": 0,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 35.87868759362027,
        "y": 67.88936503347941,
        "z": 66.96143783535808
      },
      "velocity": {
        "x": 0.04065787194762379,
        "y": 0.027827400485984984,
        "z": 0.015182620114646855
      },
      "errorBound": 0,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 81.0569413243793,
        "y": 69.68396164639853,
        "z": 71.88158142776228
      },
      "velocity": {
        "x": -0.024717967115342618,
        "y": 0.02702101112622767,
        "z": 0.0014181942986324428
      },
      "errorBound": 0,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 82.52810607664287,
        "y": 71.15843754750676,
        "z": 39.33830797718838
      },
      "velocity": {
        "x": -0.022915574387647214,
        "y": -0.00915548104885966,
        "z": -0.036993910535238685
      },
      "errorBound": 0,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 81.979996079579,
        "y": 34.64003370795399,
        "z": 26.42187557509169
      },
      "velocity": {
        "x": 0.010236987562850117,
        "y": -0.023654684241861106,
        "z": 0.012215676804073157
      },
      "errorBound": 0,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 20.353684772271663,
        "y": 75.06575718475506,
        "z": 84.41737776482478
      },
      "velocity": {
        "x": -0.03178438884951174,
        "y": -0.01944498729798943,
        "z": -0.02046859628800303
      },
      "errorBound": 0,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 16.73667012527585,
        "y": 40.26551235932857,
        "z": 79.25446741608903
      },
      "velocity": {
        "x": -0.007177375157363712,
        "y": 0.040379853612743315,
        "z": 0.023867241024971016
      },
      "errorBound": 0,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 48.519158348441124,
        "y": 29.450735468417406,
        "z": 36.53235632646829
      },
      "velocity": {
        "x": -0.00921550988126546,
        "y": 0.03823159489128739,
        "z": 0.027325085422955454
      },
      "errorBound": 0,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 15.808834810974076,
        "y": 24.010568430647254,
        "z": 46.35277270898223
      },
      "velocity": {
        "x": -0.03343870747927576,
        "y": 0.00047579632513224807,
        "z": 0.01442968221008778
      },
      "errorBound": 0,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 46.18756099534221,
        "y": 22.53255243599415,
        "z": 62.64796414715238
      },
      "velocity": {
        "x": 0.004113988786004483,
        "y": -0.03784288018103689,
        "z": -0.00792925293277949
      },
      "errorBound": 0,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 71.96889337291941,
        "y": 50.57435244764201,
        "z": 67.7779630238656
      },
      "velocity": {
        "x": -0.017302392429672183,
        "y": -0.03141561600845307,
        "z": -0.01968133069574833
      },
      "errorBound": 0,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 76.49810877372511,
        "y": 21.117289350833744,
        "z": 18.228168804198503
      },
      "velocity": {
        "x": -0.009611517978832126,
        "y": 0.009429100879468022,
        "z": 0.031454396825283774
      },
      "errorBound": 0,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 41.275703008519486,
        "y": 70.25215714727528,
        "z": 21.44197607319802
      },
      "velocity": {
        "x": 0.04137807536032052,
        "y": 0.008168522564694289,
        "z": 0.015755161922425036
      },
      "errorBound": 0,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 28.273518153699115,
        "y": 25.929400618886575,
        "z": 53.42295015626587
      },
      "velocity": {
        "x": 0.017988869986496868,
        "y": 0.007944401915185154,
        "z": -0.029241934077814224
      },
      "errorBound": 0,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 42.89911297801882,
        "y": 71.14607966667973,
        "z": 75.25552358292043
      },
      "velocity": {
        "x": 0.02360403154324741,
        "y": -0.03894371992629021,
        "z": 0.017988977749831978
      },
      "errorBound": 0,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 82.73739005299285,
        "y": 74.36085503012873,
        "z": 27.520798391429707
      },
      "velocity": {
        "x": 0.02867858244851231,
        "y": -0.02900090004131198,
        "z": 0.012561289426870646
      },
      "errorBound": 0,
      "stateFlags": 2
    }
  ],
  "currentStateAndFrameSources": {
    "currentStateFrameIds": [
      "master-equation-frame-buffer"
    ],
    "checkpointIds": [],
    "frameBufferIds": [
      "master-equation-frame-buffer"
    ],
    "frameCount": 24016,
    "nativeKeyframeCount": 1501,
    "sampleInterval": 0.2,
    "playbackFrameSource": "native-keyframes",
    "interpolationAuthority": "display-only-between-native-keyframes",
    "interpolatedFrameCount": 0,
    "projectionStatus": "authoritative-solver-output",
    "trajectoryFrameIdCount": 24016,
    "trajectoryFrameIdSource": "borg-fixture-trajectory.v1.json"
  },
  "pathHistory": {
    "pathHistoryStreamIds": [
      "borg-first-native-backed-fixture:path-history"
    ],
    "activePathWindowId": "borg-first-native-backed-fixture:path-history:active-window",
    "pathSpillManifestIds": [
      "borg-first-native-backed-fixture:path-history"
    ],
    "pathReplayIndexIds": [
      "borg-first-native-backed-fixture:path-history:stream_index.v1"
    ],
    "pathHistoryGapRows": [],
    "streamSummary": {
      "schema": "solver-path-history-stream-summary.v1",
      "rowCount": 24000,
      "chunkCount": 1500,
      "pathCount": 16,
      "byteLength": 2304000,
      "timeRange": {
        "start": 0,
        "end": 300
      },
      "frameRange": {
        "start": 0,
        "end": 1499
      },
      "valueAuthority": "authoritative-solver-output"
    }
  },
  "wakeHistory": {
    "resolvedWakeRowIds": [],
    "backgroundNoiseRowIds": [],
    "boundaryGeneratedWakeRowIds": [],
    "failureWakeRowIds": [
      "borg-gap:wake-history-native-row-output-missing"
    ],
    "wakeHistoryGapRows": [
      {
        "gapRowId": "borg-gap:wake-history-native-row-output-missing",
        "pathId": null,
        "timeStart": 0,
        "timeEnd": 300,
        "affectedConsumers": [
          "wake-streams",
          "receiver-acceleration",
          "central-volume-diagnostics"
        ],
        "firstFailureCode": "wake_history_gap_unclassified",
        "diagnosticStatus": "fail-closed-value",
        "valueAuthority": "fail-closed-value",
        "message": "Native retained wake-history rows are not emitted by the current bridge product."
      }
    ],
    "rowConservationCounts": {
      "candidateWakeRowCount": null,
      "resolvedWakeRowCount": 0,
      "aggregatedWakeRowCount": 0,
      "boundaryGeneratedWakeRowCount": 0,
      "failureWakeRowCount": 1,
      "conservationResidual": null,
      "firstFailureCode": "wake_history_gap_unclassified"
    },
    "rowConservationStatus": "not-measured"
  },
  "faceBoundary": {
    "outboundArchitrinoFaceEventStreamIds": [],
    "outboundWakeFaceEventStreamIds": [],
    "faceSummarySetIds": [],
    "faceSummaryIds": [],
    "faceReplaySourceIds": [],
    "sixFaceBoundaryNoisePolicyIds": [],
    "faceCoverageStatus": "fail-closed",
    "faceSourceMixtureIds": [],
    "faceSourceMixtureStatus": "fail-closed",
    "timeMapPolicyIds": [],
    "timeMapSourceStatus": "fail-closed-synthetic-input",
    "faceInputTraceabilityRowIds": [],
    "faceInfluenceModelIds": [],
    "faceInfluenceModelAuthority": "missing-model",
    "faceInfluenceModelMappingStatus": "fail-closed",
    "faceProjectionCacheIds": [],
    "faceProjectionCacheStatus": "absent",
    "velocityScaleRange": {
      "minPositiveSpeed": null,
      "maxSpeed": 0.08905050860171246,
      "zeroBucket": "not-measured",
      "units": "solver-si",
      "chart": "not-measured"
    },
    "velocitySamplingProtocolIds": [],
    "velocitySamplingResultIds": [],
    "velocitySamplingPolicyIds": [],
    "velocitySamplingSelectedPolicyId": null,
    "velocitySamplingResearchStatus": "research-open",
    "velocitySamplingHoldoutStatus": "not-measured",
    "velocitySamplingResidualSummary": null,
    "velocitySamplingErrorBudgetIds": [],
    "inboundReplayRowIds": [],
    "faceReplayValidationResultIds": [],
    "benignNoiseStatus": "fail-closed-missing-contract",
    "retainedLocalEvidenceStatus": "path-history-native-backed-wake-history-missing",
    "boundaryGeneratedEvidenceStatus": "fail-closed-missing-contract",
    "pathBoundsFaceCrossing": {
      "source": "native-path-history-stream-bounds",
      "xMin": 11.05371587922168,
      "xMax": 90.30144544900611,
      "xMinusCrossed": false,
      "xPlusCrossed": false,
      "crossingStatus": "path-bounds-stay-inside-outer-cube-long-fixture"
    },
    "faceBoundaryGapRows": [
      {
        "gapRowId": "borg-gap:face-crossing-coverage-missing",
        "pathId": null,
        "timeStart": 0,
        "timeEnd": 300,
        "affectedConsumers": [
          "face-boundary-status",
          "face-summary-extraction"
        ],
        "firstFailureCode": "missing_face_crossing_coverage",
        "diagnosticStatus": "fail-closed-value",
        "valueAuthority": "fail-closed-value",
        "message": "The long native fixture keeps the sixteen initial architrinos inside the outer cube; no native face-crossing event rows are emitted for boundary replay."
      }
    ],
    "faceInfluenceModelGapRows": [
      {
        "gapRowId": "borg-gap:face-influence-model-missing",
        "pathId": null,
        "timeStart": 0,
        "timeEnd": 300,
        "affectedConsumers": [
          "face-replay-source",
          "six-face-boundary-noise-policy"
        ],
        "firstFailureCode": "face_influence_model_missing",
        "diagnosticStatus": "fail-closed-value",
        "valueAuthority": "fail-closed-value",
        "message": "No path-derived face influence model row is emitted for this native run."
      }
    ],
    "sixFaceBoundaryNoisePolicyGapRows": [
      {
        "gapRowId": "borg-gap:six-face-boundary-policy-missing",
        "pathId": null,
        "timeStart": 0,
        "timeEnd": 300,
        "affectedConsumers": [
          "boundary-replay-decision",
          "benign-noise-status"
        ],
        "firstFailureCode": "six_face_boundary_policy_missing",
        "diagnosticStatus": "fail-closed-value",
        "valueAuthority": "fail-closed-value",
        "message": "No six-face boundary noise policy row is emitted for this native run."
      }
    ],
    "velocitySamplingGapRows": [
      {
        "gapRowId": "borg-gap:velocity-sampling-protocol-missing",
        "pathId": null,
        "timeStart": 0,
        "timeEnd": 300,
        "affectedConsumers": [
          "velocity-scale-sampling",
          "boundary-replay-decision"
        ],
        "firstFailureCode": "velocity_sampling_protocol_missing",
        "diagnosticStatus": "fail-closed-value",
        "valueAuthority": "fail-closed-value",
        "message": "No measured velocity sampling protocol/result row is emitted for this native run."
      }
    ]
  },
  "boundaryToCentralResidual": {
    "boundaryToCentralResidualId": "borg-gap:boundary-to-central-residual-not-measured",
    "residualLabel": "R_boundary->central",
    "residualValue": null,
    "tolerance": 0.001,
    "comparisonWindowId": "borg-first-native-backed-fixture:central-volume-window",
    "referenceRunId": null,
    "boundaryRunId": "borg-first-native-backed-fixture-native-run",
    "status": "not-measured",
    "firstFailureCode": "required_residual_unmeasured",
    "boundaryReplayDecisionPolicyId": "borg-boundary-replay-decision-policy.v0",
    "strictBufferStatus": "strict-buffer-failed",
    "boundaryReplayDecisionStatus": "fail-closed-missing-contract",
    "tauSelf": 0.05,
    "tauFace": 0.01,
    "tauCentral": 0.001,
    "epsilon0": 1e-12,
    "decisionNormId": "not-measured",
    "displayOnlyReason": null,
    "failClosedAffectedValueIds": [
      "central-volume-acceleration",
      "wake-background-diagnostics",
      "face-boundary-replay"
    ]
  },
  "diagnostics": {
    "globalErrorBudgetId": "borg-first-native-backed-fixture:global-error-budget",
    "stageErrorBudgetIds": [
      "motion-integration",
      "path-history-stream-encoding",
      "display-projection-placeholder"
    ],
    "precisionPathId": "event_root_focused",
    "tolerancePolicyId": "borg-first-native-backed-fixture:tolerance-policy",
    "haltDiagnostics": [
      {
        "firstFailureCode": "required_residual_unmeasured",
        "diagnosticStatus": "fail-closed-value",
        "affectedField": "boundaryToCentralResidual"
      }
    ],
    "diagnosticStatusVocabulary": [
      "authoritative-solver-output",
      "app-facing-projection",
      "display-only-visualization",
      "missing-error-budget",
      "exceeded-error-budget",
      "fail-closed-value"
    ],
    "valueAuthorityStates": [
      "retained-local-evidence",
      "reduced-model-boundary",
      "boundary-generated-value",
      "authoritative-solver-output",
      "app-facing-projection",
      "display-only-visualization",
      "missing-error-budget",
      "exceeded-error-budget",
      "fail-closed-value"
    ]
  },
  "deploymentBudget": {
    "bundleSizeBytes": null,
    "staticAssetTransferBytes": null,
    "githubPagesBandwidthEstimate": null,
    "browserHeapBudget": null,
    "gpuMemoryBudget": null,
    "browserStorageBudget": null,
    "actionsArtifactBudget": null,
    "nativeSolverThroughput": {
      "executionPath": "native_c_abi",
      "frameCount": 24016,
      "pathRowCount": 24000,
      "measuredWallClockMs": null
    },
    "deploymentBudgetStatus": "missing-budget"
  },
  "renderManifests": [
    {
      "renderManifestId": "borg-first-native-backed-fixture:render-4k-uhd-placeholder",
      "viewportCssSize": "1920x1080",
      "renderPixelSize": "3840x2160",
      "devicePixelRatio": 2,
      "renderScale": 1,
      "targetFrameRate": "not-measured",
      "visualQualityMode": "quality-4k-uhd",
      "renderStatus": "not-measured"
    }
  ],
  "validation": {
    "fixtureStatus": "passed-native-long-fixture-with-fail-closed-boundary-gaps",
    "nativeBridgeStatus": "passed",
    "nativePathBoundsFaceCrossingStatus": "path-bounds-stay-inside-outer-cube-long-fixture",
    "longFixtureStatus": "native-keyframes-long-fixture",
    "pathHistoryAuthorityStatus": "native-backed-now",
    "wakeHistoryAuthorityStatus": "fail-closed-missing-contract",
    "faceBoundaryAuthorityStatus": "fail-closed-missing-contract",
    "benignNoiseAuthorityStatus": "fail-closed-missing-contract",
    "proofClaimStatus": "not-proof-evidence"
  },
  "trajectoryRecord": {
    "schema": "borg-fixture-trajectory.v1",
    "assetPath": "./borg-fixture-trajectory.v1.json",
    "recordAuthority": "authoritative-solver-output",
    "loadPolicy": "load-on-demand-not-on-first-paint",
    "seedFrameCount": 16,
    "frameCount": 24016,
    "pathRowCount": 24000,
    "nativeKeyframeCount": 1501,
    "trajectoryFrameIdCount": 24016,
    "sampleInterval": 0.2,
    "historyStartTime": 0,
    "historyEndTime": 300,
    "canonicalEomEvidence": false,
    "eomEvidenceStatus": "non_eom_compatibility_output"
  }
});

export const BORG_APP_SURFACE_DESIGN_V1 = deepFreeze({
  "schema": "borg-app-surface-design.v1",
  "screenSpecId": "borg-first-screen-from-native-fixture",
  "appId": "borg-app",
  "claimLevel": "developer-test-screen-spec",
  "sourceManifest": {
    "schema": "borg-dataset-manifest.v1",
    "manifestId": "borg-first-native-backed-fixture-manifest",
    "runId": "borg-first-native-backed-fixture",
    "modelContractId": "aaa.central-solver/borg-first-native-backed-fixture.v1",
    "nativeSolverStatus": "native-backed-now",
    "nativeSolverVersion": "local-wasm:architrino_solver_wasm_smoke",
    "bridgeSchemaVersion": "solver-app-bridge.v1",
    "fixtureStatus": "passed-native-long-fixture-with-fail-closed-boundary-gaps",
    "fixtureProfileId": "borg-first-native-default-motion-fixture.v1",
    "nativeKeyframeCount": 1501,
    "sampleInterval": 0.2,
    "playbackFrameSource": "native-keyframes",
    "initialLinePolicy": "seeded-random-interior-cube",
    "runKind": "masterEquation",
    "solverMode": "native-fixed-parameter-master-equation",
    "motionLaw": "architrino-master-equation-v1",
    "fixedPhysicalParameterSetId": "borg-fixed-physical-parameters.v1",
    "fixedPhysicalParameterAuthority": "manifest-declared-fixed-parameter-contract",
    "fixedPhysicalParameters": {
      "parameterSetId": "borg-fixed-physical-parameters.v1",
      "duration": 300,
      "sampleInterval": 0.2,
      "fieldSpeed": 1,
      "historyDepth": 10,
      "acceleration": {
        "x": 0,
        "y": 0,
        "z": 0
      },
      "integrationTolerance": 1e-11,
      "integrationMethod": 1,
      "masterEquationCoupling": 0.0001,
      "masterEquationSofteningLength": 1,
      "durationNormalization": "none",
      "positrinoCharge": 1,
      "electrinoCharge": -1,
      "visualTuningStatus": "not-visual-tuned"
    },
    "visualTuningStatus": "not-visual-tuned",
    "visualBehaviorAuthority": "native-output-only",
    "nativeMasterEquationStatus": "native-fixed-parameter-master-equation",
    "nativeMasterEquationProbe": {
      "schema": "borg-native-master-equation-probe.v1",
      "runKind": "masterEquation",
      "runId": "borg-first-native-backed-fixture-native-run:master-equation-probe",
      "requestId": "borg-first-native-backed-fixture-request:master-equation-probe",
      "statusCode": "ok",
      "severity": "ok",
      "executionPath": "native_c_abi",
      "nativeMasterEquationStatus": "native-fixed-parameter-master-equation",
      "fixedPhysicalParameterSetId": "borg-fixed-physical-parameters.v1",
      "fixedPhysicalParameterAuthority": "manifest-declared-fixed-parameter-contract",
      "masterEquationVersion": "master-equation-fixed-parameter-v1",
      "forceLawVersion": "architrino-master-equation-v1",
      "canonicalEomEvidence": false,
      "eomEvidenceStatus": "non_eom_compatibility_output",
      "eomEvidenceReason": "The central-solver compatibility ABI emitted frames without retained-history causal roots, self-pairs, receiver-normal factors, or certified EOM evolution.",
      "firstFailureCode": "none",
      "requiredNativeExport": "architrino_solver_integrate_master_equation_motion_f64",
      "fallbackDecision": "native-master-equation-selected",
      "fallbackRunKind": null,
      "valueAuthority": "authoritative-solver-output"
    },
    "canonicalEomEvidence": false,
    "eomEvidenceStatus": "non_eom_compatibility_output",
    "nextSolverBurden": "migrate-borg-through-certified-eom-shadow-run",
    "sourceClaimLevel": "developer-test"
  },
  "nativeSolverBoundary": {
    "productionSolver": "central-solver-compatibility-output",
    "eomMigrationStatus": "shadow-adapter-available-promotion-gated",
    "bridgeExecutionPath": "native_c_abi",
    "currentStateAuthority": "authoritative-solver-output",
    "pathHistoryAuthority": "authoritative-solver-output",
    "wakeHistoryAuthority": "fail-closed-missing-contract",
    "faceBoundaryAuthority": "fail-closed-missing-contract"
  },
  "firstViewport": {
    "screenKind": "simulation-workspace",
    "landingPage": false,
    "requiredOutputStandard": "4k-uhd",
    "renderPixelSize": "3840x2160",
    "layoutRegions": [
      "left-simulation-envelope-rail",
      "top-layer-strip",
      "viewport-camera-cluster",
      "right-diagnostics-rail",
      "bottom-timeline"
    ],
    "defaultVisibleLayers": [
      "simulation-window",
      "architrino-position",
      "path-history",
      "diagnostics"
    ],
    "defaultHiddenLayers": [
      "velocity-vectors"
    ],
    "defaultDisabledLayers": [
      "wake-streams",
      "face-boundary-status",
      "outbound-face-background"
    ],
    "authorityPromotionRule": "least-authoritative-applicable-status-wins"
  },
  "viewport": {
    "kind": "3d-simulation-window",
    "renderedRegion": "centralVolume",
    "centralCube": {
      "visible": true,
      "renderRule": "faint-edge-wireframe-only",
      "sourceField": "simulationEnvelope.centralVolume",
      "sideLength": 80,
      "bounds": {
        "x": [
          10,
          90
        ],
        "y": [
          10,
          90
        ],
        "z": [
          10,
          90
        ]
      },
      "center": {
        "x": 50,
        "y": 50,
        "z": 50
      },
      "valueAuthority": "app-facing-projection"
    },
    "outerComputedCube": {
      "visibleByDefault": false,
      "diagnosticOverlayOnly": true,
      "sourceField": "simulationEnvelope.sideLength",
      "sideLength": 100,
      "faceBufferMargin": 10,
      "valueAuthority": "app-facing-projection"
    },
    "architrinoPositions": {
      "visible": true,
      "sourceField": "currentStateAndFrameSources.currentStateFrameIds",
      "frameBufferIds": [
        "master-equation-frame-buffer"
      ],
      "frameCount": 24016,
      "valueAuthority": "authoritative-solver-output"
    },
    "cameraControls": {
      "label": "View",
      "controls": [
        "rotate",
        "zoom",
        "pan",
        "reset-view",
        "fit-window",
        "focus-selected"
      ],
      "valueAuthority": "display-only-visualization",
      "physicalScaleIsolation": "camera-controls-do-not-edit-simulation-envelope"
    }
  },
  "layerStrip": [
    {
      "layer": "simulation-window",
      "state": "on-locked",
      "sourceFields": [
        "simulationEnvelope.centralVolume",
        "simulationEnvelope.centralVolumeSideLength",
        "simulationEnvelope.sideLength",
        "simulationEnvelope.faceBufferMargin"
      ],
      "valueAuthority": "app-facing-projection"
    },
    {
      "layer": "architrino-position",
      "state": "on",
      "sourceFields": [
        "currentStateAndFrameSources.currentStateFrameIds"
      ],
      "valueAuthority": "authoritative-solver-output"
    },
    {
      "layer": "velocity-vectors",
      "state": "off",
      "sourceFields": [
        "currentStateAndFrameSources.currentStateFrameIds"
      ],
      "displayTransform": "logarithmic-ray-length-when-enabled",
      "rawValueAuthority": "authoritative-solver-output",
      "geometryAuthority": "app-facing-projection"
    },
    {
      "layer": "path-history",
      "state": "on",
      "sourceFields": [
        "pathHistory.pathHistoryStreamIds",
        "pathHistory.pathReplayIndexIds"
      ],
      "displayTransform": "adjacent-native-row-line-segments",
      "smoothingPolicy": "none",
      "valueAuthority": "authoritative-solver-output"
    },
    {
      "layer": "wake-streams",
      "state": "disabled",
      "sourceFields": [
        "wakeHistory.resolvedWakeRowIds",
        "wakeHistory.wakeHistoryGapRows"
      ],
      "valueAuthority": "fail-closed-value",
      "firstFailureCode": "wake_history_gap_unclassified"
    },
    {
      "layer": "face-boundary-status",
      "state": "contextual-disabled",
      "sourceFields": [
        "faceBoundary.faceSummaryIds",
        "faceBoundary.faceBoundaryGapRows"
      ],
      "valueAuthority": "fail-closed-value",
      "firstFailureCode": "missing_face_crossing_coverage"
    },
    {
      "layer": "diagnostics",
      "state": "on-locked",
      "sourceFields": [
        "diagnostics.haltDiagnostics",
        "diagnostics.diagnosticStatusVocabulary"
      ],
      "valueAuthority": "fail-closed-value"
    },
    {
      "layer": "outbound-face-background",
      "state": "disabled",
      "sourceFields": [
        "faceBoundary.faceSummarySetIds",
        "faceBoundary.faceInfluenceModelIds"
      ],
      "valueAuthority": "fail-closed-value",
      "firstFailureCode": "face_influence_model_missing"
    }
  ],
  "simulationEnvelopeRail": {
    "label": "Simulation envelope",
    "editAuthority": "pending-native-acceptance-on-change",
    "fields": [
      {
        "fieldId": "sideLength",
        "value": 100,
        "valueAuthority": "authoritative-solver-output"
      },
      {
        "fieldId": "centralVolumeSideLength",
        "value": 80,
        "valueAuthority": "app-facing-projection"
      },
      {
        "fieldId": "faceBufferMargin",
        "value": 10,
        "valueAuthority": "app-facing-projection",
        "strictCentralBufferStatus": "failed"
      },
      {
        "fieldId": "historyDepth",
        "value": 10,
        "valueAuthority": "authoritative-solver-output"
      },
      {
        "fieldId": "fieldSpeed",
        "value": 1,
        "valueAuthority": "authoritative-solver-output"
      },
      {
        "fieldId": "wakeHorizon",
        "value": 10,
        "valueAuthority": "app-facing-projection",
        "formulaId": "wakeHorizon=c_f*h"
      },
      {
        "fieldId": "centralVelocityBound",
        "value": 0.08905050860171246,
        "valueAuthority": "authoritative-solver-output"
      },
      {
        "fieldId": "centralObservationInterval",
        "value": 300,
        "valueAuthority": "authoritative-solver-output"
      },
      {
        "fieldId": "centralArchitrinoCount",
        "value": 8,
        "valueAuthority": "app-facing-projection"
      },
      {
        "fieldId": "architrinoCount",
        "value": 16,
        "valueAuthority": "app-facing-projection",
        "formulaId": "N_calc=ceil(N_C*(1+2*b_face/L_C)^3)"
      },
      {
        "fieldId": "bufferArchitrinoCount",
        "value": 8,
        "valueAuthority": "app-facing-projection"
      }
    ]
  },
  "initialConditionPanel": {
    "family": "seeded-random",
    "seed": "borg-sixteen-random-interior-position-seed.v1",
    "electrinoCount": 8,
    "positrinoCount": 8,
    "polarityAssignmentSource": "seeded-balanced",
    "velocityPolicy": "seeded-random-small-3d",
    "velocitySeed": "borg-sixteen-random-small-3d-velocity-seed.v1",
    "resolvedInitialStateId": "borg-first-native-backed-fixture-native-run:seeded-random-sixteen-initial-state",
    "customEditStatus": "accepted",
    "velocityRaysDefault": "off",
    "valueAuthority": "authoritative-solver-output"
  },
  "diagnosticsRail": {
    "defaultState": "compact-alerts-plus-selected-object",
    "globalErrorBudgetId": "borg-first-native-backed-fixture:global-error-budget",
    "stageErrorBudgetIds": [
      "motion-integration",
      "path-history-stream-encoding",
      "display-projection-placeholder"
    ],
    "diagnosticStatusVocabulary": [
      "authoritative-solver-output",
      "app-facing-projection",
      "display-only-visualization",
      "missing-error-budget",
      "exceeded-error-budget",
      "fail-closed-value"
    ],
    "valueAuthorityStates": [
      "retained-local-evidence",
      "reduced-model-boundary",
      "boundary-generated-value",
      "authoritative-solver-output",
      "app-facing-projection",
      "display-only-visualization",
      "missing-error-budget",
      "exceeded-error-budget",
      "fail-closed-value"
    ],
    "compactAlerts": [
      {
        "alertId": "strict-central-buffer-failed",
        "status": "failed",
        "diagnosticStatus": "fail-closed-value",
        "firstFailureCode": "central_volume_buffer_target_failed",
        "affectedFields": [
          "centralVolumeAcceleration",
          "wakeBackgroundDiagnostics"
        ]
      },
      {
        "firstFailureCode": "required_residual_unmeasured",
        "diagnosticStatus": "fail-closed-value",
        "affectedField": "boundaryToCentralResidual"
      }
    ],
    "failClosedRows": [
      {
        "gapRowId": "borg-gap:wake-history-native-row-output-missing",
        "pathId": null,
        "timeStart": 0,
        "timeEnd": 300,
        "affectedConsumers": [
          "wake-streams",
          "receiver-acceleration",
          "central-volume-diagnostics"
        ],
        "firstFailureCode": "wake_history_gap_unclassified",
        "diagnosticStatus": "fail-closed-value",
        "valueAuthority": "fail-closed-value",
        "message": "Native retained wake-history rows are not emitted by the current bridge product."
      },
      {
        "gapRowId": "borg-gap:face-crossing-coverage-missing",
        "pathId": null,
        "timeStart": 0,
        "timeEnd": 300,
        "affectedConsumers": [
          "face-boundary-status",
          "face-summary-extraction"
        ],
        "firstFailureCode": "missing_face_crossing_coverage",
        "diagnosticStatus": "fail-closed-value",
        "valueAuthority": "fail-closed-value",
        "message": "The long native fixture keeps the sixteen initial architrinos inside the outer cube; no native face-crossing event rows are emitted for boundary replay."
      },
      {
        "gapRowId": "borg-gap:face-influence-model-missing",
        "pathId": null,
        "timeStart": 0,
        "timeEnd": 300,
        "affectedConsumers": [
          "face-replay-source",
          "six-face-boundary-noise-policy"
        ],
        "firstFailureCode": "face_influence_model_missing",
        "diagnosticStatus": "fail-closed-value",
        "valueAuthority": "fail-closed-value",
        "message": "No path-derived face influence model row is emitted for this native run."
      },
      {
        "gapRowId": "borg-gap:six-face-boundary-policy-missing",
        "pathId": null,
        "timeStart": 0,
        "timeEnd": 300,
        "affectedConsumers": [
          "boundary-replay-decision",
          "benign-noise-status"
        ],
        "firstFailureCode": "six_face_boundary_policy_missing",
        "diagnosticStatus": "fail-closed-value",
        "valueAuthority": "fail-closed-value",
        "message": "No six-face boundary noise policy row is emitted for this native run."
      },
      {
        "gapRowId": "borg-gap:velocity-sampling-protocol-missing",
        "pathId": null,
        "timeStart": 0,
        "timeEnd": 300,
        "affectedConsumers": [
          "velocity-scale-sampling",
          "boundary-replay-decision"
        ],
        "firstFailureCode": "velocity_sampling_protocol_missing",
        "diagnosticStatus": "fail-closed-value",
        "valueAuthority": "fail-closed-value",
        "message": "No measured velocity sampling protocol/result row is emitted for this native run."
      },
      {
        "gapRowId": "borg-gap:boundary-to-central-residual-not-measured",
        "pathId": null,
        "timeStart": null,
        "timeEnd": null,
        "affectedConsumers": [
          "central-volume-acceleration",
          "wake-background-diagnostics",
          "face-boundary-replay"
        ],
        "firstFailureCode": "required_residual_unmeasured",
        "diagnosticStatus": "fail-closed-value",
        "valueAuthority": "fail-closed-value",
        "message": "Required R_boundary->central residual is not measured for this fixture."
      }
    ],
    "selectedObjectPanels": [
      "architrino-state",
      "path-history-segment",
      "wake-history-row",
      "face-boundary-row",
      "fail-closed-value"
    ]
  },
  "bottomTimeline": {
    "localScrubber": "linear-loaded-frame-window",
    "longRunOverview": "logarithmic-placeholder",
    "sourceField": "pathHistory.streamSummary",
    "exactReadouts": [
      "time",
      "frameIndex",
      "checkpointId",
      "playbackSpeed"
    ],
    "timeRange": {
      "start": 0,
      "end": 300
    },
    "frameRange": {
      "start": 0,
      "end": 1499
    },
    "frameCount": 24016,
    "nativeKeyframeCount": 1501,
    "sampleInterval": 0.2,
    "playbackFrameSource": "native-keyframes",
    "pathRowCount": 24000,
    "valueAuthority": "authoritative-solver-output"
  },
  "deploymentBudgetPanel": {
    "deploymentBudgetStatus": "missing-budget",
    "bundleSizeBytes": null,
    "staticAssetTransferBytes": null,
    "githubPagesBandwidthEstimate": null,
    "browserHeapBudget": null,
    "gpuMemoryBudget": null,
    "browserStorageBudget": null,
    "actionsArtifactBudget": null,
    "nativeSolverThroughput": {
      "executionPath": "native_c_abi",
      "frameCount": 24016,
      "pathRowCount": 24000,
      "measuredWallClockMs": null
    },
    "valueAuthority": "missing-error-budget"
  },
  "renderManifestPanel": {
    "renderManifestId": "borg-first-native-backed-fixture:render-4k-uhd-placeholder",
    "viewportCssSize": "1920x1080",
    "renderPixelSize": "3840x2160",
    "devicePixelRatio": 2,
    "renderScale": 1,
    "visualQualityMode": "quality-4k-uhd",
    "renderStatus": "not-measured",
    "valueAuthority": "display-only-visualization"
  },
  "authorityMap": {
    "nativeCurrentStateFrames": "authoritative-solver-output",
    "nativePathHistoryStream": "authoritative-solver-output",
    "centralCubeWireframe": "app-facing-projection",
    "outerComputedCubeOverlay": "app-facing-projection",
    "velocityRayGeometry": "app-facing-projection",
    "wakeStreams": "fail-closed-value",
    "faceBoundaryStatus": "fail-closed-value",
    "outboundFaceBackground": "fail-closed-value",
    "centralVolumeAcceleration": "fail-closed-value",
    "benignNoiseStatus": "fail-closed-missing-contract",
    "deploymentBudgets": "missing-error-budget",
    "renderQuality": "not-measured"
  },
  "noAuthorityPromotions": true,
  "failClosedFirstFailureCodes": [
    "wake_history_gap_unclassified",
    "missing_face_crossing_coverage",
    "face_influence_model_missing",
    "six_face_boundary_policy_missing",
    "velocity_sampling_protocol_missing",
    "required_residual_unmeasured"
  ],
  "validation": {
    "surfaceDesignStatus": "passed-screen-spec-validation",
    "sourceFixtureStatus": "passed-native-long-fixture-with-fail-closed-boundary-gaps",
    "nativeBridgeStatus": "passed",
    "nativePathBoundsFaceCrossingStatus": "path-bounds-stay-inside-outer-cube-long-fixture",
    "boundaryReplayDecisionStatus": "fail-closed-missing-contract",
    "benignNoiseAuthorityStatus": "fail-closed-missing-contract",
    "proofClaimStatus": "not-proof-evidence"
  },
  "nextBuildBurden": "migrate-borg-through-certified-eom-shadow-run"
});

export const BORG_FAIL_CLOSED_ROWS = deepFreeze([
  {
    "firstFailureCode": "wake_history_gap_unclassified",
    "affectedConsumers": [
      "wake-streams",
      "receiver-acceleration",
      "central-volume-diagnostics"
    ],
    "valueAuthority": "fail-closed-value"
  },
  {
    "firstFailureCode": "missing_face_crossing_coverage",
    "affectedConsumers": [
      "face-boundary-status",
      "face-summary-extraction"
    ],
    "valueAuthority": "fail-closed-value"
  },
  {
    "firstFailureCode": "face_influence_model_missing",
    "affectedConsumers": [
      "face-replay-source",
      "six-face-boundary-noise-policy"
    ],
    "valueAuthority": "fail-closed-value"
  },
  {
    "firstFailureCode": "six_face_boundary_policy_missing",
    "affectedConsumers": [
      "boundary-replay-decision",
      "benign-noise-status"
    ],
    "valueAuthority": "fail-closed-value"
  },
  {
    "firstFailureCode": "velocity_sampling_protocol_missing",
    "affectedConsumers": [
      "velocity-scale-sampling",
      "boundary-replay-decision"
    ],
    "valueAuthority": "fail-closed-value"
  },
  {
    "firstFailureCode": "required_residual_unmeasured",
    "affectedConsumers": [
      "central-volume-acceleration",
      "wake-background-diagnostics",
      "face-boundary-replay"
    ],
    "valueAuthority": "fail-closed-value"
  }
]);

export function getBorgFrameSet(manifest = BORG_DATASET_MANIFEST_V1) {
  const frameSet = new Map();
  manifest.currentStateFrames.forEach((frame) => {
    const frameIndex = Number(frame.frameIndex) || 0;
    const frames = frameSet.get(frameIndex) ?? [];
    frames.push(frame);
    frameSet.set(frameIndex, frames);
  });
  return [...frameSet.entries()]
    .sort(([left], [right]) => left - right)
    .map(([frameIndex, frames]) =>
      Object.freeze({
        frameIndex,
        time: frames[0]?.time ?? frameIndex,
        frames: Object.freeze(frames.slice().sort((left, right) => left.pathKey - right.pathKey)),
      }),
    );
}

export function validateBorgFixtureSnapshot({
  manifest = BORG_DATASET_MANIFEST_V1,
  surfaceDesign = BORG_APP_SURFACE_DESIGN_V1,
} = {}) {
  const failures = [];
  if (manifest.schema !== "borg-dataset-manifest.v1") {
    failures.push("manifest schema mismatch");
  }
  if (surfaceDesign.schema !== "borg-app-surface-design.v1") {
    failures.push("surface design schema mismatch");
  }
  if (surfaceDesign.sourceManifest.manifestId !== manifest.manifestId) {
    failures.push("surface source manifest id mismatch");
  }
  if (manifest.nativeSolverStatus !== "native-backed-now") {
    failures.push("EOM solver status is not native-backed-now");
  }
  if (manifest.sourceBridgeRun.executionPath !== "native_c_abi") {
    failures.push("native execution path is not native_c_abi");
  }
  if (manifest.sourceBridgeRun.fixtureProfileId !== "borg-first-native-default-motion-fixture.v1") {
    failures.push("fixture profile is not borg-first-native-default-motion-fixture.v1");
  }
  const trajectoryRecord = manifest.trajectoryRecord;
  if (trajectoryRecord?.schema !== "borg-fixture-trajectory.v1") {
    failures.push("trajectory record schema mismatch");
  }
  // The manifest carries the seed state; the recorded trajectory lives in its
  // own asset so it is not parsed before the first paint. Both counts are
  // checked, against the run that produced them.
  if (manifest.currentStateFrames.length !== manifest.population.architrinoCount) {
    failures.push("seed frame rows do not cover every architrino once");
  }
  if (manifest.currentStateFrames.some((frame) => Number(frame.frameIndex) !== 0)) {
    failures.push("seed frame rows are not all at frame index 0");
  }
  if (trajectoryRecord?.frameCount !== manifest.sourceBridgeRun.frameCount) {
    failures.push("trajectory record frame count mismatch");
  }
  if (trajectoryRecord?.nativeKeyframeCount !== manifest.sourceBridgeRun.nativeKeyframeCount) {
    failures.push("trajectory record native keyframe count mismatch");
  }
  if (trajectoryRecord?.canonicalEomEvidence !== manifest.sourceBridgeRun.canonicalEomEvidence) {
    failures.push("trajectory record evidence grade disagrees with the source bridge run");
  }
  if (manifest.simulationEnvelope.duration !== 300) {
    failures.push("long fixture duration is not 300 solver-time units");
  }
  if (manifest.simulationEnvelope.sampleInterval !== 0.2) {
    failures.push("long fixture sample interval is not 0.2");
  }
  if (manifest.currentStateAndFrameSources.nativeKeyframeCount !== 1501) {
    failures.push("native keyframe count is not 1501 for the long fixture");
  }
  if (manifest.currentStateAndFrameSources.playbackFrameSource !== "native-keyframes") {
    failures.push("playback frame source is not native-keyframes");
  }
  if (manifest.currentStateAndFrameSources.interpolatedFrameCount !== 0) {
    failures.push("manifest records interpolated frame rows");
  }
  if (manifest.simulationEnvelope.fieldSpeed !== 1) {
    failures.push("Borg field speed is not canonical c_f=1");
  }
  if (
    manifest.simulationEnvelope.wakeHorizon !==
    manifest.simulationEnvelope.fieldSpeed * manifest.simulationEnvelope.historyDepth
  ) {
    failures.push("Borg wake horizon does not equal fieldSpeed times historyDepth");
  }
  if (manifest.initialConditions.initialLinePolicy !== "seeded-random-interior-cube") {
    failures.push("seeded random interior-cube initial layout policy is missing");
  }
  if (manifest.initialConditions.initialConditionSeed == null) {
    failures.push("seeded random initial condition seed is missing");
  }
  if (manifest.initialConditions.velocityPolicy !== "seeded-random-small-3d") {
    failures.push("seeded random small 3D velocity policy is missing");
  }
  if (manifest.initialConditions.velocitySeed == null) {
    failures.push("seeded random velocity seed is missing");
  }
  if (manifest.initialConditions.polaritySignConvention !== "positrino-positive-electrino-negative") {
    failures.push("Borg polarity sign convention is not canonical");
  }
  if (manifest.initialConditions.positrinoCharge !== 1 || manifest.initialConditions.electrinoCharge !== -1) {
    failures.push("Borg polarity charge signs are not canonical");
  }
  if (manifest.initialConditions.randomVelocityMaxComponentMagnitude !== 0.042) {
    failures.push("seeded random velocity max component magnitude is not 0.042");
  }
  if (manifest.initialConditions.randomVelocityMinSpeed !== 0.0144) {
    failures.push("seeded random velocity min speed is not 0.0144");
  }
  if (manifest.initialConditions.velocityBoundScaleFromV1 !== 1.2) {
    failures.push("seeded random velocity bound scale is not 1.2");
  }
  const usesNativeMasterEquation =
    manifest.sourceBridgeRun.runKind === "masterEquation" &&
    manifest.sourceBridgeRun.solverMode === "native-fixed-parameter-master-equation";
  const usesDefaultMotionFallback =
    manifest.sourceBridgeRun.runKind === "motionSimulation" &&
    manifest.sourceBridgeRun.solverMode === "native-fixed-parameter-default-motion";
  if (!usesNativeMasterEquation && !usesDefaultMotionFallback) {
    failures.push("Borg fixture is not using native masterEquation or default-motion fallback");
  }
  if (
    usesNativeMasterEquation &&
    manifest.sourceBridgeRun.motionLaw !== "architrino-master-equation-v1"
  ) {
    failures.push("Borg fixture master-equation motion law is missing");
  }
  if (
    usesDefaultMotionFallback &&
    manifest.sourceBridgeRun.motionLaw !== "fixed_parameter_inertial_motion_v1"
  ) {
    failures.push("Borg fixture default-motion law is missing");
  }
  if (manifest.sourceBridgeRun.fixedPhysicalParameterSetId !== "borg-fixed-physical-parameters.v1") {
    failures.push("Borg fixed physical parameter set id is missing");
  }
  if (manifest.sourceBridgeRun.fixedPhysicalParameterAuthority !== "manifest-declared-fixed-parameter-contract") {
    failures.push("Borg fixed physical parameter authority is missing");
  }
  if (manifest.sourceBridgeRun.visualTuningStatus !== "not-visual-tuned") {
    failures.push("Borg fixture still reports visual tuning");
  }
  if (manifest.sourceBridgeRun.visualBehaviorAuthority !== "native-output-only") {
    failures.push("Borg fixture visual behavior is not native-output-only");
  }
  const allowedNativeMasterEquationStatuses = new Set([
    "native-fixed-parameter-master-equation",
    "native-fixture-capability-missing",
    "native-fixture-solver-pending",
  ]);
  if (!allowedNativeMasterEquationStatuses.has(manifest.sourceBridgeRun.nativeMasterEquationStatus)) {
    failures.push("Borg native master-equation status is not expected");
  }
  const allowedMasterEquationProbeStatusCodes = new Set([
    "ok",
    "native_capability_missing",
    "native_solver_pending",
  ]);
  if (!allowedMasterEquationProbeStatusCodes.has(manifest.nativeMasterEquationProbe?.statusCode)) {
    failures.push("Borg native master-equation probe status is not expected");
  }
  const expectedMasterEquationDecision = usesNativeMasterEquation
    ? "native-master-equation-selected"
    : "default-motion-baseline-selected";
  if (manifest.nativeMasterEquationProbe?.fallbackDecision !== expectedMasterEquationDecision) {
    failures.push("Borg native master-equation selection decision is missing");
  }
  const expectedNextSolverBurden = usesNativeMasterEquation
    ? "migrate-borg-through-certified-eom-shadow-run"
    : "build-native-master-equation-fixed-parameter-fixture";
  if (manifest.sourceBridgeRun.nextSolverBurden !== expectedNextSolverBurden) {
    failures.push("Borg fixture next solver burden is stale");
  }
  if (usesNativeMasterEquation && manifest.sourceBridgeRun.canonicalEomEvidence !== false) {
    failures.push("Borg compatibility fixture incorrectly claims canonical EOM evidence");
  }
  if (
    usesNativeMasterEquation &&
    manifest.sourceBridgeRun.eomEvidenceStatus !== "non_eom_compatibility_output"
  ) {
    failures.push("Borg compatibility fixture lacks its non-EOM provenance status");
  }
  if (manifest.sourceBridgeRun.pairAccelerationScale != null) {
    failures.push("Borg default-motion fixture must not expose pair action scale");
  }
  if (manifest.sourceBridgeRun.pathCount !== manifest.population.architrinoCount) {
    failures.push("native path count does not match manifest architrino count");
  }
  if (surfaceDesign.validation.sourceFixtureStatus !== manifest.validation.fixtureStatus) {
    failures.push("surface fixture status does not match manifest fixture status");
  }
  if (
    surfaceDesign.validation.nativePathBoundsFaceCrossingStatus !==
    manifest.validation.nativePathBoundsFaceCrossingStatus
  ) {
    failures.push("surface path-bounds status does not match manifest path-bounds status");
  }
  if (!surfaceDesign.firstViewport.defaultVisibleLayers.includes("simulation-window")) {
    failures.push("simulation-window layer is not default visible");
  }
  if (!surfaceDesign.firstViewport.defaultVisibleLayers.includes("architrino-position")) {
    failures.push("architrino-position layer is not default visible");
  }
  if (!surfaceDesign.firstViewport.defaultVisibleLayers.includes("path-history")) {
    failures.push("path-history layer is not default visible");
  }
  if (!surfaceDesign.firstViewport.defaultDisabledLayers.includes("wake-streams")) {
    failures.push("wake-streams layer is not disabled");
  }
  if (surfaceDesign.authorityMap.centralVolumeAcceleration !== "fail-closed-value") {
    failures.push("central-volume acceleration is not fail-closed");
  }
  if (surfaceDesign.firstViewport.renderPixelSize !== "3840x2160") {
    failures.push("4K UHD render manifest is missing");
  }
  if (failures.length > 0) {
    throw new Error(`Invalid Borg fixture snapshot: ${failures.join("; ")}`);
  }
  return true;
}

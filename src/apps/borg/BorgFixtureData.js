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
    "runKind": "pairInteraction",
    "nativeRunId": "borg-first-native-backed-fixture-native-run",
    "nativeDatasetId": "borg-first-native-backed-fixture-native-dataset",
    "requestId": "borg-first-native-backed-fixture-request",
    "fixtureProfileId": "borg-first-native-backed-long-fixture.v1",
    "acceptedPrecisionPath": "event_root_focused",
    "executionPath": "native_c_abi",
    "statusCode": "ok",
    "frameCount": 816,
    "nativeKeyframeCount": 51,
    "sampleInterval": 0.2,
    "playbackFrameSource": "native-keyframes",
    "interpolationAuthority": "display-only-between-native-keyframes",
    "interactionLaw": "display_pair_attraction_v1",
    "pairAccelerationScale": 0.55,
    "pathCount": 16,
    "pathRowCount": 800,
    "chunkCount": 50,
    "pathHistoryStreamId": "borg-first-native-backed-fixture:path-history",
    "canonicalEomEvidence": false,
    "eomEvidenceStatus": "noncanonical_preview_not_master_eom_evidence",
    "valueAuthority": "authoritative-solver-output"
  },
  "simulationEnvelope": {
    "sideLength": 10,
    "centralVolume": {
      "kind": "cube",
      "center": {
        "x": 5,
        "y": 5,
        "z": 5
      },
      "bounds": {
        "x": [
          1,
          9
        ],
        "y": [
          1,
          9
        ],
        "z": [
          1,
          9
        ]
      },
      "coordinateChart": "outer-cube-cartesian"
    },
    "centralVolumeSideLength": 8,
    "faceBufferMargin": 1,
    "scaleFactor": 1,
    "boundaryMode": "statistical-face-boundary",
    "timeStepPolicy": "fixed",
    "duration": 10,
    "sampleInterval": 0.2,
    "historyDepth": 10,
    "fieldSpeed": 3,
    "wakeHorizon": 30,
    "wakeFloor": null,
    "aggregationBins": [],
    "centralVelocityBound": 0.18916558625138807,
    "centralObservationInterval": 10,
    "centralBoundaryTolerance": 0.001,
    "strictCentralBufferStatus": "failed"
  },
  "population": {
    "centralArchitrinoCount": 8,
    "architrinoCount": 16,
    "bufferArchitrinoCount": 8,
    "centralNumberDensity": 0.015625,
    "countDerivation": {
      "formulaId": "N_calc=ceil(N_C*(1+2*b_face/L_C)^3)",
      "centralArchitrinoCount": 8,
      "centralVolumeSideLength": 8,
      "faceBufferMargin": 1,
      "exactPreCeiling": 15.625,
      "roundedValue": 16
    }
  },
  "initialConditions": {
    "initialConditionFamily": "explicit",
    "initialConditionSeed": null,
    "electrinoCount": 8,
    "positrinoCount": 8,
    "polarityAssignmentSource": "explicit",
    "velocityPolicy": "explicit",
    "initialLinePolicy": "non-collinear-curvature-visibility",
    "velocitySeed": null,
    "resolvedInitialStateId": "borg-first-native-backed-fixture-native-run:explicit-sixteen-initial-state",
    "customEditStatus": "accepted",
    "integrationWeightAuthority": "legacy-bridge-numeric-weight-only"
  },
  "currentStateFrames": [
    {
      "pathKey": 1001,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 3.5,
        "y": 3.5,
        "z": 4.73
      },
      "velocity": {
        "x": 0.045,
        "y": -0.043,
        "z": -0.006
      },
      "errorBound": 0,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 3.5,
        "y": 4.5,
        "z": 4.91
      },
      "velocity": {
        "x": 0.006999999999999999,
        "y": -0.035,
        "z": -0.002
      },
      "errorBound": 0,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 3.5,
        "y": 5.5,
        "z": 5.09
      },
      "velocity": {
        "x": -0.006999999999999999,
        "y": -0.043,
        "z": 0.002
      },
      "errorBound": 0,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 3.5,
        "y": 6.5,
        "z": 5.27
      },
      "velocity": {
        "x": -0.045,
        "y": -0.035,
        "z": 0.006
      },
      "errorBound": 0,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 4.5,
        "y": 3.5,
        "z": 4.91
      },
      "velocity": {
        "x": 0.045,
        "y": -0.017,
        "z": -0.006
      },
      "errorBound": 0,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 4.5,
        "y": 4.5,
        "z": 5.09
      },
      "velocity": {
        "x": 0.006999999999999999,
        "y": -0.009,
        "z": -0.002
      },
      "errorBound": 0,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 4.5,
        "y": 5.5,
        "z": 5.27
      },
      "velocity": {
        "x": -0.006999999999999999,
        "y": -0.017,
        "z": 0.002
      },
      "errorBound": 0,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 4.5,
        "y": 6.5,
        "z": 4.73
      },
      "velocity": {
        "x": -0.045,
        "y": -0.009,
        "z": 0.006
      },
      "errorBound": 0,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 5.5,
        "y": 3.5,
        "z": 5.09
      },
      "velocity": {
        "x": 0.045,
        "y": 0.009,
        "z": -0.006
      },
      "errorBound": 0,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 5.5,
        "y": 4.5,
        "z": 5.27
      },
      "velocity": {
        "x": 0.006999999999999999,
        "y": 0.017,
        "z": -0.002
      },
      "errorBound": 0,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 5.5,
        "y": 5.5,
        "z": 4.73
      },
      "velocity": {
        "x": -0.006999999999999999,
        "y": 0.009,
        "z": 0.002
      },
      "errorBound": 0,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 5.5,
        "y": 6.5,
        "z": 4.91
      },
      "velocity": {
        "x": -0.045,
        "y": 0.017,
        "z": 0.006
      },
      "errorBound": 0,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 6.5,
        "y": 3.5,
        "z": 5.27
      },
      "velocity": {
        "x": 0.045,
        "y": 0.035,
        "z": -0.006
      },
      "errorBound": 0,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 6.5,
        "y": 4.5,
        "z": 4.73
      },
      "velocity": {
        "x": 0.006999999999999999,
        "y": 0.043,
        "z": -0.002
      },
      "errorBound": 0,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 6.5,
        "y": 5.5,
        "z": 4.91
      },
      "velocity": {
        "x": -0.006999999999999999,
        "y": 0.035,
        "z": 0.002
      },
      "errorBound": 0,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 6.5,
        "y": 6.5,
        "z": 5.09
      },
      "velocity": {
        "x": -0.045,
        "y": 0.043,
        "z": 0.006
      },
      "errorBound": 0,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 1,
      "time": 0.2,
      "position": {
        "x": 3.509,
        "y": 3.49316,
        "z": 4.728800000000001
      },
      "velocity": {
        "x": 0.045,
        "y": -0.034199999999999994,
        "z": -0.006
      },
      "errorBound": 1e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 1,
      "time": 0.2,
      "position": {
        "x": 3.5014,
        "y": 4.49124,
        "z": 4.9096
      },
      "velocity": {
        "x": 0.006999999999999999,
        "y": -0.043800000000000006,
        "z": -0.002
      },
      "errorBound": 1e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 1,
      "time": 0.2,
      "position": {
        "x": 3.4986,
        "y": 5.49316,
        "z": 5.0904
      },
      "velocity": {
        "x": -0.006999999999999999,
        "y": -0.034199999999999994,
        "z": 0.002
      },
      "errorBound": 1e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 1,
      "time": 0.2,
      "position": {
        "x": 3.491,
        "y": 6.49124,
        "z": 5.271199999999999
      },
      "velocity": {
        "x": -0.045,
        "y": -0.043800000000000006,
        "z": 0.006
      },
      "errorBound": 1e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 1,
      "time": 0.2,
      "position": {
        "x": 4.509,
        "y": 3.49836,
        "z": 4.9088
      },
      "velocity": {
        "x": 0.045,
        "y": -0.0082,
        "z": -0.006
      },
      "errorBound": 1e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 1,
      "time": 0.2,
      "position": {
        "x": 4.5014,
        "y": 4.49644,
        "z": 5.0896
      },
      "velocity": {
        "x": 0.006999999999999999,
        "y": -0.0178,
        "z": -0.002
      },
      "errorBound": 1e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 1,
      "time": 0.2,
      "position": {
        "x": 4.4986,
        "y": 5.49836,
        "z": 5.2703999999999995
      },
      "velocity": {
        "x": -0.006999999999999999,
        "y": -0.0082,
        "z": 0.002
      },
      "errorBound": 1e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 1,
      "time": 0.2,
      "position": {
        "x": 4.491,
        "y": 6.49644,
        "z": 4.7312
      },
      "velocity": {
        "x": -0.045,
        "y": -0.0178,
        "z": 0.006
      },
      "errorBound": 1e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 1,
      "time": 0.2,
      "position": {
        "x": 5.509,
        "y": 3.50356,
        "z": 5.0888
      },
      "velocity": {
        "x": 0.045,
        "y": 0.0178,
        "z": -0.006
      },
      "errorBound": 1e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 1,
      "time": 0.2,
      "position": {
        "x": 5.5014,
        "y": 4.50164,
        "z": 5.2696
      },
      "velocity": {
        "x": 0.006999999999999999,
        "y": 0.0082,
        "z": -0.002
      },
      "errorBound": 1e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 1,
      "time": 0.2,
      "position": {
        "x": 5.4986,
        "y": 5.50356,
        "z": 4.7304
      },
      "velocity": {
        "x": -0.006999999999999999,
        "y": 0.0178,
        "z": 0.002
      },
      "errorBound": 1e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 1,
      "time": 0.2,
      "position": {
        "x": 5.491,
        "y": 6.50164,
        "z": 4.9112
      },
      "velocity": {
        "x": -0.045,
        "y": 0.0082,
        "z": 0.006
      },
      "errorBound": 1e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 1,
      "time": 0.2,
      "position": {
        "x": 6.509,
        "y": 3.50876,
        "z": 5.2688
      },
      "velocity": {
        "x": 0.045,
        "y": 0.043800000000000006,
        "z": -0.006
      },
      "errorBound": 1e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 1,
      "time": 0.2,
      "position": {
        "x": 6.5014,
        "y": 4.50684,
        "z": 4.7296000000000005
      },
      "velocity": {
        "x": 0.006999999999999999,
        "y": 0.034199999999999994,
        "z": -0.002
      },
      "errorBound": 1e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 1,
      "time": 0.2,
      "position": {
        "x": 6.4986,
        "y": 5.50876,
        "z": 4.9104
      },
      "velocity": {
        "x": -0.006999999999999999,
        "y": 0.043800000000000006,
        "z": 0.002
      },
      "errorBound": 1e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 1,
      "time": 0.2,
      "position": {
        "x": 6.491,
        "y": 6.50684,
        "z": 5.0912
      },
      "velocity": {
        "x": -0.045,
        "y": 0.034199999999999994,
        "z": 0.006
      },
      "errorBound": 1e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 2,
      "time": 0.4,
      "position": {
        "x": 3.5179866239999997,
        "y": 3.4880766208000002,
        "z": 4.727601408000001
      },
      "velocity": {
        "x": 0.04493312,
        "y": -0.025416895999999987,
        "z": -0.005992960000000001
      },
      "errorBound": 2e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 2,
      "time": 0.4,
      "position": {
        "x": 3.5028133759999998,
        "y": 4.4807233792000005,
        "z": 4.909198592
      },
      "velocity": {
        "x": 0.00706688,
        "y": -0.05258310400000001,
        "z": -0.0020070399999999994
      },
      "errorBound": 2e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 2,
      "time": 0.4,
      "position": {
        "x": 3.4971866240000002,
        "y": 5.488076620799999,
        "z": 5.090801408
      },
      "velocity": {
        "x": -0.007066879999999999,
        "y": -0.025416895999999987,
        "z": 0.0020070399999999994
      },
      "errorBound": 2e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 2,
      "time": 0.4,
      "position": {
        "x": 3.4820133760000003,
        "y": 6.4807233792000005,
        "z": 5.272398591999999
      },
      "velocity": {
        "x": -0.04493312,
        "y": -0.052583104000000006,
        "z": 0.005992960000000001
      },
      "errorBound": 2e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 2,
      "time": 0.4,
      "position": {
        "x": 4.517986624000001,
        "y": 3.4984766208,
        "z": 4.9076014080000006
      },
      "velocity": {
        "x": 0.04493312,
        "y": 0.0005831040000000027,
        "z": -0.005992960000000001
      },
      "errorBound": 2e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 2,
      "time": 0.4,
      "position": {
        "x": 4.502813376000001,
        "y": 4.491123379199999,
        "z": 5.089198592
      },
      "velocity": {
        "x": 0.007066879999999999,
        "y": -0.026583104000000003,
        "z": -0.0020070399999999994
      },
      "errorBound": 2e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 2,
      "time": 0.4,
      "position": {
        "x": 4.497186623999999,
        "y": 5.4984766208,
        "z": 5.270801408
      },
      "velocity": {
        "x": -0.00706688,
        "y": 0.0005831040000000027,
        "z": 0.0020070399999999994
      },
      "errorBound": 2e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 2,
      "time": 0.4,
      "position": {
        "x": 4.482013375999999,
        "y": 6.491123379199999,
        "z": 4.732398592
      },
      "velocity": {
        "x": -0.04493312,
        "y": -0.026583104000000003,
        "z": 0.005992960000000001
      },
      "errorBound": 2e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 2,
      "time": 0.4,
      "position": {
        "x": 5.517986624000001,
        "y": 3.5088766207999997,
        "z": 5.087601408
      },
      "velocity": {
        "x": 0.04493312,
        "y": 0.026583104000000003,
        "z": -0.005992960000000001
      },
      "errorBound": 2e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 2,
      "time": 0.4,
      "position": {
        "x": 5.502813376000001,
        "y": 4.5015233792,
        "z": 5.2691985919999995
      },
      "velocity": {
        "x": 0.00706688,
        "y": -0.0005831040000000027,
        "z": -0.0020070399999999994
      },
      "errorBound": 2e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 2,
      "time": 0.4,
      "position": {
        "x": 5.497186623999999,
        "y": 5.508876620800001,
        "z": 4.7308014080000005
      },
      "velocity": {
        "x": -0.00706688,
        "y": 0.026583104000000003,
        "z": 0.002007039999999999
      },
      "errorBound": 2e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 2,
      "time": 0.4,
      "position": {
        "x": 5.482013375999999,
        "y": 6.5015233792,
        "z": 4.912398592
      },
      "velocity": {
        "x": -0.04493312,
        "y": -0.0005831040000000027,
        "z": 0.005992960000000001
      },
      "errorBound": 2e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 2,
      "time": 0.4,
      "position": {
        "x": 6.517986624000001,
        "y": 3.5192766208,
        "z": 5.267601408
      },
      "velocity": {
        "x": 0.04493312,
        "y": 0.052583104000000006,
        "z": -0.005992960000000001
      },
      "errorBound": 2e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 2,
      "time": 0.4,
      "position": {
        "x": 6.502813376000001,
        "y": 4.511923379200001,
        "z": 4.729198592
      },
      "velocity": {
        "x": 0.007066879999999999,
        "y": 0.025416895999999987,
        "z": -0.0020070399999999994
      },
      "errorBound": 2e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 2,
      "time": 0.4,
      "position": {
        "x": 6.497186623999999,
        "y": 5.5192766207999995,
        "z": 4.910801408
      },
      "velocity": {
        "x": -0.007066879999999999,
        "y": 0.05258310400000001,
        "z": 0.002007039999999999
      },
      "errorBound": 2e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 2,
      "time": 0.4,
      "position": {
        "x": 6.482013375999999,
        "y": 6.511923379200001,
        "z": 5.0923985919999994
      },
      "velocity": {
        "x": -0.04493312,
        "y": 0.02541689599999999,
        "z": 0.005992960000000001
      },
      "errorBound": 2e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 3,
      "time": 0.6000000000000001,
      "position": {
        "x": 3.5269465430835196,
        "y": 3.484740299894784,
        "z": 4.726405627043841
      },
      "velocity": {
        "x": 0.0447995954176,
        "y": -0.016681604526079984,
        "z": -0.0059789047808000055
      },
      "errorBound": 3e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 3,
      "time": 0.6000000000000001,
      "position": {
        "x": 3.5042534569164796,
        "y": 4.468459700105217,
        "z": 4.9087943729561605
      },
      "velocity": {
        "x": 0.0072004045823999985,
        "y": -0.06131839547392002,
        "z": -0.0020210952191999955
      },
      "errorBound": 3e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 3,
      "time": 0.6000000000000001,
      "position": {
        "x": 3.4957465430835204,
        "y": 5.484740299894783,
        "z": 5.0912056270438395
      },
      "velocity": {
        "x": -0.007200404582399999,
        "y": -0.01668160452607998,
        "z": 0.002021095219199995
      },
      "errorBound": 3e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 3,
      "time": 0.6000000000000001,
      "position": {
        "x": 3.4730534569164804,
        "y": 6.468459700105217,
        "z": 5.273594372956159
      },
      "velocity": {
        "x": -0.0447995954176,
        "y": -0.06131839547392001,
        "z": 0.0059789047808000055
      },
      "errorBound": 3e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 3,
      "time": 0.6000000000000001,
      "position": {
        "x": 4.526946543083521,
        "y": 3.500340299894784,
        "z": 4.90640562704384
      },
      "velocity": {
        "x": 0.0447995954176,
        "y": 0.009318395473920008,
        "z": -0.0059789047808000055
      },
      "errorBound": 3e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 3,
      "time": 0.6000000000000001,
      "position": {
        "x": 4.504253456916481,
        "y": 4.484059700105215,
        "z": 5.08879437295616
      },
      "velocity": {
        "x": 0.007200404582399999,
        "y": -0.03531839547392001,
        "z": -0.0020210952191999955
      },
      "errorBound": 3e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 3,
      "time": 0.6000000000000001,
      "position": {
        "x": 4.495746543083519,
        "y": 5.500340299894784,
        "z": 5.271205627043839
      },
      "velocity": {
        "x": -0.0072004045824,
        "y": 0.009318395473920006,
        "z": 0.0020210952191999955
      },
      "errorBound": 3e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 3,
      "time": 0.6000000000000001,
      "position": {
        "x": 4.473053456916479,
        "y": 6.484059700105215,
        "z": 4.73359437295616
      },
      "velocity": {
        "x": -0.0447995954176,
        "y": -0.03531839547392001,
        "z": 0.0059789047808000055
      },
      "errorBound": 3e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 3,
      "time": 0.6000000000000001,
      "position": {
        "x": 5.526946543083521,
        "y": 3.5159402998947837,
        "z": 5.08640562704384
      },
      "velocity": {
        "x": 0.0447995954176,
        "y": 0.03531839547392,
        "z": -0.0059789047808000055
      },
      "errorBound": 3e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 3,
      "time": 0.6000000000000001,
      "position": {
        "x": 5.504253456916481,
        "y": 4.499659700105216,
        "z": 5.26879437295616
      },
      "velocity": {
        "x": 0.007200404582399999,
        "y": -0.009318395473920006,
        "z": -0.0020210952191999955
      },
      "errorBound": 3e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 3,
      "time": 0.6000000000000001,
      "position": {
        "x": 5.495746543083519,
        "y": 5.515940299894785,
        "z": 4.73120562704384
      },
      "velocity": {
        "x": -0.007200404582399999,
        "y": 0.03531839547392001,
        "z": 0.002021095219199995
      },
      "errorBound": 3e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 3,
      "time": 0.6000000000000001,
      "position": {
        "x": 5.473053456916479,
        "y": 6.499659700105216,
        "z": 4.91359437295616
      },
      "velocity": {
        "x": -0.0447995954176,
        "y": -0.009318395473920008,
        "z": 0.0059789047808000055
      },
      "errorBound": 3e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 3,
      "time": 0.6000000000000001,
      "position": {
        "x": 6.526946543083521,
        "y": 3.531540299894784,
        "z": 5.26640562704384
      },
      "velocity": {
        "x": 0.0447995954176,
        "y": 0.06131839547392001,
        "z": -0.0059789047808000055
      },
      "errorBound": 3e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 3,
      "time": 0.6000000000000001,
      "position": {
        "x": 6.504253456916481,
        "y": 4.515259700105217,
        "z": 4.728794372956161
      },
      "velocity": {
        "x": 0.007200404582399999,
        "y": 0.01668160452607998,
        "z": -0.002021095219199995
      },
      "errorBound": 3e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 3,
      "time": 0.6000000000000001,
      "position": {
        "x": 6.495746543083519,
        "y": 5.531540299894783,
        "z": 4.91120562704384
      },
      "velocity": {
        "x": -0.0072004045823999985,
        "y": 0.06131839547392002,
        "z": 0.002021095219199995
      },
      "errorBound": 3e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 3,
      "time": 0.6000000000000001,
      "position": {
        "x": 6.473053456916479,
        "y": 6.515259700105217,
        "z": 5.09359437295616
      },
      "velocity": {
        "x": -0.0447995954176,
        "y": 0.016681604526079984,
        "z": 0.0059789047808000055
      },
      "errorBound": 3e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 4,
      "time": 0.8,
      "position": {
        "x": 3.5358665223353856,
        "y": 3.4831353251339383,
        "z": 4.725214050280487
      },
      "velocity": {
        "x": 0.04459989625933005,
        "y": -0.008024873804228182,
        "z": -0.005957883816771588
      },
      "errorBound": 4e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 4,
      "time": 0.8,
      "position": {
        "x": 3.5057334776646134,
        "y": 4.454464674866062,
        "z": 4.908385949719515
      },
      "velocity": {
        "x": 0.0074001037406699515,
        "y": -0.06997512619577181,
        "z": -0.0020421161832284134
      },
      "errorBound": 4e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 4,
      "time": 0.8,
      "position": {
        "x": 3.4942665223353866,
        "y": 5.483135325133937,
        "z": 5.091614050280485
      },
      "velocity": {
        "x": -0.0074001037406699515,
        "y": -0.008024873804228177,
        "z": 0.0020421161832284125
      },
      "errorBound": 4e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 4,
      "time": 0.8,
      "position": {
        "x": 3.4641334776646144,
        "y": 6.454464674866062,
        "z": 5.274785949719513
      },
      "velocity": {
        "x": -0.04459989625933005,
        "y": -0.06997512619577181,
        "z": 0.005957883816771588
      },
      "errorBound": 4e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 4,
      "time": 0.8,
      "position": {
        "x": 4.535866522335387,
        "y": 3.5039353251339387,
        "z": 4.905214050280486
      },
      "velocity": {
        "x": 0.04459989625933005,
        "y": 0.01797512619577181,
        "z": -0.005957883816771588
      },
      "errorBound": 4e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 4,
      "time": 0.8,
      "position": {
        "x": 4.505733477664615,
        "y": 4.475264674866061,
        "z": 5.088385949719514
      },
      "velocity": {
        "x": 0.0074001037406699515,
        "y": -0.04397512619577181,
        "z": -0.0020421161832284134
      },
      "errorBound": 4e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 4,
      "time": 0.8,
      "position": {
        "x": 4.494266522335385,
        "y": 5.503935325133939,
        "z": 5.271614050280485
      },
      "velocity": {
        "x": -0.007400103740669952,
        "y": 0.01797512619577181,
        "z": 0.002042116183228413
      },
      "errorBound": 4e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 4,
      "time": 0.8,
      "position": {
        "x": 4.464133477664613,
        "y": 6.475264674866061,
        "z": 4.734785949719514
      },
      "velocity": {
        "x": -0.04459989625933005,
        "y": -0.04397512619577181,
        "z": 0.005957883816771588
      },
      "errorBound": 4e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 4,
      "time": 0.8,
      "position": {
        "x": 5.535866522335387,
        "y": 3.524735325133938,
        "z": 5.085214050280486
      },
      "velocity": {
        "x": 0.04459989625933005,
        "y": 0.043975126195771805,
        "z": -0.005957883816771588
      },
      "errorBound": 4e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 4,
      "time": 0.8,
      "position": {
        "x": 5.505733477664615,
        "y": 4.496064674866061,
        "z": 5.268385949719514
      },
      "velocity": {
        "x": 0.007400103740669951,
        "y": -0.01797512619577181,
        "z": -0.002042116183228413
      },
      "errorBound": 4e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 4,
      "time": 0.8,
      "position": {
        "x": 5.494266522335385,
        "y": 5.524735325133939,
        "z": 4.731614050280486
      },
      "velocity": {
        "x": -0.007400103740669951,
        "y": 0.04397512619577181,
        "z": 0.002042116183228413
      },
      "errorBound": 4e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 4,
      "time": 0.8,
      "position": {
        "x": 5.464133477664613,
        "y": 6.496064674866061,
        "z": 4.914785949719514
      },
      "velocity": {
        "x": -0.04459989625933005,
        "y": -0.01797512619577181,
        "z": 0.005957883816771588
      },
      "errorBound": 4e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 4,
      "time": 0.8,
      "position": {
        "x": 6.535866522335387,
        "y": 3.545535325133938,
        "z": 5.265214050280486
      },
      "velocity": {
        "x": 0.04459989625933005,
        "y": 0.06997512619577181,
        "z": -0.005957883816771588
      },
      "errorBound": 4e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 4,
      "time": 0.8,
      "position": {
        "x": 6.505733477664615,
        "y": 4.516864674866063,
        "z": 4.728385949719515
      },
      "velocity": {
        "x": 0.007400103740669951,
        "y": 0.008024873804228177,
        "z": -0.0020421161832284125
      },
      "errorBound": 4e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 4,
      "time": 0.8,
      "position": {
        "x": 6.494266522335385,
        "y": 5.545535325133938,
        "z": 4.911614050280486
      },
      "velocity": {
        "x": -0.00740010374066995,
        "y": 0.06997512619577181,
        "z": 0.002042116183228413
      },
      "errorBound": 4e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 4,
      "time": 0.8,
      "position": {
        "x": 6.464133477664613,
        "y": 6.516864674866063,
        "z": 5.094785949719514
      },
      "velocity": {
        "x": -0.04459989625933005,
        "y": 0.008024873804228184,
        "z": 0.005957883816771588
      },
      "errorBound": 4e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 5,
      "time": 1,
      "position": {
        "x": 3.544733467428631,
        "y": 3.483239890028621,
        "z": 4.724028056060145
      },
      "velocity": {
        "x": 0.04433472546622726,
        "y": 0.0005228244734145036,
        "z": -0.005929971101708139
      },
      "errorBound": 4.9999999999999995e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 5,
      "time": 1,
      "position": {
        "x": 3.507266532571368,
        "y": 4.43876010997138,
        "z": 4.907971943939856
      },
      "velocity": {
        "x": 0.007665274533772747,
        "y": -0.07852282447341451,
        "z": -0.0020700288982918613
      },
      "errorBound": 4.9999999999999995e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 5,
      "time": 1,
      "position": {
        "x": 3.492733467428632,
        "y": 5.48323989002862,
        "z": 5.092028056060144
      },
      "velocity": {
        "x": -0.007665274533772746,
        "y": 0.0005228244734145106,
        "z": 0.0020700288982918604
      },
      "errorBound": 4.9999999999999995e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 5,
      "time": 1,
      "position": {
        "x": 3.455266532571369,
        "y": 6.43876010997138,
        "z": 5.275971943939855
      },
      "velocity": {
        "x": -0.04433472546622726,
        "y": -0.0785228244734145,
        "z": 0.005929971101708139
      },
      "errorBound": 4.9999999999999995e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 5,
      "time": 1,
      "position": {
        "x": 4.544733467428633,
        "y": 3.5092398900286215,
        "z": 4.904028056060144
      },
      "velocity": {
        "x": 0.04433472546622726,
        "y": 0.026522824473414496,
        "z": -0.005929971101708139
      },
      "errorBound": 4.9999999999999995e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 5,
      "time": 1,
      "position": {
        "x": 4.50726653257137,
        "y": 4.464760109971378,
        "z": 5.087971943939856
      },
      "velocity": {
        "x": 0.007665274533772746,
        "y": -0.0525228244734145,
        "z": -0.0020700288982918613
      },
      "errorBound": 4.9999999999999995e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 5,
      "time": 1,
      "position": {
        "x": 4.49273346742863,
        "y": 5.5092398900286215,
        "z": 5.272028056060144
      },
      "velocity": {
        "x": -0.007665274533772747,
        "y": 0.026522824473414496,
        "z": 0.002070028898291861
      },
      "errorBound": 4.9999999999999995e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 5,
      "time": 1,
      "position": {
        "x": 4.455266532571367,
        "y": 6.464760109971378,
        "z": 4.735971943939856
      },
      "velocity": {
        "x": -0.04433472546622726,
        "y": -0.0525228244734145,
        "z": 0.005929971101708139
      },
      "errorBound": 4.9999999999999995e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 5,
      "time": 1,
      "position": {
        "x": 5.544733467428633,
        "y": 3.5352398900286213,
        "z": 5.084028056060144
      },
      "velocity": {
        "x": 0.04433472546622726,
        "y": 0.05252282447341449,
        "z": -0.005929971101708139
      },
      "errorBound": 4.9999999999999995e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 5,
      "time": 1,
      "position": {
        "x": 5.50726653257137,
        "y": 4.4907601099713785,
        "z": 5.267971943939855
      },
      "velocity": {
        "x": 0.007665274533772746,
        "y": -0.026522824473414496,
        "z": -0.002070028898291861
      },
      "errorBound": 4.9999999999999995e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 5,
      "time": 1,
      "position": {
        "x": 5.49273346742863,
        "y": 5.535239890028622,
        "z": 4.732028056060145
      },
      "velocity": {
        "x": -0.007665274533772746,
        "y": 0.0525228244734145,
        "z": 0.0020700288982918613
      },
      "errorBound": 4.9999999999999995e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 5,
      "time": 1,
      "position": {
        "x": 5.455266532571367,
        "y": 6.4907601099713785,
        "z": 4.915971943939856
      },
      "velocity": {
        "x": -0.04433472546622726,
        "y": -0.026522824473414496,
        "z": 0.005929971101708139
      },
      "errorBound": 4.9999999999999995e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 5,
      "time": 1,
      "position": {
        "x": 6.544733467428633,
        "y": 3.561239890028621,
        "z": 5.264028056060144
      },
      "velocity": {
        "x": 0.04433472546622726,
        "y": 0.0785228244734145,
        "z": -0.005929971101708139
      },
      "errorBound": 4.9999999999999995e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 5,
      "time": 1,
      "position": {
        "x": 6.50726653257137,
        "y": 4.51676010997138,
        "z": 4.727971943939856
      },
      "velocity": {
        "x": 0.0076652745337727445,
        "y": -0.0005228244734145088,
        "z": -0.0020700288982918604
      },
      "errorBound": 4.9999999999999995e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 5,
      "time": 1,
      "position": {
        "x": 6.49273346742863,
        "y": 5.56123989002862,
        "z": 4.912028056060144
      },
      "velocity": {
        "x": -0.007665274533772745,
        "y": 0.07852282447341451,
        "z": 0.002070028898291861
      },
      "errorBound": 4.9999999999999995e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 5,
      "time": 1,
      "position": {
        "x": 6.455266532571367,
        "y": 6.51676010997138,
        "z": 5.095971943939856
      },
      "velocity": {
        "x": -0.04433472546622726,
        "y": -0.0005228244734145036,
        "z": 0.005929971101708139
      },
      "errorBound": 4.9999999999999995e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 6,
      "time": 1.2,
      "position": {
        "x": 3.5535344707165275,
        "y": 3.4850261705104035,
        "z": 4.722849003082471
      },
      "velocity": {
        "x": 0.044005016439483347,
        "y": 0.008931402408910775,
        "z": -0.005895264888366678
      },
      "errorBound": 6e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 6,
      "time": 1.2,
      "position": {
        "x": 3.5088655292834714,
        "y": 4.421373829489598,
        "z": 4.9075509969175295
      },
      "velocity": {
        "x": 0.00799498356051666,
        "y": -0.08693140240891077,
        "z": -0.0021047351116333228
      },
      "errorBound": 6e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 6,
      "time": 1.2,
      "position": {
        "x": 3.4911344707165286,
        "y": 5.485026170510402,
        "z": 5.0924490030824705
      },
      "velocity": {
        "x": -0.00799498356051666,
        "y": 0.00893140240891078,
        "z": 0.0021047351116333223
      },
      "errorBound": 6e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 6,
      "time": 1.2,
      "position": {
        "x": 3.4464655292834725,
        "y": 6.421373829489598,
        "z": 5.277150996917529
      },
      "velocity": {
        "x": -0.04400501643948334,
        "y": -0.08693140240891076,
        "z": 0.005895264888366678
      },
      "errorBound": 6e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 6,
      "time": 1.2,
      "position": {
        "x": 4.553534470716529,
        "y": 3.5162261705104036,
        "z": 4.902849003082471
      },
      "velocity": {
        "x": 0.04400501643948334,
        "y": 0.03493140240891077,
        "z": -0.005895264888366678
      },
      "errorBound": 6e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 6,
      "time": 1.2,
      "position": {
        "x": 4.508865529283473,
        "y": 4.452573829489595,
        "z": 5.087550996917529
      },
      "velocity": {
        "x": 0.00799498356051666,
        "y": -0.06093140240891077,
        "z": -0.002104735111633323
      },
      "errorBound": 6e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 6,
      "time": 1.2,
      "position": {
        "x": 4.491134470716527,
        "y": 5.516226170510404,
        "z": 5.27244900308247
      },
      "velocity": {
        "x": -0.00799498356051666,
        "y": 0.03493140240891077,
        "z": 0.0021047351116333228
      },
      "errorBound": 6e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 6,
      "time": 1.2,
      "position": {
        "x": 4.446465529283471,
        "y": 6.452573829489595,
        "z": 4.73715099691753
      },
      "velocity": {
        "x": -0.04400501643948334,
        "y": -0.06093140240891077,
        "z": 0.005895264888366678
      },
      "errorBound": 6e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 6,
      "time": 1.2,
      "position": {
        "x": 5.553534470716529,
        "y": 3.5474261705104033,
        "z": 5.082849003082471
      },
      "velocity": {
        "x": 0.044005016439483347,
        "y": 0.06093140240891076,
        "z": -0.005895264888366678
      },
      "errorBound": 6e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 6,
      "time": 1.2,
      "position": {
        "x": 5.508865529283473,
        "y": 4.483773829489596,
        "z": 5.267550996917529
      },
      "velocity": {
        "x": 0.007994983560516662,
        "y": -0.03493140240891077,
        "z": -0.0021047351116333228
      },
      "errorBound": 6e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 6,
      "time": 1.2,
      "position": {
        "x": 5.491134470716527,
        "y": 5.547426170510405,
        "z": 4.732449003082471
      },
      "velocity": {
        "x": -0.00799498356051666,
        "y": 0.06093140240891077,
        "z": 0.002104735111633323
      },
      "errorBound": 6e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 6,
      "time": 1.2,
      "position": {
        "x": 5.446465529283471,
        "y": 6.483773829489596,
        "z": 4.917150996917529
      },
      "velocity": {
        "x": -0.044005016439483347,
        "y": -0.03493140240891076,
        "z": 0.005895264888366678
      },
      "errorBound": 6e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 6,
      "time": 1.2,
      "position": {
        "x": 6.553534470716529,
        "y": 3.578626170510403,
        "z": 5.26284900308247
      },
      "velocity": {
        "x": 0.044005016439483347,
        "y": 0.08693140240891076,
        "z": -0.005895264888366678
      },
      "errorBound": 6e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 6,
      "time": 1.2,
      "position": {
        "x": 6.508865529283473,
        "y": 4.514973829489598,
        "z": 4.72755099691753
      },
      "velocity": {
        "x": 0.007994983560516658,
        "y": -0.008931402408910778,
        "z": -0.0021047351116333223
      },
      "errorBound": 6e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 6,
      "time": 1.2,
      "position": {
        "x": 6.491134470716527,
        "y": 5.578626170510402,
        "z": 4.912449003082471
      },
      "velocity": {
        "x": -0.00799498356051666,
        "y": 0.08693140240891077,
        "z": 0.0021047351116333223
      },
      "errorBound": 6e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 6,
      "time": 1.2,
      "position": {
        "x": 6.446465529283471,
        "y": 6.514973829489598,
        "z": 5.097150996917529
      },
      "velocity": {
        "x": -0.04400501643948334,
        "y": -0.008931402408910771,
        "z": 0.005895264888366678
      },
      "errorBound": 6e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 7,
      "time": 1.4,
      "position": {
        "x": 3.562256856667502,
        "y": 3.488460422871989,
        "z": 4.721678225613948
      },
      "velocity": {
        "x": 0.04361192975487246,
        "y": 0.017171261807927676,
        "z": -0.0058538873426181625
      },
      "errorBound": 6.999999999999999e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 7,
      "time": 1.4,
      "position": {
        "x": 3.5105431433324967,
        "y": 4.4023395771280125,
        "z": 4.907121774386053
      },
      "velocity": {
        "x": 0.008388070245127551,
        "y": -0.09517126180792768,
        "z": -0.0021461126573818377
      },
      "errorBound": 6.999999999999999e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 7,
      "time": 1.4,
      "position": {
        "x": 3.4894568566675033,
        "y": 5.488460422871987,
        "z": 5.092878225613947
      },
      "velocity": {
        "x": -0.00838807024512755,
        "y": 0.017171261807927683,
        "z": 0.0021461126573818377
      },
      "errorBound": 6.999999999999999e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 7,
      "time": 1.4,
      "position": {
        "x": 3.437743143332498,
        "y": 6.4023395771280125,
        "z": 5.278321774386052
      },
      "velocity": {
        "x": -0.04361192975487245,
        "y": -0.09517126180792766,
        "z": 0.0058538873426181625
      },
      "errorBound": 6.999999999999999e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 7,
      "time": 1.4,
      "position": {
        "x": 4.562256856667504,
        "y": 3.5248604228719893,
        "z": 4.9016782256139475
      },
      "velocity": {
        "x": 0.04361192975487245,
        "y": 0.04317126180792767,
        "z": -0.0058538873426181625
      },
      "errorBound": 6.999999999999999e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 7,
      "time": 1.4,
      "position": {
        "x": 4.510543143332499,
        "y": 4.438739577128009,
        "z": 5.087121774386053
      },
      "velocity": {
        "x": 0.008388070245127551,
        "y": -0.06917126180792767,
        "z": -0.002146112657381838
      },
      "errorBound": 6.999999999999999e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 7,
      "time": 1.4,
      "position": {
        "x": 4.489456856667501,
        "y": 5.524860422871989,
        "z": 5.272878225613947
      },
      "velocity": {
        "x": -0.008388070245127551,
        "y": 0.04317126180792767,
        "z": 0.002146112657381838
      },
      "errorBound": 6.999999999999999e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 7,
      "time": 1.4,
      "position": {
        "x": 4.437743143332496,
        "y": 6.438739577128009,
        "z": 4.738321774386053
      },
      "velocity": {
        "x": -0.04361192975487245,
        "y": -0.06917126180792768,
        "z": 0.0058538873426181625
      },
      "errorBound": 6.999999999999999e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 7,
      "time": 1.4,
      "position": {
        "x": 5.562256856667504,
        "y": 3.561260422871989,
        "z": 5.081678225613947
      },
      "velocity": {
        "x": 0.04361192975487246,
        "y": 0.06917126180792767,
        "z": -0.0058538873426181625
      },
      "errorBound": 6.999999999999999e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 7,
      "time": 1.4,
      "position": {
        "x": 5.510543143332499,
        "y": 4.475139577128011,
        "z": 5.267121774386053
      },
      "velocity": {
        "x": 0.008388070245127553,
        "y": -0.04317126180792767,
        "z": -0.0021461126573818377
      },
      "errorBound": 6.999999999999999e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 7,
      "time": 1.4,
      "position": {
        "x": 5.489456856667501,
        "y": 5.561260422871991,
        "z": 4.732878225613947
      },
      "velocity": {
        "x": -0.008388070245127551,
        "y": 0.06917126180792767,
        "z": 0.0021461126573818386
      },
      "errorBound": 6.999999999999999e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 7,
      "time": 1.4,
      "position": {
        "x": 5.437743143332496,
        "y": 6.475139577128011,
        "z": 4.918321774386053
      },
      "velocity": {
        "x": -0.04361192975487246,
        "y": -0.043171261807927665,
        "z": 0.0058538873426181625
      },
      "errorBound": 6.999999999999999e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 7,
      "time": 1.4,
      "position": {
        "x": 6.562256856667504,
        "y": 3.5976604228719884,
        "z": 5.261678225613947
      },
      "velocity": {
        "x": 0.04361192975487246,
        "y": 0.09517126180792766,
        "z": -0.0058538873426181625
      },
      "errorBound": 6.999999999999999e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 7,
      "time": 1.4,
      "position": {
        "x": 6.510543143332499,
        "y": 4.511539577128013,
        "z": 4.727121774386053
      },
      "velocity": {
        "x": 0.00838807024512755,
        "y": -0.017171261807927683,
        "z": -0.0021461126573818377
      },
      "errorBound": 6.999999999999999e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 7,
      "time": 1.4,
      "position": {
        "x": 6.489456856667501,
        "y": 5.5976604228719875,
        "z": 4.912878225613947
      },
      "velocity": {
        "x": -0.008388070245127551,
        "y": 0.09517126180792768,
        "z": 0.0021461126573818373
      },
      "errorBound": 6.999999999999999e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 7,
      "time": 1.4,
      "position": {
        "x": 6.437743143332496,
        "y": 6.511539577128013,
        "z": 5.0983217743860525
      },
      "velocity": {
        "x": -0.04361192975487245,
        "y": -0.017171261807927676,
        "z": 0.0058538873426181625
      },
      "errorBound": 6.999999999999999e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 8,
      "time": 1.5999999999999999,
      "position": {
        "x": 3.5708882264830066,
        "y": 3.493503102545065,
        "z": 4.720517028791263
      },
      "velocity": {
        "x": 0.043156849077524415,
        "y": 0.025213398365380675,
        "z": -0.005805984113423633
      },
      "errorBound": 8e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 8,
      "time": 1.5999999999999999,
      "position": {
        "x": 3.5123117735169918,
        "y": 4.381696897454936,
        "z": 4.906682971208737
      },
      "velocity": {
        "x": 0.008843150922475593,
        "y": -0.10321339836538068,
        "z": -0.002194015886576367
      },
      "errorBound": 8e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 8,
      "time": 1.5999999999999999,
      "position": {
        "x": 3.4876882264830082,
        "y": 5.493503102545064,
        "z": 5.093317028791263
      },
      "velocity": {
        "x": -0.008843150922475592,
        "y": 0.025213398365380682,
        "z": 0.002194015886576367
      },
      "errorBound": 8e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 8,
      "time": 1.5999999999999999,
      "position": {
        "x": 3.4291117735169934,
        "y": 6.381696897454936,
        "z": 5.279482971208737
      },
      "velocity": {
        "x": -0.04315684907752441,
        "y": -0.10321339836538065,
        "z": 0.005805984113423633
      },
      "errorBound": 8e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 8,
      "time": 1.5999999999999999,
      "position": {
        "x": 4.570888226483008,
        "y": 3.5351031025450657,
        "z": 4.9005170287912625
      },
      "velocity": {
        "x": 0.04315684907752441,
        "y": 0.05121339836538067,
        "z": -0.005805984113423633
      },
      "errorBound": 8e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 8,
      "time": 1.5999999999999999,
      "position": {
        "x": 4.512311773516994,
        "y": 4.423296897454933,
        "z": 5.086682971208737
      },
      "velocity": {
        "x": 0.008843150922475593,
        "y": -0.07721339836538066,
        "z": -0.0021940158865763676
      },
      "errorBound": 8e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 8,
      "time": 1.5999999999999999,
      "position": {
        "x": 4.487688226483006,
        "y": 5.535103102545065,
        "z": 5.273317028791262
      },
      "velocity": {
        "x": -0.008843150922475593,
        "y": 0.05121339836538067,
        "z": 0.0021940158865763676
      },
      "errorBound": 8e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 8,
      "time": 1.5999999999999999,
      "position": {
        "x": 4.429111773516992,
        "y": 6.423296897454933,
        "z": 4.739482971208738
      },
      "velocity": {
        "x": -0.04315684907752441,
        "y": -0.07721339836538069,
        "z": 0.005805984113423633
      },
      "errorBound": 8e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 8,
      "time": 1.5999999999999999,
      "position": {
        "x": 5.570888226483008,
        "y": 3.576703102545065,
        "z": 5.080517028791262
      },
      "velocity": {
        "x": 0.043156849077524415,
        "y": 0.07721339836538066,
        "z": -0.005805984113423633
      },
      "errorBound": 8e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 8,
      "time": 1.5999999999999999,
      "position": {
        "x": 5.512311773516994,
        "y": 4.464896897454935,
        "z": 5.266682971208737
      },
      "velocity": {
        "x": 0.008843150922475595,
        "y": -0.05121339836538067,
        "z": -0.002194015886576367
      },
      "errorBound": 8e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 8,
      "time": 1.5999999999999999,
      "position": {
        "x": 5.487688226483006,
        "y": 5.576703102545067,
        "z": 4.733317028791263
      },
      "velocity": {
        "x": -0.008843150922475593,
        "y": 0.07721339836538066,
        "z": 0.002194015886576368
      },
      "errorBound": 8e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 8,
      "time": 1.5999999999999999,
      "position": {
        "x": 5.429111773516992,
        "y": 6.464896897454935,
        "z": 4.919482971208738
      },
      "velocity": {
        "x": -0.043156849077524415,
        "y": -0.051213398365380663,
        "z": 0.005805984113423633
      },
      "errorBound": 8e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 8,
      "time": 1.5999999999999999,
      "position": {
        "x": 6.570888226483008,
        "y": 3.6183031025450645,
        "z": 5.260517028791262
      },
      "velocity": {
        "x": 0.043156849077524415,
        "y": 0.10321339836538065,
        "z": -0.005805984113423633
      },
      "errorBound": 8e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 8,
      "time": 1.5999999999999999,
      "position": {
        "x": 6.512311773516994,
        "y": 4.506496897454936,
        "z": 4.726682971208738
      },
      "velocity": {
        "x": 0.008843150922475592,
        "y": -0.025213398365380682,
        "z": -0.002194015886576367
      },
      "errorBound": 8e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 8,
      "time": 1.5999999999999999,
      "position": {
        "x": 6.487688226483006,
        "y": 5.618303102545064,
        "z": 4.913317028791263
      },
      "velocity": {
        "x": -0.008843150922475593,
        "y": 0.10321339836538068,
        "z": 0.0021940158865763667
      },
      "errorBound": 8e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 8,
      "time": 1.5999999999999999,
      "position": {
        "x": 6.429111773516992,
        "y": 6.506496897454936,
        "z": 5.0994829712087375
      },
      "velocity": {
        "x": -0.04315684907752441,
        "y": -0.025213398365380675,
        "z": 0.005805984113423633
      },
      "errorBound": 8e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 9,
      "time": 1.7999999999999998,
      "position": {
        "x": 3.5794165017412913,
        "y": 3.500109003297182,
        "z": 4.719366684027233
      },
      "velocity": {
        "x": 0.042641376291423484,
        "y": 0.03302950376058753,
        "z": -0.005751723820149853
      },
      "errorBound": 9e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 9,
      "time": 1.7999999999999998,
      "position": {
        "x": 3.5141834982587072,
        "y": 4.359490996702818,
        "z": 4.906233315972767
      },
      "velocity": {
        "x": 0.00935862370857652,
        "y": -0.11102950376058754,
        "z": -0.0022482761798501465
      },
      "errorBound": 9e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 9,
      "time": 1.7999999999999998,
      "position": {
        "x": 3.4858165017412928,
        "y": 5.500109003297181,
        "z": 5.093766684027233
      },
      "velocity": {
        "x": -0.00935862370857652,
        "y": 0.03302950376058754,
        "z": 0.0022482761798501465
      },
      "errorBound": 9e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 9,
      "time": 1.7999999999999998,
      "position": {
        "x": 3.4205834982587087,
        "y": 6.359490996702818,
        "z": 5.280633315972767
      },
      "velocity": {
        "x": -0.04264137629142348,
        "y": -0.11102950376058751,
        "z": 0.005751723820149853
      },
      "errorBound": 9e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 9,
      "time": 1.7999999999999998,
      "position": {
        "x": 4.579416501741293,
        "y": 3.5469090032971833,
        "z": 4.899366684027233
      },
      "velocity": {
        "x": 0.04264137629142348,
        "y": 0.05902950376058753,
        "z": -0.005751723820149854
      },
      "errorBound": 9e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 9,
      "time": 1.7999999999999998,
      "position": {
        "x": 4.514183498258709,
        "y": 4.406290996702816,
        "z": 5.086233315972767
      },
      "velocity": {
        "x": 0.00935862370857652,
        "y": -0.08502950376058752,
        "z": -0.002248276179850147
      },
      "errorBound": 9e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 9,
      "time": 1.7999999999999998,
      "position": {
        "x": 4.485816501741291,
        "y": 5.546909003297182,
        "z": 5.273766684027232
      },
      "velocity": {
        "x": -0.00935862370857652,
        "y": 0.05902950376058753,
        "z": 0.002248276179850147
      },
      "errorBound": 9e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 9,
      "time": 1.7999999999999998,
      "position": {
        "x": 4.420583498258707,
        "y": 6.406290996702816,
        "z": 4.740633315972768
      },
      "velocity": {
        "x": -0.04264137629142348,
        "y": -0.08502950376058754,
        "z": 0.005751723820149854
      },
      "errorBound": 9e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 9,
      "time": 1.7999999999999998,
      "position": {
        "x": 5.579416501741293,
        "y": 3.5937090032971826,
        "z": 5.0793666840272325
      },
      "velocity": {
        "x": 0.042641376291423484,
        "y": 0.08502950376058752,
        "z": -0.005751723820149854
      },
      "errorBound": 9e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 9,
      "time": 1.7999999999999998,
      "position": {
        "x": 5.514183498258709,
        "y": 4.453090996702818,
        "z": 5.266233315972767
      },
      "velocity": {
        "x": 0.009358623708576524,
        "y": -0.05902950376058753,
        "z": -0.002248276179850146
      },
      "errorBound": 9e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 9,
      "time": 1.7999999999999998,
      "position": {
        "x": 5.485816501741291,
        "y": 5.593709003297184,
        "z": 4.733766684027233
      },
      "velocity": {
        "x": -0.009358623708576522,
        "y": 0.08502950376058752,
        "z": 0.0022482761798501474
      },
      "errorBound": 9e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 9,
      "time": 1.7999999999999998,
      "position": {
        "x": 5.420583498258707,
        "y": 6.453090996702818,
        "z": 4.9206333159727675
      },
      "velocity": {
        "x": -0.042641376291423484,
        "y": -0.05902950376058752,
        "z": 0.005751723820149854
      },
      "errorBound": 9e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 9,
      "time": 1.7999999999999998,
      "position": {
        "x": 6.579416501741293,
        "y": 3.640509003297182,
        "z": 5.259366684027232
      },
      "velocity": {
        "x": 0.042641376291423484,
        "y": 0.11102950376058751,
        "z": -0.005751723820149854
      },
      "errorBound": 9e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 9,
      "time": 1.7999999999999998,
      "position": {
        "x": 6.514183498258709,
        "y": 4.499890996702819,
        "z": 4.726233315972768
      },
      "velocity": {
        "x": 0.00935862370857652,
        "y": -0.03302950376058754,
        "z": -0.0022482761798501465
      },
      "errorBound": 9e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 9,
      "time": 1.7999999999999998,
      "position": {
        "x": 6.485816501741291,
        "y": 5.640509003297182,
        "z": 4.913766684027233
      },
      "velocity": {
        "x": -0.00935862370857652,
        "y": 0.11102950376058754,
        "z": 0.002248276179850146
      },
      "errorBound": 9e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 9,
      "time": 1.7999999999999998,
      "position": {
        "x": 6.420583498258707,
        "y": 6.499890996702819,
        "z": 5.100633315972767
      },
      "velocity": {
        "x": -0.04264137629142348,
        "y": -0.03302950376058753,
        "z": 0.005751723820149854
      },
      "errorBound": 9e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 10,
      "time": 1.9999999999999998,
      "position": {
        "x": 3.587829966913447,
        "y": 3.508227416357694,
        "z": 4.718228424535427
      },
      "velocity": {
        "x": 0.042067325860776744,
        "y": 0.040592065302557115,
        "z": -0.005691297459029149
      },
      "errorBound": 9.999999999999999e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 10,
      "time": 1.9999999999999998,
      "position": {
        "x": 3.516170033086552,
        "y": 4.335772583642306,
        "z": 4.905771575464573
      },
      "velocity": {
        "x": 0.00993267413922326,
        "y": -0.11859206530255713,
        "z": -0.002308702540970851
      },
      "errorBound": 9.999999999999999e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 10,
      "time": 1.9999999999999998,
      "position": {
        "x": 3.483829966913448,
        "y": 5.508227416357693,
        "z": 5.094228424535427
      },
      "velocity": {
        "x": -0.00993267413922326,
        "y": 0.04059206530255713,
        "z": 0.002308702540970851
      },
      "errorBound": 9.999999999999999e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 10,
      "time": 1.9999999999999998,
      "position": {
        "x": 3.412170033086553,
        "y": 6.335772583642306,
        "z": 5.281771575464573
      },
      "velocity": {
        "x": -0.04206732586077674,
        "y": -0.1185920653025571,
        "z": 0.005691297459029148
      },
      "errorBound": 9.999999999999999e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 10,
      "time": 1.9999999999999998,
      "position": {
        "x": 4.587829966913448,
        "y": 3.560227416357695,
        "z": 4.898228424535427
      },
      "velocity": {
        "x": 0.04206732586077674,
        "y": 0.06659206530255711,
        "z": -0.0056912974590291494
      },
      "errorBound": 9.999999999999999e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 10,
      "time": 1.9999999999999998,
      "position": {
        "x": 4.516170033086554,
        "y": 4.387772583642304,
        "z": 5.085771575464573
      },
      "velocity": {
        "x": 0.00993267413922326,
        "y": -0.0925920653025571,
        "z": -0.002308702540970851
      },
      "errorBound": 9.999999999999999e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 10,
      "time": 1.9999999999999998,
      "position": {
        "x": 4.483829966913446,
        "y": 5.5602274163576935,
        "z": 5.274228424535426
      },
      "velocity": {
        "x": -0.00993267413922326,
        "y": 0.06659206530255711,
        "z": 0.002308702540970851
      },
      "errorBound": 9.999999999999999e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 10,
      "time": 1.9999999999999998,
      "position": {
        "x": 4.412170033086552,
        "y": 6.387772583642304,
        "z": 4.741771575464574
      },
      "velocity": {
        "x": -0.04206732586077674,
        "y": -0.09259206530255713,
        "z": 0.0056912974590291494
      },
      "errorBound": 9.999999999999999e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 10,
      "time": 1.9999999999999998,
      "position": {
        "x": 5.587829966913448,
        "y": 3.612227416357694,
        "z": 5.0782284245354266
      },
      "velocity": {
        "x": 0.042067325860776744,
        "y": 0.0925920653025571,
        "z": -0.0056912974590291494
      },
      "errorBound": 9.999999999999999e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 10,
      "time": 1.9999999999999998,
      "position": {
        "x": 5.516170033086554,
        "y": 4.4397725836423065,
        "z": 5.265771575464573
      },
      "velocity": {
        "x": 0.009932674139223264,
        "y": -0.06659206530255711,
        "z": -0.0023087025409708507
      },
      "errorBound": 9.999999999999999e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 10,
      "time": 1.9999999999999998,
      "position": {
        "x": 5.483829966913446,
        "y": 5.612227416357696,
        "z": 4.734228424535427
      },
      "velocity": {
        "x": -0.009932674139223262,
        "y": 0.0925920653025571,
        "z": 0.002308702540970852
      },
      "errorBound": 9.999999999999999e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 10,
      "time": 1.9999999999999998,
      "position": {
        "x": 5.412170033086552,
        "y": 6.4397725836423065,
        "z": 4.9217715754645734
      },
      "velocity": {
        "x": -0.042067325860776744,
        "y": -0.06659206530255711,
        "z": 0.005691297459029149
      },
      "errorBound": 9.999999999999999e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 10,
      "time": 1.9999999999999998,
      "position": {
        "x": 6.587829966913448,
        "y": 3.664227416357693,
        "z": 5.258228424535426
      },
      "velocity": {
        "x": 0.042067325860776744,
        "y": 0.1185920653025571,
        "z": -0.0056912974590291494
      },
      "errorBound": 9.999999999999999e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 10,
      "time": 1.9999999999999998,
      "position": {
        "x": 6.516170033086554,
        "y": 4.491772583642307,
        "z": 4.725771575464574
      },
      "velocity": {
        "x": 0.00993267413922326,
        "y": -0.04059206530255713,
        "z": -0.0023087025409708507
      },
      "errorBound": 9.999999999999999e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 10,
      "time": 1.9999999999999998,
      "position": {
        "x": 6.483829966913446,
        "y": 5.664227416357694,
        "z": 4.914228424535427
      },
      "velocity": {
        "x": -0.00993267413922326,
        "y": 0.11859206530255713,
        "z": 0.0023087025409708503
      },
      "errorBound": 9.999999999999999e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 10,
      "time": 1.9999999999999998,
      "position": {
        "x": 6.412170033086552,
        "y": 6.491772583642307,
        "z": 5.101771575464573
      },
      "velocity": {
        "x": -0.04206732586077674,
        "y": -0.04059206530255712,
        "z": 0.0056912974590291494
      },
      "errorBound": 9.999999999999999e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 11,
      "time": 2.1999999999999997,
      "position": {
        "x": 3.5961173106020667,
        "y": 3.5178023089126262,
        "z": 4.7171034409892565
      },
      "velocity": {
        "x": 0.041436718443100075,
        "y": 0.0478744627746617,
        "z": -0.005624917730852659
      },
      "errorBound": 1.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 11,
      "time": 2.1999999999999997,
      "position": {
        "x": 3.5182826893979318,
        "y": 4.3105976910873745,
        "z": 4.905296559010744
      },
      "velocity": {
        "x": 0.010563281556899933,
        "y": -0.12587446277466172,
        "z": -0.0023750822691473413
      },
      "errorBound": 1.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 11,
      "time": 2.1999999999999997,
      "position": {
        "x": 3.4817173106020682,
        "y": 5.517802308912625,
        "z": 5.094703440989256
      },
      "velocity": {
        "x": -0.010563281556899933,
        "y": 0.04787446277466171,
        "z": 0.0023750822691473413
      },
      "errorBound": 1.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 11,
      "time": 2.1999999999999997,
      "position": {
        "x": 3.4038826893979333,
        "y": 6.3105976910873745,
        "z": 5.2828965590107435
      },
      "velocity": {
        "x": -0.04143671844310007,
        "y": -0.1258744627746617,
        "z": 0.005624917730852658
      },
      "errorBound": 1.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 11,
      "time": 2.1999999999999997,
      "position": {
        "x": 4.596117310602068,
        "y": 3.575002308912627,
        "z": 4.897103440989256
      },
      "velocity": {
        "x": 0.04143671844310007,
        "y": 0.0738744627746617,
        "z": -0.00562491773085266
      },
      "errorBound": 1.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 11,
      "time": 2.1999999999999997,
      "position": {
        "x": 4.5182826893979335,
        "y": 4.367797691087372,
        "z": 5.085296559010744
      },
      "velocity": {
        "x": 0.010563281556899931,
        "y": -0.0998744627746617,
        "z": -0.0023750822691473413
      },
      "errorBound": 1.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 11,
      "time": 2.1999999999999997,
      "position": {
        "x": 4.4817173106020665,
        "y": 5.575002308912626,
        "z": 5.2747034409892555
      },
      "velocity": {
        "x": -0.010563281556899931,
        "y": 0.0738744627746617,
        "z": 0.0023750822691473413
      },
      "errorBound": 1.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 11,
      "time": 2.1999999999999997,
      "position": {
        "x": 4.403882689397932,
        "y": 6.367797691087372,
        "z": 4.742896559010744
      },
      "velocity": {
        "x": -0.04143671844310007,
        "y": -0.09987446277466172,
        "z": 0.00562491773085266
      },
      "errorBound": 1.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 11,
      "time": 2.1999999999999997,
      "position": {
        "x": 5.596117310602068,
        "y": 3.632202308912626,
        "z": 5.077103440989256
      },
      "velocity": {
        "x": 0.041436718443100075,
        "y": 0.0998744627746617,
        "z": -0.00562491773085266
      },
      "errorBound": 1.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 11,
      "time": 2.1999999999999997,
      "position": {
        "x": 5.5182826893979335,
        "y": 4.424997691087374,
        "z": 5.265296559010744
      },
      "velocity": {
        "x": 0.010563281556899935,
        "y": -0.0738744627746617,
        "z": -0.002375082269147341
      },
      "errorBound": 1.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 11,
      "time": 2.1999999999999997,
      "position": {
        "x": 5.4817173106020665,
        "y": 5.632202308912628,
        "z": 4.734703440989256
      },
      "velocity": {
        "x": -0.010563281556899933,
        "y": 0.0998744627746617,
        "z": 0.002375082269147342
      },
      "errorBound": 1.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 11,
      "time": 2.1999999999999997,
      "position": {
        "x": 5.403882689397932,
        "y": 6.424997691087374,
        "z": 4.922896559010744
      },
      "velocity": {
        "x": -0.041436718443100075,
        "y": -0.0738744627746617,
        "z": 0.005624917730852659
      },
      "errorBound": 1.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 11,
      "time": 2.1999999999999997,
      "position": {
        "x": 6.596117310602068,
        "y": 3.6894023089126255,
        "z": 5.257103440989256
      },
      "velocity": {
        "x": 0.041436718443100075,
        "y": 0.1258744627746617,
        "z": -0.005624917730852659
      },
      "errorBound": 1.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 11,
      "time": 2.1999999999999997,
      "position": {
        "x": 6.5182826893979335,
        "y": 4.482197691087375,
        "z": 4.7252965590107445
      },
      "velocity": {
        "x": 0.010563281556899931,
        "y": -0.047874462774661716,
        "z": -0.002375082269147341
      },
      "errorBound": 1.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 11,
      "time": 2.1999999999999997,
      "position": {
        "x": 6.4817173106020665,
        "y": 5.6894023089126255,
        "z": 4.914703440989256
      },
      "velocity": {
        "x": -0.010563281556899933,
        "y": 0.12587446277466172,
        "z": 0.0023750822691473404
      },
      "errorBound": 1.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 11,
      "time": 2.1999999999999997,
      "position": {
        "x": 6.403882689397932,
        "y": 6.482197691087375,
        "z": 5.102896559010744
      },
      "velocity": {
        "x": -0.04143671844310007,
        "y": -0.04787446277466171,
        "z": 0.00562491773085266
      },
      "errorBound": 1.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 12,
      "time": 2.4,
      "position": {
        "x": 3.6042676653573675,
        "y": 3.528772521340186,
        "z": 4.7159928773308035
      },
      "velocity": {
        "x": 0.04075177377650369,
        "y": 0.054851062137799486,
        "z": -0.005552818292263564
      },
      "errorBound": 1.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 12,
      "time": 2.4,
      "position": {
        "x": 3.520532334642631,
        "y": 4.284027478659815,
        "z": 4.904807122669197
      },
      "velocity": {
        "x": 0.011248226223496319,
        "y": -0.1328510621377995,
        "z": -0.002447181707736436
      },
      "errorBound": 1.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 12,
      "time": 2.4,
      "position": {
        "x": 3.479467665357369,
        "y": 5.528772521340184,
        "z": 5.095192877330803
      },
      "velocity": {
        "x": -0.011248226223496319,
        "y": 0.05485106213779949,
        "z": 0.002447181707736436
      },
      "errorBound": 1.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 12,
      "time": 2.4,
      "position": {
        "x": 3.3957323346426325,
        "y": 6.284027478659815,
        "z": 5.2840071226691965
      },
      "velocity": {
        "x": -0.040751773776503686,
        "y": -0.13285106213779949,
        "z": 0.005552818292263563
      },
      "errorBound": 1.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 12,
      "time": 2.4,
      "position": {
        "x": 4.604267665357368,
        "y": 3.591172521340187,
        "z": 4.895992877330803
      },
      "velocity": {
        "x": 0.04075177377650368,
        "y": 0.08085106213779948,
        "z": -0.005552818292263565
      },
      "errorBound": 1.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 12,
      "time": 2.4,
      "position": {
        "x": 4.520532334642633,
        "y": 4.346427478659812,
        "z": 5.084807122669197
      },
      "velocity": {
        "x": 0.011248226223496317,
        "y": -0.10685106213779948,
        "z": -0.002447181707736436
      },
      "errorBound": 1.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 12,
      "time": 2.4,
      "position": {
        "x": 4.479467665357367,
        "y": 5.5911725213401855,
        "z": 5.275192877330802
      },
      "velocity": {
        "x": -0.011248226223496317,
        "y": 0.08085106213779948,
        "z": 0.002447181707736436
      },
      "errorBound": 1.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 12,
      "time": 2.4,
      "position": {
        "x": 4.395732334642632,
        "y": 6.346427478659812,
        "z": 4.744007122669197
      },
      "velocity": {
        "x": -0.04075177377650368,
        "y": -0.1068510621377995,
        "z": 0.005552818292263565
      },
      "errorBound": 1.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 12,
      "time": 2.4,
      "position": {
        "x": 5.604267665357368,
        "y": 3.653572521340186,
        "z": 5.075992877330803
      },
      "velocity": {
        "x": 0.040751773776503686,
        "y": 0.10685106213779948,
        "z": -0.005552818292263565
      },
      "errorBound": 1.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 12,
      "time": 2.4,
      "position": {
        "x": 5.520532334642633,
        "y": 4.4088274786598145,
        "z": 5.264807122669197
      },
      "velocity": {
        "x": 0.01124822622349632,
        "y": -0.08085106213779948,
        "z": -0.0024471817077364355
      },
      "errorBound": 1.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 12,
      "time": 2.4,
      "position": {
        "x": 5.479467665357367,
        "y": 5.653572521340188,
        "z": 4.735192877330803
      },
      "velocity": {
        "x": -0.011248226223496319,
        "y": 0.10685106213779948,
        "z": 0.002447181707736437
      },
      "errorBound": 1.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 12,
      "time": 2.4,
      "position": {
        "x": 5.395732334642632,
        "y": 6.4088274786598145,
        "z": 4.924007122669197
      },
      "velocity": {
        "x": -0.040751773776503686,
        "y": -0.08085106213779948,
        "z": 0.005552818292263564
      },
      "errorBound": 1.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 12,
      "time": 2.4,
      "position": {
        "x": 6.604267665357368,
        "y": 3.7159725213401855,
        "z": 5.255992877330803
      },
      "velocity": {
        "x": 0.040751773776503686,
        "y": 0.13285106213779949,
        "z": -0.005552818292263564
      },
      "errorBound": 1.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 12,
      "time": 2.4,
      "position": {
        "x": 6.520532334642633,
        "y": 4.471227478659816,
        "z": 4.724807122669198
      },
      "velocity": {
        "x": 0.011248226223496317,
        "y": -0.0548510621377995,
        "z": -0.0024471817077364355
      },
      "errorBound": 1.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 12,
      "time": 2.4,
      "position": {
        "x": 6.479467665357367,
        "y": 5.715972521340185,
        "z": 4.915192877330803
      },
      "velocity": {
        "x": -0.011248226223496319,
        "y": 0.1328510621377995,
        "z": 0.002447181707736435
      },
      "errorBound": 1.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 12,
      "time": 2.4,
      "position": {
        "x": 6.395732334642632,
        "y": 6.471227478659816,
        "z": 5.104007122669197
      },
      "velocity": {
        "x": -0.04075177377650368,
        "y": -0.05485106213779949,
        "z": 0.005552818292263565
      },
      "errorBound": 1.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 13,
      "time": 2.6,
      "position": {
        "x": 3.6122706459306104,
        "y": 3.5410719824926287,
        "z": 4.714897826744147
      },
      "velocity": {
        "x": 0.040014902866214015,
        "y": 0.06149730576221222,
        "z": -0.005475252933285695
      },
      "errorBound": 1.3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 13,
      "time": 2.6,
      "position": {
        "x": 3.5229293540693885,
        "y": 4.256128017507373,
        "z": 4.9043021732558545
      },
      "velocity": {
        "x": 0.011985097133785995,
        "y": -0.13949730576221225,
        "z": -0.0025247470667143046
      },
      "errorBound": 1.3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 13,
      "time": 2.6,
      "position": {
        "x": 3.4770706459306115,
        "y": 5.5410719824926264,
        "z": 5.0956978267441455
      },
      "velocity": {
        "x": -0.011985097133785995,
        "y": 0.061497305762212226,
        "z": 0.002524747066714304
      },
      "errorBound": 1.3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 13,
      "time": 2.6,
      "position": {
        "x": 3.3877293540693896,
        "y": 6.256128017507373,
        "z": 5.285102173255853
      },
      "velocity": {
        "x": -0.04001490286621401,
        "y": -0.13949730576221223,
        "z": 0.005475252933285695
      },
      "errorBound": 1.3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 13,
      "time": 2.6,
      "position": {
        "x": 4.612270645930611,
        "y": 3.608671982492629,
        "z": 4.894897826744146
      },
      "velocity": {
        "x": 0.040014902866214,
        "y": 0.08749730576221222,
        "z": -0.005475252933285697
      },
      "errorBound": 1.3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 13,
      "time": 2.6,
      "position": {
        "x": 4.52292935406939,
        "y": 4.323728017507369,
        "z": 5.084302173255854
      },
      "velocity": {
        "x": 0.011985097133785993,
        "y": -0.11349730576221222,
        "z": -0.0025247470667143046
      },
      "errorBound": 1.3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 13,
      "time": 2.6,
      "position": {
        "x": 4.47707064593061,
        "y": 5.608671982492628,
        "z": 5.275697826744145
      },
      "velocity": {
        "x": -0.011985097133785993,
        "y": 0.08749730576221222,
        "z": 0.0025247470667143046
      },
      "errorBound": 1.3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 13,
      "time": 2.6,
      "position": {
        "x": 4.387729354069389,
        "y": 6.323728017507369,
        "z": 4.745102173255854
      },
      "velocity": {
        "x": -0.040014902866214,
        "y": -0.11349730576221224,
        "z": 0.005475252933285697
      },
      "errorBound": 1.3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 13,
      "time": 2.6,
      "position": {
        "x": 5.612270645930611,
        "y": 3.6762719824926284,
        "z": 5.074897826744146
      },
      "velocity": {
        "x": 0.04001490286621401,
        "y": 0.11349730576221222,
        "z": -0.005475252933285697
      },
      "errorBound": 1.3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 13,
      "time": 2.6,
      "position": {
        "x": 5.52292935406939,
        "y": 4.391328017507372,
        "z": 5.264302173255854
      },
      "velocity": {
        "x": 0.011985097133785996,
        "y": -0.08749730576221222,
        "z": -0.002524747066714304
      },
      "errorBound": 1.3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 13,
      "time": 2.6,
      "position": {
        "x": 5.47707064593061,
        "y": 5.676271982492631,
        "z": 4.735697826744146
      },
      "velocity": {
        "x": -0.011985097133785993,
        "y": 0.11349730576221222,
        "z": 0.0025247470667143054
      },
      "errorBound": 1.3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 13,
      "time": 2.6,
      "position": {
        "x": 5.387729354069389,
        "y": 6.391328017507372,
        "z": 4.925102173255854
      },
      "velocity": {
        "x": -0.04001490286621401,
        "y": -0.08749730576221221,
        "z": 0.005475252933285696
      },
      "errorBound": 1.3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 13,
      "time": 2.6,
      "position": {
        "x": 6.612270645930611,
        "y": 3.743871982492628,
        "z": 5.254897826744146
      },
      "velocity": {
        "x": 0.04001490286621401,
        "y": 0.13949730576221223,
        "z": -0.005475252933285696
      },
      "errorBound": 1.3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 13,
      "time": 2.6,
      "position": {
        "x": 6.52292935406939,
        "y": 4.4589280175073736,
        "z": 4.724302173255855
      },
      "velocity": {
        "x": 0.011985097133785991,
        "y": -0.06149730576221223,
        "z": -0.002524747066714304
      },
      "errorBound": 1.3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 13,
      "time": 2.6,
      "position": {
        "x": 6.47707064593061,
        "y": 5.743871982492627,
        "z": 4.915697826744146
      },
      "velocity": {
        "x": -0.011985097133785993,
        "y": 0.13949730576221225,
        "z": 0.0025247470667143037
      },
      "errorBound": 1.3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 13,
      "time": 2.6,
      "position": {
        "x": 6.387729354069389,
        "y": 6.4589280175073736,
        "z": 5.105102173255854
      },
      "velocity": {
        "x": -0.040014902866214,
        "y": -0.061497305762212226,
        "z": 0.005475252933285697
      },
      "errorBound": 1.3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 14,
      "time": 2.8000000000000003,
      "position": {
        "x": 3.6201163858301775,
        "y": 3.554629942266697,
        "z": 4.71381932780735
      },
      "velocity": {
        "x": 0.03922869949783527,
        "y": 0.06778979887034196,
        "z": -0.005392494683982663
      },
      "errorBound": 1.3999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 14,
      "time": 2.8000000000000003,
      "position": {
        "x": 3.5254836141698216,
        "y": 4.226970057733304,
        "z": 4.903780672192651
      },
      "velocity": {
        "x": 0.012771300502164741,
        "y": -0.145789798870342,
        "z": -0.002607505316017337
      },
      "errorBound": 1.3999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 14,
      "time": 2.8000000000000003,
      "position": {
        "x": 3.4745163858301784,
        "y": 5.554629942266695,
        "z": 5.096219327807349
      },
      "velocity": {
        "x": -0.01277130050216474,
        "y": 0.06778979887034198,
        "z": 0.0026075053160173364
      },
      "errorBound": 1.3999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 14,
      "time": 2.8000000000000003,
      "position": {
        "x": 3.3798836141698225,
        "y": 6.226970057733304,
        "z": 5.28618067219265
      },
      "velocity": {
        "x": -0.039228699497835265,
        "y": -0.14578979887034196,
        "z": 0.005392494683982663
      },
      "errorBound": 1.3999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 14,
      "time": 2.8000000000000003,
      "position": {
        "x": 4.620116385830178,
        "y": 3.627429942266698,
        "z": 4.89381932780735
      },
      "velocity": {
        "x": 0.03922869949783526,
        "y": 0.09378979887034197,
        "z": -0.005392494683982665
      },
      "errorBound": 1.3999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 14,
      "time": 2.8000000000000003,
      "position": {
        "x": 4.525483614169823,
        "y": 4.2997700577333005,
        "z": 5.083780672192651
      },
      "velocity": {
        "x": 0.012771300502164738,
        "y": -0.11978979887034197,
        "z": -0.002607505316017337
      },
      "errorBound": 1.3999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 14,
      "time": 2.8000000000000003,
      "position": {
        "x": 4.474516385830177,
        "y": 5.627429942266696,
        "z": 5.276219327807349
      },
      "velocity": {
        "x": -0.012771300502164738,
        "y": 0.09378979887034197,
        "z": 0.002607505316017337
      },
      "errorBound": 1.3999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 14,
      "time": 2.8000000000000003,
      "position": {
        "x": 4.379883614169822,
        "y": 6.2997700577333005,
        "z": 4.746180672192651
      },
      "velocity": {
        "x": -0.03922869949783526,
        "y": -0.119789798870342,
        "z": 0.005392494683982665
      },
      "errorBound": 1.3999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 14,
      "time": 2.8000000000000003,
      "position": {
        "x": 5.620116385830178,
        "y": 3.700229942266697,
        "z": 5.07381932780735
      },
      "velocity": {
        "x": 0.039228699497835265,
        "y": 0.11978979887034197,
        "z": -0.005392494683982665
      },
      "errorBound": 1.3999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 14,
      "time": 2.8000000000000003,
      "position": {
        "x": 5.525483614169823,
        "y": 4.372570057733304,
        "z": 5.263780672192651
      },
      "velocity": {
        "x": 0.012771300502164741,
        "y": -0.09378979887034197,
        "z": -0.0026075053160173364
      },
      "errorBound": 1.3999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 14,
      "time": 2.8000000000000003,
      "position": {
        "x": 5.474516385830177,
        "y": 5.7002299422666995,
        "z": 4.736219327807349
      },
      "velocity": {
        "x": -0.012771300502164738,
        "y": 0.11978979887034197,
        "z": 0.0026075053160173377
      },
      "errorBound": 1.3999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 14,
      "time": 2.8000000000000003,
      "position": {
        "x": 5.379883614169822,
        "y": 6.372570057733304,
        "z": 4.92618067219265
      },
      "velocity": {
        "x": -0.039228699497835265,
        "y": -0.09378979887034196,
        "z": 0.005392494683982664
      },
      "errorBound": 1.3999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 14,
      "time": 2.8000000000000003,
      "position": {
        "x": 6.620116385830178,
        "y": 3.7730299422666964,
        "z": 5.253819327807349
      },
      "velocity": {
        "x": 0.039228699497835265,
        "y": 0.14578979887034196,
        "z": -0.005392494683982664
      },
      "errorBound": 1.3999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 14,
      "time": 2.8000000000000003,
      "position": {
        "x": 6.525483614169823,
        "y": 4.445370057733305,
        "z": 4.723780672192651
      },
      "velocity": {
        "x": 0.012771300502164736,
        "y": -0.06778979887034198,
        "z": -0.002607505316017336
      },
      "errorBound": 1.3999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 14,
      "time": 2.8000000000000003,
      "position": {
        "x": 6.474516385830177,
        "y": 5.773029942266696,
        "z": 4.916219327807349
      },
      "velocity": {
        "x": -0.01277130050216474,
        "y": 0.145789798870342,
        "z": 0.002607505316017336
      },
      "errorBound": 1.3999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 14,
      "time": 2.8000000000000003,
      "position": {
        "x": 6.379883614169822,
        "y": 6.445370057733305,
        "z": 5.10618067219265
      },
      "velocity": {
        "x": -0.03922869949783526,
        "y": -0.06778979887034198,
        "z": 0.005392494683982665
      },
      "errorBound": 1.3999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 15,
      "time": 3.0000000000000004,
      "position": {
        "x": 3.6277955720516224,
        "y": 3.5693712206439865,
        "z": 4.712758360836672
      },
      "velocity": {
        "x": 0.03839593110722415,
        "y": 0.0737063918864481,
        "z": -0.005304834853392012
      },
      "errorBound": 1.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 15,
      "time": 3.0000000000000004,
      "position": {
        "x": 3.528204427948377,
        "y": 4.196628779356014,
        "z": 4.90324163916333
      },
      "velocity": {
        "x": 0.01360406889277587,
        "y": -0.15170639188644813,
        "z": -0.002695165146607988
      },
      "errorBound": 1.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 15,
      "time": 3.0000000000000004,
      "position": {
        "x": 3.471795572051623,
        "y": 5.569371220643985,
        "z": 5.09675836083667
      },
      "velocity": {
        "x": -0.013604068892775866,
        "y": 0.07370639188644812,
        "z": 0.0026951651466079877
      },
      "errorBound": 1.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 15,
      "time": 3.0000000000000004,
      "position": {
        "x": 3.3722044279483776,
        "y": 6.196628779356014,
        "z": 5.287241639163328
      },
      "velocity": {
        "x": -0.03839593110722414,
        "y": -0.1517063918864481,
        "z": 0.005304834853392012
      },
      "errorBound": 1.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 15,
      "time": 3.0000000000000004,
      "position": {
        "x": 4.627795572051623,
        "y": 3.647371220643987,
        "z": 4.892758360836671
      },
      "velocity": {
        "x": 0.038395931107224134,
        "y": 0.09970639188644811,
        "z": -0.005304834853392014
      },
      "errorBound": 1.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 15,
      "time": 3.0000000000000004,
      "position": {
        "x": 4.528204427948378,
        "y": 4.274628779356011,
        "z": 5.0832416391633295
      },
      "velocity": {
        "x": 0.013604068892775864,
        "y": -0.1257063918864481,
        "z": -0.002695165146607988
      },
      "errorBound": 1.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 15,
      "time": 3.0000000000000004,
      "position": {
        "x": 4.471795572051622,
        "y": 5.6473712206439854,
        "z": 5.27675836083667
      },
      "velocity": {
        "x": -0.013604068892775864,
        "y": 0.09970639188644811,
        "z": 0.002695165146607988
      },
      "errorBound": 1.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 15,
      "time": 3.0000000000000004,
      "position": {
        "x": 4.372204427948377,
        "y": 6.274628779356011,
        "z": 4.747241639163329
      },
      "velocity": {
        "x": -0.038395931107224134,
        "y": -0.12570639188644814,
        "z": 0.005304834853392014
      },
      "errorBound": 1.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 15,
      "time": 3.0000000000000004,
      "position": {
        "x": 5.627795572051623,
        "y": 3.7253712206439866,
        "z": 5.072758360836671
      },
      "velocity": {
        "x": 0.03839593110722414,
        "y": 0.1257063918864481,
        "z": -0.005304834853392014
      },
      "errorBound": 1.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 15,
      "time": 3.0000000000000004,
      "position": {
        "x": 5.528204427948378,
        "y": 4.3526287793560146,
        "z": 5.263241639163329
      },
      "velocity": {
        "x": 0.013604068892775868,
        "y": -0.09970639188644811,
        "z": -0.0026951651466079877
      },
      "errorBound": 1.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 15,
      "time": 3.0000000000000004,
      "position": {
        "x": 5.471795572051622,
        "y": 5.725371220643989,
        "z": 4.736758360836671
      },
      "velocity": {
        "x": -0.013604068892775864,
        "y": 0.1257063918864481,
        "z": 0.002695165146607989
      },
      "errorBound": 1.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 15,
      "time": 3.0000000000000004,
      "position": {
        "x": 5.372204427948377,
        "y": 6.3526287793560146,
        "z": 4.927241639163329
      },
      "velocity": {
        "x": -0.03839593110722414,
        "y": -0.0997063918864481,
        "z": 0.005304834853392013
      },
      "errorBound": 1.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 15,
      "time": 3.0000000000000004,
      "position": {
        "x": 6.627795572051623,
        "y": 3.803371220643986,
        "z": 5.252758360836671
      },
      "velocity": {
        "x": 0.03839593110722414,
        "y": 0.1517063918864481,
        "z": -0.005304834853392013
      },
      "errorBound": 1.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 15,
      "time": 3.0000000000000004,
      "position": {
        "x": 6.528204427948378,
        "y": 4.430628779356015,
        "z": 4.72324163916333
      },
      "velocity": {
        "x": 0.013604068892775862,
        "y": -0.07370639188644812,
        "z": -0.0026951651466079873
      },
      "errorBound": 1.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 15,
      "time": 3.0000000000000004,
      "position": {
        "x": 6.471795572051622,
        "y": 5.803371220643986,
        "z": 4.9167583608366705
      },
      "velocity": {
        "x": -0.013604068892775868,
        "y": 0.15170639188644813,
        "z": 0.0026951651466079873
      },
      "errorBound": 1.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 15,
      "time": 3.0000000000000004,
      "position": {
        "x": 6.372204427948377,
        "y": 6.430628779356015,
        "z": 5.107241639163329
      },
      "velocity": {
        "x": -0.038395931107224134,
        "y": -0.07370639188644812,
        "z": 0.005304834853392014
      },
      "errorBound": 1.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 16,
      "time": 3.2000000000000006,
      "position": {
        "x": 3.6352994778594456,
        "y": 3.585216472324609,
        "z": 4.711715844435848
      },
      "velocity": {
        "x": 0.03751952903911559,
        "y": 0.07922625840311395,
        "z": -0.005212582004117418
      },
      "errorBound": 1.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 16,
      "time": 3.2000000000000006,
      "position": {
        "x": 3.531100522140554,
        "y": 4.165183527675391,
        "z": 4.902684155564153
      },
      "velocity": {
        "x": 0.014480470960884428,
        "y": -0.15722625840311397,
        "z": -0.002787417995882582
      },
      "errorBound": 1.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 16,
      "time": 3.2000000000000006,
      "position": {
        "x": 3.468899477859446,
        "y": 5.585216472324608,
        "z": 5.097315844435847
      },
      "velocity": {
        "x": -0.014480470960884425,
        "y": 0.07922625840311397,
        "z": 0.0027874179958825816
      },
      "errorBound": 1.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 16,
      "time": 3.2000000000000006,
      "position": {
        "x": 3.3647005221405544,
        "y": 6.165183527675391,
        "z": 5.288284155564152
      },
      "velocity": {
        "x": -0.03751952903911558,
        "y": -0.15722625840311394,
        "z": 0.005212582004117418
      },
      "errorBound": 1.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 16,
      "time": 3.2000000000000006,
      "position": {
        "x": 4.635299477859446,
        "y": 3.66841647232461,
        "z": 4.891715844435848
      },
      "velocity": {
        "x": 0.037519529039115575,
        "y": 0.10522625840311396,
        "z": -0.005212582004117419
      },
      "errorBound": 1.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 16,
      "time": 3.2000000000000006,
      "position": {
        "x": 4.531100522140554,
        "y": 4.248383527675388,
        "z": 5.082684155564153
      },
      "velocity": {
        "x": 0.014480470960884423,
        "y": -0.13122625840311394,
        "z": -0.002787417995882582
      },
      "errorBound": 1.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 16,
      "time": 3.2000000000000006,
      "position": {
        "x": 4.468899477859446,
        "y": 5.668416472324608,
        "z": 5.277315844435846
      },
      "velocity": {
        "x": -0.014480470960884423,
        "y": 0.10522625840311396,
        "z": 0.002787417995882582
      },
      "errorBound": 1.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 16,
      "time": 3.2000000000000006,
      "position": {
        "x": 4.364700522140554,
        "y": 6.248383527675388,
        "z": 4.748284155564153
      },
      "velocity": {
        "x": -0.037519529039115575,
        "y": -0.13122625840311397,
        "z": 0.005212582004117419
      },
      "errorBound": 1.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 16,
      "time": 3.2000000000000006,
      "position": {
        "x": 5.635299477859446,
        "y": 3.7516164723246095,
        "z": 5.071715844435848
      },
      "velocity": {
        "x": 0.03751952903911558,
        "y": 0.13122625840311394,
        "z": -0.005212582004117419
      },
      "errorBound": 1.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 16,
      "time": 3.2000000000000006,
      "position": {
        "x": 5.531100522140554,
        "y": 4.331583527675392,
        "z": 5.262684155564153
      },
      "velocity": {
        "x": 0.014480470960884426,
        "y": -0.10522625840311396,
        "z": -0.0027874179958825816
      },
      "errorBound": 1.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 16,
      "time": 3.2000000000000006,
      "position": {
        "x": 5.468899477859446,
        "y": 5.751616472324612,
        "z": 4.737315844435847
      },
      "velocity": {
        "x": -0.014480470960884423,
        "y": 0.13122625840311394,
        "z": 0.002787417995882583
      },
      "errorBound": 1.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 16,
      "time": 3.2000000000000006,
      "position": {
        "x": 5.364700522140554,
        "y": 6.331583527675392,
        "z": 4.928284155564152
      },
      "velocity": {
        "x": -0.03751952903911558,
        "y": -0.10522625840311395,
        "z": 0.0052125820041174185
      },
      "errorBound": 1.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 16,
      "time": 3.2000000000000006,
      "position": {
        "x": 6.635299477859446,
        "y": 3.8348164723246088,
        "z": 5.251715844435847
      },
      "velocity": {
        "x": 0.03751952903911558,
        "y": 0.15722625840311394,
        "z": -0.0052125820041174185
      },
      "errorBound": 1.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 16,
      "time": 3.2000000000000006,
      "position": {
        "x": 6.531100522140554,
        "y": 4.414783527675392,
        "z": 4.722684155564154
      },
      "velocity": {
        "x": 0.014480470960884421,
        "y": -0.07922625840311397,
        "z": -0.002787417995882581
      },
      "errorBound": 1.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 16,
      "time": 3.2000000000000006,
      "position": {
        "x": 6.468899477859446,
        "y": 5.834816472324609,
        "z": 4.917315844435847
      },
      "velocity": {
        "x": -0.014480470960884426,
        "y": 0.15722625840311397,
        "z": 0.0027874179958825816
      },
      "errorBound": 1.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 16,
      "time": 3.2000000000000006,
      "position": {
        "x": 6.364700522140554,
        "y": 6.414783527675392,
        "z": 5.108284155564152
      },
      "velocity": {
        "x": -0.037519529039115575,
        "y": -0.07922625840311397,
        "z": 0.005212582004117419
      },
      "errorBound": 1.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 17,
      "time": 3.400000000000001,
      "position": {
        "x": 3.6426199935052037,
        "y": 3.602082466022649,
        "z": 4.71069263226261
      },
      "velocity": {
        "x": 0.03660257822878934,
        "y": 0.08432996849020083,
        "z": -0.00511606086618833
      },
      "errorBound": 1.6999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 17,
      "time": 3.400000000000001,
      "position": {
        "x": 3.534180006494796,
        "y": 4.132717533977351,
        "z": 4.902107367737391
      },
      "velocity": {
        "x": 0.015397421771210677,
        "y": -0.16232996849020084,
        "z": -0.00288393913381167
      },
      "errorBound": 1.6999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 17,
      "time": 3.400000000000001,
      "position": {
        "x": 3.465819993505204,
        "y": 5.602082466022648,
        "z": 5.097892632262609
      },
      "velocity": {
        "x": -0.015397421771210675,
        "y": 0.08432996849020084,
        "z": 0.0028839391338116695
      },
      "errorBound": 1.6999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 17,
      "time": 3.400000000000001,
      "position": {
        "x": 3.3573800064947963,
        "y": 6.132717533977351,
        "z": 5.28930736773739
      },
      "velocity": {
        "x": -0.03660257822878933,
        "y": -0.16232996849020082,
        "z": 0.00511606086618833
      },
      "errorBound": 1.6999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 17,
      "time": 3.400000000000001,
      "position": {
        "x": 4.642619993505204,
        "y": 3.6904824660226505,
        "z": 4.89069263226261
      },
      "velocity": {
        "x": 0.036602578228789324,
        "y": 0.11032996849020085,
        "z": -0.0051160608661883315
      },
      "errorBound": 1.6999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 17,
      "time": 3.400000000000001,
      "position": {
        "x": 4.534180006494797,
        "y": 4.221117533977348,
        "z": 5.0821073677373905
      },
      "velocity": {
        "x": 0.015397421771210671,
        "y": -0.13632996849020082,
        "z": -0.00288393913381167
      },
      "errorBound": 1.6999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 17,
      "time": 3.400000000000001,
      "position": {
        "x": 4.465819993505203,
        "y": 5.690482466022648,
        "z": 5.277892632262609
      },
      "velocity": {
        "x": -0.015397421771210673,
        "y": 0.11032996849020084,
        "z": 0.00288393913381167
      },
      "errorBound": 1.6999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 17,
      "time": 3.400000000000001,
      "position": {
        "x": 4.357380006494796,
        "y": 6.221117533977348,
        "z": 4.749307367737391
      },
      "velocity": {
        "x": -0.036602578228789324,
        "y": -0.13632996849020085,
        "z": 0.0051160608661883315
      },
      "errorBound": 1.6999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 17,
      "time": 3.400000000000001,
      "position": {
        "x": 5.642619993505204,
        "y": 3.7788824660226497,
        "z": 5.07069263226261
      },
      "velocity": {
        "x": 0.03660257822878933,
        "y": 0.13632996849020082,
        "z": -0.0051160608661883315
      },
      "errorBound": 1.6999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 17,
      "time": 3.400000000000001,
      "position": {
        "x": 5.534180006494797,
        "y": 4.309517533977352,
        "z": 5.26210736773739
      },
      "velocity": {
        "x": 0.015397421771210675,
        "y": -0.11032996849020084,
        "z": -0.0028839391338116695
      },
      "errorBound": 1.6999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 17,
      "time": 3.400000000000001,
      "position": {
        "x": 5.465819993505203,
        "y": 5.778882466022652,
        "z": 4.73789263226261
      },
      "velocity": {
        "x": -0.015397421771210671,
        "y": 0.13632996849020082,
        "z": 0.002883939133811671
      },
      "errorBound": 1.6999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 17,
      "time": 3.400000000000001,
      "position": {
        "x": 5.357380006494796,
        "y": 6.309517533977352,
        "z": 4.92930736773739
      },
      "velocity": {
        "x": -0.03660257822878933,
        "y": -0.11032996849020082,
        "z": 0.005116060866188331
      },
      "errorBound": 1.6999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 17,
      "time": 3.400000000000001,
      "position": {
        "x": 6.642619993505204,
        "y": 3.867282466022649,
        "z": 5.250692632262609
      },
      "velocity": {
        "x": 0.03660257822878933,
        "y": 0.16232996849020082,
        "z": -0.005116060866188331
      },
      "errorBound": 1.6999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 17,
      "time": 3.400000000000001,
      "position": {
        "x": 6.534180006494797,
        "y": 4.397917533977352,
        "z": 4.722107367737391
      },
      "velocity": {
        "x": 0.01539742177121067,
        "y": -0.08432996849020084,
        "z": -0.002883939133811669
      },
      "errorBound": 1.6999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 17,
      "time": 3.400000000000001,
      "position": {
        "x": 6.465819993505203,
        "y": 5.867282466022649,
        "z": 4.9178926322626095
      },
      "velocity": {
        "x": -0.015397421771210675,
        "y": 0.16232996849020084,
        "z": 0.0028839391338116695
      },
      "errorBound": 1.6999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 17,
      "time": 3.400000000000001,
      "position": {
        "x": 6.357380006494796,
        "y": 6.397917533977352,
        "z": 5.10930736773739
      },
      "velocity": {
        "x": -0.036602578228789324,
        "y": -0.08432996849020084,
        "z": 0.0051160608661883315
      },
      "errorBound": 1.6999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 18,
      "time": 3.600000000000001,
      "position": {
        "x": 3.649749654773823,
        "y": 3.6198823774402897,
        "z": 4.709689510023808
      },
      "velocity": {
        "x": 0.03564830634309775,
        "y": 0.0889995570882022,
        "z": -0.005015611194010258
      },
      "errorBound": 1.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 18,
      "time": 3.600000000000001,
      "position": {
        "x": 3.5374503452261763,
        "y": 4.0993176225597105,
        "z": 4.901510489976193
      },
      "velocity": {
        "x": 0.016351693656902262,
        "y": -0.16699955708820222,
        "z": -0.0029843888059897417
      },
      "errorBound": 1.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 18,
      "time": 3.600000000000001,
      "position": {
        "x": 3.4625496547738237,
        "y": 5.619882377440288,
        "z": 5.098489510023807
      },
      "velocity": {
        "x": -0.016351693656902262,
        "y": 0.08899955708820222,
        "z": 0.0029843888059897412
      },
      "errorBound": 1.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 18,
      "time": 3.600000000000001,
      "position": {
        "x": 3.350250345226177,
        "y": 6.0993176225597105,
        "z": 5.290310489976192
      },
      "velocity": {
        "x": -0.03564830634309774,
        "y": -0.1669995570882022,
        "z": 0.005015611194010258
      },
      "errorBound": 1.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 18,
      "time": 3.600000000000001,
      "position": {
        "x": 4.6497496547738235,
        "y": 3.713482377440291,
        "z": 4.889689510023808
      },
      "velocity": {
        "x": 0.035648306343097735,
        "y": 0.11499955708820223,
        "z": -0.00501561119401026
      },
      "errorBound": 1.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 18,
      "time": 3.600000000000001,
      "position": {
        "x": 4.537450345226177,
        "y": 4.192917622559707,
        "z": 5.081510489976193
      },
      "velocity": {
        "x": 0.01635169365690226,
        "y": -0.1409995570882022,
        "z": -0.002984388805989742
      },
      "errorBound": 1.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 18,
      "time": 3.600000000000001,
      "position": {
        "x": 4.462549654773823,
        "y": 5.713482377440289,
        "z": 5.278489510023807
      },
      "velocity": {
        "x": -0.01635169365690226,
        "y": 0.11499955708820221,
        "z": 0.0029843888059897417
      },
      "errorBound": 1.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 18,
      "time": 3.600000000000001,
      "position": {
        "x": 4.3502503452261765,
        "y": 6.192917622559707,
        "z": 4.750310489976193
      },
      "velocity": {
        "x": -0.035648306343097735,
        "y": -0.14099955708820222,
        "z": 0.00501561119401026
      },
      "errorBound": 1.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 18,
      "time": 3.600000000000001,
      "position": {
        "x": 5.6497496547738235,
        "y": 3.80708237744029,
        "z": 5.0696895100238075
      },
      "velocity": {
        "x": 0.03564830634309774,
        "y": 0.1409995570882022,
        "z": -0.00501561119401026
      },
      "errorBound": 1.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 18,
      "time": 3.600000000000001,
      "position": {
        "x": 5.537450345226177,
        "y": 4.286517622559711,
        "z": 5.261510489976192
      },
      "velocity": {
        "x": 0.016351693656902262,
        "y": -0.11499955708820221,
        "z": -0.0029843888059897412
      },
      "errorBound": 1.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 18,
      "time": 3.600000000000001,
      "position": {
        "x": 5.462549654773823,
        "y": 5.807082377440293,
        "z": 4.738489510023808
      },
      "velocity": {
        "x": -0.01635169365690226,
        "y": 0.1409995570882022,
        "z": 0.0029843888059897425
      },
      "errorBound": 1.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 18,
      "time": 3.600000000000001,
      "position": {
        "x": 5.3502503452261765,
        "y": 6.286517622559711,
        "z": 4.9303104899761925
      },
      "velocity": {
        "x": -0.03564830634309774,
        "y": -0.1149995570882022,
        "z": 0.005015611194010259
      },
      "errorBound": 1.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 18,
      "time": 3.600000000000001,
      "position": {
        "x": 6.6497496547738235,
        "y": 3.9006823774402895,
        "z": 5.249689510023807
      },
      "velocity": {
        "x": 0.03564830634309774,
        "y": 0.1669995570882022,
        "z": -0.005015611194010259
      },
      "errorBound": 1.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 18,
      "time": 3.600000000000001,
      "position": {
        "x": 6.537450345226177,
        "y": 4.380117622559712,
        "z": 4.721510489976193
      },
      "velocity": {
        "x": 0.01635169365690226,
        "y": -0.08899955708820222,
        "z": -0.002984388805989741
      },
      "errorBound": 1.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 18,
      "time": 3.600000000000001,
      "position": {
        "x": 6.462549654773823,
        "y": 5.9006823774402895,
        "z": 4.918489510023807
      },
      "velocity": {
        "x": -0.016351693656902262,
        "y": 0.16699955708820222,
        "z": 0.0029843888059897412
      },
      "errorBound": 1.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 18,
      "time": 3.600000000000001,
      "position": {
        "x": 6.3502503452261765,
        "y": 6.380117622559712,
        "z": 5.110310489976192
      },
      "velocity": {
        "x": -0.035648306343097735,
        "y": -0.08899955708820222,
        "z": 0.00501561119401026
      },
      "errorBound": 1.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 19,
      "time": 3.800000000000001,
      "position": {
        "x": 3.656681669257639,
        "y": 3.6385260948893405,
        "z": 4.708707192709722
      },
      "velocity": {
        "x": 0.03466007241907846,
        "y": 0.0932185872452531,
        "z": -0.004911586570429269
      },
      "errorBound": 1.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 19,
      "time": 3.800000000000001,
      "position": {
        "x": 3.5409183307423606,
        "y": 4.06507390511066,
        "z": 4.900892807290279
      },
      "velocity": {
        "x": 0.017339927580921552,
        "y": -0.17121858724525313,
        "z": -0.0030884134295707313
      },
      "errorBound": 1.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 19,
      "time": 3.800000000000001,
      "position": {
        "x": 3.4590816692576394,
        "y": 5.638526094889339,
        "z": 5.099107192709721
      },
      "velocity": {
        "x": -0.017339927580921552,
        "y": 0.09321858724525312,
        "z": 0.003088413429570731
      },
      "errorBound": 1.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 19,
      "time": 3.800000000000001,
      "position": {
        "x": 3.343318330742361,
        "y": 6.06507390511066,
        "z": 5.291292807290278
      },
      "velocity": {
        "x": -0.03466007241907845,
        "y": -0.1712185872452531,
        "z": 0.004911586570429268
      },
      "errorBound": 1.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 19,
      "time": 3.800000000000001,
      "position": {
        "x": 4.656681669257639,
        "y": 3.7373260948893416,
        "z": 4.888707192709722
      },
      "velocity": {
        "x": 0.034660072419078446,
        "y": 0.11921858724525312,
        "z": -0.00491158657042927
      },
      "errorBound": 1.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 19,
      "time": 3.800000000000001,
      "position": {
        "x": 4.540918330742361,
        "y": 4.163873905110656,
        "z": 5.080892807290279
      },
      "velocity": {
        "x": 0.01733992758092155,
        "y": -0.1452185872452531,
        "z": -0.0030884134295707318
      },
      "errorBound": 1.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 19,
      "time": 3.800000000000001,
      "position": {
        "x": 4.459081669257639,
        "y": 5.737326094889339,
        "z": 5.279107192709721
      },
      "velocity": {
        "x": -0.01733992758092155,
        "y": 0.11921858724525311,
        "z": 0.0030884134295707313
      },
      "errorBound": 1.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 19,
      "time": 3.800000000000001,
      "position": {
        "x": 4.343318330742361,
        "y": 6.163873905110656,
        "z": 4.7512928072902785
      },
      "velocity": {
        "x": -0.034660072419078446,
        "y": -0.14521858724525313,
        "z": 0.0049115865704292706
      },
      "errorBound": 1.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 19,
      "time": 3.800000000000001,
      "position": {
        "x": 5.656681669257639,
        "y": 3.8361260948893405,
        "z": 5.068707192709722
      },
      "velocity": {
        "x": 0.03466007241907845,
        "y": 0.1452185872452531,
        "z": -0.00491158657042927
      },
      "errorBound": 1.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 19,
      "time": 3.800000000000001,
      "position": {
        "x": 5.540918330742361,
        "y": 4.262673905110661,
        "z": 5.260892807290278
      },
      "velocity": {
        "x": 0.017339927580921552,
        "y": -0.11921858724525311,
        "z": -0.003088413429570731
      },
      "errorBound": 1.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 19,
      "time": 3.800000000000001,
      "position": {
        "x": 5.459081669257639,
        "y": 5.836126094889344,
        "z": 4.739107192709722
      },
      "velocity": {
        "x": -0.01733992758092155,
        "y": 0.1452185872452531,
        "z": 0.003088413429570732
      },
      "errorBound": 1.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 19,
      "time": 3.800000000000001,
      "position": {
        "x": 5.343318330742361,
        "y": 6.262673905110661,
        "z": 4.931292807290278
      },
      "velocity": {
        "x": -0.03466007241907845,
        "y": -0.1192185872452531,
        "z": 0.00491158657042927
      },
      "errorBound": 1.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 19,
      "time": 3.800000000000001,
      "position": {
        "x": 6.656681669257639,
        "y": 3.9349260948893403,
        "z": 5.2487071927097215
      },
      "velocity": {
        "x": 0.03466007241907845,
        "y": 0.1712185872452531,
        "z": -0.004911586570429269
      },
      "errorBound": 1.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 19,
      "time": 3.800000000000001,
      "position": {
        "x": 6.540918330742361,
        "y": 4.361473905110661,
        "z": 4.720892807290279
      },
      "velocity": {
        "x": 0.01733992758092155,
        "y": -0.09321858724525312,
        "z": -0.0030884134295707305
      },
      "errorBound": 1.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 19,
      "time": 3.800000000000001,
      "position": {
        "x": 6.459081669257639,
        "y": 5.93492609488934,
        "z": 4.919107192709721
      },
      "velocity": {
        "x": -0.017339927580921552,
        "y": 0.17121858724525313,
        "z": 0.003088413429570731
      },
      "errorBound": 1.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 19,
      "time": 3.800000000000001,
      "position": {
        "x": 6.343318330742361,
        "y": 6.361473905110661,
        "z": 5.111292807290278
      },
      "velocity": {
        "x": -0.034660072419078446,
        "y": -0.09321858724525312,
        "z": 0.00491158657042927
      },
      "errorBound": 1.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 20,
      "time": 4.000000000000001,
      "position": {
        "x": 3.6634099402656677,
        "y": 3.6579205364843808,
        "z": 4.707746322077298
      },
      "velocity": {
        "x": 0.03364135504014401,
        "y": 0.0969722079752007,
        "z": -0.004804353162120369
      },
      "errorBound": 1.9999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 20,
      "time": 4.000000000000001,
      "position": {
        "x": 3.5445900597343316,
        "y": 4.03007946351562,
        "z": 4.900253677922703
      },
      "velocity": {
        "x": 0.018358644959856,
        "y": -0.17497220797520074,
        "z": -0.003195646837879631
      },
      "errorBound": 1.9999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 20,
      "time": 4.000000000000001,
      "position": {
        "x": 3.4554099402656684,
        "y": 5.6579205364843785,
        "z": 5.099746322077297
      },
      "velocity": {
        "x": -0.018358644959856,
        "y": 0.09697220797520072,
        "z": 0.00319564683787963
      },
      "errorBound": 1.9999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 20,
      "time": 4.000000000000001,
      "position": {
        "x": 3.3365900597343323,
        "y": 6.03007946351562,
        "z": 5.292253677922702
      },
      "velocity": {
        "x": -0.033641355040144004,
        "y": -0.17497220797520072,
        "z": 0.004804353162120368
      },
      "errorBound": 1.9999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 20,
      "time": 4.000000000000001,
      "position": {
        "x": 4.663409940265669,
        "y": 3.7619205364843817,
        "z": 4.887746322077298
      },
      "velocity": {
        "x": 0.033641355040144,
        "y": 0.12297220797520073,
        "z": -0.00480435316212037
      },
      "errorBound": 1.9999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 20,
      "time": 4.000000000000001,
      "position": {
        "x": 4.5445900597343325,
        "y": 4.134079463515616,
        "z": 5.080253677922703
      },
      "velocity": {
        "x": 0.018358644959855997,
        "y": -0.14897220797520072,
        "z": -0.0031956468378796315
      },
      "errorBound": 1.9999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 20,
      "time": 4.000000000000001,
      "position": {
        "x": 4.4554099402656675,
        "y": 5.7619205364843795,
        "z": 5.279746322077297
      },
      "velocity": {
        "x": -0.018358644959855997,
        "y": 0.12297220797520071,
        "z": 0.0031956468378796306
      },
      "errorBound": 1.9999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 20,
      "time": 4.000000000000001,
      "position": {
        "x": 4.336590059734331,
        "y": 6.134079463515616,
        "z": 4.7522536779227025
      },
      "velocity": {
        "x": -0.033641355040144,
        "y": -0.14897220797520075,
        "z": 0.004804353162120371
      },
      "errorBound": 1.9999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 20,
      "time": 4.000000000000001,
      "position": {
        "x": 5.663409940265669,
        "y": 3.8659205364843805,
        "z": 5.067746322077298
      },
      "velocity": {
        "x": 0.033641355040144004,
        "y": 0.14897220797520072,
        "z": -0.00480435316212037
      },
      "errorBound": 1.9999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 20,
      "time": 4.000000000000001,
      "position": {
        "x": 5.5445900597343325,
        "y": 4.2380794635156205,
        "z": 5.2602536779227025
      },
      "velocity": {
        "x": 0.018358644959856,
        "y": -0.12297220797520071,
        "z": -0.0031956468378796306
      },
      "errorBound": 1.9999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 20,
      "time": 4.000000000000001,
      "position": {
        "x": 5.4554099402656675,
        "y": 5.865920536484384,
        "z": 4.7397463220772975
      },
      "velocity": {
        "x": -0.018358644959855997,
        "y": 0.14897220797520072,
        "z": 0.003195646837879632
      },
      "errorBound": 1.9999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 20,
      "time": 4.000000000000001,
      "position": {
        "x": 5.336590059734331,
        "y": 6.2380794635156205,
        "z": 4.932253677922702
      },
      "velocity": {
        "x": -0.033641355040144004,
        "y": -0.1229722079752007,
        "z": 0.00480435316212037
      },
      "errorBound": 1.9999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 20,
      "time": 4.000000000000001,
      "position": {
        "x": 6.663409940265669,
        "y": 3.9699205364843806,
        "z": 5.2477463220772975
      },
      "velocity": {
        "x": 0.033641355040144004,
        "y": 0.17497220797520072,
        "z": -0.004804353162120369
      },
      "errorBound": 1.9999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 20,
      "time": 4.000000000000001,
      "position": {
        "x": 6.5445900597343325,
        "y": 4.3420794635156215,
        "z": 4.720253677922703
      },
      "velocity": {
        "x": 0.018358644959855997,
        "y": -0.09697220797520072,
        "z": -0.0031956468378796297
      },
      "errorBound": 1.9999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 20,
      "time": 4.000000000000001,
      "position": {
        "x": 6.4554099402656675,
        "y": 5.96992053648438,
        "z": 4.919746322077297
      },
      "velocity": {
        "x": -0.018358644959856,
        "y": 0.17497220797520074,
        "z": 0.0031956468378796306
      },
      "errorBound": 1.9999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 20,
      "time": 4.000000000000001,
      "position": {
        "x": 6.336590059734331,
        "y": 6.3420794635156215,
        "z": 5.112253677922702
      },
      "velocity": {
        "x": -0.033641355040144,
        "y": -0.09697220797520072,
        "z": 0.00480435316212037
      },
      "errorBound": 1.9999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 21,
      "time": 4.200000000000001,
      "position": {
        "x": 3.6699290882839612,
        "y": 3.6779699777909958,
        "z": 4.706807464391162
      },
      "velocity": {
        "x": 0.032595740091468255,
        "y": 0.1002472065330756,
        "z": -0.004694288430680806
      },
      "errorBound": 2.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 21,
      "time": 4.200000000000001,
      "position": {
        "x": 3.548470911716038,
        "y": 3.9944300222090052,
        "z": 4.899592535608839
      },
      "velocity": {
        "x": 0.01940425990853176,
        "y": -0.17824720653307566,
        "z": -0.003305711569319195
      },
      "errorBound": 2.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 21,
      "time": 4.200000000000001,
      "position": {
        "x": 3.451529088283962,
        "y": 5.677969977790994,
        "z": 5.100407464391161
      },
      "velocity": {
        "x": -0.01940425990853176,
        "y": 0.10024720653307562,
        "z": 0.003305711569319194
      },
      "errorBound": 2.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 21,
      "time": 4.200000000000001,
      "position": {
        "x": 3.3300709117160388,
        "y": 5.994430022209005,
        "z": 5.293192535608838
      },
      "velocity": {
        "x": -0.03259574009146825,
        "y": -0.17824720653307563,
        "z": 0.004694288430680805
      },
      "errorBound": 2.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 21,
      "time": 4.200000000000001,
      "position": {
        "x": 4.669929088283962,
        "y": 3.787169977790997,
        "z": 4.886807464391162
      },
      "velocity": {
        "x": 0.03259574009146824,
        "y": 0.12624720653307564,
        "z": -0.004694288430680807
      },
      "errorBound": 2.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 21,
      "time": 4.200000000000001,
      "position": {
        "x": 4.548470911716039,
        "y": 4.103630022209001,
        "z": 5.079592535608839
      },
      "velocity": {
        "x": 0.019404259908531757,
        "y": -0.15224720653307564,
        "z": -0.0033057115693191953
      },
      "errorBound": 2.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 21,
      "time": 4.200000000000001,
      "position": {
        "x": 4.451529088283961,
        "y": 5.787169977790994,
        "z": 5.2804074643911605
      },
      "velocity": {
        "x": -0.019404259908531757,
        "y": 0.1262472065330756,
        "z": 0.0033057115693191945
      },
      "errorBound": 2.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 21,
      "time": 4.200000000000001,
      "position": {
        "x": 4.330070911716038,
        "y": 6.103630022209001,
        "z": 4.7531925356088385
      },
      "velocity": {
        "x": -0.03259574009146824,
        "y": -0.15224720653307566,
        "z": 0.004694288430680807
      },
      "errorBound": 2.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 21,
      "time": 4.200000000000001,
      "position": {
        "x": 5.669929088283962,
        "y": 3.8963699777909957,
        "z": 5.066807464391162
      },
      "velocity": {
        "x": 0.03259574009146825,
        "y": 0.15224720653307564,
        "z": -0.004694288430680807
      },
      "errorBound": 2.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 21,
      "time": 4.200000000000001,
      "position": {
        "x": 5.548470911716039,
        "y": 4.212830022209006,
        "z": 5.259592535608839
      },
      "velocity": {
        "x": 0.01940425990853176,
        "y": -0.1262472065330756,
        "z": -0.0033057115693191945
      },
      "errorBound": 2.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 21,
      "time": 4.200000000000001,
      "position": {
        "x": 5.451529088283961,
        "y": 5.896369977790999,
        "z": 4.740407464391161
      },
      "velocity": {
        "x": -0.019404259908531757,
        "y": 0.15224720653307564,
        "z": 0.0033057115693191958
      },
      "errorBound": 2.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 21,
      "time": 4.200000000000001,
      "position": {
        "x": 5.330070911716038,
        "y": 6.212830022209006,
        "z": 4.933192535608838
      },
      "velocity": {
        "x": -0.03259574009146825,
        "y": -0.1262472065330756,
        "z": 0.004694288430680807
      },
      "errorBound": 2.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 21,
      "time": 4.200000000000001,
      "position": {
        "x": 6.669929088283962,
        "y": 4.005569977790996,
        "z": 5.2468074643911615
      },
      "velocity": {
        "x": 0.03259574009146825,
        "y": 0.17824720653307563,
        "z": -0.004694288430680806
      },
      "errorBound": 2.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 21,
      "time": 4.200000000000001,
      "position": {
        "x": 6.548470911716039,
        "y": 4.322030022209006,
        "z": 4.7195925356088395
      },
      "velocity": {
        "x": 0.019404259908531757,
        "y": -0.10024720653307562,
        "z": -0.0033057115693191936
      },
      "errorBound": 2.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 21,
      "time": 4.200000000000001,
      "position": {
        "x": 6.451529088283961,
        "y": 6.005569977790995,
        "z": 4.920407464391161
      },
      "velocity": {
        "x": -0.01940425990853176,
        "y": 0.17824720653307566,
        "z": 0.0033057115693191945
      },
      "errorBound": 2.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 21,
      "time": 4.200000000000001,
      "position": {
        "x": 6.330070911716038,
        "y": 6.322030022209006,
        "z": 5.113192535608838
      },
      "velocity": {
        "x": -0.03259574009146824,
        "y": -0.10024720653307562,
        "z": 0.004694288430680807
      },
      "errorBound": 2.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 22,
      "time": 4.400000000000001,
      "position": {
        "x": 3.6762344699114955,
        "y": 3.6985763887757868,
        "z": 4.705891108430369
      },
      "velocity": {
        "x": 0.03152690813767053,
        "y": 0.10303205492395408,
        "z": -0.004581779803965247
      },
      "errorBound": 2.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 22,
      "time": 4.400000000000001,
      "position": {
        "x": 3.5525655300885037,
        "y": 3.958223611224214,
        "z": 4.898908891569632
      },
      "velocity": {
        "x": 0.020473091862329488,
        "y": -0.18103205492395413,
        "z": -0.003418220196034754
      },
      "errorBound": 2.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 22,
      "time": 4.400000000000001,
      "position": {
        "x": 3.4474344699114963,
        "y": 5.698576388775785,
        "z": 5.101091108430368
      },
      "velocity": {
        "x": -0.020473091862329488,
        "y": 0.10303205492395409,
        "z": 0.0034182201960347527
      },
      "errorBound": 2.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 22,
      "time": 4.400000000000001,
      "position": {
        "x": 3.3237655300885045,
        "y": 5.958223611224214,
        "z": 5.294108891569631
      },
      "velocity": {
        "x": -0.03152690813767052,
        "y": -0.1810320549239541,
        "z": 0.004581779803965246
      },
      "errorBound": 2.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 22,
      "time": 4.400000000000001,
      "position": {
        "x": 4.676234469911496,
        "y": 3.812976388775788,
        "z": 4.885891108430369
      },
      "velocity": {
        "x": 0.03152690813767051,
        "y": 0.12903205492395411,
        "z": -0.004581779803965248
      },
      "errorBound": 2.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 22,
      "time": 4.400000000000001,
      "position": {
        "x": 4.552565530088504,
        "y": 4.07262361122421,
        "z": 5.078908891569632
      },
      "velocity": {
        "x": 0.020473091862329484,
        "y": -0.1550320549239541,
        "z": -0.003418220196034754
      },
      "errorBound": 2.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 22,
      "time": 4.400000000000001,
      "position": {
        "x": 4.447434469911496,
        "y": 5.812976388775785,
        "z": 5.281091108430368
      },
      "velocity": {
        "x": -0.020473091862329484,
        "y": 0.1290320549239541,
        "z": 0.003418220196034753
      },
      "errorBound": 2.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 22,
      "time": 4.400000000000001,
      "position": {
        "x": 4.323765530088504,
        "y": 6.07262361122421,
        "z": 4.754108891569632
      },
      "velocity": {
        "x": -0.03152690813767051,
        "y": -0.15503205492395414,
        "z": 0.004581779803965248
      },
      "errorBound": 2.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 22,
      "time": 4.400000000000001,
      "position": {
        "x": 5.676234469911496,
        "y": 3.9273763887757864,
        "z": 5.065891108430368
      },
      "velocity": {
        "x": 0.03152690813767052,
        "y": 0.1550320549239541,
        "z": -0.004581779803965248
      },
      "errorBound": 2.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 22,
      "time": 4.400000000000001,
      "position": {
        "x": 5.552565530088504,
        "y": 4.187023611224215,
        "z": 5.258908891569631
      },
      "velocity": {
        "x": 0.020473091862329488,
        "y": -0.1290320549239541,
        "z": -0.003418220196034753
      },
      "errorBound": 2.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 22,
      "time": 4.400000000000001,
      "position": {
        "x": 5.447434469911496,
        "y": 5.92737638877579,
        "z": 4.741091108430369
      },
      "velocity": {
        "x": -0.020473091862329484,
        "y": 0.1550320549239541,
        "z": 0.003418220196034755
      },
      "errorBound": 2.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 22,
      "time": 4.400000000000001,
      "position": {
        "x": 5.323765530088504,
        "y": 6.187023611224215,
        "z": 4.934108891569632
      },
      "velocity": {
        "x": -0.03152690813767052,
        "y": -0.1290320549239541,
        "z": 0.004581779803965248
      },
      "errorBound": 2.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 22,
      "time": 4.400000000000001,
      "position": {
        "x": 6.676234469911496,
        "y": 4.041776388775787,
        "z": 5.245891108430368
      },
      "velocity": {
        "x": 0.03152690813767052,
        "y": 0.1810320549239541,
        "z": -0.004581779803965247
      },
      "errorBound": 2.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 22,
      "time": 4.400000000000001,
      "position": {
        "x": 6.552565530088504,
        "y": 4.301423611224215,
        "z": 4.718908891569632
      },
      "velocity": {
        "x": 0.020473091862329484,
        "y": -0.10303205492395409,
        "z": -0.0034182201960347523
      },
      "errorBound": 2.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 22,
      "time": 4.400000000000001,
      "position": {
        "x": 6.447434469911496,
        "y": 6.041776388775786,
        "z": 4.921091108430368
      },
      "velocity": {
        "x": -0.020473091862329488,
        "y": 0.18103205492395413,
        "z": 0.0034182201960347536
      },
      "errorBound": 2.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 22,
      "time": 4.400000000000001,
      "position": {
        "x": 6.323765530088504,
        "y": 6.301423611224215,
        "z": 5.114108891569631
      },
      "velocity": {
        "x": -0.03152690813767051,
        "y": -0.10303205492395409,
        "z": 0.004581779803965248
      },
      "errorBound": 2.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 23,
      "time": 4.600000000000001,
      "position": {
        "x": 3.682322194204941,
        "y": 3.7196397788720867,
        "z": 4.704997663767901
      },
      "velocity": {
        "x": 0.030438621467228193,
        "y": 0.10531695048150023,
        "z": -0.00446722331233973
      },
      "errorBound": 2.2999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 23,
      "time": 4.600000000000001,
      "position": {
        "x": 3.5568778057950583,
        "y": 3.921560221127914,
        "z": 4.8982023362321
      },
      "velocity": {
        "x": 0.02156137853277182,
        "y": -0.1833169504815003,
        "z": -0.003532776687660271
      },
      "errorBound": 2.2999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 23,
      "time": 4.600000000000001,
      "position": {
        "x": 3.4431221942049417,
        "y": 5.719639778872085,
        "z": 5.1017976637679
      },
      "velocity": {
        "x": -0.02156137853277182,
        "y": 0.10531695048150025,
        "z": 0.0035327766876602695
      },
      "errorBound": 2.2999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 23,
      "time": 4.600000000000001,
      "position": {
        "x": 3.317677805795059,
        "y": 5.921560221127914,
        "z": 5.295002336232099
      },
      "velocity": {
        "x": -0.03043862146722819,
        "y": -0.18331695048150026,
        "z": 0.004467223312339729
      },
      "errorBound": 2.2999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 23,
      "time": 4.600000000000001,
      "position": {
        "x": 4.682322194204942,
        "y": 3.839239778872088,
        "z": 4.8849976637679005
      },
      "velocity": {
        "x": 0.030438621467228182,
        "y": 0.13131695048150027,
        "z": -0.004467223312339731
      },
      "errorBound": 2.2999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 23,
      "time": 4.600000000000001,
      "position": {
        "x": 4.556877805795058,
        "y": 4.04116022112791,
        "z": 5.0782023362321
      },
      "velocity": {
        "x": 0.021561378532771815,
        "y": -0.15731695048150027,
        "z": -0.0035327766876602712
      },
      "errorBound": 2.2999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 23,
      "time": 4.600000000000001,
      "position": {
        "x": 4.443122194204942,
        "y": 5.839239778872085,
        "z": 5.281797663767899
      },
      "velocity": {
        "x": -0.021561378532771815,
        "y": 0.13131695048150024,
        "z": 0.00353277668766027
      },
      "errorBound": 2.2999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 23,
      "time": 4.600000000000001,
      "position": {
        "x": 4.317677805795058,
        "y": 6.04116022112791,
        "z": 4.7550023362321
      },
      "velocity": {
        "x": -0.030438621467228182,
        "y": -0.1573169504815003,
        "z": 0.004467223312339731
      },
      "errorBound": 2.2999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 23,
      "time": 4.600000000000001,
      "position": {
        "x": 5.682322194204942,
        "y": 3.9588397788720866,
        "z": 5.0649976637679
      },
      "velocity": {
        "x": 0.03043862146722819,
        "y": 0.15731695048150027,
        "z": -0.004467223312339731
      },
      "errorBound": 2.2999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 23,
      "time": 4.600000000000001,
      "position": {
        "x": 5.556877805795058,
        "y": 4.160760221127915,
        "z": 5.2582023362321
      },
      "velocity": {
        "x": 0.02156137853277182,
        "y": -0.13131695048150024,
        "z": -0.0035327766876602704
      },
      "errorBound": 2.2999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 23,
      "time": 4.600000000000001,
      "position": {
        "x": 5.443122194204942,
        "y": 5.95883977887209,
        "z": 4.7417976637679
      },
      "velocity": {
        "x": -0.021561378532771815,
        "y": 0.15731695048150027,
        "z": 0.003532776687660272
      },
      "errorBound": 2.2999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 23,
      "time": 4.600000000000001,
      "position": {
        "x": 5.317677805795058,
        "y": 6.160760221127915,
        "z": 4.9350023362321
      },
      "velocity": {
        "x": -0.03043862146722819,
        "y": -0.13131695048150024,
        "z": 0.004467223312339731
      },
      "errorBound": 2.2999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 23,
      "time": 4.600000000000001,
      "position": {
        "x": 6.682322194204942,
        "y": 4.078439778872087,
        "z": 5.2449976637679
      },
      "velocity": {
        "x": 0.03043862146722819,
        "y": 0.18331695048150026,
        "z": -0.00446722331233973
      },
      "errorBound": 2.2999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 23,
      "time": 4.600000000000001,
      "position": {
        "x": 6.556877805795058,
        "y": 4.280360221127915,
        "z": 4.718202336232101
      },
      "velocity": {
        "x": 0.021561378532771815,
        "y": -0.10531695048150025,
        "z": -0.003532776687660269
      },
      "errorBound": 2.2999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 23,
      "time": 4.600000000000001,
      "position": {
        "x": 6.443122194204942,
        "y": 6.078439778872086,
        "z": 4.9217976637679
      },
      "velocity": {
        "x": -0.02156137853277182,
        "y": 0.1833169504815003,
        "z": 0.0035327766876602704
      },
      "errorBound": 2.2999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 23,
      "time": 4.600000000000001,
      "position": {
        "x": 6.317677805795058,
        "y": 6.280360221127915,
        "z": 5.1150023362320995
      },
      "velocity": {
        "x": -0.030438621467228182,
        "y": -0.10531695048150025,
        "z": 0.004467223312339731
      },
      "errorBound": 2.2999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 24,
      "time": 4.800000000000002,
      "position": {
        "x": 3.688189136374785,
        "y": 3.741058548946757,
        "z": 4.70412745932897
      },
      "velocity": {
        "x": 0.029334710849221218,
        "y": 0.1070938503733515,
        "z": -0.004351022194654771
      },
      "errorBound": 2.4e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 24,
      "time": 4.800000000000002,
      "position": {
        "x": 3.561410863625214,
        "y": 3.8845414510532437,
        "z": 4.897472540671031
      },
      "velocity": {
        "x": 0.022665289150778794,
        "y": -0.18509385037335158,
        "z": -0.0036489778053452296
      },
      "errorBound": 2.4e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 24,
      "time": 4.800000000000002,
      "position": {
        "x": 3.438589136374786,
        "y": 5.741058548946755,
        "z": 5.102527459328969
      },
      "velocity": {
        "x": -0.022665289150778794,
        "y": 0.10709385037335152,
        "z": 0.0036489778053452287
      },
      "errorBound": 2.4e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 24,
      "time": 4.800000000000002,
      "position": {
        "x": 3.311810863625215,
        "y": 5.884541451053243,
        "z": 5.29587254067103
      },
      "velocity": {
        "x": -0.029334710849221214,
        "y": -0.18509385037335155,
        "z": 0.00435102219465477
      },
      "errorBound": 2.4e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 24,
      "time": 4.800000000000002,
      "position": {
        "x": 4.6881891363747865,
        "y": 3.865858548946758,
        "z": 4.88412745932897
      },
      "velocity": {
        "x": 0.029334710849221207,
        "y": 0.13309385037335156,
        "z": -0.004351022194654772
      },
      "errorBound": 2.4e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 24,
      "time": 4.800000000000002,
      "position": {
        "x": 4.561410863625214,
        "y": 4.00934145105324,
        "z": 5.077472540671031
      },
      "velocity": {
        "x": 0.02266528915077879,
        "y": -0.15909385037335155,
        "z": -0.0036489778053452305
      },
      "errorBound": 2.4e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 24,
      "time": 4.800000000000002,
      "position": {
        "x": 4.438589136374786,
        "y": 5.865858548946756,
        "z": 5.282527459328969
      },
      "velocity": {
        "x": -0.02266528915077879,
        "y": 0.13309385037335153,
        "z": 0.0036489778053452287
      },
      "errorBound": 2.4e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 24,
      "time": 4.800000000000002,
      "position": {
        "x": 4.3118108636252135,
        "y": 6.00934145105324,
        "z": 4.755872540671031
      },
      "velocity": {
        "x": -0.029334710849221207,
        "y": -0.15909385037335158,
        "z": 0.004351022194654772
      },
      "errorBound": 2.4e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 24,
      "time": 4.800000000000002,
      "position": {
        "x": 5.6881891363747865,
        "y": 3.9906585489467568,
        "z": 5.06412745932897
      },
      "velocity": {
        "x": 0.029334710849221214,
        "y": 0.15909385037335155,
        "z": -0.004351022194654772
      },
      "errorBound": 2.4e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 24,
      "time": 4.800000000000002,
      "position": {
        "x": 5.561410863625214,
        "y": 4.134141451053244,
        "z": 5.2574725406710305
      },
      "velocity": {
        "x": 0.022665289150778794,
        "y": -0.13309385037335153,
        "z": -0.003648977805345229
      },
      "errorBound": 2.4e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 24,
      "time": 4.800000000000002,
      "position": {
        "x": 5.438589136374786,
        "y": 5.99065854894676,
        "z": 4.7425274593289695
      },
      "velocity": {
        "x": -0.02266528915077879,
        "y": 0.15909385037335155,
        "z": 0.003648977805345231
      },
      "errorBound": 2.4e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 24,
      "time": 4.800000000000002,
      "position": {
        "x": 5.3118108636252135,
        "y": 6.134141451053244,
        "z": 4.93587254067103
      },
      "velocity": {
        "x": -0.029334710849221214,
        "y": -0.13309385037335153,
        "z": 0.004351022194654772
      },
      "errorBound": 2.4e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 24,
      "time": 4.800000000000002,
      "position": {
        "x": 6.6881891363747865,
        "y": 4.115458548946758,
        "z": 5.244127459328969
      },
      "velocity": {
        "x": 0.029334710849221214,
        "y": 0.18509385037335155,
        "z": -0.004351022194654771
      },
      "errorBound": 2.4e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 24,
      "time": 4.800000000000002,
      "position": {
        "x": 6.561410863625214,
        "y": 4.258941451053245,
        "z": 4.717472540671031
      },
      "velocity": {
        "x": 0.02266528915077879,
        "y": -0.10709385037335152,
        "z": -0.003648977805345228
      },
      "errorBound": 2.4e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 24,
      "time": 4.800000000000002,
      "position": {
        "x": 6.438589136374786,
        "y": 6.115458548946757,
        "z": 4.922527459328969
      },
      "velocity": {
        "x": -0.022665289150778794,
        "y": 0.18509385037335158,
        "z": 0.003648977805345229
      },
      "errorBound": 2.4e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 24,
      "time": 4.800000000000002,
      "position": {
        "x": 6.3118108636252135,
        "y": 6.258941451053245,
        "z": 5.11587254067103
      },
      "velocity": {
        "x": -0.029334710849221207,
        "y": -0.10709385037335152,
        "z": 0.004351022194654772
      },
      "errorBound": 2.4e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 25,
      "time": 5.000000000000002,
      "position": {
        "x": 3.69383294878459,
        "y": 3.7627298489291348,
        "z": 4.7032807422332015
      },
      "velocity": {
        "x": 0.028219062049024985,
        "y": 0.10835649991188859,
        "z": -0.004233585478844632
      },
      "errorBound": 2.4999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 25,
      "time": 5.000000000000002,
      "position": {
        "x": 3.566167051215409,
        "y": 3.847270151070866,
        "z": 4.8967192577668
      },
      "velocity": {
        "x": 0.023780937950975026,
        "y": -0.18635649991188866,
        "z": -0.003766414521155369
      },
      "errorBound": 2.4999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 25,
      "time": 5.000000000000002,
      "position": {
        "x": 3.433832948784591,
        "y": 5.762729848929133,
        "z": 5.1032807422332
      },
      "velocity": {
        "x": -0.02378093795097503,
        "y": 0.1083564999118886,
        "z": 0.003766414521155368
      },
      "errorBound": 2.4999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 25,
      "time": 5.000000000000002,
      "position": {
        "x": 3.30616705121541,
        "y": 5.847270151070865,
        "z": 5.2967192577667985
      },
      "velocity": {
        "x": -0.02821906204902498,
        "y": -0.18635649991188863,
        "z": 0.004233585478844631
      },
      "errorBound": 2.4999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 25,
      "time": 5.000000000000002,
      "position": {
        "x": 4.693832948784592,
        "y": 3.892729848929136,
        "z": 4.883280742233201
      },
      "velocity": {
        "x": 0.028219062049024975,
        "y": 0.13435649991188864,
        "z": -0.004233585478844633
      },
      "errorBound": 2.4999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 25,
      "time": 5.000000000000002,
      "position": {
        "x": 4.56616705121541,
        "y": 3.9772701510708623,
        "z": 5.0767192577668
      },
      "velocity": {
        "x": 0.023780937950975023,
        "y": -0.16035649991188863,
        "z": -0.0037664145211553698
      },
      "errorBound": 2.4999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 25,
      "time": 5.000000000000002,
      "position": {
        "x": 4.43383294878459,
        "y": 5.892729848929133,
        "z": 5.2832807422332
      },
      "velocity": {
        "x": -0.023780937950975023,
        "y": 0.1343564999118886,
        "z": 0.003766414521155368
      },
      "errorBound": 2.4999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 25,
      "time": 5.000000000000002,
      "position": {
        "x": 4.306167051215408,
        "y": 5.977270151070862,
        "z": 4.756719257766799
      },
      "velocity": {
        "x": -0.028219062049024975,
        "y": -0.16035649991188866,
        "z": 0.004233585478844633
      },
      "errorBound": 2.4999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 25,
      "time": 5.000000000000002,
      "position": {
        "x": 5.693832948784592,
        "y": 4.022729848929134,
        "z": 5.063280742233201
      },
      "velocity": {
        "x": 0.02821906204902498,
        "y": 0.16035649991188863,
        "z": -0.004233585478844633
      },
      "errorBound": 2.4999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 25,
      "time": 5.000000000000002,
      "position": {
        "x": 5.56616705121541,
        "y": 4.107270151070867,
        "z": 5.256719257766799
      },
      "velocity": {
        "x": 0.023780937950975026,
        "y": -0.1343564999118886,
        "z": -0.003766414521155368
      },
      "errorBound": 2.4999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 25,
      "time": 5.000000000000002,
      "position": {
        "x": 5.43383294878459,
        "y": 6.022729848929138,
        "z": 4.743280742233201
      },
      "velocity": {
        "x": -0.023780937950975023,
        "y": 0.16035649991188863,
        "z": 0.00376641452115537
      },
      "errorBound": 2.4999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 25,
      "time": 5.000000000000002,
      "position": {
        "x": 5.306167051215408,
        "y": 6.107270151070867,
        "z": 4.936719257766799
      },
      "velocity": {
        "x": -0.02821906204902498,
        "y": -0.1343564999118886,
        "z": 0.004233585478844633
      },
      "errorBound": 2.4999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 25,
      "time": 5.000000000000002,
      "position": {
        "x": 6.693832948784592,
        "y": 4.152729848929136,
        "z": 5.243280742233201
      },
      "velocity": {
        "x": 0.02821906204902498,
        "y": 0.18635649991188863,
        "z": -0.004233585478844632
      },
      "errorBound": 2.4999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 25,
      "time": 5.000000000000002,
      "position": {
        "x": 6.56616705121541,
        "y": 4.237270151070867,
        "z": 4.7167192577668
      },
      "velocity": {
        "x": 0.023780937950975023,
        "y": -0.1083564999118886,
        "z": -0.003766414521155367
      },
      "errorBound": 2.4999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 25,
      "time": 5.000000000000002,
      "position": {
        "x": 6.43383294878459,
        "y": 6.152729848929135,
        "z": 4.9232807422332
      },
      "velocity": {
        "x": -0.023780937950975026,
        "y": 0.18635649991188866,
        "z": 0.0037664145211553685
      },
      "errorBound": 2.4999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 25,
      "time": 5.000000000000002,
      "position": {
        "x": 6.306167051215408,
        "y": 6.237270151070867,
        "z": 5.116719257766799
      },
      "velocity": {
        "x": -0.028219062049024975,
        "y": -0.1083564999118886,
        "z": 0.004233585478844633
      },
      "errorBound": 2.4999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 26,
      "time": 5.200000000000002,
      "position": {
        "x": 3.699252069214673,
        "y": 3.784549939843282,
        "z": 4.702457676924772
      },
      "velocity": {
        "x": 0.027095602150416183,
        "y": 0.10910045457073582,
        "z": -0.004115326542148963
      },
      "errorBound": 2.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 26,
      "time": 5.200000000000002,
      "position": {
        "x": 3.5711479307853256,
        "y": 3.8098500601567187,
        "z": 4.8959423230752295
      },
      "velocity": {
        "x": 0.024904397849583825,
        "y": -0.18710045457073587,
        "z": -0.0038846734578510383
      },
      "errorBound": 2.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 26,
      "time": 5.200000000000002,
      "position": {
        "x": 3.4288520692146744,
        "y": 5.784549939843281,
        "z": 5.1040576769247705
      },
      "velocity": {
        "x": -0.024904397849583832,
        "y": 0.10910045457073583,
        "z": 0.0038846734578510374
      },
      "errorBound": 2.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 26,
      "time": 5.200000000000002,
      "position": {
        "x": 3.300747930785327,
        "y": 5.809850060156718,
        "z": 5.297542323075228
      },
      "velocity": {
        "x": -0.02709560215041618,
        "y": -0.18710045457073585,
        "z": 0.004115326542148962
      },
      "errorBound": 2.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 26,
      "time": 5.200000000000002,
      "position": {
        "x": 4.699252069214675,
        "y": 3.919749939843283,
        "z": 4.882457676924771
      },
      "velocity": {
        "x": 0.027095602150416172,
        "y": 0.13510045457073586,
        "z": -0.004115326542148964
      },
      "errorBound": 2.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 26,
      "time": 5.200000000000002,
      "position": {
        "x": 4.571147930785327,
        "y": 3.9450500601567153,
        "z": 5.075942323075229
      },
      "velocity": {
        "x": 0.024904397849583825,
        "y": -0.16110045457073585,
        "z": -0.003884673457851039
      },
      "errorBound": 2.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 26,
      "time": 5.200000000000002,
      "position": {
        "x": 4.428852069214673,
        "y": 5.919749939843281,
        "z": 5.28405767692477
      },
      "velocity": {
        "x": -0.024904397849583825,
        "y": 0.13510045457073583,
        "z": 0.0038846734578510374
      },
      "errorBound": 2.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 26,
      "time": 5.200000000000002,
      "position": {
        "x": 4.300747930785325,
        "y": 5.945050060156715,
        "z": 4.75754232307523
      },
      "velocity": {
        "x": -0.027095602150416176,
        "y": -0.16110045457073588,
        "z": 0.004115326542148964
      },
      "errorBound": 2.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 26,
      "time": 5.200000000000002,
      "position": {
        "x": 5.699252069214675,
        "y": 4.054949939843281,
        "z": 5.062457676924771
      },
      "velocity": {
        "x": 0.027095602150416183,
        "y": 0.16110045457073585,
        "z": -0.004115326542148964
      },
      "errorBound": 2.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 26,
      "time": 5.200000000000002,
      "position": {
        "x": 5.571147930785327,
        "y": 4.080250060156719,
        "z": 5.255942323075229
      },
      "velocity": {
        "x": 0.02490439784958383,
        "y": -0.13510045457073583,
        "z": -0.0038846734578510374
      },
      "errorBound": 2.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 26,
      "time": 5.200000000000002,
      "position": {
        "x": 5.428852069214673,
        "y": 6.054949939843285,
        "z": 4.744057676924771
      },
      "velocity": {
        "x": -0.024904397849583825,
        "y": 0.16110045457073585,
        "z": 0.0038846734578510396
      },
      "errorBound": 2.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 26,
      "time": 5.200000000000002,
      "position": {
        "x": 5.300747930785325,
        "y": 6.080250060156719,
        "z": 4.937542323075229
      },
      "velocity": {
        "x": -0.02709560215041618,
        "y": -0.13510045457073583,
        "z": 0.004115326542148964
      },
      "errorBound": 2.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 26,
      "time": 5.200000000000002,
      "position": {
        "x": 6.699252069214675,
        "y": 4.190149939843283,
        "z": 5.242457676924771
      },
      "velocity": {
        "x": 0.02709560215041618,
        "y": 0.18710045457073585,
        "z": -0.004115326542148963
      },
      "errorBound": 2.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 26,
      "time": 5.200000000000002,
      "position": {
        "x": 6.571147930785327,
        "y": 4.215450060156719,
        "z": 4.71594232307523
      },
      "velocity": {
        "x": 0.024904397849583825,
        "y": -0.10910045457073583,
        "z": -0.0038846734578510365
      },
      "errorBound": 2.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 26,
      "time": 5.200000000000002,
      "position": {
        "x": 6.428852069214673,
        "y": 6.190149939843282,
        "z": 4.924057676924771
      },
      "velocity": {
        "x": -0.02490439784958383,
        "y": 0.18710045457073587,
        "z": 0.003884673457851038
      },
      "errorBound": 2.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 26,
      "time": 5.200000000000002,
      "position": {
        "x": 6.300747930785325,
        "y": 6.215450060156719,
        "z": 5.117542323075229
      },
      "velocity": {
        "x": -0.027095602150416176,
        "y": -0.10910045457073583,
        "z": 0.004115326542148964
      },
      "errorBound": 2.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 27,
      "time": 5.400000000000002,
      "position": {
        "x": 3.704445726361121,
        "y": 3.806414558969181,
        "z": 4.701658344593567
      },
      "velocity": {
        "x": 0.025968285732237917,
        "y": 0.10932309562949405,
        "z": -0.003996661656024931
      },
      "errorBound": 2.7e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 27,
      "time": 5.400000000000002,
      "position": {
        "x": 3.576354273638878,
        "y": 3.7723854410308197,
        "z": 4.895141655406435
      },
      "velocity": {
        "x": 0.02603171426776209,
        "y": -0.18732309562949412,
        "z": -0.00400333834397507
      },
      "errorBound": 2.7e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 27,
      "time": 5.400000000000002,
      "position": {
        "x": 3.423645726361122,
        "y": 5.80641455896918,
        "z": 5.104858344593565
      },
      "velocity": {
        "x": -0.026031714267762098,
        "y": 0.10932309562949406,
        "z": 0.004003338343975069
      },
      "errorBound": 2.7e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 27,
      "time": 5.400000000000002,
      "position": {
        "x": 3.295554273638879,
        "y": 5.772385441030819,
        "z": 5.298341655406433
      },
      "velocity": {
        "x": -0.025968285732237913,
        "y": -0.1873230956294941,
        "z": 0.00399666165602493
      },
      "errorBound": 2.7e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 27,
      "time": 5.400000000000002,
      "position": {
        "x": 4.704445726361123,
        "y": 3.946814558969182,
        "z": 4.881658344593566
      },
      "velocity": {
        "x": 0.025968285732237906,
        "y": 0.1353230956294941,
        "z": -0.003996661656024931
      },
      "errorBound": 2.7e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 27,
      "time": 5.400000000000002,
      "position": {
        "x": 4.576354273638879,
        "y": 3.9127854410308163,
        "z": 5.075141655406434
      },
      "velocity": {
        "x": 0.02603171426776209,
        "y": -0.1613230956294941,
        "z": -0.004003338343975071
      },
      "errorBound": 2.7e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 27,
      "time": 5.400000000000002,
      "position": {
        "x": 4.423645726361121,
        "y": 5.94681455896918,
        "z": 5.284858344593565
      },
      "velocity": {
        "x": -0.02603171426776209,
        "y": 0.13532309562949407,
        "z": 0.004003338343975069
      },
      "errorBound": 2.7e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 27,
      "time": 5.400000000000002,
      "position": {
        "x": 4.295554273638877,
        "y": 5.912785441030817,
        "z": 4.758341655406435
      },
      "velocity": {
        "x": -0.02596828573223791,
        "y": -0.16132309562949412,
        "z": 0.003996661656024932
      },
      "errorBound": 2.7e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 27,
      "time": 5.400000000000002,
      "position": {
        "x": 5.704445726361123,
        "y": 4.08721455896918,
        "z": 5.061658344593566
      },
      "velocity": {
        "x": 0.025968285732237917,
        "y": 0.1613230956294941,
        "z": -0.003996661656024932
      },
      "errorBound": 2.7e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 27,
      "time": 5.400000000000002,
      "position": {
        "x": 5.576354273638879,
        "y": 4.05318544103082,
        "z": 5.255141655406434
      },
      "velocity": {
        "x": 0.026031714267762095,
        "y": -0.13532309562949407,
        "z": -0.004003338343975069
      },
      "errorBound": 2.7e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 27,
      "time": 5.400000000000002,
      "position": {
        "x": 5.423645726361121,
        "y": 6.087214558969183,
        "z": 4.744858344593566
      },
      "velocity": {
        "x": -0.02603171426776209,
        "y": 0.1613230956294941,
        "z": 0.004003338343975072
      },
      "errorBound": 2.7e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 27,
      "time": 5.400000000000002,
      "position": {
        "x": 5.295554273638877,
        "y": 6.05318544103082,
        "z": 4.938341655406434
      },
      "velocity": {
        "x": -0.025968285732237913,
        "y": -0.13532309562949407,
        "z": 0.003996661656024932
      },
      "errorBound": 2.7e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 27,
      "time": 5.400000000000002,
      "position": {
        "x": 6.704445726361123,
        "y": 4.227614558969182,
        "z": 5.241658344593566
      },
      "velocity": {
        "x": 0.025968285732237913,
        "y": 0.1873230956294941,
        "z": -0.003996661656024931
      },
      "errorBound": 2.7e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 27,
      "time": 5.400000000000002,
      "position": {
        "x": 6.576354273638879,
        "y": 4.19358544103082,
        "z": 4.715141655406435
      },
      "velocity": {
        "x": 0.02603171426776209,
        "y": -0.10932309562949406,
        "z": -0.004003338343975069
      },
      "errorBound": 2.7e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 27,
      "time": 5.400000000000002,
      "position": {
        "x": 6.423645726361121,
        "y": 6.227614558969181,
        "z": 4.924858344593566
      },
      "velocity": {
        "x": -0.026031714267762095,
        "y": 0.18732309562949412,
        "z": 0.00400333834397507
      },
      "errorBound": 2.7e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 27,
      "time": 5.400000000000002,
      "position": {
        "x": 6.295554273638877,
        "y": 6.19358544103082,
        "z": 5.118341655406434
      },
      "velocity": {
        "x": -0.02596828573223791,
        "y": -0.10932309562949406,
        "z": 0.003996661656024931
      },
      "errorBound": 2.7e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 28,
      "time": 5.600000000000002,
      "position": {
        "x": 3.709413942550777,
        "y": 3.8282192868475082,
        "z": 4.700882742889393
      },
      "velocity": {
        "x": 0.02484108094828217,
        "y": 0.10902363939163646,
        "z": -0.003878008520871689
      },
      "errorBound": 2.7999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 28,
      "time": 5.600000000000002,
      "position": {
        "x": 3.5817860574492215,
        "y": 3.7349807131524924,
        "z": 4.894317257110609
      },
      "velocity": {
        "x": 0.02715891905171784,
        "y": -0.18702363939163652,
        "z": -0.004121991479128312
      },
      "errorBound": 2.7999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 28,
      "time": 5.600000000000002,
      "position": {
        "x": 3.4182139425507785,
        "y": 5.8282192868475065,
        "z": 5.105682742889391
      },
      "velocity": {
        "x": -0.027158919051717845,
        "y": 0.10902363939163648,
        "z": 0.004121991479128311
      },
      "errorBound": 2.7999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 28,
      "time": 5.600000000000002,
      "position": {
        "x": 3.290586057449223,
        "y": 5.734980713152492,
        "z": 5.299117257110607
      },
      "velocity": {
        "x": -0.024841080948282166,
        "y": -0.1870236393916365,
        "z": 0.0038780085208716883
      },
      "errorBound": 2.7999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 28,
      "time": 5.600000000000002,
      "position": {
        "x": 4.709413942550779,
        "y": 3.973819286847509,
        "z": 4.8808827428893915
      },
      "velocity": {
        "x": 0.02484108094828216,
        "y": 0.1350236393916365,
        "z": -0.003878008520871689
      },
      "errorBound": 2.7999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 28,
      "time": 5.600000000000002,
      "position": {
        "x": 4.581786057449222,
        "y": 3.8805807131524888,
        "z": 5.074317257110609
      },
      "velocity": {
        "x": 0.027158919051717835,
        "y": -0.1610236393916365,
        "z": -0.004121991479128313
      },
      "errorBound": 2.7999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 28,
      "time": 5.600000000000002,
      "position": {
        "x": 4.418213942550778,
        "y": 5.973819286847507,
        "z": 5.28568274288939
      },
      "velocity": {
        "x": -0.02715891905171784,
        "y": 0.13502363939163647,
        "z": 0.004121991479128311
      },
      "errorBound": 2.7999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 28,
      "time": 5.600000000000002,
      "position": {
        "x": 4.290586057449221,
        "y": 5.880580713152489,
        "z": 4.759117257110609
      },
      "velocity": {
        "x": -0.024841080948282163,
        "y": -0.16102363939163652,
        "z": 0.00387800852087169
      },
      "errorBound": 2.7999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 28,
      "time": 5.600000000000002,
      "position": {
        "x": 5.709413942550779,
        "y": 4.119419286847507,
        "z": 5.060882742889391
      },
      "velocity": {
        "x": 0.02484108094828217,
        "y": 0.1610236393916365,
        "z": -0.00387800852087169
      },
      "errorBound": 2.7999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 28,
      "time": 5.600000000000002,
      "position": {
        "x": 5.581786057449222,
        "y": 4.026180713152493,
        "z": 5.254317257110609
      },
      "velocity": {
        "x": 0.027158919051717842,
        "y": -0.13502363939163647,
        "z": -0.004121991479128311
      },
      "errorBound": 2.7999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 28,
      "time": 5.600000000000002,
      "position": {
        "x": 5.418213942550778,
        "y": 6.119419286847511,
        "z": 4.745682742889391
      },
      "velocity": {
        "x": -0.02715891905171784,
        "y": 0.1610236393916365,
        "z": 0.004121991479128314
      },
      "errorBound": 2.7999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 28,
      "time": 5.600000000000002,
      "position": {
        "x": 5.290586057449221,
        "y": 6.026180713152493,
        "z": 4.939117257110609
      },
      "velocity": {
        "x": -0.024841080948282166,
        "y": -0.13502363939163647,
        "z": 0.00387800852087169
      },
      "errorBound": 2.7999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 28,
      "time": 5.600000000000002,
      "position": {
        "x": 6.709413942550779,
        "y": 4.265019286847509,
        "z": 5.240882742889392
      },
      "velocity": {
        "x": 0.024841080948282166,
        "y": 0.1870236393916365,
        "z": -0.003878008520871689
      },
      "errorBound": 2.7999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 28,
      "time": 5.600000000000002,
      "position": {
        "x": 6.581786057449222,
        "y": 4.1717807131524935,
        "z": 4.71431725711061
      },
      "velocity": {
        "x": 0.02715891905171784,
        "y": -0.10902363939163648,
        "z": -0.004121991479128311
      },
      "errorBound": 2.7999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 28,
      "time": 5.600000000000002,
      "position": {
        "x": 6.418213942550778,
        "y": 6.265019286847508,
        "z": 4.925682742889391
      },
      "velocity": {
        "x": -0.027158919051717842,
        "y": 0.18702363939163652,
        "z": 0.004121991479128312
      },
      "errorBound": 2.7999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 28,
      "time": 5.600000000000002,
      "position": {
        "x": 6.290586057449221,
        "y": 6.1717807131524935,
        "z": 5.1191172571106085
      },
      "velocity": {
        "x": -0.024841080948282163,
        "y": -0.10902363939163648,
        "z": 0.003878008520871689
      },
      "errorBound": 2.7999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 29,
      "time": 5.8000000000000025,
      "position": {
        "x": 3.7141575336626547,
        "y": 3.849859914836132,
        "z": 4.700130785930248
      },
      "velocity": {
        "x": 0.023717955559388472,
        "y": 0.10820313994312032,
        "z": -0.0037597847957249755
      },
      "errorBound": 2.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 29,
      "time": 5.8000000000000025,
      "position": {
        "x": 3.5874424663373436,
        "y": 3.6977400851638684,
        "z": 4.893469214069754
      },
      "velocity": {
        "x": 0.028282044440611536,
        "y": -0.18620313994312038,
        "z": -0.004240215204275025
      },
      "errorBound": 2.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 29,
      "time": 5.8000000000000025,
      "position": {
        "x": 3.4125575336626564,
        "y": 5.849859914836131,
        "z": 5.106530785930246
      },
      "velocity": {
        "x": -0.028282044440611543,
        "y": 0.10820313994312034,
        "z": 0.004240215204275024
      },
      "errorBound": 2.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 29,
      "time": 5.8000000000000025,
      "position": {
        "x": 3.2858424663373453,
        "y": 5.6977400851638675,
        "z": 5.299869214069752
      },
      "velocity": {
        "x": -0.023717955559388465,
        "y": -0.18620313994312035,
        "z": 0.0037597847957249746
      },
      "errorBound": 2.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 29,
      "time": 5.8000000000000025,
      "position": {
        "x": 4.714157533662657,
        "y": 4.000659914836133,
        "z": 4.8801307859302465
      },
      "velocity": {
        "x": 0.023717955559388458,
        "y": 0.13420313994312036,
        "z": -0.0037597847957249755
      },
      "errorBound": 2.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 29,
      "time": 5.8000000000000025,
      "position": {
        "x": 4.587442466337345,
        "y": 3.8485400851638647,
        "z": 5.073469214069754
      },
      "velocity": {
        "x": 0.028282044440611533,
        "y": -0.16020313994312035,
        "z": -0.004240215204275026
      },
      "errorBound": 2.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 29,
      "time": 5.8000000000000025,
      "position": {
        "x": 4.412557533662655,
        "y": 6.000659914836131,
        "z": 5.286530785930245
      },
      "velocity": {
        "x": -0.028282044440611536,
        "y": 0.13420313994312033,
        "z": 0.004240215204275024
      },
      "errorBound": 2.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 29,
      "time": 5.8000000000000025,
      "position": {
        "x": 4.285842466337343,
        "y": 5.848540085163865,
        "z": 4.759869214069754
      },
      "velocity": {
        "x": -0.023717955559388465,
        "y": -0.16020313994312038,
        "z": 0.0037597847957249763
      },
      "errorBound": 2.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 29,
      "time": 5.8000000000000025,
      "position": {
        "x": 5.714157533662657,
        "y": 4.151459914836131,
        "z": 5.060130785930246
      },
      "velocity": {
        "x": 0.023717955559388472,
        "y": 0.16020313994312035,
        "z": -0.0037597847957249763
      },
      "errorBound": 2.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 29,
      "time": 5.8000000000000025,
      "position": {
        "x": 5.587442466337345,
        "y": 3.9993400851638685,
        "z": 5.253469214069754
      },
      "velocity": {
        "x": 0.02828204444061154,
        "y": -0.13420313994312033,
        "z": -0.004240215204275024
      },
      "errorBound": 2.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 29,
      "time": 5.8000000000000025,
      "position": {
        "x": 5.412557533662655,
        "y": 6.151459914836135,
        "z": 4.746530785930246
      },
      "velocity": {
        "x": -0.028282044440611536,
        "y": 0.16020313994312035,
        "z": 0.004240215204275027
      },
      "errorBound": 2.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 29,
      "time": 5.8000000000000025,
      "position": {
        "x": 5.285842466337343,
        "y": 5.999340085163869,
        "z": 4.939869214069754
      },
      "velocity": {
        "x": -0.02371795555938847,
        "y": -0.13420313994312033,
        "z": 0.0037597847957249763
      },
      "errorBound": 2.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 29,
      "time": 5.8000000000000025,
      "position": {
        "x": 6.714157533662657,
        "y": 4.302259914836133,
        "z": 5.240130785930247
      },
      "velocity": {
        "x": 0.02371795555938847,
        "y": 0.18620313994312035,
        "z": -0.0037597847957249755
      },
      "errorBound": 2.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 29,
      "time": 5.8000000000000025,
      "position": {
        "x": 6.587442466337345,
        "y": 4.150140085163869,
        "z": 4.713469214069755
      },
      "velocity": {
        "x": 0.028282044440611536,
        "y": -0.10820313994312034,
        "z": -0.004240215204275024
      },
      "errorBound": 2.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 29,
      "time": 5.8000000000000025,
      "position": {
        "x": 6.412557533662655,
        "y": 6.3022599148361325,
        "z": 4.926530785930246
      },
      "velocity": {
        "x": -0.02828204444061154,
        "y": 0.18620313994312038,
        "z": 0.004240215204275025
      },
      "errorBound": 2.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 29,
      "time": 5.8000000000000025,
      "position": {
        "x": 6.285842466337343,
        "y": 6.150140085163869,
        "z": 5.1198692140697535
      },
      "velocity": {
        "x": -0.023717955559388465,
        "y": -0.10820313994312034,
        "z": 0.0037597847957249755
      },
      "errorBound": 2.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 30,
      "time": 6.000000000000003,
      "position": {
        "x": 3.7186781062560397,
        "y": 3.871232811924533,
        "z": 4.699402304604628
      },
      "velocity": {
        "x": 0.022602862966925725,
        "y": 0.10686448544200439,
        "z": -0.0036424066280973085
      },
      "errorBound": 3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 30,
      "time": 6.000000000000003,
      "position": {
        "x": 3.5933218937439584,
        "y": 3.6607671880754675,
        "z": 4.892597695395374
      },
      "velocity": {
        "x": 0.029397137033074283,
        "y": -0.18486448544200446,
        "z": -0.0043575933719026926
      },
      "errorBound": 3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 30,
      "time": 6.000000000000003,
      "position": {
        "x": 3.4066781062560416,
        "y": 5.871232811924532,
        "z": 5.107402304604626
      },
      "velocity": {
        "x": -0.02939713703307429,
        "y": 0.1068644854420044,
        "z": 0.004357593371902691
      },
      "errorBound": 3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 30,
      "time": 6.000000000000003,
      "position": {
        "x": 3.2813218937439603,
        "y": 5.660767188075466,
        "z": 5.300597695395372
      },
      "velocity": {
        "x": -0.022602862966925718,
        "y": -0.18486448544200443,
        "z": 0.0036424066280973076
      },
      "errorBound": 3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 30,
      "time": 6.000000000000003,
      "position": {
        "x": 4.718678106256043,
        "y": 4.0272328119245335,
        "z": 4.879402304604627
      },
      "velocity": {
        "x": 0.02260286296692571,
        "y": 0.13286448544200444,
        "z": -0.0036424066280973085
      },
      "errorBound": 3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 30,
      "time": 6.000000000000003,
      "position": {
        "x": 4.59332189374396,
        "y": 3.8167671880754637,
        "z": 5.072597695395373
      },
      "velocity": {
        "x": 0.02939713703307428,
        "y": -0.15886448544200443,
        "z": -0.0043575933719026926
      },
      "errorBound": 3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 30,
      "time": 6.000000000000003,
      "position": {
        "x": 4.40667810625604,
        "y": 6.027232811924532,
        "z": 5.287402304604626
      },
      "velocity": {
        "x": -0.029397137033074283,
        "y": 0.1328644854420044,
        "z": 0.004357593371902692
      },
      "errorBound": 3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 30,
      "time": 6.000000000000003,
      "position": {
        "x": 4.281321893743957,
        "y": 5.816767188075464,
        "z": 4.760597695395374
      },
      "velocity": {
        "x": -0.022602862966925718,
        "y": -0.15886448544200446,
        "z": 0.0036424066280973093
      },
      "errorBound": 3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 30,
      "time": 6.000000000000003,
      "position": {
        "x": 5.718678106256043,
        "y": 4.183232811924532,
        "z": 5.059402304604626
      },
      "velocity": {
        "x": 0.022602862966925725,
        "y": 0.15886448544200443,
        "z": -0.0036424066280973093
      },
      "errorBound": 3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 30,
      "time": 6.000000000000003,
      "position": {
        "x": 5.59332189374396,
        "y": 3.972767188075468,
        "z": 5.252597695395373
      },
      "velocity": {
        "x": 0.029397137033074287,
        "y": -0.1328644854420044,
        "z": -0.004357593371902691
      },
      "errorBound": 3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 30,
      "time": 6.000000000000003,
      "position": {
        "x": 5.40667810625604,
        "y": 6.183232811924536,
        "z": 4.747402304604627
      },
      "velocity": {
        "x": -0.029397137033074283,
        "y": 0.15886448544200443,
        "z": 0.004357593371902693
      },
      "errorBound": 3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 30,
      "time": 6.000000000000003,
      "position": {
        "x": 5.281321893743957,
        "y": 5.972767188075468,
        "z": 4.940597695395374
      },
      "velocity": {
        "x": -0.02260286296692572,
        "y": -0.1328644854420044,
        "z": 0.0036424066280973093
      },
      "errorBound": 3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 30,
      "time": 6.000000000000003,
      "position": {
        "x": 6.718678106256043,
        "y": 4.339232811924535,
        "z": 5.239402304604627
      },
      "velocity": {
        "x": 0.02260286296692572,
        "y": 0.18486448544200443,
        "z": -0.003642406628097308
      },
      "errorBound": 3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 30,
      "time": 6.000000000000003,
      "position": {
        "x": 6.59332189374396,
        "y": 4.128767188075468,
        "z": 4.712597695395374
      },
      "velocity": {
        "x": 0.029397137033074283,
        "y": -0.1068644854420044,
        "z": -0.004357593371902691
      },
      "errorBound": 3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 30,
      "time": 6.000000000000003,
      "position": {
        "x": 6.40667810625604,
        "y": 6.339232811924534,
        "z": 4.927402304604627
      },
      "velocity": {
        "x": -0.029397137033074287,
        "y": 0.18486448544200446,
        "z": 0.004357593371902692
      },
      "errorBound": 3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 30,
      "time": 6.000000000000003,
      "position": {
        "x": 6.281321893743957,
        "y": 6.128767188075468,
        "z": 5.120597695395373
      },
      "velocity": {
        "x": -0.022602862966925718,
        "y": -0.1068644854420044,
        "z": 0.0036424066280973085
      },
      "errorBound": 3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 31,
      "time": 6.200000000000003,
      "position": {
        "x": 3.7229780519154034,
        "y": 3.8922352895149595,
        "z": 4.6986970471668
      },
      "velocity": {
        "x": 0.021499728296819398,
        "y": 0.1050123879521326,
        "z": -0.0035262871891387384
      },
      "errorBound": 3.0999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 31,
      "time": 6.200000000000003,
      "position": {
        "x": 3.5994219480845944,
        "y": 3.624164710485041,
        "z": 4.891702952833201
      },
      "velocity": {
        "x": 0.030500271703180606,
        "y": -0.18301238795213268,
        "z": -0.004473712810861263
      },
      "errorBound": 3.0999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 31,
      "time": 6.200000000000003,
      "position": {
        "x": 3.4005780519154056,
        "y": 5.892235289514959,
        "z": 5.108297047166799
      },
      "velocity": {
        "x": -0.030500271703180613,
        "y": 0.10501238795213261,
        "z": 0.004473712810861261
      },
      "errorBound": 3.0999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 31,
      "time": 6.200000000000003,
      "position": {
        "x": 3.2770219480845966,
        "y": 5.62416471048504,
        "z": 5.3013029528332
      },
      "velocity": {
        "x": -0.02149972829681939,
        "y": -0.18301238795213265,
        "z": 0.0035262871891387376
      },
      "errorBound": 3.0999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 31,
      "time": 6.200000000000003,
      "position": {
        "x": 4.7229780519154065,
        "y": 4.05343528951496,
        "z": 4.878697047166799
      },
      "velocity": {
        "x": 0.021499728296819384,
        "y": 0.13101238795213266,
        "z": -0.003526287189138738
      },
      "errorBound": 3.0999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 31,
      "time": 6.200000000000003,
      "position": {
        "x": 4.599421948084596,
        "y": 3.785364710485037,
        "z": 5.071702952833201
      },
      "velocity": {
        "x": 0.030500271703180606,
        "y": -0.15701238795213265,
        "z": -0.004473712810861263
      },
      "errorBound": 3.0999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 31,
      "time": 6.200000000000003,
      "position": {
        "x": 4.400578051915404,
        "y": 6.053435289514958,
        "z": 5.2882970471667985
      },
      "velocity": {
        "x": -0.030500271703180606,
        "y": 0.13101238795213263,
        "z": 0.004473712810861262
      },
      "errorBound": 3.0999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 31,
      "time": 6.200000000000003,
      "position": {
        "x": 4.2770219480845935,
        "y": 5.785364710485037,
        "z": 4.761302952833201
      },
      "velocity": {
        "x": -0.02149972829681939,
        "y": -0.15701238795213268,
        "z": 0.003526287189138739
      },
      "errorBound": 3.0999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 31,
      "time": 6.200000000000003,
      "position": {
        "x": 5.7229780519154065,
        "y": 4.214635289514959,
        "z": 5.058697047166799
      },
      "velocity": {
        "x": 0.021499728296819398,
        "y": 0.15701238795213265,
        "z": -0.003526287189138739
      },
      "errorBound": 3.0999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 31,
      "time": 6.200000000000003,
      "position": {
        "x": 5.599421948084596,
        "y": 3.9465647104850414,
        "z": 5.251702952833201
      },
      "velocity": {
        "x": 0.030500271703180613,
        "y": -0.13101238795213263,
        "z": -0.004473712810861261
      },
      "errorBound": 3.0999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 31,
      "time": 6.200000000000003,
      "position": {
        "x": 5.400578051915404,
        "y": 6.214635289514963,
        "z": 4.748297047166799
      },
      "velocity": {
        "x": -0.03050027170318061,
        "y": 0.15701238795213265,
        "z": 0.004473712810861264
      },
      "errorBound": 3.0999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 31,
      "time": 6.200000000000003,
      "position": {
        "x": 5.2770219480845935,
        "y": 5.946564710485042,
        "z": 4.941302952833201
      },
      "velocity": {
        "x": -0.021499728296819395,
        "y": -0.13101238795213263,
        "z": 0.003526287189138739
      },
      "errorBound": 3.0999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 31,
      "time": 6.200000000000003,
      "position": {
        "x": 6.7229780519154065,
        "y": 4.375835289514962,
        "z": 5.2386970471667995
      },
      "velocity": {
        "x": 0.021499728296819395,
        "y": 0.18301238795213265,
        "z": -0.003526287189138738
      },
      "errorBound": 3.0999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 31,
      "time": 6.200000000000003,
      "position": {
        "x": 6.599421948084596,
        "y": 4.107764710485041,
        "z": 4.7117029528332015
      },
      "velocity": {
        "x": 0.030500271703180606,
        "y": -0.10501238795213261,
        "z": -0.004473712810861261
      },
      "errorBound": 3.0999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 31,
      "time": 6.200000000000003,
      "position": {
        "x": 6.400578051915404,
        "y": 6.375835289514961,
        "z": 4.928297047166799
      },
      "velocity": {
        "x": -0.030500271703180613,
        "y": 0.18301238795213268,
        "z": 0.004473712810861262
      },
      "errorBound": 3.0999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 31,
      "time": 6.200000000000003,
      "position": {
        "x": 6.2770219480845935,
        "y": 6.107764710485041,
        "z": 5.121302952833201
      },
      "velocity": {
        "x": -0.02149972829681939,
        "y": -0.10501238795213261,
        "z": 0.003526287189138738
      },
      "errorBound": 3.0999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 32,
      "time": 6.400000000000003,
      "position": {
        "x": 3.727060538832025,
        "y": 3.912765962886293,
        "z": 4.698014680122945
      },
      "velocity": {
        "x": 0.020412434583108267,
        "y": 0.1026533668566693,
        "z": -0.0034118352192744035
      },
      "errorBound": 3.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 32,
      "time": 6.400000000000003,
      "position": {
        "x": 3.6057394611679725,
        "y": 3.588034037113707,
        "z": 4.890785319877056
      },
      "velocity": {
        "x": 0.031587565416891734,
        "y": -0.18065336685666938,
        "z": -0.004588164780725598
      },
      "errorBound": 3.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 32,
      "time": 6.400000000000003,
      "position": {
        "x": 3.3942605388320275,
        "y": 5.912765962886293,
        "z": 5.109214680122944
      },
      "velocity": {
        "x": -0.03158756541689174,
        "y": 0.10265336685666931,
        "z": 0.004588164780725597
      },
      "errorBound": 3.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 32,
      "time": 6.400000000000003,
      "position": {
        "x": 3.272939461167975,
        "y": 5.588034037113706,
        "z": 5.301985319877055
      },
      "velocity": {
        "x": -0.020412434583108263,
        "y": -0.18065336685666936,
        "z": 0.0034118352192744027
      },
      "errorBound": 3.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 32,
      "time": 6.400000000000003,
      "position": {
        "x": 4.727060538832029,
        "y": 4.079165962886294,
        "z": 4.878014680122944
      },
      "velocity": {
        "x": 0.020412434583108253,
        "y": 0.12865336685666937,
        "z": -0.003411835219274403
      },
      "errorBound": 3.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 32,
      "time": 6.400000000000003,
      "position": {
        "x": 4.605739461167975,
        "y": 3.754434037113703,
        "z": 5.070785319877055
      },
      "velocity": {
        "x": 0.031587565416891734,
        "y": -0.15465336685666936,
        "z": -0.004588164780725598
      },
      "errorBound": 3.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 32,
      "time": 6.400000000000003,
      "position": {
        "x": 4.394260538832025,
        "y": 6.079165962886292,
        "z": 5.289214680122944
      },
      "velocity": {
        "x": -0.031587565416891734,
        "y": 0.12865336685666934,
        "z": 0.004588164780725597
      },
      "errorBound": 3.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 32,
      "time": 6.400000000000003,
      "position": {
        "x": 4.272939461167971,
        "y": 5.754434037113704,
        "z": 4.7619853198770565
      },
      "velocity": {
        "x": -0.02041243458310826,
        "y": -0.1546533668566694,
        "z": 0.003411835219274404
      },
      "errorBound": 3.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 32,
      "time": 6.400000000000003,
      "position": {
        "x": 5.727060538832029,
        "y": 4.2455659628862925,
        "z": 5.058014680122944
      },
      "velocity": {
        "x": 0.02041243458310827,
        "y": 0.15465336685666936,
        "z": -0.003411835219274404
      },
      "errorBound": 3.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 32,
      "time": 6.400000000000003,
      "position": {
        "x": 5.605739461167975,
        "y": 3.9208340371137074,
        "z": 5.250785319877055
      },
      "velocity": {
        "x": 0.03158756541689174,
        "y": -0.12865336685666934,
        "z": -0.004588164780725597
      },
      "errorBound": 3.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 32,
      "time": 6.400000000000003,
      "position": {
        "x": 5.394260538832025,
        "y": 6.245565962886296,
        "z": 4.749214680122945
      },
      "velocity": {
        "x": -0.03158756541689174,
        "y": 0.15465336685666936,
        "z": 0.004588164780725599
      },
      "errorBound": 3.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 32,
      "time": 6.400000000000003,
      "position": {
        "x": 5.272939461167971,
        "y": 5.920834037113708,
        "z": 4.941985319877056
      },
      "velocity": {
        "x": -0.020412434583108267,
        "y": -0.12865336685666934,
        "z": 0.003411835219274404
      },
      "errorBound": 3.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 32,
      "time": 6.400000000000003,
      "position": {
        "x": 6.727060538832029,
        "y": 4.4119659628862955,
        "z": 5.238014680122944
      },
      "velocity": {
        "x": 0.020412434583108267,
        "y": 0.18065336685666936,
        "z": -0.003411835219274403
      },
      "errorBound": 3.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 32,
      "time": 6.400000000000003,
      "position": {
        "x": 6.605739461167975,
        "y": 4.087234037113707,
        "z": 4.710785319877056
      },
      "velocity": {
        "x": 0.031587565416891734,
        "y": -0.10265336685666931,
        "z": -0.004588164780725597
      },
      "errorBound": 3.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 32,
      "time": 6.400000000000003,
      "position": {
        "x": 6.394260538832025,
        "y": 6.411965962886295,
        "z": 4.929214680122945
      },
      "velocity": {
        "x": -0.03158756541689174,
        "y": 0.18065336685666938,
        "z": 0.0045881647807255975
      },
      "errorBound": 3.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 32,
      "time": 6.400000000000003,
      "position": {
        "x": 6.272939461167971,
        "y": 6.087234037113707,
        "z": 5.121985319877056
      },
      "velocity": {
        "x": -0.02041243458310826,
        "y": -0.10265336685666931,
        "z": 0.0034118352192744027
      },
      "errorBound": 3.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 33,
      "time": 6.600000000000003,
      "position": {
        "x": 3.730929500651958,
        "y": 3.9327251080682673,
        "z": 4.697354789405058
      },
      "velocity": {
        "x": 0.019344809099664594,
        "y": 0.09979572590987053,
        "z": -0.0032994535894382243
      },
      "errorBound": 3.3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 33,
      "time": 6.600000000000003,
      "position": {
        "x": 3.6122704993480395,
        "y": 3.552474891931733,
        "z": 4.8898452105949435
      },
      "velocity": {
        "x": 0.032655190900335404,
        "y": -0.1777957259098706,
        "z": -0.004700546410561778
      },
      "errorBound": 3.3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 33,
      "time": 6.600000000000003,
      "position": {
        "x": 3.3877295006519605,
        "y": 5.932725108068267,
        "z": 5.1101547894050565
      },
      "velocity": {
        "x": -0.03265519090033541,
        "y": 0.09979572590987054,
        "z": 0.004700546410561776
      },
      "errorBound": 3.3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 33,
      "time": 6.600000000000003,
      "position": {
        "x": 3.269070499348042,
        "y": 5.552474891931732,
        "z": 5.302645210594942
      },
      "velocity": {
        "x": -0.01934480909966459,
        "y": -0.17779572590987058,
        "z": 0.003299453589438223
      },
      "errorBound": 3.3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 33,
      "time": 6.600000000000003,
      "position": {
        "x": 4.730929500651961,
        "y": 4.104325108068268,
        "z": 4.877354789405056
      },
      "velocity": {
        "x": 0.01934480909966458,
        "y": 0.1257957259098706,
        "z": -0.0032994535894382234
      },
      "errorBound": 3.3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 33,
      "time": 6.600000000000003,
      "position": {
        "x": 4.612270499348042,
        "y": 3.724074891931729,
        "z": 5.069845210594943
      },
      "velocity": {
        "x": 0.032655190900335404,
        "y": -0.1517957259098706,
        "z": -0.004700546410561778
      },
      "errorBound": 3.3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 33,
      "time": 6.600000000000003,
      "position": {
        "x": 4.387729500651958,
        "y": 6.104325108068267,
        "z": 5.290154789405056
      },
      "velocity": {
        "x": -0.032655190900335404,
        "y": 0.12579572590987056,
        "z": 0.004700546410561776
      },
      "errorBound": 3.3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 33,
      "time": 6.600000000000003,
      "position": {
        "x": 4.269070499348039,
        "y": 5.72407489193173,
        "z": 4.762645210594944
      },
      "velocity": {
        "x": -0.019344809099664587,
        "y": -0.15179572590987062,
        "z": 0.0032994535894382243
      },
      "errorBound": 3.3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 33,
      "time": 6.600000000000003,
      "position": {
        "x": 5.730929500651961,
        "y": 4.275925108068266,
        "z": 5.057354789405056
      },
      "velocity": {
        "x": 0.019344809099664597,
        "y": 0.1517957259098706,
        "z": -0.0032994535894382243
      },
      "errorBound": 3.3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 33,
      "time": 6.600000000000003,
      "position": {
        "x": 5.612270499348042,
        "y": 3.8956748919317334,
        "z": 5.249845210594943
      },
      "velocity": {
        "x": 0.03265519090033541,
        "y": -0.12579572590987056,
        "z": -0.004700546410561776
      },
      "errorBound": 3.3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 33,
      "time": 6.600000000000003,
      "position": {
        "x": 5.387729500651958,
        "y": 6.27592510806827,
        "z": 4.750154789405057
      },
      "velocity": {
        "x": -0.03265519090033541,
        "y": 0.1517957259098706,
        "z": 0.004700546410561779
      },
      "errorBound": 3.3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 33,
      "time": 6.600000000000003,
      "position": {
        "x": 5.269070499348039,
        "y": 5.895674891931733,
        "z": 4.942645210594944
      },
      "velocity": {
        "x": -0.019344809099664594,
        "y": -0.12579572590987056,
        "z": 0.0032994535894382243
      },
      "errorBound": 3.3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 33,
      "time": 6.600000000000003,
      "position": {
        "x": 6.730929500651961,
        "y": 4.44752510806827,
        "z": 5.237354789405057
      },
      "velocity": {
        "x": 0.019344809099664594,
        "y": 0.17779572590987058,
        "z": -0.0032994535894382234
      },
      "errorBound": 3.3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 33,
      "time": 6.600000000000003,
      "position": {
        "x": 6.612270499348042,
        "y": 4.067274891931733,
        "z": 4.709845210594944
      },
      "velocity": {
        "x": 0.032655190900335404,
        "y": -0.09979572590987054,
        "z": -0.004700546410561776
      },
      "errorBound": 3.3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 33,
      "time": 6.600000000000003,
      "position": {
        "x": 6.387729500651958,
        "y": 6.447525108068269,
        "z": 4.930154789405057
      },
      "velocity": {
        "x": -0.03265519090033541,
        "y": 0.1777957259098706,
        "z": 0.004700546410561777
      },
      "errorBound": 3.3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 33,
      "time": 6.600000000000003,
      "position": {
        "x": 6.269070499348039,
        "y": 6.067274891931733,
        "z": 5.122645210594944
      },
      "velocity": {
        "x": -0.019344809099664587,
        "y": -0.09979572590987054,
        "z": 0.003299453589438223
      },
      "errorBound": 3.3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 34,
      "time": 6.800000000000003,
      "position": {
        "x": 3.734589622629596,
        "y": 3.952015012869841,
        "z": 4.696716881828464
      },
      "velocity": {
        "x": 0.018300609888190104,
        "y": 0.096449524007869,
        "z": -0.0031895378829672207
      },
      "errorBound": 3.3999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 34,
      "time": 6.800000000000003,
      "position": {
        "x": 3.6190103773704014,
        "y": 3.517584987130159,
        "z": 4.888883118171537
      },
      "velocity": {
        "x": 0.0336993901118099,
        "y": -0.1744495240078691,
        "z": -0.004810462117032782
      },
      "errorBound": 3.3999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 34,
      "time": 6.800000000000003,
      "position": {
        "x": 3.3809896226295986,
        "y": 5.952015012869841,
        "z": 5.111116881828463
      },
      "velocity": {
        "x": -0.033699390111809904,
        "y": 0.09644952400786902,
        "z": 0.00481046211703278
      },
      "errorBound": 3.3999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 34,
      "time": 6.800000000000003,
      "position": {
        "x": 3.265410377370404,
        "y": 5.517584987130158,
        "z": 5.303283118171536
      },
      "velocity": {
        "x": -0.0183006098881901,
        "y": -0.17444952400786906,
        "z": 0.0031895378829672194
      },
      "errorBound": 3.3999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 34,
      "time": 6.800000000000003,
      "position": {
        "x": 4.734589622629599,
        "y": 4.128815012869842,
        "z": 4.876716881828463
      },
      "velocity": {
        "x": 0.018300609888190086,
        "y": 0.12244952400786907,
        "z": -0.00318953788296722
      },
      "errorBound": 3.3999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 34,
      "time": 6.800000000000003,
      "position": {
        "x": 4.619010377370404,
        "y": 3.694384987130155,
        "z": 5.068883118171537
      },
      "velocity": {
        "x": 0.0336993901118099,
        "y": -0.14844952400786907,
        "z": -0.004810462117032782
      },
      "errorBound": 3.3999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 34,
      "time": 6.800000000000003,
      "position": {
        "x": 4.380989622629596,
        "y": 6.128815012869841,
        "z": 5.291116881828462
      },
      "velocity": {
        "x": -0.0336993901118099,
        "y": 0.12244952400786904,
        "z": 0.00481046211703278
      },
      "errorBound": 3.3999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 34,
      "time": 6.800000000000003,
      "position": {
        "x": 4.265410377370401,
        "y": 5.694384987130157,
        "z": 4.763283118171538
      },
      "velocity": {
        "x": -0.018300609888190093,
        "y": -0.1484495240078691,
        "z": 0.0031895378829672207
      },
      "errorBound": 3.3999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 34,
      "time": 6.800000000000003,
      "position": {
        "x": 5.734589622629599,
        "y": 4.30561501286984,
        "z": 5.0567168818284625
      },
      "velocity": {
        "x": 0.018300609888190107,
        "y": 0.14844952400786907,
        "z": -0.0031895378829672207
      },
      "errorBound": 3.3999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 34,
      "time": 6.800000000000003,
      "position": {
        "x": 5.619010377370404,
        "y": 3.87118498713016,
        "z": 5.248883118171537
      },
      "velocity": {
        "x": 0.033699390111809904,
        "y": -0.12244952400786904,
        "z": -0.00481046211703278
      },
      "errorBound": 3.3999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 34,
      "time": 6.800000000000003,
      "position": {
        "x": 5.380989622629596,
        "y": 6.305615012869843,
        "z": 4.751116881828463
      },
      "velocity": {
        "x": -0.033699390111809904,
        "y": 0.14844952400786907,
        "z": 0.0048104621170327825
      },
      "errorBound": 3.3999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 34,
      "time": 6.800000000000003,
      "position": {
        "x": 5.265410377370401,
        "y": 5.871184987130159,
        "z": 4.9432831181715375
      },
      "velocity": {
        "x": -0.0183006098881901,
        "y": -0.12244952400786904,
        "z": 0.0031895378829672207
      },
      "errorBound": 3.3999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 34,
      "time": 6.800000000000003,
      "position": {
        "x": 6.734589622629599,
        "y": 4.4824150128698435,
        "z": 5.236716881828463
      },
      "velocity": {
        "x": 0.018300609888190104,
        "y": 0.17444952400786906,
        "z": -0.00318953788296722
      },
      "errorBound": 3.3999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 34,
      "time": 6.800000000000003,
      "position": {
        "x": 6.619010377370404,
        "y": 4.047984987130159,
        "z": 4.708883118171538
      },
      "velocity": {
        "x": 0.0336993901118099,
        "y": -0.09644952400786902,
        "z": -0.00481046211703278
      },
      "errorBound": 3.3999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 34,
      "time": 6.800000000000003,
      "position": {
        "x": 6.380989622629596,
        "y": 6.482415012869843,
        "z": 4.931116881828463
      },
      "velocity": {
        "x": -0.033699390111809904,
        "y": 0.1744495240078691,
        "z": 0.004810462117032781
      },
      "errorBound": 3.3999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 34,
      "time": 6.800000000000003,
      "position": {
        "x": 6.265410377370401,
        "y": 6.047984987130159,
        "z": 5.123283118171537
      },
      "velocity": {
        "x": -0.018300609888190093,
        "y": -0.09644952400786902,
        "z": 0.0031895378829672194
      },
      "errorBound": 3.3999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 35,
      "time": 7.0000000000000036,
      "position": {
        "x": 3.7380463251355778,
        "y": 3.970540320826113,
        "z": 4.696100386827834
      },
      "velocity": {
        "x": 0.017283512529909183,
        "y": 0.09262653978135979,
        "z": -0.0030824750031481674
      },
      "errorBound": 3.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 35,
      "time": 7.0000000000000036,
      "position": {
        "x": 3.6259536748644194,
        "y": 3.483459679173887,
        "z": 4.887899613172167
      },
      "velocity": {
        "x": 0.03471648747009082,
        "y": -0.17062653978135986,
        "z": -0.004917524996851835
      },
      "errorBound": 3.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 35,
      "time": 7.0000000000000036,
      "position": {
        "x": 3.3740463251355806,
        "y": 5.970540320826113,
        "z": 5.112100386827833
      },
      "velocity": {
        "x": -0.034716487470090825,
        "y": 0.0926265397813598,
        "z": 0.004917524996851833
      },
      "errorBound": 3.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 35,
      "time": 7.0000000000000036,
      "position": {
        "x": 3.2619536748644222,
        "y": 5.483459679173887,
        "z": 5.303899613172166
      },
      "velocity": {
        "x": -0.01728351252990918,
        "y": -0.17062653978135983,
        "z": 0.003082475003148166
      },
      "errorBound": 3.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 35,
      "time": 7.0000000000000036,
      "position": {
        "x": 4.738046325135581,
        "y": 4.152540320826114,
        "z": 4.876100386827833
      },
      "velocity": {
        "x": 0.017283512529909166,
        "y": 0.11862653978135985,
        "z": -0.0030824750031481665
      },
      "errorBound": 3.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 35,
      "time": 7.0000000000000036,
      "position": {
        "x": 4.625953674864422,
        "y": 3.6654596791738827,
        "z": 5.067899613172167
      },
      "velocity": {
        "x": 0.03471648747009082,
        "y": -0.14462653978135984,
        "z": -0.004917524996851835
      },
      "errorBound": 3.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 35,
      "time": 7.0000000000000036,
      "position": {
        "x": 4.374046325135578,
        "y": 6.1525403208261125,
        "z": 5.2921003868278325
      },
      "velocity": {
        "x": -0.03471648747009082,
        "y": 0.11862653978135983,
        "z": 0.004917524996851833
      },
      "errorBound": 3.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 35,
      "time": 7.0000000000000036,
      "position": {
        "x": 4.261953674864419,
        "y": 5.6654596791738845,
        "z": 4.763899613172168
      },
      "velocity": {
        "x": -0.017283512529909173,
        "y": -0.14462653978135986,
        "z": 0.0030824750031481674
      },
      "errorBound": 3.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 35,
      "time": 7.0000000000000036,
      "position": {
        "x": 5.738046325135581,
        "y": 4.334540320826112,
        "z": 5.056100386827833
      },
      "velocity": {
        "x": 0.017283512529909187,
        "y": 0.14462653978135984,
        "z": -0.0030824750031481674
      },
      "errorBound": 3.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 35,
      "time": 7.0000000000000036,
      "position": {
        "x": 5.625953674864422,
        "y": 3.847459679173888,
        "z": 5.247899613172167
      },
      "velocity": {
        "x": 0.034716487470090825,
        "y": -0.11862653978135983,
        "z": -0.004917524996851833
      },
      "errorBound": 3.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 35,
      "time": 7.0000000000000036,
      "position": {
        "x": 5.374046325135578,
        "y": 6.3345403208261155,
        "z": 4.752100386827833
      },
      "velocity": {
        "x": -0.034716487470090825,
        "y": 0.14462653978135984,
        "z": 0.004917524996851836
      },
      "errorBound": 3.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 35,
      "time": 7.0000000000000036,
      "position": {
        "x": 5.261953674864419,
        "y": 5.8474596791738875,
        "z": 4.943899613172167
      },
      "velocity": {
        "x": -0.01728351252990918,
        "y": -0.11862653978135983,
        "z": 0.0030824750031481674
      },
      "errorBound": 3.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 35,
      "time": 7.0000000000000036,
      "position": {
        "x": 6.738046325135581,
        "y": 4.516540320826115,
        "z": 5.236100386827833
      },
      "velocity": {
        "x": 0.017283512529909183,
        "y": 0.17062653978135983,
        "z": -0.0030824750031481665
      },
      "errorBound": 3.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 35,
      "time": 7.0000000000000036,
      "position": {
        "x": 6.625953674864422,
        "y": 4.029459679173887,
        "z": 4.7078996131721675
      },
      "velocity": {
        "x": 0.03471648747009082,
        "y": -0.0926265397813598,
        "z": -0.004917524996851833
      },
      "errorBound": 3.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 35,
      "time": 7.0000000000000036,
      "position": {
        "x": 6.374046325135578,
        "y": 6.516540320826115,
        "z": 4.932100386827833
      },
      "velocity": {
        "x": -0.034716487470090825,
        "y": 0.17062653978135986,
        "z": 0.004917524996851834
      },
      "errorBound": 3.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 35,
      "time": 7.0000000000000036,
      "position": {
        "x": 6.261953674864419,
        "y": 6.029459679173887,
        "z": 5.123899613172167
      },
      "velocity": {
        "x": -0.017283512529909173,
        "y": -0.0926265397813598,
        "z": 0.003082475003148166
      },
      "errorBound": 3.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 36,
      "time": 7.200000000000004,
      "position": {
        "x": 3.7413057445770823,
        "y": 3.988208366853077,
        "z": 4.695504658465571
      },
      "velocity": {
        "x": 0.016297097207522985,
        "y": 0.08834023013482019,
        "z": -0.0029786418113180286
      },
      "errorBound": 3.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 36,
      "time": 7.200000000000004,
      "position": {
        "x": 3.6330942554229146,
        "y": 3.450191633146923,
        "z": 4.886895341534431
      },
      "velocity": {
        "x": 0.035702902792477016,
        "y": -0.16634023013482024,
        "z": -0.005021358188681974
      },
      "errorBound": 3.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 36,
      "time": 7.200000000000004,
      "position": {
        "x": 3.3669057445770854,
        "y": 5.988208366853077,
        "z": 5.113104658465569
      },
      "velocity": {
        "x": -0.03570290279247702,
        "y": 0.0883402301348202,
        "z": 0.005021358188681972
      },
      "errorBound": 3.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 36,
      "time": 7.200000000000004,
      "position": {
        "x": 3.2586942554229177,
        "y": 5.450191633146923,
        "z": 5.304495341534429
      },
      "velocity": {
        "x": -0.01629709720752298,
        "y": -0.16634023013482022,
        "z": 0.0029786418113180273
      },
      "errorBound": 3.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 36,
      "time": 7.200000000000004,
      "position": {
        "x": 4.741305744577086,
        "y": 4.175408366853079,
        "z": 4.8755046584655695
      },
      "velocity": {
        "x": 0.016297097207522968,
        "y": 0.11434023013482025,
        "z": -0.0029786418113180277
      },
      "errorBound": 3.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 36,
      "time": 7.200000000000004,
      "position": {
        "x": 4.633094255422917,
        "y": 3.6373916331469185,
        "z": 5.066895341534431
      },
      "velocity": {
        "x": 0.035702902792477016,
        "y": -0.14034023013482022,
        "z": -0.005021358188681974
      },
      "errorBound": 3.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 36,
      "time": 7.200000000000004,
      "position": {
        "x": 4.366905744577083,
        "y": 6.175408366853077,
        "z": 5.293104658465569
      },
      "velocity": {
        "x": -0.035702902792477016,
        "y": 0.11434023013482023,
        "z": 0.005021358188681972
      },
      "errorBound": 3.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 36,
      "time": 7.200000000000004,
      "position": {
        "x": 4.258694255422914,
        "y": 5.637391633146921,
        "z": 4.764495341534431
      },
      "velocity": {
        "x": -0.016297097207522974,
        "y": -0.14034023013482025,
        "z": 0.0029786418113180286
      },
      "errorBound": 3.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 36,
      "time": 7.200000000000004,
      "position": {
        "x": 5.741305744577086,
        "y": 4.362608366853076,
        "z": 5.055504658465569
      },
      "velocity": {
        "x": 0.016297097207522985,
        "y": 0.14034023013482022,
        "z": -0.0029786418113180286
      },
      "errorBound": 3.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 36,
      "time": 7.200000000000004,
      "position": {
        "x": 5.633094255422917,
        "y": 3.824591633146924,
        "z": 5.24689534153443
      },
      "velocity": {
        "x": 0.03570290279247702,
        "y": -0.11434023013482023,
        "z": -0.005021358188681972
      },
      "errorBound": 3.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 36,
      "time": 7.200000000000004,
      "position": {
        "x": 5.366905744577083,
        "y": 6.362608366853079,
        "z": 4.75310465846557
      },
      "velocity": {
        "x": -0.03570290279247702,
        "y": 0.14034023013482022,
        "z": 0.005021358188681975
      },
      "errorBound": 3.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 36,
      "time": 7.200000000000004,
      "position": {
        "x": 5.258694255422914,
        "y": 5.824591633146923,
        "z": 4.944495341534431
      },
      "velocity": {
        "x": -0.01629709720752298,
        "y": -0.11434023013482023,
        "z": 0.0029786418113180286
      },
      "errorBound": 3.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 36,
      "time": 7.200000000000004,
      "position": {
        "x": 6.741305744577086,
        "y": 4.549808366853079,
        "z": 5.23550465846557
      },
      "velocity": {
        "x": 0.016297097207522985,
        "y": 0.16634023013482022,
        "z": -0.0029786418113180277
      },
      "errorBound": 3.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 36,
      "time": 7.200000000000004,
      "position": {
        "x": 6.633094255422917,
        "y": 4.011791633146923,
        "z": 4.706895341534431
      },
      "velocity": {
        "x": 0.035702902792477016,
        "y": -0.0883402301348202,
        "z": -0.005021358188681972
      },
      "errorBound": 3.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 36,
      "time": 7.200000000000004,
      "position": {
        "x": 6.366905744577083,
        "y": 6.549808366853079,
        "z": 4.933104658465569
      },
      "velocity": {
        "x": -0.03570290279247702,
        "y": 0.16634023013482024,
        "z": 0.005021358188681973
      },
      "errorBound": 3.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 36,
      "time": 7.200000000000004,
      "position": {
        "x": 6.258694255422914,
        "y": 6.011791633146923,
        "z": 5.1244953415344305
      },
      "velocity": {
        "x": -0.016297097207522974,
        "y": -0.0883402301348202,
        "z": 0.0029786418113180273
      },
      "errorBound": 3.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 37,
      "time": 7.400000000000004,
      "position": {
        "x": 3.7443747117976756,
        "y": 4.004929503428718,
        "z": 4.6949289777055085
      },
      "velocity": {
        "x": 0.015344836102966303,
        "y": 0.08360568287820601,
        "z": -0.0028784038003120504
      },
      "errorBound": 3.6999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 37,
      "time": 7.400000000000004,
      "position": {
        "x": 3.6404252882023216,
        "y": 3.417870496571282,
        "z": 4.885871022294493
      },
      "velocity": {
        "x": 0.036655163897033695,
        "y": -0.16160568287820606,
        "z": -0.005121596199687952
      },
      "errorBound": 3.6999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 37,
      "time": 7.400000000000004,
      "position": {
        "x": 3.3595747117976784,
        "y": 6.004929503428718,
        "z": 5.114128977705507
      },
      "velocity": {
        "x": -0.03665516389703371,
        "y": 0.08360568287820602,
        "z": 0.00512159619968795
      },
      "errorBound": 3.6999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 37,
      "time": 7.400000000000004,
      "position": {
        "x": 3.2556252882023244,
        "y": 5.417870496571282,
        "z": 5.3050710222944915
      },
      "velocity": {
        "x": -0.015344836102966301,
        "y": -0.16160568287820604,
        "z": 0.002878403800312049
      },
      "errorBound": 3.6999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 37,
      "time": 7.400000000000004,
      "position": {
        "x": 4.744374711797679,
        "y": 4.19732950342872,
        "z": 4.874928977705507
      },
      "velocity": {
        "x": 0.015344836102966285,
        "y": 0.10960568287820607,
        "z": -0.0028784038003120496
      },
      "errorBound": 3.6999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 37,
      "time": 7.400000000000004,
      "position": {
        "x": 4.640425288202324,
        "y": 3.6102704965712773,
        "z": 5.065871022294493
      },
      "velocity": {
        "x": 0.0366551638970337,
        "y": -0.13560568287820604,
        "z": -0.005121596199687952
      },
      "errorBound": 3.6999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 37,
      "time": 7.400000000000004,
      "position": {
        "x": 4.359574711797676,
        "y": 6.197329503428718,
        "z": 5.2941289777055065
      },
      "velocity": {
        "x": -0.0366551638970337,
        "y": 0.10960568287820605,
        "z": 0.00512159619968795
      },
      "errorBound": 3.6999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 37,
      "time": 7.400000000000004,
      "position": {
        "x": 4.255625288202321,
        "y": 5.610270496571279,
        "z": 4.765071022294493
      },
      "velocity": {
        "x": -0.015344836102966292,
        "y": -0.13560568287820607,
        "z": 0.0028784038003120504
      },
      "errorBound": 3.6999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 37,
      "time": 7.400000000000004,
      "position": {
        "x": 5.744374711797679,
        "y": 4.389729503428717,
        "z": 5.054928977705507
      },
      "velocity": {
        "x": 0.015344836102966303,
        "y": 0.13560568287820604,
        "z": -0.0028784038003120504
      },
      "errorBound": 3.6999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 37,
      "time": 7.400000000000004,
      "position": {
        "x": 5.640425288202324,
        "y": 3.8026704965712828,
        "z": 5.245871022294493
      },
      "velocity": {
        "x": 0.0366551638970337,
        "y": -0.10960568287820605,
        "z": -0.00512159619968795
      },
      "errorBound": 3.6999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 37,
      "time": 7.400000000000004,
      "position": {
        "x": 5.359574711797676,
        "y": 6.389729503428721,
        "z": 4.754128977705507
      },
      "velocity": {
        "x": -0.0366551638970337,
        "y": 0.13560568287820604,
        "z": 0.005121596199687953
      },
      "errorBound": 3.6999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 37,
      "time": 7.400000000000004,
      "position": {
        "x": 5.255625288202321,
        "y": 5.802670496571282,
        "z": 4.945071022294493
      },
      "velocity": {
        "x": -0.0153448361029663,
        "y": -0.10960568287820605,
        "z": 0.0028784038003120504
      },
      "errorBound": 3.6999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 37,
      "time": 7.400000000000004,
      "position": {
        "x": 6.744374711797679,
        "y": 4.58212950342872,
        "z": 5.234928977705508
      },
      "velocity": {
        "x": 0.015344836102966303,
        "y": 0.16160568287820604,
        "z": -0.0028784038003120496
      },
      "errorBound": 3.6999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 37,
      "time": 7.400000000000004,
      "position": {
        "x": 6.640425288202324,
        "y": 3.995070496571282,
        "z": 4.7058710222944935
      },
      "velocity": {
        "x": 0.0366551638970337,
        "y": -0.08360568287820602,
        "z": -0.00512159619968795
      },
      "errorBound": 3.6999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 37,
      "time": 7.400000000000004,
      "position": {
        "x": 6.359574711797676,
        "y": 6.58212950342872,
        "z": 4.934128977705507
      },
      "velocity": {
        "x": -0.0366551638970337,
        "y": 0.16160568287820606,
        "z": 0.005121596199687951
      },
      "errorBound": 3.6999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 37,
      "time": 7.400000000000004,
      "position": {
        "x": 6.255625288202321,
        "y": 5.995070496571282,
        "z": 5.125071022294493
      },
      "velocity": {
        "x": -0.015344836102966292,
        "y": -0.08360568287820602,
        "z": 0.002878403800312049
      },
      "errorBound": 3.6999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 38,
      "time": 7.600000000000004,
      "position": {
        "x": 3.747260728032741,
        "y": 4.02061741615229,
        "z": 4.694372554943922
      },
      "velocity": {
        "x": 0.014430081175327179,
        "y": 0.07843956361786054,
        "z": -0.0027821138079289777
      },
      "errorBound": 3.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 38,
      "time": 7.600000000000004,
      "position": {
        "x": 3.6479392719672563,
        "y": 3.38658258384771,
        "z": 4.884827445056079
      },
      "velocity": {
        "x": 0.03756991882467282,
        "y": -0.1564395636178606,
        "z": -0.005217886192071025
      },
      "errorBound": 3.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 38,
      "time": 7.600000000000004,
      "position": {
        "x": 3.3520607280327437,
        "y": 6.02061741615229,
        "z": 5.115172554943921
      },
      "velocity": {
        "x": -0.03756991882467284,
        "y": 0.07843956361786056,
        "z": 0.005217886192071023
      },
      "errorBound": 3.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 38,
      "time": 7.600000000000004,
      "position": {
        "x": 3.252739271967259,
        "y": 5.3865825838477095,
        "z": 5.305627445056078
      },
      "velocity": {
        "x": -0.014430081175327177,
        "y": -0.15643956361786057,
        "z": 0.002782113807928977
      },
      "errorBound": 3.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 38,
      "time": 7.600000000000004,
      "position": {
        "x": 4.747260728032744,
        "y": 4.218217416152292,
        "z": 4.874372554943921
      },
      "velocity": {
        "x": 0.01443008117532716,
        "y": 0.10443956361786061,
        "z": -0.002782113807928977
      },
      "errorBound": 3.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 38,
      "time": 7.600000000000004,
      "position": {
        "x": 4.6479392719672585,
        "y": 3.584182583847705,
        "z": 5.064827445056078
      },
      "velocity": {
        "x": 0.037569918824672824,
        "y": -0.13043956361786058,
        "z": -0.005217886192071025
      },
      "errorBound": 3.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 38,
      "time": 7.600000000000004,
      "position": {
        "x": 4.3520607280327415,
        "y": 6.2182174161522905,
        "z": 5.295172554943921
      },
      "velocity": {
        "x": -0.037569918824672824,
        "y": 0.10443956361786058,
        "z": 0.005217886192071023
      },
      "errorBound": 3.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 38,
      "time": 7.600000000000004,
      "position": {
        "x": 4.252739271967256,
        "y": 5.584182583847707,
        "z": 4.765627445056079
      },
      "velocity": {
        "x": -0.014430081175327169,
        "y": -0.1304395636178606,
        "z": 0.0027821138079289777
      },
      "errorBound": 3.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 38,
      "time": 7.600000000000004,
      "position": {
        "x": 5.747260728032744,
        "y": 4.415817416152289,
        "z": 5.054372554943921
      },
      "velocity": {
        "x": 0.014430081175327179,
        "y": 0.13043956361786058,
        "z": -0.0027821138079289777
      },
      "errorBound": 3.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 38,
      "time": 7.600000000000004,
      "position": {
        "x": 5.6479392719672585,
        "y": 3.781782583847711,
        "z": 5.244827445056078
      },
      "velocity": {
        "x": 0.037569918824672824,
        "y": -0.10443956361786058,
        "z": -0.005217886192071023
      },
      "errorBound": 3.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 38,
      "time": 7.600000000000004,
      "position": {
        "x": 5.3520607280327415,
        "y": 6.415817416152293,
        "z": 4.755172554943922
      },
      "velocity": {
        "x": -0.037569918824672824,
        "y": 0.13043956361786058,
        "z": 0.0052178861920710255
      },
      "errorBound": 3.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 38,
      "time": 7.600000000000004,
      "position": {
        "x": 5.252739271967256,
        "y": 5.7817825838477095,
        "z": 4.945627445056079
      },
      "velocity": {
        "x": -0.014430081175327176,
        "y": -0.10443956361786058,
        "z": 0.0027821138079289777
      },
      "errorBound": 3.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 38,
      "time": 7.600000000000004,
      "position": {
        "x": 6.747260728032744,
        "y": 4.613417416152292,
        "z": 5.2343725549439215
      },
      "velocity": {
        "x": 0.014430081175327177,
        "y": 0.15643956361786057,
        "z": -0.002782113807928977
      },
      "errorBound": 3.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 38,
      "time": 7.600000000000004,
      "position": {
        "x": 6.6479392719672585,
        "y": 3.97938258384771,
        "z": 4.704827445056079
      },
      "velocity": {
        "x": 0.037569918824672824,
        "y": -0.07843956361786056,
        "z": -0.005217886192071023
      },
      "errorBound": 3.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 38,
      "time": 7.600000000000004,
      "position": {
        "x": 6.3520607280327415,
        "y": 6.613417416152292,
        "z": 4.935172554943922
      },
      "velocity": {
        "x": -0.037569918824672824,
        "y": 0.1564395636178606,
        "z": 0.005217886192071024
      },
      "errorBound": 3.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 38,
      "time": 7.600000000000004,
      "position": {
        "x": 6.252739271967256,
        "y": 5.97938258384771,
        "z": 5.125627445056079
      },
      "velocity": {
        "x": -0.014430081175327167,
        "y": -0.07843956361786056,
        "z": 0.0027821138079289764
      },
      "errorBound": 3.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 39,
      "time": 7.800000000000004,
      "position": {
        "x": 3.7499719385051313,
        "y": 4.035189427571006,
        "z": 4.693834532788934
      },
      "velocity": {
        "x": 0.013556052361950907,
        "y": 0.07286005709358022,
        "z": -0.0026901107749419946
      },
      "errorBound": 3.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 39,
      "time": 7.800000000000004,
      "position": {
        "x": 3.655628061494866,
        "y": 3.356410572428994,
        "z": 4.8837654672110675
      },
      "velocity": {
        "x": 0.03844394763804909,
        "y": -0.15086005709358027,
        "z": -0.005309889225058008
      },
      "errorBound": 3.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 39,
      "time": 7.800000000000004,
      "position": {
        "x": 3.344371938505134,
        "y": 6.035189427571006,
        "z": 5.1162345327889325
      },
      "velocity": {
        "x": -0.03844394763804911,
        "y": 0.07286005709358023,
        "z": 0.005309889225058006
      },
      "errorBound": 3.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 39,
      "time": 7.800000000000004,
      "position": {
        "x": 3.2500280614948687,
        "y": 5.356410572428993,
        "z": 5.306165467211066
      },
      "velocity": {
        "x": -0.013556052361950904,
        "y": -0.15086005709358025,
        "z": 0.0026901107749419937
      },
      "errorBound": 3.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 39,
      "time": 7.800000000000004,
      "position": {
        "x": 4.749971938505134,
        "y": 4.237989427571009,
        "z": 4.8738345327889325
      },
      "velocity": {
        "x": 0.013556052361950888,
        "y": 0.09886005709358028,
        "z": -0.0026901107749419937
      },
      "errorBound": 3.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 39,
      "time": 7.800000000000004,
      "position": {
        "x": 4.655628061494868,
        "y": 3.559210572428989,
        "z": 5.063765467211067
      },
      "velocity": {
        "x": 0.0384439476380491,
        "y": -0.12486005709358025,
        "z": -0.005309889225058008
      },
      "errorBound": 3.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 39,
      "time": 7.800000000000004,
      "position": {
        "x": 4.344371938505132,
        "y": 6.237989427571007,
        "z": 5.296234532788932
      },
      "velocity": {
        "x": -0.0384439476380491,
        "y": 0.09886005709358026,
        "z": 0.005309889225058006
      },
      "errorBound": 3.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 39,
      "time": 7.800000000000004,
      "position": {
        "x": 4.250028061494866,
        "y": 5.5592105724289915,
        "z": 4.766165467211068
      },
      "velocity": {
        "x": -0.013556052361950897,
        "y": -0.12486005709358028,
        "z": 0.0026901107749419946
      },
      "errorBound": 3.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 39,
      "time": 7.800000000000004,
      "position": {
        "x": 5.749971938505134,
        "y": 4.440789427571005,
        "z": 5.053834532788932
      },
      "velocity": {
        "x": 0.013556052361950907,
        "y": 0.12486005709358025,
        "z": -0.0026901107749419946
      },
      "errorBound": 3.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 39,
      "time": 7.800000000000004,
      "position": {
        "x": 5.655628061494868,
        "y": 3.762010572428995,
        "z": 5.243765467211067
      },
      "velocity": {
        "x": 0.0384439476380491,
        "y": -0.09886005709358026,
        "z": -0.005309889225058006
      },
      "errorBound": 3.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 39,
      "time": 7.800000000000004,
      "position": {
        "x": 5.344371938505132,
        "y": 6.4407894275710085,
        "z": 4.756234532788933
      },
      "velocity": {
        "x": -0.0384439476380491,
        "y": 0.12486005709358025,
        "z": 0.005309889225058009
      },
      "errorBound": 3.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 39,
      "time": 7.800000000000004,
      "position": {
        "x": 5.250028061494866,
        "y": 5.762010572428993,
        "z": 4.946165467211068
      },
      "velocity": {
        "x": -0.013556052361950904,
        "y": -0.09886005709358026,
        "z": 0.0026901107749419946
      },
      "errorBound": 3.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 39,
      "time": 7.800000000000004,
      "position": {
        "x": 6.749971938505134,
        "y": 4.643589427571008,
        "z": 5.233834532788933
      },
      "velocity": {
        "x": 0.013556052361950906,
        "y": 0.15086005709358025,
        "z": -0.0026901107749419937
      },
      "errorBound": 3.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 39,
      "time": 7.800000000000004,
      "position": {
        "x": 6.655628061494868,
        "y": 3.964810572428994,
        "z": 4.703765467211068
      },
      "velocity": {
        "x": 0.0384439476380491,
        "y": -0.07286005709358023,
        "z": -0.005309889225058006
      },
      "errorBound": 3.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 39,
      "time": 7.800000000000004,
      "position": {
        "x": 6.344371938505132,
        "y": 6.643589427571008,
        "z": 4.936234532788933
      },
      "velocity": {
        "x": -0.0384439476380491,
        "y": 0.15086005709358027,
        "z": 0.005309889225058007
      },
      "errorBound": 3.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 39,
      "time": 7.800000000000004,
      "position": {
        "x": 6.250028061494866,
        "y": 5.964810572428994,
        "z": 5.1261654672110675
      },
      "velocity": {
        "x": -0.013556052361950895,
        "y": -0.07286005709358023,
        "z": 0.0026901107749419933
      },
      "errorBound": 3.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 40,
      "time": 8.000000000000004,
      "position": {
        "x": 3.7525171037539833,
        "y": 4.048566788204672,
        "z": 4.693313989078528
      },
      "velocity": {
        "x": 0.01272582624426057,
        "y": 0.06688680316833051,
        "z": -0.00260271855202721
      },
      "errorBound": 3.9999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 40,
      "time": 8.000000000000004,
      "position": {
        "x": 3.663482896246014,
        "y": 3.327433211795328,
        "z": 4.882686010921473
      },
      "velocity": {
        "x": 0.03927417375573943,
        "y": -0.14488680316833058,
        "z": -0.005397281447972793
      },
      "errorBound": 3.9999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 40,
      "time": 8.000000000000004,
      "position": {
        "x": 3.336517103753986,
        "y": 6.048566788204672,
        "z": 5.117313989078527
      },
      "velocity": {
        "x": -0.03927417375573945,
        "y": 0.06688680316833052,
        "z": 0.005397281447972791
      },
      "errorBound": 3.9999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 40,
      "time": 8.000000000000004,
      "position": {
        "x": 3.2474828962460167,
        "y": 5.327433211795327,
        "z": 5.306686010921472
      },
      "velocity": {
        "x": -0.012725826244260566,
        "y": -0.14488680316833055,
        "z": 0.002602718552027209
      },
      "errorBound": 3.9999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 40,
      "time": 8.000000000000004,
      "position": {
        "x": 4.752517103753987,
        "y": 4.256566788204674,
        "z": 4.873313989078527
      },
      "velocity": {
        "x": 0.012725826244260548,
        "y": 0.09288680316833058,
        "z": -0.002602718552027209
      },
      "errorBound": 3.9999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 40,
      "time": 8.000000000000004,
      "position": {
        "x": 4.663482896246016,
        "y": 3.535433211795323,
        "z": 5.062686010921473
      },
      "velocity": {
        "x": 0.03927417375573944,
        "y": -0.11888680316833054,
        "z": -0.005397281447972793
      },
      "errorBound": 3.9999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 40,
      "time": 8.000000000000004,
      "position": {
        "x": 4.336517103753984,
        "y": 6.2565667882046725,
        "z": 5.297313989078527
      },
      "velocity": {
        "x": -0.03927417375573944,
        "y": 0.09288680316833055,
        "z": 0.005397281447972791
      },
      "errorBound": 3.9999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 40,
      "time": 8.000000000000004,
      "position": {
        "x": 4.247482896246013,
        "y": 5.5354332117953255,
        "z": 4.7666860109214735
      },
      "velocity": {
        "x": -0.012725826244260557,
        "y": -0.11888680316833057,
        "z": 0.00260271855202721
      },
      "errorBound": 3.9999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 40,
      "time": 8.000000000000004,
      "position": {
        "x": 5.752517103753987,
        "y": 4.464566788204671,
        "z": 5.053313989078527
      },
      "velocity": {
        "x": 0.012725826244260567,
        "y": 0.11888680316833054,
        "z": -0.00260271855202721
      },
      "errorBound": 3.9999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 40,
      "time": 8.000000000000004,
      "position": {
        "x": 5.663482896246016,
        "y": 3.743433211795329,
        "z": 5.242686010921473
      },
      "velocity": {
        "x": 0.03927417375573944,
        "y": -0.09288680316833055,
        "z": -0.005397281447972791
      },
      "errorBound": 3.9999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 40,
      "time": 8.000000000000004,
      "position": {
        "x": 5.336517103753984,
        "y": 6.4645667882046745,
        "z": 4.757313989078527
      },
      "velocity": {
        "x": -0.03927417375573944,
        "y": 0.11888680316833054,
        "z": 0.005397281447972794
      },
      "errorBound": 3.9999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 40,
      "time": 8.000000000000004,
      "position": {
        "x": 5.247482896246013,
        "y": 5.7434332117953275,
        "z": 4.946686010921473
      },
      "velocity": {
        "x": -0.012725826244260564,
        "y": -0.09288680316833055,
        "z": 0.00260271855202721
      },
      "errorBound": 3.9999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 40,
      "time": 8.000000000000004,
      "position": {
        "x": 6.752517103753987,
        "y": 4.672566788204675,
        "z": 5.233313989078527
      },
      "velocity": {
        "x": 0.012725826244260566,
        "y": 0.14488680316833055,
        "z": -0.0026027185520272086
      },
      "errorBound": 3.9999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 40,
      "time": 8.000000000000004,
      "position": {
        "x": 6.663482896246016,
        "y": 3.9514332117953277,
        "z": 4.702686010921473
      },
      "velocity": {
        "x": 0.03927417375573944,
        "y": -0.06688680316833052,
        "z": -0.00539728144797279
      },
      "errorBound": 3.9999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 40,
      "time": 8.000000000000004,
      "position": {
        "x": 6.336517103753984,
        "y": 6.672566788204675,
        "z": 4.937313989078527
      },
      "velocity": {
        "x": -0.03927417375573944,
        "y": 0.14488680316833058,
        "z": 0.005397281447972792
      },
      "errorBound": 3.9999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 40,
      "time": 8.000000000000004,
      "position": {
        "x": 6.247482896246013,
        "y": 5.951433211795328,
        "z": 5.126686010921473
      },
      "velocity": {
        "x": -0.012725826244260557,
        "y": -0.06688680316833052,
        "z": 0.0026027185520272086
      },
      "errorBound": 3.9999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 41,
      "time": 8.200000000000003,
      "position": {
        "x": 3.7549055687976214,
        "y": 4.060674953743858,
        "z": 4.692809940126566
      },
      "velocity": {
        "x": 0.011942325218190433,
        "y": 0.060540827695928286,
        "z": -0.0025202447598092876
      },
      "errorBound": 4.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 41,
      "time": 8.200000000000003,
      "position": {
        "x": 3.671494431202376,
        "y": 3.2997250462561425,
        "z": 4.881590059873435
      },
      "velocity": {
        "x": 0.04005767478180957,
        "y": -0.13854082769592835,
        "z": -0.005479755240190715
      },
      "errorBound": 4.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 41,
      "time": 8.200000000000003,
      "position": {
        "x": 3.328505568797624,
        "y": 6.060674953743858,
        "z": 5.118409940126565
      },
      "velocity": {
        "x": -0.04005767478180959,
        "y": 0.0605408276959283,
        "z": 0.005479755240190713
      },
      "errorBound": 4.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 41,
      "time": 8.200000000000003,
      "position": {
        "x": 3.2450944312023786,
        "y": 5.299725046256142,
        "z": 5.307190059873434
      },
      "velocity": {
        "x": -0.01194232521819043,
        "y": -0.13854082769592832,
        "z": 0.002520244759809287
      },
      "errorBound": 4.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 41,
      "time": 8.200000000000003,
      "position": {
        "x": 4.754905568797625,
        "y": 4.27387495374386,
        "z": 4.872809940126565
      },
      "velocity": {
        "x": 0.011942325218190412,
        "y": 0.08654082769592834,
        "z": -0.002520244759809287
      },
      "errorBound": 4.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 41,
      "time": 8.200000000000003,
      "position": {
        "x": 4.671494431202378,
        "y": 3.512925046256137,
        "z": 5.061590059873435
      },
      "velocity": {
        "x": 0.04005767478180958,
        "y": -0.11254082769592832,
        "z": -0.005479755240190715
      },
      "errorBound": 4.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 41,
      "time": 8.200000000000003,
      "position": {
        "x": 4.328505568797622,
        "y": 6.273874953743858,
        "z": 5.2984099401265645
      },
      "velocity": {
        "x": -0.04005767478180958,
        "y": 0.08654082769592832,
        "z": 0.005479755240190713
      },
      "errorBound": 4.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 41,
      "time": 8.200000000000003,
      "position": {
        "x": 4.245094431202375,
        "y": 5.51292504625614,
        "z": 4.767190059873435
      },
      "velocity": {
        "x": -0.01194232521819042,
        "y": -0.11254082769592834,
        "z": 0.002520244759809288
      },
      "errorBound": 4.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 41,
      "time": 8.200000000000003,
      "position": {
        "x": 5.754905568797625,
        "y": 4.487074953743856,
        "z": 5.052809940126565
      },
      "velocity": {
        "x": 0.011942325218190431,
        "y": 0.11254082769592831,
        "z": -0.002520244759809288
      },
      "errorBound": 4.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 41,
      "time": 8.200000000000003,
      "position": {
        "x": 5.671494431202378,
        "y": 3.726125046256143,
        "z": 5.241590059873435
      },
      "velocity": {
        "x": 0.04005767478180958,
        "y": -0.08654082769592832,
        "z": -0.005479755240190713
      },
      "errorBound": 4.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 41,
      "time": 8.200000000000003,
      "position": {
        "x": 5.328505568797622,
        "y": 6.48707495374386,
        "z": 4.758409940126565
      },
      "velocity": {
        "x": -0.04005767478180958,
        "y": 0.11254082769592831,
        "z": 0.005479755240190716
      },
      "errorBound": 4.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 41,
      "time": 8.200000000000003,
      "position": {
        "x": 5.245094431202375,
        "y": 5.726125046256142,
        "z": 4.947190059873435
      },
      "velocity": {
        "x": -0.011942325218190428,
        "y": -0.08654082769592832,
        "z": 0.002520244759809288
      },
      "errorBound": 4.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 41,
      "time": 8.200000000000003,
      "position": {
        "x": 6.754905568797625,
        "y": 4.70027495374386,
        "z": 5.2328099401265655
      },
      "velocity": {
        "x": 0.01194232521819043,
        "y": 0.13854082769592832,
        "z": -0.0025202447598092863
      },
      "errorBound": 4.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 41,
      "time": 8.200000000000003,
      "position": {
        "x": 6.671494431202378,
        "y": 3.939325046256142,
        "z": 4.7015900598734355
      },
      "velocity": {
        "x": 0.04005767478180958,
        "y": -0.0605408276959283,
        "z": -0.005479755240190712
      },
      "errorBound": 4.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 41,
      "time": 8.200000000000003,
      "position": {
        "x": 6.328505568797622,
        "y": 6.70027495374386,
        "z": 4.938409940126565
      },
      "velocity": {
        "x": -0.04005767478180958,
        "y": 0.13854082769592835,
        "z": 0.005479755240190714
      },
      "errorBound": 4.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 41,
      "time": 8.200000000000003,
      "position": {
        "x": 6.245094431202375,
        "y": 5.939325046256142,
        "z": 5.127190059873435
      },
      "velocity": {
        "x": -0.01194232521819042,
        "y": -0.0605408276959283,
        "z": 0.0025202447598092867
      },
      "errorBound": 4.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 42,
      "time": 8.400000000000002,
      "position": {
        "x": 3.757147230239092,
        "y": 4.071443847445865,
        "z": 4.692321344185359
      },
      "velocity": {
        "x": 0.011208307207352265,
        "y": 0.053844468510036395,
        "z": -0.002442979706036835
      },
      "errorBound": 4.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 42,
      "time": 8.400000000000002,
      "position": {
        "x": 3.6796527697609056,
        "y": 3.2733561525541353,
        "z": 4.880478655814643
      },
      "velocity": {
        "x": 0.04079169279264774,
        "y": -0.13184446851003645,
        "z": -0.005557020293963167
      },
      "errorBound": 4.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 42,
      "time": 8.400000000000002,
      "position": {
        "x": 3.3203472302390944,
        "y": 6.071443847445865,
        "z": 5.119521344185357
      },
      "velocity": {
        "x": -0.04079169279264776,
        "y": 0.05384446851003641,
        "z": 0.005557020293963166
      },
      "errorBound": 4.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 42,
      "time": 8.400000000000002,
      "position": {
        "x": 3.242852769760908,
        "y": 5.273356152554134,
        "z": 5.307678655814641
      },
      "velocity": {
        "x": -0.011208307207352261,
        "y": -0.13184446851003642,
        "z": 0.0024429797060368345
      },
      "errorBound": 4.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 42,
      "time": 8.400000000000002,
      "position": {
        "x": 4.757147230239095,
        "y": 4.2898438474458676,
        "z": 4.872321344185358
      },
      "velocity": {
        "x": 0.011208307207352244,
        "y": 0.07984446851003646,
        "z": -0.0024429797060368345
      },
      "errorBound": 4.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 42,
      "time": 8.400000000000002,
      "position": {
        "x": 4.679652769760907,
        "y": 3.49175615255413,
        "z": 5.060478655814642
      },
      "velocity": {
        "x": 0.040791692792647744,
        "y": -0.10584446851003643,
        "z": -0.005557020293963167
      },
      "errorBound": 4.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 42,
      "time": 8.400000000000002,
      "position": {
        "x": 4.320347230239093,
        "y": 6.289843847445866,
        "z": 5.299521344185357
      },
      "velocity": {
        "x": -0.040791692792647744,
        "y": 0.07984446851003643,
        "z": 0.005557020293963166
      },
      "errorBound": 4.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 42,
      "time": 8.400000000000002,
      "position": {
        "x": 4.242852769760905,
        "y": 5.491756152554133,
        "z": 4.767678655814643
      },
      "velocity": {
        "x": -0.011208307207352252,
        "y": -0.10584446851003645,
        "z": 0.0024429797060368354
      },
      "errorBound": 4.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 42,
      "time": 8.400000000000002,
      "position": {
        "x": 5.757147230239095,
        "y": 4.508243847445863,
        "z": 5.052321344185358
      },
      "velocity": {
        "x": 0.011208307207352263,
        "y": 0.10584446851003643,
        "z": -0.0024429797060368354
      },
      "errorBound": 4.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 42,
      "time": 8.400000000000002,
      "position": {
        "x": 5.679652769760907,
        "y": 3.710156152554136,
        "z": 5.240478655814642
      },
      "velocity": {
        "x": 0.040791692792647744,
        "y": -0.07984446851003643,
        "z": -0.005557020293963166
      },
      "errorBound": 4.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 42,
      "time": 8.400000000000002,
      "position": {
        "x": 5.320347230239093,
        "y": 6.508243847445867,
        "z": 4.759521344185358
      },
      "velocity": {
        "x": -0.040791692792647744,
        "y": 0.10584446851003643,
        "z": 0.005557020293963168
      },
      "errorBound": 4.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 42,
      "time": 8.400000000000002,
      "position": {
        "x": 5.242852769760905,
        "y": 5.710156152554134,
        "z": 4.947678655814642
      },
      "velocity": {
        "x": -0.01120830720735226,
        "y": -0.07984446851003643,
        "z": 0.0024429797060368354
      },
      "errorBound": 4.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 42,
      "time": 8.400000000000002,
      "position": {
        "x": 6.757147230239095,
        "y": 4.726643847445867,
        "z": 5.232321344185358
      },
      "velocity": {
        "x": 0.011208307207352261,
        "y": 0.13184446851003642,
        "z": -0.0024429797060368337
      },
      "errorBound": 4.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 42,
      "time": 8.400000000000002,
      "position": {
        "x": 6.679652769760907,
        "y": 3.928556152554135,
        "z": 4.700478655814643
      },
      "velocity": {
        "x": 0.040791692792647744,
        "y": -0.05384446851003641,
        "z": -0.005557020293963165
      },
      "errorBound": 4.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 42,
      "time": 8.400000000000002,
      "position": {
        "x": 6.320347230239093,
        "y": 6.726643847445867,
        "z": 4.939521344185358
      },
      "velocity": {
        "x": -0.040791692792647744,
        "y": 0.13184446851003645,
        "z": 0.0055570202939631665
      },
      "errorBound": 4.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 42,
      "time": 8.400000000000002,
      "position": {
        "x": 6.242852769760905,
        "y": 5.928556152554135,
        "z": 5.127678655814642
      },
      "velocity": {
        "x": -0.011208307207352252,
        "y": -0.05384446851003641,
        "z": 0.002442979706036834
      },
      "errorBound": 4.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 43,
      "time": 8.600000000000001,
      "position": {
        "x": 3.759252501430121,
        "y": 4.080808106804863,
        "z": 4.691847105112619
      },
      "velocity": {
        "x": 0.010526355955144217,
        "y": 0.04682129679498918,
        "z": -0.002371195363699132
      },
      "errorBound": 4.2999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 43,
      "time": 8.600000000000001,
      "position": {
        "x": 3.687947498569877,
        "y": 3.2483918931951377,
        "z": 4.879352894887383
      },
      "velocity": {
        "x": 0.04147364404485578,
        "y": -0.12482129679498924,
        "z": -0.005628804636300871
      },
      "errorBound": 4.2999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 43,
      "time": 8.600000000000001,
      "position": {
        "x": 3.312052501430123,
        "y": 6.080808106804863,
        "z": 5.120647105112617
      },
      "velocity": {
        "x": -0.041473644044855804,
        "y": 0.04682129679498919,
        "z": 0.005628804636300869
      },
      "errorBound": 4.2999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 43,
      "time": 8.600000000000001,
      "position": {
        "x": 3.240747498569879,
        "y": 5.248391893195136,
        "z": 5.308152894887381
      },
      "velocity": {
        "x": -0.010526355955144213,
        "y": -0.12482129679498921,
        "z": 0.0023711953636991316
      },
      "errorBound": 4.2999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 43,
      "time": 8.600000000000001,
      "position": {
        "x": 4.759252501430124,
        "y": 4.304408106804865,
        "z": 4.871847105112618
      },
      "velocity": {
        "x": 0.010526355955144198,
        "y": 0.07282129679498925,
        "z": -0.0023711953636991316
      },
      "errorBound": 4.2999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 43,
      "time": 8.600000000000001,
      "position": {
        "x": 4.687947498569878,
        "y": 3.471991893195132,
        "z": 5.0593528948873825
      },
      "velocity": {
        "x": 0.04147364404485579,
        "y": -0.09882129679498922,
        "z": -0.005628804636300871
      },
      "errorBound": 4.2999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 43,
      "time": 8.600000000000001,
      "position": {
        "x": 4.312052501430122,
        "y": 6.304408106804863,
        "z": 5.300647105112617
      },
      "velocity": {
        "x": -0.04147364404485579,
        "y": 0.07282129679498922,
        "z": 0.005628804636300868
      },
      "errorBound": 4.2999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 43,
      "time": 8.600000000000001,
      "position": {
        "x": 4.240747498569876,
        "y": 5.471991893195136,
        "z": 4.768152894887383
      },
      "velocity": {
        "x": -0.010526355955144206,
        "y": -0.09882129679498924,
        "z": 0.0023711953636991324
      },
      "errorBound": 4.2999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 43,
      "time": 8.600000000000001,
      "position": {
        "x": 5.759252501430124,
        "y": 4.528008106804861,
        "z": 5.051847105112618
      },
      "velocity": {
        "x": 0.010526355955144217,
        "y": 0.09882129679498922,
        "z": -0.0023711953636991324
      },
      "errorBound": 4.2999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 43,
      "time": 8.600000000000001,
      "position": {
        "x": 5.687947498569878,
        "y": 3.695591893195138,
        "z": 5.239352894887382
      },
      "velocity": {
        "x": 0.04147364404485579,
        "y": -0.07282129679498922,
        "z": -0.005628804636300869
      },
      "errorBound": 4.2999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 43,
      "time": 8.600000000000001,
      "position": {
        "x": 5.312052501430122,
        "y": 6.528008106804864,
        "z": 4.760647105112618
      },
      "velocity": {
        "x": -0.04147364404485579,
        "y": 0.09882129679498922,
        "z": 0.005628804636300872
      },
      "errorBound": 4.2999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 43,
      "time": 8.600000000000001,
      "position": {
        "x": 5.240747498569876,
        "y": 5.695591893195137,
        "z": 4.948152894887382
      },
      "velocity": {
        "x": -0.010526355955144213,
        "y": -0.07282129679498922,
        "z": 0.0023711953636991324
      },
      "errorBound": 4.2999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 43,
      "time": 8.600000000000001,
      "position": {
        "x": 6.759252501430124,
        "y": 4.7516081068048655,
        "z": 5.231847105112618
      },
      "velocity": {
        "x": 0.010526355955144215,
        "y": 0.12482129679498921,
        "z": -0.0023711953636991307
      },
      "errorBound": 4.2999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 43,
      "time": 8.600000000000001,
      "position": {
        "x": 6.687947498569878,
        "y": 3.919191893195137,
        "z": 4.699352894887383
      },
      "velocity": {
        "x": 0.04147364404485579,
        "y": -0.04682129679498919,
        "z": -0.005628804636300867
      },
      "errorBound": 4.2999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 43,
      "time": 8.600000000000001,
      "position": {
        "x": 6.312052501430122,
        "y": 6.7516081068048655,
        "z": 4.9406471051126175
      },
      "velocity": {
        "x": -0.04147364404485579,
        "y": 0.12482129679498924,
        "z": 0.00562880463630087
      },
      "errorBound": 4.2999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 43,
      "time": 8.600000000000001,
      "position": {
        "x": 6.240747498569876,
        "y": 5.919191893195137,
        "z": 5.128152894887382
      },
      "velocity": {
        "x": -0.010526355955144206,
        "y": -0.04682129679498919,
        "z": 0.002371195363699131
      },
      "errorBound": 4.2999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 44,
      "time": 8.8,
      "position": {
        "x": 3.761232275816116,
        "y": 4.088707313627908,
        "z": 4.691386076229883
      },
      "velocity": {
        "x": 0.009898871929974058,
        "y": 0.0394960341152236,
        "z": -0.002305144413681205
      },
      "errorBound": 4.4e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 44,
      "time": 8.8,
      "position": {
        "x": 3.696367724183882,
        "y": 3.224892686372093,
        "z": 4.878213923770119
      },
      "velocity": {
        "x": 0.042101128070025945,
        "y": -0.11749603411522366,
        "z": -0.005694855586318798
      },
      "errorBound": 4.4e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 44,
      "time": 8.8,
      "position": {
        "x": 3.303632275816118,
        "y": 6.088707313627908,
        "z": 5.121786076229881
      },
      "velocity": {
        "x": -0.042101128070025966,
        "y": 0.039496034115223615,
        "z": 0.005694855586318796
      },
      "errorBound": 4.4e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 44,
      "time": 8.8,
      "position": {
        "x": 3.238767724183884,
        "y": 5.224892686372091,
        "z": 5.308613923770117
      },
      "velocity": {
        "x": -0.009898871929974054,
        "y": -0.11749603411522364,
        "z": 0.0023051444136812046
      },
      "errorBound": 4.4e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 44,
      "time": 8.8,
      "position": {
        "x": 4.761232275816119,
        "y": 4.317507313627909,
        "z": 4.871386076229882
      },
      "velocity": {
        "x": 0.009898871929974039,
        "y": 0.06549603411522367,
        "z": -0.0023051444136812046
      },
      "errorBound": 4.4e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 44,
      "time": 8.8,
      "position": {
        "x": 4.696367724183883,
        "y": 3.4536926863720874,
        "z": 5.0582139237701185
      },
      "velocity": {
        "x": 0.042101128070025945,
        "y": -0.09149603411522364,
        "z": -0.005694855586318798
      },
      "errorBound": 4.4e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 44,
      "time": 8.8,
      "position": {
        "x": 4.303632275816117,
        "y": 6.317507313627908,
        "z": 5.301786076229881
      },
      "velocity": {
        "x": -0.042101128070025945,
        "y": 0.06549603411522364,
        "z": 0.005694855586318795
      },
      "errorBound": 4.4e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 44,
      "time": 8.8,
      "position": {
        "x": 4.238767724183881,
        "y": 5.453692686372091,
        "z": 4.768613923770118
      },
      "velocity": {
        "x": -0.009898871929974047,
        "y": -0.09149603411522367,
        "z": 0.0023051444136812055
      },
      "errorBound": 4.4e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 44,
      "time": 8.8,
      "position": {
        "x": 5.761232275816119,
        "y": 4.5463073136279055,
        "z": 5.051386076229882
      },
      "velocity": {
        "x": 0.009898871929974058,
        "y": 0.09149603411522364,
        "z": -0.0023051444136812055
      },
      "errorBound": 4.4e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 44,
      "time": 8.8,
      "position": {
        "x": 5.696367724183883,
        "y": 3.6824926863720933,
        "z": 5.238213923770118
      },
      "velocity": {
        "x": 0.042101128070025945,
        "y": -0.06549603411522364,
        "z": -0.005694855586318796
      },
      "errorBound": 4.4e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 44,
      "time": 8.8,
      "position": {
        "x": 5.303632275816117,
        "y": 6.546307313627909,
        "z": 4.761786076229882
      },
      "velocity": {
        "x": -0.042101128070025945,
        "y": 0.09149603411522364,
        "z": 0.005694855586318799
      },
      "errorBound": 4.4e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 44,
      "time": 8.8,
      "position": {
        "x": 5.238767724183881,
        "y": 5.682492686372092,
        "z": 4.948613923770118
      },
      "velocity": {
        "x": -0.009898871929974054,
        "y": -0.06549603411522364,
        "z": 0.0023051444136812055
      },
      "errorBound": 4.4e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 44,
      "time": 8.8,
      "position": {
        "x": 6.761232275816119,
        "y": 4.7751073136279105,
        "z": 5.2313860762298825
      },
      "velocity": {
        "x": 0.009898871929974056,
        "y": 0.11749603411522364,
        "z": -0.0023051444136812037
      },
      "errorBound": 4.4e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 44,
      "time": 8.8,
      "position": {
        "x": 6.696367724183883,
        "y": 3.9112926863720925,
        "z": 4.698213923770119
      },
      "velocity": {
        "x": 0.042101128070025945,
        "y": -0.039496034115223615,
        "z": -0.005694855586318794
      },
      "errorBound": 4.4e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 44,
      "time": 8.8,
      "position": {
        "x": 6.303632275816117,
        "y": 6.7751073136279105,
        "z": 4.9417860762298815
      },
      "velocity": {
        "x": -0.042101128070025945,
        "y": 0.11749603411522366,
        "z": 0.005694855586318797
      },
      "errorBound": 4.4e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 44,
      "time": 8.8,
      "position": {
        "x": 6.238767724183881,
        "y": 5.911292686372092,
        "z": 5.128613923770118
      },
      "velocity": {
        "x": -0.009898871929974047,
        "y": -0.039496034115223615,
        "z": 0.002305144413681204
      },
      "errorBound": 4.4e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 45,
      "time": 9,
      "position": {
        "x": 3.763097888591238,
        "y": 4.095086206706982,
        "z": 4.690937064358818
      },
      "velocity": {
        "x": 0.009328063875610389,
        "y": 0.03189446539537244,
        "z": -0.0022450593553271264
      },
      "errorBound": 4.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 45,
      "time": 9,
      "position": {
        "x": 3.70490211140876,
        "y": 3.2029137932930185,
        "z": 4.8770629356411845
      },
      "velocity": {
        "x": 0.04267193612438961,
        "y": -0.1098944653953725,
        "z": -0.005754940644672876
      },
      "errorBound": 4.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 45,
      "time": 9,
      "position": {
        "x": 3.29509788859124,
        "y": 6.095086206706982,
        "z": 5.1229370643588155
      },
      "velocity": {
        "x": -0.04267193612438963,
        "y": 0.031894465395372454,
        "z": 0.005754940644672875
      },
      "errorBound": 4.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 45,
      "time": 9,
      "position": {
        "x": 3.236902111408762,
        "y": 5.202913793293017,
        "z": 5.309062935641182
      },
      "velocity": {
        "x": -0.009328063875610386,
        "y": -0.10989446539537247,
        "z": 0.002245059355327126
      },
      "errorBound": 4.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 45,
      "time": 9,
      "position": {
        "x": 4.763097888591241,
        "y": 4.329086206706984,
        "z": 4.870937064358817
      },
      "velocity": {
        "x": 0.00932806387561037,
        "y": 0.057894465395372505,
        "z": -0.002245059355327126
      },
      "errorBound": 4.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 45,
      "time": 9,
      "position": {
        "x": 4.704902111408761,
        "y": 3.4369137932930127,
        "z": 5.057062935641184
      },
      "velocity": {
        "x": 0.04267193612438962,
        "y": -0.08389446539537247,
        "z": -0.005754940644672876
      },
      "errorBound": 4.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 45,
      "time": 9,
      "position": {
        "x": 4.295097888591239,
        "y": 6.329086206706982,
        "z": 5.302937064358815
      },
      "velocity": {
        "x": -0.04267193612438962,
        "y": 0.057894465395372484,
        "z": 0.005754940644672874
      },
      "errorBound": 4.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 45,
      "time": 9,
      "position": {
        "x": 4.236902111408759,
        "y": 5.436913793293017,
        "z": 4.769062935641184
      },
      "velocity": {
        "x": -0.009328063875610379,
        "y": -0.0838944653953725,
        "z": 0.002245059355327127
      },
      "errorBound": 4.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 45,
      "time": 9,
      "position": {
        "x": 5.763097888591241,
        "y": 4.56308620670698,
        "z": 5.050937064358816
      },
      "velocity": {
        "x": 0.009328063875610389,
        "y": 0.08389446539537247,
        "z": -0.002245059355327127
      },
      "errorBound": 4.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 45,
      "time": 9,
      "position": {
        "x": 5.704902111408761,
        "y": 3.670913793293019,
        "z": 5.237062935641184
      },
      "velocity": {
        "x": 0.04267193612438962,
        "y": -0.057894465395372484,
        "z": -0.005754940644672875
      },
      "errorBound": 4.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 45,
      "time": 9,
      "position": {
        "x": 5.295097888591239,
        "y": 6.563086206706983,
        "z": 4.762937064358816
      },
      "velocity": {
        "x": -0.04267193612438962,
        "y": 0.08389446539537247,
        "z": 0.005754940644672878
      },
      "errorBound": 4.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 45,
      "time": 9,
      "position": {
        "x": 5.236902111408759,
        "y": 5.670913793293018,
        "z": 4.949062935641184
      },
      "velocity": {
        "x": -0.009328063875610386,
        "y": -0.057894465395372484,
        "z": 0.002245059355327127
      },
      "errorBound": 4.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 45,
      "time": 9,
      "position": {
        "x": 6.763097888591241,
        "y": 4.797086206706985,
        "z": 5.230937064358817
      },
      "velocity": {
        "x": 0.009328063875610387,
        "y": 0.10989446539537247,
        "z": -0.002245059355327125
      },
      "errorBound": 4.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 45,
      "time": 9,
      "position": {
        "x": 6.704902111408761,
        "y": 3.904913793293018,
        "z": 4.697062935641185
      },
      "velocity": {
        "x": 0.04267193612438962,
        "y": -0.031894465395372454,
        "z": -0.005754940644672873
      },
      "errorBound": 4.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 45,
      "time": 9,
      "position": {
        "x": 6.295097888591239,
        "y": 6.797086206706985,
        "z": 4.942937064358816
      },
      "velocity": {
        "x": -0.04267193612438962,
        "y": 0.1098944653953725,
        "z": 0.005754940644672876
      },
      "errorBound": 4.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 45,
      "time": 9,
      "position": {
        "x": 6.236902111408759,
        "y": 5.904913793293018,
        "z": 5.129062935641183
      },
      "velocity": {
        "x": -0.009328063875610379,
        "y": -0.031894465395372454,
        "z": 0.0022450593553271256
      },
      "errorBound": 4.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 46,
      "time": 9.2,
      "position": {
        "x": 3.764861076798519,
        "y": 4.099894876338448,
        "z": 4.690498834021209
      },
      "velocity": {
        "x": 0.008815941036404573,
        "y": 0.024043348157329565,
        "z": -0.0021911516880422912
      },
      "errorBound": 4.5999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 46,
      "time": 9.2,
      "position": {
        "x": 3.713538923201479,
        "y": 3.1825051236615525,
        "z": 4.875901165978793
      },
      "velocity": {
        "x": 0.04318405896359542,
        "y": -0.10204334815732963,
        "z": -0.005808848311957711
      },
      "errorBound": 4.5999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 46,
      "time": 9.2,
      "position": {
        "x": 3.286461076798521,
        "y": 6.099894876338448,
        "z": 5.124098834021207
      },
      "velocity": {
        "x": -0.043184058963595444,
        "y": 0.02404334815732958,
        "z": 0.00580884831195771
      },
      "errorBound": 4.5999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 46,
      "time": 9.2,
      "position": {
        "x": 3.235138923201481,
        "y": 5.182505123661551,
        "z": 5.309501165978791
      },
      "velocity": {
        "x": -0.008815941036404571,
        "y": -0.1020433481573296,
        "z": 0.002191151688042291
      },
      "errorBound": 4.5999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 46,
      "time": 9.2,
      "position": {
        "x": 4.764861076798522,
        "y": 4.33909487633845,
        "z": 4.870498834021208
      },
      "velocity": {
        "x": 0.008815941036404554,
        "y": 0.05004334815732963,
        "z": -0.002191151688042291
      },
      "errorBound": 4.5999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 46,
      "time": 9.2,
      "position": {
        "x": 4.71353892320148,
        "y": 3.421705123661547,
        "z": 5.055901165978793
      },
      "velocity": {
        "x": 0.04318405896359543,
        "y": -0.0760433481573296,
        "z": -0.005808848311957711
      },
      "errorBound": 4.5999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 46,
      "time": 9.2,
      "position": {
        "x": 4.28646107679852,
        "y": 6.339094876338448,
        "z": 5.3040988340212065
      },
      "velocity": {
        "x": -0.04318405896359543,
        "y": 0.05004334815732961,
        "z": 0.005808848311957709
      },
      "errorBound": 4.5999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 46,
      "time": 9.2,
      "position": {
        "x": 4.235138923201478,
        "y": 5.4217051236615506,
        "z": 4.7695011659787925
      },
      "velocity": {
        "x": -0.008815941036404562,
        "y": -0.07604334815732963,
        "z": 0.0021911516880422917
      },
      "errorBound": 4.5999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 46,
      "time": 9.2,
      "position": {
        "x": 5.764861076798522,
        "y": 4.578294876338446,
        "z": 5.050498834021208
      },
      "velocity": {
        "x": 0.008815941036404573,
        "y": 0.0760433481573296,
        "z": -0.0021911516880422917
      },
      "errorBound": 4.5999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 46,
      "time": 9.2,
      "position": {
        "x": 5.71353892320148,
        "y": 3.660905123661553,
        "z": 5.235901165978793
      },
      "velocity": {
        "x": 0.04318405896359543,
        "y": -0.05004334815732961,
        "z": -0.00580884831195771
      },
      "errorBound": 4.5999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 46,
      "time": 9.2,
      "position": {
        "x": 5.28646107679852,
        "y": 6.5782948763384494,
        "z": 4.764098834021207
      },
      "velocity": {
        "x": -0.04318405896359543,
        "y": 0.0760433481573296,
        "z": 0.005808848311957712
      },
      "errorBound": 4.5999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 46,
      "time": 9.2,
      "position": {
        "x": 5.235138923201478,
        "y": 5.660905123661552,
        "z": 4.949501165978792
      },
      "velocity": {
        "x": -0.00881594103640457,
        "y": -0.05004334815732961,
        "z": 0.002191151688042292
      },
      "errorBound": 4.5999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 46,
      "time": 9.2,
      "position": {
        "x": 6.764861076798522,
        "y": 4.817494876338451,
        "z": 5.230498834021208
      },
      "velocity": {
        "x": 0.008815941036404571,
        "y": 0.1020433481573296,
        "z": -0.00219115168804229
      },
      "errorBound": 4.5999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 46,
      "time": 9.2,
      "position": {
        "x": 6.71353892320148,
        "y": 3.900105123661552,
        "z": 4.6959011659787935
      },
      "velocity": {
        "x": 0.04318405896359544,
        "y": -0.02404334815732958,
        "z": -0.005808848311957708
      },
      "errorBound": 4.5999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 46,
      "time": 9.2,
      "position": {
        "x": 6.28646107679852,
        "y": 6.817494876338451,
        "z": 4.944098834021207
      },
      "velocity": {
        "x": -0.04318405896359543,
        "y": 0.10204334815732963,
        "z": 0.005808848311957711
      },
      "errorBound": 4.5999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 46,
      "time": 9.2,
      "position": {
        "x": 6.235138923201478,
        "y": 5.900105123661552,
        "z": 5.129501165978792
      },
      "velocity": {
        "x": -0.008815941036404564,
        "y": -0.02404334815732958,
        "z": 0.0021911516880422904
      },
      "errorBound": 4.5999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 47,
      "time": 9.399999999999999,
      "position": {
        "x": 3.766533938015469,
        "y": 4.103088940005202,
        "z": 4.690070111787846
      },
      "velocity": {
        "x": 0.008364306084750613,
        "y": 0.015970318333772895,
        "z": -0.0021436111668155454
      },
      "errorBound": 4.699999999999999e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 47,
      "time": 9.399999999999999,
      "position": {
        "x": 3.722266061984529,
        "y": 3.1637110599947977,
        "z": 4.874729888212157
      },
      "velocity": {
        "x": 0.043635693915249386,
        "y": -0.09397031833377295,
        "z": -0.005856388833184456
      },
      "errorBound": 4.699999999999999e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 47,
      "time": 9.399999999999999,
      "position": {
        "x": 3.277733938015471,
        "y": 6.103088940005202,
        "z": 5.125270111787843
      },
      "velocity": {
        "x": -0.04363569391524941,
        "y": 0.01597031833377291,
        "z": 0.005856388833184456
      },
      "errorBound": 4.699999999999999e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 47,
      "time": 9.399999999999999,
      "position": {
        "x": 3.233466061984531,
        "y": 5.163711059994797,
        "z": 5.309929888212154
      },
      "velocity": {
        "x": -0.00836430608475061,
        "y": -0.09397031833377292,
        "z": 0.002143611166815545
      },
      "errorBound": 4.699999999999999e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 47,
      "time": 9.399999999999999,
      "position": {
        "x": 4.766533938015472,
        "y": 4.347488940005205,
        "z": 4.870070111787845
      },
      "velocity": {
        "x": 0.008364306084750592,
        "y": 0.04197031833377296,
        "z": -0.002143611166815545
      },
      "errorBound": 4.699999999999999e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 47,
      "time": 9.399999999999999,
      "position": {
        "x": 4.72226606198453,
        "y": 3.4081110599947926,
        "z": 5.054729888212156
      },
      "velocity": {
        "x": 0.04363569391524939,
        "y": -0.06797031833377294,
        "z": -0.005856388833184457
      },
      "errorBound": 4.699999999999999e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 47,
      "time": 9.399999999999999,
      "position": {
        "x": 4.27773393801547,
        "y": 6.347488940005203,
        "z": 5.305270111787843
      },
      "velocity": {
        "x": -0.04363569391524939,
        "y": 0.04197031833377294,
        "z": 0.005856388833184454
      },
      "errorBound": 4.699999999999999e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 47,
      "time": 9.399999999999999,
      "position": {
        "x": 4.233466061984528,
        "y": 5.408111059994796,
        "z": 4.769929888212156
      },
      "velocity": {
        "x": -0.008364306084750603,
        "y": -0.06797031833377296,
        "z": 0.002143611166815546
      },
      "errorBound": 4.699999999999999e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 47,
      "time": 9.399999999999999,
      "position": {
        "x": 5.766533938015472,
        "y": 4.591888940005201,
        "z": 5.050070111787845
      },
      "velocity": {
        "x": 0.008364306084750611,
        "y": 0.06797031833377293,
        "z": -0.002143611166815546
      },
      "errorBound": 4.699999999999999e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 47,
      "time": 9.399999999999999,
      "position": {
        "x": 5.72226606198453,
        "y": 3.6525110599947985,
        "z": 5.234729888212156
      },
      "velocity": {
        "x": 0.04363569391524939,
        "y": -0.04197031833377294,
        "z": -0.005856388833184456
      },
      "errorBound": 4.699999999999999e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 47,
      "time": 9.399999999999999,
      "position": {
        "x": 5.27773393801547,
        "y": 6.591888940005204,
        "z": 4.765270111787844
      },
      "velocity": {
        "x": -0.04363569391524939,
        "y": 0.06797031833377293,
        "z": 0.005856388833184459
      },
      "errorBound": 4.699999999999999e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 47,
      "time": 9.399999999999999,
      "position": {
        "x": 5.233466061984528,
        "y": 5.652511059994797,
        "z": 4.949929888212155
      },
      "velocity": {
        "x": -0.008364306084750608,
        "y": -0.04197031833377294,
        "z": 0.0021436111668155463
      },
      "errorBound": 4.699999999999999e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 47,
      "time": 9.399999999999999,
      "position": {
        "x": 6.766533938015472,
        "y": 4.836288940005205,
        "z": 5.230070111787845
      },
      "velocity": {
        "x": 0.00836430608475061,
        "y": 0.09397031833377292,
        "z": -0.002143611166815544
      },
      "errorBound": 4.699999999999999e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 47,
      "time": 9.399999999999999,
      "position": {
        "x": 6.72226606198453,
        "y": 3.8969110599947974,
        "z": 4.694729888212157
      },
      "velocity": {
        "x": 0.0436356939152494,
        "y": -0.01597031833377291,
        "z": -0.005856388833184453
      },
      "errorBound": 4.699999999999999e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 47,
      "time": 9.399999999999999,
      "position": {
        "x": 6.27773393801547,
        "y": 6.836288940005205,
        "z": 4.945270111787844
      },
      "velocity": {
        "x": -0.04363569391524939,
        "y": 0.09397031833377295,
        "z": 0.005856388833184457
      },
      "errorBound": 4.699999999999999e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 47,
      "time": 9.399999999999999,
      "position": {
        "x": 6.233466061984528,
        "y": 5.896911059994798,
        "z": 5.129929888212155
      },
      "velocity": {
        "x": -0.008364306084750603,
        "y": -0.01597031833377291,
        "z": 0.0021436111668155446
      },
      "errorBound": 4.699999999999999e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 48,
      "time": 9.599999999999998,
      "position": {
        "x": 3.768128887770605,
        "y": 4.104629698603138,
        "z": 4.68964959076099
      },
      "velocity": {
        "x": 0.007974748775678326,
        "y": 0.007703792989681345,
        "z": -0.002102605134281606
      },
      "errorBound": 4.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 48,
      "time": 9.599999999999998,
      "position": {
        "x": 3.7310711122293934,
        "y": 3.1465703013968613,
        "z": 4.873550409239013
      },
      "velocity": {
        "x": 0.044025251224321674,
        "y": -0.0857037929896814,
        "z": -0.005897394865718396
      },
      "errorBound": 4.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 48,
      "time": 9.599999999999998,
      "position": {
        "x": 3.2689288877706066,
        "y": 6.104629698603138,
        "z": 5.126449590760987
      },
      "velocity": {
        "x": -0.044025251224321695,
        "y": 0.007703792989681359,
        "z": 0.005897394865718396
      },
      "errorBound": 4.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 48,
      "time": 9.599999999999998,
      "position": {
        "x": 3.231871112229395,
        "y": 5.146570301396861,
        "z": 5.31035040923901
      },
      "velocity": {
        "x": -0.007974748775678322,
        "y": -0.08570379298968137,
        "z": 0.002102605134281605
      },
      "errorBound": 4.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 48,
      "time": 9.599999999999998,
      "position": {
        "x": 4.768128887770608,
        "y": 4.354229698603141,
        "z": 4.8696495907609885
      },
      "velocity": {
        "x": 0.007974748775678305,
        "y": 0.03370379298968141,
        "z": -0.0021026051342816054
      },
      "errorBound": 4.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 48,
      "time": 9.599999999999998,
      "position": {
        "x": 4.731071112229394,
        "y": 3.3961703013968565,
        "z": 5.053550409239013
      },
      "velocity": {
        "x": 0.04402525122432168,
        "y": -0.05970379298968139,
        "z": -0.0058973948657183965
      },
      "errorBound": 4.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 48,
      "time": 9.599999999999998,
      "position": {
        "x": 4.268928887770606,
        "y": 6.354229698603139,
        "z": 5.3064495907609865
      },
      "velocity": {
        "x": -0.04402525122432168,
        "y": 0.03370379298968139,
        "z": 0.005897394865718394
      },
      "errorBound": 4.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 48,
      "time": 9.599999999999998,
      "position": {
        "x": 4.231871112229392,
        "y": 5.396170301396859,
        "z": 4.770350409239012
      },
      "velocity": {
        "x": -0.007974748775678315,
        "y": -0.059703792989681405,
        "z": 0.0021026051342816062
      },
      "errorBound": 4.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 48,
      "time": 9.599999999999998,
      "position": {
        "x": 5.768128887770608,
        "y": 4.603829698603137,
        "z": 5.049649590760988
      },
      "velocity": {
        "x": 0.007974748775678324,
        "y": 0.05970379298968138,
        "z": -0.002102605134281606
      },
      "errorBound": 4.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 48,
      "time": 9.599999999999998,
      "position": {
        "x": 5.731071112229394,
        "y": 3.6457703013968623,
        "z": 5.233550409239013
      },
      "velocity": {
        "x": 0.04402525122432168,
        "y": -0.03370379298968139,
        "z": -0.005897394865718396
      },
      "errorBound": 4.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 48,
      "time": 9.599999999999998,
      "position": {
        "x": 5.268928887770606,
        "y": 6.603829698603141,
        "z": 4.766449590760987
      },
      "velocity": {
        "x": -0.04402525122432168,
        "y": 0.059703792989681384,
        "z": 0.005897394865718398
      },
      "errorBound": 4.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 48,
      "time": 9.599999999999998,
      "position": {
        "x": 5.231871112229392,
        "y": 5.645770301396861,
        "z": 4.950350409239012
      },
      "velocity": {
        "x": -0.00797474877567832,
        "y": -0.03370379298968139,
        "z": 0.0021026051342816062
      },
      "errorBound": 4.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 48,
      "time": 9.599999999999998,
      "position": {
        "x": 6.768128887770608,
        "y": 4.853429698603141,
        "z": 5.229649590760989
      },
      "velocity": {
        "x": 0.007974748775678322,
        "y": 0.08570379298968138,
        "z": -0.0021026051342816045
      },
      "errorBound": 4.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 48,
      "time": 9.599999999999998,
      "position": {
        "x": 6.731071112229394,
        "y": 3.895370301396861,
        "z": 4.6935504092390135
      },
      "velocity": {
        "x": 0.04402525122432169,
        "y": -0.007703792989681357,
        "z": -0.005897394865718393
      },
      "errorBound": 4.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 48,
      "time": 9.599999999999998,
      "position": {
        "x": 6.268928887770606,
        "y": 6.853429698603141,
        "z": 4.946449590760987
      },
      "velocity": {
        "x": -0.04402525122432168,
        "y": 0.08570379298968141,
        "z": 0.0058973948657183965
      },
      "errorBound": 4.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 48,
      "time": 9.599999999999998,
      "position": {
        "x": 6.231871112229392,
        "y": 5.895370301396862,
        "z": 5.1303504092390115
      },
      "velocity": {
        "x": -0.007974748775678315,
        "y": -0.00770379298968136,
        "z": 0.0021026051342816045
      },
      "errorBound": 4.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 49,
      "time": 9.799999999999997,
      "position": {
        "x": 3.769658615840788,
        "y": 4.104484272661991,
        "z": 4.689235935174654
      },
      "velocity": {
        "x": 0.007648640350915647,
        "y": -0.000727129705733881,
        "z": -0.0020682779316749914
      },
      "errorBound": 4.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 49,
      "time": 9.799999999999997,
      "position": {
        "x": 3.73994138415921,
        "y": 3.1311157273380084,
        "z": 4.872364064825348
      },
      "velocity": {
        "x": 0.04435135964908435,
        "y": -0.07727287029426616,
        "z": -0.00593172206832501
      },
      "errorBound": 4.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 49,
      "time": 9.799999999999997,
      "position": {
        "x": 3.26005861584079,
        "y": 6.104484272661991,
        "z": 5.127635935174652
      },
      "velocity": {
        "x": -0.044351359649084376,
        "y": -0.0007271297057338671,
        "z": 0.00593172206832501
      },
      "errorBound": 4.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 49,
      "time": 9.799999999999997,
      "position": {
        "x": 3.230341384159212,
        "y": 5.131115727338008,
        "z": 5.310764064825346
      },
      "velocity": {
        "x": -0.007648640350915642,
        "y": -0.07727287029426613,
        "z": 0.0020682779316749905
      },
      "errorBound": 4.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 49,
      "time": 9.799999999999997,
      "position": {
        "x": 4.769658615840791,
        "y": 4.359284272661994,
        "z": 4.869235935174653
      },
      "velocity": {
        "x": 0.007648640350915627,
        "y": 0.025272870294266184,
        "z": -0.0020682779316749914
      },
      "errorBound": 4.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 49,
      "time": 9.799999999999997,
      "position": {
        "x": 4.739941384159211,
        "y": 3.3859157273380034,
        "z": 5.052364064825348
      },
      "velocity": {
        "x": 0.04435135964908436,
        "y": -0.051272870294266165,
        "z": -0.005931722068325011
      },
      "errorBound": 4.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 49,
      "time": 9.799999999999997,
      "position": {
        "x": 4.260058615840789,
        "y": 6.359284272661992,
        "z": 5.307635935174652
      },
      "velocity": {
        "x": -0.04435135964908436,
        "y": 0.025272870294266163,
        "z": 0.005931722068325008
      },
      "errorBound": 4.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 49,
      "time": 9.799999999999997,
      "position": {
        "x": 4.230341384159209,
        "y": 5.385915727338006,
        "z": 4.7707640648253475
      },
      "velocity": {
        "x": -0.007648640350915637,
        "y": -0.05127287029426618,
        "z": 0.002068277931674992
      },
      "errorBound": 4.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 49,
      "time": 9.799999999999997,
      "position": {
        "x": 5.769658615840791,
        "y": 4.614084272661991,
        "z": 5.049235935174653
      },
      "velocity": {
        "x": 0.0076486403509156455,
        "y": 0.05127287029426615,
        "z": -0.0020682779316749914
      },
      "errorBound": 4.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 49,
      "time": 9.799999999999997,
      "position": {
        "x": 5.739941384159211,
        "y": 3.640715727338009,
        "z": 5.232364064825347
      },
      "velocity": {
        "x": 0.04435135964908436,
        "y": -0.025272870294266163,
        "z": -0.00593172206832501
      },
      "errorBound": 4.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 49,
      "time": 9.799999999999997,
      "position": {
        "x": 5.260058615840789,
        "y": 6.614084272661994,
        "z": 4.767635935174653
      },
      "velocity": {
        "x": -0.04435135964908436,
        "y": 0.05127287029426616,
        "z": 0.005931722068325013
      },
      "errorBound": 4.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 49,
      "time": 9.799999999999997,
      "position": {
        "x": 5.230341384159209,
        "y": 5.640715727338008,
        "z": 4.950764064825347
      },
      "velocity": {
        "x": -0.007648640350915641,
        "y": -0.025272870294266163,
        "z": 0.0020682779316749922
      },
      "errorBound": 4.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 49,
      "time": 9.799999999999997,
      "position": {
        "x": 6.769658615840791,
        "y": 4.868884272661994,
        "z": 5.229235935174653
      },
      "velocity": {
        "x": 0.007648640350915643,
        "y": 0.07727287029426616,
        "z": -0.00206827793167499
      },
      "errorBound": 4.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 49,
      "time": 9.799999999999997,
      "position": {
        "x": 6.739941384159211,
        "y": 3.8955157273380077,
        "z": 4.692364064825348
      },
      "velocity": {
        "x": 0.04435135964908437,
        "y": 0.0007271297057338689,
        "z": -0.0059317220683250075
      },
      "errorBound": 4.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 49,
      "time": 9.799999999999997,
      "position": {
        "x": 6.260058615840789,
        "y": 6.868884272661994,
        "z": 4.947635935174652
      },
      "velocity": {
        "x": -0.044351359649084356,
        "y": 0.07727287029426619,
        "z": 0.005931722068325011
      },
      "errorBound": 4.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 49,
      "time": 9.799999999999997,
      "position": {
        "x": 6.230341384159209,
        "y": 5.895515727338009,
        "z": 5.130764064825347
      },
      "velocity": {
        "x": -0.007648640350915637,
        "y": 0.0007271297057338654,
        "z": 0.00206827793167499
      },
      "errorBound": 4.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 50,
      "time": 10,
      "position": {
        "x": 3.7711360415832114,
        "y": 4.102625718081074,
        "z": 4.688827785096504
      },
      "velocity": {
        "x": 0.007387128712117742,
        "y": -0.009292772904585075,
        "z": -0.002040750390748879
      },
      "errorBound": 4.999999999999999e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 50,
      "time": 10,
      "position": {
        "x": 3.748863958416787,
        "y": 3.117374281918925,
        "z": 4.871172214903497
      },
      "velocity": {
        "x": 0.04461287128788225,
        "y": -0.06870722709541496,
        "z": -0.0059592496092511224
      },
      "errorBound": 4.999999999999999e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1003,
      "frameIndex": 50,
      "time": 10,
      "position": {
        "x": 3.251136041583213,
        "y": 6.102625718081074,
        "z": 5.128827785096503
      },
      "velocity": {
        "x": -0.044612871287882286,
        "y": -0.00929277290458506,
        "z": 0.0059592496092511224
      },
      "errorBound": 4.999999999999999e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1004,
      "frameIndex": 50,
      "time": 10,
      "position": {
        "x": 3.2288639584167886,
        "y": 5.1173742819189245,
        "z": 5.311172214903496
      },
      "velocity": {
        "x": -0.007387128712117737,
        "y": -0.06870722709541494,
        "z": 0.002040750390748878
      },
      "errorBound": 4.999999999999999e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1005,
      "frameIndex": 50,
      "time": 10,
      "position": {
        "x": 4.771136041583215,
        "y": 4.362625718081077,
        "z": 4.868827785096503
      },
      "velocity": {
        "x": 0.007387128712117722,
        "y": 0.01670722709541499,
        "z": -0.002040750390748879
      },
      "errorBound": 4.999999999999999e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1006,
      "frameIndex": 50,
      "time": 10,
      "position": {
        "x": 4.748863958416788,
        "y": 3.3773742819189203,
        "z": 5.051172214903497
      },
      "velocity": {
        "x": 0.044612871287882265,
        "y": -0.04270722709541497,
        "z": -0.005959249609251123
      },
      "errorBound": 4.999999999999999e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1007,
      "frameIndex": 50,
      "time": 10,
      "position": {
        "x": 4.251136041583212,
        "y": 6.362625718081075,
        "z": 5.308827785096502
      },
      "velocity": {
        "x": -0.044612871287882265,
        "y": 0.016707227095414973,
        "z": 0.005959249609251121
      },
      "errorBound": 4.999999999999999e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1008,
      "frameIndex": 50,
      "time": 10,
      "position": {
        "x": 4.228863958416785,
        "y": 5.3773742819189225,
        "z": 4.771172214903498
      },
      "velocity": {
        "x": -0.007387128712117732,
        "y": -0.04270722709541498,
        "z": 0.0020407503907488795
      },
      "errorBound": 4.999999999999999e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1009,
      "frameIndex": 50,
      "time": 10,
      "position": {
        "x": 5.771136041583215,
        "y": 4.622625718081074,
        "z": 5.048827785096503
      },
      "velocity": {
        "x": 0.00738712871211774,
        "y": 0.042707227095414954,
        "z": -0.002040750390748879
      },
      "errorBound": 4.999999999999999e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1010,
      "frameIndex": 50,
      "time": 10,
      "position": {
        "x": 5.748863958416788,
        "y": 3.637374281918926,
        "z": 5.231172214903497
      },
      "velocity": {
        "x": 0.044612871287882265,
        "y": -0.01670722709541497,
        "z": -0.0059592496092511224
      },
      "errorBound": 4.999999999999999e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1011,
      "frameIndex": 50,
      "time": 10,
      "position": {
        "x": 5.251136041583212,
        "y": 6.6226257180810775,
        "z": 4.768827785096503
      },
      "velocity": {
        "x": -0.044612871287882265,
        "y": 0.04270722709541497,
        "z": 0.005959249609251125
      },
      "errorBound": 4.999999999999999e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1012,
      "frameIndex": 50,
      "time": 10,
      "position": {
        "x": 5.228863958416785,
        "y": 5.637374281918925,
        "z": 4.951172214903497
      },
      "velocity": {
        "x": -0.007387128712117736,
        "y": -0.016707227095414973,
        "z": 0.00204075039074888
      },
      "errorBound": 4.999999999999999e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1013,
      "frameIndex": 50,
      "time": 10,
      "position": {
        "x": 6.771136041583215,
        "y": 4.882625718081077,
        "z": 5.228827785096503
      },
      "velocity": {
        "x": 0.007387128712117738,
        "y": 0.06870722709541496,
        "z": -0.0020407503907488777
      },
      "errorBound": 4.999999999999999e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1014,
      "frameIndex": 50,
      "time": 10,
      "position": {
        "x": 6.748863958416788,
        "y": 3.8973742819189248,
        "z": 4.691172214903498
      },
      "velocity": {
        "x": 0.04461287128788227,
        "y": 0.00929277290458506,
        "z": -0.00595924960925112
      },
      "errorBound": 4.999999999999999e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1015,
      "frameIndex": 50,
      "time": 10,
      "position": {
        "x": 6.251136041583212,
        "y": 6.882625718081077,
        "z": 4.948827785096503
      },
      "velocity": {
        "x": -0.04461287128788226,
        "y": 0.06870722709541499,
        "z": 0.005959249609251123
      },
      "errorBound": 4.999999999999999e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1016,
      "frameIndex": 50,
      "time": 10,
      "position": {
        "x": 6.228863958416785,
        "y": 5.897374281918926,
        "z": 5.131172214903497
      },
      "velocity": {
        "x": -0.007387128712117732,
        "y": 0.009292772904585057,
        "z": 0.0020407503907488777
      },
      "errorBound": 4.999999999999999e-10,
      "stateFlags": 2
    }
  ],
  "currentStateAndFrameSources": {
    "currentStateFrameIds": [
      "pair-interaction-frame-buffer"
    ],
    "checkpointIds": [],
    "frameBufferIds": [
      "pair-interaction-frame-buffer"
    ],
    "trajectoryFrameIds": [
      "borg-first-native-backed-fixture-native-run:frame:1001:0",
      "borg-first-native-backed-fixture-native-run:frame:1002:0",
      "borg-first-native-backed-fixture-native-run:frame:1003:0",
      "borg-first-native-backed-fixture-native-run:frame:1004:0",
      "borg-first-native-backed-fixture-native-run:frame:1005:0",
      "borg-first-native-backed-fixture-native-run:frame:1006:0",
      "borg-first-native-backed-fixture-native-run:frame:1007:0",
      "borg-first-native-backed-fixture-native-run:frame:1008:0",
      "borg-first-native-backed-fixture-native-run:frame:1009:0",
      "borg-first-native-backed-fixture-native-run:frame:1010:0",
      "borg-first-native-backed-fixture-native-run:frame:1011:0",
      "borg-first-native-backed-fixture-native-run:frame:1012:0",
      "borg-first-native-backed-fixture-native-run:frame:1013:0",
      "borg-first-native-backed-fixture-native-run:frame:1014:0",
      "borg-first-native-backed-fixture-native-run:frame:1015:0",
      "borg-first-native-backed-fixture-native-run:frame:1016:0",
      "borg-first-native-backed-fixture-native-run:frame:1001:1",
      "borg-first-native-backed-fixture-native-run:frame:1002:1",
      "borg-first-native-backed-fixture-native-run:frame:1003:1",
      "borg-first-native-backed-fixture-native-run:frame:1004:1",
      "borg-first-native-backed-fixture-native-run:frame:1005:1",
      "borg-first-native-backed-fixture-native-run:frame:1006:1",
      "borg-first-native-backed-fixture-native-run:frame:1007:1",
      "borg-first-native-backed-fixture-native-run:frame:1008:1",
      "borg-first-native-backed-fixture-native-run:frame:1009:1",
      "borg-first-native-backed-fixture-native-run:frame:1010:1",
      "borg-first-native-backed-fixture-native-run:frame:1011:1",
      "borg-first-native-backed-fixture-native-run:frame:1012:1",
      "borg-first-native-backed-fixture-native-run:frame:1013:1",
      "borg-first-native-backed-fixture-native-run:frame:1014:1",
      "borg-first-native-backed-fixture-native-run:frame:1015:1",
      "borg-first-native-backed-fixture-native-run:frame:1016:1",
      "borg-first-native-backed-fixture-native-run:frame:1001:2",
      "borg-first-native-backed-fixture-native-run:frame:1002:2",
      "borg-first-native-backed-fixture-native-run:frame:1003:2",
      "borg-first-native-backed-fixture-native-run:frame:1004:2",
      "borg-first-native-backed-fixture-native-run:frame:1005:2",
      "borg-first-native-backed-fixture-native-run:frame:1006:2",
      "borg-first-native-backed-fixture-native-run:frame:1007:2",
      "borg-first-native-backed-fixture-native-run:frame:1008:2",
      "borg-first-native-backed-fixture-native-run:frame:1009:2",
      "borg-first-native-backed-fixture-native-run:frame:1010:2",
      "borg-first-native-backed-fixture-native-run:frame:1011:2",
      "borg-first-native-backed-fixture-native-run:frame:1012:2",
      "borg-first-native-backed-fixture-native-run:frame:1013:2",
      "borg-first-native-backed-fixture-native-run:frame:1014:2",
      "borg-first-native-backed-fixture-native-run:frame:1015:2",
      "borg-first-native-backed-fixture-native-run:frame:1016:2",
      "borg-first-native-backed-fixture-native-run:frame:1001:3",
      "borg-first-native-backed-fixture-native-run:frame:1002:3",
      "borg-first-native-backed-fixture-native-run:frame:1003:3",
      "borg-first-native-backed-fixture-native-run:frame:1004:3",
      "borg-first-native-backed-fixture-native-run:frame:1005:3",
      "borg-first-native-backed-fixture-native-run:frame:1006:3",
      "borg-first-native-backed-fixture-native-run:frame:1007:3",
      "borg-first-native-backed-fixture-native-run:frame:1008:3",
      "borg-first-native-backed-fixture-native-run:frame:1009:3",
      "borg-first-native-backed-fixture-native-run:frame:1010:3",
      "borg-first-native-backed-fixture-native-run:frame:1011:3",
      "borg-first-native-backed-fixture-native-run:frame:1012:3",
      "borg-first-native-backed-fixture-native-run:frame:1013:3",
      "borg-first-native-backed-fixture-native-run:frame:1014:3",
      "borg-first-native-backed-fixture-native-run:frame:1015:3",
      "borg-first-native-backed-fixture-native-run:frame:1016:3",
      "borg-first-native-backed-fixture-native-run:frame:1001:4",
      "borg-first-native-backed-fixture-native-run:frame:1002:4",
      "borg-first-native-backed-fixture-native-run:frame:1003:4",
      "borg-first-native-backed-fixture-native-run:frame:1004:4",
      "borg-first-native-backed-fixture-native-run:frame:1005:4",
      "borg-first-native-backed-fixture-native-run:frame:1006:4",
      "borg-first-native-backed-fixture-native-run:frame:1007:4",
      "borg-first-native-backed-fixture-native-run:frame:1008:4",
      "borg-first-native-backed-fixture-native-run:frame:1009:4",
      "borg-first-native-backed-fixture-native-run:frame:1010:4",
      "borg-first-native-backed-fixture-native-run:frame:1011:4",
      "borg-first-native-backed-fixture-native-run:frame:1012:4",
      "borg-first-native-backed-fixture-native-run:frame:1013:4",
      "borg-first-native-backed-fixture-native-run:frame:1014:4",
      "borg-first-native-backed-fixture-native-run:frame:1015:4",
      "borg-first-native-backed-fixture-native-run:frame:1016:4",
      "borg-first-native-backed-fixture-native-run:frame:1001:5",
      "borg-first-native-backed-fixture-native-run:frame:1002:5",
      "borg-first-native-backed-fixture-native-run:frame:1003:5",
      "borg-first-native-backed-fixture-native-run:frame:1004:5",
      "borg-first-native-backed-fixture-native-run:frame:1005:5",
      "borg-first-native-backed-fixture-native-run:frame:1006:5",
      "borg-first-native-backed-fixture-native-run:frame:1007:5",
      "borg-first-native-backed-fixture-native-run:frame:1008:5",
      "borg-first-native-backed-fixture-native-run:frame:1009:5",
      "borg-first-native-backed-fixture-native-run:frame:1010:5",
      "borg-first-native-backed-fixture-native-run:frame:1011:5",
      "borg-first-native-backed-fixture-native-run:frame:1012:5",
      "borg-first-native-backed-fixture-native-run:frame:1013:5",
      "borg-first-native-backed-fixture-native-run:frame:1014:5",
      "borg-first-native-backed-fixture-native-run:frame:1015:5",
      "borg-first-native-backed-fixture-native-run:frame:1016:5",
      "borg-first-native-backed-fixture-native-run:frame:1001:6",
      "borg-first-native-backed-fixture-native-run:frame:1002:6",
      "borg-first-native-backed-fixture-native-run:frame:1003:6",
      "borg-first-native-backed-fixture-native-run:frame:1004:6",
      "borg-first-native-backed-fixture-native-run:frame:1005:6",
      "borg-first-native-backed-fixture-native-run:frame:1006:6",
      "borg-first-native-backed-fixture-native-run:frame:1007:6",
      "borg-first-native-backed-fixture-native-run:frame:1008:6",
      "borg-first-native-backed-fixture-native-run:frame:1009:6",
      "borg-first-native-backed-fixture-native-run:frame:1010:6",
      "borg-first-native-backed-fixture-native-run:frame:1011:6",
      "borg-first-native-backed-fixture-native-run:frame:1012:6",
      "borg-first-native-backed-fixture-native-run:frame:1013:6",
      "borg-first-native-backed-fixture-native-run:frame:1014:6",
      "borg-first-native-backed-fixture-native-run:frame:1015:6",
      "borg-first-native-backed-fixture-native-run:frame:1016:6",
      "borg-first-native-backed-fixture-native-run:frame:1001:7",
      "borg-first-native-backed-fixture-native-run:frame:1002:7",
      "borg-first-native-backed-fixture-native-run:frame:1003:7",
      "borg-first-native-backed-fixture-native-run:frame:1004:7",
      "borg-first-native-backed-fixture-native-run:frame:1005:7",
      "borg-first-native-backed-fixture-native-run:frame:1006:7",
      "borg-first-native-backed-fixture-native-run:frame:1007:7",
      "borg-first-native-backed-fixture-native-run:frame:1008:7",
      "borg-first-native-backed-fixture-native-run:frame:1009:7",
      "borg-first-native-backed-fixture-native-run:frame:1010:7",
      "borg-first-native-backed-fixture-native-run:frame:1011:7",
      "borg-first-native-backed-fixture-native-run:frame:1012:7",
      "borg-first-native-backed-fixture-native-run:frame:1013:7",
      "borg-first-native-backed-fixture-native-run:frame:1014:7",
      "borg-first-native-backed-fixture-native-run:frame:1015:7",
      "borg-first-native-backed-fixture-native-run:frame:1016:7",
      "borg-first-native-backed-fixture-native-run:frame:1001:8",
      "borg-first-native-backed-fixture-native-run:frame:1002:8",
      "borg-first-native-backed-fixture-native-run:frame:1003:8",
      "borg-first-native-backed-fixture-native-run:frame:1004:8",
      "borg-first-native-backed-fixture-native-run:frame:1005:8",
      "borg-first-native-backed-fixture-native-run:frame:1006:8",
      "borg-first-native-backed-fixture-native-run:frame:1007:8",
      "borg-first-native-backed-fixture-native-run:frame:1008:8",
      "borg-first-native-backed-fixture-native-run:frame:1009:8",
      "borg-first-native-backed-fixture-native-run:frame:1010:8",
      "borg-first-native-backed-fixture-native-run:frame:1011:8",
      "borg-first-native-backed-fixture-native-run:frame:1012:8",
      "borg-first-native-backed-fixture-native-run:frame:1013:8",
      "borg-first-native-backed-fixture-native-run:frame:1014:8",
      "borg-first-native-backed-fixture-native-run:frame:1015:8",
      "borg-first-native-backed-fixture-native-run:frame:1016:8",
      "borg-first-native-backed-fixture-native-run:frame:1001:9",
      "borg-first-native-backed-fixture-native-run:frame:1002:9",
      "borg-first-native-backed-fixture-native-run:frame:1003:9",
      "borg-first-native-backed-fixture-native-run:frame:1004:9",
      "borg-first-native-backed-fixture-native-run:frame:1005:9",
      "borg-first-native-backed-fixture-native-run:frame:1006:9",
      "borg-first-native-backed-fixture-native-run:frame:1007:9",
      "borg-first-native-backed-fixture-native-run:frame:1008:9",
      "borg-first-native-backed-fixture-native-run:frame:1009:9",
      "borg-first-native-backed-fixture-native-run:frame:1010:9",
      "borg-first-native-backed-fixture-native-run:frame:1011:9",
      "borg-first-native-backed-fixture-native-run:frame:1012:9",
      "borg-first-native-backed-fixture-native-run:frame:1013:9",
      "borg-first-native-backed-fixture-native-run:frame:1014:9",
      "borg-first-native-backed-fixture-native-run:frame:1015:9",
      "borg-first-native-backed-fixture-native-run:frame:1016:9",
      "borg-first-native-backed-fixture-native-run:frame:1001:10",
      "borg-first-native-backed-fixture-native-run:frame:1002:10",
      "borg-first-native-backed-fixture-native-run:frame:1003:10",
      "borg-first-native-backed-fixture-native-run:frame:1004:10",
      "borg-first-native-backed-fixture-native-run:frame:1005:10",
      "borg-first-native-backed-fixture-native-run:frame:1006:10",
      "borg-first-native-backed-fixture-native-run:frame:1007:10",
      "borg-first-native-backed-fixture-native-run:frame:1008:10",
      "borg-first-native-backed-fixture-native-run:frame:1009:10",
      "borg-first-native-backed-fixture-native-run:frame:1010:10",
      "borg-first-native-backed-fixture-native-run:frame:1011:10",
      "borg-first-native-backed-fixture-native-run:frame:1012:10",
      "borg-first-native-backed-fixture-native-run:frame:1013:10",
      "borg-first-native-backed-fixture-native-run:frame:1014:10",
      "borg-first-native-backed-fixture-native-run:frame:1015:10",
      "borg-first-native-backed-fixture-native-run:frame:1016:10",
      "borg-first-native-backed-fixture-native-run:frame:1001:11",
      "borg-first-native-backed-fixture-native-run:frame:1002:11",
      "borg-first-native-backed-fixture-native-run:frame:1003:11",
      "borg-first-native-backed-fixture-native-run:frame:1004:11",
      "borg-first-native-backed-fixture-native-run:frame:1005:11",
      "borg-first-native-backed-fixture-native-run:frame:1006:11",
      "borg-first-native-backed-fixture-native-run:frame:1007:11",
      "borg-first-native-backed-fixture-native-run:frame:1008:11",
      "borg-first-native-backed-fixture-native-run:frame:1009:11",
      "borg-first-native-backed-fixture-native-run:frame:1010:11",
      "borg-first-native-backed-fixture-native-run:frame:1011:11",
      "borg-first-native-backed-fixture-native-run:frame:1012:11",
      "borg-first-native-backed-fixture-native-run:frame:1013:11",
      "borg-first-native-backed-fixture-native-run:frame:1014:11",
      "borg-first-native-backed-fixture-native-run:frame:1015:11",
      "borg-first-native-backed-fixture-native-run:frame:1016:11",
      "borg-first-native-backed-fixture-native-run:frame:1001:12",
      "borg-first-native-backed-fixture-native-run:frame:1002:12",
      "borg-first-native-backed-fixture-native-run:frame:1003:12",
      "borg-first-native-backed-fixture-native-run:frame:1004:12",
      "borg-first-native-backed-fixture-native-run:frame:1005:12",
      "borg-first-native-backed-fixture-native-run:frame:1006:12",
      "borg-first-native-backed-fixture-native-run:frame:1007:12",
      "borg-first-native-backed-fixture-native-run:frame:1008:12",
      "borg-first-native-backed-fixture-native-run:frame:1009:12",
      "borg-first-native-backed-fixture-native-run:frame:1010:12",
      "borg-first-native-backed-fixture-native-run:frame:1011:12",
      "borg-first-native-backed-fixture-native-run:frame:1012:12",
      "borg-first-native-backed-fixture-native-run:frame:1013:12",
      "borg-first-native-backed-fixture-native-run:frame:1014:12",
      "borg-first-native-backed-fixture-native-run:frame:1015:12",
      "borg-first-native-backed-fixture-native-run:frame:1016:12",
      "borg-first-native-backed-fixture-native-run:frame:1001:13",
      "borg-first-native-backed-fixture-native-run:frame:1002:13",
      "borg-first-native-backed-fixture-native-run:frame:1003:13",
      "borg-first-native-backed-fixture-native-run:frame:1004:13",
      "borg-first-native-backed-fixture-native-run:frame:1005:13",
      "borg-first-native-backed-fixture-native-run:frame:1006:13",
      "borg-first-native-backed-fixture-native-run:frame:1007:13",
      "borg-first-native-backed-fixture-native-run:frame:1008:13",
      "borg-first-native-backed-fixture-native-run:frame:1009:13",
      "borg-first-native-backed-fixture-native-run:frame:1010:13",
      "borg-first-native-backed-fixture-native-run:frame:1011:13",
      "borg-first-native-backed-fixture-native-run:frame:1012:13",
      "borg-first-native-backed-fixture-native-run:frame:1013:13",
      "borg-first-native-backed-fixture-native-run:frame:1014:13",
      "borg-first-native-backed-fixture-native-run:frame:1015:13",
      "borg-first-native-backed-fixture-native-run:frame:1016:13",
      "borg-first-native-backed-fixture-native-run:frame:1001:14",
      "borg-first-native-backed-fixture-native-run:frame:1002:14",
      "borg-first-native-backed-fixture-native-run:frame:1003:14",
      "borg-first-native-backed-fixture-native-run:frame:1004:14",
      "borg-first-native-backed-fixture-native-run:frame:1005:14",
      "borg-first-native-backed-fixture-native-run:frame:1006:14",
      "borg-first-native-backed-fixture-native-run:frame:1007:14",
      "borg-first-native-backed-fixture-native-run:frame:1008:14",
      "borg-first-native-backed-fixture-native-run:frame:1009:14",
      "borg-first-native-backed-fixture-native-run:frame:1010:14",
      "borg-first-native-backed-fixture-native-run:frame:1011:14",
      "borg-first-native-backed-fixture-native-run:frame:1012:14",
      "borg-first-native-backed-fixture-native-run:frame:1013:14",
      "borg-first-native-backed-fixture-native-run:frame:1014:14",
      "borg-first-native-backed-fixture-native-run:frame:1015:14",
      "borg-first-native-backed-fixture-native-run:frame:1016:14",
      "borg-first-native-backed-fixture-native-run:frame:1001:15",
      "borg-first-native-backed-fixture-native-run:frame:1002:15",
      "borg-first-native-backed-fixture-native-run:frame:1003:15",
      "borg-first-native-backed-fixture-native-run:frame:1004:15",
      "borg-first-native-backed-fixture-native-run:frame:1005:15",
      "borg-first-native-backed-fixture-native-run:frame:1006:15",
      "borg-first-native-backed-fixture-native-run:frame:1007:15",
      "borg-first-native-backed-fixture-native-run:frame:1008:15",
      "borg-first-native-backed-fixture-native-run:frame:1009:15",
      "borg-first-native-backed-fixture-native-run:frame:1010:15",
      "borg-first-native-backed-fixture-native-run:frame:1011:15",
      "borg-first-native-backed-fixture-native-run:frame:1012:15",
      "borg-first-native-backed-fixture-native-run:frame:1013:15",
      "borg-first-native-backed-fixture-native-run:frame:1014:15",
      "borg-first-native-backed-fixture-native-run:frame:1015:15",
      "borg-first-native-backed-fixture-native-run:frame:1016:15",
      "borg-first-native-backed-fixture-native-run:frame:1001:16",
      "borg-first-native-backed-fixture-native-run:frame:1002:16",
      "borg-first-native-backed-fixture-native-run:frame:1003:16",
      "borg-first-native-backed-fixture-native-run:frame:1004:16",
      "borg-first-native-backed-fixture-native-run:frame:1005:16",
      "borg-first-native-backed-fixture-native-run:frame:1006:16",
      "borg-first-native-backed-fixture-native-run:frame:1007:16",
      "borg-first-native-backed-fixture-native-run:frame:1008:16",
      "borg-first-native-backed-fixture-native-run:frame:1009:16",
      "borg-first-native-backed-fixture-native-run:frame:1010:16",
      "borg-first-native-backed-fixture-native-run:frame:1011:16",
      "borg-first-native-backed-fixture-native-run:frame:1012:16",
      "borg-first-native-backed-fixture-native-run:frame:1013:16",
      "borg-first-native-backed-fixture-native-run:frame:1014:16",
      "borg-first-native-backed-fixture-native-run:frame:1015:16",
      "borg-first-native-backed-fixture-native-run:frame:1016:16",
      "borg-first-native-backed-fixture-native-run:frame:1001:17",
      "borg-first-native-backed-fixture-native-run:frame:1002:17",
      "borg-first-native-backed-fixture-native-run:frame:1003:17",
      "borg-first-native-backed-fixture-native-run:frame:1004:17",
      "borg-first-native-backed-fixture-native-run:frame:1005:17",
      "borg-first-native-backed-fixture-native-run:frame:1006:17",
      "borg-first-native-backed-fixture-native-run:frame:1007:17",
      "borg-first-native-backed-fixture-native-run:frame:1008:17",
      "borg-first-native-backed-fixture-native-run:frame:1009:17",
      "borg-first-native-backed-fixture-native-run:frame:1010:17",
      "borg-first-native-backed-fixture-native-run:frame:1011:17",
      "borg-first-native-backed-fixture-native-run:frame:1012:17",
      "borg-first-native-backed-fixture-native-run:frame:1013:17",
      "borg-first-native-backed-fixture-native-run:frame:1014:17",
      "borg-first-native-backed-fixture-native-run:frame:1015:17",
      "borg-first-native-backed-fixture-native-run:frame:1016:17",
      "borg-first-native-backed-fixture-native-run:frame:1001:18",
      "borg-first-native-backed-fixture-native-run:frame:1002:18",
      "borg-first-native-backed-fixture-native-run:frame:1003:18",
      "borg-first-native-backed-fixture-native-run:frame:1004:18",
      "borg-first-native-backed-fixture-native-run:frame:1005:18",
      "borg-first-native-backed-fixture-native-run:frame:1006:18",
      "borg-first-native-backed-fixture-native-run:frame:1007:18",
      "borg-first-native-backed-fixture-native-run:frame:1008:18",
      "borg-first-native-backed-fixture-native-run:frame:1009:18",
      "borg-first-native-backed-fixture-native-run:frame:1010:18",
      "borg-first-native-backed-fixture-native-run:frame:1011:18",
      "borg-first-native-backed-fixture-native-run:frame:1012:18",
      "borg-first-native-backed-fixture-native-run:frame:1013:18",
      "borg-first-native-backed-fixture-native-run:frame:1014:18",
      "borg-first-native-backed-fixture-native-run:frame:1015:18",
      "borg-first-native-backed-fixture-native-run:frame:1016:18",
      "borg-first-native-backed-fixture-native-run:frame:1001:19",
      "borg-first-native-backed-fixture-native-run:frame:1002:19",
      "borg-first-native-backed-fixture-native-run:frame:1003:19",
      "borg-first-native-backed-fixture-native-run:frame:1004:19",
      "borg-first-native-backed-fixture-native-run:frame:1005:19",
      "borg-first-native-backed-fixture-native-run:frame:1006:19",
      "borg-first-native-backed-fixture-native-run:frame:1007:19",
      "borg-first-native-backed-fixture-native-run:frame:1008:19",
      "borg-first-native-backed-fixture-native-run:frame:1009:19",
      "borg-first-native-backed-fixture-native-run:frame:1010:19",
      "borg-first-native-backed-fixture-native-run:frame:1011:19",
      "borg-first-native-backed-fixture-native-run:frame:1012:19",
      "borg-first-native-backed-fixture-native-run:frame:1013:19",
      "borg-first-native-backed-fixture-native-run:frame:1014:19",
      "borg-first-native-backed-fixture-native-run:frame:1015:19",
      "borg-first-native-backed-fixture-native-run:frame:1016:19",
      "borg-first-native-backed-fixture-native-run:frame:1001:20",
      "borg-first-native-backed-fixture-native-run:frame:1002:20",
      "borg-first-native-backed-fixture-native-run:frame:1003:20",
      "borg-first-native-backed-fixture-native-run:frame:1004:20",
      "borg-first-native-backed-fixture-native-run:frame:1005:20",
      "borg-first-native-backed-fixture-native-run:frame:1006:20",
      "borg-first-native-backed-fixture-native-run:frame:1007:20",
      "borg-first-native-backed-fixture-native-run:frame:1008:20",
      "borg-first-native-backed-fixture-native-run:frame:1009:20",
      "borg-first-native-backed-fixture-native-run:frame:1010:20",
      "borg-first-native-backed-fixture-native-run:frame:1011:20",
      "borg-first-native-backed-fixture-native-run:frame:1012:20",
      "borg-first-native-backed-fixture-native-run:frame:1013:20",
      "borg-first-native-backed-fixture-native-run:frame:1014:20",
      "borg-first-native-backed-fixture-native-run:frame:1015:20",
      "borg-first-native-backed-fixture-native-run:frame:1016:20",
      "borg-first-native-backed-fixture-native-run:frame:1001:21",
      "borg-first-native-backed-fixture-native-run:frame:1002:21",
      "borg-first-native-backed-fixture-native-run:frame:1003:21",
      "borg-first-native-backed-fixture-native-run:frame:1004:21",
      "borg-first-native-backed-fixture-native-run:frame:1005:21",
      "borg-first-native-backed-fixture-native-run:frame:1006:21",
      "borg-first-native-backed-fixture-native-run:frame:1007:21",
      "borg-first-native-backed-fixture-native-run:frame:1008:21",
      "borg-first-native-backed-fixture-native-run:frame:1009:21",
      "borg-first-native-backed-fixture-native-run:frame:1010:21",
      "borg-first-native-backed-fixture-native-run:frame:1011:21",
      "borg-first-native-backed-fixture-native-run:frame:1012:21",
      "borg-first-native-backed-fixture-native-run:frame:1013:21",
      "borg-first-native-backed-fixture-native-run:frame:1014:21",
      "borg-first-native-backed-fixture-native-run:frame:1015:21",
      "borg-first-native-backed-fixture-native-run:frame:1016:21",
      "borg-first-native-backed-fixture-native-run:frame:1001:22",
      "borg-first-native-backed-fixture-native-run:frame:1002:22",
      "borg-first-native-backed-fixture-native-run:frame:1003:22",
      "borg-first-native-backed-fixture-native-run:frame:1004:22",
      "borg-first-native-backed-fixture-native-run:frame:1005:22",
      "borg-first-native-backed-fixture-native-run:frame:1006:22",
      "borg-first-native-backed-fixture-native-run:frame:1007:22",
      "borg-first-native-backed-fixture-native-run:frame:1008:22",
      "borg-first-native-backed-fixture-native-run:frame:1009:22",
      "borg-first-native-backed-fixture-native-run:frame:1010:22",
      "borg-first-native-backed-fixture-native-run:frame:1011:22",
      "borg-first-native-backed-fixture-native-run:frame:1012:22",
      "borg-first-native-backed-fixture-native-run:frame:1013:22",
      "borg-first-native-backed-fixture-native-run:frame:1014:22",
      "borg-first-native-backed-fixture-native-run:frame:1015:22",
      "borg-first-native-backed-fixture-native-run:frame:1016:22",
      "borg-first-native-backed-fixture-native-run:frame:1001:23",
      "borg-first-native-backed-fixture-native-run:frame:1002:23",
      "borg-first-native-backed-fixture-native-run:frame:1003:23",
      "borg-first-native-backed-fixture-native-run:frame:1004:23",
      "borg-first-native-backed-fixture-native-run:frame:1005:23",
      "borg-first-native-backed-fixture-native-run:frame:1006:23",
      "borg-first-native-backed-fixture-native-run:frame:1007:23",
      "borg-first-native-backed-fixture-native-run:frame:1008:23",
      "borg-first-native-backed-fixture-native-run:frame:1009:23",
      "borg-first-native-backed-fixture-native-run:frame:1010:23",
      "borg-first-native-backed-fixture-native-run:frame:1011:23",
      "borg-first-native-backed-fixture-native-run:frame:1012:23",
      "borg-first-native-backed-fixture-native-run:frame:1013:23",
      "borg-first-native-backed-fixture-native-run:frame:1014:23",
      "borg-first-native-backed-fixture-native-run:frame:1015:23",
      "borg-first-native-backed-fixture-native-run:frame:1016:23",
      "borg-first-native-backed-fixture-native-run:frame:1001:24",
      "borg-first-native-backed-fixture-native-run:frame:1002:24",
      "borg-first-native-backed-fixture-native-run:frame:1003:24",
      "borg-first-native-backed-fixture-native-run:frame:1004:24",
      "borg-first-native-backed-fixture-native-run:frame:1005:24",
      "borg-first-native-backed-fixture-native-run:frame:1006:24",
      "borg-first-native-backed-fixture-native-run:frame:1007:24",
      "borg-first-native-backed-fixture-native-run:frame:1008:24",
      "borg-first-native-backed-fixture-native-run:frame:1009:24",
      "borg-first-native-backed-fixture-native-run:frame:1010:24",
      "borg-first-native-backed-fixture-native-run:frame:1011:24",
      "borg-first-native-backed-fixture-native-run:frame:1012:24",
      "borg-first-native-backed-fixture-native-run:frame:1013:24",
      "borg-first-native-backed-fixture-native-run:frame:1014:24",
      "borg-first-native-backed-fixture-native-run:frame:1015:24",
      "borg-first-native-backed-fixture-native-run:frame:1016:24",
      "borg-first-native-backed-fixture-native-run:frame:1001:25",
      "borg-first-native-backed-fixture-native-run:frame:1002:25",
      "borg-first-native-backed-fixture-native-run:frame:1003:25",
      "borg-first-native-backed-fixture-native-run:frame:1004:25",
      "borg-first-native-backed-fixture-native-run:frame:1005:25",
      "borg-first-native-backed-fixture-native-run:frame:1006:25",
      "borg-first-native-backed-fixture-native-run:frame:1007:25",
      "borg-first-native-backed-fixture-native-run:frame:1008:25",
      "borg-first-native-backed-fixture-native-run:frame:1009:25",
      "borg-first-native-backed-fixture-native-run:frame:1010:25",
      "borg-first-native-backed-fixture-native-run:frame:1011:25",
      "borg-first-native-backed-fixture-native-run:frame:1012:25",
      "borg-first-native-backed-fixture-native-run:frame:1013:25",
      "borg-first-native-backed-fixture-native-run:frame:1014:25",
      "borg-first-native-backed-fixture-native-run:frame:1015:25",
      "borg-first-native-backed-fixture-native-run:frame:1016:25",
      "borg-first-native-backed-fixture-native-run:frame:1001:26",
      "borg-first-native-backed-fixture-native-run:frame:1002:26",
      "borg-first-native-backed-fixture-native-run:frame:1003:26",
      "borg-first-native-backed-fixture-native-run:frame:1004:26",
      "borg-first-native-backed-fixture-native-run:frame:1005:26",
      "borg-first-native-backed-fixture-native-run:frame:1006:26",
      "borg-first-native-backed-fixture-native-run:frame:1007:26",
      "borg-first-native-backed-fixture-native-run:frame:1008:26",
      "borg-first-native-backed-fixture-native-run:frame:1009:26",
      "borg-first-native-backed-fixture-native-run:frame:1010:26",
      "borg-first-native-backed-fixture-native-run:frame:1011:26",
      "borg-first-native-backed-fixture-native-run:frame:1012:26",
      "borg-first-native-backed-fixture-native-run:frame:1013:26",
      "borg-first-native-backed-fixture-native-run:frame:1014:26",
      "borg-first-native-backed-fixture-native-run:frame:1015:26",
      "borg-first-native-backed-fixture-native-run:frame:1016:26",
      "borg-first-native-backed-fixture-native-run:frame:1001:27",
      "borg-first-native-backed-fixture-native-run:frame:1002:27",
      "borg-first-native-backed-fixture-native-run:frame:1003:27",
      "borg-first-native-backed-fixture-native-run:frame:1004:27",
      "borg-first-native-backed-fixture-native-run:frame:1005:27",
      "borg-first-native-backed-fixture-native-run:frame:1006:27",
      "borg-first-native-backed-fixture-native-run:frame:1007:27",
      "borg-first-native-backed-fixture-native-run:frame:1008:27",
      "borg-first-native-backed-fixture-native-run:frame:1009:27",
      "borg-first-native-backed-fixture-native-run:frame:1010:27",
      "borg-first-native-backed-fixture-native-run:frame:1011:27",
      "borg-first-native-backed-fixture-native-run:frame:1012:27",
      "borg-first-native-backed-fixture-native-run:frame:1013:27",
      "borg-first-native-backed-fixture-native-run:frame:1014:27",
      "borg-first-native-backed-fixture-native-run:frame:1015:27",
      "borg-first-native-backed-fixture-native-run:frame:1016:27",
      "borg-first-native-backed-fixture-native-run:frame:1001:28",
      "borg-first-native-backed-fixture-native-run:frame:1002:28",
      "borg-first-native-backed-fixture-native-run:frame:1003:28",
      "borg-first-native-backed-fixture-native-run:frame:1004:28",
      "borg-first-native-backed-fixture-native-run:frame:1005:28",
      "borg-first-native-backed-fixture-native-run:frame:1006:28",
      "borg-first-native-backed-fixture-native-run:frame:1007:28",
      "borg-first-native-backed-fixture-native-run:frame:1008:28",
      "borg-first-native-backed-fixture-native-run:frame:1009:28",
      "borg-first-native-backed-fixture-native-run:frame:1010:28",
      "borg-first-native-backed-fixture-native-run:frame:1011:28",
      "borg-first-native-backed-fixture-native-run:frame:1012:28",
      "borg-first-native-backed-fixture-native-run:frame:1013:28",
      "borg-first-native-backed-fixture-native-run:frame:1014:28",
      "borg-first-native-backed-fixture-native-run:frame:1015:28",
      "borg-first-native-backed-fixture-native-run:frame:1016:28",
      "borg-first-native-backed-fixture-native-run:frame:1001:29",
      "borg-first-native-backed-fixture-native-run:frame:1002:29",
      "borg-first-native-backed-fixture-native-run:frame:1003:29",
      "borg-first-native-backed-fixture-native-run:frame:1004:29",
      "borg-first-native-backed-fixture-native-run:frame:1005:29",
      "borg-first-native-backed-fixture-native-run:frame:1006:29",
      "borg-first-native-backed-fixture-native-run:frame:1007:29",
      "borg-first-native-backed-fixture-native-run:frame:1008:29",
      "borg-first-native-backed-fixture-native-run:frame:1009:29",
      "borg-first-native-backed-fixture-native-run:frame:1010:29",
      "borg-first-native-backed-fixture-native-run:frame:1011:29",
      "borg-first-native-backed-fixture-native-run:frame:1012:29",
      "borg-first-native-backed-fixture-native-run:frame:1013:29",
      "borg-first-native-backed-fixture-native-run:frame:1014:29",
      "borg-first-native-backed-fixture-native-run:frame:1015:29",
      "borg-first-native-backed-fixture-native-run:frame:1016:29",
      "borg-first-native-backed-fixture-native-run:frame:1001:30",
      "borg-first-native-backed-fixture-native-run:frame:1002:30",
      "borg-first-native-backed-fixture-native-run:frame:1003:30",
      "borg-first-native-backed-fixture-native-run:frame:1004:30",
      "borg-first-native-backed-fixture-native-run:frame:1005:30",
      "borg-first-native-backed-fixture-native-run:frame:1006:30",
      "borg-first-native-backed-fixture-native-run:frame:1007:30",
      "borg-first-native-backed-fixture-native-run:frame:1008:30",
      "borg-first-native-backed-fixture-native-run:frame:1009:30",
      "borg-first-native-backed-fixture-native-run:frame:1010:30",
      "borg-first-native-backed-fixture-native-run:frame:1011:30",
      "borg-first-native-backed-fixture-native-run:frame:1012:30",
      "borg-first-native-backed-fixture-native-run:frame:1013:30",
      "borg-first-native-backed-fixture-native-run:frame:1014:30",
      "borg-first-native-backed-fixture-native-run:frame:1015:30",
      "borg-first-native-backed-fixture-native-run:frame:1016:30",
      "borg-first-native-backed-fixture-native-run:frame:1001:31",
      "borg-first-native-backed-fixture-native-run:frame:1002:31",
      "borg-first-native-backed-fixture-native-run:frame:1003:31",
      "borg-first-native-backed-fixture-native-run:frame:1004:31",
      "borg-first-native-backed-fixture-native-run:frame:1005:31",
      "borg-first-native-backed-fixture-native-run:frame:1006:31",
      "borg-first-native-backed-fixture-native-run:frame:1007:31",
      "borg-first-native-backed-fixture-native-run:frame:1008:31",
      "borg-first-native-backed-fixture-native-run:frame:1009:31",
      "borg-first-native-backed-fixture-native-run:frame:1010:31",
      "borg-first-native-backed-fixture-native-run:frame:1011:31",
      "borg-first-native-backed-fixture-native-run:frame:1012:31",
      "borg-first-native-backed-fixture-native-run:frame:1013:31",
      "borg-first-native-backed-fixture-native-run:frame:1014:31",
      "borg-first-native-backed-fixture-native-run:frame:1015:31",
      "borg-first-native-backed-fixture-native-run:frame:1016:31",
      "borg-first-native-backed-fixture-native-run:frame:1001:32",
      "borg-first-native-backed-fixture-native-run:frame:1002:32",
      "borg-first-native-backed-fixture-native-run:frame:1003:32",
      "borg-first-native-backed-fixture-native-run:frame:1004:32",
      "borg-first-native-backed-fixture-native-run:frame:1005:32",
      "borg-first-native-backed-fixture-native-run:frame:1006:32",
      "borg-first-native-backed-fixture-native-run:frame:1007:32",
      "borg-first-native-backed-fixture-native-run:frame:1008:32",
      "borg-first-native-backed-fixture-native-run:frame:1009:32",
      "borg-first-native-backed-fixture-native-run:frame:1010:32",
      "borg-first-native-backed-fixture-native-run:frame:1011:32",
      "borg-first-native-backed-fixture-native-run:frame:1012:32",
      "borg-first-native-backed-fixture-native-run:frame:1013:32",
      "borg-first-native-backed-fixture-native-run:frame:1014:32",
      "borg-first-native-backed-fixture-native-run:frame:1015:32",
      "borg-first-native-backed-fixture-native-run:frame:1016:32",
      "borg-first-native-backed-fixture-native-run:frame:1001:33",
      "borg-first-native-backed-fixture-native-run:frame:1002:33",
      "borg-first-native-backed-fixture-native-run:frame:1003:33",
      "borg-first-native-backed-fixture-native-run:frame:1004:33",
      "borg-first-native-backed-fixture-native-run:frame:1005:33",
      "borg-first-native-backed-fixture-native-run:frame:1006:33",
      "borg-first-native-backed-fixture-native-run:frame:1007:33",
      "borg-first-native-backed-fixture-native-run:frame:1008:33",
      "borg-first-native-backed-fixture-native-run:frame:1009:33",
      "borg-first-native-backed-fixture-native-run:frame:1010:33",
      "borg-first-native-backed-fixture-native-run:frame:1011:33",
      "borg-first-native-backed-fixture-native-run:frame:1012:33",
      "borg-first-native-backed-fixture-native-run:frame:1013:33",
      "borg-first-native-backed-fixture-native-run:frame:1014:33",
      "borg-first-native-backed-fixture-native-run:frame:1015:33",
      "borg-first-native-backed-fixture-native-run:frame:1016:33",
      "borg-first-native-backed-fixture-native-run:frame:1001:34",
      "borg-first-native-backed-fixture-native-run:frame:1002:34",
      "borg-first-native-backed-fixture-native-run:frame:1003:34",
      "borg-first-native-backed-fixture-native-run:frame:1004:34",
      "borg-first-native-backed-fixture-native-run:frame:1005:34",
      "borg-first-native-backed-fixture-native-run:frame:1006:34",
      "borg-first-native-backed-fixture-native-run:frame:1007:34",
      "borg-first-native-backed-fixture-native-run:frame:1008:34",
      "borg-first-native-backed-fixture-native-run:frame:1009:34",
      "borg-first-native-backed-fixture-native-run:frame:1010:34",
      "borg-first-native-backed-fixture-native-run:frame:1011:34",
      "borg-first-native-backed-fixture-native-run:frame:1012:34",
      "borg-first-native-backed-fixture-native-run:frame:1013:34",
      "borg-first-native-backed-fixture-native-run:frame:1014:34",
      "borg-first-native-backed-fixture-native-run:frame:1015:34",
      "borg-first-native-backed-fixture-native-run:frame:1016:34",
      "borg-first-native-backed-fixture-native-run:frame:1001:35",
      "borg-first-native-backed-fixture-native-run:frame:1002:35",
      "borg-first-native-backed-fixture-native-run:frame:1003:35",
      "borg-first-native-backed-fixture-native-run:frame:1004:35",
      "borg-first-native-backed-fixture-native-run:frame:1005:35",
      "borg-first-native-backed-fixture-native-run:frame:1006:35",
      "borg-first-native-backed-fixture-native-run:frame:1007:35",
      "borg-first-native-backed-fixture-native-run:frame:1008:35",
      "borg-first-native-backed-fixture-native-run:frame:1009:35",
      "borg-first-native-backed-fixture-native-run:frame:1010:35",
      "borg-first-native-backed-fixture-native-run:frame:1011:35",
      "borg-first-native-backed-fixture-native-run:frame:1012:35",
      "borg-first-native-backed-fixture-native-run:frame:1013:35",
      "borg-first-native-backed-fixture-native-run:frame:1014:35",
      "borg-first-native-backed-fixture-native-run:frame:1015:35",
      "borg-first-native-backed-fixture-native-run:frame:1016:35",
      "borg-first-native-backed-fixture-native-run:frame:1001:36",
      "borg-first-native-backed-fixture-native-run:frame:1002:36",
      "borg-first-native-backed-fixture-native-run:frame:1003:36",
      "borg-first-native-backed-fixture-native-run:frame:1004:36",
      "borg-first-native-backed-fixture-native-run:frame:1005:36",
      "borg-first-native-backed-fixture-native-run:frame:1006:36",
      "borg-first-native-backed-fixture-native-run:frame:1007:36",
      "borg-first-native-backed-fixture-native-run:frame:1008:36",
      "borg-first-native-backed-fixture-native-run:frame:1009:36",
      "borg-first-native-backed-fixture-native-run:frame:1010:36",
      "borg-first-native-backed-fixture-native-run:frame:1011:36",
      "borg-first-native-backed-fixture-native-run:frame:1012:36",
      "borg-first-native-backed-fixture-native-run:frame:1013:36",
      "borg-first-native-backed-fixture-native-run:frame:1014:36",
      "borg-first-native-backed-fixture-native-run:frame:1015:36",
      "borg-first-native-backed-fixture-native-run:frame:1016:36",
      "borg-first-native-backed-fixture-native-run:frame:1001:37",
      "borg-first-native-backed-fixture-native-run:frame:1002:37",
      "borg-first-native-backed-fixture-native-run:frame:1003:37",
      "borg-first-native-backed-fixture-native-run:frame:1004:37",
      "borg-first-native-backed-fixture-native-run:frame:1005:37",
      "borg-first-native-backed-fixture-native-run:frame:1006:37",
      "borg-first-native-backed-fixture-native-run:frame:1007:37",
      "borg-first-native-backed-fixture-native-run:frame:1008:37",
      "borg-first-native-backed-fixture-native-run:frame:1009:37",
      "borg-first-native-backed-fixture-native-run:frame:1010:37",
      "borg-first-native-backed-fixture-native-run:frame:1011:37",
      "borg-first-native-backed-fixture-native-run:frame:1012:37",
      "borg-first-native-backed-fixture-native-run:frame:1013:37",
      "borg-first-native-backed-fixture-native-run:frame:1014:37",
      "borg-first-native-backed-fixture-native-run:frame:1015:37",
      "borg-first-native-backed-fixture-native-run:frame:1016:37",
      "borg-first-native-backed-fixture-native-run:frame:1001:38",
      "borg-first-native-backed-fixture-native-run:frame:1002:38",
      "borg-first-native-backed-fixture-native-run:frame:1003:38",
      "borg-first-native-backed-fixture-native-run:frame:1004:38",
      "borg-first-native-backed-fixture-native-run:frame:1005:38",
      "borg-first-native-backed-fixture-native-run:frame:1006:38",
      "borg-first-native-backed-fixture-native-run:frame:1007:38",
      "borg-first-native-backed-fixture-native-run:frame:1008:38",
      "borg-first-native-backed-fixture-native-run:frame:1009:38",
      "borg-first-native-backed-fixture-native-run:frame:1010:38",
      "borg-first-native-backed-fixture-native-run:frame:1011:38",
      "borg-first-native-backed-fixture-native-run:frame:1012:38",
      "borg-first-native-backed-fixture-native-run:frame:1013:38",
      "borg-first-native-backed-fixture-native-run:frame:1014:38",
      "borg-first-native-backed-fixture-native-run:frame:1015:38",
      "borg-first-native-backed-fixture-native-run:frame:1016:38",
      "borg-first-native-backed-fixture-native-run:frame:1001:39",
      "borg-first-native-backed-fixture-native-run:frame:1002:39",
      "borg-first-native-backed-fixture-native-run:frame:1003:39",
      "borg-first-native-backed-fixture-native-run:frame:1004:39",
      "borg-first-native-backed-fixture-native-run:frame:1005:39",
      "borg-first-native-backed-fixture-native-run:frame:1006:39",
      "borg-first-native-backed-fixture-native-run:frame:1007:39",
      "borg-first-native-backed-fixture-native-run:frame:1008:39",
      "borg-first-native-backed-fixture-native-run:frame:1009:39",
      "borg-first-native-backed-fixture-native-run:frame:1010:39",
      "borg-first-native-backed-fixture-native-run:frame:1011:39",
      "borg-first-native-backed-fixture-native-run:frame:1012:39",
      "borg-first-native-backed-fixture-native-run:frame:1013:39",
      "borg-first-native-backed-fixture-native-run:frame:1014:39",
      "borg-first-native-backed-fixture-native-run:frame:1015:39",
      "borg-first-native-backed-fixture-native-run:frame:1016:39",
      "borg-first-native-backed-fixture-native-run:frame:1001:40",
      "borg-first-native-backed-fixture-native-run:frame:1002:40",
      "borg-first-native-backed-fixture-native-run:frame:1003:40",
      "borg-first-native-backed-fixture-native-run:frame:1004:40",
      "borg-first-native-backed-fixture-native-run:frame:1005:40",
      "borg-first-native-backed-fixture-native-run:frame:1006:40",
      "borg-first-native-backed-fixture-native-run:frame:1007:40",
      "borg-first-native-backed-fixture-native-run:frame:1008:40",
      "borg-first-native-backed-fixture-native-run:frame:1009:40",
      "borg-first-native-backed-fixture-native-run:frame:1010:40",
      "borg-first-native-backed-fixture-native-run:frame:1011:40",
      "borg-first-native-backed-fixture-native-run:frame:1012:40",
      "borg-first-native-backed-fixture-native-run:frame:1013:40",
      "borg-first-native-backed-fixture-native-run:frame:1014:40",
      "borg-first-native-backed-fixture-native-run:frame:1015:40",
      "borg-first-native-backed-fixture-native-run:frame:1016:40",
      "borg-first-native-backed-fixture-native-run:frame:1001:41",
      "borg-first-native-backed-fixture-native-run:frame:1002:41",
      "borg-first-native-backed-fixture-native-run:frame:1003:41",
      "borg-first-native-backed-fixture-native-run:frame:1004:41",
      "borg-first-native-backed-fixture-native-run:frame:1005:41",
      "borg-first-native-backed-fixture-native-run:frame:1006:41",
      "borg-first-native-backed-fixture-native-run:frame:1007:41",
      "borg-first-native-backed-fixture-native-run:frame:1008:41",
      "borg-first-native-backed-fixture-native-run:frame:1009:41",
      "borg-first-native-backed-fixture-native-run:frame:1010:41",
      "borg-first-native-backed-fixture-native-run:frame:1011:41",
      "borg-first-native-backed-fixture-native-run:frame:1012:41",
      "borg-first-native-backed-fixture-native-run:frame:1013:41",
      "borg-first-native-backed-fixture-native-run:frame:1014:41",
      "borg-first-native-backed-fixture-native-run:frame:1015:41",
      "borg-first-native-backed-fixture-native-run:frame:1016:41",
      "borg-first-native-backed-fixture-native-run:frame:1001:42",
      "borg-first-native-backed-fixture-native-run:frame:1002:42",
      "borg-first-native-backed-fixture-native-run:frame:1003:42",
      "borg-first-native-backed-fixture-native-run:frame:1004:42",
      "borg-first-native-backed-fixture-native-run:frame:1005:42",
      "borg-first-native-backed-fixture-native-run:frame:1006:42",
      "borg-first-native-backed-fixture-native-run:frame:1007:42",
      "borg-first-native-backed-fixture-native-run:frame:1008:42",
      "borg-first-native-backed-fixture-native-run:frame:1009:42",
      "borg-first-native-backed-fixture-native-run:frame:1010:42",
      "borg-first-native-backed-fixture-native-run:frame:1011:42",
      "borg-first-native-backed-fixture-native-run:frame:1012:42",
      "borg-first-native-backed-fixture-native-run:frame:1013:42",
      "borg-first-native-backed-fixture-native-run:frame:1014:42",
      "borg-first-native-backed-fixture-native-run:frame:1015:42",
      "borg-first-native-backed-fixture-native-run:frame:1016:42",
      "borg-first-native-backed-fixture-native-run:frame:1001:43",
      "borg-first-native-backed-fixture-native-run:frame:1002:43",
      "borg-first-native-backed-fixture-native-run:frame:1003:43",
      "borg-first-native-backed-fixture-native-run:frame:1004:43",
      "borg-first-native-backed-fixture-native-run:frame:1005:43",
      "borg-first-native-backed-fixture-native-run:frame:1006:43",
      "borg-first-native-backed-fixture-native-run:frame:1007:43",
      "borg-first-native-backed-fixture-native-run:frame:1008:43",
      "borg-first-native-backed-fixture-native-run:frame:1009:43",
      "borg-first-native-backed-fixture-native-run:frame:1010:43",
      "borg-first-native-backed-fixture-native-run:frame:1011:43",
      "borg-first-native-backed-fixture-native-run:frame:1012:43",
      "borg-first-native-backed-fixture-native-run:frame:1013:43",
      "borg-first-native-backed-fixture-native-run:frame:1014:43",
      "borg-first-native-backed-fixture-native-run:frame:1015:43",
      "borg-first-native-backed-fixture-native-run:frame:1016:43",
      "borg-first-native-backed-fixture-native-run:frame:1001:44",
      "borg-first-native-backed-fixture-native-run:frame:1002:44",
      "borg-first-native-backed-fixture-native-run:frame:1003:44",
      "borg-first-native-backed-fixture-native-run:frame:1004:44",
      "borg-first-native-backed-fixture-native-run:frame:1005:44",
      "borg-first-native-backed-fixture-native-run:frame:1006:44",
      "borg-first-native-backed-fixture-native-run:frame:1007:44",
      "borg-first-native-backed-fixture-native-run:frame:1008:44",
      "borg-first-native-backed-fixture-native-run:frame:1009:44",
      "borg-first-native-backed-fixture-native-run:frame:1010:44",
      "borg-first-native-backed-fixture-native-run:frame:1011:44",
      "borg-first-native-backed-fixture-native-run:frame:1012:44",
      "borg-first-native-backed-fixture-native-run:frame:1013:44",
      "borg-first-native-backed-fixture-native-run:frame:1014:44",
      "borg-first-native-backed-fixture-native-run:frame:1015:44",
      "borg-first-native-backed-fixture-native-run:frame:1016:44",
      "borg-first-native-backed-fixture-native-run:frame:1001:45",
      "borg-first-native-backed-fixture-native-run:frame:1002:45",
      "borg-first-native-backed-fixture-native-run:frame:1003:45",
      "borg-first-native-backed-fixture-native-run:frame:1004:45",
      "borg-first-native-backed-fixture-native-run:frame:1005:45",
      "borg-first-native-backed-fixture-native-run:frame:1006:45",
      "borg-first-native-backed-fixture-native-run:frame:1007:45",
      "borg-first-native-backed-fixture-native-run:frame:1008:45",
      "borg-first-native-backed-fixture-native-run:frame:1009:45",
      "borg-first-native-backed-fixture-native-run:frame:1010:45",
      "borg-first-native-backed-fixture-native-run:frame:1011:45",
      "borg-first-native-backed-fixture-native-run:frame:1012:45",
      "borg-first-native-backed-fixture-native-run:frame:1013:45",
      "borg-first-native-backed-fixture-native-run:frame:1014:45",
      "borg-first-native-backed-fixture-native-run:frame:1015:45",
      "borg-first-native-backed-fixture-native-run:frame:1016:45",
      "borg-first-native-backed-fixture-native-run:frame:1001:46",
      "borg-first-native-backed-fixture-native-run:frame:1002:46",
      "borg-first-native-backed-fixture-native-run:frame:1003:46",
      "borg-first-native-backed-fixture-native-run:frame:1004:46",
      "borg-first-native-backed-fixture-native-run:frame:1005:46",
      "borg-first-native-backed-fixture-native-run:frame:1006:46",
      "borg-first-native-backed-fixture-native-run:frame:1007:46",
      "borg-first-native-backed-fixture-native-run:frame:1008:46",
      "borg-first-native-backed-fixture-native-run:frame:1009:46",
      "borg-first-native-backed-fixture-native-run:frame:1010:46",
      "borg-first-native-backed-fixture-native-run:frame:1011:46",
      "borg-first-native-backed-fixture-native-run:frame:1012:46",
      "borg-first-native-backed-fixture-native-run:frame:1013:46",
      "borg-first-native-backed-fixture-native-run:frame:1014:46",
      "borg-first-native-backed-fixture-native-run:frame:1015:46",
      "borg-first-native-backed-fixture-native-run:frame:1016:46",
      "borg-first-native-backed-fixture-native-run:frame:1001:47",
      "borg-first-native-backed-fixture-native-run:frame:1002:47",
      "borg-first-native-backed-fixture-native-run:frame:1003:47",
      "borg-first-native-backed-fixture-native-run:frame:1004:47",
      "borg-first-native-backed-fixture-native-run:frame:1005:47",
      "borg-first-native-backed-fixture-native-run:frame:1006:47",
      "borg-first-native-backed-fixture-native-run:frame:1007:47",
      "borg-first-native-backed-fixture-native-run:frame:1008:47",
      "borg-first-native-backed-fixture-native-run:frame:1009:47",
      "borg-first-native-backed-fixture-native-run:frame:1010:47",
      "borg-first-native-backed-fixture-native-run:frame:1011:47",
      "borg-first-native-backed-fixture-native-run:frame:1012:47",
      "borg-first-native-backed-fixture-native-run:frame:1013:47",
      "borg-first-native-backed-fixture-native-run:frame:1014:47",
      "borg-first-native-backed-fixture-native-run:frame:1015:47",
      "borg-first-native-backed-fixture-native-run:frame:1016:47",
      "borg-first-native-backed-fixture-native-run:frame:1001:48",
      "borg-first-native-backed-fixture-native-run:frame:1002:48",
      "borg-first-native-backed-fixture-native-run:frame:1003:48",
      "borg-first-native-backed-fixture-native-run:frame:1004:48",
      "borg-first-native-backed-fixture-native-run:frame:1005:48",
      "borg-first-native-backed-fixture-native-run:frame:1006:48",
      "borg-first-native-backed-fixture-native-run:frame:1007:48",
      "borg-first-native-backed-fixture-native-run:frame:1008:48",
      "borg-first-native-backed-fixture-native-run:frame:1009:48",
      "borg-first-native-backed-fixture-native-run:frame:1010:48",
      "borg-first-native-backed-fixture-native-run:frame:1011:48",
      "borg-first-native-backed-fixture-native-run:frame:1012:48",
      "borg-first-native-backed-fixture-native-run:frame:1013:48",
      "borg-first-native-backed-fixture-native-run:frame:1014:48",
      "borg-first-native-backed-fixture-native-run:frame:1015:48",
      "borg-first-native-backed-fixture-native-run:frame:1016:48",
      "borg-first-native-backed-fixture-native-run:frame:1001:49",
      "borg-first-native-backed-fixture-native-run:frame:1002:49",
      "borg-first-native-backed-fixture-native-run:frame:1003:49",
      "borg-first-native-backed-fixture-native-run:frame:1004:49",
      "borg-first-native-backed-fixture-native-run:frame:1005:49",
      "borg-first-native-backed-fixture-native-run:frame:1006:49",
      "borg-first-native-backed-fixture-native-run:frame:1007:49",
      "borg-first-native-backed-fixture-native-run:frame:1008:49",
      "borg-first-native-backed-fixture-native-run:frame:1009:49",
      "borg-first-native-backed-fixture-native-run:frame:1010:49",
      "borg-first-native-backed-fixture-native-run:frame:1011:49",
      "borg-first-native-backed-fixture-native-run:frame:1012:49",
      "borg-first-native-backed-fixture-native-run:frame:1013:49",
      "borg-first-native-backed-fixture-native-run:frame:1014:49",
      "borg-first-native-backed-fixture-native-run:frame:1015:49",
      "borg-first-native-backed-fixture-native-run:frame:1016:49",
      "borg-first-native-backed-fixture-native-run:frame:1001:50",
      "borg-first-native-backed-fixture-native-run:frame:1002:50",
      "borg-first-native-backed-fixture-native-run:frame:1003:50",
      "borg-first-native-backed-fixture-native-run:frame:1004:50",
      "borg-first-native-backed-fixture-native-run:frame:1005:50",
      "borg-first-native-backed-fixture-native-run:frame:1006:50",
      "borg-first-native-backed-fixture-native-run:frame:1007:50",
      "borg-first-native-backed-fixture-native-run:frame:1008:50",
      "borg-first-native-backed-fixture-native-run:frame:1009:50",
      "borg-first-native-backed-fixture-native-run:frame:1010:50",
      "borg-first-native-backed-fixture-native-run:frame:1011:50",
      "borg-first-native-backed-fixture-native-run:frame:1012:50",
      "borg-first-native-backed-fixture-native-run:frame:1013:50",
      "borg-first-native-backed-fixture-native-run:frame:1014:50",
      "borg-first-native-backed-fixture-native-run:frame:1015:50",
      "borg-first-native-backed-fixture-native-run:frame:1016:50"
    ],
    "frameCount": 816,
    "nativeKeyframeCount": 51,
    "sampleInterval": 0.2,
    "playbackFrameSource": "native-keyframes",
    "interpolationAuthority": "display-only-between-native-keyframes",
    "interpolatedFrameCount": 0,
    "projectionStatus": "authoritative-solver-output"
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
      "rowCount": 800,
      "chunkCount": 50,
      "pathCount": 16,
      "byteLength": 76800,
      "timeRange": {
        "start": 0,
        "end": 10
      },
      "frameRange": {
        "start": 0,
        "end": 49
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
        "timeEnd": 10,
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
      "maxSpeed": 0.18916558625138807,
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
      "xMin": 3.2288639579167886,
      "xMax": 6.771136042083215,
      "xMinusCrossed": false,
      "xPlusCrossed": false,
      "crossingStatus": "path-bounds-stay-inside-outer-cube-long-fixture"
    },
    "faceBoundaryGapRows": [
      {
        "gapRowId": "borg-gap:face-crossing-coverage-missing",
        "pathId": null,
        "timeStart": 0,
        "timeEnd": 10,
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
        "timeEnd": 10,
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
        "timeEnd": 10,
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
        "timeEnd": 10,
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
      "frameCount": 816,
      "pathRowCount": 800,
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
    "fixtureProfileId": "borg-first-native-backed-long-fixture.v1",
    "nativeKeyframeCount": 51,
    "sampleInterval": 0.2,
    "playbackFrameSource": "native-keyframes",
    "initialLinePolicy": "non-collinear-curvature-visibility",
    "pairAccelerationScale": 0.55,
    "sourceClaimLevel": "developer-test"
  },
  "nativeSolverBoundary": {
    "productionSolver": "native-central-solver",
    "newSolverStatus": "forbidden",
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
      "diagnostics"
    ],
    "defaultHiddenLayers": [
      "path-history",
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
      "sideLength": 8,
      "bounds": {
        "x": [
          1,
          9
        ],
        "y": [
          1,
          9
        ],
        "z": [
          1,
          9
        ]
      },
      "center": {
        "x": 5,
        "y": 5,
        "z": 5
      },
      "valueAuthority": "app-facing-projection"
    },
    "outerComputedCube": {
      "visibleByDefault": false,
      "diagnosticOverlayOnly": true,
      "sourceField": "simulationEnvelope.sideLength",
      "sideLength": 10,
      "faceBufferMargin": 1,
      "valueAuthority": "app-facing-projection"
    },
    "architrinoPositions": {
      "visible": true,
      "sourceField": "currentStateAndFrameSources.currentStateFrameIds",
      "frameBufferIds": [
        "pair-interaction-frame-buffer"
      ],
      "frameCount": 816,
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
      "state": "off",
      "sourceFields": [
        "pathHistory.pathHistoryStreamIds",
        "pathHistory.pathReplayIndexIds"
      ],
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
        "value": 10,
        "valueAuthority": "authoritative-solver-output"
      },
      {
        "fieldId": "centralVolumeSideLength",
        "value": 8,
        "valueAuthority": "app-facing-projection"
      },
      {
        "fieldId": "faceBufferMargin",
        "value": 1,
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
        "value": 3,
        "valueAuthority": "authoritative-solver-output"
      },
      {
        "fieldId": "wakeHorizon",
        "value": 30,
        "valueAuthority": "app-facing-projection",
        "formulaId": "wakeHorizon=c_f*h"
      },
      {
        "fieldId": "centralVelocityBound",
        "value": 0.18916558625138807,
        "valueAuthority": "authoritative-solver-output"
      },
      {
        "fieldId": "centralObservationInterval",
        "value": 10,
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
    "family": "explicit",
    "seed": null,
    "electrinoCount": 8,
    "positrinoCount": 8,
    "polarityAssignmentSource": "explicit",
    "velocityPolicy": "explicit",
    "velocitySeed": null,
    "resolvedInitialStateId": "borg-first-native-backed-fixture-native-run:explicit-sixteen-initial-state",
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
        "timeEnd": 10,
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
        "timeEnd": 10,
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
        "timeEnd": 10,
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
        "timeEnd": 10,
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
        "timeEnd": 10,
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
      "end": 10
    },
    "frameRange": {
      "start": 0,
      "end": 49
    },
    "frameCount": 816,
    "nativeKeyframeCount": 51,
    "sampleInterval": 0.2,
    "playbackFrameSource": "native-keyframes",
    "pathRowCount": 800,
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
      "frameCount": 816,
      "pathRowCount": 800,
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
  "nextBuildBurden": "measure-browser-surface-budget-and-4k-render-capture"
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
    failures.push("native solver status is not native-backed-now");
  }
  if (manifest.sourceBridgeRun.executionPath !== "native_c_abi") {
    failures.push("native execution path is not native_c_abi");
  }
  if (manifest.currentStateFrames.length !== manifest.sourceBridgeRun.frameCount) {
    failures.push("current-state frame count mismatch");
  }
  if (manifest.simulationEnvelope.duration !== 10) {
    failures.push("long fixture duration is not 10 solver-time units");
  }
  if (manifest.simulationEnvelope.sampleInterval !== 0.2) {
    failures.push("long fixture sample interval is not 0.2");
  }
  if (manifest.currentStateAndFrameSources.nativeKeyframeCount < 51) {
    failures.push("native keyframe count is below the long fixture floor");
  }
  if (manifest.currentStateAndFrameSources.playbackFrameSource !== "native-keyframes") {
    failures.push("playback frame source is not native-keyframes");
  }
  if (manifest.currentStateAndFrameSources.interpolatedFrameCount !== 0) {
    failures.push("manifest records interpolated frame rows");
  }
  if (manifest.initialConditions.initialLinePolicy !== "non-collinear-curvature-visibility") {
    failures.push("curvature fixture initial line policy is missing");
  }
  if (
    !Number.isFinite(manifest.sourceBridgeRun.pairAccelerationScale) ||
    manifest.sourceBridgeRun.pairAccelerationScale <= 0
  ) {
    failures.push("curvature fixture pair action scale is not positive");
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

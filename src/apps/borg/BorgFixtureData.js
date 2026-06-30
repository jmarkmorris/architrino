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
    "frameCount": 102,
    "nativeKeyframeCount": 51,
    "sampleInterval": 0.2,
    "playbackFrameSource": "native-keyframes",
    "interpolationAuthority": "display-only-between-native-keyframes",
    "pathCount": 2,
    "pathRowCount": 100,
    "chunkCount": 7,
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
    "centralVelocityBound": 0.2800000056,
    "centralObservationInterval": 10,
    "centralBoundaryTolerance": 0.001,
    "strictCentralBufferStatus": "failed"
  },
  "population": {
    "centralArchitrinoCount": 1,
    "architrinoCount": 2,
    "bufferArchitrinoCount": 1,
    "centralNumberDensity": 0.001953125,
    "countDerivation": {
      "formulaId": "N_calc=ceil(N_C*(1+2*b_face/L_C)^3)",
      "centralArchitrinoCount": 1,
      "centralVolumeSideLength": 8,
      "faceBufferMargin": 1,
      "exactPreCeiling": 1.953125,
      "roundedValue": 2
    }
  },
  "initialConditions": {
    "initialConditionFamily": "explicit",
    "initialConditionSeed": null,
    "electrinoCount": 1,
    "positrinoCount": 1,
    "polarityAssignmentSource": "explicit",
    "velocityPolicy": "explicit",
    "velocitySeed": null,
    "resolvedInitialStateId": "borg-first-native-backed-fixture-native-run:explicit-pair-initial-state",
    "customEditStatus": "accepted",
    "integrationWeightAuthority": "legacy-bridge-numeric-weight-only"
  },
  "currentStateFrames": [
    {
      "pathKey": 1001,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 4.3,
        "y": 5,
        "z": 5
      },
      "velocity": {
        "x": 0,
        "y": 0.28,
        "z": 0
      },
      "errorBound": 0,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 5.7,
        "y": 5,
        "z": 5
      },
      "velocity": {
        "x": 0,
        "y": -0.28,
        "z": 0
      },
      "errorBound": 0,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 1,
      "time": 0.2,
      "position": {
        "x": 4.3000112,
        "y": 5.056,
        "z": 5
      },
      "velocity": {
        "x": 0.00005600000000000002,
        "y": 0.28,
        "z": 0
      },
      "errorBound": 1e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 1,
      "time": 0.2,
      "position": {
        "x": 5.6999888,
        "y": 4.944,
        "z": 5
      },
      "velocity": {
        "x": -0.00005600000000000002,
        "y": -0.28,
        "z": 0
      },
      "errorBound": 1e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 2,
      "time": 0.4,
      "position": {
        "x": 4.3000335998208,
        "y": 5.111999104,
        "z": 5
      },
      "velocity": {
        "x": 0.00011199910400000001,
        "y": 0.27999552000000005,
        "z": 0
      },
      "errorBound": 2e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 2,
      "time": 0.4,
      "position": {
        "x": 5.6999664001792,
        "y": 4.888000896,
        "z": 5
      },
      "velocity": {
        "x": -0.00011199910400000001,
        "y": -0.27999552000000005,
        "z": 0
      },
      "errorBound": 2e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 3,
      "time": 0.6000000000000001,
      "position": {
        "x": 4.300067199104003,
        "y": 5.1679964160143355,
        "z": 5
      },
      "velocity": {
        "x": 0.00016799641601433603,
        "y": 0.27998656007168005,
        "z": 0
      },
      "errorBound": 3e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 3,
      "time": 0.6000000000000001,
      "position": {
        "x": 5.699932800895997,
        "y": 4.8320035839856645,
        "z": 5
      },
      "velocity": {
        "x": -0.00016799641601433603,
        "y": -0.27998656007168005,
        "z": 0
      },
      "errorBound": 3e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 4,
      "time": 0.8,
      "position": {
        "x": 4.30011199731202,
        "y": 5.223991040086015,
        "z": 5
      },
      "velocity": {
        "x": 0.00022399104008601577,
        "y": 0.2799731203583989,
        "z": 0
      },
      "errorBound": 4e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 4,
      "time": 0.8,
      "position": {
        "x": 5.69988800268798,
        "y": 4.776008959913985,
        "z": 5
      },
      "velocity": {
        "x": -0.00022399104008601577,
        "y": -0.2799731203583989,
        "z": 0
      },
      "errorBound": 4e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 5,
      "time": 1,
      "position": {
        "x": 4.30016799372808,
        "y": 5.279982080301053,
        "z": 5
      },
      "velocity": {
        "x": 0.0002799820803010542,
        "y": 0.279955201075192,
        "z": 0
      },
      "errorBound": 4.9999999999999995e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 5,
      "time": 1,
      "position": {
        "x": 5.69983200627192,
        "y": 4.720017919698947,
        "z": 5
      },
      "velocity": {
        "x": -0.0002799820803010542,
        "y": -0.279955201075192,
        "z": 0
      },
      "errorBound": 4.9999999999999995e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 6,
      "time": 1.2,
      "position": {
        "x": 4.300235187456241,
        "y": 5.335968640802807,
        "z": 5
      },
      "velocity": {
        "x": 0.00033596864080280775,
        "y": 0.2799328025087679,
        "z": 0
      },
      "errorBound": 6e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 6,
      "time": 1.2,
      "position": {
        "x": 5.699764812543759,
        "y": 4.664031359197193,
        "z": 5
      },
      "velocity": {
        "x": -0.00033596864080280775,
        "y": -0.2799328025087679,
        "z": 0
      },
      "errorBound": 6e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 7,
      "time": 1.4,
      "position": {
        "x": 4.300313577421401,
        "y": 5.391949825806307,
        "z": 5
      },
      "velocity": {
        "x": 0.0003919498258063085,
        "y": 0.27990592501750367,
        "z": 0
      },
      "errorBound": 6.999999999999999e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 7,
      "time": 1.4,
      "position": {
        "x": 5.699686422578599,
        "y": 4.608050174193693,
        "z": 5
      },
      "velocity": {
        "x": -0.0003919498258063085,
        "y": -0.27990592501750367,
        "z": 0
      },
      "errorBound": 6.999999999999999e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 8,
      "time": 1.5999999999999999,
      "position": {
        "x": 4.3004031623693235,
        "y": 5.447924739612595,
        "z": 5
      },
      "velocity": {
        "x": 0.00044792473961259636,
        "y": 0.27987456903143915,
        "z": 0
      },
      "errorBound": 8e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 8,
      "time": 1.5999999999999999,
      "position": {
        "x": 5.6995968376306765,
        "y": 4.552075260387405,
        "z": 5
      },
      "velocity": {
        "x": -0.00044792473961259636,
        "y": -0.27987456903143915,
        "z": 0
      },
      "errorBound": 8e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 9,
      "time": 1.7999999999999998,
      "position": {
        "x": 4.3005039408666486,
        "y": 5.503892486623049,
        "z": 5
      },
      "velocity": {
        "x": 0.0005038924866230505,
        "y": 0.27983873505227014,
        "z": 0
      },
      "errorBound": 9e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 9,
      "time": 1.7999999999999998,
      "position": {
        "x": 5.6994960591333514,
        "y": 4.496107513376951,
        "z": 5
      },
      "velocity": {
        "x": -0.0005038924866230505,
        "y": -0.27983873505227014,
        "z": 0
      },
      "errorBound": 9e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 10,
      "time": 1.9999999999999998,
      "position": {
        "x": 4.30061591130092,
        "y": 5.559852171353717,
        "z": 5
      },
      "velocity": {
        "x": 0.0005598521713537185,
        "y": 0.2797984236533403,
        "z": 0
      },
      "errorBound": 9.999999999999999e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 10,
      "time": 1.9999999999999998,
      "position": {
        "x": 5.69938408869908,
        "y": 4.440147828646283,
        "z": 5
      },
      "velocity": {
        "x": -0.0005598521713537185,
        "y": -0.2797984236533403,
        "z": 0
      },
      "errorBound": 9.999999999999999e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 11,
      "time": 2.1999999999999997,
      "position": {
        "x": 4.30073907188061,
        "y": 5.615802898449644,
        "z": 5
      },
      "velocity": {
        "x": 0.0006158028984496449,
        "y": 0.279753635479632,
        "z": 0
      },
      "errorBound": 1.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 11,
      "time": 2.1999999999999997,
      "position": {
        "x": 5.69926092811939,
        "y": 4.384197101550356,
        "z": 5
      },
      "velocity": {
        "x": -0.0006158028984496449,
        "y": -0.279753635479632,
        "z": 0
      },
      "errorBound": 1.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 12,
      "time": 2.4,
      "position": {
        "x": 4.30087342063515,
        "y": 5.6717437726991955,
        "z": 5
      },
      "velocity": {
        "x": 0.0006717437726991961,
        "y": 0.27970437124775605,
        "z": 0
      },
      "errorBound": 1.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 12,
      "time": 2.4,
      "position": {
        "x": 5.69912657936485,
        "y": 4.3282562273008045,
        "z": 5
      },
      "velocity": {
        "x": -0.0006717437726991961,
        "y": -0.27970437124775605,
        "z": 0
      },
      "errorBound": 1.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 13,
      "time": 2.6,
      "position": {
        "x": 4.30101895541496,
        "y": 5.7276738990483835,
        "z": 5
      },
      "velocity": {
        "x": 0.0007276738990483842,
        "y": 0.2796506317459401,
        "z": 0
      },
      "errorBound": 1.3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 13,
      "time": 2.6,
      "position": {
        "x": 5.69898104458504,
        "y": 4.2723261009516165,
        "z": 5
      },
      "velocity": {
        "x": -0.0007276738990483842,
        "y": -0.2796506317459401,
        "z": 0
      },
      "errorBound": 1.3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 14,
      "time": 2.8000000000000003,
      "position": {
        "x": 4.301175673891483,
        "y": 5.783592382615187,
        "z": 5
      },
      "velocity": {
        "x": 0.0007835923826151875,
        "y": 0.2795924178340163,
        "z": 0
      },
      "errorBound": 1.3999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 14,
      "time": 2.8000000000000003,
      "position": {
        "x": 5.698824326108517,
        "y": 4.216407617384813,
        "z": 5
      },
      "velocity": {
        "x": -0.0007835923826151875,
        "y": -0.2795924178340163,
        "z": 0
      },
      "errorBound": 1.3999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 15,
      "time": 3.0000000000000004,
      "position": {
        "x": 4.301343573557223,
        "y": 5.839498328703868,
        "z": 5
      },
      "velocity": {
        "x": 0.000839498328703869,
        "y": 0.27952973044340707,
        "z": 0
      },
      "errorBound": 1.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 15,
      "time": 3.0000000000000004,
      "position": {
        "x": 5.698656426442777,
        "y": 4.160501671296132,
        "z": 5
      },
      "velocity": {
        "x": -0.000839498328703869,
        "y": -0.27952973044340707,
        "z": 0
      },
      "errorBound": 1.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 16,
      "time": 3.2000000000000006,
      "position": {
        "x": 4.301522651725787,
        "y": 5.895390842819291,
        "z": 5
      },
      "velocity": {
        "x": 0.0008953908428192912,
        "y": 0.27946257057711077,
        "z": 0
      },
      "errorBound": 1.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 16,
      "time": 3.2000000000000006,
      "position": {
        "x": 5.698477348274213,
        "y": 4.104609157180709,
        "z": 5
      },
      "velocity": {
        "x": -0.0008953908428192912,
        "y": -0.27946257057711077,
        "z": 0
      },
      "errorBound": 1.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 17,
      "time": 3.400000000000001,
      "position": {
        "x": 4.301712905531923,
        "y": 5.951269030681228,
        "z": 5
      },
      "velocity": {
        "x": 0.0009512690306812282,
        "y": 0.2793909393096852,
        "z": 0
      },
      "errorBound": 1.6999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 17,
      "time": 3.400000000000001,
      "position": {
        "x": 5.698287094468077,
        "y": 4.048730969318772,
        "z": 5
      },
      "velocity": {
        "x": -0.0009512690306812282,
        "y": -0.2793909393096852,
        "z": 0
      },
      "errorBound": 1.6999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 18,
      "time": 3.600000000000001,
      "position": {
        "x": 4.301914331931571,
        "y": 6.007131998238674,
        "z": 5
      },
      "velocity": {
        "x": 0.0010071319982386743,
        "y": 0.2793148377872307,
        "z": 0
      },
      "errorBound": 1.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 18,
      "time": 3.600000000000001,
      "position": {
        "x": 5.698085668068429,
        "y": 3.992868001761326,
        "z": 5
      },
      "velocity": {
        "x": -0.0010071319982386743,
        "y": -0.2793148377872307,
        "z": 0
      },
      "errorBound": 1.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 19,
      "time": 3.800000000000001,
      "position": {
        "x": 4.302126927701908,
        "y": 6.062978851684148,
        "z": 5
      },
      "velocity": {
        "x": 0.0010629788516841488,
        "y": 0.2792342672273716,
        "z": 0
      },
      "errorBound": 1.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 19,
      "time": 3.800000000000001,
      "position": {
        "x": 5.697873072298092,
        "y": 3.9370211483158513,
        "z": 5
      },
      "velocity": {
        "x": -0.0010629788516841488,
        "y": -0.2792342672273716,
        "z": 0
      },
      "errorBound": 1.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 20,
      "time": 4.000000000000001,
      "position": {
        "x": 4.302350689441401,
        "y": 6.118808697467996,
        "z": 5
      },
      "velocity": {
        "x": 0.0011188086974679961,
        "y": 0.2791492289192369,
        "z": 0
      },
      "errorBound": 1.9999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 20,
      "time": 4.000000000000001,
      "position": {
        "x": 5.697649310558599,
        "y": 3.881191302532004,
        "z": 5
      },
      "velocity": {
        "x": -0.0011188086974679961,
        "y": -0.2791492289192369,
        "z": 0
      },
      "errorBound": 1.9999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 21,
      "time": 4.200000000000001,
      "position": {
        "x": 4.302585613569864,
        "y": 6.174620642312684,
        "z": 5
      },
      "velocity": {
        "x": 0.001174620642312684,
        "y": 0.27905972422343944,
        "z": 0
      },
      "errorBound": 2.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 21,
      "time": 4.200000000000001,
      "position": {
        "x": 5.697414386430136,
        "y": 3.825379357687316,
        "z": 5
      },
      "velocity": {
        "x": -0.001174620642312684,
        "y": -0.27905972422343944,
        "z": 0
      },
      "errorBound": 2.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 22,
      "time": 4.400000000000001,
      "position": {
        "x": 4.302831696328509,
        "y": 6.230413793227095,
        "z": 5
      },
      "velocity": {
        "x": 0.001230413793227095,
        "y": 0.2789657545720544,
        "z": 0
      },
      "errorBound": 2.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 22,
      "time": 4.400000000000001,
      "position": {
        "x": 5.697168303671491,
        "y": 3.7695862067729053,
        "z": 5
      },
      "velocity": {
        "x": -0.001230413793227095,
        "y": -0.2789657545720544,
        "z": 0
      },
      "errorBound": 2.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 23,
      "time": 4.600000000000001,
      "position": {
        "x": 4.303088933780013,
        "y": 6.286187257520814,
        "z": 5
      },
      "velocity": {
        "x": 0.0012861872575208144,
        "y": 0.2788673214685962,
        "z": 0
      },
      "errorBound": 2.2999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 23,
      "time": 4.600000000000001,
      "position": {
        "x": 5.696911066219987,
        "y": 3.713812742479186,
        "z": 5
      },
      "velocity": {
        "x": -0.0012861872575208144,
        "y": -0.2788673214685962,
        "z": 0
      },
      "errorBound": 2.2999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 24,
      "time": 4.800000000000002,
      "position": {
        "x": 4.303357321808577,
        "y": 6.341940142818413,
        "z": 5
      },
      "velocity": {
        "x": 0.0013419401428184134,
        "y": 0.27876442648799454,
        "z": 0
      },
      "errorBound": 2.4e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 24,
      "time": 4.800000000000002,
      "position": {
        "x": 5.696642678191423,
        "y": 3.658059857181587,
        "z": 5
      },
      "velocity": {
        "x": -0.0013419401428184134,
        "y": -0.27876442648799454,
        "z": 0
      },
      "errorBound": 2.4e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 25,
      "time": 5.000000000000002,
      "position": {
        "x": 4.303636856119992,
        "y": 6.3976715570737275,
        "z": 5
      },
      "velocity": {
        "x": 0.0013976715570737273,
        "y": 0.2786570712765691,
        "z": 0
      },
      "errorBound": 2.4999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 25,
      "time": 5.000000000000002,
      "position": {
        "x": 5.696363143880008,
        "y": 3.6023284429262734,
        "z": 5
      },
      "velocity": {
        "x": -0.0013976715570737273,
        "y": -0.2786570712765691,
        "z": 0
      },
      "errorBound": 2.4999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 26,
      "time": 5.200000000000002,
      "position": {
        "x": 4.303927532241708,
        "y": 6.453380608584128,
        "z": 5
      },
      "velocity": {
        "x": 0.001453380608584128,
        "y": 0.27854525755200316,
        "z": 0
      },
      "errorBound": 2.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 26,
      "time": 5.200000000000002,
      "position": {
        "x": 5.696072467758292,
        "y": 3.546619391415873,
        "z": 5
      },
      "velocity": {
        "x": -0.001453380608584128,
        "y": -0.27854525755200316,
        "z": 0
      },
      "errorBound": 2.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 27,
      "time": 5.400000000000002,
      "position": {
        "x": 4.304229345522909,
        "y": 6.509066406004791,
        "z": 5
      },
      "velocity": {
        "x": 0.0015090664060047913,
        "y": 0.2784289871033164,
        "z": 0
      },
      "errorBound": 2.7e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 27,
      "time": 5.400000000000002,
      "position": {
        "x": 5.695770654477091,
        "y": 3.4909335939952095,
        "z": 5
      },
      "velocity": {
        "x": -0.0015090664060047913,
        "y": -0.2784289871033164,
        "z": 0
      },
      "errorBound": 2.7e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 28,
      "time": 5.600000000000002,
      "position": {
        "x": 4.304542291134582,
        "y": 6.564728058362959,
        "z": 5
      },
      "velocity": {
        "x": 0.0015647280583629586,
        "y": 0.27830826179083606,
        "z": 0
      },
      "errorBound": 2.7999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 28,
      "time": 5.600000000000002,
      "position": {
        "x": 5.695457708865418,
        "y": 3.4352719416370423,
        "z": 5
      },
      "velocity": {
        "x": -0.0015647280583629586,
        "y": -0.27830826179083606,
        "z": 0
      },
      "errorBound": 2.7999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 29,
      "time": 5.8000000000000025,
      "position": {
        "x": 4.304866364069596,
        "y": 6.620364675072192,
        "z": 5
      },
      "velocity": {
        "x": 0.0016203646750721922,
        "y": 0.27818308354616705,
        "z": 0
      },
      "errorBound": 2.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 29,
      "time": 5.8000000000000025,
      "position": {
        "x": 5.695133635930404,
        "y": 3.379635324927809,
        "z": 5
      },
      "velocity": {
        "x": -0.0016203646750721922,
        "y": -0.27818308354616705,
        "z": 0
      },
      "errorBound": 2.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 30,
      "time": 6.000000000000003,
      "position": {
        "x": 4.305201559142786,
        "y": 6.675975365946624,
        "z": 5
      },
      "velocity": {
        "x": 0.0016759753659466245,
        "y": 0.2780534543721613,
        "z": 0
      },
      "errorBound": 3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 30,
      "time": 6.000000000000003,
      "position": {
        "x": 5.694798440857214,
        "y": 3.3240246340533766,
        "z": 5
      },
      "velocity": {
        "x": -0.0016759753659466245,
        "y": -0.2780534543721613,
        "z": 0
      },
      "errorBound": 3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 31,
      "time": 6.200000000000003,
      "position": {
        "x": 4.305547870991028,
        "y": 6.731559241215201,
        "z": 5
      },
      "velocity": {
        "x": 0.0017315592412152016,
        "y": 0.27791937634288555,
        "z": 0
      },
      "errorBound": 3.0999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 31,
      "time": 6.200000000000003,
      "position": {
        "x": 5.694452129008972,
        "y": 3.2684407587847994,
        "z": 5
      },
      "velocity": {
        "x": -0.0017315592412152016,
        "y": -0.27791937634288555,
        "z": 0
      },
      "errorBound": 3.0999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 32,
      "time": 6.400000000000003,
      "position": {
        "x": 4.3059052940733356,
        "y": 6.787115411535919,
        "z": 5
      },
      "velocity": {
        "x": 0.0017871154115359194,
        "y": 0.27778085160358834,
        "z": 0
      },
      "errorBound": 3.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 32,
      "time": 6.400000000000003,
      "position": {
        "x": 5.6940947059266644,
        "y": 3.2128845884640818,
        "z": 5
      },
      "velocity": {
        "x": -0.0017871154115359194,
        "y": -0.27778085160358834,
        "z": 0
      },
      "errorBound": 3.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 33,
      "time": 6.600000000000003,
      "position": {
        "x": 4.306273822670938,
        "y": 6.842642988010052,
        "z": 5
      },
      "velocity": {
        "x": 0.0018426429880100527,
        "y": 0.27763788237066545,
        "z": 0
      },
      "errorBound": 3.3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 33,
      "time": 6.600000000000003,
      "position": {
        "x": 5.693726177329062,
        "y": 3.157357011989949,
        "z": 5
      },
      "velocity": {
        "x": -0.0018426429880100527,
        "y": -0.27763788237066545,
        "z": 0
      },
      "errorBound": 3.3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 34,
      "time": 6.800000000000003,
      "position": {
        "x": 4.306653450887377,
        "y": 6.898141082196377,
        "z": 5
      },
      "velocity": {
        "x": 0.0018981410821963776,
        "y": 0.27749047093162466,
        "z": 0
      },
      "errorBound": 3.3999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 34,
      "time": 6.800000000000003,
      "position": {
        "x": 5.693346549112623,
        "y": 3.1018589178036238,
        "z": 5
      },
      "velocity": {
        "x": -0.0018981410821963776,
        "y": -0.27749047093162466,
        "z": 0
      },
      "errorBound": 3.3999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 35,
      "time": 7.0000000000000036,
      "position": {
        "x": 4.307044172648602,
        "y": 6.953608806125387,
        "z": 5
      },
      "velocity": {
        "x": 0.0019536088061253877,
        "y": 0.27733861964504897,
        "z": 0
      },
      "errorBound": 3.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 35,
      "time": 7.0000000000000036,
      "position": {
        "x": 5.692955827351398,
        "y": 3.046391193874614,
        "z": 5
      },
      "velocity": {
        "x": -0.0019536088061253877,
        "y": -0.27733861964504897,
        "z": 0
      },
      "errorBound": 3.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 36,
      "time": 7.200000000000004,
      "position": {
        "x": 4.307445981703065,
        "y": 7.009045272313498,
        "z": 5
      },
      "velocity": {
        "x": 0.0020090452723134995,
        "y": 0.27718233094055894,
        "z": 0
      },
      "errorBound": 3.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 36,
      "time": 7.200000000000004,
      "position": {
        "x": 5.692554018296935,
        "y": 2.990954727686502,
        "z": 5
      },
      "velocity": {
        "x": -0.0020090452723134995,
        "y": -0.27718233094055894,
        "z": 0
      },
      "errorBound": 3.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 37,
      "time": 7.400000000000004,
      "position": {
        "x": 4.3078588716218205,
        "y": 7.064449593777253,
        "z": 5
      },
      "velocity": {
        "x": 0.0020644495937772542,
        "y": 0.27702160731877384,
        "z": 0
      },
      "errorBound": 3.6999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 37,
      "time": 7.400000000000004,
      "position": {
        "x": 5.6921411283781795,
        "y": 2.935550406222747,
        "z": 5
      },
      "velocity": {
        "x": -0.0020644495937772542,
        "y": -0.27702160731877384,
        "z": 0
      },
      "errorBound": 3.6999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 38,
      "time": 7.600000000000004,
      "position": {
        "x": 4.30828283579863,
        "y": 7.119820884047507,
        "z": 5
      },
      "velocity": {
        "x": 0.0021198208840475085,
        "y": 0.2768564513512717,
        "z": 0
      },
      "errorBound": 3.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 38,
      "time": 7.600000000000004,
      "position": {
        "x": 5.69171716420137,
        "y": 2.8801791159524925,
        "z": 5
      },
      "velocity": {
        "x": -0.0021198208840475085,
        "y": -0.2768564513512717,
        "z": 0
      },
      "errorBound": 3.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 39,
      "time": 7.800000000000004,
      "position": {
        "x": 4.308717867450066,
        "y": 7.175158257183616,
        "z": 5
      },
      "velocity": {
        "x": 0.002175158257183618,
        "y": 0.2766868656805479,
        "z": 0
      },
      "errorBound": 3.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 39,
      "time": 7.800000000000004,
      "position": {
        "x": 5.691282132549934,
        "y": 2.824841742816383,
        "z": 5
      },
      "velocity": {
        "x": -0.002175158257183618,
        "y": -0.2766868656805479,
        "z": 0
      },
      "errorBound": 3.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 40,
      "time": 8.000000000000004,
      "position": {
        "x": 4.309163959615623,
        "y": 7.230460827787611,
        "z": 5
      },
      "velocity": {
        "x": 0.002230460827787613,
        "y": 0.2765128530199732,
        "z": 0
      },
      "errorBound": 3.9999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 40,
      "time": 8.000000000000004,
      "position": {
        "x": 5.690836040384377,
        "y": 2.7695391722123883,
        "z": 5
      },
      "velocity": {
        "x": -0.002230460827787613,
        "y": -0.2765128530199732,
        "z": 0
      },
      "errorBound": 3.9999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 41,
      "time": 8.200000000000003,
      "position": {
        "x": 4.309621105157827,
        "y": 7.28572771101836,
        "z": 5
      },
      "velocity": {
        "x": 0.0022857277110183627,
        "y": 0.2763344161537502,
        "z": 0
      },
      "errorBound": 4.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 41,
      "time": 8.200000000000003,
      "position": {
        "x": 5.690378894842173,
        "y": 2.7142722889816384,
        "z": 5
      },
      "velocity": {
        "x": -0.0022857277110183627,
        "y": -0.2763344161537502,
        "z": 0
      },
      "errorBound": 4.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 42,
      "time": 8.400000000000002,
      "position": {
        "x": 4.3100892967623485,
        "y": 7.340958022605734,
        "z": 5
      },
      "velocity": {
        "x": 0.0023409580226057365,
        "y": 0.27615155793686874,
        "z": 0
      },
      "errorBound": 4.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 42,
      "time": 8.400000000000002,
      "position": {
        "x": 5.6899107032376515,
        "y": 2.659041977394265,
        "z": 5
      },
      "velocity": {
        "x": -0.0023409580226057365,
        "y": -0.27615155793686874,
        "z": 0
      },
      "errorBound": 4.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 43,
      "time": 8.600000000000001,
      "position": {
        "x": 4.3105685269381215,
        "y": 7.396150878864746,
        "z": 5
      },
      "velocity": {
        "x": 0.0023961508788647484,
        "y": 0.2759642812950603,
        "z": 0
      },
      "errorBound": 4.2999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 43,
      "time": 8.600000000000001,
      "position": {
        "x": 5.6894314730618785,
        "y": 2.603849121135253,
        "z": 5
      },
      "velocity": {
        "x": -0.0023961508788647484,
        "y": -0.2759642812950603,
        "z": 0
      },
      "errorBound": 4.2999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 44,
      "time": 8.8,
      "position": {
        "x": 4.311058788017464,
        "y": 7.451305396709696,
        "z": 5
      },
      "velocity": {
        "x": 0.0024513053967096985,
        "y": 0.2757725892247511,
        "z": 0
      },
      "errorBound": 4.4e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 44,
      "time": 8.8,
      "position": {
        "x": 5.688941211982536,
        "y": 2.548694603290303,
        "z": 5
      },
      "velocity": {
        "x": -0.0024513053967096985,
        "y": -0.2757725892247511,
        "z": 0
      },
      "errorBound": 4.4e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 45,
      "time": 9,
      "position": {
        "x": 4.3115600721561975,
        "y": 7.506420693668298,
        "z": 5
      },
      "velocity": {
        "x": 0.0025064206936683013,
        "y": 0.27557648479301433,
        "z": 0
      },
      "errorBound": 4.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 45,
      "time": 9,
      "position": {
        "x": 5.6884399278438025,
        "y": 2.4935793063317,
        "z": 5
      },
      "velocity": {
        "x": -0.0025064206936683013,
        "y": -0.27557648479301433,
        "z": 0
      },
      "errorBound": 4.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 46,
      "time": 9.2,
      "position": {
        "x": 4.312072371333777,
        "y": 7.561495887895802,
        "z": 5
      },
      "velocity": {
        "x": 0.002561495887895805,
        "y": 0.2753759711375209,
        "z": 0
      },
      "errorBound": 4.5999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 46,
      "time": 9.2,
      "position": {
        "x": 5.687927628666223,
        "y": 2.438504112104196,
        "z": 5
      },
      "velocity": {
        "x": -0.002561495887895805,
        "y": -0.2753759711375209,
        "z": 0
      },
      "errorBound": 4.5999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 47,
      "time": 9.399999999999999,
      "position": {
        "x": 4.312595677353414,
        "y": 7.6165300981890995,
        "z": 5
      },
      "velocity": {
        "x": 0.002616530098189103,
        "y": 0.27517105146648924,
        "z": 0
      },
      "errorBound": 4.699999999999999e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 47,
      "time": 9.399999999999999,
      "position": {
        "x": 5.687404322646586,
        "y": 2.3834699018108987,
        "z": 5
      },
      "velocity": {
        "x": -0.002616530098189103,
        "y": -0.27517105146648924,
        "z": 0
      },
      "errorBound": 4.699999999999999e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 48,
      "time": 9.599999999999998,
      "position": {
        "x": 4.313129981842215,
        "y": 7.671522444000826,
        "z": 5
      },
      "velocity": {
        "x": 0.0026715224440008296,
        "y": 0.2749617290586341,
        "z": 0
      },
      "errorBound": 4.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 48,
      "time": 9.599999999999998,
      "position": {
        "x": 5.686870018157785,
        "y": 2.328477555999172,
        "z": 5
      },
      "velocity": {
        "x": -0.0026715224440008296,
        "y": -0.2749617290586341,
        "z": 0
      },
      "errorBound": 4.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 49,
      "time": 9.799999999999997,
      "position": {
        "x": 4.313675276251305,
        "y": 7.726472045453448,
        "z": 5
      },
      "velocity": {
        "x": 0.0027264720454534524,
        "y": 0.27474800726311405,
        "z": 0
      },
      "errorBound": 4.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 49,
      "time": 9.799999999999997,
      "position": {
        "x": 5.686324723748695,
        "y": 2.2735279545465494,
        "z": 5
      },
      "velocity": {
        "x": -0.0027264720454534524,
        "y": -0.27474800726311405,
        "z": 0
      },
      "errorBound": 4.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 50,
      "time": 10,
      "position": {
        "x": 4.314231551855976,
        "y": 7.781378023353344,
        "z": 5
      },
      "velocity": {
        "x": 0.002781378023353349,
        "y": 0.27452988949947776,
        "z": 0
      },
      "errorBound": 4.999999999999999e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 50,
      "time": 10,
      "position": {
        "x": 5.685768448144024,
        "y": 2.218621976646653,
        "z": 5
      },
      "velocity": {
        "x": -0.002781378023353349,
        "y": -0.27452988949947776,
        "z": 0
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
      "borg-first-native-backed-fixture-native-run:frame:1001:1",
      "borg-first-native-backed-fixture-native-run:frame:1002:1",
      "borg-first-native-backed-fixture-native-run:frame:1001:2",
      "borg-first-native-backed-fixture-native-run:frame:1002:2",
      "borg-first-native-backed-fixture-native-run:frame:1001:3",
      "borg-first-native-backed-fixture-native-run:frame:1002:3",
      "borg-first-native-backed-fixture-native-run:frame:1001:4",
      "borg-first-native-backed-fixture-native-run:frame:1002:4",
      "borg-first-native-backed-fixture-native-run:frame:1001:5",
      "borg-first-native-backed-fixture-native-run:frame:1002:5",
      "borg-first-native-backed-fixture-native-run:frame:1001:6",
      "borg-first-native-backed-fixture-native-run:frame:1002:6",
      "borg-first-native-backed-fixture-native-run:frame:1001:7",
      "borg-first-native-backed-fixture-native-run:frame:1002:7",
      "borg-first-native-backed-fixture-native-run:frame:1001:8",
      "borg-first-native-backed-fixture-native-run:frame:1002:8",
      "borg-first-native-backed-fixture-native-run:frame:1001:9",
      "borg-first-native-backed-fixture-native-run:frame:1002:9",
      "borg-first-native-backed-fixture-native-run:frame:1001:10",
      "borg-first-native-backed-fixture-native-run:frame:1002:10",
      "borg-first-native-backed-fixture-native-run:frame:1001:11",
      "borg-first-native-backed-fixture-native-run:frame:1002:11",
      "borg-first-native-backed-fixture-native-run:frame:1001:12",
      "borg-first-native-backed-fixture-native-run:frame:1002:12",
      "borg-first-native-backed-fixture-native-run:frame:1001:13",
      "borg-first-native-backed-fixture-native-run:frame:1002:13",
      "borg-first-native-backed-fixture-native-run:frame:1001:14",
      "borg-first-native-backed-fixture-native-run:frame:1002:14",
      "borg-first-native-backed-fixture-native-run:frame:1001:15",
      "borg-first-native-backed-fixture-native-run:frame:1002:15",
      "borg-first-native-backed-fixture-native-run:frame:1001:16",
      "borg-first-native-backed-fixture-native-run:frame:1002:16",
      "borg-first-native-backed-fixture-native-run:frame:1001:17",
      "borg-first-native-backed-fixture-native-run:frame:1002:17",
      "borg-first-native-backed-fixture-native-run:frame:1001:18",
      "borg-first-native-backed-fixture-native-run:frame:1002:18",
      "borg-first-native-backed-fixture-native-run:frame:1001:19",
      "borg-first-native-backed-fixture-native-run:frame:1002:19",
      "borg-first-native-backed-fixture-native-run:frame:1001:20",
      "borg-first-native-backed-fixture-native-run:frame:1002:20",
      "borg-first-native-backed-fixture-native-run:frame:1001:21",
      "borg-first-native-backed-fixture-native-run:frame:1002:21",
      "borg-first-native-backed-fixture-native-run:frame:1001:22",
      "borg-first-native-backed-fixture-native-run:frame:1002:22",
      "borg-first-native-backed-fixture-native-run:frame:1001:23",
      "borg-first-native-backed-fixture-native-run:frame:1002:23",
      "borg-first-native-backed-fixture-native-run:frame:1001:24",
      "borg-first-native-backed-fixture-native-run:frame:1002:24",
      "borg-first-native-backed-fixture-native-run:frame:1001:25",
      "borg-first-native-backed-fixture-native-run:frame:1002:25",
      "borg-first-native-backed-fixture-native-run:frame:1001:26",
      "borg-first-native-backed-fixture-native-run:frame:1002:26",
      "borg-first-native-backed-fixture-native-run:frame:1001:27",
      "borg-first-native-backed-fixture-native-run:frame:1002:27",
      "borg-first-native-backed-fixture-native-run:frame:1001:28",
      "borg-first-native-backed-fixture-native-run:frame:1002:28",
      "borg-first-native-backed-fixture-native-run:frame:1001:29",
      "borg-first-native-backed-fixture-native-run:frame:1002:29",
      "borg-first-native-backed-fixture-native-run:frame:1001:30",
      "borg-first-native-backed-fixture-native-run:frame:1002:30",
      "borg-first-native-backed-fixture-native-run:frame:1001:31",
      "borg-first-native-backed-fixture-native-run:frame:1002:31",
      "borg-first-native-backed-fixture-native-run:frame:1001:32",
      "borg-first-native-backed-fixture-native-run:frame:1002:32",
      "borg-first-native-backed-fixture-native-run:frame:1001:33",
      "borg-first-native-backed-fixture-native-run:frame:1002:33",
      "borg-first-native-backed-fixture-native-run:frame:1001:34",
      "borg-first-native-backed-fixture-native-run:frame:1002:34",
      "borg-first-native-backed-fixture-native-run:frame:1001:35",
      "borg-first-native-backed-fixture-native-run:frame:1002:35",
      "borg-first-native-backed-fixture-native-run:frame:1001:36",
      "borg-first-native-backed-fixture-native-run:frame:1002:36",
      "borg-first-native-backed-fixture-native-run:frame:1001:37",
      "borg-first-native-backed-fixture-native-run:frame:1002:37",
      "borg-first-native-backed-fixture-native-run:frame:1001:38",
      "borg-first-native-backed-fixture-native-run:frame:1002:38",
      "borg-first-native-backed-fixture-native-run:frame:1001:39",
      "borg-first-native-backed-fixture-native-run:frame:1002:39",
      "borg-first-native-backed-fixture-native-run:frame:1001:40",
      "borg-first-native-backed-fixture-native-run:frame:1002:40",
      "borg-first-native-backed-fixture-native-run:frame:1001:41",
      "borg-first-native-backed-fixture-native-run:frame:1002:41",
      "borg-first-native-backed-fixture-native-run:frame:1001:42",
      "borg-first-native-backed-fixture-native-run:frame:1002:42",
      "borg-first-native-backed-fixture-native-run:frame:1001:43",
      "borg-first-native-backed-fixture-native-run:frame:1002:43",
      "borg-first-native-backed-fixture-native-run:frame:1001:44",
      "borg-first-native-backed-fixture-native-run:frame:1002:44",
      "borg-first-native-backed-fixture-native-run:frame:1001:45",
      "borg-first-native-backed-fixture-native-run:frame:1002:45",
      "borg-first-native-backed-fixture-native-run:frame:1001:46",
      "borg-first-native-backed-fixture-native-run:frame:1002:46",
      "borg-first-native-backed-fixture-native-run:frame:1001:47",
      "borg-first-native-backed-fixture-native-run:frame:1002:47",
      "borg-first-native-backed-fixture-native-run:frame:1001:48",
      "borg-first-native-backed-fixture-native-run:frame:1002:48",
      "borg-first-native-backed-fixture-native-run:frame:1001:49",
      "borg-first-native-backed-fixture-native-run:frame:1002:49",
      "borg-first-native-backed-fixture-native-run:frame:1001:50",
      "borg-first-native-backed-fixture-native-run:frame:1002:50"
    ],
    "frameCount": 102,
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
      "rowCount": 100,
      "chunkCount": 7,
      "pathCount": 2,
      "byteLength": 9600,
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
      "maxSpeed": 0.2800000056,
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
      "xMin": 4.29999999999,
      "xMax": 5.70000000001,
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
        "message": "The long native fixture keeps the pair inside the outer cube; no native face-crossing event rows are emitted for boundary replay."
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
      "frameCount": 102,
      "pathRowCount": 100,
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

export const BORG_APP_SURFACE_DESIGN_V1 = Object.freeze({
  schema: "borg-app-surface-design.v1",
  screenSpecId: "borg-first-screen-from-native-fixture",
  appId: "borg-app",
  claimLevel: "developer-test-screen-spec",
  sourceManifest: Object.freeze({
    schema: "borg-dataset-manifest.v1",
    manifestId: "borg-first-native-backed-fixture-manifest",
    runId: "borg-first-native-backed-fixture",
    modelContractId: "aaa.central-solver/borg-first-native-backed-fixture.v1",
    nativeSolverStatus: "native-backed-now",
    nativeSolverVersion: "local-wasm:architrino_solver_wasm_smoke",
    bridgeSchemaVersion: "solver-app-bridge.v1",
    fixtureStatus: "passed-native-long-fixture-with-fail-closed-boundary-gaps",
    fixtureProfileId: "borg-first-native-backed-long-fixture.v1",
    nativeKeyframeCount: 51,
    sampleInterval: 0.2,
    playbackFrameSource: "native-keyframes",
    sourceClaimLevel: "developer-test",
  }),
  nativeSolverBoundary: Object.freeze({
    productionSolver: "native-central-solver",
    newSolverStatus: "forbidden",
    bridgeExecutionPath: "native_c_abi",
    currentStateAuthority: "authoritative-solver-output",
    pathHistoryAuthority: "authoritative-solver-output",
    wakeHistoryAuthority: "fail-closed-missing-contract",
    faceBoundaryAuthority: "fail-closed-missing-contract",
  }),
  firstViewport: Object.freeze({
    screenKind: "simulation-workspace",
    landingPage: false,
    requiredOutputStandard: "4k-uhd",
    renderPixelSize: "3840x2160",
    layoutRegions: Object.freeze([
      "left-simulation-envelope-rail",
      "top-layer-strip",
      "viewport-camera-cluster",
      "right-diagnostics-rail",
      "bottom-timeline",
    ]),
    defaultVisibleLayers: Object.freeze(["simulation-window", "architrino-position", "diagnostics"]),
    defaultHiddenLayers: Object.freeze(["path-history", "velocity-vectors"]),
    defaultDisabledLayers: Object.freeze(["wake-streams", "face-boundary-status", "outbound-face-background"]),
    authorityPromotionRule: "least-authoritative-applicable-status-wins",
  }),
  layerStrip: Object.freeze([
    Object.freeze({ layer: "simulation-window", state: "on-locked", valueAuthority: "app-facing-projection" }),
    Object.freeze({ layer: "architrino-position", state: "on", valueAuthority: "authoritative-solver-output" }),
    Object.freeze({ layer: "path-history", state: "off", valueAuthority: "authoritative-solver-output" }),
    Object.freeze({
      layer: "velocity-vectors",
      state: "off",
      rawValueAuthority: "authoritative-solver-output",
      geometryAuthority: "app-facing-projection",
    }),
    Object.freeze({
      layer: "wake-streams",
      state: "disabled",
      valueAuthority: "fail-closed-value",
      firstFailureCode: "wake_history_gap_unclassified",
    }),
    Object.freeze({
      layer: "face-boundary-status",
      state: "contextual-disabled",
      valueAuthority: "fail-closed-value",
      firstFailureCode: "missing_face_crossing_coverage",
    }),
    Object.freeze({ layer: "diagnostics", state: "on-locked", valueAuthority: "fail-closed-value" }),
    Object.freeze({
      layer: "outbound-face-background",
      state: "disabled",
      valueAuthority: "fail-closed-value",
      firstFailureCode: "face_influence_model_missing",
    }),
  ]),
  authorityMap: Object.freeze({
    nativeCurrentStateFrames: "authoritative-solver-output",
    nativePathHistoryStream: "authoritative-solver-output",
    centralCubeWireframe: "app-facing-projection",
    outerComputedCubeOverlay: "app-facing-projection",
    velocityRayGeometry: "app-facing-projection",
    wakeStreams: "fail-closed-value",
    faceBoundaryStatus: "fail-closed-value",
    outboundFaceBackground: "fail-closed-value",
    centralVolumeAcceleration: "fail-closed-value",
    benignNoiseStatus: "fail-closed-missing-contract",
    deploymentBudgets: "missing-error-budget",
    renderQuality: "not-measured",
  }),
  failClosedFirstFailureCodes: Object.freeze([
    "wake_history_gap_unclassified",
    "missing_face_crossing_coverage",
    "face_influence_model_missing",
    "six_face_boundary_policy_missing",
    "velocity_sampling_protocol_missing",
    "required_residual_unmeasured",
  ]),
  validation: Object.freeze({
    surfaceDesignStatus: "passed-screen-spec-validation",
    sourceFixtureStatus: "passed-native-long-fixture-with-fail-closed-boundary-gaps",
    nativeBridgeStatus: "passed",
    nativePathBoundsFaceCrossingStatus: "path-bounds-stay-inside-outer-cube-long-fixture",
    boundaryReplayDecisionStatus: "fail-closed-missing-contract",
    benignNoiseAuthorityStatus: "fail-closed-missing-contract",
    proofClaimStatus: "not-proof-evidence",
  }),
  nextBuildBurden: "measure-browser-surface-budget-and-4k-render-capture",
});

export const BORG_FAIL_CLOSED_ROWS = Object.freeze([
  Object.freeze({
    firstFailureCode: "wake_history_gap_unclassified",
    affectedConsumers: Object.freeze(["wake-streams", "receiver-acceleration", "central-volume-diagnostics"]),
    valueAuthority: "fail-closed-value",
  }),
  Object.freeze({
    firstFailureCode: "missing_face_crossing_coverage",
    affectedConsumers: Object.freeze(["face-boundary-status", "face-summary-extraction"]),
    valueAuthority: "fail-closed-value",
  }),
  Object.freeze({
    firstFailureCode: "face_influence_model_missing",
    affectedConsumers: Object.freeze(["face-replay-source", "six-face-boundary-noise-policy"]),
    valueAuthority: "fail-closed-value",
  }),
  Object.freeze({
    firstFailureCode: "six_face_boundary_policy_missing",
    affectedConsumers: Object.freeze(["boundary-replay-decision", "benign-noise-status"]),
    valueAuthority: "fail-closed-value",
  }),
  Object.freeze({
    firstFailureCode: "velocity_sampling_protocol_missing",
    affectedConsumers: Object.freeze(["velocity-scale-sampling", "boundary-replay-decision"]),
    valueAuthority: "fail-closed-value",
  }),
  Object.freeze({
    firstFailureCode: "required_residual_unmeasured",
    affectedConsumers: Object.freeze([
      "central-volume-acceleration",
      "wake-background-diagnostics",
      "face-boundary-replay",
    ]),
    valueAuthority: "fail-closed-value",
  }),
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

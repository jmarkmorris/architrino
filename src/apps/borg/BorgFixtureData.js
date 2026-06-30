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
    "interactionLaw": "display_pair_attraction_v1",
    "pairAccelerationScale": 1.2,
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
    "centralVelocityBound": 0.24025961702882928,
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
    "initialLinePolicy": "non-collinear-curvature-visibility",
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
        "x": 4.55,
        "y": 4.55,
        "z": 4.9
      },
      "velocity": {
        "x": 0.02,
        "y": 0.225,
        "z": 0.018
      },
      "errorBound": 0,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 0,
      "time": 0,
      "position": {
        "x": 5.45,
        "y": 5.35,
        "z": 5.12
      },
      "velocity": {
        "x": -0.01,
        "y": -0.175,
        "z": -0.012
      },
      "errorBound": 0,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 1,
      "time": 0.2,
      "position": {
        "x": 4.554432,
        "y": 4.595384,
        "z": 4.9037056
      },
      "velocity": {
        "x": 0.022160000000000003,
        "y": 0.22692,
        "z": 0.018528
      },
      "errorBound": 1e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 1,
      "time": 0.2,
      "position": {
        "x": 5.447568,
        "y": 5.314616,
        "z": 5.1174944
      },
      "velocity": {
        "x": -0.01216,
        "y": -0.17692,
        "z": -0.012528
      },
      "errorBound": 1e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 2,
      "time": 0.4,
      "position": {
        "x": 4.55929270528,
        "y": 4.64111323136,
        "z": 4.907513818624
      },
      "velocity": {
        "x": 0.024303526400000004,
        "y": 0.2286461568,
        "z": 0.019041093119999998
      },
      "errorBound": 2e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 2,
      "time": 0.4,
      "position": {
        "x": 5.444707294720001,
        "y": 5.27888676864,
        "z": 5.114886181376
      },
      "velocity": {
        "x": -0.0143035264,
        "y": -0.17864615679999998,
        "z": -0.013041093119999998
      },
      "errorBound": 2e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 3,
      "time": 0.6000000000000001,
      "position": {
        "x": 4.564578409562931,
        "y": 4.687148594017895,
        "z": 4.911421575982121
      },
      "velocity": {
        "x": 0.026428521414656007,
        "y": 0.230176813289472,
        "z": 0.019538786790604796
      },
      "errorBound": 3e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 3,
      "time": 0.6000000000000001,
      "position": {
        "x": 5.441421590437069,
        "y": 5.242851405982106,
        "z": 5.112178424017879
      },
      "velocity": {
        "x": -0.016428521414656002,
        "y": -0.180176813289472,
        "z": -0.013538786790604797
      },
      "errorBound": 3e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 4,
      "time": 0.8,
      "position": {
        "x": 4.570284998572682,
        "y": 4.7334506940255325,
        "z": 4.9154256966273
      },
      "velocity": {
        "x": 0.02853294504875394,
        "y": 0.23151050003818613,
        "z": 0.020020603225890613
      },
      "errorBound": 4e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 4,
      "time": 0.8,
      "position": {
        "x": 5.437715001427319,
        "y": 5.206549305974469,
        "z": 5.1093743033727
      },
      "velocity": {
        "x": -0.018532945048753934,
        "y": -0.1815105000381861,
        "z": -0.014020603225890615
      },
      "errorBound": 4e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 5,
      "time": 1,
      "position": {
        "x": 4.576407953983804,
        "y": 4.779979881366906,
        "z": 4.919522912603716
      },
      "velocity": {
        "x": 0.030614777055605065,
        "y": 0.23264593670686357,
        "z": 0.020486079882079573
      },
      "errorBound": 4.9999999999999995e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 5,
      "time": 1,
      "position": {
        "x": 5.433592046016198,
        "y": 5.170020118633096,
        "z": 5.106477087396284
      },
      "velocity": {
        "x": -0.02061477705560506,
        "y": -0.18264593670686355,
        "z": -0.014486079882079575
      },
      "errorBound": 4.9999999999999995e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 6,
      "time": 1.2,
      "position": {
        "x": 4.5829423577591,
        "y": 4.826696288022166,
        "z": 4.923709866584033
      },
      "velocity": {
        "x": 0.032672018876482814,
        "y": 0.23358203327630242,
        "z": 0.020934769901581735
      },
      "errorBound": 6e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 6,
      "time": 1.2,
      "position": {
        "x": 5.429057642240902,
        "y": 5.1333037119778355,
        "z": 5.103490133415968
      },
      "velocity": {
        "x": -0.022672018876482805,
        "y": -0.1835820332763024,
        "z": -0.014934769901581739
      },
      "errorBound": 6e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 7,
      "time": 1.4,
      "position": {
        "x": 4.5898828968709475,
        "y": 4.873559866240925,
        "z": 4.927983115092428
      },
      "velocity": {
        "x": 0.03470269555923914,
        "y": 0.23431789109379603,
        "z": 0.02136624254197838
      },
      "errorBound": 6.999999999999999e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 7,
      "time": 1.4,
      "position": {
        "x": 5.424117103129054,
        "y": 5.096440133759076,
        "z": 5.100416884907572
      },
      "velocity": {
        "x": -0.02470269555923913,
        "y": -0.184317891093796,
        "z": -0.015366242541978383
      },
      "errorBound": 6.999999999999999e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 8,
      "time": 1.5999999999999999,
      "position": {
        "x": 4.597223868401799,
        "y": 4.920530426988093,
        "z": 4.932339131810335
      },
      "velocity": {
        "x": 0.03670485765425859,
        "y": 0.23485280373583958,
        "z": 0.021780083589534725
      },
      "errorBound": 8e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 8,
      "time": 1.5999999999999999,
      "position": {
        "x": 5.418776131598202,
        "y": 5.059469573011908,
        "z": 5.097260868189665
      },
      "velocity": {
        "x": -0.026704857654258583,
        "y": -0.18485280373583957,
        "z": -0.015780083589534727
      },
      "errorBound": 8e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 9,
      "time": 1.7999999999999998,
      "position": {
        "x": 4.604959185018985,
        "y": 4.967567678525352,
        "z": 4.936774310961704
      },
      "velocity": {
        "x": 0.03867658308592996,
        "y": 0.23518625768629675,
        "z": 0.02217589575684512
      },
      "errorBound": 9e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 9,
      "time": 1.7999999999999998,
      "position": {
        "x": 5.413040814981016,
        "y": 5.022432321474649,
        "z": 5.094025689038296
      },
      "velocity": {
        "x": -0.02867658308592995,
        "y": -0.18518625768629673,
        "z": -0.01617589575684512
      },
      "errorBound": 9e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 10,
      "time": 1.9999999999999998,
      "position": {
        "x": 4.613082380818553,
        "y": 5.014631265091227,
        "z": 4.94128497077455
      },
      "velocity": {
        "x": 0.04061597899783883,
        "y": 0.23531793282937508,
        "z": 0.02255329906422894
      },
      "errorBound": 9.999999999999999e-11,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 10,
      "time": 1.9999999999999998,
      "position": {
        "x": 5.406917619181448,
        "y": 4.985368734908774,
        "z": 5.09071502922545
      },
      "velocity": {
        "x": -0.03061597899783882,
        "y": -0.18531793282937506,
        "z": -0.016553299064228942
      },
      "errorBound": 9.999999999999999e-11,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 11,
      "time": 2.1999999999999997,
      "position": {
        "x": 4.621586617532535,
        "y": 5.061680805642614,
        "z": 4.9458673570154525
      },
      "velocity": {
        "x": 0.042521183569909776,
        "y": 0.23524770275693718,
        "z": 0.0229119312045111
      },
      "errorBound": 1.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 11,
      "time": 2.1999999999999997,
      "position": {
        "x": 5.400413382467466,
        "y": 4.948319194357387,
        "z": 5.087332642984547
      },
      "velocity": {
        "x": -0.03252118356990977,
        "y": -0.18524770275693717,
        "z": -0.0169119312045111
      },
      "errorBound": 1.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 12,
      "time": 2.4,
      "position": {
        "x": 4.630464691093686,
        "y": 5.108675932620584,
        "z": 4.95051764659362
      },
      "velocity": {
        "x": 0.04439036780575361,
        "y": 0.23497563488985262,
        "z": 0.023251447890836927
      },
      "errorBound": 1.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 12,
      "time": 2.4,
      "position": {
        "x": 5.393535308906316,
        "y": 4.911324067379416,
        "z": 5.08388235340638
      },
      "velocity": {
        "x": -0.0343903678057536,
        "y": -0.1849756348898526,
        "z": -0.017251447890836928
      },
      "errorBound": 1.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 13,
      "time": 2.6,
      "position": {
        "x": 4.639709038551387,
        "y": 5.155576330703239,
        "z": 4.955231951231058
      },
      "velocity": {
        "x": 0.04622173728850392,
        "y": 0.23450199041327383,
        "z": 0.02357152318718755
      },
      "errorBound": 1.3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 13,
      "time": 2.6,
      "position": {
        "x": 5.386290961448615,
        "y": 4.874423669296761,
        "z": 5.080368048768943
      },
      "velocity": {
        "x": -0.03622173728850391,
        "y": -0.1845019904132738,
        "z": -0.017571523187187552
      },
      "errorBound": 1.3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 14,
      "time": 2.8000000000000003,
      "position": {
        "x": 4.649311745332079,
        "y": 5.202341775508419,
        "z": 4.960006321195314
      },
      "velocity": {
        "x": 0.04801353390345727,
        "y": 0.23382722402589828,
        "z": 0.023871849821278473
      },
      "errorBound": 1.3999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 14,
      "time": 2.8000000000000003,
      "position": {
        "x": 5.3786882546679236,
        "y": 4.837658224491582,
        "z": 5.076793678804687
      },
      "velocity": {
        "x": -0.03801353390345726,
        "y": -0.18382722402589827,
        "z": -0.017871849821278474
      },
      "errorBound": 1.3999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 15,
      "time": 3.0000000000000004,
      "position": {
        "x": 4.659264552837251,
        "y": 5.248932172209111,
        "z": 4.964836749091222
      },
      "velocity": {
        "x": 0.0497640375258633,
        "y": 0.2329519835034579,
        "z": 0.02415213947954097
      },
      "errorBound": 1.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 15,
      "time": 3.0000000000000004,
      "position": {
        "x": 5.370735447162751,
        "y": 4.801067827790891,
        "z": 5.073163250908778
      },
      "velocity": {
        "x": -0.03976403752586329,
        "y": -0.18295198350345787,
        "z": -0.01815213947954097
      },
      "errorBound": 1.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 16,
      "time": 3.2000000000000006,
      "position": {
        "x": 4.6695588663717,
        "y": 5.295307594024481,
        "z": 4.969719173708002
      },
      "velocity": {
        "x": 0.051471567672244506,
        "y": 0.23187710907685416,
        "z": 0.024412123083903104
      },
      "errorBound": 1.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 16,
      "time": 3.2000000000000006,
      "position": {
        "x": 5.362441133628302,
        "y": 4.76469240597552,
        "z": 5.069480826291998
      },
      "velocity": {
        "x": -0.0414715676722445,
        "y": -0.18187710907685414,
        "z": -0.018412123083903106
      },
      "errorBound": 1.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 17,
      "time": 3.400000000000001,
      "position": {
        "x": 4.680185763394432,
        "y": 5.341428320549589,
        "z": 4.974649483918023
      },
      "velocity": {
        "x": 0.053134485113660354,
        "y": 0.23060363262553665,
        "z": 0.024651551050104695
      },
      "errorBound": 1.6999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 17,
      "time": 3.400000000000001,
      "position": {
        "x": 5.35381423660557,
        "y": 4.728571679450413,
        "z": 5.065750516081977
      },
      "velocity": {
        "x": -0.043134485113660345,
        "y": -0.18060363262553664,
        "z": -0.018651551050104697
      },
      "errorBound": 1.6999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 18,
      "time": 3.600000000000001,
      "position": {
        "x": 4.691136002084305,
        "y": 5.387254875886969,
        "z": 4.979623522623483
      },
      "velocity": {
        "x": 0.05475119344936709,
        "y": 0.22913277668689863,
        "z": 0.024870193527298183
      },
      "errorBound": 1.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 18,
      "time": 3.600000000000001,
      "position": {
        "x": 5.344863997915696,
        "y": 4.692745124113033,
        "z": 5.0619764773765175
      },
      "velocity": {
        "x": -0.04475119344936708,
        "y": -0.17913277668689861,
        "z": -0.018870193527298185
      },
      "errorBound": 1.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 19,
      "time": 3.800000000000001,
      "position": {
        "x": 4.702400030212178,
        "y": 5.432748066543497,
        "z": 4.984637090747224
      },
      "velocity": {
        "x": 0.05632014063936243,
        "y": 0.2274659532826412,
        "z": 0.025067840618705466
      },
      "errorBound": 1.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 19,
      "time": 3.800000000000001,
      "position": {
        "x": 5.335599969787824,
        "y": 4.657251933456505,
        "z": 5.0581629092527765
      },
      "velocity": {
        "x": -0.04632014063936242,
        "y": -0.17746595328264117,
        "z": -0.019067840618705468
      },
      "errorBound": 1.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 20,
      "time": 4.000000000000001,
      "position": {
        "x": 4.713967994311046,
        "y": 5.477869019056143,
        "z": 4.989685951263848
      },
      "velocity": {
        "x": 0.057839820494343976,
        "y": 0.22560476256323242,
        "z": 0.025244302583118793
      },
      "errorBound": 1.9999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 20,
      "time": 4.000000000000001,
      "position": {
        "x": 5.326032005688955,
        "y": 4.622130980943858,
        "z": 5.054314048736153
      },
      "velocity": {
        "x": -0.04783982049434397,
        "y": -0.1756047625632324,
        "z": -0.019244302583118794
      },
      "errorBound": 1.9999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 21,
      "time": 4.200000000000001,
      "position": {
        "x": 4.725829749135376,
        "y": 5.522579217310496,
        "z": 4.994765833267258
      },
      "velocity": {
        "x": 0.059308774121650955,
        "y": 0.22355099127176292,
        "z": 0.025399410017052326
      },
      "errorBound": 2.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 21,
      "time": 4.200000000000001,
      "position": {
        "x": 5.316170250864625,
        "y": 4.587420782689505,
        "z": 5.050434166732742
      },
      "velocity": {
        "x": -0.049308774121650946,
        "y": -0.1735509912717629,
        "z": -0.019399410017052327
      },
      "errorBound": 2.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 22,
      "time": 4.400000000000001,
      "position": {
        "x": 4.737974867400537,
        "y": 5.566840539516231,
        "z": 4.999872436070732
      },
      "velocity": {
        "x": 0.06072559132580115,
        "y": 0.22130661102867255,
        "z": 0.025533014017369488
      },
      "errorBound": 2.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 22,
      "time": 4.400000000000001,
      "position": {
        "x": 5.306025132599465,
        "y": 4.55315946048377,
        "z": 5.046527563929269
      },
      "velocity": {
        "x": -0.05072559132580114,
        "y": -0.17130661102867253,
        "z": -0.01953301401736949
      },
      "errorBound": 2.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 23,
      "time": 4.600000000000001,
      "position": {
        "x": 4.7503926497929925,
        "y": 5.61061529480403,
        "z": 5.005001433335578
      },
      "velocity": {
        "x": 0.06208891196227858,
        "y": 0.21887377643899464,
        "z": 0.025644986324229974
      },
      "errorBound": 2.2999999999999998e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 23,
      "time": 4.600000000000001,
      "position": {
        "x": 5.295607350207009,
        "y": 4.5193847051959715,
        "z": 5.042598566664423
      },
      "velocity": {
        "x": -0.05208891196227857,
        "y": -0.16887377643899462,
        "z": -0.019644986324229976
      },
      "errorBound": 2.2999999999999998e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 24,
      "time": 4.800000000000002,
      "position": {
        "x": 4.7630721352416465,
        "y": 5.653866259408817,
        "z": 5.010148477224422
      },
      "velocity": {
        "x": 0.06339742724327221,
        "y": 0.21625482302393528,
        "z": 0.025735219444219203
      },
      "errorBound": 2.4e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 24,
      "time": 4.800000000000002,
      "position": {
        "x": 5.284927864758354,
        "y": 4.4861337405911845,
        "z": 5.038651522775579
      },
      "velocity": {
        "x": -0.05339742724327221,
        "y": -0.16625482302393527,
        "z": -0.019735219444219205
      },
      "errorBound": 2.4e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 25,
      "time": 5.000000000000002,
      "position": {
        "x": 4.776002111440469,
        "y": 5.696556712404572,
        "z": 5.01530920257513
      },
      "velocity": {
        "x": 0.06464988099411231,
        "y": 0.21345226497877295,
        "z": 0.025803626753541982
      },
      "errorBound": 2.4999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 25,
      "time": 5.000000000000002,
      "position": {
        "x": 5.273997888559532,
        "y": 4.45344328759543,
        "z": 5.0346907974248705
      },
      "velocity": {
        "x": -0.05464988099411231,
        "y": -0.16345226497877294,
        "z": -0.019803626753541984
      },
      "errorBound": 2.4999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 26,
      "time": 5.200000000000002,
      "position": {
        "x": 4.789171125612309,
        "y": 5.738650470956419,
        "z": 5.020479231091366
      },
      "velocity": {
        "x": 0.06584507085919807,
        "y": 0.210468792759231,
        "z": 0.02585014258118136
      },
      "errorBound": 2.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 26,
      "time": 5.200000000000002,
      "position": {
        "x": 5.262828874387693,
        "y": 4.421349529043584,
        "z": 5.030720768908634
      },
      "velocity": {
        "x": -0.055845070859198064,
        "y": -0.16046879275923098,
        "z": -0.01985014258118136
      },
      "errorBound": 2.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 27,
      "time": 5.400000000000002,
      "position": {
        "x": 4.802567495503561,
        "y": 5.780111925056147,
        "z": 5.025654175545755
      },
      "velocity": {
        "x": 0.06698184945625899,
        "y": 0.2073072704986402,
        "z": 0.0258747222719428
      },
      "errorBound": 2.7e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 27,
      "time": 5.400000000000002,
      "position": {
        "x": 5.251432504496441,
        "y": 4.3898880749438565,
        "z": 5.026745824454245
      },
      "velocity": {
        "x": -0.05698184945625899,
        "y": -0.15730727049864018,
        "z": -0.019874722271942803
      },
      "errorBound": 2.7e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 28,
      "time": 5.600000000000002,
      "position": {
        "x": 4.8161793205991295,
        "y": 5.820906071707821,
        "z": 5.03082964399162
      },
      "velocity": {
        "x": 0.0680591254778419,
        "y": 0.2039707332583707,
        "z": 0.025877342229323176
      },
      "errorBound": 2.7999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 28,
      "time": 5.600000000000002,
      "position": {
        "x": 5.239820679400873,
        "y": 4.359093928292182,
        "z": 5.0227703560083805
      },
      "velocity": {
        "x": -0.05805912547784191,
        "y": -0.15397073325837068,
        "z": -0.019877342229323178
      },
      "errorBound": 2.7999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 29,
      "time": 5.8000000000000025,
      "position": {
        "x": 4.829994493546923,
        "y": 5.860998548530656,
        "z": 5.0360012439792525
      },
      "velocity": {
        "x": 0.06907586473896608,
        "y": 0.20046238411417316,
        "z": 0.0258579999381634
      },
      "errorBound": 2.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 29,
      "time": 5.8000000000000025,
      "position": {
        "x": 5.22800550645308,
        "y": 4.329001451469348,
        "z": 5.018798756020748
      },
      "velocity": {
        "x": -0.059075864738966095,
        "y": -0.15046238411417315,
        "z": -0.019857999938163402
      },
      "errorBound": 2.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 30,
      "time": 6.000000000000003,
      "position": {
        "x": 4.844000711780911,
        "y": 5.9003556667469015,
        "z": 5.041164586772665
      },
      "velocity": {
        "x": 0.07003109116994086,
        "y": 0.196785591081226,
        "z": 0.02581671396706299
      },
      "errorBound": 3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 30,
      "time": 6.000000000000003,
      "position": {
        "x": 5.215999288219091,
        "y": 4.299644333253103,
        "z": 5.014835413227335
      },
      "velocity": {
        "x": -0.060031091169940876,
        "y": -0.14678559108122602,
        "z": -0.019816713967062992
      },
      "errorBound": 3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 31,
      "time": 6.200000000000003,
      "position": {
        "x": 4.858185489331589,
        "y": 5.93894444352307,
        "z": 5.0463152915627765
      },
      "velocity": {
        "x": 0.07092388775339249,
        "y": 0.19294388388084088,
        "z": 0.025753523950554198
      },
      "errorBound": 3.0999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 31,
      "time": 6.200000000000003,
      "position": {
        "x": 5.203814510668413,
        "y": 4.271055556476935,
        "z": 5.0108847084372234
      },
      "velocity": {
        "x": -0.06092388775339251,
        "y": -0.1429438838808409,
        "z": -0.0197535239505542
      },
      "errorBound": 3.0999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 32,
      "time": 6.400000000000003,
      "position": {
        "x": 4.872536168812509,
        "y": 5.976732633633456,
        "z": 5.051448989672987
      },
      "velocity": {
        "x": 0.07175339740460086,
        "y": 0.18894095055193016,
        "z": 0.025668490551052872
      },
      "errorBound": 3.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 32,
      "time": 6.400000000000003,
      "position": {
        "x": 5.191463831187493,
        "y": 4.243267366366549,
        "z": 5.006951010327013
      },
      "velocity": {
        "x": -0.06175339740460089,
        "y": -0.13894095055193018,
        "z": -0.019668490551052874
      },
      "errorBound": 3.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 33,
      "time": 6.600000000000003,
      "position": {
        "x": 4.887039933571369,
        "y": 6.013688760415554,
        "z": 5.056561328753111
      },
      "velocity": {
        "x": 0.07251882379430083,
        "y": 0.18478063391048957,
        "z": 0.025561695400622534
      },
      "errorBound": 3.3e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 33,
      "time": 6.600000000000003,
      "position": {
        "x": 5.178960066428632,
        "y": 4.216311239584451,
        "z": 5.003038671246888
      },
      "velocity": {
        "x": -0.06251882379430085,
        "y": -0.13478063391048958,
        "z": -0.019561695400622536
      },
      "errorBound": 3.3e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 34,
      "time": 6.800000000000003,
      "position": {
        "x": 4.901683819994001,
        "y": 6.049782145987653,
        "z": 5.061647976957633
      },
      "velocity": {
        "x": 0.07321943211315826,
        "y": 0.18046692786049492,
        "z": 0.0254332410226076
      },
      "errorBound": 3.3999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 34,
      "time": 6.800000000000003,
      "position": {
        "x": 5.1663161800060005,
        "y": 4.190217854012352,
        "z": 4.999152023042367
      },
      "velocity": {
        "x": -0.06321943211315828,
        "y": -0.13046692786049494,
        "z": -0.0194332410226076
      },
      "errorBound": 3.3999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 35,
      "time": 7.0000000000000036,
      "position": {
        "x": 4.9164547299494386,
        "y": 6.084982940699604,
        "z": 5.066704627104275
      },
      "velocity": {
        "x": 0.07385454977718706,
        "y": 0.1760039735597542,
        "z": 0.02528325073321096
      },
      "errorBound": 3.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 35,
      "time": 7.0000000000000036,
      "position": {
        "x": 5.153545270050563,
        "y": 4.165017059300401,
        "z": 4.995295372895725
      },
      "velocity": {
        "x": -0.06385454977718708,
        "y": -0.1260039735597542,
        "z": -0.019283250733210962
      },
      "errorBound": 3.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 36,
      "time": 7.200000000000004,
      "position": {
        "x": 4.931339443364124,
        "y": 6.119262151788483,
        "z": 5.071727000808897
      },
      "velocity": {
        "x": 0.07442356707342976,
        "y": 0.1713960554443961,
        "z": 0.02511186852311044
      },
      "errorBound": 3.6e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 36,
      "time": 7.200000000000004,
      "position": {
        "x": 5.1406605566358765,
        "y": 4.140737848211521,
        "z": 4.991472999191102
      },
      "velocity": {
        "x": -0.06442356707342978,
        "y": -0.12139605544439612,
        "z": -0.01911186852311044
      },
      "errorBound": 3.6e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 37,
      "time": 7.400000000000004,
      "position": {
        "x": 4.946324630913181,
        "y": 6.1525916712116455,
        "z": 5.0767108525927425
      },
      "velocity": {
        "x": 0.07492593774528196,
        "y": 0.16664759711581137,
        "z": 0.024919258919227732
      },
      "errorBound": 3.6999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 37,
      "time": 7.400000000000004,
      "position": {
        "x": 5.12767536908682,
        "y": 4.1174083287883585,
        "z": 4.987689147407257
      },
      "velocity": {
        "x": -0.06492593774528198,
        "y": -0.11664759711581141,
        "z": -0.018919258919227733
      },
      "errorBound": 3.6999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 38,
      "time": 7.600000000000004,
      "position": {
        "x": 4.9613968668165604,
        "y": 6.184944302630445,
        "z": 5.081651973958099
      },
      "velocity": {
        "x": 0.07536117951689869,
        "y": 0.16176315709399547,
        "z": 0.024705606826782564
      },
      "errorBound": 3.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 38,
      "time": 7.600000000000004,
      "position": {
        "x": 5.11460313318344,
        "y": 4.09505569736956,
        "z": 4.9839480260419
      },
      "velocity": {
        "x": -0.06536117951689871,
        "y": -0.11176315709399551,
        "z": -0.018705606826782566
      },
      "errorBound": 3.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 39,
      "time": 7.800000000000004,
      "position": {
        "x": 4.9765426417277965,
        "y": 6.216293787518719,
        "z": 5.086546197428456
      },
      "velocity": {
        "x": 0.0757288745561792,
        "y": 0.15674742444136935,
        "z": 0.024471117351783686
      },
      "errorBound": 3.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 39,
      "time": 7.800000000000004,
      "position": {
        "x": 5.101457358272204,
        "y": 4.0737062124812855,
        "z": 4.980253802571544
      },
      "velocity": {
        "x": -0.06572887455617922,
        "y": -0.10674742444136938,
        "z": -0.018471117351783688
      },
      "errorBound": 3.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 40,
      "time": 8.000000000000004,
      "position": {
        "x": 4.991748375702974,
        "y": 6.246614830370975,
        "z": 5.091389400549281
      },
      "velocity": {
        "x": 0.07602866987588577,
        "y": 0.15160521426127954,
        "z": 0.024216015604127096
      },
      "errorBound": 3.9999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 40,
      "time": 8.000000000000004,
      "position": {
        "x": 5.088251624297027,
        "y": 4.0533851696290295,
        "z": 4.976610599450718
      },
      "velocity": {
        "x": -0.06602866987588579,
        "y": -0.10160521426127955,
        "z": -0.018216015604127098
      },
      "errorBound": 3.9999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 41,
      "time": 8.200000000000003,
      "position": {
        "x": 5.0070004312374765,
        "y": 6.275883122986074,
        "z": 5.096177509845579
      },
      "velocity": {
        "x": 0.0762602776725115,
        "y": 0.1463414630754989,
        "z": 0.023940546481490545
      },
      "errorBound": 4.1e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 41,
      "time": 8.200000000000003,
      "position": {
        "x": 5.074999568762525,
        "y": 4.03411687701393,
        "z": 4.97302249015442
      },
      "velocity": {
        "x": -0.06626027767251153,
        "y": -0.0963414630754989,
        "z": -0.017940546481490547
      },
      "errorBound": 4.1e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 42,
      "time": 8.400000000000002,
      "position": {
        "x": 5.022285126357991,
        "y": 6.304075367803107,
        "z": 5.100906504732426
      },
      "velocity": {
        "x": 0.07642347560257162,
        "y": 0.14096122408516576,
        "z": 0.023644974434231764
      },
      "errorBound": 4.2e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 42,
      "time": 8.400000000000002,
      "position": {
        "x": 5.061714873642011,
        "y": 4.015924632196897,
        "z": 4.9694934952675744
      },
      "velocity": {
        "x": -0.06642347560257164,
        "y": -0.09096122408516577,
        "z": -0.017644974434231766
      },
      "errorBound": 4.2e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 43,
      "time": 8.600000000000001,
      "position": {
        "x": 5.0375887477572014,
        "y": 6.3311693002670495,
        "z": 5.105572421374729
      },
      "velocity": {
        "x": 0.07651810699605327,
        "y": 0.13546966231971086,
        "z": 0.02332958321151612
      },
      "errorBound": 4.2999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 43,
      "time": 8.600000000000001,
      "position": {
        "x": 5.0484112522428,
        "y": 3.9988306997329546,
        "z": 4.966027578625272
      },
      "velocity": {
        "x": -0.06651810699605329,
        "y": -0.08546966231971088,
        "z": -0.017329583211516123
      },
      "errorBound": 4.2999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 44,
      "time": 8.8,
      "position": {
        "x": 5.052897563958565,
        "y": 6.3571437102027355,
        "z": 5.110171356492513
      },
      "velocity": {
        "x": 0.07654408100681871,
        "y": 0.12987204967842905,
        "z": 0.022994675588917424
      },
      "errorBound": 4.4e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 44,
      "time": 8.8,
      "position": {
        "x": 5.035102436041436,
        "y": 3.982856289797269,
        "z": 4.962628643507488
      },
      "velocity": {
        "x": -0.06654408100681873,
        "y": -0.07987204967842908,
        "z": -0.016994675588917426
      },
      "errorBound": 4.4e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 45,
      "time": 9,
      "position": {
        "x": 5.068197838498528,
        "y": 6.381978462176627,
        "z": 5.1146994711080636
      },
      "velocity": {
        "x": 0.0765013726998176,
        "y": 0.12417375986945595,
        "z": 0.022640573077753363
      },
      "errorBound": 4.5e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 45,
      "time": 9,
      "position": {
        "x": 5.021802161501473,
        "y": 3.9680215378233776,
        "z": 4.959300528891937
      },
      "velocity": {
        "x": -0.06650137269981762,
        "y": -0.07417375986945597,
        "z": -0.016640573077753365
      },
      "errorBound": 4.5e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 46,
      "time": 9.2,
      "position": {
        "x": 5.083475843113533,
        "y": 6.4056545148268285,
        "z": 5.11915299423135
      },
      "velocity": {
        "x": 0.07639002307502467,
        "y": 0.11838026325100817,
        "z": 0.02226761561643466
      },
      "errorBound": 4.5999999999999996e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 46,
      "time": 9.2,
      "position": {
        "x": 5.008524156886468,
        "y": 3.954345485173176,
        "z": 4.95604700576865
      },
      "velocity": {
        "x": -0.06639002307502469,
        "y": -0.0683802632510082,
        "z": -0.016267615616434663
      },
      "errorBound": 4.5999999999999996e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 47,
      "time": 9.399999999999999,
      "position": {
        "x": 5.098717870919149,
        "y": 6.428153939142796,
        "z": 5.123528226480175
      },
      "velocity": {
        "x": 0.07621013902807972,
        "y": 0.11249712157983943,
        "z": 0.021876161244124184
      },
      "errorBound": 4.699999999999999e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 47,
      "time": 9.399999999999999,
      "position": {
        "x": 4.995282129080852,
        "y": 3.941846060857208,
        "z": 4.952871773519825
      },
      "velocity": {
        "x": -0.06621013902807973,
        "y": -0.06249712157983945,
        "z": -0.015876161244124186
      },
      "errorBound": 4.699999999999999e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 48,
      "time": 9.599999999999998,
      "position": {
        "x": 5.113910249568683,
        "y": 6.449459935677187,
        "z": 5.127821543631579
      },
      "velocity": {
        "x": 0.0759618932476678,
        "y": 0.10652998267195404,
        "z": 0.021466585757019346
      },
      "errorBound": 4.8e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 48,
      "time": 9.599999999999998,
      "position": {
        "x": 4.982089750431319,
        "y": 3.9305400643228174,
        "z": 4.9497784563684215
      },
      "velocity": {
        "x": -0.06596189324766782,
        "y": -0.05652998267195406,
        "z": -0.015466585757019346
      },
      "errorBound": 4.8e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 49,
      "time": 9.799999999999997,
      "position": {
        "x": 5.12903935437863,
        "y": 6.469556850673328,
        "z": 5.132029400101096
      },
      "velocity": {
        "x": 0.07564552404973814,
        "y": 0.10048457498070358,
        "z": 0.02103928234758777
      },
      "errorBound": 4.9e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 49,
      "time": 9.799999999999997,
      "position": {
        "x": 4.9689606456213715,
        "y": 3.920443149326677,
        "z": 4.946770599898904
      },
      "velocity": {
        "x": -0.06564552404973815,
        "y": -0.05048457498070359,
        "z": -0.01503928234758777
      },
      "errorBound": 4.9e-10,
      "stateFlags": 2
    },
    {
      "pathKey": 1001,
      "frameIndex": 50,
      "time": 10,
      "position": {
        "x": 5.144091621408374,
        "y": 6.488430191092823,
        "z": 5.136148332346517
      },
      "velocity": {
        "x": 0.07526133514872071,
        "y": 0.09436670209747153,
        "z": 0.0205946612271025
      },
      "errorBound": 4.999999999999999e-10,
      "stateFlags": 1
    },
    {
      "pathKey": 1002,
      "frameIndex": 50,
      "time": 10,
      "position": {
        "x": 4.955908378591627,
        "y": 3.9115698089071826,
        "z": 4.943851667653483
      },
      "velocity": {
        "x": -0.06526133514872073,
        "y": -0.04436670209747154,
        "z": -0.014594661227102502
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
      "maxSpeed": 0.24025961702882928,
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
      "xMin": 4.54999999999,
      "xMax": 5.45000000001,
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
    initialLinePolicy: "non-collinear-curvature-visibility",
    pairAccelerationScale: 1.2,
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
  if (manifest.initialConditions.initialLinePolicy !== "non-collinear-curvature-visibility") {
    failures.push("curvature fixture initial line policy is missing");
  }
  if (manifest.sourceBridgeRun.pairAccelerationScale !== 1.2) {
    failures.push("curvature fixture pair action scale is not 1.2");
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

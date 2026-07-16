function deepFreeze(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    Object.values(value).forEach((entry) => deepFreeze(entry));
  }
  return value;
}

// Design-owned Borg app manifest. Everything here is declared policy: the
// simulation envelope, population sizing rule, seeded initial-condition
// policy, and the diagnostics vocabulary. Borg constructs a certified
// artificial retained history per randomized initial condition and runs the
// EOM from T=0; no stored trajectory data ships with the app.
export const BORG_DATASET_MANIFEST_V1 = deepFreeze({
  "schema": "borg-dataset-manifest.v1",
  "manifestId": "borg-eom-app-manifest",
  "claimLevel": "developer-test",
  "simulationEnvelope": {
    "sideLength": 1,
    "centralVolume": {
      "kind": "cube",
      "center": {
        "x": 0.5,
        "y": 0.5,
        "z": 0.5
      },
      "bounds": {
        "x": [
          0.1,
          0.9
        ],
        "y": [
          0.1,
          0.9
        ],
        "z": [
          0.1,
          0.9
        ]
      },
      "coordinateChart": "outer-cube-cartesian"
    },
    "centralVolumeSideLength": 0.8,
    "faceBufferMargin": 0.1,
    "scaleFactor": 1,
    "timeStepPolicy": "fixed",
    "sampleInterval": 0.01,
    "historyDepth": 10,
    "fieldSpeed": 1,
    "wakeHorizon": 10
  },
  "modelControls": {
    "coupling": 0.005
  },
  "population": {
    "centralArchitrinoCount": 3,
    "architrinoCount": 6,
    "bufferArchitrinoCount": 3,
    "maximumArchitrinoCount": 512,
    "countDerivation": {
      "formulaId": "N_calc=ceil(N_C*(1+2*b_face/L_C)^3)",
      "centralArchitrinoCount": 3,
      "centralVolumeSideLength": 0.8,
      "faceBufferMargin": 0.1,
      "exactPreCeiling": 5.859375,
      "roundedValue": 6
    }
  },
  "initialConditions": {
    "initialConditionFamily": "seeded-random",
    "initialConditionSeed": "borg-six-minimum-separation-random.v1",
    "electrinoCount": 3,
    "positrinoCount": 3,
    "polarityAssignmentSource": "seeded-balanced",
    "polaritySignConvention": "positrino-positive-electrino-negative",
    "positrinoCharge": 1,
    "electrinoCharge": -1,
    "velocityPolicy": "zero-initial-velocity",
    "initialLinePolicy": "seeded-random-interior-cube",
    "velocitySeed": "zero-initial-velocity",
    "minimumPairSeparation": 0.2,
    "randomVelocityMaxComponentMagnitude": 0,
    "randomVelocityMinSpeed": 0,
    "customEditStatus": "accepted"
  },
  "diagnostics": {
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
    "deploymentBudgetStatus": "missing-budget"
  },
  "renderManifests": [
    {
      "renderManifestId": "borg-eom-app-manifest:render-4k-uhd-placeholder",
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
    "proofClaimStatus": "not-proof-evidence"
  }
});

export const BORG_APP_SURFACE_DESIGN_V1 = deepFreeze({
  "schema": "borg-app-surface-design.v1",
  "screenSpecId": "borg-eom-first-screen",
  "appId": "borg-app",
  "claimLevel": "developer-test-screen-spec",
  "sourceManifest": {
    "schema": "borg-dataset-manifest.v1",
    "manifestId": "borg-eom-app-manifest",
    "claimLevel": "developer-test"
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
        "eom-run-frame-rows"
      ],
      "valueAuthority": "eom-shadow-output"
    },
    {
      "layer": "velocity-vectors",
      "state": "off",
      "sourceFields": [
        "eom-run-frame-rows"
      ],
      "displayTransform": "logarithmic-ray-length-when-enabled",
      "rawValueAuthority": "eom-shadow-output",
      "geometryAuthority": "app-facing-projection"
    },
    {
      "layer": "path-history",
      "state": "on",
      "sourceFields": [
        "eom-run-frame-rows"
      ],
      "displayTransform": "adjacent-native-row-line-segments",
      "smoothingPolicy": "none",
      "valueAuthority": "eom-shadow-output"
    },
    {
      "layer": "wake-streams",
      "state": "disabled",
      "sourceFields": [],
      "valueAuthority": "fail-closed-value",
      "firstFailureCode": "wake_history_gap_unclassified"
    },
    {
      "layer": "face-boundary-status",
      "state": "contextual-disabled",
      "sourceFields": [],
      "valueAuthority": "fail-closed-value",
      "firstFailureCode": "missing_face_crossing_coverage"
    },
    {
      "layer": "diagnostics",
      "state": "on-locked",
      "sourceFields": [
        "diagnostics.diagnosticStatusVocabulary"
      ],
      "valueAuthority": "fail-closed-value"
    },
    {
      "layer": "outbound-face-background",
      "state": "disabled",
      "sourceFields": [],
      "valueAuthority": "fail-closed-value",
      "firstFailureCode": "face_influence_model_missing"
    }
  ],
  "authorityMap": {
    "eomRunFrameRows": "eom-shadow-output",
    "centralCubeWireframe": "app-facing-projection",
    "outerComputedCubeOverlay": "app-facing-projection",
    "velocityRayGeometry": "app-facing-projection",
    "wakeStreams": "fail-closed-value",
    "faceBoundaryStatus": "fail-closed-value",
    "outboundFaceBackground": "fail-closed-value",
    "centralVolumeAcceleration": "fail-closed-value",
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
    "proofClaimStatus": "not-proof-evidence"
  }
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

export function validateBorgManifest({
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
  if (manifest.simulationEnvelope.fieldSpeed !== 1) {
    failures.push("Borg field speed is not canonical c_f=1");
  }
  if (!(manifest.modelControls?.coupling > 0)) {
    failures.push("Borg EOM coupling must be positive");
  }
  if (
    manifest.simulationEnvelope.wakeHorizon !==
    manifest.simulationEnvelope.fieldSpeed * manifest.simulationEnvelope.historyDepth
  ) {
    failures.push("Borg wake horizon does not equal fieldSpeed times historyDepth");
  }
  if (
    manifest.population.architrinoCount !==
    manifest.initialConditions.electrinoCount + manifest.initialConditions.positrinoCount
  ) {
    failures.push("population count does not match declared polarity counts");
  }
  if (manifest.population.maximumArchitrinoCount < manifest.population.architrinoCount) {
    failures.push("maximum population is smaller than the default population");
  }
  if (manifest.initialConditions.initialLinePolicy !== "seeded-random-interior-cube") {
    failures.push("seeded-random interior-cube initial layout policy is missing");
  }
  if (manifest.initialConditions.initialConditionSeed == null) {
    failures.push("seeded random initial condition seed is missing");
  }
  if (manifest.initialConditions.velocityPolicy !== "zero-initial-velocity") {
    failures.push("zero initial velocity policy is missing");
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
  if (manifest.initialConditions.randomVelocityMaxComponentMagnitude !== 0) {
    failures.push("default maximum velocity component is not zero");
  }
  if (manifest.initialConditions.randomVelocityMinSpeed !== 0) {
    failures.push("default minimum speed is not zero");
  }
  if (manifest.initialConditions.minimumPairSeparation !== 0.2) {
    failures.push("default minimum pair separation is not 0.2");
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
    throw new Error(`Invalid Borg app manifest: ${failures.join("; ")}`);
  }
  return true;
}

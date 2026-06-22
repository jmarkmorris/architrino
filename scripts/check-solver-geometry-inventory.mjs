#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const outputDir = path.join(rootDir, ".tmp", "solver-geometry-inventory");
const outputPath = path.join(outputDir, "solver-geometry-inventory.json");
const baselineSandboxFile = "scripts/check-solver-baseline-sandbox.mjs";
const baselineSandboxPath = path.join(rootDir, baselineSandboxFile);
const baselineSandboxContent = fs.existsSync(baselineSandboxPath)
  ? fs.readFileSync(baselineSandboxPath, "utf8")
  : "";

const migrationTargets = [
  {
    id: "photon-causal-roots",
    app: "Photon",
    local: {
      file: "src/apps/photon/PhotonFormulaRuntime.js",
      symbols: [
        "solvePhotonCausalRootsWithSolverBridge",
        "solvePhotonCausalRootsForSourceWithSolverBridge",
        "computePhotonDelayedEmissionFieldWithSolverBridge",
      ],
    },
    central: [
      {
        file: "src/apps/photon/PhotonFormulaRuntime.js",
        symbols: [
          "createPhotonCausalRootsSolverRunRequest",
          "runPhotonCausalRootsWithSolverBridge",
        ],
      },
      {
        file: "src/solver/app/SolverAppAdapters.mjs",
        symbols: ["createPhotonCausalRootsRunRequest"],
      },
      {
        file: "src/solver/app/SolverAppBridge.mjs",
        symbols: ["solveCausalRootsPrecisionF64", "runSimulation"],
      },
    ],
    solverOwnership: [
      "source-history sampling",
      "causal-root ledger rows",
      "residual and Jacobian diagnostics",
      "phase-at-hit diagnostics",
    ],
    baselineCases: [
      "photon-causal-root-smoke",
      "photon-causal-root-facade-smoke",
      "photon-causal-root-wasm-client-smoke",
      "photon-phase-diagnostics-smoke",
    ],
  },
  {
    id: "photon-circular-source-roots-hits-ledger",
    app: "Photon",
    local: {
      file: "src/apps/photon/PhotonFormulaRuntime.js",
      symbols: [
        "createPhotonCircularSourceCausalRootRequest",
        "solvePhotonCircularSourceRootsHitsLedgerWithSolverBridge",
      ],
    },
    central: [
      {
        file: "src/solver/app/SolverAppBridge.mjs",
        symbols: [
          "solveCircularSourceRootsHitsLedgerF64",
          "solveCircularSourceRootsHitsLedgerNormalizedF64",
        ],
      },
      {
        file: "src/contracts/solver-app-bridge/v1/schema.json",
        symbols: [
          "circularSourceRootRequest",
          "normalizedCircularSourceRootRequest",
        ],
      },
    ],
    solverOwnership: [
      "circular-source root isolation",
      "delayed-hit projection",
      "root-ledger detail rows",
      "large-coordinate normalized-frame handling",
    ],
    baselineCases: [
      "photon-circular-source-roots-hits-ledger-facade-smoke",
      "photon-circular-source-roots-hits-ledger-wasm-client-smoke",
      "photon-normalized-circular-source-roots-hits-ledger-smoke",
      "photon-normalized-circular-source-run-smoke",
    ],
  },
  {
    id: "ideal-braid-flight-time",
    app: "Ideal Braid",
    local: {
      file: "src/apps/ideal-braid/IdealBraidRuntime.js",
      symbols: [
        "createIdealBraidFlightTimeRunRequest",
        "solveFlightTimeRowWithSolverBridge",
        "computePotentialSamplesWithSolverBridge",
      ],
    },
    central: [
      {
        file: "src/solver/app/SolverAppAdapters.mjs",
        symbols: ["createIdealBraidSharedGeometryRunRequest"],
      },
      {
        file: "src/solver/app/SolverAppBridge.mjs",
        symbols: ["computeSharedGeometryF64", "computeDelayedPotentialsF64WithModule"],
      },
      {
        file: "src/contracts/solver-app-bridge/v1/schema.json",
        symbols: ["delayedPotentials"],
      },
    ],
    solverOwnership: [
      "delayed-potential path geometry",
      "source segment normalization",
      "shared geometry buffer output",
    ],
    baselineCases: [
      "ideal-braid-flight-time-smoke",
      "ideal-braid-flight-time-wasm-client-smoke",
    ],
  },
  {
    id: "ideal-braid-circular-self-hit-span",
    app: "Ideal Braid",
    local: {
      file: "src/apps/ideal-braid/IdealBraidPathPotentialProfile.js",
      symbols: [
        "createIdealBraidCircularSelfHitSpanRunRequest",
        "solveCircularSelfHitSpanRowWithSolverBridge",
        "solveCircularSelfHitSpanRowsWithSolverBridge",
      ],
    },
    central: [
      {
        file: "src/solver/app/SolverAppBridge.mjs",
        symbols: ["computeCircularSelfHitSpansF64WithModule"],
      },
      {
        file: "src/contracts/solver-app-bridge/v1/schema.json",
        symbols: ["circularSelfHitSpans"],
      },
    ],
    solverOwnership: [
      "field-speed regime classification",
      "circular self-hit span solving",
      "geometry profile row output",
    ],
    baselineCases: [
      "ideal-braid-geometry-smoke",
      "ideal-braid-self-hit-wasm-client-smoke",
    ],
  },
  {
    id: "animator-motion-dataset",
    app: "Animator",
    local: {
      file: "src/apps/animator/AnimatorSimulationWorkerCoreRuntime.js",
      symbols: [
        "runAnimatorSimulationWorkerRequestAsync",
        "runAnimatorSolverBridgeWorkerRequest",
        "runSolverBridgeClient",
        "createAnimatorDatasetFromSolverBridgeRun",
      ],
    },
    central: [
      {
        file: "src/solver/app/SolverAppBridgeClientResolver.mjs",
        symbols: ["runSolverAppBridgeRequest"],
      },
      {
        file: "src/apps/animator/AnimatorSolverBridgeWorkerRuntime.js",
        symbols: ["createAnimatorSolverBridgeWorkerOptions"],
      },
      {
        file: "src/solver/app/SolverAppAdapters.mjs",
        symbols: ["createAnimatorMotionSimulationRunRequest"],
      },
      {
        file: "src/solver/app/SolverAppBridge.mjs",
        symbols: ["motionSimulation", "sampleLinearMotionF64"],
      },
    ],
    solverOwnership: [
      "motion frame buffers",
      "path-history stream output",
      "dataset-level manifest and diagnostics",
    ],
    baselineCases: [
      "animator-causal-root-smoke",
      "animator-path-history-smoke",
      "animator-motion-dynamic-replay-smoke",
      "animator-worker-solver-bridge-smoke",
    ],
  },
  {
    id: "animator-delayed-hit-rows",
    app: "Animator",
    local: {
      file: "src/apps/animator/AnimatorDelayedHitRuntime.js",
      symbols: [
        "createAnimatorDelayedHitsFromSolverRows",
      ],
    },
    central: [
      {
        file: "src/solver/app/AnimatorDelayedHitRows.mjs",
        symbols: [
          "ANIMATOR_DELAYED_HIT_STREAM_DESCRIPTOR_SCHEMA",
          "ANIMATOR_RECEIVER_PATH_DESCRIPTOR_LAYOUT",
          "ANIMATOR_DELAYED_HIT_ROW_LAYOUT",
          "createAnimatorDelayedHitRowsFromStreamDescriptors",
          "path_segment.v1",
        ],
      },
      {
        file: "src/solver/app/AnimatorReceiverPathDescriptors.mjs",
        symbols: [
          "ANIMATOR_RECEIVER_PATH_DESCRIPTOR_PACKAGE_SCHEMA",
          "ANIMATOR_RECEIVER_PATH_DESCRIPTOR_LAYOUT",
          "createAnimatorReceiverPathDescriptorPackage",
        ],
      },
      {
        file: "tests/animator-delayed-hit-runtime.test.js",
        symbols: [
          "animator delayed-hit runtime consumes solver-owned path-history hit rows",
        ],
      },
      {
        file: "tests/animator-receiver-path-descriptors.test.js",
        symbols: [
          "animator receiver path descriptors derive path segments from source history",
          "animator delayed-hit rows consume solver-owned receiver descriptors",
        ],
      },
    ],
    solverOwnership: [
      "receiver path descriptor construction",
      "field-shell/path intersection solving",
      "delayed-hit row output",
      "Jacobian and branch-weight row fields",
    ],
    baselineCases: [
      "animator-path-history-smoke",
    ],
  },
  {
    id: "animator-field-shell-event-stream",
    app: "Animator",
    local: {
      file: "src/apps/architrino/ArchitrinoSceneAppRuntime.js",
      symbols: [
        "createAnimatorArchitrinoFieldShellEventPackage",
        "createAnimatorFieldShellEventStreamPackage",
      ],
    },
    central: [
      {
        file: "src/solver/app/AnimatorFieldShellEventStream.mjs",
        symbols: [
          "ANIMATOR_FIELD_SHELL_EVENT_STREAM_PACKAGE_SCHEMA",
          "ANIMATOR_FIELD_SHELL_CADENCE_DESCRIPTOR_SCHEMA",
          "ANIMATOR_FIELD_SHELL_EMITTER_SOURCE_HISTORY_SCHEMA",
          "ANIMATOR_FIELD_SHELL_EVENT_ROW_LAYOUT",
          "ANIMATOR_FIELD_SHELL_EVENT_NATIVE_FILE_MANIFEST_SCHEMA",
          "ANIMATOR_FIELD_SHELL_EVENT_ROW_SIZE_BYTES",
          "createAnimatorFieldShellCadenceTimes",
          "createAnimatorFieldShellEmitterSourceHistory",
          "createAnimatorFieldShellEventNativeFileStoragePolicy",
          "createAnimatorFieldShellEventStreamPackage",
          "field_shell_events.v1",
        ],
      },
      {
        file: "tests/animator-field-shell-event-stream.test.js",
        symbols: [
          "animator field-shell event package derives emitter source history",
          "animator field-shell event package feeds delayed-hit stream descriptors",
          "animator field-shell event package writes native-file stream storage",
        ],
      },
    ],
    solverOwnership: [
      "field-shell cadence generation",
      "field-shell emitter source-history sampling",
      "field-shell event row packaging",
      "field-shell event stream manifest metadata",
      "delayed-hit emission descriptor handoff",
    ],
    baselineCases: [
      "animator-path-history-smoke",
    ],
  },
];

const inventoryItems = migrationTargets.map(checkMigrationTarget);
const missing = inventoryItems.flatMap((item) => item.missing);
if (missing.length > 0) {
  for (const entry of missing) {
    console.error(`${entry.targetId}: missing ${entry.symbol} in ${entry.file}`);
  }
  process.exit(1);
}

const report = {
  schema: "solver-geometry-centralization-inventory.v1",
  migrationScope: {
    targets: ["Photon", "Ideal Braid", "Animator"],
  },
  generatedAt: new Date().toISOString(),
  items: inventoryItems.map(({ missing, ...item }) => item),
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(
  `solver geometry inventory check passed: ${inventoryItems.length} target(s), wrote ${path.relative(rootDir, outputPath)}`
);

function checkMigrationTarget(target) {
  const checks = [
    {
      role: "local",
      file: target.local.file,
      symbols: target.local.symbols,
    },
    ...target.central.map((entry) => ({
      role: "central",
      file: entry.file,
      symbols: entry.symbols,
    })),
  ];
  const missing = [];
  const files = [];
  for (const check of checks) {
    const absolutePath = path.join(rootDir, check.file);
    if (!fs.existsSync(absolutePath)) {
      missing.push({
        targetId: target.id,
        role: check.role,
        file: check.file,
        symbol: "<file>",
      });
      continue;
    }
    const content = fs.readFileSync(absolutePath, "utf8");
    const presentSymbols = [];
    for (const symbol of check.symbols) {
      if (content.includes(symbol)) {
        presentSymbols.push(symbol);
      } else {
        missing.push({
          targetId: target.id,
          role: check.role,
          file: check.file,
          symbol,
        });
      }
    }
    files.push({
      role: check.role,
      file: check.file,
      symbols: presentSymbols,
    });
  }
  for (const caseId of target.baselineCases) {
    if (!baselineSandboxContent.includes(`"${caseId}"`)) {
      missing.push({
        targetId: target.id,
        role: "baseline",
        file: baselineSandboxFile,
        symbol: caseId,
      });
    }
  }
  return {
    id: target.id,
    app: target.app,
    files,
    solverOwnership: target.solverOwnership,
    baselineCases: target.baselineCases,
    status: missing.length === 0 ? "inventoried" : "missing-symbols",
    missing,
  };
}

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
        "solvePhotonCausalRoots",
        "getPhotonCausalRootResidual",
        "pushPhotonRoot",
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
    id: "ideal-swarm-flight-time",
    app: "Ideal Swarm",
    local: {
      file: "src/apps/ideal-swarm/IdealSwarmRuntime.js",
      symbols: [
        "solveFlightTime",
        "createIdealSwarmFlightTimeRunRequest",
        "solveFlightTimeRowWithSolverBridge",
      ],
    },
    central: [
      {
        file: "src/solver/app/SolverAppAdapters.mjs",
        symbols: ["createIdealSwarmSharedGeometryRunRequest"],
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
      "ideal-swarm-flight-time-smoke",
      "ideal-swarm-flight-time-wasm-client-smoke",
    ],
  },
  {
    id: "ideal-swarm-circular-self-hit-span",
    app: "Ideal Swarm",
    local: {
      file: "src/apps/ideal-swarm/IdealSwarmPathPotentialProfile.js",
      symbols: [
        "solveCircularSelfHitSpan",
        "createIdealSwarmCircularSelfHitSpanRunRequest",
        "solveCircularSelfHitSpanRowWithSolverBridge",
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
      "ideal-swarm-geometry-smoke",
      "ideal-swarm-self-hit-wasm-client-smoke",
    ],
  },
  {
    id: "animator-motion-dataset",
    app: "Animator",
    local: {
      file: "src/apps/animator/AnimatorSimulationWorkerCoreRuntime.js",
      symbols: [
        "runAnimatorSimulationWorkerRequest",
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
    id: "assembly-dynamics-reference-engine",
    app: "Animator",
    local: {
      file: "scripts/simulations/lib/assembly-dynamics-solver.mjs",
      symbols: [
        "causal-delay Jacobian",
        "unresolved_roots",
        "self_hits",
        "partner_hits",
      ],
    },
    central: [
      {
        file: "src/solver/src/CausalRootSolver.cpp",
        symbols: ["jacobian", "branchWeight"],
      },
      {
        file: "src/solver/src/RootLedger.cpp",
        symbols: ["RootLedgerDetailRowF64"],
      },
      {
        file: "src/solver/src/InvariantChecks.cpp",
        symbols: ["delayed-hit"],
      },
    ],
    solverOwnership: [
      "branch-resolved causal-root accounting",
      "self and partner delayed-hit rows",
      "unresolved-root diagnostics",
      "Jacobian-weighted branch data",
    ],
    baselineCases: ["animator-causal-root-smoke", "animator-motion-dynamic-replay-smoke"],
  },
];

const excludedSurfaces = [
  {
    id: "sim2",
    path: "src/apps/sim2/orbits.py",
    policy: "animation-intent archive only",
    reason: "sim2 is not a migration target and should not receive a central-solver adapter.",
  },
  {
    id: "legacy-solver-families",
    policy: "separate maintenance or artifact exchange only",
    reason: "proof-program, mass-map, neutral-swarm, nested-shell, cosmology, and related solvers are outside central app migration.",
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
    targets: ["Photon", "Ideal Swarm", "Animator"],
    excluded: excludedSurfaces,
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

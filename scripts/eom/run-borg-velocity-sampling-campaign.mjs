#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const binaryPath = process.argv[2];
if (!binaryPath) {
  throw new Error("usage: run-borg-velocity-sampling-campaign.mjs <eom_borg_shadow_cli>");
}

const PROTOCOL = "borg-velocity-sampling-protocol.v1";
const POLICY = "stratified-empirical-magnitude-and-patch.v1";
const CALIBRATION_SEEDS = [101, 202, 303];
const HOLDOUT_SEEDS = [404, 505];
const SPEED_MIN = 0.2;
const SPEED_MAX = 0.8;
const TAIL_THRESHOLD = 0.7;
const PATH_COUNT = 6;
const LIMITS = Object.freeze({
  velocityDistributionResidual: 0.2,
  tailMassResidual: 0.1,
  correlationResidual: 0.15,
  seedVarianceResidual: 0.12,
  patchReplayResidual: 0.25,
  centralContributionResidual: 1e-3,
});

const runs = [...CALIBRATION_SEEDS, ...HOLDOUT_SEEDS].map(runSeed);
const calibrationRows = runs
  .filter((run) => CALIBRATION_SEEDS.includes(run.seed))
  .flatMap((run) => run.rows);
const holdoutRows = runs
  .filter((run) => HOLDOUT_SEEDS.includes(run.seed))
  .flatMap((run) => run.rows);
const replayRows = HOLDOUT_SEEDS.flatMap((seed) =>
  replayForTarget(calibrationRows, holdoutRows.filter((row) => row.seed === seed), seed));

const velocityDistributionResidual = relativeL2(
  speedHistogram(holdoutRows),
  speedHistogram(replayRows),
);
const tailMassResidual = Math.abs(tailMass(holdoutRows) - tailMass(replayRows));
const correlationResidual = Math.abs(
  correlation(holdoutRows.map((row) => row.speed), holdoutRows.map((row) => Math.abs(row.normalVelocity))) -
  correlation(replayRows.map((row) => row.speed), replayRows.map((row) => Math.abs(row.normalVelocity))),
);
const seedHistograms = Array.from({ length: 32 }, (_, index) =>
  speedHistogram(replayForTarget(calibrationRows, holdoutRows, 1000 + index)));
const seedVarianceResidual = Math.max(...transpose(seedHistograms).map(standardDeviation));
const patchReplayResidual = totalVariation(
  patchHistogram(holdoutRows),
  patchHistogram(replayRows),
);
const centralContributionResidual = relativeScalarResidual(
  mean(holdoutRows.map((row) => row.centralContributionMagnitude)),
  mean(replayRows.map((row) => row.centralContributionMagnitude)),
);

const residuals = {
  velocityDistributionResidual,
  tailMassResidual,
  correlationResidual,
  seedVarianceResidual,
  patchReplayResidual,
  centralContributionResidual,
};
const checks = Object.fromEntries(Object.entries(residuals).map(([key, value]) => [
  key,
  { value, limit: LIMITS[key], status: value <= LIMITS[key] ? "passed" : "failed" },
]));
const eomRowsReady = runs.every((run) =>
  run.status === "completed" &&
  run.coverageStatus === "boundary-shell-complete" &&
  run.unresolvedSegmentCount === 0 &&
  run.crossingCount === PATH_COUNT &&
  run.influenceCount === PATH_COUNT &&
  run.nativeResidualStatuses.every((status) => status === "passed"));
const holdoutPassed = eomRowsReady && Object.values(checks).every((row) => row.status === "passed");

const report = {
  schema: "borg-velocity-sampling-result.v1",
  resultId: "borg-velocity-sampling-result.2026-09-01.v1",
  protocolId: PROTOCOL,
  policyId: POLICY,
  claimGrade: "measured-bounded-eom-run-sampling-evidence",
  implementation: {
    script: "scripts/eom/run-borg-velocity-sampling-campaign.mjs",
    scriptSha256: sha256(readFileSync(new URL(import.meta.url))),
    binary: binaryPath,
    binarySha256: sha256(readFileSync(binaryPath)),
    eomProtocol: "EOM_BORG_NATIVE_V11",
    node: process.version,
    platform: process.platform,
    architecture: process.arch,
  },
  declaredRange: {
    minimumSpeed: SPEED_MIN,
    maximumSpeed: SPEED_MAX,
    fieldSpeed: 1,
    normalization: "c_f=1",
    speedBinEdges: speedBinEdges(),
    tailThreshold: TAIL_THRESHOLD,
  },
  split: {
    calibrationSeeds: CALIBRATION_SEEDS,
    holdoutSeeds: HOLDOUT_SEEDS,
    pathsPerSeed: PATH_COUNT,
    calibrationCrossingRows: calibrationRows.length,
    holdoutCrossingRows: holdoutRows.length,
  },
  eomRuns: runs.map(({ rows, ...run }) => ({
    ...run,
    speedMinimum: Math.min(...rows.map((row) => row.speed)),
    speedMaximum: Math.max(...rows.map((row) => row.speed)),
  })),
  policy: {
    source: "complete calibration shell-crossing rows only",
    generatedRowCount: replayRows.length,
    sourceTraceabilityComplete: replayRows.every((row) => row.replaySourceRowId != null),
    inventedVelocityCount: 0,
    sameRecordIdentityReuse: false,
  },
  checks,
  decision: {
    eomRowsReady,
    velocitySamplingResearchStatus: holdoutPassed ? "measured-within-budget" : "precision-insufficient",
    velocitySamplingHoldoutStatus: holdoutPassed ? "passed" : "failed",
    velocitySamplingSelectedPolicyId: holdoutPassed ? POLICY : null,
    benignNoiseStatus: holdoutPassed ? "measured-reduced-pass" : "fail-closed-residual",
    affectedValueAuthority: holdoutPassed ? "reduced-model-boundary" : "fail-closed-value",
  },
  independenceBoundary: "Holdout seeds are excluded from the calibration pool, but all rows use the same EOM executable and shell extractor; this is not an independent EOM-correctness oracle.",
  claimBoundary: "Measured bounded sampling-policy evidence over the declared EOM-run fixture range only. It establishes no unbounded constitutive distribution, retained dynamics, stability, binding, physical benign noise, or scientific acceptance.",
};

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);

function runSeed(seed) {
  const request = buildRequest(seed);
  const child = spawnSync(binaryPath, ["borg-shadow-v0"], {
    input: request,
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
    timeout: 120000,
  });
  if (child.status !== 0) {
    throw new Error(`EOM seed ${seed} failed (${child.signal ?? child.status}): ${child.stderr}`);
  }
  const response = JSON.parse(child.stdout);
  const products = response.wakeBoundaryProducts;
  const contributionByTransmitter = new Map();
  for (const row of products.accelerationContributionRows) {
    const magnitude = Math.hypot(...row.acceleration.map(intervalMidpoint));
    const values = contributionByTransmitter.get(row.transmitterPathId) ?? [];
    values.push(magnitude);
    contributionByTransmitter.set(row.transmitterPathId, values);
  }
  const rows = products.boundaryShell.shellCrossingRows.map((row) => {
    const velocity = row.velocity.map(intervalMidpoint);
    const contributions = contributionByTransmitter.get(row.pathId) ?? [];
    return {
      seed,
      rowId: row.rowId,
      pathId: row.pathId,
      surfacePatchId: row.surfacePatchId,
      timeBinId: row.timeBinId,
      polarity: Number(row.pathId.split("-").at(-1)) % 2 === 0 ? 1 : -1,
      speed: Math.hypot(...velocity),
      normalVelocity: intervalMidpoint(row.normalVelocityProjection),
      centralContributionMagnitude: mean(contributions),
      replaySourceRowId: null,
    };
  });
  return {
    seed,
    runId: response.runId,
    scientificProductSha256: sha256(JSON.stringify({
      status: response.status,
      acceptedEndTime: response.acceptedEndTime,
      wakeBoundaryProducts: response.wakeBoundaryProducts,
    })),
    status: response.status,
    acceptedEndTime: response.acceptedEndTime,
    acceptedStepCount: response.acceptedStepCount,
    rejectedStepCount: response.rejectedStepCount,
    haltCode: response.haltCode,
    coverageStatus: products.boundaryShell.coverageStatus,
    unresolvedSegmentCount: products.boundaryShell.coverageCounts.unresolvedSegmentCount,
    crossingCount: products.boundaryShell.shellCrossingRows.length,
    influenceCount: products.boundaryShell.shellInfluenceRows.filter((row) => row.mappingStatus === "path-derived-ready").length,
    nativeResidualStatuses: products.residualDecisions.map((row) => row.status),
    rows,
  };
}

function buildRequest(seed) {
  const random = prng(seed);
  const runId = `borg-velocity-sampling-${seed}`;
  const paths = Array.from({ length: PATH_COUNT }, (_, index) => {
    const direction = sphereDirection(index, PATH_COUNT, seed);
    const speed = SPEED_MIN + (SPEED_MAX - SPEED_MIN) * random();
    const position = direction.map((value) => 0.1 * value);
    const velocity = direction.map((value) => speed * value);
    const historyStart = -10;
    const historyStartPosition = position.map((value, axis) => value + historyStart * velocity[axis]);
    const coefficients = historyStartPosition.flatMap((value, axis) => [value, velocity[axis], 0, 0]);
    const polarity = index % 2 === 0 ? 1 : -1;
    return [
      `PATH\tpath-${index}\t${polarity}\t${polarity === 1 ? 1 : 2}\t0\t1`,
      ["SEG", historyStart, "5", ...coefficients, 0, 0, 0, 0, 0, 0].join("\t"),
    ];
  }).flat();
  const rows = [
    "EOM_BORG_NATIVE_V11",
    runRecord(runId),
    ...paths,
    ["BORG_SHELL_ENVELOPE", "eom_borg_shell_extraction_request/v1", "velocity-envelope", 0, 0, 0, 1, 0.5, 0.5, 5, 5, 0, "statistical-boundary-shell", "velocity-window", 0, 5, "central-window", 0, 0.1, 0.8, 2, 3, 1, "velocity-comparisons"].join("\t"),
    ["BORG_SHELL_PARTITION", "eom_borg_shell_partition/v1", "velocity-envelope", "velocity-partition", "equal-area-zphi/v1", 2, 4, 1, 0, 0, 0, 0].join("\t"),
    ["BORG_SHELL_TIME_BIN", "eom_borg_shell_time_bin/v1", "velocity-envelope", "velocity-bin-0", 0, 0, 2.5].join("\t"),
    ["BORG_SHELL_TIME_BIN", "eom_borg_shell_time_bin/v1", "velocity-envelope", "velocity-bin-1", 1, 2.5, 5].join("\t"),
    ["BORG_REPLAY_SOURCE", "eom_borg_boundary_shell_replay_source/v1", `velocity-replay-${seed}`, `velocity-summary-${seed}`, runId, seed, "rotation-tangent-chart/v1", "observed-bin-resample/v1", `velocity-result-${seed}`, "observed-polarity-inventory/v1", "new-inbound-identities/v1", "declared-path-index/v1", "reduced-model-boundary"].join("\t"),
  ];
  const specs = [
    ["self", "shell_self_similarity", "shell-statistic-component", "velocity-window", 0.05],
    ["replay", "shell_replay_residual", "shell-influence-component", "velocity-window", 0.01],
    ["central", "boundary_to_central_residual", "central-acceleration-component", "central-window", 0.001],
  ];
  for (const [id, label, domain, window, tolerance] of specs) {
    rows.push(["BORG_RESIDUAL_SPEC", "eom_borg_residual_spec/v1", "velocity-comparisons", id, label, domain, `reference-${seed}`, runId, window, "relative-weighted-l2/v1", tolerance, "1e-12", 1, "authoritative-solver-output", "reduced-model-boundary", 1].join("\t"));
  }
  specs.forEach(([id, label, domain], ordinal) => {
    const central = domain === "central-acceleration-component";
    rows.push(["BORG_RESIDUAL_SAMPLE", "eom_borg_paired_residual_sample/v1", "velocity-comparisons", id, `sample-${seed}-${ordinal}`, 0, `entity-${ordinal}`, central ? "NONE" : "velocity-partition:z0:phi0", central ? "NONE" : "velocity-bin-0", central ? "path-0" : "NONE", label === "shell_self_similarity" ? "NONE" : (central ? 0.05 : 2), "x", 1, 1, 1, 1, 1, 1, `reference-row-${ordinal}`, `boundary-row-${ordinal}`].join("\t"));
  });
  rows.push("END", "");
  return rows.join("\n");
}

function runRecord(runId) {
  return ["RUN", runId, 5, 5.001, 0.001, 0.000001, 0.001, 0, 1, 0.01, 0.2, "1e-10", "1e-8", 0, "1e-8", "1e-8", "1e-8", 2, 67108864, "borg_certified_budget/v1", "velocity-sampling-certified-v1", "0".repeat(64), "{}", 1, 1, "1e-30", 0.2, "1e-7", "1e-7", 0, 0.35, 0.15, 0.15, 0.15, 0.2, 0.5, 3, 128, 512, 256, 500000, 32, 200000, 24, 200000, 12, 1000, 100, "sharp_with_finite_width_fallback", "fixed-pairwise", "outward", "equal-routed-pair-weight/v1", "1e-8", "certified", PATH_COUNT, "none", 0, 0, 0, 0].join("\t");
}

function replayForTarget(calibration, target, seed) {
  const random = prng(seed);
  const byPatch = Map.groupBy(calibration, (row) => row.surfacePatchId);
  return target.map((targetRow) => {
    const pool = byPatch.get(targetRow.surfacePatchId) ?? calibration;
    const source = pool[Math.floor(random() * pool.length)];
    return { ...source, replaySourceRowId: source.rowId, targetPatchId: targetRow.surfacePatchId };
  });
}

function speedHistogram(rows) {
  const edges = speedBinEdges();
  const counts = Array(edges.length - 1).fill(0);
  rows.forEach((row) => {
    const index = Math.min(counts.length - 1, Math.max(0, Math.floor((row.speed - SPEED_MIN) / (SPEED_MAX - SPEED_MIN) * counts.length)));
    counts[index] += 1;
  });
  return counts.map((count) => count / rows.length);
}

function patchHistogram(rows) {
  const ids = Array.from({ length: 2 }, (_, z) => Array.from({ length: 4 }, (_, phi) => `velocity-partition:z${z}:phi${phi}`)).flat();
  return ids.map((id) => rows.filter((row) => (row.targetPatchId ?? row.surfacePatchId) === id).length / rows.length);
}

function speedBinEdges() {
  return Array.from({ length: 7 }, (_, index) => SPEED_MIN + (SPEED_MAX - SPEED_MIN) * index / 6);
}

function tailMass(rows) {
  return rows.filter((row) => row.speed >= TAIL_THRESHOLD).length / rows.length;
}

function relativeL2(reference, candidate) {
  const numerator = Math.sqrt(reference.reduce((sum, value, index) => sum + (candidate[index] - value) ** 2, 0));
  const denominator = Math.sqrt(reference.reduce((sum, value) => sum + value ** 2, 0)) + 1e-12;
  return numerator / denominator;
}

function totalVariation(left, right) {
  return 0.5 * left.reduce((sum, value, index) => sum + Math.abs(value - right[index]), 0);
}

function relativeScalarResidual(reference, candidate) {
  return Math.abs(candidate - reference) / (Math.abs(reference) + 1e-12);
}

function correlation(left, right) {
  const leftMean = mean(left);
  const rightMean = mean(right);
  const numerator = left.reduce((sum, value, index) => sum + (value - leftMean) * (right[index] - rightMean), 0);
  const denominator = Math.sqrt(left.reduce((sum, value) => sum + (value - leftMean) ** 2, 0) * right.reduce((sum, value) => sum + (value - rightMean) ** 2, 0));
  return denominator === 0 ? 0 : numerator / denominator;
}

function standardDeviation(values) {
  const average = mean(values);
  return Math.sqrt(mean(values.map((value) => (value - average) ** 2)));
}

function transpose(rows) {
  return rows[0].map((_, index) => rows.map((row) => row[index]));
}

function mean(values) {
  return values.length === 0 ? 0 : values.reduce((sum, value) => sum + value, 0) / values.length;
}

function intervalMidpoint(interval) {
  return (Number(interval.lower) + Number(interval.upper)) / 2;
}

function sphereDirection(index, count, seed) {
  const z = -0.8 + 1.6 * (index + 0.5) / count;
  const radius = Math.sqrt(1 - z * z);
  const phi = index * Math.PI * (3 - Math.sqrt(5)) + seed * 0.013;
  return [radius * Math.cos(phi), radius * Math.sin(phi), z];
}

function prng(seed) {
  let state = seed >>> 0;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 0x100000000;
  };
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

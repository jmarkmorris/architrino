#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "action-increment-mock.json");
const REQUIRED_CONVERGENCE_GATES = ["temporal", "history_resolution", "spatial", "cross_integrator"];
const TORQUE_KEYS = ["I", "M", "O", "wake_boundary"];
const FAILURE_CODES = [
  "input-hbar-contamination",
  "no-positive-increment-floor",
  "multi-cluster-action-scale",
  "nonpositive-floquet-gap",
  "phase-closure-open",
  "root-ledger-instability",
  "energy-ledger-open",
  "convergence-fail",
  "negative-control-fail",
  "benchmark-mismatch",
];

function parseArgs(argv) {
  const args = {
    input: DEFAULT_INPUT_PATH,
    out: null,
    pretty: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--input") {
      args.input = argv[++i];
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/tri-binary/action-increment-packet.mjs [options]

Options:
  --input PATH  Tri-binary action-increment input packet. Defaults to scripts/tri-binary/action-increment-mock.json
  --out PATH    Write JSON output to a file instead of stdout.
  --pretty      Pretty-print JSON output.
  --help        Show this help.

This emits the mock packet shape for the tri-binary action-increment protocol.
It computes projected Master-Equation increments, residual gates, failure codes,
cluster summaries, and promotion labels from a fixture. It is a packet scaffold,
not delayed-dynamics validation.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`${label} must be a finite number.`);
  }
  return number;
}

function vector3(value, label) {
  if (!Array.isArray(value) || value.length !== 3) {
    throw new Error(`${label} must be a length-3 vector.`);
  }
  return value.map((entry, index) => finiteNumber(entry, `${label}[${index}]`));
}

function add(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function standardDeviation(values) {
  const center = mean(values);
  const variance = values.reduce((sum, value) => sum + (value - center) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

function gate(status, value, threshold, failureCode) {
  return { status, value, threshold, failure_code: status === "pass" ? null : failureCode };
}

function threshold(input, key, fallback) {
  const thresholds = input.thresholds && typeof input.thresholds === "object" ? input.thresholds : {};
  return finiteNumber(thresholds[key] ?? fallback, `thresholds.${key}`);
}

function benchmarkPolicy(input) {
  return input.benchmark_policy && typeof input.benchmark_policy === "object"
    ? input.benchmark_policy
    : {};
}

function hbarContamination(input) {
  const policy = benchmarkPolicy(input);
  return [
    ["hbar_in_equations", policy.hbar_in_equations === true],
    ["hbar_in_transition_selection", policy.hbar_in_transition_selection === true],
    ["hbar_in_tolerances", policy.hbar_in_tolerances === true],
  ]
    .filter(([, contaminated]) => contaminated)
    .map(([key]) => key);
}

function computeTransitionRow(transition, input) {
  const axis = vector3(transition.transaction_axis, `${transition.id}.transaction_axis`);
  const torqueIntegrals = transition.torque_integrals && typeof transition.torque_integrals === "object"
    ? transition.torque_integrals
    : {};
  const vectors = Object.fromEntries(
    TORQUE_KEYS.map((key) => [key, vector3(torqueIntegrals[key], `${transition.id}.torque_integrals.${key}`)])
  );
  const vectorTotal = TORQUE_KEYS.reduce((total, key) => add(total, vectors[key]), [0, 0, 0]);
  const deltaIME = dot(axis, vectorTotal);

  const residuals = transition.residuals && typeof transition.residuals === "object"
    ? transition.residuals
    : {};
  const phaseResidual = finiteNumber(residuals.phase, `${transition.id}.residuals.phase`);
  const energyResidual = finiteNumber(residuals.energy, `${transition.id}.residuals.energy`);
  const rootResidual = finiteNumber(residuals.root, `${transition.id}.residuals.root`);
  const deltaNSelf = finiteNumber(transition.delta_N_self, `${transition.id}.delta_N_self`);
  const floquetGaps = transition.floquet_gaps && typeof transition.floquet_gaps === "object"
    ? transition.floquet_gaps
    : {};
  const floquetValues = Object.fromEntries(
    Object.entries(floquetGaps).map(([key, value]) => [key, finiteNumber(value, `${transition.id}.floquet_gaps.${key}`)])
  );
  const minFloquetGap = Math.min(...Object.values(floquetValues));

  const phaseMax = threshold(input, "phase_residual_max", Infinity);
  const energyMax = threshold(input, "energy_residual_max", Infinity);
  const rootMax = threshold(input, "root_residual_max", Infinity);
  const floquetMin = threshold(input, "floquet_gap_min", 0);

  const failureChecks = [
    [minFloquetGap > floquetMin, "nonpositive-floquet-gap"],
    [phaseResidual <= phaseMax, "phase-closure-open"],
    [Number.isInteger(deltaNSelf) && deltaNSelf % 2 === 0, "root-ledger-instability"],
    [rootResidual <= rootMax, "root-ledger-instability"],
    [energyResidual <= energyMax, "energy-ledger-open"],
    [Math.abs(deltaIME) > 0, "no-positive-increment-floor"],
  ];
  const failed = failureChecks.find(([passes]) => !passes);

  return {
    id: transition.id,
    branch_pair: transition.branch_pair ?? null,
    cluster_id: transition.cluster_id ?? null,
    delta_I_ME: deltaIME,
    delta_I_abs: Math.abs(deltaIME),
    projection_axis: axis,
    torque_integral_sum: vectorTotal,
    residuals: {
      phase: phaseResidual,
      energy: energyResidual,
      root: rootResidual,
    },
    delta_N_self: deltaNSelf,
    floquet_gaps: floquetValues,
    min_floquet_gap: minFloquetGap,
    status: failed ? "rejected" : "accepted",
    failure_code: failed ? failed[1] : null,
  };
}

function clusterSummary(rows, input) {
  const accepted = rows.filter((row) => row.status === "accepted");
  const epsilon0 = threshold(input, "epsilon_0", 1e-12);
  const byCluster = new Map();
  for (const row of accepted) {
    const key = row.cluster_id ?? "unclustered";
    if (!byCluster.has(key)) {
      byCluster.set(key, []);
    }
    byCluster.get(key).push(row);
  }

  return [...byCluster.entries()].map(([clusterId, clusterRows]) => {
    const values = clusterRows.map((row) => row.delta_I_ME);
    const center = mean(values);
    const std = standardDeviation(values);
    const deltaI = std / (Math.abs(center) + epsilon0);
    return {
      cluster_id: clusterId,
      accepted_count: clusterRows.length,
      transition_ids: clusterRows.map((row) => row.id),
      mean_delta_I_ME: center,
      std_delta_I_ME: std,
      delta_I_cluster: deltaI,
      delta_I_floor: Math.min(...clusterRows.map((row) => row.delta_I_abs)),
    };
  });
}

function convergenceGate(input) {
  const convergence = input.convergence && typeof input.convergence === "object" ? input.convergence : {};
  const requiredRows = REQUIRED_CONVERGENCE_GATES.map((key) => ({
    key,
    status: convergence[key]?.status ?? "missing",
    value: convergence[key] ?? null,
  }));
  const failedRows = requiredRows.filter((row) => row.status !== "pass");
  return gate(
    failedRows.length === 0 ? "pass" : "fail",
    requiredRows,
    "all required convergence rows pass",
    "convergence-fail"
  );
}

function negativeControlGate(input) {
  const convergence = input.convergence && typeof input.convergence === "object" ? input.convergence : {};
  const negativeControl = convergence.negative_control ?? null;
  return gate(
    negativeControl?.status === "pass" ? "pass" : "fail",
    negativeControl,
    "negative control breaks at least one required channel",
    "negative-control-fail"
  );
}

function evaluate(input, inputPath) {
  const transitions = Array.isArray(input.transitions) ? input.transitions : [];
  if (transitions.length === 0) {
    throw new Error("input.transitions must contain at least one transition.");
  }

  const rows = transitions.map((transition) => computeTransitionRow(transition, input));
  const acceptedRows = rows.filter((row) => row.status === "accepted");
  const clusters = clusterSummary(rows, input);
  const stableClusterThreshold = threshold(input, "cluster_delta_I_max", Infinity);
  const minAcceptedTransitions = threshold(input, "min_accepted_transitions", 1);
  const stableClusters = clusters.filter(
    (cluster) =>
      cluster.accepted_count >= minAcceptedTransitions &&
      cluster.delta_I_cluster <= stableClusterThreshold &&
      cluster.delta_I_floor > 0
  );
  const deltaIStar = stableClusters.length > 0
    ? Math.min(...stableClusters.map((cluster) => cluster.delta_I_floor))
    : null;
  const hAAA = deltaIStar === null ? null : 2 * Math.PI * deltaIStar;
  const benchmarkH = finiteNumber(benchmarkPolicy(input).benchmark_h ?? NaN, "benchmark_policy.benchmark_h");
  const deltaH = hAAA === null ? null : Math.abs((hAAA - benchmarkH) / benchmarkH);
  const deltaHMax = threshold(input, "delta_h_max", Infinity);
  const contamination = hbarContamination(input);
  const rejectedRows = rows.filter((row) => row.status === "rejected");
  const residualFailures = acceptedRows.filter((row) =>
    ["phase-closure-open", "root-ledger-instability", "energy-ledger-open"].includes(row.failure_code)
  );
  const floquetFailures = acceptedRows.filter((row) => row.failure_code === "nonpositive-floquet-gap");
  const uniqueStableScales = new Set(stableClusters.map((cluster) => cluster.delta_I_floor.toPrecision(12)));

  const gates = {
    input_hbar_contamination: gate(
      contamination.length === 0 ? "pass" : "fail",
      contamination,
      "no hbar-seeded equations, transition selection, or tolerances",
      "input-hbar-contamination"
    ),
    positive_increment_floor: gate(
      deltaIStar !== null && Number.isFinite(deltaIStar) && deltaIStar > 0 ? "pass" : "fail",
      deltaIStar,
      "0 < delta_I_star < Infinity from a stable accepted cluster",
      "no-positive-increment-floor"
    ),
    floquet_gap: gate(
      floquetFailures.length === 0 ? "pass" : "fail",
      floquetFailures.map((row) => row.id),
      "all accepted candidates have positive Floquet gap",
      "nonpositive-floquet-gap"
    ),
    residuals: gate(
      residualFailures.length === 0 ? "pass" : "fail",
      residualFailures.map((row) => ({ id: row.id, failure_code: row.failure_code })),
      "phase, root, and energy residuals pass declared tolerances",
      residualFailures[0]?.failure_code ?? "phase-closure-open"
    ),
    cluster_stability: gate(
      stableClusters.length > 0 ? "pass" : "fail",
      clusters,
      `at least one cluster has ${minAcceptedTransitions} accepted rows and delta_I <= ${stableClusterThreshold}`,
      "multi-cluster-action-scale"
    ),
    single_increment_scale: gate(
      uniqueStableScales.size <= 1 ? "pass" : "fail",
      [...uniqueStableScales],
      "one stable increment floor among accepted clusters",
      "multi-cluster-action-scale"
    ),
    convergence: convergenceGate(input),
    negative_control: negativeControlGate(input),
    benchmark_reporting: gate(
      deltaH !== null && Number.isFinite(deltaH) ? "pass" : "fail",
      deltaH,
      "delta_h is reported after delta_I_star is computed",
      "benchmark-mismatch"
    ),
    benchmark_match: gate(
      deltaH !== null && deltaH <= deltaHMax ? "pass" : "fail",
      deltaH,
      deltaHMax,
      "benchmark-mismatch"
    ),
  };

  const coreGateNames = [
    "input_hbar_contamination",
    "positive_increment_floor",
    "floquet_gap",
    "residuals",
    "cluster_stability",
    "single_increment_scale",
    "convergence",
    "negative_control",
    "benchmark_reporting",
  ];
  const firstFailedCoreGate = coreGateNames
    .map((name) => gates[name])
    .find((entry) => entry.status !== "pass");
  const firstFailedGate = Object.values(gates).find((entry) => entry.status !== "pass");
  const promotionStatus = firstFailedCoreGate
    ? "mock_packet_rejected"
    : gates.benchmark_match.status === "pass"
      ? "mock_candidate_h_recovery_shape_pass"
      : "mock_candidate_action_increment_shape_pass";

  return {
    schema: "tri-binary-action-increment-result/v1",
    input_path: path.relative(process.cwd(), inputPath),
    metadata: input.metadata ?? {},
    protocol: {
      source: input.metadata?.source ?? null,
      required_packet_files: input.required_packet_files ?? [],
      failure_code_enum: FAILURE_CODES,
    },
    benchmark_policy: benchmarkPolicy(input),
    transition_rows: rows,
    accepted_transition_count: acceptedRows.length,
    rejected_transition_count: rejectedRows.length,
    cluster_summary: clusters,
    selected_increment: {
      delta_I_star: deltaIStar,
      h_AAA: hAAA,
      benchmark_h: benchmarkH,
      delta_h: deltaH,
    },
    gates,
    failure_code: firstFailedGate ? firstFailedGate.failure_code : null,
    promotion_status: promotionStatus,
    note:
      "This is a mock packet-emission scaffold for the tri-binary action-increment protocol. Passing it proves the packet shape, residual fields, failure codes, and promotion-gate wiring can be emitted; it does not validate delayed dynamics or derive the Planck benchmark.",
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const inputPath = path.resolve(args.input);
  const input = readJson(inputPath);
  const result = evaluate(input, inputPath);
  const output = JSON.stringify(result, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(args.out, `${output}\n`);
  } else {
    console.log(output);
  }
}

main();

#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "action-increment-mock.json");
const REQUIRED_CONVERGENCE_GATES = ["temporal", "history_resolution", "spatial", "cross_integrator"];
const TORQUE_KEYS = ["I", "M", "O", "wake_boundary"];
const REQUIRED_PACKET_FILES = [
  "campaign.json",
  "branch_pairs.csv",
  "state_vectors.json",
  "root_ledger_before_after.json",
  "torque_integrals.csv",
  "action_increment_rows.csv",
  "energy_ledger.csv",
  "phase_closure_residuals.csv",
  "floquet_report.json",
  "cluster_summary.json",
  "convergence_table.csv",
  "negative_control_report.md",
  "promotion_gate.md",
];
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
    packetDir: null,
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
    } else if (arg === "--packet-dir") {
      args.packetDir = argv[++i];
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
  --packet-dir PATH
                Read a protocol packet directory instead of a single JSON input.
  --out PATH    Write JSON output to a file instead of stdout.
  --pretty      Pretty-print JSON output.
  --help        Show this help.

This emits the mock packet shape for the tri-binary action-increment protocol.
It computes projected Master-Equation increments, residual gates, failure codes,
cluster summaries, and promotion labels from a fixture or packet directory. It
is a packet scaffold, not delayed-dynamics validation.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function readTextIfExists(filePath) {
  return fileExists(filePath) ? fs.readFileSync(filePath, "utf8") : null;
}

function readJsonIfExists(filePath) {
  return fileExists(filePath) ? readJson(filePath) : null;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === "\"") {
      if (inQuotes && next === "\"") {
        cell += "\"";
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        i += 1;
      }
      row.push(cell);
      if (row.some((entry) => entry.trim() !== "")) {
        rows.push(row);
      }
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell);
  if (row.some((entry) => entry.trim() !== "")) {
    rows.push(row);
  }
  if (rows.length === 0) {
    return [];
  }

  const headers = rows[0].map((header) => header.trim());
  return rows
    .slice(1)
    .filter((cells) => cells.some((entry) => entry.trim() !== "") && !cells[0].trim().startsWith("#"))
    .map((cells) =>
      Object.fromEntries(headers.map((header, index) => [header, (cells[index] ?? "").trim()]))
    );
}

function readCsvIfExists(filePath) {
  const text = readTextIfExists(filePath);
  return text === null ? [] : parseCsv(text);
}

function finiteNumber(value, label) {
  if (value === undefined || value === null || value === "") {
    throw new Error(`${label} must be a finite number.`);
  }
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`${label} must be a finite number.`);
  }
  return number;
}

function optionalFiniteNumber(value, label) {
  if (value === undefined || value === null || value === "") {
    return null;
  }
  return finiteNumber(value, label);
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

function firstPresent(object, keys) {
  for (const key of keys) {
    if (object && object[key] !== undefined && object[key] !== null && object[key] !== "") {
      return object[key];
    }
  }
  return null;
}

function normalizeTransitionStatus(value) {
  const status = String(value ?? "").trim().toLowerCase();
  if (status === "accepted" || status === "accept" || status === "pass") {
    return "accepted";
  }
  if (status === "rejected" || status === "reject" || status === "fail" || status === "failed") {
    return "rejected";
  }
  return null;
}

function indexRowsById(rows) {
  return new Map(rows.filter((row) => row.id).map((row) => [row.id, row]));
}

function rowsFromJson(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (Array.isArray(value?.rows)) {
    return value.rows;
  }
  if (Array.isArray(value?.transitions)) {
    return value.transitions;
  }
  if (Array.isArray(value?.transition_rows)) {
    return value.transition_rows;
  }
  return [];
}

function vectorFromRow(row, keys, label) {
  if (keys.some((key) => row?.[key] === undefined || row[key] === "")) {
    return null;
  }
  return keys.map((key) => finiteNumber(row[key], `${label}.${key}`));
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
  const directDelta = optionalFiniteNumber(transition.delta_I_ME, `${transition.id}.delta_I_ME`);
  const axis = transition.transaction_axis
    ? vector3(transition.transaction_axis, `${transition.id}.transaction_axis`)
    : null;
  const torqueIntegrals = transition.torque_integrals && typeof transition.torque_integrals === "object"
    ? transition.torque_integrals
    : {};
  const hasTorqueVectors = TORQUE_KEYS.every((key) => Array.isArray(torqueIntegrals[key]));
  if (directDelta === null && (!hasTorqueVectors || axis === null)) {
    throw new Error(`${transition.id} must provide delta_I_ME or torque vectors plus transaction_axis.`);
  }
  const vectors = hasTorqueVectors
    ? Object.fromEntries(
      TORQUE_KEYS.map((key) => [key, vector3(torqueIntegrals[key], `${transition.id}.torque_integrals.${key}`)])
    )
    : null;
  const vectorTotal = vectors
    ? TORQUE_KEYS.reduce((total, key) => add(total, vectors[key]), [0, 0, 0])
    : null;
  const deltaIME = directDelta ?? dot(axis, vectorTotal);

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
  if (Object.keys(floquetValues).length === 0 && transition.min_floquet_gap !== undefined) {
    floquetValues.minimum = finiteNumber(transition.min_floquet_gap, `${transition.id}.min_floquet_gap`);
  }
  if (Object.keys(floquetValues).length === 0) {
    throw new Error(`${transition.id}.floquet_gaps must contain at least one finite gap.`);
  }
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
  const declaredStatus = normalizeTransitionStatus(transition.status);
  const declaredFailureCode = transition.failure_code && FAILURE_CODES.includes(transition.failure_code)
    ? transition.failure_code
    : null;
  const status = failed || declaredStatus === "rejected" ? "rejected" : "accepted";
  const failureCode = status === "accepted" ? null : failed?.[1] ?? declaredFailureCode ?? "phase-closure-open";

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
    declared_status: declaredStatus,
    status,
    failure_code: failureCode,
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

function packetFileCoverage(packetDir, requiredFiles) {
  return requiredFiles.map((file) => {
    const filePath = path.join(packetDir, file);
    return {
      file,
      exists: fileExists(filePath),
      path: path.relative(process.cwd(), filePath),
    };
  });
}

function convergenceFromRows(rows) {
  return Object.fromEntries(
    rows
      .map((row) => {
        const key = firstPresent(row, ["gate", "check", "key"]);
        if (!key) {
          return null;
        }
        const maxRelativeShift = optionalFiniteNumber(
          firstPresent(row, ["max_relative_shift", "value"]),
          `convergence_table.${key}.max_relative_shift`
        );
        const thresholdValue = optionalFiniteNumber(
          firstPresent(row, ["threshold", "tolerance"]),
          `convergence_table.${key}.threshold`
        );
        return [
          key,
          {
            status: firstPresent(row, ["status"]) ?? "missing",
            max_relative_shift: maxRelativeShift,
            threshold: thresholdValue,
            note: firstPresent(row, ["note", "reason"]) ?? null,
          },
        ];
      })
      .filter(Boolean)
  );
}

function promotionGateSummary(text) {
  if (text === null) {
    return null;
  }
  const lines = text.split(/\r?\n/).filter((line) => line.trim() !== "");
  return {
    first_line: lines[0] ?? "",
    line_count: lines.length,
    byte_length: Buffer.byteLength(text, "utf8"),
  };
}

function packetRows(packetDir) {
  const actionRows = readCsvIfExists(path.join(packetDir, "action_increment_rows.csv"));
  const torqueRows = indexRowsById(readCsvIfExists(path.join(packetDir, "torque_integrals.csv")));
  const phaseRows = indexRowsById(readCsvIfExists(path.join(packetDir, "phase_closure_residuals.csv")));
  const energyRows = indexRowsById(readCsvIfExists(path.join(packetDir, "energy_ledger.csv")));
  const rootLedger = readJsonIfExists(path.join(packetDir, "root_ledger_before_after.json"));
  const floquetReport = readJsonIfExists(path.join(packetDir, "floquet_report.json"));
  const rootRows = indexRowsById(rowsFromJson(rootLedger));
  const floquetRows = indexRowsById(rowsFromJson(floquetReport));

  return actionRows.map((row) => {
    const id = firstPresent(row, ["id", "transition_id"]);
    if (!id) {
      throw new Error("action_increment_rows.csv rows must include id or transition_id.");
    }
    const torqueRow = torqueRows.get(id) ?? {};
    const phaseRow = phaseRows.get(id) ?? {};
    const energyRow = energyRows.get(id) ?? {};
    const rootRow = rootRows.get(id) ?? {};
    const floquetRow = floquetRows.get(id) ?? {};
    const torqueIntegrals = {};
    const torqueVectors = {
      I: vectorFromRow(torqueRow, ["I_x", "I_y", "I_z"], `torque_integrals.${id}.I`),
      M: vectorFromRow(torqueRow, ["M_x", "M_y", "M_z"], `torque_integrals.${id}.M`),
      O: vectorFromRow(torqueRow, ["O_x", "O_y", "O_z"], `torque_integrals.${id}.O`),
      wake_boundary: vectorFromRow(
        torqueRow,
        ["wake_boundary_x", "wake_boundary_y", "wake_boundary_z"],
        `torque_integrals.${id}.wake_boundary`
      ) ?? vectorFromRow(torqueRow, ["wake_x", "wake_y", "wake_z"], `torque_integrals.${id}.wake`)
    };
    for (const [key, value] of Object.entries(torqueVectors)) {
      if (value) {
        torqueIntegrals[key] = value;
      }
    }
    const axis = vectorFromRow(
      torqueRow,
      ["axis_x", "axis_y", "axis_z"],
      `torque_integrals.${id}.axis`
    );
    const phaseResidual = optionalFiniteNumber(
      firstPresent(row, ["phase_residual", "R_phase"]) ??
        firstPresent(phaseRow, ["phase_residual", "R_phase", "residual"]),
      `${id}.phase_residual`
    );
    const energyResidual = optionalFiniteNumber(
      firstPresent(row, ["energy_residual", "R_E"]) ??
        firstPresent(energyRow, ["energy_residual", "R_E", "residual"]),
      `${id}.energy_residual`
    );
    const rootResidual = optionalFiniteNumber(
      firstPresent(row, ["root_residual", "R_root"]) ??
        firstPresent(rootRow, ["root_residual", "R_root", "active_root_mismatch"]),
      `${id}.root_residual`
    );
    const deltaNSelf = optionalFiniteNumber(
      firstPresent(row, ["delta_N_self"]) ?? firstPresent(rootRow, ["delta_N_self"]),
      `${id}.delta_N_self`
    );
    const floquetGaps = {
      from: optionalFiniteNumber(
        firstPresent(row, ["floquet_from", "floquet_gap_from"]) ??
          firstPresent(floquetRow, ["from", "floquet_from", "floquet_gap_from"]),
        `${id}.floquet_from`
      ),
      to: optionalFiniteNumber(
        firstPresent(row, ["floquet_to", "floquet_gap_to"]) ??
          firstPresent(floquetRow, ["to", "floquet_to", "floquet_gap_to"]),
        `${id}.floquet_to`
      ),
      continuation: optionalFiniteNumber(
        firstPresent(row, ["floquet_continuation", "floquet_gap_continuation"]) ??
          firstPresent(floquetRow, ["continuation", "floquet_continuation", "floquet_gap_continuation"]),
        `${id}.floquet_continuation`
      ),
    };
    for (const key of Object.keys(floquetGaps)) {
      if (floquetGaps[key] === null) {
        delete floquetGaps[key];
      }
    }

    return {
      id,
      cluster_id: firstPresent(row, ["cluster_id", "cluster"]) ?? null,
      branch_pair: {
        from: firstPresent(row, ["branch_from", "from"]) ?? null,
        to: firstPresent(row, ["branch_to", "to"]) ?? null,
      },
      delta_I_ME: optionalFiniteNumber(firstPresent(row, ["delta_I_ME", "delta_i_me"]), `${id}.delta_I_ME`),
      min_floquet_gap: optionalFiniteNumber(
        firstPresent(row, ["min_floquet_gap"]) ?? firstPresent(floquetRow, ["min_floquet_gap"]),
        `${id}.min_floquet_gap`
      ),
      status: firstPresent(row, ["status", "accepted_status"]),
      failure_code: firstPresent(row, ["failure_code"]),
      transaction_axis: axis,
      torque_integrals: Object.keys(torqueIntegrals).length === TORQUE_KEYS.length ? torqueIntegrals : undefined,
      residuals: {
        phase: phaseResidual,
        energy: energyResidual,
        root: rootResidual,
      },
      delta_N_self: deltaNSelf,
      floquet_gaps: floquetGaps,
    };
  });
}

function inputFromPacketDir(packetDir) {
  const resolvedDir = path.resolve(packetDir);
  const campaignPath = path.join(resolvedDir, "campaign.json");
  const campaign = readJson(campaignPath);
  const requiredFiles = Array.isArray(campaign.required_packet_files)
    ? campaign.required_packet_files
    : REQUIRED_PACKET_FILES;
  const clusterSummary = readJsonIfExists(path.join(resolvedDir, "cluster_summary.json"));
  const convergenceRows = readCsvIfExists(path.join(resolvedDir, "convergence_table.csv"));
  const promotionGate = readTextIfExists(path.join(resolvedDir, "promotion_gate.md"));
  const transitions = packetRows(resolvedDir);

  return {
    schema: "tri-binary-action-increment-input/v1",
    source_mode: "packet-dir",
    packet_dir: path.relative(process.cwd(), resolvedDir),
    metadata: {
      ...(campaign.metadata ?? {}),
      run_id: campaign.run_id ?? campaign.metadata?.run_id ?? path.basename(resolvedDir),
      artifact: campaign.artifact ?? "tri-binary-action-increment-packet",
      status: "packet-directory-adapter",
      description: campaign.description ?? "Protocol packet directory adapted into the action-increment result schema.",
      source: campaign.source ?? campaign.metadata?.source ?? "content/markdown/aaa/validation/simulations/tri-binary-action-increment-protocol.md",
    },
    benchmark_policy: campaign.benchmark_policy ?? {},
    thresholds: campaign.thresholds ?? campaign.tolerances ?? {},
    required_packet_files: requiredFiles,
    convergence: {
      ...(campaign.convergence ?? {}),
      ...convergenceFromRows(convergenceRows),
    },
    transitions,
    packet_artifacts: {
      packet_dir: path.relative(process.cwd(), resolvedDir),
      file_coverage: packetFileCoverage(resolvedDir, requiredFiles),
      parsed_rows: {
        action_increment_rows: transitions.length,
        convergence_table: convergenceRows.length,
      },
      declared_cluster_summary: clusterSummary,
      promotion_gate: promotionGateSummary(promotionGate),
    },
  };
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
  const statusPrefix = input.source_mode === "packet-dir" ? "packet" : "mock";
  const promotionStatus = firstFailedCoreGate
    ? `${statusPrefix}_packet_rejected`
    : gates.benchmark_match.status === "pass"
      ? `${statusPrefix}_candidate_h_recovery_shape_pass`
      : `${statusPrefix}_candidate_action_increment_shape_pass`;

  return {
    schema: "tri-binary-action-increment-result/v1",
    input_path: path.relative(process.cwd(), inputPath),
    source_mode: input.source_mode ?? "input-json",
    metadata: input.metadata ?? {},
    protocol: {
      source: input.metadata?.source ?? null,
      required_packet_files: input.required_packet_files ?? REQUIRED_PACKET_FILES,
      packet_file_coverage: input.packet_artifacts?.file_coverage ?? null,
      failure_code_enum: FAILURE_CODES,
    },
    benchmark_policy: benchmarkPolicy(input),
    packet_artifacts: input.packet_artifacts ?? null,
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
      "This is a packet-emission scaffold for the tri-binary action-increment protocol. Passing it proves the packet shape, residual fields, failure codes, and promotion-gate wiring can be emitted; it does not validate delayed dynamics or derive the Planck benchmark.",
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  if (args.packetDir && args.input !== DEFAULT_INPUT_PATH) {
    throw new Error("--packet-dir and --input cannot be used together.");
  }
  const inputPath = path.resolve(args.packetDir ?? args.input);
  const input = args.packetDir ? inputFromPacketDir(inputPath) : readJson(inputPath);
  const result = evaluate(input, inputPath);
  const output = JSON.stringify(result, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(args.out, `${output}\n`);
  } else {
    console.log(output);
  }
}

main();

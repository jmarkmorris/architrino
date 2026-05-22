#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "fixtures", "a0-tier0-branch-search-minimal.json");
const DEFAULT_OUT_DIR = path.join("/tmp", "nested-shell-swarm-action-increment-produced-packet");
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
const LAYERS = ["I", "M", "O"];

function parseArgs(argv) {
  const args = {
    input: DEFAULT_INPUT_PATH,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    maxTransitions: Infinity,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--input") {
      args.input = argv[++i];
    } else if (arg === "--out-dir") {
      args.outDir = argv[++i];
    } else if (arg === "--max-transitions") {
      args.maxTransitions = Number(argv[++i]);
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (!Number.isFinite(args.maxTransitions) || args.maxTransitions < 1) {
    args.maxTransitions = Infinity;
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/nested-shell-swarm/action-increment-packet-producer.mjs [options]

Options:
  --input PATH          A0 Tier 0 branch-search JSON. Defaults to scripts/nested-shell-swarm/fixtures/a0-tier0-branch-search-minimal.json
  --out-dir PATH        Packet directory to write. Defaults to /tmp/nested-shell-swarm-action-increment-produced-packet
  --max-transitions N   Stop after N adjacent branch-pair rows.
  --pretty             Pretty-print JSON files.
  --help               Show this help.

This converts reduced branch-search rows into the nested shell swarm action-increment
packet layout. Reduced Tier 0 rows do not carry delayed torque integrals,
Floquet gaps, or energy-history closure, so generated action rows are rejected
diagnostic rows. The output is a packet-shape scaffold, not validation.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value, pretty) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`);
}

function csvCell(value) {
  if (value === null || value === undefined) {
    return "";
  }
  const text = String(value);
  return /[",\n\r]/.test(text) ? `"${text.replaceAll("\"", "\"\"")}"` : text;
}

function writeCsv(filePath, headers, rows) {
  const lines = [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(",")),
  ];
  fs.writeFileSync(filePath, `${lines.join("\n")}\n`);
}

function finiteOrNull(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function residualValue(candidate, key) {
  return finiteOrNull(candidate.residuals?.[key]?.value) ?? finiteOrNull(candidate.residual_values?.[key]);
}

function maxResidual(left, right, key, fallback) {
  const values = [residualValue(left, key), residualValue(right, key)].filter((value) => value !== null);
  return values.length > 0 ? Math.max(...values) : fallback;
}

function branchId(candidate) {
  return `A0_row_${candidate.row ?? "unknown"}`;
}

function winding(candidate, layer) {
  return candidate.branch_label?.k?.[layer] ?? candidate.closure_labels?.k?.[layer] ?? null;
}

function qLabel(candidate, key) {
  return candidate.branch_label?.q?.[key] ?? candidate.closure_labels?.q?.[key] ?? null;
}

function deltaQNorm(left, right) {
  const deltas = ["IM", "MO", "IO"]
    .map((key) => [qLabel(left, key), qLabel(right, key)])
    .filter(([a, b]) => typeof a === "number" && typeof b === "number")
    .map(([a, b]) => b - a);
  if (deltas.length === 0) {
    return null;
  }
  return Math.sqrt(deltas.reduce((sum, value) => sum + value * value, 0));
}

function deltaNSelf(left, right) {
  const leftSelf = left.root_ledger?.byRelation?.self ?? left.closure_labels?.activeRootClasses?.self;
  const rightSelf = right.root_ledger?.byRelation?.self ?? right.closure_labels?.activeRootClasses?.self;
  if (typeof leftSelf !== "number" || typeof rightSelf !== "number") {
    return 0;
  }
  return rightSelf - leftSelf;
}

function transitionRows(candidates, maxTransitions) {
  const rows = [];
  for (let index = 0; index < candidates.length - 1 && rows.length < maxTransitions; index += 1) {
    const left = candidates[index];
    const right = candidates[index + 1];
    const id = `${branchId(left)}__to__${branchId(right)}`;
    rows.push({
      id,
      left,
      right,
      branch_from: branchId(left),
      branch_to: branchId(right),
      cluster_id: "tier0-reduced-diagnostic",
      diagnostic_delta_q_norm: deltaQNorm(left, right),
      phase_residual: maxResidual(left, right, "phase", 1),
      root_residual: maxResidual(left, right, "root", 1),
      energy_residual: maxResidual(left, right, "energy", 1),
      delta_N_self: deltaNSelf(left, right),
      status: "rejected",
      failure_code: "nonpositive-floquet-gap",
      note:
        "Rejected because Tier 0 reduced branch rows do not contain delayed torque integrals, Floquet gaps, or energy-history closure.",
    });
  }
  return rows;
}

function packetMetadata(input, inputPath) {
  return {
    schema: "nested-shell-swarm-action-increment-campaign/v1",
    run_id: `tier0-produced-${Date.now()}`,
    artifact: "nested-shell-swarm-action-increment-packet",
    description: "Packet directory produced from reduced A0 Tier 0 branch-search rows.",
    source: "content/markdown/aaa/validation/simulations/nested-shell-swarm-action-increment-protocol.md",
    source_artifact: input.metadata?.artifact ?? "a0-tier0-branch-search",
    source_status: input.metadata?.status ?? null,
    source_input: path.relative(process.cwd(), inputPath),
    source_note: input.metadata?.note ?? null,
    benchmark_policy: {
      hbar_in_equations: false,
      hbar_in_transition_selection: false,
      hbar_in_tolerances: false,
      benchmark_role: "post_run_comparison_only",
      benchmark_h: 6.283185307179586,
    },
    thresholds: {
      phase_residual_max: input.tolerances?.phase ?? 0.02,
      energy_residual_max: 0.01,
      root_residual_max: input.tolerances?.root ?? 0.000001,
      cluster_delta_I_max: 0.02,
      delta_h_max: 0.05,
      floquet_gap_min: 0,
      min_accepted_transitions: 2,
      epsilon_0: 1e-12,
    },
    required_packet_files: REQUIRED_PACKET_FILES,
    producer_policy: {
      status: "diagnostic-shape-only",
      reason:
        "The source is a reduced carrier certificate scaffold. It cannot supply Master-Equation torque integrals or Floquet basin-robustness gaps.",
      generated_rows_are_validation: false,
    },
  };
}

function writePacket({ input, inputPath, outDir, pretty, maxTransitions }) {
  const candidates = Array.isArray(input.candidates) ? input.candidates : [];
  if (candidates.length < 2) {
    throw new Error("Input must contain at least two branch-search candidates.");
  }
  const transitions = transitionRows(candidates, maxTransitions);
  fs.mkdirSync(outDir, { recursive: true });

  writeJson(path.join(outDir, "campaign.json"), packetMetadata(input, inputPath), pretty);

  writeCsv(
    path.join(outDir, "branch_pairs.csv"),
    [
      "id",
      "branch_from",
      "branch_to",
      "cluster_id",
      "winding_from_I",
      "winding_from_M",
      "winding_from_O",
      "winding_to_I",
      "winding_to_M",
      "winding_to_O",
      "diagnostic_delta_q_norm",
      "status",
      "failure_code",
    ],
    transitions.map((row) => ({
      id: row.id,
      branch_from: row.branch_from,
      branch_to: row.branch_to,
      cluster_id: row.cluster_id,
      winding_from_I: winding(row.left, "I"),
      winding_from_M: winding(row.left, "M"),
      winding_from_O: winding(row.left, "O"),
      winding_to_I: winding(row.right, "I"),
      winding_to_M: winding(row.right, "M"),
      winding_to_O: winding(row.right, "O"),
      diagnostic_delta_q_norm: row.diagnostic_delta_q_norm,
      status: row.status,
      failure_code: row.failure_code,
    }))
  );

  writeJson(
    path.join(outDir, "state_vectors.json"),
    {
      schema: "nested-shell-swarm-action-increment-produced-state-vectors/v1",
      source: "a0-tier0-branch-search",
      rows: transitions.map((row) => ({
        id: row.id,
        branch_from: row.branch_from,
        branch_to: row.branch_to,
        transaction_axis: [0, 0, 1],
        from_state_vector: row.left.state_vector ?? null,
        to_state_vector: row.right.state_vector ?? null,
        from_geometry: row.left.geometry ?? null,
        to_geometry: row.right.geometry ?? null,
        status: "diagnostic-source-only",
      })),
    },
    pretty
  );

  writeJson(
    path.join(outDir, "root_ledger_before_after.json"),
    {
      schema: "nested-shell-swarm-action-increment-produced-root-ledger/v1",
      rows: transitions.map((row) => ({
        id: row.id,
        before: row.left.root_ledger ?? row.left.closure_labels?.activeRootClasses ?? null,
        after: row.right.root_ledger ?? row.right.closure_labels?.activeRootClasses ?? null,
        delta_N_self: row.delta_N_self,
        root_residual: row.root_residual,
        active_root_mismatch: row.root_residual,
        note: row.note,
      })),
    },
    pretty
  );

  writeCsv(
    path.join(outDir, "torque_integrals.csv"),
    [
      "id",
      "I_x",
      "I_y",
      "I_z",
      "M_x",
      "M_y",
      "M_z",
      "O_x",
      "O_y",
      "O_z",
      "wake_boundary_x",
      "wake_boundary_y",
      "wake_boundary_z",
      "axis_x",
      "axis_y",
      "axis_z",
      "status",
      "note",
    ],
    transitions.map((row) => ({
      id: row.id,
      I_x: 0,
      I_y: 0,
      I_z: 0,
      M_x: 0,
      M_y: 0,
      M_z: 0,
      O_x: 0,
      O_y: 0,
      O_z: 0,
      wake_boundary_x: 0,
      wake_boundary_y: 0,
      wake_boundary_z: 0,
      axis_x: 0,
      axis_y: 0,
      axis_z: 1,
      status: "not_computed_in_tier0",
      note: row.note,
    }))
  );

  writeCsv(
    path.join(outDir, "action_increment_rows.csv"),
    [
      "id",
      "branch_from",
      "branch_to",
      "cluster_id",
      "delta_I_ME",
      "status",
      "failure_code",
      "phase_residual",
      "energy_residual",
      "root_residual",
      "delta_N_self",
      "floquet_from",
      "floquet_to",
      "floquet_continuation",
      "note",
    ],
    transitions.map((row) => ({
      id: row.id,
      branch_from: row.branch_from,
      branch_to: row.branch_to,
      cluster_id: row.cluster_id,
      delta_I_ME: 0,
      status: row.status,
      failure_code: row.failure_code,
      phase_residual: row.phase_residual,
      energy_residual: row.energy_residual,
      root_residual: row.root_residual,
      delta_N_self: row.delta_N_self,
      floquet_from: 0,
      floquet_to: 0,
      floquet_continuation: 0,
      note: row.note,
    }))
  );

  writeCsv(
    path.join(outDir, "energy_ledger.csv"),
    ["id", "energy_residual", "status", "note"],
    transitions.map((row) => ({
      id: row.id,
      energy_residual: row.energy_residual,
      status: "fail",
      note: "Energy-history closure is not computed in the reduced Tier 0 branch-search source.",
    }))
  );

  writeCsv(
    path.join(outDir, "phase_closure_residuals.csv"),
    ["id", "phase_residual", "status", "note"],
    transitions.map((row) => ({
      id: row.id,
      phase_residual: row.phase_residual,
      status: "diagnostic",
      note: "Phase residual is inherited from reduced carrier closure, not from an accepted transition.",
    }))
  );

  writeJson(
    path.join(outDir, "floquet_report.json"),
    {
      schema: "nested-shell-swarm-action-increment-produced-floquet-report/v1",
      rows: transitions.map((row) => ({
        id: row.id,
        from: 0,
        to: 0,
        continuation: 0,
        status: "not_computed_in_tier0",
        failure_code_if_used: "nonpositive-floquet-gap",
        note: row.note,
      })),
    },
    pretty
  );

  writeJson(
    path.join(outDir, "cluster_summary.json"),
    {
      schema: "nested-shell-swarm-action-increment-produced-cluster-summary/v1",
      cluster_summary: [],
      selected_increment: {
        delta_I_star: null,
        h_AAA: null,
        benchmark_h: 6.283185307179586,
        delta_h: null,
      },
      promotion_status: "diagnostic_packet_rejected",
      note:
        "No action-increment cluster is promoted because the source lacks delayed torque integrals and Floquet continuation data.",
    },
    pretty
  );

  writeCsv(
    path.join(outDir, "convergence_table.csv"),
    ["gate", "status", "max_relative_shift", "threshold", "note"],
    [
      {
        gate: "temporal",
        status: "fail",
        note: "No temporal refinement of action increments is computed in the reduced source.",
      },
      {
        gate: "history_resolution",
        status: "fail",
        note: "No action-increment history-resolution refinement is computed in the reduced source.",
      },
      {
        gate: "spatial",
        status: "fail",
        note: "No spatial/extraction refinement of action increments is computed in the reduced source.",
      },
      {
        gate: "cross_integrator",
        status: "fail",
        note: "No cross-integrator action-increment comparison is computed in the reduced source.",
      },
      {
        gate: "negative_control",
        status: "fail",
        note: "No negative control was run by the reduced packet producer.",
      },
    ]
  );

  fs.writeFileSync(
    path.join(outDir, "negative_control_report.md"),
    [
      "# Negative Control Report",
      "",
      "Status: not run.",
      "",
      "The packet was produced from reduced Tier 0 branch-search rows. It does not include a null-run or wrong-dynamics control, so the promotion gate must remain closed.",
      "",
    ].join("\n")
  );

  fs.writeFileSync(
    path.join(outDir, "promotion_gate.md"),
    [
      "# Promotion Gate",
      "",
      "Status: diagnostic packet rejected.",
      "",
      "Strongest claim authorized: reduced branch-search rows can be arranged into the action-increment packet shape. The packet does not validate delayed dynamics, derive a nonzero Master-Equation action increment, or recover the Planck benchmark.",
      "",
    ].join("\n")
  );

  return {
    packet_dir: path.relative(process.cwd(), outDir),
    transitions_written: transitions.length,
    required_packet_files: REQUIRED_PACKET_FILES,
    promotion_status: "diagnostic_packet_rejected",
    note:
      "Generated packet rows are intentionally rejected because reduced Tier 0 branch-search output lacks real delayed torque integrals, Floquet gaps, and energy-history closure.",
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const inputPath = path.resolve(args.input);
  const outDir = path.resolve(args.outDir);
  const input = readJson(inputPath);
  const summary = writePacket({
    input,
    inputPath,
    outDir,
    pretty: args.pretty,
    maxTransitions: args.maxTransitions,
  });
  console.log(JSON.stringify(summary, null, args.pretty ? 2 : 0));
}

main();

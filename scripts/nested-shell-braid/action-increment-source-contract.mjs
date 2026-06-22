#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const REQUIRED_HISTORY_VALIDATION_FLAGS = [
  "root_ledger_stable_under_refinement",
  "residuals_below_tolerance",
  "speed_ordering_retained",
  "no_secular_center_drift",
  "Delta_k_positive",
  "same_branch_persists_across_eta_ladder",
  "benchmark_inputs_excluded",
];
const REQUIRED_HISTORY_STRUCTURE_FLAGS = [
  "status_is_accepted_history_segment",
  "source_row_identity_matches",
  "sample_count_at_least_two",
  "samples_ordered_by_t",
  "samples_cover_cycle",
  "samples_cover_all_delayed_source_times",
  "all_required_body_states_present",
  "body_state_vectors_finite",
  "active_root_labels_valid",
  "active_root_delays_finite_nonnegative",
  "active_root_J_finite",
];
const REQUIRED_CONVERGENCE_GATES = [
  "temporal",
  "history_resolution",
  "spatial",
  "cross_integrator",
  "negative_control",
];
const TORQUE_KEYS = ["I", "M", "O", "wake_boundary"];
const ROOT_RELATIONS = ["partner", "self", "inter_layer"];

function parseArgs(argv) {
  const args = {
    input: null,
    out: null,
    pretty: false,
    printContract: false,
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
    } else if (arg === "--print-contract") {
      args.printContract = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/nested-shell-braid/action-increment-source-contract.mjs [options]

Options:
  --input PATH       Prospective nested shell braid action-increment source JSON.
  --print-contract  Print the required Tier 1 source contract without checking an input.
  --out PATH         Write JSON output to a file instead of stdout.
  --pretty           Pretty-print JSON output.
  --help             Show this help.

This checks whether a source artifact is rich enough to produce accepted
nested shell braid action-increment rows. It is a contract checker only; it does not
integrate delayed dynamics and it does not validate an action increment.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function finiteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function finiteVector3(value) {
  return Array.isArray(value) && value.length === 3 && value.every(finiteNumber);
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function getPath(value, pathExpression) {
  return pathExpression.split(".").reduce((cursor, key) => cursor?.[key], value);
}

function addIssue(issues, pathExpression, requirement, failureCode) {
  issues.push({ path: pathExpression, requirement, failure_code: failureCode });
}

function gate(status, issues) {
  return {
    status,
    issue_count: issues.length,
    issues,
  };
}

function contract() {
  return {
    schema: "nested-shell-braid-action-increment-source-contract/v1",
    purpose:
      "Minimum accepted Tier 1/Tier 2 source needed before action-increment rows may be promoted.",
    required_top_level_fields: [
      "metadata",
      "accepted_branch_states",
      "transitions",
      "convergence.rows",
      "negative_control",
    ],
    accepted_branch_state: {
      required_status: "accepted_history_segment or accepted_tier1_continuation",
      required_validation_flags: [
        ...REQUIRED_HISTORY_STRUCTURE_FLAGS,
        ...REQUIRED_HISTORY_VALIDATION_FLAGS,
      ],
      required_root_relations: ROOT_RELATIONS,
      required_payloads: [
        "branch_label",
        "z_lambda",
        "period",
        "samples",
        "active_causal_root_ledger",
      ],
    },
    transition: {
      required_fields: [
        "from_state_id",
        "to_state_id",
        "transition_window",
        "transaction_axis",
        "torque_integrals.I",
        "torque_integrals.M",
        "torque_integrals.O",
        "torque_integrals.wake_boundary",
        "residuals.phase",
        "residuals.energy",
        "residuals.root",
        "delta_N_self",
        "floquet_gaps.from",
        "floquet_gaps.to",
        "floquet_gaps.continuation",
        "energy_ledger",
        "root_ledger_before",
        "root_ledger_after",
      ],
      acceptance_boundary:
        "Each transition must compute Delta I_ME from delayed-dynamics torque integrals and must not seed the transition size or selection from hbar.",
    },
    convergence: {
      required_gates: REQUIRED_CONVERGENCE_GATES,
      required_result: "all gates pass; negative control must break an invariant or provenance/stability channel",
    },
    benchmark_policy: {
      hbar_in_equations: false,
      hbar_in_transition_selection: false,
      hbar_in_tolerances: false,
      benchmark_role: "post_run_comparison_only",
    },
  };
}

function acceptedStateId(state, index) {
  return state.id ?? state.row ?? `state_${index}`;
}

function checkBenchmarkPolicy(source) {
  const issues = [];
  const policy = source.metadata?.benchmark_policy ?? source.benchmark_policy ?? {};
  for (const key of ["hbar_in_equations", "hbar_in_transition_selection", "hbar_in_tolerances"]) {
    if (policy[key] !== false) {
      addIssue(
        issues,
        `metadata.benchmark_policy.${key}`,
        "must be explicitly false",
        "input-hbar-contamination"
      );
    }
  }
  if (policy.benchmark_role !== "post_run_comparison_only") {
    addIssue(
      issues,
      "metadata.benchmark_policy.benchmark_role",
      "must be post_run_comparison_only",
      "input-hbar-contamination"
    );
  }
  return gate(issues.length === 0 ? "pass" : "fail", issues);
}

function checkAcceptedBranchStates(source) {
  const issues = [];
  const states = Array.isArray(source.accepted_branch_states) ? source.accepted_branch_states : [];
  if (states.length === 0) {
    addIssue(
      issues,
      "accepted_branch_states",
      "must include at least two accepted branch states before transitions can be formed",
      "accepted-history-source-missing"
    );
  }

  const acceptedIds = new Set();
  states.forEach((state, index) => {
    const base = `accepted_branch_states[${index}]`;
    const status = state.status;
    if (!["accepted_history_segment", "accepted_tier1_continuation", "tier1_continuation_accepted"].includes(status)) {
      addIssue(
        issues,
        `${base}.status`,
        "must be an accepted Tier 1 continuation or accepted history segment",
        "accepted-history-validation-incomplete"
      );
    } else {
      acceptedIds.add(String(acceptedStateId(state, index)));
    }
    if (!isObject(state.branch_label)) {
      addIssue(issues, `${base}.branch_label`, "required accepted-branch label is missing", "accepted-history-source-missing");
    }
    if (!isObject(state.z_lambda)) {
      addIssue(issues, `${base}.z_lambda`, "required quotient-coordinate row is missing", "accepted-history-source-missing");
    }
    if (!finiteNumber(state.period)) {
      addIssue(issues, `${base}.period`, "required accepted period must be finite", "accepted-history-source-missing");
    }
    if (!Array.isArray(state.samples)) {
      addIssue(issues, `${base}.samples`, "required accepted history samples are missing", "accepted-history-source-missing");
    }
    if (!Array.isArray(state.active_causal_root_ledger)) {
      addIssue(
        issues,
        `${base}.active_causal_root_ledger`,
        "required active causal-root ledger is missing",
        "root-ledger-instability"
      );
    }
    for (const flag of [...REQUIRED_HISTORY_STRUCTURE_FLAGS, ...REQUIRED_HISTORY_VALIDATION_FLAGS]) {
      if (state.validation?.[flag] !== true) {
        addIssue(
          issues,
          `${base}.validation.${flag}`,
          "required accepted-history validation flag must be true",
          "accepted-history-validation-incomplete"
        );
      }
    }
    for (const relation of ROOT_RELATIONS) {
      if (state.validation?.active_root_relations_present?.[relation] !== true) {
        addIssue(
          issues,
          `${base}.validation.active_root_relations_present.${relation}`,
          "accepted root ledger must include this relation class",
          "root-ledger-instability"
        );
      }
    }
  });

  return { ...gate(issues.length === 0 ? "pass" : "fail", issues), accepted_ids: [...acceptedIds] };
}

function checkTransition(transition, index, acceptedIds) {
  const issues = [];
  const base = `transitions[${index}]`;
  if (!acceptedIds.has(String(transition.from_state_id))) {
    addIssue(issues, `${base}.from_state_id`, "must reference an accepted branch state", "accepted-history-source-missing");
  }
  if (!acceptedIds.has(String(transition.to_state_id))) {
    addIssue(issues, `${base}.to_state_id`, "must reference an accepted branch state", "accepted-history-source-missing");
  }
  if (!Array.isArray(transition.transition_window) || transition.transition_window.length !== 2) {
    addIssue(issues, `${base}.transition_window`, "must be a two-entry time interval", "phase-closure-open");
  }
  if (!finiteVector3(transition.transaction_axis)) {
    addIssue(issues, `${base}.transaction_axis`, "must be a finite three-vector", "phase-closure-open");
  }
  for (const key of TORQUE_KEYS) {
    if (!finiteVector3(transition.torque_integrals?.[key])) {
      addIssue(
        issues,
        `${base}.torque_integrals.${key}`,
        "must be a finite delayed-dynamics torque or wake-boundary vector",
        "no-positive-increment-floor"
      );
    }
  }
  for (const key of ["phase", "energy", "root"]) {
    if (!finiteNumber(transition.residuals?.[key])) {
      const failureCode = {
        phase: "phase-closure-open",
        energy: "energy-ledger-open",
        root: "root-ledger-instability",
      }[key];
      addIssue(issues, `${base}.residuals.${key}`, "must be a finite residual", failureCode);
    }
  }
  if (!Number.isInteger(transition.delta_N_self) || transition.delta_N_self % 2 !== 0) {
    addIssue(
      issues,
      `${base}.delta_N_self`,
      "must be an even integer self-root parity change",
      "root-ledger-instability"
    );
  }
  for (const key of ["from", "to", "continuation"]) {
    if (!finiteNumber(transition.floquet_gaps?.[key]) || transition.floquet_gaps[key] <= 0) {
      addIssue(issues, `${base}.floquet_gaps.${key}`, "must be positive", "nonpositive-floquet-gap");
    }
  }
  for (const key of ["energy_ledger", "root_ledger_before", "root_ledger_after"]) {
    if (!isObject(transition[key])) {
      addIssue(issues, `${base}.${key}`, "must be present as an object", "energy-ledger-open");
    }
  }
  if (transition.provenance?.hbar_seeded === true) {
    addIssue(issues, `${base}.provenance.hbar_seeded`, "must not seed the transition from hbar", "input-hbar-contamination");
  }
  return issues;
}

function checkTransitions(source, acceptedIds) {
  const transitions = Array.isArray(source.transitions) ? source.transitions : [];
  const issues = [];
  if (transitions.length === 0) {
    addIssue(issues, "transitions", "must include at least one candidate branch transition", "no-positive-increment-floor");
  }
  transitions.forEach((transition, index) => {
    issues.push(...checkTransition(transition, index, acceptedIds));
  });
  return gate(issues.length === 0 ? "pass" : "fail", issues);
}

function checkConvergence(source) {
  const issues = [];
  const rows = Array.isArray(source.convergence?.rows) ? source.convergence.rows : [];
  for (const gateName of REQUIRED_CONVERGENCE_GATES) {
    const row = rows.find((entry) => entry.gate === gateName || entry.key === gateName);
    if (!row) {
      addIssue(issues, `convergence.rows.${gateName}`, "required convergence gate row is missing", "convergence-fail");
    } else if (row.status !== "pass") {
      addIssue(issues, `convergence.rows.${gateName}.status`, "required convergence gate must pass", "convergence-fail");
    }
  }
  return gate(issues.length === 0 ? "pass" : "fail", issues);
}

function checkNegativeControl(source) {
  const issues = [];
  const control = source.negative_control ?? {};
  if (control.status !== "pass") {
    addIssue(issues, "negative_control.status", "negative-control pipeline gate must pass", "negative-control-fail");
  }
  if (!control.broken_channel && !control.reason) {
    addIssue(
      issues,
      "negative_control.broken_channel",
      "must name the invariant, provenance, or stability channel broken by the null run",
      "negative-control-fail"
    );
  }
  return gate(issues.length === 0 ? "pass" : "fail", issues);
}

function evaluate(source, inputPath) {
  const benchmark = checkBenchmarkPolicy(source);
  const acceptedStates = checkAcceptedBranchStates(source);
  const transitions = checkTransitions(source, new Set(acceptedStates.accepted_ids));
  const convergence = checkConvergence(source);
  const negativeControl = checkNegativeControl(source);
  const gates = {
    benchmark_policy: benchmark,
    accepted_branch_states: acceptedStates,
    transitions,
    convergence,
    negative_control: negativeControl,
  };
  const allIssues = Object.values(gates).flatMap((entry) => entry.issues);
  return {
    schema: "nested-shell-braid-action-increment-source-contract-report/v1",
    input_path: inputPath ? path.relative(process.cwd(), inputPath) : null,
    status: allIssues.length === 0 ? "pass" : "fail",
    issue_count: allIssues.length,
    gates,
    contract: contract(),
    note:
      "This is a source-contract check only. Passing it means a source has the fields needed to produce action-increment packet rows; it does not validate delayed dynamics or derive the Planck benchmark.",
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  if (!args.input && !args.printContract) {
    throw new Error("Pass --input PATH or --print-contract.");
  }
  const inputPath = args.input ? path.resolve(args.input) : null;
  const output = args.printContract ? contract() : evaluate(readJson(inputPath), inputPath);
  const serialized = JSON.stringify(output, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(args.out, `${serialized}\n`);
  } else {
    console.log(serialized);
  }
}

main();

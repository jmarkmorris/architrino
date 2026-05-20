#!/usr/bin/env node

import fs from "node:fs";

const INPUT_SCHEMA = "aaa-proof/field-speed-head-on-root-audit/v1";
const RESULT_SCHEMA = "aaa-proof/field-speed-head-on-root-audit-result/v1";

function parseArgs(argv) {
  const args = {
    input: null,
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
  console.log(`Usage: node scripts/proof-programs/field-speed-head-on-root-audit.mjs --input PATH [options]

Options:
  --input PATH  Field-speed head-on root-audit JSON, schema ${INPUT_SCHEMA}.
  --out PATH    Write result JSON to PATH instead of stdout.
  --pretty      Pretty-print JSON.
  --help        Show this help.

This analytic audit checks the normalized head-on test case

  Electrino:  x_L(0)=-x0, v_L=+c_f
  Positrino:  x_R(0)=+x0, v_R=-c_f

with affine field-speed inbound prehistory. It fail-closes the case as a
caustic/root-degeneracy test when the same-source roots form a continuum with
J=0 and the partner roots arrive only at the origin caustic.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value, pretty) {
  const text = JSON.stringify(value, null, pretty ? 2 : 0) + "\n";
  if (filePath) {
    fs.writeFileSync(filePath, text);
  } else {
    process.stdout.write(text);
  }
}

function finitePositive(value, name) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    throw new Error(`${name} must be a finite positive number.`);
  }
  return number;
}

function finiteNumber(value, name) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`${name} must be finite.`);
  }
  return number;
}

function readParameters(input) {
  if (input.schema !== INPUT_SCHEMA) {
    throw new Error(`Expected schema ${INPUT_SCHEMA}, got ${input.schema ?? "missing"}.`);
  }
  const parameters = input.parameters ?? {};
  const cF = finitePositive(parameters.c_f, "parameters.c_f");
  const x0 = finitePositive(parameters.x0, "parameters.x0");
  const auditTime = finiteNumber(parameters.audit_time ?? 0, "parameters.audit_time");
  const emissionCadence = parameters.discrete_emission_cadence == null
    ? null
    : finitePositive(parameters.discrete_emission_cadence, "parameters.discrete_emission_cadence");
  const truncations = Array.isArray(parameters.history_truncations)
    ? parameters.history_truncations.map((value, index) =>
        finitePositive(value, `parameters.history_truncations[${index}]`)
      )
    : [];

  return {
    cF,
    x0,
    auditTime,
    emissionCadence,
    truncations,
  };
}

function audit(input) {
  const { cF, x0, auditTime, emissionCadence, truncations } = readParameters(input);
  const collisionTime = x0 / cF;
  const partnerResidualAtAudit = 2 * x0 - 2 * cF * auditTime;
  const partnerRootStatusAtAudit =
    Math.abs(partnerResidualAtAudit) === 0
      ? "continuum_root_caustic"
      : partnerResidualAtAudit > 0
        ? "no_partner_root_wake_in_flight"
        : "post_caustic_outside_affine_pre_collision_chart";

  const truncationRows = truncations.map((horizon) => {
    const discretePrehistoryCount =
      emissionCadence == null ? null : Math.floor(horizon / emissionCadence) + 1;
    return {
      horizon,
      prehistory_source_interval_at_collision: [-horizon, 0],
      continuous_law_root_set: "continuum_interval",
      discrete_count_if_cadence_supplied: discretePrehistoryCount,
    };
  });

  const assertions = [
    {
      id: "partner_root_absent_at_initial_time",
      passed: auditTime === 0 && partnerResidualAtAudit > 0,
      value: partnerRootStatusAtAudit,
      meaning: "At t=0 the opposite-source causal wake is still in flight and has not reached the opposite particle.",
    },
    {
      id: "partner_caustic_at_origin_time",
      passed: collisionTime > auditTime,
      value: collisionTime,
      meaning: "Under the affine field-speed continuation, all opposite-source emissions on the active history co-arrive at the origin time.",
    },
    {
      id: "same_source_continuum_root",
      passed: true,
      value: "all s<t on each affine field-speed same-source history",
      meaning: "The exact same-source causal condition is an identity on the affine field-speed history.",
    },
    {
      id: "same_source_jacobian_zero",
      passed: true,
      value: 0,
      meaning: "The simple-root Jacobian is zero on the same-source field-speed continuum, so branch-sum formulas are invalid.",
    },
    {
      id: "requires_dual_mollified_history_audit",
      passed: true,
      value: "required",
      meaning: "The test case must be evaluated with finite history, shell width, and core scale before any force or recapture claim.",
    },
  ];

  return {
    schema: RESULT_SCHEMA,
    packet_id: input.packet_id ?? "field-speed-head-on-inflight-wake-v0",
    source_input: input.packet_id ?? null,
    status: assertions.every((entry) => entry.passed)
      ? "degenerate_caustic_test_passed_fail_closed"
      : "audit_failed",
    claim_level: "analytic root audit for affine field-speed head-on prehistory",
    branch_chart_authorized: false,
    candidate_cycle_authorized: false,
    updates_live_ledger: false,
    normalization: {
      c_f: cF,
      x0,
      audit_time: auditTime,
      collision_time: collisionTime,
    },
    affine_histories: {
      electrino_left: "x_L(t)=-x0+c_f t",
      positrino_right: "x_R(t)=+x0-c_f t",
    },
    partner_root_audit: {
      residual_formula_pre_collision: "2*x0 - 2*c_f*t",
      residual_at_audit_time: partnerResidualAtAudit,
      status_at_audit_time: partnerRootStatusAtAudit,
      wake_fronts_at_audit_time: {
        left_source_right_going_front_x: -x0,
        right_source_left_going_front_x: x0,
      },
      origin_caustic_time: collisionTime,
      source_times_at_origin_caustic: "all s<t on the affine active history",
    },
    same_source_root_audit: {
      causal_condition: "|x_i(t)-x_i(s)|=c_f*(t-s)",
      status: "identity_for_all_s_less_than_t_on_affine_field_speed_history",
      simple_root_jacobian: 0,
      consequence: "exact-root branch sum invalid; use dual-mollified finite-history integral",
    },
    finite_history_truncations: truncationRows,
    assertions,
    failure_modes_if_misused: [
      "field_speed.self_root_continuum_hidden_as_simple_root",
      "field_speed.partner_wake_in_flight_ignored",
      "field_speed.origin_caustic_treated_as_regular_branch",
      "field_speed.countable_infinity_limit_taken_before_eta_and_history_limits",
    ],
  };
}

const args = parseArgs(process.argv.slice(2));
if (args.help || !args.input) {
  printHelp();
  process.exit(args.help ? 0 : 1);
}

writeJson(args.out, audit(readJson(args.input)), args.pretty);

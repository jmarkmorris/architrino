#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_DYNAMICS_HANDOFF_SCHEMA,
  buildOctahedralFoldAwareDynamicsHandoff,
  validateOctahedralFoldAwareDynamicsHandoff,
} from "./octahedral-fold-aware-dynamics-handoff.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_SPEED_PRIMITIVE_EXISTENCE_SCHEMA =
  "neutral-braid-octahedral-fold-aware-speed-primitive-existence/v1";

const PACKET_ID = "octahedral_fold_aware_speed_primitive_existence";
const PROMOTION_STATUS = "priority-only";

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  const rounded = Number(value.toFixed(12));
  return Math.abs(rounded) < 5e-13 ? 0 : rounded;
}

export function buildOctahedralFoldAwareSpeedPrimitiveExistence(options = {}) {
  const gammaSymbol = options.gammaSymbol ?? "Gamma_B^nu";
  const handoff = buildOctahedralFoldAwareDynamicsHandoff(options);
  const handoffErrors = validateOctahedralFoldAwareDynamicsHandoff(handoff);
  const speedRatio = handoff.representative_zero_ray_point.speed_ratio;
  const physicalPeriod = handoff.representative_zero_ray_point.physical_period;
  const witness = handoff.pointwise_tangential_witness;

  return {
    schema: OCTAHEDRAL_FOLD_AWARE_SPEED_PRIMITIVE_EXISTENCE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_schema: OCTAHEDRAL_FOLD_AWARE_DYNAMICS_HANDOFF_SCHEMA,
    predecessor_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-dynamics-handoff.md",
    priority_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-speed-primitive-existence.md",
    successor_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-clock-length-criterion.md",
    source_handoff_check: {
      schema: handoff.schema,
      valid: handoffErrors.length === 0,
      errors: handoffErrors,
      theory_status: handoff.result.theory_status,
      rejects_fixed_speed_pointwise_tangent_closure:
        handoff.artifact_claim.rejects_fixed_speed_pointwise_tangent_closure,
      certifies_fold_aware_period_mean_zero:
        handoff.artifact_claim.certifies_fold_aware_period_mean_zero,
    },
    zero_ray_context: {
      speed_constraint: "none; speed ratio is the projective zero-ray parameter",
      speed_ratio: formatNumber(speedRatio),
      representative_period: formatNumber(physicalPeriod),
      representative_trace_scale: formatNumber(handoff.representative_zero_ray_point.trace_scale),
      representative_path_length: formatNumber(handoff.representative_zero_ray_point.path_length),
      period_mean_status: handoff.source_certificate_check.zero_status,
    },
    center_time_speed_primitive_lemma: {
      tangent_equation: "nu_i nu_i' = Gamma_B^nu f_i(u)",
      forcing_definition: "f_i(u)=T_i(u) dot F_i^{fold}(u)",
      arclength_prime_convention: "nu_i' is d nu_i / d lambda_i",
      center_time_pullback: "d nu_i / du = Gamma_B^nu f_i(u)",
      excursion_definition: "A_i(u)=Gamma_B^nu*int_0^u f_i(q)dq",
      zero_mean_condition: "int_0^H f_i(u)du=0",
      periodic_return: "A_i(H)=A_i(0)=0",
      positivity_condition:
        "choose nu_i0 > -min_u A_i(u), then nu_i(u)=nu_i0+A_i(u) is positive and periodic",
      sufficiency_statement:
        "on an L1 branch chart with bounded A_i, zero period mean is sufficient for a positive periodic center-time speed primitive after an initial-speed offset is chosen",
      status: "conditional-center-time-speed-primitive-existence-lemma",
    },
    clock_length_row: {
      clock_length_functional:
        "L_i(nu_i0)=int_0^H (nu_i0+A_i(u))du",
      offset_solution:
        "nu_i0_clock=(L_i-int_0^H A_i(u)du)/H",
      uniqueness_condition:
        "if the clock initial speed is positive and satisfies any declared branch band, the clock/length offset is unique",
      status: "clock-length-return-open",
    },
    pointwise_obstruction_retained: {
      witness_receiver: witness.receiver_label,
      witness_theta: formatNumber(witness.theta),
      witness_total_tangential_value: formatNumber(witness.total_tangential_value),
      meaning:
        "fixed-speed pointwise tangential closure is still rejected; the primitive exists only as the bounded-speed successor row",
    },
    branch_chart_requirements: {
      assumes_integrable_fold_aware_forcing: true,
      assumes_bounded_speed_excursion: true,
      requires_coarea_or_branch_chart_for_folds: true,
      dropped_root_theta_ledger_allowed: false,
      assumes_fixed_speed_window: false,
      certifies_clock_length_return: false,
      certifies_normal_reconstruction: false,
      certifies_action_noether_event_rows: false,
      certifies_observer_export: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
    },
    artifact_claim: {
      proves_zero_mean_is_sufficient_for_conditional_periodic_center_time_speed_primitive: true,
      preserves_fixed_speed_rejection: true,
      certifies_live_speed_primitive: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "conditional scalar center-time speed primitive theorem on a fold-aware branch chart; not retained",
    },
    result: {
      theory_status: "conditional-center-time-speed-primitive-existence-clock-length-open",
      first_successor_row:
        "coarea-integrability-clock-length-and-normal-reconstruction-required-on-live-ledger",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The certified period mean now has the correct bounded-speed scalar consequence: a periodic positive center-time speed primitive exists conditionally after an initial-speed offset is chosen. Clock/length return and live-ledger rows remain open.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareSpeedPrimitiveExistence(artifact) {
  const errors = [];
  assertField(
    artifact?.schema === OCTAHEDRAL_FOLD_AWARE_SPEED_PRIMITIVE_EXISTENCE_SCHEMA,
    "schema must match fold-aware speed primitive existence schema",
    errors
  );
  assertField(artifact?.packet_id === PACKET_ID, "packet id must match speed primitive existence packet", errors);
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.source_handoff_check?.valid === true,
    "source dynamics handoff must validate",
    errors
  );
  assertField(
    artifact?.source_handoff_check?.rejects_fixed_speed_pointwise_tangent_closure === true,
    "source handoff must keep fixed-speed pointwise rejection",
    errors
  );
  assertField(
    artifact?.source_handoff_check?.certifies_fold_aware_period_mean_zero === true,
    "source handoff must certify the fold-aware period mean zero",
    errors
  );
  assertField(
    artifact?.center_time_speed_primitive_lemma?.tangent_equation === "nu_i nu_i' = Gamma_B^nu f_i(u)",
    "primitive lemma must use the canonical tangent equation",
    errors
  );
  assertField(
    artifact?.center_time_speed_primitive_lemma?.center_time_pullback ===
      "d nu_i / du = Gamma_B^nu f_i(u)",
    "primitive lemma must state the center-time pullback",
    errors
  );
  assertField(
    artifact?.center_time_speed_primitive_lemma?.status ===
      "conditional-center-time-speed-primitive-existence-lemma",
    "center-time speed primitive lemma status must be conditional",
    errors
  );
  assertField(
    artifact?.clock_length_row?.status === "clock-length-return-open",
    "clock/length row must remain open",
    errors
  );
  assertField(
    artifact?.branch_chart_requirements?.assumes_fixed_speed_window === false,
    "artifact must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.branch_chart_requirements?.dropped_root_theta_ledger_allowed === false,
    "artifact must reject dropped-root theta ledgers",
    errors
  );
  assertField(
    artifact?.branch_chart_requirements?.certifies_bounded_speed_live_ledger === false &&
      artifact?.artifact_claim?.certifies_bounded_speed_live_ledger === false &&
      artifact?.result?.retained_branch === false,
    "artifact must not certify bounded-speed live ledger or retention",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-speed-primitive-existence.mjs [options]",
    "",
    "Options:",
    "  --out <path>       Write artifact JSON to path instead of stdout",
    "  --validate <path>  Validate an existing artifact JSON file",
    "  --schema           Print the artifact schema identifier",
    "  --pretty           Pretty-print JSON output",
    "  --help             Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out") {
      args.out = argv[++index];
    } else if (arg === "--validate") {
      args.validate = argv[++index];
    } else if (arg === "--schema") {
      args.schema = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }

  return args;
}

function printJson(value, pretty) {
  return `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }
  if (args.schema) {
    process.stdout.write(
      printJson(
        {
          schema: "neutral-braid-octahedral-fold-aware-speed-primitive-existence-schema/v1",
          artifact_schema: OCTAHEDRAL_FOLD_AWARE_SPEED_PRIMITIVE_EXISTENCE_SCHEMA,
          promotion_status: PROMOTION_STATUS,
          packet_id: PACKET_ID,
        },
        args.pretty
      )
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors = validateOctahedralFoldAwareSpeedPrimitiveExistence(artifact);
    process.stdout.write(
      printJson(
        {
          valid: errors.length === 0,
          errors,
          schema: artifact.schema,
          result: artifact.result ?? null,
        },
        args.pretty
      )
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact = buildOctahedralFoldAwareSpeedPrimitiveExistence();
  const output = printJson(artifact, args.pretty);
  if (args.out) {
    fs.mkdirSync(path.dirname(args.out), { recursive: true });
    fs.writeFileSync(args.out, output);
  } else {
    process.stdout.write(output);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}

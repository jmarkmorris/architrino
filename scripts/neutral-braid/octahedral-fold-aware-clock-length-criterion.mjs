#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_SPEED_PRIMITIVE_EXISTENCE_SCHEMA,
  buildOctahedralFoldAwareSpeedPrimitiveExistence,
  validateOctahedralFoldAwareSpeedPrimitiveExistence,
} from "./octahedral-fold-aware-speed-primitive-existence.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_CRITERION_SCHEMA =
  "neutral-braid-octahedral-fold-aware-clock-length-criterion/v1";

const PACKET_ID = "octahedral_fold_aware_clock_length_criterion";
const PROMOTION_STATUS = "priority-only";

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  const rounded = Number(value.toFixed(12));
  return Math.abs(rounded) < 5e-13 ? 0 : rounded;
}

function parseNumberList(value, expectedLength, label) {
  const entries = String(value)
    .split(",")
    .map((entry) => Number(entry.trim()));
  if (entries.length !== expectedLength || entries.some((entry) => !Number.isFinite(entry))) {
    throw new Error(`${label} must be ${expectedLength} comma-separated finite numbers`);
  }
  return entries;
}

export function evaluateClockLengthCriterion({
  period,
  targetLength,
  excursionMinimum,
  excursionAverage,
  excursionMaximum,
  speedWindow = null,
}) {
  if (!Number.isFinite(period) || period <= 0) {
    throw new Error("period must be positive");
  }
  if (!Number.isFinite(targetLength) || targetLength <= 0) {
    throw new Error("targetLength must be positive");
  }
  if (
    !Number.isFinite(excursionMinimum) ||
    !Number.isFinite(excursionAverage) ||
    !Number.isFinite(excursionMaximum) ||
    excursionMinimum > excursionAverage ||
    excursionAverage > excursionMaximum
  ) {
    throw new Error("excursion summary must satisfy excursionMinimum <= excursionAverage <= excursionMaximum");
  }

  const averageRequiredSpeed = targetLength / period;
  const clockInitialSpeed = averageRequiredSpeed - excursionAverage;
  const correctedMinimum = clockInitialSpeed + excursionMinimum;
  const correctedMaximum = clockInitialSpeed + excursionMaximum;
  const positivityMargin = correctedMinimum;
  let declaredWindow = null;

  if (speedWindow) {
    const [speedWindowLower, speedWindowUpper] = speedWindow;
    if (
      !Number.isFinite(speedWindowLower) ||
      !Number.isFinite(speedWindowUpper) ||
      speedWindowLower < 0 ||
      speedWindowLower >= speedWindowUpper
    ) {
      throw new Error("speedWindow must satisfy 0 <= lower < upper");
    }
    declaredWindow = {
      speed_window: [formatNumber(speedWindowLower), formatNumber(speedWindowUpper)],
      feasible_average_speed_interval: [
        formatNumber(speedWindowLower + excursionAverage - excursionMinimum),
        formatNumber(speedWindowUpper + excursionAverage - excursionMaximum),
      ],
      lower_margin: formatNumber(correctedMinimum - speedWindowLower),
      upper_margin: formatNumber(speedWindowUpper - correctedMaximum),
      status:
        correctedMinimum >= speedWindowLower && correctedMaximum <= speedWindowUpper
          ? "declared-speed-window-clock-length-criterion-passed"
          : "declared-speed-window-clock-length-criterion-failed",
    };
  }

  return {
    period: formatNumber(period),
    target_length: formatNumber(targetLength),
    excursion_minimum: formatNumber(excursionMinimum),
    excursion_average: formatNumber(excursionAverage),
    excursion_maximum: formatNumber(excursionMaximum),
    average_required_speed: formatNumber(averageRequiredSpeed),
    clock_initial_speed: formatNumber(clockInitialSpeed),
    corrected_speed_interval: [formatNumber(correctedMinimum), formatNumber(correctedMaximum)],
    positivity_margin: formatNumber(positivityMargin),
    positivity_status:
      positivityMargin > 0
        ? "positive-clock-length-speed-profile-certified-for-supplied-summary"
        : "positive-clock-length-speed-profile-failed-for-supplied-summary",
    declared_window: declaredWindow,
  };
}

export function buildOctahedralFoldAwareClockLengthCriterion(options = {}) {
  const primitive = buildOctahedralFoldAwareSpeedPrimitiveExistence();
  const primitiveErrors = validateOctahedralFoldAwareSpeedPrimitiveExistence(primitive);
  const profileSummary = options.profileSummary
    ? evaluateClockLengthCriterion({
        ...options.profileSummary,
        speedWindow: options.speedWindow ?? null,
      })
    : null;

  return {
    schema: OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_CRITERION_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_schema: OCTAHEDRAL_FOLD_AWARE_SPEED_PRIMITIVE_EXISTENCE_SCHEMA,
    predecessor_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-speed-primitive-existence.md",
    priority_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-clock-length-criterion.md",
    successor_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-clock-length-profile-scan.md",
    source_speed_primitive_check: {
      schema: primitive.schema,
      valid: primitiveErrors.length === 0,
      errors: primitiveErrors,
      theory_status: primitive.result.theory_status,
      assumes_fixed_speed_window: primitive.branch_chart_requirements.assumes_fixed_speed_window,
      retained_branch: primitive.result.retained_branch,
    },
    convention_bridge: {
      arclength_speed_ode: "nu_i nu_i' = Gamma_B^nu f_i(u)",
      arclength_prime_convention: "nu_i' is d nu_i / d lambda_i",
      center_time_pullback: "d nu_i / du = Gamma_B^nu f_i(u)",
      center_time_primitive: "nu_i(u)=nu_i0+A_i(u)",
      clock_length_equation: "int_0^H (nu_i0+A_i(u))du=L_i",
      offset_solution: "nu_i0_clock=(L_i-int_0^H A_i(u)du)/H",
    },
    symbolic_clock_length_criterion: {
      speed_profile: "nu_i(u)=nu_i0+A_i(u)",
      primitive_return: "A_i(H)=A_i(0)=0",
      excursion_average: "A_bar=(1/H)*int_0^H A_i(u)du",
      clock_offset:
        "nu_i0_clock=L_i/H-A_bar",
      corrected_speed_interval:
        "[L_i/H-A_bar+A_min, L_i/H-A_bar+A_max]",
      positivity_condition:
        "L_i/H > A_bar-A_min",
      declared_window_condition:
        "if a branch declares [nu_-,nu_+], then nu_-+A_bar-A_min <= L_i/H <= nu_++A_bar-A_max",
      status: "symbolic-clock-length-offset-criterion-certified",
    },
    coupling_scale_form: {
      primitive_shape: "A_i(u)=Gamma_B^nu I_i(u)",
      positive_scale_condition:
        "for Gamma_B^nu>=0, positivity is L_i/H > Gamma_B^nu*(I_bar-I_min)",
      declared_window_condition:
        "for Gamma_B^nu>=0 and a declared speed window, nu_-+Gamma_B^nu*(I_bar-I_min) <= L_i/H <= nu_++Gamma_B^nu*(I_bar-I_max)",
      meaning:
        "the action scale and primitive shape determine whether the clock/length row is compatible; the period mean alone does not",
    },
    supplied_profile_summary: profileSummary,
    branch_chart_requirements: {
      requires_fold_aware_excursion_bounds: true,
      requires_excursion_average: true,
      assumes_fixed_speed_window: false,
      declared_speed_window: null,
      declared_speed_window_is_optional: true,
      branch_declared_speed_window_required_for_band_test: true,
      certifies_clock_length_return_for_live_branch: false,
      certifies_normal_reconstruction: false,
      certifies_action_noether_event_rows: false,
      certifies_observer_export: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
    },
    artifact_claim: {
      certifies_clock_length_criterion: true,
      certifies_clock_length_return: false,
      certifies_speed_clock_length: false,
      certifies_symbolic_clock_length_criterion: true,
      certifies_supplied_profile_clock_length: profileSummary?.positivity_status ===
        "positive-clock-length-speed-profile-certified-for-supplied-summary",
      certifies_live_branch_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "exact scalar clock/length offset and positivity criterion for the center-time speed primitive; not retained",
    },
    result: {
      clock_length_status: "clock-length-criterion-derived-return-open",
      theory_status: "fold-aware-clock-length-criterion-derived-clock-return-open",
      first_successor_row:
        "clock-length-return-normal-reconstruction-action-noether-event-export-required-on-live-ledger",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The center-time speed primitive now has an exact clock/length solvability criterion. A live branch still must provide fold-aware excursion bounds and downstream normal/action/event rows.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareClockLengthCriterion(artifact) {
  const errors = [];
  assertField(
    artifact?.schema === OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_CRITERION_SCHEMA,
    "schema must match fold-aware clock length criterion schema",
    errors
  );
  assertField(artifact?.packet_id === PACKET_ID, "packet id must match clock length criterion packet", errors);
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.source_speed_primitive_check?.valid === true,
    "source speed primitive artifact must validate",
    errors
  );
  assertField(
    artifact?.source_speed_primitive_check?.theory_status ===
      "conditional-center-time-speed-primitive-existence-clock-length-open" &&
      artifact?.source_speed_primitive_check?.assumes_fixed_speed_window === false,
    "source speed primitive must be the center-time primitive and must not impose a speed window",
    errors
  );
  assertField(
    artifact?.convention_bridge?.arclength_speed_ode === "nu_i nu_i' = Gamma_B^nu f_i(u)" &&
      artifact?.convention_bridge?.arclength_prime_convention === "nu_i' is d nu_i / d lambda_i" &&
      artifact?.convention_bridge?.center_time_pullback === "d nu_i / du = Gamma_B^nu f_i(u)" &&
      artifact?.convention_bridge?.center_time_primitive === "nu_i(u)=nu_i0+A_i(u)",
    "artifact must state the arclength-to-center-time convention bridge",
    errors
  );
  assertField(
    artifact?.symbolic_clock_length_criterion?.clock_offset === "nu_i0_clock=L_i/H-A_bar",
    "artifact must state the unique clock offset",
    errors
  );
  assertField(
    artifact?.symbolic_clock_length_criterion?.positivity_condition === "L_i/H > A_bar-A_min",
    "artifact must state the strict positivity criterion",
    errors
  );
  assertField(
    artifact?.symbolic_clock_length_criterion?.declared_window_condition?.includes("nu_-+A_bar-A_min"),
    "artifact must state declared-window feasibility as optional",
    errors
  );
  assertField(
    artifact?.branch_chart_requirements?.assumes_fixed_speed_window === false &&
      artifact?.branch_chart_requirements?.declared_speed_window === null &&
      artifact?.branch_chart_requirements?.declared_speed_window_is_optional === true,
    "artifact must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.branch_chart_requirements?.certifies_clock_length_return_for_live_branch === false &&
      artifact?.branch_chart_requirements?.certifies_normal_reconstruction === false &&
      artifact?.branch_chart_requirements?.certifies_action_noether_event_rows === false &&
      artifact?.branch_chart_requirements?.certifies_observer_export === false &&
      artifact?.branch_chart_requirements?.certifies_bounded_speed_live_ledger === false &&
      artifact?.artifact_claim?.certifies_clock_length_return === false &&
      artifact?.artifact_claim?.certifies_speed_clock_length === false &&
      artifact?.artifact_claim?.certifies_live_branch_clock_length_return === false &&
      artifact?.result?.retained_branch === false,
    "artifact must not certify live clock/length return, downstream rows, bounded-speed live ledger, or retention",
    errors
  );
  if (artifact?.supplied_profile_summary) {
    const row = artifact.supplied_profile_summary;
    assertField(
      Array.isArray(row.corrected_speed_interval) &&
        Number(row.corrected_speed_interval[0]) <= Number(row.corrected_speed_interval[1]),
      "supplied profile corrected speed interval must be ordered",
      errors
    );
    assertField(
      typeof row.positivity_status === "string" &&
        row.positivity_status.endsWith("for-supplied-summary"),
      "supplied profile must report a positivity status",
      errors
    );
  }
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-clock-length-criterion.mjs [options]",
    "",
    "Options:",
    "  --profile <H,L,Amin,Abar,Amax>  Evaluate the criterion for a supplied excursion summary",
    "  --speed-window <lower,upper>     Optional declared speed window for the supplied profile",
    "  --out <path>                     Write artifact JSON to path instead of stdout",
    "  --validate <path>                Validate an existing artifact JSON file",
    "  --schema                         Print the artifact schema identifier",
    "  --pretty                         Pretty-print JSON output",
    "  --help                           Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    profileSummary: null,
    speedWindow: null,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--profile") {
      const [period, targetLength, excursionMinimum, excursionAverage, excursionMaximum] = parseNumberList(
        argv[++index],
        5,
        "--profile"
      );
      args.profileSummary = {
        period,
        targetLength,
        excursionMinimum,
        excursionAverage,
        excursionMaximum,
      };
    } else if (arg === "--speed-window") {
      args.speedWindow = parseNumberList(argv[++index], 2, "--speed-window");
    } else if (arg === "--out") {
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

  if (args.speedWindow && !args.profileSummary) {
    throw new Error("--speed-window requires --profile");
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
          schema: "neutral-braid-octahedral-fold-aware-clock-length-criterion-schema/v1",
          artifact_schema: OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_CRITERION_SCHEMA,
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
    const errors = validateOctahedralFoldAwareClockLengthCriterion(artifact);
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

  const artifact = buildOctahedralFoldAwareClockLengthCriterion({
    profileSummary: args.profileSummary,
    speedWindow: args.speedWindow,
  });
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

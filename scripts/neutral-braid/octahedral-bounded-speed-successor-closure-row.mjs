#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { evaluateDiagonalAffineScale } from "./octahedral-diagonal-affine-zero-mean-solver.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_BOUNDED_SPEED_SUCCESSOR_CLOSURE_ROW_SCHEMA =
  "neutral-braid-octahedral-bounded-speed-successor-closure-row/v1";

const PACKET_ID = "octahedral_bounded_speed_successor_closure_row";
const PROMOTION_STATUS = "priority-only";
const TAU = 2 * Math.PI;
const DEFAULT_TRACE_SCALE = 1.694464950788;
const DEFAULT_PHASE_SAMPLES = 37;
const DEFAULT_Y_SUBDIVISIONS = 240;
const DEFAULT_NU_MIN = 0.5;
const DEFAULT_NU_MAX = 1.5;

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  const rounded = Number(value.toFixed(12));
  return Math.abs(rounded) < 5e-13 ? 0 : rounded;
}

function maxAbs(values) {
  return values.reduce((best, value) => Math.max(best, Math.abs(value)), 0);
}

function receiverClockLengthNecessaryRows(row, nuMin, nuMax) {
  return row.primitive_rows.map((primitiveRow, index) => {
    const meanPathSpeed = primitiveRow.mean_path_speed;
    const lowerMargin = meanPathSpeed - nuMin;
    const upperMargin = nuMax - meanPathSpeed;
    const passed = lowerMargin >= 0 && upperMargin >= 0;
    return {
      receiver_index: index + 1,
      period: formatNumber(TAU),
      path_length: formatNumber(primitiveRow.path_length),
      mean_path_speed: formatNumber(meanPathSpeed),
      declared_speed_window: [formatNumber(nuMin), formatNumber(nuMax)],
      lower_margin: formatNumber(lowerMargin),
      upper_margin: formatNumber(upperMargin),
      necessary_condition_passed: passed,
      failure_margin: formatNumber(passed ? 0 : Math.max(nuMin - meanPathSpeed, meanPathSpeed - nuMax)),
    };
  });
}

function buildAverageSpeedLemmaStatus(clockRows) {
  const failedRows = clockRows.filter((row) => !row.necessary_condition_passed);
  return failedRows.length === 0
    ? "declared-speed-window-clock-length-necessary-condition-passed"
    : "declared-speed-window-clock-length-necessary-condition-failed";
}

export function buildOctahedralBoundedSpeedSuccessorClosureRow(options = {}) {
  const traceScale = Number(options.traceScale ?? DEFAULT_TRACE_SCALE);
  const phaseSamples = Number.parseInt(options.phaseSamples ?? DEFAULT_PHASE_SAMPLES, 10);
  const ySubdivisions = Number.parseInt(options.ySubdivisions ?? DEFAULT_Y_SUBDIVISIONS, 10);
  const nuMin = Number(options.nuMin ?? DEFAULT_NU_MIN);
  const nuMax = Number(options.nuMax ?? DEFAULT_NU_MAX);

  if (!Number.isFinite(traceScale) || traceScale <= 0) {
    throw new Error("traceScale must be positive");
  }
  if (!Number.isInteger(phaseSamples) || phaseSamples < 4) {
    throw new Error("phaseSamples must be an integer >= 4");
  }
  if (!Number.isInteger(ySubdivisions) || ySubdivisions < 10) {
    throw new Error("ySubdivisions must be an integer >= 10");
  }
  if (!Number.isFinite(nuMin) || !Number.isFinite(nuMax) || !(0 < nuMin && nuMin < nuMax)) {
    throw new Error("declared speed window must satisfy 0 < nuMin < nuMax");
  }

  const diagonalRow = evaluateDiagonalAffineScale([traceScale, traceScale, traceScale], {
    phaseSamples,
    ySubdivisions,
    nuMin,
    nuMax,
  });
  const clockRows = receiverClockLengthNecessaryRows(diagonalRow, nuMin, nuMax);
  const averageSpeedLemmaStatus = buildAverageSpeedLemmaStatus(clockRows);
  const traceMeanPathSpeed = diagonalRow.primitive_rows[0].mean_path_speed;
  const tracePathLength = diagonalRow.primitive_rows[0].path_length;
  const minimumFeasiblePeriod = tracePathLength / nuMax;
  const maximumFeasiblePeriod = tracePathLength / nuMin;
  const primitiveRows = diagonalRow.primitive_rows.map((primitiveRow, index) => ({
    receiver_index: index + 1,
    primitive_return_residual: formatNumber(primitiveRow.primitive_return_residual),
    primitive_min: formatNumber(primitiveRow.primitive_min),
    primitive_max: formatNumber(primitiveRow.primitive_max),
    primitive_excursion: formatNumber(primitiveRow.primitive_excursion),
    initial_speed_interval: primitiveRow.initial_speed_interval.map(formatNumber),
    initial_speed_interval_width: formatNumber(primitiveRow.initial_speed_interval_width),
    initial_speed_interval_nonempty: primitiveRow.initial_speed_interval_nonempty,
    clock_length_initial_speed: formatNumber(primitiveRow.clock_length_initial_speed),
    clock_length_initial_speed_in_interval: primitiveRow.clock_length_initial_speed_in_interval,
  }));
  const primitiveWidthMin = Math.min(...diagonalRow.primitive_rows.map((row) => row.initial_speed_interval_width));

  return {
    schema: OCTAHEDRAL_BOUNDED_SPEED_SUCCESSOR_CLOSURE_ROW_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    source_diagonal_affine_solver:
      "scripts/neutral-braid/octahedral-diagonal-affine-zero-mean-solver.mjs",
    source_priority_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-diagonal-affine-zero-mean-solver.md",
    priority_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-bounded-speed-successor-closure-row.md",
    source_trace_candidate: {
      scale: formatNumber(traceScale),
      phase_sample_count: phaseSamples,
      y_subdivision_count: ySubdivisions,
      zero_mean_residual_norm_inf: formatNumber(diagonalRow.zero_mean_residual_norm_inf),
      zero_mean_residual_norm_2: formatNumber(diagonalRow.zero_mean_residual_norm_2),
      root_failure_count: diagonalRow.root_failure_count,
      jacobian_abs_min: formatNumber(diagonalRow.jacobian_abs_min),
      primitive_return_abs_max: formatNumber(maxAbs(diagonalRow.primitive_rows.map((row) => row.primitive_return_residual))),
      primitive_excursion_max: formatNumber(diagonalRow.primitive_excursion_max),
      initial_speed_interval_width_min: formatNumber(primitiveWidthMin),
      declared_window_rows_passed: diagonalRow.declared_speed_window_rows_passed,
      retention: "not_retained",
    },
    average_speed_lemma: {
      statement:
        "If nu_min <= nu_i(u) <= nu_max and int_0^H nu_i(u) du = L_i, then nu_min <= L_i/H <= nu_max.",
      proof_line:
        "For any declared speed window, integrating the pointwise bound over [0,H] gives nu_min*H <= L_i <= nu_max*H.",
      declared_speed_window: [formatNumber(nuMin), formatNumber(nuMax)],
      clock_length_necessary_rows: clockRows,
      status: averageSpeedLemmaStatus,
      trace_mean_path_speed: formatNumber(traceMeanPathSpeed),
      declared_upper_window_failure_margin: formatNumber(Math.max(0, traceMeanPathSpeed - nuMax)),
      period_rescue_condition: {
        fixed_period: formatNumber(TAU),
        trace_path_length: formatNumber(tracePathLength),
        minimum_feasible_period: formatNumber(minimumFeasiblePeriod),
        maximum_feasible_period: formatNumber(maximumFeasiblePeriod),
        minimum_period_ratio_to_fixed_period: formatNumber(minimumFeasiblePeriod / TAU),
        interpretation:
          "With a declared speed window fixed, a clock/length row requires L/nu_max <= H <= L/nu_min.",
      },
    },
    physical_primitive_row: {
      forcing_projection: "physical unit tangent",
      primitive_definition: "A_i(u)=Gamma*int_0^u T_hat_i(s;z)*F_i^nu(s;z) ds",
      receiver_rows: primitiveRows,
      primitive_return_abs_max: formatNumber(maxAbs(primitiveRows.map((row) => row.primitive_return_residual))),
      primitive_excursion_max: formatNumber(diagonalRow.primitive_excursion_max),
      initial_speed_interval_width_min: formatNumber(primitiveWidthMin),
      status:
        primitiveWidthMin >= 0 && diagonalRow.declared_speed_window_rows_passed
          ? "physical-speed-primitive-row-passed"
          : "declared-window-primitive-or-clock-row-failed",
    },
    successor_equations: {
      live_zero_mean_correction: "B*alpha=-M(z_0)",
      live_range_condition: "-M(z_0) in Range(B)",
      constant_source_case: "1_6 in Range(B) when M(z_0)=m_* 1_6",
      primitive_window_condition: "A_i,max-A_i,min <= nu_max-nu_min",
      clock_length_condition: "nu_min <= L_i/H <= nu_max",
      successor_requirement:
        "If a future retained branch declares a finite speed window, it must satisfy both the primitive excursion row and the clock-length necessary row on the same live ledger.",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      proves_conditional_clock_window_no_go_for_declared_window: averageSpeedLemmaStatus.endsWith("failed"),
      certifies_live_derivative_matrix: false,
      certifies_correction_direction: false,
      certifies_speed_primitive_feasibility: false,
      certifies_speed_clock_length: false,
      certifies_normal_reconstruction: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "conditional declared-speed-window diagnostic for the trace-affine candidate; not a speed-unconstrained branch rejection",
    },
    result: {
      theory_status: "declared-speed-window-clock-diagnostic-failed",
      first_successor_row: "period-rescaled-trace-simple-root-scan-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "This artifact proves only a conditional clock-window no-go for the declared diagnostic speed window. It does not impose that window as theory, and it does not certify a live derivative matrix, correction direction, bounded-speed ledger, or retained branch.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralBoundedSpeedSuccessorClosureRow(artifact) {
  const errors = [];
  assertField(
    artifact?.schema === OCTAHEDRAL_BOUNDED_SPEED_SUCCESSOR_CLOSURE_ROW_SCHEMA,
    "schema must match bounded-speed successor closure row schema",
    errors
  );
  assertField(artifact?.packet_id === PACKET_ID, "packet id must match bounded-speed successor closure row", errors);
  assertField(artifact?.promotion_status === PROMOTION_STATUS, "promotion status must remain priority-only", errors);
  assertField(
    artifact?.average_speed_lemma?.status === "declared-speed-window-clock-length-necessary-condition-failed",
    "average speed lemma must fail only as a declared speed-window diagnostic",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_bounded_speed_live_ledger === false,
    "artifact must not certify bounded-speed live ledger",
    errors
  );
  assertField(
    artifact?.artifact_claim?.retained_branch === false && artifact?.result?.retained_branch === false,
    "artifact must not claim retained branch status",
    errors
  );
  assertField(
    artifact?.result?.theory_status === "declared-speed-window-clock-diagnostic-failed",
    "result theory status must record conditional clock-window diagnostic failure",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-bounded-speed-successor-closure-row.mjs [options]",
    "",
    "Options:",
    "  --trace-scale <s>    Uniform trace scale to evaluate (default: 1.694464950788)",
    "  --samples <n>        Periodic phase samples over [0, 2*pi) (default: 37)",
    "  --subdivisions <n>   Root-search subdivisions (default: 240)",
    "  --nu-min <x>         Declared diagnostic speed-window lower bound (default: 0.5)",
    "  --nu-max <x>         Declared diagnostic speed-window upper bound (default: 1.5)",
    "  --out <path>         Write artifact JSON to path instead of stdout",
    "  --validate <path>    Validate an existing artifact JSON file",
    "  --schema             Print the artifact schema identifier",
    "  --pretty             Pretty-print JSON output",
    "  --help               Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    traceScale: DEFAULT_TRACE_SCALE,
    phaseSamples: DEFAULT_PHASE_SAMPLES,
    ySubdivisions: DEFAULT_Y_SUBDIVISIONS,
    nuMin: DEFAULT_NU_MIN,
    nuMax: DEFAULT_NU_MAX,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--trace-scale") {
      args.traceScale = Number(argv[++index]);
    } else if (arg === "--samples") {
      args.phaseSamples = Number.parseInt(argv[++index], 10);
    } else if (arg === "--subdivisions") {
      args.ySubdivisions = Number.parseInt(argv[++index], 10);
    } else if (arg === "--nu-min") {
      args.nuMin = Number(argv[++index]);
    } else if (arg === "--nu-max") {
      args.nuMax = Number(argv[++index]);
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
          schema: "neutral-braid-octahedral-bounded-speed-successor-closure-row-schema/v1",
          artifact_schema: OCTAHEDRAL_BOUNDED_SPEED_SUCCESSOR_CLOSURE_ROW_SCHEMA,
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
    const errors = validateOctahedralBoundedSpeedSuccessorClosureRow(artifact);
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

  const artifact = buildOctahedralBoundedSpeedSuccessorClosureRow({
    traceScale: args.traceScale,
    phaseSamples: args.phaseSamples,
    ySubdivisions: args.ySubdivisions,
    nuMin: args.nuMin,
    nuMax: args.nuMax,
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

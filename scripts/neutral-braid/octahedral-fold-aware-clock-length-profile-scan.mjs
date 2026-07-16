#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareClockLengthCriterion,
  evaluateClockLengthCriterion,
  validateOctahedralFoldAwareClockLengthCriterion,
} from "./octahedral-fold-aware-clock-length-criterion.mjs";
import {
  buildOctahedralFoldAwareDynamicsHandoff,
  evaluatePointwiseTangentialWitness,
} from "./octahedral-fold-aware-dynamics-handoff.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_PROFILE_SCAN_SCHEMA =
  "neutral-braid-octahedral-fold-aware-clock-length-profile-scan/v1";

const PACKET_ID = "octahedral_fold_aware_clock_length_profile_scan";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_SAMPLE_COUNT = 128;
const DEFAULT_ROOT_SUBDIVISIONS = 5000;

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  const rounded = Number(value.toFixed(12));
  return Math.abs(rounded) < 5e-13 ? 0 : rounded;
}

export function integratePrimitive(samples, period) {
  const step = period / samples.length;
  const forcingMean = samples.reduce((sum, row) => sum + row.forcing, 0) / samples.length;
  let primitive = 0;
  let primitiveMinimum = 0;
  let primitiveMaximum = 0;
  let primitiveSum = 0;
  const primitiveRows = [];

  for (const row of samples) {
    primitive += (row.forcing - forcingMean) * step;
    primitiveMinimum = Math.min(primitiveMinimum, primitive);
    primitiveMaximum = Math.max(primitiveMaximum, primitive);
    primitiveSum += primitive;
    primitiveRows.push({
      theta: row.theta,
      primitive,
    });
  }

  return {
    forcingMean,
    primitiveReturnResidual: primitive,
    primitiveMinimum,
    primitiveAverage: primitiveSum / samples.length,
    primitiveMaximum,
    primitiveRows,
  };
}

export function evaluateFoldAwareReceiverClockLengthProfile({
  speedRatio,
  period,
  targetLength,
  receiverLabel = "1+",
  sampleCount = DEFAULT_SAMPLE_COUNT,
  rootSubdivisions = DEFAULT_ROOT_SUBDIVISIONS,
}) {
  const samples = [];

  for (let index = 0; index < sampleCount; index += 1) {
    const theta = (period * index) / sampleCount;
    const witness = evaluatePointwiseTangentialWitness({
      speedRatio,
      theta,
      receiverLabel,
      rootSubdivisions,
    });
    samples.push({
      theta,
      forcing: witness.total_tangential_value,
      active_root_count: witness.active_root_count,
      jacobian_abs_min: witness.jacobian_abs_min,
    });
  }

  const primitive = integratePrimitive(samples, period);
  const clockCriterion = evaluateClockLengthCriterion({
    period,
    targetLength,
    excursionMinimum: primitive.primitiveMinimum,
    excursionAverage: primitive.primitiveAverage,
    excursionMaximum: primitive.primitiveMaximum,
  });
  const rootCounts = [...new Set(samples.map((row) => row.active_root_count))].sort((left, right) => left - right);
  const jacobianFloor = Math.min(...samples.map((row) => row.jacobian_abs_min));
  const forcingMinimum = Math.min(...samples.map((row) => row.forcing));
  const forcingMaximum = Math.max(...samples.map((row) => row.forcing));

  return {
    receiver_label: receiverLabel,
    sampled_forcing_summary: {
      forcing_minimum: formatNumber(forcingMinimum),
      forcing_mean: formatNumber(primitive.forcingMean),
      forcing_maximum: formatNumber(forcingMaximum),
      active_root_counts: rootCounts,
      jacobian_abs_floor: formatNumber(jacobianFloor),
    },
    sampled_primitive_summary: {
      primitive_return_residual: formatNumber(primitive.primitiveReturnResidual),
      primitive_minimum: formatNumber(primitive.primitiveMinimum),
      primitive_average: formatNumber(primitive.primitiveAverage),
      primitive_maximum: formatNumber(primitive.primitiveMaximum),
    },
    sampled_clock_length_criterion: clockCriterion,
  };
}

export function buildOctahedralFoldAwareClockLengthProfileScan(options = {}) {
  const sampleCount = Number.parseInt(options.sampleCount ?? DEFAULT_SAMPLE_COUNT, 10);
  const rootSubdivisions = Number.parseInt(options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS, 10);
  if (!Number.isInteger(sampleCount) || sampleCount < 16) {
    throw new Error("sampleCount must be an integer >= 16");
  }
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }

  const criterion = buildOctahedralFoldAwareClockLengthCriterion();
  const criterionErrors = validateOctahedralFoldAwareClockLengthCriterion(criterion);
  const handoff = buildOctahedralFoldAwareDynamicsHandoff({ rootSubdivisions });
  const speedRatio = handoff.representative_zero_ray_point.speed_ratio;
  const period = handoff.representative_zero_ray_point.physical_period;
  const targetLength = handoff.representative_zero_ray_point.path_length;
  const profile = evaluateFoldAwareReceiverClockLengthProfile({
    speedRatio,
    period,
    targetLength,
    receiverLabel: "1+",
    sampleCount,
    rootSubdivisions,
  });

  return {
    schema: OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_PROFILE_SCAN_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-clock-length-criterion.md",
    successor_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-clock-length-orbit-scan.md",
    priority_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-clock-length-profile-scan.md",
    source_criterion_check: {
      schema: criterion.schema,
      valid: criterionErrors.length === 0,
      errors: criterionErrors,
      theory_status: criterion.result.theory_status,
      retained_branch: criterion.result.retained_branch,
    },
    scan_parameters: {
      sample_count: sampleCount,
      root_subdivisions: rootSubdivisions,
      speed_constraint: "none; no fixed speed window is imposed",
      receiver_label: "1+",
      period: formatNumber(period),
      target_length: formatNumber(targetLength),
      average_required_speed: formatNumber(speedRatio),
    },
    sampled_forcing_summary: profile.sampled_forcing_summary,
    sampled_primitive_summary: profile.sampled_primitive_summary,
    sampled_clock_length_criterion: profile.sampled_clock_length_criterion,
    artifact_claim: {
      certifies_sampled_clock_length_positive_profile: profile.sampled_clock_length_criterion.positivity_status ===
        "positive-clock-length-speed-profile-certified-for-supplied-summary",
      certifies_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "sampled fold-aware clock/length profile diagnostic; not an interval certificate and not retained",
    },
    result: {
      theory_status:
        profile.sampled_clock_length_criterion.positivity_status ===
        "positive-clock-length-speed-profile-certified-for-supplied-summary"
          ? "sampled-fold-aware-clock-length-positive-profile"
          : "sampled-fold-aware-clock-length-profile-failed",
      first_successor_row:
        "interval-fold-aware-excursion-certificate-normal-reconstruction-action-noether-event-export-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The sampled all-root profile gives a positive clock/length speed profile at the fold-aware zero-ray representative. This is a diagnostic profile pass, not a retained branch.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareClockLengthProfileScan(artifact) {
  const errors = [];
  assertField(
    artifact?.schema === OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_PROFILE_SCAN_SCHEMA,
    "schema must match fold-aware clock length profile scan schema",
    errors
  );
  assertField(artifact?.packet_id === PACKET_ID, "packet id must match clock length profile scan packet", errors);
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.source_criterion_check?.valid === true,
    "source clock length criterion must validate",
    errors
  );
  assertField(
    artifact?.scan_parameters?.speed_constraint === "none; no fixed speed window is imposed",
    "profile scan must not impose a fixed speed window",
    errors
  );
  assertField(
    Array.isArray(artifact?.sampled_forcing_summary?.active_root_counts) &&
      Math.min(...artifact.sampled_forcing_summary.active_root_counts) >= 7 &&
      artifact.sampled_forcing_summary.active_root_counts.includes(9),
    "sampled profile must keep the fold-aware projected root ledger at sampled phases",
    errors
  );
  assertField(
    Number(artifact?.sampled_forcing_summary?.jacobian_abs_floor) > 0.1,
    "sampled profile must stay root-regular at sampled phases",
    errors
  );
  assertField(
    Math.abs(Number(artifact?.sampled_primitive_summary?.primitive_return_residual)) < 1e-6,
    "sampled primitive return residual must be small",
    errors
  );
  assertField(
    artifact?.sampled_clock_length_criterion?.positivity_status ===
      "positive-clock-length-speed-profile-certified-for-supplied-summary",
    "sampled clock length criterion must pass positivity",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_interval_clock_length_return === false &&
      artifact?.artifact_claim?.certifies_bounded_speed_live_ledger === false &&
      artifact?.result?.retained_branch === false &&
      artifact?.result?.retention === "not_retained",
    "profile scan must not certify interval clock length, bounded-speed live ledger, or retention",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-clock-length-profile-scan.mjs [options]",
    "",
    "Options:",
    "  --samples <n>          Number of period samples (default: 128)",
    "  --subdivisions <n>     Root search subdivisions (default: 5000)",
    "  --out <path>           Write artifact JSON to path instead of stdout",
    "  --validate <path>      Validate an existing artifact JSON file",
    "  --schema               Print the artifact schema identifier",
    "  --pretty               Pretty-print JSON output",
    "  --help                 Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    sampleCount: DEFAULT_SAMPLE_COUNT,
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--samples") {
      args.sampleCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--subdivisions") {
      args.rootSubdivisions = Number.parseInt(argv[++index], 10);
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
          schema: "neutral-braid-octahedral-fold-aware-clock-length-profile-scan-schema/v1",
          artifact_schema: OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_PROFILE_SCAN_SCHEMA,
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
    const errors = validateOctahedralFoldAwareClockLengthProfileScan(artifact);
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

  const artifact = buildOctahedralFoldAwareClockLengthProfileScan({
    sampleCount: args.sampleCount,
    rootSubdivisions: args.rootSubdivisions,
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

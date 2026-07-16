#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { OCTAHEDRAL_SITES } from "./octahedral-root-ledger.mjs";
import { buildOctahedralFoldAwareDynamicsHandoff } from "./octahedral-fold-aware-dynamics-handoff.mjs";
import {
  buildOctahedralFoldAwareClockLengthProfileScan,
  evaluateFoldAwareReceiverClockLengthProfile,
  validateOctahedralFoldAwareClockLengthProfileScan,
} from "./octahedral-fold-aware-clock-length-profile-scan.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_ORBIT_SCAN_SCHEMA =
  "neutral-braid-octahedral-fold-aware-clock-length-orbit-scan/v1";

const PACKET_ID = "octahedral_fold_aware_clock_length_orbit_scan";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_SAMPLE_COUNT = 64;
const DEFAULT_ROOT_SUBDIVISIONS = 5000;

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  const rounded = Number(value.toFixed(12));
  return Math.abs(rounded) < 5e-13 ? 0 : rounded;
}

function maxAbs(values) {
  return Math.max(...values.map((value) => Math.abs(value)));
}

export function buildOctahedralFoldAwareClockLengthOrbitScan(options = {}) {
  const sampleCount = Number.parseInt(options.sampleCount ?? DEFAULT_SAMPLE_COUNT, 10);
  const rootSubdivisions = Number.parseInt(options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS, 10);
  if (!Number.isInteger(sampleCount) || sampleCount < 16) {
    throw new Error("sampleCount must be an integer >= 16");
  }
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }

  const sourceProfile = buildOctahedralFoldAwareClockLengthProfileScan({
    sampleCount,
    rootSubdivisions,
  });
  const sourceProfileErrors = validateOctahedralFoldAwareClockLengthProfileScan(sourceProfile);
  const handoff = buildOctahedralFoldAwareDynamicsHandoff({ rootSubdivisions });
  const speedRatio = handoff.representative_zero_ray_point.speed_ratio;
  const period = handoff.representative_zero_ray_point.physical_period;
  const targetLength = handoff.representative_zero_ray_point.path_length;
  const receiverProfiles = OCTAHEDRAL_SITES.map((site) =>
    evaluateFoldAwareReceiverClockLengthProfile({
      speedRatio,
      period,
      targetLength,
      receiverLabel: site.label,
      sampleCount,
      rootSubdivisions,
    })
  );

  const positivityMargins = receiverProfiles.map(
    (profile) => profile.sampled_clock_length_criterion.positivity_margin
  );
  const clockInitialSpeeds = receiverProfiles.map(
    (profile) => profile.sampled_clock_length_criterion.clock_initial_speed
  );
  const speedMinimums = receiverProfiles.map(
    (profile) => profile.sampled_clock_length_criterion.corrected_speed_interval[0]
  );
  const speedMaximums = receiverProfiles.map(
    (profile) => profile.sampled_clock_length_criterion.corrected_speed_interval[1]
  );
  const primitiveMinimums = receiverProfiles.map(
    (profile) => profile.sampled_primitive_summary.primitive_minimum
  );
  const primitiveAverages = receiverProfiles.map(
    (profile) => profile.sampled_primitive_summary.primitive_average
  );
  const primitiveMaximums = receiverProfiles.map(
    (profile) => profile.sampled_primitive_summary.primitive_maximum
  );
  const forcingMeans = receiverProfiles.map((profile) => profile.sampled_forcing_summary.forcing_mean);
  const rootCounts = [
    ...new Set(receiverProfiles.flatMap((profile) => profile.sampled_forcing_summary.active_root_counts)),
  ].sort((left, right) => left - right);

  const referenceProfile = receiverProfiles[0];
  const receiverProfileRows = receiverProfiles.map((profile) => ({
    receiver_label: profile.receiver_label,
    sample_count: sampleCount,
    root_subdivisions: rootSubdivisions,
    speed_ratio: formatNumber(speedRatio),
    period: formatNumber(period),
    target_length: formatNumber(targetLength),
    active_root_counts: profile.sampled_forcing_summary.active_root_counts,
    jacobian_abs_floor: profile.sampled_forcing_summary.jacobian_abs_floor,
    forcing_minimum: profile.sampled_forcing_summary.forcing_minimum,
    forcing_mean: profile.sampled_forcing_summary.forcing_mean,
    forcing_maximum: profile.sampled_forcing_summary.forcing_maximum,
    primitive_minimum: profile.sampled_primitive_summary.primitive_minimum,
    primitive_average: profile.sampled_primitive_summary.primitive_average,
    primitive_maximum: profile.sampled_primitive_summary.primitive_maximum,
    primitive_return_residual: profile.sampled_primitive_summary.primitive_return_residual,
    clock_initial_speed: profile.sampled_clock_length_criterion.clock_initial_speed,
    corrected_speed_interval: profile.sampled_clock_length_criterion.corrected_speed_interval,
    positivity_margin: profile.sampled_clock_length_criterion.positivity_margin,
    positivity_status: profile.sampled_clock_length_criterion.positivity_status,
    certifies_interval_clock_length_return: false,
    certifies_bounded_speed_live_ledger: false,
    retained_branch: false,
  }));

  return {
    schema: OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_ORBIT_SCAN_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-clock-length-profile-scan.md",
    successor_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-clock-length-orbit-symmetry-reduction.md",
    priority_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-clock-length-orbit-scan.md",
    source_profile_check: {
      schema: sourceProfile.schema,
      valid: sourceProfileErrors.length === 0,
      errors: sourceProfileErrors,
      theory_status: sourceProfile.result.theory_status,
      retained_branch: sourceProfile.result.retained_branch,
    },
    scan_parameters: {
      sample_count: sampleCount,
      root_subdivisions: rootSubdivisions,
      speed_constraint: "none; no fixed speed window is imposed",
      receiver_labels: OCTAHEDRAL_SITES.map((site) => site.label),
      period: formatNumber(period),
      target_length: formatNumber(targetLength),
      average_required_speed: formatNumber(speedRatio),
    },
    orbit_summary: {
      receiver_count: receiverProfiles.length,
      all_receiver_labels_covered: receiverProfiles.length === OCTAHEDRAL_SITES.length,
      active_root_counts: rootCounts,
      forcing_mean_abs_max: formatNumber(maxAbs(forcingMeans)),
      primitive_minimum_spread: formatNumber(Math.max(...primitiveMinimums) - Math.min(...primitiveMinimums)),
      primitive_average_spread: formatNumber(Math.max(...primitiveAverages) - Math.min(...primitiveAverages)),
      primitive_maximum_spread: formatNumber(Math.max(...primitiveMaximums) - Math.min(...primitiveMaximums)),
      clock_initial_speed_spread: formatNumber(Math.max(...clockInitialSpeeds) - Math.min(...clockInitialSpeeds)),
      speed_minimum_spread: formatNumber(Math.max(...speedMinimums) - Math.min(...speedMinimums)),
      speed_maximum_spread: formatNumber(Math.max(...speedMaximums) - Math.min(...speedMaximums)),
      weakest_positivity_margin: formatNumber(Math.min(...positivityMargins)),
      strongest_positivity_margin: formatNumber(Math.max(...positivityMargins)),
      orbit_reference_speed_interval: referenceProfile.sampled_clock_length_criterion.corrected_speed_interval,
      orbit_symmetry_status:
        Math.max(...positivityMargins) - Math.min(...positivityMargins) < 1e-9
          ? "sampled-octahedral-receiver-orbit-matched"
          : "sampled-receiver-orbit-positive-profile",
    },
    receiver_profile_rows: receiverProfileRows,
    artifact_claim: {
      certifies_sampled_receiver_orbit_positive_profile: positivityMargins.every((margin) => margin > 0),
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "sampled six-receiver fold-aware clock/length orbit diagnostic; not an interval certificate and not retained",
    },
    result: {
      theory_status: positivityMargins.every((margin) => margin > 0)
        ? "sampled-fold-aware-clock-length-receiver-orbit-positive-profile"
        : "sampled-fold-aware-clock-length-receiver-orbit-profile-failed",
      first_successor_row:
        "interval-receiver-orbit-excursion-certificate-normal-reconstruction-action-noether-event-export-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The sampled receiver orbit gives positive clock/length speed profiles for all six octahedral receivers. This is a sampled orbit diagnostic, not a retained branch.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareClockLengthOrbitScan(artifact) {
  const errors = [];
  assertField(
    artifact?.schema === OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_ORBIT_SCAN_SCHEMA,
    "schema must match fold-aware clock length orbit scan schema",
    errors
  );
  assertField(artifact?.packet_id === PACKET_ID, "packet id must match clock length orbit scan packet", errors);
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.source_profile_check?.valid === true,
    "source clock length profile scan must validate",
    errors
  );
  assertField(
    artifact?.scan_parameters?.speed_constraint === "none; no fixed speed window is imposed",
    "orbit scan must not impose a fixed speed window",
    errors
  );
  assertField(
    Array.isArray(artifact?.receiver_profile_rows) && artifact.receiver_profile_rows.length === 6,
    "orbit scan must emit six receiver rows",
    errors
  );
  assertField(
    Array.isArray(artifact?.scan_parameters?.receiver_labels) &&
      artifact.scan_parameters.receiver_labels.length === 6 &&
      new Set(artifact.scan_parameters.receiver_labels).size === 6,
    "orbit scan must declare six unique receiver labels",
    errors
  );
  assertField(
    artifact?.orbit_summary?.receiver_count === 6 &&
      artifact?.orbit_summary?.all_receiver_labels_covered === true,
    "orbit summary must cover six receivers",
    errors
  );
  if (Array.isArray(artifact?.receiver_profile_rows)) {
    for (const row of artifact.receiver_profile_rows) {
      assertField(
        Array.isArray(row?.active_root_counts) &&
          Math.min(...row.active_root_counts) >= 7 &&
          row.active_root_counts.includes(9),
        "each receiver row must keep the projected fold-aware root counts",
        errors
      );
      assertField(Number(row?.jacobian_abs_floor) > 0.1, "each receiver row must stay sampled root-regular", errors);
      assertField(Math.abs(Number(row?.forcing_mean)) < 1e-9, "each receiver row forcing mean must be near zero", errors);
      assertField(
        Math.abs(Number(row?.primitive_return_residual)) < 1e-9,
        "each receiver row primitive return residual must be near zero",
        errors
      );
      assertField(Number(row?.positivity_margin) > 2, "each receiver row must have a large positive speed margin", errors);
      assertField(
        row?.certifies_interval_clock_length_return === false &&
          row?.certifies_bounded_speed_live_ledger === false &&
          row?.retained_branch === false,
        "receiver rows must not claim interval clock/length, live ledger, or retention",
        errors
      );
    }
  }
  assertField(
    Number(artifact?.orbit_summary?.weakest_positivity_margin) > 2,
    "sampled receiver orbit must have a large positive speed margin",
    errors
  );
  assertField(
    Array.isArray(artifact?.orbit_summary?.active_root_counts) &&
      Math.min(...artifact.orbit_summary.active_root_counts) >= 7 &&
      artifact.orbit_summary.active_root_counts.includes(9),
    "sampled orbit must keep the fold-aware projected root ledger",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_sampled_receiver_orbit_positive_profile === true &&
      artifact?.artifact_claim?.certifies_receiver_orbit_interval_clock_length_return === false &&
      artifact?.artifact_claim?.certifies_bounded_speed_live_ledger === false &&
      artifact?.result?.retained_branch === false &&
      artifact?.result?.retention === "not_retained",
    "orbit scan must certify only sampled positivity and not retention",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-clock-length-orbit-scan.mjs [options]",
    "",
    "Options:",
    "  --samples <n>          Number of period samples (default: 64)",
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
          schema: "neutral-braid-octahedral-fold-aware-clock-length-orbit-scan-schema/v1",
          artifact_schema: OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_ORBIT_SCAN_SCHEMA,
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
    const errors = validateOctahedralFoldAwareClockLengthOrbitScan(artifact);
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

  const artifact = buildOctahedralFoldAwareClockLengthOrbitScan({
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

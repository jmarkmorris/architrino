#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { evaluateClockLengthCriterion } from "./octahedral-fold-aware-clock-length-criterion.mjs";
import { evaluatePointwiseTangentialWitness } from "./octahedral-fold-aware-dynamics-handoff.mjs";
import {
  buildOctahedralFoldAwareRepresentativeProfileDecomposition,
  validateOctahedralFoldAwareRepresentativeProfileDecomposition,
} from "./octahedral-fold-aware-representative-profile-decomposition.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_QUARTER_PROFILE_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-quarter-profile-certificate/v1";

const PACKET_ID = "octahedral_fold_aware_cross_binary_quarter_profile_certificate";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_SAMPLE_COUNT = 32;
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const RECEIVER_LABEL = "1+";
const TAU = 2 * Math.PI;
const QUARTER_PERIOD = Math.PI / 2;
const HALF_PERIOD = Math.PI;
const CHECK_TOLERANCE = 1e-10;

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  const rounded = Number(value.toFixed(12));
  return Math.abs(rounded) < 5e-13 ? 0 : rounded;
}

function formatSmallNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(12));
}

function uniqueSorted(values) {
  return [...new Set(values)].sort((left, right) => left - right);
}

function evaluateWitness(speedRatio, theta, rootSubdivisions) {
  return evaluatePointwiseTangentialWitness({
    speedRatio,
    theta,
    receiverLabel: RECEIVER_LABEL,
    rootSubdivisions,
  });
}

function buildQuarterProfile({ speedRatio, sampleCount, rootSubdivisions }) {
  const step = QUARTER_PERIOD / sampleCount;
  const rows = [];
  let primitive = 0;
  let primitiveMinimum = 0;
  let primitiveMaximum = 0;
  let primitiveSum = 0;
  let forcingMinimum = Infinity;
  let forcingMaximum = -Infinity;
  let forcingAbsMaximum = 0;
  let jacobianAbsFloor = Infinity;
  let maxQuarterShiftAntisymmetryResidual = 0;
  let maxHalfPeriodResidual = 0;
  let maxPartnerAbs = 0;
  let maxTotalMinusCrossAbs = 0;
  let sampledPeriodMeanResidualSum = 0;
  const activeRootCounts = [];
  const partnerRootCounts = [];
  const crossRootCounts = [];

  for (let index = 0; index < sampleCount; index += 1) {
    const theta = index * step;
    const base = evaluateWitness(speedRatio, theta, rootSubdivisions);
    const quarter = evaluateWitness(speedRatio, theta + QUARTER_PERIOD, rootSubdivisions);
    const half = evaluateWitness(speedRatio, theta + HALF_PERIOD, rootSubdivisions);
    const threeQuarter = evaluateWitness(
      speedRatio,
      theta + HALF_PERIOD + QUARTER_PERIOD,
      rootSubdivisions
    );
    const forcing = base.cross_tangential_value;
    const totalMinusCross = base.total_tangential_value - base.cross_tangential_value;
    const periodPairSum =
      base.cross_tangential_value +
      quarter.cross_tangential_value +
      half.cross_tangential_value +
      threeQuarter.cross_tangential_value;

    primitive += forcing * step;
    primitiveMinimum = Math.min(primitiveMinimum, primitive);
    primitiveMaximum = Math.max(primitiveMaximum, primitive);
    primitiveSum += primitive;
    forcingMinimum = Math.min(forcingMinimum, forcing);
    forcingMaximum = Math.max(forcingMaximum, forcing);
    forcingAbsMaximum = Math.max(forcingAbsMaximum, Math.abs(forcing));
    jacobianAbsFloor = Math.min(jacobianAbsFloor, base.jacobian_abs_min);
    maxQuarterShiftAntisymmetryResidual = Math.max(
      maxQuarterShiftAntisymmetryResidual,
      Math.abs(base.cross_tangential_value + quarter.cross_tangential_value)
    );
    maxHalfPeriodResidual = Math.max(
      maxHalfPeriodResidual,
      Math.abs(base.cross_tangential_value - half.cross_tangential_value)
    );
    maxPartnerAbs = Math.max(maxPartnerAbs, Math.abs(base.partner_tangential_value));
    maxTotalMinusCrossAbs = Math.max(maxTotalMinusCrossAbs, Math.abs(totalMinusCross));
    sampledPeriodMeanResidualSum += periodPairSum * step;
    activeRootCounts.push(base.active_root_count);
    partnerRootCounts.push(base.partner_root_count);
    crossRootCounts.push(base.cross_root_count);
    rows.push({
      theta: formatNumber(theta),
      forcing: formatNumber(forcing),
      primitive: formatNumber(primitive),
      active_root_count: base.active_root_count,
      partner_root_count: base.partner_root_count,
      cross_root_count: base.cross_root_count,
      jacobian_abs_min: formatNumber(base.jacobian_abs_min),
    });
  }

  const quarterIntegral = primitive;
  const transportedPrimitiveMinimum = Math.min(
    primitiveMinimum,
    quarterIntegral - primitiveMaximum
  );
  const transportedPrimitiveMaximum = Math.max(
    primitiveMaximum,
    quarterIntegral - primitiveMinimum
  );
  const transportedPrimitiveAverage = quarterIntegral / 2;
  const centeredExcursionRadius = Math.max(
    primitiveMaximum - transportedPrimitiveAverage,
    transportedPrimitiveAverage - primitiveMinimum
  );
  const clockCriterion = evaluateClockLengthCriterion({
    period: TAU,
    targetLength: TAU * speedRatio,
    excursionMinimum: transportedPrimitiveMinimum,
    excursionAverage: transportedPrimitiveAverage,
    excursionMaximum: transportedPrimitiveMaximum,
  });

  return {
    quarter_profile_summary: {
      forcing_minimum: formatNumber(forcingMinimum),
      forcing_maximum: formatNumber(forcingMaximum),
      forcing_abs_maximum: formatNumber(forcingAbsMaximum),
      quarter_integral: formatNumber(quarterIntegral),
      primitive_minimum: formatNumber(primitiveMinimum),
      primitive_average: formatNumber(primitiveSum / sampleCount),
      primitive_maximum: formatNumber(primitiveMaximum),
      primitive_endpoint_value: formatNumber(primitive),
      active_root_counts: uniqueSorted(activeRootCounts),
      partner_root_counts: uniqueSorted(partnerRootCounts),
      cross_root_counts: uniqueSorted(crossRootCounts),
      jacobian_abs_floor: formatNumber(jacobianAbsFloor),
      sample_rows: rows,
    },
    symmetry_transport_summary: {
      quarter_shift_identity: "f_cross(u+H/4)=-f_cross(u)",
      half_period_identity: "f_cross(u+H/2)=f_cross(u)",
      max_quarter_shift_antisymmetry_residual: formatSmallNumber(
        maxQuarterShiftAntisymmetryResidual
      ),
      max_half_period_residual: formatSmallNumber(maxHalfPeriodResidual),
      max_partner_abs: formatSmallNumber(maxPartnerAbs),
      max_total_minus_cross_abs: formatSmallNumber(maxTotalMinusCrossAbs),
      sampled_period_mean_residual: formatSmallNumber(sampledPeriodMeanResidualSum),
      status:
        maxQuarterShiftAntisymmetryResidual <= CHECK_TOLERANCE &&
        maxHalfPeriodResidual <= CHECK_TOLERANCE &&
        maxPartnerAbs <= CHECK_TOLERANCE &&
        maxTotalMinusCrossAbs <= CHECK_TOLERANCE &&
        Math.abs(sampledPeriodMeanResidualSum) <= CHECK_TOLERANCE
          ? "sampled-cross-binary-quarter-symmetry-transport-passed"
          : "sampled-cross-binary-quarter-symmetry-transport-failed",
    },
    transported_clock_profile_summary: {
      transport_identities: [
        "A_cross(u+H/4)=C_cross-A_cross(u)",
        "A_cross(u+H/2)=A_cross(u)",
        "Abar_cross=C_cross/2",
        "A_tilde_cross(u+H/4)=-A_tilde_cross(u)",
      ],
      transported_primitive_minimum: formatNumber(transportedPrimitiveMinimum),
      transported_primitive_average: formatNumber(transportedPrimitiveAverage),
      transported_primitive_maximum: formatNumber(transportedPrimitiveMaximum),
      centered_excursion_radius: formatNumber(centeredExcursionRadius),
      centered_speed_interval_formula:
        "nu_min=L/H-D_cross, nu_max=L/H+D_cross",
      centered_speed_minimum: formatNumber(speedRatio - centeredExcursionRadius),
      centered_speed_maximum: formatNumber(speedRatio + centeredExcursionRadius),
      sampled_clock_length_criterion: clockCriterion,
    },
  };
}

export function buildOctahedralFoldAwareCrossBinaryQuarterProfileCertificate(options = {}) {
  const sampleCount = Number.parseInt(options.sampleCount ?? DEFAULT_SAMPLE_COUNT, 10);
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  if (!Number.isInteger(sampleCount) || sampleCount < 16) {
    throw new Error("sampleCount must be an integer >= 16");
  }
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }

  const decomposition = buildOctahedralFoldAwareRepresentativeProfileDecomposition({
    sampleCount: 32,
    rootSubdivisions,
  });
  const decompositionErrors =
    validateOctahedralFoldAwareRepresentativeProfileDecomposition(decomposition);
  const speedRatio =
    decomposition.representative_profile_decomposition.speed_ratio_estimate;
  const profile = buildQuarterProfile({ speedRatio, sampleCount, rootSubdivisions });
  const sampledProfilePassed =
    decompositionErrors.length === 0 &&
    profile.symmetry_transport_summary.status ===
      "sampled-cross-binary-quarter-symmetry-transport-passed" &&
    profile.quarter_profile_summary.cross_root_counts.includes(4) &&
    profile.quarter_profile_summary.cross_root_counts.includes(6) &&
    profile.transported_clock_profile_summary.sampled_clock_length_criterion
      .positivity_status ===
      "positive-clock-length-speed-profile-certified-for-supplied-summary";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_QUARTER_PROFILE_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-representative-profile-decomposition.md",
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-clock-length-chart-closure-proof.md",
    ],
    priority_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-quarter-profile-certificate.md",
    source_decomposition_check: {
      schema: decomposition.schema,
      valid: decompositionErrors.length === 0,
      errors: decompositionErrors,
      theory_status: decomposition.result.theory_status,
      partner_null_certified:
        decomposition.artifact_claim.certifies_partner_pointwise_tangential_zero === true,
      cross_binary_period_mean_zero_certified:
        decomposition.artifact_claim.certifies_cross_binary_period_mean_zero === true,
    },
    source_chart_closure_check: {
      schema: decomposition.source_chart_closure_check.schema,
      valid: decomposition.source_chart_closure_check.valid,
      errors: decomposition.source_chart_closure_check.errors,
      theory_status: decomposition.source_chart_closure_check.theory_status,
      receiver_orbit_transport_certified:
        decomposition.source_chart_closure_check.receiver_orbit_transport_certified === true,
    },
    scan_parameters: {
      receiver_label: RECEIVER_LABEL,
      sample_count: sampleCount,
      root_subdivisions: rootSubdivisions,
      theta_domain: "[0,pi/2)",
      speed_constraint:
        "none; uses the certified positive speed-ratio zero enclosure only",
      speed_ratio_estimate: formatNumber(speedRatio),
      speed_ratio_enclosure:
        decomposition.representative_profile_decomposition.speed_ratio_enclosure,
      quadrature_convention:
        "left-endpoint sampled quarter primitive; not an interval enclosure",
    },
    quarter_profile_summary: profile.quarter_profile_summary,
    symmetry_transport_summary: profile.symmetry_transport_summary,
    transported_clock_profile_summary: profile.transported_clock_profile_summary,
    fold_guard_summary: {
      ordinary_global_jacobian_floor_claimed: false,
      regular_subcharts_required: true,
      explicit_fold_rows_required: true,
      observed_cross_root_counts: profile.quarter_profile_summary.cross_root_counts,
      coarea_interval_profile_still_required: true,
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_sampled_cross_binary_quarter_profile: sampledProfilePassed,
      certifies_cross_binary_period_mean_zero_by_sampled_symmetry:
        profile.symmetry_transport_summary.status ===
        "sampled-cross-binary-quarter-symmetry-transport-passed",
      certifies_sampled_cross_binary_clock_length_positive_profile:
        profile.transported_clock_profile_summary.sampled_clock_length_criterion
          .positivity_status ===
        "positive-clock-length-speed-profile-certified-for-supplied-summary",
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "sampled cross-binary quarter-profile reduction with positive transported clock profile; interval coarea profile remains open",
    },
    result: {
      theory_status: sampledProfilePassed
        ? "sampled-cross-binary-quarter-profile-positive-clock-check"
        : "sampled-cross-binary-quarter-profile-open",
      first_successor_row:
        "cross-binary-coarea-interval-quarter-profile-certificate-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The representative cross-binary remainder is reduced to a sampled quarter-period primitive with exact symmetry transport. The transported sampled clock profile remains positive, but no interval coarea profile or retained branch is certified.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryQuarterProfileCertificate(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_QUARTER_PROFILE_CERTIFICATE_SCHEMA,
    "schema must match cross-binary quarter profile certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match cross-binary quarter profile certificate packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.source_decomposition_check?.valid === true &&
      artifact?.source_decomposition_check?.partner_null_certified === true &&
      artifact?.source_decomposition_check?.cross_binary_period_mean_zero_certified ===
        true,
    "source decomposition must validate partner nullity and cross-binary period mean",
    errors
  );
  assertField(
    artifact?.source_chart_closure_check?.valid === true &&
      artifact?.source_chart_closure_check?.receiver_orbit_transport_certified ===
        true,
    "source chart closure must validate receiver-orbit transport",
    errors
  );
  assertField(
    artifact?.scan_parameters?.speed_constraint ===
      "none; uses the certified positive speed-ratio zero enclosure only",
    "quarter profile must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.scan_parameters?.quadrature_convention?.includes(
      "not an interval enclosure"
    ),
    "quarter profile must label the sampled quadrature convention",
    errors
  );
  assertField(
    Array.isArray(artifact?.quarter_profile_summary?.cross_root_counts) &&
      artifact.quarter_profile_summary.cross_root_counts.includes(4) &&
      artifact.quarter_profile_summary.cross_root_counts.includes(6),
    "quarter profile must observe both cross-binary root-count regimes",
    errors
  );
  assertField(
    JSON.stringify(artifact?.quarter_profile_summary?.partner_root_counts) === "[3]",
    "partner root count must stay three in the sampled quarter profile",
    errors
  );
  assertField(
    Math.abs(
      Number(
        artifact?.quarter_profile_summary?.primitive_endpoint_value
      ) - Number(artifact?.quarter_profile_summary?.quarter_integral)
    ) <= CHECK_TOLERANCE,
    "primitive endpoint must equal the sampled quarter integral",
    errors
  );
  assertField(
    artifact?.symmetry_transport_summary?.status ===
      "sampled-cross-binary-quarter-symmetry-transport-passed" &&
      Number(
        artifact?.symmetry_transport_summary
          ?.max_quarter_shift_antisymmetry_residual
      ) <= CHECK_TOLERANCE &&
      Number(artifact?.symmetry_transport_summary?.max_half_period_residual) <=
        CHECK_TOLERANCE &&
      Math.abs(
        Number(artifact?.symmetry_transport_summary?.sampled_period_mean_residual)
      ) <= CHECK_TOLERANCE,
    "symmetry transport residuals must pass",
    errors
  );
  assertField(
    artifact?.transported_clock_profile_summary?.sampled_clock_length_criterion
      ?.positivity_status ===
      "positive-clock-length-speed-profile-certified-for-supplied-summary" &&
      Number(
        artifact?.transported_clock_profile_summary?.sampled_clock_length_criterion
          ?.positivity_margin
      ) > 2,
    "transported sampled clock profile must remain positive with a large margin",
    errors
  );
  assertField(
    artifact?.transported_clock_profile_summary?.centered_speed_interval_formula ===
      "nu_min=L/H-D_cross, nu_max=L/H+D_cross" &&
      Math.abs(
        Number(artifact?.transported_clock_profile_summary?.centered_speed_minimum) -
          Number(
            artifact?.transported_clock_profile_summary?.sampled_clock_length_criterion
              ?.positivity_margin
          )
      ) <= CHECK_TOLERANCE,
    "transported clock profile must use the centered quarter-excursion formula",
    errors
  );
  assertField(
    artifact?.fold_guard_summary?.ordinary_global_jacobian_floor_claimed === false &&
      artifact?.fold_guard_summary?.regular_subcharts_required === true &&
      artifact?.fold_guard_summary?.explicit_fold_rows_required === true &&
      artifact?.fold_guard_summary?.coarea_interval_profile_still_required === true,
    "fold guard must reject a global ordinary Jacobian floor and keep coarea interval work open",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_cross_binary_coarea_interval_profile === false &&
      artifact?.artifact_claim?.certifies_representative_interval_profile === false &&
      artifact?.artifact_claim?.certifies_receiver_orbit_interval_clock_length_return ===
        false &&
      artifact?.artifact_claim?.certifies_bounded_speed_live_ledger === false,
    "artifact must leave interval profile, receiver-orbit interval return, and live ledger open",
    errors
  );
  assertField(
    artifact?.artifact_claim?.retained_branch === false &&
      artifact?.result?.retained_branch === false &&
      artifact?.result?.retention === "not_retained",
    "artifact must not claim retained branch status",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-quarter-profile-certificate.mjs [options]",
    "",
    "Options:",
    "  --samples <n>          Number of quarter-period samples (default: 32)",
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
          schema:
            "neutral-braid-octahedral-fold-aware-cross-binary-quarter-profile-certificate-schema/v1",
          artifact_schema:
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_QUARTER_PROFILE_CERTIFICATE_SCHEMA,
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
    const errors =
      validateOctahedralFoldAwareCrossBinaryQuarterProfileCertificate(artifact);
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

  const artifact = buildOctahedralFoldAwareCrossBinaryQuarterProfileCertificate({
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

#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareClockLengthChartClosureProof,
  validateOctahedralFoldAwareClockLengthChartClosureProof,
} from "./octahedral-fold-aware-clock-length-chart-closure-proof.mjs";
import { evaluatePointwiseTangentialWitness } from "./octahedral-fold-aware-dynamics-handoff.mjs";
import {
  OCTAHEDRAL_FOLD_AWARE_ZERO_BRACKET_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareZeroBracketCertificate,
  validateOctahedralFoldAwareZeroBracketCertificate,
} from "./octahedral-fold-aware-zero-bracket-certificate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_REPRESENTATIVE_PROFILE_DECOMPOSITION_SCHEMA =
  "neutral-braid-octahedral-fold-aware-representative-profile-decomposition/v1";

const PACKET_ID = "octahedral_fold_aware_representative_profile_decomposition";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_SAMPLE_COUNT = 64;
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const REPRESENTATIVE_RECEIVER_LABEL = "1+";
const PARTNER_SOURCE_LABEL = "1-";
const WITNESS_THETA = Math.PI / 4;
const NULL_TOLERANCE = 1e-10;
const TAU = 2 * Math.PI;

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

function buildPartnerScalarRows(zeroCertificate) {
  const speedRatio = Number(zeroCertificate.zero_existence_certificate.speed_ratio_estimate);
  const rows = zeroCertificate.zero_existence_certificate.row.rows;
  return rows.map((row) => {
    const scalarContribution = row.contribution / (TAU * speedRatio);
    return {
      sheet: row.sheet,
      q: row.q,
      x: row.x,
      phase_delay: row.phase_delay,
      jacobian: row.jacobian,
      period_contribution: row.contribution,
      scalar_tangential_contribution: formatSmallNumber(scalarContribution),
      proportionality_residual: formatSmallNumber(row.contribution - TAU * speedRatio * scalarContribution),
    };
  });
}

function summarizePartnerNullSamples(speedRatio, sampleCount, rootSubdivisions) {
  const sampleRows = [];
  let maxPartnerAbs = 0;
  let maxTotalMinusCrossAbs = 0;
  let maxCrossQuarterAntisymmetryResidual = 0;
  let maxCrossHalfPeriodResidual = 0;
  let minTotalAbs = Infinity;
  let witnessAtPiOver4 = null;

  for (let sampleIndex = 0; sampleIndex < sampleCount; sampleIndex += 1) {
    const theta = (TAU * sampleIndex) / sampleCount;
    const witness = evaluatePointwiseTangentialWitness({
      speedRatio,
      theta,
      receiverLabel: REPRESENTATIVE_RECEIVER_LABEL,
      rootSubdivisions,
    });
    const totalMinusCross =
      witness.total_tangential_value - witness.cross_tangential_value;
    const quarterShiftWitness = evaluatePointwiseTangentialWitness({
      speedRatio,
      theta: theta + Math.PI / 2,
      receiverLabel: REPRESENTATIVE_RECEIVER_LABEL,
      rootSubdivisions,
    });
    const halfPeriodWitness = evaluatePointwiseTangentialWitness({
      speedRatio,
      theta: theta + Math.PI,
      receiverLabel: REPRESENTATIVE_RECEIVER_LABEL,
      rootSubdivisions,
    });
    maxPartnerAbs = Math.max(maxPartnerAbs, Math.abs(witness.partner_tangential_value));
    maxTotalMinusCrossAbs = Math.max(maxTotalMinusCrossAbs, Math.abs(totalMinusCross));
    maxCrossQuarterAntisymmetryResidual = Math.max(
      maxCrossQuarterAntisymmetryResidual,
      Math.abs(witness.cross_tangential_value + quarterShiftWitness.cross_tangential_value)
    );
    maxCrossHalfPeriodResidual = Math.max(
      maxCrossHalfPeriodResidual,
      Math.abs(witness.cross_tangential_value - halfPeriodWitness.cross_tangential_value)
    );
    minTotalAbs = Math.min(minTotalAbs, Math.abs(witness.total_tangential_value));
    sampleRows.push({
      theta: formatNumber(theta),
      active_root_count: witness.active_root_count,
      partner_root_count: witness.partner_root_count,
      cross_root_count: witness.cross_root_count,
      partner_tangential_value: formatSmallNumber(witness.partner_tangential_value),
      total_minus_cross_tangential_value: formatSmallNumber(totalMinusCross),
      total_tangential_value: formatNumber(witness.total_tangential_value),
      cross_tangential_value: formatNumber(witness.cross_tangential_value),
    });
  }

  witnessAtPiOver4 = evaluatePointwiseTangentialWitness({
    speedRatio,
    theta: WITNESS_THETA,
    receiverLabel: REPRESENTATIVE_RECEIVER_LABEL,
    rootSubdivisions,
  });

  const partnerRootCounts = uniqueSorted(sampleRows.map((row) => row.partner_root_count));
  const crossRootCounts = uniqueSorted(sampleRows.map((row) => row.cross_root_count));
  const activeRootCounts = uniqueSorted(sampleRows.map((row) => row.active_root_count));
  const passed =
    maxPartnerAbs <= NULL_TOLERANCE &&
    maxTotalMinusCrossAbs <= NULL_TOLERANCE &&
    partnerRootCounts.length === 1 &&
    partnerRootCounts[0] === 3;

  return {
    receiver_label: REPRESENTATIVE_RECEIVER_LABEL,
    sample_count: sampleCount,
    root_subdivisions: rootSubdivisions,
    tolerance: NULL_TOLERANCE,
    max_partner_tangential_abs: formatSmallNumber(maxPartnerAbs),
    max_total_minus_cross_tangential_abs: formatSmallNumber(maxTotalMinusCrossAbs),
    cross_binary_symmetry: {
      quarter_shift_identity: "f_cross(u+H/4)=-f_cross(u)",
      half_period_identity: "f_cross(u+H/2)=f_cross(u)",
      max_quarter_shift_antisymmetry_residual: formatSmallNumber(
        maxCrossQuarterAntisymmetryResidual
      ),
      max_half_period_residual: formatSmallNumber(maxCrossHalfPeriodResidual),
      status:
        maxCrossQuarterAntisymmetryResidual <= NULL_TOLERANCE &&
        maxCrossHalfPeriodResidual <= NULL_TOLERANCE
          ? "cross-binary-quarter-antisymmetry-check-passed"
          : "cross-binary-quarter-antisymmetry-check-failed",
    },
    min_total_tangential_abs_over_samples: formatSmallNumber(minTotalAbs),
    active_root_counts: activeRootCounts,
    partner_root_counts: partnerRootCounts,
    cross_root_counts: crossRootCounts,
    sample_rows: sampleRows,
    fixed_speed_rejection_witness: {
      theta: formatNumber(witnessAtPiOver4.theta),
      active_root_count: witnessAtPiOver4.active_root_count,
      partner_root_count: witnessAtPiOver4.partner_root_count,
      cross_root_count: witnessAtPiOver4.cross_root_count,
      total_tangential_value: formatNumber(witnessAtPiOver4.total_tangential_value),
      partner_tangential_value: formatSmallNumber(witnessAtPiOver4.partner_tangential_value),
      cross_tangential_value: formatNumber(witnessAtPiOver4.cross_tangential_value),
      jacobian_abs_min: formatNumber(witnessAtPiOver4.jacobian_abs_min),
      status:
        Math.abs(witnessAtPiOver4.total_tangential_value) > 0.1 &&
        Math.abs(witnessAtPiOver4.partner_tangential_value) <= NULL_TOLERANCE
          ? "fixed-speed-total-tangential-closure-still-rejected"
          : "fixed-speed-total-tangential-closure-witness-open",
    },
    status: passed
      ? "representative-partner-pointwise-null-check-passed"
      : "representative-partner-pointwise-null-check-failed",
  };
}

export function buildOctahedralFoldAwareRepresentativeProfileDecomposition(options = {}) {
  const sampleCount = Number.parseInt(options.sampleCount ?? DEFAULT_SAMPLE_COUNT, 10);
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  if (!Number.isInteger(sampleCount) || sampleCount < 8) {
    throw new Error("sampleCount must be an integer >= 8");
  }
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }

  const zeroCertificate = buildOctahedralFoldAwareZeroBracketCertificate();
  const zeroErrors = validateOctahedralFoldAwareZeroBracketCertificate(zeroCertificate);
  const chartClosure = buildOctahedralFoldAwareClockLengthChartClosureProof({
    sampleCount: 24,
    rootSubdivisions,
  });
  const chartErrors = validateOctahedralFoldAwareClockLengthChartClosureProof(chartClosure);
  const speedRatio = Number(zeroCertificate.zero_existence_certificate.speed_ratio_estimate);
  const partnerScalarRows = buildPartnerScalarRows(zeroCertificate);
  const partnerScalarSum = partnerScalarRows.reduce(
    (sum, row) => sum + Number(row.scalar_tangential_contribution),
    0
  );
  const checksum = summarizePartnerNullSamples(speedRatio, sampleCount, rootSubdivisions);
  const partnerNullCertified =
    zeroErrors.length === 0 &&
    zeroCertificate.root_count_certificate.root_count_status ===
      "exactly-three-partner-roots-through-bracket" &&
    Math.abs(Number(zeroCertificate.zero_existence_certificate.residual_abs)) <= NULL_TOLERANCE &&
    Math.abs(partnerScalarSum) <= NULL_TOLERANCE &&
    checksum.status === "representative-partner-pointwise-null-check-passed";

  return {
    schema: OCTAHEDRAL_FOLD_AWARE_REPRESENTATIVE_PROFILE_DECOMPOSITION_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-zero-bracket-certificate.md",
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-clock-length-chart-closure-proof.md",
    ],
    priority_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-representative-profile-decomposition.md",
    successor_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-quarter-profile-certificate.md",
    source_zero_check: {
      schema: OCTAHEDRAL_FOLD_AWARE_ZERO_BRACKET_CERTIFICATE_SCHEMA,
      valid: zeroErrors.length === 0,
      errors: zeroErrors,
      root_count_status: zeroCertificate.root_count_certificate.root_count_status,
      zero_status: zeroCertificate.zero_existence_certificate.status,
      transversality_status: zeroCertificate.transversality_certificate.status,
    },
    source_chart_closure_check: {
      schema: chartClosure.schema,
      valid: chartErrors.length === 0,
      errors: chartErrors,
      theory_status: chartClosure.result.theory_status,
      receiver_orbit_transport_certified:
        chartClosure.artifact_claim.certifies_interval_receiver_orbit_symmetry_reduction === true,
    },
    representative_profile_decomposition: {
      receiver_label: REPRESENTATIVE_RECEIVER_LABEL,
      speed_constraint: "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only",
      speed_ratio_enclosure: zeroCertificate.zero_existence_certificate.speed_ratio_enclosure,
      speed_ratio_estimate: formatNumber(speedRatio),
      decomposition_identity:
        "f_{1+}^{fold}(u;v)=f_{partner}(u;v)+f_{cross}(u;v)",
      partner_source_label: PARTNER_SOURCE_LABEL,
      cross_source_labels: ["2+", "2-", "3+", "3-"],
      all_positive_roots_required: true,
      coarea_cross_binary_convention_required: true,
    },
    analytic_partner_null: {
      root_coordinate: "x=delta/2",
      positive_sheet_equation: "x-v*cos(x)=0, x in (0,pi/2)",
      negative_sheet_equation: "x+v*cos(x)=0, x in (pi/2,v), v<pi",
      scalar_root_formula:
        "S_alpha(v)=q_alpha*sin(x_alpha)/(4*x_alpha^2*abs(1+x_alpha*tan(x_alpha)))",
      period_contribution_formula:
        "P_alpha(v)=pi*tan(x_alpha)/(2*x_alpha*abs(1+x_alpha*tan(x_alpha)))",
      proportionality_relation: "P_alpha(v)=2*pi*v*S_alpha(v)",
      all_root_relation: "P_all(v)=2*pi*v*S_partner(v)",
      theta_independent: true,
      root_count_at_zero: partnerScalarRows.length,
      partner_scalar_rows: partnerScalarRows,
      partner_scalar_sum_estimate: formatSmallNumber(partnerScalarSum),
      period_integral_residual_abs:
        zeroCertificate.zero_existence_certificate.residual_abs,
      certifies_partner_pointwise_tangential_zero: partnerNullCertified,
      status: partnerNullCertified
        ? "partner-pointwise-tangential-zero-certified"
        : "partner-pointwise-tangential-zero-open",
    },
    cross_binary_remainder: {
      representative_identity_at_zero:
        "f_{1+}^{fold}(u;v_*)=f_{cross}(u;v_*) because f_{partner}(u;v_*)=0 pointwise",
      remaining_source_labels: ["2+", "2-", "3+", "3-"],
      remaining_profile_target:
        "cross-binary coarea interval enclosure for f_{1+}, A_min, A_bar, and A_max",
      symmetry_reduction: {
        quarter_shift_identity: "f_cross(u+H/4)=-f_cross(u)",
        half_period_identity: "f_cross(u+H/2)=f_cross(u)",
        exact_period_mean_zero: true,
        primitive_quarter_transport: "A_cross(u+H/4)=C_cross-A_cross(u)",
        primitive_half_period: "A_cross(u+H/2)=A_cross(u)",
        primitive_mean_relation: "Abar_cross=C_cross/2",
        interval_burden_after_symmetry:
          "enclose A_cross on one quarter-period and the quarter integral C_cross",
        certifies_cross_binary_period_mean_zero: true,
      },
      ordinary_jacobian_warning:
        "no single positive global J floor is claimed across projected cross-binary folds",
      regular_subcharts_required: true,
      explicit_fold_rows_required: true,
      certifies_cross_binary_coarea_interval_profile: false,
    },
    executable_checksum: checksum,
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_partner_pointwise_tangential_zero: partnerNullCertified,
      certifies_total_pointwise_tangential_zero: false,
      preserves_fixed_speed_pointwise_obstruction:
        checksum.fixed_speed_rejection_witness.status ===
        "fixed-speed-total-tangential-closure-still-rejected",
      certifies_cross_binary_period_mean_zero:
        checksum.cross_binary_symmetry.status ===
        "cross-binary-quarter-antisymmetry-check-passed",
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "representative partner row is pointwise null at the certified zero; cross-binary coarea interval profile remains open",
    },
    result: {
      theory_status: partnerNullCertified
        ? "fold-aware-representative-partner-null-decomposition-certified"
        : "fold-aware-representative-partner-null-decomposition-open",
      first_successor_row:
        "cross-binary-quarter-profile-certificate-created-coarea-interval-profile-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The representative receiver profile is decomposed: the antipodal-partner all-root scalar row vanishes pointwise at the certified partner zero, so the remaining representative interval burden is the cross-binary coarea profile.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareRepresentativeProfileDecomposition(artifact) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_REPRESENTATIVE_PROFILE_DECOMPOSITION_SCHEMA,
    "schema must match representative profile decomposition schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match representative profile decomposition packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.source_zero_check?.valid === true &&
      artifact?.source_chart_closure_check?.valid === true,
    "source zero bracket and chart closure artifacts must validate",
    errors
  );
  assertField(
    artifact?.representative_profile_decomposition?.speed_constraint ===
      "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only",
    "representative decomposition must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.representative_profile_decomposition?.receiver_label ===
      REPRESENTATIVE_RECEIVER_LABEL &&
      artifact?.representative_profile_decomposition?.partner_source_label ===
        PARTNER_SOURCE_LABEL,
    "decomposition must use the representative 1+ receiver and 1- antipodal partner",
    errors
  );
  assertField(
    artifact?.source_zero_check?.root_count_status ===
      "exactly-three-partner-roots-through-bracket" &&
      artifact?.analytic_partner_null?.root_count_at_zero === 3,
    "partner null proof must stay on the regular three-root partner sheet",
    errors
  );
  assertField(
    artifact?.analytic_partner_null?.theta_independent === true &&
      artifact?.analytic_partner_null?.proportionality_relation ===
        "P_alpha(v)=2*pi*v*S_alpha(v)" &&
      artifact?.analytic_partner_null?.all_root_relation ===
        "P_all(v)=2*pi*v*S_partner(v)",
    "partner null proof must state the theta-independent period proportionality",
    errors
  );
  assertField(
    Math.abs(Number(artifact?.analytic_partner_null?.partner_scalar_sum_estimate)) <=
      NULL_TOLERANCE &&
      Number(artifact?.analytic_partner_null?.period_integral_residual_abs) <=
        NULL_TOLERANCE &&
      artifact?.analytic_partner_null?.certifies_partner_pointwise_tangential_zero === true,
    "partner scalar sum must vanish at the certified zero",
    errors
  );
  assertField(
    artifact?.executable_checksum?.status ===
      "representative-partner-pointwise-null-check-passed" &&
      Number(artifact?.executable_checksum?.max_partner_tangential_abs) <=
        NULL_TOLERANCE &&
      Number(artifact?.executable_checksum?.max_total_minus_cross_tangential_abs) <=
        NULL_TOLERANCE &&
      JSON.stringify(artifact?.executable_checksum?.partner_root_counts) === "[3]",
      "executable checksum must confirm partner pointwise nullity across samples",
    errors
  );
  assertField(
    artifact?.executable_checksum?.cross_binary_symmetry?.status ===
      "cross-binary-quarter-antisymmetry-check-passed" &&
      Number(
        artifact?.executable_checksum?.cross_binary_symmetry
          ?.max_quarter_shift_antisymmetry_residual
      ) <= NULL_TOLERANCE &&
      Number(
        artifact?.executable_checksum?.cross_binary_symmetry?.max_half_period_residual
      ) <= NULL_TOLERANCE,
    "executable checksum must confirm cross-binary quarter antisymmetry",
    errors
  );
  assertField(
    artifact?.executable_checksum?.fixed_speed_rejection_witness?.status ===
      "fixed-speed-total-tangential-closure-still-rejected" &&
      Math.abs(
        Number(
          artifact?.executable_checksum?.fixed_speed_rejection_witness
            ?.total_tangential_value
        )
      ) > 0.1,
    "decomposition must preserve the fixed-speed total tangential obstruction",
    errors
  );
  assertField(
    artifact?.cross_binary_remainder?.certifies_cross_binary_coarea_interval_profile ===
      false &&
      artifact?.cross_binary_remainder?.symmetry_reduction
        ?.certifies_cross_binary_period_mean_zero === true &&
      artifact?.artifact_claim?.certifies_total_pointwise_tangential_zero === false &&
      artifact?.artifact_claim?.certifies_cross_binary_period_mean_zero === true &&
      artifact?.artifact_claim?.certifies_representative_interval_profile === false &&
      artifact?.artifact_claim?.certifies_receiver_orbit_interval_clock_length_return ===
        false &&
      artifact?.artifact_claim?.certifies_bounded_speed_live_ledger === false,
    "artifact must leave cross-binary profile, total pointwise zero, interval return, and live ledger open",
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
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-representative-profile-decomposition.mjs [options]",
    "",
    "Options:",
    "  --samples <n>          Number of partner-null checksum samples (default: 64)",
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
            "neutral-braid-octahedral-fold-aware-representative-profile-decomposition-schema/v1",
          artifact_schema:
            OCTAHEDRAL_FOLD_AWARE_REPRESENTATIVE_PROFILE_DECOMPOSITION_SCHEMA,
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
      validateOctahedralFoldAwareRepresentativeProfileDecomposition(artifact);
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

  const artifact = buildOctahedralFoldAwareRepresentativeProfileDecomposition({
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

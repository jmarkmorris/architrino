#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas,
  validateOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas,
} from "./octahedral-fold-aware-cross-binary-fold-square-limit-atlas.mjs";
import {
  evaluateCrossBinaryForcingAndDerivativeAtTheta,
} from "./octahedral-fold-aware-cross-binary-forcing-derivative-atlas.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryForcingIntervalSignEnclosureTargetAtlas,
  validateOctahedralFoldAwareCrossBinaryForcingIntervalSignEnclosureTargetAtlas,
} from "./octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FOLD_COLLAR_SIGN_TRANSPORT_CERTIFICATE_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-fold-collar-sign-transport-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_fold_collar_sign_transport_certificate";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_SCAN_SAMPLES_PER_CELL = 96;
const DEFAULT_SOURCE_ATLAS_SAMPLE_COUNT = 64;
const DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT = 96;
const DEFAULT_DERIVATIVE_TAIL_SAMPLE_COUNT = 4;
const DEFAULT_Y_SAMPLES = [
  0.1,
  0.07,
  0.05,
  0.03,
  0.02,
  0.01,
  0.007,
  0.005,
  0.003,
  0.002,
  0.001,
];
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
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

function signLabel(value) {
  if (value > CHECK_TOLERANCE) {
    return "+";
  }
  if (value < -CHECK_TOLERANCE) {
    return "-";
  }
  return "0";
}

function parseYSamples(value) {
  if (Array.isArray(value)) {
    return value.map(Number);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((entry) => Number(entry.trim()))
      .filter((entry) => Number.isFinite(entry));
  }
  return [...DEFAULT_Y_SAMPLES];
}

function validateYSamples(ySamples) {
  if (
    !Array.isArray(ySamples) ||
    ySamples.length < 4 ||
    ySamples.some((entry) => !Number.isFinite(entry) || entry <= 0)
  ) {
    throw new Error("ySamples must contain at least four positive finite values");
  }
  for (let index = 1; index < ySamples.length; index += 1) {
    if (ySamples[index] >= ySamples[index - 1]) {
      throw new Error("ySamples must be strictly decreasing");
    }
  }
}

function expectedDerivativeSign(side, limit) {
  return side === "left" ? signLabel(limit) : signLabel(-limit);
}

function sideTau(side) {
  return side === "left" ? -1 : 1;
}

function sideDerivativeAsymptotic(side) {
  return side === "left"
    ? "f'_theta(theta_f-y^2) ~ L/(4y^3)"
    : "f'_theta(theta_f+y^2) ~ -L/(4y^3)";
}

function withDerivativeTailSamples({
  row,
  speedRatio,
  rootSubdivisions,
  derivativeTailSampleCount,
}) {
  const tailRows = row.sample_rows.slice(-derivativeTailSampleCount);
  return tailRows.map((sample) => {
    const derivativeRow = evaluateCrossBinaryForcingAndDerivativeAtTheta({
      speedRatio,
      theta: Number(sample.theta),
      rootSubdivisions,
    });
    const transportDerivativeNumerator =
      4 * Number(sample.y) ** 3 * derivativeRow.derivative;
    return {
      y: sample.y,
      theta: sample.theta,
      forcing: formatNumber(derivativeRow.value),
      derivative: formatNumber(derivativeRow.derivative),
      transport_derivative_numerator:
        formatNumber(transportDerivativeNumerator),
      forcing_sign: signLabel(derivativeRow.value),
      derivative_sign: signLabel(derivativeRow.derivative),
      transport_derivative_numerator_sign: signLabel(
        transportDerivativeNumerator
      ),
    };
  });
}

function buildSingularCollarRows({
  foldSquareAtlas,
  rootSubdivisions,
  derivativeTailSampleCount,
}) {
  const speedRatio = Number(foldSquareAtlas.square_limit_parameters.speed_ratio_estimate);
  return foldSquareAtlas.fold_square_limit_rows
    .filter((row) => row.side_kind === "singular-integrable-side")
    .map((row) => {
      const limit = Number(row.analytic_square_limit);
      const squareLimitSign = signLabel(limit);
      const derivativeSign = expectedDerivativeSign(row.side, limit);
      const sampleRows = row.sample_rows.map((sample) => ({
        y: sample.y,
        theta: sample.theta,
        forcing: sample.forcing,
        square_weighted_forcing: sample.square_weighted_forcing,
        forcing_sign: signLabel(Number(sample.forcing)),
        square_weighted_forcing_sign: signLabel(
          Number(sample.square_weighted_forcing)
        ),
      }));
      const derivativeTailRows = withDerivativeTailSamples({
        row,
        speedRatio,
        rootSubdivisions,
        derivativeTailSampleCount,
      });
      const sampleSignsPass = sampleRows.every(
        (sample) =>
          sample.forcing_sign === squareLimitSign &&
          sample.square_weighted_forcing_sign === squareLimitSign
      );
      const derivativeTailSignsPass = derivativeTailRows.every(
        (sample) =>
          sample.forcing_sign === squareLimitSign &&
          sample.derivative_sign === derivativeSign &&
          sample.transport_derivative_numerator_sign === derivativeSign
      );
      const sampleSquareWeightedMargins = sampleRows.map((sample) =>
        Math.abs(Number(sample.square_weighted_forcing))
      );
      const sampleSquareWeightedDrifts = sampleRows.map((sample) =>
        Math.abs(Number(sample.square_weighted_forcing) - limit)
      );
      return {
        certificate_id: `${row.fold_candidate_id}.${row.side}-fold-collar-sign-transport`,
        source_target_id: `${row.fold_candidate_id}.${row.side}-fold-collar`,
        fold_candidate_id: row.fold_candidate_id,
        source_label: row.source_label,
        theta_fold: row.theta_fold,
        side: row.side,
        side_tau: sideTau(row.side),
        theta_substitution: row.theta_substitution,
        transformed_integrand: row.transformed_integrand,
        analytic_square_limit: row.analytic_square_limit,
        square_limit_estimate: row.square_limit_estimate,
        analytic_comparison_abs: row.analytic_comparison_abs,
        square_limit_sign: squareLimitSign,
        target_square_limit_radius: formatSmallNumber(0.5 * Math.abs(limit)),
        forcing_sign_for_small_y: squareLimitSign,
        derivative_sign_for_small_y: derivativeSign,
        transport_derivative_numerator_sign_for_small_y: derivativeSign,
        signed_limit_margin: formatSmallNumber(Math.abs(limit)),
        minimum_sample_square_weighted_sign_margin: formatSmallNumber(
          Math.min(...sampleSquareWeightedMargins)
        ),
        max_abs_drift_from_analytic_limit: formatSmallNumber(
          Math.max(...sampleSquareWeightedDrifts)
        ),
        last_step_drift_abs: formatSmallNumber(
          sampleSquareWeightedDrifts[sampleSquareWeightedDrifts.length - 1]
        ),
        derivative_asymptotic: sideDerivativeAsymptotic(row.side),
        theorem_status:
          squareLimitSign !== "0"
            ? "conditional-fold-collar-sign-transport-proved"
            : "conditional-fold-collar-sign-transport-open",
        sample_rows: sampleRows,
        derivative_tail_sample_rows: derivativeTailRows,
        sample_sign_status: sampleSignsPass
          ? "sampled-fold-collar-forcing-signs-certified"
          : "sampled-fold-collar-forcing-signs-open",
        derivative_tail_sign_status: derivativeTailSignsPass
          ? "sampled-fold-collar-derivative-tail-signs-certified"
          : "sampled-fold-collar-derivative-tail-signs-open",
      };
    });
}

function summarizeCollarRows(rows) {
  return {
    singular_collar_count: rows.length,
    negative_square_limit_count: rows.filter(
      (row) => row.square_limit_sign === "-"
    ).length,
    derivative_tail_sample_count_per_collar:
      rows[0]?.derivative_tail_sample_rows?.length ?? 0,
    minimum_signed_limit_margin: formatSmallNumber(
      Math.min(...rows.map((row) => Number(row.signed_limit_margin)))
    ),
    collar_ids: rows.map((row) => row.certificate_id),
    derivative_tail_signs: Object.fromEntries(
      rows.map((row) => [row.certificate_id, row.derivative_sign_for_small_y])
    ),
    status:
      rows.length === 2 &&
      rows.every(
        (row) =>
          row.theorem_status ===
            "conditional-fold-collar-sign-transport-proved" &&
          row.sample_sign_status ===
            "sampled-fold-collar-forcing-signs-certified" &&
          row.derivative_tail_sign_status ===
            "sampled-fold-collar-derivative-tail-signs-certified"
      )
        ? "fold-collar-sign-transport-certified"
        : "fold-collar-sign-transport-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryFoldCollarSignTransportCertificate(
  options = {}
) {
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  const scanSamplesPerCell = Number.parseInt(
    options.scanSamplesPerCell ?? DEFAULT_SCAN_SAMPLES_PER_CELL,
    10
  );
  const sourceAtlasSampleCount = Number.parseInt(
    options.sourceAtlasSampleCount ?? DEFAULT_SOURCE_ATLAS_SAMPLE_COUNT,
    10
  );
  const sourceQuadraturePanelsPerSegment = Number.parseInt(
    options.sourceQuadraturePanelsPerSegment ??
      DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT,
    10
  );
  const derivativeTailSampleCount = Number.parseInt(
    options.derivativeTailSampleCount ?? DEFAULT_DERIVATIVE_TAIL_SAMPLE_COUNT,
    10
  );
  const ySamples = parseYSamples(options.ySamples);
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  if (!Number.isInteger(scanSamplesPerCell) || scanSamplesPerCell < 16) {
    throw new Error("scanSamplesPerCell must be an integer >= 16");
  }
  if (!Number.isInteger(sourceAtlasSampleCount) || sourceAtlasSampleCount < 16) {
    throw new Error("sourceAtlasSampleCount must be an integer >= 16");
  }
  if (
    !Number.isInteger(sourceQuadraturePanelsPerSegment) ||
    sourceQuadraturePanelsPerSegment < 32
  ) {
    throw new Error("sourceQuadraturePanelsPerSegment must be an integer >= 32");
  }
  if (
    !Number.isInteger(derivativeTailSampleCount) ||
    derivativeTailSampleCount < 1 ||
    derivativeTailSampleCount > ySamples.length
  ) {
    throw new Error(
      "derivativeTailSampleCount must be an integer between 1 and ySamples.length"
    );
  }
  validateYSamples(ySamples);

  const targetAtlas =
    buildOctahedralFoldAwareCrossBinaryForcingIntervalSignEnclosureTargetAtlas({
      rootSubdivisions,
      scanSamplesPerCell,
      sourceAtlasSampleCount,
      sourceQuadraturePanelsPerSegment,
    });
  const targetErrors =
    validateOctahedralFoldAwareCrossBinaryForcingIntervalSignEnclosureTargetAtlas(
      targetAtlas
    );
  const foldSquareAtlas = buildOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas({
    rootSubdivisions,
    scanSamplesPerCell,
    sourceAtlasSampleCount,
    sourceQuadraturePanelsPerSegment,
    ySamples,
  });
  const foldSquareErrors =
    validateOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas(foldSquareAtlas);
  const singularCollarRows = buildSingularCollarRows({
    foldSquareAtlas,
    rootSubdivisions,
    derivativeTailSampleCount,
  });
  const summary = summarizeCollarRows(singularCollarRows);
  const certificatePassed =
    targetErrors.length === 0 &&
    foldSquareErrors.length === 0 &&
    summary.status === "fold-collar-sign-transport-certified";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FOLD_COLLAR_SIGN_TRANSPORT_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas.md",
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-fold-collar-sign-transport-certificate.md",
    source_interval_sign_target_atlas_check: {
      schema: targetAtlas.schema,
      valid: targetErrors.length === 0,
      errors: targetErrors,
      theory_status: targetAtlas.result.theory_status,
      retained_branch: targetAtlas.result.retained_branch,
      emits_interval_sign_enclosure_targets:
        targetAtlas.artifact_claim.emits_interval_sign_enclosure_targets === true,
      certifies_interval_sign_topology:
        targetAtlas.artifact_claim.certifies_interval_sign_topology === true,
    },
    source_fold_square_limit_atlas_check: {
      schema: foldSquareAtlas.schema,
      valid: foldSquareErrors.length === 0,
      errors: foldSquareErrors,
      theory_status: foldSquareAtlas.result.theory_status,
      retained_branch: foldSquareAtlas.result.retained_branch,
      sampled_fold_square_limit_atlas_certified:
        foldSquareAtlas.artifact_claim.certifies_sampled_fold_square_limit_atlas ===
        true,
      certifies_interval_fold_limit_enclosure:
        foldSquareAtlas.artifact_claim.certifies_interval_fold_limit_enclosure ===
        true,
    },
    collar_parameters: {
      receiver_label: "1+",
      theta_domain: "[0,H/4]",
      root_subdivisions: rootSubdivisions,
      scan_samples_per_cell: scanSamplesPerCell,
      source_atlas_sample_count: sourceAtlasSampleCount,
      source_quadrature_panels_per_segment: sourceQuadraturePanelsPerSegment,
      y_samples: ySamples.map(formatNumber),
      derivative_tail_sample_count: derivativeTailSampleCount,
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_estimate: foldSquareAtlas.square_limit_parameters.speed_ratio_estimate,
      speed_ratio_enclosure:
        foldSquareAtlas.square_limit_parameters.speed_ratio_enclosure,
    },
    fold_collar_sign_transport_theorem: {
      theorem_id: "fold-collar-sign-transport",
      transformed_limit: "g(y)=2y f_cross(theta_f +/- y^2) -> L",
      transport_derivative_numerator_definition:
        "D(y)=tau*(y*d_y g(y)-g(y)), tau=-1 on left collars and tau=+1 on right collars",
      derivative_identity: "f'_theta(theta_f+tau*y^2)=D(y)/(4y^3)",
      forcing_conclusion: "f_cross(theta_f +/- y^2) ~ L/(2y)",
      left_derivative_conclusion:
        "for theta=theta_f-y^2, f'_theta ~ L/(4y^3)",
      right_derivative_conclusion:
        "for theta=theta_f+y^2, f'_theta ~ -L/(4y^3)",
      sign_transport_rule:
        "if G(y)<0 and D(y) has the side-transport sign on a certified collar, the folded-side forcing and theta-derivative signs follow from f=G/(2y) and f'_theta=D/(4y^3)",
      proof_status: "conditional-fold-collar-sign-transport-theorem-proved",
    },
    singular_collar_rows: singularCollarRows,
    collar_summary: summary,
    interval_profile_boundary: {
      certifies_conditional_fold_collar_sign_transport_theorem:
        certificatePassed,
      certifies_sampled_singular_collar_forcing_signs: certificatePassed,
      certifies_sampled_singular_collar_derivative_tail_signs: certificatePassed,
      certifies_sampled_singular_collar_transport_D_signs: certificatePassed,
      certifies_interval_fold_collar_enclosure: false,
      certifies_interval_sign_topology: false,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      open_quantities: [
        "outward-rounded enclosure that keeps G(y)=2y f_cross(theta_f +/- y^2) negative and D(y)=tau*(y*d_y G-G) signed on the whole collar",
        "regular-subcell interval derivative/sign enclosures",
        "candidate-value interval quadrature",
      ],
      next_interval_task:
        "upgrade the sampled fold-collar sign rows to outward-rounded square-coordinate enclosures and combine them with regular-subcell interval sign rows",
      status: "fold-collar-interval-enclosure-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_conditional_fold_collar_sign_transport_theorem:
        certificatePassed,
      certifies_sampled_singular_collar_forcing_signs: certificatePassed,
      certifies_sampled_singular_collar_derivative_tail_signs:
        certificatePassed,
      certifies_sampled_singular_collar_transport_D_signs: certificatePassed,
      certifies_interval_fold_collar_enclosure: false,
      certifies_interval_fold_limit_enclosure: false,
      certifies_interval_sign_topology: false,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "conditional fold-collar sign transport theorem plus sampled singular-collar G and D sign certificate; full interval sign topology and retained branch status remain open",
    },
    result: {
      theory_status: certificatePassed
        ? "sampled-source-atlas-aware-fold-collar-sign-transport-certified"
        : "source-atlas-aware-fold-collar-sign-transport-open",
      first_successor_row:
        "source-atlas-aware-fold-collar-square-coordinate-interval-enclosure-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The singular fold collars now have a closed sign-transport theorem and sampled finite-collar G and D sign evidence. This removes the need for bounded theta-derivative control at the folds but does not replace outward-rounded interval enclosures.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryFoldCollarSignTransportCertificate(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FOLD_COLLAR_SIGN_TRANSPORT_CERTIFICATE_SCHEMA,
    "schema must match fold collar sign transport certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match fold collar sign transport certificate packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.source_interval_sign_target_atlas_check?.valid === true &&
      artifact?.source_interval_sign_target_atlas_check
        ?.emits_interval_sign_enclosure_targets === true &&
      artifact?.source_interval_sign_target_atlas_check
        ?.certifies_interval_sign_topology === false,
    "source interval sign target atlas must validate without certifying interval sign topology",
    errors
  );
  assertField(
    artifact?.source_fold_square_limit_atlas_check?.valid === true &&
      artifact?.source_fold_square_limit_atlas_check
        ?.sampled_fold_square_limit_atlas_certified === true &&
      artifact?.source_fold_square_limit_atlas_check
        ?.certifies_interval_fold_limit_enclosure === false,
    "source fold-square atlas must validate without interval fold-limit enclosure",
    errors
  );
  assertField(
    artifact?.collar_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "fold collar sign transport certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.fold_collar_sign_transport_theorem?.proof_status ===
      "conditional-fold-collar-sign-transport-theorem-proved" &&
      artifact?.fold_collar_sign_transport_theorem?.derivative_identity?.includes(
        "D(y)/(4y^3)"
      ) &&
      artifact?.fold_collar_sign_transport_theorem?.left_derivative_conclusion?.includes(
        "L/(4y^3)"
      ) &&
      artifact?.fold_collar_sign_transport_theorem?.right_derivative_conclusion?.includes(
        "-L/(4y^3)"
      ),
    "fold collar theorem must state the left and right derivative sign transport laws",
    errors
  );
  assertField(
    Array.isArray(artifact?.singular_collar_rows) &&
      artifact.singular_collar_rows.length === 2,
    "certificate must emit two singular fold-collar rows",
    errors
  );
  const rowsById = Object.fromEntries(
    (artifact?.singular_collar_rows ?? []).map((row) => [
      row.certificate_id,
      row,
    ])
  );
  assertField(
    rowsById["fold.3-.left-fold-collar-sign-transport"]?.square_limit_sign ===
      "-" &&
      rowsById["fold.3-.left-fold-collar-sign-transport"]
        ?.derivative_sign_for_small_y === "-" &&
      Number(
        rowsById["fold.3-.left-fold-collar-sign-transport"]
          ?.signed_limit_margin
      ) > 0.19,
    "fold.3- left collar must transport negative forcing and negative derivative signs",
    errors
  );
  assertField(
    rowsById["fold.2+.right-fold-collar-sign-transport"]?.square_limit_sign ===
      "-" &&
      rowsById["fold.2+.right-fold-collar-sign-transport"]
        ?.derivative_sign_for_small_y === "+" &&
      Number(
        rowsById["fold.2+.right-fold-collar-sign-transport"]
          ?.signed_limit_margin
      ) > 0.32,
    "fold.2+ right collar must transport negative forcing and positive derivative signs",
    errors
  );
  assertField(
    artifact?.singular_collar_rows?.every(
      (row) =>
        row.theorem_status ===
          "conditional-fold-collar-sign-transport-proved" &&
        row.sample_sign_status ===
          "sampled-fold-collar-forcing-signs-certified" &&
        row.derivative_tail_sign_status ===
          "sampled-fold-collar-derivative-tail-signs-certified" &&
        row.derivative_tail_sample_rows.every(
          (sample) =>
            sample.transport_derivative_numerator_sign ===
            row.derivative_sign_for_small_y
        )
    ) === true,
    "all singular fold collars must have sampled forcing, derivative-tail, and D-sign certificates",
    errors
  );
  assertField(
    artifact?.collar_summary?.singular_collar_count === 2 &&
      artifact?.collar_summary?.negative_square_limit_count === 2 &&
      artifact?.collar_summary?.status ===
        "fold-collar-sign-transport-certified",
    "collar summary must certify the two negative singular collars",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_conditional_fold_collar_sign_transport_theorem === true &&
      artifact?.artifact_claim?.certifies_sampled_singular_collar_forcing_signs ===
        true &&
      artifact?.artifact_claim
        ?.certifies_sampled_singular_collar_derivative_tail_signs === true &&
      artifact?.artifact_claim
        ?.certifies_sampled_singular_collar_transport_D_signs === true &&
      artifact?.artifact_claim?.certifies_interval_fold_collar_enclosure ===
        false &&
      artifact?.artifact_claim?.certifies_interval_sign_topology === false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion === false &&
      artifact?.artifact_claim?.certifies_interval_quadrature_enclosure === false,
    "artifact must certify only conditional/sampled fold-collar sign transport",
    errors
  );
  assertField(
    artifact?.result?.theory_status ===
      "sampled-source-atlas-aware-fold-collar-sign-transport-certified" &&
      artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false &&
      artifact?.artifact_claim?.retained_branch === false,
    "result must be certified as sampled fold-collar sign transport and not retained",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-swarm/octahedral-fold-aware-cross-binary-fold-collar-sign-transport-certificate.mjs [options]",
    "",
    "Options:",
    "  --y-samples <csv>                  Strictly decreasing positive y samples",
    "  --derivative-tail-samples <n>      Number of smallest y samples with derivative rows (default: 4)",
    "  --source-atlas-samples <n>         Source fold atlas samples (default: 64)",
    "  --source-quadrature-panels <n>     Source critical-value quadrature panels per segment (default: 96)",
    "  --scan-subdivisions <n>            Primitive critical scan samples per cell (default: 96)",
    "  --subdivisions <n>                 Root search subdivisions (default: 5000)",
    "  --out <path>                       Write artifact JSON to path instead of stdout",
    "  --validate <path>                  Validate an existing artifact JSON file",
    "  --schema                           Print the artifact schema identifier",
    "  --pretty                           Pretty-print JSON output",
    "  --help                             Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    ySamples: [...DEFAULT_Y_SAMPLES],
    derivativeTailSampleCount: DEFAULT_DERIVATIVE_TAIL_SAMPLE_COUNT,
    sourceAtlasSampleCount: DEFAULT_SOURCE_ATLAS_SAMPLE_COUNT,
    sourceQuadraturePanelsPerSegment: DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT,
    scanSamplesPerCell: DEFAULT_SCAN_SAMPLES_PER_CELL,
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--schema") {
      args.schema = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--out") {
      args.out = argv[(index += 1)];
    } else if (arg === "--validate") {
      args.validate = argv[(index += 1)];
    } else if (arg === "--y-samples") {
      args.ySamples = parseYSamples(argv[(index += 1)]);
    } else if (arg === "--derivative-tail-samples") {
      args.derivativeTailSampleCount = argv[(index += 1)];
    } else if (arg === "--source-atlas-samples") {
      args.sourceAtlasSampleCount = argv[(index += 1)];
    } else if (arg === "--source-quadrature-panels") {
      args.sourceQuadraturePanelsPerSegment = argv[(index += 1)];
    } else if (arg === "--scan-subdivisions") {
      args.scanSamplesPerCell = argv[(index += 1)];
    } else if (arg === "--subdivisions") {
      args.rootSubdivisions = argv[(index += 1)];
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return;
  }
  if (args.schema) {
    console.log(
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FOLD_COLLAR_SIGN_TRANSPORT_CERTIFICATE_SCHEMA
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryFoldCollarSignTransportCertificate(
        artifact
      );
    if (errors.length > 0) {
      for (const error of errors) {
        console.error(error);
      }
      process.exitCode = 1;
    }
    return;
  }

  const artifact =
    buildOctahedralFoldAwareCrossBinaryFoldCollarSignTransportCertificate(args);
  const json = JSON.stringify(artifact, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.mkdirSync(path.dirname(args.out), { recursive: true });
    fs.writeFileSync(args.out, `${json}\n`);
  } else {
    console.log(json);
  }
}

if (process.argv[1] === SCRIPT_PATH) {
  main();
}

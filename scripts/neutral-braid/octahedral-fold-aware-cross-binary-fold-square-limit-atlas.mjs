#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryCriticalValueAtlas,
  validateOctahedralFoldAwareCrossBinaryCriticalValueAtlas,
} from "./octahedral-fold-aware-cross-binary-critical-value-atlas.mjs";
import {
  buildOctahedralFoldAwareCrossBinarySourceAtlas,
  validateOctahedralFoldAwareCrossBinarySourceAtlas,
} from "./octahedral-fold-aware-cross-binary-source-atlas.mjs";
import { evaluateCrossBinaryQuarterForcingAtTheta } from "./octahedral-fold-aware-cross-binary-primitive-critical-atlas.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FOLD_SQUARE_LIMIT_ATLAS_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-fold-square-limit-atlas/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_fold_square_limit_atlas";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_SCAN_SAMPLES_PER_CELL = 96;
const DEFAULT_SOURCE_ATLAS_SAMPLE_COUNT = 64;
const DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT = 96;
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
const RECEIVER_LABEL = "1+";
const QUARTER_PERIOD = Math.PI / 2;
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

function sideTheta({ foldTheta, side, y }) {
  return side === "left" ? foldTheta - y * y : foldTheta + y * y;
}

export function evaluateFoldSquareWeightedForcing({
  speedRatio,
  foldTheta,
  side,
  y,
  rootSubdivisions = DEFAULT_ROOT_SUBDIVISIONS,
}) {
  if (side !== "left" && side !== "right") {
    throw new Error("side must be left or right");
  }
  const theta = sideTheta({ foldTheta, side, y });
  if (!(theta > 0 && theta < QUARTER_PERIOD)) {
    throw new Error("fold-square sample leaves the quarter domain");
  }
  const forcing = evaluateCrossBinaryQuarterForcingAtTheta({
    speedRatio,
    theta,
    rootSubdivisions,
  });
  return {
    theta,
    forcing,
    square_weighted_forcing: 2 * y * forcing,
  };
}

function classifySquareLimit({ limitEstimate, forcingAbsMaximum }) {
  if (Math.abs(limitEstimate) > 0.05 && forcingAbsMaximum > 10) {
    return "singular-integrable-side";
  }
  if (Math.abs(limitEstimate) < 0.002 && forcingAbsMaximum < 1) {
    return "regular-side-with-zero-square-limit";
  }
  return "sampled-square-limit-classification-open";
}

function expectedSideKind({ candidateId, side }) {
  if (candidateId === "fold.3-" && side === "left") {
    return "singular-integrable-side";
  }
  if (candidateId === "fold.3-" && side === "right") {
    return "regular-side-with-zero-square-limit";
  }
  if (candidateId === "fold.2+" && side === "left") {
    return "regular-side-with-zero-square-limit";
  }
  if (candidateId === "fold.2+" && side === "right") {
    return "singular-integrable-side";
  }
  return "sampled-square-limit-classification-open";
}

function shiftedFoldTheta(sourceClass, thetaFold) {
  return sourceClass.theta_tilde_shift === "H/4"
    ? Number(thetaFold) + QUARTER_PERIOD
    : Number(thetaFold);
}

function findSourceFoldEndpoint({ sourceAtlas, sourceClass, thetaFold }) {
  const thetaTilde = shiftedFoldTheta(sourceClass, thetaFold);
  const endpoints =
    sourceAtlas?.kappa_fold_atlas?.kappa_positive_fold_endpoints ?? [];
  const endpoint = endpoints.find(
    (row) => Math.abs(Number(row.theta_tilde) - thetaTilde) <= 1e-9
  );
  if (!endpoint) {
    throw new Error(`no kappa=+1 fold endpoint found for ${sourceClass.source_label}`);
  }
  return endpoint;
}

function buildAnalyticFoldNormalForm({
  fold,
  side,
  sourceAtlas,
  speedRatio,
}) {
  const sourceLabel = fold.candidate_id.replace("fold.", "");
  const sourceClass = sourceAtlas.source_class_rows.find(
    (row) => row.source_label === sourceLabel
  );
  if (!sourceClass) {
    throw new Error(`no source class row found for ${sourceLabel}`);
  }
  const endpoint = findSourceFoldEndpoint({
    sourceAtlas,
    sourceClass,
    thetaFold: fold.theta,
  });
  const kappa = Number(endpoint.kappa);
  const sigma = Number(sourceClass.force_sign);
  const delta = Number(endpoint.delta);
  const phi = Number(endpoint.phi);
  const fTheta = 2 * Math.cos(phi);
  const fDeltaDelta =
    2 / (speedRatio * speedRatio) -
    Math.sin(phi) -
    kappa * Math.sin(delta);
  const kernelB = -0.5 * (Math.cos(phi) + kappa * Math.cos(delta));
  const alpha = (-2 * fTheta) / fDeltaDelta;
  const foldedSide = alpha < 0 ? "left" : "right";
  const foldedSideLimit =
    (8 * sigma * kernelB) /
    (speedRatio *
      delta *
      delta *
      Math.abs(fDeltaDelta) *
      Math.sqrt(Math.abs(alpha)));
  const analyticSquareLimit = side === foldedSide ? foldedSideLimit : 0;

  return {
    source_label: sourceLabel,
    kappa,
    force_sign: sigma,
    theta_tilde_fold: formatNumber(endpoint.theta_tilde),
    theta_fold: fold.theta,
    theta_tilde_shift: sourceClass.theta_tilde_shift,
    delta_fold: endpoint.delta,
    phi_fold: endpoint.phi,
    F_theta: formatNumber(fTheta),
    F_delta_delta: formatNumber(fDeltaDelta),
    B_kernel: formatNumber(kernelB),
    alpha: formatNumber(alpha),
    folded_side: foldedSide,
    analytic_square_limit: formatNumber(analyticSquareLimit),
    analytic_square_limit_status:
      side === foldedSide
        ? "folded-side-finite-limit"
        : "regular-side-zero-square-limit",
    formula:
      "L_f=8 sigma B_f/(v delta_f^2 |F_delta_delta| sqrt(|alpha_f|)) on the folded side, else 0",
  };
}

export function buildFoldSquareLimitRows({
  foldCandidates,
  sourceAtlas,
  speedRatio,
  ySamples = DEFAULT_Y_SAMPLES,
  rootSubdivisions = DEFAULT_ROOT_SUBDIVISIONS,
}) {
  validateYSamples(ySamples);
  const rows = [];

  for (const fold of foldCandidates) {
    const foldTheta = Number(fold.theta);
    for (const side of ["left", "right"]) {
      const analytic = buildAnalyticFoldNormalForm({
        fold,
        side,
        sourceAtlas,
        speedRatio,
      });
      const sampleRows = ySamples.map((y) => {
        const sample = evaluateFoldSquareWeightedForcing({
          speedRatio,
          foldTheta,
          side,
          y,
          rootSubdivisions,
        });
        return {
          y: formatNumber(y),
          theta: formatNumber(sample.theta),
          forcing: formatNumber(sample.forcing),
          square_weighted_forcing: formatNumber(
            sample.square_weighted_forcing
          ),
        };
      });
      const last = sampleRows[sampleRows.length - 1];
      const previous = sampleRows[sampleRows.length - 2];
      const limitEstimate = Number(last.square_weighted_forcing);
      const forcingAbsMaximum = sampleRows.reduce(
        (maximum, row) => Math.max(maximum, Math.abs(Number(row.forcing))),
        0
      );
      const sideKind = classifySquareLimit({
        limitEstimate,
        forcingAbsMaximum,
      });
      rows.push({
        fold_candidate_id: fold.candidate_id,
        source_label: fold.candidate_id.replace("fold.", ""),
        theta_fold: fold.theta,
        side,
        theta_substitution:
          side === "left"
            ? "theta=theta_f-y^2"
            : "theta=theta_f+y^2",
        transformed_integrand: "g_side(y)=2y f_cross(theta_f +/- y^2)",
        y_samples: ySamples.map(formatNumber),
        sample_rows: sampleRows,
        square_limit_estimate: formatNumber(limitEstimate),
        analytic_square_limit: analytic.analytic_square_limit,
        analytic_comparison_abs: formatSmallNumber(
          Math.abs(limitEstimate - Number(analytic.analytic_square_limit))
        ),
        fold_normal_form: analytic,
        square_limit_sign: signLabel(limitEstimate),
        last_step_drift_abs: formatSmallNumber(
          Math.abs(
            Number(last.square_weighted_forcing) -
              Number(previous.square_weighted_forcing)
          )
        ),
        forcing_abs_maximum_on_samples: formatNumber(forcingAbsMaximum),
        side_kind: sideKind,
        expected_side_kind: expectedSideKind({
          candidateId: fold.candidate_id,
          side,
        }),
        classification_matches_expected:
          sideKind ===
          expectedSideKind({
            candidateId: fold.candidate_id,
            side,
          }),
      });
    }
  }

  return rows;
}

function summarizeSquareLimitRows(rows) {
  const singularRows = rows.filter(
    (row) => row.side_kind === "singular-integrable-side"
  );
  const regularRows = rows.filter(
    (row) => row.side_kind === "regular-side-with-zero-square-limit"
  );
  return {
    fold_endpoint_count: new Set(rows.map((row) => row.fold_candidate_id)).size,
    one_sided_row_count: rows.length,
    singular_integrable_side_count: singularRows.length,
    regular_zero_square_limit_side_count: regularRows.length,
    singular_integrable_sides: singularRows.map(
      (row) => `${row.fold_candidate_id}:${row.side}`
    ),
    regular_zero_square_limit_sides: regularRows.map(
      (row) => `${row.fold_candidate_id}:${row.side}`
    ),
    max_regular_square_limit_abs: formatSmallNumber(
      regularRows.reduce(
        (maximum, row) =>
          Math.max(maximum, Math.abs(Number(row.square_limit_estimate))),
        0
      )
    ),
    max_side_classification_drift_abs: formatSmallNumber(
      rows.reduce(
        (maximum, row) => Math.max(maximum, Number(row.last_step_drift_abs)),
        0
      )
    ),
    status: rows.every((row) => row.classification_matches_expected)
      ? "sampled-fold-square-limit-regularization-derived"
      : "sampled-fold-square-limit-regularization-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas(
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
  validateYSamples(ySamples);

  const sourceAtlas = buildOctahedralFoldAwareCrossBinarySourceAtlas({
    sampleCount: sourceAtlasSampleCount,
    rootSubdivisions,
  });
  const sourceAtlasErrors =
    validateOctahedralFoldAwareCrossBinarySourceAtlas(sourceAtlas);
  const criticalValueAtlas =
    buildOctahedralFoldAwareCrossBinaryCriticalValueAtlas({
      rootSubdivisions,
      scanSamplesPerCell,
      quadraturePanelsPerSegment: sourceQuadraturePanelsPerSegment,
    });
  const criticalValueAtlasErrors =
    validateOctahedralFoldAwareCrossBinaryCriticalValueAtlas(criticalValueAtlas);
  const speedRatio = Number(
    criticalValueAtlas.quadrature_parameters.speed_ratio_estimate
  );
  const foldCandidates = criticalValueAtlas.candidate_value_rows.filter(
    (row) => row.candidate_type === "fold-endpoint-limit"
  );
  const foldRows = buildFoldSquareLimitRows({
    foldCandidates,
    sourceAtlas,
    speedRatio,
    ySamples,
    rootSubdivisions,
  });
  const summary = summarizeSquareLimitRows(foldRows);
  const foldSquareAtlasPassed =
    sourceAtlasErrors.length === 0 &&
    criticalValueAtlasErrors.length === 0 &&
    foldCandidates.length === 2 &&
    summary.status === "sampled-fold-square-limit-regularization-derived" &&
    summary.singular_integrable_side_count === 2 &&
    summary.regular_zero_square_limit_side_count === 2;

  return {
    schema: OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FOLD_SQUARE_LIMIT_ATLAS_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-critical-value-atlas.md",
    priority_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-fold-square-limit-atlas.md",
    source_atlas_check: {
      schema: sourceAtlas.schema,
      valid: sourceAtlasErrors.length === 0,
      errors: sourceAtlasErrors,
      theory_status: sourceAtlas.result.theory_status,
      retained_branch: sourceAtlas.result.retained_branch,
      kappa_plus_fold_atlas_certified:
        sourceAtlas.kappa_fold_atlas.status ===
        "kappa-plus-only-fold-atlas-certified",
    },
    source_critical_value_atlas_check: {
      schema: criticalValueAtlas.schema,
      valid: criticalValueAtlasErrors.length === 0,
      errors: criticalValueAtlasErrors,
      theory_status: criticalValueAtlas.result.theory_status,
      retained_branch: criticalValueAtlas.result.retained_branch,
      sampled_critical_value_atlas_certified:
        criticalValueAtlas.artifact_claim.certifies_sampled_critical_value_atlas ===
        true,
      certifies_interval_quadrature_enclosure:
        criticalValueAtlas.artifact_claim.certifies_interval_quadrature_enclosure ===
        true,
    },
    square_limit_parameters: {
      receiver_label: RECEIVER_LABEL,
      theta_domain: "[0,H/4]",
      root_subdivisions: rootSubdivisions,
      scan_samples_per_cell: scanSamplesPerCell,
      source_atlas_sample_count: sourceAtlasSampleCount,
      source_quadrature_panels_per_segment: sourceQuadraturePanelsPerSegment,
      y_samples: ySamples.map(formatNumber),
      speed_constraint:
        "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only",
      speed_ratio_estimate: formatNumber(speedRatio),
      speed_ratio_enclosure:
        criticalValueAtlas.quadrature_parameters.speed_ratio_enclosure,
    },
    square_coordinate_rule: {
      left_fold_substitution: "theta=theta_f-y^2",
      right_fold_substitution: "theta=theta_f+y^2",
      transformed_integrand: "g_side(y)=2y f_cross(theta_f +/- y^2)",
      fold_normal_form:
        "F_theta eta + (1/2)F_delta_delta xi^2=0, alpha=-2F_theta/F_delta_delta",
      folded_side_limit_formula:
        "L_f=8 sigma B_f/(v delta_f^2 |F_delta_delta| sqrt(|alpha_f|))",
      integrability_statement:
        "finite one-sided limits of g_side(y) turn the projected square-root fold singularity into a bounded endpoint integrand in the square coordinate",
      status: "fold-square-coordinate-regularization-stated",
    },
    fold_square_limit_rows: foldRows,
    fold_square_limit_summary: summary,
    interval_profile_boundary: {
      certifies_interval_fold_limit_enclosure: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_interval_critical_exhaustion: false,
      open_quantities: ["fold square limits", "C_cross", "m_Q", "M_Q"],
      next_interval_task:
        "replace the sampled one-sided square-limit rows with outward-rounded interval bounds and use them as endpoint data for interval quadrature on the five candidate segments",
      status: "fold-square-limit-interval-enclosure-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_source_atlas_aware_fold_side_assignment:
        sourceAtlasErrors.length === 0 &&
        summary.status === "sampled-fold-square-limit-regularization-derived",
      certifies_square_coordinate_endpoint_model: foldSquareAtlasPassed,
      certifies_sampled_critical_value_atlas:
        criticalValueAtlas.artifact_claim.certifies_sampled_critical_value_atlas ===
        true,
      certifies_sampled_fold_square_limit_atlas: foldSquareAtlasPassed,
      certifies_sampled_one_sided_fold_square_limits: foldSquareAtlasPassed,
      certifies_sampled_finite_transformed_integrand_limits:
        foldSquareAtlasPassed,
      certifies_sampled_integrable_fold_regularization: foldSquareAtlasPassed,
      certifies_interval_fold_limit_enclosure: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_interval_critical_exhaustion: false,
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "sampled square-coordinate fold regularization for the representative cross-binary quarter profile; interval endpoint and quadrature enclosures remain open",
    },
    result: {
      theory_status: foldSquareAtlasPassed
        ? "sampled-source-atlas-aware-fold-square-limit-atlas-certified"
        : "sampled-fold-square-limit-regularization-open",
      first_successor_row:
        "source-atlas-aware-fold-square-limit-interval-enclosure-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The projected fold singularities are now represented by finite sampled square-coordinate endpoint rows. This supplies endpoint data for a future interval quadrature proof but does not certify interval bounds or retained branch status.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FOLD_SQUARE_LIMIT_ATLAS_SCHEMA,
    "schema must match cross-binary fold square limit atlas schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match fold square limit atlas packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.source_atlas_check?.valid === true &&
      artifact?.source_atlas_check?.kappa_plus_fold_atlas_certified === true,
    "source atlas must validate the kappa-plus fold atlas",
    errors
  );
  assertField(
    artifact?.source_critical_value_atlas_check?.valid === true &&
      artifact?.source_critical_value_atlas_check
        ?.sampled_critical_value_atlas_certified === true &&
      artifact?.source_critical_value_atlas_check
        ?.certifies_interval_quadrature_enclosure === false,
    "source critical value atlas must validate without interval quadrature enclosure",
    errors
  );
  assertField(
    artifact?.square_limit_parameters?.speed_constraint ===
      "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only",
    "fold square limit atlas must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.square_coordinate_rule?.transformed_integrand ===
      "g_side(y)=2y f_cross(theta_f +/- y^2)" &&
      artifact?.square_coordinate_rule?.fold_normal_form?.includes(
        "alpha=-2F_theta/F_delta_delta"
      ) &&
      artifact?.square_coordinate_rule?.status ===
        "fold-square-coordinate-regularization-stated",
    "fold square limit atlas must state the square-coordinate regularization rule",
    errors
  );
  assertField(
    Array.isArray(artifact?.fold_square_limit_rows) &&
      artifact.fold_square_limit_rows.length === 4,
    "fold square limit atlas must emit four one-sided fold rows",
    errors
  );
  assertField(
    artifact?.fold_square_limit_rows?.every(
      (row) => row.classification_matches_expected === true
    ) === true,
    "all one-sided square-limit rows must match the expected fold-side classification",
    errors
  );
  const rowByKey = Object.fromEntries(
    (artifact?.fold_square_limit_rows ?? []).map((row) => [
      `${row.fold_candidate_id}:${row.side}`,
      row,
    ])
  );
  assertField(
    Number(rowByKey["fold.3-:left"]?.square_limit_estimate) < -0.18 &&
      Number(rowByKey["fold.3-:left"]?.square_limit_estimate) > -0.21 &&
      Number(rowByKey["fold.3-:left"]?.analytic_square_limit) < -0.19 &&
      Number(rowByKey["fold.3-:left"]?.analytic_square_limit) > -0.2 &&
      Number(rowByKey["fold.3-:left"]?.analytic_comparison_abs) < 0.001 &&
      rowByKey["fold.3-:left"]?.fold_normal_form?.folded_side === "left" &&
      rowByKey["fold.3-:left"]?.side_kind === "singular-integrable-side",
    "fold.3- left side must be the negative singular integrable side",
    errors
  );
  assertField(
    Math.abs(Number(rowByKey["fold.3-:right"]?.square_limit_estimate)) <
      0.001 &&
      Number(rowByKey["fold.3-:right"]?.analytic_square_limit) === 0 &&
      rowByKey["fold.3-:right"]?.side_kind ===
        "regular-side-with-zero-square-limit",
    "fold.3- right side must have zero square-limit classification",
    errors
  );
  assertField(
    Math.abs(Number(rowByKey["fold.2+:left"]?.square_limit_estimate)) <
      0.001 &&
      Number(rowByKey["fold.2+:left"]?.analytic_square_limit) === 0 &&
      rowByKey["fold.2+:left"]?.side_kind ===
        "regular-side-with-zero-square-limit",
    "fold.2+ left side must have zero square-limit classification",
    errors
  );
  assertField(
    Number(rowByKey["fold.2+:right"]?.square_limit_estimate) < -0.3 &&
      Number(rowByKey["fold.2+:right"]?.square_limit_estimate) > -0.35 &&
      Number(rowByKey["fold.2+:right"]?.analytic_square_limit) < -0.32 &&
      Number(rowByKey["fold.2+:right"]?.analytic_square_limit) > -0.33 &&
      Number(rowByKey["fold.2+:right"]?.analytic_comparison_abs) < 0.001 &&
      rowByKey["fold.2+:right"]?.fold_normal_form?.folded_side === "right" &&
      rowByKey["fold.2+:right"]?.side_kind === "singular-integrable-side",
    "fold.2+ right side must be the negative singular integrable side",
    errors
  );
  assertField(
    artifact?.fold_square_limit_summary?.singular_integrable_side_count === 2 &&
      artifact?.fold_square_limit_summary
        ?.regular_zero_square_limit_side_count === 2 &&
      artifact?.fold_square_limit_summary?.status ===
        "sampled-fold-square-limit-regularization-derived",
    "fold square summary must identify two singular sides and two zero square-limit sides",
    errors
  );
  assertField(
    artifact?.interval_profile_boundary?.certifies_interval_fold_limit_enclosure ===
      false &&
      artifact?.interval_profile_boundary?.certifies_interval_quadrature_enclosure ===
        false &&
      artifact?.interval_profile_boundary?.certifies_C_m_Q_M_Q_interval_enclosure ===
        false &&
      artifact?.interval_profile_boundary?.certifies_interval_critical_exhaustion ===
        false,
    "fold square limit atlas must leave interval fold, quadrature, and critical-exhaustion rows open",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_source_atlas_aware_fold_side_assignment ===
      true &&
      artifact?.artifact_claim?.certifies_square_coordinate_endpoint_model ===
        true &&
      artifact?.artifact_claim?.certifies_sampled_fold_square_limit_atlas === true &&
      artifact?.artifact_claim?.certifies_sampled_one_sided_fold_square_limits ===
        true &&
      artifact?.artifact_claim
        ?.certifies_sampled_finite_transformed_integrand_limits === true &&
      artifact?.artifact_claim?.certifies_sampled_integrable_fold_regularization ===
        true &&
      artifact?.artifact_claim?.certifies_interval_fold_limit_enclosure === false &&
      artifact?.artifact_claim?.certifies_interval_quadrature_enclosure === false &&
      artifact?.artifact_claim?.certifies_C_m_Q_M_Q_interval_enclosure === false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion === false &&
      artifact?.artifact_claim?.certifies_cross_binary_coarea_interval_profile ===
        false &&
      artifact?.artifact_claim?.certifies_bounded_speed_live_ledger === false,
    "artifact must certify only sampled fold-square regularization and leave interval/live-ledger rows open",
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
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-fold-square-limit-atlas.mjs [options]",
    "",
    "Options:",
    "  --y-samples <csv>              Strictly decreasing positive y samples",
    "  --source-atlas-samples <n>     Source atlas samples (default: 64)",
    "  --source-quadrature-panels <n> Critical-value predecessor panels (default: 96)",
    "  --scan-subdivisions <n>        Primitive critical scan samples per cell (default: 96)",
    "  --subdivisions <n>             Root search subdivisions (default: 5000)",
    "  --out <path>                   Write artifact JSON to path instead of stdout",
    "  --validate <path>              Validate an existing artifact JSON file",
    "  --schema                       Print the artifact schema identifier",
    "  --pretty                       Pretty-print JSON output",
    "  --help                         Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    ySamples: [...DEFAULT_Y_SAMPLES],
    sourceAtlasSampleCount: DEFAULT_SOURCE_ATLAS_SAMPLE_COUNT,
    sourceQuadraturePanelsPerSegment:
      DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT,
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
    if (arg === "--y-samples") {
      args.ySamples = parseYSamples(argv[++index]);
    } else if (arg === "--source-atlas-samples") {
      args.sourceAtlasSampleCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--source-quadrature-panels") {
      args.sourceQuadraturePanelsPerSegment = Number.parseInt(argv[++index], 10);
    } else if (arg === "--scan-subdivisions") {
      args.scanSamplesPerCell = Number.parseInt(argv[++index], 10);
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
            "neutral-braid-octahedral-fold-aware-cross-binary-fold-square-limit-atlas-schema/v1",
          artifact_schema:
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FOLD_SQUARE_LIMIT_ATLAS_SCHEMA,
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
      validateOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas(artifact);
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

  const artifact = buildOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas({
    rootSubdivisions: args.rootSubdivisions,
    scanSamplesPerCell: args.scanSamplesPerCell,
    sourceAtlasSampleCount: args.sourceAtlasSampleCount,
    sourceQuadraturePanelsPerSegment:
      args.sourceQuadraturePanelsPerSegment,
    ySamples: args.ySamples,
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

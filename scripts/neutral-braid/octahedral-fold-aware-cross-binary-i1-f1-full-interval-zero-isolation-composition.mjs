#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryI1ForcingBracketIntervalEnclosure,
  validateOctahedralFoldAwareCrossBinaryI1ForcingBracketIntervalEnclosure,
} from "./octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction,
  validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction,
} from "./octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-peak-budget-reduction.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_F1_FULL_INTERVAL_ZERO_ISOLATION_COMPOSITION_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-i1-f1-full-interval-zero-isolation-composition/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_i1_f1_full_interval_zero_isolation_composition";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_ENDPOINT_SPEED_SAMPLE_COUNT = 9;
const DEFAULT_ZERO_BRANCH_SPEED_SAMPLE_COUNT = 9;
const DEFAULT_DERIVATIVE_THETA_SAMPLE_COUNT = 48;
const DEFAULT_THETA_CELL_COUNT = 16;
const DEFAULT_SPEED_CELL_COUNT = 8;
const DEFAULT_PARENT_STENCIL_SAMPLES_PER_AXIS = 5;
const DEFAULT_REFINEMENT_SAMPLES_PER_SUBCELL_AXIS = 3;
const DEFAULT_ENDPOINT_PADDING = 1e-5;
const DEFAULT_MACHINE_PADDING = 1e-9;
const DEFAULT_BISECTION_TOLERANCE = 1e-12;
const DEFAULT_DIRECT_INTERVAL_THETA_LOCALIZATION_SUBDIVISIONS = 2;
const DEFAULT_DIRECT_INTERVAL_SPEED_LOCALIZATION_SUBDIVISIONS = 1;
const NO_SPEED_WINDOW =
  "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only";
const SPEED_RATIO_ENCLOSURE = [3.02156, 3.02157];
const I1_LEFT_ENDPOINT = 0.124678831905;
const I1_RIGHT_ENDPOINT = 0.145456970556;
const PEAK_BUDGET_STATUS =
  "i1-f1-bracket-local-directed-rounded-source-root-interval-theta-localized-taylor-intervalization-certified";
const DERIVATIVE_VARIATION_STATUS =
  "source-atlas-aware-i1-f1-bracket-local-directed-rounded-taylor-derivative-variation-certified";
const RESULT_THEORY_STATUS =
  "source-atlas-aware-i1-f1-full-interval-zero-isolation-composition-certified";
const SUCCESSOR_ROW =
  "I1.f1.interval-critical-exhaustion-quadrature-retention-required";

function formatSmallNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(12));
}

function endpointRow(forcingPacket, endpointId) {
  return forcingPacket.endpoint_enclosure_rows.find(
    (row) => row.endpoint_id === endpointId
  );
}

function directedRoundedTaylorTileRows(peakBudgetPacket) {
  return peakBudgetPacket.peak_budget_rows.flatMap((row) =>
    row.directed_rounded_theta_localized_taylor_intervalization_attempt.tile_rows.map(
      (tileRow) => ({
        parent_subcell_row_id: row.subcell_row_id,
        parent_mesh_row_id: row.parent_mesh_row_id,
        parent_vertex_max_derivative: row.vertex_max_derivative,
        parent_refined_max_derivative: row.refined_max_derivative,
        parent_effective_peak_overshoot_ceiling:
          row.effective_peak_overshoot_ceiling_after_refined_replay,
        tile_row: tileRow,
      })
    )
  );
}

function buildZeroIsolationTheorem() {
  return {
    theorem_id: "i1-f1-full-interval-zero-isolation-composition",
    theorem_scope:
      "representative receiver 1+ cross-binary I1.f1 bracket zero isolation",
    statement:
      "On the certified I1.f1 bracket, the imported endpoint signs give f_cross(a_1)>0>f_cross(b_1). The directed-rounded theta-localized Taylor envelope from the peak-budget packet proves sup f'_cross<0 on every tile of the finite bracket covering. Continuity and the mean-value theorem then give one and only one zero in the bracket.",
    proof_steps: [
      "Import the I1 forcing-bracket endpoint point-sign certificate for the left and right I1.f1 endpoints.",
      "Import the I1.f1 directed-rounded theta-localized Taylor derivative-variation packet and require every emitted tile upper envelope for g=f'_cross to be strictly negative.",
      "Use the endpoint sign change for existence of at least one bracket zero.",
      "Use the negative derivative envelope on the complete bracket covering to make f_cross strictly decreasing, hence to exclude a second bracket zero by the mean-value theorem.",
      "Conclude full bracket zero isolation for the representative I1.f1 row. Leave interval critical exhaustion, interval quadrature, global I1 sign topology, and retained branch status open.",
    ],
    proof_status: "full-bracket-zero-isolation-composition-certified",
  };
}

function buildCompositionSummary({ forcingPacket, peakBudgetPacket }) {
  const leftEndpoint = endpointRow(forcingPacket, "I1.f1.left");
  const rightEndpoint = endpointRow(forcingPacket, "I1.f1.right");
  const tileRows = directedRoundedTaylorTileRows(peakBudgetPacket);
  const tileUpperBounds = tileRows.map((row) =>
    Number(row.tile_row.directed_rounded_interval_taylor_upper_bound)
  );
  const tileAllowedUpperBounds = tileRows.map((row) =>
    Number(row.tile_row.allowed_upper_bound)
  );
  const tileHeadrooms = tileRows.map((row) =>
    Number(row.tile_row.directed_rounded_interval_taylor_upper_bound_headroom)
  );
  const tileRatios = tileRows.map((row) =>
    Number(
      row.tile_row
        .directed_rounded_interval_taylor_remainder_ratio_to_required_bound
    )
  );
  const maximumTaylorUpperBound = Math.max(...tileUpperBounds);
  const maximumAllowedUpperBound = Math.max(...tileAllowedUpperBounds);
  const minimumTaylorHeadroom = Math.min(...tileHeadrooms);
  const maximumTaylorRatio = Math.max(...tileRatios);
  const leftSignCertified =
    leftEndpoint?.expected_sign === "+" &&
    Number(leftEndpoint?.forcing_enclosure?.[0]) > 0 &&
    Number(leftEndpoint?.signed_clearance) > 0;
  const rightSignCertified =
    rightEndpoint?.expected_sign === "-" &&
    Number(rightEndpoint?.forcing_enclosure?.[1]) < 0 &&
    Number(rightEndpoint?.signed_clearance) > 0;
  const endpointSignsForceExistence = leftSignCertified && rightSignCertified;
  const derivativeEnvelopeForcesStrictMonotonicity =
    peakBudgetPacket.peak_budget_summary.status === PEAK_BUDGET_STATUS &&
    peakBudgetPacket.artifact_claim
      .certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure ===
      true &&
    peakBudgetPacket.artifact_claim
      .certifies_directed_rounded_taylor_upper_envelope === true &&
    tileRows.length > 0 &&
    tileRows.every(
      (row) =>
        row.tile_row.status ===
          "directed-rounded-interval-taylor-upper-envelope-passed" &&
        Number(row.tile_row.directed_rounded_interval_taylor_upper_bound) <
          0 &&
        Number(row.tile_row.allowed_upper_bound) <= 0 &&
        Number(
          row.tile_row.directed_rounded_interval_taylor_upper_bound_headroom
        ) > 0
    );
  const certified =
    endpointSignsForceExistence &&
    derivativeEnvelopeForcesStrictMonotonicity;

  return {
    composition_row_id: "I1.f1.full-interval-zero-isolation-composition",
    successor_row: SUCCESSOR_ROW,
    bracket_interval: [
      formatSmallNumber(I1_LEFT_ENDPOINT),
      formatSmallNumber(I1_RIGHT_ENDPOINT),
    ],
    speed_ratio_enclosure: SPEED_RATIO_ENCLOSURE,
    endpoint_sign_pattern: "+,-",
    left_endpoint_forcing_enclosure:
      forcingPacket.envelope_summary.left_endpoint_forcing_enclosure,
    right_endpoint_forcing_enclosure:
      forcingPacket.envelope_summary.right_endpoint_forcing_enclosure,
    minimum_endpoint_signed_clearance:
      forcingPacket.envelope_summary.min_signed_clearance,
    peak_budget_status: peakBudgetPacket.peak_budget_summary.status,
    subcell_row_count: peakBudgetPacket.peak_budget_summary.subcell_row_count,
    theta_localized_taylor_tile_count: tileRows.length,
    directed_rounded_taylor_passed_tile_count: tileRows.filter(
      (row) =>
        row.tile_row.status ===
        "directed-rounded-interval-taylor-upper-envelope-passed"
    ).length,
    maximum_directed_rounded_interval_taylor_upper_bound: formatSmallNumber(
      maximumTaylorUpperBound
    ),
    minimum_directed_rounded_interval_derivative_negativity_clearance:
      formatSmallNumber(-maximumTaylorUpperBound),
    maximum_allowed_upper_bound: formatSmallNumber(maximumAllowedUpperBound),
    minimum_directed_rounded_interval_taylor_headroom:
      formatSmallNumber(minimumTaylorHeadroom),
    maximum_directed_rounded_interval_taylor_remainder_ratio:
      formatSmallNumber(maximumTaylorRatio),
    peak_budget_bottleneck_subcell_row_id:
      peakBudgetPacket.peak_budget_summary
        .directed_rounded_theta_localized_taylor_intervalization_bottleneck_subcell_row_id,
    endpoint_signs_force_existence: endpointSignsForceExistence,
    derivative_envelope_forces_strict_monotonicity:
      derivativeEnvelopeForcesStrictMonotonicity,
    zero_isolation_argument:
      "Endpoint sign change gives existence. If two bracket zeros existed, Rolle's theorem would give a point with f'_cross=0 between them, contradicting the directed-rounded Taylor envelope sup f'_cross<0 on the finite bracket covering.",
    claim_boundary:
      "This composes the imported I1 endpoint point-sign certificate with full bracket monotonicity. It does not certify global I1 sign topology, interval critical exhaustion, interval quadrature, or branch retention.",
    status: certified
      ? "i1-f1-full-interval-zero-isolation-composition-certified"
      : "i1-f1-full-interval-zero-isolation-composition-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryI1F1FullIntervalZeroIsolationComposition(
  options = {}
) {
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  const endpointSpeedSampleCount = Number.parseInt(
    options.endpointSpeedSampleCount ?? DEFAULT_ENDPOINT_SPEED_SAMPLE_COUNT,
    10
  );
  const zeroBranchSpeedSampleCount = Number.parseInt(
    options.zeroBranchSpeedSampleCount ?? DEFAULT_ZERO_BRANCH_SPEED_SAMPLE_COUNT,
    10
  );
  const derivativeThetaSampleCount = Number.parseInt(
    options.derivativeThetaSampleCount ?? DEFAULT_DERIVATIVE_THETA_SAMPLE_COUNT,
    10
  );
  const thetaCellCount = Number.parseInt(
    options.thetaCellCount ?? DEFAULT_THETA_CELL_COUNT,
    10
  );
  const speedCellCount = Number.parseInt(
    options.speedCellCount ?? DEFAULT_SPEED_CELL_COUNT,
    10
  );
  const parentStencilSamplesPerAxis = Number.parseInt(
    options.parentStencilSamplesPerAxis ??
      DEFAULT_PARENT_STENCIL_SAMPLES_PER_AXIS,
    10
  );
  const refinementSamplesPerSubcellAxis = Number.parseInt(
    options.refinementSamplesPerSubcellAxis ??
      DEFAULT_REFINEMENT_SAMPLES_PER_SUBCELL_AXIS,
    10
  );
  const endpointPadding = Number(
    options.endpointPadding ?? DEFAULT_ENDPOINT_PADDING
  );
  const machinePadding = Number(
    options.machinePadding ?? DEFAULT_MACHINE_PADDING
  );
  const bisectionTolerance = Number(
    options.bisectionTolerance ?? DEFAULT_BISECTION_TOLERANCE
  );
  const directIntervalThetaLocalizationSubdivisions = Number.parseInt(
    options.directIntervalThetaLocalizationSubdivisions ??
      DEFAULT_DIRECT_INTERVAL_THETA_LOCALIZATION_SUBDIVISIONS,
    10
  );
  const directIntervalSpeedLocalizationSubdivisions = Number.parseInt(
    options.directIntervalSpeedLocalizationSubdivisions ??
      DEFAULT_DIRECT_INTERVAL_SPEED_LOCALIZATION_SUBDIVISIONS,
    10
  );
  const thetaLocalizedTaylorSubdivisions = Number.parseInt(
    options.thetaLocalizedTaylorSubdivisions ??
      Math.max(1, refinementSamplesPerSubcellAxis - 1),
    10
  );
  const progressCallback =
    typeof options.progressCallback === "function"
      ? options.progressCallback
      : null;
  const forcingPacket =
    options.forcingPacket ??
    buildOctahedralFoldAwareCrossBinaryI1ForcingBracketIntervalEnclosure({
      rootSubdivisions,
      speedSampleCount: endpointSpeedSampleCount,
      machinePadding,
    });
  const forcingErrors =
    validateOctahedralFoldAwareCrossBinaryI1ForcingBracketIntervalEnclosure(
      forcingPacket
    );
  const peakBudgetPacket =
    options.peakBudgetPacket ??
    buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
      {
        rootSubdivisions,
        endpointSpeedSampleCount,
        zeroBranchSpeedSampleCount,
        derivativeThetaSampleCount,
        thetaCellCount,
        speedCellCount,
        parentStencilSamplesPerAxis,
        refinementSamplesPerSubcellAxis,
        directIntervalThetaLocalizationSubdivisions,
        directIntervalSpeedLocalizationSubdivisions,
        thetaLocalizedTaylorSubdivisions,
        endpointPadding,
        machinePadding,
        bisectionTolerance,
        progressCallback,
      }
    );
  const peakBudgetErrors =
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
      peakBudgetPacket
    );
  const compositionSummary = buildCompositionSummary({
    forcingPacket,
    peakBudgetPacket,
  });
  const certified =
    forcingErrors.length === 0 &&
    peakBudgetErrors.length === 0 &&
    compositionSummary.status ===
      "i1-f1-full-interval-zero-isolation-composition-certified";
  const openQuantityNames = [
    "global_I1_interval_sign_topology",
    "interval_critical_exhaustion",
    "interval_quadrature_enclosure",
    "retained_branch_status",
  ];

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_F1_FULL_INTERVAL_ZERO_ISOLATION_COMPOSITION_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure.md",
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-peak-budget-reduction.md",
    ],
    priority_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-i1-f1-full-interval-zero-isolation-composition.md",
    forcing_bracket_certificate_check: {
      schema: forcingPacket.schema,
      valid: forcingErrors.length === 0,
      errors: forcingErrors,
      theory_status: forcingPacket.result.theory_status,
      retained_branch: forcingPacket.result.retained_branch,
      certifies_I1_forcing_bracket_point_signs:
        forcingPacket.artifact_claim
          .certifies_I1_forcing_bracket_point_signs === true,
      certifies_I1_zero_isolation:
        forcingPacket.artifact_claim.certifies_I1_zero_isolation === true,
      summary: forcingPacket.envelope_summary,
    },
    derivative_peak_budget_check: {
      schema: peakBudgetPacket.schema,
      valid: peakBudgetErrors.length === 0,
      errors: peakBudgetErrors,
      theory_status: peakBudgetPacket.result.theory_status,
      first_successor_row: peakBudgetPacket.result.first_successor_row,
      retained_branch: peakBudgetPacket.result.retained_branch,
      certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure:
        peakBudgetPacket.artifact_claim
          .certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure ===
        true,
      certifies_directed_rounded_taylor_upper_envelope:
        peakBudgetPacket.artifact_claim
          .certifies_directed_rounded_taylor_upper_envelope === true,
      certifies_I1_f1_full_interval_zero_isolation:
        peakBudgetPacket.artifact_claim
          .certifies_I1_f1_full_interval_zero_isolation === true,
      summary: peakBudgetPacket.peak_budget_summary,
    },
    composition_parameters: {
      receiver_label: "1+",
      zero_row_id: "I1.f1",
      theta_domain: "[0,H/4]",
      bracket_interval: [
        formatSmallNumber(I1_LEFT_ENDPOINT),
        formatSmallNumber(I1_RIGHT_ENDPOINT),
      ],
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: SPEED_RATIO_ENCLOSURE,
      root_subdivisions: rootSubdivisions,
      endpoint_speed_sample_count: endpointSpeedSampleCount,
      zero_branch_speed_sample_count: zeroBranchSpeedSampleCount,
      derivative_theta_sample_count: derivativeThetaSampleCount,
      theta_cell_count: thetaCellCount,
      speed_cell_count: speedCellCount,
      parent_stencil_samples_per_axis: parentStencilSamplesPerAxis,
      refinement_samples_per_subcell_axis: refinementSamplesPerSubcellAxis,
      direct_interval_theta_localization_subdivision_count:
        directIntervalThetaLocalizationSubdivisions,
      direct_interval_speed_ratio_localization_subdivision_count:
        directIntervalSpeedLocalizationSubdivisions,
      theta_localized_taylor_subdivision_count:
        thetaLocalizedTaylorSubdivisions,
      endpoint_padding: formatSmallNumber(endpointPadding),
      machine_padding: formatSmallNumber(machinePadding),
      bisection_tolerance: formatSmallNumber(bisectionTolerance),
    },
    i1_f1_full_interval_zero_isolation_theorem: buildZeroIsolationTheorem(),
    full_interval_zero_isolation_composition_summary: compositionSummary,
    interval_profile_boundary: {
      certifies_I1_f1_full_interval_zero_isolation_composition: certified,
      certifies_I1_f1_bracket_interval_monotonicity: certified,
      certifies_I1_f1_unique_bracket_zero: certified,
      certifies_I1_f1_full_interval_zero_isolation: certified,
      certifies_I1_zero_isolation: false,
      certifies_outward_rounded_interval_enclosure: false,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      open_quantities: [
        "global I1 interval sign topology outside the isolated bracket",
        "interval critical exhaustion for all primitive candidate locations",
        "interval quadrature enclosure for the primitive values",
        "retained branch status",
      ],
      open_quantity_names: openQuantityNames,
      status: certified
        ? "i1-f1-full-interval-zero-isolation-certified-critical-exhaustion-quadrature-open"
        : "i1-f1-full-interval-zero-isolation-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      composes_I1_endpoint_signs_and_directed_rounded_derivative_envelope:
        certified,
      certifies_I1_f1_full_interval_zero_isolation_composition: certified,
      certifies_I1_f1_bracket_interval_monotonicity: certified,
      certifies_I1_f1_unique_bracket_zero: certified,
      certifies_I1_f1_full_interval_zero_isolation: certified,
      certifies_I1_zero_isolation: false,
      certifies_outward_rounded_interval_enclosure: false,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      open_quantity_names: openQuantityNames,
      retained_branch: false,
      claim_level:
        "I1.f1 full bracket zero isolation is certified by composing imported endpoint point signs with the directed-rounded theta-localized Taylor derivative envelope sup f'_cross<0 on the finite bracket covering. Global I1 sign topology, interval critical exhaustion, interval quadrature, and retained branch status remain open.",
    },
    result: {
      theory_status: certified
        ? RESULT_THEORY_STATUS
        : "source-atlas-aware-i1-f1-full-interval-zero-isolation-composition-open",
      first_successor_row: SUCCESSOR_ROW,
      residual_subobligation:
        "prove interval critical exhaustion and interval quadrature on the representative cross-binary primitive, then decide retained branch status",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The bracket-local directed-rounded Taylor envelope is now composed with the I1.f1 endpoint signs: f_cross is strictly decreasing on the certified bracket and changes sign across the endpoints, so the representative bracket contains exactly one zero. The remaining closure work is interval critical exhaustion, interval quadrature, and branch retention.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryI1F1FullIntervalZeroIsolationComposition(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_F1_FULL_INTERVAL_ZERO_ISOLATION_COMPOSITION_SCHEMA,
    "schema must match I1.f1 full interval zero-isolation composition schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match I1.f1 full interval zero-isolation composition packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.forcing_bracket_certificate_check?.valid === true &&
      artifact?.forcing_bracket_certificate_check
        ?.certifies_I1_forcing_bracket_point_signs === true &&
      artifact?.forcing_bracket_certificate_check
        ?.certifies_I1_zero_isolation === false,
    "forcing predecessor must validate endpoint point signs without claiming I1 zero isolation",
    errors
  );
  assertField(
    artifact?.derivative_peak_budget_check?.valid === true &&
      artifact?.derivative_peak_budget_check?.theory_status ===
        DERIVATIVE_VARIATION_STATUS &&
      artifact?.derivative_peak_budget_check
        ?.certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure ===
        true &&
      artifact?.derivative_peak_budget_check
        ?.certifies_directed_rounded_taylor_upper_envelope === true &&
      artifact?.derivative_peak_budget_check
        ?.certifies_I1_f1_full_interval_zero_isolation === false,
    "peak-budget predecessor must validate the directed-rounded derivative envelope while leaving zero isolation open",
    errors
  );
  assertField(
    artifact?.composition_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "I1.f1 zero-isolation composition must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.composition_parameters?.speed_band === undefined &&
      artifact?.composition_parameters?.speed_window === undefined &&
      artifact?.composition_parameters?.speed_min === undefined &&
      artifact?.composition_parameters?.speed_max === undefined,
    "composition parameters must not contain speed-band fields",
    errors
  );
  assertField(
    artifact?.full_interval_zero_isolation_composition_summary?.status ===
      "i1-f1-full-interval-zero-isolation-composition-certified" &&
      artifact?.full_interval_zero_isolation_composition_summary
        ?.endpoint_signs_force_existence === true &&
      artifact?.full_interval_zero_isolation_composition_summary
        ?.derivative_envelope_forces_strict_monotonicity === true &&
      Number(
        artifact?.full_interval_zero_isolation_composition_summary
          ?.minimum_endpoint_signed_clearance
      ) > 0 &&
      Number(
        artifact?.full_interval_zero_isolation_composition_summary
          ?.maximum_directed_rounded_interval_taylor_upper_bound
      ) < 0 &&
      Number(
        artifact?.full_interval_zero_isolation_composition_summary
          ?.minimum_directed_rounded_interval_derivative_negativity_clearance
      ) > 0 &&
      Number(
        artifact?.full_interval_zero_isolation_composition_summary
          ?.maximum_allowed_upper_bound
      ) <= 0 &&
      Number(
        artifact?.full_interval_zero_isolation_composition_summary
          ?.minimum_directed_rounded_interval_taylor_headroom
      ) > 0 &&
      artifact?.full_interval_zero_isolation_composition_summary
        ?.directed_rounded_taylor_passed_tile_count ===
        artifact?.full_interval_zero_isolation_composition_summary
          ?.theta_localized_taylor_tile_count,
    "composition summary must certify endpoint existence and strictly negative directed-rounded derivative envelope",
    errors
  );
  assertField(
    artifact?.interval_profile_boundary
      ?.certifies_I1_f1_full_interval_zero_isolation_composition === true &&
      artifact?.interval_profile_boundary
        ?.certifies_I1_f1_bracket_interval_monotonicity === true &&
      artifact?.interval_profile_boundary?.certifies_I1_f1_unique_bracket_zero ===
        true &&
      artifact?.interval_profile_boundary
        ?.certifies_I1_f1_full_interval_zero_isolation === true &&
      artifact?.interval_profile_boundary?.certifies_I1_zero_isolation ===
        false &&
      artifact?.interval_profile_boundary
        ?.certifies_interval_critical_exhaustion === false &&
      artifact?.interval_profile_boundary
        ?.certifies_interval_quadrature_enclosure === false,
    "interval profile boundary must close I1.f1 bracket zero isolation and leave global sign topology, critical exhaustion, and quadrature open",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.composes_I1_endpoint_signs_and_directed_rounded_derivative_envelope ===
      true &&
      artifact?.artifact_claim
        ?.certifies_I1_f1_full_interval_zero_isolation_composition === true &&
      artifact?.artifact_claim?.certifies_I1_f1_bracket_interval_monotonicity ===
        true &&
      artifact?.artifact_claim?.certifies_I1_f1_unique_bracket_zero === true &&
      artifact?.artifact_claim?.certifies_I1_f1_full_interval_zero_isolation ===
        true &&
      artifact?.artifact_claim?.certifies_I1_zero_isolation === false &&
      artifact?.artifact_claim?.certifies_outward_rounded_interval_enclosure ===
        false &&
      artifact?.artifact_claim?.certifies_interval_derivative_enclosure ===
        false &&
      artifact?.artifact_claim?.certifies_interval_sign_topology === false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion ===
        false &&
      artifact?.artifact_claim?.certifies_interval_quadrature_enclosure ===
        false &&
      artifact?.artifact_claim?.open_quantity_names?.includes(
        "interval_critical_exhaustion"
      ) &&
      artifact?.artifact_claim?.open_quantity_names?.includes(
        "interval_quadrature_enclosure"
      ) &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact claim must close only I1.f1 bracket zero isolation and keep downstream interval rows open",
    errors
  );
  assertField(
    artifact?.result?.theory_status === RESULT_THEORY_STATUS &&
      artifact?.result?.first_successor_row === SUCCESSOR_ROW &&
      artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false,
    "result must advance the successor row to interval critical exhaustion and quadrature without retaining the branch",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node octahedral-fold-aware-cross-binary-i1-f1-full-interval-zero-isolation-composition.mjs [options]",
    "",
    "Options:",
    "  --out <path>                         Write artifact JSON to path",
    "  --validate <path>                    Validate an existing artifact JSON file",
    "  --print-schema                       Print the artifact schema",
    "  --pretty                             Pretty-print JSON",
    "  --root-subdivisions <n>              Source root subdivisions (default: 5000)",
    "  --endpoint-speed-samples <n>         Endpoint sign speed samples (default: 9)",
    "  --zero-branch-speed-samples <n>      Zero-branch speed samples (default: 9)",
    "  --derivative-theta-samples <n>       Predecessor derivative theta samples (default: 48)",
    "  --theta-cells <n>                    Bracket theta cells (default: 16)",
    "  --speed-cells <n>                    Speed-ratio cells (default: 8)",
    "  --parent-stencil-samples <n>         Odd parent stencil samples per axis (default: 5)",
    "  --refinement-samples <n>             Refinement samples per subcell axis (default: 3)",
    "  --direct-interval-theta-subdivisions <n>",
    "                                      Direct interval theta localization subdivisions (default: 2)",
    "  --direct-interval-speed-subdivisions <n>",
    "                                      Direct interval speed-ratio localization subdivisions (default: 1)",
    "  --theta-localized-taylor-subdivisions <n>",
    "                                      Theta-localized Taylor subdivisions (default: refinement-1)",
    "  --endpoint-padding <x>               Predecessor derivative endpoint padding (default: 1e-5)",
    "  --machine-padding <x>                Machine envelope padding (default: 1e-9)",
    "  --bisection-tolerance <x>            Root bisection tolerance (default: 1e-12)",
    "  --help                               Show this help",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    outPath: null,
    validatePath: null,
    pretty: false,
    printSchema: false,
    help: false,
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    endpointSpeedSampleCount: DEFAULT_ENDPOINT_SPEED_SAMPLE_COUNT,
    zeroBranchSpeedSampleCount: DEFAULT_ZERO_BRANCH_SPEED_SAMPLE_COUNT,
    derivativeThetaSampleCount: DEFAULT_DERIVATIVE_THETA_SAMPLE_COUNT,
    thetaCellCount: DEFAULT_THETA_CELL_COUNT,
    speedCellCount: DEFAULT_SPEED_CELL_COUNT,
    parentStencilSamplesPerAxis: DEFAULT_PARENT_STENCIL_SAMPLES_PER_AXIS,
    refinementSamplesPerSubcellAxis: DEFAULT_REFINEMENT_SAMPLES_PER_SUBCELL_AXIS,
    directIntervalThetaLocalizationSubdivisions:
      DEFAULT_DIRECT_INTERVAL_THETA_LOCALIZATION_SUBDIVISIONS,
    directIntervalSpeedLocalizationSubdivisions:
      DEFAULT_DIRECT_INTERVAL_SPEED_LOCALIZATION_SUBDIVISIONS,
    thetaLocalizedTaylorSubdivisions: undefined,
    endpointPadding: DEFAULT_ENDPOINT_PADDING,
    machinePadding: DEFAULT_MACHINE_PADDING,
    bisectionTolerance: DEFAULT_BISECTION_TOLERANCE,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out") {
      args.outPath = argv[++index];
    } else if (arg === "--validate") {
      args.validatePath = argv[++index];
    } else if (arg === "--print-schema") {
      args.printSchema = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--root-subdivisions") {
      args.rootSubdivisions = Number.parseInt(argv[++index], 10);
    } else if (arg === "--endpoint-speed-samples") {
      args.endpointSpeedSampleCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--zero-branch-speed-samples") {
      args.zeroBranchSpeedSampleCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--derivative-theta-samples") {
      args.derivativeThetaSampleCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--theta-cells") {
      args.thetaCellCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--speed-cells") {
      args.speedCellCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--parent-stencil-samples") {
      args.parentStencilSamplesPerAxis = Number.parseInt(argv[++index], 10);
    } else if (arg === "--refinement-samples") {
      args.refinementSamplesPerSubcellAxis = Number.parseInt(argv[++index], 10);
    } else if (arg === "--direct-interval-theta-subdivisions") {
      args.directIntervalThetaLocalizationSubdivisions = Number.parseInt(
        argv[++index],
        10
      );
    } else if (arg === "--direct-interval-speed-subdivisions") {
      args.directIntervalSpeedLocalizationSubdivisions = Number.parseInt(
        argv[++index],
        10
      );
    } else if (arg === "--theta-localized-taylor-subdivisions") {
      args.thetaLocalizedTaylorSubdivisions = Number.parseInt(
        argv[++index],
        10
      );
    } else if (arg === "--endpoint-padding") {
      args.endpointPadding = Number(argv[++index]);
    } else if (arg === "--machine-padding") {
      args.machinePadding = Number(argv[++index]);
    } else if (arg === "--bisection-tolerance") {
      args.bisectionTolerance = Number(argv[++index]);
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else {
      throw new Error(`unknown argument ${arg}`);
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
  if (args.printSchema) {
    console.log(
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_F1_FULL_INTERVAL_ZERO_ISOLATION_COMPOSITION_SCHEMA
    );
    return;
  }
  if (args.validatePath) {
    const artifact = JSON.parse(fs.readFileSync(args.validatePath, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryI1F1FullIntervalZeroIsolationComposition(
        artifact
      );
    if (errors.length > 0) {
      console.error(errors.join("\n"));
      process.exitCode = 1;
    } else {
      console.log("ok");
    }
    return;
  }

  const artifact =
    buildOctahedralFoldAwareCrossBinaryI1F1FullIntervalZeroIsolationComposition(
      {
        rootSubdivisions: args.rootSubdivisions,
        endpointSpeedSampleCount: args.endpointSpeedSampleCount,
        zeroBranchSpeedSampleCount: args.zeroBranchSpeedSampleCount,
        derivativeThetaSampleCount: args.derivativeThetaSampleCount,
        thetaCellCount: args.thetaCellCount,
        speedCellCount: args.speedCellCount,
        parentStencilSamplesPerAxis: args.parentStencilSamplesPerAxis,
        refinementSamplesPerSubcellAxis: args.refinementSamplesPerSubcellAxis,
        directIntervalThetaLocalizationSubdivisions:
          args.directIntervalThetaLocalizationSubdivisions,
        directIntervalSpeedLocalizationSubdivisions:
          args.directIntervalSpeedLocalizationSubdivisions,
        thetaLocalizedTaylorSubdivisions:
          args.thetaLocalizedTaylorSubdivisions,
        endpointPadding: args.endpointPadding,
        machinePadding: args.machinePadding,
        bisectionTolerance: args.bisectionTolerance,
      }
    );
  const errors =
    validateOctahedralFoldAwareCrossBinaryI1F1FullIntervalZeroIsolationComposition(
      artifact
    );
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
    return;
  }

  const payload = JSON.stringify(artifact, null, args.pretty ? 2 : 0);
  if (args.outPath) {
    fs.mkdirSync(path.dirname(args.outPath), { recursive: true });
    fs.writeFileSync(args.outPath, `${payload}\n`);
  } else {
    console.log(payload);
  }
}

if (process.argv[1] === SCRIPT_PATH) {
  main();
}

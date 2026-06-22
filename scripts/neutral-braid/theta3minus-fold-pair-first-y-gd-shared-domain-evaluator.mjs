#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyEighthOrderPostUSuccessorCoefficientCertificate as validateH38Artifact,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-eighth-order-post-u-successor-coefficient-certificate.mjs";
import {
  theta3minusFoldPairScaledRootTubeCellInternals as root,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.mjs";
import {
  computeH39PrimitiveRemainderProfileScaleCandidate,
  computeH39PrimitiveSlackTolerancesCandidate,
  computeH39RouchePrimitiveClosure,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-root-tangent-cauchy-majorant-tail-budget.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA =
  "neutral-braid-theta3minus-fold-pair-first-y-gd-shared-domain-evaluator/v1";
export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_COEFFICIENT_ARTIFACT_SCHEMA =
  "neutral-braid-theta3minus-fold-pair-first-y-gd-shared-domain-coefficient-artifact/v1";
export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_PRIMITIVE_VECTOR_BACKEND_ARTIFACT_SCHEMA =
  "neutral-braid-theta3minus-fold-pair-first-y-gd-h39-primitive-vector-backend-artifact/v1";
export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_KEPSILON_BRANCH_COORDINATE_WITNESS_SCHEMA =
  "neutral-braid-theta3minus-fold-pair-first-y-gd-h39-K_epsilon-branch-coordinate-witness/v1";
export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_GRAPH_RADII_WITNESS_SCHEMA =
  "neutral-braid-theta3minus-fold-pair-first-y-gd-h39-graph-radii-witness/v1";

export const THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS = {
  no_speed_window:
    "none; uses the certified positive speed-ratio zero enclosure only",
  promotion_status: "priority-only",
  first_y_cell_upper: 0.115 / 64,
  h38_index: 38,
  h39_index: 39,
  r43_source_shift: 43,
  n_g_shift: 41,
  default_series_order: 44,
  default_jacobian_shifted_order: 43,
  second_x_derivative_y_power: 41,
  finite_prefix_scalar_replay_radius_multiple: 4,
  finite_prefix_scalar_replay_rho_x_multiplier: 2,
  finite_prefix_scalar_replay_r_x_fraction: 0.5,
};

function isProvided(value) {
  return value !== undefined && value !== null;
}

function numericInterval(value) {
  if (Array.isArray(value)) {
    return value.map(Number);
  }
  return [Number(value), Number(value)];
}

function parseFormattedInterval(value) {
  if (Array.isArray(value)) {
    return value.map(Number);
  }
  if (typeof value === "string") {
    return value
      .replace("[", "")
      .replace("]", "")
      .split(",")
      .map(Number);
  }
  return [Number(value), Number(value)];
}

function assertInterval(name, interval) {
  if (
    !Array.isArray(interval) ||
    interval.length !== 2 ||
    !Number.isFinite(interval[0]) ||
    !Number.isFinite(interval[1]) ||
    interval[0] > interval[1]
  ) {
    throw new Error(`${name} must be a finite interval [left,right]`);
  }
}

function assertCell(cell) {
  for (const key of [
    "speed_interval",
    "delta_fold_interval",
    "phi_fold_interval",
    "beta_interval",
    "gamma_interval",
    "L_interval",
  ]) {
    assertInterval(`cell.${key}`, cell?.[key]);
  }
}

function hFieldName(index, suffix = "interval") {
  return `h${index}_${suffix}`;
}

export function hIntervalsFromBranchRow(branchRow, { hCount = 39 } = {}) {
  return Array.from({ length: hCount }, (_, index) =>
    numericInterval(branchRow[hFieldName(index)])
  );
}

export function cellFromCertificateRow(row) {
  return {
    speed_interval: numericInterval(row.speed_interval),
    delta_fold_interval: numericInterval(row.delta_fold_interval),
    phi_fold_interval: numericInterval(row.phi_fold_interval),
    beta_interval: numericInterval(row.beta_interval),
    gamma_interval: numericInterval(row.gamma_interval),
    L_interval: numericInterval(row.L_interval),
  };
}

export function computeH39PredecessorHRowProviderBoundaryCandidate({
  h38Row,
  hCount = 39,
} = {}) {
  if (!Array.isArray(h38Row?.branch_rows) || h38Row.branch_rows.length !== 2) {
    throw new Error("h38Row must contain exactly two branch_rows");
  }
  const resolvedHCount = Number(hCount);
  if (!Number.isInteger(resolvedHCount) || resolvedHCount < 1) {
    throw new Error("hCount must be a positive integer");
  }
  const parentKeyPattern =
    /^(parent|predecessor|lineage|dependency|transport|provider)/;
  const recurrenceKeyPattern =
    /^(recurrence|transport|dependency|parent|predecessor).*h/i;
  const providerFlagPresent = (branchRow) =>
    branchRow?.dependency_preserving_h_row_provider === true ||
    branchRow?.h_row_provider_preserves_dependencies === true ||
    branchRow?.preserves_dependencies === true ||
    branchRow?.preservesDependencies === true;
  const providerDependencyTrace = (branchRow) =>
    branchRow?.h_row_dependency_trace ??
    branchRow?.dependency_trace ??
    branchRow?.dependencyTrace ??
    null;
  const providerClaimBoundary = (branchRow) =>
    branchRow?.h_row_provider_claim_boundary ??
    branchRow?.claim_boundary ??
    branchRow?.claimBoundary ??
    null;
  const providerClaimBoundaryCandidateOnly = (branchRow) => {
    const boundary = providerClaimBoundary(branchRow);
    return (
      boundary !== null &&
      typeof boundary === "object" &&
      boundary.certifies_shifted_R43_outer_bound === false &&
      boundary.certifies_directed_rounded_shared_domain === false &&
      boundary.certifies_continuous_polydisc_primitives === false &&
      boundary.retained_branch === false
    );
  };
  const branchSummaries = h38Row.branch_rows.map((branchRow) => {
    const keys = Object.keys(branchRow);
    const hIntervalFieldCount = keys.filter((key) =>
      /^h\d+_interval$/.test(key)
    ).length;
    const hSolveSlopeFieldCount = keys.filter((key) =>
      /^h\d+_solve_slope_interval$/.test(key)
    ).length;
    const residualFieldCount = keys.filter((key) =>
      /^h\d+_residual_before_solve$/.test(key)
    ).length;
    const parentOrDependencyKeys = keys.filter((key) =>
      parentKeyPattern.test(key)
    );
    const recurrenceKeys = keys.filter((key) =>
      recurrenceKeyPattern.test(key)
    );
    const dependencyTrace = providerDependencyTrace(branchRow);
    const dependencyTraceCount = Array.isArray(dependencyTrace)
      ? dependencyTrace.length
      : 0;
    const providerKind =
      branchRow.h_row_provider_kind ??
      branchRow.provider_kind ??
      branchRow.providerKind ??
      null;
    const providerProvenance =
      branchRow.h_row_provider_provenance ??
      branchRow.provider_provenance ??
      branchRow.providerProvenance ??
      null;
    const sourceCellId =
      branchRow.h_row_provider_source_cell_id ??
      branchRow.source_cell_id ??
      branchRow.sourceCellId ??
      null;
    const dependencyWitness =
      branchRow.h_row_dependency_witness ??
      branchRow.dependency_witness ??
      branchRow.dependencyWitness ??
      null;
    const providerMetadataKeyPresent =
      providerFlagPresent(branchRow) ||
      providerKind !== null ||
      providerProvenance !== null ||
      sourceCellId !== null ||
      dependencyTraceCount > 0 ||
      dependencyWitness !== null ||
      providerClaimBoundary(branchRow) !== null;
    const dependencyProviderPresent =
      providerFlagPresent(branchRow) &&
      typeof providerKind === "string" &&
      providerKind.length > 0 &&
      providerProvenance !== null &&
      typeof sourceCellId === "string" &&
      sourceCellId.length > 0 &&
      dependencyTraceCount > 0 &&
      dependencyWitness !== null &&
      providerClaimBoundaryCandidateOnly(branchRow);
    return {
      branch: branchRow.branch,
      h_interval_field_count: hIntervalFieldCount,
      h_solve_slope_field_count: hSolveSlopeFieldCount,
      residual_before_solve_field_count: residualFieldCount,
      has_h38_solve_slope_interval: Array.isArray(
        branchRow.h38_solve_slope_interval
      ),
      has_h38_residual_before_solve: Array.isArray(
        branchRow.h38_residual_before_solve
      ),
      parent_or_dependency_keys: parentOrDependencyKeys,
      recurrence_keys: recurrenceKeys,
      provider_metadata_key_present: providerMetadataKeyPresent,
      provider_kind: providerKind,
      provider_source_cell_id: sourceCellId,
      h_row_provider_provenance_present: providerProvenance !== null,
      h_row_dependency_trace_count: dependencyTraceCount,
      h_row_dependency_witness_present: dependencyWitness !== null,
      h_row_provider_claim_boundary_candidate_only:
        providerClaimBoundaryCandidateOnly(branchRow),
      dependency_preserving_h_row_provider_present:
        dependencyProviderPresent,
      provider_metadata_status: dependencyProviderPresent
        ? "dependency-preserving-provider-present"
        : providerMetadataKeyPresent
          ? "incomplete-provider-metadata-rejected"
          : "interval-snapshot-no-provider-metadata",
    };
  });
  const dependencyProviderPresent = branchSummaries.every(
    (summary) => summary.dependency_preserving_h_row_provider_present
  );
  const incompleteProviderMetadataPresent = branchSummaries.some(
    (summary) =>
      summary.provider_metadata_key_present &&
      summary.dependency_preserving_h_row_provider_present !== true
  );
  const intervalSnapshotComplete = branchSummaries.every(
    (summary) =>
      summary.h_interval_field_count >= resolvedHCount &&
      summary.has_h38_solve_slope_interval
  );

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-predecessor-h-row-provider-boundary-candidate-emitted",
    evaluation_level: "candidate-predecessor-h-row-provider-boundary",
    cell_id: h38Row.cell_id ?? null,
    h_count: resolvedHCount,
    branch_summaries: branchSummaries,
    exported_h_row_interval_snapshot_complete: intervalSnapshotComplete,
    dependency_preserving_h_row_provider_present:
      dependencyProviderPresent,
    exported_h_row_dependency_state: dependencyProviderPresent
      ? "dependency-preserving-provider-present"
      : incompleteProviderMetadataPresent
        ? "incomplete-provider-metadata-rejected"
      : "independent-interval-snapshot-only",
    smallest_evaluator_entry_point: "branchInputsFromH38Row",
    required_provider_shape: {
      branch: "<branch label>",
      dependency_preserving_h_row_provider: true,
      provider_kind:
        "predecessor-recurrence-transport | certified-h-row-subdivision",
      source_cell_id: "<h38 cell id>",
      h_intervals: "same h0..h38 intervals or transported subcell intervals",
      solve_slope_interval: "same branch h38 solve slope interval",
      h_row_provider_provenance:
        "machine-readable provider construction record",
      h_row_dependency_trace: "nonempty dependency trace for replayed h rows",
      h_row_dependency_witness:
        "parent row identity, recurrence equation, transported parameter cell, and coverage proof for the h-row replay",
      h_row_provider_claim_boundary: {
        certifies_shifted_R43_outer_bound: false,
        certifies_directed_rounded_shared_domain: false,
        certifies_continuous_polydisc_primitives: false,
        retained_branch: false,
      },
    },
    candidate_certificate_route:
      "Feed branchInputsFromH38Row through a dependency-preserving h-row provider before H39 row-1 replay; reject provider-free exported h-row boxes as interval snapshots for the closure proof.",
    certifies_shifted_R43_outer_bound: false,
    certifies_directed_rounded_shared_domain: false,
    certifies_continuous_polydisc_primitives: false,
    retained_branch: false,
  };
}

function finiteMax(values) {
  const finiteValues = values
    .map((value) => (value === null || value === undefined ? null : Number(value)))
    .filter((value) => Number.isFinite(value));
  return finiteValues.length === 0 ? null : Math.max(...finiteValues);
}

function finiteMin(values) {
  const finiteValues = values
    .map((value) => (value === null || value === undefined ? null : Number(value)))
    .filter((value) => Number.isFinite(value));
  return finiteValues.length === 0 ? null : Math.min(...finiteValues);
}

function numericClose(left, right, tolerance = Number.EPSILON * 64) {
  const resolvedLeft = Number(left);
  const resolvedRight = Number(right);
  if (!Number.isFinite(resolvedLeft) || !Number.isFinite(resolvedRight)) {
    return false;
  }
  const scale = Math.max(1, Math.abs(resolvedLeft), Math.abs(resolvedRight));
  return Math.abs(resolvedLeft - resolvedRight) <= tolerance * scale;
}

function coordinateSourceEnvelopeCandidateFromValue(candidate, index) {
  const forbiddenSpeedFields = noForbiddenSpeedFields(candidate);
  if (forbiddenSpeedFields.length > 0) {
    throw new Error(
      `coordinate source envelope candidate ${index} must not contain speed-band fields: ${forbiddenSpeedFields.join(
        ", "
      )}`
    );
  }
  const r43ShiftedCauchyOuterBound =
    candidate?.r43ShiftedCauchyOuterBound ??
    candidate?.shiftedR43CauchyOuterBound ??
    candidate?.r43_shifted_cauchy_outer_bound ??
    candidate?.shifted_r43_cauchy_outer_bound ??
    null;
  const r43ShiftedCauchyOuterRadius =
    candidate?.r43ShiftedCauchyOuterRadius ??
    candidate?.shiftedR43CauchyOuterRadius ??
    candidate?.r43_shifted_cauchy_outer_radius ??
    candidate?.shifted_r43_cauchy_outer_radius ??
    null;
  const explicitSourceEnvelopeKind =
    candidate?.sourceEnvelopeKind ?? candidate?.source_envelope_kind ?? null;
  const useAffineCenterR43Prefix =
    explicitSourceEnvelopeKind ===
      "affine-center-shifted-removable-r43-cauchy-outer-bound" ||
    (candidate?.useAffineCenterR43Prefix ??
      candidate?.use_affine_center_r43_prefix) === true;
  const r43CauchyOuterRadius =
    candidate?.r43CauchyOuterRadius ??
    candidate?.coordinateCauchyOuterRadius ??
    candidate?.r43_cauchy_outer_radius ??
    candidate?.coordinate_cauchy_outer_radius ??
    null;
  const jacobianCauchyOuterRadius =
    candidate?.jacobianCauchyOuterRadius ??
    candidate?.coordinateJacobianOuterRadius ??
    candidate?.jacobian_cauchy_outer_radius ??
    candidate?.coordinate_jacobian_outer_radius ??
    null;
  const jacobianNumeratorCauchyOuterRadius =
    candidate?.jacobianNumeratorCauchyOuterRadius ??
    candidate?.coordinateJacobianNumeratorOuterRadius ??
    candidate?.jacobian_numerator_cauchy_outer_radius ??
    candidate?.coordinate_jacobian_numerator_outer_radius ??
    null;

  return {
    candidate_index: index,
    source_envelope_kind:
      explicitSourceEnvelopeKind ??
      (isProvided(r43ShiftedCauchyOuterBound) ||
      isProvided(r43ShiftedCauchyOuterRadius)
        ? useAffineCenterR43Prefix
          ? "affine-center-shifted-removable-r43-cauchy-outer-bound"
          : "shifted-removable-r43-cauchy-outer-bound"
        : "raw-coordinate-cauchy-outer-bound"),
    r43_cauchy_outer_radius: isProvided(r43CauchyOuterRadius)
      ? Number(r43CauchyOuterRadius)
      : null,
    r43_shifted_cauchy_outer_bound: isProvided(r43ShiftedCauchyOuterBound)
      ? Number(r43ShiftedCauchyOuterBound)
      : null,
    r43_shifted_cauchy_outer_radius: isProvided(r43ShiftedCauchyOuterRadius)
      ? Number(r43ShiftedCauchyOuterRadius)
      : null,
    directed_rounded_shifted_r43_provenance:
      (candidate?.directedRoundedShiftedR43Provenance ??
        candidate?.directed_rounded_shifted_r43_provenance) === true,
    certifies_shifted_r43_zero_prefix:
      (candidate?.certifiesShiftedR43ZeroPrefix ??
        candidate?.certifies_shifted_r43_zero_prefix) === true,
    use_affine_center_r43_prefix: useAffineCenterR43Prefix,
    jacobian_cauchy_outer_radius: isProvided(jacobianCauchyOuterRadius)
      ? Number(jacobianCauchyOuterRadius)
      : null,
    jacobian_numerator_cauchy_outer_radius: isProvided(
      jacobianNumeratorCauchyOuterRadius
    )
      ? Number(jacobianNumeratorCauchyOuterRadius)
      : null,
  };
}

function normalizeCoordinateSourceEnvelopeCandidates({
  coordinateCauchyOuterRadius,
  coordinateJacobianOuterRadius,
  coordinateJacobianNumeratorOuterRadius,
  coordinateSourceEnvelopeCandidates = null,
} = {}) {
  if (isProvided(coordinateSourceEnvelopeCandidates)) {
    if (
      !Array.isArray(coordinateSourceEnvelopeCandidates) ||
      coordinateSourceEnvelopeCandidates.length === 0
    ) {
      throw new Error(
        "coordinateSourceEnvelopeCandidates must be a nonempty array when provided"
      );
    }
    return coordinateSourceEnvelopeCandidates.map((candidate, index) =>
      coordinateSourceEnvelopeCandidateFromValue(candidate, index)
    );
  }

  if (
    isProvided(coordinateCauchyOuterRadius) ||
    isProvided(coordinateJacobianOuterRadius) ||
    isProvided(coordinateJacobianNumeratorOuterRadius)
  ) {
    return [
      {
        candidate_index: 0,
        r43_cauchy_outer_radius: isProvided(coordinateCauchyOuterRadius)
          ? Number(coordinateCauchyOuterRadius)
          : null,
        jacobian_cauchy_outer_radius: isProvided(
          coordinateJacobianOuterRadius
        )
          ? Number(coordinateJacobianOuterRadius)
          : null,
        jacobian_numerator_cauchy_outer_radius: isProvided(
          coordinateJacobianNumeratorOuterRadius
        )
          ? Number(coordinateJacobianNumeratorOuterRadius)
          : null,
      },
    ];
  }

  return [];
}

function sourceBranchLabels(candidates) {
  return Array.isArray(candidates)
    ? candidates.map((candidate) => String(candidate?.branch))
    : [];
}

function sourceHasFoldPairBranches(candidates) {
  const labels = sourceBranchLabels(candidates);
  return (
    Array.isArray(candidates) &&
    candidates.length === 2 &&
    labels.includes("-") &&
    labels.includes("+")
  );
}

function noForbiddenSpeedFields(value, found = []) {
  if (value === null || value === undefined) {
    return found;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => noForbiddenSpeedFields(item, found));
    return found;
  }
  if (typeof value === "object") {
    for (const [key, nested] of Object.entries(value)) {
      if (
        key === "speed_band" ||
        key === "speed_window" ||
        key === "speed_min" ||
        key === "speed_max"
      ) {
        found.push(key);
      }
      noForbiddenSpeedFields(nested, found);
    }
  }
  return found;
}

function annotateCertifiedSource(source, fields) {
  if (source === null || source === undefined) {
    return null;
  }
  Object.assign(source, fields);
  return source;
}

function buildCoordinateCauchySourceCertification({
  source,
  sharedDomainSignature,
}) {
  const sourceResidualCandidates = Array.isArray(
    source?.source_residual_outer_bound_candidates
  )
    ? source.source_residual_outer_bound_candidates
    : [];
  const jacobianCandidates = Array.isArray(
    source?.jacobian_outer_bound_candidates
  )
    ? source.jacobian_outer_bound_candidates
    : [];
  const sourceResidualMax = finiteMax(
    sourceResidualCandidates.map(
      (candidate) =>
        candidate?.r43_cauchy_outer_bound ??
        candidate?.candidate_R43_source_outer_bound
    )
  );
  const jacobianMax = finiteMax(
    jacobianCandidates.map(
      (candidate) =>
        candidate?.jacobian_cauchy_outer_bound ??
        candidate?.candidate_R43_jacobian_outer_bound
    )
  );
  const forbiddenSpeedFields = noForbiddenSpeedFields(source);
  const rawSourceCandidateStatus =
    "h39-source-residual-coordinate-cauchy-outer-bound-candidate-emitted";
  const shiftedSourceCandidateStatus =
    "h39-shifted-r43-removable-cauchy-outer-bound-candidate-emitted";
  const affineCenterShiftedSourceCandidateStatus =
    "h39-affine-center-shifted-r43-removable-cauchy-outer-bound-candidate-emitted";
  const isShiftedSourceCandidate = (candidate) =>
    candidate?.status === shiftedSourceCandidateStatus ||
    candidate?.status === affineCenterShiftedSourceCandidateStatus;
  const sourceResidualBranchCandidateValid = (candidate) => {
    const bound = Number(
      candidate?.r43_cauchy_outer_bound ??
        candidate?.candidate_R43_source_outer_bound
    );
    if (!Number.isFinite(bound)) {
      return false;
    }
    if (candidate?.status === rawSourceCandidateStatus) {
      return true;
    }
    if (!isShiftedSourceCandidate(candidate)) {
      return false;
    }
    return (
      candidate?.source_zero_prefix_certified === true &&
      candidate?.shifted_R43_bound_covers_finite_prefix === true &&
      candidate?.r43_cauchy_tail_shift_power === 0
    );
  };
  const sourceResidualBranchCandidateProvenanceCertified = (candidate) => {
    if (candidate?.status === rawSourceCandidateStatus) {
      return (
        candidate?.outward_rounded_transcendental_provenance === true &&
        candidate?.sinh_delta_taylor_majorant
          ?.certifies_outward_rounded_transcendental_upper_bound === true &&
        candidate?.sinh_phi_taylor_majorant
          ?.certifies_outward_rounded_transcendental_upper_bound === true
      );
    }
    if (isShiftedSourceCandidate(candidate)) {
      return (
        candidate?.directed_rounded_shifted_R43_provenance === true &&
        candidate?.source_zero_prefix_certified === true &&
        candidate?.shifted_R43_bound_covers_finite_prefix === true &&
        candidate?.r43_cauchy_tail_shift_power === 0
      );
    }
    return false;
  };
  const sourceResidualTailShiftPowers = sourceResidualCandidates
    .map((candidate) => candidate?.r43_cauchy_tail_shift_power)
    .filter((value) => isProvided(value))
    .map(Number);
  const checks = {
    source_present: source !== null && source !== undefined,
    source_status_valid:
      source?.status ===
      "h39-coordinate-cauchy-outer-bounds-profile-candidate-emitted",
    shared_domain_signature_present:
      sharedDomainSignature !== null && sharedDomainSignature !== undefined,
    source_residual_branch_candidates_present:
      sourceHasFoldPairBranches(sourceResidualCandidates),
    jacobian_branch_candidates_present:
      sourceHasFoldPairBranches(jacobianCandidates),
    source_residual_branch_statuses_valid:
      sourceResidualCandidates.length === 2 &&
      sourceResidualCandidates.every(sourceResidualBranchCandidateValid),
    source_residual_transcendental_envelopes_certified:
      sourceResidualCandidates.length === 2 &&
      sourceResidualCandidates.every(
        sourceResidualBranchCandidateProvenanceCertified
      ),
    source_residual_tail_shift_power_consistent:
      sourceResidualTailShiftPowers.length === 0 ||
      sourceResidualTailShiftPowers.every((value) =>
        numericClose(value, sourceResidualTailShiftPowers[0])
      ),
    jacobian_branch_statuses_valid:
      jacobianCandidates.length === 2 &&
      jacobianCandidates.every(
        (candidate) =>
          candidate?.status ===
            "h39-jacobian-coordinate-cauchy-outer-bound-candidate-emitted" &&
          Number.isFinite(
            Number(
              candidate?.jacobian_cauchy_outer_bound ??
                candidate?.candidate_R43_jacobian_outer_bound
            )
          )
      ),
    jacobian_transcendental_envelopes_certified:
      jacobianCandidates.length === 2 &&
      jacobianCandidates.every(
        (candidate) =>
          candidate?.outward_rounded_transcendental_provenance === true &&
          candidate?.sinh_delta_taylor_majorant
            ?.certifies_outward_rounded_transcendental_upper_bound === true &&
          candidate?.sinh_phi_taylor_majorant
            ?.certifies_outward_rounded_transcendental_upper_bound === true
      ),
    source_R43_outer_bound_matches_branch_max:
      sourceResidualMax !== null &&
      numericClose(sourceResidualMax, source?.r43_cauchy_outer_bound) &&
      numericClose(
        sourceResidualMax,
        source?.candidate_R43_source_outer_bound
      ),
    source_jacobian_outer_bound_matches_branch_max:
      jacobianMax !== null &&
      numericClose(jacobianMax, source?.jacobian_cauchy_outer_bound) &&
      numericClose(
        jacobianMax,
        source?.candidate_R43_jacobian_outer_bound
      ),
    source_R43_outer_radius_positive:
      Number(source?.r43_cauchy_outer_radius) > 0,
    source_jacobian_outer_radius_positive:
      Number(source?.jacobian_cauchy_outer_radius) > 0,
    source_jacobian_removable_gap_positive:
      Number(source?.jacobian_numerator_cauchy_outer_radius) >
      Number(source?.jacobian_cauchy_outer_radius),
    no_fixed_speed_window: forbiddenSpeedFields.length === 0,
  };
  const failedPredicates = Object.entries(checks)
    .filter(([, passes]) => passes !== true)
    .map(([key]) => key);
  const certifies = failedPredicates.length === 0;

  annotateCertifiedSource(source, {
    domain_signature: sharedDomainSignature,
    certifies_directed_rounded: certifies,
    directed_rounded: certifies,
    certifies_directed_rounded_shared_domain: certifies,
    certifies_directed_rounded_coordinate_cauchy_outer_bounds:
      certifies,
    certificate_status: certifies
      ? "directed-rounded-certified"
      : "witness-required",
    includes_coordinate_cauchy_tails: certifies,
    includes_analytic_tail: certifies,
    assumes_fixed_speed_window: false,
  });

  return {
    source_kind: "coordinate-cauchy-R43-jacobian-source",
    certificate_status: certifies
      ? "directed-rounded-certified"
      : "witness-required",
    predicate_check: {
      checks,
      failed_predicates: failedPredicates,
      forbidden_speed_fields: forbiddenSpeedFields,
      source_R43_branch_outer_bound_max: sourceResidualMax,
      source_jacobian_branch_outer_bound_max: jacobianMax,
      certifies_directed_rounded_source: certifies,
    },
  };
}

function buildDenominatorCauchySourceCertification({
  source,
  sharedDomainSignature,
}) {
  const branchCandidates = Array.isArray(
    source?.branch_denominator_candidates
  )
    ? source.branch_denominator_candidates
    : [];
  const branchMajorants = Array.isArray(source?.branch_g_outer_majorants)
    ? source.branch_g_outer_majorants
    : [];
  const branchMajorantSum = branchMajorants.reduce(
    (sum, value) => sum + Number(value),
    0
  );
  const computedNGOuterBound =
    Number(source?.l_majorant) +
    Number(source?.outer_radius ?? source?.n_g_cauchy_outer_radius) ** 2 *
      Number(source?.lower_polynomial_majorant) +
    branchMajorantSum;
  const diagnostic = source?.n_g_outer_bound_diagnostic ?? null;
  const forbiddenSpeedFields = noForbiddenSpeedFields(source);
  const checks = {
    source_present: source !== null && source !== undefined,
    source_status_valid:
      source?.status ===
      "h39-denominator-cauchy-n-g-outer-bound-candidate-emitted",
    shared_domain_signature_present:
      sharedDomainSignature !== null && sharedDomainSignature !== undefined,
    required_fold_pair_branches_present:
      sourceHasFoldPairBranches(branchCandidates),
    branch_denominator_candidates_positive:
      branchCandidates.length === 2 &&
      branchCandidates.every(
        (candidate) =>
          candidate?.status ===
            "h39-branch-g-denominator-cauchy-ingredient-candidate-emitted" &&
          candidate?.candidate_denominator_clearance_status ===
            "candidate-denominator-clearance-positive" &&
          Number(candidate?.speed_lower_bound) > 0 &&
          Number(candidate?.delta_clearance_prefix_plus_tail_floor) > 0 &&
          Number(candidate?.jacobian_abs_prefix_plus_tail_floor) > 0 &&
          Number(candidate?.branch_g_outer_majorant) >= 0
      ),
    branch_transcendental_envelopes_certified:
      branchCandidates.length === 2 &&
      branchCandidates.every(
        (candidate) =>
          candidate?.outward_rounded_transcendental_provenance === true &&
          candidate?.sinh_delta_taylor_majorant
            ?.certifies_outward_rounded_transcendental_upper_bound === true &&
          candidate?.sinh_phi_taylor_majorant
            ?.certifies_outward_rounded_transcendental_upper_bound === true
      ),
    branch_majorants_match_source:
      branchMajorants.length === branchCandidates.length &&
      branchCandidates.every((candidate, index) =>
        numericClose(
          candidate?.branch_g_outer_majorant,
          branchMajorants[index]
        )
      ),
    n_g_outer_bound_formula_matches:
      diagnostic?.status ===
        "h39-n-g-denominator-clearance-outer-majorant-emitted" &&
      numericClose(diagnostic?.pair_g_outer_majorant, branchMajorantSum) &&
      numericClose(
        diagnostic?.n_g_outer_bound,
        source?.n_g_cauchy_outer_bound
      ) &&
      numericClose(
        source?.candidate_N_G_outer_bound,
        source?.n_g_cauchy_outer_bound
      ) &&
      numericClose(computedNGOuterBound, source?.n_g_cauchy_outer_bound),
    n_g_outer_radius_positive:
      Number(source?.n_g_cauchy_outer_radius) > 0,
    no_fixed_speed_window: forbiddenSpeedFields.length === 0,
  };
  const failedPredicates = Object.entries(checks)
    .filter(([, passes]) => passes !== true)
    .map(([key]) => key);
  const certifies = failedPredicates.length === 0;

  annotateCertifiedSource(source, {
    domain_signature: sharedDomainSignature,
    certifies_directed_rounded: certifies,
    directed_rounded: certifies,
    certifies_directed_rounded_shared_domain: certifies,
    certifies_directed_rounded_denominator_cauchy_N_G_outer_bound:
      certifies,
    certificate_status: certifies
      ? "directed-rounded-certified"
      : "witness-required",
    includes_denominator_cauchy_tails: certifies,
    includes_analytic_tail: certifies,
    assumes_fixed_speed_window: false,
  });

  return {
    source_kind: "denominator-cauchy-N_G-source",
    certificate_status: certifies
      ? "directed-rounded-certified"
      : "witness-required",
    predicate_check: {
      checks,
      failed_predicates: failedPredicates,
      forbidden_speed_fields: forbiddenSpeedFields,
      branch_g_outer_majorant_sum: Number.isFinite(branchMajorantSum)
        ? branchMajorantSum
        : null,
      computed_N_G_outer_bound: Number.isFinite(computedNGOuterBound)
        ? computedNGOuterBound
        : null,
      certifies_directed_rounded_source: certifies,
    },
  };
}

function buildH39EvaluatorSourceCertificateReport({
  coordinateCauchyOuterBounds,
  denominatorCauchyNGOuterBound,
  sharedDomainSignature,
}) {
  const coordinateReport = buildCoordinateCauchySourceCertification({
    source: coordinateCauchyOuterBounds,
    sharedDomainSignature,
  });
  const denominatorReport = buildDenominatorCauchySourceCertification({
    source: denominatorCauchyNGOuterBound,
    sharedDomainSignature,
  });
  const failedPredicates = [
    ...coordinateReport.predicate_check.failed_predicates.map(
      (predicate) => `coordinate_cauchy:${predicate}`
    ),
    ...denominatorReport.predicate_check.failed_predicates.map(
      (predicate) => `denominator_cauchy:${predicate}`
    ),
  ];
  const certifies = failedPredicates.length === 0;

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: certifies
      ? "h39-evaluator-source-certificates-emitted"
      : "h39-evaluator-source-certificates-open",
    evaluation_level: "directed-rounded-source-certificate-report",
    shared_domain_signature: sharedDomainSignature,
    coordinate_cauchy_source_certificate: coordinateReport,
    denominator_cauchy_source_certificate: denominatorReport,
    predicate_check: {
      failed_predicates: failedPredicates,
      certifies_evaluator_source_handoffs: certifies,
    },
    claim_boundary: {
      assumes_fixed_speed_window: false,
      certifies_directed_rounded_coordinate_cauchy_outer_bounds:
        coordinateReport.predicate_check.certifies_directed_rounded_source ===
        true,
      certifies_directed_rounded_denominator_cauchy_N_G_outer_bound:
        denominatorReport.predicate_check.certifies_directed_rounded_source ===
        true,
      certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
        false,
      retained_branch: false,
    },
    result: {
      h39_evaluator_source_handoffs_certified: certifies,
      h39_continuous_tail_certificate: false,
      retained_branch: false,
    },
  };
}

export function buildH39EvaluatorGraphRadiiWitness({
  rhoX,
  rX,
  sharedDomainSignature = null,
} = {}) {
  if (isProvided(rhoX) !== isProvided(rX)) {
    throw new Error("graph radii witness requires both rhoX and rX");
  }
  const resolvedRhoX = Number(rhoX);
  const resolvedRX = Number(rX);
  const forbiddenSpeedFields = noForbiddenSpeedFields({
    rho_X: rhoX,
    r_X: rX,
    domain_signature: sharedDomainSignature,
  });
  const checks = {
    shared_domain_signature_present:
      sharedDomainSignature !== null && sharedDomainSignature !== undefined,
    rho_X_finite_positive:
      Number.isFinite(resolvedRhoX) && resolvedRhoX > 0,
    r_X_finite_positive:
      Number.isFinite(resolvedRX) && resolvedRX > 0,
    r_X_inside_rho_X:
      Number.isFinite(resolvedRX) &&
      Number.isFinite(resolvedRhoX) &&
      resolvedRX < resolvedRhoX,
    no_fixed_speed_window: forbiddenSpeedFields.length === 0,
  };
  const failedPredicates = Object.entries(checks)
    .filter(([, passes]) => passes !== true)
    .map(([key]) => key);
  const certifies = failedPredicates.length === 0;

  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_GRAPH_RADII_WITNESS_SCHEMA,
    packet_id:
      "theta3minus_fold_pair_first_y_gd_h39_graph_radii_witness",
    promotion_status:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.promotion_status,
    witness_status: certifies
      ? "directed-rounded-same-domain-graph-radii-witness-certified"
      : "open-graph-radii-witness-unverified",
    component_family: "graph_radii",
    rho_X: Number.isFinite(resolvedRhoX) ? resolvedRhoX : null,
    r_X: Number.isFinite(resolvedRX) ? resolvedRX : null,
    domain_signature: sharedDomainSignature,
    certifies_directed_rounded: certifies,
    directed_rounded: certifies,
    certifies_directed_rounded_shared_domain: certifies,
    certificate_status: certifies
      ? "directed-rounded-certified"
      : "witness-required",
    assumes_fixed_speed_window: false,
    predicate_check: {
      checks,
      failed_predicates: failedPredicates,
      forbidden_speed_fields: forbiddenSpeedFields,
      certifies_graph_radii_witness: certifies,
    },
    claim_boundary: {
      assumes_fixed_speed_window: false,
      emits_graph_radii_witness: true,
      certifies_directed_rounded_h39_graph_rho_X_radius: certifies,
      certifies_directed_rounded_h39_graph_r_X_radius: certifies,
      certifies_directed_rounded_shared_domain: false,
      certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
        false,
      retained_branch: false,
    },
    result: {
      theory_status: certifies
        ? "h39-evaluator-graph-radii-witness-certified"
        : "h39-evaluator-graph-radii-witness-open",
      h39_graph_radii_witness: certifies,
      h39_rho_X_component_witness: certifies,
      h39_r_X_component_witness: certifies,
      h39_continuous_tail_certificate: false,
      retained_branch: false,
    },
  };
}

function hasCompleteCauchyOuterPair(name, outerBound, outerRadius, rho) {
  const hasBound = isProvided(outerBound);
  const hasRadius = isProvided(outerRadius);
  if (hasBound !== hasRadius) {
    throw new Error(
      `${name} Cauchy inputs require both outerBound and outerRadius`
    );
  }
  if ((hasBound || hasRadius) && !isProvided(rho)) {
    throw new Error(`${name} Cauchy inputs require rho`);
  }
  return hasBound && hasRadius && isProvided(rho);
}

function intervalHullFromFormatted(intervals) {
  const parsed = intervals.map(parseFormattedInterval);
  if (parsed.length === 0) {
    return null;
  }
  return root.formatInterval([
    Math.min(...parsed.map(([left]) => left)),
    Math.max(...parsed.map(([, right]) => right)),
  ]);
}

function maxAbsFormattedIntervals(intervals) {
  if (intervals.length === 0) {
    return null;
  }
  return Math.max(...intervals.map(maxAbsFormattedInterval));
}

function nearlyEqualNumbers(left, right, tolerance = 1e-15) {
  const resolvedLeft = Number(left);
  const resolvedRight = Number(right);
  if (!Number.isFinite(resolvedLeft) || !Number.isFinite(resolvedRight)) {
    return false;
  }
  const scale = Math.max(1, Math.abs(resolvedLeft), Math.abs(resolvedRight));
  return Math.abs(resolvedLeft - resolvedRight) <= tolerance * scale;
}

export function makeTheta3minusFirstYGdSeriesContext({
  seriesOrder =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.default_series_order,
} = {}) {
  if (!Number.isInteger(seriesOrder) || seriesOrder < 43) {
    throw new Error("seriesOrder must be an integer at least 43");
  }

  const factorials = Array.from({ length: seriesOrder + 1 }, (_, index) =>
    index === 0 ? 1 : null
  );
  for (let index = 1; index < factorials.length; index += 1) {
    factorials[index] = factorials[index - 1] * index;
  }

  function zeros() {
    return Array.from({ length: seriesOrder + 1 }, () => [0, 0]);
  }

  function constant(valueOrInterval) {
    const series = zeros();
    series[0] = Array.isArray(valueOrInterval)
      ? root.outwardInterval(valueOrInterval)
      : root.pointInterval(valueOrInterval);
    return series;
  }

  function add(left, right) {
    return left.map((value, index) => root.addIntervals(value, right[index]));
  }

  function subtract(left, right) {
    return left.map((value, index) =>
      root.subtractIntervals(value, right[index])
    );
  }

  function scale(series, factor) {
    return series.map((value) => root.scaleInterval(value, factor));
  }

  function scaleByInterval(series, factorInterval) {
    return series.map((value) =>
      root.multiplyIntervals(value, factorInterval)
    );
  }

  function multiply(left, right) {
    const result = zeros();
    for (let leftIndex = 0; leftIndex <= seriesOrder; leftIndex += 1) {
      for (
        let rightIndex = 0;
        leftIndex + rightIndex <= seriesOrder;
        rightIndex += 1
      ) {
        result[leftIndex + rightIndex] = root.addIntervals(
          result[leftIndex + rightIndex],
          root.multiplyIntervals(left[leftIndex], right[rightIndex])
        );
      }
    }
    return result;
  }

  function power(series, exponent) {
    let result = constant(1);
    for (let index = 0; index < exponent; index += 1) {
      result = multiply(result, series);
    }
    return result;
  }

  function inverse(series) {
    const result = zeros();
    result[0] = root.reciprocalInterval(series[0]);
    for (let order = 1; order <= seriesOrder; order += 1) {
      let convolution = [0, 0];
      for (let index = 1; index <= order; index += 1) {
        convolution = root.addIntervals(
          convolution,
          root.multiplyIntervals(series[index], result[order - index])
        );
      }
      result[order] = root.divideIntervals(
        root.scaleInterval(convolution, -1),
        series[0]
      );
    }
    return result;
  }

  function divide(left, right) {
    return multiply(left, inverse(right));
  }

  function sinDerivativeInterval(center, derivativeIndex) {
    if (derivativeIndex % 4 === 0) {
      return root.sinInterval(center);
    }
    if (derivativeIndex % 4 === 1) {
      return root.cosInterval(center);
    }
    if (derivativeIndex % 4 === 2) {
      return root.scaleInterval(root.sinInterval(center), -1);
    }
    return root.scaleInterval(root.cosInterval(center), -1);
  }

  function cosDerivativeInterval(center, derivativeIndex) {
    if (derivativeIndex % 4 === 0) {
      return root.cosInterval(center);
    }
    if (derivativeIndex % 4 === 1) {
      return root.scaleInterval(root.sinInterval(center), -1);
    }
    if (derivativeIndex % 4 === 2) {
      return root.scaleInterval(root.cosInterval(center), -1);
    }
    return root.sinInterval(center);
  }

  function analyticSeries(series, derivativeInterval) {
    const center = series[0];
    const nilpotent = [...series];
    nilpotent[0] = [0, 0];
    let nilpotentPower = constant(1);
    let sum = zeros();
    for (let order = 0; order <= seriesOrder; order += 1) {
      sum = add(
        sum,
        scaleByInterval(
          nilpotentPower,
          root.scaleInterval(
            derivativeInterval(center, order),
            1 / factorials[order]
          )
        )
      );
      nilpotentPower = multiply(nilpotentPower, nilpotent);
    }
    return sum;
  }

  function sinSeries(series) {
    return analyticSeries(series, sinDerivativeInterval);
  }

  function cosSeries(series) {
    return analyticSeries(series, cosDerivativeInterval);
  }

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    seriesOrder,
    zeros,
    constant,
    add,
    subtract,
    scale,
    scaleByInterval,
    multiply,
    power,
    inverse,
    divide,
    sinSeries,
    cosSeries,
  };
}

function branchSignValue(branch) {
  return typeof branch === "number" ? branch : root.branchSign(branch);
}

function hIntervalAt(hIntervals, index) {
  return hIntervals[index] ?? [0, 0];
}

function hIntervalsWithX(hIntervals, xInterval) {
  const extended = hIntervals.map(numericInterval);
  extended[THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h39_index] =
    numericInterval(xInterval ?? [0, 0]);
  return extended;
}

function expandInterval(interval, radius) {
  const [left, right] = numericInterval(interval);
  const resolvedRadius = assertFiniteNonnegativeNumber("radius", radius);
  return [left - resolvedRadius, right + resolvedRadius];
}

function intervalAbsUpper(interval) {
  const [left, right] = numericInterval(interval);
  return Math.max(Math.abs(left), Math.abs(right));
}

function intervalClearanceFromZero(interval) {
  const [left, right] = numericInterval(interval);
  if (left > 0) {
    return left;
  }
  if (right < 0) {
    return -right;
  }
  return 0;
}

function intervalContainsInterval(container, inner) {
  const [containerLeft, containerRight] = numericInterval(container);
  const [innerLeft, innerRight] = numericInterval(inner);
  const scale = Math.max(
    1,
    Math.abs(containerLeft),
    Math.abs(containerRight),
    Math.abs(innerLeft),
    Math.abs(innerRight)
  );
  const tolerance = Number.EPSILON * 64 * scale;
  return (
    containerLeft <= innerLeft + tolerance &&
    containerRight >= innerRight - tolerance
  );
}

function assertFiniteNonnegativeNumber(name, value) {
  const resolved = Number(value);
  if (!Number.isFinite(resolved) || resolved < 0) {
    throw new Error(`${name} must be a finite nonnegative number`);
  }
  return resolved;
}

function assertFinitePositiveNumber(name, value) {
  const resolved = Number(value);
  if (!Number.isFinite(resolved) || resolved <= 0) {
    throw new Error(`${name} must be a finite positive number`);
  }
  return resolved;
}

export function computeSinhTaylorMajorant({
  argument,
  minOddTermCount = 8,
  maxOddTermCount = 200,
  tailRatioCeiling = 0.5,
} = {}) {
  const x = Number(argument);
  if (!Number.isFinite(x) || x < 0) {
    throw new Error("argument must be a finite nonnegative number");
  }
  if (
    !Number.isInteger(minOddTermCount) ||
    minOddTermCount < 1 ||
    !Number.isInteger(maxOddTermCount) ||
    maxOddTermCount < minOddTermCount
  ) {
    throw new Error(
      "minOddTermCount and maxOddTermCount must be positive integers with min <= max"
    );
  }
  const ratioCeiling = Number(tailRatioCeiling);
  if (!Number.isFinite(ratioCeiling) || ratioCeiling <= 0 || ratioCeiling >= 1) {
    throw new Error("tailRatioCeiling must satisfy 0 < tailRatioCeiling < 1");
  }

  let term = root.nextUp(x);
  let sum = 0;
  let includedOddTermCount = 0;
  let firstOmittedTerm = null;
  let tailRatioBound = null;

  for (let n = 0; n < maxOddTermCount; n += 1) {
    sum = root.nextUp(sum + term);
    includedOddTermCount = n + 1;
    const nextTermRatio = root.nextUp((x * x) / ((2 * n + 2) * (2 * n + 3)));
    const nextTerm = root.nextUp(term * nextTermRatio);
    const nextTailRatio = root.nextUp(
      (x * x) / ((2 * n + 4) * (2 * n + 5))
    );
    firstOmittedTerm = nextTerm;
    tailRatioBound = nextTailRatio;
    if (
      includedOddTermCount >= minOddTermCount &&
      nextTailRatio < ratioCeiling
    ) {
      break;
    }
    term = nextTerm;
  }

  if (!Number.isFinite(firstOmittedTerm) || !Number.isFinite(tailRatioBound)) {
    throw new Error("sinh Taylor majorant overflowed before the tail bound");
  }
  if (tailRatioBound >= 1) {
    throw new Error(
      "sinh Taylor majorant failed to make the geometric tail ratio less than one"
    );
  }

  const tailMajorant = root.nextUp(firstOmittedTerm / (1 - tailRatioBound));
  const majorant = root.nextUp(sum + tailMajorant);

  return {
    status: "sinh-taylor-tail-majorant-emitted",
    certificate_type:
      "sinh-positive-taylor-geometric-tail-upper-envelope",
    argument: x,
    argument_bound: x,
    included_odd_term_count: includedOddTermCount,
    included_odd_terms: includedOddTermCount,
    tail_ratio_ceiling: ratioCeiling,
    first_omitted_term: firstOmittedTerm,
    tail_ratio_bound: tailRatioBound,
    finite_prefix_majorant: sum,
    finite_prefix_sum: sum,
    taylor_tail_majorant: tailMajorant,
    tail_majorant: tailMajorant,
    sinh_majorant: majorant,
    sinh_upper_majorant: majorant,
    dominates_math_sinh: majorant >= Math.sinh(x),
    certifies_outward_rounded_transcendental_upper_bound:
      Number.isFinite(majorant) && majorant >= Math.sinh(x),
    proof_inequality:
      "sinh(A) <= sum_{j=0}^N A^(2j+1)/(2j+1)! + first_omitted/(1-q_N)",
    arithmetic: "directed-rounded-floating-upper-envelope",
    predicates: {
      argument_bound_finite_nonnegative: true,
      tail_ratio_strictly_below_one: tailRatioBound < 1,
      partial_sum_outward_rounded: true,
      tail_bound_outward_rounded: true,
      no_math_sinh_oracle: true,
    },
  };
}

export function computeCoefficientPrefixMajorant(
  coefficients,
  rho,
  shiftPower = 0
) {
  const resolvedRho = Number(rho);
  if (!Number.isFinite(resolvedRho) || resolvedRho < 0) {
    throw new Error("rho must be a finite nonnegative number");
  }
  return coefficients.reduce(
    (sum, coefficient, index) =>
      sum +
      intervalAbsUpper(coefficient) * resolvedRho ** (index + shiftPower),
    0
  );
}

export function computeYPowerFactoredCoefficientPrefixMajorant(
  coefficients,
  rho,
  yPower
) {
  const resolvedYPower = Number(yPower);
  if (!Number.isInteger(resolvedYPower) || resolvedYPower < 0) {
    throw new Error("yPower must be a nonnegative integer");
  }
  return computeCoefficientPrefixMajorant(coefficients, rho, resolvedYPower);
}

export function computeSeriesCoordinateMajorant(coefficients, rho) {
  return computeCoefficientPrefixMajorant(coefficients, rho);
}

export function computeCoefficientPrefixFloor(coefficients, rho) {
  if (!Array.isArray(coefficients) || coefficients.length === 0) {
    throw new Error("coefficients must be a nonempty coefficient list");
  }
  const resolvedRho = Number(rho);
  if (!Number.isFinite(resolvedRho) || resolvedRho < 0) {
    throw new Error("rho must be a finite nonnegative number");
  }
  const tailMajorant = computeCoefficientPrefixMajorant(
    coefficients.slice(1),
    resolvedRho,
    1
  );
  return intervalClearanceFromZero(coefficients[0]) - tailMajorant;
}

export function computeCauchyShiftedTailMajorants({
  outerBound,
  outerRadius,
  targetRadius,
  shiftPower,
} = {}) {
  const bound = Number(outerBound);
  const outer = Number(outerRadius);
  const target = Number(targetRadius);
  const shift = Number(shiftPower);
  if (!Number.isFinite(bound) || bound < 0) {
    throw new Error("outerBound must be a finite nonnegative number");
  }
  if (!Number.isFinite(outer) || outer <= 0) {
    throw new Error("outerRadius must be a finite positive number");
  }
  if (!Number.isFinite(target) || target < 0 || target >= outer) {
    throw new Error(
      "targetRadius must be finite and satisfy 0 <= targetRadius < outerRadius"
    );
  }
  if (!Number.isInteger(shift) || shift < 0) {
    throw new Error("shiftPower must be a nonnegative integer");
  }
  const q = target / outer;
  return {
    status: "cauchy-shifted-tail-majorants-emitted",
    outer_bound: bound,
    outer_radius: outer,
    target_radius: target,
    shift_power: shift,
    q,
    shifted_function_majorant: bound / (outer ** shift * (1 - q)),
    y_derivative_shifted_function_majorant:
      (bound / outer ** shift) * (q / (1 - q) ** 2),
    certifies_continuous_polydisc_primitives: false,
  };
}

export function computeCauchyRemovableQuotientFloor({
  outerBound,
  outerRadius,
  targetRadius,
  leadingCoefficientInterval,
} = {}) {
  const bound = Number(outerBound);
  const outer = Number(outerRadius);
  const target = Number(targetRadius);
  if (!Number.isFinite(bound) || bound < 0) {
    throw new Error("outerBound must be a finite nonnegative number");
  }
  if (!Number.isFinite(outer) || outer <= 0) {
    throw new Error("outerRadius must be a finite positive number");
  }
  if (!Number.isFinite(target) || target < 0 || target >= outer) {
    throw new Error(
      "targetRadius must be finite and satisfy 0 <= targetRadius < outerRadius"
    );
  }
  const leadingCoefficient = numericInterval(leadingCoefficientInterval);
  assertInterval("leadingCoefficientInterval", leadingCoefficient);
  const q = target / outer;
  const tailMajorant = (bound / outer) * (q / (1 - q));
  return {
    status: "cauchy-removable-quotient-floor-emitted",
    outer_bound: bound,
    outer_radius: outer,
    target_radius: target,
    q,
    leading_coefficient_clearance: intervalClearanceFromZero(leadingCoefficient),
    removable_quotient_tail_majorant: tailMajorant,
    removable_quotient_floor:
      intervalClearanceFromZero(leadingCoefficient) - tailMajorant,
    certifies_continuous_polydisc_primitives: false,
  };
}

function assertCauchyTailInputs({
  outerBound,
  outerRadius,
  targetRadius,
  shiftPower,
}) {
  const bound = Number(outerBound);
  const outer = Number(outerRadius);
  const target = Number(targetRadius);
  const shift = Number(shiftPower);
  if (!Number.isFinite(bound) || bound < 0) {
    throw new Error("outerBound must be a finite nonnegative number");
  }
  if (!Number.isFinite(outer) || outer <= 0) {
    throw new Error("outerRadius must be a finite positive number");
  }
  if (!Number.isFinite(target) || target < 0 || target >= outer) {
    throw new Error(
      "targetRadius must be finite and satisfy 0 <= targetRadius < outerRadius"
    );
  }
  if (!Number.isInteger(shift) || shift < 0) {
    throw new Error("shiftPower must be a nonnegative integer");
  }
  return { bound, outer, target, shift, q: target / outer };
}

export function computeBranchGDenominatorClearanceMajorant({
  kernelMajorant,
  speedLowerBound,
  deltaClearance,
  jacobianClearance,
  sourceCoefficientAbs = 1,
} = {}) {
  const kernel = assertFiniteNonnegativeNumber("kernelMajorant", kernelMajorant);
  const speedFloor = assertFinitePositiveNumber(
    "speedLowerBound",
    speedLowerBound
  );
  const deltaFloor = assertFinitePositiveNumber(
    "deltaClearance",
    deltaClearance
  );
  const jacobianFloor = assertFinitePositiveNumber(
    "jacobianClearance",
    jacobianClearance
  );
  const sourceAbs = assertFiniteNonnegativeNumber(
    "sourceCoefficientAbs",
    sourceCoefficientAbs
  );
  const denominatorClearance = speedFloor * deltaFloor ** 2 * jacobianFloor;
  const branchMajorant = (4 * sourceAbs * kernel) / denominatorClearance;
  return {
    status: "h39-branch-g-denominator-clearance-majorant-emitted",
    kernel_majorant: kernel,
    speed_lower_bound: speedFloor,
    delta_clearance: deltaFloor,
    jacobian_clearance: jacobianFloor,
    source_coefficient_abs: sourceAbs,
    denominator_clearance: denominatorClearance,
    branch_g_outer_majorant: branchMajorant,
    formula:
      "4*sourceCoefficientAbs*kernelMajorant/(speedLowerBound*deltaClearance^2*jacobianClearance)",
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
  };
}

export function computeNGOuterBoundFromDenominatorClearance({
  branchGOuterMajorants,
  lMajorant,
  lowerPolynomialMajorant,
  outerRadius,
} = {}) {
  if (
    !Array.isArray(branchGOuterMajorants) ||
    branchGOuterMajorants.length === 0
  ) {
    throw new Error("branchGOuterMajorants must be a nonempty array");
  }
  const branchBounds = branchGOuterMajorants.map((value, index) =>
    assertFiniteNonnegativeNumber(`branchGOuterMajorants[${index}]`, value)
  );
  const lBound = assertFiniteNonnegativeNumber("lMajorant", lMajorant);
  const lowerPolynomialBound = assertFiniteNonnegativeNumber(
    "lowerPolynomialMajorant",
    lowerPolynomialMajorant
  );
  const outer = assertFiniteNonnegativeNumber("outerRadius", outerRadius);
  const pairGOuterMajorant = branchBounds.reduce(
    (sum, value) => sum + value,
    0
  );
  const lowerPolynomialY2Majorant = outer ** 2 * lowerPolynomialBound;
  const nGOuterBound =
    pairGOuterMajorant + lBound + lowerPolynomialY2Majorant;
  return {
    status: "h39-n-g-denominator-clearance-outer-majorant-emitted",
    branch_g_outer_majorants: branchBounds,
    pair_g_outer_majorant: pairGOuterMajorant,
    l_majorant: lBound,
    lower_polynomial_majorant: lowerPolynomialBound,
    outer_radius: outer,
    lower_polynomial_y2_majorant: lowerPolynomialY2Majorant,
    n_g_outer_bound: nGOuterBound,
    formula:
      "sum(branchGOuterMajorants)+lMajorant+outerRadius^2*lowerPolynomialMajorant",
    candidate_bound_role:
      "outer bound for N_G=P-L-y^2 A_G38 when all inputs are certified on the same graph-centered domain",
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
  };
}

export function computeH39NGOuterBoundCandidateMG({
  nGShiftedCoefficients,
  nGOuterBound,
  nGOuterRadius,
  rho,
  nGShift = THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.n_g_shift,
} = {}) {
  const cauchyDiagnostic = computeCauchyShiftedPrefixTailMajorant({
    coefficients: nGShiftedCoefficients,
    outerBound: nGOuterBound,
    outerRadius: nGOuterRadius,
    targetRadius: rho,
    shiftPower: nGShift,
  });
  return {
    status: "h39-n-g-outer-bound-candidate-m-g-emitted",
    evaluation_level: "candidate-prefix-plus-cauchy-tail",
    n_g_shift: cauchyDiagnostic.shift_power,
    retained_shifted_prefix_order: cauchyDiagnostic.finite_prefix_order,
    n_g_outer_bound: cauchyDiagnostic.outer_bound,
    n_g_outer_radius: cauchyDiagnostic.outer_radius,
    rho: cauchyDiagnostic.target_radius,
    q: cauchyDiagnostic.q,
    candidate_M_G_finite_prefix:
      cauchyDiagnostic.unshifted_finite_prefix_majorant,
    candidate_M_G_cauchy_tail_after_prefix:
      cauchyDiagnostic.unshifted_cauchy_tail_after_prefix_majorant,
    candidate_M_G_cauchy_tail_remainder_profile:
      cauchyDiagnostic.unshifted_cauchy_tail_after_prefix_majorant,
    candidate_M_G_prefix_plus_tail_bound:
      cauchyDiagnostic.unshifted_function_prefix_plus_tail_majorant,
    mGRemainderProfile:
      cauchyDiagnostic.unshifted_cauchy_tail_after_prefix_majorant,
    shifted_T_G_prefix_plus_tail_majorant:
      cauchyDiagnostic.shifted_function_prefix_plus_tail_majorant,
    cauchy_diagnostic: cauchyDiagnostic,
    candidate_bound_source:
      "shifted N_G retained prefix plus unshifted N_G Cauchy tail",
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_h39_polydisc_M_G_bound: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function computeH39NGOuterBoundPrimitiveReplay({
  nGShiftedCoefficients,
  nGOuterBound,
  nGOuterRadius,
  rho,
  nGShift = THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.n_g_shift,
  candidate_E_R_bound,
  candidate_nu_J_bound,
  candidate_L_J_reduced_continuous_majorant,
  candidate_M_R_bound,
  radiusMultiple,
  rhoXMultiplier,
  rXFraction,
} = {}) {
  const candidateMG = computeH39NGOuterBoundCandidateMG({
    nGShiftedCoefficients,
    nGOuterBound,
    nGOuterRadius,
    rho,
    nGShift,
  });
  const replay = computeH39FinitePrefixPrimitiveScalarReplay({
    candidate_E_R_finite_prefix: candidate_E_R_bound,
    candidate_nu_J_finite_prefix: candidate_nu_J_bound,
    candidate_L_J_reduced_continuous_majorant,
    candidate_M_G_finite_prefix:
      candidateMG.candidate_M_G_prefix_plus_tail_bound,
    candidate_M_R_finite_prefix: candidate_M_R_bound,
    radiusMultiple,
    rhoXMultiplier,
    rXFraction,
  });
  return {
    status: "h39-n-g-outer-bound-primitive-replay-emitted",
    evaluation_level: "candidate-replay-not-certificate",
    candidate_M_G_outer_bound_diagnostic: candidateMG,
    candidate_M_G_bound: candidateMG.candidate_M_G_prefix_plus_tail_bound,
    candidate_primitive_replay: replay,
    candidate_scalar_replay_closes:
      replay.candidate_scalar_replay_closes ?? false,
    candidate_rouche_primitive_closure_ratio:
      replay.candidate_rouche_primitive_closure_ratio ?? null,
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_h39_polydisc_M_G_bound: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function computeH39PrimitiveMGClosureCeilingCandidate({
  candidate_E_R_bound,
  candidate_nu_J_bound,
  candidate_L_J_reduced_continuous_majorant,
  candidate_M_R_bound,
  radiusMultiple,
  rhoXMultiplier,
  rXFraction,
} = {}) {
  const unitReplay = computeH39FinitePrefixPrimitiveScalarReplay({
    candidate_E_R_finite_prefix: candidate_E_R_bound,
    candidate_nu_J_finite_prefix: candidate_nu_J_bound,
    candidate_L_J_reduced_continuous_majorant,
    candidate_M_G_finite_prefix: 1,
    candidate_M_R_finite_prefix: candidate_M_R_bound,
    radiusMultiple,
    rhoXMultiplier,
    rXFraction,
  });
  const ratio = primitiveCandidateNumber(
    unitReplay.candidate_rouche_primitive_closure_ratio
  );
  const canInvert = unitReplay.status.endsWith("-emitted") && ratio > 0;
  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: canInvert
      ? "h39-primitive-m-g-closure-ceiling-candidate-emitted"
      : "h39-primitive-m-g-closure-ceiling-candidate-open",
    evaluation_level: "candidate-primitive-m-g-ceiling",
    unit_M_G_replay: unitReplay,
    candidate_primitive_M_G_unit_closure_ratio: ratio,
    candidate_primitive_M_G_closure_ceiling: canInvert ? 1 / ratio : null,
    candidate_bound_source:
      "h39 primitive replay is linear in M_G after E_R, nu_J, L_J, M_R, and the X-radius policy are fixed",
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function computeH39DenominatorCauchyOuterBoundCeilingCandidate({
  nGShiftedCoefficients,
  rho,
  nGOuterRadius,
  nGShift = THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.n_g_shift,
  lMajorant = 0,
  lowerPolynomialMajorant = 0,
  outerRadius = nGOuterRadius,
  candidate_E_R_bound,
  candidate_nu_J_bound,
  candidate_L_J_reduced_continuous_majorant,
  candidate_M_R_bound,
  radiusMultiple,
  rhoXMultiplier,
  rXFraction,
} = {}) {
  const primitiveCeiling = computeH39PrimitiveMGClosureCeilingCandidate({
    candidate_E_R_bound,
    candidate_nu_J_bound,
    candidate_L_J_reduced_continuous_majorant,
    candidate_M_R_bound,
    radiusMultiple,
    rhoXMultiplier,
    rXFraction,
  });
  const tailDiagnostic = computeCauchyShiftedPrefixTailMajorant({
    coefficients: nGShiftedCoefficients,
    outerBound: 1,
    outerRadius: nGOuterRadius,
    targetRadius: rho,
    shiftPower: nGShift,
  });
  const lBound = assertFiniteNonnegativeNumber("lMajorant", lMajorant);
  const lowerPolynomialBound = assertFiniteNonnegativeNumber(
    "lowerPolynomialMajorant",
    lowerPolynomialMajorant
  );
  const outer = assertFiniteNonnegativeNumber("outerRadius", outerRadius);
  const mGCeiling =
    primitiveCeiling.candidate_primitive_M_G_closure_ceiling;
  const prefixMajorant =
    tailDiagnostic.unshifted_finite_prefix_majorant;
  const tailCoefficient =
    tailDiagnostic.unshifted_cauchy_tail_after_prefix_majorant;
  const hasPositiveNGOuterBudget =
    mGCeiling !== null && mGCeiling > prefixMajorant && tailCoefficient > 0;
  const nGOuterBoundCeiling = hasPositiveNGOuterBudget
    ? (mGCeiling - prefixMajorant) / tailCoefficient
    : null;
  const fixedOuterTerms =
    lBound + outer ** 2 * lowerPolynomialBound;
  const branchGSumBudgetCeiling =
    nGOuterBoundCeiling === null
      ? null
      : nGOuterBoundCeiling - fixedOuterTerms;

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status:
      branchGSumBudgetCeiling !== null && branchGSumBudgetCeiling > 0
        ? "h39-denominator-cauchy-outer-bound-ceiling-candidate-emitted"
        : "h39-denominator-cauchy-outer-bound-ceiling-candidate-open",
    evaluation_level: "candidate-denominator-cauchy-outer-bound-ceiling",
    rho: Number(rho),
    n_g_outer_radius: Number(nGOuterRadius),
    n_g_shift: Number(nGShift),
    retained_shifted_prefix_order: tailDiagnostic.finite_prefix_order,
    q: tailDiagnostic.q,
    candidate_primitive_M_G_closure_ceiling: mGCeiling,
    n_g_shifted_unshifted_prefix_majorant: prefixMajorant,
    n_g_outer_bound_tail_coefficient: tailCoefficient,
    n_g_outer_bound_ceiling: nGOuterBoundCeiling,
    l_majorant: lBound,
    lower_polynomial_majorant: lowerPolynomialBound,
    outer_radius: outer,
    fixed_outer_terms: fixedOuterTerms,
    branch_g_sum_budget_ceiling: branchGSumBudgetCeiling,
    ceiling_formula:
      "B_NG_out < (M_G_ceiling-prefix_unshifted)/(q^(nGShift+K+1)/(1-q)); branch sum ceiling subtracts L_*+R_y^2*A_*",
    primitive_M_G_ceiling_diagnostic: primitiveCeiling,
    n_g_tail_diagnostic: tailDiagnostic,
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_h39_polydisc_M_G_bound: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function computeBranchGDenominatorAllocationTargetsCandidate({
  branchGSumBudgetCeiling,
  branchInputs,
  allocationWeights,
} = {}) {
  const totalBudget = assertFinitePositiveNumber(
    "branchGSumBudgetCeiling",
    branchGSumBudgetCeiling
  );
  if (!Array.isArray(branchInputs) || branchInputs.length === 0) {
    throw new Error("branchInputs must be a nonempty array");
  }
  const weights = Array.isArray(allocationWeights)
    ? allocationWeights.map((weight, index) =>
        assertFinitePositiveNumber(`allocationWeights[${index}]`, weight)
      )
    : branchInputs.map(() => 1);
  if (weights.length !== branchInputs.length) {
    throw new Error("allocationWeights must match branchInputs length");
  }
  const weightSum = weights.reduce((sum, weight) => sum + weight, 0);

  function inputNumber(input, keys, fallback, assertFn, label, index) {
    const value = keys
      .map((key) => input?.[key])
      .find((candidate) => isProvided(candidate));
    return assertFn(
      `branchInputs[${index}].${label}`,
      isProvided(value) ? value : fallback
    );
  }

  const rows = branchInputs.map((input, index) => {
    const allocatedBudget = (totalBudget * weights[index]) / weightSum;
    const kernelMajorant = inputNumber(
      input,
      ["kernelMajorant", "kernel_majorant", "branch_kernel_majorant"],
      undefined,
      assertFiniteNonnegativeNumber,
      "kernelMajorant",
      index
    );
    const speedLowerBound = inputNumber(
      input,
      ["speedLowerBound", "speed_lower_bound"],
      undefined,
      assertFinitePositiveNumber,
      "speedLowerBound",
      index
    );
    const sourceCoefficientAbs = inputNumber(
      input,
      ["sourceCoefficientAbs", "source_coefficient_abs"],
      1,
      assertFiniteNonnegativeNumber,
      "sourceCoefficientAbs",
      index
    );
    const deltaClearanceValue = [
      "deltaClearance",
      "delta_clearance",
      "delta_clearance_floor",
      "delta_clearance_prefix_plus_tail_floor",
    ]
      .map((key) => input?.[key])
      .find((candidate) => isProvided(candidate));
    const jacobianClearanceValue = [
      "jacobianClearance",
      "jacobian_clearance",
      "jacobian_abs_floor",
      "jacobian_abs_prefix_plus_tail_floor",
    ]
      .map((key) => input?.[key])
      .find((candidate) => isProvided(candidate));
    const deltaClearance = isProvided(deltaClearanceValue)
      ? assertFinitePositiveNumber(
          `branchInputs[${index}].deltaClearance`,
          deltaClearanceValue
        )
      : null;
    const jacobianClearance = isProvided(jacobianClearanceValue)
      ? assertFinitePositiveNumber(
          `branchInputs[${index}].jacobianClearance`,
          jacobianClearanceValue
        )
      : null;
    const requiredDeltaSquaredJacobianClearance =
      (4 * sourceCoefficientAbs * kernelMajorant) /
      (speedLowerBound * allocatedBudget);
    const branchPressureCoefficient =
      (4 * sourceCoefficientAbs * kernelMajorant) / speedLowerBound;
    const requiredJacobianClearanceGivenDelta =
      deltaClearance === null
        ? null
        : requiredDeltaSquaredJacobianClearance / deltaClearance ** 2;
    const requiredDeltaClearanceGivenJacobian =
      jacobianClearance === null
        ? null
        : Math.sqrt(
            requiredDeltaSquaredJacobianClearance / jacobianClearance
          );
    const suppliedDeltaSquaredJacobianClearance =
      deltaClearance === null || jacobianClearance === null
        ? null
        : deltaClearance ** 2 * jacobianClearance;
    const branchMajorant =
      deltaClearance === null || jacobianClearance === null
        ? null
        : computeBranchGDenominatorClearanceMajorant({
            kernelMajorant,
            speedLowerBound,
            deltaClearance,
            jacobianClearance,
            sourceCoefficientAbs,
          });

    return {
      branch: input?.branch ?? input?.branchSign ?? index,
      allocation_weight: weights[index],
      allocated_branch_g_budget: allocatedBudget,
      kernel_majorant: kernelMajorant,
      speed_lower_bound: speedLowerBound,
      source_coefficient_abs: sourceCoefficientAbs,
      branch_pressure_coefficient: branchPressureCoefficient,
      required_delta_squared_jacobian_clearance:
        requiredDeltaSquaredJacobianClearance,
      supplied_delta_clearance: deltaClearance,
      supplied_jacobian_clearance: jacobianClearance,
      required_jacobian_clearance_given_delta:
        requiredJacobianClearanceGivenDelta,
      required_delta_clearance_given_jacobian:
        requiredDeltaClearanceGivenJacobian,
      supplied_delta_squared_jacobian_clearance:
        suppliedDeltaSquaredJacobianClearance,
      supplied_delta_squared_jacobian_margin:
        suppliedDeltaSquaredJacobianClearance === null
          ? null
          : suppliedDeltaSquaredJacobianClearance -
            requiredDeltaSquaredJacobianClearance,
      branch_g_majorant_from_supplied_clearances:
        branchMajorant?.branch_g_outer_majorant ?? null,
      candidate_branch_target_met:
        suppliedDeltaSquaredJacobianClearance === null
          ? null
          : suppliedDeltaSquaredJacobianClearance >
            requiredDeltaSquaredJacobianClearance,
      candidate_branch_majorant_below_allocation:
        branchMajorant === null
          ? null
          : branchMajorant.branch_g_outer_majorant < allocatedBudget,
    };
  });
  const pressureCoefficients = rows.map(
    (row) => row.branch_pressure_coefficient
  );
  const pressureCoefficientSum = pressureCoefficients.reduce(
    (sum, coefficient) => sum + coefficient,
    0
  );
  const allPressureCoefficientsPositive = pressureCoefficients.every(
    (coefficient) => coefficient > 0
  );

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-branch-g-denominator-allocation-targets-candidate-emitted",
    evaluation_level: "candidate-branch-denominator-allocation-targets",
    branch_g_sum_budget_ceiling: totalBudget,
    allocation_policy:
      "normalize allocationWeights; each branch majorant must be strictly below its allocated budget, and the allocations sum to the branch G sum ceiling",
    allocation_weight_sum: weightSum,
    pressure_balanced_allocation_policy:
      "if all branch_pressure_coefficient values are positive, choosing allocation weights proportional to them equalizes the required delta^2*jacobian product and minimizes the maximum required product for this candidate formula",
    pressure_balanced_allocation_weights: allPressureCoefficientsPositive
      ? pressureCoefficients
      : null,
    pressure_balanced_common_required_delta_squared_jacobian_clearance:
      allPressureCoefficientsPositive
        ? pressureCoefficientSum / totalBudget
        : null,
    branch_rows: rows,
    candidate_all_supplied_branch_targets_met: rows.every(
      (row) => row.candidate_branch_target_met === true
    ),
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function computeH39DenominatorCauchyPrimitiveClosureCandidate({
  branchDenominatorCandidates,
  lMajorant,
  lowerPolynomialMajorant,
  outerRadius,
  nGShiftedCoefficients,
  nGOuterRadius = outerRadius,
  rho,
  nGShift = THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.n_g_shift,
  candidate_E_R_bound,
  candidate_nu_J_bound,
  candidate_L_J_reduced_continuous_majorant,
  candidate_M_R_bound,
  radiusMultiple,
  rhoXMultiplier,
  rXFraction,
} = {}) {
  if (
    !Array.isArray(branchDenominatorCandidates) ||
    branchDenominatorCandidates.length === 0
  ) {
    throw new Error(
      "branchDenominatorCandidates must be a nonempty array"
    );
  }
  const branchGOuterMajorants = branchDenominatorCandidates.map(
    (candidate, index) => {
      const value =
        typeof candidate === "number"
          ? candidate
          : candidate?.branch_g_outer_majorant;
      return assertFiniteNonnegativeNumber(
        `branchDenominatorCandidates[${index}].branch_g_outer_majorant`,
        value
      );
    }
  );
  const nGOuterBoundDiagnostic = computeNGOuterBoundFromDenominatorClearance({
    branchGOuterMajorants,
    lMajorant,
    lowerPolynomialMajorant,
    outerRadius,
  });
  const primitiveReplay = computeH39NGOuterBoundPrimitiveReplay({
    nGShiftedCoefficients,
    nGOuterBound: nGOuterBoundDiagnostic.n_g_outer_bound,
    nGOuterRadius,
    rho,
    nGShift,
    candidate_E_R_bound,
    candidate_nu_J_bound,
    candidate_L_J_reduced_continuous_majorant,
    candidate_M_R_bound,
    radiusMultiple,
    rhoXMultiplier,
    rXFraction,
  });
  const ceilingDiagnostic =
    computeH39DenominatorCauchyOuterBoundCeilingCandidate({
      nGShiftedCoefficients,
      rho,
      nGOuterRadius,
      nGShift,
      lMajorant,
      lowerPolynomialMajorant,
      outerRadius,
      candidate_E_R_bound,
      candidate_nu_J_bound,
      candidate_L_J_reduced_continuous_majorant,
      candidate_M_R_bound,
      radiusMultiple,
      rhoXMultiplier,
      rXFraction,
    });
  const actualBranchGOuterMajorantSum =
    nGOuterBoundDiagnostic.pair_g_outer_majorant;
  const branchGSumBudgetCeiling =
    ceilingDiagnostic.branch_g_sum_budget_ceiling;
  const branchGSumBudgetMargin =
    Number.isFinite(branchGSumBudgetCeiling)
      ? branchGSumBudgetCeiling - actualBranchGOuterMajorantSum
      : null;
  const branchGSumBudgetRatio =
    Number.isFinite(branchGSumBudgetCeiling) && branchGSumBudgetCeiling > 0
      ? actualBranchGOuterMajorantSum / branchGSumBudgetCeiling
      : null;
  const denominatorBudgetStatus =
    !Number.isFinite(branchGSumBudgetCeiling) || branchGSumBudgetCeiling <= 0
      ? "h39-denominator-budget-no-positive-branch-g-ceiling"
      : branchGSumBudgetMargin > 0
        ? "h39-denominator-budget-candidate-below-ceiling"
        : "h39-denominator-budget-candidate-exceeds-ceiling";
  const canEmitAllocationTargets =
    Number.isFinite(branchGSumBudgetCeiling) &&
    branchGSumBudgetCeiling > 0 &&
    branchDenominatorCandidates.every(
      (candidate) => candidate !== null && typeof candidate === "object"
    );
  const branchDenominatorAllocationTargets = canEmitAllocationTargets
    ? computeBranchGDenominatorAllocationTargetsCandidate({
        branchGSumBudgetCeiling,
        branchInputs: branchDenominatorCandidates,
      })
    : null;

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-denominator-cauchy-primitive-closure-candidate-emitted",
    evaluation_level:
      "candidate-branch-denominator-cauchy-to-primitive-replay",
    branch_count: branchGOuterMajorants.length,
    branch_g_outer_majorants: branchGOuterMajorants,
    l_majorant: nGOuterBoundDiagnostic.l_majorant,
    lower_polynomial_majorant:
      nGOuterBoundDiagnostic.lower_polynomial_majorant,
    outer_radius: nGOuterBoundDiagnostic.outer_radius,
    n_g_outer_bound: nGOuterBoundDiagnostic.n_g_outer_bound,
    candidate_M_G_bound: primitiveReplay.candidate_M_G_bound,
    candidate_scalar_replay_closes:
      primitiveReplay.candidate_scalar_replay_closes ?? false,
    candidate_rouche_primitive_closure_ratio:
      primitiveReplay.candidate_rouche_primitive_closure_ratio ?? null,
    denominator_budget_status: denominatorBudgetStatus,
    n_g_outer_bound_ceiling:
      ceilingDiagnostic.n_g_outer_bound_ceiling ?? null,
    branch_g_sum_budget_ceiling: branchGSumBudgetCeiling ?? null,
    actual_branch_g_outer_majorant_sum:
      actualBranchGOuterMajorantSum,
    branch_g_sum_budget_margin: branchGSumBudgetMargin,
    branch_g_sum_budget_ratio: branchGSumBudgetRatio,
    branch_g_sum_shrink_factor_to_ceiling:
      branchGSumBudgetRatio === null ? null : Math.max(1, branchGSumBudgetRatio),
    denominator_cauchy_outer_bound_ceiling_diagnostic:
      ceilingDiagnostic,
    branch_denominator_allocation_targets:
      branchDenominatorAllocationTargets,
    n_g_outer_bound_diagnostic: nGOuterBoundDiagnostic,
    primitive_replay: primitiveReplay,
    candidate_bound_source:
      "branch Cauchy denominator candidates plus denominator-clearance N_G outer bound plus corrected unshifted M_G Cauchy replay",
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_h39_polydisc_M_G_bound: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

function derivativeTailGeometricSum(q, firstTailIndex) {
  return (
    q ** firstTailIndex *
    (firstTailIndex - (firstTailIndex - 1) * q) /
    (1 - q) ** 2
  );
}

function computeCauchyTailMajorantForOrder({
  bound,
  outer,
  q,
  shift,
  prefixOrder,
  tailKind,
}) {
  const base = bound / outer ** shift;
  const firstTailIndex = prefixOrder + 1;
  if (tailKind === "function") {
    return base * (q ** firstTailIndex / (1 - q));
  }
  if (tailKind === "unshifted-function") {
    return bound * (q ** (shift + firstTailIndex) / (1 - q));
  }
  if (tailKind === "y-derivative") {
    return base * derivativeTailGeometricSum(q, firstTailIndex);
  }
  throw new Error("tailKind must be function, unshifted-function, or y-derivative");
}

export function computeCauchyShiftedPrefixTailMajorant({
  coefficients,
  outerBound,
  outerRadius,
  targetRadius,
  shiftPower,
} = {}) {
  if (!Array.isArray(coefficients) || coefficients.length === 0) {
    throw new Error("coefficients must be a nonempty coefficient list");
  }
  const { bound, outer, target, shift, q } = assertCauchyTailInputs({
    outerBound,
    outerRadius,
    targetRadius,
    shiftPower,
  });
  const prefixOrder = coefficients.length - 1;
  const prefixMajorant = computeCoefficientPrefixMajorant(coefficients, target);
  const unshiftedPrefixMajorant = computeCoefficientPrefixMajorant(
    coefficients,
    target,
    shift
  );
  const yDerivativePrefixMajorant = coefficients.reduce(
    (sum, coefficient, index) =>
      sum + index * intervalAbsUpper(coefficient) * target ** index,
    0
  );
  const tailAfterPrefixMajorant = computeCauchyTailMajorantForOrder({
    bound,
    outer,
    q,
    shift,
    prefixOrder,
    tailKind: "function",
  });
  const yDerivativeTailAfterPrefixMajorant = computeCauchyTailMajorantForOrder({
    bound,
    outer,
    q,
    shift,
    prefixOrder,
    tailKind: "y-derivative",
  });
  const unshiftedTailAfterPrefixMajorant = computeCauchyTailMajorantForOrder({
    bound,
    outer,
    q,
    shift,
    prefixOrder,
    tailKind: "unshifted-function",
  });

  return {
    status: "cauchy-shifted-prefix-tail-majorant-emitted",
    outer_bound: bound,
    outer_radius: outer,
    target_radius: target,
    shift_power: shift,
    q,
    finite_prefix_order: prefixOrder,
    finite_prefix_majorant: prefixMajorant,
    cauchy_tail_after_prefix_majorant: tailAfterPrefixMajorant,
    shifted_function_prefix_plus_tail_majorant:
      prefixMajorant + tailAfterPrefixMajorant,
    unshifted_finite_prefix_majorant: unshiftedPrefixMajorant,
    unshifted_cauchy_tail_after_prefix_majorant:
      unshiftedTailAfterPrefixMajorant,
    unshifted_function_prefix_plus_tail_majorant:
      unshiftedPrefixMajorant + unshiftedTailAfterPrefixMajorant,
    y_derivative_finite_prefix_majorant: yDerivativePrefixMajorant,
    y_derivative_cauchy_tail_after_prefix_majorant:
      yDerivativeTailAfterPrefixMajorant,
    y_derivative_prefix_plus_tail_majorant:
      yDerivativePrefixMajorant + yDerivativeTailAfterPrefixMajorant,
    certifies_continuous_polydisc_primitives: false,
  };
}

export function computeH39R43AnalyticRemainderProfileCandidate({
  coefficients,
  outerBound,
  outerRadius,
  targetRadius,
  shiftPower =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift,
} = {}) {
  const cauchyDiagnostic = computeCauchyShiftedPrefixTailMajorant({
    coefficients,
    outerBound,
    outerRadius,
    targetRadius,
    shiftPower,
  });
  return {
    status: "h39-r43-analytic-remainder-profile-candidate-emitted",
    evaluation_level: "candidate-cauchy-analytic-remainder-profile",
    r43_shift_power: cauchyDiagnostic.shift_power,
    outer_bound: cauchyDiagnostic.outer_bound,
    outer_radius: cauchyDiagnostic.outer_radius,
    target_radius: cauchyDiagnostic.target_radius,
    q: cauchyDiagnostic.q,
    retained_shifted_prefix_order: cauchyDiagnostic.finite_prefix_order,
    candidate_E_R_finite_prefix:
      cauchyDiagnostic.finite_prefix_majorant,
    candidate_E_R_cauchy_tail_after_prefix_profile:
      cauchyDiagnostic.cauchy_tail_after_prefix_majorant,
    candidate_E_R_prefix_plus_tail_bound:
      cauchyDiagnostic.shifted_function_prefix_plus_tail_majorant,
    candidate_M_R_finite_prefix:
      cauchyDiagnostic.y_derivative_finite_prefix_majorant,
    candidate_M_R_cauchy_tail_after_prefix_profile:
      cauchyDiagnostic.y_derivative_cauchy_tail_after_prefix_majorant,
    candidate_M_R_prefix_plus_tail_bound:
      cauchyDiagnostic.y_derivative_prefix_plus_tail_majorant,
    centerResidualRemainderProfile:
      cauchyDiagnostic.cauchy_tail_after_prefix_majorant,
    rootTangentNumeratorRemainderProfile:
      cauchyDiagnostic.y_derivative_cauchy_tail_after_prefix_majorant,
    cauchy_diagnostic: cauchyDiagnostic,
    candidate_bound_source:
      "shifted R43 retained prefix plus shifted R43 Cauchy tail",
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function computeH39AffineCenterShiftedR43SourceProfileCandidate({
  coefficients,
  affineCenterCertificate,
  targetRadius,
  r43ShiftedCauchyOuterBound = null,
  r43ShiftedCauchyOuterRadius = null,
} = {}) {
  if (!Array.isArray(coefficients) || coefficients.length === 0) {
    throw new Error("coefficients must be a nonempty coefficient list");
  }
  if (
    affineCenterCertificate?.leading_affine_center_zero_certified !== true ||
    affineCenterCertificate?.independent_interval_schur_products_used !== false
  ) {
    throw new Error(
      "affine-center shifted R43 source profile requires the certified leading affine-center zero and no Schur-product bound"
    );
  }
  const rho = assertFiniteNonnegativeNumber("targetRadius", targetRadius);
  const finitePrefix = computeCoefficientPrefixMajorant(coefficients, rho);
  const yDerivativeFinitePrefix = coefficients.reduce(
    (sum, coefficient, index) =>
      sum + index * intervalAbsUpper(coefficient) * rho ** index,
    0
  );
  const hasShiftedCauchyInputs = hasCompleteCauchyOuterPair(
    "affine-center shifted R43",
    r43ShiftedCauchyOuterBound,
    r43ShiftedCauchyOuterRadius,
    rho
  );
  const cauchyDiagnostic = hasShiftedCauchyInputs
    ? computeCauchyShiftedPrefixTailMajorant({
        coefficients,
        outerBound: r43ShiftedCauchyOuterBound,
        outerRadius: r43ShiftedCauchyOuterRadius,
        targetRadius: rho,
        shiftPower: 0,
      })
    : null;

  return {
    status:
      "h39-affine-center-shifted-r43-source-profile-candidate-emitted",
    evaluation_level: "candidate-affine-center-shifted-r43-source-profile",
    source_profile_kind: "affine-center-actual-replay-shifted-r43",
    r43_cauchy_tail_shift_power: 0,
    retained_shifted_prefix_order: coefficients.length - 1,
    target_radius: rho,
    shifted_outer_bound_supplied: hasShiftedCauchyInputs,
    outer_bound: cauchyDiagnostic?.outer_bound ?? null,
    outer_radius: cauchyDiagnostic?.outer_radius ?? null,
    q: cauchyDiagnostic?.q ?? null,
    candidate_E_R_finite_prefix: finitePrefix,
    candidate_E_R_finite_prefix_coefficient_source:
      "affine-center-actual-replay-leading-zero",
    candidate_E_R_cauchy_tail_after_prefix_profile:
      cauchyDiagnostic?.cauchy_tail_after_prefix_majorant ?? null,
    candidate_E_R_prefix_plus_tail_bound:
      cauchyDiagnostic?.shifted_function_prefix_plus_tail_majorant ?? null,
    candidate_M_R_finite_prefix: yDerivativeFinitePrefix,
    candidate_M_R_cauchy_tail_after_prefix_profile:
      cauchyDiagnostic?.y_derivative_cauchy_tail_after_prefix_majorant ??
      null,
    candidate_M_R_prefix_plus_tail_bound:
      cauchyDiagnostic?.y_derivative_prefix_plus_tail_majorant ?? null,
    centerResidualRemainderProfile:
      cauchyDiagnostic?.cauchy_tail_after_prefix_majorant ?? null,
    rootTangentNumeratorRemainderProfile:
      cauchyDiagnostic?.y_derivative_cauchy_tail_after_prefix_majorant ??
      null,
    cauchy_diagnostic: cauchyDiagnostic,
    affine_center_certificate: affineCenterCertificate,
    candidate_bound_source: hasShiftedCauchyInputs
      ? "affine-center actual replay prefix plus directed-rounded shifted R43 Cauchy tail"
      : "affine-center actual replay finite prefix only; shifted Cauchy tail missing",
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function computeH39R43SecondXKepsilonRemainderProfileCandidate({
  secondXKernelYPower =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .second_x_derivative_y_power,
  candidateMKContinuousMajorant = null,
  targetRadius = null,
  xRemainderRadius = null,
} = {}) {
  const resolvedPower = Number(secondXKernelYPower);
  if (!Number.isInteger(resolvedPower) || resolvedPower < 0) {
    throw new Error("secondXKernelYPower must be a nonnegative integer");
  }
  const hasKernelMajorant = Number.isFinite(
    Number(candidateMKContinuousMajorant)
  );
  const hasTargetRadius = isProvided(targetRadius);
  const hasXRemainderRadius = isProvided(xRemainderRadius);
  const canComputeERemainder =
    hasKernelMajorant && hasTargetRadius && hasXRemainderRadius;
  const resolvedTargetRadius = hasTargetRadius
    ? assertFiniteNonnegativeNumber("targetRadius", targetRadius)
    : null;
  const resolvedXRemainderRadius = hasXRemainderRadius
    ? assertFiniteNonnegativeNumber("xRemainderRadius", xRemainderRadius)
    : null;

  return {
    status:
      "h39-r43-second-x-y41-K-epsilon-remainder-profile-candidate-emitted",
    evaluation_level: "candidate-second-x-remainder-profile",
    identity: "partial_X^2 R43 = y^41 K_epsilon",
    second_x_kernel_y_power: resolvedPower,
    target_radius: resolvedTargetRadius,
    x_remainder_radius: resolvedXRemainderRadius,
    candidate_M_K_continuous_majorant: hasKernelMajorant
      ? Number(candidateMKContinuousMajorant)
      : null,
    candidate_E_R_second_x_remainder_profile: canComputeERemainder
      ? 0.5 *
        resolvedXRemainderRadius ** 2 *
        resolvedTargetRadius ** resolvedPower *
        Number(candidateMKContinuousMajorant)
      : null,
    candidate_M_R_second_x_remainder_profile: null,
    missing_second_x_y_derivative_majorant: true,
    missing_graph_centered_x_remainder_radius: !hasXRemainderRadius,
    included_in_candidate_E_R_prefix_plus_tail_bound: false,
    included_in_candidate_M_R_prefix_plus_tail_bound: false,
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function computeCauchyCoefficientPrefixMajorant({
  coefficients,
  outerBound,
  outerRadius,
  targetRadius,
} = {}) {
  const diagnostic = computeCauchyShiftedPrefixTailMajorant({
    coefficients,
    outerBound,
    outerRadius,
    targetRadius,
    shiftPower: 0,
  });
  return {
    status: "cauchy-coefficient-prefix-majorant-emitted",
    certificate_type: "cauchy-coefficient-prefix-geometric-tail-majorant",
    outer_bound: diagnostic.outer_bound,
    outer_radius: diagnostic.outer_radius,
    target_radius: diagnostic.target_radius,
    q: diagnostic.q,
    tail_ratio_bound: diagnostic.q,
    finite_prefix_order: diagnostic.finite_prefix_order,
    finite_prefix_majorant: diagnostic.finite_prefix_majorant,
    cauchy_tail_after_prefix_majorant:
      diagnostic.cauchy_tail_after_prefix_majorant,
    prefix_plus_tail_majorant:
      diagnostic.shifted_function_prefix_plus_tail_majorant,
    cauchy_diagnostic: diagnostic,
    proof_inequality:
      "sup_{|y|<=rho} |f(y)| <= finite prefix majorant + B q^(N+1)/(1-q)",
    predicates: {
      target_radius_inside_outer_radius:
        diagnostic.target_radius >= 0 &&
        diagnostic.target_radius < diagnostic.outer_radius,
      tail_ratio_strictly_below_one:
        diagnostic.q >= 0 && diagnostic.q < 1,
      finite_prefix_outward_rounded: true,
      cauchy_tail_outward_rounded: true,
      no_fixed_speed_window: true,
    },
    certifies_continuous_polydisc_primitives: false,
  };
}

export function buildCoordinateCauchyEnvelopeCertificate({
  coordinate,
  diagnostic,
  domainSignature = null,
  suppliedCoordinateMajorant = null,
} = {}) {
  const prefix = Number(diagnostic?.finite_prefix_majorant);
  const tail = Number(diagnostic?.cauchy_tail_after_prefix_majorant);
  const prefixPlusTail = Number(diagnostic?.prefix_plus_tail_majorant);
  const q = Number(diagnostic?.q ?? diagnostic?.tail_ratio_bound);
  const target = Number(diagnostic?.target_radius);
  const outer = Number(diagnostic?.outer_radius);
  const supplied = isProvided(suppliedCoordinateMajorant)
    ? Number(suppliedCoordinateMajorant)
    : prefixPlusTail;
  const checks = {
    diagnostic_status_valid:
      diagnostic?.status === "cauchy-coefficient-prefix-majorant-emitted",
    coordinate_label_present:
      coordinate !== null && coordinate !== undefined,
    domain_signature_present:
      domainSignature !== null && domainSignature !== undefined,
    target_radius_inside_outer_radius:
      Number.isFinite(target) && Number.isFinite(outer) && target >= 0 && target < outer,
    tail_ratio_strictly_below_one:
      Number.isFinite(q) && q >= 0 && q < 1,
    finite_prefix_nonnegative:
      Number.isFinite(prefix) && prefix >= 0,
    cauchy_tail_nonnegative:
      Number.isFinite(tail) && tail >= 0,
    prefix_plus_tail_covers_parts:
      Number.isFinite(prefixPlusTail) &&
      Number.isFinite(prefix) &&
      Number.isFinite(tail) &&
      prefixPlusTail >= prefix + tail,
    supplied_majorant_matches_envelope:
      Number.isFinite(supplied) && supplied === prefixPlusTail,
    no_fixed_speed_window: true,
  };
  const failedPredicates = Object.entries(checks)
    .filter(([, passes]) => passes !== true)
    .map(([key]) => key);
  const certifiesEnvelope = failedPredicates.length === 0;

  return {
    status: certifiesEnvelope
      ? "coordinate-cauchy-envelope-certified"
      : "coordinate-cauchy-envelope-open",
    certificate_type:
      "coordinate-cauchy-prefix-geometric-tail-upper-envelope",
    coordinate_label: coordinate ?? null,
    domain_signature: domainSignature,
    outer_bound: Number.isFinite(Number(diagnostic?.outer_bound))
      ? Number(diagnostic.outer_bound)
      : null,
    outer_radius: Number.isFinite(outer) ? outer : null,
    target_radius: Number.isFinite(target) ? target : null,
    tail_ratio_bound: Number.isFinite(q) ? q : null,
    finite_prefix_order: Number.isInteger(diagnostic?.finite_prefix_order)
      ? diagnostic.finite_prefix_order
      : null,
    finite_prefix_majorant: Number.isFinite(prefix) ? prefix : null,
    cauchy_tail_after_prefix_majorant: Number.isFinite(tail)
      ? tail
      : null,
    prefix_plus_tail_majorant: Number.isFinite(prefixPlusTail)
      ? prefixPlusTail
      : null,
    supplied_coordinate_majorant: Number.isFinite(supplied)
      ? supplied
      : null,
    proof_inequality:
      "sup_{|y|<=rho} |coordinate(y)| <= finite prefix majorant + B q^(N+1)/(1-q)",
    predicates: checks,
    failed_predicates: failedPredicates,
    certifies_coordinate_cauchy_envelope: certifiesEnvelope,
    assumes_fixed_speed_window: false,
  };
}

export function computeCauchyCoefficientPrefixFloor({
  coefficients,
  outerBound,
  outerRadius,
  targetRadius,
} = {}) {
  if (!Array.isArray(coefficients) || coefficients.length === 0) {
    throw new Error("coefficients must be a nonempty coefficient list");
  }
  const { bound, outer, target, q } = assertCauchyTailInputs({
    outerBound,
    outerRadius,
    targetRadius,
    shiftPower: 0,
  });
  const prefixOrder = coefficients.length - 1;
  const finitePrefixFloor = computeCoefficientPrefixFloor(coefficients, target);
  const tailAfterPrefixMajorant = computeCauchyTailMajorantForOrder({
    bound,
    outer,
    q,
    shift: 0,
    prefixOrder,
    tailKind: "function",
  });
  return {
    status: "cauchy-coefficient-prefix-floor-emitted",
    outer_bound: bound,
    outer_radius: outer,
    target_radius: target,
    q,
    finite_prefix_order: prefixOrder,
    finite_prefix_floor: finitePrefixFloor,
    cauchy_tail_after_prefix_majorant: tailAfterPrefixMajorant,
    prefix_plus_tail_floor: finitePrefixFloor - tailAfterPrefixMajorant,
    certifies_continuous_polydisc_primitives: false,
  };
}

export function computeH39JacobianAnalyticRemainderProfileCandidate({
  coefficients,
  outerBound,
  outerRadius,
  targetRadius,
} = {}) {
  const cauchyDiagnostic = computeCauchyCoefficientPrefixFloor({
    coefficients,
    outerBound,
    outerRadius,
    targetRadius,
  });
  return {
    status: "h39-jacobian-analytic-remainder-profile-candidate-emitted",
    evaluation_level: "candidate-cauchy-analytic-remainder-profile",
    outer_bound: cauchyDiagnostic.outer_bound,
    outer_radius: cauchyDiagnostic.outer_radius,
    target_radius: cauchyDiagnostic.target_radius,
    q: cauchyDiagnostic.q,
    retained_shifted_prefix_order: cauchyDiagnostic.finite_prefix_order,
    candidate_nu_J_finite_prefix:
      cauchyDiagnostic.finite_prefix_floor,
    candidate_nu_J_cauchy_tail_loss_profile:
      cauchyDiagnostic.cauchy_tail_after_prefix_majorant,
    candidate_nu_J_prefix_plus_tail_floor:
      cauchyDiagnostic.prefix_plus_tail_floor,
    centerJacobianLowerRemainderProfile:
      cauchyDiagnostic.cauchy_tail_after_prefix_majorant,
    cauchy_diagnostic: cauchyDiagnostic,
    candidate_bound_source:
      "R43 X-Jacobian retained floor plus explicit Jacobian Cauchy tail loss",
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function computeCauchyRemovableQuotientPrefixFloor({
  coefficients,
  outerBound,
  outerRadius,
  targetRadius,
} = {}) {
  if (!Array.isArray(coefficients) || coefficients.length === 0) {
    throw new Error("coefficients must be a nonempty coefficient list");
  }
  const { bound, outer, target, q } = assertCauchyTailInputs({
    outerBound,
    outerRadius,
    targetRadius,
    shiftPower: 1,
  });
  const prefixOrder = coefficients.length - 1;
  const finitePrefixFloor = computeCoefficientPrefixFloor(coefficients, target);
  const tailAfterPrefixMajorant =
    (bound / outer) * (q ** (prefixOrder + 1) / (1 - q));
  return {
    status: "cauchy-removable-quotient-prefix-floor-emitted",
    outer_bound: bound,
    outer_radius: outer,
    target_radius: target,
    q,
    finite_prefix_order: prefixOrder,
    finite_prefix_floor: finitePrefixFloor,
    removable_quotient_tail_after_prefix_majorant: tailAfterPrefixMajorant,
    removable_quotient_prefix_plus_tail_floor:
      finitePrefixFloor - tailAfterPrefixMajorant,
    certifies_continuous_polydisc_primitives: false,
  };
}

export function computeCauchyShiftedTailOrderForTarget({
  outerBound,
  outerRadius,
  targetRadius,
  shiftPower,
  tailTarget,
  tailKind = "function",
  maxPrefixOrder = 100000,
} = {}) {
  const { bound, outer, target, shift, q } = assertCauchyTailInputs({
    outerBound,
    outerRadius,
    targetRadius,
    shiftPower,
  });
  const resolvedTailTarget = Number(tailTarget);
  const resolvedMaxPrefixOrder = Number(maxPrefixOrder);
  if (!Number.isFinite(resolvedTailTarget) || resolvedTailTarget <= 0) {
    throw new Error("tailTarget must be a finite positive number");
  }
  if (
    !Number.isInteger(resolvedMaxPrefixOrder) ||
    resolvedMaxPrefixOrder < 0
  ) {
    throw new Error("maxPrefixOrder must be a nonnegative integer");
  }

  for (let prefixOrder = 0; prefixOrder <= resolvedMaxPrefixOrder; prefixOrder += 1) {
    const tailMajorant = computeCauchyTailMajorantForOrder({
      bound,
      outer,
      q,
      shift,
      prefixOrder,
      tailKind,
    });
    if (tailMajorant <= resolvedTailTarget) {
      return {
        status: "cauchy-shifted-tail-order-target-met",
        outer_bound: bound,
        outer_radius: outer,
        target_radius: target,
        shift_power: shift,
        q,
        tail_kind: tailKind,
        tail_target: resolvedTailTarget,
        required_prefix_order: prefixOrder,
        tail_majorant_at_required_prefix_order: tailMajorant,
        previous_tail_majorant:
          prefixOrder > 0
            ? computeCauchyTailMajorantForOrder({
                bound,
                outer,
                q,
                shift,
                prefixOrder: prefixOrder - 1,
                tailKind,
              })
            : null,
        certifies_continuous_polydisc_primitives: false,
      };
    }
  }

  return {
    status: "cauchy-shifted-tail-order-target-not-met",
    outer_bound: bound,
    outer_radius: outer,
    target_radius: target,
    shift_power: shift,
    q,
    tail_kind: tailKind,
    tail_target: resolvedTailTarget,
    max_prefix_order: resolvedMaxPrefixOrder,
    tail_majorant_at_max_prefix_order: computeCauchyTailMajorantForOrder({
      bound,
      outer,
      q,
      shift,
      prefixOrder: resolvedMaxPrefixOrder,
      tailKind,
    }),
    required_prefix_order: null,
    certifies_continuous_polydisc_primitives: false,
  };
}

export function computeCauchyShiftedTailOrderSensitivity({
  outerBounds,
  outerRadius,
  targetRadius,
  shiftPower,
  tailTarget,
  tailKind = "function",
  maxPrefixOrder = 100000,
} = {}) {
  if (!Array.isArray(outerBounds) || outerBounds.length === 0) {
    throw new Error("outerBounds must be a nonempty array");
  }
  const rows = outerBounds.map((outerBound) =>
    computeCauchyShiftedTailOrderForTarget({
      outerBound,
      outerRadius,
      targetRadius,
      shiftPower,
      tailTarget,
      tailKind,
      maxPrefixOrder,
    })
  );
  return {
    status: rows.every(
      (row) => row.status === "cauchy-shifted-tail-order-target-met"
    )
      ? "cauchy-shifted-tail-order-sensitivity-complete"
      : "cauchy-shifted-tail-order-sensitivity-incomplete",
    outer_radius: Number(outerRadius),
    target_radius: Number(targetRadius),
    shift_power: Number(shiftPower),
    tail_kind: tailKind,
    tail_target: Number(tailTarget),
    rows,
    certifies_continuous_polydisc_primitives: false,
  };
}

function coefficientEntryInterval(entry) {
  return numericInterval(Array.isArray(entry) ? entry[0] : entry?.coefficient);
}

function coefficientEntryPowers(entry) {
  const powers = Array.isArray(entry) ? entry[1] : entry?.powers;
  if (!Array.isArray(powers) || powers.length === 0) {
    throw new Error("coefficient entry powers must be a nonempty array");
  }
  return powers.map((power) => {
    if (!Number.isInteger(power) || power < 0) {
      throw new Error("coefficient entry powers must be nonnegative integers");
    }
    return power;
  });
}

function radiusWeight(powers, radii) {
  if (powers.length !== radii.length) {
    throw new Error("coefficient powers and radii must have the same length");
  }
  return powers.reduce(
    (weight, power, index) => weight * Number(radii[index]) ** power,
    1
  );
}

function assertRadii(radii) {
  if (
    !Array.isArray(radii) ||
    radii.length === 0 ||
    radii.some((radius) => !Number.isFinite(Number(radius)) || Number(radius) < 0)
  ) {
    throw new Error("radii must be a nonempty array of finite nonnegative numbers");
  }
}

export function computeMultivariateCoefficientPrefixMajorant(
  coefficientEntries,
  radii,
  { tailMajorant = 0 } = {}
) {
  if (!Array.isArray(coefficientEntries)) {
    throw new Error("coefficientEntries must be an array");
  }
  assertRadii(radii);
  const tail = Number(tailMajorant);
  if (!Number.isFinite(tail) || tail < 0) {
    throw new Error("tailMajorant must be a finite nonnegative number");
  }
  return (
    coefficientEntries.reduce((sum, entry) => {
      const powers = coefficientEntryPowers(entry);
      return (
        sum +
        intervalAbsUpper(coefficientEntryInterval(entry)) *
          radiusWeight(powers, radii)
      );
    }, 0) + tail
  );
}

export function computeMultivariateCoefficientPrefixFloor(
  coefficientEntries,
  radii,
  { tailMajorant = 0 } = {}
) {
  if (!Array.isArray(coefficientEntries) || coefficientEntries.length === 0) {
    throw new Error("coefficientEntries must be a nonempty array");
  }
  assertRadii(radii);
  const constantEntries = coefficientEntries.filter((entry) =>
    coefficientEntryPowers(entry).every((power) => power === 0)
  );
  if (constantEntries.length === 0) {
    throw new Error("coefficientEntries must include a constant entry");
  }
  const constantInterval = constantEntries.reduce(
    (sum, entry) => root.addIntervals(sum, coefficientEntryInterval(entry)),
    [0, 0]
  );
  const nonconstantEntries = coefficientEntries.filter((entry) =>
    coefficientEntryPowers(entry).some((power) => power !== 0)
  );
  return (
    intervalClearanceFromZero(constantInterval) -
    computeMultivariateCoefficientPrefixMajorant(nonconstantEntries, radii, {
      tailMajorant,
    })
  );
}

export function branchSeriesCoordinates({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign = branchSignValue(branch),
  hIntervals,
  xInterval = [0, 0],
} = {}) {
  assertCell(cell);
  if (!Array.isArray(hIntervals)) {
    throw new Error("hIntervals must be supplied");
  }

  const hWithX = hIntervalsWithX(hIntervals, xInterval);
  const delta = context.constant(cell.delta_fold_interval);
  delta[1] = root.scaleInterval(cell.beta_interval, branchSign);
  delta[2] = cell.gamma_interval;

  const phi = context.constant(cell.phi_fold_interval);
  phi[1] = root.scaleInterval(cell.beta_interval, -branchSign);
  phi[2] = root.scaleInterval(
    root.addIntervals(cell.gamma_interval, [2, 2]),
    -1
  );

  for (
    let index = 0;
    index < hWithX.length && index + 3 <= context.seriesOrder;
    index += 1
  ) {
    delta[index + 3] = hIntervalAt(hWithX, index);
    phi[index + 3] = root.scaleInterval(hIntervalAt(hWithX, index), -1);
  }

  return { delta, phi };
}

export function computeH39KernelContinuousMajorant({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign,
  hIntervals,
  xInterval = [0, 0],
  rho,
} = {}) {
  const resolvedRho = Number(rho);
  if (!Number.isFinite(resolvedRho) || resolvedRho < 0) {
    throw new Error("rho must be a finite nonnegative number");
  }
  const { delta, phi } = branchSeriesCoordinates({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval,
  });
  const deltaMajorant = computeSeriesCoordinateMajorant(delta, resolvedRho);
  const phiMajorant = computeSeriesCoordinateMajorant(phi, resolvedRho);
  const twiceInverseSpeedSquaredMajorant = intervalAbsUpper(
    root.scaleInterval(root.inverseSpeedSquaredInterval(cell.speed_interval), 2)
  );
  const sinDeltaEntireMajorant = root.nextUp(Math.sinh(deltaMajorant));
  const sinPhiEntireMajorant = root.nextUp(Math.sinh(phiMajorant));
  const candidateMKContinuousMajorant = root.nextUp(
    twiceInverseSpeedSquaredMajorant +
      sinDeltaEntireMajorant +
      sinPhiEntireMajorant
  );
  const yPower =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .second_x_derivative_y_power;
  const candidateLJReducedContinuousMajorant = root.nextUp(
    resolvedRho ** yPower * candidateMKContinuousMajorant
  );

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-kernel-continuous-elementary-majorant-emitted",
    evaluation_level: "elementary-continuous-majorant",
    branch: branch ?? branchSign,
    rho: resolvedRho,
    delta_coordinate_majorant: deltaMajorant,
    phi_coordinate_majorant: phiMajorant,
    R43_second_x_kernel_delta_coefficient_seminorm_rho:
      deltaMajorant,
    R43_second_x_kernel_phi_coefficient_seminorm_rho:
      phiMajorant,
    R43_second_x_kernel_speed_min: Number(cell.speed_interval[0]),
    twice_inverse_speed_squared_majorant: twiceInverseSpeedSquaredMajorant,
    R43_second_x_kernel_speed_term: twiceInverseSpeedSquaredMajorant,
    sin_delta_entire_majorant: sinDeltaEntireMajorant,
    sin_phi_entire_majorant: sinPhiEntireMajorant,
    R43_second_x_kernel_continuous_majorant_formula:
      "M_K <= 2/min(nu)^2 + sinh(||delta||_rho) + sinh(||phi||_rho)",
    candidate_M_K_continuous_elementary_majorant:
      candidateMKContinuousMajorant,
    R43_second_x_kernel_continuous_majorant:
      candidateMKContinuousMajorant,
    second_x_kernel_y_power: yPower,
    R43_jacobian_lipschitz_reduced_continuous_majorant_formula:
      "L_J^red <= rho^41 M_K",
    candidate_L_J_reduced_continuous_elementary_majorant:
      candidateLJReducedContinuousMajorant,
    R43_jacobian_lipschitz_reduced_continuous_majorant:
      candidateLJReducedContinuousMajorant,
    analytic_inequality:
      "|sin(z)| <= sinh(|z|), so sup|K_epsilon| <= 2/nu_min^2 + sinh(||delta||_rho) + sinh(||phi||_rho)",
    reduction:
      "sup|partial_X^2 R43| <= rho^41 * candidate_M_K_continuous_elementary_majorant",
    certifies_h39_primitive_closure: false,
  };
}

function positiveSpeedRatioLowerBound(cell) {
  const speedInterval = numericInterval(cell?.speed_interval);
  return speedInterval[0] > 0 ? speedInterval[0] : null;
}

function buildH39KepsilonBranchCoordinateWitnessClaimBoundary(certifiesBranch) {
  return {
    assumes_fixed_speed_window: false,
    computes_branch_coordinate_bounds: true,
    consumes_cauchy_coordinate_tails: true,
    certifies_directed_rounded_K_epsilon_branch_coordinate_witness:
      certifiesBranch,
    certifies_directed_rounded_K_epsilon_majorant: false,
    certifies_directed_rounded_L_J_component_witness: false,
    certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
      false,
    retained_branch: false,
    strongest_claim: certifiesBranch
      ? "Certifies only one same-domain h39 K_epsilon branch-coordinate witness; the M_K branch maximum and L_J subset remain downstream checks."
      : "Computes the h39 K_epsilon branch-coordinate witness fields and records which directed-rounded or analytic-tail predicate is still missing.",
  };
}

export function buildH39KepsilonBranchCoordinateWitness({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign = branchSignValue(branch),
  hIntervals,
  xInterval = [0, 0],
  rho,
  outerRadius = null,
  deltaOuterBound = null,
  phiOuterBound = null,
  sharedDomainSignature = null,
  directedRoundedCoordinateProvenance = false,
  outwardRoundedTranscendentalProvenance = false,
  useSinhTaylorEnvelope = true,
  sinhTaylorOptions = {},
} = {}) {
  const resolvedRho = Number(rho);
  if (!Number.isFinite(resolvedRho) || resolvedRho < 0) {
    throw new Error("rho must be a finite nonnegative number");
  }
  const { delta, phi } = branchSeriesCoordinates({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval,
  });
  const hasCauchyInputs =
    isProvided(outerRadius) &&
    isProvided(deltaOuterBound) &&
    isProvided(phiOuterBound);
  const deltaDiagnostic = hasCauchyInputs
    ? computeCauchyCoefficientPrefixMajorant({
        coefficients: delta,
        outerBound: deltaOuterBound,
        outerRadius,
        targetRadius: resolvedRho,
      })
    : null;
  const phiDiagnostic = hasCauchyInputs
    ? computeCauchyCoefficientPrefixMajorant({
        coefficients: phi,
        outerBound: phiOuterBound,
        outerRadius,
        targetRadius: resolvedRho,
      })
    : null;
  const deltaMajorant = hasCauchyInputs
    ? deltaDiagnostic.prefix_plus_tail_majorant
    : computeSeriesCoordinateMajorant(delta, resolvedRho);
  const phiMajorant = hasCauchyInputs
    ? phiDiagnostic.prefix_plus_tail_majorant
    : computeSeriesCoordinateMajorant(phi, resolvedRho);
  const deltaCoordinateCauchyEnvelope = hasCauchyInputs
    ? buildCoordinateCauchyEnvelopeCertificate({
        coordinate: "delta_epsilon",
        diagnostic: deltaDiagnostic,
        domainSignature: sharedDomainSignature,
        suppliedCoordinateMajorant: deltaMajorant,
      })
    : null;
  const phiCoordinateCauchyEnvelope = hasCauchyInputs
    ? buildCoordinateCauchyEnvelopeCertificate({
        coordinate: "phi_epsilon",
        diagnostic: phiDiagnostic,
        domainSignature: sharedDomainSignature,
        suppliedCoordinateMajorant: phiMajorant,
      })
    : null;
  const deltaCoordinateEnvelopeCertified =
    deltaCoordinateCauchyEnvelope
      ?.certifies_coordinate_cauchy_envelope === true;
  const phiCoordinateEnvelopeCertified =
    phiCoordinateCauchyEnvelope
      ?.certifies_coordinate_cauchy_envelope === true;
  const hasCertifiedCoordinateEnvelopes =
    deltaCoordinateEnvelopeCertified && phiCoordinateEnvelopeCertified;
  const nuLowerBound = positiveSpeedRatioLowerBound(cell);
  const speedTermUpper =
    nuLowerBound === null
      ? null
      : root.nextUp(2 / (nuLowerBound * nuLowerBound));
  const deltaSinhTaylorMajorant = useSinhTaylorEnvelope
    ? computeSinhTaylorMajorant({
        argument: deltaMajorant,
        ...sinhTaylorOptions,
      })
    : null;
  const phiSinhTaylorMajorant = useSinhTaylorEnvelope
    ? computeSinhTaylorMajorant({
        argument: phiMajorant,
        ...sinhTaylorOptions,
      })
    : null;
  const deltaSinhEnvelopeCertified =
    deltaSinhTaylorMajorant
      ?.certifies_outward_rounded_transcendental_upper_bound === true &&
    deltaSinhTaylorMajorant.predicates
      ?.tail_ratio_strictly_below_one === true &&
    Number(deltaSinhTaylorMajorant.argument_bound) >= deltaMajorant;
  const phiSinhEnvelopeCertified =
    phiSinhTaylorMajorant
      ?.certifies_outward_rounded_transcendental_upper_bound === true &&
    phiSinhTaylorMajorant.predicates
      ?.tail_ratio_strictly_below_one === true &&
    Number(phiSinhTaylorMajorant.argument_bound) >= phiMajorant;
  const sinhDeltaUpper =
    deltaSinhTaylorMajorant?.sinh_upper_majorant ??
    root.nextUp(Math.sinh(deltaMajorant));
  const sinhPhiUpper =
    phiSinhTaylorMajorant?.sinh_upper_majorant ??
    root.nextUp(Math.sinh(phiMajorant));
  const hasCertifiedSinhEnvelopes =
    deltaSinhEnvelopeCertified && phiSinhEnvelopeCertified;
  const transcendentalProvenanceSource = hasCertifiedSinhEnvelopes
    ? "sinh-positive-taylor-geometric-tail-upper-envelope"
    : outwardRoundedTranscendentalProvenance === true
      ? "external-outward-rounded-transcendental-claim-unaccepted-without-envelope"
      : null;
  const coordinateProvenanceSource = hasCertifiedCoordinateEnvelopes
    ? "coordinate-cauchy-prefix-geometric-tail-upper-envelope"
    : directedRoundedCoordinateProvenance === true
      ? "external-directed-rounded-coordinate-claim-unaccepted-without-envelope"
      : null;
  const branchMajorant =
    speedTermUpper === null
      ? null
      : root.nextUp(speedTermUpper + sinhDeltaUpper + sinhPhiUpper);
  const checks = {
    branch_label_present: branch !== null && branch !== undefined,
    shared_domain_signature_present:
      sharedDomainSignature !== null && sharedDomainSignature !== undefined,
    positive_speed_ratio_lower_bound: nuLowerBound !== null,
    coordinate_cauchy_tail_majorants_present: hasCauchyInputs,
    directed_rounded_coordinate_provenance:
      hasCertifiedCoordinateEnvelopes,
    delta_coordinate_cauchy_envelope_certified:
      deltaCoordinateEnvelopeCertified,
    phi_coordinate_cauchy_envelope_certified:
      phiCoordinateEnvelopeCertified,
    outward_rounded_transcendental_provenance:
      hasCertifiedSinhEnvelopes,
    delta_sinh_upper_envelope_certified: deltaSinhEnvelopeCertified,
    phi_sinh_upper_envelope_certified: phiSinhEnvelopeCertified,
  };
  const failedPredicates = Object.entries(checks)
    .filter(([, passes]) => passes !== true)
    .map(([key]) => key);
  const certifiesBranch =
    failedPredicates.length === 0 &&
    Number.isFinite(branchMajorant) &&
    Number.isFinite(deltaMajorant) &&
    Number.isFinite(phiMajorant);

  const branchCoordinateWitness = {
    branch: branch ?? branchSign,
    domain_signature: sharedDomainSignature,
    certifies_directed_rounded: certifiesBranch,
    directed_rounded: certifiesBranch,
    certificate_status: certifiesBranch
      ? "directed-rounded-certified"
      : "witness-required",
    nu_lower_bound: nuLowerBound,
    delta_abs_bound_D: deltaMajorant,
    phi_abs_bound_Phi: phiMajorant,
    speed_term_upper: speedTermUpper,
    delta_coordinate_cauchy_envelope: deltaCoordinateCauchyEnvelope,
    phi_coordinate_cauchy_envelope: phiCoordinateCauchyEnvelope,
    delta_coordinate_bound_source: deltaCoordinateCauchyEnvelope
      ? "coordinate-cauchy-prefix-geometric-tail-upper-envelope"
      : null,
    phi_coordinate_bound_source: phiCoordinateCauchyEnvelope
      ? "coordinate-cauchy-prefix-geometric-tail-upper-envelope"
      : null,
    sinh_delta_upper: sinhDeltaUpper,
    sinh_phi_upper: sinhPhiUpper,
    sinh_delta_taylor_majorant: deltaSinhTaylorMajorant,
    sinh_phi_taylor_majorant: phiSinhTaylorMajorant,
    sinh_delta_upper_source: deltaSinhTaylorMajorant
      ? "sinh-positive-taylor-geometric-tail-upper-envelope"
      : null,
    sinh_phi_upper_source: phiSinhTaylorMajorant
      ? "sinh-positive-taylor-geometric-tail-upper-envelope"
      : null,
    coordinate_bounds_same_domain: hasCertifiedCoordinateEnvelopes,
    outward_rounded_transcendentals: hasCertifiedSinhEnvelopes,
    includes_analytic_tail: hasCertifiedCoordinateEnvelopes,
    assumes_fixed_speed_window: false,
  };

  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_KEPSILON_BRANCH_COORDINATE_WITNESS_SCHEMA,
    packet_id:
      "theta3minus_fold_pair_first_y_gd_h39_K_epsilon_branch_coordinate_witness",
    promotion_status:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.promotion_status,
    witness_status: certifiesBranch
      ? "directed-rounded-same-domain-K_epsilon-branch-coordinate-witness-certified"
      : "open-K_epsilon-branch-coordinate-witness-unverified",
    branch: branch ?? branchSign,
    rho: resolvedRho,
    outer_radius: hasCauchyInputs ? Number(outerRadius) : null,
    shared_domain_signature: sharedDomainSignature,
    coordinate_diagnostics: {
      delta_coordinate_majorant: deltaMajorant,
      phi_coordinate_majorant: phiMajorant,
      delta_cauchy_diagnostic: deltaDiagnostic,
      phi_cauchy_diagnostic: phiDiagnostic,
      delta_coordinate_cauchy_envelope: deltaCoordinateCauchyEnvelope,
      phi_coordinate_cauchy_envelope: phiCoordinateCauchyEnvelope,
      coordinate_provenance_source: coordinateProvenanceSource,
      speed_ratio_lower_bound: nuLowerBound,
      speed_term_upper: speedTermUpper,
      sinh_delta_upper: sinhDeltaUpper,
      sinh_phi_upper: sinhPhiUpper,
      sinh_delta_taylor_majorant: deltaSinhTaylorMajorant,
      sinh_phi_taylor_majorant: phiSinhTaylorMajorant,
      transcendental_provenance_source: transcendentalProvenanceSource,
      branch_K_epsilon_majorant: branchMajorant,
    },
    predicate_check: {
      checks,
      failed_predicates: failedPredicates,
      certifies_K_epsilon_branch_coordinate_witness: certifiesBranch,
    },
    branch_coordinate_witness: branchCoordinateWitness,
    no_go_theorem: certifiesBranch
      ? null
      : {
          hypothesis:
            "The branch coordinate row supplies only finite coordinate seminorms or incomplete Cauchy/provenance inputs.",
          conclusion:
            "The branch cannot feed a directed-rounded K_epsilon majorant witness until the failed predicates list is empty on the same graph-centered signature.",
          promotion_obstruction:
            failedPredicates[0] ??
            "open-K_epsilon-branch-coordinate-witness-unverified",
        },
    conditional_theorem: {
      hypothesis:
        "Same-domain coordinate Cauchy envelopes give |delta_epsilon| <= D_epsilon and |phi_epsilon| <= Phi_epsilon, the speed interval gives nu >= nu_- > 0, and the sinh enclosures are supplied by positive Taylor series prefixes with geometric omitted-tail bounds.",
      conclusion:
        "The emitted branch witness supplies the fields needed for B_nu + sinh(D_epsilon) + sinh(Phi_epsilon) to contribute to the h39 K_epsilon majorant M_K.",
    },
    claim_boundary:
      buildH39KepsilonBranchCoordinateWitnessClaimBoundary(certifiesBranch),
    result: {
      theory_status: certifiesBranch
        ? "h39-K_epsilon-branch-coordinate-witness-certified"
        : "h39-K_epsilon-branch-coordinate-witness-open",
      h39_K_epsilon_branch_coordinate_witness: certifiesBranch,
      h39_K_epsilon_majorant_witness: false,
      h39_L_J_component_witness: false,
      h39_continuous_tail_certificate: false,
      retained_branch: false,
    },
  };
}

export function buildH39KepsilonBranchCoordinateWitnessSet({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branchInputs,
  rho,
  outerRadius = null,
  deltaOuterBound = null,
  phiOuterBound = null,
  sharedDomainSignature = null,
  directedRoundedCoordinateProvenance = false,
  outwardRoundedTranscendentalProvenance = false,
  useSinhTaylorEnvelope = true,
  sinhTaylorOptions = {},
} = {}) {
  if (!Array.isArray(branchInputs) || branchInputs.length !== 2) {
    throw new Error("branchInputs must contain the two fold-pair branches");
  }
  const branchPackets = branchInputs.map((input) =>
    buildH39KepsilonBranchCoordinateWitness({
      context,
      cell,
      branch: input.branch,
      branchSign: input.branchSign,
      hIntervals: input.hIntervals,
      xInterval: input.xInterval ?? [0, 0],
      rho,
      outerRadius,
      deltaOuterBound,
      phiOuterBound,
      sharedDomainSignature,
      directedRoundedCoordinateProvenance,
      outwardRoundedTranscendentalProvenance,
      useSinhTaylorEnvelope,
      sinhTaylorOptions,
    })
  );
  const failedPredicates = branchPackets.flatMap((packet) =>
    packet.predicate_check.failed_predicates.map(
      (predicate) => `${packet.branch}:${predicate}`
    )
  );
  const branchLabels = new Set(branchPackets.map((packet) => packet.branch));
  for (const requiredBranch of ["-", "+"]) {
    if (!branchLabels.has(requiredBranch)) {
      failedPredicates.push(`branch-cover-missing:${requiredBranch}`);
    }
  }
  for (const label of branchLabels) {
    if (!["-", "+"].includes(label)) {
      failedPredicates.push(`branch-cover-unrecognized:${label}`);
    }
  }
  const certifiesWitnessSet =
    branchPackets.length === 2 &&
    failedPredicates.length === 0 &&
    branchPackets.every(
      (packet) =>
        packet.result.h39_K_epsilon_branch_coordinate_witness === true
    );

  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_KEPSILON_BRANCH_COORDINATE_WITNESS_SCHEMA,
    packet_id:
      "theta3minus_fold_pair_first_y_gd_h39_K_epsilon_branch_coordinate_witness_set",
    promotion_status:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.promotion_status,
    witness_status: certifiesWitnessSet
      ? "directed-rounded-same-domain-K_epsilon-branch-coordinate-witness-set-certified"
      : "open-K_epsilon-branch-coordinate-witness-set-unverified",
    rho: Number(rho),
    outer_radius: isProvided(outerRadius) ? Number(outerRadius) : null,
    shared_domain_signature: sharedDomainSignature,
    branch_coordinate_witness_packets: branchPackets,
    branch_coordinate_witnesses: branchPackets.map(
      (packet) => packet.branch_coordinate_witness
    ),
    predicate_check: {
      branch_count: branchPackets.length,
      failed_predicates: failedPredicates,
      certifies_K_epsilon_branch_coordinate_witness_set:
        certifiesWitnessSet,
    },
    claim_boundary: {
      assumes_fixed_speed_window: false,
      certifies_directed_rounded_K_epsilon_branch_coordinate_witness_set:
        certifiesWitnessSet,
      certifies_directed_rounded_K_epsilon_majorant: false,
      certifies_directed_rounded_L_J_component_witness: false,
      certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
        false,
      retained_branch: false,
    },
    result: {
      theory_status: certifiesWitnessSet
        ? "h39-K_epsilon-branch-coordinate-witness-set-certified"
        : "h39-K_epsilon-branch-coordinate-witness-set-open",
      h39_K_epsilon_branch_coordinate_witness_set: certifiesWitnessSet,
      h39_K_epsilon_majorant_witness: false,
      h39_L_J_component_witness: false,
      h39_continuous_tail_certificate: false,
      retained_branch: false,
    },
  };
}

export function computeH39SourceResidualCoordinateOuterBoundCandidate({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign = branchSignValue(branch),
  hIntervals,
  xInterval = [0, 0],
  outerRadius,
  xOuterRadius = 0,
} = {}) {
  const resolvedOuterRadius = assertFinitePositiveNumber(
    "outerRadius",
    outerRadius
  );
  const resolvedXOuterRadius = assertFiniteNonnegativeNumber(
    "xOuterRadius",
    xOuterRadius
  );
  const xOuterInterval = expandInterval(xInterval, resolvedXOuterRadius);
  const { delta, phi } = branchSeriesCoordinates({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval: xOuterInterval,
  });
  const deltaMajorant = computeSeriesCoordinateMajorant(
    delta,
    resolvedOuterRadius
  );
  const phiMajorant = computeSeriesCoordinateMajorant(
    phi,
    resolvedOuterRadius
  );
  const inverseSpeedSquaredMajorant = intervalAbsUpper(
    root.inverseSpeedSquaredInterval(cell.speed_interval)
  );
  const deltaSinhTaylorMajorant = computeSinhTaylorMajorant({
    argument: deltaMajorant,
  });
  const phiSinhTaylorMajorant = computeSinhTaylorMajorant({
    argument: phiMajorant,
  });
  const sourceOuterBound = root.nextUp(
    inverseSpeedSquaredMajorant * deltaMajorant ** 2 +
      2 +
      deltaSinhTaylorMajorant.sinh_upper_majorant +
      phiSinhTaylorMajorant.sinh_upper_majorant
  );

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status:
      "h39-source-residual-coordinate-cauchy-outer-bound-candidate-emitted",
    evaluation_level: "candidate-coordinate-seminorm-cauchy-outer-bound",
    branch: branch ?? branchSign,
    outer_radius: resolvedOuterRadius,
    x_outer_radius: resolvedXOuterRadius,
    x_outer_interval: xOuterInterval,
    delta_coordinate_majorant_outer_radius: deltaMajorant,
    phi_coordinate_majorant_outer_radius: phiMajorant,
    inverse_speed_squared_majorant: inverseSpeedSquaredMajorant,
    sinh_delta_taylor_majorant: deltaSinhTaylorMajorant,
    sinh_phi_taylor_majorant: phiSinhTaylorMajorant,
    sinh_delta_upper: deltaSinhTaylorMajorant.sinh_upper_majorant,
    sinh_phi_upper: phiSinhTaylorMajorant.sinh_upper_majorant,
    outward_rounded_transcendental_provenance: true,
    source_residual_outer_bound_formula:
      "B_F^out = S_nu D^2 + 2 + S_delta + S_phi with certified sinh upper envelopes",
    candidate_R43_source_outer_bound: sourceOuterBound,
    r43_cauchy_outer_bound: sourceOuterBound,
    r43_cauchy_outer_radius: resolvedOuterRadius,
    r43_cauchy_tail_shift_power:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift,
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function computeH39ShiftedR43RemovableOuterBoundCandidate({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign = branchSignValue(branch),
  hIntervals,
  xInterval = [0, 0],
  outerBound,
  outerRadius,
  solveSlopeInterval = null,
  directedRoundedShiftedR43Provenance = false,
  certifiesShiftedR43ZeroPrefix = false,
  useAffineCenterR43Prefix = false,
} = {}) {
  const resolvedOuterBound = assertFiniteNonnegativeNumber(
    "outerBound",
    outerBound
  );
  const resolvedOuterRadius = assertFinitePositiveNumber(
    "outerRadius",
    outerRadius
  );
  const source = sourceEquationSeries({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval,
  });
  const shift =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift;
  const zeroPrefix = source.slice(0, shift);
  const rawShiftedCoefficients = source.slice(shift);
  const rawShiftedPrefixMajorant = computeCoefficientPrefixMajorant(
    rawShiftedCoefficients,
    resolvedOuterRadius
  );
  const affineCenterFormCandidate = useAffineCenterR43Prefix
    ? computeH39ShiftedR43AffineCenterFormCandidate({
        context,
        cell,
        branch,
        branchSign,
        hIntervals,
        xInterval,
        solveSlopeInterval,
        outerRadius: resolvedOuterRadius,
        shiftedOrder: rawShiftedCoefficients.length - 1,
      })
    : null;
  if (
    useAffineCenterR43Prefix &&
    affineCenterFormCandidate?.R43_affine_center_certificate
      ?.leading_affine_center_zero_certified !== true
  ) {
    throw new Error(
      "affine-center shifted R43 source bound requires a certified leading affine-center zero"
    );
  }
  const affineCenterShiftedCoefficients =
    affineCenterFormCandidate?.R43_affine_center_shifted_coefficients?.map(
      numericInterval
    ) ?? null;
  const shiftedCoefficients = useAffineCenterR43Prefix
    ? affineCenterShiftedCoefficients
    : rawShiftedCoefficients;
  const zeroPrefixContainsZero = zeroPrefix.every(
    ([left, right]) => left <= 0 && right >= 0
  );
  const zeroPrefixCertified =
    zeroPrefixContainsZero || certifiesShiftedR43ZeroPrefix === true;
  const shiftedPrefixMajorant = computeCoefficientPrefixMajorant(
    shiftedCoefficients,
    resolvedOuterRadius
  );
  const coversFinitePrefix =
    resolvedOuterBound >= shiftedPrefixMajorant ||
    numericClose(resolvedOuterBound, shiftedPrefixMajorant);
  if (directedRoundedShiftedR43Provenance !== true) {
    throw new Error(
      "shifted R43 source bound requires directedRoundedShiftedR43Provenance"
    );
  }
  if (!zeroPrefixCertified) {
    throw new Error(
      "shifted R43 source bound requires source zero-prefix certification through y^42"
    );
  }
  if (!coversFinitePrefix) {
    throw new Error(
      `shifted R43 source bound ${resolvedOuterBound} does not cover shifted coefficient prefix ${shiftedPrefixMajorant}`
    );
  }

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status:
      useAffineCenterR43Prefix
        ? "h39-affine-center-shifted-r43-removable-cauchy-outer-bound-candidate-emitted"
        : "h39-shifted-r43-removable-cauchy-outer-bound-candidate-emitted",
    evaluation_level:
      "candidate-shifted-removable-r43-cauchy-outer-bound",
    branch: branch ?? branchSign,
    source_envelope_kind: useAffineCenterR43Prefix
      ? "affine-center-shifted-removable-r43-cauchy-outer-bound"
      : "shifted-removable-r43-cauchy-outer-bound",
    r43_source_shift: shift,
    r43_cauchy_tail_shift_power: 0,
    outer_radius: resolvedOuterRadius,
    r43_cauchy_outer_radius: resolvedOuterRadius,
    shifted_R43_outer_radius: resolvedOuterRadius,
    r43_shifted_cauchy_outer_radius: resolvedOuterRadius,
    candidate_R43_source_outer_bound: resolvedOuterBound,
    r43_cauchy_outer_bound: resolvedOuterBound,
    shifted_R43_outer_bound: resolvedOuterBound,
    r43_shifted_cauchy_outer_bound: resolvedOuterBound,
    shifted_R43_finite_prefix_majorant_outer_radius:
      shiftedPrefixMajorant,
    raw_shifted_R43_finite_prefix_majorant_outer_radius:
      rawShiftedPrefixMajorant,
    affine_center_shifted_R43_finite_prefix_majorant_outer_radius:
      useAffineCenterR43Prefix ? shiftedPrefixMajorant : null,
    shifted_R43_prefix_bound_source: useAffineCenterR43Prefix
      ? "affine-center-actual-replay-leading-zero"
      : "center-interval-replay",
    shifted_R43_bound_covers_finite_prefix: coversFinitePrefix,
    source_zero_prefix_contains_zero: zeroPrefixContainsZero,
    source_zero_prefix_certified: zeroPrefixCertified,
    source_zero_prefix_certification_source: zeroPrefixContainsZero
      ? "coefficient-interval-zero-containment"
      : certifiesShiftedR43ZeroPrefix === true
        ? "external-directed-rounded-zero-prefix-certificate"
        : "missing-zero-prefix-certificate",
    source_zero_prefix_order: shift - 1,
    source_zero_prefix_witnesses: zeroPrefix.map(root.formatInterval),
    shifted_R43_coefficient_prefix_length: shiftedCoefficients.length,
    shifted_R43_coefficients: shiftedCoefficients.map(root.formatInterval),
    raw_shifted_R43_coefficients:
      rawShiftedCoefficients.map(root.formatInterval),
    R43_affine_center_certificate:
      affineCenterFormCandidate?.R43_affine_center_certificate ?? null,
    R43_affine_center_shifted_coefficients:
      affineCenterFormCandidate?.R43_affine_center_shifted_coefficients ??
      null,
    directed_rounded_shifted_R43_provenance:
      directedRoundedShiftedR43Provenance === true,
    outward_rounded_transcendental_provenance:
      directedRoundedShiftedR43Provenance === true,
    cancellation_certificate:
      "The source coefficients through y^42 contain zero, so the supplied outer bound is consumed as a direct bound for the removable shifted function R43=F/y^43 rather than as a raw F bound divided by R^43.",
    candidate_bound_source:
      useAffineCenterR43Prefix
        ? "direct shifted removable R43 Cauchy outer bound checked against affine-center actual replay with certified leading zero"
        : "direct shifted removable R43 Cauchy outer bound with zero-prefix cancellation witness",
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function computeH39JacobianCoordinateOuterBoundCandidate({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign = branchSignValue(branch),
  hIntervals,
  xInterval = [0, 0],
  numeratorOuterRadius,
  jacobianOuterRadius,
  xOuterRadius = 0,
} = {}) {
  const resolvedNumeratorOuterRadius = assertFinitePositiveNumber(
    "numeratorOuterRadius",
    numeratorOuterRadius
  );
  const resolvedJacobianOuterRadius = assertFinitePositiveNumber(
    "jacobianOuterRadius",
    jacobianOuterRadius
  );
  if (resolvedJacobianOuterRadius >= resolvedNumeratorOuterRadius) {
    throw new Error(
      "jacobianOuterRadius must be smaller than numeratorOuterRadius"
    );
  }
  const resolvedXOuterRadius = assertFiniteNonnegativeNumber(
    "xOuterRadius",
    xOuterRadius
  );
  const xOuterInterval = expandInterval(xInterval, resolvedXOuterRadius);
  const { delta, phi } = branchSeriesCoordinates({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval: xOuterInterval,
  });
  const deltaMajorant = computeSeriesCoordinateMajorant(
    delta,
    resolvedNumeratorOuterRadius
  );
  const phiMajorant = computeSeriesCoordinateMajorant(
    phi,
    resolvedNumeratorOuterRadius
  );
  const inverseSpeedSquaredMajorant = intervalAbsUpper(
    root.inverseSpeedSquaredInterval(cell.speed_interval)
  );
  const deltaSinhTaylorMajorant = computeSinhTaylorMajorant({
    argument: deltaMajorant,
  });
  const phiSinhTaylorMajorant = computeSinhTaylorMajorant({
    argument: phiMajorant,
  });
  const coshDeltaUpper = root.nextUp(
    1 + deltaSinhTaylorMajorant.sinh_upper_majorant
  );
  const coshPhiUpper = root.nextUp(
    1 + phiSinhTaylorMajorant.sinh_upper_majorant
  );
  const numeratorOuterBound = root.nextUp(
    2 * inverseSpeedSquaredMajorant * deltaMajorant +
      coshDeltaUpper +
      coshPhiUpper
  );
  const quotientGap =
    resolvedNumeratorOuterRadius - resolvedJacobianOuterRadius;
  const jacobianOuterBound = root.nextUp(numeratorOuterBound / quotientGap);

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-jacobian-coordinate-cauchy-outer-bound-candidate-emitted",
    evaluation_level: "candidate-coordinate-seminorm-cauchy-outer-bound",
    branch: branch ?? branchSign,
    jacobian_numerator_cauchy_outer_radius: resolvedNumeratorOuterRadius,
    jacobian_cauchy_outer_radius: resolvedJacobianOuterRadius,
    x_outer_radius: resolvedXOuterRadius,
    x_outer_interval: xOuterInterval,
    delta_coordinate_majorant_numerator_outer_radius: deltaMajorant,
    phi_coordinate_majorant_numerator_outer_radius: phiMajorant,
    inverse_speed_squared_majorant: inverseSpeedSquaredMajorant,
    sinh_delta_taylor_majorant: deltaSinhTaylorMajorant,
    sinh_phi_taylor_majorant: phiSinhTaylorMajorant,
    cosh_delta_upper: coshDeltaUpper,
    cosh_phi_upper: coshPhiUpper,
    cosh_upper_bound_source:
      "cosh(A) <= 1 + sinh(A) for A >= 0, with certified sinh upper envelope",
    outward_rounded_transcendental_provenance: true,
    jacobian_numerator_outer_bound_formula:
      "B_H = 2 S_nu D + C_delta + C_phi with C <= 1+sinh(A) certified by sinh envelopes",
    jacobian_outer_bound_formula: "B_J = B_H / (R_H - R_J)",
    removable_quotient_cauchy_gap: quotientGap,
    candidate_R43_jacobian_numerator_outer_bound: numeratorOuterBound,
    candidate_R43_jacobian_outer_bound: jacobianOuterBound,
    jacobian_cauchy_outer_bound: jacobianOuterBound,
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function computeH39CoordinateCauchyOuterBoundsProfileCandidate({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branchInputs,
  r43CauchyOuterRadius = null,
  r43ShiftedCauchyOuterBound = null,
  r43ShiftedCauchyOuterRadius = null,
  directedRoundedShiftedR43Provenance = false,
  certifiesShiftedR43ZeroPrefix = false,
  useAffineCenterR43Prefix = false,
  jacobianCauchyOuterRadius = null,
  jacobianNumeratorCauchyOuterRadius = null,
  xOuterRadius = 0,
} = {}) {
  if (!Array.isArray(branchInputs) || branchInputs.length === 0) {
    throw new Error("branchInputs must be a nonempty array");
  }
  const wantsRawR43OuterBound = isProvided(r43CauchyOuterRadius);
  const wantsShiftedR43OuterBound =
    isProvided(r43ShiftedCauchyOuterBound) ||
    isProvided(r43ShiftedCauchyOuterRadius);
  if (wantsRawR43OuterBound && wantsShiftedR43OuterBound) {
    throw new Error(
      "coordinate source envelope candidate must not mix raw F and shifted R43 source bounds"
    );
  }
  if (
    wantsShiftedR43OuterBound &&
    (!isProvided(r43ShiftedCauchyOuterBound) ||
      !isProvided(r43ShiftedCauchyOuterRadius))
  ) {
    throw new Error(
      "shifted R43 source inputs require both r43ShiftedCauchyOuterBound and r43ShiftedCauchyOuterRadius"
    );
  }
  const sourceResidualOuterBoundCandidates = wantsRawR43OuterBound
    ? branchInputs.map((input) =>
        computeH39SourceResidualCoordinateOuterBoundCandidate({
          context,
          cell,
          branch: input.branch,
          branchSign: input.branchSign,
          hIntervals: input.hIntervals,
          xInterval: input.xInterval ?? [0, 0],
          outerRadius: r43CauchyOuterRadius,
          xOuterRadius,
        })
      )
    : wantsShiftedR43OuterBound
      ? branchInputs.map((input) =>
          computeH39ShiftedR43RemovableOuterBoundCandidate({
            context,
            cell,
            branch: input.branch,
            branchSign: input.branchSign,
            hIntervals: input.hIntervals,
            xInterval: input.xInterval ?? [0, 0],
            outerBound: r43ShiftedCauchyOuterBound,
            outerRadius: r43ShiftedCauchyOuterRadius,
            solveSlopeInterval: input.solveSlopeInterval,
            directedRoundedShiftedR43Provenance,
            certifiesShiftedR43ZeroPrefix,
            useAffineCenterR43Prefix,
          })
        )
      : [];
  const wantsJacobianOuterBound =
    isProvided(jacobianCauchyOuterRadius) ||
    isProvided(jacobianNumeratorCauchyOuterRadius);
  if (
    wantsJacobianOuterBound &&
    (!isProvided(jacobianCauchyOuterRadius) ||
      !isProvided(jacobianNumeratorCauchyOuterRadius))
  ) {
    throw new Error(
      "coordinate Jacobian Cauchy inputs require both jacobianCauchyOuterRadius and jacobianNumeratorCauchyOuterRadius"
    );
  }
  const jacobianOuterBoundCandidates = wantsJacobianOuterBound
    ? branchInputs.map((input) =>
        computeH39JacobianCoordinateOuterBoundCandidate({
          context,
          cell,
          branch: input.branch,
          branchSign: input.branchSign,
          hIntervals: input.hIntervals,
          xInterval: input.xInterval ?? [0, 0],
          numeratorOuterRadius: jacobianNumeratorCauchyOuterRadius,
          jacobianOuterRadius: jacobianCauchyOuterRadius,
          xOuterRadius,
        })
      )
    : [];
  const sourceResidualOuterBound = finiteMax(
    sourceResidualOuterBoundCandidates.map(
      (candidate) => candidate.r43_cauchy_outer_bound
    )
  );
  const jacobianOuterBound = finiteMax(
    jacobianOuterBoundCandidates.map(
      (candidate) => candidate.jacobian_cauchy_outer_bound
    )
  );

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status:
      "h39-coordinate-cauchy-outer-bounds-profile-candidate-emitted",
    evaluation_level: "candidate-coordinate-seminorm-cauchy-outer-bound",
    source_envelope_kind: wantsShiftedR43OuterBound
      ? useAffineCenterR43Prefix
        ? "affine-center-shifted-removable-r43-cauchy-outer-bound"
        : "shifted-removable-r43-cauchy-outer-bound"
      : wantsRawR43OuterBound
        ? "raw-coordinate-cauchy-outer-bound"
        : null,
    r43_cauchy_tail_shift_power: wantsShiftedR43OuterBound
      ? 0
      : wantsRawR43OuterBound
        ? THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift
        : null,
    r43_cauchy_outer_radius: wantsShiftedR43OuterBound
      ? Number(r43ShiftedCauchyOuterRadius)
      : isProvided(r43CauchyOuterRadius)
        ? Number(r43CauchyOuterRadius)
        : null,
    r43_shifted_cauchy_outer_radius: wantsShiftedR43OuterBound
      ? Number(r43ShiftedCauchyOuterRadius)
      : null,
    candidate_R43_source_outer_bound: sourceResidualOuterBound,
    r43_cauchy_outer_bound: sourceResidualOuterBound,
    r43_shifted_cauchy_outer_bound: wantsShiftedR43OuterBound
      ? sourceResidualOuterBound
      : null,
    use_affine_center_r43_prefix:
      wantsShiftedR43OuterBound && useAffineCenterR43Prefix,
    jacobian_numerator_cauchy_outer_radius: wantsJacobianOuterBound
      ? Number(jacobianNumeratorCauchyOuterRadius)
      : null,
    jacobian_cauchy_outer_radius: wantsJacobianOuterBound
      ? Number(jacobianCauchyOuterRadius)
      : null,
    candidate_R43_jacobian_outer_bound: jacobianOuterBound,
    jacobian_cauchy_outer_bound: jacobianOuterBound,
    source_residual_outer_bound_candidates:
      sourceResidualOuterBoundCandidates,
    jacobian_outer_bound_candidates: jacobianOuterBoundCandidates,
    x_outer_radius: Number(xOuterRadius),
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

function computeH39CoordinateCauchyOuterBoundsProfileFromEnvelopeCandidates({
  context,
  cell,
  branchInputs,
  coordinateSourceEnvelopeCandidates,
  xOuterRadius = 0,
} = {}) {
  const failedCandidateObstructions = [];

  for (const candidate of coordinateSourceEnvelopeCandidates) {
    try {
      const profile = computeH39CoordinateCauchyOuterBoundsProfileCandidate({
        context,
        cell,
        branchInputs,
        r43CauchyOuterRadius: candidate.r43_cauchy_outer_radius,
        r43ShiftedCauchyOuterBound:
          candidate.r43_shifted_cauchy_outer_bound,
        r43ShiftedCauchyOuterRadius:
          candidate.r43_shifted_cauchy_outer_radius,
        directedRoundedShiftedR43Provenance:
          candidate.directed_rounded_shifted_r43_provenance,
        certifiesShiftedR43ZeroPrefix:
          candidate.certifies_shifted_r43_zero_prefix,
        useAffineCenterR43Prefix:
          candidate.use_affine_center_r43_prefix,
        jacobianCauchyOuterRadius: candidate.jacobian_cauchy_outer_radius,
        jacobianNumeratorCauchyOuterRadius:
          candidate.jacobian_numerator_cauchy_outer_radius,
        xOuterRadius,
      });

      return {
        ...profile,
        coordinate_source_envelope_selection: {
          status:
            failedCandidateObstructions.length === 0
              ? "coordinate-source-envelope-first-candidate-certified"
              : "coordinate-source-envelope-fallback-candidate-certified",
          candidate_count: coordinateSourceEnvelopeCandidates.length,
          selected_candidate_index: candidate.candidate_index,
          selected_candidate: candidate,
          failed_candidate_count: failedCandidateObstructions.length,
          failed_candidate_obstructions: failedCandidateObstructions,
        },
      };
    } catch (error) {
      failedCandidateObstructions.push({
        candidate_index: candidate.candidate_index,
        source_envelope_kind: candidate.source_envelope_kind,
        r43_cauchy_outer_radius: candidate.r43_cauchy_outer_radius,
        r43_shifted_cauchy_outer_bound:
          candidate.r43_shifted_cauchy_outer_bound,
        r43_shifted_cauchy_outer_radius:
          candidate.r43_shifted_cauchy_outer_radius,
        certifies_shifted_r43_zero_prefix:
          candidate.certifies_shifted_r43_zero_prefix,
        use_affine_center_r43_prefix:
          candidate.use_affine_center_r43_prefix,
        jacobian_cauchy_outer_radius: candidate.jacobian_cauchy_outer_radius,
        jacobian_numerator_cauchy_outer_radius:
          candidate.jacobian_numerator_cauchy_outer_radius,
        status: "open-source-certificate-computation-error",
        message: error.message,
      });
    }
  }

  const error = new Error(
    `no coordinate source envelope candidate certified: ${
      failedCandidateObstructions[0]?.message ?? "no candidates supplied"
    }`
  );
  error.coordinateSourceEnvelopeObstructions =
    failedCandidateObstructions;
  throw error;
}

export function computeBranchGDenominatorIngredientCandidate({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign = branchSignValue(branch),
  hIntervals,
  xInterval = [0, 0],
  rho,
  sourceCoefficientAbs = 1,
} = {}) {
  const resolvedRho = Number(rho);
  if (!Number.isFinite(resolvedRho) || resolvedRho < 0) {
    throw new Error("rho must be a finite nonnegative number");
  }
  const { delta, phi } = branchSeriesCoordinates({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval,
  });
  const deltaMajorant = computeSeriesCoordinateMajorant(delta, resolvedRho);
  const phiMajorant = computeSeriesCoordinateMajorant(phi, resolvedRho);
  const deltaSinhTaylorMajorant = computeSinhTaylorMajorant({
    argument: deltaMajorant,
  });
  const phiSinhTaylorMajorant = computeSinhTaylorMajorant({
    argument: phiMajorant,
  });
  const coshDeltaUpper = root.nextUp(
    1 + deltaSinhTaylorMajorant.sinh_upper_majorant
  );
  const coshPhiUpper = root.nextUp(
    1 + phiSinhTaylorMajorant.sinh_upper_majorant
  );
  const branchKernelMajorant = root.nextUp(
    0.5 * (coshDeltaUpper + coshPhiUpper)
  );
  const deltaClearanceFloor = computeCoefficientPrefixFloor(delta, resolvedRho);
  const fDelta = context.add(
    context.add(
      context.scaleByInterval(
        delta,
        root.scaleInterval(
          root.inverseSpeedSquaredInterval(cell.speed_interval),
          2
        )
      ),
      context.scale(context.cosSeries(phi), -1)
    ),
    context.cosSeries(delta)
  );
  const jacobian = context.zeros();
  for (let order = 0; order < context.seriesOrder; order += 1) {
    jacobian[order] = fDelta[order + 1];
  }
  const absJacobian = context.scale(jacobian, -branchSign);
  const jacobianAbsFloor = computeCoefficientPrefixFloor(
    absJacobian,
    resolvedRho
  );
  const speedLowerBound = Number(cell.speed_interval?.[0]);
  const canEmitBranchMajorant =
    speedLowerBound > 0 && deltaClearanceFloor > 0 && jacobianAbsFloor > 0;
  const branchGDenominatorClearanceMajorant = canEmitBranchMajorant
    ? computeBranchGDenominatorClearanceMajorant({
        kernelMajorant: branchKernelMajorant,
        speedLowerBound,
        deltaClearance: deltaClearanceFloor,
        jacobianClearance: jacobianAbsFloor,
        sourceCoefficientAbs,
      })
    : null;

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-branch-g-denominator-ingredient-candidate-emitted",
    evaluation_level: "candidate-coordinate-seminorm",
    branch: branch ?? branchSign,
    rho: resolvedRho,
    delta_coordinate_majorant: deltaMajorant,
    phi_coordinate_majorant: phiMajorant,
    branch_kernel_majorant: branchKernelMajorant,
    branch_kernel_majorant_formula:
      "K_epsilon <= 0.5*(C_delta+C_phi), C <= 1+sinh(A) certified by sinh envelopes",
    sinh_delta_taylor_majorant: deltaSinhTaylorMajorant,
    sinh_phi_taylor_majorant: phiSinhTaylorMajorant,
    cosh_delta_upper: coshDeltaUpper,
    cosh_phi_upper: coshPhiUpper,
    outward_rounded_transcendental_provenance: true,
    delta_clearance_floor: deltaClearanceFloor,
    jacobian_abs_floor: jacobianAbsFloor,
    speed_lower_bound: speedLowerBound,
    source_coefficient_abs: Number(sourceCoefficientAbs),
    branch_g_denominator_clearance_majorant:
      branchGDenominatorClearanceMajorant,
    branch_g_outer_majorant:
      branchGDenominatorClearanceMajorant?.branch_g_outer_majorant ?? null,
    candidate_denominator_clearance_status: canEmitBranchMajorant
      ? "candidate-denominator-clearance-positive"
      : "candidate-denominator-clearance-open",
    analytic_inequality:
      "|cos(z)| <= cosh(|z|), delta floor = dist(delta_0,0)-tail, and J_abs floor = dist(J_abs,0)-tail",
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function computeBranchGDenominatorCauchyIngredientCandidate({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign = branchSignValue(branch),
  hIntervals,
  xInterval = [0, 0],
  rho,
  outerRadius,
  deltaOuterBound,
  phiOuterBound,
  jacobianAbsOuterBound,
  sourceCoefficientAbs = 1,
} = {}) {
  const resolvedRho = Number(rho);
  if (!Number.isFinite(resolvedRho) || resolvedRho < 0) {
    throw new Error("rho must be a finite nonnegative number");
  }
  const sourceAbs = assertFiniteNonnegativeNumber(
    "sourceCoefficientAbs",
    sourceCoefficientAbs
  );
  const { delta, phi } = branchSeriesCoordinates({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval,
  });
  const deltaMajorantDiagnostic = computeCauchyCoefficientPrefixMajorant({
    coefficients: delta,
    outerBound: deltaOuterBound,
    outerRadius,
    targetRadius: resolvedRho,
  });
  const phiMajorantDiagnostic = computeCauchyCoefficientPrefixMajorant({
    coefficients: phi,
    outerBound: phiOuterBound,
    outerRadius,
    targetRadius: resolvedRho,
  });
  const deltaSinhTaylorMajorant = computeSinhTaylorMajorant({
    argument: deltaMajorantDiagnostic.prefix_plus_tail_majorant,
  });
  const phiSinhTaylorMajorant = computeSinhTaylorMajorant({
    argument: phiMajorantDiagnostic.prefix_plus_tail_majorant,
  });
  const coshDeltaUpper = root.nextUp(
    1 + deltaSinhTaylorMajorant.sinh_upper_majorant
  );
  const coshPhiUpper = root.nextUp(
    1 + phiSinhTaylorMajorant.sinh_upper_majorant
  );
  const branchKernelMajorant = root.nextUp(
    0.5 * (coshDeltaUpper + coshPhiUpper)
  );
  const deltaFloorDiagnostic = computeCauchyCoefficientPrefixFloor({
    coefficients: delta,
    outerBound: deltaOuterBound,
    outerRadius,
    targetRadius: resolvedRho,
  });
  const fDelta = context.add(
    context.add(
      context.scaleByInterval(
        delta,
        root.scaleInterval(
          root.inverseSpeedSquaredInterval(cell.speed_interval),
          2
        )
      ),
      context.scale(context.cosSeries(phi), -1)
    ),
    context.cosSeries(delta)
  );
  const jacobian = context.zeros();
  for (let order = 0; order < context.seriesOrder; order += 1) {
    jacobian[order] = fDelta[order + 1];
  }
  const absJacobian = context.scale(jacobian, -branchSign);
  const jacobianFloorDiagnostic = computeCauchyCoefficientPrefixFloor({
    coefficients: absJacobian,
    outerBound: jacobianAbsOuterBound,
    outerRadius,
    targetRadius: resolvedRho,
  });
  const speedLowerBound = Number(cell.speed_interval?.[0]);
  const deltaClearanceFloor =
    deltaFloorDiagnostic.prefix_plus_tail_floor;
  const jacobianAbsFloor =
    jacobianFloorDiagnostic.prefix_plus_tail_floor;
  const canEmitBranchMajorant =
    speedLowerBound > 0 && deltaClearanceFloor > 0 && jacobianAbsFloor > 0;
  const branchGDenominatorClearanceMajorant = canEmitBranchMajorant
    ? computeBranchGDenominatorClearanceMajorant({
        kernelMajorant: branchKernelMajorant,
        speedLowerBound,
        deltaClearance: deltaClearanceFloor,
        jacobianClearance: jacobianAbsFloor,
        sourceCoefficientAbs: sourceAbs,
      })
    : null;

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-branch-g-denominator-cauchy-ingredient-candidate-emitted",
    evaluation_level: "candidate-coordinate-prefix-cauchy-tail",
    branch: branch ?? branchSign,
    rho: resolvedRho,
    outer_radius: Number(outerRadius),
    q: deltaMajorantDiagnostic.q,
    delta_coordinate_prefix_plus_tail_majorant:
      deltaMajorantDiagnostic.prefix_plus_tail_majorant,
    phi_coordinate_prefix_plus_tail_majorant:
      phiMajorantDiagnostic.prefix_plus_tail_majorant,
    branch_kernel_majorant: branchKernelMajorant,
    branch_kernel_majorant_formula:
      "K_epsilon <= 0.5*(C_delta+C_phi), C <= 1+sinh(A) certified by sinh envelopes after coordinate Cauchy tails",
    sinh_delta_taylor_majorant: deltaSinhTaylorMajorant,
    sinh_phi_taylor_majorant: phiSinhTaylorMajorant,
    cosh_delta_upper: coshDeltaUpper,
    cosh_phi_upper: coshPhiUpper,
    outward_rounded_transcendental_provenance: true,
    delta_clearance_prefix_plus_tail_floor: deltaClearanceFloor,
    jacobian_abs_prefix_plus_tail_floor: jacobianAbsFloor,
    speed_lower_bound: speedLowerBound,
    source_coefficient_abs: sourceAbs,
    delta_coordinate_majorant_diagnostic: deltaMajorantDiagnostic,
    phi_coordinate_majorant_diagnostic: phiMajorantDiagnostic,
    delta_clearance_floor_diagnostic: deltaFloorDiagnostic,
    jacobian_abs_floor_diagnostic: jacobianFloorDiagnostic,
    branch_g_denominator_clearance_majorant:
      branchGDenominatorClearanceMajorant,
    branch_g_outer_majorant:
      branchGDenominatorClearanceMajorant?.branch_g_outer_majorant ?? null,
    candidate_denominator_clearance_status: canEmitBranchMajorant
      ? "candidate-denominator-clearance-positive"
      : "candidate-denominator-clearance-open",
    candidate_bound_source:
      "retained branch coefficient prefixes plus Cauchy tails from supplied shared-domain outer bounds",
    analytic_inequality:
      "Cauchy tail bounds close the coordinate seminorms and denominator floors before applying |cos(z)| <= cosh(|z|)",
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function computeH39DenominatorCauchyNGOuterBoundCandidate({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branchInputs,
  rho,
  outerRadius,
  deltaOuterBound,
  phiOuterBound,
  jacobianAbsOuterBound,
  lMajorant,
  lowerPolynomialMajorant,
  sourceCoefficientAbs = 1,
} = {}) {
  assertCell(cell);
  const requiredInputs = {
    rho,
    outerRadius,
    deltaOuterBound,
    phiOuterBound,
    jacobianAbsOuterBound,
    lMajorant,
    lowerPolynomialMajorant,
  };
  const missingInputs = Object.entries(requiredInputs)
    .filter(([, value]) => !isProvided(value))
    .map(([key]) => key);
  if (missingInputs.length > 0) {
    throw new Error(
      `complete denominator Cauchy inputs required: ${missingInputs.join(", ")}`
    );
  }
  if (!Array.isArray(branchInputs) || branchInputs.length === 0) {
    throw new Error("branchInputs must be a nonempty array");
  }
  const branchDenominatorCandidates = branchInputs.map((input) =>
    computeBranchGDenominatorCauchyIngredientCandidate({
      context,
      cell,
      branch: input.branch,
      branchSign: input.branchSign,
      hIntervals: input.hIntervals,
      xInterval: input.xInterval ?? [0, 0],
      rho,
      outerRadius,
      deltaOuterBound,
      phiOuterBound,
      jacobianAbsOuterBound,
      sourceCoefficientAbs,
    })
  );
  const branchGOuterMajorants = branchDenominatorCandidates.map(
    (candidate) => candidate.branch_g_outer_majorant
  );
  const canEmitNGOuterBound = branchGOuterMajorants.every((value) =>
    Number.isFinite(Number(value))
  );
  const nGOuterBoundDiagnostic = canEmitNGOuterBound
    ? computeNGOuterBoundFromDenominatorClearance({
        branchGOuterMajorants,
        lMajorant,
        lowerPolynomialMajorant,
        outerRadius,
      })
    : null;

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: canEmitNGOuterBound
      ? "h39-denominator-cauchy-n-g-outer-bound-candidate-emitted"
      : "h39-denominator-cauchy-n-g-outer-bound-candidate-open",
    evaluation_level:
      "candidate-branch-denominator-cauchy-n-g-outer-bound",
    rho: Number(rho),
    n_g_cauchy_outer_radius: Number(outerRadius),
    candidate_N_G_outer_bound: nGOuterBoundDiagnostic?.n_g_outer_bound ?? null,
    n_g_cauchy_outer_bound: nGOuterBoundDiagnostic?.n_g_outer_bound ?? null,
    branch_g_outer_majorants: branchGOuterMajorants,
    branch_denominator_candidates: branchDenominatorCandidates,
    l_majorant: nGOuterBoundDiagnostic?.l_majorant ?? Number(lMajorant),
    lower_polynomial_majorant:
      nGOuterBoundDiagnostic?.lower_polynomial_majorant ??
      Number(lowerPolynomialMajorant),
    n_g_outer_bound_diagnostic: nGOuterBoundDiagnostic,
    candidate_bound_source:
      "branch denominator Cauchy outer bounds plus L and lower-polynomial majorants",
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_h39_polydisc_M_G_bound: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

function primitiveCandidateNumber(value) {
  const resolved = Number(value);
  return Number.isFinite(resolved) ? resolved : null;
}

function providedPrimitiveCandidateNumber(value) {
  if (!isProvided(value)) {
    return null;
  }
  const resolved = Number(value);
  return Number.isFinite(resolved) ? resolved : null;
}

function optionalPrimitiveProfileNumber(name, value, fallback = 0) {
  if (!isProvided(value)) {
    return fallback;
  }
  return assertFiniteNonnegativeNumber(name, value);
}

function computeRoucheLowerBoundary({
  centerResidualBound,
  centerJacobianLowerBound,
  jacobianLipschitzBound,
}) {
  const residual = Number(centerResidualBound);
  const jacobianFloor = Number(centerJacobianLowerBound);
  const lipschitz = Number(jacobianLipschitzBound);
  if (
    !Number.isFinite(residual) ||
    residual < 0 ||
    !Number.isFinite(jacobianFloor) ||
    jacobianFloor <= 0 ||
    !Number.isFinite(lipschitz) ||
    lipschitz < 0
  ) {
    return {
      rouche_lower_boundary_status: "invalid-primitive-candidate",
      rouche_radius_discriminant: null,
      rouche_radius_lower_boundary: null,
    };
  }
  if (lipschitz === 0) {
    return {
      rouche_lower_boundary_status: "rouche-lower-boundary-computed",
      rouche_radius_discriminant: null,
      rouche_radius_lower_boundary: residual / jacobianFloor,
    };
  }
  const discriminant = jacobianFloor ** 2 - 2 * lipschitz * residual;
  if (!(discriminant > 0)) {
    return {
      rouche_lower_boundary_status: "rouche-discriminant-open",
      rouche_radius_discriminant: discriminant,
      rouche_radius_lower_boundary: null,
    };
  }
  return {
    rouche_lower_boundary_status: "rouche-lower-boundary-computed",
    rouche_radius_discriminant: discriminant,
    rouche_radius_lower_boundary:
      (2 * residual) / (jacobianFloor + Math.sqrt(discriminant)),
  };
}

export function computeH39FinitePrefixPrimitiveScalarReplay({
  candidate_E_R_finite_prefix,
  candidate_nu_J_finite_prefix,
  candidate_L_J_reduced_continuous_majorant,
  candidate_M_G_finite_prefix,
  candidate_M_R_finite_prefix,
  radiusMultiple =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .finite_prefix_scalar_replay_radius_multiple,
  rhoXMultiplier =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .finite_prefix_scalar_replay_rho_x_multiplier,
  rXFraction =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .finite_prefix_scalar_replay_r_x_fraction,
} = {}) {
  const primitiveCandidates = {
    center_residual_bound_E_R: primitiveCandidateNumber(
      candidate_E_R_finite_prefix
    ),
    center_jacobian_lower_bound_nu_J: primitiveCandidateNumber(
      candidate_nu_J_finite_prefix
    ),
    jacobian_lipschitz_bound_L_J: primitiveCandidateNumber(
      candidate_L_J_reduced_continuous_majorant
    ),
    candidate_M_G_bound: primitiveCandidateNumber(
      candidate_M_G_finite_prefix
    ),
    candidate_root_tangent_numerator_bound_M_R: primitiveCandidateNumber(
      candidate_M_R_finite_prefix
    ),
  };
  const missing = Object.entries(primitiveCandidates)
    .filter(([, value]) => value === null)
    .map(([key]) => key);
  if (missing.length > 0) {
    return {
      status: "h39-finite-prefix-primitive-scalar-replay-open",
      replay_status: "missing-finite-prefix-candidates",
      missing_finite_prefix_candidates: missing,
      candidate_primitive_bounds_status:
        "finite-prefix-plus-kernel-continuous-candidate-not-certificate",
      certifies_continuous_polydisc_primitives: false,
      certifies_directed_rounded_shared_domain: false,
      retained_branch: false,
    };
  }

  const lowerBoundary = computeRoucheLowerBoundary({
    centerResidualBound: primitiveCandidates.center_residual_bound_E_R,
    centerJacobianLowerBound:
      primitiveCandidates.center_jacobian_lower_bound_nu_J,
    jacobianLipschitzBound:
      primitiveCandidates.jacobian_lipschitz_bound_L_J,
  });
  if (lowerBoundary.rouche_radius_lower_boundary === null) {
    return {
      status: "h39-finite-prefix-primitive-scalar-replay-open",
      replay_status: lowerBoundary.rouche_lower_boundary_status,
      ...primitiveCandidates,
      ...lowerBoundary,
      candidate_primitive_bounds_status:
        "finite-prefix-plus-kernel-continuous-candidate-not-certificate",
      certifies_continuous_polydisc_primitives: false,
      certifies_directed_rounded_shared_domain: false,
      retained_branch: false,
    };
  }

  const resolvedRadiusMultiple = Number(radiusMultiple);
  const resolvedRhoXMultiplier = Number(rhoXMultiplier);
  const resolvedRXFraction = Number(rXFraction);
  if (
    !Number.isFinite(resolvedRadiusMultiple) ||
    resolvedRadiusMultiple <= 1 ||
    !Number.isFinite(resolvedRhoXMultiplier) ||
    resolvedRhoXMultiplier <= 1 ||
    !Number.isFinite(resolvedRXFraction) ||
    resolvedRXFraction <= 0 ||
    resolvedRXFraction >= 1
  ) {
    throw new Error(
      "radiusMultiple must exceed 1, rhoXMultiplier must exceed 1, and rXFraction must lie in (0,1)"
    );
  }

  const baseRadius =
    lowerBoundary.rouche_radius_lower_boundary > 0
      ? lowerBoundary.rouche_radius_lower_boundary
      : 1;
  const rhoX = resolvedRhoXMultiplier * baseRadius;
  const rX =
    lowerBoundary.rouche_radius_lower_boundary +
    resolvedRXFraction *
      (rhoX - lowerBoundary.rouche_radius_lower_boundary);
  const replay = computeH39RouchePrimitiveClosure({
    radiusMultiple: resolvedRadiusMultiple,
    mGBound: primitiveCandidates.candidate_M_G_bound,
    rootTangentNumeratorBound:
      primitiveCandidates.candidate_root_tangent_numerator_bound_M_R,
    centerResidualBound: primitiveCandidates.center_residual_bound_E_R,
    centerJacobianLowerBound:
      primitiveCandidates.center_jacobian_lower_bound_nu_J,
    jacobianLipschitzBound:
      primitiveCandidates.jacobian_lipschitz_bound_L_J,
    rhoX,
    rX,
  });
  const primitiveSlack = computeH39PrimitiveSlackTolerancesCandidate({
    radiusMultiple: resolvedRadiusMultiple,
    mGBound: primitiveCandidates.candidate_M_G_bound,
    rootTangentNumeratorBound:
      primitiveCandidates.candidate_root_tangent_numerator_bound_M_R,
    centerResidualBound: primitiveCandidates.center_residual_bound_E_R,
    centerJacobianLowerBound:
      primitiveCandidates.center_jacobian_lower_bound_nu_J,
    jacobianLipschitzBound:
      primitiveCandidates.jacobian_lipschitz_bound_L_J,
    rhoX,
    rX,
  });

  return {
    status: "h39-finite-prefix-primitive-scalar-replay-emitted",
    replay_status: replay.rouche_primitive_closure_status,
    candidate_primitive_bounds_status:
      "finite-prefix-plus-kernel-continuous-candidate-not-certificate",
    finite_prefix_scalar_replay_claim:
      "finite-prefix E_R, nu_J, M_G, and M_R plus kernel-reduced L_J pass the scalar Rouché-primitive algebra for the displayed X-radius policy; this is a feasibility replay, not a shared-domain primitive certificate",
    radius_multiple: resolvedRadiusMultiple,
    candidate_rho_X_policy:
      "rho_X = rhoXMultiplier * r_R^-; r_X = r_R^- + rXFraction*(rho_X-r_R^-)",
    candidate_rho_X_multiplier: resolvedRhoXMultiplier,
    candidate_r_X_fraction: resolvedRXFraction,
    candidate_rho_X: rhoX,
    candidate_r_X: rX,
    ...primitiveCandidates,
    ...lowerBoundary,
    candidate_scalar_replay_closes:
      replay.candidate_rouche_primitive_certificate_closes,
    candidate_rouche_primitive_closure_ratio:
      replay.candidate_rouche_primitive_closure_ratio,
    candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim:
      replay.candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim,
    candidate_rouche_primitive_h39_closure_ratio_margin_to_one:
      replay.candidate_rouche_primitive_h39_closure_ratio_margin_to_one,
    candidate_rouche_form_M_R_margin:
      replay.candidate_rouche_form_M_R_margin,
    candidate_primitive_slack_tolerances_status:
      primitiveSlack.primitive_slack_tolerances_status,
    candidate_primitive_slack_all_current_margins_positive:
      primitiveSlack.primitive_slack_all_current_margins_positive,
    candidate_primitive_slack_current_J_min_sigma_X:
      primitiveSlack.primitive_slack_current_J_min_sigma_X,
    candidate_primitive_slack_required_J_min_sigma_X_from_closure:
      primitiveSlack.primitive_slack_required_J_min_sigma_X_from_closure,
    candidate_primitive_slack_tolerances: primitiveSlack,
    derived_jacobian_lower_bound_J_min:
      primitiveCandidates.center_jacobian_lower_bound_nu_J -
      primitiveCandidates.jacobian_lipschitz_bound_L_J * rhoX,
    sigma_X: rhoX - rX,
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function computeH39FinitePrefixPrimitiveProfileScaleReplay({
  candidate_E_R_finite_prefix,
  candidate_nu_J_finite_prefix,
  candidate_L_J_finite_prefix,
  candidate_L_J_reduced_continuous_majorant,
  candidate_M_G_finite_prefix,
  candidate_M_R_finite_prefix,
  centerResidualRemainderProfile,
  centerJacobianLowerRemainderProfile,
  jacobianLipschitzRemainderProfile,
  rhoXLowerRemainderProfile,
  rhoXUpperRemainderProfile,
  rXLowerRemainderProfile,
  rXUpperRemainderProfile,
  mGRemainderProfile,
  rootTangentNumeratorRemainderProfile,
  radiusMultiple =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .finite_prefix_scalar_replay_radius_multiple,
  rhoXMultiplier =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .finite_prefix_scalar_replay_rho_x_multiplier,
  rXFraction =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .finite_prefix_scalar_replay_r_x_fraction,
  profileScaleUpperBound,
  profileScaleTolerance,
  profileScaleMaxIterations,
} = {}) {
  const profileVectorMissingComponents = [
    [centerResidualRemainderProfile, "E_R"],
    [rootTangentNumeratorRemainderProfile, "M_R"],
    [mGRemainderProfile, "M_G"],
    [centerJacobianLowerRemainderProfile, "nu_J"],
    [
      isProvided(jacobianLipschitzRemainderProfile) ||
      isProvided(candidate_L_J_reduced_continuous_majorant)
        ? 0
        : null,
      "L_J",
    ],
  ]
    .filter(([value]) => !isProvided(value))
    .map(([, component]) => component);
  const profileVectorComplete =
    profileVectorMissingComponents.length === 0;
  const primitiveCandidates = {
    center_residual_bound_E_R: primitiveCandidateNumber(
      candidate_E_R_finite_prefix
    ),
    center_jacobian_lower_bound_nu_J: primitiveCandidateNumber(
      candidate_nu_J_finite_prefix
    ),
    jacobian_lipschitz_bound_L_J: primitiveCandidateNumber(
      candidate_L_J_finite_prefix
    ),
    candidate_M_G_bound: primitiveCandidateNumber(
      candidate_M_G_finite_prefix
    ),
    candidate_root_tangent_numerator_bound_M_R: primitiveCandidateNumber(
      candidate_M_R_finite_prefix
    ),
  };
  const missing = Object.entries(primitiveCandidates)
    .filter(([, value]) => value === null)
    .map(([key]) => key);
  if (missing.length > 0) {
    return {
      status: "h39-finite-prefix-primitive-profile-scale-replay-open",
      replay_status: "missing-finite-prefix-candidates",
      missing_finite_prefix_candidates: missing,
      candidate_h39_full_cauchy_primitive_profile_vector_status:
        "h39-full-cauchy-primitive-profile-vector-candidate-incomplete",
      candidate_h39_full_cauchy_primitive_profile_vector_complete: false,
      candidate_h39_full_cauchy_primitive_profile_vector_missing_components:
        Array.from(new Set([...profileVectorMissingComponents, ...missing])),
      candidate_h39_full_cauchy_primitive_profile_vector_required_scale: 1,
      candidate_h39_full_cauchy_primitive_profile_vector_scale_candidate:
        null,
      candidate_h39_full_cauchy_primitive_profile_vector_scale_status:
        null,
      candidate_profile_bounds_status:
        "finite-prefix-plus-profile-candidate-not-certificate",
      certifies_continuous_polydisc_primitives: false,
      certifies_directed_rounded_shared_domain: false,
      retained_branch: false,
    };
  }

  const lowerBoundary = computeRoucheLowerBoundary({
    centerResidualBound: primitiveCandidates.center_residual_bound_E_R,
    centerJacobianLowerBound:
      primitiveCandidates.center_jacobian_lower_bound_nu_J,
    jacobianLipschitzBound:
      primitiveCandidates.jacobian_lipschitz_bound_L_J,
  });
  if (lowerBoundary.rouche_radius_lower_boundary === null) {
    return {
      status: "h39-finite-prefix-primitive-profile-scale-replay-open",
      replay_status: lowerBoundary.rouche_lower_boundary_status,
      ...primitiveCandidates,
      ...lowerBoundary,
      candidate_h39_full_cauchy_primitive_profile_vector_status:
        "h39-full-cauchy-primitive-profile-vector-candidate-incomplete",
      candidate_h39_full_cauchy_primitive_profile_vector_complete: false,
      candidate_h39_full_cauchy_primitive_profile_vector_missing_components:
        profileVectorMissingComponents,
      candidate_h39_full_cauchy_primitive_profile_vector_required_scale: 1,
      candidate_h39_full_cauchy_primitive_profile_vector_scale_candidate:
        null,
      candidate_h39_full_cauchy_primitive_profile_vector_scale_status:
        null,
      candidate_profile_bounds_status:
        "finite-prefix-plus-profile-candidate-not-certificate",
      certifies_continuous_polydisc_primitives: false,
      certifies_directed_rounded_shared_domain: false,
      retained_branch: false,
    };
  }

  const reducedLJ = primitiveCandidateNumber(
    candidate_L_J_reduced_continuous_majorant
  );
  const derivedLJProfile =
    reducedLJ === null
      ? 0
      : Math.max(
          0,
          reducedLJ - primitiveCandidates.jacobian_lipschitz_bound_L_J
        );
  const profile = {
    centerResidualRemainderProfile: optionalPrimitiveProfileNumber(
      "centerResidualRemainderProfile",
      centerResidualRemainderProfile
    ),
    centerJacobianLowerRemainderProfile: optionalPrimitiveProfileNumber(
      "centerJacobianLowerRemainderProfile",
      centerJacobianLowerRemainderProfile
    ),
    jacobianLipschitzRemainderProfile: optionalPrimitiveProfileNumber(
      "jacobianLipschitzRemainderProfile",
      jacobianLipschitzRemainderProfile,
      derivedLJProfile
    ),
    rhoXLowerRemainderProfile: optionalPrimitiveProfileNumber(
      "rhoXLowerRemainderProfile",
      rhoXLowerRemainderProfile
    ),
    rhoXUpperRemainderProfile: optionalPrimitiveProfileNumber(
      "rhoXUpperRemainderProfile",
      rhoXUpperRemainderProfile
    ),
    rXLowerRemainderProfile: optionalPrimitiveProfileNumber(
      "rXLowerRemainderProfile",
      rXLowerRemainderProfile
    ),
    rXUpperRemainderProfile: optionalPrimitiveProfileNumber(
      "rXUpperRemainderProfile",
      rXUpperRemainderProfile
    ),
    mGRemainderProfile: optionalPrimitiveProfileNumber(
      "mGRemainderProfile",
      mGRemainderProfile
    ),
    rootTangentNumeratorRemainderProfile:
      optionalPrimitiveProfileNumber(
        "rootTangentNumeratorRemainderProfile",
        rootTangentNumeratorRemainderProfile
      ),
  };

  const resolvedRadiusMultiple = Number(radiusMultiple);
  const resolvedRhoXMultiplier = Number(rhoXMultiplier);
  const resolvedRXFraction = Number(rXFraction);
  if (
    !Number.isFinite(resolvedRadiusMultiple) ||
    resolvedRadiusMultiple <= 1 ||
    !Number.isFinite(resolvedRhoXMultiplier) ||
    resolvedRhoXMultiplier <= 1 ||
    !Number.isFinite(resolvedRXFraction) ||
    resolvedRXFraction <= 0 ||
    resolvedRXFraction >= 1
  ) {
    throw new Error(
      "radiusMultiple must exceed 1, rhoXMultiplier must exceed 1, and rXFraction must lie in (0,1)"
    );
  }

  const baseRadius =
    lowerBoundary.rouche_radius_lower_boundary > 0
      ? lowerBoundary.rouche_radius_lower_boundary
      : 1;
  const rhoX = resolvedRhoXMultiplier * baseRadius;
  const rX =
    lowerBoundary.rouche_radius_lower_boundary +
    resolvedRXFraction *
      (rhoX - lowerBoundary.rouche_radius_lower_boundary);
  const profileScale = computeH39PrimitiveRemainderProfileScaleCandidate({
    radiusMultiple: resolvedRadiusMultiple,
    mGBound: primitiveCandidates.candidate_M_G_bound,
    rootTangentNumeratorBound:
      primitiveCandidates.candidate_root_tangent_numerator_bound_M_R,
    centerResidualBound: primitiveCandidates.center_residual_bound_E_R,
    centerJacobianLowerBound:
      primitiveCandidates.center_jacobian_lower_bound_nu_J,
    jacobianLipschitzBound:
      primitiveCandidates.jacobian_lipschitz_bound_L_J,
    rhoX,
    rX,
    ...profile,
    profileScaleUpperBound,
    profileScaleTolerance,
    profileScaleMaxIterations,
  });
  const scaleCandidate =
    profileScale.primitive_remainder_profile_scale_candidate;
  const exactBoundary =
    profileScale.primitive_remainder_profile_scale_exact_multi_profile_boundary ??
    null;
  const exactBoundaryStatus =
    exactBoundary
      ?.primitive_analytic_remainder_multi_profile_boundary_status ?? null;
  const exactBoundaryLambda =
    exactBoundary
      ?.primitive_analytic_remainder_multi_profile_lambda_supremum ?? null;
  const exactBoundaryFinite = Number.isFinite(exactBoundaryLambda);
  const exactBoundaryUnbounded =
    exactBoundaryStatus ===
      "h39-primitive-analytic-remainder-multi-profile-unbounded-for-zero-profile" ||
    exactBoundaryStatus ===
      "h39-primitive-analytic-remainder-multi-profile-unbounded";
  const exactBoundaryRequiredScale = 1;
  const exactBoundaryStrictHeadroom =
    exactBoundaryFinite
      ? exactBoundaryLambda - exactBoundaryRequiredScale
      : null;
  const exactBoundaryClosesRequiredScale = exactBoundaryFinite
    ? exactBoundaryStrictHeadroom > 0
    : exactBoundaryUnbounded
      ? true
      : null;
  const exactBoundaryNotApplicableReason =
    exactBoundaryStatus === "not-applicable-nonzero-graph-radius-profile"
      ? exactBoundaryStatus
      : null;
  const scaleRequiredCloses =
    profileScale.primitive_remainder_profile_scale_status ===
      "h39-primitive-remainder-profile-scale-unbounded-for-zero-profile" ||
    profileScale.primitive_remainder_profile_scale_closed_through_upper_bound ===
      true ||
    (Number.isFinite(scaleCandidate) && scaleCandidate >= 1);
  const positiveProfileComponents = Object.entries(profile)
    .filter(([, value]) => value > 0)
    .map(([key]) => key);
  const profileVectorStatus = !profileVectorComplete
    ? "h39-full-cauchy-primitive-profile-vector-candidate-incomplete"
    : scaleRequiredCloses
      ? "h39-full-cauchy-primitive-profile-vector-candidate-closes"
      : "h39-full-cauchy-primitive-profile-vector-candidate-scale-inequalities-open";

  return {
    status: "h39-finite-prefix-primitive-profile-scale-replay-emitted",
    replay_status: profileScale.primitive_remainder_profile_scale_status,
    candidate_profile_bounds_status:
      "finite-prefix-plus-profile-candidate-not-certificate",
    finite_prefix_profile_scale_claim:
      "finite-prefix primitive candidates plus a nonnegative analytic-remainder profile are replayed through the h39 safe-product profile scale; this is a profile budget contract, not a shared-domain primitive certificate",
    radius_multiple: resolvedRadiusMultiple,
    candidate_rho_X_policy:
      "rho_X = rhoXMultiplier * r_R^-; r_X = r_R^- + rXFraction*(rho_X-r_R^-)",
    candidate_rho_X_multiplier: resolvedRhoXMultiplier,
    candidate_r_X_fraction: resolvedRXFraction,
    candidate_rho_X: rhoX,
    candidate_r_X: rX,
    ...primitiveCandidates,
    ...lowerBoundary,
    center_residual_remainder_profile_E_R:
      profile.centerResidualRemainderProfile,
    center_jacobian_lower_remainder_profile_nu_J:
      profile.centerJacobianLowerRemainderProfile,
    jacobian_lipschitz_remainder_profile_L_J:
      profile.jacobianLipschitzRemainderProfile,
    rho_X_lower_remainder_profile:
      profile.rhoXLowerRemainderProfile,
    rho_X_upper_remainder_profile:
      profile.rhoXUpperRemainderProfile,
    r_X_lower_remainder_profile: profile.rXLowerRemainderProfile,
    r_X_upper_remainder_profile: profile.rXUpperRemainderProfile,
    M_G_remainder_profile: profile.mGRemainderProfile,
    M_R_remainder_profile:
      profile.rootTangentNumeratorRemainderProfile,
    candidate_L_J_reduced_continuous_majorant: reducedLJ,
    candidate_L_J_reduced_minus_finite_prefix_profile:
      derivedLJProfile,
    positive_profile_components: positiveProfileComponents,
    candidate_profile_direction_source:
      profile.jacobianLipschitzRemainderProfile === derivedLJProfile &&
      derivedLJProfile > 0 &&
      !isProvided(jacobianLipschitzRemainderProfile)
        ? "finite-prefix-to-kernel-reduced-L_J-continuous-majorant"
        : "explicit-or-zero-profile-components",
    candidate_profile_direction_complete_for_shared_domain_closure:
      profileVectorComplete,
    candidate_profile_known_L_J_continuous_remainder_only:
      positiveProfileComponents.length === 1 &&
      positiveProfileComponents[0] === "jacobianLipschitzRemainderProfile",
    candidate_h39_full_cauchy_primitive_profile_vector_status:
      profileVectorStatus,
    candidate_h39_full_cauchy_primitive_profile_vector_complete:
      profileVectorComplete,
    candidate_h39_full_cauchy_primitive_profile_vector_missing_components:
      profileVectorMissingComponents,
    candidate_h39_full_cauchy_primitive_profile_vector_required_scale: 1,
    candidate_h39_full_cauchy_primitive_profile_vector_scale_candidate:
      scaleCandidate,
    candidate_h39_full_cauchy_primitive_profile_vector_scale_status:
      profileScale.primitive_remainder_profile_scale_status,
    candidate_profile_scale_required_scale: 1,
    candidate_profile_scale_required_closes: scaleRequiredCloses,
    candidate_profile_scale_status:
      profileScale.primitive_remainder_profile_scale_status,
    candidate_profile_scale_candidate: scaleCandidate,
    candidate_profile_scale_first_failing_upper:
      profileScale.primitive_remainder_profile_scale_first_failing_upper,
    candidate_profile_scale_closed_through_upper_bound:
      profileScale.primitive_remainder_profile_scale_closed_through_upper_bound,
    candidate_profile_scale_limiting_margin_name:
      profileScale.primitive_remainder_profile_scale_limiting_margin_name,
    candidate_profile_scale_limiting_margin_value:
      profileScale.primitive_remainder_profile_scale_limiting_margin_value,
    candidate_profile_scale_exact_fixed_radii_lambda_supremum:
      exactBoundaryLambda,
    candidate_profile_scale_exact_fixed_radii_bottleneck_name:
      exactBoundary
        ?.primitive_analytic_remainder_multi_profile_bottleneck_name ?? null,
    candidate_profile_scale_exact_fixed_radii_required_scale:
      exactBoundaryRequiredScale,
    candidate_profile_scale_exact_fixed_radii_strict_headroom:
      exactBoundaryStrictHeadroom,
    candidate_profile_scale_exact_fixed_radii_closes_required_scale:
      exactBoundaryClosesRequiredScale,
    candidate_profile_scale_exact_fixed_radii_not_applicable_reason:
      exactBoundaryNotApplicableReason,
    candidate_profile_scale_exact_fixed_radii_J_min_at_required_scale:
      exactBoundary
        ?.primitive_analytic_remainder_multi_profile_J_min_at_required_scale ??
      null,
    candidate_profile_scale_exact_fixed_radii_rouche_margin_at_required_scale:
      exactBoundary
        ?.primitive_analytic_remainder_multi_profile_rouche_margin_at_required_scale ??
      null,
    candidate_profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale:
      exactBoundary
        ?.primitive_analytic_remainder_multi_profile_scalar_polynomial_at_required_scale ??
      null,
    candidate_profile_scale_exact_fixed_radii_required_scale_margin_closes:
      exactBoundary
        ?.primitive_analytic_remainder_multi_profile_required_scale_closes ??
      null,
    candidate_profile_scale_exact_fixed_radii_required_scale_failed_margin_names:
      exactBoundary
        ?.primitive_analytic_remainder_multi_profile_required_scale_failed_margin_names ??
      [],
    candidate_profile_scale_replay: profileScale,
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function computeH39FullCauchyPrimitiveVectorCandidate({
  candidate_E_R_prefix_plus_tail_bound,
  candidate_M_R_prefix_plus_tail_bound,
  candidate_M_G_prefix_plus_tail_bound,
  candidate_nu_J_prefix_plus_tail_floor,
  candidate_L_J_reduced_continuous_majorant,
  finitePrefixPrimitiveProfileScaleReplay = null,
  componentSources = {},
} = {}) {
  const components = {
    E_R: providedPrimitiveCandidateNumber(
      candidate_E_R_prefix_plus_tail_bound
    ),
    M_R: providedPrimitiveCandidateNumber(
      candidate_M_R_prefix_plus_tail_bound
    ),
    M_G: providedPrimitiveCandidateNumber(
      candidate_M_G_prefix_plus_tail_bound
    ),
    nu_J: providedPrimitiveCandidateNumber(
      candidate_nu_J_prefix_plus_tail_floor
    ),
    L_J: providedPrimitiveCandidateNumber(
      candidate_L_J_reduced_continuous_majorant
    ),
  };
  const missing = Object.entries(components)
    .filter(([, value]) => value === null)
    .map(([key]) => key);
  const complete = missing.length === 0;
  const invalidComponents = complete
    ? Object.entries(components)
        .filter(([key, value]) =>
          key === "nu_J" ? value <= 0 : value < 0
        )
        .map(([key]) => key)
    : [];
  const invalid = invalidComponents.length > 0;
  const replayStatus =
    finitePrefixPrimitiveProfileScaleReplay
      ?.candidate_h39_full_cauchy_primitive_profile_vector_status ??
    "h39-full-cauchy-primitive-profile-vector-candidate-incomplete";
  const status = !complete
    ? "h39-full-cauchy-primitive-vector-candidate-incomplete"
    : invalid
      ? "h39-full-cauchy-primitive-vector-candidate-invalid-jacobian-floor"
      : replayStatus ===
          "h39-full-cauchy-primitive-profile-vector-candidate-closes"
        ? "h39-full-cauchy-primitive-vector-candidate-closes"
        : "h39-full-cauchy-primitive-vector-candidate-scale-inequalities-open";
  const rhoX =
    finitePrefixPrimitiveProfileScaleReplay?.candidate_rho_X ?? null;
  const rX = finitePrefixPrimitiveProfileScaleReplay?.candidate_r_X ?? null;
  const radiusMultiple =
    finitePrefixPrimitiveProfileScaleReplay?.radius_multiple ?? null;

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status,
    evaluation_level:
      "candidate-full-cauchy-primitive-vector-backend",
    candidate_primitive_vector_claim:
      "packages candidate E_R, M_R, M_G, nu_J, and L_J values from one coefficient-domain Cauchy replay for downstream h39 primitive diagnostic input; this is not a directed-rounded shared-domain certificate",
    candidate_h39_full_cauchy_primitive_vector_complete: complete,
    candidate_h39_full_cauchy_primitive_vector_missing_components: missing,
    candidate_h39_full_cauchy_primitive_vector_invalid_components:
      invalidComponents,
    candidate_h39_full_cauchy_primitive_vector_components: components,
    candidate_primitive_vector_E_R_bound: components.E_R,
    candidate_primitive_vector_M_R_bound: components.M_R,
    candidate_primitive_vector_M_G_bound: components.M_G,
    candidate_primitive_vector_nu_J_floor: components.nu_J,
    candidate_primitive_vector_L_J_bound: components.L_J,
    candidate_primitive_vector_component_sources: {
      E_R: componentSources.E_R ?? null,
      M_R: componentSources.M_R ?? null,
      M_G: componentSources.M_G ?? null,
      nu_J: componentSources.nu_J ?? null,
      L_J: componentSources.L_J ?? null,
    },
    candidate_profile_replay_status:
      finitePrefixPrimitiveProfileScaleReplay?.candidate_profile_scale_status ??
      null,
    candidate_profile_scale_required_closes:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_required_closes ?? null,
    candidate_profile_scale_candidate:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_candidate ?? null,
    candidate_profile_scale_limiting_margin_name:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_limiting_margin_name ?? null,
    candidate_profile_scale_limiting_margin_value:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_limiting_margin_value ?? null,
    candidate_profile_scale_exact_fixed_radii_lambda_supremum:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_exact_fixed_radii_lambda_supremum ?? null,
    candidate_profile_scale_exact_fixed_radii_bottleneck_name:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_exact_fixed_radii_bottleneck_name ?? null,
    candidate_profile_scale_exact_fixed_radii_required_scale:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_exact_fixed_radii_required_scale ?? null,
    candidate_profile_scale_exact_fixed_radii_strict_headroom:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_exact_fixed_radii_strict_headroom ?? null,
    candidate_profile_scale_exact_fixed_radii_closes_required_scale:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_exact_fixed_radii_closes_required_scale ??
      null,
    candidate_profile_scale_exact_fixed_radii_not_applicable_reason:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_exact_fixed_radii_not_applicable_reason ??
      null,
    candidate_profile_scale_exact_fixed_radii_J_min_at_required_scale:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_exact_fixed_radii_J_min_at_required_scale ??
      null,
    candidate_profile_scale_exact_fixed_radii_rouche_margin_at_required_scale:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_exact_fixed_radii_rouche_margin_at_required_scale ??
      null,
    candidate_profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale ??
      null,
    candidate_profile_scale_exact_fixed_radii_required_scale_margin_closes:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_exact_fixed_radii_required_scale_margin_closes ??
      null,
    candidate_profile_scale_exact_fixed_radii_required_scale_failed_margin_names:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_exact_fixed_radii_required_scale_failed_margin_names ??
      [],
    primitive_diagnostic_input:
      complete && !invalid && Number.isFinite(rhoX) && Number.isFinite(rX)
        ? {
            center_residual_bound_E_R: components.E_R,
            center_jacobian_lower_bound_nu_J: components.nu_J,
            jacobian_lipschitz_bound_L_J: components.L_J,
            candidate_M_G_bound: components.M_G,
            candidate_root_tangent_numerator_bound_M_R: components.M_R,
            rho_X: rhoX,
            r_X: rX,
            radius_multiple: radiusMultiple,
            primitive_bounds_source:
              "h39-full-cauchy-primitive-vector-candidate",
            primitive_bounds_status: "provided-unverified",
          }
        : null,
    primitive_diagnostic_input_ready:
      complete && !invalid && Number.isFinite(rhoX) && Number.isFinite(rX),
    claim_boundary: {
      verifies_primitive_bounds_provenance: false,
      certifies_continuous_polydisc_primitives: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_directed_rounded_h39_polydisc_M_G_bound: false,
      certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound:
        false,
      certifies_directed_rounded_h39_jacobian_lower_bound: false,
      certifies_directed_rounded_h39_jacobian_lipschitz_bound: false,
      retained_branch: false,
    },
  };
}

function summaryValue(summary, cellField, aggregateField) {
  return summary?.[cellField] ?? summary?.[aggregateField] ?? null;
}

export function buildH39PrimitiveVectorBackendArtifactFromSummary(
  summary,
  {
    sourceSummaryKind = "h39-shared-domain-coefficient-summary",
    primitiveBoundsStatus = "provided-unverified",
  } = {}
) {
  const finitePrefixPrimitiveProfileScaleReplay =
    summary?.candidate_finite_prefix_primitive_profile_scale_replay ?? null;
  const vector = computeH39FullCauchyPrimitiveVectorCandidate({
    candidate_E_R_prefix_plus_tail_bound: summaryValue(
      summary,
      "candidate_E_R_prefix_plus_tail_bound",
      "max_candidate_E_R_prefix_plus_tail_bound"
    ),
    candidate_M_R_prefix_plus_tail_bound: summaryValue(
      summary,
      "candidate_M_R_prefix_plus_tail_bound",
      "max_candidate_M_R_prefix_plus_tail_bound"
    ),
    candidate_M_G_prefix_plus_tail_bound: summaryValue(
      summary,
      "candidate_M_G_prefix_plus_tail_bound",
      "max_candidate_M_G_prefix_plus_tail_bound"
    ),
    candidate_nu_J_prefix_plus_tail_floor: summaryValue(
      summary,
      "candidate_nu_J_prefix_plus_tail_floor",
      "min_candidate_nu_J_prefix_plus_tail_floor"
    ),
    candidate_L_J_reduced_continuous_majorant: summaryValue(
      summary,
      "candidate_L_J_reduced_continuous_majorant",
      "max_candidate_L_J_reduced_continuous_majorant"
    ),
    finitePrefixPrimitiveProfileScaleReplay,
    componentSources: {
      E_R: summary?.candidate_R43_outer_bound_source ?? null,
      M_R: summary?.candidate_R43_outer_bound_source ?? null,
      M_G: summary?.candidate_N_G_outer_bound_source ?? null,
      nu_J: summary?.candidate_nu_J_outer_bound_source ?? null,
      L_J: summary?.candidate_L_J_reduced_continuous_majorant_source ?? null,
    },
  });

  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_PRIMITIVE_VECTOR_BACKEND_ARTIFACT_SCHEMA,
    packet_id:
      "theta3minus_fold_pair_first_y_gd_h39_primitive_vector_backend_artifact",
    promotion_status:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.promotion_status,
    backend_scope: {
      source_summary_kind: sourceSummaryKind,
      candidate_only: true,
      primitive_bounds_status: primitiveBoundsStatus,
      shared_domain_requirement:
        "E_R, M_R, M_G, nu_J, and L_J must be certified by one directed-rounded graph-centered backend before this candidate vector can be promoted",
    },
    candidate_primitive_vector: {
      center_residual_bound_E_R:
        vector.candidate_primitive_vector_E_R_bound,
      candidate_root_tangent_numerator_bound_M_R:
        vector.candidate_primitive_vector_M_R_bound,
      candidate_M_G_bound: vector.candidate_primitive_vector_M_G_bound,
      center_jacobian_lower_bound_nu_J:
        vector.candidate_primitive_vector_nu_J_floor,
      jacobian_lipschitz_bound_L_J:
        vector.candidate_primitive_vector_L_J_bound,
    },
    missing_candidate_components:
      vector.candidate_h39_full_cauchy_primitive_vector_missing_components,
    invalid_candidate_components:
      vector.candidate_h39_full_cauchy_primitive_vector_invalid_components,
    profile_vector_backend_status: vector.status,
    profile_vector_status:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_h39_full_cauchy_primitive_profile_vector_status ??
      summary?.candidate_h39_full_cauchy_primitive_profile_vector_status ??
      null,
    profile_vector_complete:
      vector.candidate_h39_full_cauchy_primitive_vector_complete,
    replay_status:
      finitePrefixPrimitiveProfileScaleReplay?.replay_status ?? null,
    profile_scale_status:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_status ?? null,
    profile_scale_required_closes:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_required_closes ?? null,
    profile_scale_candidate:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_candidate ?? null,
    profile_scale_exact_fixed_radii_lambda_supremum:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_exact_fixed_radii_lambda_supremum ?? null,
    profile_scale_exact_fixed_radii_bottleneck_name:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_exact_fixed_radii_bottleneck_name ?? null,
    profile_scale_exact_fixed_radii_required_scale:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_exact_fixed_radii_required_scale ?? null,
    profile_scale_exact_fixed_radii_strict_headroom:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_exact_fixed_radii_strict_headroom ?? null,
    profile_scale_exact_fixed_radii_closes_required_scale:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_exact_fixed_radii_closes_required_scale ??
      null,
    profile_scale_exact_fixed_radii_not_applicable_reason:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_exact_fixed_radii_not_applicable_reason ??
      null,
    profile_scale_exact_fixed_radii_J_min_at_required_scale:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_exact_fixed_radii_J_min_at_required_scale ??
      null,
    profile_scale_exact_fixed_radii_rouche_margin_at_required_scale:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_exact_fixed_radii_rouche_margin_at_required_scale ??
      null,
    profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale ??
      null,
    profile_scale_exact_fixed_radii_required_scale_margin_closes:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_exact_fixed_radii_required_scale_margin_closes ??
      null,
    profile_scale_exact_fixed_radii_required_scale_failed_margin_names:
      finitePrefixPrimitiveProfileScaleReplay
        ?.candidate_profile_scale_exact_fixed_radii_required_scale_failed_margin_names ??
      [],
    primitive_diagnostic_input: vector.primitive_diagnostic_input,
    primitive_diagnostic_input_ready:
      vector.primitive_diagnostic_input_ready,
    source_vector_candidate: vector,
    claim_boundary: {
      constructs_h39_primitive_vector_backend_artifact: true,
      verifies_primitive_bounds_provenance: false,
      certifies_continuous_polydisc_primitives: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_directed_rounded_h39_polydisc_M_G_bound: false,
      certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound:
        false,
      certifies_directed_rounded_h39_jacobian_lower_bound: false,
      certifies_directed_rounded_h39_jacobian_lipschitz_bound: false,
      certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
        false,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_I1_regular_critical_exhaustion: false,
      retained_branch: false,
    },
    result: {
      theory_status: "h39-primitive-vector-backend-artifact-emitted",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The primitive vector backend packages candidate E_R, M_R, M_G, nu_J, and L_J values for h39 reducer input, but it does not certify directed-rounded shared-domain provenance.",
    },
  };
}

export function sourceEquationSeries({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign,
  hIntervals,
  xInterval = [0, 0],
} = {}) {
  return sourceEquationSeriesTermDecomposition({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval,
  }).source;
}

export function sourceEquationSeriesTermDecomposition({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign,
  hIntervals,
  xInterval = [0, 0],
} = {}) {
  const { delta, phi } = branchSeriesCoordinates({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval,
  });
  const inverseSpeedSquared = root.inverseSpeedSquaredInterval(
    cell.speed_interval
  );
  const deltaSquaredSpeed = context.scaleByInterval(
    context.power(delta, 2),
    inverseSpeedSquared
  );
  const constantMinusTwo = context.constant(-2);
  const sinDelta = context.sinSeries(delta);
  const sinPhi = context.sinSeries(phi);
  const source = context.add(
    context.add(
      deltaSquaredSpeed,
      constantMinusTwo
    ),
    context.add(sinPhi, sinDelta)
  );
  return {
    delta,
    phi,
    inverse_speed_squared_interval: root.formatInterval(inverseSpeedSquared),
    terms: {
      delta_squared_speed: deltaSquaredSpeed,
      constant_minus_two: constantMinusTwo,
      sin_phi: sinPhi,
      sin_delta: sinDelta,
    },
    source,
  };
}

function coefficientPressureEntries(coefficients, {
  outerRadius,
  sourceShift = 0,
  shiftPower = 0,
} = {}) {
  const resolvedOuterRadius = assertFiniteNonnegativeNumber(
    "outerRadius",
    outerRadius
  );
  return coefficients.map((coefficient, index) => {
    const radiusPower = index + shiftPower;
    const coefficientAbsUpper = intervalAbsUpper(coefficient);
    return {
      shifted_index: index,
      y_order: sourceShift + index,
      coefficient: root.formatInterval(coefficient),
      coefficient_abs_upper: coefficientAbsUpper,
      outer_radius: resolvedOuterRadius,
      radius_power: radiusPower,
      pressure_contribution:
        coefficientAbsUpper * resolvedOuterRadius ** radiusPower,
    };
  });
}

function splitIntervalUniform(interval, partitionCount) {
  const [left, right] = numericInterval(interval);
  const resolvedPartitionCount = Number(partitionCount);
  if (
    !Number.isInteger(resolvedPartitionCount) ||
    resolvedPartitionCount < 1
  ) {
    throw new Error("partitionCount must be a positive integer");
  }
  const width = (right - left) / resolvedPartitionCount;
  return Array.from({ length: resolvedPartitionCount }, (_, index) => [
    left + index * width,
    index === resolvedPartitionCount - 1
      ? right
      : left + (index + 1) * width,
  ]);
}

function intervalMidpoint(interval) {
  const [left, right] = numericInterval(interval);
  return left + (right - left) / 2;
}

function pointIntervalAtMidpoint(interval) {
  const midpoint = intervalMidpoint(interval);
  return [midpoint, midpoint];
}

function pointCellAtMidpoint(cell) {
  return {
    speed_interval: pointIntervalAtMidpoint(cell.speed_interval),
    delta_fold_interval: pointIntervalAtMidpoint(cell.delta_fold_interval),
    phi_fold_interval: pointIntervalAtMidpoint(cell.phi_fold_interval),
    beta_interval: pointIntervalAtMidpoint(cell.beta_interval),
    gamma_interval: pointIntervalAtMidpoint(cell.gamma_interval),
    L_interval: pointIntervalAtMidpoint(cell.L_interval),
  };
}

function pointIntervalsAtMidpoints(intervals) {
  return intervals.map(pointIntervalAtMidpoint);
}

function scaleIntervalAboutMidpoint(interval, widthScale) {
  const resolvedWidthScale = assertFiniteNonnegativeNumber(
    "widthScale",
    widthScale
  );
  const [left, right] = numericInterval(interval);
  const midpoint = left + (right - left) / 2;
  const halfWidth = ((right - left) / 2) * resolvedWidthScale;
  return [midpoint - halfWidth, midpoint + halfWidth];
}

function scaleIntervalsAboutMidpoints(intervals, widthScale) {
  return intervals.map((interval) =>
    scaleIntervalAboutMidpoint(interval, widthScale)
  );
}

function scaleSuffixIntervalsAboutMidpoints({
  intervals,
  widthScale,
  startIndex,
  endIndex,
}) {
  return intervals.map((interval, index) =>
    index >= startIndex && index <= endIndex
      ? scaleIntervalAboutMidpoint(interval, widthScale)
      : interval
  );
}

function sumPressure(entries) {
  return entries.reduce(
    (sum, entry) => sum + Number(entry.pressure_contribution),
    0
  );
}

function dominantPressureEntry(entries) {
  if (!Array.isArray(entries) || entries.length === 0) {
    return null;
  }
  return entries.reduce((best, entry) =>
    Number(entry.pressure_contribution) >
    Number(best.pressure_contribution)
      ? entry
      : best
  );
}

function pressureDiagnosticValue(diagnostic, field) {
  const value = Number(diagnostic?.[field]);
  return Number.isFinite(value) ? value : null;
}

function dominantPressureDiagnostic(diagnostics, field) {
  const finiteDiagnostics = diagnostics.filter(
    (diagnostic) => pressureDiagnosticValue(diagnostic, field) !== null
  );
  if (finiteDiagnostics.length === 0) {
    return null;
  }
  return finiteDiagnostics.reduce((best, diagnostic) =>
    pressureDiagnosticValue(diagnostic, field) >
    pressureDiagnosticValue(best, field)
      ? diagnostic
      : best
  );
}

function shiftedTermPressureByCoefficient({
  decomposed,
  sourceShift,
  shiftedIndex,
  outerRadius,
}) {
  const absoluteIndex = sourceShift + shiftedIndex;
  const sourceCoefficient = decomposed.source[absoluteIndex];
  const sourceCoefficientAbsUpper = intervalAbsUpper(sourceCoefficient);
  const sourcePressureContribution =
    sourceCoefficientAbsUpper * outerRadius ** shiftedIndex;
  const termPressures = Object.entries(decomposed.terms).map(
    ([term, series]) => {
      const termCoefficient = series[absoluteIndex];
      const coefficientAbsUpper = intervalAbsUpper(termCoefficient);
      return {
        term,
        coefficient: root.formatInterval(termCoefficient),
        coefficient_abs_upper: coefficientAbsUpper,
        pressure_contribution:
          coefficientAbsUpper * outerRadius ** shiftedIndex,
      };
    }
  );
  const termPressureSum = sumPressure(termPressures);
  return {
    shifted_index: shiftedIndex,
    y_order: absoluteIndex,
    source_coefficient: root.formatInterval(sourceCoefficient),
    source_coefficient_abs_upper: sourceCoefficientAbsUpper,
    source_pressure_contribution: sourcePressureContribution,
    term_pressure_sum: termPressureSum,
    term_triangle_over_source_pressure_ratio:
      sourcePressureContribution > 0
        ? termPressureSum / sourcePressureContribution
        : null,
    dominant_term: dominantPressureEntry(termPressures),
    terms: termPressures,
  };
}

export function computeH39ShiftedR43PressureDecompositionCandidate({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign = branchSignValue(branch),
  hIntervals,
  xInterval = [0, 0],
  solveSlopeInterval = null,
  outerRadius,
  shiftedOrder = 10,
} = {}) {
  const resolvedOuterRadius = assertFinitePositiveNumber(
    "outerRadius",
    outerRadius
  );
  if (!Number.isInteger(shiftedOrder) || shiftedOrder < 0) {
    throw new Error("shiftedOrder must be a nonnegative integer");
  }
  const shift =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift;
  if (shift + shiftedOrder > context.seriesOrder) {
    throw new Error(
      "seriesOrder is too small for the requested shifted R43 pressure decomposition"
    );
  }

  const decomposed = sourceEquationSeriesTermDecomposition({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval,
  });
  const shiftedCoefficients = Array.from(
    { length: shiftedOrder + 1 },
    (_, index) => decomposed.source[shift + index]
  );
  const shiftedCoefficientPressure = coefficientPressureEntries(
    shiftedCoefficients,
    {
      outerRadius: resolvedOuterRadius,
      sourceShift: shift,
    }
  );
  const sourceAtZero = sourceEquationSeries({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval: [0, 0],
  });
  const sourceAtOne = sourceEquationSeries({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval: [1, 1],
  });
  const leadingRecomputedSlope = root.subtractIntervals(
    sourceAtOne[shift],
    sourceAtZero[shift]
  );
  const leadingSlope = isProvided(solveSlopeInterval)
    ? numericInterval(solveSlopeInterval)
    : leadingRecomputedSlope;
  const leadingSourceAtZero = sourceAtZero[shift];
  const affineDependenceValidThroughShiftedIndex =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .second_x_derivative_y_power - 1;
  const affineDependenceValidThroughRequestedOrder =
    shiftedOrder <= affineDependenceValidThroughShiftedIndex;
  const centerEliminatedShiftedCoefficients = shiftedCoefficients.map(
    (_, index) => {
      if (index === 0) {
        return [0, 0];
      }
      const coefficientAtZero = sourceAtZero[shift + index];
      const coefficientSlope = root.subtractIntervals(
        sourceAtOne[shift + index],
        sourceAtZero[shift + index]
      );
      return root.divideIntervals(
        root.subtractIntervals(
          root.multiplyIntervals(leadingSlope, coefficientAtZero),
          root.multiplyIntervals(coefficientSlope, leadingSourceAtZero)
        ),
        leadingSlope
      );
    }
  );
  const centerEliminatedPressure = coefficientPressureEntries(
    centerEliminatedShiftedCoefficients,
    {
      outerRadius: resolvedOuterRadius,
      sourceShift: shift,
    }
  );
  const termPressureByCoefficient = shiftedCoefficients.map((coefficient, index) => {
    const termPressures = Object.entries(decomposed.terms).map(
      ([term, series]) => {
        const termCoefficient = series[shift + index];
        const coefficientAbsUpper = intervalAbsUpper(termCoefficient);
        return {
          term,
          coefficient: root.formatInterval(termCoefficient),
          coefficient_abs_upper: coefficientAbsUpper,
          pressure_contribution:
            coefficientAbsUpper * resolvedOuterRadius ** index,
        };
      }
    );
    const dominantTerm = dominantPressureEntry(termPressures);
    const totalPressure =
      shiftedCoefficientPressure[index].pressure_contribution;
    const termPressureSum = sumPressure(termPressures);
    return {
      shifted_index: index,
      y_order: shift + index,
      source_coefficient: root.formatInterval(coefficient),
      source_pressure_contribution: totalPressure,
      term_pressure_sum: termPressureSum,
      term_triangle_over_source_pressure_ratio:
        totalPressure > 0 ? termPressureSum / totalPressure : null,
      dominant_term: dominantTerm,
      terms: termPressures,
    };
  });
  const unreducedPrefixMajorant = sumPressure(shiftedCoefficientPressure);
  const centerEliminatedPrefixMajorant = sumPressure(
    centerEliminatedPressure
  );
  const centerEliminationReducesPressure =
    centerEliminatedPrefixMajorant <= unreducedPrefixMajorant ||
    numericClose(centerEliminatedPrefixMajorant, unreducedPrefixMajorant);
  const dominantUnreduced = dominantPressureEntry(shiftedCoefficientPressure);
  const dominantCenterEliminated =
    dominantPressureEntry(centerEliminatedPressure);
  const leadingIntervalContainsZero =
    shiftedCoefficients[0][0] <= 0 && shiftedCoefficients[0][1] >= 0;

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-shifted-r43-pressure-decomposition-candidate-emitted",
    evaluation_level: "diagnostic-coefficient-normal-form",
    branch: branch ?? branchSign,
    x_interval: root.formatInterval(numericInterval(xInterval)),
    r43_source_shift: shift,
    shifted_order: shiftedOrder,
    outer_radius: resolvedOuterRadius,
    affine_dependence_valid_through_shifted_index:
      affineDependenceValidThroughShiftedIndex,
    affine_dependence_valid_through_requested_order:
      affineDependenceValidThroughRequestedOrder,
    leading_affine_identity:
      "For shifted indices k <= 40, R43_k(X)=C_k+S_k X because partial_X^2 R43 starts at shifted index 41.",
    center_eliminated_affine_formula:
      "A_0=0 and A_k=(S_0 C_k - S_k C_0)/S_0 for k>=1, preserving the h39 center-solve correlation X_c=-C_0/S_0.",
    leading_source_at_zero: root.formatInterval(leadingSourceAtZero),
    leading_recomputed_slope: root.formatInterval(leadingRecomputedSlope),
    leading_slope_used: root.formatInterval(leadingSlope),
    leading_slope_source: isProvided(solveSlopeInterval)
      ? "inherited-formal-recurrence-slope"
      : "recomputed-interval-series-slope",
    leading_centered_coefficient: root.formatInterval(shiftedCoefficients[0]),
    leading_centered_coefficient_contains_zero: leadingIntervalContainsZero,
    unreduced_shifted_prefix_majorant_outer_radius:
      unreducedPrefixMajorant,
    center_eliminated_shifted_prefix_majorant_outer_radius:
      centerEliminatedPrefixMajorant,
    center_elimination_improvement_factor:
      centerEliminatedPrefixMajorant > 0
        ? unreducedPrefixMajorant / centerEliminatedPrefixMajorant
        : null,
    center_elimination_reduces_pressure:
      centerEliminationReducesPressure,
    center_elimination_interval_warning:
      centerEliminationReducesPressure
        ? null
        : "independent interval products in the affine elimination increase the pressure; the certificate must preserve C_k,S_k,C_0,S_0 correlations symbolically or by certified subdivision",
    dominant_unreduced_shifted_pressure: dominantUnreduced,
    dominant_center_eliminated_shifted_pressure:
      dominantCenterEliminated,
    shifted_coefficient_pressures: shiftedCoefficientPressure,
    center_eliminated_shifted_coefficients:
      centerEliminatedShiftedCoefficients.map(root.formatInterval),
    center_eliminated_shifted_pressures: centerEliminatedPressure,
    term_pressure_by_coefficient: termPressureByCoefficient,
    pressure_interpretation:
      dominantUnreduced?.shifted_index === 0 &&
      leadingIntervalContainsZero
        ? "dominant pressure is the solved leading affine coefficient; this is a center-correlation loss in the interval replay, not evidence of a nonzero leading source term"
        : "dominant pressure is not confined to the solved leading coefficient; inspect the term and center-eliminated rows before claiming a center-correlation artifact",
    candidate_certificate_route:
      "Replace absolute-X shifted-prefix replay with a graph-centered affine center-elimination certificate for shifted indices below 41, preserving C_k,S_k,C_0,S_0 correlations symbolically or by certified subdivision, then bound the remaining center-eliminated coefficients and the y^41 second-X remainder on the same domain.",
    certifies_shifted_R43_outer_bound: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function computeH39AffineCenterRowCorrelationDiagnosticCandidate({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign = branchSignValue(branch),
  hIntervals,
  xInterval,
  solveSlopeInterval = null,
  outerRadius,
  shiftedIndex = 1,
  partitionCount = 2,
} = {}) {
  const resolvedOuterRadius = assertFinitePositiveNumber(
    "outerRadius",
    outerRadius
  );
  const resolvedShiftedIndex = Number(shiftedIndex);
  if (!Number.isInteger(resolvedShiftedIndex) || resolvedShiftedIndex < 1) {
    throw new Error("shiftedIndex must be a positive integer");
  }
  const shift =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift;
  if (shift + resolvedShiftedIndex > context.seriesOrder) {
    throw new Error(
      "seriesOrder is too small for the requested affine-center row diagnostic"
    );
  }
  const affineDependenceValidThroughShiftedIndex =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .second_x_derivative_y_power - 1;
  const affineDependenceValidForRow =
    resolvedShiftedIndex <= affineDependenceValidThroughShiftedIndex;
  const resolvedXInterval = numericInterval(xInterval);

  const sourceAtZero = sourceEquationSeries({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval: [0, 0],
  });
  const sourceAtOne = sourceEquationSeries({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval: [1, 1],
  });
  const leadingSourceAtZero = sourceAtZero[shift];
  const leadingRecomputedSlope = root.subtractIntervals(
    sourceAtOne[shift],
    leadingSourceAtZero
  );
  const leadingSlope = isProvided(solveSlopeInterval)
    ? numericInterval(solveSlopeInterval)
    : leadingRecomputedSlope;
  const rowSourceAtZero = sourceAtZero[shift + resolvedShiftedIndex];
  const rowSlope = root.subtractIntervals(
    sourceAtOne[shift + resolvedShiftedIndex],
    rowSourceAtZero
  );
  const independentIntervalCenterEliminatedCoefficient =
    root.divideIntervals(
      root.subtractIntervals(
        root.multiplyIntervals(leadingSlope, rowSourceAtZero),
        root.multiplyIntervals(rowSlope, leadingSourceAtZero)
      ),
      leadingSlope
    );
  const independentIntervalPressure =
    intervalAbsUpper(independentIntervalCenterEliminatedCoefficient) *
    resolvedOuterRadius ** resolvedShiftedIndex;

  const replayForXInterval = ({
    interval,
    replayKind,
    replayCell = cell,
    replayHIntervals = hIntervals,
  }) => {
    const decomposed = sourceEquationSeriesTermDecomposition({
      context,
      cell: replayCell,
      branch,
      branchSign,
      hIntervals: replayHIntervals,
      xInterval: interval,
    });
    return {
      replay_kind: replayKind,
      x_interval: root.formatInterval(numericInterval(interval)),
      row_pressure: shiftedTermPressureByCoefficient({
        decomposed,
        sourceShift: shift,
        shiftedIndex: resolvedShiftedIndex,
        outerRadius: resolvedOuterRadius,
      }),
    };
  };

  const fullCenterReplay = replayForXInterval({
    interval: resolvedXInterval,
    replayKind: "full-center-interval",
  });
  const partitionReplays = splitIntervalUniform(
    resolvedXInterval,
    partitionCount
  ).map((interval, index) =>
    replayForXInterval({
      interval,
      replayKind: `center-partition-${index}`,
    })
  );
  const maxPartitionReplay = partitionReplays.reduce((best, replay) =>
    Number(replay.row_pressure.source_pressure_contribution) >
    Number(best.row_pressure.source_pressure_contribution)
      ? replay
      : best
  );
  const midpoint = intervalMidpoint(resolvedXInterval);
  const midpointReplay = replayForXInterval({
    interval: [midpoint, midpoint],
    replayKind: "center-midpoint",
  });
  const midpointCell = {
    speed_interval: pointIntervalAtMidpoint(cell.speed_interval),
    delta_fold_interval: pointIntervalAtMidpoint(cell.delta_fold_interval),
    phi_fold_interval: pointIntervalAtMidpoint(cell.phi_fold_interval),
    beta_interval: pointIntervalAtMidpoint(cell.beta_interval),
    gamma_interval: pointIntervalAtMidpoint(cell.gamma_interval),
    L_interval: pointIntervalAtMidpoint(cell.L_interval),
  };
  const midpointHIntervals = hIntervals.map(pointIntervalAtMidpoint);
  const midpointSolveSlopeInterval = isProvided(solveSlopeInterval)
    ? pointIntervalAtMidpoint(solveSlopeInterval)
    : null;
  const inputMidpointSolve = solveH39CenterCoefficientRow({
    context,
    cell: midpointCell,
    branch,
    branchSign,
    hIntervals: midpointHIntervals,
    solveSlopeInterval: midpointSolveSlopeInterval,
  });
  const inputMidpointReplay = replayForXInterval({
    interval: inputMidpointSolve.h39_center_numeric_interval,
    replayKind: "input-midpoint-center",
    replayCell: midpointCell,
    replayHIntervals: midpointHIntervals,
  });
  const fullPressure =
    fullCenterReplay.row_pressure.source_pressure_contribution;
  const maxPartitionPressure =
    maxPartitionReplay.row_pressure.source_pressure_contribution;
  const midpointPressure =
    midpointReplay.row_pressure.source_pressure_contribution;
  const inputMidpointPressure =
    inputMidpointReplay.row_pressure.source_pressure_contribution;

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-affine-center-row-correlation-diagnostic-candidate-emitted",
    evaluation_level: "candidate-affine-center-row-correlation-diagnostic",
    branch: branch ?? branchSign,
    r43_source_shift: shift,
    shifted_index: resolvedShiftedIndex,
    y_order: shift + resolvedShiftedIndex,
    outer_radius: resolvedOuterRadius,
    center_replay_x_interval: root.formatInterval(resolvedXInterval),
    partition_count: Number(partitionCount),
    affine_dependence_valid_through_shifted_index:
      affineDependenceValidThroughShiftedIndex,
    affine_dependence_valid_for_row: affineDependenceValidForRow,
    affine_row_formula: "R43_k(X)=C_k+S_k X",
    center_eliminated_formula:
      "A_k=(S_0 C_k - S_k C_0)/S_0 with k>=1; independent interval replay is diagnostic only.",
    leading_source_at_zero_C_0: root.formatInterval(leadingSourceAtZero),
    leading_recomputed_slope_S_0: root.formatInterval(leadingRecomputedSlope),
    leading_slope_used_S_0: root.formatInterval(leadingSlope),
    leading_slope_source: isProvided(solveSlopeInterval)
      ? "inherited-formal-recurrence-slope"
      : "recomputed-interval-series-slope",
    row_source_at_zero_C_k: root.formatInterval(rowSourceAtZero),
    row_source_slope_S_k: root.formatInterval(rowSlope),
    independent_interval_center_eliminated_coefficient:
      root.formatInterval(independentIntervalCenterEliminatedCoefficient),
    independent_interval_center_eliminated_pressure:
      independentIntervalPressure,
    full_center_replay: fullCenterReplay,
    partition_replays: partitionReplays,
    max_partition_replay: maxPartitionReplay,
    max_partition_pressure: maxPartitionPressure,
    partition_reduces_full_center_pressure:
      maxPartitionPressure <= fullPressure ||
      numericClose(maxPartitionPressure, fullPressure),
    full_to_max_partition_pressure_ratio:
      maxPartitionPressure > 0 ? fullPressure / maxPartitionPressure : null,
    midpoint_replay: midpointReplay,
    midpoint_pressure: midpointPressure,
    full_to_midpoint_pressure_ratio:
      midpointPressure > 0 ? fullPressure / midpointPressure : null,
    input_midpoint_center_interval:
      inputMidpointSolve.h39_center_interval,
    input_midpoint_replay: inputMidpointReplay,
    input_midpoint_pressure: inputMidpointPressure,
    full_to_input_midpoint_pressure_ratio:
      inputMidpointPressure > 0 ? fullPressure / inputMidpointPressure : null,
    row_correlation_diagnostic:
      "Compares actual center-interval replay, uniform X subinterval replay, center midpoint replay, input midpoint replay, and independent affine elimination for one shifted row. It is a diagnostic for width/decorrelation, not a directed-rounded certificate.",
    candidate_certificate_route:
      "If X partition replay lowers the row pressure, certify the row by a same-domain X-subdivision theorem; if only input midpoint replay collapses the row, refine the upstream h38 cell/input intervals; if midpoint replay is already large, search for an additional row-level cancellation or outer Cauchy envelope.",
    certifies_shifted_R43_outer_bound: false,
    certifies_directed_rounded_shared_domain: false,
    certifies_continuous_polydisc_primitives: false,
    retained_branch: false,
  };
}

export function computeH39AffineCenterHRowSensitivityDiagnosticCandidate({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign = branchSignValue(branch),
  hIntervals,
  solveSlopeInterval = null,
  outerRadius,
  shiftedIndex = 1,
  hFreezeStartIndexes = null,
  hRowWidthCompressionFactors = null,
  hRowSuffixWidthCompressionStartIndexes = null,
  hRowSuffixWidthCompressionFactors = null,
  targetPressure = null,
} = {}) {
  const resolvedOuterRadius = assertFinitePositiveNumber(
    "outerRadius",
    outerRadius
  );
  const resolvedShiftedIndex = Number(shiftedIndex);
  if (!Number.isInteger(resolvedShiftedIndex) || resolvedShiftedIndex < 1) {
    throw new Error("shiftedIndex must be a positive integer");
  }
  if (!Array.isArray(hIntervals) || hIntervals.length === 0) {
    throw new Error("hIntervals must be a nonempty array");
  }
  const shift =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift;
  if (shift + resolvedShiftedIndex > context.seriesOrder) {
    throw new Error(
      "seriesOrder is too small for the requested h-row sensitivity diagnostic"
    );
  }
  const affineDependenceValidThroughShiftedIndex =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .second_x_derivative_y_power - 1;
  const midpointCell = pointCellAtMidpoint(cell);
  const midpointHIntervals = pointIntervalsAtMidpoints(hIntervals);
  const midpointSolveSlopeInterval = isProvided(solveSlopeInterval)
    ? pointIntervalAtMidpoint(solveSlopeInterval)
    : null;
  const resolvedTargetPressure = isProvided(targetPressure)
    ? assertFiniteNonnegativeNumber("targetPressure", targetPressure)
    : null;

  const replayForInputs = ({
    inputFamily,
    replayCell,
    replayHIntervals,
    replaySolveSlopeInterval,
    changedInputs,
    freezeStartIndex = null,
    freezeEndIndex = null,
  }) => {
    const solve = solveH39CenterCoefficientRow({
      context,
      cell: replayCell,
      branch,
      branchSign,
      hIntervals: replayHIntervals,
      solveSlopeInterval: replaySolveSlopeInterval,
    });
    const decomposed = sourceEquationSeriesTermDecomposition({
      context,
      cell: replayCell,
      branch,
      branchSign,
      hIntervals: replayHIntervals,
      xInterval: solve.h39_center_numeric_interval,
    });
    const rowPressure = shiftedTermPressureByCoefficient({
      decomposed,
      sourceShift: shift,
      shiftedIndex: resolvedShiftedIndex,
      outerRadius: resolvedOuterRadius,
    });
    return {
      input_family: inputFamily,
      changed_inputs: changedInputs,
      freeze_start_index: freezeStartIndex,
      freeze_end_index: freezeEndIndex,
      center_interval: solve.h39_center_interval,
      center_numeric_interval: root.formatInterval(
        solve.h39_center_numeric_interval
      ),
      solve_slope_interval: solve.h39_solve_slope_interval,
      row_pressure: rowPressure,
      pressure: rowPressure.source_pressure_contribution,
    };
  };

  const fullReplay = replayForInputs({
    inputFamily: "full-input-box",
    replayCell: cell,
    replayHIntervals: hIntervals,
    replaySolveSlopeInterval: solveSlopeInterval,
    changedInputs: [],
  });
  const fullPressure = Number(fullReplay.pressure);
  const withRatio = (replay) => ({
    ...replay,
    full_to_pressure_ratio:
      Number(replay.pressure) > 0 ? fullPressure / Number(replay.pressure) : null,
  });
  const inputFamilyReplays = [
    fullReplay,
    replayForInputs({
      inputFamily: "cell-midpoint",
      replayCell: midpointCell,
      replayHIntervals: hIntervals,
      replaySolveSlopeInterval: solveSlopeInterval,
      changedInputs: ["cell"],
    }),
    replayForInputs({
      inputFamily: "h-row-midpoint",
      replayCell: cell,
      replayHIntervals: midpointHIntervals,
      replaySolveSlopeInterval: solveSlopeInterval,
      changedInputs: ["h-row"],
    }),
    ...(isProvided(solveSlopeInterval)
      ? [
          replayForInputs({
            inputFamily: "slope-midpoint",
            replayCell: cell,
            replayHIntervals: hIntervals,
            replaySolveSlopeInterval: midpointSolveSlopeInterval,
            changedInputs: ["solve-slope"],
          }),
        ]
      : []),
    replayForInputs({
      inputFamily: "cell-and-h-row-midpoint",
      replayCell: midpointCell,
      replayHIntervals: midpointHIntervals,
      replaySolveSlopeInterval: solveSlopeInterval,
      changedInputs: ["cell", "h-row"],
    }),
    replayForInputs({
      inputFamily: "all-input-midpoint",
      replayCell: midpointCell,
      replayHIntervals: midpointHIntervals,
      replaySolveSlopeInterval: midpointSolveSlopeInterval,
      changedInputs: isProvided(solveSlopeInterval)
        ? ["cell", "h-row", "solve-slope"]
        : ["cell", "h-row"],
    }),
  ].map(withRatio);

  const defaultFreezeStartIndexes = Array.from(
    { length: hIntervals.length },
    (_, index) => hIntervals.length - 1 - index
  );
  const resolvedFreezeStartIndexes = (
    hFreezeStartIndexes ?? defaultFreezeStartIndexes
  ).map((index) => {
    const resolvedIndex = Number(index);
    if (
      !Number.isInteger(resolvedIndex) ||
      resolvedIndex < 0 ||
      resolvedIndex >= hIntervals.length
    ) {
      throw new Error("hFreezeStartIndexes must contain valid h-row indexes");
    }
    return resolvedIndex;
  });
  const freezeEndIndex = hIntervals.length - 1;
  const hRowFreezeReplays = resolvedFreezeStartIndexes.map((startIndex) => {
    const frozenHIntervals = hIntervals.map((interval, index) =>
      index >= startIndex && index <= freezeEndIndex
        ? pointIntervalAtMidpoint(interval)
        : interval
    );
    return withRatio(
      replayForInputs({
        inputFamily: `freeze-h${startIndex}-through-h${freezeEndIndex}`,
        replayCell: cell,
        replayHIntervals: frozenHIntervals,
        replaySolveSlopeInterval: solveSlopeInterval,
        changedInputs: ["h-row-range"],
        freezeStartIndex: startIndex,
        freezeEndIndex,
      })
    );
  });

  const replayByFamily = Object.fromEntries(
    inputFamilyReplays.map((replay) => [replay.input_family, replay])
  );
  const hRowReduction =
    replayByFamily["h-row-midpoint"]?.full_to_pressure_ratio ?? null;
  const cellReduction =
    replayByFamily["cell-midpoint"]?.full_to_pressure_ratio ?? null;
  const slopeReduction =
    replayByFamily["slope-midpoint"]?.full_to_pressure_ratio ?? null;
  const strongestNonHReduction = Math.max(
    1,
    Number(cellReduction) || 1,
    Number(slopeReduction) || 1
  );
  const hRowWidthDominatesInputWidth =
    hRowReduction !== null &&
    Number(hRowReduction) >= 10 &&
    Number(hRowReduction) >= 10 * strongestNonHReduction;
  const bestHRowFreezeReplay = hRowFreezeReplays.reduce(
    (best, replay) =>
      Number(replay.full_to_pressure_ratio ?? -1) >
      Number(best?.full_to_pressure_ratio ?? -1)
        ? replay
        : best,
    null
  );
  const hRowSuffixFreezeScanComplete =
    hRowFreezeReplays.length === hIntervals.length &&
    new Set(hRowFreezeReplays.map((replay) => replay.freeze_start_index))
      .size === hIntervals.length &&
    hRowFreezeReplays.every(
      (replay) =>
        Number.isInteger(replay.freeze_start_index) &&
        replay.freeze_start_index >= 0 &&
        replay.freeze_start_index < hIntervals.length
    );
  const suffixReplayForStartIndex = (startIndex) =>
    hRowFreezeReplays.find((replay) => replay.freeze_start_index === startIndex) ??
    null;
  const lastSuccessorSuffixReplay =
    suffixReplayForStartIndex(hIntervals.length - 1);
  const topTwelveSuffixStartIndex = Math.max(0, hIntervals.length - 12);
  const topTwelveSuffixReplay =
    suffixReplayForStartIndex(topTwelveSuffixStartIndex);
  const fullChainSuffixReplay = suffixReplayForStartIndex(0);
  const hRowTransportDepthThresholdRatios = [10, 100, 1000, 1e6].map(
    (ratio) => {
      const firstReplay =
        hRowFreezeReplays.find(
          (replay) => Number(replay.full_to_pressure_ratio ?? 0) >= ratio
        ) ?? null;
      return {
        target_full_to_pressure_ratio: ratio,
        first_freeze_start_index: firstReplay?.freeze_start_index ?? null,
        transported_h_row_count: firstReplay
          ? freezeEndIndex - firstReplay.freeze_start_index + 1
          : null,
        pressure: firstReplay?.pressure ?? null,
        full_to_pressure_ratio: firstReplay?.full_to_pressure_ratio ?? null,
      };
    }
  );
  const hRowTransportDepthScan = hRowFreezeReplays.map((replay) => ({
    input_family: replay.input_family,
    freeze_start_index: replay.freeze_start_index,
    freeze_end_index: replay.freeze_end_index,
    transported_h_row_count:
      freezeEndIndex - replay.freeze_start_index + 1,
    pressure: replay.pressure,
    full_to_pressure_ratio: replay.full_to_pressure_ratio,
  }));
  const firstHRowSuffixFreezeMeetingTarget =
    resolvedTargetPressure === null
      ? null
      : hRowFreezeReplays.find(
          (replay) => Number(replay.pressure) <= resolvedTargetPressure
        ) ?? null;
  const fullChainReduction =
    fullChainSuffixReplay?.full_to_pressure_ratio ?? null;
  const lastSuccessorReduction =
    lastSuccessorSuffixReplay?.full_to_pressure_ratio ?? null;
  const topTwelveReduction =
    topTwelveSuffixReplay?.full_to_pressure_ratio ?? null;
  const fullChainOutrunsTopSuccessorRows =
    Number(fullChainReduction ?? 0) >=
    10 * Math.max(1, Number(topTwelveReduction ?? 1));
  const hRowTransportDepthSummary = {
    suffix_scan_complete: hRowSuffixFreezeScanComplete,
    tested_suffix_count: hRowFreezeReplays.length,
    max_tested_transport_depth: hIntervals.length,
    last_successor_only_reduction_factor: lastSuccessorReduction,
    top_twelve_successor_reduction_factor: topTwelveReduction,
    full_chain_midpoint_reduction_factor: fullChainReduction,
    full_chain_outruns_top_successor_rows: fullChainOutrunsTopSuccessorRows,
    best_freeze_start_index:
      bestHRowFreezeReplay?.freeze_start_index ?? null,
    best_transport_depth: bestHRowFreezeReplay
      ? freezeEndIndex - bestHRowFreezeReplay.freeze_start_index + 1
      : null,
    threshold_crossings: hRowTransportDepthThresholdRatios,
  };
  const hRowFullChainCaptureThresholds = [0.5, 0.75, 0.9, 0.99].map(
    (fraction) => {
      const requiredRatio =
        Number(fullChainReduction ?? 0) > 0
          ? Number(fullChainReduction) * fraction
          : null;
      const firstReplay =
        requiredRatio === null
          ? null
          : hRowFreezeReplays.find(
              (replay) =>
                Number(replay.full_to_pressure_ratio ?? 0) >= requiredRatio
            ) ?? null;
      return {
        target_full_chain_capture_fraction: fraction,
        required_full_to_pressure_ratio: requiredRatio,
        first_freeze_start_index: firstReplay?.freeze_start_index ?? null,
        transported_h_row_count: firstReplay
          ? freezeEndIndex - firstReplay.freeze_start_index + 1
          : null,
        pressure: firstReplay?.pressure ?? null,
        full_to_pressure_ratio: firstReplay?.full_to_pressure_ratio ?? null,
        achieved_full_chain_capture_fraction:
          firstReplay !== null && Number(fullChainReduction ?? 0) > 0
            ? Number(firstReplay.full_to_pressure_ratio) /
              Number(fullChainReduction)
            : null,
      };
    }
  );
  hRowTransportDepthSummary.full_chain_capture_thresholds =
    hRowFullChainCaptureThresholds;
  const defaultCompressionFactors = [1, 0.5, 0.25, 0.125, 0.0625, 0];
  const normalizeCompressionFactors = (factors) => [
    ...new Set(
      factors.map((factor) => {
        const resolvedFactor = Number(factor);
        if (
          !Number.isFinite(resolvedFactor) ||
          resolvedFactor < 0 ||
          resolvedFactor > 1
        ) {
          throw new Error(
            "h-row width compression factors must be finite values in [0,1]"
          );
        }
        return resolvedFactor;
      })
    ),
  ];
  const resolvedCompressionFactors = normalizeCompressionFactors(
    hRowWidthCompressionFactors ?? defaultCompressionFactors
  );
  const hRowWidthCompressionReplays = resolvedCompressionFactors.map(
    (factor) => {
      const compressedHIntervals = scaleIntervalsAboutMidpoints(
        hIntervals,
        factor
      );
      return withRatio(
        replayForInputs({
          inputFamily: `h-row-width-compression-${factor}`,
          replayCell: cell,
          replayHIntervals: compressedHIntervals,
          replaySolveSlopeInterval: solveSlopeInterval,
          changedInputs: ["h-row-width"],
        })
      );
    }
  );
  const firstHRowWidthCompressionMeetingTarget =
    resolvedTargetPressure === null
      ? null
      : hRowWidthCompressionReplays.find(
          (replay) => Number(replay.pressure) <= resolvedTargetPressure
        ) ?? null;
  const defaultSuffixCompressionStartIndexes = [
    hIntervals.length - 1,
    Math.max(0, hIntervals.length - 3),
    Math.max(0, hIntervals.length - 4),
    topTwelveSuffixStartIndex,
    0,
  ];
  const resolvedSuffixCompressionStartIndexes = [
    ...new Set(
      (
        hRowSuffixWidthCompressionStartIndexes ??
        defaultSuffixCompressionStartIndexes
      ).map((index) => {
        const resolvedIndex = Number(index);
        if (
          !Number.isInteger(resolvedIndex) ||
          resolvedIndex < 0 ||
          resolvedIndex >= hIntervals.length
        ) {
          throw new Error(
            "hRowSuffixWidthCompressionStartIndexes must contain valid h-row indexes"
          );
        }
        return resolvedIndex;
      })
    ),
  ].sort((left, right) => right - left);
  const resolvedSuffixCompressionFactors = normalizeCompressionFactors(
    hRowSuffixWidthCompressionFactors ??
      hRowWidthCompressionFactors ??
      defaultCompressionFactors
  );
  const hRowSuffixWidthCompressionReplays =
    resolvedSuffixCompressionStartIndexes.flatMap((startIndex) =>
      resolvedSuffixCompressionFactors.map((factor) => {
        const compressedHIntervals = scaleSuffixIntervalsAboutMidpoints({
          intervals: hIntervals,
          widthScale: factor,
          startIndex,
          endIndex: freezeEndIndex,
        });
        return {
          ...withRatio(
            replayForInputs({
              inputFamily: `suffix-h${startIndex}-through-h${freezeEndIndex}-width-compression-${factor}`,
              replayCell: cell,
              replayHIntervals: compressedHIntervals,
              replaySolveSlopeInterval: solveSlopeInterval,
              changedInputs: ["h-row-suffix-width"],
              freezeStartIndex: startIndex,
              freezeEndIndex,
            })
          ),
          width_compression_factor: factor,
          transported_h_row_count: freezeEndIndex - startIndex + 1,
        };
      })
    );
  const suffixCompressionReplayFor = ({ startIndex, factor }) =>
    hRowSuffixWidthCompressionReplays.find(
      (replay) =>
        replay.freeze_start_index === startIndex &&
        replay.width_compression_factor === factor
    ) ?? null;
  const lastSuccessorZeroWidthCompressionReplay =
    suffixCompressionReplayFor({
      startIndex: hIntervals.length - 1,
      factor: 0,
    });
  const topTwelveZeroWidthCompressionReplay =
    suffixCompressionReplayFor({
      startIndex: topTwelveSuffixStartIndex,
      factor: 0,
    });
  const fullChainZeroWidthCompressionReplay =
    suffixCompressionReplayFor({ startIndex: 0, factor: 0 });
  const zeroWidthCompressionReplays =
    hRowSuffixWidthCompressionReplays.filter(
      (replay) => replay.width_compression_factor === 0
    );
  const suffixCompressionMeetsTarget =
    resolvedTargetPressure === null
      ? []
      : hRowSuffixWidthCompressionReplays.filter(
          (replay) => Number(replay.pressure) <= resolvedTargetPressure
        );
  const firstSuffixWidthCompressionMeetingTarget =
    suffixCompressionMeetsTarget.length === 0
      ? null
      : [...suffixCompressionMeetsTarget].sort((left, right) => {
          const countDelta =
            left.transported_h_row_count - right.transported_h_row_count;
          if (countDelta !== 0) {
            return countDelta;
          }
          return (
            right.width_compression_factor - left.width_compression_factor
          );
        })[0];
  const fullChainZeroReduction =
    fullChainZeroWidthCompressionReplay?.full_to_pressure_ratio ?? null;
  const suffixWidthCompressionCaptureThresholds = [0.5, 0.75, 0.9, 0.99].map(
    (fraction) => {
      const requiredRatio =
        Number(fullChainZeroReduction ?? 0) > 0
          ? Number(fullChainZeroReduction) * fraction
          : null;
      const firstReplay =
        requiredRatio === null
          ? null
          : zeroWidthCompressionReplays.find(
              (replay) =>
                Number(replay.full_to_pressure_ratio ?? 0) >= requiredRatio
            ) ?? null;
      return {
        target_full_chain_capture_fraction: fraction,
        required_full_to_pressure_ratio: requiredRatio,
        first_freeze_start_index: firstReplay?.freeze_start_index ?? null,
        transported_h_row_count: firstReplay?.transported_h_row_count ?? null,
        width_compression_factor:
          firstReplay?.width_compression_factor ?? null,
        pressure: firstReplay?.pressure ?? null,
        full_to_pressure_ratio: firstReplay?.full_to_pressure_ratio ?? null,
        achieved_full_chain_capture_fraction:
          firstReplay !== null && Number(fullChainZeroReduction ?? 0) > 0
            ? Number(firstReplay.full_to_pressure_ratio) /
              Number(fullChainZeroReduction)
            : null,
      };
    }
  );
  const hRowSuffixWidthCompressionSummary = {
    tested_suffix_start_indexes: resolvedSuffixCompressionStartIndexes,
    width_compression_factors: resolvedSuffixCompressionFactors,
    replay_count: hRowSuffixWidthCompressionReplays.length,
    last_successor_zero_width_pressure:
      lastSuccessorZeroWidthCompressionReplay?.pressure ?? null,
    last_successor_zero_width_reduction_factor:
      lastSuccessorZeroWidthCompressionReplay?.full_to_pressure_ratio ?? null,
    last_successor_zero_width_full_chain_capture_fraction:
      lastSuccessorZeroWidthCompressionReplay !== null &&
      Number(fullChainZeroReduction ?? 0) > 0
        ? Number(lastSuccessorZeroWidthCompressionReplay.full_to_pressure_ratio) /
          Number(fullChainZeroReduction)
        : null,
    top_twelve_zero_width_pressure:
      topTwelveZeroWidthCompressionReplay?.pressure ?? null,
    top_twelve_zero_width_reduction_factor:
      topTwelveZeroWidthCompressionReplay?.full_to_pressure_ratio ?? null,
    top_twelve_zero_width_full_chain_capture_fraction:
      topTwelveZeroWidthCompressionReplay !== null &&
      Number(fullChainZeroReduction ?? 0) > 0
        ? Number(topTwelveZeroWidthCompressionReplay.full_to_pressure_ratio) /
          Number(fullChainZeroReduction)
        : null,
    full_chain_zero_width_pressure:
      fullChainZeroWidthCompressionReplay?.pressure ?? null,
    full_chain_zero_width_reduction_factor: fullChainZeroReduction,
    capture_thresholds: suffixWidthCompressionCaptureThresholds,
    first_suffix_width_compression_meeting_target:
      firstSuffixWidthCompressionMeetingTarget,
    candidate_certificate_route:
      "Use this suffix-width compression table to choose the narrowest successor h-row transport theorem to certify with directed-rounded dependency intervals; midpoint or compression replay is still diagnostic until a producer-image transport enclosure proves the width reduction on the same domain.",
  };

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-affine-center-h-row-sensitivity-diagnostic-candidate-emitted",
    evaluation_level: "candidate-affine-center-h-row-sensitivity-diagnostic",
    branch: branch ?? branchSign,
    r43_source_shift: shift,
    shifted_index: resolvedShiftedIndex,
    y_order: shift + resolvedShiftedIndex,
    outer_radius: resolvedOuterRadius,
    affine_dependence_valid_through_shifted_index:
      affineDependenceValidThroughShiftedIndex,
    affine_dependence_valid_for_row:
      resolvedShiftedIndex <= affineDependenceValidThroughShiftedIndex,
    full_input_replay: withRatio(fullReplay),
    input_family_replays: inputFamilyReplays,
    h_row_freeze_replays: hRowFreezeReplays,
    best_h_row_freeze_replay: bestHRowFreezeReplay,
    h_row_transport_depth_scan: hRowTransportDepthScan,
    h_row_transport_depth_summary: hRowTransportDepthSummary,
    first_h_row_suffix_freeze_meeting_target:
      firstHRowSuffixFreezeMeetingTarget,
    h_row_width_compression_replays: hRowWidthCompressionReplays,
    target_pressure: resolvedTargetPressure,
    first_h_row_width_compression_meeting_target:
      firstHRowWidthCompressionMeetingTarget,
    h_row_suffix_width_compression_replays:
      hRowSuffixWidthCompressionReplays,
    h_row_suffix_width_compression_summary:
      hRowSuffixWidthCompressionSummary,
    h_row_midpoint_reduction_factor: hRowReduction,
    cell_midpoint_reduction_factor: cellReduction,
    slope_midpoint_reduction_factor: slopeReduction,
    strongest_non_h_row_reduction_factor: strongestNonHReduction,
    h_row_width_dominates_input_width: hRowWidthDominatesInputWidth,
    h_row_sensitivity_diagnostic:
      "Re-solves the affine center after selectively midpointing the live cell, inherited h-row intervals, solve slope, or every contiguous top h-row suffix. It diagnoses dependency loss and transport depth in the inherited h-row box and is not a directed-rounded certificate.",
    candidate_certificate_route: hRowWidthDominatesInputWidth
      ? "Replace the independent inherited h-row interval box with a dependency-preserving h-row transport or subdivision certificate before applying the shifted R43 outer Cauchy bound."
      : "Use the replay table to choose between h-row transport, cell subdivision, solve-slope refinement, or a different row-level cancellation proof before promoting any shifted R43 bound.",
    certifies_shifted_R43_outer_bound: false,
    certifies_directed_rounded_shared_domain: false,
    certifies_continuous_polydisc_primitives: false,
    retained_branch: false,
  };
}

export function computeH39ShiftedR43AffineCenterFormCandidate({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign = branchSignValue(branch),
  hIntervals,
  xInterval = null,
  solveSlopeInterval = null,
  outerRadius = null,
  shiftedOrder = 10,
} = {}) {
  if (!Number.isInteger(shiftedOrder) || shiftedOrder < 0) {
    throw new Error("shiftedOrder must be a nonnegative integer");
  }
  const shift =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift;
  if (shift + shiftedOrder > context.seriesOrder) {
    throw new Error(
      "seriesOrder is too small for the requested shifted R43 affine center form"
    );
  }
  const hasOuterRadius = outerRadius !== null && outerRadius !== undefined;
  const resolvedOuterRadius = hasOuterRadius
    ? assertFinitePositiveNumber("outerRadius", outerRadius)
    : null;

  const sourceAtZero = sourceEquationSeries({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval: [0, 0],
  });
  const sourceAtOne = sourceEquationSeries({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval: [1, 1],
  });
  const leadingSourceAtZero = sourceAtZero[shift];
  const leadingRecomputedSlope = root.subtractIntervals(
    sourceAtOne[shift],
    leadingSourceAtZero
  );
  const leadingSlope = isProvided(solveSlopeInterval)
    ? numericInterval(solveSlopeInterval)
    : leadingRecomputedSlope;
  const centerRelationInterval = root.divideIntervals(
    root.scaleInterval(leadingSourceAtZero, -1),
    leadingSlope
  );
  const centerReplayAvailable = xInterval !== null && xInterval !== undefined;
  const centerReplaySource = centerReplayAvailable
    ? sourceEquationSeries({
        context,
        cell,
        branch,
        branchSign,
        hIntervals,
        xInterval,
      })
    : null;
  const affineDependenceValidThroughShiftedIndex =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .second_x_derivative_y_power - 1;
  const affineDependenceValidThroughRequestedOrder =
    shiftedOrder <= affineDependenceValidThroughShiftedIndex;
  const secondXZeroPrefixCoefficients =
    r43SecondXDerivativeShiftedCoefficients({
      context,
      cell,
      branch,
      branchSign,
      hIntervals,
      xInterval: centerReplayAvailable ? xInterval : [0, 0],
      shiftedOrder: Math.min(
        shiftedOrder,
        affineDependenceValidThroughShiftedIndex
      ),
    });
  const secondXZeroPrefixCertified = secondXZeroPrefixCoefficients.every(
    (coefficient) => coefficient[0] === 0 && coefficient[1] === 0
  );
  const leadingSlopeClearancePositive =
    intervalClearanceFromZero(leadingSlope) > 0;
  const centerIntervalContainsSolve = centerReplayAvailable
    ? intervalContainsInterval(xInterval, centerRelationInterval)
    : false;
  const leadingAffineCenterZeroCertified =
    affineDependenceValidThroughRequestedOrder &&
    leadingSlopeClearancePositive &&
    centerIntervalContainsSolve &&
    secondXZeroPrefixCertified;
  const affineRowCount =
    Math.min(shiftedOrder, affineDependenceValidThroughShiftedIndex) + 1;
  const affineCenterRows = Array.from(
    { length: affineRowCount },
    (_, index) => {
      const coefficientAtZero = sourceAtZero[shift + index];
      const coefficientSlope = root.subtractIntervals(
        sourceAtOne[shift + index],
        coefficientAtZero
      );
      const independentIntervalCenterEliminatedCoefficient =
        index === 0
          ? [0, 0]
          : root.divideIntervals(
              root.subtractIntervals(
                root.multiplyIntervals(leadingSlope, coefficientAtZero),
                root.multiplyIntervals(
                  coefficientSlope,
                  leadingSourceAtZero
                )
              ),
              leadingSlope
            );
      const independentIntervalCenterEliminatedPressure =
        resolvedOuterRadius === null
          ? null
          : intervalAbsUpper(independentIntervalCenterEliminatedCoefficient) *
            resolvedOuterRadius ** index;
      const centerReplayCoefficient =
        centerReplaySource === null ? null : centerReplaySource[shift + index];
      const affineCenterCoefficient =
        index === 0 && leadingAffineCenterZeroCertified
          ? [0, 0]
          : centerReplayCoefficient;
      return {
        shifted_index: index,
        y_order: shift + index,
        source_at_zero_C_k: root.formatInterval(coefficientAtZero),
        source_slope_S_k: root.formatInterval(coefficientSlope),
        affine_coefficient_formula: "R43_k(X)=C_k+S_k X",
        symbolic_center_eliminated_coefficient_formula:
          index === 0 ? "A_0=0" : "A_k=(S_0 C_k - S_k C_0)/S_0",
        symbolic_center_elimination_status:
          index === 0
            ? "leading-row-zeroed-by-center-relation"
            : "correlation-preserved-symbolically",
        independent_interval_center_eliminated_coefficient:
          root.formatInterval(independentIntervalCenterEliminatedCoefficient),
        independent_interval_center_eliminated_abs_upper: intervalAbsUpper(
          independentIntervalCenterEliminatedCoefficient
        ),
        independent_interval_center_eliminated_pressure:
          independentIntervalCenterEliminatedPressure,
        actual_center_replay_coefficient:
          centerReplayCoefficient === null
            ? null
            : root.formatInterval(centerReplayCoefficient),
        affine_center_coefficient:
          affineCenterCoefficient === null
            ? null
            : root.formatInterval(affineCenterCoefficient),
        numeric_interval_replay_certified: false,
      };
    }
  );
  const pressureRows = affineCenterRows
    .map((row) => row.independent_interval_center_eliminated_pressure)
    .filter((value) => Number.isFinite(Number(value)));
  const independentIntervalCenterEliminatedPrefixMajorant =
    pressureRows.length === 0
      ? null
      : pressureRows.reduce((sum, value) => sum + Number(value), 0);
  const dominantIndependentIntervalRow =
    resolvedOuterRadius === null
      ? null
      : affineCenterRows.reduce(
          (best, row) =>
            Number(row.independent_interval_center_eliminated_pressure) >
            Number(best?.independent_interval_center_eliminated_pressure ?? -1)
              ? row
              : best,
          null
        );
  const affineCenterShiftedCoefficients =
    centerReplaySource === null
      ? null
      : Array.from({ length: shiftedOrder + 1 }, (_, index) =>
          index === 0 && leadingAffineCenterZeroCertified
            ? [0, 0]
            : centerReplaySource[shift + index]
        );
  const affineCenterShiftedPressures =
    resolvedOuterRadius === null || affineCenterShiftedCoefficients === null
      ? []
      : coefficientPressureEntries(affineCenterShiftedCoefficients, {
          outerRadius: resolvedOuterRadius,
          sourceShift: shift,
        });
  const affineCenterShiftedPrefixMajorant =
    affineCenterShiftedPressures.length === 0
      ? null
      : sumPressure(affineCenterShiftedPressures);
  const dominantAffineCenterShiftedPressure = dominantPressureEntry(
    affineCenterShiftedPressures
  );

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-shifted-r43-affine-center-form-candidate-emitted",
    evaluation_level: "symbolic-affine-center-normal-form",
    branch: branch ?? branchSign,
    center_replay_x_interval:
      xInterval === null || xInterval === undefined
        ? null
        : root.formatInterval(numericInterval(xInterval)),
    r43_source_shift: shift,
    shifted_order: shiftedOrder,
    outer_radius: resolvedOuterRadius,
    affine_dependence_valid_through_shifted_index:
      affineDependenceValidThroughShiftedIndex,
    affine_dependence_valid_through_requested_order:
      affineDependenceValidThroughRequestedOrder,
    affine_row_count: affineRowCount,
    leading_source_at_zero_C_0: root.formatInterval(leadingSourceAtZero),
    leading_recomputed_slope_S_0: root.formatInterval(leadingRecomputedSlope),
    leading_slope_used_S_0: root.formatInterval(leadingSlope),
    leading_slope_source: isProvided(solveSlopeInterval)
      ? "inherited-formal-recurrence-slope"
      : "recomputed-interval-series-slope",
    center_relation: "X_c=-C_0/S_0",
    center_relation_interval: root.formatInterval(centerRelationInterval),
    center_relation_zeroes_leading_coefficient_symbolically:
      leadingAffineCenterZeroCertified,
    R43_affine_center_shifted_coefficients:
      affineCenterShiftedCoefficients?.map(root.formatInterval) ?? null,
    R43_affine_center_shifted_pressures: affineCenterShiftedPressures,
    R43_affine_center_shifted_prefix_majorant_outer_radius:
      affineCenterShiftedPrefixMajorant,
    dominant_R43_affine_center_shifted_pressure:
      dominantAffineCenterShiftedPressure,
    R43_affine_center_certificate: {
      affine_valid_through_shifted_index:
        affineDependenceValidThroughShiftedIndex,
      requested_shifted_order_below_second_x_row:
        affineDependenceValidThroughRequestedOrder,
      leading_slope_clearance_positive: leadingSlopeClearancePositive,
      center_interval_contains_solve: centerIntervalContainsSolve,
      leading_affine_center_zero_certified:
        leadingAffineCenterZeroCertified,
      second_x_zero_prefix_certified: secondXZeroPrefixCertified,
      independent_interval_schur_products_used: false,
      schur_elimination_used_for_bound: false,
    },
    affine_center_eliminated_formula:
      "A_0=0 and A_k=(S_0 C_k - S_k C_0)/S_0 for shifted indices k>=1 before interval decorrelation.",
    affine_center_rows: affineCenterRows,
    independent_interval_center_eliminated_prefix_majorant_outer_radius:
      independentIntervalCenterEliminatedPrefixMajorant,
    dominant_independent_interval_center_eliminated_row:
      dominantIndependentIntervalRow,
    correlation_preserved_symbolically: true,
    independent_interval_numeric_replay_warning:
      "The displayed independent-interval A_k replay is diagnostic only; it does not preserve C_k,S_k,C_0,S_0 correlations and cannot certify the shifted R43 bound by itself.",
    first_uncertified_numeric_step:
      "Bound A_k=(S_0 C_k-S_k C_0)/S_0 with directed-rounded correlated arithmetic or certified subdivision on the same domain.",
    certifies_shifted_R43_outer_bound: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function r43JacobianShiftedCoefficients({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign,
  hIntervals,
  xInterval = [0, 0],
  shiftedOrder = Math.min(
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .default_jacobian_shifted_order,
    context.seriesOrder - 1
  ),
} = {}) {
  if (!Number.isInteger(shiftedOrder) || shiftedOrder < 0) {
    throw new Error("shiftedOrder must be a nonnegative integer");
  }
  if (shiftedOrder + 1 > context.seriesOrder) {
    throw new Error("seriesOrder is too small for the requested Jacobian shift");
  }
  const { delta, phi } = branchSeriesCoordinates({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval,
  });
  const numerator = context.add(
    context.add(
      context.scaleByInterval(
        delta,
        root.scaleInterval(
          root.inverseSpeedSquaredInterval(cell.speed_interval),
          2
        )
      ),
      context.cosSeries(delta)
    ),
    context.scale(context.cosSeries(phi), -1)
  );
  return Array.from(
    { length: shiftedOrder + 1 },
    (_, index) => numerator[index + 1]
  );
}

export function r43SecondXDerivativeShiftedCoefficients({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign,
  hIntervals,
  xInterval = [0, 0],
  shiftedOrder = Math.min(
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .default_jacobian_shifted_order,
    context.seriesOrder - 1
  ),
} = {}) {
  if (!Number.isInteger(shiftedOrder) || shiftedOrder < 0) {
    throw new Error("shiftedOrder must be a nonnegative integer");
  }
  const lowestPower =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .second_x_derivative_y_power;
  if (shiftedOrder - lowestPower > context.seriesOrder) {
    throw new Error(
      "seriesOrder is too small for the requested second-X derivative shift"
    );
  }
  const kernelCoefficients =
    shiftedOrder < lowestPower
      ? []
      : r43SecondXDerivativeKernelCoefficients({
          context,
          cell,
          branch,
          branchSign,
          hIntervals,
          xInterval,
          kernelOrder: shiftedOrder - lowestPower,
        });
  return Array.from({ length: shiftedOrder + 1 }, (_, index) =>
    index < lowestPower ? [0, 0] : kernelCoefficients[index - lowestPower]
  );
}

export function r43SecondXDerivativeKernelCoefficients({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign,
  hIntervals,
  xInterval = [0, 0],
  kernelOrder = null,
} = {}) {
  const lowestPower =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .second_x_derivative_y_power;
  const resolvedKernelOrder =
    kernelOrder === null || kernelOrder === undefined
      ? Math.max(
          0,
          Math.min(
            THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
              .default_jacobian_shifted_order,
            context.seriesOrder - 1
          ) - lowestPower
        )
      : Number(kernelOrder);
  if (
    !Number.isInteger(resolvedKernelOrder) ||
    resolvedKernelOrder < 0
  ) {
    throw new Error("kernelOrder must be a nonnegative integer");
  }
  if (resolvedKernelOrder > context.seriesOrder) {
    throw new Error(
      "seriesOrder is too small for the requested second-X derivative kernel"
    );
  }
  const { delta, phi } = branchSeriesCoordinates({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval,
  });
  const kernel = context.add(
    context.add(
      context.constant(
        root.scaleInterval(
          root.inverseSpeedSquaredInterval(cell.speed_interval),
          2
        )
      ),
      context.scale(context.sinSeries(delta), -1)
    ),
    context.scale(context.sinSeries(phi), -1)
  );
  return Array.from(
    { length: resolvedKernelOrder + 1 },
    (_, index) => kernel[index]
  );
}

export function solveH39CenterCoefficientRow({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign,
  hIntervals,
  solveSlopeInterval = null,
} = {}) {
  const shift =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift;
  const sourceAtZero = sourceEquationSeries({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval: [0, 0],
  });
  const sourceAtOne = sourceEquationSeries({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval: [1, 1],
  });
  const intervalSlope = root.subtractIntervals(
    sourceAtOne[shift],
    sourceAtZero[shift]
  );
  const slope = isProvided(solveSlopeInterval)
    ? numericInterval(solveSlopeInterval)
    : intervalSlope;
  const h39 = root.divideIntervals(root.scaleInterval(sourceAtZero[shift], -1), slope);
  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-center-coefficient-row-solved",
    evaluation_level: "coefficient-only",
    branch: branch ?? branchSign,
    r43_source_shift: shift,
    R43_unsolved_center_coefficient_interval:
      root.formatInterval(sourceAtZero[shift]),
    h39_interval_recomputed_jacobian_coefficient_interval:
      root.formatInterval(intervalSlope),
    h39_solve_slope_interval: root.formatInterval(slope),
    h39_solve_slope_source: isProvided(solveSlopeInterval)
      ? "inherited-formal-recurrence-slope"
      : "recomputed-interval-series-slope",
    h39_center_interval: root.formatInterval(h39),
    h39_center_numeric_interval: h39,
    coefficient_only_claim:
      "Solves only the leading shifted h39 center coefficient. A finite X39 root tube and continuous primitive bounds remain open.",
    certifies_continuous_polydisc_primitives: false,
  };
}

export function branchGSeries({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign = branchSignValue(branch),
  hIntervals,
  xInterval = [0, 0],
  sourceCoefficient = -1,
} = {}) {
  const { delta, phi } = branchSeriesCoordinates({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval,
  });
  const kernel = context.scale(
    context.add(context.cosSeries(phi), context.cosSeries(delta)),
    -0.5
  );
  const fDelta = context.add(
    context.add(
      context.scaleByInterval(
        delta,
        root.scaleInterval(
          root.inverseSpeedSquaredInterval(cell.speed_interval),
          2
        )
      ),
      context.scale(context.cosSeries(phi), -1)
    ),
    context.cosSeries(delta)
  );
  const j = context.zeros();
  for (let order = 0; order < context.seriesOrder; order += 1) {
    j[order] = fDelta[order + 1];
  }
  const absJ = context.scale(j, -branchSign);
  const denominator = context.scaleByInterval(
    context.multiply(context.power(delta, 2), absJ),
    cell.speed_interval
  );
  return context.divide(context.scale(kernel, 4 * sourceCoefficient), denominator);
}

export function transformedDSeries({
  context = makeTheta3minusFirstYGdSeriesContext(),
  pairGSeries,
} = {}) {
  return pairGSeries.map((coefficient, order) =>
    root.scaleInterval(coefficient, 1 - order)
  );
}

export function evaluateR43CoefficientRows({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign,
  hIntervals,
  xInterval = [0, 0],
  solveSlopeInterval = null,
  rho = null,
  shiftedOrder = 1,
  derivativeShiftedOrder = Math.min(
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .default_jacobian_shifted_order,
    context.seriesOrder - 1
  ),
} = {}) {
  const shift =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift;
  if (shift + shiftedOrder > context.seriesOrder) {
    throw new Error("seriesOrder is too small for the requested R43 shift");
  }

  const sourceAtX = sourceEquationSeries({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval,
  });
  const sourceAtZero = sourceEquationSeries({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval: [0, 0],
  });
  const sourceAtOne = sourceEquationSeries({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval: [1, 1],
  });

  const shiftedCoefficients = Array.from(
    { length: shiftedOrder + 1 },
    (_, index) => sourceAtX[shift + index]
  );
  const rootTangentShiftedCoefficients = shiftedCoefficients.map(
    (coefficient, index) => root.scaleInterval(coefficient, index)
  );
  const recomputedJacobianCoefficient = root.subtractIntervals(
    sourceAtOne[shift],
    sourceAtZero[shift]
  );
  const jacobianCoefficient = isProvided(solveSlopeInterval)
    ? numericInterval(solveSlopeInterval)
    : recomputedJacobianCoefficient;
  const recomputedJacobianShiftedCoefficients =
    r43JacobianShiftedCoefficients({
      context,
      cell,
      branch,
      branchSign,
      hIntervals,
      xInterval,
      shiftedOrder: derivativeShiftedOrder,
    });
  const jacobianShiftedCoefficients = [
    jacobianCoefficient,
    ...recomputedJacobianShiftedCoefficients.slice(1),
  ];
  const secondXDerivativeShiftedCoefficients =
    r43SecondXDerivativeShiftedCoefficients({
      context,
      cell,
      branch,
      branchSign,
      hIntervals,
      xInterval,
      shiftedOrder: derivativeShiftedOrder,
    });
  const secondXKernelOrder =
    derivativeShiftedOrder >=
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .second_x_derivative_y_power
      ? derivativeShiftedOrder -
        THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
          .second_x_derivative_y_power
      : 0;
  const secondXDerivativeKernelCoefficients =
    r43SecondXDerivativeKernelCoefficients({
      context,
      cell,
      branch,
      branchSign,
      hIntervals,
      xInterval,
      kernelOrder: secondXKernelOrder,
    });
  const kernelContinuousMajorant =
    rho === null || rho === undefined
      ? null
      : computeH39KernelContinuousMajorant({
          context,
          cell,
          branch,
          branchSign,
          hIntervals,
          xInterval,
          rho: Number(rho),
        });
  const shiftedPressureDiagnostic =
    rho === null || rho === undefined
      ? null
      : computeH39ShiftedR43PressureDecompositionCandidate({
          context,
          cell,
          branch,
          branchSign,
          hIntervals,
          xInterval,
          solveSlopeInterval,
          outerRadius: Number(rho),
          shiftedOrder,
        });
  const affineCenterFormCandidate =
    computeH39ShiftedR43AffineCenterFormCandidate({
      context,
      cell,
      branch,
      branchSign,
      hIntervals,
      xInterval,
      solveSlopeInterval,
      outerRadius: rho === null || rho === undefined ? null : Number(rho),
      shiftedOrder,
    });

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-r43-coefficient-rows-evaluated",
    evaluation_level: "coefficient-only",
    branch: branch ?? branchSign,
    x_interval: root.formatInterval(numericInterval(xInterval)),
    r43_source_shift: shift,
    R43_shifted_coefficients: shiftedCoefficients.map(root.formatInterval),
    R43_center_coefficient_interval: root.formatInterval(sourceAtX[shift]),
    R43_jacobian_coefficient_interval:
      root.formatInterval(jacobianCoefficient),
    R43_recomputed_interval_jacobian_coefficient_interval:
      root.formatInterval(recomputedJacobianCoefficient),
    R43_jacobian_coefficient_source: isProvided(solveSlopeInterval)
      ? "inherited-formal-recurrence-slope"
      : "recomputed-interval-series-slope",
    R43_jacobian_shifted_coefficients:
      jacobianShiftedCoefficients.map(root.formatInterval),
    R43_recomputed_jacobian_shifted_coefficients:
      recomputedJacobianShiftedCoefficients.map(root.formatInterval),
    R43_second_x_coefficient_interval: root.formatInterval([0, 0]),
    R43_second_x_derivative_lowest_y_power:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
        .second_x_derivative_y_power,
    R43_second_x_kernel_identity:
      "partial_X^2 R43 = y^41 K_epsilon",
    R43_second_x_kernel_formula:
      "K_epsilon = 2/nu^2 - sin(delta_epsilon) - sin(phi_epsilon)",
    R43_second_x_kernel_y_power:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
        .second_x_derivative_y_power,
    R43_second_x_kernel_coefficients:
      secondXDerivativeKernelCoefficients.map(root.formatInterval),
    R43_second_x_kernel_delta_coefficient_seminorm_rho:
      kernelContinuousMajorant
        ?.R43_second_x_kernel_delta_coefficient_seminorm_rho ?? null,
    R43_second_x_kernel_phi_coefficient_seminorm_rho:
      kernelContinuousMajorant
        ?.R43_second_x_kernel_phi_coefficient_seminorm_rho ?? null,
    R43_second_x_kernel_speed_min:
      kernelContinuousMajorant?.R43_second_x_kernel_speed_min ?? null,
    R43_second_x_kernel_speed_term:
      kernelContinuousMajorant?.R43_second_x_kernel_speed_term ?? null,
    R43_second_x_kernel_continuous_majorant_formula:
      kernelContinuousMajorant
        ?.R43_second_x_kernel_continuous_majorant_formula ?? null,
    R43_second_x_kernel_continuous_majorant:
      kernelContinuousMajorant?.R43_second_x_kernel_continuous_majorant ??
      null,
    R43_jacobian_lipschitz_reduced_continuous_majorant_formula:
      kernelContinuousMajorant
        ?.R43_jacobian_lipschitz_reduced_continuous_majorant_formula ??
      null,
    R43_jacobian_lipschitz_reduced_continuous_majorant:
      kernelContinuousMajorant
        ?.R43_jacobian_lipschitz_reduced_continuous_majorant ?? null,
    R43_second_x_kernel_continuous_majorant_evaluation:
      kernelContinuousMajorant,
    R43_second_x_derivative_kernel_factor_y_power:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
        .second_x_derivative_y_power,
    R43_second_x_derivative_kernel_coefficients:
      secondXDerivativeKernelCoefficients.map(root.formatInterval),
    R43_second_x_derivative_shifted_coefficients:
      secondXDerivativeShiftedCoefficients.map(root.formatInterval),
    y_partial_y_R43_shifted_coefficients:
      rootTangentShiftedCoefficients.map(root.formatInterval),
    R43_shifted_prefix_pressure_diagnostic:
      shiftedPressureDiagnostic,
    R43_affine_center_form_candidate: affineCenterFormCandidate,
    R43_affine_center_shifted_coefficients:
      affineCenterFormCandidate.R43_affine_center_shifted_coefficients,
    R43_affine_center_shifted_pressures:
      affineCenterFormCandidate.R43_affine_center_shifted_pressures,
    R43_affine_center_shifted_prefix_majorant_outer_radius:
      affineCenterFormCandidate
        .R43_affine_center_shifted_prefix_majorant_outer_radius,
    R43_affine_center_certificate:
      affineCenterFormCandidate.R43_affine_center_certificate,
    coefficient_only_claim:
      "The h39 leading shifted source coefficient is affine in X at this order, the removable X-Jacobian row is explicit, and the second-X row starts at y^41. Continuous E_R, nu_J, L_J, and M_R still require a graph-centered polydisc evaluator with remainders.",
    certifies_continuous_polydisc_primitives: false,
  };
}

export function evaluateNGCoefficientRows({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branchInputs,
  shiftedOrder = 1,
} = {}) {
  assertCell(cell);
  if (!Array.isArray(branchInputs) || branchInputs.length !== 2) {
    throw new Error("branchInputs must contain the two fold-pair branches");
  }

  const shift = THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.n_g_shift;
  if (shift + shiftedOrder > context.seriesOrder) {
    throw new Error("seriesOrder is too small for the requested N_G shift");
  }

  const branchSeries = branchInputs.map((input) =>
    branchGSeries({
      context,
      cell,
      branch: input.branch,
      branchSign: input.branchSign,
      hIntervals: input.hIntervals,
      xInterval: input.xInterval ?? [0, 0],
    })
  );
  const pairG = context.add(branchSeries[0], branchSeries[1]);
  const pairD = transformedDSeries({ context, pairGSeries: pairG });
  const nGCoefficients = Array.from(
    { length: shiftedOrder + 1 },
    (_, index) => pairG[shift + index]
  );
  const nDCoefficients = Array.from(
    { length: shiftedOrder + 1 },
    (_, index) => pairD[shift + index]
  );
  const identityWitnesses = nDCoefficients.map((coefficient, index) =>
    root.addIntervals(
      coefficient,
      root.scaleInterval(nGCoefficients[index], 40 + index)
    )
  );

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-n-g-coefficient-rows-evaluated",
    evaluation_level: "coefficient-only",
    n_g_shift: shift,
    N_G_shifted_coefficients: nGCoefficients.map(root.formatInterval),
    N_D_shifted_coefficients: nDCoefficients.map(root.formatInterval),
    D_plus_40_plus_k_G_identity_witnesses:
      identityWitnesses.map(root.formatInterval),
    all_D_plus_40_plus_k_G_identity_witnesses_contain_zero:
      identityWitnesses.every(([left, right]) => left <= 0 && right >= 0),
    coefficient_only_claim:
      "The shifted coefficients are exact interval-series coefficients of the post-h38 numerator. A continuous M_G bound still requires a shared graph-centered polydisc evaluator with analytic remainder control.",
    certifies_continuous_polydisc_primitives: false,
  };
}

export function evaluateH39SharedDomainCoefficientCell({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branchInputs,
  shiftedOrder = 1,
  rho = null,
  sharedDomainSignature = null,
  r43CauchyOuterBound = null,
  r43CauchyOuterRadius = null,
  nGCauchyOuterBound = null,
  nGCauchyOuterRadius = null,
  jacobianCauchyOuterBound = null,
  jacobianCauchyOuterRadius = null,
  coordinateCauchyOuterRadius = null,
  coordinateJacobianOuterRadius = null,
  coordinateJacobianNumeratorOuterRadius = null,
  coordinateSourceEnvelopeCandidates = null,
  coordinateXOuterRadius = 0,
  denominatorCauchyOuterRadius = null,
  denominatorDeltaCauchyOuterBound = null,
  denominatorPhiCauchyOuterBound = null,
  denominatorJacobianAbsCauchyOuterBound = null,
  denominatorLMajorant = null,
  denominatorLowerPolynomialMajorant = null,
  denominatorSourceCoefficientAbs = 1,
  rhoX = null,
  rX = null,
} = {}) {
  if (!Array.isArray(branchInputs) || branchInputs.length !== 2) {
    throw new Error("branchInputs must contain the two fold-pair branches");
  }

  const centerSolves = branchInputs.map((input) =>
    solveH39CenterCoefficientRow({
      context,
      cell,
      branch: input.branch,
      branchSign: input.branchSign,
      hIntervals: input.hIntervals,
      solveSlopeInterval: input.solveSlopeInterval,
    })
  );
  const centeredBranchInputs = branchInputs.map((input, index) => ({
    ...input,
    xInterval:
      centerSolves[index].h39_center_numeric_interval ??
      centerSolves[index].h39_center_interval,
  }));
  const hRowProviderBranchReports = centeredBranchInputs.map((input) => {
    const dependencyTrace = Array.isArray(input.h_row_provider_dependency_trace)
      ? input.h_row_provider_dependency_trace
      : [];
    const dependencyWitness = input.h_row_dependency_witness ?? null;
    return {
      branch: input.branch,
      provider_kind:
        input.h_row_provider_kind ?? "direct-branch-input-no-provider-metadata",
      preserves_dependencies:
        input.h_row_provider_preserves_dependencies === true,
      dependency_trace_count: dependencyTrace.length,
      dependency_kinds: [
        ...new Set(
          dependencyTrace
            .map((trace) => trace?.dependency_kind)
            .filter(Boolean)
        ),
      ],
      h38_solve_target_policies: [
        ...new Set(
          dependencyTrace
            .map((trace) => trace?.h38_solve_target_policy)
            .filter(Boolean)
        ),
      ],
      terminal_h_index_sets: dependencyTrace
        .map((trace) => trace?.terminal_h_indexes)
        .filter(Array.isArray),
      source_cell_id: input.h_row_provider_source_cell_id ?? null,
      provenance_present: input.h_row_provider_provenance !== undefined,
      dependency_witness_present: dependencyWitness !== undefined,
      dependency_witness_kind: dependencyWitness?.witness_kind ?? null,
      provider_claim_boundary_candidate_only:
        input.h_row_provider_claim_boundary
          ?.certifies_shifted_R43_outer_bound === false &&
        input.h_row_provider_claim_boundary
          ?.certifies_directed_rounded_shared_domain === false &&
        input.h_row_provider_claim_boundary
          ?.certifies_continuous_polydisc_primitives === false &&
        input.h_row_provider_claim_boundary?.retained_branch === false,
      replay_kind: input.h_row_provider_replay_kind ?? null,
    };
  });
  const providerBackedBranchCount = hRowProviderBranchReports.filter(
    (report) => report.preserves_dependencies === true
  ).length;
  const hRowProviderReport = {
    status: "h39-h-row-provider-replay-boundary-report-emitted",
    provider_backed_branch_count: providerBackedBranchCount,
    provider_backed_all_branches:
      providerBackedBranchCount === centeredBranchInputs.length,
    branch_reports: hRowProviderBranchReports,
    provider_replay_claim:
      "Provider metadata is recorded as a dependency-preserving replay boundary only. It does not certify the shifted R43 outer bound, continuous primitive bounds, or retained branch status.",
    certifies_shifted_R43_outer_bound: false,
    certifies_directed_rounded_shared_domain: false,
    certifies_continuous_polydisc_primitives: false,
    retained_branch: false,
  };
  const sourceCertificateObstructions = [];
  let normalizedCoordinateSourceEnvelopeCandidates = [];
  try {
    normalizedCoordinateSourceEnvelopeCandidates =
      normalizeCoordinateSourceEnvelopeCandidates({
        coordinateCauchyOuterRadius,
        coordinateJacobianOuterRadius,
        coordinateJacobianNumeratorOuterRadius,
        coordinateSourceEnvelopeCandidates,
      });
  } catch (error) {
    sourceCertificateObstructions.push({
      source_family: "coordinate_cauchy_outer_bounds",
      status: "open-source-certificate-computation-error",
      message: error.message,
      candidate_obstructions: null,
    });
  }
  const wantsCoordinateCauchyOuterBounds =
    normalizedCoordinateSourceEnvelopeCandidates.length > 0;
  let coordinateCauchyOuterBounds = null;
  if (wantsCoordinateCauchyOuterBounds) {
    try {
      coordinateCauchyOuterBounds =
        computeH39CoordinateCauchyOuterBoundsProfileFromEnvelopeCandidates({
          context,
          cell,
          branchInputs: centeredBranchInputs,
          coordinateSourceEnvelopeCandidates:
            normalizedCoordinateSourceEnvelopeCandidates,
          xOuterRadius: coordinateXOuterRadius,
        });
    } catch (error) {
      sourceCertificateObstructions.push({
        source_family: "coordinate_cauchy_outer_bounds",
        status: "open-source-certificate-computation-error",
        message: error.message,
        candidate_obstructions:
          error.coordinateSourceEnvelopeObstructions ?? null,
      });
    }
  }
  const wantsDenominatorCauchyNGOuterBound =
    isProvided(denominatorCauchyOuterRadius) ||
    isProvided(denominatorDeltaCauchyOuterBound) ||
    isProvided(denominatorPhiCauchyOuterBound) ||
    isProvided(denominatorJacobianAbsCauchyOuterBound) ||
    isProvided(denominatorLMajorant) ||
    isProvided(denominatorLowerPolynomialMajorant);
  const denominatorCauchyNGOuterBound = wantsDenominatorCauchyNGOuterBound
    ? computeH39DenominatorCauchyNGOuterBoundCandidate({
        context,
        cell,
        branchInputs: centeredBranchInputs,
        rho,
        outerRadius: denominatorCauchyOuterRadius,
        deltaOuterBound: denominatorDeltaCauchyOuterBound,
        phiOuterBound: denominatorPhiCauchyOuterBound,
        jacobianAbsOuterBound: denominatorJacobianAbsCauchyOuterBound,
        lMajorant: denominatorLMajorant,
        lowerPolynomialMajorant: denominatorLowerPolynomialMajorant,
        sourceCoefficientAbs: denominatorSourceCoefficientAbs,
      })
    : null;
  const sourceCertificateReport =
    sharedDomainSignature !== null &&
    sharedDomainSignature !== undefined &&
    coordinateCauchyOuterBounds !== null &&
    denominatorCauchyNGOuterBound !== null
      ? buildH39EvaluatorSourceCertificateReport({
          coordinateCauchyOuterBounds,
          denominatorCauchyNGOuterBound,
          sharedDomainSignature,
        })
      : null;
  let kEpsilonBranchCoordinateWitnessSet = null;
  if (
    sharedDomainSignature !== null &&
    sharedDomainSignature !== undefined &&
    isProvided(rho) &&
    isProvided(denominatorCauchyOuterRadius) &&
    isProvided(denominatorDeltaCauchyOuterBound) &&
    isProvided(denominatorPhiCauchyOuterBound)
  ) {
    try {
      kEpsilonBranchCoordinateWitnessSet =
        buildH39KepsilonBranchCoordinateWitnessSet({
          context,
          cell,
          branchInputs: centeredBranchInputs,
          rho,
          outerRadius: denominatorCauchyOuterRadius,
          deltaOuterBound: denominatorDeltaCauchyOuterBound,
          phiOuterBound: denominatorPhiCauchyOuterBound,
          sharedDomainSignature,
        });
    } catch (error) {
      sourceCertificateObstructions.push({
        source_family: "K_epsilon_branch_coordinate_witness_set",
        status: "open-source-certificate-computation-error",
        message: error.message,
      });
    }
  }
  const graphRadiiWitness =
    isProvided(rhoX) || isProvided(rX)
      ? buildH39EvaluatorGraphRadiiWitness({
          rhoX,
          rX,
          sharedDomainSignature,
        })
      : null;
  const hasExplicitR43CauchyInput =
    isProvided(r43CauchyOuterBound) || isProvided(r43CauchyOuterRadius);
  const hasExplicitNGCauchyInput =
    isProvided(nGCauchyOuterBound) || isProvided(nGCauchyOuterRadius);
  const hasExplicitJacobianCauchyInput =
    isProvided(jacobianCauchyOuterBound) ||
    isProvided(jacobianCauchyOuterRadius);
  const resolvedR43CauchyOuterBound = hasExplicitR43CauchyInput
    ? r43CauchyOuterBound
    : coordinateCauchyOuterBounds?.r43_cauchy_outer_bound ?? null;
  const resolvedR43CauchyOuterRadius = hasExplicitR43CauchyInput
    ? r43CauchyOuterRadius
    : coordinateCauchyOuterBounds?.r43_cauchy_outer_radius ?? null;
  const resolvedR43CauchyTailShiftPower = hasExplicitR43CauchyInput
    ? THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift
    : (coordinateCauchyOuterBounds?.r43_cauchy_tail_shift_power ??
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift);
  const resolvedNGCauchyOuterBound = hasExplicitNGCauchyInput
    ? nGCauchyOuterBound
    : denominatorCauchyNGOuterBound?.n_g_cauchy_outer_bound ?? null;
  const resolvedNGCauchyOuterRadius = hasExplicitNGCauchyInput
    ? nGCauchyOuterRadius
    : isProvided(denominatorCauchyNGOuterBound?.n_g_cauchy_outer_bound)
      ? denominatorCauchyNGOuterBound?.n_g_cauchy_outer_radius
      : null;
  const resolvedJacobianCauchyOuterBound = hasExplicitJacobianCauchyInput
    ? jacobianCauchyOuterBound
    : coordinateCauchyOuterBounds?.jacobian_cauchy_outer_bound ?? null;
  const resolvedJacobianCauchyOuterRadius = hasExplicitJacobianCauchyInput
    ? jacobianCauchyOuterRadius
    : coordinateCauchyOuterBounds?.jacobian_cauchy_outer_radius ?? null;
  const r43Rows = centeredBranchInputs.map((input) =>
    evaluateR43CoefficientRows({
      context,
      cell,
      branch: input.branch,
      branchSign: input.branchSign,
      hIntervals: input.hIntervals,
      xInterval: input.xInterval,
      solveSlopeInterval: input.solveSlopeInterval,
      rho,
      shiftedOrder,
    })
  );
  const nGRow = evaluateNGCoefficientRows({
    context,
    cell,
    branchInputs: centeredBranchInputs,
    shiftedOrder,
  });
  const finitePrefixSummary = summarizeSharedDomainPrimitiveBounds({
    r43Rows,
    nGRows: [nGRow],
    rho,
    r43CauchyOuterBound: resolvedR43CauchyOuterBound,
    r43CauchyOuterRadius: resolvedR43CauchyOuterRadius,
    r43CauchyOuterBoundSource:
      !hasExplicitR43CauchyInput && coordinateCauchyOuterBounds
        ? coordinateCauchyOuterBounds.source_envelope_kind ===
          "affine-center-shifted-removable-r43-cauchy-outer-bound"
          ? "coordinate-affine-center-shifted-removable-r43-cauchy-outer-bound"
          : coordinateCauchyOuterBounds.source_envelope_kind ===
              "shifted-removable-r43-cauchy-outer-bound"
            ? "coordinate-shifted-removable-r43-cauchy-outer-bound"
            : "coordinate-source-residual-cauchy-outer-bound"
        : null,
    r43CauchyTailShiftPower: resolvedR43CauchyTailShiftPower,
    nGCauchyOuterBound: resolvedNGCauchyOuterBound,
    nGCauchyOuterRadius: resolvedNGCauchyOuterRadius,
    nGCauchyOuterBoundSource:
      !hasExplicitNGCauchyInput &&
      isProvided(denominatorCauchyNGOuterBound?.n_g_cauchy_outer_bound)
        ? "branch-denominator-cauchy-outer-bound"
        : null,
    jacobianCauchyOuterBound: resolvedJacobianCauchyOuterBound,
    jacobianCauchyOuterRadius: resolvedJacobianCauchyOuterRadius,
    jacobianCauchyOuterBoundSource:
      !hasExplicitJacobianCauchyInput && coordinateCauchyOuterBounds
        ? "coordinate-removable-jacobian-cauchy-outer-bound"
        : null,
  });

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-shared-domain-coefficient-cell-evaluated",
    evaluation_level: "coefficient-only",
    rho,
    shifted_order: shiftedOrder,
    shared_domain_signature: sharedDomainSignature,
    h39_center_solves: centerSolves,
    r43_rows: r43Rows,
    n_g_row: nGRow,
    coordinate_cauchy_outer_bounds_profile_candidate:
      coordinateCauchyOuterBounds,
    denominator_cauchy_n_g_outer_bound_candidate:
      denominatorCauchyNGOuterBound,
    source_certificate_obstructions: sourceCertificateObstructions,
    evaluator_source_certificate_report: sourceCertificateReport,
    h39_K_epsilon_branch_coordinate_witness_set:
      kEpsilonBranchCoordinateWitnessSet,
    graph_radii_witness: graphRadiiWitness,
    h_row_provider_report: hRowProviderReport,
    finite_prefix_summary: finitePrefixSummary,
    claim_boundary: {
      computes_h39_shared_domain_coefficient_prefixes: true,
      emits_directed_rounded_source_handoffs:
        sourceCertificateReport?.result
          ?.h39_evaluator_source_handoffs_certified === true,
      emits_K_epsilon_branch_coordinate_witness_set:
        kEpsilonBranchCoordinateWitnessSet?.result
          ?.h39_K_epsilon_branch_coordinate_witness_set === true,
      emits_graph_radii_witness:
        graphRadiiWitness?.result?.h39_graph_radii_witness === true,
      h_row_provider_backed_replay:
        hRowProviderReport.provider_backed_all_branches === true,
      certifies_directed_rounded_shared_domain: false,
      certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
        false,
      retained_branch: false,
    },
  };
}

function maxAbsFormattedInterval(intervalText) {
  const [left, right] = Array.isArray(intervalText)
    ? intervalText.map(Number)
    : intervalText
        .replace("[", "")
        .replace("]", "")
        .split(",")
        .map(Number);
  return Math.max(Math.abs(left), Math.abs(right));
}

export function summarizeSharedDomainPrimitiveBounds({
  r43Rows = [],
  nGRows = [],
  rho = null,
  r43CauchyOuterBound = null,
  r43CauchyOuterRadius = null,
  r43CauchyOuterBoundSource = null,
  r43CauchyTailShiftPower =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift,
  nGCauchyOuterBound = null,
  nGCauchyOuterRadius = null,
  nGCauchyOuterBoundSource = null,
  jacobianCauchyOuterBound = null,
  jacobianCauchyOuterRadius = null,
  jacobianCauchyOuterBoundSource = null,
} = {}) {
  const r43CenterCoefficients = r43Rows
    .map((row) => row.R43_center_coefficient_interval)
    .filter(Boolean);
  const nGCoefficients = nGRows
    .flatMap((row) => row.N_G_shifted_coefficients ?? [])
    .filter(Boolean);
  const r43CoefficientLists = r43Rows
    .map((row) =>
      row.R43_affine_center_certificate
        ?.leading_affine_center_zero_certified === true &&
      Array.isArray(row.R43_affine_center_shifted_coefficients) &&
      row.R43_affine_center_shifted_coefficients.length > 0
        ? row.R43_affine_center_shifted_coefficients
        : row.R43_shifted_coefficients ?? []
    )
    .filter((row) => row.length > 0);
  const r43FinitePrefixCoefficientSource =
    r43Rows.length > 0 &&
    r43Rows.every(
      (row) =>
        row.R43_affine_center_certificate
          ?.leading_affine_center_zero_certified === true &&
        Array.isArray(row.R43_affine_center_shifted_coefficients) &&
        row.R43_affine_center_shifted_coefficients.length > 0
    )
      ? "affine-center-actual-replay-leading-zero"
      : "center-interval-replay";
  const rhoProvided = rho !== null && rho !== undefined;
  const hasShiftedR43CauchyInputs =
    Number(r43CauchyTailShiftPower) === 0 &&
    hasCompleteCauchyOuterPair(
      "R43",
      r43CauchyOuterBound,
      r43CauchyOuterRadius,
      rho
    );
  const affineCenterSourceProfileCandidates =
    rhoProvided && r43Rows.length > 0
      ? r43Rows
          .filter(
            (row) =>
              row.R43_affine_center_certificate
                ?.leading_affine_center_zero_certified === true &&
              Array.isArray(row.R43_affine_center_shifted_coefficients) &&
              row.R43_affine_center_shifted_coefficients.length > 0
          )
          .map((row) =>
            computeH39AffineCenterShiftedR43SourceProfileCandidate({
              coefficients: row.R43_affine_center_shifted_coefficients,
              affineCenterCertificate: row.R43_affine_center_certificate,
              targetRadius: rho,
              r43ShiftedCauchyOuterBound: hasShiftedR43CauchyInputs
                ? r43CauchyOuterBound
                : null,
              r43ShiftedCauchyOuterRadius: hasShiftedR43CauchyInputs
                ? r43CauchyOuterRadius
                : null,
            })
          )
      : [];
  const yPartialCoefficientLists = r43Rows
    .map((row) => row.y_partial_y_R43_shifted_coefficients ?? [])
    .filter((row) => row.length > 0);
  const jacobianCoefficientLists = r43Rows
    .map((row) => row.R43_jacobian_shifted_coefficients ?? [])
    .filter((row) => row.length > 0);
  const secondXCoefficientLists = r43Rows
    .map((row) => row.R43_second_x_derivative_shifted_coefficients ?? [])
    .filter((row) => row.length > 0);
  const secondXKernelCoefficientLists = r43Rows
    .map(
      (row) =>
        row.R43_second_x_kernel_coefficients ??
        row.R43_second_x_derivative_kernel_coefficients ??
        []
    )
    .filter((row) => row.length > 0);
  const kernelContinuousMajorants = r43Rows
    .map((row) => row.R43_second_x_kernel_continuous_majorant)
    .filter((value) => Number.isFinite(Number(value)))
    .map(Number);
  const reducedLJContinuousMajorants = r43Rows
    .map((row) => row.R43_jacobian_lipschitz_reduced_continuous_majorant)
    .filter((value) => Number.isFinite(Number(value)))
    .map(Number);
  const secondXKernelFactorPower =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .second_x_derivative_y_power;
  const secondXRemainderProfileCandidates = r43Rows.map((row) =>
    computeH39R43SecondXKepsilonRemainderProfileCandidate({
      secondXKernelYPower:
        row.R43_second_x_kernel_y_power ??
        row.R43_second_x_derivative_kernel_factor_y_power ??
        secondXKernelFactorPower,
      candidateMKContinuousMajorant:
        row.R43_second_x_kernel_continuous_majorant,
      targetRadius: rho,
    })
  );
  const hasR43CauchyInputs = hasCompleteCauchyOuterPair(
    "R43",
    r43CauchyOuterBound,
    r43CauchyOuterRadius,
    rho
  );
  const hasNGCauchyInputs = hasCompleteCauchyOuterPair(
    "N_G",
    nGCauchyOuterBound,
    nGCauchyOuterRadius,
    rho
  );
  const hasJacobianCauchyInputs = hasCompleteCauchyOuterPair(
    "R43 Jacobian",
    jacobianCauchyOuterBound,
    jacobianCauchyOuterRadius,
    rho
  );
  const candidateLJFinitePrefix =
    rhoProvided && secondXCoefficientLists.length > 0
      ? Math.max(
          ...secondXCoefficientLists.map((coefficients) =>
            computeCoefficientPrefixMajorant(coefficients, rho)
          )
        )
      : null;
  const candidateMKFinitePrefix =
    rhoProvided && secondXKernelCoefficientLists.length > 0
      ? Math.max(
          ...secondXKernelCoefficientLists.map((coefficients) =>
            computeCoefficientPrefixMajorant(coefficients, rho)
          )
        )
      : null;
  const candidateLJFactoredFinitePrefix =
    rhoProvided && secondXKernelCoefficientLists.length > 0
      ? Math.max(
          ...secondXKernelCoefficientLists.map((coefficients) =>
            computeYPowerFactoredCoefficientPrefixMajorant(
              coefficients,
              rho,
              secondXKernelFactorPower
            )
          )
        )
      : null;
  const candidateERFinitePrefix =
    rhoProvided && r43CoefficientLists.length > 0
      ? Math.max(
          ...r43CoefficientLists.map((coefficients) =>
            computeCoefficientPrefixMajorant(coefficients, rho)
          )
        )
      : null;
  const candidateMRFinitePrefix =
    rhoProvided && yPartialCoefficientLists.length > 0
      ? Math.max(
          ...yPartialCoefficientLists.map((coefficients) =>
            computeCoefficientPrefixMajorant(coefficients, rho)
          )
        )
      : null;
  const candidateNuJFinitePrefix =
    rhoProvided && jacobianCoefficientLists.length > 0
      ? Math.min(
          ...jacobianCoefficientLists.map((coefficients) =>
            computeCoefficientPrefixFloor(coefficients, rho)
          )
        )
      : null;
  const candidateMKContinuousMajorant =
    kernelContinuousMajorants.length > 0
      ? Math.max(...kernelContinuousMajorants)
      : null;
  const candidateLJReducedContinuousMajorant =
    reducedLJContinuousMajorants.length > 0
      ? Math.max(...reducedLJContinuousMajorants)
      : null;
  const candidateMGFinitePrefix =
    rhoProvided && nGCoefficients.length > 0
      ? Math.max(
          ...nGRows.map((row) =>
            computeCoefficientPrefixMajorant(
              row.N_G_shifted_coefficients ?? [],
              rho,
              THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.n_g_shift
            )
          )
        )
      : null;
  const r43AnalyticRemainderProfileCandidates =
    hasR43CauchyInputs && r43CoefficientLists.length > 0
      ? hasShiftedR43CauchyInputs &&
        affineCenterSourceProfileCandidates.length === r43Rows.length
        ? affineCenterSourceProfileCandidates
        : r43CoefficientLists.map((coefficients) =>
            computeH39R43AnalyticRemainderProfileCandidate({
              coefficients,
              outerBound: r43CauchyOuterBound,
              outerRadius: r43CauchyOuterRadius,
              targetRadius: rho,
              shiftPower: r43CauchyTailShiftPower,
            })
          )
      : [];
  const nGAnalyticRemainderProfileCandidates =
    hasNGCauchyInputs && nGRows.length > 0
      ? nGRows
          .filter((row) => (row.N_G_shifted_coefficients ?? []).length > 0)
          .map((row) =>
            computeH39NGOuterBoundCandidateMG({
              nGShiftedCoefficients: row.N_G_shifted_coefficients,
              nGOuterBound: nGCauchyOuterBound,
              nGOuterRadius: nGCauchyOuterRadius,
              rho,
            })
          )
      : [];
  const jacobianAnalyticRemainderProfileCandidates =
    hasJacobianCauchyInputs && jacobianCoefficientLists.length > 0
      ? jacobianCoefficientLists.map((coefficients) =>
          computeH39JacobianAnalyticRemainderProfileCandidate({
            coefficients,
            outerBound: jacobianCauchyOuterBound,
            outerRadius: jacobianCauchyOuterRadius,
            targetRadius: rho,
          })
        )
      : [];
  const candidateERCauchyTailProfile = finiteMax(
    r43AnalyticRemainderProfileCandidates.map(
      (candidate) =>
        candidate.candidate_E_R_cauchy_tail_after_prefix_profile
    )
  );
  const candidateERPrefixPlusTailBound = finiteMax(
    r43AnalyticRemainderProfileCandidates.map(
      (candidate) => candidate.candidate_E_R_prefix_plus_tail_bound
    )
  );
  const candidateMRCauchyTailProfile = finiteMax(
    r43AnalyticRemainderProfileCandidates.map(
      (candidate) =>
        candidate.candidate_M_R_cauchy_tail_after_prefix_profile
    )
  );
  const candidateMRPrefixPlusTailBound = finiteMax(
    r43AnalyticRemainderProfileCandidates.map(
      (candidate) => candidate.candidate_M_R_prefix_plus_tail_bound
    )
  );
  const candidateMGCauchyTailProfile = finiteMax(
    nGAnalyticRemainderProfileCandidates.map(
      (candidate) => candidate.candidate_M_G_cauchy_tail_after_prefix
    )
  );
  const candidateMGPrefixPlusTailBound = finiteMax(
    nGAnalyticRemainderProfileCandidates.map(
      (candidate) => candidate.candidate_M_G_prefix_plus_tail_bound
    )
  );
  const candidateNuJCauchyTailLossProfile = finiteMax(
    jacobianAnalyticRemainderProfileCandidates.map(
      (candidate) => candidate.candidate_nu_J_cauchy_tail_loss_profile
    )
  );
  const candidateNuJPrefixPlusTailFloor = finiteMin(
    jacobianAnalyticRemainderProfileCandidates.map(
      (candidate) => candidate.candidate_nu_J_prefix_plus_tail_floor
    )
  );
  const finitePrefixPrimitiveScalarReplay =
    computeH39FinitePrefixPrimitiveScalarReplay({
      candidate_E_R_finite_prefix: candidateERFinitePrefix,
      candidate_nu_J_finite_prefix: candidateNuJFinitePrefix,
      candidate_L_J_reduced_continuous_majorant:
        candidateLJReducedContinuousMajorant,
      candidate_M_G_finite_prefix: candidateMGFinitePrefix,
      candidate_M_R_finite_prefix: candidateMRFinitePrefix,
    });
  const finitePrefixPrimitiveProfileScaleReplay =
    computeH39FinitePrefixPrimitiveProfileScaleReplay({
      candidate_E_R_finite_prefix: candidateERFinitePrefix,
      candidate_nu_J_finite_prefix: candidateNuJFinitePrefix,
      candidate_L_J_finite_prefix: candidateLJFactoredFinitePrefix,
      candidate_L_J_reduced_continuous_majorant:
        candidateLJReducedContinuousMajorant,
      candidate_M_G_finite_prefix: candidateMGFinitePrefix,
      candidate_M_R_finite_prefix: candidateMRFinitePrefix,
      centerResidualRemainderProfile: candidateERCauchyTailProfile,
      centerJacobianLowerRemainderProfile:
        candidateNuJCauchyTailLossProfile,
      mGRemainderProfile: candidateMGCauchyTailProfile,
      rootTangentNumeratorRemainderProfile:
        candidateMRCauchyTailProfile,
    });
  const fullCauchyPrimitiveVectorCandidate =
    computeH39FullCauchyPrimitiveVectorCandidate({
      candidate_E_R_prefix_plus_tail_bound:
        candidateERPrefixPlusTailBound,
      candidate_M_R_prefix_plus_tail_bound:
        candidateMRPrefixPlusTailBound,
      candidate_M_G_prefix_plus_tail_bound:
        candidateMGPrefixPlusTailBound,
      candidate_nu_J_prefix_plus_tail_floor:
        candidateNuJPrefixPlusTailFloor,
      candidate_L_J_reduced_continuous_majorant:
        candidateLJReducedContinuousMajorant,
      finitePrefixPrimitiveProfileScaleReplay,
      componentSources: {
        E_R: hasR43CauchyInputs
          ? r43CauchyOuterBoundSource ?? "explicit-r43-cauchy-outer-bound"
          : null,
        M_R: hasR43CauchyInputs
          ? r43CauchyOuterBoundSource ?? "explicit-r43-cauchy-outer-bound"
          : null,
        M_G: hasNGCauchyInputs
          ? nGCauchyOuterBoundSource ??
            "explicit-n-g-cauchy-outer-bound"
          : null,
        nu_J: hasJacobianCauchyInputs
          ? jacobianCauchyOuterBoundSource ??
            "explicit-jacobian-cauchy-outer-bound"
          : null,
        L_J:
          reducedLJContinuousMajorants.length > 0
            ? "kernel-continuous-majorant"
            : null,
      },
    });

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-shared-domain-coefficient-summary-emitted",
    evaluation_level: "coefficient-only",
    coefficient_row_count: r43Rows.length + nGRows.length,
    max_abs_R43_center_coefficient:
      r43CenterCoefficients.length === 0
        ? null
        : Math.max(...r43CenterCoefficients.map(maxAbsFormattedInterval)),
    max_abs_N_G_shifted_coefficient:
      nGCoefficients.length === 0
        ? null
        : Math.max(...nGCoefficients.map(maxAbsFormattedInterval)),
    candidate_E_R_finite_prefix: candidateERFinitePrefix,
    candidate_E_R_finite_prefix_coefficient_source:
      r43FinitePrefixCoefficientSource,
    R43_affine_center_source_profile_candidate_count:
      affineCenterSourceProfileCandidates.length,
    R43_affine_center_source_profile_tail_candidate_count:
      affineCenterSourceProfileCandidates.filter(
        (candidate) => candidate.shifted_outer_bound_supplied === true
      ).length,
    R43_affine_center_source_profile_candidates:
      affineCenterSourceProfileCandidates,
    R43_second_x_remainder_profile_candidates:
      secondXRemainderProfileCandidates,
    candidate_E_R_cauchy_tail_after_prefix_profile:
      candidateERCauchyTailProfile,
    candidate_E_R_prefix_plus_tail_bound:
      candidateERPrefixPlusTailBound,
    candidate_R43_outer_bound_source: hasR43CauchyInputs
      ? r43CauchyOuterBoundSource ?? "explicit-r43-cauchy-outer-bound"
      : "missing-r43-cauchy-outer-bound",
    candidate_R43_cauchy_tail_shift_power: hasR43CauchyInputs
      ? Number(r43CauchyTailShiftPower)
      : null,
    candidate_M_R_finite_prefix: candidateMRFinitePrefix,
    candidate_M_R_cauchy_tail_after_prefix_profile:
      candidateMRCauchyTailProfile,
    candidate_M_R_prefix_plus_tail_bound:
      candidateMRPrefixPlusTailBound,
    candidate_nu_J_finite_prefix: candidateNuJFinitePrefix,
    candidate_nu_J_cauchy_tail_loss_profile:
      candidateNuJCauchyTailLossProfile,
    candidate_nu_J_prefix_plus_tail_floor:
      candidateNuJPrefixPlusTailFloor,
    candidate_nu_J_outer_bound_source: hasJacobianCauchyInputs
      ? jacobianCauchyOuterBoundSource ??
        "explicit-jacobian-cauchy-outer-bound"
      : "missing-jacobian-cauchy-outer-bound",
    candidate_L_J_finite_prefix: candidateLJFinitePrefix,
    second_x_kernel_y_power: secondXKernelFactorPower,
    candidate_M_K_finite_prefix: candidateMKFinitePrefix,
    candidate_L_J_factored_finite_prefix: candidateLJFactoredFinitePrefix,
    candidate_L_J_from_kernel_factor_finite_prefix:
      candidateLJFactoredFinitePrefix,
    candidate_L_J_factor_identity_finite_prefix_holds:
      candidateLJFinitePrefix !== null &&
      candidateLJFactoredFinitePrefix !== null
        ? nearlyEqualNumbers(
            candidateLJFinitePrefix,
            candidateLJFactoredFinitePrefix
          )
        : null,
    candidate_M_K_continuous_elementary_majorant:
      candidateMKContinuousMajorant,
    candidate_M_K_continuous_majorant:
      candidateMKContinuousMajorant,
    candidate_L_J_reduced_continuous_elementary_majorant:
      candidateLJReducedContinuousMajorant,
    candidate_L_J_reduced_continuous_majorant:
      candidateLJReducedContinuousMajorant,
    candidate_L_J_reduced_continuous_majorant_source:
      reducedLJContinuousMajorants.length > 0
        ? "kernel-continuous-majorant"
        : null,
    candidate_M_G_finite_prefix: candidateMGFinitePrefix,
    candidate_M_G_cauchy_tail_after_prefix_profile:
      candidateMGCauchyTailProfile,
    candidate_M_G_prefix_plus_tail_bound:
      candidateMGPrefixPlusTailBound,
    candidate_N_G_outer_bound_source: hasNGCauchyInputs
      ? nGCauchyOuterBoundSource ?? "explicit-n-g-cauchy-outer-bound"
      : "missing-n-g-cauchy-outer-bound",
    candidate_R43_analytic_remainder_profile_candidates:
      r43AnalyticRemainderProfileCandidates,
    candidate_N_G_analytic_remainder_profile_candidates:
      nGAnalyticRemainderProfileCandidates,
    candidate_jacobian_analytic_remainder_profile_candidates:
      jacobianAnalyticRemainderProfileCandidates,
    candidate_finite_prefix_primitive_scalar_replay:
      finitePrefixPrimitiveScalarReplay,
    candidate_L_J_reduced_minus_finite_prefix_profile:
      finitePrefixPrimitiveProfileScaleReplay
        .candidate_L_J_reduced_minus_finite_prefix_profile,
    candidate_finite_prefix_primitive_profile_scale_replay:
      finitePrefixPrimitiveProfileScaleReplay,
    candidate_profile_scale_required_closes:
      finitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_required_closes,
    candidate_profile_scale_exact_fixed_radii_lambda_supremum:
      finitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_exact_fixed_radii_lambda_supremum,
    candidate_profile_scale_exact_fixed_radii_bottleneck_name:
      finitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_exact_fixed_radii_bottleneck_name,
    candidate_profile_scale_exact_fixed_radii_required_scale:
      finitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_exact_fixed_radii_required_scale,
    candidate_profile_scale_exact_fixed_radii_strict_headroom:
      finitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_exact_fixed_radii_strict_headroom,
    candidate_profile_scale_exact_fixed_radii_closes_required_scale:
      finitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_exact_fixed_radii_closes_required_scale,
    candidate_profile_scale_exact_fixed_radii_not_applicable_reason:
      finitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_exact_fixed_radii_not_applicable_reason,
    candidate_profile_scale_exact_fixed_radii_J_min_at_required_scale:
      finitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_exact_fixed_radii_J_min_at_required_scale,
    candidate_profile_scale_exact_fixed_radii_rouche_margin_at_required_scale:
      finitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_exact_fixed_radii_rouche_margin_at_required_scale,
    candidate_profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale:
      finitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale,
    candidate_profile_scale_exact_fixed_radii_required_scale_margin_closes:
      finitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_exact_fixed_radii_required_scale_margin_closes,
    candidate_profile_scale_exact_fixed_radii_required_scale_failed_margin_names:
      finitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_exact_fixed_radii_required_scale_failed_margin_names,
    candidate_h39_full_cauchy_primitive_profile_vector_status:
      finitePrefixPrimitiveProfileScaleReplay
        .candidate_h39_full_cauchy_primitive_profile_vector_status,
    candidate_h39_full_cauchy_primitive_profile_vector_complete:
      finitePrefixPrimitiveProfileScaleReplay
        .candidate_h39_full_cauchy_primitive_profile_vector_complete,
    candidate_h39_full_cauchy_primitive_profile_vector_missing_components:
      finitePrefixPrimitiveProfileScaleReplay
        .candidate_h39_full_cauchy_primitive_profile_vector_missing_components,
    candidate_h39_full_cauchy_primitive_vector_backend:
      fullCauchyPrimitiveVectorCandidate,
    candidate_h39_full_cauchy_primitive_vector_backend_status:
      fullCauchyPrimitiveVectorCandidate.status,
    candidate_h39_full_cauchy_primitive_vector_backend_ready:
      fullCauchyPrimitiveVectorCandidate.primitive_diagnostic_input_ready,
    candidate_h39_full_cauchy_primitive_vector_components:
      fullCauchyPrimitiveVectorCandidate
        .candidate_h39_full_cauchy_primitive_vector_components,
    candidate_h39_full_cauchy_primitive_vector_diagnostic_input:
      fullCauchyPrimitiveVectorCandidate.primitive_diagnostic_input,
    candidate_profile_direction_complete_for_shared_domain_closure:
      finitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_direction_complete_for_shared_domain_closure,
    E_R: null,
    nu_J: null,
    L_J: null,
    M_R: null,
    M_G: null,
    certifies_continuous_polydisc_primitives: false,
    first_successor:
      "upgrade coefficient-only rows into directed-rounded shared-domain E_R, nu_J, L_J, M_G, and M_R bounds with analytic remainders",
  };
}

function h38RowsFromArtifact(artifact) {
  const rows =
    artifact?.thirty_eighth_order_post_u_successor_coefficient_rows;
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error(
      "h38 artifact must contain thirty_eighth_order_post_u_successor_coefficient_rows"
    );
  }
  return rows;
}

function hRowProviderDependencyTrace(output) {
  return (
    output?.hRowDependencyTrace ??
    output?.h_row_dependency_trace ??
    output?.dependencyTrace ??
    output?.dependency_trace ??
    null
  );
}

function hRowProviderPreservesDependencies(output) {
  return (
    output?.hRowProviderPreservesDependencies === true ||
    output?.preservesDependencies === true ||
    output?.preserves_dependencies === true ||
    output?.h_row_provider_preserves_dependencies === true ||
    output?.dependency_preserving_h_row_provider === true
  );
}

function hRowProviderProvenance(output) {
  return (
    output?.hRowProviderProvenance ??
    output?.h_row_provider_provenance ??
    output?.providerProvenance ??
    output?.provider_provenance ??
    null
  );
}

function hRowProviderDependencyWitness(output) {
  return (
    output?.hRowDependencyWitness ??
    output?.h_row_dependency_witness ??
    output?.dependencyWitness ??
    output?.dependency_witness ??
    null
  );
}

function hRowProviderClaimBoundary(output) {
  return (
    output?.hRowProviderClaimBoundary ??
    output?.h_row_provider_claim_boundary ??
    output?.claimBoundary ??
    output?.claim_boundary ??
    null
  );
}

function normalizedHRowProviderClaimBoundary(boundary) {
  if (!boundary || typeof boundary !== "object") {
    throw new Error("hRowProvider must provide a candidate-only claim boundary");
  }
  const normalized = {
    certifies_shifted_R43_outer_bound:
      boundary.certifies_shifted_R43_outer_bound,
    certifies_directed_rounded_shared_domain:
      boundary.certifies_directed_rounded_shared_domain,
    certifies_continuous_polydisc_primitives:
      boundary.certifies_continuous_polydisc_primitives,
    retained_branch: boundary.retained_branch,
  };
  if (
    normalized.certifies_shifted_R43_outer_bound !== false ||
    normalized.certifies_directed_rounded_shared_domain !== false ||
    normalized.certifies_continuous_polydisc_primitives !== false ||
    normalized.retained_branch !== false
  ) {
    throw new Error("hRowProvider claim boundary must remain candidate-only");
  }
  return normalized;
}

function embeddedHRowProviderMetadataPresent(branchRow) {
  return [
    "dependency_preserving_h_row_provider",
    "h_row_provider_preserves_dependencies",
    "provider_kind",
    "h_row_provider_kind",
    "source_cell_id",
    "h_row_provider_source_cell_id",
    "h_row_provider_provenance",
    "h_row_dependency_trace",
    "h_row_dependency_witness",
    "h_row_provider_claim_boundary",
  ].some((key) => branchRow?.[key] !== undefined);
}

function embeddedHRowProviderOutput({ row, branchRow, branch, hCount }) {
  return {
    branch,
    hIntervals: hIntervalsFromBranchRow(branchRow, { hCount }),
    solveSlopeInterval: branchRow.h38_solve_slope_interval,
    providerKind: branchRow.h_row_provider_kind ?? branchRow.provider_kind,
    preservesDependencies:
      branchRow.h_row_provider_preserves_dependencies === true ||
      branchRow.dependency_preserving_h_row_provider === true,
    sourceCellId:
      branchRow.h_row_provider_source_cell_id ??
      branchRow.source_cell_id ??
      row.cell_id ??
      null,
    replayKind:
      branchRow.h_row_provider_replay_kind ??
      "h39-embedded-h-row-provider-replay",
    hRowProviderProvenance: branchRow.h_row_provider_provenance,
    hRowDependencyTrace: branchRow.h_row_dependency_trace,
    hRowDependencyWitness: branchRow.h_row_dependency_witness,
    hRowProviderClaimBoundary: branchRow.h_row_provider_claim_boundary,
  };
}

function normalizeHRowProviderBranchInput({
  providerOutput,
  row,
  branchRow,
  branch,
  hCount,
}) {
  if (!providerOutput || typeof providerOutput !== "object") {
    throw new Error("hRowProvider must return a branch input object");
  }
  const dependencyTrace = hRowProviderDependencyTrace(providerOutput);
  if (
    !hRowProviderPreservesDependencies(providerOutput) ||
    !Array.isArray(dependencyTrace) ||
    dependencyTrace.length === 0
  ) {
    throw new Error(
      "hRowProvider must provide a nonempty dependency trace and preserve dependencies"
    );
  }
  const hIntervals = providerOutput.hIntervals ?? providerOutput.h_intervals;
  if (!Array.isArray(hIntervals) || hIntervals.length < hCount) {
    throw new Error(
      "hRowProvider must provide a derived hIntervals view for replay"
    );
  }
  const providerProvenance = hRowProviderProvenance(providerOutput);
  if (providerProvenance === null || providerProvenance === undefined) {
    throw new Error("hRowProvider must provide provider provenance");
  }
  const dependencyWitness = hRowProviderDependencyWitness(providerOutput);
  if (dependencyWitness === null || dependencyWitness === undefined) {
    throw new Error("hRowProvider must provide a dependency witness");
  }
  const providerClaimBoundary = normalizedHRowProviderClaimBoundary(
    hRowProviderClaimBoundary(providerOutput)
  );
  const solveSlopeInterval =
    providerOutput.solveSlopeInterval ??
    providerOutput.solve_slope_interval ??
    branchRow.h38_solve_slope_interval;
  const providerKind =
    providerOutput.providerKind ??
    providerOutput.provider_kind ??
    "dependency-preserving-h-row-provider";
  return {
    branch: providerOutput.branch ?? branch,
    branchSign: providerOutput.branchSign ?? providerOutput.branch_sign,
    hIntervals: hIntervals.slice(0, hCount).map(numericInterval),
    solveSlopeInterval: numericInterval(solveSlopeInterval),
    dependency_preserving_h_row_provider: true,
    provider_kind: providerKind,
    source_cell_id:
      providerOutput.sourceCellId ??
      providerOutput.source_cell_id ??
      row.cell_id ??
      null,
    h_row_provider_kind: providerKind,
    h_row_provider_preserves_dependencies: true,
    h_row_provider_dependency_trace: dependencyTrace,
    h_row_provider_source_cell_id:
      providerOutput.sourceCellId ??
      providerOutput.source_cell_id ??
      row.cell_id ??
      null,
    h_row_provider_provenance: providerProvenance,
    h_row_dependency_trace: dependencyTrace,
    h_row_dependency_witness: dependencyWitness,
    h_row_provider_claim_boundary: providerClaimBoundary,
    h_row_provider_replay_kind:
      providerOutput.replayKind ??
      providerOutput.replay_kind ??
      "h39-row-replay",
  };
}

function branchInputsFromH38Row(row, { hRowProvider = null } = {}) {
  if (!Array.isArray(row?.branch_rows) || row.branch_rows.length !== 2) {
    throw new Error("h38 row must contain exactly two branch_rows");
  }
  return row.branch_rows.map((branchRow) => {
    const branch = branchRow.branch;
    if (typeof hRowProvider === "function") {
      const providerOutput = hRowProvider({
        cellId: row.cell_id ?? null,
        cell_id: row.cell_id ?? null,
        h38Row: row,
        h38_row: row,
        branchRow,
        branch_row: branchRow,
        branch,
        targetIndex: THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h39_index,
        target_index: THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h39_index,
        neededRows: [0, THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index],
        needed_rows: [0, THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index],
        replayKind: "h39-row-1",
        replay_kind: "h39-row-1",
      });
      return normalizeHRowProviderBranchInput({
        providerOutput,
        row,
        branchRow,
        branch,
        hCount: 39,
      });
    }
    if (embeddedHRowProviderMetadataPresent(branchRow)) {
      return normalizeHRowProviderBranchInput({
        providerOutput: embeddedHRowProviderOutput({
          row,
          branchRow,
          branch,
          hCount: 39,
        }),
        row,
        branchRow,
        branch,
        hCount: 39,
      });
    }
    return {
      branch,
      hIntervals: hIntervalsFromBranchRow(branchRow, { hCount: 39 }),
      solveSlopeInterval: numericInterval(branchRow.h38_solve_slope_interval),
      dependency_preserving_h_row_provider: false,
      provider_kind: "exported-independent-interval-snapshot",
      source_cell_id: row.cell_id ?? null,
      h_row_provider_kind: "exported-independent-interval-snapshot",
      h_row_provider_preserves_dependencies: false,
      h_row_provider_dependency_trace: [],
      h_row_provider_source_cell_id: row.cell_id ?? null,
      h_row_provider_provenance: "exported-h38-interval-snapshot",
      h_row_dependency_trace: [],
      h_row_dependency_witness: null,
      h_row_provider_claim_boundary: {
        certifies_shifted_R43_outer_bound: false,
        certifies_directed_rounded_shared_domain: false,
        certifies_continuous_polydisc_primitives: false,
        retained_branch: false,
      },
      h_row_provider_replay_kind: "h39-row-replay",
    };
  });
}

export function evaluateH39SharedDomainCoefficientRows({
  context = makeTheta3minusFirstYGdSeriesContext(),
  h38Rows,
  shiftedOrder = 1,
  rho = null,
  sharedDomainSignature = null,
  rowLimit = null,
  r43CauchyOuterBound = null,
  r43CauchyOuterRadius = null,
  nGCauchyOuterBound = null,
  nGCauchyOuterRadius = null,
  jacobianCauchyOuterBound = null,
  jacobianCauchyOuterRadius = null,
  coordinateCauchyOuterRadius = null,
  coordinateJacobianOuterRadius = null,
  coordinateJacobianNumeratorOuterRadius = null,
  coordinateSourceEnvelopeCandidates = null,
  coordinateXOuterRadius = 0,
  denominatorCauchyOuterRadius = null,
  denominatorDeltaCauchyOuterBound = null,
  denominatorPhiCauchyOuterBound = null,
  denominatorJacobianAbsCauchyOuterBound = null,
  denominatorLMajorant = null,
  denominatorLowerPolynomialMajorant = null,
  denominatorSourceCoefficientAbs = 1,
  rhoX = null,
  rX = null,
  hRowProvider = null,
} = {}) {
  if (!Array.isArray(h38Rows) || h38Rows.length === 0) {
    throw new Error("h38Rows must be a nonempty array");
  }
  const selectedRows =
    rowLimit === null || rowLimit === undefined
      ? h38Rows
      : h38Rows.slice(0, Number(rowLimit));

  return selectedRows.map((row, index) => {
    const coefficientCell = evaluateH39SharedDomainCoefficientCell({
      context,
      cell: cellFromCertificateRow(row),
      branchInputs: branchInputsFromH38Row(row, { hRowProvider }),
      shiftedOrder,
      rho,
      sharedDomainSignature,
      r43CauchyOuterBound,
      r43CauchyOuterRadius,
      nGCauchyOuterBound,
      nGCauchyOuterRadius,
      jacobianCauchyOuterBound,
      jacobianCauchyOuterRadius,
      coordinateCauchyOuterRadius,
      coordinateJacobianOuterRadius,
      coordinateJacobianNumeratorOuterRadius,
      coordinateSourceEnvelopeCandidates,
      coordinateXOuterRadius,
      denominatorCauchyOuterRadius,
      denominatorDeltaCauchyOuterBound,
      denominatorPhiCauchyOuterBound,
      denominatorJacobianAbsCauchyOuterBound,
      denominatorLMajorant,
      denominatorLowerPolynomialMajorant,
      denominatorSourceCoefficientAbs,
      rhoX,
      rX,
    });
    return {
      cell_id: row.cell_id ?? `h38-row.${index}`,
      speed_interval: row.speed_interval,
      first_y_cell: row.first_y_cell,
      h38_row_status: row.row_status ?? null,
      h39_coefficient_cell: coefficientCell,
      row_status: "h39-shared-domain-coefficient-row-evaluated",
    };
  });
}

function summarizeH39CoefficientRows({ rows, h38ValidationErrors = null }) {
  const cells = rows.map((row) => row.h39_coefficient_cell);
  const sourceCertificateObstructions = rows.flatMap((row) =>
    Array.isArray(row.h39_coefficient_cell?.source_certificate_obstructions)
      ? row.h39_coefficient_cell.source_certificate_obstructions.map(
          (obstruction) => ({
            cell_id: row.cell_id ?? null,
            ...obstruction,
          })
        )
      : []
  );
  const r43Rows = cells.flatMap((cell) => cell.r43_rows);
  const nGRows = cells.map((cell) => cell.n_g_row);
  const centerSolves = cells.flatMap((cell) => cell.h39_center_solves);
  const finitePrefixSummaries = cells.map((cell) => cell.finite_prefix_summary);
  const hRowProviderReports = rows
    .map((row) =>
      row.h39_coefficient_cell?.h_row_provider_report
        ? {
            cell_id: row.cell_id ?? null,
            ...row.h39_coefficient_cell.h_row_provider_report,
          }
        : null
    )
    .filter(Boolean);
  const hRowProviderBranchReports = hRowProviderReports.flatMap((report) =>
    (report.branch_reports ?? []).map((branchReport) => ({
      cell_id: report.cell_id,
      ...branchReport,
    }))
  );
  const hRowProviderKinds = [
    ...new Set(
      hRowProviderBranchReports
        .map((report) => report.provider_kind)
        .filter(Boolean)
    ),
  ];
  const hRowProviderSourceCellIds = [
    ...new Set(
      hRowProviderBranchReports
        .map((report) => report.source_cell_id)
        .filter(Boolean)
    ),
  ];
  const hRowProviderDependencyKinds = [
    ...new Set(
      hRowProviderBranchReports.flatMap(
        (report) => report.dependency_kinds ?? []
      )
    ),
  ];
  const hRowProviderH38SolveTargetPolicies = [
    ...new Set(
      hRowProviderBranchReports.flatMap(
        (report) => report.h38_solve_target_policies ?? []
      )
    ),
  ];
  const hRowProviderDependencyWitnessKinds = [
    ...new Set(
      hRowProviderBranchReports
        .map((report) => report.dependency_witness_kind)
        .filter(Boolean)
    ),
  ];
  const hRowProviderReplayKinds = [
    ...new Set(
      hRowProviderBranchReports
        .map((report) => report.replay_kind)
        .filter(Boolean)
    ),
  ];
  const hRowProviderTerminalHIndexSets = [
    ...new Map(
      hRowProviderBranchReports
        .flatMap((report) => report.terminal_h_index_sets ?? [])
        .filter(Array.isArray)
        .map((hIndexSet) => [JSON.stringify(hIndexSet), hIndexSet])
    ).values(),
  ];
  const hRowProviderBackedBranchCount = hRowProviderBranchReports.filter(
    (report) => report.preserves_dependencies === true
  ).length;
  const hRowProviderBackedCellCount = hRowProviderReports.filter(
    (report) => report.provider_backed_all_branches === true
  ).length;
  const candidateR43OuterBoundSources = [
    ...new Set(
      finitePrefixSummaries
        .map((summary) => summary.candidate_R43_outer_bound_source)
        .filter(Boolean)
    ),
  ];
  const candidateR43CauchyTailShiftPowers = [
    ...new Set(
      finitePrefixSummaries
        .map((summary) => summary.candidate_R43_cauchy_tail_shift_power)
        .filter((value) => value !== null && value !== undefined)
        .map(Number)
    ),
  ];
  const shiftedPressureDiagnostics = rows.flatMap((row) =>
    (row.h39_coefficient_cell?.r43_rows ?? [])
      .map((r43Row) => r43Row.R43_shifted_prefix_pressure_diagnostic)
      .filter(Boolean)
      .map((diagnostic) => ({
        cell_id: row.cell_id ?? null,
        ...diagnostic,
      }))
  );
  const affineCenterForms = rows.flatMap((row) =>
    (row.h39_coefficient_cell?.r43_rows ?? [])
      .map((r43Row) => r43Row.R43_affine_center_form_candidate)
      .filter(Boolean)
      .map((candidate) => ({
        cell_id: row.cell_id ?? null,
        ...candidate,
      }))
  );
  const affineCenterSourceProfiles = rows.flatMap((row) =>
    (
      row.h39_coefficient_cell?.finite_prefix_summary
        ?.R43_affine_center_source_profile_candidates ?? []
    ).map((candidate) => ({
      cell_id: row.cell_id ?? null,
      ...candidate,
    }))
  );
  const secondXRemainderProfiles = rows.flatMap((row) =>
    (
      row.h39_coefficient_cell?.finite_prefix_summary
        ?.R43_second_x_remainder_profile_candidates ?? []
    ).map((candidate) => ({
      cell_id: row.cell_id ?? null,
      ...candidate,
    }))
  );
  const dominantShiftedPressure = dominantPressureDiagnostic(
    shiftedPressureDiagnostics,
    "unreduced_shifted_prefix_majorant_outer_radius"
  );
  const dominantCenterEliminatedPressure = dominantPressureDiagnostic(
    shiftedPressureDiagnostics,
    "center_eliminated_shifted_prefix_majorant_outer_radius"
  );
  const dominantAffineIndependentIntervalPressure =
    dominantPressureDiagnostic(
      affineCenterForms,
      "independent_interval_center_eliminated_prefix_majorant_outer_radius"
    );
  const dominantAffineCenterShiftedPrefix =
    dominantPressureDiagnostic(
      affineCenterForms,
      "R43_affine_center_shifted_prefix_majorant_outer_radius"
    );
  const dominantAffineCenterSourceProfile =
    dominantPressureDiagnostic(
      affineCenterSourceProfiles,
      "candidate_E_R_finite_prefix"
    );
  const affineCenterLeadingZeroOpenForms = affineCenterForms.filter(
    (candidate) =>
      candidate.R43_affine_center_certificate
        ?.leading_affine_center_zero_certified !== true
  );
  const allDIdentityWitnessesContainZero = nGRows.every(
    (row) => row.all_D_plus_40_plus_k_G_identity_witnesses_contain_zero === true
  );
  const allCenteredLeadingR43ContainsZero = r43Rows.every((row) => {
    const interval = parseFormattedInterval(row.R43_center_coefficient_interval);
    return interval[0] <= 0 && interval[1] >= 0;
  });
  const jacobianClearances = r43Rows.map((row) =>
    intervalClearanceFromZero(
      parseFormattedInterval(row.R43_jacobian_coefficient_interval)
    )
  );
  const aggregateCandidateERFinitePrefix = finiteMax(
    finitePrefixSummaries.map(
      (summary) => summary.candidate_E_R_finite_prefix
    )
  );
  const aggregateCandidateMRFinitePrefix = finiteMax(
    finitePrefixSummaries.map(
      (summary) => summary.candidate_M_R_finite_prefix
    )
  );
  const aggregateCandidateNuJFinitePrefix = finiteMin(
    finitePrefixSummaries.map(
      (summary) => summary.candidate_nu_J_finite_prefix
    )
  );
  const aggregateCandidateLJReducedContinuousMajorant = finiteMax(
    finitePrefixSummaries.map(
      (summary) => summary.candidate_L_J_reduced_continuous_majorant
    )
  );
  const aggregateCandidateMGFinitePrefix = finiteMax(
    finitePrefixSummaries.map(
      (summary) => summary.candidate_M_G_finite_prefix
    )
  );
  const aggregateCandidateERCauchyTailProfile = finiteMax(
    finitePrefixSummaries.map(
      (summary) => summary.candidate_E_R_cauchy_tail_after_prefix_profile
    )
  );
  const aggregateCandidateERPrefixPlusTailBound = finiteMax(
    finitePrefixSummaries.map(
      (summary) => summary.candidate_E_R_prefix_plus_tail_bound
    )
  );
  const aggregateCandidateMRCauchyTailProfile = finiteMax(
    finitePrefixSummaries.map(
      (summary) => summary.candidate_M_R_cauchy_tail_after_prefix_profile
    )
  );
  const aggregateCandidateMRPrefixPlusTailBound = finiteMax(
    finitePrefixSummaries.map(
      (summary) => summary.candidate_M_R_prefix_plus_tail_bound
    )
  );
  const aggregateCandidateMGCauchyTailProfile = finiteMax(
    finitePrefixSummaries.map(
      (summary) => summary.candidate_M_G_cauchy_tail_after_prefix_profile
    )
  );
  const aggregateCandidateMGPrefixPlusTailBound = finiteMax(
    finitePrefixSummaries.map(
      (summary) => summary.candidate_M_G_prefix_plus_tail_bound
    )
  );
  const aggregateCandidateNuJCauchyTailLossProfile = finiteMax(
    finitePrefixSummaries.map(
      (summary) => summary.candidate_nu_J_cauchy_tail_loss_profile
    )
  );
  const aggregateCandidateNuJPrefixPlusTailFloor = finiteMin(
    finitePrefixSummaries.map(
      (summary) => summary.candidate_nu_J_prefix_plus_tail_floor
    )
  );
  const aggregateFinitePrefixPrimitiveScalarReplay =
    computeH39FinitePrefixPrimitiveScalarReplay({
      candidate_E_R_finite_prefix: aggregateCandidateERFinitePrefix,
      candidate_nu_J_finite_prefix: aggregateCandidateNuJFinitePrefix,
      candidate_L_J_reduced_continuous_majorant:
        aggregateCandidateLJReducedContinuousMajorant,
      candidate_M_G_finite_prefix: aggregateCandidateMGFinitePrefix,
      candidate_M_R_finite_prefix: aggregateCandidateMRFinitePrefix,
    });
  const aggregateCandidateLJFactoredFinitePrefix = finiteMax(
    finitePrefixSummaries.map(
      (summary) => summary.candidate_L_J_factored_finite_prefix
    )
  );
  const aggregateFinitePrefixPrimitiveProfileScaleReplay =
    computeH39FinitePrefixPrimitiveProfileScaleReplay({
      candidate_E_R_finite_prefix: aggregateCandidateERFinitePrefix,
      candidate_nu_J_finite_prefix: aggregateCandidateNuJFinitePrefix,
      candidate_L_J_finite_prefix:
        aggregateCandidateLJFactoredFinitePrefix,
      candidate_L_J_reduced_continuous_majorant:
        aggregateCandidateLJReducedContinuousMajorant,
      candidate_M_G_finite_prefix: aggregateCandidateMGFinitePrefix,
      candidate_M_R_finite_prefix: aggregateCandidateMRFinitePrefix,
      centerResidualRemainderProfile: aggregateCandidateERCauchyTailProfile,
      centerJacobianLowerRemainderProfile:
        aggregateCandidateNuJCauchyTailLossProfile,
      mGRemainderProfile: aggregateCandidateMGCauchyTailProfile,
      rootTangentNumeratorRemainderProfile:
        aggregateCandidateMRCauchyTailProfile,
    });

  return {
    h38_artifact_validation_error_count: Array.isArray(h38ValidationErrors)
      ? h38ValidationErrors.length
      : null,
    h38_artifact_valid: Array.isArray(h38ValidationErrors)
      ? h38ValidationErrors.length === 0
      : null,
    coefficient_row_count: rows.length,
    branch_coefficient_row_count: r43Rows.length,
    h_row_provider_report_count: hRowProviderReports.length,
    h_row_provider_backed_branch_count: hRowProviderBackedBranchCount,
    h_row_provider_backed_cell_count: hRowProviderBackedCellCount,
    h_row_provider_backed_all_cells:
      rows.length > 0 && hRowProviderBackedCellCount === rows.length,
    h_row_provider_kinds: hRowProviderKinds,
    h_row_provider_source_cell_ids: hRowProviderSourceCellIds,
    h_row_provider_dependency_kinds: hRowProviderDependencyKinds,
    h_row_provider_h38_solve_target_policies:
      hRowProviderH38SolveTargetPolicies,
    h_row_provider_dependency_witness_kinds:
      hRowProviderDependencyWitnessKinds,
    h_row_provider_replay_kinds: hRowProviderReplayKinds,
    h_row_provider_terminal_h_index_sets: hRowProviderTerminalHIndexSets,
    h_row_provider_dependency_trace_count: hRowProviderBranchReports.reduce(
      (sum, report) => sum + Number(report.dependency_trace_count ?? 0),
      0
    ),
    h_row_provider_dependency_state:
      hRowProviderBackedCellCount === rows.length && rows.length > 0
        ? "dependency-preserving-provider-backed-replay"
        : hRowProviderBackedBranchCount > 0
          ? "mixed-provider-and-snapshot-replay"
          : "independent-interval-snapshot-replay",
    source_certificate_obstruction_count:
      sourceCertificateObstructions.length,
    source_certificate_obstructions: sourceCertificateObstructions,
    first_source_certificate_obstruction:
      sourceCertificateObstructions[0] ?? null,
    candidate_R43_outer_bound_sources: candidateR43OuterBoundSources,
    candidate_R43_outer_bound_source:
      candidateR43OuterBoundSources.length === 1
        ? candidateR43OuterBoundSources[0]
        : candidateR43OuterBoundSources.length === 0
          ? null
          : "mixed-r43-outer-bound-sources",
    candidate_R43_cauchy_tail_shift_powers:
      candidateR43CauchyTailShiftPowers,
    candidate_R43_cauchy_tail_shift_power:
      candidateR43CauchyTailShiftPowers.length === 1
        ? candidateR43CauchyTailShiftPowers[0]
        : candidateR43CauchyTailShiftPowers.length === 0
          ? null
          : "mixed-r43-cauchy-tail-shift-powers",
    all_centered_leading_R43_coefficients_contain_zero:
      allCenteredLeadingR43ContainsZero,
    all_shifted_D_identity_witnesses_contain_zero:
      allDIdentityWitnessesContainZero,
    h39_center_interval_hull: intervalHullFromFormatted(
      centerSolves.map((solve) => solve.h39_center_interval)
    ),
    h39_jacobian_coefficient_interval_hull: intervalHullFromFormatted(
      r43Rows.map((row) => row.R43_jacobian_coefficient_interval)
    ),
    min_h39_jacobian_coefficient_clearance:
      finiteMin(jacobianClearances),
    max_abs_R43_center_coefficient: maxAbsFormattedIntervals(
      r43Rows.map((row) => row.R43_center_coefficient_interval)
    ),
    max_abs_R43_jacobian_coefficient: maxAbsFormattedIntervals(
      r43Rows.map((row) => row.R43_jacobian_coefficient_interval)
    ),
    max_abs_N_G_shifted_coefficient: finiteMax(
      finitePrefixSummaries.map(
        (summary) => summary.max_abs_N_G_shifted_coefficient
      )
    ),
    R43_shifted_prefix_pressure_diagnostic_count:
      shiftedPressureDiagnostics.length,
    R43_affine_center_form_candidate_count: affineCenterForms.length,
    all_R43_affine_center_forms_valid_through_requested_order:
      affineCenterForms.length > 0
        ? affineCenterForms.every(
            (candidate) =>
              candidate.affine_dependence_valid_through_requested_order ===
              true
          )
        : null,
    all_R43_affine_center_forms_zero_leading_symbolically:
      affineCenterForms.length > 0
        ? affineCenterForms.every(
            (candidate) =>
              candidate.center_relation_zeroes_leading_coefficient_symbolically ===
              true
          )
        : null,
    R43_affine_center_leading_zero_certified_count:
      affineCenterForms.filter(
        (candidate) =>
          candidate.R43_affine_center_certificate
            ?.leading_affine_center_zero_certified === true
      ).length,
    R43_affine_center_leading_zero_open_count:
      affineCenterLeadingZeroOpenForms.length,
    first_R43_affine_center_leading_zero_open:
      affineCenterLeadingZeroOpenForms.length > 0
        ? {
            cell_id: affineCenterLeadingZeroOpenForms[0].cell_id,
            branch: affineCenterLeadingZeroOpenForms[0].branch,
            center_relation: affineCenterLeadingZeroOpenForms[0]
              .center_relation,
            center_relation_interval:
              affineCenterLeadingZeroOpenForms[0]
                .center_relation_interval,
            center_replay_x_interval:
              affineCenterLeadingZeroOpenForms[0]
                .center_replay_x_interval,
            leading_source_at_zero_C_0:
              affineCenterLeadingZeroOpenForms[0]
                .leading_source_at_zero_C_0,
            leading_slope_used_S_0:
              affineCenterLeadingZeroOpenForms[0].leading_slope_used_S_0,
            leading_slope_source:
              affineCenterLeadingZeroOpenForms[0].leading_slope_source,
            leading_slope_clearance_positive:
              affineCenterLeadingZeroOpenForms[0]
                .R43_affine_center_certificate
                ?.leading_slope_clearance_positive,
            center_interval_contains_solve:
              affineCenterLeadingZeroOpenForms[0]
                .R43_affine_center_certificate
                ?.center_interval_contains_solve,
            requested_shifted_order_below_second_x_row:
              affineCenterLeadingZeroOpenForms[0]
                .R43_affine_center_certificate
                ?.requested_shifted_order_below_second_x_row,
            first_uncertified_numeric_step:
              affineCenterLeadingZeroOpenForms[0]
                .first_uncertified_numeric_step,
          }
        : null,
    R43_affine_center_form_numeric_bound_certified:
      affineCenterForms.length > 0
        ? affineCenterForms.every(
            (candidate) =>
              candidate.certifies_shifted_R43_outer_bound === true
          )
        : null,
    max_R43_affine_center_shifted_prefix_majorant_outer_radius:
      pressureDiagnosticValue(
        dominantAffineCenterShiftedPrefix,
        "R43_affine_center_shifted_prefix_majorant_outer_radius"
      ),
    dominant_R43_affine_center_shifted_prefix:
      dominantAffineCenterShiftedPrefix
        ? {
            cell_id: dominantAffineCenterShiftedPrefix.cell_id,
            branch: dominantAffineCenterShiftedPrefix.branch,
            outer_radius: dominantAffineCenterShiftedPrefix.outer_radius,
            shifted_order: dominantAffineCenterShiftedPrefix.shifted_order,
            R43_affine_center_shifted_prefix_majorant_outer_radius:
              dominantAffineCenterShiftedPrefix
                .R43_affine_center_shifted_prefix_majorant_outer_radius,
            dominant_R43_affine_center_shifted_pressure:
              dominantAffineCenterShiftedPrefix
                .dominant_R43_affine_center_shifted_pressure,
            candidate_bound_source:
              "affine-center actual replay finite prefix with certified leading zero",
            certifies_shifted_R43_outer_bound:
              dominantAffineCenterShiftedPrefix
                .certifies_shifted_R43_outer_bound,
          }
        : null,
    dominant_R43_affine_center_independent_interval_pressure:
      dominantAffineIndependentIntervalPressure
        ? {
            cell_id: dominantAffineIndependentIntervalPressure.cell_id,
            branch: dominantAffineIndependentIntervalPressure.branch,
            outer_radius: dominantAffineIndependentIntervalPressure.outer_radius,
            shifted_order:
              dominantAffineIndependentIntervalPressure.shifted_order,
            affine_dependence_valid_through_requested_order:
              dominantAffineIndependentIntervalPressure
                .affine_dependence_valid_through_requested_order,
            independent_interval_center_eliminated_prefix_majorant_outer_radius:
              dominantAffineIndependentIntervalPressure
                .independent_interval_center_eliminated_prefix_majorant_outer_radius,
            dominant_independent_interval_center_eliminated_row:
              dominantAffineIndependentIntervalPressure
                .dominant_independent_interval_center_eliminated_row,
            first_uncertified_numeric_step:
              dominantAffineIndependentIntervalPressure
                .first_uncertified_numeric_step,
          }
        : null,
    max_R43_shifted_prefix_pressure_outer_radius:
      pressureDiagnosticValue(
        dominantShiftedPressure,
        "unreduced_shifted_prefix_majorant_outer_radius"
      ),
    dominant_R43_shifted_prefix_pressure: dominantShiftedPressure
      ? {
          cell_id: dominantShiftedPressure.cell_id,
          branch: dominantShiftedPressure.branch,
          outer_radius: dominantShiftedPressure.outer_radius,
          shifted_order: dominantShiftedPressure.shifted_order,
          pressure_interpretation:
            dominantShiftedPressure.pressure_interpretation,
          leading_centered_coefficient_contains_zero:
            dominantShiftedPressure
              .leading_centered_coefficient_contains_zero,
          dominant_unreduced_shifted_pressure:
            dominantShiftedPressure.dominant_unreduced_shifted_pressure,
          requested_unreduced_shifted_pressure:
            dominantShiftedPressure.shifted_coefficient_pressures?.find(
              (pressure) =>
                pressure.shifted_index ===
                dominantShiftedPressure.shifted_order
            ) ?? null,
          dominant_unreduced_shifted_term_decomposition:
            dominantShiftedPressure.term_pressure_by_coefficient?.find(
              (termPressure) =>
                termPressure.shifted_index ===
                dominantShiftedPressure.dominant_unreduced_shifted_pressure
                  ?.shifted_index
            ) ?? null,
          requested_unreduced_shifted_term_decomposition:
            dominantShiftedPressure.term_pressure_by_coefficient?.find(
              (termPressure) =>
                termPressure.shifted_index ===
                dominantShiftedPressure.shifted_order
            ) ?? null,
        }
      : null,
    max_R43_center_eliminated_shifted_prefix_pressure_outer_radius:
      pressureDiagnosticValue(
        dominantCenterEliminatedPressure,
        "center_eliminated_shifted_prefix_majorant_outer_radius"
      ),
    dominant_R43_center_eliminated_shifted_prefix_pressure:
      dominantCenterEliminatedPressure
        ? {
            cell_id: dominantCenterEliminatedPressure.cell_id,
            branch: dominantCenterEliminatedPressure.branch,
            outer_radius: dominantCenterEliminatedPressure.outer_radius,
            shifted_order: dominantCenterEliminatedPressure.shifted_order,
            center_elimination_improvement_factor:
              dominantCenterEliminatedPressure
                .center_elimination_improvement_factor,
            center_elimination_reduces_pressure:
              dominantCenterEliminatedPressure
                .center_elimination_reduces_pressure,
            center_elimination_interval_warning:
              dominantCenterEliminatedPressure
                .center_elimination_interval_warning,
            dominant_center_eliminated_shifted_pressure:
              dominantCenterEliminatedPressure
                .dominant_center_eliminated_shifted_pressure,
          }
        : null,
    max_candidate_E_R_finite_prefix: aggregateCandidateERFinitePrefix,
    R43_affine_center_source_profile_candidate_count:
      affineCenterSourceProfiles.length,
    R43_affine_center_source_profile_tail_candidate_count:
      affineCenterSourceProfiles.filter(
        (candidate) => candidate.shifted_outer_bound_supplied === true
      ).length,
    all_R43_affine_center_source_profiles_tail_bearing:
      affineCenterSourceProfiles.length > 0
        ? affineCenterSourceProfiles.every(
            (candidate) => candidate.shifted_outer_bound_supplied === true
          )
        : null,
    max_R43_affine_center_source_profile_E_R_finite_prefix:
      finiteMax(
        affineCenterSourceProfiles.map(
          (candidate) => candidate.candidate_E_R_finite_prefix
        )
      ),
    max_R43_affine_center_source_profile_M_R_finite_prefix:
      finiteMax(
        affineCenterSourceProfiles.map(
          (candidate) => candidate.candidate_M_R_finite_prefix
        )
      ),
    max_R43_affine_center_source_profile_E_R_prefix_plus_tail_bound:
      finiteMax(
        affineCenterSourceProfiles.map(
          (candidate) => candidate.candidate_E_R_prefix_plus_tail_bound
        )
      ),
    max_R43_affine_center_source_profile_M_R_prefix_plus_tail_bound:
      finiteMax(
        affineCenterSourceProfiles.map(
          (candidate) => candidate.candidate_M_R_prefix_plus_tail_bound
        )
      ),
    dominant_R43_affine_center_source_profile:
      dominantAffineCenterSourceProfile
        ? {
            cell_id: dominantAffineCenterSourceProfile.cell_id,
            source_profile_kind:
              dominantAffineCenterSourceProfile.source_profile_kind,
            shifted_outer_bound_supplied:
              dominantAffineCenterSourceProfile.shifted_outer_bound_supplied,
            r43_cauchy_tail_shift_power:
              dominantAffineCenterSourceProfile.r43_cauchy_tail_shift_power,
            candidate_E_R_finite_prefix:
              dominantAffineCenterSourceProfile.candidate_E_R_finite_prefix,
            candidate_M_R_finite_prefix:
              dominantAffineCenterSourceProfile.candidate_M_R_finite_prefix,
            candidate_E_R_prefix_plus_tail_bound:
              dominantAffineCenterSourceProfile
                .candidate_E_R_prefix_plus_tail_bound,
            candidate_M_R_prefix_plus_tail_bound:
              dominantAffineCenterSourceProfile
                .candidate_M_R_prefix_plus_tail_bound,
            candidate_bound_source:
              dominantAffineCenterSourceProfile.candidate_bound_source,
          }
        : null,
    R43_second_x_remainder_profile_candidate_count:
      secondXRemainderProfiles.length,
    all_R43_second_x_remainder_profiles_separate_from_E_R_M_R:
      secondXRemainderProfiles.length > 0
        ? secondXRemainderProfiles.every(
            (candidate) =>
              candidate.included_in_candidate_E_R_prefix_plus_tail_bound ===
                false &&
              candidate.included_in_candidate_M_R_prefix_plus_tail_bound ===
                false
          )
        : null,
    max_R43_second_x_E_R_remainder_profile:
      finiteMax(
        secondXRemainderProfiles.map(
          (candidate) => candidate.candidate_E_R_second_x_remainder_profile
        )
      ),
    R43_second_x_remainder_profiles_with_missing_y_derivative_majorant_count:
      secondXRemainderProfiles.filter(
        (candidate) =>
          candidate.missing_second_x_y_derivative_majorant === true
      ).length,
    max_candidate_E_R_cauchy_tail_after_prefix_profile:
      aggregateCandidateERCauchyTailProfile,
    max_candidate_E_R_prefix_plus_tail_bound:
      aggregateCandidateERPrefixPlusTailBound,
    max_candidate_M_R_finite_prefix: aggregateCandidateMRFinitePrefix,
    max_candidate_M_R_cauchy_tail_after_prefix_profile:
      aggregateCandidateMRCauchyTailProfile,
    max_candidate_M_R_prefix_plus_tail_bound:
      aggregateCandidateMRPrefixPlusTailBound,
    min_candidate_nu_J_finite_prefix: aggregateCandidateNuJFinitePrefix,
    max_candidate_nu_J_cauchy_tail_loss_profile:
      aggregateCandidateNuJCauchyTailLossProfile,
    min_candidate_nu_J_prefix_plus_tail_floor:
      aggregateCandidateNuJPrefixPlusTailFloor,
    max_candidate_L_J_finite_prefix: finiteMax(
      finitePrefixSummaries.map(
        (summary) => summary.candidate_L_J_finite_prefix
      )
    ),
    max_candidate_M_K_finite_prefix: finiteMax(
      finitePrefixSummaries.map(
        (summary) => summary.candidate_M_K_finite_prefix
      )
    ),
    max_candidate_L_J_factored_finite_prefix:
      aggregateCandidateLJFactoredFinitePrefix,
    max_candidate_L_J_from_kernel_factor_finite_prefix: finiteMax(
      finitePrefixSummaries.map(
        (summary) => summary.candidate_L_J_factored_finite_prefix
      )
    ),
    max_candidate_M_K_continuous_elementary_majorant: finiteMax(
      finitePrefixSummaries.map(
        (summary) => summary.candidate_M_K_continuous_elementary_majorant
      )
    ),
    max_candidate_M_K_continuous_majorant: finiteMax(
      finitePrefixSummaries.map(
        (summary) => summary.candidate_M_K_continuous_majorant
      )
    ),
    max_candidate_L_J_reduced_continuous_elementary_majorant: finiteMax(
      finitePrefixSummaries.map(
        (summary) =>
          summary.candidate_L_J_reduced_continuous_elementary_majorant
      )
    ),
    max_candidate_L_J_reduced_continuous_majorant:
      aggregateCandidateLJReducedContinuousMajorant,
    all_candidate_L_J_factor_identities_hold:
      finitePrefixSummaries.length > 0
        ? finitePrefixSummaries.every(
            (summary) =>
              summary.candidate_L_J_factor_identity_finite_prefix_holds ===
              true
          )
        : null,
    max_candidate_M_G_finite_prefix: aggregateCandidateMGFinitePrefix,
    max_candidate_M_G_cauchy_tail_after_prefix_profile:
      aggregateCandidateMGCauchyTailProfile,
    max_candidate_M_G_prefix_plus_tail_bound:
      aggregateCandidateMGPrefixPlusTailBound,
    candidate_finite_prefix_primitive_scalar_replay:
      aggregateFinitePrefixPrimitiveScalarReplay,
    candidate_L_J_reduced_minus_finite_prefix_profile:
      aggregateFinitePrefixPrimitiveProfileScaleReplay
        .candidate_L_J_reduced_minus_finite_prefix_profile,
    candidate_finite_prefix_primitive_profile_scale_replay:
      aggregateFinitePrefixPrimitiveProfileScaleReplay,
    candidate_profile_scale_required_closes:
      aggregateFinitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_required_closes,
    candidate_profile_scale_status:
      aggregateFinitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_status,
    candidate_profile_scale_exact_fixed_radii_lambda_supremum:
      aggregateFinitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_exact_fixed_radii_lambda_supremum,
    candidate_profile_scale_exact_fixed_radii_bottleneck_name:
      aggregateFinitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_exact_fixed_radii_bottleneck_name,
    candidate_profile_scale_exact_fixed_radii_required_scale:
      aggregateFinitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_exact_fixed_radii_required_scale,
    candidate_profile_scale_exact_fixed_radii_strict_headroom:
      aggregateFinitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_exact_fixed_radii_strict_headroom,
    candidate_profile_scale_exact_fixed_radii_closes_required_scale:
      aggregateFinitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_exact_fixed_radii_closes_required_scale,
    candidate_profile_scale_exact_fixed_radii_not_applicable_reason:
      aggregateFinitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_exact_fixed_radii_not_applicable_reason,
    candidate_profile_scale_exact_fixed_radii_J_min_at_required_scale:
      aggregateFinitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_exact_fixed_radii_J_min_at_required_scale,
    candidate_profile_scale_exact_fixed_radii_rouche_margin_at_required_scale:
      aggregateFinitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_exact_fixed_radii_rouche_margin_at_required_scale,
    candidate_profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale:
      aggregateFinitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale,
    candidate_profile_scale_exact_fixed_radii_required_scale_margin_closes:
      aggregateFinitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_exact_fixed_radii_required_scale_margin_closes,
    candidate_profile_scale_exact_fixed_radii_required_scale_failed_margin_names:
      aggregateFinitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_scale_exact_fixed_radii_required_scale_failed_margin_names,
    candidate_h39_full_cauchy_primitive_profile_vector_status:
      aggregateFinitePrefixPrimitiveProfileScaleReplay
        .candidate_h39_full_cauchy_primitive_profile_vector_status,
    candidate_h39_full_cauchy_primitive_profile_vector_complete:
      aggregateFinitePrefixPrimitiveProfileScaleReplay
        .candidate_h39_full_cauchy_primitive_profile_vector_complete,
    candidate_h39_full_cauchy_primitive_profile_vector_missing_components:
      aggregateFinitePrefixPrimitiveProfileScaleReplay
        .candidate_h39_full_cauchy_primitive_profile_vector_missing_components,
    candidate_profile_direction_complete_for_shared_domain_closure:
      aggregateFinitePrefixPrimitiveProfileScaleReplay
        .candidate_profile_direction_complete_for_shared_domain_closure,
    candidate_finite_prefix_scalar_replay_closes:
      aggregateFinitePrefixPrimitiveScalarReplay.candidate_scalar_replay_closes,
    candidate_finite_prefix_scalar_replay_ratio:
      aggregateFinitePrefixPrimitiveScalarReplay
        .candidate_rouche_primitive_closure_ratio,
    candidate_finite_prefix_scalar_replay_rho_X:
      aggregateFinitePrefixPrimitiveScalarReplay.candidate_rho_X,
    candidate_finite_prefix_scalar_replay_r_X:
      aggregateFinitePrefixPrimitiveScalarReplay.candidate_r_X,
    second_x_kernel_y_power:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
        .second_x_derivative_y_power,
    second_x_derivative_lowest_y_power:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
        .second_x_derivative_y_power,
    certifies_continuous_polydisc_primitives: false,
    first_successor:
      "replace finite-prefix candidates with outward-rounded shared-domain E_R, nu_J, L_J, M_G, and M_R bounds with analytic remainders",
  };
}

export function buildH39SharedDomainCoefficientArtifact({
  h38Artifact,
  h38Rows,
  validateH38 = true,
  shiftedOrder = 1,
  seriesOrder = null,
  rho = null,
  sharedDomainSignature = null,
  rowLimit = null,
  includeRows = true,
  r43CauchyOuterBound = null,
  r43CauchyOuterRadius = null,
  nGCauchyOuterBound = null,
  nGCauchyOuterRadius = null,
  jacobianCauchyOuterBound = null,
  jacobianCauchyOuterRadius = null,
  coordinateCauchyOuterRadius = null,
  coordinateJacobianOuterRadius = null,
  coordinateJacobianNumeratorOuterRadius = null,
  coordinateSourceEnvelopeCandidates = null,
  coordinateXOuterRadius = 0,
  denominatorCauchyOuterRadius = null,
  denominatorDeltaCauchyOuterBound = null,
  denominatorPhiCauchyOuterBound = null,
  denominatorJacobianAbsCauchyOuterBound = null,
  denominatorLMajorant = null,
  denominatorLowerPolynomialMajorant = null,
  denominatorSourceCoefficientAbs = 1,
  rhoX = null,
  rX = null,
  hRowProvider = null,
} = {}) {
  const sourceRows = h38Rows ?? h38RowsFromArtifact(h38Artifact);
  const h38ValidationErrors =
    h38Artifact && validateH38 ? validateH38Artifact(h38Artifact) : null;
  const minimumSeriesOrder = Math.max(
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.default_series_order,
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
      Number(shiftedOrder),
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.n_g_shift +
      Number(shiftedOrder)
  );
  const context = makeTheta3minusFirstYGdSeriesContext({
    seriesOrder:
      seriesOrder === null || seriesOrder === undefined
        ? minimumSeriesOrder
        : Math.max(Number(seriesOrder), minimumSeriesOrder),
  });
  const rows = evaluateH39SharedDomainCoefficientRows({
    context,
    h38Rows: sourceRows,
    shiftedOrder,
    rho,
    sharedDomainSignature,
    rowLimit,
    r43CauchyOuterBound,
    r43CauchyOuterRadius,
    nGCauchyOuterBound,
    nGCauchyOuterRadius,
    jacobianCauchyOuterBound,
    jacobianCauchyOuterRadius,
    coordinateCauchyOuterRadius,
    coordinateJacobianOuterRadius,
    coordinateJacobianNumeratorOuterRadius,
    coordinateSourceEnvelopeCandidates,
    coordinateXOuterRadius,
    denominatorCauchyOuterRadius,
    denominatorDeltaCauchyOuterBound,
    denominatorPhiCauchyOuterBound,
    denominatorJacobianAbsCauchyOuterBound,
    denominatorLMajorant,
    denominatorLowerPolynomialMajorant,
    denominatorSourceCoefficientAbs,
    rhoX,
    rX,
    hRowProvider,
  });
  const summary = summarizeH39CoefficientRows({
    rows,
    h38ValidationErrors,
  });
  const primitiveVectorBackendArtifact =
    buildH39PrimitiveVectorBackendArtifactFromSummary(summary, {
      sourceSummaryKind: "h39-shared-domain-coefficient-summary",
    });
  const graphRadiiWitness =
    isProvided(rhoX) || isProvided(rX)
      ? buildH39EvaluatorGraphRadiiWitness({
          rhoX,
          rX,
          sharedDomainSignature,
        })
      : null;

  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_COEFFICIENT_ARTIFACT_SCHEMA,
    coefficient_engine_schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    packet_id:
      "theta3minus_fold_pair_first_y_gd_h39_shared_domain_coefficient_artifact",
    promotion_status:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.promotion_status,
    source_h38_row_key:
      "thirty_eighth_order_post_u_successor_coefficient_rows",
    coefficient_artifact_parameters: {
      speed_constraint:
        THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.no_speed_window,
      shifted_order: shiftedOrder,
      requested_series_order: seriesOrder,
      rho,
      shared_domain_signature: sharedDomainSignature,
      row_limit: rowLimit,
      r43_cauchy_outer_bound: r43CauchyOuterBound,
      r43_cauchy_outer_radius: r43CauchyOuterRadius,
      n_g_cauchy_outer_bound: nGCauchyOuterBound,
      n_g_cauchy_outer_radius: nGCauchyOuterRadius,
      jacobian_cauchy_outer_bound: jacobianCauchyOuterBound,
      jacobian_cauchy_outer_radius: jacobianCauchyOuterRadius,
      coordinate_cauchy_outer_radius: coordinateCauchyOuterRadius,
      coordinate_jacobian_outer_radius: coordinateJacobianOuterRadius,
      coordinate_jacobian_numerator_outer_radius:
        coordinateJacobianNumeratorOuterRadius,
      coordinate_source_envelope_candidates:
        coordinateSourceEnvelopeCandidates,
      coordinate_x_outer_radius: coordinateXOuterRadius,
      denominator_cauchy_outer_radius: denominatorCauchyOuterRadius,
      denominator_delta_cauchy_outer_bound:
        denominatorDeltaCauchyOuterBound,
      denominator_phi_cauchy_outer_bound:
        denominatorPhiCauchyOuterBound,
      denominator_jacobian_abs_cauchy_outer_bound:
        denominatorJacobianAbsCauchyOuterBound,
      denominator_l_majorant: denominatorLMajorant,
      denominator_lower_polynomial_majorant:
        denominatorLowerPolynomialMajorant,
      denominator_source_coefficient_abs:
        denominatorSourceCoefficientAbs,
      rho_X: rhoX,
      r_X: rX,
      h_row_provider_hook_supplied: typeof hRowProvider === "function",
      h38_rows_available: sourceRows.length,
      h38_rows_evaluated: rows.length,
      series_order: context.seriesOrder,
      first_y_cell_upper:
        THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.first_y_cell_upper,
      coefficient_only: true,
    },
    h39_shared_domain_coefficient_rows: includeRows ? rows : [],
    h39_shared_domain_coefficient_summary: summary,
    h39_primitive_vector_backend_artifact:
      primitiveVectorBackendArtifact,
    graph_radii_witness: graphRadiiWitness,
    claim_boundary: {
      assumes_fixed_speed_window: false,
      consumes_h38_successor_rows: true,
      computes_h39_shared_domain_coefficient_prefixes: true,
      certifies_h39_primitive_series_provenance_on_one_declared_coefficient_domain:
        true,
      emits_graph_radii_witness:
        graphRadiiWitness?.result?.h39_graph_radii_witness === true,
      h_row_provider_backed_replay:
        summary.h_row_provider_backed_all_cells === true,
      certifies_directed_rounded_shared_domain: false,
      certifies_directed_rounded_h39_polydisc_M_G_bound: false,
      certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound: false,
      certifies_directed_rounded_h39_jacobian_lower_bound: false,
      certifies_directed_rounded_h39_jacobian_lipschitz_bound: false,
      certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
        false,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_I1_regular_critical_exhaustion: false,
      retained_branch: false,
    },
    result: {
      theory_status:
        "h39-shared-domain-coefficient-artifact-emitted",
      retention: "not_retained",
      retained_branch: false,
      first_successor_row:
        "theta3minus.fold-pair-first-y-GD-h39-shared-domain-continuous-primitive-bounds-required",
      status_note:
        "The actual h38 branch rows now feed one h39 coefficient-domain evaluator for R43, its X Jacobian, y-partial row, N_G, and the correlated D identity. Continuous primitive bounds remain open.",
    },
  };
}

function findForbiddenSpeedBandFields(value, trail = "$", found = []) {
  if (value === null || typeof value !== "object") {
    return found;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      findForbiddenSpeedBandFields(item, `${trail}[${index}]`, found)
    );
    return found;
  }
  for (const [key, child] of Object.entries(value)) {
    const childTrail = `${trail}.${key}`;
    if (
      key === "speed_band" ||
      key === "speed_window" ||
      key === "speed_min" ||
      key === "speed_max"
    ) {
      found.push(childTrail);
    }
    findForbiddenSpeedBandFields(child, childTrail, found);
  }
  return found;
}

function assertValidationField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateH39SharedDomainCoefficientArtifact(artifact) {
  const errors = [];
  const summary = artifact?.h39_shared_domain_coefficient_summary ?? {};
  const rows = artifact?.h39_shared_domain_coefficient_rows ?? [];
  const forbiddenSpeedFields = findForbiddenSpeedBandFields(artifact);

  assertValidationField(
    forbiddenSpeedFields.length === 0,
    `h39 coefficient artifact must not contain speed-band fields: ${forbiddenSpeedFields.join(
      ", "
    )}`,
    errors
  );
  assertValidationField(
    artifact?.schema ===
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_COEFFICIENT_ARTIFACT_SCHEMA,
    "schema must match h39 shared-domain coefficient artifact schema",
    errors
  );
  assertValidationField(
    artifact?.coefficient_engine_schema ===
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    "coefficient engine schema must match h39 shared-domain evaluator schema",
    errors
  );
  assertValidationField(
    artifact?.promotion_status ===
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.promotion_status,
    "promotion status must remain priority-only",
    errors
  );
  assertValidationField(
    artifact?.coefficient_artifact_parameters?.speed_constraint ===
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.no_speed_window &&
      artifact?.claim_boundary?.assumes_fixed_speed_window === false,
    "h39 coefficient artifact must not impose a fixed speed window",
    errors
  );
  assertValidationField(
    artifact?.coefficient_artifact_parameters?.coefficient_only === true &&
      artifact?.claim_boundary?.computes_h39_shared_domain_coefficient_prefixes ===
        true &&
      artifact?.claim_boundary
        ?.certifies_h39_primitive_series_provenance_on_one_declared_coefficient_domain ===
        true,
    "h39 coefficient artifact must identify coefficient-only provenance",
    errors
  );
  assertValidationField(
    artifact?.claim_boundary?.certifies_directed_rounded_shared_domain ===
      false &&
      artifact?.claim_boundary
        ?.certifies_directed_rounded_h39_polydisc_M_G_bound === false &&
      artifact?.claim_boundary
        ?.certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound ===
        false &&
      artifact?.claim_boundary
        ?.certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound ===
        false &&
      artifact?.claim_boundary?.retained_branch === false,
    "h39 coefficient artifact must not certify shared-domain, continuous tail, or retention closure",
    errors
  );
  assertValidationField(
    summary.certifies_continuous_polydisc_primitives === false &&
      artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false,
    "h39 coefficient summary and result must remain not retained and not continuous",
    errors
  );
  assertValidationField(
    summary.candidate_finite_prefix_primitive_profile_scale_replay ===
      undefined ||
      (summary.candidate_finite_prefix_primitive_profile_scale_replay
        ?.certifies_continuous_polydisc_primitives === false &&
        summary.candidate_finite_prefix_primitive_profile_scale_replay
          ?.certifies_directed_rounded_shared_domain === false &&
        summary.candidate_finite_prefix_primitive_profile_scale_replay
          ?.retained_branch === false),
    "h39 profile-scale replay must remain candidate-only and not retained",
    errors
  );
  assertValidationField(
    summary.candidate_h39_full_cauchy_primitive_profile_vector_status ===
      undefined ||
      [
        "h39-full-cauchy-primitive-profile-vector-candidate-incomplete",
        "h39-full-cauchy-primitive-profile-vector-candidate-scale-inequalities-open",
        "h39-full-cauchy-primitive-profile-vector-candidate-closes",
      ].includes(
        summary.candidate_h39_full_cauchy_primitive_profile_vector_status
      ),
    "h39 profile vector status must be a candidate-only status",
    errors
  );
  const primitiveVectorBackend =
    artifact?.h39_primitive_vector_backend_artifact;
  const expectedPrimitiveVectorBackend =
    buildH39PrimitiveVectorBackendArtifactFromSummary(summary, {
      sourceSummaryKind: "h39-shared-domain-coefficient-summary",
    });
  assertValidationField(
    primitiveVectorBackend?.schema ===
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_PRIMITIVE_VECTOR_BACKEND_ARTIFACT_SCHEMA &&
      primitiveVectorBackend?.promotion_status ===
        THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.promotion_status,
    "h39 primitive vector backend artifact must have the expected schema and priority-only status",
    errors
  );
  assertValidationField(
    JSON.stringify(primitiveVectorBackend?.candidate_primitive_vector) ===
      JSON.stringify(expectedPrimitiveVectorBackend.candidate_primitive_vector) &&
      JSON.stringify(primitiveVectorBackend?.missing_candidate_components) ===
        JSON.stringify(
          expectedPrimitiveVectorBackend.missing_candidate_components
        ) &&
      primitiveVectorBackend?.profile_vector_backend_status ===
        expectedPrimitiveVectorBackend.profile_vector_backend_status &&
      primitiveVectorBackend?.profile_vector_status ===
        expectedPrimitiveVectorBackend.profile_vector_status,
    "h39 primitive vector backend artifact must match the coefficient summary vector fields",
    errors
  );
  const primitiveVectorClaim =
    primitiveVectorBackend?.claim_boundary ?? {};
  assertValidationField(
    primitiveVectorClaim.constructs_h39_primitive_vector_backend_artifact ===
      true &&
      primitiveVectorClaim.verifies_primitive_bounds_provenance === false &&
      primitiveVectorClaim.certifies_continuous_polydisc_primitives ===
        false &&
      primitiveVectorClaim.certifies_directed_rounded_shared_domain ===
        false &&
      primitiveVectorClaim.certifies_directed_rounded_h39_polydisc_M_G_bound ===
        false &&
      primitiveVectorClaim.certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound ===
        false &&
      primitiveVectorClaim.certifies_directed_rounded_h39_jacobian_lower_bound ===
        false &&
      primitiveVectorClaim.certifies_directed_rounded_h39_jacobian_lipschitz_bound ===
        false &&
      primitiveVectorClaim.certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound ===
        false &&
      primitiveVectorClaim.certifies_directed_rounded_fold_pair_scaled_remainder ===
        false &&
      primitiveVectorClaim.certifies_I1_regular_critical_exhaustion ===
        false &&
      primitiveVectorClaim.retained_branch === false &&
      primitiveVectorBackend?.result?.retention === "not_retained" &&
      primitiveVectorBackend?.result?.retained_branch === false,
    "h39 primitive vector backend artifact must remain candidate-only and not retained",
    errors
  );
  const coefficientParameters =
    artifact?.coefficient_artifact_parameters ?? {};
  const graphRadiiWitness = artifact?.graph_radii_witness ?? null;
  const hasGraphRadiiParameters =
    isProvided(coefficientParameters.rho_X) ||
    isProvided(coefficientParameters.r_X);
  let expectedGraphRadiiWitness = null;
  if (hasGraphRadiiParameters) {
    try {
      expectedGraphRadiiWitness = buildH39EvaluatorGraphRadiiWitness({
        rhoX: coefficientParameters.rho_X,
        rX: coefficientParameters.r_X,
        sharedDomainSignature:
          coefficientParameters.shared_domain_signature,
      });
    } catch (error) {
      errors.push(
        `h39 graph-radii witness could not be rebuilt: ${error.message}`
      );
    }
  }
  assertValidationField(
    hasGraphRadiiParameters
      ? JSON.stringify(graphRadiiWitness) ===
          JSON.stringify(expectedGraphRadiiWitness)
      : graphRadiiWitness === null,
    "h39 coefficient artifact graph-radii witness must match the declared rho_X and r_X parameters",
    errors
  );
  assertValidationField(
    hasGraphRadiiParameters
      ? artifact?.claim_boundary?.emits_graph_radii_witness ===
          (graphRadiiWitness?.result?.h39_graph_radii_witness === true)
      : artifact?.claim_boundary?.emits_graph_radii_witness === false,
    "h39 coefficient artifact graph-radii witness claim boundary must match the witness result",
    errors
  );

  if (rows.length > 0) {
    const hRowProviderReports = rows
      .map((row) => row.h39_coefficient_cell?.h_row_provider_report)
      .filter(Boolean);
    const hRowProviderBranchReports = hRowProviderReports.flatMap(
      (report) => report.branch_reports ?? []
    );
    const providerBackedBranchCount = hRowProviderBranchReports.filter(
      (report) => report.preserves_dependencies === true
    ).length;
    const providerBackedCellCount = hRowProviderReports.filter(
      (report) => report.provider_backed_all_branches === true
    ).length;
    assertValidationField(
      hRowProviderReports.every(
        (report) =>
          report.certifies_shifted_R43_outer_bound === false &&
          report.certifies_directed_rounded_shared_domain === false &&
          report.certifies_continuous_polydisc_primitives === false &&
          report.retained_branch === false
      ),
      "h39 h-row provider reports must remain candidate-only and not retained",
      errors
    );
    assertValidationField(
      rows.every((row) => {
        const report = row.h39_coefficient_cell?.h_row_provider_report;
        return (
          !report ||
          row.h39_coefficient_cell?.claim_boundary
            ?.h_row_provider_backed_replay ===
            (report.provider_backed_all_branches === true)
        );
      }),
      "h39 h-row provider replay claim boundary must match provider report",
      errors
    );
    assertValidationField(
      hRowProviderBranchReports.every(
        (report) =>
          report.preserves_dependencies !== true ||
          (Number(report.dependency_trace_count) > 0 &&
            report.provenance_present === true &&
            report.dependency_witness_present === true &&
            report.provider_claim_boundary_candidate_only === true)
      ),
      "h39 h-row provider-backed branch reports must carry trace, provenance, witness, and candidate-only boundary",
      errors
    );
    assertValidationField(
      summary.h_row_provider_report_count === hRowProviderReports.length &&
        summary.h_row_provider_backed_branch_count ===
          providerBackedBranchCount &&
        summary.h_row_provider_backed_cell_count ===
          providerBackedCellCount &&
        summary.h_row_provider_backed_all_cells ===
          (providerBackedCellCount === rows.length),
      "h39 h-row provider summary must match emitted provider reports",
      errors
    );
    assertValidationField(
      artifact?.claim_boundary?.h_row_provider_backed_replay ===
        (summary.h_row_provider_backed_all_cells === true),
      "h39 h-row provider artifact claim boundary must match provider summary",
      errors
    );
    assertValidationField(
      summary.coefficient_row_count === rows.length,
      "summary coefficient row count must equal emitted row count",
      errors
    );
    assertValidationField(
      rows.every(
        (row) =>
          row.row_status === "h39-shared-domain-coefficient-row-evaluated" &&
          row.h39_coefficient_cell?.claim_boundary
            ?.certifies_directed_rounded_shared_domain === false
      ),
      "every emitted h39 coefficient row must remain coefficient-only",
      errors
    );
    assertValidationField(
      summary.all_centered_leading_R43_coefficients_contain_zero === true &&
        summary.all_shifted_D_identity_witnesses_contain_zero === true,
      "emitted h39 rows must preserve centered R43 zero containment and shifted D identity witnesses",
      errors
    );
  }

  return errors;
}

function parseNumberArg(name, value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`${name} must be numeric`);
  }
  return parsed;
}

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--h38-artifact") {
      options.h38Artifact = argv[++index];
    } else if (arg === "--out") {
      options.out = argv[++index];
    } else if (arg === "--validate") {
      options.validate = argv[++index];
    } else if (arg === "--row-limit") {
      options.rowLimit = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--shifted-order") {
      options.shiftedOrder = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--series-order") {
      options.seriesOrder = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--rho") {
      options.rho = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--no-rows") {
      options.includeRows = false;
    } else if (arg === "--pretty") {
      options.pretty = true;
    } else if (arg === "--schema") {
      options.schema = true;
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return options;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/theta3minus-fold-pair-first-y-gd-shared-domain-evaluator.mjs [options]",
    "",
    "Options:",
    "  --h38-artifact <path>  Read an existing h38 successor coefficient artifact JSON",
    "  --out <path>           Write h39 coefficient artifact JSON",
    "  --validate <path>      Validate an emitted h39 coefficient artifact JSON",
    "  --row-limit <n>        Evaluate only the first n h38 rows",
    "  --shifted-order <n>    Number of shifted coefficients after the h39 leading row",
    "  --series-order <n>     Override the interval-series order when sweeping deeper prefixes",
    "  --rho <n>              Radius used for finite-prefix candidate seminorms",
    "  --no-rows              Omit per-cell coefficient rows from output",
    "  --pretty               Pretty-print JSON output",
    "  --schema               Print artifact schema metadata",
  ].join("\n");
}

function writeJson(value, outPath, pretty) {
  const output = `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`;
  if (outPath) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, output);
  } else {
    process.stdout.write(output);
  }
}

function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    console.error(usage());
    process.exitCode = 1;
    return;
  }

  if (options.schema) {
    writeJson(
      {
        evaluator_schema:
          THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
        artifact_schema:
          THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_COEFFICIENT_ARTIFACT_SCHEMA,
        promotion_status:
          THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.promotion_status,
      },
      null,
      options.pretty
    );
    return;
  }

  if (options.validate) {
    const artifact = JSON.parse(fs.readFileSync(options.validate, "utf8"));
    const errors = validateH39SharedDomainCoefficientArtifact(artifact);
    writeJson(
      {
        valid: errors.length === 0,
        errors,
        retained_branch: artifact?.result?.retained_branch ?? null,
      },
      null,
      options.pretty
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  if (!options.h38Artifact) {
    console.error("--h38-artifact is required unless --schema or --validate is used");
    console.error(usage());
    process.exitCode = 1;
    return;
  }

  try {
    const h38Artifact = JSON.parse(fs.readFileSync(options.h38Artifact, "utf8"));
    const artifact = buildH39SharedDomainCoefficientArtifact({
      h38Artifact,
      shiftedOrder: options.shiftedOrder ?? 1,
      seriesOrder: options.seriesOrder ?? null,
      rho: options.rho ?? null,
      rowLimit: options.rowLimit ?? null,
      includeRows: options.includeRows !== false,
    });
    const errors = validateH39SharedDomainCoefficientArtifact(artifact);
    if (errors.length > 0) {
      throw new Error(`artifact validation failed: ${errors.join("; ")}`);
    }
    writeJson(artifact, options.out, options.pretty);
  } catch (error) {
    console.error(error.stack ?? error.message);
    process.exitCode = 1;
  }
}

if (process.argv[1] === SCRIPT_PATH) {
  main();
}

#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_ROOT_TANGENT_CAUCHY_MAJORANT_TAIL_BUDGET_SCHEMA as H39_REDUCER_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget as buildH39Reducer,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget as validateH39Reducer,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-root-tangent-cauchy-majorant-tail-budget.mjs";
import {
  theta3minusFoldPairScaledRootTubeCellInternals as root,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const H39_SHARED_DOMAIN_PRIMITIVE_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic/v1";
export const H39_SHARED_DOMAIN_PRIMITIVE_PROVENANCE_CERTIFICATE_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-provenance-certificate/v1";
export const H39_CANDIDATE_PRIMITIVE_PROVENANCE_REPORT_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-candidate-primitive-provenance-report/v1";
export const H39_PRIMITIVE_PROVENANCE_WITNESS_SET_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-primitive-provenance-witness-set/v1";
export const H39_LJ_KERNEL_WITNESS_SUBSET_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-L_J-kernel-witness-subset/v1";
export const H39_R43_SOURCE_FAMILY_WITNESS_SUBSET_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-R43-source-family-witness-subset/v1";
export const H39_NG_NUMERATOR_WITNESS_SUBSET_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-N_G-numerator-witness-subset/v1";
export const H39_NG_DENOMINATOR_CAUCHY_MG_WITNESS_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-N_G-denominator-cauchy-M_G-witness/v1";
export const H39_JACOBIAN_FLOOR_WITNESS_SUBSET_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-jacobian-floor-witness-subset/v1";
export const H39_COORDINATE_CAUCHY_R43_JACOBIAN_WITNESS_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-coordinate-cauchy-R43-jacobian-witness/v1";
export const H39_GRAPH_RADII_WITNESS_SUBSET_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-graph-radii-witness-subset/v1";
export const H39_COMPONENT_SUBSET_COMPOSITION_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-component-subset-composition/v1";
export const H39_UPSTREAM_SOURCE_COMPOSITION_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-upstream-source-composition/v1";
export const H39_KEPSILON_MAJORANT_WITNESS_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-K_epsilon-majorant-witness/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_h39_shared_domain_primitive_diagnostic";
const PROVENANCE_PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_h39_shared_domain_primitive_provenance_certificate";
const CANDIDATE_PROVENANCE_PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_h39_candidate_primitive_provenance_report";
const WITNESS_SET_PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_h39_primitive_provenance_witness_set";
const LJ_KERNEL_WITNESS_PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_h39_L_J_kernel_witness_subset";
const R43_SOURCE_FAMILY_WITNESS_PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_h39_R43_source_family_witness_subset";
const NG_NUMERATOR_WITNESS_PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_h39_N_G_numerator_witness_subset";
const NG_DENOMINATOR_CAUCHY_MG_WITNESS_PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_h39_N_G_denominator_cauchy_M_G_witness";
const JACOBIAN_FLOOR_WITNESS_PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_h39_jacobian_floor_witness_subset";
const COORDINATE_CAUCHY_R43_JACOBIAN_WITNESS_PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_h39_coordinate_cauchy_R43_jacobian_witness";
const GRAPH_RADII_WITNESS_PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_h39_graph_radii_witness_subset";
const COMPONENT_SUBSET_COMPOSITION_PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_h39_component_subset_composition";
const UPSTREAM_SOURCE_COMPOSITION_PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_h39_upstream_source_composition";
const KEPSILON_MAJORANT_WITNESS_PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_h39_K_epsilon_majorant_witness";
const PROMOTION_STATUS = "priority-only";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

const DEFAULT_PRIMITIVE_BOUNDS_STATUS = "provided-unverified";
const DIRECTED_ROUNDED_EXTERNAL_STATUS =
  "directed-rounded-external-unverified-by-this-artifact";
const DIRECTED_ROUNDED_SAME_DOMAIN_PROVENANCE_STATUS =
  "directed-rounded-same-domain-primitive-provenance-certified";
export const H39_CANDIDATE_ONLY_PRIMITIVE_PROVENANCE_STATUS =
  "open-candidate-only-primitive-provenance";
export const H39_PRIMITIVE_PROVENANCE_WITNESS_SET_STATUS =
  "open-directed-rounded-witness-set-unverified";
export const H39_LJ_KERNEL_WITNESS_SUBSET_OPEN_STATUS =
  "open-L_J-kernel-witness-unverified";
export const H39_LJ_KERNEL_WITNESS_SUBSET_CERTIFIED_STATUS =
  "directed-rounded-same-domain-L_J-component-witness-certified";
export const H39_R43_SOURCE_FAMILY_WITNESS_SUBSET_OPEN_STATUS =
  "open-R43-source-family-witness-unverified";
export const H39_R43_SOURCE_FAMILY_WITNESS_SUBSET_CERTIFIED_STATUS =
  "directed-rounded-same-domain-R43-source-family-witness-certified";
export const H39_NG_NUMERATOR_WITNESS_SUBSET_OPEN_STATUS =
  "open-N_G-numerator-witness-unverified";
export const H39_NG_NUMERATOR_WITNESS_SUBSET_CERTIFIED_STATUS =
  "directed-rounded-same-domain-N_G-numerator-witness-certified";
export const H39_NG_DENOMINATOR_CAUCHY_MG_WITNESS_OPEN_STATUS =
  "open-N_G-denominator-cauchy-M_G-witness-unverified";
export const H39_NG_DENOMINATOR_CAUCHY_MG_WITNESS_CERTIFIED_STATUS =
  "directed-rounded-same-domain-N_G-denominator-cauchy-M_G-witness-certified";
export const H39_JACOBIAN_FLOOR_WITNESS_SUBSET_OPEN_STATUS =
  "open-jacobian-floor-witness-unverified";
export const H39_JACOBIAN_FLOOR_WITNESS_SUBSET_CERTIFIED_STATUS =
  "directed-rounded-same-domain-jacobian-floor-witness-certified";
export const H39_COORDINATE_CAUCHY_R43_JACOBIAN_WITNESS_OPEN_STATUS =
  "open-coordinate-cauchy-R43-jacobian-witness-unverified";
export const H39_COORDINATE_CAUCHY_R43_JACOBIAN_WITNESS_CERTIFIED_STATUS =
  "directed-rounded-same-domain-coordinate-cauchy-R43-jacobian-witness-certified";
export const H39_GRAPH_RADII_WITNESS_SUBSET_OPEN_STATUS =
  "open-graph-radii-witness-unverified";
export const H39_GRAPH_RADII_WITNESS_SUBSET_CERTIFIED_STATUS =
  "directed-rounded-same-domain-graph-radii-witness-certified";
export const H39_COMPONENT_SUBSET_COMPOSITION_OPEN_STATUS =
  "open-component-subset-composition-unverified";
export const H39_COMPONENT_SUBSET_COMPOSITION_CERTIFIED_STATUS =
  "directed-rounded-same-domain-component-subset-composition-certified";
export const H39_UPSTREAM_SOURCE_COMPOSITION_OPEN_STATUS =
  "open-upstream-source-composition-unverified";
export const H39_UPSTREAM_SOURCE_COMPOSITION_CERTIFIED_STATUS =
  "directed-rounded-same-domain-upstream-source-composition-certified";
export const H39_KEPSILON_MAJORANT_WITNESS_OPEN_STATUS =
  "open-K_epsilon-majorant-witness-unverified";
export const H39_KEPSILON_MAJORANT_WITNESS_CERTIFIED_STATUS =
  "directed-rounded-same-domain-K_epsilon-majorant-witness-certified";
const PROVENANCE_VERIFICATION_STATUSES = {
  certified: "directed-rounded-same-domain-primitive-provenance-certified",
  candidateOnly: H39_CANDIDATE_ONLY_PRIMITIVE_PROVENANCE_STATUS,
  witnessSetOpen: H39_PRIMITIVE_PROVENANCE_WITNESS_SET_STATUS,
  inputMissing: "open-primitive-vector-input-missing-or-invalid",
  missingComponents: "open-missing-required-provenance-components",
  invalidComponents: "open-invalid-provenance-components",
  domainMismatch: "open-provenance-domain-mismatch",
  valueMismatch: "open-provenance-value-mismatch",
  reducerOpen: "open-h39-reducer-replay-not-closed",
  rejectedSpeed: "rejected-fixed-speed-band-fields",
  missingSignature: "open-missing-shared-domain-signature",
  statusOpen: "open-provenance-status-not-certified",
};
const ALLOWED_PRIMITIVE_BOUNDS_STATUSES = new Set([
  DEFAULT_PRIMITIVE_BOUNDS_STATUS,
  DIRECTED_ROUNDED_EXTERNAL_STATUS,
]);
const FORBIDDEN_SPEED_FIELDS = new Set([
  "speed_band",
  "speed_window",
  "speed_min",
  "speed_max",
]);
const H39_LJ_KERNEL_COMPONENT = "L_J";
const H39_LJ_KERNEL_WITNESS_FAMILY = "x_lipschitz_kernel";
const H39_LJ_KERNEL_Y_POWER = 41;
const H39_LJ_KERNEL_IDENTITY =
  "partial_X^2 R43 = y^41 K_epsilon";
const H39_LJ_KERNEL_FORMULA =
  "K_epsilon = 2/nu^2 - sin(delta_epsilon) - sin(phi_epsilon)";
const H39_LJ_KERNEL_MAJORANT_RELATION =
  "M_K >= max_epsilon sup_S |K_epsilon|";
const H39_LJ_LIPSCHITZ_REDUCTION_RELATION =
  "L_J >= rho^41 * M_K";
const H39_R43_SOURCE_FAMILY_COMPONENTS = ["E_R", "M_R"];
const H39_R43_SOURCE_FAMILY_WITNESS_FAMILY =
  "R43_residual_and_root_tangent";
const H39_R43_SOURCE_SHIFT_POWER = 43;
const H39_NG_NUMERATOR_COMPONENT = "M_G";
const H39_NG_NUMERATOR_WITNESS_FAMILY = "N_G_numerator";
const H39_NG_DENOMINATOR_CAUCHY_WITNESS_FAMILY =
  "N_G_denominator_cauchy_outer_bound";
const H39_NG_SHIFT_POWER = 41;
const H39_FOLD_PAIR_BRANCHES = ["-", "+"];
const H39_JACOBIAN_FLOOR_COMPONENT = "nu_J";
const H39_JACOBIAN_FLOOR_WITNESS_FAMILY = "jacobian_floor";
const H39_COORDINATE_CAUCHY_COMPONENTS = ["E_R", "M_R", "nu_J"];
const H39_COORDINATE_CAUCHY_WITNESS_FAMILY =
  "coordinate_cauchy_R43_and_jacobian_outer_bounds";
const H39_GRAPH_RADII_COMPONENTS = ["rho_X", "r_X"];
const H39_GRAPH_RADII_WITNESS_FAMILY = "graph_radii";
const H39_KEPSILON_REQUIRED_BRANCHES = ["-", "+"];

const SUMMARY_COPY_FIELDS = [
  "root_graph_lift_status",
  "certifies_unique_root_in_X_disc",
  "rouche_radius_window_nonempty",
  "derived_jacobian_lower_bound_J_min",
  "sigma_X",
  "candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim",
  "candidate_rouche_primitive_h39_closure_ratio_below_one",
  "candidate_rouche_primitive_h39_closure_ratio_margin_to_one",
  "rouche_form_admissible_M_R_ceiling",
  "candidate_rouche_form_M_R_margin",
  "rouche_radius_supremum_status",
  "rouche_radius_supremal_M_R_ceiling",
  "rouche_rho_X_optimum_status",
  "rouche_rho_X_optimal_M_R_ceiling",
  "rouche_y_radius_optimum_status",
  "rouche_y_radius_optimal_M_R_ceiling",
];

const REQUIRED_PRIMITIVE_PROVENANCE_COMPONENTS = [
  {
    key: "E_R",
    inputField: "center_residual_bound_E_R",
    relation: "upper-bound",
  },
  {
    key: "M_R",
    inputField: "candidate_root_tangent_numerator_bound_M_R",
    relation: "upper-bound",
  },
  {
    key: "M_G",
    inputField: "candidate_M_G_bound",
    relation: "upper-bound",
  },
  {
    key: "nu_J",
    inputField: "center_jacobian_lower_bound_nu_J",
    relation: "lower-bound",
  },
  {
    key: "L_J",
    inputField: "jacobian_lipschitz_bound_L_J",
    relation: "lipschitz-upper-bound",
  },
  {
    key: "rho_X",
    inputField: "rho_X",
    relation: "declared-outer-radius",
  },
  {
    key: "r_X",
    inputField: "r_X",
    relation: "declared-inner-radius",
  },
];

const H39_PRIMITIVE_WITNESS_FAMILIES = [
  {
    key: "R43_residual_and_root_tangent",
    components: ["E_R", "M_R"],
    required_witness:
      "directed-rounded R43 residual and y-root-tangent numerator bounds on the shared graph-centered h39 domain",
  },
  {
    key: "N_G_numerator",
    components: ["M_G"],
    required_witness:
      "directed-rounded N_G numerator outer bound on the shared graph-centered h39 domain",
  },
  {
    key: "jacobian_floor",
    components: ["nu_J"],
    required_witness:
      "directed-rounded lower bound for the h39 center Jacobian on the shared graph-centered h39 domain",
  },
  {
    key: "x_lipschitz_kernel",
    components: ["L_J"],
    required_witness:
      "directed-rounded Lipschitz upper bound for the h39 X-Jacobian variation, equivalently a same-domain K_epsilon majorant after the y^41 reduction",
  },
  {
    key: "graph_radii",
    components: ["rho_X", "r_X"],
    required_witness:
      "directed-rounded declared outer and inner X radii satisfying the same Rouché graph-lift domain signature",
  },
];

function isProvided(value) {
  return value !== undefined && value !== null;
}

function nullableNumber(value) {
  return isProvided(value) ? Number(value) : null;
}

function optionNumber(value) {
  return isProvided(value) ? Number(value) : undefined;
}

function finiteNumber(value) {
  const resolved = Number(value);
  return Number.isFinite(resolved) ? resolved : null;
}

function numericClose(left, right) {
  const leftNumber = finiteNumber(left);
  const rightNumber = finiteNumber(right);
  if (leftNumber === null || rightNumber === null) {
    return false;
  }
  const scale = Math.max(1, Math.abs(leftNumber), Math.abs(rightNumber));
  return Math.abs(leftNumber - rightNumber) <=
    Number.EPSILON * 64 * scale;
}

function finiteMaximum(values) {
  const finiteValues = values
    .map((value) => finiteNumber(value))
    .filter((value) => value !== null);
  return finiteValues.length > 0 ? Math.max(...finiteValues) : null;
}

function finiteMinimum(values) {
  const finiteValues = values
    .map((value) => finiteNumber(value))
    .filter((value) => value !== null);
  return finiteValues.length > 0 ? Math.min(...finiteValues) : null;
}

function assertAllowedPrimitiveStatus(status) {
  if (!ALLOWED_PRIMITIVE_BOUNDS_STATUSES.has(status)) {
    throw new Error(
      `primitiveBoundsStatus must be one of: ${Array.from(
        ALLOWED_PRIMITIVE_BOUNDS_STATUSES
      ).join(", ")}`
    );
  }
}

function reducerOptionsFromBounds(bounds) {
  return {
    radiusMultiple: optionNumber(bounds.radius_multiple),
    radiusMultipleUpperBound: optionNumber(
      bounds.radius_multiple_upper_bound
    ),
    centerResidualBound: optionNumber(bounds.center_residual_bound_E_R),
    centerJacobianLowerBound: optionNumber(
      bounds.center_jacobian_lower_bound_nu_J
    ),
    jacobianLipschitzBound: optionNumber(
      bounds.jacobian_lipschitz_bound_L_J
    ),
    rhoX: optionNumber(bounds.rho_X),
    rX: optionNumber(bounds.r_X),
    rhoXUpperBound: optionNumber(bounds.rho_X_upper_bound),
    mGBound: optionNumber(bounds.candidate_M_G_bound),
    rootTangentNumeratorBound: optionNumber(
      bounds.candidate_root_tangent_numerator_bound_M_R
    ),
  };
}

function primitiveBoundsFromOptions(options) {
  return {
    center_residual_bound_E_R: nullableNumber(options.centerResidualBound),
    center_jacobian_lower_bound_nu_J: nullableNumber(
      options.centerJacobianLowerBound
    ),
    jacobian_lipschitz_bound_L_J: nullableNumber(
      options.jacobianLipschitzBound
    ),
    rho_X: nullableNumber(options.rhoX),
    r_X: nullableNumber(options.rX),
    rho_X_upper_bound: nullableNumber(options.rhoXUpperBound),
    radius_multiple: nullableNumber(options.radiusMultiple),
    radius_multiple_upper_bound: nullableNumber(
      options.radiusMultipleUpperBound
    ),
    candidate_M_G_bound: nullableNumber(options.mGBound),
    candidate_root_tangent_numerator_bound_M_R: nullableNumber(
      options.rootTangentNumeratorBound
    ),
  };
}

function missingExplicitPrimitiveBounds(bounds) {
  const missing = [];
  if (!isProvided(bounds.center_residual_bound_E_R)) {
    missing.push("E_R");
  }
  if (!isProvided(bounds.center_jacobian_lower_bound_nu_J)) {
    missing.push("nu_J");
  }
  if (!isProvided(bounds.jacobian_lipschitz_bound_L_J)) {
    missing.push("L_J");
  }
  if (!isProvided(bounds.rho_X)) {
    missing.push("rho_X");
  }
  if (!isProvided(bounds.r_X)) {
    missing.push("r_X");
  }
  if (!isProvided(bounds.candidate_M_G_bound)) {
    missing.push("M_G");
  }
  if (!isProvided(bounds.candidate_root_tangent_numerator_bound_M_R)) {
    missing.push("M_R");
  }
  return missing;
}

function copiedReducerSummary(summary) {
  const copied = {};
  for (const field of SUMMARY_COPY_FIELDS) {
    copied[field] = summary?.[field] ?? null;
  }
  return copied;
}

function diagnosticDecision({
  missing,
  primitiveBoundsStatus,
  reducerSummary,
}) {
  if (missing.length > 0) {
    return "open-missing-primitive-bounds";
  }

  if (
    reducerSummary?.candidate_rouche_primitive_certificate_closes === true
  ) {
    return primitiveBoundsStatus === DIRECTED_ROUNDED_EXTERNAL_STATUS
      ? "passes-provided-primitive-bounds"
      : "open-shared-domain-not-certified";
  }

  return "fails-provided-primitive-bounds";
}

function buildReducerArtifact(bounds) {
  const reducerArtifact = buildH39Reducer(reducerOptionsFromBounds(bounds));
  const reducerErrors = validateH39Reducer(reducerArtifact);
  return {
    reducerArtifact,
    reducerErrors,
  };
}

export function buildH39SharedDomainPrimitiveDiagnostic(options = {}) {
  const primitiveBoundsStatus =
    options.primitiveBoundsStatus ?? DEFAULT_PRIMITIVE_BOUNDS_STATUS;
  assertAllowedPrimitiveStatus(primitiveBoundsStatus);

  const primitiveBounds = primitiveBoundsFromOptions(options);
  const { reducerArtifact, reducerErrors } =
    buildReducerArtifact(primitiveBounds);
  const reducerSummary =
    reducerArtifact.root_tangent_cauchy_majorant_tail_budget_summary;
  const missing = missingExplicitPrimitiveBounds(primitiveBounds);
  const decision = diagnosticDecision({
    missing,
    primitiveBoundsStatus,
    reducerSummary,
  });

  return {
    schema: H39_SHARED_DOMAIN_PRIMITIVE_DIAGNOSTIC_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    diagnostic_scope: {
      report_kind: "h39-shared-domain-primitive-diagnostic",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      primitive_bounds_source: options.primitiveBoundsSource ?? null,
      primitive_bounds_status: primitiveBoundsStatus,
      shared_domain_requirement:
        "E_R, nu_J, L_J, rho_X, r_X, M_G, and M_R must be certified on one shared graph-centered polydisc by an external directed-rounded backend",
      consumes_reducer_schema: H39_REDUCER_SCHEMA,
    },
    primitive_bounds: primitiveBounds,
    reducer_check: {
      schema: reducerArtifact.schema,
      valid: reducerErrors.length === 0,
      errors: reducerErrors,
      theory_status: reducerArtifact.result?.theory_status ?? null,
      retention: reducerArtifact.result?.retention ?? null,
      retained_branch: reducerArtifact.result?.retained_branch ?? null,
    },
    shared_domain_diagnostic_summary: {
      ...copiedReducerSummary(reducerSummary),
      missing_explicit_primitive_bounds: missing,
      primitive_bounds_status: primitiveBoundsStatus,
      diagnostic_decision: decision,
    },
    claim_boundary: {
      assumes_fixed_speed_window: false,
      consumes_primitive_bounds: true,
      verifies_primitive_bounds_provenance: false,
      certifies_directed_rounded_h39_polydisc_M_G_bound: false,
      certifies_directed_rounded_h39_polydisc_Xi_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
        false,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_I1_regular_critical_exhaustion: false,
      retained_branch: false,
      strongest_claim:
        "Reports whether supplied primitive bounds would satisfy the h39 reducer on the declared shared-domain inputs; it does not certify those bounds or the shared domain.",
    },
    result: {
      theory_status: "h39-shared-domain-primitive-diagnostic-report-emitted",
      retention: "not_retained",
      retained_branch: false,
      first_successor_row:
        "theta3minus.fold-pair-first-y-GD-h39-directed-rounded-shared-domain-M_G-M_R-certificate-required",
      status_note:
        "The h39 reducer is replayed against supplied primitive bounds. A pass is only a conditional replay unless the primitive-bound provenance is supplied by an external directed-rounded shared-domain backend; this artifact does not certify that backend.",
    },
  };
}

function primitiveVectorDiagnosticOptions(
  primitiveVectorBackendArtifact,
  options = {}
) {
  const input =
    primitiveVectorBackendArtifact?.primitive_diagnostic_input_ready === true
      ? (primitiveVectorBackendArtifact?.primitive_diagnostic_input ?? {})
      : {};
  return {
    radiusMultiple: optionNumber(input.radius_multiple),
    radiusMultipleUpperBound: optionNumber(input.radius_multiple_upper_bound),
    centerResidualBound: optionNumber(input.center_residual_bound_E_R),
    centerJacobianLowerBound: optionNumber(
      input.center_jacobian_lower_bound_nu_J
    ),
    jacobianLipschitzBound: optionNumber(input.jacobian_lipschitz_bound_L_J),
    rhoX: optionNumber(input.rho_X),
    rX: optionNumber(input.r_X),
    rhoXUpperBound: optionNumber(input.rho_X_upper_bound),
    mGBound: optionNumber(input.candidate_M_G_bound),
    rootTangentNumeratorBound: optionNumber(
      input.candidate_root_tangent_numerator_bound_M_R
    ),
    primitiveBoundsSource:
      options.primitiveBoundsSource ??
      input.primitive_bounds_source ??
      primitiveVectorBackendArtifact?.packet_id ??
      null,
    primitiveBoundsStatus:
      options.primitiveBoundsStatus ??
      input.primitive_bounds_status ??
      primitiveVectorBackendArtifact?.backend_scope?.primitive_bounds_status ??
      DEFAULT_PRIMITIVE_BOUNDS_STATUS,
  };
}

function primitiveVectorPromotionObstruction({
  inputReady,
  primitiveBoundsStatus,
  diagnosticDecision: decision,
}) {
  if (!inputReady) {
    return "primitive-vector-input-missing-or-invalid";
  }
  if (decision === "fails-provided-primitive-bounds") {
    return "rouche-primitive-reducer-not-closed";
  }
  if (primitiveBoundsStatus !== DIRECTED_ROUNDED_EXTERNAL_STATUS) {
    return "primitive-vector-provenance-unverified";
  }
  if (decision !== "passes-provided-primitive-bounds") {
    return "directed-rounded-replay-not-promoted";
  }
  return "external-directed-rounded-replay-pass-provenance-unverified-by-this-artifact";
}

export function buildH39SharedDomainPrimitiveDiagnosticFromPrimitiveVectorBackendArtifact(
  primitiveVectorBackendArtifact,
  options = {}
) {
  const diagnosticOptions = primitiveVectorDiagnosticOptions(
    primitiveVectorBackendArtifact,
    options
  );
  const diagnostic =
    buildH39SharedDomainPrimitiveDiagnostic(diagnosticOptions);
  const primitiveBoundsStatus =
    diagnostic.diagnostic_scope.primitive_bounds_status;
  const decision =
    diagnostic.shared_domain_diagnostic_summary.diagnostic_decision;
  const inputReady =
    primitiveVectorBackendArtifact?.primitive_diagnostic_input_ready === true;

  return {
    ...diagnostic,
    primitive_vector_promotion_theorem_bridge: {
      source_schema: primitiveVectorBackendArtifact?.schema ?? null,
      source_packet_id: primitiveVectorBackendArtifact?.packet_id ?? null,
      source_profile_vector_backend_status:
        primitiveVectorBackendArtifact?.profile_vector_backend_status ?? null,
      source_profile_vector_status:
        primitiveVectorBackendArtifact?.profile_vector_status ?? null,
      primitive_diagnostic_input_ready: inputReady,
      missing_candidate_components:
        primitiveVectorBackendArtifact?.missing_candidate_components ?? null,
      invalid_candidate_components:
        primitiveVectorBackendArtifact?.invalid_candidate_components ?? null,
      primitive_bounds_status: primitiveBoundsStatus,
      diagnostic_decision: decision,
      promotion_obstruction: primitiveVectorPromotionObstruction({
        inputReady,
        primitiveBoundsStatus,
        diagnosticDecision: decision,
      }),
      theorem_claim:
        "Routes a primitive-vector backend artifact into the h39 Rouché-primitive diagnostic; it does not verify directed-rounded provenance or promote retained-branch status.",
    },
  };
}

function sourcePrimitiveVectorBackendSummary(primitiveVectorBackendArtifact) {
  return primitiveVectorBackendArtifact
    ? {
        schema: primitiveVectorBackendArtifact.schema ?? null,
        packet_id: primitiveVectorBackendArtifact.packet_id ?? null,
        profile_vector_backend_status:
          primitiveVectorBackendArtifact.profile_vector_backend_status ?? null,
        profile_vector_status:
          primitiveVectorBackendArtifact.profile_vector_status ?? null,
        primitive_diagnostic_input_ready:
          primitiveVectorBackendArtifact.primitive_diagnostic_input_ready ??
          null,
        missing_candidate_components:
          primitiveVectorBackendArtifact.missing_candidate_components ?? null,
        invalid_candidate_components:
          primitiveVectorBackendArtifact.invalid_candidate_components ?? null,
      }
    : null;
}

function primitiveComponentSource(primitiveVectorBackendArtifact, component) {
  const candidateSources =
    primitiveVectorBackendArtifact?.source_vector_candidate
      ?.candidate_primitive_vector_component_sources ?? {};
  return (
    candidateSources[component.key] ??
    (component.key === "rho_X"
      ? "primitive_diagnostic_input.rho_X"
      : component.key === "r_X"
        ? "primitive_diagnostic_input.r_X"
        : null)
  );
}

function h39CandidatePrimitiveProvenanceClaimBoundary() {
  return {
    assumes_fixed_speed_window: false,
    consumes_primitive_vector_backend_artifact: true,
    emits_directed_rounded_provenance_report: false,
    verifies_primitive_bounds_provenance: false,
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    certifies_directed_rounded_h39_polydisc_M_G_bound: false,
    certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound: false,
    certifies_directed_rounded_h39_polydisc_Xi_bound: false,
    certifies_directed_rounded_h39_jacobian_lower_bound: false,
    certifies_directed_rounded_h39_jacobian_lipschitz_bound: false,
    certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
      false,
    certifies_directed_rounded_fold_pair_scaled_remainder: false,
    certifies_I1_regular_critical_exhaustion: false,
    retained_branch: false,
    strongest_claim:
      "Emits a candidate-only provenance no-go report from the current primitive-vector backend; it proves non-promotion of this artifact, not failure of the h39 continuous-tail theorem.",
  };
}

function witnessFamilyForComponent(componentKey) {
  return (
    H39_PRIMITIVE_WITNESS_FAMILIES.find((family) =>
      family.components.includes(componentKey)
    ) ?? null
  );
}

function h39PrimitiveProvenanceWitnessSetClaimBoundary() {
  return {
    assumes_fixed_speed_window: false,
    consumes_primitive_vector_backend_artifact: true,
    narrows_backend_to_minimal_witness_set: true,
    emits_directed_rounded_provenance_report: false,
    verifies_primitive_bounds_provenance: false,
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    certifies_directed_rounded_h39_polydisc_M_G_bound: false,
    certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound: false,
    certifies_directed_rounded_h39_polydisc_Xi_bound: false,
    certifies_directed_rounded_h39_jacobian_lower_bound: false,
    certifies_directed_rounded_h39_jacobian_lipschitz_bound: false,
    certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
      false,
    certifies_directed_rounded_fold_pair_scaled_remainder: false,
    certifies_I1_regular_critical_exhaustion: false,
    retained_branch: false,
    strongest_claim:
      "Reduces the h39 directed-rounded primitive provenance backend to a minimal seven-component same-signature witness set and reports the first failed witness predicate for each component.",
  };
}

function witnessFailurePredicate({ inputReady, value }) {
  if (!inputReady) {
    return "primitive-vector-input-missing-or-invalid";
  }
  if (!isProvided(value)) {
    return "missing-component-value";
  }
  return "directed-rounded-same-domain-component-witness-missing";
}

export function buildH39PrimitiveProvenanceWitnessSetFromPrimitiveVectorBackendArtifact(
  primitiveVectorBackendArtifact = null,
  { sharedDomainSignature = null } = {}
) {
  const inputReady =
    primitiveVectorBackendArtifact?.primitive_diagnostic_input_ready === true;
  const input = inputReady
    ? (primitiveVectorBackendArtifact?.primitive_diagnostic_input ?? {})
    : {};
  const componentWitnesses = {};
  const presentComponents = [];
  const missingComponents = [];
  const failedPredicates = [];

  for (const component of REQUIRED_PRIMITIVE_PROVENANCE_COMPONENTS) {
    const value = primitiveProvenanceInputValue(input, component.inputField);
    const family = witnessFamilyForComponent(component.key);
    const failurePredicate = witnessFailurePredicate({
      inputReady,
      value,
    });
    if (isProvided(value)) {
      presentComponents.push(component.key);
    } else {
      missingComponents.push(component.key);
    }
    failedPredicates.push(`${component.key}:${failurePredicate}`);
    componentWitnesses[component.key] = {
      component: component.key,
      input_field: component.inputField,
      relation: component.relation,
      value,
      witness_family: family?.key ?? null,
      required_witness: family?.required_witness ?? null,
      source_component_path: primitiveComponentSource(
        primitiveVectorBackendArtifact,
        component
      ),
      domain_signature: sharedDomainSignature,
      certifies_directed_rounded: false,
      directed_rounded: false,
      certificate_status: "witness-required",
      current_provenance_status: isProvided(value)
        ? "candidate-only"
        : "missing-component-value",
      first_failed_promotion_predicate: failurePredicate,
      blocking_reason:
        "component lacks a directed-rounded same-domain witness on the declared h39 graph-centered domain",
    };
  }

  const candidateDiagnostic =
    buildH39SharedDomainPrimitiveDiagnosticFromPrimitiveVectorBackendArtifact(
      primitiveVectorBackendArtifact
    );
  const conditionalDiagnostic =
    buildH39SharedDomainPrimitiveDiagnosticFromPrimitiveVectorBackendArtifact(
      primitiveVectorBackendArtifact,
      {
        primitiveBoundsSource:
          "hypothetical-h39-minimal-primitive-provenance-witness-set",
        primitiveBoundsStatus: DIRECTED_ROUNDED_EXTERNAL_STATUS,
      }
    );
  const conditionalDecision =
    conditionalDiagnostic.shared_domain_diagnostic_summary
      .diagnostic_decision;
  const promotionObstruction = !inputReady
    ? PROVENANCE_VERIFICATION_STATUSES.inputMissing
    : missingComponents.length > 0
      ? PROVENANCE_VERIFICATION_STATUSES.missingComponents
      : H39_PRIMITIVE_PROVENANCE_WITNESS_SET_STATUS;

  return {
    schema: H39_PRIMITIVE_PROVENANCE_WITNESS_SET_SCHEMA,
    packet_id: WITNESS_SET_PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    provenance_status: H39_PRIMITIVE_PROVENANCE_WITNESS_SET_STATUS,
    witness_set_status: H39_PRIMITIVE_PROVENANCE_WITNESS_SET_STATUS,
    witness_set_scope: {
      report_kind: "h39-primitive-provenance-minimal-witness-set",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      required_provenance_status:
        DIRECTED_ROUNDED_SAME_DOMAIN_PROVENANCE_STATUS,
      emitted_provenance_status:
        H39_PRIMITIVE_PROVENANCE_WITNESS_SET_STATUS,
      required_component_keys:
        REQUIRED_PRIMITIVE_PROVENANCE_COMPONENTS.map(
          (component) => component.key
        ),
      witness_family_keys: H39_PRIMITIVE_WITNESS_FAMILIES.map(
        (family) => family.key
      ),
      theorem_scope:
        "minimal same-signature witness vector for the h39 primitive Rouché reducer; not a directed-rounded provenance report",
    },
    shared_domain_signature: sharedDomainSignature,
    witness_families: H39_PRIMITIVE_WITNESS_FAMILIES,
    component_witnesses: componentWitnesses,
    component_provenance: componentWitnesses,
    source_primitive_vector_backend:
      sourcePrimitiveVectorBackendSummary(primitiveVectorBackendArtifact),
    source_primitive_vector_backend_artifact:
      primitiveVectorBackendArtifact,
    candidate_diagnostic_replay: candidateDiagnostic,
    conditional_directed_rounded_replay: conditionalDiagnostic,
    witness_set_summary: {
      primitive_diagnostic_input_ready: inputReady,
      present_components: presentComponents,
      missing_components: missingComponents,
      candidate_only_components: presentComponents,
      failed_promotion_predicates: failedPredicates,
      all_seven_values_present:
        presentComponents.length ===
        REQUIRED_PRIMITIVE_PROVENANCE_COMPONENTS.length,
      all_components_directed_rounded_same_domain: false,
      conditional_reducer_replay_decision: conditionalDecision,
      conditional_reducer_replay_closes:
        conditionalDecision === "passes-provided-primitive-bounds",
      minimal_witness_theorem:
        "The h39 primitive continuous-tail row can promote only from one same-domain directed-rounded witness vector (E_R, M_R, M_G, nu_J, L_J, rho_X, r_X); every current component is candidate-only or missing.",
    },
    no_go_theorem: {
      hypothesis:
        "The primitive-vector backend supplies values or placeholders for the seven h39 primitive components but no directed-rounded same-domain witness for any component.",
      conclusion:
        "The remaining backend is finite: produce one same-signature witness for the five source families R43 residual/root-tangent, N_G numerator, Jacobian floor, X-Lipschitz kernel, and graph radii, or the exact component predicate listed here remains the promotion obstruction.",
      promotion_obstruction: promotionObstruction,
    },
    claim_boundary: h39PrimitiveProvenanceWitnessSetClaimBoundary(),
    result: {
      theory_status:
        "h39-primitive-provenance-minimal-witness-set-emitted",
      h39_continuous_tail_certificate: false,
      promotion_obstruction: promotionObstruction,
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The artifact narrows the real provenance backend to a minimal same-signature witness set and does not certify any component.",
    },
  };
}

function h39R43SourceFamilyWitnessSubsetClaimBoundary(
  certifiesSourceFamily
) {
  return {
    assumes_fixed_speed_window: false,
    consumes_R43_analytic_profile_witness: true,
    narrows_E_R_and_M_R_to_R43_source_family_witness: true,
    certifies_directed_rounded_h39_center_residual_E_R_bound:
      certifiesSourceFamily,
    certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound:
      certifiesSourceFamily,
    emits_full_primitive_provenance_report: false,
    verifies_all_primitive_bounds_provenance: false,
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    certifies_directed_rounded_h39_polydisc_M_G_bound: false,
    certifies_directed_rounded_h39_polydisc_Xi_bound: false,
    certifies_directed_rounded_h39_jacobian_lower_bound: false,
    certifies_directed_rounded_h39_jacobian_lipschitz_bound: false,
    certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
      false,
    certifies_directed_rounded_fold_pair_scaled_remainder: false,
    certifies_I1_regular_critical_exhaustion: false,
    retained_branch: false,
    strongest_claim: certifiesSourceFamily
      ? "Certifies only the E_R and M_R primitive components from one directed-rounded R43 shifted Cauchy prefix-tail witness; five h39 primitive components and downstream closure remain open."
      : "Narrows the E_R and M_R primitive components to a directed-rounded R43 shifted Cauchy prefix-tail witness requirement.",
  };
}

function h39R43SourceFamilyWitnessPredicateCheck({
  r43AnalyticProfileWitness,
  sharedDomainSignature,
}) {
  const witness = r43AnalyticProfileWitness ?? null;
  const cauchy = witness?.cauchy_diagnostic ?? null;
  const q = Number(witness?.q ?? cauchy?.q);
  const ePrefix = Number(witness?.candidate_E_R_finite_prefix);
  const eTail = Number(
    witness?.candidate_E_R_cauchy_tail_after_prefix_profile
  );
  const eBound = Number(witness?.candidate_E_R_prefix_plus_tail_bound);
  const mPrefix = Number(witness?.candidate_M_R_finite_prefix);
  const mTail = Number(
    witness?.candidate_M_R_cauchy_tail_after_prefix_profile
  );
  const mBound = Number(witness?.candidate_M_R_prefix_plus_tail_bound);
  const forbiddenSpeedFields = findForbiddenSpeedFields(witness);
  const checks = {
    witness_present: witness !== null,
    status_valid:
      witness?.status ===
      "h39-r43-analytic-remainder-profile-candidate-emitted",
    shared_domain_signature_present:
      sharedDomainSignature !== null && sharedDomainSignature !== undefined,
    domain_signature_matches:
      domainSignatureMatches(
        proofDomainSignature(witness),
        sharedDomainSignature
      ),
    directed_rounded_same_domain_witness:
      proofDirectedRoundedCertified(witness) &&
      witness?.certifies_directed_rounded_shared_domain === true,
    r43_shift_power_matches:
      Number(witness?.r43_shift_power ?? cauchy?.shift_power) ===
      H39_R43_SOURCE_SHIFT_POWER,
    cauchy_tail_present: cauchy !== null,
    tail_ratio_strictly_below_one:
      Number.isFinite(q) && q >= 0 && q < 1,
    E_R_prefix_tail_nonnegative:
      Number.isFinite(ePrefix) &&
      ePrefix >= 0 &&
      Number.isFinite(eTail) &&
      eTail >= 0 &&
      Number.isFinite(eBound) &&
      eBound >= 0,
    E_R_bound_covers_prefix_plus_tail:
      Number.isFinite(eBound) &&
      Number.isFinite(ePrefix) &&
      Number.isFinite(eTail) &&
      eBound >= ePrefix + eTail,
    M_R_prefix_tail_nonnegative:
      Number.isFinite(mPrefix) &&
      mPrefix >= 0 &&
      Number.isFinite(mTail) &&
      mTail >= 0 &&
      Number.isFinite(mBound) &&
      mBound >= 0,
    M_R_bound_covers_prefix_plus_tail:
      Number.isFinite(mBound) &&
      Number.isFinite(mPrefix) &&
      Number.isFinite(mTail) &&
      mBound >= mPrefix + mTail,
    no_fixed_speed_window: forbiddenSpeedFields.length === 0,
  };
  const failedPredicates = Object.entries(checks)
    .filter(([, passes]) => passes !== true)
    .map(([key]) => key);

  return {
    checks,
    failed_predicates: failedPredicates,
    forbidden_speed_fields: forbiddenSpeedFields,
    E_R_value: Number.isFinite(eBound) ? eBound : null,
    M_R_value: Number.isFinite(mBound) ? mBound : null,
    q: Number.isFinite(q) ? q : null,
    r43_shift_power: Number(witness?.r43_shift_power ?? cauchy?.shift_power),
    certifies_R43_source_family: failedPredicates.length === 0,
  };
}

export function buildH39R43SourceFamilyWitnessSubset({
  r43AnalyticProfileWitness = null,
  sharedDomainSignature = null,
} = {}) {
  const predicateCheck = h39R43SourceFamilyWitnessPredicateCheck({
    r43AnalyticProfileWitness,
    sharedDomainSignature,
  });
  const certifiesSourceFamily =
    predicateCheck.certifies_R43_source_family;
  const status = certifiesSourceFamily
    ? H39_R43_SOURCE_FAMILY_WITNESS_SUBSET_CERTIFIED_STATUS
    : H39_R43_SOURCE_FAMILY_WITNESS_SUBSET_OPEN_STATUS;
  const firstFailedPredicate =
    predicateCheck.failed_predicates[0] ??
    "unknown-R43-source-family-witness-blocker";
  const componentWitnesses = {
    E_R: {
      component: "E_R",
      input_field: "center_residual_bound_E_R",
      relation: "upper-bound",
      value: certifiesSourceFamily ? predicateCheck.E_R_value : null,
      witness_family: H39_R43_SOURCE_FAMILY_WITNESS_FAMILY,
      required_witness:
        "directed-rounded same-domain R43 shifted Cauchy prefix-tail upper envelope for the center residual",
      domain_signature: sharedDomainSignature,
      r43_shift_power: H39_R43_SOURCE_SHIFT_POWER,
      certifies_directed_rounded: certifiesSourceFamily,
      directed_rounded: certifiesSourceFamily,
      certificate_status: certifiesSourceFamily
        ? "directed-rounded-certified"
        : "witness-required",
      first_failed_promotion_predicate: certifiesSourceFamily
        ? null
        : firstFailedPredicate,
      blocking_reason: certifiesSourceFamily
        ? null
        : "E_R cannot promote until the R43 shifted Cauchy prefix-tail witness certifies on the shared h39 graph-centered domain",
    },
    M_R: {
      component: "M_R",
      input_field: "candidate_root_tangent_numerator_bound_M_R",
      relation: "upper-bound",
      value: certifiesSourceFamily ? predicateCheck.M_R_value : null,
      witness_family: H39_R43_SOURCE_FAMILY_WITNESS_FAMILY,
      required_witness:
        "directed-rounded same-domain R43 shifted Cauchy prefix-tail upper envelope for the y-root-tangent numerator",
      domain_signature: sharedDomainSignature,
      r43_shift_power: H39_R43_SOURCE_SHIFT_POWER,
      certifies_directed_rounded: certifiesSourceFamily,
      directed_rounded: certifiesSourceFamily,
      certificate_status: certifiesSourceFamily
        ? "directed-rounded-certified"
        : "witness-required",
      first_failed_promotion_predicate: certifiesSourceFamily
        ? null
        : firstFailedPredicate,
      blocking_reason: certifiesSourceFamily
        ? null
        : "M_R cannot promote until the R43 shifted Cauchy y-derivative prefix-tail witness certifies on the shared h39 graph-centered domain",
    },
  };

  return {
    schema: H39_R43_SOURCE_FAMILY_WITNESS_SUBSET_SCHEMA,
    packet_id: R43_SOURCE_FAMILY_WITNESS_PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    provenance_status: status,
    witness_subset_status: status,
    witness_subset_scope: {
      report_kind: "h39-R43-source-family-witness-subset",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      components: H39_R43_SOURCE_FAMILY_COMPONENTS,
      witness_family: H39_R43_SOURCE_FAMILY_WITNESS_FAMILY,
      r43_shift_power: H39_R43_SOURCE_SHIFT_POWER,
      theorem_scope:
        "conditional reduction from a directed-rounded same-domain R43 shifted Cauchy prefix-tail witness to the E_R and M_R primitive components; not a full primitive-vector certificate",
    },
    shared_domain_signature: sharedDomainSignature,
    source_R43_analytic_profile_witness: r43AnalyticProfileWitness,
    predicate_check: predicateCheck,
    component_witnesses: componentWitnesses,
    component_provenance: componentWitnesses,
    conditional_theorem: {
      hypothesis:
        "If a directed-rounded same-domain R43 shifted Cauchy prefix-tail witness bounds the shifted residual and its y-root-tangent numerator on the shared h39 graph-centered signature S,",
      conclusion:
        "then its prefix-plus-tail values are primitive E_R and M_R upper-bound witnesses.",
      E_R_inequality:
        "E_R >= max_epsilon (sum_{m=0}^K |r_{epsilon,m}| rho^m + B_R,out/R_y^43 * q^(K+1)/(1-q))",
      M_R_inequality:
        "M_R >= max_epsilon (sum_{m=0}^K m |r_{epsilon,m}| rho^m + B_R,out/R_y^43 * q^(K+1)*((K+1)-Kq)/(1-q)^2)",
    },
    no_go_theorem: certifiesSourceFamily
      ? null
      : {
          hypothesis:
            "The supplied R43 profile is missing, candidate-only, malformed, or not on the shared graph-centered signature.",
          conclusion:
            "The E_R and M_R primitive components cannot promote until the failed predicates list is empty on the same graph-centered domain signature.",
          promotion_obstruction: firstFailedPredicate,
        },
    claim_boundary: h39R43SourceFamilyWitnessSubsetClaimBoundary(
      certifiesSourceFamily
    ),
    result: {
      theory_status: certifiesSourceFamily
        ? "h39-R43-source-family-component-witness-certified"
        : "h39-R43-source-family-witness-subset-open",
      h39_E_R_component_witness: certifiesSourceFamily,
      h39_M_R_component_witness: certifiesSourceFamily,
      h39_full_primitive_vector_certificate: false,
      h39_continuous_tail_certificate: false,
      retained_branch: false,
      retention: "not_retained",
      status_note: certifiesSourceFamily
        ? "Only the E_R and M_R primitive components are certified; five other h39 primitive components and the full tail certificate remain open."
        : "The artifact narrows E_R and M_R to an R43 shifted Cauchy prefix-tail witness and keeps the current analytic profile candidate-only.",
    },
  };
}

function h39NGNumeratorWitnessSubsetClaimBoundary(certifiesMGComponent) {
  return {
    assumes_fixed_speed_window: false,
    consumes_N_G_analytic_profile_witness: true,
    narrows_M_G_to_N_G_numerator_witness: true,
    certifies_directed_rounded_h39_polydisc_M_G_bound:
      certifiesMGComponent,
    emits_full_primitive_provenance_report: false,
    verifies_all_primitive_bounds_provenance: false,
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound:
      false,
    certifies_directed_rounded_h39_polydisc_Xi_bound: false,
    certifies_directed_rounded_h39_jacobian_lower_bound: false,
    certifies_directed_rounded_h39_jacobian_lipschitz_bound: false,
    certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
      false,
    certifies_directed_rounded_fold_pair_scaled_remainder: false,
    certifies_I1_regular_critical_exhaustion: false,
    retained_branch: false,
    strongest_claim: certifiesMGComponent
      ? "Certifies only the M_G primitive component from one directed-rounded N_G shifted Cauchy prefix-tail witness; six h39 primitive components and downstream closure remain open."
      : "Narrows the M_G primitive component to a directed-rounded N_G shifted Cauchy prefix-tail witness requirement.",
  };
}

function h39NGNumeratorWitnessPredicateCheck({
  nGOuterBoundMGWitness,
  sharedDomainSignature,
}) {
  const witness = nGOuterBoundMGWitness ?? null;
  const cauchy = witness?.cauchy_diagnostic ?? null;
  const q = Number(witness?.q ?? cauchy?.q);
  const prefix = Number(witness?.candidate_M_G_finite_prefix);
  const tail = Number(witness?.candidate_M_G_cauchy_tail_after_prefix);
  const bound = Number(witness?.candidate_M_G_prefix_plus_tail_bound);
  const forbiddenSpeedFields = findForbiddenSpeedFields(witness);
  const checks = {
    witness_present: witness !== null,
    status_valid:
      witness?.status === "h39-n-g-outer-bound-candidate-m-g-emitted",
    shared_domain_signature_present:
      sharedDomainSignature !== null && sharedDomainSignature !== undefined,
    domain_signature_matches:
      domainSignatureMatches(
        proofDomainSignature(witness),
        sharedDomainSignature
      ),
    directed_rounded_same_domain_witness:
      proofDirectedRoundedCertified(witness) &&
      witness?.certifies_directed_rounded_shared_domain === true,
    n_g_shift_power_matches:
      Number(witness?.n_g_shift ?? cauchy?.shift_power) ===
      H39_NG_SHIFT_POWER,
    cauchy_tail_present: cauchy !== null,
    tail_ratio_strictly_below_one:
      Number.isFinite(q) && q >= 0 && q < 1,
    M_G_prefix_tail_nonnegative:
      Number.isFinite(prefix) &&
      prefix >= 0 &&
      Number.isFinite(tail) &&
      tail >= 0 &&
      Number.isFinite(bound) &&
      bound >= 0,
    M_G_bound_covers_prefix_plus_tail:
      Number.isFinite(bound) &&
      Number.isFinite(prefix) &&
      Number.isFinite(tail) &&
      bound >= prefix + tail,
    no_fixed_speed_window: forbiddenSpeedFields.length === 0,
  };
  const failedPredicates = Object.entries(checks)
    .filter(([, passes]) => passes !== true)
    .map(([key]) => key);

  return {
    checks,
    failed_predicates: failedPredicates,
    forbidden_speed_fields: forbiddenSpeedFields,
    M_G_value: Number.isFinite(bound) ? bound : null,
    q: Number.isFinite(q) ? q : null,
    n_g_shift_power: Number(witness?.n_g_shift ?? cauchy?.shift_power),
    certifies_N_G_numerator: failedPredicates.length === 0,
  };
}

export function buildH39NGNumeratorWitnessSubset({
  nGOuterBoundMGWitness = null,
  sharedDomainSignature = null,
} = {}) {
  const predicateCheck = h39NGNumeratorWitnessPredicateCheck({
    nGOuterBoundMGWitness,
    sharedDomainSignature,
  });
  const certifiesMGComponent = predicateCheck.certifies_N_G_numerator;
  const status = certifiesMGComponent
    ? H39_NG_NUMERATOR_WITNESS_SUBSET_CERTIFIED_STATUS
    : H39_NG_NUMERATOR_WITNESS_SUBSET_OPEN_STATUS;
  const firstFailedPredicate =
    predicateCheck.failed_predicates[0] ??
    "unknown-N_G-numerator-witness-blocker";
  const componentWitness = {
    component: H39_NG_NUMERATOR_COMPONENT,
    input_field: "candidate_M_G_bound",
    relation: "upper-bound",
    value: certifiesMGComponent ? predicateCheck.M_G_value : null,
    witness_family: H39_NG_NUMERATOR_WITNESS_FAMILY,
    required_witness:
      "directed-rounded same-domain N_G shifted Cauchy prefix-tail upper envelope for the h39 G numerator",
    domain_signature: sharedDomainSignature,
    n_g_shift_power: H39_NG_SHIFT_POWER,
    certifies_directed_rounded: certifiesMGComponent,
    directed_rounded: certifiesMGComponent,
    certificate_status: certifiesMGComponent
      ? "directed-rounded-certified"
      : "witness-required",
    first_failed_promotion_predicate: certifiesMGComponent
      ? null
      : firstFailedPredicate,
    blocking_reason: certifiesMGComponent
      ? null
      : "M_G cannot promote until the N_G shifted Cauchy prefix-tail witness certifies on the shared h39 graph-centered domain",
  };

  return {
    schema: H39_NG_NUMERATOR_WITNESS_SUBSET_SCHEMA,
    packet_id: NG_NUMERATOR_WITNESS_PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    provenance_status: status,
    witness_subset_status: status,
    witness_subset_scope: {
      report_kind: "h39-N_G-numerator-witness-subset",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      component: H39_NG_NUMERATOR_COMPONENT,
      witness_family: H39_NG_NUMERATOR_WITNESS_FAMILY,
      n_g_shift_power: H39_NG_SHIFT_POWER,
      theorem_scope:
        "conditional reduction from a directed-rounded same-domain N_G shifted Cauchy prefix-tail witness to the M_G primitive component; not a full primitive-vector certificate",
    },
    shared_domain_signature: sharedDomainSignature,
    source_N_G_outer_bound_M_G_witness: nGOuterBoundMGWitness,
    predicate_check: predicateCheck,
    component_witness: componentWitness,
    component_provenance: {
      M_G: componentWitness,
    },
    conditional_theorem: {
      hypothesis:
        "If a directed-rounded same-domain N_G shifted Cauchy prefix-tail witness bounds N_G=y^41 T_G^(39) on the shared h39 graph-centered signature S,",
      conclusion:
        "then its unshifted prefix-plus-tail value is a primitive M_G upper-bound witness.",
      M_G_inequality:
        "M_G >= sum_{m=0}^K |g_m| rho^(m+41) + B_N,out * q^(K+42)/(1-q)",
    },
    no_go_theorem: certifiesMGComponent
      ? null
      : {
          hypothesis:
            "The supplied N_G profile is missing, candidate-only, malformed, or not on the shared graph-centered signature.",
          conclusion:
            "The M_G primitive component cannot promote until the failed predicates list is empty on the same graph-centered domain signature.",
          promotion_obstruction: firstFailedPredicate,
        },
    claim_boundary: h39NGNumeratorWitnessSubsetClaimBoundary(
      certifiesMGComponent
    ),
    result: {
      theory_status: certifiesMGComponent
        ? "h39-N_G-numerator-M_G-component-witness-certified"
        : "h39-N_G-numerator-witness-subset-open",
      h39_M_G_component_witness: certifiesMGComponent,
      h39_full_primitive_vector_certificate: false,
      h39_continuous_tail_certificate: false,
      retained_branch: false,
      retention: "not_retained",
      status_note: certifiesMGComponent
        ? "Only the M_G primitive component is certified; six other h39 primitive components and the full tail certificate remain open."
        : "The artifact narrows M_G to an N_G shifted Cauchy prefix-tail witness and keeps the current numerator profile candidate-only.",
    },
  };
}

function h39NGDenominatorCauchyMGWitnessClaimBoundary(
  certifiesMGComponent
) {
  return {
    assumes_fixed_speed_window: false,
    consumes_denominator_cauchy_N_G_outer_bound: true,
    narrows_M_G_to_denominator_cauchy_N_G_witness: true,
    emits_N_G_outer_bound_M_G_witness: certifiesMGComponent,
    certifies_directed_rounded_h39_polydisc_M_G_bound:
      certifiesMGComponent,
    emits_full_primitive_provenance_report: false,
    verifies_all_primitive_bounds_provenance: false,
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound:
      false,
    certifies_directed_rounded_h39_polydisc_Xi_bound: false,
    certifies_directed_rounded_h39_jacobian_lower_bound: false,
    certifies_directed_rounded_h39_jacobian_lipschitz_bound: false,
    certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
      false,
    certifies_directed_rounded_fold_pair_scaled_remainder: false,
    certifies_I1_regular_critical_exhaustion: false,
    retained_branch: false,
    strongest_claim: certifiesMGComponent
      ? "Certifies only the M_G primitive component by converting one directed-rounded denominator-Cauchy N_G outer-bound witness into the existing N_G numerator subset replay."
      : "Narrows the M_G primitive component to a directed-rounded denominator-Cauchy N_G outer-bound witness plus the existing N_G prefix-tail replay.",
  };
}

function h39NGDenominatorCauchyMGPredicateCheck({
  denominatorCauchyNGOuterBoundCandidate,
  nGOuterBoundMGProfile,
  sharedDomainSignature,
}) {
  const source = denominatorCauchyNGOuterBoundCandidate ?? null;
  const profile = nGOuterBoundMGProfile ?? null;
  const diagnostic = source?.n_g_outer_bound_diagnostic ?? null;
  const branchCandidates = Array.isArray(
    source?.branch_denominator_candidates
  )
    ? source.branch_denominator_candidates
    : [];
  const branchMajorants = Array.isArray(source?.branch_g_outer_majorants)
    ? source.branch_g_outer_majorants
    : [];
  const branchLabels = branchCandidates.map((candidate) =>
    String(candidate?.branch)
  );
  const branchMajorantSum = branchMajorants.reduce(
    (sum, value) => sum + Number(value),
    0
  );
  const computedNGOuterBound =
    Number(source?.l_majorant) +
    Number(source?.outer_radius ?? source?.n_g_cauchy_outer_radius) ** 2 *
      Number(source?.lower_polynomial_majorant) +
    branchMajorantSum;
  const q = Number(profile?.q ?? profile?.cauchy_diagnostic?.q);
  const prefix = Number(profile?.candidate_M_G_finite_prefix);
  const tail = Number(profile?.candidate_M_G_cauchy_tail_after_prefix);
  const bound = Number(profile?.candidate_M_G_prefix_plus_tail_bound);
  const forbiddenSpeedFields = findForbiddenSpeedFields({
    denominatorCauchyNGOuterBoundCandidate: source,
    nGOuterBoundMGProfile: profile,
  });
  const checks = {
    source_present: source !== null,
    source_status_valid:
      source?.status ===
      "h39-denominator-cauchy-n-g-outer-bound-candidate-emitted",
    profile_present: profile !== null,
    profile_status_valid:
      profile?.status === "h39-n-g-outer-bound-candidate-m-g-emitted",
    shared_domain_signature_present:
      sharedDomainSignature !== null && sharedDomainSignature !== undefined,
    source_domain_signature_matches:
      domainSignatureMatches(
        proofDomainSignature(source),
        sharedDomainSignature
      ),
    directed_rounded_denominator_cauchy_source:
      proofDirectedRoundedCertified(source) &&
      source?.certifies_directed_rounded_shared_domain === true &&
      source?.certifies_directed_rounded_denominator_cauchy_N_G_outer_bound ===
        true,
    denominator_cauchy_tail_provenance:
      source?.includes_denominator_cauchy_tails === true ||
      source?.includes_analytic_tail === true,
    required_fold_pair_branches_present:
      H39_FOLD_PAIR_BRANCHES.every((branch) =>
        branchLabels.includes(branch)
      ) && branchCandidates.length === H39_FOLD_PAIR_BRANCHES.length,
    branch_denominator_candidates_positive:
      branchCandidates.length === H39_FOLD_PAIR_BRANCHES.length &&
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
      numericClose(diagnostic?.n_g_outer_bound, source?.n_g_cauchy_outer_bound) &&
      numericClose(source?.candidate_N_G_outer_bound, source?.n_g_cauchy_outer_bound) &&
      numericClose(computedNGOuterBound, source?.n_g_cauchy_outer_bound),
    profile_matches_source_outer_bound:
      numericClose(profile?.n_g_outer_bound, source?.n_g_cauchy_outer_bound) &&
      numericClose(profile?.n_g_outer_radius, source?.n_g_cauchy_outer_radius) &&
      numericClose(profile?.rho, source?.rho),
    n_g_shift_power_matches:
      Number(profile?.n_g_shift ?? profile?.cauchy_diagnostic?.shift_power) ===
      H39_NG_SHIFT_POWER,
    tail_ratio_strictly_below_one:
      Number.isFinite(q) && q >= 0 && q < 1,
    M_G_prefix_tail_nonnegative:
      Number.isFinite(prefix) &&
      prefix >= 0 &&
      Number.isFinite(tail) &&
      tail >= 0 &&
      Number.isFinite(bound) &&
      bound >= 0,
    M_G_bound_covers_prefix_plus_tail:
      Number.isFinite(bound) &&
      Number.isFinite(prefix) &&
      Number.isFinite(tail) &&
      bound >= prefix + tail,
    no_fixed_speed_window: forbiddenSpeedFields.length === 0,
  };
  const failedPredicates = Object.entries(checks)
    .filter(([, passes]) => passes !== true)
    .map(([key]) => key);

  return {
    checks,
    failed_predicates: failedPredicates,
    forbidden_speed_fields: forbiddenSpeedFields,
    branch_labels: branchLabels,
    branch_g_outer_majorant_sum: Number.isFinite(branchMajorantSum)
      ? branchMajorantSum
      : null,
    computed_N_G_outer_bound: Number.isFinite(computedNGOuterBound)
      ? computedNGOuterBound
      : null,
    M_G_value: Number.isFinite(bound) ? bound : null,
    q: Number.isFinite(q) ? q : null,
    certifies_denominator_cauchy_M_G_witness:
      failedPredicates.length === 0,
  };
}

export function buildH39NGDenominatorCauchyMGWitness({
  denominatorCauchyNGOuterBoundCandidate = null,
  nGOuterBoundMGProfile = null,
  sharedDomainSignature = null,
} = {}) {
  const predicateCheck = h39NGDenominatorCauchyMGPredicateCheck({
    denominatorCauchyNGOuterBoundCandidate,
    nGOuterBoundMGProfile,
    sharedDomainSignature,
  });
  const certifiesDenominatorCauchyMG =
    predicateCheck.certifies_denominator_cauchy_M_G_witness;
  const status = certifiesDenominatorCauchyMG
    ? H39_NG_DENOMINATOR_CAUCHY_MG_WITNESS_CERTIFIED_STATUS
    : H39_NG_DENOMINATOR_CAUCHY_MG_WITNESS_OPEN_STATUS;
  const firstFailedPredicate =
    predicateCheck.failed_predicates[0] ??
    "unknown-N_G-denominator-cauchy-M_G-witness-blocker";
  const generatedNGWitness = nGOuterBoundMGProfile
    ? {
        ...nGOuterBoundMGProfile,
        source_denominator_cauchy_candidate:
          denominatorCauchyNGOuterBoundCandidate,
        denominator_cauchy_witness_packet_id:
          NG_DENOMINATOR_CAUCHY_MG_WITNESS_PACKET_ID,
        domain_signature: sharedDomainSignature,
        certifies_directed_rounded: certifiesDenominatorCauchyMG,
        directed_rounded: certifiesDenominatorCauchyMG,
        certifies_directed_rounded_shared_domain:
          certifiesDenominatorCauchyMG,
        certificate_status: certifiesDenominatorCauchyMG
          ? "directed-rounded-certified"
          : "witness-required",
        includes_analytic_tail: true,
        includes_denominator_cauchy_tails: true,
        assumes_fixed_speed_window: false,
      }
    : null;
  const nGSubsetReplay = buildH39NGNumeratorWitnessSubset({
    nGOuterBoundMGWitness: generatedNGWitness,
    sharedDomainSignature,
  });
  const certifiesMGComponent =
    nGSubsetReplay?.result?.h39_M_G_component_witness === true;

  return {
    schema: H39_NG_DENOMINATOR_CAUCHY_MG_WITNESS_SCHEMA,
    packet_id: NG_DENOMINATOR_CAUCHY_MG_WITNESS_PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    provenance_status: status,
    witness_status: status,
    witness_scope: {
      report_kind: "h39-N_G-denominator-cauchy-M_G-witness",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      component: H39_NG_NUMERATOR_COMPONENT,
      witness_family: H39_NG_DENOMINATOR_CAUCHY_WITNESS_FAMILY,
      n_g_shift_power: H39_NG_SHIFT_POWER,
      required_branches: H39_FOLD_PAIR_BRANCHES,
      theorem_scope:
        "conditional conversion of a directed-rounded denominator-Cauchy N_G outer-bound witness into the existing M_G numerator subset replay; not a full primitive-vector certificate",
    },
    shared_domain_signature: sharedDomainSignature,
    source_denominator_cauchy_N_G_outer_bound_candidate:
      denominatorCauchyNGOuterBoundCandidate,
    source_N_G_outer_bound_M_G_profile: nGOuterBoundMGProfile,
    generated_N_G_outer_bound_M_G_witness: generatedNGWitness,
    N_G_numerator_subset_replay: nGSubsetReplay,
    predicate_check: predicateCheck,
    conditional_theorem: {
      hypothesis:
        "If the two branch denominator-Cauchy candidates have positive speed, delta-clearance, and Jacobian floors on one shared h39 graph-centered signature, and their directed-rounded branch majorants compose the N_G outer bound,",
      N_G_outer_bound:
        "B_N >= B_{G,-}+B_{G,+}+L_*+R_y^2 A_*",
      M_G_inequality:
        "M_G >= sum_{m=0}^K |g_m| rho^(m+41) + B_N * q^(K+42)/(1-q)",
      conclusion:
        "then the generated N_G prefix-tail witness may replay through the existing N_G numerator subset as an M_G primitive upper-bound witness.",
    },
    no_go_theorem: certifiesMGComponent
      ? null
      : {
          hypothesis:
            "At least one denominator-Cauchy source predicate, shared-domain predicate, branch-floor predicate, prefix-tail predicate, or no-speed-window predicate is not certified.",
          conclusion:
            "The denominator-Cauchy N_G route cannot promote to the M_G component witness until the failed predicate list is empty and the N_G numerator subset replay closes.",
          promotion_obstruction: firstFailedPredicate,
        },
    claim_boundary: h39NGDenominatorCauchyMGWitnessClaimBoundary(
      certifiesMGComponent
    ),
    result: {
      theory_status: certifiesMGComponent
        ? "h39-N_G-denominator-cauchy-M_G-component-witness-certified"
        : "h39-N_G-denominator-cauchy-M_G-witness-open",
      h39_denominator_cauchy_M_G_witness:
        certifiesDenominatorCauchyMG,
      h39_M_G_component_witness: certifiesMGComponent,
      h39_full_primitive_vector_certificate: false,
      h39_continuous_tail_certificate: false,
      retained_branch: false,
      retention: "not_retained",
      promotion_obstruction: certifiesMGComponent
        ? null
        : firstFailedPredicate,
      status_note: certifiesMGComponent
        ? "The denominator-Cauchy N_G witness feeds the existing N_G numerator subset and certifies only the M_G primitive component."
        : "The denominator-Cauchy N_G witness remains open; see failed predicates and the N_G numerator subset replay.",
    },
  };
}

function h39JacobianFloorWitnessSubsetClaimBoundary(certifiesNuJComponent) {
  return {
    assumes_fixed_speed_window: false,
    consumes_jacobian_analytic_profile_witness: true,
    narrows_nu_J_to_jacobian_floor_witness: true,
    certifies_directed_rounded_h39_jacobian_lower_bound:
      certifiesNuJComponent,
    emits_full_primitive_provenance_report: false,
    verifies_all_primitive_bounds_provenance: false,
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    certifies_directed_rounded_h39_polydisc_M_G_bound: false,
    certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound:
      false,
    certifies_directed_rounded_h39_polydisc_Xi_bound: false,
    certifies_directed_rounded_h39_jacobian_lipschitz_bound: false,
    certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
      false,
    certifies_directed_rounded_fold_pair_scaled_remainder: false,
    certifies_I1_regular_critical_exhaustion: false,
    retained_branch: false,
    strongest_claim: certifiesNuJComponent
      ? "Certifies only the nu_J primitive component from one directed-rounded Jacobian Cauchy floor witness; six h39 primitive components and downstream closure remain open."
      : "Narrows the nu_J primitive component to a directed-rounded Jacobian Cauchy floor witness requirement.",
  };
}

function h39JacobianFloorWitnessPredicateCheck({
  jacobianFloorWitness,
  sharedDomainSignature,
}) {
  const witness = jacobianFloorWitness ?? null;
  const cauchy = witness?.cauchy_diagnostic ?? null;
  const q = Number(witness?.q ?? cauchy?.q);
  const finiteFloor = Number(witness?.candidate_nu_J_finite_prefix);
  const tailLoss = Number(witness?.candidate_nu_J_cauchy_tail_loss_profile);
  const floor = Number(witness?.candidate_nu_J_prefix_plus_tail_floor);
  const forbiddenSpeedFields = findForbiddenSpeedFields(witness);
  const checks = {
    witness_present: witness !== null,
    status_valid:
      witness?.status ===
      "h39-jacobian-analytic-remainder-profile-candidate-emitted",
    shared_domain_signature_present:
      sharedDomainSignature !== null && sharedDomainSignature !== undefined,
    domain_signature_matches:
      domainSignatureMatches(
        proofDomainSignature(witness),
        sharedDomainSignature
      ),
    directed_rounded_same_domain_witness:
      proofDirectedRoundedCertified(witness) &&
      witness?.certifies_directed_rounded_shared_domain === true,
    cauchy_tail_present: cauchy !== null,
    tail_ratio_strictly_below_one:
      Number.isFinite(q) && q >= 0 && q < 1,
    jacobian_floor_terms_finite:
      Number.isFinite(finiteFloor) &&
      Number.isFinite(tailLoss) &&
      tailLoss >= 0 &&
      Number.isFinite(floor),
    jacobian_floor_covers_tail_loss:
      Number.isFinite(finiteFloor) &&
      Number.isFinite(tailLoss) &&
      Number.isFinite(floor) &&
      floor <= finiteFloor - tailLoss,
    jacobian_floor_positive: Number.isFinite(floor) && floor > 0,
    no_fixed_speed_window: forbiddenSpeedFields.length === 0,
  };
  const failedPredicates = Object.entries(checks)
    .filter(([, passes]) => passes !== true)
    .map(([key]) => key);

  return {
    checks,
    failed_predicates: failedPredicates,
    forbidden_speed_fields: forbiddenSpeedFields,
    nu_J_value: Number.isFinite(floor) ? floor : null,
    q: Number.isFinite(q) ? q : null,
    certifies_jacobian_floor: failedPredicates.length === 0,
  };
}

export function buildH39JacobianFloorWitnessSubset({
  jacobianFloorWitness = null,
  sharedDomainSignature = null,
} = {}) {
  const predicateCheck = h39JacobianFloorWitnessPredicateCheck({
    jacobianFloorWitness,
    sharedDomainSignature,
  });
  const certifiesNuJComponent =
    predicateCheck.certifies_jacobian_floor;
  const status = certifiesNuJComponent
    ? H39_JACOBIAN_FLOOR_WITNESS_SUBSET_CERTIFIED_STATUS
    : H39_JACOBIAN_FLOOR_WITNESS_SUBSET_OPEN_STATUS;
  const firstFailedPredicate =
    predicateCheck.failed_predicates[0] ??
    "unknown-jacobian-floor-witness-blocker";
  const componentWitness = {
    component: H39_JACOBIAN_FLOOR_COMPONENT,
    input_field: "center_jacobian_lower_bound_nu_J",
    relation: "lower-bound",
    value: certifiesNuJComponent ? predicateCheck.nu_J_value : null,
    witness_family: H39_JACOBIAN_FLOOR_WITNESS_FAMILY,
    required_witness:
      "directed-rounded same-domain center-Jacobian Cauchy floor for the h39 graph lift",
    domain_signature: sharedDomainSignature,
    certifies_directed_rounded: certifiesNuJComponent,
    directed_rounded: certifiesNuJComponent,
    certificate_status: certifiesNuJComponent
      ? "directed-rounded-certified"
      : "witness-required",
    first_failed_promotion_predicate: certifiesNuJComponent
      ? null
      : firstFailedPredicate,
    blocking_reason: certifiesNuJComponent
      ? null
      : "nu_J cannot promote until the Jacobian Cauchy floor witness certifies on the shared h39 graph-centered domain",
  };

  return {
    schema: H39_JACOBIAN_FLOOR_WITNESS_SUBSET_SCHEMA,
    packet_id: JACOBIAN_FLOOR_WITNESS_PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    provenance_status: status,
    witness_subset_status: status,
    witness_subset_scope: {
      report_kind: "h39-jacobian-floor-witness-subset",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      component: H39_JACOBIAN_FLOOR_COMPONENT,
      witness_family: H39_JACOBIAN_FLOOR_WITNESS_FAMILY,
      theorem_scope:
        "conditional reduction from a directed-rounded same-domain center-Jacobian Cauchy floor witness to the nu_J primitive component; not a full primitive-vector certificate",
    },
    shared_domain_signature: sharedDomainSignature,
    source_jacobian_floor_witness: jacobianFloorWitness,
    predicate_check: predicateCheck,
    component_witness: componentWitness,
    component_provenance: {
      nu_J: componentWitness,
    },
    conditional_theorem: {
      hypothesis:
        "If a directed-rounded same-domain center-Jacobian Cauchy floor witness bounds the retained Jacobian prefix below by its explicit tail loss on the shared h39 graph-centered signature S,",
      conclusion:
        "then its prefix-minus-tail floor is a primitive nu_J lower-bound witness.",
      nu_J_inequality:
        "nu_J <= finite Jacobian prefix floor - Cauchy tail loss, so the emitted floor is a certified lower bound for |partial_X R43(y,X_c,nu)|",
    },
    no_go_theorem: certifiesNuJComponent
      ? null
      : {
          hypothesis:
            "The supplied Jacobian floor profile is missing, candidate-only, malformed, nonpositive, or not on the shared graph-centered signature.",
          conclusion:
            "The nu_J primitive component cannot promote until the failed predicates list is empty on the same graph-centered domain signature.",
          promotion_obstruction: firstFailedPredicate,
        },
    claim_boundary: h39JacobianFloorWitnessSubsetClaimBoundary(
      certifiesNuJComponent
    ),
    result: {
      theory_status: certifiesNuJComponent
        ? "h39-jacobian-floor-nu_J-component-witness-certified"
        : "h39-jacobian-floor-witness-subset-open",
      h39_nu_J_component_witness: certifiesNuJComponent,
      h39_full_primitive_vector_certificate: false,
      h39_continuous_tail_certificate: false,
      retained_branch: false,
      retention: "not_retained",
      status_note: certifiesNuJComponent
        ? "Only the nu_J primitive component is certified; six other h39 primitive components and the full tail certificate remain open."
        : "The artifact narrows nu_J to a Jacobian Cauchy floor witness and keeps the current Jacobian profile candidate-only.",
    },
  };
}

function h39CoordinateCauchyR43JacobianWitnessClaimBoundary(
  certifiesComponents
) {
  return {
    assumes_fixed_speed_window: false,
    consumes_coordinate_cauchy_outer_bounds_profile: true,
    narrows_E_R_M_R_and_nu_J_to_coordinate_cauchy_witness: true,
    emits_R43_source_family_subset_replay: certifiesComponents,
    emits_jacobian_floor_subset_replay: certifiesComponents,
    certifies_directed_rounded_h39_center_residual_E_R_bound:
      certifiesComponents,
    certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound:
      certifiesComponents,
    certifies_directed_rounded_h39_jacobian_lower_bound:
      certifiesComponents,
    emits_full_primitive_provenance_report: false,
    verifies_all_primitive_bounds_provenance: false,
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    certifies_directed_rounded_h39_polydisc_M_G_bound: false,
    certifies_directed_rounded_h39_polydisc_Xi_bound: false,
    certifies_directed_rounded_h39_jacobian_lipschitz_bound: false,
    certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
      false,
    certifies_directed_rounded_fold_pair_scaled_remainder: false,
    certifies_I1_regular_critical_exhaustion: false,
    retained_branch: false,
    strongest_claim: certifiesComponents
      ? "Certifies only the E_R, M_R, and nu_J primitive components by converting one directed-rounded coordinate-Cauchy outer-bound profile into the existing R43 source-family and center-Jacobian subset replays."
      : "Narrows the E_R, M_R, and nu_J primitive components to a directed-rounded coordinate-Cauchy outer-bound profile plus the existing R43 and center-Jacobian subset replays.",
  };
}

function h39CoordinateCauchyHasFoldPairBranches(candidates) {
  const branchLabels = candidates.map((candidate) =>
    String(candidate?.branch)
  );
  return (
    candidates.length === H39_FOLD_PAIR_BRANCHES.length &&
    H39_FOLD_PAIR_BRANCHES.every((branch) =>
      branchLabels.includes(branch)
    )
  );
}

function h39CoordinateCauchyR43JacobianPredicateCheck({
  coordinateCauchyOuterBoundsProfileCandidate,
  r43AnalyticProfileWitness,
  jacobianFloorWitness,
  sharedDomainSignature,
}) {
  const source = coordinateCauchyOuterBoundsProfileCandidate ?? null;
  const r43Profile = r43AnalyticProfileWitness ?? null;
  const jacobianProfile = jacobianFloorWitness ?? null;
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
  const sourceResidualMax = finiteMaximum(
    sourceResidualCandidates.map(
      (candidate) =>
        candidate?.r43_cauchy_outer_bound ??
        candidate?.candidate_R43_source_outer_bound
    )
  );
  const jacobianMax = finiteMaximum(
    jacobianCandidates.map(
      (candidate) =>
        candidate?.jacobian_cauchy_outer_bound ??
        candidate?.candidate_R43_jacobian_outer_bound
    )
  );
  const sourceR43OuterBound = finiteNumber(
    source?.r43_cauchy_outer_bound ??
      source?.candidate_R43_source_outer_bound
  );
  const sourceR43OuterRadius = finiteNumber(source?.r43_cauchy_outer_radius);
  const sourceJacobianOuterBound = finiteNumber(
    source?.jacobian_cauchy_outer_bound ??
      source?.candidate_R43_jacobian_outer_bound
  );
  const sourceJacobianOuterRadius = finiteNumber(
    source?.jacobian_cauchy_outer_radius
  );
  const sourceJacobianNumeratorOuterRadius = finiteNumber(
    source?.jacobian_numerator_cauchy_outer_radius
  );
  const forbiddenSpeedFields = findForbiddenSpeedFields({
    coordinateCauchyOuterBoundsProfileCandidate: source,
    r43AnalyticProfileWitness: r43Profile,
    jacobianFloorWitness: jacobianProfile,
  });
  const checks = {
    source_present: source !== null,
    source_status_valid:
      source?.status ===
      "h39-coordinate-cauchy-outer-bounds-profile-candidate-emitted",
    r43_profile_present: r43Profile !== null,
    r43_profile_status_valid:
      r43Profile?.status ===
      "h39-r43-analytic-remainder-profile-candidate-emitted",
    jacobian_profile_present: jacobianProfile !== null,
    jacobian_profile_status_valid:
      jacobianProfile?.status ===
      "h39-jacobian-analytic-remainder-profile-candidate-emitted",
    shared_domain_signature_present:
      sharedDomainSignature !== null && sharedDomainSignature !== undefined,
    source_domain_signature_matches:
      domainSignatureMatches(
        proofDomainSignature(source),
        sharedDomainSignature
      ),
    directed_rounded_coordinate_cauchy_source:
      proofDirectedRoundedCertified(source) &&
      source?.certifies_directed_rounded_shared_domain === true &&
      source?.certifies_directed_rounded_coordinate_cauchy_outer_bounds ===
        true,
    coordinate_cauchy_tail_provenance:
      source?.includes_coordinate_cauchy_tails === true ||
      source?.includes_analytic_tail === true,
    source_residual_branch_candidates_present:
      h39CoordinateCauchyHasFoldPairBranches(sourceResidualCandidates),
    jacobian_branch_candidates_present:
      h39CoordinateCauchyHasFoldPairBranches(jacobianCandidates),
    source_residual_branch_statuses_valid:
      sourceResidualCandidates.length ===
        H39_FOLD_PAIR_BRANCHES.length &&
      sourceResidualCandidates.every(
        (candidate) =>
          candidate?.status ===
            "h39-source-residual-coordinate-cauchy-outer-bound-candidate-emitted" &&
          finiteNumber(
            candidate?.r43_cauchy_outer_bound ??
              candidate?.candidate_R43_source_outer_bound
          ) !== null
      ),
    jacobian_branch_statuses_valid:
      jacobianCandidates.length === H39_FOLD_PAIR_BRANCHES.length &&
      jacobianCandidates.every(
        (candidate) =>
          candidate?.status ===
            "h39-jacobian-coordinate-cauchy-outer-bound-candidate-emitted" &&
          finiteNumber(
            candidate?.jacobian_cauchy_outer_bound ??
              candidate?.candidate_R43_jacobian_outer_bound
          ) !== null
      ),
    source_R43_outer_bound_matches_branch_max:
      sourceResidualMax !== null &&
      numericClose(sourceResidualMax, sourceR43OuterBound) &&
      numericClose(
        sourceResidualMax,
        source?.candidate_R43_source_outer_bound
      ),
    source_jacobian_outer_bound_matches_branch_max:
      jacobianMax !== null &&
      numericClose(jacobianMax, sourceJacobianOuterBound) &&
      numericClose(
        jacobianMax,
        source?.candidate_R43_jacobian_outer_bound
      ),
    source_R43_outer_bound_nonnegative:
      sourceR43OuterBound !== null && sourceR43OuterBound >= 0,
    source_R43_outer_radius_positive:
      sourceR43OuterRadius !== null && sourceR43OuterRadius > 0,
    source_jacobian_outer_bound_nonnegative:
      sourceJacobianOuterBound !== null && sourceJacobianOuterBound >= 0,
    source_jacobian_outer_radius_positive:
      sourceJacobianOuterRadius !== null && sourceJacobianOuterRadius > 0,
    source_jacobian_removable_gap_positive:
      sourceJacobianNumeratorOuterRadius !== null &&
      sourceJacobianOuterRadius !== null &&
      sourceJacobianNumeratorOuterRadius > sourceJacobianOuterRadius,
    r43_profile_matches_coordinate_source:
      numericClose(r43Profile?.outer_bound, sourceR43OuterBound) &&
      numericClose(r43Profile?.outer_radius, sourceR43OuterRadius),
    jacobian_profile_matches_coordinate_source:
      numericClose(
        jacobianProfile?.outer_bound,
        sourceJacobianOuterBound
      ) &&
      numericClose(
        jacobianProfile?.outer_radius,
        sourceJacobianOuterRadius
      ),
    no_fixed_speed_window: forbiddenSpeedFields.length === 0,
  };
  const failedPredicates = Object.entries(checks)
    .filter(([, passes]) => passes !== true)
    .map(([key]) => key);

  return {
    checks,
    failed_predicates: failedPredicates,
    forbidden_speed_fields: forbiddenSpeedFields,
    source_residual_branch_labels: sourceResidualCandidates.map(
      (candidate) => candidate?.branch ?? null
    ),
    jacobian_branch_labels: jacobianCandidates.map(
      (candidate) => candidate?.branch ?? null
    ),
    source_R43_outer_bound: sourceR43OuterBound,
    source_R43_outer_radius: sourceR43OuterRadius,
    source_R43_branch_outer_bound_max: sourceResidualMax,
    source_jacobian_outer_bound: sourceJacobianOuterBound,
    source_jacobian_outer_radius: sourceJacobianOuterRadius,
    source_jacobian_numerator_outer_radius:
      sourceJacobianNumeratorOuterRadius,
    source_jacobian_branch_outer_bound_max: jacobianMax,
    certifies_coordinate_cauchy_R43_jacobian_witness:
      failedPredicates.length === 0,
  };
}

export function buildH39CoordinateCauchyR43JacobianWitness({
  coordinateCauchyOuterBoundsProfileCandidate = null,
  r43AnalyticProfileWitness = null,
  jacobianFloorWitness = null,
  sharedDomainSignature = null,
} = {}) {
  const predicateCheck =
    h39CoordinateCauchyR43JacobianPredicateCheck({
      coordinateCauchyOuterBoundsProfileCandidate,
      r43AnalyticProfileWitness,
      jacobianFloorWitness,
      sharedDomainSignature,
    });
  const certifiesCoordinateCauchy =
    predicateCheck.certifies_coordinate_cauchy_R43_jacobian_witness;
  const generatedR43Witness = r43AnalyticProfileWitness
    ? {
        ...r43AnalyticProfileWitness,
        source_coordinate_cauchy_outer_bounds_profile:
          coordinateCauchyOuterBoundsProfileCandidate,
        coordinate_cauchy_witness_packet_id:
          COORDINATE_CAUCHY_R43_JACOBIAN_WITNESS_PACKET_ID,
        domain_signature: sharedDomainSignature,
        certifies_directed_rounded: certifiesCoordinateCauchy,
        directed_rounded: certifiesCoordinateCauchy,
        certifies_directed_rounded_shared_domain:
          certifiesCoordinateCauchy,
        certificate_status: certifiesCoordinateCauchy
          ? "directed-rounded-certified"
          : "witness-required",
        includes_analytic_tail: true,
        includes_coordinate_cauchy_tails: true,
        assumes_fixed_speed_window: false,
      }
    : null;
  const generatedJacobianWitness = jacobianFloorWitness
    ? {
        ...jacobianFloorWitness,
        source_coordinate_cauchy_outer_bounds_profile:
          coordinateCauchyOuterBoundsProfileCandidate,
        coordinate_cauchy_witness_packet_id:
          COORDINATE_CAUCHY_R43_JACOBIAN_WITNESS_PACKET_ID,
        domain_signature: sharedDomainSignature,
        certifies_directed_rounded: certifiesCoordinateCauchy,
        directed_rounded: certifiesCoordinateCauchy,
        certifies_directed_rounded_shared_domain:
          certifiesCoordinateCauchy,
        certificate_status: certifiesCoordinateCauchy
          ? "directed-rounded-certified"
          : "witness-required",
        includes_analytic_tail: true,
        includes_coordinate_cauchy_tails: true,
        assumes_fixed_speed_window: false,
      }
    : null;
  const r43SubsetReplay = buildH39R43SourceFamilyWitnessSubset({
    r43AnalyticProfileWitness: generatedR43Witness,
    sharedDomainSignature,
  });
  const jacobianSubsetReplay = buildH39JacobianFloorWitnessSubset({
    jacobianFloorWitness: generatedJacobianWitness,
    sharedDomainSignature,
  });
  const certifiesR43Components =
    r43SubsetReplay?.result?.h39_E_R_component_witness === true &&
    r43SubsetReplay?.result?.h39_M_R_component_witness === true;
  const certifiesNuJComponent =
    jacobianSubsetReplay?.result?.h39_nu_J_component_witness === true;
  const certifiesComponents =
    certifiesCoordinateCauchy &&
    certifiesR43Components &&
    certifiesNuJComponent;
  const status = certifiesComponents
    ? H39_COORDINATE_CAUCHY_R43_JACOBIAN_WITNESS_CERTIFIED_STATUS
    : H39_COORDINATE_CAUCHY_R43_JACOBIAN_WITNESS_OPEN_STATUS;
  const replayObstruction = !certifiesR43Components
    ? r43SubsetReplay?.predicate_check?.failed_predicates?.[0] ??
      "R43-source-family-subset-replay-open"
    : !certifiesNuJComponent
      ? jacobianSubsetReplay?.predicate_check?.failed_predicates?.[0] ??
        "jacobian-floor-subset-replay-open"
      : null;
  const firstFailedPredicate =
    predicateCheck.failed_predicates[0] ??
    replayObstruction ??
    "unknown-coordinate-cauchy-R43-jacobian-witness-blocker";

  return {
    schema: H39_COORDINATE_CAUCHY_R43_JACOBIAN_WITNESS_SCHEMA,
    packet_id: COORDINATE_CAUCHY_R43_JACOBIAN_WITNESS_PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    provenance_status: status,
    witness_status: status,
    witness_scope: {
      report_kind: "h39-coordinate-cauchy-R43-jacobian-witness",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      components: H39_COORDINATE_CAUCHY_COMPONENTS,
      witness_family: H39_COORDINATE_CAUCHY_WITNESS_FAMILY,
      required_branches: H39_FOLD_PAIR_BRANCHES,
      theorem_scope:
        "conditional conversion of a directed-rounded coordinate-Cauchy outer-bound profile into the existing R43 source-family and center-Jacobian subset replays; not a full primitive-vector certificate",
    },
    shared_domain_signature: sharedDomainSignature,
    source_coordinate_cauchy_outer_bounds_profile_candidate:
      coordinateCauchyOuterBoundsProfileCandidate,
    source_R43_analytic_profile_candidate: r43AnalyticProfileWitness,
    source_jacobian_floor_profile_candidate: jacobianFloorWitness,
    generated_R43_analytic_profile_witness: generatedR43Witness,
    generated_jacobian_floor_witness: generatedJacobianWitness,
    R43_source_family_subset_replay: r43SubsetReplay,
    jacobian_floor_subset_replay: jacobianSubsetReplay,
    predicate_check: predicateCheck,
    component_provenance: {
      E_R: r43SubsetReplay?.component_provenance?.E_R ?? null,
      M_R: r43SubsetReplay?.component_provenance?.M_R ?? null,
      nu_J:
        jacobianSubsetReplay?.component_provenance?.nu_J ?? null,
    },
    conditional_theorem: {
      hypothesis:
        "If a directed-rounded same-domain coordinate-Cauchy outer-bound profile bounds both branch source residuals and both removable Jacobian numerators on the shared h39 graph-centered signature S,",
      R43_outer_bound:
        "B_R >= max_epsilon B_{F,epsilon}^{out} and the shifted R43 prefix-tail witness uses this same B_R and outer radius",
      jacobian_outer_bound:
        "B_J >= max_epsilon B_{H,epsilon}/(R_H-R_J) and the center-Jacobian floor witness uses this same B_J and outer radius",
      conclusion:
        "then the generated R43 source-family and center-Jacobian subset replays certify exactly the E_R, M_R, and nu_J primitive components.",
    },
    no_go_theorem: certifiesComponents
      ? null
      : {
          hypothesis:
            "At least one coordinate-Cauchy source predicate, shared-domain predicate, branch-coverage predicate, profile-match predicate, subset replay, or no-speed-window predicate is not certified.",
          conclusion:
            "The coordinate-Cauchy route cannot promote to the E_R, M_R, and nu_J component witnesses until the failed predicate list is empty and both embedded subset replays close.",
          promotion_obstruction: firstFailedPredicate,
        },
    claim_boundary: h39CoordinateCauchyR43JacobianWitnessClaimBoundary(
      certifiesComponents
    ),
    result: {
      theory_status: certifiesComponents
        ? "h39-coordinate-cauchy-E_R-M_R-nu_J-component-witness-certified"
        : "h39-coordinate-cauchy-R43-jacobian-witness-open",
      h39_coordinate_cauchy_R43_jacobian_witness:
        certifiesCoordinateCauchy,
      h39_E_R_component_witness:
        r43SubsetReplay?.result?.h39_E_R_component_witness === true,
      h39_M_R_component_witness:
        r43SubsetReplay?.result?.h39_M_R_component_witness === true,
      h39_nu_J_component_witness: certifiesNuJComponent,
      h39_full_primitive_vector_certificate: false,
      h39_continuous_tail_certificate: false,
      retained_branch: false,
      retention: "not_retained",
      promotion_obstruction: certifiesComponents
        ? null
        : firstFailedPredicate,
      status_note: certifiesComponents
        ? "The coordinate-Cauchy witness feeds the existing R43 and Jacobian subset replays and certifies only E_R, M_R, and nu_J."
        : "The coordinate-Cauchy witness remains open; see failed predicates and embedded subset replays.",
    },
  };
}

function h39GraphRadiiWitnessSubsetClaimBoundary(certifiesGraphRadii) {
  return {
    assumes_fixed_speed_window: false,
    consumes_graph_radii_witness: true,
    narrows_rho_X_and_r_X_to_declared_graph_radii_witness:
      true,
    certifies_directed_rounded_h39_graph_rho_X_radius:
      certifiesGraphRadii,
    certifies_directed_rounded_h39_graph_r_X_radius:
      certifiesGraphRadii,
    emits_full_primitive_provenance_report: false,
    verifies_all_primitive_bounds_provenance: false,
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    certifies_directed_rounded_h39_polydisc_M_G_bound: false,
    certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound:
      false,
    certifies_directed_rounded_h39_polydisc_Xi_bound: false,
    certifies_directed_rounded_h39_jacobian_lower_bound: false,
    certifies_directed_rounded_h39_jacobian_lipschitz_bound: false,
    certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
      false,
    certifies_directed_rounded_fold_pair_scaled_remainder: false,
    certifies_I1_regular_critical_exhaustion: false,
    retained_branch: false,
    strongest_claim: certifiesGraphRadii
      ? "Certifies only the rho_X and r_X graph-radii primitive components from one directed-rounded shared-domain radii witness; five h39 primitive components and downstream closure remain open."
      : "Narrows rho_X and r_X to a directed-rounded declared graph-radii witness requirement.",
  };
}

function h39GraphRadiiWitnessPredicateCheck({
  graphRadiiWitness,
  sharedDomainSignature,
}) {
  const witness = graphRadiiWitness ?? null;
  const rhoX = Number(witness?.rho_X ?? witness?.rhoX);
  const rX = Number(witness?.r_X ?? witness?.rX);
  const forbiddenSpeedFields = findForbiddenSpeedFields(witness);
  const checks = {
    witness_present: witness !== null,
    shared_domain_signature_present:
      sharedDomainSignature !== null && sharedDomainSignature !== undefined,
    domain_signature_matches:
      domainSignatureMatches(
        proofDomainSignature(witness),
        sharedDomainSignature
      ),
    directed_rounded_same_domain_witness:
      proofDirectedRoundedCertified(witness) &&
      witness?.certifies_directed_rounded_shared_domain === true,
    rho_X_finite_positive: Number.isFinite(rhoX) && rhoX > 0,
    r_X_finite_positive: Number.isFinite(rX) && rX > 0,
    r_X_inside_rho_X:
      Number.isFinite(rX) && Number.isFinite(rhoX) && rX < rhoX,
    no_fixed_speed_window: forbiddenSpeedFields.length === 0,
  };
  const failedPredicates = Object.entries(checks)
    .filter(([, passes]) => passes !== true)
    .map(([key]) => key);

  return {
    checks,
    failed_predicates: failedPredicates,
    forbidden_speed_fields: forbiddenSpeedFields,
    rho_X_value: Number.isFinite(rhoX) ? rhoX : null,
    r_X_value: Number.isFinite(rX) ? rX : null,
    certifies_graph_radii: failedPredicates.length === 0,
  };
}

export function buildH39GraphRadiiWitnessSubset({
  graphRadiiWitness = null,
  sharedDomainSignature = null,
} = {}) {
  const predicateCheck = h39GraphRadiiWitnessPredicateCheck({
    graphRadiiWitness,
    sharedDomainSignature,
  });
  const certifiesGraphRadii = predicateCheck.certifies_graph_radii;
  const status = certifiesGraphRadii
    ? H39_GRAPH_RADII_WITNESS_SUBSET_CERTIFIED_STATUS
    : H39_GRAPH_RADII_WITNESS_SUBSET_OPEN_STATUS;
  const firstFailedPredicate =
    predicateCheck.failed_predicates[0] ??
    "unknown-graph-radii-witness-blocker";
  const componentWitnesses = {
    rho_X: {
      component: "rho_X",
      input_field: "rho_X",
      relation: "declared-outer-radius",
      value: certifiesGraphRadii ? predicateCheck.rho_X_value : null,
      witness_family: H39_GRAPH_RADII_WITNESS_FAMILY,
      required_witness:
        "directed-rounded same-domain declaration of the outer X radius for the h39 Rouché graph lift",
      domain_signature: sharedDomainSignature,
      certifies_directed_rounded: certifiesGraphRadii,
      directed_rounded: certifiesGraphRadii,
      certificate_status: certifiesGraphRadii
        ? "directed-rounded-certified"
        : "witness-required",
      first_failed_promotion_predicate: certifiesGraphRadii
        ? null
        : firstFailedPredicate,
      blocking_reason: certifiesGraphRadii
        ? null
        : "rho_X cannot promote until the graph-radii witness certifies the declared radius on the shared h39 graph-centered domain",
    },
    r_X: {
      component: "r_X",
      input_field: "r_X",
      relation: "declared-inner-radius",
      value: certifiesGraphRadii ? predicateCheck.r_X_value : null,
      witness_family: H39_GRAPH_RADII_WITNESS_FAMILY,
      required_witness:
        "directed-rounded same-domain declaration of the inner graph radius for the h39 Rouché graph lift",
      domain_signature: sharedDomainSignature,
      certifies_directed_rounded: certifiesGraphRadii,
      directed_rounded: certifiesGraphRadii,
      certificate_status: certifiesGraphRadii
        ? "directed-rounded-certified"
        : "witness-required",
      first_failed_promotion_predicate: certifiesGraphRadii
        ? null
        : firstFailedPredicate,
      blocking_reason: certifiesGraphRadii
        ? null
        : "r_X cannot promote until the graph-radii witness certifies the declared radius on the shared h39 graph-centered domain",
    },
  };

  return {
    schema: H39_GRAPH_RADII_WITNESS_SUBSET_SCHEMA,
    packet_id: GRAPH_RADII_WITNESS_PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    provenance_status: status,
    witness_subset_status: status,
    witness_subset_scope: {
      report_kind: "h39-graph-radii-witness-subset",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      components: H39_GRAPH_RADII_COMPONENTS,
      witness_family: H39_GRAPH_RADII_WITNESS_FAMILY,
      theorem_scope:
        "conditional reduction from a directed-rounded same-domain graph-radii declaration to the rho_X and r_X primitive components; not a full primitive-vector certificate",
    },
    shared_domain_signature: sharedDomainSignature,
    source_graph_radii_witness: graphRadiiWitness,
    predicate_check: predicateCheck,
    component_witnesses: componentWitnesses,
    component_provenance: componentWitnesses,
    conditional_theorem: {
      hypothesis:
        "If one directed-rounded graph-centered domain declaration supplies 0<r_X<rho_X on the shared h39 signature S,",
      conclusion:
        "then those exact values are the primitive rho_X and r_X graph-radii witnesses consumed by the Rouché graph lift.",
      graph_radii_inequality: "0 < r_X < rho_X",
    },
    no_go_theorem: certifiesGraphRadii
      ? null
      : {
          hypothesis:
            "The supplied graph-radii witness is missing, candidate-only, malformed, has nonpositive or nested-inverted radii, or is not on the shared graph-centered signature.",
          conclusion:
            "The rho_X and r_X primitive components cannot promote until the failed predicates list is empty on the same graph-centered domain signature.",
          promotion_obstruction: firstFailedPredicate,
        },
    claim_boundary: h39GraphRadiiWitnessSubsetClaimBoundary(
      certifiesGraphRadii
    ),
    result: {
      theory_status: certifiesGraphRadii
        ? "h39-graph-radii-component-witness-certified"
        : "h39-graph-radii-witness-subset-open",
      h39_rho_X_component_witness: certifiesGraphRadii,
      h39_r_X_component_witness: certifiesGraphRadii,
      h39_full_primitive_vector_certificate: false,
      h39_continuous_tail_certificate: false,
      retained_branch: false,
      retention: "not_retained",
      status_note: certifiesGraphRadii
        ? "Only the rho_X and r_X graph-radii primitive components are certified; five other h39 primitive components and the full tail certificate remain open."
        : "The artifact narrows rho_X and r_X to a graph-radii declaration witness and keeps the full h39 primitive vector open.",
    },
  };
}

function h39LJKernelWitnessSubsetClaimBoundary(certifiesLJComponent) {
  return {
    assumes_fixed_speed_window: false,
    consumes_kernel_majorant_artifact: true,
    narrows_L_J_to_kernel_majorant_witness: true,
    certifies_directed_rounded_L_J_component_witness:
      certifiesLJComponent,
    emits_full_primitive_provenance_report: false,
    verifies_all_primitive_bounds_provenance: false,
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    certifies_directed_rounded_h39_polydisc_M_G_bound: false,
    certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound:
      false,
    certifies_directed_rounded_h39_polydisc_Xi_bound: false,
    certifies_directed_rounded_h39_jacobian_lower_bound: false,
    certifies_directed_rounded_h39_jacobian_lipschitz_bound:
      certifiesLJComponent,
    certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
      false,
    certifies_directed_rounded_fold_pair_scaled_remainder: false,
    certifies_I1_regular_critical_exhaustion: false,
    retained_branch: false,
    strongest_claim: certifiesLJComponent
      ? "Certifies only the h39 L_J primitive component from a supplied directed-rounded same-domain K_epsilon majorant witness; all other primitive components and h39 tail closure remain open."
      : "Reduces the h39 L_J primitive component to a same-domain K_epsilon majorant witness and records why the current kernel row cannot promote.",
  };
}

function firstFiniteNumber(...values) {
  for (const value of values) {
    const number = Number(value);
    if (Number.isFinite(number)) {
      return number;
    }
  }
  return null;
}

function extractKernelMajorantValue(kernelMajorantArtifact) {
  return firstFiniteNumber(
    kernelMajorantArtifact?.R43_second_x_kernel_continuous_majorant,
    kernelMajorantArtifact?.candidate_M_K_continuous_majorant,
    kernelMajorantArtifact?.candidate_M_K_continuous_elementary_majorant,
    kernelMajorantArtifact?.max_candidate_M_K_continuous_majorant,
    kernelMajorantArtifact?.max_candidate_M_K_continuous_elementary_majorant
  );
}

function extractKernelLJValue(kernelMajorantArtifact) {
  return firstFiniteNumber(
    kernelMajorantArtifact?.R43_jacobian_lipschitz_reduced_continuous_majorant,
    kernelMajorantArtifact?.candidate_L_J_reduced_continuous_majorant,
    kernelMajorantArtifact
      ?.candidate_L_J_reduced_continuous_elementary_majorant,
    kernelMajorantArtifact?.max_candidate_L_J_reduced_continuous_majorant,
    kernelMajorantArtifact
      ?.max_candidate_L_J_reduced_continuous_elementary_majorant
  );
}

function extractKernelRho(kernelMajorantArtifact, kernelMajorantWitness) {
  return firstFiniteNumber(
    kernelMajorantWitness?.rho,
    kernelMajorantArtifact?.rho,
    kernelMajorantArtifact?.kernel_domain?.rho
  );
}

function kernelWitnessValue(kernelMajorantWitness, kernelMajorantArtifact) {
  return firstFiniteNumber(
    kernelMajorantWitness?.value,
    kernelMajorantWitness?.M_K,
    kernelMajorantWitness?.kernel_majorant_M_K,
    extractKernelMajorantValue(kernelMajorantArtifact)
  );
}

function computedLJFromKernelMajorant(rho, kernelMajorant) {
  if (
    !Number.isFinite(rho) ||
    rho < 0 ||
    !Number.isFinite(kernelMajorant) ||
    kernelMajorant < 0
  ) {
    return null;
  }
  return root.nextUp(rho ** H39_LJ_KERNEL_Y_POWER * kernelMajorant);
}

function computedKepsilonSpeedTermUpper(nuLowerBound) {
  const nuLower = Number(nuLowerBound);
  if (!Number.isFinite(nuLower) || nuLower <= 0) {
    return null;
  }
  return root.nextUp(2 / (nuLower * nuLower));
}

function computedKepsilonBranchMajorant(branchWitness) {
  const speedTerm = Number(branchWitness?.speed_term_upper);
  const sinhDelta = Number(branchWitness?.sinh_delta_upper);
  const sinhPhi = Number(branchWitness?.sinh_phi_upper);
  if (
    !Number.isFinite(speedTerm) ||
    speedTerm < 0 ||
    !Number.isFinite(sinhDelta) ||
    sinhDelta < 0 ||
    !Number.isFinite(sinhPhi) ||
    sinhPhi < 0
  ) {
    return null;
  }
  return root.nextUp(speedTerm + sinhDelta + sinhPhi);
}

function sinhTaylorEnvelopePredicateCheck({
  envelope,
  argumentBound,
  suppliedUpper,
}) {
  const argument = Number(envelope?.argument_bound ?? envelope?.argument);
  const supplied = Number(suppliedUpper);
  const upper = Number(envelope?.sinh_upper_majorant ?? envelope?.sinh_majorant);
  const includedOddTerms = Number(
    envelope?.included_odd_terms ?? envelope?.included_odd_term_count
  );
  const prefix = Number(
    envelope?.finite_prefix_sum ?? envelope?.finite_prefix_majorant
  );
  const firstOmitted = Number(envelope?.first_omitted_term);
  const tailRatio = Number(envelope?.tail_ratio_bound);
  const tail = Number(envelope?.tail_majorant ?? envelope?.taylor_tail_majorant);
  const recomposedTail =
    Number.isFinite(firstOmitted) &&
    Number.isFinite(tailRatio) &&
    tailRatio < 1
      ? root.nextUp(firstOmitted / (1 - tailRatio))
      : null;
  const recomposedUpper =
    Number.isFinite(prefix) && Number.isFinite(tail)
      ? root.nextUp(prefix + tail)
      : null;
  const checks = {
    envelope_present: envelope !== null && envelope !== undefined,
    status_valid: envelope?.status === "sinh-taylor-tail-majorant-emitted",
    certificate_type_valid:
      envelope?.certificate_type ===
      "sinh-positive-taylor-geometric-tail-upper-envelope",
    argument_bound_covers_coordinate_bound:
      Number.isFinite(argument) &&
      Number.isFinite(argumentBound) &&
      argument >= 0 &&
      argument >= Number(argumentBound),
    included_odd_terms_present:
      Number.isInteger(includedOddTerms) && includedOddTerms >= 1,
    first_omitted_term_nonnegative:
      Number.isFinite(firstOmitted) && firstOmitted >= 0,
    finite_prefix_nonnegative: Number.isFinite(prefix) && prefix >= 0,
    tail_ratio_strictly_below_one:
      Number.isFinite(tailRatio) && tailRatio >= 0 && tailRatio < 1,
    tail_majorant_covers_geometric_tail:
      recomposedTail !== null && Number.isFinite(tail) && tail >= recomposedTail,
    sinh_upper_covers_prefix_plus_tail:
      recomposedUpper !== null &&
      Number.isFinite(upper) &&
      upper >= recomposedUpper,
    supplied_upper_matches_envelope:
      Number.isFinite(supplied) && valuesMatch(supplied, upper),
    no_math_sinh_oracle:
      envelope?.predicates?.no_math_sinh_oracle === true,
  };
  const failedPredicates = Object.entries(checks)
    .filter(([, passes]) => passes !== true)
    .map(([key]) => key);

  return {
    certificate_type: envelope?.certificate_type ?? null,
    argument_bound: Number.isFinite(argument) ? argument : null,
    supplied_upper: Number.isFinite(supplied) ? supplied : null,
    envelope_upper: Number.isFinite(upper) ? upper : null,
    included_odd_terms: Number.isInteger(includedOddTerms)
      ? includedOddTerms
      : null,
    tail_ratio_bound: Number.isFinite(tailRatio) ? tailRatio : null,
    checks,
    failed_predicates: failedPredicates,
    certifies_sinh_upper_envelope: failedPredicates.length === 0,
  };
}

function coordinateCauchyEnvelopePredicateCheck({
  envelope,
  coordinateLabel,
  branchDomainSignature,
  suppliedCoordinateMajorant,
}) {
  const prefix = Number(envelope?.finite_prefix_majorant);
  const tail = Number(envelope?.cauchy_tail_after_prefix_majorant);
  const prefixPlusTail = Number(envelope?.prefix_plus_tail_majorant);
  const supplied = Number(suppliedCoordinateMajorant);
  const q = Number(envelope?.tail_ratio_bound ?? envelope?.q);
  const target = Number(envelope?.target_radius);
  const outer = Number(envelope?.outer_radius);
  const checks = {
    envelope_present: envelope !== null && envelope !== undefined,
    status_valid: envelope?.status === "coordinate-cauchy-envelope-certified",
    certificate_type_valid:
      envelope?.certificate_type ===
      "coordinate-cauchy-prefix-geometric-tail-upper-envelope",
    coordinate_label_matches:
      envelope?.coordinate_label === coordinateLabel,
    domain_signature_matches:
      valuesMatch(envelope?.domain_signature ?? null, branchDomainSignature),
    target_radius_inside_outer_radius:
      Number.isFinite(target) &&
      Number.isFinite(outer) &&
      target >= 0 &&
      target < outer,
    tail_ratio_strictly_below_one:
      Number.isFinite(q) && q >= 0 && q < 1,
    tail_ratio_matches_target_over_outer:
      Number.isFinite(q) &&
      Number.isFinite(target) &&
      Number.isFinite(outer) &&
      outer > 0 &&
      valuesMatch(q, target / outer),
    finite_prefix_order_present:
      Number.isInteger(envelope?.finite_prefix_order) &&
      envelope.finite_prefix_order >= 0,
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
      Number.isFinite(supplied) && valuesMatch(supplied, prefixPlusTail),
    envelope_predicate_no_fixed_speed_window:
      envelope?.predicates?.no_fixed_speed_window === true ||
      envelope?.assumes_fixed_speed_window === false,
  };
  const failedPredicates = Object.entries(checks)
    .filter(([, passes]) => passes !== true)
    .map(([key]) => key);

  return {
    certificate_type: envelope?.certificate_type ?? null,
    coordinate_label: envelope?.coordinate_label ?? null,
    supplied_coordinate_majorant: Number.isFinite(supplied)
      ? supplied
      : null,
    envelope_coordinate_majorant: Number.isFinite(prefixPlusTail)
      ? prefixPlusTail
      : null,
    tail_ratio_bound: Number.isFinite(q) ? q : null,
    checks,
    failed_predicates: failedPredicates,
    certifies_coordinate_cauchy_envelope: failedPredicates.length === 0,
  };
}

function branchWitnessDomainMatches(branchWitness, sharedDomainSignature) {
  return (
    sharedDomainSignature !== null &&
    sharedDomainSignature !== undefined &&
    valuesMatch(branchWitness?.domain_signature ?? null, sharedDomainSignature)
  );
}

function h39KepsilonBranchCoverFailures(branchWitnesses) {
  if (branchWitnesses.length === 0) {
    return ["branch-coordinate-witnesses-missing"];
  }
  const labels = new Set(
    branchWitnesses
      .map((branchWitness) => branchWitness?.branch)
      .filter((label) => label !== null && label !== undefined)
  );
  const failures = [];
  for (const requiredBranch of H39_KEPSILON_REQUIRED_BRANCHES) {
    if (!labels.has(requiredBranch)) {
      failures.push(`branch-cover-missing:${requiredBranch}`);
    }
  }
  for (const label of labels) {
    if (!H39_KEPSILON_REQUIRED_BRANCHES.includes(label)) {
      failures.push(`branch-cover-unrecognized:${label}`);
    }
  }
  return failures;
}

function h39KepsilonBranchWitnessPredicateCheck({
  branchWitness,
  sharedDomainSignature,
}) {
  const nuLower = Number(branchWitness?.nu_lower_bound);
  const deltaBound = Number(branchWitness?.delta_abs_bound_D);
  const phiBound = Number(branchWitness?.phi_abs_bound_Phi);
  const speedTermUpper = Number(branchWitness?.speed_term_upper);
  const sinhDeltaUpper = Number(branchWitness?.sinh_delta_upper);
  const sinhPhiUpper = Number(branchWitness?.sinh_phi_upper);
  const computedSpeedTerm = computedKepsilonSpeedTermUpper(nuLower);
  const computedBranchMajorant =
    computedKepsilonBranchMajorant(branchWitness);
  const deltaCoordinateEnvelopeCheck = coordinateCauchyEnvelopePredicateCheck({
    envelope: branchWitness?.delta_coordinate_cauchy_envelope,
    coordinateLabel: "delta_epsilon",
    branchDomainSignature: branchWitness?.domain_signature ?? null,
    suppliedCoordinateMajorant: deltaBound,
  });
  const phiCoordinateEnvelopeCheck = coordinateCauchyEnvelopePredicateCheck({
    envelope: branchWitness?.phi_coordinate_cauchy_envelope,
    coordinateLabel: "phi_epsilon",
    branchDomainSignature: branchWitness?.domain_signature ?? null,
    suppliedCoordinateMajorant: phiBound,
  });
  const deltaSinhEnvelopeCheck = sinhTaylorEnvelopePredicateCheck({
    envelope: branchWitness?.sinh_delta_taylor_majorant,
    argumentBound: deltaBound,
    suppliedUpper: sinhDeltaUpper,
  });
  const phiSinhEnvelopeCheck = sinhTaylorEnvelopePredicateCheck({
    envelope: branchWitness?.sinh_phi_taylor_majorant,
    argumentBound: phiBound,
    suppliedUpper: sinhPhiUpper,
  });
  const checks = {
    branch_label_present:
      branchWitness?.branch !== null && branchWitness?.branch !== undefined,
    shared_domain_signature_present:
      sharedDomainSignature !== null && sharedDomainSignature !== undefined,
    domain_signature_matches: branchWitnessDomainMatches(
      branchWitness,
      sharedDomainSignature
    ),
    directed_rounded:
      branchWitness?.certifies_directed_rounded === true ||
      branchWitness?.directed_rounded === true,
    certificate_status_valid:
      branchWitness?.certificate_status === undefined ||
      branchWitness?.certificate_status === "directed-rounded-certified",
    nu_lower_positive: Number.isFinite(nuLower) && nuLower > 0,
    delta_abs_bound_present:
      Number.isFinite(deltaBound) && deltaBound >= 0,
    phi_abs_bound_present: Number.isFinite(phiBound) && phiBound >= 0,
    delta_coordinate_cauchy_envelope_certified:
      deltaCoordinateEnvelopeCheck
        .certifies_coordinate_cauchy_envelope === true,
    phi_coordinate_cauchy_envelope_certified:
      phiCoordinateEnvelopeCheck.certifies_coordinate_cauchy_envelope === true,
    speed_term_upper_valid:
      Number.isFinite(speedTermUpper) &&
      speedTermUpper >= 0 &&
      computedSpeedTerm !== null &&
      speedTermUpper >= computedSpeedTerm,
    sinh_delta_upper_valid:
      Number.isFinite(sinhDeltaUpper) &&
      sinhDeltaUpper >= 0 &&
      deltaSinhEnvelopeCheck.certifies_sinh_upper_envelope === true,
    sinh_phi_upper_valid:
      Number.isFinite(sinhPhiUpper) &&
      sinhPhiUpper >= 0 &&
      phiSinhEnvelopeCheck.certifies_sinh_upper_envelope === true,
    delta_sinh_upper_envelope_certified:
      deltaSinhEnvelopeCheck.certifies_sinh_upper_envelope === true,
    phi_sinh_upper_envelope_certified:
      phiSinhEnvelopeCheck.certifies_sinh_upper_envelope === true,
    coordinate_bounds_same_domain:
      branchWitness?.coordinate_bounds_same_domain === true &&
      deltaCoordinateEnvelopeCheck
        .certifies_coordinate_cauchy_envelope === true &&
      phiCoordinateEnvelopeCheck.certifies_coordinate_cauchy_envelope === true,
    outward_rounded_transcendentals:
      branchWitness?.outward_rounded_transcendentals === true &&
      deltaSinhEnvelopeCheck.certifies_sinh_upper_envelope === true &&
      phiSinhEnvelopeCheck.certifies_sinh_upper_envelope === true,
    includes_analytic_tail:
      branchWitness?.includes_analytic_tail === true &&
      deltaCoordinateEnvelopeCheck
        .certifies_coordinate_cauchy_envelope === true &&
      phiCoordinateEnvelopeCheck.certifies_coordinate_cauchy_envelope === true,
    assumes_fixed_speed_window:
      branchWitness?.assumes_fixed_speed_window === false,
  };
  const failedPredicates = Object.entries(checks)
    .filter(([, passes]) => passes !== true)
    .map(([key]) => key);

  return {
    branch: branchWitness?.branch ?? null,
    nu_lower_bound: Number.isFinite(nuLower) ? nuLower : null,
    delta_abs_bound_D: Number.isFinite(deltaBound) ? deltaBound : null,
    phi_abs_bound_Phi: Number.isFinite(phiBound) ? phiBound : null,
    computed_speed_term_upper: computedSpeedTerm,
    supplied_speed_term_upper: Number.isFinite(speedTermUpper)
      ? speedTermUpper
      : null,
    supplied_sinh_delta_upper: Number.isFinite(sinhDeltaUpper)
      ? sinhDeltaUpper
      : null,
    supplied_sinh_phi_upper: Number.isFinite(sinhPhiUpper)
      ? sinhPhiUpper
      : null,
    delta_coordinate_cauchy_envelope_check: deltaCoordinateEnvelopeCheck,
    phi_coordinate_cauchy_envelope_check: phiCoordinateEnvelopeCheck,
    delta_sinh_upper_envelope_check: deltaSinhEnvelopeCheck,
    phi_sinh_upper_envelope_check: phiSinhEnvelopeCheck,
    computed_branch_K_epsilon_majorant: computedBranchMajorant,
    checks,
    failed_predicates: failedPredicates,
    certifies_branch_K_epsilon_majorant:
      failedPredicates.length === 0 && computedBranchMajorant !== null,
  };
}

function h39KepsilonMajorantWitnessClaimBoundary(certifiesKepsilonMajorant) {
  return {
    assumes_fixed_speed_window: false,
    consumes_coordinate_majorant_witnesses: true,
    certifies_directed_rounded_K_epsilon_majorant:
      certifiesKepsilonMajorant,
    emits_L_J_component_witness_input: certifiesKepsilonMajorant,
    certifies_directed_rounded_L_J_component_witness: false,
    emits_full_primitive_provenance_report: false,
    verifies_all_primitive_bounds_provenance: false,
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    certifies_directed_rounded_h39_polydisc_M_G_bound: false,
    certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound:
      false,
    certifies_directed_rounded_h39_polydisc_Xi_bound: false,
    certifies_directed_rounded_h39_jacobian_lower_bound: false,
    certifies_directed_rounded_h39_jacobian_lipschitz_bound: false,
    certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
      false,
    certifies_directed_rounded_fold_pair_scaled_remainder: false,
    certifies_I1_regular_critical_exhaustion: false,
    retained_branch: false,
    strongest_claim: certifiesKepsilonMajorant
      ? "Certifies only the h39 K_epsilon kernel majorant M_K from supplied same-domain directed-rounded branch coordinate witnesses; L_J and full h39 closure remain separate replays."
      : "Reduces the h39 K_epsilon majorant backend to branch coordinate, speed-term, analytic-tail, and outward-rounded transcendental witness predicates.",
  };
}

export function buildH39KepsilonMajorantWitness({
  sourceKernelMajorantArtifact = null,
  branchCoordinateWitnesses = [],
  sharedDomainSignature = null,
  rho = null,
} = {}) {
  const branchWitnesses = Array.isArray(branchCoordinateWitnesses)
    ? branchCoordinateWitnesses
    : [];
  const branchChecks = branchWitnesses.map((branchWitness) =>
    h39KepsilonBranchWitnessPredicateCheck({
      branchWitness,
      sharedDomainSignature,
    })
  );
  const failedPredicates =
    h39KepsilonBranchCoverFailures(branchWitnesses);
  for (const branchCheck of branchChecks) {
    for (const predicate of branchCheck.failed_predicates) {
      failedPredicates.push(`${branchCheck.branch ?? "unknown"}:${predicate}`);
    }
  }
  const branchMajorants = branchChecks
    .map((branchCheck) => branchCheck.computed_branch_K_epsilon_majorant)
    .filter((value) => Number.isFinite(Number(value)))
    .map(Number);
  const computedMK =
    failedPredicates.length === 0 && branchMajorants.length > 0
      ? root.nextUp(Math.max(...branchMajorants))
      : null;
  const resolvedRho = firstFiniteNumber(
    rho,
    sourceKernelMajorantArtifact?.rho,
    sourceKernelMajorantArtifact?.kernel_domain?.rho
  );
  const certifiesKepsilonMajorant =
    computedMK !== null &&
    sharedDomainSignature !== null &&
    sharedDomainSignature !== undefined &&
    failedPredicates.length === 0;
  const status = certifiesKepsilonMajorant
    ? H39_KEPSILON_MAJORANT_WITNESS_CERTIFIED_STATUS
    : H39_KEPSILON_MAJORANT_WITNESS_OPEN_STATUS;
  const kernelMajorantWitness = certifiesKepsilonMajorant
    ? {
        component: "M_K",
        relation: "kernel-majorant-upper-bound",
        value: computedMK,
        M_K: computedMK,
        kernel_majorant_M_K: computedMK,
        rho: resolvedRho,
        domain_signature: sharedDomainSignature,
        certifies_directed_rounded: true,
        directed_rounded: true,
        certificate_status: "directed-rounded-certified",
        kernel_y_power: H39_LJ_KERNEL_Y_POWER,
        kernel_identity: H39_LJ_KERNEL_IDENTITY,
        kernel_formula: H39_LJ_KERNEL_FORMULA,
        kernel_majorant_relation: H39_LJ_KERNEL_MAJORANT_RELATION,
        lipschitz_reduction_relation:
          H39_LJ_LIPSCHITZ_REDUCTION_RELATION,
        outward_rounded_transcendentals: true,
        includes_analytic_tail: true,
        assumes_fixed_speed_window: false,
      }
    : null;
  const ljSubsetReplay = buildH39LJKernelWitnessSubset({
    kernelMajorantArtifact: sourceKernelMajorantArtifact,
    kernelMajorantWitness,
    sharedDomainSignature,
  });

  return {
    schema: H39_KEPSILON_MAJORANT_WITNESS_SCHEMA,
    packet_id: KEPSILON_MAJORANT_WITNESS_PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    provenance_status: status,
    witness_status: status,
    witness_scope: {
      report_kind: "h39-K_epsilon-majorant-witness",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      kernel_formula: H39_LJ_KERNEL_FORMULA,
      kernel_majorant_relation: H39_LJ_KERNEL_MAJORANT_RELATION,
      theorem_scope:
        "same-domain directed-rounded branch coordinate witnesses imply an h39 K_epsilon majorant M_K; not a full primitive-vector certificate",
    },
    shared_domain_signature: sharedDomainSignature,
    source_kernel_majorant_artifact: sourceKernelMajorantArtifact,
    branch_coordinate_witnesses: branchWitnesses,
    branch_witness_checks: branchChecks,
    candidate_kernel_replay: {
      candidate_M_K: extractKernelMajorantValue(sourceKernelMajorantArtifact),
      candidate_L_J: extractKernelLJValue(sourceKernelMajorantArtifact),
      rho: resolvedRho,
      source_status:
        sourceKernelMajorantArtifact?.status ??
        sourceKernelMajorantArtifact?.evaluation_level ??
        null,
      source:
        sourceKernelMajorantArtifact
          ?.candidate_L_J_reduced_continuous_majorant_source ??
        "kernel-continuous-majorant",
    },
    predicate_check: {
      branch_count: branchWitnesses.length,
      failed_predicates: failedPredicates,
      all_branch_witnesses_certified:
        branchChecks.length > 0 &&
        branchChecks.every(
          (branchCheck) =>
            branchCheck.certifies_branch_K_epsilon_majorant === true
        ),
      certifies_K_epsilon_majorant: certifiesKepsilonMajorant,
    },
    kernel_majorant_witness: kernelMajorantWitness,
    L_J_subset_replay: ljSubsetReplay,
    conditional_theorem: {
      hypothesis:
        "For each branch epsilon, directed-rounded same-domain witnesses provide |delta_epsilon| <= D_epsilon, |phi_epsilon| <= Phi_epsilon, nu >= nu_- > 0, an outward-rounded speed term 2/nu_-^2, outward-rounded sinh(D_epsilon), outward-rounded sinh(Phi_epsilon), and analytic-tail coverage on the same signature S.",
      conclusion:
        "Then M_K = max_epsilon(2/nu_-^2 + sinh(D_epsilon) + sinh(Phi_epsilon)) is a directed-rounded same-domain majorant for max_epsilon sup_S |K_epsilon|.",
      feeds:
        "The emitted M_K witness is consumable by the h39 L_J kernel witness subset, which separately computes L_J >= rho^41 M_K.",
    },
    no_go_theorem: certifiesKepsilonMajorant
      ? null
      : {
          hypothesis:
            "The current kernel row supplies only candidate coordinate-seminorm values or incomplete branch witnesses.",
          conclusion:
            "The K_epsilon majorant cannot promote until every branch witness predicate is satisfied on the same graph-centered signature.",
          promotion_obstruction:
            failedPredicates[0] ??
            H39_KEPSILON_MAJORANT_WITNESS_OPEN_STATUS,
        },
    claim_boundary: h39KepsilonMajorantWitnessClaimBoundary(
      certifiesKepsilonMajorant
    ),
    result: {
      theory_status: certifiesKepsilonMajorant
        ? "h39-K_epsilon-majorant-witness-certified"
        : "h39-K_epsilon-majorant-witness-open",
      h39_K_epsilon_majorant_witness: certifiesKepsilonMajorant,
      h39_L_J_component_witness: false,
      h39_full_primitive_vector_certificate: false,
      h39_continuous_tail_certificate: false,
      retained_branch: false,
      retention: "not_retained",
      status_note: certifiesKepsilonMajorant
        ? "Only the K_epsilon kernel majorant M_K is certified here; the embedded L_J subset replay is a separate downstream component check."
        : "The artifact narrows the K_epsilon backend to finite branch coordinate witness predicates and keeps the current kernel majorant candidate-only.",
    },
  };
}

function kernelWitnessDomainMatches({
  kernelMajorantWitness,
  sharedDomainSignature,
}) {
  return (
    sharedDomainSignature !== null &&
    sharedDomainSignature !== undefined &&
    valuesMatch(
      kernelMajorantWitness?.domain_signature ?? null,
      sharedDomainSignature
    )
  );
}

function h39LJKernelWitnessPredicateCheck({
  kernelMajorantArtifact,
  kernelMajorantWitness,
  sharedDomainSignature,
}) {
  const rho = extractKernelRho(kernelMajorantArtifact, kernelMajorantWitness);
  const kernelMajorant = kernelWitnessValue(
    kernelMajorantWitness,
    kernelMajorantArtifact
  );
  const candidateLJ = extractKernelLJValue(kernelMajorantArtifact);
  const computedLJ = computedLJFromKernelMajorant(rho, kernelMajorant);
  const witnessProvided =
    kernelMajorantWitness !== null &&
    kernelMajorantWitness !== undefined;
  const checks = {
    component_matches:
      !witnessProvided ||
      (kernelMajorantWitness.component ?? "M_K") === "M_K",
    rho_present: Number.isFinite(rho) && rho >= 0,
    kernel_majorant_present:
      Number.isFinite(kernelMajorant) && kernelMajorant >= 0,
    shared_domain_signature_present:
      sharedDomainSignature !== null && sharedDomainSignature !== undefined,
    domain_signature_matches: kernelWitnessDomainMatches({
      kernelMajorantWitness,
      sharedDomainSignature,
    }),
    directed_rounded:
      kernelMajorantWitness?.certifies_directed_rounded === true ||
      kernelMajorantWitness?.directed_rounded === true,
    certificate_status_valid:
      kernelMajorantWitness?.certificate_status === undefined ||
      kernelMajorantWitness?.certificate_status ===
        "directed-rounded-certified",
    kernel_y_power_matches:
      Number(kernelMajorantWitness?.kernel_y_power) ===
      H39_LJ_KERNEL_Y_POWER,
    kernel_identity_matches:
      kernelMajorantWitness?.kernel_identity === H39_LJ_KERNEL_IDENTITY,
    kernel_majorant_relation_matches:
      kernelMajorantWitness?.kernel_majorant_relation ===
      H39_LJ_KERNEL_MAJORANT_RELATION,
    lipschitz_reduction_relation_matches:
      kernelMajorantWitness?.lipschitz_reduction_relation ===
      H39_LJ_LIPSCHITZ_REDUCTION_RELATION,
    outward_rounded_transcendentals:
      kernelMajorantWitness?.outward_rounded_transcendentals === true,
    includes_analytic_tail:
      kernelMajorantWitness?.includes_analytic_tail === true,
    assumes_fixed_speed_window:
      kernelMajorantWitness?.assumes_fixed_speed_window === false,
  };

  const failedPredicates = [];
  if (!witnessProvided) {
    failedPredicates.push("kernel-majorant-witness-missing");
  }
  for (const [key, passes] of Object.entries(checks)) {
    if (passes !== true) {
      failedPredicates.push(key);
    }
  }
  const certifiesLJComponent =
    witnessProvided &&
    failedPredicates.length === 0 &&
    computedLJ !== null;

  return {
    rho,
    kernel_majorant_M_K: kernelMajorant,
    candidate_L_J_from_kernel_artifact: candidateLJ,
    computed_L_J: computedLJ,
    checks,
    failed_predicates: failedPredicates,
    certifies_L_J_component: certifiesLJComponent,
  };
}

export function buildH39LJKernelWitnessSubset({
  kernelMajorantArtifact = null,
  kernelMajorantWitness = null,
  sharedDomainSignature = null,
} = {}) {
  const predicateCheck = h39LJKernelWitnessPredicateCheck({
    kernelMajorantArtifact,
    kernelMajorantWitness,
    sharedDomainSignature,
  });
  const certifiesLJComponent = predicateCheck.certifies_L_J_component;
  const status = certifiesLJComponent
    ? H39_LJ_KERNEL_WITNESS_SUBSET_CERTIFIED_STATUS
    : H39_LJ_KERNEL_WITNESS_SUBSET_OPEN_STATUS;
  const componentWitness = {
    component: H39_LJ_KERNEL_COMPONENT,
    input_field: "jacobian_lipschitz_bound_L_J",
    relation: "lipschitz-upper-bound",
    value: certifiesLJComponent ? predicateCheck.computed_L_J : null,
    witness_family: H39_LJ_KERNEL_WITNESS_FAMILY,
    required_witness:
      "directed-rounded same-domain K_epsilon majorant with analytic-tail and outward-rounded transcendental bounds",
    domain_signature: sharedDomainSignature,
    kernel_y_power: H39_LJ_KERNEL_Y_POWER,
    kernel_identity: H39_LJ_KERNEL_IDENTITY,
    kernel_formula: H39_LJ_KERNEL_FORMULA,
    kernel_majorant_relation: H39_LJ_KERNEL_MAJORANT_RELATION,
    lipschitz_reduction_relation: H39_LJ_LIPSCHITZ_REDUCTION_RELATION,
    kernel_majorant_M_K: predicateCheck.kernel_majorant_M_K,
    rho: predicateCheck.rho,
    certifies_directed_rounded: certifiesLJComponent,
    directed_rounded: certifiesLJComponent,
    certificate_status: certifiesLJComponent
      ? "directed-rounded-certified"
      : "witness-required",
    first_failed_promotion_predicate: certifiesLJComponent
      ? null
      : (predicateCheck.failed_predicates[0] ?? "unknown-L_J-witness-blocker"),
    blocking_reason: certifiesLJComponent
      ? null
      : "L_J cannot promote until M_K is a directed-rounded same-domain K_epsilon majorant with analytic-tail and outward-rounded transcendental provenance",
  };

  return {
    schema: H39_LJ_KERNEL_WITNESS_SUBSET_SCHEMA,
    packet_id: LJ_KERNEL_WITNESS_PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    provenance_status: status,
    witness_subset_status: status,
    witness_subset_scope: {
      report_kind: "h39-L_J-kernel-witness-subset",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      component: H39_LJ_KERNEL_COMPONENT,
      witness_family: H39_LJ_KERNEL_WITNESS_FAMILY,
      kernel_y_power: H39_LJ_KERNEL_Y_POWER,
      theorem_scope:
        "conditional reduction from a directed-rounded same-domain K_epsilon majorant to the h39 L_J primitive component; not a full primitive-vector certificate",
    },
    shared_domain_signature: sharedDomainSignature,
    source_kernel_majorant_artifact: kernelMajorantArtifact,
    kernel_majorant_witness: kernelMajorantWitness,
    candidate_kernel_replay: {
      rho: predicateCheck.rho,
      candidate_M_K:
        extractKernelMajorantValue(kernelMajorantArtifact) ??
        predicateCheck.kernel_majorant_M_K,
      candidate_L_J:
        predicateCheck.candidate_L_J_from_kernel_artifact ??
        predicateCheck.computed_L_J,
      source_status:
        kernelMajorantArtifact?.status ??
        kernelMajorantArtifact?.evaluation_level ??
        null,
      source:
        kernelMajorantArtifact
          ?.candidate_L_J_reduced_continuous_majorant_source ??
        "kernel-continuous-majorant",
      certifies_directed_rounded_shared_domain:
        kernelMajorantArtifact?.certifies_directed_rounded_shared_domain ===
        true,
    },
    predicate_check: predicateCheck,
    component_witness: componentWitness,
    component_provenance: {
      L_J: componentWitness,
    },
    conditional_theorem: {
      hypothesis:
        "If a directed-rounded same-domain certificate proves M_K >= max_epsilon sup_S |K_epsilon| on the shared h39 graph-centered signature S, with outward-rounded transcendental bounds and analytic tails included,",
      conclusion:
        "then L_J >= rho^41 M_K is a directed-rounded primitive witness for the h39 X-Jacobian Lipschitz component.",
      inequality:
        "|partial_X R43(y,X,nu)-partial_X R43(y,X_c(nu),nu)| <= L_J |X-X_c(nu)|",
    },
    no_go_theorem: certifiesLJComponent
      ? null
      : {
          hypothesis:
            "The current kernel row supplies only a candidate M_K/L_J value or an incomplete witness.",
          conclusion:
            "The L_J component cannot be promoted until the failed predicates list is empty on the same graph-centered domain signature.",
          promotion_obstruction:
            predicateCheck.failed_predicates[0] ??
            H39_LJ_KERNEL_WITNESS_SUBSET_OPEN_STATUS,
        },
    claim_boundary: h39LJKernelWitnessSubsetClaimBoundary(
      certifiesLJComponent
    ),
    result: {
      theory_status: certifiesLJComponent
        ? "h39-L_J-component-witness-certified"
        : "h39-L_J-kernel-witness-subset-open",
      h39_L_J_component_witness: certifiesLJComponent,
      h39_full_primitive_vector_certificate: false,
      h39_continuous_tail_certificate: false,
      retained_branch: false,
      retention: "not_retained",
      status_note: certifiesLJComponent
        ? "Only the L_J primitive component is certified; six other h39 primitive components and the full tail certificate remain open."
        : "The artifact narrows L_J to a K_epsilon majorant witness and keeps the current kernel majorant candidate-only.",
    },
  };
}

export function buildH39CandidatePrimitiveProvenanceReportFromPrimitiveVectorBackendArtifact(
  primitiveVectorBackendArtifact = null,
  { sharedDomainSignature = null } = {}
) {
  const inputReady =
    primitiveVectorBackendArtifact?.primitive_diagnostic_input_ready === true;
  const input = inputReady
    ? (primitiveVectorBackendArtifact?.primitive_diagnostic_input ?? {})
    : {};
  const componentProvenance = {};
  const presentComponents = [];
  const missingComponents = [];

  for (const component of REQUIRED_PRIMITIVE_PROVENANCE_COMPONENTS) {
    const value = primitiveProvenanceInputValue(input, component.inputField);
    if (!isProvided(value)) {
      missingComponents.push(component.key);
      continue;
    }
    presentComponents.push(component.key);
    componentProvenance[component.key] = {
      component: component.key,
      input_field: component.inputField,
      relation: component.relation,
      value,
      certifies_directed_rounded: false,
      directed_rounded: false,
      certificate_status: "candidate-only",
      domain_signature: sharedDomainSignature,
      provenance_source:
        primitiveVectorBackendArtifact?.packet_id ?? null,
      source_component_path: primitiveComponentSource(
        primitiveVectorBackendArtifact,
        component
      ),
      blocking_reason:
        "source primitive-vector backend is candidate-only/provided-unverified and does not verify directed-rounded same-domain provenance",
    };
  }

  const sourceClaim = primitiveVectorBackendArtifact?.claim_boundary ?? {};
  const primitiveBoundsStatus =
    input.primitive_bounds_status ??
    primitiveVectorBackendArtifact?.backend_scope?.primitive_bounds_status ??
    DEFAULT_PRIMITIVE_BOUNDS_STATUS;
  const noGoFlags = {
    source_candidate_only:
      primitiveVectorBackendArtifact?.backend_scope?.candidate_only ?? null,
    primitive_bounds_status: primitiveBoundsStatus,
    source_verifies_primitive_bounds_provenance:
      sourceClaim.verifies_primitive_bounds_provenance ?? null,
    source_certifies_continuous_polydisc_primitives:
      sourceClaim.certifies_continuous_polydisc_primitives ?? null,
    source_certifies_directed_rounded_shared_domain:
      sourceClaim.certifies_directed_rounded_shared_domain ?? null,
    source_certifies_directed_rounded_h39_polydisc_M_G_bound:
      sourceClaim.certifies_directed_rounded_h39_polydisc_M_G_bound ?? null,
    source_certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound:
      sourceClaim
        .certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound ??
      null,
    source_certifies_directed_rounded_h39_jacobian_lower_bound:
      sourceClaim.certifies_directed_rounded_h39_jacobian_lower_bound ??
      null,
    source_certifies_directed_rounded_h39_jacobian_lipschitz_bound:
      sourceClaim.certifies_directed_rounded_h39_jacobian_lipschitz_bound ??
      null,
    source_retained_branch: sourceClaim.retained_branch ?? null,
  };

  return {
    schema: H39_CANDIDATE_PRIMITIVE_PROVENANCE_REPORT_SCHEMA,
    packet_id: CANDIDATE_PROVENANCE_PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    provenance_report_scope: {
      report_kind: "h39-candidate-primitive-provenance-no-go-report",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      required_provenance_status:
        DIRECTED_ROUNDED_SAME_DOMAIN_PROVENANCE_STATUS,
      emitted_provenance_status:
        H39_CANDIDATE_ONLY_PRIMITIVE_PROVENANCE_STATUS,
      required_component_keys:
        REQUIRED_PRIMITIVE_PROVENANCE_COMPONENTS.map(
          (component) => component.key
        ),
      theorem_scope:
        "proves current primitive-vector artifact non-promotion unless a separate directed-rounded same-domain provenance report supplies all seven component certificates",
    },
    provenance_status: H39_CANDIDATE_ONLY_PRIMITIVE_PROVENANCE_STATUS,
    provenance_source:
      primitiveVectorBackendArtifact?.packet_id ?? null,
    shared_domain_signature: sharedDomainSignature,
    component_provenance: componentProvenance,
    source_primitive_vector_backend:
      sourcePrimitiveVectorBackendSummary(primitiveVectorBackendArtifact),
    source_primitive_vector_backend_artifact:
      primitiveVectorBackendArtifact,
    candidate_provenance_summary: {
      primitive_diagnostic_input_ready: inputReady,
      present_components: presentComponents,
      missing_components: missingComponents,
      candidate_only_components: presentComponents,
      non_directed_rounded_components: presentComponents,
      no_go_flags: noGoFlags,
      theorem_claim:
        "A candidate primitive vector whose source claim boundary leaves primitive provenance and directed-rounded shared-domain certification false cannot be promoted to an h39 continuous-tail certificate by replay alone.",
    },
    no_go_theorem: {
      hypothesis:
        "The primitive-vector backend supplies candidate component values but no directed-rounded same-domain provenance report for E_R, M_R, M_G, nu_J, L_J, rho_X, and r_X.",
      conclusion:
        "The resulting report must keep h39 continuous-tail certification false; the obstruction is artifact provenance, not a numerical failure of the h39 Rouché-primitive inequalities.",
      promotion_obstruction:
        H39_CANDIDATE_ONLY_PRIMITIVE_PROVENANCE_STATUS,
    },
    claim_boundary: h39CandidatePrimitiveProvenanceClaimBoundary(),
    result: {
      theory_status:
        "h39-candidate-primitive-provenance-no-go-report-emitted",
      h39_continuous_tail_certificate: false,
      promotion_obstruction:
        H39_CANDIDATE_ONLY_PRIMITIVE_PROVENANCE_STATUS,
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The report records candidate primitive values and the exact non-promotion obstruction. It does not emit a directed-rounded same-domain provenance certificate.",
    },
  };
}

function domainSignatureMatches(left, right) {
  return JSON.stringify(left ?? null) === JSON.stringify(right ?? null);
}

function primitiveProvenanceInputValue(input, field) {
  return input?.[field] ?? null;
}

function proofDirectedRoundedCertified(proof) {
  const directedRounded =
    proof?.certifies_directed_rounded === true ||
    proof?.directed_rounded === true;
  const certificateStatus =
    proof?.certificate_status === undefined ||
    proof?.certificate_status === "directed-rounded-certified";
  return directedRounded && certificateStatus;
}

function proofDomainSignature(proof) {
  return proof?.domain_signature ?? proof?.domain_id ?? null;
}

function componentValueCoversPrimitiveInput(component, proofValue, inputValue) {
  if (proofValue === null || inputValue === null) {
    return proofValue === inputValue;
  }
  const proofNumber = Number(proofValue);
  const inputNumber = Number(inputValue);
  if (!Number.isFinite(proofNumber) || !Number.isFinite(inputNumber)) {
    return valuesMatch(proofValue, inputValue);
  }
  if (valuesMatch(proofNumber, inputNumber)) {
    return true;
  }
  if (
    component.relation === "upper-bound" ||
    component.relation === "lipschitz-upper-bound"
  ) {
    return proofNumber <= inputNumber;
  }
  if (component.relation === "lower-bound") {
    return proofNumber >= inputNumber;
  }
  return false;
}

function componentValueCoverageRule(component) {
  if (
    component.relation === "upper-bound" ||
    component.relation === "lipschitz-upper-bound"
  ) {
    return "directed-rounded upper witness value must be <= primitive reducer input";
  }
  if (component.relation === "lower-bound") {
    return "directed-rounded lower witness value must be >= primitive reducer input";
  }
  return "declared graph radius must equal primitive reducer input";
}

function checkH39DirectedRoundedPrimitiveProvenance({
  primitiveVectorBackendArtifact,
  directedRoundedProvenanceReport,
}) {
  const input =
    primitiveVectorBackendArtifact?.primitive_diagnostic_input_ready === true
      ? (primitiveVectorBackendArtifact?.primitive_diagnostic_input ?? {})
      : {};
  const commonDomain =
    directedRoundedProvenanceReport?.shared_domain_signature ??
    directedRoundedProvenanceReport?.graph_centered_domain?.domain_id ??
    null;
  const componentProvenance =
    directedRoundedProvenanceReport?.component_provenance ?? {};
  const forbiddenSpeedFields = findForbiddenSpeedFields(
    directedRoundedProvenanceReport
  );
  const missingComponents = [];
  const invalidComponents = [];
  const mismatchedValues = [];
  const mismatchedDomains = [];
  const nonDirectedRoundedComponents = [];
  const valueCoverage = {};

  for (const component of REQUIRED_PRIMITIVE_PROVENANCE_COMPONENTS) {
    const proof = componentProvenance[component.key];
    if (proof === undefined || proof === null) {
      missingComponents.push(component.key);
      continue;
    }
    if (
      (proof.component ?? component.key) !== component.key ||
      (proof.input_field !== undefined &&
        proof.input_field !== component.inputField)
    ) {
      invalidComponents.push(`${component.key}:component`);
    }
    if (proof.relation !== component.relation) {
      invalidComponents.push(`${component.key}:relation`);
    }
    if (!proofDirectedRoundedCertified(proof)) {
      nonDirectedRoundedComponents.push(component.key);
      invalidComponents.push(`${component.key}:not-directed-rounded`);
    }
    const primitiveInputValue = primitiveProvenanceInputValue(
      input,
      component.inputField
    );
    const coversPrimitiveInput = componentValueCoversPrimitiveInput(
      component,
      proof.value ?? null,
      primitiveInputValue
    );
    valueCoverage[component.key] = {
      relation: component.relation,
      coverage_rule: componentValueCoverageRule(component),
      proof_value: proof.value ?? null,
      primitive_input_value: primitiveInputValue,
      covers_primitive_input: coversPrimitiveInput,
    };
    if (!coversPrimitiveInput) {
      mismatchedValues.push(component.key);
    }
    if (!domainSignatureMatches(proofDomainSignature(proof), commonDomain)) {
      mismatchedDomains.push(component.key);
    }
  }

  const inputReady =
    primitiveVectorBackendArtifact?.primitive_diagnostic_input_ready === true;
  const status = !inputReady
    ? PROVENANCE_VERIFICATION_STATUSES.inputMissing
    : forbiddenSpeedFields.length > 0
      ? PROVENANCE_VERIFICATION_STATUSES.rejectedSpeed
      : directedRoundedProvenanceReport?.provenance_status ===
          H39_CANDIDATE_ONLY_PRIMITIVE_PROVENANCE_STATUS
        ? PROVENANCE_VERIFICATION_STATUSES.candidateOnly
      : directedRoundedProvenanceReport?.provenance_status ===
          H39_PRIMITIVE_PROVENANCE_WITNESS_SET_STATUS
        ? PROVENANCE_VERIFICATION_STATUSES.witnessSetOpen
      : directedRoundedProvenanceReport?.provenance_status !==
          DIRECTED_ROUNDED_SAME_DOMAIN_PROVENANCE_STATUS
        ? PROVENANCE_VERIFICATION_STATUSES.statusOpen
        : commonDomain === null
          ? PROVENANCE_VERIFICATION_STATUSES.missingSignature
          : missingComponents.length > 0
            ? PROVENANCE_VERIFICATION_STATUSES.missingComponents
            : invalidComponents.length > 0
              ? PROVENANCE_VERIFICATION_STATUSES.invalidComponents
              : mismatchedValues.length > 0
                ? PROVENANCE_VERIFICATION_STATUSES.valueMismatch
                : mismatchedDomains.length > 0
                  ? PROVENANCE_VERIFICATION_STATUSES.domainMismatch
                  : PROVENANCE_VERIFICATION_STATUSES.certified;

  return {
    provenance_status:
      directedRoundedProvenanceReport?.provenance_status ?? null,
    required_provenance_status:
      DIRECTED_ROUNDED_SAME_DOMAIN_PROVENANCE_STATUS,
    input_ready: inputReady,
    shared_domain_signature: commonDomain,
    required_components: REQUIRED_PRIMITIVE_PROVENANCE_COMPONENTS.map(
      (component) => component.key
    ),
    missing_components: missingComponents,
    invalid_components: invalidComponents,
    non_directed_rounded_components: nonDirectedRoundedComponents,
    mismatched_values: mismatchedValues,
    mismatched_domains: mismatchedDomains,
    domain_mismatch_components: mismatchedDomains,
    value_mismatch_components: mismatchedValues,
    value_coverage: valueCoverage,
    forbidden_speed_fields: forbiddenSpeedFields,
    same_domain_component_count:
      REQUIRED_PRIMITIVE_PROVENANCE_COMPONENTS.length -
      missingComponents.length -
      mismatchedDomains.length,
    all_components_on_declared_domain:
      missingComponents.length === 0 && mismatchedDomains.length === 0,
    all_component_values_cover_primitive_input:
      missingComponents.length === 0 && mismatchedValues.length === 0,
    all_required_components_directed_rounded:
      missingComponents.length === 0 &&
      nonDirectedRoundedComponents.length === 0,
    verification_status: status,
    status,
    verifies_directed_rounded_same_domain_provenance:
      status === PROVENANCE_VERIFICATION_STATUSES.certified,
  };
}

function h39PrimitiveProvenancePromotionObstruction({
  provenanceCheck,
  diagnosticDecision,
}) {
  if (
    provenanceCheck?.verifies_directed_rounded_same_domain_provenance !== true
  ) {
    return provenanceCheck?.status ?? "h39-primitive-provenance-missing";
  }
  if (diagnosticDecision !== "passes-provided-primitive-bounds") {
    return PROVENANCE_VERIFICATION_STATUSES.reducerOpen;
  }
  return null;
}

function h39PrimitiveProvenanceClaimBoundary(certifiesH39Tail) {
  return {
    assumes_fixed_speed_window: false,
    consumes_primitive_vector_backend_artifact: true,
    consumes_directed_rounded_primitive_provenance: true,
    verifies_primitive_bounds_provenance: certifiesH39Tail,
    certifies_continuous_polydisc_primitives: certifiesH39Tail,
    certifies_directed_rounded_shared_domain: certifiesH39Tail,
    certifies_directed_rounded_h39_polydisc_M_G_bound: certifiesH39Tail,
    certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound:
      certifiesH39Tail,
    certifies_directed_rounded_h39_polydisc_Xi_bound: certifiesH39Tail,
    certifies_directed_rounded_h39_jacobian_lower_bound: certifiesH39Tail,
    certifies_directed_rounded_h39_jacobian_lipschitz_bound:
      certifiesH39Tail,
    certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
      certifiesH39Tail,
    certifies_directed_rounded_fold_pair_scaled_remainder: false,
    certifies_I1_regular_critical_exhaustion: false,
    retained_branch: false,
    strongest_claim: certifiesH39Tail
      ? "Certifies the h39 primitive shared-domain continuous-tail row from a verified directed-rounded primitive provenance report and the existing Rouché-primitive reducer replay; it does not certify scaled remainder, I1, quadrature, or retained branch status."
      : "Reports why the primitive-vector backend artifact cannot yet promote to an h39 primitive continuous-tail certificate.",
  };
}

export function buildH39SharedDomainPrimitiveProvenanceCertificate({
  primitiveVectorBackendArtifact = null,
  directedRoundedProvenanceReport = null,
} = {}) {
  const primitiveVectorDiagnostic =
    buildH39SharedDomainPrimitiveDiagnosticFromPrimitiveVectorBackendArtifact(
      primitiveVectorBackendArtifact,
      {
        primitiveBoundsStatus: DIRECTED_ROUNDED_EXTERNAL_STATUS,
        primitiveBoundsSource:
          directedRoundedProvenanceReport?.provenance_source ??
          directedRoundedProvenanceReport?.packet_id ??
          "h39-directed-rounded-primitive-provenance-report",
      }
    );
  const diagnosticDecision =
    primitiveVectorDiagnostic.shared_domain_diagnostic_summary
      .diagnostic_decision;
  const provenanceCheck = checkH39DirectedRoundedPrimitiveProvenance({
    primitiveVectorBackendArtifact,
    directedRoundedProvenanceReport,
  });
  const promotionObstruction =
    h39PrimitiveProvenancePromotionObstruction({
      provenanceCheck,
      diagnosticDecision,
    });
  const certifiesH39Tail = promotionObstruction === null;
  const sourcePrimitiveVectorBackend = primitiveVectorBackendArtifact
    ? sourcePrimitiveVectorBackendSummary(primitiveVectorBackendArtifact)
    : null;
  const primitiveDiagnosticInput =
    primitiveVectorBackendArtifact?.primitive_diagnostic_input ?? null;
  const scope = {
    report_kind: "h39-shared-domain-primitive-provenance-certificate",
    source_label: "3-",
    speed_constraint: NO_SPEED_WINDOW,
    declared_graph_centered_domain_id:
      provenanceCheck?.shared_domain_signature?.domain_id ??
      provenanceCheck?.shared_domain_signature ??
      null,
    consumes_primitive_vector_backend_schema:
      primitiveVectorBackendArtifact?.schema ?? null,
    consumes_primitive_diagnostic_schema:
      H39_SHARED_DOMAIN_PRIMITIVE_DIAGNOSTIC_SCHEMA,
    consumes_reducer_schema: H39_REDUCER_SCHEMA,
    required_component_keys:
      REQUIRED_PRIMITIVE_PROVENANCE_COMPONENTS.map(
        (component) => component.key
      ),
    consumes_primitive_vector_backend_artifact:
      primitiveVectorBackendArtifact?.packet_id ?? null,
    theorem_scope:
      "h39 primitive shared-domain continuous-tail row only; downstream scaled remainder, I1, quadrature, and retained branch status remain out of scope",
  };

  return {
    schema: H39_SHARED_DOMAIN_PRIMITIVE_PROVENANCE_CERTIFICATE_SCHEMA,
    packet_id: PROVENANCE_PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    provenance_certificate_scope: scope,
    certificate_scope: scope,
    source_primitive_vector_backend: sourcePrimitiveVectorBackend,
    source_primitive_vector_backend_artifact: primitiveVectorBackendArtifact,
    primitive_diagnostic_input: primitiveDiagnosticInput,
    directed_rounded_provenance_metadata: directedRoundedProvenanceReport,
    directed_rounded_provenance_report: directedRoundedProvenanceReport,
    h39_diagnostic_replay: primitiveVectorDiagnostic,
    primitive_vector_diagnostic_replay: primitiveVectorDiagnostic,
    reducer_replay_check: primitiveVectorDiagnostic.reducer_check,
    same_domain_provenance_check: provenanceCheck,
    directed_rounded_provenance_check: provenanceCheck,
    claim_boundary:
      h39PrimitiveProvenanceClaimBoundary(certifiesH39Tail),
    result: {
      theory_status: certifiesH39Tail
        ? "h39-shared-domain-primitive-continuous-tail-certified"
        : "h39-directed-rounded-primitive-provenance-certificate-not-promoted",
      h39_continuous_tail_certificate: certifiesH39Tail,
      promotion_obstruction: promotionObstruction,
      retention: "not_retained",
      retained_branch: false,
      status_note: certifiesH39Tail
        ? "The primitive vector has verified directed-rounded same-domain provenance and the h39 Rouché-primitive reducer replay closes. This certifies only the h39 primitive continuous-tail row."
        : "The primitive vector does not yet promote to an h39 primitive continuous-tail certificate; see promotion_obstruction.",
    },
  };
}

function h39ComponentSubsetCompositionClaimBoundary(certifiesH39Tail) {
  return {
    assumes_fixed_speed_window: false,
    consumes_primitive_vector_backend_artifact: true,
    consumes_component_witness_subsets: true,
    emits_certified_seven_input_primitive_witness: certifiesH39Tail,
    emits_directed_rounded_primitive_provenance_report: certifiesH39Tail,
    verifies_primitive_bounds_provenance: certifiesH39Tail,
    certifies_continuous_polydisc_primitives: certifiesH39Tail,
    certifies_directed_rounded_shared_domain: certifiesH39Tail,
    certifies_directed_rounded_h39_polydisc_M_G_bound: certifiesH39Tail,
    certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound:
      certifiesH39Tail,
    certifies_directed_rounded_h39_polydisc_Xi_bound: certifiesH39Tail,
    certifies_directed_rounded_h39_jacobian_lower_bound: certifiesH39Tail,
    certifies_directed_rounded_h39_jacobian_lipschitz_bound:
      certifiesH39Tail,
    certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
      certifiesH39Tail,
    certifies_directed_rounded_fold_pair_scaled_remainder: false,
    certifies_I1_regular_critical_exhaustion: false,
    retained_branch: false,
    strongest_claim: certifiesH39Tail
      ? "Composes certified component witness subsets into the h39 primitive shared-domain continuous-tail row; it does not certify scaled remainder, I1, quadrature, or retained branch status."
      : "Reports why the component witness subsets do not yet compose into the h39 primitive continuous-tail certificate.",
  };
}

function h39ComponentSubsetValidationErrors({
  r43SourceFamilyWitnessSubset,
  nGNumeratorWitnessSubset,
  jacobianFloorWitnessSubset,
  lJKernelWitnessSubset,
  graphRadiiWitnessSubset,
}) {
  return {
    R43_source_family: r43SourceFamilyWitnessSubset
      ? validateH39R43SourceFamilyWitnessSubset(r43SourceFamilyWitnessSubset)
      : ["R43 source-family witness subset missing"],
    N_G_numerator: nGNumeratorWitnessSubset
      ? validateH39NGNumeratorWitnessSubset(nGNumeratorWitnessSubset)
      : ["N_G numerator witness subset missing"],
    jacobian_floor: jacobianFloorWitnessSubset
      ? validateH39JacobianFloorWitnessSubset(jacobianFloorWitnessSubset)
      : ["Jacobian floor witness subset missing"],
    L_J_kernel: lJKernelWitnessSubset
      ? validateH39LJKernelWitnessSubset(lJKernelWitnessSubset)
      : ["L_J kernel witness subset missing"],
    graph_radii: graphRadiiWitnessSubset
      ? validateH39GraphRadiiWitnessSubset(graphRadiiWitnessSubset)
      : ["graph-radii witness subset missing"],
  };
}

function h39ComponentSubsetCertifiedFlags({
  r43SourceFamilyWitnessSubset,
  nGNumeratorWitnessSubset,
  jacobianFloorWitnessSubset,
  lJKernelWitnessSubset,
  graphRadiiWitnessSubset,
}) {
  return {
    E_R:
      r43SourceFamilyWitnessSubset?.result?.h39_E_R_component_witness ===
      true,
    M_R:
      r43SourceFamilyWitnessSubset?.result?.h39_M_R_component_witness ===
      true,
    M_G:
      nGNumeratorWitnessSubset?.result?.h39_M_G_component_witness === true,
    nu_J:
      jacobianFloorWitnessSubset?.result?.h39_nu_J_component_witness ===
      true,
    L_J:
      lJKernelWitnessSubset?.result?.h39_L_J_component_witness === true,
    rho_X:
      graphRadiiWitnessSubset?.result?.h39_rho_X_component_witness ===
      true,
    r_X:
      graphRadiiWitnessSubset?.result?.h39_r_X_component_witness === true,
  };
}

function h39ComponentSubsetProvenance({
  r43SourceFamilyWitnessSubset,
  nGNumeratorWitnessSubset,
  jacobianFloorWitnessSubset,
  lJKernelWitnessSubset,
  graphRadiiWitnessSubset,
}) {
  const componentProvenance = {};
  const maybeAdd = (key, proof) => {
    if (proof !== undefined && proof !== null) {
      componentProvenance[key] = proof;
    }
  };
  maybeAdd("E_R", r43SourceFamilyWitnessSubset?.component_provenance?.E_R);
  maybeAdd("M_R", r43SourceFamilyWitnessSubset?.component_provenance?.M_R);
  maybeAdd("M_G", nGNumeratorWitnessSubset?.component_provenance?.M_G);
  maybeAdd("nu_J", jacobianFloorWitnessSubset?.component_provenance?.nu_J);
  maybeAdd("L_J", lJKernelWitnessSubset?.component_provenance?.L_J);
  maybeAdd("rho_X", graphRadiiWitnessSubset?.component_provenance?.rho_X);
  maybeAdd("r_X", graphRadiiWitnessSubset?.component_provenance?.r_X);
  return componentProvenance;
}

function primitiveInputValueFromComponent(componentProvenance, key) {
  const value = componentProvenance?.[key]?.value;
  const resolved = Number(value);
  return Number.isFinite(resolved) ? resolved : null;
}

function buildH39SevenInputPrimitiveWitness({
  componentProvenanceReport,
  primitiveProvenanceCertificateReplay,
  sharedDomainSignature,
  certifiesH39Tail,
}) {
  if (certifiesH39Tail !== true) {
    return null;
  }
  const componentProvenance =
    componentProvenanceReport?.component_provenance ?? {};
  const components = {};
  const componentWitnessFamilies = {};
  const missingComponents = [];
  const invalidComponents = [];
  const domainMismatchComponents = [];

  for (const component of REQUIRED_PRIMITIVE_PROVENANCE_COMPONENTS) {
    const proof = componentProvenance[component.key];
    const value = primitiveInputValueFromComponent(
      componentProvenance,
      component.key
    );
    if (proof === undefined || proof === null) {
      missingComponents.push(component.key);
      continue;
    }
    components[component.key] = value;
    componentWitnessFamilies[component.key] =
      proof?.witness_family ?? null;
    if (
      value === null ||
      !proofDirectedRoundedCertified(proof) ||
      (component.relation === "lower-bound" && !(value > 0)) ||
      ((component.relation === "upper-bound" ||
        component.relation === "lipschitz-upper-bound") &&
        !(value >= 0))
    ) {
      invalidComponents.push(component.key);
    }
    if (
      !domainSignatureMatches(
        proofDomainSignature(proof),
        sharedDomainSignature
      )
    ) {
      domainMismatchComponents.push(component.key);
    }
  }

  if (
    missingComponents.length > 0 ||
    invalidComponents.length > 0 ||
    domainMismatchComponents.length > 0
  ) {
    return null;
  }

  const primitiveInput =
    primitiveProvenanceCertificateReplay
      ?.source_primitive_vector_backend_artifact?.primitive_diagnostic_input ??
    primitiveProvenanceCertificateReplay
      ?.primitive_vector_diagnostic_replay?.primitive_bounds ??
    null;
  const reducerSummary =
    primitiveProvenanceCertificateReplay?.primitive_vector_diagnostic_replay
      ?.shared_domain_diagnostic_summary ?? null;

  return {
    schema:
      "neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-seven-input-primitive-witness/v1",
    packet_id:
      "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_h39_seven_input_primitive_witness",
    promotion_status: PROMOTION_STATUS,
    witness_status:
      "directed-rounded-same-domain-seven-input-primitive-witness-certified",
    witness_scope: {
      report_kind: "h39-seven-input-primitive-witness",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      primitive_vector:
        "(E_R,M_R,M_G,nu_J,L_J,rho_X,r_X; shared_domain_signature)",
      theorem_scope:
        "certified same-domain primitive witness vector for the h39 continuous-tail row; scaled remainder, I1, quadrature, and retained branch remain out of scope",
    },
    shared_domain_signature: sharedDomainSignature,
    primitive_vector_components: components,
    primitive_input_fields: primitiveInput,
    component_witness_families: componentWitnessFamilies,
    component_provenance: componentProvenance,
    reducer_replay: {
      root_graph_lift_status:
        reducerSummary?.root_graph_lift_status ?? null,
      rouche_primitive_closure_status:
        reducerSummary?.rouche_primitive_closure_status ??
        reducerSummary?.rouche_primitive_h39_report_status ??
        null,
      h39_closure_ratio_Lambda_39_prim:
        reducerSummary
          ?.candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim ??
        null,
      h39_closure_ratio_below_one:
        reducerSummary
          ?.candidate_rouche_primitive_h39_closure_ratio_below_one ??
        null,
      h39_closure_ratio_margin_to_one:
        reducerSummary
          ?.candidate_rouche_primitive_h39_closure_ratio_margin_to_one ??
        null,
    },
    claim_boundary: {
      assumes_fixed_speed_window: false,
      certifies_directed_rounded_seven_input_primitive_witness: true,
      certifies_continuous_polydisc_primitives: true,
      certifies_directed_rounded_shared_domain: true,
      certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
        true,
      certifies_h39_full_primitive_vector_certificate: false,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_I1_regular_critical_exhaustion: false,
      retained_branch: false,
    },
    result: {
      theory_status:
        "h39-seven-input-primitive-witness-continuous-tail-certified",
      h39_seven_input_primitive_witness: true,
      h39_continuous_tail_certificate: true,
      h39_full_primitive_vector_certificate: false,
      retention: "not_retained",
      retained_branch: false,
    },
  };
}

function buildH39PrimitiveVectorBackendArtifactFromComponentProvenance({
  componentProvenance,
  sharedDomainSignature,
}) {
  const componentProofsReady = REQUIRED_PRIMITIVE_PROVENANCE_COMPONENTS.every(
    (component) => {
      const proof = componentProvenance?.[component.key];
      const value = Number(proof?.value);
      if (
        proof === null ||
        proof === undefined ||
        !proofDirectedRoundedCertified(proof) ||
        !Number.isFinite(value)
      ) {
        return false;
      }
      if (component.relation === "lower-bound") {
        return value > 0;
      }
      if (
        component.relation === "upper-bound" ||
        component.relation === "lipschitz-upper-bound"
      ) {
        return value >= 0;
      }
      return value > 0;
    }
  );
  const rhoX = primitiveInputValueFromComponent(
    componentProvenance,
    "rho_X"
  );
  const rX = primitiveInputValueFromComponent(componentProvenance, "r_X");
  if (
    !componentProofsReady ||
    rhoX === null ||
    rX === null ||
    !(rX > 0 && rX < rhoX)
  ) {
    return null;
  }

  const primitiveInput = {
    center_residual_bound_E_R: primitiveInputValueFromComponent(
      componentProvenance,
      "E_R"
    ),
    center_jacobian_lower_bound_nu_J: primitiveInputValueFromComponent(
      componentProvenance,
      "nu_J"
    ),
    jacobian_lipschitz_bound_L_J: primitiveInputValueFromComponent(
      componentProvenance,
      "L_J"
    ),
    rho_X: primitiveInputValueFromComponent(componentProvenance, "rho_X"),
    r_X: primitiveInputValueFromComponent(componentProvenance, "r_X"),
    candidate_M_G_bound: primitiveInputValueFromComponent(
      componentProvenance,
      "M_G"
    ),
    candidate_root_tangent_numerator_bound_M_R:
      primitiveInputValueFromComponent(componentProvenance, "M_R"),
    primitive_bounds_source:
      "h39-component-subset-composition-certified-component-values",
    primitive_bounds_status: DIRECTED_ROUNDED_EXTERNAL_STATUS,
  };
  const missingComponents = REQUIRED_PRIMITIVE_PROVENANCE_COMPONENTS.filter(
    (component) => primitiveInput[component.inputField] === null
  ).map((component) => component.key);
  if (missingComponents.length > 0) {
    return null;
  }
  try {
    buildReducerArtifact(primitiveInput);
  } catch {
    return null;
  }

  return {
    schema: "neutral-swarm-h39-component-derived-primitive-vector-backend/v1",
    packet_id:
      "h39_component_subset_composition_component_derived_primitive_vector_backend",
    profile_vector_backend_status:
      "h39-component-derived-primitive-vector-from-certified-subsets",
    profile_vector_status:
      "h39-component-derived-primitive-vector-from-certified-subsets",
    primitive_diagnostic_input_ready: true,
    missing_candidate_components: [],
    invalid_candidate_components: [],
    backend_scope: {
      candidate_only: false,
      primitive_bounds_status: DIRECTED_ROUNDED_EXTERNAL_STATUS,
      synthesized_from_component_subset_provenance: true,
      shared_domain_signature: sharedDomainSignature,
    },
    primitive_diagnostic_input: primitiveInput,
    source_vector_candidate: {
      candidate_primitive_vector_component_sources:
        Object.fromEntries(
          REQUIRED_PRIMITIVE_PROVENANCE_COMPONENTS.map((component) => [
            component.key,
            componentProvenance?.[component.key]?.witness_family ?? null,
          ])
        ),
    },
    claim_boundary: {
      assumes_fixed_speed_window: false,
      synthesized_from_component_subset_provenance: true,
      verifies_primitive_bounds_provenance: false,
      certifies_continuous_polydisc_primitives: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
        false,
      retained_branch: false,
    },
  };
}

function resolveH39ComponentSubsetSharedDomain({
  sharedDomainSignature,
  r43SourceFamilyWitnessSubset,
  nGNumeratorWitnessSubset,
  jacobianFloorWitnessSubset,
  lJKernelWitnessSubset,
  graphRadiiWitnessSubset,
}) {
  return (
    sharedDomainSignature ??
    r43SourceFamilyWitnessSubset?.shared_domain_signature ??
    nGNumeratorWitnessSubset?.shared_domain_signature ??
    jacobianFloorWitnessSubset?.shared_domain_signature ??
    lJKernelWitnessSubset?.shared_domain_signature ??
    graphRadiiWitnessSubset?.shared_domain_signature ??
    null
  );
}

function h39ComponentSubsetCompositionPredicateCheck({
  primitiveVectorBackendArtifact,
  r43SourceFamilyWitnessSubset,
  nGNumeratorWitnessSubset,
  jacobianFloorWitnessSubset,
  lJKernelWitnessSubset,
  graphRadiiWitnessSubset,
  sharedDomainSignature,
}) {
  const subsetValidationErrors = h39ComponentSubsetValidationErrors({
    r43SourceFamilyWitnessSubset,
    nGNumeratorWitnessSubset,
    jacobianFloorWitnessSubset,
    lJKernelWitnessSubset,
    graphRadiiWitnessSubset,
  });
  const subsetErrorsFlat = Object.entries(subsetValidationErrors).flatMap(
    ([family, errors]) => errors.map((error) => `${family}:${error}`)
  );
  const certifiedComponents = h39ComponentSubsetCertifiedFlags({
    r43SourceFamilyWitnessSubset,
    nGNumeratorWitnessSubset,
    jacobianFloorWitnessSubset,
    lJKernelWitnessSubset,
    graphRadiiWitnessSubset,
  });
  const componentProvenance = h39ComponentSubsetProvenance({
    r43SourceFamilyWitnessSubset,
    nGNumeratorWitnessSubset,
    jacobianFloorWitnessSubset,
    lJKernelWitnessSubset,
    graphRadiiWitnessSubset,
  });
  const requiredComponents = REQUIRED_PRIMITIVE_PROVENANCE_COMPONENTS.map(
    (component) => component.key
  );
  const missingComponents = requiredComponents.filter(
    (key) => componentProvenance[key] === undefined
  );
  const domainMismatchComponents = requiredComponents.filter((key) => {
    const proof = componentProvenance[key];
    if (proof === undefined) {
      return false;
    }
    return !domainSignatureMatches(
      proofDomainSignature(proof),
      sharedDomainSignature
    );
  });
  const forbiddenSpeedFields = findForbiddenSpeedFields({
    r43SourceFamilyWitnessSubset,
    nGNumeratorWitnessSubset,
    jacobianFloorWitnessSubset,
    lJKernelWitnessSubset,
    graphRadiiWitnessSubset,
    sharedDomainSignature,
  });
  const componentCertifiedFailures = Object.entries(certifiedComponents)
    .filter(([, certified]) => certified !== true)
    .map(([component]) => component);
  const checks = {
    primitive_vector_backend_present:
      primitiveVectorBackendArtifact !== null &&
      primitiveVectorBackendArtifact !== undefined,
    primitive_vector_input_ready:
      primitiveVectorBackendArtifact?.primitive_diagnostic_input_ready ===
      true,
    shared_domain_signature_present:
      sharedDomainSignature !== null && sharedDomainSignature !== undefined,
    component_subsets_validate: subsetErrorsFlat.length === 0,
    all_required_components_present: missingComponents.length === 0,
    all_component_subsets_certified:
      componentCertifiedFailures.length === 0,
    all_components_on_shared_domain:
      domainMismatchComponents.length === 0,
    no_fixed_speed_window: forbiddenSpeedFields.length === 0,
  };
  const failedPredicates = Object.entries(checks)
    .filter(([, passes]) => passes !== true)
    .map(([key]) => key);

  return {
    checks,
    failed_predicates: failedPredicates,
    subset_validation_errors: subsetValidationErrors,
    subset_validation_error_count: subsetErrorsFlat.length,
    certified_components: certifiedComponents,
    component_certified_failures: componentCertifiedFailures,
    missing_components: missingComponents,
    domain_mismatch_components: domainMismatchComponents,
    forbidden_speed_fields: forbiddenSpeedFields,
    certifies_component_subset_composition:
      failedPredicates.length === 0,
  };
}

export function buildH39ComponentSubsetComposition({
  primitiveVectorBackendArtifact = null,
  r43SourceFamilyWitnessSubset = null,
  nGNumeratorWitnessSubset = null,
  jacobianFloorWitnessSubset = null,
  lJKernelWitnessSubset = null,
  graphRadiiWitnessSubset = null,
  sharedDomainSignature = null,
} = {}) {
  const resolvedSharedDomain =
    resolveH39ComponentSubsetSharedDomain({
      sharedDomainSignature,
      r43SourceFamilyWitnessSubset,
      nGNumeratorWitnessSubset,
      jacobianFloorWitnessSubset,
      lJKernelWitnessSubset,
      graphRadiiWitnessSubset,
    });
  const componentProvenance = h39ComponentSubsetProvenance({
    r43SourceFamilyWitnessSubset,
    nGNumeratorWitnessSubset,
    jacobianFloorWitnessSubset,
    lJKernelWitnessSubset,
    graphRadiiWitnessSubset,
  });
  const resolvedPrimitiveVectorBackendArtifact =
    primitiveVectorBackendArtifact ??
    buildH39PrimitiveVectorBackendArtifactFromComponentProvenance({
      componentProvenance,
      sharedDomainSignature: resolvedSharedDomain,
    });
  const predicateCheck = h39ComponentSubsetCompositionPredicateCheck({
    primitiveVectorBackendArtifact: resolvedPrimitiveVectorBackendArtifact,
    r43SourceFamilyWitnessSubset,
    nGNumeratorWitnessSubset,
    jacobianFloorWitnessSubset,
    lJKernelWitnessSubset,
    graphRadiiWitnessSubset,
    sharedDomainSignature: resolvedSharedDomain,
  });
  const subsetCompositionReady =
    predicateCheck.certifies_component_subset_composition;
  const componentProvenanceReport = {
    packet_id:
      "h39_component_subset_composition_primitive_provenance_report",
    provenance_status: subsetCompositionReady
      ? DIRECTED_ROUNDED_SAME_DOMAIN_PROVENANCE_STATUS
      : H39_COMPONENT_SUBSET_COMPOSITION_OPEN_STATUS,
    provenance_source: COMPONENT_SUBSET_COMPOSITION_PACKET_ID,
    shared_domain_signature: resolvedSharedDomain,
    component_provenance: componentProvenance,
    source_component_subset_packet_ids: {
      R43_source_family: r43SourceFamilyWitnessSubset?.packet_id ?? null,
      N_G_numerator: nGNumeratorWitnessSubset?.packet_id ?? null,
      jacobian_floor: jacobianFloorWitnessSubset?.packet_id ?? null,
      L_J_kernel: lJKernelWitnessSubset?.packet_id ?? null,
      graph_radii: graphRadiiWitnessSubset?.packet_id ?? null,
    },
    claim_boundary: {
      assumes_fixed_speed_window: false,
      emits_directed_rounded_primitive_provenance_report:
        subsetCompositionReady,
      retained_branch: false,
    },
  };
  const primitiveProvenanceCertificateReplay =
    buildH39SharedDomainPrimitiveProvenanceCertificate({
      primitiveVectorBackendArtifact: resolvedPrimitiveVectorBackendArtifact,
      directedRoundedProvenanceReport: componentProvenanceReport,
    });
  const certifiesH39Tail =
    subsetCompositionReady &&
    primitiveProvenanceCertificateReplay?.result
      ?.h39_continuous_tail_certificate === true;
  const sevenInputPrimitiveWitness = buildH39SevenInputPrimitiveWitness({
    componentProvenanceReport,
    primitiveProvenanceCertificateReplay,
    sharedDomainSignature: resolvedSharedDomain,
    certifiesH39Tail,
  });
  const status = certifiesH39Tail
    ? H39_COMPONENT_SUBSET_COMPOSITION_CERTIFIED_STATUS
    : H39_COMPONENT_SUBSET_COMPOSITION_OPEN_STATUS;
  const firstFailedPredicate =
    predicateCheck.failed_predicates[0] ??
    primitiveProvenanceCertificateReplay?.result?.promotion_obstruction ??
    "unknown-component-subset-composition-blocker";

  return {
    schema: H39_COMPONENT_SUBSET_COMPOSITION_SCHEMA,
    packet_id: COMPONENT_SUBSET_COMPOSITION_PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    provenance_status: status,
    composition_status: status,
    composition_scope: {
      report_kind: "h39-component-subset-composition",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      shared_domain_signature: resolvedSharedDomain,
      required_component_keys:
        REQUIRED_PRIMITIVE_PROVENANCE_COMPONENTS.map(
          (component) => component.key
        ),
      theorem_scope:
        "conditional composition of certified h39 primitive component subsets into the h39 primitive shared-domain continuous-tail certificate; scaled remainder, I1, quadrature, and retained branch remain out of scope",
    },
    shared_domain_signature: resolvedSharedDomain,
    source_primitive_vector_backend_artifact:
      resolvedPrimitiveVectorBackendArtifact,
    source_R43_source_family_witness_subset:
      r43SourceFamilyWitnessSubset,
    source_N_G_numerator_witness_subset: nGNumeratorWitnessSubset,
    source_jacobian_floor_witness_subset: jacobianFloorWitnessSubset,
    source_L_J_kernel_witness_subset: lJKernelWitnessSubset,
    source_graph_radii_witness_subset: graphRadiiWitnessSubset,
    predicate_check: predicateCheck,
    component_provenance_report: componentProvenanceReport,
    primitive_provenance_certificate_replay:
      primitiveProvenanceCertificateReplay,
    certified_seven_input_primitive_witness:
      sevenInputPrimitiveWitness,
    conditional_theorem: {
      hypothesis:
        "If the R43, N_G, Jacobian floor, L_J, and graph-radii subset witnesses all certify their components on one shared h39 graph-centered signature,",
      conclusion:
        "then their component provenance report may be replayed through the existing primitive provenance certificate; if the Rouché-primitive scalar replay is strict, the h39 primitive continuous-tail row is certified.",
      non_claims:
        "The composition does not certify scaled remainder, I1 regular critical exhaustion, quadrature, or retained branch status.",
    },
    no_go_theorem: certifiesH39Tail
      ? null
      : {
          hypothesis:
            "At least one component subset is missing, open, malformed, domain-mismatched, or the primitive scalar replay is not strict.",
          conclusion:
            "The component subsets cannot promote to the h39 primitive continuous-tail certificate until the failed predicate list is empty and the primitive provenance certificate replay closes.",
          promotion_obstruction: firstFailedPredicate,
        },
    claim_boundary:
      h39ComponentSubsetCompositionClaimBoundary(certifiesH39Tail),
    result: {
      theory_status: certifiesH39Tail
        ? "h39-component-subset-composition-continuous-tail-certified"
        : "h39-component-subset-composition-open",
      h39_component_subset_composition: subsetCompositionReady,
      h39_continuous_tail_certificate: certifiesH39Tail,
      h39_full_primitive_vector_certificate: false,
      promotion_obstruction: certifiesH39Tail
        ? null
        : firstFailedPredicate,
      retention: "not_retained",
      retained_branch: false,
      status_note: certifiesH39Tail
        ? "Certified component subsets compose into the h39 primitive continuous-tail row through the existing primitive provenance certificate replay."
        : "The component subset composition remains open; see failed predicates and primitive provenance certificate replay.",
    },
  };
}

function h39UpstreamSourceCompositionClaimBoundary(
  certifiesH39Tail,
  {
    consumesKepsilonBranchWitnesses = false,
    consumesSharedDomainEvaluatorArtifact = false,
  } = {}
) {
  return {
    assumes_fixed_speed_window: false,
    consumes_shared_domain_evaluator_artifact:
      consumesSharedDomainEvaluatorArtifact,
    aggregates_evaluator_profile_candidates:
      consumesSharedDomainEvaluatorArtifact,
    consumes_primitive_vector_backend_artifact: true,
    consumes_coordinate_cauchy_R43_jacobian_witness: true,
    consumes_denominator_cauchy_M_G_witness: true,
    consumes_K_epsilon_branch_coordinate_witnesses:
      consumesKepsilonBranchWitnesses,
    replays_K_epsilon_majorant_witness:
      consumesKepsilonBranchWitnesses,
    consumes_L_J_kernel_witness_subset: true,
    consumes_graph_radii_witness_subset: true,
    extracts_component_subset_replays: true,
    replays_component_subset_composition: true,
    emits_component_subset_composition: certifiesH39Tail,
    emits_certified_seven_input_primitive_witness: certifiesH39Tail,
    emits_directed_rounded_primitive_provenance_report: certifiesH39Tail,
    verifies_primitive_bounds_provenance: certifiesH39Tail,
    certifies_continuous_polydisc_primitives: certifiesH39Tail,
    certifies_directed_rounded_shared_domain: certifiesH39Tail,
    certifies_directed_rounded_h39_polydisc_M_G_bound: certifiesH39Tail,
    certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound:
      certifiesH39Tail,
    certifies_directed_rounded_h39_polydisc_Xi_bound: certifiesH39Tail,
    certifies_directed_rounded_h39_jacobian_lower_bound: certifiesH39Tail,
    certifies_directed_rounded_h39_jacobian_lipschitz_bound:
      certifiesH39Tail,
    certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
      certifiesH39Tail,
    certifies_directed_rounded_fold_pair_scaled_remainder: false,
    certifies_I1_regular_critical_exhaustion: false,
    retained_branch: false,
    strongest_claim: certifiesH39Tail
      ? "Composes certified upstream coordinate-Cauchy, denominator-Cauchy, L_J, and graph-radii sources through the existing component-subset composition into the h39 primitive shared-domain continuous-tail row."
      : "Reports why the upstream source witnesses do not yet replay through the component-subset composition into the h39 primitive continuous-tail certificate.",
  };
}

function h39EvaluatorSourceArtifact(sharedDomainEvaluatorArtifact) {
  if (
    sharedDomainEvaluatorArtifact?.status ===
    "h39-shared-domain-coefficient-cell-evaluated"
  ) {
    return sharedDomainEvaluatorArtifact;
  }
  const coefficientCells = h39EvaluatorCoefficientCells(
    sharedDomainEvaluatorArtifact
  );
  if (coefficientCells.length === 1) {
    return coefficientCells[0];
  }
  return null;
}

function h39EvaluatorCoefficientCells(sharedDomainEvaluatorArtifact) {
  if (
    sharedDomainEvaluatorArtifact?.status ===
    "h39-shared-domain-coefficient-cell-evaluated"
  ) {
    return [sharedDomainEvaluatorArtifact];
  }
  const coefficientRows =
    sharedDomainEvaluatorArtifact?.h39_shared_domain_coefficient_rows;
  return Array.isArray(coefficientRows)
    ? coefficientRows
        .map((row) => row?.h39_coefficient_cell)
        .filter(Boolean)
    : [];
}

function h39EvaluatorSummary(sharedDomainEvaluatorArtifact) {
  const evaluatorSourceArtifact = h39EvaluatorSourceArtifact(
    sharedDomainEvaluatorArtifact
  );
  return (
    evaluatorSourceArtifact?.finite_prefix_summary ??
    sharedDomainEvaluatorArtifact?.finite_prefix_summary ??
    sharedDomainEvaluatorArtifact?.h39_shared_domain_coefficient_summary ??
    null
  );
}

function h39EvaluatorR43ProfileCandidates(sharedDomainEvaluatorArtifact) {
  const summary = h39EvaluatorSummary(sharedDomainEvaluatorArtifact);
  const candidates =
    summary?.candidate_R43_analytic_remainder_profile_candidates ??
    sharedDomainEvaluatorArtifact?.candidate_R43_analytic_remainder_profile_candidates;
  if (Array.isArray(candidates)) {
    return candidates;
  }
  return h39EvaluatorCoefficientCells(sharedDomainEvaluatorArtifact).flatMap(
    (cell) =>
      cell?.finite_prefix_summary
        ?.candidate_R43_analytic_remainder_profile_candidates ?? []
  );
}

function h39EvaluatorJacobianProfileCandidates(
  sharedDomainEvaluatorArtifact
) {
  const summary = h39EvaluatorSummary(sharedDomainEvaluatorArtifact);
  const candidates =
    summary?.candidate_jacobian_analytic_remainder_profile_candidates ??
    sharedDomainEvaluatorArtifact?.candidate_jacobian_analytic_remainder_profile_candidates;
  if (Array.isArray(candidates)) {
    return candidates;
  }
  return h39EvaluatorCoefficientCells(sharedDomainEvaluatorArtifact).flatMap(
    (cell) =>
      cell?.finite_prefix_summary
        ?.candidate_jacobian_analytic_remainder_profile_candidates ?? []
  );
}

function h39EvaluatorNGProfileCandidates(sharedDomainEvaluatorArtifact) {
  const summary = h39EvaluatorSummary(sharedDomainEvaluatorArtifact);
  const candidates =
    summary?.candidate_N_G_analytic_remainder_profile_candidates ??
    sharedDomainEvaluatorArtifact?.candidate_N_G_analytic_remainder_profile_candidates;
  if (Array.isArray(candidates)) {
    return candidates;
  }
  return h39EvaluatorCoefficientCells(sharedDomainEvaluatorArtifact).flatMap(
    (cell) =>
      cell?.finite_prefix_summary
        ?.candidate_N_G_analytic_remainder_profile_candidates ?? []
  );
}

function h39EvaluatorPrimitiveVectorBackendArtifact(
  sharedDomainEvaluatorArtifact
) {
  const coefficientRows =
    sharedDomainEvaluatorArtifact?.h39_shared_domain_coefficient_rows;
  if (Array.isArray(coefficientRows)) {
    return null;
  }
  const evaluatorSourceArtifact = h39EvaluatorSourceArtifact(
    sharedDomainEvaluatorArtifact
  );
  const summary = h39EvaluatorSummary(sharedDomainEvaluatorArtifact);
  const backend =
    sharedDomainEvaluatorArtifact?.h39_primitive_vector_backend_artifact ??
    summary?.candidate_h39_full_cauchy_primitive_vector_backend ??
    evaluatorSourceArtifact?.candidate_h39_full_cauchy_primitive_vector_backend ??
    sharedDomainEvaluatorArtifact?.candidate_h39_full_cauchy_primitive_vector_backend ??
    null;
  return backend?.primitive_diagnostic_input_ready === true &&
    backend?.profile_vector_backend_status ===
      "h39-full-cauchy-primitive-vector-candidate-closes"
    ? backend
    : null;
}

function h39AggregateR43EvaluatorProfile({
  candidates,
  coordinateCauchyOuterBoundsProfileCandidate,
}) {
  const profiles = Array.isArray(candidates) ? candidates : [];
  if (profiles.length < H39_FOLD_PAIR_BRANCHES.length) {
    return null;
  }
  if (
    profiles.some(
      (candidate) =>
        candidate?.status !==
        "h39-r43-analytic-remainder-profile-candidate-emitted"
    )
  ) {
    return null;
  }
  const source = coordinateCauchyOuterBoundsProfileCandidate ?? {};
  const outerBound = firstFiniteNumber(
    source.r43_cauchy_outer_bound,
    source.candidate_R43_source_outer_bound,
    finiteMaximum(profiles.map((candidate) => candidate?.outer_bound))
  );
  const outerRadius = firstFiniteNumber(
    source.r43_cauchy_outer_radius,
    finiteMaximum(profiles.map((candidate) => candidate?.outer_radius))
  );
  const targetRadius = finiteMaximum(
    profiles.map((candidate) => candidate?.target_radius)
  );
  const q = finiteMaximum(profiles.map((candidate) => candidate?.q));
  const retainedOrder = finiteMaximum(
    profiles.map((candidate) => candidate?.retained_shifted_prefix_order)
  );
  const ePrefix = finiteMaximum(
    profiles.map((candidate) => candidate?.candidate_E_R_finite_prefix)
  );
  const eTail = finiteMaximum(
    profiles.map(
      (candidate) =>
        candidate?.candidate_E_R_cauchy_tail_after_prefix_profile
    )
  );
  const eBound = finiteMaximum([
    finiteMaximum(
      profiles.map(
        (candidate) => candidate?.candidate_E_R_prefix_plus_tail_bound
      )
    ),
    ePrefix !== null && eTail !== null ? ePrefix + eTail : null,
  ]);
  const mPrefix = finiteMaximum(
    profiles.map((candidate) => candidate?.candidate_M_R_finite_prefix)
  );
  const mTail = finiteMaximum(
    profiles.map(
      (candidate) =>
        candidate?.candidate_M_R_cauchy_tail_after_prefix_profile
    )
  );
  const mBound = finiteMaximum([
    finiteMaximum(
      profiles.map(
        (candidate) => candidate?.candidate_M_R_prefix_plus_tail_bound
      )
    ),
    mPrefix !== null && mTail !== null ? mPrefix + mTail : null,
  ]);

  return {
    status: "h39-r43-analytic-remainder-profile-candidate-emitted",
    evaluation_level:
      "aggregate-evaluator-branch-cauchy-analytic-remainder-profile",
    r43_shift_power: H39_R43_SOURCE_SHIFT_POWER,
    outer_bound: outerBound,
    outer_radius: outerRadius,
    target_radius: targetRadius,
    q,
    retained_shifted_prefix_order: retainedOrder,
    candidate_E_R_finite_prefix: ePrefix,
    candidate_E_R_cauchy_tail_after_prefix_profile: eTail,
    candidate_E_R_prefix_plus_tail_bound: eBound,
    candidate_M_R_finite_prefix: mPrefix,
    candidate_M_R_cauchy_tail_after_prefix_profile: mTail,
    candidate_M_R_prefix_plus_tail_bound: mBound,
    centerResidualRemainderProfile: eTail,
    rootTangentNumeratorRemainderProfile: mTail,
    cauchy_diagnostic: {
      shift_power: H39_R43_SOURCE_SHIFT_POWER,
      outer_bound: outerBound,
      outer_radius: outerRadius,
      target_radius: targetRadius,
      q,
      finite_prefix_order: retainedOrder,
      finite_prefix_majorant: ePrefix,
      cauchy_tail_after_prefix_majorant: eTail,
      shifted_function_prefix_plus_tail_majorant: eBound,
      y_derivative_finite_prefix_majorant: mPrefix,
      y_derivative_cauchy_tail_after_prefix_majorant: mTail,
      y_derivative_prefix_plus_tail_majorant: mBound,
    },
    source_profile_count: profiles.length,
    candidate_bound_source:
      "aggregate fold-pair maximum of evaluator R43 analytic remainder profile candidates",
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

function h39AggregateJacobianEvaluatorProfile({
  candidates,
  coordinateCauchyOuterBoundsProfileCandidate,
}) {
  const profiles = Array.isArray(candidates) ? candidates : [];
  if (profiles.length < H39_FOLD_PAIR_BRANCHES.length) {
    return null;
  }
  if (
    profiles.some(
      (candidate) =>
        candidate?.status !==
        "h39-jacobian-analytic-remainder-profile-candidate-emitted"
    )
  ) {
    return null;
  }
  const source = coordinateCauchyOuterBoundsProfileCandidate ?? {};
  const outerBound = firstFiniteNumber(
    source.jacobian_cauchy_outer_bound,
    source.candidate_R43_jacobian_outer_bound,
    finiteMaximum(profiles.map((candidate) => candidate?.outer_bound))
  );
  const outerRadius = firstFiniteNumber(
    source.jacobian_cauchy_outer_radius,
    finiteMaximum(profiles.map((candidate) => candidate?.outer_radius))
  );
  const targetRadius = finiteMaximum(
    profiles.map((candidate) => candidate?.target_radius)
  );
  const q = finiteMaximum(profiles.map((candidate) => candidate?.q));
  const retainedOrder = finiteMaximum(
    profiles.map((candidate) => candidate?.retained_shifted_prefix_order)
  );
  const finiteFloor = finiteMinimum(
    profiles.map((candidate) => candidate?.candidate_nu_J_finite_prefix)
  );
  const tailLoss = finiteMaximum(
    profiles.map(
      (candidate) => candidate?.candidate_nu_J_cauchy_tail_loss_profile
    )
  );
  const profileFloor = finiteMinimum(
    profiles.map(
      (candidate) => candidate?.candidate_nu_J_prefix_plus_tail_floor
    )
  );
  const aggregateFloor =
    finiteFloor !== null && tailLoss !== null
      ? finiteFloor - tailLoss
      : null;
  const floor = finiteMinimum([profileFloor, aggregateFloor]);

  return {
    status: "h39-jacobian-analytic-remainder-profile-candidate-emitted",
    evaluation_level:
      "aggregate-evaluator-branch-cauchy-analytic-remainder-profile",
    outer_bound: outerBound,
    outer_radius: outerRadius,
    target_radius: targetRadius,
    q,
    retained_shifted_prefix_order: retainedOrder,
    candidate_nu_J_finite_prefix: finiteFloor,
    candidate_nu_J_cauchy_tail_loss_profile: tailLoss,
    candidate_nu_J_prefix_plus_tail_floor: floor,
    centerJacobianLowerRemainderProfile: tailLoss,
    cauchy_diagnostic: {
      outer_bound: outerBound,
      outer_radius: outerRadius,
      target_radius: targetRadius,
      q,
      finite_prefix_order: retainedOrder,
      finite_prefix_floor: finiteFloor,
      cauchy_tail_after_prefix_majorant: tailLoss,
      prefix_plus_tail_floor: floor,
    },
    source_profile_count: profiles.length,
    candidate_bound_source:
      "aggregate fold-pair conservative minimum of evaluator Jacobian analytic remainder profile candidates",
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

function h39AggregateNGEvaluatorProfile({
  candidates,
  denominatorCauchyNGOuterBoundCandidate,
}) {
  const profiles = Array.isArray(candidates) ? candidates : [];
  if (profiles.length === 0) {
    return null;
  }
  if (
    profiles.some(
      (candidate) =>
        candidate?.status !== "h39-n-g-outer-bound-candidate-m-g-emitted"
    )
  ) {
    return null;
  }
  const source = denominatorCauchyNGOuterBoundCandidate ?? {};
  const outerBound = firstFiniteNumber(
    source.n_g_cauchy_outer_bound,
    source.candidate_N_G_outer_bound,
    finiteMaximum(profiles.map((candidate) => candidate?.n_g_outer_bound))
  );
  const outerRadius = firstFiniteNumber(
    source.n_g_cauchy_outer_radius,
    finiteMaximum(profiles.map((candidate) => candidate?.n_g_outer_radius))
  );
  const rho = firstFiniteNumber(
    source.rho,
    finiteMaximum(profiles.map((candidate) => candidate?.rho))
  );
  const q = finiteMaximum(profiles.map((candidate) => candidate?.q));
  const retainedOrder = finiteMaximum(
    profiles.map((candidate) => candidate?.retained_shifted_prefix_order)
  );
  const prefix = finiteMaximum(
    profiles.map((candidate) => candidate?.candidate_M_G_finite_prefix)
  );
  const tail = finiteMaximum(
    profiles.map(
      (candidate) => candidate?.candidate_M_G_cauchy_tail_after_prefix
    )
  );
  const bound = finiteMaximum([
    finiteMaximum(
      profiles.map(
        (candidate) => candidate?.candidate_M_G_prefix_plus_tail_bound
      )
    ),
    prefix !== null && tail !== null ? prefix + tail : null,
  ]);

  return {
    status: "h39-n-g-outer-bound-candidate-m-g-emitted",
    evaluation_level:
      "aggregate-evaluator-N_G-cauchy-analytic-remainder-profile",
    n_g_shift: H39_NG_SHIFT_POWER,
    retained_shifted_prefix_order: retainedOrder,
    n_g_outer_bound: outerBound,
    n_g_outer_radius: outerRadius,
    rho,
    q,
    candidate_M_G_finite_prefix: prefix,
    candidate_M_G_cauchy_tail_after_prefix: tail,
    candidate_M_G_cauchy_tail_remainder_profile: tail,
    candidate_M_G_prefix_plus_tail_bound: bound,
    mGRemainderProfile: tail,
    shifted_T_G_prefix_plus_tail_majorant: bound,
    cauchy_diagnostic: {
      shift_power: H39_NG_SHIFT_POWER,
      outer_bound: outerBound,
      outer_radius: outerRadius,
      target_radius: rho,
      q,
      finite_prefix_order: retainedOrder,
      unshifted_finite_prefix_majorant: prefix,
      unshifted_cauchy_tail_after_prefix_majorant: tail,
      unshifted_function_prefix_plus_tail_majorant: bound,
      shifted_function_prefix_plus_tail_majorant: bound,
    },
    source_profile_count: profiles.length,
    candidate_bound_source:
      "aggregate maximum of evaluator N_G analytic remainder profile candidates",
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_h39_polydisc_M_G_bound: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

function branchCandidateValue(candidate, ...fields) {
  return firstFiniteNumber(...fields.map((field) => candidate?.[field]));
}

function h39SelectMaxByBranch(candidates, fields) {
  const selected = [];
  for (const branch of H39_FOLD_PAIR_BRANCHES) {
    const branchCandidates = candidates.filter(
      (candidate) => candidate?.branch === branch
    );
    if (branchCandidates.length === 0) {
      return null;
    }
    let best = null;
    let bestValue = null;
    for (const candidate of branchCandidates) {
      const value = branchCandidateValue(candidate, ...fields);
      if (value === null) {
        return null;
      }
      if (bestValue === null || value > bestValue) {
        best = candidate;
        bestValue = value;
      }
    }
    selected.push(best);
  }
  return selected;
}

function h39ConsistentFiniteNumber(values) {
  const finiteValues = values
    .map((value) => finiteNumber(value))
    .filter((value) => value !== null);
  if (finiteValues.length === 0) {
    return null;
  }
  const first = finiteValues[0];
  return finiteValues.every((value) => numericClose(value, first))
    ? first
    : null;
}

function h39AggregateCoefficientArtifactCoordinateSource(cells) {
  const coefficientCells = Array.isArray(cells) ? cells : [];
  if (coefficientCells.length <= 1) {
    return null;
  }
  const sources = coefficientCells
    .map((cell) => cell?.coordinate_cauchy_outer_bounds_profile_candidate)
    .filter(Boolean);
  if (sources.length !== coefficientCells.length) {
    return null;
  }
  const domainSignature = proofDomainSignature(sources[0]);
  const domainsMatch = sources.every((source) =>
    domainSignatureMatches(proofDomainSignature(source), domainSignature)
  );
  if (!domainsMatch) {
    return null;
  }
  const residualCandidates = h39SelectMaxByBranch(
    sources.flatMap((source) =>
      Array.isArray(source.source_residual_outer_bound_candidates)
        ? source.source_residual_outer_bound_candidates
        : []
    ),
    ["r43_cauchy_outer_bound", "candidate_R43_source_outer_bound"]
  );
  const jacobianCandidates = h39SelectMaxByBranch(
    sources.flatMap((source) =>
      Array.isArray(source.jacobian_outer_bound_candidates)
        ? source.jacobian_outer_bound_candidates
        : []
    ),
    ["jacobian_cauchy_outer_bound", "candidate_R43_jacobian_outer_bound"]
  );
  if (residualCandidates === null || jacobianCandidates === null) {
    return null;
  }
  const r43OuterRadius = h39ConsistentFiniteNumber(
    sources.map((source) => source.r43_cauchy_outer_radius)
  );
  const jacobianNumeratorOuterRadius = h39ConsistentFiniteNumber(
    sources.map((source) => source.jacobian_numerator_cauchy_outer_radius)
  );
  const jacobianOuterRadius = h39ConsistentFiniteNumber(
    sources.map((source) => source.jacobian_cauchy_outer_radius)
  );
  const xOuterRadius = h39ConsistentFiniteNumber(
    sources.map((source) => source.x_outer_radius)
  );
  if (
    r43OuterRadius === null ||
    jacobianNumeratorOuterRadius === null ||
    jacobianOuterRadius === null ||
    xOuterRadius === null
  ) {
    return null;
  }
  const sourceR43OuterBound = finiteMaximum(
    residualCandidates.map((candidate) =>
      branchCandidateValue(
        candidate,
        "r43_cauchy_outer_bound",
        "candidate_R43_source_outer_bound"
      )
    )
  );
  const sourceJacobianOuterBound = finiteMaximum(
    jacobianCandidates.map((candidate) =>
      branchCandidateValue(
        candidate,
        "jacobian_cauchy_outer_bound",
        "candidate_R43_jacobian_outer_bound"
      )
    )
  );
  const firstSource = sources[0];
  const allCertified = sources.every(
    (source) =>
      proofDirectedRoundedCertified(source) &&
      source?.certifies_directed_rounded_shared_domain === true &&
      source?.certifies_directed_rounded_coordinate_cauchy_outer_bounds ===
        true &&
      source?.includes_coordinate_cauchy_tails === true &&
      source?.includes_analytic_tail === true &&
      source?.assumes_fixed_speed_window === false
  );

  return {
    schema: firstSource.schema,
    status: "h39-coordinate-cauchy-outer-bounds-profile-candidate-emitted",
    evaluation_level:
      "aggregate-coefficient-artifact-coordinate-cauchy-outer-bound",
    r43_cauchy_outer_radius: r43OuterRadius,
    candidate_R43_source_outer_bound: sourceR43OuterBound,
    r43_cauchy_outer_bound: sourceR43OuterBound,
    jacobian_numerator_cauchy_outer_radius:
      jacobianNumeratorOuterRadius,
    jacobian_cauchy_outer_radius: jacobianOuterRadius,
    candidate_R43_jacobian_outer_bound: sourceJacobianOuterBound,
    jacobian_cauchy_outer_bound: sourceJacobianOuterBound,
    source_residual_outer_bound_candidates: residualCandidates,
    jacobian_outer_bound_candidates: jacobianCandidates,
    x_outer_radius: xOuterRadius,
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: allCertified,
    retained_branch: false,
    domain_signature: domainSignature,
    certifies_directed_rounded: allCertified,
    directed_rounded: allCertified,
    certifies_directed_rounded_coordinate_cauchy_outer_bounds:
      allCertified,
    certificate_status: allCertified
      ? "directed-rounded-certified"
      : "witness-required",
    includes_coordinate_cauchy_tails: allCertified,
    includes_analytic_tail: allCertified,
    assumes_fixed_speed_window: false,
    aggregate_source_cell_count: coefficientCells.length,
    aggregate_source_rule:
      "per-branch maximum over emitted coefficient-cell coordinate-Cauchy source certificates",
  };
}

function h39AggregateCoefficientArtifactDenominatorSource(cells) {
  const coefficientCells = Array.isArray(cells) ? cells : [];
  if (coefficientCells.length <= 1) {
    return null;
  }
  const sources = coefficientCells
    .map((cell) => cell?.denominator_cauchy_n_g_outer_bound_candidate)
    .filter(Boolean);
  if (sources.length !== coefficientCells.length) {
    return null;
  }
  const domainSignature = proofDomainSignature(sources[0]);
  const domainsMatch = sources.every((source) =>
    domainSignatureMatches(proofDomainSignature(source), domainSignature)
  );
  if (!domainsMatch) {
    return null;
  }
  const outerRadius = h39ConsistentFiniteNumber(
    sources.map(
      (source) => source.outer_radius ?? source.n_g_cauchy_outer_radius
    )
  );
  const rho = h39ConsistentFiniteNumber(
    sources.map((source) => source.rho)
  );
  const lMajorant = h39ConsistentFiniteNumber(
    sources.map((source) => source.l_majorant)
  );
  const lowerPolynomialMajorant = h39ConsistentFiniteNumber(
    sources.map((source) => source.lower_polynomial_majorant)
  );
  if (
    rho === null ||
    outerRadius === null ||
    lMajorant === null ||
    lowerPolynomialMajorant === null
  ) {
    return null;
  }
  let selectedSource = null;
  let selectedOuterBound = null;
  for (const source of sources) {
    const sourceOuterBound = finiteNumber(source.n_g_cauchy_outer_bound);
    if (sourceOuterBound === null) {
      return null;
    }
    if (selectedOuterBound === null || sourceOuterBound > selectedOuterBound) {
      selectedSource = source;
      selectedOuterBound = sourceOuterBound;
    }
  }
  const allCertified = sources.every(
    (source) =>
      proofDirectedRoundedCertified(source) &&
      source?.certifies_directed_rounded_shared_domain === true &&
      source?.certifies_directed_rounded_denominator_cauchy_N_G_outer_bound ===
        true &&
      source?.includes_denominator_cauchy_tails === true &&
      source?.includes_analytic_tail === true &&
      source?.assumes_fixed_speed_window === false
  );

  return {
    ...selectedSource,
    evaluation_level:
      "selected-coefficient-artifact-denominator-cauchy-n-g-outer-bound",
    candidate_bound_source:
      "whole-row maximum over emitted coefficient-cell denominator Cauchy N_G source certificates",
    certifies_directed_rounded_shared_domain: allCertified,
    domain_signature: domainSignature,
    certifies_directed_rounded: allCertified,
    directed_rounded: allCertified,
    certifies_directed_rounded_denominator_cauchy_N_G_outer_bound:
      allCertified,
    certificate_status: allCertified
      ? "directed-rounded-certified"
      : "witness-required",
    includes_denominator_cauchy_tails: allCertified,
    includes_analytic_tail: allCertified,
    assumes_fixed_speed_window: false,
    aggregate_source_cell_count: coefficientCells.length,
    aggregate_source_rule:
      "selects the emitted coefficient-cell denominator-Cauchy source with maximal certified N_G outer bound; no synthetic branch-sum source is formed",
  };
}

function h39AggregateCoefficientArtifactKEpsilonWitnessSet(cells) {
  const coefficientCells = Array.isArray(cells) ? cells : [];
  if (coefficientCells.length <= 1) {
    return null;
  }
  const sourceSets = coefficientCells
    .map((cell) => cell?.h39_K_epsilon_branch_coordinate_witness_set)
    .filter(Boolean);
  if (sourceSets.length !== coefficientCells.length) {
    return null;
  }
  const branchWitnesses = sourceSets.flatMap((sourceSet) =>
    Array.isArray(sourceSet.branch_coordinate_witnesses)
      ? sourceSet.branch_coordinate_witnesses
      : []
  );
  if (branchWitnesses.length === 0) {
    return null;
  }
  const domainSignature =
    sourceSets[0]?.shared_domain_signature ?? null;
  const domainsMatch = sourceSets.every((sourceSet) =>
    domainSignatureMatches(
      sourceSet?.shared_domain_signature ?? null,
      domainSignature
    )
  );
  if (!domainsMatch) {
    return null;
  }
  const selectedBranchWitnesses = h39SelectMaxByBranch(
    branchWitnesses.map((witness) => ({
      ...witness,
      branch_K_epsilon_majorant:
        finiteNumber(witness?.speed_term_upper) !== null &&
        finiteNumber(witness?.sinh_delta_upper) !== null &&
        finiteNumber(witness?.sinh_phi_upper) !== null
          ? finiteNumber(witness.speed_term_upper) +
            finiteNumber(witness.sinh_delta_upper) +
            finiteNumber(witness.sinh_phi_upper)
          : null,
    })),
    ["branch_K_epsilon_majorant"]
  );
  if (selectedBranchWitnesses === null) {
    return null;
  }
  const rho = h39ConsistentFiniteNumber(
    sourceSets.map((sourceSet) => sourceSet.rho)
  );
  const outerRadius = h39ConsistentFiniteNumber(
    sourceSets.map((sourceSet) => sourceSet.outer_radius)
  );
  if (rho === null || outerRadius === null) {
    return null;
  }
  const branchPackets = sourceSets.flatMap((sourceSet) =>
    Array.isArray(sourceSet.branch_coordinate_witness_packets)
      ? sourceSet.branch_coordinate_witness_packets
      : []
  );
  const selectedBranchMajorants = new Map(
    selectedBranchWitnesses.map((witness) => [
      witness.branch,
      witness.branch_K_epsilon_majorant,
    ])
  );
  const branchPacketMajorant = (packet) => {
    const witness = packet?.branch_coordinate_witness ?? {};
    const speedTerm = finiteNumber(witness.speed_term_upper);
    const sinhDelta = finiteNumber(witness.sinh_delta_upper);
    const sinhPhi = finiteNumber(witness.sinh_phi_upper);
    return speedTerm !== null && sinhDelta !== null && sinhPhi !== null
      ? speedTerm + sinhDelta + sinhPhi
      : null;
  };
  const selectedBranchPackets = H39_FOLD_PAIR_BRANCHES.map((branch) =>
    branchPackets.find(
      (packet) =>
        packet?.branch === branch &&
        numericClose(
          branchPacketMajorant(packet),
          selectedBranchMajorants.get(branch)
        )
    )
  ).filter(Boolean);
  const failedPredicates = sourceSets.flatMap(
    (sourceSet) => sourceSet?.predicate_check?.failed_predicates ?? []
  );
  const certifiesWitnessSet =
    failedPredicates.length === 0 &&
    sourceSets.every(
      (sourceSet) =>
        sourceSet?.result?.h39_K_epsilon_branch_coordinate_witness_set ===
        true
    );

  return {
    schema: sourceSets[0]?.schema ?? null,
    packet_id: sourceSets[0]?.packet_id ?? null,
    promotion_status: PROMOTION_STATUS,
    witness_status: certifiesWitnessSet
      ? "directed-rounded-same-domain-K_epsilon-branch-coordinate-witness-set-certified"
      : "open-K_epsilon-branch-coordinate-witness-set-unverified",
    rho,
    outer_radius: outerRadius,
    shared_domain_signature: domainSignature,
    branch_coordinate_witness_packets: selectedBranchPackets,
    branch_coordinate_witnesses: selectedBranchWitnesses,
    predicate_check: {
      source_set_count: sourceSets.length,
      branch_count: selectedBranchWitnesses.length,
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
    aggregate_source_cell_count: coefficientCells.length,
    aggregate_source_rule:
      "all emitted coefficient-cell K_epsilon branch witnesses feed one max-over-branches K_epsilon replay",
  };
}

function resolveH39UpstreamSourceInputs({
  sharedDomainEvaluatorArtifact,
  primitiveVectorBackendArtifact,
  denominatorCauchyNGOuterBoundCandidate,
  nGOuterBoundMGProfile,
  coordinateCauchyOuterBoundsProfileCandidate,
  r43AnalyticProfileWitness,
  jacobianFloorWitness,
  kEpsilonBranchCoordinateWitnessSet,
  graphRadiiWitness,
}) {
  const evaluatorSourceArtifact = h39EvaluatorSourceArtifact(
    sharedDomainEvaluatorArtifact
  );
  const evaluatorCoefficientCells = h39EvaluatorCoefficientCells(
    sharedDomainEvaluatorArtifact
  );
  const aggregateCoordinateSource =
    h39AggregateCoefficientArtifactCoordinateSource(
      evaluatorCoefficientCells
    );
  const aggregateDenominatorSource =
    h39AggregateCoefficientArtifactDenominatorSource(
      evaluatorCoefficientCells
    );
  const aggregateKEpsilonWitnessSet =
    h39AggregateCoefficientArtifactKEpsilonWitnessSet(
      evaluatorCoefficientCells
    );
  const summary = h39EvaluatorSummary(sharedDomainEvaluatorArtifact);
  const resolvedCoordinateSource =
    coordinateCauchyOuterBoundsProfileCandidate ??
    evaluatorSourceArtifact?.coordinate_cauchy_outer_bounds_profile_candidate ??
    aggregateCoordinateSource ??
    sharedDomainEvaluatorArtifact?.coordinate_cauchy_outer_bounds_profile_candidate ??
    summary?.coordinate_cauchy_outer_bounds_profile_candidate ??
    null;
  const resolvedDenominatorSource =
    denominatorCauchyNGOuterBoundCandidate ??
    evaluatorSourceArtifact?.denominator_cauchy_n_g_outer_bound_candidate ??
    aggregateDenominatorSource ??
    sharedDomainEvaluatorArtifact?.denominator_cauchy_n_g_outer_bound_candidate ??
    summary?.denominator_cauchy_n_g_outer_bound_candidate ??
    null;
  const resolvedR43Profile =
    r43AnalyticProfileWitness ??
    h39AggregateR43EvaluatorProfile({
      candidates: h39EvaluatorR43ProfileCandidates(
        sharedDomainEvaluatorArtifact
      ),
      coordinateCauchyOuterBoundsProfileCandidate:
        resolvedCoordinateSource,
    });
  const resolvedJacobianProfile =
    jacobianFloorWitness ??
    h39AggregateJacobianEvaluatorProfile({
      candidates: h39EvaluatorJacobianProfileCandidates(
        sharedDomainEvaluatorArtifact
      ),
      coordinateCauchyOuterBoundsProfileCandidate:
        resolvedCoordinateSource,
    });
  const resolvedNGProfile =
    nGOuterBoundMGProfile ??
    h39AggregateNGEvaluatorProfile({
      candidates: h39EvaluatorNGProfileCandidates(
        sharedDomainEvaluatorArtifact
      ),
      denominatorCauchyNGOuterBoundCandidate:
        resolvedDenominatorSource,
    });
  const resolvedPrimitiveVector =
    primitiveVectorBackendArtifact ??
    h39EvaluatorPrimitiveVectorBackendArtifact(
      sharedDomainEvaluatorArtifact
    );
  const resolvedGraphRadiiWitness =
    graphRadiiWitness ??
    sharedDomainEvaluatorArtifact?.graph_radii_witness ??
    evaluatorSourceArtifact?.graph_radii_witness ??
    sharedDomainEvaluatorArtifact?.source_graph_radii_witness ??
    null;
  const resolvedKEpsilonBranchCoordinateWitnessSet =
    kEpsilonBranchCoordinateWitnessSet ??
    evaluatorSourceArtifact?.h39_K_epsilon_branch_coordinate_witness_set ??
    aggregateKEpsilonWitnessSet ??
    sharedDomainEvaluatorArtifact?.h39_K_epsilon_branch_coordinate_witness_set ??
    evaluatorSourceArtifact?.K_epsilon_branch_coordinate_witness_set ??
    sharedDomainEvaluatorArtifact?.K_epsilon_branch_coordinate_witness_set ??
    null;

  return {
    primitiveVectorBackendArtifact: resolvedPrimitiveVector,
    denominatorCauchyNGOuterBoundCandidate: resolvedDenominatorSource,
    nGOuterBoundMGProfile: resolvedNGProfile,
    coordinateCauchyOuterBoundsProfileCandidate:
      resolvedCoordinateSource,
    r43AnalyticProfileWitness: resolvedR43Profile,
    jacobianFloorWitness: resolvedJacobianProfile,
    kEpsilonBranchCoordinateWitnessSet:
      resolvedKEpsilonBranchCoordinateWitnessSet,
    graphRadiiWitness: resolvedGraphRadiiWitness,
  };
}

function resolveH39UpstreamSourceSharedDomain({
  sharedDomainSignature,
  coordinateCauchyOuterBoundsProfileCandidate,
  denominatorCauchyNGOuterBoundCandidate,
  kernelMajorantWitness,
  kEpsilonBranchCoordinateWitnessSet = null,
  branchCoordinateWitnesses = [],
  graphRadiiWitness,
}) {
  return (
    sharedDomainSignature ??
    proofDomainSignature(coordinateCauchyOuterBoundsProfileCandidate) ??
    proofDomainSignature(denominatorCauchyNGOuterBoundCandidate) ??
    proofDomainSignature(kernelMajorantWitness) ??
    proofDomainSignature(
      kEpsilonBranchCoordinateWitnessSet?.branch_coordinate_witnesses?.[0]
    ) ??
    proofDomainSignature(branchCoordinateWitnesses[0]) ??
    proofDomainSignature(graphRadiiWitness) ??
    null
  );
}

function resolveH39KepsilonBranchCoordinateWitnesses({
  kEpsilonBranchCoordinateWitnessSet,
  branchCoordinateWitnesses,
}) {
  const setWitnesses =
    kEpsilonBranchCoordinateWitnessSet?.branch_coordinate_witnesses;
  if (Array.isArray(setWitnesses) && setWitnesses.length > 0) {
    return setWitnesses;
  }
  return Array.isArray(branchCoordinateWitnesses)
    ? branchCoordinateWitnesses
    : [];
}

function h39UpstreamSourceCompositionPredicateCheck({
  sharedDomainEvaluatorArtifact,
  coordinateCauchyR43JacobianWitnessReplay,
  nGDenominatorCauchyMGWitnessReplay,
  kEpsilonMajorantWitnessReplay,
  usesKepsilonMajorantReplay,
  lJKernelWitnessSubsetReplay,
  graphRadiiWitnessSubsetReplay,
  componentSubsetCompositionReplay,
  sharedDomainSignature,
}) {
  const coordinateErrors = coordinateCauchyR43JacobianWitnessReplay
    ? validateH39CoordinateCauchyR43JacobianWitness(
        coordinateCauchyR43JacobianWitnessReplay
      )
    : ["coordinate-Cauchy R43/Jacobian witness missing"];
  const denominatorErrors = nGDenominatorCauchyMGWitnessReplay
    ? validateH39NGDenominatorCauchyMGWitness(
        nGDenominatorCauchyMGWitnessReplay
      )
    : ["N_G denominator-Cauchy M_G witness missing"];
  const kEpsilonErrors =
    kEpsilonMajorantWitnessReplay && usesKepsilonMajorantReplay
      ? validateH39KepsilonMajorantWitness(kEpsilonMajorantWitnessReplay)
      : [];
  const lJErrors = lJKernelWitnessSubsetReplay
    ? validateH39LJKernelWitnessSubset(lJKernelWitnessSubsetReplay)
    : ["L_J kernel witness subset missing"];
  const graphErrors = graphRadiiWitnessSubsetReplay
    ? validateH39GraphRadiiWitnessSubset(graphRadiiWitnessSubsetReplay)
    : ["graph-radii witness subset missing"];
  const compositionErrors = componentSubsetCompositionReplay
    ? validateH39ComponentSubsetComposition(componentSubsetCompositionReplay)
    : ["component-subset composition replay missing"];
  const upstreamErrorsFlat = [
    ...coordinateErrors.map((error) => `coordinate_cauchy:${error}`),
    ...denominatorErrors.map((error) => `denominator_cauchy:${error}`),
    ...kEpsilonErrors.map((error) => `K_epsilon_majorant:${error}`),
    ...lJErrors.map((error) => `L_J_kernel:${error}`),
    ...graphErrors.map((error) => `graph_radii:${error}`),
    ...compositionErrors.map((error) => `component_composition:${error}`),
  ];
  const domainSources = {
    coordinate_cauchy: [
      proofDomainSignature(
        coordinateCauchyR43JacobianWitnessReplay
          ?.source_coordinate_cauchy_outer_bounds_profile_candidate
      ),
      proofDomainSignature(
        coordinateCauchyR43JacobianWitnessReplay
          ?.source_R43_analytic_profile_candidate
      ),
      proofDomainSignature(
        coordinateCauchyR43JacobianWitnessReplay
          ?.source_jacobian_floor_profile_candidate
      ),
      coordinateCauchyR43JacobianWitnessReplay?.shared_domain_signature ??
        null,
    ],
    denominator_cauchy: [
      proofDomainSignature(
        nGDenominatorCauchyMGWitnessReplay
          ?.source_denominator_cauchy_N_G_outer_bound_candidate
      ),
      proofDomainSignature(
        nGDenominatorCauchyMGWitnessReplay
          ?.source_N_G_outer_bound_M_G_profile
      ),
      nGDenominatorCauchyMGWitnessReplay?.shared_domain_signature ?? null,
    ],
    K_epsilon_majorant: usesKepsilonMajorantReplay
      ? [
          kEpsilonMajorantWitnessReplay?.shared_domain_signature ?? null,
          proofDomainSignature(
            kEpsilonMajorantWitnessReplay?.kernel_majorant_witness
          ),
        ]
      : [],
    L_J_kernel: [
      proofDomainSignature(
        lJKernelWitnessSubsetReplay?.source_kernel_majorant_artifact
      ),
      proofDomainSignature(lJKernelWitnessSubsetReplay?.kernel_majorant_witness),
      lJKernelWitnessSubsetReplay?.shared_domain_signature ?? null,
    ],
    graph_radii: [
      proofDomainSignature(
        graphRadiiWitnessSubsetReplay?.source_graph_radii_witness
      ),
      graphRadiiWitnessSubsetReplay?.shared_domain_signature ?? null,
    ],
    component_composition: [
      componentSubsetCompositionReplay?.shared_domain_signature ?? null,
    ],
  };
  const domainMismatchSources = Object.entries(domainSources)
    .filter(([, signatures]) =>
      signatures.some(
        (signature) =>
          signature !== null &&
          !domainSignatureMatches(signature, sharedDomainSignature)
      )
    )
    .map(([source]) => source);
  const forbiddenSpeedFields = findForbiddenSpeedFields({
    sharedDomainEvaluatorArtifact,
    coordinateCauchyR43JacobianWitnessReplay,
    nGDenominatorCauchyMGWitnessReplay,
    kEpsilonMajorantWitnessReplay,
    lJKernelWitnessSubsetReplay,
    graphRadiiWitnessSubsetReplay,
    componentSubsetCompositionReplay,
    sharedDomainSignature,
  });
  const checks = {
    shared_domain_signature_present:
      sharedDomainSignature !== null && sharedDomainSignature !== undefined,
    upstream_sources_validate: upstreamErrorsFlat.length === 0,
    coordinate_cauchy_components_certified:
      coordinateCauchyR43JacobianWitnessReplay?.result
        ?.h39_E_R_component_witness === true &&
      coordinateCauchyR43JacobianWitnessReplay?.result
        ?.h39_M_R_component_witness === true &&
      coordinateCauchyR43JacobianWitnessReplay?.result
        ?.h39_nu_J_component_witness === true,
    denominator_cauchy_M_G_component_certified:
      nGDenominatorCauchyMGWitnessReplay?.result
        ?.h39_M_G_component_witness === true,
    K_epsilon_majorant_replay_validates:
      !usesKepsilonMajorantReplay || kEpsilonErrors.length === 0,
    K_epsilon_majorant_replay_certified:
      !usesKepsilonMajorantReplay ||
      kEpsilonMajorantWitnessReplay?.result
        ?.h39_K_epsilon_majorant_witness === true,
    L_J_component_certified:
      lJKernelWitnessSubsetReplay?.result
        ?.h39_L_J_component_witness === true,
    graph_radii_components_certified:
      graphRadiiWitnessSubsetReplay?.result?.h39_rho_X_component_witness ===
        true &&
      graphRadiiWitnessSubsetReplay?.result?.h39_r_X_component_witness ===
        true,
    all_upstream_sources_on_shared_domain:
      domainMismatchSources.length === 0,
    component_subset_composition_closes:
      componentSubsetCompositionReplay?.result
        ?.h39_continuous_tail_certificate === true,
    no_fixed_speed_window: forbiddenSpeedFields.length === 0,
  };
  const failedPredicates = Object.entries(checks)
    .filter(([, passes]) => passes !== true)
    .map(([key]) => key);

  return {
    checks,
    failed_predicates: failedPredicates,
    upstream_validation_errors: {
      coordinate_cauchy_R43_jacobian: coordinateErrors,
      N_G_denominator_cauchy_M_G: denominatorErrors,
      K_epsilon_majorant: kEpsilonErrors,
      L_J_kernel: lJErrors,
      graph_radii: graphErrors,
      component_subset_composition: compositionErrors,
    },
    upstream_validation_error_count: upstreamErrorsFlat.length,
    domain_mismatch_sources: domainMismatchSources,
    forbidden_speed_fields: forbiddenSpeedFields,
    certifies_upstream_source_composition: failedPredicates.length === 0,
  };
}

export function buildH39UpstreamSourceComposition({
  sharedDomainEvaluatorArtifact = null,
  primitiveVectorBackendArtifact = null,
  denominatorCauchyNGOuterBoundCandidate = null,
  nGOuterBoundMGProfile = null,
  coordinateCauchyOuterBoundsProfileCandidate = null,
  r43AnalyticProfileWitness = null,
  jacobianFloorWitness = null,
  kernelMajorantArtifact = null,
  kernelMajorantWitness = null,
  kEpsilonBranchCoordinateWitnessSet = null,
  branchCoordinateWitnesses = [],
  graphRadiiWitness = null,
  sharedDomainSignature = null,
} = {}) {
  const resolvedInputs = resolveH39UpstreamSourceInputs({
    sharedDomainEvaluatorArtifact,
    primitiveVectorBackendArtifact,
    denominatorCauchyNGOuterBoundCandidate,
    nGOuterBoundMGProfile,
    coordinateCauchyOuterBoundsProfileCandidate,
    r43AnalyticProfileWitness,
    jacobianFloorWitness,
    kEpsilonBranchCoordinateWitnessSet,
    graphRadiiWitness,
  });
  const resolvedPrimitiveVectorBackendArtifact =
    resolvedInputs.primitiveVectorBackendArtifact;
  const resolvedDenominatorCauchyNGOuterBoundCandidate =
    resolvedInputs.denominatorCauchyNGOuterBoundCandidate;
  const resolvedNGOuterBoundMGProfile =
    resolvedInputs.nGOuterBoundMGProfile;
  const resolvedCoordinateCauchyOuterBoundsProfileCandidate =
    resolvedInputs.coordinateCauchyOuterBoundsProfileCandidate;
  const resolvedR43AnalyticProfileWitness =
    resolvedInputs.r43AnalyticProfileWitness;
  const resolvedJacobianFloorWitness =
    resolvedInputs.jacobianFloorWitness;
  const resolvedKEpsilonBranchCoordinateWitnessSet =
    resolvedInputs.kEpsilonBranchCoordinateWitnessSet;
  const resolvedGraphRadiiWitness = resolvedInputs.graphRadiiWitness;
  const branchWitnesses = resolveH39KepsilonBranchCoordinateWitnesses({
    kEpsilonBranchCoordinateWitnessSet:
      resolvedKEpsilonBranchCoordinateWitnessSet,
    branchCoordinateWitnesses,
  });
  const usesKepsilonMajorantReplay =
    kernelMajorantWitness === null &&
    branchWitnesses.length > 0;
  const resolvedSharedDomain =
    resolveH39UpstreamSourceSharedDomain({
      sharedDomainSignature,
      coordinateCauchyOuterBoundsProfileCandidate:
        resolvedCoordinateCauchyOuterBoundsProfileCandidate,
      denominatorCauchyNGOuterBoundCandidate:
        resolvedDenominatorCauchyNGOuterBoundCandidate,
      kernelMajorantWitness,
      kEpsilonBranchCoordinateWitnessSet:
        resolvedKEpsilonBranchCoordinateWitnessSet,
      branchCoordinateWitnesses: branchWitnesses,
      graphRadiiWitness: resolvedGraphRadiiWitness,
    });
  const kEpsilonMajorantWitnessReplay =
    branchWitnesses.length > 0
      ? buildH39KepsilonMajorantWitness({
          sourceKernelMajorantArtifact: kernelMajorantArtifact,
          branchCoordinateWitnesses: branchWitnesses,
          sharedDomainSignature: resolvedSharedDomain,
          rho: firstFiniteNumber(
            kernelMajorantWitness?.rho,
            resolvedKEpsilonBranchCoordinateWitnessSet?.rho,
            kernelMajorantArtifact?.rho
          ),
        })
      : null;
  const resolvedKernelMajorantWitness = usesKepsilonMajorantReplay
    ? kEpsilonMajorantWitnessReplay?.kernel_majorant_witness ?? null
    : kernelMajorantWitness;
  const coordinateCauchyR43JacobianWitnessReplay =
    buildH39CoordinateCauchyR43JacobianWitness({
      coordinateCauchyOuterBoundsProfileCandidate:
        resolvedCoordinateCauchyOuterBoundsProfileCandidate,
      r43AnalyticProfileWitness: resolvedR43AnalyticProfileWitness,
      jacobianFloorWitness: resolvedJacobianFloorWitness,
      sharedDomainSignature: resolvedSharedDomain,
    });
  const nGDenominatorCauchyMGWitnessReplay =
    buildH39NGDenominatorCauchyMGWitness({
      denominatorCauchyNGOuterBoundCandidate:
        resolvedDenominatorCauchyNGOuterBoundCandidate,
      nGOuterBoundMGProfile: resolvedNGOuterBoundMGProfile,
      sharedDomainSignature: resolvedSharedDomain,
    });
  const lJKernelWitnessSubsetReplay = buildH39LJKernelWitnessSubset({
    kernelMajorantArtifact,
    kernelMajorantWitness: resolvedKernelMajorantWitness,
    sharedDomainSignature: resolvedSharedDomain,
  });
  const graphRadiiWitnessSubsetReplay = buildH39GraphRadiiWitnessSubset({
    graphRadiiWitness: resolvedGraphRadiiWitness,
    sharedDomainSignature: resolvedSharedDomain,
  });
  const r43Subset =
    coordinateCauchyR43JacobianWitnessReplay
      ?.R43_source_family_subset_replay ?? null;
  const jacobianSubset =
    coordinateCauchyR43JacobianWitnessReplay
      ?.jacobian_floor_subset_replay ?? null;
  const nGSubset =
    nGDenominatorCauchyMGWitnessReplay?.N_G_numerator_subset_replay ??
    null;
  const componentSubsetCompositionReplay =
    buildH39ComponentSubsetComposition({
      primitiveVectorBackendArtifact:
        resolvedPrimitiveVectorBackendArtifact,
      r43SourceFamilyWitnessSubset: r43Subset,
      nGNumeratorWitnessSubset: nGSubset,
      jacobianFloorWitnessSubset: jacobianSubset,
      lJKernelWitnessSubset: lJKernelWitnessSubsetReplay,
      graphRadiiWitnessSubset: graphRadiiWitnessSubsetReplay,
      sharedDomainSignature: resolvedSharedDomain,
    });
  const predicateCheck = h39UpstreamSourceCompositionPredicateCheck({
    sharedDomainEvaluatorArtifact,
    coordinateCauchyR43JacobianWitnessReplay,
    nGDenominatorCauchyMGWitnessReplay,
    kEpsilonMajorantWitnessReplay,
    usesKepsilonMajorantReplay,
    lJKernelWitnessSubsetReplay,
    graphRadiiWitnessSubsetReplay,
    componentSubsetCompositionReplay,
    sharedDomainSignature: resolvedSharedDomain,
  });
  const certifiesH39Tail =
    predicateCheck.certifies_upstream_source_composition &&
    componentSubsetCompositionReplay?.result
      ?.h39_continuous_tail_certificate === true;
  const status = certifiesH39Tail
    ? H39_UPSTREAM_SOURCE_COMPOSITION_CERTIFIED_STATUS
    : H39_UPSTREAM_SOURCE_COMPOSITION_OPEN_STATUS;
  const firstFailedPredicate =
    predicateCheck.failed_predicates[0] ??
    componentSubsetCompositionReplay?.result?.promotion_obstruction ??
    "unknown-upstream-source-composition-blocker";

  return {
    schema: H39_UPSTREAM_SOURCE_COMPOSITION_SCHEMA,
    packet_id: UPSTREAM_SOURCE_COMPOSITION_PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    provenance_status: status,
    composition_status: status,
    composition_scope: {
      report_kind: "h39-upstream-source-composition",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      shared_domain_signature: resolvedSharedDomain,
      required_upstream_sources: [
        H39_COORDINATE_CAUCHY_WITNESS_FAMILY,
        H39_NG_DENOMINATOR_CAUCHY_WITNESS_FAMILY,
        H39_LJ_KERNEL_WITNESS_FAMILY,
        H39_GRAPH_RADII_WITNESS_FAMILY,
      ],
      theorem_scope:
        "conditional composition of certified upstream H39 source witnesses into the existing component-subset composition; scaled remainder, I1, quadrature, and retained branch remain out of scope",
    },
    shared_domain_signature: resolvedSharedDomain,
    source_shared_domain_evaluator_artifact: sharedDomainEvaluatorArtifact,
    source_primitive_vector_backend_artifact:
      resolvedPrimitiveVectorBackendArtifact,
    source_coordinate_cauchy_outer_bounds_profile_candidate:
      resolvedCoordinateCauchyOuterBoundsProfileCandidate,
    source_R43_analytic_profile_candidate:
      resolvedR43AnalyticProfileWitness,
    source_jacobian_floor_profile_candidate:
      resolvedJacobianFloorWitness,
    source_denominator_cauchy_N_G_outer_bound_candidate:
      resolvedDenominatorCauchyNGOuterBoundCandidate,
    source_N_G_outer_bound_M_G_profile: resolvedNGOuterBoundMGProfile,
    source_kernel_majorant_artifact: kernelMajorantArtifact,
    source_kernel_majorant_witness: kernelMajorantWitness,
    source_K_epsilon_branch_coordinate_witness_set:
      resolvedKEpsilonBranchCoordinateWitnessSet,
    source_K_epsilon_branch_coordinate_witnesses: branchWitnesses,
    K_epsilon_majorant_witness_replay: kEpsilonMajorantWitnessReplay,
    resolved_kernel_majorant_witness: resolvedKernelMajorantWitness,
    source_graph_radii_witness: resolvedGraphRadiiWitness,
    coordinate_cauchy_R43_jacobian_witness_replay:
      coordinateCauchyR43JacobianWitnessReplay,
    N_G_denominator_cauchy_M_G_witness_replay:
      nGDenominatorCauchyMGWitnessReplay,
    L_J_kernel_witness_subset_replay: lJKernelWitnessSubsetReplay,
    graph_radii_witness_subset_replay: graphRadiiWitnessSubsetReplay,
    extracted_component_subsets: {
      R43_source_family: r43Subset,
      N_G_numerator: nGSubset,
      jacobian_floor: jacobianSubset,
      L_J_kernel: lJKernelWitnessSubsetReplay,
      graph_radii: graphRadiiWitnessSubsetReplay,
    },
    component_subset_composition_replay: componentSubsetCompositionReplay,
    primitive_provenance_certificate_replay:
      componentSubsetCompositionReplay
        ?.primitive_provenance_certificate_replay ?? null,
    certified_seven_input_primitive_witness:
      componentSubsetCompositionReplay
        ?.certified_seven_input_primitive_witness ?? null,
    predicate_check: predicateCheck,
    conditional_theorem: {
      hypothesis:
        "If the coordinate-Cauchy witness certifies E_R, M_R, and nu_J, the denominator-Cauchy witness certifies M_G, the L_J witness is either supplied directly or replayed from same-domain K_epsilon branch-coordinate witnesses, the graph-radii subset certifies its components, and all sources share one h39 graph-centered signature,",
      conclusion:
        "then their extracted component subsets replay through the existing component-subset composition; if the embedded primitive provenance certificate and strict scalar replay close, the h39 primitive continuous-tail row is certified.",
      non_claims:
        "The upstream source composition does not certify the full primitive vector as a separate object, scaled remainder, I1 regular critical exhaustion, quadrature, or retained branch status.",
    },
    no_go_theorem: certifiesH39Tail
      ? null
      : {
          hypothesis:
            "At least one upstream source is missing, open, malformed, domain-mismatched, contains a fixed speed-window field, or the embedded component-subset composition does not close.",
          conclusion:
            "The upstream sources cannot promote to the h39 primitive continuous-tail certificate until the failed predicate list is empty and the component-subset composition replay closes.",
          promotion_obstruction: firstFailedPredicate,
        },
    claim_boundary:
      h39UpstreamSourceCompositionClaimBoundary(certifiesH39Tail, {
        consumesKepsilonBranchWitnesses: usesKepsilonMajorantReplay,
        consumesSharedDomainEvaluatorArtifact:
          sharedDomainEvaluatorArtifact !== null,
      }),
    result: {
      theory_status: certifiesH39Tail
        ? "h39-upstream-source-composition-continuous-tail-certified"
        : "h39-upstream-source-composition-open",
      h39_upstream_source_composition:
        predicateCheck.certifies_upstream_source_composition,
      h39_component_subset_composition:
        componentSubsetCompositionReplay?.result
          ?.h39_component_subset_composition === true,
      h39_continuous_tail_certificate: certifiesH39Tail,
      h39_full_primitive_vector_certificate: false,
      promotion_obstruction: certifiesH39Tail
        ? null
        : firstFailedPredicate,
      retention: "not_retained",
      retained_branch: false,
      status_note: certifiesH39Tail
        ? "Certified upstream source witnesses replay through the existing component-subset composition into the h39 primitive continuous-tail row."
        : "The upstream source composition remains open; see failed predicates and the embedded component-subset composition replay.",
    },
  };
}

function optionsFromArtifact(artifact) {
  const bounds = artifact?.primitive_bounds ?? {};
  return {
    radiusMultiple: optionNumber(bounds.radius_multiple),
    radiusMultipleUpperBound: optionNumber(
      bounds.radius_multiple_upper_bound
    ),
    centerResidualBound: optionNumber(bounds.center_residual_bound_E_R),
    centerJacobianLowerBound: optionNumber(
      bounds.center_jacobian_lower_bound_nu_J
    ),
    jacobianLipschitzBound: optionNumber(
      bounds.jacobian_lipschitz_bound_L_J
    ),
    rhoX: optionNumber(bounds.rho_X),
    rX: optionNumber(bounds.r_X),
    rhoXUpperBound: optionNumber(bounds.rho_X_upper_bound),
    mGBound: optionNumber(bounds.candidate_M_G_bound),
    rootTangentNumeratorBound: optionNumber(
      bounds.candidate_root_tangent_numerator_bound_M_R
    ),
    primitiveBoundsSource:
      artifact?.diagnostic_scope?.primitive_bounds_source ?? null,
    primitiveBoundsStatus:
      artifact?.diagnostic_scope?.primitive_bounds_status ??
      DEFAULT_PRIMITIVE_BOUNDS_STATUS,
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

function approximatelyEqual(left, right, relativeTolerance = 1e-12) {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    return false;
  }
  const scale = Math.max(1, Math.abs(left), Math.abs(right));
  return Math.abs(left - right) <= relativeTolerance * scale;
}

function valuesMatch(left, right) {
  if (left === null || right === null) {
    return left === right;
  }
  if (typeof left === "number" || typeof right === "number") {
    return approximatelyEqual(Number(left), Number(right));
  }
  return JSON.stringify(left) === JSON.stringify(right);
}

function findForbiddenSpeedFields(value, trail = "$", found = []) {
  if (value === null || typeof value !== "object") {
    return found;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      findForbiddenSpeedFields(item, `${trail}[${index}]`, found);
    });
    return found;
  }
  for (const [key, child] of Object.entries(value)) {
    const childTrail = `${trail}.${key}`;
    if (FORBIDDEN_SPEED_FIELDS.has(key)) {
      found.push(childTrail);
    }
    findForbiddenSpeedFields(child, childTrail, found);
  }
  return found;
}

export function validateH39SharedDomainPrimitiveDiagnostic(artifact) {
  const errors = [];
  let expected = null;

  try {
    expected = buildH39SharedDomainPrimitiveDiagnostic(
      optionsFromArtifact(artifact)
    );
  } catch (error) {
    errors.push(
      `h39 shared-domain diagnostic could not be rebuilt from primitive bounds: ${error.message}`
    );
  }

  const forbiddenSpeedFields = findForbiddenSpeedFields(artifact);
  assertField(
    forbiddenSpeedFields.length === 0,
    `h39 shared-domain diagnostic must not contain speed-band fields: ${forbiddenSpeedFields.join(
      ", "
    )}`,
    errors
  );
  assertField(
    artifact?.schema === H39_SHARED_DOMAIN_PRIMITIVE_DIAGNOSTIC_SCHEMA,
    "schema must match h39 shared-domain primitive diagnostic schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match h39 shared-domain primitive diagnostic packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.diagnostic_scope?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.claim_boundary?.assumes_fixed_speed_window === false,
    "h39 shared-domain diagnostic must not impose a fixed speed window",
    errors
  );
  assertField(
    ALLOWED_PRIMITIVE_BOUNDS_STATUSES.has(
      artifact?.diagnostic_scope?.primitive_bounds_status
    ),
    "primitive bounds status must use an allowed diagnostic provenance label",
    errors
  );
  assertField(
    artifact?.diagnostic_scope?.consumes_reducer_schema ===
      H39_REDUCER_SCHEMA,
    "diagnostic scope must name the consumed h39 reducer schema",
    errors
  );

  const claim = artifact?.claim_boundary ?? {};
  assertField(
    claim.consumes_primitive_bounds === true &&
      claim.verifies_primitive_bounds_provenance === false &&
      claim.certifies_directed_rounded_h39_polydisc_M_G_bound === false &&
      claim.certifies_directed_rounded_h39_polydisc_Xi_bound === false &&
      claim.certifies_directed_rounded_shared_domain === false &&
      claim.certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound ===
        false &&
      claim.certifies_directed_rounded_fold_pair_scaled_remainder === false &&
      claim.certifies_I1_regular_critical_exhaustion === false &&
      claim.retained_branch === false,
    "claim boundary must not certify directed-rounded shared-domain, h39 polydisc bounds, continuous tail, scaled remainder, I1, or retention closure",
    errors
  );
  assertField(
    artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false,
    "diagnostic result must remain not_retained",
    errors
  );

  if (expected !== null) {
    const expectedReducerCheck = expected.reducer_check;
    const reducerCheck = artifact?.reducer_check ?? {};
    assertField(
      reducerCheck.schema === expectedReducerCheck.schema &&
        reducerCheck.valid === expectedReducerCheck.valid &&
        JSON.stringify(reducerCheck.errors) ===
          JSON.stringify(expectedReducerCheck.errors) &&
        reducerCheck.theory_status === expectedReducerCheck.theory_status &&
        reducerCheck.retention === expectedReducerCheck.retention &&
        reducerCheck.retained_branch === expectedReducerCheck.retained_branch,
      "h39 shared-domain diagnostic reducer check must match a fresh reducer replay",
      errors
    );

    for (const field of SUMMARY_COPY_FIELDS) {
      assertField(
        valuesMatch(
          artifact?.shared_domain_diagnostic_summary?.[field],
          expected.shared_domain_diagnostic_summary[field]
        ),
        `h39 shared-domain diagnostic summary field ${field} must match the reducer replay`,
        errors
      );
    }
    assertField(
      JSON.stringify(
        artifact?.shared_domain_diagnostic_summary
          ?.missing_explicit_primitive_bounds
      ) ===
        JSON.stringify(
          expected.shared_domain_diagnostic_summary
            .missing_explicit_primitive_bounds
        ) &&
        artifact?.shared_domain_diagnostic_summary?.diagnostic_decision ===
          expected.shared_domain_diagnostic_summary.diagnostic_decision,
      "h39 shared-domain diagnostic decision must match the supplied primitive bounds and provenance",
      errors
    );
  }

  const primitiveVectorBridge =
    artifact?.primitive_vector_promotion_theorem_bridge;
  if (primitiveVectorBridge !== undefined) {
    const expectedObstruction = primitiveVectorPromotionObstruction({
      inputReady:
        primitiveVectorBridge.primitive_diagnostic_input_ready === true,
      primitiveBoundsStatus:
        artifact?.diagnostic_scope?.primitive_bounds_status,
      diagnosticDecision:
        artifact?.shared_domain_diagnostic_summary?.diagnostic_decision,
    });
    assertField(
      primitiveVectorBridge.primitive_bounds_status ===
        artifact?.diagnostic_scope?.primitive_bounds_status &&
        primitiveVectorBridge.diagnostic_decision ===
          artifact?.shared_domain_diagnostic_summary?.diagnostic_decision &&
        primitiveVectorBridge.promotion_obstruction === expectedObstruction &&
        primitiveVectorBridge.theorem_claim ===
          "Routes a primitive-vector backend artifact into the h39 Rouché-primitive diagnostic; it does not verify directed-rounded provenance or promote retained-branch status.",
      "primitive-vector promotion theorem bridge must match the diagnostic decision and remain non-promoting",
      errors
    );
  }

  return errors;
}

export function validateH39CandidatePrimitiveProvenanceReport(artifact) {
  const errors = [];
  let expected = null;
  let certificate = null;

  try {
    expected =
      buildH39CandidatePrimitiveProvenanceReportFromPrimitiveVectorBackendArtifact(
        artifact?.source_primitive_vector_backend_artifact ?? null,
        { sharedDomainSignature: artifact?.shared_domain_signature ?? null }
      );
  } catch (error) {
    errors.push(
      `h39 candidate primitive provenance report could not be rebuilt: ${error.message}`
    );
  }

  try {
    certificate = buildH39SharedDomainPrimitiveProvenanceCertificate({
      primitiveVectorBackendArtifact:
        artifact?.source_primitive_vector_backend_artifact ?? null,
      directedRoundedProvenanceReport: artifact,
    });
  } catch (error) {
    errors.push(
      `h39 candidate primitive provenance report could not be replayed through certificate checker: ${error.message}`
    );
  }

  const forbiddenSpeedFields = findForbiddenSpeedFields(artifact);
  assertField(
    forbiddenSpeedFields.length === 0,
    `h39 candidate primitive provenance report must not contain speed-band fields: ${forbiddenSpeedFields.join(
      ", "
    )}`,
    errors
  );
  assertField(
    artifact?.schema === H39_CANDIDATE_PRIMITIVE_PROVENANCE_REPORT_SCHEMA,
    "schema must match h39 candidate primitive provenance report schema",
    errors
  );
  assertField(
    artifact?.packet_id === CANDIDATE_PROVENANCE_PACKET_ID,
    "packet id must match h39 candidate primitive provenance report packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.provenance_status ===
      H39_CANDIDATE_ONLY_PRIMITIVE_PROVENANCE_STATUS,
    "candidate primitive provenance report must use the candidate-only provenance status",
    errors
  );
  assertField(
    artifact?.provenance_report_scope?.speed_constraint ===
      NO_SPEED_WINDOW &&
      artifact?.claim_boundary?.assumes_fixed_speed_window === false,
    "h39 candidate primitive provenance report must not impose a fixed speed window",
    errors
  );

  const claim = artifact?.claim_boundary ?? {};
  assertField(
    JSON.stringify(claim) ===
      JSON.stringify(h39CandidatePrimitiveProvenanceClaimBoundary()),
    "candidate primitive provenance report claim boundary must remain non-promoting",
    errors
  );

  const componentProvenance = artifact?.component_provenance ?? {};
  for (const component of REQUIRED_PRIMITIVE_PROVENANCE_COMPONENTS) {
    const proof = componentProvenance[component.key];
    if (proof === undefined) {
      continue;
    }
    assertField(
      proof?.certifies_directed_rounded === false &&
        proof?.directed_rounded === false &&
        proof?.certificate_status === "candidate-only",
      `candidate primitive provenance component ${component.key} must remain candidate-only`,
      errors
    );
  }

  if (certificate !== null) {
    const sourceInputReady =
      artifact?.source_primitive_vector_backend_artifact
        ?.primitive_diagnostic_input_ready === true;
    const expectedCertificateStatus = sourceInputReady
      ? H39_CANDIDATE_ONLY_PRIMITIVE_PROVENANCE_STATUS
      : PROVENANCE_VERIFICATION_STATUSES.inputMissing;
    assertField(
      certificate?.same_domain_provenance_check?.status ===
        expectedCertificateStatus &&
        certificate?.result?.h39_continuous_tail_certificate === false &&
        certificate?.claim_boundary
          ?.certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound ===
          false,
      "candidate primitive provenance report must replay as a non-promoting h39 certificate",
      errors
    );
  }

  if (expected !== null) {
    assertField(
      JSON.stringify(artifact?.component_provenance) ===
        JSON.stringify(expected.component_provenance),
      "candidate primitive provenance components must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.candidate_provenance_summary) ===
        JSON.stringify(expected.candidate_provenance_summary),
      "candidate primitive provenance summary must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.result) === JSON.stringify(expected.result),
      "candidate primitive provenance result must match a fresh rebuild",
      errors
    );
  }

  return errors;
}

export function validateH39PrimitiveProvenanceWitnessSet(artifact) {
  const errors = [];
  let expected = null;
  let certificate = null;

  try {
    expected =
      buildH39PrimitiveProvenanceWitnessSetFromPrimitiveVectorBackendArtifact(
        artifact?.source_primitive_vector_backend_artifact ?? null,
        { sharedDomainSignature: artifact?.shared_domain_signature ?? null }
      );
  } catch (error) {
    errors.push(
      `h39 primitive provenance witness set could not be rebuilt: ${error.message}`
    );
  }

  try {
    certificate = buildH39SharedDomainPrimitiveProvenanceCertificate({
      primitiveVectorBackendArtifact:
        artifact?.source_primitive_vector_backend_artifact ?? null,
      directedRoundedProvenanceReport: artifact,
    });
  } catch (error) {
    errors.push(
      `h39 primitive provenance witness set could not be replayed through certificate checker: ${error.message}`
    );
  }

  const forbiddenSpeedFields = findForbiddenSpeedFields(artifact);
  assertField(
    forbiddenSpeedFields.length === 0,
    `h39 primitive provenance witness set must not contain speed-band fields: ${forbiddenSpeedFields.join(
      ", "
    )}`,
    errors
  );
  assertField(
    artifact?.schema === H39_PRIMITIVE_PROVENANCE_WITNESS_SET_SCHEMA,
    "schema must match h39 primitive provenance witness set schema",
    errors
  );
  assertField(
    artifact?.packet_id === WITNESS_SET_PACKET_ID,
    "packet id must match h39 primitive provenance witness set packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.provenance_status ===
      H39_PRIMITIVE_PROVENANCE_WITNESS_SET_STATUS &&
      artifact?.witness_set_status ===
        H39_PRIMITIVE_PROVENANCE_WITNESS_SET_STATUS,
    "primitive provenance witness set must use the open witness-set status",
    errors
  );
  assertField(
    artifact?.witness_set_scope?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.claim_boundary?.assumes_fixed_speed_window === false,
    "h39 primitive provenance witness set must not impose a fixed speed window",
    errors
  );
  assertField(
    JSON.stringify(artifact?.claim_boundary) ===
      JSON.stringify(h39PrimitiveProvenanceWitnessSetClaimBoundary()),
    "primitive provenance witness set claim boundary must remain non-promoting",
    errors
  );
  assertField(
    JSON.stringify(artifact?.component_provenance) ===
      JSON.stringify(artifact?.component_witnesses),
    "primitive provenance witness set component_provenance must mirror component_witnesses",
    errors
  );

  const componentWitnesses = artifact?.component_witnesses ?? {};
  for (const component of REQUIRED_PRIMITIVE_PROVENANCE_COMPONENTS) {
    const witness = componentWitnesses[component.key];
    assertField(
      witness !== undefined,
      `primitive provenance witness set must include ${component.key}`,
      errors
    );
    if (witness === undefined) {
      continue;
    }
    assertField(
      witness.certifies_directed_rounded === false &&
        witness.directed_rounded === false &&
        witness.certificate_status === "witness-required" &&
        witness.first_failed_promotion_predicate !== undefined,
      `primitive provenance witness ${component.key} must remain an explicit failed witness predicate`,
      errors
    );
  }

  if (certificate !== null) {
    const sourceInputReady =
      artifact?.source_primitive_vector_backend_artifact
        ?.primitive_diagnostic_input_ready === true;
    const expectedCertificateStatus = sourceInputReady
      ? H39_PRIMITIVE_PROVENANCE_WITNESS_SET_STATUS
      : PROVENANCE_VERIFICATION_STATUSES.inputMissing;
    assertField(
      certificate?.same_domain_provenance_check?.status ===
        expectedCertificateStatus &&
        certificate?.result?.h39_continuous_tail_certificate === false &&
        certificate?.claim_boundary
          ?.certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound ===
          false,
      "primitive provenance witness set must replay as a non-promoting h39 certificate",
      errors
    );
  }

  if (expected !== null) {
    assertField(
      JSON.stringify(artifact?.component_witnesses) ===
        JSON.stringify(expected.component_witnesses),
      "primitive provenance witness components must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.witness_set_summary) ===
        JSON.stringify(expected.witness_set_summary),
      "primitive provenance witness summary must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.result) === JSON.stringify(expected.result),
      "primitive provenance witness result must match a fresh rebuild",
      errors
    );
  }

  return errors;
}

export function validateH39KepsilonMajorantWitness(artifact) {
  const errors = [];
  let expected = null;

  try {
    expected = buildH39KepsilonMajorantWitness({
      sourceKernelMajorantArtifact:
        artifact?.source_kernel_majorant_artifact ?? null,
      branchCoordinateWitnesses:
        artifact?.branch_coordinate_witnesses ?? [],
      sharedDomainSignature: artifact?.shared_domain_signature ?? null,
      rho:
        artifact?.kernel_majorant_witness?.rho ??
        artifact?.candidate_kernel_replay?.rho ??
        null,
    });
  } catch (error) {
    errors.push(
      `h39 K_epsilon majorant witness could not be rebuilt: ${error.message}`
    );
  }

  const forbiddenSpeedFields = findForbiddenSpeedFields(artifact);
  assertField(
    forbiddenSpeedFields.length === 0,
    `h39 K_epsilon majorant witness must not contain speed-band fields: ${forbiddenSpeedFields.join(
      ", "
    )}`,
    errors
  );
  assertField(
    artifact?.schema === H39_KEPSILON_MAJORANT_WITNESS_SCHEMA,
    "schema must match h39 K_epsilon majorant witness schema",
    errors
  );
  assertField(
    artifact?.packet_id === KEPSILON_MAJORANT_WITNESS_PACKET_ID,
    "packet id must match h39 K_epsilon majorant witness packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.witness_scope?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.claim_boundary?.assumes_fixed_speed_window === false,
    "h39 K_epsilon majorant witness must not impose a fixed speed window",
    errors
  );

  const expectedCertifiesKepsilon =
    expected?.predicate_check?.certifies_K_epsilon_majorant === true;
  const expectedStatus = expectedCertifiesKepsilon
    ? H39_KEPSILON_MAJORANT_WITNESS_CERTIFIED_STATUS
    : H39_KEPSILON_MAJORANT_WITNESS_OPEN_STATUS;
  assertField(
    artifact?.provenance_status === expectedStatus &&
      artifact?.witness_status === expectedStatus,
    "h39 K_epsilon majorant witness status must match its rebuilt predicate result",
    errors
  );
  assertField(
    JSON.stringify(artifact?.claim_boundary) ===
      JSON.stringify(
        h39KepsilonMajorantWitnessClaimBoundary(
          expectedCertifiesKepsilon
        )
      ),
    expectedCertifiesKepsilon
      ? "h39 K_epsilon majorant witness claim boundary must certify only M_K"
      : "h39 K_epsilon majorant witness claim boundary must remain non-promoting",
    errors
  );

  const ljReplayErrors = validateH39LJKernelWitnessSubset(
    artifact?.L_J_subset_replay
  );
  assertField(
    ljReplayErrors.length === 0,
    `embedded h39 L_J subset replay must validate: ${ljReplayErrors.join(
      "; "
    )}`,
    errors
  );

  const witness = artifact?.kernel_majorant_witness;
  if (expectedCertifiesKepsilon) {
    assertField(
      witness?.component === "M_K" &&
        witness?.relation === "kernel-majorant-upper-bound" &&
        Number.isFinite(Number(witness?.value)) &&
        Number(witness.value) >= 0 &&
        witness?.certifies_directed_rounded === true &&
        witness?.directed_rounded === true &&
        witness?.certificate_status === "directed-rounded-certified" &&
        witness?.kernel_y_power === H39_LJ_KERNEL_Y_POWER &&
        witness?.kernel_identity === H39_LJ_KERNEL_IDENTITY &&
        witness?.kernel_formula === H39_LJ_KERNEL_FORMULA &&
        witness?.kernel_majorant_relation ===
          H39_LJ_KERNEL_MAJORANT_RELATION &&
        witness?.lipschitz_reduction_relation ===
          H39_LJ_LIPSCHITZ_REDUCTION_RELATION &&
        witness?.outward_rounded_transcendentals === true &&
        witness?.includes_analytic_tail === true &&
        witness?.assumes_fixed_speed_window === false,
      "certified h39 K_epsilon majorant witness must certify only M_K with the kernel identity and provenance predicates",
      errors
    );
    assertField(
      artifact?.claim_boundary
        ?.certifies_directed_rounded_L_J_component_witness === false &&
        artifact?.result?.h39_L_J_component_witness === false &&
        artifact?.result?.h39_full_primitive_vector_certificate === false &&
        artifact?.result?.h39_continuous_tail_certificate === false,
      "certified h39 K_epsilon majorant witness must not claim L_J, full primitive-vector, or continuous-tail certification",
      errors
    );
  } else {
    assertField(
      witness === null,
      "open h39 K_epsilon majorant witness must not emit an M_K certificate",
      errors
    );
    assertField(
      artifact?.no_go_theorem?.promotion_obstruction !== null &&
        artifact?.no_go_theorem?.promotion_obstruction !== undefined,
      "open h39 K_epsilon majorant witness must record its first promotion obstruction",
      errors
    );
  }

  if (expected !== null) {
    assertField(
      JSON.stringify(artifact?.branch_witness_checks) ===
        JSON.stringify(expected.branch_witness_checks),
      "h39 K_epsilon branch witness checks must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.predicate_check) ===
        JSON.stringify(expected.predicate_check),
      "h39 K_epsilon predicate check must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.kernel_majorant_witness) ===
        JSON.stringify(expected.kernel_majorant_witness),
      "h39 K_epsilon kernel majorant witness must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.L_J_subset_replay) ===
        JSON.stringify(expected.L_J_subset_replay),
      "h39 K_epsilon embedded L_J subset replay must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.result) === JSON.stringify(expected.result),
      "h39 K_epsilon result must match a fresh rebuild",
      errors
    );
  }

  return errors;
}

export function validateH39R43SourceFamilyWitnessSubset(artifact) {
  const errors = [];
  let expected = null;

  try {
    expected = buildH39R43SourceFamilyWitnessSubset({
      r43AnalyticProfileWitness:
        artifact?.source_R43_analytic_profile_witness ?? null,
      sharedDomainSignature: artifact?.shared_domain_signature ?? null,
    });
  } catch (error) {
    errors.push(
      `h39 R43 source-family witness subset could not be rebuilt: ${error.message}`
    );
  }

  const forbiddenSpeedFields = findForbiddenSpeedFields(artifact);
  assertField(
    forbiddenSpeedFields.length === 0,
    `h39 R43 source-family witness subset must not contain speed-band fields: ${forbiddenSpeedFields.join(
      ", "
    )}`,
    errors
  );
  assertField(
    artifact?.schema === H39_R43_SOURCE_FAMILY_WITNESS_SUBSET_SCHEMA,
    "schema must match h39 R43 source-family witness subset schema",
    errors
  );
  assertField(
    artifact?.packet_id === R43_SOURCE_FAMILY_WITNESS_PACKET_ID,
    "packet id must match h39 R43 source-family witness subset packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.witness_subset_scope?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.claim_boundary?.assumes_fixed_speed_window === false,
    "h39 R43 source-family witness subset must not impose a fixed speed window",
    errors
  );

  const certified =
    artifact?.result?.h39_E_R_component_witness === true &&
    artifact?.result?.h39_M_R_component_witness === true;
  const expectedStatus = certified
    ? H39_R43_SOURCE_FAMILY_WITNESS_SUBSET_CERTIFIED_STATUS
    : H39_R43_SOURCE_FAMILY_WITNESS_SUBSET_OPEN_STATUS;
  assertField(
    artifact?.witness_subset_status === expectedStatus &&
      artifact?.provenance_status === expectedStatus,
    "h39 R43 source-family witness subset status must match its component-witness result",
    errors
  );
  const expectedClaim =
    h39R43SourceFamilyWitnessSubsetClaimBoundary(certified);
  assertField(
    JSON.stringify(artifact?.claim_boundary) ===
      JSON.stringify(expectedClaim),
    certified
      ? "h39 R43 source-family witness subset claim boundary must certify only E_R and M_R"
      : "h39 R43 source-family witness subset claim boundary must remain non-promoting",
    errors
  );

  const eWitness = artifact?.component_provenance?.E_R;
  const mWitness = artifact?.component_provenance?.M_R;
  assertField(
    JSON.stringify(eWitness) ===
      JSON.stringify(artifact?.component_witnesses?.E_R) &&
      JSON.stringify(mWitness) ===
        JSON.stringify(artifact?.component_witnesses?.M_R),
    "h39 R43 source-family component_provenance must mirror component_witnesses",
    errors
  );

  if (certified) {
    assertField(
      eWitness?.certifies_directed_rounded === true &&
        mWitness?.certifies_directed_rounded === true &&
        eWitness?.relation === "upper-bound" &&
        mWitness?.relation === "upper-bound" &&
        Number.isFinite(Number(eWitness?.value)) &&
        Number.isFinite(Number(mWitness?.value)) &&
        artifact?.result?.h39_full_primitive_vector_certificate === false &&
        artifact?.result?.h39_continuous_tail_certificate === false &&
        artifact?.result?.retained_branch === false,
      "certified h39 R43 source-family subset must certify only E_R and M_R and keep full h39 closure open",
      errors
    );
  } else {
    assertField(
      eWitness?.certifies_directed_rounded === false &&
        mWitness?.certifies_directed_rounded === false &&
        artifact?.no_go_theorem?.promotion_obstruction !== null &&
        artifact?.no_go_theorem?.promotion_obstruction !== undefined,
      "open h39 R43 source-family subset must remain an explicit failed witness predicate",
      errors
    );
  }

  if (expected !== null) {
    assertField(
      JSON.stringify(artifact?.predicate_check) ===
        JSON.stringify(expected.predicate_check),
      "h39 R43 source-family witness predicate check must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.component_witnesses) ===
        JSON.stringify(expected.component_witnesses),
      "h39 R43 source-family witness components must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.result) === JSON.stringify(expected.result),
      "h39 R43 source-family witness result must match a fresh rebuild",
      errors
    );
  }

  return errors;
}

export function validateH39NGNumeratorWitnessSubset(artifact) {
  const errors = [];
  let expected = null;

  try {
    expected = buildH39NGNumeratorWitnessSubset({
      nGOuterBoundMGWitness:
        artifact?.source_N_G_outer_bound_M_G_witness ?? null,
      sharedDomainSignature: artifact?.shared_domain_signature ?? null,
    });
  } catch (error) {
    errors.push(
      `h39 N_G numerator witness subset could not be rebuilt: ${error.message}`
    );
  }

  const forbiddenSpeedFields = findForbiddenSpeedFields(artifact);
  assertField(
    forbiddenSpeedFields.length === 0,
    `h39 N_G numerator witness subset must not contain speed-band fields: ${forbiddenSpeedFields.join(
      ", "
    )}`,
    errors
  );
  assertField(
    artifact?.schema === H39_NG_NUMERATOR_WITNESS_SUBSET_SCHEMA,
    "schema must match h39 N_G numerator witness subset schema",
    errors
  );
  assertField(
    artifact?.packet_id === NG_NUMERATOR_WITNESS_PACKET_ID,
    "packet id must match h39 N_G numerator witness subset packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.witness_subset_scope?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.claim_boundary?.assumes_fixed_speed_window === false,
    "h39 N_G numerator witness subset must not impose a fixed speed window",
    errors
  );

  const certifiesMGComponent =
    artifact?.result?.h39_M_G_component_witness === true;
  const expectedStatus = certifiesMGComponent
    ? H39_NG_NUMERATOR_WITNESS_SUBSET_CERTIFIED_STATUS
    : H39_NG_NUMERATOR_WITNESS_SUBSET_OPEN_STATUS;
  assertField(
    artifact?.witness_subset_status === expectedStatus &&
      artifact?.provenance_status === expectedStatus,
    "h39 N_G numerator witness subset status must match its component-witness result",
    errors
  );
  assertField(
    JSON.stringify(artifact?.claim_boundary) ===
      JSON.stringify(
        h39NGNumeratorWitnessSubsetClaimBoundary(certifiesMGComponent)
      ),
    certifiesMGComponent
      ? "h39 N_G numerator witness subset claim boundary must certify only the M_G component"
      : "h39 N_G numerator witness subset claim boundary must remain non-promoting",
    errors
  );

  const witness = artifact?.component_provenance?.M_G;
  assertField(
    JSON.stringify(witness) === JSON.stringify(artifact?.component_witness),
    "h39 N_G numerator component_provenance must mirror component_witness",
    errors
  );
  assertField(
    witness?.component === H39_NG_NUMERATOR_COMPONENT &&
      witness?.witness_family === H39_NG_NUMERATOR_WITNESS_FAMILY &&
      witness?.n_g_shift_power === H39_NG_SHIFT_POWER &&
      witness?.relation === "upper-bound",
    "h39 N_G numerator witness must preserve the M_G component identity and y^41 shift",
    errors
  );

  if (certifiesMGComponent) {
    assertField(
      witness?.certifies_directed_rounded === true &&
        witness?.directed_rounded === true &&
        witness?.certificate_status === "directed-rounded-certified" &&
        Number.isFinite(Number(witness?.value)) &&
        artifact?.result?.h39_full_primitive_vector_certificate === false &&
        artifact?.result?.h39_continuous_tail_certificate === false &&
        artifact?.result?.retained_branch === false,
      "certified h39 N_G numerator subset must certify only M_G and keep full h39 closure open",
      errors
    );
  } else {
    assertField(
      witness?.certifies_directed_rounded === false &&
        witness?.directed_rounded === false &&
        witness?.certificate_status === "witness-required" &&
        witness?.first_failed_promotion_predicate !== null,
      "open h39 N_G numerator subset must remain an explicit failed witness predicate",
      errors
    );
  }

  if (expected !== null) {
    assertField(
      JSON.stringify(artifact?.predicate_check) ===
        JSON.stringify(expected.predicate_check),
      "h39 N_G numerator witness predicate check must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.component_witness) ===
        JSON.stringify(expected.component_witness),
      "h39 N_G numerator witness component must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.result) === JSON.stringify(expected.result),
      "h39 N_G numerator witness result must match a fresh rebuild",
      errors
    );
  }

  return errors;
}

export function validateH39NGDenominatorCauchyMGWitness(artifact) {
  const errors = [];
  let expected = null;

  try {
    expected = buildH39NGDenominatorCauchyMGWitness({
      denominatorCauchyNGOuterBoundCandidate:
        artifact?.source_denominator_cauchy_N_G_outer_bound_candidate ??
        null,
      nGOuterBoundMGProfile:
        artifact?.source_N_G_outer_bound_M_G_profile ?? null,
      sharedDomainSignature: artifact?.shared_domain_signature ?? null,
    });
  } catch (error) {
    errors.push(
      `h39 N_G denominator-Cauchy M_G witness could not be rebuilt: ${error.message}`
    );
  }

  const forbiddenSpeedFields = findForbiddenSpeedFields(artifact);
  assertField(
    forbiddenSpeedFields.length === 0,
    `h39 N_G denominator-Cauchy M_G witness must not contain speed-band fields: ${forbiddenSpeedFields.join(
      ", "
    )}`,
    errors
  );
  assertField(
    artifact?.schema === H39_NG_DENOMINATOR_CAUCHY_MG_WITNESS_SCHEMA,
    "schema must match h39 N_G denominator-Cauchy M_G witness schema",
    errors
  );
  assertField(
    artifact?.packet_id === NG_DENOMINATOR_CAUCHY_MG_WITNESS_PACKET_ID,
    "packet id must match h39 N_G denominator-Cauchy M_G witness packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.witness_scope?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.claim_boundary?.assumes_fixed_speed_window === false,
    "h39 N_G denominator-Cauchy M_G witness must not impose a fixed speed window",
    errors
  );

  const certifiesMGComponent =
    artifact?.result?.h39_M_G_component_witness === true;
  const expectedStatus = certifiesMGComponent
    ? H39_NG_DENOMINATOR_CAUCHY_MG_WITNESS_CERTIFIED_STATUS
    : H39_NG_DENOMINATOR_CAUCHY_MG_WITNESS_OPEN_STATUS;
  assertField(
    artifact?.witness_status === expectedStatus &&
      artifact?.provenance_status === expectedStatus,
    "h39 N_G denominator-Cauchy M_G witness status must match its M_G result",
    errors
  );
  assertField(
    JSON.stringify(artifact?.claim_boundary) ===
      JSON.stringify(
        h39NGDenominatorCauchyMGWitnessClaimBoundary(
          certifiesMGComponent
        )
      ),
    certifiesMGComponent
      ? "h39 N_G denominator-Cauchy M_G witness claim boundary must certify only the M_G component"
      : "h39 N_G denominator-Cauchy M_G witness claim boundary must remain non-promoting",
    errors
  );
  assertField(
    artifact?.claim_boundary
      ?.certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound ===
      false &&
      artifact?.claim_boundary?.certifies_directed_rounded_h39_polydisc_Xi_bound ===
        false &&
      artifact?.claim_boundary?.certifies_directed_rounded_h39_jacobian_lower_bound ===
        false &&
      artifact?.claim_boundary?.certifies_directed_rounded_h39_jacobian_lipschitz_bound ===
        false &&
      artifact?.claim_boundary
        ?.certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound ===
        false &&
      artifact?.claim_boundary?.certifies_directed_rounded_fold_pair_scaled_remainder ===
        false &&
      artifact?.claim_boundary?.certifies_I1_regular_critical_exhaustion ===
        false &&
      artifact?.claim_boundary?.retained_branch === false &&
      artifact?.result?.h39_full_primitive_vector_certificate === false &&
      artifact?.result?.h39_continuous_tail_certificate === false &&
      artifact?.result?.retained_branch === false,
    "h39 N_G denominator-Cauchy M_G witness must not certify non-M_G components, full tail, scaled remainder, I1, or retained branch status",
    errors
  );

  const subsetErrors = validateH39NGNumeratorWitnessSubset(
    artifact?.N_G_numerator_subset_replay
  );
  assertField(
    subsetErrors.length === 0,
    `embedded N_G numerator subset replay must validate: ${subsetErrors.join(
      "; "
    )}`,
    errors
  );

  if (certifiesMGComponent) {
    assertField(
      artifact?.predicate_check
        ?.certifies_denominator_cauchy_M_G_witness === true &&
        artifact?.generated_N_G_outer_bound_M_G_witness
          ?.certifies_directed_rounded === true &&
        artifact?.generated_N_G_outer_bound_M_G_witness
          ?.includes_denominator_cauchy_tails === true &&
        artifact?.N_G_numerator_subset_replay?.result
          ?.h39_M_G_component_witness === true,
      "certified h39 N_G denominator-Cauchy M_G witness must close the generated N_G subset replay only for M_G",
      errors
    );
  } else {
    assertField(
      artifact?.no_go_theorem?.promotion_obstruction !== null &&
        artifact?.no_go_theorem?.promotion_obstruction !== undefined &&
        artifact?.result?.promotion_obstruction !== null &&
        artifact?.result?.promotion_obstruction !== undefined,
      "open h39 N_G denominator-Cauchy M_G witness must record a promotion obstruction",
      errors
    );
  }

  if (expected !== null) {
    assertField(
      JSON.stringify(artifact?.predicate_check) ===
        JSON.stringify(expected.predicate_check),
      "h39 N_G denominator-Cauchy M_G witness predicate check must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.generated_N_G_outer_bound_M_G_witness) ===
        JSON.stringify(expected.generated_N_G_outer_bound_M_G_witness),
      "h39 N_G denominator-Cauchy M_G generated witness must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.N_G_numerator_subset_replay) ===
        JSON.stringify(expected.N_G_numerator_subset_replay),
      "h39 N_G denominator-Cauchy M_G subset replay must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.result) === JSON.stringify(expected.result),
      "h39 N_G denominator-Cauchy M_G witness result must match a fresh rebuild",
      errors
    );
  }

  return errors;
}

export function validateH39JacobianFloorWitnessSubset(artifact) {
  const errors = [];
  let expected = null;

  try {
    expected = buildH39JacobianFloorWitnessSubset({
      jacobianFloorWitness: artifact?.source_jacobian_floor_witness ?? null,
      sharedDomainSignature: artifact?.shared_domain_signature ?? null,
    });
  } catch (error) {
    errors.push(
      `h39 Jacobian floor witness subset could not be rebuilt: ${error.message}`
    );
  }

  const forbiddenSpeedFields = findForbiddenSpeedFields(artifact);
  assertField(
    forbiddenSpeedFields.length === 0,
    `h39 Jacobian floor witness subset must not contain speed-band fields: ${forbiddenSpeedFields.join(
      ", "
    )}`,
    errors
  );
  assertField(
    artifact?.schema === H39_JACOBIAN_FLOOR_WITNESS_SUBSET_SCHEMA,
    "schema must match h39 Jacobian floor witness subset schema",
    errors
  );
  assertField(
    artifact?.packet_id === JACOBIAN_FLOOR_WITNESS_PACKET_ID,
    "packet id must match h39 Jacobian floor witness subset packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.witness_subset_scope?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.claim_boundary?.assumes_fixed_speed_window === false,
    "h39 Jacobian floor witness subset must not impose a fixed speed window",
    errors
  );

  const certifiesNuJComponent =
    artifact?.result?.h39_nu_J_component_witness === true;
  const expectedStatus = certifiesNuJComponent
    ? H39_JACOBIAN_FLOOR_WITNESS_SUBSET_CERTIFIED_STATUS
    : H39_JACOBIAN_FLOOR_WITNESS_SUBSET_OPEN_STATUS;
  assertField(
    artifact?.witness_subset_status === expectedStatus &&
      artifact?.provenance_status === expectedStatus,
    "h39 Jacobian floor witness subset status must match its component-witness result",
    errors
  );
  assertField(
    JSON.stringify(artifact?.claim_boundary) ===
      JSON.stringify(
        h39JacobianFloorWitnessSubsetClaimBoundary(certifiesNuJComponent)
      ),
    certifiesNuJComponent
      ? "h39 Jacobian floor witness subset claim boundary must certify only the nu_J component"
      : "h39 Jacobian floor witness subset claim boundary must remain non-promoting",
    errors
  );

  const witness = artifact?.component_provenance?.nu_J;
  assertField(
    JSON.stringify(witness) === JSON.stringify(artifact?.component_witness),
    "h39 Jacobian floor component_provenance must mirror component_witness",
    errors
  );
  assertField(
    witness?.component === H39_JACOBIAN_FLOOR_COMPONENT &&
      witness?.witness_family === H39_JACOBIAN_FLOOR_WITNESS_FAMILY &&
      witness?.relation === "lower-bound",
    "h39 Jacobian floor witness must preserve the nu_J component identity and lower-bound relation",
    errors
  );

  if (certifiesNuJComponent) {
    assertField(
      witness?.certifies_directed_rounded === true &&
        witness?.directed_rounded === true &&
        witness?.certificate_status === "directed-rounded-certified" &&
        Number.isFinite(Number(witness?.value)) &&
        Number(witness.value) > 0 &&
        artifact?.result?.h39_full_primitive_vector_certificate === false &&
        artifact?.result?.h39_continuous_tail_certificate === false &&
        artifact?.result?.retained_branch === false,
      "certified h39 Jacobian floor subset must certify only nu_J and keep full h39 closure open",
      errors
    );
  } else {
    assertField(
      witness?.certifies_directed_rounded === false &&
        witness?.directed_rounded === false &&
        witness?.certificate_status === "witness-required" &&
        witness?.first_failed_promotion_predicate !== null,
      "open h39 Jacobian floor subset must remain an explicit failed witness predicate",
      errors
    );
  }

  if (expected !== null) {
    assertField(
      JSON.stringify(artifact?.predicate_check) ===
        JSON.stringify(expected.predicate_check),
      "h39 Jacobian floor witness predicate check must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.component_witness) ===
        JSON.stringify(expected.component_witness),
      "h39 Jacobian floor witness component must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.result) === JSON.stringify(expected.result),
      "h39 Jacobian floor witness result must match a fresh rebuild",
      errors
    );
  }

  return errors;
}

export function validateH39CoordinateCauchyR43JacobianWitness(artifact) {
  const errors = [];
  let expected = null;

  try {
    expected = buildH39CoordinateCauchyR43JacobianWitness({
      coordinateCauchyOuterBoundsProfileCandidate:
        artifact?.source_coordinate_cauchy_outer_bounds_profile_candidate ??
        null,
      r43AnalyticProfileWitness:
        artifact?.source_R43_analytic_profile_candidate ?? null,
      jacobianFloorWitness:
        artifact?.source_jacobian_floor_profile_candidate ?? null,
      sharedDomainSignature: artifact?.shared_domain_signature ?? null,
    });
  } catch (error) {
    errors.push(
      `h39 coordinate-Cauchy R43/Jacobian witness could not be rebuilt: ${error.message}`
    );
  }

  const forbiddenSpeedFields = findForbiddenSpeedFields(artifact);
  assertField(
    forbiddenSpeedFields.length === 0,
    `h39 coordinate-Cauchy R43/Jacobian witness must not contain speed-band fields: ${forbiddenSpeedFields.join(
      ", "
    )}`,
    errors
  );
  assertField(
    artifact?.schema ===
      H39_COORDINATE_CAUCHY_R43_JACOBIAN_WITNESS_SCHEMA,
    "schema must match h39 coordinate-Cauchy R43/Jacobian witness schema",
    errors
  );
  assertField(
    artifact?.packet_id ===
      COORDINATE_CAUCHY_R43_JACOBIAN_WITNESS_PACKET_ID,
    "packet id must match h39 coordinate-Cauchy R43/Jacobian witness packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.witness_scope?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.claim_boundary?.assumes_fixed_speed_window === false,
    "h39 coordinate-Cauchy R43/Jacobian witness must not impose a fixed speed window",
    errors
  );

  const certifiesComponents =
    artifact?.result?.h39_E_R_component_witness === true &&
    artifact?.result?.h39_M_R_component_witness === true &&
    artifact?.result?.h39_nu_J_component_witness === true;
  const expectedStatus = certifiesComponents
    ? H39_COORDINATE_CAUCHY_R43_JACOBIAN_WITNESS_CERTIFIED_STATUS
    : H39_COORDINATE_CAUCHY_R43_JACOBIAN_WITNESS_OPEN_STATUS;
  assertField(
    artifact?.witness_status === expectedStatus &&
      artifact?.provenance_status === expectedStatus,
    "h39 coordinate-Cauchy R43/Jacobian witness status must match its component-witness result",
    errors
  );
  assertField(
    JSON.stringify(artifact?.claim_boundary) ===
      JSON.stringify(
        h39CoordinateCauchyR43JacobianWitnessClaimBoundary(
          certifiesComponents
        )
      ),
    certifiesComponents
      ? "h39 coordinate-Cauchy R43/Jacobian witness claim boundary must certify only E_R, M_R, and nu_J"
      : "h39 coordinate-Cauchy R43/Jacobian witness claim boundary must remain non-promoting",
    errors
  );
  assertField(
    artifact?.claim_boundary
      ?.certifies_directed_rounded_h39_polydisc_M_G_bound === false &&
      artifact?.claim_boundary?.certifies_directed_rounded_h39_polydisc_Xi_bound ===
        false &&
      artifact?.claim_boundary?.certifies_directed_rounded_h39_jacobian_lipschitz_bound ===
        false &&
      artifact?.claim_boundary
        ?.certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound ===
        false &&
      artifact?.claim_boundary?.certifies_directed_rounded_fold_pair_scaled_remainder ===
        false &&
      artifact?.claim_boundary?.certifies_I1_regular_critical_exhaustion ===
        false &&
      artifact?.claim_boundary?.retained_branch === false &&
      artifact?.result?.h39_full_primitive_vector_certificate === false &&
      artifact?.result?.h39_continuous_tail_certificate === false &&
      artifact?.result?.retained_branch === false,
    "h39 coordinate-Cauchy R43/Jacobian witness must not certify M_G, L_J, full tail, scaled remainder, I1, or retained branch status",
    errors
  );

  const r43SubsetErrors = validateH39R43SourceFamilyWitnessSubset(
    artifact?.R43_source_family_subset_replay
  );
  assertField(
    r43SubsetErrors.length === 0,
    `embedded R43 source-family subset replay must validate: ${r43SubsetErrors.join(
      "; "
    )}`,
    errors
  );
  const jacobianSubsetErrors = validateH39JacobianFloorWitnessSubset(
    artifact?.jacobian_floor_subset_replay
  );
  assertField(
    jacobianSubsetErrors.length === 0,
    `embedded Jacobian floor subset replay must validate: ${jacobianSubsetErrors.join(
      "; "
    )}`,
    errors
  );

  assertField(
    JSON.stringify(artifact?.component_provenance?.E_R) ===
      JSON.stringify(
        artifact?.R43_source_family_subset_replay?.component_provenance
          ?.E_R
      ) &&
      JSON.stringify(artifact?.component_provenance?.M_R) ===
        JSON.stringify(
          artifact?.R43_source_family_subset_replay
            ?.component_provenance?.M_R
        ) &&
      JSON.stringify(artifact?.component_provenance?.nu_J) ===
        JSON.stringify(
          artifact?.jacobian_floor_subset_replay?.component_provenance
            ?.nu_J
        ),
    "h39 coordinate-Cauchy component provenance must mirror embedded subset replays",
    errors
  );

  if (certifiesComponents) {
    assertField(
      artifact?.predicate_check
        ?.certifies_coordinate_cauchy_R43_jacobian_witness === true &&
        artifact?.generated_R43_analytic_profile_witness
          ?.certifies_directed_rounded === true &&
        artifact?.generated_jacobian_floor_witness
          ?.certifies_directed_rounded === true &&
        artifact?.R43_source_family_subset_replay?.result
          ?.h39_E_R_component_witness === true &&
        artifact?.R43_source_family_subset_replay?.result
          ?.h39_M_R_component_witness === true &&
        artifact?.jacobian_floor_subset_replay?.result
          ?.h39_nu_J_component_witness === true,
      "certified h39 coordinate-Cauchy witness must close only the R43 and Jacobian subset replays",
      errors
    );
  } else {
    assertField(
      artifact?.no_go_theorem?.promotion_obstruction !== null &&
        artifact?.no_go_theorem?.promotion_obstruction !== undefined &&
        artifact?.result?.promotion_obstruction !== null &&
        artifact?.result?.promotion_obstruction !== undefined,
      "open h39 coordinate-Cauchy witness must record a promotion obstruction",
      errors
    );
  }

  if (expected !== null) {
    assertField(
      JSON.stringify(artifact?.predicate_check) ===
        JSON.stringify(expected.predicate_check),
      "h39 coordinate-Cauchy witness predicate check must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.generated_R43_analytic_profile_witness) ===
        JSON.stringify(expected.generated_R43_analytic_profile_witness),
      "h39 coordinate-Cauchy generated R43 witness must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.generated_jacobian_floor_witness) ===
        JSON.stringify(expected.generated_jacobian_floor_witness),
      "h39 coordinate-Cauchy generated Jacobian witness must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.R43_source_family_subset_replay) ===
        JSON.stringify(expected.R43_source_family_subset_replay),
      "h39 coordinate-Cauchy R43 subset replay must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.jacobian_floor_subset_replay) ===
        JSON.stringify(expected.jacobian_floor_subset_replay),
      "h39 coordinate-Cauchy Jacobian subset replay must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.result) === JSON.stringify(expected.result),
      "h39 coordinate-Cauchy witness result must match a fresh rebuild",
      errors
    );
  }

  return errors;
}

export function validateH39GraphRadiiWitnessSubset(artifact) {
  const errors = [];
  let expected = null;

  try {
    expected = buildH39GraphRadiiWitnessSubset({
      graphRadiiWitness: artifact?.source_graph_radii_witness ?? null,
      sharedDomainSignature: artifact?.shared_domain_signature ?? null,
    });
  } catch (error) {
    errors.push(
      `h39 graph-radii witness subset could not be rebuilt: ${error.message}`
    );
  }

  const forbiddenSpeedFields = findForbiddenSpeedFields(artifact);
  assertField(
    forbiddenSpeedFields.length === 0,
    `h39 graph-radii witness subset must not contain speed-band fields: ${forbiddenSpeedFields.join(
      ", "
    )}`,
    errors
  );
  assertField(
    artifact?.schema === H39_GRAPH_RADII_WITNESS_SUBSET_SCHEMA,
    "schema must match h39 graph-radii witness subset schema",
    errors
  );
  assertField(
    artifact?.packet_id === GRAPH_RADII_WITNESS_PACKET_ID,
    "packet id must match h39 graph-radii witness subset packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.witness_subset_scope?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.claim_boundary?.assumes_fixed_speed_window === false,
    "h39 graph-radii witness subset must not impose a fixed speed window",
    errors
  );

  const certifiesGraphRadii =
    artifact?.result?.h39_rho_X_component_witness === true &&
    artifact?.result?.h39_r_X_component_witness === true;
  const expectedStatus = certifiesGraphRadii
    ? H39_GRAPH_RADII_WITNESS_SUBSET_CERTIFIED_STATUS
    : H39_GRAPH_RADII_WITNESS_SUBSET_OPEN_STATUS;
  assertField(
    artifact?.witness_subset_status === expectedStatus &&
      artifact?.provenance_status === expectedStatus,
    "h39 graph-radii witness subset status must match its component-witness result",
    errors
  );
  assertField(
    JSON.stringify(artifact?.claim_boundary) ===
      JSON.stringify(
        h39GraphRadiiWitnessSubsetClaimBoundary(certifiesGraphRadii)
      ),
    certifiesGraphRadii
      ? "h39 graph-radii witness subset claim boundary must certify only rho_X and r_X"
      : "h39 graph-radii witness subset claim boundary must remain non-promoting",
    errors
  );

  const rhoWitness = artifact?.component_provenance?.rho_X;
  const rWitness = artifact?.component_provenance?.r_X;
  assertField(
    JSON.stringify(rhoWitness) ===
      JSON.stringify(artifact?.component_witnesses?.rho_X) &&
      JSON.stringify(rWitness) ===
        JSON.stringify(artifact?.component_witnesses?.r_X),
    "h39 graph-radii component_provenance must mirror component_witnesses",
    errors
  );
  assertField(
    rhoWitness?.component === "rho_X" &&
      rhoWitness?.witness_family === H39_GRAPH_RADII_WITNESS_FAMILY &&
      rhoWitness?.relation === "declared-outer-radius" &&
      rWitness?.component === "r_X" &&
      rWitness?.witness_family === H39_GRAPH_RADII_WITNESS_FAMILY &&
      rWitness?.relation === "declared-inner-radius",
    "h39 graph-radii witnesses must preserve radius component identities",
    errors
  );

  if (certifiesGraphRadii) {
    assertField(
      rhoWitness?.certifies_directed_rounded === true &&
        rWitness?.certifies_directed_rounded === true &&
        rhoWitness?.certificate_status === "directed-rounded-certified" &&
        rWitness?.certificate_status === "directed-rounded-certified" &&
        Number.isFinite(Number(rhoWitness?.value)) &&
        Number.isFinite(Number(rWitness?.value)) &&
        Number(rWitness.value) > 0 &&
        Number(rWitness.value) < Number(rhoWitness.value) &&
        artifact?.result?.h39_full_primitive_vector_certificate === false &&
        artifact?.result?.h39_continuous_tail_certificate === false &&
        artifact?.result?.retained_branch === false,
      "certified h39 graph-radii subset must certify only rho_X and r_X and keep full h39 closure open",
      errors
    );
  } else {
    assertField(
      rhoWitness?.certifies_directed_rounded === false &&
        rWitness?.certifies_directed_rounded === false &&
        rhoWitness?.certificate_status === "witness-required" &&
        rWitness?.certificate_status === "witness-required" &&
        artifact?.no_go_theorem?.promotion_obstruction !== null,
      "open h39 graph-radii subset must remain an explicit failed witness predicate",
      errors
    );
  }

  if (expected !== null) {
    assertField(
      JSON.stringify(artifact?.predicate_check) ===
        JSON.stringify(expected.predicate_check),
      "h39 graph-radii witness predicate check must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.component_witnesses) ===
        JSON.stringify(expected.component_witnesses),
      "h39 graph-radii witness components must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.result) === JSON.stringify(expected.result),
      "h39 graph-radii witness result must match a fresh rebuild",
      errors
    );
  }

  return errors;
}

export function validateH39LJKernelWitnessSubset(artifact) {
  const errors = [];
  let expected = null;

  try {
    expected = buildH39LJKernelWitnessSubset({
      kernelMajorantArtifact:
        artifact?.source_kernel_majorant_artifact ?? null,
      kernelMajorantWitness: artifact?.kernel_majorant_witness ?? null,
      sharedDomainSignature: artifact?.shared_domain_signature ?? null,
    });
  } catch (error) {
    errors.push(
      `h39 L_J kernel witness subset could not be rebuilt: ${error.message}`
    );
  }

  const forbiddenSpeedFields = findForbiddenSpeedFields(artifact);
  assertField(
    forbiddenSpeedFields.length === 0,
    `h39 L_J kernel witness subset must not contain speed-band fields: ${forbiddenSpeedFields.join(
      ", "
    )}`,
    errors
  );
  assertField(
    artifact?.schema === H39_LJ_KERNEL_WITNESS_SUBSET_SCHEMA,
    "schema must match h39 L_J kernel witness subset schema",
    errors
  );
  assertField(
    artifact?.packet_id === LJ_KERNEL_WITNESS_PACKET_ID,
    "packet id must match h39 L_J kernel witness subset packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.witness_subset_scope?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.claim_boundary?.assumes_fixed_speed_window === false,
    "h39 L_J kernel witness subset must not impose a fixed speed window",
    errors
  );

  const certifiesLJComponent =
    artifact?.result?.h39_L_J_component_witness === true;
  const expectedStatus = certifiesLJComponent
    ? H39_LJ_KERNEL_WITNESS_SUBSET_CERTIFIED_STATUS
    : H39_LJ_KERNEL_WITNESS_SUBSET_OPEN_STATUS;
  assertField(
    artifact?.provenance_status === expectedStatus &&
      artifact?.witness_subset_status === expectedStatus,
    "h39 L_J kernel witness subset status must match its component-witness result",
    errors
  );
  assertField(
    JSON.stringify(artifact?.claim_boundary) ===
      JSON.stringify(
        h39LJKernelWitnessSubsetClaimBoundary(certifiesLJComponent)
      ),
    certifiesLJComponent
      ? "h39 L_J kernel witness subset claim boundary must certify only the L_J component"
      : "h39 L_J kernel witness subset claim boundary must remain non-promoting",
    errors
  );

  const witness = artifact?.component_provenance?.L_J;
  assertField(
    JSON.stringify(witness) === JSON.stringify(artifact?.component_witness),
    "h39 L_J kernel witness component_provenance must mirror component_witness",
    errors
  );
  assertField(
    witness?.component === H39_LJ_KERNEL_COMPONENT &&
      witness?.witness_family === H39_LJ_KERNEL_WITNESS_FAMILY &&
      witness?.kernel_y_power === H39_LJ_KERNEL_Y_POWER &&
      witness?.kernel_identity === H39_LJ_KERNEL_IDENTITY &&
      witness?.kernel_majorant_relation ===
        H39_LJ_KERNEL_MAJORANT_RELATION &&
      witness?.lipschitz_reduction_relation ===
        H39_LJ_LIPSCHITZ_REDUCTION_RELATION,
    "h39 L_J kernel witness must preserve the kernel identity and reduction relations",
    errors
  );
  if (certifiesLJComponent) {
    assertField(
      witness?.certifies_directed_rounded === true &&
        witness?.directed_rounded === true &&
        witness?.certificate_status === "directed-rounded-certified" &&
        Number.isFinite(Number(witness?.value)) &&
        Number(witness.value) >=
          Number(witness.kernel_majorant_M_K) *
            Number(witness.rho) ** H39_LJ_KERNEL_Y_POWER &&
        artifact?.claim_boundary
          ?.certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound ===
          false &&
        artifact?.result?.h39_full_primitive_vector_certificate === false,
      "certified h39 L_J kernel subset must certify only the L_J component and keep full h39 closure open",
      errors
    );
  } else {
    assertField(
      witness?.certifies_directed_rounded === false &&
        witness?.directed_rounded === false &&
        witness?.certificate_status === "witness-required" &&
        witness?.first_failed_promotion_predicate !== null,
      "open h39 L_J kernel subset must remain an explicit failed witness predicate",
      errors
    );
  }

  if (expected !== null) {
    assertField(
      JSON.stringify(artifact?.predicate_check) ===
        JSON.stringify(expected.predicate_check),
      "h39 L_J kernel witness predicate check must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.component_witness) ===
        JSON.stringify(expected.component_witness),
      "h39 L_J kernel witness component must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.result) === JSON.stringify(expected.result),
      "h39 L_J kernel witness result must match a fresh rebuild",
      errors
    );
  }

  return errors;
}

export function validateH39ComponentSubsetComposition(artifact) {
  const errors = [];
  let expected = null;

  try {
    expected = buildH39ComponentSubsetComposition({
      primitiveVectorBackendArtifact:
        artifact?.source_primitive_vector_backend_artifact ?? null,
      r43SourceFamilyWitnessSubset:
        artifact?.source_R43_source_family_witness_subset ?? null,
      nGNumeratorWitnessSubset:
        artifact?.source_N_G_numerator_witness_subset ?? null,
      jacobianFloorWitnessSubset:
        artifact?.source_jacobian_floor_witness_subset ?? null,
      lJKernelWitnessSubset:
        artifact?.source_L_J_kernel_witness_subset ?? null,
      graphRadiiWitnessSubset:
        artifact?.source_graph_radii_witness_subset ?? null,
      sharedDomainSignature: artifact?.shared_domain_signature ?? null,
    });
  } catch (error) {
    errors.push(
      `h39 component subset composition could not be rebuilt: ${error.message}`
    );
  }

  const forbiddenSpeedFields = findForbiddenSpeedFields(artifact);
  assertField(
    forbiddenSpeedFields.length === 0,
    `h39 component subset composition must not contain speed-band fields: ${forbiddenSpeedFields.join(
      ", "
    )}`,
    errors
  );
  assertField(
    artifact?.schema === H39_COMPONENT_SUBSET_COMPOSITION_SCHEMA,
    "schema must match h39 component subset composition schema",
    errors
  );
  assertField(
    artifact?.packet_id === COMPONENT_SUBSET_COMPOSITION_PACKET_ID,
    "packet id must match h39 component subset composition packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.composition_scope?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.claim_boundary?.assumes_fixed_speed_window === false,
    "h39 component subset composition must not impose a fixed speed window",
    errors
  );

  const certifiesH39Tail =
    artifact?.result?.h39_continuous_tail_certificate === true;
  const expectedStatus = certifiesH39Tail
    ? H39_COMPONENT_SUBSET_COMPOSITION_CERTIFIED_STATUS
    : H39_COMPONENT_SUBSET_COMPOSITION_OPEN_STATUS;
  assertField(
    artifact?.composition_status === expectedStatus &&
      artifact?.provenance_status === expectedStatus,
    "h39 component subset composition status must match its h39 tail result",
    errors
  );
  assertField(
    JSON.stringify(artifact?.claim_boundary) ===
      JSON.stringify(
        h39ComponentSubsetCompositionClaimBoundary(certifiesH39Tail)
      ),
    certifiesH39Tail
      ? "h39 component subset composition claim boundary must certify only the h39 primitive continuous-tail row"
      : "h39 component subset composition claim boundary must remain non-promoting",
    errors
  );
  assertField(
    artifact?.claim_boundary
      ?.certifies_directed_rounded_fold_pair_scaled_remainder === false &&
      artifact?.claim_boundary?.certifies_I1_regular_critical_exhaustion ===
        false &&
      artifact?.claim_boundary?.retained_branch === false &&
      artifact?.result?.h39_full_primitive_vector_certificate === false &&
      artifact?.result?.retained_branch === false,
    "h39 component subset composition must not certify the full primitive vector, scaled remainder, I1, or retained branch status",
    errors
  );

  const certificateErrors =
    validateH39SharedDomainPrimitiveProvenanceCertificate(
      artifact?.primitive_provenance_certificate_replay
    );
  assertField(
    certificateErrors.length === 0,
    `embedded primitive provenance certificate replay must validate: ${certificateErrors.join(
      "; "
    )}`,
    errors
  );

  const report = artifact?.component_provenance_report ?? {};
  assertField(
    report?.claim_boundary?.assumes_fixed_speed_window === false &&
      report?.claim_boundary?.retained_branch === false,
    "h39 component subset provenance report must preserve no-speed-window and non-retention boundaries",
    errors
  );
  if (certifiesH39Tail) {
    assertField(
      report?.provenance_status ===
        DIRECTED_ROUNDED_SAME_DOMAIN_PROVENANCE_STATUS &&
        artifact?.predicate_check?.certifies_component_subset_composition ===
          true &&
        artifact?.primitive_provenance_certificate_replay?.result
          ?.h39_continuous_tail_certificate === true &&
        artifact?.certified_seven_input_primitive_witness?.result
          ?.h39_seven_input_primitive_witness === true,
      "certified h39 component subset composition must emit a certified primitive provenance report, a seven-input primitive witness, and replay a closed h39 tail certificate",
      errors
    );
  } else {
    assertField(
      artifact?.no_go_theorem?.promotion_obstruction !== null &&
        artifact?.no_go_theorem?.promotion_obstruction !== undefined &&
        artifact?.result?.promotion_obstruction !== null &&
        artifact?.result?.promotion_obstruction !== undefined,
      "open h39 component subset composition must record a promotion obstruction",
      errors
    );
  }

  if (expected !== null) {
    assertField(
      JSON.stringify(artifact?.predicate_check) ===
        JSON.stringify(expected.predicate_check),
      "h39 component subset composition predicate check must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.component_provenance_report) ===
        JSON.stringify(expected.component_provenance_report),
      "h39 component subset composition provenance report must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.primitive_provenance_certificate_replay) ===
        JSON.stringify(expected.primitive_provenance_certificate_replay),
      "h39 component subset composition certificate replay must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.certified_seven_input_primitive_witness) ===
        JSON.stringify(expected.certified_seven_input_primitive_witness),
      "h39 component subset composition seven-input primitive witness must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.result) === JSON.stringify(expected.result),
      "h39 component subset composition result must match a fresh rebuild",
      errors
    );
  }

  return errors;
}

export function validateH39UpstreamSourceComposition(artifact) {
  const errors = [];
  let expected = null;

  try {
    expected = buildH39UpstreamSourceComposition({
      sharedDomainEvaluatorArtifact:
        artifact?.source_shared_domain_evaluator_artifact ?? null,
      primitiveVectorBackendArtifact:
        artifact?.source_primitive_vector_backend_artifact ?? null,
      denominatorCauchyNGOuterBoundCandidate:
        artifact?.source_denominator_cauchy_N_G_outer_bound_candidate ??
        null,
      nGOuterBoundMGProfile:
        artifact?.source_N_G_outer_bound_M_G_profile ?? null,
      coordinateCauchyOuterBoundsProfileCandidate:
        artifact?.source_coordinate_cauchy_outer_bounds_profile_candidate ??
        null,
      r43AnalyticProfileWitness:
        artifact?.source_R43_analytic_profile_candidate ?? null,
      jacobianFloorWitness:
        artifact?.source_jacobian_floor_profile_candidate ?? null,
      kernelMajorantArtifact:
        artifact?.source_kernel_majorant_artifact ?? null,
      kernelMajorantWitness:
        artifact?.source_kernel_majorant_witness ?? null,
      kEpsilonBranchCoordinateWitnessSet:
        artifact?.source_K_epsilon_branch_coordinate_witness_set ?? null,
      branchCoordinateWitnesses:
        artifact?.source_K_epsilon_branch_coordinate_witnesses ?? [],
      graphRadiiWitness: artifact?.source_graph_radii_witness ?? null,
      sharedDomainSignature: artifact?.shared_domain_signature ?? null,
    });
  } catch (error) {
    errors.push(
      `h39 upstream source composition could not be rebuilt: ${error.message}`
    );
  }

  const forbiddenSpeedFields = findForbiddenSpeedFields(artifact);
  assertField(
    forbiddenSpeedFields.length === 0,
    `h39 upstream source composition must not contain speed-band fields: ${forbiddenSpeedFields.join(
      ", "
    )}`,
    errors
  );
  assertField(
    artifact?.schema === H39_UPSTREAM_SOURCE_COMPOSITION_SCHEMA,
    "schema must match h39 upstream source composition schema",
    errors
  );
  assertField(
    artifact?.packet_id === UPSTREAM_SOURCE_COMPOSITION_PACKET_ID,
    "packet id must match h39 upstream source composition packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.composition_scope?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.claim_boundary?.assumes_fixed_speed_window === false,
    "h39 upstream source composition must not impose a fixed speed window",
    errors
  );

  const certifiesH39Tail =
    artifact?.result?.h39_continuous_tail_certificate === true;
  const consumesKepsilonBranchWitnesses =
    artifact?.source_kernel_majorant_witness === null &&
    (artifact?.source_K_epsilon_branch_coordinate_witnesses?.length > 0 ||
      artifact?.source_K_epsilon_branch_coordinate_witness_set
        ?.branch_coordinate_witnesses?.length > 0);
  const expectedStatus = certifiesH39Tail
    ? H39_UPSTREAM_SOURCE_COMPOSITION_CERTIFIED_STATUS
    : H39_UPSTREAM_SOURCE_COMPOSITION_OPEN_STATUS;
  assertField(
    artifact?.composition_status === expectedStatus &&
      artifact?.provenance_status === expectedStatus,
    "h39 upstream source composition status must match its h39 tail result",
    errors
  );
  assertField(
    JSON.stringify(artifact?.claim_boundary) ===
      JSON.stringify(
        h39UpstreamSourceCompositionClaimBoundary(certifiesH39Tail, {
          consumesKepsilonBranchWitnesses,
          consumesSharedDomainEvaluatorArtifact:
            artifact?.source_shared_domain_evaluator_artifact !== null &&
            artifact?.source_shared_domain_evaluator_artifact !== undefined,
        })
      ),
    certifiesH39Tail
      ? "h39 upstream source composition claim boundary must certify only the embedded h39 primitive continuous-tail row"
      : "h39 upstream source composition claim boundary must remain non-promoting",
    errors
  );
  assertField(
    artifact?.claim_boundary
      ?.certifies_directed_rounded_fold_pair_scaled_remainder === false &&
      artifact?.claim_boundary?.certifies_I1_regular_critical_exhaustion ===
        false &&
      artifact?.claim_boundary?.retained_branch === false &&
      artifact?.result?.h39_full_primitive_vector_certificate === false &&
      artifact?.result?.retained_branch === false,
    "h39 upstream source composition must not certify the full primitive vector, scaled remainder, I1, or retained branch status",
    errors
  );

  const componentCompositionErrors = validateH39ComponentSubsetComposition(
    artifact?.component_subset_composition_replay
  );
  assertField(
    componentCompositionErrors.length === 0,
    `embedded component-subset composition replay must validate: ${componentCompositionErrors.join(
      "; "
    )}`,
    errors
  );
  const primitiveCertificateErrors =
    validateH39SharedDomainPrimitiveProvenanceCertificate(
      artifact?.primitive_provenance_certificate_replay
    );
  assertField(
    primitiveCertificateErrors.length === 0,
    `embedded primitive provenance certificate replay must validate: ${primitiveCertificateErrors.join(
      "; "
    )}`,
    errors
  );
  assertField(
    JSON.stringify(
      artifact?.extracted_component_subsets?.R43_source_family
    ) ===
      JSON.stringify(
        artifact?.coordinate_cauchy_R43_jacobian_witness_replay
          ?.R43_source_family_subset_replay
      ) &&
      JSON.stringify(
        artifact?.extracted_component_subsets?.jacobian_floor
      ) ===
        JSON.stringify(
          artifact?.coordinate_cauchy_R43_jacobian_witness_replay
            ?.jacobian_floor_subset_replay
        ) &&
      JSON.stringify(
        artifact?.extracted_component_subsets?.N_G_numerator
      ) ===
        JSON.stringify(
          artifact?.N_G_denominator_cauchy_M_G_witness_replay
            ?.N_G_numerator_subset_replay
        ),
    "h39 upstream source composition must extract component subsets from upstream witnesses",
    errors
  );

  if (certifiesH39Tail) {
    assertField(
      artifact?.predicate_check?.certifies_upstream_source_composition ===
        true &&
        artifact?.component_subset_composition_replay?.result
          ?.h39_continuous_tail_certificate === true &&
        artifact?.primitive_provenance_certificate_replay?.result
          ?.h39_continuous_tail_certificate === true &&
        artifact?.certified_seven_input_primitive_witness?.result
          ?.h39_seven_input_primitive_witness === true,
      "certified h39 upstream source composition must close the embedded component-subset and primitive provenance replays and emit the seven-input primitive witness",
      errors
    );
  } else {
    assertField(
      artifact?.no_go_theorem?.promotion_obstruction !== null &&
        artifact?.no_go_theorem?.promotion_obstruction !== undefined &&
        artifact?.result?.promotion_obstruction !== null &&
        artifact?.result?.promotion_obstruction !== undefined,
      "open h39 upstream source composition must record a promotion obstruction",
      errors
    );
  }

  if (expected !== null) {
    assertField(
      JSON.stringify(artifact?.predicate_check) ===
        JSON.stringify(expected.predicate_check),
      "h39 upstream source composition predicate check must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.extracted_component_subsets) ===
        JSON.stringify(expected.extracted_component_subsets),
      "h39 upstream source composition extracted subsets must match a fresh rebuild",
    errors
  );
    assertField(
      JSON.stringify(artifact?.K_epsilon_majorant_witness_replay) ===
        JSON.stringify(expected.K_epsilon_majorant_witness_replay),
      "h39 upstream source composition K_epsilon replay must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(
        artifact?.coordinate_cauchy_R43_jacobian_witness_replay
      ) ===
        JSON.stringify(
          expected.coordinate_cauchy_R43_jacobian_witness_replay
        ),
      "h39 upstream source composition coordinate replay must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(
        artifact?.N_G_denominator_cauchy_M_G_witness_replay
      ) ===
        JSON.stringify(expected.N_G_denominator_cauchy_M_G_witness_replay),
      "h39 upstream source composition denominator replay must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.L_J_kernel_witness_subset_replay) ===
        JSON.stringify(expected.L_J_kernel_witness_subset_replay),
      "h39 upstream source composition L_J replay must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.graph_radii_witness_subset_replay) ===
        JSON.stringify(expected.graph_radii_witness_subset_replay),
      "h39 upstream source composition graph replay must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.component_subset_composition_replay) ===
        JSON.stringify(expected.component_subset_composition_replay),
      "h39 upstream source composition component replay must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.primitive_provenance_certificate_replay) ===
        JSON.stringify(expected.primitive_provenance_certificate_replay),
      "h39 upstream source composition primitive certificate replay must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.certified_seven_input_primitive_witness) ===
        JSON.stringify(expected.certified_seven_input_primitive_witness),
      "h39 upstream source composition seven-input primitive witness must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.result) === JSON.stringify(expected.result),
      "h39 upstream source composition result must match a fresh rebuild",
      errors
    );
  }

  return errors;
}

export function validateH39SharedDomainPrimitiveProvenanceCertificate(
  artifact
) {
  const errors = [];
  let expected = null;

  try {
    expected = buildH39SharedDomainPrimitiveProvenanceCertificate({
      primitiveVectorBackendArtifact:
        artifact?.source_primitive_vector_backend_artifact ?? null,
      directedRoundedProvenanceReport:
        artifact?.directed_rounded_provenance_report ?? null,
    });
  } catch (error) {
    errors.push(
      `h39 primitive provenance certificate could not be rebuilt: ${error.message}`
    );
  }

  const forbiddenSpeedFields = findForbiddenSpeedFields(artifact);
  assertField(
    forbiddenSpeedFields.length === 0,
    `h39 primitive provenance certificate must not contain speed-band fields: ${forbiddenSpeedFields.join(
      ", "
    )}`,
    errors
  );
  assertField(
    artifact?.schema ===
      H39_SHARED_DOMAIN_PRIMITIVE_PROVENANCE_CERTIFICATE_SCHEMA,
    "schema must match h39 primitive provenance certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PROVENANCE_PACKET_ID,
    "packet id must match h39 primitive provenance certificate packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.certificate_scope?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.claim_boundary?.assumes_fixed_speed_window === false,
    "h39 primitive provenance certificate must not impose a fixed speed window",
    errors
  );

  const diagnosticErrors = validateH39SharedDomainPrimitiveDiagnostic(
    artifact?.primitive_vector_diagnostic_replay
  );
  assertField(
    diagnosticErrors.length === 0,
    `embedded primitive-vector diagnostic replay must validate: ${diagnosticErrors.join(
      "; "
    )}`,
    errors
  );

  const claim = artifact?.claim_boundary ?? {};
  const certifiesH39Tail =
    artifact?.result?.h39_continuous_tail_certificate === true;
  const expectedClaim =
    h39PrimitiveProvenanceClaimBoundary(certifiesH39Tail);
  assertField(
    JSON.stringify(claim) === JSON.stringify(expectedClaim),
    certifiesH39Tail
      ? "claim boundary must certify only h39 primitive shared-domain continuous-tail fields and keep downstream closure false"
      : "claim boundary must remain non-promoting when provenance or reducer closure is missing",
    errors
  );
  assertField(
    artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false &&
      claim.certifies_directed_rounded_fold_pair_scaled_remainder === false &&
      claim.certifies_I1_regular_critical_exhaustion === false &&
      claim.retained_branch === false,
    "h39 primitive provenance certificate must not certify scaled remainder, I1, or retained branch status",
    errors
  );

  if (expected !== null) {
    assertField(
      JSON.stringify(artifact?.directed_rounded_provenance_check) ===
        JSON.stringify(expected.directed_rounded_provenance_check),
      "directed-rounded provenance check must match a fresh same-domain provenance replay",
      errors
    );
    assertField(
      JSON.stringify(artifact?.result) === JSON.stringify(expected.result),
      "h39 primitive provenance certificate result must match a fresh rebuild",
      errors
    );
    assertField(
      JSON.stringify(artifact?.primitive_vector_diagnostic_replay) ===
        JSON.stringify(expected.primitive_vector_diagnostic_replay),
      "primitive-vector diagnostic replay must match a fresh rebuild",
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
    if (arg === "--out") {
      options.out = argv[++index];
    } else if (arg === "--validate") {
      options.validate = argv[++index];
    } else if (arg === "--pretty") {
      options.pretty = true;
    } else if (arg === "--schema") {
      options.schema = true;
    } else if (arg === "--radius-multiple") {
      options.radiusMultiple = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--radius-multiple-upper-bound") {
      options.radiusMultipleUpperBound = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--center-residual-bound") {
      options.centerResidualBound = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--center-jacobian-lower-bound") {
      options.centerJacobianLowerBound = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--jacobian-lipschitz-bound") {
      options.jacobianLipschitzBound = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--rho-x") {
      options.rhoX = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--r-x") {
      options.rX = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--rho-x-upper-bound") {
      options.rhoXUpperBound = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--m-g-bound") {
      options.mGBound = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--root-tangent-numerator-bound") {
      options.rootTangentNumeratorBound = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--primitive-bounds-source") {
      options.primitiveBoundsSource = argv[++index];
    } else if (arg === "--primitive-bounds-status") {
      options.primitiveBoundsStatus = argv[++index];
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return options;
}

function usage() {
  return [
    "Usage: node scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.mjs [options]",
    "",
    "Options:",
    "  --out <path>                       Write artifact JSON",
    "  --validate <path>                  Validate an artifact JSON",
    "  --pretty                           Pretty-print JSON output",
    "  --schema                           Print artifact schema metadata",
    "  --primitive-bounds-source <label>  Describe external primitive-bound source",
    "  --primitive-bounds-status <label>  provided-unverified | directed-rounded-external-unverified-by-this-artifact",
    "  --radius-multiple <n>              Set rho=nY for reducer replay",
    "  --radius-multiple-upper-bound <n>  Set a finite y-radius cap for reducer replay",
    "  --center-residual-bound <n>        Set E_R",
    "  --center-jacobian-lower-bound <n>  Set nu_J",
    "  --jacobian-lipschitz-bound <n>     Set L_J",
    "  --rho-x <n>                        Set rho_X; requires --r-x for final replay",
    "  --r-x <n>                          Set graph radius r_X",
    "  --rho-x-upper-bound <n>            Set rho_X upper bound for optimizer replay",
    "  --m-g-bound <n>                    Set M_G",
    "  --root-tangent-numerator-bound <n> Set M_R",
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
        artifact_schema: H39_SHARED_DOMAIN_PRIMITIVE_DIAGNOSTIC_SCHEMA,
        packet_id: PACKET_ID,
        promotion_status: PROMOTION_STATUS,
        consumes_reducer_schema: H39_REDUCER_SCHEMA,
      },
      null,
      options.pretty
    );
    return;
  }

  if (options.validate) {
    const artifact = JSON.parse(fs.readFileSync(options.validate, "utf8"));
    const errors = validateH39SharedDomainPrimitiveDiagnostic(artifact);
    writeJson(
      {
        valid: errors.length === 0,
        errors,
        diagnostic_decision:
          artifact?.shared_domain_diagnostic_summary?.diagnostic_decision ??
          null,
        retained_branch: artifact?.result?.retained_branch ?? null,
      },
      null,
      options.pretty
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  try {
    const artifact = buildH39SharedDomainPrimitiveDiagnostic(options);
    const errors = validateH39SharedDomainPrimitiveDiagnostic(artifact);
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

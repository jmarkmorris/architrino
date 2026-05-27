import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget as buildH39Reducer,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-root-tangent-cauchy-majorant-tail-budget.mjs";
import {
  buildH39EvaluatorGraphRadiiWitness,
  buildH39SharedDomainCoefficientArtifact,
  buildCoordinateCauchyEnvelopeCertificate,
  computeCauchyCoefficientPrefixMajorant,
  computeH39JacobianAnalyticRemainderProfileCandidate,
  computeH39NGOuterBoundCandidateMG,
  computeH39R43AnalyticRemainderProfileCandidate,
  computeSinhTaylorMajorant,
  evaluateH39SharedDomainCoefficientCell,
  makeTheta3minusFirstYGdSeriesContext,
} from "../scripts/neutral-swarm/theta3minus-fold-pair-first-y-gd-shared-domain-evaluator.mjs";

import {
  H39_CANDIDATE_ONLY_PRIMITIVE_PROVENANCE_STATUS,
  H39_CANDIDATE_PRIMITIVE_PROVENANCE_REPORT_SCHEMA,
  H39_COMPONENT_SUBSET_COMPOSITION_CERTIFIED_STATUS,
  H39_COMPONENT_SUBSET_COMPOSITION_OPEN_STATUS,
  H39_COMPONENT_SUBSET_COMPOSITION_SCHEMA,
  H39_COORDINATE_CAUCHY_R43_JACOBIAN_WITNESS_CERTIFIED_STATUS,
  H39_COORDINATE_CAUCHY_R43_JACOBIAN_WITNESS_OPEN_STATUS,
  H39_COORDINATE_CAUCHY_R43_JACOBIAN_WITNESS_SCHEMA,
  H39_GRAPH_RADII_WITNESS_SUBSET_CERTIFIED_STATUS,
  H39_GRAPH_RADII_WITNESS_SUBSET_OPEN_STATUS,
  H39_GRAPH_RADII_WITNESS_SUBSET_SCHEMA,
  H39_JACOBIAN_FLOOR_WITNESS_SUBSET_CERTIFIED_STATUS,
  H39_JACOBIAN_FLOOR_WITNESS_SUBSET_OPEN_STATUS,
  H39_JACOBIAN_FLOOR_WITNESS_SUBSET_SCHEMA,
  H39_KEPSILON_MAJORANT_WITNESS_CERTIFIED_STATUS,
  H39_KEPSILON_MAJORANT_WITNESS_OPEN_STATUS,
  H39_KEPSILON_MAJORANT_WITNESS_SCHEMA,
  H39_LJ_KERNEL_WITNESS_SUBSET_CERTIFIED_STATUS,
  H39_LJ_KERNEL_WITNESS_SUBSET_OPEN_STATUS,
  H39_LJ_KERNEL_WITNESS_SUBSET_SCHEMA,
  H39_NG_DENOMINATOR_CAUCHY_MG_WITNESS_CERTIFIED_STATUS,
  H39_NG_DENOMINATOR_CAUCHY_MG_WITNESS_OPEN_STATUS,
  H39_NG_DENOMINATOR_CAUCHY_MG_WITNESS_SCHEMA,
  H39_NG_NUMERATOR_WITNESS_SUBSET_CERTIFIED_STATUS,
  H39_NG_NUMERATOR_WITNESS_SUBSET_OPEN_STATUS,
  H39_NG_NUMERATOR_WITNESS_SUBSET_SCHEMA,
  H39_PRIMITIVE_PROVENANCE_WITNESS_SET_SCHEMA,
  H39_PRIMITIVE_PROVENANCE_WITNESS_SET_STATUS,
  H39_R43_SOURCE_FAMILY_WITNESS_SUBSET_CERTIFIED_STATUS,
  H39_R43_SOURCE_FAMILY_WITNESS_SUBSET_OPEN_STATUS,
  H39_R43_SOURCE_FAMILY_WITNESS_SUBSET_SCHEMA,
  H39_SHARED_DOMAIN_PRIMITIVE_DIAGNOSTIC_SCHEMA,
  H39_SHARED_DOMAIN_PRIMITIVE_PROVENANCE_CERTIFICATE_SCHEMA,
  H39_UPSTREAM_SOURCE_COMPOSITION_CERTIFIED_STATUS,
  H39_UPSTREAM_SOURCE_COMPOSITION_OPEN_STATUS,
  H39_UPSTREAM_SOURCE_COMPOSITION_SCHEMA,
  buildH39CandidatePrimitiveProvenanceReportFromPrimitiveVectorBackendArtifact,
  buildH39ComponentSubsetComposition,
  buildH39CoordinateCauchyR43JacobianWitness,
  buildH39GraphRadiiWitnessSubset,
  buildH39JacobianFloorWitnessSubset,
  buildH39KepsilonMajorantWitness,
  buildH39LJKernelWitnessSubset,
  buildH39NGDenominatorCauchyMGWitness,
  buildH39NGNumeratorWitnessSubset,
  buildH39PrimitiveProvenanceWitnessSetFromPrimitiveVectorBackendArtifact,
  buildH39R43SourceFamilyWitnessSubset,
  buildH39SharedDomainPrimitiveDiagnostic,
  buildH39SharedDomainPrimitiveDiagnosticFromPrimitiveVectorBackendArtifact,
  buildH39SharedDomainPrimitiveProvenanceCertificate,
  buildH39UpstreamSourceComposition,
  validateH39CandidatePrimitiveProvenanceReport,
  validateH39ComponentSubsetComposition,
  validateH39CoordinateCauchyR43JacobianWitness,
  validateH39GraphRadiiWitnessSubset,
  validateH39JacobianFloorWitnessSubset,
  validateH39KepsilonMajorantWitness,
  validateH39LJKernelWitnessSubset,
  validateH39NGDenominatorCauchyMGWitness,
  validateH39NGNumeratorWitnessSubset,
  validateH39PrimitiveProvenanceWitnessSet,
  validateH39R43SourceFamilyWitnessSubset,
  validateH39SharedDomainPrimitiveDiagnostic,
  validateH39SharedDomainPrimitiveProvenanceCertificate,
  validateH39UpstreamSourceComposition,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.mjs";

const CLOSING_PRIMITIVE_BOUNDS = {
  centerResidualBound: 0.1,
  centerJacobianLowerBound: 5,
  jacobianLipschitzBound: 0.1,
  rhoX: 3,
  rX: 2,
  mGBound: 1e12,
  rootTangentNumeratorBound: 9.4,
};

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.mjs"
  );
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function primitiveVectorBackendArtifact({
  bounds = CLOSING_PRIMITIVE_BOUNDS,
  primitiveBoundsStatus = "provided-unverified",
  inputReady = true,
  missingCandidateComponents = [],
  invalidCandidateComponents = [],
} = {}) {
  return {
    schema:
      "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-primitive-vector-backend-artifact/v1",
    packet_id:
      "theta3minus_fold_pair_first_y_gd_h39_primitive_vector_backend_artifact",
    profile_vector_backend_status:
      "h39-full-cauchy-primitive-vector-candidate-closes",
    profile_vector_status:
      "h39-full-cauchy-primitive-profile-vector-candidate-closes",
    primitive_diagnostic_input_ready: inputReady,
    missing_candidate_components: missingCandidateComponents,
    invalid_candidate_components: invalidCandidateComponents,
    backend_scope: {
      candidate_only: true,
      primitive_bounds_status: primitiveBoundsStatus,
    },
    primitive_diagnostic_input: inputReady
      ? {
          center_residual_bound_E_R: bounds.centerResidualBound,
          center_jacobian_lower_bound_nu_J:
            bounds.centerJacobianLowerBound,
          jacobian_lipschitz_bound_L_J: bounds.jacobianLipschitzBound,
          rho_X: bounds.rhoX,
          r_X: bounds.rX,
          candidate_M_G_bound: bounds.mGBound,
          candidate_root_tangent_numerator_bound_M_R:
            bounds.rootTangentNumeratorBound,
          primitive_bounds_source:
            "h39-full-cauchy-primitive-vector-candidate",
          primitive_bounds_status: primitiveBoundsStatus,
        }
      : null,
    claim_boundary: {
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
  };
}

function h39PrimitiveDomainSignature() {
  return {
    branch_pair: "theta3minus-fold-pair-3minus",
    imported_row: "h38-successor-row",
    center_graph: "X_c(nu)-h39-center-coefficient-row",
    y_domain: { radius_symbol: "rho", radius_multiple: "sY" },
    x_domain: { outer_radius: "rho_X", inner_radius: "r_X" },
    speed_ratio_enclosure: "certified-positive-speed-ratio-zero-enclosure",
    analytic_tail_model: "shared-graph-centered-cauchy-tail",
  };
}

function h39KernelMajorantArtifact() {
  return {
    schema: "neutral-swarm-theta3minus-fold-pair-first-y-gd-shared-domain-evaluator/v1",
    status: "h39-kernel-continuous-elementary-majorant-emitted",
    evaluation_level: "elementary-continuous-majorant",
    rho: 0.1,
    R43_second_x_kernel_continuous_majorant: 12.5,
    R43_jacobian_lipschitz_reduced_continuous_majorant:
      12.5 * 0.1 ** 41,
    candidate_M_K_continuous_majorant: 12.5,
    candidate_L_J_reduced_continuous_majorant: 12.5 * 0.1 ** 41,
    candidate_L_J_reduced_continuous_majorant_source:
      "kernel-continuous-majorant",
    certifies_h39_primitive_closure: false,
    certifies_directed_rounded_shared_domain: false,
  };
}

function h39DirectedRoundedKernelMajorantWitness({
  domainSignature = h39PrimitiveDomainSignature(),
} = {}) {
  return {
    component: "M_K",
    relation: "kernel-majorant-upper-bound",
    value: 12.5,
    rho: 0.1,
    domain_signature: domainSignature,
    certifies_directed_rounded: true,
    directed_rounded: true,
    certificate_status: "directed-rounded-certified",
    kernel_y_power: 41,
    kernel_identity: "partial_X^2 R43 = y^41 K_epsilon",
    kernel_majorant_relation: "M_K >= max_epsilon sup_S |K_epsilon|",
    lipschitz_reduction_relation: "L_J >= rho^41 * M_K",
    outward_rounded_transcendentals: true,
    includes_analytic_tail: true,
    assumes_fixed_speed_window: false,
  };
}

function h39R43AnalyticProfileWitness({
  domainSignature = h39PrimitiveDomainSignature(),
  directedRounded = false,
} = {}) {
  const witness = computeH39R43AnalyticRemainderProfileCandidate({
    coefficients: [
      [0.01, 0.01],
      [0.1, 0.1],
    ],
    outerBound: 0,
    outerRadius: 1,
    targetRadius: 0.001,
  });
  return {
    ...witness,
    domain_signature: domainSignature,
    certifies_directed_rounded: directedRounded,
    directed_rounded: directedRounded,
    certifies_directed_rounded_shared_domain: directedRounded,
    certificate_status: directedRounded
      ? "directed-rounded-certified"
      : "witness-required",
    includes_analytic_tail: true,
    assumes_fixed_speed_window: false,
  };
}

function h39NGNumeratorMGWitness({
  domainSignature = h39PrimitiveDomainSignature(),
  directedRounded = false,
  nGOuterBound = 0,
  nGOuterRadius = 1,
  rho = 0.1,
} = {}) {
  const witness = computeH39NGOuterBoundCandidateMG({
    nGShiftedCoefficients: [[1e-13, 1e-13]],
    nGOuterBound,
    nGOuterRadius,
    rho,
  });
  return {
    ...witness,
    domain_signature: domainSignature,
    certifies_directed_rounded: directedRounded,
    directed_rounded: directedRounded,
    certifies_directed_rounded_shared_domain: directedRounded,
    certificate_status: directedRounded
      ? "directed-rounded-certified"
      : "witness-required",
    includes_analytic_tail: true,
    assumes_fixed_speed_window: false,
  };
}

function h39DenominatorCauchyNGSource({
  domainSignature = h39PrimitiveDomainSignature(),
  directedRounded = false,
  branches = ["-", "+"],
} = {}) {
  const branchRows = branches.map((branch, index) => ({
    status:
      "h39-branch-g-denominator-cauchy-ingredient-candidate-emitted",
    branch,
    candidate_denominator_clearance_status:
      "candidate-denominator-clearance-positive",
    speed_lower_bound: 2 + index,
    delta_clearance_prefix_plus_tail_floor: 4 + index,
    jacobian_abs_prefix_plus_tail_floor: 5 + index,
    branch_g_outer_majorant: index === 0 ? 0.075 : 0.125,
  }));
  const branchMajorants = branchRows.map(
    (row) => row.branch_g_outer_majorant
  );
  const lMajorant = 2;
  const lowerPolynomialMajorant = 3;
  const outerRadius = 1;
  const pairMajorant = branchMajorants.reduce(
    (sum, value) => sum + value,
    0
  );
  const nGOuterBound =
    pairMajorant + lMajorant + outerRadius ** 2 * lowerPolynomialMajorant;
  return {
    status: "h39-denominator-cauchy-n-g-outer-bound-candidate-emitted",
    rho: 0.1,
    n_g_cauchy_outer_radius: outerRadius,
    candidate_N_G_outer_bound: nGOuterBound,
    n_g_cauchy_outer_bound: nGOuterBound,
    branch_g_outer_majorants: branchMajorants,
    branch_denominator_candidates: branchRows,
    l_majorant: lMajorant,
    lower_polynomial_majorant: lowerPolynomialMajorant,
    n_g_outer_bound_diagnostic: {
      status: "h39-n-g-denominator-clearance-outer-majorant-emitted",
      pair_g_outer_majorant: pairMajorant,
      n_g_outer_bound: nGOuterBound,
    },
    domain_signature: domainSignature,
    certifies_directed_rounded: directedRounded,
    directed_rounded: directedRounded,
    certifies_directed_rounded_shared_domain: directedRounded,
    certifies_directed_rounded_denominator_cauchy_N_G_outer_bound:
      directedRounded,
    certificate_status: directedRounded
      ? "directed-rounded-certified"
      : "witness-required",
    includes_denominator_cauchy_tails: true,
    includes_analytic_tail: true,
    assumes_fixed_speed_window: false,
  };
}

function h39JacobianFloorWitness({
  domainSignature = h39PrimitiveDomainSignature(),
  directedRounded = false,
} = {}) {
  const witness = computeH39JacobianAnalyticRemainderProfileCandidate({
    coefficients: [[6, 6]],
    outerBound: 0,
    outerRadius: 1,
    targetRadius: 0.1,
  });
  return {
    ...witness,
    domain_signature: domainSignature,
    certifies_directed_rounded: directedRounded,
    directed_rounded: directedRounded,
    certifies_directed_rounded_shared_domain: directedRounded,
    certificate_status: directedRounded
      ? "directed-rounded-certified"
      : "witness-required",
    includes_analytic_tail: true,
    assumes_fixed_speed_window: false,
  };
}

function h39CoordinateCauchyProfileSource({
  domainSignature = h39PrimitiveDomainSignature(),
  directedRounded = false,
  r43Profile = h39R43AnalyticProfileWitness({ domainSignature }),
  jacobianProfile = h39JacobianFloorWitness({ domainSignature }),
  branches = ["-", "+"],
} = {}) {
  const r43OuterBound = r43Profile.outer_bound;
  const r43OuterRadius = r43Profile.outer_radius;
  const jacobianOuterBound = jacobianProfile.outer_bound;
  const jacobianOuterRadius = jacobianProfile.outer_radius;
  const jacobianNumeratorOuterRadius = jacobianOuterRadius + 1;
  const sourceResidualOuterBoundCandidates = branches.map((branch) => ({
    status:
      "h39-source-residual-coordinate-cauchy-outer-bound-candidate-emitted",
    branch,
    r43_cauchy_outer_bound: r43OuterBound,
    candidate_R43_source_outer_bound: r43OuterBound,
    r43_cauchy_outer_radius: r43OuterRadius,
  }));
  const jacobianOuterBoundCandidates = branches.map((branch) => ({
    status:
      "h39-jacobian-coordinate-cauchy-outer-bound-candidate-emitted",
    branch,
    jacobian_cauchy_outer_bound: jacobianOuterBound,
    candidate_R43_jacobian_outer_bound: jacobianOuterBound,
    jacobian_cauchy_outer_radius: jacobianOuterRadius,
    jacobian_numerator_cauchy_outer_radius:
      jacobianNumeratorOuterRadius,
  }));

  return {
    schema:
      "neutral-swarm-theta3minus-fold-pair-first-y-gd-shared-domain-evaluator/v1",
    status:
      "h39-coordinate-cauchy-outer-bounds-profile-candidate-emitted",
    evaluation_level: "candidate-coordinate-seminorm-cauchy-outer-bound",
    r43_cauchy_outer_radius: r43OuterRadius,
    candidate_R43_source_outer_bound: r43OuterBound,
    r43_cauchy_outer_bound: r43OuterBound,
    jacobian_numerator_cauchy_outer_radius:
      jacobianNumeratorOuterRadius,
    jacobian_cauchy_outer_radius: jacobianOuterRadius,
    candidate_R43_jacobian_outer_bound: jacobianOuterBound,
    jacobian_cauchy_outer_bound: jacobianOuterBound,
    source_residual_outer_bound_candidates:
      sourceResidualOuterBoundCandidates,
    jacobian_outer_bound_candidates: jacobianOuterBoundCandidates,
    domain_signature: domainSignature,
    certifies_directed_rounded: directedRounded,
    directed_rounded: directedRounded,
    certifies_directed_rounded_shared_domain: directedRounded,
    certifies_directed_rounded_coordinate_cauchy_outer_bounds:
      directedRounded,
    certificate_status: directedRounded
      ? "directed-rounded-certified"
      : "witness-required",
    includes_coordinate_cauchy_tails: true,
    includes_analytic_tail: true,
    assumes_fixed_speed_window: false,
    retained_branch: false,
  };
}

function h39GraphRadiiWitness({
  domainSignature = h39PrimitiveDomainSignature(),
  directedRounded = false,
} = {}) {
  return {
    component_family: "graph_radii",
    rho_X: CLOSING_PRIMITIVE_BOUNDS.rhoX,
    r_X: CLOSING_PRIMITIVE_BOUNDS.rX,
    domain_signature: domainSignature,
    certifies_directed_rounded: directedRounded,
    directed_rounded: directedRounded,
    certifies_directed_rounded_shared_domain: directedRounded,
    certificate_status: directedRounded
      ? "directed-rounded-certified"
      : "witness-required",
    assumes_fixed_speed_window: false,
  };
}

function h39CertifiedComponentSubsets({
  domainSignature = h39PrimitiveDomainSignature(),
} = {}) {
  return {
    r43Subset: buildH39R43SourceFamilyWitnessSubset({
      r43AnalyticProfileWitness: h39R43AnalyticProfileWitness({
        domainSignature,
        directedRounded: true,
      }),
      sharedDomainSignature: domainSignature,
    }),
    nGSubset: buildH39NGNumeratorWitnessSubset({
      nGOuterBoundMGWitness: h39NGNumeratorMGWitness({
        domainSignature,
        directedRounded: true,
      }),
      sharedDomainSignature: domainSignature,
    }),
    jacobianSubset: buildH39JacobianFloorWitnessSubset({
      jacobianFloorWitness: h39JacobianFloorWitness({
        domainSignature,
        directedRounded: true,
      }),
      sharedDomainSignature: domainSignature,
    }),
    lJSubset: buildH39LJKernelWitnessSubset({
      kernelMajorantArtifact: h39KernelMajorantArtifact(),
      kernelMajorantWitness: h39DirectedRoundedKernelMajorantWitness({
        domainSignature,
      }),
      sharedDomainSignature: domainSignature,
    }),
    graphSubset: buildH39GraphRadiiWitnessSubset({
      graphRadiiWitness: h39GraphRadiiWitness({
        domainSignature,
        directedRounded: true,
      }),
      sharedDomainSignature: domainSignature,
    }),
  };
}

function h39CertifiedUpstreamSources({
  domainSignature = h39PrimitiveDomainSignature(),
  coordinateDirectedRounded = true,
  denominatorDirectedRounded = true,
} = {}) {
  const r43Profile = h39R43AnalyticProfileWitness({ domainSignature });
  const jacobianProfile = h39JacobianFloorWitness({ domainSignature });
  const coordinateSource = h39CoordinateCauchyProfileSource({
    domainSignature,
    directedRounded: coordinateDirectedRounded,
    r43Profile,
    jacobianProfile,
  });
  const denominatorSource = h39DenominatorCauchyNGSource({
    domainSignature,
    directedRounded: denominatorDirectedRounded,
  });
  const nGProfile = h39NGNumeratorMGWitness({
    domainSignature,
    nGOuterBound: denominatorSource.n_g_cauchy_outer_bound,
    nGOuterRadius: denominatorSource.n_g_cauchy_outer_radius,
    rho: denominatorSource.rho,
  });
  const kernelMajorantArtifact = h39KernelMajorantArtifact();
  const kernelMajorantWitness = h39DirectedRoundedKernelMajorantWitness({
    domainSignature,
  });
  const graphRadiiWitness = h39GraphRadiiWitness({
    domainSignature,
    directedRounded: true,
  });

  return {
    coordinateSource,
    r43Profile,
    jacobianProfile,
    denominatorSource,
    nGProfile,
    kernelMajorantArtifact,
    kernelMajorantWitness,
    graphRadiiWitness,
  };
}

const H39_EVALUATOR_CELL = {
  speed_interval: [3.02156, 3.02157],
  delta_fold_interval: [0.72, 0.72],
  phi_fold_interval: [0.41, 0.41],
  beta_interval: [0.18, 0.18],
  gamma_interval: [0.025, 0.025],
  L_interval: [0, 0],
};

function h39EvaluatorHIntervals({ scale = 1 } = {}) {
  return Array.from({ length: 39 }, (_, index) => [
    (index + 1) * 1e-6 * scale,
    (index + 1) * 1e-6 * scale,
  ]);
}

function h39EvaluatorH38BranchRow(branch, { hScale = 1 } = {}) {
  const row = { branch };
  h39EvaluatorHIntervals({ scale: hScale }).forEach((interval, index) => {
    row[`h${index}_interval`] = interval;
  });
  row.h38_solve_slope_interval =
    branch === "-"
      ? [0.15 * hScale, 0.152 * hScale]
      : [-0.152 * hScale, -0.15 * hScale];
  return row;
}

function h39EvaluatorH38Row({
  cellId = "speed.test.first-y",
  hScale = 1,
} = {}) {
  return {
    cell_id: cellId,
    speed_interval: H39_EVALUATOR_CELL.speed_interval,
    first_y_cell: [0, 0.115 / 64],
    delta_fold_interval: H39_EVALUATOR_CELL.delta_fold_interval,
    phi_fold_interval: H39_EVALUATOR_CELL.phi_fold_interval,
    beta_interval: H39_EVALUATOR_CELL.beta_interval,
    gamma_interval: H39_EVALUATOR_CELL.gamma_interval,
    L_interval: H39_EVALUATOR_CELL.L_interval,
    row_status: "fixture-h38-row",
    branch_rows: [
      h39EvaluatorH38BranchRow("-", { hScale }),
      h39EvaluatorH38BranchRow("+", { hScale }),
    ],
  };
}

function h39SharedDomainEvaluatorArtifact({
  coordinateCauchyOuterRadius = 0.01,
  coordinateJacobianNumeratorOuterRadius =
    coordinateCauchyOuterRadius * 2,
  coordinateJacobianOuterRadius = coordinateCauchyOuterRadius,
  denominatorCauchyOuterRadius = 0.01,
  sharedDomainSignature = null,
  rhoX = null,
  rX = null,
} = {}) {
  return evaluateH39SharedDomainCoefficientCell({
    context: makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 }),
    cell: H39_EVALUATOR_CELL,
    branchInputs: [
      { branch: "-", hIntervals: h39EvaluatorHIntervals() },
      { branch: "+", hIntervals: h39EvaluatorHIntervals() },
    ],
    shiftedOrder: 1,
    rho: 0.001,
    sharedDomainSignature,
    coordinateCauchyOuterRadius,
    coordinateJacobianNumeratorOuterRadius,
    coordinateJacobianOuterRadius,
    coordinateXOuterRadius: 1e-6,
    denominatorCauchyOuterRadius,
    denominatorDeltaCauchyOuterBound: 100,
    denominatorPhiCauchyOuterBound: 100,
    denominatorJacobianAbsCauchyOuterBound: 100,
    denominatorLMajorant: 2,
    denominatorLowerPolynomialMajorant: 3,
    rhoX,
    rX,
  });
}

function h39SharedDomainCoefficientArtifact({
  coordinateCauchyOuterRadius = 0.01,
  coordinateJacobianNumeratorOuterRadius =
    coordinateCauchyOuterRadius * 2,
  coordinateJacobianOuterRadius = coordinateCauchyOuterRadius,
  denominatorCauchyOuterRadius = 0.01,
  sharedDomainSignature = null,
  rhoX = null,
  rX = null,
  includeRows = true,
  h38Rows = [h39EvaluatorH38Row()],
} = {}) {
  return buildH39SharedDomainCoefficientArtifact({
    h38Rows,
    validateH38: false,
    shiftedOrder: 1,
    rho: 0.001,
    sharedDomainSignature,
    includeRows,
    coordinateCauchyOuterRadius,
    coordinateJacobianNumeratorOuterRadius,
    coordinateJacobianOuterRadius,
    coordinateXOuterRadius: 1e-6,
    denominatorCauchyOuterRadius,
    denominatorDeltaCauchyOuterBound: 100,
    denominatorPhiCauchyOuterBound: 100,
    denominatorJacobianAbsCauchyOuterBound: 100,
    denominatorLMajorant: 2,
    denominatorLowerPolynomialMajorant: 3,
    rhoX,
    rX,
  });
}

function certifyEvaluatorSourceHandoffs(
  evaluatorArtifact,
  domainSignature
) {
  const artifact = clone(evaluatorArtifact);
  const coordinateSource =
    artifact.coordinate_cauchy_outer_bounds_profile_candidate;
  Object.assign(coordinateSource, {
    domain_signature: domainSignature,
    certifies_directed_rounded: true,
    directed_rounded: true,
    certifies_directed_rounded_shared_domain: true,
    certifies_directed_rounded_coordinate_cauchy_outer_bounds: true,
    certificate_status: "directed-rounded-certified",
    includes_coordinate_cauchy_tails: true,
    includes_analytic_tail: true,
    assumes_fixed_speed_window: false,
  });

  const denominatorSource =
    artifact.denominator_cauchy_n_g_outer_bound_candidate;
  Object.assign(denominatorSource, {
    domain_signature: domainSignature,
    certifies_directed_rounded: true,
    directed_rounded: true,
    certifies_directed_rounded_shared_domain: true,
    certifies_directed_rounded_denominator_cauchy_N_G_outer_bound: true,
    certificate_status: "directed-rounded-certified",
    includes_denominator_cauchy_tails: true,
    includes_analytic_tail: true,
    assumes_fixed_speed_window: false,
  });

  return artifact;
}

function kernelWitnessForEvaluatorSummary(summary, domainSignature) {
  const lJ = summary.candidate_L_J_reduced_continuous_majorant;
  const rho = 0.001;
  return {
    component: "M_K",
    relation: "kernel-majorant-upper-bound",
    value: (0.5 * lJ) / rho ** 41,
    rho,
    domain_signature: domainSignature,
    certifies_directed_rounded: true,
    directed_rounded: true,
    certificate_status: "directed-rounded-certified",
    kernel_y_power: 41,
    kernel_identity: "partial_X^2 R43 = y^41 K_epsilon",
    kernel_majorant_relation: "M_K >= max_epsilon sup_S |K_epsilon|",
    lipschitz_reduction_relation: "L_J >= rho^41 * M_K",
    outward_rounded_transcendentals: true,
    includes_analytic_tail: true,
    assumes_fixed_speed_window: false,
  };
}

function h39KepsilonBranchCoordinateWitnesses({
  domainSignature = h39PrimitiveDomainSignature(),
} = {}) {
  const coordinateEnvelope = ({ coordinate, value }) =>
    buildCoordinateCauchyEnvelopeCertificate({
      coordinate,
      diagnostic: computeCauchyCoefficientPrefixMajorant({
        coefficients: [[value, value]],
        outerBound: 0,
        outerRadius: 1,
        targetRadius: 0.1,
      }),
      domainSignature,
      suppliedCoordinateMajorant: value,
    });
  const minusDeltaCoordinate = coordinateEnvelope({
    coordinate: "delta_epsilon",
    value: 0.2,
  });
  const minusPhiCoordinate = coordinateEnvelope({
    coordinate: "phi_epsilon",
    value: 0.3,
  });
  const plusDeltaCoordinate = coordinateEnvelope({
    coordinate: "delta_epsilon",
    value: 0.25,
  });
  const plusPhiCoordinate = coordinateEnvelope({
    coordinate: "phi_epsilon",
    value: 0.35,
  });
  const minusDeltaSinh = computeSinhTaylorMajorant({ argument: 0.2 });
  const minusPhiSinh = computeSinhTaylorMajorant({ argument: 0.3 });
  const plusDeltaSinh = computeSinhTaylorMajorant({ argument: 0.25 });
  const plusPhiSinh = computeSinhTaylorMajorant({ argument: 0.35 });
  const common = {
    domain_signature: domainSignature,
    certifies_directed_rounded: true,
    directed_rounded: true,
    certificate_status: "directed-rounded-certified",
    coordinate_bounds_same_domain: true,
    outward_rounded_transcendentals: true,
    includes_analytic_tail: true,
    assumes_fixed_speed_window: false,
  };
  return [
    {
      ...common,
      branch: "-",
      nu_lower_bound: 1,
      delta_abs_bound_D: 0.2,
      phi_abs_bound_Phi: 0.3,
      speed_term_upper: 2.000000000000001,
      delta_coordinate_cauchy_envelope: minusDeltaCoordinate,
      phi_coordinate_cauchy_envelope: minusPhiCoordinate,
      delta_coordinate_bound_source:
        "coordinate-cauchy-prefix-geometric-tail-upper-envelope",
      phi_coordinate_bound_source:
        "coordinate-cauchy-prefix-geometric-tail-upper-envelope",
      sinh_delta_upper: minusDeltaSinh.sinh_upper_majorant,
      sinh_phi_upper: minusPhiSinh.sinh_upper_majorant,
      sinh_delta_taylor_majorant: minusDeltaSinh,
      sinh_phi_taylor_majorant: minusPhiSinh,
      sinh_delta_upper_source:
        "sinh-positive-taylor-geometric-tail-upper-envelope",
      sinh_phi_upper_source:
        "sinh-positive-taylor-geometric-tail-upper-envelope",
    },
    {
      ...common,
      branch: "+",
      nu_lower_bound: 1,
      delta_abs_bound_D: 0.25,
      phi_abs_bound_Phi: 0.35,
      speed_term_upper: 2.000000000000001,
      delta_coordinate_cauchy_envelope: plusDeltaCoordinate,
      phi_coordinate_cauchy_envelope: plusPhiCoordinate,
      delta_coordinate_bound_source:
        "coordinate-cauchy-prefix-geometric-tail-upper-envelope",
      phi_coordinate_bound_source:
        "coordinate-cauchy-prefix-geometric-tail-upper-envelope",
      sinh_delta_upper: plusDeltaSinh.sinh_upper_majorant,
      sinh_phi_upper: plusPhiSinh.sinh_upper_majorant,
      sinh_delta_taylor_majorant: plusDeltaSinh,
      sinh_phi_taylor_majorant: plusPhiSinh,
      sinh_delta_upper_source:
        "sinh-positive-taylor-geometric-tail-upper-envelope",
      sinh_phi_upper_source:
        "sinh-positive-taylor-geometric-tail-upper-envelope",
    },
  ];
}

function directedRoundedProvenanceReport({
  primitiveVector = primitiveVectorBackendArtifact(),
  domainSignature = h39PrimitiveDomainSignature(),
} = {}) {
  const input = primitiveVector.primitive_diagnostic_input;
  return {
    packet_id: "h39_directed_rounded_primitive_provenance_report",
    provenance_status:
      "directed-rounded-same-domain-primitive-provenance-certified",
    provenance_source:
      "synthetic-directed-rounded-same-domain-test-report",
    shared_domain_signature: domainSignature,
    component_provenance: {
      E_R: {
        component: "E_R",
        relation: "upper-bound",
        value: input.center_residual_bound_E_R,
        certifies_directed_rounded: true,
        domain_signature: domainSignature,
      },
      M_R: {
        component: "M_R",
        relation: "upper-bound",
        value: input.candidate_root_tangent_numerator_bound_M_R,
        certifies_directed_rounded: true,
        domain_signature: domainSignature,
      },
      M_G: {
        component: "M_G",
        relation: "upper-bound",
        value: input.candidate_M_G_bound,
        certifies_directed_rounded: true,
        domain_signature: domainSignature,
      },
      nu_J: {
        component: "nu_J",
        relation: "lower-bound",
        value: input.center_jacobian_lower_bound_nu_J,
        certifies_directed_rounded: true,
        domain_signature: domainSignature,
      },
      L_J: {
        component: "L_J",
        relation: "lipschitz-upper-bound",
        value: input.jacobian_lipschitz_bound_L_J,
        certifies_directed_rounded: true,
        domain_signature: domainSignature,
      },
      rho_X: {
        component: "rho_X",
        relation: "declared-outer-radius",
        value: input.rho_X,
        certifies_directed_rounded: true,
        domain_signature: domainSignature,
      },
      r_X: {
        component: "r_X",
        relation: "declared-inner-radius",
        value: input.r_X,
        certifies_directed_rounded: true,
        domain_signature: domainSignature,
      },
    },
  };
}

test("h39 R43 source-family witness subset records current analytic profile as open", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const artifact = buildH39R43SourceFamilyWitnessSubset({
    r43AnalyticProfileWitness: h39R43AnalyticProfileWitness({
      domainSignature,
    }),
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39R43SourceFamilyWitnessSubset(artifact), []);
  assert.equal(
    artifact.schema,
    H39_R43_SOURCE_FAMILY_WITNESS_SUBSET_SCHEMA
  );
  assert.equal(
    artifact.witness_subset_status,
    H39_R43_SOURCE_FAMILY_WITNESS_SUBSET_OPEN_STATUS
  );
  assert.equal(
    artifact.predicate_check.failed_predicates.includes(
      "directed_rounded_same_domain_witness"
    ),
    true
  );
  assert.equal(
    artifact.component_provenance.E_R.certifies_directed_rounded,
    false
  );
  assert.equal(artifact.result.h39_E_R_component_witness, false);
  assert.equal(artifact.result.h39_M_R_component_witness, false);
});

test("h39 R43 source-family witness subset certifies E_R and M_R from directed-rounded profile", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const witness = h39R43AnalyticProfileWitness({
    domainSignature,
    directedRounded: true,
  });
  const artifact = buildH39R43SourceFamilyWitnessSubset({
    r43AnalyticProfileWitness: witness,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39R43SourceFamilyWitnessSubset(artifact), []);
  assert.equal(
    artifact.witness_subset_status,
    H39_R43_SOURCE_FAMILY_WITNESS_SUBSET_CERTIFIED_STATUS
  );
  assert.equal(
    artifact.component_provenance.E_R.value,
    witness.candidate_E_R_prefix_plus_tail_bound
  );
  assert.equal(
    artifact.component_provenance.M_R.value,
    witness.candidate_M_R_prefix_plus_tail_bound
  );
  assert.equal(
    artifact.claim_boundary
      .certifies_directed_rounded_h39_center_residual_E_R_bound,
    true
  );
  assert.equal(
    artifact.claim_boundary
      .certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound,
    true
  );
  assert.equal(artifact.result.h39_full_primitive_vector_certificate, false);
  assert.equal(artifact.result.retained_branch, false);
});

test("h39 R43 source-family witness subset feeds relation-aware primitive provenance", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const domainSignature = h39PrimitiveDomainSignature();
  const report = directedRoundedProvenanceReport({
    primitiveVector,
    domainSignature,
  });
  const sourceSubset = buildH39R43SourceFamilyWitnessSubset({
    r43AnalyticProfileWitness: h39R43AnalyticProfileWitness({
      domainSignature,
      directedRounded: true,
    }),
    sharedDomainSignature: domainSignature,
  });
  report.component_provenance.E_R =
    sourceSubset.component_provenance.E_R;
  report.component_provenance.M_R =
    sourceSubset.component_provenance.M_R;

  const packet = buildH39SharedDomainPrimitiveProvenanceCertificate({
    primitiveVectorBackendArtifact: primitiveVector,
    directedRoundedProvenanceReport: report,
  });

  assert.deepEqual(validateH39R43SourceFamilyWitnessSubset(sourceSubset), []);
  assert.equal(
    report.component_provenance.E_R.value <
      primitiveVector.primitive_diagnostic_input.center_residual_bound_E_R,
    true
  );
  assert.equal(
    report.component_provenance.M_R.value <
      primitiveVector.primitive_diagnostic_input
        .candidate_root_tangent_numerator_bound_M_R,
    true
  );
  assert.deepEqual(
    validateH39SharedDomainPrimitiveProvenanceCertificate(packet),
    []
  );
  assert.equal(
    packet.same_domain_provenance_check.value_coverage.E_R
      .covers_primitive_input,
    true
  );
  assert.equal(
    packet.same_domain_provenance_check.value_coverage.M_R
      .covers_primitive_input,
    true
  );
  assert.equal(packet.result.h39_continuous_tail_certificate, true);
});

test("h39 R43 source-family witness subset validator rejects speed-band fields", () => {
  const artifact = buildH39R43SourceFamilyWitnessSubset({
    r43AnalyticProfileWitness: h39R43AnalyticProfileWitness({
      directedRounded: true,
    }),
    sharedDomainSignature: h39PrimitiveDomainSignature(),
  });
  artifact.witness_subset_scope.speed_band = [0.5, 1.5];

  assert.match(
    validateH39R43SourceFamilyWitnessSubset(artifact).join("\n"),
    /must not contain speed-band fields/
  );
});

test("h39 N_G numerator witness subset records current M_G profile as open", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const artifact = buildH39NGNumeratorWitnessSubset({
    nGOuterBoundMGWitness: h39NGNumeratorMGWitness({
      domainSignature,
    }),
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39NGNumeratorWitnessSubset(artifact), []);
  assert.equal(artifact.schema, H39_NG_NUMERATOR_WITNESS_SUBSET_SCHEMA);
  assert.equal(
    artifact.witness_subset_status,
    H39_NG_NUMERATOR_WITNESS_SUBSET_OPEN_STATUS
  );
  assert.equal(
    artifact.predicate_check.failed_predicates.includes(
      "directed_rounded_same_domain_witness"
    ),
    true
  );
  assert.equal(
    artifact.component_provenance.M_G.certifies_directed_rounded,
    false
  );
  assert.equal(artifact.result.h39_M_G_component_witness, false);
});

test("h39 N_G numerator witness subset certifies only M_G from directed-rounded profile", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const witness = h39NGNumeratorMGWitness({
    domainSignature,
    directedRounded: true,
  });
  const artifact = buildH39NGNumeratorWitnessSubset({
    nGOuterBoundMGWitness: witness,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39NGNumeratorWitnessSubset(artifact), []);
  assert.equal(
    artifact.witness_subset_status,
    H39_NG_NUMERATOR_WITNESS_SUBSET_CERTIFIED_STATUS
  );
  assert.equal(
    artifact.component_provenance.M_G.value,
    witness.candidate_M_G_prefix_plus_tail_bound
  );
  assert.equal(
    artifact.component_provenance.M_G.input_field,
    "candidate_M_G_bound"
  );
  assert.equal(
    artifact.claim_boundary
      .certifies_directed_rounded_h39_polydisc_M_G_bound,
    true
  );
  assert.equal(artifact.result.h39_full_primitive_vector_certificate, false);
  assert.equal(artifact.result.retained_branch, false);
});

test("h39 N_G numerator witness subset validator rejects predicate drift and speed-band fields", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const artifact = buildH39NGNumeratorWitnessSubset({
    nGOuterBoundMGWitness: h39NGNumeratorMGWitness({
      domainSignature,
      directedRounded: true,
    }),
    sharedDomainSignature: domainSignature,
  });
  artifact.source_N_G_outer_bound_M_G_witness.n_g_shift = 40;

  assert.match(
    validateH39NGNumeratorWitnessSubset(artifact).join("\n"),
    /status must match|predicate check must match a fresh rebuild|result must match a fresh rebuild/
  );

  const speedArtifact = buildH39NGNumeratorWitnessSubset({
    nGOuterBoundMGWitness: h39NGNumeratorMGWitness({
      domainSignature,
      directedRounded: true,
    }),
    sharedDomainSignature: domainSignature,
  });
  speedArtifact.source_N_G_outer_bound_M_G_witness.speed_min = 0.5;

  assert.match(
    validateH39NGNumeratorWitnessSubset(speedArtifact).join("\n"),
    /must not contain speed-band fields/
  );
});

test("h39 denominator-Cauchy M_G witness feeds the existing N_G subset", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const source = h39DenominatorCauchyNGSource({
    domainSignature,
    directedRounded: true,
  });
  const profile = computeH39NGOuterBoundCandidateMG({
    nGShiftedCoefficients: [[1e-13, 1e-13]],
    nGOuterBound: source.n_g_cauchy_outer_bound,
    nGOuterRadius: source.n_g_cauchy_outer_radius,
    rho: source.rho,
  });
  const artifact = buildH39NGDenominatorCauchyMGWitness({
    denominatorCauchyNGOuterBoundCandidate: source,
    nGOuterBoundMGProfile: profile,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39NGDenominatorCauchyMGWitness(artifact), []);
  assert.equal(
    artifact.schema,
    H39_NG_DENOMINATOR_CAUCHY_MG_WITNESS_SCHEMA
  );
  assert.equal(
    artifact.witness_status,
    H39_NG_DENOMINATOR_CAUCHY_MG_WITNESS_CERTIFIED_STATUS
  );
  assert.equal(
    artifact.N_G_numerator_subset_replay.witness_subset_status,
    H39_NG_NUMERATOR_WITNESS_SUBSET_CERTIFIED_STATUS
  );
  assert.equal(
    artifact.N_G_numerator_subset_replay.result
      .h39_M_G_component_witness,
    true
  );
  assert.equal(
    artifact.generated_N_G_outer_bound_M_G_witness
      .includes_denominator_cauchy_tails,
    true
  );
  assert.equal(
    artifact.claim_boundary
      .certifies_directed_rounded_h39_polydisc_M_G_bound,
    true
  );
  assert.equal(artifact.result.h39_full_primitive_vector_certificate, false);
  assert.equal(artifact.result.retained_branch, false);
});

test("h39 denominator-Cauchy M_G witness keeps candidate source open", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const source = h39DenominatorCauchyNGSource({ domainSignature });
  const profile = computeH39NGOuterBoundCandidateMG({
    nGShiftedCoefficients: [[1e-13, 1e-13]],
    nGOuterBound: source.n_g_cauchy_outer_bound,
    nGOuterRadius: source.n_g_cauchy_outer_radius,
    rho: source.rho,
  });
  const artifact = buildH39NGDenominatorCauchyMGWitness({
    denominatorCauchyNGOuterBoundCandidate: source,
    nGOuterBoundMGProfile: profile,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39NGDenominatorCauchyMGWitness(artifact), []);
  assert.equal(
    artifact.witness_status,
    H39_NG_DENOMINATOR_CAUCHY_MG_WITNESS_OPEN_STATUS
  );
  assert.equal(
    artifact.predicate_check.failed_predicates.includes(
      "directed_rounded_denominator_cauchy_source"
    ),
    true
  );
  assert.equal(
    artifact.N_G_numerator_subset_replay.witness_subset_status,
    H39_NG_NUMERATOR_WITNESS_SUBSET_OPEN_STATUS
  );
  assert.equal(artifact.result.h39_M_G_component_witness, false);
});

test("h39 denominator-Cauchy M_G witness records domain and branch obstructions", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const wrongDomain = {
    ...domainSignature,
    center_graph: "wrong-h39-center",
  };
  const domainSource = h39DenominatorCauchyNGSource({
    domainSignature: wrongDomain,
    directedRounded: true,
  });
  const domainProfile = computeH39NGOuterBoundCandidateMG({
    nGShiftedCoefficients: [[1e-13, 1e-13]],
    nGOuterBound: domainSource.n_g_cauchy_outer_bound,
    nGOuterRadius: domainSource.n_g_cauchy_outer_radius,
    rho: domainSource.rho,
  });
  const domainArtifact = buildH39NGDenominatorCauchyMGWitness({
    denominatorCauchyNGOuterBoundCandidate: domainSource,
    nGOuterBoundMGProfile: domainProfile,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(
    validateH39NGDenominatorCauchyMGWitness(domainArtifact),
    []
  );
  assert.equal(
    domainArtifact.predicate_check.failed_predicates.includes(
      "source_domain_signature_matches"
    ),
    true
  );

  const oneBranchSource = h39DenominatorCauchyNGSource({
    domainSignature,
    directedRounded: true,
    branches: ["-"],
  });
  const oneBranchProfile = computeH39NGOuterBoundCandidateMG({
    nGShiftedCoefficients: [[1e-13, 1e-13]],
    nGOuterBound: oneBranchSource.n_g_cauchy_outer_bound,
    nGOuterRadius: oneBranchSource.n_g_cauchy_outer_radius,
    rho: oneBranchSource.rho,
  });
  const branchArtifact = buildH39NGDenominatorCauchyMGWitness({
    denominatorCauchyNGOuterBoundCandidate: oneBranchSource,
    nGOuterBoundMGProfile: oneBranchProfile,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(
    validateH39NGDenominatorCauchyMGWitness(branchArtifact),
    []
  );
  assert.equal(
    branchArtifact.predicate_check.failed_predicates.includes(
      "required_fold_pair_branches_present"
    ),
    true
  );
  assert.equal(branchArtifact.result.h39_M_G_component_witness, false);
});

test("h39 denominator-Cauchy M_G validator rejects overclaim and speed-band drift", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const source = h39DenominatorCauchyNGSource({
    domainSignature,
    directedRounded: true,
  });
  const profile = computeH39NGOuterBoundCandidateMG({
    nGShiftedCoefficients: [[1e-13, 1e-13]],
    nGOuterBound: source.n_g_cauchy_outer_bound,
    nGOuterRadius: source.n_g_cauchy_outer_radius,
    rho: source.rho,
  });
  const artifact = buildH39NGDenominatorCauchyMGWitness({
    denominatorCauchyNGOuterBoundCandidate: source,
    nGOuterBoundMGProfile: profile,
    sharedDomainSignature: domainSignature,
  });
  artifact.result.retained_branch = true;
  artifact.claim_boundary.certifies_directed_rounded_h39_jacobian_lower_bound =
    true;

  assert.match(
    validateH39NGDenominatorCauchyMGWitness(artifact).join("\n"),
    /must not certify non-M_G components, full tail, scaled remainder, I1, or retained branch status|result must match a fresh rebuild/
  );

  const speedArtifact = buildH39NGDenominatorCauchyMGWitness({
    denominatorCauchyNGOuterBoundCandidate: source,
    nGOuterBoundMGProfile: profile,
    sharedDomainSignature: domainSignature,
  });
  speedArtifact.source_denominator_cauchy_N_G_outer_bound_candidate.speed_band =
    [0.5, 1.5];

  assert.match(
    validateH39NGDenominatorCauchyMGWitness(speedArtifact).join("\n"),
    /must not contain speed-band fields/
  );
});

test("h39 Jacobian floor witness subset records current nu_J profile as open", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const artifact = buildH39JacobianFloorWitnessSubset({
    jacobianFloorWitness: h39JacobianFloorWitness({
      domainSignature,
    }),
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39JacobianFloorWitnessSubset(artifact), []);
  assert.equal(
    artifact.schema,
    H39_JACOBIAN_FLOOR_WITNESS_SUBSET_SCHEMA
  );
  assert.equal(
    artifact.witness_subset_status,
    H39_JACOBIAN_FLOOR_WITNESS_SUBSET_OPEN_STATUS
  );
  assert.equal(
    artifact.predicate_check.failed_predicates.includes(
      "directed_rounded_same_domain_witness"
    ),
    true
  );
  assert.equal(
    artifact.component_provenance.nu_J.certifies_directed_rounded,
    false
  );
  assert.equal(artifact.result.h39_nu_J_component_witness, false);
});

test("h39 Jacobian floor witness subset certifies only nu_J from directed-rounded floor", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const witness = h39JacobianFloorWitness({
    domainSignature,
    directedRounded: true,
  });
  const artifact = buildH39JacobianFloorWitnessSubset({
    jacobianFloorWitness: witness,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39JacobianFloorWitnessSubset(artifact), []);
  assert.equal(
    artifact.witness_subset_status,
    H39_JACOBIAN_FLOOR_WITNESS_SUBSET_CERTIFIED_STATUS
  );
  assert.equal(
    artifact.component_provenance.nu_J.value,
    witness.candidate_nu_J_prefix_plus_tail_floor
  );
  assert.equal(
    artifact.component_provenance.nu_J.relation,
    "lower-bound"
  );
  assert.equal(
    artifact.claim_boundary
      .certifies_directed_rounded_h39_jacobian_lower_bound,
    true
  );
  assert.equal(artifact.result.h39_full_primitive_vector_certificate, false);
  assert.equal(artifact.result.retained_branch, false);
});

test("h39 Jacobian floor witness subset validator rejects speed-band fields", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const artifact = buildH39JacobianFloorWitnessSubset({
    jacobianFloorWitness: h39JacobianFloorWitness({
      domainSignature,
      directedRounded: true,
    }),
    sharedDomainSignature: domainSignature,
  });
  artifact.source_jacobian_floor_witness.speed_max = 1.5;

  assert.match(
    validateH39JacobianFloorWitnessSubset(artifact).join("\n"),
    /must not contain speed-band fields/
  );
});

test("h39 coordinate-Cauchy R43/Jacobian witness keeps candidate source open", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const r43Profile = h39R43AnalyticProfileWitness({ domainSignature });
  const jacobianProfile = h39JacobianFloorWitness({ domainSignature });
  const source = h39CoordinateCauchyProfileSource({
    domainSignature,
    r43Profile,
    jacobianProfile,
  });
  const artifact = buildH39CoordinateCauchyR43JacobianWitness({
    coordinateCauchyOuterBoundsProfileCandidate: source,
    r43AnalyticProfileWitness: r43Profile,
    jacobianFloorWitness: jacobianProfile,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(
    validateH39CoordinateCauchyR43JacobianWitness(artifact),
    []
  );
  assert.equal(
    artifact.schema,
    H39_COORDINATE_CAUCHY_R43_JACOBIAN_WITNESS_SCHEMA
  );
  assert.equal(
    artifact.witness_status,
    H39_COORDINATE_CAUCHY_R43_JACOBIAN_WITNESS_OPEN_STATUS
  );
  assert.equal(
    artifact.predicate_check.failed_predicates.includes(
      "directed_rounded_coordinate_cauchy_source"
    ),
    true
  );
  assert.equal(
    artifact.generated_R43_analytic_profile_witness
      .certifies_directed_rounded,
    false
  );
  assert.equal(artifact.result.h39_E_R_component_witness, false);
  assert.equal(artifact.result.h39_M_R_component_witness, false);
  assert.equal(artifact.result.h39_nu_J_component_witness, false);
});

test("h39 coordinate-Cauchy R43/Jacobian witness certifies only E_R, M_R, and nu_J", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const r43Profile = h39R43AnalyticProfileWitness({ domainSignature });
  const jacobianProfile = h39JacobianFloorWitness({ domainSignature });
  const source = h39CoordinateCauchyProfileSource({
    domainSignature,
    directedRounded: true,
    r43Profile,
    jacobianProfile,
  });
  const artifact = buildH39CoordinateCauchyR43JacobianWitness({
    coordinateCauchyOuterBoundsProfileCandidate: source,
    r43AnalyticProfileWitness: r43Profile,
    jacobianFloorWitness: jacobianProfile,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(
    validateH39CoordinateCauchyR43JacobianWitness(artifact),
    []
  );
  assert.equal(
    artifact.witness_status,
    H39_COORDINATE_CAUCHY_R43_JACOBIAN_WITNESS_CERTIFIED_STATUS
  );
  assert.equal(
    artifact.R43_source_family_subset_replay.result
      .h39_E_R_component_witness,
    true
  );
  assert.equal(
    artifact.R43_source_family_subset_replay.result
      .h39_M_R_component_witness,
    true
  );
  assert.equal(
    artifact.jacobian_floor_subset_replay.result
      .h39_nu_J_component_witness,
    true
  );
  assert.equal(
    artifact.component_provenance.E_R.value,
    r43Profile.candidate_E_R_prefix_plus_tail_bound
  );
  assert.equal(
    artifact.component_provenance.M_R.value,
    r43Profile.candidate_M_R_prefix_plus_tail_bound
  );
  assert.equal(
    artifact.component_provenance.nu_J.value,
    jacobianProfile.candidate_nu_J_prefix_plus_tail_floor
  );
  assert.equal(
    artifact.claim_boundary
      .certifies_directed_rounded_h39_polydisc_M_G_bound,
    false
  );
  assert.equal(
    artifact.claim_boundary
      .certifies_directed_rounded_h39_jacobian_lipschitz_bound,
    false
  );
  assert.equal(artifact.result.h39_full_primitive_vector_certificate, false);
  assert.equal(artifact.result.retained_branch, false);
});

test("h39 coordinate-Cauchy R43/Jacobian witness records domain, branch, and profile obstructions", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const r43Profile = h39R43AnalyticProfileWitness({ domainSignature });
  const jacobianProfile = h39JacobianFloorWitness({ domainSignature });
  const mismatchedSource = h39CoordinateCauchyProfileSource({
    domainSignature: { ...domainSignature, center_graph: "other-center" },
    directedRounded: true,
    r43Profile,
    jacobianProfile,
  });
  const domainArtifact = buildH39CoordinateCauchyR43JacobianWitness({
    coordinateCauchyOuterBoundsProfileCandidate: mismatchedSource,
    r43AnalyticProfileWitness: r43Profile,
    jacobianFloorWitness: jacobianProfile,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(
    validateH39CoordinateCauchyR43JacobianWitness(domainArtifact),
    []
  );
  assert.equal(
    domainArtifact.predicate_check.failed_predicates.includes(
      "source_domain_signature_matches"
    ),
    true
  );

  const oneBranchSource = h39CoordinateCauchyProfileSource({
    domainSignature,
    directedRounded: true,
    r43Profile,
    jacobianProfile,
    branches: ["-"],
  });
  const branchArtifact = buildH39CoordinateCauchyR43JacobianWitness({
    coordinateCauchyOuterBoundsProfileCandidate: oneBranchSource,
    r43AnalyticProfileWitness: r43Profile,
    jacobianFloorWitness: jacobianProfile,
    sharedDomainSignature: domainSignature,
  });
  assert.equal(
    branchArtifact.predicate_check.failed_predicates.includes(
      "source_residual_branch_candidates_present"
    ),
    true
  );
  assert.equal(
    branchArtifact.predicate_check.failed_predicates.includes(
      "jacobian_branch_candidates_present"
    ),
    true
  );

  const source = h39CoordinateCauchyProfileSource({
    domainSignature,
    directedRounded: true,
    r43Profile,
    jacobianProfile,
  });
  const profileArtifact = buildH39CoordinateCauchyR43JacobianWitness({
    coordinateCauchyOuterBoundsProfileCandidate: source,
    r43AnalyticProfileWitness: {
      ...r43Profile,
      outer_bound: r43Profile.outer_bound + 1,
    },
    jacobianFloorWitness: jacobianProfile,
    sharedDomainSignature: domainSignature,
  });
  assert.equal(
    profileArtifact.predicate_check.failed_predicates.includes(
      "r43_profile_matches_coordinate_source"
    ),
    true
  );
});

test("h39 coordinate-Cauchy R43/Jacobian validator rejects overclaim and speed-band drift", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const r43Profile = h39R43AnalyticProfileWitness({ domainSignature });
  const jacobianProfile = h39JacobianFloorWitness({ domainSignature });
  const source = h39CoordinateCauchyProfileSource({
    domainSignature,
    directedRounded: true,
    r43Profile,
    jacobianProfile,
  });
  const artifact = buildH39CoordinateCauchyR43JacobianWitness({
    coordinateCauchyOuterBoundsProfileCandidate: source,
    r43AnalyticProfileWitness: r43Profile,
    jacobianFloorWitness: jacobianProfile,
    sharedDomainSignature: domainSignature,
  });
  artifact.result.h39_continuous_tail_certificate = true;

  assert.match(
    validateH39CoordinateCauchyR43JacobianWitness(artifact).join("\n"),
    /must not certify M_G, L_J, full tail, scaled remainder, I1, or retained branch status|result must match a fresh rebuild/
  );

  const speedArtifact = buildH39CoordinateCauchyR43JacobianWitness({
    coordinateCauchyOuterBoundsProfileCandidate: source,
    r43AnalyticProfileWitness: r43Profile,
    jacobianFloorWitness: jacobianProfile,
    sharedDomainSignature: domainSignature,
  });
  speedArtifact.source_coordinate_cauchy_outer_bounds_profile_candidate.speed_band =
    [0.5, 1.5];

  assert.match(
    validateH39CoordinateCauchyR43JacobianWitness(speedArtifact).join(
      "\n"
    ),
    /must not contain speed-band fields/
  );
});

test("h39 graph-radii witness subset records current radii as open", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const artifact = buildH39GraphRadiiWitnessSubset({
    graphRadiiWitness: h39GraphRadiiWitness({
      domainSignature,
    }),
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39GraphRadiiWitnessSubset(artifact), []);
  assert.equal(artifact.schema, H39_GRAPH_RADII_WITNESS_SUBSET_SCHEMA);
  assert.equal(
    artifact.witness_subset_status,
    H39_GRAPH_RADII_WITNESS_SUBSET_OPEN_STATUS
  );
  assert.equal(
    artifact.predicate_check.failed_predicates.includes(
      "directed_rounded_same_domain_witness"
    ),
    true
  );
  assert.equal(
    artifact.component_provenance.rho_X.certifies_directed_rounded,
    false
  );
  assert.equal(artifact.result.h39_rho_X_component_witness, false);
  assert.equal(artifact.result.h39_r_X_component_witness, false);
});

test("h39 graph-radii witness subset certifies rho_X and r_X exactly", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const artifact = buildH39GraphRadiiWitnessSubset({
    graphRadiiWitness: h39GraphRadiiWitness({
      domainSignature,
      directedRounded: true,
    }),
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39GraphRadiiWitnessSubset(artifact), []);
  assert.equal(
    artifact.witness_subset_status,
    H39_GRAPH_RADII_WITNESS_SUBSET_CERTIFIED_STATUS
  );
  assert.equal(
    artifact.component_provenance.rho_X.value,
    CLOSING_PRIMITIVE_BOUNDS.rhoX
  );
  assert.equal(
    artifact.component_provenance.r_X.value,
    CLOSING_PRIMITIVE_BOUNDS.rX
  );
  assert.equal(
    artifact.claim_boundary
      .certifies_directed_rounded_h39_graph_rho_X_radius,
    true
  );
  assert.equal(
    artifact.claim_boundary.certifies_directed_rounded_h39_graph_r_X_radius,
    true
  );
  assert.equal(artifact.result.h39_full_primitive_vector_certificate, false);
  assert.equal(artifact.result.retained_branch, false);
});

test("h39 graph-radii witness subset validator rejects speed-band fields", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const artifact = buildH39GraphRadiiWitnessSubset({
    graphRadiiWitness: h39GraphRadiiWitness({
      domainSignature,
      directedRounded: true,
    }),
    sharedDomainSignature: domainSignature,
  });
  artifact.source_graph_radii_witness.speed_window = [0.5, 1.5];

  assert.match(
    validateH39GraphRadiiWitnessSubset(artifact).join("\n"),
    /must not contain speed-band fields/
  );
});

test("h39 component witness subsets compose a full primitive provenance report", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const domainSignature = h39PrimitiveDomainSignature();
  const report = directedRoundedProvenanceReport({
    primitiveVector,
    domainSignature,
  });
  const r43Subset = buildH39R43SourceFamilyWitnessSubset({
    r43AnalyticProfileWitness: h39R43AnalyticProfileWitness({
      domainSignature,
      directedRounded: true,
    }),
    sharedDomainSignature: domainSignature,
  });
  const nGSubset = buildH39NGNumeratorWitnessSubset({
    nGOuterBoundMGWitness: h39NGNumeratorMGWitness({
      domainSignature,
      directedRounded: true,
    }),
    sharedDomainSignature: domainSignature,
  });
  const jacobianSubset = buildH39JacobianFloorWitnessSubset({
    jacobianFloorWitness: h39JacobianFloorWitness({
      domainSignature,
      directedRounded: true,
    }),
    sharedDomainSignature: domainSignature,
  });
  const lJSubset = buildH39LJKernelWitnessSubset({
    kernelMajorantArtifact: h39KernelMajorantArtifact(),
    kernelMajorantWitness: h39DirectedRoundedKernelMajorantWitness({
      domainSignature,
    }),
    sharedDomainSignature: domainSignature,
  });
  const graphSubset = buildH39GraphRadiiWitnessSubset({
    graphRadiiWitness: h39GraphRadiiWitness({
      domainSignature,
      directedRounded: true,
    }),
    sharedDomainSignature: domainSignature,
  });

  report.component_provenance.E_R = r43Subset.component_provenance.E_R;
  report.component_provenance.M_R = r43Subset.component_provenance.M_R;
  report.component_provenance.M_G = nGSubset.component_provenance.M_G;
  report.component_provenance.nu_J =
    jacobianSubset.component_provenance.nu_J;
  report.component_provenance.L_J = lJSubset.component_provenance.L_J;
  report.component_provenance.rho_X =
    graphSubset.component_provenance.rho_X;
  report.component_provenance.r_X = graphSubset.component_provenance.r_X;

  const packet = buildH39SharedDomainPrimitiveProvenanceCertificate({
    primitiveVectorBackendArtifact: primitiveVector,
    directedRoundedProvenanceReport: report,
  });

  assert.deepEqual(validateH39R43SourceFamilyWitnessSubset(r43Subset), []);
  assert.deepEqual(validateH39NGNumeratorWitnessSubset(nGSubset), []);
  assert.deepEqual(
    validateH39JacobianFloorWitnessSubset(jacobianSubset),
    []
  );
  assert.deepEqual(validateH39LJKernelWitnessSubset(lJSubset), []);
  assert.deepEqual(validateH39GraphRadiiWitnessSubset(graphSubset), []);
  assert.deepEqual(
    validateH39SharedDomainPrimitiveProvenanceCertificate(packet),
    []
  );
  assert.equal(
    packet.same_domain_provenance_check.value_coverage.M_G
      .covers_primitive_input,
    true
  );
  assert.equal(
    packet.same_domain_provenance_check.value_coverage.nu_J
      .covers_primitive_input,
    true
  );
  assert.equal(
    packet.same_domain_provenance_check.value_coverage.rho_X
      .covers_primitive_input,
    true
  );
  assert.equal(packet.result.h39_continuous_tail_certificate, true);
});

test("h39 component subset composition certifies only the h39 continuous-tail row", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const domainSignature = h39PrimitiveDomainSignature();
  const {
    r43Subset,
    nGSubset,
    jacobianSubset,
    lJSubset,
    graphSubset,
  } = h39CertifiedComponentSubsets({ domainSignature });

  const artifact = buildH39ComponentSubsetComposition({
    primitiveVectorBackendArtifact: primitiveVector,
    r43SourceFamilyWitnessSubset: r43Subset,
    nGNumeratorWitnessSubset: nGSubset,
    jacobianFloorWitnessSubset: jacobianSubset,
    lJKernelWitnessSubset: lJSubset,
    graphRadiiWitnessSubset: graphSubset,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39ComponentSubsetComposition(artifact), []);
  assert.equal(artifact.schema, H39_COMPONENT_SUBSET_COMPOSITION_SCHEMA);
  assert.equal(
    artifact.composition_status,
    H39_COMPONENT_SUBSET_COMPOSITION_CERTIFIED_STATUS
  );
  assert.equal(
    artifact.component_provenance_report.provenance_status,
    "directed-rounded-same-domain-primitive-provenance-certified"
  );
  assert.equal(
    artifact.primitive_provenance_certificate_replay.result
      .h39_continuous_tail_certificate,
    true
  );
  assert.equal(
    artifact.certified_seven_input_primitive_witness.result
      .h39_seven_input_primitive_witness,
    true
  );
  assert.deepEqual(
    artifact.certified_seven_input_primitive_witness
      .shared_domain_signature,
    domainSignature
  );
  for (const component of [
    "E_R",
    "M_R",
    "M_G",
    "nu_J",
    "L_J",
    "rho_X",
    "r_X",
  ]) {
    assert.equal(
      artifact.certified_seven_input_primitive_witness
        .primitive_vector_components[component],
      artifact.component_provenance_report.component_provenance[component]
        .value
    );
  }
  assert.equal(
    artifact.claim_boundary
      .certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound,
    true
  );
  assert.equal(
    artifact.claim_boundary.certifies_directed_rounded_fold_pair_scaled_remainder,
    false
  );
  assert.equal(
    artifact.claim_boundary.certifies_I1_regular_critical_exhaustion,
    false
  );
  assert.equal(
    artifact.result.h39_full_primitive_vector_certificate,
    false
  );
  assert.equal(artifact.result.retained_branch, false);
});

test("h39 component subset composition remains open when one subset is open", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const domainSignature = h39PrimitiveDomainSignature();
  const {
    r43Subset,
    jacobianSubset,
    lJSubset,
    graphSubset,
  } = h39CertifiedComponentSubsets({ domainSignature });
  const openNGSubset = buildH39NGNumeratorWitnessSubset({
    nGOuterBoundMGWitness: h39NGNumeratorMGWitness({
      domainSignature,
      directedRounded: false,
    }),
    sharedDomainSignature: domainSignature,
  });

  const artifact = buildH39ComponentSubsetComposition({
    primitiveVectorBackendArtifact: primitiveVector,
    r43SourceFamilyWitnessSubset: r43Subset,
    nGNumeratorWitnessSubset: openNGSubset,
    jacobianFloorWitnessSubset: jacobianSubset,
    lJKernelWitnessSubset: lJSubset,
    graphRadiiWitnessSubset: graphSubset,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39ComponentSubsetComposition(artifact), []);
  assert.equal(
    artifact.composition_status,
    H39_COMPONENT_SUBSET_COMPOSITION_OPEN_STATUS
  );
  assert.equal(
    artifact.predicate_check.component_certified_failures.includes("M_G"),
    true
  );
  assert.equal(
    artifact.component_provenance_report.provenance_status,
    H39_COMPONENT_SUBSET_COMPOSITION_OPEN_STATUS
  );
  assert.equal(
    artifact.primitive_provenance_certificate_replay.result
      .h39_continuous_tail_certificate,
    false
  );
  assert.equal(
    artifact.no_go_theorem.promotion_obstruction,
    "all_component_subsets_certified"
  );
  assert.equal(artifact.result.retained_branch, false);
});

test("h39 component subset composition records domain mismatch before promotion", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const domainSignature = h39PrimitiveDomainSignature();
  const wrongDomain = {
    ...domainSignature,
    center_graph: "wrong-h39-center",
  };
  const {
    r43Subset,
    nGSubset,
    jacobianSubset,
    lJSubset,
  } = h39CertifiedComponentSubsets({ domainSignature });
  const graphSubset = buildH39GraphRadiiWitnessSubset({
    graphRadiiWitness: h39GraphRadiiWitness({
      domainSignature: wrongDomain,
      directedRounded: true,
    }),
    sharedDomainSignature: wrongDomain,
  });

  const artifact = buildH39ComponentSubsetComposition({
    primitiveVectorBackendArtifact: primitiveVector,
    r43SourceFamilyWitnessSubset: r43Subset,
    nGNumeratorWitnessSubset: nGSubset,
    jacobianFloorWitnessSubset: jacobianSubset,
    lJKernelWitnessSubset: lJSubset,
    graphRadiiWitnessSubset: graphSubset,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39ComponentSubsetComposition(artifact), []);
  assert.equal(
    artifact.predicate_check.failed_predicates.includes(
      "all_components_on_shared_domain"
    ),
    true
  );
  assert.deepEqual(artifact.predicate_check.domain_mismatch_components, [
    "rho_X",
    "r_X",
  ]);
  assert.equal(artifact.result.h39_continuous_tail_certificate, false);
});

test("h39 component subset composition validator rejects overclaim and speed-band drift", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const domainSignature = h39PrimitiveDomainSignature();
  const {
    r43Subset,
    nGSubset,
    jacobianSubset,
    lJSubset,
    graphSubset,
  } = h39CertifiedComponentSubsets({ domainSignature });
  const artifact = buildH39ComponentSubsetComposition({
    primitiveVectorBackendArtifact: primitiveVector,
    r43SourceFamilyWitnessSubset: r43Subset,
    nGNumeratorWitnessSubset: nGSubset,
    jacobianFloorWitnessSubset: jacobianSubset,
    lJKernelWitnessSubset: lJSubset,
    graphRadiiWitnessSubset: graphSubset,
    sharedDomainSignature: domainSignature,
  });
  artifact.result.retained_branch = true;
  artifact.claim_boundary.certifies_directed_rounded_fold_pair_scaled_remainder =
    true;

  assert.match(
    validateH39ComponentSubsetComposition(artifact).join("\n"),
    /must not certify the full primitive vector, scaled remainder, I1, or retained branch status|result must match a fresh rebuild/
  );

  const speedArtifact = buildH39ComponentSubsetComposition({
    primitiveVectorBackendArtifact: primitiveVector,
    r43SourceFamilyWitnessSubset: r43Subset,
    nGNumeratorWitnessSubset: nGSubset,
    jacobianFloorWitnessSubset: jacobianSubset,
    lJKernelWitnessSubset: lJSubset,
    graphRadiiWitnessSubset: graphSubset,
    sharedDomainSignature: domainSignature,
  });
  speedArtifact.composition_scope.speed_band = [0.5, 1.5];

  assert.match(
    validateH39ComponentSubsetComposition(speedArtifact).join("\n"),
    /must not contain speed-band fields/
  );
});

test("h39 upstream source composition certifies only the embedded h39 continuous-tail row", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const domainSignature = h39PrimitiveDomainSignature();
  const {
    coordinateSource,
    r43Profile,
    jacobianProfile,
    denominatorSource,
    nGProfile,
    kernelMajorantArtifact,
    kernelMajorantWitness,
    graphRadiiWitness,
  } = h39CertifiedUpstreamSources({ domainSignature });

  const artifact = buildH39UpstreamSourceComposition({
    primitiveVectorBackendArtifact: primitiveVector,
    coordinateCauchyOuterBoundsProfileCandidate: coordinateSource,
    r43AnalyticProfileWitness: r43Profile,
    jacobianFloorWitness: jacobianProfile,
    denominatorCauchyNGOuterBoundCandidate: denominatorSource,
    nGOuterBoundMGProfile: nGProfile,
    kernelMajorantArtifact,
    kernelMajorantWitness,
    graphRadiiWitness,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39UpstreamSourceComposition(artifact), []);
  assert.equal(artifact.schema, H39_UPSTREAM_SOURCE_COMPOSITION_SCHEMA);
  assert.equal(
    artifact.composition_status,
    H39_UPSTREAM_SOURCE_COMPOSITION_CERTIFIED_STATUS
  );
  assert.equal(
    artifact.component_subset_composition_replay.result
      .h39_continuous_tail_certificate,
    true
  );
  assert.equal(
    artifact.primitive_provenance_certificate_replay.result
      .h39_continuous_tail_certificate,
    true
  );
  assert.equal(
    artifact.extracted_component_subsets.R43_source_family.result
      .h39_E_R_component_witness,
    true
  );
  assert.equal(
    artifact.extracted_component_subsets.N_G_numerator.result
      .h39_M_G_component_witness,
    true
  );
  assert.equal(
    artifact.extracted_component_subsets.jacobian_floor.result
      .h39_nu_J_component_witness,
    true
  );
  assert.equal(
    artifact.claim_boundary
      .certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound,
    true
  );
  assert.equal(
    artifact.claim_boundary.certifies_directed_rounded_fold_pair_scaled_remainder,
    false
  );
  assert.equal(
    artifact.claim_boundary.certifies_I1_regular_critical_exhaustion,
    false
  );
  assert.equal(artifact.result.h39_full_primitive_vector_certificate, false);
  assert.equal(artifact.result.retained_branch, false);
});

test("h39 upstream source composition replays K_epsilon branch witnesses into L_J", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const domainSignature = h39PrimitiveDomainSignature();
  const {
    coordinateSource,
    r43Profile,
    jacobianProfile,
    denominatorSource,
    nGProfile,
    kernelMajorantArtifact,
    graphRadiiWitness,
  } = h39CertifiedUpstreamSources({ domainSignature });
  const branchWitnessSet = {
    packet_id: "synthetic-h39-K_epsilon-branch-coordinate-witness-set",
    rho: 0.1,
    branch_coordinate_witnesses: h39KepsilonBranchCoordinateWitnesses({
      domainSignature,
    }),
  };

  const artifact = buildH39UpstreamSourceComposition({
    primitiveVectorBackendArtifact: primitiveVector,
    coordinateCauchyOuterBoundsProfileCandidate: coordinateSource,
    r43AnalyticProfileWitness: r43Profile,
    jacobianFloorWitness: jacobianProfile,
    denominatorCauchyNGOuterBoundCandidate: denominatorSource,
    nGOuterBoundMGProfile: nGProfile,
    kernelMajorantArtifact,
    kernelMajorantWitness: null,
    kEpsilonBranchCoordinateWitnessSet: branchWitnessSet,
    graphRadiiWitness,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39UpstreamSourceComposition(artifact), []);
  assert.equal(
    artifact.composition_status,
    H39_UPSTREAM_SOURCE_COMPOSITION_CERTIFIED_STATUS
  );
  assert.equal(
    artifact.K_epsilon_majorant_witness_replay.result
      .h39_K_epsilon_majorant_witness,
    true
  );
  assert.equal(
    artifact.resolved_kernel_majorant_witness.component,
    "M_K"
  );
  assert.equal(
    artifact.L_J_kernel_witness_subset_replay.result
      .h39_L_J_component_witness,
    true
  );
  assert.equal(
    artifact.component_subset_composition_replay.result
      .h39_continuous_tail_certificate,
    true
  );
  assert.equal(
    artifact.claim_boundary.consumes_K_epsilon_branch_coordinate_witnesses,
    true
  );
  assert.equal(
    artifact.claim_boundary.replays_K_epsilon_majorant_witness,
    true
  );
  assert.equal(
    artifact.source_K_epsilon_branch_coordinate_witness_set,
    branchWitnessSet
  );
  assert.equal(
    artifact.source_K_epsilon_branch_coordinate_witnesses,
    branchWitnessSet.branch_coordinate_witnesses
  );
});

test("h39 upstream source composition consumes one raw evaluator artifact as open source handoff", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const evaluatorArtifact = h39SharedDomainEvaluatorArtifact();
  const summary = evaluatorArtifact.finite_prefix_summary;
  const primitiveInput =
    summary.candidate_h39_full_cauchy_primitive_vector_backend
      .primitive_diagnostic_input;
  const graphRadiiWitness = h39GraphRadiiWitness({
    domainSignature,
    directedRounded: true,
  });
  graphRadiiWitness.rho_X = primitiveInput.rho_X;
  graphRadiiWitness.r_X = primitiveInput.r_X;

  const artifact = buildH39UpstreamSourceComposition({
    sharedDomainEvaluatorArtifact: evaluatorArtifact,
    kernelMajorantWitness: kernelWitnessForEvaluatorSummary(
      summary,
      domainSignature
    ),
    graphRadiiWitness,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39UpstreamSourceComposition(artifact), []);
  assert.equal(
    artifact.claim_boundary.consumes_shared_domain_evaluator_artifact,
    true
  );
  assert.equal(
    artifact.source_coordinate_cauchy_outer_bounds_profile_candidate,
    evaluatorArtifact.coordinate_cauchy_outer_bounds_profile_candidate
  );
  assert.equal(
    artifact.source_denominator_cauchy_N_G_outer_bound_candidate,
    evaluatorArtifact.denominator_cauchy_n_g_outer_bound_candidate
  );
  assert.equal(
    artifact.source_R43_analytic_profile_candidate.source_profile_count,
    2
  );
  assert.equal(
    artifact.source_jacobian_floor_profile_candidate.source_profile_count,
    2
  );
  assert.equal(
    artifact.source_N_G_outer_bound_M_G_profile.source_profile_count,
    1
  );
  assert.equal(
    artifact.coordinate_cauchy_R43_jacobian_witness_replay.result
      .h39_E_R_component_witness,
    false
  );
  assert.equal(
    artifact.N_G_denominator_cauchy_M_G_witness_replay.result
      .h39_M_G_component_witness,
    false
  );
  assert.equal(
    artifact.coordinate_cauchy_R43_jacobian_witness_replay.predicate_check
      .failed_predicates.includes(
        "directed_rounded_coordinate_cauchy_source"
      ),
    true
  );
  assert.equal(
    artifact.N_G_denominator_cauchy_M_G_witness_replay.predicate_check
      .failed_predicates.includes(
        "directed_rounded_denominator_cauchy_source"
      ),
    true
  );
  assert.equal(artifact.result.h39_continuous_tail_certificate, false);
  assert.equal(artifact.result.retained_branch, false);
});

test("h39 upstream source composition promotes wrapped evaluator source handoffs to primitive witnesses", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const evaluatorArtifact = certifyEvaluatorSourceHandoffs(
    h39SharedDomainEvaluatorArtifact(),
    domainSignature
  );
  const summary = evaluatorArtifact.finite_prefix_summary;
  const primitiveInput =
    summary.candidate_h39_full_cauchy_primitive_vector_backend
      .primitive_diagnostic_input;
  const graphRadiiWitness = h39GraphRadiiWitness({
    domainSignature,
    directedRounded: true,
  });
  graphRadiiWitness.rho_X = primitiveInput.rho_X;
  graphRadiiWitness.r_X = primitiveInput.r_X;

  const artifact = buildH39UpstreamSourceComposition({
    sharedDomainEvaluatorArtifact: evaluatorArtifact,
    kernelMajorantWitness: kernelWitnessForEvaluatorSummary(
      summary,
      domainSignature
    ),
    graphRadiiWitness,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39UpstreamSourceComposition(artifact), []);
  assert.equal(
    artifact.coordinate_cauchy_R43_jacobian_witness_replay.result
      .h39_E_R_component_witness,
    true
  );
  assert.equal(
    artifact.coordinate_cauchy_R43_jacobian_witness_replay.result
      .h39_M_R_component_witness,
    true
  );
  assert.equal(
    artifact.coordinate_cauchy_R43_jacobian_witness_replay.result
      .h39_nu_J_component_witness,
    true
  );
  assert.equal(
    artifact.N_G_denominator_cauchy_M_G_witness_replay.result
      .h39_M_G_component_witness,
    true
  );
  assert.equal(
    artifact.L_J_kernel_witness_subset_replay.result
      .h39_L_J_component_witness,
    true
  );
  assert.equal(
    artifact.graph_radii_witness_subset_replay.result
      .h39_rho_X_component_witness,
    true
  );
  assert.equal(
    artifact.graph_radii_witness_subset_replay.result
      .h39_r_X_component_witness,
    true
  );
  assert.equal(
    artifact.component_subset_composition_replay
      .component_provenance_report.component_provenance.E_R.value,
    summary.candidate_E_R_prefix_plus_tail_bound
  );
  assert.equal(
    artifact.component_subset_composition_replay
      .component_provenance_report.component_provenance.M_R.value,
    summary.candidate_M_R_prefix_plus_tail_bound
  );
  assert.equal(
    artifact.component_subset_composition_replay
      .component_provenance_report.component_provenance.M_G.value,
    summary.candidate_M_G_prefix_plus_tail_bound
  );
  assert.equal(
    artifact.component_subset_composition_replay
      .component_provenance_report.component_provenance.nu_J.value,
    summary.candidate_nu_J_prefix_plus_tail_floor
  );
  assert.equal(
    artifact.result.h39_continuous_tail_certificate,
    false
  );
  assert.equal(
    artifact.result.promotion_obstruction,
    "component_subset_composition_closes"
  );
});

test("h39 upstream source composition closes the primitive row for reducer-safe evaluator radii", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const evaluatorArtifact = certifyEvaluatorSourceHandoffs(
    h39SharedDomainEvaluatorArtifact({
      coordinateCauchyOuterRadius: 0.9,
      coordinateJacobianOuterRadius: 0.9,
      coordinateJacobianNumeratorOuterRadius: 1.35,
      denominatorCauchyOuterRadius: 0.5,
    }),
    domainSignature
  );
  const summary = evaluatorArtifact.finite_prefix_summary;
  const rhoX = 0.01;
  const rX = 0.008;
  const graphRadiiWitness = h39GraphRadiiWitness({
    domainSignature,
    directedRounded: true,
  });
  graphRadiiWitness.rho_X = rhoX;
  graphRadiiWitness.r_X = rX;
  const kernelMajorantWitness = kernelWitnessForEvaluatorSummary(
    summary,
    domainSignature
  );
  const sourceOnly = buildH39UpstreamSourceComposition({
    sharedDomainEvaluatorArtifact: evaluatorArtifact,
    kernelMajorantWitness,
    graphRadiiWitness,
    sharedDomainSignature: domainSignature,
  });
  const componentProvenance =
    sourceOnly.component_subset_composition_replay
      .component_provenance_report.component_provenance;
  const primitiveVector = primitiveVectorBackendArtifact({
    bounds: {
      centerResidualBound: componentProvenance.E_R.value,
      rootTangentNumeratorBound: componentProvenance.M_R.value,
      mGBound: componentProvenance.M_G.value,
      centerJacobianLowerBound: componentProvenance.nu_J.value,
      jacobianLipschitzBound: summary.candidate_L_J_reduced_continuous_majorant,
      rhoX,
      rX,
    },
  });

  const artifact = buildH39UpstreamSourceComposition({
    sharedDomainEvaluatorArtifact: evaluatorArtifact,
    primitiveVectorBackendArtifact: primitiveVector,
    kernelMajorantWitness,
    graphRadiiWitness,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39UpstreamSourceComposition(artifact), []);
  assert.equal(
    artifact.composition_status,
    H39_UPSTREAM_SOURCE_COMPOSITION_CERTIFIED_STATUS
  );
  assert.equal(
    artifact.component_subset_composition_replay.result
      .h39_continuous_tail_certificate,
    true
  );
  assert.equal(
    artifact.primitive_provenance_certificate_replay.result
      .h39_continuous_tail_certificate,
    true
  );
  assert.equal(
    artifact.certified_seven_input_primitive_witness.result
      .h39_seven_input_primitive_witness,
    true
  );
  assert.equal(
    artifact.certified_seven_input_primitive_witness
      .primitive_vector_components.rho_X,
    rhoX
  );
  assert.equal(
    artifact.certified_seven_input_primitive_witness
      .primitive_vector_components.r_X,
    rX
  );
  assert.equal(
    artifact.primitive_provenance_certificate_replay
      .primitive_vector_diagnostic_replay.shared_domain_diagnostic_summary
      .candidate_rouche_primitive_h39_closure_ratio_below_one,
    true
  );
  assert.equal(
    artifact.primitive_provenance_certificate_replay
      .primitive_vector_diagnostic_replay.shared_domain_diagnostic_summary
      .root_graph_lift_status,
    "rouche-certified"
  );
  assert.equal(artifact.result.h39_full_primitive_vector_certificate, false);
  assert.equal(artifact.result.retained_branch, false);
});

test("h39 upstream source composition closes from evaluator-emitted source certificates", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const evaluatorArtifact = h39SharedDomainEvaluatorArtifact({
    coordinateCauchyOuterRadius: 0.9,
    coordinateJacobianOuterRadius: 0.9,
    coordinateJacobianNumeratorOuterRadius: 1.35,
    denominatorCauchyOuterRadius: 0.5,
    sharedDomainSignature: domainSignature,
    rhoX: 0.01,
    rX: 0.008,
  });
  const rhoX = 0.01;
  const rX = 0.008;

  const artifact = buildH39UpstreamSourceComposition({
    sharedDomainEvaluatorArtifact: evaluatorArtifact,
    sharedDomainSignature: domainSignature,
  });
  const synthesizedBackend =
    artifact.component_subset_composition_replay
      .source_primitive_vector_backend_artifact;
  const synthesizedInput =
    synthesizedBackend.primitive_diagnostic_input;
  const componentProvenance =
    artifact.component_subset_composition_replay
      .component_provenance_report.component_provenance;
  const primitiveInputFields = {
    E_R: "center_residual_bound_E_R",
    M_R: "candidate_root_tangent_numerator_bound_M_R",
    M_G: "candidate_M_G_bound",
    nu_J: "center_jacobian_lower_bound_nu_J",
    L_J: "jacobian_lipschitz_bound_L_J",
    rho_X: "rho_X",
    r_X: "r_X",
  };

  assert.deepEqual(validateH39UpstreamSourceComposition(artifact), []);
  assert.equal(
    evaluatorArtifact.evaluator_source_certificate_report.status,
    "h39-evaluator-source-certificates-emitted"
  );
  assert.equal(
    evaluatorArtifact.h39_K_epsilon_branch_coordinate_witness_set
      .result.h39_K_epsilon_branch_coordinate_witness_set,
    true
  );
  assert.equal(
    artifact.K_epsilon_majorant_witness_replay.result
      .h39_K_epsilon_majorant_witness,
    true
  );
  assert.equal(
    artifact.L_J_kernel_witness_subset_replay.result
      .h39_L_J_component_witness,
    true
  );
  assert.equal(
    artifact.graph_radii_witness_subset_replay.result
      .h39_rho_X_component_witness,
    true
  );
  assert.equal(
    artifact.graph_radii_witness_subset_replay.result
      .h39_r_X_component_witness,
    true
  );
  assert.equal(
    artifact.component_subset_composition_replay.result
      .h39_continuous_tail_certificate,
    true
  );
  assert.equal(
    artifact.primitive_provenance_certificate_replay.result
      .h39_continuous_tail_certificate,
    true
  );
  assert.equal(
    artifact.certified_seven_input_primitive_witness.result
      .h39_seven_input_primitive_witness,
    true
  );
  assert.equal(
    artifact.certified_seven_input_primitive_witness
      .component_witness_families.L_J,
    "x_lipschitz_kernel"
  );
  assert.equal(
    artifact.composition_status,
    H39_UPSTREAM_SOURCE_COMPOSITION_CERTIFIED_STATUS
  );
  assert.equal(
    artifact.claim_boundary.consumes_K_epsilon_branch_coordinate_witnesses,
    true
  );
  assert.equal(
    artifact.source_graph_radii_witness,
    evaluatorArtifact.graph_radii_witness
  );
  assert.equal(
    synthesizedBackend.backend_scope
      .synthesized_from_component_subset_provenance,
    true
  );
  for (const [component, inputField] of Object.entries(
    primitiveInputFields
  )) {
    assert.equal(
      synthesizedInput[inputField],
      componentProvenance[component].value
    );
  }
  assert.equal(
    synthesizedInput.rho_X,
    rhoX
  );
  assert.equal(
    synthesizedInput.r_X,
    rX
  );
  assert.ok(synthesizedInput.jacobian_lipschitz_bound_L_J > 0);
  assert.notEqual(
    synthesizedInput.jacobian_lipschitz_bound_L_J,
    Number.MIN_VALUE
  );
  assert.equal(artifact.result.h39_full_primitive_vector_certificate, false);
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(JSON.stringify(artifact).includes("speed_band"), false);
});

test("h39 upstream source composition closes from a full coefficient artifact", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const coefficientArtifact = h39SharedDomainCoefficientArtifact({
    coordinateCauchyOuterRadius: 0.9,
    coordinateJacobianOuterRadius: 0.9,
    coordinateJacobianNumeratorOuterRadius: 1.35,
    denominatorCauchyOuterRadius: 0.5,
    sharedDomainSignature: domainSignature,
    rhoX: 0.01,
    rX: 0.008,
  });
  const coefficientCell =
    coefficientArtifact.h39_shared_domain_coefficient_rows[0]
      .h39_coefficient_cell;
  coefficientArtifact.h39_primitive_vector_backend_artifact =
    primitiveVectorBackendArtifact({
      bounds: {
        ...CLOSING_PRIMITIVE_BOUNDS,
        rX: 0.007,
      },
    });

  const artifact = buildH39UpstreamSourceComposition({
    sharedDomainEvaluatorArtifact: coefficientArtifact,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39UpstreamSourceComposition(artifact), []);
  assert.equal(
    artifact.source_shared_domain_evaluator_artifact,
    coefficientArtifact
  );
  assert.equal(
    artifact.source_primitive_vector_backend_artifact,
    null
  );
  assert.equal(
    artifact.source_coordinate_cauchy_outer_bounds_profile_candidate,
    coefficientCell.coordinate_cauchy_outer_bounds_profile_candidate
  );
  assert.equal(
    artifact.source_denominator_cauchy_N_G_outer_bound_candidate,
    coefficientCell.denominator_cauchy_n_g_outer_bound_candidate
  );
  assert.equal(
    artifact.source_K_epsilon_branch_coordinate_witness_set,
    coefficientCell.h39_K_epsilon_branch_coordinate_witness_set
  );
  assert.equal(
    artifact.source_graph_radii_witness,
    coefficientArtifact.graph_radii_witness
  );
  assert.equal(
    artifact.K_epsilon_majorant_witness_replay.result
      .h39_K_epsilon_majorant_witness,
    true
  );
  assert.equal(
    artifact.component_subset_composition_replay.result
      .h39_continuous_tail_certificate,
    true
  );
  assert.equal(
    artifact.component_subset_composition_replay
      .source_primitive_vector_backend_artifact.backend_scope
      .synthesized_from_component_subset_provenance,
    true
  );
  assert.equal(
    artifact.primitive_provenance_certificate_replay.result
      .h39_continuous_tail_certificate,
    true
  );
  assert.equal(
    artifact.certified_seven_input_primitive_witness.result
      .h39_seven_input_primitive_witness,
    true
  );
  assert.equal(
    artifact.certified_seven_input_primitive_witness.witness_scope
      .primitive_vector,
    "(E_R,M_R,M_G,nu_J,L_J,rho_X,r_X; shared_domain_signature)"
  );
  assert.equal(
    artifact.composition_status,
    H39_UPSTREAM_SOURCE_COMPOSITION_CERTIFIED_STATUS
  );
  assert.equal(
    artifact.claim_boundary.consumes_shared_domain_evaluator_artifact,
    true
  );
  assert.equal(
    artifact.claim_boundary.certifies_directed_rounded_fold_pair_scaled_remainder,
    false
  );
  assert.equal(
    artifact.claim_boundary.certifies_I1_regular_critical_exhaustion,
    false
  );
  assert.equal(artifact.result.h39_full_primitive_vector_certificate, false);
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(JSON.stringify(artifact).includes("speed_band"), false);
});

test("h39 upstream source composition closes from a multi-row coefficient artifact cover", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const coefficientArtifact = h39SharedDomainCoefficientArtifact({
    h38Rows: [
      h39EvaluatorH38Row({ cellId: "speed.test.first-y.a" }),
      h39EvaluatorH38Row({
        cellId: "speed.test.first-y.b",
        hScale: 1.02,
      }),
    ],
    coordinateCauchyOuterRadius: 0.9,
    coordinateJacobianOuterRadius: 0.9,
    coordinateJacobianNumeratorOuterRadius: 1.35,
    denominatorCauchyOuterRadius: 0.5,
    sharedDomainSignature: domainSignature,
    rhoX: 0.01,
    rX: 0.008,
  });

  const artifact = buildH39UpstreamSourceComposition({
    sharedDomainEvaluatorArtifact: coefficientArtifact,
    sharedDomainSignature: domainSignature,
  });

  assert.equal(
    coefficientArtifact.h39_shared_domain_coefficient_rows.length,
    2
  );
  assert.deepEqual(validateH39UpstreamSourceComposition(artifact), []);
  assert.equal(
    artifact.source_coordinate_cauchy_outer_bounds_profile_candidate
      .evaluation_level,
    "aggregate-coefficient-artifact-coordinate-cauchy-outer-bound"
  );
  assert.equal(
    artifact.source_coordinate_cauchy_outer_bounds_profile_candidate
      .aggregate_source_cell_count,
    2
  );
  assert.equal(
    artifact.source_denominator_cauchy_N_G_outer_bound_candidate
      .evaluation_level,
    "selected-coefficient-artifact-denominator-cauchy-n-g-outer-bound"
  );
  assert.equal(
    artifact.source_denominator_cauchy_N_G_outer_bound_candidate
      .aggregate_source_rule,
    "selects the emitted coefficient-cell denominator-Cauchy source with maximal certified N_G outer bound; no synthetic branch-sum source is formed"
  );
  assert.equal(
    artifact.source_K_epsilon_branch_coordinate_witness_set
      .branch_coordinate_witnesses.length,
    2
  );
  assert.equal(
    artifact.source_K_epsilon_branch_coordinate_witness_set
      .aggregate_source_rule,
    "all emitted coefficient-cell K_epsilon branch witnesses feed one max-over-branches K_epsilon replay"
  );
  assert.equal(
    artifact.component_subset_composition_replay.result
      .h39_continuous_tail_certificate,
    true
  );
  assert.equal(
    artifact.certified_seven_input_primitive_witness.result
      .h39_seven_input_primitive_witness,
    true
  );
  assert.equal(
    artifact.certified_seven_input_primitive_witness.claim_boundary
      .certifies_directed_rounded_fold_pair_scaled_remainder,
    false
  );
  assert.equal(
    artifact.composition_status,
    H39_UPSTREAM_SOURCE_COMPOSITION_CERTIFIED_STATUS
  );
  assert.equal(
    artifact.claim_boundary
      .certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound,
    true
  );
  assert.equal(
    artifact.claim_boundary.certifies_directed_rounded_fold_pair_scaled_remainder,
    false
  );
  assert.equal(
    artifact.claim_boundary.certifies_I1_regular_critical_exhaustion,
    false
  );
  assert.equal(artifact.result.h39_full_primitive_vector_certificate, false);
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(JSON.stringify(artifact).includes("speed_band"), false);
});

test("h39 upstream source composition keeps mixed-radius multi-row coefficient artifacts open", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const coefficientArtifact = h39SharedDomainCoefficientArtifact({
    h38Rows: [
      h39EvaluatorH38Row({ cellId: "speed.test.first-y.a" }),
      h39EvaluatorH38Row({
        cellId: "speed.test.first-y.b",
        hScale: 1.02,
      }),
    ],
    coordinateCauchyOuterRadius: 0.9,
    coordinateJacobianOuterRadius: 0.9,
    coordinateJacobianNumeratorOuterRadius: 1.35,
    denominatorCauchyOuterRadius: 0.5,
    sharedDomainSignature: domainSignature,
    rhoX: 0.01,
    rX: 0.008,
  });
  coefficientArtifact.h39_shared_domain_coefficient_rows[1].h39_coefficient_cell
    .coordinate_cauchy_outer_bounds_profile_candidate.r43_cauchy_outer_radius =
    0.95;

  const artifact = buildH39UpstreamSourceComposition({
    sharedDomainEvaluatorArtifact: coefficientArtifact,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39UpstreamSourceComposition(artifact), []);
  assert.equal(
    artifact.predicate_check.failed_predicates.includes(
      "coordinate_cauchy_components_certified"
    ),
    true
  );
  assert.equal(
    artifact.source_coordinate_cauchy_outer_bounds_profile_candidate,
    null
  );
  assert.equal(artifact.result.h39_continuous_tail_certificate, false);
  assert.equal(
    artifact.no_go_theorem.promotion_obstruction,
    "coordinate_cauchy_components_certified"
  );
});

test("h39 upstream source composition rejects coefficient artifact speed-band drift", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const coefficientArtifact = h39SharedDomainCoefficientArtifact({
    coordinateCauchyOuterRadius: 0.9,
    coordinateJacobianOuterRadius: 0.9,
    coordinateJacobianNumeratorOuterRadius: 1.35,
    denominatorCauchyOuterRadius: 0.5,
    sharedDomainSignature: domainSignature,
    rhoX: 0.01,
    rX: 0.008,
  });
  coefficientArtifact.speed_band = [0.5, 1.5];

  const artifact = buildH39UpstreamSourceComposition({
    sharedDomainEvaluatorArtifact: coefficientArtifact,
    sharedDomainSignature: domainSignature,
  });

  assert.equal(
    artifact.predicate_check.failed_predicates.includes(
      "no_fixed_speed_window"
    ),
    true
  );
  assert.equal(artifact.result.h39_continuous_tail_certificate, false);
  assert.match(
    validateH39UpstreamSourceComposition(artifact).join("\n"),
    /must not contain speed-band fields/
  );
});

test("h39 upstream source composition rejects coefficient artifact graph-radii value drift", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const coefficientArtifact = h39SharedDomainCoefficientArtifact({
    coordinateCauchyOuterRadius: 0.9,
    coordinateJacobianOuterRadius: 0.9,
    coordinateJacobianNumeratorOuterRadius: 1.35,
    denominatorCauchyOuterRadius: 0.5,
    sharedDomainSignature: domainSignature,
    rhoX: 0.01,
    rX: 0.008,
  });
  const baseline = buildH39UpstreamSourceComposition({
    sharedDomainEvaluatorArtifact: coefficientArtifact,
    sharedDomainSignature: domainSignature,
  });
  const explicitBackend = clone(
    baseline.component_subset_composition_replay
      .source_primitive_vector_backend_artifact
  );
  const driftedCoefficientArtifact = clone(coefficientArtifact);
  driftedCoefficientArtifact.graph_radii_witness =
    buildH39EvaluatorGraphRadiiWitness({
      rhoX: 0.01,
      rX: 0.009,
      sharedDomainSignature: domainSignature,
    });

  const artifact = buildH39UpstreamSourceComposition({
    primitiveVectorBackendArtifact: explicitBackend,
    sharedDomainEvaluatorArtifact: driftedCoefficientArtifact,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39UpstreamSourceComposition(artifact), []);
  assert.equal(
    artifact.predicate_check.checks.component_subset_composition_closes,
    false
  );
  assert.equal(
    artifact.predicate_check.failed_predicates.includes(
      "component_subset_composition_closes"
    ),
    true
  );
  assert.equal(
    artifact.component_subset_composition_replay
      .primitive_provenance_certificate_replay.same_domain_provenance_check
      .status,
    "open-provenance-value-mismatch"
  );
  assert.deepEqual(
    artifact.component_subset_composition_replay
      .primitive_provenance_certificate_replay.same_domain_provenance_check
      .mismatched_values,
    ["r_X"]
  );
  assert.equal(artifact.result.h39_continuous_tail_certificate, false);
  assert.equal(
    artifact.no_go_theorem.promotion_obstruction,
    "component_subset_composition_closes"
  );
});

test("h39 upstream source composition rejects evaluator graph-radii value drift", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const evaluatorArtifact = h39SharedDomainEvaluatorArtifact({
    coordinateCauchyOuterRadius: 0.9,
    coordinateJacobianOuterRadius: 0.9,
    coordinateJacobianNumeratorOuterRadius: 1.35,
    denominatorCauchyOuterRadius: 0.5,
    sharedDomainSignature: domainSignature,
    rhoX: 0.01,
    rX: 0.008,
  });
  const baseline = buildH39UpstreamSourceComposition({
    sharedDomainEvaluatorArtifact: evaluatorArtifact,
    sharedDomainSignature: domainSignature,
  });
  const explicitBackend = clone(
    baseline.component_subset_composition_replay
      .source_primitive_vector_backend_artifact
  );
  const driftedEvaluatorArtifact = clone(evaluatorArtifact);
  driftedEvaluatorArtifact.graph_radii_witness =
    buildH39EvaluatorGraphRadiiWitness({
      rhoX: 0.01,
      rX: 0.009,
      sharedDomainSignature: domainSignature,
    });

  const artifact = buildH39UpstreamSourceComposition({
    primitiveVectorBackendArtifact: explicitBackend,
    sharedDomainEvaluatorArtifact: driftedEvaluatorArtifact,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39UpstreamSourceComposition(artifact), []);
  assert.equal(
    artifact.predicate_check.checks.component_subset_composition_closes,
    false
  );
  assert.equal(
    artifact.predicate_check.failed_predicates.includes(
      "component_subset_composition_closes"
    ),
    true
  );
  assert.equal(
    artifact.component_subset_composition_replay
      .primitive_provenance_certificate_replay.same_domain_provenance_check
      .status,
    "open-provenance-value-mismatch"
  );
  assert.deepEqual(
    artifact.component_subset_composition_replay
      .primitive_provenance_certificate_replay.same_domain_provenance_check
      .mismatched_values,
    ["r_X"]
  );
  assert.equal(
    artifact.result.h39_continuous_tail_certificate,
    false
  );
  assert.equal(
    artifact.no_go_theorem.promotion_obstruction,
    "component_subset_composition_closes"
  );
});

test("h39 upstream source composition remains open when an upstream wrapper is open", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const domainSignature = h39PrimitiveDomainSignature();
  const {
    coordinateSource,
    r43Profile,
    jacobianProfile,
    denominatorSource,
    nGProfile,
    kernelMajorantArtifact,
    kernelMajorantWitness,
    graphRadiiWitness,
  } = h39CertifiedUpstreamSources({
    domainSignature,
    coordinateDirectedRounded: false,
  });

  const artifact = buildH39UpstreamSourceComposition({
    primitiveVectorBackendArtifact: primitiveVector,
    coordinateCauchyOuterBoundsProfileCandidate: coordinateSource,
    r43AnalyticProfileWitness: r43Profile,
    jacobianFloorWitness: jacobianProfile,
    denominatorCauchyNGOuterBoundCandidate: denominatorSource,
    nGOuterBoundMGProfile: nGProfile,
    kernelMajorantArtifact,
    kernelMajorantWitness,
    graphRadiiWitness,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39UpstreamSourceComposition(artifact), []);
  assert.equal(
    artifact.composition_status,
    H39_UPSTREAM_SOURCE_COMPOSITION_OPEN_STATUS
  );
  assert.equal(
    artifact.predicate_check.failed_predicates.includes(
    "coordinate_cauchy_components_certified"
    ),
    true
  );
  assert.equal(
    artifact.component_subset_composition_replay.result
      .h39_continuous_tail_certificate,
    false
  );
  assert.equal(
    artifact.no_go_theorem.promotion_obstruction,
    "coordinate_cauchy_components_certified"
  );
});

test("h39 upstream source composition records denominator-Cauchy source obstruction", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const domainSignature = h39PrimitiveDomainSignature();
  const {
    coordinateSource,
    r43Profile,
    jacobianProfile,
    denominatorSource,
    nGProfile,
    kernelMajorantArtifact,
    kernelMajorantWitness,
    graphRadiiWitness,
  } = h39CertifiedUpstreamSources({
    domainSignature,
    denominatorDirectedRounded: false,
  });

  const artifact = buildH39UpstreamSourceComposition({
    primitiveVectorBackendArtifact: primitiveVector,
    coordinateCauchyOuterBoundsProfileCandidate: coordinateSource,
    r43AnalyticProfileWitness: r43Profile,
    jacobianFloorWitness: jacobianProfile,
    denominatorCauchyNGOuterBoundCandidate: denominatorSource,
    nGOuterBoundMGProfile: nGProfile,
    kernelMajorantArtifact,
    kernelMajorantWitness,
    graphRadiiWitness,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39UpstreamSourceComposition(artifact), []);
  assert.equal(
    artifact.composition_status,
    H39_UPSTREAM_SOURCE_COMPOSITION_OPEN_STATUS
  );
  assert.equal(
    artifact.predicate_check.failed_predicates.includes(
      "denominator_cauchy_M_G_component_certified"
    ),
    true
  );
  assert.equal(
    artifact.N_G_denominator_cauchy_M_G_witness_replay.predicate_check
      .failed_predicates.includes(
        "directed_rounded_denominator_cauchy_source"
      ),
    true
  );
  assert.equal(artifact.result.h39_continuous_tail_certificate, false);
});

test("h39 upstream source composition blocks bad K_epsilon branch replay", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const domainSignature = h39PrimitiveDomainSignature();
  const {
    coordinateSource,
    r43Profile,
    jacobianProfile,
    denominatorSource,
    nGProfile,
    kernelMajorantArtifact,
    graphRadiiWitness,
  } = h39CertifiedUpstreamSources({ domainSignature });
  const branchWitnesses = h39KepsilonBranchCoordinateWitnesses({
    domainSignature,
  });
  branchWitnesses[0].outward_rounded_transcendentals = false;

  const artifact = buildH39UpstreamSourceComposition({
    primitiveVectorBackendArtifact: primitiveVector,
    coordinateCauchyOuterBoundsProfileCandidate: coordinateSource,
    r43AnalyticProfileWitness: r43Profile,
    jacobianFloorWitness: jacobianProfile,
    denominatorCauchyNGOuterBoundCandidate: denominatorSource,
    nGOuterBoundMGProfile: nGProfile,
    kernelMajorantArtifact,
    kernelMajorantWitness: null,
    branchCoordinateWitnesses: branchWitnesses,
    graphRadiiWitness,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39UpstreamSourceComposition(artifact), []);
  assert.equal(
    artifact.composition_status,
    H39_UPSTREAM_SOURCE_COMPOSITION_OPEN_STATUS
  );
  assert.equal(
    artifact.predicate_check.failed_predicates.includes(
      "K_epsilon_majorant_replay_certified"
    ),
    true
  );
  assert.equal(
    artifact.K_epsilon_majorant_witness_replay.predicate_check
      .failed_predicates.includes("-:outward_rounded_transcendentals"),
    true
  );
  assert.equal(
    artifact.L_J_kernel_witness_subset_replay.result
      .h39_L_J_component_witness,
    false
  );
  assert.equal(artifact.result.h39_continuous_tail_certificate, false);
});

test("h39 upstream source composition records missing kernel witness obstruction", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const domainSignature = h39PrimitiveDomainSignature();
  const {
    coordinateSource,
    r43Profile,
    jacobianProfile,
    denominatorSource,
    nGProfile,
    kernelMajorantArtifact,
    graphRadiiWitness,
  } = h39CertifiedUpstreamSources({ domainSignature });

  const artifact = buildH39UpstreamSourceComposition({
    primitiveVectorBackendArtifact: primitiveVector,
    coordinateCauchyOuterBoundsProfileCandidate: coordinateSource,
    r43AnalyticProfileWitness: r43Profile,
    jacobianFloorWitness: jacobianProfile,
    denominatorCauchyNGOuterBoundCandidate: denominatorSource,
    nGOuterBoundMGProfile: nGProfile,
    kernelMajorantArtifact,
    kernelMajorantWitness: null,
    graphRadiiWitness,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39UpstreamSourceComposition(artifact), []);
  assert.equal(
    artifact.composition_status,
    H39_UPSTREAM_SOURCE_COMPOSITION_OPEN_STATUS
  );
  assert.equal(
    artifact.predicate_check.failed_predicates.includes(
      "L_J_component_certified"
    ),
    true
  );
  assert.equal(
    artifact.L_J_kernel_witness_subset_replay.predicate_check
      .failed_predicates.includes("kernel-majorant-witness-missing"),
    true
  );
  assert.equal(artifact.result.h39_continuous_tail_certificate, false);
});

test("h39 upstream source composition records upstream domain mismatch", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const domainSignature = h39PrimitiveDomainSignature();
  const wrongDomain = {
    ...domainSignature,
    center_graph: "wrong-h39-center",
  };
  const {
    coordinateSource,
    r43Profile,
    jacobianProfile,
    denominatorSource,
    nGProfile,
    kernelMajorantArtifact,
    kernelMajorantWitness,
  } = h39CertifiedUpstreamSources({ domainSignature });
  const graphRadiiWitness = h39GraphRadiiWitness({
    domainSignature: wrongDomain,
    directedRounded: true,
  });

  const artifact = buildH39UpstreamSourceComposition({
    primitiveVectorBackendArtifact: primitiveVector,
    coordinateCauchyOuterBoundsProfileCandidate: coordinateSource,
    r43AnalyticProfileWitness: r43Profile,
    jacobianFloorWitness: jacobianProfile,
    denominatorCauchyNGOuterBoundCandidate: denominatorSource,
    nGOuterBoundMGProfile: nGProfile,
    kernelMajorantArtifact,
    kernelMajorantWitness,
    graphRadiiWitness,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39UpstreamSourceComposition(artifact), []);
  assert.equal(
    artifact.predicate_check.failed_predicates.includes(
      "all_upstream_sources_on_shared_domain"
    ),
    true
  );
  assert.deepEqual(artifact.predicate_check.domain_mismatch_sources, [
    "graph_radii",
  ]);
  assert.equal(artifact.result.h39_continuous_tail_certificate, false);
});

test("h39 upstream source composition keeps value-coverage failures in the component replay", () => {
  const primitiveVector = primitiveVectorBackendArtifact({
    bounds: {
      ...CLOSING_PRIMITIVE_BOUNDS,
      rhoX: 4,
    },
  });
  const domainSignature = h39PrimitiveDomainSignature();
  const {
    coordinateSource,
    r43Profile,
    jacobianProfile,
    denominatorSource,
    nGProfile,
    kernelMajorantArtifact,
    kernelMajorantWitness,
    graphRadiiWitness,
  } = h39CertifiedUpstreamSources({ domainSignature });

  const artifact = buildH39UpstreamSourceComposition({
    primitiveVectorBackendArtifact: primitiveVector,
    coordinateCauchyOuterBoundsProfileCandidate: coordinateSource,
    r43AnalyticProfileWitness: r43Profile,
    jacobianFloorWitness: jacobianProfile,
    denominatorCauchyNGOuterBoundCandidate: denominatorSource,
    nGOuterBoundMGProfile: nGProfile,
    kernelMajorantArtifact,
    kernelMajorantWitness,
    graphRadiiWitness,
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39UpstreamSourceComposition(artifact), []);
  assert.equal(
    artifact.predicate_check.failed_predicates.includes(
      "component_subset_composition_closes"
    ),
    true
  );
  assert.equal(
    artifact.component_subset_composition_replay
      .primitive_provenance_certificate_replay.result
      .promotion_obstruction,
    "open-provenance-value-mismatch"
  );
  assert.deepEqual(
    artifact.component_subset_composition_replay
      .primitive_provenance_certificate_replay
      .same_domain_provenance_check.value_mismatch_components,
    ["rho_X"]
  );
  assert.equal(artifact.result.h39_continuous_tail_certificate, false);
});

test("h39 upstream source composition validator rejects overclaim and speed-band drift", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const domainSignature = h39PrimitiveDomainSignature();
  const {
    coordinateSource,
    r43Profile,
    jacobianProfile,
    denominatorSource,
    nGProfile,
    kernelMajorantArtifact,
    kernelMajorantWitness,
    graphRadiiWitness,
  } = h39CertifiedUpstreamSources({ domainSignature });
  const artifact = buildH39UpstreamSourceComposition({
    primitiveVectorBackendArtifact: primitiveVector,
    coordinateCauchyOuterBoundsProfileCandidate: coordinateSource,
    r43AnalyticProfileWitness: r43Profile,
    jacobianFloorWitness: jacobianProfile,
    denominatorCauchyNGOuterBoundCandidate: denominatorSource,
    nGOuterBoundMGProfile: nGProfile,
    kernelMajorantArtifact,
    kernelMajorantWitness,
    graphRadiiWitness,
    sharedDomainSignature: domainSignature,
  });
  artifact.result.retained_branch = true;
  artifact.claim_boundary.certifies_I1_regular_critical_exhaustion = true;

  assert.match(
    validateH39UpstreamSourceComposition(artifact).join("\n"),
    /must not certify the full primitive vector, scaled remainder, I1, or retained branch status|result must match a fresh rebuild/
  );

  const speedArtifact = buildH39UpstreamSourceComposition({
    primitiveVectorBackendArtifact: primitiveVector,
    coordinateCauchyOuterBoundsProfileCandidate: coordinateSource,
    r43AnalyticProfileWitness: r43Profile,
    jacobianFloorWitness: jacobianProfile,
    denominatorCauchyNGOuterBoundCandidate: denominatorSource,
    nGOuterBoundMGProfile: nGProfile,
    kernelMajorantArtifact,
    kernelMajorantWitness,
    graphRadiiWitness,
    sharedDomainSignature: domainSignature,
  });
  speedArtifact.source_denominator_cauchy_N_G_outer_bound_candidate.speed_band =
    [0.5, 1.5];

  assert.match(
    validateH39UpstreamSourceComposition(speedArtifact).join("\n"),
    /must not contain speed-band fields/
  );
});

test("h39 upstream source composition validator rejects embedded replay drift", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const domainSignature = h39PrimitiveDomainSignature();
  const {
    coordinateSource,
    r43Profile,
    jacobianProfile,
    denominatorSource,
    nGProfile,
    kernelMajorantArtifact,
    kernelMajorantWitness,
    graphRadiiWitness,
  } = h39CertifiedUpstreamSources({ domainSignature });
  const artifact = buildH39UpstreamSourceComposition({
    primitiveVectorBackendArtifact: primitiveVector,
    coordinateCauchyOuterBoundsProfileCandidate: coordinateSource,
    r43AnalyticProfileWitness: r43Profile,
    jacobianFloorWitness: jacobianProfile,
    denominatorCauchyNGOuterBoundCandidate: denominatorSource,
    nGOuterBoundMGProfile: nGProfile,
    kernelMajorantArtifact,
    kernelMajorantWitness,
    graphRadiiWitness,
    sharedDomainSignature: domainSignature,
  });
  artifact.graph_radii_witness_subset_replay.result
    .h39_r_X_component_witness = false;

  assert.match(
    validateH39UpstreamSourceComposition(artifact).join("\n"),
    /embedded component-subset composition replay must validate|graph replay must match a fresh rebuild/
  );
});

test("h39 K_epsilon majorant witness records current kernel row as open", () => {
  const artifact = buildH39KepsilonMajorantWitness({
    sourceKernelMajorantArtifact: h39KernelMajorantArtifact(),
    sharedDomainSignature: h39PrimitiveDomainSignature(),
  });

  assert.deepEqual(validateH39KepsilonMajorantWitness(artifact), []);
  assert.equal(artifact.schema, H39_KEPSILON_MAJORANT_WITNESS_SCHEMA);
  assert.equal(
    artifact.witness_status,
    H39_KEPSILON_MAJORANT_WITNESS_OPEN_STATUS
  );
  assert.equal(artifact.kernel_majorant_witness, null);
  assert.equal(
    artifact.predicate_check.failed_predicates.includes(
      "branch-coordinate-witnesses-missing"
    ),
    true
  );
  assert.equal(
    artifact.L_J_subset_replay.witness_subset_status,
    H39_LJ_KERNEL_WITNESS_SUBSET_OPEN_STATUS
  );
  assert.equal(artifact.result.h39_K_epsilon_majorant_witness, false);
  assert.equal(artifact.result.h39_L_J_component_witness, false);
});

test("h39 K_epsilon majorant witness certifies only M_K from complete directed-rounded inputs", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const artifact = buildH39KepsilonMajorantWitness({
    sourceKernelMajorantArtifact: h39KernelMajorantArtifact(),
    branchCoordinateWitnesses: h39KepsilonBranchCoordinateWitnesses({
      domainSignature,
    }),
    sharedDomainSignature: domainSignature,
    rho: 0.1,
  });

  assert.deepEqual(validateH39KepsilonMajorantWitness(artifact), []);
  assert.equal(
    artifact.witness_status,
    H39_KEPSILON_MAJORANT_WITNESS_CERTIFIED_STATUS
  );
  assert.equal(artifact.kernel_majorant_witness.component, "M_K");
  assert.equal(
    artifact.kernel_majorant_witness.certifies_directed_rounded,
    true
  );
  assert.equal(
    artifact.claim_boundary.certifies_directed_rounded_K_epsilon_majorant,
    true
  );
  assert.equal(
    artifact.claim_boundary.certifies_directed_rounded_L_J_component_witness,
    false
  );
  assert.equal(artifact.result.h39_K_epsilon_majorant_witness, true);
  assert.equal(artifact.result.h39_L_J_component_witness, false);
  assert.equal(
    artifact.L_J_subset_replay.result.h39_L_J_component_witness,
    true
  );
  assert.equal(
    artifact.L_J_subset_replay.result.h39_full_primitive_vector_certificate,
    false
  );
});

test("h39 K_epsilon majorant witness reports exact missing transcendental predicate", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const witnesses = h39KepsilonBranchCoordinateWitnesses({
    domainSignature,
  });
  witnesses[0].outward_rounded_transcendentals = false;
  const artifact = buildH39KepsilonMajorantWitness({
    sourceKernelMajorantArtifact: h39KernelMajorantArtifact(),
    branchCoordinateWitnesses: witnesses,
    sharedDomainSignature: domainSignature,
    rho: 0.1,
  });

  assert.deepEqual(validateH39KepsilonMajorantWitness(artifact), []);
  assert.equal(
    artifact.witness_status,
    H39_KEPSILON_MAJORANT_WITNESS_OPEN_STATUS
  );
  assert.equal(
    artifact.predicate_check.failed_predicates.includes(
      "-:outward_rounded_transcendentals"
    ),
    true
  );
  assert.equal(artifact.kernel_majorant_witness, null);
});

test("h39 K_epsilon majorant witness requires sinh envelope proof fields", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const witnesses = h39KepsilonBranchCoordinateWitnesses({
    domainSignature,
  });
  delete witnesses[0].sinh_delta_taylor_majorant;
  const artifact = buildH39KepsilonMajorantWitness({
    sourceKernelMajorantArtifact: h39KernelMajorantArtifact(),
    branchCoordinateWitnesses: witnesses,
    sharedDomainSignature: domainSignature,
    rho: 0.1,
  });

  assert.deepEqual(validateH39KepsilonMajorantWitness(artifact), []);
  assert.equal(
    artifact.witness_status,
    H39_KEPSILON_MAJORANT_WITNESS_OPEN_STATUS
  );
  assert.equal(
    artifact.predicate_check.failed_predicates.includes(
      "-:delta_sinh_upper_envelope_certified"
    ),
    true
  );
  assert.equal(artifact.kernel_majorant_witness, null);
});

test("h39 K_epsilon majorant witness requires coordinate Cauchy envelope proof fields", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const witnesses = h39KepsilonBranchCoordinateWitnesses({
    domainSignature,
  });
  delete witnesses[0].delta_coordinate_cauchy_envelope;
  const artifact = buildH39KepsilonMajorantWitness({
    sourceKernelMajorantArtifact: h39KernelMajorantArtifact(),
    branchCoordinateWitnesses: witnesses,
    sharedDomainSignature: domainSignature,
    rho: 0.1,
  });

  assert.deepEqual(validateH39KepsilonMajorantWitness(artifact), []);
  assert.equal(
    artifact.witness_status,
    H39_KEPSILON_MAJORANT_WITNESS_OPEN_STATUS
  );
  assert.equal(
    artifact.predicate_check.failed_predicates.includes(
      "-:delta_coordinate_cauchy_envelope_certified"
    ),
    true
  );
  assert.equal(artifact.kernel_majorant_witness, null);
});

test("h39 K_epsilon majorant witness rejects malformed coordinate Cauchy envelope", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const witnesses = h39KepsilonBranchCoordinateWitnesses({
    domainSignature,
  });
  witnesses[0].delta_coordinate_cauchy_envelope.prefix_plus_tail_majorant =
    0.01;
  const artifact = buildH39KepsilonMajorantWitness({
    sourceKernelMajorantArtifact: h39KernelMajorantArtifact(),
    branchCoordinateWitnesses: witnesses,
    sharedDomainSignature: domainSignature,
    rho: 0.1,
  });

  assert.deepEqual(validateH39KepsilonMajorantWitness(artifact), []);
  assert.equal(
    artifact.predicate_check.failed_predicates.includes(
      "-:delta_coordinate_cauchy_envelope_certified"
    ),
    true
  );
  assert.equal(
    artifact.branch_witness_checks[0].delta_coordinate_cauchy_envelope_check
      .failed_predicates.includes("supplied_majorant_matches_envelope"),
    true
  );
  assert.equal(artifact.kernel_majorant_witness, null);

  const qWitnesses = h39KepsilonBranchCoordinateWitnesses({
    domainSignature,
  });
  qWitnesses[0].delta_coordinate_cauchy_envelope.tail_ratio_bound = 1;
  const qArtifact = buildH39KepsilonMajorantWitness({
    sourceKernelMajorantArtifact: h39KernelMajorantArtifact(),
    branchCoordinateWitnesses: qWitnesses,
    sharedDomainSignature: domainSignature,
    rho: 0.1,
  });
  assert.equal(
    qArtifact.branch_witness_checks[0].delta_coordinate_cauchy_envelope_check
      .failed_predicates.includes("tail_ratio_strictly_below_one"),
    true
  );
  assert.equal(qArtifact.kernel_majorant_witness, null);
});

test("h39 K_epsilon majorant witness validator rejects domain-mismatch drift", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const artifact = buildH39KepsilonMajorantWitness({
    sourceKernelMajorantArtifact: h39KernelMajorantArtifact(),
    branchCoordinateWitnesses: h39KepsilonBranchCoordinateWitnesses({
      domainSignature,
    }),
    sharedDomainSignature: domainSignature,
    rho: 0.1,
  });
  artifact.branch_coordinate_witnesses[0].domain_signature = {
    ...domainSignature,
    center_graph: "wrong-center",
  };

  assert.match(
    validateH39KepsilonMajorantWitness(artifact).join("\n"),
    /status must match|predicate check must match a fresh rebuild/
  );
});

test("h39 K_epsilon majorant witness validator rejects overclaim drift", () => {
  const artifact = buildH39KepsilonMajorantWitness({
    sourceKernelMajorantArtifact: h39KernelMajorantArtifact(),
    sharedDomainSignature: h39PrimitiveDomainSignature(),
  });
  artifact.provenance_status =
    H39_KEPSILON_MAJORANT_WITNESS_CERTIFIED_STATUS;
  artifact.result.h39_K_epsilon_majorant_witness = true;
  artifact.result.h39_L_J_component_witness = true;

  assert.match(
    validateH39KepsilonMajorantWitness(artifact).join("\n"),
    /status must match|result must match a fresh rebuild|must not emit an M_K certificate/
  );
});

test("h39 K_epsilon majorant witness validator rejects speed-band fields", () => {
  const artifact = buildH39KepsilonMajorantWitness({
    sourceKernelMajorantArtifact: h39KernelMajorantArtifact(),
    sharedDomainSignature: h39PrimitiveDomainSignature(),
  });
  artifact.witness_scope.speed_min = 0.5;

  assert.match(
    validateH39KepsilonMajorantWitness(artifact).join("\n"),
    /must not contain speed-band fields/
  );
});

test("h39 K_epsilon majorant witness validator rejects branch speed-band fields", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const artifact = buildH39KepsilonMajorantWitness({
    sourceKernelMajorantArtifact: h39KernelMajorantArtifact(),
    branchCoordinateWitnesses: h39KepsilonBranchCoordinateWitnesses({
      domainSignature,
    }),
    sharedDomainSignature: domainSignature,
    rho: 0.1,
  });
  artifact.branch_coordinate_witnesses[0].speed_band = [0.5, 1.5];

  assert.match(
    validateH39KepsilonMajorantWitness(artifact).join("\n"),
    /must not contain speed-band fields/
  );
});

test("h39 L_J kernel witness subset records current kernel majorant as open", () => {
  const witnessSubset = buildH39LJKernelWitnessSubset({
    kernelMajorantArtifact: h39KernelMajorantArtifact(),
    sharedDomainSignature: h39PrimitiveDomainSignature(),
  });

  assert.deepEqual(validateH39LJKernelWitnessSubset(witnessSubset), []);
  assert.equal(witnessSubset.schema, H39_LJ_KERNEL_WITNESS_SUBSET_SCHEMA);
  assert.equal(
    witnessSubset.witness_subset_status,
    H39_LJ_KERNEL_WITNESS_SUBSET_OPEN_STATUS
  );
  assert.equal(
    witnessSubset.component_witness.witness_family,
    "x_lipschitz_kernel"
  );
  assert.equal(
    witnessSubset.component_witness.first_failed_promotion_predicate,
    "kernel-majorant-witness-missing"
  );
  assert.equal(
    witnessSubset.component_witness.certifies_directed_rounded,
    false
  );
  assert.equal(
    witnessSubset.predicate_check.failed_predicates.includes(
      "kernel-majorant-witness-missing"
    ),
    true
  );
  assert.equal(
    witnessSubset.claim_boundary
      .certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound,
    false
  );
});

test("h39 L_J kernel witness subset certifies only L_J from directed-rounded M_K", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const witnessSubset = buildH39LJKernelWitnessSubset({
    kernelMajorantArtifact: h39KernelMajorantArtifact(),
    kernelMajorantWitness: h39DirectedRoundedKernelMajorantWitness({
      domainSignature,
    }),
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39LJKernelWitnessSubset(witnessSubset), []);
  assert.equal(
    witnessSubset.witness_subset_status,
    H39_LJ_KERNEL_WITNESS_SUBSET_CERTIFIED_STATUS
  );
  assert.equal(
    witnessSubset.component_provenance.L_J.certificate_status,
    "directed-rounded-certified"
  );
  assert.equal(
    witnessSubset.component_provenance.L_J.value >= 12.5 * 0.1 ** 41,
    true
  );
  assert.equal(
    witnessSubset.claim_boundary
      .certifies_directed_rounded_h39_jacobian_lipschitz_bound,
    true
  );
  assert.equal(
    witnessSubset.result.h39_full_primitive_vector_certificate,
    false
  );
  assert.equal(witnessSubset.result.h39_continuous_tail_certificate, false);
});

test("h39 L_J kernel witness subset validator rejects overclaim drift", () => {
  const witnessSubset = buildH39LJKernelWitnessSubset({
    kernelMajorantArtifact: h39KernelMajorantArtifact(),
    sharedDomainSignature: h39PrimitiveDomainSignature(),
  });
  witnessSubset.component_provenance.L_J.certifies_directed_rounded = true;
  witnessSubset.component_witness.certifies_directed_rounded = true;

  assert.match(
    validateH39LJKernelWitnessSubset(witnessSubset).join("\n"),
    /component must match a fresh rebuild|must remain an explicit failed witness predicate/
  );
});

test("h39 L_J kernel witness subset validator rejects speed-band fields", () => {
  const witnessSubset = buildH39LJKernelWitnessSubset({
    kernelMajorantArtifact: h39KernelMajorantArtifact(),
    sharedDomainSignature: h39PrimitiveDomainSignature(),
  });
  witnessSubset.witness_subset_scope.speed_min = 0.5;

  assert.match(
    validateH39LJKernelWitnessSubset(witnessSubset).join("\n"),
    /must not contain speed-band fields/
  );
});

test("h39 primitive provenance witness set records seven minimal witness predicates", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const witnessSet =
    buildH39PrimitiveProvenanceWitnessSetFromPrimitiveVectorBackendArtifact(
      primitiveVector,
      { sharedDomainSignature: h39PrimitiveDomainSignature() }
    );

  assert.deepEqual(validateH39PrimitiveProvenanceWitnessSet(witnessSet), []);
  assert.equal(
    witnessSet.schema,
    H39_PRIMITIVE_PROVENANCE_WITNESS_SET_SCHEMA
  );
  assert.equal(
    witnessSet.witness_set_status,
    H39_PRIMITIVE_PROVENANCE_WITNESS_SET_STATUS
  );
  assert.deepEqual(witnessSet.witness_set_summary.present_components, [
    "E_R",
    "M_R",
    "M_G",
    "nu_J",
    "L_J",
    "rho_X",
    "r_X",
  ]);
  assert.equal(
    witnessSet.witness_set_summary.conditional_reducer_replay_closes,
    true
  );
  assert.equal(
    witnessSet.component_witnesses.L_J.witness_family,
    "x_lipschitz_kernel"
  );
  assert.equal(
    witnessSet.component_witnesses.M_G.first_failed_promotion_predicate,
    "directed-rounded-same-domain-component-witness-missing"
  );
  assert.equal(
    witnessSet.claim_boundary.narrows_backend_to_minimal_witness_set,
    true
  );

  const certificate = buildH39SharedDomainPrimitiveProvenanceCertificate({
    primitiveVectorBackendArtifact: primitiveVector,
    directedRoundedProvenanceReport: witnessSet,
  });

  assert.equal(
    certificate.same_domain_provenance_check.status,
    H39_PRIMITIVE_PROVENANCE_WITNESS_SET_STATUS
  );
  assert.equal(certificate.result.h39_continuous_tail_certificate, false);
});

test("h39 primitive provenance witness set records missing vector input", () => {
  const primitiveVector = primitiveVectorBackendArtifact({
    inputReady: false,
    missingCandidateComponents: ["E_R", "M_R", "M_G", "nu_J", "L_J"],
  });
  const witnessSet =
    buildH39PrimitiveProvenanceWitnessSetFromPrimitiveVectorBackendArtifact(
      primitiveVector,
      { sharedDomainSignature: h39PrimitiveDomainSignature() }
    );
  const certificate = buildH39SharedDomainPrimitiveProvenanceCertificate({
    primitiveVectorBackendArtifact: primitiveVector,
    directedRoundedProvenanceReport: witnessSet,
  });

  assert.deepEqual(validateH39PrimitiveProvenanceWitnessSet(witnessSet), []);
  assert.deepEqual(witnessSet.witness_set_summary.present_components, []);
  assert.deepEqual(witnessSet.witness_set_summary.missing_components, [
    "E_R",
    "M_R",
    "M_G",
    "nu_J",
    "L_J",
    "rho_X",
    "r_X",
  ]);
  assert.equal(
    witnessSet.component_witnesses.E_R.first_failed_promotion_predicate,
    "primitive-vector-input-missing-or-invalid"
  );
  assert.equal(
    certificate.same_domain_provenance_check.status,
    "open-primitive-vector-input-missing-or-invalid"
  );
});

test("h39 primitive provenance witness set validator rejects overclaim drift", () => {
  const witnessSet =
    buildH39PrimitiveProvenanceWitnessSetFromPrimitiveVectorBackendArtifact(
      primitiveVectorBackendArtifact(),
      { sharedDomainSignature: h39PrimitiveDomainSignature() }
    );

  witnessSet.component_witnesses.M_R.certifies_directed_rounded = true;
  witnessSet.component_provenance.M_R.certifies_directed_rounded = true;

  assert.match(
    validateH39PrimitiveProvenanceWitnessSet(witnessSet).join("\n"),
    /primitive provenance witness M_R must remain an explicit failed witness predicate|primitive provenance witness components must match a fresh rebuild/
  );
});

test("h39 primitive provenance witness set validator rejects speed-band fields", () => {
  const witnessSet =
    buildH39PrimitiveProvenanceWitnessSetFromPrimitiveVectorBackendArtifact(
      primitiveVectorBackendArtifact(),
      { sharedDomainSignature: h39PrimitiveDomainSignature() }
    );

  witnessSet.witness_set_scope.speed_min = 0.5;

  assert.match(
    validateH39PrimitiveProvenanceWitnessSet(witnessSet).join("\n"),
    /must not contain speed-band fields/
  );
});

test("h39 candidate primitive provenance report records complete backend no-go", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const report =
    buildH39CandidatePrimitiveProvenanceReportFromPrimitiveVectorBackendArtifact(
      primitiveVector,
      { sharedDomainSignature: h39PrimitiveDomainSignature() }
    );

  assert.deepEqual(validateH39CandidatePrimitiveProvenanceReport(report), []);
  assert.equal(
    report.schema,
    H39_CANDIDATE_PRIMITIVE_PROVENANCE_REPORT_SCHEMA
  );
  assert.equal(
    report.provenance_status,
    H39_CANDIDATE_ONLY_PRIMITIVE_PROVENANCE_STATUS
  );
  assert.deepEqual(report.candidate_provenance_summary.present_components, [
    "E_R",
    "M_R",
    "M_G",
    "nu_J",
    "L_J",
    "rho_X",
    "r_X",
  ]);
  assert.deepEqual(report.candidate_provenance_summary.missing_components, []);
  assert.equal(
    report.component_provenance.M_G.certifies_directed_rounded,
    false
  );
  assert.equal(
    report.claim_boundary
      .certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound,
    false
  );

  const certificate = buildH39SharedDomainPrimitiveProvenanceCertificate({
    primitiveVectorBackendArtifact: primitiveVector,
    directedRoundedProvenanceReport: report,
  });

  assert.deepEqual(
    validateH39SharedDomainPrimitiveProvenanceCertificate(certificate),
    []
  );
  assert.equal(
    certificate.same_domain_provenance_check.status,
    H39_CANDIDATE_ONLY_PRIMITIVE_PROVENANCE_STATUS
  );
  assert.equal(
    certificate.result.promotion_obstruction,
    H39_CANDIDATE_ONLY_PRIMITIVE_PROVENANCE_STATUS
  );
  assert.equal(certificate.result.h39_continuous_tail_certificate, false);
});

test("h39 candidate primitive provenance report records missing input no-go", () => {
  const primitiveVector = primitiveVectorBackendArtifact({
    inputReady: false,
    missingCandidateComponents: ["E_R", "M_R", "M_G", "nu_J", "L_J"],
  });
  const report =
    buildH39CandidatePrimitiveProvenanceReportFromPrimitiveVectorBackendArtifact(
      primitiveVector,
      { sharedDomainSignature: h39PrimitiveDomainSignature() }
    );
  const certificate = buildH39SharedDomainPrimitiveProvenanceCertificate({
    primitiveVectorBackendArtifact: primitiveVector,
    directedRoundedProvenanceReport: report,
  });

  assert.deepEqual(validateH39CandidatePrimitiveProvenanceReport(report), []);
  assert.deepEqual(report.candidate_provenance_summary.present_components, []);
  assert.deepEqual(report.candidate_provenance_summary.missing_components, [
    "E_R",
    "M_R",
    "M_G",
    "nu_J",
    "L_J",
    "rho_X",
    "r_X",
  ]);
  assert.equal(
    certificate.same_domain_provenance_check.status,
    "open-primitive-vector-input-missing-or-invalid"
  );
  assert.equal(certificate.result.h39_continuous_tail_certificate, false);
});

test("h39 candidate primitive provenance report validator rejects overclaim drift", () => {
  const report =
    buildH39CandidatePrimitiveProvenanceReportFromPrimitiveVectorBackendArtifact(
      primitiveVectorBackendArtifact(),
      { sharedDomainSignature: h39PrimitiveDomainSignature() }
    );

  report.component_provenance.E_R.certifies_directed_rounded = true;
  report.component_provenance.E_R.certificate_status =
    "directed-rounded-certified";

  assert.match(
    validateH39CandidatePrimitiveProvenanceReport(report).join("\n"),
    /candidate primitive provenance component E_R must remain candidate-only|candidate primitive provenance components must match a fresh rebuild/
  );
});

test("h39 candidate primitive provenance report validator rejects speed-band fields", () => {
  const report =
    buildH39CandidatePrimitiveProvenanceReportFromPrimitiveVectorBackendArtifact(
      primitiveVectorBackendArtifact(),
      { sharedDomainSignature: h39PrimitiveDomainSignature() }
    );

  report.speed_window = "0.5-to-1.5";

  assert.match(
    validateH39CandidatePrimitiveProvenanceReport(report).join("\n"),
    /must not contain speed-band fields/
  );
});

test("h39 shared-domain primitive diagnostic validates minimal missing-bound report", () => {
  const packet = buildH39SharedDomainPrimitiveDiagnostic();

  assert.deepEqual(validateH39SharedDomainPrimitiveDiagnostic(packet), []);
  assert.equal(packet.schema, H39_SHARED_DOMAIN_PRIMITIVE_DIAGNOSTIC_SCHEMA);
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.reducer_check.valid, true);
  assert.equal(
    packet.shared_domain_diagnostic_summary.diagnostic_decision,
    "open-missing-primitive-bounds"
  );
  assert.deepEqual(
    packet.shared_domain_diagnostic_summary.missing_explicit_primitive_bounds,
    ["E_R", "nu_J", "L_J", "rho_X", "r_X", "M_G", "M_R"]
  );
  assert.equal(
    packet.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(packet.claim_boundary.retained_branch, false);
  assert.equal(packet.result.retained_branch, false);
});

test("h39 shared-domain primitive diagnostic replays supplied bounds without provenance overclaim", () => {
  const packet =
    buildH39SharedDomainPrimitiveDiagnostic(CLOSING_PRIMITIVE_BOUNDS);
  const reducer = buildH39Reducer(CLOSING_PRIMITIVE_BOUNDS);
  const reducerSummary =
    reducer.root_tangent_cauchy_majorant_tail_budget_summary;
  const summary = packet.shared_domain_diagnostic_summary;

  assert.deepEqual(validateH39SharedDomainPrimitiveDiagnostic(packet), []);
  assert.equal(summary.root_graph_lift_status, "rouche-certified");
  assert.equal(
    summary.candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim,
    reducerSummary.candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim
  );
  assert.equal(
    summary.rouche_form_admissible_M_R_ceiling,
    reducerSummary.rouche_form_admissible_M_R_ceiling
  );
  assert.equal(
    summary.candidate_rouche_primitive_h39_closure_ratio_below_one,
    true
  );
  assert.equal(
    summary.diagnostic_decision,
    "open-shared-domain-not-certified"
  );
  assert.equal(
    packet.claim_boundary.verifies_primitive_bounds_provenance,
    false
  );
});

test("h39 shared-domain primitive diagnostic allows external directed-rounded provenance wording", () => {
  const packet = buildH39SharedDomainPrimitiveDiagnostic({
    ...CLOSING_PRIMITIVE_BOUNDS,
    primitiveBoundsSource: "external-shared-domain-backend-report",
    primitiveBoundsStatus:
      "directed-rounded-external-unverified-by-this-artifact",
  });

  assert.deepEqual(validateH39SharedDomainPrimitiveDiagnostic(packet), []);
  assert.equal(
    packet.shared_domain_diagnostic_summary.diagnostic_decision,
    "passes-provided-primitive-bounds"
  );
  assert.equal(
    packet.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    packet.claim_boundary.certifies_directed_rounded_h39_polydisc_M_G_bound,
    false
  );
});

test("h39 primitive-vector bridge replays complete candidate without promoting provenance", () => {
  const primitiveVectorBackendArtifact = {
    schema:
      "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-primitive-vector-backend-artifact/v1",
    packet_id:
      "theta3minus_fold_pair_first_y_gd_h39_primitive_vector_backend_artifact",
    profile_vector_backend_status:
      "h39-full-cauchy-primitive-vector-candidate-closes",
    profile_vector_status:
      "h39-full-cauchy-primitive-profile-vector-candidate-closes",
    primitive_diagnostic_input_ready: true,
    missing_candidate_components: [],
    invalid_candidate_components: [],
    backend_scope: {
      primitive_bounds_status: "provided-unverified",
    },
    primitive_diagnostic_input: {
      center_residual_bound_E_R:
        CLOSING_PRIMITIVE_BOUNDS.centerResidualBound,
      center_jacobian_lower_bound_nu_J:
        CLOSING_PRIMITIVE_BOUNDS.centerJacobianLowerBound,
      jacobian_lipschitz_bound_L_J:
        CLOSING_PRIMITIVE_BOUNDS.jacobianLipschitzBound,
      rho_X: CLOSING_PRIMITIVE_BOUNDS.rhoX,
      r_X: CLOSING_PRIMITIVE_BOUNDS.rX,
      candidate_M_G_bound: CLOSING_PRIMITIVE_BOUNDS.mGBound,
      candidate_root_tangent_numerator_bound_M_R:
        CLOSING_PRIMITIVE_BOUNDS.rootTangentNumeratorBound,
      primitive_bounds_source:
        "h39-full-cauchy-primitive-vector-candidate",
      primitive_bounds_status: "provided-unverified",
    },
  };

  const packet =
    buildH39SharedDomainPrimitiveDiagnosticFromPrimitiveVectorBackendArtifact(
      primitiveVectorBackendArtifact
    );

  assert.deepEqual(validateH39SharedDomainPrimitiveDiagnostic(packet), []);
  assert.equal(
    packet.shared_domain_diagnostic_summary.diagnostic_decision,
    "open-shared-domain-not-certified"
  );
  assert.equal(
    packet.primitive_vector_promotion_theorem_bridge.promotion_obstruction,
    "primitive-vector-provenance-unverified"
  );
  assert.equal(
    packet.primitive_vector_promotion_theorem_bridge
      .primitive_diagnostic_input_ready,
    true
  );
  assert.equal(
    packet.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(packet.result.retained_branch, false);
});

test("h39 primitive-vector bridge records external replay pass as unverified by this artifact", () => {
  const primitiveVectorBackendArtifact = {
    schema:
      "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-primitive-vector-backend-artifact/v1",
    packet_id:
      "theta3minus_fold_pair_first_y_gd_h39_primitive_vector_backend_artifact",
    profile_vector_backend_status:
      "h39-full-cauchy-primitive-vector-candidate-closes",
    profile_vector_status:
      "h39-full-cauchy-primitive-profile-vector-candidate-closes",
    primitive_diagnostic_input_ready: true,
    missing_candidate_components: [],
    invalid_candidate_components: [],
    primitive_diagnostic_input: {
      center_residual_bound_E_R:
        CLOSING_PRIMITIVE_BOUNDS.centerResidualBound,
      center_jacobian_lower_bound_nu_J:
        CLOSING_PRIMITIVE_BOUNDS.centerJacobianLowerBound,
      jacobian_lipschitz_bound_L_J:
        CLOSING_PRIMITIVE_BOUNDS.jacobianLipschitzBound,
      rho_X: CLOSING_PRIMITIVE_BOUNDS.rhoX,
      r_X: CLOSING_PRIMITIVE_BOUNDS.rX,
      candidate_M_G_bound: CLOSING_PRIMITIVE_BOUNDS.mGBound,
      candidate_root_tangent_numerator_bound_M_R:
        CLOSING_PRIMITIVE_BOUNDS.rootTangentNumeratorBound,
      primitive_bounds_status:
        "directed-rounded-external-unverified-by-this-artifact",
    },
  };

  const packet =
    buildH39SharedDomainPrimitiveDiagnosticFromPrimitiveVectorBackendArtifact(
      primitiveVectorBackendArtifact
    );

  assert.deepEqual(validateH39SharedDomainPrimitiveDiagnostic(packet), []);
  assert.equal(
    packet.shared_domain_diagnostic_summary.diagnostic_decision,
    "passes-provided-primitive-bounds"
  );
  assert.equal(
    packet.primitive_vector_promotion_theorem_bridge.promotion_obstruction,
    "external-directed-rounded-replay-pass-provenance-unverified-by-this-artifact"
  );
  assert.equal(
    packet.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(packet.result.retained_branch, false);
});

test("h39 primitive-vector bridge reports missing primitive-vector input", () => {
  const packet =
    buildH39SharedDomainPrimitiveDiagnosticFromPrimitiveVectorBackendArtifact({
      schema:
        "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-primitive-vector-backend-artifact/v1",
      packet_id:
        "theta3minus_fold_pair_first_y_gd_h39_primitive_vector_backend_artifact",
      primitive_diagnostic_input_ready: false,
      missing_candidate_components: ["E_R", "M_R", "M_G", "nu_J"],
      invalid_candidate_components: [],
    });

  assert.deepEqual(validateH39SharedDomainPrimitiveDiagnostic(packet), []);
  assert.equal(
    packet.shared_domain_diagnostic_summary.diagnostic_decision,
    "open-missing-primitive-bounds"
  );
  assert.equal(
    packet.primitive_vector_promotion_theorem_bridge.promotion_obstruction,
    "primitive-vector-input-missing-or-invalid"
  );
  assert.deepEqual(
    packet.primitive_vector_promotion_theorem_bridge
      .missing_candidate_components,
    ["E_R", "M_R", "M_G", "nu_J"]
  );
});

test("h39 primitive-vector bridge validator rejects promotion-obstruction drift", () => {
  const packet = clone(
    buildH39SharedDomainPrimitiveDiagnosticFromPrimitiveVectorBackendArtifact({
      schema:
        "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-primitive-vector-backend-artifact/v1",
      packet_id:
        "theta3minus_fold_pair_first_y_gd_h39_primitive_vector_backend_artifact",
      profile_vector_backend_status:
        "h39-full-cauchy-primitive-vector-candidate-closes",
      primitive_diagnostic_input_ready: true,
      missing_candidate_components: [],
      invalid_candidate_components: [],
      primitive_diagnostic_input: {
        center_residual_bound_E_R:
          CLOSING_PRIMITIVE_BOUNDS.centerResidualBound,
        center_jacobian_lower_bound_nu_J:
          CLOSING_PRIMITIVE_BOUNDS.centerJacobianLowerBound,
        jacobian_lipschitz_bound_L_J:
          CLOSING_PRIMITIVE_BOUNDS.jacobianLipschitzBound,
        rho_X: CLOSING_PRIMITIVE_BOUNDS.rhoX,
        r_X: CLOSING_PRIMITIVE_BOUNDS.rX,
        candidate_M_G_bound: CLOSING_PRIMITIVE_BOUNDS.mGBound,
        candidate_root_tangent_numerator_bound_M_R:
          CLOSING_PRIMITIVE_BOUNDS.rootTangentNumeratorBound,
        primitive_bounds_status: "provided-unverified",
      },
    })
  );
  packet.primitive_vector_promotion_theorem_bridge.promotion_obstruction =
    "external-directed-rounded-replay-pass-provenance-unverified-by-this-artifact";

  const errors = validateH39SharedDomainPrimitiveDiagnostic(packet);

  assert.ok(
    errors.includes(
      "primitive-vector promotion theorem bridge must match the diagnostic decision and remain non-promoting"
    )
  );
});

test("h39 primitive provenance certificate promotes only the h39 continuous-tail row", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const packet = buildH39SharedDomainPrimitiveProvenanceCertificate({
    primitiveVectorBackendArtifact: primitiveVector,
    directedRoundedProvenanceReport: directedRoundedProvenanceReport({
      primitiveVector,
    }),
  });

  assert.deepEqual(
    validateH39SharedDomainPrimitiveProvenanceCertificate(packet),
    []
  );
  assert.equal(
    packet.schema,
    H39_SHARED_DOMAIN_PRIMITIVE_PROVENANCE_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.result.theory_status,
    "h39-shared-domain-primitive-continuous-tail-certified"
  );
  assert.equal(packet.result.h39_continuous_tail_certificate, true);
  assert.equal(packet.result.retained_branch, false);
  assert.equal(
    packet.claim_boundary.verifies_primitive_bounds_provenance,
    true
  );
  assert.equal(
    packet.claim_boundary.certifies_directed_rounded_shared_domain,
    true
  );
  assert.equal(
    packet.claim_boundary
      .certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound,
    true
  );
  assert.equal(
    packet.claim_boundary.certifies_directed_rounded_h39_polydisc_Xi_bound,
    true
  );
  assert.equal(
    packet.claim_boundary.certifies_directed_rounded_fold_pair_scaled_remainder,
    false
  );
  assert.equal(
    packet.claim_boundary.certifies_I1_regular_critical_exhaustion,
    false
  );
  assert.equal(packet.claim_boundary.retained_branch, false);
});

test("h39 primitive provenance certificate accepts relation-stronger component witnesses", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const report = directedRoundedProvenanceReport({ primitiveVector });
  report.component_provenance.E_R.value =
    CLOSING_PRIMITIVE_BOUNDS.centerResidualBound / 2;
  report.component_provenance.M_R.value =
    CLOSING_PRIMITIVE_BOUNDS.rootTangentNumeratorBound - 0.1;
  report.component_provenance.M_G.value =
    CLOSING_PRIMITIVE_BOUNDS.mGBound / 2;
  report.component_provenance.nu_J.value =
    CLOSING_PRIMITIVE_BOUNDS.centerJacobianLowerBound + 1;
  report.component_provenance.L_J.value =
    CLOSING_PRIMITIVE_BOUNDS.jacobianLipschitzBound / 2;

  const packet = buildH39SharedDomainPrimitiveProvenanceCertificate({
    primitiveVectorBackendArtifact: primitiveVector,
    directedRoundedProvenanceReport: report,
  });

  assert.deepEqual(
    validateH39SharedDomainPrimitiveProvenanceCertificate(packet),
    []
  );
  assert.equal(
    packet.same_domain_provenance_check.status,
    "directed-rounded-same-domain-primitive-provenance-certified"
  );
  assert.deepEqual(
    packet.same_domain_provenance_check.value_mismatch_components,
    []
  );
  assert.equal(
    packet.same_domain_provenance_check.value_coverage.M_R
      .covers_primitive_input,
    true
  );
  assert.equal(
    packet.same_domain_provenance_check.value_coverage.nu_J
      .covers_primitive_input,
    true
  );
  assert.equal(packet.result.h39_continuous_tail_certificate, true);
});

test("h39 primitive provenance certificate consumes certified L_J subset as a stronger bound", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const domainSignature = h39PrimitiveDomainSignature();
  const report = directedRoundedProvenanceReport({
    primitiveVector,
    domainSignature,
  });
  const witnessSubset = buildH39LJKernelWitnessSubset({
    kernelMajorantArtifact: h39KernelMajorantArtifact(),
    kernelMajorantWitness: h39DirectedRoundedKernelMajorantWitness({
      domainSignature,
    }),
    sharedDomainSignature: domainSignature,
  });
  report.component_provenance.L_J =
    witnessSubset.component_provenance.L_J;

  const packet = buildH39SharedDomainPrimitiveProvenanceCertificate({
    primitiveVectorBackendArtifact: primitiveVector,
    directedRoundedProvenanceReport: report,
  });

  assert.deepEqual(validateH39LJKernelWitnessSubset(witnessSubset), []);
  assert.deepEqual(
    validateH39SharedDomainPrimitiveProvenanceCertificate(packet),
    []
  );
  assert.equal(
    report.component_provenance.L_J.value <
      primitiveVector.primitive_diagnostic_input.jacobian_lipschitz_bound_L_J,
    true
  );
  assert.equal(
    packet.same_domain_provenance_check.value_coverage.L_J
      .covers_primitive_input,
    true
  );
  assert.equal(packet.result.h39_continuous_tail_certificate, true);
});

test("h39 primitive provenance certificate reports same-domain mismatch as no-go", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const report = directedRoundedProvenanceReport({ primitiveVector });
  report.component_provenance.M_G.domain_signature = {
    ...h39PrimitiveDomainSignature(),
    analytic_tail_model: "different-tail-model",
  };
  const packet = buildH39SharedDomainPrimitiveProvenanceCertificate({
    primitiveVectorBackendArtifact: primitiveVector,
    directedRoundedProvenanceReport: report,
  });

  assert.deepEqual(
    validateH39SharedDomainPrimitiveProvenanceCertificate(packet),
    []
  );
  assert.equal(
    packet.directed_rounded_provenance_check.status,
    "open-provenance-domain-mismatch"
  );
  assert.deepEqual(
    packet.directed_rounded_provenance_check.mismatched_domains,
    ["M_G"]
  );
  assert.equal(packet.result.h39_continuous_tail_certificate, false);
  assert.equal(
    packet.result.promotion_obstruction,
    "open-provenance-domain-mismatch"
  );
  assert.equal(
    packet.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
});

test("h39 primitive provenance certificate reports missing component as no-go", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const report = directedRoundedProvenanceReport({ primitiveVector });
  delete report.component_provenance.L_J;

  const packet = buildH39SharedDomainPrimitiveProvenanceCertificate({
    primitiveVectorBackendArtifact: primitiveVector,
    directedRoundedProvenanceReport: report,
  });

  assert.deepEqual(
    validateH39SharedDomainPrimitiveProvenanceCertificate(packet),
    []
  );
  assert.equal(
    packet.same_domain_provenance_check.status,
    "open-missing-required-provenance-components"
  );
  assert.deepEqual(packet.same_domain_provenance_check.missing_components, [
    "L_J",
  ]);
  assert.equal(packet.result.h39_continuous_tail_certificate, false);
});

test("h39 primitive provenance certificate reports uncovered upper-bound value as no-go", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const report = directedRoundedProvenanceReport({ primitiveVector });
  report.component_provenance.M_R.value += 1;

  const packet = buildH39SharedDomainPrimitiveProvenanceCertificate({
    primitiveVectorBackendArtifact: primitiveVector,
    directedRoundedProvenanceReport: report,
  });

  assert.deepEqual(
    validateH39SharedDomainPrimitiveProvenanceCertificate(packet),
    []
  );
  assert.equal(
    packet.same_domain_provenance_check.status,
    "open-provenance-value-mismatch"
  );
  assert.deepEqual(packet.same_domain_provenance_check.mismatched_values, [
    "M_R",
  ]);
  assert.equal(
    packet.same_domain_provenance_check.value_coverage.M_R
      .covers_primitive_input,
    false
  );
  assert.equal(packet.result.h39_continuous_tail_certificate, false);
});

test("h39 primitive provenance certificate reports uncovered lower-bound value as no-go", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const report = directedRoundedProvenanceReport({ primitiveVector });
  report.component_provenance.nu_J.value -= 1;

  const packet = buildH39SharedDomainPrimitiveProvenanceCertificate({
    primitiveVectorBackendArtifact: primitiveVector,
    directedRoundedProvenanceReport: report,
  });

  assert.deepEqual(
    validateH39SharedDomainPrimitiveProvenanceCertificate(packet),
    []
  );
  assert.equal(
    packet.same_domain_provenance_check.status,
    "open-provenance-value-mismatch"
  );
  assert.deepEqual(packet.same_domain_provenance_check.mismatched_values, [
    "nu_J",
  ]);
  assert.equal(
    packet.same_domain_provenance_check.value_coverage.nu_J
      .covers_primitive_input,
    false
  );
  assert.equal(packet.result.h39_continuous_tail_certificate, false);
});

test("h39 primitive provenance certificate still requires exact graph radii", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const report = directedRoundedProvenanceReport({ primitiveVector });
  report.component_provenance.rho_X.value += 0.1;

  const packet = buildH39SharedDomainPrimitiveProvenanceCertificate({
    primitiveVectorBackendArtifact: primitiveVector,
    directedRoundedProvenanceReport: report,
  });

  assert.deepEqual(
    validateH39SharedDomainPrimitiveProvenanceCertificate(packet),
    []
  );
  assert.equal(
    packet.same_domain_provenance_check.status,
    "open-provenance-value-mismatch"
  );
  assert.deepEqual(packet.same_domain_provenance_check.mismatched_values, [
    "rho_X",
  ]);
  assert.equal(
    packet.same_domain_provenance_check.value_coverage.rho_X
      .covers_primitive_input,
    false
  );
  assert.equal(packet.result.h39_continuous_tail_certificate, false);
});

test("h39 primitive provenance certificate reports non-directed-rounded component as no-go", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const report = directedRoundedProvenanceReport({ primitiveVector });
  report.component_provenance.nu_J.certifies_directed_rounded = false;

  const packet = buildH39SharedDomainPrimitiveProvenanceCertificate({
    primitiveVectorBackendArtifact: primitiveVector,
    directedRoundedProvenanceReport: report,
  });

  assert.deepEqual(
    validateH39SharedDomainPrimitiveProvenanceCertificate(packet),
    []
  );
  assert.equal(
    packet.same_domain_provenance_check.status,
    "open-invalid-provenance-components"
  );
  assert.deepEqual(
    packet.same_domain_provenance_check.non_directed_rounded_components,
    ["nu_J"]
  );
  assert.equal(packet.result.h39_continuous_tail_certificate, false);
});

test("h39 primitive provenance certificate reports missing primitive-vector input", () => {
  const primitiveVector = primitiveVectorBackendArtifact({
    inputReady: false,
    missingCandidateComponents: ["E_R"],
  });
  const packet = buildH39SharedDomainPrimitiveProvenanceCertificate({
    primitiveVectorBackendArtifact: primitiveVector,
    directedRoundedProvenanceReport: {
      provenance_status:
        "directed-rounded-same-domain-primitive-provenance-certified",
      shared_domain_signature: h39PrimitiveDomainSignature(),
      component_provenance: {},
    },
  });

  assert.deepEqual(
    validateH39SharedDomainPrimitiveProvenanceCertificate(packet),
    []
  );
  assert.equal(
    packet.same_domain_provenance_check.status,
    "open-primitive-vector-input-missing-or-invalid"
  );
  assert.equal(packet.result.h39_continuous_tail_certificate, false);
});

test("h39 primitive provenance certificate reports reducer replay failure", () => {
  const primitiveVector = primitiveVectorBackendArtifact({
    bounds: {
      ...CLOSING_PRIMITIVE_BOUNDS,
      mGBound: 1e19,
    },
  });
  const report = directedRoundedProvenanceReport({ primitiveVector });

  const packet = buildH39SharedDomainPrimitiveProvenanceCertificate({
    primitiveVectorBackendArtifact: primitiveVector,
    directedRoundedProvenanceReport: report,
  });

  assert.deepEqual(
    validateH39SharedDomainPrimitiveProvenanceCertificate(packet),
    []
  );
  assert.equal(
    packet.same_domain_provenance_check.status,
    "directed-rounded-same-domain-primitive-provenance-certified"
  );
  assert.equal(
    packet.result.promotion_obstruction,
    "open-h39-reducer-replay-not-closed"
  );
  assert.equal(packet.result.h39_continuous_tail_certificate, false);
});

test("h39 primitive provenance certificate validator rejects overclaim drift", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const report = directedRoundedProvenanceReport({ primitiveVector });
  report.component_provenance.nu_J.certifies_directed_rounded = false;
  const packet = clone(
    buildH39SharedDomainPrimitiveProvenanceCertificate({
      primitiveVectorBackendArtifact: primitiveVector,
      directedRoundedProvenanceReport: report,
    })
  );
  packet.claim_boundary.certifies_directed_rounded_shared_domain = true;
  packet.claim_boundary.certifies_directed_rounded_fold_pair_scaled_remainder =
    true;
  packet.result.retained_branch = true;

  const errors =
    validateH39SharedDomainPrimitiveProvenanceCertificate(packet);

  assert.ok(
    errors.includes(
      "claim boundary must remain non-promoting when provenance or reducer closure is missing"
    )
  );
  assert.ok(
    errors.includes(
      "h39 primitive provenance certificate must not certify scaled remainder, I1, or retained branch status"
    )
  );
  assert.ok(
    errors.includes(
      "h39 primitive provenance certificate result must match a fresh rebuild"
    )
  );
});

test("h39 primitive provenance certificate validator rejects nested diagnostic drift", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const packet = clone(
    buildH39SharedDomainPrimitiveProvenanceCertificate({
      primitiveVectorBackendArtifact: primitiveVector,
      directedRoundedProvenanceReport: directedRoundedProvenanceReport({
        primitiveVector,
      }),
    })
  );
  packet.primitive_vector_diagnostic_replay.shared_domain_diagnostic_summary.candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim =
    0.5;

  const errors =
    validateH39SharedDomainPrimitiveProvenanceCertificate(packet);

  assert.ok(
    errors.some((error) =>
      error.includes(
        "embedded primitive-vector diagnostic replay must validate"
      )
    )
  );
  assert.ok(
    errors.includes(
      "primitive-vector diagnostic replay must match a fresh rebuild"
    )
  );
});

test("h39 primitive provenance certificate rejects speed-band fields", () => {
  const primitiveVector = primitiveVectorBackendArtifact();
  const report = directedRoundedProvenanceReport({ primitiveVector });
  report.shared_domain_signature.speed_band = [0.5, 1.5];
  const packet = buildH39SharedDomainPrimitiveProvenanceCertificate({
    primitiveVectorBackendArtifact: primitiveVector,
    directedRoundedProvenanceReport: report,
  });

  const errors =
    validateH39SharedDomainPrimitiveProvenanceCertificate(packet);

  assert.equal(
    packet.directed_rounded_provenance_check.status,
    "rejected-fixed-speed-band-fields"
  );
  assert.ok(
    errors.some((error) =>
      error.includes(
        "h39 primitive provenance certificate must not contain speed-band fields"
      )
    )
  );
});

test("h39 shared-domain primitive diagnostic reports failing supplied primitive bounds", () => {
  const packet = buildH39SharedDomainPrimitiveDiagnostic({
    ...CLOSING_PRIMITIVE_BOUNDS,
    mGBound: 1e19,
    primitiveBoundsStatus:
      "directed-rounded-external-unverified-by-this-artifact",
  });
  const summary = packet.shared_domain_diagnostic_summary;

  assert.deepEqual(validateH39SharedDomainPrimitiveDiagnostic(packet), []);
  assert.equal(summary.diagnostic_decision, "fails-provided-primitive-bounds");
  assert.equal(
    summary.candidate_rouche_primitive_h39_closure_ratio_below_one,
    false
  );
  assert.equal(packet.result.retained_branch, false);
});

test("h39 shared-domain primitive diagnostic validator rejects overclaims", () => {
  const packet = clone(
    buildH39SharedDomainPrimitiveDiagnostic(CLOSING_PRIMITIVE_BOUNDS)
  );
  packet.claim_boundary.certifies_directed_rounded_shared_domain = true;
  packet.claim_boundary.certifies_directed_rounded_h39_polydisc_M_G_bound =
    true;
  packet.claim_boundary.retained_branch = true;
  packet.result.retained_branch = true;

  const errors = validateH39SharedDomainPrimitiveDiagnostic(packet);

  assert.ok(
    errors.includes(
      "claim boundary must not certify directed-rounded shared-domain, h39 polydisc bounds, continuous tail, scaled remainder, I1, or retention closure"
    )
  );
  assert.ok(errors.includes("diagnostic result must remain not_retained"));
});

test("h39 shared-domain primitive diagnostic validator rejects speed-band fields", () => {
  const packet = clone(buildH39SharedDomainPrimitiveDiagnostic());
  packet.diagnostic_scope.speed_band = "forbidden";
  packet.primitive_bounds.speed_min = 0.5;
  packet.primitive_bounds.speed_max = 1.5;

  const errors = validateH39SharedDomainPrimitiveDiagnostic(packet);

  assert.ok(
    errors.some((error) =>
      error.includes(
        "h39 shared-domain diagnostic must not contain speed-band fields"
      )
    )
  );
});

test("h39 shared-domain primitive diagnostic validator rejects reducer drift", () => {
  const packet = clone(
    buildH39SharedDomainPrimitiveDiagnostic(CLOSING_PRIMITIVE_BOUNDS)
  );
  packet.shared_domain_diagnostic_summary.candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim =
    0.5;

  const errors = validateH39SharedDomainPrimitiveDiagnostic(packet);

  assert.ok(
    errors.includes(
      "h39 shared-domain diagnostic summary field candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim must match the reducer replay"
    )
  );
});

test("h39 shared-domain primitive diagnostic CLI writes, validates, and emits schema JSON", () => {
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "theta3minus-h39-shared-domain-diagnostic-")
  );
  const outPath = path.join(tmpDir, "artifact.json");

  execFileSync(process.execPath, [
    scriptPath(),
    "--center-residual-bound",
    "0.1",
    "--center-jacobian-lower-bound",
    "5",
    "--jacobian-lipschitz-bound",
    "0.1",
    "--rho-x",
    "3",
    "--r-x",
    "2",
    "--m-g-bound",
    "1e12",
    "--root-tangent-numerator-bound",
    "9.4",
    "--primitive-bounds-status",
    "directed-rounded-external-unverified-by-this-artifact",
    "--out",
    outPath,
  ]);
  const validateOutput = JSON.parse(
    execFileSync(process.execPath, [scriptPath(), "--validate", outPath], {
      encoding: "utf8",
    })
  );
  const schemaOutput = JSON.parse(
    execFileSync(process.execPath, [scriptPath(), "--schema"], {
      encoding: "utf8",
    })
  );

  assert.equal(validateOutput.valid, true);
  assert.equal(
    validateOutput.diagnostic_decision,
    "passes-provided-primitive-bounds"
  );
  assert.equal(validateOutput.retained_branch, false);
  assert.equal(
    schemaOutput.artifact_schema,
    H39_SHARED_DOMAIN_PRIMITIVE_DIAGNOSTIC_SCHEMA
  );
});

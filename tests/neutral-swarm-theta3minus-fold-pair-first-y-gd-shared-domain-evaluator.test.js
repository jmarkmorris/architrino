import test from "node:test";
import assert from "node:assert/strict";

import {
  THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_COEFFICIENT_ARTIFACT_SCHEMA,
  THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
  THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_PRIMITIVE_VECTOR_BACKEND_ARTIFACT_SCHEMA,
  THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_KEPSILON_BRANCH_COORDINATE_WITNESS_SCHEMA,
  THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_GRAPH_RADII_WITNESS_SCHEMA,
  THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS,
  branchSeriesCoordinates,
  buildCoordinateCauchyEnvelopeCertificate,
  buildH39KepsilonBranchCoordinateWitness,
  buildH39KepsilonBranchCoordinateWitnessSet,
  buildH39SharedDomainCoefficientArtifact,
  buildH39PrimitiveVectorBackendArtifactFromSummary,
  computeCauchyRemovableQuotientFloor,
  computeCauchyRemovableQuotientPrefixFloor,
  computeCauchyShiftedTailMajorants,
  computeCauchyShiftedPrefixTailMajorant,
  computeCauchyShiftedTailOrderForTarget,
  computeCauchyShiftedTailOrderSensitivity,
  computeBranchGDenominatorClearanceMajorant,
  computeBranchGDenominatorAllocationTargetsCandidate,
  computeBranchGDenominatorCauchyIngredientCandidate,
  computeBranchGDenominatorIngredientCandidate,
  computeCauchyCoefficientPrefixFloor,
  computeCauchyCoefficientPrefixMajorant,
  computeCoefficientPrefixFloor,
  computeCoefficientPrefixMajorant,
  computeH39DenominatorCauchyOuterBoundCeilingCandidate,
  computeH39DenominatorCauchyPrimitiveClosureCandidate,
  computeH39FinitePrefixPrimitiveProfileScaleReplay,
  computeH39FinitePrefixPrimitiveScalarReplay,
  computeH39CoordinateCauchyOuterBoundsProfileCandidate,
  computeH39JacobianAnalyticRemainderProfileCandidate,
  computeH39JacobianCoordinateOuterBoundCandidate,
  computeH39DenominatorCauchyNGOuterBoundCandidate,
  computeH39NGOuterBoundCandidateMG,
  computeH39NGOuterBoundPrimitiveReplay,
  computeH39R43AnalyticRemainderProfileCandidate,
  computeH39KernelContinuousMajorant,
  computeSinhTaylorMajorant,
  computeH39ShiftedR43RemovableOuterBoundCandidate,
  computeH39SourceResidualCoordinateOuterBoundCandidate,
  computeMultivariateCoefficientPrefixFloor,
  computeMultivariateCoefficientPrefixMajorant,
  computeNGOuterBoundFromDenominatorClearance,
  computeYPowerFactoredCoefficientPrefixMajorant,
  evaluateH39SharedDomainCoefficientCell,
  evaluateH39SharedDomainCoefficientRows,
  evaluateNGCoefficientRows,
  evaluateR43CoefficientRows,
  makeTheta3minusFirstYGdSeriesContext,
  r43JacobianShiftedCoefficients,
  r43SecondXDerivativeShiftedCoefficients,
  solveH39CenterCoefficientRow,
  sourceEquationSeries,
  summarizeSharedDomainPrimitiveBounds,
  validateH39SharedDomainCoefficientArtifact,
  r43SecondXDerivativeKernelCoefficients,
} from "../scripts/neutral-swarm/theta3minus-fold-pair-first-y-gd-shared-domain-evaluator.mjs";
import {
  buildH39KepsilonMajorantWitness,
  buildH39NGNumeratorWitnessSubset,
  validateH39KepsilonMajorantWitness,
  validateH39NGNumeratorWitnessSubset,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.mjs";

const CELL = {
  speed_interval: [3.02156, 3.02157],
  delta_fold_interval: [0.72, 0.72],
  phi_fold_interval: [0.41, 0.41],
  beta_interval: [0.18, 0.18],
  gamma_interval: [0.025, 0.025],
  L_interval: [0, 0],
};

function hIntervals() {
  return Array.from({ length: 39 }, (_, index) => [
    (index + 1) * 1e-6,
    (index + 1) * 1e-6,
  ]);
}

function h38BranchRow(branch) {
  const row = { branch };
  hIntervals().forEach((interval, index) => {
    row[`h${index}_interval`] = interval;
  });
  row.h38_solve_slope_interval =
    branch === "-" ? [0.15, 0.152] : [-0.152, -0.15];
  return row;
}

function h38Row() {
  return {
    cell_id: "speed.test.first-y",
    speed_interval: CELL.speed_interval,
    first_y_cell: [0, 0.115 / 64],
    delta_fold_interval: CELL.delta_fold_interval,
    phi_fold_interval: CELL.phi_fold_interval,
    beta_interval: CELL.beta_interval,
    gamma_interval: CELL.gamma_interval,
    L_interval: CELL.L_interval,
    row_status: "fixture-h38-row",
    branch_rows: [h38BranchRow("-"), h38BranchRow("+")],
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

function intervalClose(left, right, tolerance = 1e-9) {
  assert.equal(left.length, 2);
  assert.equal(right.length, 2);
  const scale = Math.max(
    1,
    Math.abs(left[0]),
    Math.abs(left[1]),
    Math.abs(right[0]),
    Math.abs(right[1])
  );
  assert.ok(Math.abs(left[0] - right[0]) <= tolerance * scale);
  assert.ok(Math.abs(left[1] - right[1]) <= tolerance * scale);
}

function parseInterval(text) {
  if (Array.isArray(text)) {
    return text.map(Number);
  }
  return text
    .replace("[", "")
    .replace("]", "")
    .split(",")
    .map(Number);
}

test("h39 shared-domain series context builds branch coordinates through X39", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const { delta, phi } = branchSeriesCoordinates({
    context,
    cell: CELL,
    branch: "+",
    hIntervals: hIntervals(),
    xInterval: [3, 3],
  });

  assert.equal(
    context.schema,
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA
  );
  assert.deepEqual(delta[42], [3, 3]);
  intervalClose(phi[42], [-3, -3]);
});

test("h39 R43 leading shifted coefficient is affine in X", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const base = sourceEquationSeries({
    context,
    cell: CELL,
    branch: "+",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
  });
  const one = sourceEquationSeries({
    context,
    cell: CELL,
    branch: "+",
    hIntervals: hIntervals(),
    xInterval: [1, 1],
  });
  const two = sourceEquationSeries({
    context,
    cell: CELL,
    branch: "+",
    hIntervals: hIntervals(),
    xInterval: [2, 2],
  });
  const jacobianCoefficient = [
    one[43][0] - base[43][1],
    one[43][1] - base[43][0],
  ];
  const expectedAtTwo = [
    base[43][0] + 2 * jacobianCoefficient[0],
    base[43][1] + 2 * jacobianCoefficient[1],
  ];
  const row = evaluateR43CoefficientRows({
    context,
    cell: CELL,
    branch: "+",
    hIntervals: hIntervals(),
    xInterval: [2, 2],
    shiftedOrder: 1,
  });

  intervalClose(two[43], expectedAtTwo);
  intervalClose(parseInterval(row.R43_center_coefficient_interval), two[43]);
  assert.deepEqual(parseInterval(row.R43_second_x_coefficient_interval), [
    0, 0,
  ]);
  intervalClose(parseInterval(row.y_partial_y_R43_shifted_coefficients[0]), [
    0, 0,
  ]);
  assert.equal(row.certifies_continuous_polydisc_primitives, false);
});

test("h39 center coefficient solve zeroes the leading R43 source row", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const solve = solveH39CenterCoefficientRow({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
  });
  const row = evaluateR43CoefficientRows({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: solve.h39_center_interval,
    shiftedOrder: 1,
  });
  const solvedCoefficient = parseInterval(row.R43_center_coefficient_interval);

  assert.equal(solve.status, "h39-center-coefficient-row-solved");
  assert.ok(solvedCoefficient[0] <= 0);
  assert.ok(solvedCoefficient[1] >= 0);
  assert.equal(solve.certifies_continuous_polydisc_primitives, false);
});

test("h39 center coefficient solve accepts inherited recurrence slope", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const solve = solveH39CenterCoefficientRow({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    solveSlopeInterval: [0.79, 0.8],
  });
  const row = evaluateR43CoefficientRows({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: solve.h39_center_interval,
    solveSlopeInterval: solve.h39_solve_slope_interval,
    shiftedOrder: 1,
  });

  assert.equal(
    solve.h39_solve_slope_source,
    "inherited-formal-recurrence-slope"
  );
  assert.equal(
    row.R43_jacobian_coefficient_source,
    "inherited-formal-recurrence-slope"
  );
  assert.deepEqual(parseInterval(row.R43_jacobian_coefficient_interval), [
    0.79, 0.8,
  ]);
});

test("h39 X-derivative identities emit removable Jacobian and y41 curvature rows", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const sourceAtZero = sourceEquationSeries({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
  });
  const sourceAtOne = sourceEquationSeries({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [1, 1],
  });
  const jacobian = r43JacobianShiftedCoefficients({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
    shiftedOrder: 3,
  });
  const curvature = r43SecondXDerivativeShiftedCoefficients({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
    shiftedOrder: 42,
  });
  const leadingFiniteDifference = [
    sourceAtOne[43][0] - sourceAtZero[43][1],
    sourceAtOne[43][1] - sourceAtZero[43][0],
  ];

  intervalClose(jacobian[0], leadingFiniteDifference);
  assert.equal(
    curvature
      .slice(0, 41)
      .every((interval) => interval[0] === 0 && interval[1] === 0),
    true
  );
  assert.ok(parseInterval(curvature[41])[0] < parseInterval(curvature[41])[1]);
});

test("h39 second-X row factors as y41 times the explicit kernel prefix", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const rho = 0.001;
  const shifted = r43SecondXDerivativeShiftedCoefficients({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    shiftedOrder: 43,
  });
  const kernel = r43SecondXDerivativeKernelCoefficients({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    kernelOrder: 2,
  });

  assert.equal(
    shifted
      .slice(0, 41)
      .every(([left, right]) => left === 0 && right === 0),
    true
  );
  for (let index = 0; index < kernel.length; index += 1) {
    intervalClose(shifted[41 + index], kernel[index]);
  }
  assert.equal(
    computeCoefficientPrefixMajorant(shifted, rho),
    computeYPowerFactoredCoefficientPrefixMajorant(kernel, rho, 41)
  );
});

test("h39 kernel coordinate seminorm gives a continuous reduced Lipschitz majorant", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const rho = 0.001;
  const majorant = computeH39KernelContinuousMajorant({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
    rho,
  });
  const row = evaluateR43CoefficientRows({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
    rho,
  });

  assert.ok(
    majorant.R43_second_x_kernel_delta_coefficient_seminorm_rho > 0
  );
  assert.ok(majorant.R43_second_x_kernel_phi_coefficient_seminorm_rho > 0);
  assert.equal(majorant.R43_second_x_kernel_speed_min, CELL.speed_interval[0]);
  assert.ok(
    majorant.R43_second_x_kernel_continuous_majorant >=
      majorant.R43_second_x_kernel_speed_term
  );
  assert.ok(
    majorant.R43_jacobian_lipschitz_reduced_continuous_majorant > 0
  );
  assert.ok(
    majorant.R43_jacobian_lipschitz_reduced_continuous_majorant <=
      rho ** 41 *
        majorant.R43_second_x_kernel_continuous_majorant *
        (1 + 1e-12)
  );
  assert.equal(
    row.R43_second_x_kernel_continuous_majorant,
    majorant.R43_second_x_kernel_continuous_majorant
  );
  assert.equal(row.certifies_continuous_polydisc_primitives, false);
});

test("h39 K_epsilon branch-coordinate witness keeps finite-only row open", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const packet = buildH39KepsilonBranchCoordinateWitness({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
    rho: 0.001,
    sharedDomainSignature: h39PrimitiveDomainSignature(),
  });

  assert.equal(
    packet.schema,
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_KEPSILON_BRANCH_COORDINATE_WITNESS_SCHEMA
  );
  assert.equal(
    packet.witness_status,
    "open-K_epsilon-branch-coordinate-witness-unverified"
  );
  assert.equal(
    packet.predicate_check.failed_predicates.includes(
      "coordinate_cauchy_tail_majorants_present"
    ),
    true
  );
  assert.equal(packet.branch_coordinate_witness.includes_analytic_tail, false);
  assert.equal(
    packet.branch_coordinate_witness.certifies_directed_rounded,
    false
  );
  assert.equal(JSON.stringify(packet).includes("speed_band"), false);
});

test("h39 sinh Taylor envelope emits a geometric-tail upper certificate", () => {
  const envelope = computeSinhTaylorMajorant({ argument: 0.75 });

  assert.equal(envelope.status, "sinh-taylor-tail-majorant-emitted");
  assert.equal(
    envelope.certificate_type,
    "sinh-positive-taylor-geometric-tail-upper-envelope"
  );
  assert.ok(envelope.sinh_upper_majorant >= Math.sinh(0.75));
  assert.ok(envelope.tail_ratio_bound < 0.5);
  assert.ok(envelope.included_odd_terms >= 8);
  assert.equal(envelope.predicates.no_math_sinh_oracle, true);
  assert.throws(
    () => computeSinhTaylorMajorant({ argument: -0.01 }),
    /finite nonnegative/
  );
  assert.throws(
    () => computeSinhTaylorMajorant({ argument: Number.POSITIVE_INFINITY }),
    /finite nonnegative/
  );
});

test("h39 K_epsilon branch-coordinate witness rejects bare coordinate provenance", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const packet = buildH39KepsilonBranchCoordinateWitness({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
    rho: 0.001,
    sharedDomainSignature: h39PrimitiveDomainSignature(),
    directedRoundedCoordinateProvenance: true,
  });

  assert.equal(
    packet.witness_status,
    "open-K_epsilon-branch-coordinate-witness-unverified"
  );
  assert.equal(
    packet.predicate_check.failed_predicates.includes(
      "coordinate_cauchy_tail_majorants_present"
    ),
    true
  );
  assert.equal(
    packet.predicate_check.failed_predicates.includes(
      "delta_coordinate_cauchy_envelope_certified"
    ),
    true
  );
  assert.equal(
    packet.coordinate_diagnostics.coordinate_provenance_source,
    "external-directed-rounded-coordinate-claim-unaccepted-without-envelope"
  );
  assert.equal(
    packet.branch_coordinate_witness.coordinate_bounds_same_domain,
    false
  );
});

test("h39 K_epsilon branch-coordinate witness set feeds the M_K majorant", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const domainSignature = h39PrimitiveDomainSignature();
  const witnessSet = buildH39KepsilonBranchCoordinateWitnessSet({
    context,
    cell: CELL,
    branchInputs: [
      { branch: "-", hIntervals: hIntervals() },
      { branch: "+", hIntervals: hIntervals() },
    ],
    rho: 0.001,
    outerRadius: 0.01,
    deltaOuterBound: 100,
    phiOuterBound: 100,
    sharedDomainSignature: domainSignature,
  });
  const majorant = buildH39KepsilonMajorantWitness({
    branchCoordinateWitnesses: witnessSet.branch_coordinate_witnesses,
    sharedDomainSignature: domainSignature,
    rho: 0.001,
  });

  assert.equal(
    witnessSet.witness_status,
    "directed-rounded-same-domain-K_epsilon-branch-coordinate-witness-set-certified"
  );
  assert.equal(
    witnessSet.result.h39_K_epsilon_branch_coordinate_witness_set,
    true
  );
  assert.equal(
    witnessSet.result.h39_K_epsilon_majorant_witness,
    false
  );
  assert.equal(
    witnessSet.branch_coordinate_witnesses.every(
      (witness) =>
        witness.certifies_directed_rounded === true &&
        witness.includes_analytic_tail === true &&
        witness.coordinate_bounds_same_domain === true &&
        witness.delta_coordinate_bound_source ===
          "coordinate-cauchy-prefix-geometric-tail-upper-envelope" &&
        witness.phi_coordinate_bound_source ===
          "coordinate-cauchy-prefix-geometric-tail-upper-envelope" &&
        witness.delta_abs_bound_D ===
          witness.delta_coordinate_cauchy_envelope
            .prefix_plus_tail_majorant &&
        witness.phi_abs_bound_Phi ===
          witness.phi_coordinate_cauchy_envelope
            .prefix_plus_tail_majorant &&
        witness.outward_rounded_transcendentals === true &&
        witness.sinh_delta_upper_source ===
          "sinh-positive-taylor-geometric-tail-upper-envelope" &&
        witness.sinh_phi_upper_source ===
          "sinh-positive-taylor-geometric-tail-upper-envelope" &&
        witness.speed_term_upper >=
          2 / witness.nu_lower_bound ** 2 &&
        witness.sinh_delta_upper ===
          witness.sinh_delta_taylor_majorant.sinh_upper_majorant &&
        witness.sinh_phi_upper ===
          witness.sinh_phi_taylor_majorant.sinh_upper_majorant
    ),
    true
  );
  assert.equal(
    witnessSet.branch_coordinate_witness_packets.every(
      (packet) =>
        packet.coordinate_diagnostics.transcendental_provenance_source ===
          "sinh-positive-taylor-geometric-tail-upper-envelope" &&
        packet.coordinate_diagnostics.coordinate_provenance_source ===
          "coordinate-cauchy-prefix-geometric-tail-upper-envelope" &&
        packet.coordinate_diagnostics.delta_coordinate_cauchy_envelope
          .tail_ratio_bound < 1 &&
        packet.coordinate_diagnostics.phi_coordinate_cauchy_envelope
          .tail_ratio_bound < 1 &&
        packet.coordinate_diagnostics.sinh_delta_taylor_majorant
          .tail_ratio_bound < 0.5 &&
        packet.coordinate_diagnostics.sinh_phi_taylor_majorant
          .tail_ratio_bound < 0.5
    ),
    true
  );
  assert.equal(JSON.stringify(witnessSet).includes("speed_band"), false);
  assert.equal(
    witnessSet.claim_boundary.assumes_fixed_speed_window,
    false
  );
  assert.deepEqual(validateH39KepsilonMajorantWitness(majorant), []);
  assert.equal(majorant.result.h39_K_epsilon_majorant_witness, true);
  assert.equal(majorant.result.h39_L_J_component_witness, false);
  assert.equal(
    majorant.L_J_subset_replay.result.h39_L_J_component_witness,
    true
  );
});

test("h39 K_epsilon branch-coordinate witness set blocks missing transcendental provenance", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const domainSignature = h39PrimitiveDomainSignature();
  const witnessSet = buildH39KepsilonBranchCoordinateWitnessSet({
    context,
    cell: CELL,
    branchInputs: [
      { branch: "-", hIntervals: hIntervals() },
      { branch: "+", hIntervals: hIntervals() },
    ],
    rho: 0.001,
    outerRadius: 0.01,
    deltaOuterBound: 100,
    phiOuterBound: 100,
    sharedDomainSignature: domainSignature,
    outwardRoundedTranscendentalProvenance: false,
    useSinhTaylorEnvelope: false,
  });
  const majorant = buildH39KepsilonMajorantWitness({
    branchCoordinateWitnesses: witnessSet.branch_coordinate_witnesses,
    sharedDomainSignature: domainSignature,
    rho: 0.001,
  });

  assert.equal(
    witnessSet.witness_status,
    "open-K_epsilon-branch-coordinate-witness-set-unverified"
  );
  assert.equal(
    witnessSet.predicate_check.failed_predicates.includes(
      "-:outward_rounded_transcendental_provenance"
    ),
    true
  );
  assert.equal(
    witnessSet.predicate_check.failed_predicates.includes(
      "-:delta_sinh_upper_envelope_certified"
    ),
    true
  );
  assert.deepEqual(validateH39KepsilonMajorantWitness(majorant), []);
  assert.equal(majorant.result.h39_K_epsilon_majorant_witness, false);
  assert.equal(
    majorant.predicate_check.failed_predicates.includes(
      "-:outward_rounded_transcendentals"
    ),
    true
  );
});

test("h39 coordinate Cauchy outer bounds emit source and removable Jacobian candidates", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const source = computeH39SourceResidualCoordinateOuterBoundCandidate({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
    outerRadius: 0.01,
    xOuterRadius: 1e-6,
  });
  const jacobian = computeH39JacobianCoordinateOuterBoundCandidate({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
    numeratorOuterRadius: 0.02,
    jacobianOuterRadius: 0.01,
    xOuterRadius: 1e-6,
  });
  const profile = computeH39CoordinateCauchyOuterBoundsProfileCandidate({
    context,
    cell: CELL,
    branchInputs: [
      { branch: "-", hIntervals: hIntervals(), xInterval: [0, 0] },
      { branch: "+", hIntervals: hIntervals(), xInterval: [0, 0] },
    ],
    r43CauchyOuterRadius: 0.01,
    jacobianNumeratorCauchyOuterRadius: 0.02,
    jacobianCauchyOuterRadius: 0.01,
    xOuterRadius: 1e-6,
  });

  assert.equal(
    source.status,
    "h39-source-residual-coordinate-cauchy-outer-bound-candidate-emitted"
  );
  assert.ok(source.candidate_R43_source_outer_bound > 2);
  assert.equal(source.r43_cauchy_outer_radius, 0.01);
  assert.equal(source.certifies_directed_rounded_shared_domain, false);
  assert.equal(source.retained_branch, false);
  assert.equal(
    jacobian.status,
    "h39-jacobian-coordinate-cauchy-outer-bound-candidate-emitted"
  );
  assert.equal(jacobian.removable_quotient_cauchy_gap, 0.01);
  assert.ok(jacobian.candidate_R43_jacobian_numerator_outer_bound > 0);
  assert.ok(jacobian.candidate_R43_jacobian_outer_bound > 0);
  assert.equal(jacobian.certifies_directed_rounded_shared_domain, false);
  assert.equal(jacobian.retained_branch, false);
  assert.equal(
    profile.status,
    "h39-coordinate-cauchy-outer-bounds-profile-candidate-emitted"
  );
  assert.equal(profile.source_residual_outer_bound_candidates.length, 2);
  assert.equal(profile.jacobian_outer_bound_candidates.length, 2);
  assert.ok(
    profile.r43_cauchy_outer_bound >=
      source.candidate_R43_source_outer_bound
  );
  assert.ok(profile.jacobian_cauchy_outer_bound > 0);
  assert.equal(JSON.stringify(profile).includes("speed_band"), false);
});

test("h39 shifted R43 source envelope consumes the removable cancellation witness", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 60 });
  const minusSolve = solveH39CenterCoefficientRow({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    solveSlopeInterval: [0.15, 0.152],
  });
  const shiftedSource = computeH39ShiftedR43RemovableOuterBoundCandidate({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: minusSolve.h39_center_interval,
    outerBound: 1e-3,
    outerRadius: 0.01,
    directedRoundedShiftedR43Provenance: true,
    certifiesShiftedR43ZeroPrefix: true,
  });

  assert.equal(
    shiftedSource.status,
    "h39-shifted-r43-removable-cauchy-outer-bound-candidate-emitted"
  );
  assert.equal(
    shiftedSource.source_envelope_kind,
    "shifted-removable-r43-cauchy-outer-bound"
  );
  assert.equal(shiftedSource.r43_cauchy_tail_shift_power, 0);
  assert.equal(shiftedSource.source_zero_prefix_certified, true);
  assert.equal(shiftedSource.shifted_R43_bound_covers_finite_prefix, true);
  assert.ok(
    shiftedSource.shifted_R43_finite_prefix_majorant_outer_radius < 1e-5
  );
  assert.equal(
    shiftedSource.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(shiftedSource.retained_branch, false);
  assert.equal(JSON.stringify(shiftedSource).includes("speed_band"), false);
});

test("h39 branch G denominator ingredients emit candidate floors only", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const candidate = computeBranchGDenominatorIngredientCandidate({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
    rho: 0.001,
  });

  assert.equal(
    candidate.status,
    "h39-branch-g-denominator-ingredient-candidate-emitted"
  );
  assert.equal(
    candidate.candidate_denominator_clearance_status,
    "candidate-denominator-clearance-positive"
  );
  assert.ok(candidate.branch_kernel_majorant >= 1);
  assert.ok(candidate.delta_clearance_floor > 0);
  assert.ok(candidate.jacobian_abs_floor > 0);
  assert.ok(candidate.branch_g_outer_majorant > 0);
  assert.equal(candidate.certifies_directed_rounded_shared_domain, false);
  assert.equal(candidate.retained_branch, false);
});

test("h39 branch G Cauchy denominator ingredients emit prefix-plus-tail floors only", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const candidate = computeBranchGDenominatorCauchyIngredientCandidate({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
    rho: 0.001,
    outerRadius: 0.01,
    deltaOuterBound: 100,
    phiOuterBound: 100,
    jacobianAbsOuterBound: 100,
  });

  assert.equal(
    candidate.status,
    "h39-branch-g-denominator-cauchy-ingredient-candidate-emitted"
  );
  assert.equal(
    candidate.candidate_denominator_clearance_status,
    "candidate-denominator-clearance-positive"
  );
  assert.equal(candidate.q, 0.1);
  assert.ok(candidate.delta_coordinate_prefix_plus_tail_majorant > 0);
  assert.ok(candidate.phi_coordinate_prefix_plus_tail_majorant > 0);
  assert.ok(candidate.delta_clearance_prefix_plus_tail_floor > 0);
  assert.ok(candidate.jacobian_abs_prefix_plus_tail_floor > 0);
  assert.ok(candidate.branch_g_outer_majorant > 0);
  assert.equal(candidate.certifies_directed_rounded_shared_domain, false);
  assert.equal(candidate.retained_branch, false);
});

test("h39 denominator Cauchy primitive closure candidate composes branch bounds", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const minusBranch = computeBranchGDenominatorCauchyIngredientCandidate({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
    rho: 0.001,
    outerRadius: 0.01,
    deltaOuterBound: 100,
    phiOuterBound: 100,
    jacobianAbsOuterBound: 100,
  });
  const plusBranch = computeBranchGDenominatorCauchyIngredientCandidate({
    context,
    cell: CELL,
    branch: "+",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
    rho: 0.001,
    outerRadius: 0.01,
    deltaOuterBound: 100,
    phiOuterBound: 100,
    jacobianAbsOuterBound: 100,
  });
  const candidate = computeH39DenominatorCauchyPrimitiveClosureCandidate({
    branchDenominatorCandidates: [minusBranch, plusBranch],
    lMajorant: 0,
    lowerPolynomialMajorant: 0,
    outerRadius: 0.01,
    nGShiftedCoefficients: [[1e-120, 1e-120]],
    rho: 0.001,
    candidate_E_R_bound: 1e-6,
    candidate_nu_J_bound: 1,
    candidate_L_J_reduced_continuous_majorant: 0,
    candidate_M_R_bound: 1e-6,
  });

  assert.equal(
    candidate.status,
    "h39-denominator-cauchy-primitive-closure-candidate-emitted"
  );
  assert.equal(candidate.branch_count, 2);
  assert.equal(
    candidate.n_g_outer_bound,
    minusBranch.branch_g_outer_majorant + plusBranch.branch_g_outer_majorant
  );
  assert.ok(candidate.candidate_M_G_bound > 0);
  assert.equal(candidate.candidate_scalar_replay_closes, true);
  assert.equal(
    candidate.denominator_budget_status,
    "h39-denominator-budget-candidate-below-ceiling"
  );
  assert.ok(candidate.n_g_outer_bound_ceiling > candidate.n_g_outer_bound);
  assert.ok(candidate.branch_g_sum_budget_ceiling > 0);
  assert.ok(candidate.branch_g_sum_budget_margin > 0);
  assert.ok(candidate.branch_g_sum_budget_ratio < 1);
  assert.equal(
    candidate.branch_denominator_allocation_targets.status,
    "h39-branch-g-denominator-allocation-targets-candidate-emitted"
  );
  assert.equal(candidate.certifies_directed_rounded_shared_domain, false);
  assert.equal(candidate.retained_branch, false);
});

test("h39 denominator Cauchy N_G outer bound candidate composes branch inputs", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const candidate = computeH39DenominatorCauchyNGOuterBoundCandidate({
    context,
    cell: CELL,
    branchInputs: [
      { branch: "-", hIntervals: hIntervals(), xInterval: [0, 0] },
      { branch: "+", hIntervals: hIntervals(), xInterval: [0, 0] },
    ],
    rho: 0.001,
    outerRadius: 0.01,
    deltaOuterBound: 100,
    phiOuterBound: 100,
    jacobianAbsOuterBound: 100,
    lMajorant: 2,
    lowerPolynomialMajorant: 3,
  });

  assert.equal(
    candidate.status,
    "h39-denominator-cauchy-n-g-outer-bound-candidate-emitted"
  );
  assert.equal(candidate.branch_denominator_candidates.length, 2);
  assert.ok(candidate.branch_g_outer_majorants.every((value) => value > 0));
  assert.equal(candidate.l_majorant, 2);
  assert.equal(candidate.lower_polynomial_majorant, 3);
  assert.equal(
    candidate.n_g_cauchy_outer_bound,
    candidate.branch_g_outer_majorants.reduce((sum, value) => sum + value, 0) +
      2 +
      0.01 ** 2 * 3
  );
  assert.equal(
    candidate.n_g_outer_bound_diagnostic.n_g_outer_bound,
    candidate.n_g_cauchy_outer_bound
  );
  assert.equal(candidate.certifies_directed_rounded_shared_domain, false);
  assert.equal(
    candidate.certifies_directed_rounded_h39_polydisc_M_G_bound,
    false
  );
  assert.equal(candidate.retained_branch, false);
  assert.equal(JSON.stringify(candidate).includes("speed_band"), false);
});

test("h39 denominator Cauchy N_G route feeds only the M_G subset after provenance upgrade", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const domainSignature = h39PrimitiveDomainSignature();
  const candidate = computeH39DenominatorCauchyNGOuterBoundCandidate({
    context,
    cell: CELL,
    branchInputs: [
      { branch: "-", hIntervals: hIntervals(), xInterval: [0, 0] },
      { branch: "+", hIntervals: hIntervals(), xInterval: [0, 0] },
    ],
    rho: 0.001,
    outerRadius: 0.01,
    deltaOuterBound: 100,
    phiOuterBound: 100,
    jacobianAbsOuterBound: 100,
    lMajorant: 2,
    lowerPolynomialMajorant: 3,
  });
  const profile = computeH39NGOuterBoundCandidateMG({
    nGShiftedCoefficients: [[1e-90, 1e-90]],
    nGOuterBound: candidate.n_g_cauchy_outer_bound,
    nGOuterRadius: candidate.n_g_cauchy_outer_radius,
    rho: candidate.rho,
  });
  const subset = buildH39NGNumeratorWitnessSubset({
    nGOuterBoundMGWitness: {
      ...profile,
      source_denominator_cauchy_candidate: candidate,
      domain_signature: domainSignature,
      certifies_directed_rounded: true,
      directed_rounded: true,
      certifies_directed_rounded_shared_domain: true,
      certificate_status: "directed-rounded-certified",
      includes_analytic_tail: true,
      assumes_fixed_speed_window: false,
    },
    sharedDomainSignature: domainSignature,
  });

  assert.deepEqual(validateH39NGNumeratorWitnessSubset(subset), []);
  assert.equal(subset.result.h39_M_G_component_witness, true);
  assert.equal(subset.result.h39_full_primitive_vector_certificate, false);
  assert.equal(
    subset.claim_boundary
      .certifies_directed_rounded_h39_polydisc_M_G_bound,
    true
  );
  assert.equal(
    candidate.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    subset.predicate_check.checks.n_g_shift_power_matches,
    true
  );
});

test("h39 denominator Cauchy outer-bound ceiling inverts the primitive replay", () => {
  const ceiling = computeH39DenominatorCauchyOuterBoundCeilingCandidate({
    nGShiftedCoefficients: [[1e-120, 1e-120]],
    rho: 0.001,
    nGOuterRadius: 0.01,
    lMajorant: 1,
    lowerPolynomialMajorant: 2,
    outerRadius: 0.01,
    candidate_E_R_bound: 1e-6,
    candidate_nu_J_bound: 1,
    candidate_L_J_reduced_continuous_majorant: 0,
    candidate_M_R_bound: 1e-6,
  });

  assert.equal(
    ceiling.status,
    "h39-denominator-cauchy-outer-bound-ceiling-candidate-emitted"
  );
  assert.ok(ceiling.candidate_primitive_M_G_closure_ceiling > 0);
  assert.ok(ceiling.n_g_outer_bound_ceiling > 0);
  assert.ok(ceiling.branch_g_sum_budget_ceiling > 0);
  assert.equal(
    ceiling.n_g_outer_bound_tail_coefficient,
    ceiling.n_g_tail_diagnostic.unshifted_cauchy_tail_after_prefix_majorant
  );
  assert.ok(
    Math.abs(
      ceiling.n_g_outer_bound_ceiling -
        (ceiling.candidate_primitive_M_G_closure_ceiling -
          ceiling.n_g_shifted_unshifted_prefix_majorant) /
          ceiling.n_g_outer_bound_tail_coefficient
    ) <
      Math.abs(ceiling.n_g_outer_bound_ceiling) * 1e-12
  );
  assert.ok(
    Math.abs(
      ceiling.branch_g_sum_budget_ceiling -
        (ceiling.n_g_outer_bound_ceiling - ceiling.fixed_outer_terms)
    ) <
      Math.abs(ceiling.branch_g_sum_budget_ceiling) * 1e-12
  );
  assert.equal(ceiling.certifies_directed_rounded_shared_domain, false);
  assert.equal(ceiling.retained_branch, false);
});

test("h39 branch G allocation targets invert denominator clearances", () => {
  const allocation = computeBranchGDenominatorAllocationTargetsCandidate({
    branchGSumBudgetCeiling: 0.22,
    allocationWeights: [3, 5],
    branchInputs: [
      {
        branch: "-",
        kernelMajorant: 3,
        speedLowerBound: 2,
        deltaClearance: 4,
        jacobianClearance: 5,
      },
      {
        branch: "+",
        kernelMajorant: 2,
        speedLowerBound: 4,
        deltaClearance: 2,
        jacobianClearance: 4,
      },
    ],
  });

  assert.equal(
    allocation.status,
    "h39-branch-g-denominator-allocation-targets-candidate-emitted"
  );
  assert.equal(allocation.allocation_weight_sum, 8);
  assert.equal(allocation.branch_rows[0].allocated_branch_g_budget, 0.0825);
  assert.equal(allocation.branch_rows[1].allocated_branch_g_budget, 0.1375);
  assert.equal(allocation.branch_rows[0].branch_pressure_coefficient, 6);
  assert.equal(allocation.branch_rows[1].branch_pressure_coefficient, 2);
  assert.deepEqual(allocation.pressure_balanced_allocation_weights, [6, 2]);
  assert.ok(
    Math.abs(
      allocation.pressure_balanced_common_required_delta_squared_jacobian_clearance -
        8 / 0.22
    ) < 1e-12
  );
  assert.ok(
    Math.abs(
      allocation.branch_rows[0].required_delta_squared_jacobian_clearance -
        12 / (2 * 0.0825)
    ) < 1e-12
  );
  assert.ok(
    Math.abs(
      allocation.branch_rows[0].required_jacobian_clearance_given_delta -
        allocation.branch_rows[0].required_delta_squared_jacobian_clearance /
          16
    ) < 1e-12
  );
  assert.equal(allocation.branch_rows[0].candidate_branch_target_met, true);
  assert.equal(
    allocation.branch_rows[0].candidate_branch_majorant_below_allocation,
    true
  );
  assert.equal(allocation.candidate_all_supplied_branch_targets_met, true);
  assert.equal(allocation.certifies_directed_rounded_shared_domain, false);
  assert.equal(allocation.retained_branch, false);
});

test("h39 finite-prefix primitive scalar replay is feasibility only", () => {
  const replay = computeH39FinitePrefixPrimitiveScalarReplay({
    candidate_E_R_finite_prefix: 10,
    candidate_nu_J_finite_prefix: 2,
    candidate_L_J_reduced_continuous_majorant: 0,
    candidate_M_G_finite_prefix: 1e-12,
    candidate_M_R_finite_prefix: 1,
  });

  assert.equal(
    replay.candidate_primitive_bounds_status,
    "finite-prefix-plus-kernel-continuous-candidate-not-certificate"
  );
  assert.equal(replay.candidate_scalar_replay_closes, true);
  assert.equal(replay.certifies_continuous_polydisc_primitives, false);
  assert.equal(replay.certifies_directed_rounded_shared_domain, false);
  assert.equal(replay.retained_branch, false);
  assert.equal(replay.rouche_radius_lower_boundary, 5);
  assert.equal(replay.candidate_rho_X, 10);
  assert.equal(replay.candidate_r_X, 7.5);
  assert.ok(replay.candidate_rouche_primitive_closure_ratio < 1);
  assert.equal(
    replay.candidate_primitive_slack_tolerances_status,
    "h39-primitive-slack-tolerances-candidate-emitted"
  );
  assert.equal(
    replay.candidate_primitive_slack_all_current_margins_positive,
    true
  );
  assert.equal(replay.candidate_primitive_slack_current_J_min_sigma_X, 5);
  assert.ok(
    replay.candidate_primitive_slack_required_J_min_sigma_X_from_closure < 1e-20
  );
  assert.equal(
    replay.candidate_primitive_slack_tolerances.retained_branch,
    false
  );
});

test("h39 coefficient-prefix seminorm helpers compute majorants and floors", () => {
  assert.equal(
    computeCoefficientPrefixMajorant(
      [
        [2, 3],
        [-1, 1],
      ],
      0.5,
      1
    ),
    1.75
  );
  assert.equal(
    computeCoefficientPrefixFloor(
      [
        [2, 3],
        [-1, 1],
      ],
      0.5
    ),
    1.5
  );
});

test("h39 finite-prefix primitive profile-scale replay absorbs the L_J continuous profile", () => {
  const replay = computeH39FinitePrefixPrimitiveProfileScaleReplay({
    candidate_E_R_finite_prefix: 10,
    candidate_nu_J_finite_prefix: 2,
    candidate_L_J_finite_prefix: 0,
    candidate_L_J_reduced_continuous_majorant: 1e-9,
    candidate_M_G_finite_prefix: 1e-12,
    candidate_M_R_finite_prefix: 1,
    profileScaleUpperBound: 1,
  });

  assert.equal(
    replay.status,
    "h39-finite-prefix-primitive-profile-scale-replay-emitted"
  );
  assert.equal(
    replay.candidate_profile_scale_status,
    "h39-primitive-remainder-profile-scale-closed-through-upper-bound"
  );
  assert.equal(
    replay.jacobian_lipschitz_remainder_profile_L_J,
    1e-9
  );
  assert.equal(
    replay.candidate_L_J_reduced_minus_finite_prefix_profile,
    1e-9
  );
  assert.equal(replay.candidate_profile_scale_required_closes, true);
  const exactBoundary =
    replay.candidate_profile_scale_replay
      .primitive_remainder_profile_scale_exact_multi_profile_boundary;
  assert.equal(
    replay.candidate_profile_scale_exact_fixed_radii_required_scale,
    1
  );
  assert.equal(
    replay.candidate_profile_scale_exact_fixed_radii_lambda_supremum,
    exactBoundary.primitive_analytic_remainder_multi_profile_lambda_supremum
  );
  assert.equal(
    replay.candidate_profile_scale_exact_fixed_radii_bottleneck_name,
    exactBoundary.primitive_analytic_remainder_multi_profile_bottleneck_name
  );
  assert.equal(
    replay.candidate_profile_scale_exact_fixed_radii_closes_required_scale,
    true
  );
  assert.ok(
    replay.candidate_profile_scale_exact_fixed_radii_strict_headroom > 0
  );
  assert.equal(
    replay.candidate_profile_scale_exact_fixed_radii_not_applicable_reason,
    null
  );
  assert.equal(
    replay.candidate_profile_scale_exact_fixed_radii_J_min_at_required_scale,
    exactBoundary
      .primitive_analytic_remainder_multi_profile_J_min_at_required_scale
  );
  assert.equal(
    replay
      .candidate_profile_scale_exact_fixed_radii_rouche_margin_at_required_scale,
    exactBoundary
      .primitive_analytic_remainder_multi_profile_rouche_margin_at_required_scale
  );
  assert.equal(
    replay
      .candidate_profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale,
    exactBoundary
      .primitive_analytic_remainder_multi_profile_scalar_polynomial_at_required_scale
  );
  assert.equal(
    replay
      .candidate_profile_scale_exact_fixed_radii_required_scale_margin_closes,
    true
  );
  assert.deepEqual(
    replay
      .candidate_profile_scale_exact_fixed_radii_required_scale_failed_margin_names,
    []
  );
  assert.equal(
    replay.candidate_profile_known_L_J_continuous_remainder_only,
    true
  );
  assert.equal(
    replay.candidate_profile_direction_complete_for_shared_domain_closure,
    false
  );
  assert.equal(
    replay.candidate_h39_full_cauchy_primitive_profile_vector_status,
    "h39-full-cauchy-primitive-profile-vector-candidate-incomplete"
  );
  assert.equal(
    replay.candidate_h39_full_cauchy_primitive_profile_vector_complete,
    false
  );
  assert.deepEqual(
    replay.candidate_h39_full_cauchy_primitive_profile_vector_missing_components,
    ["E_R", "M_R", "M_G", "nu_J"]
  );
  assert.equal(replay.certifies_continuous_polydisc_primitives, false);
  assert.equal(replay.certifies_directed_rounded_shared_domain, false);
  assert.equal(replay.retained_branch, false);
});

test("h39 full Cauchy primitive profile vector reports scale-open complete candidates", () => {
  const replay = computeH39FinitePrefixPrimitiveProfileScaleReplay({
    candidate_E_R_finite_prefix: 10,
    candidate_nu_J_finite_prefix: 2,
    candidate_L_J_finite_prefix: 0,
    candidate_L_J_reduced_continuous_majorant: 1e-9,
    candidate_M_G_finite_prefix: 1e-12,
    candidate_M_R_finite_prefix: 1,
    centerResidualRemainderProfile: 1e6,
    centerJacobianLowerRemainderProfile: 1e6,
    mGRemainderProfile: 1e6,
    rootTangentNumeratorRemainderProfile: 1e6,
  });

  assert.equal(
    replay.candidate_h39_full_cauchy_primitive_profile_vector_status,
    "h39-full-cauchy-primitive-profile-vector-candidate-scale-inequalities-open"
  );
  assert.equal(
    replay.candidate_h39_full_cauchy_primitive_profile_vector_complete,
    true
  );
  assert.deepEqual(
    replay.candidate_h39_full_cauchy_primitive_profile_vector_missing_components,
    []
  );
  assert.equal(
    replay.candidate_profile_direction_complete_for_shared_domain_closure,
    true
  );
  assert.equal(replay.candidate_profile_scale_required_closes, false);
  assert.ok(replay.candidate_profile_scale_candidate < 1);
  const exactBoundary =
    replay.candidate_profile_scale_replay
      .primitive_remainder_profile_scale_exact_multi_profile_boundary;
  assert.equal(
    replay.candidate_profile_scale_exact_fixed_radii_lambda_supremum,
    exactBoundary.primitive_analytic_remainder_multi_profile_lambda_supremum
  );
  assert.equal(
    replay.candidate_profile_scale_exact_fixed_radii_bottleneck_name,
    exactBoundary.primitive_analytic_remainder_multi_profile_bottleneck_name
  );
  assert.equal(
    replay.candidate_profile_scale_exact_fixed_radii_required_scale,
    1
  );
  assert.equal(
    replay.candidate_profile_scale_exact_fixed_radii_closes_required_scale,
    false
  );
  assert.ok(
    replay.candidate_profile_scale_exact_fixed_radii_strict_headroom < 0
  );
  assert.equal(
    replay.candidate_profile_scale_exact_fixed_radii_not_applicable_reason,
    null
  );
  assert.equal(
    replay.candidate_profile_scale_exact_fixed_radii_J_min_at_required_scale,
    exactBoundary
      .primitive_analytic_remainder_multi_profile_J_min_at_required_scale
  );
  assert.equal(
    replay
      .candidate_profile_scale_exact_fixed_radii_rouche_margin_at_required_scale,
    exactBoundary
      .primitive_analytic_remainder_multi_profile_rouche_margin_at_required_scale
  );
  assert.equal(
    replay
      .candidate_profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale,
    exactBoundary
      .primitive_analytic_remainder_multi_profile_scalar_polynomial_at_required_scale
  );
  assert.equal(
    replay
      .candidate_profile_scale_exact_fixed_radii_required_scale_margin_closes,
    false
  );
  assert.ok(
    replay
      .candidate_profile_scale_exact_fixed_radii_required_scale_failed_margin_names
      .length > 0
  );
  assert.equal(replay.certifies_continuous_polydisc_primitives, false);
  assert.equal(replay.certifies_directed_rounded_shared_domain, false);
  assert.equal(replay.retained_branch, false);
});

test("h39 R43 analytic profile candidate emits E_R and M_R Cauchy tails", () => {
  const profile = computeH39R43AnalyticRemainderProfileCandidate({
    coefficients: [
      [2, 2],
      [3, 3],
    ],
    outerBound: 32,
    outerRadius: 2,
    targetRadius: 1,
    shiftPower: 3,
  });

  assert.equal(
    profile.status,
    "h39-r43-analytic-remainder-profile-candidate-emitted"
  );
  assert.equal(profile.q, 0.5);
  assert.equal(profile.candidate_E_R_finite_prefix, 5);
  assert.equal(profile.candidate_E_R_cauchy_tail_after_prefix_profile, 2);
  assert.equal(profile.candidate_E_R_prefix_plus_tail_bound, 7);
  assert.equal(profile.candidate_M_R_finite_prefix, 3);
  assert.equal(profile.candidate_M_R_cauchy_tail_after_prefix_profile, 6);
  assert.equal(profile.candidate_M_R_prefix_plus_tail_bound, 9);
  assert.equal(profile.centerResidualRemainderProfile, 2);
  assert.equal(profile.rootTangentNumeratorRemainderProfile, 6);
  assert.equal(profile.certifies_continuous_polydisc_primitives, false);
  assert.equal(profile.certifies_directed_rounded_shared_domain, false);
  assert.equal(profile.retained_branch, false);
});

test("h39 Jacobian analytic profile candidate emits optional nu_J tail loss", () => {
  const profile = computeH39JacobianAnalyticRemainderProfileCandidate({
    coefficients: [
      [5, 6],
      [0.5, 0.5],
    ],
    outerBound: 3,
    outerRadius: 1,
    targetRadius: 0.1,
  });

  assert.equal(
    profile.status,
    "h39-jacobian-analytic-remainder-profile-candidate-emitted"
  );
  assert.equal(profile.candidate_nu_J_finite_prefix, 4.95);
  assert.ok(
    Math.abs(profile.candidate_nu_J_cauchy_tail_loss_profile - 1 / 30) <
      1e-15
  );
  assert.ok(
    Math.abs(profile.candidate_nu_J_prefix_plus_tail_floor - 4.916666666666667) <
      1e-15
  );
  assert.equal(
    profile.centerJacobianLowerRemainderProfile,
    profile.candidate_nu_J_cauchy_tail_loss_profile
  );
  assert.equal(profile.certifies_continuous_polydisc_primitives, false);
  assert.equal(profile.certifies_directed_rounded_shared_domain, false);
  assert.equal(profile.retained_branch, false);
});

test("h39 Cauchy shifted-tail helpers expose sufficient bounds only", () => {
  const shifted = computeCauchyShiftedTailMajorants({
    outerBound: 32,
    outerRadius: 2,
    targetRadius: 1,
    shiftPower: 3,
  });
  const quotient = computeCauchyRemovableQuotientFloor({
    outerBound: 6,
    outerRadius: 3,
    targetRadius: 1,
    leadingCoefficientInterval: [5, 6],
  });

  assert.equal(shifted.q, 0.5);
  assert.equal(shifted.shifted_function_majorant, 8);
  assert.equal(shifted.y_derivative_shifted_function_majorant, 8);
  assert.equal(shifted.certifies_continuous_polydisc_primitives, false);
  assert.ok(Math.abs(quotient.removable_quotient_tail_majorant - 1) < 1e-12);
  assert.ok(Math.abs(quotient.removable_quotient_floor - 4) < 1e-12);
  assert.equal(quotient.certifies_continuous_polydisc_primitives, false);
});

test("h39 Cauchy hybrid prefix-tail helpers quantify remaining analytic tail", () => {
  const shifted = computeCauchyShiftedPrefixTailMajorant({
    coefficients: [
      [1, 1],
      [2, 2],
    ],
    outerBound: 32,
    outerRadius: 2,
    targetRadius: 1,
    shiftPower: 3,
  });
  const quotient = computeCauchyRemovableQuotientPrefixFloor({
    coefficients: [
      [5, 6],
      [0.5, 0.5],
    ],
    outerBound: 6,
    outerRadius: 3,
    targetRadius: 1,
  });
  const functionOrder = computeCauchyShiftedTailOrderForTarget({
    outerBound: 32,
    outerRadius: 2,
    targetRadius: 1,
    shiftPower: 3,
    tailTarget: 0.25,
  });
  const derivativeOrder = computeCauchyShiftedTailOrderForTarget({
    outerBound: 32,
    outerRadius: 2,
    targetRadius: 1,
    shiftPower: 3,
    tailTarget: 1,
    tailKind: "y-derivative",
  });

  assert.equal(shifted.finite_prefix_order, 1);
  assert.equal(shifted.finite_prefix_majorant, 3);
  assert.equal(shifted.cauchy_tail_after_prefix_majorant, 2);
  assert.equal(shifted.shifted_function_prefix_plus_tail_majorant, 5);
  assert.equal(shifted.y_derivative_finite_prefix_majorant, 2);
  assert.equal(shifted.y_derivative_cauchy_tail_after_prefix_majorant, 6);
  assert.equal(shifted.y_derivative_prefix_plus_tail_majorant, 8);
  assert.equal(quotient.finite_prefix_order, 1);
  assert.ok(
    Math.abs(
      quotient.removable_quotient_prefix_plus_tail_floor -
        (4.5 - 1 / 3)
    ) < 1e-12
  );
  assert.equal(functionOrder.required_prefix_order, 4);
  assert.equal(derivativeOrder.required_prefix_order, 5);
  assert.equal(functionOrder.certifies_continuous_polydisc_primitives, false);
  assert.equal(derivativeOrder.certifies_continuous_polydisc_primitives, false);
});

test("h39 Cauchy coefficient prefix helpers compute majorants and floors", () => {
  const coefficients = [
    [2, 2],
    [0.5, 0.5],
  ];
  const majorant = computeCauchyCoefficientPrefixMajorant({
    coefficients,
    outerBound: 3,
    outerRadius: 1,
    targetRadius: 0.1,
  });
  const floor = computeCauchyCoefficientPrefixFloor({
    coefficients,
    outerBound: 3,
    outerRadius: 1,
    targetRadius: 0.1,
  });

  assert.equal(majorant.status, "cauchy-coefficient-prefix-majorant-emitted");
  assert.equal(
    majorant.certificate_type,
    "cauchy-coefficient-prefix-geometric-tail-majorant"
  );
  assert.equal(floor.status, "cauchy-coefficient-prefix-floor-emitted");
  assert.equal(majorant.finite_prefix_majorant, 2.05);
  assert.ok(
    Math.abs(majorant.prefix_plus_tail_majorant - 2.0833333333333335) <
      1e-15
  );
  assert.ok(
    Math.abs(floor.prefix_plus_tail_floor - 1.9166666666666667) < 1e-15
  );
  assert.equal(majorant.certifies_continuous_polydisc_primitives, false);
  assert.equal(floor.certifies_continuous_polydisc_primitives, false);

  const envelope = buildCoordinateCauchyEnvelopeCertificate({
    coordinate: "delta_epsilon",
    diagnostic: majorant,
    domainSignature: h39PrimitiveDomainSignature(),
    suppliedCoordinateMajorant: majorant.prefix_plus_tail_majorant,
  });
  assert.equal(envelope.status, "coordinate-cauchy-envelope-certified");
  assert.equal(
    envelope.certificate_type,
    "coordinate-cauchy-prefix-geometric-tail-upper-envelope"
  );
  assert.equal(envelope.certifies_coordinate_cauchy_envelope, true);
  assert.equal(envelope.predicates.tail_ratio_strictly_below_one, true);
  assert.equal(envelope.assumes_fixed_speed_window, false);
});

test("h39 Cauchy tail order sensitivity keeps M_G obstruction candidate-only", () => {
  const sensitivity = computeCauchyShiftedTailOrderSensitivity({
    outerBounds: [1e-20, 1],
    outerRadius: 0.001796875,
    targetRadius: 0.001,
    shiftPower: 41,
    tailTarget: 9.468681741438209e-99,
    tailKind: "unshifted-function",
    maxPrefixOrder: 1000,
  });

  assert.equal(
    sensitivity.status,
    "cauchy-shifted-tail-order-sensitivity-complete"
  );
  assert.equal(sensitivity.rows[0].required_prefix_order, 266);
  assert.equal(sensitivity.rows[1].required_prefix_order, 345);
  assert.equal(sensitivity.certifies_continuous_polydisc_primitives, false);
});

test("h39 N_G denominator-clearance outer majorant stays candidate-only", () => {
  const plusBranch = computeBranchGDenominatorClearanceMajorant({
    kernelMajorant: 3,
    speedLowerBound: 2,
    deltaClearance: 4,
    jacobianClearance: 5,
  });
  const minusBranch = computeBranchGDenominatorClearanceMajorant({
    kernelMajorant: 2,
    speedLowerBound: 4,
    deltaClearance: 2,
    jacobianClearance: 4,
  });
  const nG = computeNGOuterBoundFromDenominatorClearance({
    branchGOuterMajorants: [
      plusBranch.branch_g_outer_majorant,
      minusBranch.branch_g_outer_majorant,
    ],
    lMajorant: 7,
    lowerPolynomialMajorant: 11,
    outerRadius: 0.5,
  });

  assert.equal(plusBranch.denominator_clearance, 160);
  assert.equal(plusBranch.branch_g_outer_majorant, 0.075);
  assert.equal(minusBranch.branch_g_outer_majorant, 0.125);
  assert.equal(nG.pair_g_outer_majorant, 0.2);
  assert.equal(nG.lower_polynomial_y2_majorant, 2.75);
  assert.equal(nG.n_g_outer_bound, 9.95);
  assert.equal(nG.certifies_continuous_polydisc_primitives, false);
  assert.equal(nG.certifies_directed_rounded_shared_domain, false);
});

test("h39 N_G outer-bound candidate M_G restores the y41 scale", () => {
  const diagnostic = computeH39NGOuterBoundCandidateMG({
    nGShiftedCoefficients: [
      [1, 1],
      [2, 2],
    ],
    nGOuterBound: 32,
    nGOuterRadius: 2,
    rho: 1,
    nGShift: 3,
  });

  assert.equal(diagnostic.retained_shifted_prefix_order, 1);
  assert.equal(diagnostic.candidate_M_G_finite_prefix, 3);
  assert.equal(diagnostic.candidate_M_G_cauchy_tail_after_prefix, 2);
  assert.equal(diagnostic.candidate_M_G_prefix_plus_tail_bound, 5);
  assert.equal(diagnostic.shifted_T_G_prefix_plus_tail_majorant, 5);
  assert.equal(
    diagnostic.certifies_directed_rounded_h39_polydisc_M_G_bound,
    false
  );
  assert.equal(diagnostic.retained_branch, false);
});

test("h39 N_G outer-bound primitive replay is candidate-only", () => {
  const replay = computeH39NGOuterBoundPrimitiveReplay({
    nGShiftedCoefficients: [[1e-90, 1e-90]],
    nGOuterBound: 1e-20,
    nGOuterRadius: 0.001796875,
    rho: 0.001,
    candidate_E_R_bound: 10,
    candidate_nu_J_bound: 2,
    candidate_L_J_reduced_continuous_majorant: 0,
    candidate_M_R_bound: 1,
  });

  assert.equal(
    replay.status,
    "h39-n-g-outer-bound-primitive-replay-emitted"
  );
  assert.ok(replay.candidate_M_G_bound > 0);
  assert.equal(replay.candidate_scalar_replay_closes, true);
  assert.equal(replay.certifies_directed_rounded_shared_domain, false);
  assert.equal(replay.retained_branch, false);
});

test("h39 multivariate coefficient-prefix helpers compute shared-domain bounds", () => {
  const entries = [
    { coefficient: [5, 6], powers: [0, 0] },
    { coefficient: [-2, 1], powers: [1, 0] },
    { coefficient: [3, 4], powers: [0, 2] },
  ];

  assert.equal(
    computeMultivariateCoefficientPrefixMajorant(entries, [0.5, 0.25], {
      tailMajorant: 0.1,
    }),
    6 + 2 * 0.5 + 4 * 0.25 ** 2 + 0.1
  );
  assert.ok(
    Math.abs(
      computeMultivariateCoefficientPrefixFloor(entries, [0.5, 0.25], {
        tailMajorant: 0.1,
      }) -
        (5 - (2 * 0.5 + 4 * 0.25 ** 2 + 0.1))
    ) < 1e-12
  );
});

test("h39 multivariate coefficient-prefix helpers accept tuple entries", () => {
  assert.equal(
    computeMultivariateCoefficientPrefixMajorant(
      [
        [[1, 2], [0, 0]],
        [[-3, 3], [2, 1]],
      ],
      [0.5, 0.25]
    ),
    2 + 3 * 0.5 ** 2 * 0.25
  );
});

test("h39 N_G coefficient evaluator preserves the shifted D identity", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const row = evaluateNGCoefficientRows({
    context,
    cell: CELL,
    branchInputs: [
      { branch: "-", hIntervals: hIntervals(), xInterval: [-1, -1] },
      { branch: "+", hIntervals: hIntervals(), xInterval: [1, 1] },
    ],
    shiftedOrder: 3,
  });

  assert.equal(row.status, "h39-n-g-coefficient-rows-evaluated");
  assert.equal(
    row.all_D_plus_40_plus_k_G_identity_witnesses_contain_zero,
    true
  );
  assert.equal(row.N_G_shifted_coefficients.length, 4);
  assert.equal(row.N_D_shifted_coefficients.length, 4);
  assert.equal(row.certifies_continuous_polydisc_primitives, false);
});

test("h39 shared-domain coefficient summary refuses continuous primitive bounds", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const r43 = evaluateR43CoefficientRows({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
    rho: 0.001,
  });
  const nG = evaluateNGCoefficientRows({
    context,
    cell: CELL,
    branchInputs: [
      { branch: "-", hIntervals: hIntervals(), xInterval: [0, 0] },
      { branch: "+", hIntervals: hIntervals(), xInterval: [0, 0] },
    ],
  });
  const summary = summarizeSharedDomainPrimitiveBounds({
    r43Rows: [r43],
    nGRows: [nG],
    rho: 0.001,
  });

  assert.equal(
    summary.schema,
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA
  );
  assert.equal(summary.E_R, null);
  assert.equal(summary.nu_J, null);
  assert.equal(summary.L_J, null);
  assert.equal(summary.M_R, null);
  assert.equal(summary.M_G, null);
  assert.equal(summary.certifies_continuous_polydisc_primitives, false);
  assert.ok(summary.max_abs_R43_center_coefficient > 0);
  assert.ok(summary.max_abs_N_G_shifted_coefficient > 0);
  assert.ok(summary.candidate_E_R_finite_prefix > 0);
  assert.ok(summary.candidate_M_R_finite_prefix > 0);
  assert.ok(Number.isFinite(summary.candidate_nu_J_finite_prefix));
  assert.ok(Number.isFinite(summary.candidate_L_J_finite_prefix));
  assert.equal(summary.second_x_kernel_y_power, 41);
  assert.ok(summary.candidate_M_K_finite_prefix > 0);
  assert.equal(
    summary.candidate_L_J_factored_finite_prefix,
    summary.candidate_L_J_finite_prefix
  );
  assert.equal(
    summary.candidate_L_J_factor_identity_finite_prefix_holds,
    true
  );
  assert.ok(summary.candidate_M_K_continuous_majorant > 0);
  assert.ok(summary.candidate_L_J_reduced_continuous_majorant > 0);
  assert.ok(
    summary.candidate_L_J_reduced_continuous_majorant >=
      summary.candidate_L_J_factored_finite_prefix
  );
  assert.equal(
    summary.candidate_L_J_reduced_continuous_majorant_source,
    "kernel-continuous-majorant"
  );
  assert.ok(summary.candidate_M_G_finite_prefix > 0);
  assert.equal(summary.candidate_E_R_cauchy_tail_after_prefix_profile, null);
  assert.equal(summary.candidate_M_R_cauchy_tail_after_prefix_profile, null);
  assert.equal(summary.candidate_M_G_cauchy_tail_after_prefix_profile, null);
  assert.equal(summary.candidate_nu_J_cauchy_tail_loss_profile, null);
  assert.equal(
    summary.candidate_nu_J_outer_bound_source,
    "missing-jacobian-cauchy-outer-bound"
  );
  assert.ok(summary.candidate_L_J_reduced_minus_finite_prefix_profile >= 0);
  assert.equal(
    summary.candidate_finite_prefix_primitive_profile_scale_replay
      .certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(
    summary.candidate_finite_prefix_primitive_profile_scale_replay
      .certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    summary.candidate_profile_direction_complete_for_shared_domain_closure,
    false
  );
  assert.equal(
    summary.candidate_h39_full_cauchy_primitive_profile_vector_status,
    "h39-full-cauchy-primitive-profile-vector-candidate-incomplete"
  );
  assert.equal(
    summary.candidate_h39_full_cauchy_primitive_profile_vector_complete,
    false
  );
  assert.deepEqual(
    summary.candidate_h39_full_cauchy_primitive_profile_vector_missing_components,
    ["E_R", "M_R", "M_G", "nu_J"]
  );
  const profileReplay =
    summary.candidate_finite_prefix_primitive_profile_scale_replay;
  assert.equal(
    summary.candidate_profile_scale_exact_fixed_radii_lambda_supremum,
    profileReplay.candidate_profile_scale_exact_fixed_radii_lambda_supremum
  );
  assert.equal(
    summary.candidate_profile_scale_exact_fixed_radii_bottleneck_name,
    profileReplay.candidate_profile_scale_exact_fixed_radii_bottleneck_name
  );
  assert.equal(
    summary.candidate_profile_scale_exact_fixed_radii_required_scale,
    profileReplay.candidate_profile_scale_exact_fixed_radii_required_scale
  );
  assert.equal(
    summary.candidate_profile_scale_exact_fixed_radii_strict_headroom,
    profileReplay.candidate_profile_scale_exact_fixed_radii_strict_headroom
  );
  assert.equal(
    summary.candidate_profile_scale_exact_fixed_radii_closes_required_scale,
    profileReplay
      .candidate_profile_scale_exact_fixed_radii_closes_required_scale
  );
  assert.equal(
    summary.candidate_profile_scale_exact_fixed_radii_not_applicable_reason,
    profileReplay
      .candidate_profile_scale_exact_fixed_radii_not_applicable_reason
  );
  assert.equal(
    summary.candidate_profile_scale_exact_fixed_radii_J_min_at_required_scale,
    profileReplay
      .candidate_profile_scale_exact_fixed_radii_J_min_at_required_scale
  );
  assert.equal(
    summary
      .candidate_profile_scale_exact_fixed_radii_rouche_margin_at_required_scale,
    profileReplay
      .candidate_profile_scale_exact_fixed_radii_rouche_margin_at_required_scale
  );
  assert.equal(
    summary
      .candidate_profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale,
    profileReplay
      .candidate_profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale
  );
  assert.equal(
    summary
      .candidate_profile_scale_exact_fixed_radii_required_scale_margin_closes,
    profileReplay
      .candidate_profile_scale_exact_fixed_radii_required_scale_margin_closes
  );
  assert.deepEqual(
    summary
      .candidate_profile_scale_exact_fixed_radii_required_scale_failed_margin_names,
    profileReplay
      .candidate_profile_scale_exact_fixed_radii_required_scale_failed_margin_names
  );
  const backend =
    buildH39PrimitiveVectorBackendArtifactFromSummary(summary);
  assert.equal(
    backend.schema,
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_PRIMITIVE_VECTOR_BACKEND_ARTIFACT_SCHEMA
  );
  assert.deepEqual(backend.missing_candidate_components, [
    "E_R",
    "M_R",
    "M_G",
    "nu_J",
  ]);
  assert.equal(
    backend.candidate_primitive_vector.center_residual_bound_E_R,
    null
  );
  assert.equal(
    backend.candidate_primitive_vector.candidate_root_tangent_numerator_bound_M_R,
    null
  );
  assert.equal(backend.candidate_primitive_vector.candidate_M_G_bound, null);
  assert.equal(
    backend.candidate_primitive_vector.center_jacobian_lower_bound_nu_J,
    null
  );
  assert.equal(
    backend.candidate_primitive_vector.jacobian_lipschitz_bound_L_J,
    summary.candidate_L_J_reduced_continuous_majorant
  );
  assert.equal(backend.primitive_diagnostic_input_ready, false);
  assert.equal(
    backend.source_vector_candidate
      .candidate_profile_scale_exact_fixed_radii_lambda_supremum,
    summary.candidate_profile_scale_exact_fixed_radii_lambda_supremum
  );
  assert.equal(
    backend.profile_scale_exact_fixed_radii_lambda_supremum,
    summary.candidate_profile_scale_exact_fixed_radii_lambda_supremum
  );
  assert.equal(
    backend.profile_scale_exact_fixed_radii_strict_headroom,
    summary.candidate_profile_scale_exact_fixed_radii_strict_headroom
  );
  assert.equal(
    backend.profile_scale_exact_fixed_radii_closes_required_scale,
    summary.candidate_profile_scale_exact_fixed_radii_closes_required_scale
  );
  assert.equal(
    backend.source_vector_candidate
      .candidate_profile_scale_exact_fixed_radii_J_min_at_required_scale,
    summary.candidate_profile_scale_exact_fixed_radii_J_min_at_required_scale
  );
  assert.equal(
    backend.source_vector_candidate
      .candidate_profile_scale_exact_fixed_radii_rouche_margin_at_required_scale,
    summary
      .candidate_profile_scale_exact_fixed_radii_rouche_margin_at_required_scale
  );
  assert.equal(
    backend.source_vector_candidate
      .candidate_profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale,
    summary
      .candidate_profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale
  );
  assert.equal(
    backend.source_vector_candidate
      .candidate_profile_scale_exact_fixed_radii_required_scale_margin_closes,
    summary
      .candidate_profile_scale_exact_fixed_radii_required_scale_margin_closes
  );
  assert.equal(
    backend.profile_scale_exact_fixed_radii_J_min_at_required_scale,
    summary.candidate_profile_scale_exact_fixed_radii_J_min_at_required_scale
  );
  assert.equal(
    backend.profile_scale_exact_fixed_radii_rouche_margin_at_required_scale,
    summary
      .candidate_profile_scale_exact_fixed_radii_rouche_margin_at_required_scale
  );
  assert.equal(
    backend
      .profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale,
    summary
      .candidate_profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale
  );
  assert.equal(
    backend.profile_scale_exact_fixed_radii_required_scale_margin_closes,
    summary
      .candidate_profile_scale_exact_fixed_radii_required_scale_margin_closes
  );
  assert.deepEqual(
    backend.profile_scale_exact_fixed_radii_required_scale_failed_margin_names,
    summary
      .candidate_profile_scale_exact_fixed_radii_required_scale_failed_margin_names
  );
  assert.equal(
    backend.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    summary.candidate_finite_prefix_primitive_scalar_replay
      .certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(
    summary.candidate_finite_prefix_primitive_scalar_replay
      .certifies_directed_rounded_shared_domain,
    false
  );
  assert.ok(
    Number.isFinite(
      summary.candidate_finite_prefix_primitive_scalar_replay
        .candidate_rho_X
    )
  );
  assert.equal(JSON.stringify(summary).includes("speed_band"), false);
});

test("h39 shared-domain summary threads Cauchy profiles into profile replay", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const r43 = evaluateR43CoefficientRows({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
    rho: 0.001,
  });
  const nG = evaluateNGCoefficientRows({
    context,
    cell: CELL,
    branchInputs: [
      { branch: "-", hIntervals: hIntervals(), xInterval: [0, 0] },
      { branch: "+", hIntervals: hIntervals(), xInterval: [0, 0] },
    ],
  });
  const summary = summarizeSharedDomainPrimitiveBounds({
    r43Rows: [r43],
    nGRows: [nG],
    rho: 0.001,
    r43CauchyOuterBound: 32,
    r43CauchyOuterRadius: 2,
    nGCauchyOuterBound: 32,
    nGCauchyOuterRadius: 2,
    jacobianCauchyOuterBound: 3,
    jacobianCauchyOuterRadius: 2,
  });

  assert.ok(summary.candidate_E_R_cauchy_tail_after_prefix_profile > 0);
  assert.ok(summary.candidate_M_R_cauchy_tail_after_prefix_profile > 0);
  assert.ok(summary.candidate_M_G_cauchy_tail_after_prefix_profile > 0);
  assert.ok(summary.candidate_nu_J_cauchy_tail_loss_profile > 0);
  assert.equal(
    summary.candidate_E_R_prefix_plus_tail_bound,
    summary.candidate_E_R_finite_prefix +
      summary.candidate_E_R_cauchy_tail_after_prefix_profile
  );
  assert.equal(
    summary.candidate_M_R_prefix_plus_tail_bound,
    summary.candidate_M_R_finite_prefix +
      summary.candidate_M_R_cauchy_tail_after_prefix_profile
  );
  assert.equal(
    summary.candidate_nu_J_outer_bound_source,
    "explicit-jacobian-cauchy-outer-bound"
  );
  assert.equal(
    summary.candidate_finite_prefix_primitive_profile_scale_replay
      .center_residual_remainder_profile_E_R,
    summary.candidate_E_R_cauchy_tail_after_prefix_profile
  );
  assert.equal(
    summary.candidate_finite_prefix_primitive_profile_scale_replay
      .center_jacobian_lower_remainder_profile_nu_J,
    summary.candidate_nu_J_cauchy_tail_loss_profile
  );
  assert.equal(
    summary.candidate_finite_prefix_primitive_profile_scale_replay
      .M_G_remainder_profile,
    summary.candidate_M_G_cauchy_tail_after_prefix_profile
  );
  assert.equal(
    summary.candidate_finite_prefix_primitive_profile_scale_replay
      .M_R_remainder_profile,
    summary.candidate_M_R_cauchy_tail_after_prefix_profile
  );
  assert.equal(
    summary.candidate_finite_prefix_primitive_profile_scale_replay
      .candidate_profile_known_L_J_continuous_remainder_only,
    false
  );
  assert.equal(
    summary.candidate_h39_full_cauchy_primitive_profile_vector_status,
    "h39-full-cauchy-primitive-profile-vector-candidate-closes"
  );
  assert.equal(
    summary.candidate_h39_full_cauchy_primitive_profile_vector_complete,
    true
  );
  assert.deepEqual(
    summary.candidate_h39_full_cauchy_primitive_profile_vector_missing_components,
    []
  );
  assert.equal(
    summary.candidate_profile_direction_complete_for_shared_domain_closure,
    true
  );
  const profileReplay =
    summary.candidate_finite_prefix_primitive_profile_scale_replay;
  assert.equal(
    summary.candidate_profile_scale_exact_fixed_radii_lambda_supremum,
    profileReplay.candidate_profile_scale_exact_fixed_radii_lambda_supremum
  );
  assert.equal(
    summary.candidate_profile_scale_exact_fixed_radii_bottleneck_name,
    profileReplay.candidate_profile_scale_exact_fixed_radii_bottleneck_name
  );
  assert.equal(
    summary.candidate_profile_scale_exact_fixed_radii_required_scale,
    profileReplay.candidate_profile_scale_exact_fixed_radii_required_scale
  );
  assert.equal(
    summary.candidate_profile_scale_exact_fixed_radii_strict_headroom,
    profileReplay.candidate_profile_scale_exact_fixed_radii_strict_headroom
  );
  assert.equal(
    summary.candidate_profile_scale_exact_fixed_radii_closes_required_scale,
    profileReplay
      .candidate_profile_scale_exact_fixed_radii_closes_required_scale
  );
  assert.equal(
    summary.candidate_profile_scale_exact_fixed_radii_not_applicable_reason,
    profileReplay
      .candidate_profile_scale_exact_fixed_radii_not_applicable_reason
  );
  assert.equal(
    summary.candidate_profile_scale_exact_fixed_radii_J_min_at_required_scale,
    profileReplay
      .candidate_profile_scale_exact_fixed_radii_J_min_at_required_scale
  );
  assert.equal(
    summary
      .candidate_profile_scale_exact_fixed_radii_rouche_margin_at_required_scale,
    profileReplay
      .candidate_profile_scale_exact_fixed_radii_rouche_margin_at_required_scale
  );
  assert.equal(
    summary
      .candidate_profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale,
    profileReplay
      .candidate_profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale
  );
  assert.equal(
    summary
      .candidate_profile_scale_exact_fixed_radii_required_scale_margin_closes,
    profileReplay
      .candidate_profile_scale_exact_fixed_radii_required_scale_margin_closes
  );
  assert.deepEqual(
    summary
      .candidate_profile_scale_exact_fixed_radii_required_scale_failed_margin_names,
    profileReplay
      .candidate_profile_scale_exact_fixed_radii_required_scale_failed_margin_names
  );
  const backend =
    buildH39PrimitiveVectorBackendArtifactFromSummary(summary);
  assert.equal(
    backend.profile_vector_backend_status,
    "h39-full-cauchy-primitive-vector-candidate-closes"
  );
  assert.deepEqual(backend.missing_candidate_components, []);
  assert.equal(
    backend.candidate_primitive_vector.center_residual_bound_E_R,
    summary.candidate_E_R_prefix_plus_tail_bound
  );
  assert.equal(
    backend.candidate_primitive_vector.candidate_root_tangent_numerator_bound_M_R,
    summary.candidate_M_R_prefix_plus_tail_bound
  );
  assert.equal(
    backend.candidate_primitive_vector.candidate_M_G_bound,
    summary.candidate_M_G_prefix_plus_tail_bound
  );
  assert.equal(
    backend.candidate_primitive_vector.center_jacobian_lower_bound_nu_J,
    summary.candidate_nu_J_prefix_plus_tail_floor
  );
  assert.equal(
    backend.candidate_primitive_vector.jacobian_lipschitz_bound_L_J,
    summary.candidate_L_J_reduced_continuous_majorant
  );
  assert.equal(backend.primitive_diagnostic_input_ready, true);
  assert.equal(
    backend.source_vector_candidate
      .candidate_profile_scale_exact_fixed_radii_lambda_supremum,
    summary.candidate_profile_scale_exact_fixed_radii_lambda_supremum
  );
  assert.equal(
    backend.source_vector_candidate
      .candidate_profile_scale_exact_fixed_radii_strict_headroom,
    summary.candidate_profile_scale_exact_fixed_radii_strict_headroom
  );
  assert.equal(
    backend.source_vector_candidate
      .candidate_profile_scale_exact_fixed_radii_J_min_at_required_scale,
    summary.candidate_profile_scale_exact_fixed_radii_J_min_at_required_scale
  );
  assert.equal(
    backend.source_vector_candidate
      .candidate_profile_scale_exact_fixed_radii_rouche_margin_at_required_scale,
    summary
      .candidate_profile_scale_exact_fixed_radii_rouche_margin_at_required_scale
  );
  assert.equal(
    backend.source_vector_candidate
      .candidate_profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale,
    summary
      .candidate_profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale
  );
  assert.equal(
    backend.source_vector_candidate
      .candidate_profile_scale_exact_fixed_radii_required_scale_margin_closes,
    summary
      .candidate_profile_scale_exact_fixed_radii_required_scale_margin_closes
  );
  assert.equal(
    backend.profile_scale_exact_fixed_radii_lambda_supremum,
    summary.candidate_profile_scale_exact_fixed_radii_lambda_supremum
  );
  assert.equal(
    backend.profile_scale_exact_fixed_radii_bottleneck_name,
    summary.candidate_profile_scale_exact_fixed_radii_bottleneck_name
  );
  assert.equal(
    backend.profile_scale_exact_fixed_radii_required_scale,
    summary.candidate_profile_scale_exact_fixed_radii_required_scale
  );
  assert.equal(
    backend.profile_scale_exact_fixed_radii_strict_headroom,
    summary.candidate_profile_scale_exact_fixed_radii_strict_headroom
  );
  assert.equal(
    backend.profile_scale_exact_fixed_radii_closes_required_scale,
    summary.candidate_profile_scale_exact_fixed_radii_closes_required_scale
  );
  assert.equal(
    backend.profile_scale_exact_fixed_radii_not_applicable_reason,
    summary.candidate_profile_scale_exact_fixed_radii_not_applicable_reason
  );
  assert.equal(
    backend.profile_scale_exact_fixed_radii_J_min_at_required_scale,
    summary.candidate_profile_scale_exact_fixed_radii_J_min_at_required_scale
  );
  assert.equal(
    backend.profile_scale_exact_fixed_radii_rouche_margin_at_required_scale,
    summary
      .candidate_profile_scale_exact_fixed_radii_rouche_margin_at_required_scale
  );
  assert.equal(
    backend
      .profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale,
    summary
      .candidate_profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale
  );
  assert.equal(
    backend.profile_scale_exact_fixed_radii_required_scale_margin_closes,
    summary
      .candidate_profile_scale_exact_fixed_radii_required_scale_margin_closes
  );
  assert.deepEqual(
    backend.profile_scale_exact_fixed_radii_required_scale_failed_margin_names,
    summary
      .candidate_profile_scale_exact_fixed_radii_required_scale_failed_margin_names
  );
  assert.equal(
    backend.primitive_diagnostic_input.primitive_bounds_status,
    "provided-unverified"
  );
  assert.equal(backend.result.retained_branch, false);
  assert.equal(
    summary.candidate_finite_prefix_primitive_profile_scale_replay
      .certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(
    summary.candidate_finite_prefix_primitive_profile_scale_replay
      .certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(JSON.stringify(summary).includes("speed_band"), false);
});

test("h39 shared-domain coefficient cell evaluates both centered branches without closure claims", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const cell = evaluateH39SharedDomainCoefficientCell({
    context,
    cell: CELL,
    branchInputs: [
      { branch: "-", hIntervals: hIntervals() },
      { branch: "+", hIntervals: hIntervals() },
    ],
    shiftedOrder: 1,
    rho: 0.001,
  });

  assert.equal(cell.status, "h39-shared-domain-coefficient-cell-evaluated");
  assert.equal(cell.h39_center_solves.length, 2);
  assert.equal(cell.r43_rows.length, 2);
  assert.equal(
    cell.n_g_row.all_D_plus_40_plus_k_G_identity_witnesses_contain_zero,
    true
  );
  assert.ok(cell.finite_prefix_summary.candidate_E_R_finite_prefix > 0);
  assert.ok(cell.finite_prefix_summary.candidate_M_G_finite_prefix > 0);
  assert.equal(
    cell.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(cell.claim_boundary.retained_branch, false);
});

test("h39 shared-domain coefficient cell threads coordinate Cauchy outer bounds into profile replay", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const cell = evaluateH39SharedDomainCoefficientCell({
    context,
    cell: CELL,
    branchInputs: [
      { branch: "-", hIntervals: hIntervals() },
      { branch: "+", hIntervals: hIntervals() },
    ],
    shiftedOrder: 1,
    rho: 0.001,
    coordinateCauchyOuterRadius: 0.01,
    coordinateJacobianNumeratorOuterRadius: 0.02,
    coordinateJacobianOuterRadius: 0.01,
    coordinateXOuterRadius: 1e-6,
    nGCauchyOuterBound: 32,
    nGCauchyOuterRadius: 2,
  });
  const profile = cell.coordinate_cauchy_outer_bounds_profile_candidate;
  const summary = cell.finite_prefix_summary;

  assert.equal(
    profile.status,
    "h39-coordinate-cauchy-outer-bounds-profile-candidate-emitted"
  );
  assert.ok(profile.candidate_R43_source_outer_bound > 0);
  assert.ok(profile.candidate_R43_jacobian_outer_bound > 0);
  assert.equal(
    summary.candidate_R43_outer_bound_source,
    "coordinate-source-residual-cauchy-outer-bound"
  );
  assert.equal(
    summary.candidate_nu_J_outer_bound_source,
    "coordinate-removable-jacobian-cauchy-outer-bound"
  );
  assert.ok(
    Number.isFinite(summary.candidate_E_R_cauchy_tail_after_prefix_profile)
  );
  assert.ok(summary.candidate_E_R_cauchy_tail_after_prefix_profile > 0);
  assert.ok(summary.candidate_M_R_cauchy_tail_after_prefix_profile > 0);
  assert.ok(summary.candidate_M_G_cauchy_tail_after_prefix_profile > 0);
  assert.ok(summary.candidate_nu_J_cauchy_tail_loss_profile > 0);
  assert.equal(
    summary.candidate_finite_prefix_primitive_profile_scale_replay
      .center_residual_remainder_profile_E_R,
    summary.candidate_E_R_cauchy_tail_after_prefix_profile
  );
  assert.equal(
    summary.candidate_finite_prefix_primitive_profile_scale_replay
      .center_jacobian_lower_remainder_profile_nu_J,
    summary.candidate_nu_J_cauchy_tail_loss_profile
  );
  assert.equal(
    summary.candidate_finite_prefix_primitive_profile_scale_replay
      .certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    summary.candidate_h39_full_cauchy_primitive_profile_vector_status,
    "h39-full-cauchy-primitive-profile-vector-candidate-scale-inequalities-open"
  );
  assert.equal(
    summary.candidate_h39_full_cauchy_primitive_profile_vector_complete,
    true
  );
  assert.equal(
    summary.candidate_profile_direction_complete_for_shared_domain_closure,
    true
  );
  assert.equal(cell.claim_boundary.retained_branch, false);
  assert.equal(JSON.stringify(cell).includes("speed_band"), false);
});

test("h39 shared-domain coefficient cell threads denominator Cauchy N_G bound into M_G profile", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const cell = evaluateH39SharedDomainCoefficientCell({
    context,
    cell: CELL,
    branchInputs: [
      { branch: "-", hIntervals: hIntervals() },
      { branch: "+", hIntervals: hIntervals() },
    ],
    shiftedOrder: 1,
    rho: 0.001,
    denominatorCauchyOuterRadius: 0.01,
    denominatorDeltaCauchyOuterBound: 100,
    denominatorPhiCauchyOuterBound: 100,
    denominatorJacobianAbsCauchyOuterBound: 100,
    denominatorLMajorant: 2,
    denominatorLowerPolynomialMajorant: 3,
    rhoX: 0.01,
    rX: 0.008,
  });
  const candidate = cell.denominator_cauchy_n_g_outer_bound_candidate;
  const summary = cell.finite_prefix_summary;

  assert.equal(
    candidate.status,
    "h39-denominator-cauchy-n-g-outer-bound-candidate-emitted"
  );
  assert.ok(candidate.n_g_cauchy_outer_bound > 0);
  assert.equal(
    summary.candidate_N_G_outer_bound_source,
    "branch-denominator-cauchy-outer-bound"
  );
  assert.ok(summary.candidate_M_G_cauchy_tail_after_prefix_profile > 0);
  assert.equal(
    summary.candidate_finite_prefix_primitive_profile_scale_replay
      .M_G_remainder_profile,
    summary.candidate_M_G_cauchy_tail_after_prefix_profile
  );
  assert.equal(
    summary.candidate_finite_prefix_primitive_profile_scale_replay
      .certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    summary.candidate_h39_full_cauchy_primitive_profile_vector_status,
    "h39-full-cauchy-primitive-profile-vector-candidate-incomplete"
  );
  assert.equal(
    summary.candidate_h39_full_cauchy_primitive_profile_vector_complete,
    false
  );
  assert.deepEqual(
    summary.candidate_h39_full_cauchy_primitive_profile_vector_missing_components,
    ["E_R", "M_R", "nu_J"]
  );
  assert.equal(cell.claim_boundary.retained_branch, false);
  assert.equal(JSON.stringify(cell).includes("speed_band"), false);
});

test("h39 shared-domain coefficient cell emits same-domain evaluator source certificates", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const domainSignature = h39PrimitiveDomainSignature();
  const cell = evaluateH39SharedDomainCoefficientCell({
    context,
    cell: CELL,
    branchInputs: [
      { branch: "-", hIntervals: hIntervals() },
      { branch: "+", hIntervals: hIntervals() },
    ],
    shiftedOrder: 1,
    rho: 0.001,
    sharedDomainSignature: domainSignature,
    coordinateCauchyOuterRadius: 0.9,
    coordinateJacobianNumeratorOuterRadius: 1.35,
    coordinateJacobianOuterRadius: 0.9,
    coordinateXOuterRadius: 1e-6,
    denominatorCauchyOuterRadius: 0.5,
    denominatorDeltaCauchyOuterBound: 100,
    denominatorPhiCauchyOuterBound: 100,
    denominatorJacobianAbsCauchyOuterBound: 100,
    denominatorLMajorant: 2,
    denominatorLowerPolynomialMajorant: 3,
    rhoX: 0.01,
    rX: 0.008,
  });
  const report = cell.evaluator_source_certificate_report;
  const coordinateSource =
    cell.coordinate_cauchy_outer_bounds_profile_candidate;
  const denominatorSource =
    cell.denominator_cauchy_n_g_outer_bound_candidate;
  const branchWitnessSet =
    cell.h39_K_epsilon_branch_coordinate_witness_set;
  const graphRadiiWitness = cell.graph_radii_witness;

  assert.equal(
    report.status,
    "h39-evaluator-source-certificates-emitted"
  );
  assert.deepEqual(report.predicate_check.failed_predicates, []);
  assert.equal(
    report.result.h39_evaluator_source_handoffs_certified,
    true
  );
  assert.equal(coordinateSource.domain_signature, domainSignature);
  assert.equal(
    coordinateSource.certifies_directed_rounded_coordinate_cauchy_outer_bounds,
    true
  );
  assert.equal(
    coordinateSource.source_residual_outer_bound_candidates.every(
      (candidate) =>
        candidate.outward_rounded_transcendental_provenance === true &&
        candidate.sinh_delta_taylor_majorant
          .certifies_outward_rounded_transcendental_upper_bound === true &&
        candidate.sinh_phi_taylor_majorant
          .certifies_outward_rounded_transcendental_upper_bound === true
    ),
    true
  );
  assert.equal(denominatorSource.domain_signature, domainSignature);
  assert.equal(
    denominatorSource.certifies_directed_rounded_denominator_cauchy_N_G_outer_bound,
    true
  );
  assert.equal(
    denominatorSource.branch_denominator_candidates.every(
      (candidate) =>
        candidate.outward_rounded_transcendental_provenance === true &&
        candidate.sinh_delta_taylor_majorant
          .certifies_outward_rounded_transcendental_upper_bound === true &&
        candidate.sinh_phi_taylor_majorant
          .certifies_outward_rounded_transcendental_upper_bound === true
    ),
    true
  );
  assert.equal(
    branchWitnessSet.witness_status,
    "directed-rounded-same-domain-K_epsilon-branch-coordinate-witness-set-certified"
  );
  assert.equal(branchWitnessSet.rho, 0.001);
  assert.equal(branchWitnessSet.outer_radius, 0.5);
  assert.equal(
    graphRadiiWitness.schema,
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_GRAPH_RADII_WITNESS_SCHEMA
  );
  assert.equal(
    graphRadiiWitness.witness_status,
    "directed-rounded-same-domain-graph-radii-witness-certified"
  );
  assert.equal(graphRadiiWitness.rho_X, 0.01);
  assert.equal(graphRadiiWitness.r_X, 0.008);
  assert.equal(graphRadiiWitness.domain_signature, domainSignature);
  assert.deepEqual(
    graphRadiiWitness.predicate_check.failed_predicates,
    []
  );
  assert.equal(
    graphRadiiWitness.claim_boundary
      .certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    graphRadiiWitness.result.h39_continuous_tail_certificate,
    false
  );
  assert.equal(graphRadiiWitness.result.retained_branch, false);
  assert.equal(
    cell.claim_boundary.emits_directed_rounded_source_handoffs,
    true
  );
  assert.equal(
    cell.claim_boundary.emits_K_epsilon_branch_coordinate_witness_set,
    true
  );
  assert.equal(cell.claim_boundary.emits_graph_radii_witness, true);
  assert.equal(
    cell.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    report.claim_boundary
      .certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound,
    false
  );
  assert.equal(report.claim_boundary.retained_branch, false);
  assert.equal(JSON.stringify(cell).includes("speed_band"), false);
});

test("h39 source-certificate computation errors are recorded as obstructions", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const domainSignature = h39PrimitiveDomainSignature();
  const cell = evaluateH39SharedDomainCoefficientCell({
    context,
    cell: CELL,
    branchInputs: [
      { branch: "-", hIntervals: hIntervals() },
      { branch: "+", hIntervals: hIntervals() },
    ],
    shiftedOrder: 1,
    rho: 0.001,
    sharedDomainSignature: domainSignature,
    coordinateCauchyOuterRadius: 10,
    coordinateJacobianNumeratorOuterRadius: 15,
    coordinateJacobianOuterRadius: 10,
    coordinateXOuterRadius: 1e-6,
    denominatorCauchyOuterRadius: 0.5,
    denominatorDeltaCauchyOuterBound: 100,
    denominatorPhiCauchyOuterBound: 100,
    denominatorJacobianAbsCauchyOuterBound: 100,
    denominatorLMajorant: 2,
    denominatorLowerPolynomialMajorant: 3,
    rhoX: 0.01,
    rX: 0.008,
  });

  assert.equal(cell.coordinate_cauchy_outer_bounds_profile_candidate, null);
  assert.equal(cell.evaluator_source_certificate_report, null);
  assert.equal(cell.source_certificate_obstructions.length, 1);
  assert.equal(
    cell.source_certificate_obstructions[0].source_family,
    "coordinate_cauchy_outer_bounds"
  );
  assert.equal(
    cell.source_certificate_obstructions[0].status,
    "open-source-certificate-computation-error"
  );
  assert.match(
    cell.source_certificate_obstructions[0].message,
    /sinh Taylor majorant overflowed before the tail bound/
  );
  assert.equal(
    cell.source_certificate_obstructions[0].candidate_obstructions[0]
      .candidate_index,
    0
  );
  assert.equal(
    cell.h39_K_epsilon_branch_coordinate_witness_set.result
      .h39_K_epsilon_branch_coordinate_witness_set,
    true
  );
  assert.equal(
    cell.graph_radii_witness.result.h39_graph_radii_witness,
    true
  );
  assert.equal(
    cell.claim_boundary.emits_directed_rounded_source_handoffs,
    false
  );
  assert.equal(
    cell.claim_boundary.emits_K_epsilon_branch_coordinate_witness_set,
    true
  );
  assert.equal(JSON.stringify(cell).includes("speed_band"), false);
});

test("h39 coordinate source envelope candidates fall back to certified radius", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const domainSignature = h39PrimitiveDomainSignature();
  const cell = evaluateH39SharedDomainCoefficientCell({
    context,
    cell: CELL,
    branchInputs: [
      { branch: "-", hIntervals: hIntervals() },
      { branch: "+", hIntervals: hIntervals() },
    ],
    shiftedOrder: 1,
    rho: 0.001,
    sharedDomainSignature: domainSignature,
    coordinateSourceEnvelopeCandidates: [
      {
        coordinateCauchyOuterRadius: 10,
        coordinateJacobianNumeratorOuterRadius: 15,
        coordinateJacobianOuterRadius: 10,
      },
      {
        coordinateCauchyOuterRadius: 0.9,
        coordinateJacobianNumeratorOuterRadius: 1.35,
        coordinateJacobianOuterRadius: 0.9,
      },
    ],
    coordinateXOuterRadius: 1e-6,
    denominatorCauchyOuterRadius: 0.5,
    denominatorDeltaCauchyOuterBound: 100,
    denominatorPhiCauchyOuterBound: 100,
    denominatorJacobianAbsCauchyOuterBound: 100,
    denominatorLMajorant: 2,
    denominatorLowerPolynomialMajorant: 3,
    rhoX: 0.01,
    rX: 0.008,
  });
  const coordinateSource =
    cell.coordinate_cauchy_outer_bounds_profile_candidate;
  const selection = coordinateSource.coordinate_source_envelope_selection;

  assert.deepEqual(cell.source_certificate_obstructions, []);
  assert.equal(
    selection.status,
    "coordinate-source-envelope-fallback-candidate-certified"
  );
  assert.equal(selection.selected_candidate_index, 1);
  assert.equal(selection.failed_candidate_count, 1);
  assert.match(
    selection.failed_candidate_obstructions[0].message,
    /sinh Taylor majorant overflowed before the tail bound/
  );
  assert.equal(coordinateSource.r43_cauchy_outer_radius, 0.9);
  assert.equal(coordinateSource.jacobian_cauchy_outer_radius, 0.9);
  assert.equal(
    cell.evaluator_source_certificate_report.result
      .h39_evaluator_source_handoffs_certified,
    true
  );
  assert.equal(
    cell.claim_boundary.emits_directed_rounded_source_handoffs,
    true
  );
  assert.equal(JSON.stringify(cell).includes("speed_band"), false);
});

test("h39 shifted R43 source envelope feeds a cancellation-aware primitive profile", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 60 });
  const domainSignature = h39PrimitiveDomainSignature();
  const cell = evaluateH39SharedDomainCoefficientCell({
    context,
    cell: CELL,
    branchInputs: [
      {
        branch: "-",
        hIntervals: hIntervals(),
        solveSlopeInterval: [0.15, 0.152],
      },
      {
        branch: "+",
        hIntervals: hIntervals(),
        solveSlopeInterval: [-0.152, -0.15],
      },
    ],
    shiftedOrder: 10,
    rho: 0.001,
    sharedDomainSignature: domainSignature,
    coordinateSourceEnvelopeCandidates: [
      {
        r43ShiftedCauchyOuterBound: 1e-3,
        r43ShiftedCauchyOuterRadius: 0.01,
        directedRoundedShiftedR43Provenance: true,
        certifiesShiftedR43ZeroPrefix: true,
        coordinateJacobianNumeratorOuterRadius: 0.02,
        coordinateJacobianOuterRadius: 0.01,
      },
    ],
    coordinateXOuterRadius: 1e-6,
    denominatorCauchyOuterRadius: 0.01,
    denominatorDeltaCauchyOuterBound: 100,
    denominatorPhiCauchyOuterBound: 100,
    denominatorJacobianAbsCauchyOuterBound: 100,
    denominatorLMajorant: 2,
    denominatorLowerPolynomialMajorant: 3,
    rhoX: 0.01,
    rX: 0.008,
  });
  const coordinateSource =
    cell.coordinate_cauchy_outer_bounds_profile_candidate;
  const summary = cell.finite_prefix_summary;

  assert.deepEqual(cell.source_certificate_obstructions, []);
  assert.equal(
    coordinateSource.source_envelope_kind,
    "shifted-removable-r43-cauchy-outer-bound"
  );
  assert.equal(coordinateSource.r43_cauchy_tail_shift_power, 0);
  assert.equal(
    coordinateSource.source_residual_outer_bound_candidates.every(
      (candidate) => candidate.source_zero_prefix_certified === true
    ),
    true
  );
  assert.equal(
    cell.evaluator_source_certificate_report.result
      .h39_evaluator_source_handoffs_certified,
    true
  );
  assert.equal(
    cell.claim_boundary.emits_directed_rounded_source_handoffs,
    true
  );
  assert.equal(
    summary.candidate_R43_outer_bound_source,
    "coordinate-shifted-removable-r43-cauchy-outer-bound"
  );
  assert.equal(summary.candidate_R43_cauchy_tail_shift_power, 0);
  assert.ok(summary.candidate_E_R_prefix_plus_tail_bound < 1e-5);
  assert.ok(summary.candidate_M_R_prefix_plus_tail_bound < 1e-5);
  assert.equal(
    summary.candidate_h39_full_cauchy_primitive_profile_vector_status,
    "h39-full-cauchy-primitive-profile-vector-candidate-closes"
  );
  assert.equal(
    summary.candidate_h39_full_cauchy_primitive_vector_backend_ready,
    true
  );
  assert.equal(
    summary.candidate_h39_full_cauchy_primitive_vector_backend
      .claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(JSON.stringify(cell).includes("speed_band"), false);
});

test("h39 explicit N_G Cauchy input overrides denominator candidate", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const cell = evaluateH39SharedDomainCoefficientCell({
    context,
    cell: CELL,
    branchInputs: [
      { branch: "-", hIntervals: hIntervals() },
      { branch: "+", hIntervals: hIntervals() },
    ],
    shiftedOrder: 1,
    rho: 0.001,
    nGCauchyOuterBound: 32,
    nGCauchyOuterRadius: 2,
    denominatorCauchyOuterRadius: 0.01,
    denominatorDeltaCauchyOuterBound: 100,
    denominatorPhiCauchyOuterBound: 100,
    denominatorJacobianAbsCauchyOuterBound: 100,
    denominatorLMajorant: 2,
    denominatorLowerPolynomialMajorant: 3,
  });
  const summary = cell.finite_prefix_summary;

  assert.ok(cell.denominator_cauchy_n_g_outer_bound_candidate);
  assert.equal(
    summary.candidate_N_G_outer_bound_source,
    "explicit-n-g-cauchy-outer-bound"
  );
  assert.equal(
    summary.candidate_N_G_analytic_remainder_profile_candidates[0]
      .n_g_outer_bound,
    32
  );
});

test("h39 denominator Cauchy N_G cell resolver requires complete inputs", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });

  assert.throws(
    () =>
      evaluateH39SharedDomainCoefficientCell({
        context,
        cell: CELL,
        branchInputs: [
          { branch: "-", hIntervals: hIntervals() },
          { branch: "+", hIntervals: hIntervals() },
        ],
        shiftedOrder: 1,
        rho: 0.001,
        denominatorCauchyOuterRadius: 0.01,
      }),
    /complete denominator Cauchy inputs required/
  );
});

test("h39 shared-domain coefficient rows consume h38 branch rows", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const rows = evaluateH39SharedDomainCoefficientRows({
    context,
    h38Rows: [h38Row()],
    shiftedOrder: 1,
    rho: 0.001,
  });

  assert.equal(rows.length, 1);
  assert.equal(rows[0].cell_id, "speed.test.first-y");
  assert.equal(
    rows[0].h39_coefficient_cell.status,
    "h39-shared-domain-coefficient-cell-evaluated"
  );
  assert.equal(
    rows[0].h39_coefficient_cell.claim_boundary
      .certifies_directed_rounded_shared_domain,
    false
  );
});

test("h39 coefficient artifact summarizes supplied h38 rows without closure claims", () => {
  const artifact = buildH39SharedDomainCoefficientArtifact({
    h38Rows: [h38Row()],
    validateH38: false,
    shiftedOrder: 1,
    rho: 0.001,
  });
  const errors = validateH39SharedDomainCoefficientArtifact(artifact);

  assert.equal(
    artifact.schema,
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_COEFFICIENT_ARTIFACT_SCHEMA
  );
  assert.deepEqual(errors, []);
  assert.equal(
    artifact.h39_primitive_vector_backend_artifact.schema,
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_PRIMITIVE_VECTOR_BACKEND_ARTIFACT_SCHEMA
  );
  assert.equal(
    artifact.h39_primitive_vector_backend_artifact.result.retained_branch,
    false
  );
  assert.equal(
    artifact.h39_primitive_vector_backend_artifact.claim_boundary
      .certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(artifact.graph_radii_witness, null);
  assert.equal(artifact.claim_boundary.emits_graph_radii_witness, false);
  const mutatedArtifact = JSON.parse(JSON.stringify(artifact));
  mutatedArtifact.h39_primitive_vector_backend_artifact.claim_boundary
    .certifies_directed_rounded_shared_domain = true;
  assert.ok(
    validateH39SharedDomainCoefficientArtifact(mutatedArtifact).some((error) =>
      error.includes(
        "h39 primitive vector backend artifact must remain candidate-only"
      )
    )
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary.coefficient_row_count,
    1
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary
      .all_centered_leading_R43_coefficients_contain_zero,
    true
  );
  assert.ok(
    artifact.h39_shared_domain_coefficient_summary
      .min_h39_jacobian_coefficient_clearance > 0
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary
      .second_x_derivative_lowest_y_power,
    41
  );
  assert.ok(
    artifact.h39_shared_domain_coefficient_summary
      .max_candidate_L_J_finite_prefix > 0
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary.second_x_kernel_y_power,
    41
  );
  assert.ok(
    artifact.h39_shared_domain_coefficient_summary
      .max_candidate_M_K_finite_prefix > 0
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary
      .all_candidate_L_J_factor_identities_hold,
    true
  );
  assert.ok(
    artifact.h39_shared_domain_coefficient_summary
      .max_candidate_M_K_continuous_majorant > 0
  );
  assert.ok(
    artifact.h39_shared_domain_coefficient_summary
      .max_candidate_L_J_reduced_continuous_majorant > 0
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary
      .candidate_finite_prefix_scalar_replay_closes,
    true
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary
      .candidate_profile_scale_required_closes,
    true
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary
      .candidate_finite_prefix_primitive_profile_scale_replay
      .certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary
      .candidate_profile_direction_complete_for_shared_domain_closure,
    false
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary
      .candidate_h39_full_cauchy_primitive_profile_vector_status,
    "h39-full-cauchy-primitive-profile-vector-candidate-incomplete"
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary
      .candidate_h39_full_cauchy_primitive_profile_vector_complete,
    false
  );
  assert.ok(
    artifact.h39_shared_domain_coefficient_summary
      .candidate_finite_prefix_scalar_replay_ratio < 1
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary
      .candidate_finite_prefix_primitive_scalar_replay
      .certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    artifact.claim_boundary
      .certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound,
    false
  );
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(JSON.stringify(artifact).includes("speed_band"), false);
});

test("h39 coefficient artifact summarizes source-certificate obstructions", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const artifact = buildH39SharedDomainCoefficientArtifact({
    h38Rows: [h38Row()],
    validateH38: false,
    shiftedOrder: 1,
    rho: 0.001,
    sharedDomainSignature: domainSignature,
    coordinateCauchyOuterRadius: 10,
    coordinateJacobianNumeratorOuterRadius: 15,
    coordinateJacobianOuterRadius: 10,
    coordinateXOuterRadius: 1e-6,
    denominatorCauchyOuterRadius: 0.5,
    denominatorDeltaCauchyOuterBound: 100,
    denominatorPhiCauchyOuterBound: 100,
    denominatorJacobianAbsCauchyOuterBound: 100,
    denominatorLMajorant: 2,
    denominatorLowerPolynomialMajorant: 3,
    rhoX: 0.01,
    rX: 0.008,
  });
  const errors = validateH39SharedDomainCoefficientArtifact(artifact);

  assert.deepEqual(errors, []);
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary
      .source_certificate_obstruction_count,
    1
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary
      .first_source_certificate_obstruction.cell_id,
    "speed.test.first-y"
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary
      .first_source_certificate_obstruction.source_family,
    "coordinate_cauchy_outer_bounds"
  );
  assert.match(
    artifact.h39_shared_domain_coefficient_summary
      .first_source_certificate_obstruction.message,
    /sinh Taylor majorant overflowed before the tail bound/
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary
      .first_source_certificate_obstruction.candidate_obstructions[0]
      .candidate_index,
    0
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_rows[0].h39_coefficient_cell
      .evaluator_source_certificate_report,
    null
  );
  assert.equal(
    artifact.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(JSON.stringify(artifact).includes("speed_band"), false);
});

test("h39 coefficient artifact records certified coordinate envelope fallback", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const artifact = buildH39SharedDomainCoefficientArtifact({
    h38Rows: [h38Row()],
    validateH38: false,
    shiftedOrder: 1,
    rho: 0.001,
    sharedDomainSignature: domainSignature,
    coordinateSourceEnvelopeCandidates: [
      {
        coordinateCauchyOuterRadius: 10,
        coordinateJacobianNumeratorOuterRadius: 15,
        coordinateJacobianOuterRadius: 10,
      },
      {
        coordinateCauchyOuterRadius: 0.9,
        coordinateJacobianNumeratorOuterRadius: 1.35,
        coordinateJacobianOuterRadius: 0.9,
      },
    ],
    coordinateXOuterRadius: 1e-6,
    denominatorCauchyOuterRadius: 0.5,
    denominatorDeltaCauchyOuterBound: 100,
    denominatorPhiCauchyOuterBound: 100,
    denominatorJacobianAbsCauchyOuterBound: 100,
    denominatorLMajorant: 2,
    denominatorLowerPolynomialMajorant: 3,
    rhoX: 0.01,
    rX: 0.008,
  });
  const errors = validateH39SharedDomainCoefficientArtifact(artifact);
  const coordinateSource =
    artifact.h39_shared_domain_coefficient_rows[0].h39_coefficient_cell
      .coordinate_cauchy_outer_bounds_profile_candidate;

  assert.deepEqual(errors, []);
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary
      .source_certificate_obstruction_count,
    0
  );
  assert.equal(
    coordinateSource.coordinate_source_envelope_selection
      .selected_candidate_index,
    1
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_rows[0].h39_coefficient_cell
      .claim_boundary.emits_directed_rounded_source_handoffs,
    true
  );
  assert.equal(JSON.stringify(artifact).includes("speed_band"), false);
});

test("h39 coefficient artifact records shifted R43 source envelope closure candidate", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const artifact = buildH39SharedDomainCoefficientArtifact({
    h38Rows: [h38Row()],
    validateH38: false,
    shiftedOrder: 10,
    seriesOrder: 60,
    rho: 0.001,
    sharedDomainSignature: domainSignature,
    coordinateSourceEnvelopeCandidates: [
      {
        r43ShiftedCauchyOuterBound: 1e-3,
        r43ShiftedCauchyOuterRadius: 0.01,
        directedRoundedShiftedR43Provenance: true,
        certifiesShiftedR43ZeroPrefix: true,
        coordinateJacobianNumeratorOuterRadius: 0.02,
        coordinateJacobianOuterRadius: 0.01,
      },
    ],
    coordinateXOuterRadius: 1e-6,
    denominatorCauchyOuterRadius: 0.01,
    denominatorDeltaCauchyOuterBound: 100,
    denominatorPhiCauchyOuterBound: 100,
    denominatorJacobianAbsCauchyOuterBound: 100,
    denominatorLMajorant: 2,
    denominatorLowerPolynomialMajorant: 3,
    rhoX: 0.01,
    rX: 0.008,
  });
  const errors = validateH39SharedDomainCoefficientArtifact(artifact);
  const summary = artifact.h39_shared_domain_coefficient_summary;
  const coordinateSource =
    artifact.h39_shared_domain_coefficient_rows[0].h39_coefficient_cell
      .coordinate_cauchy_outer_bounds_profile_candidate;

  assert.deepEqual(errors, []);
  assert.equal(summary.source_certificate_obstruction_count, 0);
  assert.equal(
    coordinateSource.source_envelope_kind,
    "shifted-removable-r43-cauchy-outer-bound"
  );
  assert.equal(summary.max_candidate_E_R_prefix_plus_tail_bound < 1e-5, true);
  assert.equal(summary.max_candidate_M_R_prefix_plus_tail_bound < 1e-5, true);
  assert.equal(
    summary.candidate_h39_full_cauchy_primitive_profile_vector_status,
    "h39-full-cauchy-primitive-profile-vector-candidate-closes"
  );
  assert.equal(
    artifact.h39_primitive_vector_backend_artifact.primitive_diagnostic_input_ready,
    true
  );
  assert.equal(
    artifact.h39_primitive_vector_backend_artifact.claim_boundary
      .certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    artifact.claim_boundary
      .certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound,
    false
  );
  assert.equal(JSON.stringify(artifact).includes("speed_band"), false);
});

test("h39 coefficient artifact emits evaluator graph-radii witness", () => {
  const domainSignature = h39PrimitiveDomainSignature();
  const artifact = buildH39SharedDomainCoefficientArtifact({
    h38Rows: [h38Row()],
    validateH38: false,
    shiftedOrder: 1,
    rho: 0.001,
    sharedDomainSignature: domainSignature,
    rhoX: 0.01,
    rX: 0.008,
  });
  const errors = validateH39SharedDomainCoefficientArtifact(artifact);

  assert.deepEqual(errors, []);
  assert.equal(
    artifact.graph_radii_witness.schema,
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_GRAPH_RADII_WITNESS_SCHEMA
  );
  assert.equal(
    artifact.graph_radii_witness.witness_status,
    "directed-rounded-same-domain-graph-radii-witness-certified"
  );
  assert.equal(artifact.graph_radii_witness.rho_X, 0.01);
  assert.equal(artifact.graph_radii_witness.r_X, 0.008);
  assert.equal(artifact.graph_radii_witness.domain_signature, domainSignature);
  assert.equal(
    artifact.graph_radii_witness.claim_boundary
      .certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    artifact.graph_radii_witness.result.h39_continuous_tail_certificate,
    false
  );
  assert.equal(
    artifact.graph_radii_witness.result.retained_branch,
    false
  );
  assert.equal(artifact.claim_boundary.emits_graph_radii_witness, true);
  assert.equal(
    artifact.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(JSON.stringify(artifact).includes("speed_band"), false);

  const mutatedWitness = JSON.parse(JSON.stringify(artifact));
  mutatedWitness.graph_radii_witness.r_X = 0.02;
  assert.ok(
    validateH39SharedDomainCoefficientArtifact(mutatedWitness).some((error) =>
      error.includes("graph-radii witness must match")
    )
  );

  const mutatedBoundary = JSON.parse(JSON.stringify(artifact));
  mutatedBoundary.claim_boundary.emits_graph_radii_witness = false;
  assert.ok(
    validateH39SharedDomainCoefficientArtifact(mutatedBoundary).some((error) =>
      error.includes("graph-radii witness claim boundary")
    )
  );

  const contaminated = buildH39SharedDomainCoefficientArtifact({
    h38Rows: [h38Row()],
    validateH38: false,
    shiftedOrder: 1,
    rho: 0.001,
    sharedDomainSignature: {
      ...domainSignature,
      speed_min: 0.5,
    },
    rhoX: 0.01,
    rX: 0.008,
  });
  assert.ok(
    validateH39SharedDomainCoefficientArtifact(contaminated).some((error) =>
      error.includes("speed-band fields")
    )
  );
});

test("h39 coefficient artifact raises series order for deeper shifted prefixes", () => {
  const shiftedOrder = 6;
  const requestedSeriesOrder = 44;
  const artifact = buildH39SharedDomainCoefficientArtifact({
    h38Rows: [h38Row()],
    validateH38: false,
    shiftedOrder,
    seriesOrder: requestedSeriesOrder,
    rho: 0.001,
  });
  const errors = validateH39SharedDomainCoefficientArtifact(artifact);
  const requiredSeriesOrder = Math.max(
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.default_series_order,
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
      shiftedOrder,
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.n_g_shift + shiftedOrder
  );

  assert.deepEqual(errors, []);
  assert.equal(
    artifact.coefficient_artifact_parameters.requested_series_order,
    requestedSeriesOrder
  );
  assert.equal(
    artifact.coefficient_artifact_parameters.series_order,
    requiredSeriesOrder
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_rows[0].h39_coefficient_cell
      .r43_rows[0].R43_shifted_coefficients.length,
    shiftedOrder + 1
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary
      .candidate_finite_prefix_primitive_scalar_replay
      .certifies_directed_rounded_shared_domain,
    false
  );
});

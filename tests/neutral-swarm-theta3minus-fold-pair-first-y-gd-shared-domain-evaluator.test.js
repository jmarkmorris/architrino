import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import {
  buildH39CorrelatedResidualWidthDiagnosticCandidate,
  buildH39H38NumeratorGraphLocalPartitionDiagnosticCandidate,
  buildH39H38NumeratorGraphResidualBudgetDiagnosticCandidate,
  buildH39H38NumeratorGraphSolveDiagnosticCandidate,
  buildH39H38SolveWidthFactorizationDiagnosticCandidate,
  buildH39H38ExpressionN38DecompositionDiagnosticCandidate,
  buildH39H38ExpressionN38TaylorDerivativeBoundPrototypeCandidate,
  buildH39H38ExpressionN38TaylorEnclosurePrototypeCandidate,
  buildH39H38ExpressionN38TaylorCorrectedRetilePrototypeCandidate,
  buildH39H38ExpressionN38TaylorFourthDifferenceDiagnosticCandidate,
  buildH39H38ExpressionN38TaylorM4RefinementDiagnosticCandidate,
  buildH39H38ExpressionN38EtaTransportCouplingDiagnosticCandidate,
  buildH39H38ExpressionN38TerminalEtaGraphDiagnosticCandidate,
  buildH39H38ExpressionN38TerminalGraphRemainderBudgetDiagnosticCandidate,
  buildH39H38ExpressionN38ReducedSigmaEtaSourceDiagnosticCandidate,
  buildH39H38ExpressionN38SinePairNormalFormDiagnosticCandidate,
  buildH39H38ExpressionN38TaylorBudgetDiagnosticCandidate,
  buildH39AffineHRowGraphSubdivisionDiagnosticCandidate,
  buildH39OneNoiseAffineHRowTransportDiagnosticCandidate,
  buildH39TerminalSharedResidualAffineZetaProviderReplayDiagnosticCandidate,
  buildH39PostZetaPressureSourceIsolationDiagnosticCandidate,
  buildH39H38Y44CoefficientDependenceDiagnosticCandidate,
  buildH39H38Y44N38TerminalEndpointBridgeDiagnosticCandidate,
  buildH39H38Y44SourceCovarianceDiagnosticCandidate,
  buildH39H38Y44SourceCovarianceSplitM4RefinementLadderCandidate,
  buildH39H38Y44SignedAffineTargetEnvelopeDiagnosticCandidate,
  buildH39PolynomialHRowGraphIntervalResidualDiagnosticCandidate,
  buildH39PolynomialHRowGraphResidualDiagnosticCandidate,
  buildH39RecurrenceRefinedSubcoverPressureDiagnostic,
  validateH39CorrelatedResidualWidthDiagnostic,
  validateH39H38NumeratorGraphLocalPartitionDiagnostic,
  validateH39H38NumeratorGraphResidualBudgetDiagnostic,
  validateH39H38NumeratorGraphSolveDiagnostic,
  validateH39H38SolveWidthFactorizationDiagnostic,
  validateH39H38ExpressionN38DecompositionDiagnostic,
  validateH39H38ExpressionN38TaylorDerivativeBoundPrototype,
  validateH39H38ExpressionN38TaylorEnclosurePrototype,
  validateH39H38ExpressionN38TaylorCorrectedRetilePrototype,
  validateH39H38ExpressionN38TaylorFourthDifferenceDiagnostic,
  validateH39H38ExpressionN38TaylorM4RefinementDiagnostic,
  validateH39H38ExpressionN38EtaTransportCouplingDiagnostic,
  validateH39H38ExpressionN38TerminalEtaGraphDiagnostic,
  validateH39H38ExpressionN38TerminalGraphRemainderBudgetDiagnostic,
  validateH39H38ExpressionN38ReducedSigmaEtaSourceDiagnostic,
  validateH39H38ExpressionN38SinePairNormalFormDiagnostic,
  validateH39H38ExpressionN38TaylorBudgetDiagnostic,
  validateH39AffineHRowGraphSubdivisionDiagnostic,
  validateH39OneNoiseAffineHRowTransportDiagnostic,
  validateH39TerminalSharedResidualAffineZetaProviderReplayDiagnostic,
  validateH39PostZetaPressureSourceIsolationDiagnostic,
  validateH39H38Y44CoefficientDependenceDiagnostic,
  validateH39H38Y44N38TerminalEndpointBridgeDiagnostic,
  validateH39H38Y44SourceCovarianceDiagnostic,
  validateH39H38Y44SourceCovarianceSplitM4RefinementLadder,
  validateH39H38Y44SignedAffineTargetEnvelopeDiagnostic,
  validateH39PolynomialHRowGraphIntervalResidualDiagnostic,
  validateH39PolynomialHRowGraphResidualDiagnostic,
  validateH39RecurrenceRefinedSubcoverPressureDiagnostic,
} from "../scripts/neutral-swarm/theta3minus-fold-pair-first-y-gd-h39-recurrence-refined-subcover-diagnostic.mjs";
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
  computeH39PredecessorHRowProviderBoundaryCandidate,
  computeH39AffineCenterShiftedR43SourceProfileCandidate,
  computeH39R43AnalyticRemainderProfileCandidate,
  computeH39R43SecondXKepsilonRemainderProfileCandidate,
  computeH39KernelContinuousMajorant,
  computeSinhTaylorMajorant,
  computeH39AffineCenterRowCorrelationDiagnosticCandidate,
  computeH39AffineCenterHRowSensitivityDiagnosticCandidate,
  computeH39ShiftedR43AffineCenterFormCandidate,
  computeH39ShiftedR43PressureDecompositionCandidate,
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

function h39ProviderClaimBoundary() {
  return {
    certifies_shifted_R43_outer_bound: false,
    certifies_directed_rounded_shared_domain: false,
    certifies_continuous_polydisc_primitives: false,
    retained_branch: false,
  };
}

function dependencyPreservingProviderOutput({
  branch,
  branchRow,
  cellId,
  replayKind = "h39-row-1",
}) {
  return {
    branch,
    hIntervals: hIntervals(),
    solveSlopeInterval: branchRow.h38_solve_slope_interval,
    providerKind: "fixture-predecessor-recurrence-transport",
    preservesDependencies: true,
    sourceCellId: cellId,
    replayKind,
    hRowProviderProvenance: {
      provider: "fixture-predecessor-recurrence-transport",
      source_cell_id: cellId,
      branch,
    },
    dependencyTrace: [
      {
        hIndex: 38,
        source: "successor-recurrence",
        predecessorHIndex: 37,
        predecessorCellId: cellId,
        branch,
      },
    ],
    hRowDependencyWitness: {
      parent_row_identity: "fixture-h37-to-h38-recurrence",
      transported_parameter_cell: cellId,
      branch,
      coverage: "fixture-equality-cover",
    },
    hRowProviderClaimBoundary: h39ProviderClaimBoundary(),
  };
}

function h38RowWithProviderBranchMetadata() {
  const row = h38Row();
  row.branch_rows = row.branch_rows.map((branchRow) => ({
    ...branchRow,
    dependency_preserving_h_row_provider: true,
    provider_kind: "fixture-predecessor-recurrence-transport",
    source_cell_id: row.cell_id,
    h_row_provider_provenance: {
      provider: "fixture-predecessor-recurrence-transport",
      source_cell_id: row.cell_id,
      branch: branchRow.branch,
    },
    h_row_dependency_trace: [
      {
        hIndex: 38,
        source: "successor-recurrence",
        predecessorHIndex: 37,
        predecessorCellId: row.cell_id,
        branch: branchRow.branch,
      },
    ],
    h_row_dependency_witness: {
      parent_row_identity: "fixture-h37-to-h38-recurrence",
      transported_parameter_cell: row.cell_id,
      branch: branchRow.branch,
      coverage: "fixture-equality-cover",
    },
    h_row_provider_claim_boundary: h39ProviderClaimBoundary(),
  }));
  return row;
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

function numberClose(left, right, tolerance = 1e-9) {
  const scale = Math.max(1, Math.abs(left), Math.abs(right));
  assert.ok(Math.abs(left - right) <= tolerance * scale);
}

const FORBIDDEN_FIXED_SPEED_KEYS = [
  "speed_band",
  "speed_window",
  "speed_min",
  "speed_max",
];

function h39TerminalGraphProgressLogger(label) {
  const heartbeatEnabled = process.env.AAA_TEST_HEARTBEAT !== "0";
  const stopFile =
    process.env.AAA_H39_STOP_FILE === "0"
      ? null
      : process.env.AAA_H39_STOP_FILE ?? "/tmp/architrino-h39-stop";
  const startedAt = Date.now();
  let lastPrintedAt = 0;
  return (progress) => {
    if (stopFile) {
      try {
        const stat = fs.statSync(stopFile);
        if (stat.mtimeMs >= startedAt) {
          throw new Error(
            `${label} stopped by ${stopFile} at ${progress.stage} after ${(progress.elapsed_ms / 1000).toFixed(1)}s`
          );
        }
      } catch (error) {
        if (error?.code !== "ENOENT") {
          throw error;
        }
      }
    }
    if (!heartbeatEnabled) {
      return;
    }
    const now = Date.now();
    const rowBoundary =
      progress.stage === "terminal-graph-budget-row-complete";
    const first =
      progress.stage === "terminal-graph-budget-source-subcover-start";
    const subcoverComplete =
      progress.stage === "terminal-graph-budget-source-subcover-complete";
    const last =
      progress.stage === "terminal-graph-budget-forecast-ready" ||
      progress.completed_row_count === progress.row_count;
    const intervalElapsed = now - lastPrintedAt >= 30_000;
    if (!(first || subcoverComplete || last || intervalElapsed || rowBoundary)) {
      return;
    }
    lastPrintedAt = now;
    const share =
      Number.isFinite(Number(progress.graph_endpoint_width_share))
        ? `, graph endpoint share ${Number(progress.graph_endpoint_width_share).toPrecision(6)}`
        : Number.isFinite(Number(progress.graph_affine_width_share))
          ? `, graph affine share ${Number(progress.graph_affine_width_share).toPrecision(6)}`
          : "";
    const route = progress.route_interpretation
      ? `, route ${progress.route_interpretation}`
      : "";
    console.error(
      `# ${label}: ${progress.stage}, rows ${progress.completed_row_count}/${progress.row_count}, ${(progress.elapsed_ms / 1000).toFixed(1)}s${share}${route}`
    );
  };
}

function collectExactKeys(value, forbiddenKeys, path = [], found = []) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) =>
      collectExactKeys(entry, forbiddenKeys, [...path, String(index)], found)
    );
    return found;
  }
  if (value && typeof value === "object") {
    Object.keys(value).forEach((key) => {
      const nextPath = [...path, key];
      if (forbiddenKeys.includes(key)) {
        found.push(nextPath.join("."));
      }
      collectExactKeys(value[key], forbiddenKeys, nextPath, found);
    });
  }
  return found;
}

function collectTrueCertifies(value, path = [], found = []) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) =>
      collectTrueCertifies(entry, [...path, String(index)], found)
    );
    return found;
  }
  if (value && typeof value === "object") {
    Object.keys(value).forEach((key) => {
      const nextPath = [...path, key];
      if (key.startsWith("certifies_") && value[key] === true) {
        found.push(nextPath.join("."));
      }
      collectTrueCertifies(value[key], nextPath, found);
    });
  }
  return found;
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
  intervalClose(
    solve.h39_center_interval,
    solve.h39_center_numeric_interval
  );
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

test("h39 second-X y41 K_epsilon remainder profile stays separate from R43 tails", () => {
  const profile = computeH39R43SecondXKepsilonRemainderProfileCandidate({
    secondXKernelYPower: 41,
    candidateMKContinuousMajorant: 3,
    targetRadius: 0.5,
    xRemainderRadius: 0.2,
  });
  const expected = 0.5 * 0.2 ** 2 * 0.5 ** 41 * 3;

  assert.equal(
    profile.status,
    "h39-r43-second-x-y41-K-epsilon-remainder-profile-candidate-emitted"
  );
  assert.equal(profile.identity, "partial_X^2 R43 = y^41 K_epsilon");
  assert.equal(profile.second_x_kernel_y_power, 41);
  assert.equal(profile.candidate_M_K_continuous_majorant, 3);
  numberClose(profile.candidate_E_R_second_x_remainder_profile, expected);
  assert.equal(profile.candidate_M_R_second_x_remainder_profile, null);
  assert.equal(profile.missing_second_x_y_derivative_majorant, true);
  assert.equal(
    profile.included_in_candidate_E_R_prefix_plus_tail_bound,
    false
  );
  assert.equal(
    profile.included_in_candidate_M_R_prefix_plus_tail_bound,
    false
  );
  assert.equal(profile.certifies_continuous_polydisc_primitives, false);
  assert.equal(profile.certifies_directed_rounded_shared_domain, false);
  assert.equal(profile.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(profile, FORBIDDEN_FIXED_SPEED_KEYS),
    []
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

test("h39 shifted R43 prefix pressure diagnostic decomposes branch coefficient pressure without speed bands", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 53 });
  const minusSolve = solveH39CenterCoefficientRow({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    solveSlopeInterval: [0.15, 0.152],
  });
  const minusDiagnostic = computeH39ShiftedR43PressureDecompositionCandidate({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: minusSolve.h39_center_interval,
    solveSlopeInterval: [0.15, 0.152],
    outerRadius: 0.01,
    shiftedOrder: 10,
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
  });
  const rowDiagnostics = cell.r43_rows.map(
    (row) => row.R43_shifted_prefix_pressure_diagnostic
  );
  const summary = cell.finite_prefix_summary;
  const maxDiagnosticER = Math.max(
    ...rowDiagnostics.map(
      (diagnostic) =>
        diagnostic.unreduced_shifted_prefix_majorant_outer_radius
    )
  );

  assert.equal(
    minusDiagnostic.status,
    "h39-shifted-r43-pressure-decomposition-candidate-emitted"
  );
  assert.equal(
    minusDiagnostic.affine_dependence_valid_through_requested_order,
    true
  );
  assert.ok(maxDiagnosticER >= summary.candidate_E_R_finite_prefix);
  assert.equal(
    summary.candidate_E_R_finite_prefix_coefficient_source,
    "affine-center-actual-replay-leading-zero"
  );
  numberClose(
    minusDiagnostic.unreduced_shifted_prefix_majorant_outer_radius,
    shiftedSource.shifted_R43_finite_prefix_majorant_outer_radius,
    1e-12
  );
  assert.deepEqual(
    minusDiagnostic.term_pressure_by_coefficient[0].terms.map(
      (entry) => entry.term
    ),
    [
      "delta_squared_speed",
      "constant_minus_two",
      "sin_phi",
      "sin_delta",
    ]
  );
  assert.equal(
    rowDiagnostics.every(
      (diagnostic) =>
        diagnostic.center_eliminated_shifted_pressures[0]
          .pressure_contribution === 0
    ),
    true
  );
  assert.equal(JSON.stringify(minusDiagnostic).includes("speed_band"), false);
  assert.equal(JSON.stringify(cell).includes("speed_band"), false);
});

test("h39 shifted R43 affine center form preserves the solved leading relation symbolically", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 53 });
  const minusSolve = solveH39CenterCoefficientRow({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    solveSlopeInterval: [0.15, 0.152],
  });
  const candidate = computeH39ShiftedR43AffineCenterFormCandidate({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: minusSolve.h39_center_interval,
    solveSlopeInterval: [0.15, 0.152],
    outerRadius: 0.01,
    shiftedOrder: 10,
  });
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
  });
  const rowCandidate = cell.r43_rows[0].R43_affine_center_form_candidate;

  assert.equal(
    candidate.status,
    "h39-shifted-r43-affine-center-form-candidate-emitted"
  );
  assert.equal(
    candidate.evaluation_level,
    "symbolic-affine-center-normal-form"
  );
  assert.equal(
    candidate.affine_dependence_valid_through_requested_order,
    true
  );
  assert.equal(
    candidate.center_relation_zeroes_leading_coefficient_symbolically,
    true
  );
  assert.equal(candidate.affine_center_rows.length, 11);
  assert.equal(
    candidate.affine_center_rows[0]
      .symbolic_center_eliminated_coefficient_formula,
    "A_0=0"
  );
  assert.deepEqual(
    candidate.affine_center_rows[0]
      .independent_interval_center_eliminated_coefficient,
    [0, 0]
  );
  assert.equal(
    candidate.affine_center_rows[1]
      .symbolic_center_eliminated_coefficient_formula,
    "A_k=(S_0 C_k - S_k C_0)/S_0"
  );
  assert.equal(candidate.correlation_preserved_symbolically, true);
  assert.equal(candidate.certifies_shifted_R43_outer_bound, false);
  assert.equal(rowCandidate.correlation_preserved_symbolically, true);
  assert.equal(
    rowCandidate.R43_affine_center_certificate
      .leading_affine_center_zero_certified,
    true
  );
  assert.equal(
    rowCandidate.R43_affine_center_certificate
      .independent_interval_schur_products_used,
    false
  );
  assert.deepEqual(
    rowCandidate.R43_affine_center_shifted_coefficients[0],
    [0, 0]
  );
  assert.ok(
    rowCandidate.independent_interval_center_eliminated_prefix_majorant_outer_radius >
      0
  );
  assert.ok(
    rowCandidate.R43_affine_center_shifted_prefix_majorant_outer_radius <
      rowCandidate.independent_interval_center_eliminated_prefix_majorant_outer_radius
  );
  assert.equal(
    cell.finite_prefix_summary.candidate_E_R_finite_prefix_coefficient_source,
    "affine-center-actual-replay-leading-zero"
  );
  assert.equal(JSON.stringify(candidate).includes("speed_band"), false);
  assert.equal(JSON.stringify(cell).includes("speed_band"), false);
});

test("h39 affine-center row correlation diagnostic isolates shifted index one without promotion", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 60 });
  const minusSolve = solveH39CenterCoefficientRow({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    solveSlopeInterval: [0.15, 0.152],
  });
  const diagnostic = computeH39AffineCenterRowCorrelationDiagnosticCandidate({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: minusSolve.h39_center_interval,
    solveSlopeInterval: [0.15, 0.152],
    outerRadius: 0.01,
    shiftedIndex: 1,
    partitionCount: 2,
  });

  assert.equal(
    diagnostic.status,
    "h39-affine-center-row-correlation-diagnostic-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-affine-center-row-correlation-diagnostic"
  );
  assert.equal(diagnostic.shifted_index, 1);
  assert.equal(diagnostic.y_order, 44);
  assert.equal(diagnostic.affine_dependence_valid_for_row, true);
  assert.equal(diagnostic.partition_count, 2);
  assert.equal(diagnostic.partition_replays.length, 2);
  assert.equal(
    diagnostic.full_center_replay.row_pressure.shifted_index,
    1
  );
  assert.deepEqual(
    diagnostic.full_center_replay.row_pressure.terms.map(
      (entry) => entry.term
    ),
    [
      "delta_squared_speed",
      "constant_minus_two",
      "sin_phi",
      "sin_delta",
    ]
  );
  assert.equal(
    diagnostic.max_partition_replay.row_pressure.y_order,
    44
  );
  assert.ok(diagnostic.max_partition_pressure > 0);
  assert.ok(diagnostic.midpoint_pressure >= 0);
  assert.ok(diagnostic.input_midpoint_pressure >= 0);
  assert.equal(
    diagnostic.input_midpoint_replay.replay_kind,
    "input-midpoint-center"
  );
  assert.equal(
    diagnostic.input_midpoint_replay.row_pressure.shifted_index,
    1
  );
  assert.ok(
    diagnostic.independent_interval_center_eliminated_pressure >=
      diagnostic.full_center_replay.row_pressure.source_pressure_contribution
  );
  assert.equal(diagnostic.certifies_shifted_R43_outer_bound, false);
  assert.equal(diagnostic.certifies_directed_rounded_shared_domain, false);
  assert.equal(diagnostic.certifies_continuous_polydisc_primitives, false);
  assert.equal(diagnostic.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 affine-center h-row sensitivity diagnostic isolates inherited h-row width", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 60 });
  const wideHIntervals = Array.from({ length: 39 }, (_, index) => [
    (index + 1) * 1e-6 - (index + 1) * 1e-5,
    (index + 1) * 1e-6 + (index + 1) * 1e-5,
  ]);
  const diagnostic =
    computeH39AffineCenterHRowSensitivityDiagnosticCandidate({
      context,
      cell: CELL,
      branch: "-",
      hIntervals: wideHIntervals,
      solveSlopeInterval: [0.15, 0.152],
      outerRadius: 0.01,
      shiftedIndex: 1,
    });

  assert.equal(
    diagnostic.status,
    "h39-affine-center-h-row-sensitivity-diagnostic-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-affine-center-h-row-sensitivity-diagnostic"
  );
  assert.equal(diagnostic.shifted_index, 1);
  assert.equal(diagnostic.y_order, 44);
  assert.equal(diagnostic.affine_dependence_valid_for_row, true);
  assert.ok(diagnostic.full_input_replay.pressure > 0);
  assert.deepEqual(
    diagnostic.input_family_replays.map((replay) => replay.input_family),
    [
      "full-input-box",
      "cell-midpoint",
      "h-row-midpoint",
      "slope-midpoint",
      "cell-and-h-row-midpoint",
      "all-input-midpoint",
    ]
  );
  assert.ok(diagnostic.h_row_midpoint_reduction_factor > 10);
  assert.ok(diagnostic.cell_midpoint_reduction_factor < 2);
  assert.ok(diagnostic.slope_midpoint_reduction_factor < 2);
  assert.equal(diagnostic.h_row_width_dominates_input_width, true);
  assert.equal(diagnostic.h_row_freeze_replays.length, 39);
  assert.equal(
    diagnostic.h_row_freeze_replays[0].input_family,
    "freeze-h38-through-h38"
  );
  assert.equal(
    diagnostic.h_row_freeze_replays.at(-1).input_family,
    "freeze-h0-through-h38"
  );
  assert.ok(
    diagnostic.best_h_row_freeze_replay.full_to_pressure_ratio > 10
  );
  assert.equal(diagnostic.h_row_transport_depth_scan.length, 39);
  assert.deepEqual(diagnostic.h_row_transport_depth_scan[0], {
    input_family: "freeze-h38-through-h38",
    freeze_start_index: 38,
    freeze_end_index: 38,
    transported_h_row_count: 1,
    pressure: diagnostic.h_row_freeze_replays[0].pressure,
    full_to_pressure_ratio:
      diagnostic.h_row_freeze_replays[0].full_to_pressure_ratio,
  });
  assert.equal(
    diagnostic.h_row_transport_depth_scan.at(-1).transported_h_row_count,
    39
  );
  assert.equal(
    diagnostic.h_row_transport_depth_summary.suffix_scan_complete,
    true
  );
  assert.equal(
    diagnostic.h_row_transport_depth_summary.tested_suffix_count,
    39
  );
  assert.equal(
    diagnostic.h_row_transport_depth_summary.max_tested_transport_depth,
    39
  );
  numberClose(
    diagnostic.h_row_transport_depth_summary
      .full_chain_midpoint_reduction_factor,
    diagnostic.h_row_midpoint_reduction_factor
  );
  assert.equal(
    diagnostic.h_row_transport_depth_summary.best_freeze_start_index,
    diagnostic.best_h_row_freeze_replay.freeze_start_index
  );
  assert.equal(
    diagnostic.h_row_transport_depth_summary.threshold_crossings[0]
      .target_full_to_pressure_ratio,
    10
  );
  assert.ok(
    diagnostic.h_row_transport_depth_summary.threshold_crossings[0]
      .transported_h_row_count >= 1
  );
  assert.equal(
    diagnostic.h_row_transport_depth_summary.threshold_crossings.at(-1)
      .target_full_to_pressure_ratio,
    1e6
  );
  assert.equal(
    diagnostic.first_h_row_suffix_freeze_meeting_target,
    null
  );
  assert.deepEqual(
    diagnostic.h_row_width_compression_replays.map(
      (replay) => replay.input_family
    ),
    [
      "h-row-width-compression-1",
      "h-row-width-compression-0.5",
      "h-row-width-compression-0.25",
      "h-row-width-compression-0.125",
      "h-row-width-compression-0.0625",
      "h-row-width-compression-0",
    ]
  );
  numberClose(
    diagnostic.h_row_width_compression_replays[0].pressure,
    diagnostic.full_input_replay.pressure
  );
  numberClose(
    diagnostic.h_row_width_compression_replays.at(-1).pressure,
    diagnostic.input_family_replays.find(
      (replay) => replay.input_family === "h-row-midpoint"
    ).pressure
  );
  assert.equal(
    diagnostic.first_h_row_width_compression_meeting_target,
    null
  );
  assert.equal(diagnostic.certifies_shifted_R43_outer_bound, false);
  assert.equal(diagnostic.certifies_directed_rounded_shared_domain, false);
  assert.equal(diagnostic.certifies_continuous_polydisc_primitives, false);
  assert.equal(diagnostic.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 recurrence-refined predecessor subcover scaling stays candidate-only", () => {
  const diagnostic = buildH39RecurrenceRefinedSubcoverPressureDiagnostic({
    targetSpeedInterval: [3.02156, 3.02156007813],
    subcellCounts: [1, 2, 4],
    rootSubdivisions: 100,
    outerRadius: 0.001,
    shiftedIndex: 1,
  });

  assert.deepEqual(
    validateH39RecurrenceRefinedSubcoverPressureDiagnostic(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-recurrence-refined-subcover-pressure-diagnostic-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-recurrence-refined-predecessor-subcover-pressure-diagnostic"
  );
  assert.deepEqual(diagnostic.subcell_counts, [1, 2, 4]);
  assert.equal(diagnostic.subcover_replays[0].local_row_count, 1);
  assert.equal(diagnostic.subcover_replays[1].local_row_count, 2);
  assert.equal(diagnostic.subcover_replays[2].local_row_count, 4);
  assert.ok(diagnostic.subcover_replays[1].max_pressure < diagnostic.coarse_pressure);
  assert.ok(diagnostic.subcover_replays[2].max_pressure < diagnostic.subcover_replays[1].max_pressure);
  assert.ok(
    diagnostic.subcover_replays[1].coarse_to_max_pressure_ratio > 1.9
  );
  assert.ok(
    diagnostic.subcover_replays[1].coarse_to_max_pressure_ratio < 2.1
  );
  assert.ok(
    diagnostic.subcover_replays[2].coarse_to_max_pressure_ratio > 3.8
  );
  assert.ok(
    diagnostic.subcover_replays[2].coarse_to_max_pressure_ratio < 4.2
  );
  assert.ok(diagnostic.observed_scaling_exponent > 0.95);
  assert.ok(diagnostic.observed_scaling_exponent < 1.05);
  assert.equal(diagnostic.h_row_width_transport_profile.length, 39);
  assert.ok(
    diagnostic.h_row_width_transport_summary
      .min_observed_width_scaling_exponent > 0.95
  );
  assert.ok(
    diagnostic.h_row_width_transport_summary
      .max_observed_width_scaling_exponent < 1.05
  );
  assert.ok(
    diagnostic.h_row_width_transport_summary.pressure_width_exponent_gap <
      1e-3
  );
  assert.ok(
    diagnostic.h_row_width_transport_profile[0]
      .coarse_to_best_width_ratio > 3.9
  );
  assert.ok(
    diagnostic.h_row_width_transport_profile[38]
      .coarse_to_best_width_ratio > 3.9
  );
  assert.ok(
    diagnostic.estimated_local_subcells_for_h_row_midpoint_collapse > 1e9
  );
  assert.equal(diagnostic.brute_subcover_route_likely_impractical, true);
  assert.equal(
    diagnostic.claim_boundary.certifies_standard_h38_cover,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 one-noise affine h-row transport diagnostic collapses exported pressure candidate-only", () => {
  const diagnostic = buildH39OneNoiseAffineHRowTransportDiagnosticCandidate({
    targetSpeedInterval: [3.02156, 3.02156007813],
    branch: "-",
    rootSubdivisions: 100,
    outerRadius: 0.001,
    shiftedIndex: 1,
  });

  assert.deepEqual(
    validateH39OneNoiseAffineHRowTransportDiagnostic(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-one-noise-affine-h-row-transport-diagnostic-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-one-noise-affine-h-row-transport-diagnostic"
  );
  assert.equal(diagnostic.shifted_index, 1);
  assert.equal(diagnostic.y_order, 44);
  assert.equal(
    diagnostic.transport_source,
    "two-refined-H38-subcell-midpoint-affine-fit"
  );
  assert.equal(diagnostic.one_noise_sample_replays.length, 5);
  assert.ok(diagnostic.max_one_noise_sample_pressure > 0);
  assert.ok(
    diagnostic.max_one_noise_sample_pressure <
      diagnostic.baseline_independent_interval_pressure
  );
  assert.ok(
    diagnostic.independent_to_one_noise_sample_pressure_ratio > 1e6
  );
  assert.ok(
    diagnostic.max_one_noise_sample_pressure <=
      2 * diagnostic.baseline_h_row_midpoint_pressure
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 affine h-row graph subdivision stays small candidate-only", () => {
  const diagnostic = buildH39AffineHRowGraphSubdivisionDiagnosticCandidate({
    targetSpeedInterval: [3.02156, 3.02156007813],
    branch: "-",
    rootSubdivisions: 100,
    outerRadius: 0.001,
    shiftedIndex: 1,
    xiPartitionCounts: [1, 2, 4, 8],
    residualSubcellCounts: [4, 8],
  });

  assert.deepEqual(
    validateH39AffineHRowGraphSubdivisionDiagnostic(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-affine-h-row-graph-subdivision-diagnostic-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-affine-h-row-graph-subdivision-diagnostic"
  );
  assert.equal(diagnostic.shifted_index, 1);
  assert.equal(diagnostic.y_order, 44);
  assert.deepEqual(diagnostic.xi_domain, [-1, 1]);
  assert.deepEqual(diagnostic.xi_partition_counts, [1, 2, 4, 8]);
  assert.equal(
    diagnostic.graph_source,
    "two-refined-H38-subcell-midpoint-affine-fit"
  );
  assert.equal(diagnostic.graph_partition_replays.length, 4);
  assert.ok(diagnostic.best_graph_pressure > 0);
  assert.ok(
    diagnostic.best_graph_pressure <
      diagnostic.baseline_independent_interval_pressure
  );
  assert.ok(
    diagnostic.independent_to_best_graph_pressure_ratio > 1e6
  );
  assert.ok(
    diagnostic.best_graph_pressure <=
      2 * diagnostic.baseline_h_row_midpoint_pressure
  );
  assert.ok(diagnostic.best_graph_to_sample_pressure_ratio < 1.01);
  assert.ok(diagnostic.coarsest_graph_to_sample_pressure_ratio < 1.01);
  assert.deepEqual(diagnostic.residual_subcell_counts, [4, 8]);
  assert.equal(diagnostic.producer_residual_diagnostics.length, 2);
  assert.ok(diagnostic.max_graph_plus_residual_pressure > 0);
  assert.ok(
    diagnostic.max_graph_plus_residual_pressure <
      diagnostic.baseline_independent_interval_pressure
  );
  assert.ok(
    diagnostic.independent_to_max_graph_plus_residual_pressure_ratio > 1e6
  );
  assert.ok(
    diagnostic.max_graph_plus_residual_pressure <=
      5 * diagnostic.baseline_h_row_midpoint_pressure
  );
  assert.equal(
    diagnostic.shared_domain_replay_artifact.claim_boundary
      .h_row_provider_backed_replay,
    true
  );
  assert.equal(
    diagnostic.shared_domain_replay_artifact
      .h39_shared_domain_coefficient_summary
      .h_row_provider_dependency_state,
    "dependency-preserving-provider-backed-replay"
  );
  assert.deepEqual(
    diagnostic.shared_domain_replay_artifact
      .h39_shared_domain_coefficient_summary.h_row_provider_kinds,
    ["candidate-affine-h-row-graph-provider"]
  );
  assert.equal(
    diagnostic.shared_domain_replay_artifact.claim_boundary
      .certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_affine_h_row_graph_enclosure,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 polynomial h-row graph residual resolves affine residual curvature candidate-only", () => {
  const diagnostic = buildH39PolynomialHRowGraphResidualDiagnosticCandidate({
    targetSpeedInterval: [3.02156, 3.02156007813],
    branch: "-",
    rootSubdivisions: 100,
    outerRadius: 0.001,
    shiftedIndex: 1,
    xiDomain: [-2, 2],
    polynomialDegree: 2,
    polynomialSourceSubcellCount: 4,
    xiPartitionCounts: [1, 2, 4, 8],
    residualSubcellCounts: [4, 8],
  });

  assert.deepEqual(
    validateH39PolynomialHRowGraphResidualDiagnostic(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-polynomial-h-row-graph-residual-diagnostic-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-polynomial-h-row-graph-residual-diagnostic"
  );
  assert.equal(diagnostic.shifted_index, 1);
  assert.equal(diagnostic.y_order, 44);
  assert.deepEqual(diagnostic.xi_domain, [-2, 2]);
  assert.equal(diagnostic.polynomial_degree, 2);
  assert.equal(diagnostic.polynomial_source_subcell_count, 4);
  assert.equal(diagnostic.h_row_polynomial_transport_profile.length, 39);
  assert.deepEqual(diagnostic.xi_partition_counts, [1, 2, 4, 8]);
  assert.equal(diagnostic.polynomial_graph_partition_replays.length, 4);
  assert.ok(diagnostic.best_polynomial_graph_pressure > 0);
  assert.ok(
    diagnostic.best_polynomial_graph_pressure <
      diagnostic.baseline_independent_interval_pressure
  );
  assert.ok(
    diagnostic.independent_to_best_polynomial_graph_pressure_ratio > 1e9
  );
  assert.ok(
    diagnostic.best_polynomial_graph_pressure <=
      2 * diagnostic.baseline_h_row_midpoint_pressure
  );
  assert.deepEqual(diagnostic.residual_subcell_counts, [4, 8]);
  assert.equal(diagnostic.polynomial_producer_residual_diagnostics.length, 2);
  assert.equal(diagnostic.affine_reference_residual_diagnostics.length, 2);
  assert.ok(diagnostic.max_polynomial_graph_plus_residual_pressure > 0);
  assert.ok(
    diagnostic.max_polynomial_graph_plus_residual_pressure <
      diagnostic.max_affine_reference_graph_plus_residual_pressure
  );
  assert.ok(
    diagnostic.affine_reference_to_polynomial_graph_plus_residual_pressure_ratio >
      2
  );
  assert.ok(
    diagnostic.independent_to_max_polynomial_graph_plus_residual_pressure_ratio >
      1e9
  );
  assert.equal(
    diagnostic.shared_domain_replay_artifact.claim_boundary
      .h_row_provider_backed_replay,
    true
  );
  assert.equal(
    diagnostic.shared_domain_replay_artifact
      .h39_shared_domain_coefficient_summary
      .h_row_provider_dependency_state,
    "dependency-preserving-provider-backed-replay"
  );
  assert.deepEqual(
    diagnostic.shared_domain_replay_artifact
      .h39_shared_domain_coefficient_summary.h_row_provider_kinds,
    ["candidate-polynomial-h-row-graph-provider"]
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_polynomial_h_row_graph_enclosure,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 polynomial h-row graph interval residual exposes producer-width wall candidate-only", () => {
  const diagnostic =
    buildH39PolynomialHRowGraphIntervalResidualDiagnosticCandidate({
      targetSpeedInterval: [3.02156, 3.02156007813],
      branch: "-",
      rootSubdivisions: 100,
      outerRadius: 0.001,
      shiftedIndex: 1,
      xiDomain: [-2, 2],
      polynomialDegree: 2,
      polynomialSourceSubcellCount: 4,
      xiPartitionCounts: [1, 2, 4, 8],
      residualSubcellCounts: [4, 8],
    });

  assert.deepEqual(
    validateH39PolynomialHRowGraphIntervalResidualDiagnostic(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-polynomial-h-row-graph-interval-residual-diagnostic-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-polynomial-h-row-graph-interval-residual-diagnostic"
  );
  assert.equal(diagnostic.shifted_index, 1);
  assert.equal(diagnostic.y_order, 44);
  assert.deepEqual(diagnostic.xi_domain, [-2, 2]);
  assert.equal(diagnostic.polynomial_degree, 2);
  assert.equal(diagnostic.polynomial_source_subcell_count, 4);
  assert.equal(diagnostic.provider_interval_residual_subcell_count, 8);
  assert.equal(diagnostic.h_row_polynomial_transport_profile.length, 39);
  assert.deepEqual(diagnostic.xi_partition_counts, [1, 2, 4, 8]);
  assert.deepEqual(diagnostic.residual_subcell_counts, [4, 8]);
  assert.equal(diagnostic.polynomial_interval_residual_diagnostics.length, 2);
  assert.ok(diagnostic.max_polynomial_interval_residual_pressure > 0);
  assert.ok(
    diagnostic.max_polynomial_interval_residual_pressure <
      diagnostic.baseline_independent_interval_pressure
  );
  assert.ok(
    diagnostic.independent_to_max_polynomial_interval_residual_pressure_ratio >
      3.9
  );
  assert.ok(
    diagnostic.independent_to_max_polynomial_interval_residual_pressure_ratio <
      4.1
  );
  assert.ok(
    diagnostic.max_polynomial_interval_residual_pressure >
      1e8 * diagnostic.max_polynomial_midpoint_residual_pressure
  );
  assert.ok(
    diagnostic.interval_to_midpoint_residual_pressure_ratio > 1e8
  );
  assert.equal(
    diagnostic.max_polynomial_interval_residual_diagnostic.worst_abs_residual
      .h_index,
    38
  );
  assert.ok(
    diagnostic.interval_residual_pressure_scaling_summary
      .observed_pressure_scaling_exponent > 0.95
  );
  assert.ok(
    diagnostic.interval_residual_pressure_scaling_summary
      .observed_pressure_scaling_exponent < 1.05
  );
  assert.ok(
    diagnostic.interval_residual_pressure_scaling_summary
      .estimated_subcell_count_for_target_pressure > 1e9
  );
  assert.equal(
    diagnostic.shared_domain_interval_residual_replay_artifact.claim_boundary
      .h_row_provider_backed_replay,
    true
  );
  assert.equal(
    diagnostic.shared_domain_interval_residual_replay_artifact
      .h39_shared_domain_coefficient_summary
      .h_row_provider_dependency_state,
    "dependency-preserving-provider-backed-replay"
  );
  assert.deepEqual(
    diagnostic.shared_domain_interval_residual_replay_artifact
      .h39_shared_domain_coefficient_summary.h_row_provider_kinds,
    ["candidate-polynomial-h-row-graph-interval-residual-provider"]
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_polynomial_h_row_graph_enclosure,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_polynomial_interval_residual_enclosure,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 correlated residual width isolates h38 solve-width danger candidate-only", () => {
  const diagnostic = buildH39CorrelatedResidualWidthDiagnosticCandidate({
    targetSpeedInterval: [3.02156, 3.02156007813],
    branch: "-",
    rootSubdivisions: 100,
    outerRadius: 0.001,
    shiftedIndex: 1,
    xiDomain: [-2, 2],
    polynomialDegree: 2,
    polynomialSourceSubcellCount: 4,
    residualSourceSubcellCount: 8,
    noiseSamples: [-2, -1, 0, 1, 2],
    residualNoiseSamples: [-1, -0.5, 0, 0.5, 1],
    residualWidthStartIndexes: [38, 37, 36, 35, 34, 30, 20, 10, 0],
  });

  assert.deepEqual(
    validateH39CorrelatedResidualWidthDiagnostic(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-correlated-residual-width-diagnostic-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-correlated-residual-width-diagnostic"
  );
  assert.equal(diagnostic.shifted_index, 1);
  assert.equal(diagnostic.y_order, 44);
  assert.deepEqual(diagnostic.xi_domain, [-2, 2]);
  assert.equal(diagnostic.polynomial_degree, 2);
  assert.equal(diagnostic.polynomial_source_subcell_count, 4);
  assert.equal(diagnostic.residual_source_subcell_count, 8);
  assert.equal(diagnostic.correlated_residual_sample_replays.length, 25);
  assert.ok(
    diagnostic.max_correlated_residual_sample_pressure <
      diagnostic.interval_residual_pressure
  );
  assert.ok(diagnostic.interval_to_correlated_residual_pressure_ratio > 10);
  assert.ok(
    diagnostic.independent_to_correlated_residual_sample_pressure_ratio > 100
  );
  assert.ok(
    diagnostic.correlated_to_midpoint_residual_sample_pressure_ratio > 1e7
  );
  assert.ok(
    diagnostic.estimated_full_width_noise_scale_for_midpoint_pressure < 1e-7
  );
  assert.equal(diagnostic.worst_residual_profile.h_index, 38);
  const h38Only = diagnostic.residual_width_suffix_diagnostics.find(
    (suffix) => suffix.residual_start_index === 38
  );
  assert.ok(h38Only);
  assert.ok(
    h38Only.max_suffix_pressure >
      diagnostic.max_correlated_residual_sample_pressure
  );
  assert.ok(h38Only.max_suffix_pressure > 1e20);
  assert.ok(h38Only.suffix_to_full_correlated_pressure_ratio > 1);
  const fullResidual = diagnostic.residual_width_suffix_diagnostics.find(
    (suffix) => suffix.residual_start_index === 0
  );
  assert.ok(fullResidual);
  assert.equal(
    fullResidual.max_suffix_pressure,
    diagnostic.max_correlated_residual_sample_pressure
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_standard_h38_cover,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_correlated_residual_width_enclosure,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 h38 solve-width factorization isolates numerator width candidate-only", () => {
  const diagnostic = buildH39H38SolveWidthFactorizationDiagnosticCandidate({
    targetSpeedInterval: [3.02156, 3.02156007813],
    branch: "-",
    rootSubdivisions: 100,
    outerRadius: 0.001,
    shiftedIndex: 1,
    xiDomain: [-2, 2],
    polynomialDegree: 2,
    polynomialSourceSubcellCount: 4,
    residualSourceSubcellCount: 8,
    noiseSamples: [-2, -1, 0, 1, 2],
    h38NoiseSamples: [-1, -0.5, 0, 0.5, 1],
  });

  assert.deepEqual(
    validateH39H38SolveWidthFactorizationDiagnostic(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-h38-solve-width-factorization-diagnostic-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-h38-solve-width-factorization-diagnostic"
  );
  assert.equal(diagnostic.shifted_index, 1);
  assert.equal(diagnostic.y_order, 44);
  assert.equal(diagnostic.solve_width_profile.h_index, 38);
  assert.equal(diagnostic.solve_width_profile.sample_count, 8);
  assert.equal(diagnostic.h38_residual_variant_replays.length, 4);
  assert.equal(
    diagnostic.h38_numerator_polynomial_diagnostic.polynomial_degree,
    2
  );
  assert.equal(
    diagnostic.h38_numerator_polynomial_degree_diagnostics.length,
    3
  );
  assert.equal(
    diagnostic.dominant_h38_solve_width_source,
    "h38-recurrence-numerator-width"
  );
  assert.equal(
    diagnostic.dominant_h38_replay_source,
    "h38-recurrence-numerator-width"
  );
  assert.ok(
    diagnostic.solve_width_profile.numerator_only_to_full_solve_width_ratio >
      0.999
  );
  assert.ok(
    diagnostic.solve_width_profile.slope_only_to_full_solve_width_ratio < 1e-12
  );
  assert.ok(
    diagnostic.numerator_only_to_full_solve_h38_pressure_ratio > 0.999
  );
  assert.ok(
    diagnostic.slope_only_to_full_solve_h38_pressure_ratio < 1e-7
  );
  assert.ok(
    diagnostic.baseline_to_numerator_midpoint_pressure_ratio > 1e8
  );
  assert.ok(
    diagnostic.full_solve_to_midpoint_solve_h38_pressure_ratio > 1e8
  );
  assert.ok(
    diagnostic.full_solve_to_midpoint_residual_pressure_ratio > 1e7
  );
  assert.ok(
    diagnostic.h38_numerator_midpoint_residual_to_interval_width_ratio < 1e-11
  );
  assert.ok(
    diagnostic.h38_numerator_polynomial_diagnostic
      .max_numerator_interval_width > 1e23
  );
  assert.ok(
    diagnostic.h38_numerator_polynomial_diagnostic.max_midpoint_residual <
      1e12
  );
  assert.ok(
    diagnostic.max_slope_only_h38_residual_pressure <
      diagnostic.midpoint_residual_pressure
  );
  assert.ok(
    diagnostic.solve_width_profile.max_solve_widths.graph_interval <
      1e-12 *
        diagnostic.solve_width_profile.max_solve_widths
          .reconstructed_full_solve
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_standard_h38_cover,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_h38_solve_width_factorization,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 h38 numerator graph solve separates smooth numerator from interval hull candidate-only", () => {
  const diagnostic = buildH39H38NumeratorGraphSolveDiagnosticCandidate({
    targetSpeedInterval: [3.02156, 3.02156007813],
    branch: "-",
    rootSubdivisions: 100,
    outerRadius: 0.001,
    shiftedIndex: 1,
    xiDomain: [-2, 2],
    polynomialDegree: 2,
    polynomialSourceSubcellCount: 4,
    residualSourceSubcellCount: 8,
    noiseSamples: [-2, -1, 0, 1, 2],
    numeratorNoiseSamples: [-1, -0.5, 0, 0.5, 1],
  });

  assert.deepEqual(
    validateH39H38NumeratorGraphSolveDiagnostic(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-h38-numerator-graph-solve-diagnostic-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-h38-numerator-graph-solve-diagnostic"
  );
  assert.equal(diagnostic.shifted_index, 1);
  assert.equal(diagnostic.y_order, 44);
  assert.equal(
    diagnostic.h38_numerator_polynomial_diagnostic.polynomial_degree,
    2
  );
  assert.equal(diagnostic.numerator_graph_variant_replays.length, 5);
  assert.equal(
    diagnostic.numerator_graph_diagnosis,
    "numerator-interval-hull-artifact"
  );
  assert.ok(diagnostic.max_numerator_graph_only_pressure < 1e13);
  assert.ok(
    diagnostic.max_numerator_graph_midpoint_residual_pressure < 1e13
  );
  assert.ok(
    diagnostic.max_numerator_graph_interval_residual_pressure > 1e20
  );
  assert.ok(
    diagnostic.graph_solve_to_full_solve_h39_pressure_ratio < 1e-7
  );
  assert.ok(
    diagnostic.correlated_residual_to_full_solve_h39_pressure_ratio < 1e-7
  );
  assert.ok(
    diagnostic.graph_plus_residual_hull_to_full_solve_h39_pressure_ratio >
      0.99
  );
  assert.ok(
    diagnostic.graph_plus_residual_hull_to_full_solve_h39_pressure_ratio <
      1.01
  );
  assert.ok(
    diagnostic.graph_plus_residual_hull_to_correlated_residual_pressure_ratio >
      1e8
  );
  assert.ok(
    diagnostic.interval_to_midpoint_numerator_graph_pressure_ratio > 1e8
  );
  assert.ok(
    diagnostic.full_solve_to_midpoint_numerator_graph_pressure_ratio > 1e8
  );
  assert.ok(
    diagnostic.independent_to_midpoint_numerator_graph_pressure_ratio > 1e9
  );
  assert.ok(
    diagnostic.midpoint_residual_to_h39_midpoint_pressure_ratio < 1
  );
  assert.ok(
    diagnostic.graph_full_slope_to_graph_slope_midpoint_pressure_ratio <
      1.00001
  );
  assert.ok(
    diagnostic.graph_full_slope_to_full_solve_width_ratio < 1e-12
  );
  assert.ok(
    diagnostic.h38_numerator_graph_residual_profile
      .midpoint_residual_to_numerator_width_ratio < 1e-11
  );
  assert.ok(
    diagnostic.h38_numerator_graph_residual_profile
      .midpoint_residual_hull_to_numerator_width_ratio < 1e-11
  );
  assert.ok(
    diagnostic.h38_numerator_graph_residual_profile
      .graph_interval_to_numerator_width_ratio < 1e-12
  );
  assert.ok(
    diagnostic.h38_numerator_graph_residual_profile
      .interval_residual_hull_to_numerator_width_ratio > 0.99
  );
  assert.ok(
    diagnostic.h38_numerator_graph_residual_profile
      .interval_residual_hull_to_numerator_width_ratio < 1.01
  );
  assert.ok(
    diagnostic.h38_numerator_graph_residual_profile
      .interval_residual_width > 1e23
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_standard_h38_cover,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_h38_numerator_graph_enclosure,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 h38 numerator graph residual budget gives n38 Taylor target candidate-only", () => {
  const diagnostic =
    buildH39H38NumeratorGraphResidualBudgetDiagnosticCandidate({
      targetSpeedInterval: [3.02156, 3.02156007813],
      branch: "-",
      rootSubdivisions: 100,
      outerRadius: 0.001,
      shiftedIndex: 1,
      xiDomain: [-2, 2],
      polynomialDegree: 2,
      subcellCounts: [4, 8, 16],
      noiseSamples: [-2, 0, 2],
      numeratorNoiseSamples: [-1, 0, 1],
    });

  assert.deepEqual(
    validateH39H38NumeratorGraphResidualBudgetDiagnostic(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-h38-numerator-graph-residual-budget-diagnostic-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-h38-numerator-graph-residual-budget-diagnostic"
  );
  assert.equal(diagnostic.shifted_index, 1);
  assert.equal(diagnostic.y_order, 44);
  assert.deepEqual(diagnostic.subcell_counts, [4, 8, 16]);
  assert.equal(
    diagnostic.numerator_residual_budget_diagnosis,
    "n38-taylor-remainder-budget-route"
  );
  assert.equal(diagnostic.residual_budget_summaries.length, 3);
  assert.ok(
    diagnostic.max_required_residual_shrink_factor_for_h_row_midpoint_scale >
      1e8
  );
  assert.ok(
    diagnostic.max_required_residual_shrink_factor_for_h_row_midpoint_scale <
      2e8
  );
  assert.ok(
    diagnostic.max_midpoint_residual_width_to_allowed_budget_ratio < 1e-3
  );
  assert.ok(
    diagnostic.interval_pressure_scaling_summary
      .observed_pressure_scaling_exponent > 0.99
  );
  assert.ok(
    diagnostic.interval_pressure_scaling_summary
      .observed_pressure_scaling_exponent < 1.01
  );
  assert.ok(
    diagnostic.residual_width_scaling_summary
      .observed_pressure_scaling_exponent > 0.99
  );
  assert.ok(
    diagnostic.residual_width_scaling_summary
      .observed_pressure_scaling_exponent < 1.01
  );
  for (const summary of diagnostic.residual_budget_summaries) {
    assert.ok(summary.graph_pressure < summary.h_row_midpoint_target_pressure);
    assert.ok(
      summary.midpoint_residual_pressure <
        summary.h_row_midpoint_target_pressure
    );
    assert.ok(
      summary.raw_interval_residual_pressure >
        1e7 * summary.h_row_midpoint_target_pressure
    );
    assert.ok(
      summary.raw_interval_residual_width_to_numerator_width_ratio > 0.99
    );
    assert.ok(
      summary.raw_interval_residual_width_to_numerator_width_ratio < 1.01
    );
    assert.ok(
      summary.allowed_numerator_residual_width_for_h_row_midpoint_scale >
        summary.midpoint_numerator_residual_width
    );
  }
  assert.equal(
    diagnostic.claim_boundary.certifies_standard_h38_cover,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_h38_numerator_graph_enclosure,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_n38_taylor_remainder_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 h38 numerator graph local partitions isolate row-hull failure candidate-only", () => {
  const diagnostic =
    buildH39H38NumeratorGraphLocalPartitionDiagnosticCandidate({
      targetSpeedInterval: [3.02156, 3.02156007813],
      branch: "-",
      rootSubdivisions: 100,
      outerRadius: 0.001,
      shiftedIndex: 1,
      xiDomain: [-2, 2],
      polynomialDegree: 2,
      fineSubcellCount: 16,
      partitionCounts: [1, 2, 4],
      numeratorNoiseSamples: [-1, 0, 1],
    });

  assert.deepEqual(
    validateH39H38NumeratorGraphLocalPartitionDiagnostic(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-h38-numerator-graph-local-partition-diagnostic-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-h38-numerator-graph-local-partition-diagnostic"
  );
  assert.equal(diagnostic.shifted_index, 1);
  assert.equal(diagnostic.y_order, 44);
  assert.deepEqual(diagnostic.partition_counts, [1, 2, 4]);
  assert.equal(diagnostic.fine_subcell_count, 16);
  assert.equal(
    diagnostic.local_partition_diagnosis,
    "local-n38-midpoint-good-raw-hull-artifact"
  );
  assert.ok(
    diagnostic.best_midpoint_to_h_row_midpoint_pressure_ratio < 0.5
  );
  assert.ok(diagnostic.best_interval_to_best_midpoint_pressure_ratio > 1e7);
  for (const summary of diagnostic.partition_summaries) {
    assert.equal(summary.local_partition_count, summary.partition_count);
    assert.ok(
      summary.max_midpoint_residual_pressure <
        diagnostic.baseline_h_row_midpoint_pressure
    );
    assert.ok(summary.max_interval_residual_pressure > 1e20);
    assert.ok(summary.interval_to_midpoint_pressure_ratio > 1e7);
    for (const partition of summary.partitions) {
      assert.ok(partition.max_graph_pressure > 0);
      assert.ok(partition.max_midpoint_residual_pressure > 0);
      assert.ok(partition.max_interval_residual_pressure > 1e20);
      assert.ok(
        partition.midpoint_residual_width_to_numerator_width_ratio < 1e-8
      );
      assert.ok(
        partition.interval_residual_width_to_numerator_width_ratio > 0.99
      );
      assert.ok(
        partition.interval_residual_width_to_numerator_width_ratio < 1.01
      );
    }
  }
  assert.equal(
    diagnostic.claim_boundary.certifies_standard_h38_cover,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_h38_numerator_graph_enclosure,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_n38_taylor_remainder_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 h38 expression-level N38 diagnostic confirms row export boundary candidate-only", () => {
  const diagnostic =
    buildH39H38ExpressionN38DecompositionDiagnosticCandidate({
      targetSpeedInterval: [3.02156, 3.02156007813],
      branch: "-",
      rootSubdivisions: 100,
      subcellCounts: [1, 4, 8],
      seriesOrder: 60,
    });

  assert.deepEqual(
    validateH39H38ExpressionN38DecompositionDiagnostic(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-h38-expression-n38-decomposition-diagnostic-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-h38-expression-n38-decomposition-diagnostic"
  );
  assert.equal(diagnostic.h38_numerator_y_order, 42);
  assert.deepEqual(diagnostic.subcell_counts, [1, 4, 8]);
  assert.equal(
    diagnostic.n38_expression_diagnosis,
    "expression-level-n38-export-confirmed-row-hull-artifact"
  );
  assert.ok(diagnostic.max_direct_export_relative_gap < 1e-10);
  assert.ok(
    diagnostic.n38_expression_width_scaling_summary
      .observed_pressure_scaling_exponent > 0.99
  );
  assert.ok(
    diagnostic.n38_expression_width_scaling_summary
      .observed_pressure_scaling_exponent < 1.01
  );
  assert.ok(
    diagnostic.dominant_expression_term_by_width.coefficient_width > 1e23
  );
  for (const summary of diagnostic.subcell_summaries) {
    assert.equal(
      summary.all_direct_recomputations_match_exported_residual,
      true
    );
    assert.ok(summary.max_direct_n38_expression_width > 1e23);
    assert.equal(summary.row_diagnostics.length, summary.row_count);
    assert.ok(summary.max_midpoint_expression_term_width < 1e4);
    assert.ok(summary.direct_width_to_midpoint_term_width_ratio > 1e19);
    for (const row of summary.row_diagnostics) {
      assert.equal(row.direct_matches_exported_residual, true);
      assert.equal(row.expression_terms.length, 4);
      assert.ok(row.source_width_to_term_width_sum_ratio > 0.1);
      assert.ok(row.source_width_to_term_width_sum_ratio <= 1.0000000001);
      assert.ok(row.max_midpoint_expression_term_width < 1e4);
      assert.ok(row.source_width_to_midpoint_term_width_sum_ratio > 1e19);
    }
  }
  assert.equal(
    diagnostic.claim_boundary.certifies_standard_h38_cover,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_expression_level_n38_provider,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_n38_taylor_remainder_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 h38 expression-level N38 Taylor budget identifies local normal-form route", () => {
  const diagnostic =
    buildH39H38ExpressionN38TaylorBudgetDiagnosticCandidate({
      targetSpeedInterval: [3.02156, 3.02156007813],
      branch: "-",
      rootSubdivisions: 100,
      subcellCounts: [1, 4, 8],
      fitSubcellCount: 8,
      polynomialDegrees: [1, 2, 3],
      seriesOrder: 60,
    });

  assert.deepEqual(
    validateH39H38ExpressionN38TaylorBudgetDiagnostic(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-h38-expression-n38-taylor-budget-diagnostic-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-h38-expression-n38-local-taylor-budget"
  );
  assert.equal(diagnostic.h38_numerator_y_order, 42);
  assert.deepEqual(diagnostic.subcell_counts, [1, 4, 8]);
  assert.equal(diagnostic.fit_subcell_count, 8);
  assert.equal(
    diagnostic.source_expression_decomposition.n38_expression_diagnosis,
    "expression-level-n38-export-confirmed-row-hull-artifact"
  );
  assert.equal(
    diagnostic.n38_taylor_budget_diagnosis,
    "expression-level-n38-local-taylor-route-required"
  );
  assert.ok(
    diagnostic.local_taylor_budget
      .required_width_shrink_factor_to_point_term_scale > 1e19
  );
  assert.ok(
    diagnostic.local_taylor_budget
      .estimated_uniform_subcell_count_for_point_term_scale > 1e12
  );
  assert.equal(
    diagnostic.local_taylor_budget.baseline_term_width_shares[0].term,
    "sin_delta"
  );
  assert.ok(diagnostic.local_taylor_budget.sine_term_width_share > 0.8);
  assert.equal(diagnostic.fit_samples.length, 8);
  const directFit = diagnostic.component_taylor_fit_diagnostics.find(
    (component) => component.component === "direct_n38_expression"
  );
  assert.ok(directFit);
  assert.equal(directFit.sample_count, 8);
  assert.equal(directFit.polynomial_fit_by_degree.length, 3);
  assert.ok(directFit.best_degree_by_max_abs_residual >= 1);
  assert.ok(directFit.best_degree_by_max_abs_residual <= 3);
  assert.ok(Number.isFinite(directFit.best_max_abs_midpoint_residual));
  assert.ok(
    directFit.best_estimated_taylor_partition_count_to_point_scale > 1
  );
  assert.ok(
    directFit.best_estimated_taylor_partition_count_to_point_scale < 200
  );
  assert.ok(
    diagnostic.direct_expression_best_fit
      .best_estimated_taylor_partition_count_to_point_scale < 200
  );
  for (const fit of diagnostic.sine_term_best_fits) {
    assert.ok(fit.best_estimated_taylor_partition_count_to_point_scale > 1);
    assert.ok(fit.best_estimated_taylor_partition_count_to_point_scale < 200);
  }
  assert.equal(
    diagnostic.claim_boundary.certifies_standard_h38_cover,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_expression_level_n38_provider,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_n38_taylor_remainder_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 h38 expression-level N38 Taylor enclosure prototype emits finite xi tile rows candidate-only", () => {
  const diagnostic =
    buildH39H38ExpressionN38TaylorEnclosurePrototypeCandidate({
      targetSpeedInterval: [3.02156, 3.02156007813],
      branch: "-",
      rootSubdivisions: 100,
      subcellCounts: [1, 4, 8],
      fitSubcellCount: 8,
      polynomialDegrees: [1, 2, 3],
      components: ["direct_n38_expression", "sin_phi", "sin_delta"],
      seriesOrder: 60,
    });

  assert.deepEqual(
    validateH39H38ExpressionN38TaylorEnclosurePrototype(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-h38-expression-n38-taylor-enclosure-prototype-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-h38-expression-n38-local-taylor-enclosure-prototype"
  );
  assert.equal(
    diagnostic.n38_taylor_enclosure_prototype_diagnosis,
    "candidate-local-taylor-prototype-replaces-brute-subcover"
  );
  assert.equal(diagnostic.component_prototypes.length, 3);
  assert.ok(diagnostic.prototype_summary.max_tile_count > 50);
  assert.ok(diagnostic.prototype_summary.max_tile_count < 100);
  assert.ok(
    diagnostic.prototype_summary.brute_to_prototype_tile_count_ratio > 1e19
  );
  assert.ok(
    diagnostic.prototype_summary.max_tile_remainder_to_point_width_ratio <= 1
  );
  assert.equal(
    diagnostic.prototype_summary.all_components_pass_point_width_scale,
    true
  );
  const directPrototype = diagnostic.component_prototypes.find(
    (component) => component.component === "direct_n38_expression"
  );
  assert.ok(directPrototype);
  assert.equal(directPrototype.polynomial_degree, 3);
  assert.ok(directPrototype.tile_count > 50);
  assert.ok(directPrototype.tile_count < 80);
  assert.equal(
    directPrototype.prototype_tile_rows.length,
    directPrototype.tile_count
  );
  assert.equal(
    directPrototype.prototype_tile_rows[0].passes_point_width_scale,
    true
  );
  assert.equal(
    directPrototype.all_tiles_pass_point_width_scale,
    true
  );
  for (const prototype of diagnostic.component_prototypes) {
    assert.equal(prototype.polynomial_degree, 3);
    assert.equal(prototype.all_tiles_pass_point_width_scale, true);
    assert.ok(prototype.inflated_prototype_remainder_to_point_width_ratio <= 1);
  }
  assert.equal(
    diagnostic.claim_boundary.certifies_standard_h38_cover,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_expression_level_n38_provider,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_n38_taylor_remainder_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 h38 expression-level N38 Taylor derivative-bound prototype emits fourth-derivative targets candidate-only", () => {
  const diagnostic =
    buildH39H38ExpressionN38TaylorDerivativeBoundPrototypeCandidate({
      targetSpeedInterval: [3.02156, 3.02156007813],
      branch: "-",
      rootSubdivisions: 100,
      subcellCounts: [1, 4, 8],
      fitSubcellCount: 8,
      polynomialDegrees: [1, 2, 3],
      components: ["direct_n38_expression", "sin_phi", "sin_delta"],
      seriesOrder: 60,
    });

  assert.deepEqual(
    validateH39H38ExpressionN38TaylorDerivativeBoundPrototype(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-h38-expression-n38-taylor-derivative-bound-prototype-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-h38-expression-n38-local-taylor-derivative-bound-prototype"
  );
  assert.equal(
    diagnostic.n38_taylor_derivative_bound_prototype_diagnosis,
    "candidate-fourth-derivative-bound-target-finite"
  );
  assert.equal(diagnostic.h38_numerator_y_order, 42);
  assert.equal(
    diagnostic.derivative_bound_parameters.proof_status,
    "sampled-proxy-only-not-directed-rounded"
  );
  assert.equal(
    diagnostic.source_taylor_enclosure_prototype.total_component_tile_rows,
    246
  );
  assert.equal(
    diagnostic.derivative_bound_summary.total_derivative_tile_rows,
    246
  );
  assert.equal(
    diagnostic.derivative_bound_summary.max_tile_count,
    diagnostic.source_taylor_enclosure_prototype.max_tile_count
  );
  assert.ok(
    diagnostic.derivative_bound_summary.max_derivative_bound_headroom_ratio <= 1
  );
  assert.ok(
    diagnostic.derivative_bound_summary
      .max_predicted_tile_remainder_to_point_width_ratio <= 1
  );
  assert.ok(
    diagnostic.derivative_bound_summary.max_prototype_remainder_relative_gap <
      1e-9
  );
  assert.equal(
    diagnostic.derivative_bound_summary
      .all_components_derivative_proxy_below_required_bound,
    true
  );
  const directPrototype =
    diagnostic.component_derivative_bound_prototypes.find(
      (component) => component.component === "direct_n38_expression"
    );
  assert.ok(directPrototype);
  assert.equal(directPrototype.polynomial_degree, 3);
  assert.equal(directPrototype.taylor_remainder_order, 4);
  assert.ok(
    directPrototype.sampled_parent_residual_implied_fourth_derivative_upper > 0
  );
  assert.ok(
    directPrototype.min_required_fourth_derivative_upper_for_point_scale > 0
  );
  assert.ok(directPrototype.max_derivative_bound_headroom_ratio <= 1);
  assert.equal(
    directPrototype.all_tiles_derivative_proxy_below_required_bound,
    true
  );
  for (const component of diagnostic.component_derivative_bound_prototypes) {
    assert.equal(component.polynomial_degree, 3);
    assert.equal(component.taylor_remainder_order, 4);
    assert.equal(
      component.derivative_tile_rows.length,
      component.tile_count
    );
    assert.equal(
      component.all_tiles_derivative_proxy_below_required_bound,
      true
    );
  }
  assert.equal(
    diagnostic.prototype_tile_derivative_rows[0].derivative_bound_status,
    "sampled-fourth-derivative-proxy-below-required-bound"
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_standard_h38_cover,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_expression_level_n38_provider,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_n38_taylor_remainder_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 h38 expression-level N38 fourth-difference diagnostic rejects optimistic derivative proxy candidate-only", () => {
  const diagnostic =
    buildH39H38ExpressionN38TaylorFourthDifferenceDiagnosticCandidate({
      targetSpeedInterval: [3.02156, 3.02156007813],
      branch: "-",
      rootSubdivisions: 100,
      stencilSubcellCounts: [8, 16],
      derivativePrototypeFitSubcellCount: 8,
      polynomialDegrees: [1, 2, 3],
      components: ["direct_n38_expression", "sin_phi", "sin_delta"],
      seriesOrder: 60,
    });

  assert.deepEqual(
    validateH39H38ExpressionN38TaylorFourthDifferenceDiagnostic(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-h38-expression-n38-taylor-fourth-difference-diagnostic-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-h38-expression-n38-local-taylor-fourth-difference-diagnostic"
  );
  assert.equal(
    diagnostic.n38_taylor_fourth_difference_diagnosis,
    "finite-fourth-difference-rejects-parent-residual-proxy-as-certificate"
  );
  assert.equal(diagnostic.h38_numerator_y_order, 42);
  assert.equal(
    diagnostic.fourth_difference_parameters.proof_status,
    "finite-difference-sanity-check-not-directed-rounded-enclosure"
  );
  assert.deepEqual(
    diagnostic.fourth_difference_parameters.stencil_subcell_counts,
    [8, 16]
  );
  assert.ok(
    diagnostic.fourth_difference_summary
      .max_fourth_derivative_to_required_ratio > 1
  );
  assert.ok(
    diagnostic.fourth_difference_summary
      .max_fourth_derivative_to_sampled_proxy_ratio > 1
  );
  assert.ok(
    diagnostic.fourth_difference_summary
      .max_nonuniform_fourth_derivative_estimate > 0
  );
  assert.ok(
    diagnostic.fourth_difference_summary
      .max_nonuniform_to_uniform_fourth_derivative_relative_gap < 0.01
  );
  assert.ok(
    diagnostic.fourth_difference_summary
      .max_retile_count_required_for_observed_fourth_difference >
      diagnostic.source_derivative_bound_prototype.max_tile_count
  );
  assert.equal(
    diagnostic.fourth_difference_summary
      .all_stencils_compatible_with_existing_tile_bound,
    false
  );
  const sixteenSummary = diagnostic.stencil_summaries.find(
    (summary) => summary.stencil_subcell_count === 16
  );
  assert.ok(sixteenSummary);
  assert.ok(sixteenSummary.summary.max_fourth_derivative_to_required_ratio > 1);
  assert.equal(sixteenSummary.component_fourth_difference_rows.length, 3);
  for (const component of sixteenSummary.component_fourth_difference_rows) {
    assert.equal(component.stencil_subcell_count, 16);
    assert.equal(component.fourth_difference_rows.length, 12);
    assert.ok(
      component.fourth_difference_summary
        .max_retile_count_required_for_observed_fourth_difference >
        component.derivative_target_tile_count
    );
  }
  assert.equal(
    diagnostic.claim_boundary.certifies_standard_h38_cover,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_expression_level_n38_provider,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_n38_taylor_remainder_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 h38 expression-level N38 corrected-retile prototype emits finite inflated M4 rows candidate-only", () => {
  const diagnostic =
    buildH39H38ExpressionN38TaylorCorrectedRetilePrototypeCandidate({
      targetSpeedInterval: [3.02156, 3.02156007813],
      branch: "-",
      rootSubdivisions: 100,
      stencilSubcellCounts: [8, 16],
      derivativePrototypeFitSubcellCount: 8,
      polynomialDegrees: [1, 2, 3],
      components: ["direct_n38_expression", "sin_phi", "sin_delta"],
      observedM4InflationFactor: 2,
      seriesOrder: 60,
    });

  assert.deepEqual(
    validateH39H38ExpressionN38TaylorCorrectedRetilePrototype(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-h38-expression-n38-taylor-corrected-retile-prototype-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-h38-expression-n38-local-taylor-corrected-retile-prototype"
  );
  assert.equal(
    diagnostic.n38_taylor_corrected_retile_prototype_diagnosis,
    "candidate-corrected-retile-restores-finite-point-scale-target"
  );
  assert.equal(diagnostic.h38_numerator_y_order, 42);
  assert.equal(
    diagnostic.corrected_retile_parameters.proof_status,
    "observed-fourth-difference-retile-not-directed-rounded"
  );
  assert.equal(
    diagnostic.source_fourth_difference_diagnostic.diagnosis,
    "finite-fourth-difference-rejects-parent-residual-proxy-as-certificate"
  );
  assert.equal(diagnostic.corrected_retile_summary.component_count, 3);
  assert.ok(
    diagnostic.corrected_retile_summary.total_corrected_tile_rows >
      diagnostic.source_fourth_difference_diagnostic
        .original_derivative_tile_rows
  );
  assert.ok(
    diagnostic.corrected_retile_summary.max_corrected_tile_count >
      diagnostic.corrected_retile_summary
        .max_observed_retile_count_from_fourth_difference
  );
  assert.ok(diagnostic.corrected_retile_summary.max_corrected_tile_count < 1000);
  assert.equal(
    diagnostic.corrected_retile_summary.all_components_pass_point_width_scale,
    true
  );
  assert.ok(
    diagnostic.corrected_retile_summary
      .max_corrected_remainder_to_point_width_ratio <= 1
  );
  assert.deepEqual(
    diagnostic.component_corrected_retile_prototypes.map((component) => [
      component.component,
      component.observed_retile_count_from_fourth_difference,
      component.corrected_tile_count,
    ]),
    [
      ["direct_n38_expression", 552, 656],
      ["sin_phi", 591, 703],
      ["sin_delta", 582, 692],
    ]
  );
  for (const component of diagnostic.component_corrected_retile_prototypes) {
    assert.ok(
      component.corrected_tile_count >
        component.source_derivative_target_tile_count
    );
    assert.ok(
      component.corrected_tile_count >
        component.observed_retile_count_from_fourth_difference
    );
    assert.equal(
      component.all_corrected_tiles_pass_point_width_scale,
      true
    );
  }
  assert.equal(
    diagnostic.claim_boundary.certifies_standard_h38_cover,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_expression_level_n38_provider,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_n38_taylor_remainder_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 h38 expression-level N38 sine-pair normal form cancels sum coordinate transport", () => {
  const diagnostic =
    buildH39H38ExpressionN38SinePairNormalFormDiagnosticCandidate({
      targetSpeedInterval: [3.02156, 3.02156007813],
      branch: "-",
      rootSubdivisions: 100,
      sourceStencilSubcellCount: 32,
      comparisonStencilIndex: 27,
      seriesOrder: 60,
    });

  assert.deepEqual(
    validateH39H38ExpressionN38SinePairNormalFormDiagnostic(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-h38-expression-n38-sine-pair-normal-form-diagnostic-candidate-emitted"
  );
  assert.equal(
    diagnostic.n38_sine_pair_normal_form_diagnosis,
    "sine-pair-normal-form-replays-live-positive-xi-source"
  );
  const witness = diagnostic.sine_pair_normal_form_witness;
  assert.equal(
    witness.identity_basis,
    "sum-to-product-delta-phi-half-sum-half-difference"
  );
  assert.equal(witness.fit_used, false);
  assert.equal(witness.proof_status,
    "algebraic-series-identity-on-same-samples-not-directed-rounded-enclosure"
  );
  assert.equal(witness.refined_source_stencil_subcell_count, 32);
  assert.equal(witness.comparison_stencil_index, 27);
  assert.deepEqual(witness.comparison_xi_midpoint_span, [
    1.4373480185956347,
    1.9375400034828008,
  ]);
  assert.deepEqual(witness.sum_coordinate_nonzero_orders, [0, 2]);
  assert.equal(witness.sum_coordinate_branch_dependent, false);
  assert.equal(witness.sum_coordinate_h_row_dependent, false);
  assert.equal(witness.half_sum_h_row_dependency_status, "h-row-free");
  assert.ok(witness.delta_plus_phi_y1_coefficient_abs_upper < 1e-12);
  assert.equal(witness.delta_plus_phi_y2_coefficient, -2);
  assert.equal(witness.explicit_half_sum_h_tail_max_abs_upper, 0);
  assert.ok(witness.raw_sum_coordinate_rounding_residue_h_tail_abs_upper > 0);
  assert.equal(
    witness.raw_sum_coordinate_rounding_residue_h_tail_abs_upper,
    witness.delta_plus_phi_h_tail_max_abs_upper
  );
  witness.sample_witness_rows.forEach((row) => {
    assert.deepEqual(row.explicit_half_sum_nonzero_orders, [0, 2]);
    assert.equal(row.explicit_half_sum_h_tail_max_abs_upper, 0);
    assert.equal(row.half_sum_y2_coefficient, -1);
    assert.equal(row.delta_plus_phi_y2_coefficient, -2);
    assert.ok(row.delta_plus_phi_h_tail_max_abs_upper > 0);
    assert.ok(
      row.sum_coordinate_nonzero_order_entries.some(
        (entry) => entry.order >= 3 && entry.abs_upper > 0
      )
    );
  });
  assert.equal(
    witness.difference_coordinate_carries_branch_and_h_rows,
    true
  );
  assert.equal(
    witness.all_sample_sine_pair_identity_residuals_pass,
    true
  );
  assert.ok(witness.max_sample_sine_pair_identity_relative_gap < 1e-9);
  assert.equal(witness.sine_pair_fourth_difference_replays_sin_terms, true);
  assert.ok(witness.sine_pair_fourth_difference_relative_gap < 1e-6);
  assert.ok(witness.normal_form_fourth_difference_relative_gap < 1e-6);
  assert.equal(witness.sine_pair_fourth_difference_sign, "negative");
  assert.ok(witness.sine_pair_abs_source_mass_share > 0.99);
  assert.ok(
    witness.sine_pair_signed_to_direct_fourth_difference_ratio > 0.98
  );
  assert.ok(
    witness.sine_pair_signed_to_direct_fourth_difference_ratio < 1
  );
  assert.equal(
    witness.normal_form_interpretation,
    "sine-pair-sum-coordinate-cancels-branch-and-h-row-dependence"
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_standard_h38_cover,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_expression_level_n38_provider,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_n38_taylor_remainder_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(collectTrueCertifies(diagnostic), []);
  Object.keys(diagnostic.claim_boundary).forEach((key) => {
    const mutated = structuredClone(diagnostic);
    mutated.claim_boundary[key] = true;
    assert.notDeepEqual(
      validateH39H38ExpressionN38SinePairNormalFormDiagnostic(mutated),
      []
    );
  });
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 h38 expression-level N38 reduced sigma-eta route exposes source-level correlation blocker", () => {
  const diagnostic =
    buildH39H38ExpressionN38ReducedSigmaEtaSourceDiagnosticCandidate({
      targetSpeedInterval: [3.02156, 3.02156007813],
      branch: "-",
      rootSubdivisions: 100,
      sourceStencilSubcellCount: 32,
      comparisonStencilIndex: 27,
      seriesOrder: 60,
    });

  assert.deepEqual(
    validateH39H38ExpressionN38ReducedSigmaEtaSourceDiagnostic(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-h38-expression-n38-reduced-sigma-eta-source-diagnostic-candidate-emitted"
  );
  assert.equal(
    diagnostic.proof_status,
    "directed-interval-coordinate-replay-not-shifted-R43-certificate"
  );
  assert.equal(
    diagnostic.n38_reduced_sigma_eta_source_diagnosis,
    "reduced-sigma-eta-product-route-widens-live-n38-source"
  );
  assert.deepEqual(diagnostic.comparison_xi_midpoint_span, [
    1.4373480185956347,
    1.9375400034828008,
  ]);
  const summary = diagnostic.reduced_sigma_eta_summary;
  assert.equal(summary.row_count, 5);
  assert.equal(summary.all_rows_form_sigma_before_h_row_substitution, true);
  assert.equal(summary.all_rows_reduce_sine_pair_width, false);
  assert.equal(summary.all_rows_widen_sine_pair_width_after_h38_zeroing, true);
  assert.equal(summary.naive_reduced_full_source_widens_every_row, true);
  assert.equal(
    summary.route_interpretation,
    "h38-zeroed-sigma-eta-product-exposes-eta-dependency-blocker"
  );
  assert.ok(summary.min_raw_to_reduced_sine_pair_width_ratio > 0.86);
  assert.ok(summary.max_raw_to_reduced_sine_pair_width_ratio < 0.88);
  assert.ok(summary.min_reduced_full_to_raw_direct_width_ratio > 1.12);
  assert.ok(summary.max_reduced_full_to_raw_direct_width_ratio < 1.14);
  assert.equal(summary.max_sigma_h_tail_abs_upper, 0);
  assert.ok(summary.max_raw_sum_h_tail_rounding_residue > 0);
  assert.ok(summary.max_eta_h_tail_abs_upper > 0);
  diagnostic.reduced_sigma_eta_rows.forEach((row) => {
    assert.equal(
      row.coordinate_route,
      "sigma-eta-before-h-row-substitution"
    );
    assert.deepEqual(row.sigma_nonzero_orders, [0, 2]);
    assert.equal(row.h38_solve_target_zeroed, true);
    assert.equal(row.sigma_y2_coefficient, -1);
    assert.equal(row.sigma_h_tail_max_abs_upper, 0);
    assert.equal(row.raw_sum_has_rounding_h_tail_residue, true);
    assert.ok(row.raw_sum_h_tail_max_abs_upper > 0);
    assert.equal(row.eta_carries_branch_and_h_rows, true);
    assert.ok(row.eta_y1_coefficient_abs_upper > 0);
    assert.ok(row.eta_h_tail_max_abs_upper > 0);
    assert.ok(row.raw_to_reduced_sine_pair_width_ratio < 1);
    assert.ok(row.reduced_full_to_raw_direct_width_ratio > 1);
    assert.equal(
      row.reduced_source_route_interpretation,
      "h38-zeroed-sigma-eta-product-widens-eta-dependency"
    );
  });
  assert.equal(
    diagnostic.claim_boundary.certifies_standard_h38_cover,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_expression_level_n38_provider,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_n38_taylor_remainder_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(collectTrueCertifies(diagnostic), []);
  Object.keys(diagnostic.claim_boundary).forEach((key) => {
    const mutated = structuredClone(diagnostic);
    mutated.claim_boundary[key] = true;
    assert.notDeepEqual(
      validateH39H38ExpressionN38ReducedSigmaEtaSourceDiagnostic(mutated),
      []
    );
  });
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 h38 expression-level N38 eta transport coupling localizes terminal row width", () => {
  const diagnostic =
    buildH39H38ExpressionN38EtaTransportCouplingDiagnosticCandidate({
      targetSpeedInterval: [3.02156, 3.02156007813],
      branch: "-",
      rootSubdivisions: 100,
      sourceStencilSubcellCount: 32,
      comparisonStencilIndex: 27,
      topContributorCount: 8,
      seriesOrder: 60,
    });

  assert.deepEqual(
    validateH39H38ExpressionN38EtaTransportCouplingDiagnostic(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-h38-expression-n38-eta-transport-coupling-diagnostic-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-h38-expression-n38-eta-transport-coupling-diagnostic"
  );
  assert.equal(
    diagnostic.proof_status,
    "finite-eta-transport-replay-not-directed-rounded-source-certificate"
  );
  assert.equal(
    diagnostic.n38_eta_transport_coupling_diagnosis,
    "eta-transport-width-localizes-to-terminal-h37-h36-h35"
  );
  assert.equal(diagnostic.source_stencil_subcell_count, 32);
  assert.equal(diagnostic.comparison_stencil_index, 27);
  assert.deepEqual(diagnostic.comparison_xi_midpoint_span, [
    1.4373480185956347,
    1.9375400034828008,
  ]);

  const summary = diagnostic.eta_transport_coupling_summary;
  assert.equal(summary.row_count, 5);
  assert.equal(summary.h_row_count, 39);
  assert.equal(summary.one_active_replay_count, 5 * 39);
  assert.equal(summary.all_rows_positive_xi_stencil, true);
  assert.equal(summary.all_rows_h38_solve_target_zeroed, true);
  assert.equal(summary.all_rows_form_sigma_before_h_row_substitution, true);
  assert.equal(
    summary.frozen_eta_h_rows_are_narrower_than_all_active_every_row,
    true
  );
  assert.equal(summary.one_active_replays_cover_h0_through_h38, true);
  assert.equal(summary.h38_one_active_replay_matches_frozen, true);
  assert.equal(summary.all_active_width_dominates_one_active_replays, true);
  assert.deepEqual(summary.terminal_eta_h_indexes, [37, 36, 35]);
  assert.equal(summary.all_rows_terminal_eta_rows_dominate, true);
  assert.ok(summary.min_top3_eta_transport_width_share_of_all > 0.96);
  assert.ok(summary.min_h37_eta_transport_width_share_of_all > 0.73);
  assert.ok(summary.max_h37_eta_transport_width_share_of_all < 0.75);
  assert.ok(summary.max_frozen_to_raw_direct_width_ratio < 1e-12);
  assert.ok(summary.min_all_active_to_raw_direct_width_ratio > 1.12);
  assert.ok(summary.max_all_active_to_raw_direct_width_ratio < 1.14);
  assert.equal(
    summary.route_interpretation,
    "terminal-eta-transport-rows-dominate-reduced-source-width"
  );

  diagnostic.eta_transport_coupling_rows.forEach((row) => {
    assert.equal(
      row.coordinate_route,
      "sigma-eta-before-h-row-substitution"
    );
    assert.equal(row.h38_solve_target_zeroed, true);
    assert.ok(row.raw_direct_source_width > 0);
    assert.equal(
      row.all_active_reduced_source.eta_transport_mode,
      "all-active-reduced-source"
    );
    assert.equal(
      row.frozen_eta_h_rows.eta_transport_mode,
      "frozen-eta-h-rows"
    );
    assert.ok(row.all_active_reduced_source.eta_h_tail_max_width > 0);
    assert.ok(
      row.frozen_eta_h_rows.eta_h_tail_max_width <
        row.all_active_reduced_source.eta_h_tail_max_width * 1e-20
    );
    assert.equal(row.all_active_reduced_source.sigma_h_tail_max_abs_upper, 0);
    assert.equal(row.frozen_eta_h_rows.sigma_h_tail_max_abs_upper, 0);
    assert.ok(
      row.all_active_reduced_source.full_source_width >
        row.frozen_eta_h_rows.full_source_width
    );
    assert.equal(row.one_active_eta_h_row_replays.length, 39);
    assert.deepEqual(
      row.one_active_eta_h_row_replays.map((replay) => replay.active_h_index),
      Array.from({ length: 39 }, (_, index) => index)
    );
    assert.deepEqual(row.terminal_eta_h_indexes, [37, 36, 35]);
    assert.ok(row.terminal_eta_transport_width_share_of_all > 0.96);
    assert.equal(row.terminal_eta_rows_dominate, true);
    assert.equal(row.h38_one_active_replay_matches_frozen, true);
    assert.equal(
      row.eta_transport_width_interpretation,
      "terminal-h37-h36-h35-dominate-eta-transport-width"
    );
    const [first, second, third] = row.top_eta_transport_width_rows;
    assert.equal(first.active_h_index, 37);
    assert.equal(second.active_h_index, 36);
    assert.equal(third.active_h_index, 35);
    assert.ok(first.full_source_width_share_of_all_active > 0.73);
    assert.ok(first.full_source_width_share_of_all_active < 0.75);
    row.one_active_eta_h_row_replays.forEach((replay) => {
      assert.equal(
        replay.eta_transport_mode,
        "one-active-eta-h-row-replay"
      );
      assert.equal(replay.h38_solve_target_zeroed, true);
      assert.equal(replay.sigma_h_tail_max_abs_upper, 0);
      assert.ok(
        replay.full_source_width >=
          row.frozen_eta_h_rows.full_source_width * (1 - 1e-12)
      );
      assert.ok(
        row.all_active_reduced_source.full_source_width >=
          replay.full_source_width * (1 - 1e-12)
      );
    });
    assert.equal(
      row.one_active_eta_h_row_replays[
        THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index
      ].active_h_width,
      0
    );
  });
  assert.equal(
    diagnostic.claim_boundary.certifies_standard_h38_cover,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_expression_level_n38_provider,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_n38_taylor_remainder_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_eta_transport_enclosure,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_reduced_source_enclosure,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(collectTrueCertifies(diagnostic), []);
  Object.keys(diagnostic.claim_boundary).forEach((key) => {
    const mutated = structuredClone(diagnostic);
    mutated.claim_boundary[key] = true;
    assert.notDeepEqual(
      validateH39H38ExpressionN38EtaTransportCouplingDiagnostic(mutated),
      []
    );
  });
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 h38 expression-level N38 terminal eta graph replay isolates candidate certificate route", () => {
  const diagnostic =
    buildH39H38ExpressionN38TerminalEtaGraphDiagnosticCandidate({
      targetSpeedInterval: [3.02156, 3.02156007813],
      branch: "-",
      rootSubdivisions: 100,
      sourceStencilSubcellCount: 32,
      comparisonStencilIndex: 27,
      polynomialDegree: 2,
      terminalHIndexes: [37, 36, 35],
      topContributorCount: 8,
      seriesOrder: 60,
    });

  assert.deepEqual(
    validateH39H38ExpressionN38TerminalEtaGraphDiagnostic(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-h38-expression-n38-terminal-eta-graph-diagnostic-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-h38-expression-n38-terminal-eta-graph-diagnostic"
  );
  assert.equal(
    diagnostic.proof_status,
    "finite-terminal-eta-graph-replay-not-directed-rounded-source-certificate"
  );
  assert.equal(
    diagnostic.n38_terminal_eta_graph_diagnosis,
    "terminal-row-polynomial-graph-is-next-certificate-route"
  );
  assert.deepEqual(diagnostic.terminal_provider_h_indexes, [37, 36, 35]);
  assert.deepEqual(diagnostic.comparison_xi_midpoint_span, [
    1.4373480185956347,
    1.9375400034828008,
  ]);

  const summary = diagnostic.terminal_eta_graph_summary;
  assert.equal(summary.row_count, 5);
  assert.deepEqual(summary.terminal_provider_h_indexes, [37, 36, 35]);
  assert.equal(summary.nonterminal_provider_h_indexes_exclude_terminal, true);
  assert.equal(summary.all_rows_positive_xi_stencil, true);
  assert.equal(summary.all_rows_h38_solve_target_zeroed, true);
  assert.equal(summary.all_rows_form_sigma_before_h_row_substitution, true);
  assert.equal(summary.all_rows_terminal_rows_dominate, true);
  assert.equal(
    summary.all_rows_terminal_replay_exceeds_nonterminal_replay,
    true
  );
  assert.equal(
    summary.all_rows_terminal_plus_nonterminal_replay_covers_all_active_width,
    true
  );
  assert.equal(summary.all_rows_terminal_graph_reduces_terminal_width, true);
  assert.equal(
    summary.all_rows_terminal_graph_with_nonterminal_below_nonterminal_wall,
    true
  );
  assert.equal(
    summary.all_rows_terminal_interval_residual_recreates_terminal_width,
    true
  );
  assert.equal(summary.h38_one_active_replay_matches_frozen, true);
  assert.ok(summary.min_terminal_width_share_of_all > 0.95);
  assert.ok(summary.max_nonterminal_width_share_of_all < 0.05);
  assert.ok(summary.min_terminal_plus_nonterminal_width_share_of_all > 0.999);
  assert.ok(summary.max_terminal_graph_width_share_of_terminal < 1e-6);
  assert.ok(
    summary.max_terminal_graph_with_nonterminal_width_share_of_all < 0.05
  );
  assert.ok(
    summary.min_terminal_graph_interval_residual_width_share_of_terminal > 0.9
  );
  assert.equal(
    summary.route_interpretation,
    "terminal-polynomial-graph-collapses-localized-eta-width-candidate"
  );

  diagnostic.terminal_eta_graph_rows.forEach((row) => {
    assert.deepEqual(row.terminal_provider_h_indexes, [37, 36, 35]);
    assert.equal(row.nonterminal_provider_h_indexes_exclude_terminal, true);
    assert.equal(
      row.nonterminal_provider_h_indexes.some((hIndex) =>
        row.terminal_provider_h_indexes.includes(hIndex)
      ),
      false
    );
    assert.equal(row.h38_solve_target_zeroed, true);
    assert.equal(row.terminal_replay.h38_solve_target_zeroed, true);
    assert.equal(row.nonterminal_replay.h38_solve_target_zeroed, true);
    assert.equal(row.terminal_graph_replay.h38_solve_target_zeroed, true);
    assert.equal(
      row.terminal_graph_with_nonterminal_replay.h38_solve_target_zeroed,
      true
    );
    assert.equal(
      row.terminal_graph_interval_residual_replay.h38_solve_target_zeroed,
      true
    );
    assert.equal(row.h38_one_active_replay_matches_frozen, true);
    assert.equal(
      row.one_active_eta_h_row_replays[
        THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index
      ].active_h_width,
      0
    );
    assert.ok(
      row.terminal_replay.full_source_width >
        row.nonterminal_replay.full_source_width
    );
    assert.ok(row.terminal_width_share_of_all > 0.95);
    assert.ok(row.nonterminal_width_share_of_all < 0.05);
    assert.ok(row.terminal_plus_nonterminal_width_share_of_all > 0.999);
    assert.ok(row.terminal_graph_width_share_of_terminal < 1e-6);
    assert.ok(row.terminal_graph_with_nonterminal_width_share_of_all < 0.05);
    assert.ok(row.terminal_graph_interval_residual_width_share_of_terminal > 0.9);
    assert.equal(row.terminal_graph_reduces_terminal_width, true);
    assert.equal(
      row.terminal_graph_with_nonterminal_below_nonterminal_wall,
      true
    );
    assert.equal(row.terminal_interval_residual_recreates_terminal_width, true);
    assert.deepEqual(
      row.top_eta_transport_width_rows
        .slice(0, 3)
        .map((entry) => entry.active_h_index),
      [37, 36, 35]
    );
    row.terminal_graph_intervals.forEach((entry) => {
      assert.ok([37, 36, 35].includes(entry.h_index));
      assert.equal(entry.polynomial_degree, 2);
      assert.ok(entry.graph_to_producer_width_ratio < 1e-6);
      assert.ok(entry.interval_residual_width_ratio_to_producer > 0.9);
    });
    assert.equal(
      row.terminal_eta_graph_route_interpretation,
      "terminal-polynomial-graph-collapses-terminal-eta-width-candidate"
    );
  });
  assert.equal(
    diagnostic.claim_boundary.certifies_standard_h38_cover,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_expression_level_n38_provider,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_terminal_row_provider_enclosure,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_eta_transport_enclosure,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_reduced_source_enclosure,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(collectTrueCertifies(diagnostic), []);
  Object.keys(diagnostic.claim_boundary).forEach((key) => {
    const mutated = structuredClone(diagnostic);
    mutated.claim_boundary[key] = true;
    assert.notDeepEqual(
      validateH39H38ExpressionN38TerminalEtaGraphDiagnostic(mutated),
      []
    );
  });
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 terminal affine-zeta endpoint provider replay crosses the provider boundary", () => {
  const diagnostic =
    buildH39TerminalSharedResidualAffineZetaProviderReplayDiagnosticCandidate({
      targetSpeedInterval: [3.02156, 3.02156007813],
      branch: "-",
      rootSubdivisions: 100,
      sourceStencilSubcellCount: 5,
      comparisonStencilIndex: 0,
      polynomialDegree: 2,
      terminalHIndexes: [37, 36, 35],
      residualCoordinatePartitionCount: 2,
      endpointReplayRowLimit: 1,
      outerRadius: 0.001,
      shiftedIndex: 1,
      seriesOrder: 60,
    });

  assert.deepEqual(
    validateH39TerminalSharedResidualAffineZetaProviderReplayDiagnostic(
      diagnostic
    ),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-terminal-shared-residual-affine-zeta-provider-replay-diagnostic-candidate-emitted"
  );
  assert.equal(diagnostic.shifted_index, 1);
  assert.equal(diagnostic.y_order, 44);
  assert.equal(diagnostic.source_stencil_subcell_count, 5);
  assert.equal(diagnostic.comparison_row_count, 5);
  assert.equal(diagnostic.endpoint_replay_row_count, 1);
  assert.deepEqual(diagnostic.terminal_provider_h_indexes, [37, 36, 35]);
  assert.equal(diagnostic.residual_coordinate_partition_count, 2);
  assert.equal(
    diagnostic.h38_solve_target_policy,
    "preserved-H39-predecessor-row"
  );
  assert.equal(
    diagnostic.provider_shape_interpretation
      .existing_h_row_provider_accepts_shared_zeta_endpoint,
    true
  );
  assert.equal(
    diagnostic.provider_shape_interpretation
      .existing_h_row_provider_accepts_shared_zeta_interval,
    false
  );
  assert.equal(
    diagnostic.terminal_zeta_degree_bound
      .affine_in_shared_residual_coordinate,
    true
  );
  assert.equal(
    diagnostic.endpoint_provider_replay_summary.endpoint_replay_count,
    4
  );
  assert.equal(
    diagnostic.endpoint_provider_replay_summary
      .all_endpoint_replays_provider_backed,
    true
  );
  assert.ok(
    diagnostic.endpoint_provider_replay_summary
      .max_endpoint_shifted_prefix_pressure_outer_radius > 0
  );
  assert.equal(
    diagnostic.provider_replay_diagnosis,
    "terminal-affine-zeta-endpoints-cross-existing-H39-provider-boundary-candidate"
  );
  assert.equal(
    diagnostic.claim_boundary
      .certifies_terminal_affine_zeta_provider_enclosure,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shared_zeta_interval_provider,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 post-zeta pressure source isolation reports remaining h-row source", () => {
  const diagnostic =
    buildH39PostZetaPressureSourceIsolationDiagnosticCandidate({
      targetSpeedInterval: [3.02156, 3.02156007813],
      branch: "-",
      rootSubdivisions: 100,
      sourceStencilSubcellCount: 5,
      comparisonStencilIndex: 0,
      polynomialDegree: 2,
      terminalHIndexes: [37, 36, 35],
      residualCoordinatePartitionCount: 2,
      rowAnalysisLimit: 1,
      hFreezeStartIndexes: [38, 35, 0],
      hRowWidthCompressionFactors: [1, 0.5, 0],
      singleHIndexAnalysisIndexes: [38, 37, 36, 35, 0],
      outerRadius: 0.001,
      shiftedIndex: 1,
      seriesOrder: 60,
    });

  assert.deepEqual(
    validateH39PostZetaPressureSourceIsolationDiagnostic(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-post-zeta-pressure-source-isolation-diagnostic-candidate-emitted"
  );
  assert.equal(diagnostic.shifted_index, 1);
  assert.equal(diagnostic.y_order, 44);
  assert.equal(diagnostic.source_stencil_subcell_count, 5);
  assert.equal(diagnostic.comparison_row_count, 5);
  assert.equal(diagnostic.row_analysis_count, 1);
  assert.equal(
    diagnostic.endpoint_replay_summary.endpoint_replay_count,
    4
  );
  assert.equal(
    diagnostic.endpoint_replay_summary.all_endpoint_replays_provider_backed,
    true
  );
  assert.ok(diagnostic.dominant_endpoint_replay.pressure > 0);
  assert.equal(
    diagnostic.h38_included_endpoint_replay_summary.endpoint_replay_count,
    4
  );
  assert.equal(
    diagnostic.h38_included_endpoint_replay_summary
      .all_endpoint_replays_provider_backed,
    true
  );
  assert.ok(
    diagnostic.h38_included_endpoint_replay_summary
      .preserved_h38_to_h38_included_max_pressure_ratio > 0
  );
  assert.equal(
    diagnostic.dominant_endpoint_sensitivity.status,
    "h39-affine-center-h-row-sensitivity-diagnostic-candidate-emitted"
  );
  assert.equal(
    diagnostic.post_zeta_pressure_source_summary.active_only_family_replays
      .length,
    3
  );
  assert.equal(
    diagnostic.post_zeta_pressure_source_summary.frozen_out_family_replays
      .length,
    3
  );
  assert.equal(
    diagnostic.post_zeta_pressure_source_summary
      .active_only_single_h_index_replays.length,
    5
  );
  assert.equal(
    diagnostic.post_zeta_pressure_source_summary
      .frozen_out_single_h_index_replays.length,
    5
  );
  assert.ok(
    diagnostic.post_zeta_pressure_source_summary
      .dominant_active_only_single_h_index_replay.pressure > 0
  );
  assert.ok(
    diagnostic.post_zeta_pressure_source_summary
      .dominant_frozen_out_single_h_index_replay.full_to_pressure_ratio > 0
  );
  assert.equal(
    diagnostic.claim_boundary
      .certifies_terminal_affine_zeta_provider_enclosure,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_post_zeta_pressure_source_isolation,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 h38 y44 coefficient dependence fits signed source coefficient", () => {
  const diagnostic =
    buildH39H38Y44CoefficientDependenceDiagnosticCandidate({
      targetSpeedInterval: [3.02156, 3.02156007813],
      branch: "-",
      rootSubdivisions: 100,
      sourceStencilSubcellCount: 5,
      comparisonStencilIndex: 0,
      polynomialDegree: 2,
      h38NoiseSamples: [-1, 0, 1],
      outerRadius: 0.001,
      shiftedIndex: 1,
      seriesOrder: 60,
    });

  assert.deepEqual(
    validateH39H38Y44CoefficientDependenceDiagnostic(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-h38-y44-coefficient-dependence-diagnostic-candidate-emitted"
  );
  assert.equal(diagnostic.shifted_index, 1);
  assert.equal(diagnostic.y_order, 44);
  assert.equal(diagnostic.comparison_row_count, 5);
  assert.equal(diagnostic.sample_replays.length, 3);
  assert.equal(diagnostic.source_coefficient_affine_fit.polynomial_degree, 1);
  assert.equal(
    diagnostic.source_coefficient_quadratic_fit.polynomial_degree,
    2
  );
  assert.ok(
    diagnostic.source_coefficient_quadratic_fit.max_abs_midpoint_residual <=
      diagnostic.source_coefficient_affine_fit.max_abs_midpoint_residual
  );
  assert.ok(Number.isFinite(diagnostic.affine_zero_coordinate));
  assert.equal(diagnostic.center_sample_replay.h38_noise_coordinate, 0);
  assert.ok(diagnostic.center_to_max_sample_pressure_ratio > 0);
  assert.ok(
    diagnostic.term_coefficient_dependence_profiles.some(
      (profile) => profile.term === "sin_delta"
    )
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_h38_y44_coefficient_dependence,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 h38 y44 source covariance diagnoses signed term cancellation", () => {
  const diagnostic =
    buildH39H38Y44SourceCovarianceDiagnosticCandidate({
      targetSpeedInterval: [3.02156, 3.02156007813],
      branch: "-",
      rootSubdivisions: 100,
      sourceStencilSubcellCount: 5,
      comparisonStencilIndex: 0,
      analysisRowOffset: 2,
      polynomialDegree: 2,
      h38NoiseSamples: [-1, 0, 1],
      outerRadius: 0.001,
      shiftedIndex: 1,
      seriesOrder: 60,
    });

  assert.deepEqual(
    validateH39H38Y44SourceCovarianceDiagnostic(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-h38-y44-source-covariance-diagnostic-candidate-emitted"
  );
  assert.equal(diagnostic.shifted_index, 1);
  assert.equal(diagnostic.y_order, 44);
  assert.equal(diagnostic.comparison_row_count, 5);
  assert.equal(diagnostic.analysis_row_offset, 2);
  assert.equal(diagnostic.analysis_cell_id, "speed.2.first-y");
  assert.equal(diagnostic.sample_replays.length, 3);
  assert.equal(diagnostic.source_affine_zero_replay.sample_index, -1);
  assert.ok(Number.isFinite(diagnostic.source_affine_zero_coordinate));
  assert.ok(Number.isFinite(diagnostic.source_zero_cancellation_ratio));
  assert.ok(Number.isFinite(diagnostic.source_zero_term_sum_relative_gap));
  assert.ok(diagnostic.source_zero_term_abs_midpoint_sum > 0);
  assert.deepEqual(
    diagnostic.term_covariance_rows.map((row) => row.term).sort(),
    ["delta_squared_speed", "sin_delta", "sin_phi"]
  );
  assert.equal(diagnostic.term_pair_cancellation_rows.length, 3);
  assert.equal(
    diagnostic.source_covariance_collar_rows.length,
    diagnostic.collar_half_widths.length
  );
  assert.equal(
    diagnostic.source_covariance_reference_collar_summary.length,
    diagnostic.reference_pressure_targets.length
  );
  assert.equal(
    diagnostic.h38_producer_residual_coordinate_profile.row_count,
    diagnostic.comparison_row_count
  );
  assert.equal(
    diagnostic.h38_producer_residual_coordinate_profile
      .target_speed_interval.length,
    2
  );
  assert.equal(
    diagnostic.h38_producer_residual_coordinate_profile
      .source_stencil_subcell_count,
    diagnostic.source_stencil_subcell_count
  );
  assert.equal(
    diagnostic.h38_producer_residual_coordinate_profile
      .comparison_stencil_index,
    diagnostic.comparison_stencil_index
  );
  assert.ok(
    diagnostic.h38_producer_residual_coordinate_profile.samples.every(
      (sample, sampleIndex) =>
        sample.comparison_row_index === sampleIndex &&
        sample.source_subcover_row_index ===
          diagnostic.comparison_stencil_index + sampleIndex &&
        sample.branch === diagnostic.branch &&
        sample.h_row_interval_count === 39 &&
        Array.isArray(sample.cell.speed_interval) &&
        Array.isArray(sample.h_intervals) &&
        sample.h_intervals.length === 39
    )
  );
  assert.equal(
    diagnostic.source_covariance_producer_image_collar_rows.length,
    diagnostic.collar_half_widths.length
  );
  assert.equal(
    diagnostic.source_covariance_reference_producer_image_summary.length,
    diagnostic.reference_pressure_targets.length
  );
  assert.ok(
    diagnostic.source_covariance_producer_image_collar_rows.every(
      (row) =>
        row.producer_coordinate_target_fit.row_count ===
          diagnostic.comparison_row_count &&
        typeof row.target_covers_producer_midpoint_hull === "boolean" &&
        typeof row.target_covers_producer_interval_hull === "boolean"
    )
  );
  assert.ok(
    diagnostic.source_covariance_reference_producer_image_summary.every(
      (row) =>
        [
          "no-signed-source-collar-meets-reference-target",
          "signed-source-collar-covers-producer-interval-hull",
          "signed-source-collar-covers-producer-midpoint-hull-only",
          "signed-source-collar-misses-producer-midpoint-hull",
        ].includes(row.route_interpretation)
    )
  );
  assert.ok(
    [
      "zero-centered-source-collar-covers-producer-interval-hull",
      "zero-centered-source-collar-covers-producer-midpoint-hull-only",
      "zero-centered-source-collar-misses-producer-midpoint-hull",
      "no-reference-target-closed-by-zero-centered-source-collar",
    ].includes(diagnostic.source_covariance_producer_image_route_diagnosis)
  );
  assert.equal(
    diagnostic.source_covariance_producer_centered_collar_rows.length,
    diagnostic.collar_half_widths.length
  );
  assert.equal(
    diagnostic.source_covariance_reference_producer_centered_summary.length,
    diagnostic.reference_pressure_targets.length
  );
  assert.ok(
    diagnostic.source_covariance_producer_centered_collar_rows.every(
      (row) =>
        Array.isArray(row.producer_midpoint_coordinate_hull) &&
        row.producer_midpoint_coordinate_hull.length === 2 &&
        row.source_pressure <= row.term_triangle_pressure
    )
  );
  assert.ok(
    [
      "producer-centered-source-collar-closes-reference-target",
      "producer-midpoint-hull-closes-reference-target",
      "producer-centered-source-collar-exceeds-reference-target",
    ].includes(
      diagnostic.source_covariance_producer_centered_route_diagnosis
    )
  );
  assert.equal(diagnostic.safety_search_iterations, 16);
  assert.equal(
    diagnostic.producer_centered_safety_candidate_half_width,
    Math.max(...diagnostic.collar_half_widths)
  );
  assert.equal(
    diagnostic.source_covariance_producer_centered_safety_search_rows.length,
    diagnostic.reference_pressure_targets.length
  );
  assert.ok(
    diagnostic.source_covariance_producer_centered_safety_search_rows.every(
      (row) =>
        row.safety_search_iterations ===
          diagnostic.safety_search_iterations &&
        row.candidate_half_width ===
          diagnostic.producer_centered_safety_candidate_half_width &&
        row.producer_centered_safety_search.safety_search_iterations ===
          diagnostic.safety_search_iterations &&
        row.producer_centered_collar_target.label.startsWith(
          "source-covariance-reference-"
        )
    )
  );
  assert.ok(
    [
      "producer-centered-safety-search-finds-positive-source-covariance-collar",
      "producer-centered-safety-search-center-hull-only",
      "producer-centered-safety-search-center-exceeds-target",
    ].includes(
      diagnostic.source_covariance_producer_centered_safety_search_diagnosis
    )
  );
  assert.ok(
    diagnostic
      .max_source_covariance_producer_centered_safety_closing_half_width >= 0
  );
  assert.ok(
    diagnostic
      .max_source_covariance_producer_centered_safety_bracket_width >= 0
  );
  assert.equal(
    diagnostic.source_covariance_h38_y44_solve_width_profile.sample_count,
    diagnostic.comparison_row_count
  );
  const h38Y44SolveSamples =
    diagnostic.source_covariance_h38_y44_solve_width_profile.samples;
  assert.ok(
    h38Y44SolveSamples.every(
      (sample) =>
        Number.isFinite(sample.numerator_expression_midpoint) &&
        Number.isFinite(sample.numerator_source_term_midpoint_sum) &&
        sample.numerator_term_midpoints &&
        Number.isFinite(sample.numerator_term_midpoints.sin_delta) &&
        Number.isFinite(sample.numerator_term_midpoints.sin_phi) &&
        Number.isFinite(
          sample.numerator_term_midpoints.delta_squared_speed
        ) &&
        Number.isFinite(sample.numerator_term_midpoints.constant_minus_two)
    )
  );
  assert.equal(
    diagnostic.source_covariance_h38_y44_numerator_polynomial_diagnostic
      .polynomial_degree,
    diagnostic.polynomial_degree
  );
  assert.equal(
    diagnostic
      .source_covariance_producer_centered_numerator_collar_targets.length,
    diagnostic.reference_pressure_targets.length
  );
  assert.ok(
    diagnostic.source_covariance_producer_centered_numerator_collar_targets.every(
      (target) =>
        target.label.startsWith("source-covariance-reference-") &&
        target.numerator_polynomial_degree === diagnostic.polynomial_degree &&
        target.samples.length === diagnostic.comparison_row_count
    )
  );
  assert.ok(
    diagnostic
      .source_covariance_positive_producer_centered_numerator_collar_targets
      .length <= diagnostic.reference_pressure_targets.length
  );
  assert.ok(
    diagnostic.source_covariance_positive_producer_centered_numerator_collar_targets.every(
      (target) =>
        target.numerator_midpoint_graph_inside_collar_target === true ||
        target.numerator_midpoint_graph_inside_collar_target === false
    )
  );
  assert.ok(
    diagnostic
      .source_covariance_producer_centered_numerator_graph_inside_count >= 0
  );
  assert.ok(
    diagnostic
      .source_covariance_positive_producer_centered_numerator_graph_inside_count >=
      0
  );
  assert.ok(
    diagnostic
      .max_source_covariance_producer_centered_numerator_interval_compression_to_conservative_target ===
      null ||
      diagnostic
        .max_source_covariance_producer_centered_numerator_interval_compression_to_conservative_target >
        0
  );
  assert.ok(
    diagnostic
      .max_source_covariance_producer_centered_numerator_midpoint_residual_over_conservative_target ===
      null ||
      diagnostic
        .max_source_covariance_producer_centered_numerator_midpoint_residual_over_conservative_target >=
        0
  );
  assert.ok(
    diagnostic
      .min_source_covariance_producer_centered_numerator_midpoint_residual_headroom_factor ===
      null ||
      diagnostic
        .min_source_covariance_producer_centered_numerator_midpoint_residual_headroom_factor >
        0
  );
  assert.ok(
    diagnostic
      .max_source_covariance_positive_producer_centered_numerator_interval_compression_to_conservative_target ===
      null ||
      diagnostic
        .max_source_covariance_positive_producer_centered_numerator_interval_compression_to_conservative_target >
        0
  );
  assert.ok(
    diagnostic
      .max_source_covariance_positive_producer_centered_numerator_midpoint_residual_over_conservative_target ===
      null ||
      diagnostic
        .max_source_covariance_positive_producer_centered_numerator_midpoint_residual_over_conservative_target >=
        0
  );
  assert.ok(
    diagnostic
      .min_source_covariance_positive_producer_centered_numerator_midpoint_residual_headroom_factor ===
      null ||
      diagnostic
        .min_source_covariance_positive_producer_centered_numerator_midpoint_residual_headroom_factor >
        0
  );
  assert.ok(
    diagnostic.source_covariance_h38_y44_n38_collar_enclosure_route
  );
  assert.equal(
    diagnostic.source_covariance_h38_y44_n38_collar_enclosure_route
      .status,
    "h39-h38-y44-n38-collar-enclosure-route-candidate-emitted"
  );
  assert.equal(
    diagnostic.source_covariance_h38_y44_n38_collar_enclosure_route
      .polynomial_degree,
    diagnostic.polynomial_degree
  );
  assert.equal(
    diagnostic.source_covariance_h38_y44_n38_collar_enclosure_route
      .reference_target_count,
    diagnostic.reference_pressure_targets.length
  );
  assert.ok(
    [
      "n38-quadratic-midpoint-residual-has-directed-rounded-collar-headroom",
      "s37-lower-bound-dependency-collapse-controls-n38-collar-route",
      "n38-quadratic-midpoint-residual-has-partial-collar-headroom",
      "n38-quadratic-midpoint-residual-collar-route-open",
    ].includes(
      diagnostic.source_covariance_h38_y44_n38_collar_enclosure_route
        .route_diagnosis
    )
  );
  assert.ok(
    diagnostic.source_covariance_positive_h38_y44_n38_collar_enclosure_route
  );
  assert.equal(
    diagnostic.source_covariance_positive_h38_y44_n38_collar_enclosure_route
      .reference_target_count,
    diagnostic
      .source_covariance_positive_producer_centered_numerator_collar_targets
      .length
  );
  assert.equal(
    diagnostic.source_covariance_positive_h38_y44_n38_collar_enclosure_route
      .sample_count,
    diagnostic
      .source_covariance_positive_producer_centered_numerator_collar_targets
      .length * diagnostic.comparison_row_count
  );
  assert.ok(
    [
      "source-covariance-n38-midpoint-graph-fits-measured-collar",
      "source-covariance-n38-midpoint-graph-partially-fits-measured-collar",
      "source-covariance-n38-midpoint-graph-open-for-measured-collar",
      "source-covariance-n38-collar-needs-positive-source-covariance-width",
    ].includes(diagnostic.source_covariance_n38_collar_interpretation)
  );
  assert.ok(
    [
      "source-covariance-positive-n38-collar-no-positive-collar-target",
      "source-covariance-positive-n38-midpoint-graph-fits-measured-collar",
      "source-covariance-positive-n38-midpoint-graph-partially-fits-measured-collar",
      "source-covariance-positive-n38-midpoint-graph-open-for-measured-collar",
    ].includes(
      diagnostic.source_covariance_positive_n38_collar_interpretation
    )
  );
  assert.equal(
    diagnostic.source_covariance_positive_n38_degree_sweep_rows.length,
    diagnostic
      .source_covariance_h38_y44_numerator_polynomial_degree_diagnostics
      .length
  );
  assert.ok(
    diagnostic.source_covariance_positive_n38_degree_sweep_rows.every(
      (row) =>
        Number.isInteger(row.polynomial_degree) &&
        row.polynomial_degree >= 1 &&
        row.polynomial_degree <= 3 &&
        row.positive_target_count ===
          diagnostic
            .source_covariance_positive_producer_centered_numerator_collar_targets
            .length &&
        row.n38_collar_enclosure_route.reference_target_count ===
          row.positive_target_count
    )
  );
  assert.ok(diagnostic.source_covariance_positive_n38_best_degree_row);
  assert.ok(
    diagnostic.source_covariance_positive_n38_degree_sweep_rows.some(
      (row) =>
        row.polynomial_degree ===
        diagnostic.source_covariance_positive_n38_best_degree_row
          .polynomial_degree
    )
  );
  assert.ok(
    [
      "positive-n38-degree-sweep-no-positive-collar-target",
      "positive-n38-degree-sweep-finds-certificate-headroom",
      "positive-n38-degree-sweep-fits-collar-with-limited-headroom",
      "positive-n38-degree-sweep-partial-collar-fit",
      "positive-n38-degree-sweep-open",
    ].includes(
      diagnostic.source_covariance_positive_n38_degree_sweep_diagnosis
    )
  );
  assert.ok(
    diagnostic.source_covariance_positive_n38_taylor_certificate_target
  );
  assert.equal(
    diagnostic.source_covariance_positive_n38_taylor_certificate_target
      .status,
    "positive-n38-taylor-certificate-target-candidate-emitted"
  );
  assert.equal(
    diagnostic.source_covariance_positive_n38_taylor_certificate_target
      .selected_polynomial_degree,
    diagnostic.source_covariance_positive_n38_selected_taylor_degree_row
      .polynomial_degree
  );
  assert.ok(diagnostic.source_covariance_positive_n38_best_degree_row);
  assert.ok(
    diagnostic.source_covariance_positive_n38_selected_taylor_degree_row
  );
  assert.ok(
    [
      "positive-n38-cubic-taylor-target-has-headroom",
      "positive-n38-cubic-taylor-target-open",
      "positive-n38-certificate-needs-noncubic-taylor-analogue",
      "positive-n38-taylor-no-positive-collar-target",
    ].includes(
      diagnostic.source_covariance_positive_n38_taylor_certificate_target
        .target_status
    )
  );
  assert.equal(
    diagnostic.source_covariance_positive_n38_taylor_certificate_target
      .claim_boundary.certifies_h38_n38_graph_enclosure,
    false
  );
  assert.equal(
    diagnostic.source_covariance_positive_n38_taylor_certificate_target
      .claim_boundary.certifies_s37_dependency_preserving_division,
    false
  );
  assert.ok(
    diagnostic.source_covariance_positive_n38_sampled_fourth_difference_check
  );
  assert.equal(
    diagnostic.source_covariance_positive_n38_sampled_fourth_difference_check
      .status,
    "positive-n38-cubic-fourth-difference-check-candidate-emitted"
  );
  assert.ok(
    [
      "positive-n38-sampled-fourth-difference-supports-cubic-target",
      "positive-n38-sampled-fourth-difference-exceeds-cubic-target",
      "positive-n38-fourth-difference-no-sampled-stencils",
      "positive-n38-fourth-difference-no-positive-collar-target",
      "positive-n38-fourth-difference-needs-cubic-target",
      "positive-n38-fourth-difference-missing-required-m4-bound",
    ].includes(
      diagnostic.source_covariance_positive_n38_sampled_fourth_difference_check
        .target_status
    )
  );
  assert.equal(
    diagnostic.source_covariance_positive_n38_sampled_fourth_difference_check
      .claim_boundary.certifies_n38_taylor_remainder_bound,
    false
  );
  assert.equal(
    typeof diagnostic
      .source_covariance_positive_n38_sampled_fourth_difference_check
      .m4_split_interpretation,
    "string"
  );
  assert.ok(
    diagnostic.source_covariance_positive_n38_sampled_fourth_difference_check
      .max_point_expression_nonuniform_to_required_ratio === null ||
      diagnostic.source_covariance_positive_n38_sampled_fourth_difference_check
        .max_point_expression_nonuniform_to_required_ratio >= 0
  );
  assert.ok(
    diagnostic.source_covariance_positive_n38_sampled_fourth_difference_check
      .max_interval_center_drift_nonuniform_to_required_ratio === null ||
      diagnostic.source_covariance_positive_n38_sampled_fourth_difference_check
        .max_interval_center_drift_nonuniform_to_required_ratio >= 0
  );
  assert.ok(
    diagnostic.source_covariance_positive_n38_sampled_fourth_difference_check
      .max_nonuniform_split_replay_relative_gap === null ||
      diagnostic.source_covariance_positive_n38_sampled_fourth_difference_check
        .max_nonuniform_split_replay_relative_gap >= 0
  );
  if (
    diagnostic.source_covariance_positive_n38_sampled_fourth_difference_check
      .sampled_m4_pressure_decomposition_summary !== null
  ) {
    assert.equal(
      diagnostic.source_covariance_positive_n38_sampled_fourth_difference_check
        .sampled_m4_pressure_decomposition_summary.status,
      "positive-n38-sampled-m4-pressure-decomposition-emitted"
    );
    assert.ok(
      diagnostic.source_covariance_positive_n38_sampled_fourth_difference_check
        .sampled_m4_pressure_decomposition_summary
        .max_point_expression_source_term_sum_nonuniform_m4 >= 0
    );
    assert.ok(
      diagnostic.source_covariance_positive_n38_sampled_fourth_difference_check
        .sampled_m4_pressure_decomposition_summary
        .max_interval_center_drift_nonuniform_m4 >= 0
    );
    assert.ok(
      diagnostic.source_covariance_positive_n38_sampled_fourth_difference_check
        .sampled_m4_pressure_decomposition_summary
        .max_split_triangle_to_required_ratio >= 0
    );
    assert.ok(
      diagnostic.source_covariance_positive_n38_sampled_fourth_difference_check
        .sampled_m4_pressure_decomposition_summary
        .min_split_triangle_inflation_factor_before_failure >= 0
    );
  }
  assert.ok(
    diagnostic.source_covariance_positive_n38_sampled_fourth_difference_check
      .sampled_fourth_difference_rows.every(
        (row) =>
          row.point_expression_nonuniform_fourth_derivative_estimate ===
            null ||
          row.point_expression_nonuniform_fourth_derivative_estimate >= 0
      )
  );
  assert.ok(diagnostic.source_covariance_positive_n38_m4_inflation_budget);
  assert.equal(
    diagnostic.source_covariance_positive_n38_m4_inflation_budget.status,
    "positive-n38-cubic-m4-inflation-budget-candidate-emitted"
  );
  assert.deepEqual(diagnostic.m4_inflation_factors, [1, 2, 10, 100, 1000, 2000]);
  assert.deepEqual(
    diagnostic.source_covariance_positive_n38_m4_inflation_budget
      .requested_inflation_factors,
    diagnostic.m4_inflation_factors
  );
  assert.deepEqual(
    diagnostic.source_covariance_positive_n38_m4_inflation_budget
      .sampled_m4_pressure_decomposition_summary,
    diagnostic.source_covariance_positive_n38_sampled_fourth_difference_check
      .sampled_m4_pressure_decomposition_summary
  );
  assert.ok(
    diagnostic.source_covariance_positive_n38_m4_inflation_budget
      .split_triangle_sampled_m4 === null ||
      diagnostic.source_covariance_positive_n38_m4_inflation_budget
        .split_triangle_sampled_m4 >= 0
  );
  assert.ok(
    diagnostic.source_covariance_positive_n38_m4_inflation_budget
      .split_triangle_sampled_m4_to_required_ratio === null ||
      diagnostic.source_covariance_positive_n38_m4_inflation_budget
        .split_triangle_sampled_m4_to_required_ratio >= 0
  );
  assert.ok(
    diagnostic.source_covariance_positive_n38_m4_inflation_budget
      .max_split_triangle_inflation_factor_before_failure === null ||
      diagnostic.source_covariance_positive_n38_m4_inflation_budget
        .max_split_triangle_inflation_factor_before_failure >= 0
  );
  if (
    diagnostic.source_covariance_positive_n38_m4_inflation_budget
      .split_inflation_rows.length > 0
  ) {
    assert.deepEqual(
      diagnostic.source_covariance_positive_n38_m4_inflation_budget
        .split_inflation_rows.map((row) => row.inflation_factor),
      diagnostic.m4_inflation_factors
    );
  }
  assert.ok(
    [
      "positive-n38-m4-inflation-budget-closes-all-requested-factors",
      "positive-n38-m4-inflation-budget-closes-some-requested-factors",
      "positive-n38-m4-inflation-budget-open",
      "positive-n38-m4-inflation-budget-needs-cubic-sampled-support",
      "positive-n38-m4-inflation-budget-missing-finite-inputs",
    ].includes(
      diagnostic.source_covariance_positive_n38_m4_inflation_budget
        .target_status
    )
  );
  assert.equal(
    diagnostic.source_covariance_positive_n38_m4_inflation_budget
      .claim_boundary.certifies_n38_taylor_remainder_bound,
    false
  );
  assert.ok(
    [
      "positive-n38-split-m4-inflation-budget-closes-all-requested-factors",
      "positive-n38-split-m4-inflation-budget-closes-some-requested-factors",
      "positive-n38-split-m4-inflation-budget-open",
      "positive-n38-m4-inflation-budget-needs-cubic-sampled-support",
      "positive-n38-m4-inflation-budget-missing-finite-inputs",
    ].includes(
      diagnostic.source_covariance_positive_n38_m4_inflation_budget
        .split_budget_status
    )
  );
  assert.ok(
    diagnostic.source_covariance_positive_n38_directed_interval_residual_check
  );
  assert.equal(
    diagnostic.source_covariance_positive_n38_directed_interval_residual_check
      .status,
    "positive-n38-directed-interval-residual-check-candidate-emitted"
  );
  assert.ok(
    [
      "positive-n38-directed-interval-residual-fits-collar-target",
      "positive-n38-directed-interval-residual-exposes-dependency-loss",
      "positive-n38-directed-interval-residual-open",
      "positive-n38-directed-interval-residual-no-samples",
      "positive-n38-directed-interval-residual-no-positive-collar-target",
      "positive-n38-directed-interval-residual-missing-polynomial",
    ].includes(
      diagnostic
        .source_covariance_positive_n38_directed_interval_residual_check
        .target_status
    )
  );
  assert.equal(
    diagnostic.source_covariance_positive_n38_directed_interval_residual_check
      .positive_target_count,
    diagnostic.source_covariance_positive_n38_selected_taylor_degree_row
      .positive_target_count
  );
  assert.equal(
    diagnostic.source_covariance_positive_n38_directed_interval_residual_check
      .sample_count,
    diagnostic.source_covariance_positive_n38_selected_taylor_degree_row
      .positive_target_count * diagnostic.comparison_row_count
  );
  assert.ok(
    diagnostic.source_covariance_positive_n38_directed_interval_residual_check
      .directed_interval_residual_rows.length ===
      diagnostic.source_covariance_positive_n38_directed_interval_residual_check
        .sample_count
  );
  assert.equal(
    diagnostic.source_covariance_positive_n38_directed_interval_residual_check
      .claim_boundary.certifies_h38_n38_graph_enclosure,
    false
  );
  assert.equal(
    diagnostic.source_covariance_positive_n38_directed_interval_residual_check
      .claim_boundary.certifies_n38_taylor_remainder_bound,
    false
  );
  assert.ok(
    diagnostic.source_covariance_positive_n38_cubic_taylor_remainder_route
  );
  assert.equal(
    diagnostic.source_covariance_positive_n38_cubic_taylor_remainder_route
      .status,
    "positive-n38-cubic-taylor-remainder-route-candidate-emitted"
  );
  assert.ok(
    [
      "positive-n38-cubic-taylor-remainder-route-needs-cubic-headroom",
      "positive-n38-cubic-taylor-remainder-route-raw-directed-interval-fits",
      "positive-n38-cubic-taylor-remainder-route-has-sampled-lagrange-headroom",
      "positive-n38-cubic-taylor-remainder-route-has-sampled-parent-headroom",
      "positive-n38-cubic-taylor-remainder-route-open",
    ].includes(
      diagnostic.source_covariance_positive_n38_cubic_taylor_remainder_route
        .target_status
    )
  );
  assert.equal(
    diagnostic.source_covariance_positive_n38_cubic_taylor_remainder_route
      .derivative_route_status,
    "continuous-directed-rounded-fourth-derivative-proof-open"
  );
  assert.ok(
    diagnostic.source_covariance_positive_n38_cubic_taylor_remainder_route
      .same_domain_derivative_provider_target
  );
  const derivativeProviderTarget =
    diagnostic.source_covariance_positive_n38_cubic_taylor_remainder_route
      .same_domain_derivative_provider_target;
  assert.ok(
    [
      "positive-n38-same-domain-derivative-provider-target-open",
      "positive-n38-same-domain-derivative-provider-target-unavailable",
    ].includes(derivativeProviderTarget.status)
  );
  assert.equal(
    derivativeProviderTarget.provider_target_kind,
    "directed-rounded-continuous-fourth-derivative-bound"
  );
  assert.equal(
    derivativeProviderTarget.claim_boundary
      .certifies_n38_taylor_remainder_bound,
    false
  );
  assert.equal(
    typeof derivativeProviderTarget.parent_acceptance_inequality,
    "string"
  );
  assert.equal(
    typeof derivativeProviderTarget.split_acceptance_inequality,
    "string"
  );
  assert.equal(
    typeof derivativeProviderTarget.provider_acceptance_test,
    "string"
  );
  if (
    derivativeProviderTarget.status ===
    "positive-n38-same-domain-derivative-provider-target-open"
  ) {
    assert.equal(derivativeProviderTarget.selected_polynomial_degree, 3);
    assert.ok(
      derivativeProviderTarget.parent_required_fourth_derivative_upper > 0
    );
    assert.ok(
      derivativeProviderTarget.lagrange_required_fourth_derivative_upper > 0
    );
    assert.ok(
      derivativeProviderTarget.equal_stream_point_expression_m4_ceiling > 0
    );
    assert.ok(
      derivativeProviderTarget
        .equal_stream_interval_center_drift_m4_ceiling > 0
    );
    assert.ok(
      derivativeProviderTarget.raw_interval_rejection_ratio === null ||
        derivativeProviderTarget.raw_interval_rejection_ratio >= 0
    );
    assert.ok(
      derivativeProviderTarget.same_domain_stream_derivative_witness
    );
    assert.ok(
      [
        "positive-n38-same-domain-stream-derivative-witness-inside-provider-target",
        "positive-n38-same-domain-stream-derivative-witness-open",
        "positive-n38-same-domain-stream-derivative-witness-unavailable",
      ].includes(
        derivativeProviderTarget.same_domain_stream_derivative_witness.status
      )
    );
    assert.equal(
      derivativeProviderTarget.same_domain_stream_derivative_witness
        .claim_boundary.certifies_n38_taylor_remainder_bound,
      false
    );
    assert.ok(
      derivativeProviderTarget.same_domain_stream_derivative_witness
        .point_expression_guarded_to_ceiling_ratio === null ||
        derivativeProviderTarget.same_domain_stream_derivative_witness
          .point_expression_guarded_to_ceiling_ratio >= 0
    );
    assert.ok(
      derivativeProviderTarget.same_domain_stream_derivative_witness
        .interval_center_drift_guarded_to_ceiling_ratio === null ||
        derivativeProviderTarget.same_domain_stream_derivative_witness
          .interval_center_drift_guarded_to_ceiling_ratio >= 0
    );
    assert.ok(derivativeProviderTarget.removable_quotient_route);
    assert.equal(
      derivativeProviderTarget.removable_quotient_route.status,
      "positive-n38-removable-quotient-route-candidate-emitted"
    );
    assert.ok(
      [
        "positive-n38-removable-quotient-route-needs-node-factorization",
        "positive-n38-removable-quotient-route-all-sample-products-separated",
        "positive-n38-removable-quotient-route-needs-omitted-cell-witness",
      ].includes(
        derivativeProviderTarget.removable_quotient_route.target_status
      )
    );
    assert.equal(
      derivativeProviderTarget.removable_quotient_route.claim_boundary
        .certifies_n38_taylor_remainder_bound,
      false
    );
    assert.ok(
      derivativeProviderTarget.removable_quotient_route
        .product_separated_sample_count >= 0
    );
    assert.ok(
      derivativeProviderTarget.removable_quotient_route
        .product_crossing_sample_count >= 0
    );
    assert.ok(
      derivativeProviderTarget.removable_quotient_route.sample_product_rows.every(
        (row) =>
          [
            "requires-removable-node-factorization",
            "product-separated-direct-quotient-allowed",
          ].includes(row.quotient_interval_policy)
      )
    );
    assert.ok(
      derivativeProviderTarget.quartic_quotient_consistency_witness
    );
    const quarticQuotientWitness =
      derivativeProviderTarget.quartic_quotient_consistency_witness;
    const directResidualDerivativeModel =
      quarticQuotientWitness.same_variable_direct_residual_derivative_model;
    assert.ok(directResidualDerivativeModel);
    assert.equal(
      directResidualDerivativeModel.model_kind,
      "five-sample-quartic-minus-four-node-cubic-residual-derivative"
    );
    assert.equal(
      directResidualDerivativeModel.selected_node_xi_midpoints.length,
      4
    );
    assert.equal(directResidualDerivativeModel.product_coefficients.length, 5);
    assert.equal(
      directResidualDerivativeModel.product_derivative_coefficients.length,
      4
    );
    assert.equal(
      directResidualDerivativeModel.direct_lagrange_graph_coefficients.length,
      4
    );
    assert.equal(
      directResidualDerivativeModel.point_expression_residual_coefficients
        .length,
      5
    );
    assert.equal(
      directResidualDerivativeModel
        .interval_center_drift_residual_coefficients.length,
      5
    );
    assert.equal(
      directResidualDerivativeModel.direct_residual_coefficients.length,
      5
    );
    assert.equal(
      directResidualDerivativeModel
        .point_expression_residual_derivative_coefficients.length,
      4
    );
    assert.equal(
      directResidualDerivativeModel
        .interval_center_drift_residual_derivative_coefficients.length,
      4
    );
    assert.equal(
      directResidualDerivativeModel.direct_residual_derivative_coefficients
        .length,
      4
    );
    assert.ok(
      directResidualDerivativeModel.split_stream_m4_ceiling > 0
    );
    assert.equal(
      directResidualDerivativeModel.direct_stream_policy,
      "diagnostic-only"
    );
    const signedSourceCollarProbe =
      derivativeProviderTarget
        .same_domain_signed_source_collar_provider_probe;
    assert.ok(signedSourceCollarProbe);
    assert.ok(
      [
        "positive-n38-same-domain-signed-source-collar-provider-probe-inside-headroom",
        "positive-n38-same-domain-signed-source-collar-provider-probe-open",
        "positive-n38-same-domain-signed-source-collar-provider-probe-unavailable",
      ].includes(signedSourceCollarProbe.status)
    );
    assert.equal(
      signedSourceCollarProbe.provider_probe_kind,
      "same-domain-signed-source-collar-residual-derivative-provider-probe"
    );
    assert.equal(
      signedSourceCollarProbe.claim_boundary
        .certifies_n38_taylor_remainder_bound,
      false
    );
    assert.equal(
      signedSourceCollarProbe.claim_boundary
        .certifies_positive_source_covariance_collar,
      false
    );
    assert.equal(
      signedSourceCollarProbe.claim_boundary
        .certifies_directed_rounded_shared_domain,
      false
    );
    assert.equal(
      signedSourceCollarProbe.claim_boundary.retained_branch,
      false
    );
    assert.ok(
      signedSourceCollarProbe.max_signed_point_drift_replay_relative_gap ===
        null ||
        signedSourceCollarProbe
          .max_signed_point_drift_replay_relative_gap >= 0
    );
    assert.ok(
      signedSourceCollarProbe.min_signed_point_drift_cancellation_fraction ===
        null ||
        (signedSourceCollarProbe
          .min_signed_point_drift_cancellation_fraction >= 0 &&
          signedSourceCollarProbe
            .min_signed_point_drift_cancellation_fraction <= 1)
    );
    assert.ok(
      signedSourceCollarProbe
        .max_signed_point_drift_residual_derivative_to_target_ratio ===
        null ||
        signedSourceCollarProbe
          .max_signed_point_drift_residual_derivative_to_target_ratio >= 0
    );
    assert.ok(
      signedSourceCollarProbe
        .min_signed_point_drift_true_stream_slack_ratio === null ||
        signedSourceCollarProbe
          .min_signed_point_drift_true_stream_slack_ratio >= 0
    );
    if (
      signedSourceCollarProbe.status ===
      "positive-n38-same-domain-signed-source-collar-provider-probe-inside-headroom"
    ) {
      assert.equal(
        signedSourceCollarProbe.collar_rows.length,
        signedSourceCollarProbe.selected_sample_indexes.length
      );
      assert.ok(
        signedSourceCollarProbe
          .max_signed_point_drift_residual_derivative_to_target_ratio < 1
      );
      assert.ok(
        signedSourceCollarProbe
          .min_signed_point_drift_cancellation_fraction > 0.5
      );
      assert.ok(
        signedSourceCollarProbe
          .min_signed_point_drift_true_stream_slack_ratio > 0.99
      );
      assert.ok(
        signedSourceCollarProbe.max_signed_point_drift_replay_relative_gap >
          0.7
      );
      assert.ok(
        signedSourceCollarProbe
          .max_paired_subcell_signed_point_drift_residual_derivative_to_target_ratio <
          signedSourceCollarProbe
            .max_signed_point_drift_residual_derivative_to_target_ratio
      );
      assert.ok(
        signedSourceCollarProbe
          .min_paired_subcell_signed_point_drift_cancellation_fraction >
          signedSourceCollarProbe
            .min_signed_point_drift_cancellation_fraction
      );
      assert.ok(
        signedSourceCollarProbe
          .max_paired_subcell_signed_point_drift_replay_relative_gap <
          signedSourceCollarProbe
            .max_signed_point_drift_replay_relative_gap
      );
      assert.ok(
        signedSourceCollarProbe
          .max_paired_subcell_signed_point_drift_to_direct_abs_loss_factor <
          signedSourceCollarProbe
            .max_signed_point_drift_to_direct_abs_loss_factor
      );
      assert.equal(
        signedSourceCollarProbe
          .paired_subcell_direct_collapse_locality_status,
        "positive-n38-paired-subcell-direct-collapse-local-interval-dependency-artifact-candidate"
      );
      assert.equal(
        signedSourceCollarProbe
          .direct_split_residual_derivative_coefficient_replay_status,
        "positive-n38-direct-split-residual-derivative-coefficient-replay-consistent"
      );
      assert.ok(
        signedSourceCollarProbe
          .direct_split_residual_derivative_coefficient_replay_relative_gap >
          0
      );
      assert.ok(
        signedSourceCollarProbe
          .max_paired_subcell_signed_point_drift_subcell_replay_relative_gap >
          signedSourceCollarProbe
            .max_paired_subcell_signed_point_drift_replay_relative_gap
      );
      assert.ok(
        signedSourceCollarProbe
          .max_paired_subcell_signed_point_drift_subcell_to_collar_gap_ratio >
          1
      );
      assert.equal(
        signedSourceCollarProbe
          .same_variable_direct_normal_form_candidate_status,
        "positive-n38-same-variable-direct-normal-form-candidate-inside-headroom"
      );
      assert.ok(
        signedSourceCollarProbe
          .max_same_variable_direct_normal_form_to_target_ratio <
          signedSourceCollarProbe
            .max_paired_subcell_signed_point_drift_residual_derivative_to_target_ratio
      );
      assert.equal(
        signedSourceCollarProbe
          .same_variable_direct_true_stream_excess_target_status,
        "positive-n38-same-variable-direct-normal-form-true-stream-excess-target-positive"
      );
      assert.ok(
        signedSourceCollarProbe
          .min_same_variable_direct_true_stream_slack_ratio > 0.999999
      );
      assert.ok(
        signedSourceCollarProbe
          .min_same_variable_direct_true_stream_excess_to_directed_ratio >
          1e6
      );
      assert.ok(
        signedSourceCollarProbe.collar_rows.every(
          (row) =>
            row.provider_probe_status ===
              "positive-n38-signed-source-collar-provider-row-inside-headroom" &&
            Array.isArray(row.signed_point_drift_residual_derivative_interval) &&
            row.signed_pair_combination_mode ===
              "point-hull-plus-drift-hull" &&
            row.same_variable_direct_normal_form_candidate_status ===
              "positive-n38-same-variable-direct-normal-form-candidate-inside-headroom" &&
            row.direct_true_stream_excess_target_status ===
              "positive-n38-same-variable-direct-normal-form-true-stream-excess-target-positive" &&
            row.direct_true_stream_residual_derivative_slack_to_target_ratio >
              0.999999 &&
            row.direct_true_stream_excess_to_directed_finite_polynomial_ratio >
              1e6 &&
            row.direct_residual_derivative_to_target_ratio <=
              row.paired_subcell_signed_point_drift_residual_derivative_to_target_ratio &&
            row.signed_point_drift_residual_derivative_to_target_ratio <
              1 &&
            row.signed_point_drift_cancellation_fraction > 0 &&
            row.signed_point_drift_true_stream_slack_ratio > 0 &&
            row.paired_subcell_signed_pair_combination_mode ===
              "same-subcell-point-plus-drift-then-hull" &&
            Array.isArray(
              row.paired_subcell_signed_point_drift_residual_derivative_interval
            ) &&
            row.paired_subcell_signed_point_drift_residual_derivative_to_target_ratio <=
              row.signed_point_drift_residual_derivative_to_target_ratio &&
            row.paired_subcell_signed_point_drift_cancellation_fraction >=
              row.signed_point_drift_cancellation_fraction &&
            row.paired_subcell_signed_point_drift_to_direct_replay_relative_gap <=
              row.signed_point_drift_to_direct_replay_relative_gap &&
            row.paired_subcell_signed_point_drift_to_direct_abs_loss_factor <=
              row.signed_point_drift_to_direct_abs_loss_factor &&
            Array.isArray(row.paired_subcell_signed_point_drift_subcell_rows) &&
            row.paired_subcell_signed_point_drift_subcell_rows.length ===
              16 &&
            row.paired_subcell_signed_point_drift_direct_inside_paired_interval_all ===
              true &&
            row.paired_subcell_signed_point_drift_paired_inside_direct_interval_all ===
              false &&
            row.paired_subcell_signed_point_drift_gap_localization_status ===
              "positive-n38-paired-subcell-direct-collapse-local-interval-dependency-artifact-candidate" &&
            row.paired_subcell_signed_point_drift_subcell_rows.every(
              (subcellRow) =>
                subcellRow.cell_id === row.cell_id &&
                subcellRow.sample_index === row.sample_index &&
                Array.isArray(subcellRow.paired_interval) &&
                Array.isArray(subcellRow.direct_interval) &&
                subcellRow.direct_inside_paired_interval === true
            ) &&
            row.direct_stream_policy === "diagnostic-only" &&
            row.continuous_stream_derivative_policy ===
              "candidate-only until directed-rounded residual-derivative enclosures cover this collar"
        )
      );
    }
    assert.ok(
      [
        "positive-n38-quartic-quotient-consistency-witness-inside-provider-target",
        "positive-n38-quartic-quotient-consistency-witness-open",
        "positive-n38-quartic-quotient-consistency-witness-unavailable",
      ].includes(quarticQuotientWitness.status)
    );
    assert.equal(
      quarticQuotientWitness.claim_boundary
        .certifies_n38_taylor_remainder_bound,
      false
    );
    assert.equal(
      quarticQuotientWitness.finite_data_scope,
      "five-sample-quartic-normal-form-only"
    );
    if (
      quarticQuotientWitness.status ===
      "positive-n38-quartic-quotient-consistency-witness-inside-provider-target"
    ) {
      assert.equal(
        quarticQuotientWitness.quotient_consistency_status,
        "positive-n38-quartic-quotient-consistent"
      );
      assert.equal(quarticQuotientWitness.stream_rows.length, 3);
      assert.equal(
        quarticQuotientWitness.node_limit_proxy_status,
        "positive-n38-quartic-node-limit-proxy-inside-provider-target"
      );
      assert.equal(
        quarticQuotientWitness.node_limit_proxy_rows.length,
        quarticQuotientWitness.selected_sample_indexes.length
      );
      assert.ok(
        quarticQuotientWitness.node_limit_proxy_rows.every(
          (row) =>
            row.finite_data_limit_kind ===
              "quartic-removable-node-limit-proxy" &&
            row.direct_stream_policy === "diagnostic-only" &&
            row.split_stream_proxy_status ===
              "positive-n38-quartic-node-limit-proxy-inside-provider-target"
        )
      );
      assert.ok(
        quarticQuotientWitness.node_limit_proxy_rows.every(
          (row) =>
            row.point_expression_limit_proxy_m4 ===
              quarticQuotientWitness.point_expression_signed_m4 &&
            row.interval_center_drift_limit_proxy_m4 ===
              quarticQuotientWitness.interval_center_drift_signed_m4 &&
            row.direct_limit_proxy_m4 ===
              quarticQuotientWitness.direct_signed_m4
        )
      );
      assert.equal(
        quarticQuotientWitness.node_derivative_limit_status,
        "positive-n38-quartic-node-derivative-limit-inside-provider-target"
      );
      assert.equal(
        quarticQuotientWitness.node_derivative_limit_rows.length,
        quarticQuotientWitness.selected_sample_indexes.length
      );
      assert.ok(
        quarticQuotientWitness
          .max_node_derivative_limit_split_stream_relative_gap <=
          quarticQuotientWitness.consistency_tolerance
      );
      assert.ok(
        quarticQuotientWitness
          .max_node_derivative_limit_direct_relative_gap <=
          quarticQuotientWitness.consistency_tolerance
      );
      assert.ok(
        quarticQuotientWitness.node_derivative_limit_rows.every(
          (row) =>
            row.finite_data_limit_kind ===
              "quartic-removable-node-derivative-limit-replay" &&
            Number.isFinite(row.lagrange_product_derivative_at_node) &&
            row.lagrange_product_derivative_at_node !== 0 &&
            row.direct_stream_policy === "diagnostic-only" &&
            row.split_stream_derivative_limit_status ===
              "positive-n38-quartic-node-derivative-limit-inside-provider-target" &&
            Math.abs(
              row.point_expression_derivative_limit_m4 -
                quarticQuotientWitness.point_expression_signed_m4
            ) /
              Math.max(
                1,
                Math.abs(row.point_expression_derivative_limit_m4),
                Math.abs(quarticQuotientWitness.point_expression_signed_m4)
              ) <=
              quarticQuotientWitness.consistency_tolerance &&
            Math.abs(
              row.interval_center_drift_derivative_limit_m4 -
                quarticQuotientWitness.interval_center_drift_signed_m4
            ) /
              Math.max(
                1,
                Math.abs(row.interval_center_drift_derivative_limit_m4),
                Math.abs(
                  quarticQuotientWitness.interval_center_drift_signed_m4
                )
              ) <=
              quarticQuotientWitness.consistency_tolerance &&
            Math.abs(
              row.direct_derivative_limit_m4 -
                quarticQuotientWitness.direct_signed_m4
            ) /
              Math.max(
                1,
                Math.abs(row.direct_derivative_limit_m4),
                Math.abs(quarticQuotientWitness.direct_signed_m4)
              ) <=
              quarticQuotientWitness.consistency_tolerance &&
            row.point_expression_derivative_limit_relative_gap <=
              quarticQuotientWitness.consistency_tolerance &&
            row.interval_center_drift_derivative_limit_relative_gap <=
              quarticQuotientWitness.consistency_tolerance
        )
      );
      assert.equal(
        quarticQuotientWitness.node_derivative_collar_target_status,
        "positive-n38-quartic-node-derivative-collar-target-inside-sampled-headroom"
      );
      assert.equal(
        quarticQuotientWitness.node_derivative_collar_rows.length,
        quarticQuotientWitness.selected_sample_indexes.length
      );
      assert.ok(
        quarticQuotientWitness
          .min_node_derivative_collar_product_derivative_abs_lower > 0
      );
      assert.ok(
        quarticQuotientWitness
          .max_node_derivative_collar_split_stream_sampled_ratio < 1
      );
      assert.equal(
        quarticQuotientWitness
          .node_derivative_collar_finite_polynomial_status,
        "positive-n38-quartic-node-derivative-collar-finite-polynomial-inside-headroom"
      );
      assert.ok(
        quarticQuotientWitness
          .max_node_derivative_collar_finite_polynomial_split_stream_ratio <
          1
      );
      assert.ok(
        quarticQuotientWitness
          .max_node_derivative_collar_finite_polynomial_to_sampled_split_ratio >=
          1
      );
      assert.equal(
        quarticQuotientWitness
          .node_derivative_collar_directed_finite_polynomial_status,
        "positive-n38-quartic-node-derivative-collar-directed-finite-polynomial-inside-headroom"
      );
      assert.ok(
        quarticQuotientWitness
          .max_node_derivative_collar_directed_finite_polynomial_split_stream_ratio <
          1
      );
      assert.ok(
        quarticQuotientWitness
          .max_node_derivative_collar_directed_to_exact_finite_polynomial_split_ratio >=
          1
      );
      assert.equal(
        quarticQuotientWitness
          .node_derivative_collar_true_stream_slack_budget_status,
        "positive-n38-quartic-node-derivative-collar-true-stream-slack-positive"
      );
      assert.ok(
        quarticQuotientWitness
          .min_node_derivative_collar_true_stream_slack_ratio > 0.99
      );
      assert.equal(
        quarticQuotientWitness
          .node_derivative_collar_true_stream_excess_target_status,
        "positive-n38-quartic-node-derivative-collar-true-stream-excess-target-positive"
      );
      assert.ok(
        quarticQuotientWitness
          .min_node_derivative_collar_true_stream_excess_to_directed_ratio >
          400
      );
      assert.equal(
        quarticQuotientWitness
          .node_derivative_collar_component_covariance_status,
        "positive-n38-quartic-node-derivative-collar-component-covariance-open"
      );
      assert.ok(
        quarticQuotientWitness
          .min_node_derivative_collar_component_cancellation_fraction > 0
      );
      assert.ok(
        quarticQuotientWitness
          .max_node_derivative_collar_component_replay_relative_gap > 0.4
      );
      assert.equal(
        quarticQuotientWitness
          .node_derivative_collar_raw_value_width_proxy_status,
        "positive-n38-quartic-node-derivative-collar-raw-value-width-proxy-rejected"
      );
      assert.ok(
        quarticQuotientWitness
          .max_node_derivative_collar_raw_value_proxy_to_excess_budget_ratio >
          1e9
      );
      assert.equal(
        quarticQuotientWitness
          .node_derivative_collar_signed_pair_provider_status,
        "positive-n38-quartic-node-derivative-collar-signed-pair-provider-inside-headroom"
      );
      assert.ok(
        quarticQuotientWitness
          .max_node_derivative_collar_signed_pair_to_target_ratio < 1e-5
      );
      assert.ok(
        quarticQuotientWitness
          .min_node_derivative_collar_signed_pair_cancellation_fraction >
          0.5
      );
      assert.ok(
        quarticQuotientWitness
          .max_node_derivative_collar_signed_pair_replay_relative_gap > 0.7
      );
      assert.ok(
        quarticQuotientWitness
          .min_node_derivative_collar_signed_pair_slack_ratio > 0.99
      );
      assert.equal(
        quarticQuotientWitness
          .node_derivative_collar_paired_subcell_signed_pair_provider_status,
        "positive-n38-quartic-node-derivative-collar-paired-subcell-signed-pair-provider-inside-headroom"
      );
      assert.ok(
        quarticQuotientWitness
          .max_node_derivative_collar_paired_subcell_signed_pair_to_target_ratio <
          quarticQuotientWitness
            .max_node_derivative_collar_signed_pair_to_target_ratio
      );
      assert.ok(
        quarticQuotientWitness
          .max_node_derivative_collar_paired_subcell_signed_pair_to_target_ratio <
          2e-6
      );
      assert.ok(
        quarticQuotientWitness
          .min_node_derivative_collar_paired_subcell_signed_pair_cancellation_fraction >
          quarticQuotientWitness
            .min_node_derivative_collar_signed_pair_cancellation_fraction
      );
      assert.ok(
        quarticQuotientWitness
          .min_node_derivative_collar_paired_subcell_signed_pair_cancellation_fraction >
          0.9
      );
      assert.ok(
        quarticQuotientWitness
          .max_node_derivative_collar_paired_subcell_signed_pair_replay_relative_gap <
          quarticQuotientWitness
            .max_node_derivative_collar_signed_pair_replay_relative_gap
      );
      assert.ok(
        quarticQuotientWitness
          .max_node_derivative_collar_paired_subcell_signed_pair_replay_relative_gap <
          0.5
      );
      assert.ok(
        quarticQuotientWitness
          .min_node_derivative_collar_paired_subcell_signed_pair_slack_ratio >
          0.999
      );
      assert.ok(
        quarticQuotientWitness
          .max_node_derivative_collar_paired_subcell_signed_pair_to_direct_abs_loss_factor <
          2
      );
      assert.equal(
        quarticQuotientWitness
          .node_derivative_collar_paired_subcell_direct_collapse_locality_status,
        "positive-n38-paired-subcell-direct-collapse-local-interval-dependency-artifact-candidate"
      );
      assert.equal(
        quarticQuotientWitness
          .direct_split_residual_derivative_coefficient_replay_status,
        "positive-n38-direct-split-residual-derivative-coefficient-replay-consistent"
      );
      assert.ok(
        quarticQuotientWitness
          .direct_split_residual_derivative_coefficient_replay_max_abs_gap <=
          1
      );
      assert.ok(
        quarticQuotientWitness
          .direct_split_residual_derivative_coefficient_replay_relative_gap >
          0
      );
      assert.ok(
        quarticQuotientWitness
          .max_node_derivative_collar_paired_subcell_subcell_replay_relative_gap >
          quarticQuotientWitness
            .max_node_derivative_collar_paired_subcell_signed_pair_replay_relative_gap
      );
      assert.ok(
        quarticQuotientWitness
          .max_node_derivative_collar_paired_subcell_subcell_to_collar_gap_ratio >
          1
      );
      assert.ok(
        quarticQuotientWitness
          .max_node_derivative_collar_paired_subcell_subcell_abs_loss_factor >
          quarticQuotientWitness
            .max_node_derivative_collar_paired_subcell_signed_pair_to_direct_abs_loss_factor
      );
      assert.equal(
        quarticQuotientWitness
          .node_derivative_collar_same_variable_direct_normal_form_candidate_status,
        "positive-n38-same-variable-direct-normal-form-candidate-inside-headroom"
      );
      assert.ok(
        quarticQuotientWitness
          .max_node_derivative_collar_same_variable_direct_normal_form_to_target_ratio <
          quarticQuotientWitness
            .max_node_derivative_collar_paired_subcell_signed_pair_to_target_ratio
      );
      assert.equal(
        quarticQuotientWitness
          .node_derivative_collar_same_variable_direct_true_stream_excess_target_status,
        "positive-n38-same-variable-direct-normal-form-true-stream-excess-target-positive"
      );
      assert.ok(
        quarticQuotientWitness
          .min_node_derivative_collar_same_variable_direct_true_stream_slack_ratio >
          0.999999
      );
      assert.ok(
        quarticQuotientWitness
          .min_node_derivative_collar_same_variable_direct_true_stream_excess_to_directed_ratio >
          1e6
      );
      assert.ok(
        quarticQuotientWitness.node_derivative_collar_rows.every(
          (row) =>
            row.finite_data_limit_kind ===
              "quartic-removable-node-derivative-collar-target" &&
            row.removable_quotient_collar_method ===
              "cauchy-mean-value-theorem" &&
            row.denominator_guard_status ===
              "node-collar-lagrange-product-derivative-separated-from-zero" &&
            row.pprime_zero_exclusion_status ===
              "pprime-zero-excluded-on-node-collar" &&
            row.lagrange_product_derivative_abs_lower > 0 &&
            row.point_expression_sampled_residual_derivative_to_target_ratio <
              1 &&
            row.interval_center_drift_sampled_residual_derivative_to_target_ratio <
              1 &&
            row.split_stream_sampled_residual_derivative_to_target_ratio <
              1 &&
            row.finite_polynomial_residual_derivative_scope ===
              "five-sample-quartic-minus-four-node-cubic-only" &&
            row.point_expression_finite_polynomial_residual_derivative_to_target_ratio <
              1 &&
            row.interval_center_drift_finite_polynomial_residual_derivative_to_target_ratio <
              1 &&
            row.split_stream_finite_polynomial_residual_derivative_to_target_ratio <
              1 &&
            row.finite_polynomial_to_sampled_split_stream_ratio >= 1 &&
            row.directed_finite_polynomial_residual_derivative_scope ===
              "subpartitioned-outward-interval-evaluation-of-five-sample-quartic-minus-four-node-cubic" &&
            row.directed_finite_polynomial_subcell_count === 16 &&
            row.split_stream_directed_finite_polynomial_residual_derivative_to_target_ratio <
              1 &&
            row.directed_to_exact_finite_polynomial_split_stream_ratio >= 1 &&
            Array.isArray(
              row
                .source_component_directed_finite_polynomial_residual_derivative_rows
            ) &&
            row
              .source_component_directed_finite_polynomial_residual_derivative_rows
              .length === 4 &&
            row.point_expression_component_directed_cancellation_fraction >
              0 &&
            row.point_expression_component_directed_replay_relative_gap >
              0 &&
            row.point_expression_true_stream_residual_derivative_slack_to_target_ratio >
              0.99 &&
            row.interval_center_drift_true_stream_residual_derivative_slack_to_target_ratio >
              0.99 &&
            row.split_stream_true_stream_residual_derivative_slack_to_target_ratio >
              0.99 &&
            row.true_stream_slack_budget_status ===
              "positive-n38-quartic-node-derivative-collar-true-stream-slack-positive" &&
            row.point_expression_true_stream_excess_to_directed_finite_polynomial_ratio >
              400 &&
            row.interval_center_drift_true_stream_excess_to_directed_finite_polynomial_ratio >
              400 &&
            row.split_stream_true_stream_excess_to_directed_finite_polynomial_ratio >
              400 &&
            row.raw_value_width_proxy_policy ===
              "rejection-only; value-width-over-collar-width is not a derivative certificate" &&
            row.raw_value_width_proxy_status ===
              "positive-n38-raw-value-width-proxy-rejected-above-excess-budget" &&
            row.max_raw_value_width_proxy_to_true_stream_excess_budget_ratio >
              1e9 &&
            row.signed_pair_combination_mode ===
              "point-hull-plus-drift-hull" &&
            row.signed_pair_directed_finite_polynomial_collar_target_status ===
              "positive-n38-signed-pair-directed-finite-polynomial-inside-headroom" &&
            row.signed_pair_directed_finite_polynomial_residual_derivative_to_target_ratio <
              1e-5 &&
            row.signed_pair_directed_cancellation_fraction > 0.5 &&
            row.signed_pair_directed_replay_relative_gap > 0.7 &&
            row.signed_pair_true_stream_residual_derivative_slack_to_target_ratio >
              0.99 &&
            row.paired_subcell_signed_pair_combination_mode ===
              "same-subcell-point-plus-drift-then-hull" &&
            row.paired_subcell_signed_pair_directed_finite_polynomial_collar_target_status ===
              "positive-n38-paired-subcell-signed-pair-directed-finite-polynomial-inside-headroom" &&
            row.paired_subcell_signed_pair_directed_finite_polynomial_residual_derivative_to_target_ratio <=
              row
                .signed_pair_directed_finite_polynomial_residual_derivative_to_target_ratio &&
            row.paired_subcell_signed_pair_directed_cancellation_fraction >=
              row.signed_pair_directed_cancellation_fraction &&
            row.paired_subcell_signed_pair_directed_replay_relative_gap <=
              row.signed_pair_directed_replay_relative_gap &&
            row.paired_subcell_signed_pair_directed_to_direct_abs_loss_factor <=
              row.signed_pair_directed_to_direct_abs_loss_factor &&
            row.paired_subcell_signed_pair_true_stream_residual_derivative_slack_to_target_ratio >
              0.999 &&
            Array.isArray(
              row
                .paired_subcell_signed_pair_directed_finite_polynomial_subcell_rows
            ) &&
            row
              .paired_subcell_signed_pair_directed_finite_polynomial_subcell_rows
              .length === row.directed_finite_polynomial_subcell_count &&
            row.paired_subcell_signed_pair_direct_inside_paired_interval_all ===
              true &&
            row.paired_subcell_signed_pair_paired_inside_direct_interval_all ===
              false &&
            row.paired_subcell_signed_pair_gap_localization_status ===
              "positive-n38-paired-subcell-direct-collapse-local-interval-dependency-artifact-candidate" &&
            row.paired_subcell_signed_pair_worst_replay_gap_subcell
              .direct_inside_paired_interval === true &&
            row.paired_subcell_signed_pair_worst_abs_loss_subcell
              .direct_inside_paired_interval === true &&
            row.true_stream_excess_target_status ===
              "positive-n38-quartic-node-derivative-collar-true-stream-excess-target-positive" &&
            row.split_stream_collar_target_status ===
              "positive-n38-quartic-node-derivative-collar-target-inside-sampled-headroom" &&
            row.finite_polynomial_collar_target_status ===
              "positive-n38-quartic-node-derivative-collar-finite-polynomial-inside-headroom" &&
            row.directed_finite_polynomial_collar_target_status ===
              "positive-n38-quartic-node-derivative-collar-directed-finite-polynomial-inside-headroom" &&
            row.same_variable_direct_normal_form_candidate_status ===
              "positive-n38-same-variable-direct-normal-form-candidate-inside-headroom" &&
            row.same_variable_direct_true_stream_excess_target_status ===
              "positive-n38-same-variable-direct-normal-form-true-stream-excess-target-positive" &&
            row.same_variable_direct_true_stream_residual_derivative_slack_to_target_ratio >
              0.999999 &&
            row.same_variable_direct_true_stream_excess_to_directed_finite_polynomial_ratio >
              1e6 &&
            row.direct_directed_finite_polynomial_residual_derivative_to_target_ratio <=
              row
                .paired_subcell_signed_pair_directed_finite_polynomial_residual_derivative_to_target_ratio &&
            row.continuous_stream_derivative_policy ===
              "candidate-only until directed-rounded residual-derivative enclosures cover this collar" &&
            row.direct_stream_policy === "diagnostic-only"
        )
      );
      assert.ok(
        quarticQuotientWitness.max_quotient_consistency_relative_gap <=
          quarticQuotientWitness.consistency_tolerance
      );
      assert.ok(
        quarticQuotientWitness.split_to_direct_signed_m4_relative_gap <=
          quarticQuotientWitness.consistency_tolerance
      );
      assert.ok(
        quarticQuotientWitness.point_expression_abs_m4_to_ceiling_ratio <= 1
      );
      assert.ok(
        quarticQuotientWitness
          .interval_center_drift_abs_m4_to_ceiling_ratio <= 1
      );
      assert.ok(
        quarticQuotientWitness.split_triangle_abs_m4_to_ceiling_ratio <= 1
      );
    }
    const producerImageReplay =
      derivativeProviderTarget
        .candidate_producer_image_direct_true_stream_excess_diagnostic;
    assert.ok(producerImageReplay);
    assert.deepEqual(
      collectExactKeys(producerImageReplay, FORBIDDEN_FIXED_SPEED_KEYS),
      []
    );
    assert.equal(
      producerImageReplay.status,
      "positive-n38-shared-xi-producer-image-direct-normal-form-diagnostic-open"
    );
    assert.equal(
      producerImageReplay.diagnostic_kind,
      "candidate-shared-xi-producer-image-direct-normal-form-replay"
    );
    assert.equal(producerImageReplay.producer_sample_count, 5);
    assert.equal(producerImageReplay.matched_producer_sample_count, 4);
    assert.equal(
      producerImageReplay.producer_xi_inside_matched_collar_count,
      0
    );
    assert.equal(
      producerImageReplay.all_producer_xi_samples_inside_node_collars,
      false
    );
    assert.equal(
      producerImageReplay.all_matched_direct_normal_form_rows_inside_headroom,
      true
    );
    assert.ok(producerImageReplay.max_direct_normal_form_to_target_ratio < 1e-6);
    assert.ok(producerImageReplay.min_direct_true_stream_slack_ratio > 0.999999);
    assert.ok(
      producerImageReplay.min_direct_true_stream_excess_to_directed_ratio >
        1e6
    );
    assert.equal(
      producerImageReplay.claim_boundary.certifies_n38_taylor_remainder_bound,
      false
    );
    assert.equal(
      producerImageReplay.claim_boundary
        .certifies_directed_rounded_shared_domain,
      false
    );
    assert.equal(producerImageReplay.claim_boundary.retained_branch, false);
    assert.equal(producerImageReplay.rows.length, 5);
    assert.equal(
      producerImageReplay.rows.filter(
        (row) =>
          row.row_status ===
          "positive-n38-shared-xi-producer-image-direct-normal-form-row-unmatched"
      ).length,
      1
    );
    assert.equal(
      producerImageReplay.rows.filter(
        (row) =>
          row.row_status ===
          "positive-n38-shared-xi-producer-image-direct-normal-form-row-xi-outside-collar"
      ).length,
      4
    );
    assert.ok(
      producerImageReplay.rows
        .filter((row) => row.matched_node_cell_id !== null)
        .every(
          (row) =>
            row.producer_midpoint_inside_matched_collar === true &&
            row.producer_xi_inside_matched_collar === false &&
            row.direct_normal_form_to_target_ratio < 1e-6 &&
            row.direct_true_stream_slack_ratio > 0.999999 &&
            row.direct_true_stream_excess_to_directed_ratio > 1e6 &&
            row.true_stream_excess_target_status ===
              "positive-n38-same-variable-direct-normal-form-true-stream-excess-target-positive" &&
            row.same_variable_direct_normal_form_candidate_status ===
              "positive-n38-same-variable-direct-normal-form-candidate-inside-headroom" &&
            row.direct_stream_policy === "diagnostic-only" &&
            row.continuous_stream_derivative_policy ===
              "candidate-only until directed-rounded residual-derivative enclosures cover this collar"
        )
    );
    const producerIntervalReplay =
      derivativeProviderTarget
        .candidate_producer_interval_direct_normal_form_replay;
    assert.ok(producerIntervalReplay);
    assert.deepEqual(
      collectExactKeys(producerIntervalReplay, FORBIDDEN_FIXED_SPEED_KEYS),
      []
    );
    assert.equal(
      producerIntervalReplay.status,
      "positive-n38-producer-interval-direct-normal-form-diagnostic-denominator-guard-open"
    );
    assert.equal(
      producerIntervalReplay.diagnostic_kind,
      "candidate-producer-interval-direct-normal-form-replay"
    );
    assert.equal(producerIntervalReplay.producer_sample_count, 5);
    assert.equal(
      producerIntervalReplay.product_derivative_separated_count,
      2
    );
    assert.equal(producerIntervalReplay.denominator_guard_open_count, 3);
    assert.equal(
      producerIntervalReplay.direct_rows_inside_headroom_count,
      2
    );
    assert.deepEqual(producerIntervalReplay.denominator_guard_open_cell_ids, [
      "speed.0.first-y",
      "speed.2.first-y",
      "speed.4.first-y",
    ]);
    assert.equal(
      producerIntervalReplay.all_producer_intervals_product_derivative_separated,
      false
    );
    assert.equal(
      producerIntervalReplay.all_guarded_direct_rows_inside_headroom,
      true
    );
    assert.ok(
      producerIntervalReplay.max_guarded_direct_normal_form_to_target_ratio <
        1e-6
    );
    assert.ok(
      producerIntervalReplay.min_guarded_product_derivative_abs_lower > 0
    );
    assert.ok(
      producerIntervalReplay.min_guarded_direct_true_stream_slack_ratio >
        0.999999
    );
    assert.ok(
      producerIntervalReplay
        .min_guarded_direct_true_stream_excess_to_directed_ratio > 1e6
    );
    assert.equal(
      producerIntervalReplay.claim_boundary.certifies_n38_taylor_remainder_bound,
      false
    );
    assert.equal(
      producerIntervalReplay.claim_boundary
        .certifies_directed_rounded_shared_domain,
      false
    );
    assert.equal(producerIntervalReplay.claim_boundary.retained_branch, false);
    assert.equal(producerIntervalReplay.rows.length, 5);
    assert.equal(
      producerIntervalReplay.rows.filter(
        (row) =>
          row.row_status ===
          "positive-n38-producer-interval-direct-normal-form-row-denominator-guard-open"
      ).length,
      3
    );
    assert.equal(
      producerIntervalReplay.rows.filter(
        (row) =>
          row.row_status ===
          "positive-n38-producer-interval-direct-normal-form-row-inside-headroom"
      ).length,
      2
    );
    assert.ok(
      producerIntervalReplay.rows
        .filter(
          (row) =>
            row.row_status ===
            "positive-n38-producer-interval-direct-normal-form-row-inside-headroom"
        )
        .every(
          (row) =>
            row.denominator_guard_status ===
              "producer-interval-lagrange-product-derivative-separated-from-zero" &&
            row.product_derivative_abs_lower > 0 &&
            row.direct_normal_form_to_target_ratio < 1e-6 &&
            row.direct_true_stream_slack_ratio > 0.999999 &&
            row.direct_true_stream_excess_to_directed_ratio > 1e6 &&
            row.direct_stream_policy === "diagnostic-only" &&
            row.continuous_stream_derivative_policy ===
              "candidate-only until directed-rounded residual-derivative enclosures cover this producer interval"
        )
    );
    assert.ok(
      producerIntervalReplay.rows
        .filter(
          (row) =>
            row.row_status ===
            "positive-n38-producer-interval-direct-normal-form-row-denominator-guard-open"
        )
        .every(
          (row) =>
            row.denominator_guard_status ===
              "producer-interval-lagrange-product-derivative-crosses-zero-or-open" &&
            row.product_derivative_abs_lower === 0 &&
            row.direct_normal_form_to_target_ratio === null &&
            row.direct_true_stream_excess_to_directed_ratio === null
        )
    );
    const producerHybridReplay =
      derivativeProviderTarget
        .candidate_producer_hybrid_quotient_direct_replay;
    assert.ok(producerHybridReplay);
    assert.deepEqual(
      collectExactKeys(producerHybridReplay, FORBIDDEN_FIXED_SPEED_KEYS),
      []
    );
    assert.equal(
      producerHybridReplay.status,
      "positive-n38-producer-hybrid-quotient-direct-replay-candidate-emitted"
    );
    assert.equal(
      producerHybridReplay.diagnostic_kind,
      "candidate-producer-hybrid-quotient-direct-replay"
    );
    assert.equal(producerHybridReplay.producer_sample_count, 5);
    assert.equal(producerHybridReplay.segment_count, 9);
    assert.equal(producerHybridReplay.product_quotient_segment_count, 5);
    assert.equal(producerHybridReplay.derivative_quotient_segment_count, 4);
    assert.equal(producerHybridReplay.segment_inside_count, 9);
    assert.equal(producerHybridReplay.all_segments_inside_headroom, true);
    assert.deepEqual(producerHybridReplay.open_segment_cell_ids, []);
    assert.ok(producerHybridReplay.max_segment_to_target_ratio < 1e-6);
    assert.ok(producerHybridReplay.min_segment_denominator_abs_lower > 0);
    assert.ok(producerHybridReplay.min_segment_slack_ratio > 0.999999);
    assert.ok(producerHybridReplay.min_segment_excess_to_directed_ratio > 1e6);
    assert.equal(
      producerHybridReplay.claim_boundary.certifies_n38_taylor_remainder_bound,
      false
    );
    assert.equal(
      producerHybridReplay.claim_boundary
        .certifies_directed_rounded_shared_domain,
      false
    );
    assert.equal(producerHybridReplay.claim_boundary.retained_branch, false);
    assert.equal(producerHybridReplay.rows.length, 5);
    assert.ok(
      producerHybridReplay.rows.every(
        (row) =>
          row.row_status ===
            "positive-n38-producer-hybrid-quotient-direct-row-inside-headroom" &&
          row.hybrid_segment_rows.length >= 1 &&
          row.hybrid_segment_rows.every(
            (segment) =>
              [
                "derivative-quotient-full-producer-interval",
                "derivative-quotient-selected-node-collar",
                "product-quotient-producer-complement",
              ].includes(segment.quotient_kind) &&
              segment.segment_status ===
                "positive-n38-producer-hybrid-quotient-direct-segment-inside-headroom" &&
              segment.denominator_abs_lower > 0 &&
              segment.split_stream_required_direct_normal_form_abs_upper >
                0 &&
              segment.direct_normal_form_to_target_ratio < 1e-6 &&
              segment.direct_true_stream_slack_ratio > 0.999999 &&
              segment.direct_true_stream_excess_to_directed_ratio > 1e6 &&
              segment.direct_stream_policy === "diagnostic-only"
          ) &&
          row.direct_stream_policy === "diagnostic-only" &&
          row.continuous_stream_derivative_policy ===
            "candidate-only until directed-rounded residual enclosures cover this hybrid producer partition"
      )
    );
    const producerHybridTrueStreamBudget =
      derivativeProviderTarget
        .candidate_producer_hybrid_true_stream_excess_budget;
    assert.ok(producerHybridTrueStreamBudget);
    assert.deepEqual(
      collectExactKeys(
        producerHybridTrueStreamBudget,
        FORBIDDEN_FIXED_SPEED_KEYS
      ),
      []
    );
    assert.equal(
      producerHybridTrueStreamBudget.status,
      "positive-n38-producer-hybrid-true-stream-excess-budget-candidate-emitted"
    );
    assert.equal(
      producerHybridTrueStreamBudget.diagnostic_kind,
      "candidate-producer-hybrid-true-stream-excess-budget"
    );
    assert.equal(producerHybridTrueStreamBudget.segment_count, 9);
    assert.equal(producerHybridTrueStreamBudget.residual_segment_count, 5);
    assert.equal(
      producerHybridTrueStreamBudget.residual_derivative_segment_count,
      4
    );
    assert.equal(
      producerHybridTrueStreamBudget.positive_budget_segment_count,
      9
    );
    assert.equal(
      producerHybridTrueStreamBudget
        .all_segments_have_positive_true_stream_excess_budget,
      true
    );
    assert.ok(
      producerHybridTrueStreamBudget.max_finite_model_to_target_ratio < 1e-6
    );
    assert.ok(
      producerHybridTrueStreamBudget.min_true_stream_slack_ratio > 0.999999
    );
    assert.ok(
      producerHybridTrueStreamBudget
        .min_true_stream_excess_to_directed_ratio > 1e6
    );
    assert.ok(
      producerHybridTrueStreamBudget.min_true_stream_excess_abs_budget > 0
    );
    assert.equal(
      producerHybridTrueStreamBudget.claim_boundary
        .certifies_n38_taylor_remainder_bound,
      false
    );
    assert.equal(
      producerHybridTrueStreamBudget.claim_boundary
        .certifies_directed_rounded_shared_domain,
      false
    );
    assert.equal(
      producerHybridTrueStreamBudget.claim_boundary.retained_branch,
      false
    );
    assert.equal(producerHybridTrueStreamBudget.segment_rows.length, 9);
    assert.ok(producerHybridTrueStreamBudget.controlling_segment);
    assert.ok(
      producerHybridTrueStreamBudget.segment_rows.every(
        (segment) =>
          [
            "same-variable-direct-residual",
            "same-variable-direct-residual-derivative",
          ].includes(segment.proof_object_kind) &&
          segment.budget_status ===
            "positive-n38-producer-hybrid-true-stream-excess-segment-budget-positive" &&
          segment.true_stream_excess_abs_budget > 0 &&
          segment.true_stream_slack_ratio > 0.999999 &&
          segment.true_stream_excess_to_directed_ratio > 1e6 &&
          segment.true_stream_excess_policy ===
            "candidate budget only; no true-stream enclosure is certified"
      )
    );
    const producerHybridSplitStreamReplay =
      derivativeProviderTarget
        .candidate_producer_hybrid_split_stream_paired_replay;
    assert.ok(producerHybridSplitStreamReplay);
    assert.deepEqual(
      collectExactKeys(
        producerHybridSplitStreamReplay,
        FORBIDDEN_FIXED_SPEED_KEYS
      ),
      []
    );
    assert.equal(
      producerHybridSplitStreamReplay.status,
      "positive-n38-producer-hybrid-split-stream-paired-replay-candidate-emitted"
    );
    assert.equal(
      producerHybridSplitStreamReplay.diagnostic_kind,
      "candidate-producer-hybrid-split-stream-paired-replay"
    );
    assert.equal(producerHybridSplitStreamReplay.segment_count, 9);
    assert.equal(producerHybridSplitStreamReplay.residual_segment_count, 5);
    assert.equal(
      producerHybridSplitStreamReplay.residual_derivative_segment_count,
      4
    );
    assert.equal(
      producerHybridSplitStreamReplay.paired_segment_inside_count,
      9
    );
    assert.equal(
      producerHybridSplitStreamReplay.all_segments_inside_paired_headroom,
      true
    );
    assert.ok(
      producerHybridSplitStreamReplay.max_paired_to_target_ratio < 2e-6
    );
    assert.ok(
      producerHybridSplitStreamReplay.max_split_triangle_to_target_ratio <
        2e-5
    );
    assert.ok(
      producerHybridSplitStreamReplay.max_paired_to_direct_abs_loss_factor < 3
    );
    assert.ok(
      producerHybridSplitStreamReplay.max_paired_to_direct_replay_relative_gap <
        1
    );
    assert.ok(
      producerHybridSplitStreamReplay.min_paired_slack_ratio > 0.999998
    );
    assert.ok(
      producerHybridSplitStreamReplay.min_paired_cancellation_fraction > 0.88
    );
    assert.equal(
      producerHybridSplitStreamReplay.claim_boundary
        .certifies_n38_taylor_remainder_bound,
      false
    );
    assert.equal(
      producerHybridSplitStreamReplay.claim_boundary
        .certifies_directed_rounded_shared_domain,
      false
    );
    assert.equal(
      producerHybridSplitStreamReplay.claim_boundary.retained_branch,
      false
    );
    assert.equal(producerHybridSplitStreamReplay.segment_rows.length, 9);
    assert.ok(producerHybridSplitStreamReplay.controlling_segment);
    assert.equal(
      producerHybridSplitStreamReplay.controlling_segment.cell_id,
      "speed.1.first-y"
    );
    assert.ok(
      producerHybridSplitStreamReplay.segment_rows.every(
        (segment) =>
          [
            "same-variable-direct-residual",
            "same-variable-direct-residual-derivative",
          ].includes(segment.proof_object_kind) &&
          segment.segment_status ===
            "positive-n38-producer-hybrid-split-stream-paired-segment-inside-headroom" &&
          segment.target_abs_upper > 0 &&
          Array.isArray(segment.point_interval_hull) &&
          Array.isArray(segment.drift_interval_hull) &&
          Array.isArray(segment.paired_interval_hull) &&
          Array.isArray(segment.direct_interval_hull) &&
          segment.paired_to_target_ratio < 2e-6 &&
          segment.split_triangle_to_target_ratio < 2e-5 &&
          segment.paired_true_stream_excess_abs_budget > 0 &&
          segment.paired_true_stream_slack_ratio > 0.999998 &&
          segment.paired_cancellation_fraction > 0.88 &&
          segment.subcell_count === 16 &&
          segment.split_stream_policy ===
            "candidate finite-polynomial paired replay only; no directed-rounded true-stream enclosure is certified"
      )
    );
    const producerHybridRawTrueSourceReplay =
      derivativeProviderTarget
        .candidate_producer_hybrid_raw_true_source_replay;
    assert.ok(producerHybridRawTrueSourceReplay);
    assert.deepEqual(
      collectExactKeys(
        producerHybridRawTrueSourceReplay,
        FORBIDDEN_FIXED_SPEED_KEYS
      ),
      []
    );
    assert.equal(
      producerHybridRawTrueSourceReplay.status,
      "positive-n38-producer-hybrid-raw-true-source-replay-open"
    );
    assert.equal(
      producerHybridRawTrueSourceReplay.diagnostic_kind,
      "candidate-producer-hybrid-raw-true-source-replay"
    );
    assert.equal(producerHybridRawTrueSourceReplay.segment_count, 9);
    assert.equal(
      producerHybridRawTrueSourceReplay.residual_value_segment_count,
      5
    );
    assert.equal(
      producerHybridRawTrueSourceReplay.derivative_value_only_segment_count,
      4
    );
    assert.equal(
      producerHybridRawTrueSourceReplay.residual_value_inside_target_count,
      0
    );
    assert.equal(
      producerHybridRawTrueSourceReplay.all_residual_value_segments_inside_target,
      false
    );
    assert.ok(
      producerHybridRawTrueSourceReplay
        .max_raw_true_residual_value_to_product_target_ratio > 1e9
    );
    assert.ok(
      producerHybridRawTrueSourceReplay.max_raw_true_source_abs_upper > 1e23
    );
    assert.ok(
      producerHybridRawTrueSourceReplay.max_term_sum_to_source_relative_gap <
        1e-12
    );
    assert.ok(
      producerHybridRawTrueSourceReplay
        .min_raw_true_source_cancellation_fraction < 1e-6
    );
    assert.ok(producerHybridRawTrueSourceReplay.controlling_value_segment);
    assert.equal(
      producerHybridRawTrueSourceReplay.controlling_value_segment.cell_id,
      "speed.0.first-y"
    );
    assert.equal(
      producerHybridRawTrueSourceReplay.claim_boundary
        .certifies_n38_taylor_remainder_bound,
      false
    );
    assert.equal(
      producerHybridRawTrueSourceReplay.claim_boundary
        .certifies_directed_rounded_shared_domain,
      false
    );
    assert.equal(
      producerHybridRawTrueSourceReplay.claim_boundary.retained_branch,
      false
    );
    assert.ok(
      producerHybridRawTrueSourceReplay.segment_rows.every(
        (segment) =>
          Array.isArray(segment.segment_interval) &&
          Array.isArray(segment.segment_speed_interval) &&
          segment.source_y_order === 42 &&
          Array.isArray(segment.raw_true_source_interval) &&
          Array.isArray(segment.direct_graph_interval) &&
          Array.isArray(segment.raw_true_residual_interval) &&
          segment.raw_true_source_abs_upper > 0 &&
          segment.raw_true_residual_abs_upper > 0 &&
          segment.term_sum_to_source_relative_gap < 1e-12 &&
          segment.raw_true_source_cancellation_fraction < 1e-6 &&
          segment.producer_sample_provenance.h_row_interval_count === 39 &&
          segment.true_source_policy ===
            "candidate raw independent h-row source replay only; no dependency-preserving true-stream enclosure is certified"
      )
    );
    assert.ok(
      producerHybridRawTrueSourceReplay.segment_rows
        .filter(
          (segment) =>
            segment.quotient_kind === "product-quotient-producer-complement"
        )
        .every(
          (segment) =>
            segment.target_comparison_status ===
              "positive-n38-producer-hybrid-raw-true-source-product-segment-open" &&
            segment.raw_true_residual_value_to_product_target_ratio > 1e9
        )
    );
    assert.ok(
      producerHybridRawTrueSourceReplay.segment_rows
        .filter((segment) =>
          segment.quotient_kind.startsWith("derivative-quotient")
        )
        .every(
          (segment) =>
            segment.target_comparison_status ===
              "positive-n38-producer-hybrid-raw-true-source-derivative-segment-value-only" &&
            segment.raw_true_residual_value_to_product_target_ratio === null
        )
    );
    const producerHybridGraphIntervalResidualSourceReplay =
      derivativeProviderTarget
        .candidate_producer_hybrid_graph_interval_residual_source_replay;
    assert.ok(producerHybridGraphIntervalResidualSourceReplay);
    assert.deepEqual(
      collectExactKeys(
        producerHybridGraphIntervalResidualSourceReplay,
        FORBIDDEN_FIXED_SPEED_KEYS
      ),
      []
    );
    assert.equal(
      producerHybridGraphIntervalResidualSourceReplay.status,
      "positive-n38-producer-hybrid-graph-interval-residual-source-replay-open"
    );
    assert.equal(
      producerHybridGraphIntervalResidualSourceReplay.diagnostic_kind,
      "candidate-producer-hybrid-graph-interval-residual-source-replay"
    );
    assert.equal(
      producerHybridGraphIntervalResidualSourceReplay.segment_count,
      9
    );
    assert.equal(
      producerHybridGraphIntervalResidualSourceReplay.residual_value_segment_count,
      5
    );
    assert.equal(
      producerHybridGraphIntervalResidualSourceReplay.derivative_value_only_segment_count,
      4
    );
    assert.equal(
      producerHybridGraphIntervalResidualSourceReplay.residual_value_inside_target_count,
      0
    );
    assert.ok(
      producerHybridGraphIntervalResidualSourceReplay
        .max_graph_residual_value_to_product_target_ratio > 1e9
    );
    assert.ok(
      producerHybridGraphIntervalResidualSourceReplay
        .min_raw_to_graph_residual_compression_factor < 1.001
    );
    assert.ok(
      producerHybridGraphIntervalResidualSourceReplay
        .max_raw_to_graph_residual_compression_factor < 1.001
    );
    assert.ok(
      producerHybridGraphIntervalResidualSourceReplay
        .max_term_sum_to_source_relative_gap < 1e-12
    );
    assert.ok(
      producerHybridGraphIntervalResidualSourceReplay
        .min_graph_source_cancellation_fraction < 1e-6
    );
    assert.equal(
      producerHybridGraphIntervalResidualSourceReplay.claim_boundary
        .certifies_directed_rounded_shared_domain,
      false
    );
    assert.ok(
      producerHybridGraphIntervalResidualSourceReplay.segment_rows.every(
        (segment) =>
          segment.provider_kind ===
            "candidate-polynomial-h-row-graph-interval-residual-provider" &&
          segment.provider_preserves_shared_xi_dependency === true &&
          segment.provider_h_row_interval_count === 39 &&
          segment.provider_residual_hull_count === 39 &&
          segment.term_sum_to_source_relative_gap < 1e-12 &&
          segment.provider_dependency_policy ===
            "preserves shared xi graph dependence but leaves per-h interval residual hulls independent; candidate-only"
      )
    );
    assert.ok(
      producerHybridGraphIntervalResidualSourceReplay.segment_rows
        .filter(
          (segment) =>
            segment.quotient_kind === "product-quotient-producer-complement"
        )
        .every(
          (segment) =>
            segment.target_comparison_status ===
              "positive-n38-producer-hybrid-graph-interval-residual-source-product-segment-open" &&
            segment.graph_residual_value_to_product_target_ratio > 1e9
        )
    );
    const producerHybridH38CoordinateSourceReplay =
      derivativeProviderTarget
        .candidate_producer_hybrid_h38_coordinate_source_replay;
    assert.ok(producerHybridH38CoordinateSourceReplay);
    assert.deepEqual(
      collectExactKeys(
        producerHybridH38CoordinateSourceReplay,
        FORBIDDEN_FIXED_SPEED_KEYS
      ),
      []
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay.status,
      "positive-n38-producer-hybrid-h38-coordinate-source-replay-open"
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay.diagnostic_kind,
      "candidate-producer-hybrid-h38-coordinate-source-replay"
    );
    assert.equal(producerHybridH38CoordinateSourceReplay.segment_count, 9);
    assert.equal(
      producerHybridH38CoordinateSourceReplay.residual_value_segment_count,
      5
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay.derivative_value_only_segment_count,
      4
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay.residual_value_inside_target_count,
      0
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_h38_coordinate_residual_value_to_product_target_ratio > 3
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_h38_coordinate_residual_value_to_product_target_ratio < 4
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .product_segment_residual_inequality_diagnosis_status,
      "positive-n38-product-segment-residual-inequality-diagnosis-source-graph-offset-mismatch-candidate"
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .source_to_direct_quartic_alignment_status,
      "positive-n38-source-to-direct-quartic-alignment-diagnosis-h38-coordinate-offset-persists"
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_source_to_direct_quartic_offset_value_to_product_target_ratio > 3
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_source_to_direct_quartic_offset_value_to_product_target_ratio < 4
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_source_to_direct_quartic_offset_center_to_product_target_ratio > 3
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_source_to_direct_quartic_offset_center_to_product_target_ratio < 4
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_source_to_direct_quartic_offset_radius_to_product_target_ratio <
        0.001
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_source_to_direct_quartic_offset_radius_to_center_ratio < 0.001
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .source_direct_normalization_diagnosis_status,
      "positive-n38-source-direct-normalization-diagnosis-mismatch-ruled-out"
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_solved_source_to_solved_direct_quartic_offset_to_solved_target_ratio >
        3
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_solved_source_to_solved_direct_quartic_offset_to_solved_target_ratio <
        4
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .min_solve_normalization_invariance_ratio > 0.999
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_solve_normalization_invariance_ratio < 1.001
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .min_crossed_solve_normalization_offset_to_product_target_ratio > 5
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .controlling_source_direct_normalization_segment
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .controlling_source_direct_normalization_segment.cell_id,
      "speed.4.first-y"
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .controlling_source_direct_normalization_segment.segment_index,
      1
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .source_pair_direct_quartic_offset_dominance_diagnosis_status,
      "positive-n38-source-pair-direct-quartic-offset-dominance-diagnosis-source-pair-offset-dominates"
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_h38_coordinate_signed_pair_to_direct_quartic_offset_to_target_ratio >
        3
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_h38_coordinate_signed_pair_to_direct_quartic_offset_to_target_ratio <
        4
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_h38_coordinate_signed_pair_direct_quartic_offset_to_full_offset_relative_gap <
        1e-12
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_source_direct_quartic_offset_to_finite_direct_abs_loss_factor >
        1e7
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .source_pair_direct_graph_normal_form_diagnosis_status,
      "positive-n38-source-pair-direct-graph-normal-form-diagnosis-gap-is-direct-graph-offset"
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .source_pair_component_graph_diagnosis_status,
      "positive-n38-source-pair-component-graph-diagnosis-interval-center-drift-offset"
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_h38_coordinate_signed_pair_direct_graph_offset_to_direct_quartic_offset_relative_gap <
        1e-5
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_finite_direct_normal_form_to_signed_pair_direct_graph_offset_ratio <
        1e-6
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .min_h38_coordinate_source_pair_opposed_cancellation_fraction > 0.87
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_h38_coordinate_signed_pair_to_component_graph_offset_to_target_ratio <
        0.001
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_h38_coordinate_component_graph_to_direct_graph_gap_to_target_ratio <
        0.001
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .controlling_source_pair_direct_graph_normal_form_segment
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .controlling_source_pair_direct_graph_normal_form_segment.cell_id,
      "speed.4.first-y"
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .controlling_source_pair_direct_graph_normal_form_segment.segment_index,
      1
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .controlling_source_pair_component_graph_segment
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .controlling_source_pair_component_graph_segment.cell_id,
      "speed.2.first-y"
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .controlling_source_pair_component_graph_segment.segment_index,
      0
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .controlling_source_pair_component_graph_segment
        .h38_coordinate_source_pair_component_graph_status,
      "positive-n38-source-pair-component-graph-exposes-interval-center-drift-offset"
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .controlling_source_pair_component_graph_segment
        .h38_coordinate_source_component_graph_profile
        .signed_pair_source_minus_signed_pair_graph.abs_upper_to_target <
        0.001
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .controlling_source_pair_component_graph_segment
        .h38_coordinate_source_component_graph_profile
        .component_plus_drift_graph_minus_direct_graph.abs_upper_to_target <
        0.001
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .controlling_source_pair_component_graph_segment
        .h38_coordinate_source_component_graph_profile
        .interval_center_drift_graph.abs_upper_to_target > 2
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .component_drift_s37_division_diagnosis_status,
      "positive-n38-component-drift-s37-division-diagnosis-inside-target"
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_component_drift_solved_gap_to_solved_target_ratio < 0.001
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .min_component_drift_solve_normalization_invariance_ratio > 0.999
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_component_drift_solve_normalization_invariance_ratio < 1.001
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .controlling_component_drift_s37_division_segment
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .controlling_component_drift_s37_division_segment.cell_id,
      "speed.0.first-y"
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .controlling_component_drift_s37_division_segment.segment_index,
      2
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .controlling_component_drift_s37_division_segment
        .component_drift_s37_division_status,
      "positive-n38-component-drift-s37-division-inside-target"
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .controlling_source_pair_direct_quartic_offset_segment
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .controlling_source_pair_direct_quartic_offset_segment.cell_id,
      "speed.4.first-y"
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .controlling_source_pair_direct_quartic_offset_segment.segment_index,
      1
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .full_residual_vector_provider_kind,
      "candidate-polynomial-h-row-full-residual-vector-xi-graph-provider"
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .full_residual_vector_provider_available,
      true
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .full_residual_vector_polynomial_degree,
      4
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .full_residual_vector_sample_count,
      5
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay.full_residual_vector_h_count,
      39
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .full_residual_vector_max_sample_replay_error < 1e-4
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .full_residual_vector_alignment_status,
      "positive-n38-full-residual-vector-source-alignment-diagnosis-structural-offset-persists"
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .full_residual_vector_solve_normalization_status,
      "positive-n38-full-residual-vector-solve-normalization-diagnosis-open"
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_full_residual_vector_source_over_denominator_to_direct_quartic_offset_value_to_product_target_ratio >
        12
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_full_residual_vector_source_over_denominator_to_direct_quartic_offset_value_to_product_target_ratio <
        13
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_full_residual_vector_minus_source_over_denominator_to_direct_quartic_offset_value_to_product_target_ratio >
        7
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_full_residual_vector_minus_source_over_denominator_to_direct_quartic_offset_value_to_product_target_ratio <
        8
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .full_residual_vector_raw_multiplier_sign_matches_product_denominator_all_product_segments,
      false
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .full_residual_vector_minus_source_over_denominator_sign_matches_direct_quartic_all_product_segments,
      false
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_full_residual_vector_direct_quartic_offset_value_to_product_target_ratio >
        3
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_full_residual_vector_direct_quartic_offset_value_to_product_target_ratio <
        4
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_full_residual_vector_direct_quartic_offset_center_to_product_target_ratio >
        3
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_full_residual_vector_direct_quartic_offset_center_to_product_target_ratio <
        4
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_full_residual_vector_direct_quartic_offset_radius_to_product_target_ratio <
        0.002
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_full_residual_vector_offset_to_h38_coordinate_offset_ratio > 1
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_full_residual_vector_offset_to_h38_coordinate_offset_ratio <
        1.001
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_h38_coordinate_to_full_residual_vector_offset_compression_factor >
        0.999
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_h38_coordinate_to_full_residual_vector_offset_compression_factor <
        1.001
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_h38_coordinate_residual_center_to_product_target_ratio > 3
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_h38_coordinate_residual_center_to_product_target_ratio < 4
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_h38_coordinate_residual_radius_to_product_target_ratio < 0.001
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_required_denominator_abs_lower_for_h38_coordinate_residual > 2.5
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_required_denominator_abs_lower_for_h38_coordinate_residual < 2.6
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_required_to_available_product_denominator_abs_factor > 2.7
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_required_to_available_product_denominator_abs_factor < 2.8
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .product_denominator_partition_can_close_all_h38_coordinate_residuals,
      false
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .min_raw_to_h38_coordinate_residual_compression_factor > 1e9
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .min_graph_interval_to_h38_coordinate_residual_compression_factor >
        1e9
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay.h38_coordinate_subcell_count,
      16
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay.max_h38_coordinate_segment_subcell_count,
      16
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_term_sum_to_source_relative_gap < 1e-12
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_h38_coordinate_subcell_term_sum_to_source_relative_gap < 1e-12
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .min_h38_coordinate_source_cancellation_fraction > 0.94
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .min_h38_coordinate_subcell_source_cancellation_fraction > 0.94
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_h38_coordinate_signed_pair_residual_value_to_product_target_ratio >
        3
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_h38_coordinate_signed_pair_residual_value_to_product_target_ratio <
        4
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .max_h38_coordinate_signed_pair_source_to_full_source_relative_gap <
        1e-12
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .min_h38_coordinate_signed_pair_cancellation_fraction > 0.87
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay.shared_non_h38_coordinate_candidate_count,
      6
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .shared_non_h38_coordinate_candidate_summaries.length,
      6
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .best_shared_non_h38_coordinate_candidate.candidate_label,
      "h35-shared-with-h38-coordinate"
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .best_shared_non_h38_coordinate_candidate
        .max_residual_value_to_product_target_ratio > 4e7
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .best_shared_non_h38_coordinate_candidate
        .max_residual_value_to_product_target_ratio < 5e7
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .shared_non_h38_coordinate_candidate_summaries.every(
          (summary) =>
            summary.candidate_status ===
              "positive-n38-producer-hybrid-shared-non-h38-coordinate-source-candidate-open" &&
            summary.residual_value_inside_target_count === 0 &&
            summary.max_residual_value_to_product_target_ratio > 1e7 &&
            summary.controlling_value_segment !== null &&
            summary.controlling_value_segment.term_sum_to_source_relative_gap <
              1e-12
        )
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay.claim_boundary
        .certifies_directed_rounded_shared_domain,
      false
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay.controlling_value_segment
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay.controlling_value_segment
        .cell_id,
      "speed.4.first-y"
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay.controlling_value_segment
        .product_segment_residual_inequality_diagnosis,
      "positive-n38-product-segment-residual-inequality-source-graph-offset-mismatch-candidate"
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay.controlling_value_segment
        .denominator_partition_can_close_h38_coordinate_residual,
      false
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay.controlling_value_segment
        .required_to_available_product_denominator_abs_factor > 2.7
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay.controlling_value_segment
        .required_to_available_product_denominator_abs_factor < 2.8
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay.controlling_full_residual_vector_segment
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .controlling_full_residual_vector_segment.cell_id,
      "speed.4.first-y"
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .controlling_full_residual_vector_segment.segment_index,
      1
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .controlling_full_residual_vector_segment
        .full_residual_vector_alignment_status,
      "positive-n38-full-residual-vector-source-alignment-structural-offset-persists"
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .controlling_full_residual_vector_segment
        .full_residual_vector_direct_quartic_offset_interval_sign,
      "positive"
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .controlling_full_residual_vector_segment
        .full_residual_vector_direct_quartic_offset_value_to_product_target_ratio >
        3
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .controlling_full_residual_vector_segment
        .full_residual_vector_direct_quartic_offset_radius_to_product_target_ratio <
        0.001
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .controlling_full_residual_vector_segment
        .full_residual_vector_source_to_direct_quartic_implied_multiplier_sign,
      "positive"
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .controlling_full_residual_vector_segment
        .full_residual_vector_product_denominator_sign,
      "negative"
    );
    assert.equal(
      producerHybridH38CoordinateSourceReplay
        .controlling_full_residual_vector_segment
        .full_residual_vector_solve_normalization_status,
      "positive-n38-full-residual-vector-solve-normalization-raw-denominator-sign-mismatch-and-signed-solve-open"
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .controlling_full_residual_vector_segment
        .full_residual_vector_source_to_direct_quartic_implied_multiplier_midpoint >
        0.55
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .controlling_full_residual_vector_segment
        .full_residual_vector_source_to_direct_quartic_implied_multiplier_midpoint <
        0.57
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .controlling_full_residual_vector_segment
        .full_residual_vector_minus_source_over_denominator_to_direct_quartic_offset_value_to_product_target_ratio >
        2
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay
        .controlling_full_residual_vector_segment
        .full_residual_vector_minus_source_over_denominator_to_direct_quartic_offset_value_to_product_target_ratio <
        3
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay.segment_rows.every(
        (segment) =>
          segment.provider_kind ===
            "candidate-polynomial-h-row-graph-h38-residual-coordinate-provider" &&
          segment.provider_preserves_shared_xi_dependency === true &&
          segment.provider_preserves_h38_residual_coordinate === true &&
          segment.provider_freezes_non_h38_residuals_at_centers === true &&
          segment.provider_h_row_interval_count === 39 &&
          segment.h38_coordinate_subcell_count === 16 &&
          segment.term_sum_to_source_relative_gap < 1e-12 &&
          segment.max_h38_coordinate_subcell_term_sum_to_source_relative_gap <
            1e-12 &&
          segment.h38_coordinate_source_cancellation_fraction > 0.94 &&
          segment.min_h38_coordinate_subcell_source_cancellation_fraction >
            0.94 &&
          segment.h38_coordinate_signed_pair_source_to_full_source_relative_gap <
            1e-12 &&
          segment.h38_coordinate_signed_pair_cancellation_fraction > 0.87 &&
          Array.isArray(segment.shared_non_h38_coordinate_candidate_rows) &&
          segment.shared_non_h38_coordinate_candidate_rows.length === 6 &&
          segment.worst_h38_coordinate_subcell_source_row !== null &&
          segment.provider_dependency_policy ===
            "preserves shared xi graph dependence and the h38 residual coordinate; freezes non-h38 residuals at interval centers; candidate-only directional diagnostic"
      )
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay.segment_rows
        .filter(
          (segment) =>
            segment.quotient_kind === "product-quotient-producer-complement"
        )
        .every(
          (segment) =>
            segment.target_comparison_status ===
              "positive-n38-producer-hybrid-h38-coordinate-source-product-segment-open" &&
            segment.product_segment_residual_inequality_diagnosis ===
              "positive-n38-product-segment-residual-inequality-source-graph-offset-mismatch-candidate" &&
            segment.source_provider_alignment_artifact_candidate === true &&
            typeof segment.denominator_partition_can_close_h38_coordinate_residual ===
              "boolean" &&
            segment.h38_coordinate_residual_interval_sign === "positive" &&
            segment.h38_coordinate_residual_center_to_product_target_ratio >
              1 &&
            segment.h38_coordinate_residual_radius_to_product_target_ratio <
              0.001 &&
            segment.finite_direct_normal_form_to_product_target_ratio <
              1e-6 &&
            segment.finite_paired_to_product_target_ratio < 1e-6 &&
            Array.isArray(segment.direct_quartic_interval) &&
            Array.isArray(segment.source_to_direct_quartic_offset_interval) &&
            segment.source_to_direct_quartic_alignment_status ===
              "positive-n38-source-to-direct-quartic-alignment-h38-coordinate-offset-persists" &&
            segment.source_to_direct_quartic_offset_interval_sign ===
              "positive" &&
            segment.source_to_direct_quartic_offset_value_to_product_target_ratio >
              1 &&
            segment.source_to_direct_quartic_offset_center_to_product_target_ratio >
              1 &&
            segment.source_to_direct_quartic_offset_radius_to_product_target_ratio <
              0.001 &&
            segment.source_to_direct_quartic_offset_radius_to_center_ratio <
              0.001 &&
            segment.source_direct_normalization_status ===
              "positive-n38-source-direct-normalization-mismatch-ruled-out" &&
            segment.source_pair_direct_quartic_offset_dominance_status ===
              "positive-n38-source-pair-direct-quartic-offset-dominates" &&
            Array.isArray(
              segment.h38_coordinate_signed_pair_to_direct_quartic_offset_interval
            ) &&
            segment
              .h38_coordinate_signed_pair_to_direct_quartic_offset_interval_sign ===
              "positive" &&
            segment.h38_coordinate_signed_pair_to_direct_quartic_offset_to_target_ratio >
              1 &&
            segment.h38_coordinate_signed_pair_to_direct_quartic_offset_radius_to_target_ratio <
              0.001 &&
            segment.h38_coordinate_signed_pair_direct_quartic_offset_to_full_offset_relative_gap <
              1e-12 &&
            segment.source_direct_quartic_offset_to_finite_direct_abs_loss_factor >
              1e6 &&
            segment.source_pair_direct_graph_normal_form_status ===
              "positive-n38-source-pair-direct-graph-normal-form-gap-is-direct-graph-offset" &&
            segment.h38_coordinate_source_pair_balance_status ===
              "positive-n38-source-pair-balance-large-opposed-pairs" &&
            segment
              .h38_coordinate_signed_pair_direct_graph_offset_to_direct_quartic_offset_relative_gap <
              1e-5 &&
            segment
              .finite_direct_normal_form_to_signed_pair_direct_graph_offset_ratio <
              1e-6 &&
            segment.h38_coordinate_source_pair_target_unit_profile
              .speed_constant_pair.midpoint_to_target > 1 &&
            segment.h38_coordinate_source_pair_target_unit_profile.sine_pair
              .midpoint_to_target < -1 &&
            segment.h38_coordinate_source_pair_target_unit_profile
              .signed_pair_source.midpoint_to_target < 0 &&
            segment.h38_coordinate_source_pair_target_unit_profile
              .signed_pair_minus_direct_graph.midpoint_to_target > 1 &&
            Math.abs(
              segment.h38_coordinate_source_pair_target_unit_profile
                .finite_direct_normal_form.abs_upper_to_target
            ) < 1e-6 &&
            Array.isArray(segment.normalization_slope_interval) &&
            segment.normalization_slope_abs_lower > 0.79 &&
            Array.isArray(segment.solved_source_interval) &&
            Array.isArray(segment.solved_direct_quartic_interval) &&
            Array.isArray(
              segment.solved_source_to_solved_direct_quartic_offset_interval
            ) &&
            segment.solved_source_to_solved_direct_quartic_offset_to_solved_target_ratio >
              1 &&
            segment.solve_normalization_invariance_ratio > 0.999 &&
            segment.solve_normalization_invariance_ratio < 1.001 &&
            segment.crossed_solve_normalization_best_offset_to_product_target_ratio >
              5 &&
            segment.required_to_available_product_denominator_abs_factor > 0 &&
            segment.h38_coordinate_residual_value_to_product_target_ratio >
              1 &&
            segment.h38_coordinate_signed_pair_residual_value_to_product_target_ratio >
              1
        )
    );
    const h38SourceReplayProductSegments =
      producerHybridH38CoordinateSourceReplay.segment_rows.filter(
        (segment) =>
          segment.quotient_kind ===
          "product-quotient-producer-complement"
      );
    assert.equal(h38SourceReplayProductSegments.length, 5);
    assert.deepEqual(
      [
        ...new Set(
          h38SourceReplayProductSegments.map(
            (segment) => segment.full_residual_vector_alignment_status
          )
        ),
      ],
      [
        "positive-n38-full-residual-vector-source-alignment-structural-offset-persists",
      ]
    );
    assert.ok(
      h38SourceReplayProductSegments.every(
        (segment) =>
          segment.full_residual_vector_direct_quartic_offset_interval_sign ===
            "positive" &&
          Object.keys(
            segment.full_residual_vector_source_term_intervals ?? {}
          ).length === 4 &&
          segment.full_residual_vector_term_sum_to_source_relative_gap <
            1e-12 &&
          segment.finite_direct_normal_form_to_product_target_ratio < 1e-6 &&
          segment.finite_paired_to_product_target_ratio < 1e-6 &&
          segment.full_residual_vector_direct_quartic_offset_value_to_product_target_ratio >
            1 &&
          segment.full_residual_vector_direct_quartic_offset_center_to_product_target_ratio >
            1 &&
          segment.full_residual_vector_direct_quartic_offset_radius_to_product_target_ratio <
            0.002 &&
          segment.full_residual_vector_offset_to_h38_coordinate_offset_ratio <
            1.02 &&
          segment.h38_coordinate_to_full_residual_vector_offset_compression_factor <
            1.01 &&
          segment.full_residual_vector_source_cancellation_fraction > 0.94
      )
    );
    assert.ok(
      producerHybridH38CoordinateSourceReplay.segment_rows
        .filter((segment) =>
          segment.quotient_kind.startsWith("derivative-quotient")
        )
        .every(
          (segment) =>
            segment.target_comparison_status ===
              "positive-n38-producer-hybrid-h38-coordinate-source-derivative-segment-value-only" &&
            segment.h38_coordinate_residual_value_to_product_target_ratio ===
              null
        )
    );
  }
  assert.equal(
    diagnostic.source_covariance_positive_n38_cubic_taylor_remainder_route
      .claim_boundary.certifies_n38_taylor_remainder_bound,
    false
  );
  assert.ok(
    diagnostic.source_covariance_positive_n38_lagrange_remainder_target
  );
  assert.equal(
    diagnostic.source_covariance_positive_n38_lagrange_remainder_target
      .status,
    "positive-n38-lagrange-remainder-target-candidate-emitted"
  );
  assert.ok(
    [
      "positive-n38-lagrange-remainder-target-has-sampled-m4-headroom",
      "positive-n38-lagrange-remainder-target-open",
      "positive-n38-lagrange-no-candidate-stencil",
      "positive-n38-lagrange-no-positive-collar-target",
      "positive-n38-lagrange-needs-cubic-target",
      "positive-n38-lagrange-missing-finite-inputs",
    ].includes(
      diagnostic.source_covariance_positive_n38_lagrange_remainder_target
        .target_status
    )
  );
  assert.equal(
    diagnostic.source_covariance_positive_n38_lagrange_remainder_target
      .positive_target_count,
    diagnostic.source_covariance_positive_n38_best_degree_row
      .positive_target_count
  );
  assert.ok(
    diagnostic.source_covariance_positive_n38_lagrange_remainder_target
      .candidate_count >= 0
  );
  assert.equal(
    diagnostic.source_covariance_positive_n38_lagrange_remainder_target
      .candidate_rows.length,
    diagnostic.source_covariance_positive_n38_lagrange_remainder_target
      .candidate_count
  );
  assert.ok(
    diagnostic.source_covariance_positive_n38_lagrange_remainder_target
      .best_split_triangle_m4_to_lagrange_required_ratio === null ||
      diagnostic.source_covariance_positive_n38_lagrange_remainder_target
        .best_split_triangle_m4_to_lagrange_required_ratio >= 0
  );
  assert.ok(
    diagnostic.source_covariance_positive_n38_lagrange_remainder_target
      .best_split_triangle_lagrange_inflation_factor_before_failure === null ||
      diagnostic.source_covariance_positive_n38_lagrange_remainder_target
        .best_split_triangle_lagrange_inflation_factor_before_failure >= 0
  );
  if (
    diagnostic.source_covariance_positive_n38_lagrange_remainder_target
      .selected_split_m4_allocation_target !== null
  ) {
    const allocationTarget =
      diagnostic.source_covariance_positive_n38_lagrange_remainder_target
        .selected_split_m4_allocation_target;
    assert.ok(
      [
        "positive-n38-split-m4-allocation-target-candidate-emitted",
        "positive-n38-split-m4-allocation-target-unavailable",
      ].includes(allocationTarget.status)
    );
    assert.equal(
      allocationTarget.claim_boundary.certifies_n38_taylor_remainder_bound,
      false
    );
    if (
      allocationTarget.status ===
      "positive-n38-split-m4-allocation-target-candidate-emitted"
    ) {
      assert.ok(
        allocationTarget.equal_stream_inflation_factor_before_failure > 0
      );
      assert.ok(
        allocationTarget.point_expression_axis_intercept_inflation_factor >
          allocationTarget.equal_stream_inflation_factor_before_failure
      );
      assert.ok(
        allocationTarget.interval_center_drift_axis_intercept_inflation_factor >
          allocationTarget.equal_stream_inflation_factor_before_failure
      );
      assert.ok(
        allocationTarget.equal_stream_point_expression_m4_ceiling > 0
      );
      assert.ok(
        allocationTarget.equal_stream_interval_center_drift_m4_ceiling > 0
      );
      assert.ok(
        allocationTarget.equal_stream_split_triangle_m4_ceiling > 0
      );
      assert.ok(
        allocationTarget.point_expression_m4_ceiling_with_drift_uninflated >
          allocationTarget.equal_stream_point_expression_m4_ceiling
      );
      assert.ok(
        allocationTarget.interval_center_drift_m4_ceiling_with_point_uninflated >
          allocationTarget.equal_stream_interval_center_drift_m4_ceiling
      );
      assert.equal(
        allocationTarget.sampled_ceiling_comparison.status,
        "sampled-split-m4-inside-equal-stream-ceilings"
      );
      assert.equal(
        allocationTarget.sampled_ceiling_comparison
          .sampled_pair_satisfies_equal_stream_rectangle,
        true
      );
      assert.equal(
        allocationTarget.sampled_ceiling_comparison
          .sampled_pair_satisfies_linear_allocation,
        true
      );
      assert.ok(
        allocationTarget.sampled_ceiling_comparison
          .split_triangle_sampled_to_equal_split_ceiling_ratio < 1
      );
      assert.equal(
        allocationTarget.sampled_ceiling_comparison
          .continuous_certificate_status,
        "continuous-directed-rounded-fourth-derivative-proof-open"
      );
      assert.equal(
        typeof allocationTarget.allocation_certificate_obligation,
        "string"
      );
    }
  }
  if (
    diagnostic.source_covariance_positive_n38_lagrange_remainder_target
      .selected_candidate !== null
  ) {
    assert.ok(
      diagnostic.source_covariance_positive_n38_lagrange_remainder_target
        .selected_candidate
        .split_triangle_m4_to_lagrange_required_ratio === null ||
        diagnostic.source_covariance_positive_n38_lagrange_remainder_target
          .selected_candidate
          .split_triangle_m4_to_lagrange_required_ratio >= 0
    );
  }
  if (
    diagnostic.source_covariance_positive_n38_lagrange_remainder_target
      .selected_source_residual_decomposition !== null
  ) {
    assert.equal(
      diagnostic.source_covariance_positive_n38_lagrange_remainder_target
        .selected_source_residual_decomposition.status,
      "positive-n38-lagrange-source-decomposition-emitted"
    );
    assert.deepEqual(
      diagnostic.source_covariance_positive_n38_lagrange_remainder_target
        .selected_source_residual_decomposition.source_components,
      ["delta_squared_speed", "constant_minus_two", "sin_phi", "sin_delta"]
    );
    assert.ok(
      typeof diagnostic.source_covariance_positive_n38_lagrange_remainder_target
        .selected_source_residual_decomposition
        .source_sum_replays_direct_residual === "boolean"
    );
    assert.ok(
      diagnostic.source_covariance_positive_n38_lagrange_remainder_target
        .selected_source_residual_decomposition.component_rows.some(
          (row) =>
            row.component === "sin_delta" &&
            Array.isArray(row.lagrange_polynomial_coefficients) &&
            row.lagrange_polynomial_coefficients.length > 0
        )
    );
    assert.ok(
      Array.isArray(
        diagnostic.source_covariance_positive_n38_lagrange_remainder_target
          .selected_source_residual_decomposition
          .point_expression_lagrange_graph_coefficients
      )
    );
    assert.ok(
      Array.isArray(
        diagnostic.source_covariance_positive_n38_lagrange_remainder_target
          .selected_source_residual_decomposition
          .interval_center_drift_lagrange_graph_coefficients
      )
    );
    assert.ok(
      Number.isFinite(
        diagnostic.source_covariance_positive_n38_lagrange_remainder_target
          .selected_source_residual_decomposition
          .point_expression_omitted_residual_sum
      )
    );
    assert.ok(
      diagnostic.source_covariance_positive_n38_lagrange_remainder_target
        .selected_source_residual_decomposition
        .max_point_expression_omitted_residual_over_conservative_target >= 0
    );
    assert.ok(
      Number.isFinite(
        diagnostic.source_covariance_positive_n38_lagrange_remainder_target
          .selected_source_residual_decomposition
          .interval_center_drift_omitted_residual_sum
      )
    );
    assert.ok(
      diagnostic.source_covariance_positive_n38_lagrange_remainder_target
        .selected_source_residual_decomposition
        .max_interval_center_drift_omitted_residual_over_conservative_target >=
        0
    );
    assert.ok(
      diagnostic.source_covariance_positive_n38_lagrange_remainder_target
        .selected_source_residual_decomposition
        .direct_split_replay_relative_gap < 1e-6
    );
  }
  assert.equal(
    typeof diagnostic.source_covariance_positive_n38_lagrange_remainder_target
      .source_residual_decomposition_interpretation,
    "string"
  );
  assert.equal(
    diagnostic.source_covariance_positive_n38_lagrange_remainder_target
      .claim_boundary.certifies_h38_n38_graph_enclosure,
    false
  );
  assert.equal(
    diagnostic.source_covariance_positive_n38_lagrange_remainder_target
      .claim_boundary.certifies_n38_taylor_remainder_bound,
    false
  );
  assert.ok(diagnostic.max_source_covariance_term_triangle_gain > 1);
  assert.ok(
    diagnostic.source_covariance_collar_rows.every(
      (row) =>
        row.source_pressure <= row.term_triangle_pressure &&
        row.term_pressure_rows.some(
          (termRow) => termRow.term === "sin_delta"
        ) &&
        row.term_pressure_rows.some((termRow) => termRow.term === "sin_phi") &&
        row.term_pressure_rows.some(
          (termRow) => termRow.term === "delta_squared_speed"
        )
    )
  );
  assert.ok(
    diagnostic.source_covariance_reference_collar_summary.some(
      (row) => row.signed_source_beats_triangle_at_some_collar
    )
  );
  assert.ok(diagnostic.dominant_source_zero_term);
  assert.ok(diagnostic.dominant_affine_slope_term);
  assert.ok(diagnostic.strongest_pair_cancellation);
  assert.ok(
    [
      "source-affine-zero-preserves-strong-term-cancellation",
      "source-affine-zero-dominated-by-pairwise-term-cancellation",
      "source-affine-zero-needs-higher-order-covariance-proof",
    ].includes(diagnostic.source_covariance_diagnosis)
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_h38_y44_source_covariance,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_h38_y44_source_covariance_collar,
    false
  );
  assert.equal(
    diagnostic.claim_boundary
      .certifies_h38_y44_source_covariance_producer_image_collar,
    false
  );
  assert.equal(
    diagnostic.claim_boundary
      .certifies_h38_y44_source_covariance_producer_centered_collar,
    false
  );
  assert.equal(
    diagnostic.claim_boundary
      .certifies_h38_y44_source_covariance_producer_centered_safety_search,
    false
  );
  assert.equal(
    diagnostic.claim_boundary
      .certifies_h38_y44_source_covariance_producer_centered_n38_collar_enclosure,
    false
  );
  assert.equal(
    diagnostic.claim_boundary
      .certifies_h38_y44_source_covariance_positive_n38_taylor_certificate,
    false
  );
  assert.equal(
    diagnostic.claim_boundary
      .certifies_h38_y44_source_covariance_positive_n38_sampled_fourth_difference,
    false
  );
  assert.equal(
    diagnostic.claim_boundary
      .certifies_h38_y44_source_covariance_positive_n38_m4_inflation_budget,
    false
  );
  assert.equal(
    diagnostic.claim_boundary
      .certifies_h38_y44_source_covariance_positive_n38_directed_interval_residual,
    false
  );
  assert.equal(
    diagnostic.claim_boundary
      .certifies_h38_y44_source_covariance_positive_n38_lagrange_remainder,
    false
  );
  assert.equal(
    diagnostic.source_covariance_h38_y44_n38_collar_enclosure_route
      .claim_boundary.certifies_h38_n38_graph_enclosure,
    false
  );
  assert.equal(
    diagnostic.source_covariance_h38_y44_n38_collar_enclosure_route
      .claim_boundary.certifies_s37_dependency_preserving_division,
    false
  );
  assert.equal(
    diagnostic.source_covariance_h38_y44_n38_collar_enclosure_route
      .claim_boundary.certifies_producer_collar_enclosure,
    false
  );
  assert.equal(
    diagnostic.source_covariance_positive_h38_y44_n38_collar_enclosure_route
      .claim_boundary.certifies_h38_n38_graph_enclosure,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_source_level_affine_zero,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 h38 y44 split M4 refinement ladder keeps sampled claims noncertifying", () => {
  const diagnostic =
    buildH39H38Y44SourceCovarianceSplitM4RefinementLadderCandidate({
      targetSpeedInterval: [3.02156, 3.02156007813],
      branch: "-",
      rootSubdivisions: 100,
      sourceStencilSubcellCounts: [5, 6],
      baseSourceStencilSubcellCount: 5,
      baseComparisonStencilIndex: 0,
      analysisRowOffset: 2,
      polynomialDegree: 2,
      h38NoiseSamples: [-1, 0, 1],
      outerRadius: 0.001,
      shiftedIndex: 1,
      seriesOrder: 60,
    });

  assert.deepEqual(
    validateH39H38Y44SourceCovarianceSplitM4RefinementLadder(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-h38-y44-source-covariance-split-m4-refinement-ladder-candidate-emitted"
  );
  assert.deepEqual(diagnostic.source_stencil_subcell_counts, [5, 6]);
  assert.equal(diagnostic.sampled_ladder_rows.length, 2);
  assert.equal(diagnostic.all_rows_validator_clean, true);
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(
    diagnostic.sampled_ladder_rows.every(
      (row) =>
        row.continuous_certificate_status === null ||
        row.continuous_certificate_status ===
        "continuous-directed-rounded-fourth-derivative-proof-open"
    ),
    true
  );
  assert.ok(
    diagnostic.sampled_ladder_rows.every(
      (row) =>
        row.split_triangle_sampled_to_equal_split_ceiling_ratio === null ||
        row.split_triangle_sampled_to_equal_split_ceiling_ratio >= 0
    )
  );
  assert.equal(
    typeof diagnostic.all_quartic_quotient_rows_inside_provider_target,
    "boolean"
  );
  assert.equal(
    diagnostic.all_quartic_quotient_rows_inside_provider_target,
    true
  );
  assert.equal(
    diagnostic
      .all_quartic_quotient_node_limit_proxy_rows_inside_provider_target,
    true
  );
  assert.equal(
    diagnostic
      .all_quartic_quotient_node_derivative_limit_rows_inside_provider_target,
    true
  );
  assert.equal(
    diagnostic
      .all_quartic_quotient_node_derivative_collar_targets_inside_sampled_headroom,
    true
  );
  assert.equal(
    diagnostic
      .all_quartic_quotient_node_derivative_collar_finite_polynomial_rows_inside_headroom,
    true
  );
  assert.equal(
    diagnostic
      .all_quartic_quotient_node_derivative_collar_directed_finite_polynomial_rows_inside_headroom,
    true
  );
  assert.equal(
    diagnostic
      .all_quartic_quotient_node_derivative_collar_true_stream_slack_rows_positive,
    true
  );
  assert.equal(
    diagnostic
      .all_quartic_quotient_node_derivative_collar_true_stream_excess_target_rows_positive,
    true
  );
  assert.ok(diagnostic.quartic_quotient_inside_row_count >= 0);
  assert.equal(
    diagnostic.quartic_quotient_inside_row_count,
    diagnostic.sampled_ladder_rows.length
  );
  assert.equal(
    diagnostic.quartic_quotient_node_limit_proxy_inside_row_count,
    diagnostic.sampled_ladder_rows.length
  );
  assert.equal(
    diagnostic.quartic_quotient_node_derivative_limit_inside_row_count,
    diagnostic.sampled_ladder_rows.length
  );
  assert.equal(
    diagnostic.quartic_quotient_node_derivative_collar_inside_row_count,
    diagnostic.sampled_ladder_rows.length
  );
  assert.equal(
    diagnostic
      .quartic_quotient_node_derivative_collar_finite_polynomial_inside_row_count,
    diagnostic.sampled_ladder_rows.length
  );
  assert.equal(
    diagnostic
      .quartic_quotient_node_derivative_collar_directed_finite_polynomial_inside_row_count,
    diagnostic.sampled_ladder_rows.length
  );
  assert.equal(
    diagnostic
      .quartic_quotient_node_derivative_collar_true_stream_slack_positive_row_count,
    diagnostic.sampled_ladder_rows.length
  );
  assert.equal(
    diagnostic
      .quartic_quotient_node_derivative_collar_true_stream_excess_target_positive_row_count,
    diagnostic.sampled_ladder_rows.length
  );
  assert.ok(
    diagnostic.max_quartic_quotient_split_stream_consistency_relative_gap <=
      1e-6
  );
  assert.ok(
    diagnostic
      .max_quartic_quotient_node_derivative_limit_split_stream_relative_gap <=
      1e-6
  );
  assert.ok(
    diagnostic
      .min_quartic_quotient_node_derivative_collar_product_derivative_abs_lower >
      0
  );
  assert.ok(
    diagnostic
      .max_quartic_quotient_node_derivative_collar_split_stream_sampled_ratio <
      1
  );
  assert.ok(
    diagnostic
      .max_quartic_quotient_node_derivative_collar_finite_polynomial_split_stream_ratio <
      1
  );
  assert.ok(
    diagnostic
      .max_quartic_quotient_node_derivative_collar_finite_polynomial_to_sampled_split_ratio >=
      1
  );
  assert.ok(
    diagnostic
      .max_quartic_quotient_node_derivative_collar_directed_finite_polynomial_split_stream_ratio <
      1
  );
  assert.ok(
    diagnostic
      .max_quartic_quotient_node_derivative_collar_directed_to_exact_finite_polynomial_split_ratio >=
      1
  );
  assert.ok(
    diagnostic
      .min_quartic_quotient_node_derivative_collar_true_stream_slack_ratio >
      0.99
  );
  assert.ok(
    diagnostic
      .min_quartic_quotient_node_derivative_collar_true_stream_excess_to_directed_ratio >
      400
  );
  assert.ok(
    diagnostic.max_quartic_quotient_split_triangle_abs_m4_to_ceiling_ratio <
      1
  );
  assert.ok(
    diagnostic.sampled_ladder_rows.every((row) =>
      [
        "quartic-quotient-refinement-row-inside-provider-target",
        "quartic-quotient-refinement-row-open",
        "quartic-quotient-refinement-row-unavailable",
      ].includes(row.quartic_quotient_row_status)
    )
  );
  assert.ok(
    diagnostic.sampled_ladder_rows.every(
      (row) =>
        row.quartic_quotient_split_triangle_abs_m4_to_ceiling_ratio ===
          null ||
        row.quartic_quotient_split_triangle_abs_m4_to_ceiling_ratio >= 0
    )
  );
  assert.ok(
    diagnostic.sampled_ladder_rows.some(
      (row) =>
        row.quartic_quotient_direct_consistency_status ===
        "positive-n38-quartic-direct-quotient-diagnostic-open"
    )
  );
  assert.ok(
    diagnostic.sampled_ladder_rows.every(
      (row) =>
        row.quartic_quotient_node_limit_proxy_status ===
          "positive-n38-quartic-node-limit-proxy-inside-provider-target" &&
        row.quartic_quotient_node_limit_proxy_row_count === 4
    )
  );
  assert.ok(
    diagnostic.sampled_ladder_rows.every(
      (row) =>
        row.quartic_quotient_node_derivative_limit_status ===
          "positive-n38-quartic-node-derivative-limit-inside-provider-target" &&
        row.quartic_quotient_node_derivative_limit_row_count === 4
    )
  );
  assert.ok(
    diagnostic.sampled_ladder_rows.every(
      (row) =>
        row.quartic_quotient_node_derivative_collar_target_status ===
          "positive-n38-quartic-node-derivative-collar-target-inside-sampled-headroom" &&
        row.quartic_quotient_node_derivative_collar_row_count === 4 &&
        row.quartic_quotient_min_node_derivative_collar_product_derivative_abs_lower >
          0 &&
        row.quartic_quotient_max_node_derivative_collar_split_stream_sampled_ratio <
          1 &&
        row.quartic_quotient_node_derivative_collar_finite_polynomial_status ===
          "positive-n38-quartic-node-derivative-collar-finite-polynomial-inside-headroom" &&
        row.quartic_quotient_max_node_derivative_collar_finite_polynomial_split_stream_ratio <
          1 &&
        row.quartic_quotient_max_node_derivative_collar_finite_polynomial_to_sampled_split_ratio >=
          1 &&
        row.quartic_quotient_node_derivative_collar_directed_finite_polynomial_status ===
          "positive-n38-quartic-node-derivative-collar-directed-finite-polynomial-inside-headroom" &&
        row.quartic_quotient_max_node_derivative_collar_directed_finite_polynomial_split_stream_ratio <
          1 &&
        row.quartic_quotient_max_node_derivative_collar_directed_to_exact_finite_polynomial_split_ratio >=
          1 &&
        row.quartic_quotient_node_derivative_collar_true_stream_slack_budget_status ===
          "positive-n38-quartic-node-derivative-collar-true-stream-slack-positive" &&
        row.quartic_quotient_min_node_derivative_collar_true_stream_slack_ratio >
          0.99 &&
        row.quartic_quotient_node_derivative_collar_true_stream_excess_target_status ===
          "positive-n38-quartic-node-derivative-collar-true-stream-excess-target-positive" &&
        row.quartic_quotient_min_node_derivative_collar_true_stream_excess_to_directed_ratio >
          400
    )
  );
  assert.equal(
    typeof diagnostic.quotient_refinement_interpretation,
    "string"
  );
  assert.equal(
    typeof diagnostic.node_limit_proxy_interpretation,
    "string"
  );
  assert.equal(
    typeof diagnostic.node_derivative_limit_interpretation,
    "string"
  );
  assert.equal(
    typeof diagnostic.node_derivative_collar_interpretation,
    "string"
  );
  assert.equal(
    typeof diagnostic.node_derivative_collar_finite_polynomial_interpretation,
    "string"
  );
  assert.equal(
    typeof diagnostic
      .node_derivative_collar_directed_finite_polynomial_interpretation,
    "string"
  );
  assert.equal(
    typeof diagnostic
      .node_derivative_collar_true_stream_slack_budget_interpretation,
    "string"
  );
  assert.equal(
    typeof diagnostic
      .node_derivative_collar_true_stream_excess_target_interpretation,
    "string"
  );
});

test("h39 h38 y44 signed affine target envelope replays the cancellation coordinate", () => {
  const diagnostic =
    buildH39H38Y44SignedAffineTargetEnvelopeDiagnosticCandidate({
      targetSpeedInterval: [3.02156, 3.02156007813],
      branch: "-",
      rootSubdivisions: 100,
      sourceStencilSubcellCount: 5,
      comparisonStencilIndex: 0,
      polynomialDegree: 2,
      h38NoiseSamples: [-1, 0, 1],
      referencePressureTargets: [1e13],
      safetySearchIterations: 8,
      outerRadius: 0.001,
      shiftedIndex: 1,
      seriesOrder: 44,
    });

  assert.deepEqual(
    validateH39H38Y44SignedAffineTargetEnvelopeDiagnostic(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-h38-y44-signed-affine-target-envelope-diagnostic-candidate-emitted"
  );
  assert.equal(diagnostic.shifted_index, 1);
  assert.equal(diagnostic.y_order, 44);
  assert.equal(diagnostic.comparison_row_count, 5);
  assert.equal(diagnostic.affine_zero_inside_sample_domain, true);
  assert.ok(Number.isFinite(diagnostic.signed_affine_slope));
  assert.ok(
    Math.abs(diagnostic.signed_affine_slope) >
      Math.abs(diagnostic.signed_affine_intercept)
  );
  assert.ok(
    diagnostic.affine_zero_replay.pressure <
      diagnostic.center_sample_replay.pressure
  );
  assert.ok(diagnostic.center_to_affine_zero_pressure_ratio > 1);
  assert.ok(diagnostic.max_sample_to_affine_zero_pressure_ratio > 1);
  assert.ok(
    diagnostic.pressure_reference_ladder.every(
      (entry) =>
        entry.target_pressure_role ===
        "reference-only; not a shifted R43 closure threshold"
    )
  );
  const referenceEntry = diagnostic.pressure_reference_ladder.find(
    (entry) => entry.label === "reference-pressure-10000000000000"
  );
  assert.ok(referenceEntry);
  assert.ok(referenceEntry.required_full_domain_shrink_factor > 1);
  assert.ok(referenceEntry.interval_replay_pressure > 0);
  assert.ok(referenceEntry.interval_replay_over_target_pressure > 0);
  assert.ok(referenceEntry.interval_replay_center_eliminated_pressure > 0);
  assert.ok(
    referenceEntry.interval_replay_center_eliminated_over_target_pressure > 0
  );
  assert.ok(
    Array.isArray(referenceEntry.interval_replay_source_coefficient_interval)
  );
  assert.ok(referenceEntry.amplification_correction_divisor >= 1);
  assert.ok(referenceEntry.amplification_corrected_half_width > 0);
  assert.ok(
    referenceEntry.amplification_corrected_interval_replay_pressure > 0
  );
  assert.ok(
    referenceEntry.amplification_corrected_interval_replay_over_target_pressure >
      0
  );
  assert.equal(referenceEntry.safety_search.safety_search_iterations, 8);
  assert.ok(referenceEntry.safety_search.target_closing_half_width > 0);
  assert.ok(referenceEntry.safety_search.target_closing_safety_divisor > 0);
  assert.ok(
    referenceEntry.safety_search.target_closing_replay_over_target_pressure <=
      1
  );
  assert.ok(
    referenceEntry.safety_search
      .target_closing_center_eliminated_over_target_pressure > 0
  );
  assert.equal(
    diagnostic.h38_producer_residual_coordinate_profile.row_count,
    diagnostic.comparison_row_count
  );
  assert.ok(diagnostic.producer_centered_full_hull_half_width >= 0);
  assert.ok(
    diagnostic.h38_producer_residual_coordinate_profile
      .residual_coordinate_interval_hull_width >= 0
  );
  assert.ok(referenceEntry.producer_coordinate_target_fit);
  assert.equal(
    referenceEntry.producer_coordinate_target_fit.row_count,
    diagnostic.comparison_row_count
  );
  assert.ok(
    referenceEntry.producer_coordinate_target_fit
      .required_interval_hull_shrink_factor > 0
  );
  assert.ok(referenceEntry.producer_centered_safety_search);
  assert.ok(
    referenceEntry.producer_centered_safety_search
      .center_hull_replay_pressure > 0
  );
  assert.ok(
    referenceEntry.producer_centered_safety_search
      .center_hull_replay_over_target_pressure > 0
  );
  assert.ok(
    referenceEntry.producer_centered_safety_search
      .target_closing_replay_over_target_pressure > 0
  );
  assert.ok(
    [
      "producer-center-hull-meets-reference-target",
      "producer-center-hull-exceeds-reference-target",
      "producer-centered-full-hull-meets-reference-target",
      "bisection-found-producer-centered-half-width-meeting-reference-target",
      "producer-center-hull-meets-reference-target-but-no-positive-width-found",
      "bisection-did-not-find-producer-centered-half-width-meeting-reference-target",
    ].includes(
      referenceEntry.producer_centered_safety_search.safety_search_status
    )
  );
  assert.ok(referenceEntry.producer_centered_collar_target);
  assert.equal(
    referenceEntry.producer_centered_collar_target.label,
    referenceEntry.label
  );
  assert.ok(
    referenceEntry.producer_centered_collar_target
      .collar_residual_coordinate_width >= 0
  );
  assert.equal(
    referenceEntry.producer_centered_collar_target
      .producer_midpoint_hull_inside_collar,
    true
  );
  assert.equal(
    typeof referenceEntry.producer_centered_collar_target
      .producer_interval_hull_inside_collar,
    "boolean"
  );
  assert.ok(
    referenceEntry.producer_centered_collar_target
      .required_interval_hull_compression_factor === null ||
      referenceEntry.producer_centered_collar_target
        .required_interval_hull_compression_factor > 0
  );
  assert.ok(
    [
      "producer-interval-hull-inside-collar",
      "positive-midpoint-collar-full-interval-open",
      "midpoint-only-collar-full-interval-open",
      "producer-midpoint-hull-outside-collar",
    ].includes(referenceEntry.producer_centered_collar_target.target_status)
  );
  assert.ok(
    [
      "current-producer-interval-hull-already-fits-collar",
      "linear-subcell-refinement-impractical-analytic-covariance-needed",
      "positive-collar-gives-finite-producer-image-certificate-target",
      "center-hull-only-collar-needs-positive-width-or-producer-image-proof",
    ].includes(
      referenceEntry.producer_centered_collar_target
        .refinement_interpretation
    )
  );
  assert.ok(diagnostic.h38_y44_solve_width_profile);
  assert.equal(diagnostic.h38_y44_solve_width_profile.h_index, 38);
  assert.equal(
    diagnostic.h38_y44_solve_width_profile.sample_count,
    diagnostic.comparison_row_count
  );
  assert.ok(
    diagnostic.h38_y44_solve_width_profile
      .numerator_only_to_full_solve_width_ratio > 0
  );
  assert.ok(diagnostic.h38_y44_numerator_polynomial_diagnostic);
  assert.equal(
    diagnostic.h38_y44_numerator_polynomial_diagnostic.polynomial_degree,
    diagnostic.polynomial_degree
  );
  assert.ok(
    diagnostic.h38_y44_numerator_polynomial_diagnostic
      .max_numerator_interval_width > 0
  );
  assert.ok(referenceEntry.producer_centered_numerator_collar_target);
  assert.equal(
    referenceEntry.producer_centered_numerator_collar_target.label,
    referenceEntry.label
  );
  assert.equal(
    referenceEntry.producer_centered_numerator_collar_target
      .numerator_polynomial_degree,
    diagnostic.polynomial_degree
  );
  assert.ok(
    referenceEntry.producer_centered_numerator_collar_target
      .h38_residual_collar_width >= 0
  );
  assert.equal(
    typeof referenceEntry.producer_centered_numerator_collar_target
      .numerator_midpoint_graph_inside_collar_target,
    "boolean"
  );
  assert.ok(
    referenceEntry.producer_centered_numerator_collar_target
      .max_numerator_interval_compression_to_conservative_target === null ||
      referenceEntry.producer_centered_numerator_collar_target
        .max_numerator_interval_compression_to_conservative_target > 0
  );
  assert.ok(
    referenceEntry.producer_centered_numerator_collar_target
      .max_numerator_midpoint_residual_over_conservative_target === null ||
      referenceEntry.producer_centered_numerator_collar_target
        .max_numerator_midpoint_residual_over_conservative_target >= 0
  );
  assert.ok(
    [
      "degenerate-collar-no-numerator-target",
      "numerator-interval-hull-inside-collar-target",
      "numerator-midpoint-graph-inside-collar-target-interval-open",
      "numerator-midpoint-graph-exceeds-collar-target",
    ].includes(
      referenceEntry.producer_centered_numerator_collar_target.target_status
    )
  );
  assert.ok(
    [
      "numerator-graph-residual-certificate-can-target-producer-collar",
      "current-numerator-interval-hull-already-fits-producer-collar",
      "s37-lower-bound-dependency-collapse-before-numerator-collar",
      "numerator-graph-degree-or-local-coordinate-must-tighten",
      "positive-producer-collar-needed-before-numerator-target",
    ].includes(
      referenceEntry.producer_centered_numerator_collar_target
        .proof_route_interpretation
    )
  );
  assert.ok(
    diagnostic.max_required_producer_interval_hull_shrink_factor > 0
  );
  assert.ok(
    diagnostic.max_required_producer_midpoint_hull_shrink_factor >= 0
  );
  assert.ok(
    diagnostic
      .max_producer_centered_reference_center_hull_over_target_pressure > 0
  );
  assert.ok(
    diagnostic.max_producer_centered_reference_replay_over_target_pressure > 0
  );
  assert.ok(diagnostic.producer_centered_reference_target_count > 0);
  assert.ok(
    diagnostic.producer_centered_reference_targets_met_at_center >= 0
  );
  assert.ok(
    diagnostic.producer_centered_reference_targets_closed_by_search >= 0
  );
  assert.ok(
    diagnostic.producer_centered_reference_positive_collar_count >= 0
  );
  assert.ok(
    diagnostic.producer_centered_reference_interval_hull_covered_count >= 0
  );
  assert.ok(
    diagnostic
      .max_producer_centered_reference_collar_required_interval_hull_compression_factor ===
      null ||
      diagnostic
        .max_producer_centered_reference_collar_required_interval_hull_compression_factor >
        0
  );
  assert.ok(
    diagnostic
      .max_producer_centered_reference_collar_linear_subcell_forecast ===
      null ||
      diagnostic
        .max_producer_centered_reference_collar_linear_subcell_forecast > 0
  );
  assert.ok(
    diagnostic.producer_centered_reference_numerator_graph_inside_count >= 0
  );
  assert.ok(
    diagnostic
      .max_producer_centered_reference_numerator_interval_compression_to_conservative_target ===
      null ||
      diagnostic
        .max_producer_centered_reference_numerator_interval_compression_to_conservative_target >
        0
  );
  assert.ok(
    diagnostic
      .max_producer_centered_reference_numerator_midpoint_residual_over_conservative_target ===
      null ||
      diagnostic
        .max_producer_centered_reference_numerator_midpoint_residual_over_conservative_target >=
        0
  );
  assert.ok(
    diagnostic
      .min_producer_centered_reference_numerator_midpoint_residual_headroom_factor ===
      null ||
      diagnostic
        .min_producer_centered_reference_numerator_midpoint_residual_headroom_factor >
        0
  );
  assert.ok(diagnostic.h38_y44_n38_collar_enclosure_route);
  assert.equal(
    diagnostic.h38_y44_n38_collar_enclosure_route.status,
    "h39-h38-y44-n38-collar-enclosure-route-candidate-emitted"
  );
  assert.equal(
    diagnostic.h38_y44_n38_collar_enclosure_route.polynomial_degree,
    diagnostic.polynomial_degree
  );
  assert.equal(
    diagnostic.h38_y44_n38_collar_enclosure_route.reference_target_count,
    diagnostic.producer_centered_reference_target_count
  );
  assert.ok(
    diagnostic.h38_y44_n38_collar_enclosure_route
      .max_midpoint_residual_over_conservative_target === null ||
      diagnostic.h38_y44_n38_collar_enclosure_route
        .max_midpoint_residual_over_conservative_target >= 0
  );
  assert.ok(
    diagnostic.h38_y44_n38_collar_enclosure_route
      .min_midpoint_residual_headroom_factor === null ||
      diagnostic.h38_y44_n38_collar_enclosure_route
        .min_midpoint_residual_headroom_factor > 0
  );
  assert.ok(
    diagnostic.h38_y44_n38_collar_enclosure_route.controlling_sample ===
      null ||
      diagnostic.h38_y44_n38_collar_enclosure_route.controlling_sample
        .conservative_numerator_width_target > 0
  );
  assert.ok(
    [
      "n38-quadratic-midpoint-residual-has-directed-rounded-collar-headroom",
      "s37-lower-bound-dependency-collapse-controls-n38-collar-route",
      "n38-quadratic-midpoint-residual-has-partial-collar-headroom",
      "n38-quadratic-midpoint-residual-collar-route-open",
    ].includes(
      diagnostic.h38_y44_n38_collar_enclosure_route.route_diagnosis
    )
  );
  assert.ok(
    [
      "midpoint-slope-collar-fits-but-conservative-s37-lower-bound-collapses",
      "midpoint-slope-collar-also-fails-n38-graph-residual",
      "conservative-s37-lower-bound-supports-n38-collar",
      "s37-dependency-status-open",
    ].includes(
      diagnostic.h38_y44_n38_collar_enclosure_route.s37_dependency_status
    )
  );
  assert.equal(
    diagnostic.h38_y44_n38_collar_enclosure_route.claim_boundary
      .certifies_h38_n38_graph_enclosure,
    false
  );
  assert.equal(
    diagnostic.h38_y44_n38_collar_enclosure_route.claim_boundary
      .certifies_s37_dependency_preserving_division,
    false
  );
  assert.ok(diagnostic.max_interval_replay_over_target_pressure > 0);
  assert.ok(
    diagnostic.max_interval_replay_center_eliminated_over_target_pressure > 0
  );
  assert.ok(
    diagnostic.max_nonzero_width_interval_replay_over_target_pressure > 0
  );
  assert.ok(
    diagnostic.max_amplification_corrected_interval_replay_over_target_pressure >
      0
  );
  assert.ok(
    diagnostic
      .max_amplification_corrected_center_eliminated_over_target_pressure >
      0
  );
  assert.ok(
    diagnostic
      .max_amplification_corrected_nonzero_width_interval_replay_over_target_pressure >
      0
  );
  assert.equal(diagnostic.safety_search_iterations, 8);
  assert.ok(diagnostic.max_target_closing_safety_divisor > 0);
  assert.ok(diagnostic.safety_divisor_over_observed_amplification > 0);
  assert.ok(diagnostic.max_target_closing_bracket_width >= 0);
  assert.ok(diagnostic.max_safety_search_replay_over_target_pressure <= 1);
  assert.ok(
    diagnostic.max_safety_search_center_eliminated_over_target_pressure > 0
  );
  assert.ok(
    [
      "zero-centered-h38-interval-replay-meets-reference-pressure-ladder",
      "zero-centered-h38-interval-replay-has-stable-over-target-amplification",
    ].includes(diagnostic.interval_replay_amplification_interpretation)
  );
  assert.ok(
    [
      "amplification-corrected-zero-centered-widths-meet-reference-pressure-ladder",
      "amplification-corrected-zero-centered-widths-still-exceed-reference-pressure-ladder",
    ].includes(diagnostic.amplification_corrected_replay_interpretation)
  );
  assert.equal(
    diagnostic.safety_search_interpretation,
    "bisection-safety-divisor-finds-reference-meeting-widths"
  );
  assert.ok(
    [
      "center-eliminated-affine-row-removes-zero-centered-amplification",
      "center-eliminated-affine-row-still-exceeds-reference-pressure-ladder",
    ].includes(diagnostic.center_eliminated_replay_interpretation)
  );
  assert.ok(
    [
      "h38-producer-coordinate-hull-fits-signed-affine-safety-envelope",
      "h38-producer-midpoint-hull-fits-but-interval-hull-exceeds-signed-affine-safety-envelope",
      "h38-producer-coordinate-hull-exceeds-signed-affine-safety-envelope",
    ].includes(diagnostic.producer_coordinate_envelope_interpretation)
  );
  assert.ok(
    [
      "producer-midpoint-hull-meets-reference-pressure-targets",
      "producer-centered-width-search-closes-some-reference-pressure-targets",
      "producer-midpoint-hull-exceeds-reference-pressure-targets",
    ].includes(diagnostic.producer_centered_replay_interpretation)
  );
  assert.ok(
    [
      "producer-centered-collars-cover-full-interval-hull",
      "positive-collars-found-but-raw-subcell-refinement-impractical",
      "positive-collars-found-for-producer-image-certificate-target",
      "producer-center-hull-closes-but-positive-collar-open",
    ].includes(diagnostic.producer_centered_collar_interpretation)
  );
  assert.ok(
    [
      "numerator-midpoint-graph-fits-producer-collar-target",
      "some-numerator-midpoint-graphs-fit-producer-collar-target",
      "numerator-midpoint-graph-does-not-yet-fit-producer-collar-target",
    ].includes(diagnostic.producer_centered_numerator_collar_interpretation)
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_h38_y44_signed_affine_envelope,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 h38 y44 N38 terminal endpoint bridge compares normal form to live collar", () => {
  const diagnostic =
    buildH39H38Y44N38TerminalEndpointBridgeDiagnosticCandidate({
      targetSpeedInterval: [3.02156, 3.02156007813],
      branch: "-",
      rootSubdivisions: 100,
      sourceStencilSubcellCount: 5,
      comparisonStencilIndex: 0,
      polynomialDegree: 2,
      h38NoiseSamples: [-1, 0, 1],
      referencePressureTargets: [1e13],
      safetySearchIterations: 4,
      terminalHIndexes: [37, 36, 35],
      residualBudgetTargetShareOfAll: 0.05,
      residualBudgetScales: [0, 0.05, 1],
      residualNoiseSamples: [-1, 0, 1],
      residualCoordinatePartitionCount: 4,
      topContributorCount: 4,
      outerRadius: 0.001,
      shiftedIndex: 1,
      seriesOrder: 60,
    });

  assert.deepEqual(
    validateH39H38Y44N38TerminalEndpointBridgeDiagnostic(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-h38-y44-n38-terminal-endpoint-bridge-diagnostic-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-h39-h38-y44-n38-terminal-endpoint-bridge-diagnostic"
  );
  assert.equal(diagnostic.shifted_index, 1);
  assert.equal(diagnostic.y_order, 44);
  assert.equal(diagnostic.h38_numerator_y_order, 42);
  assert.equal(diagnostic.comparison_row_count, 5);
  assert.deepEqual(diagnostic.terminal_provider_h_indexes, [37, 36, 35]);
  assert.equal(diagnostic.residual_coordinate_partition_count, 4);
  assert.ok(
    diagnostic.controlling_y44_target.conservative_numerator_width_target > 0
  );
  assert.ok(
    diagnostic.terminal_normal_form_bridge.all_active_n38_source_width > 0
  );
  assert.ok(
    diagnostic.terminal_normal_form_bridge
      .h39_required_width_share_of_all_active_n38_source > 0
  );
  assert.ok(
    diagnostic.terminal_normal_form_bridge
      .affine_zeta_envelope_width_to_conservative_h39_target > 0
  );
  assert.equal(
    diagnostic.terminal_normal_form_bridge.endpoint_control_candidate,
    true
  );
  assert.equal(
    diagnostic.terminal_normal_form_bridge
      .affine_in_shared_residual_coordinate,
    true
  );
  assert.ok(
    [
      "terminal-graph-affine-endpoint-provider-fits-live-h39-collar-candidate",
      "terminal-graph-normal-form-fits-live-h39-collar-but-zeta-envelope-too-wide",
      "terminal-graph-normal-form-still-exceeds-live-h39-collar",
    ].includes(diagnostic.n38_terminal_endpoint_bridge_diagnosis)
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_n38_terminal_endpoint_bridge,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.deepEqual(collectTrueCertifies(diagnostic), []);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 h38 expression-level N38 terminal graph remainder budget sets finite candidate target", () => {
  const diagnostic =
    buildH39H38ExpressionN38TerminalGraphRemainderBudgetDiagnosticCandidate({
      targetSpeedInterval: [3.02156, 3.02156007813],
      branch: "-",
      rootSubdivisions: 100,
      sourceStencilSubcellCount: 32,
      comparisonStencilIndex: 27,
      polynomialDegree: 2,
      terminalHIndexes: [37, 36, 35],
      residualBudgetTargetShareOfAll: 0.05,
      residualBudgetScales: [0, 0.02, 0.05, 1],
      residualNoiseSamples: [-1, -0.5, 0, 0.5, 1],
      residualCoordinatePartitionCount: 8,
      refinementSubcellCounts: [32],
      topContributorCount: 8,
      seriesOrder: 60,
      progressCallback: h39TerminalGraphProgressLogger(
        "H39 terminal graph remainder budget"
      ),
    });

  assert.deepEqual(
    validateH39H38ExpressionN38TerminalGraphRemainderBudgetDiagnostic(
      diagnostic
    ),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-h38-expression-n38-terminal-graph-remainder-budget-diagnostic-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-h38-expression-n38-terminal-graph-remainder-budget-diagnostic"
  );
  assert.equal(
    diagnostic.proof_status,
    "finite-terminal-graph-remainder-budget-not-directed-rounded-provider-certificate"
  );
  assert.equal(
    diagnostic.n38_terminal_graph_remainder_budget_diagnosis,
    "terminal-graph-remainder-affine-zeta-endpoint-partition-route-candidate"
  );
  assert.deepEqual(diagnostic.terminal_provider_h_indexes, [37, 36, 35]);
  assert.equal(diagnostic.residual_budget_target_share_of_all, 0.05);
  assert.deepEqual(diagnostic.residual_budget_scales, [0, 0.02, 0.05, 1]);
  assert.deepEqual(diagnostic.residual_noise_samples, [-1, -0.5, 0, 0.5, 1]);
  assert.equal(diagnostic.residual_coordinate_partition_count, 8);
  assert.deepEqual(diagnostic.refinement_subcell_counts, [32]);

  const summary = diagnostic.terminal_graph_remainder_budget_summary;
  assert.equal(summary.row_count, 5);
  assert.deepEqual(summary.terminal_provider_h_indexes, [37, 36, 35]);
  assert.equal(summary.all_rows_h38_solve_target_zeroed, true);
  assert.equal(summary.all_rows_form_sigma_before_h_row_substitution, true);
  assert.equal(summary.all_rows_terminal_rows_dominate, true);
  assert.equal(summary.all_rows_graph_plus_nonterminal_under_target, true);
  assert.equal(summary.all_rows_raw_interval_residual_over_target, true);
  assert.equal(
    summary.all_rows_symmetric_raw_residual_scale_one_over_target,
    true
  );
  assert.equal(summary.all_rows_have_finite_residual_scale_budget, true);
  assert.equal(
    summary.all_rows_midpoint_fit_residual_below_symmetric_budget,
    true
  );
  assert.equal(
    summary.all_rows_producer_intervals_contained_by_allowed_budget,
    false
  );
  assert.equal(summary.all_rows_producer_interval_budget_no_go, true);
  assert.equal(
    summary.all_rows_midpoint_fit_residuals_inside_allowed_budget,
    true
  );
  assert.ok(summary.min_terminal_width_share_of_all > 0.95);
  assert.ok(summary.max_nonterminal_width_share_of_all < 0.05);
  assert.ok(summary.max_graph_plus_nonterminal_width_share_of_all < 0.05);
  assert.ok(
    summary.min_raw_interval_residual_width_share_of_terminal > 0.9
  );
  assert.ok(
    summary.min_allowed_symmetric_raw_residual_scale_for_target > 0.02
  );
  assert.ok(
    summary.max_allowed_symmetric_raw_residual_scale_for_target < 0.03
  );
  assert.ok(summary.max_midpoint_fit_residual_scale_to_raw < 1e-9);
  assert.ok(summary.max_required_scale_to_allowed_scale_ratio > 40);
  assert.ok(summary.max_required_scale_to_allowed_scale_ratio < 50);
  assert.equal(
    summary.all_rows_shared_residual_sample_hull_under_target,
    false
  );
  assert.equal(
    summary.all_rows_correlated_terminal_residual_under_target,
    false
  );
  assert.ok(summary.max_shared_residual_sample_hull_width_share_of_all > 0.1);
  assert.ok(summary.max_shared_residual_sample_hull_width_share_of_all < 0.25);
  assert.ok(
    summary.min_interval_to_shared_residual_sample_hull_width_ratio > 5
  );
  assert.ok(
    summary.min_interval_to_shared_residual_sample_hull_width_ratio < 6
  );
  assert.ok(
    summary.max_correlated_terminal_residual_width_share_of_all < 0.05
  );
  assert.ok(
    summary.min_interval_to_correlated_terminal_residual_width_ratio > 5
  );
  assert.ok(
    summary.min_interval_to_correlated_terminal_residual_width_ratio < 6
  );
  assert.equal(
    summary.correlated_terminal_residual_route_interpretation,
    "shared-terminal-residual-coordinate-needs-small-partition"
  );
  assert.ok(
    summary.max_projected_residual_coordinate_partition_count_for_target > 1
  );
  assert.ok(
    summary.max_projected_residual_coordinate_partition_count_for_target <= 16
  );
  assert.ok(
    summary
      .max_projected_residual_coordinate_partitioned_hull_width_share_of_all <
      0.05
  );
  assert.equal(
    summary.all_rows_correlated_terminal_residual_partitions_under_target,
    false
  );
  assert.equal(
    summary.all_rows_correlated_terminal_residual_graph_partitions_under_target,
    false
  );
  assert.equal(
    summary
      .all_rows_correlated_terminal_residual_endpoint_partitions_under_target,
    true
  );
  assert.equal(
    summary
      .all_rows_correlated_terminal_residual_graph_endpoint_partitions_under_target,
    true
  );
  assert.equal(
    summary.all_rows_correlated_terminal_residual_affine_envelopes_under_target,
    true
  );
  assert.equal(
    summary
      .all_rows_correlated_terminal_residual_graph_affine_envelopes_under_target,
    true
  );
  assert.equal(
    summary
      .all_rows_correlated_terminal_residual_midpoint_linearity_checks_pass,
    true
  );
  assert.equal(
    summary
      .all_rows_correlated_terminal_residual_graph_midpoint_linearity_checks_pass,
    true
  );
  assert.equal(
    summary.all_rows_correlated_terminal_residual_affine_endpoint_control,
    true
  );
  assert.equal(
    summary.terminal_zeta_degree_bound_summary.source_coefficient_y_order,
    42
  );
  assert.equal(
    summary.terminal_zeta_degree_bound_summary
      .max_shared_residual_power_by_y_order,
    1
  );
  assert.equal(
    summary.terminal_zeta_degree_bound_summary
      .min_two_terminal_factor_gap_to_source_order,
    34
  );
  assert.equal(
    summary.terminal_zeta_degree_bound_summary
      .all_rows_affine_in_shared_residual_coordinate,
    true
  );
  assert.equal(
    summary.terminal_zeta_degree_bound_summary.route_interpretation,
    "shared-terminal-residual-zeta-affine-by-y-order-gap"
  );
  assert.equal(summary.max_residual_coordinate_partition_count, 8);
  assert.equal(summary.max_graph_residual_coordinate_partition_count, 8);
  assert.ok(
    summary.max_correlated_terminal_residual_partition_width_share_of_all > 0.1
  );
  assert.ok(
    summary.max_correlated_terminal_residual_partition_width_share_of_all <
      0.25
  );
  assert.ok(
    summary
      .max_correlated_terminal_residual_graph_partition_width_share_of_all > 0.1
  );
  assert.ok(
    summary
      .max_correlated_terminal_residual_graph_partition_width_share_of_all <
      0.25
  );
  assert.ok(
    summary
      .max_correlated_terminal_residual_endpoint_partition_width_share_of_all >
      0.04
  );
  assert.ok(
    summary
      .max_correlated_terminal_residual_endpoint_partition_width_share_of_all <
      0.05
  );
  assert.ok(
    summary
      .max_correlated_terminal_residual_graph_endpoint_partition_width_share_of_all >
      0.04
  );
  assert.ok(
    summary
      .max_correlated_terminal_residual_graph_endpoint_partition_width_share_of_all <
      0.05
  );
  assert.ok(
    summary
      .max_correlated_terminal_residual_affine_envelope_width_share_of_all <
      0.05
  );
  assert.ok(
    summary
      .max_correlated_terminal_residual_graph_affine_envelope_width_share_of_all <
      0.05
  );
  assert.ok(
    summary
      .max_correlated_terminal_residual_affine_envelope_slope_abs_upper > 0
  );
  assert.ok(
    summary
      .max_correlated_terminal_residual_graph_affine_envelope_slope_abs_upper >
      0
  );
  assert.ok(
    summary
      .max_correlated_terminal_residual_midpoint_linearity_gap_abs_upper >= 0
  );
  assert.ok(
    summary
      .max_correlated_terminal_residual_graph_midpoint_linearity_gap_abs_upper >=
      0
  );
  assert.equal(
    summary.correlated_terminal_residual_partition_route_interpretation,
    "shared-terminal-residual-coordinate-affine-endpoint-partition-closes-graph-xi-candidate"
  );
  assert.ok(summary.min_allowed_radius_to_producer_half_width_ratio > 0.02);
  assert.ok(summary.min_allowed_radius_to_producer_half_width_ratio < 0.03);
  assert.ok(summary.max_midpoint_fit_residual_to_allowed_radius_ratio < 1e-8);
  assert.equal(
    summary.route_interpretation,
    "terminal-graph-remainder-budget-localizes-enclosure-failure-to-producer-interval-width"
  );

  diagnostic.terminal_graph_remainder_budget_rows.forEach((row) => {
    assert.deepEqual(row.terminal_provider_h_indexes, [37, 36, 35]);
    assert.equal(row.h38_solve_target_zeroed, true);
    assert.ok(row.terminal_width_share_of_all > 0.95);
    assert.ok(row.nonterminal_width_share_of_all < 0.05);
    assert.ok(row.terminal_graph_with_nonterminal_width_share_of_all < 0.05);
    assert.ok(row.allowed_symmetric_raw_residual_scale_for_target > 0.02);
    assert.ok(row.allowed_symmetric_raw_residual_scale_for_target < 0.03);
    assert.ok(
      row.max_midpoint_fit_residual_scale_to_raw <
        row.allowed_symmetric_raw_residual_scale_for_target
    );
    assert.equal(row.graph_plus_nonterminal_under_target, true);
    assert.equal(row.symmetric_raw_residual_scale_one_over_target, true);
    assert.equal(row.raw_interval_residual_with_nonterminal_over_target, true);
    assert.equal(row.shared_residual_sample_hull_under_target, false);
    assert.equal(row.correlated_terminal_residual_under_target, false);
    assert.equal(row.correlated_terminal_residual_collapse_candidate, false);
    assert.ok(
      row.max_terminal_graph_correlated_residual_width_share_of_all < 0.05
    );
    assert.ok(row.interval_to_correlated_terminal_residual_width_ratio > 5);
    assert.ok(row.interval_to_correlated_terminal_residual_width_ratio < 6);
    assert.equal(
      row.terminal_graph_shared_residual_sample_diagnostic
        .sample_coefficient_hull_under_target,
      false
    );
    assert.ok(
      row.terminal_graph_shared_residual_sample_diagnostic
        .sample_coefficient_hull_width_share_of_all > 0.1
    );
    assert.ok(
      row.terminal_graph_shared_residual_sample_diagnostic
        .sample_coefficient_hull_width_share_of_all < 0.25
    );
    assert.equal(
      row.terminal_graph_shared_residual_sample_diagnostic
        .route_interpretation,
      "shared-terminal-residual-coordinate-needs-small-partition"
    );
    assert.ok(
      row.terminal_graph_shared_residual_sample_diagnostic
        .projected_residual_coordinate_partition_count_for_target > 1
    );
    assert.ok(
      row.terminal_graph_shared_residual_sample_diagnostic
        .projected_residual_coordinate_partition_count_for_target <= 16
    );
    assert.ok(
      row.terminal_graph_shared_residual_sample_diagnostic
        .projected_residual_coordinate_partitioned_hull_width_share_of_all <
        0.05
    );
    assert.equal(
      row.terminal_graph_shared_residual_point_partition_diagnostic
        .residual_coordinate_partition_count,
      8
    );
    assert.equal(
      row.terminal_graph_shared_residual_graph_partition_diagnostic
        .residual_coordinate_partition_count,
      8
    );
    assert.equal(
      row.terminal_graph_shared_residual_point_partition_diagnostic
        .all_partitions_under_target,
      false
    );
    assert.equal(
      row.terminal_graph_shared_residual_graph_partition_diagnostic
        .all_partitions_under_target,
      false
    );
    assert.ok(
      row.terminal_graph_shared_residual_point_partition_diagnostic
        .max_partition_width_share_of_all > 0.1
    );
    assert.ok(
      row.terminal_graph_shared_residual_point_partition_diagnostic
        .max_partition_width_share_of_all < 0.25
    );
    assert.ok(
      row.terminal_graph_shared_residual_graph_partition_diagnostic
        .max_partition_width_share_of_all > 0.1
    );
    assert.ok(
      row.terminal_graph_shared_residual_graph_partition_diagnostic
        .max_partition_width_share_of_all < 0.25
    );
    assert.equal(
      row.terminal_graph_shared_residual_point_endpoint_partition_diagnostic
        .all_endpoint_partition_hulls_under_target,
      true
    );
    assert.equal(
      row.terminal_graph_shared_residual_point_endpoint_partition_diagnostic
        .endpoint_control_candidate,
      true
    );
    assert.equal(
      row.terminal_graph_shared_residual_point_endpoint_partition_diagnostic
        .terminal_zeta_degree_bound.min_terminal_y_order,
      38
    );
    assert.equal(
      row.terminal_graph_shared_residual_point_endpoint_partition_diagnostic
        .terminal_zeta_degree_bound.two_terminal_factor_min_y_order,
      76
    );
    assert.equal(
      row.terminal_graph_shared_residual_point_endpoint_partition_diagnostic
        .terminal_zeta_degree_bound.max_shared_residual_power_by_y_order,
      1
    );
    assert.equal(
      row.terminal_graph_shared_residual_point_endpoint_partition_diagnostic
        .terminal_zeta_degree_bound.route_interpretation,
      "shared-terminal-residual-zeta-affine-by-y-order-gap"
    );
    assert.equal(
      row.terminal_graph_shared_residual_graph_endpoint_partition_diagnostic
        .all_endpoint_partition_hulls_under_target,
      true
    );
    assert.ok(
      row.terminal_graph_shared_residual_point_endpoint_partition_diagnostic
        .max_endpoint_partition_hull_width_share_of_all < 0.05
    );
    assert.ok(
      row.terminal_graph_shared_residual_graph_endpoint_partition_diagnostic
        .max_endpoint_partition_hull_width_share_of_all < 0.05
    );
    assert.equal(
      row.terminal_graph_shared_residual_graph_endpoint_partition_diagnostic
        .all_affine_zeta_envelopes_under_target,
      true
    );
    assert.ok(
      row.terminal_graph_shared_residual_graph_endpoint_partition_diagnostic
        .max_affine_zeta_envelope_width_share_of_all < 0.05
    );
    assert.ok(
      row.terminal_graph_shared_residual_graph_endpoint_partition_diagnostic
        .max_affine_zeta_envelope_slope_abs_upper > 0
    );
    assert.equal(
      row.residual_coordinate_partition_route_interpretation,
      "shared-terminal-residual-coordinate-affine-endpoint-partition-closes-graph-xi-candidate"
    );
    assert.equal(
      row.terminal_graph_correlated_residual_partition_replays.length,
      8
    );
    assert.equal(
      row.terminal_graph_correlated_residual_graph_partition_replays.length,
      8
    );
    row.terminal_graph_correlated_residual_partition_replays.forEach(
      (partition) => {
        assert.equal(partition.replay.h38_solve_target_zeroed, true);
        assert.equal(
          partition.replay.coordinate_route,
          "sigma-eta-before-h-row-substitution"
        );
        assert.equal(partition.replay.sigma_h_tail_max_abs_upper, 0);
      }
    );
    row.terminal_graph_correlated_residual_graph_endpoint_partition_replays.forEach(
      (partition) => {
        assert.equal(partition.endpoint_hull_under_target, true);
        assert.equal(partition.affine_zeta_envelope_under_target, true);
        assert.equal(partition.midpoint_linearity_check_passed, true);
        assert.ok(partition.midpoint_linearity_gap_abs_upper >= 0);
        assert.ok(partition.affine_zeta_envelope.slope_abs_upper > 0);
        assert.deepEqual(
          partition.affine_zeta_envelope.endpoint_hull,
          partition.endpoint_coefficient_hull
        );
        assert.equal(
          partition.midpoint_replay.replay.h38_solve_target_zeroed,
          true
        );
        assert.equal(
          partition.midpoint_replay.replay.coordinate_route,
          "sigma-eta-before-h-row-substitution"
        );
        assert.equal(
          partition.midpoint_replay.replay.sigma_h_tail_max_abs_upper,
          0
        );
        partition.endpoint_replays.forEach((endpoint) => {
          assert.equal(endpoint.replay.h38_solve_target_zeroed, true);
          assert.equal(
            endpoint.replay.coordinate_route,
            "sigma-eta-before-h-row-substitution"
          );
          assert.equal(endpoint.replay.sigma_h_tail_max_abs_upper, 0);
        });
      }
    );
    assert.equal(
      row.terminal_graph_correlated_residual_sample_replays.length,
      diagnostic.residual_noise_samples.length
    );
    row.terminal_graph_correlated_residual_sample_replays.forEach((sample) => {
      assert.ok(
        diagnostic.residual_noise_samples.includes(sample.residual_noise)
      );
      assert.equal(sample.replay.h38_solve_target_zeroed, true);
      assert.equal(
        sample.replay.coordinate_route,
        "sigma-eta-before-h-row-substitution"
      );
      assert.equal(sample.replay.sigma_h_tail_max_abs_upper, 0);
    });
    assert.equal(row.midpoint_fit_residual_below_symmetric_budget, true);
    assert.equal(
      row.all_terminal_producer_intervals_contained_by_allowed_budget,
      false
    );
    assert.equal(
      row.all_terminal_midpoint_fit_residuals_inside_allowed_budget,
      true
    );
    assert.ok(row.max_required_scale_to_allowed_scale_ratio > 40);
    assert.ok(row.max_required_scale_to_allowed_scale_ratio < 50);
    assert.ok(row.min_allowed_radius_to_producer_half_width_ratio > 0.02);
    assert.ok(row.min_allowed_radius_to_producer_half_width_ratio < 0.03);
    assert.ok(row.max_midpoint_fit_residual_to_allowed_radius_ratio < 1e-8);
    assert.equal(
      row.terminal_graph_symmetric_residual_scale_one_replay
        .h38_solve_target_zeroed,
      true
    );
    assert.equal(
      row.terminal_graph_interval_residual_with_nonterminal_replay
        .h38_solve_target_zeroed,
      true
    );
    const scaleZero = row.residual_scale_sweep.find(
      (entry) => entry.residual_scale === 0
    );
    const scale002 = row.residual_scale_sweep.find(
      (entry) => entry.residual_scale === 0.02
    );
    const scale005 = row.residual_scale_sweep.find(
      (entry) => entry.residual_scale === 0.05
    );
    const scaleOne = row.residual_scale_sweep.find(
      (entry) => entry.residual_scale === 1
    );
    assert.equal(scaleZero.under_target, true);
    assert.equal(scale002.under_target, true);
    assert.equal(scale005.under_target, false);
    assert.equal(scaleOne.under_target, false);
    row.terminal_graph_remainder_budget_entries.forEach((entry) => {
      assert.ok([37, 36, 35].includes(entry.h_index));
      assert.ok(entry.raw_residual_abs_upper > 0);
      assert.equal(entry.producer_interval_contained_by_budget, false);
      assert.ok(
        entry.required_symmetric_raw_residual_scale_to_cover_row > 0.99
      );
      assert.ok(entry.required_scale_to_allowed_scale_ratio > 40);
      assert.ok(entry.required_scale_to_allowed_scale_ratio < 50);
      assert.ok(entry.allowed_radius_to_producer_half_width_ratio > 0.02);
      assert.ok(entry.allowed_radius_to_producer_half_width_ratio < 0.03);
      assert.ok(entry.midpoint_fit_max_abs_residual >= 0);
      assert.ok(
        entry.midpoint_fit_residual_scale_to_raw <
          row.allowed_symmetric_raw_residual_scale_for_target
      );
      assert.ok(entry.midpoint_fit_residual_to_allowed_radius_ratio < 1e-8);
      assert.equal(entry.midpoint_fit_residual_inside_allowed_budget, true);
    });
    assert.equal(
      row.terminal_graph_remainder_budget_route_interpretation,
      "terminal-graph-remainder-budget-localizes-obstruction-to-producer-interval-width"
    );
  });
  const forecast = diagnostic.terminal_producer_refinement_forecast;
  assert.equal(forecast.base_subcell_count, 32);
  assert.deepEqual(forecast.refinement_subcell_counts, [32]);
  assert.equal(forecast.comparison_window_row_count, 5);
  assert.deepEqual(forecast.terminal_provider_h_indexes, [37, 36, 35]);
  assert.equal(forecast.observed_refinement_scaling_exponent, null);
  assert.equal(forecast.assumed_refinement_scaling_exponent, 1);
  assert.equal(forecast.forecast_scaling_exponent_used, 1);
  assert.ok(forecast.base_required_refinement_factor_to_fit_budget > 40);
  assert.ok(forecast.base_required_refinement_factor_to_fit_budget < 50);
  assert.ok(forecast.projected_subcell_count_for_baseline_budget > 1000);
  assert.ok(forecast.projected_subcell_count_for_baseline_budget < 2500);
  assert.ok(forecast.projected_subcell_multiplier_for_baseline_budget > 40);
  assert.ok(forecast.projected_subcell_multiplier_for_baseline_budget < 50);
  assert.equal(
    forecast.final_refined_entries_fit_baseline_allowed_radius,
    false
  );
  assert.equal(
    forecast.route_interpretation,
    "linear-subcell-refinement-forecast-large-partition-needed"
  );
  assert.equal(forecast.refinement_rows.length, 1);
  const baseForecastRow = forecast.refinement_rows[0];
  assert.equal(baseForecastRow.subcell_count, 32);
  assert.equal(baseForecastRow.comparison_stencil_index, 27);
  assert.equal(baseForecastRow.terminal_entry_count, 15);
  assert.equal(
    baseForecastRow.all_terminal_entries_fit_baseline_allowed_radius,
    false
  );
  assert.ok(baseForecastRow.max_residual_to_baseline_allowed_radius_ratio > 40);
  assert.ok(baseForecastRow.max_residual_to_baseline_allowed_radius_ratio < 50);
  assert.equal(
    diagnostic.claim_boundary.certifies_standard_h38_cover,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_expression_level_n38_provider,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_terminal_row_provider_enclosure,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_terminal_graph_remainder_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_eta_transport_enclosure,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_reduced_source_enclosure,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(collectTrueCertifies(diagnostic), []);
  Object.keys(diagnostic.claim_boundary).forEach((key) => {
    const mutated = structuredClone(diagnostic);
    mutated.claim_boundary[key] = true;
    assert.notDeepEqual(
      validateH39H38ExpressionN38TerminalGraphRemainderBudgetDiagnostic(
        mutated
      ),
      []
    );
  });
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 h38 expression-level N38 M4 refinement rejects base inflation but keeps finite row target", () => {
  const diagnostic =
    buildH39H38ExpressionN38TaylorM4RefinementDiagnosticCandidate({
      targetSpeedInterval: [3.02156, 3.02156007813],
      branch: "-",
      rootSubdivisions: 100,
      baseStencilSubcellCounts: [8, 16],
      refinementStencilSubcellCounts: [8, 16, 32],
      derivativePrototypeFitSubcellCount: 8,
      polynomialDegrees: [1, 2, 3],
      components: ["direct_n38_expression", "sin_phi", "sin_delta"],
      observedM4InflationFactor: 2,
      seriesOrder: 60,
    });

  assert.deepEqual(
    validateH39H38ExpressionN38TaylorM4RefinementDiagnostic(diagnostic),
    []
  );
  assert.equal(
    diagnostic.status,
    "h39-h38-expression-n38-taylor-m4-refinement-diagnostic-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-h38-expression-n38-local-taylor-m4-refinement-diagnostic"
  );
  assert.equal(
    diagnostic.n38_taylor_m4_refinement_diagnosis,
    "finer-stencil-rejects-base-m4-inflation-but-refined-retile-remains-finite"
  );
  assert.equal(diagnostic.h38_numerator_y_order, 42);
  assert.deepEqual(
    diagnostic.m4_refinement_parameters.base_stencil_subcell_counts,
    [8, 16]
  );
  assert.deepEqual(
    diagnostic.m4_refinement_parameters.refinement_stencil_subcell_counts,
    [8, 16, 32]
  );
  assert.equal(
    diagnostic.m4_refinement_parameters.proof_status,
    "finite-difference-refinement-not-directed-rounded-enclosure"
  );
  assert.deepEqual(diagnostic.m4_refinement_parameters.source_term_components, [
    "delta_squared_speed",
    "sin_phi",
    "sin_delta",
  ]);
  assert.deepEqual(
    diagnostic.m4_refinement_parameters.fourth_difference_components,
    ["direct_n38_expression", "sin_phi", "sin_delta"]
  );
  assert.equal(
    diagnostic.source_fourth_difference_diagnostic
      .max_retile_count_required_for_observed_fourth_difference,
    1071
  );
  assert.equal(
    diagnostic.m4_refinement_summary.base_total_corrected_tile_rows,
    2051
  );
  assert.equal(
    diagnostic.m4_refinement_summary.refined_total_corrected_tile_rows,
    3576
  );
  assert.equal(
    diagnostic.m4_refinement_summary.max_refined_corrected_tile_count,
    1274
  );
  assert.equal(
    diagnostic.m4_refinement_summary
      .baseline_inflation_covers_refined_stencils,
    false
  );
  assert.equal(
    diagnostic.m4_refinement_summary
      .all_refined_corrected_rows_pass_point_scale,
    true
  );
  assert.equal(
    diagnostic.m4_refinement_summary
      .nonuniform_stencil_correction_explains_growth,
    false
  );
  assert.equal(
    diagnostic.m4_refinement_summary.fourth_difference_growth_interpretation,
    "growth-not-explained-by-nonuniform-xi-spacing"
  );
  assert.ok(
    diagnostic.m4_refinement_summary
      .max_compared_stencil_nonuniform_to_uniform_fourth_derivative_relative_gap <
      0.05
  );
  assert.ok(
    diagnostic.m4_refinement_summary
      .nonuniform_correction_to_growth_excess_ratio < 0.01
  );
  const growthLocalization =
    diagnostic.m4_refinement_summary
      .fourth_difference_growth_localization_summary;
  assert.equal(growthLocalization.dominant_growth_component, "sin_delta");
  assert.equal(
    growthLocalization.max_refined_to_base_observed_m4_ratio_component,
    "sin_delta"
  );
  assert.equal(
    growthLocalization.growth_distribution_status,
    "multi-component-fourth-variation-growth"
  );
  assert.equal(
    growthLocalization.localization_interpretation,
    "growth-shifts-to-contiguous-positive-xi-region-under-refinement"
  );
  assert.equal(
    growthLocalization.refined_worst_stencil_region_status,
    "refined-worst-stencils-collapse-to-contiguous-positive-xi-region"
  );
  assert.equal(
    growthLocalization.all_refined_worst_stencils_nest_inside_base_worst_spans,
    false
  );
  assert.equal(
    growthLocalization.refined_worst_stencils_positive_xi_only,
    true
  );
  assert.equal(
    growthLocalization.refined_worst_stencils_form_contiguous_xi_region,
    true
  );
  assert.equal(growthLocalization.min_refined_worst_stencil_overlap_fraction, 0);
  assert.deepEqual(growthLocalization.refined_worst_stencil_span_hull, [
    0.9376679896182594,
    1.9375400034828008,
  ]);
  assert.ok(
    growthLocalization.dominant_growth_component_increment_share > 0.43
  );
  assert.ok(
    growthLocalization.dominant_growth_component_increment_share < 0.44
  );
  const sourceCancellation =
    diagnostic.m4_refinement_summary.positive_xi_source_term_cancellation;
  assert.equal(
    sourceCancellation.status,
    "source-term-cancellation-witness-emitted"
  );
  assert.equal(
    sourceCancellation.refined_source_stencil_subcell_count,
    32
  );
  assert.equal(sourceCancellation.comparison_stencil_index, 27);
  assert.deepEqual(sourceCancellation.comparison_xi_midpoint_span, [
    1.4373480185956347,
    1.9375400034828008,
  ]);
  assert.equal(
    sourceCancellation.positive_xi_region_status,
    "refined-worst-stencils-collapse-to-contiguous-positive-xi-region"
  );
  assert.deepEqual(sourceCancellation.source_term_components, [
    "delta_squared_speed",
    "sin_phi",
    "sin_delta",
  ]);
  assert.equal(
    sourceCancellation.source_sum_replays_direct_fourth_difference,
    true
  );
  assert.ok(sourceCancellation.source_sum_to_direct_relative_gap < 1e-9);
  assert.equal(
    sourceCancellation.cancellation_interpretation,
    "source-terms-partially-cancel-direct-positive-xi-fourth-difference"
  );
  assert.equal(
    sourceCancellation.dominant_source_term_by_abs_fourth_difference,
    "sin_delta"
  );
  assert.equal(sourceCancellation.source_terms_matching_direct_sign_count, 2);
  assert.equal(sourceCancellation.source_terms_opposing_direct_sign_count, 1);
  assert.ok(
    sourceCancellation.signed_source_sum_to_abs_source_sum_ratio > 0.52
  );
  assert.ok(
    sourceCancellation.signed_source_sum_to_abs_source_sum_ratio < 0.53
  );
  assert.ok(sourceCancellation.source_cancellation_fraction > 0.47);
  assert.ok(sourceCancellation.source_cancellation_fraction < 0.49);
  assert.ok(
    sourceCancellation.signed_source_sum_to_abs_source_sum_ratio >= 0
  );
  assert.ok(
    sourceCancellation.signed_source_sum_to_abs_source_sum_ratio <= 1
  );
  assert.ok(sourceCancellation.source_cancellation_fraction >= 0);
  assert.ok(sourceCancellation.source_cancellation_fraction <= 1);
  assert.ok(
    sourceCancellation.dominant_source_term_abs_fourth_difference_share > 0
  );
  assert.equal(sourceCancellation.source_term_rows.length, 3);
  const sinePairNormalForm =
    diagnostic.m4_refinement_summary.positive_xi_sine_pair_normal_form;
  assert.equal(
    sinePairNormalForm.status,
    "sine-pair-normal-form-witness-emitted"
  );
  assert.equal(
    sinePairNormalForm.same_sample_sequence_as_source_cancellation,
    true
  );
  assert.equal(
    sinePairNormalForm.comparison_stencil_index,
    sourceCancellation.comparison_stencil_index
  );
  assert.deepEqual(
    sinePairNormalForm.comparison_xi_midpoint_span,
    sourceCancellation.comparison_xi_midpoint_span
  );
  assert.deepEqual(sinePairNormalForm.sum_coordinate_nonzero_orders, [0, 2]);
  assert.equal(sinePairNormalForm.sum_coordinate_h_row_dependent, false);
  assert.equal(
    sinePairNormalForm.half_sum_h_row_dependency_status,
    "h-row-free"
  );
  assert.equal(sinePairNormalForm.explicit_half_sum_h_tail_max_abs_upper, 0);
  assert.ok(
    sinePairNormalForm.raw_sum_coordinate_rounding_residue_h_tail_abs_upper > 0
  );
  assert.equal(
    sinePairNormalForm.sine_pair_fourth_difference_replays_sin_terms,
    true
  );
  assert.ok(
    sinePairNormalForm.max_sample_sine_pair_identity_relative_gap < 1e-9
  );
  assert.ok(
    sinePairNormalForm.normal_form_fourth_difference_relative_gap < 1e-6
  );
  assert.ok(sinePairNormalForm.sine_pair_abs_source_mass_share > 0.99);
  assert.ok(
    sinePairNormalForm.sine_pair_signed_to_direct_fourth_difference_ratio > 0.98
  );
  assert.ok(
    sinePairNormalForm.sine_pair_signed_to_direct_fourth_difference_ratio < 1
  );
  assert.ok(
    diagnostic.m4_refinement_summary.max_refined_to_base_observed_m4_ratio > 10
  );
  assert.ok(
    diagnostic.m4_refinement_summary
      .max_base_corrected_rows_remainder_ratio_under_refined_observed_m4 > 5
  );
  assert.deepEqual(
    diagnostic.component_m4_refinement_rows.map((row) => [
      row.component,
      row.base_corrected_tile_count,
      row.refined_corrected_tile_count,
      row.base_corrected_rows_cover_refined_observed_m4_point_scale,
    ]),
    [
      ["direct_n38_expression", 656, 1162, false],
      ["sin_phi", 703, 1140, false],
      ["sin_delta", 692, 1274, false],
    ]
  );
  assert.deepEqual(
    diagnostic.component_m4_refinement_rows.map((row) => [
      row.component,
      row.fourth_difference_growth_localization.base_worst_stencil
        .stencil_index,
      row.fourth_difference_growth_localization.refined_worst_stencil
        .stencil_index,
      row.fourth_difference_growth_localization.growth_localization_status,
    ]),
    [
      [
        "direct_n38_expression",
        3,
        27,
        "refined-worst-stencil-disjoint-from-base-worst-region",
      ],
      [
        "sin_phi",
        3,
        23,
        "refined-worst-stencil-disjoint-from-base-worst-region",
      ],
      [
        "sin_delta",
        8,
        27,
        "refined-worst-stencil-disjoint-from-base-worst-region",
      ],
    ]
  );
  for (const row of diagnostic.component_m4_refinement_rows) {
    assert.equal(
      row.m4_refinement_status,
      "base-inflation-undercovers-refined-stencil"
    );
    assert.equal(row.refined_corrected_rows_pass_point_scale, true);
    assert.ok(row.refined_corrected_tile_count > row.base_corrected_tile_count);
  }
  assert.equal(
    diagnostic.claim_boundary.certifies_standard_h38_cover,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_expression_level_n38_provider,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_n38_taylor_remainder_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    diagnostic.claim_boundary.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(diagnostic.claim_boundary.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 predecessor h-row provider boundary distinguishes interval snapshots from transport", () => {
  const diagnostic = computeH39PredecessorHRowProviderBoundaryCandidate({
    h38Row: h38Row(),
  });

  assert.equal(
    diagnostic.status,
    "h39-predecessor-h-row-provider-boundary-candidate-emitted"
  );
  assert.equal(
    diagnostic.evaluation_level,
    "candidate-predecessor-h-row-provider-boundary"
  );
  assert.equal(diagnostic.cell_id, "speed.test.first-y");
  assert.equal(diagnostic.exported_h_row_interval_snapshot_complete, true);
  assert.equal(
    diagnostic.dependency_preserving_h_row_provider_present,
    false
  );
  assert.equal(
    diagnostic.exported_h_row_dependency_state,
    "independent-interval-snapshot-only"
  );
  assert.equal(
    diagnostic.smallest_evaluator_entry_point,
    "branchInputsFromH38Row"
  );
  assert.equal(diagnostic.branch_summaries.length, 2);
  assert.equal(diagnostic.branch_summaries[0].h_interval_field_count, 39);
  assert.equal(
    diagnostic.branch_summaries[0].dependency_preserving_h_row_provider_present,
    false
  );
  assert.equal(
    diagnostic.branch_summaries[0].provider_metadata_status,
    "interval-snapshot-no-provider-metadata"
  );
  assert.equal(
    diagnostic.required_provider_shape.dependency_preserving_h_row_provider,
    true
  );
  assert.equal(
    diagnostic.required_provider_shape.h_row_provider_claim_boundary
      .certifies_shifted_R43_outer_bound,
    false
  );
  assert.equal(diagnostic.certifies_shifted_R43_outer_bound, false);
  assert.equal(diagnostic.certifies_directed_rounded_shared_domain, false);
  assert.equal(diagnostic.certifies_continuous_polydisc_primitives, false);
  assert.equal(diagnostic.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 predecessor h-row provider boundary rejects flag-only provider metadata", () => {
  const flagged = h38Row();
  flagged.branch_rows = flagged.branch_rows.map((branchRow) => ({
    ...branchRow,
    dependency_preserving_h_row_provider: true,
    provider_kind: "fixture-predecessor-recurrence-transport",
    source_cell_id: flagged.cell_id,
  }));
  const diagnostic = computeH39PredecessorHRowProviderBoundaryCandidate({
    h38Row: flagged,
  });

  assert.equal(
    diagnostic.dependency_preserving_h_row_provider_present,
    false
  );
  assert.equal(
    diagnostic.exported_h_row_dependency_state,
    "incomplete-provider-metadata-rejected"
  );
  assert.equal(
    diagnostic.branch_summaries[0].provider_metadata_status,
    "incomplete-provider-metadata-rejected"
  );
  assert.equal(
    diagnostic.branch_summaries[0].h_row_dependency_trace_count,
    0
  );
  assert.equal(
    diagnostic.branch_summaries[0].h_row_dependency_witness_present,
    false
  );
  assert.equal(
    diagnostic.branch_summaries[0]
      .h_row_provider_claim_boundary_candidate_only,
    false
  );
  assert.equal(diagnostic.certifies_shifted_R43_outer_bound, false);
  assert.equal(diagnostic.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 predecessor h-row provider boundary accepts traced dependency-preserving metadata", () => {
  const diagnostic = computeH39PredecessorHRowProviderBoundaryCandidate({
    h38Row: h38RowWithProviderBranchMetadata(),
  });

  assert.equal(
    diagnostic.dependency_preserving_h_row_provider_present,
    true
  );
  assert.equal(
    diagnostic.exported_h_row_dependency_state,
    "dependency-preserving-provider-present"
  );
  assert.equal(
    diagnostic.branch_summaries[0].provider_metadata_status,
    "dependency-preserving-provider-present"
  );
  assert.equal(
    diagnostic.branch_summaries[0].h_row_provider_provenance_present,
    true
  );
  assert.equal(
    diagnostic.branch_summaries[0].h_row_dependency_trace_count,
    1
  );
  assert.equal(
    diagnostic.branch_summaries[0].h_row_dependency_witness_present,
    true
  );
  assert.equal(
    diagnostic.branch_summaries[0]
      .h_row_provider_claim_boundary_candidate_only,
    true
  );
  assert.equal(diagnostic.certifies_shifted_R43_outer_bound, false);
  assert.equal(diagnostic.certifies_directed_rounded_shared_domain, false);
  assert.equal(diagnostic.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(diagnostic, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 coefficient rows accept dependency-preserving h-row provider metadata without promotion", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 60 });
  const calls = [];
  const rows = evaluateH39SharedDomainCoefficientRows({
    context,
    h38Rows: [h38Row()],
    shiftedOrder: 1,
    rho: 0.001,
    hRowProvider: ({
      cellId,
      branch,
      branchRow,
      targetIndex,
      replayKind,
    }) => {
      calls.push({ cellId, branch, targetIndex, replayKind });
      return dependencyPreservingProviderOutput({
        branch,
        branchRow,
        cellId,
        replayKind,
      });
    },
  });
  const cell = rows[0].h39_coefficient_cell;
  const providerReport = cell.h_row_provider_report;

  assert.equal(calls.length, 2);
  assert.deepEqual(
    calls.map((call) => call.branch),
    ["-", "+"]
  );
  assert.equal(providerReport.provider_backed_branch_count, 2);
  assert.equal(providerReport.provider_backed_all_branches, true);
  assert.deepEqual(
    providerReport.branch_reports.map((report) => report.provider_kind),
    [
      "fixture-predecessor-recurrence-transport",
      "fixture-predecessor-recurrence-transport",
    ]
  );
  assert.equal(
    providerReport.branch_reports[0].dependency_trace_count,
    1
  );
  assert.equal(providerReport.branch_reports[0].provenance_present, true);
  assert.equal(
    providerReport.branch_reports[0].dependency_witness_present,
    true
  );
  assert.equal(
    providerReport.branch_reports[0].provider_claim_boundary_candidate_only,
    true
  );
  assert.equal(
    cell.claim_boundary.h_row_provider_backed_replay,
    true
  );
  assert.equal(providerReport.certifies_shifted_R43_outer_bound, false);
  assert.equal(providerReport.certifies_directed_rounded_shared_domain, false);
  assert.equal(
    providerReport.certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(providerReport.retained_branch, false);
  assert.equal(cell.claim_boundary.certifies_directed_rounded_shared_domain, false);
  assert.equal(cell.claim_boundary.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(cell, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 coefficient rows consume embedded h38 provider metadata without pressure relief", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 60 });
  const snapshotRows = evaluateH39SharedDomainCoefficientRows({
    context,
    h38Rows: [h38Row()],
    shiftedOrder: 1,
    rho: 0.001,
  });
  const providerRows = evaluateH39SharedDomainCoefficientRows({
    context,
    h38Rows: [h38RowWithProviderBranchMetadata()],
    shiftedOrder: 1,
    rho: 0.001,
  });
  const snapshotSummary =
    snapshotRows[0].h39_coefficient_cell.finite_prefix_summary;
  const providerCell = providerRows[0].h39_coefficient_cell;
  const providerSummary = providerCell.finite_prefix_summary;
  const providerReport = providerCell.h_row_provider_report;

  assert.equal(providerReport.provider_backed_branch_count, 2);
  assert.equal(providerReport.provider_backed_all_branches, true);
  assert.equal(
    providerReport.branch_reports[0].provider_kind,
    "fixture-predecessor-recurrence-transport"
  );
  assert.equal(
    providerReport.branch_reports[0].dependency_trace_count,
    1
  );
  assert.equal(providerCell.claim_boundary.h_row_provider_backed_replay, true);
  numberClose(
    providerSummary.candidate_E_R_finite_prefix,
    snapshotSummary.candidate_E_R_finite_prefix
  );
  numberClose(
    providerSummary.candidate_M_R_finite_prefix,
    snapshotSummary.candidate_M_R_finite_prefix
  );
  assert.equal(providerReport.certifies_shifted_R43_outer_bound, false);
  assert.equal(providerReport.certifies_directed_rounded_shared_domain, false);
  assert.equal(providerReport.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(providerCell, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 coefficient rows reject provider metadata without dependency witness", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 60 });

  assert.throws(
    () =>
      evaluateH39SharedDomainCoefficientRows({
        context,
        h38Rows: [h38Row()],
        shiftedOrder: 1,
        rho: 0.001,
        hRowProvider: ({ branch, branchRow, cellId }) => {
          const output = dependencyPreservingProviderOutput({
            branch,
            branchRow,
            cellId,
          });
          delete output.hRowDependencyWitness;
          return output;
        },
      }),
    /dependency witness/
  );
});

test("h39 coefficient rows reject interval-only h-row providers", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 60 });

  assert.throws(
    () =>
      evaluateH39SharedDomainCoefficientRows({
        context,
        h38Rows: [h38Row()],
        shiftedOrder: 1,
        rho: 0.001,
        hRowProvider: ({ branch, branchRow }) => ({
          branch,
          hIntervals: hIntervals(),
          solveSlopeInterval: branchRow.h38_solve_slope_interval,
        }),
      }),
    /nonempty dependency trace/
  );
});

test("h39 shifted R43 source envelope can cover the affine-center prefix instead of raw center replay", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 60 });
  const minusSolve = solveH39CenterCoefficientRow({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    solveSlopeInterval: [0.15, 0.152],
  });
  const outerBound = 2e-6;

  assert.throws(
    () =>
      computeH39ShiftedR43RemovableOuterBoundCandidate({
        context,
        cell: CELL,
        branch: "-",
        hIntervals: hIntervals(),
        xInterval: minusSolve.h39_center_interval,
        outerBound,
        outerRadius: 0.01,
        directedRoundedShiftedR43Provenance: true,
        certifiesShiftedR43ZeroPrefix: true,
      }),
    /does not cover shifted coefficient prefix/
  );

  const affineSource = computeH39ShiftedR43RemovableOuterBoundCandidate({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: minusSolve.h39_center_interval,
    solveSlopeInterval: [0.15, 0.152],
    outerBound,
    outerRadius: 0.01,
    directedRoundedShiftedR43Provenance: true,
    certifiesShiftedR43ZeroPrefix: true,
    useAffineCenterR43Prefix: true,
  });

  assert.equal(
    affineSource.status,
    "h39-affine-center-shifted-r43-removable-cauchy-outer-bound-candidate-emitted"
  );
  assert.equal(
    affineSource.source_envelope_kind,
    "affine-center-shifted-removable-r43-cauchy-outer-bound"
  );
  assert.equal(
    affineSource.shifted_R43_prefix_bound_source,
    "affine-center-actual-replay-leading-zero"
  );
  assert.ok(
    affineSource.raw_shifted_R43_finite_prefix_majorant_outer_radius >
      outerBound
  );
  assert.ok(
    affineSource.shifted_R43_finite_prefix_majorant_outer_radius <=
      outerBound
  );
  assert.deepEqual(affineSource.shifted_R43_coefficients[0], [0, 0]);
  assert.equal(
    affineSource.R43_affine_center_certificate
      .independent_interval_schur_products_used,
    false
  );
  assert.equal(affineSource.certifies_directed_rounded_shared_domain, false);
  assert.equal(JSON.stringify(affineSource).includes("speed_band"), false);
});

test("h39 affine-center shifted R43 source profile stays diagnostic without shifted Cauchy tail", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 60 });
  const minusSolve = solveH39CenterCoefficientRow({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    solveSlopeInterval: [0.15, 0.152],
  });
  const affineCenter = computeH39ShiftedR43AffineCenterFormCandidate({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: minusSolve.h39_center_interval,
    solveSlopeInterval: [0.15, 0.152],
    outerRadius: 0.01,
    shiftedOrder: 10,
  });

  const profile = computeH39AffineCenterShiftedR43SourceProfileCandidate({
    coefficients: affineCenter.R43_affine_center_shifted_coefficients,
    affineCenterCertificate: affineCenter.R43_affine_center_certificate,
    targetRadius: 0.001,
  });

  assert.equal(
    profile.status,
    "h39-affine-center-shifted-r43-source-profile-candidate-emitted"
  );
  assert.equal(
    profile.source_profile_kind,
    "affine-center-actual-replay-shifted-r43"
  );
  assert.equal(profile.shifted_outer_bound_supplied, false);
  assert.ok(profile.candidate_E_R_finite_prefix > 0);
  assert.ok(profile.candidate_M_R_finite_prefix > 0);
  assert.equal(profile.candidate_E_R_prefix_plus_tail_bound, null);
  assert.equal(profile.candidate_M_R_prefix_plus_tail_bound, null);
  assert.equal(profile.cauchy_diagnostic, null);
  assert.equal(profile.certifies_continuous_polydisc_primitives, false);
  assert.equal(profile.certifies_directed_rounded_shared_domain, false);
  assert.equal(profile.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(profile, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 affine-center shifted R43 source profile uses shift-power-zero tail when supplied", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 60 });
  const minusSolve = solveH39CenterCoefficientRow({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    solveSlopeInterval: [0.15, 0.152],
  });
  const affineCenter = computeH39ShiftedR43AffineCenterFormCandidate({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: minusSolve.h39_center_interval,
    solveSlopeInterval: [0.15, 0.152],
    outerRadius: 0.01,
    shiftedOrder: 10,
  });

  const profile = computeH39AffineCenterShiftedR43SourceProfileCandidate({
    coefficients: affineCenter.R43_affine_center_shifted_coefficients,
    affineCenterCertificate: affineCenter.R43_affine_center_certificate,
    targetRadius: 0.001,
    r43ShiftedCauchyOuterBound: 2e-6,
    r43ShiftedCauchyOuterRadius: 0.01,
  });

  assert.equal(profile.shifted_outer_bound_supplied, true);
  assert.equal(profile.r43_cauchy_tail_shift_power, 0);
  assert.equal(profile.cauchy_diagnostic.shift_power, 0);
  assert.ok(profile.candidate_E_R_cauchy_tail_after_prefix_profile > 0);
  assert.ok(profile.candidate_M_R_cauchy_tail_after_prefix_profile > 0);
  numberClose(
    profile.candidate_E_R_prefix_plus_tail_bound,
    profile.candidate_E_R_finite_prefix +
      profile.candidate_E_R_cauchy_tail_after_prefix_profile,
    1e-12
  );
  numberClose(
    profile.candidate_M_R_prefix_plus_tail_bound,
    profile.candidate_M_R_finite_prefix +
      profile.candidate_M_R_cauchy_tail_after_prefix_profile,
    1e-12
  );
  assert.equal(profile.certifies_continuous_polydisc_primitives, false);
  assert.equal(profile.certifies_directed_rounded_shared_domain, false);
  assert.equal(profile.retained_branch, false);
  assert.deepEqual(
    collectExactKeys(profile, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
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

test("h39 summary records affine-center source profiles without completing vector absent outer pair", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 60 });
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
  });
  const summary = cell.finite_prefix_summary;

  assert.equal(summary.R43_affine_center_source_profile_candidate_count, 2);
  assert.equal(
    summary.R43_affine_center_source_profile_tail_candidate_count,
    0
  );
  assert.equal(
    summary.R43_affine_center_source_profile_candidates.every(
      (candidate) =>
        candidate.shifted_outer_bound_supplied === false &&
        candidate.candidate_E_R_prefix_plus_tail_bound === null &&
        candidate.candidate_M_R_prefix_plus_tail_bound === null
    ),
    true
  );
  assert.equal(summary.candidate_E_R_prefix_plus_tail_bound, null);
  assert.equal(summary.candidate_M_R_prefix_plus_tail_bound, null);
  assert.equal(
    summary.candidate_h39_full_cauchy_primitive_profile_vector_status,
    "h39-full-cauchy-primitive-profile-vector-candidate-incomplete"
  );
  assert.ok(
    summary.candidate_h39_full_cauchy_primitive_profile_vector_missing_components.includes(
      "E_R"
    )
  );
  assert.equal(summary.R43_second_x_remainder_profile_candidates.length, 2);
  assert.equal(
    summary.R43_second_x_remainder_profile_candidates.every(
      (candidate) =>
        candidate.second_x_kernel_y_power === 41 &&
        candidate.included_in_candidate_E_R_prefix_plus_tail_bound === false
    ),
    true
  );
  assert.deepEqual(
    collectExactKeys(summary, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
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

test("h39 affine-center shifted R43 source envelope feeds the primitive profile below raw prefix pressure", () => {
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
        r43ShiftedCauchyOuterBound: 2e-6,
        r43ShiftedCauchyOuterRadius: 0.01,
        directedRoundedShiftedR43Provenance: true,
        certifiesShiftedR43ZeroPrefix: true,
        useAffineCenterR43Prefix: true,
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
  const sourceCandidate =
    coordinateSource.source_residual_outer_bound_candidates[0];

  assert.deepEqual(cell.source_certificate_obstructions, []);
  assert.equal(
    coordinateSource.source_envelope_kind,
    "affine-center-shifted-removable-r43-cauchy-outer-bound"
  );
  assert.equal(coordinateSource.use_affine_center_r43_prefix, true);
  assert.equal(
    sourceCandidate.shifted_R43_prefix_bound_source,
    "affine-center-actual-replay-leading-zero"
  );
  assert.ok(
    sourceCandidate.raw_shifted_R43_finite_prefix_majorant_outer_radius >
      2e-6
  );
  assert.ok(
    sourceCandidate.shifted_R43_finite_prefix_majorant_outer_radius <=
      2e-6
  );
  assert.equal(
    summary.candidate_R43_outer_bound_source,
    "coordinate-affine-center-shifted-removable-r43-cauchy-outer-bound"
  );
  assert.equal(summary.R43_affine_center_source_profile_candidate_count, 2);
  assert.equal(
    summary.R43_affine_center_source_profile_tail_candidate_count,
    2
  );
  assert.equal(summary.candidate_E_R_prefix_plus_tail_bound < 1e-5, true);
  assert.equal(summary.candidate_M_R_prefix_plus_tail_bound < 1e-5, true);
  assert.equal(
    summary.R43_affine_center_source_profile_candidates.every(
      (candidate) =>
        candidate.r43_cauchy_tail_shift_power === 0 &&
        candidate.shifted_outer_bound_supplied === true
    ),
    true
  );
  assert.equal(
    cell.claim_boundary.emits_directed_rounded_source_handoffs,
    true
  );
  assert.deepEqual(
    collectExactKeys(cell, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 shifted R43 source envelope rejects under-covering bounds", () => {
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
        r43ShiftedCauchyOuterBound: 1e-12,
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

  assert.equal(cell.coordinate_cauchy_outer_bounds_profile_candidate, null);
  assert.equal(cell.evaluator_source_certificate_report, null);
  assert.equal(cell.source_certificate_obstructions.length, 1);
  assert.match(
    cell.source_certificate_obstructions[0].message,
    /shifted R43 source bound .* does not cover shifted coefficient prefix/
  );
  assert.equal(
    cell.source_certificate_obstructions[0].candidate_obstructions[0]
      .candidate_index,
    0
  );
  assert.equal(
    cell.finite_prefix_summary.candidate_h39_full_cauchy_primitive_profile_vector_status,
    "h39-full-cauchy-primitive-profile-vector-candidate-incomplete"
  );
  assert.equal(
    cell.claim_boundary.emits_directed_rounded_source_handoffs,
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
  const summary = artifact.h39_shared_domain_coefficient_summary;

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
    summary.coefficient_row_count,
    1
  );
  assert.equal(summary.h_row_provider_report_count, 1);
  assert.equal(summary.h_row_provider_backed_branch_count, 0);
  assert.equal(summary.h_row_provider_backed_cell_count, 0);
  assert.equal(summary.h_row_provider_backed_all_cells, false);
  assert.equal(
    summary.h_row_provider_dependency_state,
    "independent-interval-snapshot-replay"
  );
  assert.deepEqual(summary.h_row_provider_kinds, [
    "exported-independent-interval-snapshot",
  ]);
  assert.equal(
    summary.all_centered_leading_R43_coefficients_contain_zero,
    true
  );
  assert.ok(
    summary.min_h39_jacobian_coefficient_clearance > 0
  );
  assert.equal(
    summary.second_x_derivative_lowest_y_power,
    41
  );
  assert.equal(summary.R43_shifted_prefix_pressure_diagnostic_count, 2);
  assert.ok(
    summary.max_R43_shifted_prefix_pressure_outer_radius >=
      summary.max_candidate_E_R_finite_prefix
  );
  assert.equal(summary.R43_affine_center_form_candidate_count, 2);
  assert.equal(
    summary.all_R43_affine_center_forms_zero_leading_symbolically,
    true
  );
  assert.equal(
    summary.R43_affine_center_leading_zero_certified_count,
    2
  );
  assert.equal(summary.R43_affine_center_leading_zero_open_count, 0);
  assert.equal(summary.first_R43_affine_center_leading_zero_open, null);
  assert.equal(
    summary.R43_affine_center_form_numeric_bound_certified,
    false
  );
  assert.ok(
    summary.max_R43_affine_center_shifted_prefix_majorant_outer_radius >
      0
  );
  assert.ok(
    summary.max_R43_affine_center_shifted_prefix_majorant_outer_radius <
      summary.max_R43_shifted_prefix_pressure_outer_radius
  );
  assert.equal(
    summary.dominant_R43_affine_center_shifted_prefix
      .candidate_bound_source,
    "affine-center actual replay finite prefix with certified leading zero"
  );
  assert.equal(
    summary.R43_affine_center_source_profile_candidate_count,
    2
  );
  assert.equal(
    summary.R43_affine_center_source_profile_tail_candidate_count,
    0
  );
  assert.equal(
    summary.all_R43_affine_center_source_profiles_tail_bearing,
    false
  );
  numberClose(
    summary.max_R43_affine_center_source_profile_E_R_finite_prefix,
    summary.max_candidate_E_R_finite_prefix
  );
  assert.equal(
    summary.max_R43_affine_center_source_profile_E_R_prefix_plus_tail_bound,
    null
  );
  assert.equal(
    summary.R43_second_x_remainder_profile_candidate_count,
    2
  );
  assert.equal(
    summary.all_R43_second_x_remainder_profiles_separate_from_E_R_M_R,
    true
  );
  assert.equal(summary.max_R43_second_x_E_R_remainder_profile, null);
  assert.equal(
    summary.R43_second_x_remainder_profiles_with_missing_y_derivative_majorant_count,
    2
  );
  assert.equal(
    summary.dominant_R43_shifted_prefix_pressure
      .leading_centered_coefficient_contains_zero,
    true
  );
  assert.ok(
    summary.max_candidate_L_J_finite_prefix > 0
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

test("h39 coefficient artifact summarizes provider-backed replay without closure promotion", () => {
  const artifact = buildH39SharedDomainCoefficientArtifact({
    h38Rows: [h38Row()],
    validateH38: false,
    shiftedOrder: 1,
    rho: 0.001,
    hRowProvider: ({ branch, branchRow, cellId, replayKind }) =>
      dependencyPreservingProviderOutput({
        branch,
        branchRow,
        cellId,
        replayKind,
      }),
  });
  const errors = validateH39SharedDomainCoefficientArtifact(artifact);
  const summary = artifact.h39_shared_domain_coefficient_summary;
  const providerReport =
    artifact.h39_shared_domain_coefficient_rows[0].h39_coefficient_cell
      .h_row_provider_report;

  assert.deepEqual(errors, []);
  assert.equal(
    artifact.coefficient_artifact_parameters.h_row_provider_hook_supplied,
    true
  );
  assert.equal(summary.h_row_provider_report_count, 1);
  assert.equal(summary.h_row_provider_backed_branch_count, 2);
  assert.equal(summary.h_row_provider_backed_cell_count, 1);
  assert.equal(summary.h_row_provider_backed_all_cells, true);
  assert.equal(
    summary.h_row_provider_dependency_state,
    "dependency-preserving-provider-backed-replay"
  );
  assert.deepEqual(summary.h_row_provider_kinds, [
    "fixture-predecessor-recurrence-transport",
  ]);
  assert.deepEqual(summary.h_row_provider_source_cell_ids, [
    "speed.test.first-y",
  ]);
  assert.equal(summary.h_row_provider_dependency_trace_count, 2);
  assert.equal(providerReport.provider_backed_all_branches, true);
  assert.equal(
    providerReport.branch_reports[0].provider_claim_boundary_candidate_only,
    true
  );
  assert.equal(
    artifact.claim_boundary.h_row_provider_backed_replay,
    true
  );
  assert.equal(
    artifact.h39_primitive_vector_backend_artifact.claim_boundary
      .certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    artifact.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(artifact.result.retained_branch, false);

  const mutatedProviderClaim = JSON.parse(JSON.stringify(artifact));
  mutatedProviderClaim.h39_shared_domain_coefficient_rows[0]
    .h39_coefficient_cell.h_row_provider_report
    .certifies_directed_rounded_shared_domain = true;
  assert.ok(
    validateH39SharedDomainCoefficientArtifact(mutatedProviderClaim).some(
      (error) =>
        error.includes(
          "h39 h-row provider reports must remain candidate-only"
        )
    )
  );

  const mutatedProviderWitness = JSON.parse(JSON.stringify(artifact));
  mutatedProviderWitness.h39_shared_domain_coefficient_rows[0]
    .h39_coefficient_cell.h_row_provider_report.branch_reports[0]
    .dependency_witness_present = false;
  assert.ok(
    validateH39SharedDomainCoefficientArtifact(mutatedProviderWitness).some(
      (error) =>
        error.includes(
          "h39 h-row provider-backed branch reports must carry trace"
        )
    )
  );

  const mutatedProviderBoundary = JSON.parse(JSON.stringify(artifact));
  mutatedProviderBoundary.claim_boundary.h_row_provider_backed_replay = false;
  assert.ok(
    validateH39SharedDomainCoefficientArtifact(mutatedProviderBoundary).some(
      (error) =>
        error.includes(
          "h39 h-row provider artifact claim boundary must match"
        )
    )
  );
  assert.deepEqual(
    collectExactKeys(artifact, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
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

test("h39 coefficient artifact aggregates affine-center shifted source profiles", () => {
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
        r43ShiftedCauchyOuterBound: 2e-6,
        r43ShiftedCauchyOuterRadius: 0.01,
        directedRoundedShiftedR43Provenance: true,
        certifiesShiftedR43ZeroPrefix: true,
        useAffineCenterR43Prefix: true,
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
  assert.equal(
    coordinateSource.source_envelope_kind,
    "affine-center-shifted-removable-r43-cauchy-outer-bound"
  );
  assert.equal(coordinateSource.use_affine_center_r43_prefix, true);
  assert.ok(
    coordinateSource.source_residual_outer_bound_candidates[0]
      .raw_shifted_R43_finite_prefix_majorant_outer_radius >
      2e-6
  );
  assert.ok(
    summary.max_R43_affine_center_shifted_prefix_majorant_outer_radius <=
      2e-6
  );
  assert.equal(
    summary.R43_affine_center_source_profile_candidate_count,
    2
  );
  assert.equal(
    summary.R43_affine_center_source_profile_tail_candidate_count,
    2
  );
  assert.equal(
    summary.all_R43_affine_center_source_profiles_tail_bearing,
    true
  );
  assert.equal(
    summary.dominant_R43_affine_center_source_profile
      .r43_cauchy_tail_shift_power,
    0
  );
  assert.equal(
    summary.max_R43_affine_center_source_profile_E_R_prefix_plus_tail_bound,
    summary.max_candidate_E_R_prefix_plus_tail_bound
  );
  assert.equal(
    summary.max_R43_affine_center_source_profile_M_R_prefix_plus_tail_bound,
    summary.max_candidate_M_R_prefix_plus_tail_bound
  );
  assert.equal(summary.max_candidate_E_R_prefix_plus_tail_bound < 1e-5, true);
  assert.equal(summary.max_candidate_M_R_prefix_plus_tail_bound < 1e-5, true);
  assert.equal(
    summary.R43_second_x_remainder_profile_candidate_count,
    2
  );
  assert.equal(
    summary.all_R43_second_x_remainder_profiles_separate_from_E_R_M_R,
    true
  );
  assert.equal(
    summary.candidate_R43_outer_bound_source,
    "coordinate-affine-center-shifted-removable-r43-cauchy-outer-bound"
  );
  assert.equal(
    artifact.h39_primitive_vector_backend_artifact.claim_boundary
      .certifies_directed_rounded_shared_domain,
    false
  );
  assert.deepEqual(
    collectExactKeys(artifact, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
});

test("h39 coefficient artifact rejects under-covering affine-center shifted source profiles", () => {
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
        r43ShiftedCauchyOuterBound: 1e-12,
        r43ShiftedCauchyOuterRadius: 0.01,
        directedRoundedShiftedR43Provenance: true,
        certifiesShiftedR43ZeroPrefix: true,
        useAffineCenterR43Prefix: true,
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

  assert.deepEqual(errors, []);
  assert.equal(summary.source_certificate_obstruction_count, 1);
  assert.equal(
    summary.first_source_certificate_obstruction.source_family,
    "coordinate_cauchy_outer_bounds"
  );
  assert.match(
    summary.first_source_certificate_obstruction.message,
    /does not cover shifted coefficient prefix/
  );
  assert.equal(summary.max_candidate_E_R_prefix_plus_tail_bound, null);
  assert.equal(summary.max_candidate_M_R_prefix_plus_tail_bound, null);
  assert.equal(
    summary.candidate_h39_full_cauchy_primitive_profile_vector_status,
    "h39-full-cauchy-primitive-profile-vector-candidate-incomplete"
  );
  assert.equal(
    summary.R43_affine_center_source_profile_tail_candidate_count,
    0
  );
  assert.equal(
    summary.all_R43_affine_center_source_profiles_tail_bearing,
    false
  );
  assert.deepEqual(
    collectExactKeys(artifact, FORBIDDEN_FIXED_SPEED_KEYS),
    []
  );
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

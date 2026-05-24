#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  evaluateCrossBinaryForcingAndDerivativeAtTheta,
} from "./octahedral-fold-aware-cross-binary-forcing-derivative-atlas.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativeVariationCertificate,
  validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativeVariationCertificate,
} from "./octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-variation-certificate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_DERIVATIVE_PEAK_BUDGET_REDUCTION_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-peak-budget-reduction/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_i1_bracket_local_derivative_peak_budget_reduction";
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
const EXPECTED_SOURCE_ROOT_COUNT = 6;
const EXPECTED_TERM_SIGNATURE = "1,3,1,1";
const SOURCE_ROOT_DOMAIN_MIN = 1e-9;
const SOURCE_ROOT_DOMAIN_RELATIVE_PADDING = 1e-8;
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const SPEED_RATIO_ENCLOSURE = [3.02156, 3.02157];
const I1_LEFT_ENDPOINT = 0.124678831905;
const I1_RIGHT_ENDPOINT = 0.145456970556;
const REDUCED_LOCAL_SUCCESSOR_ROW =
  "I1.f1.bracket-local-directed-rounding-derivative-variation-enclosure-required";

function formatSmallNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(12));
}

function termRootCountSignature(evaluation) {
  return evaluation.terms.map((term) => term.root_count);
}

function minAbsFDelta(evaluation) {
  const values = evaluation.terms.flatMap((term) =>
    (term.root_rows ?? []).map((row) => Math.abs(Number(row.F_delta)))
  );
  return Math.min(...values);
}

function signLabel(value) {
  if (value > 0) {
    return "+";
  }
  if (value < 0) {
    return "-";
  }
  return "0";
}

function rootSheetRows(evaluation) {
  return evaluation.terms.map((term) => ({
    term_label: term.term_label,
    coefficient: term.coefficient,
    kappa: term.kappa,
    sigma: term.sigma,
    theta_tilde_normalized: term.theta_tilde_normalized,
    root_count: term.root_count,
    roots: (term.root_rows ?? []).map((rootRow, rootIndex) => {
      const delta = Number(rootRow.delta);
      const FDelta = Number(rootRow.F_delta);
      return {
        root_index: rootIndex,
        delta,
        F_delta: FDelta,
        F_delta_sign: signLabel(FDelta),
        delta_prime: Number(rootRow.delta_prime),
      };
    }),
  }));
}

function fineGridCount({ parentStencilSamplesPerAxis, refinementSamplesPerSubcellAxis }) {
  return (
    (parentStencilSamplesPerAxis - 1) *
      (refinementSamplesPerSubcellAxis - 1) +
    1
  );
}

function gridCoordinate(index, count) {
  return count === 1 ? 0.5 : index / (count - 1);
}

function buildPeakBudgetTheorem() {
  return {
    theorem_id: "i1-f1-bracket-local-derivative-peak-budget-reduction",
    theorem_scope:
      "finite subcell peak-budget reduction for the I1.f1 bracket-local directed-rounding derivative-variation row",
    statement:
      "Let C be a predecessor I1.f1 bracket mesh cell with center derivative d_C, local mesh allowance Delta_C, and parent mixed-stencil maximum m_C. Define mu_C = Delta_C - max(0, m_C - d_C). For each stencil subcell Q with vertex maximum m_Q, any directed-rounded interval or Taylor enclosure satisfying sup_Q partial_theta f_cross <= m_Q + epsilon_Q with epsilon_Q < min(mu_C, -m_Q) proves that Q cannot break the predecessor derivative allowance or derivative negativity. The executable packet computes this finite peak budget for every stencil subcell and records the bottleneck budgets that a future interval backend must beat.",
    proof_steps: [
      "Import the bracket-local mixed-stencil derivative-variation certificate and its predecessor allowance data.",
      "Refine each parent stencil subcell by a local tensor replay, so every parent 5x5 stencil cell has a 9x9 refinement audit at default settings.",
      "For each of the 2048 subcells, compute the vertex derivative maximum, refined observed maximum, parent allowance slack, and effective peak-overshoot ceiling.",
      "Attach a bilinear vertex-envelope sufficient condition: if the pure second-partial enclosure of g=f'_cross satisfies (h_theta^2/8)M_theta_theta+(h_nu^2/8)M_nu_nu below the emitted overshoot ceiling, then sup_Q g cannot exceed the vertex maximum enough to break the row.",
      "Use the existing refined subcell grid to run a sampled pure-curvature feasibility probe for the same bilinear condition without claiming an interval second-partial enclosure.",
      "Require positive peak budget, negative refined derivative maximum, preserved six-source-root count, preserved term signature, and positive sampled $|F_delta|$ for every finite subcell.",
      "Conclude only a finite peak-budget reduction of the directed-rounding row; leave actual directed-rounded interval/Taylor overshoot bounds open.",
    ],
    proof_status: "finite-sampled-subcell-peak-budget-reduction-certified",
  };
}

function buildBackendFormulaSheet() {
  return {
    formula_sheet_id: "cross-binary-i1-f1-derivative-backend-input-formulas",
    source_phase: "phi=2*theta_tilde-delta",
    source_root_equation:
      "F_{kappa,nu}(theta_tilde,delta)=delta^2/nu^2-2+sin(phi)+kappa*sin(delta)=0",
    source_root_delta_derivative:
      "F_delta=2*delta/nu^2-cos(phi)+kappa*cos(delta)",
    kernel: "B=-0.5*(cos(phi)+kappa*cos(delta))",
    implicit_root_derivative: "delta_prime=-2*cos(phi)/F_delta",
    kernel_derivative:
      "B_prime=sin(phi)+0.5*(kappa*sin(delta)-sin(phi))*delta_prime",
    root_delta_transport_derivative:
      "F_delta_prime=2*sin(phi)+(2/nu^2-sin(phi)-kappa*sin(delta))*delta_prime",
    inverse_factor: "I=(delta^2*abs(F_delta))^-1",
    inverse_factor_derivative:
      "I_prime=-2*delta_prime/(delta^3*abs(F_delta))-sign(F_delta)*F_delta_prime/(delta^2*abs(F_delta)^2)",
    source_contribution: "s_prime_{kappa,sigma}=2*sigma*(B_prime*I+B*I_prime)/nu",
    cross_binary_combination:
      "f_cross(theta)=s_{+,+}(theta)-s_{+,+}(theta+Q)+s_{-,+}(theta)-s_{-,+}(theta+Q)",
    derivative_combination:
      "f_cross_prime(theta)=s_prime_{+,+}(theta)-s_prime_{+,+}(theta+Q)+s_prime_{-,+}(theta)-s_prime_{-,+}(theta+Q)",
    bilinear_vertex_envelope:
      "For g=f_cross_prime on a rectangle Q with widths h_theta,h_nu, bilinear interpolation from the four vertices is <= vertex_max_derivative and sup_Q g <= vertex_max_derivative+(h_theta^2/8)M_theta_theta+(h_nu^2/8)M_nu_nu whenever M_theta_theta and M_nu_nu bound the corresponding pure second partials of g on Q.",
    root_tube_interval_certificate:
      "For each source term and retained tube D_r=[delta_r^-,delta_r^+], prove interval-opposite signs for F(P,delta_r^-) and F(P,delta_r^+), prove F_delta(P,D_r) has one fixed sign with abs(F_delta)>=lambda_r>0, and prove 0 notin F(P,K_l) on every complement slab K_l between retained tubes and domain endpoints. Then each D_r contains exactly one C^1 implicit root sheet over P and no extra source roots occur in the complement.",
    required_backend_task:
      "For each emitted subcell Q, isolate the implicit delta root sheets, prove a positive lower bound for abs(F_delta), and enclose sup_Q f_cross_prime below the emitted vertex maximum plus a strict overshoot bound smaller than required_overshoot_bound_less_than.",
  };
}

function buildFineGrid({ parentRow, rootSubdivisions, fineCount }) {
  const thetaLeft = Number(parentRow.theta_interval[0]);
  const thetaRight = Number(parentRow.theta_interval[1]);
  const speedLeft = Number(parentRow.speed_ratio_interval[0]);
  const speedRight = Number(parentRow.speed_ratio_interval[1]);
  const thetaWidth = thetaRight - thetaLeft;
  const speedWidth = speedRight - speedLeft;
  const rows = [];

  for (let thetaIndex = 0; thetaIndex < fineCount; thetaIndex += 1) {
    const theta = thetaLeft + thetaWidth * gridCoordinate(thetaIndex, fineCount);
    for (let speedIndex = 0; speedIndex < fineCount; speedIndex += 1) {
      const speedRatio =
        speedLeft + speedWidth * gridCoordinate(speedIndex, fineCount);
      const evaluation = evaluateCrossBinaryForcingAndDerivativeAtTheta({
        speedRatio,
        theta,
        rootSubdivisions,
      });
      rows.push({
        theta_index: thetaIndex,
        speed_index: speedIndex,
        theta,
        speed_ratio: speedRatio,
        derivative: evaluation.derivative,
        forcing: evaluation.value,
        source_root_count: evaluation.source_root_count,
        term_root_count_signature: termRootCountSignature(evaluation),
        min_abs_F_delta: minAbsFDelta(evaluation),
        root_sheets: rootSheetRows(evaluation),
      });
    }
  }

  return rows;
}

function subintervalForIndex({ left, right, index, subcellCount }) {
  const width = right - left;
  return [
    left + (width * index) / subcellCount,
    left + (width * (index + 1)) / subcellCount,
  ];
}

function rowAt(rows, fineCount, thetaIndex, speedIndex) {
  return rows[thetaIndex * fineCount + speedIndex];
}

function summarizeRows(rows) {
  const sourceRootCounts = [
    ...new Set(rows.map((row) => row.source_root_count)),
  ].sort((left, right) => left - right);
  const termRootCountSignatures = [
    ...new Set(rows.map((row) => row.term_root_count_signature.join(","))),
  ].sort();
  return {
    source_root_counts: sourceRootCounts,
    source_root_count_preserved:
      sourceRootCounts.length === 1 &&
      sourceRootCounts[0] === EXPECTED_SOURCE_ROOT_COUNT,
    term_root_count_signatures: termRootCountSignatures,
    term_root_count_signature_preserved:
      termRootCountSignatures.length === 1 &&
      termRootCountSignatures[0] === EXPECTED_TERM_SIGNATURE,
    min_abs_F_delta: Math.min(...rows.map((row) => row.min_abs_F_delta)),
    max_derivative: Math.max(...rows.map((row) => row.derivative)),
    min_derivative: Math.min(...rows.map((row) => row.derivative)),
  };
}

function buildBilinearCurvatureSufficientCondition({
  thetaWidth,
  speedWidth,
  overshootCeiling,
}) {
  const thetaScale = (thetaWidth * thetaWidth) / 8;
  const speedScale = (speedWidth * speedWidth) / 8;
  return {
    lemma:
      "bilinear vertex-envelope: sup_Q g <= vertex_max + (h_theta^2/8)M_theta_theta + (h_nu^2/8)M_nu_nu",
    function: "g=f_cross_prime",
    theta_width: formatSmallNumber(thetaWidth),
    speed_ratio_width: formatSmallNumber(speedWidth),
    theta_second_partial_coefficient: formatSmallNumber(thetaScale),
    speed_second_partial_coefficient: formatSmallNumber(speedScale),
    required_error_bound_less_than: formatSmallNumber(overshootCeiling),
    balanced_pure_curvature_bound: formatSmallNumber(
      overshootCeiling / (thetaScale + speedScale)
    ),
    theta_only_second_partial_bound: formatSmallNumber(
      overshootCeiling / thetaScale
    ),
    speed_only_second_partial_bound: formatSmallNumber(
      overshootCeiling / speedScale
    ),
    sufficient_condition:
      "(h_theta^2/8)M_theta_theta+(h_nu^2/8)M_nu_nu < required_error_bound_less_than",
  };
}

function centralSecondDifference(left, center, right, step) {
  return (right - 2 * center + left) / (step * step);
}

function buildSampledPureCurvatureProbe({
  fineRows,
  fineCount,
  thetaStart,
  thetaEnd,
  speedStart,
  speedEnd,
  thetaStep,
  speedStep,
  thetaScale,
  speedScale,
  overshootCeiling,
}) {
  let maxThetaSecond = 0;
  let maxSpeedSecond = 0;
  for (let speedIndex = speedStart; speedIndex <= speedEnd; speedIndex += 1) {
    for (
      let thetaIndex = thetaStart + 1;
      thetaIndex <= thetaEnd - 1;
      thetaIndex += 1
    ) {
      const second = centralSecondDifference(
        rowAt(fineRows, fineCount, thetaIndex - 1, speedIndex).derivative,
        rowAt(fineRows, fineCount, thetaIndex, speedIndex).derivative,
        rowAt(fineRows, fineCount, thetaIndex + 1, speedIndex).derivative,
        thetaStep
      );
      maxThetaSecond = Math.max(maxThetaSecond, Math.abs(second));
    }
  }
  for (let thetaIndex = thetaStart; thetaIndex <= thetaEnd; thetaIndex += 1) {
    for (
      let speedIndex = speedStart + 1;
      speedIndex <= speedEnd - 1;
      speedIndex += 1
    ) {
      const second = centralSecondDifference(
        rowAt(fineRows, fineCount, thetaIndex, speedIndex - 1).derivative,
        rowAt(fineRows, fineCount, thetaIndex, speedIndex).derivative,
        rowAt(fineRows, fineCount, thetaIndex, speedIndex + 1).derivative,
        speedStep
      );
      maxSpeedSecond = Math.max(maxSpeedSecond, Math.abs(second));
    }
  }
  const sampledRemainder =
    thetaScale * maxThetaSecond + speedScale * maxSpeedSecond;
  return {
    probe_type: "sampled-pure-second-difference-bilinear-remainder",
    certifies_interval_second_partial_bounds: false,
    theta_second_partial_sample_max_abs: formatSmallNumber(maxThetaSecond),
    speed_second_partial_sample_max_abs: formatSmallNumber(maxSpeedSecond),
    sampled_bilinear_remainder: formatSmallNumber(sampledRemainder),
    sampled_bilinear_remainder_ratio_to_required_bound: formatSmallNumber(
      sampledRemainder / overshootCeiling
    ),
    status:
      sampledRemainder < overshootCeiling
        ? "sampled-bilinear-curvature-feasibility-passed"
        : "sampled-bilinear-curvature-feasibility-open",
  };
}

function uniqueSortedStrings(values) {
  return [...new Set(values)].sort();
}

function minFinite(values) {
  const finiteValues = values.filter((value) => Number.isFinite(value));
  return finiteValues.length > 0 ? Math.min(...finiteValues) : null;
}

function sourceRootDomainMax(speedRatio) {
  return (
    2 * speedRatio +
    SOURCE_ROOT_DOMAIN_RELATIVE_PADDING * Math.max(1, speedRatio)
  );
}

function buildSampledRootTubeRegularityProbe(refinedRows) {
  const rootCountSignatures = uniqueSortedStrings(
    refinedRows.map((row) => row.term_root_count_signature.join(","))
  );
  const firstSheets = refinedRows[0].root_sheets;
  let minAbsFDelta = Infinity;
  let minPositiveDelta = Infinity;
  let minTubeSeparation = Infinity;
  let maxBranchDeltaWidth = 0;
  let allFDeltaSignsPreserved = true;
  const termRows = firstSheets.map((firstTerm, termIndex) => {
    const termSamples = refinedRows.map((row) => row.root_sheets[termIndex]);
    const rootCountSet = uniqueSortedStrings(
      termSamples.map((term) => String(term.root_count))
    );
    const branchRows = [];
    for (let rootIndex = 0; rootIndex < firstTerm.root_count; rootIndex += 1) {
      const rootSamples = termSamples.map((term) => term.roots[rootIndex]);
      const deltas = rootSamples.map((root) => root.delta);
      const fDeltas = rootSamples.map((root) => root.F_delta);
      const fDeltaSigns = uniqueSortedStrings(
        rootSamples.map((root) => root.F_delta_sign)
      );
      const deltaMin = Math.min(...deltas);
      const deltaMax = Math.max(...deltas);
      const branchDeltaWidth = deltaMax - deltaMin;
      const branchMinAbsFDelta = Math.min(
        ...fDeltas.map((value) => Math.abs(value))
      );
      const branchMinPositiveDelta = Math.min(...deltas);
      allFDeltaSignsPreserved =
        allFDeltaSignsPreserved && fDeltaSigns.length === 1;
      minAbsFDelta = Math.min(minAbsFDelta, branchMinAbsFDelta);
      minPositiveDelta = Math.min(minPositiveDelta, branchMinPositiveDelta);
      maxBranchDeltaWidth = Math.max(maxBranchDeltaWidth, branchDeltaWidth);
      branchRows.push({
        root_index: rootIndex,
        delta_min: formatSmallNumber(deltaMin),
        delta_max: formatSmallNumber(deltaMax),
        delta_sample_width: formatSmallNumber(branchDeltaWidth),
        F_delta_signs: fDeltaSigns,
        F_delta_sign_preserved: fDeltaSigns.length === 1,
        min_abs_F_delta: formatSmallNumber(branchMinAbsFDelta),
        min_positive_delta: formatSmallNumber(branchMinPositiveDelta),
      });
    }
    const adjacentSeparations = [];
    for (let index = 0; index < branchRows.length - 1; index += 1) {
      adjacentSeparations.push(
        Number(branchRows[index + 1].delta_min) -
          Number(branchRows[index].delta_max)
      );
    }
    const termMinTubeSeparation = minFinite(adjacentSeparations);
    if (termMinTubeSeparation !== null) {
      minTubeSeparation = Math.min(minTubeSeparation, termMinTubeSeparation);
    }
    return {
      term_label: firstTerm.term_label,
      kappa: firstTerm.kappa,
      sigma: firstTerm.sigma,
      root_counts: rootCountSet.map(Number),
      root_count_preserved: rootCountSet.length === 1,
      F_delta_sign_signature: branchRows
        .map((branch) => branch.F_delta_signs.join(""))
        .join(","),
      min_sampled_root_tube_separation:
        termMinTubeSeparation === null ? null : formatSmallNumber(termMinTubeSeparation),
      branches: branchRows,
    };
  });
  const minSeparation =
    minTubeSeparation === Infinity ? null : minTubeSeparation;
  const rootCountSignaturePreserved =
    rootCountSignatures.length === 1 &&
    rootCountSignatures[0] === EXPECTED_TERM_SIGNATURE;
  const sampledTubeRegularityPassed =
    rootCountSignaturePreserved &&
    allFDeltaSignsPreserved &&
    minAbsFDelta > 0 &&
    minPositiveDelta > 0 &&
    (minSeparation === null || minSeparation > 0);

  return {
    probe_type: "sampled-root-tube-regularity-budget",
    certifies_interval_root_isolation: false,
    certifies_interval_root_tube_isolation: false,
    certifies_interval_root_sheet_continuation: false,
    certifies_interval_F_delta_lower_bound: false,
    root_count_signatures: rootCountSignatures,
    root_count_signature_preserved: rootCountSignaturePreserved,
    all_F_delta_signs_preserved: allFDeltaSignsPreserved,
    minimum_sampled_abs_F_delta: formatSmallNumber(minAbsFDelta),
    minimum_sampled_positive_delta: formatSmallNumber(minPositiveDelta),
    minimum_sampled_root_tube_separation:
      minSeparation === null ? null : formatSmallNumber(minSeparation),
    maximum_sampled_branch_delta_width: formatSmallNumber(maxBranchDeltaWidth),
    term_root_tube_rows: termRows,
    status: sampledTubeRegularityPassed
      ? "sampled-root-tube-regularity-feasibility-passed"
      : "sampled-root-tube-regularity-feasibility-open",
  };
}

function buildFiniteIntervalRootTubeCertificateTarget({
  sampledRootTubeRegularityProbe,
  speedRatioInterval,
}) {
  const deltaDomain = [
    SOURCE_ROOT_DOMAIN_MIN,
    sourceRootDomainMax(Number(speedRatioInterval[1])),
  ];
  let minimumTubePaddingRadius = Infinity;
  let minimumComplementSlabWidth = Infinity;
  let retainedTubeCount = 0;
  let complementSlabCount = 0;

  const termTargetRows =
    sampledRootTubeRegularityProbe.term_root_tube_rows.map((termRow) => {
      const sampledBranches = termRow.branches.map((branch) => ({
        root_index: branch.root_index,
        delta_min: Number(branch.delta_min),
        delta_max: Number(branch.delta_max),
        F_delta_sign:
          branch.F_delta_signs.length === 1 ? branch.F_delta_signs[0] : "mixed",
        min_abs_F_delta: Number(branch.min_abs_F_delta),
      }));
      const protectedTubes = sampledBranches.map((branch, index) => {
        const leftBoundary =
          index === 0 ? deltaDomain[0] : sampledBranches[index - 1].delta_max;
        const rightBoundary =
          index === sampledBranches.length - 1
            ? deltaDomain[1]
            : sampledBranches[index + 1].delta_min;
        const leftGap = branch.delta_min - leftBoundary;
        const rightGap = rightBoundary - branch.delta_max;
        const tubePaddingRadius = 0.25 * Math.min(leftGap, rightGap);
        const protectedInterval = [
          branch.delta_min - tubePaddingRadius,
          branch.delta_max + tubePaddingRadius,
        ];

        minimumTubePaddingRadius = Math.min(
          minimumTubePaddingRadius,
          tubePaddingRadius
        );
        retainedTubeCount += 1;

        return {
          root_index: branch.root_index,
          sampled_delta_interval: [
            formatSmallNumber(branch.delta_min),
            formatSmallNumber(branch.delta_max),
          ],
          protected_delta_interval: protectedInterval.map(formatSmallNumber),
          tube_padding_radius: formatSmallNumber(tubePaddingRadius),
          sampled_F_delta_sign: branch.F_delta_sign,
          sampled_min_abs_F_delta: formatSmallNumber(branch.min_abs_F_delta),
          interval_obligations: {
            endpoint_sign_change:
              "prove F(P,delta_r^-) and F(P,delta_r^+) have opposite interval signs",
            fixed_F_delta_sign:
              "prove F_delta(P,D_r) has the sampled sign with abs(F_delta)>=lambda_r>0",
            retained_sheet:
              "then D_r contains exactly one C^1 implicit root sheet over P",
          },
        };
      });
      const complementSlabs = [];
      let leftCursor = deltaDomain[0];
      for (const tube of protectedTubes) {
        const tubeLeft = Number(tube.protected_delta_interval[0]);
        const tubeRight = Number(tube.protected_delta_interval[1]);
        if (tubeLeft > leftCursor) {
          const width = tubeLeft - leftCursor;
          minimumComplementSlabWidth = Math.min(
            minimumComplementSlabWidth,
            width
          );
          complementSlabs.push({
            complement_index: complementSlabs.length,
            delta_interval: [
              formatSmallNumber(leftCursor),
              formatSmallNumber(tubeLeft),
            ],
            width: formatSmallNumber(width),
            interval_obligation:
              "prove 0 notin F(P,K_l), so no source root lies in this complement slab",
          });
        }
        leftCursor = tubeRight;
      }
      if (deltaDomain[1] > leftCursor) {
        const width = deltaDomain[1] - leftCursor;
        minimumComplementSlabWidth = Math.min(
          minimumComplementSlabWidth,
          width
        );
        complementSlabs.push({
          complement_index: complementSlabs.length,
          delta_interval: [
            formatSmallNumber(leftCursor),
            formatSmallNumber(deltaDomain[1]),
          ],
          width: formatSmallNumber(width),
          interval_obligation:
            "prove 0 notin F(P,K_l), so no source root lies in this complement slab",
        });
      }
      complementSlabCount += complementSlabs.length;

      return {
        term_label: termRow.term_label,
        kappa: termRow.kappa,
        sigma: termRow.sigma,
        source_delta_domain: deltaDomain.map(formatSmallNumber),
        retained_tube_count: protectedTubes.length,
        complement_slab_count: complementSlabs.length,
        protected_tubes: protectedTubes,
        complement_slabs: complementSlabs,
      };
    });
  const finiteRootTubeTargetPassed =
    sampledRootTubeRegularityProbe.status ===
      "sampled-root-tube-regularity-feasibility-passed" &&
    minimumTubePaddingRadius > 0 &&
    minimumComplementSlabWidth > 0;

  return {
    target_type: "finite-interval-root-tube-certificate-target",
    certifies_interval_root_tube_isolation: false,
    certifies_interval_root_sheet_continuation: false,
    certifies_interval_F_delta_lower_bound: false,
    source_delta_domain: deltaDomain.map(formatSmallNumber),
    retained_tube_count: retainedTubeCount,
    complement_slab_count: complementSlabCount,
    minimum_tube_padding_radius: formatSmallNumber(minimumTubePaddingRadius),
    minimum_complement_slab_width: formatSmallNumber(
      minimumComplementSlabWidth
    ),
    interval_implication:
      "If every protected tube has endpoint interval sign change and fixed-sign F_delta floor, and every complement slab excludes zero, then the sampled root signature lifts to an interval root-tube isolation and C^1 root-sheet continuation proof.",
    term_target_rows: termTargetRows,
    status: finiteRootTubeTargetPassed
      ? "finite-interval-root-tube-certificate-target-emitted"
      : "finite-interval-root-tube-certificate-target-open",
  };
}

function buildParentCellPeakRows({
  parentRow,
  rootSubdivisions,
  parentStencilSamplesPerAxis,
  refinementSamplesPerSubcellAxis,
}) {
  const fineCount = fineGridCount({
    parentStencilSamplesPerAxis,
    refinementSamplesPerSubcellAxis,
  });
  const fineRows = buildFineGrid({ parentRow, rootSubdivisions, fineCount });
  const coarseStep = refinementSamplesPerSubcellAxis - 1;
  const coarseRows = [];
  for (
    let thetaIndex = 0;
    thetaIndex < parentStencilSamplesPerAxis;
    thetaIndex += 1
  ) {
    for (
      let speedIndex = 0;
      speedIndex < parentStencilSamplesPerAxis;
      speedIndex += 1
    ) {
      coarseRows.push(
        rowAt(fineRows, fineCount, thetaIndex * coarseStep, speedIndex * coarseStep)
      );
    }
  }

  const parentCenterDerivative = Number(parentRow.derivative_center);
  const parentAllowance = Number(parentRow.predecessor_local_variation_allowance);
  const parentCoarseMax = Math.max(...coarseRows.map((row) => row.derivative));
  const parentCoarseMin = Math.min(...coarseRows.map((row) => row.derivative));
  const parentObservedVariation = Math.max(
    0,
    parentCoarseMax - parentCenterDerivative
  );
  const parentPeakBudget = parentAllowance - parentObservedVariation;
  const parentFineSummary = summarizeRows(fineRows);
  const parentFineExcessOverCoarse = Math.max(
    0,
    parentFineSummary.max_derivative - parentCoarseMax
  );
  const parentPeakBudgetAfterFineReplay =
    parentPeakBudget - parentFineExcessOverCoarse;
  const subcellRows = [];

  for (
    let thetaSubcellIndex = 0;
    thetaSubcellIndex < parentStencilSamplesPerAxis - 1;
    thetaSubcellIndex += 1
  ) {
    for (
      let speedSubcellIndex = 0;
      speedSubcellIndex < parentStencilSamplesPerAxis - 1;
      speedSubcellIndex += 1
    ) {
      const thetaStart = thetaSubcellIndex * coarseStep;
      const speedStart = speedSubcellIndex * coarseStep;
      const thetaEnd = thetaStart + coarseStep;
      const speedEnd = speedStart + coarseStep;
      const thetaSubcellInterval = subintervalForIndex({
        left: Number(parentRow.theta_interval[0]),
        right: Number(parentRow.theta_interval[1]),
        index: thetaSubcellIndex,
        subcellCount: parentStencilSamplesPerAxis - 1,
      });
      const speedSubcellInterval = subintervalForIndex({
        left: Number(parentRow.speed_ratio_interval[0]),
        right: Number(parentRow.speed_ratio_interval[1]),
        index: speedSubcellIndex,
        subcellCount: parentStencilSamplesPerAxis - 1,
      });
      const vertexRows = [
        rowAt(fineRows, fineCount, thetaStart, speedStart),
        rowAt(fineRows, fineCount, thetaStart, speedEnd),
        rowAt(fineRows, fineCount, thetaEnd, speedStart),
        rowAt(fineRows, fineCount, thetaEnd, speedEnd),
      ];
      const refinedRows = [];
      for (let thetaIndex = thetaStart; thetaIndex <= thetaEnd; thetaIndex += 1) {
        for (
          let speedIndex = speedStart;
          speedIndex <= speedEnd;
          speedIndex += 1
        ) {
          refinedRows.push(rowAt(fineRows, fineCount, thetaIndex, speedIndex));
        }
      }
      const vertexSummary = summarizeRows(vertexRows);
      const refinedSummary = summarizeRows(refinedRows);
      const refinedExcessOverVertices = Math.max(
        0,
        refinedSummary.max_derivative - vertexSummary.max_derivative
      );
      const effectivePeakCeilingFromVertices = Math.min(
        parentPeakBudget,
        -vertexSummary.max_derivative
      );
      const effectivePeakCeilingAfterFineReplay = Math.min(
        parentPeakBudgetAfterFineReplay,
        -refinedSummary.max_derivative
      );
      const thetaWidth = thetaSubcellInterval[1] - thetaSubcellInterval[0];
      const speedWidth = speedSubcellInterval[1] - speedSubcellInterval[0];
      const bilinearCurvatureCondition =
        buildBilinearCurvatureSufficientCondition({
          thetaWidth,
          speedWidth,
          overshootCeiling: effectivePeakCeilingAfterFineReplay,
        });
      const sampledPureCurvatureProbe = buildSampledPureCurvatureProbe({
        fineRows,
        fineCount,
        thetaStart,
        thetaEnd,
        speedStart,
        speedEnd,
        thetaStep: thetaWidth / coarseStep,
        speedStep: speedWidth / coarseStep,
        thetaScale: Number(
          bilinearCurvatureCondition.theta_second_partial_coefficient
        ),
        speedScale: Number(
          bilinearCurvatureCondition.speed_second_partial_coefficient
        ),
        overshootCeiling: effectivePeakCeilingAfterFineReplay,
      });
      const sampledRootTubeRegularityProbe =
        buildSampledRootTubeRegularityProbe(refinedRows);
      const finiteIntervalRootTubeCertificateTarget =
        buildFiniteIntervalRootTubeCertificateTarget({
          sampledRootTubeRegularityProbe,
          speedRatioInterval: speedSubcellInterval,
        });
      const certified =
        parentPeakBudget > 0 &&
        parentPeakBudgetAfterFineReplay > 0 &&
        effectivePeakCeilingAfterFineReplay > 0 &&
        refinedSummary.max_derivative < 0 &&
        vertexSummary.source_root_count_preserved &&
        vertexSummary.term_root_count_signature_preserved &&
        refinedSummary.source_root_count_preserved &&
        refinedSummary.term_root_count_signature_preserved &&
        refinedSummary.min_abs_F_delta > 0;

      subcellRows.push({
        subcell_row_id: `${parentRow.mesh_row_id}.peak-budget.${thetaSubcellIndex}.${speedSubcellIndex}`,
        parent_mesh_row_id: parentRow.mesh_row_id,
        theta_cell_index: parentRow.theta_cell_index,
        speed_cell_index: parentRow.speed_cell_index,
        theta_subcell_index: thetaSubcellIndex,
        speed_subcell_index: speedSubcellIndex,
        theta_interval: thetaSubcellInterval.map(formatSmallNumber),
        speed_ratio_interval: speedSubcellInterval.map(formatSmallNumber),
        theta_width: formatSmallNumber(thetaWidth),
        speed_ratio_width: formatSmallNumber(speedWidth),
        parent_derivative_center: formatSmallNumber(parentCenterDerivative),
        parent_local_variation_allowance: formatSmallNumber(parentAllowance),
        parent_coarse_stencil_max_derivative: formatSmallNumber(parentCoarseMax),
        parent_coarse_stencil_min_derivative: formatSmallNumber(parentCoarseMin),
        parent_peak_budget_mu: formatSmallNumber(parentPeakBudget),
        parent_refined_max_derivative: formatSmallNumber(
          parentFineSummary.max_derivative
        ),
        parent_refined_excess_over_coarse_stencil: formatSmallNumber(
          parentFineExcessOverCoarse
        ),
        parent_peak_budget_after_refined_replay: formatSmallNumber(
          parentPeakBudgetAfterFineReplay
        ),
        vertex_max_derivative: formatSmallNumber(vertexSummary.max_derivative),
        vertex_min_derivative: formatSmallNumber(vertexSummary.min_derivative),
        refined_max_derivative: formatSmallNumber(refinedSummary.max_derivative),
        refined_min_derivative: formatSmallNumber(refinedSummary.min_derivative),
        refined_excess_over_vertices: formatSmallNumber(
          refinedExcessOverVertices
        ),
        allowable_peak_overshoot_before_allowance_failure:
          formatSmallNumber(parentPeakBudget),
        allowable_peak_overshoot_after_refined_replay:
          formatSmallNumber(parentPeakBudgetAfterFineReplay),
        allowable_peak_overshoot_before_negativity_failure:
          formatSmallNumber(-vertexSummary.max_derivative),
        effective_peak_overshoot_ceiling_from_vertices: formatSmallNumber(
          effectivePeakCeilingFromVertices
        ),
        effective_peak_overshoot_ceiling_after_refined_replay:
          formatSmallNumber(effectivePeakCeilingAfterFineReplay),
        backend_input_inequality: {
          object: "sup_Q f_cross_prime",
          vertex_max_derivative: formatSmallNumber(vertexSummary.max_derivative),
          refined_max_derivative: formatSmallNumber(refinedSummary.max_derivative),
          required_overshoot_bound_less_than: formatSmallNumber(
            effectivePeakCeilingAfterFineReplay
          ),
          sufficient_condition:
            "prove sup_Q f_cross_prime <= vertex_max_derivative + epsilon_Q with epsilon_Q < required_overshoot_bound_less_than",
          protects_allowance: true,
          protects_derivative_negativity: true,
        },
        bilinear_curvature_sufficient_condition: bilinearCurvatureCondition,
        sampled_pure_curvature_probe: sampledPureCurvatureProbe,
        sampled_root_tube_regularity_probe: sampledRootTubeRegularityProbe,
        finite_interval_root_tube_certificate_target:
          finiteIntervalRootTubeCertificateTarget,
        source_root_counts: refinedSummary.source_root_counts,
        source_root_count_preserved: refinedSummary.source_root_count_preserved,
        term_root_count_signatures: refinedSummary.term_root_count_signatures,
        min_abs_F_delta: formatSmallNumber(refinedSummary.min_abs_F_delta),
        status: certified
          ? "i1-f1-bracket-local-derivative-peak-budget-subcell-certified"
          : "i1-f1-bracket-local-derivative-peak-budget-subcell-open",
      });
    }
  }

  return { fineSampleCount: fineRows.length, subcellRows };
}

function buildPeakBudgetRows({
  parentRows,
  rootSubdivisions,
  parentStencilSamplesPerAxis,
  refinementSamplesPerSubcellAxis,
}) {
  const allRows = [];
  let totalFineSampleCount = 0;
  for (const parentRow of parentRows) {
    const { fineSampleCount, subcellRows } = buildParentCellPeakRows({
      parentRow,
      rootSubdivisions,
      parentStencilSamplesPerAxis,
      refinementSamplesPerSubcellAxis,
    });
    totalFineSampleCount += fineSampleCount;
    allRows.push(...subcellRows);
  }
  return { allRows, totalFineSampleCount };
}

function buildPeakBudgetSummary({ rows, totalFineSampleCount }) {
  const minParentBudget = Math.min(
    ...rows.map((row) => Number(row.parent_peak_budget_mu))
  );
  const minBudgetAfterFineReplay = Math.min(
    ...rows.map((row) => Number(row.parent_peak_budget_after_refined_replay))
  );
  const minEffectiveCeiling = Math.min(
    ...rows.map((row) =>
      Number(row.effective_peak_overshoot_ceiling_after_refined_replay)
    )
  );
  const maxRefinedDerivative = Math.max(
    ...rows.map((row) => Number(row.refined_max_derivative))
  );
  const maxRefinedExcessOverVertices = Math.max(
    ...rows.map((row) => Number(row.refined_excess_over_vertices))
  );
  const maxParentFineExcessOverCoarse = Math.max(
    ...rows.map((row) =>
      Number(row.parent_refined_excess_over_coarse_stencil)
    )
  );
  const minAbsFDelta = Math.min(
    ...rows.map((row) => Number(row.min_abs_F_delta))
  );
  const minRootTubeAbsFDelta = Math.min(
    ...rows.map((row) =>
      Number(
        row.sampled_root_tube_regularity_probe.minimum_sampled_abs_F_delta
      )
    )
  );
  const minRootTubePositiveDelta = Math.min(
    ...rows.map((row) =>
      Number(
        row.sampled_root_tube_regularity_probe.minimum_sampled_positive_delta
      )
    )
  );
  const minRootTubeSeparation = Math.min(
    ...rows
      .map((row) =>
        Number(
          row.sampled_root_tube_regularity_probe
            .minimum_sampled_root_tube_separation
        )
      )
      .filter((value) => Number.isFinite(value))
  );
  const maxRootBranchDeltaWidth = Math.max(
    ...rows.map((row) =>
      Number(
        row.sampled_root_tube_regularity_probe
          .maximum_sampled_branch_delta_width
      )
    )
  );
  const minFiniteRootTubeTargetPadding = Math.min(
    ...rows.map((row) =>
      Number(
        row.finite_interval_root_tube_certificate_target
          .minimum_tube_padding_radius
      )
    )
  );
  const minFiniteRootTubeComplementWidth = Math.min(
    ...rows.map((row) =>
      Number(
        row.finite_interval_root_tube_certificate_target
          .minimum_complement_slab_width
      )
    )
  );
  const minBalancedPureCurvatureBound = Math.min(
    ...rows.map((row) =>
      Number(
        row.bilinear_curvature_sufficient_condition
          .balanced_pure_curvature_bound
      )
    )
  );
  const maxSampledCurvatureRemainder = Math.max(
    ...rows.map((row) =>
      Number(row.sampled_pure_curvature_probe.sampled_bilinear_remainder)
    )
  );
  const maxSampledCurvatureRatio = Math.max(
    ...rows.map((row) =>
      Number(
        row.sampled_pure_curvature_probe
          .sampled_bilinear_remainder_ratio_to_required_bound
      )
    )
  );
  const curvatureBottleneck = rows.reduce((candidate, row) =>
    Number(
      row.sampled_pure_curvature_probe
        .sampled_bilinear_remainder_ratio_to_required_bound
    ) >
    Number(
      candidate.sampled_pure_curvature_probe
        .sampled_bilinear_remainder_ratio_to_required_bound
    )
      ? row
      : candidate
  );
  const rootTubeAbsFDeltaBottleneck = rows.reduce((candidate, row) =>
    Number(row.sampled_root_tube_regularity_probe.minimum_sampled_abs_F_delta) <
    Number(candidate.sampled_root_tube_regularity_probe.minimum_sampled_abs_F_delta)
      ? row
      : candidate
  );
  const rootTubeSeparationBottleneck = rows.reduce((candidate, row) => {
    const rowSeparation = Number(
      row.sampled_root_tube_regularity_probe.minimum_sampled_root_tube_separation
    );
    const candidateSeparation = Number(
      candidate.sampled_root_tube_regularity_probe
        .minimum_sampled_root_tube_separation
    );
    if (!Number.isFinite(rowSeparation)) {
      return candidate;
    }
    if (!Number.isFinite(candidateSeparation)) {
      return row;
    }
    return rowSeparation < candidateSeparation ? row : candidate;
  });
  const finiteRootTubePaddingBottleneck = rows.reduce((candidate, row) =>
    Number(
      row.finite_interval_root_tube_certificate_target
        .minimum_tube_padding_radius
    ) <
    Number(
      candidate.finite_interval_root_tube_certificate_target
        .minimum_tube_padding_radius
    )
      ? row
      : candidate
  );
  const finiteRootTubeComplementBottleneck = rows.reduce((candidate, row) =>
    Number(
      row.finite_interval_root_tube_certificate_target
        .minimum_complement_slab_width
    ) <
    Number(
      candidate.finite_interval_root_tube_certificate_target
        .minimum_complement_slab_width
    )
      ? row
      : candidate
  );
  const bottleneck = rows.reduce((candidate, row) =>
    Number(row.effective_peak_overshoot_ceiling_after_refined_replay) <
    Number(candidate.effective_peak_overshoot_ceiling_after_refined_replay)
      ? row
      : candidate
  );
  const sourceRootCounts = [
    ...new Set(rows.flatMap((row) => row.source_root_counts)),
  ].sort((left, right) => left - right);
  const termRootCountSignatures = [
    ...new Set(rows.flatMap((row) => row.term_root_count_signatures)),
  ].sort();

  return {
    peak_budget_row_id:
      "I1.f1.bracket-local-derivative-peak-budget-reduction",
    successor_row: REDUCED_LOCAL_SUCCESSOR_ROW,
    subcell_row_count: rows.length,
    certified_subcell_row_count: rows.filter(
      (row) =>
        row.status ===
        "i1-f1-bracket-local-derivative-peak-budget-subcell-certified"
    ).length,
    total_refined_derivative_sample_count: totalFineSampleCount,
    minimum_parent_peak_budget_mu: formatSmallNumber(minParentBudget),
    minimum_peak_budget_after_refined_replay: formatSmallNumber(
      minBudgetAfterFineReplay
    ),
    minimum_effective_peak_overshoot_ceiling_after_refined_replay:
      formatSmallNumber(minEffectiveCeiling),
    maximum_refined_derivative: formatSmallNumber(maxRefinedDerivative),
    minimum_refined_derivative_clearance: formatSmallNumber(
      -maxRefinedDerivative
    ),
    maximum_refined_excess_over_vertices: formatSmallNumber(
      maxRefinedExcessOverVertices
    ),
    maximum_parent_refined_excess_over_coarse_stencil: formatSmallNumber(
      maxParentFineExcessOverCoarse
    ),
    minimum_balanced_pure_curvature_bound: formatSmallNumber(
      minBalancedPureCurvatureBound
    ),
    maximum_sampled_bilinear_curvature_remainder: formatSmallNumber(
      maxSampledCurvatureRemainder
    ),
    maximum_sampled_bilinear_curvature_remainder_ratio: formatSmallNumber(
      maxSampledCurvatureRatio
    ),
    sampled_bilinear_curvature_feasibility_subcell_count: rows.filter(
      (row) =>
        row.sampled_pure_curvature_probe.status ===
        "sampled-bilinear-curvature-feasibility-passed"
    ).length,
    sampled_bilinear_curvature_bottleneck_subcell_row_id:
      curvatureBottleneck.subcell_row_id,
    minimum_sampled_abs_F_delta: formatSmallNumber(minAbsFDelta),
    minimum_sampled_root_tube_abs_F_delta:
      formatSmallNumber(minRootTubeAbsFDelta),
    minimum_sampled_root_tube_positive_delta:
      formatSmallNumber(minRootTubePositiveDelta),
    minimum_sampled_root_tube_separation:
      formatSmallNumber(minRootTubeSeparation),
    maximum_sampled_root_branch_delta_width:
      formatSmallNumber(maxRootBranchDeltaWidth),
    sampled_root_tube_regularity_feasibility_subcell_count: rows.filter(
      (row) =>
        row.sampled_root_tube_regularity_probe.status ===
        "sampled-root-tube-regularity-feasibility-passed"
    ).length,
    sampled_root_tube_abs_F_delta_bottleneck_subcell_row_id:
      rootTubeAbsFDeltaBottleneck.subcell_row_id,
    sampled_root_tube_separation_bottleneck_subcell_row_id:
      rootTubeSeparationBottleneck.subcell_row_id,
    finite_interval_root_tube_certificate_target_subcell_count: rows.filter(
      (row) =>
        row.finite_interval_root_tube_certificate_target.status ===
        "finite-interval-root-tube-certificate-target-emitted"
    ).length,
    total_retained_root_tube_target_count: rows.reduce(
      (sum, row) =>
        sum + row.finite_interval_root_tube_certificate_target.retained_tube_count,
      0
    ),
    total_complement_slab_target_count: rows.reduce(
      (sum, row) =>
        sum +
        row.finite_interval_root_tube_certificate_target.complement_slab_count,
      0
    ),
    minimum_finite_root_tube_target_padding_radius: formatSmallNumber(
      minFiniteRootTubeTargetPadding
    ),
    minimum_finite_root_tube_target_complement_width: formatSmallNumber(
      minFiniteRootTubeComplementWidth
    ),
    finite_root_tube_padding_bottleneck_subcell_row_id:
      finiteRootTubePaddingBottleneck.subcell_row_id,
    finite_root_tube_complement_bottleneck_subcell_row_id:
      finiteRootTubeComplementBottleneck.subcell_row_id,
    source_root_counts: sourceRootCounts,
    source_root_count_preserved:
      sourceRootCounts.length === 1 &&
      sourceRootCounts[0] === EXPECTED_SOURCE_ROOT_COUNT,
    term_root_count_signatures: termRootCountSignatures,
    bottleneck_subcell_row_id: bottleneck.subcell_row_id,
    bottleneck_parent_mesh_row_id: bottleneck.parent_mesh_row_id,
    status:
      rows.every(
        (row) =>
          row.status ===
            "i1-f1-bracket-local-derivative-peak-budget-subcell-certified" &&
          row.sampled_pure_curvature_probe.status ===
            "sampled-bilinear-curvature-feasibility-passed" &&
          row.sampled_root_tube_regularity_probe.status ===
            "sampled-root-tube-regularity-feasibility-passed" &&
          row.finite_interval_root_tube_certificate_target.status ===
            "finite-interval-root-tube-certificate-target-emitted"
      ) && minEffectiveCeiling > 0
        ? "i1-f1-bracket-local-finite-root-tube-target-and-sampled-bilinear-curvature-feasibility-certified"
        : "i1-f1-bracket-local-derivative-peak-budget-reduction-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
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

  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  if (
    !Number.isInteger(endpointSpeedSampleCount) ||
    endpointSpeedSampleCount < 3
  ) {
    throw new Error("endpointSpeedSampleCount must be an integer >= 3");
  }
  if (
    !Number.isInteger(zeroBranchSpeedSampleCount) ||
    zeroBranchSpeedSampleCount < 3
  ) {
    throw new Error("zeroBranchSpeedSampleCount must be an integer >= 3");
  }
  if (
    !Number.isInteger(derivativeThetaSampleCount) ||
    derivativeThetaSampleCount < 8
  ) {
    throw new Error("derivativeThetaSampleCount must be an integer >= 8");
  }
  if (!Number.isInteger(thetaCellCount) || thetaCellCount < 4) {
    throw new Error("thetaCellCount must be an integer >= 4");
  }
  if (!Number.isInteger(speedCellCount) || speedCellCount < 2) {
    throw new Error("speedCellCount must be an integer >= 2");
  }
  if (
    !Number.isInteger(parentStencilSamplesPerAxis) ||
    parentStencilSamplesPerAxis < 3 ||
    parentStencilSamplesPerAxis % 2 === 0
  ) {
    throw new Error("parentStencilSamplesPerAxis must be an odd integer >= 3");
  }
  if (
    !Number.isInteger(refinementSamplesPerSubcellAxis) ||
    refinementSamplesPerSubcellAxis < 2
  ) {
    throw new Error("refinementSamplesPerSubcellAxis must be an integer >= 2");
  }
  if (!Number.isFinite(endpointPadding) || endpointPadding <= 0) {
    throw new Error("endpointPadding must be positive");
  }
  if (!Number.isFinite(machinePadding) || machinePadding <= 0) {
    throw new Error("machinePadding must be positive");
  }
  if (!Number.isFinite(bisectionTolerance) || bisectionTolerance <= 0) {
    throw new Error("bisectionTolerance must be positive");
  }

  const variationCertificate =
    buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativeVariationCertificate(
      {
        rootSubdivisions,
        endpointSpeedSampleCount,
        zeroBranchSpeedSampleCount,
        derivativeThetaSampleCount,
        thetaCellCount,
        speedCellCount,
        stencilSamplesPerAxis: parentStencilSamplesPerAxis,
        endpointPadding,
        machinePadding,
        bisectionTolerance,
      }
    );
  const variationCertificateErrors =
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativeVariationCertificate(
      variationCertificate
    );
  const { allRows, totalFineSampleCount } = buildPeakBudgetRows({
    parentRows: variationCertificate.stencil_rows,
    rootSubdivisions,
    parentStencilSamplesPerAxis,
    refinementSamplesPerSubcellAxis,
  });
  const peakBudgetSummary = buildPeakBudgetSummary({
    rows: allRows,
    totalFineSampleCount,
  });
  const certified =
    variationCertificateErrors.length === 0 &&
    variationCertificate.artifact_claim
      .certifies_I1_f1_bracket_local_derivative_variation_stencil_certificate ===
      true &&
    peakBudgetSummary.status ===
      "i1-f1-bracket-local-finite-root-tube-target-and-sampled-bilinear-curvature-feasibility-certified";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_DERIVATIVE_PEAK_BUDGET_REDUCTION_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-variation-certificate.md",
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-i1-local-zero-isolation-burden-reduction.md",
    ],
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-peak-budget-reduction.md",
    variation_certificate_check: {
      schema: variationCertificate.schema,
      valid: variationCertificateErrors.length === 0,
      errors: variationCertificateErrors,
      theory_status: variationCertificate.result.theory_status,
      retained_branch: variationCertificate.result.retained_branch,
      first_successor_row: variationCertificate.result.first_successor_row,
      certifies_I1_f1_bracket_local_derivative_variation_stencil_certificate:
        variationCertificate.artifact_claim
          .certifies_I1_f1_bracket_local_derivative_variation_stencil_certificate ===
        true,
      certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure:
        variationCertificate.artifact_claim
          .certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure ===
        true,
      summary: variationCertificate.variation_summary,
    },
    peak_budget_parameters: {
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
      fine_grid_samples_per_parent_axis: fineGridCount({
        parentStencilSamplesPerAxis,
        refinementSamplesPerSubcellAxis,
      }),
      endpoint_padding: formatSmallNumber(endpointPadding),
      machine_padding: formatSmallNumber(machinePadding),
      bisection_tolerance: formatSmallNumber(bisectionTolerance),
    },
    i1_bracket_local_derivative_peak_budget_theorem: buildPeakBudgetTheorem(),
    backend_input_formula_sheet: buildBackendFormulaSheet(),
    peak_budget_rows: allRows,
    peak_budget_summary: peakBudgetSummary,
    interval_profile_boundary: {
      certifies_I1_f1_bracket_local_derivative_peak_budget_reduction:
        certified,
      converts_directed_rounding_derivative_variation_to_finite_subcell_peak_bounds:
        certified,
      certifies_refined_sampled_peak_audit: certified,
      certifies_sampled_bilinear_curvature_feasibility: certified,
      certifies_sampled_root_tube_regularity_feasibility: certified,
      certifies_finite_interval_root_tube_certificate_target: certified,
      certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure:
        false,
      certifies_interval_second_partial_curvature_enclosure: false,
      certifies_interval_root_tube_isolation: false,
      certifies_interval_root_sheet_continuation: false,
      certifies_interval_F_delta_lower_bound: false,
      certifies_I1_derivative_negative_full_cell_interval_enclosure: false,
      certifies_I1_f1_full_interval_zero_isolation: false,
      certifies_I1_zero_isolation: false,
      certifies_outward_rounded_interval_enclosure: false,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      open_quantities: [
        "directed-rounded interval/Taylor overshoot bound below each finite subcell peak budget",
        "interval endpoint-sign, fixed-F_delta, and complement-exclusion enclosures for every emitted root-tube target",
        "interval pure second-partial curvature bounds below the sampled bilinear feasibility margins",
        "full bracket-local derivative-variation enclosure",
        "full I1.f1 interval zero isolation",
      ],
      status:
        "i1-f1-bracket-local-finite-root-tube-target-and-sampled-bilinear-curvature-feasibility-certified-directed-rounding-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_I1_f1_bracket_local_derivative_peak_budget_reduction: certified,
      converts_directed_rounding_derivative_variation_to_finite_subcell_peak_bounds:
        certified,
      certifies_refined_sampled_peak_audit: certified,
      certifies_sampled_bilinear_curvature_feasibility: certified,
      certifies_sampled_root_tube_regularity_feasibility: certified,
      certifies_finite_interval_root_tube_certificate_target: certified,
      certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure:
        false,
      certifies_interval_second_partial_curvature_enclosure: false,
      certifies_interval_root_tube_isolation: false,
      certifies_interval_root_sheet_continuation: false,
      certifies_interval_F_delta_lower_bound: false,
      certifies_I1_derivative_negative_full_cell_interval_enclosure: false,
      certifies_I1_f1_full_interval_zero_isolation: false,
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
      retained_branch: false,
      claim_level:
        "I1.f1 bracket-local finite peak-budget reduction plus finite interval root-tube certificate targets, sampled bilinear curvature feasibility, and sampled root-tube regularity feasibility for the directed-rounding derivative-variation row; full directed-rounding derivative variation, interval root isolation, full interval curvature enclosure, full zero isolation, critical exhaustion, quadrature, and retained branch status remain open",
    },
    result: {
      theory_status: certified
        ? "source-atlas-aware-i1-f1-bracket-local-finite-root-tube-target-and-sampled-bilinear-curvature-feasibility-certified"
        : "source-atlas-aware-i1-f1-bracket-local-derivative-peak-budget-reduction-open",
      first_successor_row: REDUCED_LOCAL_SUCCESSOR_ROW,
      residual_subobligation:
        "prove the emitted interval root-tube endpoint-sign, fixed-F_delta, complement-exclusion, and pure-curvature bounds below the finite bilinear subcell budgets",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The I1.f1 directed-rounding derivative-variation burden is reduced to finite subcell peak budgets, finite interval root-tube certificate targets, and sampled bilinear curvature probes. The missing work is proof-grade interval enclosure for the emitted root-tube targets and interval/Taylor curvature bounds below those budgets.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_DERIVATIVE_PEAK_BUDGET_REDUCTION_SCHEMA,
    "schema must match I1 bracket local derivative peak budget reduction schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match I1 bracket local derivative peak budget reduction packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.variation_certificate_check?.valid === true &&
      artifact?.variation_certificate_check
        ?.certifies_I1_f1_bracket_local_derivative_variation_stencil_certificate ===
        true &&
      artifact?.variation_certificate_check
        ?.certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure ===
        false &&
      artifact?.variation_certificate_check?.first_successor_row ===
        REDUCED_LOCAL_SUCCESSOR_ROW,
    "variation predecessor must validate and leave directed rounding open",
    errors
  );
  assertField(
    artifact?.peak_budget_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "I1 peak budget reduction must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.peak_budget_parameters?.speed_band === undefined &&
      artifact?.peak_budget_parameters?.speed_window === undefined &&
      artifact?.peak_budget_parameters?.speed_min === undefined &&
      artifact?.peak_budget_parameters?.speed_max === undefined,
    "peak budget parameters must not contain speed-band fields",
    errors
  );
  assertField(
    Array.isArray(artifact?.peak_budget_rows) &&
      artifact.peak_budget_rows.length ===
        artifact?.peak_budget_parameters?.theta_cell_count *
          artifact?.peak_budget_parameters?.speed_cell_count *
          (artifact?.peak_budget_parameters?.parent_stencil_samples_per_axis - 1) *
          (artifact?.peak_budget_parameters?.parent_stencil_samples_per_axis - 1) &&
      artifact.peak_budget_rows.every(
        (row) =>
          row.status ===
            "i1-f1-bracket-local-derivative-peak-budget-subcell-certified" &&
          row.source_root_count_preserved === true &&
          row.source_root_counts?.length === 1 &&
          row.source_root_counts?.[0] === EXPECTED_SOURCE_ROOT_COUNT &&
          row.term_root_count_signatures?.length === 1 &&
          row.term_root_count_signatures?.[0] === EXPECTED_TERM_SIGNATURE &&
          row.theta_interval?.length === 2 &&
          row.speed_ratio_interval?.length === 2 &&
          Number(row.theta_width) > 0 &&
          Number(row.speed_ratio_width) > 0 &&
          row.backend_input_inequality?.object === "sup_Q f_cross_prime" &&
          Number(
            row.backend_input_inequality
              ?.required_overshoot_bound_less_than
          ) ===
            Number(
              row.effective_peak_overshoot_ceiling_after_refined_replay
            ) &&
          row.bilinear_curvature_sufficient_condition?.function ===
            "g=f_cross_prime" &&
          Number(
            row.bilinear_curvature_sufficient_condition
              ?.balanced_pure_curvature_bound
          ) > 0 &&
          Number(
            row.bilinear_curvature_sufficient_condition
              ?.required_error_bound_less_than
          ) ===
            Number(
              row.effective_peak_overshoot_ceiling_after_refined_replay
            ) &&
          row.sampled_pure_curvature_probe?.status ===
            "sampled-bilinear-curvature-feasibility-passed" &&
          row.sampled_pure_curvature_probe
            ?.certifies_interval_second_partial_bounds === false &&
          row.sampled_root_tube_regularity_probe?.status ===
            "sampled-root-tube-regularity-feasibility-passed" &&
          row.sampled_root_tube_regularity_probe
            ?.certifies_interval_root_isolation === false &&
          row.sampled_root_tube_regularity_probe
            ?.certifies_interval_root_tube_isolation === false &&
          row.sampled_root_tube_regularity_probe
            ?.certifies_interval_root_sheet_continuation === false &&
          row.sampled_root_tube_regularity_probe
            ?.certifies_interval_F_delta_lower_bound === false &&
          row.sampled_root_tube_regularity_probe
            ?.root_count_signature_preserved === true &&
          row.sampled_root_tube_regularity_probe
            ?.all_F_delta_signs_preserved === true &&
          Number(
            row.sampled_root_tube_regularity_probe?.minimum_sampled_abs_F_delta
          ) > 0 &&
          Number(
            row.sampled_root_tube_regularity_probe
              ?.minimum_sampled_positive_delta
          ) > 0 &&
          (row.sampled_root_tube_regularity_probe
            ?.minimum_sampled_root_tube_separation === null ||
            Number(
              row.sampled_root_tube_regularity_probe
                ?.minimum_sampled_root_tube_separation
            ) > 0) &&
          row.finite_interval_root_tube_certificate_target?.status ===
            "finite-interval-root-tube-certificate-target-emitted" &&
          row.finite_interval_root_tube_certificate_target
            ?.certifies_interval_root_tube_isolation === false &&
          row.finite_interval_root_tube_certificate_target
            ?.certifies_interval_root_sheet_continuation === false &&
          row.finite_interval_root_tube_certificate_target
            ?.certifies_interval_F_delta_lower_bound === false &&
          row.finite_interval_root_tube_certificate_target
            ?.retained_tube_count === EXPECTED_SOURCE_ROOT_COUNT &&
          row.finite_interval_root_tube_certificate_target
            ?.complement_slab_count === 10 &&
          Number(
            row.finite_interval_root_tube_certificate_target
              ?.minimum_tube_padding_radius
          ) > 0 &&
          Number(
            row.finite_interval_root_tube_certificate_target
              ?.minimum_complement_slab_width
          ) > 0 &&
          Number(
            row.sampled_pure_curvature_probe
              ?.sampled_bilinear_remainder_ratio_to_required_bound
          ) < 1 &&
          Number(row.effective_peak_overshoot_ceiling_after_refined_replay) >
            0 &&
          Number(row.refined_max_derivative) < 0 &&
          Number(row.min_abs_F_delta) > 0
      ),
    "all peak-budget subcells must preserve roots, stay negative, and retain a positive peak budget",
    errors
  );
  assertField(
    artifact?.backend_input_formula_sheet?.source_root_equation?.includes(
      "delta^2/nu^2-2+sin(phi)+kappa*sin(delta)=0"
    ) &&
      artifact?.backend_input_formula_sheet?.implicit_root_derivative ===
        "delta_prime=-2*cos(phi)/F_delta" &&
      artifact?.backend_input_formula_sheet?.bilinear_vertex_envelope?.includes(
        "sup_Q g <= vertex_max_derivative"
      ) &&
      artifact?.backend_input_formula_sheet?.cross_binary_combination?.includes(
        "s_{+,+}(theta)-s_{+,+}(theta+Q)+s_{-,+}(theta)-s_{-,+}(theta+Q)"
      ) &&
      artifact?.backend_input_formula_sheet?.root_tube_interval_certificate?.includes(
        "exactly one C^1 implicit root sheet"
      ),
    "backend formula sheet must expose the source-atlas derivative formulas",
    errors
  );
  assertField(
    artifact?.peak_budget_summary?.peak_budget_row_id ===
      "I1.f1.bracket-local-derivative-peak-budget-reduction" &&
      artifact?.peak_budget_summary?.status ===
        "i1-f1-bracket-local-finite-root-tube-target-and-sampled-bilinear-curvature-feasibility-certified" &&
      artifact?.peak_budget_summary?.successor_row ===
        REDUCED_LOCAL_SUCCESSOR_ROW &&
      artifact?.peak_budget_summary?.certified_subcell_row_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      artifact?.peak_budget_summary
        ?.sampled_bilinear_curvature_feasibility_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      artifact?.peak_budget_summary
        ?.sampled_root_tube_regularity_feasibility_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      artifact?.peak_budget_summary
        ?.finite_interval_root_tube_certificate_target_subcell_count ===
        artifact?.peak_budget_summary?.subcell_row_count &&
      artifact?.peak_budget_summary?.total_retained_root_tube_target_count ===
        artifact?.peak_budget_summary?.subcell_row_count *
          EXPECTED_SOURCE_ROOT_COUNT &&
      artifact?.peak_budget_summary?.total_complement_slab_target_count ===
        artifact?.peak_budget_summary?.subcell_row_count * 10 &&
      Number(
        artifact?.peak_budget_summary
          ?.maximum_sampled_bilinear_curvature_remainder_ratio
      ) < 1 &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_effective_peak_overshoot_ceiling_after_refined_replay
      ) > 0 &&
      Number(artifact?.peak_budget_summary?.maximum_refined_derivative) < 0 &&
      Number(
        artifact?.peak_budget_summary?.minimum_balanced_pure_curvature_bound
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary?.minimum_sampled_root_tube_abs_F_delta
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary?.minimum_sampled_root_tube_positive_delta
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary?.minimum_sampled_root_tube_separation
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_finite_root_tube_target_padding_radius
      ) > 0 &&
      Number(
        artifact?.peak_budget_summary
          ?.minimum_finite_root_tube_target_complement_width
      ) > 0 &&
      artifact?.peak_budget_summary?.source_root_count_preserved === true,
    "peak budget summary must certify a positive finite subcell budget",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_I1_f1_bracket_local_derivative_peak_budget_reduction ===
      true &&
      artifact?.artifact_claim
        ?.converts_directed_rounding_derivative_variation_to_finite_subcell_peak_bounds ===
        true &&
      artifact?.artifact_claim?.certifies_refined_sampled_peak_audit === true &&
      artifact?.artifact_claim?.certifies_sampled_bilinear_curvature_feasibility ===
        true &&
      artifact?.artifact_claim
        ?.certifies_sampled_root_tube_regularity_feasibility === true &&
      artifact?.artifact_claim
        ?.certifies_finite_interval_root_tube_certificate_target === true &&
      artifact?.artifact_claim
        ?.certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure ===
        false &&
      artifact?.artifact_claim
        ?.certifies_interval_second_partial_curvature_enclosure === false &&
      artifact?.artifact_claim?.certifies_interval_root_tube_isolation ===
        false &&
      artifact?.artifact_claim?.certifies_interval_root_sheet_continuation ===
        false &&
      artifact?.artifact_claim?.certifies_interval_F_delta_lower_bound ===
        false &&
      artifact?.artifact_claim
        ?.certifies_I1_derivative_negative_full_cell_interval_enclosure ===
        false &&
      artifact?.artifact_claim?.certifies_I1_f1_full_interval_zero_isolation ===
        false &&
      artifact?.artifact_claim?.certifies_outward_rounded_interval_enclosure ===
        false &&
      artifact?.artifact_claim?.certifies_interval_derivative_enclosure === false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact must certify only the peak-budget reduction and leave interval/retention claims open",
    errors
  );
  assertField(
    artifact?.result?.theory_status ===
      "source-atlas-aware-i1-f1-bracket-local-finite-root-tube-target-and-sampled-bilinear-curvature-feasibility-certified" &&
      artifact?.result?.first_successor_row === REDUCED_LOCAL_SUCCESSOR_ROW &&
      artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false,
    "result must certify the I1.f1 peak-budget reduction and not retain the branch",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-swarm/octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-peak-budget-reduction.mjs [options]",
    "",
    "Options:",
    "  --subdivisions <n>                    Source-root search subdivisions (default: 5000)",
    "  --endpoint-speed-samples <n>          Predecessor endpoint speed samples (default: 9)",
    "  --zero-branch-speed-samples <n>       Predecessor zero-branch speed samples (default: 9)",
    "  --derivative-theta-samples <n>        Predecessor derivative theta samples (default: 48)",
    "  --theta-cells <n>                     Bracket theta mesh cell count (default: 16)",
    "  --speed-cells <n>                     Speed-envelope mesh cell count (default: 8)",
    "  --parent-stencil-samples <n>          Odd parent stencil samples per axis (default: 5)",
    "  --refinement-samples <n>              Refinement samples per subcell axis (default: 3)",
    "  --endpoint-padding <x>                Predecessor derivative endpoint padding (default: 1e-5)",
    "  --machine-padding <x>                 Machine envelope padding (default: 1e-9)",
    "  --bisection-tolerance <x>             Predecessor root bisection tolerance (default: 1e-12)",
    "  --out <path>                          Write artifact JSON to path instead of stdout",
    "  --validate <path>                     Validate an existing artifact JSON file",
    "  --schema                              Print the artifact schema identifier",
    "  --pretty                              Pretty-print JSON output",
    "  --help                                Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    endpointSpeedSampleCount: DEFAULT_ENDPOINT_SPEED_SAMPLE_COUNT,
    zeroBranchSpeedSampleCount: DEFAULT_ZERO_BRANCH_SPEED_SAMPLE_COUNT,
    derivativeThetaSampleCount: DEFAULT_DERIVATIVE_THETA_SAMPLE_COUNT,
    thetaCellCount: DEFAULT_THETA_CELL_COUNT,
    speedCellCount: DEFAULT_SPEED_CELL_COUNT,
    parentStencilSamplesPerAxis: DEFAULT_PARENT_STENCIL_SAMPLES_PER_AXIS,
    refinementSamplesPerSubcellAxis: DEFAULT_REFINEMENT_SAMPLES_PER_SUBCELL_AXIS,
    endpointPadding: DEFAULT_ENDPOINT_PADDING,
    machinePadding: DEFAULT_MACHINE_PADDING,
    bisectionTolerance: DEFAULT_BISECTION_TOLERANCE,
    outPath: null,
    validatePath: null,
    printSchema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--subdivisions") {
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
    } else if (arg === "--endpoint-padding") {
      args.endpointPadding = Number(argv[++index]);
    } else if (arg === "--machine-padding") {
      args.machinePadding = Number(argv[++index]);
    } else if (arg === "--bisection-tolerance") {
      args.bisectionTolerance = Number(argv[++index]);
    } else if (arg === "--out") {
      args.outPath = argv[++index];
    } else if (arg === "--validate") {
      args.validatePath = argv[++index];
    } else if (arg === "--schema") {
      args.printSchema = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
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
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_DERIVATIVE_PEAK_BUDGET_REDUCTION_SCHEMA
    );
    return;
  }
  if (args.validatePath) {
    const artifact = JSON.parse(fs.readFileSync(args.validatePath, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
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
    buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
      {
        rootSubdivisions: args.rootSubdivisions,
        endpointSpeedSampleCount: args.endpointSpeedSampleCount,
        zeroBranchSpeedSampleCount: args.zeroBranchSpeedSampleCount,
        derivativeThetaSampleCount: args.derivativeThetaSampleCount,
        thetaCellCount: args.thetaCellCount,
        speedCellCount: args.speedCellCount,
        parentStencilSamplesPerAxis: args.parentStencilSamplesPerAxis,
        refinementSamplesPerSubcellAxis: args.refinementSamplesPerSubcellAxis,
        endpointPadding: args.endpointPadding,
        machinePadding: args.machinePadding,
        bisectionTolerance: args.bisectionTolerance,
      }
    );
  const errors =
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
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

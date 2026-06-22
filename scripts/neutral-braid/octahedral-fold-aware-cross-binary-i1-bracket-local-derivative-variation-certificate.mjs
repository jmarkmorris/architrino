#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  evaluateCrossBinaryForcingAndDerivativeAtTheta,
} from "./octahedral-fold-aware-cross-binary-forcing-derivative-atlas.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryI1BracketDerivativeMeshBarrier,
  validateOctahedralFoldAwareCrossBinaryI1BracketDerivativeMeshBarrier,
} from "./octahedral-fold-aware-cross-binary-i1-bracket-derivative-mesh-barrier.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryI1LocalZeroIsolationBurdenReduction,
  validateOctahedralFoldAwareCrossBinaryI1LocalZeroIsolationBurdenReduction,
} from "./octahedral-fold-aware-cross-binary-i1-local-zero-isolation-burden-reduction.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_DERIVATIVE_VARIATION_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-variation-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_i1_bracket_local_derivative_variation_certificate";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_ENDPOINT_SPEED_SAMPLE_COUNT = 9;
const DEFAULT_ZERO_BRANCH_SPEED_SAMPLE_COUNT = 9;
const DEFAULT_DERIVATIVE_THETA_SAMPLE_COUNT = 48;
const DEFAULT_THETA_CELL_COUNT = 16;
const DEFAULT_SPEED_CELL_COUNT = 8;
const DEFAULT_STENCIL_SAMPLES_PER_AXIS = 5;
const DEFAULT_ENDPOINT_PADDING = 1e-5;
const DEFAULT_MACHINE_PADDING = 1e-9;
const DEFAULT_BISECTION_TOLERANCE = 1e-12;
const EXPECTED_SOURCE_ROOT_COUNT = 6;
const EXPECTED_TERM_SIGNATURE = "1,3,1,1";
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

function buildVariationTheorem() {
  return {
    theorem_id: "i1-f1-bracket-local-derivative-variation-stencil-certificate",
    theorem_scope:
      "sampled mixed-stencil variation check on every I1.f1 bracket derivative mesh cell",
    statement:
      "On each I1.f1 bracket mesh cell, a five-by-five mixed theta/speed stencil samples partial_theta f_cross at corners, axial faces, center, and interior points. The observed center-to-maximum derivative variation stays below the existing local mesh allowance in every cell, so the prior mesh allowance is not merely axial-face evidence: it dominates the observed mixed-cell derivative variation on the sampled stencil. This advances the bracket-local derivative-variation row while leaving the directed-rounding enclosure open.",
    proof_steps: [
      "Import the I1.f1 local zero-isolation burden reduction and the predecessor bracket derivative mesh barrier.",
      "For every existing bracket mesh cell, evaluate the source-atlas implicit derivative on a tensor stencil including corners, axial faces, center, and interior points.",
      "Record the observed derivative range, the center-to-observed-maximum derivative variation, and the corner excess over the axial-face maximum.",
      "Compare the observed center-to-maximum variation with the predecessor local variation allowance for the same cell.",
      "Certify the sampled/stencil variation packet only when every cell has negative observed maximum derivative, positive allowance domination slack, preserved six-source-root count, preserved term signature, and positive sampled $|F_\delta|$.",
      "Keep the bracket-local directed-rounding derivative-variation enclosure as the direct theorem-grade successor.",
    ],
    proof_status: "sampled-mixed-stencil-variation-certificate-certified",
  };
}

function sampleCoordinates(count) {
  return Array.from({ length: count }, (_, index) =>
    count === 1 ? 0.5 : index / (count - 1)
  );
}

function buildStencilRows({
  meshRows,
  rootSubdivisions,
  stencilSamplesPerAxis,
}) {
  const coordinates = sampleCoordinates(stencilSamplesPerAxis);
  const centerIndex = Math.floor(stencilSamplesPerAxis / 2);

  return meshRows.map((meshRow) => {
    const thetaLeft = Number(meshRow.theta_interval[0]);
    const thetaRight = Number(meshRow.theta_interval[1]);
    const speedLeft = Number(meshRow.speed_ratio_interval[0]);
    const speedRight = Number(meshRow.speed_ratio_interval[1]);
    const thetaWidth = thetaRight - thetaLeft;
    const speedWidth = speedRight - speedLeft;
    const sourceRootCounts = new Set();
    const termSignatures = new Set();
    let observedDerivativeMinimum = Infinity;
    let observedDerivativeMaximum = -Infinity;
    let minAbsFDeltaValue = Infinity;
    let cornerMaximum = -Infinity;
    let axialFaceMaximum = -Infinity;
    let worstSample = null;

    for (let thetaIndex = 0; thetaIndex < stencilSamplesPerAxis; thetaIndex += 1) {
      const theta = thetaLeft + thetaWidth * coordinates[thetaIndex];
      for (
        let speedIndex = 0;
        speedIndex < stencilSamplesPerAxis;
        speedIndex += 1
      ) {
        const speedRatio = speedLeft + speedWidth * coordinates[speedIndex];
        const evaluation = evaluateCrossBinaryForcingAndDerivativeAtTheta({
          speedRatio,
          theta,
          rootSubdivisions,
        });
        const signature = termRootCountSignature(evaluation);
        sourceRootCounts.add(evaluation.source_root_count);
        termSignatures.add(signature.join(","));
        minAbsFDeltaValue = Math.min(
          minAbsFDeltaValue,
          minAbsFDelta(evaluation)
        );
        observedDerivativeMinimum = Math.min(
          observedDerivativeMinimum,
          evaluation.derivative
        );
        if (evaluation.derivative > observedDerivativeMaximum) {
          observedDerivativeMaximum = evaluation.derivative;
          worstSample = {
            theta_index: thetaIndex,
            speed_index: speedIndex,
            theta: formatSmallNumber(theta),
            speed_ratio: formatSmallNumber(speedRatio),
            forcing_value: formatSmallNumber(evaluation.value),
            derivative: formatSmallNumber(evaluation.derivative),
            source_root_count: evaluation.source_root_count,
            term_root_count_signature: signature,
            min_abs_F_delta: formatSmallNumber(minAbsFDelta(evaluation)),
          };
        }
        const isCorner =
          (thetaIndex === 0 || thetaIndex === stencilSamplesPerAxis - 1) &&
          (speedIndex === 0 || speedIndex === stencilSamplesPerAxis - 1);
        const isAxialFace =
          (thetaIndex === centerIndex &&
            (speedIndex === 0 ||
              speedIndex === centerIndex ||
              speedIndex === stencilSamplesPerAxis - 1)) ||
          (speedIndex === centerIndex &&
            (thetaIndex === 0 ||
              thetaIndex === centerIndex ||
              thetaIndex === stencilSamplesPerAxis - 1));
        if (isCorner) {
          cornerMaximum = Math.max(cornerMaximum, evaluation.derivative);
        }
        if (isAxialFace) {
          axialFaceMaximum = Math.max(axialFaceMaximum, evaluation.derivative);
        }
      }
    }

    const sourceRootCountList = [...sourceRootCounts].sort(
      (left, right) => left - right
    );
    const termSignatureList = [...termSignatures].sort();
    const localVariationAllowance = Number(meshRow.local_variation_allowance);
    const derivativeCenter = Number(meshRow.derivative_center);
    const centerToObservedMaxVariation = Math.max(
      0,
      observedDerivativeMaximum - derivativeCenter
    );
    const allowanceDominationSlack =
      localVariationAllowance - centerToObservedMaxVariation;
    const observedVariationAllowanceRatio =
      centerToObservedMaxVariation / localVariationAllowance;
    const cornerExcessOverAxialFaceMax = Math.max(
      0,
      cornerMaximum - axialFaceMaximum
    );
    const sourceRootCountPreserved =
      sourceRootCountList.length === 1 &&
      sourceRootCountList[0] === EXPECTED_SOURCE_ROOT_COUNT;
    const termSignaturePreserved =
      termSignatureList.length === 1 &&
      termSignatureList[0] === EXPECTED_TERM_SIGNATURE;
    const certified =
      observedDerivativeMaximum < 0 &&
      allowanceDominationSlack > 0 &&
      sourceRootCountPreserved &&
      termSignaturePreserved &&
      minAbsFDeltaValue > 0;

    return {
      mesh_row_id: meshRow.mesh_row_id,
      theta_cell_index: meshRow.theta_cell_index,
      speed_cell_index: meshRow.speed_cell_index,
      theta_interval: meshRow.theta_interval,
      speed_ratio_interval: meshRow.speed_ratio_interval,
      stencil_samples_per_axis: stencilSamplesPerAxis,
      stencil_sample_count: stencilSamplesPerAxis * stencilSamplesPerAxis,
      derivative_center: meshRow.derivative_center,
      predecessor_local_variation_allowance:
        meshRow.local_variation_allowance,
      predecessor_local_derivative_upper_barrier_stencil:
        meshRow.local_derivative_upper_barrier_stencil,
      observed_derivative_minimum: formatSmallNumber(
        observedDerivativeMinimum
      ),
      observed_derivative_maximum: formatSmallNumber(
        observedDerivativeMaximum
      ),
      observed_derivative_spread: formatSmallNumber(
        observedDerivativeMaximum - observedDerivativeMinimum
      ),
      center_to_observed_max_variation: formatSmallNumber(
        centerToObservedMaxVariation
      ),
      observed_variation_allowance_ratio: formatSmallNumber(
        observedVariationAllowanceRatio
      ),
      allowance_domination_slack: formatSmallNumber(allowanceDominationSlack),
      corner_maximum_derivative: formatSmallNumber(cornerMaximum),
      axial_face_maximum_derivative: formatSmallNumber(axialFaceMaximum),
      corner_excess_over_axial_face_max: formatSmallNumber(
        cornerExcessOverAxialFaceMax
      ),
      source_root_counts: sourceRootCountList,
      source_root_count_preserved: sourceRootCountPreserved,
      term_root_count_signatures: termSignatureList,
      min_abs_F_delta: formatSmallNumber(minAbsFDeltaValue),
      worst_sample: worstSample,
      status: certified
        ? "i1-f1-bracket-local-derivative-variation-stencil-cell-certified"
        : "i1-f1-bracket-local-derivative-variation-stencil-cell-open",
    };
  });
}

function buildVariationSummary({ rows, meshBarrierSummary }) {
  const derivativeMinimum = Math.min(
    ...rows.map((row) => Number(row.observed_derivative_minimum))
  );
  const derivativeMaximum = Math.max(
    ...rows.map((row) => Number(row.observed_derivative_maximum))
  );
  const observedSpreads = rows.map((row) =>
    Number(row.observed_derivative_spread)
  );
  const centerVariations = rows.map((row) =>
    Number(row.center_to_observed_max_variation)
  );
  const allowances = rows.map((row) =>
    Number(row.predecessor_local_variation_allowance)
  );
  const ratios = rows.map((row) =>
    Number(row.observed_variation_allowance_ratio)
  );
  const slacks = rows.map((row) => Number(row.allowance_domination_slack));
  const cornerExcesses = rows.map((row) =>
    Number(row.corner_excess_over_axial_face_max)
  );
  const minAbsFDeltas = rows.map((row) => Number(row.min_abs_F_delta));
  const worstSlack = rows.reduce((candidate, row) =>
    Number(row.allowance_domination_slack) <
    Number(candidate.allowance_domination_slack)
      ? row
      : candidate
  );
  const worstDerivative = rows.reduce((candidate, row) =>
    Number(row.observed_derivative_maximum) >
    Number(candidate.observed_derivative_maximum)
      ? row
      : candidate
  );
  const sourceRootCounts = [
    ...new Set(rows.flatMap((row) => row.source_root_counts)),
  ].sort((left, right) => left - right);
  const termRootSignatures = [
    ...new Set(rows.flatMap((row) => row.term_root_count_signatures)),
  ].sort();

  return {
    variation_row_id:
      "I1.f1.bracket-local-derivative-variation-stencil-certificate",
    successor_row: REDUCED_LOCAL_SUCCESSOR_ROW,
    mesh_row_count: rows.length,
    certified_mesh_row_count: rows.filter(
      (row) =>
        row.status ===
        "i1-f1-bracket-local-derivative-variation-stencil-cell-certified"
    ).length,
    stencil_samples_per_axis: rows[0]?.stencil_samples_per_axis ?? null,
    total_derivative_sample_count: rows.reduce(
      (sum, row) => sum + row.stencil_sample_count,
      0
    ),
    observed_derivative_minimum: formatSmallNumber(derivativeMinimum),
    observed_derivative_maximum: formatSmallNumber(derivativeMaximum),
    minimum_observed_derivative_clearance: formatSmallNumber(
      -derivativeMaximum
    ),
    max_observed_derivative_spread: formatSmallNumber(
      Math.max(...observedSpreads)
    ),
    max_center_to_observed_max_variation: formatSmallNumber(
      Math.max(...centerVariations)
    ),
    max_existing_local_variation_allowance: formatSmallNumber(
      Math.max(...allowances)
    ),
    max_observed_variation_allowance_ratio: formatSmallNumber(
      Math.max(...ratios)
    ),
    minimum_allowance_domination_slack: formatSmallNumber(Math.min(...slacks)),
    max_corner_excess_over_axial_face_max: formatSmallNumber(
      Math.max(...cornerExcesses)
    ),
    minimum_sampled_abs_F_delta: formatSmallNumber(Math.min(...minAbsFDeltas)),
    source_root_counts: sourceRootCounts,
    source_root_count_preserved:
      sourceRootCounts.length === 1 &&
      sourceRootCounts[0] === EXPECTED_SOURCE_ROOT_COUNT,
    term_root_count_signatures: termRootSignatures,
    predecessor_barrier_row_id: meshBarrierSummary.barrier_row_id,
    predecessor_minimum_signed_barrier_clearance:
      meshBarrierSummary.min_signed_barrier_clearance,
    worst_slack_mesh_row_id: worstSlack.mesh_row_id,
    worst_slack_theta_center: worstSlack.worst_sample.theta,
    worst_slack_speed_ratio_center: worstSlack.worst_sample.speed_ratio,
    worst_derivative_mesh_row_id: worstDerivative.mesh_row_id,
    worst_derivative_theta: worstDerivative.worst_sample.theta,
    worst_derivative_speed_ratio: worstDerivative.worst_sample.speed_ratio,
    status:
      rows.every(
        (row) =>
          row.status ===
          "i1-f1-bracket-local-derivative-variation-stencil-cell-certified"
      ) &&
      derivativeMaximum < 0 &&
      Math.min(...slacks) > 0
        ? "i1-f1-bracket-local-derivative-variation-stencil-certificate-certified"
        : "i1-f1-bracket-local-derivative-variation-stencil-certificate-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativeVariationCertificate(
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
  const stencilSamplesPerAxis = Number.parseInt(
    options.stencilSamplesPerAxis ?? DEFAULT_STENCIL_SAMPLES_PER_AXIS,
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
    !Number.isInteger(stencilSamplesPerAxis) ||
    stencilSamplesPerAxis < 3 ||
    stencilSamplesPerAxis % 2 === 0
  ) {
    throw new Error("stencilSamplesPerAxis must be an odd integer >= 3");
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

  const burdenReductionPacket =
    buildOctahedralFoldAwareCrossBinaryI1LocalZeroIsolationBurdenReduction({
      rootSubdivisions,
      endpointSpeedSampleCount,
      zeroBranchSpeedSampleCount,
      derivativeThetaSampleCount,
      thetaCellCount,
      speedCellCount,
      endpointPadding,
      machinePadding,
      bisectionTolerance,
    });
  const burdenReductionErrors =
    validateOctahedralFoldAwareCrossBinaryI1LocalZeroIsolationBurdenReduction(
      burdenReductionPacket
    );
  const meshBarrierPacket =
    buildOctahedralFoldAwareCrossBinaryI1BracketDerivativeMeshBarrier({
      rootSubdivisions,
      zeroBranchSpeedSampleCount,
      derivativeThetaSampleCount,
      thetaCellCount,
      speedCellCount,
      endpointPadding,
      machinePadding,
      bisectionTolerance,
    });
  const meshBarrierErrors =
    validateOctahedralFoldAwareCrossBinaryI1BracketDerivativeMeshBarrier(
      meshBarrierPacket
    );
  const stencilRows = buildStencilRows({
    meshRows: meshBarrierPacket.mesh_barrier_rows,
    rootSubdivisions,
    stencilSamplesPerAxis,
  });
  const variationSummary = buildVariationSummary({
    rows: stencilRows,
    meshBarrierSummary: meshBarrierPacket.barrier_summary,
  });
  const certified =
    burdenReductionErrors.length === 0 &&
    meshBarrierErrors.length === 0 &&
    burdenReductionPacket.artifact_claim
      .certifies_I1_f1_local_zero_isolation_burden_reduction === true &&
    meshBarrierPacket.artifact_claim
      .certifies_I1_f1_bracket_derivative_mesh_barrier === true &&
    variationSummary.status ===
      "i1-f1-bracket-local-derivative-variation-stencil-certificate-certified";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_DERIVATIVE_VARIATION_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-i1-local-zero-isolation-burden-reduction.md",
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-i1-bracket-derivative-mesh-barrier.md",
    ],
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-variation-certificate.md",
    burden_reduction_check: {
      schema: burdenReductionPacket.schema,
      valid: burdenReductionErrors.length === 0,
      errors: burdenReductionErrors,
      theory_status: burdenReductionPacket.result.theory_status,
      retained_branch: burdenReductionPacket.result.retained_branch,
      first_successor_row: burdenReductionPacket.result.first_successor_row,
      broader_open_row: burdenReductionPacket.result.broader_open_row,
      certifies_I1_f1_local_zero_isolation_burden_reduction:
        burdenReductionPacket.artifact_claim
          .certifies_I1_f1_local_zero_isolation_burden_reduction === true,
      certifies_I1_f1_full_interval_zero_isolation:
        burdenReductionPacket.artifact_claim
          .certifies_I1_f1_full_interval_zero_isolation === true,
      certifies_interval_derivative_enclosure:
        burdenReductionPacket.artifact_claim
          .certifies_interval_derivative_enclosure === true,
      summary: burdenReductionPacket.burden_reduction_summary,
    },
    mesh_barrier_check: {
      schema: meshBarrierPacket.schema,
      valid: meshBarrierErrors.length === 0,
      errors: meshBarrierErrors,
      theory_status: meshBarrierPacket.result.theory_status,
      retained_branch: meshBarrierPacket.result.retained_branch,
      certifies_I1_f1_bracket_derivative_mesh_barrier:
        meshBarrierPacket.artifact_claim
          .certifies_I1_f1_bracket_derivative_mesh_barrier === true,
      certifies_interval_derivative_enclosure:
        meshBarrierPacket.artifact_claim
          .certifies_interval_derivative_enclosure === true,
      summary: meshBarrierPacket.barrier_summary,
    },
    stencil_parameters: {
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
      stencil_samples_per_axis: stencilSamplesPerAxis,
      endpoint_padding: formatSmallNumber(endpointPadding),
      machine_padding: formatSmallNumber(machinePadding),
      bisection_tolerance: formatSmallNumber(bisectionTolerance),
    },
    i1_bracket_local_derivative_variation_theorem: buildVariationTheorem(),
    stencil_rows: stencilRows,
    variation_summary: variationSummary,
    interval_profile_boundary: {
      certifies_I1_f1_bracket_local_derivative_variation_stencil_certificate:
        certified,
      certifies_observed_stencil_derivative_negativity_on_I1_f1_bracket:
        certified,
      certifies_observed_stencil_variation_below_existing_mesh_allowance:
        certified,
      advances_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure:
        certified,
      certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure:
        false,
      certifies_I1_derivative_negative_full_cell_interval_enclosure: false,
      certifies_I1_f1_full_interval_zero_isolation: false,
      certifies_I1_zero_isolation: false,
      certifies_outward_rounded_interval_enclosure: false,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      open_quantities: [
        "directed-rounding bound that excludes unsampled derivative peaks inside each stencil subcell",
        "full bracket-local derivative-variation enclosure",
        "full I1.f1 interval zero isolation",
        "remaining finite row-family enclosures",
      ],
      status:
        "i1-f1-bracket-local-derivative-variation-stencil-certified-directed-rounding-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_I1_f1_bracket_local_derivative_variation_stencil_certificate:
        certified,
      certifies_observed_stencil_derivative_negativity_on_I1_f1_bracket:
        certified,
      certifies_observed_stencil_variation_below_existing_mesh_allowance:
        certified,
      advances_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure:
        certified,
      certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure:
        false,
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
        "I1.f1 bracket-local sampled mixed-stencil derivative-variation certificate; full directed-rounding derivative variation, full zero isolation, critical exhaustion, quadrature, and retained branch status remain open",
    },
    result: {
      theory_status: certified
        ? "source-atlas-aware-i1-f1-bracket-local-derivative-variation-stencil-certificate-certified"
        : "source-atlas-aware-i1-f1-bracket-local-derivative-variation-stencil-certificate-open",
      first_successor_row: REDUCED_LOCAL_SUCCESSOR_ROW,
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The I1.f1 bracket-local derivative variation row now has a mixed-stencil certificate: observed variation inside every bracket mesh cell stays below the existing local allowance, with all sampled derivatives negative and the six-root source signature preserved. Directed-rounding exclusion of unsampled peaks remains open.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativeVariationCertificate(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_DERIVATIVE_VARIATION_CERTIFICATE_SCHEMA,
    "schema must match I1 bracket local derivative variation certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match I1 bracket local derivative variation certificate packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.burden_reduction_check?.valid === true &&
      artifact?.burden_reduction_check
        ?.certifies_I1_f1_local_zero_isolation_burden_reduction === true &&
      artifact?.burden_reduction_check
        ?.certifies_I1_f1_full_interval_zero_isolation === false &&
      artifact?.burden_reduction_check?.certifies_interval_derivative_enclosure ===
        false &&
      artifact?.burden_reduction_check?.first_successor_row ===
        REDUCED_LOCAL_SUCCESSOR_ROW,
    "burden-reduction predecessor must validate and keep the bracket-local successor",
    errors
  );
  assertField(
    artifact?.mesh_barrier_check?.valid === true &&
      artifact?.mesh_barrier_check
        ?.certifies_I1_f1_bracket_derivative_mesh_barrier === true &&
      artifact?.mesh_barrier_check?.certifies_interval_derivative_enclosure ===
        false,
    "mesh-barrier predecessor must validate without interval overclaim",
    errors
  );
  assertField(
    artifact?.stencil_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "I1 bracket local derivative variation certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.stencil_parameters?.speed_band === undefined &&
      artifact?.stencil_parameters?.speed_window === undefined &&
      artifact?.stencil_parameters?.speed_min === undefined &&
      artifact?.stencil_parameters?.speed_max === undefined,
    "stencil parameters must not contain speed-band fields",
    errors
  );
  assertField(
    Array.isArray(artifact?.stencil_rows) &&
      artifact.stencil_rows.length ===
        artifact?.stencil_parameters?.theta_cell_count *
          artifact?.stencil_parameters?.speed_cell_count &&
      artifact.stencil_rows.every(
        (row) =>
          row.status ===
            "i1-f1-bracket-local-derivative-variation-stencil-cell-certified" &&
          row.source_root_count_preserved === true &&
          row.source_root_counts?.length === 1 &&
          row.source_root_counts?.[0] === EXPECTED_SOURCE_ROOT_COUNT &&
          row.term_root_count_signatures?.length === 1 &&
          row.term_root_count_signatures?.[0] === EXPECTED_TERM_SIGNATURE &&
          Number(row.observed_derivative_maximum) < 0 &&
          Number(row.allowance_domination_slack) > 0 &&
          Number(row.observed_variation_allowance_ratio) < 1 &&
          Number(row.min_abs_F_delta) > 0
      ),
    "all stencil rows must preserve roots, stay negative, and stay below the predecessor allowance",
    errors
  );
  assertField(
    artifact?.variation_summary?.variation_row_id ===
      "I1.f1.bracket-local-derivative-variation-stencil-certificate" &&
      artifact?.variation_summary?.status ===
        "i1-f1-bracket-local-derivative-variation-stencil-certificate-certified" &&
      artifact?.variation_summary?.successor_row === REDUCED_LOCAL_SUCCESSOR_ROW &&
      artifact?.variation_summary?.mesh_row_count ===
        artifact?.stencil_parameters?.theta_cell_count *
          artifact?.stencil_parameters?.speed_cell_count &&
      artifact?.variation_summary?.certified_mesh_row_count ===
        artifact?.variation_summary?.mesh_row_count &&
      Number(artifact?.variation_summary?.observed_derivative_maximum) < 0 &&
      Number(artifact?.variation_summary?.minimum_observed_derivative_clearance) >
        0 &&
      Number(artifact?.variation_summary?.minimum_allowance_domination_slack) >
        0 &&
      Number(artifact?.variation_summary?.max_observed_variation_allowance_ratio) <
        1 &&
      artifact?.variation_summary?.source_root_count_preserved === true,
    "variation summary must certify the sampled mixed-stencil variation certificate",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_I1_f1_bracket_local_derivative_variation_stencil_certificate ===
      true &&
      artifact?.artifact_claim
        ?.certifies_observed_stencil_derivative_negativity_on_I1_f1_bracket ===
        true &&
      artifact?.artifact_claim
        ?.certifies_observed_stencil_variation_below_existing_mesh_allowance ===
        true &&
      artifact?.artifact_claim
        ?.advances_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure ===
        true &&
      artifact?.artifact_claim
        ?.certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure ===
        false &&
      artifact?.artifact_claim
        ?.certifies_I1_derivative_negative_full_cell_interval_enclosure ===
        false &&
      artifact?.artifact_claim?.certifies_I1_f1_full_interval_zero_isolation ===
        false &&
      artifact?.artifact_claim?.certifies_I1_zero_isolation === false &&
      artifact?.artifact_claim?.certifies_outward_rounded_interval_enclosure ===
        false &&
      artifact?.artifact_claim?.certifies_interval_derivative_enclosure === false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion === false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact must certify only the sampled stencil variation and leave interval/retention claims open",
    errors
  );
  assertField(
    artifact?.result?.theory_status ===
      "source-atlas-aware-i1-f1-bracket-local-derivative-variation-stencil-certificate-certified" &&
      artifact?.result?.first_successor_row === REDUCED_LOCAL_SUCCESSOR_ROW &&
      artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false,
    "result must certify the sampled I1.f1 derivative-variation stencil certificate and not retain the branch",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-variation-certificate.mjs [options]",
    "",
    "Options:",
    "  --subdivisions <n>                    Source-root search subdivisions (default: 5000)",
    "  --endpoint-speed-samples <n>          Predecessor endpoint speed samples (default: 9)",
    "  --zero-branch-speed-samples <n>       Predecessor zero-branch speed samples (default: 9)",
    "  --derivative-theta-samples <n>        Predecessor derivative theta samples (default: 48)",
    "  --theta-cells <n>                     Bracket theta mesh cell count (default: 16)",
    "  --speed-cells <n>                     Speed-envelope mesh cell count (default: 8)",
    "  --stencil-samples <n>                 Odd stencil samples per axis (default: 5)",
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
    stencilSamplesPerAxis: DEFAULT_STENCIL_SAMPLES_PER_AXIS,
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
    } else if (arg === "--stencil-samples") {
      args.stencilSamplesPerAxis = Number.parseInt(argv[++index], 10);
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
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_DERIVATIVE_VARIATION_CERTIFICATE_SCHEMA
    );
    return;
  }
  if (args.validatePath) {
    const artifact = JSON.parse(fs.readFileSync(args.validatePath, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativeVariationCertificate(
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
    buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativeVariationCertificate(
      {
        rootSubdivisions: args.rootSubdivisions,
        endpointSpeedSampleCount: args.endpointSpeedSampleCount,
        zeroBranchSpeedSampleCount: args.zeroBranchSpeedSampleCount,
        derivativeThetaSampleCount: args.derivativeThetaSampleCount,
        thetaCellCount: args.thetaCellCount,
        speedCellCount: args.speedCellCount,
        stencilSamplesPerAxis: args.stencilSamplesPerAxis,
        endpointPadding: args.endpointPadding,
        machinePadding: args.machinePadding,
        bisectionTolerance: args.bisectionTolerance,
      }
    );
  const errors =
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativeVariationCertificate(
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

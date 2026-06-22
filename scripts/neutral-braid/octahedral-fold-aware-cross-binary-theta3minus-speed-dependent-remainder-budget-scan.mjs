#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldLimitIntervalCertificate,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-limit-interval-certificate.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form.mjs";
import {
  evaluateCrossBinaryForcingAndDerivativeAtTheta,
} from "./octahedral-fold-aware-cross-binary-forcing-derivative-atlas.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REMAINDER_BUDGET_SCAN_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-remainder-budget-scan/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_remainder_budget_scan";
const PROMOTION_STATUS = "priority-only";
const SPEED_RATIO_ENCLOSURE = [3.02156, 3.02157];
const SPEED_RATIO_CENTER = 3.021564740248;
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_SPEED_SAMPLES = [
  SPEED_RATIO_ENCLOSURE[0],
  3.0215625,
  SPEED_RATIO_CENTER,
  3.0215675,
  SPEED_RATIO_ENCLOSURE[1],
];
const DEFAULT_Y_SAMPLES = [
  0.115,
  0.11,
  0.105,
  0.1,
  0.09,
  0.08,
  0.07,
  0.06,
  0.05,
  0.04,
  0.03,
  0.02,
  0.015,
  0.01,
  0.007,
  0.005,
  0.003,
  0.002,
  0.001,
];

function formatSmallNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(12));
}

function parseNumberList(value, fallback) {
  if (Array.isArray(value)) {
    return value.map(Number);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((entry) => Number(entry.trim()))
      .filter((entry) => Number.isFinite(entry));
  }
  return [...fallback];
}

function validateSpeedSamples(speedSamples) {
  if (
    !Array.isArray(speedSamples) ||
    speedSamples.length < 3 ||
    speedSamples.some(
      (entry) =>
        !Number.isFinite(entry) ||
        entry < SPEED_RATIO_ENCLOSURE[0] ||
        entry > SPEED_RATIO_ENCLOSURE[1]
    )
  ) {
    throw new Error(
      "speedSamples must contain at least three finite values inside the certified speed-ratio enclosure"
    );
  }
  if (
    !speedSamples.some(
      (entry) => Math.abs(entry - SPEED_RATIO_ENCLOSURE[0]) <= 1e-14
    ) ||
    !speedSamples.some(
      (entry) => Math.abs(entry - SPEED_RATIO_ENCLOSURE[1]) <= 1e-14
    )
  ) {
    throw new Error("speedSamples must include both speed enclosure endpoints");
  }
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

function emptyWorstResidual(kind) {
  return {
    kind,
    abs_residual: -Infinity,
    residual: null,
    speed_ratio: null,
    y: null,
    L: null,
    value: null,
    certified_budget_slack: null,
    certified_budget_ratio: null,
  };
}

function updateWorstResidual({ current, candidate }) {
  return candidate.abs_residual > current.abs_residual ? candidate : current;
}

function formatWorstResidual(row) {
  return {
    kind: row.kind,
    speed_ratio: formatSmallNumber(row.speed_ratio),
    y: formatSmallNumber(row.y),
    residual: formatSmallNumber(row.residual),
    abs_residual: formatSmallNumber(row.abs_residual),
    L: formatSmallNumber(row.L),
    value: formatSmallNumber(row.value),
    certified_budget_slack: formatSmallNumber(row.certified_budget_slack),
    certified_budget_ratio: formatSmallNumber(row.certified_budget_ratio),
  };
}

function formatWorstScaledResidual(row) {
  return {
    kind: row.kind,
    numerator: row.numerator,
    scale: row.scale,
    speed_ratio: formatSmallNumber(row.speed_ratio),
    y: formatSmallNumber(row.y),
    residual: formatSmallNumber(row.residual),
    abs_scaled_residual: formatSmallNumber(row.abs_scaled_residual),
  };
}

function buildWorstScaledResidual({ rows, kind, numerator, scale, scaleFn }) {
  let worst = {
    kind,
    numerator,
    scale,
    speed_ratio: null,
    y: null,
    residual: null,
    abs_scaled_residual: -Infinity,
  };
  for (const row of rows) {
    const y = Number(row.y);
    const residual = Number(row[numerator]);
    const denominator = scaleFn(y);
    const absScaledResidual = Math.abs(residual) / denominator;
    if (absScaledResidual > worst.abs_scaled_residual) {
      worst = {
        kind,
        numerator,
        scale,
        speed_ratio: Number(row.speed_ratio),
        y,
        residual,
        abs_scaled_residual: absScaledResidual,
      };
    }
  }
  return formatWorstScaledResidual(worst);
}

function buildFoldPairRegularDecomposition({
  speedRatio,
  theta,
  y,
  deltaFold,
  L,
  G,
  D,
  rootSubdivisions,
}) {
  const evaluation = evaluateCrossBinaryForcingAndDerivativeAtTheta({
    speedRatio,
    theta,
    rootSubdivisions,
  });
  const foldTerm = evaluation.terms.find(
    (term) => term.term_label === "-s_{+,+}(u+Q)"
  );
  if (!foldTerm || foldTerm.root_rows.length < 3) {
    throw new Error("expected theta3minus fold term with three source roots");
  }
  const rankedRoots = [...foldTerm.root_rows]
    .map((rootRow, rootIndex) => ({
      root_index: rootIndex,
      delta: Number(rootRow.delta),
      contribution: Number(rootRow.contribution),
      contribution_derivative: Number(rootRow.contribution_derivative),
      distance_from_delta_fold: Math.abs(Number(rootRow.delta) - deltaFold),
    }))
    .sort(
      (left, right) =>
        left.distance_from_delta_fold - right.distance_from_delta_fold
    );
  const pairRoots = rankedRoots.slice(0, 2);
  const regularFoldTermRoots = rankedRoots.slice(2);
  const pairSourceValue = pairRoots.reduce(
    (sum, root) => sum + root.contribution,
    0
  );
  const pairSourceDerivative = pairRoots.reduce(
    (sum, root) => sum + root.contribution_derivative,
    0
  );
  const pairValue = foldTerm.coefficient * pairSourceValue;
  const pairDerivative = foldTerm.coefficient * pairSourceDerivative;
  const pairG = 2 * y * pairValue;
  const pairD = 4 * y ** 3 * pairDerivative;
  const pairRG = pairG - L;
  const pairRD = pairD - L;
  const regularG = G - pairG;
  const regularD = D - pairD;
  const reconstructedRG = pairRG + regularG;
  const reconstructedRD = pairRD + regularD;
  const totalRG = G - L;
  const totalRD = D - L;
  const nearestRegularRootDistance = Math.min(
    ...regularFoldTermRoots.map((root) => root.distance_from_delta_fold)
  );
  const farthestPairRootDistance = Math.max(
    ...pairRoots.map((root) => root.distance_from_delta_fold)
  );
  return {
    fold_pair_term_label: foldTerm.term_label,
    fold_pair_term_index: evaluation.terms.indexOf(foldTerm),
    fold_pair_root_indices: pairRoots.map((root) => root.root_index),
    fold_pair_deltas: pairRoots
      .map((root) => root.delta)
      .sort((left, right) => left - right)
      .map(formatSmallNumber),
    fold_pair_distance_from_delta_fold: pairRoots
      .map((root) => root.distance_from_delta_fold)
      .sort((left, right) => left - right)
      .map(formatSmallNumber),
    nearest_regular_root_distance_from_delta_fold: formatSmallNumber(
      nearestRegularRootDistance
    ),
    pair_to_regular_root_separation_margin: formatSmallNumber(
      nearestRegularRootDistance - farthestPairRootDistance
    ),
    fold_term_root_count: foldTerm.root_count,
    term_root_count_signature: evaluation.terms
      .map((term) => term.root_count)
      .join(","),
    pair_G: pairG,
    pair_D: pairD,
    pair_R_G: pairRG,
    pair_R_D: pairRD,
    regular_R_G: regularG,
    regular_R_D: regularD,
    reconstruction_R_G_abs_error: Math.abs(totalRG - reconstructedRG),
    reconstruction_R_D_abs_error: Math.abs(totalRD - reconstructedRD),
  };
}

function buildRemainderRows({
  normalFormArtifact,
  certifiedBudget,
  rootSubdivisions,
}) {
  let worstRG = emptyWorstResidual("R_G");
  let worstRD = emptyWorstResidual("R_D");
  let worstCombined = emptyWorstResidual("combined");
  let maxAbsPairRG = 0;
  let maxAbsPairRD = 0;
  let maxAbsRegularRG = 0;
  let maxAbsRegularRD = 0;
  let maxReconstructionRGAbsError = 0;
  let maxReconstructionRDAbsError = 0;
  let minimumPairToRegularRootSeparationMargin = Infinity;
  const speedRows = normalFormArtifact.speed_dependent_fold_normal_form_rows.map(
    (foldRow, speedIndex) => {
      const speedRatio = Number(foldRow.speed_ratio);
      const L = Number(foldRow.analytic_square_limit);
      const deltaFold = Number(foldRow.delta_fold);
      const movingRow =
        normalFormArtifact.moving_fold_collar_sample_rows[speedIndex];
      const sampleRows = movingRow.sample_rows.map((sample) => {
        const y = Number(sample.y);
        const theta = Number(sample.theta);
        const G = Number(sample.G);
        const D = Number(sample.D);
        const RG = G - L;
        const RD = D - L;
        const decomposition = buildFoldPairRegularDecomposition({
          speedRatio,
          theta,
          y,
          deltaFold,
          L,
          G,
          D,
          rootSubdivisions,
        });
        const absRG = Math.abs(RG);
        const absRD = Math.abs(RD);
        const absPairRG = Math.abs(decomposition.pair_R_G);
        const absPairRD = Math.abs(decomposition.pair_R_D);
        const absRegularRG = Math.abs(decomposition.regular_R_G);
        const absRegularRD = Math.abs(decomposition.regular_R_D);
        const RGSlack = certifiedBudget - absRG;
        const RDSlack = certifiedBudget - absRD;
        maxAbsPairRG = Math.max(maxAbsPairRG, absPairRG);
        maxAbsPairRD = Math.max(maxAbsPairRD, absPairRD);
        maxAbsRegularRG = Math.max(maxAbsRegularRG, absRegularRG);
        maxAbsRegularRD = Math.max(maxAbsRegularRD, absRegularRD);
        maxReconstructionRGAbsError = Math.max(
          maxReconstructionRGAbsError,
          decomposition.reconstruction_R_G_abs_error
        );
        maxReconstructionRDAbsError = Math.max(
          maxReconstructionRDAbsError,
          decomposition.reconstruction_R_D_abs_error
        );
        minimumPairToRegularRootSeparationMargin = Math.min(
          minimumPairToRegularRootSeparationMargin,
          Number(decomposition.pair_to_regular_root_separation_margin)
        );
        const RGRow = {
          kind: "R_G",
          speed_ratio: speedRatio,
          y,
          residual: RG,
          abs_residual: absRG,
          L,
          value: G,
          certified_budget_slack: RGSlack,
          certified_budget_ratio: absRG / certifiedBudget,
        };
        const RDRow = {
          kind: "R_D",
          speed_ratio: speedRatio,
          y,
          residual: RD,
          abs_residual: absRD,
          L,
          value: D,
          certified_budget_slack: RDSlack,
          certified_budget_ratio: absRD / certifiedBudget,
        };
        worstRG = updateWorstResidual({ current: worstRG, candidate: RGRow });
        worstRD = updateWorstResidual({ current: worstRD, candidate: RDRow });
        worstCombined = updateWorstResidual({
          current: worstCombined,
          candidate: RGRow,
        });
        worstCombined = updateWorstResidual({
          current: worstCombined,
          candidate: RDRow,
        });
        return {
          y: formatSmallNumber(y),
          speed_ratio: formatSmallNumber(speedRatio),
          G: formatSmallNumber(G),
          D: formatSmallNumber(D),
          L: formatSmallNumber(L),
          R_G: formatSmallNumber(RG),
          R_D: formatSmallNumber(RD),
          abs_R_G: formatSmallNumber(absRG),
          abs_R_D: formatSmallNumber(absRD),
          R_G_budget_slack: formatSmallNumber(RGSlack),
          R_D_budget_slack: formatSmallNumber(RDSlack),
          R_G_budget_ratio: formatSmallNumber(absRG / certifiedBudget),
          R_D_budget_ratio: formatSmallNumber(absRD / certifiedBudget),
          R_G_pair: formatSmallNumber(decomposition.pair_R_G),
          R_D_pair: formatSmallNumber(decomposition.pair_R_D),
          R_G_regular: formatSmallNumber(decomposition.regular_R_G),
          R_D_regular: formatSmallNumber(decomposition.regular_R_D),
          abs_R_G_pair: formatSmallNumber(absPairRG),
          abs_R_D_pair: formatSmallNumber(absPairRD),
          abs_R_G_regular: formatSmallNumber(absRegularRG),
          abs_R_D_regular: formatSmallNumber(absRegularRD),
          reconstruction_R_G_abs_error: formatSmallNumber(
            decomposition.reconstruction_R_G_abs_error
          ),
          reconstruction_R_D_abs_error: formatSmallNumber(
            decomposition.reconstruction_R_D_abs_error
          ),
          fold_pair_term_label: decomposition.fold_pair_term_label,
          fold_pair_term_index: decomposition.fold_pair_term_index,
          fold_pair_root_indices: decomposition.fold_pair_root_indices,
          fold_pair_deltas: decomposition.fold_pair_deltas,
          fold_pair_distance_from_delta_fold:
            decomposition.fold_pair_distance_from_delta_fold,
          nearest_regular_root_distance_from_delta_fold:
            decomposition.nearest_regular_root_distance_from_delta_fold,
          pair_to_regular_root_separation_margin:
            decomposition.pair_to_regular_root_separation_margin,
          term_root_count_signature: sample.term_root_count_signature,
          G_sign: sample.G_sign,
          D_sign: sample.D_sign,
        };
      });
      return {
        speed_ratio: formatSmallNumber(speedRatio),
        theta_fold: foldRow.theta_fold,
        L: formatSmallNumber(L),
        sample_count: sampleRows.length,
        max_abs_R_G: formatSmallNumber(
          Math.max(...sampleRows.map((row) => Number(row.abs_R_G)))
        ),
        max_abs_R_D: formatSmallNumber(
          Math.max(...sampleRows.map((row) => Number(row.abs_R_D)))
        ),
        min_R_G_budget_slack: formatSmallNumber(
          Math.min(...sampleRows.map((row) => Number(row.R_G_budget_slack)))
        ),
        min_R_D_budget_slack: formatSmallNumber(
          Math.min(...sampleRows.map((row) => Number(row.R_D_budget_slack)))
        ),
        all_sampled_remainders_inside_certified_L_budget: sampleRows.every(
          (row) =>
            Number(row.R_G_budget_slack) > 0 &&
            Number(row.R_D_budget_slack) > 0
        ),
        all_GD_signs_negative: sampleRows.every(
          (row) => row.G_sign === "-" && row.D_sign === "-"
        ),
        all_term_root_signatures_preserved: sampleRows.every(
          (row) => row.term_root_count_signature === "1,3,1,1"
        ),
        sample_rows: sampleRows,
      };
    }
  );
  return {
    speed_rows: speedRows,
    worst_R_G_row: formatWorstResidual(worstRG),
    worst_R_D_row: formatWorstResidual(worstRD),
    worst_combined_row: formatWorstResidual(worstCombined),
    decomposition_summary: {
      max_abs_R_G_pair: formatSmallNumber(maxAbsPairRG),
      max_abs_R_D_pair: formatSmallNumber(maxAbsPairRD),
      max_abs_R_G_regular: formatSmallNumber(maxAbsRegularRG),
      max_abs_R_D_regular: formatSmallNumber(maxAbsRegularRD),
      max_reconstruction_R_G_abs_error: formatSmallNumber(
        maxReconstructionRGAbsError
      ),
      max_reconstruction_R_D_abs_error: formatSmallNumber(
        maxReconstructionRDAbsError
      ),
      minimum_pair_to_regular_root_separation_margin: formatSmallNumber(
        minimumPairToRegularRootSeparationMargin
      ),
    },
  };
}

function summarizeRemainderBudget({ remainderRows, certifiedBudget }) {
  const flatRows = remainderRows.speed_rows.flatMap((row) => row.sample_rows);
  const outerCollarRadius = Math.max(...flatRows.map((row) => Number(row.y)));
  const maxAbsRG = Math.max(...flatRows.map((row) => Number(row.abs_R_G)));
  const maxAbsRD = Math.max(...flatRows.map((row) => Number(row.abs_R_D)));
  const maxAbsPairRG = Math.max(
    ...flatRows.map((row) => Number(row.abs_R_G_pair))
  );
  const maxAbsPairRD = Math.max(
    ...flatRows.map((row) => Number(row.abs_R_D_pair))
  );
  const maxAbsRegularRG = Math.max(
    ...flatRows.map((row) => Number(row.abs_R_G_regular))
  );
  const maxAbsRegularRD = Math.max(
    ...flatRows.map((row) => Number(row.abs_R_D_regular))
  );
  const maxAbsCombined = Math.max(maxAbsRG, maxAbsRD);
  const worstPairRGOverY2 = buildWorstScaledResidual({
    rows: flatRows,
    kind: "R_G_pair_over_y2",
    numerator: "R_G_pair",
    scale: "y^2",
    scaleFn: (y) => y ** 2,
  });
  const worstPairRDOverY2 = buildWorstScaledResidual({
    rows: flatRows,
    kind: "R_D_pair_over_y2",
    numerator: "R_D_pair",
    scale: "y^2",
    scaleFn: (y) => y ** 2,
  });
  const worstRegularRGOverY = buildWorstScaledResidual({
    rows: flatRows,
    kind: "R_G_regular_over_y",
    numerator: "R_G_regular",
    scale: "y",
    scaleFn: (y) => y,
  });
  const worstRegularRDOverY3 = buildWorstScaledResidual({
    rows: flatRows,
    kind: "R_D_regular_over_y3",
    numerator: "R_D_regular",
    scale: "y^3",
    scaleFn: (y) => y ** 3,
  });
  const minSlack = Math.min(
    ...flatRows.flatMap((row) => [
      Number(row.R_G_budget_slack),
      Number(row.R_D_budget_slack),
    ])
  );
  const allRowsInsideBudget = flatRows.every(
    (row) =>
      Number(row.R_G_budget_slack) > 0 &&
      Number(row.R_D_budget_slack) > 0
  );
  const allGDSignsNegative = remainderRows.speed_rows.every(
    (row) => row.all_GD_signs_negative
  );
  const allTermRootSignaturesPreserved = remainderRows.speed_rows.every(
    (row) => row.all_term_root_signatures_preserved
  );
  const reconstructionStable = flatRows.every(
    (row) =>
      Number(row.reconstruction_R_G_abs_error) < 1e-9 &&
      Number(row.reconstruction_R_D_abs_error) < 1e-9
  );
  return {
    speed_row_count: remainderRows.speed_rows.length,
    y_sample_count_per_speed: remainderRows.speed_rows[0]?.sample_count ?? 0,
    total_remainder_sample_count: flatRows.length,
    certified_budget_from_negative_L_upper: formatSmallNumber(certifiedBudget),
    max_abs_R_G: formatSmallNumber(maxAbsRG),
    max_abs_R_D: formatSmallNumber(maxAbsRD),
    max_abs_R_G_pair: formatSmallNumber(maxAbsPairRG),
    max_abs_R_D_pair: formatSmallNumber(maxAbsPairRD),
    max_abs_R_G_regular: formatSmallNumber(maxAbsRegularRG),
    max_abs_R_D_regular: formatSmallNumber(maxAbsRegularRD),
    max_abs_combined_remainder: formatSmallNumber(maxAbsCombined),
    max_combined_budget_ratio: formatSmallNumber(
      maxAbsCombined / certifiedBudget
    ),
    collar_scaling_summary: {
      outer_collar_radius: formatSmallNumber(outerCollarRadius),
      fold_pair_quadratic_rows: {
        max_abs_R_G_pair_over_y2:
          worstPairRGOverY2.abs_scaled_residual,
        max_abs_R_D_pair_over_y2:
          worstPairRDOverY2.abs_scaled_residual,
        implied_R_G_pair_bound_at_outer_radius: formatSmallNumber(
          Number(worstPairRGOverY2.abs_scaled_residual) * outerCollarRadius ** 2
        ),
        implied_R_D_pair_bound_at_outer_radius: formatSmallNumber(
          Number(worstPairRDOverY2.abs_scaled_residual) * outerCollarRadius ** 2
        ),
        worst_R_G_pair_over_y2_row: worstPairRGOverY2,
        worst_R_D_pair_over_y2_row: worstPairRDOverY2,
      },
      regular_root_scaling_rows: {
        max_abs_R_G_regular_over_y:
          worstRegularRGOverY.abs_scaled_residual,
        max_abs_R_D_regular_over_y3:
          worstRegularRDOverY3.abs_scaled_residual,
        implied_R_G_regular_bound_at_outer_radius: formatSmallNumber(
          Number(worstRegularRGOverY.abs_scaled_residual) * outerCollarRadius
        ),
        implied_R_D_regular_bound_at_outer_radius: formatSmallNumber(
          Number(worstRegularRDOverY3.abs_scaled_residual) *
            outerCollarRadius ** 3
        ),
        worst_R_G_regular_over_y_row: worstRegularRGOverY,
        worst_R_D_regular_over_y3_row: worstRegularRDOverY3,
      },
      interpretation:
        "Sampled scaling separates the fold-pair O(y^2) residual from the regular-root O(y) forcing residual and O(y^3) derivative numerator residual.",
    },
    min_certified_budget_slack: formatSmallNumber(minSlack),
    all_sampled_remainders_inside_certified_L_budget: allRowsInsideBudget,
    all_GD_signs_negative: allGDSignsNegative,
    all_term_root_signatures_preserved: allTermRootSignaturesPreserved,
    reconstruction_stable: reconstructionStable,
    max_reconstruction_R_G_abs_error:
      remainderRows.decomposition_summary.max_reconstruction_R_G_abs_error,
    max_reconstruction_R_D_abs_error:
      remainderRows.decomposition_summary.max_reconstruction_R_D_abs_error,
    minimum_pair_to_regular_root_separation_margin:
      remainderRows.decomposition_summary
        .minimum_pair_to_regular_root_separation_margin,
    status:
      allRowsInsideBudget &&
      allGDSignsNegative &&
      allTermRootSignaturesPreserved &&
      reconstructionStable
        ? "sampled-theta3minus-remainder-budget-feasibility-certified"
        : "sampled-theta3minus-remainder-budget-feasibility-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRemainderBudgetScan(
  options = {}
) {
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  const speedSamples = parseNumberList(
    options.speedSamples,
    DEFAULT_SPEED_SAMPLES
  );
  const ySamples = parseNumberList(options.ySamples, DEFAULT_Y_SAMPLES);
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  validateSpeedSamples(speedSamples);
  validateYSamples(ySamples);

  const foldLimitArtifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldLimitIntervalCertificate();
  const normalFormArtifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm({
      rootSubdivisions,
      speedSamples,
      ySamples,
    });
  const certifiedLUpper = Number(
    foldLimitArtifact.normal_form_theorem_progress.certified_L_upper_bound
  );
  const certifiedBudget = -certifiedLUpper;
  const remainderRows = buildRemainderRows({
    normalFormArtifact,
    certifiedBudget,
    rootSubdivisions,
  });
  const remainderSummary = summarizeRemainderBudget({
    remainderRows,
    certifiedBudget,
  });
  const sampledBudgetPassed =
    remainderSummary.status ===
    "sampled-theta3minus-remainder-budget-feasibility-certified";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REMAINDER_BUDGET_SCAN_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form.md",
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-limit-interval-certificate.md",
    ],
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-remainder-budget-scan.md",
    remainder_budget_parameters: {
      receiver_label: "1+",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: SPEED_RATIO_ENCLOSURE,
      speed_samples: speedSamples.map(formatSmallNumber),
      y_samples: ySamples.map(formatSmallNumber),
      root_subdivisions: rootSubdivisions,
      moving_fold_chart: "theta=theta_3minus(nu)-y^2",
      certified_L_interval:
        foldLimitArtifact.normal_form_theorem_progress.certified_L_interval,
      certified_L_upper_bound: formatSmallNumber(certifiedLUpper),
      certified_remainder_budget: formatSmallNumber(certifiedBudget),
      target_inequality: "|R_G|,|R_D|<-L_+",
    },
    sampled_remainder_budget_rows: remainderRows.speed_rows,
    sampled_remainder_budget_summary: remainderSummary,
    sampled_remainder_budget_bottlenecks: {
      worst_R_G_row: remainderRows.worst_R_G_row,
      worst_R_D_row: remainderRows.worst_R_D_row,
      worst_combined_row: remainderRows.worst_combined_row,
      interpretation:
        "On the sampled grid the visible budget pressure is the regular-root part of R_G at the outer collar edge; R_D remains much smaller than the certified L margin.",
      decomposition_summary: remainderRows.decomposition_summary,
    },
    closure_burndown: [
      {
        row: "theta3minus.fold-endpoint-bracket",
        status: "directed-rounded-interval-certified",
      },
      {
        row: "theta3minus.negative-fold-limit-L",
        status: "directed-rounded-interval-certified",
      },
      {
        row: "theta3minus.sampled-moving-collar-GD",
        status: "sampled-certified",
      },
      {
        row: "theta3minus.sampled-total-remainder-budget",
        status: sampledBudgetPassed ? "sampled-certified" : "open",
      },
      {
        row: "theta3minus.sampled-fold-pair-regular-decomposition",
        status: sampledBudgetPassed ? "sampled-certified" : "open",
      },
      {
        row: "theta3minus.sampled-fold-pair-quadratic-remainder-scaling",
        status: sampledBudgetPassed ? "sampled-certified" : "open",
      },
      {
        row: "theta3minus.sampled-regular-root-linear-cubic-remainder-scaling",
        status: sampledBudgetPassed ? "sampled-certified" : "open",
      },
      {
        row: "theta3minus.fold-pair-scaled-remainder",
        status: "directed-rounded-open",
      },
      {
        row: "theta3minus.regular-root-remainder",
        status: "directed-rounded-open",
      },
      {
        row: "I1.regular-critical-exhaustion",
        status: "blocked-by-theta3minus-remainder",
      },
      {
        row: "representative-cross-binary-retention",
        status: "open",
      },
    ],
    interval_profile_boundary: {
      certifies_sampled_theta3minus_remainder_budget_feasibility:
        sampledBudgetPassed,
      certifies_directed_rounded_speed_dependent_fold_normal_form_remainder:
        false,
      certifies_theta_3minus_left_fold_collar_interval_radius: false,
      certifies_I1_complement_sign_interval_enclosures: false,
      certifies_I1_regular_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      retained_branch: false,
      open_quantity_names: [
        "directed_rounded_fold_pair_scaled_remainder_R_G_R_D",
        "directed_rounded_regular_root_remainder_R_G_R_D",
        "theta_3minus_left_fold_collar_interval_radius",
        "I1_regular_critical_exhaustion",
        "interval_quadrature_enclosure",
        "retained_branch_status",
      ],
      status: sampledBudgetPassed
        ? "sampled-remainder-budget-feasible-directed-rounded-remainder-open"
        : "sampled-remainder-budget-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_sampled_theta3minus_remainder_budget_feasibility:
        sampledBudgetPassed,
      certifies_directed_rounded_speed_dependent_fold_normal_form_remainder:
        false,
      certifies_theta_3minus_left_fold_collar_interval_radius: false,
      certifies_I1_complement_sign_interval_enclosures: false,
      certifies_I1_regular_critical_exhaustion: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      retained_branch: false,
      claim_level:
        "Sampled R_G,R_D budget feasibility against the directed-rounded negative L margin. Directed-rounded remainder, full fold-collar interval radius, I1 closure, quadrature, and retained branch status remain open.",
    },
    result: {
      theory_status: sampledBudgetPassed
        ? "sampled-theta3minus-remainder-budget-feasibility-certified"
        : "theta3minus-remainder-budget-feasibility-open",
      first_successor_row:
        "theta_3minus.left-fold-collar-directed-rounded-normal-form-remainder-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The sampled R_G,R_D residuals use only a small fraction of the certified negative L margin; the remaining theorem-grade burden is to intervalize the fold-pair and regular-root remainders.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRemainderBudgetScan(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REMAINDER_BUDGET_SCAN_SCHEMA,
    "schema must match theta3minus remainder-budget scan schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus remainder-budget scan packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.remainder_budget_parameters?.speed_constraint ===
      NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "remainder-budget scan must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.remainder_budget_parameters?.speed_band === undefined &&
      artifact?.remainder_budget_parameters?.speed_window === undefined &&
      artifact?.remainder_budget_parameters?.speed_min === undefined &&
      artifact?.remainder_budget_parameters?.speed_max === undefined,
    "remainder-budget parameters must not contain speed-band fields",
    errors
  );
  assertField(
    Number(
      artifact?.remainder_budget_parameters?.certified_remainder_budget
    ) > 0.192 &&
      Number(
        artifact?.remainder_budget_parameters?.certified_L_upper_bound
      ) < -0.192,
    "remainder budget must come from the certified negative L upper bound",
    errors
  );
  assertField(
    artifact?.sampled_remainder_budget_summary?.status ===
      "sampled-theta3minus-remainder-budget-feasibility-certified" &&
      artifact?.sampled_remainder_budget_summary
        ?.all_sampled_remainders_inside_certified_L_budget === true &&
      artifact?.sampled_remainder_budget_summary?.all_GD_signs_negative ===
        true &&
      artifact?.sampled_remainder_budget_summary
        ?.all_term_root_signatures_preserved === true &&
      Number(
        artifact?.sampled_remainder_budget_summary
          ?.max_combined_budget_ratio
      ) < 0.06 &&
      Number(
        artifact?.sampled_remainder_budget_summary
          ?.min_certified_budget_slack
      ) > 0.18,
    "sampled residuals must stay well inside the certified L margin",
    errors
  );
  assertField(
    artifact?.sampled_remainder_budget_bottlenecks?.worst_combined_row
      ?.kind === "R_G" &&
      Number(
        artifact?.sampled_remainder_budget_bottlenecks?.worst_combined_row
          ?.y
      ) === 0.115,
    "sampled bottleneck must remain the outer-collar R_G row",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_sampled_theta3minus_remainder_budget_feasibility === true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_speed_dependent_fold_normal_form_remainder ===
        false &&
      artifact?.artifact_claim
        ?.certifies_theta_3minus_left_fold_collar_interval_radius === false &&
      artifact?.artifact_claim?.certifies_I1_regular_critical_exhaustion ===
        false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact claim must keep interval remainder, collar closure, I1 closure, and retention open",
    errors
  );
  assertField(
    artifact?.result?.theory_status ===
      "sampled-theta3minus-remainder-budget-feasibility-certified" &&
      artifact?.result?.first_successor_row ===
        "theta_3minus.left-fold-collar-directed-rounded-normal-form-remainder-required",
    "result must report sampled remainder-budget feasibility and the remainder successor",
    errors
  );
  return errors;
}

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out") {
      options.out = argv[++index];
    } else if (arg === "--validate") {
      options.validate = argv[++index];
    } else if (arg === "--schema") {
      options.schema = true;
    } else if (arg === "--root-subdivisions") {
      options.rootSubdivisions = argv[++index];
    } else if (arg === "--speed-samples") {
      options.speedSamples = argv[++index];
    } else if (arg === "--y-samples") {
      options.ySamples = argv[++index];
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return options;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-remainder-budget-scan.mjs [options]",
    "",
    "Options:",
    "  --out <path>                  Write artifact JSON",
    "  --validate <path>             Validate an artifact JSON",
    "  --schema                      Print artifact schema metadata",
    "  --root-subdivisions <count>   Root subdivisions for point evaluator",
    "  --speed-samples <csv>         Speed samples inside [3.02156,3.02157]",
    "  --y-samples <csv>             Strictly decreasing positive y samples",
  ].join("\n");
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
    console.log(
      JSON.stringify(
        {
          artifact_schema:
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REMAINDER_BUDGET_SCAN_SCHEMA,
          packet_id: PACKET_ID,
          promotion_status: PROMOTION_STATUS,
        },
        null,
        2
      )
    );
    return;
  }

  if (options.validate) {
    const artifact = JSON.parse(fs.readFileSync(options.validate, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRemainderBudgetScan(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRemainderBudgetScan(
      options
    );
  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRemainderBudgetScan(
      artifact
    );
  if (errors.length > 0) {
    console.error(JSON.stringify({ valid: false, errors }, null, 2));
    process.exitCode = 1;
    return;
  }

  if (options.out) {
    fs.mkdirSync(path.dirname(options.out), { recursive: true });
    fs.writeFileSync(options.out, `${JSON.stringify(artifact, null, 2)}\n`);
    return;
  }

  console.log(JSON.stringify(artifact, null, 2));
}

if (process.argv[1] === SCRIPT_PATH) {
  main();
}

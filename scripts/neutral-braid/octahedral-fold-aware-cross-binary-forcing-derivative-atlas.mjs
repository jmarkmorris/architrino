#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryCriticalValueAtlas,
  validateOctahedralFoldAwareCrossBinaryCriticalValueAtlas,
} from "./octahedral-fold-aware-cross-binary-critical-value-atlas.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas,
  validateOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas,
} from "./octahedral-fold-aware-cross-binary-fold-square-limit-atlas.mjs";
import { evaluateCrossBinaryQuarterForcingAtTheta } from "./octahedral-fold-aware-cross-binary-primitive-critical-atlas.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_DERIVATIVE_ATLAS_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-forcing-derivative-atlas/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_forcing_derivative_atlas";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_SCAN_SAMPLES_PER_CELL = 96;
const DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT = 96;
const DEFAULT_SAMPLES_PER_CELL = 12;
const DEFAULT_FINITE_DIFFERENCE_STEP = 1e-5;
const RECEIVER_LABEL = "1+";
const QUARTER_PERIOD = Math.PI / 2;
const SOURCE_PERIOD = Math.PI;
const ROOT_DOMAIN_MIN = 1e-9;
const ROOT_TOLERANCE = 1e-12;
const DUPLICATE_ROOT_TOLERANCE = 1e-8;
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

function normalizeThetaTilde(thetaTilde) {
  let normalized = Number(thetaTilde) % SOURCE_PERIOD;
  if (normalized < 0) {
    normalized += SOURCE_PERIOD;
  }
  if (Math.abs(normalized - SOURCE_PERIOD) <= 1e-12) {
    return 0;
  }
  return normalized;
}

function sourcePhi(thetaTilde, delta) {
  return 2 * thetaTilde - delta;
}

function sourceRootEquation({ speedRatio, kappa, thetaTilde, delta }) {
  const phi = sourcePhi(thetaTilde, delta);
  return (
    (delta * delta) / (speedRatio * speedRatio) -
    2 +
    Math.sin(phi) +
    kappa * Math.sin(delta)
  );
}

function sourceRootDeltaDerivative({ speedRatio, kappa, thetaTilde, delta }) {
  const phi = sourcePhi(thetaTilde, delta);
  return (
    (2 * delta) / (speedRatio * speedRatio) -
    Math.cos(phi) +
    kappa * Math.cos(delta)
  );
}

function bisectSourceRoot({
  speedRatio,
  kappa,
  thetaTilde,
  left,
  right,
}) {
  let a = left;
  let b = right;
  let fa = sourceRootEquation({ speedRatio, kappa, thetaTilde, delta: a });
  const fb = sourceRootEquation({ speedRatio, kappa, thetaTilde, delta: b });

  if (Math.abs(fa) <= ROOT_TOLERANCE) {
    return a;
  }
  if (Math.abs(fb) <= ROOT_TOLERANCE) {
    return b;
  }
  if (fa * fb > 0) {
    return null;
  }

  for (let step = 0; step < 90; step += 1) {
    const mid = 0.5 * (a + b);
    const fm = sourceRootEquation({
      speedRatio,
      kappa,
      thetaTilde,
      delta: mid,
    });
    if (Math.abs(fm) <= ROOT_TOLERANCE || Math.abs(b - a) <= ROOT_TOLERANCE) {
      return mid;
    }
    if (fa * fm <= 0) {
      b = mid;
    } else {
      a = mid;
      fa = fm;
    }
  }

  return 0.5 * (a + b);
}

function addUniqueRoot(roots, root) {
  if (!Number.isFinite(root) || root <= ROOT_DOMAIN_MIN) {
    return;
  }
  if (!roots.some((candidate) => Math.abs(candidate - root) <= DUPLICATE_ROOT_TOLERANCE)) {
    roots.push(root);
  }
}

function findSourceRoots({
  speedRatio,
  kappa,
  thetaTilde,
  rootSubdivisions,
}) {
  const roots = [];
  const domainMax = 2 * speedRatio + 1e-8 * Math.max(1, speedRatio);
  let previousDelta = ROOT_DOMAIN_MIN;
  let previousValue = sourceRootEquation({
    speedRatio,
    kappa,
    thetaTilde,
    delta: previousDelta,
  });

  for (let index = 1; index <= rootSubdivisions; index += 1) {
    const delta =
      ROOT_DOMAIN_MIN + ((domainMax - ROOT_DOMAIN_MIN) * index) / rootSubdivisions;
    const value = sourceRootEquation({
      speedRatio,
      kappa,
      thetaTilde,
      delta,
    });
    if (Math.abs(value) <= ROOT_TOLERANCE) {
      addUniqueRoot(roots, delta);
    } else if (
      Number.isFinite(previousValue) &&
      Number.isFinite(value) &&
      previousValue * value < 0
    ) {
      addUniqueRoot(
        roots,
        bisectSourceRoot({
          speedRatio,
          kappa,
          thetaTilde,
          left: previousDelta,
          right: delta,
        })
      );
    }
    previousDelta = delta;
    previousValue = value;
  }

  return roots.sort((left, right) => left - right);
}

function evaluateCanonicalSourceScalarAndDerivative({
  speedRatio,
  kappa,
  sigma,
  thetaTilde,
  rootSubdivisions = DEFAULT_ROOT_SUBDIVISIONS,
}) {
  const normalizedTheta = normalizeThetaTilde(thetaTilde);
  const roots = findSourceRoots({
    speedRatio,
    kappa,
    thetaTilde: normalizedTheta,
    rootSubdivisions,
  });
  let value = 0;
  let derivative = 0;
  const rootRows = [];

  for (const delta of roots) {
    const phi = sourcePhi(normalizedTheta, delta);
    const FDelta = sourceRootDeltaDerivative({
      speedRatio,
      kappa,
      thetaTilde: normalizedTheta,
      delta,
    });
    const absFDelta = Math.abs(FDelta);
    const signFDelta = Math.sign(FDelta);
    const B = -0.5 * (Math.cos(phi) + kappa * Math.cos(delta));
    const deltaPrime = (-2 * Math.cos(phi)) / FDelta;
    const BPrime =
      Math.sin(phi) + 0.5 * (kappa * Math.sin(delta) - Math.sin(phi)) * deltaPrime;
    const FDeltaDelta =
      2 / (speedRatio * speedRatio) - Math.sin(phi) - kappa * Math.sin(delta);
    const FDeltaPrime = 2 * Math.sin(phi) + FDeltaDelta * deltaPrime;
    const inverseFactor = 1 / (delta * delta * absFDelta);
    const inverseFactorPrime =
      -2 * deltaPrime / (delta * delta * delta * absFDelta) -
      (signFDelta * FDeltaPrime) / (delta * delta * absFDelta * absFDelta);
    const contribution = (2 * sigma * B * inverseFactor) / speedRatio;
    const contributionDerivative =
      (2 * sigma * (BPrime * inverseFactor + B * inverseFactorPrime)) /
      speedRatio;

    value += contribution;
    derivative += contributionDerivative;
    rootRows.push({
      delta: formatNumber(delta),
      phi: formatNumber(phi),
      F_delta: formatNumber(FDelta),
      B_kernel: formatNumber(B),
      delta_prime: formatNumber(deltaPrime),
      B_prime: formatNumber(BPrime),
      F_delta_prime: formatNumber(FDeltaPrime),
      contribution: formatNumber(contribution),
      contribution_derivative: formatNumber(contributionDerivative),
    });
  }

  return {
    kappa,
    sigma,
    theta_tilde: formatNumber(normalizedTheta),
    root_count: roots.length,
    value,
    derivative,
    root_rows: rootRows,
  };
}

export function evaluateCrossBinaryForcingAndDerivativeAtTheta({
  speedRatio,
  theta,
  rootSubdivisions = DEFAULT_ROOT_SUBDIVISIONS,
}) {
  const terms = [
    {
      term_label: "s_{+,+}(u)",
      coefficient: 1,
      kappa: 1,
      sigma: 1,
      theta_tilde: theta,
    },
    {
      term_label: "-s_{+,+}(u+Q)",
      coefficient: -1,
      kappa: 1,
      sigma: 1,
      theta_tilde: theta + QUARTER_PERIOD,
    },
    {
      term_label: "s_{-,+}(u)",
      coefficient: 1,
      kappa: -1,
      sigma: 1,
      theta_tilde: theta,
    },
    {
      term_label: "-s_{-,+}(u+Q)",
      coefficient: -1,
      kappa: -1,
      sigma: 1,
      theta_tilde: theta + QUARTER_PERIOD,
    },
  ].map((term) => {
    const source = evaluateCanonicalSourceScalarAndDerivative({
      speedRatio,
      kappa: term.kappa,
      sigma: term.sigma,
      thetaTilde: term.theta_tilde,
      rootSubdivisions,
    });
    return {
      ...term,
      theta_tilde_normalized: source.theta_tilde,
      root_count: source.root_count,
      value: source.value,
      derivative: source.derivative,
      weighted_value: term.coefficient * source.value,
      weighted_derivative: term.coefficient * source.derivative,
      root_rows: source.root_rows,
    };
  });
  const value = terms.reduce((sum, term) => sum + term.weighted_value, 0);
  const derivative = terms.reduce(
    (sum, term) => sum + term.weighted_derivative,
    0
  );

  return {
    theta,
    value,
    derivative,
    source_root_count: terms.reduce((sum, term) => sum + term.root_count, 0),
    terms,
  };
}

function safeFiniteDifferenceStep(theta, left, right, requestedStep) {
  const clearance = Math.min(theta - left, right - theta);
  return Math.min(requestedStep, Math.max(clearance / 4, requestedStep / 100));
}

function evaluateWitnessDerivative({
  speedRatio,
  theta,
  left,
  right,
  finiteDifferenceStep,
  rootSubdivisions,
}) {
  const h = safeFiniteDifferenceStep(theta, left, right, finiteDifferenceStep);
  const leftValue = evaluateCrossBinaryQuarterForcingAtTheta({
    speedRatio,
    theta: theta - h,
    rootSubdivisions,
  });
  const rightValue = evaluateCrossBinaryQuarterForcingAtTheta({
    speedRatio,
    theta: theta + h,
    rootSubdivisions,
  });
  return {
    step: h,
    derivative: (rightValue - leftValue) / (2 * h),
  };
}

function cellIntervalsFromCandidates(candidates) {
  const foldThetas = candidates
    .filter((candidate) => candidate.candidate_type === "fold-endpoint-limit")
    .map((candidate) => Number(candidate.theta))
    .sort((left, right) => left - right);
  return [
    {
      cell_id: "I1",
      theta_left: 0,
      theta_right: foldThetas[0],
      expected_source_root_count: 6,
      endpoint_padding_left: 1e-5,
      endpoint_padding_right: 1e-5,
    },
    {
      cell_id: "I2",
      theta_left: foldThetas[0],
      theta_right: foldThetas[1],
      expected_source_root_count: 4,
      endpoint_padding_left: 1e-5,
      endpoint_padding_right: 1e-5,
    },
    {
      cell_id: "I3",
      theta_left: foldThetas[1],
      theta_right: QUARTER_PERIOD,
      expected_source_root_count: 6,
      endpoint_padding_left: 1e-5,
      endpoint_padding_right: 1e-8,
    },
  ];
}

function sampleInteriorThetaRows({
  cells,
  speedRatio,
  samplesPerCell,
  finiteDifferenceStep,
  rootSubdivisions,
}) {
  const rows = [];
  for (const cell of cells) {
    const left = cell.theta_left + cell.endpoint_padding_left;
    const right = cell.theta_right - cell.endpoint_padding_right;
    for (let index = 0; index < samplesPerCell; index += 1) {
      const coordinate = (index + 0.5) / samplesPerCell;
      const theta = left + (right - left) * coordinate;
      const formula = evaluateCrossBinaryForcingAndDerivativeAtTheta({
        speedRatio,
        theta,
        rootSubdivisions,
      });
      const witness = evaluateCrossBinaryQuarterForcingAtTheta({
        speedRatio,
        theta,
        rootSubdivisions,
      });
      const witnessDerivative = evaluateWitnessDerivative({
        speedRatio,
        theta,
        left: cell.theta_left,
        right: cell.theta_right,
        finiteDifferenceStep,
        rootSubdivisions,
      });
      rows.push({
        cell_id: cell.cell_id,
        theta: formatNumber(theta),
        source_formula_root_count: formula.source_root_count,
        expected_source_root_count: cell.expected_source_root_count,
        formula_forcing: formatNumber(formula.value),
        witness_forcing: formatNumber(witness),
        formula_witness_abs: formatSmallNumber(Math.abs(formula.value - witness)),
        formula_derivative: formatNumber(formula.derivative),
        finite_difference_derivative: formatNumber(witnessDerivative.derivative),
        finite_difference_step: formatSmallNumber(witnessDerivative.step),
        derivative_residual_abs: formatSmallNumber(
          Math.abs(formula.derivative - witnessDerivative.derivative)
        ),
        forcing_sign: signLabel(formula.value),
        derivative_sign: signLabel(formula.derivative),
      });
    }
  }
  return rows;
}

function buildRegularCriticalDerivativeRows({
  candidates,
  cells,
  speedRatio,
  finiteDifferenceStep,
  rootSubdivisions,
}) {
  return candidates
    .filter((candidate) => candidate.candidate_type === "interior-forcing-zero")
    .map((candidate) => {
      const theta = Number(candidate.theta);
      const cell = cells.find(
        (entry) => theta > entry.theta_left && theta < entry.theta_right
      );
      const formula = evaluateCrossBinaryForcingAndDerivativeAtTheta({
        speedRatio,
        theta,
        rootSubdivisions,
      });
      const witness = evaluateCrossBinaryQuarterForcingAtTheta({
        speedRatio,
        theta,
        rootSubdivisions,
      });
      const witnessDerivative = evaluateWitnessDerivative({
        speedRatio,
        theta,
        left: cell.theta_left,
        right: cell.theta_right,
        finiteDifferenceStep,
        rootSubdivisions,
      });
      const derivative = Number(formula.derivative);
      return {
        candidate_id: candidate.candidate_id,
        theta: candidate.theta,
        cell_id: cell.cell_id,
        primitive_role: candidate.primitive_role,
        source_formula_root_count: formula.source_root_count,
        expected_source_root_count: cell.expected_source_root_count,
        formula_forcing: formatSmallNumber(formula.value),
        witness_forcing: formatSmallNumber(witness),
        forcing_residual_abs: formatSmallNumber(Math.abs(formula.value - witness)),
        formula_derivative: formatNumber(derivative),
        finite_difference_derivative: formatNumber(witnessDerivative.derivative),
        finite_difference_step: formatSmallNumber(witnessDerivative.step),
        derivative_residual_abs: formatSmallNumber(
          Math.abs(derivative - witnessDerivative.derivative)
        ),
        derivative_sign: signLabel(derivative),
        nondegenerate_regular_zero: Math.abs(derivative) > 0.01,
        primitive_extremum_class:
          derivative < -0.01
            ? "nondegenerate-local-maximum-of-A"
            : derivative > 0.01
              ? "nondegenerate-local-minimum-of-A"
              : "degeneracy-not-excluded",
      };
    });
}

function summarizeDerivativeRows({ sampleRows, criticalDerivativeRows }) {
  return {
    sampled_regular_interior_node_count: sampleRows.length,
    max_formula_witness_abs: formatSmallNumber(
      sampleRows.reduce(
        (maximum, row) => Math.max(maximum, Number(row.formula_witness_abs)),
        0
      )
    ),
    max_derivative_finite_difference_residual_abs: formatSmallNumber(
      sampleRows.reduce(
        (maximum, row) => Math.max(maximum, Number(row.derivative_residual_abs)),
        0
      )
    ),
    regular_critical_count: criticalDerivativeRows.length,
    min_regular_critical_derivative_abs: formatSmallNumber(
      criticalDerivativeRows.reduce(
        (minimum, row) => Math.min(minimum, Math.abs(Number(row.formula_derivative))),
        Infinity
      )
    ),
    regular_critical_derivative_signs: Object.fromEntries(
      criticalDerivativeRows.map((row) => [
        row.candidate_id,
        row.derivative_sign,
      ])
    ),
    regular_critical_nondegeneracy_status:
      criticalDerivativeRows.length === 2 &&
      criticalDerivativeRows.every((row) => row.nondegenerate_regular_zero)
        ? "sampled-regular-critical-nondegeneracy-derived"
        : "sampled-regular-critical-nondegeneracy-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryForcingDerivativeAtlas(
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
  const sourceQuadraturePanelsPerSegment = Number.parseInt(
    options.sourceQuadraturePanelsPerSegment ??
      DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT,
    10
  );
  const samplesPerCell = Number.parseInt(
    options.samplesPerCell ?? DEFAULT_SAMPLES_PER_CELL,
    10
  );
  const finiteDifferenceStep = Number(
    options.finiteDifferenceStep ?? DEFAULT_FINITE_DIFFERENCE_STEP
  );
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  if (!Number.isInteger(scanSamplesPerCell) || scanSamplesPerCell < 16) {
    throw new Error("scanSamplesPerCell must be an integer >= 16");
  }
  if (
    !Number.isInteger(sourceQuadraturePanelsPerSegment) ||
    sourceQuadraturePanelsPerSegment < 32
  ) {
    throw new Error("sourceQuadraturePanelsPerSegment must be an integer >= 32");
  }
  if (!Number.isInteger(samplesPerCell) || samplesPerCell < 4) {
    throw new Error("samplesPerCell must be an integer >= 4");
  }
  if (!Number.isFinite(finiteDifferenceStep) || finiteDifferenceStep <= 0) {
    throw new Error("finiteDifferenceStep must be a positive finite number");
  }

  const criticalValueAtlas =
    buildOctahedralFoldAwareCrossBinaryCriticalValueAtlas({
      rootSubdivisions,
      scanSamplesPerCell,
      quadraturePanelsPerSegment: sourceQuadraturePanelsPerSegment,
    });
  const criticalValueAtlasErrors =
    validateOctahedralFoldAwareCrossBinaryCriticalValueAtlas(criticalValueAtlas);
  const foldSquareAtlas =
    buildOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas({
      rootSubdivisions,
      scanSamplesPerCell,
      sourceQuadraturePanelsPerSegment,
    });
  const foldSquareAtlasErrors =
    validateOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas(foldSquareAtlas);
  const speedRatio = Number(
    criticalValueAtlas.quadrature_parameters.speed_ratio_estimate
  );
  const candidates = criticalValueAtlas.candidate_value_rows;
  const cells = cellIntervalsFromCandidates(candidates);
  const sampleRows = sampleInteriorThetaRows({
    cells,
    speedRatio,
    samplesPerCell,
    finiteDifferenceStep,
    rootSubdivisions,
  });
  const criticalDerivativeRows = buildRegularCriticalDerivativeRows({
    candidates,
    cells,
    speedRatio,
    finiteDifferenceStep,
    rootSubdivisions,
  });
  const derivativeSummary = summarizeDerivativeRows({
    sampleRows,
    criticalDerivativeRows,
  });
  const derivativeAtlasPassed =
    criticalValueAtlasErrors.length === 0 &&
    foldSquareAtlasErrors.length === 0 &&
    sampleRows.every(
      (row) =>
        row.source_formula_root_count === row.expected_source_root_count &&
        Number(row.formula_witness_abs) < 1e-7
    ) &&
    Number(derivativeSummary.max_derivative_finite_difference_residual_abs) < 1e-3 &&
    derivativeSummary.regular_critical_nondegeneracy_status ===
      "sampled-regular-critical-nondegeneracy-derived" &&
    criticalDerivativeRows.every((row) => row.derivative_sign === "-");

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_DERIVATIVE_ATLAS_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-fold-square-limit-atlas.md",
    priority_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-forcing-derivative-atlas.md",
    source_critical_value_atlas_check: {
      schema: criticalValueAtlas.schema,
      valid: criticalValueAtlasErrors.length === 0,
      errors: criticalValueAtlasErrors,
      theory_status: criticalValueAtlas.result.theory_status,
      retained_branch: criticalValueAtlas.result.retained_branch,
      sampled_critical_value_atlas_certified:
        criticalValueAtlas.artifact_claim.certifies_sampled_critical_value_atlas ===
        true,
      candidate_count: criticalValueAtlas.candidate_value_rows.length,
    },
    source_fold_square_limit_atlas_check: {
      schema: foldSquareAtlas.schema,
      valid: foldSquareAtlasErrors.length === 0,
      errors: foldSquareAtlasErrors,
      theory_status: foldSquareAtlas.result.theory_status,
      retained_branch: foldSquareAtlas.result.retained_branch,
      sampled_fold_square_limit_atlas_certified:
        foldSquareAtlas.artifact_claim.certifies_sampled_fold_square_limit_atlas ===
        true,
      certifies_interval_fold_limit_enclosure:
        foldSquareAtlas.artifact_claim.certifies_interval_fold_limit_enclosure ===
        true,
    },
    derivative_parameters: {
      receiver_label: RECEIVER_LABEL,
      theta_domain: "[0,H/4]",
      source_period: "pi",
      root_subdivisions: rootSubdivisions,
      scan_samples_per_cell: scanSamplesPerCell,
      samples_per_cell: samplesPerCell,
      finite_difference_step: finiteDifferenceStep,
      source_quadrature_panels_per_segment: sourceQuadraturePanelsPerSegment,
      speed_constraint:
        "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only",
      speed_ratio_estimate: formatNumber(speedRatio),
      speed_ratio_enclosure:
        criticalValueAtlas.quadrature_parameters.speed_ratio_enclosure,
    },
    source_derivative_equation: {
      root_equation:
        "F_{kappa,v}(theta,delta)=delta^2/v^2-2+sin(2theta-delta)+kappa sin(delta)",
      root_derivative:
        "delta'(theta)=-F_theta/F_delta=-2 cos(phi)/F_delta",
      source_kernel:
        "B_kappa(phi,delta)=-0.5*(cos(phi)+kappa cos(delta))",
      source_scalar:
        "s_{kappa,sigma}(theta;v)=sum_delta 2 sigma B_kappa/(v delta^2 |F_delta|)",
      source_derivative:
        "s'_{kappa,sigma}=sum_delta (2 sigma/v) d_theta(B_kappa delta^{-2}|F_delta|^{-1}) along the implicit root branch",
      cross_binary_derivative:
        "f'_cross(u)=s'_{+,+}(u)-s'_{+,+}(u+Q)+s'_{-,+}(u)-s'_{-,+}(u+Q)",
      status: "source-atlas-aware-implicit-derivative-formula-stated",
    },
    regular_cell_intervals: cells.map((cell) => ({
      cell_id: cell.cell_id,
      theta_left: formatNumber(cell.theta_left),
      theta_right: formatNumber(cell.theta_right),
      expected_source_root_count: cell.expected_source_root_count,
    })),
    formula_comparison_rows: sampleRows,
    regular_critical_derivative_rows: criticalDerivativeRows,
    derivative_summary: derivativeSummary,
    interval_profile_boundary: {
      certifies_sampled_regular_critical_nondegeneracy: derivativeAtlasPassed,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_critical_exhaustion: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_cross_binary_coarea_interval_profile: false,
      open_quantities: [
        "outward-rounded derivative bounds on each regular cell",
        "interval proof that f_cross has no extra zeros",
        "interval quadrature enclosures for C_cross, m_Q, and M_Q",
      ],
      next_interval_task:
        "turn the implicit derivative formula into outward-rounded derivative bounds and combine them with fold-square endpoint bounds to exhaust primitive-critical candidates",
      status: "forcing-derivative-interval-critical-exhaustion-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_sampled_critical_value_atlas:
        criticalValueAtlas.artifact_claim.certifies_sampled_critical_value_atlas ===
        true,
      certifies_sampled_fold_square_limit_atlas:
        foldSquareAtlas.artifact_claim.certifies_sampled_fold_square_limit_atlas ===
        true,
      certifies_source_atlas_aware_derivative_formula: derivativeAtlasPassed,
      certifies_formula_witness_agreement_on_regular_samples:
        derivativeAtlasPassed,
      certifies_sampled_regular_critical_nondegeneracy:
        derivativeAtlasPassed,
      certifies_interval_derivative_enclosure: false,
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
        "sampled source-atlas-aware derivative formula and regular critical nondegeneracy for the representative cross-binary quarter profile; interval derivative bounds, interval critical exhaustion, and retained branch status remain open",
    },
    result: {
      theory_status: derivativeAtlasPassed
        ? "sampled-source-atlas-aware-forcing-derivative-atlas-certified"
        : "source-atlas-aware-forcing-derivative-atlas-open",
      first_successor_row:
        "source-atlas-aware-forcing-derivative-interval-enclosure-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The quarter-profile forcing now has an executable implicit-derivative formula and sampled nondegenerate interior critical rows. This reduces interval critical exhaustion to bounding an explicit derivative expression; it does not certify interval bounds or retained branch status.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryForcingDerivativeAtlas(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_DERIVATIVE_ATLAS_SCHEMA,
    "schema must match cross-binary forcing derivative atlas schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match forcing derivative atlas packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.source_critical_value_atlas_check?.valid === true &&
      artifact?.source_critical_value_atlas_check
        ?.sampled_critical_value_atlas_certified === true,
    "source critical value atlas must validate",
    errors
  );
  assertField(
    artifact?.source_fold_square_limit_atlas_check?.valid === true &&
      artifact?.source_fold_square_limit_atlas_check
        ?.sampled_fold_square_limit_atlas_certified === true &&
      artifact?.source_fold_square_limit_atlas_check
        ?.certifies_interval_fold_limit_enclosure === false,
    "source fold square atlas must validate without interval fold-limit enclosure",
    errors
  );
  assertField(
    artifact?.derivative_parameters?.speed_constraint ===
      "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only",
    "forcing derivative atlas must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.source_derivative_equation?.root_derivative?.includes(
      "-2 cos(phi)/F_delta"
    ) &&
      artifact?.source_derivative_equation?.cross_binary_derivative?.includes(
        "f'_cross"
      ),
    "forcing derivative atlas must state the implicit derivative formula",
    errors
  );
  assertField(
    Array.isArray(artifact?.formula_comparison_rows) &&
      artifact.formula_comparison_rows.length >= 12,
    "forcing derivative atlas must emit regular-cell formula comparison rows",
    errors
  );
  assertField(
    artifact?.formula_comparison_rows?.every(
      (row) => row.source_formula_root_count === row.expected_source_root_count
    ) === true,
    "formula comparison rows must match expected source root counts",
    errors
  );
  assertField(
    Number(artifact?.derivative_summary?.max_formula_witness_abs) < 1e-7,
    "source formula must agree with witness forcing on sampled regular nodes",
    errors
  );
  assertField(
    Number(
      artifact?.derivative_summary
        ?.max_derivative_finite_difference_residual_abs
    ) < 1e-3,
    "implicit derivative must agree with finite differences on sampled regular nodes",
    errors
  );
  assertField(
    Array.isArray(artifact?.regular_critical_derivative_rows) &&
      artifact.regular_critical_derivative_rows.length === 2 &&
      artifact.regular_critical_derivative_rows.every(
        (row) =>
          row.derivative_sign === "-" &&
          row.nondegenerate_regular_zero === true &&
          row.primitive_extremum_class === "nondegenerate-local-maximum-of-A"
      ),
    "regular interior critical rows must be sampled nondegenerate local maxima of A",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_source_atlas_aware_derivative_formula ===
      true &&
      artifact?.artifact_claim
        ?.certifies_formula_witness_agreement_on_regular_samples === true &&
      artifact?.artifact_claim?.certifies_sampled_regular_critical_nondegeneracy ===
        true &&
      artifact?.artifact_claim?.certifies_interval_derivative_enclosure === false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion === false &&
      artifact?.artifact_claim?.certifies_C_m_Q_M_Q_interval_enclosure === false &&
      artifact?.artifact_claim?.certifies_representative_interval_profile === false &&
      artifact?.artifact_claim?.certifies_receiver_orbit_interval_clock_length_return ===
        false &&
      artifact?.artifact_claim?.certifies_bounded_speed_live_ledger === false,
    "artifact must certify only sampled derivative/nondegeneracy rows and leave interval/live-ledger rows open",
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
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-forcing-derivative-atlas.mjs [options]",
    "",
    "Options:",
    "  --samples-per-cell <n>            Regular-cell formula comparison samples per cell (default: 12)",
    "  --finite-difference-step <value>  Central difference step for derivative checks (default: 1e-5)",
    "  --scan-subdivisions <n>           Primitive critical scan samples per cell (default: 96)",
    "  --source-quadrature-panels <n>    Source critical-value quadrature panels per segment (default: 96)",
    "  --subdivisions <n>                Root search subdivisions (default: 5000)",
    "  --out <path>                      Write artifact JSON to path instead of stdout",
    "  --validate <path>                 Validate an existing artifact JSON file",
    "  --schema                          Print the artifact schema identifier",
    "  --pretty                          Pretty-print JSON output",
    "  --help                            Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    samplesPerCell: DEFAULT_SAMPLES_PER_CELL,
    finiteDifferenceStep: DEFAULT_FINITE_DIFFERENCE_STEP,
    scanSamplesPerCell: DEFAULT_SCAN_SAMPLES_PER_CELL,
    sourceQuadraturePanelsPerSegment: DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT,
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--samples-per-cell") {
      args.samplesPerCell = Number.parseInt(argv[++index], 10);
    } else if (arg === "--finite-difference-step") {
      args.finiteDifferenceStep = Number(argv[++index]);
    } else if (arg === "--scan-subdivisions") {
      args.scanSamplesPerCell = Number.parseInt(argv[++index], 10);
    } else if (arg === "--source-quadrature-panels") {
      args.sourceQuadraturePanelsPerSegment = Number.parseInt(argv[++index], 10);
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

function writeJson(payload, pretty, outPath) {
  const json = `${JSON.stringify(payload, null, pretty ? 2 : 0)}\n`;
  if (outPath) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, json);
  } else {
    process.stdout.write(json);
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }
  if (args.schema) {
    writeJson(
      {
        artifact_schema:
          OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_DERIVATIVE_ATLAS_SCHEMA,
      },
      args.pretty,
      args.out
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryForcingDerivativeAtlas(artifact);
    writeJson(
      {
        valid: errors.length === 0,
        errors,
        result: artifact.result ?? null,
      },
      args.pretty,
      args.out
    );
    return;
  }

  const artifact = buildOctahedralFoldAwareCrossBinaryForcingDerivativeAtlas(args);
  writeJson(artifact, args.pretty, args.out);
}

if (process.argv[1] === SCRIPT_PATH) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}

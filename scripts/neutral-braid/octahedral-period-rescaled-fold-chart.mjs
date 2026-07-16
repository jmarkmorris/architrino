#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_SITES,
  octahedralSiteById,
  octahedralSitePosition,
  octahedralSiteTangent,
  orderedOctahedralPairs,
} from "./octahedral-root-ledger.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_PERIOD_RESCALED_FOLD_CHART_SCHEMA =
  "neutral-braid-octahedral-period-rescaled-fold-chart/v1";

const PACKET_ID = "octahedral_period_rescaled_fold_chart";
const PROMOTION_STATUS = "priority-only";
const TAU = 2 * Math.PI;
const DEFAULT_SPEED_RATIO = 1.75;
const DEFAULT_PHASE_SAMPLES = 73;
const DEFAULT_DELTA_SUBDIVISIONS = 2400;
const ROOT_DOMAIN_MIN = 1e-9;
const ROOT_TOLERANCE = 1e-12;
const DUPLICATE_ROOT_TOLERANCE = 1e-7;

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  const rounded = Number(value.toFixed(12));
  return Math.abs(rounded) < 5e-13 ? 0 : rounded;
}

function normalizeHalfTurn(theta) {
  const reduced = theta % Math.PI;
  return reduced < 0 ? reduced + Math.PI : reduced;
}

function add(left, right) {
  return left.map((entry, index) => entry + right[index]);
}

function subtract(left, right) {
  return left.map((entry, index) => entry - right[index]);
}

function scale(vector, factor) {
  return vector.map((entry) => factor * entry);
}

function dot(left, right) {
  return left.reduce((sum, entry, index) => sum + entry * right[index], 0);
}

function norm(vector) {
  return Math.hypot(...vector);
}

function phaseTheta(index, phaseSamples) {
  return (TAU * index) / phaseSamples;
}

function phaseRootDomainMax(speedRatio) {
  return 2 * speedRatio + 1e-8 * Math.max(1, speedRatio);
}

function cyclicEpsilon(receiverBinary, sourceBinary) {
  if (
    (receiverBinary === 1 && sourceBinary === 2) ||
    (receiverBinary === 2 && sourceBinary === 3) ||
    (receiverBinary === 3 && sourceBinary === 1)
  ) {
    return 1;
  }
  return -1;
}

function crossBinaryClass(pair) {
  const epsilon = cyclicEpsilon(pair.receiver_binary, pair.source_binary);
  const signProduct =
    octahedralSiteById(pair.receiver).sign * octahedralSiteById(pair.source).sign;
  const kappa = signProduct * epsilon;
  return {
    epsilon_ab: epsilon,
    sign_product: signProduct,
    kappa,
    kappa_label: kappa > 0 ? "+1" : "-1",
    theta_tilde: signProduct > 0 ? "theta" : "theta+pi/2",
  };
}

function phaseResidual(kappa, thetaTilde, delta, speedRatio) {
  return (
    (delta * delta) / (speedRatio * speedRatio) -
    2 +
    Math.sin(2 * thetaTilde - delta) +
    kappa * Math.sin(delta)
  );
}

function phaseResidualDelta(kappa, thetaTilde, delta, speedRatio) {
  return (
    (2 * delta) / (speedRatio * speedRatio) -
    Math.cos(2 * thetaTilde - delta) +
    kappa * Math.cos(delta)
  );
}

function phaseResidualDeltaDelta(kappa, thetaTilde, delta, speedRatio) {
  return (
    2 / (speedRatio * speedRatio) -
    Math.sin(2 * thetaTilde - delta) -
    kappa * Math.sin(delta)
  );
}

function phaseJacobianFromResidualDelta(delta, speedRatio, residualDelta) {
  return ((speedRatio * speedRatio) / (2 * delta)) * residualDelta;
}

function phaseRootEquation(receiver, source, theta, delta, speedRatio) {
  const displacement = subtract(
    octahedralSitePosition(receiver, theta),
    octahedralSitePosition(source, theta - delta)
  );
  return speedRatio * norm(displacement) - delta;
}

function phaseRootJacobian(receiver, source, theta, delta, speedRatio) {
  const displacement = subtract(
    octahedralSitePosition(receiver, theta),
    octahedralSitePosition(source, theta - delta)
  );
  const distance = norm(displacement);
  const rhat = scale(displacement, 1 / distance);
  return 1 - speedRatio * dot(octahedralSiteTangent(source, theta - delta), rhat);
}

function bisectPhaseRoot(receiver, source, theta, left, right, speedRatio) {
  let a = left;
  let b = right;
  let fa = phaseRootEquation(receiver, source, theta, a, speedRatio);
  let fb = phaseRootEquation(receiver, source, theta, b, speedRatio);

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
    const fm = phaseRootEquation(receiver, source, theta, mid, speedRatio);
    if (Math.abs(fm) <= ROOT_TOLERANCE || Math.abs(b - a) <= ROOT_TOLERANCE) {
      return mid;
    }
    if (fa * fm <= 0) {
      b = mid;
      fb = fm;
    } else {
      a = mid;
      fa = fm;
    }
  }

  return 0.5 * (a + b);
}

function addUniqueRoot(roots, root, domainMax) {
  if (!Number.isFinite(root)) {
    return;
  }
  if (root <= ROOT_DOMAIN_MIN || root > domainMax + DUPLICATE_ROOT_TOLERANCE) {
    return;
  }
  if (!roots.some((candidate) => Math.abs(candidate - root) <= DUPLICATE_ROOT_TOLERANCE)) {
    roots.push(root);
  }
}

function findPhaseRoots(receiver, source, theta, speedRatio, deltaSubdivisions) {
  const roots = [];
  const domainMax = phaseRootDomainMax(speedRatio);
  let previousDelta = ROOT_DOMAIN_MIN;
  let previousValue = phaseRootEquation(receiver, source, theta, previousDelta, speedRatio);

  for (let step = 1; step <= deltaSubdivisions; step += 1) {
    const delta =
      ROOT_DOMAIN_MIN + ((domainMax - ROOT_DOMAIN_MIN) * step) / deltaSubdivisions;
    const value = phaseRootEquation(receiver, source, theta, delta, speedRatio);
    if (Math.abs(value) <= ROOT_TOLERANCE) {
      addUniqueRoot(roots, delta, domainMax);
    } else if (
      Number.isFinite(previousValue) &&
      Number.isFinite(value) &&
      previousValue * value < 0
    ) {
      addUniqueRoot(
        roots,
        bisectPhaseRoot(receiver, source, theta, previousDelta, delta, speedRatio),
        domainMax
      );
    }
    previousDelta = delta;
    previousValue = value;
  }

  return roots.sort((left, right) => left - right);
}

function solveLinearSystem(matrix, rhs) {
  const size = rhs.length;
  const augmented = matrix.map((row, index) => [...row, rhs[index]]);

  for (let pivotIndex = 0; pivotIndex < size; pivotIndex += 1) {
    let pivotRow = pivotIndex;
    for (let row = pivotIndex + 1; row < size; row += 1) {
      if (Math.abs(augmented[row][pivotIndex]) > Math.abs(augmented[pivotRow][pivotIndex])) {
        pivotRow = row;
      }
    }
    if (Math.abs(augmented[pivotRow][pivotIndex]) < 1e-14) {
      throw new Error("singular Newton system");
    }
    if (pivotRow !== pivotIndex) {
      const temp = augmented[pivotIndex];
      augmented[pivotIndex] = augmented[pivotRow];
      augmented[pivotRow] = temp;
    }
    const pivot = augmented[pivotIndex][pivotIndex];
    for (let column = pivotIndex; column <= size; column += 1) {
      augmented[pivotIndex][column] /= pivot;
    }
    for (let row = 0; row < size; row += 1) {
      if (row === pivotIndex) {
        continue;
      }
      const factor = augmented[row][pivotIndex];
      for (let column = pivotIndex; column <= size; column += 1) {
        augmented[row][column] -= factor * augmented[pivotIndex][column];
      }
    }
  }

  return augmented.map((row) => row[size]);
}

function newtonSolve(initial, equation, options = {}) {
  const tolerance = options.tolerance ?? 1e-13;
  const maxSteps = options.maxSteps ?? 40;
  let point = [...initial];

  for (let step = 0; step < maxSteps; step += 1) {
    const value = equation(point);
    const residualNorm = norm(value);
    if (residualNorm <= tolerance) {
      return point;
    }

    const jacobian = value.map(() => []);
    for (let column = 0; column < point.length; column += 1) {
      const delta = 1e-6 * Math.max(1, Math.abs(point[column]));
      const plus = [...point];
      const minus = [...point];
      plus[column] += delta;
      minus[column] -= delta;
      const plusValue = equation(plus);
      const minusValue = equation(minus);
      for (let row = 0; row < value.length; row += 1) {
        jacobian[row][column] = (plusValue[row] - minusValue[row]) / (2 * delta);
      }
    }

    const stepVector = solveLinearSystem(jacobian, value.map((entry) => -entry));
    point = add(point, stepVector);
    if (norm(stepVector) <= tolerance) {
      return point;
    }
  }

  return point;
}

function cuspEquations(kappa, [delta, phi, inverseSpeedSquared]) {
  return [
    delta * delta * inverseSpeedSquared - 2 + Math.sin(phi) + kappa * Math.sin(delta),
    2 * delta * inverseSpeedSquared - Math.cos(phi) + kappa * Math.cos(delta),
    2 * inverseSpeedSquared - Math.sin(phi) - kappa * Math.sin(delta),
  ];
}

function solveCuspOnset(kappa) {
  const seed =
    kappa > 0
      ? [1.95, -0.24, 0.344]
      : [4.9, -0.98, 0.077];
  const [delta, phi, inverseSpeedSquared] = newtonSolve(seed, (point) =>
    cuspEquations(kappa, point)
  );
  const speedRatio = 1 / Math.sqrt(inverseSpeedSquared);
  const thetaTilde = normalizeHalfTurn(0.5 * (phi + delta));

  return {
    kappa,
    kappa_label: kappa > 0 ? "+1" : "-1",
    speed_ratio: speedRatio,
    inverse_speed_squared: inverseSpeedSquared,
    phase_delay: delta,
    physical_delay_at_unit_trace: delta / speedRatio,
    phi,
    theta_tilde: thetaTilde,
    residual_norm: norm(cuspEquations(kappa, [delta, phi, inverseSpeedSquared])),
    status: kappa > 0 ? "first-cross-binary-fold-class" : "later-cross-binary-fold-class",
  };
}

function foldEquations(kappa, speedRatio, [delta, phi]) {
  const thetaTilde = 0.5 * (phi + delta);
  return [
    phaseResidual(kappa, thetaTilde, delta, speedRatio),
    phaseResidualDelta(kappa, thetaTilde, delta, speedRatio),
  ];
}

function solveFoldWindowForKappa(kappa, speedRatio, onset) {
  if (!(speedRatio > onset.speed_ratio)) {
    return [];
  }

  const seedScale = Math.sqrt(Math.max(speedRatio - onset.speed_ratio, 1e-4));
  const seeds = [
    [onset.phase_delay - 2.4 * seedScale, onset.phi + 2.8 * seedScale],
    [onset.phase_delay + 3.5 * seedScale, onset.phi - 3.5 * seedScale],
    [onset.phase_delay - 4.0 * seedScale, onset.phi + 4.2 * seedScale],
    [onset.phase_delay + 5.0 * seedScale, onset.phi - 5.0 * seedScale],
  ];
  const rows = [];

  for (const seed of seeds) {
    let solution;
    try {
      solution = newtonSolve(seed, (point) => foldEquations(kappa, speedRatio, point));
    } catch {
      continue;
    }
    const [delta, phi] = solution;
    const thetaTilde = normalizeHalfTurn(0.5 * (phi + delta));
    const residuals = foldEquations(kappa, speedRatio, solution);
    if (
      delta <= 0 ||
      delta > phaseRootDomainMax(speedRatio) ||
      norm(residuals) > 1e-8 ||
      rows.some((row) => Math.abs(row.phase_delay - delta) < 1e-8)
    ) {
      continue;
    }
    rows.push({
      kappa,
      kappa_label: kappa > 0 ? "+1" : "-1",
      theta_tilde: thetaTilde,
      phase_delay: delta,
      physical_delay_at_unit_trace: delta / speedRatio,
      phi: normalizeHalfTurn(phi),
      residual_norm: norm(residuals),
      residual_delta_delta: phaseResidualDeltaDelta(kappa, thetaTilde, delta, speedRatio),
      jacobian: phaseJacobianFromResidualDelta(
        delta,
        speedRatio,
        phaseResidualDelta(kappa, thetaTilde, delta, speedRatio)
      ),
      fold_type:
        phaseResidualDeltaDelta(kappa, thetaTilde, delta, speedRatio) < 0
          ? "three-root-window-entry"
          : "three-root-window-exit",
    });
  }

  return rows.sort((left, right) => left.theta_tilde - right.theta_tilde);
}

function formatCusp(row) {
  return {
    kappa: row.kappa,
    kappa_label: row.kappa_label,
    speed_ratio: formatNumber(row.speed_ratio),
    inverse_speed_squared: formatNumber(row.inverse_speed_squared),
    phase_delay: formatNumber(row.phase_delay),
    physical_delay_at_unit_trace: formatNumber(row.physical_delay_at_unit_trace),
    phi: formatNumber(row.phi),
    theta_tilde: formatNumber(row.theta_tilde),
    residual_norm: formatNumber(row.residual_norm),
    status: row.status,
  };
}

function formatFold(row) {
  return {
    kappa: row.kappa,
    kappa_label: row.kappa_label,
    theta_tilde: formatNumber(row.theta_tilde),
    phase_delay: formatNumber(row.phase_delay),
    physical_delay_at_unit_trace: formatNumber(row.physical_delay_at_unit_trace),
    phi: formatNumber(row.phi),
    residual_norm: formatNumber(row.residual_norm),
    residual_delta_delta: formatNumber(row.residual_delta_delta),
    jacobian: formatNumber(row.jacobian),
    fold_type: row.fold_type,
  };
}

function locateSampledFailureWitness(speedRatio, phaseSamples, deltaSubdivisions) {
  const pairs = orderedOctahedralPairs();
  for (let phaseIndex = 0; phaseIndex < phaseSamples; phaseIndex += 1) {
    const theta = phaseTheta(phaseIndex, phaseSamples);
    for (const pair of pairs) {
      const receiver = octahedralSiteById(pair.receiver);
      const source = octahedralSiteById(pair.source);
      const roots = findPhaseRoots(receiver, source, theta, speedRatio, deltaSubdivisions);
      if (roots.length !== 1) {
        const jacobians = roots.map((delta) =>
          phaseRootJacobian(receiver, source, theta, delta, speedRatio)
        );
        const reduction =
          pair.source_relation === "cross-binary" ? crossBinaryClass(pair) : null;
        return {
          phase_index: phaseIndex,
          phase_sample_count: phaseSamples,
          speed_ratio: speedRatio,
          theta,
          theta_half_turn: normalizeHalfTurn(theta),
          receiver: pair.receiver,
          source: pair.source,
          receiver_label: pair.receiver_label,
          source_label: pair.source_label,
          source_relation: pair.source_relation,
          cross_binary_reduction: reduction,
          root_count: roots.length,
          phase_delay_roots: roots,
          physical_delay_roots_at_unit_trace: roots.map((delta) => delta / speedRatio),
          jacobians,
          jacobian_signs: jacobians.map((jacobian) =>
            jacobian > 0 ? "positive" : jacobian < 0 ? "negative" : "zero"
          ),
        };
      }
    }
  }
  return null;
}

function formatFailureWitness(row, foldWindow) {
  if (!row) {
    return null;
  }
  const kappaWindow = foldWindow.find(
    (candidate) => candidate.kappa === row.cross_binary_reduction?.kappa
  );
  const insideFoldWindow =
    row.cross_binary_reduction &&
    kappaWindow?.folds?.length === 2 &&
    row.theta_half_turn >= kappaWindow.folds[0].theta_tilde &&
    row.theta_half_turn <= kappaWindow.folds[1].theta_tilde;

  return {
    phase_index: row.phase_index,
    phase_sample_count: row.phase_sample_count,
    speed_ratio: formatNumber(row.speed_ratio),
    theta: formatNumber(row.theta),
    theta_half_turn: formatNumber(row.theta_half_turn),
    receiver: row.receiver,
    source: row.source,
    receiver_label: row.receiver_label,
    source_label: row.source_label,
    source_relation: row.source_relation,
    cross_binary_reduction: row.cross_binary_reduction,
    root_count: row.root_count,
    phase_delay_roots: row.phase_delay_roots.map(formatNumber),
    physical_delay_roots_at_unit_trace: row.physical_delay_roots_at_unit_trace.map(formatNumber),
    jacobians: row.jacobians.map(formatNumber),
    jacobian_signs: row.jacobian_signs,
    inside_analytic_fold_window: insideFoldWindow,
    status: insideFoldWindow
      ? "sampled-failure-is-fold-window-witness"
      : "sampled-failure-not-explained-by-default-fold-window",
  };
}

function crossBinaryClassCounts() {
  const counts = { "+1": 0, "-1": 0 };
  for (const pair of orderedOctahedralPairs().filter((candidate) => candidate.source_relation === "cross-binary")) {
    counts[crossBinaryClass(pair).kappa_label] += 1;
  }
  return counts;
}

export function buildOctahedralPeriodRescaledFoldChart(options = {}) {
  const speedRatio = Number(options.speedRatio ?? DEFAULT_SPEED_RATIO);
  const phaseSamples = Number.parseInt(options.phaseSamples ?? DEFAULT_PHASE_SAMPLES, 10);
  const deltaSubdivisions = Number.parseInt(
    options.deltaSubdivisions ?? DEFAULT_DELTA_SUBDIVISIONS,
    10
  );

  if (!Number.isFinite(speedRatio) || speedRatio <= 0) {
    throw new Error("speedRatio must be positive");
  }
  if (!Number.isInteger(phaseSamples) || phaseSamples < 4) {
    throw new Error("phaseSamples must be an integer >= 4");
  }
  if (!Number.isInteger(deltaSubdivisions) || deltaSubdivisions < 10) {
    throw new Error("deltaSubdivisions must be an integer >= 10");
  }

  const cuspRows = [solveCuspOnset(1), solveCuspOnset(-1)];
  const foldWindow = cuspRows.map((onset) => ({
    kappa: onset.kappa,
    kappa_label: onset.kappa_label,
    speed_ratio: formatNumber(speedRatio),
    folds: solveFoldWindowForKappa(onset.kappa, speedRatio, onset).map(formatFold),
    status:
      speedRatio > onset.speed_ratio
        ? "fold-window-open-at-speed-ratio"
        : "below-fold-onset-at-speed-ratio",
  }));
  const witness = locateSampledFailureWitness(speedRatio, phaseSamples, deltaSubdivisions);
  const formattedWitness = formatFailureWitness(witness, foldWindow);
  const globalOnset = cuspRows.reduce((best, row) =>
    row.speed_ratio < best.speed_ratio ? row : best
  );

  return {
    schema: OCTAHEDRAL_PERIOD_RESCALED_FOLD_CHART_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packet: "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-period-rescaled-trace-scan.md",
    priority_packet: "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-period-rescaled-fold-chart.md",
    scan_parameters: {
      speed_constraint: "none; speed_ratio is a fold-chart probe, not an admissibility band",
      fold_window_speed_ratio: formatNumber(speedRatio),
      phase_sample_count: phaseSamples,
      delta_subdivision_count: deltaSubdivisions,
      phase_root_domain: "0<delta<=2*v for unit trace scale",
    },
    reduced_cross_binary_row: {
      equation:
        "F_{kappa,v}(theta_tilde,delta)=delta^2/v^2-2+sin(2*theta_tilde-delta)+kappa*sin(delta)=0",
      derivative_delta:
        "F_delta=2*delta/v^2-cos(2*theta_tilde-delta)+kappa*cos(delta)",
      derivative_delta_delta:
        "F_delta_delta=2/v^2-sin(2*theta_tilde-delta)-kappa*sin(delta)",
      jacobian_relation: "F_delta=(2*delta/v^2)*J",
      fold_condition: "F=0 and F_delta=0",
      cusp_condition: "F=F_delta=F_delta_delta=0",
      active_root_chart:
        "outside fold windows A={alpha_0}; inside each fold window A={alpha_1,alpha_2,alpha_3} ordered by phase delay",
    },
    cross_binary_inventory: {
      ordered_cross_binary_pair_count: orderedOctahedralPairs().filter(
        (pair) => pair.source_relation === "cross-binary"
      ).length,
      kappa_class_counts: crossBinaryClassCounts(),
    },
    continuum_fold_onsets: {
      rows: cuspRows.map(formatCusp),
      global_simple_root_speed_ceiling: formatNumber(globalOnset.speed_ratio),
      global_first_kappa_class: globalOnset.kappa_label,
      status: "analytic-cross-binary-fold-onset-detected",
    },
    fold_window_at_speed_ratio: {
      speed_ratio: formatNumber(speedRatio),
      rows: foldWindow,
      status:
        foldWindow.some((row) => row.folds.length > 0)
          ? "fold-window-detected-at-speed-ratio"
          : "no-fold-window-at-speed-ratio",
    },
    sampled_failure_witness: formattedWitness,
    fold_aware_multiroot_mean_row: {
      formula:
        "C_i(v)=int_0^{2*pi} sum_{j!=i} sum_{alpha in A_ij(theta,v)} sigma_ij*T_i(theta).Rhat_ijalpha/(delta_ijalpha^2*|J_ijalpha|) dtheta",
      endpoint_model:
        "near a generic fold, F≈F_theta*(theta-theta_f)+(1/2)*F_delta_delta*(delta-delta_f)^2 and |J|^{-1} has a square-root endpoint singularity",
      chart_requirement:
        "A retained row must use fold-aware quadrature or interval ownership for fold endpoints before interpreting any zero of the multi-root mean",
      status: "formula-derived-integral-not-certified",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      proves_analytic_cross_binary_fold_onset: true,
      proves_sampled_failure_is_fold_window_witness:
        formattedWitness?.status === "sampled-failure-is-fold-window-witness",
      certifies_simple_root_interval_positivity: false,
      certifies_fold_aware_multiroot_period_integral: false,
      certifies_speed_clock_length: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "analytic cross-binary fold onset and sampled fold-window witness; multiroot force/action ledger remains unretained",
    },
    result: {
      theory_status: "analytic-cross-binary-fold-onset-charted",
      first_successor_row: "fold-aware-multiroot-period-integral-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The period-rescaled one-root boundary is a saddle-node fold of the cross-binary causal-root equation. The first sampled v=1.75 failure is a grid witness of a continuum kappa=+1 fold onset near v=1.704939069887, not a speed-window effect and not a retained multiroot branch.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralPeriodRescaledFoldChart(artifact) {
  const errors = [];
  assertField(
    artifact?.schema === OCTAHEDRAL_PERIOD_RESCALED_FOLD_CHART_SCHEMA,
    "schema must match period-rescaled fold chart schema",
    errors
  );
  assertField(artifact?.packet_id === PACKET_ID, "packet id must match period-rescaled fold chart", errors);
  assertField(artifact?.promotion_status === PROMOTION_STATUS, "promotion status must remain priority-only", errors);
  assertField(
    artifact?.scan_parameters?.speed_constraint ===
      "none; speed_ratio is a fold-chart probe, not an admissibility band",
    "fold chart must not impose a speed window",
    errors
  );
  assertField(
    artifact?.continuum_fold_onsets?.global_simple_root_speed_ceiling > 1.7,
    "global simple-root speed ceiling must sharpen the sampled v=1.7 row",
    errors
  );
  assertField(
    artifact?.continuum_fold_onsets?.global_simple_root_speed_ceiling < 1.75,
    "global simple-root speed ceiling must precede the sampled v=1.75 failure",
    errors
  );
  assertField(
    artifact?.sampled_failure_witness?.status === "sampled-failure-is-fold-window-witness",
    "sampled failure must be explained by the analytic fold window",
    errors
  );
  assertField(
    artifact?.sampled_failure_witness?.root_count === 3,
    "sampled failure witness must have three roots",
    errors
  );
  assertField(
    artifact?.artifact_claim?.retained_branch === false && artifact?.result?.retained_branch === false,
    "fold chart must not claim retained branch status",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_fold_aware_multiroot_period_integral === false,
    "fold chart must not certify the fold-aware multiroot period integral",
    errors
  );
  assertField(
    artifact?.result?.theory_status === "analytic-cross-binary-fold-onset-charted",
    "result theory status must record analytic fold onset",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-period-rescaled-fold-chart.mjs [options]",
    "",
    "Options:",
    "  --speed-ratio <v>        Positive v=s/h probe value for fold window (default: 1.75)",
    "  --samples <n>            Periodic phase samples over [0, 2*pi) (default: 73)",
    "  --subdivisions <n>       Phase-delay root-search subdivisions (default: 2400)",
    "  --out <path>             Write artifact JSON to path instead of stdout",
    "  --validate <path>        Validate an existing artifact JSON file",
    "  --schema                 Print the artifact schema identifier",
    "  --pretty                 Pretty-print JSON output",
    "  --help                   Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    speedRatio: DEFAULT_SPEED_RATIO,
    phaseSamples: DEFAULT_PHASE_SAMPLES,
    deltaSubdivisions: DEFAULT_DELTA_SUBDIVISIONS,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--speed-ratio") {
      args.speedRatio = Number(argv[++index]);
    } else if (arg === "--samples") {
      args.phaseSamples = Number.parseInt(argv[++index], 10);
    } else if (arg === "--subdivisions") {
      args.deltaSubdivisions = Number.parseInt(argv[++index], 10);
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

function printJson(value, pretty) {
  return `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }
  if (args.schema) {
    process.stdout.write(
      printJson(
        {
          schema: "neutral-braid-octahedral-period-rescaled-fold-chart-schema/v1",
          artifact_schema: OCTAHEDRAL_PERIOD_RESCALED_FOLD_CHART_SCHEMA,
          promotion_status: PROMOTION_STATUS,
          packet_id: PACKET_ID,
        },
        args.pretty
      )
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors = validateOctahedralPeriodRescaledFoldChart(artifact);
    process.stdout.write(
      printJson(
        {
          valid: errors.length === 0,
          errors,
          schema: artifact.schema,
          result: artifact.result ?? null,
        },
        args.pretty
      )
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact = buildOctahedralPeriodRescaledFoldChart({
    speedRatio: args.speedRatio,
    phaseSamples: args.phaseSamples,
    deltaSubdivisions: args.deltaSubdivisions,
  });
  const output = printJson(artifact, args.pretty);
  if (args.out) {
    fs.mkdirSync(path.dirname(args.out), { recursive: true });
    fs.writeFileSync(args.out, output);
  } else {
    process.stdout.write(output);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}

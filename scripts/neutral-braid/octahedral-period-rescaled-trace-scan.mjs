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

export const OCTAHEDRAL_PERIOD_RESCALED_TRACE_SCAN_SCHEMA =
  "neutral-braid-octahedral-period-rescaled-trace-scan/v1";

const PACKET_ID = "octahedral_period_rescaled_trace_scan";
const PROMOTION_STATUS = "priority-only";
const TAU = 2 * Math.PI;
const DEFAULT_TRACE_SCALE = 1;
const DEFAULT_PHASE_SAMPLES = 73;
const DEFAULT_Y_SUBDIVISIONS = 480;
const DEFAULT_SPEED_RATIOS = [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 1.5, 1.6, 1.65, 1.7, 1.75, 2];
const ROOT_DOMAIN_MIN = 1e-9;
const ROOT_DOMAIN_MARGIN = 1e-8;
const ROOT_TOLERANCE = 1e-12;
const DUPLICATE_ROOT_TOLERANCE = 1e-7;

function add(left, right) {
  return left.map((entry, index) => entry + right[index]);
}

function subtract(left, right) {
  return left.map((entry, index) => entry - right[index]);
}

function dot(left, right) {
  return left.reduce((sum, entry, index) => sum + entry * right[index], 0);
}

function norm(vector) {
  return Math.hypot(...vector);
}

function scaleVector(vector, factor) {
  return vector.map((entry) => factor * entry);
}

function phaseTheta(index, phaseSamples) {
  return (TAU * index) / phaseSamples;
}

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  const rounded = Number(value.toFixed(12));
  return Math.abs(rounded) < 5e-13 ? 0 : rounded;
}

function maxAbs(values) {
  return values.reduce((best, value) => Math.max(best, Math.abs(value)), 0);
}

function vectorNorm(values) {
  return Math.hypot(...values);
}

function finiteMin(values) {
  return values.reduce((best, value) => (Number.isFinite(value) && value < best ? value : best), Infinity);
}

function finiteMax(values) {
  return values.reduce((best, value) => (Number.isFinite(value) && value > best ? value : best), -Infinity);
}

function periodRescaledPosition(site, theta, traceScale) {
  return scaleVector(octahedralSitePosition(site, theta), traceScale);
}

function periodRescaledUnitTangent(site, theta) {
  const tangent = octahedralSiteTangent(site, theta);
  const tangentNorm = norm(tangent);
  return tangentNorm > 0 ? scaleVector(tangent, 1 / tangentNorm) : [NaN, NaN, NaN];
}

function rootDomainMax(traceScale) {
  return 2 * traceScale + ROOT_DOMAIN_MARGIN * Math.max(1, traceScale);
}

function periodRescaledRootEquation(receiver, source, theta, y, traceScale, periodRatio) {
  const receiverPosition = periodRescaledPosition(receiver, theta, traceScale);
  const sourcePosition = periodRescaledPosition(source, theta - y / periodRatio, traceScale);
  return norm(subtract(receiverPosition, sourcePosition)) - y;
}

function bisectRoot(receiver, source, theta, left, right, traceScale, periodRatio) {
  let a = left;
  let b = right;
  let fa = periodRescaledRootEquation(receiver, source, theta, a, traceScale, periodRatio);
  let fb = periodRescaledRootEquation(receiver, source, theta, b, traceScale, periodRatio);

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
    const fm = periodRescaledRootEquation(receiver, source, theta, mid, traceScale, periodRatio);
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

function findPeriodRescaledRoots(receiver, source, theta, traceScale, periodRatio, ySubdivisions) {
  const roots = [];
  const domainMax = rootDomainMax(traceScale);
  let previousY = ROOT_DOMAIN_MIN;
  let previousValue = periodRescaledRootEquation(receiver, source, theta, previousY, traceScale, periodRatio);

  for (let step = 1; step <= ySubdivisions; step += 1) {
    const y = ROOT_DOMAIN_MIN + ((domainMax - ROOT_DOMAIN_MIN) * step) / ySubdivisions;
    const value = periodRescaledRootEquation(receiver, source, theta, y, traceScale, periodRatio);
    if (Math.abs(value) <= ROOT_TOLERANCE) {
      addUniqueRoot(roots, y, domainMax);
    } else if (Number.isFinite(previousValue) && Number.isFinite(value) && previousValue * value < 0) {
      addUniqueRoot(
        roots,
        bisectRoot(receiver, source, theta, previousY, y, traceScale, periodRatio),
        domainMax
      );
    }
    previousY = y;
    previousValue = value;
  }

  return roots.sort((left, right) => left - right);
}

function periodRescaledForceContribution(pair, theta, y, traceScale, periodRatio) {
  const speedRatio = traceScale / periodRatio;
  const receiver = octahedralSiteById(pair.receiver);
  const source = octahedralSiteById(pair.source);
  const sourcePhase = theta - y / periodRatio;
  const displacement = subtract(
    periodRescaledPosition(receiver, theta, traceScale),
    periodRescaledPosition(source, sourcePhase, traceScale)
  );
  const distance = norm(displacement);
  const rhat = scaleVector(displacement, 1 / distance);
  const sourcePhaseTangent = octahedralSiteTangent(source, sourcePhase);
  const jacobian = 1 - speedRatio * dot(sourcePhaseTangent, rhat);
  const coefficient = pair.force_sign / (y * y * Math.abs(jacobian));
  return { force: scaleVector(rhat, coefficient), jacobian };
}

function receiverPeriodRescaledForcing(receiver, theta, pairs, traceScale, periodRatio, ySubdivisions) {
  const unitTangent = periodRescaledUnitTangent(receiver, theta);
  let totalForce = [0, 0, 0];
  let partnerForce = [0, 0, 0];
  let crossForce = [0, 0, 0];
  const failures = [];
  const delays = [];
  const phaseDelays = [];
  const jacobianAbs = [];

  for (const pair of pairs.filter((candidate) => candidate.receiver === receiver.id)) {
    const source = octahedralSiteById(pair.source);
    const roots = findPeriodRescaledRoots(receiver, source, theta, traceScale, periodRatio, ySubdivisions);
    if (roots.length !== 1) {
      failures.push({
        receiver: pair.receiver,
        source: pair.source,
        source_relation: pair.source_relation,
        root_count: roots.length,
      });
      continue;
    }

    const contribution = periodRescaledForceContribution(pair, theta, roots[0], traceScale, periodRatio);
    delays.push(roots[0]);
    phaseDelays.push(roots[0] / periodRatio);
    jacobianAbs.push(Math.abs(contribution.jacobian));
    totalForce = add(totalForce, contribution.force);
    if (pair.source_relation === "antipodal-partner") {
      partnerForce = add(partnerForce, contribution.force);
    } else if (pair.source_relation === "cross-binary") {
      crossForce = add(crossForce, contribution.force);
    }
  }

  if (failures.length > 0) {
    return {
      failures,
      delays: [],
      phase_delays: [],
      jacobian_abs: [],
      total_value: NaN,
      partner_value: NaN,
      cross_value: NaN,
    };
  }

  return {
    failures,
    delays,
    phase_delays: phaseDelays,
    jacobian_abs: jacobianAbs,
    total_value: dot(unitTangent, totalForce),
    partner_value: dot(unitTangent, partnerForce),
    cross_value: dot(unitTangent, crossForce),
  };
}

function solvePartnerPhaseDelay(speedRatio) {
  let left = 0;
  let right = Math.PI;
  let fLeft = 2 * speedRatio * Math.cos(left / 2) - left;
  const fRight = 2 * speedRatio * Math.cos(right / 2) - right;

  if (!(fLeft > 0 && fRight < 0)) {
    return NaN;
  }

  for (let step = 0; step < 100; step += 1) {
    const mid = 0.5 * (left + right);
    const fMid = 2 * speedRatio * Math.cos(mid / 2) - mid;
    if (Math.abs(fMid) <= ROOT_TOLERANCE || Math.abs(right - left) <= ROOT_TOLERANCE) {
      return mid;
    }
    if (fLeft * fMid <= 0) {
      right = mid;
    } else {
      left = mid;
      fLeft = fMid;
    }
  }

  return 0.5 * (left + right);
}

function analyticPartnerPeriodIntegral(speedRatio, traceScale) {
  const periodRatio = traceScale / speedRatio;
  const phaseDelay = solvePartnerPhaseDelay(speedRatio);
  const sine = Math.sin(phaseDelay / 2);
  const jacobian = 1 + speedRatio * sine;
  const integral = (TAU * sine) / (periodRatio * phaseDelay * phaseDelay * jacobian);
  return {
    speed_ratio: speedRatio,
    trace_scale: traceScale,
    period_ratio: periodRatio,
    phase_delay_root: phaseDelay,
    physical_delay_root: periodRatio * phaseDelay,
    jacobian,
    partner_period_integral: integral,
    positive: integral > 0,
  };
}

export function evaluatePeriodRescaledTraceSpeed(speedRatio, options = {}) {
  const traceScale = Number(options.traceScale ?? DEFAULT_TRACE_SCALE);
  const phaseSamples = Number.parseInt(options.phaseSamples ?? DEFAULT_PHASE_SAMPLES, 10);
  const ySubdivisions = Number.parseInt(options.ySubdivisions ?? DEFAULT_Y_SUBDIVISIONS, 10);

  if (!Number.isFinite(speedRatio) || speedRatio <= 0) {
    throw new Error("speedRatio must be positive");
  }
  if (!Number.isFinite(traceScale) || traceScale <= 0) {
    throw new Error("traceScale must be positive");
  }
  if (!Number.isInteger(phaseSamples) || phaseSamples < 4) {
    throw new Error("phaseSamples must be an integer >= 4");
  }
  if (!Number.isInteger(ySubdivisions) || ySubdivisions < 10) {
    throw new Error("ySubdivisions must be an integer >= 10");
  }

  const periodRatio = traceScale / speedRatio;
  const physicalPeriod = TAU * periodRatio;
  const pairs = orderedOctahedralPairs();
  const totalIntegrals = OCTAHEDRAL_SITES.map(() => 0);
  const partnerIntegrals = OCTAHEDRAL_SITES.map(() => 0);
  const crossIntegrals = OCTAHEDRAL_SITES.map(() => 0);
  const sampleCounts = OCTAHEDRAL_SITES.map(() => 0);
  const rootFailuresByReceiver = OCTAHEDRAL_SITES.map(() => 0);
  const failures = [];
  const delays = [];
  const phaseDelays = [];
  const jacobianAbs = [];
  const stepU = physicalPeriod / phaseSamples;

  for (let phaseIndex = 0; phaseIndex < phaseSamples; phaseIndex += 1) {
    const theta = phaseTheta(phaseIndex, phaseSamples);
    for (const [receiverIndex, receiver] of OCTAHEDRAL_SITES.entries()) {
      const forcing = receiverPeriodRescaledForcing(
        receiver,
        theta,
        pairs,
        traceScale,
        periodRatio,
        ySubdivisions
      );
      if (forcing.failures.length > 0) {
        failures.push({
          phase_index: phaseIndex,
          receiver: receiver.id,
          receiver_label: receiver.label,
          theta,
          failures: forcing.failures,
        });
        rootFailuresByReceiver[receiverIndex] += forcing.failures.length;
        continue;
      }
      sampleCounts[receiverIndex] += 1;
      totalIntegrals[receiverIndex] += forcing.total_value * stepU;
      partnerIntegrals[receiverIndex] += forcing.partner_value * stepU;
      crossIntegrals[receiverIndex] += forcing.cross_value * stepU;
      delays.push(...forcing.delays);
      phaseDelays.push(...forcing.phase_delays);
      jacobianAbs.push(...forcing.jacobian_abs);
    }
  }

  const pairedRows = [
    0.5 * (totalIntegrals[0] + totalIntegrals[1]),
    0.5 * (totalIntegrals[2] + totalIntegrals[3]),
    0.5 * (totalIntegrals[4] + totalIntegrals[5]),
  ];
  const pairDeviation = Math.max(
    Math.abs(totalIntegrals[0] - totalIntegrals[1]),
    Math.abs(totalIntegrals[2] - totalIntegrals[3]),
    Math.abs(totalIntegrals[4] - totalIntegrals[5])
  );
  const analyticPartner = analyticPartnerPeriodIntegral(speedRatio, traceScale);

  return {
    speed_ratio: speedRatio,
    trace_scale: traceScale,
    period_ratio: periodRatio,
    physical_period: physicalPeriod,
    phase_sample_count: phaseSamples,
    y_subdivision_count: ySubdivisions,
    mean_path_speed: speedRatio,
    path_length: TAU * traceScale,
    receiver_vector: totalIntegrals,
    partner_vector: partnerIntegrals,
    cross_vector: crossIntegrals,
    paired_rows: pairedRows,
    zero_mean_residual_norm_inf: maxAbs(totalIntegrals),
    zero_mean_residual_norm_2: vectorNorm(totalIntegrals),
    min_receiver_integral: finiteMin(totalIntegrals),
    max_receiver_integral: finiteMax(totalIntegrals),
    pair_deviation_abs_max: pairDeviation,
    cross_abs_max: maxAbs(crossIntegrals),
    root_failure_count: failures.length,
    receiver_sample_counts: sampleCounts,
    receiver_root_failure_counts: rootFailuresByReceiver,
    first_root_failure: failures[0] ?? null,
    delay_min: delays.length > 0 ? Math.min(...delays) : null,
    delay_max: delays.length > 0 ? Math.max(...delays) : null,
    phase_delay_min: phaseDelays.length > 0 ? Math.min(...phaseDelays) : null,
    phase_delay_max: phaseDelays.length > 0 ? Math.max(...phaseDelays) : null,
    jacobian_abs_min: jacobianAbs.length > 0 ? Math.min(...jacobianAbs) : null,
    jacobian_abs_max: jacobianAbs.length > 0 ? Math.max(...jacobianAbs) : null,
    analytic_partner: analyticPartner,
    row_status:
      failures.length === 0 && finiteMin(totalIntegrals) > 0
        ? "sampled-period-rescaled-trace-positive-mean"
        : failures.length === 0
          ? "sampled-period-rescaled-trace-zero-mean-open"
          : "sampled-period-rescaled-trace-root-ledger-failed",
    retention: "not_retained",
  };
}

function formatAnalyticPartner(row) {
  return {
    speed_ratio: formatNumber(row.speed_ratio),
    trace_scale: formatNumber(row.trace_scale),
    period_ratio: formatNumber(row.period_ratio),
    phase_delay_root: formatNumber(row.phase_delay_root),
    physical_delay_root: formatNumber(row.physical_delay_root),
    jacobian: formatNumber(row.jacobian),
    partner_period_integral: formatNumber(row.partner_period_integral),
    positive: row.positive,
  };
}

function formatScanRow(row) {
  return {
    speed_ratio: formatNumber(row.speed_ratio),
    trace_scale: formatNumber(row.trace_scale),
    period_ratio: formatNumber(row.period_ratio),
    physical_period: formatNumber(row.physical_period),
    phase_sample_count: row.phase_sample_count,
    y_subdivision_count: row.y_subdivision_count,
    mean_path_speed: formatNumber(row.mean_path_speed),
    path_length: formatNumber(row.path_length),
    receiver_vector: row.receiver_vector.map(formatNumber),
    partner_vector: row.partner_vector.map(formatNumber),
    cross_vector: row.cross_vector.map(formatNumber),
    paired_rows: row.paired_rows.map(formatNumber),
    zero_mean_residual_norm_inf: formatNumber(row.zero_mean_residual_norm_inf),
    zero_mean_residual_norm_2: formatNumber(row.zero_mean_residual_norm_2),
    min_receiver_integral: formatNumber(row.min_receiver_integral),
    max_receiver_integral: formatNumber(row.max_receiver_integral),
    pair_deviation_abs_max: formatNumber(row.pair_deviation_abs_max),
    cross_abs_max: formatNumber(row.cross_abs_max),
    root_failure_count: row.root_failure_count,
    receiver_sample_counts: row.receiver_sample_counts,
    receiver_root_failure_counts: row.receiver_root_failure_counts,
    first_root_failure: row.first_root_failure,
    delay_min: formatNumber(row.delay_min),
    delay_max: formatNumber(row.delay_max),
    phase_delay_min: formatNumber(row.phase_delay_min),
    phase_delay_max: formatNumber(row.phase_delay_max),
    jacobian_abs_min: formatNumber(row.jacobian_abs_min),
    jacobian_abs_max: formatNumber(row.jacobian_abs_max),
    analytic_partner: formatAnalyticPartner(row.analytic_partner),
    row_status: row.row_status,
    retention: row.retention,
  };
}

function parseSpeedRatios(value) {
  return String(value)
    .split(",")
    .map((entry) => Number(entry.trim()))
    .filter(Number.isFinite);
}

export function buildOctahedralPeriodRescaledTraceScan(options = {}) {
  const traceScale = Number(options.traceScale ?? DEFAULT_TRACE_SCALE);
  const phaseSamples = Number.parseInt(options.phaseSamples ?? DEFAULT_PHASE_SAMPLES, 10);
  const ySubdivisions = Number.parseInt(options.ySubdivisions ?? DEFAULT_Y_SUBDIVISIONS, 10);
  const speedRatios = options.speedRatios ?? DEFAULT_SPEED_RATIOS;

  if (!Number.isFinite(traceScale) || traceScale <= 0) {
    throw new Error("traceScale must be positive");
  }
  if (!Number.isInteger(phaseSamples) || phaseSamples < 4) {
    throw new Error("phaseSamples must be an integer >= 4");
  }
  if (!Number.isInteger(ySubdivisions) || ySubdivisions < 10) {
    throw new Error("ySubdivisions must be an integer >= 10");
  }
  if (!Array.isArray(speedRatios) || speedRatios.length === 0) {
    throw new Error("speedRatios must be a nonempty array");
  }
  if (!speedRatios.every((speedRatio) => Number.isFinite(speedRatio) && speedRatio > 0)) {
    throw new Error("every speed ratio must be positive");
  }

  const rows = speedRatios.map((speedRatio) =>
    evaluatePeriodRescaledTraceSpeed(speedRatio, {
      traceScale,
      phaseSamples,
      ySubdivisions,
    })
  );
  const formattedRows = rows.map(formatScanRow);
  const simpleRootRows = rows.filter((row) => row.root_failure_count === 0);
  const failedRootRows = rows.filter((row) => row.root_failure_count > 0);
  const rootFailureCount = rows.reduce((sum, row) => sum + row.root_failure_count, 0);
  const minReceiverIntegral = finiteMin(simpleRootRows.map((row) => row.min_receiver_integral));
  const maxReceiverIntegral = finiteMax(simpleRootRows.map((row) => row.max_receiver_integral));
  const minAnalyticPartner = finiteMin(rows.map((row) => row.analytic_partner.partner_period_integral));
  const maxCrossAbs = finiteMax(simpleRootRows.map((row) => row.cross_abs_max));
  const minJacobianAbs = finiteMin(simpleRootRows.map((row) => row.jacobian_abs_min));
  const bestRow = simpleRootRows.reduce((best, row) =>
    Math.abs(row.min_receiver_integral) < Math.abs(best.min_receiver_integral) ? row : best
  );
  const allSimpleRootRowsPositive =
    simpleRootRows.length > 0 && simpleRootRows.every((row) => row.min_receiver_integral > 0);
  const maxSimpleRootSpeedRatio = finiteMax(simpleRootRows.map((row) => row.speed_ratio));
  const firstRootLedgerFailure = failedRootRows.length > 0 ? formatScanRow(failedRootRows[0]) : null;
  const sampledStatus =
    allSimpleRootRowsPositive && failedRootRows.length > 0
      ? "sampled-simple-root-trace-positive-root-ledger-boundary-detected"
      : allSimpleRootRowsPositive
        ? "sampled-period-rescaled-trace-simple-root-positive"
        : "sampled-period-rescaled-trace-zero-mean-open";

  return {
    schema: OCTAHEDRAL_PERIOD_RESCALED_TRACE_SCAN_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    source_bounded_speed_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-bounded-speed-successor-closure-row.md",
    source_priority_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-diagonal-affine-zero-mean-solver.md",
    priority_packet: "reference/priorities/braid-geometry-export-bridge/octahedral-period-rescaled-trace-scan.md",
    scan_parameters: {
      trace_scale: formatNumber(traceScale),
      phase_sample_count: phaseSamples,
      y_subdivision_count: ySubdivisions,
      speed_constraint: "none; speed_ratios are positive scan points, not an admissibility band",
      speed_ratios: speedRatios.map(formatNumber),
      relation_split: ["antipodal-partner", "cross-binary"],
    },
    period_rescaled_ansatz: {
      carrier: "Y_i(u)=s*p_i(theta), theta=u/h",
      physical_period: "H=2*pi*h",
      speed_ratio: "v=s/h",
      physical_delay_root_equation: "s*||p_i(theta)-p_j(theta-y/h)||-y=0",
      phase_delay_root_equation: "v*||p_i(theta)-p_j(theta-delta)||-delta=0",
      jacobian: "J_ij=1-v*T_j(theta-delta).Rhat_ij",
      speed_ode_mean: "M_i^nu=(1/h)*C_i(v)",
    },
    analytic_partner_positive_row: {
      phase_delay_equation: "2*v*cos(delta_v/2)-delta_v=0",
      partner_period_integral:
        "2*pi*sin(delta_v/2)/(h*delta_v^2*(1+v*sin(delta_v/2)))",
      rows: rows.map((row) => formatAnalyticPartner(row.analytic_partner)),
      minimum_partner_period_integral: formatNumber(minAnalyticPartner),
      status:
        minAnalyticPartner > 0
          ? "partner-subrow-positive-for-sampled-positive-speed-ratios"
          : "partner-subrow-open",
    },
    sampled_scan: {
      rows: formattedRows,
      summary: {
        row_count: rows.length,
        simple_root_row_count: simpleRootRows.length,
        root_ledger_failure_row_count: failedRootRows.length,
        root_failure_count: rootFailureCount,
        min_receiver_integral: formatNumber(minReceiverIntegral),
        max_receiver_integral: formatNumber(maxReceiverIntegral),
        max_cross_abs: formatNumber(maxCrossAbs),
        min_jacobian_abs: formatNumber(minJacobianAbs),
        max_simple_root_speed_ratio: formatNumber(maxSimpleRootSpeedRatio),
        first_root_ledger_failure: firstRootLedgerFailure,
        best_row_by_min_abs_receiver_integral: formatScanRow(bestRow),
        simple_root_zero_crossing_found: false,
        sampled_status: sampledStatus,
      },
    },
    artifact_claim: {
      scans_uniform_period_rescaling: true,
      assumes_fixed_speed_window: false,
      proves_partner_subrow_positive_for_sampled_positive_speed_ratios: minAnalyticPartner > 0,
      proves_cross_binary_cancellation_analytically: false,
      certifies_live_derivative_matrix: false,
      certifies_correction_direction: false,
      certifies_speed_primitive_feasibility: false,
      certifies_speed_clock_length: false,
      certifies_normal_reconstruction: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "analytic partner positivity plus sampled simple-root positive all-pairs rows; high-speed root-ledger boundary detected",
    },
    result: {
      theory_status: sampledStatus,
      first_successor_row: "multi-root-or-live-bounded-speed-branch-chart-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "No fixed speed window is assumed. Uniform period/winding rescaling of the trace carrier leaves the sampled speed-ODE mean positive on the simple-root rows, while larger sampled speed ratios leave the one-root ledger before producing a retained zero-mean branch.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralPeriodRescaledTraceScan(artifact) {
  const errors = [];
  assertField(
    artifact?.schema === OCTAHEDRAL_PERIOD_RESCALED_TRACE_SCAN_SCHEMA,
    "schema must match period-rescaled trace scan schema",
    errors
  );
  assertField(artifact?.packet_id === PACKET_ID, "packet id must match period-rescaled trace scan", errors);
  assertField(artifact?.promotion_status === PROMOTION_STATUS, "promotion status must remain priority-only", errors);
  assertField(
    artifact?.analytic_partner_positive_row?.status === "partner-subrow-positive-for-sampled-positive-speed-ratios",
    "analytic partner subrow must stay positive on the sampled positive speed ratios",
    errors
  );
  assertField(
    artifact?.sampled_scan?.summary?.simple_root_row_count > 0,
    "sampled scan must include simple-root rows",
    errors
  );
  assertField(
    artifact?.sampled_scan?.summary?.min_receiver_integral > 0,
    "sampled simple-root rows must retain a positive receiver mean obstruction",
    errors
  );
  assertField(
    [
      "sampled-simple-root-trace-positive-root-ledger-boundary-detected",
      "sampled-period-rescaled-trace-simple-root-positive",
    ].includes(artifact?.sampled_scan?.summary?.sampled_status),
    "sampled scan must record simple-root positivity or root-ledger boundary",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_bounded_speed_live_ledger === false,
    "artifact must not certify bounded-speed live ledger",
    errors
  );
  assertField(
    artifact?.artifact_claim?.retained_branch === false && artifact?.result?.retained_branch === false,
    "artifact must not claim retained branch status",
    errors
  );
  assertField(
    [
      "sampled-simple-root-trace-positive-root-ledger-boundary-detected",
      "sampled-period-rescaled-trace-simple-root-positive",
    ].includes(artifact?.result?.theory_status),
    "result theory status must record sampled simple-root positivity",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-period-rescaled-trace-scan.mjs [options]",
    "",
    "Options:",
    "  --trace-scale <s>       Uniform trace scale to evaluate (default: 1)",
    "  --speed-ratios <csv>    Comma-separated positive v=s/h scan values",
    "  --samples <n>           Periodic phase samples over [0, 2*pi) (default: 73)",
    "  --subdivisions <n>      Root-search subdivisions (default: 480)",
    "  --out <path>            Write artifact JSON to path instead of stdout",
    "  --validate <path>       Validate an existing artifact JSON file",
    "  --schema                Print the artifact schema identifier",
    "  --pretty                Pretty-print JSON output",
    "  --help                  Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    traceScale: DEFAULT_TRACE_SCALE,
    speedRatios: DEFAULT_SPEED_RATIOS,
    phaseSamples: DEFAULT_PHASE_SAMPLES,
    ySubdivisions: DEFAULT_Y_SUBDIVISIONS,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--trace-scale") {
      args.traceScale = Number(argv[++index]);
    } else if (arg === "--speed-ratios") {
      args.speedRatios = parseSpeedRatios(argv[++index]);
    } else if (arg === "--samples") {
      args.phaseSamples = Number.parseInt(argv[++index], 10);
    } else if (arg === "--subdivisions") {
      args.ySubdivisions = Number.parseInt(argv[++index], 10);
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
          schema: "neutral-braid-octahedral-period-rescaled-trace-scan-schema/v1",
          artifact_schema: OCTAHEDRAL_PERIOD_RESCALED_TRACE_SCAN_SCHEMA,
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
    const errors = validateOctahedralPeriodRescaledTraceScan(artifact);
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

  const artifact = buildOctahedralPeriodRescaledTraceScan({
    traceScale: args.traceScale,
    speedRatios: args.speedRatios,
    phaseSamples: args.phaseSamples,
    ySubdivisions: args.ySubdivisions,
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

#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_SITES,
  findOctahedralRoots,
  octahedralRootJacobian,
  octahedralSiteById,
  octahedralSitePosition,
  octahedralSiteTangent,
  orderedOctahedralPairs,
} from "./octahedral-root-ledger.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_SPEED_ODE_DIAGNOSTIC_SCHEMA = "neutral-braid-octahedral-speed-ode-diagnostic/v1";

const PACKET_ID = "octahedral_speed_ode_diagnostic";
const PROMOTION_STATUS = "priority-only";
const TAU = 2 * Math.PI;
const DEFAULT_PHASE_SAMPLES = 720;
const DEFAULT_Y_SUBDIVISIONS = 720;
const DEFAULT_ZERO_MEAN_TOLERANCE = 1e-9;
const DEFAULT_GAMMA = 1;
const DEFAULT_NU_MIN = 0.5;
const DEFAULT_NU_MAX = 1.5;
const UNIT_CIRCLE_LENGTH = TAU;
const PARTNER_ROOT_INTERVAL = [1.47817026642, 1.47817026644];

function add(left, right) {
  return left.map((entry, index) => entry + right[index]);
}

function scale(vector, factor) {
  return vector.map((entry) => factor * entry);
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

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toFixed(12));
}

function phaseTheta(index, phaseSamples) {
  return (TAU * index) / phaseSamples;
}

function finiteMin(values) {
  return values.reduce((best, value) => (Number.isFinite(value) && value < best ? value : best), Infinity);
}

function finiteMax(values) {
  return values.reduce((best, value) => (Number.isFinite(value) && value > best ? value : best), -Infinity);
}

function rms(values) {
  if (values.length === 0) {
    return null;
  }
  return Math.sqrt(values.reduce((sum, value) => sum + value * value, 0) / values.length);
}

function partnerMeanFromDelay(y) {
  return Math.sin(y) / (y ** 3 * (1 + Math.sin(y / 2)));
}

function analyticPartnerMeanCertificate() {
  const endpointValues = PARTNER_ROOT_INTERVAL.map(partnerMeanFromDelay);
  const meanLow = finiteMin(endpointValues);
  const meanHigh = finiteMax(endpointValues);
  return {
    status: "analytic-antipodal-partner-positive-mean-certified",
    root_equation: "G_partner(y)=2*cos(y/2)-y",
    jacobian_formula: "J_partner=1+sin(y/2)",
    tangential_mean_formula: "sin(y*)/(y*^3*(1+sin(y*/2)))",
    root_interval: PARTNER_ROOT_INTERVAL.map(formatNumber),
    endpoint_mean_values: endpointValues.map(formatNumber),
    mean_interval_estimate: [formatNumber(meanLow), formatNumber(meanHigh)],
    period_integral_interval_estimate: [formatNumber(TAU * meanLow), formatNumber(TAU * meanHigh)],
    positivity_reason: "the certified root bracket lies in (0, pi), so sin(y*)>0 and J_partner>0",
  };
}

function siteInventory() {
  return {
    sites: OCTAHEDRAL_SITES.map((site) => ({
      id: site.id,
      binary: site.binary,
      sign: site.sign,
      label: site.label,
      polarity: site.polarity,
      polarity_label: site.polarity > 0 ? "positive" : "negative",
    })),
    polarity_balance: {
      positive: OCTAHEDRAL_SITES.filter((site) => site.polarity === 1).length,
      negative: OCTAHEDRAL_SITES.filter((site) => site.polarity === -1).length,
      q_core_units: OCTAHEDRAL_SITES.reduce((sum, site) => sum + site.polarity, 0),
    },
  };
}

function normalizedDisplacement(receiver, source, theta, y) {
  const receiverPosition = octahedralSitePosition(receiver, theta);
  const sourcePosition = octahedralSitePosition(source, theta - y);
  const displacement = subtract(receiverPosition, sourcePosition);
  const distance = norm(displacement);
  return scale(displacement, 1 / distance);
}

function sourceForceRow(pair, theta, ySubdivisions, receiverTangent) {
  const receiver = octahedralSiteById(pair.receiver);
  const source = octahedralSiteById(pair.source);
  const roots = findOctahedralRoots(receiver, source, theta, ySubdivisions);

  if (roots.length !== 1) {
    return {
      source: pair.source,
      source_label: pair.source_label,
      source_relation: pair.source_relation,
      root_count: roots.length,
      tangential_contribution: null,
      force: null,
      y: null,
      jacobian: null,
    };
  }

  const y = roots[0];
  const jacobian = octahedralRootJacobian(receiver, source, theta, y);
  const rhat = normalizedDisplacement(receiver, source, theta, y);
  const receiverNormalNumerator = 1 - dot(receiverTangent, rhat);
  const receiverNormalFactor = receiverNormalNumerator / jacobian;
  const coefficient = pair.force_sign * Math.abs(receiverNormalFactor) / (y * y);
  const force = scale(rhat, coefficient);

  return {
    source: pair.source,
    source_label: pair.source_label,
    source_relation: pair.source_relation,
    root_count: 1,
    tangential_contribution: dot(receiverTangent, force),
    force,
    y,
    jacobian,
  };
}

function tangentForcing(receiver, theta, pairs, ySubdivisions) {
  const receiverTangent = octahedralSiteTangent(receiver, theta);
  let force = [0, 0, 0];
  let partnerTangential = 0;
  let crossBinaryTangential = 0;
  const failures = [];
  const sourceRows = [];

  for (const pair of pairs.filter((candidate) => candidate.receiver === receiver.id)) {
    const row = sourceForceRow(pair, theta, ySubdivisions, receiverTangent);
    if (row.root_count !== 1) {
      failures.push({
        receiver: pair.receiver,
        source: pair.source,
        root_count: row.root_count,
      });
      continue;
    }

    force = add(force, row.force);
    if (row.source_relation === "antipodal-partner") {
      partnerTangential += row.tangential_contribution;
    } else if (row.source_relation === "cross-binary") {
      crossBinaryTangential += row.tangential_contribution;
    }
    sourceRows.push({
      source: row.source,
      source_label: row.source_label,
      source_relation: row.source_relation,
      tangential_contribution: row.tangential_contribution,
    });
  }

  return {
    total: dot(receiverTangent, force),
    partner: partnerTangential,
    cross_binary: crossBinaryTangential,
    failures,
    source_rows: sourceRows,
  };
}

function sourceMeanRows(sourceSamples) {
  return [...sourceSamples.values()].map((row) => {
    const mean = row.values.reduce((sum, value) => sum + value, 0) / row.values.length;
    return {
      source: row.source,
      source_label: row.source_label,
      source_relation: row.source_relation,
      mean: formatNumber(mean),
      sampled_abs_mean: formatNumber(Math.abs(mean)),
    };
  });
}

function crossBinaryCancellationRows(rows) {
  const crossRows = rows
    .filter((row) => row.source_relation === "cross-binary")
    .map((row) => ({ ...row, raw_mean: row.mean }));
  const used = new Set();
  const cancellationRows = [];

  for (const row of crossRows) {
    if (used.has(row.source)) {
      continue;
    }
    let best = null;
    for (const candidate of crossRows) {
      if (candidate.source === row.source || used.has(candidate.source)) {
        continue;
      }
      const residual = Math.abs(row.raw_mean + candidate.raw_mean);
      if (!best || residual < best.residual) {
        best = { candidate, residual };
      }
    }
    if (!best) {
      continue;
    }
    used.add(row.source);
    used.add(best.candidate.source);
    cancellationRows.push({
      sources: [row.source, best.candidate.source],
      source_labels: [row.source_label, best.candidate.source_label],
      means: [formatNumber(row.raw_mean), formatNumber(best.candidate.raw_mean)],
      sum: formatNumber(row.raw_mean + best.candidate.raw_mean),
      abs_sum: formatNumber(best.residual),
    });
  }

  return cancellationRows;
}

function crossBinaryPartnerPair(pair, receiverPairs) {
  const source = octahedralSiteById(pair.source);
  return receiverPairs.find((candidate) => {
    if (candidate.source_relation !== "cross-binary" || candidate.source === pair.source) {
      return false;
    }
    const candidateSource = octahedralSiteById(candidate.source);
    return candidateSource.binary !== source.binary && candidateSource.sign === -source.sign;
  });
}

function sourceTangentialContribution(pair, receiver, theta, ySubdivisions) {
  const receiverTangent = octahedralSiteTangent(receiver, theta);
  const row = sourceForceRow(pair, theta, ySubdivisions, receiverTangent);
  return row.root_count === 1 ? row.tangential_contribution : null;
}

function crossBinaryAntiPeriodicityRows(site, pairs, options) {
  const receiverPairs = pairs.filter((candidate) => candidate.receiver === site.id);
  const crossRows = receiverPairs.filter((pair) => pair.source_relation === "cross-binary");
  const used = new Set();
  const rows = [];

  for (const pair of crossRows) {
    if (used.has(pair.source)) {
      continue;
    }
    const partnerPair = crossBinaryPartnerPair(pair, receiverPairs);
    if (!partnerPair || used.has(partnerPair.source)) {
      continue;
    }

    let maxAbsKernelSum = 0;
    for (let phaseIndex = 0; phaseIndex < options.phaseSamples; phaseIndex += 1) {
      const theta = phaseTheta(phaseIndex, options.phaseSamples);
      const left = sourceTangentialContribution(pair, site, theta, options.ySubdivisions);
      const right = sourceTangentialContribution(partnerPair, site, theta + Math.PI / 2, options.ySubdivisions);
      if (left === null || right === null) {
        maxAbsKernelSum = Infinity;
        break;
      }
      maxAbsKernelSum = Math.max(maxAbsKernelSum, Math.abs(left + right));
    }

    used.add(pair.source);
    used.add(partnerPair.source);
    rows.push({
      sources: [pair.source, partnerPair.source],
      source_labels: [pair.source_label, partnerPair.source_label],
      phase_shift: "pi/2",
      source_pair_involution: "exchange the two nonreceiver binaries and flip the source sign",
      reduced_graph_invariant: "same kappa and same reduced phase modulo pi",
      kernel_identity: "f_{i,j}(theta)+f_{i,j'}(theta+pi/2)=0",
      sampled_max_abs_kernel_sum: formatNumber(maxAbsKernelSum),
    });
  }

  const maxAbsKernelSum = finiteMax(rows.map((row) => row.sampled_max_abs_kernel_sum));
  return {
    rows,
    sampled_max_abs_kernel_sum: formatNumber(maxAbsKernelSum),
    sampled_status:
      maxAbsKernelSum <= options.zeroMeanTolerance
        ? "sampled-cross-binary-antiperiodicity-check-passed"
        : "sampled-cross-binary-antiperiodicity-check-failed",
  };
}

function primitiveStats(values, step, gamma, nuMin, nuMax) {
  let primitive = 0;
  let primitiveIntegral = 0;
  let primitiveMin = 0;
  let primitiveMax = 0;

  for (const value of values) {
    primitiveIntegral += primitive * step;
    primitive += gamma * value * step;
    primitiveMin = Math.min(primitiveMin, primitive);
    primitiveMax = Math.max(primitiveMax, primitive);
  }

  const initialSpeedInterval = [nuMin - primitiveMin, nuMax - primitiveMax];
  const intervalWidth = initialSpeedInterval[1] - initialSpeedInterval[0];
  const clockLengthInitialSpeed = (UNIT_CIRCLE_LENGTH - primitiveIntegral) / TAU;

  return {
    primitive_end_value: primitive,
    primitive_min: primitiveMin,
    primitive_max: primitiveMax,
    primitive_excursion: primitiveMax - primitiveMin,
    primitive_integral_over_period: primitiveIntegral,
    initial_speed_interval: initialSpeedInterval,
    initial_speed_interval_width: intervalWidth,
    initial_speed_interval_nonempty: intervalWidth >= 0,
    clock_length_initial_speed: clockLengthInitialSpeed,
    clock_length_initial_speed_in_interval:
      clockLengthInitialSpeed >= initialSpeedInterval[0] && clockLengthInitialSpeed <= initialSpeedInterval[1],
  };
}

function buildSiteRow(site, pairs, options) {
  const values = [];
  const partnerValues = [];
  const crossBinaryValues = [];
  const failures = [];
  const step = TAU / options.phaseSamples;
  const sourceSamples = new Map();

  for (let phaseIndex = 0; phaseIndex < options.phaseSamples; phaseIndex += 1) {
    const theta = phaseTheta(phaseIndex, options.phaseSamples);
    const forcing = tangentForcing(site, theta, pairs, options.ySubdivisions);
    if (forcing.failures.length > 0) {
      failures.push({
        phase_index: phaseIndex,
        theta: formatNumber(theta),
        failures: forcing.failures,
      });
      continue;
    }
    values.push(forcing.total);
    partnerValues.push(forcing.partner);
    crossBinaryValues.push(forcing.cross_binary);
    for (const sourceRow of forcing.source_rows) {
      if (!sourceSamples.has(sourceRow.source)) {
        sourceSamples.set(sourceRow.source, {
          source: sourceRow.source,
          source_label: sourceRow.source_label,
          source_relation: sourceRow.source_relation,
          values: [],
        });
      }
      sourceSamples.get(sourceRow.source).values.push(sourceRow.tangential_contribution);
    }
  }

  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const partnerMean = partnerValues.reduce((sum, value) => sum + value, 0) / partnerValues.length;
  const crossBinaryMean = crossBinaryValues.reduce((sum, value) => sum + value, 0) / crossBinaryValues.length;
  const sourceMeans = sourceMeanRows(sourceSamples);
  const cancellationRows = crossBinaryCancellationRows(sourceMeans);
  const crossCancellationAbsMax = finiteMax(cancellationRows.map((row) => row.abs_sum));
  const antiPeriodicity = crossBinaryAntiPeriodicityRows(site, pairs, options);
  const periodIntegral = mean * TAU;
  const stats = primitiveStats(values, step, options.gamma, options.nuMin, options.nuMax);
  const zeroMeanResidual = Math.abs(periodIntegral);

  return {
    site: site.id,
    label: site.label,
    phase_sample_count: options.phaseSamples,
    evaluated_phase_nodes: values.length,
    root_failure_count: failures.length,
    first_root_failure: failures[0] ?? null,
    tangent_forcing: {
      mean: formatNumber(mean),
      period_integral: formatNumber(periodIntegral),
      rms: formatNumber(rms(values)),
      min: formatNumber(finiteMin(values)),
      max: formatNumber(finiteMax(values)),
      partner_mean: formatNumber(partnerMean),
      cross_binary_mean: formatNumber(crossBinaryMean),
      sampled_cross_binary_mean_abs: formatNumber(Math.abs(crossBinaryMean)),
      zero_mean_residual: formatNumber(zeroMeanResidual),
      zero_mean_status:
        failures.length === 0 && zeroMeanResidual <= options.zeroMeanTolerance
          ? "sampled-zero-mean-passed"
          : "sampled-zero-mean-failed",
    },
    mean_split: {
      source_mean_rows: sourceMeans,
      cross_binary_pair_cancellation_rows: cancellationRows,
      cross_binary_pair_cancellation_abs_max: formatNumber(crossCancellationAbsMax),
      cross_binary_antiperiodicity_rows: antiPeriodicity.rows,
      cross_binary_antiperiodicity_sampled_max_abs: antiPeriodicity.sampled_max_abs_kernel_sum,
      cross_binary_antiperiodicity_sampled_status: antiPeriodicity.sampled_status,
      cross_binary_pair_cancellation_status:
        failures.length === 0 && crossCancellationAbsMax <= options.zeroMeanTolerance
          ? "sampled-cross-binary-pair-mean-cancellation-passed"
          : "sampled-cross-binary-pair-mean-cancellation-failed",
      partner_positive_mean_status:
        failures.length === 0 && partnerMean > options.zeroMeanTolerance
          ? "sampled-antipodal-partner-positive-mean-passed"
          : "sampled-antipodal-partner-positive-mean-failed",
    },
    primitive: {
      gamma: options.gamma,
      primitive_end_value: formatNumber(stats.primitive_end_value),
      primitive_min: formatNumber(stats.primitive_min),
      primitive_max: formatNumber(stats.primitive_max),
      primitive_excursion: formatNumber(stats.primitive_excursion),
      primitive_integral_over_period: formatNumber(stats.primitive_integral_over_period),
      closure_status:
        Math.abs(stats.primitive_end_value) <= options.zeroMeanTolerance
          ? "sampled-periodic-primitive-passed"
          : "sampled-periodic-primitive-failed",
    },
    speed_band: {
      nu_min: options.nuMin,
      nu_max: options.nuMax,
      initial_speed_interval: stats.initial_speed_interval.map(formatNumber),
      initial_speed_interval_width: formatNumber(stats.initial_speed_interval_width),
      initial_speed_interval_nonempty: stats.initial_speed_interval_nonempty,
      clock_length_initial_speed: formatNumber(stats.clock_length_initial_speed),
      clock_length_initial_speed_in_interval: stats.clock_length_initial_speed_in_interval,
      feasibility_status:
        stats.initial_speed_interval_nonempty && stats.clock_length_initial_speed_in_interval
          ? "sampled-band-and-clock-length-compatible"
          : "sampled-band-or-clock-length-failed",
    },
  };
}

export function buildOctahedralSpeedOdeDiagnostic(options = {}) {
  const phaseSamples = Number.parseInt(options.phaseSamples ?? DEFAULT_PHASE_SAMPLES, 10);
  const ySubdivisions = Number.parseInt(options.ySubdivisions ?? DEFAULT_Y_SUBDIVISIONS, 10);
  const zeroMeanTolerance = Number(options.zeroMeanTolerance ?? DEFAULT_ZERO_MEAN_TOLERANCE);
  const gamma = Number(options.gamma ?? DEFAULT_GAMMA);
  const nuMin = Number(options.nuMin ?? DEFAULT_NU_MIN);
  const nuMax = Number(options.nuMax ?? DEFAULT_NU_MAX);

  if (!Number.isInteger(phaseSamples) || phaseSamples < 4) {
    throw new Error("phaseSamples must be an integer >= 4");
  }
  if (!Number.isInteger(ySubdivisions) || ySubdivisions < 10) {
    throw new Error("ySubdivisions must be an integer >= 10");
  }
  if (!Number.isFinite(zeroMeanTolerance) || zeroMeanTolerance < 0) {
    throw new Error("zeroMeanTolerance must be a nonnegative number");
  }
  if (!Number.isFinite(gamma) || gamma === 0) {
    throw new Error("gamma must be a finite nonzero number");
  }
  if (!Number.isFinite(nuMin) || !Number.isFinite(nuMax) || !(0 < nuMin && nuMin < nuMax)) {
    throw new Error("speed band must satisfy 0 < nuMin < nuMax");
  }

  const pairs = orderedOctahedralPairs();
  const siteRows = OCTAHEDRAL_SITES.map((site) =>
    buildSiteRow(site, pairs, { phaseSamples, ySubdivisions, zeroMeanTolerance, gamma, nuMin, nuMax })
  );
  const rootFailureCount = siteRows.reduce((sum, row) => sum + row.root_failure_count, 0);
  const zeroMeanFailures = siteRows.filter((row) => row.tangent_forcing.zero_mean_status !== "sampled-zero-mean-passed");
  const primitiveFailures = siteRows.filter((row) => row.primitive.closure_status !== "sampled-periodic-primitive-passed");
  const maxZeroMeanResidual = finiteMax(siteRows.map((row) => row.tangent_forcing.zero_mean_residual));
  const partnerMeanMin = finiteMin(siteRows.map((row) => row.tangent_forcing.partner_mean));
  const partnerMeanMax = finiteMax(siteRows.map((row) => row.tangent_forcing.partner_mean));
  const crossBinaryMeanAbsMax = finiteMax(siteRows.map((row) => row.tangent_forcing.sampled_cross_binary_mean_abs));
  const crossBinaryPairCancellationAbsMax = finiteMax(
    siteRows.map((row) => row.mean_split.cross_binary_pair_cancellation_abs_max)
  );
  const crossBinaryAntiPeriodicityAbsMax = finiteMax(
    siteRows.map((row) => row.mean_split.cross_binary_antiperiodicity_sampled_max_abs)
  );

  return {
    schema: OCTAHEDRAL_SPEED_ODE_DIAGNOSTIC_SCHEMA,
    packet_id: PACKET_ID,
    artifact_id: "neutral_braid_octahedral_speed_ode.frozen_fixed_ledger.v1",
    promotion_status: PROMOTION_STATUS,
    sources: [
      "scripts/neutral-braid/octahedral-root-ledger.mjs",
      "scripts/neutral-braid/octahedral-force-residual.mjs",
      "reference/priorities/braid-retained-branch-closure/shell-braid/bounded-speed-factor-speed-ode-solvability.md",
      "reference/priorities/braid-retained-branch-closure/shell-braid/bounded-speed-factor-all-pairs-ledger-handoff-contract.md",
    ],
    artifact_claim: {
      kind: "frozen_fixed_ledger_speed_ode_diagnostic",
      solves_dynamics: false,
      certifies_root_ledger: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      strongest_claim:
        "On the frozen rigid octahedral all-pairs force ledger, the sampled closed-period tangent forcing has nonzero mean, so a periodic bounded-speed primitive is not certified without changing the live ledger.",
    },
    source_ledger_reference: {
      fixed_source_artifact_id: "neutral_braid_octahedral_root_ledger.certified.v1",
      fixed_source_status: "all-pairs-root-ledger-certified",
      solver_space: "fixed-speed-special-case",
      pair_policy: "Pi_all",
      ordered_distinct_pair_count: pairs.length,
      same_source_policy: "ordinary-same-source-excluded",
      h_mem: 2,
      bounded_speed_live_ledger_status: "bounded-speed-ledger-handoff-open",
    },
    numerical_method: {
      phase_sample_count: phaseSamples,
      phase_domain: "[0, 2*pi)",
      endpoint_duplicate_included: false,
      y_subdivisions: ySubdivisions,
      zero_mean_tolerance: zeroMeanTolerance,
      gamma,
      declared_speed_band: {
        nu_min: nuMin,
        nu_max: nuMax,
      },
      force_formula:
        "sum_j sign(q_i*q_j)*abs(Wrec_ij)*rhat_ij/y_ij^2; f_i(theta)=T_i(theta) dot force_i(theta)",
      integration_rule: "uniform periodic left-endpoint sum on [0, 2*pi)",
    },
    site_inventory: siteInventory(),
    sampled_root_dependency: {
      status: rootFailureCount === 0 ? "certified-root-ledger-dependency-passed" : "sampled-root-ledger-diagnostic-failed",
      failed_root_node_count: rootFailureCount,
      first_failed_root_node: siteRows.find((row) => row.first_root_failure)?.first_root_failure ?? null,
    },
    speed_ode_solvability: {
      status:
        rootFailureCount === 0 && zeroMeanFailures.length === 0
          ? "sampled-speed-ode-zero-mean-passed"
          : "sampled-speed-ode-zero-mean-failed",
      diagnostic_class: "frozen-fixed-ledger-speed-ODE-diagnostic",
      site_rows: siteRows,
      sampled_summary: {
        max_zero_mean_residual: formatNumber(maxZeroMeanResidual),
        zero_mean_failed_site_count: zeroMeanFailures.length,
        periodic_primitive_failed_site_count: primitiveFailures.length,
        mean_tangent_forcing_min: formatNumber(finiteMin(siteRows.map((row) => row.tangent_forcing.mean))),
        mean_tangent_forcing_max: formatNumber(finiteMax(siteRows.map((row) => row.tangent_forcing.mean))),
        partner_mean_min: formatNumber(partnerMeanMin),
        partner_mean_max: formatNumber(partnerMeanMax),
        cross_binary_mean_abs_max: formatNumber(crossBinaryMeanAbsMax),
        cross_binary_pair_cancellation_abs_max: formatNumber(crossBinaryPairCancellationAbsMax),
        cross_binary_antiperiodicity_sampled_max_abs: formatNumber(crossBinaryAntiPeriodicityAbsMax),
      },
      mean_split_certificate: {
        status: "frozen-fixed-ledger-mean-obstruction",
        source_relation_split: ["antipodal-partner", "cross-binary"],
        obstructing_source_relation: "antipodal-partner",
        partner_mean_min: formatNumber(partnerMeanMin),
        partner_mean_max: formatNumber(partnerMeanMax),
        cross_binary_mean_abs_max: formatNumber(crossBinaryMeanAbsMax),
        cross_binary_pair_cancellation_abs_max: formatNumber(crossBinaryPairCancellationAbsMax),
        cross_binary_antiperiodicity_sampled_max_abs: formatNumber(crossBinaryAntiPeriodicityAbsMax),
        partner_positive_certificate: analyticPartnerMeanCertificate(),
        cross_binary_cancellation_status:
          crossBinaryMeanAbsMax <= zeroMeanTolerance && crossBinaryPairCancellationAbsMax <= zeroMeanTolerance
            ? "sampled-cross-binary-pair-mean-cancellation-passed"
            : "sampled-cross-binary-pair-mean-cancellation-failed",
        cross_binary_symmetry_certificate_status: "analytic-cross-binary-phase-antiperiodicity-certified",
        cross_binary_symmetry_certificate: {
          phase_shift: "pi/2",
          aggregate_identity: "C_i(theta+pi/2)=-C_i(theta)",
          source_pair_involution: "for fixed receiver, exchange the two nonreceiver binaries and flip source sign",
          reduced_graph_basis:
            "the involution preserves kappa and the reduced phase modulo pi in F_kappa(theta_tilde,y)=0",
          jacobian_weight_status: "preserved-by-reduced-root-graph-uniqueness",
          tangent_numerator_status: "sign-reversed-by-coordinate-substitution",
          sampled_checksum_status:
            crossBinaryAntiPeriodicityAbsMax <= zeroMeanTolerance
              ? "sampled-cross-binary-antiperiodicity-check-passed"
              : "sampled-cross-binary-antiperiodicity-check-failed",
        },
        zero_mean_status: "sampled-speed-ode-zero-mean-failed",
        bounded_speed_handoff_status: "bounded-speed-ledger-handoff-open",
        retention_effect: "diagnostic-only",
      },
    },
    residual_vector: {
      rows: [
        { row: "R_source_all_pairs_root_ledger", status: "passed", value: "all-pairs-root-ledger-certified" },
        {
          row: "R_bounded_speed_live_ledger_handoff",
          status: "open",
          value: "bounded-speed-ledger-handoff-open",
        },
        {
          row: "R_speed_ODE_zero_mean_sampled",
          status: zeroMeanFailures.length === 0 ? "passed" : "failed",
          value: formatNumber(maxZeroMeanResidual),
        },
        {
          row: "R_speed_primitive_periodic_sampled",
          status: primitiveFailures.length === 0 ? "passed" : "failed",
          value: primitiveFailures.length,
        },
        { row: "R_normal", status: "not_computed", value: null },
        { row: "R_action_Noether", status: "not_computed", value: null },
        { row: "R_event", status: "not_computed", value: null },
      ],
      diagnostic_first_failure_row:
        rootFailureCount === 0 ? "sampled-speed-ode-zero-mean-failed" : "sampled-root-ledger-diagnostic-failed",
      bounded_speed_handoff_status: "bounded-speed-ledger-handoff-open",
    },
    result: {
      speed_ode_diagnostic:
        rootFailureCount === 0 && zeroMeanFailures.length === 0 ? "sampled_passed" : "sampled_failed",
      frozen_ledger_status:
        zeroMeanFailures.length === 0
          ? "not_rejected_by_sampled_zero_mean_row"
          : "rejected_by_sampled_zero_mean_row",
      bounded_speed_live_ledger: "not_built",
      retention: "not_retained",
      retained_branch: false,
      diagnostic_first_failure_status:
        rootFailureCount === 0 ? "sampled-speed-ode-zero-mean-failed" : "sampled-root-ledger-diagnostic-failed",
      bounded_speed_handoff_status: "bounded-speed-ledger-handoff-open",
      status_note:
        "This artifact tests only the frozen fixed-ledger speed-ODE mean and primitive rows. It does not build a bounded-speed live ledger, action row, event row, normal reconstruction, stability row, observer export, or retained branch.",
    },
    not_retained_reason: [
      "sampled closed-period tangent forcing has nonzero mean on the frozen rigid ledger",
      "periodic bounded-speed primitive is not certified on the frozen rigid ledger",
      "bounded-speed live ledger, normal reconstruction, action, Noether, event, stability, and observer-export rows are not closed",
    ],
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralSpeedOdeDiagnostic(artifact) {
  const errors = [];
  assertField(artifact && typeof artifact === "object" && !Array.isArray(artifact), "artifact must be an object", errors);
  if (errors.length > 0) {
    return errors;
  }

  assertField(
    artifact.schema === OCTAHEDRAL_SPEED_ODE_DIAGNOSTIC_SCHEMA,
    `schema must be ${OCTAHEDRAL_SPEED_ODE_DIAGNOSTIC_SCHEMA}`,
    errors
  );
  assertField(artifact.packet_id === PACKET_ID, `packet_id must be ${PACKET_ID}`, errors);
  assertField(artifact.promotion_status === PROMOTION_STATUS, `promotion_status must be ${PROMOTION_STATUS}`, errors);
  assertField(artifact.artifact_claim?.solves_dynamics === false, "artifact must declare solves_dynamics=false", errors);
  assertField(
    artifact.artifact_claim?.certifies_bounded_speed_live_ledger === false,
    "artifact must not certify a bounded-speed live ledger",
    errors
  );
  assertField(artifact.result?.retained_branch === false, "result.retained_branch must be false", errors);

  const sites = artifact.site_inventory?.sites ?? [];
  assertField(Array.isArray(sites) && sites.length === 6, "site inventory must contain six sites", errors);
  assertField(artifact.source_ledger_reference?.ordered_distinct_pair_count === 30, "pair policy cardinality must be 30", errors);
  assertField(
    artifact.source_ledger_reference?.fixed_source_status === "all-pairs-root-ledger-certified",
    "fixed source ledger must be certified",
    errors
  );
  assertField(
    artifact.source_ledger_reference?.bounded_speed_live_ledger_status === "bounded-speed-ledger-handoff-open",
    "bounded-speed live ledger handoff must remain open",
    errors
  );

  const rootDependency = artifact.sampled_root_dependency ?? {};
  assertField(rootDependency.status === "certified-root-ledger-dependency-passed", "certified root dependency must pass", errors);
  assertField(rootDependency.failed_root_node_count === 0, "sampled root dependency failed node count must be 0", errors);

  const speed = artifact.speed_ode_solvability ?? {};
  assertField(speed.status === "sampled-speed-ode-zero-mean-failed", "speed ODE zero-mean row must fail", errors);
  assertField(Array.isArray(speed.site_rows) && speed.site_rows.length === 6, "speed ODE rows must cover six sites", errors);
  assertField(
    Number.isFinite(speed.sampled_summary?.max_zero_mean_residual) &&
      speed.sampled_summary.max_zero_mean_residual > 1,
    "max zero-mean residual must be nontrivial",
    errors
  );
  assertField(speed.sampled_summary?.zero_mean_failed_site_count === 6, "all six sites must fail zero-mean row", errors);
  assertField(
    Number.isFinite(speed.sampled_summary?.partner_mean_min) && speed.sampled_summary.partner_mean_min > 0.18,
    "partner mean must expose the positive mean source",
    errors
  );
  assertField(
    Number.isFinite(speed.sampled_summary?.cross_binary_mean_abs_max) &&
      speed.sampled_summary.cross_binary_mean_abs_max < 1e-9,
    "cross-binary sampled mean should cancel to numerical tolerance",
    errors
  );
  if (speed.sampled_summary?.cross_binary_pair_cancellation_abs_max !== undefined) {
    assertField(
      Number.isFinite(speed.sampled_summary.cross_binary_pair_cancellation_abs_max) &&
        speed.sampled_summary.cross_binary_pair_cancellation_abs_max < 1e-9,
      "cross-binary sampled pair means should cancel to numerical tolerance",
      errors
    );
  }
  if (speed.sampled_summary?.cross_binary_antiperiodicity_sampled_max_abs !== undefined) {
    assertField(
      Number.isFinite(speed.sampled_summary.cross_binary_antiperiodicity_sampled_max_abs) &&
        speed.sampled_summary.cross_binary_antiperiodicity_sampled_max_abs < 1e-9,
      "cross-binary anti-periodicity sampled checksum should pass to numerical tolerance",
      errors
    );
  }
  if (speed.mean_split_certificate !== undefined) {
    assertField(
      speed.mean_split_certificate.status === "frozen-fixed-ledger-mean-obstruction",
      "mean split certificate must preserve the frozen fixed-ledger obstruction status",
      errors
    );
    assertField(
      speed.mean_split_certificate.obstructing_source_relation === "antipodal-partner",
      "mean split certificate must identify antipodal-partner as the obstructing relation",
      errors
    );
    assertField(
      speed.mean_split_certificate.bounded_speed_handoff_status === "bounded-speed-ledger-handoff-open",
      "mean split certificate must keep bounded-speed handoff open",
      errors
    );
    assertField(
      speed.mean_split_certificate.retention_effect === "diagnostic-only",
      "mean split certificate must be diagnostic-only",
      errors
    );
    assertField(
      speed.mean_split_certificate.partner_positive_certificate?.status ===
        "analytic-antipodal-partner-positive-mean-certified",
      "mean split certificate must include the analytic partner positive mean row",
      errors
    );
    assertField(
      speed.mean_split_certificate.cross_binary_cancellation_status ===
        "sampled-cross-binary-pair-mean-cancellation-passed",
      "mean split certificate must include the sampled cross-binary pair checksum",
      errors
    );
    assertField(
      speed.mean_split_certificate.cross_binary_symmetry_certificate_status ===
        "analytic-cross-binary-phase-antiperiodicity-certified",
      "mean split certificate must include the analytic cross-binary anti-periodicity row",
      errors
    );
  }
  for (const row of speed.site_rows ?? []) {
    if (row.mean_split !== undefined) {
      assertField(
        Array.isArray(row.mean_split.source_mean_rows) && row.mean_split.source_mean_rows.length === 5,
        "each site must emit five source mean rows",
        errors
      );
      assertField(
        Array.isArray(row.mean_split.cross_binary_pair_cancellation_rows) &&
          row.mean_split.cross_binary_pair_cancellation_rows.length === 2,
        "each site must emit two cross-binary cancellation pairs",
        errors
      );
      assertField(
        row.mean_split.cross_binary_pair_cancellation_status ===
          "sampled-cross-binary-pair-mean-cancellation-passed",
        "cross-binary pair cancellation status must pass",
        errors
      );
      assertField(
        Array.isArray(row.mean_split.cross_binary_antiperiodicity_rows) &&
          row.mean_split.cross_binary_antiperiodicity_rows.length === 2,
        "each site must emit two cross-binary anti-periodicity rows",
        errors
      );
      assertField(
        row.mean_split.cross_binary_antiperiodicity_sampled_status ===
          "sampled-cross-binary-antiperiodicity-check-passed",
        "cross-binary anti-periodicity sampled checksum must pass",
        errors
      );
      assertField(
        row.mean_split.partner_positive_mean_status === "sampled-antipodal-partner-positive-mean-passed",
        "antipodal partner positive mean status must pass",
        errors
      );
    }
  }
  assertField(artifact.result?.speed_ode_diagnostic === "sampled_failed", "speed ODE diagnostic must fail", errors);
  assertField(artifact.result?.retention === "not_retained", "retention must be not_retained", errors);

  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-speed-ode-diagnostic.mjs [options]",
    "",
    "Options:",
    "  --samples <n>          Periodic phase samples over [0, 2*pi) (default: 720)",
    "  --subdivisions <n>     Root-search subdivisions over 0 < y <= 2 (default: 720)",
    "  --zero-mean-tol <x>    Zero-mean tolerance (default: 1e-9)",
    "  --gamma <x>            Diagnostic speed-ODE scale, nonzero (default: 1)",
    "  --nu-min <x>           Declared diagnostic speed lower bound (default: 0.5)",
    "  --nu-max <x>           Declared diagnostic speed upper bound (default: 1.5)",
    "  --out <path>           Write artifact JSON to path instead of stdout",
    "  --validate <path>      Validate an existing artifact JSON file",
    "  --schema               Print the artifact schema identifier",
    "  --pretty               Pretty-print JSON output",
    "  --help                 Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    phaseSamples: DEFAULT_PHASE_SAMPLES,
    ySubdivisions: DEFAULT_Y_SUBDIVISIONS,
    zeroMeanTolerance: DEFAULT_ZERO_MEAN_TOLERANCE,
    gamma: DEFAULT_GAMMA,
    nuMin: DEFAULT_NU_MIN,
    nuMax: DEFAULT_NU_MAX,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--samples") {
      args.phaseSamples = Number.parseInt(argv[++index], 10);
    } else if (arg === "--subdivisions") {
      args.ySubdivisions = Number.parseInt(argv[++index], 10);
    } else if (arg === "--zero-mean-tol") {
      args.zeroMeanTolerance = Number(argv[++index]);
    } else if (arg === "--gamma") {
      args.gamma = Number(argv[++index]);
    } else if (arg === "--nu-min") {
      args.nuMin = Number(argv[++index]);
    } else if (arg === "--nu-max") {
      args.nuMax = Number(argv[++index]);
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
          schema: "neutral-braid-octahedral-speed-ode-diagnostic-schema/v1",
          artifact_schema: OCTAHEDRAL_SPEED_ODE_DIAGNOSTIC_SCHEMA,
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
    const errors = validateOctahedralSpeedOdeDiagnostic(artifact);
    process.stdout.write(
      printJson(
        {
          valid: errors.length === 0,
          errors,
          schema: artifact.schema,
          phase_sample_count: artifact.numerical_method?.phase_sample_count ?? null,
          result: artifact.result ?? null,
          summary: artifact.speed_ode_solvability?.sampled_summary ?? null,
        },
        args.pretty
      )
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact = buildOctahedralSpeedOdeDiagnostic({
    phaseSamples: args.phaseSamples,
    ySubdivisions: args.ySubdivisions,
    zeroMeanTolerance: args.zeroMeanTolerance,
    gamma: args.gamma,
    nuMin: args.nuMin,
    nuMax: args.nuMax,
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

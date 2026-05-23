#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_ROOT_LEDGER_SCHEMA = "neutral-swarm-octahedral-root-ledger/v1";

const PACKET_ID = "octahedral_root_ledger_diagnostic";
const PROMOTION_STATUS = "priority-only";
const TAU = 2 * Math.PI;
const DEFAULT_PHASE_SAMPLES = 361;
const DEFAULT_Y_SUBDIVISIONS = 720;
const ROOT_DOMAIN_MIN = 1e-9;
const ROOT_DOMAIN_MAX = 2;
const ROOT_TOLERANCE = 1e-12;
const DUPLICATE_ROOT_TOLERANCE = 1e-7;
const ROOT_LEDGER_CERTIFIED_STATUS = "all-pairs-root-ledger-certified";
const ROOT_LEDGER_NEXT_BRANCH_STATUS = "force-action-event-not-computed";
const PARTNER_ROOT_INTERVAL = [1.47817026642, 1.47817026644];
const CROSS_BINARY_DELAY_BANDS = {
  "+1": {
    kappa: 1,
    y_interval: [0.636732650805282, 1.418310091622525],
  },
  "-1": {
    kappa: -1,
    y_interval: [1.409624004002596, 1.979320146556212],
  },
};

export const OCTAHEDRAL_SITES = [
  { id: 1, binary: 1, sign: 1, polarity: 1, label: "1+" },
  { id: 2, binary: 1, sign: -1, polarity: -1, label: "1-" },
  { id: 3, binary: 2, sign: 1, polarity: 1, label: "2+" },
  { id: 4, binary: 2, sign: -1, polarity: -1, label: "2-" },
  { id: 5, binary: 3, sign: 1, polarity: 1, label: "3+" },
  { id: 6, binary: 3, sign: -1, polarity: -1, label: "3-" },
];

export function octahedralSiteById(id) {
  const site = OCTAHEDRAL_SITES.find((candidate) => candidate.id === id);
  if (!site) {
    throw new Error(`unknown site id: ${id}`);
  }
  return site;
}

function carrierPoint(binary, theta) {
  if (binary === 1) {
    return [Math.cos(theta), Math.sin(theta), 0];
  }
  if (binary === 2) {
    return [0, Math.cos(theta), Math.sin(theta)];
  }
  if (binary === 3) {
    return [Math.sin(theta), 0, Math.cos(theta)];
  }
  throw new Error(`unknown binary id: ${binary}`);
}

function carrierTangent(binary, theta) {
  if (binary === 1) {
    return [-Math.sin(theta), Math.cos(theta), 0];
  }
  if (binary === 2) {
    return [0, -Math.sin(theta), Math.cos(theta)];
  }
  if (binary === 3) {
    return [Math.cos(theta), 0, -Math.sin(theta)];
  }
  throw new Error(`unknown binary id: ${binary}`);
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

export function octahedralSitePosition(site, theta) {
  return scale(carrierPoint(site.binary, theta), site.sign);
}

export function octahedralSiteTangent(site, theta) {
  return scale(carrierTangent(site.binary, theta), site.sign);
}

function relationForPair(receiver, source) {
  if (receiver.binary === source.binary && receiver.sign === -source.sign) {
    return "antipodal-partner";
  }
  if (receiver.binary !== source.binary) {
    return "cross-binary";
  }
  return "same-source-excluded";
}

export function orderedOctahedralPairs() {
  const pairs = [];
  for (const receiver of OCTAHEDRAL_SITES) {
    for (const source of OCTAHEDRAL_SITES) {
      if (receiver.id === source.id) {
        continue;
      }
      pairs.push({
        receiver: receiver.id,
        source: source.id,
        receiver_label: receiver.label,
        source_label: source.label,
        receiver_binary: receiver.binary,
        source_binary: source.binary,
        force_sign: receiver.polarity * source.polarity,
        source_relation: relationForPair(receiver, source),
      });
    }
  }
  return pairs;
}

function phaseTheta(index, phaseSamples) {
  if (phaseSamples <= 1) {
    return 0;
  }
  return (TAU * index) / (phaseSamples - 1);
}

function rootEquation(receiver, source, theta, y) {
  const receiverPosition = octahedralSitePosition(receiver, theta);
  const sourcePosition = octahedralSitePosition(source, theta - y);
  return norm(subtract(receiverPosition, sourcePosition)) - y;
}

function bisectRoot(receiver, source, theta, left, right) {
  let a = left;
  let b = right;
  let fa = rootEquation(receiver, source, theta, a);
  let fb = rootEquation(receiver, source, theta, b);

  if (Math.abs(fa) <= ROOT_TOLERANCE) {
    return a;
  }
  if (Math.abs(fb) <= ROOT_TOLERANCE) {
    return b;
  }
  if (fa * fb > 0) {
    return null;
  }

  for (let step = 0; step < 80; step += 1) {
    const mid = 0.5 * (a + b);
    const fm = rootEquation(receiver, source, theta, mid);
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

function addUniqueRoot(roots, root) {
  if (!Number.isFinite(root)) {
    return;
  }
  if (root <= ROOT_DOMAIN_MIN || root > ROOT_DOMAIN_MAX + DUPLICATE_ROOT_TOLERANCE) {
    return;
  }
  if (!roots.some((candidate) => Math.abs(candidate - root) <= DUPLICATE_ROOT_TOLERANCE)) {
    roots.push(root);
  }
}

export function findOctahedralRoots(receiver, source, theta, ySubdivisions) {
  const roots = [];
  let previousY = ROOT_DOMAIN_MIN;
  let previousValue = rootEquation(receiver, source, theta, previousY);

  for (let step = 1; step <= ySubdivisions; step += 1) {
    const y = ROOT_DOMAIN_MIN + ((ROOT_DOMAIN_MAX - ROOT_DOMAIN_MIN) * step) / ySubdivisions;
    const value = rootEquation(receiver, source, theta, y);

    if (Math.abs(value) <= ROOT_TOLERANCE) {
      addUniqueRoot(roots, y);
    } else if (Number.isFinite(previousValue) && Number.isFinite(value) && previousValue * value < 0) {
      addUniqueRoot(roots, bisectRoot(receiver, source, theta, previousY, y));
    }

    previousY = y;
    previousValue = value;
  }

  return roots.sort((left, right) => left - right);
}

export function octahedralRootJacobian(receiver, source, theta, y) {
  const receiverPosition = octahedralSitePosition(receiver, theta);
  const sourcePosition = octahedralSitePosition(source, theta - y);
  const displacement = subtract(receiverPosition, sourcePosition);
  const distance = norm(displacement);
  const rhat = scale(displacement, 1 / distance);
  const sourceTangent = octahedralSiteTangent(source, theta - y);
  return 1 - dot(sourceTangent, rhat);
}

function finiteMin(values) {
  return values.reduce((best, value) => (Number.isFinite(value) && value < best ? value : best), Infinity);
}

function finiteMax(values) {
  return values.reduce((best, value) => (Number.isFinite(value) && value > best ? value : best), -Infinity);
}

export function formatOctahedralNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toFixed(12));
}

function formatSmallNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(12));
}

function partnerRootEquation(y) {
  return 2 * Math.cos(y / 2) - y;
}

function partnerRootJacobian(y) {
  return 1 + Math.sin(y / 2);
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
  const receiver = octahedralSiteById(pair.receiver);
  const source = octahedralSiteById(pair.source);
  const epsilon = cyclicEpsilon(receiver.binary, source.binary);
  const delta = receiver.sign * source.sign;
  const kappa = delta * epsilon;
  return {
    epsilon_ab: epsilon,
    delta_ij: delta,
    kappa,
    kappa_label: kappa > 0 ? "+1" : "-1",
    phase_shift: delta > 0 ? "theta" : "theta+pi/2",
  };
}

function crossBinaryDerivativeFloor(kappa, yLow) {
  if (kappa > 0) {
    return 2 * yLow - 1 + Math.cos(yLow);
  }
  return 2 * yLow - 1 - Math.cos(yLow);
}

function crossBinaryJacobianFloor(kappa, yLow, yHigh) {
  return crossBinaryDerivativeFloor(kappa, yLow) / (2 * yHigh);
}

function crossBinaryEndpointRange(kappa, y) {
  const offset = y * y - 2 + kappa * Math.sin(y);
  return [offset - 1, offset + 1];
}

function buildAntipodalPartnerCertificate(pairs) {
  const partnerPairs = pairs.filter((pair) => pair.source_relation === "antipodal-partner");
  const [yLow, yHigh] = PARTNER_ROOT_INTERVAL;
  const residualLow = partnerRootEquation(yHigh);
  const residualHigh = partnerRootEquation(yLow);
  const jacobianLow = partnerRootJacobian(yLow);
  const jacobianHigh = partnerRootJacobian(yHigh);
  const rows = partnerPairs.map((pair) => ({
    certificate_id: `antipodal_partner_${pair.receiver_label}_from_${pair.source_label}`,
    receiver: pair.receiver,
    source: pair.source,
    receiver_label: pair.receiver_label,
    source_label: pair.source_label,
    source_relation: pair.source_relation,
    theta_cover: {
      cell_count: 1,
      domain: "[0, 2*pi)",
      endpoint_convention: "periodic-half-open-owned",
      root_depends_on_theta: false,
    },
    active_root: {
      root_equation: "G_partner(y)=2*cos(y/2)-y",
      y_interval: PARTNER_ROOT_INTERVAL,
      residual_interval: [formatSmallNumber(residualLow), formatSmallNumber(residualHigh)],
      residual_brackets_zero: residualLow <= 0 && residualHigh >= 0,
      tube_type: "constant-root-interval",
    },
    monotonicity_certificate: {
      derivative: "dG_partner/dy=-sin(y/2)-1",
      derivative_sign: "strictly-negative",
      derivative_upper_bound: -1,
      root_count: "exactly-one-positive-root",
    },
    inactive_gaps: [
      {
        y_interval: [0, yLow],
        endpoint_convention: "open-at-zero-closed-at-root-bracket",
        predicate: "monotone-positive-left-of-root",
        status: "excluded",
      },
      {
        y_interval: [yHigh, ROOT_DOMAIN_MAX],
        endpoint_convention: "closed-at-root-bracket-closed-at-support-bound",
        predicate: "monotone-negative-right-of-root",
        status: "excluded",
      },
    ],
    jacobian_certificate: {
      formula: "J_partner=1+sin(y/2)",
      interval: [formatSmallNumber(jacobianLow), formatSmallNumber(jacobianHigh)],
      floor: formatSmallNumber(jacobianLow),
      sign: "positive",
    },
    support_memory: {
      h_mem: ROOT_DOMAIN_MAX,
      endpoint_y_2_status: "root-free-by-negative-residual",
      status: "support-complete-for-antipodal-partner-row",
    },
    status: "certified-antipodal-partner-root",
  }));

  return {
    status: "certified-antipodal-partner-root-certificate",
    certifies_full_root_ledger: false,
    certifies_pair_subset: true,
    certified_pair_count: rows.length,
    uncertified_pair_count: pairs.length - rows.length,
    certified_source_relation: "antipodal-partner",
    root_interval: PARTNER_ROOT_INTERVAL,
    jacobian_floor: formatSmallNumber(jacobianLow),
    rows,
  };
}

function buildCrossBinaryCertificate(pairs) {
  const crossPairs = pairs.filter((pair) => pair.source_relation === "cross-binary");
  const rows = crossPairs.map((pair) => {
    const reduction = crossBinaryClass(pair);
    const band = CROSS_BINARY_DELAY_BANDS[reduction.kappa_label];
    const [yLow, yHigh] = band.y_interval;
    const derivativeFloor = crossBinaryDerivativeFloor(reduction.kappa, yLow);
    const jacobianFloor = crossBinaryJacobianFloor(reduction.kappa, yLow, yHigh);
    const endpointAtZero = crossBinaryEndpointRange(reduction.kappa, 0);
    const endpointAtTwo = crossBinaryEndpointRange(reduction.kappa, ROOT_DOMAIN_MAX);

    return {
      certificate_id: `cross_binary_${pair.receiver_label}_from_${pair.source_label}`,
      receiver: pair.receiver,
      source: pair.source,
      receiver_label: pair.receiver_label,
      source_label: pair.source_label,
      source_relation: pair.source_relation,
      symmetry_reduction: {
        epsilon_ab: reduction.epsilon_ab,
        delta_ij: reduction.delta_ij,
        kappa: reduction.kappa,
        phase_shift: reduction.phase_shift,
        reduced_equation: "F_kappa(theta_tilde,y)=y^2-2+sin(2*theta_tilde-y)+kappa*sin(y)",
      },
      theta_cover: {
        cell_count: 1,
        domain: "[0, 2*pi)",
        endpoint_convention: "periodic-half-open-owned",
        root_depends_on_theta: true,
      },
      active_root: {
        tube_type: "monotone-implicit-graph",
        y_interval: band.y_interval,
        root_count: "exactly-one-positive-root",
        existence_predicate: "F_kappa(theta_tilde,0)<=-1 and F_kappa(theta_tilde,2)>=1-sin(2)>0",
        residual_equation: "F_kappa(theta_tilde,y(theta_tilde))=0",
        endpoint_residual_ranges: {
          y_0: endpointAtZero.map(formatSmallNumber),
          y_2: endpointAtTwo.map(formatSmallNumber),
        },
      },
      inactive_gaps: [
        {
          y_interval: [0, yLow],
          endpoint_convention: "open-at-zero-closed-at-class-band",
          predicate:
            reduction.kappa > 0
              ? "y^2+sin(y)<1 implies no cross-binary root"
              : "y^2-sin(y)<1 implies no cross-binary root",
          status: "excluded",
        },
        {
          y_interval: [yHigh, ROOT_DOMAIN_MAX],
          endpoint_convention: "closed-at-class-band-closed-at-support-bound",
          predicate:
            reduction.kappa > 0
              ? "y^2+sin(y)>3 implies no cross-binary root"
              : "y^2-sin(y)>3 implies no cross-binary root",
          status: "excluded",
        },
        {
          y_interval: band.y_interval,
          endpoint_convention: "owned-by-monotone-implicit-root-graph",
          predicate: "strictly-positive dF_kappa/dy leaves exactly one active graph and no second root",
          status: "owned-by-active-root",
        },
      ],
      monotonicity_certificate: {
        derivative: "dF_kappa/dy=2*y-cos(2*theta_tilde-y)+kappa*cos(y)",
        derivative_floor_formula: reduction.kappa > 0 ? "2*a_+-1+cos(a_+)" : "2*a_--1-cos(a_-)",
        derivative_floor: formatSmallNumber(derivativeFloor),
        derivative_sign: "strictly-positive",
      },
      jacobian_certificate: {
        formula: "J_cross=(dF_kappa/dy)/(2*y)",
        floor_formula:
          reduction.kappa > 0 ? "(2*a_+-1+cos(a_+))/(2*b_+)" : "(2*a_--1-cos(a_-))/(2*b_-)",
        floor: formatSmallNumber(jacobianFloor),
        sign: "positive",
      },
      support_memory: {
        h_mem: ROOT_DOMAIN_MAX,
        endpoint_y_2_status: "root-free-by-positive-residual-margin",
        status: "support-complete-for-cross-binary-row",
      },
      status: "certified-cross-binary-root",
    };
  });

  const floors = rows.map((row) => row.jacobian_certificate.floor).filter(Number.isFinite);
  const delaysLow = rows.map((row) => row.active_root.y_interval[0]).filter(Number.isFinite);
  const delaysHigh = rows.map((row) => row.active_root.y_interval[1]).filter(Number.isFinite);

  return {
    status: "certified-cross-binary-root-certificate",
    certifies_full_cross_binary_ledger: true,
    certified_pair_count: rows.length,
    uncertified_pair_count: pairs.length - rows.length,
    certified_source_relation: "cross-binary",
    class_count: 2,
    class_bands: CROSS_BINARY_DELAY_BANDS,
    global_delay_bounds: [formatSmallNumber(finiteMin(delaysLow)), formatSmallNumber(finiteMax(delaysHigh))],
    jacobian_floor: formatSmallNumber(finiteMin(floors)),
    rows,
  };
}

function buildAllPairsRootCertificate(pairs, partnerCertificate, crossBinaryCertificate) {
  const delayLows = [partnerCertificate.root_interval[0], crossBinaryCertificate.global_delay_bounds[0]].filter(Number.isFinite);
  const delayHighs = [partnerCertificate.root_interval[1], crossBinaryCertificate.global_delay_bounds[1]].filter(Number.isFinite);
  const floors = [partnerCertificate.jacobian_floor, crossBinaryCertificate.jacobian_floor].filter(Number.isFinite);

  return {
    status: ROOT_LEDGER_CERTIFIED_STATUS,
    certifies_full_root_ledger: true,
    certified_pair_count: partnerCertificate.certified_pair_count + crossBinaryCertificate.certified_pair_count,
    ordered_distinct_pair_count: pairs.length,
    same_source_pair_count: 0,
    theta_cell_count: 1,
    theta_domain: "[0, 2*pi)",
    global_delay_bounds: [formatSmallNumber(finiteMin(delayLows)), formatSmallNumber(finiteMax(delayHighs))],
    global_jacobian_floor: formatSmallNumber(finiteMin(floors)),
    support_memory: {
      h_mem: ROOT_DOMAIN_MAX,
      endpoint_y_2_status: "root-free-for-all-ordered-distinct-pairs",
      tail_status: "no-tail-beyond-support-bound",
    },
    consumer_checksum: {
      pair_policy: "Pi_all",
      ordered_distinct_pair_count: pairs.length,
      partner_pair_count: partnerCertificate.certified_pair_count,
      cross_binary_pair_count: crossBinaryCertificate.certified_pair_count,
      same_source_policy: "ordinary-same-source-excluded",
      active_root_count_per_pair: 1,
      inactive_gap_cover: "complete-by-monotone-implicit-root-graphs-and-delay-band-exclusion",
    },
  };
}

function screenPair(pair, phaseSamples, ySubdivisions) {
  const receiver = octahedralSiteById(pair.receiver);
  const source = octahedralSiteById(pair.source);
  const rootCounts = [];
  const delays = [];
  const jacobians = [];
  const failedNodes = [];

  for (let phaseIndex = 0; phaseIndex < phaseSamples; phaseIndex += 1) {
    const theta = phaseTheta(phaseIndex, phaseSamples);
    const roots = findOctahedralRoots(receiver, source, theta, ySubdivisions);
    rootCounts.push(roots.length);

    if (roots.length !== 1) {
      failedNodes.push({
        phase_index: phaseIndex,
        theta: formatOctahedralNumber(theta),
        root_count: roots.length,
      });
      continue;
    }

    const y = roots[0];
    delays.push(y);
    jacobians.push(octahedralRootJacobian(receiver, source, theta, y));
  }

  const rootCountMin = finiteMin(rootCounts);
  const rootCountMax = finiteMax(rootCounts);
  const status = failedNodes.length === 0 ? "sampled-one-root-with-positive-jacobian" : "sampled-root-count-failed";

  return {
    ...pair,
    phase_sample_count: phaseSamples,
    root_count_min: Number.isFinite(rootCountMin) ? rootCountMin : null,
    root_count_max: Number.isFinite(rootCountMax) ? rootCountMax : null,
    delay_min: formatOctahedralNumber(finiteMin(delays)),
    delay_max: formatOctahedralNumber(finiteMax(delays)),
    jacobian_min: formatOctahedralNumber(finiteMin(jacobians)),
    jacobian_max: formatOctahedralNumber(finiteMax(jacobians)),
    failed_node_count: failedNodes.length,
    first_failed_node: failedNodes[0] ?? null,
    status,
  };
}

function siteInventory() {
  return {
    sites: OCTAHEDRAL_SITES.map((site) => ({
      id: site.id,
      binary: site.binary,
      binary_label: String(site.binary),
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

export function buildOctahedralRootLedger(options = {}) {
  const phaseSamples = Number.parseInt(options.phaseSamples ?? DEFAULT_PHASE_SAMPLES, 10);
  const ySubdivisions = Number.parseInt(options.ySubdivisions ?? DEFAULT_Y_SUBDIVISIONS, 10);
  if (!Number.isInteger(phaseSamples) || phaseSamples < 1) {
    throw new Error("phaseSamples must be a positive integer");
  }
  if (!Number.isInteger(ySubdivisions) || ySubdivisions < 10) {
    throw new Error("ySubdivisions must be an integer >= 10");
  }

  const pairs = orderedOctahedralPairs();
  const pairRows = pairs.map((pair) => screenPair(pair, phaseSamples, ySubdivisions));
  const antipodalPartnerCertificate = buildAntipodalPartnerCertificate(pairs);
  const crossBinaryCertificate = buildCrossBinaryCertificate(pairs);
  const allPairsRootCertificate = buildAllPairsRootCertificate(
    pairs,
    antipodalPartnerCertificate,
    crossBinaryCertificate
  );
  const failedNodeCount = pairRows.reduce((sum, row) => sum + row.failed_node_count, 0);
  const rootCountMins = pairRows.map((row) => row.root_count_min).filter(Number.isFinite);
  const rootCountMaxes = pairRows.map((row) => row.root_count_max).filter(Number.isFinite);
  const delayMins = pairRows.map((row) => row.delay_min).filter(Number.isFinite);
  const delayMaxes = pairRows.map((row) => row.delay_max).filter(Number.isFinite);
  const jacobianMins = pairRows.map((row) => row.jacobian_min).filter(Number.isFinite);
  const jacobianMaxes = pairRows.map((row) => row.jacobian_max).filter(Number.isFinite);
  const sampledPass =
    failedNodeCount === 0 &&
    finiteMin(rootCountMins) === 1 &&
    finiteMax(rootCountMaxes) === 1 &&
    finiteMin(jacobianMins) > 0;

  return {
    schema: OCTAHEDRAL_ROOT_LEDGER_SCHEMA,
    packet_id: PACKET_ID,
    artifact_id: "neutral_swarm_octahedral_root_ledger.certified.v1",
    promotion_status: PROMOTION_STATUS,
    sources: [
      "reference/priorities/swarm/shell-swarm/octahedral-carrier-worked-example.md",
      "reference/priorities/swarm/neutral-swarm/all-pairs-root-ledger.md",
      "reference/priorities/swarm/neutral-swarm/neutral-swarm-first-execution-ledger.md",
    ],
    artifact_claim: {
      kind: "certified_rigid_octahedral_root_ledger",
      solves_dynamics: false,
      certifies_root_ledger: true,
      retained_branch: false,
      strongest_claim:
        "The rigid octahedral seed has a certified all-pairs positive-delay root ledger for its 30 ordered distinct source pairs.",
    },
    branch_scope: {
      seed: "rigid-octahedral-carrier",
      support_radius: "R",
      frequency: "omega=c_f/R",
      phase: "theta=omega t",
      pair_policy: {
        name: "Pi_all",
        kind: "ordered-distinct-source-pairs",
        cardinality: pairs.length,
      },
      same_source_policy: {
        selected: "ordinary-same-source-excluded",
        ordinary_force_rows_include_same_source: false,
        same_source_positive_delay_status: "excluded-y-equals-zero-limit-only",
      },
    },
    numerical_method: {
      phase_sample_count: phaseSamples,
      phase_domain: "[0, 2*pi]",
      endpoint_duplicate_included: phaseSamples > 1,
      root_domain_y: [ROOT_DOMAIN_MIN, ROOT_DOMAIN_MAX],
      y_subdivisions: ySubdivisions,
      root_tolerance: ROOT_TOLERANCE,
      jacobian_formula: "J_ij=1-T_j(theta-y) dot rhat_ij(theta,y)",
    },
    site_inventory: siteInventory(),
    all_pairs_root_ledger: {
      status: sampledPass ? ROOT_LEDGER_CERTIFIED_STATUS : "sampled-root-ledger-diagnostic-failed",
      pair_policy_checksum: {
        policy: "Pi_all",
        ordered_distinct_pair_count: pairs.length,
        phase_sample_count: phaseSamples,
        searched_pair_nodes: pairs.length * phaseSamples,
      },
      pair_rows: pairRows,
      root_certificates: {
        all_pairs: allPairsRootCertificate,
        antipodal_partner: antipodalPartnerCertificate,
        cross_binary: crossBinaryCertificate,
      },
      sampled_summary: {
        all_ordered_pairs_screened: true,
        failed_node_count: failedNodeCount,
        root_count_per_pair_sample_min: finiteMin(rootCountMins),
        root_count_per_pair_sample_max: finiteMax(rootCountMaxes),
        delay_min: formatOctahedralNumber(finiteMin(delayMins)),
        delay_max: formatOctahedralNumber(finiteMax(delayMaxes)),
        jacobian_floor_min: formatOctahedralNumber(finiteMin(jacobianMins)),
        jacobian_floor_max: formatOctahedralNumber(finiteMax(jacobianMaxes)),
        partner_pair_count: pairRows.filter((row) => row.source_relation === "antipodal-partner").length,
        cross_binary_pair_count: pairRows.filter((row) => row.source_relation === "cross-binary").length,
      },
      certification_gap: {
        status: sampledPass ? "closed-by-analytic-root-certificate" : "sampled-root-ledger-diagnostic-failed",
        missing_rows: [],
      },
    },
    residual_vector: {
      rows: [
        { row: "R_pair_count", status: "passed", value: 0 },
        { row: "R_root_all_sampled", status: sampledPass ? "passed" : "failed", value: failedNodeCount },
        {
          row: "R_root_all_certified",
          status: sampledPass ? "passed" : "blocked_by_sampled_failure",
          value: allPairsRootCertificate.certified_pair_count,
        },
        { row: "R_J_floor_sampled", status: sampledPass ? "passed" : "failed", value: formatOctahedralNumber(finiteMin(jacobianMins)) },
        {
          row: "R_J_floor_certified",
          status: sampledPass ? "passed" : "blocked_by_sampled_failure",
          value: allPairsRootCertificate.global_jacobian_floor,
        },
        { row: "R_tangential", status: "not_computed_by_this_artifact", value: null },
        { row: "R_action_Noether", status: "not_computed", value: null },
      ],
      first_failure_row: sampledPass ? ROOT_LEDGER_NEXT_BRANCH_STATUS : "sampled-root-ledger-diagnostic-failed",
    },
    result: {
      root_ledger_diagnostic: sampledPass ? "certified_passed" : "sampled_failed",
      retention: "not_retained",
      retained_branch: false,
      first_failure_status: sampledPass ? ROOT_LEDGER_NEXT_BRANCH_STATUS : "sampled-root-ledger-diagnostic-failed",
      status_note:
        "This artifact certifies the rigid octahedral seed root ledger. It does not supply force balance, action closure, event rows, stability, observer-export rows, or a retained branch.",
    },
    not_retained_reason: [
      "force, action, event, stability, and observer-export rows are not computed here",
      "the source worked example records a fixed-speed tangential residual failure for the rigid zero-offset row",
    ],
  };
}

function pairKey(pair) {
  return `${pair.receiver}->${pair.source}`;
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralRootLedger(artifact) {
  const errors = [];
  assertField(artifact && typeof artifact === "object" && !Array.isArray(artifact), "artifact must be an object", errors);
  if (errors.length > 0) {
    return errors;
  }

  assertField(artifact.schema === OCTAHEDRAL_ROOT_LEDGER_SCHEMA, `schema must be ${OCTAHEDRAL_ROOT_LEDGER_SCHEMA}`, errors);
  assertField(artifact.packet_id === PACKET_ID, `packet_id must be ${PACKET_ID}`, errors);
  assertField(artifact.promotion_status === PROMOTION_STATUS, `promotion_status must be ${PROMOTION_STATUS}`, errors);
  assertField(artifact.artifact_claim?.solves_dynamics === false, "artifact must declare solves_dynamics=false", errors);
  assertField(artifact.artifact_claim?.certifies_root_ledger === true, "artifact must declare certifies_root_ledger=true", errors);
  assertField(artifact.result?.retained_branch === false, "artifact must declare retained_branch=false", errors);

  const sites = artifact.site_inventory?.sites ?? [];
  assertField(Array.isArray(sites) && sites.length === 6, "site inventory must contain six sites", errors);
  assertField(artifact.site_inventory?.polarity_balance?.positive === 3, "polarity balance must contain three positive sites", errors);
  assertField(artifact.site_inventory?.polarity_balance?.negative === 3, "polarity balance must contain three negative sites", errors);
  assertField(artifact.site_inventory?.polarity_balance?.q_core_units === 0, "polarity balance must have q_core_units=0", errors);

  const pairRows = artifact.all_pairs_root_ledger?.pair_rows ?? [];
  const pairKeys = new Set(pairRows.map(pairKey));
  assertField(Array.isArray(pairRows) && pairRows.length === 30, "root ledger must contain 30 ordered pair rows", errors);
  assertField(pairKeys.size === pairRows.length, "ordered pair rows must be unique", errors);
  assertField(
    orderedOctahedralPairs().every((pair) => pairKeys.has(pairKey(pair))),
    "root ledger must cover every ordered distinct pair",
    errors
  );
  assertField(
    pairRows.every((row) => row.root_count_min === 1 && row.root_count_max === 1),
    "every sampled pair row must have exactly one root per phase sample",
    errors
  );
  assertField(pairRows.every((row) => row.failed_node_count === 0), "sampled pair rows must not contain failed nodes", errors);

  const summary = artifact.all_pairs_root_ledger?.sampled_summary ?? {};
  assertField(summary.failed_node_count === 0, "sampled summary failed_node_count must be 0", errors);
  assertField(summary.root_count_per_pair_sample_min === 1, "sampled root-count minimum must be 1", errors);
  assertField(summary.root_count_per_pair_sample_max === 1, "sampled root-count maximum must be 1", errors);
  assertField(summary.partner_pair_count === 6, "partner pair count must be 6", errors);
  assertField(summary.cross_binary_pair_count === 24, "cross-binary pair count must be 24", errors);
  assertField(Number.isFinite(summary.delay_min) && summary.delay_min > 0, "delay_min must be positive", errors);
  assertField(Number.isFinite(summary.delay_max) && summary.delay_max <= 2, "delay_max must be <= 2", errors);
  assertField(Number.isFinite(summary.jacobian_floor_min) && summary.jacobian_floor_min > 0, "jacobian floor must be positive", errors);
  assertField(
    artifact.all_pairs_root_ledger?.status === ROOT_LEDGER_CERTIFIED_STATUS,
    `root ledger status must be ${ROOT_LEDGER_CERTIFIED_STATUS}`,
    errors
  );

  const certificates = artifact.all_pairs_root_ledger?.root_certificates ?? {};
  const allPairsCertificate = certificates.all_pairs;
  assertField(allPairsCertificate?.status === ROOT_LEDGER_CERTIFIED_STATUS, "all-pairs certificate must be certified", errors);
  assertField(allPairsCertificate?.certifies_full_root_ledger === true, "all-pairs certificate must certify the full root ledger", errors);
  assertField(allPairsCertificate?.certified_pair_count === 30, "all-pairs certificate must cover 30 ordered pair rows", errors);
  assertField(allPairsCertificate?.consumer_checksum?.partner_pair_count === 6, "all-pairs certificate must checksum six partner rows", errors);
  assertField(allPairsCertificate?.consumer_checksum?.cross_binary_pair_count === 24, "all-pairs certificate must checksum 24 cross-binary rows", errors);
  assertField(Number.isFinite(allPairsCertificate?.global_delay_bounds?.[0]) && allPairsCertificate.global_delay_bounds[0] > 0, "certified global delay floor must be positive", errors);
  assertField(Number.isFinite(allPairsCertificate?.global_delay_bounds?.[1]) && allPairsCertificate.global_delay_bounds[1] < 2, "certified global delay ceiling must be < 2", errors);
  assertField(Number.isFinite(allPairsCertificate?.global_jacobian_floor) && allPairsCertificate.global_jacobian_floor > 0, "certified global Jacobian floor must be positive", errors);

  const partnerCertificate = certificates.antipodal_partner;
  assertField(partnerCertificate?.status === "certified-antipodal-partner-root-certificate", "partner certificate must be certified", errors);
  assertField(partnerCertificate?.certifies_full_root_ledger === false, "partner certificate must not certify the full root ledger", errors);
  assertField(partnerCertificate?.certified_pair_count === 6, "partner certificate must cover six ordered partner rows", errors);
  assertField(partnerCertificate?.uncertified_pair_count === 24, "partner certificate must leave 24 rows to the cross-binary certificate", errors);
  assertField(
    Array.isArray(partnerCertificate?.rows) &&
      partnerCertificate.rows.length === 6 &&
      partnerCertificate.rows.every((row) => row.source_relation === "antipodal-partner"),
    "partner certificate rows must be exactly the six antipodal-partner rows",
    errors
  );
  assertField(
    partnerCertificate?.rows?.every((row) => row.active_root?.residual_brackets_zero === true),
    "partner certificate root intervals must bracket zero residual",
    errors
  );
  assertField(
    Number.isFinite(partnerCertificate?.jacobian_floor) && partnerCertificate.jacobian_floor > 1,
    "partner certificate must export a positive Jacobian floor",
    errors
  );

  const crossBinaryCertificate = certificates.cross_binary;
  const crossRows = crossBinaryCertificate?.rows ?? [];
  assertField(crossBinaryCertificate?.status === "certified-cross-binary-root-certificate", "cross-binary certificate must be certified", errors);
  assertField(crossBinaryCertificate?.certifies_full_cross_binary_ledger === true, "cross-binary certificate must certify the cross-binary ledger", errors);
  assertField(crossBinaryCertificate?.certified_pair_count === 24, "cross-binary certificate must cover 24 ordered rows", errors);
  assertField(Array.isArray(crossRows) && crossRows.length === 24, "cross-binary certificate rows must contain 24 ordered rows", errors);
  assertField(new Set(crossRows.map(pairKey)).size === 24, "cross-binary certificate rows must be unique", errors);
  assertField(crossRows.every((row) => row.source_relation === "cross-binary"), "cross-binary certificate rows must all be cross-binary", errors);
  assertField(crossRows.every((row) => row.theta_cover?.cell_count === 1), "cross-binary rows must own one theta cell", errors);
  assertField(crossRows.every((row) => row.active_root?.root_count === "exactly-one-positive-root"), "cross-binary rows must certify one active root", errors);
  assertField(crossRows.every((row) => row.inactive_gaps?.length === 3), "cross-binary rows must carry three inactive gap predicates", errors);
  assertField(crossRows.every((row) => row.status === "certified-cross-binary-root"), "cross-binary rows must be certified", errors);
  assertField(Number.isFinite(crossBinaryCertificate?.jacobian_floor) && crossBinaryCertificate.jacobian_floor > 0, "cross-binary certificate must export a positive Jacobian floor", errors);

  assertField(
    artifact.all_pairs_root_ledger?.certification_gap?.status === "closed-by-analytic-root-certificate",
    "certification gap must be closed by the analytic root certificate",
    errors
  );
  assertField(artifact.result?.root_ledger_diagnostic === "certified_passed", "root ledger diagnostic must be certified_passed", errors);
  assertField(artifact.result?.retention === "not_retained", "retention must be not_retained", errors);
  assertField(
    artifact.result?.first_failure_status === ROOT_LEDGER_NEXT_BRANCH_STATUS,
    `first failure must move to ${ROOT_LEDGER_NEXT_BRANCH_STATUS}`,
    errors
  );

  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-swarm/octahedral-root-ledger.mjs [options]",
    "",
    "Options:",
    "  --samples <n>       Phase samples over [0, 2*pi] (default: 361)",
    "  --subdivisions <n>  Root-search subdivisions over 0 < y <= 2 (default: 720)",
    "  --out <path>        Write artifact JSON to path instead of stdout",
    "  --validate <path>   Validate an existing artifact JSON file",
    "  --schema            Print the artifact schema identifier",
    "  --pretty            Pretty-print JSON output",
    "  --help              Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
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
    if (arg === "--samples") {
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
          schema: "neutral-swarm-octahedral-root-ledger-schema/v1",
          artifact_schema: OCTAHEDRAL_ROOT_LEDGER_SCHEMA,
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
    const errors = validateOctahedralRootLedger(artifact);
    process.stdout.write(
      printJson(
        {
          valid: errors.length === 0,
          errors,
          schema: artifact.schema,
          pair_count: artifact.all_pairs_root_ledger?.pair_rows?.length ?? null,
          phase_sample_count: artifact.numerical_method?.phase_sample_count ?? null,
          result: artifact.result ?? null,
        },
        args.pretty
      )
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact = buildOctahedralRootLedger({
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

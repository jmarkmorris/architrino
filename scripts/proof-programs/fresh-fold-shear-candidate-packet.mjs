#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-same-packet-fold-shear-seed-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CONTRACT = `${CERT_DIR}/fresh_same_packet_fold_shear_seed.v0.json`;
const DEFAULT_OLD_MESH = `${CERT_DIR}/mesh.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const T_CYC = 6.28318530718;
const AMPLITUDE = 1.25;
const SEPARATOR_RADIUS = 0.0125;
const SAMPLE_COUNT_PER_INTERVAL = 16;

function parseArgs(argv) {
  const args = {
    contract: DEFAULT_CONTRACT,
    oldMesh: DEFAULT_OLD_MESH,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--contract") {
      args.contract = argv[++i];
    } else if (arg === "--old-mesh") {
      args.oldMesh = argv[++i];
    } else if (arg === "--out-dir") {
      args.outDir = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fresh-fold-shear-candidate-packet.mjs [options]

Options:
  --contract PATH  Same-packet seed contract JSON. Defaults to ${DEFAULT_CONTRACT}.
  --old-mesh PATH  Rejected cosine packet mesh used only for shifted node policy. Defaults to ${DEFAULT_OLD_MESH}.
  --out-dir PATH   Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty         Pretty-print JSON artifacts.
  --help           Show this help.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value, pretty) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`);
}

function writeText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
}

function cleanNumber(value) {
  if (Math.abs(value) < 1e-14) {
    return 0;
  }
  return Number(value.toPrecision(15));
}

function modOne(value) {
  const reduced = value - Math.floor(value);
  if (Math.abs(reduced - 1) < 1e-12 || Math.abs(reduced) < 1e-12) {
    return 0;
  }
  return cleanNumber(reduced);
}

function thetaKey(theta) {
  return Math.round(theta * 1e12);
}

function firstHalfTheta(theta) {
  return theta >= 0.5 ? theta - 0.5 : theta;
}

function mirrorSign(theta) {
  return theta >= 0.5 ? -1 : 1;
}

function arcCoordinate(theta, arc) {
  const localTheta = firstHalfTheta(theta);
  const [left, right] = arc.theta_range;
  if (localTheta < left - 1e-12 || localTheta > right + 1e-12) {
    return null;
  }
  return Math.min(1, Math.max(0, (localTheta - left) / (right - left)));
}

function bumpValue(theta, arc) {
  const s = arcCoordinate(theta, arc);
  if (s === null) {
    return 0;
  }
  return mirrorSign(theta) * Math.sin(Math.PI * s) ** 2;
}

function bumpDerivative(theta, arc) {
  const s = arcCoordinate(theta, arc);
  if (s === null) {
    return 0;
  }
  const [left, right] = arc.theta_range;
  return mirrorSign(theta) * (Math.PI / (right - left)) * Math.sin(2 * Math.PI * s);
}

function bumpSecondDerivative(theta, arc) {
  const s = arcCoordinate(theta, arc);
  if (s === null) {
    return 0;
  }
  const [left, right] = arc.theta_range;
  return mirrorSign(theta) * (2 * Math.PI ** 2 / (right - left) ** 2) * Math.cos(2 * Math.PI * s);
}

function shearValue(theta, contract) {
  const witness = contract.seed_history.witness;
  return contract.seed_history.first_half_arcs.reduce(
    (sum, arc) => sum + (witness[arc.basis] ?? 0) * bumpValue(theta, arc),
    0
  );
}

function shearDerivative(theta, contract) {
  const witness = contract.seed_history.witness;
  return contract.seed_history.first_half_arcs.reduce(
    (sum, arc) => sum + (witness[arc.basis] ?? 0) * bumpDerivative(theta, arc),
    0
  );
}

function shearSecondDerivative(theta, contract) {
  const witness = contract.seed_history.witness;
  return contract.seed_history.first_half_arcs.reduce(
    (sum, arc) => sum + (witness[arc.basis] ?? 0) * bumpSecondDerivative(theta, arc),
    0
  );
}

function sourceTheta(theta, contract) {
  return modOne(theta + contract.seed_history.delta);
}

function baseX(theta) {
  return AMPLITUDE * Math.cos(2 * Math.PI * theta);
}

function baseXPrime(theta) {
  return -2 * Math.PI * AMPLITUDE * Math.sin(2 * Math.PI * theta);
}

function baseXSecond(theta) {
  return -4 * Math.PI ** 2 * AMPLITUDE * Math.cos(2 * Math.PI * theta);
}

function xTheta(theta, contract) {
  const oldTheta = sourceTheta(theta, contract);
  return baseX(oldTheta) + contract.seed_history.epsilon * shearValue(oldTheta, contract);
}

function xPrimeTheta(theta, contract) {
  const oldTheta = sourceTheta(theta, contract);
  return baseXPrime(oldTheta) + contract.seed_history.epsilon * shearDerivative(oldTheta, contract);
}

function xSecondTheta(theta, contract) {
  const oldTheta = sourceTheta(theta, contract);
  return baseXSecond(oldTheta) + contract.seed_history.epsilon * shearSecondDerivative(oldTheta, contract);
}

function sampleAt(theta, contract) {
  const x = xTheta(theta, contract);
  const xdot = xPrimeTheta(theta, contract) / T_CYC;
  const xddot = xSecondTheta(theta, contract) / T_CYC ** 2;
  const t = T_CYC * theta;
  return {
    theta: cleanNumber(theta),
    source_theta: sourceTheta(theta, contract),
    t: cleanNumber(t),
    x: cleanNumber(x),
    xdot: cleanNumber(xdot),
    xddot_diagnostic: cleanNumber(xddot),
    speed: cleanNumber(Math.abs(xdot)),
    u: cleanNumber(t - x),
    w: cleanNumber(t + x),
  };
}

function shiftedNodeId(theta, node) {
  if (node.node_type === "separator" || node.node_type === "origin_layer") {
    return node.node_id;
  }
  return `theta_${String(Math.round(theta * 1000000)).padStart(6, "0")}`;
}

function shiftedNodes(oldMesh, contract) {
  const delta = contract.seed_history.delta;
  const byTheta = new Map();
  byTheta.set(thetaKey(0), {
    node_id: "theta_000000",
    theta: 0,
    source_theta: delta,
    t: 0,
    node_type: "section_endpoint",
    source_node_id: "phase_shift_delta",
  });
  for (const node of oldMesh.nodes) {
    const theta = modOne(node.theta - delta);
    const key = thetaKey(theta);
    if (byTheta.has(key)) {
      continue;
    }
    byTheta.set(key, {
      node_id: shiftedNodeId(theta, node),
      theta,
      source_theta: cleanNumber(node.theta),
      t: cleanNumber(T_CYC * theta),
      node_type: node.node_type === "periodic_endpoint" ? "ordinary" : node.node_type,
      source_node_id: node.node_id,
    });
  }
  const nodes = [...byTheta.values()].sort((a, b) => a.theta - b.theta);
  nodes.push({
    node_id: "theta_1000000",
    theta: 1,
    source_theta: delta,
    t: T_CYC,
    node_type: "periodic_endpoint",
    source_node_id: "phase_shift_delta",
  });
  return nodes.map((node) => ({ ...node, ...sampleAt(node.theta === 1 ? 0 : node.theta, contract), theta: node.theta, t: node.t }));
}

function baseArcMembership(contract) {
  const s = contract.shifted_separator_coordinates;
  return [
    { arc: "I0", theta_range: [0, s.sigma_1], velocity_class: "sub" },
    { arc: "I1", theta_range: [s.sigma_1, s.sigma_2], velocity_class: "super" },
    { arc: "I2", theta_range: [s.sigma_2, s.sigma_3], velocity_class: "sub" },
    { arc: "I3", theta_range: [s.sigma_3, s.sigma_4], velocity_class: "super" },
    { arc: "I4", theta_range: [s.sigma_4, 1], velocity_class: "sub" },
  ].map((arc) => ({
    ...arc,
    theta_range: arc.theta_range.map(cleanNumber),
    t_range: arc.theta_range.map((theta) => cleanNumber(theta * T_CYC)),
  }));
}

function refinedIntervals(contract) {
  const s = contract.shifted_separator_coordinates;
  const raw = [
    { interval_id: "A0", theta_range: [0, s.sigma_1 - SEPARATOR_RADIUS], type: "regular", parent_arc: "I0", velocity_class: "sub", order: 0 },
    { interval_id: "F1", theta_range: [s.sigma_1 - SEPARATOR_RADIUS, s.sigma_1 + SEPARATOR_RADIUS], type: "fold_layer_candidate", parent_arc: "Sigma_1", separator_event: "Sigma_1", fold_ledger: "w", order: 1 },
    { interval_id: "A1", theta_range: [s.sigma_1 + SEPARATOR_RADIUS, s.sigma_2 - SEPARATOR_RADIUS], type: "regular", parent_arc: "I1", velocity_class: "super", order: 2 },
    { interval_id: "F2", theta_range: [s.sigma_2 - SEPARATOR_RADIUS, s.sigma_2 + SEPARATOR_RADIUS], type: "fold_layer_candidate", parent_arc: "Sigma_2", separator_event: "Sigma_2", fold_ledger: "w", order: 3 },
    { interval_id: "A2", theta_range: [s.sigma_2 + SEPARATOR_RADIUS, s.sigma_3 - SEPARATOR_RADIUS], type: "regular", parent_arc: "I2", velocity_class: "sub", order: 4 },
    { interval_id: "F3", theta_range: [s.sigma_3 - SEPARATOR_RADIUS, s.sigma_3 + SEPARATOR_RADIUS], type: "fold_layer_candidate", parent_arc: "Sigma_3", separator_event: "Sigma_3", fold_ledger: "u", order: 5 },
    { interval_id: "A3", theta_range: [s.sigma_3 + SEPARATOR_RADIUS, s.sigma_4 - SEPARATOR_RADIUS], type: "regular", parent_arc: "I3", velocity_class: "super", order: 6 },
    { interval_id: "F4", theta_range: [s.sigma_4 - SEPARATOR_RADIUS, s.sigma_4 + SEPARATOR_RADIUS], type: "fold_layer_candidate", parent_arc: "Sigma_4", separator_event: "Sigma_4", fold_ledger: "u", order: 7 },
    { interval_id: "A4", theta_range: [s.sigma_4 + SEPARATOR_RADIUS, 1], type: "regular", parent_arc: "I4", velocity_class: "sub", order: 8 },
  ];
  return raw.map((entry) => ({
    ...entry,
    theta_range: entry.theta_range.map(cleanNumber),
    t_range: entry.theta_range.map((theta) => cleanNumber(theta * T_CYC)),
  }));
}

function subblocks(arcs) {
  const blocks = [];
  for (const receiver of arcs) {
    for (const source of arcs) {
      blocks.push({
        subblock_id: `B_${receiver.arc}_${source.arc}`,
        receiver_interval: receiver.arc,
        source_interval: source.arc,
        ledgers: ["u", "w"],
        status: "unclassified_preledger_input",
      });
    }
  }
  return blocks;
}

function intervalSamples(interval) {
  const [left, right] = interval.theta_range;
  const samples = [];
  for (let index = 0; index <= SAMPLE_COUNT_PER_INTERVAL; index += 1) {
    samples.push(left + ((right - left) * index) / SAMPLE_COUNT_PER_INTERVAL);
  }
  return samples;
}

function nullCoordinate(theta, lift, ledger, contract) {
  const liftedTheta = theta + lift;
  const t = T_CYC * liftedTheta;
  const x = xTheta(modOne(theta), contract);
  return ledger === "u" ? t - x : t + x;
}

function rangeFor(interval, lift, ledger, contract) {
  const values = intervalSamples(interval).map((theta) => nullCoordinate(theta, lift, ledger, contract));
  return [cleanNumber(Math.min(...values)), cleanNumber(Math.max(...values))];
}

function rangeGap(receiverRange, sourceRange) {
  if (receiverRange[1] < sourceRange[0]) {
    return sourceRange[0] - receiverRange[1];
  }
  if (sourceRange[1] < receiverRange[0]) {
    return receiverRange[0] - sourceRange[1];
  }
  return 0;
}

function preledgerRows(intervals, contract) {
  const rows = [];
  for (const receiver of intervals) {
    for (const source of intervals) {
      for (const ledger of ["u", "w"]) {
        const sourceLift = source.order > receiver.order ? -1 : 0;
        const receiverRange = rangeFor(receiver, 0, ledger, contract);
        const sourceRange = rangeFor(source, sourceLift, ledger, contract);
        const gap = cleanNumber(rangeGap(receiverRange, sourceRange));
        const screenStatus = gap > 0 ? "sampled_range_disjoint" : "sampled_overlap_or_touch_requires_interval_preledger";
        rows.push({
          row_id: `R_${ledger}_${receiver.interval_id}_${source.interval_id}`,
          packet_id: PACKET_ID,
          screen_id: `${PACKET_ID}-preledger-input-screen`,
          receiver_interval: receiver.interval_id,
          source_interval: source.interval_id,
          ledger,
          source_lift_periods: sourceLift,
          receiver_theta_range: receiver.theta_range,
          source_theta_range: source.theta_range,
          receiver_range: receiverRange,
          source_range: sourceRange,
          receiver_range_sampled: receiverRange,
          source_range_sampled: sourceRange,
          status: "not_interval_certified",
          empty_method: gap > 0 ? "sampled_range_screen_only" : null,
          range_gap: gap,
          receiver_monotone_floor: null,
          monotone_floor: null,
          jacobian_floor: null,
          root_count_bound: null,
          root_sign: null,
          memory_depth_range: null,
          separator_event: receiver.separator_event ?? source.separator_event ?? null,
          diagonal_exclusion_ref: null,
          fold_layer_input_ref:
            receiver.type === "fold_layer_candidate" || source.type === "fold_layer_candidate"
              ? `${receiver.interval_id}_${source.interval_id}`
              : null,
          itinerary_required: true,
          sampled_range_gap: gap,
          screen_status: screenStatus,
          certificate_status: "not_interval_certified",
          failure_code: "",
          failure_reasons: [],
        });
      }
    }
  }
  return rows;
}

function buildPhi(contract, nodes) {
  return {
    schema: "breather-phi-cyc-v1",
    packet_id: PACKET_ID,
    source_seed_contract: "fresh_same_packet_fold_shear_seed.v0.json",
    status: "fresh_phi_candidate_not_preledger",
    status_notes: [
      "Finite phase-shifted fold-shear initial history only.",
      "Not an EOM-solved cycle.",
      "Not a null-coordinate pre-ledger, branch chart, returned-sample, topology, or Schauder certificate.",
    ],
    claim_level:
      "phase-shifted finite fold-shear initial-history candidate input for a fresh same-packet fold-collocation and pre-ledger attempt, not an EOM-solved returned sample and not a pre-ledger pass",
    source_claim_level: contract.claim_level,
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    source_artifacts: contract.source_artifacts,
    itinerary_id: contract.packet_identity.K,
    packet_identity: {
      K: contract.packet_identity.K,
      T_cyc: contract.packet_identity.T_cyc,
      S: `section x(0)=${contract.packet_identity.section.x_section}, xdot(0)=${contract.packet_identity.section.xdot_section}`,
      P: contract.packet_identity.parameters,
      B_rep: contract.packet_identity.basis_representation,
      Theta: `mesh.${PACKET_ID}.json:nodes`,
    },
    common_identity: commonIdentity(contract),
    period: {
      T_cyc: T_CYC,
      phase_interval: [0, 1],
      section_anchor: {
        theta: 0,
        x: contract.packet_identity.section.x_section,
        xdot: contract.packet_identity.section.xdot_section,
        inbound_speed: contract.packet_identity.section.inbound_speed,
      },
    },
    symmetry: {
      periodic_identification: "X_delta(theta+1)=X_delta(theta)",
      half_period_antisymmetry: "X_delta(theta+1/2)=-X_delta(theta)",
      separator_events: Object.entries(contract.shifted_separator_coordinates).map(([key, value], index) => ({
        event_id: `Sigma_${index + 1}`,
        theta: value,
        transition: index % 2 === 0 ? "sub_to_super" : "super_to_sub",
        source_key: key,
      })),
      origin_layer_events: [
        { event_id: "C_1", theta: cleanNumber(0.25 - contract.seed_history.delta) },
        { event_id: "C_2", theta: cleanNumber(0.75 - contract.seed_history.delta) },
      ],
    },
    basis: {
      type: "phase_shifted_half_period_antisymmetric_c1_fold_shear_seed",
      formula: contract.seed_history.formula,
      H_formula: contract.seed_history.H_formula,
      coefficients: {
        A: AMPLITUDE,
        T_cyc: T_CYC,
        delta: contract.seed_history.delta,
        epsilon: contract.seed_history.epsilon,
        ...contract.seed_history.witness,
      },
      first_half_arcs: contract.seed_history.first_half_arcs,
      fold_layer_policy:
        "Field-speed separators are marked for fold-layer treatment; no branch-sum residual is evaluated on separator layers.",
    },
    seed_history: {
      formula: contract.seed_history.formula,
      delta: contract.seed_history.delta,
      epsilon: contract.seed_history.epsilon,
      H_formula: contract.seed_history.H_formula,
      witness: contract.seed_history.witness,
      first_half_arcs: contract.seed_history.first_half_arcs,
    },
    shifted_separator_coordinates: {
      Sigma_1: contract.shifted_separator_coordinates.sigma_1,
      Sigma_2: contract.shifted_separator_coordinates.sigma_2,
      Sigma_3: contract.shifted_separator_coordinates.sigma_3,
      Sigma_4: contract.shifted_separator_coordinates.sigma_4,
    },
    arcs: baseArcMembership(contract),
    samples: nodes.map((node) => ({
      node_id: node.node_id,
      node_type: node.node_type,
      theta: node.theta,
      source_theta: node.source_theta,
      t: node.t,
      x: node.x,
      xdot: node.xdot,
      xddot_diagnostic: node.xddot_diagnostic,
      speed: node.speed,
      u: node.u,
      w: node.w,
    })),
    residual_targets: {
      E_j: { status: "not_evaluated" },
      fold_integral_targets: { status: "not_evaluated", fold_rows: ["Sigma_1", "Sigma_2", "Sigma_3", "Sigma_4"] },
      R_j_x: { status: "not_evaluated" },
      R_j_v: { status: "not_evaluated" },
    },
    limitations: contract.limitations,
  };
}

function commonIdentity(contract) {
  return {
    packet_id: PACKET_ID,
    source_seed_contract: "fresh_same_packet_fold_shear_seed.v0.json",
    itinerary_id: contract.packet_identity.K,
    T_cyc: T_CYC,
    parameters: {
      c_f: contract.packet_identity.parameters.c_f,
      eta: contract.packet_identity.parameters.eta,
      epsilon_c: contract.packet_identity.parameters.epsilon_c,
      g: contract.packet_identity.parameters.g,
      epsilon_shear: contract.packet_identity.parameters.epsilon_shear,
      memory_horizon_h: T_CYC,
    },
    section: contract.packet_identity.section,
  };
}

function buildMesh(contract, nodes, arcs, intervals) {
  return {
    schema: "breather-mesh-v1",
    packet_id: PACKET_ID,
    status: "shifted_separator_refined_mesh_input_not_preledger",
    claim_level: "shifted separator-refined mesh for the fresh same-packet fold-shear seed, not a pre-ledger classification",
    preledger_pass: false,
    updates_live_ledger: false,
    source_candidate: `phi_cyc.${PACKET_ID}.json`,
    common_identity: commonIdentity(contract),
    shift_policy: {
      delta: contract.seed_history.delta,
      rule: "theta_shifted=(theta_original-delta) mod 1, with a new section endpoint at theta=0",
    },
    source_mesh: "mesh.json:seed-doubled-four-arc-cosine-template-v0",
    itinerary_ref: {
      itinerary_id: contract.packet_identity.K,
      separator_events: ["Sigma_1", "Sigma_2", "Sigma_3", "Sigma_4"],
      origin_layer_events: ["C_1", "C_2"],
    },
    period_ref: {
      T_cyc: T_CYC,
      section_anchor: `phi_cyc.${PACKET_ID}.json:period.section_anchor`,
    },
    nodes,
    arc_membership: arcs,
    preledger_intervals: intervals,
    refined_intervals_for_preledger_input: intervals,
    subblocks: subblocks(arcs),
    mesh_widths: {
      max_node_spacing_theta: cleanNumber(Math.max(...nodes.slice(1).map((node, index) => node.theta - nodes[index].theta))),
      separator_layer_width_theta: 2 * SEPARATOR_RADIUS,
      separator_radius_theta: SEPARATOR_RADIUS,
      origin_layer_width_theta: 0.0125,
    },
    sample_tolerances: {
      epsilon_x: 0.000001,
      epsilon_v: 0.000001,
      epsilon_EOM: "not_set_until_candidate_is_evaluated_against_dual_mollified_law",
      epsilon_range: 0.000001,
      epsilon_J: 0.000001,
      epsilon_fold: "not_set_until_fold_integral_rows_are_built",
    },
    endpoint_policy: {
      periodic_endpoint_identification: "theta_1000000 is identified with theta_000000 for periodic data but retained as a mesh endpoint.",
      excluded_diagonal_rule: "s=t excluded by H(0)=0",
      fold_layer_boundary_convention: "Separator nodes are not simple-root branch-sum nodes.",
    },
    adaptation_policy: "shifted separator-refined mesh with explicit fold-layer candidates around shifted separators",
  };
}

function buildPreledgerInput(contract, intervals) {
  const rows = preledgerRows(intervals, contract);
  const disjoint = rows.filter((row) => row.screen_status === "sampled_range_disjoint").length;
  return {
    schema: "breather-causal-preledger-input-screen-v1",
    packet_id: PACKET_ID,
    screen_id: `${PACKET_ID}-preledger-input-screen`,
    status: "preledger_input_screen_not_interval_certificate",
    claim_level:
      "same-packet input screen for generating an outward-rounded null-coordinate pre-ledger, not a causal_ledger.json update and not a pre-ledger pass",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    common_identity: commonIdentity(contract),
    packet_identity_refs: {
      candidate_history: `phi_cyc.${PACKET_ID}.json:packet_identity`,
      mesh: `mesh.${PACKET_ID}.json`,
      seed_contract: "fresh_same_packet_fold_shear_seed_contract.md",
    },
    evaluation_policy: {
      null_coordinates: {
        u: "u(t)=c_f t-x(t)",
        w: "w(t)=c_f t+x(t)",
      },
      field_speed_c_f: 1,
      period_T_cyc: T_CYC,
      separator_radius_theta: SEPARATOR_RADIUS,
      source_time_rule:
        "If the source interval is later in phase order than the receiver interval, the source interval is lifted by -T_cyc. Same-interval diagonal contacts require a diagonal-exclusion subledger before acceptance.",
      pass_rule:
        "A generated pre-ledger passes only if every ordered row is accepted as empty, simple_root, or fold_layer, with no split_required rows.",
      screen_rule:
        "Sampled disjoint ranges are input diagnostics only. A row is accepted only after outward-rounded interval certification on the same packet identity.",
    },
    screen_checks: [
      {
        id: "same_packet_identity",
        status: "ready",
        meaning: "Candidate, mesh, and pre-ledger input references carry the same fresh packet id.",
      },
      {
        id: "sampled_range_screen",
        status: "diagnostic_only",
        meaning: "Rows are screened by finite samples but not accepted as interval-certified rows.",
      },
    ],
    row_generation_plan: {
      interval_source: `mesh.${PACKET_ID}.json:preledger_intervals`,
      row_count_rule: "For each ordered receiver/source interval pair and each ledger u,w, create one row with the source-time lift rule.",
      acceptance_rule: "Only a later outward-rounded interval report may set row status to empty, simple_root, or fold_layer.",
    },
    global_margins_required: {
      gamma_empty: ">0",
      nu_simple: ">0",
      gamma_cov: ">0",
      gamma_tau: ">0",
      gamma_h: ">0",
      gamma_sign: ">0",
      gamma_inact: ">0",
      alpha_fold_min: ">0",
      nu_exit_fold_min: ">0",
      I_fold_all_finite: true,
    },
    finite_gap_surplus_import: {
      status: "diagnostic_only_not_interval_preledger",
      min_preserved_finite_gap_surplus: contract.finite_gap_surplus.min_finite_gap_surplus,
    },
    row_schema: {
      required_fields: [
        "row_id",
        "packet_id",
        "screen_id",
        "receiver_interval",
        "source_interval",
        "ledger",
        "source_lift_periods",
        "receiver_theta_range",
        "source_theta_range",
        "receiver_range",
        "source_range",
        "status",
        "empty_method",
        "range_gap",
        "receiver_monotone_floor",
        "monotone_floor",
        "jacobian_floor",
        "root_count_bound",
        "root_sign",
        "memory_depth_range",
        "separator_event",
        "diagonal_exclusion_ref",
        "fold_layer_input_ref",
        "itinerary_required",
        "failure_code",
        "failure_reasons",
      ],
    },
    summary: {
      status: "not_evaluated",
      pass: false,
      rows: rows.length,
      sampled_range_disjoint_rows: disjoint,
      sampled_overlap_or_touch_rows: rows.length - disjoint,
      accepted_rows: 0,
      split_required_rows: 0,
      branch_chart_authorized: false,
    },
    intervals,
    rows,
    limitations: [
      "This screen checks same-packet inputs before pre-ledger generation.",
      "The preserved fold-shear collar gaps are finite calculations, not outward-rounded interval pre-ledger rows.",
      "No pre-ledger row is accepted until the generated interval report classifies it as empty, simple_root, or fold_layer.",
    ],
  };
}

function buildReport(contract, phiPath, meshPath, preledgerPath) {
  return `# Fresh Same-Packet Fold-Shear Candidate Packet Report

## Status

This packet instantiates the phase-shifted fold-shear seed as fresh candidate
data for the collinear-breather proof program. It is not a pre-ledger pass, not
a live ledger update, and not branch-chart authorization.

Artifacts:

- \`${path.basename(phiPath)}\`
- \`${path.basename(meshPath)}\`
- \`${path.basename(preledgerPath)}\`

## Candidate

The same-packet identity is \`${PACKET_ID}\`. The shifted seed is
$$
X_\\delta(\\theta)
=
1.25\\cos(2\\pi(\\theta+\\delta))
+\\varepsilon H(\\theta+\\delta),
\\qquad
\\delta=0.02,
\\qquad
\\varepsilon=\\frac{1}{16}.
$$
The section values are
$$
X_\\delta(0)=${contract.packet_identity.section.x_section},
\\qquad
\\dot x_\\delta(0)=${contract.packet_identity.section.xdot_section}.
$$
Thus the new section is an inbound section with
$$
v_\\ast=${contract.packet_identity.section.inbound_speed}<c_f.
$$

## Pre-Ledger Input Screen

\`${path.basename(preledgerPath)}\` records the shifted regular and fold-layer
intervals plus sampled null-coordinate range screens for the ordered rows. These
screens are only inputs for the next interval pre-ledger. A sampled disjoint row
is not accepted until an outward-rounded interval certificate proves the same
gap on the frozen packet identity.

The branch-chart stop rule remains unchanged: no \`branch_chart.json\` may be
created until a fresh null-coordinate pre-ledger accepts every row as
\`empty\`, \`simple_root\`, or \`fold_layer\` with no unresolved parent
complements.

## Capture Decision

Priority-only. The packet advances the proof program from a seed contract to
fresh same-packet candidate data, while preserving the live-ledger prohibition.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const contract = readJson(path.resolve(args.contract));
  const oldMesh = readJson(path.resolve(args.oldMesh));
  const nodes = shiftedNodes(oldMesh, contract);
  const arcs = baseArcMembership(contract);
  const intervals = refinedIntervals(contract);
  const phi = buildPhi(contract, nodes);
  const mesh = buildMesh(contract, nodes, arcs, intervals);
  const preledgerInput = buildPreledgerInput(contract, intervals);

  const outDir = path.resolve(args.outDir);
  const phiPath = path.join(outDir, `phi_cyc.${PACKET_ID}.json`);
  const meshPath = path.join(outDir, `mesh.${PACKET_ID}.json`);
  const preledgerPath = path.join(outDir, `causal_preledger_input_screen.${PACKET_ID}.json`);
  const reportPath = path.join(outDir, `candidate_cycle_packet_report.${PACKET_ID}.md`);

  writeJson(phiPath, phi, args.pretty);
  writeJson(meshPath, mesh, args.pretty);
  writeJson(preledgerPath, preledgerInput, args.pretty);
  writeText(reportPath, buildReport(contract, phiPath, meshPath, preledgerPath));
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

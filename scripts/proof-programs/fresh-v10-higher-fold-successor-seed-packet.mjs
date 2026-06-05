#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CONTRACT = `${CERT_DIR}/fresh_same_packet_fold_shear_seed.v0.json`;
const DEFAULT_INPUT = `${CERT_DIR}/gap_opening_fresh_v10_strict_gap_input.shifted_separator_fixed_period.v0.json`;
const DEFAULT_RESULT = `${CERT_DIR}/gap_opening_fresh_v10_strict_gap_result.shifted_separator_fixed_period.v0.json`;
const DEFAULT_TARGET = `${CERT_DIR}/fresh_v10_higher_fold_itinerary_rebuild_target.v0.json`;
const DEFAULT_OBSTRUCTION = `${CERT_DIR}/fresh_v10_shifted_separator_finite_integration_obstruction.fixed_period.v0.json`;
const DEFAULT_PHI = `${CERT_DIR}/phi_cyc.fresh-v10-higher-fold-12-root-rebuild-v0.json`;
const DEFAULT_MESH = `${CERT_DIR}/mesh.fresh-v10-higher-fold-12-root-rebuild-v0.json`;
const DEFAULT_SCREEN = `${CERT_DIR}/causal_preledger_input_screen.fresh-v10-higher-fold-12-root-rebuild-v0.json`;
const DEFAULT_REPORT = `${CERT_DIR}/candidate_cycle_packet_report.fresh-v10-higher-fold-12-root-rebuild-v0.md`;

const T0 = 6.28318530718;
const AMPLITUDE = 1.25;
const DEFAULT_SEED_LAMBDA = 0.3;
const DEFAULT_FOLD_HALF_WIDTH = 0.004;
const ROOT_SCAN_STEPS = 50000;
const ROOT_TOLERANCE = 1e-13;
const ROOT_DEDUPE_TOLERANCE = 1e-9;

function parseArgs(argv) {
  const args = {
    contract: DEFAULT_CONTRACT,
    input: DEFAULT_INPUT,
    result: DEFAULT_RESULT,
    target: DEFAULT_TARGET,
    obstruction: DEFAULT_OBSTRUCTION,
    outPhi: DEFAULT_PHI,
    outMesh: DEFAULT_MESH,
    outScreen: DEFAULT_SCREEN,
    outReport: DEFAULT_REPORT,
    seedLambda: DEFAULT_SEED_LAMBDA,
    foldHalfWidth: DEFAULT_FOLD_HALF_WIDTH,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--contract") {
      args.contract = argv[++index];
    } else if (arg === "--input") {
      args.input = argv[++index];
    } else if (arg === "--result") {
      args.result = argv[++index];
    } else if (arg === "--target") {
      args.target = argv[++index];
    } else if (arg === "--obstruction") {
      args.obstruction = argv[++index];
    } else if (arg === "--out-phi") {
      args.outPhi = argv[++index];
    } else if (arg === "--out-mesh") {
      args.outMesh = argv[++index];
    } else if (arg === "--out-screen") {
      args.outScreen = argv[++index];
    } else if (arg === "--out-report") {
      args.outReport = argv[++index];
    } else if (arg === "--seed-lambda") {
      args.seedLambda = Number(argv[++index]);
    } else if (arg === "--fold-half-width") {
      args.foldHalfWidth = Number(argv[++index]);
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (!Number.isFinite(args.seedLambda) || args.seedLambda <= 0) {
    throw new Error("--seed-lambda must be a positive finite number");
  }
  if (!Number.isFinite(args.foldHalfWidth) || args.foldHalfWidth <= 0) {
    throw new Error("--fold-half-width must be a positive finite number");
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-successor-seed-packet.mjs [options]

Options:
  --contract PATH        Fresh seed contract JSON. Defaults to ${DEFAULT_CONTRACT}.
  --input PATH           Shifted-separator strict-gap input JSON. Defaults to ${DEFAULT_INPUT}.
  --result PATH          Shifted-separator strict-gap result JSON. Defaults to ${DEFAULT_RESULT}.
  --target PATH          Higher-fold rebuild target JSON. Defaults to ${DEFAULT_TARGET}.
  --obstruction PATH     Shifted finite-integration obstruction JSON. Defaults to ${DEFAULT_OBSTRUCTION}.
  --out-phi PATH         Output phi_cyc JSON. Defaults to ${DEFAULT_PHI}.
  --out-mesh PATH        Output mesh JSON. Defaults to ${DEFAULT_MESH}.
  --out-screen PATH      Output preledger input screen JSON. Defaults to ${DEFAULT_SCREEN}.
  --out-report PATH      Output Markdown report. Defaults to ${DEFAULT_REPORT}.
  --seed-lambda NUMBER   Direct-path amplitude for seed data. Defaults to ${DEFAULT_SEED_LAMBDA}.
  --fold-half-width NUM  Phase half-width for diagnostic fold layers. Defaults to ${DEFAULT_FOLD_HALF_WIDTH}.
  --pretty               Pretty-print JSON artifacts.
  --help                 Show this help.`);
}

function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return {
    path: filePath,
    sha256: sha256(raw),
    data: JSON.parse(raw),
  };
}

function writeJson(filePath, value, pretty) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`);
}

function writeText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
}

function cleanNumber(value, digits = 15) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`Expected finite number, got ${value}`);
  }
  if (Math.abs(number) < 1e-14) {
    return 0;
  }
  return Number(number.toPrecision(digits));
}

function modOne(value) {
  const reduced = value - Math.floor(value);
  if (Math.abs(reduced) < 1e-12 || Math.abs(reduced - 1) < 1e-12) {
    return 0;
  }
  return reduced;
}

function firstHalfTheta(theta) {
  const reduced = modOne(theta);
  return reduced >= 0.5 ? reduced - 0.5 : reduced;
}

function mirrorSign(theta) {
  return modOne(theta) >= 0.5 ? -1 : 1;
}

function arcCoordinate(theta, arc) {
  const localTheta = firstHalfTheta(theta);
  const [left, right] = arc.theta_range.map(Number);
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
  const [left, right] = arc.theta_range.map(Number);
  return mirrorSign(theta) * (Math.PI / (right - left)) * Math.sin(2 * Math.PI * s);
}

function shearValue(theta, arcs, witness) {
  return arcs.reduce((sum, arc) => sum + (witness[arc.basis] ?? 0) * bumpValue(theta, arc), 0);
}

function shearDerivative(theta, arcs, witness) {
  return arcs.reduce((sum, arc) => sum + (witness[arc.basis] ?? 0) * bumpDerivative(theta, arc), 0);
}

function baseX(theta) {
  return AMPLITUDE * Math.cos(2 * Math.PI * theta);
}

function baseXPrime(theta) {
  return -2 * Math.PI * AMPLITUDE * Math.sin(2 * Math.PI * theta);
}

function seedTheta(theta, contract) {
  return modOne(theta + contract.seed_history.delta);
}

function existingX(theta, contract) {
  const oldTheta = seedTheta(theta, contract);
  return baseX(oldTheta) + contract.seed_history.epsilon * shearValue(oldTheta, contract.seed_history.first_half_arcs, contract.seed_history.witness);
}

function existingXPrime(theta, contract) {
  const oldTheta = seedTheta(theta, contract);
  return baseXPrime(oldTheta) + contract.seed_history.epsilon * shearDerivative(oldTheta, contract.seed_history.first_half_arcs, contract.seed_history.witness);
}

function repairX(theta, input, result) {
  return shearValue(theta, input.basis_definition.first_half_arcs, result.witness);
}

function repairXPrime(theta, input, result) {
  return shearDerivative(theta, input.basis_definition.first_half_arcs, result.witness);
}

function xAt(theta, lambda, contract, input, result) {
  return existingX(theta, contract) + lambda * repairX(theta, input, result);
}

function xPrimeAt(theta, lambda, contract, input, result) {
  return existingXPrime(theta, contract) + lambda * repairXPrime(theta, input, result);
}

function xdotAt(theta, lambda, contract, input, result) {
  return xPrimeAt(theta, lambda, contract, input, result) / T0;
}

function rootFunction(theta, lambda, target, contract, input, result) {
  return xdotAt(theta, lambda, contract, input, result) - target;
}

function addRoot(roots, theta) {
  const root = modOne(theta);
  const exists = roots.some((existing) => {
    const gap = Math.abs(existing - root);
    return gap <= ROOT_DEDUPE_TOLERANCE || Math.abs(gap - 1) <= ROOT_DEDUPE_TOLERANCE;
  });
  if (!exists) {
    roots.push(root);
  }
}

function bisectRoot(left, right, lambda, target, contract, input, result) {
  let lo = left;
  let hi = right;
  let flo = rootFunction(lo, lambda, target, contract, input, result);
  for (let step = 0; step < 80; step += 1) {
    const mid = (lo + hi) / 2;
    const fmid = rootFunction(mid, lambda, target, contract, input, result);
    if (Math.abs(fmid) <= ROOT_TOLERANCE || Math.abs(hi - lo) <= ROOT_TOLERANCE) {
      return mid;
    }
    if (Math.sign(flo) === Math.sign(fmid)) {
      lo = mid;
      flo = fmid;
    } else {
      hi = mid;
    }
  }
  return (lo + hi) / 2;
}

function rootsForTarget(lambda, target, contract, input, result) {
  const roots = [];
  let left = 0;
  let leftValue = rootFunction(left, lambda, target, contract, input, result);
  if (Math.abs(leftValue) <= ROOT_TOLERANCE) {
    addRoot(roots, left);
  }
  for (let index = 1; index <= ROOT_SCAN_STEPS; index += 1) {
    const right = index / ROOT_SCAN_STEPS;
    const rightValue = rootFunction(right, lambda, target, contract, input, result);
    if (Math.abs(rightValue) <= ROOT_TOLERANCE) {
      addRoot(roots, right);
    } else if (Math.sign(leftValue) !== Math.sign(rightValue)) {
      addRoot(roots, bisectRoot(left, right, lambda, target, contract, input, result));
    }
    left = right;
    leftValue = rightValue;
  }
  return roots;
}

function computedStateAtLambda(lambda, contract, input, result) {
  const positive = rootsForTarget(lambda, 1, contract, input, result).sort((a, b) => a - b);
  const negative = rootsForTarget(lambda, -1, contract, input, result).sort((a, b) => a - b);
  const all = [];
  for (const root of [...positive, ...negative]) {
    addRoot(all, root);
  }
  all.sort((a, b) => a - b);
  let maxAbsXdot = 0;
  for (let index = 0; index <= ROOT_SCAN_STEPS; index += 1) {
    maxAbsXdot = Math.max(
      maxAbsXdot,
      Math.abs(xdotAt(index / ROOT_SCAN_STEPS, lambda, contract, input, result)),
    );
  }
  return {
    lambda: cleanNumber(lambda),
    root_count: all.length,
    root_thetas: all.map((value) => cleanNumber(value)),
    positive_velocity_roots: positive.map((value) => cleanNumber(value)),
    negative_velocity_roots: negative.map((value) => cleanNumber(value)),
    max_abs_xdot_sampled: cleanNumber(maxAbsXdot),
    source: "computed_direct_path_root_scan",
    scan_steps: ROOT_SCAN_STEPS,
  };
}

function stateAtLambda(obstruction, lambda) {
  const states = obstruction.field_speed_itinerary_audit?.states || [];
  const state = states.find((entry) => Math.abs(Number(entry.lambda) - lambda) <= 1e-12);
  return state ? { ...state, source: "shifted_obstruction_state" } : null;
}

function classifyRoot(theta, state) {
  const positive = (state.positive_velocity_roots || []).some((root) => Math.abs(root - theta) <= 1e-10);
  const negative = (state.negative_velocity_roots || []).some((root) => Math.abs(root - theta) <= 1e-10);
  return positive ? "positive_field_speed" : negative ? "negative_field_speed" : "unclassified";
}

function samplePoint(theta, lambda, contract, input, result, nodeId, nodeType) {
  const t = T0 * theta;
  const x = xAt(theta, lambda, contract, input, result);
  const xdot = xdotAt(theta, lambda, contract, input, result);
  return {
    node_id: nodeId,
    theta: cleanNumber(theta),
    t: cleanNumber(t),
    node_type: nodeType,
    x: cleanNumber(x),
    xdot: cleanNumber(xdot),
    speed: cleanNumber(Math.abs(xdot)),
    u: cleanNumber(t - x),
    w: cleanNumber(t + x),
  };
}

function thetaRangeSamples(range, count = 12) {
  const [left, right] = range;
  const samples = [];
  for (let index = 0; index <= count; index += 1) {
    samples.push(left + (right - left) * index / count);
  }
  return samples;
}

function ledgerValue(theta, ledger, liftPeriods, lambda, contract, input, result) {
  const t = T0 * theta + liftPeriods * T0;
  const x = xAt(theta, lambda, contract, input, result);
  return ledger === "u" ? t - x : t + x;
}

function rangeForInterval(interval, ledger, liftPeriods, lambda, contract, input, result) {
  let lo = Infinity;
  let hi = -Infinity;
  for (const theta of thetaRangeSamples(interval.theta_range)) {
    const value = ledgerValue(theta, ledger, liftPeriods, lambda, contract, input, result);
    lo = Math.min(lo, value);
    hi = Math.max(hi, value);
  }
  return [cleanNumber(lo), cleanNumber(hi)];
}

function rangeGap(a, b) {
  if (a[1] < b[0]) {
    return b[0] - a[1];
  }
  if (b[1] < a[0]) {
    return a[0] - b[1];
  }
  return 0;
}

function sourceLift(receiver, source) {
  return source.order > receiver.order ? -1 : 0;
}

function intervalVelocityClass(interval, lambda, contract, input, result) {
  const [left, right] = interval.theta_range;
  const midpoint = (left + right) / 2;
  const speed = Math.abs(xdotAt(midpoint, lambda, contract, input, result));
  return speed < 1 ? "sub" : speed > 1 ? "super" : "separator";
}

function buildIntervals(rootThetas, foldHalfWidth, lambda, contract, input, result) {
  const intervals = [];
  let previousRight = 0;
  let regularIndex = 0;
  for (let index = 0; index < rootThetas.length; index += 1) {
    const root = rootThetas[index];
    const left = root - foldHalfWidth;
    const right = root + foldHalfWidth;
    if (left <= previousRight + 1e-12) {
      throw new Error("Fold half-width overlaps adjacent root layers.");
    }
    const regular = {
      interval_id: `A${String(regularIndex).padStart(2, "0")}`,
      theta_range: [cleanNumber(previousRight), cleanNumber(left)],
      type: "regular",
      order: intervals.length,
    };
    regular.velocity_class = intervalVelocityClass(regular, lambda, contract, input, result);
    regular.t_range = regular.theta_range.map((theta) => cleanNumber(theta * T0));
    intervals.push(regular);
    const fold = {
      interval_id: `F${String(index + 1).padStart(2, "0")}`,
      theta_range: [cleanNumber(left), cleanNumber(right)],
      type: "fold_layer_candidate",
      separator_event: `Sigma_hf_${String(index + 1).padStart(2, "0")}`,
      order: intervals.length,
      velocity_class: "separator_layer",
      t_range: [cleanNumber(left * T0), cleanNumber(right * T0)],
    };
    intervals.push(fold);
    previousRight = right;
    regularIndex += 1;
  }
  const finalRegular = {
    interval_id: `A${String(regularIndex).padStart(2, "0")}`,
    theta_range: [cleanNumber(previousRight), 1],
    type: "regular",
    order: intervals.length,
  };
  finalRegular.velocity_class = intervalVelocityClass(finalRegular, lambda, contract, input, result);
  finalRegular.t_range = finalRegular.theta_range.map((theta) => cleanNumber(theta * T0));
  intervals.push(finalRegular);
  return intervals;
}

function buildRows(packetId, screenId, intervals, lambda, contract, input, result) {
  const rows = [];
  for (const receiver of intervals) {
    for (const source of intervals) {
      for (const ledger of ["u", "w"]) {
        const lift = sourceLift(receiver, source);
        const receiverRange = rangeForInterval(receiver, ledger, 0, lambda, contract, input, result);
        const sourceRange = rangeForInterval(source, ledger, lift, lambda, contract, input, result);
        const gap = cleanNumber(rangeGap(receiverRange, sourceRange));
        rows.push({
          row_id: `R_${ledger}_${receiver.interval_id}_${source.interval_id}`,
          packet_id: packetId,
          screen_id: screenId,
          receiver_interval: receiver.interval_id,
          source_interval: source.interval_id,
          ledger,
          source_lift_periods: lift,
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
          separator_event:
            receiver.type === "fold_layer_candidate"
              ? receiver.separator_event
              : source.type === "fold_layer_candidate"
                ? source.separator_event
                : null,
          fold_layer_input_ref:
            receiver.type === "fold_layer_candidate" || source.type === "fold_layer_candidate"
              ? `${receiver.interval_id}_${source.interval_id}`
              : null,
          itinerary_required: true,
          sampled_range_gap: gap,
          screen_status: gap > 0 ? "sampled_range_disjoint" : "sampled_overlap_or_touch_requires_interval_preledger",
          certificate_status: "not_interval_certified",
          failure_code: "",
          failure_reasons: [],
        });
      }
    }
  }
  return rows;
}

function buildArtifacts(files, args) {
  const contract = files.contract.data;
  const input = files.input.data;
  const result = files.result.data;
  const target = files.target.data;
  const obstruction = files.obstruction.data;
  const packetId = target.selected_rebuild_target.proposed_successor_packet_id;
  const itineraryId = target.selected_rebuild_target.proposed_itinerary_id;
  const state =
    stateAtLambda(obstruction, args.seedLambda) ??
    computedStateAtLambda(args.seedLambda, contract, input, result);
  if (state.root_count !== target.selected_rebuild_target.target_root_count) {
    throw new Error(`Expected ${target.selected_rebuild_target.target_root_count} roots at seed lambda, got ${state.root_count}`);
  }
  const rootThetas = state.root_thetas.map(Number).sort((a, b) => a - b);
  const contacts = rootThetas.map((theta, index) => ({
    id: `Sigma_hf_${String(index + 1).padStart(2, "0")}`,
    theta: cleanNumber(theta),
    t: cleanNumber(theta * T0),
    velocity_contact: classifyRoot(theta, state),
    x: cleanNumber(xAt(theta, args.seedLambda, contract, input, result)),
    xdot: cleanNumber(xdotAt(theta, args.seedLambda, contract, input, result)),
  }));
  const intervals = buildIntervals(rootThetas, args.foldHalfWidth, args.seedLambda, contract, input, result);
  const nodes = [
    samplePoint(0, args.seedLambda, contract, input, result, "theta_000000", "section_endpoint"),
  ];
  contacts.forEach((contact) => {
    nodes.push(samplePoint(contact.theta, args.seedLambda, contract, input, result, contact.id, "field_speed_separator"));
  });
  intervals
    .filter((interval) => interval.type === "regular")
    .forEach((interval) => {
      const [left, right] = interval.theta_range;
      nodes.push(
        samplePoint(
          (left + right) / 2,
          args.seedLambda,
          contract,
          input,
          result,
          `mid_${interval.interval_id}`,
          "regular_midpoint",
        ),
      );
    });
  nodes.sort((a, b) => a.theta - b.theta);

  const commonIdentity = {
    K: itineraryId,
    T_cyc: T0,
    S: `section x(0)=${nodes[0].x}, xdot(0)=${nodes[0].xdot}`,
    P: {
      c_f: 1,
      eta: contract.packet_identity.parameters.eta,
      epsilon_c: contract.packet_identity.parameters.epsilon_c,
      g: contract.packet_identity.parameters.g,
      seed_lambda: cleanNumber(args.seedLambda),
      memory_horizon_h: T0,
    },
    B_rep: "shifted-separator fixed-period direct-path higher-fold seed",
    Theta: `mesh.${packetId}.json:nodes`,
  };
  const sourceArtifacts = Object.fromEntries(
    Object.entries(files).map(([key, file]) => [key, { path: file.path, sha256: file.sha256 }]),
  );
  const phi = {
    schema: "breather-phi-cyc-v1",
    packet_id: packetId,
    source_seed_contract: contract.packet_id,
    status: "higher_fold_direct_path_seed_not_preledger",
    claim_level:
      "diagnostic higher-fold 12-root candidate-history seed from the shifted direct path; not EOM-solved, not interval-certified, and not a preledger pass",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    source_artifacts: sourceArtifacts,
    itinerary_id: itineraryId,
    packet_identity: commonIdentity,
    common_identity: commonIdentity,
    period: { T_cyc: T0 },
    symmetry: {
      half_period_antisymmetric: true,
      source: "inherited from fresh shifted seed plus shifted-separator repair basis",
    },
    direct_path_seed: {
      lambda: cleanNumber(args.seedLambda),
      formula: "X_seed(theta)=X_fresh(theta)+lambda*H_shifted(theta), T_seed=T0",
      strict_gap_threshold_lambda: target.source_facts.shifted_separator_fixed_period.threshold_lambda,
      root_count_at_seed_lambda: state.root_count,
      root_state_source: state.source,
      root_scan_steps: state.scan_steps ?? null,
    },
    higher_fold_itinerary: {
      root_count: state.root_count,
      contacts,
      intervals: intervals.map((interval) => ({
        interval_id: interval.interval_id,
        theta_range: interval.theta_range,
        type: interval.type,
        velocity_class: interval.velocity_class,
        separator_event: interval.separator_event ?? null,
      })),
    },
    samples: nodes,
    limitations: [
      "Uses the shifted direct path as a diagnostic seed; it is not a nonlinear solve.",
      "Root count is sampled/deterministic from the source obstruction, not an outward-rounded interval certificate.",
      "No old same-itinerary preledger row is reused as accepted data.",
      "No live causal ledger, branch chart, returned-sample certificate, or theorem promotion is authorized.",
    ],
  };
  const mesh = {
    schema: "breather-mesh-v1",
    packet_id: packetId,
    status: "higher_fold_separator_refined_mesh_input_not_preledger",
    claim_level: "diagnostic higher-fold 12-root separator-refined mesh, not a preledger classification",
    preledger_pass: false,
    updates_live_ledger: false,
    source_candidate: path.basename(args.outPhi),
    common_identity: commonIdentity,
    itinerary_ref: {
      itinerary_id: itineraryId,
      source_target: path.basename(args.target),
      root_count: state.root_count,
    },
    period_ref: { T_cyc: T0 },
    nodes,
    preledger_intervals: intervals,
    subblocks: intervals.map((interval) => ({
      id: interval.interval_id,
      theta_range: interval.theta_range,
      type: interval.type,
      velocity_class: interval.velocity_class,
      separator_event: interval.separator_event ?? null,
    })),
    mesh_widths: {
      fold_half_width: cleanNumber(args.foldHalfWidth),
      min_regular_width: cleanNumber(
        Math.min(...intervals.filter((interval) => interval.type === "regular").map((interval) => interval.theta_range[1] - interval.theta_range[0])),
      ),
    },
    endpoint_policy:
      "Field-speed separator layers are diagnostic separator collars around sampled roots; fresh_v10_higher_fold_root_tube_interval_certificate.v0 supplies the root-count topology certificate, while preledger acceptance still requires row classification.",
    adaptation_policy:
      "Use the 12 sampled field-speed contacts as separator-refined mesh anchors for the higher-fold successor packet.",
  };
  const screenId = `${packetId}-preledger-input-screen`;
  const rows = buildRows(packetId, screenId, intervals, args.seedLambda, contract, input, result);
  const disjointRows = rows.filter((row) => row.screen_status === "sampled_range_disjoint").length;
  const screen = {
    schema: "breather-causal-preledger-input-screen-v1",
    packet_id: packetId,
    screen_id: screenId,
    status: "higher_fold_preledger_input_screen_not_interval_certificate",
    claim_level:
      "sampled input screen for a future higher-fold proof-interval preledger; not a causal_ledger.json update and not a preledger pass",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    common_identity: commonIdentity,
    packet_identity_refs: {
      phi_cyc: path.basename(args.outPhi),
      mesh: path.basename(args.outMesh),
      target: path.basename(args.target),
    },
    evaluation_policy: {
      row_acceptance: "No row is accepted here. A later outward-rounded proof-interval backend must classify every row.",
      old_row_reuse: "Old same-itinerary rows are historical unless recomputed or proven persistent for this packet identity.",
    },
    row_generation_plan: {
      interval_source: `${path.basename(args.outMesh)}:preledger_intervals`,
      row_count_rule: "For each ordered receiver/source interval pair and each ledger u,w, create one sampled screen row with the source-time lift rule.",
      acceptance_rule: "Only a later outward-rounded interval report may set row status to empty, simple_root, or fold_layer.",
    },
    summary: {
      status: "not_evaluated",
      pass: false,
      rows: rows.length,
      sampled_range_disjoint_rows: disjointRows,
      sampled_overlap_or_touch_rows: rows.length - disjointRows,
      accepted_rows: 0,
      split_required_rows: 0,
      branch_chart_authorized: false,
    },
    intervals,
    rows,
    limitations: [
      "Sampled range screens are routing data only.",
      "The 12-root itinerary has an outward-rational root-count certificate; generated rows still need proof-interval classification before consumption.",
      "Rows accepted by a proof-interval sidecar may be consumed only inside that sidecar's fail-closed ledger, not by this sampled input screen.",
    ],
  };
  return { phi, mesh, screen };
}

function reportTable(rows, columns) {
  return [
    `| ${columns.map((column) => column.label).join(" | ")} |`,
    `| ${columns.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${columns.map((column) => String(column.value(row) ?? "")).join(" | ")} |`),
  ].join("\n");
}

function buildReport(artifacts, args) {
  const contacts = artifacts.phi.higher_fold_itinerary.contacts;
  const screen = artifacts.screen;
  return `# Fresh v10 Higher-Fold Successor Seed Packet

## Scope

This packet materializes the first diagnostic successor seed for
\`fresh-v10-higher-fold-12-root-rebuild-v0\`.

It uses the shifted-separator direct path at
\`lambda=${cleanNumber(args.seedLambda)}\`, which is above the strict-gap
threshold and still has 12 sampled field-speed roots. The root-count topology
must be certified separately by a matching root-tube interval certificate for
this seed. This seed packet
does not claim an EOM-solved returned sample, a proof-interval preledger pass, a
live ledger update, or branch-chart authorization.
The root-state source for this run is
\`${artifacts.phi.direct_path_seed.root_state_source}\`.

Artifacts:

- \`${path.basename(args.outPhi)}\`
- \`${path.basename(args.outMesh)}\`
- \`${path.basename(args.outScreen)}\`
- \`${path.basename(args.outReport)}\`
- \`../../../../../scripts/proof-programs/fresh-v10-higher-fold-successor-seed-packet.mjs\`

## Seed Identity

\`\`\`json
${JSON.stringify(artifacts.phi.packet_identity, null, 2)}
\`\`\`

## Field-Speed Contacts

${reportTable(contacts, [
    { label: "contact", value: (row) => `\`${row.id}\`` },
    { label: "theta", value: (row) => `\`${row.theta}\`` },
    { label: "xdot", value: (row) => `\`${row.xdot}\`` },
    { label: "type", value: (row) => row.velocity_contact },
  ])}

## Preledger Input Screen

The generated screen has \`${screen.summary.rows}\` sampled rows:
\`${screen.summary.sampled_range_disjoint_rows}\` are sampled-disjoint and
\`${screen.summary.sampled_overlap_or_touch_rows}\` overlap or touch. These are
not accepted rows. They are only the input surface for exact-rational
proof-interval sidecars.

The first higher-fold proof-interval sidecar,
\`causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v1.md\`,
certifies 270 coarse range-empty rows from this surface and leaves 980 rows
\`split_required\`.

The second sidecar,
\`causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v2.md\`,
adds row-specific trigonometric range enclosures, certifies 1,062 rows total,
and leaves 188 rows \`split_required\`.

The third sidecar,
\`causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v3.md\`,
uses the root-count complement certificate to certify those 1,062 range-empty
rows plus 26 same-interval diagonal exclusions, and leaves 162 rows
\`split_required\`.

The fourth sidecar,
\`causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v4.md\`,
records 42 proof-grade simple-root receiver subwindow certificates but consumes
0 parent simple-root rows. The 162 base rows remain \`split_required\`: 42
parent complement-coverage rows, 8 periodic endpoint/complement rows, and 112
fold-layer rows.

The fifth sidecar,
\`causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v5.md\`,
audits the 42 regular residual parent-complement rows by a 32-cell receiver
grid. It certifies 571 simple-root receiver cells, misses 773 cells, consumes 0
parent rows, and leaves the same 162 base rows \`split_required\`.

The sixth sidecar,
\`causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md\`,
adaptively refines the failed v5 receiver cells to terminal grid 128. It
certifies 622 simple-root receiver leaves, records 3,024 structural terminal
source-cover misses, resolves 0 coarse cells, consumes 0 parent rows, and
leaves the same 162 base rows \`split_required\`.

The one-leaf post-probe stack,
\`one_leaf_boundary_movement_probe_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md\`,
\`one_leaf_source_boundary_movement_theorem_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md\`,
\`one_leaf_receiver_range_contraction_theorem_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md\`,
and
\`one_leaf_candidate_change_boundary_data_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md\`,
declares the exact source-boundary, receiver-range, and combined
candidate-change boundary-opening targets for the three smallest regular rows.
It certifies 0 source-boundary movement rows, 0 receiver-range contraction rows,
0 same-packet candidate-change rows, consumes 0 rows, and does not authorize a
branch chart.

The direct-path lambda shift screen,
\`one_leaf_direct_path_lambda_shift_screen_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md\`,
tests the first concrete sampled route to those shifts. Raising the existing
direct-path parameter from \`lambda=0.3\` to \`lambda=0.305\` opens 3 / 3 one-leaf
boundary targets at sampled active endpoints; the largest active-endpoint
threshold is \`lambda>0.301815056706425\`, leaving trial margin
\`0.00318494329357499\`. The \`lambda=0.305\` replay audit recertifies the trial
seed's 12-root topology and reruns v1-v6, but it still leaves 162 rows
\`split_required\`, 0 complete receiver-cover parent rows, 0 accepted fold-layer
rows, and no branch-chart authorization. Direct-path lambda motion remains
fail-closed for row consumption.

The fold-layer burden atlas,
\`fold_layer_burden_report.fresh-v10-higher-fold-12-root-rebuild-v0.md\`,
groups the 112 fold-layer rows by 12 higher-fold separator layers. It records
the required same-packet fold-layer fields, consumes 0 rows, and does not
authorize a branch chart.

## Required Next Certificate Step

Before any branch-chart work, this successor packet needs:

- regenerated null-coordinate collars and fold-layer rows under this packet
  identity;
- a new source-cover/parent-complement theorem or candidate change with
  proof-grade positive boundary-opening data for the 42 regular residual rows;
- periodic endpoint/complement ownership for 8 rows;
- fold-layer proof-interval closure, using the burden atlas as the worklist,
  that classifies the 112 fold-layer rows as bounded \`fold_layer\`.

## Capture Decision

Priority-only. This materializes the higher-fold route as a concrete successor
seed packet, but it remains diagnostic until the proof-interval preledger
passes.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const files = {
    contract: readJson(args.contract),
    input: readJson(args.input),
    result: readJson(args.result),
    target: readJson(args.target),
    obstruction: readJson(args.obstruction),
  };
  const artifacts = buildArtifacts(files, args);
  writeJson(args.outPhi, artifacts.phi, args.pretty);
  writeJson(args.outMesh, artifacts.mesh, args.pretty);
  writeJson(args.outScreen, artifacts.screen, args.pretty);
  writeText(args.outReport, buildReport(artifacts, args));
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

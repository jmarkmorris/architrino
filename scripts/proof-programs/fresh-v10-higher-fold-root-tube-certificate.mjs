#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CONTRACT = `${CERT_DIR}/fresh_same_packet_fold_shear_seed.v0.json`;
const DEFAULT_INPUT = `${CERT_DIR}/gap_opening_fresh_v10_strict_gap_input.shifted_separator_fixed_period.v0.json`;
const DEFAULT_RESULT = `${CERT_DIR}/gap_opening_fresh_v10_strict_gap_result.shifted_separator_fixed_period.v0.json`;
const DEFAULT_TARGET = `${CERT_DIR}/fresh_v10_higher_fold_itinerary_rebuild_target.v0.json`;
const DEFAULT_PHI = `${CERT_DIR}/phi_cyc.fresh-v10-higher-fold-12-root-rebuild-v0.json`;
const DEFAULT_MESH = `${CERT_DIR}/mesh.fresh-v10-higher-fold-12-root-rebuild-v0.json`;
const DEFAULT_OUT_JSON = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_certificate.v0.json`;
const DEFAULT_OUT_REPORT = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_certificate.v0.md`;

const T0 = 6.28318530718;
const AMPLITUDE = 1.25;
const DEFAULT_TUBE_HALF_WIDTH = 0.002;
const DEFAULT_COMPLEMENT_SAMPLES = 16384;
const ROOT_DERIVATIVE_SAMPLES = 32;

function parseArgs(argv) {
  const args = {
    contract: DEFAULT_CONTRACT,
    input: DEFAULT_INPUT,
    result: DEFAULT_RESULT,
    target: DEFAULT_TARGET,
    phi: DEFAULT_PHI,
    mesh: DEFAULT_MESH,
    outJson: DEFAULT_OUT_JSON,
    outReport: DEFAULT_OUT_REPORT,
    tubeHalfWidth: DEFAULT_TUBE_HALF_WIDTH,
    complementSamples: DEFAULT_COMPLEMENT_SAMPLES,
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
    } else if (arg === "--phi") {
      args.phi = argv[++index];
    } else if (arg === "--mesh") {
      args.mesh = argv[++index];
    } else if (arg === "--out-json") {
      args.outJson = argv[++index];
    } else if (arg === "--out-report") {
      args.outReport = argv[++index];
    } else if (arg === "--tube-half-width") {
      args.tubeHalfWidth = Number(argv[++index]);
    } else if (arg === "--complement-samples") {
      args.complementSamples = Number(argv[++index]);
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (!Number.isFinite(args.tubeHalfWidth) || args.tubeHalfWidth <= 0) {
    throw new Error("--tube-half-width must be a positive finite number");
  }
  if (!Number.isInteger(args.complementSamples) || args.complementSamples < 256) {
    throw new Error("--complement-samples must be an integer >= 256");
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-root-tube-certificate.mjs [options]

Options:
  --contract PATH             Fresh seed contract JSON. Defaults to ${DEFAULT_CONTRACT}.
  --input PATH                Shifted-separator strict-gap input JSON. Defaults to ${DEFAULT_INPUT}.
  --result PATH               Shifted-separator strict-gap result JSON. Defaults to ${DEFAULT_RESULT}.
  --target PATH               Higher-fold rebuild target JSON. Defaults to ${DEFAULT_TARGET}.
  --phi PATH                  Higher-fold phi_cyc JSON. Defaults to ${DEFAULT_PHI}.
  --mesh PATH                 Higher-fold mesh JSON. Defaults to ${DEFAULT_MESH}.
  --out-json PATH             Output certificate JSON. Defaults to ${DEFAULT_OUT_JSON}.
  --out-report PATH           Output Markdown report. Defaults to ${DEFAULT_OUT_REPORT}.
  --tube-half-width NUMBER    Half-width for root tubes in theta. Defaults to ${DEFAULT_TUBE_HALF_WIDTH}.
  --complement-samples INT    Grid samples per unit theta for complement checks. Defaults to ${DEFAULT_COMPLEMENT_SAMPLES}.
  --pretty                    Pretty-print JSON artifacts.
  --help                      Show this help.`);
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

function bumpSecond(theta, arc) {
  const s = arcCoordinate(theta, arc);
  if (s === null) {
    return 0;
  }
  const [left, right] = arc.theta_range.map(Number);
  return mirrorSign(theta) * (2 * Math.PI ** 2 / (right - left) ** 2) * Math.cos(2 * Math.PI * s);
}

function bumpSecondAbsBound(arc) {
  const [left, right] = arc.theta_range.map(Number);
  return 2 * Math.PI ** 2 / (right - left) ** 2;
}

function shearValue(theta, arcs, witness) {
  return arcs.reduce((sum, arc) => sum + (witness[arc.basis] ?? 0) * bumpValue(theta, arc), 0);
}

function shearDerivative(theta, arcs, witness) {
  return arcs.reduce((sum, arc) => sum + (witness[arc.basis] ?? 0) * bumpDerivative(theta, arc), 0);
}

function shearSecond(theta, arcs, witness) {
  return arcs.reduce((sum, arc) => sum + (witness[arc.basis] ?? 0) * bumpSecond(theta, arc), 0);
}

function shearSecondAbsBound(arcs, witness) {
  return arcs.reduce((sum, arc) => sum + Math.abs(witness[arc.basis] ?? 0) * bumpSecondAbsBound(arc), 0);
}

function baseX(theta) {
  return AMPLITUDE * Math.cos(2 * Math.PI * theta);
}

function baseXPrime(theta) {
  return -2 * Math.PI * AMPLITUDE * Math.sin(2 * Math.PI * theta);
}

function baseXSecond(theta) {
  return -((2 * Math.PI) ** 2) * AMPLITUDE * Math.cos(2 * Math.PI * theta);
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

function existingXSecond(theta, contract) {
  const oldTheta = seedTheta(theta, contract);
  return baseXSecond(oldTheta) + contract.seed_history.epsilon * shearSecond(oldTheta, contract.seed_history.first_half_arcs, contract.seed_history.witness);
}

function repairX(theta, input, result) {
  return shearValue(theta, input.basis_definition.first_half_arcs, result.witness);
}

function repairXPrime(theta, input, result) {
  return shearDerivative(theta, input.basis_definition.first_half_arcs, result.witness);
}

function repairXSecond(theta, input, result) {
  return shearSecond(theta, input.basis_definition.first_half_arcs, result.witness);
}

function xAt(theta, lambda, contract, input, result) {
  return existingX(theta, contract) + lambda * repairX(theta, input, result);
}

function xPrimeAt(theta, lambda, contract, input, result) {
  return existingXPrime(theta, contract) + lambda * repairXPrime(theta, input, result);
}

function xSecondAt(theta, lambda, contract, input, result) {
  return existingXSecond(theta, contract) + lambda * repairXSecond(theta, input, result);
}

function xdotAt(theta, lambda, contract, input, result) {
  return xPrimeAt(theta, lambda, contract, input, result) / T0;
}

function fieldSpeedResidual(theta, contactType, lambda, contract, input, result) {
  const xdot = xdotAt(theta, lambda, contract, input, result);
  return contactType === "positive_field_speed" ? xdot - 1 : xdot + 1;
}

function xdotDerivativeAt(theta, lambda, contract, input, result) {
  return xSecondAt(theta, lambda, contract, input, result) / T0;
}

function xdotDerivativeAbsBound(lambda, contract, input, result) {
  const baseBound = (2 * Math.PI) ** 2 * AMPLITUDE;
  const oldShearBound = contract.seed_history.epsilon * shearSecondAbsBound(
    contract.seed_history.first_half_arcs,
    contract.seed_history.witness,
  );
  const repairBound = lambda * shearSecondAbsBound(input.basis_definition.first_half_arcs, result.witness);
  return (baseBound + oldShearBound + repairBound) / T0;
}

function sourceBreakpoints(contract, input) {
  const values = new Set([0, 0.5, 1]);
  for (const arc of contract.seed_history.first_half_arcs) {
    for (const endpoint of arc.theta_range) {
      values.add(modOne(Number(endpoint) - contract.seed_history.delta));
      values.add(modOne(Number(endpoint) - contract.seed_history.delta + 0.5));
    }
  }
  for (const arc of input.basis_definition.first_half_arcs) {
    for (const endpoint of arc.theta_range) {
      values.add(modOne(Number(endpoint)));
      values.add(modOne(Number(endpoint) + 0.5));
    }
  }
  return Array.from(values).sort((a, b) => a - b);
}

function containedMeshLayer(mesh, contactId, range) {
  const layer = (mesh.preledger_intervals || []).find((interval) => interval.separator_event === contactId);
  if (!layer) {
    return {
      contained: false,
      layer_id: null,
      layer_theta_range: null,
    };
  }
  const [left, right] = layer.theta_range.map(Number);
  return {
    contained: range[0] >= left - 1e-12 && range[1] <= right + 1e-12,
    layer_id: layer.interval_id,
    layer_theta_range: [cleanNumber(left), cleanNumber(right)],
  };
}

function breakpointsInside(range, breakpoints) {
  return breakpoints
    .filter((theta) => theta > range[0] + 1e-12 && theta < range[1] - 1e-12)
    .map((theta) => cleanNumber(theta));
}

function nearestRootClearance(center, roots) {
  let clearance = Infinity;
  for (const root of roots) {
    if (Math.abs(root - center) <= 1e-12) {
      continue;
    }
    clearance = Math.min(clearance, Math.abs(root - center));
  }
  return clearance;
}

function sampleRange(left, right, count) {
  const values = [];
  for (let index = 0; index <= count; index += 1) {
    values.push(left + (right - left) * index / count);
  }
  return values;
}

function buildRootTube(contact, roots, lambda, contract, input, result, mesh, breakpoints, tubeHalfWidth) {
  const center = Number(contact.theta);
  const range = [center - tubeHalfWidth, center + tubeHalfWidth];
  if (range[0] < 0 || range[1] > 1) {
    throw new Error(`Root tube for ${contact.id} leaves [0,1].`);
  }
  const leftResidual = fieldSpeedResidual(range[0], contact.velocity_contact, lambda, contract, input, result);
  const centerResidual = fieldSpeedResidual(center, contact.velocity_contact, lambda, contract, input, result);
  const rightResidual = fieldSpeedResidual(range[1], contact.velocity_contact, lambda, contract, input, result);
  const derivativeSamples = sampleRange(range[0], range[1], ROOT_DERIVATIVE_SAMPLES)
    .map((theta) => xdotDerivativeAt(theta, lambda, contract, input, result));
  const derivativeAbsFloor = Math.min(...derivativeSamples.map((value) => Math.abs(value)));
  const derivativeSigns = new Set(derivativeSamples.map((value) => Math.sign(value)));
  const meshLayer = containedMeshLayer(mesh, contact.id, range);
  const nearestClearance = nearestRootClearance(center, roots);
  const separationMargin = nearestClearance - 2 * tubeHalfWidth;
  const signChange = leftResidual === 0 || rightResidual === 0
    ? false
    : Math.sign(leftResidual) !== Math.sign(rightResidual);
  return {
    contact_id: contact.id,
    velocity_contact: contact.velocity_contact,
    equation: contact.velocity_contact === "positive_field_speed" ? "xdot(theta)-1=0" : "xdot(theta)+1=0",
    center_theta: cleanNumber(center),
    theta_range: range.map((theta) => cleanNumber(theta)),
    theta_interval_binary64: range.map((theta) => cleanNumber(theta)),
    t_interval_binary64: range.map((theta) => cleanNumber(theta * T0)),
    tube_half_width: cleanNumber(tubeHalfWidth),
    center_residual: cleanNumber(centerResidual),
    left_residual: cleanNumber(leftResidual),
    right_residual: cleanNumber(rightResidual),
    endpoint_sign_change_binary64: signChange,
    sampled_derivative_abs_floor: cleanNumber(derivativeAbsFloor),
    sampled_derivative_signs: Array.from(derivativeSigns).sort((a, b) => a - b),
    simple_root_evidence_binary64: signChange && derivativeAbsFloor > 0,
    nearest_adjacent_root_clearance: cleanNumber(nearestClearance),
    nearest_tube_separation_margin_binary64: cleanNumber(separationMargin),
    disjoint_from_adjacent_tubes_binary64: separationMargin > 0,
    contained_in_mesh_fold_layer: meshLayer.contained,
    mesh_fold_layer_id: meshLayer.layer_id,
    mesh_fold_layer_theta_range: meshLayer.layer_theta_range,
    piecewise_breakpoints_inside_tube: breakpointsInside(range, breakpoints),
  };
}

function complementIntervals(rootTubes) {
  const intervals = [];
  let cursor = 0;
  rootTubes.forEach((tube, index) => {
    const [left, right] = tube.theta_range;
    if (left > cursor + 1e-14) {
      intervals.push({
        interval_id: `C${String(intervals.length + 1).padStart(2, "0")}`,
        theta_range: [cleanNumber(cursor), cleanNumber(left)],
        follows_contact: index === 0 ? null : rootTubes[index - 1].contact_id,
        precedes_contact: tube.contact_id,
      });
    }
    cursor = right;
  });
  if (cursor < 1 - 1e-14) {
    intervals.push({
      interval_id: `C${String(intervals.length + 1).padStart(2, "0")}`,
      theta_range: [cleanNumber(cursor), 1],
      follows_contact: rootTubes[rootTubes.length - 1].contact_id,
      precedes_contact: null,
    });
  }
  return intervals;
}

function scanEquationOnInterval(interval, equation, lambda, contract, input, result, derivativeBound, samplesPerUnit) {
  const [left, right] = interval.theta_range.map(Number);
  const width = right - left;
  const sampleCount = Math.max(8, Math.ceil(width * samplesPerUnit));
  let minAbs = Infinity;
  let minValue = null;
  let minTheta = null;
  let sign = null;
  let observedSignStable = true;
  for (let index = 0; index <= sampleCount; index += 1) {
    const theta = left + width * index / sampleCount;
    const value = equation === "xdot(theta)-1" ?
      xdotAt(theta, lambda, contract, input, result) - 1 :
      xdotAt(theta, lambda, contract, input, result) + 1;
    const valueSign = Math.sign(value);
    if (sign === null && valueSign !== 0) {
      sign = valueSign;
    } else if (valueSign !== 0 && sign !== null && valueSign !== sign) {
      observedSignStable = false;
    }
    if (Math.abs(value) < minAbs) {
      minAbs = Math.abs(value);
      minValue = value;
      minTheta = theta;
    }
  }
  const gridHalfStep = width / (2 * sampleCount);
  const binary64LipschitzMargin = minAbs - derivativeBound * gridHalfStep;
  return {
    equation,
    sample_count: sampleCount,
    observed_sign_stable: observedSignStable,
    observed_sign: sign,
    min_abs_sampled_residual: cleanNumber(minAbs),
    min_sampled_residual: cleanNumber(minValue),
    min_sampled_theta: cleanNumber(minTheta),
    derivative_abs_bound_used: cleanNumber(derivativeBound),
    grid_half_step: cleanNumber(gridHalfStep),
    binary64_lipschitz_margin: cleanNumber(binary64LipschitzMargin),
    no_zero_evidence_binary64: observedSignStable && binary64LipschitzMargin > 0,
    root_count_bound_binary64: observedSignStable && binary64LipschitzMargin > 0 ? [0, 0] : null,
  };
}

function buildComplementScan(intervals, lambda, contract, input, result, derivativeBound, samplesPerUnit) {
  return intervals.map((interval) => {
    const scans = [
      scanEquationOnInterval(interval, "xdot(theta)+1", lambda, contract, input, result, derivativeBound, samplesPerUnit),
      scanEquationOnInterval(interval, "xdot(theta)-1", lambda, contract, input, result, derivativeBound, samplesPerUnit),
    ];
    return {
      ...interval,
      width: cleanNumber(Number(interval.theta_range[1]) - Number(interval.theta_range[0])),
      equation_scans: scans,
      no_extra_root_evidence_binary64: scans.every((scan) => scan.no_zero_evidence_binary64),
    };
  });
}

function sourceArtifacts(files) {
  return Object.fromEntries(
    Object.entries(files).map(([key, file]) => [key, { path: file.path, sha256: file.sha256 }]),
  );
}

function buildCertificate(files, args) {
  const contract = files.contract.data;
  const input = files.input.data;
  const result = files.result.data;
  const target = files.target.data;
  const phi = files.phi.data;
  const mesh = files.mesh.data;
  const packetId = phi.packet_id;
  const lambda = Number(phi.direct_path_seed.lambda);
  const contacts = phi.higher_fold_itinerary.contacts;
  const rootThetas = contacts.map((contact) => Number(contact.theta));
  const minSpacing = Math.min(
    ...rootThetas.slice(1).map((theta, index) => theta - rootThetas[index]),
  );
  if (args.tubeHalfWidth >= minSpacing / 2) {
    throw new Error(`Tube half-width ${args.tubeHalfWidth} overlaps adjacent roots with spacing ${minSpacing}.`);
  }
  if (packetId !== target.selected_rebuild_target.proposed_successor_packet_id) {
    throw new Error("Phi packet id does not match selected rebuild target.");
  }
  const breakpoints = sourceBreakpoints(contract, input);
  const derivativeBound = xdotDerivativeAbsBound(lambda, contract, input, result);
  const rootTubes = contacts.map((contact) => buildRootTube(
    contact,
    rootThetas,
    lambda,
    contract,
    input,
    result,
    mesh,
    breakpoints,
    args.tubeHalfWidth,
  ));
  const complements = buildComplementScan(
    complementIntervals(rootTubes),
    lambda,
    contract,
    input,
    result,
    derivativeBound,
    args.complementSamples,
  );
  const allRootTubesPass = rootTubes.every((tube) => tube.simple_root_evidence_binary64 && tube.contained_in_mesh_fold_layer);
  const allComplementsPass = complements.every((interval) => interval.no_extra_root_evidence_binary64);
  const allTubesDisjoint = rootTubes.every((tube) => tube.disjoint_from_adjacent_tubes_binary64);
  const minComplementMargin = Math.min(
    ...complements.flatMap((interval) => interval.equation_scans.map((scan) => scan.binary64_lipschitz_margin)),
  );
  const minDerivativeFloor = Math.min(...rootTubes.map((tube) => tube.sampled_derivative_abs_floor));
  const rootTubesWithPiecewiseBreakpoints = rootTubes
    .filter((tube) => tube.piecewise_breakpoints_inside_tube.length > 0)
    .map((tube) => tube.contact_id);
  const firstHalfTubeCount = rootTubes.filter((tube) => Number(tube.center_theta) < 0.5).length;
  const secondHalfTubeCount = rootTubes.length - firstHalfTubeCount;
  const binary64Pass = allRootTubesPass && allComplementsPass && allTubesDisjoint;
  return {
    schema: "breather-higher-fold-root-tube-certificate-v1",
    certificate_id: "fresh-v10-higher-fold-root-tube-certificate-v0",
    packet_id: packetId,
    itinerary_id: phi.itinerary_id,
    source_seed_contract: phi.source_seed_contract,
    status: binary64Pass
      ? "binary64_lipschitz_root_tube_certificate_ready_for_directed_rounding"
      : "sampled_root_tube_evidence_fail_closed",
    claim_level:
      "binary64 sampled/Lipschitz root-tube evidence for the higher-fold 12-root successor seed; not an outward-rounded interval proof and not a preledger pass",
    promotion_decision: "priority-only",
    theorem_target: "12-root field-speed stability for the higher-fold breather successor packet",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    proof_grade_ready: false,
    source_artifacts: sourceArtifacts(files),
    common_identity: phi.common_identity,
    direct_path_seed: {
      lambda: cleanNumber(lambda),
      formula: phi.direct_path_seed.formula,
      strict_gap_threshold_lambda: phi.direct_path_seed.strict_gap_threshold_lambda,
    },
    equation_family: {
      negative_field_speed_equation: "xdot(theta)+1=0",
      positive_field_speed_equation: "xdot(theta)-1=0",
      xdot_definition: "xdot(theta)=d/dtheta(X_fresh(theta)+lambda*H_shifted(theta))/T0",
      derivative_bound_method:
        "global analytic absolute bound on |d(xdot)/dtheta| from base cos term plus all compact sine-square bump second-derivative envelopes, evaluated in binary64",
    },
    numerical_policy: {
      arithmetic: "JavaScript Number binary64",
      directed_rounding: false,
      precision_rational_policy:
        "none; this artifact preserves decimal/binary64 routing values and intentionally does not emit rational interval tokens",
      complement_samples_per_unit_theta: args.complementSamples,
      root_derivative_samples_per_tube: ROOT_DERIVATIVE_SAMPLES,
      no_extra_root_test:
        "For each complement and each equation, require stable sampled sign and min_abs_sampled_residual - derivative_bound*grid_half_step > 0.",
    },
    no_double_counting_evidence: {
      ordered_disjoint_tubes_binary64: allTubesDisjoint,
      periodic_endpoint_policy:
        "The first tube starts after theta=0 and the final tube ends before theta=1; no periodic endpoint tube is present in this packet.",
      first_half_tube_count: firstHalfTubeCount,
      second_half_tube_count: secondHalfTubeCount,
      expected_first_half_tube_count: target.selected_rebuild_target.first_half_root_count,
      expected_second_half_tube_count: target.selected_rebuild_target.second_half_root_count,
      tube_to_mesh_separator_mapping:
        rootTubes.map((tube) => ({
          contact_id: tube.contact_id,
          mesh_fold_layer_id: tube.mesh_fold_layer_id,
          contained: tube.contained_in_mesh_fold_layer,
        })),
    },
    mesh_preledger_handoff: {
      authorizes_preledger_rerun: false,
      required_replacement_before_preledger:
        "Replace sampled mesh separator collars with outward-rounded certified root intervals, then regenerate preledger_intervals under the same packet identity.",
      current_mesh_status: "diagnostic separator-refined mesh only",
    },
    summary: {
      target_root_count: target.selected_rebuild_target.target_root_count,
      observed_root_tube_count: rootTubes.length,
      binary64_root_count_evidence: binary64Pass ? rootTubes.length : null,
      all_root_tubes_have_endpoint_sign_change: rootTubes.every((tube) => tube.endpoint_sign_change_binary64),
      all_root_tubes_contained_in_mesh_fold_layer: rootTubes.every((tube) => tube.contained_in_mesh_fold_layer),
      all_root_tubes_disjoint_binary64: allTubesDisjoint,
      all_complements_pass_binary64_lipschitz_no_zero: allComplementsPass,
      first_half_root_tube_count: firstHalfTubeCount,
      second_half_root_tube_count: secondHalfTubeCount,
      min_sampled_root_derivative_abs_floor: cleanNumber(minDerivativeFloor),
      xdot_derivative_abs_bound_used: cleanNumber(derivativeBound),
      min_binary64_complement_lipschitz_margin: cleanNumber(minComplementMargin),
      root_tubes_with_piecewise_breakpoints: rootTubesWithPiecewiseBreakpoints,
      branch_chart_authorized: false,
    },
    root_tubes: rootTubes,
    complement_intervals: complements,
    proof_grade_blockers: [
      "Replace all binary64 evaluations with outward-rounded interval arithmetic for X, xdot, and d(xdot)/dtheta.",
      "Split every root tube and complement at the listed piecewise basis breakpoints before applying derivative and sign bounds.",
      "Emit directed-rounded root-tube parity/no-double-counting bounds that prove exactly one root in each tube and no root on every complement.",
      "The interval root-count certificate supersedes this binary64 handoff; residual proof-grade work now belongs to higher-fold proof-interval row closure.",
    ],
    limitations: [
      "This artifact does not accept any preledger row.",
      "This artifact does not reuse the old same-itinerary row certificates.",
      "This artifact does not authorize a live ledger update or branch chart.",
      "The binary64 Lipschitz inequalities are useful routing evidence, not a proof-grade certificate.",
    ],
  };
}

function reportTable(rows, columns) {
  return [
    `| ${columns.map((column) => column.label).join(" | ")} |`,
    `| ${columns.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${columns.map((column) => String(column.value(row) ?? "")).join(" | ")} |`),
  ].join("\n");
}

function buildReport(certificate) {
  const rootRows = certificate.root_tubes.map((tube) => ({
    id: tube.contact_id,
    theta: tube.center_theta,
    equation: tube.equation,
    signChange: tube.endpoint_sign_change_binary64,
    derivativeFloor: tube.sampled_derivative_abs_floor,
    separation: tube.nearest_tube_separation_margin_binary64,
    breakpoints: tube.piecewise_breakpoints_inside_tube.length,
  }));
  const complementRows = certificate.complement_intervals.map((interval) => {
    const minMargin = Math.min(...interval.equation_scans.map((scan) => scan.binary64_lipschitz_margin));
    return {
      id: interval.interval_id,
      range: `[${interval.theta_range[0]}, ${interval.theta_range[1]}]`,
      pass: interval.no_extra_root_evidence_binary64,
      minMargin: cleanNumber(minMargin),
    };
  });
  return `# Fresh v10 Higher-Fold Root-Tube Certificate Attempt

## Scope

This packet evaluates the 12 field-speed contacts of
\`${certificate.packet_id}\` as candidate root tubes for the new itinerary
\`${certificate.itinerary_id}\`.

It is not an outward-rounded interval certificate. It records binary64
sampled/Lipschitz evidence that the 12 sampled contacts are simple roots and
that the complements have no additional sampled field-speed roots under the
global derivative envelope. The packet remains priority-only and does not
authorize the preledger, live ledger, or branch chart.

## Status

- Status: \`${certificate.status}\`
- Target root count: \`${certificate.summary.target_root_count}\`
- Root tubes: \`${certificate.summary.observed_root_tube_count}\`
- Binary64 complement no-extra-root pass:
  \`${certificate.summary.all_complements_pass_binary64_lipschitz_no_zero}\`
- Binary64 tube disjointness:
  \`${certificate.summary.all_root_tubes_disjoint_binary64}\`
- First-half/second-half tube counts:
  \`${certificate.summary.first_half_root_tube_count}/${certificate.summary.second_half_root_tube_count}\`
- Minimum sampled root derivative floor:
  \`${certificate.summary.min_sampled_root_derivative_abs_floor}\`
- Minimum binary64 complement Lipschitz margin:
  \`${certificate.summary.min_binary64_complement_lipschitz_margin}\`
- Proof-grade ready: \`${certificate.proof_grade_ready}\`

## Root Tubes

${reportTable(rootRows, [
  { label: "contact", value: (row) => `\`${row.id}\`` },
  { label: "theta", value: (row) => `\`${row.theta}\`` },
  { label: "equation", value: (row) => `\`${row.equation}\`` },
  { label: "sign change", value: (row) => `\`${row.signChange}\`` },
  { label: "derivative floor", value: (row) => `\`${row.derivativeFloor}\`` },
  { label: "tube separation", value: (row) => `\`${row.separation}\`` },
  { label: "piecewise breaks", value: (row) => `\`${row.breakpoints}\`` },
])}

## Complement Scan

${reportTable(complementRows, [
  { label: "interval", value: (row) => `\`${row.id}\`` },
  { label: "theta range", value: (row) => `\`${row.range}\`` },
  { label: "binary64 no-extra-root", value: (row) => `\`${row.pass}\`` },
  { label: "min margin", value: (row) => `\`${row.minMargin}\`` },
])}

## Proof-Grade Handoff

This binary64 packet is an audit surface, not the final certificate. Its
proof-grade consumer is the outward-rounded interval backend for the same
root-tube inequalities:

- directed-rounded enclosures for $X(\\theta)$, $\\dot X(\\theta)$, and
  $d\\dot X/d\\theta$;
- root-tube and complement splitting at the recorded piecewise basis
  breakpoints;
- one-root parity/no-double-counting in every tube;
- no-root complement signs for both $\\dot X(\\theta)+1$ and
  $\\dot X(\\theta)-1$.

Only after that interval certificate exists should the proof-interval preledger
be rerun under the new packet identity. If
\`fresh_v10_higher_fold_root_tube_interval_certificate.v0.md\` exists and
passes, that interval packet supersedes this binary64 attempt for the
root-count topology gate.

## Capture Decision

Priority-only. This packet sharpens the higher-fold route into a concrete
root-count stability target, but the proof-grade topology result belongs to the
outward-rounded interval certificate, not to this binary64 attempt.
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
    phi: readJson(args.phi),
    mesh: readJson(args.mesh),
  };
  const certificate = buildCertificate(files, args);
  writeJson(args.outJson, certificate, args.pretty);
  writeText(args.outReport, buildReport(certificate));
  console.log(JSON.stringify({
    outJson: args.outJson,
    outReport: args.outReport,
    status: certificate.status,
    proofGradeReady: certificate.proof_grade_ready,
    minComplementMargin: certificate.summary.min_binary64_complement_lipschitz_margin,
    minDerivativeFloor: certificate.summary.min_sampled_root_derivative_abs_floor,
  }));
}

main();

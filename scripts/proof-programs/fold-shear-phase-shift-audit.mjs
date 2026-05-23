#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const DEFAULT_INPUT =
  "reference/priorities/proof-programs/breather-proof/certificate/fold_shear_deformed_candidate.seed_cosine_residuals.v0.json";
const DEFAULT_OUT =
  "reference/priorities/proof-programs/breather-proof/certificate/fold_shear_phase_shift_audit.seed_cosine_residuals.v0.json";
const DEFAULT_DELTA = 0.02;
const AMPLITUDE = 1.25;
const SIGMA_1 = 0.14758361765;
const SIGMA_2 = 0.35241638235;
const PROBE_DELTAS = [0.005, 0.01, 0.02, 0.03, 0.04, 0.05, 0.075, 0.1];

function parseArgs(argv) {
  const args = {
    input: DEFAULT_INPUT,
    out: DEFAULT_OUT,
    delta: DEFAULT_DELTA,
    pretty: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--input") {
      args.input = argv[++i];
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else if (arg === "--delta") {
      args.delta = parsePositiveNumber(argv[++i], "--delta");
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fold-shear-phase-shift-audit.mjs [options]

Options:
  --input PATH   Finite fold-shear seed JSON. Defaults to ${DEFAULT_INPUT}.
  --out PATH     Output phase-shift audit JSON. Defaults to ${DEFAULT_OUT}.
  --delta N      Section phase shift in cycle coordinates. Defaults to ${DEFAULT_DELTA}.
  --pretty       Pretty-print JSON.
  --help         Show this help.`);
}

function parsePositiveNumber(value, name) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    throw new Error(`Expected ${name} to be a positive number, got: ${value}`);
  }
  return number;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function cleanNumber(value) {
  if (Math.abs(value) < 1e-14) {
    return 0;
  }
  return Number(value.toPrecision(15));
}

function modOne(value) {
  const reduced = value - Math.floor(value);
  return cleanNumber(reduced >= 1 ? reduced - 1 : reduced);
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
  if (localTheta < left || localTheta > right) {
    return null;
  }
  return (localTheta - left) / (right - left);
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

function shearValue(theta, witness, arcs) {
  return arcs.reduce((sum, arc) => sum + (witness[arc.basis] ?? 0) * bumpValue(theta, arc), 0);
}

function shearDerivative(theta, witness, arcs) {
  return arcs.reduce((sum, arc) => sum + (witness[arc.basis] ?? 0) * bumpDerivative(theta, arc), 0);
}

function baseX(theta) {
  return AMPLITUDE * Math.cos(2 * Math.PI * theta);
}

function baseXPrime(theta) {
  return -2 * Math.PI * AMPLITUDE * Math.sin(2 * Math.PI * theta);
}

function deformedX(theta, finiteSeed) {
  const epsilon = finiteSeed.epsilon_policy.epsilon_chosen;
  const { witness, first_half_arcs: arcs } = finiteSeed.deformation;
  return baseX(theta) + epsilon * shearValue(theta, witness, arcs);
}

function deformedXDot(theta, finiteSeed) {
  const epsilon = finiteSeed.epsilon_policy.epsilon_chosen;
  const period = finiteSeed.base_candidate.T_cyc;
  const { witness, first_half_arcs: arcs } = finiteSeed.deformation;
  return (baseXPrime(theta) + epsilon * shearDerivative(theta, witness, arcs)) / period;
}

function sectionState(delta, finiteSeed) {
  return {
    delta,
    x_section: cleanNumber(deformedX(delta, finiteSeed)),
    xdot_section: cleanNumber(deformedXDot(delta, finiteSeed)),
    inbound_speed: cleanNumber(-deformedXDot(delta, finiteSeed)),
  };
}

function shiftedSeparators(delta) {
  return {
    sigma_1_shifted: modOne(SIGMA_1 - delta),
    sigma_2_shifted: modOne(SIGMA_2 - delta),
    sigma_3_shifted: modOne(SIGMA_1 + 0.5 - delta),
    sigma_4_shifted: modOne(SIGMA_2 + 0.5 - delta),
  };
}

function shiftedCollarRows(finiteSeed, delta) {
  return finiteSeed.residual_gap_rows.map((row) => ({
    id: row.id,
    shifted_collar_id: `${row.collar_id}/phase_shift_delta_${delta}`,
    ledger: row.ledger,
    residual_type: row.residual_type,
    orientation: row.orientation,
    finite_gap_surplus_preserved: row.finite_gap_surplus,
    invariance_rule: "source_minus_receiver null-coordinate differences are unchanged when source and receiver intervals are both shifted by -delta",
  }));
}

function buildArtifact(finiteSeed, delta) {
  if (delta >= SIGMA_1) {
    throw new Error(`--delta must be less than sigma_1=${SIGMA_1} for this first inbound-section audit.`);
  }
  const probes = PROBE_DELTAS.filter((entry) => entry < SIGMA_1).map((entry) =>
    sectionState(entry, finiteSeed)
  );
  return {
    schema: "breather-fold-shear-phase-shift-audit-v1",
    source_packet: finiteSeed.packet_id,
    status: "phase_shift_audit_not_preledger",
    claim_level:
      "phase-shifted inbound-section seed preserving the finite fold-shear residual-collar gaps under shifted row intervals",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    selected_phase_shift: sectionState(delta, finiteSeed),
    shifted_separator_coordinates: shiftedSeparators(delta),
    admissible_delta_condition:
      "0 < delta < sigma_1, xdot(delta) < 0, and -xdot(delta) < c_f=1 on the shifted section",
    probe_section_states: probes,
    preserved_gap_rows: shiftedCollarRows(finiteSeed, delta),
    min_preserved_finite_gap_surplus: finiteSeed.min_finite_gap_surplus,
    limitations: [
      "This audit changes the section phase of the finite seed only; it is not a collocation solve.",
      "The shifted collar rows are finite calculations, not outward-rounded interval pre-ledger rows.",
      "The full structural Jacobian, dynamic residuals, fold integrals, and live pre-ledger are not evaluated here.",
      "No live ledger, fold atlas, or branch chart is updated.",
    ],
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const finiteSeed = readJson(path.resolve(args.input));
  const artifact = buildArtifact(finiteSeed, args.delta);
  const outputPath = path.resolve(args.out);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(artifact, null, args.pretty ? 2 : 0)}\n`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const OUTPUT_SCHEMA = "aaa-proof/null-coordinate-gap-opening-scan/v1";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CONTRACT = `${CERT_DIR}/fresh_same_packet_fold_shear_seed.v0.json`;
const DEFAULT_V10_LEDGER = `${CERT_DIR}/causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v10.json`;
const DEFAULT_OUT = `${CERT_DIR}/gap_opening_fresh_v10_strict_gap_input.shifted_separator_fixed_period.v0.json`;

function parseArgs(argv) {
  const args = {
    contract: DEFAULT_CONTRACT,
    v10Ledger: DEFAULT_V10_LEDGER,
    out: DEFAULT_OUT,
    pretty: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--contract") {
      args.contract = argv[++i];
    } else if (arg === "--v10-ledger") {
      args.v10Ledger = argv[++i];
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fresh-v10-shifted-separator-strict-gap-matrix-builder.mjs [options]

Options:
  --contract PATH      Fresh same-packet seed contract JSON. Defaults to ${DEFAULT_CONTRACT}.
  --v10-ledger PATH    Proof-interval-v10 ledger JSON. Defaults to ${DEFAULT_V10_LEDGER}.
  --out PATH           Write the generated scanner input JSON. Defaults to ${DEFAULT_OUT}.
  --pretty             Pretty-print JSON.
  --help               Show this help.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value, pretty) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`);
}

function cleanNumber(value) {
  if (Math.abs(value) < 1e-14) {
    return 0;
  }
  return Number(value.toPrecision(15));
}

function numbers(values) {
  return values.map((value) => Number(value));
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
  const [left, right] = numbers(arc.theta_range);
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

function candidateExtremaThetas(range, arc) {
  const [left, right] = numbers(range);
  const [arcLeft, arcRight] = numbers(arc.theta_range);
  const arcMid = (arcLeft + arcRight) / 2;
  const candidates = [left, right];
  for (const lift of [0, 0.5]) {
    for (const theta of [arcLeft + lift, arcMid + lift, arcRight + lift]) {
      if (theta >= left - 1e-12 && theta <= right + 1e-12) {
        candidates.push(Math.max(left, Math.min(right, theta)));
      }
    }
  }
  return [...new Set(candidates.map(cleanNumber))];
}

function minOver(range, arc, sign) {
  return Math.min(...candidateExtremaThetas(range, arc).map((theta) => sign * bumpValue(theta, arc)));
}

function maxOver(range, arc, sign) {
  return Math.max(...candidateExtremaThetas(range, arc).map((theta) => sign * bumpValue(theta, arc)));
}

function selectedStrictGap(strip) {
  const [receiverLo, receiverHi] = numbers(strip.receiver_range);
  const [sourceLo, sourceHi] = numbers(strip.source_range);
  const sourceBelowReceiverDeficit = sourceHi - receiverLo;
  const receiverBelowSourceDeficit = receiverHi - sourceLo;
  if (sourceBelowReceiverDeficit <= receiverBelowSourceDeficit) {
    return {
      orientation: "source_below_receiver",
      requiredMargin: cleanNumber(Math.max(0, sourceBelowReceiverDeficit)),
      source_below_receiver_deficit: cleanNumber(sourceBelowReceiverDeficit),
      receiver_below_source_deficit: cleanNumber(receiverBelowSourceDeficit),
    };
  }
  return {
    orientation: "receiver_below_source",
    requiredMargin: cleanNumber(Math.max(0, receiverBelowSourceDeficit)),
    source_below_receiver_deficit: cleanNumber(sourceBelowReceiverDeficit),
    receiver_below_source_deficit: cleanNumber(receiverBelowSourceDeficit),
  };
}

function coefficientsForGap(strip, orientation, arcs) {
  const coefficients = {};
  const sign = strip.ledger === "w" ? 1 : -1;
  for (const arc of arcs) {
    if (orientation === "source_below_receiver") {
      coefficients[arc.basis] = cleanNumber(
        minOver(strip.receiver_theta_range, arc, sign) - maxOver(strip.source_theta_range, arc, sign)
      );
    } else {
      coefficients[arc.basis] = cleanNumber(
        minOver(strip.source_theta_range, arc, sign) - maxOver(strip.receiver_theta_range, arc, sign)
      );
    }
  }
  return coefficients;
}

function shiftedArcs(contract) {
  const sigma1 = contract.shifted_separator_coordinates?.sigma_1;
  const sigma2 = contract.shifted_separator_coordinates?.sigma_2;
  if (!Number.isFinite(sigma1) || !Number.isFinite(sigma2)) {
    throw new Error("Fresh contract must provide shifted_separator_coordinates.sigma_1 and sigma_2.");
  }
  return [
    { id: "A0_shifted", theta_range: [0, sigma1], basis: "h_A0s" },
    { id: "A1_shifted", theta_range: [sigma1, sigma2], basis: "h_A1s" },
    { id: "A2_shifted", theta_range: [sigma2, 0.5], basis: "h_A2s" },
  ];
}

function assertInputs(contract, ledger) {
  if (contract.packet_id !== "fresh-same-packet-fold-shear-seed-v0") {
    throw new Error(`Unexpected contract packet_id: ${contract.packet_id}`);
  }
  if (ledger.schema !== "breather-causal-ledger-fresh-proof-interval-v10") {
    throw new Error("Proof-interval-v10 ledger schema mismatch.");
  }
  if (ledger.packet_id !== contract.packet_id) {
    throw new Error(`Ledger packet_id ${ledger.packet_id} does not match contract ${contract.packet_id}.`);
  }
  if (!Array.isArray(ledger.parent_complement_strips_v10) || ledger.parent_complement_strips_v10.length !== 10) {
    throw new Error("Expected exactly 10 v10 parent-complement strips.");
  }
  if (ledger.branch_chart_authorized || ledger.preledger_pass || ledger.updates_live_ledger) {
    throw new Error("Imported v10 unexpectedly authorizes a live preledger or branch chart.");
  }
}

function buildInput(contract, ledger) {
  assertInputs(contract, ledger);
  const arcs = shiftedArcs(contract);
  const gapConstraints = ledger.parent_complement_strips_v10.map((strip) => {
    const gap = selectedStrictGap(strip);
    return {
      id: strip.strip_id,
      collar_id: strip.strip_id,
      parent_base_row_id: strip.parent_base_row_id,
      simple_root_subrow_id: strip.simple_root_subrow_id,
      ledger: strip.ledger,
      side: strip.side,
      receiver_interval: strip.receiver_interval,
      source_interval: strip.source_interval,
      receiver_theta_range: strip.receiver_theta_range,
      source_theta_range: strip.source_theta_range,
      receiver_range: strip.receiver_range,
      source_range: strip.source_range,
      orientation: gap.orientation,
      source_below_receiver_deficit: gap.source_below_receiver_deficit,
      receiver_below_source_deficit: gap.receiver_below_source_deficit,
      required_margin: gap.requiredMargin,
      coefficients: coefficientsForGap(strip, gap.orientation, arcs),
    };
  });

  return {
    schema: OUTPUT_SCHEMA,
    packet_id: "fresh-v10-shifted-separator-fixed-period-strict-gap-matrix-v0",
    packet_identity: {
      source_packet: ledger.packet_id,
      source_refinement: ledger.refinement_id,
      matrix_status: "diagnostic_v10_parent_complement_shifted_separator_basis_fixed_period_not_full_candidate",
      basis_model: "shifted_separator_aligned_half_period_antisymmetric_c1_arc_bumps",
      period_mode: "fixed",
      separator_policy:
        "Basis arcs use the fresh shifted separator phases; each bump has zero theta-derivative at the four separator phases.",
    },
    source:
      "Proof-interval-v10 parent-complement collars evaluated against shifted-separator-aligned half-period-antisymmetric C1 bumps on the current fresh packet.",
    claim_limits: {
      claims_breather: false,
      claims_preledger_pass: false,
      claims_branch_chart_authorization: false,
      claims_interval_certification: false,
      claims_live_candidate: false,
      claims_full_structural_jacobian: false,
      claims_finite_itinerary_preservation: false,
    },
    basis_definition: {
      first_half_arcs: arcs,
      formula:
        "psi_Aj(theta)=sin(pi*(theta-L_j)/(R_j-L_j))^2 on the shifted fresh arc A_j and 0 outside; H(theta+1/2)=-H(theta).",
      coordinate_functionals: {
        w: "z_w(theta)=T_cyc theta + X(theta)",
        u: "z_u(theta)=T_cyc theta - X(theta)",
      },
      fixed_period: true,
      separator_velocity_note:
        "Because the shifted arc endpoints are the current separator phases and sin^2 has zero derivative at endpoints, this basis preserves separator velocities to first order at fixed period.",
      extrema_note:
        "Rows use finite extrema candidates for each declared basis on the listed v10 collar intervals; this is a diagnostic tangent matrix, not an outward-rounded interval certificate.",
    },
    variables: arcs.map((arc) => ({
      id: arc.basis,
      meaning: `C1 ${arc.id} bump shear, extended by H(theta+1/2)=-H(theta)`,
    })),
    structural_constraints: [],
    candidate_witness: Object.fromEntries(arcs.map((arc) => [arc.basis, -1])),
    gap_constraints: gapConstraints,
    source_summary: ledger.summary,
    limitations: [
      "Diagnostic finite tangent matrix only; it is not a full structural Jacobian for a solved candidate.",
      "Finite basis extrema are not outward-rounded interval lower bounds.",
      "The candidate witness must still be checked as a finite deformation against the field-speed itinerary.",
      "The result must not update the live causal ledger or authorize branch-chart construction.",
    ],
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const contract = readJson(path.resolve(args.contract));
  const ledger = readJson(path.resolve(args.v10Ledger));
  writeJson(path.resolve(args.out), buildInput(contract, ledger), args.pretty);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

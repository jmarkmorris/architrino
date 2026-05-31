#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const OUTPUT_SCHEMA = "aaa-proof/null-coordinate-gap-opening-scan/v1";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_V10_LEDGER = `${CERT_DIR}/causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v10.json`;
const DEFAULT_OUT = `${CERT_DIR}/gap_opening_fresh_v10_strict_gap_input.local_shear_free_period.v0.json`;

const sigma1 = 0.14758361765;
const sigma2 = 0.35241638235;

const arcs = [
  { id: "A0", theta_range: [0, sigma1], basis: "h_A0" },
  { id: "A1", theta_range: [sigma1, sigma2], basis: "h_A1" },
  { id: "A2", theta_range: [sigma2, 0.5], basis: "h_A2" },
];

function parseArgs(argv) {
  const args = {
    v10Ledger: DEFAULT_V10_LEDGER,
    out: DEFAULT_OUT,
    periodMode: "free",
    pretty: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--v10-ledger") {
      args.v10Ledger = argv[++i];
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else if (arg === "--period-mode") {
      args.periodMode = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (!["free", "fixed"].includes(args.periodMode)) {
    throw new Error(`--period-mode must be "free" or "fixed", got: ${args.periodMode}`);
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fresh-v10-strict-gap-matrix-builder.mjs [options]

Options:
  --v10-ledger PATH     Proof-interval-v10 ledger JSON. Defaults to ${DEFAULT_V10_LEDGER}.
  --out PATH            Write the generated scanner input JSON. Defaults to ${DEFAULT_OUT}.
  --period-mode MODE    Use "free" or "fixed" period tangent. Defaults to free.
  --pretty              Pretty-print JSON.
  --help                Show this help.`);
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

function numbers(values) {
  return values.map((value) => Number(value));
}

function firstHalfTheta(theta) {
  return theta >= 0.5 ? theta - 0.5 : theta;
}

function mirrorSign(theta) {
  return theta >= 0.5 ? -1 : 1;
}

function smoothArcBump(theta, arc) {
  const localTheta = firstHalfTheta(theta);
  const [left, right] = arc.theta_range;
  if (localTheta < left || localTheta > right) {
    return 0;
  }
  const s = (localTheta - left) / (right - left);
  return Math.sin(Math.PI * s) ** 2;
}

function hBasisValue(theta, basisId) {
  const arc = arcs.find((entry) => entry.basis === basisId);
  if (!arc) {
    throw new Error(`Unknown basis id: ${basisId}`);
  }
  return mirrorSign(theta) * smoothArcBump(theta, arc);
}

function deltaCoordinateBasisValue(ledger, theta, basisId) {
  const sign = ledger === "w" ? 1 : -1;
  return sign * hBasisValue(theta, basisId);
}

function minOver(range, valueAt) {
  return Math.min(...numbers(range).map(valueAt));
}

function maxOver(range, valueAt) {
  return Math.max(...numbers(range).map(valueAt));
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

function coefficientsForGap(strip, orientation) {
  const coefficients = {};
  if (orientation === "source_below_receiver") {
    coefficients.b_T = cleanNumber(
      minOver(strip.receiver_theta_range, (theta) => theta) - maxOver(strip.source_theta_range, (theta) => theta)
    );
    for (const arc of arcs) {
      coefficients[arc.basis] = cleanNumber(
        minOver(strip.receiver_theta_range, (theta) => deltaCoordinateBasisValue(strip.ledger, theta, arc.basis)) -
          maxOver(strip.source_theta_range, (theta) => deltaCoordinateBasisValue(strip.ledger, theta, arc.basis))
      );
    }
    return coefficients;
  }

  coefficients.b_T = cleanNumber(
    minOver(strip.source_theta_range, (theta) => theta) - maxOver(strip.receiver_theta_range, (theta) => theta)
  );
  for (const arc of arcs) {
    coefficients[arc.basis] = cleanNumber(
      minOver(strip.source_theta_range, (theta) => deltaCoordinateBasisValue(strip.ledger, theta, arc.basis)) -
        maxOver(strip.receiver_theta_range, (theta) => deltaCoordinateBasisValue(strip.ledger, theta, arc.basis))
    );
  }
  return coefficients;
}

function assertV10Ledger(ledger) {
  if (ledger.schema !== "breather-causal-ledger-fresh-proof-interval-v10") {
    throw new Error("Proof-interval-v10 ledger schema mismatch.");
  }
  if (ledger.packet_id !== "fresh-same-packet-fold-shear-seed-v0") {
    throw new Error(`Unexpected packet_id: ${ledger.packet_id}`);
  }
  if (!Array.isArray(ledger.parent_complement_strips_v10) || ledger.parent_complement_strips_v10.length !== 10) {
    throw new Error("Expected exactly 10 v10 parent-complement strips.");
  }
  if (ledger.branch_chart_authorized || ledger.preledger_pass || ledger.updates_live_ledger) {
    throw new Error("Imported v10 unexpectedly authorizes a live preledger or branch chart.");
  }
}

function structuralConstraints(periodMode) {
  if (periodMode === "free") {
    return [];
  }
  return [
    {
      id: "fixed_period_tangent",
      coefficients: { b_T: 1 },
      target: 0,
      meaning: "Diagnostic fixed-period comparison row; the active v10 repair target uses the free-period run.",
    },
  ];
}

function buildInput(ledger, periodMode) {
  assertV10Ledger(ledger);
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
      coefficients: coefficientsForGap(strip, gap.orientation),
    };
  });

  return {
    schema: OUTPUT_SCHEMA,
    packet_id: `fresh-v10-local-shear-${periodMode}-period-strict-gap-matrix-v0`,
    packet_identity: {
      source_packet: ledger.packet_id,
      source_refinement: ledger.refinement_id,
      matrix_status: `diagnostic_v10_parent_complement_local_shear_${periodMode}_period_not_full_candidate`,
      basis_model: "half_period_antisymmetric_c1_arc_bumps",
      period_mode: periodMode,
    },
    source:
      "Proof-interval-v10 parent-complement collars evaluated against the existing half-period-antisymmetric C1 shear basis on A0, A1, and A2.",
    claim_limits: {
      claims_breather: false,
      claims_preledger_pass: false,
      claims_branch_chart_authorization: false,
      claims_interval_certification: false,
      claims_live_candidate: false,
      claims_full_structural_jacobian: false,
    },
    basis_definition: {
      first_half_arcs: arcs,
      formula:
        "psi_Aj(theta)=sin(pi*(theta-L_j)/(R_j-L_j))^2 on arc A_j and 0 outside; H(theta+1/2)=-H(theta).",
      coordinate_functionals: {
        w: "z_w(theta)=T_cyc theta + X(theta)",
        u: "z_u(theta)=T_cyc theta - X(theta)",
      },
      strict_gap_orientations: {
        source_below_receiver: "delta=inf_R z_l - sup_S z_l",
        receiver_below_source: "delta=inf_S z_l - sup_R z_l",
      },
      endpoint_extrema_note:
        "Rows use endpoint extrema for the listed v10 collar intervals; this is a finite tangent matrix, not outward-rounded interval certification.",
    },
    variables: [
      {
        id: "b_T",
        meaning: "period tangent column in z_l(theta)=T_cyc theta +/- X(theta)",
      },
      ...arcs.map((arc) => ({
        id: arc.basis,
        meaning: `C1 ${arc.id} arc bump shear, extended by H(theta+1/2)=-H(theta)`,
      })),
    ],
    structural_constraints: structuralConstraints(periodMode),
    gap_constraints: gapConstraints,
    source_summary: ledger.summary,
    limitations: [
      "Diagnostic finite tangent matrix only; it is not a full structural Jacobian for a solved candidate.",
      "Endpoint extrema are not outward-rounded interval lower bounds.",
      "A feasible witness must still be integrated into a repaired or successor candidate and rerun through the proof-interval pre-ledger.",
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
  const ledger = readJson(path.resolve(args.v10Ledger));
  const input = buildInput(ledger, args.periodMode);
  const outputPath = path.resolve(args.out);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(input, null, args.pretty ? 2 : 0)}\n`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

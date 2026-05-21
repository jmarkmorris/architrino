#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const DEFAULT_INPUT =
  "reference/priorities/proof-programs/breather-proof/certificate/gap_opening_live_fold_shear_input.seed_cosine_residuals.v0.json";
const DEFAULT_RESULT =
  "reference/priorities/proof-programs/breather-proof/certificate/gap_opening_live_fold_shear_result.seed_cosine_residuals.v0.json";
const DEFAULT_OUT =
  "reference/priorities/proof-programs/breather-proof/certificate/fold_shear_deformed_candidate.seed_cosine_residuals.v0.json";

const T_CYC = 6.28318530718;
const AMPLITUDE = 1.25;
const SIGMA_1 = 0.14758361765;
const SIGMA_2 = 0.35241638235;
const EPSILON_FALLBACK = 1 / 16;

const ARCS = [
  { id: "A0", theta_range: [0, SIGMA_1], basis: "h_A0" },
  { id: "A1", theta_range: [SIGMA_1, SIGMA_2], basis: "h_A1" },
  { id: "A2", theta_range: [SIGMA_2, 0.5], basis: "h_A2" },
];

function parseArgs(argv) {
  const args = {
    input: DEFAULT_INPUT,
    result: DEFAULT_RESULT,
    out: DEFAULT_OUT,
    epsilon: null,
    pretty: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--input") {
      args.input = argv[++i];
    } else if (arg === "--result") {
      args.result = argv[++i];
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else if (arg === "--epsilon") {
      args.epsilon = parsePositiveNumber(argv[++i], "--epsilon");
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fold-shear-finite-deformation.mjs [options]

Options:
  --input PATH    Live fold-shear scanner input. Defaults to ${DEFAULT_INPUT}.
  --result PATH   Live fold-shear scanner result. Defaults to ${DEFAULT_RESULT}.
  --out PATH      Output finite deformation JSON. Defaults to ${DEFAULT_OUT}.
  --epsilon N     Override deformation parameter.
  --pretty        Pretty-print JSON.
  --help          Show this help.`);
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

function cleanEndpointZero(value) {
  if (Math.abs(value) < 1e-12) {
    return 0;
  }
  return cleanNumber(value);
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

function shearValue(theta, witness) {
  return ARCS.reduce((sum, arc) => sum + (witness[arc.basis] ?? 0) * bumpValue(theta, arc), 0);
}

function shearDerivative(theta, witness) {
  return ARCS.reduce((sum, arc) => sum + (witness[arc.basis] ?? 0) * bumpDerivative(theta, arc), 0);
}

function baseX(theta) {
  return AMPLITUDE * Math.cos(2 * Math.PI * theta);
}

function baseXPrime(theta) {
  return -2 * Math.PI * AMPLITUDE * Math.sin(2 * Math.PI * theta);
}

function deformedX(theta, epsilon, witness) {
  return baseX(theta) + epsilon * shearValue(theta, witness);
}

function deformedXDot(theta, epsilon, witness) {
  return (baseXPrime(theta) + epsilon * shearDerivative(theta, witness)) / T_CYC;
}

function sampleExtrema(epsilon, witness) {
  const samples = 20000;
  let maxAbsShear = 0;
  let maxAbsXDot = 0;
  let minX = Infinity;
  let maxX = -Infinity;
  for (let i = 0; i <= samples; i += 1) {
    const theta = i / samples;
    const h = shearValue(theta, witness);
    const x = deformedX(theta, epsilon, witness);
    const xdot = deformedXDot(theta, epsilon, witness);
    maxAbsShear = Math.max(maxAbsShear, Math.abs(h));
    maxAbsXDot = Math.max(maxAbsXDot, Math.abs(xdot));
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
  }
  return {
    sample_count: samples + 1,
    max_abs_H: cleanNumber(maxAbsShear),
    max_abs_epsilon_H: cleanNumber(epsilon * maxAbsShear),
    max_abs_xdot_sampled: cleanNumber(maxAbsXDot),
    x_range_sampled: [cleanNumber(minX), cleanNumber(maxX)],
  };
}

function resultRowsById(result) {
  return new Map(result.gap_rows.map((row) => [row.id, row]));
}

function finiteGapRows(input, result, epsilon) {
  const byId = resultRowsById(result);
  return input.gap_constraints.map((row) => {
    const resultRow = byId.get(row.id);
    if (!resultRow) {
      throw new Error(`Missing scanner result row for ${row.id}`);
    }
    const derivativeAtWitness = resultRow.value_after_required_margin + resultRow.required_margin;
    return {
      id: row.id,
      collar_id: row.collar_id,
      ledger: row.ledger,
      residual_type: row.residual_type,
      orientation: row.orientation,
      required_margin: cleanNumber(resultRow.required_margin),
      derivative_at_witness: cleanNumber(derivativeAtWitness),
      epsilon_min_open: cleanNumber(resultRow.required_margin / derivativeAtWitness),
      finite_gap_surplus: cleanNumber(epsilon * derivativeAtWitness - resultRow.required_margin),
    };
  });
}

function chooseEpsilon(rows, override) {
  const epsilonMin = Math.max(...rows.map((row) => row.epsilon_min_open));
  const controllingRows = rows
    .filter((row) => Math.abs(row.epsilon_min_open - epsilonMin) <= 1e-10)
    .map((row) => row.id);
  if (override !== null) {
    if (override <= epsilonMin) {
      throw new Error(`--epsilon must exceed epsilon_min ${epsilonMin}`);
    }
    return { epsilon: override, epsilonMin, controllingRows };
  }
  const recommended = Math.max(EPSILON_FALLBACK, epsilonMin * 1.2);
  return { epsilon: recommended, epsilonMin, controllingRows };
}

function separatorState(theta, epsilon, witness) {
  return {
    theta,
    x: cleanNumber(deformedX(theta, epsilon, witness)),
    xdot: cleanNumber(deformedXDot(theta, epsilon, witness)),
    H: cleanEndpointZero(shearValue(theta, witness)),
    H_prime_theta: cleanEndpointZero(shearDerivative(theta, witness)),
  };
}

function buildArtifact(input, result, epsilonOverride) {
  const witness = result.witness;
  if (!witness) {
    throw new Error("Live fold-shear result must contain a strict witness.");
  }
  const preliminaryRows = finiteGapRows(input, result, 1);
  const { epsilon, epsilonMin, controllingRows } = chooseEpsilon(preliminaryRows, epsilonOverride);
  const rows = finiteGapRows(input, result, epsilon);
  return {
    schema: "breather-fold-shear-finite-deformation-v1",
    packet_id: "seed-cosine-fold-shear-deformed-v0",
    source_packet: input.packet_identity?.source_packet ?? null,
    status: "finite_candidate_seed_not_preledger",
    claim_level:
      "finite candidate-history deformation opening declared residual collars in the local fold-shear matrix",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    epsilon_policy: {
      epsilon_min_open_all_listed_collars: cleanNumber(epsilonMin),
      epsilon_chosen: cleanNumber(epsilon),
      controlling_rows: controllingRows,
      rule: "choose epsilon > max_m(required_margin_m / derivative_at_witness_m)",
    },
    base_candidate: {
      x_theta: "1.25*cos(2*pi*theta)",
      T_cyc: T_CYC,
      source_packet: input.packet_identity?.source_packet ?? null,
    },
    deformation: {
      formula:
        "X_epsilon(theta)=1.25*cos(2*pi*theta)+epsilon*H(theta), with H(theta+1/2)=-H(theta)",
      witness,
      first_half_arcs: input.basis_definition?.first_half_arcs ?? ARCS,
    },
    exact_structural_preservation_by_basis: [
      "periodic identification",
      "half-period antisymmetry",
      "section displacement X(0)",
      "section velocity X'(0)/T_cyc",
      "separator displacement at Sigma_1 through Sigma_4",
      "separator velocity at Sigma_1 through Sigma_4",
      "C1 matching at first-half arc boundaries and their half-period mirrors",
    ],
    separator_states: [
      separatorState(SIGMA_1, epsilon, witness),
      separatorState(SIGMA_2, epsilon, witness),
      separatorState(SIGMA_1 + 0.5, epsilon, witness),
      separatorState(SIGMA_2 + 0.5, epsilon, witness),
    ],
    sampled_bounds_not_certificates: sampleExtrema(epsilon, witness),
    residual_gap_rows: rows,
    min_finite_gap_surplus: cleanNumber(Math.min(...rows.map((row) => row.finite_gap_surplus))),
    limitations: [
      "This is a finite candidate seed, not an EOM-solved returned sample.",
      "The residual gap rows are finite calculations, not outward-rounded interval pre-ledger rows.",
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
  const input = readJson(path.resolve(args.input));
  const result = readJson(path.resolve(args.result));
  const artifact = buildArtifact(input, result, args.epsilon);
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

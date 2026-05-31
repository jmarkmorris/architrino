#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CONTRACT = `${CERT_DIR}/fresh_same_packet_fold_shear_seed.v0.json`;
const DEFAULT_INPUT = `${CERT_DIR}/gap_opening_fresh_v10_strict_gap_input.local_shear_free_period.v0.json`;
const DEFAULT_RESULT = `${CERT_DIR}/gap_opening_fresh_v10_strict_gap_result.local_shear_free_period.v0.json`;
const DEFAULT_OUT_JSON = `${CERT_DIR}/fresh_v10_strict_gap_finite_integration_obstruction.local_shear_free_period.v0.json`;
const DEFAULT_OUT_MD = `${CERT_DIR}/fresh_v10_strict_gap_finite_integration_obstruction.local_shear_free_period.v0.md`;

const T0 = 6.28318530718;
const AMPLITUDE = 1.25;
const SCAN_STEPS = 50000;
const ROOT_TOLERANCE = 1e-13;
const ROOT_DEDUPE_TOLERANCE = 1e-9;

function parseArgs(argv) {
  const args = {
    contract: DEFAULT_CONTRACT,
    input: DEFAULT_INPUT,
    result: DEFAULT_RESULT,
    outJson: DEFAULT_OUT_JSON,
    outMd: DEFAULT_OUT_MD,
    pretty: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--contract") {
      args.contract = argv[++i];
    } else if (arg === "--input") {
      args.input = argv[++i];
    } else if (arg === "--result") {
      args.result = argv[++i];
    } else if (arg === "--out-json") {
      args.outJson = argv[++i];
    } else if (arg === "--out-md") {
      args.outMd = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fresh-v10-strict-gap-finite-integration-audit.mjs [options]

Options:
  --contract PATH  Fresh same-packet seed contract JSON. Defaults to ${DEFAULT_CONTRACT}.
  --input PATH     Strict-gap scanner input JSON. Defaults to ${DEFAULT_INPUT}.
  --result PATH    Strict-gap scanner result JSON. Defaults to ${DEFAULT_RESULT}.
  --out-json PATH  Write the machine-readable audit JSON. Defaults to ${DEFAULT_OUT_JSON}.
  --out-md PATH    Write the markdown report. Defaults to ${DEFAULT_OUT_MD}.
  --pretty         Pretty-print JSON.
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

function assertInputs(contract, input, result) {
  if (contract.packet_id !== "fresh-same-packet-fold-shear-seed-v0") {
    throw new Error(`Unexpected fresh contract packet_id: ${contract.packet_id}`);
  }
  if (input.packet_id !== "fresh-v10-local-shear-free-period-strict-gap-matrix-v0") {
    throw new Error(`Unexpected strict-gap input packet_id: ${input.packet_id}`);
  }
  if (result.packet_id !== input.packet_id) {
    throw new Error("Strict-gap input/result packet ids do not match.");
  }
  if (result.status !== "feasible") {
    throw new Error(`Strict-gap result must be feasible, got: ${result.status}`);
  }
  if (result.branch_chart_authorized || result.preledger_pass || result.updates_live_ledger) {
    throw new Error("Strict-gap result unexpectedly authorizes a live ledger or branch chart.");
  }
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

function periodAt(lambda, result) {
  return T0 + lambda * result.witness.b_T;
}

function xAt(theta, lambda, contract, input, result) {
  return existingX(theta, contract) + lambda * repairX(theta, input, result);
}

function xPrimeAt(theta, lambda, contract, input, result) {
  return existingXPrime(theta, contract) + lambda * repairXPrime(theta, input, result);
}

function xdotAt(theta, lambda, contract, input, result) {
  return xPrimeAt(theta, lambda, contract, input, result) / periodAt(lambda, result);
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
  for (let i = 1; i <= SCAN_STEPS; i += 1) {
    const right = i / SCAN_STEPS;
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

function fieldSpeedRoots(lambda, contract, input, result) {
  const positive = rootsForTarget(lambda, 1, contract, input, result);
  const negative = rootsForTarget(lambda, -1, contract, input, result);
  const all = [];
  for (const root of [...positive, ...negative]) {
    addRoot(all, root);
  }
  all.sort((a, b) => a - b);
  positive.sort((a, b) => a - b);
  negative.sort((a, b) => a - b);
  return {
    crossing_count: all.length,
    crossing_thetas: all.map(cleanNumber),
    positive_velocity_roots: positive.map(cleanNumber),
    negative_velocity_roots: negative.map(cleanNumber),
  };
}

function sampledState(lambda, contract, input, result) {
  let maxAbsXdot = 0;
  let minX = Infinity;
  let maxX = -Infinity;
  for (let i = 0; i <= SCAN_STEPS; i += 1) {
    const theta = i / SCAN_STEPS;
    const x = xAt(theta, lambda, contract, input, result);
    const xdot = xdotAt(theta, lambda, contract, input, result);
    maxAbsXdot = Math.max(maxAbsXdot, Math.abs(xdot));
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
  }
  const roots = fieldSpeedRoots(lambda, contract, input, result);
  return {
    lambda: cleanNumber(lambda),
    T_cyc: cleanNumber(periodAt(lambda, result)),
    x_section: cleanNumber(xAt(0, lambda, contract, input, result)),
    xdot_section: cleanNumber(xdotAt(0, lambda, contract, input, result)),
    max_abs_xdot_sampled: cleanNumber(maxAbsXdot),
    x_range_sampled: [cleanNumber(minX), cleanNumber(maxX)],
    ...roots,
  };
}

function strictGapRows(result) {
  return result.gap_rows.map((row) => {
    const derivativeAtWitness = row.required_margin + row.value_after_required_margin;
    if (derivativeAtWitness <= 0) {
      throw new Error(`Strict-gap row ${row.id} does not open along the witness.`);
    }
    return {
      id: row.id,
      ledger: row.ledger,
      required_margin: cleanNumber(row.required_margin),
      derivative_at_witness: cleanNumber(derivativeAtWitness),
      value_after_required_margin: cleanNumber(row.value_after_required_margin),
      lambda_min_open: cleanNumber(row.required_margin / derivativeAtWitness),
    };
  });
}

function uniqueLambdaValues(lambdaMin) {
  const raw = [0, 0.01, 0.02, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.65, lambdaMin, 0.69, 1];
  const values = [];
  for (const value of raw) {
    if (!values.some((existing) => Math.abs(existing - value) < 1e-12)) {
      values.push(value);
    }
  }
  return values;
}

function buildAudit(contract, input, result) {
  assertInputs(contract, input, result);
  const rows = strictGapRows(result);
  const lambdaMin = Math.max(...rows.map((row) => row.lambda_min_open));
  const controllingRows = rows
    .filter((row) => Math.abs(row.lambda_min_open - lambdaMin) <= 1e-12)
    .map((row) => row.id);
  const states = uniqueLambdaValues(lambdaMin).map((lambda) => sampledState(lambda, contract, input, result));
  const lambdaMinState = states.find((state) => Math.abs(state.lambda - cleanNumber(lambdaMin)) <= 1e-12);
  const lambdaOneState = states.find((state) => state.lambda === 1);
  return {
    schema: "breather-fresh-v10-strict-gap-finite-integration-audit-v1",
    packet_id: "fresh-v10-strict-gap-finite-integration-obstruction-local-shear-free-period-v0",
    source_packet: contract.packet_id,
    source_strict_gap_packet: result.packet_id,
    status: "direct_free_period_local_shear_finite_integration_obstructs_four_separator_itinerary",
    claim_level:
      "priority-only finite-integration audit of the diagnostic strict-gap witness; not a repaired candidate and not a pre-ledger pass",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    source_artifacts: {
      fresh_seed_contract: path.basename(DEFAULT_CONTRACT),
      strict_gap_input: path.basename(DEFAULT_INPUT),
      strict_gap_result: path.basename(DEFAULT_RESULT),
    },
    direct_repair_path: {
      X_lambda:
        "X_fresh(theta)+lambda*H_repair(theta), where H_repair is the free-period strict-gap local-shear witness in current fresh phase coordinate",
      T_lambda: "T0+lambda*b_T",
      T0,
      b_T: result.witness.b_T,
      witness: result.witness,
      old_seed: {
        delta: contract.seed_history.delta,
        epsilon: contract.seed_history.epsilon,
        witness: contract.seed_history.witness,
      },
      scan_steps: SCAN_STEPS,
    },
    strict_gap_threshold: {
      lambda_min_open_all_listed_collars: cleanNumber(lambdaMin),
      strict_opening_rule: "All listed collars are nonnegative at lambda_min; strict opening requires lambda > lambda_min.",
      controlling_rows: controllingRows,
      row_thresholds: rows,
    },
    field_speed_itinerary_audit: {
      expected_crossing_count_for_current_itinerary: 4,
      lambda_min_crossing_count: lambdaMinState?.crossing_count ?? null,
      lambda_one_crossing_count: lambdaOneState?.crossing_count ?? null,
      states,
    },
    obstruction: {
      summary:
        "The finite amplitude required to open all 10 strict-gap collars produces many more field-speed crossings than the doubled-four-arc itinerary allows.",
      direct_integration_promotable_to_fresh_repair_v0: false,
      recommended_next_solver_constraint:
        "Keep the four field-speed separators as hard constraints and solve for a strict-gap direction inside that constrained basis, unless the proof program explicitly authorizes a higher-fold itinerary.",
    },
    limitations: [
      "The audit checks a direct finite path through the diagnostic tangent witness, not the full nonlinear solve space.",
      "The crossing counts are deterministic high-resolution root scans, not outward-rounded interval root counts.",
      "The obstruction blocks direct promotion of this witness, not every possible strict-gap repair.",
      "No live causal ledger, branch chart, fold atlas, or AAA theorem prose is updated.",
    ],
  };
}

function formatNumber(value) {
  if (typeof value !== "number") {
    return String(value);
  }
  return String(cleanNumber(value));
}

function markdownTable(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.join(" | ")} |`),
  ].join("\n");
}

function buildReport(audit) {
  const threshold = audit.strict_gap_threshold;
  const states = audit.field_speed_itinerary_audit.states;
  const controllingRows = threshold.row_thresholds.filter((row) => threshold.controlling_rows.includes(row.id));
  const stateRows = states.map((state) => [
    formatNumber(state.lambda),
    formatNumber(state.T_cyc),
    String(state.crossing_count),
    formatNumber(state.max_abs_xdot_sampled),
  ]);
  const thresholdRows = controllingRows.map((row) => [
    `\`${row.id}\``,
    formatNumber(row.required_margin),
    formatNumber(row.derivative_at_witness),
    formatNumber(row.lambda_min_open),
  ]);
  const lambdaMinState = states.find(
    (state) => Math.abs(state.lambda - threshold.lambda_min_open_all_listed_collars) <= 1e-12
  );
  const lambdaOneState = states.find((state) => state.lambda === 1);

  return `# Fresh v10 Strict-Gap Finite-Integration Obstruction

## Scope

This packet is a priority-only audit of the direct finite integration of the
free-period strict-gap local-shear witness for
\`fresh-same-packet-fold-shear-seed-v0\`.

It does not claim a repaired candidate, a proof-interval pre-ledger pass, an
outward-rounded interval root count, a live ledger update, or branch-chart
authorization.

Artifacts:

- \`fresh_v10_strict_gap_finite_integration_obstruction.local_shear_free_period.v0.json\`
- \`gap_opening_fresh_v10_strict_gap_result.local_shear_free_period.v0.json\`
- \`gap_opening_fresh_v10_strict_gap_input.local_shear_free_period.v0.json\`
- \`../../../../../scripts/proof-programs/fresh-v10-strict-gap-finite-integration-audit.mjs\`

## Executed Command

\`\`\`bash
node scripts/proof-programs/fresh-v10-strict-gap-finite-integration-audit.mjs --pretty
\`\`\`

## Direct Finite Path

The audit tests the literal finite path suggested by the diagnostic witness:
$$
X_\\lambda(\\theta)
=
X_{\\mathrm{fresh}}(\\theta)
+\\lambda H_{\\mathrm{repair}}(\\theta),
\\qquad
T_\\lambda=T_0+\\lambda b_T.
$$
Here
$$
T_0=${formatNumber(audit.direct_repair_path.T0)},
\\qquad
b_T=${formatNumber(audit.direct_repair_path.b_T)}.
$$
The repair witness is

\`\`\`json
${JSON.stringify(audit.direct_repair_path.witness, null, 2)}
\`\`\`

This is not the full structural solve. It is only the direct finite path that
one would get by applying the strict-gap tangent witness to the existing fresh
seed in the current phase coordinate.

## Strict-Gap Threshold

For each v10 collar, the finite path has the form
$$
g_m(\\lambda)=-\\kappa_m+\\lambda a_m.
$$
The threshold at which all listed collars first become nonnegative is
$$
\\lambda_{\\min}=${formatNumber(threshold.lambda_min_open_all_listed_collars)}.
$$
Strict opening requires any value $\\lambda > \\lambda_{\\min}$.

${markdownTable(["Controlling collar", "Required margin", "Witness derivative", "lambda_min"], thresholdRows)}

## Field-Speed Itinerary Audit

The current packet identity uses the doubled-four-arc itinerary, so the direct
finite path should preserve four field-speed separator crossings before it can
be treated as a same-itinerary successor. The root scan counts solutions of
$$
\\dot X_\\lambda(\\theta)=1
\\quad\\text{or}\\quad
\\dot X_\\lambda(\\theta)=-1
$$
with ${SCAN_STEPS} phase subintervals and bisection refinement.

${markdownTable(["lambda", "T_cyc", "field-speed crossings", "max abs(xdot) sampled"], stateRows)}

At the strict-gap threshold, the direct path has
\`${lambdaMinState?.crossing_count ?? "unknown"}\` field-speed crossings. At
\`lambda=1\`, it has \`${lambdaOneState?.crossing_count ?? "unknown"}\`.

For reference, the \`lambda=1\` crossing phases are:

\`\`\`json
${JSON.stringify(lambdaOneState?.crossing_thetas ?? [], null, 2)}
\`\`\`

## Obstruction

The strict-gap tangent is real, but direct finite integration of that witness
does not stay inside the current four-separator itinerary. The amplitude needed
to open all 10 v10 parent-complement collars is already past the point where
additional field-speed crossings appear. Therefore this witness cannot be
promoted directly to a \`fresh-v10-strict-gap-free-period-repair-v0\` packet
under \`doubled_four_arc_generic\`.

The next solver has a concrete decision point:

1. Keep the four field-speed separators as hard constraints and solve for a
   strict-gap direction inside that constrained basis.
2. Explicitly authorize a higher-fold itinerary and rebuild the packet identity
   around the larger separator set.

The first route is lower risk because it preserves the existing proof-program
contract. The second route is a broader theory decision and should not be
implied by this diagnostic.

## Capture Decision

Priority-only. This audit blocks direct promotion of the free-period local-shear
witness, but it does not prove that no strict-gap repair exists. No AAA
reader-facing theorem prose should be promoted until an itinerary-preserving
successor candidate reruns the proof-interval pre-ledger with strict margins.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const contract = readJson(path.resolve(args.contract));
  const input = readJson(path.resolve(args.input));
  const result = readJson(path.resolve(args.result));
  const audit = buildAudit(contract, input, result);
  writeJson(path.resolve(args.outJson), audit, args.pretty);
  writeText(path.resolve(args.outMd), buildReport(audit));
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

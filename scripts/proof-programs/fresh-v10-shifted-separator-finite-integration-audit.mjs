#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CONTRACT = `${CERT_DIR}/fresh_same_packet_fold_shear_seed.v0.json`;
const DEFAULT_INPUT = `${CERT_DIR}/gap_opening_fresh_v10_strict_gap_input.shifted_separator_fixed_period.v0.json`;
const DEFAULT_RESULT = `${CERT_DIR}/gap_opening_fresh_v10_strict_gap_result.shifted_separator_fixed_period.v0.json`;
const DEFAULT_OUT_JSON = `${CERT_DIR}/fresh_v10_shifted_separator_finite_integration_obstruction.fixed_period.v0.json`;
const DEFAULT_OUT_MD = `${CERT_DIR}/fresh_v10_shifted_separator_finite_integration_obstruction.fixed_period.v0.md`;

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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-shifted-separator-finite-integration-audit.mjs [options]

Options:
  --contract PATH  Fresh same-packet seed contract JSON. Defaults to ${DEFAULT_CONTRACT}.
  --input PATH     Shifted-separator strict-gap scanner input JSON. Defaults to ${DEFAULT_INPUT}.
  --result PATH    Shifted-separator strict-gap scanner result JSON. Defaults to ${DEFAULT_RESULT}.
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
  if (input.packet_id !== "fresh-v10-shifted-separator-fixed-period-strict-gap-matrix-v0") {
    throw new Error(`Unexpected shifted strict-gap input packet_id: ${input.packet_id}`);
  }
  if (result.packet_id !== input.packet_id) {
    throw new Error("Strict-gap input/result packet ids do not match.");
  }
  if (result.status !== "feasible") {
    throw new Error(`Shifted strict-gap result must be feasible, got: ${result.status}`);
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

function xAt(theta, lambda, contract, input, result) {
  return existingX(theta, contract) + lambda * repairX(theta, input, result);
}

function xdotAt(theta, lambda, contract, input, result) {
  return (existingXPrime(theta, contract) + lambda * repairXPrime(theta, input, result)) / T0;
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
    root_count: all.length,
    root_thetas: all.map(cleanNumber),
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
    T_cyc: T0,
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
  const raw = [0, 0.01, 0.02, 0.03, 0.04, 0.05, 0.1, 0.2, lambdaMin, 0.3, 0.4, 1];
  const values = [];
  for (const value of raw.sort((a, b) => a - b)) {
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
    schema: "breather-fresh-v10-shifted-separator-finite-integration-audit-v1",
    packet_id: "fresh-v10-shifted-separator-finite-integration-obstruction-fixed-period-v0",
    source_packet: contract.packet_id,
    source_strict_gap_packet: result.packet_id,
    status: "shifted_separator_fixed_period_tangent_feasible_but_direct_finite_integration_obstructs_itinerary",
    claim_level:
      "priority-only finite-integration audit of the shifted-separator strict-gap witness; not a repaired candidate and not a pre-ledger pass",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    source_artifacts: {
      fresh_seed_contract: path.basename(DEFAULT_CONTRACT),
      shifted_separator_input: path.basename(DEFAULT_INPUT),
      shifted_separator_result: path.basename(DEFAULT_RESULT),
    },
    direct_repair_path: {
      X_lambda:
        "X_fresh(theta)+lambda*H_shifted(theta), where H_shifted is the shifted-separator fixed-period strict-gap witness",
      T_lambda: "T0",
      T0,
      witness: result.witness,
      first_half_arcs: input.basis_definition.first_half_arcs,
      scan_steps: SCAN_STEPS,
    },
    strict_gap_threshold: {
      lambda_min_nonnegative_all_listed_collars: cleanNumber(lambdaMin),
      strict_opening_rule: "All listed collars are nonnegative at lambda_min; strict opening requires lambda > lambda_min.",
      controlling_rows: controllingRows,
      row_thresholds: rows,
    },
    field_speed_itinerary_audit: {
      expected_root_count_for_current_itinerary: 4,
      lambda_min_root_count: lambdaMinState?.root_count ?? null,
      lambda_one_root_count: lambdaOneState?.root_count ?? null,
      states,
    },
    obstruction: {
      summary:
        "The shifted-separator fixed-period basis gives a strict tangent, but the direct finite amplitude needed to open all 10 collars creates additional field-speed roots.",
      direct_integration_promotable_to_fresh_repair_v0: false,
      recommended_next_solver_constraint:
        "Use the shifted-separator basis only inside a finite nonlinear solve that constrains the field-speed itinerary; do not promote the direct tangent path.",
    },
    limitations: [
      "The audit checks a direct finite path through one tangent witness, not the full nonlinear constrained solve space.",
      "The root counts are deterministic high-resolution root scans, not outward-rounded interval root counts.",
      "The obstruction blocks direct promotion of this shifted witness, not every possible strict-gap repair.",
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
    String(state.root_count),
    formatNumber(state.max_abs_xdot_sampled),
  ]);
  const thresholdRows = controllingRows.map((row) => [
    `\`${row.id}\``,
    formatNumber(row.required_margin),
    formatNumber(row.derivative_at_witness),
    formatNumber(row.lambda_min_open),
  ]);
  const lambdaMinState = states.find(
    (state) => Math.abs(state.lambda - threshold.lambda_min_nonnegative_all_listed_collars) <= 1e-12
  );

  return `# Fresh v10 Shifted-Separator Finite-Integration Obstruction

## Scope

This packet is a priority-only audit of the direct finite integration of the
shifted-separator fixed-period strict-gap witness for
\`fresh-same-packet-fold-shear-seed-v0\`.

It does not claim a repaired candidate, a proof-interval pre-ledger pass, an
outward-rounded interval root count, a live ledger update, or branch-chart
authorization.

Artifacts:

- \`gap_opening_fresh_v10_strict_gap_input.shifted_separator_fixed_period.v0.json\`
- \`gap_opening_fresh_v10_strict_gap_result.shifted_separator_fixed_period.v0.json\`
- \`fresh_v10_shifted_separator_finite_integration_obstruction.fixed_period.v0.json\`
- \`../../../../../scripts/proof-programs/fresh-v10-shifted-separator-strict-gap-matrix-builder.mjs\`
- \`../../../../../scripts/proof-programs/fresh-v10-shifted-separator-finite-integration-audit.mjs\`

## Executed Commands

\`\`\`bash
node scripts/proof-programs/fresh-v10-shifted-separator-strict-gap-matrix-builder.mjs --pretty
node scripts/proof-programs/null-coordinate-gap-opening-scanner.mjs --input reference/priorities/proof-programs/breather-proof/certificate/gap_opening_fresh_v10_strict_gap_input.shifted_separator_fixed_period.v0.json --out reference/priorities/proof-programs/breather-proof/certificate/gap_opening_fresh_v10_strict_gap_result.shifted_separator_fixed_period.v0.json --pretty
node scripts/proof-programs/fresh-v10-shifted-separator-finite-integration-audit.mjs --pretty
\`\`\`

## Tangent Result

The shifted basis uses the current fresh separator phases as the arc endpoints,
so the $C^1$ bumps have zero $\\theta$-derivative at those phases. At fixed
period this preserves the separator velocities to first order.

The scanner accepts the declared candidate witness:

\`\`\`json
${JSON.stringify(audit.direct_repair_path.witness, null, 2)}
\`\`\`

For the declared finite matrix, the minimum post-margin tangent surplus is
positive. This is a useful tangent-space result, but it is not a finite
candidate.

## Strict-Gap Threshold

For each v10 collar, the direct finite path has the form
$$
g_m(\\lambda)=-\\kappa_m+\\lambda a_m.
$$
The threshold at which all listed collars first become nonnegative is
$$
\\lambda_{\\min}=${formatNumber(threshold.lambda_min_nonnegative_all_listed_collars)}.
$$
Strict opening requires any value $\\lambda > \\lambda_{\\min}$.

${markdownTable(["Controlling collar", "Required margin", "Witness derivative", "lambda_min"], thresholdRows)}

## Field-Speed Itinerary Audit

The direct finite path is
$$
X_\\lambda(\\theta)
=
X_{\\mathrm{fresh}}(\\theta)
+\\lambda H_{\\mathrm{shifted}}(\\theta),
\\qquad
T_\\lambda=T_0.
$$
The root scan counts solutions of
$$
\\dot X_\\lambda(\\theta)=1
\\quad\\text{or}\\quad
\\dot X_\\lambda(\\theta)=-1
$$
with ${SCAN_STEPS} phase subintervals and bisection refinement.

${markdownTable(["lambda", "field-speed roots", "max abs(xdot) sampled"], stateRows)}

At the strict-gap threshold, the direct path has
\`${lambdaMinState?.root_count ?? "unknown"}\` field-speed roots.

## Obstruction

The shifted-separator basis is better than the original free-period local-shear
direction as a tangent-space object: it opens all 10 v10 collars at fixed period
and preserves the separator velocities to first order. Direct finite integration
still does not stay inside the current itinerary. The finite amplitude required
to open all collars creates additional field-speed roots before the strict-gap
threshold is reached.

Therefore the shifted witness should not be promoted directly to a repaired
candidate. Its value is to define the next constrained solver basis: keep the
shifted-separator degrees of freedom, but solve the finite strict-gap problem
with explicit field-speed-itinerary inequalities rather than following the
linear tangent ray.

## Capture Decision

Priority-only. This is a solver-direction artifact and a direct-path
obstruction, not reader-facing theorem prose. Promotion should wait until a
finite nonlinear candidate preserves the itinerary and reruns the proof-interval
pre-ledger with strict margins.
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

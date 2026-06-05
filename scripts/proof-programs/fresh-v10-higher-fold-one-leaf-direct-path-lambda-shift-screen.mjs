#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CONTRACT = `${CERT_DIR}/fresh_same_packet_fold_shear_seed.v0.json`;
const DEFAULT_INPUT = `${CERT_DIR}/gap_opening_fresh_v10_strict_gap_input.shifted_separator_fixed_period.v0.json`;
const DEFAULT_RESULT = `${CERT_DIR}/gap_opening_fresh_v10_strict_gap_result.shifted_separator_fixed_period.v0.json`;
const DEFAULT_PHI_CYC = `${CERT_DIR}/phi_cyc.${PACKET_ID}.json`;
const DEFAULT_MESH = `${CERT_DIR}/mesh.${PACKET_ID}.json`;
const DEFAULT_PROBE = `${CERT_DIR}/one_leaf_boundary_movement_probe.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `one_leaf_direct_path_lambda_shift_screen.${PACKET_ID}.proof-interval-v6.json`;
const OUTPUT_REPORT = `one_leaf_direct_path_lambda_shift_screen_report.${PACKET_ID}.proof-interval-v6.md`;
const DEFAULT_TRIAL_LAMBDA = 0.305;
const DEFAULT_SAMPLE_COUNT = 50000;
const T0 = 6.28318530718;
const AMPLITUDE = 1.25;

function parseArgs(argv) {
  const args = {
    contract: DEFAULT_CONTRACT,
    input: DEFAULT_INPUT,
    result: DEFAULT_RESULT,
    phiCyc: DEFAULT_PHI_CYC,
    mesh: DEFAULT_MESH,
    probe: DEFAULT_PROBE,
    outDir: DEFAULT_OUT_DIR,
    trialLambda: DEFAULT_TRIAL_LAMBDA,
    sampleCount: DEFAULT_SAMPLE_COUNT,
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
    } else if (arg === "--phi-cyc") {
      args.phiCyc = argv[++i];
    } else if (arg === "--mesh") {
      args.mesh = argv[++i];
    } else if (arg === "--probe") {
      args.probe = argv[++i];
    } else if (arg === "--out-dir") {
      args.outDir = argv[++i];
    } else if (arg === "--trial-lambda") {
      args.trialLambda = Number(argv[++i]);
    } else if (arg === "--sample-count") {
      args.sampleCount = Number.parseInt(argv[++i], 10);
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (!Number.isFinite(args.trialLambda) || args.trialLambda <= 0) {
    throw new Error("--trial-lambda must be a positive finite number.");
  }
  if (!Number.isSafeInteger(args.sampleCount) || args.sampleCount < 2) {
    throw new Error("--sample-count must be a safe integer at least 2.");
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-one-leaf-direct-path-lambda-shift-screen.mjs [options]

Options:
  --contract PATH      Fresh seed contract JSON. Defaults to ${DEFAULT_CONTRACT}.
  --input PATH         Shifted-separator strict-gap input JSON. Defaults to ${DEFAULT_INPUT}.
  --result PATH        Shifted-separator strict-gap result JSON. Defaults to ${DEFAULT_RESULT}.
  --phi-cyc PATH       Higher-fold phi_cyc JSON. Defaults to ${DEFAULT_PHI_CYC}.
  --mesh PATH          Higher-fold mesh JSON. Defaults to ${DEFAULT_MESH}.
  --probe PATH         One-leaf boundary movement probe. Defaults to ${DEFAULT_PROBE}.
  --out-dir PATH       Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --trial-lambda NUM   Candidate direct-path lambda to screen. Defaults to ${DEFAULT_TRIAL_LAMBDA}.
  --sample-count N     Samples per interval boundary scan. Defaults to ${DEFAULT_SAMPLE_COUNT}.
  --pretty             Pretty-print JSON artifact.
  --help               Show this help.`);
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

function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
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

function qToNumber(value) {
  if (value.display !== undefined) {
    return Number(value.display);
  }
  return Number(BigInt(value.num)) / Number(BigInt(value.den));
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

function shearValue(theta, arcs, witness) {
  return arcs.reduce((sum, arc) => sum + (witness[arc.basis] ?? 0) * bumpValue(theta, arc), 0);
}

function baseX(theta) {
  return AMPLITUDE * Math.cos(2 * Math.PI * theta);
}

function seedTheta(theta, contract) {
  return modOne(theta + contract.seed_history.delta);
}

function existingX(theta, contract) {
  const oldTheta = seedTheta(theta, contract);
  return baseX(oldTheta) + contract.seed_history.epsilon * shearValue(
    oldTheta,
    contract.seed_history.first_half_arcs,
    contract.seed_history.witness
  );
}

function repairX(theta, input, result) {
  return shearValue(theta, input.basis_definition.first_half_arcs, result.witness);
}

function xAt(theta, lambda, contract, input, result) {
  return existingX(theta, contract) + lambda * repairX(theta, input, result);
}

function ledgerValue(theta, ledger, liftPeriods, lambda, contract, input, result) {
  const t = T0 * theta + liftPeriods * T0;
  const x = xAt(theta, lambda, contract, input, result);
  return ledger === "u" ? t - x : t + x;
}

function ledgerDerivative(theta, ledger, input, result) {
  const derivative = repairX(theta, input, result);
  return ledger === "u" ? -derivative : derivative;
}

function sourceLift(receiver, source) {
  return source.order > receiver.order ? -1 : 0;
}

function boundaryScan(interval, ledger, liftPeriods, lambda, side, sampleCount, contract, input, result) {
  const [left, right] = interval.theta_range.map(Number);
  let bestTheta = left;
  let bestValue = ledgerValue(left, ledger, liftPeriods, lambda, contract, input, result);
  const better = side === "lo" ? (candidate, best) => candidate < best : (candidate, best) => candidate > best;
  for (let index = 1; index <= sampleCount; index += 1) {
    const theta = left + (right - left) * index / sampleCount;
    const value = ledgerValue(theta, ledger, liftPeriods, lambda, contract, input, result);
    if (better(value, bestValue)) {
      bestValue = value;
      bestTheta = theta;
    }
  }
  return {
    theta: cleanNumber(bestTheta),
    value: cleanNumber(bestValue),
    lambda_derivative: cleanNumber(ledgerDerivative(bestTheta, ledger, input, result)),
  };
}

function rowBoundaryState(row, intervals, lambda, sampleCount, contract, input, result) {
  const receiver = intervals.get(row.receiver_interval);
  const source = intervals.get(row.source_interval);
  if (!receiver || !source) {
    throw new Error(`Missing mesh intervals for ${row.row_id}.`);
  }
  const boundarySide = row.failed_side === "lo" ? "lo" : "hi";
  const receiverBoundary = boundaryScan(receiver, row.ledger, 0, lambda, boundarySide, sampleCount, contract, input, result);
  const sourceBoundary = boundaryScan(
    source,
    row.ledger,
    sourceLift(receiver, source),
    lambda,
    boundarySide,
    sampleCount,
    contract,
    input,
    result
  );
  const defect =
    row.failed_side === "lo"
      ? sourceBoundary.value - receiverBoundary.value
      : receiverBoundary.value - sourceBoundary.value;
  const defectDerivative =
    row.failed_side === "lo"
      ? sourceBoundary.lambda_derivative - receiverBoundary.lambda_derivative
      : receiverBoundary.lambda_derivative - sourceBoundary.lambda_derivative;
  return {
    lambda: cleanNumber(lambda),
    boundary_side: boundarySide === "lo" ? "lower" : "upper",
    receiver_boundary: receiverBoundary,
    source_boundary: sourceBoundary,
    sampled_defect: cleanNumber(defect),
    sampled_defect_lambda_derivative_at_active_endpoints: cleanNumber(defectDerivative),
  };
}

function stableEndpoint(a, b) {
  return Math.abs(a.theta - b.theta) <= 1e-12;
}

function screenRow(row, intervals, baselineLambda, trialLambda, sampleCount, contract, input, result) {
  const baseline = rowBoundaryState(row, intervals, baselineLambda, sampleCount, contract, input, result);
  const trial = rowBoundaryState(row, intervals, trialLambda, sampleCount, contract, input, result);
  const required = qToNumber(row.required_strict_improvement_q);
  const candidateSourceShift =
    row.failed_side === "lo"
      ? baseline.source_boundary.value - trial.source_boundary.value
      : trial.source_boundary.value - baseline.source_boundary.value;
  const candidateReceiverShift =
    row.failed_side === "lo"
      ? trial.receiver_boundary.value - baseline.receiver_boundary.value
      : baseline.receiver_boundary.value - trial.receiver_boundary.value;
  const combinedOpening = candidateSourceShift + candidateReceiverShift;
  const combinedOpeningMargin = combinedOpening - required;
  const lambdaDerivative = baseline.sampled_defect_lambda_derivative_at_active_endpoints;
  const lambdaMinOpen =
    lambdaDerivative < 0 ? baselineLambda + required / (-lambdaDerivative) : null;
  const stableActiveEndpoints =
    stableEndpoint(baseline.source_boundary, trial.source_boundary) &&
    stableEndpoint(baseline.receiver_boundary, trial.receiver_boundary);

  return {
    row_id: row.row_id,
    cover_id: row.cover_id,
    ledger: row.ledger,
    receiver_interval: row.receiver_interval,
    source_interval: row.source_interval,
    failed_side: row.failed_side,
    required_strict_improvement_q: row.required_strict_improvement_q,
    required_strict_improvement_decimal: cleanNumber(required),
    baseline,
    trial,
    active_endpoint_stable_between_lambdas: stableActiveEndpoints,
    candidate_change_from_baseline_to_trial: {
      source_shift_favorable_sign_decimal: cleanNumber(candidateSourceShift),
      receiver_shift_favorable_sign_decimal: cleanNumber(candidateReceiverShift),
      combined_boundary_opening_decimal: cleanNumber(combinedOpening),
      combined_boundary_opening_margin_vs_probe_threshold_decimal: cleanNumber(combinedOpeningMargin),
      trial_sampled_defect_opened: trial.sampled_defect < 0,
      combined_opening_gt_probe_threshold: combinedOpening > required,
    },
    active_endpoint_lambda_budget: {
      baseline_lambda: cleanNumber(baselineLambda),
      trial_lambda: cleanNumber(trialLambda),
      defect_derivative_at_baseline_active_endpoints: cleanNumber(lambdaDerivative),
      lambda_min_open_from_probe_threshold_active_endpoint_screen:
        lambdaMinOpen === null ? null : cleanNumber(lambdaMinOpen),
      trial_lambda_margin_after_min_open:
        lambdaMinOpen === null ? null : cleanNumber(trialLambda - lambdaMinOpen),
    },
    proof_grade_status: {
      sampled_screen_only: true,
      root_topology_recertified_at_trial_lambda: false,
      proof_interval_preledger_rerun_at_trial_lambda: false,
      source_monotonicity_preserved_under_candidate_change: false,
      receiver_monotonicity_preserved_under_candidate_change: false,
      memory_margins_all_owned_components: false,
      endpoint_ownership_no_double_counting: false,
      simple_root_branch_reuse_exclusion: false,
      non_owned_complement_closed: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
  };
}

function buildScreen(files, args) {
  const { contract, input, result, phiCyc, mesh, probe } = files;
  if (phiCyc.packet_id !== PACKET_ID || mesh.packet_id !== PACKET_ID || probe.packet_id !== PACKET_ID) {
    throw new Error("Input packet ids must match the higher-fold packet.");
  }
  if (probe.branch_chart_authorized !== false || probe.preledger_pass !== false || probe.updates_live_ledger !== false) {
    throw new Error("Refusing to screen from an authorized or live-updating probe.");
  }
  const baselineLambda = Number(phiCyc.direct_path_seed.lambda);
  if (!Number.isFinite(baselineLambda)) {
    throw new Error("Missing finite baseline lambda in phi_cyc.direct_path_seed.lambda.");
  }
  if (args.trialLambda <= baselineLambda) {
    throw new Error("--trial-lambda must be greater than the baseline lambda for this opening screen.");
  }
  const intervals = new Map(mesh.preledger_intervals.map((interval) => [interval.interval_id, interval]));
  const rows = probe.rows.map((row) =>
    screenRow(row, intervals, baselineLambda, args.trialLambda, args.sampleCount, contract, input, result)
  );
  const lambdaMins = rows
    .map((row) => row.active_endpoint_lambda_budget.lambda_min_open_from_probe_threshold_active_endpoint_screen)
    .filter((value) => value !== null);
  const maxLambdaMin = Math.max(...lambdaMins);
  return {
    schema: "breather-higher-fold-one-leaf-direct-path-lambda-shift-screen-v1",
    packet_id: PACKET_ID,
    source_contract: path.basename(args.contract),
    source_contract_sha256: sha256File(args.contract),
    source_gap_input: path.basename(args.input),
    source_gap_input_sha256: sha256File(args.input),
    source_gap_result: path.basename(args.result),
    source_gap_result_sha256: sha256File(args.result),
    source_phi_cyc: path.basename(args.phiCyc),
    source_phi_cyc_sha256: sha256File(args.phiCyc),
    source_mesh: path.basename(args.mesh),
    source_mesh_sha256: sha256File(args.mesh),
    source_probe: path.basename(args.probe),
    source_probe_sha256: sha256File(args.probe),
    status: "one_leaf_direct_path_lambda_shift_screen_fail_closed",
    theorem_target: "One-Leaf Direct-Path Lambda Candidate-Change Screen",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only sampled active-endpoint screen for one-leaf boundary openings under direct-path lambda change; no proof-interval recertification and no row consumption",
    screen_rule:
      "Use the existing direct-path family X_seed(theta; lambda)=X_fresh(theta)+lambda*H_shifted(theta) to estimate the active boundary shifts from the baseline packet lambda to a trial lambda. A positive screen requires the favorable source and receiver boundary shifts to sum strictly above the exact one-leaf probe threshold. This screen is not a theorem until the trial lambda has root-topology recertification, proof-interval preledger classification, monotonicity and memory preservation, endpoint ownership/no-double-counting, branch-reuse exclusion, and non-owned-complement closure.",
    lambda_screen: {
      baseline_lambda: cleanNumber(baselineLambda),
      trial_lambda: cleanNumber(args.trialLambda),
      trial_lambda_increment: cleanNumber(args.trialLambda - baselineLambda),
      sample_count_per_boundary_interval: args.sampleCount,
      max_lambda_min_open_from_probe_threshold_active_endpoint_screen: cleanNumber(maxLambdaMin),
      trial_lambda_margin_after_max_min_open: cleanNumber(args.trialLambda - maxLambdaMin),
    },
    summary: {
      screen_rows: rows.length,
      active_endpoint_stable_rows: rows.filter((row) => row.active_endpoint_stable_between_lambdas).length,
      sampled_trial_defect_opened_rows: rows.filter(
        (row) => row.candidate_change_from_baseline_to_trial.trial_sampled_defect_opened
      ).length,
      combined_opening_gt_probe_threshold_rows: rows.filter(
        (row) => row.candidate_change_from_baseline_to_trial.combined_opening_gt_probe_threshold
      ).length,
      proof_grade_rows: 0,
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    rows,
    fail_closed_boundary:
      "The direct-path lambda screen supplies positive sampled active-endpoint boundary openings, but changing lambda changes the candidate data. It does not certify the trial packet's root topology, proof-interval preledger rows, source/receiver monotonicity preservation, memory margins, endpoint ownership/no-double-counting, branch-reuse exclusion, or non-owned complement closure.",
  };
}

function rowTable(rows) {
  return rows
    .map((row) => {
      const change = row.candidate_change_from_baseline_to_trial;
      const budget = row.active_endpoint_lambda_budget;
      return `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_strict_improvement_decimal} | ${row.baseline.sampled_defect} | ${row.trial.sampled_defect} | ${change.combined_boundary_opening_decimal} | ${change.combined_boundary_opening_margin_vs_probe_threshold_decimal} | ${budget.lambda_min_open_from_probe_threshold_active_endpoint_screen} | ${change.combined_opening_gt_probe_threshold} |`;
    })
    .join("\n");
}

function buildReport(screen) {
  return `# Higher-Fold One-Leaf Direct-Path Lambda Shift Screen

## Verdict

The direct-path lambda route gives a positive finite screen for the three
one-leaf boundary targets, but remains fail-closed as a proof artifact.

At the baseline packet value
\`lambda=${screen.lambda_screen.baseline_lambda}\`, the one-leaf constructor
records exact probe thresholds. Screening the same direct-path formula at
\`lambda=${screen.lambda_screen.trial_lambda}\` gives positive sampled
active-endpoint boundary openings for
${screen.summary.combined_opening_gt_probe_threshold_rows} / ${screen.summary.screen_rows}
rows. The largest active-endpoint threshold predicted by this screen is
\`lambda>${screen.lambda_screen.max_lambda_min_open_from_probe_threshold_active_endpoint_screen}\`,
so the trial value has margin
\`${screen.lambda_screen.trial_lambda_margin_after_max_min_open}\`.

This does not consume any row. The trial lambda has not been recertified for
root topology or rerun through the proof-interval preledger, and it does not
prove monotonicity, memory margins, endpoint ownership/no-double-counting,
branch-reuse exclusion, or non-owned-complement closure.

| Quantity | Value |
| --- | ---: |
| Screen rows | ${screen.summary.screen_rows} |
| Active endpoint stable rows | ${screen.summary.active_endpoint_stable_rows} |
| Trial sampled defects opened | ${screen.summary.sampled_trial_defect_opened_rows} |
| Combined openings above probe thresholds | ${screen.summary.combined_opening_gt_probe_threshold_rows} |
| Proof-grade rows | ${screen.summary.proof_grade_rows} |
| Row consumption count | ${screen.summary.row_consumption_count} |

## Screen Rows

| Row | Failed side | Probe threshold | Baseline sampled defect | Trial sampled defect | Combined opening | Opening margin | Active-endpoint lambda threshold | Positive screen |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${rowTable(screen.rows)}

## Interpretation

For the two low-side rows, increasing \`lambda\` lowers the source boundary more
than it lowers the receiver boundary, so the combined lower-boundary opening is
positive. For the high-side row, increasing \`lambda\` lowers the receiver upper
boundary more than it lowers the source upper boundary, so the combined
upper-boundary opening is positive. These are candidate-change directions, not
accepted same-packet theorem fields.

## Capture Decision

Priority-only finite screen. The result identifies a concrete next candidate
route: rebuild or recertify the higher-fold packet near
\`lambda=${screen.lambda_screen.trial_lambda}\`, then rerun the root topology and
proof-interval preledger before trying to consume the one-leaf rows. The screen
does not replace the one-leaf candidate-change boundary-data constructor; it
supplies the first positive candidate-change direction that could feed a future
proof-grade constructor.
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
    phiCyc: readJson(args.phiCyc),
    mesh: readJson(args.mesh),
    probe: readJson(args.probe),
  };
  const screen = buildScreen(files, args);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, screen, args.pretty);
  writeText(outReport, buildReport(screen));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();

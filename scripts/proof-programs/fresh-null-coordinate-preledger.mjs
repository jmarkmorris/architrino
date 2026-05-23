#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-same-packet-fold-shear-seed-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CONTRACT = `${CERT_DIR}/fresh_same_packet_fold_shear_seed.v0.json`;
const DEFAULT_MESH = `${CERT_DIR}/mesh.${PACKET_ID}.json`;
const DEFAULT_INPUT_SCREEN = `${CERT_DIR}/causal_preledger_input_screen.${PACKET_ID}.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const T_CYC = 6.28318530718;
const AMPLITUDE = 1.25;
const RANGE_SUBDIVISIONS = 4096;
const DERIVATIVE_SUBDIVISIONS = 1024;

function parseArgs(argv) {
  const args = {
    contract: DEFAULT_CONTRACT,
    mesh: DEFAULT_MESH,
    inputScreen: DEFAULT_INPUT_SCREEN,
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
    } else if (arg === "--mesh") {
      args.mesh = argv[++i];
    } else if (arg === "--input-screen") {
      args.inputScreen = argv[++i];
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
  console.log(`Usage: node scripts/proof-programs/fresh-null-coordinate-preledger.mjs [options]

Options:
  --contract PATH      Same-packet seed contract JSON. Defaults to ${DEFAULT_CONTRACT}.
  --mesh PATH          Fresh shifted mesh JSON. Defaults to ${DEFAULT_MESH}.
  --input-screen PATH  Fresh preledger input screen JSON. Defaults to ${DEFAULT_INPUT_SCREEN}.
  --out-dir PATH       Output directory. Defaults to ${DEFAULT_OUT_DIR}.
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

function cleanNumber(value) {
  if (!Number.isFinite(value)) {
    return value;
  }
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

function nextAfter(value, direction) {
  if (Number.isNaN(value) || value === direction) {
    return value;
  }
  if (value === 0) {
    return direction > 0 ? Number.MIN_VALUE : -Number.MIN_VALUE;
  }
  if (!Number.isFinite(value)) {
    return value;
  }
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setFloat64(0, value, false);
  let bits = view.getBigUint64(0, false);
  if ((direction > value) === (value > 0)) {
    bits += 1n;
  } else {
    bits -= 1n;
  }
  view.setBigUint64(0, bits, false);
  return view.getFloat64(0, false);
}

function outwardLower(value, scale = 1) {
  const pad = 128 * Number.EPSILON * Math.max(1, Math.abs(value), scale);
  return nextAfter(value - pad, -Infinity);
}

function outwardUpper(value, scale = 1) {
  const pad = 128 * Number.EPSILON * Math.max(1, Math.abs(value), scale);
  return nextAfter(value + pad, Infinity);
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

function sourceTheta(theta, contract) {
  return modOne(theta + contract.seed_history.delta);
}

function baseX(theta) {
  return AMPLITUDE * Math.cos(2 * Math.PI * theta);
}

function baseXPrime(theta) {
  return -2 * Math.PI * AMPLITUDE * Math.sin(2 * Math.PI * theta);
}

function xTheta(theta, contract) {
  const oldTheta = sourceTheta(theta, contract);
  return baseX(oldTheta) + contract.seed_history.epsilon * shearValue(oldTheta, contract);
}

function xPrimeTheta(theta, contract) {
  const oldTheta = sourceTheta(theta, contract);
  return baseXPrime(oldTheta) + contract.seed_history.epsilon * shearDerivative(oldTheta, contract);
}

function nullCoordinate(theta, lift, ledger, contract) {
  const liftedTheta = theta + lift;
  const t = T_CYC * liftedTheta;
  const x = xTheta(modOne(theta), contract);
  return ledger === "u" ? t - x : t + x;
}

function nullDerivative(theta, ledger, contract) {
  const xPrime = xPrimeTheta(modOne(theta), contract);
  return ledger === "u" ? T_CYC - xPrime : T_CYC + xPrime;
}

function globalLipschitzBound(contract) {
  const basePrimeBound = 2 * Math.PI * AMPLITUDE;
  const shearPrimeBound = contract.seed_history.first_half_arcs.reduce((sum, arc) => {
    const [left, right] = arc.theta_range;
    const width = right - left;
    const coeff = Math.abs(contract.seed_history.witness[arc.basis] ?? 0);
    return sum + coeff * (Math.PI / width);
  }, 0);
  return T_CYC + basePrimeBound + contract.seed_history.epsilon * shearPrimeBound;
}

function intervalRange(interval, lift, ledger, contract, lipschitz) {
  const [left, right] = interval.theta_range;
  const width = right - left;
  const subdivisions = Math.max(1, Math.ceil(RANGE_SUBDIVISIONS * width));
  let lo = Infinity;
  let hi = -Infinity;
  for (let i = 0; i < subdivisions; i += 1) {
    const a = left + (width * i) / subdivisions;
    const b = left + (width * (i + 1)) / subdivisions;
    const midpoint = (a + b) / 2;
    const radius = (b - a) / 2;
    const value = nullCoordinate(midpoint, lift, ledger, contract);
    lo = Math.min(lo, value - lipschitz * radius);
    hi = Math.max(hi, value + lipschitz * radius);
  }
  const scale = Math.max(Math.abs(lo), Math.abs(hi), 1);
  return [cleanNumber(outwardLower(lo, scale)), cleanNumber(outwardUpper(hi, scale))];
}

function derivativeRange(interval, ledger, contract) {
  const [left, right] = interval.theta_range;
  const width = right - left;
  const subdivisions = Math.max(1, Math.ceil(DERIVATIVE_SUBDIVISIONS * width));
  let lo = Infinity;
  let hi = -Infinity;
  for (let i = 0; i <= subdivisions; i += 1) {
    const theta = left + (width * i) / subdivisions;
    const value = nullDerivative(theta === 1 ? 0 : theta, ledger, contract);
    lo = Math.min(lo, value);
    hi = Math.max(hi, value);
  }
  const scale = Math.max(Math.abs(lo), Math.abs(hi), 1);
  return [cleanNumber(outwardLower(lo, scale)), cleanNumber(outwardUpper(hi, scale))];
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

function derivativeFloor(derivative) {
  if (derivative[0] > 0) {
    return derivative[0];
  }
  if (derivative[1] < 0) {
    return Math.abs(derivative[1]);
  }
  return 0;
}

function touchesActiveFoldLedger(row, receiver, source) {
  return (
    (receiver.type === "fold_layer_candidate" && receiver.fold_ledger === row.ledger) ||
    (source.type === "fold_layer_candidate" && source.fold_ledger === row.ledger)
  );
}

function rowFailureCode(row, receiver, source, gap, sameIntervalDerivativeFloor) {
  if (gap > 0) {
    return "";
  }
  if (receiver.interval_id === source.interval_id && sameIntervalDerivativeFloor > 0) {
    return "";
  }
  if (touchesActiveFoldLedger(row, receiver, source)) {
    return "fold_layer_interval_not_evaluated";
  }
  if (receiver.interval_id === source.interval_id) {
    return "diagonal_exclusion_not_monotone_certified";
  }
  return "range_overlap_requires_level_split";
}

function rowFailureReasons(code) {
  if (!code) {
    return [];
  }
  if (code === "fold_layer_interval_not_evaluated") {
    return ["row_touches_fold_layer_candidate", "fold_layer_integral_certificate_absent"];
  }
  if (code === "diagonal_exclusion_not_monotone_certified") {
    return ["same_interval_diagonal_contact_not_excluded_by_monotone_floor"];
  }
  return ["outward_padded_null_coordinate_ranges_overlap_or_touch", "simple_root_subrow_not_constructed"];
}

function classifyRows(inputScreen, intervals, contract) {
  const lipschitz = globalLipschitzBound(contract);
  const intervalById = new Map(intervals.map((interval) => [interval.interval_id, interval]));
  const rows = [];

  for (const inputRow of inputScreen.rows) {
    const receiver = intervalById.get(inputRow.receiver_interval);
    const source = intervalById.get(inputRow.source_interval);
    if (!receiver || !source) {
      throw new Error(`Missing interval for row ${inputRow.row_id}`);
    }
    const receiverRange = intervalRange(receiver, 0, inputRow.ledger, contract, lipschitz);
    const sourceRange = intervalRange(source, inputRow.source_lift_periods, inputRow.ledger, contract, lipschitz);
    const gap = cleanNumber(rangeGap(receiverRange, sourceRange));
    const derivative = derivativeRange(receiver, inputRow.ledger, contract);
    const sameIntervalDerivativeFloor =
      receiver.interval_id === source.interval_id ? cleanNumber(derivativeFloor(derivative)) : 0;
    const code = rowFailureCode(inputRow, receiver, source, gap, sameIntervalDerivativeFloor);
    const diagonalAccepted = !code && receiver.interval_id === source.interval_id && sameIntervalDerivativeFloor > 0;
    const rangeEmptyAccepted = !code && gap > 0;
    rows.push({
      row_id: inputRow.row_id,
      packet_id: PACKET_ID,
      refinement_id: `${PACKET_ID}-range-empty-preledger-v1`,
      receiver_interval: receiver.interval_id,
      source_interval: source.interval_id,
      ledger: inputRow.ledger,
      source_lift_periods: inputRow.source_lift_periods,
      receiver_theta_range: receiver.theta_range,
      source_theta_range: source.theta_range,
      receiver_range: receiverRange,
      source_range: sourceRange,
      status: rangeEmptyAccepted || diagonalAccepted ? "empty" : "split_required",
      empty_method: rangeEmptyAccepted
        ? "outward_padded_lipschitz_range_empty"
        : diagonalAccepted
          ? "monotone_diagonal_exclusion"
          : null,
      range_gap: gap,
      receiver_monotone_floor: sameIntervalDerivativeFloor || null,
      monotone_floor: sameIntervalDerivativeFloor || null,
      jacobian_floor: sameIntervalDerivativeFloor || null,
      root_count_bound: rangeEmptyAccepted || diagonalAccepted ? [0, 0] : null,
      root_sign: null,
      memory_depth_range: null,
      separator_event: inputRow.separator_event,
      diagonal_exclusion_ref: diagonalAccepted ? `${PACKET_ID}:diagonal:${inputRow.row_id}` : null,
      fold_layer_atlas_ref: null,
      fold_layer_input_ref: inputRow.fold_layer_input_ref,
      itinerary_required: true,
      interval_method: {
        type: "binary64_outward_padded_lipschitz_enclosure",
        range_subdivisions: RANGE_SUBDIVISIONS,
        derivative_subdivisions: DERIVATIVE_SUBDIVISIONS,
        global_lipschitz_bound: cleanNumber(lipschitz),
      },
      failure_code: code,
      failure_reasons: rowFailureReasons(code),
    });
  }
  return rows;
}

function countRows(rows, predicate) {
  return rows.filter(predicate).length;
}

function minPositive(values) {
  const positives = values.filter((value) => Number.isFinite(value) && value > 0);
  return positives.length ? cleanNumber(Math.min(...positives)) : null;
}

function buildLedger(contract, mesh, inputScreen) {
  const intervals = mesh.preledger_intervals;
  const rows = classifyRows(inputScreen, intervals, contract);
  const emptyRows = rows.filter((row) => row.status === "empty");
  const splitRows = rows.filter((row) => row.status === "split_required");
  const rangeEmptyRows = emptyRows.filter((row) => row.empty_method === "outward_padded_lipschitz_range_empty");
  const diagonalRows = emptyRows.filter((row) => row.empty_method === "monotone_diagonal_exclusion");
  const foldSplits = splitRows.filter((row) => row.failure_code === "fold_layer_interval_not_evaluated");
  const rangeSplits = splitRows.filter((row) => row.failure_code === "range_overlap_requires_level_split");
  const diagonalSplits = splitRows.filter((row) => row.failure_code === "diagonal_exclusion_not_monotone_certified");

  return {
    schema: "breather-causal-ledger-fresh-v1",
    packet_id: PACKET_ID,
    refinement_id: `${PACKET_ID}-range-empty-preledger-v1`,
    source_input_screen: `causal_preledger_input_screen.${PACKET_ID}.json`,
    status: "preledger_rejected_range_empty_only_overlap_and_fold_rows_remaining",
    acceptance_level: "binary64_outward_padded_fail_closed_attempt_not_mpfr_interval_certificate",
    claim_level:
      "fail-closed outward-padded null-coordinate preledger attempt accepting only range-empty or monotone diagonal-empty rows under a conservative binary64 engine; not an MPFR interval certificate and not a branch-chart authorization",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    packet_identity_refs: {
      candidate_history: `phi_cyc.${PACKET_ID}.json:packet_identity`,
      mesh: `mesh.${PACKET_ID}.json`,
      input_screen: `causal_preledger_input_screen.${PACKET_ID}.json`,
      seed_contract: "fresh_same_packet_fold_shear_seed.v0.json",
    },
    evaluation_policy: {
      null_coordinates: inputScreen.evaluation_policy.null_coordinates,
      field_speed_c_f: 1,
      period_T_cyc: T_CYC,
      source_time_rule: inputScreen.evaluation_policy.source_time_rule,
      interval_method:
        "Each row range is enclosed by subdividing the theta interval and adding an analytic global Lipschitz radius, then padding binary64 endpoints outward. Rows are accepted only when padded ranges are strictly disjoint or a same-interval monotone diagonal exclusion is certified.",
      pass_rule:
        "This artifact passes only if every row is accepted as empty, simple_root, or fold_layer with no split_required rows. This first fresh pass intentionally accepts no simple_root or fold_layer rows.",
    },
    common_identity: inputScreen.common_identity,
    interval_method: {
      type: "binary64_outward_padded_lipschitz_enclosure",
      certificate_grade: "fail_closed_engine_audit_not_formal_interval_backend",
      range_subdivisions: RANGE_SUBDIVISIONS,
      derivative_subdivisions: DERIVATIVE_SUBDIVISIONS,
      global_lipschitz_bound: cleanNumber(globalLipschitzBound(contract)),
      limitation:
        "This is a fail-closed binary64 interval enclosure suitable for rejecting or certifying large range-empty gaps. It does not certify simple roots, fold impulses, or dynamic residuals.",
    },
    summary: {
      base_rows: rows.length,
      certified_empty_base_rows: emptyRows.length,
      certified_range_empty_base_rows: rangeEmptyRows.length,
      certified_diagonal_exclusion_empty_rows: diagonalRows.length,
      certified_simple_root_subrows: 0,
      accepted_fold_layer_rows: 0,
      split_required_base_rows: splitRows.length,
      unresolved_diagonal_contact_rows: diagonalSplits.length,
      unresolved_fold_layer_rows: foldSplits.length,
      unresolved_range_split_parent_rows: rangeSplits.length,
      branch_chart_authorized: false,
    },
    global_margins: {
      gamma_empty_range: minPositive(rangeEmptyRows.map((row) => row.range_gap)),
      gamma_inact_range: minPositive(rangeEmptyRows.map((row) => row.range_gap)),
      diagonal_exclusion_empty_rows: diagonalRows.length,
      nu_simple: null,
      gamma_cov: null,
      gamma_tau: null,
      gamma_h: null,
      gamma_sign: null,
      alpha_fold_min: null,
      nu_exit_fold_min: null,
      I_fold_all_finite: false,
      pass: false,
    },
    blocking_summary: {
      fold_layer_interval_not_evaluated: foldSplits.length,
      range_overlap_requires_level_split: rangeSplits.length,
      diagonal_exclusion_not_monotone_certified: diagonalSplits.length,
    },
    intervals,
    rows,
    simple_root_subrows: [],
    fold_layer_rows: [],
    limitations: [
      "No simple-root subrow is accepted in this first fresh preledger attempt.",
      "No fold-layer row is accepted because same-packet fold impulse fields are absent.",
      "No live causal_ledger.json rewrite or branch-chart construction is authorized.",
    ],
  };
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.status}\` | \`${row.empty_method ?? row.failure_code}\` | \`${row.receiver_interval}\` | \`${row.source_interval}\` | \`${row.ledger}\` | ${row.range_gap} |`
    )
    .join("\n");
}

function buildEngineAudit(ledger) {
  return {
    schema: "breather-preledger-interval-engine-audit-v1",
    packet_id: PACKET_ID,
    refinement_id: ledger.refinement_id,
    status: "binary64_outward_padded_fail_closed_not_mpfr_interval_certificate",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    engine: {
      language: "JavaScript",
      numeric_type: "binary64 Number",
      range_method: "midpoint subdivision plus analytic global Lipschitz radius plus outward binary64 padding",
      range_subdivisions: RANGE_SUBDIVISIONS,
      derivative_subdivisions: DERIVATIVE_SUBDIVISIONS,
      global_lipschitz_bound: ledger.interval_method.global_lipschitz_bound,
    },
    accepted_scope: {
      range_empty_rows: ledger.summary.certified_range_empty_base_rows,
      monotone_diagonal_empty_rows: ledger.summary.certified_diagonal_exclusion_empty_rows,
      simple_root_rows: 0,
      fold_layer_rows: 0,
    },
    limitations: [
      "This engine is deterministic and fail-closed for this priority-side pass, but it is not an MPFR, Arb, or exact-rational interval backend.",
      "It does not parse JSON decimal lexemes as exact rationals.",
      "It does not provide certified elementary-function enclosures for Math.sin or Math.cos beyond the added Lipschitz and binary64 padding.",
      "Rows left as split_required block branch-chart authorization.",
      "A later proof-grade preledger should replace this engine with exact decimal intake and certified trig interval enclosures before promoting row acceptances as formal interval-certificate results.",
    ],
  };
}

function buildReport(ledger, ledgerPath, auditPath) {
  const splitRows = ledger.rows.filter((row) => row.status === "split_required");
  const emptyRows = ledger.rows.filter((row) => row.status === "empty");
  const firstSplits = splitRows.slice(0, 24);
  return `# Fresh Null-Coordinate Preledger Report

## Verdict

The fresh packet \`${PACKET_ID}\` fail-closes before branch-chart authorization.
This run is a binary64 outward-padded preledger attempt, not an MPFR/Arb-style
formal interval certificate. It accepts only range-empty or monotone
diagonal-empty rows under that conservative engine and leaves every overlap,
simple-root candidate, and fold-layer candidate unpromoted.

| Quantity | Value |
| --- | ---: |
| Base rows | ${ledger.summary.base_rows} |
| Empty rows accepted by this pass | ${ledger.summary.certified_empty_base_rows} |
| Range-empty rows accepted by this pass | ${ledger.summary.certified_range_empty_base_rows} |
| Monotone diagonal exclusions accepted by this pass | ${ledger.summary.certified_diagonal_exclusion_empty_rows} |
| Certified simple-root subrows | ${ledger.summary.certified_simple_root_subrows} |
| Accepted fold-layer rows | ${ledger.summary.accepted_fold_layer_rows} |
| Split-required rows | ${ledger.summary.split_required_base_rows} |

The minimum range-empty gap accepted by this pass is
$$
\\gamma_{\\mathrm{empty}}=${ledger.global_margins.gamma_empty_range}.
$$
Because \`${path.basename(ledgerPath)}\` records
\`branch_chart_authorized=false\`, no \`branch_chart.json\` may be constructed
from this packet.

The engine audit is recorded in \`${path.basename(auditPath)}\`.

## Interval Method

Each null-coordinate range is enclosed by subdividing the theta interval,
evaluating the midpoint, adding the analytic global Lipschitz radius for the
subinterval, and padding the binary64 endpoints outward. A row is accepted as
\`empty\` only when the padded receiver and source ranges are strictly disjoint.
Same-interval rows are accepted only when the receiver ledger coordinate is
strictly monotone on the interval, so the equality can occur only on the
excluded diagonal.

This method is deliberately narrower than the full certificate target. It does
not extract simple-root subrows, does not certify fold-layer impulses, does not
parse JSON decimals as exact rationals, and does not replace a proof-grade
interval backend for trigonometric enclosures.

## First Split-Required Rows

| Row | Status | Blocker | Receiver | Source | Ledger | Padded range gap |
| --- | --- | --- | --- | --- | --- | ---: |
${rowTable(firstSplits)}

## Accepted Empty Row Sample

| Row | Status | Method | Receiver | Source | Ledger | Padded range gap |
| --- | --- | --- | --- | --- | --- | ---: |
${rowTable(emptyRows.slice(0, 24))}

## Next Certificate Action

The next proof advance is not branch-chart construction. It is a stronger
same-packet preledger pass that either:

1. extracts interval-certified simple-root subrows from the remaining overlap
   rows with positive Jacobian, memory-depth, coverage, and sign margins; or
2. certifies same-packet fold-layer impulse fields and consumes every
   fold-adjacent parent complement by an accepted alternative.

## Capture Decision

Priority-only. This is a priority-side fail-closed preledger attempt and routing
artifact. It blocks branch-chart work, but it does not promote row acceptances as
formal MPFR/Arb interval-certificate results. It should not be promoted into
\`content/markdown/aaa\` unless a later proof-program chapter needs a worked
account of the fresh preledger failure mode.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const contract = readJson(path.resolve(args.contract));
  const mesh = readJson(path.resolve(args.mesh));
  const inputScreen = readJson(path.resolve(args.inputScreen));
  if (mesh.packet_id !== PACKET_ID || inputScreen.packet_id !== PACKET_ID) {
    throw new Error("Fresh packet id mismatch in mesh or input screen.");
  }

  const ledger = buildLedger(contract, mesh, inputScreen);
  const outDir = path.resolve(args.outDir);
  const ledgerPath = path.join(outDir, `causal_ledger.${PACKET_ID}.json`);
  const reportPath = path.join(outDir, `causal_preledger_interval_report.${PACKET_ID}.md`);
  const auditPath = path.join(outDir, `preledger_interval_engine_audit.${PACKET_ID}.json`);
  writeJson(ledgerPath, ledger, args.pretty);
  writeJson(auditPath, buildEngineAudit(ledger), args.pretty);
  writeText(reportPath, buildReport(ledger, ledgerPath, auditPath));
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

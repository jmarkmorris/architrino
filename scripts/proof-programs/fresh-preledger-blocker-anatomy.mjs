#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-same-packet-fold-shear-seed-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CONTRACT = `${CERT_DIR}/fresh_same_packet_fold_shear_seed.v0.json`;
const DEFAULT_MESH = `${CERT_DIR}/mesh.${PACKET_ID}.json`;
const DEFAULT_LEDGER = `${CERT_DIR}/causal_ledger.${PACKET_ID}.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const T_CYC = 6.28318530718;
const AMPLITUDE = 1.25;
const DERIVATIVE_SUBDIVISIONS = 2048;

function parseArgs(argv) {
  const args = {
    contract: DEFAULT_CONTRACT,
    mesh: DEFAULT_MESH,
    ledger: DEFAULT_LEDGER,
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
    } else if (arg === "--ledger") {
      args.ledger = argv[++i];
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
  console.log(`Usage: node scripts/proof-programs/fresh-preledger-blocker-anatomy.mjs [options]

Options:
  --contract PATH  Same-packet seed contract JSON. Defaults to ${DEFAULT_CONTRACT}.
  --mesh PATH      Fresh shifted mesh JSON. Defaults to ${DEFAULT_MESH}.
  --ledger PATH    Fresh sidecar causal ledger JSON. Defaults to ${DEFAULT_LEDGER}.
  --out-dir PATH   Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty         Pretty-print JSON artifact.
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

function bumpDerivative(theta, arc) {
  const s = arcCoordinate(theta, arc);
  if (s === null) {
    return 0;
  }
  const [left, right] = arc.theta_range;
  return mirrorSign(theta) * (Math.PI / (right - left)) * Math.sin(2 * Math.PI * s);
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

function baseXPrime(theta) {
  return -2 * Math.PI * AMPLITUDE * Math.sin(2 * Math.PI * theta);
}

function xPrimeTheta(theta, contract) {
  const oldTheta = sourceTheta(theta, contract);
  return baseXPrime(oldTheta) + contract.seed_history.epsilon * shearDerivative(oldTheta, contract);
}

function nullDerivative(theta, ledger, contract) {
  const xPrime = xPrimeTheta(modOne(theta), contract);
  return ledger === "u" ? T_CYC - xPrime : T_CYC + xPrime;
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
  return [cleanNumber(lo), cleanNumber(hi)];
}

function derivativeFloor(range) {
  if (range[0] > 0) {
    return range[0];
  }
  if (range[1] < 0) {
    return Math.abs(range[1]);
  }
  return 0;
}

function overlapRange(leftRange, rightRange) {
  const lo = Math.max(leftRange[0], rightRange[0]);
  const hi = Math.min(leftRange[1], rightRange[1]);
  if (hi < lo) {
    return null;
  }
  return [cleanNumber(lo), cleanNumber(hi)];
}

function intervalOrderDistance(receiver, source) {
  return receiver.order - source.order;
}

function isCyclicSeam(receiver, source) {
  return receiver.interval_id === "A0" && source.interval_id === "A4";
}

function activeFoldEvent(row, receiver, source) {
  for (const interval of [receiver, source]) {
    if (interval.type === "fold_layer_candidate" && interval.fold_ledger === row.ledger) {
      return interval.separator_event;
    }
  }
  return null;
}

function inactiveFoldEvent(receiver, source) {
  for (const interval of [receiver, source]) {
    if (interval.type === "fold_layer_candidate") {
      return interval.separator_event;
    }
  }
  return null;
}

function rowFamily(row, receiver, source) {
  if (row.failure_code === "fold_layer_interval_not_evaluated") {
    return "active_fold_layer_certificate_absent";
  }
  if (row.receiver_interval === row.source_interval) {
    return "nonmonotone_diagonal_contact";
  }
  if (receiver.type === "fold_layer_candidate" || source.type === "fold_layer_candidate") {
    return "structural_endpoint_or_inactive_fold_contact";
  }
  if (isCyclicSeam(receiver, source)) {
    return "structural_periodic_seam_contact";
  }
  return "regular_parent_root_candidate_overlap";
}

function proofBurdens(family) {
  if (family === "active_fold_layer_certificate_absent") {
    return [
      "same-packet fold layer row enclosure",
      "curvature floor alpha_Sigma > 0",
      "exit floor nu_exit,Sigma > 0",
      "finite I_fold_eta_epsilon_c_Sigma",
      "Delta N_Sigma even and Delta D_Sigma = 0",
      "parent complement consumption after fold-layer rows are removed",
    ];
  }
  if (family === "structural_endpoint_or_inactive_fold_contact") {
    return [
      "split the inactive null-coordinate fold neighborhood into regular complements",
      "prove range-empty gaps or simple-root subrows on each complement",
      "record endpoint ownership at the adjacent separator",
    ];
  }
  if (family === "regular_parent_root_candidate_overlap") {
    return [
      "extract interval-certified simple-root subrow if source coverage is strict",
      "record source monotonicity floor",
      "record memory-depth, sign, and Jacobian margins",
      "consume leftover parent complements by an accepted same-packet alternative",
    ];
  }
  if (family === "structural_periodic_seam_contact") {
    return [
      "split the periodic seam using the declared endpoint convention",
      "prove endpoint exclusion or strict one-sided range separation",
      "record periodic source-lift consistency",
    ];
  }
  if (family === "nonmonotone_diagonal_contact") {
    return [
      "split the diagonal interval at the derivative-zero point or turning sublayer",
      "prove strict monotonicity on each retained diagonal subinterval",
      "record the diagonal exclusion endpoint convention",
    ];
  }
  return [
    "level-split the regular intervals by null-coordinate overlap thresholds",
    "prove strict range-empty wings or simple-root subrows",
    "if overlap cores persist, route to structural successor repair",
  ];
}

function nextAction(family) {
  if (family === "active_fold_layer_certificate_absent") {
    return "fresh_fold_layer_certificate";
  }
  if (family === "nonmonotone_diagonal_contact") {
    return "diagonal_split_and_monotone_exclusion";
  }
  if (family === "regular_parent_root_candidate_overlap") {
    return "simple_root_subrow_plus_parent_complement_closure";
  }
  if (family === "structural_endpoint_or_inactive_fold_contact") {
    return "inactive_fold_neighborhood_regular_split";
  }
  if (family === "structural_periodic_seam_contact") {
    return "periodic_seam_endpoint_split";
  }
  return "regular_level_split_or_structural_repair";
}

function buildAnatomy(contract, mesh, ledger) {
  const intervalById = new Map(mesh.preledger_intervals.map((interval) => [interval.interval_id, interval]));
  const splitRows = ledger.rows.filter((row) => row.status === "split_required");
  const rows = splitRows.map((row) => {
    const receiver = intervalById.get(row.receiver_interval);
    const source = intervalById.get(row.source_interval);
    if (!receiver || !source) {
      throw new Error(`Missing interval for row ${row.row_id}`);
    }
    const family = rowFamily(row, receiver, source);
    const receiverDerivative = derivativeRange(receiver, row.ledger, contract);
    const sourceDerivative = derivativeRange(source, row.ledger, contract);
    const overlap = overlapRange(row.receiver_range, row.source_range);
    return {
      row_id: row.row_id,
      packet_id: PACKET_ID,
      ledger: row.ledger,
      receiver_interval: row.receiver_interval,
      source_interval: row.source_interval,
      receiver_theta_range: row.receiver_theta_range,
      source_theta_range: row.source_theta_range,
      receiver_type: receiver.type,
      source_type: source.type,
      receiver_fold_ledger: receiver.fold_ledger ?? null,
      source_fold_ledger: source.fold_ledger ?? null,
      involved_separator_event: activeFoldEvent(row, receiver, source) ?? inactiveFoldEvent(receiver, source),
      failure_code: row.failure_code,
      blocker_family: family,
      candidate_next_action: nextAction(family),
      receiver_range: row.receiver_range,
      source_range: row.source_range,
      range_overlap: overlap,
      range_overlap_width: overlap ? cleanNumber(overlap[1] - overlap[0]) : 0,
      receiver_derivative_range: receiverDerivative,
      source_derivative_range: sourceDerivative,
      receiver_monotonicity_floor_diagnostic: cleanNumber(derivativeFloor(receiverDerivative)),
      source_monotonicity_floor_diagnostic: cleanNumber(derivativeFloor(sourceDerivative)),
      proof_burdens: proofBurdens(family),
      branch_chart_authorized: false,
    };
  });

  const familyCounts = rows.reduce((counts, row) => {
    counts[row.blocker_family] = (counts[row.blocker_family] ?? 0) + 1;
    return counts;
  }, {});

  return {
    schema: "breather-fresh-preledger-blocker-anatomy-v1",
    packet_id: PACKET_ID,
    source_ledger: `causal_ledger.${PACKET_ID}.json`,
    source_acceptance_level: ledger.acceptance_level,
    status: "fresh_preledger_blocker_anatomy_recorded_branch_chart_blocked",
    claim_level:
      "priority-side row anatomy for the fresh fail-closed preledger; diagnostic binary64 derivative and overlap data only, not row acceptance",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    summary: {
      split_required_rows: rows.length,
      family_counts: familyCounts,
      active_fold_layer_rows: familyCounts.active_fold_layer_certificate_absent ?? 0,
      non_fold_rows: rows.length - (familyCounts.active_fold_layer_certificate_absent ?? 0),
      diagonal_contacts: familyCounts.nonmonotone_diagonal_contact ?? 0,
      regular_parent_root_candidate_overlaps: familyCounts.regular_parent_root_candidate_overlap ?? 0,
      structural_endpoint_or_inactive_fold_contacts: familyCounts.structural_endpoint_or_inactive_fold_contact ?? 0,
      structural_periodic_seam_contacts: familyCounts.structural_periodic_seam_contact ?? 0,
    },
    diagnostic_method: {
      derivative_subdivisions: DERIVATIVE_SUBDIVISIONS,
      numeric_level: "binary64 diagnostic only",
      limitation:
        "Derivative and overlap widths are row-anatomy diagnostics inherited from the fail-closed preledger. They identify proof burdens but do not accept rows.",
    },
    rows,
  };
}

function tableRows(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.blocker_family}\` | \`${row.candidate_next_action}\` | \`${row.receiver_interval}\` | \`${row.source_interval}\` | \`${row.ledger}\` | ${row.range_overlap_width} | ${row.source_monotonicity_floor_diagnostic} |`
    )
    .join("\n");
}

function buildReport(anatomy) {
  const grouped = Object.entries(anatomy.summary.family_counts)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([family, count]) => `| \`${family}\` | ${count} |`)
    .join("\n");

  return `# Fresh Preledger Blocker Anatomy

## Verdict

The fresh sidecar \`${PACKET_ID}\` remains blocked before branch-chart
authorization. This packet does not accept any new row. It converts the 34
\`split_required\` rows in \`causal_ledger.${PACKET_ID}.json\` into row families
and proof burdens for the next proof-grade preledger pass.

| Blocker family | Rows |
| --- | ---: |
${grouped}

The split is structurally useful: 16 rows require same-packet fold-layer
certification, 6 regular/regular rows are the actual simple-root candidate
parents, 10 endpoint/seam or inactive-fold-neighborhood rows need structural
endpoint handling rather than branch extraction, and 2 rows require diagonal
splitting or monotone exclusion.

## Row Anatomy

| Row | Family | Next action | Receiver | Source | Ledger | Diagnostic overlap width | Diagnostic source monotonicity floor |
| --- | --- | --- | --- | --- | --- | ---: | ---: |
${tableRows(anatomy.rows)}

## Proof-Grade Reading

The derivative floors and overlap widths above are binary64 diagnostics. They
are not certificate margins. A later pass must recompute every retained margin
with exact decimal intake, certified trigonometric interval enclosures, and
outward rounding before promoting any row to \`empty\`, \`simple_root\`, or
\`fold_layer\`.

## Capture Decision

Priority-only. This is a row-anatomy and routing artifact for the fresh
preledger failure. It should stay under \`reference/priorities\` until a later
proof-grade interval certificate either consumes these rows or rejects the
fresh packet with formal margins.
`;
}

function buildFoldBurden(anatomy) {
  const rows = anatomy.rows.filter((row) => row.blocker_family === "active_fold_layer_certificate_absent");
  const bySeparator = rows.reduce((groups, row) => {
    const key = row.involved_separator_event ?? "unknown_separator";
    groups[key] ??= {
      separator_event: key,
      ledger: row.ledger,
      rows: [],
    };
    groups[key].rows.push(row.row_id);
    return groups;
  }, {});
  return {
    schema: "breather-fresh-fold-layer-burden-v1",
    packet_id: PACKET_ID,
    source_anatomy: `fresh_preledger_blocker_anatomy.${PACKET_ID}.json`,
    source_ledger: `causal_ledger.${PACKET_ID}.json`,
    status: "fresh_fold_layer_burden_recorded_no_row_consumption",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-side same-packet fold-layer burden report; records missing fields for the 16 fresh fold rows but consumes no rows",
    summary: {
      fold_layer_rows: rows.length,
      separator_count: Object.keys(bySeparator).length,
      rows_by_separator: Object.fromEntries(
        Object.entries(bySeparator)
          .sort(([left], [right]) => left.localeCompare(right))
          .map(([key, group]) => [key, group.rows])
      ),
    },
    required_same_packet_fields: [
      "fresh packet identity check with refs to phi_cyc, mesh, input screen, causal ledger, and seed contract",
      "fresh atlas_id, separator_event, interval_id, ledger, theta_center, t_center, theta_range, t_range, and layer radii",
      "alpha_floor > 0 and exit_floor > 0 for each separator layer",
      "parity fields delta_root_count, delta_signed_degree = 0, local_even_jump, and parity_status",
      "mollifier proof or direct quadrature route under the fresh packet identity",
      "Gamma/g coupling certification",
      "per-row E_B, S_B(t), L_r_B, L_s_B, support coverage, and finite I_fold_B or finite A_B_eta_epsilon_c route",
      "fresh separator aggregates C_Sigma, A_Sigma_eta_epsilon_c, and I_fold_eta_epsilon_c_Sigma, unless a direct-row impulse route replaces the aggregate route",
    ],
    template_only_refs: [
      "fold_layer_atlas.json",
      "fold_impulse_constants.json",
      "fold_interval_constants_attempt.json",
      "fold_full_interval_constants_certificate.json",
      "fold_full_interval_fallback_legality.md",
    ],
    consumption_rule:
      "A fresh fold row may become fold_layer only after the same-packet fields above are accepted. It must not be rewritten as simple_root and must not emit branch-sum residuals through the separator.",
    rows: rows.map((row) => ({
      row_id: row.row_id,
      separator_event: row.involved_separator_event,
      ledger: row.ledger,
      receiver_interval: row.receiver_interval,
      source_interval: row.source_interval,
      receiver_type: row.receiver_type,
      source_type: row.source_type,
      diagnostic_overlap_width: row.range_overlap_width,
      missing_fields: [
        "fresh_fold_layer_atlas_ref",
        "alpha_floor",
        "exit_floor",
        "I_fold_B_or_I_fold_eta_epsilon_c_Sigma",
        "fresh_parent_complement_consumption_ref",
      ],
      row_may_become: "fold_layer",
      row_must_not_become: "simple_root",
      branch_chart_authorized: false,
    })),
  };
}

function foldBurdenTable(burden) {
  return burden.rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.separator_event}\` | \`${row.ledger}\` | \`${row.receiver_interval}\` | \`${row.source_interval}\` | ${row.diagnostic_overlap_width} |`
    )
    .join("\n");
}

function buildFoldBurdenReport(burden) {
  const separatorRows = Object.entries(burden.summary.rows_by_separator)
    .map(([separator, rows]) => `| \`${separator}\` | ${rows.map((row) => `\`${row}\``).join(", ")} |`)
    .join("\n");

  return `# Fresh Fold-Layer Burden Report

## Verdict

The fresh sidecar \`${PACKET_ID}\` has 16 fold-layer rows that cannot be
consumed by ordinary null-coordinate range data. They require a same-packet
fold-layer certificate. This report records the burden only; it does not update
\`fold_layer_atlas.json\`, does not rewrite \`causal_ledger.json\`, and does
not authorize \`branch_chart.json\`.

| Separator | Rows |
| --- | --- |
${separatorRows}

## Row Burden

| Row | Separator | Ledger | Receiver | Source | Diagnostic overlap width |
| --- | --- | --- | --- | --- | ---: |
${foldBurdenTable(burden)}

## Required Same-Packet Fields

${burden.required_same_packet_fields.map((field) => `- ${field}.`).join("\n")}

## Template-Only Reuse

The historical cosine-packet fold artifacts may be reused only as templates:
${burden.template_only_refs.map((ref) => `\`${ref}\``).join(", ")}. They are
not fresh-packet evidence and do not consume the rows above.

## Consumption Rule

Each row above may become \`fold_layer\` only after the fresh same-packet fields
are accepted. No row above may be rewritten as \`simple_root\`, and no branch-sum
residual may be routed through the separator.

## Capture Decision

Priority-only. This is a fold-layer burden packet for the fresh sidecar. It
should remain under \`reference/priorities\` until a later fresh same-packet
fold-layer certificate supplies the missing fields.
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
  const ledger = readJson(path.resolve(args.ledger));
  if (mesh.packet_id !== PACKET_ID || ledger.packet_id !== PACKET_ID) {
    throw new Error("Fresh packet id mismatch in mesh or ledger.");
  }

  const anatomy = buildAnatomy(contract, mesh, ledger);
  const outDir = path.resolve(args.outDir);
  const anatomyPath = path.join(outDir, `fresh_preledger_blocker_anatomy.${PACKET_ID}.json`);
  const reportPath = path.join(outDir, `fresh_preledger_blocker_anatomy_report.${PACKET_ID}.md`);
  const foldBurden = buildFoldBurden(anatomy);
  const foldBurdenPath = path.join(outDir, `fold_layer_burden.${PACKET_ID}.json`);
  const foldBurdenReportPath = path.join(outDir, `fold_layer_burden_report.${PACKET_ID}.md`);
  writeJson(anatomyPath, anatomy, args.pretty);
  writeText(reportPath, buildReport(anatomy));
  writeJson(foldBurdenPath, foldBurden, args.pretty);
  writeText(foldBurdenReportPath, buildFoldBurdenReport(foldBurden));
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

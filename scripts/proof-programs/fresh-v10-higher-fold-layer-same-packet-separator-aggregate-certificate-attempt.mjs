#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_ROW_ENCLOSURE_CERTIFICATE = `${CERT_DIR}/higher_fold_layer_same_packet_row_enclosure_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SOURCE_READINESS = `${CERT_DIR}/higher_fold_layer_separator_source_field_readiness_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_FIELD_DEPENDENCY = `${CERT_DIR}/higher_fold_layer_separator_proof_field_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CONTRACT = `${CERT_DIR}/fold_interval_constants_contract.md`;
const DEFAULT_FALLBACK_LEGALITY = `${CERT_DIR}/fold_full_interval_fallback_legality.md`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_separator_aggregate_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_separator_aggregate_certificate_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const STATUS =
  "higher_fold_layer_same_packet_separator_aggregate_certificate_attempt_fail_closed_row_enclosures_separator_aggregates_certified_source_packets_absent_no_row_consumption";
const PRIOR_BLOCKER = "separator_aggregate_C_Sigma_present_absent";
const FIRST_SOURCE_PACKET_BLOCKER = "same_packet_fold_impulse_or_direct_quadrature_bound_source_packet_absent";
const FIRST_ACCEPTANCE_BLOCKER = "higher_fold_separator_layer_certificate_absent";
const SELECTED_ROUTE = "mollifier_norm_full_input_screen_rectangle_fallback";
const AGGREGATE_RULE = "normal_form_fixed_parameter_mollifier_norm_separator_aggregate";
const ETA_EXACT = { n: 1n, d: 50n };
const ETA_SQRT_LOWER = { n: 1n, d: 8n };
const ETA_INV_SQRT_UPPER = { n: 8n, d: 1n };

const REMAINING_CHILD_FIELDS = [
  "higher_fold_layer_atlas_ref",
  "alpha_floor",
  "exit_floor",
  "fold_layer_parity_record",
  "parent_complement_consumption_ref",
];

function parseArgs(argv) {
  const args = {
    rowEnclosureCertificate: DEFAULT_ROW_ENCLOSURE_CERTIFICATE,
    sourceReadiness: DEFAULT_SOURCE_READINESS,
    proofFieldDependency: DEFAULT_PROOF_FIELD_DEPENDENCY,
    contract: DEFAULT_CONTRACT,
    fallbackLegality: DEFAULT_FALLBACK_LEGALITY,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--row-enclosure-certificate") {
      args.rowEnclosureCertificate = argv[++index];
    } else if (arg === "--source-readiness") {
      args.sourceReadiness = argv[++index];
    } else if (arg === "--proof-field-dependency") {
      args.proofFieldDependency = argv[++index];
    } else if (arg === "--contract") {
      args.contract = argv[++index];
    } else if (arg === "--fallback-legality") {
      args.fallbackLegality = argv[++index];
    } else if (arg === "--out-dir") {
      args.outDir = argv[++index];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-separator-aggregate-certificate-attempt.mjs [options]

Options:
  --row-enclosure-certificate PATH  Same-packet row enclosure certificate attempt. Defaults to ${DEFAULT_ROW_ENCLOSURE_CERTIFICATE}.
  --source-readiness PATH           Separator source-field readiness classifier. Defaults to ${DEFAULT_SOURCE_READINESS}.
  --proof-field-dependency PATH     Separator proof-field dependency classifier. Defaults to ${DEFAULT_PROOF_FIELD_DEPENDENCY}.
  --contract PATH                   Fold interval constants contract. Defaults to ${DEFAULT_CONTRACT}.
  --fallback-legality PATH          Full-interval fallback legality note. Defaults to ${DEFAULT_FALLBACK_LEGALITY}.
  --out-dir PATH                    Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                          Pretty-print JSON artifact.
  --help                            Show this help.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
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

function artifactRecord(filePath) {
  const present = fs.existsSync(filePath);
  return {
    path: filePath,
    basename: path.basename(filePath),
    present,
    sha256: present ? sha256File(filePath) : null,
  };
}

function gcd(left, right) {
  let a = left < 0n ? -left : left;
  let b = right < 0n ? -right : right;
  while (b !== 0n) {
    const next = a % b;
    a = b;
    b = next;
  }
  return a === 0n ? 1n : a;
}

function rat(n, d = 1n) {
  if (d === 0n) {
    throw new Error("zero denominator");
  }
  const sign = d < 0n ? -1n : 1n;
  const num = n * sign;
  const den = d < 0n ? -d : d;
  const divisor = gcd(num, den);
  return { n: num / divisor, d: den / divisor };
}

function addRat(left, right) {
  return rat(left.n * right.d + right.n * left.d, left.d * right.d);
}

function subRat(left, right) {
  return rat(left.n * right.d - right.n * left.d, left.d * right.d);
}

function mulRat(left, right) {
  return rat(left.n * right.n, left.d * right.d);
}

function cmpRat(left, right) {
  const diff = left.n * right.d - right.n * left.d;
  return diff < 0n ? -1 : diff > 0n ? 1 : 0;
}

function maxRat(values) {
  if (values.length === 0) {
    throw new Error("Cannot compute max of empty list.");
  }
  return values.reduce((max, value) => (cmpRat(value, max) > 0 ? value : max), values[0]);
}

function parseIntervalRat(intervalValue) {
  if (!Array.isArray(intervalValue) || intervalValue.length !== 2 || intervalValue[0] !== intervalValue[1]) {
    throw new Error(`Expected exact degenerate interval, got ${JSON.stringify(intervalValue)}`);
  }
  const text = String(intervalValue[0]);
  if (text.includes("/")) {
    const [n, d] = text.split("/");
    return rat(BigInt(n), BigInt(d));
  }
  return rat(BigInt(text), 1n);
}

function parseDecimalRational(value) {
  const text = String(value).trim();
  if (!/^-?\d+(?:\.\d+)?$/.test(text)) {
    throw new Error(`Expected finite decimal token, got ${text}`);
  }
  const sign = text.startsWith("-") ? -1n : 1n;
  const unsigned = text.startsWith("-") ? text.slice(1) : text;
  const [whole, fraction = ""] = unsigned.split(".");
  const scale = 10n ** BigInt(fraction.length);
  return rat(sign * BigInt(`${whole}${fraction}`), scale);
}

function formatRat(value) {
  return value.d === 1n ? value.n.toString() : `${value.n}/${value.d}`;
}

function interval(value) {
  const formatted = formatRat(value);
  return [formatted, formatted];
}

function decimalRat(value, places = 18) {
  const sign = value.n < 0n ? "-" : "";
  const n = value.n < 0n ? -value.n : value.n;
  const whole = n / value.d;
  let rem = n % value.d;
  if (rem === 0n) {
    return `${sign}${whole.toString()}`;
  }
  let fraction = "";
  for (let index = 0; index < places && rem !== 0n; index += 1) {
    rem *= 10n;
    fraction += (rem / value.d).toString();
    rem %= value.d;
  }
  return `${sign}${whole.toString()}.${fraction.replace(/0+$/, "")}`;
}

function separatorSortKey(separator) {
  const match = String(separator).match(/(\d+)$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function rowSortKey(row) {
  return `${String(separatorSortKey(row.separator_event)).padStart(3, "0")}:${row.row_id}`;
}

function countTrue(rows, getter) {
  return rows.filter((row) => getter(row) === true).length;
}

function countBy(rows, getter) {
  return rows.reduce((counts, row) => {
    const key = getter(row);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
}

function sortedObjectBySeparator(counts) {
  return Object.fromEntries(
    Object.entries(counts).sort(([left], [right]) => separatorSortKey(left) - separatorSortKey(right)),
  );
}

function presenceCounts(rows, fields) {
  return Object.fromEntries(
    fields.map((field) => {
      const present = countTrue(rows, (row) => row[field] === true);
      return [field, { present, missing: rows.length - present }];
    }),
  );
}

function assertPacketId(source, name) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${name} packet id: ${source.packet_id}`);
  }
}

function assertFailClosed(source, name) {
  if (source.preledger_pass !== false || source.updates_live_ledger !== false) {
    throw new Error(`${name} does not preserve preledger/live-ledger locks.`);
  }
  if ("branch_chart_authorized" in source && source.branch_chart_authorized !== false) {
    throw new Error(`${name} does not preserve branch-chart lock.`);
  }
}

function requireIncludes(text, needles, name) {
  const missing = needles.filter((needle) => !text.includes(needle));
  if (missing.length > 0) {
    throw new Error(`${name} missing expected source text: ${missing.join(", ")}`);
  }
}

function validateInputs(inputs) {
  assertPacketId(inputs.rowEnclosureCertificate, "rowEnclosureCertificate");
  assertPacketId(inputs.sourceReadiness, "sourceReadiness");
  assertPacketId(inputs.proofFieldDependency, "proofFieldDependency");
  assertFailClosed(inputs.rowEnclosureCertificate, "rowEnclosureCertificate");
  assertFailClosed(inputs.sourceReadiness, "sourceReadiness");
  assertFailClosed(inputs.proofFieldDependency, "proofFieldDependency");

  if (inputs.rowEnclosureCertificate.summary?.first_source_packet_blocker !== PRIOR_BLOCKER) {
    throw new Error("Row enclosure certificate no longer exposes the separator-aggregate blocker.");
  }
  if (inputs.rowEnclosureCertificate.summary?.rows_with_row_impulse_enclosure !== 112) {
    throw new Error("Expected 112 row impulse enclosures.");
  }
  if (inputs.rowEnclosureCertificate.summary?.separators_with_separator_aggregate_C_Sigma !== 0) {
    throw new Error("Row enclosure certificate unexpectedly supplies separator aggregates.");
  }
  if (inputs.rowEnclosureCertificate.summary?.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets !== 0) {
    throw new Error("Row enclosure certificate unexpectedly accepts source packets.");
  }
  if (inputs.sourceReadiness.summary?.separator_source_field_profiles !== 12) {
    throw new Error("Expected 12 separator source-field profiles.");
  }
  if (inputs.proofFieldDependency.summary?.first_same_packet_source_packet_blocker !== "same_packet_fold_impulse_or_direct_quadrature_bound_source_packet_absent") {
    throw new Error("Proof-field dependency classifier no longer exposes the expected same-packet source-packet blocker.");
  }
  requireIncludes(
    inputs.contractText,
    [
      "### Separator aggregates",
      "C_\\Sigma",
      "A_{\\Sigma,\\eta,\\epsilon_c}",
      "I^{\\mathrm{fold}}_{\\eta,\\epsilon_c,\\Sigma}",
      "I^{\\mathrm{fold}}_{\\eta,\\epsilon_c,\\Sigma}",
    ],
    "fold_interval_constants_contract.md",
  );
  requireIncludes(
    inputs.fallbackText,
    [
      "coarse fixed-parameter consumption",
      "not direct quadrature",
      "mollifier-norm full-interval fallback",
    ],
    "fold_full_interval_fallback_legality.md",
  );
  for (const row of inputs.rowEnclosureCertificate.row_enclosure_certificates) {
    if (row.selected_route_candidate !== SELECTED_ROUTE) {
      throw new Error(`${row.row_id} route drift.`);
    }
    if (row.row_impulse_enclosure !== true || row.row_acceleration_enclosure_A_B_present !== true) {
      throw new Error(`${row.row_id} is missing row acceleration or impulse enclosure.`);
    }
    if (row.row_tube_eta_sqrt_scaling_certified !== false || row.direct_quadrature_I_fold_B_present !== false) {
      throw new Error(`${row.row_id} unexpectedly claims row-tube scaling or direct quadrature.`);
    }
    if (row.row_consumed !== false || row.preledger_pass !== false || row.updates_live_ledger !== false || row.branch_chart_authorized !== false) {
      throw new Error(`${row.row_id} upstream authorization lock drifted.`);
    }
  }
}

function rowsBySeparator(rows) {
  const map = new Map();
  for (const row of rows) {
    if (!map.has(row.separator_event)) {
      map.set(row.separator_event, []);
    }
    map.get(row.separator_event).push(row);
  }
  for (const [separator, separatorRows] of map.entries()) {
    map.set(
      separator,
      separatorRows.sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right))),
    );
  }
  return map;
}

function buildSeparatorAggregateCertificate(sourceSeparator, separatorRows) {
  const rowLrValues = separatorRows.map((row) => parseDecimalRational(row.candidate_L_r_B));
  const rowAValues = separatorRows.map((row) => parseIntervalRat(row.A_B_eta_epsilon_c_interval_exact));
  const rowIValues = separatorRows.map((row) => parseIntervalRat(row.I_fold_eta_epsilon_c_B_interval_exact));
  const rowLrSum = rowLrValues.reduce(addRat, rat(0n));
  const rowImpulseSum = rowIValues.reduce(addRat, rat(0n));
  const A = maxRat(rowAValues);
  const C = mulRat(rowLrSum, ETA_INV_SQRT_UPPER);
  const normalFormLowerWitness = mulRat(mulRat(C, ETA_SQRT_LOWER), A);
  const rowImpulseSlack = subRat(normalFormLowerWitness, rowImpulseSum);

  const etaSqrtLowerCheck = cmpRat(mulRat(ETA_SQRT_LOWER, ETA_SQRT_LOWER), ETA_EXACT) <= 0;
  const etaInvSqrtUpperCheck = cmpRat(mulRat(ETA_INV_SQRT_UPPER, ETA_INV_SQRT_UPPER), rat(50n)) >= 0;
  const rowImpulseSumBoundCheck = cmpRat(rowImpulseSlack, rat(0n)) >= 0;

  return {
    separator_event: sourceSeparator.separator_event,
    fold_interval: sourceSeparator.fold_interval,
    row_count: separatorRows.length,
    row_ids: separatorRows.map((row) => row.row_id),
    selected_route_candidate: SELECTED_ROUTE,
    aggregate_certificate_rule: AGGREGATE_RULE,
    source_row_enclosures_complete: separatorRows.every((row) => row.row_impulse_enclosure),
    row_acceleration_enclosure_A_B_rows: countTrue(separatorRows, (row) => row.row_acceleration_enclosure_A_B_present),
    row_impulse_enclosures: countTrue(separatorRows, (row) => row.row_impulse_enclosure),
    row_tube_eta_sqrt_scaling_certified_rows: countTrue(
      separatorRows,
      (row) => row.row_tube_eta_sqrt_scaling_certified,
    ),
    direct_quadrature_I_fold_B_rows: countTrue(separatorRows, (row) => row.direct_quadrature_I_fold_B_present),
    eta_exact: interval(ETA_EXACT),
    eta_sqrt_lower_exact: interval(ETA_SQRT_LOWER),
    eta_sqrt_lower_square_le_eta: etaSqrtLowerCheck,
    eta_inv_sqrt_upper_exact: interval(ETA_INV_SQRT_UPPER),
    eta_inv_sqrt_upper_square_ge_eta_inverse: etaInvSqrtUpperCheck,
    L_r_sum_interval_exact: interval(rowLrSum),
    L_r_sum_decimal: decimalRat(rowLrSum),
    C_Sigma_interval_exact: interval(C),
    C_Sigma_decimal: decimalRat(C),
    A_Sigma_eta_epsilon_c_interval_exact: interval(A),
    A_Sigma_eta_epsilon_c_decimal: decimalRat(A),
    I_fold_eta_epsilon_c_Sigma_interval_exact: interval(rowImpulseSum),
    I_fold_eta_epsilon_c_Sigma_decimal: decimalRat(rowImpulseSum),
    normal_form_ceiling_lower_witness_interval_exact: interval(normalFormLowerWitness),
    normal_form_ceiling_lower_witness_decimal: decimalRat(normalFormLowerWitness),
    normal_form_ceiling_minus_row_impulse_sum_interval_exact: interval(rowImpulseSlack),
    normal_form_ceiling_minus_row_impulse_sum_decimal: decimalRat(rowImpulseSlack),
    row_impulse_sum_le_C_Sigma_eta_sqrt_A_Sigma: rowImpulseSumBoundCheck,
    separator_aggregate_C_Sigma_present: true,
    separator_aggregate_A_Sigma_eta_epsilon_c_present: true,
    separator_aggregate_I_fold_eta_epsilon_c_Sigma_present: true,
    same_packet_fold_impulse_or_direct_quadrature_bound: false,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: false,
    source_packet_acceptance_blocker: FIRST_SOURCE_PACKET_BLOCKER,
    accepted_source_packet_scope: "not accepted; aggregate fields are present but source-packet acceptance remains separate",
    higher_fold_separator_layer_certificate: false,
    higher_fold_layer_atlas_ref: false,
    alpha_floor: false,
    exit_floor: false,
    fold_layer_parity_record: false,
    parent_complement_consumption_ref: false,
    first_acceptance_blocker: FIRST_ACCEPTANCE_BLOCKER,
    first_source_packet_blocker: FIRST_SOURCE_PACKET_BLOCKER,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
  };
}

function buildRowAggregateCertificate(row, separatorAggregate) {
  return {
    ...row,
    aggregate_certificate_rule: AGGREGATE_RULE,
    separator_aggregate_ref: `same_packet_separator_aggregate:${separatorAggregate.separator_event}`,
    separator_aggregate_C_Sigma_present: true,
    separator_aggregate_A_Sigma_eta_epsilon_c_present: true,
    separator_aggregate_I_fold_eta_epsilon_c_Sigma_present: true,
    same_packet_fold_impulse_or_direct_quadrature_bound: false,
    accepted_same_packet_fold_impulse_or_direct_quadrature_bound: false,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: false,
    source_packet_acceptance_blocker: FIRST_SOURCE_PACKET_BLOCKER,
    higher_fold_separator_layer_certificate: false,
    higher_fold_layer_atlas_ref: false,
    alpha_floor: false,
    exit_floor: false,
    fold_layer_parity_record: false,
    parent_complement_consumption_ref: false,
    first_acceptance_blocker: FIRST_ACCEPTANCE_BLOCKER,
    first_source_packet_blocker: FIRST_SOURCE_PACKET_BLOCKER,
    accepted_fold_layer_row: false,
    row_consumed: false,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
  };
}

function buildAttempt(paths, inputs) {
  validateInputs(inputs);
  const separatorRows = rowsBySeparator(inputs.rowEnclosureCertificate.row_enclosure_certificates);
  const separatorAggregates = inputs.rowEnclosureCertificate.separator_row_enclosure_certificates
    .map((sourceSeparator) =>
      buildSeparatorAggregateCertificate(sourceSeparator, separatorRows.get(sourceSeparator.separator_event) ?? []),
    )
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event));
  const aggregateBySeparator = new Map(
    separatorAggregates.map((aggregate) => [aggregate.separator_event, aggregate]),
  );
  const rows = inputs.rowEnclosureCertificate.row_enclosure_certificates
    .map((row) => buildRowAggregateCertificate(row, aggregateBySeparator.get(row.separator_event)))
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));

  const separatorFields = [
    "separator_aggregate_C_Sigma_present",
    "separator_aggregate_A_Sigma_eta_epsilon_c_present",
    "separator_aggregate_I_fold_eta_epsilon_c_Sigma_present",
    "same_packet_fold_impulse_or_direct_quadrature_bound",
    "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
    "higher_fold_separator_layer_certificate",
    "higher_fold_layer_atlas_ref",
    "alpha_floor",
    "exit_floor",
    "fold_layer_parity_record",
    "parent_complement_consumption_ref",
  ];
  const rowFields = [
    "row_impulse_enclosure",
    "separator_aggregate_C_Sigma_present",
    "separator_aggregate_A_Sigma_eta_epsilon_c_present",
    "separator_aggregate_I_fold_eta_epsilon_c_Sigma_present",
    "same_packet_fold_impulse_or_direct_quadrature_bound",
    "accepted_same_packet_fold_impulse_or_direct_quadrature_bound",
    "higher_fold_separator_layer_certificate",
    "higher_fold_layer_atlas_ref",
    "alpha_floor",
    "exit_floor",
    "fold_layer_parity_record",
    "parent_complement_consumption_ref",
  ];

  const summary = {
    separator_aggregate_certificates: separatorAggregates.length,
    fold_layer_rows: rows.length,
    rows_by_separator_count: sortedObjectBySeparator(countBy(rows, (row) => row.separator_event)),
    selected_route_candidate: SELECTED_ROUTE,
    aggregate_certificate_rule: AGGREGATE_RULE,
    prior_source_packet_blocker: PRIOR_BLOCKER,
    eta_exact: interval(ETA_EXACT),
    eta_sqrt_lower_exact: interval(ETA_SQRT_LOWER),
    eta_inv_sqrt_upper_exact: interval(ETA_INV_SQRT_UPPER),
    separators_with_separator_aggregate_C_Sigma: countTrue(
      separatorAggregates,
      (separator) => separator.separator_aggregate_C_Sigma_present,
    ),
    separators_with_separator_aggregate_A_Sigma_eta_epsilon_c: countTrue(
      separatorAggregates,
      (separator) => separator.separator_aggregate_A_Sigma_eta_epsilon_c_present,
    ),
    separators_with_separator_aggregate_I_fold_eta_epsilon_c_Sigma: countTrue(
      separatorAggregates,
      (separator) => separator.separator_aggregate_I_fold_eta_epsilon_c_Sigma_present,
    ),
    first_source_packet_blocker: FIRST_SOURCE_PACKET_BLOCKER,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: countTrue(
      separatorAggregates,
      (separator) => separator.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet,
    ),
    rows_with_same_packet_fold_impulse_or_direct_quadrature_bound: countTrue(
      rows,
      (row) => row.same_packet_fold_impulse_or_direct_quadrature_bound,
    ),
    rows_with_accepted_same_packet_fold_impulse_or_direct_quadrature_bound: countTrue(
      rows,
      (row) => row.accepted_same_packet_fold_impulse_or_direct_quadrature_bound,
    ),
    separators_with_higher_fold_separator_layer_certificate: 0,
    rows_with_higher_fold_separator_layer_certificate: 0,
    rows_with_higher_fold_layer_atlas_ref: 0,
    rows_with_alpha_floor: 0,
    rows_with_exit_floor: 0,
    rows_with_fold_layer_parity_record: 0,
    rows_with_parent_complement_consumption_ref: 0,
    first_acceptance_blocker: FIRST_ACCEPTANCE_BLOCKER,
    separator_field_presence_counts: presenceCounts(separatorAggregates, separatorFields),
    row_field_presence_counts: presenceCounts(rows, rowFields),
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
  };

  return {
    schema: "breather-higher-fold-layer-same-packet-separator-aggregate-certificate-attempt-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only same-packet separator aggregate certificate attempt; materializes C_Sigma, A_Sigma_eta_epsilon_c, and I_fold_eta_epsilon_c_Sigma from certified row enclosures while proving no higher_fold_separator_layer_certificate, no row consumption, no preledger pass, no live-ledger update, and no branch-chart authorization",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: true,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      same_packet_row_enclosure_certificate_attempt: artifactRecord(paths.rowEnclosureCertificate),
      separator_source_field_readiness_classifier: artifactRecord(paths.sourceReadiness),
      separator_proof_field_dependency_classifier: artifactRecord(paths.proofFieldDependency),
      fold_interval_constants_contract: artifactRecord(paths.contract),
      fold_full_interval_fallback_legality: artifactRecord(paths.fallbackLegality),
    },
    aggregate_certificate: {
      aggregate_certificate_rule: AGGREGATE_RULE,
      selected_route_candidate: SELECTED_ROUTE,
      eta_exact: interval(ETA_EXACT),
      eta_sqrt_lower_exact: interval(ETA_SQRT_LOWER),
      eta_inv_sqrt_upper_exact: interval(ETA_INV_SQRT_UPPER),
      formula:
        "For each separator, C_Sigma = 8 * sum L_r_B, A_Sigma = max A_B, and I_fold_Sigma = sum I_fold_B. Since 8^2 >= 50 and (1/8)^2 <= eta=1/50, I_fold_Sigma <= C_Sigma * eta^(1/2) * A_Sigma.",
      row_tube_eta_sqrt_scaling_certified: false,
      direct_quadrature_I_fold_B_present: false,
      separator_aggregates_present: true,
      accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: false,
      source_packet_acceptance_blocker: FIRST_SOURCE_PACKET_BLOCKER,
      accepted_source_packet_scope: "not accepted; aggregate fields are present but source-packet acceptance remains separate",
    },
    separator_aggregate_certificates: separatorAggregates,
    row_aggregate_certificates: rows,
    summary,
    next_certificate_handoff: {
      first_source_packet_blocker: FIRST_SOURCE_PACKET_BLOCKER,
      first_acceptance_blocker: FIRST_ACCEPTANCE_BLOCKER,
      remaining_child_fields_absent: [
        "same_packet_fold_impulse_or_direct_quadrature_bound",
        ...REMAINING_CHILD_FIELDS,
      ],
      mechanical_continuation:
        "supply a source-packet acceptance rule for the fixed-parameter aggregate artifact, then derive accepted higher_fold_layer_atlas_ref, alpha_floor, exit_floor, fold_layer_parity_record, and parent_complement_consumption_ref fields before constructing higher_fold_separator_layer_certificate for Sigma_hf_01 through Sigma_hf_12",
      decision_boundary:
        "separator aggregate fields are now finite same-packet interval artifacts; accepting them as same_packet_fold_impulse_or_direct_quadrature_bound source packets remains a proof-rule or primitive-acceptance decision unless a separate artifact supplies that rule",
      fail_closed_stop_conditions: [
        "Do not treat separator aggregate fields as accepted same_packet_fold_impulse_or_direct_quadrature_bound source packets.",
        "Do not treat same_packet_fold_impulse_or_direct_quadrature_bound as higher_fold_separator_layer_certificate.",
        "Do not treat fixed-parameter separator aggregates as row-tube eta-sqrt scaling.",
        "Do not set accepted_fold_layer_row, row_consumed, preledger_pass, updates_live_ledger, or branch_chart_authorized from this aggregate certificate.",
      ],
    },
    authorization_lock: {
      preledger_pass_rows: 0,
      accepted_fold_layer_rows: 0,
      row_consumption_count: 0,
      branch_chart_authorized_rows: 0,
      preledger_pass_authorized: false,
      accepted_fold_layer_rows_authorized: false,
      row_consumption_authorized: false,
      branch_chart_authorized: false,
    },
    capture_decision:
      "Priority-only. This artifact reduces the aggregate-field blocker from separator aggregate absent to source-packet acceptance absent while preserving fail-closed row and ledger state.",
  };
}

function sourceTable(sourceArtifacts) {
  return Object.entries(sourceArtifacts)
    .map(
      ([name, artifact]) =>
        `| \`${name}\` | \`${artifact.basename}\` | ${artifact.present ? "true" : "false"} | \`${artifact.sha256 ?? "missing"}\` |`,
    )
    .join("\n");
}

function countTable(counts) {
  return Object.entries(counts)
    .map(([name, count]) => `| \`${name}\` | ${count} |`)
    .join("\n");
}

function fieldPresenceTable(counts) {
  return Object.entries(counts)
    .map(([field, count]) => `| \`${field}\` | ${count.present} | ${count.missing} |`)
    .join("\n");
}

function separatorTable(separators) {
  return separators
    .map(
      (separator) =>
        `| \`${separator.separator_event}\` | \`${separator.fold_interval}\` | ${separator.row_count} | \`${separator.C_Sigma_decimal}\` | \`${separator.A_Sigma_eta_epsilon_c_decimal}\` | \`${separator.I_fold_eta_epsilon_c_Sigma_decimal}\` | ${separator.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet} | ${separator.higher_fold_separator_layer_certificate} | \`${separator.first_source_packet_blocker}\` |`,
    )
    .join("\n");
}

function reportMarkdown(attempt) {
  return `# Higher-Fold Layer Same-Packet Separator Aggregate Certificate Attempt

Packet: \`${attempt.packet_id}\`

Status: \`${attempt.status}\`

Claim level: ${attempt.claim_level}

## Blocker Sharpened

The prior row enclosure certificate stopped at
\`${attempt.summary.prior_source_packet_blocker}\`. This artifact aggregates the
certified row acceleration/impulse enclosures into separator aggregate fields.
It materializes separator aggregate certificates for
${attempt.summary.separator_aggregate_certificates} /
${attempt.summary.separator_aggregate_certificates} separator layers while
keeping same-packet \`same_packet_fold_impulse_or_direct_quadrature_bound\` child
fields at ${attempt.summary.rows_with_same_packet_fold_impulse_or_direct_quadrature_bound} /
${attempt.summary.fold_layer_rows} fold-layer rows.

This is not a separator-layer certificate and not a row-consumption artifact. It
records 0 higher-fold separator-layer certificates, 0 accepted fold-layer rows,
0 row consumptions, \`preledger_pass=false\`, no live-ledger update, and no
branch-chart authorization.

The first separator-layer acceptance blocker remains
\`${attempt.summary.first_acceptance_blocker}\`. The first source-packet blocker
after aggregation is \`${attempt.summary.first_source_packet_blocker}\`.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(attempt.source_artifacts)}

## Aggregate Rule

| Field | Value |
| --- | --- |
| rule | \`${attempt.aggregate_certificate.aggregate_certificate_rule}\` |
| selected route | \`${attempt.aggregate_certificate.selected_route_candidate}\` |
| eta | \`${attempt.aggregate_certificate.eta_exact.join("..")}\` |
| eta sqrt lower witness | \`${attempt.aggregate_certificate.eta_sqrt_lower_exact.join("..")}\` |
| eta inverse sqrt upper witness | \`${attempt.aggregate_certificate.eta_inv_sqrt_upper_exact.join("..")}\` |
| separator aggregates | ${attempt.aggregate_certificate.separator_aggregates_present} |
| accepted same-packet impulse-bound source packet | ${attempt.aggregate_certificate.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet} |
| row-tube eta-sqrt scaling | ${attempt.aggregate_certificate.row_tube_eta_sqrt_scaling_certified} |
| direct quadrature | ${attempt.aggregate_certificate.direct_quadrature_I_fold_B_present} |

Formula: ${attempt.aggregate_certificate.formula}

## Separator Aggregates

| Separator | Fold interval | Rows | C_Sigma | A_Sigma_eta_epsilon_c | I_fold_eta_epsilon_c_Sigma | Child source packet | Separator certificate | First source-packet blocker |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- | --- |
${separatorTable(attempt.separator_aggregate_certificates)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(attempt.summary.rows_by_separator_count)}

## Field Presence

Separator-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.separator_field_presence_counts)}

Row-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${fieldPresenceTable(attempt.summary.row_field_presence_counts)}

## Certificate-Side Handoff

First separator-layer acceptance blocker:
\`${attempt.next_certificate_handoff.first_acceptance_blocker}\`.

First source-packet blocker:
\`${attempt.next_certificate_handoff.first_source_packet_blocker}\`.

Mechanical continuation: ${attempt.next_certificate_handoff.mechanical_continuation}.

Decision boundary: ${attempt.next_certificate_handoff.decision_boundary}.

Fail-closed stop conditions:

${attempt.next_certificate_handoff.fail_closed_stop_conditions.map((condition) => `- ${condition}`).join("\n")}

## Authorization Lock

- \`preledger_pass\`: ${attempt.preledger_pass}
- \`updates_live_ledger\`: ${attempt.updates_live_ledger}
- \`accepted_fold_layer_rows\`: ${attempt.authorization_lock.accepted_fold_layer_rows}
- \`row_consumption_count\`: ${attempt.authorization_lock.row_consumption_count}
- \`branch_chart_authorized\`: ${attempt.branch_chart_authorized}
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const paths = {
    rowEnclosureCertificate: args.rowEnclosureCertificate,
    sourceReadiness: args.sourceReadiness,
    proofFieldDependency: args.proofFieldDependency,
    contract: args.contract,
    fallbackLegality: args.fallbackLegality,
  };
  const inputs = {
    rowEnclosureCertificate: readJson(paths.rowEnclosureCertificate),
    sourceReadiness: readJson(paths.sourceReadiness),
    proofFieldDependency: readJson(paths.proofFieldDependency),
    contractText: readText(paths.contract),
    fallbackText: readText(paths.fallbackLegality),
  };
  const attempt = buildAttempt(paths, inputs);
  const jsonPath = path.join(args.outDir, OUTPUT_JSON);
  const reportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(jsonPath, attempt, args.pretty);
  writeText(reportPath, reportMarkdown(attempt));
  console.log(`Wrote ${jsonPath}`);
  console.log(`Wrote ${reportPath}`);
}

main();

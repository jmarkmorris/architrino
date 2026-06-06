#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_ROW_COVERAGE_CERTIFICATE = `${CERT_DIR}/higher_fold_layer_same_packet_row_coverage_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CONTRACT = `${CERT_DIR}/fold_interval_constants_contract.md`;
const DEFAULT_FALLBACK_LEGALITY = `${CERT_DIR}/fold_full_interval_fallback_legality.md`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_row_enclosure_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_row_enclosure_certificate_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const SELECTED_ROUTE = "mollifier_norm_full_input_screen_rectangle_fallback";
const STATUS =
  "higher_fold_layer_same_packet_row_enclosure_certificate_attempt_fail_closed_M_delta_Gamma_coverage_row_enclosures_certified_separator_aggregates_absent_no_row_consumption";
const PRIOR_BLOCKER = "dual_mollified_row_integrand_interval_enclosure_absent";
const FIRST_AGGREGATE_BLOCKER = "separator_aggregate_C_Sigma_present_absent";
const ENCLOSURE_RULE = "mollifier_norm_full_input_screen_sup_bound";
const COVERAGE_RULE = "full_input_screen_rectangle_equality";
const COVERAGE_SCOPE = "coarse_fixed_parameter_full_interval_fallback";
const ROW_BOUND_CONSTANT = { n: 18750n, d: 1n };

function parseArgs(argv) {
  const args = {
    rowCoverageCertificate: DEFAULT_ROW_COVERAGE_CERTIFICATE,
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
    } else if (arg === "--row-coverage-certificate") {
      args.rowCoverageCertificate = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-row-enclosure-certificate-attempt.mjs [options]

Options:
  --row-coverage-certificate PATH  Same-packet row coverage certificate attempt. Defaults to ${DEFAULT_ROW_COVERAGE_CERTIFICATE}.
  --contract PATH                  Fold interval constants contract. Defaults to ${DEFAULT_CONTRACT}.
  --fallback-legality PATH         Full-interval fallback legality note. Defaults to ${DEFAULT_FALLBACK_LEGALITY}.
  --out-dir PATH                   Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                         Pretty-print JSON artifact.
  --help                           Show this help.`);
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
  const g = gcd(num, den);
  return { n: num / g, d: den / g };
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

function addRat(left, right) {
  return rat(left.n * right.d + right.n * left.d, left.d * right.d);
}

function mulRat(left, right) {
  return rat(left.n * right.n, left.d * right.d);
}

function formatRat(value) {
  return value.d === 1n ? value.n.toString() : `${value.n}/${value.d}`;
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

function interval(value) {
  const formatted = formatRat(value);
  return [formatted, formatted];
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

function same(value, expected, message) {
  if (value !== expected) {
    throw new Error(`${message}: expected ${expected}, got ${value}`);
  }
}

function validateInputs(inputs) {
  assertPacketId(inputs.rowCoverageCertificate, "rowCoverageCertificate");
  assertFailClosed(inputs.rowCoverageCertificate, "rowCoverageCertificate");
  if (inputs.rowCoverageCertificate.summary?.first_source_packet_blocker !== PRIOR_BLOCKER) {
    throw new Error("Row coverage certificate no longer exposes the row-enclosure blocker.");
  }
  if (inputs.rowCoverageCertificate.summary?.rows_with_accepted_row_projection_source_slice_coverage_certificate !== 112) {
    throw new Error("Expected 112 accepted row projection/source-slice coverage certificates.");
  }
  if (inputs.rowCoverageCertificate.summary?.rows_with_dual_mollified_row_integrand_interval_enclosure !== 0) {
    throw new Error("Row coverage certificate unexpectedly supplies row enclosures.");
  }
  if (inputs.rowCoverageCertificate.summary?.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets !== 0) {
    throw new Error("Row coverage certificate unexpectedly accepts source packets.");
  }
  requireIncludes(
    inputs.contractText,
    [
      "Row acceleration or impulse enclosures",
      "A_{B,\\eta,\\epsilon_c}",
      "I^{\\mathrm{fold}}_{\\eta,\\epsilon_c,B}",
      "Separator aggregates",
    ],
    "fold_interval_constants_contract.md",
  );
  requireIncludes(
    inputs.fallbackText,
    [
      "full-interval fallback",
      "\\|\\delta_\\eta\\|_\\infty=46.875",
      "\\frac{\\Gamma M_\\delta}{\\eta\\epsilon_c^2}",
      "not direct quadrature",
    ],
    "fold_full_interval_fallback_legality.md",
  );
  for (const row of inputs.rowCoverageCertificate.row_coverage_certificates) {
    same(row.selected_route_candidate, SELECTED_ROUTE, `${row.row_id} selected route drift`);
    same(row.coverage_certificate_rule, COVERAGE_RULE, `${row.row_id} coverage rule drift`);
    same(row.coverage_certificate_scope, COVERAGE_SCOPE, `${row.row_id} coverage scope drift`);
    same(row.accepted_row_projection_source_slice_coverage_certificate, true, `${row.row_id} coverage absent`);
    same(row.row_tube_eta_sqrt_scaling_certified, false, `${row.row_id} row-tube scaling unexpectedly certified`);
    same(row.M_delta_interval_certified, true, `${row.row_id} M_delta absent`);
    same(row.delta_eta_sup_norm_interval_certified, true, `${row.row_id} delta_eta norm absent`);
    same(row.Gamma_g_coupling_certified, true, `${row.row_id} Gamma/g absent`);
    same(row.dual_mollified_row_integrand_interval_enclosure, false, `${row.row_id} upstream row enclosure already present`);
    same(row.row_impulse_enclosure, false, `${row.row_id} upstream row impulse already present`);
    same(row.accepted_same_packet_fold_impulse_or_direct_quadrature_bound, false, `${row.row_id} upstream source packet already accepted`);
    same(row.row_consumed, false, `${row.row_id} upstream row consumed`);
    same(row.preledger_pass, false, `${row.row_id} upstream preledger pass`);
    same(row.updates_live_ledger, false, `${row.row_id} upstream live-ledger update`);
    same(row.branch_chart_authorized, false, `${row.row_id} upstream branch-chart authorization`);
  }
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

function rowEnclosureCertificate(row) {
  const Lr = parseDecimalRational(row.candidate_L_r_B);
  const Ls = parseDecimalRational(row.candidate_L_s_B);
  const A = mulRat(ROW_BOUND_CONSTANT, Ls);
  const I = mulRat(Lr, A);
  return {
    ...row,
    enclosure_certificate_rule: ENCLOSURE_RULE,
    row_bound_constant_exact: interval(ROW_BOUND_CONSTANT),
    row_bound_constant_decimal: decimalRat(ROW_BOUND_CONSTANT),
    acceleration_enclosure_formula:
      "A_B = (Gamma * delta_eta_sup_norm / epsilon_c^2) * L_s_B = 18750 * L_s_B",
    impulse_enclosure_formula: "I_B = L_r_B * A_B",
    A_B_eta_epsilon_c_interval_exact: interval(A),
    A_B_eta_epsilon_c_decimal: decimalRat(A),
    I_fold_eta_epsilon_c_B_interval_exact: interval(I),
    I_fold_eta_epsilon_c_B_decimal: decimalRat(I),
    dual_mollified_row_integrand_interval_enclosure: true,
    row_acceleration_enclosure_A_B_present: true,
    row_impulse_enclosure: true,
    direct_quadrature_I_fold_B_present: false,
    accepted_same_packet_fold_impulse_or_direct_quadrature_bound: false,
    first_source_packet_blocker: FIRST_AGGREGATE_BLOCKER,
    first_coverage_blocker: null,
    first_numerical_enclosure_blocker: null,
    accepted_fold_layer_row: false,
    row_consumed: false,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
  };
}

function separatorEnclosureCertificates(sourceSeparators, rows) {
  const rowsBySeparator = new Map();
  for (const row of rows) {
    if (!rowsBySeparator.has(row.separator_event)) {
      rowsBySeparator.set(row.separator_event, []);
    }
    rowsBySeparator.get(row.separator_event).push(row);
  }
  return sourceSeparators
    .map((separator) => {
      const separatorRows = (rowsBySeparator.get(separator.separator_event) ?? []).sort((left, right) =>
        rowSortKey(left).localeCompare(rowSortKey(right)),
      );
      const candidateImpulseSum = separatorRows.reduce(
        (sum, row) => addRat(sum, parseIntervalRat(row.I_fold_eta_epsilon_c_B_interval_exact)),
        rat(0n),
      );
      return {
        separator_event: separator.separator_event,
        fold_interval: separator.fold_interval,
        row_count: separatorRows.length,
        row_ids: separatorRows.map((row) => row.row_id),
        selected_route_candidate: SELECTED_ROUTE,
        enclosure_certificate_rule: ENCLOSURE_RULE,
        accepted_row_projection_source_slice_coverage_certificates: countTrue(
          separatorRows,
          (row) => row.accepted_row_projection_source_slice_coverage_certificate,
        ),
        dual_mollified_row_integrand_interval_enclosures: countTrue(
          separatorRows,
          (row) => row.dual_mollified_row_integrand_interval_enclosure,
        ),
        row_acceleration_enclosure_A_B_rows: countTrue(
          separatorRows,
          (row) => row.row_acceleration_enclosure_A_B_present,
        ),
        row_impulse_enclosures: countTrue(separatorRows, (row) => row.row_impulse_enclosure),
        direct_quadrature_I_fold_B_rows: 0,
        candidate_row_impulse_sum_interval_exact: interval(candidateImpulseSum),
        candidate_row_impulse_sum_decimal: decimalRat(candidateImpulseSum),
        candidate_row_impulse_sum_is_separator_aggregate: false,
        row_tube_projection_E_B_rows: countTrue(separatorRows, (row) => row.row_tube_projection_E_B_present),
        row_tube_eta_sqrt_scaling_certified_rows: countTrue(
          separatorRows,
          (row) => row.row_tube_eta_sqrt_scaling_certified,
        ),
        mollifier_route_declared: true,
        M_delta_interval_certified: separatorRows.every((row) => row.M_delta_interval_certified),
        delta_eta_sup_norm_interval_certified: separatorRows.every(
          (row) => row.delta_eta_sup_norm_interval_certified,
        ),
        Gamma_g_coupling_certified: separatorRows.every((row) => row.Gamma_g_coupling_certified),
        separator_aggregate_C_Sigma_present: false,
        separator_aggregate_A_Sigma_eta_epsilon_c_present: false,
        separator_aggregate_I_fold_eta_epsilon_c_Sigma_present: false,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: false,
        first_source_packet_blocker: FIRST_AGGREGATE_BLOCKER,
        first_coverage_blocker: null,
        first_numerical_enclosure_blocker: null,
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
      };
    })
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event));
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

function buildAttempt(paths, inputs) {
  validateInputs(inputs);
  const rows = inputs.rowCoverageCertificate.row_coverage_certificates
    .map(rowEnclosureCertificate)
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));
  const separators = separatorEnclosureCertificates(
    inputs.rowCoverageCertificate.separator_row_coverage_certificates,
    rows,
  );
  const rowFields = [
    "accepted_row_projection_source_slice_coverage_certificate",
    "row_tube_projection_E_B_present",
    "row_tube_eta_sqrt_scaling_certified",
    "M_delta_interval_certified",
    "delta_eta_sup_norm_interval_certified",
    "Gamma_g_coupling_certified",
    "dual_mollified_row_integrand_interval_enclosure",
    "row_acceleration_enclosure_A_B_present",
    "row_impulse_enclosure",
    "direct_quadrature_I_fold_B_present",
    "accepted_same_packet_fold_impulse_or_direct_quadrature_bound",
  ];
  const separatorFields = [
    "M_delta_interval_certified",
    "delta_eta_sup_norm_interval_certified",
    "Gamma_g_coupling_certified",
    "separator_aggregate_C_Sigma_present",
    "separator_aggregate_A_Sigma_eta_epsilon_c_present",
    "separator_aggregate_I_fold_eta_epsilon_c_Sigma_present",
    "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
  ];

  const summary = {
    separator_row_enclosure_certificates: separators.length,
    fold_layer_rows: rows.length,
    rows_by_separator_count: sortedObjectBySeparator(countBy(rows, (row) => row.separator_event)),
    selected_route_candidate: SELECTED_ROUTE,
    prior_source_packet_blocker: PRIOR_BLOCKER,
    enclosure_certificate_rule: ENCLOSURE_RULE,
    row_bound_constant_exact: interval(ROW_BOUND_CONSTANT),
    row_bound_constant_decimal: decimalRat(ROW_BOUND_CONSTANT),
    separators_with_accepted_row_projection_source_slice_coverage_certificate: countTrue(
      separators,
      (separator) => separator.accepted_row_projection_source_slice_coverage_certificates === separator.row_count,
    ),
    rows_with_accepted_row_projection_source_slice_coverage_certificate: countTrue(
      rows,
      (row) => row.accepted_row_projection_source_slice_coverage_certificate,
    ),
    separators_with_dual_mollified_row_integrand_interval_enclosure: countTrue(
      separators,
      (separator) => separator.dual_mollified_row_integrand_interval_enclosures === separator.row_count,
    ),
    rows_with_dual_mollified_row_integrand_interval_enclosure: countTrue(
      rows,
      (row) => row.dual_mollified_row_integrand_interval_enclosure,
    ),
    rows_with_row_acceleration_enclosure_A_B: countTrue(
      rows,
      (row) => row.row_acceleration_enclosure_A_B_present,
    ),
    rows_with_row_impulse_enclosure: countTrue(rows, (row) => row.row_impulse_enclosure),
    rows_with_direct_quadrature_I_fold_B: 0,
    rows_with_row_tube_eta_sqrt_scaling_certified: countTrue(
      rows,
      (row) => row.row_tube_eta_sqrt_scaling_certified,
    ),
    separators_with_separator_aggregate_C_Sigma: 0,
    separators_with_separator_aggregate_A_Sigma_eta_epsilon_c: 0,
    separators_with_separator_aggregate_I_fold_eta_epsilon_c_Sigma: 0,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: 0,
    first_source_packet_blocker: FIRST_AGGREGATE_BLOCKER,
    first_coverage_blocker: null,
    first_numerical_enclosure_blocker: null,
    separator_field_presence_counts: presenceCounts(separators, separatorFields),
    row_field_presence_counts: presenceCounts(rows, rowFields),
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
  };

  return {
    schema: "breather-higher-fold-layer-same-packet-row-enclosure-certificate-attempt-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only same-packet row acceleration/impulse enclosure certificate attempt; uses the full input-screen mollifier-norm sup-bound fallback after M_delta, Gamma/g, and coverage are certified while proving no separator aggregate, no accepted source packet, no row consumption, no preledger pass, no live-ledger update, and no branch-chart authorization",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: true,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      same_packet_row_coverage_certificate_attempt: artifactRecord(paths.rowCoverageCertificate),
      fold_interval_constants_contract: artifactRecord(paths.contract),
      fold_full_interval_fallback_legality: artifactRecord(paths.fallbackLegality),
    },
    enclosure_certificate: {
      dual_mollified_row_integrand_interval_enclosure: true,
      row_acceleration_enclosure_A_B_present: true,
      row_impulse_enclosure: true,
      enclosure_certificate_rule: ENCLOSURE_RULE,
      selected_route_candidate: SELECTED_ROUTE,
      row_bound_constant_exact: interval(ROW_BOUND_CONSTANT),
      row_bound_constant_decimal: decimalRat(ROW_BOUND_CONSTANT),
      formula:
        "For each covered row, |a_fold_B(t)| <= Gamma * delta_eta_sup_norm * epsilon_c^{-2} * L_s_B = 18750 * L_s_B, and I_fold_B <= L_r_B * A_B.",
      direct_quadrature_I_fold_B_present: false,
      row_tube_eta_sqrt_scaling_certified: false,
      separator_aggregates_present: false,
      accepted_as_same_packet_fold_impulse_or_direct_quadrature_source_packet: false,
    },
    separator_row_enclosure_certificates: separators,
    row_enclosure_certificates: rows,
    summary,
    next_certificate_handoff: {
      first_source_packet_blocker: FIRST_AGGREGATE_BLOCKER,
      first_coverage_blocker: null,
      first_numerical_enclosure_blocker: null,
      mechanical_continuation:
        "produce separator aggregate C_Sigma, A_Sigma_eta_epsilon_c, and I_fold_eta_epsilon_c_Sigma fields, or an explicitly declared direct row-impulse aggregate route, before accepting a same-packet source packet",
      final_certificate_target:
        "accepted same_packet_fold_impulse_or_direct_quadrature_bound source packet feeding the higher_fold_separator_layer_certificate for Sigma_hf_01 through Sigma_hf_12",
      decision_boundary:
        "row enclosures can continue mechanically into separator aggregation; if aggregation requires row-tube eta-sqrt scaling rather than fixed-parameter full-interval consumption, the lane reaches a proof-rule or primitive-acceptance decision before source-packet acceptance or row consumption",
      fail_closed_stop_conditions: [
        "Do not treat row enclosures as separator aggregates.",
        "Do not treat full input-screen row enclosures as row-tube eta-sqrt scaling.",
        "Do not set same_packet_fold_impulse_or_direct_quadrature_bound, higher_fold_separator_layer_certificate, preledger_pass, updates_live_ledger, accepted_fold_layer_row, row_consumed, or branch_chart_authorized from this row-enclosure certificate.",
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
      "Priority-only. This artifact reduces the source-packet checklist from row enclosure absent to separator aggregate absent while preserving fail-closed row and ledger state.",
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

function presenceTable(counts) {
  return Object.entries(counts)
    .map(([name, count]) => `| \`${name}\` | ${count.present} | ${count.missing} |`)
    .join("\n");
}

function separatorTable(separators) {
  return separators
    .map(
      (separator) =>
        `| \`${separator.separator_event}\` | \`${separator.fold_interval}\` | ${separator.row_count} | ${separator.dual_mollified_row_integrand_interval_enclosures} | ${separator.row_impulse_enclosures} | \`${separator.candidate_row_impulse_sum_decimal}\` | ${separator.separator_aggregate_I_fold_eta_epsilon_c_Sigma_present} | \`${separator.first_source_packet_blocker}\` |`,
    )
    .join("\n");
}

function writeReport(filePath, attempt) {
  const report = `# Higher-Fold Layer Same-Packet Row Enclosure Certificate Attempt

Packet: \`${PACKET_ID}\`

Status: \`${attempt.status}\`

Claim level: ${attempt.claim_level}

## Blocker Sharpened

The prior row coverage certificate stopped at
\`${attempt.summary.prior_source_packet_blocker}\`. This artifact applies the
coarse fixed-parameter full-interval fallback row by row. The exact bound
constant is \`${attempt.summary.row_bound_constant_exact[0]}\`, from the
certified \`delta_eta_sup_norm=375/8\`, \`epsilon_c=0.05\`, and \`Gamma=g=1\`.

The row enclosure certificate is present for
${attempt.summary.separators_with_dual_mollified_row_integrand_interval_enclosure} /
${attempt.summary.separator_row_enclosure_certificates} separator layers and
${attempt.summary.rows_with_dual_mollified_row_integrand_interval_enclosure} /
${attempt.summary.fold_layer_rows} fold-layer rows.

This is not a separator aggregate artifact and not a row-consumption artifact.
It records 0 row-tube eta-sqrt scaling certificates, 0 separator aggregates, 0
accepted source packets, 0 row consumptions, \`preledger_pass=false\`, no
live-ledger update, and no branch-chart authorization.

The first source-packet blocker after this artifact is
\`${attempt.summary.first_source_packet_blocker}\`.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(attempt.source_artifacts)}

## Row Enclosure Rule

| Field | Value |
| --- | --- |
| rule | \`${attempt.enclosure_certificate.enclosure_certificate_rule}\` |
| selected route | \`${attempt.enclosure_certificate.selected_route_candidate}\` |
| row bound constant | \`${attempt.enclosure_certificate.row_bound_constant_exact.join("..")}\` |
| row bound constant decimal | \`${attempt.enclosure_certificate.row_bound_constant_decimal}\` |
| row integrand enclosure | ${attempt.enclosure_certificate.dual_mollified_row_integrand_interval_enclosure} |
| row acceleration enclosure | ${attempt.enclosure_certificate.row_acceleration_enclosure_A_B_present} |
| row impulse enclosure | ${attempt.enclosure_certificate.row_impulse_enclosure} |
| direct quadrature | ${attempt.enclosure_certificate.direct_quadrature_I_fold_B_present} |
| row-tube eta-sqrt scaling | ${attempt.enclosure_certificate.row_tube_eta_sqrt_scaling_certified} |
| separator aggregates | ${attempt.enclosure_certificate.separator_aggregates_present} |
| accepted source packet | ${attempt.enclosure_certificate.accepted_as_same_packet_fold_impulse_or_direct_quadrature_source_packet} |

Formula: ${attempt.enclosure_certificate.formula}

## Separator Row Enclosures

| Separator | Fold interval | Rows | Row integrand enclosures | Row impulse enclosures | Candidate row-impulse sum | Accepted separator impulse aggregate | First source-packet blocker |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
${separatorTable(attempt.separator_row_enclosure_certificates)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(attempt.summary.rows_by_separator_count)}

## Field Presence

Separator-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${presenceTable(attempt.summary.separator_field_presence_counts)}

Row-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${presenceTable(attempt.summary.row_field_presence_counts)}

## Certificate-Side Handoff

First source-packet blocker:
\`${attempt.next_certificate_handoff.first_source_packet_blocker}\`.

Mechanical continuation: ${attempt.next_certificate_handoff.mechanical_continuation}.

Decision boundary: ${attempt.next_certificate_handoff.decision_boundary}.

Fail-closed stop conditions:

${attempt.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`accepted_fold_layer_rows\`: 0
- \`row_consumption_count\`: 0
- \`branch_chart_authorized\`: false
`;
  writeText(filePath, report);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const paths = {
    rowCoverageCertificate: args.rowCoverageCertificate,
    contract: args.contract,
    fallbackLegality: args.fallbackLegality,
  };
  const inputs = {
    rowCoverageCertificate: readJson(paths.rowCoverageCertificate),
    contractText: readText(paths.contract),
    fallbackText: readText(paths.fallbackLegality),
  };
  const attempt = buildAttempt(paths, inputs);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, attempt, args.pretty);
  writeReport(outReport, attempt);
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();

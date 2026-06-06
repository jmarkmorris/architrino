#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_SOURCE_PACKET_ATTEMPT = `${CERT_DIR}/higher_fold_layer_same_packet_impulse_direct_quadrature_source_packet_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ROUTE_DECLARATION = `${CERT_DIR}/higher_fold_layer_same_packet_impulse_route_declaration_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_COUPLING_CERTIFICATE = `${CERT_DIR}/higher_fold_layer_same_packet_mollifier_coupling_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CONTRACT = `${CERT_DIR}/fold_interval_constants_contract.md`;
const DEFAULT_FALLBACK_LEGALITY = `${CERT_DIR}/fold_full_interval_fallback_legality.md`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_row_coverage_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_row_coverage_certificate_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const SELECTED_ROUTE = "mollifier_norm_full_input_screen_rectangle_fallback";
const STATUS =
  "higher_fold_layer_same_packet_row_coverage_certificate_attempt_fail_closed_M_delta_Gamma_coverage_certified_integrand_enclosures_absent_no_row_consumption";
const PRIOR_BLOCKER = "row_projection_source_slice_coverage_certificate_absent";
const FIRST_NUMERICAL_ENCLOSURE_BLOCKER = "dual_mollified_row_integrand_interval_enclosure_absent";
const COVERAGE_RULE = "full_input_screen_rectangle_equality";
const COVERAGE_SCOPE = "coarse_fixed_parameter_full_interval_fallback";
const CANDIDATE_E_B = "full_input_screen_receiver_interval";
const CANDIDATE_S_B_T = "full_input_screen_source_interval_for_all_receiver_t";

function parseArgs(argv) {
  const args = {
    sourcePacketAttempt: DEFAULT_SOURCE_PACKET_ATTEMPT,
    routeDeclaration: DEFAULT_ROUTE_DECLARATION,
    couplingCertificate: DEFAULT_COUPLING_CERTIFICATE,
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
    } else if (arg === "--source-packet-attempt") {
      args.sourcePacketAttempt = argv[++index];
    } else if (arg === "--route-declaration") {
      args.routeDeclaration = argv[++index];
    } else if (arg === "--coupling-certificate") {
      args.couplingCertificate = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-row-coverage-certificate-attempt.mjs [options]

Options:
  --source-packet-attempt PATH  Same-packet impulse/direct-quadrature source-packet attempt. Defaults to ${DEFAULT_SOURCE_PACKET_ATTEMPT}.
  --route-declaration PATH      Same-packet route declaration attempt. Defaults to ${DEFAULT_ROUTE_DECLARATION}.
  --coupling-certificate PATH   Same-packet mollifier coupling certificate attempt. Defaults to ${DEFAULT_COUPLING_CERTIFICATE}.
  --contract PATH               Fold interval constants contract. Defaults to ${DEFAULT_CONTRACT}.
  --fallback-legality PATH      Full-interval fallback legality note. Defaults to ${DEFAULT_FALLBACK_LEGALITY}.
  --out-dir PATH                Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                      Pretty-print JSON artifact.
  --help                        Show this help.`);
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

function mapByRowId(rows, name) {
  const map = new Map();
  for (const row of rows) {
    if (map.has(row.row_id)) {
      throw new Error(`${name} has duplicate row_id ${row.row_id}`);
    }
    map.set(row.row_id, row);
  }
  return map;
}

function arraysEqual(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function same(value, expected, message) {
  if (value !== expected) {
    throw new Error(`${message}: expected ${expected}, got ${value}`);
  }
}

function validateRowJoin(sourceRow, routeRow, couplingRow) {
  same(routeRow.row_id, sourceRow.row_id, "route row id mismatch");
  same(couplingRow.row_id, sourceRow.row_id, "coupling row id mismatch");
  for (const field of ["ledger", "status", "failure_code", "separator_event", "fold_interval"]) {
    same(routeRow[field], sourceRow[field], `${sourceRow.row_id} route/source ${field} mismatch`);
    same(couplingRow[field], sourceRow[field], `${sourceRow.row_id} coupling/source ${field} mismatch`);
  }
  same(routeRow.receiver_interval, sourceRow.receiver_interval, `${sourceRow.row_id} receiver interval mismatch`);
  same(routeRow.source_interval, sourceRow.source_interval, `${sourceRow.row_id} source interval mismatch`);
  same(sourceRow.full_rectangle_interval_sources_present, true, `${sourceRow.row_id} full rectangle source absent`);
  same(sourceRow.row_projection_source_slice_candidate_present, true, `${sourceRow.row_id} row projection/source slice candidate absent`);
  same(routeRow.candidate_full_rectangle_coverage_source_present, true, `${sourceRow.row_id} route full rectangle source absent`);
  same(routeRow.candidate_E_B, CANDIDATE_E_B, `${sourceRow.row_id} route candidate_E_B drift`);
  same(routeRow.candidate_S_B_t, CANDIDATE_S_B_T, `${sourceRow.row_id} route candidate_S_B_t drift`);
  same(sourceRow.candidate_row_projection, CANDIDATE_E_B, `${sourceRow.row_id} source candidate_row_projection drift`);
  same(sourceRow.candidate_source_slice, CANDIDATE_S_B_T, `${sourceRow.row_id} source candidate_source_slice drift`);
  same(routeRow.candidate_L_r_B, sourceRow.receiver_t_width_decimal, `${sourceRow.row_id} candidate_L_r_B mismatch`);
  same(routeRow.candidate_L_s_B, sourceRow.source_t_width_decimal, `${sourceRow.row_id} candidate_L_s_B mismatch`);
  same(routeRow.selected_route_candidate, SELECTED_ROUTE, `${sourceRow.row_id} selected route drift`);
  same(couplingRow.selected_route_candidate, SELECTED_ROUTE, `${sourceRow.row_id} coupling route drift`);
  same(routeRow.mollifier_route_declared, true, `${sourceRow.row_id} route declaration absent`);
  same(routeRow.direct_quadrature_route_declared, false, `${sourceRow.row_id} direct quadrature unexpectedly declared`);
  same(couplingRow.mollifier_route_declared, true, `${sourceRow.row_id} coupling route declaration absent`);
  same(couplingRow.M_delta_interval_certified, true, `${sourceRow.row_id} M_delta certificate absent`);
  same(couplingRow.delta_eta_sup_norm_interval_certified, true, `${sourceRow.row_id} delta_eta norm certificate absent`);
  same(couplingRow.Gamma_g_coupling_certified, true, `${sourceRow.row_id} Gamma/g certificate absent`);
  same(couplingRow.accepted_row_projection_source_slice_coverage_certificate, false, `${sourceRow.row_id} upstream coverage already accepted`);
  same(couplingRow.dual_mollified_row_integrand_interval_enclosure, false, `${sourceRow.row_id} upstream enclosure already accepted`);
  same(couplingRow.row_consumed, false, `${sourceRow.row_id} upstream row already consumed`);
  same(couplingRow.preledger_pass, false, `${sourceRow.row_id} upstream row already passed preledger`);
  same(couplingRow.updates_live_ledger, false, `${sourceRow.row_id} upstream row already updates live ledger`);
  same(couplingRow.branch_chart_authorized, false, `${sourceRow.row_id} upstream row already authorizes branch chart`);
}

function validateInputs(inputs) {
  assertPacketId(inputs.sourcePacketAttempt, "sourcePacketAttempt");
  assertPacketId(inputs.routeDeclaration, "routeDeclaration");
  assertPacketId(inputs.couplingCertificate, "couplingCertificate");
  assertFailClosed(inputs.sourcePacketAttempt, "sourcePacketAttempt");
  assertFailClosed(inputs.routeDeclaration, "routeDeclaration");
  assertFailClosed(inputs.couplingCertificate, "couplingCertificate");

  if (inputs.sourcePacketAttempt.summary?.rows_with_full_rectangle_interval_sources !== 112) {
    throw new Error("Expected 112 rows with full rectangle interval sources.");
  }
  if (inputs.sourcePacketAttempt.summary?.rows_with_row_projection_source_slice_candidates !== 112) {
    throw new Error("Expected 112 row projection/source-slice candidates.");
  }
  if (inputs.routeDeclaration.summary?.selected_route_candidate !== SELECTED_ROUTE) {
    throw new Error("Route declaration no longer selects the mollifier full input-screen rectangle fallback.");
  }
  if (inputs.routeDeclaration.summary?.rows_with_candidate_E_B !== 112) {
    throw new Error("Expected 112 candidate E_B rows.");
  }
  if (inputs.routeDeclaration.summary?.rows_with_candidate_S_B_t !== 112) {
    throw new Error("Expected 112 candidate S_B(t) rows.");
  }
  if (inputs.couplingCertificate.summary?.first_source_packet_blocker !== PRIOR_BLOCKER) {
    throw new Error("Coupling certificate no longer exposes the coverage blocker.");
  }
  if (inputs.couplingCertificate.summary?.rows_with_M_delta_interval_certified !== 112) {
    throw new Error("Expected M_delta certification for 112 fold-layer rows.");
  }
  if (inputs.couplingCertificate.summary?.rows_with_Gamma_g_coupling_certified !== 112) {
    throw new Error("Expected Gamma/g certification for 112 fold-layer rows.");
  }
  if (inputs.couplingCertificate.summary?.rows_with_accepted_row_projection_source_slice_coverage_certificate !== 0) {
    throw new Error("Coupling certificate unexpectedly accepts row coverage.");
  }
  if (inputs.couplingCertificate.summary?.rows_with_dual_mollified_row_integrand_interval_enclosure !== 0) {
    throw new Error("Coupling certificate unexpectedly supplies row enclosures.");
  }
  requireIncludes(
    inputs.contractText,
    ["Row-tube projections and source slices", "contain the full mollifier contribution assigned to that row"],
    "fold_interval_constants_contract.md",
  );
  requireIncludes(
    inputs.fallbackText,
    ["full-interval fallback", "E_B=I_", "S_B(t)=I_", "not a proof of"],
    "fold_full_interval_fallback_legality.md",
  );

  const routeRows = mapByRowId(inputs.routeDeclaration.row_route_declarations, "routeDeclaration");
  const couplingRows = mapByRowId(inputs.couplingCertificate.row_mollifier_coupling_certificates, "couplingCertificate");
  if (inputs.sourcePacketAttempt.row_source_packet_attempts.length !== routeRows.size) {
    throw new Error("Source and route row counts differ.");
  }
  if (inputs.sourcePacketAttempt.row_source_packet_attempts.length !== couplingRows.size) {
    throw new Error("Source and coupling row counts differ.");
  }
  for (const sourceRow of inputs.sourcePacketAttempt.row_source_packet_attempts) {
    const routeRow = routeRows.get(sourceRow.row_id);
    const couplingRow = couplingRows.get(sourceRow.row_id);
    if (!routeRow || !couplingRow) {
      throw new Error(`Missing joined row ${sourceRow.row_id}`);
    }
    validateRowJoin(sourceRow, routeRow, couplingRow);
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

function rowCoverageCertificate(sourceRow, routeRow, couplingRow) {
  return {
    row_id: sourceRow.row_id,
    ledger: sourceRow.ledger,
    status: sourceRow.status,
    failure_code: sourceRow.failure_code,
    separator_event: sourceRow.separator_event,
    fold_interval: sourceRow.fold_interval,
    receiver_interval: sourceRow.receiver_interval,
    source_interval: sourceRow.source_interval,
    receiver_type: sourceRow.receiver_type,
    source_type: sourceRow.source_type,
    receiver_theta_range: sourceRow.receiver_theta_range,
    source_theta_range: sourceRow.source_theta_range,
    receiver_t_range: sourceRow.receiver_t_range,
    source_t_range: sourceRow.source_t_range,
    receiver_t_width_decimal: sourceRow.receiver_t_width_decimal,
    source_t_width_decimal: sourceRow.source_t_width_decimal,
    selected_route_candidate: SELECTED_ROUTE,
    coverage_certificate_rule: COVERAGE_RULE,
    coverage_certificate_scope: COVERAGE_SCOPE,
    full_rectangle_interval_sources_present: true,
    candidate_full_rectangle_coverage_source_present: true,
    candidate_E_B: routeRow.candidate_E_B,
    candidate_S_B_t: routeRow.candidate_S_B_t,
    candidate_L_r_B: routeRow.candidate_L_r_B,
    candidate_L_s_B: routeRow.candidate_L_s_B,
    full_input_screen_E_B_present: true,
    full_input_screen_S_B_t_present: true,
    source_slice_S_B_t_present: true,
    L_r_B_present: true,
    L_s_B_present: true,
    row_tube_projection_E_B_present: false,
    row_tube_eta_sqrt_scaling_certified: false,
    mollifier_route_declared: true,
    direct_quadrature_route_declared: false,
    M_delta_interval_certified: couplingRow.M_delta_interval_certified,
    M_delta_interval_exact: couplingRow.M_delta_interval_exact,
    delta_eta_sup_norm_interval_certified: couplingRow.delta_eta_sup_norm_interval_certified,
    delta_eta_sup_norm_exact: couplingRow.delta_eta_sup_norm_exact,
    Gamma_g_coupling_certified: couplingRow.Gamma_g_coupling_certified,
    Gamma_interval_exact: couplingRow.Gamma_interval_exact,
    packet_g_exact: couplingRow.packet_g_exact,
    accepted_row_projection_source_slice_coverage_certificate: true,
    coverage_certificate_acceptance_reason:
      "The chosen E_B is the full receiver interval and S_B(t) is the full source interval for all receiver t, matching the source-packet full input-screen row rectangle by equality.",
    dual_mollified_row_integrand_interval_enclosure: false,
    direct_quadrature_I_fold_B_present: false,
    row_acceleration_enclosure_A_B_present: false,
    row_impulse_enclosure: false,
    accepted_same_packet_fold_impulse_or_direct_quadrature_bound: false,
    first_source_packet_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
    first_coverage_blocker: null,
    first_numerical_enclosure_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
    accepted_fold_layer_row: false,
    row_consumed: false,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
  };
}

function separatorCoverageCertificates(sourceSeparators, rows) {
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
      return {
        separator_event: separator.separator_event,
        fold_interval: separator.fold_interval,
        row_count: separatorRows.length,
        row_ids: separatorRows.map((row) => row.row_id),
        selected_route_candidate: SELECTED_ROUTE,
        coverage_certificate_rule: COVERAGE_RULE,
        coverage_certificate_scope: COVERAGE_SCOPE,
        full_rectangle_interval_sources_present:
          separatorRows.length === separator.row_count &&
          separatorRows.every((row) => row.full_rectangle_interval_sources_present),
        accepted_row_projection_source_slice_coverage_certificates: countTrue(
          separatorRows,
          (row) => row.accepted_row_projection_source_slice_coverage_certificate,
        ),
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
        dual_mollified_row_integrand_interval_enclosures: 0,
        direct_quadrature_I_fold_B_rows: 0,
        row_impulse_enclosures: 0,
        separator_aggregate_C_Sigma_present: false,
        separator_aggregate_A_Sigma_eta_epsilon_c_present: false,
        separator_aggregate_I_fold_eta_epsilon_c_Sigma_present: false,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: false,
        first_source_packet_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
        first_coverage_blocker: null,
        first_numerical_enclosure_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
      };
    })
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event));
}

function buildAttempt(paths, inputs) {
  validateInputs(inputs);
  const routeRows = mapByRowId(inputs.routeDeclaration.row_route_declarations, "routeDeclaration");
  const couplingRows = mapByRowId(inputs.couplingCertificate.row_mollifier_coupling_certificates, "couplingCertificate");
  const rows = inputs.sourcePacketAttempt.row_source_packet_attempts
    .map((sourceRow) => rowCoverageCertificate(sourceRow, routeRows.get(sourceRow.row_id), couplingRows.get(sourceRow.row_id)))
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));
  const separators = separatorCoverageCertificates(
    inputs.sourcePacketAttempt.separator_source_packet_attempts,
    rows,
  );
  const rowFields = [
    "full_rectangle_interval_sources_present",
    "candidate_full_rectangle_coverage_source_present",
    "full_input_screen_E_B_present",
    "full_input_screen_S_B_t_present",
    "source_slice_S_B_t_present",
    "L_r_B_present",
    "L_s_B_present",
    "row_tube_projection_E_B_present",
    "row_tube_eta_sqrt_scaling_certified",
    "mollifier_route_declared",
    "M_delta_interval_certified",
    "delta_eta_sup_norm_interval_certified",
    "Gamma_g_coupling_certified",
    "accepted_row_projection_source_slice_coverage_certificate",
    "dual_mollified_row_integrand_interval_enclosure",
    "direct_quadrature_I_fold_B_present",
    "row_acceleration_enclosure_A_B_present",
    "row_impulse_enclosure",
    "accepted_same_packet_fold_impulse_or_direct_quadrature_bound",
  ];
  const separatorFields = [
    "full_rectangle_interval_sources_present",
    "mollifier_route_declared",
    "M_delta_interval_certified",
    "delta_eta_sup_norm_interval_certified",
    "Gamma_g_coupling_certified",
    "separator_aggregate_C_Sigma_present",
    "separator_aggregate_A_Sigma_eta_epsilon_c_present",
    "separator_aggregate_I_fold_eta_epsilon_c_Sigma_present",
    "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
  ];

  const summary = {
    separator_row_coverage_certificates: separators.length,
    fold_layer_rows: rows.length,
    rows_by_separator_count: sortedObjectBySeparator(countBy(rows, (row) => row.separator_event)),
    selected_route_candidate: SELECTED_ROUTE,
    prior_source_packet_blocker: PRIOR_BLOCKER,
    coverage_certificate_rule: COVERAGE_RULE,
    coverage_certificate_scope: COVERAGE_SCOPE,
    rows_with_full_rectangle_interval_sources: countTrue(rows, (row) => row.full_rectangle_interval_sources_present),
    rows_with_full_input_screen_E_B: countTrue(rows, (row) => row.full_input_screen_E_B_present),
    rows_with_full_input_screen_S_B_t: countTrue(rows, (row) => row.full_input_screen_S_B_t_present),
    rows_with_L_r_B: countTrue(rows, (row) => row.L_r_B_present),
    rows_with_L_s_B: countTrue(rows, (row) => row.L_s_B_present),
    rows_with_row_tube_projection_E_B: countTrue(rows, (row) => row.row_tube_projection_E_B_present),
    rows_with_row_tube_eta_sqrt_scaling_certified: countTrue(
      rows,
      (row) => row.row_tube_eta_sqrt_scaling_certified,
    ),
    separators_with_M_delta_interval_certified: countTrue(separators, (separator) => separator.M_delta_interval_certified),
    rows_with_M_delta_interval_certified: countTrue(rows, (row) => row.M_delta_interval_certified),
    separators_with_Gamma_g_coupling_certified: countTrue(separators, (separator) => separator.Gamma_g_coupling_certified),
    rows_with_Gamma_g_coupling_certified: countTrue(rows, (row) => row.Gamma_g_coupling_certified),
    separators_with_accepted_row_projection_source_slice_coverage_certificate: countTrue(
      separators,
      (separator) => separator.accepted_row_projection_source_slice_coverage_certificates === separator.row_count,
    ),
    rows_with_accepted_row_projection_source_slice_coverage_certificate: countTrue(
      rows,
      (row) => row.accepted_row_projection_source_slice_coverage_certificate,
    ),
    rows_with_dual_mollified_row_integrand_interval_enclosure: 0,
    rows_with_direct_quadrature_I_fold_B: 0,
    rows_with_row_impulse_enclosure: 0,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: 0,
    first_source_packet_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
    first_coverage_blocker: null,
    first_numerical_enclosure_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
    separator_field_presence_counts: presenceCounts(separators, separatorFields),
    row_field_presence_counts: presenceCounts(rows, rowFields),
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
  };

  return {
    schema: "breather-higher-fold-layer-same-packet-row-coverage-certificate-attempt-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only same-packet row projection/source-slice coverage certificate attempt; certifies full input-screen rectangle equality coverage for the fresh-v10 higher-fold rows after M_delta and Gamma/g are certified while proving no dual-mollified row integrand interval enclosure, no row impulse enclosure, no accepted source packet, no row consumption, no preledger pass, no live-ledger update, and no branch-chart authorization",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: true,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      same_packet_impulse_direct_quadrature_source_packet_attempt: artifactRecord(paths.sourcePacketAttempt),
      same_packet_impulse_route_declaration_attempt: artifactRecord(paths.routeDeclaration),
      same_packet_mollifier_coupling_certificate_attempt: artifactRecord(paths.couplingCertificate),
      fold_interval_constants_contract: artifactRecord(paths.contract),
      fold_full_interval_fallback_legality: artifactRecord(paths.fallbackLegality),
    },
    coverage_certificate: {
      accepted_row_projection_source_slice_coverage_certificate: true,
      coverage_certificate_rule: COVERAGE_RULE,
      coverage_certificate_scope: COVERAGE_SCOPE,
      selected_route_candidate: SELECTED_ROUTE,
      E_B_choice: CANDIDATE_E_B,
      S_B_t_choice: CANDIDATE_S_B_T,
      coverage_statement:
        "For every joined row, E_B is the full input-screen receiver interval and S_B(t) is the full input-screen source interval for all receiver t, so the chosen support covers the recorded full input-screen row rectangle by equality.",
      row_tube_projection_E_B_present: false,
      row_tube_eta_sqrt_scaling_certified: false,
      accepted_as_dual_mollified_row_integrand_interval_enclosure: false,
      accepted_as_same_packet_fold_impulse_or_direct_quadrature_source_packet: false,
    },
    separator_row_coverage_certificates: separators,
    row_coverage_certificates: rows,
    summary,
    next_certificate_handoff: {
      first_source_packet_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
      first_coverage_blocker: null,
      first_numerical_enclosure_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
      mechanical_continuation:
        "produce dual-mollified row integrand interval enclosures, or direct-quadrature row impulse interval enclosures, for all 112 covered rows before separator aggregation",
      final_certificate_target:
        "accepted same_packet_fold_impulse_or_direct_quadrature_bound source packet feeding the higher_fold_separator_layer_certificate for Sigma_hf_01 through Sigma_hf_12",
      decision_boundary:
        "coverage can continue mechanically into row-enclosure attempts; if no interval enclosure route can be constructed from same-packet evidence, the lane reaches a proof-rule or primitive-acceptance decision before source-packet acceptance or row consumption",
      fail_closed_stop_conditions: [
        "Do not treat full input-screen rectangle coverage as row-tube eta-sqrt scaling.",
        "Do not treat coverage as a dual-mollified row integrand interval enclosure.",
        "Do not set same_packet_fold_impulse_or_direct_quadrature_bound, higher_fold_separator_layer_certificate, preledger_pass, updates_live_ledger, accepted_fold_layer_row, row_consumed, or branch_chart_authorized from this coverage certificate.",
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
      "Priority-only. This artifact reduces the source-packet checklist from row projection/source-slice coverage absent to dual-mollified row integrand interval enclosure absent while preserving fail-closed row and ledger state.",
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
        `| \`${separator.separator_event}\` | \`${separator.fold_interval}\` | ${separator.row_count} | ${separator.M_delta_interval_certified} | ${separator.Gamma_g_coupling_certified} | ${separator.accepted_row_projection_source_slice_coverage_certificates} | ${separator.dual_mollified_row_integrand_interval_enclosures} | ${separator.row_tube_projection_E_B_rows} | \`${separator.first_source_packet_blocker}\` |`,
    )
    .join("\n");
}

function writeReport(filePath, attempt) {
  const report = `# Higher-Fold Layer Same-Packet Row Coverage Certificate Attempt

Packet: \`${PACKET_ID}\`

Status: \`${attempt.status}\`

Claim level: ${attempt.claim_level}

## Blocker Sharpened

The prior coupling certificate stopped at
\`${attempt.summary.prior_source_packet_blocker}\`. This artifact joins the source-packet
rows, route declarations, and coupling rows by \`row_id\`, then certifies the
candidate row projection/source-slice coverage for the full input-screen
rectangle fallback.

The coverage certificate is present for
${attempt.summary.separators_with_accepted_row_projection_source_slice_coverage_certificate} /
${attempt.summary.separator_row_coverage_certificates} separator layers and
${attempt.summary.rows_with_accepted_row_projection_source_slice_coverage_certificate} /
${attempt.summary.fold_layer_rows} fold-layer rows.

This is not a row-tube scaling artifact and not a row enclosure artifact. It
records 0 row-tube projection rows, 0 row-tube eta-sqrt scaling certificates, 0
dual-mollified row integrand interval enclosures, 0 row impulse enclosures, 0
accepted source packets, 0 row consumptions, \`preledger_pass=false\`, no
live-ledger update, and no branch-chart authorization.

The first source-packet blocker after this artifact is
\`${attempt.summary.first_source_packet_blocker}\`.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(attempt.source_artifacts)}

## Coverage Certificate

| Field | Value |
| --- | --- |
| accepted coverage certificate | ${attempt.coverage_certificate.accepted_row_projection_source_slice_coverage_certificate} |
| rule | \`${attempt.coverage_certificate.coverage_certificate_rule}\` |
| scope | \`${attempt.coverage_certificate.coverage_certificate_scope}\` |
| selected route | \`${attempt.coverage_certificate.selected_route_candidate}\` |
| E_B choice | \`${attempt.coverage_certificate.E_B_choice}\` |
| S_B(t) choice | \`${attempt.coverage_certificate.S_B_t_choice}\` |
| row-tube projection present | ${attempt.coverage_certificate.row_tube_projection_E_B_present} |
| row-tube eta-sqrt scaling certified | ${attempt.coverage_certificate.row_tube_eta_sqrt_scaling_certified} |
| row enclosure artifact | ${attempt.coverage_certificate.accepted_as_dual_mollified_row_integrand_interval_enclosure} |
| accepted source packet | ${attempt.coverage_certificate.accepted_as_same_packet_fold_impulse_or_direct_quadrature_source_packet} |

Coverage statement: ${attempt.coverage_certificate.coverage_statement}

## Separator Certificates

| Separator | Fold interval | Rows | M_delta certified | Gamma/g certified | Accepted coverage certs | Row integrand enclosures | Row-tube projection rows | First source-packet blocker |
| --- | --- | ---: | --- | --- | ---: | ---: | ---: | --- |
${separatorTable(attempt.separator_row_coverage_certificates)}

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

First numerical enclosure blocker:
\`${attempt.next_certificate_handoff.first_numerical_enclosure_blocker}\`.

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
    sourcePacketAttempt: args.sourcePacketAttempt,
    routeDeclaration: args.routeDeclaration,
    couplingCertificate: args.couplingCertificate,
    contract: args.contract,
    fallbackLegality: args.fallbackLegality,
  };
  const inputs = {
    sourcePacketAttempt: readJson(paths.sourcePacketAttempt),
    routeDeclaration: readJson(paths.routeDeclaration),
    couplingCertificate: readJson(paths.couplingCertificate),
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

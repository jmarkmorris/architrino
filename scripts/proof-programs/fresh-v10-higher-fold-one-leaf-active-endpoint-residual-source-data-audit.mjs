#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_BOX_ATTEMPT = `${CERT_DIR}/one_leaf_active_endpoint_interval_box_no_switch_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_ACTIVE_ENDPOINT_ATTEMPT = `${CERT_DIR}/one_leaf_active_endpoint_interval_enclosure_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_INTERVAL_CERTIFICATE_ATTEMPT = `${CERT_DIR}/one_leaf_boundary_opening_interval_certificate_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_ROW_CLOSURE_BUDGET = `${CERT_DIR}/row_closure_geometry_budget_packet.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_DIRECT_PATH_SCREEN = `${CERT_DIR}/one_leaf_direct_path_lambda_shift_screen.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `one_leaf_active_endpoint_residual_source_data_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `one_leaf_active_endpoint_residual_source_data_audit_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const SOURCE_DATA_FIELDS = [
  "candidate_lambda_interval_declared",
  "candidate_lambda_interval_nonempty",
  "sampled_endpoint_values_present",
  "sampled_lambda_derivative_sample_present",
  "constant_theta_endpoint_box_candidate_present",
  "source_endpoint_residual_formula_present",
  "receiver_endpoint_residual_formula_present",
  "source_endpoint_domain_chart_present",
  "receiver_endpoint_domain_chart_present",
  "source_endpoint_evaluation_rule_present",
  "receiver_endpoint_evaluation_rule_present",
  "source_endpoint_motion_rule_present",
  "receiver_endpoint_motion_rule_present",
  "source_residual_derivative_formula_present",
  "receiver_residual_derivative_formula_present",
  "source_residual_outward_rounding_rule_present",
  "receiver_residual_outward_rounding_rule_present",
  "competing_endpoint_inventory_present",
  "competing_endpoint_exclusion_rule_present",
  "endpoint_gap_function_present",
  "endpoint_gap_margin_bound_present",
  "interval_box_radius_rule_present",
  "residual_source_data_ready",
  "row_consumed",
  "branch_chart_authorized",
];

const REQUIRED_SOURCE_DATA_FIELDS = [
  "source_endpoint_residual_formula_present",
  "receiver_endpoint_residual_formula_present",
  "source_endpoint_domain_chart_present",
  "receiver_endpoint_domain_chart_present",
  "source_endpoint_evaluation_rule_present",
  "receiver_endpoint_evaluation_rule_present",
  "source_endpoint_motion_rule_present",
  "receiver_endpoint_motion_rule_present",
  "source_residual_derivative_formula_present",
  "receiver_residual_derivative_formula_present",
  "source_residual_outward_rounding_rule_present",
  "receiver_residual_outward_rounding_rule_present",
  "competing_endpoint_inventory_present",
  "competing_endpoint_exclusion_rule_present",
  "endpoint_gap_function_present",
  "endpoint_gap_margin_bound_present",
  "interval_box_radius_rule_present",
];

const EXACT_SOURCE_KEYS = {
  source_endpoint_residual_formula_present: [
    "source_endpoint_residual_formula",
    "source_residual_function_formula",
    "source_endpoint_residual_function_on_box",
  ],
  receiver_endpoint_residual_formula_present: [
    "receiver_endpoint_residual_formula",
    "receiver_residual_function_formula",
    "receiver_endpoint_residual_function_on_box",
  ],
  source_endpoint_domain_chart_present: [
    "source_endpoint_domain_chart",
    "source_active_endpoint_domain_chart",
  ],
  receiver_endpoint_domain_chart_present: [
    "receiver_endpoint_domain_chart",
    "receiver_active_endpoint_domain_chart",
  ],
  source_endpoint_evaluation_rule_present: [
    "source_endpoint_evaluation_rule",
    "source_endpoint_evaluation_map",
  ],
  receiver_endpoint_evaluation_rule_present: [
    "receiver_endpoint_evaluation_rule",
    "receiver_endpoint_evaluation_map",
  ],
  source_endpoint_motion_rule_present: [
    "source_endpoint_motion_rule",
    "source_active_endpoint_motion_rule",
  ],
  receiver_endpoint_motion_rule_present: [
    "receiver_endpoint_motion_rule",
    "receiver_active_endpoint_motion_rule",
  ],
  source_residual_derivative_formula_present: [
    "source_residual_derivative_formula",
    "source_endpoint_residual_derivative_formula",
  ],
  receiver_residual_derivative_formula_present: [
    "receiver_residual_derivative_formula",
    "receiver_endpoint_residual_derivative_formula",
  ],
  source_residual_outward_rounding_rule_present: [
    "source_residual_outward_rounding_rule",
    "source_endpoint_residual_interval_bound_rule",
  ],
  receiver_residual_outward_rounding_rule_present: [
    "receiver_residual_outward_rounding_rule",
    "receiver_endpoint_residual_interval_bound_rule",
  ],
  competing_endpoint_inventory_present: [
    "competing_endpoint_inventory",
    "competing_active_endpoint_inventory",
  ],
  competing_endpoint_exclusion_rule_present: [
    "competing_endpoint_exclusion_rule",
    "endpoint_switch_exclusion_rule",
  ],
  endpoint_gap_function_present: [
    "endpoint_gap_function",
    "active_endpoint_gap_function",
  ],
  endpoint_gap_margin_bound_present: [
    "endpoint_gap_margin_bound",
    "active_endpoint_gap_margin_bound",
  ],
  interval_box_radius_rule_present: [
    "endpoint_interval_box_radius_rule",
    "active_endpoint_interval_box_radius_rule",
  ],
};

function parseArgs(argv) {
  const args = {
    boxAttempt: DEFAULT_BOX_ATTEMPT,
    activeEndpointAttempt: DEFAULT_ACTIVE_ENDPOINT_ATTEMPT,
    intervalCertificateAttempt: DEFAULT_INTERVAL_CERTIFICATE_ATTEMPT,
    rowClosureBudget: DEFAULT_ROW_CLOSURE_BUDGET,
    directPathScreen: DEFAULT_DIRECT_PATH_SCREEN,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--box-attempt") {
      args.boxAttempt = argv[++index];
    } else if (arg === "--active-endpoint-attempt") {
      args.activeEndpointAttempt = argv[++index];
    } else if (arg === "--interval-certificate-attempt") {
      args.intervalCertificateAttempt = argv[++index];
    } else if (arg === "--row-closure-budget") {
      args.rowClosureBudget = argv[++index];
    } else if (arg === "--direct-path-screen") {
      args.directPathScreen = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-one-leaf-active-endpoint-residual-source-data-audit.mjs [options]

Options:
  --box-attempt PATH                   One-leaf active-endpoint interval-box/no-switch attempt JSON. Defaults to ${DEFAULT_BOX_ATTEMPT}.
  --active-endpoint-attempt PATH       One-leaf active-endpoint interval-enclosure attempt JSON. Defaults to ${DEFAULT_ACTIVE_ENDPOINT_ATTEMPT}.
  --interval-certificate-attempt PATH  One-leaf boundary-opening interval-certificate attempt JSON. Defaults to ${DEFAULT_INTERVAL_CERTIFICATE_ATTEMPT}.
  --row-closure-budget PATH            Row-closure geometry budget JSON. Defaults to ${DEFAULT_ROW_CLOSURE_BUDGET}.
  --direct-path-screen PATH            One-leaf direct-path lambda screen JSON. Defaults to ${DEFAULT_DIRECT_PATH_SCREEN}.
  --out-dir PATH                       Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                             Pretty-print JSON artifact.
  --help                               Show this help.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value, pretty) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, (_key, entry) => entry, pretty ? 2 : 0)}\n`);
}

function writeText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
}

function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function artifactRecord(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing source artifact: ${filePath}`);
  }
  return {
    path: filePath,
    basename: path.basename(filePath),
    present: true,
    sha256: sha256File(filePath),
  };
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

function countTrue(rows, getter) {
  return rows.filter((row) => getter(row) === true).length;
}

function assertPacketId(source, name) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${name} packet id: ${source.packet_id}`);
  }
}

function assertInputs(inputs) {
  assertPacketId(inputs.boxAttempt, "interval-box/no-switch attempt");
  assertPacketId(inputs.activeEndpointAttempt, "active-endpoint attempt");
  assertPacketId(inputs.intervalCertificateAttempt, "interval-certificate attempt");
  assertPacketId(inputs.rowClosureBudget, "row-closure budget");
  assertPacketId(inputs.directPathScreen, "direct-path screen");
  const expectedStatuses = {
    boxAttempt:
      "one_leaf_active_endpoint_interval_box_no_switch_construction_attempt_fail_closed_no_interval_boxes_no_switch_no_row_consumption",
    activeEndpointAttempt:
      "one_leaf_active_endpoint_interval_enclosure_attempt_fail_closed_sampled_stability_only_no_row_consumption",
    intervalCertificateAttempt: "one_leaf_boundary_opening_interval_certificate_attempt_fail_closed_no_row_consumption",
    rowClosureBudget: "row_closure_geometry_budget_packet_fail_closed_no_row_consumption",
    directPathScreen: "one_leaf_direct_path_lambda_shift_screen_fail_closed",
  };
  for (const [name, expectedStatus] of Object.entries(expectedStatuses)) {
    if (inputs[name].status !== expectedStatus) {
      throw new Error(`Unexpected ${name} status: ${inputs[name].status}`);
    }
  }
  for (const [name, source] of Object.entries(inputs)) {
    if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger) {
      throw new Error(`Refusing to audit residual source data from authorized ${name}.`);
    }
  }
  if (
    !Array.isArray(inputs.boxAttempt.row_endpoint_interval_box_no_switch_attempts) ||
    inputs.boxAttempt.row_endpoint_interval_box_no_switch_attempts.length !== 3
  ) {
    throw new Error("Expected exactly 3 interval-box/no-switch attempt rows.");
  }
}

function rowMap(rows, label) {
  const map = new Map();
  for (const row of rows) {
    if (map.has(row.row_id)) {
      throw new Error(`Duplicate ${label} row id: ${row.row_id}`);
    }
    map.set(row.row_id, row);
  }
  return map;
}

function requireMatchingRow(map, rowId, label) {
  const row = map.get(rowId);
  if (!row) {
    throw new Error(`Missing ${label} row: ${rowId}`);
  }
  return row;
}

function valueIsProofData(value) {
  if (value === false || value === true) {
    return value === true;
  }
  if (typeof value === "number") {
    return Number.isFinite(value);
  }
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (value && typeof value === "object") {
    return Object.keys(value).length > 0;
  }
  return false;
}

function findKeyPaths(value, keys, prefix = []) {
  if (!value || typeof value !== "object") {
    return [];
  }
  const paths = [];
  if (Array.isArray(value)) {
    value.forEach((entry, index) => {
      paths.push(...findKeyPaths(entry, keys, [...prefix, String(index)]));
    });
    return paths;
  }
  for (const [key, entry] of Object.entries(value)) {
    const nextPrefix = [...prefix, key];
    if (keys.includes(key) && valueIsProofData(entry)) {
      paths.push(nextPrefix.join("."));
    }
    paths.push(...findKeyPaths(entry, keys, nextPrefix));
  }
  return paths;
}

function sourceProbe(row, activeRow, intervalRow, screenRow) {
  const probeObject = { row, activeRow, intervalRow, screenRow };
  return Object.fromEntries(
    Object.entries(EXACT_SOURCE_KEYS).map(([field, keys]) => [
      field,
      findKeyPaths(probeObject, keys),
    ])
  );
}

function buildRowAudit(row, activeRow, intervalRow, screenRow) {
  const sampledValues = row.sampled_boundary_values;
  const sourceProbePaths = sourceProbe(row, activeRow, intervalRow, screenRow);
  const fields = {
    candidate_lambda_interval_declared: row.required_fields_present.candidate_lambda_interval_declared === true,
    candidate_lambda_interval_nonempty: row.required_fields_present.candidate_lambda_interval_nonempty === true,
    sampled_endpoint_values_present: row.required_fields_present.sampled_endpoint_values_present === true,
    sampled_lambda_derivative_sample_present: Number.isFinite(
      sampledValues.sampled_defect_lambda_derivative_at_active_endpoints
    ),
    constant_theta_endpoint_box_candidate_present:
      row.required_fields_present.constant_theta_endpoint_box_candidate_declared === true,
  };
  for (const field of REQUIRED_SOURCE_DATA_FIELDS) {
    fields[field] = sourceProbePaths[field].length > 0;
  }
  fields.residual_source_data_ready = REQUIRED_SOURCE_DATA_FIELDS.every((field) => fields[field] === true);
  fields.row_consumed = false;
  fields.branch_chart_authorized = false;
  const missingFields = REQUIRED_SOURCE_DATA_FIELDS.filter((field) => fields[field] !== true);
  return {
    row_id: row.row_id,
    cover_id: row.cover_id,
    ledger: row.ledger,
    source_interval: row.source_interval,
    receiver_interval: row.receiver_interval,
    failed_side: row.failed_side,
    candidate_lambda_interval: row.candidate_lambda_interval,
    sampled_endpoint_data: {
      source_theta_candidate: cleanNumber(row.constant_theta_endpoint_box_candidates.source.theta_center),
      receiver_theta_candidate: cleanNumber(row.constant_theta_endpoint_box_candidates.receiver.theta_center),
      sampled_defect_baseline: cleanNumber(sampledValues.sampled_defect_baseline),
      sampled_defect_trial: cleanNumber(sampledValues.sampled_defect_trial),
      sampled_defect_lambda_derivative_at_active_endpoints: cleanNumber(
        sampledValues.sampled_defect_lambda_derivative_at_active_endpoints
      ),
    },
    direct_screen_crosscheck: {
      baseline_lambda: cleanNumber(screenRow.baseline.lambda),
      trial_lambda: cleanNumber(screenRow.trial.lambda),
      active_endpoint_stable_between_lambdas:
        screenRow.active_endpoint_stable_between_lambdas === true,
      combined_opening_gt_probe_threshold:
        screenRow.candidate_change_from_baseline_to_trial.combined_opening_gt_probe_threshold === true,
    },
    source_data_probe_paths: sourceProbePaths,
    required_fields_present: fields,
    missing_source_data_fields: missingFields,
    failure_codes: missingFields.map(
      (field) => `missing_one_leaf_active_endpoint_residual_source_data_${field}`
    ),
    residual_source_data_ready: fields.residual_source_data_ready,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has sampled endpoint values and a sampled defect lambda derivative, but no proof-grade endpoint residual formula, endpoint domain chart, endpoint evaluation or motion rule, residual derivative formula, outward rounding rule, competing-endpoint exclusion input, endpoint-gap bound, or interval-box radius rule is present in the imported artifacts.",
  };
}

function buildAudit(inputs, paths) {
  assertInputs(inputs);
  const activeRows = rowMap(inputs.activeEndpointAttempt.row_active_endpoint_interval_enclosure_attempts, "active-endpoint attempt");
  const intervalRows = rowMap(inputs.intervalCertificateAttempt.row_interval_certificate_attempts, "interval-certificate attempt");
  const screenRows = rowMap(inputs.directPathScreen.rows, "direct-path screen");
  const rowAudits = inputs.boxAttempt.row_endpoint_interval_box_no_switch_attempts.map((row) =>
    buildRowAudit(
      row,
      requireMatchingRow(activeRows, row.row_id, "active-endpoint attempt"),
      requireMatchingRow(intervalRows, row.row_id, "interval-certificate attempt"),
      requireMatchingRow(screenRows, row.row_id, "direct-path screen")
    )
  );
  const fieldCounts = Object.fromEntries(
    SOURCE_DATA_FIELDS.map((field) => [
      field,
      countTrue(rowAudits, (row) => row.required_fields_present[field]),
    ])
  );
  return {
    schema: "breather-higher-fold-one-leaf-active-endpoint-residual-source-data-audit-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status:
      "one_leaf_active_endpoint_residual_source_data_audit_fail_closed_source_samples_present_residual_functions_absent_no_row_consumption",
    theorem_target: "One-Leaf Active-Endpoint Residual Source-Data Audit",
    claim_level:
      "priority-only endpoint residual source-data audit; it preserves sampled endpoint values and sampled lambda derivatives but finds no proof-grade residual formulas, domain charts, evaluation or motion rules, derivative formulas, rounding rules, no-switch inputs, endpoint-gap bounds, interval-box radius rules, or consumed rows",
    source_artifacts: {
      active_endpoint_interval_box_no_switch_attempt: artifactRecord(paths.boxAttempt),
      active_endpoint_interval_enclosure_attempt: artifactRecord(paths.activeEndpointAttempt),
      one_leaf_boundary_opening_interval_certificate_attempt: artifactRecord(paths.intervalCertificateAttempt),
      row_closure_budget: artifactRecord(paths.rowClosureBudget),
      direct_path_screen: artifactRecord(paths.directPathScreen),
    },
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    authorization_lock: {
      sampled_endpoint_values_promoted_to_residual_function: false,
      sampled_lambda_derivative_promoted_to_interval_derivative_bound: false,
      constant_theta_candidate_promoted_to_endpoint_box: false,
      residual_source_data_promoted_to_interval_box: false,
      endpoint_residual_data_promoted_to_no_switch: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    residual_source_data_rule:
      "A one-leaf active-endpoint residual source-data packet must supply source and receiver residual formulas on endpoint boxes, endpoint domain charts, endpoint evaluation and motion rules, residual derivative formulas, outward rounding rules, competing-endpoint exclusion inputs, endpoint-gap bounds, and interval-box radius rules before residual interval bounds or no-switch certificates can be constructed.",
    no_promotion_rule:
      "Sampled endpoint values and sampled lambda derivatives are diagnostic source data only. They do not define endpoint residual functions on boxes, derivative-isolation intervals, no-switch certificates, active-endpoint enclosures, preledger passes, row consumption, or branch-chart authorization.",
    summary: {
      rows: rowAudits.length,
      candidate_lambda_intervals_declared:
        fieldCounts.candidate_lambda_interval_declared,
      candidate_lambda_intervals_nonempty:
        fieldCounts.candidate_lambda_interval_nonempty,
      sampled_endpoint_value_rows:
        fieldCounts.sampled_endpoint_values_present,
      sampled_lambda_derivative_sample_rows:
        fieldCounts.sampled_lambda_derivative_sample_present,
      constant_theta_endpoint_box_candidate_rows:
        fieldCounts.constant_theta_endpoint_box_candidate_present,
      endpoint_residual_formula_source_rows:
        Math.min(
          fieldCounts.source_endpoint_residual_formula_present,
          fieldCounts.receiver_endpoint_residual_formula_present
        ),
      endpoint_domain_chart_rows:
        Math.min(
          fieldCounts.source_endpoint_domain_chart_present,
          fieldCounts.receiver_endpoint_domain_chart_present
        ),
      endpoint_evaluation_rule_rows:
        Math.min(
          fieldCounts.source_endpoint_evaluation_rule_present,
          fieldCounts.receiver_endpoint_evaluation_rule_present
        ),
      endpoint_motion_rule_rows:
        Math.min(
          fieldCounts.source_endpoint_motion_rule_present,
          fieldCounts.receiver_endpoint_motion_rule_present
        ),
      residual_derivative_formula_rows:
        Math.min(
          fieldCounts.source_residual_derivative_formula_present,
          fieldCounts.receiver_residual_derivative_formula_present
        ),
      residual_outward_rounding_rule_rows:
        Math.min(
          fieldCounts.source_residual_outward_rounding_rule_present,
          fieldCounts.receiver_residual_outward_rounding_rule_present
        ),
      competing_endpoint_exclusion_input_rows:
        Math.min(
          fieldCounts.competing_endpoint_inventory_present,
          fieldCounts.competing_endpoint_exclusion_rule_present
        ),
      endpoint_gap_bound_input_rows:
        Math.min(
          fieldCounts.endpoint_gap_function_present,
          fieldCounts.endpoint_gap_margin_bound_present
        ),
      interval_box_radius_rule_rows:
        fieldCounts.interval_box_radius_rule_present,
      residual_source_data_ready_rows:
        fieldCounts.residual_source_data_ready,
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    residual_source_data_field_counts: fieldCounts,
    row_active_endpoint_residual_source_data_audits: rowAudits,
    capture_decision:
      "Priority-only. The audit preserves sampled endpoint values and sampled defect lambda derivatives for 3 / 3 rows, but it fail-closes because the imported artifacts do not provide endpoint residual formulas on boxes, endpoint domain charts, endpoint evaluation or motion rules, residual derivative formulas, outward rounding rules, competing-endpoint exclusion inputs, endpoint-gap bounds, interval-box radius rules, residual source-data-ready rows, preledger passes, or row consumption.",
  };
}

function sourceTable(sourceArtifacts) {
  return Object.entries(sourceArtifacts)
    .map(
      ([label, artifact]) =>
        `| \`${label}\` | \`${artifact.basename}\` | ${artifact.present} | \`${artifact.sha256}\` |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.candidate_lambda_interval.lower_open_threshold} | ${row.candidate_lambda_interval.upper_trial_lambda} | ${row.sampled_endpoint_data.source_theta_candidate} | ${row.sampled_endpoint_data.receiver_theta_candidate} | ${row.sampled_endpoint_data.sampled_defect_lambda_derivative_at_active_endpoints} | ${row.residual_source_data_ready} |`
    )
    .join("\n");
}

function fieldCountTable(counts, total) {
  return Object.entries(counts)
    .map(([field, count]) => `| \`${field}\` | ${count} / ${total} |`)
    .join("\n");
}

function buildReport(audit) {
  const summary = audit.summary;
  return `# Higher-Fold One-Leaf Active-Endpoint Residual Source-Data Audit

## Verdict

Status: \`${audit.status}\`.

This priority-only packet tests the source-data layer under the endpoint
interval-box/no-switch attempt: whether the imported one-leaf artifacts contain
the formulas, charts, evaluation rules, derivative data, rounding rules,
competing-endpoint inputs, and endpoint-gap bounds needed to construct endpoint
residual functions on interval boxes.

The audit fail-closes. It preserves sampled endpoint values for
${summary.sampled_endpoint_value_rows} / ${summary.rows} rows and sampled defect
lambda derivatives for ${summary.sampled_lambda_derivative_sample_rows} / ${summary.rows}
rows, but finds 0 / ${summary.rows} endpoint residual formula sources, 0 /
${summary.rows} endpoint domain charts, 0 / ${summary.rows} endpoint evaluation
rules, 0 / ${summary.rows} endpoint motion rules, 0 / ${summary.rows} residual
derivative formulas, 0 / ${summary.rows} outward rounding rules, 0 /
${summary.rows} competing-endpoint exclusion input rows, 0 / ${summary.rows}
endpoint-gap bound input rows, 0 / ${summary.rows} interval-box radius rules,
and 0 / ${summary.rows} residual source-data-ready rows. It consumes 0 rows,
keeps \`preledger_pass=false\`, keeps
\`updates_live_ledger=false\`, keeps \`branch_chart_authorized=false\`, emits no
candidate artifacts, emits no topology recertification, and emits no
proof-interval replay of its own.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${sourceTable(audit.source_artifacts)}

## Residual Source-Data Rule

${audit.residual_source_data_rule}

## No-Promotion Rule

${audit.no_promotion_rule}

## Row Audits

| Row | Failed side | Lower open threshold | Trial lambda | Source theta candidate | Receiver theta candidate | Sampled defect lambda derivative | Residual source data ready |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(audit.row_active_endpoint_residual_source_data_audits)}

## Field Audit

| Field | Present count |
| --- | ---: |
${fieldCountTable(audit.residual_source_data_field_counts, summary.rows)}

## Construction Blocker

The next constructive object is not another sampled endpoint comparison. It is
an actual endpoint residual data layer: residual formulas on source and receiver
endpoint boxes, domain charts, evaluation/motion rules, derivative formulas,
outward interval rounding rules, competing-endpoint exclusion inputs, endpoint
gap bounds, and interval-box radius rules over each candidate lambda interval.

## Capture Decision

${audit.capture_decision}
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const inputs = {
    boxAttempt: readJson(args.boxAttempt),
    activeEndpointAttempt: readJson(args.activeEndpointAttempt),
    intervalCertificateAttempt: readJson(args.intervalCertificateAttempt),
    rowClosureBudget: readJson(args.rowClosureBudget),
    directPathScreen: readJson(args.directPathScreen),
  };
  const audit = buildAudit(inputs, args);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, audit, args.pretty);
  writeText(outReport, buildReport(audit));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();

#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_ACTIVE_ENDPOINT_ATTEMPT = `${CERT_DIR}/one_leaf_active_endpoint_interval_enclosure_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_INTERVAL_CERTIFICATE_ATTEMPT = `${CERT_DIR}/one_leaf_boundary_opening_interval_certificate_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_ROW_CLOSURE_BUDGET = `${CERT_DIR}/row_closure_geometry_budget_packet.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_DIRECT_PATH_SCREEN = `${CERT_DIR}/one_leaf_direct_path_lambda_shift_screen.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `one_leaf_active_endpoint_interval_box_no_switch_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `one_leaf_active_endpoint_interval_box_no_switch_construction_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const ENDPOINT_BOX_FIELDS = [
  "candidate_lambda_interval_declared",
  "candidate_lambda_interval_nonempty",
  "sampled_active_endpoint_stability_present",
  "source_active_endpoint_sample_present",
  "receiver_active_endpoint_sample_present",
  "sampled_active_endpoint_pair_stable",
  "sampled_opening_above_probe_threshold_present",
  "sampled_endpoint_values_present",
  "constant_theta_endpoint_box_candidate_declared",
  "source_constant_theta_box_candidate_declared",
  "receiver_constant_theta_box_candidate_declared",
  "source_endpoint_interval_box_constructed",
  "receiver_endpoint_interval_box_constructed",
  "source_endpoint_residual_function_on_box_declared",
  "receiver_endpoint_residual_function_on_box_declared",
  "source_endpoint_residual_interval_bound_constructed",
  "receiver_endpoint_residual_interval_bound_constructed",
  "source_endpoint_derivative_isolation_certified",
  "receiver_endpoint_derivative_isolation_certified",
  "source_endpoint_unique_on_interval_certified",
  "receiver_endpoint_unique_on_interval_certified",
  "active_endpoint_pair_constant_on_interval_certified",
  "source_endpoint_switch_exclusion_certified",
  "receiver_endpoint_switch_exclusion_certified",
  "endpoint_switch_exclusion_certified",
  "active_endpoint_gap_margin_positive_on_interval",
  "interval_active_endpoint_enclosure_present",
  "preledger_pass",
  "row_consumed",
  "branch_chart_authorized",
];

const BOX_METHODS = [
  {
    method_id: "constant_theta_sample_as_interval_box",
    description:
      "Try to promote the sampled constant-theta endpoint pair into proof-grade source and receiver interval boxes.",
    required_fields: [
      "candidate_lambda_interval_declared",
      "candidate_lambda_interval_nonempty",
      "sampled_active_endpoint_stability_present",
      "source_active_endpoint_sample_present",
      "receiver_active_endpoint_sample_present",
      "sampled_active_endpoint_pair_stable",
      "constant_theta_endpoint_box_candidate_declared",
      "source_endpoint_interval_box_constructed",
      "receiver_endpoint_interval_box_constructed",
      "source_endpoint_residual_interval_bound_constructed",
      "receiver_endpoint_residual_interval_bound_constructed",
      "source_endpoint_derivative_isolation_certified",
      "receiver_endpoint_derivative_isolation_certified",
      "source_endpoint_unique_on_interval_certified",
      "receiver_endpoint_unique_on_interval_certified",
      "endpoint_switch_exclusion_certified",
      "active_endpoint_gap_margin_positive_on_interval",
    ],
  },
  {
    method_id: "sampled_boundary_values_as_residual_bounds",
    description:
      "Try to treat sampled endpoint values and sampled lambda derivatives as residual interval bounds over the candidate lambda interval.",
    required_fields: [
      "sampled_endpoint_values_present",
      "sampled_opening_above_probe_threshold_present",
      "source_endpoint_residual_function_on_box_declared",
      "receiver_endpoint_residual_function_on_box_declared",
      "source_endpoint_residual_interval_bound_constructed",
      "receiver_endpoint_residual_interval_bound_constructed",
      "source_endpoint_derivative_isolation_certified",
      "receiver_endpoint_derivative_isolation_certified",
    ],
  },
  {
    method_id: "endpoint_box_no_switch_to_active_endpoint_enclosure",
    description:
      "Try to promote endpoint boxes plus no-switch and uniqueness data into an active-endpoint interval enclosure.",
    required_fields: [
      "source_endpoint_interval_box_constructed",
      "receiver_endpoint_interval_box_constructed",
      "source_endpoint_unique_on_interval_certified",
      "receiver_endpoint_unique_on_interval_certified",
      "active_endpoint_pair_constant_on_interval_certified",
      "source_endpoint_switch_exclusion_certified",
      "receiver_endpoint_switch_exclusion_certified",
      "endpoint_switch_exclusion_certified",
      "active_endpoint_gap_margin_positive_on_interval",
      "interval_active_endpoint_enclosure_present",
      "preledger_pass",
      "row_consumed",
      "branch_chart_authorized",
    ],
  },
];

function parseArgs(argv) {
  const args = {
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-one-leaf-active-endpoint-interval-box-no-switch-construction-attempt.mjs [options]

Options:
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
  assertPacketId(inputs.activeEndpointAttempt, "active-endpoint attempt");
  assertPacketId(inputs.intervalCertificateAttempt, "interval-certificate attempt");
  assertPacketId(inputs.rowClosureBudget, "row-closure budget");
  assertPacketId(inputs.directPathScreen, "direct-path screen");
  const expectedStatuses = {
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
      throw new Error(`Refusing to build endpoint box attempt from authorized ${name}.`);
    }
  }
  if (
    !Array.isArray(inputs.activeEndpointAttempt.row_active_endpoint_interval_enclosure_attempts) ||
    inputs.activeEndpointAttempt.row_active_endpoint_interval_enclosure_attempts.length !== 3
  ) {
    throw new Error("Expected exactly 3 active-endpoint attempt rows.");
  }
  if (!Array.isArray(inputs.directPathScreen.rows) || inputs.directPathScreen.rows.length !== 3) {
    throw new Error("Expected exactly 3 direct-path screen rows.");
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

function methodResults(fields) {
  return BOX_METHODS.map((method) => {
    const missingFields = method.required_fields.filter((field) => fields[field] !== true);
    return {
      method_id: method.method_id,
      description: method.description,
      required_fields: method.required_fields,
      missing_fields: missingFields,
      failure_codes: missingFields.map(
        (field) => `missing_one_leaf_active_endpoint_interval_box_no_switch_construction_${field}`
      ),
      passed: missingFields.length === 0,
    };
  });
}

function thetaCandidate(theta) {
  return {
    theta_center: cleanNumber(theta),
    theta_radius: 0,
    candidate_kind: "constant-theta sampled endpoint candidate",
    candidate_only: true,
    proof_grade_interval_box_constructed: false,
  };
}

function buildRowAttempt(activeRow, screenRow) {
  const activeFields = activeRow.required_fields_present;
  const sampledPair = activeRow.sampled_active_endpoint_pair;
  const sampledValues = activeRow.sampled_boundary_values;
  const fields = {
    candidate_lambda_interval_declared: activeFields.candidate_lambda_interval_declared === true,
    candidate_lambda_interval_nonempty: activeFields.candidate_lambda_interval_nonempty === true,
    sampled_active_endpoint_stability_present:
      activeFields.sampled_active_endpoint_stability_present === true,
    source_active_endpoint_sample_present:
      activeFields.source_active_endpoint_sample_present === true &&
      Number.isFinite(sampledPair.source_baseline_theta) &&
      Number.isFinite(sampledPair.source_trial_theta),
    receiver_active_endpoint_sample_present:
      activeFields.receiver_active_endpoint_sample_present === true &&
      Number.isFinite(sampledPair.receiver_baseline_theta) &&
      Number.isFinite(sampledPair.receiver_trial_theta),
    sampled_active_endpoint_pair_stable: activeFields.sampled_active_endpoint_pair_stable === true,
    sampled_opening_above_probe_threshold_present:
      activeFields.sampled_opening_above_probe_threshold_present === true,
    sampled_endpoint_values_present:
      Number.isFinite(sampledValues.source_baseline_value) &&
      Number.isFinite(sampledValues.source_trial_value) &&
      Number.isFinite(sampledValues.receiver_baseline_value) &&
      Number.isFinite(sampledValues.receiver_trial_value),
    constant_theta_endpoint_box_candidate_declared:
      activeFields.sampled_active_endpoint_pair_stable === true &&
      sampledPair.source_theta_stable_between_samples === true &&
      sampledPair.receiver_theta_stable_between_samples === true,
    source_constant_theta_box_candidate_declared:
      sampledPair.source_theta_stable_between_samples === true,
    receiver_constant_theta_box_candidate_declared:
      sampledPair.receiver_theta_stable_between_samples === true,
    source_endpoint_interval_box_constructed: false,
    receiver_endpoint_interval_box_constructed: false,
    source_endpoint_residual_function_on_box_declared: false,
    receiver_endpoint_residual_function_on_box_declared: false,
    source_endpoint_residual_interval_bound_constructed: false,
    receiver_endpoint_residual_interval_bound_constructed: false,
    source_endpoint_derivative_isolation_certified: false,
    receiver_endpoint_derivative_isolation_certified: false,
    source_endpoint_unique_on_interval_certified: false,
    receiver_endpoint_unique_on_interval_certified: false,
    active_endpoint_pair_constant_on_interval_certified: false,
    source_endpoint_switch_exclusion_certified: false,
    receiver_endpoint_switch_exclusion_certified: false,
    endpoint_switch_exclusion_certified: false,
    active_endpoint_gap_margin_positive_on_interval: false,
    interval_active_endpoint_enclosure_present: false,
    preledger_pass: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  const methods = methodResults(fields);
  const obstructionCodes = [];
  for (const field of ENDPOINT_BOX_FIELDS) {
    if (fields[field] !== true && !field.endsWith("_candidate_declared")) {
      obstructionCodes.push(`${field}_absent`);
    }
  }
  return {
    row_id: activeRow.row_id,
    cover_id: activeRow.cover_id,
    ledger: activeRow.ledger,
    source_interval: activeRow.source_interval,
    receiver_interval: activeRow.receiver_interval,
    failed_side: activeRow.failed_side,
    candidate_lambda_interval: activeRow.candidate_lambda_interval,
    sampled_active_endpoint_pair: sampledPair,
    sampled_boundary_values: sampledValues,
    direct_screen_crosscheck: {
      baseline_lambda: cleanNumber(screenRow.baseline.lambda),
      trial_lambda: cleanNumber(screenRow.trial.lambda),
      active_endpoint_stable_between_lambdas:
        screenRow.active_endpoint_stable_between_lambdas === true,
      combined_opening_gt_probe_threshold:
        screenRow.candidate_change_from_baseline_to_trial.combined_opening_gt_probe_threshold === true,
    },
    constant_theta_endpoint_box_candidates: {
      source: thetaCandidate(sampledPair.source_trial_theta),
      receiver: thetaCandidate(sampledPair.receiver_trial_theta),
      lambda_interval: activeRow.candidate_lambda_interval,
      promoted_to_proof_grade_endpoint_box: false,
    },
    required_fields_present: fields,
    method_results: methods,
    passed_methods: methods.filter((method) => method.passed).map((method) => method.method_id),
    proof_grade_endpoint_box_no_switch_constructed:
      methods.some((method) => method.passed) &&
      fields.interval_active_endpoint_enclosure_present &&
      fields.preledger_pass &&
      fields.row_consumed,
    obstruction_codes: obstructionCodes,
    obstruction:
      "The row can declare a constant-theta endpoint-box candidate from stable sampled endpoint anchors, but no proof-grade endpoint interval box is constructed because residual functions on boxes, residual interval bounds, derivative isolation, uniqueness, switch exclusion, positive endpoint-gap margins, preledger pass, and row consumption are absent.",
  };
}

function buildAttempt(inputs, paths) {
  assertInputs(inputs);
  const screenRows = rowMap(inputs.directPathScreen.rows, "direct-path screen");
  const rowAttempts = inputs.activeEndpointAttempt.row_active_endpoint_interval_enclosure_attempts.map((activeRow) =>
    buildRowAttempt(activeRow, requireMatchingRow(screenRows, activeRow.row_id, "direct-path screen"))
  );
  const fieldCounts = Object.fromEntries(
    ENDPOINT_BOX_FIELDS.map((field) => [
      field,
      countTrue(rowAttempts, (row) => row.required_fields_present[field]),
    ])
  );
  return {
    schema: "breather-higher-fold-one-leaf-active-endpoint-interval-box-no-switch-construction-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: "one_leaf_active_endpoint_interval_box_no_switch_construction_attempt_fail_closed_no_interval_boxes_no_switch_no_row_consumption",
    theorem_target: "One-Leaf Active-Endpoint Interval-Box No-Switch Construction",
    claim_level:
      "priority-only endpoint interval-box/no-switch attempt; it declares constant-theta sampled endpoint-box candidates for the three one-leaf rows but constructs zero proof-grade endpoint boxes, no-switch certificates, interval enclosures, or consumed rows",
    source_artifacts: {
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
      sampled_endpoint_pair_promoted_to_interval_box: false,
      sampled_active_endpoint_stability_promoted_to_interval_enclosure: false,
      constant_theta_box_candidate_promoted_to_proof_grade_box: false,
      endpoint_interval_box_promoted_to_no_switch: false,
      endpoint_no_switch_promoted_to_active_endpoint_enclosure: false,
      active_endpoint_interval_enclosure_promoted_to_boundary_opening_certificate: false,
      lambda0305_replay_promoted_to_row_closure: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    endpoint_box_no_switch_rule:
      "A one-leaf endpoint interval-box/no-switch construction must provide source and receiver endpoint boxes over the full candidate lambda interval, residual functions on those boxes, outward residual interval bounds, derivative isolation, source/receiver uniqueness, endpoint switch-exclusion, and a positive endpoint-gap margin before it can feed an active-endpoint interval enclosure.",
    no_promotion_rule:
      "Stable sampled endpoint theta values and sampled endpoint values declare only constant-theta endpoint-box candidates. They do not imply proof-grade endpoint interval boxes, residual bounds, derivative isolation, no-switch or uniqueness certificates, active-endpoint interval enclosure, preledger pass, row consumption, or branch-chart authorization.",
    candidate_interval_summary: inputs.activeEndpointAttempt.candidate_interval_summary,
    replay_lock: inputs.activeEndpointAttempt.replay_lock,
    summary: {
      rows: rowAttempts.length,
      candidate_lambda_intervals_declared:
        fieldCounts.candidate_lambda_interval_declared,
      candidate_lambda_intervals_nonempty:
        fieldCounts.candidate_lambda_interval_nonempty,
      sampled_active_endpoint_stability_rows:
        fieldCounts.sampled_active_endpoint_stability_present,
      source_active_endpoint_sample_rows:
        fieldCounts.source_active_endpoint_sample_present,
      receiver_active_endpoint_sample_rows:
        fieldCounts.receiver_active_endpoint_sample_present,
      sampled_active_endpoint_pair_stable_rows:
        fieldCounts.sampled_active_endpoint_pair_stable,
      sampled_opening_above_probe_threshold_rows:
        fieldCounts.sampled_opening_above_probe_threshold_present,
      sampled_endpoint_value_rows:
        fieldCounts.sampled_endpoint_values_present,
      constant_theta_endpoint_box_candidate_rows:
        fieldCounts.constant_theta_endpoint_box_candidate_declared,
      source_endpoint_interval_box_rows:
        fieldCounts.source_endpoint_interval_box_constructed,
      receiver_endpoint_interval_box_rows:
        fieldCounts.receiver_endpoint_interval_box_constructed,
      endpoint_residual_function_on_box_rows:
        Math.min(
          fieldCounts.source_endpoint_residual_function_on_box_declared,
          fieldCounts.receiver_endpoint_residual_function_on_box_declared
        ),
      endpoint_residual_interval_bound_rows:
        Math.min(
          fieldCounts.source_endpoint_residual_interval_bound_constructed,
          fieldCounts.receiver_endpoint_residual_interval_bound_constructed
        ),
      endpoint_derivative_isolation_rows:
        Math.min(
          fieldCounts.source_endpoint_derivative_isolation_certified,
          fieldCounts.receiver_endpoint_derivative_isolation_certified
        ),
      endpoint_uniqueness_rows:
        Math.min(
          fieldCounts.source_endpoint_unique_on_interval_certified,
          fieldCounts.receiver_endpoint_unique_on_interval_certified
        ),
      endpoint_switch_exclusion_rows:
        fieldCounts.endpoint_switch_exclusion_certified,
      active_endpoint_gap_margin_rows:
        fieldCounts.active_endpoint_gap_margin_positive_on_interval,
      interval_active_endpoint_enclosure_rows:
        fieldCounts.interval_active_endpoint_enclosure_present,
      proof_grade_endpoint_box_no_switch_rows:
        rowAttempts.filter((row) => row.proof_grade_endpoint_box_no_switch_constructed).length,
      preledger_pass_rows:
        fieldCounts.preledger_pass,
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    endpoint_box_field_counts: fieldCounts,
    row_endpoint_interval_box_no_switch_attempts: rowAttempts,
    capture_decision:
      "Priority-only. The attempt records that stable sampled endpoint pairs can seed constant-theta endpoint-box candidates in 3 / 3 rows, but it fail-closes because no residual functions on boxes, residual interval bounds, derivative isolation, uniqueness certificates, switch-exclusion certificates, positive endpoint-gap margins, active-endpoint interval enclosures, preledger passes, or row consumption are certified.",
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
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.candidate_lambda_interval.lower_open_threshold} | ${row.candidate_lambda_interval.upper_trial_lambda} | ${row.constant_theta_endpoint_box_candidates.source.theta_center} | ${row.constant_theta_endpoint_box_candidates.receiver.theta_center} | ${row.required_fields_present.constant_theta_endpoint_box_candidate_declared} | ${row.proof_grade_endpoint_box_no_switch_constructed} |`
    )
    .join("\n");
}

function fieldCountTable(counts, total) {
  return Object.entries(counts)
    .map(([field, count]) => `| \`${field}\` | ${count} / ${total} |`)
    .join("\n");
}

function buildReport(attempt) {
  const summary = attempt.summary;
  const interval = attempt.candidate_interval_summary;
  const replay = attempt.replay_lock;
  return `# Higher-Fold One-Leaf Active-Endpoint Interval-Box No-Switch Construction Attempt

## Verdict

Status: \`${attempt.status}\`.

This priority-only packet tests the first constructive subproblem below the
active-endpoint interval-enclosure attempt: whether stable sampled endpoint
pairs can be promoted into proof-grade endpoint interval boxes with no-switch
and uniqueness data over the full candidate lambda interval.

The attempt fail-closes. It declares constant-theta endpoint-box candidates for
${summary.constant_theta_endpoint_box_candidate_rows} / ${summary.rows} rows
from stable sampled endpoint pairs over candidate intervals ending at
\`${interval.trial_lambda}\`, but constructs 0 / ${summary.rows} source endpoint
interval boxes, 0 / ${summary.rows} receiver endpoint interval boxes,
0 / ${summary.rows} residual functions on boxes, 0 / ${summary.rows} residual
interval bounds, 0 / ${summary.rows} derivative-isolation certificates,
0 / ${summary.rows} endpoint uniqueness certificates, 0 / ${summary.rows}
endpoint switch-exclusion certificates, 0 / ${summary.rows} positive
endpoint-gap certificates, and 0 / ${summary.rows} interval active-endpoint
enclosures. It consumes 0 rows, keeps \`preledger_pass=false\`, keeps
\`updates_live_ledger=false\`, keeps \`branch_chart_authorized=false\`, emits no
candidate artifacts, emits no topology recertification, and emits no
proof-interval replay of its own.

The imported trial replay remains locked with ${replay.v6_split_required_base_rows}
split-required base rows, ${replay.v6_receiver_cover_complete_parent_rows}
complete receiver-cover parent rows, ${replay.v6_accepted_fold_layer_rows}
accepted fold-layer rows, and no branch-chart authorization.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${sourceTable(attempt.source_artifacts)}

## Construction Rule

${attempt.endpoint_box_no_switch_rule}

## No-Promotion Rule

${attempt.no_promotion_rule}

## Row Attempts

| Row | Failed side | Lower open threshold | Trial lambda | Source theta candidate | Receiver theta candidate | Candidate declared | Proof-grade no-switch |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(attempt.row_endpoint_interval_box_no_switch_attempts)}

## Field Audit

| Field | Certified count |
| --- | ---: |
${fieldCountTable(attempt.endpoint_box_field_counts, summary.rows)}

## Downstream Lock

Endpoint boxes and no-switch data are only one sublayer. A consumable one-leaf
boundary-opening interval certificate still also needs interval
defect-derivative bounds, strict combined boundary-opening certificates,
source/receiver monotonicity, memory margins, ownership/no-double-counting or
non-owned-complement closure, and proof-grade interval certificates before
\`preledger_pass\`, live-ledger updates, row consumption, or branch-chart
authorization can occur.

## Capture Decision

${attempt.capture_decision}
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const inputs = {
    activeEndpointAttempt: readJson(args.activeEndpointAttempt),
    intervalCertificateAttempt: readJson(args.intervalCertificateAttempt),
    rowClosureBudget: readJson(args.rowClosureBudget),
    directPathScreen: readJson(args.directPathScreen),
  };
  const attempt = buildAttempt(inputs, args);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, attempt, args.pretty);
  writeText(outReport, buildReport(attempt));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();

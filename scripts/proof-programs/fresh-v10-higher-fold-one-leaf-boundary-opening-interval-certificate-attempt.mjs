#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_ROW_CLOSURE_BUDGET = `${CERT_DIR}/row_closure_geometry_budget_packet.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_DIRECT_PATH_SCREEN = `${CERT_DIR}/one_leaf_direct_path_lambda_shift_screen.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_LAMBDA0305_REPLAY_AUDIT = `${CERT_DIR}/lambda0305_preledger_replay_audit.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_ENDPOINT_BOUNDARY_BINDING_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `one_leaf_boundary_opening_interval_certificate_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `one_leaf_boundary_opening_interval_certificate_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const INTERVAL_CERTIFICATE_FIELDS = [
  "candidate_lambda_interval_declared",
  "candidate_lambda_interval_nonempty",
  "sampled_active_endpoint_stability_present",
  "sampled_opening_above_probe_threshold_present",
  "imported_trial_root_topology_recertified",
  "imported_trial_preledger_replay_present",
  "interval_active_endpoint_enclosure_present",
  "interval_defect_derivative_bound_present",
  "interval_boundary_opening_positive_certified",
  "source_monotonicity_preserved_on_interval",
  "receiver_monotonicity_preserved_on_interval",
  "memory_margins_certified_on_interval",
  "endpoint_ownership_no_double_counting_certified",
  "simple_root_branch_reuse_exclusion_certified",
  "non_owned_complement_closed",
  "endpoint_boundary_bindings_constructed",
  "endpoint_motion_rules_constructed",
  "receiver_cover_parent_row_complete",
  "fold_layer_rows_accepted",
  "preledger_pass",
  "row_consumed",
  "branch_chart_authorized",
];

const CERTIFICATION_METHODS = [
  {
    method_id: "sampled_budget_as_interval_certificate",
    description: "Try to promote the sampled one-leaf lambda budget into an interval certificate.",
    required_fields: [
      "candidate_lambda_interval_declared",
      "candidate_lambda_interval_nonempty",
      "sampled_active_endpoint_stability_present",
      "sampled_opening_above_probe_threshold_present",
      "interval_active_endpoint_enclosure_present",
      "interval_defect_derivative_bound_present",
      "interval_boundary_opening_positive_certified",
      "source_monotonicity_preserved_on_interval",
      "receiver_monotonicity_preserved_on_interval",
      "memory_margins_certified_on_interval",
      "endpoint_ownership_no_double_counting_certified",
      "simple_root_branch_reuse_exclusion_certified",
      "non_owned_complement_closed",
    ],
  },
  {
    method_id: "lambda0305_replay_as_interval_certificate",
    description: "Try to promote the imported lambda=0.305 replay into interval row closure.",
    required_fields: [
      "imported_trial_root_topology_recertified",
      "imported_trial_preledger_replay_present",
      "preledger_pass",
      "receiver_cover_parent_row_complete",
      "fold_layer_rows_accepted",
      "row_consumed",
      "branch_chart_authorized",
    ],
  },
  {
    method_id: "endpoint_binding_as_interval_certificate",
    description: "Try to close the interval certificate through endpoint boundary bindings and endpoint motion.",
    required_fields: [
      "endpoint_boundary_bindings_constructed",
      "endpoint_motion_rules_constructed",
      "endpoint_ownership_no_double_counting_certified",
      "interval_boundary_opening_positive_certified",
      "row_consumed",
    ],
  },
];

function parseArgs(argv) {
  const args = {
    rowClosureBudget: DEFAULT_ROW_CLOSURE_BUDGET,
    directPathScreen: DEFAULT_DIRECT_PATH_SCREEN,
    lambda0305ReplayAudit: DEFAULT_LAMBDA0305_REPLAY_AUDIT,
    endpointBoundaryBindingAttempt: DEFAULT_ENDPOINT_BOUNDARY_BINDING_ATTEMPT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--row-closure-budget") {
      args.rowClosureBudget = argv[++index];
    } else if (arg === "--direct-path-screen") {
      args.directPathScreen = argv[++index];
    } else if (arg === "--lambda0305-replay-audit") {
      args.lambda0305ReplayAudit = argv[++index];
    } else if (arg === "--endpoint-boundary-binding-attempt") {
      args.endpointBoundaryBindingAttempt = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-one-leaf-boundary-opening-interval-certificate-attempt.mjs [options]

Options:
  --row-closure-budget PATH                 Row-closure geometry budget JSON. Defaults to ${DEFAULT_ROW_CLOSURE_BUDGET}.
  --direct-path-screen PATH                 One-leaf direct-path lambda screen JSON. Defaults to ${DEFAULT_DIRECT_PATH_SCREEN}.
  --lambda0305-replay-audit PATH            Lambda 0.305 replay audit JSON. Defaults to ${DEFAULT_LAMBDA0305_REPLAY_AUDIT}.
  --endpoint-boundary-binding-attempt PATH  Endpoint-boundary-binding construction attempt JSON. Defaults to ${DEFAULT_ENDPOINT_BOUNDARY_BINDING_ATTEMPT}.
  --out-dir PATH                            Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                                  Pretty-print JSON artifact.
  --help                                    Show this help.`);
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

function artifactRecord(filePath) {
  const present = fs.existsSync(filePath);
  return {
    path: filePath,
    basename: path.basename(filePath),
    present,
    sha256: present ? sha256File(filePath) : null,
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
  assertPacketId(inputs.rowClosureBudget, "row-closure budget");
  assertPacketId(inputs.directPathScreen, "direct-path screen");
  assertPacketId(inputs.lambda0305ReplayAudit, "lambda=0.305 replay audit");
  assertPacketId(inputs.endpointBoundaryBindingAttempt, "endpoint-boundary-binding attempt");
  const expectedStatuses = {
    rowClosureBudget: "row_closure_geometry_budget_packet_fail_closed_no_row_consumption",
    directPathScreen: "one_leaf_direct_path_lambda_shift_screen_fail_closed",
    lambda0305ReplayAudit: "lambda0305_topology_certified_preledger_still_blocked",
    endpointBoundaryBindingAttempt:
      "fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_construction_attempt_fail_closed",
  };
  for (const [name, expectedStatus] of Object.entries(expectedStatuses)) {
    if (inputs[name].status !== expectedStatus) {
      throw new Error(`Unexpected ${name} status: ${inputs[name].status}`);
    }
  }
  for (const [name, source] of Object.entries(inputs)) {
    if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger) {
      throw new Error(`Refusing to build interval attempt from authorized ${name}.`);
    }
  }
  if (!Array.isArray(inputs.rowClosureBudget.row_geometry_budgets) || inputs.rowClosureBudget.row_geometry_budgets.length !== 3) {
    throw new Error("Expected exactly 3 row geometry budgets.");
  }
}

function methodResults(fields) {
  return CERTIFICATION_METHODS.map((method) => {
    const missingFields = method.required_fields.filter((field) => fields[field] !== true);
    return {
      method_id: method.method_id,
      description: method.description,
      required_fields: method.required_fields,
      missing_fields: missingFields,
      failure_codes: missingFields.map((field) => `missing_one_leaf_interval_certificate_${field}`),
      passed: missingFields.length === 0,
    };
  });
}

function buildRowAttempt(row) {
  const candidateLower = row.lambda_min_open_from_probe_threshold_active_endpoint_screen;
  const candidateUpper = row.lambda_min_open_from_probe_threshold_active_endpoint_screen + row.trial_lambda_margin_after_min_open;
  const candidateIntervalWidth = candidateUpper - candidateLower;
  const fields = {
    candidate_lambda_interval_declared: Number.isFinite(candidateLower) && Number.isFinite(candidateUpper),
    candidate_lambda_interval_nonempty: candidateIntervalWidth > 0,
    sampled_active_endpoint_stability_present:
      row.proof_grade_fields_present.active_endpoint_stable_between_lambdas === true,
    sampled_opening_above_probe_threshold_present:
      row.proof_grade_fields_present.combined_opening_gt_probe_threshold === true,
    imported_trial_root_topology_recertified:
      row.proof_grade_fields_present.root_topology_recertified_at_trial_lambda === true,
    imported_trial_preledger_replay_present:
      row.proof_grade_fields_present.proof_interval_preledger_rerun_at_trial_lambda === true,
    interval_active_endpoint_enclosure_present: false,
    interval_defect_derivative_bound_present: false,
    interval_boundary_opening_positive_certified: false,
    source_monotonicity_preserved_on_interval: false,
    receiver_monotonicity_preserved_on_interval: false,
    memory_margins_certified_on_interval: false,
    endpoint_ownership_no_double_counting_certified: false,
    simple_root_branch_reuse_exclusion_certified: false,
    non_owned_complement_closed: false,
    endpoint_boundary_bindings_constructed:
      row.proof_grade_fields_present.endpoint_boundary_bindings_constructed === true,
    endpoint_motion_rules_constructed:
      row.proof_grade_fields_present.endpoint_motion_rules_constructed === true,
    receiver_cover_parent_row_complete:
      row.proof_grade_fields_present.receiver_cover_parent_row_complete === true,
    fold_layer_rows_accepted:
      row.proof_grade_fields_present.fold_layer_rows_accepted === true,
    preledger_pass:
      row.proof_grade_fields_present.proof_interval_preledger_passed_at_trial_lambda === true,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  const methods = methodResults(fields);
  return {
    row_id: row.row_id,
    cover_id: row.cover_id,
    ledger: row.ledger,
    source_interval: row.source_interval,
    receiver_interval: row.receiver_interval,
    failed_side: row.failed_side,
    candidate_lambda_interval: {
      lower_open_threshold: cleanNumber(candidateLower),
      upper_trial_lambda: cleanNumber(candidateUpper),
      width_to_trial_lambda: cleanNumber(candidateIntervalWidth),
      interval_source: "screen-level active-endpoint budget only",
    },
    sampled_budget: {
      required_strict_improvement_decimal: row.required_strict_improvement_decimal,
      trial_sampled_defect: row.trial_sampled_defect,
      combined_boundary_opening_decimal: row.combined_boundary_opening_decimal,
      combined_boundary_opening_margin_vs_probe_threshold_decimal:
        row.combined_boundary_opening_margin_vs_probe_threshold_decimal,
    },
    required_fields_present: fields,
    method_results: methods,
    passed_methods: methods.filter((method) => method.passed).map((method) => method.method_id),
    interval_certificate_constructed:
      methods.some((method) => method.passed) &&
      fields.interval_boundary_opening_positive_certified &&
      fields.preledger_pass &&
      fields.row_consumed,
    obstruction_codes: [
      !fields.interval_active_endpoint_enclosure_present ? "interval_active_endpoint_enclosure_absent" : null,
      !fields.interval_defect_derivative_bound_present ? "interval_defect_derivative_bound_absent" : null,
      !fields.interval_boundary_opening_positive_certified ? "interval_boundary_opening_positive_certificate_absent" : null,
      !fields.source_monotonicity_preserved_on_interval ? "source_monotonicity_interval_certificate_absent" : null,
      !fields.receiver_monotonicity_preserved_on_interval ? "receiver_monotonicity_interval_certificate_absent" : null,
      !fields.memory_margins_certified_on_interval ? "memory_margin_interval_certificate_absent" : null,
      !fields.endpoint_ownership_no_double_counting_certified ? "endpoint_ownership_no_double_counting_absent" : null,
      !fields.non_owned_complement_closed ? "non_owned_complement_closure_absent" : null,
      !fields.preledger_pass ? "preledger_pass_absent" : null,
      !fields.row_consumed ? "row_consumption_absent" : null,
    ].filter(Boolean),
    obstruction:
      "The row has a nonempty sampled candidate lambda interval and imported trial topology/preledger replay data, but no interval active-endpoint enclosure, interval derivative bound, interval positivity proof, monotonicity, memory, ownership/no-double-counting, branch-reuse exclusion, non-owned complement closure, endpoint boundary binding, endpoint motion, preledger pass, or row consumption.",
  };
}

function buildAttempt(inputs, paths) {
  assertInputs(inputs);
  const rowAttempts = inputs.rowClosureBudget.row_geometry_budgets.map(buildRowAttempt);
  const fieldCounts = Object.fromEntries(
    INTERVAL_CERTIFICATE_FIELDS.map((field) => [
      field,
      countTrue(rowAttempts, (row) => row.required_fields_present[field]),
    ])
  );
  return {
    schema: "breather-higher-fold-one-leaf-boundary-opening-interval-certificate-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: "one_leaf_boundary_opening_interval_certificate_attempt_fail_closed_no_row_consumption",
    theorem_target: "One-Leaf Boundary-Opening Interval Certificate",
    claim_level:
      "priority-only interval-certificate attempt; it declares nonempty sampled lambda intervals for the three one-leaf rows but constructs zero proof-grade interval certificates and consumes zero rows",
    source_artifacts: {
      row_closure_budget: artifactRecord(paths.rowClosureBudget),
      direct_path_screen: artifactRecord(paths.directPathScreen),
      lambda0305_replay_audit: artifactRecord(paths.lambda0305ReplayAudit),
      endpoint_boundary_binding_attempt: artifactRecord(paths.endpointBoundaryBindingAttempt),
    },
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    authorization_lock: {
      sampled_lambda_budget_promoted_to_interval_certificate: false,
      lambda0305_replay_promoted_to_row_closure: false,
      endpoint_boundary_source_data_promoted_to_binding: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    interval_certificate_rule:
      "A one-leaf boundary-opening interval certificate must enclose the active endpoint pair over the candidate lambda interval, bound the defect derivative with outward margins, prove positive boundary opening throughout the interval, preserve source and receiver monotonicity, certify memory margins and endpoint ownership/no-double-counting, exclude simple-root branch reuse, close non-owned complements, and pass the proof-interval preledger before any row can be consumed.",
    no_promotion_rule:
      "Sampled active-endpoint stability, a nonempty lambda interval, imported root topology at lambda=0.305, and an imported v1-v6 replay are necessary diagnostics only. They do not imply interval positivity, endpoint boundary binding, endpoint motion, preledger pass, row consumption, or branch-chart authorization.",
    candidate_interval_summary: {
      baseline_lambda: inputs.rowClosureBudget.lambda_budget.baseline_lambda,
      trial_lambda: inputs.rowClosureBudget.lambda_budget.trial_lambda,
      shared_lambda_min_open_from_probe_threshold_active_endpoint_screen:
        inputs.rowClosureBudget.lambda_budget.shared_lambda_min_open_from_probe_threshold_active_endpoint_screen,
      minimum_trial_lambda_margin_after_shared_min_open:
        inputs.rowClosureBudget.lambda_budget.minimum_trial_lambda_margin_after_shared_min_open,
      imported_trial_root_topology_recertified:
        inputs.rowClosureBudget.lambda_budget.imported_trial_root_topology_recertified,
      imported_trial_preledger_replay_present:
        inputs.rowClosureBudget.lambda_budget.imported_trial_proof_interval_v1_v6_rerun,
      imported_trial_preledger_pass:
        inputs.rowClosureBudget.lambda_budget.imported_trial_preledger_pass,
    },
    replay_lock: {
      v6_split_required_base_rows: inputs.rowClosureBudget.replay_budget.v6_split_required_base_rows,
      v6_receiver_cover_complete_parent_rows:
        inputs.rowClosureBudget.replay_budget.v6_receiver_cover_complete_parent_rows,
      v6_accepted_fold_layer_rows: inputs.rowClosureBudget.replay_budget.v6_accepted_fold_layer_rows,
      imported_trial_branch_chart_authorized:
        inputs.rowClosureBudget.lambda_budget.imported_trial_branch_chart_authorized,
    },
    endpoint_route_lock: inputs.rowClosureBudget.endpoint_route_lock,
    summary: {
      rows: rowAttempts.length,
      candidate_lambda_intervals_declared:
        fieldCounts.candidate_lambda_interval_declared,
      candidate_lambda_intervals_nonempty:
        fieldCounts.candidate_lambda_interval_nonempty,
      sampled_opening_rows:
        fieldCounts.sampled_opening_above_probe_threshold_present,
      imported_trial_topology_recertified_rows:
        fieldCounts.imported_trial_root_topology_recertified,
      imported_trial_preledger_replay_rows:
        fieldCounts.imported_trial_preledger_replay_present,
      interval_active_endpoint_enclosure_rows:
        fieldCounts.interval_active_endpoint_enclosure_present,
      interval_defect_derivative_bound_rows:
        fieldCounts.interval_defect_derivative_bound_present,
      interval_boundary_opening_positive_rows:
        fieldCounts.interval_boundary_opening_positive_certified,
      strict_combined_boundary_opening_gt_threshold_rows: 0,
      source_monotonicity_interval_rows:
        fieldCounts.source_monotonicity_preserved_on_interval,
      receiver_monotonicity_interval_rows:
        fieldCounts.receiver_monotonicity_preserved_on_interval,
      memory_margin_interval_rows:
        fieldCounts.memory_margins_certified_on_interval,
      endpoint_ownership_no_double_counting_rows:
        fieldCounts.endpoint_ownership_no_double_counting_certified,
      non_owned_complement_closed_rows:
        fieldCounts.non_owned_complement_closed,
      endpoint_boundary_binding_rows:
        fieldCounts.endpoint_boundary_bindings_constructed,
      endpoint_motion_rule_rows:
        fieldCounts.endpoint_motion_rules_constructed,
      preledger_pass_rows: fieldCounts.preledger_pass,
      proof_grade_interval_certificate_rows:
        rowAttempts.filter((row) => row.interval_certificate_constructed).length,
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    interval_certificate_field_counts: fieldCounts,
    row_interval_certificate_attempts: rowAttempts,
    capture_decision:
      "Priority-only. The attempt records a nonempty sampled lambda interval for each one-leaf row, but it fail-closes because no interval active-endpoint enclosure, derivative bound, interval positivity proof, monotonicity, memory, ownership/no-double-counting, branch-reuse exclusion, non-owned complement closure, endpoint binding/motion, preledger pass, or row consumption is certified.",
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
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.candidate_lambda_interval.lower_open_threshold} | ${row.candidate_lambda_interval.upper_trial_lambda} | ${row.candidate_lambda_interval.width_to_trial_lambda} | ${row.sampled_budget.combined_boundary_opening_margin_vs_probe_threshold_decimal} | ${row.interval_certificate_constructed} |`
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
  return `# Higher-Fold One-Leaf Boundary-Opening Interval Certificate Attempt

## Verdict

Status: \`${attempt.status}\`.

This priority-only packet tests whether the positive sampled one-leaf
boundary-opening budget can be promoted into an interval certificate. It
declares nonempty sampled candidate lambda intervals for
${summary.candidate_lambda_intervals_nonempty} / ${summary.rows} rows, with
shared threshold
\`lambda>${interval.shared_lambda_min_open_from_probe_threshold_active_endpoint_screen}\`
and trial margin
\`${interval.minimum_trial_lambda_margin_after_shared_min_open}\`.

The attempt fail-closes. It constructs 0 / ${summary.rows} interval active-endpoint
enclosures, 0 / ${summary.rows} interval defect-derivative bounds, 0 / ${summary.rows}
interval boundary-opening positivity certificates, 0 / ${summary.rows}
source/receiver monotonicity certificates, 0 / ${summary.rows} ownership or
non-owned-complement closures, and 0 / ${summary.rows} proof-grade interval
certificates. It consumes 0 rows, keeps \`preledger_pass=false\`, keeps
\`updates_live_ledger=false\`, and leaves \`branch_chart_authorized=false\`.

The imported trial replay still has ${replay.v6_split_required_base_rows}
split-required base rows, ${replay.v6_receiver_cover_complete_parent_rows}
complete receiver-cover parent rows, ${replay.v6_accepted_fold_layer_rows}
accepted fold-layer rows, and no branch-chart authorization.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${sourceTable(attempt.source_artifacts)}

## Certificate Rule

${attempt.interval_certificate_rule}

## No-Promotion Rule

${attempt.no_promotion_rule}

## Candidate Intervals

| Row | Failed side | Lower open threshold | Trial lambda | Width to trial | Sampled opening margin | Interval certificate |
| --- | --- | ---: | ---: | ---: | ---: | --- |
${rowTable(attempt.row_interval_certificate_attempts)}

## Field Audit

| Field | Certified count |
| --- | ---: |
${fieldCountTable(attempt.interval_certificate_field_counts, summary.rows)}

## Closure Burden

The next proof object must supply interval data, not another sampled replay:
active-endpoint enclosure over the lambda interval, an outward defect-derivative
bound, positive boundary opening throughout the interval, source/receiver
monotonicity, memory margins, endpoint ownership/no-double-counting,
branch-reuse exclusion, non-owned complement closure, endpoint boundary
bindings and endpoint motion rules where the endpoint-functional route is used,
and a preledger pass before row consumption.

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
    rowClosureBudget: readJson(args.rowClosureBudget),
    directPathScreen: readJson(args.directPathScreen),
    lambda0305ReplayAudit: readJson(args.lambda0305ReplayAudit),
    endpointBoundaryBindingAttempt: readJson(args.endpointBoundaryBindingAttempt),
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

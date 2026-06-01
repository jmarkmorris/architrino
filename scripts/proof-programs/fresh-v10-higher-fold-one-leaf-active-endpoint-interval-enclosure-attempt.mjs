#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_INTERVAL_CERTIFICATE_ATTEMPT = `${CERT_DIR}/one_leaf_boundary_opening_interval_certificate_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_ROW_CLOSURE_BUDGET = `${CERT_DIR}/row_closure_geometry_budget_packet.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_DIRECT_PATH_SCREEN = `${CERT_DIR}/one_leaf_direct_path_lambda_shift_screen.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `one_leaf_active_endpoint_interval_enclosure_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `one_leaf_active_endpoint_interval_enclosure_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const ACTIVE_ENDPOINT_FIELDS = [
  "candidate_lambda_interval_declared",
  "candidate_lambda_interval_nonempty",
  "sampled_active_endpoint_stability_present",
  "source_active_endpoint_sample_present",
  "receiver_active_endpoint_sample_present",
  "sampled_active_endpoint_pair_stable",
  "sampled_opening_above_probe_threshold_present",
  "source_active_endpoint_interval_box_constructed",
  "receiver_active_endpoint_interval_box_constructed",
  "source_endpoint_residual_interval_bound_constructed",
  "receiver_endpoint_residual_interval_bound_constructed",
  "source_endpoint_derivative_isolation_certified",
  "receiver_endpoint_derivative_isolation_certified",
  "active_endpoint_pair_constant_on_interval_certified",
  "active_endpoint_uniqueness_on_interval_certified",
  "endpoint_switch_exclusion_certified",
  "active_endpoint_gap_margin_positive_on_interval",
  "interval_active_endpoint_enclosure_present",
  "interval_defect_derivative_bound_present",
  "strict_combined_boundary_opening_gt_threshold",
  "interval_boundary_opening_positive_certified",
  "source_monotonicity_preserved_on_interval",
  "receiver_monotonicity_preserved_on_interval",
  "memory_margins_certified_on_interval",
  "endpoint_ownership_no_double_counting_certified",
  "non_owned_complement_closed",
  "preledger_pass",
  "row_consumed",
  "branch_chart_authorized",
];

const ENCLOSURE_METHODS = [
  {
    method_id: "sampled_active_endpoint_stability_as_interval_enclosure",
    description:
      "Try to promote sampled endpoint-pair stability between lambda=0.3 and lambda=0.305 into an interval active-endpoint enclosure.",
    required_fields: [
      "candidate_lambda_interval_declared",
      "candidate_lambda_interval_nonempty",
      "sampled_active_endpoint_stability_present",
      "source_active_endpoint_sample_present",
      "receiver_active_endpoint_sample_present",
      "sampled_active_endpoint_pair_stable",
      "source_active_endpoint_interval_box_constructed",
      "receiver_active_endpoint_interval_box_constructed",
      "source_endpoint_residual_interval_bound_constructed",
      "receiver_endpoint_residual_interval_bound_constructed",
      "source_endpoint_derivative_isolation_certified",
      "receiver_endpoint_derivative_isolation_certified",
      "active_endpoint_pair_constant_on_interval_certified",
      "active_endpoint_uniqueness_on_interval_certified",
      "endpoint_switch_exclusion_certified",
      "active_endpoint_gap_margin_positive_on_interval",
    ],
  },
  {
    method_id: "trial_endpoint_pair_as_interval_enclosure",
    description:
      "Try to use the lambda=0.305 endpoint pair as an enclosure over the full candidate lambda interval.",
    required_fields: [
      "source_active_endpoint_sample_present",
      "receiver_active_endpoint_sample_present",
      "sampled_active_endpoint_pair_stable",
      "source_active_endpoint_interval_box_constructed",
      "receiver_active_endpoint_interval_box_constructed",
      "active_endpoint_pair_constant_on_interval_certified",
      "active_endpoint_uniqueness_on_interval_certified",
      "endpoint_switch_exclusion_certified",
    ],
  },
  {
    method_id: "active_endpoint_enclosure_as_boundary_opening_certificate",
    description:
      "Try to promote an active-endpoint enclosure into the full boundary-opening interval-certificate substack.",
    required_fields: [
      "interval_active_endpoint_enclosure_present",
      "interval_defect_derivative_bound_present",
      "strict_combined_boundary_opening_gt_threshold",
      "interval_boundary_opening_positive_certified",
      "source_monotonicity_preserved_on_interval",
      "receiver_monotonicity_preserved_on_interval",
      "memory_margins_certified_on_interval",
      "endpoint_ownership_no_double_counting_certified",
      "non_owned_complement_closed",
      "preledger_pass",
      "row_consumed",
      "branch_chart_authorized",
    ],
  },
];

function parseArgs(argv) {
  const args = {
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-one-leaf-active-endpoint-interval-enclosure-attempt.mjs [options]

Options:
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
  assertPacketId(inputs.intervalCertificateAttempt, "interval-certificate attempt");
  assertPacketId(inputs.rowClosureBudget, "row-closure budget");
  assertPacketId(inputs.directPathScreen, "direct-path screen");
  const expectedStatuses = {
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
      throw new Error(`Refusing to build active-endpoint attempt from authorized ${name}.`);
    }
  }
  if (
    !Array.isArray(inputs.intervalCertificateAttempt.row_interval_certificate_attempts) ||
    inputs.intervalCertificateAttempt.row_interval_certificate_attempts.length !== 3
  ) {
    throw new Error("Expected exactly 3 interval-certificate row attempts.");
  }
  if (!Array.isArray(inputs.rowClosureBudget.row_geometry_budgets) || inputs.rowClosureBudget.row_geometry_budgets.length !== 3) {
    throw new Error("Expected exactly 3 row geometry budgets.");
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

function sameNumber(left, right) {
  return Number.isFinite(left) && Number.isFinite(right) && Object.is(cleanNumber(left), cleanNumber(right));
}

function methodResults(fields) {
  return ENCLOSURE_METHODS.map((method) => {
    const missingFields = method.required_fields.filter((field) => fields[field] !== true);
    return {
      method_id: method.method_id,
      description: method.description,
      required_fields: method.required_fields,
      missing_fields: missingFields,
      failure_codes: missingFields.map((field) => `missing_one_leaf_active_endpoint_interval_enclosure_${field}`),
      passed: missingFields.length === 0,
    };
  });
}

function buildRowAttempt(intervalRow, rowBudget, screenRow) {
  const baselineSourceTheta = screenRow.baseline.source_boundary.theta;
  const trialSourceTheta = screenRow.trial.source_boundary.theta;
  const baselineReceiverTheta = screenRow.baseline.receiver_boundary.theta;
  const trialReceiverTheta = screenRow.trial.receiver_boundary.theta;
  const sourceThetaStable = sameNumber(baselineSourceTheta, trialSourceTheta);
  const receiverThetaStable = sameNumber(baselineReceiverTheta, trialReceiverTheta);
  const sampledPairStable =
    screenRow.active_endpoint_stable_between_lambdas === true && sourceThetaStable && receiverThetaStable;
  const intervalFields = intervalRow.required_fields_present;
  const budgetFields = rowBudget.proof_grade_fields_present;
  const fields = {
    candidate_lambda_interval_declared: intervalFields.candidate_lambda_interval_declared === true,
    candidate_lambda_interval_nonempty: intervalFields.candidate_lambda_interval_nonempty === true,
    sampled_active_endpoint_stability_present:
      intervalFields.sampled_active_endpoint_stability_present === true &&
      budgetFields.active_endpoint_stable_between_lambdas === true &&
      screenRow.active_endpoint_stable_between_lambdas === true,
    source_active_endpoint_sample_present:
      Number.isFinite(baselineSourceTheta) &&
      Number.isFinite(trialSourceTheta) &&
      Number.isFinite(screenRow.baseline.source_boundary.value) &&
      Number.isFinite(screenRow.trial.source_boundary.value),
    receiver_active_endpoint_sample_present:
      Number.isFinite(baselineReceiverTheta) &&
      Number.isFinite(trialReceiverTheta) &&
      Number.isFinite(screenRow.baseline.receiver_boundary.value) &&
      Number.isFinite(screenRow.trial.receiver_boundary.value),
    sampled_active_endpoint_pair_stable: sampledPairStable,
    sampled_opening_above_probe_threshold_present:
      intervalFields.sampled_opening_above_probe_threshold_present === true &&
      budgetFields.combined_opening_gt_probe_threshold === true &&
      screenRow.candidate_change_from_baseline_to_trial.combined_opening_gt_probe_threshold === true,
    source_active_endpoint_interval_box_constructed: false,
    receiver_active_endpoint_interval_box_constructed: false,
    source_endpoint_residual_interval_bound_constructed: false,
    receiver_endpoint_residual_interval_bound_constructed: false,
    source_endpoint_derivative_isolation_certified: false,
    receiver_endpoint_derivative_isolation_certified: false,
    active_endpoint_pair_constant_on_interval_certified: false,
    active_endpoint_uniqueness_on_interval_certified: false,
    endpoint_switch_exclusion_certified: false,
    active_endpoint_gap_margin_positive_on_interval: false,
    interval_active_endpoint_enclosure_present: false,
    interval_defect_derivative_bound_present: false,
    strict_combined_boundary_opening_gt_threshold: false,
    interval_boundary_opening_positive_certified: false,
    source_monotonicity_preserved_on_interval: false,
    receiver_monotonicity_preserved_on_interval: false,
    memory_margins_certified_on_interval: false,
    endpoint_ownership_no_double_counting_certified: false,
    non_owned_complement_closed: false,
    preledger_pass: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  const methods = methodResults(fields);
  const obstructionCodes = [];
  for (const field of [
    "source_active_endpoint_interval_box_constructed",
    "receiver_active_endpoint_interval_box_constructed",
    "source_endpoint_residual_interval_bound_constructed",
    "receiver_endpoint_residual_interval_bound_constructed",
    "source_endpoint_derivative_isolation_certified",
    "receiver_endpoint_derivative_isolation_certified",
    "active_endpoint_pair_constant_on_interval_certified",
    "active_endpoint_uniqueness_on_interval_certified",
    "endpoint_switch_exclusion_certified",
    "active_endpoint_gap_margin_positive_on_interval",
    "interval_active_endpoint_enclosure_present",
    "interval_defect_derivative_bound_present",
    "strict_combined_boundary_opening_gt_threshold",
    "interval_boundary_opening_positive_certified",
    "preledger_pass",
    "row_consumed",
  ]) {
    if (fields[field] !== true) {
      obstructionCodes.push(`${field}_absent`);
    }
  }
  return {
    row_id: intervalRow.row_id,
    cover_id: intervalRow.cover_id,
    ledger: intervalRow.ledger,
    source_interval: intervalRow.source_interval,
    receiver_interval: intervalRow.receiver_interval,
    failed_side: intervalRow.failed_side,
    candidate_lambda_interval: intervalRow.candidate_lambda_interval,
    sampled_active_endpoint_pair: {
      baseline_lambda: cleanNumber(screenRow.baseline.lambda),
      trial_lambda: cleanNumber(screenRow.trial.lambda),
      boundary_side: screenRow.trial.boundary_side,
      source_baseline_theta: cleanNumber(baselineSourceTheta),
      source_trial_theta: cleanNumber(trialSourceTheta),
      source_theta_stable_between_samples: sourceThetaStable,
      receiver_baseline_theta: cleanNumber(baselineReceiverTheta),
      receiver_trial_theta: cleanNumber(trialReceiverTheta),
      receiver_theta_stable_between_samples: receiverThetaStable,
      active_endpoint_pair_stable_between_lambdas: sampledPairStable,
    },
    sampled_boundary_values: {
      source_baseline_value: cleanNumber(screenRow.baseline.source_boundary.value),
      source_trial_value: cleanNumber(screenRow.trial.source_boundary.value),
      receiver_baseline_value: cleanNumber(screenRow.baseline.receiver_boundary.value),
      receiver_trial_value: cleanNumber(screenRow.trial.receiver_boundary.value),
      sampled_defect_baseline: cleanNumber(screenRow.baseline.sampled_defect),
      sampled_defect_trial: cleanNumber(screenRow.trial.sampled_defect),
      sampled_defect_lambda_derivative_at_active_endpoints:
        cleanNumber(screenRow.trial.sampled_defect_lambda_derivative_at_active_endpoints),
      combined_boundary_opening_decimal:
        cleanNumber(screenRow.candidate_change_from_baseline_to_trial.combined_boundary_opening_decimal),
      combined_boundary_opening_margin_vs_probe_threshold_decimal:
        cleanNumber(
          screenRow.candidate_change_from_baseline_to_trial.combined_boundary_opening_margin_vs_probe_threshold_decimal
        ),
    },
    required_fields_present: fields,
    method_results: methods,
    passed_methods: methods.filter((method) => method.passed).map((method) => method.method_id),
    interval_active_endpoint_enclosure_constructed:
      methods.some((method) => method.passed) &&
      fields.interval_active_endpoint_enclosure_present &&
      fields.preledger_pass &&
      fields.row_consumed,
    obstruction_codes: obstructionCodes,
    obstruction:
      "The row has stable sampled source/receiver endpoint theta values at lambda=0.3 and lambda=0.305, but no interval endpoint boxes, residual interval bounds, derivative isolation, no-switch proof, uniqueness proof, gap-margin certificate, interval active-endpoint enclosure, interval derivative bound, strict boundary-opening certificate, preledger pass, or row consumption.",
  };
}

function buildAttempt(inputs, paths) {
  assertInputs(inputs);
  const budgetRows = rowMap(inputs.rowClosureBudget.row_geometry_budgets, "row-closure budget");
  const screenRows = rowMap(inputs.directPathScreen.rows, "direct-path screen");
  const rowAttempts = inputs.intervalCertificateAttempt.row_interval_certificate_attempts.map((intervalRow) =>
    buildRowAttempt(
      intervalRow,
      requireMatchingRow(budgetRows, intervalRow.row_id, "row-closure budget"),
      requireMatchingRow(screenRows, intervalRow.row_id, "direct-path screen")
    )
  );
  const fieldCounts = Object.fromEntries(
    ACTIVE_ENDPOINT_FIELDS.map((field) => [
      field,
      countTrue(rowAttempts, (row) => row.required_fields_present[field]),
    ])
  );
  return {
    schema: "breather-higher-fold-one-leaf-active-endpoint-interval-enclosure-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: "one_leaf_active_endpoint_interval_enclosure_attempt_fail_closed_sampled_stability_only_no_row_consumption",
    theorem_target: "One-Leaf Active-Endpoint Interval Enclosure",
    claim_level:
      "priority-only active-endpoint interval-enclosure attempt; it preserves sampled endpoint-pair stability for the three one-leaf rows but constructs zero interval boxes or proof-grade enclosures and consumes zero rows",
    source_artifacts: {
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
      sampled_active_endpoint_stability_promoted_to_interval_enclosure: false,
      sampled_lambda_budget_promoted_to_interval_certificate: false,
      active_endpoint_interval_enclosure_promoted_to_boundary_opening_certificate: false,
      lambda0305_replay_promoted_to_row_closure: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    active_endpoint_interval_enclosure_rule:
      "A one-leaf active-endpoint interval enclosure must construct source and receiver endpoint boxes over the full candidate lambda interval, bound the endpoint residuals on those boxes, isolate the endpoint derivatives, exclude endpoint switching, prove active-endpoint uniqueness, and certify a positive endpoint gap margin before it can feed any boundary-opening interval certificate.",
    no_promotion_rule:
      "Sampled equality of the active endpoint pair at lambda=0.3 and lambda=0.305 is diagnostic only. It does not imply an interval endpoint box, residual interval bound, derivative isolation, no-switch proof, uniqueness proof, interval active-endpoint enclosure, strict boundary-opening certificate, preledger pass, row consumption, or branch-chart authorization.",
    candidate_interval_summary: inputs.intervalCertificateAttempt.candidate_interval_summary,
    replay_lock: inputs.intervalCertificateAttempt.replay_lock,
    downstream_boundary_opening_lock: {
      interval_active_endpoint_enclosure_rows:
        fieldCounts.interval_active_endpoint_enclosure_present,
      interval_defect_derivative_bound_rows:
        fieldCounts.interval_defect_derivative_bound_present,
      strict_combined_boundary_opening_gt_threshold_rows:
        fieldCounts.strict_combined_boundary_opening_gt_threshold,
      interval_boundary_opening_positive_rows:
        fieldCounts.interval_boundary_opening_positive_certified,
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
    },
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
      source_active_endpoint_interval_box_rows:
        fieldCounts.source_active_endpoint_interval_box_constructed,
      receiver_active_endpoint_interval_box_rows:
        fieldCounts.receiver_active_endpoint_interval_box_constructed,
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
      endpoint_switch_exclusion_rows:
        fieldCounts.endpoint_switch_exclusion_certified,
      active_endpoint_uniqueness_rows:
        fieldCounts.active_endpoint_uniqueness_on_interval_certified,
      active_endpoint_gap_margin_rows:
        fieldCounts.active_endpoint_gap_margin_positive_on_interval,
      interval_active_endpoint_enclosure_rows:
        fieldCounts.interval_active_endpoint_enclosure_present,
      interval_defect_derivative_bound_rows:
        fieldCounts.interval_defect_derivative_bound_present,
      strict_combined_boundary_opening_gt_threshold_rows:
        fieldCounts.strict_combined_boundary_opening_gt_threshold,
      interval_boundary_opening_positive_rows:
        fieldCounts.interval_boundary_opening_positive_certified,
      proof_grade_active_endpoint_interval_enclosure_rows:
        rowAttempts.filter((row) => row.interval_active_endpoint_enclosure_constructed).length,
      preledger_pass_rows:
        fieldCounts.preledger_pass,
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    active_endpoint_field_counts: fieldCounts,
    row_active_endpoint_interval_enclosure_attempts: rowAttempts,
    capture_decision:
      "Priority-only. The attempt narrows the blocker from sampled one-leaf opening to the missing interval active-endpoint enclosure layer: sampled endpoint pairs are stable in 3 / 3 rows, but no source/receiver interval boxes, residual bounds, derivative isolation, no-switch proof, uniqueness proof, gap-margin certificate, interval active-endpoint enclosure, downstream interval derivative bound, preledger pass, or row consumption is certified.",
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
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.candidate_lambda_interval.lower_open_threshold} | ${row.candidate_lambda_interval.upper_trial_lambda} | ${row.sampled_active_endpoint_pair.source_baseline_theta} -> ${row.sampled_active_endpoint_pair.source_trial_theta} | ${row.sampled_active_endpoint_pair.receiver_baseline_theta} -> ${row.sampled_active_endpoint_pair.receiver_trial_theta} | ${row.required_fields_present.sampled_active_endpoint_pair_stable} | ${row.interval_active_endpoint_enclosure_constructed} |`
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
  return `# Higher-Fold One-Leaf Active-Endpoint Interval-Enclosure Attempt

## Verdict

Status: \`${attempt.status}\`.

This priority-only packet tests the first missing subproblem in the one-leaf
boundary-opening interval-certificate attempt: whether stable sampled active
endpoint pairs can be promoted into interval active-endpoint enclosures. It
imports the nonempty sampled lambda intervals from the prior attempt and the
direct-path screen at \`lambda=0.305\`.

The attempt fail-closes. It records sampled active-endpoint pair stability in
${summary.sampled_active_endpoint_pair_stable_rows} / ${summary.rows} rows over
candidate intervals ending at \`${interval.trial_lambda}\`, but constructs 0 / ${summary.rows}
source endpoint interval boxes, 0 / ${summary.rows} receiver endpoint interval
boxes, 0 / ${summary.rows} endpoint residual interval bounds, 0 / ${summary.rows}
endpoint derivative-isolation certificates, 0 / ${summary.rows} endpoint
switch-exclusion certificates, 0 / ${summary.rows} active-endpoint uniqueness
certificates, 0 / ${summary.rows} active-endpoint gap-margin certificates, and
0 / ${summary.rows} interval active-endpoint enclosures. It consumes 0 rows,
keeps \`preledger_pass=false\`, keeps \`updates_live_ledger=false\`, keeps
\`branch_chart_authorized=false\`, emits no candidate artifacts, emits no
topology recertification, and emits no proof-interval replay of its own.

The imported trial replay remains locked with ${replay.v6_split_required_base_rows}
split-required base rows, ${replay.v6_receiver_cover_complete_parent_rows}
complete receiver-cover parent rows, ${replay.v6_accepted_fold_layer_rows}
accepted fold-layer rows, and no branch-chart authorization.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${sourceTable(attempt.source_artifacts)}

## Enclosure Rule

${attempt.active_endpoint_interval_enclosure_rule}

## No-Promotion Rule

${attempt.no_promotion_rule}

## Row Attempts

| Row | Failed side | Lower open threshold | Trial lambda | Source theta sample | Receiver theta sample | Sampled pair stable | Interval enclosure |
| --- | --- | ---: | ---: | --- | --- | ---: | ---: |
${rowTable(attempt.row_active_endpoint_interval_enclosure_attempts)}

## Field Audit

| Field | Certified count |
| --- | ---: |
${fieldCountTable(attempt.active_endpoint_field_counts, summary.rows)}

## Downstream Boundary-Opening Lock

Active-endpoint enclosures alone would still be insufficient. A consumable
one-leaf boundary-opening interval certificate also needs interval
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

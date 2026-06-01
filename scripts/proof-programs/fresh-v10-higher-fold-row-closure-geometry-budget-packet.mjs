#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_DIRECT_PATH_SCREEN = `${CERT_DIR}/one_leaf_direct_path_lambda_shift_screen.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_LAMBDA0305_REPLAY_AUDIT = `${CERT_DIR}/lambda0305_preledger_replay_audit.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_FOLD_LAYER_BURDEN = `${CERT_DIR}/fold_layer_burden.${PACKET_ID}.json`;
const DEFAULT_ENDPOINT_BOUNDARY_BINDING_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `row_closure_geometry_budget_packet.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `row_closure_geometry_budget_packet_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const ROW_PROOF_GRADE_FIELDS = [
  "sampled_trial_defect_opened",
  "combined_opening_gt_probe_threshold",
  "active_endpoint_stable_between_lambdas",
  "root_topology_recertified_at_trial_lambda",
  "proof_interval_preledger_rerun_at_trial_lambda",
  "proof_interval_preledger_passed_at_trial_lambda",
  "source_monotonicity_preserved_under_candidate_change",
  "receiver_monotonicity_preserved_under_candidate_change",
  "memory_margins_all_owned_components",
  "endpoint_ownership_no_double_counting",
  "simple_root_branch_reuse_exclusion",
  "non_owned_complement_closed",
  "endpoint_boundary_bindings_constructed",
  "endpoint_motion_rules_constructed",
  "receiver_cover_parent_row_complete",
  "fold_layer_rows_accepted",
  "row_consumed",
  "branch_chart_authorized",
];

function parseArgs(argv) {
  const args = {
    directPathScreen: DEFAULT_DIRECT_PATH_SCREEN,
    lambda0305ReplayAudit: DEFAULT_LAMBDA0305_REPLAY_AUDIT,
    foldLayerBurden: DEFAULT_FOLD_LAYER_BURDEN,
    endpointBoundaryBindingAttempt: DEFAULT_ENDPOINT_BOUNDARY_BINDING_ATTEMPT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--direct-path-screen") {
      args.directPathScreen = argv[++index];
    } else if (arg === "--lambda0305-replay-audit") {
      args.lambda0305ReplayAudit = argv[++index];
    } else if (arg === "--fold-layer-burden") {
      args.foldLayerBurden = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-row-closure-geometry-budget-packet.mjs [options]

Options:
  --direct-path-screen PATH                 One-leaf direct-path lambda screen JSON. Defaults to ${DEFAULT_DIRECT_PATH_SCREEN}.
  --lambda0305-replay-audit PATH            Lambda 0.305 replay audit JSON. Defaults to ${DEFAULT_LAMBDA0305_REPLAY_AUDIT}.
  --fold-layer-burden PATH                  Fold-layer burden atlas JSON. Defaults to ${DEFAULT_FOLD_LAYER_BURDEN}.
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

function minNumber(values) {
  return cleanNumber(Math.min(...values));
}

function maxNumber(values) {
  return cleanNumber(Math.max(...values));
}

function assertPacketId(source, name) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${name} packet id: ${source.packet_id}`);
  }
}

function assertInputs(inputs) {
  assertPacketId(inputs.directPathScreen, "direct-path screen");
  assertPacketId(inputs.lambda0305ReplayAudit, "lambda=0.305 replay audit");
  assertPacketId(inputs.foldLayerBurden, "fold-layer burden");
  assertPacketId(inputs.endpointBoundaryBindingAttempt, "endpoint-boundary-binding attempt");
  const expectedStatuses = {
    directPathScreen: "one_leaf_direct_path_lambda_shift_screen_fail_closed",
    lambda0305ReplayAudit: "lambda0305_topology_certified_preledger_still_blocked",
    foldLayerBurden: "higher_fold_layer_burden_recorded_no_row_consumption",
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
      throw new Error(`Refusing to build row-closure geometry budget from authorized ${name}.`);
    }
  }
  if (!Array.isArray(inputs.directPathScreen.rows) || inputs.directPathScreen.rows.length !== 3) {
    throw new Error("Expected exactly 3 direct-path screen rows.");
  }
  if (
    !Array.isArray(inputs.endpointBoundaryBindingAttempt.row_boundary_binding_construction_attempts) ||
    inputs.endpointBoundaryBindingAttempt.row_boundary_binding_construction_attempts.length !== 3
  ) {
    throw new Error("Expected exactly 3 row boundary-binding construction attempts.");
  }
}

function importedReplayFields(replay) {
  const v4 = replay.ephemeral_preledger_replay.v4;
  const v5 = replay.ephemeral_preledger_replay.v5;
  const v6 = replay.ephemeral_preledger_replay.v6;
  return {
    root_topology_recertified_at_trial_lambda:
      replay.topology_recertification.root_count_interval_certified === true,
    proof_interval_preledger_rerun_at_trial_lambda: Boolean(v1ThroughV6Present(replay)),
    proof_interval_preledger_passed_at_trial_lambda: replay.preledger_pass === true,
    v4_simple_root_subrows: v4.certified_simple_root_subrows,
    v5_receiver_cover_certified_cells: v5.receiver_cover_certified_cells,
    v5_receiver_cover_complete_parent_rows: v5.receiver_cover_complete_parent_rows,
    v6_receiver_cover_certified_cells: v6.receiver_cover_certified_cells,
    v6_receiver_cover_missing_cells: v6.receiver_cover_missing_cells,
    v6_receiver_cover_complete_parent_rows: v6.receiver_cover_complete_parent_rows ?? 0,
    v6_receiver_cover_terminal_missing_coarse_cells: v6.receiver_cover_terminal_missing_coarse_cells,
    v6_receiver_cover_structural_miss_count: v6.receiver_cover_structural_miss_count,
    v6_receiver_cover_indeterminate_miss_count: v6.receiver_cover_indeterminate_miss_count,
    v6_accepted_fold_layer_rows: v6.accepted_fold_layer_rows,
    v6_split_required_base_rows: v6.split_required_base_rows,
    v6_branch_chart_authorized: v6.branch_chart_authorized,
  };
}

function v1ThroughV6Present(replay) {
  const entries = replay.ephemeral_preledger_replay ?? {};
  return ["v1", "v2", "v3", "v4", "v5", "v6"].every((key) => entries[key]?.ledger_sha256);
}

function rowAttemptById(endpointAttempt) {
  return new Map(endpointAttempt.row_boundary_binding_construction_attempts.map((row) => [row.row_id, row]));
}

function buildRowBudget(row, context) {
  const endpointRow = context.endpointRowsById.get(row.row_id);
  if (!endpointRow) {
    throw new Error(`Missing endpoint-boundary-binding row attempt for ${row.row_id}.`);
  }
  const change = row.candidate_change_from_baseline_to_trial;
  const budget = row.active_endpoint_lambda_budget;
  const proof = row.proof_grade_status ?? {};
  const replay = context.replayFields;
  const fields = {
    sampled_trial_defect_opened: change.trial_sampled_defect_opened === true,
    combined_opening_gt_probe_threshold: change.combined_opening_gt_probe_threshold === true,
    active_endpoint_stable_between_lambdas: row.active_endpoint_stable_between_lambdas === true,
    root_topology_recertified_at_trial_lambda: replay.root_topology_recertified_at_trial_lambda === true,
    proof_interval_preledger_rerun_at_trial_lambda: replay.proof_interval_preledger_rerun_at_trial_lambda === true,
    proof_interval_preledger_passed_at_trial_lambda: replay.proof_interval_preledger_passed_at_trial_lambda === true,
    source_monotonicity_preserved_under_candidate_change:
      proof.source_monotonicity_preserved_under_candidate_change === true,
    receiver_monotonicity_preserved_under_candidate_change:
      proof.receiver_monotonicity_preserved_under_candidate_change === true,
    memory_margins_all_owned_components: proof.memory_margins_all_owned_components === true,
    endpoint_ownership_no_double_counting: proof.endpoint_ownership_no_double_counting === true,
    simple_root_branch_reuse_exclusion: proof.simple_root_branch_reuse_exclusion === true,
    non_owned_complement_closed: proof.non_owned_complement_closed === true,
    endpoint_boundary_bindings_constructed:
      endpointRow.required_fields_present.source_endpoint_boundary_binding_constructed === true &&
      endpointRow.required_fields_present.receiver_endpoint_boundary_binding_constructed === true,
    endpoint_motion_rules_constructed:
      endpointRow.required_fields_present.source_endpoint_motion_rule_constructed === true &&
      endpointRow.required_fields_present.receiver_endpoint_motion_rule_constructed === true,
    receiver_cover_parent_row_complete: replay.v6_receiver_cover_complete_parent_rows > 0,
    fold_layer_rows_accepted: replay.v6_accepted_fold_layer_rows > 0,
    row_consumed: endpointRow.row_consumed === true || proof.row_consumed === true,
    branch_chart_authorized: endpointRow.branch_chart_authorized === true || proof.branch_chart_authorized === true,
  };
  const missingFields = ROW_PROOF_GRADE_FIELDS.filter((field) => fields[field] !== true);
  return {
    row_id: row.row_id,
    cover_id: row.cover_id,
    ledger: row.ledger,
    receiver_interval: row.receiver_interval,
    source_interval: row.source_interval,
    failed_side: row.failed_side,
    required_strict_improvement_decimal: row.required_strict_improvement_decimal,
    baseline_sampled_defect: row.baseline.sampled_defect,
    trial_sampled_defect: row.trial.sampled_defect,
    combined_boundary_opening_decimal: change.combined_boundary_opening_decimal,
    combined_boundary_opening_margin_vs_probe_threshold_decimal:
      change.combined_boundary_opening_margin_vs_probe_threshold_decimal,
    lambda_min_open_from_probe_threshold_active_endpoint_screen:
      budget.lambda_min_open_from_probe_threshold_active_endpoint_screen,
    trial_lambda_margin_after_min_open: budget.trial_lambda_margin_after_min_open,
    row_boundary_values: {
      source_boundary_ref: endpointRow.source_boundary_ref,
      receiver_boundary_ref: endpointRow.receiver_boundary_ref,
      source_boundary_value: endpointRow.source_boundary_value,
      receiver_boundary_value: endpointRow.receiver_boundary_value,
    },
    proof_grade_fields_present: fields,
    missing_proof_grade_fields: missingFields,
    proof_grade_boundary_opening_certified: missingFields.length === 0,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has a positive sampled direct-path geometry budget and the trial lambda has imported topology/preledger replay data, but the replay remains preledger-blocked and the row still lacks endpoint boundary bindings, endpoint motion rules, monotonicity, memory, ownership/no-double-counting, branch-reuse exclusion, non-owned complement closure, receiver-cover completion, accepted fold-layer rows, and row consumption.",
  };
}

function buildBudget(inputs, paths) {
  assertInputs(inputs);
  const replayFields = importedReplayFields(inputs.lambda0305ReplayAudit);
  const endpointRowsById = rowAttemptById(inputs.endpointBoundaryBindingAttempt);
  const rowBudgets = inputs.directPathScreen.rows.map((row) =>
    buildRowBudget(row, { endpointRowsById, replayFields })
  );
  const lambdaMins = rowBudgets.map(
    (row) => row.lambda_min_open_from_probe_threshold_active_endpoint_screen
  );
  const trialMargins = rowBudgets.map((row) => row.trial_lambda_margin_after_min_open);
  const endpointSummary = inputs.endpointBoundaryBindingAttempt.summary;
  const foldLayerSummary = inputs.foldLayerBurden.summary;
  const rowProofGradeFieldCounts = Object.fromEntries(
    ROW_PROOF_GRADE_FIELDS.map((field) => [
      field,
      countTrue(rowBudgets, (row) => row.proof_grade_fields_present[field]),
    ])
  );

  return {
    schema: "breather-higher-fold-row-closure-geometry-budget-packet-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: "row_closure_geometry_budget_packet_fail_closed_no_row_consumption",
    theorem_target: "Fold-Coordinate Row-Closure Geometry Budget",
    claim_level:
      "priority-only row-closure geometry budget; positive sampled direct-path openings and imported lambda=0.305 topology/replay data are recorded, but no row is consumed and no branch chart is authorized",
    source_artifacts: {
      direct_path_screen: artifactRecord(paths.directPathScreen),
      lambda0305_replay_audit: artifactRecord(paths.lambda0305ReplayAudit),
      fold_layer_burden: artifactRecord(paths.foldLayerBurden),
      endpoint_boundary_binding_attempt: artifactRecord(paths.endpointBoundaryBindingAttempt),
    },
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    authorization_lock: {
      candidate_artifacts_same_packet_validated: false,
      candidate_replay_same_packet_validated: false,
      candidate_artifact_replay_ready: false,
      row_closure_geometry_certified: false,
      root_topology_recertified_for_candidate_change: false,
      candidate_root_topology_certificate_present: false,
      proof_interval_v1_v6_rerun_for_candidate_change: false,
      candidate_preledger_replay_present: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    geometry_budget_rule:
      "For each one-leaf row, use the direct-path active-endpoint screen to form a sampled boundary-opening budget. A sampled row opens only if its active endpoints are stable from the baseline lambda to the trial lambda, the trial sampled defect is negative, and the combined favorable source/receiver boundary shift exceeds the exact probe threshold. This is not a row-consumption rule.",
    no_consumption_rule:
      "Imported topology recertification and imported v1-v6 replay data do not consume a row unless the replay passes the preledger and the row also has endpoint boundary bindings, endpoint motion rules, monotonicity, memory, endpoint ownership/no-double-counting, branch-reuse exclusion, non-owned complement closure, receiver-cover completion, and fold-layer closure where applicable.",
    row_closure_geometry_budget_lemma:
      "If the active endpoint pair for row r remains fixed on a lambda interval and the sampled active-endpoint defect derivative is negative, then the screen-level boundary opening threshold is lambda > lambda_min(r). For this packet, max_r lambda_min(r) is below the trial lambda, so the sampled one-leaf geometry opens. The lemma is screen-level until the active-endpoint, monotonicity, topology, preledger, ownership, and complement conditions are interval-certified.",
    lambda_budget: {
      baseline_lambda: inputs.directPathScreen.lambda_screen.baseline_lambda,
      trial_lambda: inputs.directPathScreen.lambda_screen.trial_lambda,
      shared_lambda_min_open_from_probe_threshold_active_endpoint_screen: maxNumber(lambdaMins),
      minimum_trial_lambda_margin_after_shared_min_open: minNumber(trialMargins),
      direct_path_sample_count_per_boundary_interval:
        inputs.directPathScreen.lambda_screen.sample_count_per_boundary_interval,
      imported_trial_root_topology_recertified:
        replayFields.root_topology_recertified_at_trial_lambda,
      imported_trial_proof_interval_v1_v6_rerun:
        replayFields.proof_interval_preledger_rerun_at_trial_lambda,
      imported_trial_preledger_pass: replayFields.proof_interval_preledger_passed_at_trial_lambda,
      imported_trial_branch_chart_authorized: replayFields.v6_branch_chart_authorized,
    },
    replay_budget: {
      v4_simple_root_subrows: replayFields.v4_simple_root_subrows,
      v5_receiver_cover_certified_cells: replayFields.v5_receiver_cover_certified_cells,
      v5_receiver_cover_complete_parent_rows: replayFields.v5_receiver_cover_complete_parent_rows,
      v6_receiver_cover_certified_cells: replayFields.v6_receiver_cover_certified_cells,
      v6_receiver_cover_missing_cells: replayFields.v6_receiver_cover_missing_cells,
      v6_receiver_cover_complete_parent_rows: replayFields.v6_receiver_cover_complete_parent_rows,
      v6_receiver_cover_terminal_missing_coarse_cells:
        replayFields.v6_receiver_cover_terminal_missing_coarse_cells,
      v6_receiver_cover_structural_miss_count: replayFields.v6_receiver_cover_structural_miss_count,
      v6_receiver_cover_indeterminate_miss_count: replayFields.v6_receiver_cover_indeterminate_miss_count,
      v6_accepted_fold_layer_rows: replayFields.v6_accepted_fold_layer_rows,
      v6_split_required_base_rows: replayFields.v6_split_required_base_rows,
      lambda0305_baseline_comparison:
        inputs.lambda0305ReplayAudit.comparison_to_lambda0300_baseline,
    },
    endpoint_route_lock: {
      endpoint_boundary_binding_source_data_ready:
        endpointSummary.endpoint_boundary_binding_source_data_ready,
      rows_with_boundary_binding_source_data_ready:
        endpointSummary.rows_with_boundary_binding_source_data_ready,
      endpoint_boundary_bindings_constructed:
        endpointSummary.endpoint_boundary_bindings_constructed,
      endpoint_motion_rules_constructed:
        endpointSummary.endpoint_motion_rules_constructed,
      endpoint_evaluation_maps_constructed:
        endpointSummary.endpoint_evaluation_maps_constructed,
      full_endpoint_evaluation_maps_constructed:
        endpointSummary.full_endpoint_evaluation_maps_constructed,
      exact_screen_zero_certificates:
        endpointSummary.exact_screen_zero_certificates,
      rank_certificates: endpointSummary.rank_certificates,
      row_consumption_count: endpointSummary.row_consumption_count,
      branch_chart_authorized: endpointSummary.branch_chart_authorized,
    },
    fold_layer_route_lock: {
      fold_layer_rows: foldLayerSummary.fold_layer_rows,
      separator_count: foldLayerSummary.separator_count,
      accepted_fold_layer_rows_at_trial_lambda: replayFields.v6_accepted_fold_layer_rows,
      branch_chart_authorized: foldLayerSummary.branch_chart_authorized,
    },
    summary: {
      budget_rows: rowBudgets.length,
      sampled_trial_defect_opened_rows: rowProofGradeFieldCounts.sampled_trial_defect_opened,
      sampled_opening_above_probe_threshold_rows:
        rowProofGradeFieldCounts.combined_opening_gt_probe_threshold,
      active_endpoint_stable_rows:
        rowProofGradeFieldCounts.active_endpoint_stable_between_lambdas,
      imported_trial_topology_recertified_rows:
        rowProofGradeFieldCounts.root_topology_recertified_at_trial_lambda,
      imported_trial_preledger_rerun_rows:
        rowProofGradeFieldCounts.proof_interval_preledger_rerun_at_trial_lambda,
      imported_trial_preledger_pass_rows:
        rowProofGradeFieldCounts.proof_interval_preledger_passed_at_trial_lambda,
      endpoint_boundary_binding_rows:
        rowProofGradeFieldCounts.endpoint_boundary_bindings_constructed,
      endpoint_motion_rule_rows:
        rowProofGradeFieldCounts.endpoint_motion_rules_constructed,
      receiver_cover_parent_complete_rows:
        rowProofGradeFieldCounts.receiver_cover_parent_row_complete,
      accepted_fold_layer_rows: replayFields.v6_accepted_fold_layer_rows,
      proof_grade_boundary_opening_rows:
        rowBudgets.filter((row) => row.proof_grade_boundary_opening_certified).length,
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    row_proof_grade_field_counts: rowProofGradeFieldCounts,
    row_geometry_budgets: rowBudgets,
    capture_decision:
      "Priority-only. The packet constructs a shared sampled lambda opening budget and imports the topology/preledger replay result, but the replay remains preledger-blocked and the endpoint-functional boundary-binding route remains absent. It does not emit candidate artifacts, topology recertification, proof-interval replay, row consumption, live-ledger updates, or a branch chart.",
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

function rowBudgetTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_strict_improvement_decimal} | ${row.trial_sampled_defect} | ${row.combined_boundary_opening_decimal} | ${row.combined_boundary_opening_margin_vs_probe_threshold_decimal} | ${row.lambda_min_open_from_probe_threshold_active_endpoint_screen} | ${row.trial_lambda_margin_after_min_open} | ${row.proof_grade_boundary_opening_certified} |`
    )
    .join("\n");
}

function fieldCountTable(counts, total) {
  return Object.entries(counts)
    .map(([field, count]) => `| \`${field}\` | ${count} / ${total} |`)
    .join("\n");
}

function buildReport(budget) {
  const summary = budget.summary;
  const lambda = budget.lambda_budget;
  const replay = budget.replay_budget;
  const endpoint = budget.endpoint_route_lock;
  const fold = budget.fold_layer_route_lock;
  return `# Higher-Fold Fold-Coordinate Row-Closure Geometry Budget

## Verdict

Status: \`${budget.status}\`.

This priority-only packet records the row-closure geometry route left open by
the endpoint-boundary-binding construction attempt. It imports the one-leaf
direct-path lambda screen and the \`lambda=0.305\` replay audit, then separates
the screen-level geometry budget from proof-grade row consumption.

The sampled direct-path geometry opens ${summary.sampled_opening_above_probe_threshold_rows} / ${summary.budget_rows}
one-leaf rows. The shared active-endpoint threshold is
\`lambda>${lambda.shared_lambda_min_open_from_probe_threshold_active_endpoint_screen}\`,
and the imported trial value \`lambda=${lambda.trial_lambda}\` has minimum
margin \`${lambda.minimum_trial_lambda_margin_after_shared_min_open}\`.
The imported trial also has root topology recertified and v1-v6 preledger
replayed, but the replay still has
${replay.v6_split_required_base_rows} split-required base rows,
${replay.v6_receiver_cover_complete_parent_rows} complete receiver-cover parent
rows, ${replay.v6_accepted_fold_layer_rows} accepted fold-layer rows, and no
branch-chart authorization.

The packet consumes 0 rows, keeps \`preledger_pass=false\`, keeps
\`updates_live_ledger=false\`, and leaves \`branch_chart_authorized=false\`.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${sourceTable(budget.source_artifacts)}

## Geometry Budget Rule

${budget.geometry_budget_rule}

The screen-level lemma recorded by this packet is:

${budget.row_closure_geometry_budget_lemma}

## Lambda Budget

| Quantity | Value |
| --- | ---: |
| Baseline lambda | ${lambda.baseline_lambda} |
| Trial lambda | ${lambda.trial_lambda} |
| Shared active-endpoint lambda threshold | ${lambda.shared_lambda_min_open_from_probe_threshold_active_endpoint_screen} |
| Minimum trial margin after shared threshold | ${lambda.minimum_trial_lambda_margin_after_shared_min_open} |
| Samples per boundary interval in imported screen | ${lambda.direct_path_sample_count_per_boundary_interval} |
| Imported trial topology recertified | ${lambda.imported_trial_root_topology_recertified} |
| Imported trial v1-v6 replay present | ${lambda.imported_trial_proof_interval_v1_v6_rerun} |
| Imported trial preledger pass | ${lambda.imported_trial_preledger_pass} |
| Imported trial branch-chart authorized | ${lambda.imported_trial_branch_chart_authorized} |

## Row Budgets

| Row | Failed side | Probe threshold | Trial sampled defect | Combined opening | Opening margin | Lambda threshold | Trial margin | Proof-grade row |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${rowBudgetTable(budget.row_geometry_budgets)}

## Replay And Route Locks

| Imported replay field | Value |
| --- | ---: |
| v4 simple-root subrows | ${replay.v4_simple_root_subrows} |
| v5 receiver-cover certified cells | ${replay.v5_receiver_cover_certified_cells} |
| v5 complete receiver-cover parent rows | ${replay.v5_receiver_cover_complete_parent_rows} |
| v6 receiver-cover certified cells | ${replay.v6_receiver_cover_certified_cells} |
| v6 receiver-cover structural misses | ${replay.v6_receiver_cover_structural_miss_count} |
| v6 split-required base rows | ${replay.v6_split_required_base_rows} |
| v6 accepted fold-layer rows | ${replay.v6_accepted_fold_layer_rows} |

| Endpoint route lock | Value |
| --- | ---: |
| Endpoint source-data rows ready | ${endpoint.endpoint_boundary_binding_source_data_ready} |
| Row source-data rows ready | ${endpoint.rows_with_boundary_binding_source_data_ready} |
| Endpoint boundary bindings constructed | ${endpoint.endpoint_boundary_bindings_constructed} |
| Endpoint motion rules constructed | ${endpoint.endpoint_motion_rules_constructed} |
| Endpoint evaluation maps constructed | ${endpoint.endpoint_evaluation_maps_constructed} |
| Full endpoint evaluation maps constructed | ${endpoint.full_endpoint_evaluation_maps_constructed} |
| Exact $B\\xi=0$ certificates | ${endpoint.exact_screen_zero_certificates} |
| Rank certificates | ${endpoint.rank_certificates} |

| Fold-layer route lock | Value |
| --- | ---: |
| Fold-layer burden rows | ${fold.fold_layer_rows} |
| Separator count | ${fold.separator_count} |
| Accepted fold-layer rows at trial lambda | ${fold.accepted_fold_layer_rows_at_trial_lambda} |

## Proof-Grade Field Audit

| Field | Certified count |
| --- | ---: |
${fieldCountTable(budget.row_proof_grade_field_counts, summary.budget_rows)}

## Closure Burden

The direct-path lambda family has a real screen-level row-closure geometry
budget, but replaying \`lambda=0.305\` proves that this budget is not yet a
preledger closure mechanism. The next proof object must either make the
positive boundary-opening budget interval-certified with monotonicity, memory,
ownership/no-double-counting, branch-reuse, and non-owned-complement closure, or
strengthen receiver-cover and fold-layer certification so the same trial can
consume rows. It must not re-promote endpoint source data or component locators
as endpoint boundary bindings.

## Capture Decision

${budget.capture_decision}
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const inputs = {
    directPathScreen: readJson(args.directPathScreen),
    lambda0305ReplayAudit: readJson(args.lambda0305ReplayAudit),
    foldLayerBurden: readJson(args.foldLayerBurden),
    endpointBoundaryBindingAttempt: readJson(args.endpointBoundaryBindingAttempt),
  };
  const budget = buildBudget(inputs, args);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, budget, args.pretty);
  writeText(outReport, buildReport(budget));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();

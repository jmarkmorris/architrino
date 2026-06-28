#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_LEDGER = `${CERT_DIR}/causal_ledger.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_ATLAS = `${CERT_DIR}/source_cover_defect_atlas.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_OWNERSHIP = `${CERT_DIR}/source_cover_boundary_ownership_audit.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_ONE_LEAF = `${CERT_DIR}/one_leaf_direct_path_lambda_shift_screen.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_LAMBDA_REPLAY = `${CERT_DIR}/lambda0305_preledger_replay_audit.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_FOLD_LAYER = `${CERT_DIR}/fold_layer_burden.${PACKET_ID}.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `preledger_row_family_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `preledger_row_family_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const REGULAR_SOURCE_COVER_CODE = "trig_range_overlap_simple_root_receiver_not_strictly_covered";
const PERIODIC_ENDPOINT_CODE = "trig_range_overlap_periodic_seam_endpoint_ownership_required";
const FOLD_LAYER_CODE = "trig_range_overlap_touches_fold_layer_candidate";

function parseArgs(argv) {
  const args = {
    ledger: DEFAULT_LEDGER,
    atlas: DEFAULT_ATLAS,
    ownership: DEFAULT_OWNERSHIP,
    oneLeaf: DEFAULT_ONE_LEAF,
    lambdaReplay: DEFAULT_LAMBDA_REPLAY,
    foldLayer: DEFAULT_FOLD_LAYER,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--ledger") {
      args.ledger = argv[++index];
    } else if (arg === "--atlas") {
      args.atlas = argv[++index];
    } else if (arg === "--ownership") {
      args.ownership = argv[++index];
    } else if (arg === "--one-leaf") {
      args.oneLeaf = argv[++index];
    } else if (arg === "--lambda-replay") {
      args.lambdaReplay = argv[++index];
    } else if (arg === "--fold-layer") {
      args.foldLayer = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-preledger-row-family-classifier.mjs [options]

Options:
  --ledger PATH         Higher-fold proof-interval v6 ledger. Defaults to ${DEFAULT_LEDGER}.
  --atlas PATH          Source-cover defect atlas. Defaults to ${DEFAULT_ATLAS}.
  --ownership PATH      Source-cover boundary ownership audit. Defaults to ${DEFAULT_OWNERSHIP}.
  --one-leaf PATH       One-leaf direct-path lambda screen. Defaults to ${DEFAULT_ONE_LEAF}.
  --lambda-replay PATH  Lambda 0.305 replay audit. Defaults to ${DEFAULT_LAMBDA_REPLAY}.
  --fold-layer PATH     Fold-layer burden atlas. Defaults to ${DEFAULT_FOLD_LAYER}.
  --out-dir PATH        Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty              Pretty-print JSON artifact.
  --help                Show this help.`);
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

function rowSortKey(rowId) {
  const match = rowId.match(/^R_([uw])_([AF]\d+)_([AF]\d+)$/);
  if (!match) {
    return rowId;
  }
  const [, ledger, receiver, source] = match;
  return `${receiver}:${source}:${ledger}`;
}

function countBy(values, keyFn) {
  return values.reduce((counts, value) => {
    const key = keyFn(value);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
}

function countTrue(values, keyFn) {
  return values.filter((value) => keyFn(value) === true).length;
}

function numeric(value) {
  if (value === undefined || value === null) {
    return null;
  }
  const result = Number(value);
  if (!Number.isFinite(result)) {
    throw new Error(`Expected finite numeric value, got ${value}`);
  }
  return result;
}

function delta(baseline, trial) {
  const left = numeric(baseline);
  const right = numeric(trial);
  if (left === null || right === null) {
    return null;
  }
  return Number((right - left).toPrecision(15));
}

function nonEmptyDirectory(filePath) {
  if (!filePath || !fs.existsSync(filePath)) {
    return false;
  }
  const stat = fs.statSync(filePath);
  if (!stat.isDirectory()) {
    return false;
  }
  return fs.readdirSync(filePath).length > 0;
}

function assertPacketId(source, name) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${name} packet id: ${source.packet_id}`);
  }
}

function splitRows(ledger) {
  return (ledger.rows ?? []).filter((row) => row.status === "split_required");
}

function classifySplitRows(rows) {
  const regular = rows.filter((row) => row.failure_code === REGULAR_SOURCE_COVER_CODE);
  const periodic = rows.filter((row) => row.failure_code === PERIODIC_ENDPOINT_CODE);
  const foldLayer = rows.filter((row) => row.failure_code === FOLD_LAYER_CODE || row.fold_layer_input_ref);
  const classified = new Set([...regular, ...periodic, ...foldLayer].map((row) => row.row_id));
  const unclassified = rows.filter((row) => !classified.has(row.row_id));
  return { regular, periodic, foldLayer, unclassified };
}

function rowsForReport(rows, limit = 12) {
  return rows
    .map((row) => row.row_id)
    .sort(rowSortKey)
    .slice(0, limit);
}

function buildLambdaReplayDelta(ledger, replay) {
  const baseline = ledger.summary;
  const trial = replay.ephemeral_preledger_replay?.v6 ?? {};
  const trialV4 = replay.ephemeral_preledger_replay?.v4 ?? {};
  const trialV5 = replay.ephemeral_preledger_replay?.v5 ?? {};
  const baselineV5Certified = numeric(baseline.previous_v5_receiver_cover_certified_cells);
  const baselineV5Missing = numeric(baseline.previous_v5_receiver_cover_missing_cells);
  return {
    trial_lambda: replay.trial_lambda,
    topology_recertified: replay.topology_recertification?.root_count_interval_certified === true,
    ephemeral_replay_run_directory: replay.ephemeral_preledger_replay?.run_directory
      ? "scratch preledger directory (not durable)"
      : null,
    ephemeral_replay_ledgers_still_present: nonEmptyDirectory(replay.ephemeral_preledger_replay?.run_directory),
    comparisons: {
      v4_simple_root_subrows: {
        baseline: baseline.certified_simple_root_subrows,
        trial: trialV4.certified_simple_root_subrows,
        delta: delta(baseline.certified_simple_root_subrows, trialV4.certified_simple_root_subrows),
      },
      v5_receiver_cover_certified_cells: {
        baseline: baselineV5Certified,
        trial: trialV5.receiver_cover_certified_cells,
        delta: delta(baselineV5Certified, trialV5.receiver_cover_certified_cells),
      },
      v5_receiver_cover_missing_cells: {
        baseline: baselineV5Missing,
        trial: trialV5.receiver_cover_missing_cells,
        delta: delta(baselineV5Missing, trialV5.receiver_cover_missing_cells),
      },
      v6_receiver_cover_certified_cells: {
        baseline: baseline.receiver_cover_certified_cells,
        trial: trial.receiver_cover_certified_cells,
        delta: delta(baseline.receiver_cover_certified_cells, trial.receiver_cover_certified_cells),
      },
      v6_receiver_cover_missing_cells: {
        baseline: baseline.receiver_cover_missing_cells,
        trial: trial.receiver_cover_missing_cells,
        delta: delta(baseline.receiver_cover_missing_cells, trial.receiver_cover_missing_cells),
      },
      v6_terminal_missing_coarse_cells: {
        baseline: baseline.receiver_cover_terminal_missing_coarse_cells,
        trial: trial.receiver_cover_terminal_missing_coarse_cells,
        delta: delta(baseline.receiver_cover_terminal_missing_coarse_cells, trial.receiver_cover_terminal_missing_coarse_cells),
      },
      v6_complete_receiver_cover_parent_rows: {
        baseline: baseline.receiver_cover_complete_parent_rows,
        trial: trial.receiver_cover_complete_parent_rows ?? 0,
        delta: delta(baseline.receiver_cover_complete_parent_rows, trial.receiver_cover_complete_parent_rows ?? 0),
      },
      v6_accepted_fold_layer_rows: {
        baseline: baseline.accepted_fold_layer_rows,
        trial: trial.accepted_fold_layer_rows,
        delta: delta(baseline.accepted_fold_layer_rows, trial.accepted_fold_layer_rows),
      },
      split_required_base_rows: {
        baseline: baseline.split_required_base_rows,
        trial: trial.split_required_base_rows,
        delta: delta(baseline.split_required_base_rows, trial.split_required_base_rows),
      },
      branch_chart_authorized: {
        baseline: baseline.branch_chart_authorized,
        trial: trial.branch_chart_authorized,
        delta: null,
      },
    },
    blocker_interpretation:
      "The trial improves only family-level receiver-cover leaf counts. It leaves the split-required base-row count, complete parent-row count, accepted fold-layer count, preledger pass, live-ledger update, and branch-chart authorization unchanged.",
  };
}

function buildRegularFamily(regularRows, atlas, ownership, oneLeaf) {
  const oneLeafRows = oneLeaf.rows ?? [];
  const screenedRowIds = oneLeafRows.map((row) => row.row_id).sort(rowSortKey);
  return {
    family_id: "regular_source_cover_parent_complement",
    row_count: regularRows.length,
    row_ids_sample: rowsForReport(regularRows),
    failure_code: REGULAR_SOURCE_COVER_CODE,
    source_cover_defect_atlas: {
      parent_rows: atlas.summary.parent_rows,
      failed_side_counts: atlas.summary.failed_side_counts,
      side_pattern_counts: atlas.summary.side_pattern_counts,
      terminal_missing_leaves: atlas.summary.terminal_missing_leaves,
      receiver_left_boundary_missing_leaves: atlas.summary.receiver_boundary_span_counts.receiver_left_boundary_missing_leaves,
      receiver_right_boundary_missing_leaves: atlas.summary.receiver_boundary_span_counts.receiver_right_boundary_missing_leaves,
      receiver_interior_missing_leaves: atlas.summary.receiver_boundary_span_counts.receiver_interior_missing_leaves,
      nearest_closure_rows: atlas.summary.nearest_closure_rows,
      largest_defect_rows: atlas.summary.largest_defect_rows,
    },
    ownership_audit: {
      complete_receiver_partitions: ownership.summary.complete_receiver_partitions,
      boundary_component_count: ownership.summary.boundary_component_count,
      rows_passing_boundary_ownership_rule: ownership.summary.rows_passing_boundary_ownership_rule,
      field_certification_counts: ownership.summary.field_certification_counts,
    },
    one_leaf_direct_path_screen: {
      screened_rows: screenedRowIds,
      unscreened_regular_rows: regularRows.length - screenedRowIds.length,
      active_endpoint_stable_rows: oneLeaf.summary.active_endpoint_stable_rows,
      sampled_trial_defect_opened_rows: oneLeaf.summary.sampled_trial_defect_opened_rows,
      combined_opening_gt_probe_threshold_rows: oneLeaf.summary.combined_opening_gt_probe_threshold_rows,
      proof_grade_rows: oneLeaf.summary.proof_grade_rows,
      row_screen_summaries: oneLeafRows.map((row) => ({
        row_id: row.row_id,
        failed_side: row.failed_side,
        required_strict_improvement_decimal: row.required_strict_improvement_decimal,
        trial_sampled_defect: row.trial?.sampled_defect,
        combined_boundary_opening_decimal:
          row.candidate_change_from_baseline_to_trial?.combined_boundary_opening_decimal,
        lambda_min_open_from_probe_threshold_active_endpoint_screen:
          row.active_endpoint_lambda_budget?.lambda_min_open_from_probe_threshold_active_endpoint_screen,
        trial_lambda_margin_after_min_open:
          row.active_endpoint_lambda_budget?.trial_lambda_margin_after_min_open,
        proof_grade_boundary_opening_certified: row.proof_grade_status?.proof_grade_boundary_opening_certified === true,
      })),
    },
    continuation_class:
      "mechanical interval-certificate candidate: intervalize the active-endpoint boundary-opening data and add monotonicity, memory, endpoint ownership/no-double-counting, branch-reuse exclusion, and non-owned-complement closure before any row consumption.",
    pass_status: "fail_closed_no_rows_consumed",
  };
}

function buildPeriodicFamily(periodicRows) {
  return {
    family_id: "periodic_endpoint_complement_ownership",
    row_count: periodicRows.length,
    row_ids: periodicRows.map((row) => row.row_id).sort(rowSortKey),
    failure_code: PERIODIC_ENDPOINT_CODE,
    source_intervals: [...new Set(periodicRows.map((row) => row.source_interval))].sort(),
    receiver_intervals: [...new Set(periodicRows.map((row) => row.receiver_interval))].sort(),
    ledger_counts: countBy(periodicRows, (row) => row.ledger),
    continuation_class:
      "mechanical endpoint/complement ownership certificate: prove periodic source-lift endpoint ownership or complement closure for these seam rows before branch-chart work.",
    pass_status: "fail_closed_no_rows_consumed",
  };
}

function buildFoldLayerFamily(foldRows, foldLayer) {
  const separatorCounts = Object.fromEntries(
    Object.entries(foldLayer.summary.rows_by_separator ?? {}).map(([separator, rows]) => [separator, rows.length])
  );
  const counts = Object.values(separatorCounts);
  return {
    family_id: "higher_fold_layer_certificate",
    row_count: foldRows.length,
    row_ids_sample: rowsForReport(foldRows),
    failure_code: FOLD_LAYER_CODE,
    fold_layer_atlas_rows: foldLayer.summary.fold_layer_rows,
    separator_count: foldLayer.summary.separator_count,
    rows_by_separator_count: separatorCounts,
    min_rows_per_separator: Math.min(...counts),
    max_rows_per_separator: Math.max(...counts),
    accepted_fold_layer_rows: 0,
    required_same_packet_fields: foldLayer.required_same_packet_fields,
    continuation_class:
      "mechanical fold-layer certificate: construct same-packet alpha/exit/parity/impulse or direct quadrature fields for the 12 higher-fold separator layers; these rows must not be rewritten as simple-root rows.",
    pass_status: "fail_closed_no_rows_consumed",
  };
}

function buildClassifier(inputs, paths) {
  for (const [name, source] of Object.entries(inputs)) {
    assertPacketId(source, name);
  }
  const rows = splitRows(inputs.ledger);
  const families = classifySplitRows(rows);
  if (families.unclassified.length !== 0) {
    throw new Error(`Unclassified split-required rows: ${families.unclassified.map((row) => row.row_id).join(", ")}`);
  }
  if (families.regular.length !== inputs.atlas.summary.parent_rows) {
    throw new Error("Regular row count does not match source-cover atlas parent row count.");
  }
  if (families.foldLayer.length !== inputs.foldLayer.summary.fold_layer_rows) {
    throw new Error("Fold-layer row count does not match fold-layer burden atlas.");
  }
  const lambdaDelta = buildLambdaReplayDelta(inputs.ledger, inputs.lambdaReplay);
  const familyRecords = [
    buildRegularFamily(families.regular, inputs.atlas, inputs.ownership, inputs.oneLeaf),
    buildPeriodicFamily(families.periodic),
    buildFoldLayerFamily(families.foldLayer, inputs.foldLayer),
  ];
  const summary = {
    split_required_base_rows: rows.length,
    regular_source_cover_parent_complement_rows: families.regular.length,
    periodic_endpoint_complement_rows: families.periodic.length,
    higher_fold_layer_rows: families.foldLayer.length,
    row_families: familyRecords.length,
    lambda0305_topology_recertified: lambdaDelta.topology_recertified,
    lambda0305_split_required_base_rows:
      inputs.lambdaReplay.ephemeral_preledger_replay?.v6?.split_required_base_rows,
    lambda0305_complete_receiver_cover_parent_rows:
      inputs.lambdaReplay.ephemeral_preledger_replay?.v6?.receiver_cover_complete_parent_rows ?? 0,
    lambda0305_accepted_fold_layer_rows:
      inputs.lambdaReplay.ephemeral_preledger_replay?.v6?.accepted_fold_layer_rows,
    row_consumption_count: 0,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
  };
  return {
    schema: "breather-higher-fold-preledger-row-family-classifier-v1",
    packet_id: PACKET_ID,
    status: "preledger_row_family_classifier_fail_closed_no_row_consumption",
    theorem_target: "Higher-Fold Preledger Row-Family Classifier",
    claim_level:
      "priority-only diagnostic classifier; identifies the live higher-fold proof-interval v6 blocker families and the lambda=0.305 family-level replay delta without consuming rows",
    source_artifacts: {
      ledger: artifactRecord(paths.ledger),
      source_cover_defect_atlas: artifactRecord(paths.atlas),
      source_cover_boundary_ownership_audit: artifactRecord(paths.ownership),
      one_leaf_direct_path_lambda_screen: artifactRecord(paths.oneLeaf),
      lambda0305_preledger_replay_audit: artifactRecord(paths.lambdaReplay),
      fold_layer_burden_atlas: artifactRecord(paths.foldLayer),
    },
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    summary,
    lambda0305_replay_delta: lambdaDelta,
    row_families: familyRecords,
    most_promising_non_rule_blocked_certificate_target: {
      family_id: "regular_source_cover_parent_complement",
      target:
        "one-leaf active-endpoint interval boundary-opening certificate with monotonicity, memory, ownership/no-double-counting, branch-reuse exclusion, and non-owned-complement closure",
      reason:
        "This family has exact source-cover boundary burdens for all 42 rows, complete terminal-grid receiver partitions, and 3 screened one-leaf rows with positive sampled lambda opening. It can continue mechanically by intervalizing existing geometry data; it does not require primitive proof-rule acceptance.",
      first_mechanical_handoff:
        "Make the three screened one-leaf rows durable as interval endpoint boxes and residual-function bounds, or rerun the lambda=0.305 v1-v6 replay with durable row-level ledgers before attempting row-level delta promotion.",
      still_blocked:
        "The remaining 39 regular rows have no one-leaf direct-path screen data, the 8 periodic seam rows still need endpoint/complement ownership, and the 112 fold-layer rows still need same-packet fold-layer certification.",
    },
    fail_closed_lock: {
      row_consumption_allowed: false,
      preledger_pass_allowed: false,
      live_ledger_update_allowed: false,
      branch_chart_authorization_allowed: false,
      reason:
        "No family has complete proof-grade row fields. The lambda=0.305 replay still reports 162 split-required rows, 0 complete receiver-cover parent rows, 0 accepted fold-layer rows, and no branch-chart authorization.",
    },
    capture_decision:
      "Priority-only. This classifier sharpens the live blocker into three finite row families and selects the regular source-cover one-leaf interval route as the next non-rule-blocked certificate target, but it proves no preledger row and authorizes no branch chart.",
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

function familyTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.family_id}\` | ${row.row_count} | \`${row.failure_code}\` | \`${row.pass_status}\` | ${row.continuation_class} |`
    )
    .join("\n");
}

function lambdaDeltaTable(comparisons) {
  return Object.entries(comparisons)
    .map(([label, row]) => `| \`${label}\` | ${row.baseline} | ${row.trial} | ${row.delta ?? ""} |`)
    .join("\n");
}

function oneLeafTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_strict_improvement_decimal} | ${row.trial_sampled_defect} | ${row.combined_boundary_opening_decimal} | ${row.lambda_min_open_from_probe_threshold_active_endpoint_screen} | ${row.trial_lambda_margin_after_min_open} | ${row.proof_grade_boundary_opening_certified} |`
    )
    .join("\n");
}

function separatorTable(counts) {
  return Object.entries(counts)
    .map(([separator, count]) => `| \`${separator}\` | ${count} |`)
    .join("\n");
}

function buildReport(classifier) {
  const regular = classifier.row_families.find((row) => row.family_id === "regular_source_cover_parent_complement");
  const periodic = classifier.row_families.find((row) => row.family_id === "periodic_endpoint_complement_ownership");
  const foldLayer = classifier.row_families.find((row) => row.family_id === "higher_fold_layer_certificate");
  const target = classifier.most_promising_non_rule_blocked_certificate_target;
  const lambda = classifier.lambda0305_replay_delta;
  return `# Higher-Fold Preledger Row-Family Classifier

## Verdict

Status: \`${classifier.status}\`.

This priority-only classifier reads the higher-fold proof-interval v6 ledger,
the source-cover follow-ups, the one-leaf direct-path screen, the
\`lambda=0.305\` replay audit, and the fold-layer burden atlas. It separates the
remaining ${classifier.summary.split_required_base_rows} split-required rows
into three certificate families:

- ${regular.row_count} regular source-cover parent-complement rows;
- ${periodic.row_count} periodic endpoint/complement rows;
- ${foldLayer.row_count} higher-fold layer rows.

It consumes 0 rows, keeps \`preledger_pass=false\`, keeps
\`updates_live_ledger=false\`, and leaves \`branch_chart_authorized=false\`.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${sourceTable(classifier.source_artifacts)}

## Row Families

| Family | Rows | Failure code | Status | Mechanical continuation |
| --- | ---: | --- | --- | --- |
${familyTable(classifier.row_families)}

## Lambda Replay Delta

The \`lambda=0.305\` replay is useful but non-consuming. It recertifies root
topology and improves the v6 receiver-cover leaf count by
${lambda.comparisons.v6_receiver_cover_certified_cells.delta}, but it does not
reduce the split-required base-row count, complete any receiver-cover parent
row, accept any fold-layer row, pass the preledger, update the live ledger, or
authorize a branch chart.

| Replay field | Baseline | Trial | Delta |
| --- | ---: | ---: | ---: |
${lambdaDeltaTable(lambda.comparisons)}

Ephemeral replay ledgers present at recorded run directory
\`${lambda.ephemeral_replay_run_directory}\`: ${lambda.ephemeral_replay_ledgers_still_present}.

## Regular Source-Cover Rows

The regular family is the strongest non-rule-blocked certificate target. The
source-cover atlas already converts all ${regular.row_count} regular residual
rows into exact rational boundary burdens, and the ownership audit proves
${regular.ownership_audit.complete_receiver_partitions} / ${regular.row_count}
complete terminal-grid receiver partitions. It certifies
${regular.ownership_audit.rows_passing_boundary_ownership_rule} rows against
the full ownership pass rule.

| Quantity | Value |
| --- | ---: |
| Terminal missing leaves | ${regular.source_cover_defect_atlas.terminal_missing_leaves} |
| Receiver-left boundary missing leaves | ${regular.source_cover_defect_atlas.receiver_left_boundary_missing_leaves} |
| Receiver-right boundary missing leaves | ${regular.source_cover_defect_atlas.receiver_right_boundary_missing_leaves} |
| Receiver-interior missing leaves | ${regular.source_cover_defect_atlas.receiver_interior_missing_leaves} |
| Boundary component count | ${regular.ownership_audit.boundary_component_count} |
| One-leaf screened rows | ${regular.one_leaf_direct_path_screen.screened_rows.length} |
| Unscreened regular rows | ${regular.one_leaf_direct_path_screen.unscreened_regular_rows} |
| Sampled positive one-leaf rows | ${regular.one_leaf_direct_path_screen.combined_opening_gt_probe_threshold_rows} |
| Proof-grade one-leaf rows | ${regular.one_leaf_direct_path_screen.proof_grade_rows} |

| One-leaf row | Failed side | Required improvement | Trial sampled defect | Combined opening | Lambda threshold | Trial margin | Proof-grade |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
${oneLeafTable(regular.one_leaf_direct_path_screen.row_screen_summaries)}

## Periodic Endpoint/Complement Rows

The periodic seam family has ${periodic.row_count} rows:
${periodic.row_ids.map((row) => `\`${row}\``).join(", ")}.
These rows are not source-cover atlas rows. They need a periodic
endpoint/complement ownership certificate before branch-chart work.

## Fold-Layer Rows

The fold-layer family has ${foldLayer.row_count} rows grouped over
${foldLayer.separator_count} higher-fold separator layers. It remains
non-consuming: accepted fold-layer rows are ${foldLayer.accepted_fold_layer_rows}.
These rows must become proof-grade fold-layer rows; they must not be rewritten
as simple-root rows.

| Separator | Rows |
| --- | ---: |
${separatorTable(foldLayer.rows_by_separator_count)}

## Certificate-Side Handoff

Most promising non-rule-blocked target: \`${target.family_id}\`.

Target: ${target.target}.

Reason: ${target.reason}

First mechanical handoff: ${target.first_mechanical_handoff}

Still blocked: ${target.still_blocked}

## Capture Decision

${classifier.capture_decision}
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const inputs = {
    ledger: readJson(args.ledger),
    atlas: readJson(args.atlas),
    ownership: readJson(args.ownership),
    oneLeaf: readJson(args.oneLeaf),
    lambdaReplay: readJson(args.lambdaReplay),
    foldLayer: readJson(args.foldLayer),
  };
  const classifier = buildClassifier(inputs, args);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, classifier, args.pretty);
  writeText(outReport, buildReport(classifier));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();

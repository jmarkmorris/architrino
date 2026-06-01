#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_FOLD_INPUT = `${CERT_DIR}/gap_opening_fresh_v10_fold_coordinate_collocation_input.nonlinear-v0.json`;
const DEFAULT_FOLD_RESULT = `${CERT_DIR}/gap_opening_fresh_v10_fold_coordinate_collocation_result.nonlinear-v0.json`;
const DEFAULT_THEOREM_ATTEMPT = `${CERT_DIR}/one_leaf_fold_coordinate_collocation_candidate_change_theorem_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_PROMOTION_AUDIT = `${CERT_DIR}/fold_coordinate_candidate_promotion_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_DIRECT_PATH_PHI = `${CERT_DIR}/phi_cyc.${PACKET_ID}.lambda0305.json`;
const DEFAULT_DIRECT_PATH_MESH = `${CERT_DIR}/mesh.${PACKET_ID}.lambda0305.json`;
const DEFAULT_DIRECT_PATH_INPUT_SCREEN = `${CERT_DIR}/causal_preledger_input_screen.${PACKET_ID}.lambda0305.json`;
const DEFAULT_DIRECT_PATH_ROOT_CERT = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_interval_certificate.lambda0305.v0.json`;
const DEFAULT_DIRECT_PATH_REPLAY = `${CERT_DIR}/lambda0305_preledger_replay_audit.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_EXPECTED_PHI = `${CERT_DIR}/phi_cyc.${PACKET_ID}.fold-coordinate-candidate.nonlinear-v0.json`;
const DEFAULT_EXPECTED_MESH = `${CERT_DIR}/mesh.${PACKET_ID}.fold-coordinate-candidate.nonlinear-v0.json`;
const DEFAULT_EXPECTED_INPUT_SCREEN = `${CERT_DIR}/causal_preledger_input_screen.${PACKET_ID}.fold-coordinate-candidate.nonlinear-v0.json`;
const DEFAULT_EXPECTED_ROOT_CERT = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_interval_certificate.fold-coordinate-candidate.nonlinear-v0.v0.json`;
const DEFAULT_EXPECTED_PRELEDGER_REPLAY = `${CERT_DIR}/fold_coordinate_candidate_preledger_replay_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_candidate_materialization_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_candidate_materialization_audit_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const REALIZATION_FIELDS = [
  "same_packet_history_update_formula",
  "theta_support",
  "x_update_basis",
  "xdot_update_basis",
  "mesh_update_rule",
  "endpoint_motion_rule",
  "source_monotonicity_rule",
  "receiver_monotonicity_rule",
];

const ROW_FIELDS = [
  "screen_positive_candidate_change_row",
  "fold_coordinate_variables_present",
  "fold_coordinate_variables_have_history_realization",
  "same_packet_phi_cyc_materialized",
  "same_packet_mesh_materialized",
  "same_packet_preledger_input_screen_materialized",
  "candidate_root_topology_certificate_present",
  "candidate_preledger_replay_present",
  "direct_path_artifacts_reusable_for_fold_coordinate_candidate",
  "materialization_ready_row",
  "row_consumed",
  "branch_chart_authorized",
];

function parseArgs(argv) {
  const args = {
    foldInput: DEFAULT_FOLD_INPUT,
    foldResult: DEFAULT_FOLD_RESULT,
    theoremAttempt: DEFAULT_THEOREM_ATTEMPT,
    promotionAudit: DEFAULT_PROMOTION_AUDIT,
    directPathPhi: DEFAULT_DIRECT_PATH_PHI,
    directPathMesh: DEFAULT_DIRECT_PATH_MESH,
    directPathInputScreen: DEFAULT_DIRECT_PATH_INPUT_SCREEN,
    directPathRootCert: DEFAULT_DIRECT_PATH_ROOT_CERT,
    directPathReplay: DEFAULT_DIRECT_PATH_REPLAY,
    expectedPhi: DEFAULT_EXPECTED_PHI,
    expectedMesh: DEFAULT_EXPECTED_MESH,
    expectedInputScreen: DEFAULT_EXPECTED_INPUT_SCREEN,
    expectedRootCert: DEFAULT_EXPECTED_ROOT_CERT,
    expectedPreledgerReplay: DEFAULT_EXPECTED_PRELEDGER_REPLAY,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--fold-input") {
      args.foldInput = argv[++index];
    } else if (arg === "--fold-result") {
      args.foldResult = argv[++index];
    } else if (arg === "--theorem-attempt") {
      args.theoremAttempt = argv[++index];
    } else if (arg === "--promotion-audit") {
      args.promotionAudit = argv[++index];
    } else if (arg === "--direct-path-phi") {
      args.directPathPhi = argv[++index];
    } else if (arg === "--direct-path-mesh") {
      args.directPathMesh = argv[++index];
    } else if (arg === "--direct-path-input-screen") {
      args.directPathInputScreen = argv[++index];
    } else if (arg === "--direct-path-root-cert") {
      args.directPathRootCert = argv[++index];
    } else if (arg === "--direct-path-replay") {
      args.directPathReplay = argv[++index];
    } else if (arg === "--expected-phi") {
      args.expectedPhi = argv[++index];
    } else if (arg === "--expected-mesh") {
      args.expectedMesh = argv[++index];
    } else if (arg === "--expected-input-screen") {
      args.expectedInputScreen = argv[++index];
    } else if (arg === "--expected-root-cert") {
      args.expectedRootCert = argv[++index];
    } else if (arg === "--expected-preledger-replay") {
      args.expectedPreledgerReplay = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-candidate-materialization-audit.mjs [options]

Options:
  --fold-input PATH                 Fold-coordinate collocation input JSON. Defaults to ${DEFAULT_FOLD_INPUT}.
  --fold-result PATH                Fold-coordinate collocation result JSON. Defaults to ${DEFAULT_FOLD_RESULT}.
  --theorem-attempt PATH            One-leaf theorem-attempt JSON. Defaults to ${DEFAULT_THEOREM_ATTEMPT}.
  --promotion-audit PATH            Promotion audit JSON. Defaults to ${DEFAULT_PROMOTION_AUDIT}.
  --direct-path-phi PATH            Direct-path lambda phi_cyc contrast. Defaults to ${DEFAULT_DIRECT_PATH_PHI}.
  --direct-path-mesh PATH           Direct-path lambda mesh contrast. Defaults to ${DEFAULT_DIRECT_PATH_MESH}.
  --direct-path-input-screen PATH   Direct-path lambda input screen contrast. Defaults to ${DEFAULT_DIRECT_PATH_INPUT_SCREEN}.
  --direct-path-root-cert PATH      Direct-path lambda root certificate contrast. Defaults to ${DEFAULT_DIRECT_PATH_ROOT_CERT}.
  --direct-path-replay PATH         Direct-path lambda preledger replay contrast. Defaults to ${DEFAULT_DIRECT_PATH_REPLAY}.
  --expected-phi PATH               Expected fold-coordinate candidate phi_cyc file. Defaults to ${DEFAULT_EXPECTED_PHI}.
  --expected-mesh PATH              Expected fold-coordinate candidate mesh file. Defaults to ${DEFAULT_EXPECTED_MESH}.
  --expected-input-screen PATH      Expected fold-coordinate input screen file. Defaults to ${DEFAULT_EXPECTED_INPUT_SCREEN}.
  --expected-root-cert PATH         Expected fold-coordinate root certificate. Defaults to ${DEFAULT_EXPECTED_ROOT_CERT}.
  --expected-preledger-replay PATH  Expected fold-coordinate preledger replay audit. Defaults to ${DEFAULT_EXPECTED_PRELEDGER_REPLAY}.
  --out-dir PATH                    Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                          Pretty-print JSON artifact.
  --help                            Show this help.`);
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

function fieldCounts(rows) {
  return Object.fromEntries(
    ROW_FIELDS.map((field) => [field, rows.filter((row) => row.required_fields_present[field] === true).length])
  );
}

function assertInputs(foldInput, foldResult, theoremAttempt, promotionAudit) {
  if (foldInput.packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected fold-coordinate input packet id: ${foldInput.packet_id}`);
  }
  if (foldResult.packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected fold-coordinate result packet id: ${foldResult.packet_id}`);
  }
  if (theoremAttempt.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected theorem-attempt packet id: ${theoremAttempt.packet_id}`);
  }
  if (promotionAudit.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected promotion-audit packet id: ${promotionAudit.packet_id}`);
  }
  if (foldResult.status !== "feasible") {
    throw new Error(`Expected feasible fold-coordinate result, got ${foldResult.status}`);
  }
  if (!Array.isArray(theoremAttempt.rows) || theoremAttempt.rows.length !== 3) {
    throw new Error("Expected exactly 3 one-leaf theorem-attempt rows.");
  }
  if (
    theoremAttempt.branch_chart_authorized !== false ||
    theoremAttempt.preledger_pass !== false ||
    theoremAttempt.updates_live_ledger !== false
  ) {
    throw new Error("Refusing to audit materialization from an authorized theorem attempt.");
  }
  if (promotionAudit.status !== "fold_coordinate_candidate_promotion_audit_fail_closed") {
    throw new Error(`Unexpected promotion-audit status: ${promotionAudit.status}`);
  }
}

function foldVariables(foldInput) {
  return (foldInput.variables ?? []).filter((variable) => variable.collocation_role === "fold_coordinate_boundary_opening");
}

function variableRealization(variable) {
  const presentFields = REALIZATION_FIELDS.filter((field) => variable[field] !== undefined && variable[field] !== null);
  return {
    id: variable.id,
    source_symbol: variable.source_symbol,
    collocation_role: variable.collocation_role,
    present_realization_fields: presentFields,
    missing_realization_fields: REALIZATION_FIELDS.filter((field) => !presentFields.includes(field)),
    has_history_realization: REALIZATION_FIELDS.every((field) => presentFields.includes(field)),
  };
}

function rowById(rows, rowId) {
  const row = rows.find((candidate) => candidate.row_id === rowId);
  if (!row) {
    throw new Error(`Missing theorem-attempt row ${rowId}`);
  }
  return row;
}

function buildRowAudit(row, promotionRow, variableMap, expectedArtifacts) {
  const sourceVariable = row.fold_coordinate_screen_variables.source_shift_variable;
  const receiverVariable = row.fold_coordinate_screen_variables.receiver_shift_variable;
  const sourceRealization = variableMap.get(sourceVariable);
  const receiverRealization = variableMap.get(receiverVariable);
  const variablesPresent = Boolean(sourceRealization && receiverRealization);
  const variablesRealized =
    variablesPresent && sourceRealization.has_history_realization === true && receiverRealization.has_history_realization === true;
  const fields = {
    screen_positive_candidate_change_row: promotionRow.required_fields_present.screen_positive_candidate_change_row === true,
    fold_coordinate_variables_present: variablesPresent,
    fold_coordinate_variables_have_history_realization: variablesRealized,
    same_packet_phi_cyc_materialized: expectedArtifacts.expected_phi_cyc.present,
    same_packet_mesh_materialized: expectedArtifacts.expected_mesh.present,
    same_packet_preledger_input_screen_materialized: expectedArtifacts.expected_preledger_input_screen.present,
    candidate_root_topology_certificate_present: expectedArtifacts.expected_root_topology_certificate.present,
    candidate_preledger_replay_present: expectedArtifacts.expected_preledger_replay.present,
    direct_path_artifacts_reusable_for_fold_coordinate_candidate: false,
    materialization_ready_row: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.materialization_ready_row =
    fields.screen_positive_candidate_change_row &&
    fields.fold_coordinate_variables_present &&
    fields.fold_coordinate_variables_have_history_realization &&
    fields.same_packet_phi_cyc_materialized &&
    fields.same_packet_mesh_materialized &&
    fields.same_packet_preledger_input_screen_materialized &&
    fields.candidate_root_topology_certificate_present &&
    fields.candidate_preledger_replay_present;
  return {
    row_id: row.row_id,
    cover_id: row.cover_id,
    ledger: row.ledger,
    receiver_interval: row.receiver_interval,
    source_interval: row.source_interval,
    failed_side: row.failed_side,
    boundary_side: row.boundary_side,
    proposed_fold_coordinate_assignment: row.fold_coordinate_screen_variables,
    source_realization: sourceRealization,
    receiver_realization: receiverRealization,
    required_fields_present: fields,
    materialization_pass_rule_satisfied: fields.materialization_ready_row,
    row_consumed: false,
    branch_chart_authorized: false,
    materialization_blocker:
      "The row has positive fold-coordinate boundary-opening screen data, but the source and receiver fold-coordinate variables are not realized as same-packet history update formulas and the candidate-specific phi/mesh/topology/preledger artifacts are absent.",
  };
}

function buildAudit(inputs, sources) {
  const { foldInput, foldResult, theoremAttempt, promotionAudit } = inputs;
  assertInputs(foldInput, foldResult, theoremAttempt, promotionAudit);
  const expectedArtifacts = {
    expected_phi_cyc: artifactRecord(sources.expectedPhi),
    expected_mesh: artifactRecord(sources.expectedMesh),
    expected_preledger_input_screen: artifactRecord(sources.expectedInputScreen),
    expected_root_topology_certificate: artifactRecord(sources.expectedRootCert),
    expected_preledger_replay: artifactRecord(sources.expectedPreledgerReplay),
  };
  const directPathArtifacts = {
    lambda0305_phi_cyc: artifactRecord(sources.directPathPhi),
    lambda0305_mesh: artifactRecord(sources.directPathMesh),
    lambda0305_preledger_input_screen: artifactRecord(sources.directPathInputScreen),
    lambda0305_root_topology_certificate: artifactRecord(sources.directPathRootCert),
    lambda0305_preledger_replay: artifactRecord(sources.directPathReplay),
  };
  const variableAudits = foldVariables(foldInput).map(variableRealization);
  const variableMap = new Map(variableAudits.map((variable) => [variable.id, variable]));
  const rows = theoremAttempt.rows.map((row) =>
    buildRowAudit(row, rowById(promotionAudit.rows, row.row_id), variableMap, expectedArtifacts)
  );
  const counts = fieldCounts(rows);
  return {
    schema: "breather-higher-fold-fold-coordinate-candidate-materialization-audit-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: "fold_coordinate_candidate_materialization_audit_fail_closed",
    theorem_target: "Fold-Coordinate Candidate History Materialization Audit",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only materialization audit; positive fold-coordinate boundary-opening variables are not same-packet history update data",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      row_consumption_count: 0,
    },
    source_fold_coordinate_input: path.basename(sources.foldInput),
    source_fold_coordinate_input_sha256: sha256File(sources.foldInput),
    source_fold_coordinate_result: path.basename(sources.foldResult),
    source_fold_coordinate_result_sha256: sha256File(sources.foldResult),
    source_theorem_attempt: path.basename(sources.theoremAttempt),
    source_theorem_attempt_sha256: sha256File(sources.theoremAttempt),
    source_promotion_audit: path.basename(sources.promotionAudit),
    source_promotion_audit_sha256: sha256File(sources.promotionAudit),
    materialization_rule:
      "A fold-coordinate screen witness may write same-packet phi_cyc/mesh only after each fold-coordinate boundary-opening variable is realized as a history update rule with theta support, X and xdot update bases, mesh update rule, endpoint motion rule, and source/receiver monotonicity rules.",
    fold_coordinate_surface_limits: {
      claims_live_candidate: foldInput.claim_limits?.claims_live_candidate === true,
      claims_preledger_pass: foldInput.claim_limits?.claims_preledger_pass === true,
      claims_branch_chart_authorization: foldInput.claim_limits?.claims_branch_chart_authorization === true,
      basis_model: foldInput.packet_identity?.basis_model ?? null,
      matrix_status: foldInput.packet_identity?.matrix_status ?? null,
      fold_coordinate_source: foldInput.packet_identity?.fold_coordinate_source ?? null,
      nonlinear_collocation_surface: foldInput.basis_definition?.nonlinear_collocation_surface ?? null,
    },
    expected_candidate_artifacts: expectedArtifacts,
    direct_path_contrast_artifacts: directPathArtifacts,
    direct_path_contrast: {
      all_expected_direct_path_artifacts_present: Object.values(directPathArtifacts).every((artifact) => artifact.present),
      reusable_for_fold_coordinate_candidate: false,
      reason:
        "The lambda=0.305 files materialize the shifted-separator direct-path seed. They do not contain fold-coordinate history update formulas for the boundary-opening variables.",
    },
    fold_coordinate_variable_audit: variableAudits,
    summary: {
      materialization_rows: rows.length,
      screen_positive_rows: counts.screen_positive_candidate_change_row,
      fold_coordinate_boundary_opening_columns: variableAudits.length,
      variables_with_history_realization: variableAudits.filter((variable) => variable.has_history_realization).length,
      variables_missing_history_realization: variableAudits.filter((variable) => !variable.has_history_realization).length,
      candidate_artifacts_present: Object.values(expectedArtifacts).filter((artifact) => artifact.present).length,
      candidate_artifact_count: Object.values(expectedArtifacts).length,
      rows_with_variables_present: counts.fold_coordinate_variables_present,
      rows_with_variables_realized_as_history: counts.fold_coordinate_variables_have_history_realization,
      rows_with_phi_cyc_materialized: counts.same_packet_phi_cyc_materialized,
      rows_with_mesh_materialized: counts.same_packet_mesh_materialized,
      rows_with_preledger_input_screen_materialized: counts.same_packet_preledger_input_screen_materialized,
      root_topology_certificate_rows: counts.candidate_root_topology_certificate_present,
      preledger_replay_rows: counts.candidate_preledger_replay_present,
      materialization_ready_rows: counts.materialization_ready_row,
      row_consumption_count: 0,
      required_fields_certified_counts: counts,
    },
    rows,
  };
}

function artifactTable(artifacts) {
  return Object.entries(artifacts)
    .map(([name, artifact]) => `| \`${name}\` | \`${artifact.basename}\` | ${artifact.present} |`)
    .join("\n");
}

function variableTable(variables) {
  return variables
    .map(
      (variable) =>
        `| \`${variable.id}\` | \`${variable.source_symbol}\` | ${variable.present_realization_fields.length} / ${REALIZATION_FIELDS.length} | ${variable.has_history_realization} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | \`${row.proposed_fold_coordinate_assignment.source_shift_variable}\` | \`${row.proposed_fold_coordinate_assignment.receiver_shift_variable}\` | ${row.required_fields_present.screen_positive_candidate_change_row} | ${row.required_fields_present.fold_coordinate_variables_have_history_realization} | ${row.required_fields_present.same_packet_phi_cyc_materialized} | ${row.required_fields_present.candidate_root_topology_certificate_present} | ${row.materialization_pass_rule_satisfied} |`
    )
    .join("\n");
}

function fieldTable(audit) {
  return ROW_FIELDS.map(
    (field) =>
      `| \`${field}\` | ${audit.summary.required_fields_certified_counts[field]} / ${audit.summary.materialization_rows} |`
  ).join("\n");
}

function buildReport(audit) {
  return `# Higher-Fold Fold-Coordinate Candidate Materialization Audit

## Verdict

The fold-coordinate candidate history materialization attempt fail-closes before
writing candidate \`phi_cyc\`, \`mesh\`, or preledger-input files. The inherited
screen remains positive for all ${audit.summary.materialization_rows} one-leaf
rows, but the fold-coordinate columns are boundary-opening variables rather
than same-packet history update formulas.

| Quantity | Value |
| --- | ---: |
| Materialization rows | ${audit.summary.materialization_rows} |
| Screen-positive rows | ${audit.summary.screen_positive_rows} |
| Fold-coordinate boundary-opening columns | ${audit.summary.fold_coordinate_boundary_opening_columns} |
| Variables with history realization | ${audit.summary.variables_with_history_realization} |
| Variables missing history realization | ${audit.summary.variables_missing_history_realization} |
| Candidate artifacts present | ${audit.summary.candidate_artifacts_present} / ${audit.summary.candidate_artifact_count} |
| Rows with variables present | ${audit.summary.rows_with_variables_present} |
| Rows with variables realized as history | ${audit.summary.rows_with_variables_realized_as_history} |
| Rows with \`phi_cyc\` materialized | ${audit.summary.rows_with_phi_cyc_materialized} |
| Rows with \`mesh\` materialized | ${audit.summary.rows_with_mesh_materialized} |
| Rows with preledger input screen materialized | ${audit.summary.rows_with_preledger_input_screen_materialized} |
| Root-topology certificate rows | ${audit.summary.root_topology_certificate_rows} |
| Preledger replay rows | ${audit.summary.preledger_replay_rows} |
| Materialization-ready rows | ${audit.summary.materialization_ready_rows} |
| Row consumption count | ${audit.summary.row_consumption_count} |

## Fold-Coordinate Variable Audit

| Variable | Source symbol | Realization fields present | History realization |
| --- | --- | ---: | --- |
${variableTable(audit.fold_coordinate_variable_audit)}

Required realization fields are:
\`${REALIZATION_FIELDS.join("`, `")}\`.

## Expected Candidate Artifacts

| Artifact | Expected file | Present |
| --- | --- | --- |
${artifactTable(audit.expected_candidate_artifacts)}

## Direct-Path Contrast

| Artifact | File | Present |
| --- | --- | --- |
${artifactTable(audit.direct_path_contrast_artifacts)}

The direct-path artifacts are not reusable for this candidate because they
materialize the \`lambda=0.305\` shifted-separator seed, not a fold-coordinate
history update for the boundary-opening variables.

## Row Audit

| Row | Failed side | Source variable | Receiver variable | Screen positive | Variables realized | \`phi_cyc\` present | Root cert present | Materialization pass |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
${rowTable(audit.rows)}

## Required-Field Audit

| Field | Rows certified |
| --- | ---: |
${fieldTable(audit)}

## Closure Burden

The next mathematical object is a fold-coordinate realization theorem or
generator extension. It must state how
\`fc_sigma_source_lower\`, \`fc_rho_receiver_lower\`,
\`fc_sigma_source_upper\`, and \`fc_rho_receiver_upper\` become a finite
same-packet update of the candidate history and mesh. Only after that rule
exists can the topology certificate and proof-interval preledger be rerun for a
fold-coordinate candidate.

## Capture Decision

Priority-only materialization audit. This packet should not be promoted into
authored AAA prose because it is diagnostic and fail-closed. It does sharpen the
current blocker from "candidate artifacts absent" to the exact missing
mathematical object: a history-realization rule for the fold-coordinate
boundary-opening variables.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const audit = buildAudit(
    {
      foldInput: readJson(args.foldInput),
      foldResult: readJson(args.foldResult),
      theoremAttempt: readJson(args.theoremAttempt),
      promotionAudit: readJson(args.promotionAudit),
    },
    {
      foldInput: args.foldInput,
      foldResult: args.foldResult,
      theoremAttempt: args.theoremAttempt,
      promotionAudit: args.promotionAudit,
      directPathPhi: args.directPathPhi,
      directPathMesh: args.directPathMesh,
      directPathInputScreen: args.directPathInputScreen,
      directPathRootCert: args.directPathRootCert,
      directPathReplay: args.directPathReplay,
      expectedPhi: args.expectedPhi,
      expectedMesh: args.expectedMesh,
      expectedInputScreen: args.expectedInputScreen,
      expectedRootCert: args.expectedRootCert,
      expectedPreledgerReplay: args.expectedPreledgerReplay,
    }
  );
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, audit, args.pretty);
  writeText(outReport, buildReport(audit));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();

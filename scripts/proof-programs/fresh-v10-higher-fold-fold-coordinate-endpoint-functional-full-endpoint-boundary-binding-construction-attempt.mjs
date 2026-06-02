#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CONTRACT_TARGET = `${CERT_DIR}/fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_contract_target.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_construction_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const FULL_BINDING_REQUIRED_FIELDS = [
  "endpoint_boundary_binding_constructed",
  "endpoint_value_bound_to_boundary_binding",
  "binding_contract_satisfied",
  "same_packet_history_update_formula_present",
  "endpoint_motion_rule_constructed",
  "endpoint_evaluation_map_constructed",
  "full_endpoint_evaluation_map_constructed",
  "non_target_endpoint_zero_certified",
  "exact_screen_zero_certified",
  "rank_certified",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
];

const ENDPOINT_FIELDS = [
  "target_endpoint_boundary_binding_object_constructed",
  "target_boundary_binding_object_has_domain_chart",
  "target_boundary_binding_object_has_basis_formula",
  "target_boundary_binding_object_has_boundary_action",
  "target_boundary_binding_object_has_signed_delta",
  "target_boundary_binding_object_has_endpoint_refs",
  "target_boundary_binding_object_has_endpoint_values",
  "target_action_exact_under_target_boundary_binding_object",
  "full_endpoint_boundary_binding_contract_target_declared",
  "full_endpoint_boundary_binding_symbol_declared",
  "endpoint_value_binding_target_declared",
  "binding_contract_target_declared",
  "non_target_zero_target_declared",
  "exact_screen_zero_target_declared",
  "rank_target_declared",
  "history_update_target_declared",
  "endpoint_motion_target_declared",
  "endpoint_evaluation_target_declared",
  "candidate_artifact_replay_target_declared",
  "full_endpoint_boundary_binding_construction_input_ready",
  "full_endpoint_boundary_binding_constructed",
  ...FULL_BINDING_REQUIRED_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_target_endpoint_boundary_binding_object_constructed",
  "receiver_target_endpoint_boundary_binding_object_constructed",
  "combined_target_boundary_binding_object_pair_constructed",
  "source_full_boundary_binding_contract_target_declared",
  "receiver_full_boundary_binding_contract_target_declared",
  "combined_full_boundary_binding_contract_target_pair_declared",
  "full_boundary_binding_pair_construction_input_ready",
  "source_endpoint_boundary_binding_constructed",
  "receiver_endpoint_boundary_binding_constructed",
  "combined_boundary_binding_pair_constructed",
  "source_endpoint_value_bound_to_boundary_binding",
  "receiver_endpoint_value_bound_to_boundary_binding",
  "combined_binding_contract_pair_satisfied",
  "source_endpoint_motion_rule_constructed",
  "receiver_endpoint_motion_rule_constructed",
  "combined_endpoint_evaluation_map_pair_constructed",
  "proof_grade_boundary_opening_certified",
  "residual_data_construction_ready",
  "row_consumed",
  "branch_chart_authorized",
];

const CONSTRUCTION_METHODS = [
  {
    method_id: "contract_target_input_ready",
    description:
      "Check whether the full endpoint boundary-binding contract target and all named target obligations are declared.",
    required_fields: [
      "full_endpoint_boundary_binding_contract_target_declared",
      "endpoint_value_binding_target_declared",
      "binding_contract_target_declared",
      "non_target_zero_target_declared",
      "exact_screen_zero_target_declared",
      "rank_target_declared",
      "history_update_target_declared",
      "endpoint_motion_target_declared",
      "endpoint_evaluation_target_declared",
      "candidate_artifact_replay_target_declared",
    ],
  },
  {
    method_id: "contract_target_as_full_endpoint_boundary_binding",
    description:
      "Test whether the declared contract target already supplies the proof-grade full endpoint boundary binding.",
    required_fields: [
      "full_endpoint_boundary_binding_contract_target_declared",
      "endpoint_boundary_binding_constructed",
      "endpoint_value_bound_to_boundary_binding",
      "binding_contract_satisfied",
      "non_target_endpoint_zero_certified",
      "exact_screen_zero_certified",
      "rank_certified",
    ],
  },
  {
    method_id: "contract_target_as_motion_evaluation_replay",
    description:
      "Test whether the declared contract target already supplies history update, endpoint motion/evaluation, artifacts, topology, and replay.",
    required_fields: [
      "full_endpoint_boundary_binding_contract_target_declared",
      "same_packet_history_update_formula_present",
      "endpoint_motion_rule_constructed",
      "endpoint_evaluation_map_constructed",
      "full_endpoint_evaluation_map_constructed",
      "candidate_artifacts_present",
      "root_topology_recertified_for_candidate_change",
      "proof_interval_v1_v6_rerun_for_candidate_change",
    ],
  },
];

function parseArgs(argv) {
  const args = {
    contractTarget: DEFAULT_CONTRACT_TARGET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--contract-target") {
      args.contractTarget = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-full-endpoint-boundary-binding-construction-attempt.mjs [options]

Options:
  --contract-target PATH Full endpoint boundary-binding contract target JSON. Defaults to ${DEFAULT_CONTRACT_TARGET}.
  --out-dir PATH         Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty               Pretty-print JSON artifact.
  --help                 Show this help.`);
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

function countTrue(rows, getter) {
  return rows.filter((row) => getter(row) === true).length;
}

function idMap(rows, label) {
  const map = new Map();
  for (const row of rows) {
    if (map.has(row.id)) {
      throw new Error(`Duplicate ${label} id: ${row.id}`);
    }
    map.set(row.id, row);
  }
  return map;
}

function requireEndpoint(map, id, label) {
  const value = map.get(id);
  if (!value) {
    throw new Error(`Missing ${label} endpoint: ${id}`);
  }
  return value;
}

function assertInput(source) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected contract target packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected contract target fold-coordinate packet id: ${source.fold_coordinate_packet_id}`);
  }
  if (
    source.status !==
    "priority-only-full-endpoint-boundary-binding-contract-target-input-ready-object-layer-present-full-binding-motion-evaluation-replay-blocked"
  ) {
    throw new Error(`Unexpected contract target status: ${source.status}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger) {
    throw new Error("Refusing full binding construction attempt from authorized source packet.");
  }
}

function methodResult(method, fields) {
  const missingFields = method.required_fields.filter((field) => fields[field] !== true);
  return {
    method_id: method.method_id,
    description: method.description,
    required_fields: method.required_fields,
    missing_fields: missingFields,
    failure_codes: missingFields.map((field) => `missing_full_endpoint_boundary_binding_construction_${field}`),
    passed: missingFields.length === 0,
  };
}

function endpointFields(endpoint) {
  const sourceFields = endpoint.required_fields_present;
  const inputReady =
    sourceFields.full_endpoint_boundary_binding_contract_target_declared === true &&
    sourceFields.endpoint_value_binding_target_declared === true &&
    sourceFields.binding_contract_target_declared === true &&
    sourceFields.endpoint_motion_target_declared === true &&
    sourceFields.endpoint_evaluation_target_declared === true;
  return {
    target_endpoint_boundary_binding_object_constructed:
      sourceFields.target_endpoint_boundary_binding_object_constructed === true,
    target_boundary_binding_object_has_domain_chart:
      sourceFields.target_boundary_binding_object_has_domain_chart === true,
    target_boundary_binding_object_has_basis_formula:
      sourceFields.target_boundary_binding_object_has_basis_formula === true,
    target_boundary_binding_object_has_boundary_action:
      sourceFields.target_boundary_binding_object_has_boundary_action === true,
    target_boundary_binding_object_has_signed_delta:
      sourceFields.target_boundary_binding_object_has_signed_delta === true,
    target_boundary_binding_object_has_endpoint_refs:
      sourceFields.target_boundary_binding_object_has_endpoint_refs === true,
    target_boundary_binding_object_has_endpoint_values:
      sourceFields.target_boundary_binding_object_has_endpoint_values === true,
    target_action_exact_under_target_boundary_binding_object:
      sourceFields.target_action_exact_under_target_boundary_binding_object === true,
    full_endpoint_boundary_binding_contract_target_declared:
      sourceFields.full_endpoint_boundary_binding_contract_target_declared === true,
    full_endpoint_boundary_binding_symbol_declared:
      sourceFields.full_endpoint_boundary_binding_symbol_declared === true,
    endpoint_value_binding_target_declared:
      sourceFields.endpoint_value_binding_target_declared === true,
    binding_contract_target_declared:
      sourceFields.binding_contract_target_declared === true,
    non_target_zero_target_declared:
      sourceFields.non_target_zero_target_declared === true,
    exact_screen_zero_target_declared:
      sourceFields.exact_screen_zero_target_declared === true,
    rank_target_declared: sourceFields.rank_target_declared === true,
    history_update_target_declared:
      sourceFields.history_update_target_declared === true,
    endpoint_motion_target_declared:
      sourceFields.endpoint_motion_target_declared === true,
    endpoint_evaluation_target_declared:
      sourceFields.endpoint_evaluation_target_declared === true,
    candidate_artifact_replay_target_declared:
      sourceFields.candidate_artifact_replay_target_declared === true,
    full_endpoint_boundary_binding_construction_input_ready: inputReady,
    full_endpoint_boundary_binding_constructed: false,
    endpoint_boundary_binding_constructed: false,
    endpoint_value_bound_to_boundary_binding: false,
    binding_contract_satisfied: false,
    same_packet_history_update_formula_present: false,
    endpoint_motion_rule_constructed: false,
    endpoint_evaluation_map_constructed: false,
    full_endpoint_evaluation_map_constructed: false,
    non_target_endpoint_zero_certified: false,
    exact_screen_zero_certified: false,
    rank_certified: false,
    candidate_artifacts_present: false,
    root_topology_recertified_for_candidate_change: false,
    proof_interval_v1_v6_rerun_for_candidate_change: false,
  };
}

function buildEndpointAttempt(endpoint) {
  const fields = endpointFields(endpoint);
  const methodResults = CONSTRUCTION_METHODS.map((method) => methodResult(method, fields));
  const missingFields = FULL_BINDING_REQUIRED_FIELDS.filter((field) => fields[field] !== true);
  return {
    id: endpoint.id,
    endpoint_functional_id: endpoint.endpoint_functional_id,
    role: endpoint.role,
    basis_symbol: endpoint.basis_symbol,
    source_symbol: endpoint.source_symbol,
    row_uses: endpoint.row_uses,
    target_equation: endpoint.target_equation,
    target_action: endpoint.target_action,
    target_sign: endpoint.target_sign,
    domain_symbol: endpoint.domain_symbol,
    chart_symbol: endpoint.chart_symbol,
    evaluation_map_symbol: endpoint.evaluation_map_symbol,
    source_contract_target_id: endpoint.full_endpoint_boundary_binding_contract_target.target_id,
    source_binding_symbol: endpoint.full_endpoint_boundary_binding_contract_target.binding_symbol,
    required_fields_present: fields,
    construction_method_results: methodResults,
    input_ready_methods_passed: methodResults.filter((method) => method.passed).map((method) => method.method_id),
    full_endpoint_boundary_binding_constructed: false,
    full_binding_required_fields: FULL_BINDING_REQUIRED_FIELDS,
    missing_full_binding_fields: missingFields,
    failure_codes: missingFields.map((field) => `full_endpoint_boundary_binding_construction_retains_blocker_${field}`),
    obstruction:
      "The contract target is input-ready, but it is not a construction. No full endpoint boundary binding, endpoint value binding, satisfied binding contract, history update, endpoint motion/evaluation, non-target zero, exact screen zero, rank, artifact, topology, or replay field is supplied.",
  };
}

function buildRowAttempt(row, endpointAttempts) {
  const endpointById = idMap(endpointAttempts, "full endpoint boundary-binding construction attempt");
  const sourceEndpoint = requireEndpoint(endpointById, row.source_variable, "source full binding attempt");
  const receiverEndpoint = requireEndpoint(endpointById, row.receiver_variable, "receiver full binding attempt");
  const rowFields = row.required_fields_present;
  const inputReady =
    rowFields.combined_full_boundary_binding_contract_target_pair_declared === true &&
    sourceEndpoint.required_fields_present.full_endpoint_boundary_binding_construction_input_ready === true &&
    receiverEndpoint.required_fields_present.full_endpoint_boundary_binding_construction_input_ready === true;
  const fields = {
    row_locator_resolved: rowFields.row_locator_resolved === true,
    source_target_endpoint_boundary_binding_object_constructed:
      rowFields.source_target_endpoint_boundary_binding_object_constructed === true,
    receiver_target_endpoint_boundary_binding_object_constructed:
      rowFields.receiver_target_endpoint_boundary_binding_object_constructed === true,
    combined_target_boundary_binding_object_pair_constructed:
      rowFields.combined_target_boundary_binding_object_pair_constructed === true,
    source_full_boundary_binding_contract_target_declared:
      rowFields.source_full_boundary_binding_contract_target_declared === true,
    receiver_full_boundary_binding_contract_target_declared:
      rowFields.receiver_full_boundary_binding_contract_target_declared === true,
    combined_full_boundary_binding_contract_target_pair_declared:
      rowFields.combined_full_boundary_binding_contract_target_pair_declared === true,
    full_boundary_binding_pair_construction_input_ready: inputReady,
    source_endpoint_boundary_binding_constructed: false,
    receiver_endpoint_boundary_binding_constructed: false,
    combined_boundary_binding_pair_constructed: false,
    source_endpoint_value_bound_to_boundary_binding: false,
    receiver_endpoint_value_bound_to_boundary_binding: false,
    combined_binding_contract_pair_satisfied: false,
    source_endpoint_motion_rule_constructed: false,
    receiver_endpoint_motion_rule_constructed: false,
    combined_endpoint_evaluation_map_pair_constructed: false,
    proof_grade_boundary_opening_certified: false,
    residual_data_construction_ready: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  return {
    row_id: row.row_id,
    source_interval: row.source_interval,
    receiver_interval: row.receiver_interval,
    failed_side: row.failed_side,
    boundary_side: row.boundary_side,
    source_variable: row.source_variable,
    receiver_variable: row.receiver_variable,
    source_contract_target_id: row.source_full_boundary_binding_contract_target_id,
    receiver_contract_target_id: row.receiver_full_boundary_binding_contract_target_id,
    source_boundary_ref: row.source_boundary_ref,
    receiver_boundary_ref: row.receiver_boundary_ref,
    source_boundary_value: row.source_boundary_value,
    receiver_boundary_value: row.receiver_boundary_value,
    required_fields_present: fields,
    full_boundary_binding_pair_construction_input_ready: inputReady,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver full binding construction inputs, but no source/receiver endpoint boundary bindings, value bindings, satisfied contract pair, motion/evaluation pair, residual data, replay, or row consumption.",
  };
}

function buildAttempt(source, sourcePath) {
  assertInput(source);
  const endpointAttempts = source.endpoint_full_boundary_binding_contract_targets.map(buildEndpointAttempt);
  const rowAttempts = source.row_full_boundary_binding_contract_targets.map((row) =>
    buildRowAttempt(row, endpointAttempts)
  );
  const endpointFieldCounts = Object.fromEntries(
    ENDPOINT_FIELDS.map((field) => [
      field,
      countTrue(endpointAttempts, (endpoint) => endpoint.required_fields_present[field]),
    ])
  );
  const rowFieldCounts = Object.fromEntries(
    ROW_FIELDS.map((field) => [field, countTrue(rowAttempts, (row) => row.required_fields_present[field])])
  );
  return {
    schema: "breather-higher-fold-fold-coordinate-endpoint-functional-full-endpoint-boundary-binding-construction-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status:
      "priority-only-full-endpoint-boundary-binding-construction-attempt-fail-closed-contract-targets-present-full-binding-motion-evaluation-replay-blocked-no-row-consumption",
    theorem_target: "Full Endpoint Boundary-Binding Construction Attempt",
    claim_level:
      "priority-only full endpoint boundary-binding construction attempt; contract-target inputs are ready, but no full endpoint boundary binding, endpoint value binding, binding contract, motion/evaluation map, replay, row consumption, or branch-chart authorization is certified",
    source_artifacts: {
      full_endpoint_boundary_binding_contract_target: artifactRecord(sourcePath),
    },
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    authorization_lock: {
      full_endpoint_boundary_binding_construction_input_ready: true,
      endpoint_boundary_binding_constructed: false,
      endpoint_value_bound_to_boundary_binding: false,
      binding_contract_satisfied: false,
      endpoint_motion_rule_constructed: false,
      endpoint_evaluation_map_constructed: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    construction_rule:
      "A full endpoint boundary binding is constructed only when the declared contract target is supplied with same-packet endpoint boundary binding data, endpoint value binding, binding contract satisfaction, non-target zero, exact $B\\xi=0$, rank, history update, endpoint motion/evaluation, candidate artifacts, topology recertification, and proof-interval replay.",
    no_promotion_rule:
      "Contract-target declarations cannot be promoted into full endpoint boundary bindings. This attempt may pass the input-ready check but must fail closure until construction fields are supplied.",
    construction_methods: CONSTRUCTION_METHODS,
    full_binding_required_fields: FULL_BINDING_REQUIRED_FIELDS,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_full_boundary_binding_construction_attempts: endpointAttempts,
    row_full_boundary_binding_construction_attempts: rowAttempts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      rows: rowAttempts.length,
      full_endpoint_boundary_binding_contract_targets:
        endpointFieldCounts.full_endpoint_boundary_binding_contract_target_declared,
      full_endpoint_boundary_binding_construction_input_ready_functionals:
        endpointFieldCounts.full_endpoint_boundary_binding_construction_input_ready,
      full_endpoint_boundary_binding_constructed_functionals:
        endpointFieldCounts.full_endpoint_boundary_binding_constructed,
      endpoint_boundary_binding_functionals:
        endpointFieldCounts.endpoint_boundary_binding_constructed,
      endpoint_value_bound_to_boundary_binding_functionals:
        endpointFieldCounts.endpoint_value_bound_to_boundary_binding,
      binding_contract_satisfied_functionals:
        endpointFieldCounts.binding_contract_satisfied,
      same_packet_history_update_formula_functionals:
        endpointFieldCounts.same_packet_history_update_formula_present,
      endpoint_motion_rule_functionals:
        endpointFieldCounts.endpoint_motion_rule_constructed,
      endpoint_evaluation_map_functionals:
        endpointFieldCounts.endpoint_evaluation_map_constructed,
      full_endpoint_evaluation_map_functionals:
        endpointFieldCounts.full_endpoint_evaluation_map_constructed,
      non_target_zero_certificate_functionals:
        endpointFieldCounts.non_target_endpoint_zero_certified,
      exact_screen_zero_certificate_functionals:
        endpointFieldCounts.exact_screen_zero_certified,
      rank_certificate_functionals: endpointFieldCounts.rank_certified,
      candidate_artifact_functionals:
        endpointFieldCounts.candidate_artifacts_present,
      topology_recertification_functionals:
        endpointFieldCounts.root_topology_recertified_for_candidate_change,
      proof_interval_replay_functionals:
        endpointFieldCounts.proof_interval_v1_v6_rerun_for_candidate_change,
      row_contract_target_pairs:
        rowFieldCounts.combined_full_boundary_binding_contract_target_pair_declared,
      row_full_boundary_binding_pair_construction_inputs:
        rowFieldCounts.full_boundary_binding_pair_construction_input_ready,
      row_boundary_binding_pairs:
        rowFieldCounts.combined_boundary_binding_pair_constructed,
      row_endpoint_evaluation_map_pairs:
        rowFieldCounts.combined_endpoint_evaluation_map_pair_constructed,
      proof_grade_boundary_opening_rows:
        rowFieldCounts.proof_grade_boundary_opening_certified,
      row_residual_data_ready:
        rowFieldCounts.residual_data_construction_ready,
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    capture_decision:
      "Priority-only. This packet confirms the full endpoint boundary-binding construction inputs are ready for 4 / 4 endpoint functionals and 3 / 3 row source/receiver pairs, but constructs 0 / 4 full endpoint boundary bindings, endpoint value bindings, satisfied binding contracts, same-packet history updates, endpoint motion/evaluation maps, non-target zero certificates, exact $B\\xi=0$, rank certificates, candidate artifacts, topology recertifications, proof-interval replays, preledger pass, live-ledger update, branch-chart authorization, or consumed rows.",
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

function methodTable(methods) {
  return methods
    .map(
      (method) =>
        `| \`${method.method_id}\` | ${method.required_fields.length} | ${method.description} |`
    )
    .join("\n");
}

function endpointTable(endpoints) {
  return endpoints
    .map(
      (endpoint) =>
        `| \`${endpoint.id}\` | \`${endpoint.role}\` | ${endpoint.required_fields_present.full_endpoint_boundary_binding_construction_input_ready} | ${endpoint.required_fields_present.endpoint_boundary_binding_constructed} | ${endpoint.required_fields_present.endpoint_value_bound_to_boundary_binding} | ${endpoint.required_fields_present.binding_contract_satisfied} | ${endpoint.required_fields_present.endpoint_motion_rule_constructed} | ${endpoint.required_fields_present.endpoint_evaluation_map_constructed} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.full_boundary_binding_pair_construction_input_ready} | ${row.required_fields_present.combined_boundary_binding_pair_constructed} | ${row.required_fields_present.combined_endpoint_evaluation_map_pair_constructed} | ${row.row_consumed} |`
    )
    .join("\n");
}

function countTable(counts, total) {
  return Object.entries(counts)
    .map(([field, count]) => `| \`${field}\` | ${count} / ${total} |`)
    .join("\n");
}

function buildReport(attempt) {
  const summary = attempt.summary;
  return `# Higher-Fold Endpoint-Functional Full Endpoint Boundary-Binding Construction Attempt

## Verdict

Status: \`${attempt.status}\`.

This priority-only packet tests whether the full endpoint boundary-binding
contract target can be promoted into actual full endpoint boundary bindings.
It passes only the input-ready layer: the construction fields themselves remain
absent.

The packet records ${summary.full_endpoint_boundary_binding_construction_input_ready_functionals} /
${summary.endpoint_functionals} input-ready full binding construction attempts
and ${summary.row_full_boundary_binding_pair_construction_inputs} /
${summary.rows} row source/receiver construction-input pairs. It keeps
0 / ${summary.endpoint_functionals} full endpoint boundary bindings,
0 / ${summary.endpoint_functionals} endpoint value bindings,
0 / ${summary.endpoint_functionals} satisfied binding contracts,
0 / ${summary.endpoint_functionals} endpoint motion rules,
0 / ${summary.endpoint_functionals} endpoint evaluation maps,
0 / ${summary.endpoint_functionals} full endpoint evaluation maps,
0 / ${summary.endpoint_functionals} non-target zero certificates,
0 / ${summary.endpoint_functionals} exact $B\\xi=0$ certificates,
0 / ${summary.endpoint_functionals} rank certificates,
0 / ${summary.endpoint_functionals} candidate artifacts,
0 / ${summary.endpoint_functionals} topology recertifications,
0 / ${summary.endpoint_functionals} proof-interval replays, and 0 consumed rows.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${sourceTable(attempt.source_artifacts)}

## Construction Rule

${attempt.construction_rule}

${attempt.no_promotion_rule}

## Construction Methods

| Method | Required fields | Description |
| --- | ---: | --- |
${methodTable(attempt.construction_methods)}

## Endpoint Attempts

| Endpoint | Role | Input ready | Full binding | Value binding | Contract satisfied | Motion rule | Evaluation map |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
${endpointTable(attempt.endpoint_full_boundary_binding_construction_attempts)}

## Row Attempts

| Row | Failed side | Input-ready pair | Boundary-binding pair | Evaluation-map pair | Consumed |
| --- | --- | ---: | ---: | ---: | ---: |
${rowTable(attempt.row_full_boundary_binding_construction_attempts)}

## Endpoint Field Counts

| Field | Count |
| --- | ---: |
${countTable(attempt.endpoint_field_counts, summary.endpoint_functionals)}

## Row Field Counts

| Field | Count |
| --- | ---: |
${countTable(attempt.row_field_counts, summary.rows)}

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
  const source = readJson(args.contractTarget);
  const attempt = buildAttempt(source, args.contractTarget);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, attempt, args.pretty);
  writeText(outputReportPath, buildReport(attempt));
  console.log(`Wrote ${outputJsonPath}`);
  console.log(`Wrote ${outputReportPath}`);
}

main();

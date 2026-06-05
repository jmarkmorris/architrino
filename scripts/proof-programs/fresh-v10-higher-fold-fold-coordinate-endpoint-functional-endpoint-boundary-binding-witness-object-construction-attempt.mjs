#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_WITNESS_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_witness_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_endpoint_functional_endpoint_boundary_binding_witness_object_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_endpoint_boundary_binding_witness_object_construction_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const SOURCE_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-boundary-binding-witness-construction-attempt-fail-closed-source-equations-present-witness-binding-value-contract-motion-evaluation-replay-absent-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-construction-attempt-fail-closed-witness-inputs-present-object-binding-value-contract-motion-evaluation-replay-absent-no-row-consumption";

const WITNESS_OBJECT_TARGET_FIELDS = [
  "endpoint_boundary_binding_witness_object_target_declared",
  "witness_object_domain_chart_target_declared",
  "witness_object_endpoint_boundary_binding_ref_target_declared",
  "witness_object_value_binding_map_target_declared",
  "witness_object_contract_link_target_declared",
  "witness_object_algebraic_certificate_refs_target_declared",
  "witness_object_motion_evaluation_refs_target_declared",
  "witness_object_artifact_topology_replay_refs_target_declared",
  "endpoint_boundary_binding_witness_object_construction_input_ready",
];

const WITNESS_OBJECT_CONSTRUCTION_FIELDS = [
  "endpoint_boundary_binding_witness_object_constructed",
  "witness_object_has_domain_chart",
  "witness_object_has_endpoint_boundary_binding_ref",
  "witness_object_has_endpoint_value_binding_map",
  "witness_object_has_contract_link",
  "witness_object_has_algebraic_certificate_refs",
  "witness_object_has_motion_evaluation_refs",
  "witness_object_has_artifact_topology_replay_refs",
];

const PROOF_GRADE_ENDPOINT_FIELDS = [
  "endpoint_boundary_binding_witness_constructed",
  "full_endpoint_boundary_binding_constructed",
  "endpoint_boundary_binding_constructed",
  "endpoint_value_bound_to_boundary_binding",
  "binding_contract_satisfied",
  "same_packet_history_update_formula_present",
  "endpoint_motion_rule_constructed",
  "endpoint_evaluation_map_constructed",
  "full_endpoint_evaluation_map_constructed",
  "global_domain_evaluation_map_constructed",
  "non_target_endpoint_zero_certified",
  "exact_screen_zero_certified",
  "rank_certified",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
];

const INHERITED_ENDPOINT_FIELDS = [
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
  "target_endpoint_ref_value_pairs_present",
  "endpoint_value_binding_source_equation_declared",
  "endpoint_value_binding_source_layer_ready",
  "endpoint_boundary_binding_witness_input_ready",
];

const ENDPOINT_FIELDS = [
  ...INHERITED_ENDPOINT_FIELDS,
  ...WITNESS_OBJECT_TARGET_FIELDS,
  ...WITNESS_OBJECT_CONSTRUCTION_FIELDS,
  ...PROOF_GRADE_ENDPOINT_FIELDS,
];

const ROW_TARGET_FIELDS = [
  "source_endpoint_boundary_binding_witness_object_target_declared",
  "receiver_endpoint_boundary_binding_witness_object_target_declared",
  "combined_endpoint_boundary_binding_witness_object_target_pair_declared",
  "source_endpoint_boundary_binding_witness_object_input_ready",
  "receiver_endpoint_boundary_binding_witness_object_input_ready",
  "combined_endpoint_boundary_binding_witness_object_input_pair_ready",
];

const ROW_CONSTRUCTION_FIELDS = [
  "source_endpoint_boundary_binding_witness_object_constructed",
  "receiver_endpoint_boundary_binding_witness_object_constructed",
  "combined_endpoint_boundary_binding_witness_object_pair_constructed",
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_target_endpoint_boundary_binding_object_constructed",
  "receiver_target_endpoint_boundary_binding_object_constructed",
  "combined_target_boundary_binding_object_pair_constructed",
  "source_full_boundary_binding_contract_target_declared",
  "receiver_full_boundary_binding_contract_target_declared",
  "combined_full_boundary_binding_contract_target_pair_declared",
  "source_endpoint_value_binding_source_equation_declared",
  "receiver_endpoint_value_binding_source_equation_declared",
  "combined_endpoint_value_binding_source_pair_declared",
  "row_endpoint_value_binding_source_pair_ready",
  "full_boundary_binding_pair_construction_input_ready",
  "source_endpoint_boundary_binding_witness_input_ready",
  "receiver_endpoint_boundary_binding_witness_input_ready",
  "combined_endpoint_boundary_binding_witness_input_pair_ready",
  ...ROW_TARGET_FIELDS,
  ...ROW_CONSTRUCTION_FIELDS,
  "source_endpoint_boundary_binding_witness_constructed",
  "receiver_endpoint_boundary_binding_witness_constructed",
  "combined_endpoint_boundary_binding_witness_pair_constructed",
  "source_endpoint_boundary_binding_constructed",
  "receiver_endpoint_boundary_binding_constructed",
  "combined_boundary_binding_pair_constructed",
  "source_endpoint_value_bound_to_boundary_binding",
  "receiver_endpoint_value_bound_to_boundary_binding",
  "combined_binding_contract_pair_satisfied",
  "source_endpoint_motion_rule_constructed",
  "receiver_endpoint_motion_rule_constructed",
  "combined_endpoint_evaluation_map_pair_constructed",
  "same_packet_history_update_formula_present",
  "proof_grade_boundary_opening_certified",
  "residual_data_construction_ready",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "row_consumed",
  "branch_chart_authorized",
];

const WITNESS_OBJECT_METHODS = [
  {
    method_id: "witness_input_layer_ready",
    description:
      "Check whether inherited source equations and witness inputs are ready for a same-packet witness-object construction.",
    required_fields: [
      "endpoint_boundary_binding_witness_input_ready",
      "endpoint_boundary_binding_witness_object_target_declared",
      "endpoint_boundary_binding_witness_object_construction_input_ready",
    ],
  },
  {
    method_id: "same_packet_witness_object_record",
    description:
      "Test whether the packet supplies an explicit endpoint boundary-binding witness object with the required carrier references.",
    required_fields: [
      "endpoint_boundary_binding_witness_object_construction_input_ready",
      "endpoint_boundary_binding_witness_object_constructed",
      "witness_object_has_endpoint_boundary_binding_ref",
      "witness_object_has_endpoint_value_binding_map",
      "witness_object_has_contract_link",
    ],
  },
  {
    method_id: "witness_object_as_proof_grade_witness",
    description:
      "Test whether the witness object proves boundary binding, value binding, and the binding contract.",
    required_fields: [
      "endpoint_boundary_binding_witness_object_constructed",
      "endpoint_boundary_binding_witness_constructed",
      "endpoint_boundary_binding_constructed",
      "endpoint_value_bound_to_boundary_binding",
      "binding_contract_satisfied",
    ],
  },
  {
    method_id: "witness_object_as_motion_evaluation_replay_carrier",
    description:
      "Test whether the witness object carries same-packet motion/evaluation, algebraic certificates, artifact, topology, and replay data.",
    required_fields: [
      "endpoint_boundary_binding_witness_object_constructed",
      "witness_object_has_algebraic_certificate_refs",
      "witness_object_has_motion_evaluation_refs",
      "witness_object_has_artifact_topology_replay_refs",
      "endpoint_motion_rule_constructed",
      "endpoint_evaluation_map_constructed",
      "full_endpoint_evaluation_map_constructed",
      "non_target_endpoint_zero_certified",
      "exact_screen_zero_certified",
      "rank_certified",
      "candidate_artifacts_present",
      "root_topology_recertified_for_candidate_change",
      "proof_interval_v1_v6_rerun_for_candidate_change",
    ],
  },
];

function parseArgs(argv) {
  const args = {
    witnessAttempt: DEFAULT_WITNESS_ATTEMPT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--witness-attempt") {
      args.witnessAttempt = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-endpoint-boundary-binding-witness-object-construction-attempt.mjs [options]

Options:
  --witness-attempt PATH Endpoint boundary-binding witness construction attempt JSON. Defaults to ${DEFAULT_WITNESS_ATTEMPT}.
  --out-dir PATH          Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                Pretty-print JSON artifact.
  --help                  Show this help.`);
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
  const endpoint = map.get(id);
  if (!endpoint) {
    throw new Error(`Missing ${label} endpoint: ${id}`);
  }
  return endpoint;
}

function assertInput(source) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected witness attempt packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected witness attempt fold-coordinate packet id: ${source.fold_coordinate_packet_id}`);
  }
  if (source.status !== SOURCE_STATUS) {
    throw new Error(`Unexpected witness attempt status: ${source.status}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger) {
    throw new Error("Refusing witness-object attempt from an authorized witness-attempt packet.");
  }
}

function methodResult(method, fields) {
  const missingFields = method.required_fields.filter((field) => fields[field] !== true);
  return {
    method_id: method.method_id,
    description: method.description,
    required_fields: method.required_fields,
    missing_fields: missingFields,
    failure_codes: missingFields.map((field) => `missing_endpoint_boundary_binding_witness_object_${field}`),
    passed: missingFields.length === 0,
  };
}

function endpointFields(endpoint) {
  const sourceFields = endpoint.required_fields_present;
  const inputReady =
    sourceFields.endpoint_boundary_binding_witness_input_ready === true &&
    sourceFields.endpoint_value_binding_source_layer_ready === true &&
    sourceFields.full_endpoint_boundary_binding_construction_input_ready === true;
  const fields = {};
  for (const field of INHERITED_ENDPOINT_FIELDS) {
    fields[field] = sourceFields[field] === true;
  }
  for (const field of WITNESS_OBJECT_TARGET_FIELDS) {
    fields[field] = true;
  }
  fields.endpoint_boundary_binding_witness_object_construction_input_ready = inputReady;
  for (const field of WITNESS_OBJECT_CONSTRUCTION_FIELDS) {
    fields[field] = false;
  }
  for (const field of PROOF_GRADE_ENDPOINT_FIELDS) {
    fields[field] = false;
  }
  return fields;
}

function buildEndpointAttempt(endpoint) {
  const fields = endpointFields(endpoint);
  const methodResults = WITNESS_OBJECT_METHODS.map((method) => methodResult(method, fields));
  return {
    id: endpoint.id,
    endpoint_functional_id: endpoint.endpoint_functional_id,
    role: endpoint.role,
    witness_object_attempt_id: `endpoint_boundary_binding_witness_object_attempt:${endpoint.id}`,
    source_witness_attempt_id: endpoint.witness_attempt_id,
    value_binding_source_id: endpoint.value_binding_source_id,
    source_target_object_id: endpoint.source_target_object_id,
    source_contract_target_id: endpoint.source_contract_target_id,
    binding_symbol: endpoint.binding_symbol,
    witness_object_symbol: `WBB_${endpoint.id}`,
    domain_symbol: endpoint.domain_symbol,
    chart_symbol: endpoint.chart_symbol,
    basis_symbol: endpoint.basis_symbol,
    target_equation: endpoint.target_equation,
    target_action: endpoint.target_action,
    target_sign: endpoint.target_sign,
    target_endpoint_ref_value_count: endpoint.target_endpoint_ref_value_count,
    target_endpoint_value_binding_source_equations: endpoint.target_endpoint_value_binding_source_equations,
    required_fields_present: fields,
    witness_object_method_results: methodResults,
    witness_object_methods_passed: methodResults.filter((method) => method.passed).map((method) => method.method_id),
    endpoint_boundary_binding_witness_object_constructed: false,
    endpoint_boundary_binding_witness_constructed: false,
    missing_witness_object_fields: WITNESS_OBJECT_CONSTRUCTION_FIELDS,
    missing_proof_grade_fields: PROOF_GRADE_ENDPOINT_FIELDS,
    failure_codes: [...WITNESS_OBJECT_CONSTRUCTION_FIELDS, ...PROOF_GRADE_ENDPOINT_FIELDS].map(
      (field) => `endpoint_boundary_binding_witness_object_attempt_retains_blocker_${field}`
    ),
    obstruction:
      "Witness inputs are ready, but no same-packet endpoint boundary-binding witness object carries endpoint boundary binding, value-binding, contract, certificate, motion/evaluation, artifact, topology, or replay references.",
  };
}

function buildRowAttempt(row, endpointAttempts) {
  const endpointById = idMap(endpointAttempts, "endpoint boundary-binding witness object attempt");
  const sourceEndpoint = requireEndpoint(endpointById, row.source_variable, "source witness object attempt");
  const receiverEndpoint = requireEndpoint(endpointById, row.receiver_variable, "receiver witness object attempt");
  const sourceFields = sourceEndpoint.required_fields_present;
  const receiverFields = receiverEndpoint.required_fields_present;
  const rowFields = row.required_fields_present;
  const sourceObjectInputReady =
    sourceFields.endpoint_boundary_binding_witness_object_construction_input_ready === true;
  const receiverObjectInputReady =
    receiverFields.endpoint_boundary_binding_witness_object_construction_input_ready === true;
  const pairInputReady =
    rowFields.combined_endpoint_boundary_binding_witness_input_pair_ready === true &&
    sourceObjectInputReady &&
    receiverObjectInputReady;
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
    source_endpoint_value_binding_source_equation_declared:
      rowFields.source_endpoint_value_binding_source_equation_declared === true,
    receiver_endpoint_value_binding_source_equation_declared:
      rowFields.receiver_endpoint_value_binding_source_equation_declared === true,
    combined_endpoint_value_binding_source_pair_declared:
      rowFields.combined_endpoint_value_binding_source_pair_declared === true,
    row_endpoint_value_binding_source_pair_ready:
      rowFields.row_endpoint_value_binding_source_pair_ready === true,
    full_boundary_binding_pair_construction_input_ready:
      rowFields.full_boundary_binding_pair_construction_input_ready === true,
    source_endpoint_boundary_binding_witness_input_ready:
      rowFields.source_endpoint_boundary_binding_witness_input_ready === true,
    receiver_endpoint_boundary_binding_witness_input_ready:
      rowFields.receiver_endpoint_boundary_binding_witness_input_ready === true,
    combined_endpoint_boundary_binding_witness_input_pair_ready:
      rowFields.combined_endpoint_boundary_binding_witness_input_pair_ready === true,
    source_endpoint_boundary_binding_witness_object_target_declared: true,
    receiver_endpoint_boundary_binding_witness_object_target_declared: true,
    combined_endpoint_boundary_binding_witness_object_target_pair_declared: true,
    source_endpoint_boundary_binding_witness_object_input_ready: sourceObjectInputReady,
    receiver_endpoint_boundary_binding_witness_object_input_ready: receiverObjectInputReady,
    combined_endpoint_boundary_binding_witness_object_input_pair_ready: pairInputReady,
    source_endpoint_boundary_binding_witness_object_constructed: false,
    receiver_endpoint_boundary_binding_witness_object_constructed: false,
    combined_endpoint_boundary_binding_witness_object_pair_constructed: false,
    source_endpoint_boundary_binding_witness_constructed: false,
    receiver_endpoint_boundary_binding_witness_constructed: false,
    combined_endpoint_boundary_binding_witness_pair_constructed: false,
    source_endpoint_boundary_binding_constructed: false,
    receiver_endpoint_boundary_binding_constructed: false,
    combined_boundary_binding_pair_constructed: false,
    source_endpoint_value_bound_to_boundary_binding: false,
    receiver_endpoint_value_bound_to_boundary_binding: false,
    combined_binding_contract_pair_satisfied: false,
    source_endpoint_motion_rule_constructed: false,
    receiver_endpoint_motion_rule_constructed: false,
    combined_endpoint_evaluation_map_pair_constructed: false,
    same_packet_history_update_formula_present: false,
    proof_grade_boundary_opening_certified: false,
    residual_data_construction_ready: false,
    candidate_artifacts_present: false,
    root_topology_recertified_for_candidate_change: false,
    proof_interval_v1_v6_rerun_for_candidate_change: false,
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
    source_witness_object_attempt_id: sourceEndpoint.witness_object_attempt_id,
    receiver_witness_object_attempt_id: receiverEndpoint.witness_object_attempt_id,
    source_witness_attempt_id: row.source_witness_attempt_id,
    receiver_witness_attempt_id: row.receiver_witness_attempt_id,
    required_fields_present: fields,
    endpoint_boundary_binding_witness_object_input_pair_ready: pairInputReady,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver witness-object inputs, but no source/receiver witness objects, boundary bindings, value bindings, contract pair, motion/evaluation pair, replay, or row consumption.",
  };
}

function buildPacket(source, sourcePath) {
  assertInput(source);
  const endpointAttempts = source.endpoint_boundary_binding_witness_attempts.map(buildEndpointAttempt);
  const rowAttempts = source.row_endpoint_boundary_binding_witness_attempts.map((row) =>
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
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-endpoint-boundary-binding-witness-object-construction-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: STATUS,
    theorem_target: "Endpoint Boundary-Binding Witness Object Construction Attempt",
    claim_level:
      "priority-only same-packet endpoint boundary-binding witness object construction attempt; witness inputs are ready, but explicit witness-object carrier fields are absent",
    source_artifacts: {
      endpoint_boundary_binding_witness_construction_attempt: artifactRecord(sourcePath),
    },
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    authorization_lock: {
      endpoint_boundary_binding_witness_object_target_declared: true,
      endpoint_boundary_binding_witness_object_construction_input_ready: true,
      endpoint_boundary_binding_witness_object_constructed: false,
      endpoint_boundary_binding_witness_constructed: false,
      endpoint_boundary_binding_constructed: false,
      endpoint_value_bound_to_boundary_binding: false,
      binding_contract_satisfied: false,
      endpoint_motion_rule_constructed: false,
      endpoint_evaluation_map_constructed: false,
      full_endpoint_evaluation_map_constructed: false,
      non_target_endpoint_zero_certified: false,
      exact_screen_zero_certified: false,
      rank_certified: false,
      proof_interval_v1_v6_rerun_for_candidate_change: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    witness_object_rule:
      "A same-packet endpoint boundary-binding witness object must explicitly carry the domain chart, endpoint boundary-binding reference, endpoint value-binding map, binding-contract link, algebraic certificate references, motion/evaluation references, candidate artifact reference, topology reference, and proof-interval replay reference.",
    no_promotion_rule:
      "Witness inputs and source equations are not witness objects. They can declare the target object, but they cannot supply boundary binding, value binding, contract, certificate, motion/evaluation, replay, or row consumption.",
    witness_object_methods: WITNESS_OBJECT_METHODS,
    inherited_endpoint_fields: INHERITED_ENDPOINT_FIELDS,
    witness_object_target_fields: WITNESS_OBJECT_TARGET_FIELDS,
    witness_object_construction_fields: WITNESS_OBJECT_CONSTRUCTION_FIELDS,
    proof_grade_endpoint_fields: PROOF_GRADE_ENDPOINT_FIELDS,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_boundary_binding_witness_object_attempts: endpointAttempts,
    row_endpoint_boundary_binding_witness_object_attempts: rowAttempts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      rows: rowAttempts.length,
      endpoint_boundary_binding_witness_input_ready_functionals:
        endpointFieldCounts.endpoint_boundary_binding_witness_input_ready,
      endpoint_boundary_binding_witness_object_target_declared_functionals:
        endpointFieldCounts.endpoint_boundary_binding_witness_object_target_declared,
      endpoint_boundary_binding_witness_object_input_ready_functionals:
        endpointFieldCounts.endpoint_boundary_binding_witness_object_construction_input_ready,
      endpoint_boundary_binding_witness_object_functionals:
        endpointFieldCounts.endpoint_boundary_binding_witness_object_constructed,
      endpoint_boundary_binding_witness_functionals:
        endpointFieldCounts.endpoint_boundary_binding_witness_constructed,
      full_endpoint_boundary_binding_functionals:
        endpointFieldCounts.full_endpoint_boundary_binding_constructed,
      endpoint_boundary_binding_functionals:
        endpointFieldCounts.endpoint_boundary_binding_constructed,
      endpoint_value_bound_to_boundary_binding_functionals:
        endpointFieldCounts.endpoint_value_bound_to_boundary_binding,
      binding_contract_satisfied_functionals:
        endpointFieldCounts.binding_contract_satisfied,
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
      rank_certificate_functionals:
        endpointFieldCounts.rank_certified,
      candidate_artifact_functionals:
        endpointFieldCounts.candidate_artifacts_present,
      topology_recertification_functionals:
        endpointFieldCounts.root_topology_recertified_for_candidate_change,
      proof_interval_replay_functionals:
        endpointFieldCounts.proof_interval_v1_v6_rerun_for_candidate_change,
      row_witness_object_input_pairs:
        rowFieldCounts.combined_endpoint_boundary_binding_witness_object_input_pair_ready,
      row_witness_object_pairs:
        rowFieldCounts.combined_endpoint_boundary_binding_witness_object_pair_constructed,
      row_witness_pairs:
        rowFieldCounts.combined_endpoint_boundary_binding_witness_pair_constructed,
      row_boundary_binding_pairs:
        rowFieldCounts.combined_boundary_binding_pair_constructed,
      row_value_binding_pairs:
        rowFieldCounts.combined_binding_contract_pair_satisfied,
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
      "Priority-only. This packet declares same-packet endpoint boundary-binding witness-object targets for 4 / 4 endpoint functionals and 3 / 3 row source/receiver pairs, but constructs 0 / 4 witness objects, endpoint boundary-binding witnesses, proof-grade endpoint boundary bindings, endpoint values bound to endpoint boundary bindings, satisfied binding contracts, motion/evaluation maps, replay fields, preledger passes, live-ledger updates, branch-chart authorizations, or consumed rows.",
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
    .map((method) => `| \`${method.method_id}\` | ${method.required_fields.length} | ${method.description} |`)
    .join("\n");
}

function endpointTable(endpoints) {
  return endpoints
    .map(
      (endpoint) =>
        `| \`${endpoint.id}\` | \`${endpoint.role}\` | ${endpoint.required_fields_present.endpoint_boundary_binding_witness_object_construction_input_ready} | ${endpoint.required_fields_present.endpoint_boundary_binding_witness_object_constructed} | ${endpoint.required_fields_present.endpoint_boundary_binding_witness_constructed} | ${endpoint.required_fields_present.endpoint_boundary_binding_constructed} | ${endpoint.required_fields_present.endpoint_value_bound_to_boundary_binding} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.combined_endpoint_boundary_binding_witness_object_input_pair_ready} | ${row.required_fields_present.combined_endpoint_boundary_binding_witness_object_pair_constructed} | ${row.required_fields_present.combined_endpoint_boundary_binding_witness_pair_constructed} | ${row.row_consumed} |`
    )
    .join("\n");
}

function countTable(counts, total) {
  return Object.entries(counts)
    .map(([field, count]) => `| \`${field}\` | ${count} / ${total} |`)
    .join("\n");
}

function buildReport(packet) {
  const summary = packet.summary;
  return `# Higher-Fold Endpoint-Functional Endpoint Boundary-Binding Witness Object Construction Attempt

## Verdict

Status: \`${packet.status}\`.

This priority-only packet tests whether the witness-input layer can be promoted
into explicit same-packet endpoint boundary-binding witness objects. It declares
the object target and construction inputs. It does not construct the object.

The packet records ${summary.endpoint_boundary_binding_witness_object_input_ready_functionals} /
${summary.endpoint_functionals} endpoint witness-object input layers and
${summary.row_witness_object_input_pairs} / ${summary.rows} row source/receiver
witness-object input pairs. It keeps 0 / ${summary.endpoint_functionals}
witness objects, 0 / ${summary.endpoint_functionals} endpoint
boundary-binding witnesses, 0 / ${summary.endpoint_functionals} proof-grade
endpoint boundary bindings, 0 / ${summary.endpoint_functionals} endpoint
values bound to endpoint boundary bindings, 0 / ${summary.endpoint_functionals}
satisfied binding contracts, 0 / ${summary.endpoint_functionals} endpoint
motion rules, 0 / ${summary.endpoint_functionals} endpoint evaluation maps,
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
${sourceTable(packet.source_artifacts)}

## Witness-Object Rule

${packet.witness_object_rule}

${packet.no_promotion_rule}

## Witness-Object Methods

| Method | Required fields | Description |
| --- | ---: | --- |
${methodTable(packet.witness_object_methods)}

## Endpoint Attempts

| Endpoint | Role | Object input | Object | Witness | Boundary binding | Value bound |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
${endpointTable(packet.endpoint_boundary_binding_witness_object_attempts)}

## Row Attempts

| Row | Failed side | Object-input pair | Object pair | Witness pair | Consumed |
| --- | --- | ---: | ---: | ---: | ---: |
${rowTable(packet.row_endpoint_boundary_binding_witness_object_attempts)}

## Endpoint Field Counts

| Field | Count |
| --- | ---: |
${countTable(packet.endpoint_field_counts, summary.endpoint_functionals)}

## Row Field Counts

| Field | Count |
| --- | ---: |
${countTable(packet.row_field_counts, summary.rows)}

## Capture Decision

${packet.capture_decision}
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const source = readJson(args.witnessAttempt);
  const packet = buildPacket(source, args.witnessAttempt);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, packet, args.pretty);
  writeText(outputReportPath, buildReport(packet));
  console.log(`Wrote ${outputJsonPath}`);
  console.log(`Wrote ${outputReportPath}`);
}

main();

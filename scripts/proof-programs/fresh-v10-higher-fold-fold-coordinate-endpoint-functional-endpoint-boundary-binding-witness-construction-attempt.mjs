#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_VALUE_BINDING_SOURCE_LAYER = `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_value_binding_source_layer.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_endpoint_functional_endpoint_boundary_binding_witness_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_endpoint_boundary_binding_witness_construction_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

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
  "target_endpoint_ref_value_pairs_present",
  "endpoint_value_binding_source_equation_declared",
  "endpoint_value_binding_source_layer_ready",
  "endpoint_boundary_binding_witness_input_ready",
  ...PROOF_GRADE_ENDPOINT_FIELDS,
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

const WITNESS_METHODS = [
  {
    method_id: "value_binding_source_layer_input_ready",
    description:
      "Check whether source-layer endpoint value-binding equations and full binding construction inputs are present.",
    required_fields: [
      "endpoint_value_binding_source_equation_declared",
      "endpoint_value_binding_source_layer_ready",
      "full_endpoint_boundary_binding_construction_input_ready",
      "endpoint_boundary_binding_witness_input_ready",
    ],
  },
  {
    method_id: "source_equations_as_endpoint_boundary_binding_witness",
    description:
      "Test whether source equations already constitute a same-packet proof-grade endpoint boundary-binding witness.",
    required_fields: [
      "endpoint_boundary_binding_witness_input_ready",
      "endpoint_boundary_binding_witness_constructed",
      "endpoint_boundary_binding_constructed",
      "endpoint_value_bound_to_boundary_binding",
    ],
  },
  {
    method_id: "witness_as_binding_contract",
    description:
      "Test whether an endpoint boundary-binding witness already satisfies the full binding contract and algebraic certificates.",
    required_fields: [
      "endpoint_boundary_binding_witness_constructed",
      "binding_contract_satisfied",
      "non_target_endpoint_zero_certified",
      "exact_screen_zero_certified",
      "rank_certified",
    ],
  },
  {
    method_id: "witness_as_motion_evaluation_replay",
    description:
      "Test whether an endpoint boundary-binding witness supplies same-packet history update, motion/evaluation, artifacts, topology, and replay.",
    required_fields: [
      "endpoint_boundary_binding_witness_constructed",
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
    valueBindingSourceLayer: DEFAULT_VALUE_BINDING_SOURCE_LAYER,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--value-binding-source-layer") {
      args.valueBindingSourceLayer = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-endpoint-boundary-binding-witness-construction-attempt.mjs [options]

Options:
  --value-binding-source-layer PATH Endpoint value-binding source-layer JSON. Defaults to ${DEFAULT_VALUE_BINDING_SOURCE_LAYER}.
  --out-dir PATH                    Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                          Pretty-print JSON artifact.
  --help                            Show this help.`);
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
    throw new Error(`Unexpected value-binding source layer packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(
      `Unexpected value-binding source layer fold-coordinate packet id: ${source.fold_coordinate_packet_id}`
    );
  }
  if (
    source.status !==
    "priority-only-fold-coordinate-endpoint-functional-endpoint-value-binding-source-layer-fail-closed-source-equations-present-proof-grade-boundary-bindings-absent-no-row-consumption"
  ) {
    throw new Error(`Unexpected value-binding source layer status: ${source.status}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger) {
    throw new Error("Refusing witness attempt from authorized source packet.");
  }
}

function methodResult(method, fields) {
  const missingFields = method.required_fields.filter((field) => fields[field] !== true);
  return {
    method_id: method.method_id,
    description: method.description,
    required_fields: method.required_fields,
    missing_fields: missingFields,
    failure_codes: missingFields.map((field) => `missing_endpoint_boundary_binding_witness_${field}`),
    passed: missingFields.length === 0,
  };
}

function endpointFields(endpoint) {
  const sourceFields = endpoint.required_fields_present;
  const inputReady =
    sourceFields.endpoint_value_binding_source_equation_declared === true &&
    sourceFields.endpoint_value_binding_source_layer_ready === true &&
    sourceFields.full_endpoint_boundary_binding_construction_input_ready === true;
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
    full_endpoint_boundary_binding_construction_input_ready:
      sourceFields.full_endpoint_boundary_binding_construction_input_ready === true,
    target_endpoint_ref_value_pairs_present:
      sourceFields.target_endpoint_ref_value_pairs_present === true,
    endpoint_value_binding_source_equation_declared:
      sourceFields.endpoint_value_binding_source_equation_declared === true,
    endpoint_value_binding_source_layer_ready:
      sourceFields.endpoint_value_binding_source_layer_ready === true,
    endpoint_boundary_binding_witness_input_ready: inputReady,
    endpoint_boundary_binding_witness_constructed: false,
    full_endpoint_boundary_binding_constructed: false,
    endpoint_boundary_binding_constructed: false,
    endpoint_value_bound_to_boundary_binding: false,
    binding_contract_satisfied: false,
    same_packet_history_update_formula_present: false,
    endpoint_motion_rule_constructed: false,
    endpoint_evaluation_map_constructed: false,
    full_endpoint_evaluation_map_constructed: false,
    global_domain_evaluation_map_constructed: false,
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
  const methodResults = WITNESS_METHODS.map((method) => methodResult(method, fields));
  return {
    id: endpoint.id,
    endpoint_functional_id: endpoint.endpoint_functional_id,
    role: endpoint.role,
    witness_attempt_id: `endpoint_boundary_binding_witness_attempt:${endpoint.id}`,
    value_binding_source_id: endpoint.value_binding_source_id,
    source_target_object_id: endpoint.source_target_object_id,
    source_contract_target_id: endpoint.source_contract_target_id,
    binding_symbol: endpoint.binding_symbol,
    domain_symbol: endpoint.domain_symbol,
    chart_symbol: endpoint.chart_symbol,
    basis_symbol: endpoint.basis_symbol,
    target_equation: endpoint.target_equation,
    target_action: endpoint.target_action,
    target_sign: endpoint.target_sign,
    target_endpoint_ref_value_count: endpoint.target_endpoint_ref_value_count,
    target_endpoint_value_binding_source_equations: endpoint.target_endpoint_value_binding_source_equations,
    required_fields_present: fields,
    witness_method_results: methodResults,
    witness_methods_passed: methodResults.filter((method) => method.passed).map((method) => method.method_id),
    endpoint_boundary_binding_witness_constructed: false,
    missing_witness_fields: PROOF_GRADE_ENDPOINT_FIELDS,
    failure_codes: PROOF_GRADE_ENDPOINT_FIELDS.map(
      (field) => `endpoint_boundary_binding_witness_attempt_retains_blocker_${field}`
    ),
    obstruction:
      "Endpoint value-binding source equations are ready, but no same-packet endpoint boundary-binding witness object is constructed for them.",
  };
}

function buildRowAttempt(row, endpointAttempts) {
  const endpointById = idMap(endpointAttempts, "endpoint boundary-binding witness attempt");
  const sourceEndpoint = requireEndpoint(endpointById, row.source_variable, "source witness attempt");
  const receiverEndpoint = requireEndpoint(endpointById, row.receiver_variable, "receiver witness attempt");
  const rowFields = row.required_fields_present;
  const sourceInputReady =
    sourceEndpoint.required_fields_present.endpoint_boundary_binding_witness_input_ready === true;
  const receiverInputReady =
    receiverEndpoint.required_fields_present.endpoint_boundary_binding_witness_input_ready === true;
  const pairReady =
    rowFields.row_endpoint_value_binding_source_pair_ready === true &&
    sourceInputReady &&
    receiverInputReady;
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
    source_endpoint_boundary_binding_witness_input_ready: sourceInputReady,
    receiver_endpoint_boundary_binding_witness_input_ready: receiverInputReady,
    combined_endpoint_boundary_binding_witness_input_pair_ready: pairReady,
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
    source_witness_attempt_id: sourceEndpoint.witness_attempt_id,
    receiver_witness_attempt_id: receiverEndpoint.witness_attempt_id,
    source_value_binding_source_id: row.source_value_binding_source_id,
    receiver_value_binding_source_id: row.receiver_value_binding_source_id,
    required_fields_present: fields,
    endpoint_boundary_binding_witness_input_pair_ready: pairReady,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver witness inputs, but no source/receiver endpoint boundary-binding witnesses, value bindings, contract pair, motion/evaluation pair, residual data, replay, or row consumption.",
  };
}

function buildPacket(source, sourcePath) {
  assertInput(source);
  const endpointAttempts = source.endpoint_value_binding_source_layers.map(buildEndpointAttempt);
  const rowAttempts = source.row_endpoint_value_binding_source_layers.map((row) =>
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
    schema: "breather-higher-fold-fold-coordinate-endpoint-functional-endpoint-boundary-binding-witness-construction-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status:
      "priority-only-fold-coordinate-endpoint-functional-endpoint-boundary-binding-witness-construction-attempt-fail-closed-source-equations-present-witness-binding-value-contract-motion-evaluation-replay-absent-no-row-consumption",
    theorem_target: "Endpoint Boundary-Binding Witness Construction Attempt",
    claim_level:
      "priority-only endpoint boundary-binding witness construction attempt; endpoint value-binding source equations are ready, but no proof-grade endpoint boundary-binding witness, binding contract, replay, or row consumption is certified",
    source_artifacts: {
      endpoint_value_binding_source_layer: artifactRecord(sourcePath),
    },
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    authorization_lock: {
      endpoint_boundary_binding_witness_input_ready: true,
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
    witness_rule:
      "A proof-grade endpoint boundary-binding witness must be a same-packet object that binds each endpoint value source equation to an endpoint boundary binding and carries the required contract, algebraic certificates, motion/evaluation, artifact, topology, and replay fields.",
    no_promotion_rule:
      "Endpoint value-binding source equations are not endpoint boundary-binding witnesses. They can only feed a witness construction; they cannot themselves satisfy value binding, contract, or row consumption.",
    witness_methods: WITNESS_METHODS,
    proof_grade_endpoint_fields: PROOF_GRADE_ENDPOINT_FIELDS,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_boundary_binding_witness_attempts: endpointAttempts,
    row_endpoint_boundary_binding_witness_attempts: rowAttempts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      rows: rowAttempts.length,
      target_endpoint_boundary_binding_objects:
        endpointFieldCounts.target_endpoint_boundary_binding_object_constructed,
      target_endpoint_ref_value_pair_functionals:
        endpointFieldCounts.target_endpoint_ref_value_pairs_present,
      endpoint_value_binding_source_equation_functionals:
        endpointFieldCounts.endpoint_value_binding_source_equation_declared,
      endpoint_value_binding_source_layer_ready_functionals:
        endpointFieldCounts.endpoint_value_binding_source_layer_ready,
      endpoint_boundary_binding_witness_input_ready_functionals:
        endpointFieldCounts.endpoint_boundary_binding_witness_input_ready,
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
      same_packet_history_update_formula_functionals:
        endpointFieldCounts.same_packet_history_update_formula_present,
      endpoint_motion_rule_functionals:
        endpointFieldCounts.endpoint_motion_rule_constructed,
      endpoint_evaluation_map_functionals:
        endpointFieldCounts.endpoint_evaluation_map_constructed,
      full_endpoint_evaluation_map_functionals:
        endpointFieldCounts.full_endpoint_evaluation_map_constructed,
      global_domain_evaluation_map_functionals:
        endpointFieldCounts.global_domain_evaluation_map_constructed,
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
      row_witness_input_pairs:
        rowFieldCounts.combined_endpoint_boundary_binding_witness_input_pair_ready,
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
      "Priority-only. This packet confirms endpoint boundary-binding witness inputs are ready for 4 / 4 endpoint functionals and 3 / 3 row source/receiver pairs, but constructs 0 / 4 endpoint boundary-binding witnesses, proof-grade endpoint boundary bindings, endpoint values bound to endpoint boundary bindings, satisfied binding contracts, motion/evaluation maps, replay fields, preledger passes, live-ledger updates, branch-chart authorizations, or consumed rows. Source equations remain inputs, not witness objects.",
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
        `| \`${endpoint.id}\` | \`${endpoint.role}\` | ${endpoint.required_fields_present.endpoint_boundary_binding_witness_input_ready} | ${endpoint.required_fields_present.endpoint_boundary_binding_witness_constructed} | ${endpoint.required_fields_present.endpoint_boundary_binding_constructed} | ${endpoint.required_fields_present.endpoint_value_bound_to_boundary_binding} | ${endpoint.required_fields_present.binding_contract_satisfied} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.combined_endpoint_boundary_binding_witness_input_pair_ready} | ${row.required_fields_present.combined_endpoint_boundary_binding_witness_pair_constructed} | ${row.required_fields_present.combined_boundary_binding_pair_constructed} | ${row.row_consumed} |`
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
  return `# Higher-Fold Endpoint-Functional Endpoint Boundary-Binding Witness Construction Attempt

## Verdict

Status: \`${packet.status}\`.

This priority-only packet tests whether endpoint value-binding source equations
can be promoted into same-packet endpoint boundary-binding witnesses. It passes
only the witness-input layer. Source equations are present; witness objects are
not.

The packet records ${summary.endpoint_boundary_binding_witness_input_ready_functionals} /
${summary.endpoint_functionals} endpoint witness-input layers and
${summary.row_witness_input_pairs} / ${summary.rows} row source/receiver
witness-input pairs. It keeps 0 / ${summary.endpoint_functionals} endpoint
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

## Witness Rule

${packet.witness_rule}

${packet.no_promotion_rule}

## Witness Methods

| Method | Required fields | Description |
| --- | ---: | --- |
${methodTable(packet.witness_methods)}

## Endpoint Attempts

| Endpoint | Role | Witness input | Witness | Boundary binding | Value bound | Contract satisfied |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
${endpointTable(packet.endpoint_boundary_binding_witness_attempts)}

## Row Attempts

| Row | Failed side | Witness-input pair | Witness pair | Boundary-binding pair | Consumed |
| --- | --- | ---: | ---: | ---: | ---: |
${rowTable(packet.row_endpoint_boundary_binding_witness_attempts)}

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
  const source = readJson(args.valueBindingSourceLayer);
  const packet = buildPacket(source, args.valueBindingSourceLayer);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, packet, args.pretty);
  writeText(outputReportPath, buildReport(packet));
  console.log(`Wrote ${outputJsonPath}`);
  console.log(`Wrote ${outputReportPath}`);
}

main();

#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_VALUE_MAP_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_value_binding_map_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_binding_contract_full_binding_carrier_admission_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_binding_contract_full_binding_carrier_admission_construction_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const SOURCE_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-value-binding-map-construction-attempt-partial-pass-value-maps-constructed-contract-full-binding-carrier-admission-row-closure-locked-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-binding-contract-full-binding-carrier-admission-construction-attempt-fail-closed-value-maps-inherited-contract-full-binding-carrier-admission-absent-no-row-consumption";

const SOURCE_VALUE_MAP_FIELDS = [
  "endpoint_boundary_binding_constructed",
  "witness_object_has_endpoint_boundary_binding_ref",
  "endpoint_value_binding_map_constructed",
  "witness_object_has_endpoint_value_binding_map",
  "endpoint_value_bound_to_boundary_binding",
  "endpoint_value_binding_map_targets_first_primitive",
  "endpoint_value_binding_map_ref_values_certified",
];

const CONTRACT_TEST_FIELDS = [
  "binding_contract_target_ref_inherited",
  "binding_contract_satisfaction_test_applied",
  "binding_contract_satisfied",
  "witness_object_has_contract_link",
];

const FULL_BINDING_TEST_FIELDS = [
  "full_endpoint_boundary_binding_construction_test_applied",
  "full_endpoint_boundary_binding_constructed",
  "endpoint_boundary_binding_ref_carrier_unblocked",
  "endpoint_value_binding_map_carrier_unblocked",
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

const CARRIER_ADMISSION_TEST_FIELDS = [
  "carrier_admission_test_applied",
  "endpoint_boundary_binding_ref_carrier_unblocked",
  "endpoint_value_binding_map_carrier_unblocked",
];

const CONTRACT_OUTPUT_FIELDS = [
  "binding_contract_satisfied",
  "witness_object_has_contract_link",
];

const FULL_BINDING_OUTPUT_FIELDS = FULL_BINDING_TEST_FIELDS.filter(
  (field) => field !== "full_endpoint_boundary_binding_construction_test_applied"
);

const CARRIER_OUTPUT_FIELDS = CARRIER_ADMISSION_TEST_FIELDS.filter(
  (field) => field !== "carrier_admission_test_applied"
);

const ENDPOINT_FIELDS = [
  ...SOURCE_VALUE_MAP_FIELDS,
  ...CONTRACT_TEST_FIELDS,
  ...FULL_BINDING_TEST_FIELDS,
  "carrier_admission_test_applied",
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_endpoint_value_binding_map_constructed",
  "receiver_endpoint_value_binding_map_constructed",
  "combined_endpoint_value_binding_map_pair_constructed",
  "source_endpoint_value_bound_to_boundary_binding",
  "receiver_endpoint_value_bound_to_boundary_binding",
  "combined_endpoint_value_binding_pair_constructed",
  "source_binding_contract_satisfaction_test_applied",
  "receiver_binding_contract_satisfaction_test_applied",
  "combined_binding_contract_satisfaction_test_pair_applied",
  "source_binding_contract_satisfied",
  "receiver_binding_contract_satisfied",
  "combined_binding_contract_pair_satisfied",
  "source_full_endpoint_boundary_binding_construction_test_applied",
  "receiver_full_endpoint_boundary_binding_construction_test_applied",
  "combined_full_endpoint_boundary_binding_construction_test_pair_applied",
  "source_full_endpoint_boundary_binding_constructed",
  "receiver_full_endpoint_boundary_binding_constructed",
  "combined_full_endpoint_boundary_binding_pair_constructed",
  "source_endpoint_boundary_binding_ref_carrier_unblocked",
  "receiver_endpoint_boundary_binding_ref_carrier_unblocked",
  "combined_endpoint_boundary_binding_ref_carrier_pair_unblocked",
  "source_endpoint_value_binding_map_carrier_unblocked",
  "receiver_endpoint_value_binding_map_carrier_unblocked",
  "combined_endpoint_value_binding_map_carrier_pair_unblocked",
  "combined_endpoint_evaluation_map_pair_constructed",
  "residual_data_construction_ready",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const CONSTRUCTION_METHODS = [
  {
    method_id: "endpoint_value_binding_map_source_ready",
    output_kind: "input-readiness",
    description:
      "Check that the prior packet supplied endpoint value-binding maps from referenced first endpoint boundary-binding primitives.",
    required_fields: SOURCE_VALUE_MAP_FIELDS,
  },
  {
    method_id: "binding_contract_satisfaction_test",
    output_kind: "binding-contract",
    description:
      "Test whether each endpoint value-binding map satisfies the inherited full endpoint boundary-binding contract target and supplies a witness-object contract link.",
    required_fields: [
      "endpoint_value_binding_map_constructed",
      "endpoint_value_bound_to_boundary_binding",
      "binding_contract_target_ref_inherited",
      "binding_contract_satisfaction_test_applied",
      "binding_contract_satisfied",
      "witness_object_has_contract_link",
    ],
  },
  {
    method_id: "full_endpoint_boundary_binding_construction_test",
    output_kind: "full-endpoint-boundary-binding",
    description:
      "Test whether contract satisfaction promotes the value map into a proof-grade full endpoint boundary binding with motion/evaluation, algebraic certificates, artifacts, topology recertification, and proof replay.",
    required_fields: [
      "binding_contract_satisfied",
      "witness_object_has_contract_link",
      "full_endpoint_boundary_binding_construction_test_applied",
      ...FULL_BINDING_OUTPUT_FIELDS,
    ],
  },
  {
    method_id: "endpoint_boundary_binding_carrier_admission_test",
    output_kind: "carrier-admission",
    description:
      "Test whether the full endpoint boundary binding admits both endpoint-boundary-binding reference carriers and endpoint value-map carriers.",
    required_fields: [
      "full_endpoint_boundary_binding_constructed",
      "carrier_admission_test_applied",
      ...CARRIER_OUTPUT_FIELDS,
    ],
  },
];

function parseArgs(argv) {
  const args = {
    valueMapPacket: DEFAULT_VALUE_MAP_PACKET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--value-map-packet") {
      args.valueMapPacket = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-binding-contract-full-binding-carrier-admission-construction-attempt.mjs [options]

Options:
  --value-map-packet PATH  Endpoint value-binding map packet JSON.
  --out-dir PATH           Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                 Pretty-print JSON artifact.
  --help                   Show this help.`);
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
    if (!row.id) {
      throw new Error(`Missing ${label} id.`);
    }
    if (map.has(row.id)) {
      throw new Error(`Duplicate ${label} id: ${row.id}`);
    }
    map.set(row.id, row);
  }
  return map;
}

function requireMapped(map, id, label) {
  const value = map.get(id);
  if (!value) {
    throw new Error(`Missing ${label}: ${id}`);
  }
  return value;
}

function assertSource(source) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected value-map packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected value-map fold-coordinate packet id: ${source.fold_coordinate_packet_id}`);
  }
  if (source.status !== SOURCE_STATUS) {
    throw new Error(`Unexpected value-map status: ${source.status}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger || source.row_closure) {
    throw new Error("Refusing contract/full-binding construction from authorized or row-closed source packet.");
  }
}

function methodResult(method, fields) {
  const missingFields = method.required_fields.filter((field) => fields[field] !== true);
  return {
    method_id: method.method_id,
    description: method.description,
    output_kind: method.output_kind,
    required_fields: method.required_fields,
    missing_fields: missingFields,
    failure_codes: missingFields.map((field) => `missing_contract_full_binding_carrier_${field}`),
    passed: missingFields.length === 0,
  };
}

function endpointFields(sourceEndpoint) {
  const sourceFields = sourceEndpoint.required_fields_present || {};
  const fields = {};
  for (const field of SOURCE_VALUE_MAP_FIELDS) {
    fields[field] = sourceFields[field] === true;
  }
  const valueMapReady =
    SOURCE_VALUE_MAP_FIELDS.every((field) => fields[field] === true) &&
    Boolean(sourceEndpoint.endpoint_value_binding_map_id) &&
    Boolean(sourceEndpoint.source_contract_target_id);
  fields.binding_contract_target_ref_inherited = valueMapReady;
  fields.binding_contract_satisfaction_test_applied = valueMapReady;
  fields.binding_contract_satisfied = false;
  fields.witness_object_has_contract_link = false;
  fields.full_endpoint_boundary_binding_construction_test_applied = valueMapReady;
  fields.carrier_admission_test_applied = valueMapReady;
  for (const field of FULL_BINDING_OUTPUT_FIELDS) {
    fields[field] = false;
  }
  for (const field of CARRIER_OUTPUT_FIELDS) {
    fields[field] = false;
  }
  return fields;
}

function buildEndpointAttempt(sourceEndpoint) {
  const fields = endpointFields(sourceEndpoint);
  const methodResults = CONSTRUCTION_METHODS.map((method) => methodResult(method, fields));
  const missingContractCriteria = CONTRACT_OUTPUT_FIELDS.filter((field) => fields[field] !== true);
  const missingFullBindingCriteria = FULL_BINDING_OUTPUT_FIELDS.filter((field) => fields[field] !== true);
  const missingCarrierCriteria = CARRIER_OUTPUT_FIELDS.filter((field) => fields[field] !== true);
  return {
    id: sourceEndpoint.id,
    endpoint_functional_id: sourceEndpoint.endpoint_functional_id,
    role: sourceEndpoint.role,
    binding_contract_full_binding_carrier_admission_attempt_id:
      `binding_contract_full_binding_carrier_admission_attempt:${sourceEndpoint.id}`,
    source_endpoint_value_binding_map_construction_attempt_id:
      sourceEndpoint.endpoint_value_binding_map_construction_attempt_id,
    source_endpoint_value_binding_map_id:
      sourceEndpoint.endpoint_value_binding_map_id,
    source_contract_target_id:
      sourceEndpoint.source_contract_target_id,
    source_first_endpoint_boundary_binding_primitive_id:
      sourceEndpoint.source_first_endpoint_boundary_binding_primitive_id,
    witness_object_endpoint_boundary_binding_ref_id:
      sourceEndpoint.witness_object_endpoint_boundary_binding_ref_id,
    source_target_endpoint_boundary_binding_object_id:
      sourceEndpoint.source_target_endpoint_boundary_binding_object_id,
    source_endpoint_value_binding_source_id:
      sourceEndpoint.source_endpoint_value_binding_source_id,
    source_witness_attempt_id:
      sourceEndpoint.source_witness_attempt_id,
    source_witness_object_attempt_id:
      sourceEndpoint.source_witness_object_attempt_id,
    domain_chart_carrier_subfield_id:
      sourceEndpoint.domain_chart_carrier_subfield_id,
    binding_symbol: sourceEndpoint.binding_symbol,
    witness_object_symbol: sourceEndpoint.witness_object_symbol,
    domain_symbol: sourceEndpoint.domain_symbol,
    chart_symbol: sourceEndpoint.chart_symbol,
    basis_symbol: sourceEndpoint.basis_symbol,
    target_endpoint_ref_value_count: sourceEndpoint.target_endpoint_ref_value_count,
    target_endpoint_value_binding_source_equations:
      sourceEndpoint.target_endpoint_value_binding_source_equations,
    required_fields_present: fields,
    construction_method_results: methodResults,
    construction_methods_passed:
      methodResults.filter((method) => method.passed).map((method) => method.method_id),
    binding_contract_satisfaction_test_applied:
      fields.binding_contract_satisfaction_test_applied,
    binding_contract_satisfied:
      fields.binding_contract_satisfied,
    witness_object_has_contract_link:
      fields.witness_object_has_contract_link,
    full_endpoint_boundary_binding_construction_test_applied:
      fields.full_endpoint_boundary_binding_construction_test_applied,
    full_endpoint_boundary_binding_constructed:
      fields.full_endpoint_boundary_binding_constructed,
    endpoint_boundary_binding_ref_carrier_unblocked:
      fields.endpoint_boundary_binding_ref_carrier_unblocked,
    endpoint_value_binding_map_carrier_unblocked:
      fields.endpoint_value_binding_map_carrier_unblocked,
    missing_contract_criteria: missingContractCriteria,
    missing_full_binding_criteria: missingFullBindingCriteria,
    missing_carrier_admission_criteria: missingCarrierCriteria,
    failure_codes: [
      ...missingContractCriteria.map((field) => `binding_contract_absent_${field}`),
      ...missingFullBindingCriteria.map((field) => `full_endpoint_boundary_binding_absent_${field}`),
      ...missingCarrierCriteria.map((field) => `carrier_admission_absent_${field}`),
    ],
    obstruction:
      "The endpoint value-binding map and inherited contract target reference are present, but the witness-object contract link, binding contract satisfaction, proof-grade full endpoint boundary binding, carrier admission, motion/evaluation, algebraic certificates, replay data, and row closure remain absent.",
  };
}

function buildRowAttempt(row, endpointById) {
  const sourceEndpoint = requireMapped(endpointById, row.source_variable, `source endpoint for ${row.row_id}`);
  const receiverEndpoint = requireMapped(endpointById, row.receiver_variable, `receiver endpoint for ${row.row_id}`);
  const fields = {
    row_locator_resolved: row.required_fields_present.row_locator_resolved === true,
    source_endpoint_value_binding_map_constructed:
      sourceEndpoint.required_fields_present.endpoint_value_binding_map_constructed === true,
    receiver_endpoint_value_binding_map_constructed:
      receiverEndpoint.required_fields_present.endpoint_value_binding_map_constructed === true,
    combined_endpoint_value_binding_map_pair_constructed: false,
    source_endpoint_value_bound_to_boundary_binding:
      sourceEndpoint.required_fields_present.endpoint_value_bound_to_boundary_binding === true,
    receiver_endpoint_value_bound_to_boundary_binding:
      receiverEndpoint.required_fields_present.endpoint_value_bound_to_boundary_binding === true,
    combined_endpoint_value_binding_pair_constructed: false,
    source_binding_contract_satisfaction_test_applied:
      sourceEndpoint.required_fields_present.binding_contract_satisfaction_test_applied === true,
    receiver_binding_contract_satisfaction_test_applied:
      receiverEndpoint.required_fields_present.binding_contract_satisfaction_test_applied === true,
    combined_binding_contract_satisfaction_test_pair_applied: false,
    source_binding_contract_satisfied:
      sourceEndpoint.required_fields_present.binding_contract_satisfied === true,
    receiver_binding_contract_satisfied:
      receiverEndpoint.required_fields_present.binding_contract_satisfied === true,
    combined_binding_contract_pair_satisfied: false,
    source_full_endpoint_boundary_binding_construction_test_applied:
      sourceEndpoint.required_fields_present.full_endpoint_boundary_binding_construction_test_applied === true,
    receiver_full_endpoint_boundary_binding_construction_test_applied:
      receiverEndpoint.required_fields_present.full_endpoint_boundary_binding_construction_test_applied === true,
    combined_full_endpoint_boundary_binding_construction_test_pair_applied: false,
    source_full_endpoint_boundary_binding_constructed:
      sourceEndpoint.required_fields_present.full_endpoint_boundary_binding_constructed === true,
    receiver_full_endpoint_boundary_binding_constructed:
      receiverEndpoint.required_fields_present.full_endpoint_boundary_binding_constructed === true,
    combined_full_endpoint_boundary_binding_pair_constructed: false,
    source_endpoint_boundary_binding_ref_carrier_unblocked:
      sourceEndpoint.required_fields_present.endpoint_boundary_binding_ref_carrier_unblocked === true,
    receiver_endpoint_boundary_binding_ref_carrier_unblocked:
      receiverEndpoint.required_fields_present.endpoint_boundary_binding_ref_carrier_unblocked === true,
    combined_endpoint_boundary_binding_ref_carrier_pair_unblocked: false,
    source_endpoint_value_binding_map_carrier_unblocked:
      sourceEndpoint.required_fields_present.endpoint_value_binding_map_carrier_unblocked === true,
    receiver_endpoint_value_binding_map_carrier_unblocked:
      receiverEndpoint.required_fields_present.endpoint_value_binding_map_carrier_unblocked === true,
    combined_endpoint_value_binding_map_carrier_pair_unblocked: false,
    combined_endpoint_evaluation_map_pair_constructed: false,
    residual_data_construction_ready: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_endpoint_value_binding_map_pair_constructed =
    fields.source_endpoint_value_binding_map_constructed &&
    fields.receiver_endpoint_value_binding_map_constructed;
  fields.combined_endpoint_value_binding_pair_constructed =
    fields.source_endpoint_value_bound_to_boundary_binding &&
    fields.receiver_endpoint_value_bound_to_boundary_binding;
  fields.combined_binding_contract_satisfaction_test_pair_applied =
    fields.source_binding_contract_satisfaction_test_applied &&
    fields.receiver_binding_contract_satisfaction_test_applied;
  fields.combined_binding_contract_pair_satisfied =
    fields.source_binding_contract_satisfied &&
    fields.receiver_binding_contract_satisfied;
  fields.combined_full_endpoint_boundary_binding_construction_test_pair_applied =
    fields.source_full_endpoint_boundary_binding_construction_test_applied &&
    fields.receiver_full_endpoint_boundary_binding_construction_test_applied;
  fields.combined_full_endpoint_boundary_binding_pair_constructed =
    fields.source_full_endpoint_boundary_binding_constructed &&
    fields.receiver_full_endpoint_boundary_binding_constructed;
  fields.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked =
    fields.source_endpoint_boundary_binding_ref_carrier_unblocked &&
    fields.receiver_endpoint_boundary_binding_ref_carrier_unblocked;
  fields.combined_endpoint_value_binding_map_carrier_pair_unblocked =
    fields.source_endpoint_value_binding_map_carrier_unblocked &&
    fields.receiver_endpoint_value_binding_map_carrier_unblocked;
  return {
    row_id: row.row_id,
    cover_id: row.cover_id,
    ledger: row.ledger,
    source_interval: row.source_interval,
    receiver_interval: row.receiver_interval,
    failed_side: row.failed_side,
    boundary_side: row.boundary_side,
    source_variable: row.source_variable,
    receiver_variable: row.receiver_variable,
    source_endpoint_value_binding_map_id:
      sourceEndpoint.source_endpoint_value_binding_map_id,
    receiver_endpoint_value_binding_map_id:
      receiverEndpoint.source_endpoint_value_binding_map_id,
    source_contract_target_id:
      sourceEndpoint.source_contract_target_id,
    receiver_contract_target_id:
      receiverEndpoint.source_contract_target_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver endpoint value-binding maps and contract/full-binding tests, but the source/receiver binding contracts, full endpoint boundary bindings, carrier admissions, motion/evaluation pair, residual data, replay, row consumption, and branch-chart authorization remain absent.",
  };
}

function fieldCounts(rows, fields, getter) {
  return Object.fromEntries(fields.map((field) => [field, countTrue(rows, (row) => getter(row, field))]));
}

function buildPacket(source, sourcePath) {
  assertSource(source);
  const endpointAttempts =
    source.endpoint_value_binding_map_construction_attempts.map(buildEndpointAttempt);
  const endpointById = idMap(endpointAttempts, "binding contract/full-binding/carrier-admission endpoint attempt");
  const rowAttempts =
    source.row_endpoint_value_binding_map_construction_attempts.map((row) => buildRowAttempt(row, endpointById));
  const endpointFieldCounts = fieldCounts(
    endpointAttempts,
    ENDPOINT_FIELDS,
    (endpoint, field) => endpoint.required_fields_present[field]
  );
  const rowFieldCounts = fieldCounts(rowAttempts, ROW_FIELDS, (row, field) => row.required_fields_present[field]);
  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-binding-contract-full-binding-carrier-admission-construction-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: STATUS,
    theorem_target: "Binding Contract, Full Endpoint Boundary-Binding, And Carrier Admission Construction Attempt",
    claim_level:
      "priority-only fail-closed construction attempt; endpoint value-binding maps and contract target refs are inherited for 4 / 4 endpoint functionals, but binding contract satisfaction, full endpoint boundary binding, carrier admission, motion/evaluation, replay, and row consumption remain absent",
    source_artifacts: {
      endpoint_value_binding_map_construction_attempt: artifactRecord(sourcePath),
      inherited_source_artifacts: source.source_artifacts,
    },
    branch_chart_authorized: false,
    preledger_pass: false,
    row_closure: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    authorization_lock: {
      endpoint_value_binding_maps_inherited: true,
      binding_contract_satisfaction_tests_applied: true,
      full_endpoint_boundary_binding_construction_tests_applied: true,
      binding_contracts_satisfied: false,
      full_endpoint_boundary_bindings_constructed: false,
      endpoint_boundary_binding_ref_carriers_unblocked: false,
      endpoint_value_binding_map_carriers_unblocked: false,
      row_unblocked: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    construction_rule:
      "A value map plus an inherited full endpoint boundary-binding contract target permits a fail-closed contract test: it may certify a binding contract only when the same witness object carries a contract link and every full-binding obligation is supplied in the same packet.",
    no_promotion_rule:
      "Endpoint value-binding maps and contract-target references are not binding contracts. They do not construct proof-grade full endpoint boundary bindings, admit reference/value-map carriers, build motion/evaluation maps, supply algebraic certificates, emit candidate artifacts, recertify topology, replay proof intervals, prepare residual data, or consume rows.",
    construction_methods: CONSTRUCTION_METHODS,
    source_value_map_fields: SOURCE_VALUE_MAP_FIELDS,
    contract_test_fields: CONTRACT_TEST_FIELDS,
    full_binding_test_fields: FULL_BINDING_TEST_FIELDS,
    carrier_admission_test_fields: CARRIER_ADMISSION_TEST_FIELDS,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_binding_contract_full_binding_carrier_admission_attempts: endpointAttempts,
    row_binding_contract_full_binding_carrier_admission_attempts: rowAttempts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      endpoint_value_binding_maps_inherited:
        endpointFieldCounts.endpoint_value_binding_map_constructed,
      endpoint_values_bound_to_boundary_bindings:
        endpointFieldCounts.endpoint_value_bound_to_boundary_binding,
      binding_contract_target_refs_inherited:
        endpointFieldCounts.binding_contract_target_ref_inherited,
      binding_contract_satisfaction_tests_applied:
        endpointFieldCounts.binding_contract_satisfaction_test_applied,
      binding_contracts_satisfied:
        endpointFieldCounts.binding_contract_satisfied,
      witness_object_contract_links_constructed:
        endpointFieldCounts.witness_object_has_contract_link,
      full_endpoint_boundary_binding_construction_tests_applied:
        endpointFieldCounts.full_endpoint_boundary_binding_construction_test_applied,
      full_endpoint_boundary_bindings_constructed:
        endpointFieldCounts.full_endpoint_boundary_binding_constructed,
      carrier_admission_tests_applied:
        endpointFieldCounts.carrier_admission_test_applied,
      endpoint_boundary_binding_ref_carriers_unblocked:
        endpointFieldCounts.endpoint_boundary_binding_ref_carrier_unblocked,
      endpoint_value_binding_map_carriers_unblocked:
        endpointFieldCounts.endpoint_value_binding_map_carrier_unblocked,
      row_endpoint_value_binding_map_pairs_inherited:
        rowFieldCounts.combined_endpoint_value_binding_map_pair_constructed,
      row_endpoint_value_binding_pairs_inherited:
        rowFieldCounts.combined_endpoint_value_binding_pair_constructed,
      row_binding_contract_satisfaction_test_pairs_applied:
        rowFieldCounts.combined_binding_contract_satisfaction_test_pair_applied,
      row_binding_contract_pairs_satisfied:
        rowFieldCounts.combined_binding_contract_pair_satisfied,
      row_full_endpoint_boundary_binding_construction_test_pairs_applied:
        rowFieldCounts.combined_full_endpoint_boundary_binding_construction_test_pair_applied,
      row_full_endpoint_boundary_binding_pairs_constructed:
        rowFieldCounts.combined_full_endpoint_boundary_binding_pair_constructed,
      row_endpoint_boundary_binding_ref_carrier_pairs_unblocked:
        rowFieldCounts.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked,
      row_endpoint_value_binding_map_carrier_pairs_unblocked:
        rowFieldCounts.combined_endpoint_value_binding_map_carrier_pair_unblocked,
      row_residual_data_ready:
        rowFieldCounts.residual_data_construction_ready,
      rows_unblocked:
        rowFieldCounts.row_unblocked,
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    capture_decision:
      "Priority-only. This packet applies the contract/full-binding/carrier-admission test to 4 / 4 endpoint value-binding maps and 3 / 3 row value-binding pairs. It finds 0 / 4 satisfied binding contracts, 0 / 4 full endpoint boundary bindings, 0 / 4 admitted endpoint-boundary-binding reference carriers, 0 / 4 admitted endpoint value-map carriers, 0 residual-data-ready rows, no preledger pass, no live-ledger update, no branch-chart authorization, and no row consumption.",
  };
}

function sourceTable(sourceArtifacts) {
  return Object.entries(sourceArtifacts)
    .filter(([_label, artifact]) => artifact?.basename && artifact?.sha256)
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
        `| \`${method.method_id}\` | \`${method.output_kind}\` | ${method.required_fields.length} | ${method.description} |`
    )
    .join("\n");
}

function endpointTable(endpoints) {
  return endpoints
    .map(
      (endpoint) =>
        `| \`${endpoint.id}\` | \`${endpoint.role}\` | ${endpoint.required_fields_present.endpoint_value_binding_map_constructed} | ${endpoint.required_fields_present.binding_contract_target_ref_inherited} | ${endpoint.required_fields_present.binding_contract_satisfaction_test_applied} | ${endpoint.required_fields_present.binding_contract_satisfied} | ${endpoint.required_fields_present.full_endpoint_boundary_binding_construction_test_applied} | ${endpoint.required_fields_present.full_endpoint_boundary_binding_constructed} | ${endpoint.required_fields_present.endpoint_boundary_binding_ref_carrier_unblocked} | ${endpoint.required_fields_present.endpoint_value_binding_map_carrier_unblocked} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.combined_endpoint_value_binding_pair_constructed} | ${row.required_fields_present.combined_binding_contract_satisfaction_test_pair_applied} | ${row.required_fields_present.combined_binding_contract_pair_satisfied} | ${row.required_fields_present.combined_full_endpoint_boundary_binding_construction_test_pair_applied} | ${row.required_fields_present.combined_full_endpoint_boundary_binding_pair_constructed} | ${row.required_fields_present.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked} | ${row.row_consumed} |`
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
  return `# Higher-Fold Endpoint-Functional Binding Contract / Full Binding / Carrier Admission Construction Attempt

## Verdict

Status: \`${packet.status}\`.

This priority-only packet continues after the endpoint value-binding map
construction attempt. It imports ${summary.endpoint_value_binding_maps_inherited} / ${summary.endpoint_functionals}
endpoint value-binding maps, inherits ${summary.binding_contract_target_refs_inherited} / ${summary.endpoint_functionals}
contract-target references, and applies ${summary.binding_contract_satisfaction_tests_applied} / ${summary.endpoint_functionals}
binding-contract satisfaction tests plus ${summary.full_endpoint_boundary_binding_construction_tests_applied} / ${summary.endpoint_functionals}
full endpoint boundary-binding construction tests.

The packet remains fail-closed for contract satisfaction, full binding, carrier
admission, and row closure. It satisfies ${summary.binding_contracts_satisfied} / ${summary.endpoint_functionals}
binding contracts, constructs ${summary.full_endpoint_boundary_bindings_constructed} / ${summary.endpoint_functionals}
full endpoint boundary bindings, unblocks ${summary.endpoint_boundary_binding_ref_carriers_unblocked} / ${summary.endpoint_functionals}
endpoint-boundary-binding reference carriers, unblocks
${summary.endpoint_value_binding_map_carriers_unblocked} / ${summary.endpoint_functionals} endpoint value-map carriers, and consumes
${summary.row_consumption_count} rows.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${sourceTable(packet.source_artifacts)}

## Construction Rule

${packet.construction_rule}

${packet.no_promotion_rule}

## Construction Methods

| Method | Output kind | Required fields | Description |
| --- | --- | ---: | --- |
${methodTable(packet.construction_methods)}

## Endpoint Construction Attempts

| Endpoint | Role | Value map | Contract target | Contract test | Contract | Full-binding test | Full binding | Ref carrier | Value-map carrier |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${endpointTable(packet.endpoint_binding_contract_full_binding_carrier_admission_attempts)}

## Row Construction Attempts

| Row | Failed side | Value-binding pair | Contract-test pair | Contract pair | Full-binding-test pair | Full-binding pair | Ref-carrier pair | Consumed |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_binding_contract_full_binding_carrier_admission_attempts)}

## Endpoint Field Counts

| Field | Count |
| --- | ---: |
${countTable(packet.endpoint_field_counts, summary.endpoint_functionals)}

## Row Field Counts

| Field | Count |
| --- | ---: |
${countTable(packet.row_field_counts, summary.residual_consumer_rows)}

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
  const source = readJson(args.valueMapPacket);
  const packet = buildPacket(source, args.valueMapPacket);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, packet, args.pretty);
  writeText(outputReportPath, buildReport(packet));
  console.log(`Wrote ${outputJsonPath}`);
  console.log(`Wrote ${outputReportPath}`);
}

main();

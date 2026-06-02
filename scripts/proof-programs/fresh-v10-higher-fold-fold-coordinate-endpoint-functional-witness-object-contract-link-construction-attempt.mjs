#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_CONTRACT_FULL_BINDING_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_binding_contract_full_binding_carrier_admission_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_witness_object_contract_link_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_witness_object_contract_link_construction_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const SOURCE_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-binding-contract-full-binding-carrier-admission-construction-attempt-fail-closed-value-maps-inherited-contract-full-binding-carrier-admission-absent-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-witness-object-contract-link-construction-attempt-fail-closed-contract-link-source-candidates-present-witness-object-contract-links-absent-no-row-consumption";

const SOURCE_READY_FIELDS = [
  "endpoint_boundary_binding_constructed",
  "witness_object_has_endpoint_boundary_binding_ref",
  "endpoint_value_binding_map_constructed",
  "witness_object_has_endpoint_value_binding_map",
  "endpoint_value_bound_to_boundary_binding",
  "endpoint_value_binding_map_targets_first_primitive",
  "endpoint_value_binding_map_ref_values_certified",
  "binding_contract_target_ref_inherited",
  "binding_contract_satisfaction_test_applied",
];

const CONTRACT_LINK_SOURCE_ID_FIELDS = [
  "source_endpoint_value_binding_map_id_present",
  "source_contract_target_id_present",
  "witness_object_endpoint_boundary_binding_ref_id_present",
  "source_witness_object_attempt_id_present",
  "source_first_endpoint_boundary_binding_primitive_id_present",
  "target_endpoint_value_binding_source_equations_present",
];

const CONTRACT_LINK_SOURCE_CANDIDATE_FIELDS = [
  "witness_object_contract_link_input_ready",
  "witness_object_contract_link_source_candidate_declared",
  "witness_object_contract_link_source_candidate_targets_contract_target",
  "witness_object_contract_link_source_candidate_targets_endpoint_value_binding_map",
  "witness_object_contract_link_source_candidate_targets_endpoint_boundary_binding_ref",
  "witness_object_contract_link_source_candidate_targets_witness_object_attempt",
  "witness_object_contract_link_source_candidate_value_equations_attached",
  "witness_object_contract_link_source_candidate_recorded",
];

const CONTRACT_LINK_OUTPUT_FIELDS = [
  "witness_object_contract_link_constructed",
  "witness_object_has_contract_link",
];

const CONTRACT_SATISFACTION_FIELDS = [
  "binding_contract_satisfaction_test_applied",
  "binding_contract_satisfied",
];

const FULL_BINDING_OUTPUT_FIELDS = [
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

const TEST_FIELDS = [
  "full_endpoint_boundary_binding_construction_test_applied",
  "carrier_admission_test_applied",
];

const ENDPOINT_FIELDS = [
  ...SOURCE_READY_FIELDS,
  ...CONTRACT_LINK_SOURCE_ID_FIELDS,
  ...CONTRACT_LINK_SOURCE_CANDIDATE_FIELDS,
  ...CONTRACT_LINK_OUTPUT_FIELDS,
  ...CONTRACT_SATISFACTION_FIELDS,
  ...TEST_FIELDS,
  ...FULL_BINDING_OUTPUT_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_endpoint_value_binding_map_constructed",
  "receiver_endpoint_value_binding_map_constructed",
  "combined_endpoint_value_binding_map_pair_constructed",
  "source_endpoint_value_bound_to_boundary_binding",
  "receiver_endpoint_value_bound_to_boundary_binding",
  "combined_endpoint_value_binding_pair_constructed",
  "source_witness_object_contract_link_source_candidate_recorded",
  "receiver_witness_object_contract_link_source_candidate_recorded",
  "combined_witness_object_contract_link_source_candidate_pair_recorded",
  "source_witness_object_contract_link_constructed",
  "receiver_witness_object_contract_link_constructed",
  "combined_witness_object_contract_link_pair_constructed",
  "source_witness_object_has_contract_link",
  "receiver_witness_object_has_contract_link",
  "combined_witness_object_contract_link_pair_attached",
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
    method_id: "contract_link_source_ready",
    output_kind: "input-readiness",
    description:
      "Check that the endpoint has the value map, witness-object boundary-binding ref, contract-target ref, witness-object attempt, first primitive, and target ref/value equations needed to record a contract-link source candidate.",
    required_fields: [
      ...SOURCE_READY_FIELDS,
      ...CONTRACT_LINK_SOURCE_ID_FIELDS,
    ],
  },
  {
    method_id: "witness_object_contract_link_source_candidate_recording",
    output_kind: "witness-object-contract-link-source-candidate",
    description:
      "Record a source-candidate object that relates the witness object to the inherited contract target, endpoint value-binding map, endpoint-boundary-binding ref, and target ref/value equations without promoting it to a proof-grade contract link.",
    required_fields: [
      "witness_object_contract_link_input_ready",
      "witness_object_contract_link_source_candidate_declared",
      "witness_object_contract_link_source_candidate_targets_contract_target",
      "witness_object_contract_link_source_candidate_targets_endpoint_value_binding_map",
      "witness_object_contract_link_source_candidate_targets_endpoint_boundary_binding_ref",
      "witness_object_contract_link_source_candidate_targets_witness_object_attempt",
      "witness_object_contract_link_source_candidate_value_equations_attached",
      "witness_object_contract_link_source_candidate_recorded",
    ],
  },
  {
    method_id: "source_candidate_as_witness_object_contract_link",
    output_kind: "witness-object-contract-link",
    description:
      "Test whether the source-candidate record also supplies an actual witness-object contract link.",
    required_fields: [
      "witness_object_contract_link_source_candidate_recorded",
      "witness_object_contract_link_constructed",
      "witness_object_has_contract_link",
    ],
  },
  {
    method_id: "contract_link_as_binding_contract_satisfaction",
    output_kind: "binding-contract",
    description:
      "Test whether the constructed contract link also proves that the endpoint value-binding map satisfies the full endpoint boundary-binding contract.",
    required_fields: [
      "witness_object_contract_link_constructed",
      "witness_object_has_contract_link",
      "binding_contract_satisfaction_test_applied",
      "binding_contract_satisfied",
    ],
  },
  {
    method_id: "contract_link_as_full_endpoint_boundary_binding",
    output_kind: "full-endpoint-boundary-binding",
    description:
      "Test whether the contract link also supplies proof-grade full endpoint boundary binding, carrier admission, motion/evaluation, algebraic certificates, artifacts, topology recertification, and proof replay.",
    required_fields: [
      "witness_object_contract_link_constructed",
      "binding_contract_satisfied",
      "full_endpoint_boundary_binding_construction_test_applied",
      ...FULL_BINDING_OUTPUT_FIELDS,
    ],
  },
];

function parseArgs(argv) {
  const args = {
    contractFullBindingPacket: DEFAULT_CONTRACT_FULL_BINDING_PACKET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--contract-full-binding-packet") {
      args.contractFullBindingPacket = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-witness-object-contract-link-construction-attempt.mjs [options]

Options:
  --contract-full-binding-packet PATH  Binding contract/full-binding/carrier-admission packet JSON.
  --out-dir PATH                       Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                             Pretty-print JSON artifact.
  --help                               Show this help.`);
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
    throw new Error(`Unexpected contract/full-binding packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected fold-coordinate packet id: ${source.fold_coordinate_packet_id}`);
  }
  if (source.status !== SOURCE_STATUS) {
    throw new Error(`Unexpected contract/full-binding status: ${source.status}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger || source.row_closure) {
    throw new Error("Refusing contract-link construction from authorized or row-closed source packet.");
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
    failure_codes: missingFields.map((field) => `missing_contract_link_${field}`),
    passed: missingFields.length === 0,
  };
}

function endpointFields(sourceEndpoint) {
  const sourceFields = sourceEndpoint.required_fields_present || {};
  const fields = {};
  for (const field of SOURCE_READY_FIELDS) {
    fields[field] = sourceFields[field] === true;
  }
  fields.source_endpoint_value_binding_map_id_present =
    Boolean(sourceEndpoint.source_endpoint_value_binding_map_id);
  fields.source_contract_target_id_present =
    Boolean(sourceEndpoint.source_contract_target_id);
  fields.witness_object_endpoint_boundary_binding_ref_id_present =
    Boolean(sourceEndpoint.witness_object_endpoint_boundary_binding_ref_id);
  fields.source_witness_object_attempt_id_present =
    Boolean(sourceEndpoint.source_witness_object_attempt_id);
  fields.source_first_endpoint_boundary_binding_primitive_id_present =
    Boolean(sourceEndpoint.source_first_endpoint_boundary_binding_primitive_id);
  fields.target_endpoint_value_binding_source_equations_present =
    Array.isArray(sourceEndpoint.target_endpoint_value_binding_source_equations) &&
    sourceEndpoint.target_endpoint_value_binding_source_equations.length > 0;

  const contractLinkInputReady =
    [...SOURCE_READY_FIELDS, ...CONTRACT_LINK_SOURCE_ID_FIELDS]
      .every((field) => fields[field] === true);

  fields.witness_object_contract_link_input_ready = contractLinkInputReady;
  fields.witness_object_contract_link_source_candidate_declared = contractLinkInputReady;
  fields.witness_object_contract_link_source_candidate_targets_contract_target = contractLinkInputReady;
  fields.witness_object_contract_link_source_candidate_targets_endpoint_value_binding_map = contractLinkInputReady;
  fields.witness_object_contract_link_source_candidate_targets_endpoint_boundary_binding_ref = contractLinkInputReady;
  fields.witness_object_contract_link_source_candidate_targets_witness_object_attempt = contractLinkInputReady;
  fields.witness_object_contract_link_source_candidate_value_equations_attached = contractLinkInputReady;
  fields.witness_object_contract_link_source_candidate_recorded = contractLinkInputReady;
  fields.witness_object_contract_link_constructed = false;
  fields.witness_object_has_contract_link = false;

  fields.binding_contract_satisfaction_test_applied =
    sourceFields.binding_contract_satisfaction_test_applied === true;
  fields.binding_contract_satisfied = false;
  fields.full_endpoint_boundary_binding_construction_test_applied =
    sourceFields.full_endpoint_boundary_binding_construction_test_applied === true;
  fields.carrier_admission_test_applied =
    sourceFields.carrier_admission_test_applied === true;
  for (const field of FULL_BINDING_OUTPUT_FIELDS) {
    fields[field] = false;
  }
  return fields;
}

function buildContractLinkSourceCandidate(sourceEndpoint, fields) {
  if (!fields.witness_object_contract_link_source_candidate_recorded) {
    return null;
  }
  return {
    source_candidate_id: `witness_object_contract_link_source_candidate:${sourceEndpoint.id}`,
    source_candidate_kind: "witness_object_contract_link_source_candidate_to_full_endpoint_boundary_binding_contract_target",
    endpoint_functional_id: sourceEndpoint.endpoint_functional_id,
    role: sourceEndpoint.role,
    witness_object_symbol: sourceEndpoint.witness_object_symbol,
    binding_symbol: sourceEndpoint.binding_symbol,
    source_witness_object_attempt_id: sourceEndpoint.source_witness_object_attempt_id,
    contract_target_id: sourceEndpoint.source_contract_target_id,
    endpoint_value_binding_map_id: sourceEndpoint.source_endpoint_value_binding_map_id,
    witness_object_endpoint_boundary_binding_ref_id:
      sourceEndpoint.witness_object_endpoint_boundary_binding_ref_id,
    first_endpoint_boundary_binding_primitive_id:
      sourceEndpoint.source_first_endpoint_boundary_binding_primitive_id,
    target_endpoint_ref_value_count: sourceEndpoint.target_endpoint_ref_value_count,
    target_endpoint_value_binding_source_equations:
      sourceEndpoint.target_endpoint_value_binding_source_equations,
    constructed_fields: [
      "witness_object_contract_link_source_candidate_declared",
      "witness_object_contract_link_source_candidate_targets_contract_target",
      "witness_object_contract_link_source_candidate_targets_endpoint_value_binding_map",
      "witness_object_contract_link_source_candidate_targets_endpoint_boundary_binding_ref",
      "witness_object_contract_link_source_candidate_targets_witness_object_attempt",
      "witness_object_contract_link_source_candidate_value_equations_attached",
      "witness_object_contract_link_source_candidate_recorded",
    ],
    fields_not_constructed: [
      "witness_object_contract_link_constructed",
      "witness_object_has_contract_link",
      "binding_contract_satisfied",
      ...FULL_BINDING_OUTPUT_FIELDS,
    ],
    proof_grade_binding_status:
      "contract-link-source-candidate-recorded-witness-object-contract-link-absent",
    soundness_limit:
      "This source candidate attaches IDs and value equations that would be needed for a contract link. It is not a constructed witness-object contract link, not a proof that the contract is satisfied, not a full endpoint boundary binding, and not a carrier-admission certificate.",
  };
}

function buildEndpointAttempt(sourceEndpoint) {
  const fields = endpointFields(sourceEndpoint);
  const contractLinkSourceCandidate = buildContractLinkSourceCandidate(sourceEndpoint, fields);
  const methodResults = CONSTRUCTION_METHODS.map((method) => methodResult(method, fields));
  const missingContractCriteria = [
    "witness_object_contract_link_constructed",
    "witness_object_has_contract_link",
    "binding_contract_satisfied",
  ]
    .filter((field) => fields[field] !== true);
  const missingFullBindingCriteria = FULL_BINDING_OUTPUT_FIELDS
    .filter((field) => fields[field] !== true);
  const missingCarrierCriteria = [
    "endpoint_boundary_binding_ref_carrier_unblocked",
    "endpoint_value_binding_map_carrier_unblocked",
  ].filter((field) => fields[field] !== true);
  return {
    id: sourceEndpoint.id,
    endpoint_functional_id: sourceEndpoint.endpoint_functional_id,
    role: sourceEndpoint.role,
    witness_object_contract_link_construction_attempt_id:
      `witness_object_contract_link_construction_attempt:${sourceEndpoint.id}`,
    source_binding_contract_full_binding_carrier_admission_attempt_id:
      sourceEndpoint.binding_contract_full_binding_carrier_admission_attempt_id,
    source_endpoint_value_binding_map_construction_attempt_id:
      sourceEndpoint.source_endpoint_value_binding_map_construction_attempt_id,
    source_endpoint_value_binding_map_id:
      sourceEndpoint.source_endpoint_value_binding_map_id,
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
    witness_object_contract_link_source_candidate: contractLinkSourceCandidate,
    witness_object_contract_link: null,
    required_fields_present: fields,
    construction_method_results: methodResults,
    construction_methods_passed:
      methodResults.filter((method) => method.passed).map((method) => method.method_id),
    witness_object_contract_link_source_candidate_recorded:
      fields.witness_object_contract_link_source_candidate_recorded,
    witness_object_contract_link_constructed:
      fields.witness_object_contract_link_constructed,
    witness_object_has_contract_link:
      fields.witness_object_has_contract_link,
    binding_contract_satisfaction_test_applied:
      fields.binding_contract_satisfaction_test_applied,
    binding_contract_satisfied:
      fields.binding_contract_satisfied,
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
      ...missingContractCriteria.map((field) => `witness_object_contract_link_locked_${field}`),
      ...missingFullBindingCriteria.map((field) => `full_endpoint_boundary_binding_locked_${field}`),
      ...missingCarrierCriteria.map((field) => `carrier_admission_locked_${field}`),
    ],
    obstruction:
      "The witness-object contract-link source candidate is recorded from source IDs and value equations, but the witness-object contract link, binding contract satisfaction, proof-grade full endpoint boundary binding, carrier admission, motion/evaluation, algebraic certificates, replay data, and row closure remain absent.",
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
    source_witness_object_contract_link_source_candidate_recorded:
      sourceEndpoint.required_fields_present.witness_object_contract_link_source_candidate_recorded === true,
    receiver_witness_object_contract_link_source_candidate_recorded:
      receiverEndpoint.required_fields_present.witness_object_contract_link_source_candidate_recorded === true,
    combined_witness_object_contract_link_source_candidate_pair_recorded: false,
    source_witness_object_contract_link_constructed:
      sourceEndpoint.required_fields_present.witness_object_contract_link_constructed === true,
    receiver_witness_object_contract_link_constructed:
      receiverEndpoint.required_fields_present.witness_object_contract_link_constructed === true,
    combined_witness_object_contract_link_pair_constructed: false,
    source_witness_object_has_contract_link:
      sourceEndpoint.required_fields_present.witness_object_has_contract_link === true,
    receiver_witness_object_has_contract_link:
      receiverEndpoint.required_fields_present.witness_object_has_contract_link === true,
    combined_witness_object_contract_link_pair_attached: false,
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
  fields.combined_witness_object_contract_link_source_candidate_pair_recorded =
    fields.source_witness_object_contract_link_source_candidate_recorded &&
    fields.receiver_witness_object_contract_link_source_candidate_recorded;
  fields.combined_witness_object_contract_link_pair_constructed =
    fields.source_witness_object_contract_link_constructed &&
    fields.receiver_witness_object_contract_link_constructed;
  fields.combined_witness_object_contract_link_pair_attached =
    fields.source_witness_object_has_contract_link &&
    fields.receiver_witness_object_has_contract_link;
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
    source_witness_object_contract_link_source_candidate_id:
      `witness_object_contract_link_source_candidate:${sourceEndpoint.id}`,
    receiver_witness_object_contract_link_source_candidate_id:
      `witness_object_contract_link_source_candidate:${receiverEndpoint.id}`,
    source_witness_object_contract_link_id: null,
    receiver_witness_object_contract_link_id: null,
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
      "The row has source/receiver witness-object contract-link source candidates, endpoint value-binding maps, and contract/full-binding tests, but the source/receiver witness-object contract links, binding contracts, full endpoint boundary bindings, carrier admissions, motion/evaluation pair, residual data, replay, row consumption, and branch-chart authorization remain absent.",
  };
}

function fieldCounts(rows, fields, getter) {
  return Object.fromEntries(fields.map((field) => [field, countTrue(rows, (row) => getter(row, field))]));
}

function buildPacket(source, sourcePath) {
  assertSource(source);
  const endpointAttempts =
    source.endpoint_binding_contract_full_binding_carrier_admission_attempts.map(buildEndpointAttempt);
  const endpointById = idMap(endpointAttempts, "witness-object contract-link endpoint attempt");
  const rowAttempts =
    source.row_binding_contract_full_binding_carrier_admission_attempts.map((row) => buildRowAttempt(row, endpointById));
  const endpointFieldCounts = fieldCounts(
    endpointAttempts,
    ENDPOINT_FIELDS,
    (endpoint, field) => endpoint.required_fields_present[field]
  );
  const rowFieldCounts = fieldCounts(rowAttempts, ROW_FIELDS, (row, field) => row.required_fields_present[field]);
  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-witness-object-contract-link-construction-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: STATUS,
    theorem_target: "Witness-Object Contract-Link Construction Attempt",
    claim_level:
      "priority-only fail-closed construction attempt; 4 / 4 witness-object contract-link source candidates are recorded from endpoint value-binding maps, contract-target refs, endpoint-boundary-binding refs, witness-object attempt IDs, and target ref/value equations, but actual witness-object contract links, binding contract satisfaction, full endpoint boundary binding, carrier admission, motion/evaluation, replay, and row consumption remain absent",
    source_artifacts: {
      binding_contract_full_binding_carrier_admission_construction_attempt:
        artifactRecord(sourcePath),
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
      witness_object_contract_link_source_candidates_recorded: true,
      witness_object_contract_links_constructed: false,
      binding_contracts_satisfied: false,
      full_endpoint_boundary_bindings_constructed: false,
      endpoint_boundary_binding_ref_carriers_unblocked: false,
      endpoint_value_binding_map_carriers_unblocked: false,
      row_unblocked: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    construction_rule:
      "A witness-object contract-link source candidate may be recorded when the same endpoint supplies a value-binding map, an inherited full endpoint boundary-binding contract target, a witness-object endpoint-boundary-binding ref, a witness-object attempt ID, a first primitive ID, and attached target ref/value equations.",
    no_promotion_rule:
      "A witness-object contract-link source candidate is not a witness-object contract link and is not binding contract satisfaction. It does not construct a proof-grade full endpoint boundary binding, admit reference/value-map carriers, build motion/evaluation maps, supply algebraic certificates, emit candidate artifacts, recertify topology, replay proof intervals, prepare residual data, or consume rows.",
    construction_methods: CONSTRUCTION_METHODS,
    source_ready_fields: SOURCE_READY_FIELDS,
    contract_link_source_id_fields: CONTRACT_LINK_SOURCE_ID_FIELDS,
    contract_link_source_candidate_fields: CONTRACT_LINK_SOURCE_CANDIDATE_FIELDS,
    contract_link_output_fields: CONTRACT_LINK_OUTPUT_FIELDS,
    contract_satisfaction_fields: CONTRACT_SATISFACTION_FIELDS,
    full_binding_output_fields: FULL_BINDING_OUTPUT_FIELDS,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_witness_object_contract_link_construction_attempts: endpointAttempts,
    row_witness_object_contract_link_construction_attempts: rowAttempts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      endpoint_value_binding_maps_inherited:
        endpointFieldCounts.endpoint_value_binding_map_constructed,
      endpoint_values_bound_to_boundary_bindings:
        endpointFieldCounts.endpoint_value_bound_to_boundary_binding,
      binding_contract_target_refs_inherited:
        endpointFieldCounts.binding_contract_target_ref_inherited,
      witness_object_contract_link_inputs_ready:
        endpointFieldCounts.witness_object_contract_link_input_ready,
      witness_object_contract_link_source_candidates_declared:
        endpointFieldCounts.witness_object_contract_link_source_candidate_declared,
      witness_object_contract_link_source_candidates_recorded:
        endpointFieldCounts.witness_object_contract_link_source_candidate_recorded,
      witness_object_contract_links_constructed:
        endpointFieldCounts.witness_object_contract_link_constructed,
      witness_object_contract_links_attached:
        endpointFieldCounts.witness_object_has_contract_link,
      contract_link_source_candidate_value_equation_sets_attached:
        endpointFieldCounts.witness_object_contract_link_source_candidate_value_equations_attached,
      binding_contract_satisfaction_tests_applied:
        endpointFieldCounts.binding_contract_satisfaction_test_applied,
      binding_contracts_satisfied:
        endpointFieldCounts.binding_contract_satisfied,
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
      row_witness_object_contract_link_source_candidate_pairs_recorded:
        rowFieldCounts.combined_witness_object_contract_link_source_candidate_pair_recorded,
      row_witness_object_contract_link_pairs_constructed:
        rowFieldCounts.combined_witness_object_contract_link_pair_constructed,
      row_witness_object_contract_link_pairs_attached:
        rowFieldCounts.combined_witness_object_contract_link_pair_attached,
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
      "Priority-only. This packet records 4 / 4 witness-object contract-link source candidates and 3 / 3 row source-candidate pairs from existing endpoint value-binding maps, contract targets, witness-object refs, and value equations. It keeps 0 / 4 constructed witness-object contract links, 0 / 4 satisfied binding contracts, 0 / 4 full endpoint boundary bindings, 0 / 4 admitted endpoint-boundary-binding reference carriers, 0 / 4 admitted endpoint value-map carriers, 0 residual-data-ready rows, no preledger pass, no live-ledger update, no branch-chart authorization, and no row consumption.",
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
        `| \`${endpoint.id}\` | \`${endpoint.role}\` | ${endpoint.required_fields_present.witness_object_contract_link_input_ready} | ${endpoint.required_fields_present.witness_object_contract_link_source_candidate_recorded} | ${endpoint.required_fields_present.witness_object_contract_link_constructed} | ${endpoint.required_fields_present.witness_object_has_contract_link} | ${endpoint.required_fields_present.binding_contract_satisfaction_test_applied} | ${endpoint.required_fields_present.binding_contract_satisfied} | ${endpoint.required_fields_present.full_endpoint_boundary_binding_construction_test_applied} | ${endpoint.required_fields_present.full_endpoint_boundary_binding_constructed} | ${endpoint.required_fields_present.endpoint_boundary_binding_ref_carrier_unblocked} | ${endpoint.required_fields_present.endpoint_value_binding_map_carrier_unblocked} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.combined_witness_object_contract_link_source_candidate_pair_recorded} | ${row.required_fields_present.combined_witness_object_contract_link_pair_constructed} | ${row.required_fields_present.combined_binding_contract_satisfaction_test_pair_applied} | ${row.required_fields_present.combined_binding_contract_pair_satisfied} | ${row.required_fields_present.combined_full_endpoint_boundary_binding_construction_test_pair_applied} | ${row.required_fields_present.combined_full_endpoint_boundary_binding_pair_constructed} | ${row.required_fields_present.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked} | ${row.row_consumed} |`
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
  return `# Higher-Fold Endpoint-Functional Witness-Object Contract-Link Construction Attempt

## Verdict

Status: \`${packet.status}\`.

This priority-only packet continues after the binding contract/full-binding/
carrier-admission construction attempt. It imports ${summary.endpoint_value_binding_maps_inherited} / ${summary.endpoint_functionals}
endpoint value-binding maps, inherits ${summary.binding_contract_target_refs_inherited} / ${summary.endpoint_functionals}
contract-target references, and records ${summary.witness_object_contract_link_source_candidates_recorded} / ${summary.endpoint_functionals}
witness-object contract-link source candidates from the available
witness-object refs and target ref/value equations.

The packet remains fail-closed for contract satisfaction, full binding, carrier
admission, and row closure. It constructs ${summary.witness_object_contract_links_constructed} / ${summary.endpoint_functionals}
witness-object contract links, satisfies ${summary.binding_contracts_satisfied} / ${summary.endpoint_functionals}
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

## Endpoint Contract-Link Attempts

| Endpoint | Role | Candidate input | Candidate recorded | Link constructed | Link attached | Contract test | Contract | Full-binding test | Full binding | Ref carrier | Value-map carrier |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${endpointTable(packet.endpoint_witness_object_contract_link_construction_attempts)}

## Row Contract-Link Attempts

| Row | Failed side | Source-candidate pair | Contract-link pair | Contract-test pair | Contract pair | Full-binding-test pair | Full-binding pair | Ref-carrier pair | Consumed |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_witness_object_contract_link_construction_attempts)}

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
  const source = readJson(args.contractFullBindingPacket);
  const packet = buildPacket(source, args.contractFullBindingPacket);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, packet, args.pretty);
  writeText(outputReportPath, buildReport(packet));
  console.log(`Wrote ${outputJsonPath}`);
  console.log(`Wrote ${outputReportPath}`);
}

main();

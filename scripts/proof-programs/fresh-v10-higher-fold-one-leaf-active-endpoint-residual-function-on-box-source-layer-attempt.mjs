#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_RESIDUAL_SOURCE_DATA_AUDIT = `${CERT_DIR}/one_leaf_active_endpoint_residual_source_data_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_RESIDUAL_DATA_ATTEMPT = `${CERT_DIR}/one_leaf_active_endpoint_residual_data_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_INTERVAL_BOX_ATTEMPT = `${CERT_DIR}/one_leaf_active_endpoint_interval_box_no_switch_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_PROOF_DATA_ATTEMPT = `${CERT_DIR}/one_leaf_active_endpoint_interval_enclosure_proof_data_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_VALUE_BINDING_SOURCE_LAYER = `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_value_binding_source_layer.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_WITNESS_OBJECT_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_witness_object_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `one_leaf_active_endpoint_residual_function_on_box_source_layer_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `one_leaf_active_endpoint_residual_function_on_box_source_layer_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const STATUS =
  "one_leaf_active_endpoint_residual_function_on_box_source_layer_attempt_fail_closed_formula_inputs_present_box_residual_functions_absent_no_row_consumption";

const SOURCE_STATUSES = {
  residualSourceDataAudit:
    "one_leaf_active_endpoint_residual_source_data_audit_fail_closed_source_samples_present_residual_functions_absent_no_row_consumption",
  residualDataAttempt:
    "one_leaf_active_endpoint_residual_data_construction_attempt_fail_closed_endpoint_functional_sources_only_no_row_residual_functions_no_row_consumption",
  intervalBoxAttempt:
    "one_leaf_active_endpoint_interval_box_no_switch_construction_attempt_fail_closed_no_interval_boxes_no_switch_no_row_consumption",
  proofDataAttempt:
    "one_leaf_active_endpoint_interval_enclosure_proof_data_construction_attempt_fail_closed_source_inputs_present_proof_data_absent_no_row_consumption",
  valueBindingSourceLayer:
    "priority-only-fold-coordinate-endpoint-functional-endpoint-value-binding-source-layer-fail-closed-source-equations-present-proof-grade-boundary-bindings-absent-no-row-consumption",
  witnessObjectAttempt:
    "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-construction-attempt-fail-closed-witness-inputs-present-object-binding-value-contract-motion-evaluation-replay-absent-no-row-consumption",
};

const TARGET_FIELDS = [
  "residual_function_on_box_source_layer_target_declared",
  "source_endpoint_residual_formula_target_declared",
  "receiver_endpoint_residual_formula_target_declared",
  "source_endpoint_interval_box_domain_target_declared",
  "receiver_endpoint_interval_box_domain_target_declared",
  "source_endpoint_evaluation_rule_target_declared",
  "receiver_endpoint_evaluation_rule_target_declared",
  "source_endpoint_motion_rule_target_declared",
  "receiver_endpoint_motion_rule_target_declared",
  "source_residual_derivative_formula_target_declared",
  "receiver_residual_derivative_formula_target_declared",
  "source_residual_outward_rounding_rule_target_declared",
  "receiver_residual_outward_rounding_rule_target_declared",
  "source_endpoint_residual_interval_bound_target_declared",
  "receiver_endpoint_residual_interval_bound_target_declared",
  "no_switch_replay_target_declared",
  "proof_interval_replay_target_declared",
];

const ROW_FIELDS = [
  "candidate_lambda_interval_declared",
  "candidate_lambda_interval_nonempty",
  "sampled_endpoint_values_present",
  "sampled_lambda_derivative_sample_present",
  "constant_theta_endpoint_box_candidate_present",
  "endpoint_local_formula_candidate_pair_declared",
  "local_target_action_pair_exact",
  "combined_component_union_chart_pair_constructed",
  "row_boundary_binding_source_data_ready",
  "endpoint_value_binding_source_pair_ready",
  "endpoint_boundary_binding_witness_object_input_pair_ready",
  "active_endpoint_interval_enclosure_proof_data_target_declared",
  ...TARGET_FIELDS,
  "source_endpoint_boundary_binding_constructed",
  "receiver_endpoint_boundary_binding_constructed",
  "combined_boundary_binding_pair_constructed",
  "source_endpoint_value_bound_to_boundary_binding",
  "receiver_endpoint_value_bound_to_boundary_binding",
  "combined_binding_contract_pair_satisfied",
  "source_endpoint_interval_box_constructed",
  "receiver_endpoint_interval_box_constructed",
  "source_endpoint_residual_formula_present",
  "receiver_endpoint_residual_formula_present",
  "source_endpoint_domain_chart_present",
  "receiver_endpoint_domain_chart_present",
  "source_endpoint_evaluation_rule_present",
  "receiver_endpoint_evaluation_rule_present",
  "source_endpoint_motion_rule_present",
  "receiver_endpoint_motion_rule_present",
  "source_endpoint_residual_function_on_box_constructed",
  "receiver_endpoint_residual_function_on_box_constructed",
  "source_residual_derivative_formula_present",
  "receiver_residual_derivative_formula_present",
  "source_residual_outward_rounding_rule_present",
  "receiver_residual_outward_rounding_rule_present",
  "source_endpoint_residual_interval_bound_constructed",
  "receiver_endpoint_residual_interval_bound_constructed",
  "source_endpoint_derivative_isolation_certified",
  "receiver_endpoint_derivative_isolation_certified",
  "source_endpoint_unique_on_interval_certified",
  "receiver_endpoint_unique_on_interval_certified",
  "endpoint_switch_exclusion_certified",
  "active_endpoint_gap_margin_positive_on_interval",
  "interval_active_endpoint_enclosure_present",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "residual_function_on_box_source_layer_ready",
  "preledger_pass",
  "row_consumed",
  "branch_chart_authorized",
];

const REQUIRED_SOURCE_LAYER_FIELDS = [
  "source_endpoint_boundary_binding_constructed",
  "receiver_endpoint_boundary_binding_constructed",
  "combined_boundary_binding_pair_constructed",
  "source_endpoint_value_bound_to_boundary_binding",
  "receiver_endpoint_value_bound_to_boundary_binding",
  "combined_binding_contract_pair_satisfied",
  "source_endpoint_interval_box_constructed",
  "receiver_endpoint_interval_box_constructed",
  "source_endpoint_residual_formula_present",
  "receiver_endpoint_residual_formula_present",
  "source_endpoint_domain_chart_present",
  "receiver_endpoint_domain_chart_present",
  "source_endpoint_evaluation_rule_present",
  "receiver_endpoint_evaluation_rule_present",
  "source_endpoint_motion_rule_present",
  "receiver_endpoint_motion_rule_present",
  "source_endpoint_residual_function_on_box_constructed",
  "receiver_endpoint_residual_function_on_box_constructed",
  "source_residual_derivative_formula_present",
  "receiver_residual_derivative_formula_present",
  "source_residual_outward_rounding_rule_present",
  "receiver_residual_outward_rounding_rule_present",
  "source_endpoint_residual_interval_bound_constructed",
  "receiver_endpoint_residual_interval_bound_constructed",
  "source_endpoint_derivative_isolation_certified",
  "receiver_endpoint_derivative_isolation_certified",
  "source_endpoint_unique_on_interval_certified",
  "receiver_endpoint_unique_on_interval_certified",
  "endpoint_switch_exclusion_certified",
  "active_endpoint_gap_margin_positive_on_interval",
  "interval_active_endpoint_enclosure_present",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
];

const CONSTRUCTION_METHODS = [
  {
    method_id: "endpoint_formula_candidates_as_endpoint_residual_formulas",
    description:
      "Try to promote endpoint-local formula candidates, component-union charts, and value-binding source equations into source and receiver endpoint residual formulas.",
    required_fields: [
      "endpoint_local_formula_candidate_pair_declared",
      "combined_component_union_chart_pair_constructed",
      "endpoint_value_binding_source_pair_ready",
      "source_endpoint_boundary_binding_constructed",
      "receiver_endpoint_boundary_binding_constructed",
      "source_endpoint_value_bound_to_boundary_binding",
      "receiver_endpoint_value_bound_to_boundary_binding",
      "source_endpoint_residual_formula_present",
      "receiver_endpoint_residual_formula_present",
    ],
  },
  {
    method_id: "constant_theta_candidates_as_endpoint_box_domains",
    description:
      "Try to promote constant-theta endpoint candidates into proof-grade source and receiver endpoint interval boxes.",
    required_fields: [
      "constant_theta_endpoint_box_candidate_present",
      "source_endpoint_interval_box_constructed",
      "receiver_endpoint_interval_box_constructed",
      "source_endpoint_unique_on_interval_certified",
      "receiver_endpoint_unique_on_interval_certified",
      "endpoint_switch_exclusion_certified",
      "active_endpoint_gap_margin_positive_on_interval",
    ],
  },
  {
    method_id: "endpoint_residual_formulas_as_box_functions",
    description:
      "Try to evaluate source and receiver endpoint residual formulas over endpoint boxes with motion and evaluation rules.",
    required_fields: [
      "source_endpoint_residual_formula_present",
      "receiver_endpoint_residual_formula_present",
      "source_endpoint_interval_box_constructed",
      "receiver_endpoint_interval_box_constructed",
      "source_endpoint_evaluation_rule_present",
      "receiver_endpoint_evaluation_rule_present",
      "source_endpoint_motion_rule_present",
      "receiver_endpoint_motion_rule_present",
      "source_endpoint_residual_function_on_box_constructed",
      "receiver_endpoint_residual_function_on_box_constructed",
    ],
  },
  {
    method_id: "sampled_lambda_derivatives_as_outward_interval_bounds",
    description:
      "Try to promote sampled lambda derivatives into derivative formulas, outward rounding rules, and residual interval bounds.",
    required_fields: [
      "sampled_lambda_derivative_sample_present",
      "source_endpoint_residual_function_on_box_constructed",
      "receiver_endpoint_residual_function_on_box_constructed",
      "source_residual_derivative_formula_present",
      "receiver_residual_derivative_formula_present",
      "source_residual_outward_rounding_rule_present",
      "receiver_residual_outward_rounding_rule_present",
      "source_endpoint_residual_interval_bound_constructed",
      "receiver_endpoint_residual_interval_bound_constructed",
    ],
  },
  {
    method_id: "residual_box_functions_as_proof_interval_replay",
    description:
      "Try to promote residual functions on boxes into no-switch active-endpoint enclosure data with candidate artifacts and proof-interval replay.",
    required_fields: [
      "source_endpoint_residual_function_on_box_constructed",
      "receiver_endpoint_residual_function_on_box_constructed",
      "source_endpoint_residual_interval_bound_constructed",
      "receiver_endpoint_residual_interval_bound_constructed",
      "endpoint_switch_exclusion_certified",
      "interval_active_endpoint_enclosure_present",
      "candidate_artifacts_present",
      "root_topology_recertified_for_candidate_change",
      "proof_interval_v1_v6_rerun_for_candidate_change",
      "preledger_pass",
      "row_consumed",
      "branch_chart_authorized",
    ],
  },
];

function parseArgs(argv) {
  const args = {
    residualSourceDataAudit: DEFAULT_RESIDUAL_SOURCE_DATA_AUDIT,
    residualDataAttempt: DEFAULT_RESIDUAL_DATA_ATTEMPT,
    intervalBoxAttempt: DEFAULT_INTERVAL_BOX_ATTEMPT,
    proofDataAttempt: DEFAULT_PROOF_DATA_ATTEMPT,
    valueBindingSourceLayer: DEFAULT_VALUE_BINDING_SOURCE_LAYER,
    witnessObjectAttempt: DEFAULT_WITNESS_OBJECT_ATTEMPT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--residual-source-data-audit") {
      args.residualSourceDataAudit = argv[++index];
    } else if (arg === "--residual-data-attempt") {
      args.residualDataAttempt = argv[++index];
    } else if (arg === "--interval-box-attempt") {
      args.intervalBoxAttempt = argv[++index];
    } else if (arg === "--proof-data-attempt") {
      args.proofDataAttempt = argv[++index];
    } else if (arg === "--value-binding-source-layer") {
      args.valueBindingSourceLayer = argv[++index];
    } else if (arg === "--witness-object-attempt") {
      args.witnessObjectAttempt = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-one-leaf-active-endpoint-residual-function-on-box-source-layer-attempt.mjs [options]

Options:
  --residual-source-data-audit PATH  One-leaf residual source-data audit JSON. Defaults to ${DEFAULT_RESIDUAL_SOURCE_DATA_AUDIT}.
  --residual-data-attempt PATH       One-leaf residual-data construction attempt JSON. Defaults to ${DEFAULT_RESIDUAL_DATA_ATTEMPT}.
  --interval-box-attempt PATH        One-leaf endpoint interval-box attempt JSON. Defaults to ${DEFAULT_INTERVAL_BOX_ATTEMPT}.
  --proof-data-attempt PATH          One-leaf interval-enclosure proof-data attempt JSON. Defaults to ${DEFAULT_PROOF_DATA_ATTEMPT}.
  --value-binding-source-layer PATH  Endpoint value-binding source-layer JSON. Defaults to ${DEFAULT_VALUE_BINDING_SOURCE_LAYER}.
  --witness-object-attempt PATH      Endpoint boundary-binding witness-object attempt JSON. Defaults to ${DEFAULT_WITNESS_OBJECT_ATTEMPT}.
  --out-dir PATH                     Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                           Pretty-print JSON artifact.
  --help                             Show this help.`);
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

function requireRow(map, rowId, label) {
  const row = map.get(rowId);
  if (!row) {
    throw new Error(`Missing ${label} row: ${rowId}`);
  }
  return row;
}

function assertPacketId(source, name) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${name} packet id: ${source.packet_id}`);
  }
}

function assertRows(source, key, count, label) {
  if (!Array.isArray(source[key]) || source[key].length !== count) {
    throw new Error(`Expected exactly ${count} ${label} rows.`);
  }
}

function assertInputs(inputs) {
  for (const [name, source] of Object.entries(inputs)) {
    assertPacketId(source, name);
    if (source.status !== SOURCE_STATUSES[name]) {
      throw new Error(`Unexpected ${name} status: ${source.status}`);
    }
    if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger) {
      throw new Error(`Refusing residual-function-on-box source layer from authorized ${name}.`);
    }
  }
  if (inputs.valueBindingSourceLayer.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(
      `Unexpected value-binding source-layer fold-coordinate packet id: ${inputs.valueBindingSourceLayer.fold_coordinate_packet_id}`
    );
  }
  if (inputs.witnessObjectAttempt.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(
      `Unexpected witness-object fold-coordinate packet id: ${inputs.witnessObjectAttempt.fold_coordinate_packet_id}`
    );
  }
  assertRows(inputs.residualSourceDataAudit, "row_active_endpoint_residual_source_data_audits", 3, "residual source-data audit");
  assertRows(inputs.residualDataAttempt, "row_active_endpoint_residual_data_construction_attempts", 3, "residual-data attempt");
  assertRows(inputs.intervalBoxAttempt, "row_endpoint_interval_box_no_switch_attempts", 3, "interval-box attempt");
  assertRows(inputs.proofDataAttempt, "row_active_endpoint_interval_enclosure_proof_data_construction_attempts", 3, "proof-data attempt");
  assertRows(inputs.valueBindingSourceLayer, "row_endpoint_value_binding_source_layers", 3, "value-binding source-layer");
  assertRows(inputs.witnessObjectAttempt, "row_endpoint_boundary_binding_witness_object_attempts", 3, "witness-object attempt");
}

function methodResult(method, fields) {
  const missingFields = method.required_fields.filter((field) => fields[field] !== true);
  return {
    method_id: method.method_id,
    description: method.description,
    required_fields: method.required_fields,
    missing_fields: missingFields,
    failure_codes: missingFields.map(
      (field) => `missing_one_leaf_active_endpoint_residual_function_on_box_source_layer_${field}`
    ),
    passed: missingFields.length === 0,
  };
}

function buildRowAttempt(proofRow, residualSourceRow, residualDataRow, intervalBoxRow, valueBindingRow, witnessRow) {
  const proofFields = proofRow.required_fields_present;
  const sourceFields = residualSourceRow.required_fields_present;
  const residualFields = residualDataRow.required_fields_present;
  const boxFields = intervalBoxRow.required_fields_present;
  const valueFields = valueBindingRow.required_fields_present;
  const witnessFields = witnessRow.required_fields_present;
  const fields = {
    candidate_lambda_interval_declared:
      sourceFields.candidate_lambda_interval_declared === true &&
      proofFields.candidate_lambda_interval_declared === true,
    candidate_lambda_interval_nonempty:
      sourceFields.candidate_lambda_interval_nonempty === true &&
      proofFields.candidate_lambda_interval_nonempty === true,
    sampled_endpoint_values_present:
      sourceFields.sampled_endpoint_values_present === true &&
      residualFields.sampled_endpoint_values_present === true &&
      proofFields.sampled_endpoint_values_present === true,
    sampled_lambda_derivative_sample_present:
      sourceFields.sampled_lambda_derivative_sample_present === true &&
      residualFields.sampled_lambda_derivative_sample_present === true &&
      proofFields.sampled_lambda_derivative_sample_present === true,
    constant_theta_endpoint_box_candidate_present:
      sourceFields.constant_theta_endpoint_box_candidate_present === true &&
      residualFields.constant_theta_endpoint_box_candidate_present === true &&
      proofFields.constant_theta_endpoint_box_candidate_present === true &&
      boxFields.constant_theta_endpoint_box_candidate_declared === true,
    endpoint_local_formula_candidate_pair_declared:
      residualFields.source_formula_candidate_declared === true &&
      residualFields.receiver_formula_candidate_declared === true,
    local_target_action_pair_exact:
      residualFields.source_target_action_exact === true &&
      residualFields.receiver_target_action_exact === true,
    combined_component_union_chart_pair_constructed:
      residualFields.combined_component_union_chart_pair_constructed === true,
    row_boundary_binding_source_data_ready:
      residualFields.row_boundary_binding_source_data_ready === true &&
      proofFields.row_boundary_binding_source_data_ready === true,
    endpoint_value_binding_source_pair_ready:
      valueFields.row_endpoint_value_binding_source_pair_ready === true,
    endpoint_boundary_binding_witness_object_input_pair_ready:
      witnessFields.combined_endpoint_boundary_binding_witness_object_input_pair_ready === true,
    active_endpoint_interval_enclosure_proof_data_target_declared:
      proofFields.active_endpoint_interval_enclosure_proof_data_target_declared === true,
  };
  for (const field of TARGET_FIELDS) {
    fields[field] = true;
  }
  Object.assign(fields, {
    source_endpoint_boundary_binding_constructed:
      residualFields.source_endpoint_boundary_binding_constructed === true ||
      valueFields.source_endpoint_boundary_binding_constructed === true ||
      witnessFields.source_endpoint_boundary_binding_constructed === true,
    receiver_endpoint_boundary_binding_constructed:
      residualFields.receiver_endpoint_boundary_binding_constructed === true ||
      valueFields.receiver_endpoint_boundary_binding_constructed === true ||
      witnessFields.receiver_endpoint_boundary_binding_constructed === true,
    combined_boundary_binding_pair_constructed:
      residualFields.combined_boundary_binding_pair_constructed === true ||
      valueFields.combined_boundary_binding_pair_constructed === true ||
      witnessFields.combined_boundary_binding_pair_constructed === true,
    source_endpoint_value_bound_to_boundary_binding:
      valueFields.source_endpoint_value_bound_to_boundary_binding === true ||
      witnessFields.source_endpoint_value_bound_to_boundary_binding === true,
    receiver_endpoint_value_bound_to_boundary_binding:
      valueFields.receiver_endpoint_value_bound_to_boundary_binding === true ||
      witnessFields.receiver_endpoint_value_bound_to_boundary_binding === true,
    combined_binding_contract_pair_satisfied:
      valueFields.combined_binding_contract_pair_satisfied === true ||
      witnessFields.combined_binding_contract_pair_satisfied === true,
    source_endpoint_interval_box_constructed:
      boxFields.source_endpoint_interval_box_constructed === true ||
      proofFields.source_endpoint_interval_box_constructed === true,
    receiver_endpoint_interval_box_constructed:
      boxFields.receiver_endpoint_interval_box_constructed === true ||
      proofFields.receiver_endpoint_interval_box_constructed === true,
    source_endpoint_residual_formula_present:
      sourceFields.source_endpoint_residual_formula_present === true,
    receiver_endpoint_residual_formula_present:
      sourceFields.receiver_endpoint_residual_formula_present === true,
    source_endpoint_domain_chart_present:
      sourceFields.source_endpoint_domain_chart_present === true,
    receiver_endpoint_domain_chart_present:
      sourceFields.receiver_endpoint_domain_chart_present === true,
    source_endpoint_evaluation_rule_present:
      sourceFields.source_endpoint_evaluation_rule_present === true,
    receiver_endpoint_evaluation_rule_present:
      sourceFields.receiver_endpoint_evaluation_rule_present === true,
    source_endpoint_motion_rule_present:
      sourceFields.source_endpoint_motion_rule_present === true ||
      residualFields.source_endpoint_motion_rule_constructed === true ||
      valueFields.source_endpoint_motion_rule_constructed === true ||
      witnessFields.source_endpoint_motion_rule_constructed === true,
    receiver_endpoint_motion_rule_present:
      sourceFields.receiver_endpoint_motion_rule_present === true ||
      residualFields.receiver_endpoint_motion_rule_constructed === true ||
      valueFields.receiver_endpoint_motion_rule_constructed === true ||
      witnessFields.receiver_endpoint_motion_rule_constructed === true,
    source_endpoint_residual_function_on_box_constructed:
      residualFields.source_endpoint_residual_function_on_box_constructed === true ||
      proofFields.source_endpoint_residual_function_on_box_constructed === true,
    receiver_endpoint_residual_function_on_box_constructed:
      residualFields.receiver_endpoint_residual_function_on_box_constructed === true ||
      proofFields.receiver_endpoint_residual_function_on_box_constructed === true,
    source_residual_derivative_formula_present:
      sourceFields.source_residual_derivative_formula_present === true,
    receiver_residual_derivative_formula_present:
      sourceFields.receiver_residual_derivative_formula_present === true,
    source_residual_outward_rounding_rule_present:
      sourceFields.source_residual_outward_rounding_rule_present === true,
    receiver_residual_outward_rounding_rule_present:
      sourceFields.receiver_residual_outward_rounding_rule_present === true,
    source_endpoint_residual_interval_bound_constructed:
      boxFields.source_endpoint_residual_interval_bound_constructed === true ||
      proofFields.source_endpoint_residual_interval_bound_constructed === true,
    receiver_endpoint_residual_interval_bound_constructed:
      boxFields.receiver_endpoint_residual_interval_bound_constructed === true ||
      proofFields.receiver_endpoint_residual_interval_bound_constructed === true,
    source_endpoint_derivative_isolation_certified:
      boxFields.source_endpoint_derivative_isolation_certified === true ||
      proofFields.source_endpoint_derivative_isolation_certified === true,
    receiver_endpoint_derivative_isolation_certified:
      boxFields.receiver_endpoint_derivative_isolation_certified === true ||
      proofFields.receiver_endpoint_derivative_isolation_certified === true,
    source_endpoint_unique_on_interval_certified:
      boxFields.source_endpoint_unique_on_interval_certified === true ||
      proofFields.source_endpoint_unique_on_interval_certified === true,
    receiver_endpoint_unique_on_interval_certified:
      boxFields.receiver_endpoint_unique_on_interval_certified === true ||
      proofFields.receiver_endpoint_unique_on_interval_certified === true,
    endpoint_switch_exclusion_certified:
      boxFields.endpoint_switch_exclusion_certified === true ||
      proofFields.endpoint_switch_exclusion_certified === true,
    active_endpoint_gap_margin_positive_on_interval:
      boxFields.active_endpoint_gap_margin_positive_on_interval === true ||
      proofFields.active_endpoint_gap_margin_positive_on_interval === true,
    interval_active_endpoint_enclosure_present:
      residualFields.interval_active_endpoint_enclosure_present === true ||
      proofFields.interval_active_endpoint_enclosure_present === true,
    candidate_artifacts_present:
      residualFields.candidate_artifacts_present === true ||
      valueFields.candidate_artifacts_present === true ||
      witnessFields.candidate_artifacts_present === true ||
      proofFields.candidate_artifacts_present === true,
    root_topology_recertified_for_candidate_change:
      residualFields.root_topology_recertified_for_candidate_change === true ||
      valueFields.root_topology_recertified_for_candidate_change === true ||
      witnessFields.root_topology_recertified_for_candidate_change === true ||
      proofFields.root_topology_recertified_for_candidate_change === true,
    proof_interval_v1_v6_rerun_for_candidate_change:
      residualFields.proof_interval_v1_v6_rerun_for_candidate_change === true ||
      valueFields.proof_interval_v1_v6_rerun_for_candidate_change === true ||
      witnessFields.proof_interval_v1_v6_rerun_for_candidate_change === true ||
      proofFields.proof_interval_v1_v6_rerun_for_candidate_change === true,
    preledger_pass: false,
    row_consumed: false,
    branch_chart_authorized: false,
  });
  fields.residual_function_on_box_source_layer_ready = REQUIRED_SOURCE_LAYER_FIELDS.every(
    (field) => fields[field] === true
  );
  const missingFields = REQUIRED_SOURCE_LAYER_FIELDS.filter((field) => fields[field] !== true);
  const methodResults = CONSTRUCTION_METHODS.map((method) => methodResult(method, fields));
  return {
    row_id: proofRow.row_id,
    cover_id: proofRow.cover_id,
    ledger: proofRow.ledger,
    source_interval: proofRow.source_interval,
    receiver_interval: proofRow.receiver_interval,
    failed_side: proofRow.failed_side,
    boundary_side: proofRow.boundary_side,
    source_variable: valueBindingRow.source_variable,
    receiver_variable: valueBindingRow.receiver_variable,
    source_boundary_ref: valueBindingRow.source_boundary_ref,
    receiver_boundary_ref: valueBindingRow.receiver_boundary_ref,
    candidate_lambda_interval: proofRow.candidate_lambda_interval,
    sampled_endpoint_data: residualSourceRow.sampled_endpoint_data,
    sampled_boundary_values: proofRow.sampled_boundary_values,
    inherited_source_layers: {
      residual_source_data_ready: residualSourceRow.residual_source_data_ready,
      residual_data_construction_ready: residualDataRow.residual_data_construction_ready,
      proof_data_target_declared:
        proofFields.active_endpoint_interval_enclosure_proof_data_target_declared === true,
      endpoint_value_binding_source_pair_ready:
        valueFields.row_endpoint_value_binding_source_pair_ready === true,
      witness_object_input_pair_ready:
        witnessFields.combined_endpoint_boundary_binding_witness_object_input_pair_ready === true,
      interval_box_candidate_only:
        intervalBoxRow.proof_grade_endpoint_box_no_switch_constructed === false,
    },
    required_fields_present: fields,
    construction_method_results: methodResults,
    passed_methods: methodResults.filter((method) => method.passed).map((method) => method.method_id),
    missing_source_layer_fields: missingFields,
    failure_codes: missingFields.map(
      (field) => `missing_one_leaf_active_endpoint_residual_function_on_box_source_layer_${field}`
    ),
    residual_function_on_box_source_layer_ready:
      fields.residual_function_on_box_source_layer_ready,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has sampled endpoint values, sampled lambda derivative data, constant-theta endpoint-box candidates, endpoint-local formula candidates, component-union chart pairs, boundary-binding source data, value-binding source equations, witness-object inputs, and a declared proof-data target, but no endpoint interval boxes, endpoint residual formulas, endpoint evaluation or motion rules, residual functions on boxes, derivative formulas, outward rounding rules, residual interval bounds, no-switch enclosure, candidate artifacts, proof-interval replay, preledger pass, or row consumption.",
  };
}

function buildAttempt(inputs, paths) {
  assertInputs(inputs);
  const residualSourceRows = rowMap(
    inputs.residualSourceDataAudit.row_active_endpoint_residual_source_data_audits,
    "residual source-data audit"
  );
  const residualDataRows = rowMap(
    inputs.residualDataAttempt.row_active_endpoint_residual_data_construction_attempts,
    "residual-data attempt"
  );
  const intervalBoxRows = rowMap(
    inputs.intervalBoxAttempt.row_endpoint_interval_box_no_switch_attempts,
    "interval-box attempt"
  );
  const valueBindingRows = rowMap(
    inputs.valueBindingSourceLayer.row_endpoint_value_binding_source_layers,
    "value-binding source-layer"
  );
  const witnessRows = rowMap(
    inputs.witnessObjectAttempt.row_endpoint_boundary_binding_witness_object_attempts,
    "witness-object attempt"
  );
  const rowAttempts =
    inputs.proofDataAttempt.row_active_endpoint_interval_enclosure_proof_data_construction_attempts.map(
      (proofRow) =>
        buildRowAttempt(
          proofRow,
          requireRow(residualSourceRows, proofRow.row_id, "residual source-data audit"),
          requireRow(residualDataRows, proofRow.row_id, "residual-data attempt"),
          requireRow(intervalBoxRows, proofRow.row_id, "interval-box attempt"),
          requireRow(valueBindingRows, proofRow.row_id, "value-binding source-layer"),
          requireRow(witnessRows, proofRow.row_id, "witness-object attempt")
        )
    );
  const fieldCounts = Object.fromEntries(
    ROW_FIELDS.map((field) => [
      field,
      countTrue(rowAttempts, (row) => row.required_fields_present[field]),
    ])
  );
  return {
    schema:
      "breather-higher-fold-one-leaf-active-endpoint-residual-function-on-box-source-layer-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: STATUS,
    theorem_target: "One-Leaf Active-Endpoint Residual Function On Box Source-Layer Attempt",
    claim_level:
      "priority-only residual-function source-layer attempt; endpoint formula, chart, value-binding source, and witness-object inputs are present, but proof-grade residual functions on endpoint boxes are absent",
    source_artifacts: {
      one_leaf_active_endpoint_residual_source_data_audit: artifactRecord(
        paths.residualSourceDataAudit
      ),
      one_leaf_active_endpoint_residual_data_construction_attempt: artifactRecord(
        paths.residualDataAttempt
      ),
      one_leaf_active_endpoint_interval_box_no_switch_construction_attempt: artifactRecord(
        paths.intervalBoxAttempt
      ),
      one_leaf_active_endpoint_interval_enclosure_proof_data_construction_attempt: artifactRecord(
        paths.proofDataAttempt
      ),
      fold_coordinate_endpoint_functional_endpoint_value_binding_source_layer: artifactRecord(
        paths.valueBindingSourceLayer
      ),
      fold_coordinate_endpoint_functional_endpoint_boundary_binding_witness_object_construction_attempt:
        artifactRecord(paths.witnessObjectAttempt),
    },
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    authorization_lock: {
      residual_function_on_box_source_layer_target_declared: true,
      endpoint_formula_candidates_promoted_to_residual_formulas: false,
      constant_theta_endpoint_candidates_promoted_to_interval_boxes: false,
      value_binding_sources_promoted_to_boundary_bindings: false,
      sampled_derivatives_promoted_to_outward_interval_bounds: false,
      residual_functions_on_boxes_promoted_to_proof_interval_replay: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    source_layer_rule:
      "A row-level active-endpoint residual-function-on-box source layer must bind source and receiver endpoint-local formula candidates to proof-grade endpoint boundary bindings, endpoint value bindings, same-packet motion and evaluation rules, source and receiver endpoint interval boxes, endpoint residual formulas over those boxes, residual derivative formulas, outward rounding rules, residual interval bounds, no-switch and endpoint-gap certificates, candidate artifacts, topology recertification, and proof-interval v1-v6 replay before any row can pass the preledger.",
    no_promotion_rule:
      "Endpoint-local formula candidates, component-union chart pairs, sampled endpoint values, sampled lambda derivatives, constant-theta endpoint-box candidates, boundary-binding source data, endpoint value-binding source equations, witness-object inputs, and proof-data targets are source inputs only. They do not by themselves define residual functions on endpoint boxes, residual interval bounds, active-endpoint interval enclosures, preledger passes, live-ledger updates, row consumption, or branch-chart authorization.",
    construction_methods: CONSTRUCTION_METHODS,
    summary: {
      rows: rowAttempts.length,
      endpoint_functionals: inputs.valueBindingSourceLayer.summary.endpoint_functionals,
      sampled_endpoint_value_rows: fieldCounts.sampled_endpoint_values_present,
      sampled_lambda_derivative_sample_rows: fieldCounts.sampled_lambda_derivative_sample_present,
      constant_theta_endpoint_box_candidate_rows:
        fieldCounts.constant_theta_endpoint_box_candidate_present,
      endpoint_local_formula_candidate_pair_rows:
        fieldCounts.endpoint_local_formula_candidate_pair_declared,
      local_target_action_pair_exact_rows: fieldCounts.local_target_action_pair_exact,
      component_union_chart_pair_rows:
        fieldCounts.combined_component_union_chart_pair_constructed,
      boundary_binding_source_data_rows: fieldCounts.row_boundary_binding_source_data_ready,
      endpoint_value_binding_source_pair_rows:
        fieldCounts.endpoint_value_binding_source_pair_ready,
      witness_object_input_pair_rows:
        fieldCounts.endpoint_boundary_binding_witness_object_input_pair_ready,
      proof_data_target_declared_rows:
        fieldCounts.active_endpoint_interval_enclosure_proof_data_target_declared,
      source_endpoint_boundary_binding_rows:
        fieldCounts.source_endpoint_boundary_binding_constructed,
      receiver_endpoint_boundary_binding_rows:
        fieldCounts.receiver_endpoint_boundary_binding_constructed,
      boundary_binding_pair_rows: fieldCounts.combined_boundary_binding_pair_constructed,
      endpoint_value_binding_pair_rows: Math.min(
        fieldCounts.source_endpoint_value_bound_to_boundary_binding,
        fieldCounts.receiver_endpoint_value_bound_to_boundary_binding
      ),
      source_endpoint_interval_box_rows: fieldCounts.source_endpoint_interval_box_constructed,
      receiver_endpoint_interval_box_rows:
        fieldCounts.receiver_endpoint_interval_box_constructed,
      endpoint_residual_formula_rows: Math.min(
        fieldCounts.source_endpoint_residual_formula_present,
        fieldCounts.receiver_endpoint_residual_formula_present
      ),
      endpoint_domain_chart_rows: Math.min(
        fieldCounts.source_endpoint_domain_chart_present,
        fieldCounts.receiver_endpoint_domain_chart_present
      ),
      endpoint_evaluation_rule_rows: Math.min(
        fieldCounts.source_endpoint_evaluation_rule_present,
        fieldCounts.receiver_endpoint_evaluation_rule_present
      ),
      endpoint_motion_rule_rows: Math.min(
        fieldCounts.source_endpoint_motion_rule_present,
        fieldCounts.receiver_endpoint_motion_rule_present
      ),
      endpoint_residual_function_on_box_rows: Math.min(
        fieldCounts.source_endpoint_residual_function_on_box_constructed,
        fieldCounts.receiver_endpoint_residual_function_on_box_constructed
      ),
      residual_derivative_formula_rows: Math.min(
        fieldCounts.source_residual_derivative_formula_present,
        fieldCounts.receiver_residual_derivative_formula_present
      ),
      residual_outward_rounding_rule_rows: Math.min(
        fieldCounts.source_residual_outward_rounding_rule_present,
        fieldCounts.receiver_residual_outward_rounding_rule_present
      ),
      endpoint_residual_interval_bound_rows: Math.min(
        fieldCounts.source_endpoint_residual_interval_bound_constructed,
        fieldCounts.receiver_endpoint_residual_interval_bound_constructed
      ),
      endpoint_derivative_isolation_rows: Math.min(
        fieldCounts.source_endpoint_derivative_isolation_certified,
        fieldCounts.receiver_endpoint_derivative_isolation_certified
      ),
      endpoint_uniqueness_rows: Math.min(
        fieldCounts.source_endpoint_unique_on_interval_certified,
        fieldCounts.receiver_endpoint_unique_on_interval_certified
      ),
      endpoint_switch_exclusion_rows: fieldCounts.endpoint_switch_exclusion_certified,
      active_endpoint_gap_margin_rows:
        fieldCounts.active_endpoint_gap_margin_positive_on_interval,
      interval_active_endpoint_enclosure_rows:
        fieldCounts.interval_active_endpoint_enclosure_present,
      candidate_artifact_rows: fieldCounts.candidate_artifacts_present,
      topology_recertification_rows:
        fieldCounts.root_topology_recertified_for_candidate_change,
      proof_interval_replay_rows:
        fieldCounts.proof_interval_v1_v6_rerun_for_candidate_change,
      residual_function_on_box_source_layer_ready_rows:
        fieldCounts.residual_function_on_box_source_layer_ready,
      preledger_pass_rows: fieldCounts.preledger_pass,
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    row_source_layer_field_counts: fieldCounts,
    row_active_endpoint_residual_function_on_box_source_layer_attempts: rowAttempts,
    capture_decision:
      "Priority-only. The attempt declares the active-endpoint residual-function-on-box source-layer target and preserves 3 / 3 sampled endpoint-value rows, sampled lambda-derivative rows, constant-theta endpoint-box candidates, endpoint-local formula candidate pairs, component-union chart pairs, boundary-binding source-data rows, endpoint value-binding source pairs, witness-object input pairs, and proof-data targets. It fail-closes because it constructs 0 / 3 source/receiver endpoint interval boxes, endpoint residual formulas, endpoint domain charts, endpoint evaluation or motion rules, residual functions on boxes, residual derivative formulas, outward rounding rules, residual interval bounds, derivative-isolation rows, endpoint uniqueness rows, switch-exclusion rows, endpoint-gap rows, active-endpoint interval enclosures, candidate artifacts, topology recertifications, proof-interval replays, preledger passes, or consumed rows.",
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

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.endpoint_local_formula_candidate_pair_declared} | ${row.required_fields_present.endpoint_value_binding_source_pair_ready} | ${row.required_fields_present.source_endpoint_interval_box_constructed} | ${row.required_fields_present.source_endpoint_residual_formula_present} | ${row.required_fields_present.source_endpoint_residual_function_on_box_constructed} | ${row.required_fields_present.source_endpoint_residual_interval_bound_constructed} | ${row.residual_function_on_box_source_layer_ready} |`
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
  return `# Higher-Fold One-Leaf Active-Endpoint Residual Function On Box Source-Layer Attempt

## Verdict

Status: \`${attempt.status}\`.

This priority-only construction attempt tests whether the active-endpoint
source stack can produce proof-grade residual functions over source and
receiver endpoint interval boxes. It imports the residual source-data audit,
the residual-data construction attempt, the interval-box/no-switch attempt,
the interval-enclosure proof-data attempt, the endpoint value-binding
source-layer packet, and the endpoint boundary-binding witness-object attempt.

The packet fail-closes. It preserves ${summary.sampled_endpoint_value_rows} / ${summary.rows}
sampled endpoint-value rows, ${summary.sampled_lambda_derivative_sample_rows} / ${summary.rows}
sampled lambda-derivative rows, ${summary.constant_theta_endpoint_box_candidate_rows} / ${summary.rows}
constant-theta endpoint-box candidates, ${summary.endpoint_local_formula_candidate_pair_rows} / ${summary.rows}
endpoint-local formula candidate pairs, ${summary.component_union_chart_pair_rows} / ${summary.rows}
component-union chart pairs, ${summary.boundary_binding_source_data_rows} / ${summary.rows}
boundary-binding source-data rows, ${summary.endpoint_value_binding_source_pair_rows} / ${summary.rows}
endpoint value-binding source pairs, ${summary.witness_object_input_pair_rows} / ${summary.rows}
witness-object input pairs, and ${summary.proof_data_target_declared_rows} / ${summary.rows}
proof-data targets.

It constructs 0 / ${summary.rows} source endpoint interval boxes, 0 / ${summary.rows}
receiver endpoint interval boxes, 0 / ${summary.rows} endpoint residual
formulas, 0 / ${summary.rows} endpoint domain charts, 0 / ${summary.rows}
endpoint evaluation-rule rows, 0 / ${summary.rows} endpoint motion-rule rows,
0 / ${summary.rows} endpoint residual functions on boxes, 0 / ${summary.rows}
residual derivative-formula rows, 0 / ${summary.rows} outward rounding-rule
rows, 0 / ${summary.rows} residual interval bounds, 0 / ${summary.rows}
derivative-isolation rows, 0 / ${summary.rows} endpoint uniqueness rows,
0 / ${summary.rows} switch-exclusion rows, 0 / ${summary.rows} endpoint-gap rows,
0 / ${summary.rows} active-endpoint interval enclosures, 0 / ${summary.rows}
candidate-artifact rows, 0 / ${summary.rows} topology recertification rows,
and 0 / ${summary.rows} proof-interval replay rows. It consumes 0 rows, keeps
\`preledger_pass=false\`, keeps \`updates_live_ledger=false\`, keeps
\`branch_chart_authorized=false\`, and emits no live-ledger update.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${sourceTable(attempt.source_artifacts)}

## Source-Layer Rule

${attempt.source_layer_rule}

## No-Promotion Rule

${attempt.no_promotion_rule}

## Construction Methods

| Method | Required fields | Description |
| --- | ---: | --- |
${methodTable(attempt.construction_methods)}

## Row Attempts

| Row | Failed side | Formula pair | Value-binding source | Endpoint box | Residual formula | Residual function | Residual bound | Source layer ready |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(attempt.row_active_endpoint_residual_function_on_box_source_layer_attempts)}

## Field Counts

| Field | Present count |
| --- | ---: |
${fieldCountTable(attempt.row_source_layer_field_counts, summary.rows)}

## Construction Blocker

The next constructive object is a proof-grade residual function over endpoint
boxes, not another endpoint-local formula candidate. The missing layer must
bind source and receiver endpoint functionals to proof-grade endpoint boundary
bindings, endpoint boxes, motion/evaluation rules, derivative formulas,
outward rounding, and proof-interval replay before the active-endpoint route
can consume any row.

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
    residualSourceDataAudit: readJson(args.residualSourceDataAudit),
    residualDataAttempt: readJson(args.residualDataAttempt),
    intervalBoxAttempt: readJson(args.intervalBoxAttempt),
    proofDataAttempt: readJson(args.proofDataAttempt),
    valueBindingSourceLayer: readJson(args.valueBindingSourceLayer),
    witnessObjectAttempt: readJson(args.witnessObjectAttempt),
  };
  const paths = {
    residualSourceDataAudit: args.residualSourceDataAudit,
    residualDataAttempt: args.residualDataAttempt,
    intervalBoxAttempt: args.intervalBoxAttempt,
    proofDataAttempt: args.proofDataAttempt,
    valueBindingSourceLayer: args.valueBindingSourceLayer,
    witnessObjectAttempt: args.witnessObjectAttempt,
  };
  const attempt = buildAttempt(inputs, paths);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, attempt, args.pretty);
  writeText(outputReportPath, buildReport(attempt));
  console.log(`Wrote ${outputJsonPath}`);
  console.log(`Wrote ${outputReportPath}`);
  console.log(JSON.stringify(attempt.summary, (_key, entry) => entry, 2));
}

main();

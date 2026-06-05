#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_BOUNDARY_OPENING_ATTEMPT = `${CERT_DIR}/one_leaf_boundary_opening_interval_certificate_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_ACTIVE_ENDPOINT_ATTEMPT = `${CERT_DIR}/one_leaf_active_endpoint_interval_enclosure_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_INTERVAL_BOX_ATTEMPT = `${CERT_DIR}/one_leaf_active_endpoint_interval_box_no_switch_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_RESIDUAL_SOURCE_DATA_AUDIT = `${CERT_DIR}/one_leaf_active_endpoint_residual_source_data_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_RESIDUAL_DATA_ATTEMPT = `${CERT_DIR}/one_leaf_active_endpoint_residual_data_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_WITNESS_OBJECT_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_witness_object_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `one_leaf_active_endpoint_interval_enclosure_proof_data_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `one_leaf_active_endpoint_interval_enclosure_proof_data_construction_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const STATUS =
  "one_leaf_active_endpoint_interval_enclosure_proof_data_construction_attempt_fail_closed_source_inputs_present_proof_data_absent_no_row_consumption";

const SOURCE_STATUSES = {
  boundaryOpeningAttempt: "one_leaf_boundary_opening_interval_certificate_attempt_fail_closed_no_row_consumption",
  activeEndpointAttempt:
    "one_leaf_active_endpoint_interval_enclosure_attempt_fail_closed_sampled_stability_only_no_row_consumption",
  intervalBoxAttempt:
    "one_leaf_active_endpoint_interval_box_no_switch_construction_attempt_fail_closed_no_interval_boxes_no_switch_no_row_consumption",
  residualSourceDataAudit:
    "one_leaf_active_endpoint_residual_source_data_audit_fail_closed_source_samples_present_residual_functions_absent_no_row_consumption",
  residualDataAttempt:
    "one_leaf_active_endpoint_residual_data_construction_attempt_fail_closed_endpoint_functional_sources_only_no_row_residual_functions_no_row_consumption",
  witnessObjectAttempt:
    "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-construction-attempt-fail-closed-witness-inputs-present-object-binding-value-contract-motion-evaluation-replay-absent-no-row-consumption",
};

const TARGET_FIELDS = [
  "active_endpoint_interval_enclosure_proof_data_target_declared",
  "source_endpoint_residual_function_on_box_target_declared",
  "receiver_endpoint_residual_function_on_box_target_declared",
  "source_endpoint_interval_box_target_declared",
  "receiver_endpoint_interval_box_target_declared",
  "residual_interval_bound_target_declared",
  "derivative_isolation_target_declared",
  "endpoint_uniqueness_target_declared",
  "endpoint_switch_exclusion_target_declared",
  "endpoint_gap_margin_target_declared",
  "boundary_opening_replay_target_declared",
];

const ROW_PROOF_DATA_FIELDS = [
  "candidate_lambda_interval_declared",
  "candidate_lambda_interval_nonempty",
  "sampled_active_endpoint_stability_present",
  "sampled_endpoint_values_present",
  "sampled_lambda_derivative_sample_present",
  "constant_theta_endpoint_box_candidate_present",
  "sampled_opening_above_probe_threshold_present",
  "row_boundary_binding_source_data_ready",
  "endpoint_boundary_binding_witness_object_input_pair_ready",
  "imported_trial_root_topology_recertified",
  "imported_trial_preledger_replay_present",
  ...TARGET_FIELDS,
  "source_endpoint_interval_box_constructed",
  "receiver_endpoint_interval_box_constructed",
  "source_endpoint_residual_function_on_box_constructed",
  "receiver_endpoint_residual_function_on_box_constructed",
  "source_endpoint_residual_interval_bound_constructed",
  "receiver_endpoint_residual_interval_bound_constructed",
  "source_endpoint_derivative_isolation_certified",
  "receiver_endpoint_derivative_isolation_certified",
  "source_endpoint_unique_on_interval_certified",
  "receiver_endpoint_unique_on_interval_certified",
  "active_endpoint_pair_constant_on_interval_certified",
  "source_endpoint_switch_exclusion_certified",
  "receiver_endpoint_switch_exclusion_certified",
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
  "simple_root_branch_reuse_exclusion_certified",
  "non_owned_complement_closed",
  "source_endpoint_boundary_binding_witness_object_constructed",
  "receiver_endpoint_boundary_binding_witness_object_constructed",
  "combined_endpoint_boundary_binding_witness_object_pair_constructed",
  "source_endpoint_boundary_binding_constructed",
  "receiver_endpoint_boundary_binding_constructed",
  "combined_boundary_binding_pair_constructed",
  "source_endpoint_motion_rule_constructed",
  "receiver_endpoint_motion_rule_constructed",
  "combined_endpoint_evaluation_map_pair_constructed",
  "same_packet_history_update_formula_present",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "active_endpoint_interval_enclosure_proof_data_ready",
  "preledger_pass",
  "row_consumed",
  "branch_chart_authorized",
];

const REQUIRED_PROOF_DATA_FIELDS = [
  "source_endpoint_interval_box_constructed",
  "receiver_endpoint_interval_box_constructed",
  "source_endpoint_residual_function_on_box_constructed",
  "receiver_endpoint_residual_function_on_box_constructed",
  "source_endpoint_residual_interval_bound_constructed",
  "receiver_endpoint_residual_interval_bound_constructed",
  "source_endpoint_derivative_isolation_certified",
  "receiver_endpoint_derivative_isolation_certified",
  "source_endpoint_unique_on_interval_certified",
  "receiver_endpoint_unique_on_interval_certified",
  "active_endpoint_pair_constant_on_interval_certified",
  "source_endpoint_switch_exclusion_certified",
  "receiver_endpoint_switch_exclusion_certified",
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
  "simple_root_branch_reuse_exclusion_certified",
  "non_owned_complement_closed",
  "source_endpoint_boundary_binding_witness_object_constructed",
  "receiver_endpoint_boundary_binding_witness_object_constructed",
  "combined_endpoint_boundary_binding_witness_object_pair_constructed",
  "source_endpoint_boundary_binding_constructed",
  "receiver_endpoint_boundary_binding_constructed",
  "combined_boundary_binding_pair_constructed",
  "source_endpoint_motion_rule_constructed",
  "receiver_endpoint_motion_rule_constructed",
  "combined_endpoint_evaluation_map_pair_constructed",
  "same_packet_history_update_formula_present",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "preledger_pass",
  "row_consumed",
  "branch_chart_authorized",
];

const PROOF_DATA_METHODS = [
  {
    method_id: "sampled_endpoint_data_as_interval_proof_data",
    description:
      "Try to promote sampled endpoint stability, sampled endpoint values, and sampled lambda derivatives into interval proof data.",
    required_fields: [
      "candidate_lambda_interval_declared",
      "candidate_lambda_interval_nonempty",
      "sampled_active_endpoint_stability_present",
      "sampled_endpoint_values_present",
      "sampled_lambda_derivative_sample_present",
      "source_endpoint_residual_function_on_box_constructed",
      "receiver_endpoint_residual_function_on_box_constructed",
      "source_endpoint_residual_interval_bound_constructed",
      "receiver_endpoint_residual_interval_bound_constructed",
      "source_endpoint_derivative_isolation_certified",
      "receiver_endpoint_derivative_isolation_certified",
    ],
  },
  {
    method_id: "constant_theta_box_candidate_as_endpoint_interval_box",
    description:
      "Try to promote constant-theta sampled endpoint candidates into proof-grade source and receiver endpoint interval boxes.",
    required_fields: [
      "constant_theta_endpoint_box_candidate_present",
      "source_endpoint_interval_box_constructed",
      "receiver_endpoint_interval_box_constructed",
      "source_endpoint_unique_on_interval_certified",
      "receiver_endpoint_unique_on_interval_certified",
      "active_endpoint_pair_constant_on_interval_certified",
      "endpoint_switch_exclusion_certified",
      "active_endpoint_gap_margin_positive_on_interval",
    ],
  },
  {
    method_id: "witness_object_route_as_boundary_binding_carrier",
    description:
      "Try to use endpoint boundary-binding witness-object inputs as the carrier for boundary bindings, value bindings, motion, and evaluation maps.",
    required_fields: [
      "endpoint_boundary_binding_witness_object_input_pair_ready",
      "combined_endpoint_boundary_binding_witness_object_pair_constructed",
      "combined_boundary_binding_pair_constructed",
      "same_packet_history_update_formula_present",
      "combined_endpoint_evaluation_map_pair_constructed",
    ],
  },
  {
    method_id: "residual_data_attempt_as_active_endpoint_enclosure",
    description:
      "Try to promote residual-data construction outputs into active-endpoint interval enclosures.",
    required_fields: [
      "row_boundary_binding_source_data_ready",
      "source_endpoint_residual_function_on_box_constructed",
      "receiver_endpoint_residual_function_on_box_constructed",
      "source_endpoint_residual_interval_bound_constructed",
      "receiver_endpoint_residual_interval_bound_constructed",
      "source_endpoint_switch_exclusion_certified",
      "receiver_endpoint_switch_exclusion_certified",
      "interval_active_endpoint_enclosure_present",
      "active_endpoint_interval_enclosure_proof_data_ready",
    ],
  },
  {
    method_id: "active_endpoint_enclosure_as_boundary_opening_replay",
    description:
      "Try to promote active-endpoint enclosures into a strict boundary-opening interval proof with ownership, monotonicity, replay, and row consumption.",
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
      "proof_interval_v1_v6_rerun_for_candidate_change",
      "preledger_pass",
      "row_consumed",
      "branch_chart_authorized",
    ],
  },
];

function parseArgs(argv) {
  const args = {
    boundaryOpeningAttempt: DEFAULT_BOUNDARY_OPENING_ATTEMPT,
    activeEndpointAttempt: DEFAULT_ACTIVE_ENDPOINT_ATTEMPT,
    intervalBoxAttempt: DEFAULT_INTERVAL_BOX_ATTEMPT,
    residualSourceDataAudit: DEFAULT_RESIDUAL_SOURCE_DATA_AUDIT,
    residualDataAttempt: DEFAULT_RESIDUAL_DATA_ATTEMPT,
    witnessObjectAttempt: DEFAULT_WITNESS_OBJECT_ATTEMPT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--boundary-opening-attempt") {
      args.boundaryOpeningAttempt = argv[++index];
    } else if (arg === "--active-endpoint-attempt") {
      args.activeEndpointAttempt = argv[++index];
    } else if (arg === "--interval-box-attempt") {
      args.intervalBoxAttempt = argv[++index];
    } else if (arg === "--residual-source-data-audit") {
      args.residualSourceDataAudit = argv[++index];
    } else if (arg === "--residual-data-attempt") {
      args.residualDataAttempt = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-one-leaf-active-endpoint-interval-enclosure-proof-data-construction-attempt.mjs [options]

Options:
  --boundary-opening-attempt PATH     One-leaf boundary-opening interval-certificate attempt JSON. Defaults to ${DEFAULT_BOUNDARY_OPENING_ATTEMPT}.
  --active-endpoint-attempt PATH      One-leaf active-endpoint interval-enclosure attempt JSON. Defaults to ${DEFAULT_ACTIVE_ENDPOINT_ATTEMPT}.
  --interval-box-attempt PATH         One-leaf endpoint interval-box no-switch construction attempt JSON. Defaults to ${DEFAULT_INTERVAL_BOX_ATTEMPT}.
  --residual-source-data-audit PATH   One-leaf active-endpoint residual source-data audit JSON. Defaults to ${DEFAULT_RESIDUAL_SOURCE_DATA_AUDIT}.
  --residual-data-attempt PATH        One-leaf active-endpoint residual-data construction attempt JSON. Defaults to ${DEFAULT_RESIDUAL_DATA_ATTEMPT}.
  --witness-object-attempt PATH       Endpoint boundary-binding witness-object attempt JSON. Defaults to ${DEFAULT_WITNESS_OBJECT_ATTEMPT}.
  --out-dir PATH                      Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                            Pretty-print JSON artifact.
  --help                              Show this help.`);
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
      throw new Error(`Refusing proof-data construction from authorized ${name}.`);
    }
  }
  if (inputs.witnessObjectAttempt.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(
      `Unexpected witness-object fold-coordinate packet id: ${inputs.witnessObjectAttempt.fold_coordinate_packet_id}`
    );
  }
  assertRows(inputs.boundaryOpeningAttempt, "row_interval_certificate_attempts", 3, "boundary-opening attempt");
  assertRows(inputs.activeEndpointAttempt, "row_active_endpoint_interval_enclosure_attempts", 3, "active-endpoint attempt");
  assertRows(inputs.intervalBoxAttempt, "row_endpoint_interval_box_no_switch_attempts", 3, "interval-box attempt");
  assertRows(inputs.residualSourceDataAudit, "row_active_endpoint_residual_source_data_audits", 3, "residual source-data audit");
  assertRows(inputs.residualDataAttempt, "row_active_endpoint_residual_data_construction_attempts", 3, "residual-data attempt");
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
      (field) => `missing_one_leaf_active_endpoint_interval_enclosure_proof_data_${field}`
    ),
    passed: missingFields.length === 0,
  };
}

function buildRowAttempt(activeRow, boxRow, residualSourceRow, residualDataRow, boundaryRow, witnessRow) {
  const activeFields = activeRow.required_fields_present;
  const boxFields = boxRow.required_fields_present;
  const residualSourceFields = residualSourceRow.required_fields_present;
  const residualDataFields = residualDataRow.required_fields_present;
  const boundaryFields = boundaryRow.required_fields_present;
  const witnessFields = witnessRow.required_fields_present;
  const fields = {
    candidate_lambda_interval_declared:
      activeFields.candidate_lambda_interval_declared === true &&
      boxFields.candidate_lambda_interval_declared === true &&
      residualSourceFields.candidate_lambda_interval_declared === true &&
      boundaryFields.candidate_lambda_interval_declared === true,
    candidate_lambda_interval_nonempty:
      activeFields.candidate_lambda_interval_nonempty === true &&
      boxFields.candidate_lambda_interval_nonempty === true &&
      residualSourceFields.candidate_lambda_interval_nonempty === true &&
      boundaryFields.candidate_lambda_interval_nonempty === true,
    sampled_active_endpoint_stability_present:
      activeFields.sampled_active_endpoint_stability_present === true &&
      boxFields.sampled_active_endpoint_stability_present === true &&
      boundaryFields.sampled_active_endpoint_stability_present === true,
    sampled_endpoint_values_present:
      boxFields.sampled_endpoint_values_present === true &&
      residualSourceFields.sampled_endpoint_values_present === true &&
      residualDataFields.sampled_endpoint_values_present === true,
    sampled_lambda_derivative_sample_present:
      residualSourceFields.sampled_lambda_derivative_sample_present === true &&
      residualDataFields.sampled_lambda_derivative_sample_present === true,
    constant_theta_endpoint_box_candidate_present:
      residualSourceFields.constant_theta_endpoint_box_candidate_present === true &&
      residualDataFields.constant_theta_endpoint_box_candidate_present === true &&
      boxFields.constant_theta_endpoint_box_candidate_declared === true,
    sampled_opening_above_probe_threshold_present:
      activeFields.sampled_opening_above_probe_threshold_present === true &&
      boxFields.sampled_opening_above_probe_threshold_present === true &&
      boundaryFields.sampled_opening_above_probe_threshold_present === true,
    row_boundary_binding_source_data_ready:
      residualDataFields.row_boundary_binding_source_data_ready === true,
    endpoint_boundary_binding_witness_object_input_pair_ready:
      witnessFields.combined_endpoint_boundary_binding_witness_object_input_pair_ready === true,
    imported_trial_root_topology_recertified:
      boundaryFields.imported_trial_root_topology_recertified === true,
    imported_trial_preledger_replay_present:
      boundaryFields.imported_trial_preledger_replay_present === true,
  };
  for (const field of TARGET_FIELDS) {
    fields[field] = true;
  }
  Object.assign(fields, {
    source_endpoint_interval_box_constructed:
      boxFields.source_endpoint_interval_box_constructed === true,
    receiver_endpoint_interval_box_constructed:
      boxFields.receiver_endpoint_interval_box_constructed === true,
    source_endpoint_residual_function_on_box_constructed:
      residualDataFields.source_endpoint_residual_function_on_box_constructed === true,
    receiver_endpoint_residual_function_on_box_constructed:
      residualDataFields.receiver_endpoint_residual_function_on_box_constructed === true,
    source_endpoint_residual_interval_bound_constructed:
      boxFields.source_endpoint_residual_interval_bound_constructed === true,
    receiver_endpoint_residual_interval_bound_constructed:
      boxFields.receiver_endpoint_residual_interval_bound_constructed === true,
    source_endpoint_derivative_isolation_certified:
      boxFields.source_endpoint_derivative_isolation_certified === true,
    receiver_endpoint_derivative_isolation_certified:
      boxFields.receiver_endpoint_derivative_isolation_certified === true,
    source_endpoint_unique_on_interval_certified:
      boxFields.source_endpoint_unique_on_interval_certified === true,
    receiver_endpoint_unique_on_interval_certified:
      boxFields.receiver_endpoint_unique_on_interval_certified === true,
    active_endpoint_pair_constant_on_interval_certified:
      boxFields.active_endpoint_pair_constant_on_interval_certified === true ||
      activeFields.active_endpoint_pair_constant_on_interval_certified === true,
    source_endpoint_switch_exclusion_certified:
      boxFields.source_endpoint_switch_exclusion_certified === true,
    receiver_endpoint_switch_exclusion_certified:
      boxFields.receiver_endpoint_switch_exclusion_certified === true,
    endpoint_switch_exclusion_certified:
      boxFields.endpoint_switch_exclusion_certified === true ||
      activeFields.endpoint_switch_exclusion_certified === true,
    active_endpoint_gap_margin_positive_on_interval:
      boxFields.active_endpoint_gap_margin_positive_on_interval === true ||
      activeFields.active_endpoint_gap_margin_positive_on_interval === true,
    interval_active_endpoint_enclosure_present:
      activeFields.interval_active_endpoint_enclosure_present === true ||
      boxFields.interval_active_endpoint_enclosure_present === true ||
      boundaryFields.interval_active_endpoint_enclosure_present === true,
    interval_defect_derivative_bound_present:
      activeFields.interval_defect_derivative_bound_present === true ||
      boundaryFields.interval_defect_derivative_bound_present === true,
    strict_combined_boundary_opening_gt_threshold:
      activeFields.strict_combined_boundary_opening_gt_threshold === true,
    interval_boundary_opening_positive_certified:
      activeFields.interval_boundary_opening_positive_certified === true ||
      boundaryFields.interval_boundary_opening_positive_certified === true,
    source_monotonicity_preserved_on_interval:
      activeFields.source_monotonicity_preserved_on_interval === true ||
      boundaryFields.source_monotonicity_preserved_on_interval === true,
    receiver_monotonicity_preserved_on_interval:
      activeFields.receiver_monotonicity_preserved_on_interval === true ||
      boundaryFields.receiver_monotonicity_preserved_on_interval === true,
    memory_margins_certified_on_interval:
      activeFields.memory_margins_certified_on_interval === true ||
      boundaryFields.memory_margins_certified_on_interval === true,
    endpoint_ownership_no_double_counting_certified:
      activeFields.endpoint_ownership_no_double_counting_certified === true ||
      boundaryFields.endpoint_ownership_no_double_counting_certified === true,
    simple_root_branch_reuse_exclusion_certified:
      boundaryFields.simple_root_branch_reuse_exclusion_certified === true,
    non_owned_complement_closed:
      activeFields.non_owned_complement_closed === true ||
      boundaryFields.non_owned_complement_closed === true,
    source_endpoint_boundary_binding_witness_object_constructed:
      witnessFields.source_endpoint_boundary_binding_witness_object_constructed === true,
    receiver_endpoint_boundary_binding_witness_object_constructed:
      witnessFields.receiver_endpoint_boundary_binding_witness_object_constructed === true,
    combined_endpoint_boundary_binding_witness_object_pair_constructed:
      witnessFields.combined_endpoint_boundary_binding_witness_object_pair_constructed === true,
    source_endpoint_boundary_binding_constructed:
      witnessFields.source_endpoint_boundary_binding_constructed === true ||
      residualDataFields.source_endpoint_boundary_binding_constructed === true,
    receiver_endpoint_boundary_binding_constructed:
      witnessFields.receiver_endpoint_boundary_binding_constructed === true ||
      residualDataFields.receiver_endpoint_boundary_binding_constructed === true,
    combined_boundary_binding_pair_constructed:
      witnessFields.combined_boundary_binding_pair_constructed === true ||
      residualDataFields.combined_boundary_binding_pair_constructed === true,
    source_endpoint_motion_rule_constructed:
      witnessFields.source_endpoint_motion_rule_constructed === true ||
      residualDataFields.source_endpoint_motion_rule_constructed === true,
    receiver_endpoint_motion_rule_constructed:
      witnessFields.receiver_endpoint_motion_rule_constructed === true ||
      residualDataFields.receiver_endpoint_motion_rule_constructed === true,
    combined_endpoint_evaluation_map_pair_constructed:
      witnessFields.combined_endpoint_evaluation_map_pair_constructed === true,
    same_packet_history_update_formula_present:
      witnessFields.same_packet_history_update_formula_present === true ||
      residualDataFields.same_packet_history_update_formula_present === true,
    candidate_artifacts_present:
      witnessFields.candidate_artifacts_present === true ||
      residualDataFields.candidate_artifacts_present === true,
    root_topology_recertified_for_candidate_change:
      witnessFields.root_topology_recertified_for_candidate_change === true ||
      residualDataFields.root_topology_recertified_for_candidate_change === true,
    proof_interval_v1_v6_rerun_for_candidate_change:
      witnessFields.proof_interval_v1_v6_rerun_for_candidate_change === true ||
      residualDataFields.proof_interval_v1_v6_rerun_for_candidate_change === true,
    preledger_pass: false,
    row_consumed: false,
    branch_chart_authorized: false,
  });
  fields.active_endpoint_interval_enclosure_proof_data_ready = REQUIRED_PROOF_DATA_FIELDS.every(
    (field) => fields[field] === true
  );
  const missingFields = REQUIRED_PROOF_DATA_FIELDS.filter((field) => fields[field] !== true);
  const methodResults = PROOF_DATA_METHODS.map((method) => methodResult(method, fields));
  return {
    row_id: activeRow.row_id,
    cover_id: activeRow.cover_id,
    ledger: activeRow.ledger,
    source_interval: activeRow.source_interval,
    receiver_interval: activeRow.receiver_interval,
    failed_side: activeRow.failed_side,
    boundary_side: activeRow.sampled_active_endpoint_pair.boundary_side,
    candidate_lambda_interval: activeRow.candidate_lambda_interval,
    sampled_active_endpoint_pair: activeRow.sampled_active_endpoint_pair,
    sampled_boundary_values: activeRow.sampled_boundary_values,
    inherited_source_layers: {
      active_endpoint_sampled_interval_ready: activeRow.interval_active_endpoint_enclosure_constructed === false,
      endpoint_box_candidate_only: boxRow.proof_grade_endpoint_box_no_switch_constructed === false,
      residual_source_data_ready: residualSourceRow.residual_source_data_ready,
      residual_data_construction_ready: residualDataRow.residual_data_construction_ready,
      witness_object_input_pair_ready:
        witnessFields.combined_endpoint_boundary_binding_witness_object_input_pair_ready === true,
      interval_certificate_constructed: boundaryRow.interval_certificate_constructed,
    },
    required_fields_present: fields,
    construction_method_results: methodResults,
    passed_methods: methodResults.filter((method) => method.passed).map((method) => method.method_id),
    missing_proof_data_fields: missingFields,
    failure_codes: missingFields.map(
      (field) => `missing_one_leaf_active_endpoint_interval_enclosure_proof_data_${field}`
    ),
    active_endpoint_interval_enclosure_proof_data_ready:
      fields.active_endpoint_interval_enclosure_proof_data_ready,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has sampled endpoint stability, sampled endpoint values, constant-theta endpoint-box candidates, boundary-binding source data, and witness-object inputs, but no proof-grade endpoint interval boxes, residual functions on boxes, interval residual bounds, derivative isolation, endpoint uniqueness, switch exclusion, endpoint-gap margin, active-endpoint interval enclosure, boundary-opening proof, same-packet witness object, motion/evaluation map, candidate artifact, topology replay, preledger pass, or row consumption.",
  };
}

function buildAttempt(inputs, paths) {
  assertInputs(inputs);
  const boxRows = rowMap(inputs.intervalBoxAttempt.row_endpoint_interval_box_no_switch_attempts, "interval-box attempt");
  const residualSourceRows = rowMap(
    inputs.residualSourceDataAudit.row_active_endpoint_residual_source_data_audits,
    "residual source-data audit"
  );
  const residualDataRows = rowMap(
    inputs.residualDataAttempt.row_active_endpoint_residual_data_construction_attempts,
    "residual-data attempt"
  );
  const boundaryRows = rowMap(inputs.boundaryOpeningAttempt.row_interval_certificate_attempts, "boundary-opening attempt");
  const witnessRows = rowMap(
    inputs.witnessObjectAttempt.row_endpoint_boundary_binding_witness_object_attempts,
    "witness-object attempt"
  );
  const rowAttempts = inputs.activeEndpointAttempt.row_active_endpoint_interval_enclosure_attempts.map((activeRow) =>
    buildRowAttempt(
      activeRow,
      requireRow(boxRows, activeRow.row_id, "interval-box attempt"),
      requireRow(residualSourceRows, activeRow.row_id, "residual source-data audit"),
      requireRow(residualDataRows, activeRow.row_id, "residual-data attempt"),
      requireRow(boundaryRows, activeRow.row_id, "boundary-opening attempt"),
      requireRow(witnessRows, activeRow.row_id, "witness-object attempt")
    )
  );
  const fieldCounts = Object.fromEntries(
    ROW_PROOF_DATA_FIELDS.map((field) => [
      field,
      countTrue(rowAttempts, (row) => row.required_fields_present[field]),
    ])
  );
  return {
    schema:
      "breather-higher-fold-one-leaf-active-endpoint-interval-enclosure-proof-data-construction-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: STATUS,
    theorem_target: "One-Leaf Active-Endpoint Interval-Enclosure Proof Data Construction Attempt",
    claim_level:
      "priority-only construction attempt; sampled active-endpoint and witness-object input layers are present, but proof-grade interval-enclosure data are absent",
    source_artifacts: {
      one_leaf_boundary_opening_interval_certificate_attempt: artifactRecord(paths.boundaryOpeningAttempt),
      one_leaf_active_endpoint_interval_enclosure_attempt: artifactRecord(paths.activeEndpointAttempt),
      one_leaf_active_endpoint_interval_box_no_switch_construction_attempt: artifactRecord(paths.intervalBoxAttempt),
      one_leaf_active_endpoint_residual_source_data_audit: artifactRecord(paths.residualSourceDataAudit),
      one_leaf_active_endpoint_residual_data_construction_attempt: artifactRecord(paths.residualDataAttempt),
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
      proof_data_target_declared: true,
      sampled_active_endpoint_data_promoted_to_interval_proof_data: false,
      constant_theta_endpoint_candidate_promoted_to_interval_box: false,
      witness_object_input_promoted_to_boundary_binding: false,
      residual_data_attempt_promoted_to_active_endpoint_enclosure: false,
      active_endpoint_enclosure_promoted_to_boundary_opening_replay: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    proof_data_rule:
      "A one-leaf active-endpoint interval-enclosure proof-data packet must construct source and receiver endpoint interval boxes, endpoint residual functions on those boxes, outward residual interval bounds, derivative-isolation and endpoint-uniqueness certificates, no-switch exclusions, endpoint-gap bounds, an active-endpoint interval enclosure, strict boundary-opening positivity, monotonicity/memory/ownership closure, same-packet endpoint boundary bindings with motion/evaluation maps, candidate artifacts, topology recertification, proof-interval v1-v6 replay, a preledger pass, and row consumption before branch-chart authorization.",
    no_promotion_rule:
      "Sampled endpoint stability, sampled endpoint values, sampled lambda derivatives, constant-theta endpoint-box candidates, boundary-binding source data, and witness-object inputs are source inputs only. They do not by themselves define interval proof data, active-endpoint enclosures, preledger passes, row consumption, live-ledger updates, or branch-chart authorization.",
    construction_methods: PROOF_DATA_METHODS,
    summary: {
      rows: rowAttempts.length,
      candidate_lambda_intervals_declared: fieldCounts.candidate_lambda_interval_declared,
      candidate_lambda_intervals_nonempty: fieldCounts.candidate_lambda_interval_nonempty,
      sampled_active_endpoint_stability_rows: fieldCounts.sampled_active_endpoint_stability_present,
      sampled_endpoint_value_rows: fieldCounts.sampled_endpoint_values_present,
      sampled_lambda_derivative_sample_rows: fieldCounts.sampled_lambda_derivative_sample_present,
      constant_theta_endpoint_box_candidate_rows:
        fieldCounts.constant_theta_endpoint_box_candidate_present,
      boundary_binding_source_data_rows: fieldCounts.row_boundary_binding_source_data_ready,
      witness_object_input_pair_rows:
        fieldCounts.endpoint_boundary_binding_witness_object_input_pair_ready,
      proof_data_target_declared_rows:
        fieldCounts.active_endpoint_interval_enclosure_proof_data_target_declared,
      source_endpoint_interval_box_rows: fieldCounts.source_endpoint_interval_box_constructed,
      receiver_endpoint_interval_box_rows: fieldCounts.receiver_endpoint_interval_box_constructed,
      endpoint_residual_function_on_box_rows: Math.min(
        fieldCounts.source_endpoint_residual_function_on_box_constructed,
        fieldCounts.receiver_endpoint_residual_function_on_box_constructed
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
      active_endpoint_gap_margin_rows: fieldCounts.active_endpoint_gap_margin_positive_on_interval,
      interval_active_endpoint_enclosure_rows: fieldCounts.interval_active_endpoint_enclosure_present,
      interval_defect_derivative_bound_rows: fieldCounts.interval_defect_derivative_bound_present,
      strict_combined_boundary_opening_gt_threshold_rows:
        fieldCounts.strict_combined_boundary_opening_gt_threshold,
      interval_boundary_opening_positive_rows:
        fieldCounts.interval_boundary_opening_positive_certified,
      monotonicity_memory_ownership_closure_rows: Math.min(
        fieldCounts.source_monotonicity_preserved_on_interval,
        fieldCounts.receiver_monotonicity_preserved_on_interval,
        fieldCounts.memory_margins_certified_on_interval,
        fieldCounts.endpoint_ownership_no_double_counting_certified,
        fieldCounts.non_owned_complement_closed
      ),
      witness_object_pair_rows:
        fieldCounts.combined_endpoint_boundary_binding_witness_object_pair_constructed,
      boundary_binding_pair_rows: fieldCounts.combined_boundary_binding_pair_constructed,
      endpoint_evaluation_map_pair_rows:
        fieldCounts.combined_endpoint_evaluation_map_pair_constructed,
      candidate_artifact_rows: fieldCounts.candidate_artifacts_present,
      topology_recertification_rows:
        fieldCounts.root_topology_recertified_for_candidate_change,
      proof_interval_replay_rows:
        fieldCounts.proof_interval_v1_v6_rerun_for_candidate_change,
      active_endpoint_interval_enclosure_proof_data_ready_rows:
        fieldCounts.active_endpoint_interval_enclosure_proof_data_ready,
      preledger_pass_rows: fieldCounts.preledger_pass,
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    row_proof_data_field_counts: fieldCounts,
    row_active_endpoint_interval_enclosure_proof_data_construction_attempts: rowAttempts,
    capture_decision:
      "Priority-only. The construction attempt declares the active-endpoint interval-enclosure proof-data target and preserves 3 / 3 sampled active-endpoint rows, sampled endpoint-value rows, sampled lambda-derivative rows, constant-theta endpoint-box candidates, boundary-binding source-data rows, and witness-object input pairs. It fail-closes because it constructs 0 / 3 source/receiver endpoint interval boxes, endpoint residual functions on boxes, residual interval bounds, derivative-isolation rows, endpoint uniqueness rows, switch-exclusion rows, endpoint-gap rows, interval active-endpoint enclosures, strict boundary-opening rows, monotonicity/memory/ownership closure rows, witness-object pairs, boundary-binding pairs, motion/evaluation-map pairs, candidate artifacts, topology recertifications, proof-interval replays, preledger passes, or consumed rows.",
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
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.sampled_endpoint_values_present} | ${row.required_fields_present.constant_theta_endpoint_box_candidate_present} | ${row.required_fields_present.endpoint_boundary_binding_witness_object_input_pair_ready} | ${row.required_fields_present.source_endpoint_interval_box_constructed} | ${row.required_fields_present.source_endpoint_residual_function_on_box_constructed} | ${row.required_fields_present.endpoint_switch_exclusion_certified} | ${row.required_fields_present.interval_active_endpoint_enclosure_present} | ${row.active_endpoint_interval_enclosure_proof_data_ready} |`
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
  return `# Higher-Fold One-Leaf Active-Endpoint Interval-Enclosure Proof Data Construction Attempt

## Verdict

Status: \`${attempt.status}\`.

This priority-only construction attempt tests whether the existing one-leaf
active-endpoint stack has proof-grade interval-enclosure data rather than only
sampled endpoint evidence, constant-theta endpoint-box candidates, residual
source inputs, and endpoint boundary-binding witness-object inputs.

The packet fail-closes. It preserves ${summary.sampled_active_endpoint_stability_rows}
/ ${summary.rows} sampled active-endpoint stability rows,
${summary.sampled_endpoint_value_rows} / ${summary.rows} sampled endpoint-value
rows, ${summary.sampled_lambda_derivative_sample_rows} / ${summary.rows}
sampled lambda-derivative rows, ${summary.constant_theta_endpoint_box_candidate_rows}
/ ${summary.rows} constant-theta endpoint-box candidates,
${summary.boundary_binding_source_data_rows} / ${summary.rows}
boundary-binding source-data rows, and ${summary.witness_object_input_pair_rows}
/ ${summary.rows} witness-object input pairs. It declares ${summary.proof_data_target_declared_rows}
/ ${summary.rows} active-endpoint interval-enclosure proof-data targets.

It constructs 0 / ${summary.rows} source endpoint interval boxes, 0 /
${summary.rows} receiver endpoint interval boxes, 0 / ${summary.rows}
endpoint residual functions on boxes, 0 / ${summary.rows} residual interval
bounds, 0 / ${summary.rows} derivative-isolation rows, 0 / ${summary.rows}
endpoint uniqueness rows, 0 / ${summary.rows} switch-exclusion rows, 0 /
${summary.rows} endpoint-gap rows, 0 / ${summary.rows} interval active-endpoint
enclosures, 0 / ${summary.rows} strict boundary-opening rows, 0 /
${summary.rows} monotonicity/memory/ownership closure rows, 0 /
${summary.rows} witness-object pairs, 0 / ${summary.rows} boundary-binding
pairs, 0 / ${summary.rows} endpoint evaluation-map pairs, 0 / ${summary.rows}
candidate-artifact rows, 0 / ${summary.rows} topology recertification rows,
and 0 / ${summary.rows} proof-interval replay rows. It consumes 0 rows, keeps
\`preledger_pass=false\`, keeps \`updates_live_ledger=false\`, keeps
\`branch_chart_authorized=false\`, and emits no live-ledger update.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${sourceTable(attempt.source_artifacts)}

## Proof-Data Rule

${attempt.proof_data_rule}

## No-Promotion Rule

${attempt.no_promotion_rule}

## Construction Methods

| Method | Required fields | Description |
| --- | ---: | --- |
${methodTable(attempt.construction_methods)}

## Row Attempts

| Row | Failed side | Sampled values | Box candidate | Witness-object input | Endpoint box | Residual function | No-switch | Active-endpoint enclosure | Proof data ready |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(attempt.row_active_endpoint_interval_enclosure_proof_data_construction_attempts)}

## Field Counts

| Field | Present count |
| --- | ---: |
${fieldCountTable(attempt.row_proof_data_field_counts, summary.rows)}

## Construction Blocker

The next constructive object is a proof-data layer, not another sampled
endpoint comparison. The packet needs same-packet endpoint residual functions
on source and receiver boxes, outward interval residual bounds, derivative
isolation, endpoint uniqueness, no-switch exclusion, endpoint-gap bounds,
strict boundary-opening replay, ownership/no-double-counting closure, and
proof-interval v1-v6 replay before any row can pass the preledger.

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
    boundaryOpeningAttempt: readJson(args.boundaryOpeningAttempt),
    activeEndpointAttempt: readJson(args.activeEndpointAttempt),
    intervalBoxAttempt: readJson(args.intervalBoxAttempt),
    residualSourceDataAudit: readJson(args.residualSourceDataAudit),
    residualDataAttempt: readJson(args.residualDataAttempt),
    witnessObjectAttempt: readJson(args.witnessObjectAttempt),
  };
  const paths = {
    boundaryOpeningAttempt: args.boundaryOpeningAttempt,
    activeEndpointAttempt: args.activeEndpointAttempt,
    intervalBoxAttempt: args.intervalBoxAttempt,
    residualSourceDataAudit: args.residualSourceDataAudit,
    residualDataAttempt: args.residualDataAttempt,
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

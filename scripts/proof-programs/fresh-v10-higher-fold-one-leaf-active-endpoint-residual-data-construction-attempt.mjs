#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_RESIDUAL_SOURCE_DATA_AUDIT = `${CERT_DIR}/one_leaf_active_endpoint_residual_source_data_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_EXPLICIT_PSI_FORMULA_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_explicit_psi_formula_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_COMPONENT_UNION_CHART_CERTIFICATE = `${CERT_DIR}/fold_coordinate_endpoint_functional_component_union_chart_certificate.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BOUNDARY_BINDING_SOURCE_DATA_AUDIT = `${CERT_DIR}/fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_source_data_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_BOUNDARY_BINDING_CONSTRUCTION_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `one_leaf_active_endpoint_residual_data_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `one_leaf_active_endpoint_residual_data_construction_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const ROW_RESIDUAL_DATA_FIELDS = [
  "sampled_endpoint_values_present",
  "sampled_lambda_derivative_sample_present",
  "constant_theta_endpoint_box_candidate_present",
  "source_formula_candidate_declared",
  "receiver_formula_candidate_declared",
  "source_target_action_exact",
  "receiver_target_action_exact",
  "combined_component_union_chart_pair_constructed",
  "row_boundary_binding_source_data_ready",
  "source_endpoint_boundary_binding_constructed",
  "receiver_endpoint_boundary_binding_constructed",
  "source_endpoint_motion_rule_constructed",
  "receiver_endpoint_motion_rule_constructed",
  "combined_boundary_binding_pair_constructed",
  "same_packet_history_update_formula_present",
  "source_endpoint_residual_function_on_box_constructed",
  "receiver_endpoint_residual_function_on_box_constructed",
  "endpoint_residual_interval_bound_constructed",
  "endpoint_derivative_isolation_certified",
  "endpoint_uniqueness_certified",
  "competing_endpoint_exclusion_certified",
  "endpoint_gap_interval_bound_constructed",
  "interval_active_endpoint_enclosure_present",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
  "preledger_pass",
  "row_consumed",
  "branch_chart_authorized",
  "residual_data_construction_ready",
];

const REQUIRED_ROW_RESIDUAL_DATA_FIELDS = [
  "source_endpoint_boundary_binding_constructed",
  "receiver_endpoint_boundary_binding_constructed",
  "source_endpoint_motion_rule_constructed",
  "receiver_endpoint_motion_rule_constructed",
  "combined_boundary_binding_pair_constructed",
  "same_packet_history_update_formula_present",
  "source_endpoint_residual_function_on_box_constructed",
  "receiver_endpoint_residual_function_on_box_constructed",
  "endpoint_residual_interval_bound_constructed",
  "endpoint_derivative_isolation_certified",
  "endpoint_uniqueness_certified",
  "competing_endpoint_exclusion_certified",
  "endpoint_gap_interval_bound_constructed",
  "interval_active_endpoint_enclosure_present",
  "candidate_artifacts_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_v1_v6_rerun_for_candidate_change",
];

const CONSTRUCTION_METHODS = [
  {
    method_id: "endpoint_functional_sources_as_residual_functions",
    description:
      "Try to promote endpoint-local Psi formulas, component-union charts, and boundary-binding source data into source and receiver endpoint residual functions on boxes.",
    required_fields: [
      "source_formula_candidate_declared",
      "receiver_formula_candidate_declared",
      "combined_component_union_chart_pair_constructed",
      "row_boundary_binding_source_data_ready",
      "source_endpoint_boundary_binding_constructed",
      "receiver_endpoint_boundary_binding_constructed",
      "source_endpoint_motion_rule_constructed",
      "receiver_endpoint_motion_rule_constructed",
      "source_endpoint_residual_function_on_box_constructed",
      "receiver_endpoint_residual_function_on_box_constructed",
    ],
  },
  {
    method_id: "sampled_values_as_residual_interval_bounds",
    description:
      "Try to promote sampled endpoint values and sampled lambda derivatives into residual interval bounds over the candidate lambda interval.",
    required_fields: [
      "sampled_endpoint_values_present",
      "sampled_lambda_derivative_sample_present",
      "source_endpoint_residual_function_on_box_constructed",
      "receiver_endpoint_residual_function_on_box_constructed",
      "endpoint_residual_interval_bound_constructed",
      "endpoint_derivative_isolation_certified",
      "endpoint_uniqueness_certified",
    ],
  },
  {
    method_id: "boundary_binding_sources_as_interval_box_residual_data",
    description:
      "Try to promote boundary-binding source data into proof-grade active-endpoint residual data on interval boxes.",
    required_fields: [
      "row_boundary_binding_source_data_ready",
      "combined_boundary_binding_pair_constructed",
      "same_packet_history_update_formula_present",
      "endpoint_residual_interval_bound_constructed",
      "candidate_artifacts_present",
      "root_topology_recertified_for_candidate_change",
      "proof_interval_v1_v6_rerun_for_candidate_change",
    ],
  },
  {
    method_id: "component_union_charts_as_no_switch_enclosure",
    description:
      "Try to promote component-union chart pairs and residual bounds into no-switch active-endpoint interval enclosures.",
    required_fields: [
      "combined_component_union_chart_pair_constructed",
      "endpoint_residual_interval_bound_constructed",
      "competing_endpoint_exclusion_certified",
      "endpoint_gap_interval_bound_constructed",
      "interval_active_endpoint_enclosure_present",
      "preledger_pass",
      "row_consumed",
      "branch_chart_authorized",
    ],
  },
];

function parseArgs(argv) {
  const args = {
    residualSourceDataAudit: DEFAULT_RESIDUAL_SOURCE_DATA_AUDIT,
    explicitPsiFormulaAttempt: DEFAULT_EXPLICIT_PSI_FORMULA_ATTEMPT,
    componentUnionChartCertificate: DEFAULT_COMPONENT_UNION_CHART_CERTIFICATE,
    boundaryBindingSourceDataAudit: DEFAULT_BOUNDARY_BINDING_SOURCE_DATA_AUDIT,
    boundaryBindingConstructionAttempt: DEFAULT_BOUNDARY_BINDING_CONSTRUCTION_ATTEMPT,
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
    } else if (arg === "--explicit-psi-formula-attempt") {
      args.explicitPsiFormulaAttempt = argv[++index];
    } else if (arg === "--component-union-chart-certificate") {
      args.componentUnionChartCertificate = argv[++index];
    } else if (arg === "--boundary-binding-source-data-audit") {
      args.boundaryBindingSourceDataAudit = argv[++index];
    } else if (arg === "--boundary-binding-construction-attempt") {
      args.boundaryBindingConstructionAttempt = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-one-leaf-active-endpoint-residual-data-construction-attempt.mjs [options]

Options:
  --residual-source-data-audit PATH             One-leaf residual source-data audit JSON. Defaults to ${DEFAULT_RESIDUAL_SOURCE_DATA_AUDIT}.
  --explicit-psi-formula-attempt PATH           Endpoint-functional explicit Psi formula attempt JSON. Defaults to ${DEFAULT_EXPLICIT_PSI_FORMULA_ATTEMPT}.
  --component-union-chart-certificate PATH      Endpoint-functional component-union chart certificate JSON. Defaults to ${DEFAULT_COMPONENT_UNION_CHART_CERTIFICATE}.
  --boundary-binding-source-data-audit PATH     Endpoint boundary-binding source-data audit JSON. Defaults to ${DEFAULT_BOUNDARY_BINDING_SOURCE_DATA_AUDIT}.
  --boundary-binding-construction-attempt PATH  Endpoint boundary-binding construction attempt JSON. Defaults to ${DEFAULT_BOUNDARY_BINDING_CONSTRUCTION_ATTEMPT}.
  --out-dir PATH                                Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                                      Pretty-print JSON artifact.
  --help                                        Show this help.`);
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

function requireMatchingRow(map, rowId, label) {
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

function assertInputs(inputs) {
  assertPacketId(inputs.residualSourceDataAudit, "residual source-data audit");
  assertPacketId(inputs.explicitPsiFormulaAttempt, "explicit Psi formula attempt");
  assertPacketId(inputs.componentUnionChartCertificate, "component-union chart certificate");
  assertPacketId(inputs.boundaryBindingSourceDataAudit, "boundary-binding source-data audit");
  assertPacketId(inputs.boundaryBindingConstructionAttempt, "boundary-binding construction attempt");
  const expectedStatuses = {
    residualSourceDataAudit:
      "one_leaf_active_endpoint_residual_source_data_audit_fail_closed_source_samples_present_residual_functions_absent_no_row_consumption",
    explicitPsiFormulaAttempt: "fold_coordinate_endpoint_functional_explicit_psi_formula_attempt_fail_closed",
    componentUnionChartCertificate:
      "fold_coordinate_endpoint_functional_component_union_chart_certificate_partial_pass_replay_blocked",
    boundaryBindingSourceDataAudit:
      "fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_source_data_audit_source_data_present_binding_absent",
    boundaryBindingConstructionAttempt:
      "fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_construction_attempt_fail_closed",
  };
  for (const [name, expectedStatus] of Object.entries(expectedStatuses)) {
    if (inputs[name].status !== expectedStatus) {
      throw new Error(`Unexpected ${name} status: ${inputs[name].status}`);
    }
  }
  for (const [name, source] of Object.entries(inputs)) {
    if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger) {
      throw new Error(`Refusing residual data construction from authorized ${name}.`);
    }
  }
  if (
    !Array.isArray(inputs.residualSourceDataAudit.row_active_endpoint_residual_source_data_audits) ||
    inputs.residualSourceDataAudit.row_active_endpoint_residual_source_data_audits.length !== 3
  ) {
    throw new Error("Expected exactly 3 residual source-data audit rows.");
  }
  if (
    !Array.isArray(inputs.explicitPsiFormulaAttempt.endpoint_explicit_psi_formula_attempts) ||
    inputs.explicitPsiFormulaAttempt.endpoint_explicit_psi_formula_attempts.length !== 4
  ) {
    throw new Error("Expected exactly 4 endpoint explicit-Psi formula attempts.");
  }
  if (
    !Array.isArray(inputs.componentUnionChartCertificate.endpoint_component_union_chart_certificates) ||
    inputs.componentUnionChartCertificate.endpoint_component_union_chart_certificates.length !== 4
  ) {
    throw new Error("Expected exactly 4 endpoint component-union chart certificates.");
  }
  if (
    !Array.isArray(inputs.boundaryBindingSourceDataAudit.endpoint_boundary_binding_source_data_audits) ||
    inputs.boundaryBindingSourceDataAudit.endpoint_boundary_binding_source_data_audits.length !== 4
  ) {
    throw new Error("Expected exactly 4 endpoint boundary-binding source-data audits.");
  }
  if (
    !Array.isArray(inputs.boundaryBindingConstructionAttempt.endpoint_boundary_binding_construction_attempts) ||
    inputs.boundaryBindingConstructionAttempt.endpoint_boundary_binding_construction_attempts.length !== 4
  ) {
    throw new Error("Expected exactly 4 endpoint boundary-binding construction attempts.");
  }
}

function methodResult(method, fields) {
  const missingFields = method.required_fields.filter((field) => fields[field] !== true);
  return {
    method_id: method.method_id,
    description: method.description,
    required_fields: method.required_fields,
    missing_fields: missingFields,
    failure_codes: missingFields.map(
      (field) => `missing_one_leaf_active_endpoint_residual_data_${field}`
    ),
    passed: missingFields.length === 0,
  };
}

function buildRowAttempt(rowSource, explicitRow, componentRow, boundarySourceRow, bindingRow) {
  const fields = {
    sampled_endpoint_values_present:
      rowSource.required_fields_present.sampled_endpoint_values_present === true,
    sampled_lambda_derivative_sample_present:
      rowSource.required_fields_present.sampled_lambda_derivative_sample_present === true,
    constant_theta_endpoint_box_candidate_present:
      rowSource.required_fields_present.constant_theta_endpoint_box_candidate_present === true,
    source_formula_candidate_declared:
      explicitRow.required_fields_present.source_formula_candidate_declared === true,
    receiver_formula_candidate_declared:
      explicitRow.required_fields_present.receiver_formula_candidate_declared === true,
    source_target_action_exact:
      explicitRow.required_fields_present.source_target_action_exact === true,
    receiver_target_action_exact:
      explicitRow.required_fields_present.receiver_target_action_exact === true,
    combined_component_union_chart_pair_constructed:
      componentRow.required_fields_present.combined_component_union_chart_pair_constructed === true,
    row_boundary_binding_source_data_ready:
      boundarySourceRow.required_fields_present.row_boundary_binding_source_data_ready === true &&
      bindingRow.required_fields_present.row_boundary_binding_source_data_ready === true,
    source_endpoint_boundary_binding_constructed:
      bindingRow.required_fields_present.source_endpoint_boundary_binding_constructed === true,
    receiver_endpoint_boundary_binding_constructed:
      bindingRow.required_fields_present.receiver_endpoint_boundary_binding_constructed === true,
    source_endpoint_motion_rule_constructed:
      bindingRow.required_fields_present.source_endpoint_motion_rule_constructed === true,
    receiver_endpoint_motion_rule_constructed:
      bindingRow.required_fields_present.receiver_endpoint_motion_rule_constructed === true,
    combined_boundary_binding_pair_constructed:
      bindingRow.required_fields_present.combined_boundary_binding_pair_constructed === true,
    same_packet_history_update_formula_present:
      bindingRow.required_fields_present.same_packet_history_update_formula_present === true,
    source_endpoint_residual_function_on_box_constructed: false,
    receiver_endpoint_residual_function_on_box_constructed: false,
    endpoint_residual_interval_bound_constructed: false,
    endpoint_derivative_isolation_certified: false,
    endpoint_uniqueness_certified: false,
    competing_endpoint_exclusion_certified: false,
    endpoint_gap_interval_bound_constructed: false,
    interval_active_endpoint_enclosure_present: false,
    candidate_artifacts_present:
      bindingRow.required_fields_present.candidate_artifacts_present === true,
    root_topology_recertified_for_candidate_change:
      bindingRow.required_fields_present.root_topology_recertified_for_candidate_change === true,
    proof_interval_v1_v6_rerun_for_candidate_change:
      bindingRow.required_fields_present.proof_interval_v1_v6_rerun_for_candidate_change === true,
    preledger_pass: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.residual_data_construction_ready = REQUIRED_ROW_RESIDUAL_DATA_FIELDS.every(
    (field) => fields[field] === true
  );
  const missingFields = REQUIRED_ROW_RESIDUAL_DATA_FIELDS.filter((field) => fields[field] !== true);
  return {
    row_id: rowSource.row_id,
    cover_id: rowSource.cover_id,
    source_interval: rowSource.source_interval,
    receiver_interval: rowSource.receiver_interval,
    failed_side: rowSource.failed_side,
    boundary_side: boundarySourceRow.boundary_side,
    source_variable: boundarySourceRow.source_variable,
    receiver_variable: boundarySourceRow.receiver_variable,
    source_boundary_ref: boundarySourceRow.source_boundary_ref,
    receiver_boundary_ref: boundarySourceRow.receiver_boundary_ref,
    candidate_lambda_interval: rowSource.candidate_lambda_interval,
    inherited_source_layers: {
      residual_source_data_ready: rowSource.residual_source_data_ready,
      formula_candidate_pair_declared: explicitRow.formula_candidate_pair_declared,
      local_target_action_pair_exact: explicitRow.local_target_action_pair_exact,
      partial_chart_pair_passed: componentRow.partial_chart_pair_passed,
      row_boundary_binding_source_data_ready: boundarySourceRow.row_boundary_binding_source_data_ready,
      boundary_binding_row_ready: bindingRow.row_ready,
    },
    required_fields_present: fields,
    construction_method_results: CONSTRUCTION_METHODS.map((method) => methodResult(method, fields)),
    missing_residual_data_fields: missingFields,
    failure_codes: missingFields.map(
      (field) => `missing_one_leaf_active_endpoint_residual_data_${field}`
    ),
    residual_data_construction_ready: fields.residual_data_construction_ready,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "Endpoint-functional formulas, component-union charts, and boundary-binding source data are present, but the row has no source/receiver endpoint boundary bindings, endpoint motion rules, residual functions on boxes, residual interval bounds, derivative isolation, endpoint uniqueness, competing-endpoint exclusion, endpoint-gap interval bound, candidate artifacts, topology recertification, or proof-interval replay.",
  };
}

function buildAttempt(inputs, paths) {
  assertInputs(inputs);
  const explicitRows = rowMap(
    inputs.explicitPsiFormulaAttempt.row_explicit_psi_formula_attempts,
    "explicit Psi formula row"
  );
  const componentRows = rowMap(
    inputs.componentUnionChartCertificate.row_component_union_chart_certificates,
    "component-union chart row"
  );
  const boundarySourceRows = rowMap(
    inputs.boundaryBindingSourceDataAudit.row_boundary_binding_source_data_audits,
    "boundary-binding source-data row"
  );
  const bindingRows = rowMap(
    inputs.boundaryBindingConstructionAttempt.row_boundary_binding_construction_attempts,
    "boundary-binding construction row"
  );
  const rowAttempts = inputs.residualSourceDataAudit.row_active_endpoint_residual_source_data_audits.map(
    (rowSource) =>
      buildRowAttempt(
        rowSource,
        requireMatchingRow(explicitRows, rowSource.row_id, "explicit Psi formula row"),
        requireMatchingRow(componentRows, rowSource.row_id, "component-union chart row"),
        requireMatchingRow(boundarySourceRows, rowSource.row_id, "boundary-binding source-data row"),
        requireMatchingRow(bindingRows, rowSource.row_id, "boundary-binding construction row")
      )
  );
  const fieldCounts = Object.fromEntries(
    ROW_RESIDUAL_DATA_FIELDS.map((field) => [
      field,
      countTrue(rowAttempts, (row) => row.required_fields_present[field]),
    ])
  );
  return {
    schema: "breather-higher-fold-one-leaf-active-endpoint-residual-data-construction-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status:
      "one_leaf_active_endpoint_residual_data_construction_attempt_fail_closed_endpoint_functional_sources_only_no_row_residual_functions_no_row_consumption",
    theorem_target: "One-Leaf Active-Endpoint Residual Data Construction Attempt",
    claim_level:
      "priority-only residual-data construction attempt; endpoint-functional formula candidates, component-union charts, and boundary-binding source data exist, but no row-level endpoint residual functions on interval boxes, residual interval bounds, no-switch enclosure, candidate artifacts, replay, or row consumption is constructed",
    source_artifacts: {
      one_leaf_active_endpoint_residual_source_data_audit: artifactRecord(
        paths.residualSourceDataAudit
      ),
      fold_coordinate_endpoint_functional_explicit_psi_formula_attempt: artifactRecord(
        paths.explicitPsiFormulaAttempt
      ),
      fold_coordinate_endpoint_functional_component_union_chart_certificate: artifactRecord(
        paths.componentUnionChartCertificate
      ),
      fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_source_data_audit:
        artifactRecord(paths.boundaryBindingSourceDataAudit),
      fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_construction_attempt:
        artifactRecord(paths.boundaryBindingConstructionAttempt),
    },
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    authorization_lock: {
      endpoint_functional_formula_candidate_promoted_to_residual_function: false,
      component_union_chart_promoted_to_endpoint_residual_box: false,
      boundary_binding_source_data_promoted_to_motion_rule: false,
      sampled_endpoint_values_promoted_to_residual_interval_bound: false,
      residual_data_promoted_to_no_switch_enclosure: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    residual_data_construction_rule:
      "A row-level active-endpoint residual data packet must bind source and receiver endpoint functionals to endpoint boundary bindings, same-packet motion/evaluation maps, residual functions on interval boxes, residual interval bounds, derivative-isolation and uniqueness certificates, competing-endpoint exclusions, endpoint-gap interval bounds, candidate artifacts, topology recertification, and proof-interval replay before any row can be consumed.",
    no_promotion_rule:
      "Endpoint-local Psi formula candidates, component-union charts, boundary refs and values, signed boundary-delta contracts, and sampled endpoint values are source data only. They do not by themselves define endpoint residual functions on boxes, active-endpoint interval enclosures, preledger passes, row consumption, or branch-chart authorization.",
    construction_methods: CONSTRUCTION_METHODS,
    summary: {
      rows: rowAttempts.length,
      endpoint_functionals: inputs.explicitPsiFormulaAttempt.summary.endpoint_functionals,
      sampled_source_rows: inputs.residualSourceDataAudit.summary.sampled_endpoint_value_rows,
      endpoint_local_formula_candidate_functionals:
        inputs.explicitPsiFormulaAttempt.summary.explicit_psi_formula_candidates_declared,
      local_derivative_formula_candidate_functionals:
        inputs.explicitPsiFormulaAttempt.summary.explicit_psi_derivative_formula_candidates_declared,
      local_target_action_identity_functionals:
        inputs.explicitPsiFormulaAttempt.summary.explicit_psi_local_target_actions_exact,
      component_union_chart_functionals:
        inputs.componentUnionChartCertificate.summary.component_union_domains_constructed,
      row_component_union_chart_pairs:
        inputs.componentUnionChartCertificate.summary.rows_with_component_union_chart_pairs,
      endpoint_boundary_source_data_functionals:
        inputs.boundaryBindingSourceDataAudit.summary.endpoint_boundary_binding_source_data_ready,
      row_boundary_source_data_pairs:
        inputs.boundaryBindingSourceDataAudit.summary.rows_with_boundary_binding_source_data_ready,
      endpoint_boundary_binding_functionals:
        inputs.boundaryBindingConstructionAttempt.summary.endpoint_boundary_bindings_constructed,
      endpoint_motion_rule_functionals:
        inputs.boundaryBindingConstructionAttempt.summary.endpoint_motion_rules_constructed,
      endpoint_evaluation_map_functionals:
        inputs.boundaryBindingConstructionAttempt.summary.endpoint_evaluation_maps_constructed,
      full_endpoint_evaluation_map_functionals:
        inputs.boundaryBindingConstructionAttempt.summary.full_endpoint_evaluation_maps_constructed,
      non_target_zero_certificate_functionals:
        inputs.boundaryBindingConstructionAttempt.summary.non_target_zero_certificates,
      exact_bxi_zero_certificate_functionals:
        inputs.boundaryBindingConstructionAttempt.summary.exact_screen_zero_certificates,
      rank_certificate_functionals:
        inputs.boundaryBindingConstructionAttempt.summary.rank_certificates,
      candidate_artifact_functionals:
        inputs.boundaryBindingConstructionAttempt.summary.candidate_artifacts_present,
      topology_recertification_functionals:
        inputs.boundaryBindingConstructionAttempt.summary.topology_recertifications,
      proof_interval_replay_functionals:
        inputs.boundaryBindingConstructionAttempt.summary.proof_interval_v1_v6_replays,
      endpoint_residual_function_on_box_rows:
        Math.min(
          fieldCounts.source_endpoint_residual_function_on_box_constructed,
          fieldCounts.receiver_endpoint_residual_function_on_box_constructed
        ),
      endpoint_residual_interval_bound_rows:
        fieldCounts.endpoint_residual_interval_bound_constructed,
      endpoint_derivative_isolation_rows:
        fieldCounts.endpoint_derivative_isolation_certified,
      endpoint_uniqueness_rows:
        fieldCounts.endpoint_uniqueness_certified,
      competing_endpoint_exclusion_rows:
        fieldCounts.competing_endpoint_exclusion_certified,
      endpoint_gap_interval_bound_rows:
        fieldCounts.endpoint_gap_interval_bound_constructed,
      interval_active_endpoint_enclosure_rows:
        fieldCounts.interval_active_endpoint_enclosure_present,
      residual_data_construction_ready_rows:
        fieldCounts.residual_data_construction_ready,
      preledger_pass_rows: fieldCounts.preledger_pass,
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    row_residual_data_field_counts: fieldCounts,
    row_active_endpoint_residual_data_construction_attempts: rowAttempts,
    capture_decision:
      "Priority-only. The construction attempt preserves 4 / 4 endpoint-local formula candidates, 4 / 4 component-union chart certificates, 4 / 4 boundary-binding source-data functionals, and 3 / 3 row chart/source-data pairs, but fail-closes because no endpoint boundary bindings, motion rules, endpoint evaluation maps, exact $B\\xi=0$ certificates, rank certificates, endpoint residual functions on boxes, residual interval bounds, candidate artifacts, topology recertifications, proof-interval replays, preledger passes, or consumed rows are present.",
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
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.source_formula_candidate_declared} | ${row.required_fields_present.combined_component_union_chart_pair_constructed} | ${row.required_fields_present.row_boundary_binding_source_data_ready} | ${row.required_fields_present.combined_boundary_binding_pair_constructed} | ${row.required_fields_present.source_endpoint_residual_function_on_box_constructed} | ${row.required_fields_present.endpoint_residual_interval_bound_constructed} | ${row.residual_data_construction_ready} |`
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
  return `# Higher-Fold One-Leaf Active-Endpoint Residual Data Construction Attempt

## Verdict

Status: \`${attempt.status}\`.

This priority-only construction attempt tests whether the endpoint-functional
source stack can be promoted into row-level active-endpoint residual functions
on interval boxes. It imports the residual source-data audit, the explicit
Psi-formula attempt, the component-union chart certificate, the post-component
boundary-binding source-data audit, and the boundary-binding construction
attempt.

The packet fail-closes. It preserves ${summary.endpoint_local_formula_candidate_functionals}
/ ${summary.endpoint_functionals} endpoint-local formula candidates,
${summary.local_derivative_formula_candidate_functionals} / ${summary.endpoint_functionals}
local derivative formula candidates, ${summary.component_union_chart_functionals} /
${summary.endpoint_functionals} component-union chart certificates, ${summary.endpoint_boundary_source_data_functionals}
/ ${summary.endpoint_functionals} boundary-binding source-data functionals, and
${summary.row_boundary_source_data_pairs} / ${summary.rows} row boundary-source
data pairs. It constructs 0 / ${summary.endpoint_functionals} endpoint boundary
bindings, 0 / ${summary.endpoint_functionals} endpoint motion rules, 0 /
${summary.endpoint_functionals} endpoint evaluation maps, 0 /
${summary.endpoint_functionals} full endpoint evaluation maps, 0 /
${summary.endpoint_functionals} non-target zero certificates, 0 /
${summary.endpoint_functionals} exact $B\\xi=0$ certificates, 0 /
${summary.endpoint_functionals} rank certificates, 0 / ${summary.rows}
row-level endpoint residual functions on boxes, 0 / ${summary.rows} residual
interval bounds, 0 / ${summary.rows} endpoint derivative-isolation rows, 0 /
${summary.rows} endpoint uniqueness rows, 0 / ${summary.rows}
competing-endpoint exclusion rows, 0 / ${summary.rows} endpoint-gap interval
bound rows, and 0 / ${summary.rows} interval active-endpoint enclosure rows.
It consumes 0 rows, keeps \`preledger_pass=false\`, keeps
\`updates_live_ledger=false\`, keeps \`branch_chart_authorized=false\`, emits no
candidate artifacts, emits no topology recertification, and emits no
proof-interval replay of its own.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${sourceTable(attempt.source_artifacts)}

## Construction Rule

${attempt.residual_data_construction_rule}

## No-Promotion Rule

${attempt.no_promotion_rule}

## Construction Methods

| Method | Required fields | Description |
| --- | ---: | --- |
${methodTable(attempt.construction_methods)}

## Row Attempts

| Row | Failed side | Formula candidate | Component-union pair | Boundary source data | Boundary-binding pair | Residual function on box | Residual interval bound | Residual data ready |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(attempt.row_active_endpoint_residual_data_construction_attempts)}

## Field Counts

| Field | Present count |
| --- | ---: |
${fieldCountTable(attempt.row_residual_data_field_counts, summary.rows)}

## Construction Blocker

The next constructive object is not another sampled endpoint comparison and
not another component-local formula candidate. It is the same-packet endpoint
boundary-binding and motion/evaluation layer that can turn the existing
endpoint-functional source material into residual functions on source and
receiver endpoint boxes, interval residual bounds, no-switch exclusions, and a
proof-interval replay.

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
    explicitPsiFormulaAttempt: readJson(args.explicitPsiFormulaAttempt),
    componentUnionChartCertificate: readJson(args.componentUnionChartCertificate),
    boundaryBindingSourceDataAudit: readJson(args.boundaryBindingSourceDataAudit),
    boundaryBindingConstructionAttempt: readJson(args.boundaryBindingConstructionAttempt),
  };
  const paths = {
    residualSourceDataAudit: args.residualSourceDataAudit,
    explicitPsiFormulaAttempt: args.explicitPsiFormulaAttempt,
    componentUnionChartCertificate: args.componentUnionChartCertificate,
    boundaryBindingSourceDataAudit: args.boundaryBindingSourceDataAudit,
    boundaryBindingConstructionAttempt: args.boundaryBindingConstructionAttempt,
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

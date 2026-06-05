#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CARRIER_OBLIGATION_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_carrier_field_obligation_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_WITNESS_OBJECT_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_witness_object_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON = `fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_carrier_field_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_carrier_field_construction_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const SOURCE_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-carrier-field-obligation-attempt-fail-closed-witness-object-inputs-present-carrier-fields-absent-no-row-consumption";
const WITNESS_OBJECT_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-construction-attempt-fail-closed-witness-inputs-present-object-binding-value-contract-motion-evaluation-replay-absent-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-carrier-field-construction-attempt-fail-closed-carrier-field-source-candidates-present-carrier-fields-absent-no-row-consumption";

const CARRIER_FIELDS = [
  "domain_chart",
  "endpoint_boundary_binding_ref",
  "endpoint_value_binding_map",
  "contract_link",
  "algebraic_certificate_refs",
  "motion_evaluation_refs",
  "artifact_topology_replay_refs",
];

const CARRIER_FIELD_DEPENDENCIES = {
  domain_chart: [
    "same_packet_witness_object_carrier_field_obligation_declared",
    "carrier_field_source_candidate_declared",
    "witness_object_has_domain_chart",
  ],
  endpoint_boundary_binding_ref: [
    "same_packet_witness_object_carrier_field_obligation_declared",
    "carrier_field_source_candidate_declared",
    "endpoint_boundary_binding_constructed",
    "witness_object_has_endpoint_boundary_binding_ref",
  ],
  endpoint_value_binding_map: [
    "same_packet_witness_object_carrier_field_obligation_declared",
    "carrier_field_source_candidate_declared",
    "endpoint_value_bound_to_boundary_binding",
    "witness_object_has_endpoint_value_binding_map",
  ],
  contract_link: [
    "same_packet_witness_object_carrier_field_obligation_declared",
    "carrier_field_source_candidate_declared",
    "binding_contract_satisfied",
    "witness_object_has_contract_link",
  ],
  algebraic_certificate_refs: [
    "same_packet_witness_object_carrier_field_obligation_declared",
    "carrier_field_source_candidate_declared",
    "non_target_endpoint_zero_certified",
    "exact_screen_zero_certified",
    "rank_certified",
    "witness_object_has_algebraic_certificate_refs",
  ],
  motion_evaluation_refs: [
    "same_packet_witness_object_carrier_field_obligation_declared",
    "carrier_field_source_candidate_declared",
    "same_packet_history_update_formula_present",
    "endpoint_motion_rule_constructed",
    "endpoint_evaluation_map_constructed",
    "full_endpoint_evaluation_map_constructed",
    "witness_object_has_motion_evaluation_refs",
  ],
  artifact_topology_replay_refs: [
    "same_packet_witness_object_carrier_field_obligation_declared",
    "carrier_field_source_candidate_declared",
    "candidate_artifacts_present",
    "root_topology_recertified_for_candidate_change",
    "proof_interval_v1_v6_rerun_for_candidate_change",
    "witness_object_has_artifact_topology_replay_refs",
  ],
};

const CARRIER_PRESENT_FIELDS = [
  "witness_object_has_domain_chart",
  "witness_object_has_endpoint_boundary_binding_ref",
  "witness_object_has_endpoint_value_binding_map",
  "witness_object_has_contract_link",
  "witness_object_has_algebraic_certificate_refs",
  "witness_object_has_motion_evaluation_refs",
  "witness_object_has_artifact_topology_replay_refs",
];

const PROOF_GRADE_ENDPOINT_FIELDS = [
  "endpoint_boundary_binding_witness_object_constructed",
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
  "same_packet_witness_object_carrier_field_obligation_declared",
  "carrier_field_source_candidate_bundle_declared",
  "all_carrier_field_source_candidates_declared",
  "carrier_field_construction_attempted",
  "all_carrier_fields_constructed",
  ...CARRIER_PRESENT_FIELDS,
  ...PROOF_GRADE_ENDPOINT_FIELDS,
];

const ROW_FIELDS = [
  "combined_witness_object_carrier_field_obligation_pair_declared",
  "source_carrier_field_source_candidate_bundle_declared",
  "receiver_carrier_field_source_candidate_bundle_declared",
  "combined_carrier_field_source_candidate_pair_declared",
  "source_all_carrier_field_source_candidates_declared",
  "receiver_all_carrier_field_source_candidates_declared",
  "combined_all_carrier_field_source_candidates_declared",
  "source_all_carrier_fields_constructed",
  "receiver_all_carrier_fields_constructed",
  "combined_all_carrier_fields_constructed",
  "combined_endpoint_boundary_binding_witness_object_pair_constructed",
  "combined_boundary_binding_pair_constructed",
  "combined_binding_contract_pair_satisfied",
  "combined_endpoint_evaluation_map_pair_constructed",
  "source_endpoint_residual_formula_present",
  "receiver_endpoint_residual_formula_present",
  "source_endpoint_residual_function_on_box_constructed",
  "receiver_endpoint_residual_function_on_box_constructed",
  "residual_function_on_box_source_layer_ready",
  "preledger_pass",
  "row_consumed",
  "branch_chart_authorized",
];

function parseArgs(argv) {
  const args = {
    carrierObligationAttempt: DEFAULT_CARRIER_OBLIGATION_ATTEMPT,
    witnessObjectAttempt: DEFAULT_WITNESS_OBJECT_ATTEMPT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--carrier-obligation-attempt") {
      args.carrierObligationAttempt = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-same-packet-witness-object-carrier-field-construction-attempt.mjs [options]

Options:
  --carrier-obligation-attempt PATH  Carrier-field obligation attempt JSON.
  --witness-object-attempt PATH      Witness-object construction attempt JSON used as consistency guard.
  --out-dir PATH                     Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                           Pretty-print JSON artifact.
  --help                             Show this help.`);
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

function assertInput(source) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected carrier obligation packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected carrier obligation fold-coordinate packet id: ${source.fold_coordinate_packet_id}`);
  }
  if (source.status !== SOURCE_STATUS) {
    throw new Error(`Unexpected carrier obligation status: ${source.status}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger) {
    throw new Error("Refusing construction attempt from an authorized carrier-obligation packet.");
  }
}

function assertNonemptyStringArray(source, field, label) {
  if (!Array.isArray(source[field]) || source[field].length === 0) {
    throw new Error(`Missing ${label} array: ${field}`);
  }
  for (const value of source[field]) {
    if (typeof value !== "string" || value.length === 0) {
      throw new Error(`Malformed ${label} entry in ${field}`);
    }
  }
}

function assertWitnessObjectInput(source) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected witness-object packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected witness-object fold-coordinate packet id: ${source.fold_coordinate_packet_id}`);
  }
  if (source.status !== WITNESS_OBJECT_STATUS) {
    throw new Error(`Unexpected witness-object status: ${source.status}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger) {
    throw new Error("Refusing construction attempt from an authorized witness-object packet.");
  }
  assertNonemptyStringArray(source, "witness_object_target_fields", "witness-object target fields");
  assertNonemptyStringArray(
    source,
    "witness_object_construction_fields",
    "witness-object construction fields"
  );
  assertNonemptyStringArray(source, "proof_grade_endpoint_fields", "proof-grade endpoint fields");
}

function idMap(rows, key, label) {
  const map = new Map();
  for (const row of rows) {
    const id = row[key];
    if (!id) {
      throw new Error(`Missing ${label} id field ${key}`);
    }
    if (map.has(id)) {
      throw new Error(`Duplicate ${label} id: ${id}`);
    }
    map.set(id, row);
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

function assertWitnessObjectConsistency(obligationSource, witnessObjectSource) {
  const witnessById = idMap(
    witnessObjectSource.endpoint_boundary_binding_witness_object_attempts,
    "id",
    "witness-object endpoint"
  );
  for (const endpoint of obligationSource.endpoint_witness_object_carrier_field_obligation_attempts) {
    const witnessEndpoint = requireMapped(witnessById, endpoint.id, "witness-object endpoint");
    if (witnessEndpoint.witness_object_attempt_id !== endpoint.witness_object_attempt_id) {
      throw new Error(`Witness-object attempt id mismatch for endpoint ${endpoint.id}`);
    }
  }
  const witnessRowById = idMap(
    witnessObjectSource.row_endpoint_boundary_binding_witness_object_attempts,
    "row_id",
    "witness-object row"
  );
  for (const row of obligationSource.row_witness_object_carrier_field_obligation_attempts) {
    const witnessRow = requireMapped(witnessRowById, row.row_id, "witness-object row");
    if (
      witnessRow.source_witness_object_attempt_id !== row.source_witness_object_attempt_id ||
      witnessRow.receiver_witness_object_attempt_id !== row.receiver_witness_object_attempt_id
    ) {
      throw new Error(`Witness-object row attempt id mismatch for row ${row.row_id}`);
    }
  }
}

function baseEndpointFields(obligation) {
  const sourceFields = obligation.required_fields_present;
  const fields = {};
  for (const field of ENDPOINT_FIELDS) {
    fields[field] = sourceFields[field] === true;
  }
  fields.same_packet_witness_object_carrier_field_obligation_declared =
    sourceFields.same_packet_witness_object_carrier_field_obligation_declared === true;
  fields.carrier_field_source_candidate_bundle_declared = true;
  fields.all_carrier_field_source_candidates_declared = true;
  fields.carrier_field_construction_attempted = true;
  fields.all_carrier_fields_constructed = false;
  for (const field of CARRIER_PRESENT_FIELDS) {
    fields[field] = false;
  }
  for (const field of PROOF_GRADE_ENDPOINT_FIELDS) {
    fields[field] = false;
  }
  return fields;
}

function carrierFieldSourceCandidate(entry) {
  return Boolean(entry?.carrier_field && entry?.target_field && entry?.source_ref && entry?.present_field);
}

function buildCarrierFieldAttempt(entry, endpointFields) {
  const sourceCandidateDeclared = carrierFieldSourceCandidate(entry);
  const fieldState = {
    ...endpointFields,
    carrier_field_source_candidate_declared: sourceCandidateDeclared,
  };
  const dependencies = CARRIER_FIELD_DEPENDENCIES[entry.carrier_field] || [];
  const missingDependencies = dependencies.filter((field) => fieldState[field] !== true);
  return {
    carrier_field: entry.carrier_field,
    target_field: entry.target_field,
    source_ref: entry.source_ref,
    present_field: entry.present_field,
    carrier_field_source_candidate_declared: sourceCandidateDeclared,
    carrier_field_constructed: false,
    dependencies,
    missing_dependencies: missingDependencies,
    failure_codes: missingDependencies.map(
      (field) => `missing_same_packet_witness_object_carrier_field_${entry.carrier_field}_${field}`
    ),
    construction_status: "source-candidate-only",
  };
}

function buildEndpointAttempt(obligation) {
  const fields = baseEndpointFields(obligation);
  const carrierFieldAttempts = obligation.carrier_field_obligation_matrix.map((entry) =>
    buildCarrierFieldAttempt(entry, fields)
  );
  const sourceCandidateCount = carrierFieldAttempts.filter(
    (entry) => entry.carrier_field_source_candidate_declared
  ).length;
  const constructedCount = carrierFieldAttempts.filter((entry) => entry.carrier_field_constructed).length;
  return {
    id: obligation.id,
    endpoint_functional_id: obligation.endpoint_functional_id,
    role: obligation.role,
    carrier_field_construction_attempt_id: `witness_object_carrier_field_construction_attempt:${obligation.id}`,
    carrier_field_obligation_id: obligation.carrier_field_obligation_id,
    witness_object_attempt_id: obligation.witness_object_attempt_id,
    source_witness_attempt_id: obligation.source_witness_attempt_id,
    value_binding_source_id: obligation.value_binding_source_id,
    source_target_object_id: obligation.source_target_object_id,
    source_contract_target_id: obligation.source_contract_target_id,
    witness_object_symbol: obligation.witness_object_symbol,
    binding_symbol: obligation.binding_symbol,
    domain_symbol: obligation.domain_symbol,
    chart_symbol: obligation.chart_symbol,
    basis_symbol: obligation.basis_symbol,
    target_equation: obligation.target_equation,
    target_action: obligation.target_action,
    target_sign: obligation.target_sign,
    target_endpoint_ref_value_count: obligation.target_endpoint_ref_value_count,
    target_endpoint_value_binding_source_equations:
      obligation.target_endpoint_value_binding_source_equations,
    carrier_field_construction_attempts: carrierFieldAttempts,
    carrier_field_source_candidate_count: sourceCandidateCount,
    carrier_field_constructed_count: constructedCount,
    required_fields_present: fields,
    all_carrier_field_source_candidates_declared: sourceCandidateCount === CARRIER_FIELDS.length,
    all_carrier_fields_constructed: false,
    endpoint_boundary_binding_witness_object_constructed: false,
    endpoint_boundary_binding_witness_constructed: false,
    missing_carrier_fields: CARRIER_PRESENT_FIELDS,
    missing_proof_grade_fields: PROOF_GRADE_ENDPOINT_FIELDS,
    obstruction:
      "Carrier-field source candidates are declared from the obligation matrix, but no same-packet witness-object carrier field is constructed.",
  };
}

function rowFields(row, sourceEndpoint, receiverEndpoint) {
  const sourceFields = row.required_fields_present;
  return {
    combined_witness_object_carrier_field_obligation_pair_declared:
      sourceFields.combined_witness_object_carrier_field_obligation_pair_declared === true,
    source_carrier_field_source_candidate_bundle_declared:
      sourceEndpoint.required_fields_present.carrier_field_source_candidate_bundle_declared,
    receiver_carrier_field_source_candidate_bundle_declared:
      receiverEndpoint.required_fields_present.carrier_field_source_candidate_bundle_declared,
    combined_carrier_field_source_candidate_pair_declared:
      sourceEndpoint.required_fields_present.carrier_field_source_candidate_bundle_declared === true &&
      receiverEndpoint.required_fields_present.carrier_field_source_candidate_bundle_declared === true,
    source_all_carrier_field_source_candidates_declared:
      sourceEndpoint.all_carrier_field_source_candidates_declared === true,
    receiver_all_carrier_field_source_candidates_declared:
      receiverEndpoint.all_carrier_field_source_candidates_declared === true,
    combined_all_carrier_field_source_candidates_declared:
      sourceEndpoint.all_carrier_field_source_candidates_declared === true &&
      receiverEndpoint.all_carrier_field_source_candidates_declared === true,
    source_all_carrier_fields_constructed: false,
    receiver_all_carrier_fields_constructed: false,
    combined_all_carrier_fields_constructed: false,
    combined_endpoint_boundary_binding_witness_object_pair_constructed: false,
    combined_boundary_binding_pair_constructed: false,
    combined_binding_contract_pair_satisfied: false,
    combined_endpoint_evaluation_map_pair_constructed: false,
    source_endpoint_residual_formula_present: false,
    receiver_endpoint_residual_formula_present: false,
    source_endpoint_residual_function_on_box_constructed: false,
    receiver_endpoint_residual_function_on_box_constructed: false,
    residual_function_on_box_source_layer_ready: false,
    preledger_pass: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
}

function buildRowAttempt(row, endpointById) {
  const sourceEndpoint = requireMapped(
    endpointById,
    row.source_variable,
    `source carrier-field construction attempt for ${row.row_id}`
  );
  const receiverEndpoint = requireMapped(
    endpointById,
    row.receiver_variable,
    `receiver carrier-field construction attempt for ${row.row_id}`
  );
  const fields = rowFields(row, sourceEndpoint, receiverEndpoint);
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
    source_carrier_field_construction_attempt_id:
      sourceEndpoint.carrier_field_construction_attempt_id,
    receiver_carrier_field_construction_attempt_id:
      receiverEndpoint.carrier_field_construction_attempt_id,
    source_carrier_field_source_candidate_count: sourceEndpoint.carrier_field_source_candidate_count,
    receiver_carrier_field_source_candidate_count: receiverEndpoint.carrier_field_source_candidate_count,
    source_carrier_field_constructed_count: sourceEndpoint.carrier_field_constructed_count,
    receiver_carrier_field_constructed_count: receiverEndpoint.carrier_field_constructed_count,
    candidate_lambda_interval: row.candidate_lambda_interval,
    sampled_endpoint_data: row.sampled_endpoint_data,
    sampled_boundary_values: row.sampled_boundary_values,
    residual_consumer_targets: row.residual_consumer_targets,
    required_fields_present: fields,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source and receiver carrier-field source candidates, but no carrier-complete witness-object pair, boundary-binding pair, residual function on box, preledger pass, or row consumption.",
  };
}

function buildPacket(source, sourcePath, witnessObjectSource, witnessObjectPath) {
  assertInput(source);
  assertWitnessObjectInput(witnessObjectSource);
  assertWitnessObjectConsistency(source, witnessObjectSource);
  const endpointAttempts = source.endpoint_witness_object_carrier_field_obligation_attempts.map(
    buildEndpointAttempt
  );
  const endpointById = idMap(endpointAttempts, "id", "endpoint carrier-field construction attempt");
  const rowAttempts = source.row_witness_object_carrier_field_obligation_attempts.map((row) =>
    buildRowAttempt(row, endpointById)
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
  const endpointCarrierFieldSourceCandidates = endpointAttempts.reduce(
    (sum, endpoint) => sum + endpoint.carrier_field_source_candidate_count,
    0
  );
  const endpointCarrierFieldsConstructed = endpointAttempts.reduce(
    (sum, endpoint) => sum + endpoint.carrier_field_constructed_count,
    0
  );
  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-carrier-field-construction-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: STATUS,
    theorem_target: "Same-Packet Endpoint Boundary-Binding Witness-Object Carrier-Field Construction Attempt",
    claim_level:
      "priority-only same-packet endpoint boundary-binding witness-object carrier-field construction attempt; source candidates are present, but actual carrier fields and proof-grade row consumers remain absent",
    source_artifacts: {
      carrier_field_obligation_attempt: artifactRecord(sourcePath),
      witness_object_consistency_guard: artifactRecord(witnessObjectPath),
      inherited_source_artifacts: source.source_artifacts,
    },
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    authorization_lock: {
      carrier_field_source_candidate_bundle_declared: true,
      endpoint_boundary_binding_witness_object_constructed: false,
      all_carrier_fields_constructed: false,
      endpoint_boundary_binding_constructed: false,
      endpoint_value_bound_to_boundary_binding: false,
      binding_contract_satisfied: false,
      endpoint_motion_rule_constructed: false,
      endpoint_evaluation_map_constructed: false,
      residual_function_on_box_source_layer_ready: false,
      preledger_pass: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    carrier_field_construction_rule:
      "A carrier-field source candidate is not a carrier field. A same-packet endpoint boundary-binding witness object must still carry the actual domain chart, endpoint boundary-binding reference, endpoint value-binding map, binding-contract link, algebraic certificate references, motion/evaluation references, and artifact/topology/replay references before any residual-function-on-box row can consume it.",
    no_promotion_rule:
      "Source candidates do not authorize candidate artifacts, topology recertification, proof-interval replay, preledger pass, live-ledger update, branch-chart authorization, or row consumption.",
    carrier_fields: CARRIER_FIELDS,
    carrier_field_dependencies: CARRIER_FIELD_DEPENDENCIES,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_witness_object_carrier_field_construction_attempts: endpointAttempts,
    row_witness_object_carrier_field_construction_attempts: rowAttempts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      carrier_field_slots_per_endpoint: CARRIER_FIELDS.length,
      endpoint_carrier_field_source_candidates: endpointCarrierFieldSourceCandidates,
      endpoint_carrier_fields_constructed: endpointCarrierFieldsConstructed,
      endpoint_source_candidate_bundles:
        endpointFieldCounts.carrier_field_source_candidate_bundle_declared,
      endpoint_all_source_candidate_bundles:
        endpointFieldCounts.all_carrier_field_source_candidates_declared,
      endpoint_all_carrier_fields_constructed:
        endpointFieldCounts.all_carrier_fields_constructed,
      endpoint_witness_object_carriers:
        endpointFieldCounts.endpoint_boundary_binding_witness_object_constructed,
      endpoint_boundary_binding_witnesses:
        endpointFieldCounts.endpoint_boundary_binding_witness_constructed,
      proof_grade_endpoint_boundary_bindings:
        endpointFieldCounts.endpoint_boundary_binding_constructed,
      endpoint_value_bindings:
        endpointFieldCounts.endpoint_value_bound_to_boundary_binding,
      binding_contracts_satisfied: endpointFieldCounts.binding_contract_satisfied,
      endpoint_motion_rules: endpointFieldCounts.endpoint_motion_rule_constructed,
      endpoint_evaluation_maps: endpointFieldCounts.endpoint_evaluation_map_constructed,
      row_source_candidate_pairs:
        rowFieldCounts.combined_carrier_field_source_candidate_pair_declared,
      row_all_source_candidate_pairs:
        rowFieldCounts.combined_all_carrier_field_source_candidates_declared,
      row_carrier_complete_pairs:
        rowFieldCounts.combined_all_carrier_fields_constructed,
      row_boundary_binding_pairs:
        rowFieldCounts.combined_boundary_binding_pair_constructed,
      row_residual_function_source_layer_ready:
        rowFieldCounts.residual_function_on_box_source_layer_ready,
      preledger_pass_rows: rowFieldCounts.preledger_pass,
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    capture_decision:
      "Priority-only. This packet constructs source-candidate records for carrier fields from the obligation matrix, but constructs no actual same-packet witness-object carrier fields and consumes no rows.",
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

function endpointTable(endpoints) {
  return endpoints
    .map(
      (endpoint) =>
        `| \`${endpoint.id}\` | \`${endpoint.role}\` | ${endpoint.carrier_field_source_candidate_count} | ${endpoint.carrier_field_constructed_count} | ${endpoint.required_fields_present.endpoint_boundary_binding_witness_object_constructed} | ${endpoint.required_fields_present.endpoint_boundary_binding_constructed} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.source_carrier_field_source_candidate_count} | ${row.receiver_carrier_field_source_candidate_count} | ${row.required_fields_present.combined_all_carrier_fields_constructed} | ${row.required_fields_present.residual_function_on_box_source_layer_ready} | ${row.row_consumed} |`
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
  const endpointCarrierFieldSlots =
    summary.endpoint_functionals * summary.carrier_field_slots_per_endpoint;
  return `# Higher-Fold Endpoint-Functional Same-Packet Endpoint Boundary-Binding Witness-Object Carrier-Field Construction Attempt

## Verdict

Status: \`${packet.status}\`.

This priority-only packet attempts to construct the same-packet endpoint
boundary-binding witness-object carrier fields from the carrier-field
obligation matrix. It separates source-candidate records from actual carrier
fields: source candidates are present, but no actual carrier field is
constructed.

The packet records ${summary.endpoint_carrier_field_source_candidates} / ${endpointCarrierFieldSlots} endpoint carrier-field source candidates across ${summary.endpoint_functionals} endpoint functionals, and ${summary.row_source_candidate_pairs} / ${summary.residual_consumer_rows} residual consumer row source/receiver source-candidate pairs. It keeps 0 / ${endpointCarrierFieldSlots} actual carrier fields, 0 / ${summary.endpoint_functionals} witness-object
carriers, 0 / ${summary.endpoint_functionals} endpoint boundary-binding
witnesses, 0 / ${summary.endpoint_functionals} proof-grade endpoint boundary
bindings, 0 / ${summary.endpoint_functionals} endpoint value bindings,
0 / ${summary.endpoint_functionals} satisfied binding contracts,
0 / ${summary.endpoint_functionals} endpoint motion rules,
0 / ${summary.endpoint_functionals} endpoint evaluation maps,
0 / ${summary.residual_consumer_rows} residual-function source-layer ready
rows, and 0 consumed rows.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${sourceTable(packet.source_artifacts)}

## Carrier-Field Construction Rule

${packet.carrier_field_construction_rule}

${packet.no_promotion_rule}

## Endpoint Carrier-Field Construction Attempts

| Endpoint | Role | Source candidates | Actual carrier fields | Witness object | Boundary binding |
| --- | --- | ---: | ---: | ---: | ---: |
${endpointTable(packet.endpoint_witness_object_carrier_field_construction_attempts)}

## Row Consumer Attempts

| Row | Failed side | Source candidates | Receiver candidates | Carrier-complete pair | Residual source ready | Consumed |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_witness_object_carrier_field_construction_attempts)}

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
  const source = readJson(args.carrierObligationAttempt);
  const witnessObjectSource = readJson(args.witnessObjectAttempt);
  const packet = buildPacket(source, args.carrierObligationAttempt, witnessObjectSource, args.witnessObjectAttempt);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, packet, args.pretty);
  writeText(outputReportPath, buildReport(packet));
  console.log(`Wrote ${outputJsonPath}`);
  console.log(`Wrote ${outputReportPath}`);
}

main();

#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_PRIMITIVE_RULE_WITNESS_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_primitive_rule_witness_record_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_endpoint_boundary_binding_ref_carrier_full_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_endpoint_boundary_binding_ref_carrier_full_binding_construction_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const SOURCE_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-boundary-binding-primitive-rule-witness-record-construction-attempt-partial-pass-first-primitives-constructed-ref-carriers-full-binding-row-closure-locked-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-boundary-binding-ref-carrier-full-binding-construction-attempt-partial-pass-witness-object-ref-fields-constructed-full-binding-and-carrier-admission-locked-no-row-consumption";

const SOURCE_PRIMITIVE_FIELDS = [
  "primitive_payload_target_ready",
  "primitive_construction_rule_applied",
  "primitive_binding_witness_record_constructed",
  "primitive_domain_chart_attachment_certified",
  "primitive_target_ref_value_attachment_certified",
  "endpoint_boundary_binding_constructed",
];

const REF_FIELD_FIELDS = [
  "witness_object_endpoint_boundary_binding_ref_declared",
  "witness_object_endpoint_boundary_binding_ref_constructed",
  "witness_object_has_endpoint_boundary_binding_ref",
  "endpoint_boundary_binding_ref_targets_first_primitive",
  "endpoint_boundary_binding_ref_target_attachment_certified",
];

const CARRIER_ADMISSION_FIELDS = [
  "full_endpoint_boundary_binding_constructed",
  "endpoint_boundary_binding_constructed",
  "witness_object_has_endpoint_boundary_binding_ref",
  "endpoint_boundary_binding_ref_carrier_unblocked",
];

const FULL_BINDING_FIELDS = [
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

const DOWNSTREAM_FIELDS = [
  "endpoint_boundary_binding_witness_constructed",
  "endpoint_boundary_binding_witness_object_constructed",
  ...FULL_BINDING_FIELDS,
];

const ENDPOINT_FIELDS = [
  ...SOURCE_PRIMITIVE_FIELDS,
  ...REF_FIELD_FIELDS,
  "full_endpoint_boundary_binding_constructed",
  "endpoint_boundary_binding_ref_carrier_unblocked",
  ...DOWNSTREAM_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_endpoint_boundary_binding_primitive_constructed",
  "receiver_endpoint_boundary_binding_primitive_constructed",
  "combined_endpoint_boundary_binding_primitive_pair_constructed",
  "source_witness_object_endpoint_boundary_binding_ref_constructed",
  "receiver_witness_object_endpoint_boundary_binding_ref_constructed",
  "combined_witness_object_endpoint_boundary_binding_ref_pair_constructed",
  "source_endpoint_boundary_binding_ref_carrier_unblocked",
  "receiver_endpoint_boundary_binding_ref_carrier_unblocked",
  "combined_endpoint_boundary_binding_ref_carrier_pair_unblocked",
  "source_full_endpoint_boundary_binding_constructed",
  "receiver_full_endpoint_boundary_binding_constructed",
  "combined_full_endpoint_boundary_binding_pair_constructed",
  "source_endpoint_value_bound_to_boundary_binding",
  "receiver_endpoint_value_bound_to_boundary_binding",
  "combined_endpoint_value_binding_pair_constructed",
  "combined_binding_contract_pair_satisfied",
  "combined_endpoint_evaluation_map_pair_constructed",
  "residual_data_construction_ready",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const CONSTRUCTION_METHODS = [
  {
    method_id: "first_primitive_source_ready",
    output_kind: "input-readiness",
    description:
      "Check that the prior packet supplied the first endpoint boundary-binding primitive with rule, witness-record, domain-chart attachment, and target ref/value attachment.",
    required_fields: SOURCE_PRIMITIVE_FIELDS,
  },
  {
    method_id: "witness_object_endpoint_boundary_binding_ref_field_construction",
    output_kind: "witness-object-reference-field",
    description:
      "Construct a witness-object endpoint-boundary-binding reference field that points to the first endpoint boundary-binding primitive and certifies the target attachment.",
    required_fields: [
      "endpoint_boundary_binding_constructed",
      "primitive_binding_witness_record_constructed",
      "witness_object_endpoint_boundary_binding_ref_declared",
      "witness_object_endpoint_boundary_binding_ref_constructed",
      "witness_object_has_endpoint_boundary_binding_ref",
      "endpoint_boundary_binding_ref_targets_first_primitive",
      "endpoint_boundary_binding_ref_target_attachment_certified",
    ],
  },
  {
    method_id: "reference_field_as_carrier_admission",
    output_kind: "carrier-admission",
    description:
      "Test whether the witness-object reference field also admits the endpoint-boundary-binding reference carrier.",
    required_fields: CARRIER_ADMISSION_FIELDS,
  },
  {
    method_id: "reference_field_as_full_endpoint_boundary_binding",
    output_kind: "full-binding-contract",
    description:
      "Test whether the reference field also supplies the full endpoint boundary-binding contract, value binding, motion/evaluation, algebraic certificates, artifacts, topology recertification, and proof replay.",
    required_fields: [
      "endpoint_boundary_binding_constructed",
      "full_endpoint_boundary_binding_constructed",
      ...FULL_BINDING_FIELDS,
    ],
  },
];

function parseArgs(argv) {
  const args = {
    primitiveRuleWitnessPacket: DEFAULT_PRIMITIVE_RULE_WITNESS_PACKET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--primitive-rule-witness-packet") {
      args.primitiveRuleWitnessPacket = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-endpoint-boundary-binding-ref-carrier-full-binding-construction-attempt.mjs [options]

Options:
  --primitive-rule-witness-packet PATH  Endpoint boundary-binding primitive rule/witness-record packet JSON.
  --out-dir PATH                        Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                              Pretty-print JSON artifact.
  --help                                Show this help.`);
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
    throw new Error(`Unexpected primitive rule/witness packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected primitive rule/witness fold-coordinate packet id: ${source.fold_coordinate_packet_id}`);
  }
  if (source.status !== SOURCE_STATUS) {
    throw new Error(`Unexpected primitive rule/witness status: ${source.status}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger || source.row_closure) {
    throw new Error("Refusing reference-carrier/full-binding construction from authorized or row-closed source packet.");
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
    failure_codes: missingFields.map((field) => `missing_endpoint_boundary_binding_ref_carrier_full_binding_${field}`),
    passed: missingFields.length === 0,
  };
}

function buildWitnessObjectEndpointBoundaryBindingRef(endpoint) {
  const refId = `witness_object_endpoint_boundary_binding_ref:${endpoint.id}`;
  return {
    ref_id: refId,
    ref_kind: "witness_object_endpoint_boundary_binding_ref_to_first_primitive",
    endpoint_functional_id: endpoint.endpoint_functional_id,
    role: endpoint.role,
    witness_object_symbol: endpoint.witness_object_symbol,
    first_endpoint_boundary_binding_primitive_id:
      endpoint.first_endpoint_boundary_binding_primitive_id,
    primitive_binding_witness_record_id: endpoint.primitive_binding_witness_record_id,
    domain_chart_carrier_subfield_id: endpoint.domain_chart_carrier_subfield_id,
    primitive_target_ref_value_attachment_certified:
      endpoint.required_fields_present.primitive_target_ref_value_attachment_certified === true,
    target_endpoint_ref_value_count: endpoint.target_endpoint_ref_value_count,
    target_endpoint_value_binding_source_equations:
      endpoint.target_endpoint_value_binding_source_equations,
    carrier_admission_status: "reference-field-constructed-carrier-admission-locked",
    proof_grade_binding_status: "first-primitive-reference-only",
    constructed_fields: [
      "witness_object_endpoint_boundary_binding_ref_declared",
      "witness_object_endpoint_boundary_binding_ref_constructed",
      "witness_object_has_endpoint_boundary_binding_ref",
      "endpoint_boundary_binding_ref_targets_first_primitive",
      "endpoint_boundary_binding_ref_target_attachment_certified",
    ],
    fields_not_constructed: [
      "full_endpoint_boundary_binding_constructed",
      "endpoint_boundary_binding_ref_carrier_unblocked",
      ...DOWNSTREAM_FIELDS,
    ],
    soundness_limit:
      "This reference field points the witness object to the first endpoint boundary-binding primitive only. It does not construct the full endpoint boundary binding or unlock the endpoint-boundary-binding reference carrier.",
  };
}

function endpointFields(sourceEndpoint) {
  const sourceFields = sourceEndpoint.required_fields_present || {};
  const firstPrimitiveReady = SOURCE_PRIMITIVE_FIELDS.every((field) => sourceFields[field] === true);
  const refTargetReady =
    firstPrimitiveReady &&
    sourceEndpoint.first_endpoint_boundary_binding_primitive_constructed === true &&
    Boolean(sourceEndpoint.first_endpoint_boundary_binding_primitive_id) &&
    Boolean(sourceEndpoint.primitive_binding_witness_record_id);
  const fields = {};
  for (const field of SOURCE_PRIMITIVE_FIELDS) {
    fields[field] = sourceFields[field] === true;
  }
  fields.witness_object_endpoint_boundary_binding_ref_declared = refTargetReady;
  fields.witness_object_endpoint_boundary_binding_ref_constructed = refTargetReady;
  fields.witness_object_has_endpoint_boundary_binding_ref = refTargetReady;
  fields.endpoint_boundary_binding_ref_targets_first_primitive = refTargetReady;
  fields.endpoint_boundary_binding_ref_target_attachment_certified =
    refTargetReady &&
    sourceFields.primitive_target_ref_value_attachment_certified === true &&
    sourceEndpoint.target_endpoint_ref_value_count > 0;
  fields.full_endpoint_boundary_binding_constructed = false;
  fields.endpoint_boundary_binding_ref_carrier_unblocked = false;
  for (const field of DOWNSTREAM_FIELDS) {
    fields[field] = false;
  }
  return fields;
}

function buildEndpointAttempt(sourceEndpoint) {
  const fields = endpointFields(sourceEndpoint);
  const methodResults = CONSTRUCTION_METHODS.map((method) => methodResult(method, fields));
  const refMissing = REF_FIELD_FIELDS.filter((field) => fields[field] !== true);
  const carrierMissing = CARRIER_ADMISSION_FIELDS.filter((field) => fields[field] !== true);
  const fullBindingMissing = [
    "full_endpoint_boundary_binding_constructed",
    ...FULL_BINDING_FIELDS,
  ].filter((field) => fields[field] !== true);
  const witnessObjectEndpointBoundaryBindingRef =
    refMissing.length === 0 ? buildWitnessObjectEndpointBoundaryBindingRef(sourceEndpoint) : null;
  return {
    id: sourceEndpoint.id,
    endpoint_functional_id: sourceEndpoint.endpoint_functional_id,
    role: sourceEndpoint.role,
    ref_carrier_full_binding_construction_attempt_id:
      `endpoint_boundary_binding_ref_carrier_full_binding_construction_attempt:${sourceEndpoint.id}`,
    source_primitive_rule_witness_record_construction_attempt_id:
      sourceEndpoint.primitive_rule_witness_record_construction_attempt_id,
    source_first_endpoint_boundary_binding_primitive_id:
      sourceEndpoint.first_endpoint_boundary_binding_primitive_id,
    source_primitive_binding_witness_record_id:
      sourceEndpoint.primitive_binding_witness_record_id,
    witness_object_endpoint_boundary_binding_ref_id:
      witnessObjectEndpointBoundaryBindingRef?.ref_id || null,
    source_target_endpoint_boundary_binding_object_id:
      sourceEndpoint.source_target_endpoint_boundary_binding_object_id,
    source_contract_target_id: sourceEndpoint.source_contract_target_id,
    source_endpoint_value_binding_source_id:
      sourceEndpoint.source_endpoint_value_binding_source_id,
    source_witness_attempt_id: sourceEndpoint.source_witness_attempt_id,
    source_witness_object_attempt_id: sourceEndpoint.source_witness_object_attempt_id,
    domain_chart_carrier_subfield_id: sourceEndpoint.domain_chart_carrier_subfield_id,
    binding_symbol: sourceEndpoint.binding_symbol,
    witness_object_symbol: sourceEndpoint.witness_object_symbol,
    domain_symbol: sourceEndpoint.domain_symbol,
    chart_symbol: sourceEndpoint.chart_symbol,
    basis_symbol: sourceEndpoint.basis_symbol,
    target_endpoint_ref_value_count: sourceEndpoint.target_endpoint_ref_value_count,
    target_endpoint_value_binding_source_equations:
      sourceEndpoint.target_endpoint_value_binding_source_equations,
    witness_object_endpoint_boundary_binding_ref:
      witnessObjectEndpointBoundaryBindingRef,
    required_fields_present: fields,
    construction_method_results: methodResults,
    construction_methods_passed:
      methodResults.filter((method) => method.passed).map((method) => method.method_id),
    witness_object_endpoint_boundary_binding_ref_constructed:
      refMissing.length === 0,
    first_missing_ref_field_criterion:
      refMissing.length === 0 ? null : refMissing[0],
    missing_ref_field_criteria: refMissing,
    endpoint_boundary_binding_ref_carrier_unblocked: false,
    missing_carrier_admission_criteria: carrierMissing,
    full_endpoint_boundary_binding_constructed: false,
    missing_full_binding_contract_criteria: fullBindingMissing,
    downstream_fields_missing: DOWNSTREAM_FIELDS.filter((field) => fields[field] !== true),
    failure_codes: [
      ...carrierMissing.map((field) => `endpoint_boundary_binding_ref_carrier_locked_${field}`),
      ...fullBindingMissing.map((field) => `full_binding_contract_locked_${field}`),
    ],
    obstruction:
      "The witness object now has an endpoint-boundary-binding reference field to the first primitive, but carrier admission remains locked because the full endpoint boundary binding is not constructed and the endpoint-boundary-binding reference carrier is not unblocked.",
  };
}

function buildRowAttempt(row, endpointById) {
  const sourceEndpoint = requireMapped(endpointById, row.source_variable, `source endpoint for ${row.row_id}`);
  const receiverEndpoint = requireMapped(endpointById, row.receiver_variable, `receiver endpoint for ${row.row_id}`);
  const fields = {
    row_locator_resolved: row.required_fields_present.row_locator_resolved === true,
    source_endpoint_boundary_binding_primitive_constructed:
      sourceEndpoint.required_fields_present.endpoint_boundary_binding_constructed === true,
    receiver_endpoint_boundary_binding_primitive_constructed:
      receiverEndpoint.required_fields_present.endpoint_boundary_binding_constructed === true,
    combined_endpoint_boundary_binding_primitive_pair_constructed: false,
    source_witness_object_endpoint_boundary_binding_ref_constructed:
      sourceEndpoint.witness_object_endpoint_boundary_binding_ref_constructed === true,
    receiver_witness_object_endpoint_boundary_binding_ref_constructed:
      receiverEndpoint.witness_object_endpoint_boundary_binding_ref_constructed === true,
    combined_witness_object_endpoint_boundary_binding_ref_pair_constructed: false,
    source_endpoint_boundary_binding_ref_carrier_unblocked:
      sourceEndpoint.required_fields_present.endpoint_boundary_binding_ref_carrier_unblocked === true,
    receiver_endpoint_boundary_binding_ref_carrier_unblocked:
      receiverEndpoint.required_fields_present.endpoint_boundary_binding_ref_carrier_unblocked === true,
    combined_endpoint_boundary_binding_ref_carrier_pair_unblocked: false,
    source_full_endpoint_boundary_binding_constructed:
      sourceEndpoint.required_fields_present.full_endpoint_boundary_binding_constructed === true,
    receiver_full_endpoint_boundary_binding_constructed:
      receiverEndpoint.required_fields_present.full_endpoint_boundary_binding_constructed === true,
    combined_full_endpoint_boundary_binding_pair_constructed: false,
    source_endpoint_value_bound_to_boundary_binding:
      sourceEndpoint.required_fields_present.endpoint_value_bound_to_boundary_binding === true,
    receiver_endpoint_value_bound_to_boundary_binding:
      receiverEndpoint.required_fields_present.endpoint_value_bound_to_boundary_binding === true,
    combined_endpoint_value_binding_pair_constructed: false,
    combined_binding_contract_pair_satisfied: false,
    combined_endpoint_evaluation_map_pair_constructed: false,
    residual_data_construction_ready: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_endpoint_boundary_binding_primitive_pair_constructed =
    fields.source_endpoint_boundary_binding_primitive_constructed &&
    fields.receiver_endpoint_boundary_binding_primitive_constructed;
  fields.combined_witness_object_endpoint_boundary_binding_ref_pair_constructed =
    fields.source_witness_object_endpoint_boundary_binding_ref_constructed &&
    fields.receiver_witness_object_endpoint_boundary_binding_ref_constructed;
  fields.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked =
    fields.source_endpoint_boundary_binding_ref_carrier_unblocked &&
    fields.receiver_endpoint_boundary_binding_ref_carrier_unblocked;
  fields.combined_full_endpoint_boundary_binding_pair_constructed =
    fields.source_full_endpoint_boundary_binding_constructed &&
    fields.receiver_full_endpoint_boundary_binding_constructed;
  fields.combined_endpoint_value_binding_pair_constructed =
    fields.source_endpoint_value_bound_to_boundary_binding &&
    fields.receiver_endpoint_value_bound_to_boundary_binding;
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
    source_first_endpoint_boundary_binding_primitive_id:
      sourceEndpoint.source_first_endpoint_boundary_binding_primitive_id,
    receiver_first_endpoint_boundary_binding_primitive_id:
      receiverEndpoint.source_first_endpoint_boundary_binding_primitive_id,
    source_witness_object_endpoint_boundary_binding_ref_id:
      sourceEndpoint.witness_object_endpoint_boundary_binding_ref_id,
    receiver_witness_object_endpoint_boundary_binding_ref_id:
      receiverEndpoint.witness_object_endpoint_boundary_binding_ref_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver witness-object reference fields to first endpoint-boundary-binding primitives, but the source/receiver reference carriers, full endpoint boundary bindings, value bindings, contract pair, motion/evaluation pair, residual data, replay, row consumption, and branch-chart authorization remain absent.",
  };
}

function fieldCounts(rows, fields, getter) {
  return Object.fromEntries(fields.map((field) => [field, countTrue(rows, (row) => getter(row, field))]));
}

function buildPacket(source, sourcePath) {
  assertSource(source);
  const endpointAttempts =
    source.endpoint_boundary_binding_primitive_rule_witness_record_construction_attempts.map(buildEndpointAttempt);
  const endpointById = idMap(endpointAttempts, "endpoint reference-carrier/full-binding construction attempt");
  const rowAttempts =
    source.row_endpoint_boundary_binding_primitive_rule_witness_record_construction_attempts.map((row) =>
      buildRowAttempt(row, endpointById)
    );
  const endpointFieldCounts = fieldCounts(
    endpointAttempts,
    ENDPOINT_FIELDS,
    (endpoint, field) => endpoint.required_fields_present[field]
  );
  const rowFieldCounts = fieldCounts(rowAttempts, ROW_FIELDS, (row, field) => row.required_fields_present[field]);
  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-endpoint-boundary-binding-ref-carrier-full-binding-construction-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: STATUS,
    theorem_target: "Endpoint Boundary-Binding Reference Carrier And Full Binding Construction Attempt",
    claim_level:
      "priority-only partial pass; witness-object endpoint-boundary-binding reference fields are constructed for 4 / 4 endpoint functionals by pointing to the first endpoint boundary-binding primitives, while full endpoint boundary bindings, reference-carrier admission, value bindings, contracts, replay, and row consumption remain locked",
    source_artifacts: {
      primitive_rule_witness_record_construction_attempt: artifactRecord(sourcePath),
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
      witness_object_endpoint_boundary_binding_refs_constructed: true,
      full_endpoint_boundary_bindings_constructed: false,
      endpoint_boundary_binding_ref_carriers_unblocked: false,
      endpoint_value_bindings_constructed: false,
      binding_contracts_satisfied: false,
      row_unblocked: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    construction_rule:
      "An applied primitive rule and primitive binding witness record may be lifted into a witness-object endpoint-boundary-binding reference field by pointing the witness object to the first endpoint boundary-binding primitive and certifying that the primitive target ref/value attachment is the referenced target.",
    no_promotion_rule:
      "A witness-object reference field is not carrier admission and is not a full endpoint boundary binding. Carrier admission still requires full_endpoint_boundary_binding_constructed plus endpoint_boundary_binding_ref_carrier_unblocked, and row closure still requires value binding, contract satisfaction, motion/evaluation, algebraic certificates, artifact/topology/replay data, and residual-data construction.",
    construction_methods: CONSTRUCTION_METHODS,
    source_primitive_fields: SOURCE_PRIMITIVE_FIELDS,
    ref_field_fields: REF_FIELD_FIELDS,
    carrier_admission_fields: CARRIER_ADMISSION_FIELDS,
    full_binding_fields: FULL_BINDING_FIELDS,
    downstream_fields: DOWNSTREAM_FIELDS,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_boundary_binding_ref_carrier_full_binding_construction_attempts:
      endpointAttempts,
    row_endpoint_boundary_binding_ref_carrier_full_binding_construction_attempts:
      rowAttempts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      first_endpoint_boundary_binding_primitives_inherited:
        endpointFieldCounts.endpoint_boundary_binding_constructed,
      witness_object_endpoint_boundary_binding_refs_declared:
        endpointFieldCounts.witness_object_endpoint_boundary_binding_ref_declared,
      witness_object_endpoint_boundary_binding_refs_constructed:
        endpointFieldCounts.witness_object_endpoint_boundary_binding_ref_constructed,
      witness_object_has_endpoint_boundary_binding_refs:
        endpointFieldCounts.witness_object_has_endpoint_boundary_binding_ref,
      endpoint_boundary_binding_ref_targets_first_primitives:
        endpointFieldCounts.endpoint_boundary_binding_ref_targets_first_primitive,
      endpoint_boundary_binding_ref_target_attachments_certified:
        endpointFieldCounts.endpoint_boundary_binding_ref_target_attachment_certified,
      full_endpoint_boundary_bindings_constructed:
        endpointFieldCounts.full_endpoint_boundary_binding_constructed,
      endpoint_boundary_binding_ref_carriers_unblocked:
        endpointFieldCounts.endpoint_boundary_binding_ref_carrier_unblocked,
      endpoint_value_bindings_constructed:
        endpointFieldCounts.endpoint_value_bound_to_boundary_binding,
      contracts_satisfied:
        endpointFieldCounts.binding_contract_satisfied,
      row_endpoint_boundary_binding_primitive_pairs_constructed:
        rowFieldCounts.combined_endpoint_boundary_binding_primitive_pair_constructed,
      row_witness_object_endpoint_boundary_binding_ref_pairs_constructed:
        rowFieldCounts.combined_witness_object_endpoint_boundary_binding_ref_pair_constructed,
      row_endpoint_boundary_binding_ref_carrier_pairs_unblocked:
        rowFieldCounts.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked,
      row_full_endpoint_boundary_binding_pairs_constructed:
        rowFieldCounts.combined_full_endpoint_boundary_binding_pair_constructed,
      row_endpoint_value_binding_pairs_constructed:
        rowFieldCounts.combined_endpoint_value_binding_pair_constructed,
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
      "Priority-only. This packet closes the witness-object endpoint-boundary-binding reference-field blocker by constructing 4 / 4 reference fields and 3 / 3 row reference-field pairs. It intentionally does not promote those reference fields into full endpoint boundary bindings, endpoint-boundary-binding reference-carrier admission, endpoint value bindings, contract satisfaction, residual-data readiness, row closure, live-ledger update, branch-chart authorization, or row consumption.",
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
        `| \`${endpoint.id}\` | \`${endpoint.role}\` | ${endpoint.required_fields_present.endpoint_boundary_binding_constructed} | ${endpoint.witness_object_endpoint_boundary_binding_ref_constructed} | ${endpoint.required_fields_present.full_endpoint_boundary_binding_constructed} | ${endpoint.endpoint_boundary_binding_ref_carrier_unblocked} | ${endpoint.required_fields_present.endpoint_value_bound_to_boundary_binding} | ${endpoint.required_fields_present.binding_contract_satisfied} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.combined_endpoint_boundary_binding_primitive_pair_constructed} | ${row.required_fields_present.combined_witness_object_endpoint_boundary_binding_ref_pair_constructed} | ${row.required_fields_present.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked} | ${row.required_fields_present.combined_full_endpoint_boundary_binding_pair_constructed} | ${row.row_consumed} |`
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
  return `# Higher-Fold Endpoint-Functional Endpoint Boundary-Binding Ref Carrier And Full Binding Construction Attempt

## Verdict

Status: \`${packet.status}\`.

This priority-only packet continues after the endpoint boundary-binding
primitive rule/witness-record construction attempt. It constructs
${summary.witness_object_endpoint_boundary_binding_refs_constructed} /
${summary.endpoint_functionals} witness-object endpoint-boundary-binding
reference fields by pointing them to the first endpoint boundary-binding
primitives and certifying ${summary.endpoint_boundary_binding_ref_target_attachments_certified} /
${summary.endpoint_functionals} target attachments.

The packet remains fail-closed for carrier admission and row closure. It
constructs 0 / ${summary.endpoint_functionals} full endpoint boundary bindings,
unblocks 0 / ${summary.endpoint_functionals} endpoint-boundary-binding
reference carriers, constructs 0 / ${summary.endpoint_functionals} endpoint
value bindings, satisfies 0 / ${summary.endpoint_functionals} contracts, and
consumes 0 rows.

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

| Endpoint | Role | First primitive | Ref field | Full binding | Ref carrier | Value binding | Contract |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
${endpointTable(packet.endpoint_boundary_binding_ref_carrier_full_binding_construction_attempts)}

## Row Construction Attempts

| Row | Failed side | Primitive pair | Ref-field pair | Ref-carrier pair | Full-binding pair | Consumed |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_endpoint_boundary_binding_ref_carrier_full_binding_construction_attempts)}

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
  const source = readJson(args.primitiveRuleWitnessPacket);
  const packet = buildPacket(source, args.primitiveRuleWitnessPacket);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, packet, args.pretty);
  writeText(outputReportPath, buildReport(packet));
  console.log(`Wrote ${outputJsonPath}`);
  console.log(`Wrote ${outputReportPath}`);
}

main();

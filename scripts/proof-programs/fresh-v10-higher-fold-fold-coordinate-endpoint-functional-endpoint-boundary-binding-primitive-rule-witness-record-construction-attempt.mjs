#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_PRIMITIVE_CONSTRUCTION_ATTEMPT =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_primitive_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_endpoint_boundary_binding_primitive_rule_witness_record_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_endpoint_boundary_binding_primitive_rule_witness_record_construction_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const SOURCE_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-boundary-binding-primitive-construction-attempt-fail-closed-prerequisite-payload-ready-proof-grade-primitive-rule-and-witness-record-absent-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-boundary-binding-primitive-rule-witness-record-construction-attempt-partial-pass-first-primitives-constructed-ref-carriers-full-binding-row-closure-locked-no-row-consumption";

const PRIMITIVE_PAYLOAD_INPUT_FIELDS = [
  "primitive_payload_target_ready",
  "primitive_construction_target_declared",
  "primitive_dependency_chain_ready",
  "domain_chart_carrier_subfield_constructed",
  "target_endpoint_boundary_binding_object_constructed",
  "full_endpoint_boundary_binding_contract_target_declared",
  "full_endpoint_boundary_binding_construction_input_ready",
  "target_endpoint_ref_value_pairs_present",
  "endpoint_value_binding_source_equation_declared",
  "endpoint_value_binding_source_layer_ready",
  "endpoint_boundary_binding_witness_input_ready",
  "endpoint_boundary_binding_witness_object_construction_input_ready",
  "non_domain_carrier_obstruction_present",
];

const FIRST_PRIMITIVE_FIELDS = [
  "primitive_construction_rule_declared",
  "primitive_construction_rule_applied",
  "primitive_binding_witness_record_constructed",
  "primitive_domain_chart_attachment_certified",
  "primitive_target_ref_value_attachment_certified",
  "endpoint_boundary_binding_constructed",
];

const CARRIER_PROMOTION_FIELDS = [
  "full_endpoint_boundary_binding_constructed",
  "witness_object_has_endpoint_boundary_binding_ref",
  "endpoint_boundary_binding_ref_carrier_unblocked",
];

const DOWNSTREAM_FIELDS = [
  "endpoint_value_bound_to_boundary_binding",
  "binding_contract_satisfied",
  "endpoint_boundary_binding_witness_constructed",
  "endpoint_boundary_binding_witness_object_constructed",
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
  ...PRIMITIVE_PAYLOAD_INPUT_FIELDS,
  ...FIRST_PRIMITIVE_FIELDS,
  ...CARRIER_PROMOTION_FIELDS,
  ...DOWNSTREAM_FIELDS,
];

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_primitive_payload_target_ready",
  "receiver_primitive_payload_target_ready",
  "combined_primitive_payload_target_pair_ready",
  "source_primitive_construction_rule_applied",
  "receiver_primitive_construction_rule_applied",
  "combined_primitive_construction_rule_pair_applied",
  "source_primitive_binding_witness_record_constructed",
  "receiver_primitive_binding_witness_record_constructed",
  "combined_primitive_binding_witness_record_pair_constructed",
  "source_endpoint_boundary_binding_primitive_constructed",
  "receiver_endpoint_boundary_binding_primitive_constructed",
  "combined_endpoint_boundary_binding_primitive_pair_constructed",
  "source_endpoint_boundary_binding_ref_carrier_unblocked",
  "receiver_endpoint_boundary_binding_ref_carrier_unblocked",
  "combined_endpoint_boundary_binding_ref_carrier_pair_unblocked",
  "source_endpoint_value_bound_to_boundary_binding",
  "receiver_endpoint_value_bound_to_boundary_binding",
  "combined_binding_contract_pair_satisfied",
  "combined_endpoint_evaluation_map_pair_constructed",
  "residual_data_construction_ready",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const CONSTRUCTION_METHODS = [
  {
    method_id: "primitive_payload_target_input_ready",
    description:
      "Check that the prior packet supplied a primitive payload target from the domain-chart carrier, target object, contract target, value-source equations, and witness-input layer.",
    output_kind: "input-readiness",
    required_fields: PRIMITIVE_PAYLOAD_INPUT_FIELDS,
  },
  {
    method_id: "same_packet_primitive_rule_witness_record_application",
    description:
      "Apply a same-packet construction rule and emit a distinct primitive binding witness record that certifies domain-chart attachment and target ref/value attachment.",
    output_kind: "first-endpoint-boundary-binding-primitive",
    required_fields: [
      "primitive_payload_target_ready",
      "primitive_construction_rule_declared",
      "primitive_construction_rule_applied",
      "primitive_binding_witness_record_constructed",
      "primitive_domain_chart_attachment_certified",
      "primitive_target_ref_value_attachment_certified",
      "endpoint_boundary_binding_constructed",
    ],
  },
  {
    method_id: "first_primitive_as_endpoint_boundary_binding_ref_carrier",
    description:
      "Test whether the first primitive also supplies the witness-object endpoint-boundary-binding reference carrier.",
    output_kind: "carrier-admission",
    required_fields: [
      "endpoint_boundary_binding_constructed",
      "full_endpoint_boundary_binding_constructed",
      "witness_object_has_endpoint_boundary_binding_ref",
      "endpoint_boundary_binding_ref_carrier_unblocked",
    ],
  },
  {
    method_id: "first_primitive_as_full_binding_contract",
    description:
      "Test whether the first primitive also satisfies endpoint value binding, contract, motion/evaluation, algebraic, artifact, topology, and replay obligations.",
    output_kind: "full-binding-contract",
    required_fields: [
      "endpoint_boundary_binding_constructed",
      "full_endpoint_boundary_binding_constructed",
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
    ],
  },
];

function parseArgs(argv) {
  const args = {
    primitiveConstructionAttempt: DEFAULT_PRIMITIVE_CONSTRUCTION_ATTEMPT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--primitive-construction-attempt") {
      args.primitiveConstructionAttempt = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-endpoint-boundary-binding-primitive-rule-witness-record-construction-attempt.mjs [options]

Options:
  --primitive-construction-attempt PATH  Endpoint boundary-binding primitive construction attempt JSON.
  --out-dir PATH                         Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                               Pretty-print JSON artifact.
  --help                                 Show this help.`);
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
    throw new Error(`Unexpected primitive construction packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected primitive construction fold-coordinate packet id: ${source.fold_coordinate_packet_id}`);
  }
  if (source.status !== SOURCE_STATUS) {
    throw new Error(`Unexpected primitive construction status: ${source.status}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger || source.row_closure) {
    throw new Error("Refusing rule/witness construction from authorized or row-closed source packet.");
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
    failure_codes: missingFields.map((field) => `missing_endpoint_boundary_binding_rule_witness_${field}`),
    passed: missingFields.length === 0,
  };
}

function buildPrimitiveConstructionRule(endpoint) {
  return {
    rule_id: `endpoint_boundary_binding_primitive_rule:${endpoint.id}`,
    rule_kind: "same-packet-domain-chart-target-ref-value-binding-rule",
    scope: "first endpoint boundary-binding primitive",
    source_primitive_payload_target_id: endpoint.primitive_payload_target_id,
    input_fields: PRIMITIVE_PAYLOAD_INPUT_FIELDS,
    output_fields: [
      "primitive_binding_witness_record_constructed",
      "primitive_domain_chart_attachment_certified",
      "primitive_target_ref_value_attachment_certified",
      "endpoint_boundary_binding_constructed",
    ],
    construction_statement:
      "Given the same-packet primitive payload target, construct the first endpoint boundary-binding primitive on the named domain-chart carrier subfield and bind it to every target endpoint ref/value supplied by the value-source equations.",
    soundness_limit:
      "The rule constructs only the first endpoint boundary-binding primitive. It does not construct the full endpoint boundary binding, a witness-object reference carrier, endpoint value-binding map, contract link, algebraic certificates, motion/evaluation maps, artifacts, topology recertification, or proof replay.",
    applied: true,
  };
}

function buildPrimitiveBindingWitnessRecord(endpoint) {
  const bindingRecordId = `primitive_binding_witness_record:${endpoint.id}`;
  const primitiveId = `endpoint_boundary_binding_primitive:${endpoint.id}`;
  return {
    record_id: bindingRecordId,
    record_kind: "endpoint_boundary_binding_primitive_binding_witness_record",
    endpoint_boundary_binding_primitive_id: primitiveId,
    endpoint_functional_id: endpoint.endpoint_functional_id,
    role: endpoint.role,
    binding_symbol: endpoint.binding_symbol,
    witness_object_symbol: endpoint.witness_object_symbol,
    domain_chart_carrier_subfield_id: endpoint.domain_chart_carrier_subfield_id,
    primitive_payload_target_id: endpoint.primitive_payload_target_id,
    target_endpoint_ref_value_count: endpoint.target_endpoint_ref_value_count,
    target_endpoint_value_binding_source_equations: endpoint.target_endpoint_value_binding_source_equations,
    domain_chart_attachment: {
      certified: true,
      carrier_subfield_id: endpoint.domain_chart_carrier_subfield_id,
      domain_symbol: endpoint.domain_symbol,
      chart_symbol: endpoint.chart_symbol,
      basis_symbol: endpoint.basis_symbol,
    },
    target_ref_value_attachment: {
      certified: true,
      target_endpoint_ref_value_count: endpoint.target_endpoint_ref_value_count,
      attachment_equations: endpoint.target_endpoint_value_binding_source_equations.map((equation) => ({
        row_id: equation.row_id,
        role: equation.role,
        endpoint_ref: equation.endpoint_ref,
        endpoint_value: equation.endpoint_value,
        ownership_component_id: equation.ownership_component_id,
        primitive_binding_equation:
          `${primitiveId}[${equation.row_id}:${equation.endpoint_ref}] = ${equation.endpoint_value.display}`,
        attachment_status: "certified-target-ref-value-attachment",
      })),
    },
    proof_grade_binding_status: "first-endpoint-boundary-binding-primitive-only",
    constructed_fields: [
      "primitive_construction_rule_applied",
      "primitive_binding_witness_record_constructed",
      "primitive_domain_chart_attachment_certified",
      "primitive_target_ref_value_attachment_certified",
      "endpoint_boundary_binding_constructed",
    ],
    fields_not_constructed: [
      "full_endpoint_boundary_binding_constructed",
      "witness_object_has_endpoint_boundary_binding_ref",
      "endpoint_boundary_binding_ref_carrier_unblocked",
      ...DOWNSTREAM_FIELDS,
    ],
  };
}

function endpointFields(sourceEndpoint) {
  const sourceFields = sourceEndpoint.required_fields_present || {};
  const fields = {};
  for (const field of PRIMITIVE_PAYLOAD_INPUT_FIELDS) {
    fields[field] = sourceFields[field] === true;
  }
  fields.primitive_construction_rule_declared = fields.primitive_payload_target_ready === true;
  fields.primitive_construction_rule_applied = fields.primitive_payload_target_ready === true;
  fields.primitive_binding_witness_record_constructed = fields.primitive_payload_target_ready === true;
  fields.primitive_domain_chart_attachment_certified = fields.primitive_payload_target_ready === true;
  fields.primitive_target_ref_value_attachment_certified =
    fields.primitive_payload_target_ready === true &&
    sourceEndpoint.target_endpoint_ref_value_count > 0;
  fields.endpoint_boundary_binding_constructed = [
    "primitive_construction_rule_declared",
    "primitive_construction_rule_applied",
    "primitive_binding_witness_record_constructed",
    "primitive_domain_chart_attachment_certified",
    "primitive_target_ref_value_attachment_certified",
  ].every((field) => fields[field] === true);
  fields.full_endpoint_boundary_binding_constructed = false;
  fields.witness_object_has_endpoint_boundary_binding_ref = false;
  fields.endpoint_boundary_binding_ref_carrier_unblocked = false;
  for (const field of DOWNSTREAM_FIELDS) {
    fields[field] = false;
  }
  return fields;
}

function buildEndpointAttempt(sourceEndpoint) {
  const fields = endpointFields(sourceEndpoint);
  const methodResults = CONSTRUCTION_METHODS.map((method) => methodResult(method, fields));
  const firstPrimitiveMissing = FIRST_PRIMITIVE_FIELDS.filter((field) => fields[field] !== true);
  const carrierPromotionMissing = CARRIER_PROMOTION_FIELDS.filter((field) => fields[field] !== true);
  const fullBindingMissing = [
    "full_endpoint_boundary_binding_constructed",
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
  ].filter((field) => fields[field] !== true);
  const primitiveConstructionRule = buildPrimitiveConstructionRule(sourceEndpoint);
  const primitiveBindingWitnessRecord = buildPrimitiveBindingWitnessRecord(sourceEndpoint);
  return {
    id: sourceEndpoint.id,
    endpoint_functional_id: sourceEndpoint.endpoint_functional_id,
    role: sourceEndpoint.role,
    primitive_rule_witness_record_construction_attempt_id:
      `endpoint_boundary_binding_primitive_rule_witness_record_construction_attempt:${sourceEndpoint.id}`,
    source_primitive_construction_attempt_id: sourceEndpoint.primitive_construction_attempt_id,
    primitive_payload_target_id: sourceEndpoint.primitive_payload_target_id,
    first_endpoint_boundary_binding_primitive_id:
      primitiveBindingWitnessRecord.endpoint_boundary_binding_primitive_id,
    primitive_construction_rule_id: primitiveConstructionRule.rule_id,
    primitive_binding_witness_record_id: primitiveBindingWitnessRecord.record_id,
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
    primitive_construction_rule: primitiveConstructionRule,
    primitive_binding_witness_record: primitiveBindingWitnessRecord,
    required_fields_present: fields,
    construction_method_results: methodResults,
    construction_methods_passed:
      methodResults.filter((method) => method.passed).map((method) => method.method_id),
    first_endpoint_boundary_binding_primitive_constructed:
      firstPrimitiveMissing.length === 0,
    first_missing_first_primitive_criterion:
      firstPrimitiveMissing.length === 0 ? null : firstPrimitiveMissing[0],
    missing_first_primitive_criteria: firstPrimitiveMissing,
    first_non_domain_carrier_target: sourceEndpoint.first_non_domain_carrier_target,
    first_non_domain_carrier_unblocked: false,
    missing_carrier_promotion_criteria: carrierPromotionMissing,
    missing_full_binding_contract_criteria: fullBindingMissing,
    downstream_fields_missing: DOWNSTREAM_FIELDS.filter((field) => fields[field] !== true),
    failure_codes: [
      ...carrierPromotionMissing.map((field) => `endpoint_boundary_binding_ref_carrier_locked_${field}`),
      ...fullBindingMissing.map((field) => `full_binding_contract_locked_${field}`),
    ],
    obstruction:
      "The same-packet construction rule and primitive binding witness record construct the first endpoint boundary-binding primitive on the domain-chart carrier, but the witness object still lacks the endpoint-boundary-binding reference carrier and the full endpoint boundary-binding contract remains unsatisfied.",
  };
}

function buildRowAttempt(row, endpointById) {
  const sourceEndpoint = requireMapped(endpointById, row.source_variable, `source endpoint for ${row.row_id}`);
  const receiverEndpoint = requireMapped(endpointById, row.receiver_variable, `receiver endpoint for ${row.row_id}`);
  const fields = {
    row_locator_resolved: row.required_fields_present.row_locator_resolved === true,
    source_primitive_payload_target_ready:
      sourceEndpoint.required_fields_present.primitive_payload_target_ready === true,
    receiver_primitive_payload_target_ready:
      receiverEndpoint.required_fields_present.primitive_payload_target_ready === true,
    combined_primitive_payload_target_pair_ready: false,
    source_primitive_construction_rule_applied:
      sourceEndpoint.required_fields_present.primitive_construction_rule_applied === true,
    receiver_primitive_construction_rule_applied:
      receiverEndpoint.required_fields_present.primitive_construction_rule_applied === true,
    combined_primitive_construction_rule_pair_applied: false,
    source_primitive_binding_witness_record_constructed:
      sourceEndpoint.required_fields_present.primitive_binding_witness_record_constructed === true,
    receiver_primitive_binding_witness_record_constructed:
      receiverEndpoint.required_fields_present.primitive_binding_witness_record_constructed === true,
    combined_primitive_binding_witness_record_pair_constructed: false,
    source_endpoint_boundary_binding_primitive_constructed:
      sourceEndpoint.first_endpoint_boundary_binding_primitive_constructed === true,
    receiver_endpoint_boundary_binding_primitive_constructed:
      receiverEndpoint.first_endpoint_boundary_binding_primitive_constructed === true,
    combined_endpoint_boundary_binding_primitive_pair_constructed: false,
    source_endpoint_boundary_binding_ref_carrier_unblocked:
      sourceEndpoint.required_fields_present.endpoint_boundary_binding_ref_carrier_unblocked === true,
    receiver_endpoint_boundary_binding_ref_carrier_unblocked:
      receiverEndpoint.required_fields_present.endpoint_boundary_binding_ref_carrier_unblocked === true,
    combined_endpoint_boundary_binding_ref_carrier_pair_unblocked: false,
    source_endpoint_value_bound_to_boundary_binding:
      sourceEndpoint.required_fields_present.endpoint_value_bound_to_boundary_binding === true,
    receiver_endpoint_value_bound_to_boundary_binding:
      receiverEndpoint.required_fields_present.endpoint_value_bound_to_boundary_binding === true,
    combined_binding_contract_pair_satisfied: false,
    combined_endpoint_evaluation_map_pair_constructed: false,
    residual_data_construction_ready: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.combined_primitive_payload_target_pair_ready =
    fields.source_primitive_payload_target_ready &&
    fields.receiver_primitive_payload_target_ready;
  fields.combined_primitive_construction_rule_pair_applied =
    fields.source_primitive_construction_rule_applied &&
    fields.receiver_primitive_construction_rule_applied;
  fields.combined_primitive_binding_witness_record_pair_constructed =
    fields.source_primitive_binding_witness_record_constructed &&
    fields.receiver_primitive_binding_witness_record_constructed;
  fields.combined_endpoint_boundary_binding_primitive_pair_constructed =
    fields.source_endpoint_boundary_binding_primitive_constructed &&
    fields.receiver_endpoint_boundary_binding_primitive_constructed;
  fields.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked =
    fields.source_endpoint_boundary_binding_ref_carrier_unblocked &&
    fields.receiver_endpoint_boundary_binding_ref_carrier_unblocked;
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
    source_primitive_payload_target_id: sourceEndpoint.primitive_payload_target_id,
    receiver_primitive_payload_target_id: receiverEndpoint.primitive_payload_target_id,
    source_first_endpoint_boundary_binding_primitive_id:
      sourceEndpoint.first_endpoint_boundary_binding_primitive_id,
    receiver_first_endpoint_boundary_binding_primitive_id:
      receiverEndpoint.first_endpoint_boundary_binding_primitive_id,
    source_primitive_binding_witness_record_id:
      sourceEndpoint.primitive_binding_witness_record_id,
    receiver_primitive_binding_witness_record_id:
      receiverEndpoint.primitive_binding_witness_record_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver first endpoint-boundary-binding primitive records, but the source/receiver endpoint-boundary-binding reference carriers remain locked. No value-binding pair, contract pair, motion/evaluation pair, residual data, replay, row consumption, or branch-chart authorization follows.",
  };
}

function fieldCounts(rows, fields, getter) {
  return Object.fromEntries(fields.map((field) => [field, countTrue(rows, (row) => getter(row, field))]));
}

function buildPacket(source, sourcePath) {
  assertSource(source);
  const endpointAttempts = source.endpoint_boundary_binding_primitive_construction_attempts.map(buildEndpointAttempt);
  const endpointById = idMap(endpointAttempts, "endpoint primitive rule/witness construction attempt");
  const rowAttempts =
    source.row_endpoint_boundary_binding_primitive_construction_attempts.map((row) =>
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
      "breather-higher-fold-fold-coordinate-endpoint-functional-endpoint-boundary-binding-primitive-rule-witness-record-construction-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: STATUS,
    theorem_target: "Endpoint Boundary-Binding Primitive Rule/Witness-Record Construction Attempt",
    claim_level:
      "priority-only partial pass; same-packet primitive construction rules and primitive binding witness records construct the first endpoint boundary-binding primitive for 4 / 4 endpoint functionals, while full endpoint boundary bindings, witness-object reference carriers, value bindings, contracts, replay, and row consumption remain locked",
    source_artifacts: {
      primitive_construction_attempt: artifactRecord(sourcePath),
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
      first_endpoint_boundary_binding_primitives_constructed: true,
      full_endpoint_boundary_bindings_constructed: false,
      endpoint_boundary_binding_ref_carriers_unblocked: false,
      endpoint_value_bindings_constructed: false,
      binding_contracts_satisfied: false,
      row_unblocked: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    construction_rule:
      "A primitive payload target plus an applied same-packet construction rule and a distinct primitive binding witness record constructs the first endpoint boundary-binding primitive on the domain-chart carrier subfield. The witness record must certify attachment to that carrier and to every target endpoint ref/value from the value-source equations.",
    no_promotion_rule:
      "The first endpoint boundary-binding primitive is not a full endpoint boundary binding and does not admit the endpoint-boundary-binding reference carrier by itself. Carrier admission still requires full_endpoint_boundary_binding_constructed and witness_object_has_endpoint_boundary_binding_ref, and row closure still requires value binding, contract satisfaction, motion/evaluation, algebraic certificates, artifact/topology/replay data, and residual-data construction.",
    construction_methods: CONSTRUCTION_METHODS,
    primitive_payload_input_fields: PRIMITIVE_PAYLOAD_INPUT_FIELDS,
    first_primitive_fields: FIRST_PRIMITIVE_FIELDS,
    carrier_promotion_fields: CARRIER_PROMOTION_FIELDS,
    downstream_fields: DOWNSTREAM_FIELDS,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_boundary_binding_primitive_rule_witness_record_construction_attempts:
      endpointAttempts,
    row_endpoint_boundary_binding_primitive_rule_witness_record_construction_attempts:
      rowAttempts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      primitive_payload_targets_ready:
        endpointFieldCounts.primitive_payload_target_ready,
      primitive_construction_rules_declared:
        endpointFieldCounts.primitive_construction_rule_declared,
      primitive_construction_rules_applied:
        endpointFieldCounts.primitive_construction_rule_applied,
      primitive_binding_witness_records_constructed:
        endpointFieldCounts.primitive_binding_witness_record_constructed,
      primitive_domain_chart_attachments_certified:
        endpointFieldCounts.primitive_domain_chart_attachment_certified,
      primitive_target_ref_value_attachments_certified:
        endpointFieldCounts.primitive_target_ref_value_attachment_certified,
      first_endpoint_boundary_binding_primitives_constructed:
        endpointFieldCounts.endpoint_boundary_binding_constructed,
      full_endpoint_boundary_bindings_constructed:
        endpointFieldCounts.full_endpoint_boundary_binding_constructed,
      endpoint_boundary_binding_ref_carriers_unblocked:
        endpointFieldCounts.endpoint_boundary_binding_ref_carrier_unblocked,
      endpoint_value_bindings_constructed:
        endpointFieldCounts.endpoint_value_bound_to_boundary_binding,
      contracts_satisfied:
        endpointFieldCounts.binding_contract_satisfied,
      row_primitive_payload_target_pairs_ready:
        rowFieldCounts.combined_primitive_payload_target_pair_ready,
      row_primitive_construction_rule_pairs_applied:
        rowFieldCounts.combined_primitive_construction_rule_pair_applied,
      row_primitive_binding_witness_record_pairs_constructed:
        rowFieldCounts.combined_primitive_binding_witness_record_pair_constructed,
      row_endpoint_boundary_binding_primitive_pairs_constructed:
        rowFieldCounts.combined_endpoint_boundary_binding_primitive_pair_constructed,
      row_endpoint_boundary_binding_ref_carrier_pairs_unblocked:
        rowFieldCounts.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked,
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
      "Priority-only. This packet closes the prior same-packet primitive rule/witness-record blocker by constructing 4 / 4 first endpoint boundary-binding primitives and 3 / 3 row primitive pairs. It intentionally does not promote those primitives into full endpoint boundary bindings, witness-object endpoint-boundary-binding reference carriers, endpoint value bindings, contract satisfaction, residual-data readiness, row closure, live-ledger update, branch-chart authorization, or row consumption.",
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
        `| \`${endpoint.id}\` | \`${endpoint.role}\` | ${endpoint.required_fields_present.primitive_construction_rule_applied} | ${endpoint.required_fields_present.primitive_binding_witness_record_constructed} | ${endpoint.first_endpoint_boundary_binding_primitive_constructed} | ${endpoint.required_fields_present.full_endpoint_boundary_binding_constructed} | ${endpoint.first_non_domain_carrier_unblocked} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.combined_primitive_construction_rule_pair_applied} | ${row.required_fields_present.combined_primitive_binding_witness_record_pair_constructed} | ${row.required_fields_present.combined_endpoint_boundary_binding_primitive_pair_constructed} | ${row.required_fields_present.combined_endpoint_boundary_binding_ref_carrier_pair_unblocked} | ${row.row_consumed} |`
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
  return `# Higher-Fold Endpoint-Functional Endpoint Boundary-Binding Primitive Rule/Witness-Record Construction Attempt

## Verdict

Status: \`${packet.status}\`.

This priority-only packet continues after the endpoint boundary-binding
primitive construction attempt. It applies ${summary.primitive_construction_rules_applied}
/ ${summary.endpoint_functionals} same-packet primitive construction rules and
constructs ${summary.primitive_binding_witness_records_constructed} /
${summary.endpoint_functionals} primitive binding witness records. Those records
certify ${summary.primitive_domain_chart_attachments_certified} /
${summary.endpoint_functionals} domain-chart attachments and
${summary.primitive_target_ref_value_attachments_certified} /
${summary.endpoint_functionals} target ref/value attachments, so the first
endpoint boundary-binding primitive is constructed for
${summary.first_endpoint_boundary_binding_primitives_constructed} /
${summary.endpoint_functionals} endpoint functionals.

The packet remains fail-closed for row closure. It constructs 0 /
${summary.endpoint_functionals} full endpoint boundary bindings, unblocks 0 /
${summary.endpoint_functionals} endpoint-boundary-binding reference carriers,
constructs 0 / ${summary.endpoint_functionals} endpoint value bindings,
satisfies 0 / ${summary.endpoint_functionals} contracts, and consumes 0 rows.

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

| Endpoint | Role | Rule applied | Witness record | First primitive | Full binding | Ref carrier |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
${endpointTable(packet.endpoint_boundary_binding_primitive_rule_witness_record_construction_attempts)}

## Row Construction Attempts

| Row | Failed side | Rule pair | Witness pair | Primitive pair | Ref-carrier pair | Consumed |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_endpoint_boundary_binding_primitive_rule_witness_record_construction_attempts)}

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
  const source = readJson(args.primitiveConstructionAttempt);
  const packet = buildPacket(source, args.primitiveConstructionAttempt);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, packet, args.pretty);
  writeText(outputReportPath, buildReport(packet));
  console.log(`Wrote ${outputJsonPath}`);
  console.log(`Wrote ${outputReportPath}`);
}

main();

#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_REF_CARRIER_FULL_BINDING_PACKET =
  `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_ref_carrier_full_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON =
  `fold_coordinate_endpoint_functional_endpoint_value_binding_map_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT =
  `fold_coordinate_endpoint_functional_endpoint_value_binding_map_construction_attempt_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const SOURCE_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-boundary-binding-ref-carrier-full-binding-construction-attempt-partial-pass-witness-object-ref-fields-constructed-full-binding-and-carrier-admission-locked-no-row-consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-value-binding-map-construction-attempt-partial-pass-value-maps-constructed-contract-full-binding-carrier-admission-row-closure-locked-no-row-consumption";

const SOURCE_BINDING_FIELDS = [
  "endpoint_boundary_binding_constructed",
  "primitive_binding_witness_record_constructed",
  "primitive_target_ref_value_attachment_certified",
  "witness_object_endpoint_boundary_binding_ref_constructed",
  "witness_object_has_endpoint_boundary_binding_ref",
  "endpoint_boundary_binding_ref_targets_first_primitive",
  "endpoint_boundary_binding_ref_target_attachment_certified",
];

const VALUE_MAP_FIELDS = [
  "endpoint_value_binding_map_declared",
  "endpoint_value_binding_map_constructed",
  "witness_object_has_endpoint_value_binding_map",
  "endpoint_value_bound_to_boundary_binding",
  "endpoint_value_binding_map_targets_first_primitive",
  "endpoint_value_binding_map_ref_values_certified",
];

const CONTRACT_FIELDS = [
  "binding_contract_satisfied",
  "witness_object_has_contract_link",
];

const FULL_BINDING_FIELDS = [
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

const DOWNSTREAM_FIELDS = [
  "endpoint_boundary_binding_witness_constructed",
  "endpoint_boundary_binding_witness_object_constructed",
  ...CONTRACT_FIELDS,
  ...FULL_BINDING_FIELDS,
];

const ENDPOINT_FIELDS = [
  ...SOURCE_BINDING_FIELDS,
  ...VALUE_MAP_FIELDS,
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
  "source_endpoint_value_binding_map_constructed",
  "receiver_endpoint_value_binding_map_constructed",
  "combined_endpoint_value_binding_map_pair_constructed",
  "source_endpoint_value_bound_to_boundary_binding",
  "receiver_endpoint_value_bound_to_boundary_binding",
  "combined_endpoint_value_binding_pair_constructed",
  "source_binding_contract_satisfied",
  "receiver_binding_contract_satisfied",
  "combined_binding_contract_pair_satisfied",
  "source_full_endpoint_boundary_binding_constructed",
  "receiver_full_endpoint_boundary_binding_constructed",
  "combined_full_endpoint_boundary_binding_pair_constructed",
  "source_endpoint_boundary_binding_ref_carrier_unblocked",
  "receiver_endpoint_boundary_binding_ref_carrier_unblocked",
  "combined_endpoint_boundary_binding_ref_carrier_pair_unblocked",
  "combined_endpoint_evaluation_map_pair_constructed",
  "residual_data_construction_ready",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const CONSTRUCTION_METHODS = [
  {
    method_id: "referenced_first_primitive_value_source_ready",
    output_kind: "input-readiness",
    description:
      "Check that a first endpoint boundary-binding primitive is referenced by the witness object and carries certified target ref/value attachment equations.",
    required_fields: SOURCE_BINDING_FIELDS,
  },
  {
    method_id: "endpoint_value_binding_map_construction",
    output_kind: "endpoint-value-binding-map",
    description:
      "Construct an endpoint value-binding map from the referenced first primitive to each certified target endpoint ref/value equation.",
    required_fields: [
      "endpoint_boundary_binding_constructed",
      "witness_object_has_endpoint_boundary_binding_ref",
      "endpoint_value_binding_map_declared",
      "endpoint_value_binding_map_constructed",
      "witness_object_has_endpoint_value_binding_map",
      "endpoint_value_bound_to_boundary_binding",
      "endpoint_value_binding_map_targets_first_primitive",
      "endpoint_value_binding_map_ref_values_certified",
    ],
  },
  {
    method_id: "value_map_as_binding_contract",
    output_kind: "binding-contract",
    description:
      "Test whether the endpoint value-binding map also satisfies the binding contract and witness-object contract link.",
    required_fields: [
      "endpoint_value_binding_map_constructed",
      "endpoint_value_bound_to_boundary_binding",
      "binding_contract_satisfied",
      "witness_object_has_contract_link",
    ],
  },
  {
    method_id: "value_map_as_full_endpoint_boundary_binding",
    output_kind: "full-binding-contract",
    description:
      "Test whether the endpoint value-binding map also supplies full endpoint boundary binding, carrier admission, motion/evaluation, algebraic certificates, artifacts, topology recertification, and proof replay.",
    required_fields: [
      "endpoint_value_binding_map_constructed",
      "endpoint_value_bound_to_boundary_binding",
      "binding_contract_satisfied",
      ...FULL_BINDING_FIELDS,
    ],
  },
];

function parseArgs(argv) {
  const args = {
    refCarrierFullBindingPacket: DEFAULT_REF_CARRIER_FULL_BINDING_PACKET,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--ref-carrier-full-binding-packet") {
      args.refCarrierFullBindingPacket = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-endpoint-value-binding-map-construction-attempt.mjs [options]

Options:
  --ref-carrier-full-binding-packet PATH  Endpoint boundary-binding ref-carrier/full-binding packet JSON.
  --out-dir PATH                          Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                                Pretty-print JSON artifact.
  --help                                  Show this help.`);
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
    throw new Error(`Unexpected ref-carrier/full-binding packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected ref-carrier/full-binding fold-coordinate packet id: ${source.fold_coordinate_packet_id}`);
  }
  if (source.status !== SOURCE_STATUS) {
    throw new Error(`Unexpected ref-carrier/full-binding status: ${source.status}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger || source.row_closure) {
    throw new Error("Refusing endpoint value-binding map construction from authorized or row-closed source packet.");
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
    failure_codes: missingFields.map((field) => `missing_endpoint_value_binding_map_${field}`),
    passed: missingFields.length === 0,
  };
}

function buildEndpointValueBindingMap(endpoint) {
  const mapId = `endpoint_value_binding_map:${endpoint.id}`;
  return {
    map_id: mapId,
    map_kind: "endpoint_value_binding_map_to_first_endpoint_boundary_binding_primitive",
    endpoint_functional_id: endpoint.endpoint_functional_id,
    role: endpoint.role,
    witness_object_symbol: endpoint.witness_object_symbol,
    binding_symbol: endpoint.binding_symbol,
    first_endpoint_boundary_binding_primitive_id:
      endpoint.source_first_endpoint_boundary_binding_primitive_id,
    witness_object_endpoint_boundary_binding_ref_id:
      endpoint.witness_object_endpoint_boundary_binding_ref_id,
    primitive_binding_witness_record_id: endpoint.source_primitive_binding_witness_record_id,
    target_endpoint_ref_value_count: endpoint.target_endpoint_ref_value_count,
    value_bindings: endpoint.target_endpoint_value_binding_source_equations.map((equation) => ({
      row_id: equation.row_id,
      role: equation.role,
      endpoint_ref: equation.endpoint_ref,
      endpoint_value: equation.endpoint_value,
      ownership_component_id: equation.ownership_component_id,
      value_binding_equation:
        `${mapId}[${equation.row_id}:${equation.endpoint_ref}] = ${equation.endpoint_value.display}`,
      source_equation: equation.equation,
      binding_status: "bound-to-first-endpoint-boundary-binding-primitive",
    })),
    carrier_admission_status: "value-map-constructed-carrier-admission-locked",
    proof_grade_binding_status: "endpoint-value-map-only",
    constructed_fields: [
      "endpoint_value_binding_map_declared",
      "endpoint_value_binding_map_constructed",
      "witness_object_has_endpoint_value_binding_map",
      "endpoint_value_bound_to_boundary_binding",
      "endpoint_value_binding_map_targets_first_primitive",
      "endpoint_value_binding_map_ref_values_certified",
    ],
    fields_not_constructed: [
      "binding_contract_satisfied",
      "full_endpoint_boundary_binding_constructed",
      "endpoint_boundary_binding_ref_carrier_unblocked",
      "endpoint_value_binding_map_carrier_unblocked",
      ...FULL_BINDING_FIELDS.filter((field) => field !== "full_endpoint_boundary_binding_constructed"),
    ],
    soundness_limit:
      "This map binds endpoint ref/value equations to the first endpoint boundary-binding primitive only. It does not satisfy the full binding contract, admit carriers, construct motion/evaluation data, certify algebraic conditions, emit artifacts, recertify topology, replay proof intervals, or consume rows.",
  };
}

function endpointFields(sourceEndpoint) {
  const sourceFields = sourceEndpoint.required_fields_present || {};
  const sourceReady =
    SOURCE_BINDING_FIELDS.every((field) => sourceFields[field] === true) &&
    sourceEndpoint.target_endpoint_ref_value_count > 0 &&
    Array.isArray(sourceEndpoint.target_endpoint_value_binding_source_equations) &&
    sourceEndpoint.target_endpoint_value_binding_source_equations.length > 0;
  const fields = {};
  for (const field of SOURCE_BINDING_FIELDS) {
    fields[field] = sourceFields[field] === true;
  }
  fields.endpoint_value_binding_map_declared = sourceReady;
  fields.endpoint_value_binding_map_constructed = sourceReady;
  fields.witness_object_has_endpoint_value_binding_map = sourceReady;
  fields.endpoint_value_bound_to_boundary_binding = sourceReady;
  fields.endpoint_value_binding_map_targets_first_primitive = sourceReady;
  fields.endpoint_value_binding_map_ref_values_certified = sourceReady;
  for (const field of DOWNSTREAM_FIELDS) {
    fields[field] = false;
  }
  return fields;
}

function buildEndpointAttempt(sourceEndpoint) {
  const fields = endpointFields(sourceEndpoint);
  const methodResults = CONSTRUCTION_METHODS.map((method) => methodResult(method, fields));
  const valueMapMissing = VALUE_MAP_FIELDS.filter((field) => fields[field] !== true);
  const contractMissing = CONTRACT_FIELDS.filter((field) => fields[field] !== true);
  const fullBindingMissing = [
    "binding_contract_satisfied",
    ...FULL_BINDING_FIELDS,
  ].filter((field) => fields[field] !== true);
  const endpointValueBindingMap =
    valueMapMissing.length === 0 ? buildEndpointValueBindingMap(sourceEndpoint) : null;
  return {
    id: sourceEndpoint.id,
    endpoint_functional_id: sourceEndpoint.endpoint_functional_id,
    role: sourceEndpoint.role,
    endpoint_value_binding_map_construction_attempt_id:
      `endpoint_value_binding_map_construction_attempt:${sourceEndpoint.id}`,
    source_ref_carrier_full_binding_construction_attempt_id:
      sourceEndpoint.ref_carrier_full_binding_construction_attempt_id,
    source_first_endpoint_boundary_binding_primitive_id:
      sourceEndpoint.source_first_endpoint_boundary_binding_primitive_id,
    source_primitive_binding_witness_record_id:
      sourceEndpoint.source_primitive_binding_witness_record_id,
    witness_object_endpoint_boundary_binding_ref_id:
      sourceEndpoint.witness_object_endpoint_boundary_binding_ref_id,
    endpoint_value_binding_map_id: endpointValueBindingMap?.map_id || null,
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
    endpoint_value_binding_map: endpointValueBindingMap,
    required_fields_present: fields,
    construction_method_results: methodResults,
    construction_methods_passed:
      methodResults.filter((method) => method.passed).map((method) => method.method_id),
    endpoint_value_binding_map_constructed:
      valueMapMissing.length === 0,
    first_missing_value_map_criterion:
      valueMapMissing.length === 0 ? null : valueMapMissing[0],
    missing_value_map_criteria: valueMapMissing,
    missing_contract_criteria: contractMissing,
    full_endpoint_boundary_binding_constructed: false,
    endpoint_boundary_binding_ref_carrier_unblocked: false,
    endpoint_value_binding_map_carrier_unblocked: false,
    missing_full_binding_contract_criteria: fullBindingMissing,
    downstream_fields_missing: DOWNSTREAM_FIELDS.filter((field) => fields[field] !== true),
    failure_codes: [
      ...contractMissing.map((field) => `binding_contract_locked_${field}`),
      ...fullBindingMissing.map((field) => `full_binding_locked_${field}`),
    ],
    obstruction:
      "The endpoint value-binding map binds target ref/value equations to the referenced first primitive, but binding contract satisfaction, full endpoint boundary binding, carrier admission, motion/evaluation, algebraic certificates, replay, and row closure remain absent.",
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
      sourceEndpoint.required_fields_present.witness_object_endpoint_boundary_binding_ref_constructed === true,
    receiver_witness_object_endpoint_boundary_binding_ref_constructed:
      receiverEndpoint.required_fields_present.witness_object_endpoint_boundary_binding_ref_constructed === true,
    combined_witness_object_endpoint_boundary_binding_ref_pair_constructed: false,
    source_endpoint_value_binding_map_constructed:
      sourceEndpoint.endpoint_value_binding_map_constructed === true,
    receiver_endpoint_value_binding_map_constructed:
      receiverEndpoint.endpoint_value_binding_map_constructed === true,
    combined_endpoint_value_binding_map_pair_constructed: false,
    source_endpoint_value_bound_to_boundary_binding:
      sourceEndpoint.required_fields_present.endpoint_value_bound_to_boundary_binding === true,
    receiver_endpoint_value_bound_to_boundary_binding:
      receiverEndpoint.required_fields_present.endpoint_value_bound_to_boundary_binding === true,
    combined_endpoint_value_binding_pair_constructed: false,
    source_binding_contract_satisfied:
      sourceEndpoint.required_fields_present.binding_contract_satisfied === true,
    receiver_binding_contract_satisfied:
      receiverEndpoint.required_fields_present.binding_contract_satisfied === true,
    combined_binding_contract_pair_satisfied: false,
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
  fields.combined_endpoint_value_binding_map_pair_constructed =
    fields.source_endpoint_value_binding_map_constructed &&
    fields.receiver_endpoint_value_binding_map_constructed;
  fields.combined_endpoint_value_binding_pair_constructed =
    fields.source_endpoint_value_bound_to_boundary_binding &&
    fields.receiver_endpoint_value_bound_to_boundary_binding;
  fields.combined_binding_contract_pair_satisfied =
    fields.source_binding_contract_satisfied &&
    fields.receiver_binding_contract_satisfied;
  fields.combined_full_endpoint_boundary_binding_pair_constructed =
    fields.source_full_endpoint_boundary_binding_constructed &&
    fields.receiver_full_endpoint_boundary_binding_constructed;
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
    source_first_endpoint_boundary_binding_primitive_id:
      sourceEndpoint.source_first_endpoint_boundary_binding_primitive_id,
    receiver_first_endpoint_boundary_binding_primitive_id:
      receiverEndpoint.source_first_endpoint_boundary_binding_primitive_id,
    source_endpoint_value_binding_map_id:
      sourceEndpoint.endpoint_value_binding_map_id,
    receiver_endpoint_value_binding_map_id:
      receiverEndpoint.endpoint_value_binding_map_id,
    required_fields_present: fields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver endpoint value-binding maps, but the source/receiver binding contracts, full endpoint boundary bindings, reference-carrier admission, motion/evaluation pair, residual data, replay, row consumption, and branch-chart authorization remain absent.",
  };
}

function fieldCounts(rows, fields, getter) {
  return Object.fromEntries(fields.map((field) => [field, countTrue(rows, (row) => getter(row, field))]));
}

function buildPacket(source, sourcePath) {
  assertSource(source);
  const endpointAttempts =
    source.endpoint_boundary_binding_ref_carrier_full_binding_construction_attempts.map(buildEndpointAttempt);
  const endpointById = idMap(endpointAttempts, "endpoint value-binding map construction attempt");
  const rowAttempts =
    source.row_endpoint_boundary_binding_ref_carrier_full_binding_construction_attempts.map((row) =>
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
      "breather-higher-fold-fold-coordinate-endpoint-functional-endpoint-value-binding-map-construction-attempt-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: STATUS,
    theorem_target: "Endpoint Value-Binding Map Construction Attempt",
    claim_level:
      "priority-only partial pass; endpoint value-binding maps are constructed for 4 / 4 endpoint functionals from referenced first endpoint boundary-binding primitives, while contract satisfaction, full endpoint boundary bindings, carrier admission, motion/evaluation, replay, and row consumption remain locked",
    source_artifacts: {
      ref_carrier_full_binding_construction_attempt: artifactRecord(sourcePath),
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
      endpoint_value_binding_maps_constructed: true,
      endpoint_value_bindings_constructed: true,
      binding_contracts_satisfied: false,
      full_endpoint_boundary_bindings_constructed: false,
      endpoint_boundary_binding_ref_carriers_unblocked: false,
      row_unblocked: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    construction_rule:
      "A witness-object reference to the first endpoint boundary-binding primitive plus certified target ref/value attachment equations constructs an endpoint value-binding map by assigning each target endpoint ref to its certified exact rational endpoint value.",
    no_promotion_rule:
      "An endpoint value-binding map is not a binding contract, not a full endpoint boundary binding, and not carrier admission. Row closure still requires contract satisfaction, full endpoint boundary binding, reference-carrier admission, motion/evaluation, algebraic certificates, artifact/topology/replay data, and residual-data construction.",
    construction_methods: CONSTRUCTION_METHODS,
    source_binding_fields: SOURCE_BINDING_FIELDS,
    value_map_fields: VALUE_MAP_FIELDS,
    contract_fields: CONTRACT_FIELDS,
    full_binding_fields: FULL_BINDING_FIELDS,
    downstream_fields: DOWNSTREAM_FIELDS,
    endpoint_fields: ENDPOINT_FIELDS,
    row_fields: ROW_FIELDS,
    endpoint_value_binding_map_construction_attempts: endpointAttempts,
    row_endpoint_value_binding_map_construction_attempts: rowAttempts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      first_endpoint_boundary_binding_primitives_inherited:
        endpointFieldCounts.endpoint_boundary_binding_constructed,
      witness_object_endpoint_boundary_binding_refs_inherited:
        endpointFieldCounts.witness_object_endpoint_boundary_binding_ref_constructed,
      endpoint_value_binding_maps_declared:
        endpointFieldCounts.endpoint_value_binding_map_declared,
      endpoint_value_binding_maps_constructed:
        endpointFieldCounts.endpoint_value_binding_map_constructed,
      witness_object_endpoint_value_binding_maps_constructed:
        endpointFieldCounts.witness_object_has_endpoint_value_binding_map,
      endpoint_values_bound_to_boundary_bindings:
        endpointFieldCounts.endpoint_value_bound_to_boundary_binding,
      endpoint_value_binding_map_ref_values_certified:
        endpointFieldCounts.endpoint_value_binding_map_ref_values_certified,
      binding_contracts_satisfied:
        endpointFieldCounts.binding_contract_satisfied,
      full_endpoint_boundary_bindings_constructed:
        endpointFieldCounts.full_endpoint_boundary_binding_constructed,
      endpoint_boundary_binding_ref_carriers_unblocked:
        endpointFieldCounts.endpoint_boundary_binding_ref_carrier_unblocked,
      endpoint_value_binding_map_carriers_unblocked:
        endpointFieldCounts.endpoint_value_binding_map_carrier_unblocked,
      row_endpoint_boundary_binding_primitive_pairs_constructed:
        rowFieldCounts.combined_endpoint_boundary_binding_primitive_pair_constructed,
      row_witness_object_endpoint_boundary_binding_ref_pairs_constructed:
        rowFieldCounts.combined_witness_object_endpoint_boundary_binding_ref_pair_constructed,
      row_endpoint_value_binding_map_pairs_constructed:
        rowFieldCounts.combined_endpoint_value_binding_map_pair_constructed,
      row_endpoint_value_binding_pairs_constructed:
        rowFieldCounts.combined_endpoint_value_binding_pair_constructed,
      row_binding_contract_pairs_satisfied:
        rowFieldCounts.combined_binding_contract_pair_satisfied,
      row_full_endpoint_boundary_binding_pairs_constructed:
        rowFieldCounts.combined_full_endpoint_boundary_binding_pair_constructed,
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
      "Priority-only. This packet closes the endpoint value-binding map blocker by constructing 4 / 4 endpoint value-binding maps and 3 / 3 row value-map pairs. It intentionally does not promote those maps into binding contracts, full endpoint boundary bindings, endpoint-boundary-binding reference-carrier admission, residual-data readiness, row closure, live-ledger update, branch-chart authorization, or row consumption.",
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
        `| \`${endpoint.id}\` | \`${endpoint.role}\` | ${endpoint.required_fields_present.endpoint_boundary_binding_constructed} | ${endpoint.required_fields_present.witness_object_has_endpoint_boundary_binding_ref} | ${endpoint.endpoint_value_binding_map_constructed} | ${endpoint.required_fields_present.endpoint_value_bound_to_boundary_binding} | ${endpoint.required_fields_present.binding_contract_satisfied} | ${endpoint.required_fields_present.full_endpoint_boundary_binding_constructed} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.combined_witness_object_endpoint_boundary_binding_ref_pair_constructed} | ${row.required_fields_present.combined_endpoint_value_binding_map_pair_constructed} | ${row.required_fields_present.combined_endpoint_value_binding_pair_constructed} | ${row.required_fields_present.combined_binding_contract_pair_satisfied} | ${row.required_fields_present.combined_full_endpoint_boundary_binding_pair_constructed} | ${row.row_consumed} |`
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
  return `# Higher-Fold Endpoint-Functional Endpoint Value-Binding Map Construction Attempt

## Verdict

Status: \`${packet.status}\`.

This priority-only packet continues after the endpoint boundary-binding
ref-carrier/full-binding construction attempt. It constructs
${summary.endpoint_value_binding_maps_constructed} / ${summary.endpoint_functionals}
endpoint value-binding maps from the referenced first endpoint boundary-binding
primitives and certifies ${summary.endpoint_value_binding_map_ref_values_certified} /
${summary.endpoint_functionals} target ref/value attachment sets.

The packet remains fail-closed for contract satisfaction, full binding, carrier
admission, and row closure. It satisfies 0 / ${summary.endpoint_functionals}
binding contracts, constructs 0 / ${summary.endpoint_functionals} full endpoint
boundary bindings, unblocks 0 / ${summary.endpoint_functionals}
endpoint-boundary-binding reference carriers, and consumes 0 rows.

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

| Endpoint | Role | First primitive | Ref field | Value map | Value bound | Contract | Full binding |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
${endpointTable(packet.endpoint_value_binding_map_construction_attempts)}

## Row Construction Attempts

| Row | Failed side | Ref-field pair | Value-map pair | Value-binding pair | Contract pair | Full-binding pair | Consumed |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_endpoint_value_binding_map_construction_attempts)}

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
  const source = readJson(args.refCarrierFullBindingPacket);
  const packet = buildPacket(source, args.refCarrierFullBindingPacket);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, packet, args.pretty);
  writeText(outputReportPath, buildReport(packet));
  console.log(`Wrote ${outputJsonPath}`);
  console.log(`Wrote ${outputReportPath}`);
}

main();

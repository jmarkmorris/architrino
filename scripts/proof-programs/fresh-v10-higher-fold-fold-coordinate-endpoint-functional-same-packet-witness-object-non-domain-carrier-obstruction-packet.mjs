#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_DOMAIN_CHART_CARRIER_PACKET = `${CERT_DIR}/fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_domain_chart_carrier_subfield_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_CARRIER_FIELD_CONSTRUCTION_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_carrier_field_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_FULL_BOUNDARY_BINDING_CONSTRUCTION_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_ENDPOINT_VALUE_BINDING_SOURCE_LAYER = `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_value_binding_source_layer.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_FULL_BOUNDARY_BINDING_CONTRACT_TARGET = `${CERT_DIR}/fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_contract_target.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_WITNESS_OBJECT_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_witness_object_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_RESIDUAL_FUNCTION_SOURCE_LAYER = `${CERT_DIR}/one_leaf_active_endpoint_residual_function_on_box_source_layer_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON = `fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_non_domain_carrier_obstruction_packet.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_non_domain_carrier_obstruction_packet_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const DOMAIN_CHART_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-domain-chart-carrier-subfield-construction-attempt-partial-pass-fail-closed-domain-chart-carriers-present-other-carrier-fields-absent-no-row-consumption";
const CARRIER_FIELD_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-carrier-field-construction-attempt-fail-closed-carrier-field-source-candidates-present-carrier-fields-absent-no-row-consumption";
const FULL_BOUNDARY_BINDING_STATUS =
  "priority-only-full-endpoint-boundary-binding-construction-attempt-fail-closed-contract-targets-present-full-binding-motion-evaluation-replay-blocked-no-row-consumption";
const VALUE_BINDING_SOURCE_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-endpoint-value-binding-source-layer-fail-closed-source-equations-present-proof-grade-boundary-bindings-absent-no-row-consumption";
const CONTRACT_TARGET_STATUS =
  "priority-only-full-endpoint-boundary-binding-contract-target-input-ready-object-layer-present-full-binding-motion-evaluation-replay-blocked";
const WITNESS_OBJECT_STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-construction-attempt-fail-closed-witness-inputs-present-object-binding-value-contract-motion-evaluation-replay-absent-no-row-consumption";
const RESIDUAL_FUNCTION_SOURCE_STATUS =
  "one_leaf_active_endpoint_residual_function_on_box_source_layer_attempt_fail_closed_formula_inputs_present_box_residual_functions_absent_no_row_consumption";

const STATUS =
  "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-non-domain-carrier-obstruction-packet-fail-closed-domain-chart-carriers-preserved-six-non-domain-carrier-fields-absent-row-closure-false-no-row-consumption";

const CARRIER_FIELDS = [
  "domain_chart",
  "endpoint_boundary_binding_ref",
  "endpoint_value_binding_map",
  "contract_link",
  "algebraic_certificate_refs",
  "motion_evaluation_refs",
  "artifact_topology_replay_refs",
];

const NON_DOMAIN_CARRIER_FIELDS = CARRIER_FIELDS.filter((field) => field !== "domain_chart");

const NON_DOMAIN_CARRIER_DEFINITIONS = {
  endpoint_boundary_binding_ref: {
    target_field: "witness_object_has_endpoint_boundary_binding_ref",
    source_layer: "full_endpoint_boundary_binding_construction_attempt",
    source_positive_fields: ["full_endpoint_boundary_binding_construction_input_ready"],
    blocking_fields: [
      "full_endpoint_boundary_binding_constructed",
      "endpoint_boundary_binding_constructed",
      "witness_object_has_endpoint_boundary_binding_ref",
    ],
    obstruction:
      "Full endpoint boundary-binding construction inputs exist, but no proof-grade endpoint boundary binding or witness-object endpoint boundary-binding reference is supplied.",
  },
  endpoint_value_binding_map: {
    target_field: "witness_object_has_endpoint_value_binding_map",
    source_layer: "endpoint_value_binding_source_layer",
    source_positive_fields: [
      "endpoint_value_binding_source_equation_declared",
      "endpoint_value_binding_source_layer_ready",
    ],
    blocking_fields: [
      "endpoint_boundary_binding_constructed",
      "endpoint_value_bound_to_boundary_binding",
      "witness_object_has_endpoint_value_binding_map",
    ],
    obstruction:
      "Endpoint value-binding source equations exist, but they are not bound to a constructed endpoint boundary binding or witness-object value map.",
  },
  contract_link: {
    target_field: "witness_object_has_contract_link",
    source_layer: "full_endpoint_boundary_binding_contract_target",
    source_positive_fields: ["binding_contract_target_declared"],
    blocking_fields: ["binding_contract_satisfied", "witness_object_has_contract_link"],
    obstruction:
      "The full endpoint boundary-binding contract target is declared, but contract satisfaction and the witness-object contract link are absent.",
  },
  algebraic_certificate_refs: {
    target_field: "witness_object_has_algebraic_certificate_refs",
    source_layer: "full_endpoint_boundary_binding_contract_target",
    source_positive_fields: [
      "non_target_zero_target_declared",
      "exact_screen_zero_target_declared",
      "rank_target_declared",
    ],
    blocking_fields: [
      "non_target_endpoint_zero_certified",
      "exact_screen_zero_certified",
      "rank_certified",
      "witness_object_has_algebraic_certificate_refs",
    ],
    obstruction:
      "The non-target zero, exact screen-zero, and rank targets are declared, but their certificates and witness-object certificate references are absent.",
  },
  motion_evaluation_refs: {
    target_field: "witness_object_has_motion_evaluation_refs",
    source_layer: "full_endpoint_boundary_binding_contract_target",
    source_positive_fields: [
      "history_update_target_declared",
      "endpoint_motion_target_declared",
      "endpoint_evaluation_target_declared",
    ],
    blocking_fields: [
      "same_packet_history_update_formula_present",
      "endpoint_motion_rule_constructed",
      "endpoint_evaluation_map_constructed",
      "full_endpoint_evaluation_map_constructed",
      "witness_object_has_motion_evaluation_refs",
    ],
    obstruction:
      "History-update, endpoint-motion, and endpoint-evaluation targets are declared, but no same-packet motion/evaluation rules or witness-object references are supplied.",
  },
  artifact_topology_replay_refs: {
    target_field: "witness_object_has_artifact_topology_replay_refs",
    source_layer: "full_endpoint_boundary_binding_contract_target",
    source_positive_fields: ["candidate_artifact_replay_target_declared"],
    blocking_fields: [
      "candidate_artifacts_present",
      "root_topology_recertified_for_candidate_change",
      "proof_interval_v1_v6_rerun_for_candidate_change",
      "witness_object_has_artifact_topology_replay_refs",
    ],
    obstruction:
      "Candidate artifact, topology recertification, and proof-interval replay targets are declared, but the actual artifacts, topology replay, proof replay, and witness-object replay references are absent.",
  },
};

const ENDPOINT_FALSE_FIELDS = [
  "all_carrier_fields_constructed",
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
  "witness_object_has_endpoint_boundary_binding_ref",
  "witness_object_has_endpoint_value_binding_map",
  "witness_object_has_contract_link",
  "witness_object_has_algebraic_certificate_refs",
  "witness_object_has_motion_evaluation_refs",
  "witness_object_has_artifact_topology_replay_refs",
];

const ROW_FIELDS = [
  "combined_witness_object_carrier_field_obligation_pair_declared",
  "source_domain_chart_carrier_subfield_constructed",
  "receiver_domain_chart_carrier_subfield_constructed",
  "combined_domain_chart_carrier_subfield_pair_constructed",
  "source_non_domain_carriers_absent",
  "receiver_non_domain_carriers_absent",
  "combined_non_domain_carrier_obstruction_present",
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
  "row_closure",
  "preledger_pass",
  "row_consumed",
  "branch_chart_authorized",
];

function parseArgs(argv) {
  const args = {
    domainChartCarrierPacket: DEFAULT_DOMAIN_CHART_CARRIER_PACKET,
    carrierFieldConstructionAttempt: DEFAULT_CARRIER_FIELD_CONSTRUCTION_ATTEMPT,
    fullBoundaryBindingConstructionAttempt: DEFAULT_FULL_BOUNDARY_BINDING_CONSTRUCTION_ATTEMPT,
    endpointValueBindingSourceLayer: DEFAULT_ENDPOINT_VALUE_BINDING_SOURCE_LAYER,
    fullBoundaryBindingContractTarget: DEFAULT_FULL_BOUNDARY_BINDING_CONTRACT_TARGET,
    witnessObjectAttempt: DEFAULT_WITNESS_OBJECT_ATTEMPT,
    residualFunctionSourceLayer: DEFAULT_RESIDUAL_FUNCTION_SOURCE_LAYER,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--domain-chart-carrier-packet") {
      args.domainChartCarrierPacket = argv[++index];
    } else if (arg === "--carrier-field-construction-attempt") {
      args.carrierFieldConstructionAttempt = argv[++index];
    } else if (arg === "--full-boundary-binding-construction-attempt") {
      args.fullBoundaryBindingConstructionAttempt = argv[++index];
    } else if (arg === "--endpoint-value-binding-source-layer") {
      args.endpointValueBindingSourceLayer = argv[++index];
    } else if (arg === "--full-boundary-binding-contract-target") {
      args.fullBoundaryBindingContractTarget = argv[++index];
    } else if (arg === "--witness-object-attempt") {
      args.witnessObjectAttempt = argv[++index];
    } else if (arg === "--residual-function-source-layer") {
      args.residualFunctionSourceLayer = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-same-packet-witness-object-non-domain-carrier-obstruction-packet.mjs [options]

Options:
  --domain-chart-carrier-packet PATH              Domain-chart carrier subfield packet JSON.
  --carrier-field-construction-attempt PATH       Carrier-field construction attempt JSON.
  --full-boundary-binding-construction-attempt PATH
                                                  Full endpoint boundary-binding construction attempt JSON.
  --endpoint-value-binding-source-layer PATH      Endpoint value-binding source-layer JSON.
  --full-boundary-binding-contract-target PATH    Full endpoint boundary-binding contract-target JSON.
  --witness-object-attempt PATH                   Witness-object construction attempt JSON.
  --residual-function-source-layer PATH           Residual-function-on-box source-layer JSON.
  --out-dir PATH                                  Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                                        Pretty-print JSON artifact.
  --help                                          Show this help.`);
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

function idMap(rows, key, label) {
  const map = new Map();
  if (!Array.isArray(rows)) {
    throw new Error(`Missing ${label} rows.`);
  }
  for (const row of rows) {
    const id = row[key];
    if (!id) {
      throw new Error(`Missing ${label} id field ${key}.`);
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

function assertCommonPacket(packet, status, label) {
  if (packet.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${label} packet id: ${packet.packet_id}`);
  }
  if (packet.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected ${label} fold-coordinate packet id: ${packet.fold_coordinate_packet_id}`);
  }
  if (packet.status !== status) {
    throw new Error(`Unexpected ${label} status: ${packet.status}`);
  }
  if (packet.branch_chart_authorized || packet.preledger_pass || packet.updates_live_ledger) {
    throw new Error(`Refusing non-domain obstruction packet from authorized ${label}.`);
  }
}

function assertInputs(sources) {
  assertCommonPacket(sources.domainChart, DOMAIN_CHART_STATUS, "domain-chart carrier packet");
  assertCommonPacket(sources.carrierField, CARRIER_FIELD_STATUS, "carrier-field construction attempt");
  assertCommonPacket(
    sources.fullBoundaryBinding,
    FULL_BOUNDARY_BINDING_STATUS,
    "full endpoint boundary-binding construction attempt"
  );
  assertCommonPacket(sources.valueBinding, VALUE_BINDING_SOURCE_STATUS, "endpoint value-binding source layer");
  assertCommonPacket(sources.contractTarget, CONTRACT_TARGET_STATUS, "full endpoint boundary-binding contract target");
  assertCommonPacket(sources.witnessObject, WITNESS_OBJECT_STATUS, "witness-object construction attempt");
  assertCommonPacket(sources.residualFunction, RESIDUAL_FUNCTION_SOURCE_STATUS, "residual-function source layer");
  if (sources.domainChart.summary?.endpoint_carrier_fields_constructed !== 4) {
    throw new Error("Expected exactly four constructed domain-chart carrier fields.");
  }
  if (sources.domainChart.summary?.endpoint_remaining_carrier_field_slots !== 24) {
    throw new Error("Expected exactly 24 remaining non-domain carrier slots.");
  }
}

function assertSameEndpoint(domainEndpoint, sourceEndpoint, label) {
  const pairs = [
    ["id", "id"],
    ["endpoint_functional_id", "endpoint_functional_id"],
    ["role", "role"],
    ["domain_symbol", "domain_symbol"],
    ["chart_symbol", "chart_symbol"],
    ["basis_symbol", "basis_symbol"],
  ];
  for (const [left, right] of pairs) {
    if (
      Object.hasOwn(domainEndpoint, left) &&
      Object.hasOwn(sourceEndpoint, right) &&
      domainEndpoint[left] !== sourceEndpoint[right]
    ) {
      throw new Error(`Endpoint mismatch for ${domainEndpoint.id} against ${label}: ${left}/${right}`);
    }
  }
}

function assertSameRow(domainRow, sourceRow, label) {
  const pairs = [
    ["row_id", "row_id"],
    ["source_variable", "source_variable"],
    ["receiver_variable", "receiver_variable"],
    ["failed_side", "failed_side"],
    ["boundary_side", "boundary_side"],
  ];
  for (const [left, right] of pairs) {
    if (
      Object.hasOwn(domainRow, left) &&
      Object.hasOwn(sourceRow, right) &&
      domainRow[left] !== sourceRow[right]
    ) {
      throw new Error(`Row mismatch for ${domainRow.row_id} against ${label}: ${left}/${right}`);
    }
  }
}

function sourceEndpointMaps(sources) {
  return {
    carrierField: idMap(
      sources.carrierField.endpoint_witness_object_carrier_field_construction_attempts,
      "id",
      "carrier-field endpoint"
    ),
    fullBoundaryBinding: idMap(
      sources.fullBoundaryBinding.endpoint_full_boundary_binding_construction_attempts,
      "id",
      "full boundary-binding endpoint"
    ),
    valueBinding: idMap(
      sources.valueBinding.endpoint_value_binding_source_layers,
      "id",
      "value-binding endpoint"
    ),
    contractTarget: idMap(
      sources.contractTarget.endpoint_full_boundary_binding_contract_targets,
      "id",
      "contract-target endpoint"
    ),
    witnessObject: idMap(
      sources.witnessObject.endpoint_boundary_binding_witness_object_attempts,
      "id",
      "witness-object endpoint"
    ),
  };
}

function sourceRowMaps(sources) {
  return {
    carrierField: idMap(
      sources.carrierField.row_witness_object_carrier_field_construction_attempts,
      "row_id",
      "carrier-field row"
    ),
    fullBoundaryBinding: idMap(
      sources.fullBoundaryBinding.row_full_boundary_binding_construction_attempts,
      "row_id",
      "full boundary-binding row"
    ),
    valueBinding: idMap(
      sources.valueBinding.row_endpoint_value_binding_source_layers,
      "row_id",
      "value-binding row"
    ),
    contractTarget: idMap(
      sources.contractTarget.row_full_boundary_binding_contract_targets,
      "row_id",
      "contract-target row"
    ),
    witnessObject: idMap(
      sources.witnessObject.row_endpoint_boundary_binding_witness_object_attempts,
      "row_id",
      "witness-object row"
    ),
    residualFunction: idMap(
      sources.residualFunction.row_active_endpoint_residual_function_on_box_source_layer_attempts,
      "row_id",
      "residual-function row"
    ),
  };
}

function sourceEndpointsFor(endpoint, maps) {
  const sourceEndpoints = {
    carrierField: requireMapped(maps.carrierField, endpoint.id, "carrier-field endpoint"),
    fullBoundaryBinding: requireMapped(maps.fullBoundaryBinding, endpoint.id, "full boundary-binding endpoint"),
    valueBinding: requireMapped(maps.valueBinding, endpoint.id, "value-binding endpoint"),
    contractTarget: requireMapped(maps.contractTarget, endpoint.id, "contract-target endpoint"),
    witnessObject: requireMapped(maps.witnessObject, endpoint.id, "witness-object endpoint"),
  };
  for (const [label, sourceEndpoint] of Object.entries(sourceEndpoints)) {
    assertSameEndpoint(endpoint, sourceEndpoint, label);
  }
  return sourceEndpoints;
}

function sourceRowsFor(row, maps) {
  const sourceRows = {
    carrierField: requireMapped(maps.carrierField, row.row_id, "carrier-field row"),
    fullBoundaryBinding: requireMapped(maps.fullBoundaryBinding, row.row_id, "full boundary-binding row"),
    valueBinding: requireMapped(maps.valueBinding, row.row_id, "value-binding row"),
    contractTarget: requireMapped(maps.contractTarget, row.row_id, "contract-target row"),
    witnessObject: requireMapped(maps.witnessObject, row.row_id, "witness-object row"),
    residualFunction: requireMapped(maps.residualFunction, row.row_id, "residual-function row"),
  };
  for (const [label, sourceRow] of Object.entries(sourceRows)) {
    assertSameRow(row, sourceRow, label);
  }
  return sourceRows;
}

function fieldsFromSourceLayer(definition, sourceEndpoints) {
  if (definition.source_layer === "full_endpoint_boundary_binding_construction_attempt") {
    return sourceEndpoints.fullBoundaryBinding.required_fields_present || {};
  }
  if (definition.source_layer === "endpoint_value_binding_source_layer") {
    return sourceEndpoints.valueBinding.required_fields_present || {};
  }
  if (definition.source_layer === "full_endpoint_boundary_binding_contract_target") {
    return sourceEndpoints.contractTarget.required_fields_present || {};
  }
  throw new Error(`Unknown source layer: ${definition.source_layer}`);
}

function buildSourceSignals(definition, sourceEndpoints) {
  const sourceFields = fieldsFromSourceLayer(definition, sourceEndpoints);
  const positive = definition.source_positive_fields.map((field) => ({
    field,
    present: sourceFields[field] === true,
  }));
  const blockers = definition.blocking_fields.map((field) => ({
    field,
    present: sourceFields[field] === true || sourceEndpoints.witnessObject.required_fields_present?.[field] === true,
  }));
  return {
    source_layer: definition.source_layer,
    positive_source_fields: positive,
    absent_blocking_fields: blockers,
    positive_source_fields_all_present: positive.every((entry) => entry.present),
    blocking_fields_all_absent: blockers.every((entry) => entry.present === false),
  };
}

function requireDomainChartEndpoint(endpoint) {
  const fields = endpoint.required_fields_present || {};
  if (fields.domain_chart_carrier_subfield_constructed !== true) {
    throw new Error(`Domain-chart carrier subfield absent for endpoint ${endpoint.id}.`);
  }
  if (fields.witness_object_has_domain_chart !== true) {
    throw new Error(`Witness object does not preserve domain_chart for endpoint ${endpoint.id}.`);
  }
  if (endpoint.carrier_field_constructed_count !== 1) {
    throw new Error(`Expected exactly one constructed carrier field for endpoint ${endpoint.id}.`);
  }
  for (const field of NON_DOMAIN_CARRIER_FIELDS) {
    const carrierAttempt = endpoint.carrier_field_construction_attempts.find(
      (attempt) => attempt.carrier_field === field
    );
    if (!carrierAttempt || carrierAttempt.carrier_field_constructed !== false) {
      throw new Error(`Expected non-domain carrier ${field} to remain absent for endpoint ${endpoint.id}.`);
    }
  }
}

function endpointRequiredFields(domainEndpoint) {
  const fields = {
    ...domainEndpoint.required_fields_present,
    domain_chart_carrier_subfield_constructed: true,
    witness_object_has_domain_chart: true,
    non_domain_carrier_obstruction_present: true,
  };
  for (const field of ENDPOINT_FALSE_FIELDS) {
    fields[field] = false;
  }
  return fields;
}

function buildNonDomainCarrierObstructions(domainEndpoint, sourceEndpoints) {
  return NON_DOMAIN_CARRIER_FIELDS.map((field) => {
    const definition = NON_DOMAIN_CARRIER_DEFINITIONS[field];
    const carrierAttempt = domainEndpoint.carrier_field_construction_attempts.find(
      (attempt) => attempt.carrier_field === field
    );
    if (!carrierAttempt) {
      throw new Error(`Missing carrier attempt ${field} for endpoint ${domainEndpoint.id}.`);
    }
    const sourceSignals = buildSourceSignals(definition, sourceEndpoints);
    return {
      carrier_field: field,
      target_field: carrierAttempt.target_field || definition.target_field,
      source_ref: carrierAttempt.source_ref,
      present_field: carrierAttempt.present_field || definition.target_field,
      source_layer: definition.source_layer,
      carrier_field_source_candidate_declared:
        carrierAttempt.carrier_field_source_candidate_declared === true,
      carrier_field_constructed: false,
      source_signals: sourceSignals,
      missing_dependencies: definition.blocking_fields,
      failure_codes: definition.blocking_fields.map(
        (blockedField) => `non_domain_carrier_obstruction_${field}_missing_${blockedField}`
      ),
      construction_status: "obstructed-non-domain-carrier-absent",
      obstruction: definition.obstruction,
    };
  });
}

function buildEndpointObstruction(domainEndpoint, sourceEndpoints) {
  requireDomainChartEndpoint(domainEndpoint);
  const nonDomainCarrierObstructions = buildNonDomainCarrierObstructions(domainEndpoint, sourceEndpoints);
  const fields = endpointRequiredFields(domainEndpoint);
  return {
    id: domainEndpoint.id,
    endpoint_functional_id: domainEndpoint.endpoint_functional_id,
    role: domainEndpoint.role,
    domain_chart_carrier_subfield_id: domainEndpoint.domain_chart_carrier_subfield_id,
    carrier_field_construction_attempt_id: domainEndpoint.carrier_field_construction_attempt_id,
    carrier_field_obligation_id: domainEndpoint.carrier_field_obligation_id,
    witness_object_attempt_id: domainEndpoint.witness_object_attempt_id,
    domain_symbol: domainEndpoint.domain_symbol,
    chart_symbol: domainEndpoint.chart_symbol,
    basis_symbol: domainEndpoint.basis_symbol,
    witness_object_symbol: domainEndpoint.witness_object_symbol,
    domain_chart_carrier_payload: domainEndpoint.domain_chart_carrier_payload,
    non_domain_carrier_obstruction_id: `non_domain_carrier_obstruction:${domainEndpoint.id}`,
    non_domain_carrier_obstructions: nonDomainCarrierObstructions,
    carrier_field_constructed_count: 1,
    non_domain_carrier_field_count: NON_DOMAIN_CARRIER_FIELDS.length,
    non_domain_carrier_fields_constructed_count: 0,
    required_fields_present: fields,
    domain_chart_carrier_subfield_constructed: true,
    all_carrier_fields_constructed: false,
    endpoint_boundary_binding_witness_object_constructed: false,
    row_closure: false,
    missing_carrier_fields: NON_DOMAIN_CARRIER_FIELDS,
    obstruction:
      "The domain-chart carrier subfield is preserved, but all six non-domain same-packet witness-object carrier fields are absent.",
  };
}

function rowFields(sourceEndpoint, receiverEndpoint, sourceRow) {
  const residualFields = sourceRow.residualFunction.required_fields_present || {};
  return {
    combined_witness_object_carrier_field_obligation_pair_declared: true,
    source_domain_chart_carrier_subfield_constructed:
      sourceEndpoint.domain_chart_carrier_subfield_constructed === true,
    receiver_domain_chart_carrier_subfield_constructed:
      receiverEndpoint.domain_chart_carrier_subfield_constructed === true,
    combined_domain_chart_carrier_subfield_pair_constructed:
      sourceEndpoint.domain_chart_carrier_subfield_constructed === true &&
      receiverEndpoint.domain_chart_carrier_subfield_constructed === true,
    source_non_domain_carriers_absent: sourceEndpoint.non_domain_carrier_fields_constructed_count === 0,
    receiver_non_domain_carriers_absent: receiverEndpoint.non_domain_carrier_fields_constructed_count === 0,
    combined_non_domain_carrier_obstruction_present:
      sourceEndpoint.non_domain_carrier_fields_constructed_count === 0 &&
      receiverEndpoint.non_domain_carrier_fields_constructed_count === 0,
    source_all_carrier_fields_constructed: false,
    receiver_all_carrier_fields_constructed: false,
    combined_all_carrier_fields_constructed: false,
    combined_endpoint_boundary_binding_witness_object_pair_constructed: false,
    combined_boundary_binding_pair_constructed: false,
    combined_binding_contract_pair_satisfied: false,
    combined_endpoint_evaluation_map_pair_constructed: false,
    source_endpoint_residual_formula_present:
      residualFields.source_endpoint_residual_formula_present === true,
    receiver_endpoint_residual_formula_present:
      residualFields.receiver_endpoint_residual_formula_present === true,
    source_endpoint_residual_function_on_box_constructed:
      residualFields.source_endpoint_residual_function_on_box_constructed === true,
    receiver_endpoint_residual_function_on_box_constructed:
      residualFields.receiver_endpoint_residual_function_on_box_constructed === true,
    residual_function_on_box_source_layer_ready: false,
    row_closure: false,
    preledger_pass: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
}

function buildRowObstruction(domainRow, sourceRows, endpointById) {
  const sourceEndpoint = requireMapped(
    endpointById,
    domainRow.source_variable,
    `source non-domain carrier obstruction for ${domainRow.row_id}`
  );
  const receiverEndpoint = requireMapped(
    endpointById,
    domainRow.receiver_variable,
    `receiver non-domain carrier obstruction for ${domainRow.row_id}`
  );
  const fields = rowFields(sourceEndpoint, receiverEndpoint, sourceRows);
  return {
    row_id: domainRow.row_id,
    cover_id: domainRow.cover_id,
    ledger: domainRow.ledger,
    source_interval: domainRow.source_interval,
    receiver_interval: domainRow.receiver_interval,
    failed_side: domainRow.failed_side,
    boundary_side: domainRow.boundary_side,
    source_variable: domainRow.source_variable,
    receiver_variable: domainRow.receiver_variable,
    source_domain_chart_carrier_subfield_id: sourceEndpoint.domain_chart_carrier_subfield_id,
    receiver_domain_chart_carrier_subfield_id: receiverEndpoint.domain_chart_carrier_subfield_id,
    source_non_domain_carrier_obstruction_id: sourceEndpoint.non_domain_carrier_obstruction_id,
    receiver_non_domain_carrier_obstruction_id: receiverEndpoint.non_domain_carrier_obstruction_id,
    source_carrier_field_constructed_count: sourceEndpoint.carrier_field_constructed_count,
    receiver_carrier_field_constructed_count: receiverEndpoint.carrier_field_constructed_count,
    source_non_domain_carrier_fields_constructed_count:
      sourceEndpoint.non_domain_carrier_fields_constructed_count,
    receiver_non_domain_carrier_fields_constructed_count:
      receiverEndpoint.non_domain_carrier_fields_constructed_count,
    candidate_lambda_interval: domainRow.candidate_lambda_interval,
    sampled_endpoint_data: domainRow.sampled_endpoint_data,
    sampled_boundary_values: domainRow.sampled_boundary_values,
    residual_consumer_targets: domainRow.residual_consumer_targets,
    required_fields_present: fields,
    row_closure: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row preserves source and receiver domain-chart carrier subfields, but the six non-domain carrier families are absent on both sides, so no carrier-complete witness-object pair or residual-function source layer is available.",
  };
}

function buildPacket(sources, sourcePaths) {
  assertInputs(sources);
  const maps = sourceEndpointMaps(sources);
  const rowMaps = sourceRowMaps(sources);
  const endpointAttempts =
    sources.domainChart.endpoint_witness_object_domain_chart_carrier_subfield_construction_attempts.map(
      (endpoint) => buildEndpointObstruction(endpoint, sourceEndpointsFor(endpoint, maps))
    );
  const endpointById = idMap(endpointAttempts, "id", "endpoint non-domain carrier obstruction");
  const rowAttempts =
    sources.domainChart.row_witness_object_domain_chart_carrier_subfield_construction_attempts.map(
      (row) => buildRowObstruction(row, sourceRowsFor(row, rowMaps), endpointById)
    );
  const endpointFieldCounts = {
    domain_chart_carrier_subfield_constructed: countTrue(
      endpointAttempts,
      (endpoint) => endpoint.required_fields_present.domain_chart_carrier_subfield_constructed
    ),
    witness_object_has_domain_chart: countTrue(
      endpointAttempts,
      (endpoint) => endpoint.required_fields_present.witness_object_has_domain_chart
    ),
    non_domain_carrier_obstruction_present: countTrue(
      endpointAttempts,
      (endpoint) => endpoint.required_fields_present.non_domain_carrier_obstruction_present
    ),
    all_carrier_fields_constructed: countTrue(
      endpointAttempts,
      (endpoint) => endpoint.required_fields_present.all_carrier_fields_constructed
    ),
    endpoint_boundary_binding_witness_object_constructed: countTrue(
      endpointAttempts,
      (endpoint) => endpoint.required_fields_present.endpoint_boundary_binding_witness_object_constructed
    ),
    endpoint_boundary_binding_constructed: countTrue(
      endpointAttempts,
      (endpoint) => endpoint.required_fields_present.endpoint_boundary_binding_constructed
    ),
    endpoint_value_bound_to_boundary_binding: countTrue(
      endpointAttempts,
      (endpoint) => endpoint.required_fields_present.endpoint_value_bound_to_boundary_binding
    ),
    binding_contract_satisfied: countTrue(
      endpointAttempts,
      (endpoint) => endpoint.required_fields_present.binding_contract_satisfied
    ),
    endpoint_motion_rule_constructed: countTrue(
      endpointAttempts,
      (endpoint) => endpoint.required_fields_present.endpoint_motion_rule_constructed
    ),
    endpoint_evaluation_map_constructed: countTrue(
      endpointAttempts,
      (endpoint) => endpoint.required_fields_present.endpoint_evaluation_map_constructed
    ),
  };
  const rowFieldCounts = Object.fromEntries(
    ROW_FIELDS.map((field) => [field, countTrue(rowAttempts, (row) => row.required_fields_present[field])])
  );
  const endpointCarrierFieldsConstructed = endpointAttempts.reduce(
    (sum, endpoint) => sum + endpoint.carrier_field_constructed_count,
    0
  );
  const endpointNonDomainCarrierSourceCandidates = endpointAttempts.reduce(
    (sum, endpoint) =>
      sum +
      endpoint.non_domain_carrier_obstructions.filter(
        (obstruction) => obstruction.carrier_field_source_candidate_declared
      ).length,
    0
  );
  const endpointNonDomainCarrierFieldsConstructed = endpointAttempts.reduce(
    (sum, endpoint) => sum + endpoint.non_domain_carrier_fields_constructed_count,
    0
  );
  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-non-domain-carrier-obstruction-packet-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: STATUS,
    theorem_target:
      "Same-Packet Endpoint Boundary-Binding Witness-Object Non-Domain Carrier Obstruction Packet",
    claim_level:
      "priority-only fail-closed obstruction packet; domain-chart carrier subfields are preserved, but all six non-domain carrier families remain absent and row closure is false",
    source_artifacts: {
      domain_chart_carrier_packet: artifactRecord(sourcePaths.domainChart),
      carrier_field_construction_attempt: artifactRecord(sourcePaths.carrierField),
      full_boundary_binding_construction_attempt: artifactRecord(sourcePaths.fullBoundaryBinding),
      endpoint_value_binding_source_layer: artifactRecord(sourcePaths.valueBinding),
      full_boundary_binding_contract_target: artifactRecord(sourcePaths.contractTarget),
      witness_object_attempt: artifactRecord(sourcePaths.witnessObject),
      residual_function_source_layer: artifactRecord(sourcePaths.residualFunction),
    },
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    row_closure: false,
    authorization_lock: {
      domain_chart_carrier_subfield_constructed: true,
      non_domain_carrier_obstruction_present: true,
      all_carrier_fields_constructed: false,
      endpoint_boundary_binding_witness_object_constructed: false,
      endpoint_boundary_binding_constructed: false,
      endpoint_value_bound_to_boundary_binding: false,
      binding_contract_satisfied: false,
      endpoint_motion_rule_constructed: false,
      endpoint_evaluation_map_constructed: false,
      residual_function_on_box_source_layer_ready: false,
      row_closure: false,
      preledger_pass: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    non_domain_carrier_obstruction_rule:
      "The prior domain-chart carrier subfield construction may be preserved, but it does not construct endpoint boundary-binding refs, endpoint value maps, contract links, algebraic certificate refs, motion/evaluation refs, or artifact/topology/replay refs. Those six non-domain carrier families require their own proof-grade same-packet data before a witness object can become carrier-complete.",
    no_promotion_rule:
      "A preserved domain-chart carrier plus non-domain obstruction audit does not authorize candidate artifacts, topology recertification, proof-interval replay, preledger pass, live-ledger update, branch-chart authorization, row closure, or row consumption.",
    carrier_fields: CARRIER_FIELDS,
    non_domain_carrier_fields: NON_DOMAIN_CARRIER_FIELDS,
    non_domain_carrier_definitions: NON_DOMAIN_CARRIER_DEFINITIONS,
    endpoint_witness_object_non_domain_carrier_obstruction_packets: endpointAttempts,
    row_witness_object_non_domain_carrier_obstruction_packets: rowAttempts,
    summary: {
      endpoint_functionals: endpointAttempts.length,
      residual_consumer_rows: rowAttempts.length,
      endpoint_carrier_field_slots: endpointAttempts.length * CARRIER_FIELDS.length,
      endpoint_domain_chart_carriers: endpointFieldCounts.witness_object_has_domain_chart,
      endpoint_domain_chart_carrier_subfields_constructed:
        endpointFieldCounts.domain_chart_carrier_subfield_constructed,
      endpoint_non_domain_carrier_slots: endpointAttempts.length * NON_DOMAIN_CARRIER_FIELDS.length,
      endpoint_non_domain_carrier_source_candidates: endpointNonDomainCarrierSourceCandidates,
      endpoint_non_domain_carriers_constructed: endpointNonDomainCarrierFieldsConstructed,
      endpoint_non_domain_carrier_families_absent: NON_DOMAIN_CARRIER_FIELDS.length,
      endpoint_carrier_fields_constructed: endpointCarrierFieldsConstructed,
      endpoint_all_carrier_fields_constructed:
        endpointFieldCounts.all_carrier_fields_constructed,
      endpoint_witness_object_carriers:
        endpointFieldCounts.endpoint_boundary_binding_witness_object_constructed,
      proof_grade_endpoint_boundary_bindings:
        endpointFieldCounts.endpoint_boundary_binding_constructed,
      endpoint_value_bindings:
        endpointFieldCounts.endpoint_value_bound_to_boundary_binding,
      binding_contracts_satisfied: endpointFieldCounts.binding_contract_satisfied,
      endpoint_motion_rules: endpointFieldCounts.endpoint_motion_rule_constructed,
      endpoint_evaluation_maps: endpointFieldCounts.endpoint_evaluation_map_constructed,
      row_domain_chart_carrier_pairs:
        rowFieldCounts.combined_domain_chart_carrier_subfield_pair_constructed,
      row_non_domain_carrier_obstruction_pairs:
        rowFieldCounts.combined_non_domain_carrier_obstruction_present,
      rows_with_source_receiver_all_six_non_domain_candidates:
        rowFieldCounts.combined_non_domain_carrier_obstruction_present,
      row_non_domain_carrier_complete_pairs: 0,
      row_carrier_complete_pairs:
        rowFieldCounts.combined_all_carrier_fields_constructed,
      row_residual_function_source_layer_ready:
        rowFieldCounts.residual_function_on_box_source_layer_ready,
      row_closure_count: rowFieldCounts.row_closure,
      preledger_pass_rows: rowFieldCounts.preledger_pass,
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    endpoint_field_counts: endpointFieldCounts,
    row_field_counts: rowFieldCounts,
    capture_decision:
      "Priority-only. This packet preserves the domain-chart carrier subfield construction and fail-closes the six non-domain carrier families, but constructs no complete same-packet witness objects, proves no residual-function source layer, and consumes no rows.",
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

function endpointTable(endpoints) {
  return endpoints
    .map(
      (endpoint) =>
        `| \`${endpoint.id}\` | \`${endpoint.role}\` | ${endpoint.required_fields_present.witness_object_has_domain_chart} | ${endpoint.non_domain_carrier_fields_constructed_count} / ${endpoint.non_domain_carrier_field_count} | ${endpoint.required_fields_present.all_carrier_fields_constructed} | ${endpoint.required_fields_present.endpoint_boundary_binding_witness_object_constructed} | ${endpoint.row_closure} |`
    )
    .join("\n");
}

function nonDomainCarrierTable(endpoints) {
  const rows = [];
  for (const endpoint of endpoints) {
    for (const obstruction of endpoint.non_domain_carrier_obstructions) {
      rows.push(
        `| \`${endpoint.id}\` | \`${obstruction.carrier_field}\` | \`${obstruction.source_layer}\` | ${obstruction.source_signals.positive_source_fields_all_present} | ${obstruction.source_signals.blocking_fields_all_absent} | ${obstruction.carrier_field_constructed} |`
      );
    }
  }
  return rows.join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.combined_domain_chart_carrier_subfield_pair_constructed} | ${row.required_fields_present.combined_non_domain_carrier_obstruction_present} | ${row.required_fields_present.combined_all_carrier_fields_constructed} | ${row.required_fields_present.residual_function_on_box_source_layer_ready} | ${row.row_closure} | ${row.row_consumed} |`
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
  return `# Higher-Fold Endpoint-Functional Same-Packet Endpoint Boundary-Binding Witness-Object Non-Domain Carrier Obstruction Packet

## Verdict

Status: \`${packet.status}\`.

This priority-only packet imports the domain-chart carrier subfield
construction attempt as the preservation baseline. It preserves
${summary.endpoint_domain_chart_carrier_subfields_constructed} / ${summary.endpoint_functionals}
\`domain_chart\` carrier subfields and
${summary.row_domain_chart_carrier_pairs} / ${summary.residual_consumer_rows}
residual consumer row source/receiver domain-chart carrier pairs.

It audits the six remaining carrier-field families as source-candidate-only:
\`endpoint_boundary_binding_ref\`, \`endpoint_value_binding_map\`,
\`contract_link\`, \`algebraic_certificate_refs\`,
\`motion_evaluation_refs\`, and \`artifact_topology_replay_refs\`.
It records ${summary.endpoint_non_domain_carrier_source_candidates} / ${summary.endpoint_non_domain_carrier_slots}
non-domain carrier source candidates, but 0 / ${summary.endpoint_non_domain_carrier_slots}
non-domain carrier fields are constructed. Thus only ${summary.endpoint_carrier_fields_constructed} / ${summary.endpoint_carrier_field_slots}
carrier slots are constructed, \`row_closure=false\`, and no
carrier-complete witness objects, residual-function source-layer ready rows,
preledger passes, live-ledger updates, branch-chart authorizations, or
consumed rows are produced.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${sourceTable(packet.source_artifacts)}

## Non-Domain Carrier Obstruction Rule

${packet.non_domain_carrier_obstruction_rule}

${packet.no_promotion_rule}

## Endpoint Obstruction Packets

| Endpoint | Role | Domain-chart carrier | Non-domain carriers constructed | All carrier fields | Witness object | Row closure |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
${endpointTable(packet.endpoint_witness_object_non_domain_carrier_obstruction_packets)}

## Non-Domain Carrier Family Audit

| Endpoint | Carrier field | Source layer | Source target present | Blocking fields absent | Carrier constructed |
| --- | --- | --- | ---: | ---: | ---: |
${nonDomainCarrierTable(packet.endpoint_witness_object_non_domain_carrier_obstruction_packets)}

## Row Consumer Attempts

| Row | Failed side | Domain-chart carrier pair | Non-domain obstruction pair | Carrier-complete pair | Residual source ready | Row closure | Consumed |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
${rowTable(packet.row_witness_object_non_domain_carrier_obstruction_packets)}

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
  const sourcePaths = {
    domainChart: args.domainChartCarrierPacket,
    carrierField: args.carrierFieldConstructionAttempt,
    fullBoundaryBinding: args.fullBoundaryBindingConstructionAttempt,
    valueBinding: args.endpointValueBindingSourceLayer,
    contractTarget: args.fullBoundaryBindingContractTarget,
    witnessObject: args.witnessObjectAttempt,
    residualFunction: args.residualFunctionSourceLayer,
  };
  const sources = {
    domainChart: readJson(sourcePaths.domainChart),
    carrierField: readJson(sourcePaths.carrierField),
    fullBoundaryBinding: readJson(sourcePaths.fullBoundaryBinding),
    valueBinding: readJson(sourcePaths.valueBinding),
    contractTarget: readJson(sourcePaths.contractTarget),
    witnessObject: readJson(sourcePaths.witnessObject),
    residualFunction: readJson(sourcePaths.residualFunction),
  };
  const packet = buildPacket(sources, sourcePaths);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, packet, args.pretty);
  writeText(outputReportPath, buildReport(packet));
  console.log(`Wrote ${outputJsonPath}`);
  console.log(`Wrote ${outputReportPath}`);
}

main();

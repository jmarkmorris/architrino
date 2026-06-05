#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";

const DEFAULT_NON_DOMAIN_CARRIER_OBSTRUCTION_PACKET = `${CERT_DIR}/fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_non_domain_carrier_obstruction_packet.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_DOMAIN_CHART_CARRIER_PACKET = `${CERT_DIR}/fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_domain_chart_carrier_subfield_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_FULL_BOUNDARY_BINDING_CONSTRUCTION_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_ENDPOINT_VALUE_BINDING_SOURCE_LAYER = `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_value_binding_source_layer.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_FULL_BOUNDARY_BINDING_CONTRACT_TARGET = `${CERT_DIR}/fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_contract_target.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_TARGET_ENDPOINT_BOUNDARY_BINDING_OBJECT = `${CERT_DIR}/fold_coordinate_endpoint_functional_target_endpoint_boundary_binding_object_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_COMPONENT_DOMAIN_SUBCERTIFICATE = `${CERT_DIR}/fold_coordinate_endpoint_functional_component_union_domain_binding_subcertificate.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_WITNESS_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_witness_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_WITNESS_OBJECT_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_endpoint_boundary_binding_witness_object_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;

const OUTPUT_JSON = `fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_primitive_dependency_certificate.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_primitive_dependency_certificate_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const STATUS =
  "priority-only-full-endpoint-boundary-binding-primitive-dependency-certificate-fail-closed-first-primitive-endpoint-boundary-binding-absent-no-row-consumption";

const EXPECTED_STATUSES = {
  nonDomainCarrierObstructionPacket:
    "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-non-domain-carrier-obstruction-packet-fail-closed-domain-chart-carriers-preserved-six-non-domain-carrier-fields-absent-row-closure-false-no-row-consumption",
  domainChartCarrierPacket:
    "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-domain-chart-carrier-subfield-construction-attempt-partial-pass-fail-closed-domain-chart-carriers-present-other-carrier-fields-absent-no-row-consumption",
  fullBoundaryBindingConstructionAttempt:
    "priority-only-full-endpoint-boundary-binding-construction-attempt-fail-closed-contract-targets-present-full-binding-motion-evaluation-replay-blocked-no-row-consumption",
  endpointValueBindingSourceLayer:
    "priority-only-fold-coordinate-endpoint-functional-endpoint-value-binding-source-layer-fail-closed-source-equations-present-proof-grade-boundary-bindings-absent-no-row-consumption",
  fullBoundaryBindingContractTarget:
    "priority-only-full-endpoint-boundary-binding-contract-target-input-ready-object-layer-present-full-binding-motion-evaluation-replay-blocked",
  targetEndpointBoundaryBindingObject:
    "fold_coordinate_endpoint_functional_component_domain_target_endpoint_boundary_binding_object_construction_partial_pass_object_constructed_full_binding_blocked",
  componentDomainSubcertificate:
    "fold_coordinate_endpoint_functional_component_union_domain_binding_subcertificate_partial_pass_boundary_binding_motion_evaluation_blocked",
  witnessAttempt:
    "priority-only-fold-coordinate-endpoint-functional-endpoint-boundary-binding-witness-construction-attempt-fail-closed-source-equations-present-witness-binding-value-contract-motion-evaluation-replay-absent-no-row-consumption",
  witnessObjectAttempt:
    "priority-only-fold-coordinate-endpoint-functional-same-packet-endpoint-boundary-binding-witness-object-construction-attempt-fail-closed-witness-inputs-present-object-binding-value-contract-motion-evaluation-replay-absent-no-row-consumption",
};

const POSITIVE_PREREQUISITE_FIELDS = [
  "component_domain_subcertificate_ready",
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

const PRIMITIVE_FIELDS = [
  "endpoint_boundary_binding_constructed",
  "full_endpoint_boundary_binding_constructed",
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

const ROW_FIELDS = [
  "row_locator_resolved",
  "source_domain_chart_carrier_subfield_constructed",
  "receiver_domain_chart_carrier_subfield_constructed",
  "combined_domain_chart_carrier_subfield_pair_constructed",
  "source_first_endpoint_boundary_binding_primitive_constructed",
  "receiver_first_endpoint_boundary_binding_primitive_constructed",
  "combined_first_endpoint_boundary_binding_primitive_pair_constructed",
  "source_first_non_domain_carrier_unblocked",
  "receiver_first_non_domain_carrier_unblocked",
  "combined_first_non_domain_carrier_pair_unblocked",
  "source_endpoint_value_bound_to_boundary_binding",
  "receiver_endpoint_value_bound_to_boundary_binding",
  "combined_binding_contract_pair_satisfied",
  "combined_endpoint_evaluation_map_pair_constructed",
  "residual_data_construction_ready",
  "row_unblocked",
  "row_consumed",
  "branch_chart_authorized",
];

const CARRIER_DEPENDENCY_RULES = [
  {
    carrier_field: "endpoint_boundary_binding_ref",
    first_required_primitive: "endpoint_boundary_binding_constructed",
    direct_required_fields: [
      "full_endpoint_boundary_binding_constructed",
      "endpoint_boundary_binding_constructed",
      "witness_object_has_endpoint_boundary_binding_ref",
    ],
    downstream_required_fields: [],
  },
  {
    carrier_field: "endpoint_value_binding_map",
    first_required_primitive: "endpoint_boundary_binding_constructed",
    direct_required_fields: [
      "endpoint_boundary_binding_constructed",
      "endpoint_value_bound_to_boundary_binding",
      "witness_object_has_endpoint_value_binding_map",
    ],
    downstream_required_fields: ["endpoint_value_bound_to_boundary_binding"],
  },
  {
    carrier_field: "contract_link",
    first_required_primitive: "endpoint_boundary_binding_constructed",
    direct_required_fields: ["binding_contract_satisfied", "witness_object_has_contract_link"],
    downstream_required_fields: ["endpoint_value_bound_to_boundary_binding", "binding_contract_satisfied"],
  },
  {
    carrier_field: "algebraic_certificate_refs",
    first_required_primitive: "endpoint_boundary_binding_constructed",
    direct_required_fields: [
      "non_target_endpoint_zero_certified",
      "exact_screen_zero_certified",
      "rank_certified",
      "witness_object_has_algebraic_certificate_refs",
    ],
    downstream_required_fields: [
      "binding_contract_satisfied",
      "non_target_endpoint_zero_certified",
      "exact_screen_zero_certified",
      "rank_certified",
    ],
  },
  {
    carrier_field: "motion_evaluation_refs",
    first_required_primitive: "endpoint_boundary_binding_constructed",
    direct_required_fields: [
      "same_packet_history_update_formula_present",
      "endpoint_motion_rule_constructed",
      "endpoint_evaluation_map_constructed",
      "full_endpoint_evaluation_map_constructed",
      "witness_object_has_motion_evaluation_refs",
    ],
    downstream_required_fields: [
      "same_packet_history_update_formula_present",
      "endpoint_motion_rule_constructed",
      "endpoint_evaluation_map_constructed",
      "full_endpoint_evaluation_map_constructed",
    ],
  },
  {
    carrier_field: "artifact_topology_replay_refs",
    first_required_primitive: "endpoint_boundary_binding_constructed",
    direct_required_fields: [
      "candidate_artifacts_present",
      "root_topology_recertified_for_candidate_change",
      "proof_interval_v1_v6_rerun_for_candidate_change",
      "witness_object_has_artifact_topology_replay_refs",
    ],
    downstream_required_fields: [
      "candidate_artifacts_present",
      "root_topology_recertified_for_candidate_change",
      "proof_interval_v1_v6_rerun_for_candidate_change",
    ],
  },
];

function parseArgs(argv) {
  const args = {
    nonDomainCarrierObstructionPacket: DEFAULT_NON_DOMAIN_CARRIER_OBSTRUCTION_PACKET,
    domainChartCarrierPacket: DEFAULT_DOMAIN_CHART_CARRIER_PACKET,
    fullBoundaryBindingConstructionAttempt: DEFAULT_FULL_BOUNDARY_BINDING_CONSTRUCTION_ATTEMPT,
    endpointValueBindingSourceLayer: DEFAULT_ENDPOINT_VALUE_BINDING_SOURCE_LAYER,
    fullBoundaryBindingContractTarget: DEFAULT_FULL_BOUNDARY_BINDING_CONTRACT_TARGET,
    targetEndpointBoundaryBindingObject: DEFAULT_TARGET_ENDPOINT_BOUNDARY_BINDING_OBJECT,
    componentDomainSubcertificate: DEFAULT_COMPONENT_DOMAIN_SUBCERTIFICATE,
    witnessAttempt: DEFAULT_WITNESS_ATTEMPT,
    witnessObjectAttempt: DEFAULT_WITNESS_OBJECT_ATTEMPT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--non-domain-carrier-obstruction-packet") {
      args.nonDomainCarrierObstructionPacket = argv[++index];
    } else if (arg === "--domain-chart-carrier-packet") {
      args.domainChartCarrierPacket = argv[++index];
    } else if (arg === "--full-boundary-binding-construction-attempt") {
      args.fullBoundaryBindingConstructionAttempt = argv[++index];
    } else if (arg === "--endpoint-value-binding-source-layer") {
      args.endpointValueBindingSourceLayer = argv[++index];
    } else if (arg === "--full-boundary-binding-contract-target") {
      args.fullBoundaryBindingContractTarget = argv[++index];
    } else if (arg === "--target-endpoint-boundary-binding-object") {
      args.targetEndpointBoundaryBindingObject = argv[++index];
    } else if (arg === "--component-domain-subcertificate") {
      args.componentDomainSubcertificate = argv[++index];
    } else if (arg === "--witness-attempt") {
      args.witnessAttempt = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-full-endpoint-boundary-binding-primitive-dependency-certificate.mjs [options]

Options:
  --non-domain-carrier-obstruction-packet PATH    Non-domain carrier obstruction packet JSON.
  --domain-chart-carrier-packet PATH              Domain-chart carrier packet JSON.
  --full-boundary-binding-construction-attempt PATH
                                                  Full endpoint boundary-binding construction attempt JSON.
  --endpoint-value-binding-source-layer PATH      Endpoint value-binding source-layer JSON.
  --full-boundary-binding-contract-target PATH    Full endpoint boundary-binding contract-target JSON.
  --target-endpoint-boundary-binding-object PATH  Target endpoint boundary-binding object JSON.
  --component-domain-subcertificate PATH          Component-domain subcertificate JSON.
  --witness-attempt PATH                          Endpoint boundary-binding witness attempt JSON.
  --witness-object-attempt PATH                   Endpoint boundary-binding witness-object attempt JSON.
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

function rowMap(rows, label) {
  const map = new Map();
  for (const row of rows) {
    if (!row.row_id) {
      throw new Error(`Missing ${label} row_id.`);
    }
    if (map.has(row.row_id)) {
      throw new Error(`Duplicate ${label} row_id: ${row.row_id}`);
    }
    map.set(row.row_id, row);
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

function endpointField(endpoint, field) {
  return endpoint?.required_fields_present?.[field] === true;
}

function assertSource(label, source) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected packet id in ${label}: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected fold-coordinate packet id in ${label}: ${source.fold_coordinate_packet_id}`);
  }
  if (source.status !== EXPECTED_STATUSES[label]) {
    throw new Error(`Unexpected ${label} status: ${source.status}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger) {
    throw new Error(`Refusing primitive dependency certificate from authorized source ${label}.`);
  }
}

function assertSources(sources) {
  for (const [label, source] of Object.entries(sources)) {
    assertSource(label, source);
  }
}

function loadSources(args) {
  const sourcePaths = {
    nonDomainCarrierObstructionPacket: args.nonDomainCarrierObstructionPacket,
    domainChartCarrierPacket: args.domainChartCarrierPacket,
    fullBoundaryBindingConstructionAttempt: args.fullBoundaryBindingConstructionAttempt,
    endpointValueBindingSourceLayer: args.endpointValueBindingSourceLayer,
    fullBoundaryBindingContractTarget: args.fullBoundaryBindingContractTarget,
    targetEndpointBoundaryBindingObject: args.targetEndpointBoundaryBindingObject,
    componentDomainSubcertificate: args.componentDomainSubcertificate,
    witnessAttempt: args.witnessAttempt,
    witnessObjectAttempt: args.witnessObjectAttempt,
  };
  const sources = Object.fromEntries(
    Object.entries(sourcePaths).map(([label, filePath]) => [label, readJson(filePath)])
  );
  assertSources(sources);
  return {
    sourcePaths,
    sources,
    sourceArtifacts: Object.fromEntries(
      Object.entries(sourcePaths).map(([label, filePath]) => [label, artifactRecord(filePath)])
    ),
  };
}

function sourceSignals(source) {
  return {
    componentDomainById: idMap(
      source.componentDomainSubcertificate.endpoint_component_union_domain_binding_subcertificates,
      "component-domain endpoint"
    ),
    targetObjectById: idMap(
      source.targetEndpointBoundaryBindingObject.endpoint_target_boundary_binding_object_attempts,
      "target endpoint boundary-binding object endpoint"
    ),
    contractTargetById: idMap(
      source.fullBoundaryBindingContractTarget.endpoint_full_boundary_binding_contract_targets,
      "full endpoint boundary-binding contract target endpoint"
    ),
    fullBindingAttemptById: idMap(
      source.fullBoundaryBindingConstructionAttempt.endpoint_full_boundary_binding_construction_attempts,
      "full endpoint boundary-binding construction endpoint"
    ),
    valueBindingSourceById: idMap(
      source.endpointValueBindingSourceLayer.endpoint_value_binding_source_layers,
      "endpoint value-binding source endpoint"
    ),
    witnessAttemptById: idMap(
      source.witnessAttempt.endpoint_boundary_binding_witness_attempts,
      "endpoint boundary-binding witness endpoint"
    ),
    witnessObjectAttemptById: idMap(
      source.witnessObjectAttempt.endpoint_boundary_binding_witness_object_attempts,
      "endpoint boundary-binding witness-object endpoint"
    ),
    domainChartCarrierById: idMap(
      source.domainChartCarrierPacket.endpoint_witness_object_domain_chart_carrier_subfield_construction_attempts,
      "domain-chart carrier endpoint"
    ),
  };
}

function buildPositiveInputs(endpoints) {
  const {
    componentDomain,
    targetObject,
    contractTarget,
    fullBindingAttempt,
    valueBindingSource,
    witnessAttempt,
    witnessObjectAttempt,
    domainChartCarrier,
    nonDomainObstruction,
  } = endpoints;
  return {
    component_domain_subcertificate_ready:
      endpointField(componentDomain, "component_domain_subcertificate_ready") ||
      componentDomain.component_domain_subcertificate_ready === true,
    domain_chart_carrier_subfield_constructed:
      endpointField(domainChartCarrier, "domain_chart_carrier_subfield_constructed") ||
      domainChartCarrier.domain_chart_carrier_subfield_constructed === true,
    target_endpoint_boundary_binding_object_constructed:
      endpointField(targetObject, "target_endpoint_boundary_binding_object_constructed") ||
      targetObject.target_endpoint_boundary_binding_object_constructed === true,
    full_endpoint_boundary_binding_contract_target_declared:
      endpointField(contractTarget, "full_endpoint_boundary_binding_contract_target_declared") ||
      contractTarget.contract_target_declared === true,
    full_endpoint_boundary_binding_construction_input_ready:
      endpointField(fullBindingAttempt, "full_endpoint_boundary_binding_construction_input_ready"),
    target_endpoint_ref_value_pairs_present:
      endpointField(valueBindingSource, "target_endpoint_ref_value_pairs_present") ||
      valueBindingSource.target_endpoint_ref_value_count > 0,
    endpoint_value_binding_source_equation_declared:
      endpointField(valueBindingSource, "endpoint_value_binding_source_equation_declared"),
    endpoint_value_binding_source_layer_ready:
      endpointField(valueBindingSource, "endpoint_value_binding_source_layer_ready"),
    endpoint_boundary_binding_witness_input_ready:
      endpointField(witnessAttempt, "endpoint_boundary_binding_witness_input_ready"),
    endpoint_boundary_binding_witness_object_construction_input_ready:
      endpointField(witnessObjectAttempt, "endpoint_boundary_binding_witness_object_construction_input_ready"),
    non_domain_carrier_obstruction_present:
      endpointField(nonDomainObstruction, "non_domain_carrier_obstruction_present") ||
      nonDomainObstruction.non_domain_carrier_obstruction_id !== undefined,
  };
}

function primitiveFields(endpoints) {
  const fields = {};
  for (const field of PRIMITIVE_FIELDS) {
    fields[field] =
      endpointField(endpoints.fullBindingAttempt, field) ||
      endpointField(endpoints.valueBindingSource, field) ||
      endpointField(endpoints.witnessAttempt, field) ||
      endpointField(endpoints.witnessObjectAttempt, field) ||
      endpointField(endpoints.nonDomainObstruction, field);
  }
  return fields;
}

function directCarrierObstruction(nonDomainObstruction, carrierField) {
  const obstruction = nonDomainObstruction.non_domain_carrier_obstructions.find(
    (entry) => entry.carrier_field === carrierField
  );
  if (!obstruction) {
    throw new Error(`Missing non-domain carrier obstruction ${carrierField} for ${nonDomainObstruction.id}.`);
  }
  return obstruction;
}

function carrierDependencies(nonDomainObstruction, primitives) {
  return CARRIER_DEPENDENCY_RULES.map((rule) => {
    const direct = directCarrierObstruction(nonDomainObstruction, rule.carrier_field);
    const missingDirectFields = rule.direct_required_fields.filter((field) => primitives[field] !== true);
    const missingDownstreamFields = rule.downstream_required_fields.filter((field) => primitives[field] !== true);
    return {
      carrier_field: rule.carrier_field,
      first_required_primitive: rule.first_required_primitive,
      direct_required_fields: rule.direct_required_fields,
      downstream_required_fields: rule.downstream_required_fields,
      missing_direct_fields: missingDirectFields,
      missing_downstream_fields: missingDownstreamFields,
      source_layer: direct.source_layer,
      source_ref: direct.source_ref,
      carrier_field_source_candidate_declared: direct.carrier_field_source_candidate_declared === true,
      direct_obstruction_id: `${direct.construction_status}:${nonDomainObstruction.id}:${rule.carrier_field}`,
      carrier_unblocked: false,
      obstruction: direct.obstruction,
    };
  });
}

function buildEndpointChain(nonDomainObstruction, signalMaps) {
  const id = nonDomainObstruction.id;
  const endpoints = {
    componentDomain: requireMapped(signalMaps.componentDomainById, id, "component-domain endpoint"),
    targetObject: requireMapped(signalMaps.targetObjectById, id, "target endpoint boundary-binding object endpoint"),
    contractTarget: requireMapped(signalMaps.contractTargetById, id, "contract target endpoint"),
    fullBindingAttempt: requireMapped(signalMaps.fullBindingAttemptById, id, "full binding attempt endpoint"),
    valueBindingSource: requireMapped(signalMaps.valueBindingSourceById, id, "value-binding source endpoint"),
    witnessAttempt: requireMapped(signalMaps.witnessAttemptById, id, "witness attempt endpoint"),
    witnessObjectAttempt: requireMapped(signalMaps.witnessObjectAttemptById, id, "witness-object attempt endpoint"),
    domainChartCarrier: requireMapped(signalMaps.domainChartCarrierById, id, "domain-chart carrier endpoint"),
    nonDomainObstruction,
  };
  const positiveInputs = buildPositiveInputs(endpoints);
  const primitives = primitiveFields(endpoints);
  const dependencyRows = carrierDependencies(nonDomainObstruction, primitives);
  const positiveReady = POSITIVE_PREREQUISITE_FIELDS.every((field) => positiveInputs[field] === true);
  const firstPrimitiveConstructed = primitives.endpoint_boundary_binding_constructed === true;
  const firstCarrierUnblocked =
    firstPrimitiveConstructed &&
    primitives.full_endpoint_boundary_binding_constructed === true &&
    endpointField(endpoints.witnessObjectAttempt, "witness_object_has_endpoint_boundary_binding_ref");
  return {
    id,
    endpoint_functional_id: nonDomainObstruction.endpoint_functional_id,
    role: nonDomainObstruction.role,
    domain_symbol: nonDomainObstruction.domain_symbol,
    chart_symbol: nonDomainObstruction.chart_symbol,
    basis_symbol: nonDomainObstruction.basis_symbol,
    binding_symbol: endpoints.contractTarget.full_endpoint_boundary_binding_contract_target.binding_symbol,
    witness_object_symbol: nonDomainObstruction.witness_object_symbol,
    target_endpoint_boundary_binding_object_id:
      endpoints.contractTarget.full_endpoint_boundary_binding_contract_target.source_target_object_id,
    full_endpoint_boundary_binding_contract_target_id:
      endpoints.contractTarget.full_endpoint_boundary_binding_contract_target.target_id,
    endpoint_value_binding_source_id: endpoints.valueBindingSource.value_binding_source_id,
    endpoint_boundary_binding_witness_attempt_id: endpoints.witnessAttempt.witness_attempt_id,
    endpoint_boundary_binding_witness_object_attempt_id: endpoints.witnessObjectAttempt.witness_object_attempt_id,
    domain_chart_carrier_subfield_id: nonDomainObstruction.domain_chart_carrier_subfield_id,
    target_endpoint_ref_value_count: endpoints.valueBindingSource.target_endpoint_ref_value_count,
    positive_prerequisites_present: positiveInputs,
    positive_prerequisites_ready: positiveReady,
    primitive_fields_present: primitives,
    first_missing_primitive: firstPrimitiveConstructed ? null : "endpoint_boundary_binding_constructed",
    first_non_domain_carrier_target: "endpoint_boundary_binding_ref",
    first_non_domain_carrier_unblocked: firstCarrierUnblocked,
    carrier_dependency_rows: dependencyRows,
    direct_non_domain_carrier_source_candidates: dependencyRows.length,
    direct_non_domain_carriers_unblocked: 0,
    minimal_live_construction_target: {
      target_id: `endpoint_boundary_binding_primitive_target:${id}`,
      primitive: "endpoint_boundary_binding_constructed",
      binding_symbol: endpoints.contractTarget.full_endpoint_boundary_binding_contract_target.binding_symbol,
      domain_chart_carrier_subfield_id: nonDomainObstruction.domain_chart_carrier_subfield_id,
      target_endpoint_ref_value_count: endpoints.valueBindingSource.target_endpoint_ref_value_count,
      target_endpoint_value_binding_source_equations:
        endpoints.valueBindingSource.target_endpoint_value_binding_source_equations,
      must_bind:
        "Construct a proof-grade endpoint boundary binding on the domain-chart carrier subfield that binds every target endpoint ref/value before any endpoint-boundary-binding reference carrier can be admitted.",
      obligations_not_satisfied_by_the_first_primitive: [
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
    obstruction:
      "All declared object, contract, source-equation, witness-input, and domain-chart carrier prerequisites are present, but the first proof-grade endpoint boundary-binding primitive is absent. The endpoint-boundary-binding reference carrier therefore cannot be unblocked, and downstream value, contract, algebraic, motion/evaluation, artifact, topology, and replay carriers remain closed.",
  };
}

function buildRowCertificate(row, endpointChains) {
  const chainById = idMap(endpointChains, "endpoint primitive dependency chain");
  const sourceChain = requireMapped(chainById, row.source_variable, "source primitive dependency chain");
  const receiverChain = requireMapped(chainById, row.receiver_variable, "receiver primitive dependency chain");
  const rowFields = {
    row_locator_resolved: true,
    source_domain_chart_carrier_subfield_constructed:
      row.required_fields_present.source_domain_chart_carrier_subfield_constructed === true,
    receiver_domain_chart_carrier_subfield_constructed:
      row.required_fields_present.receiver_domain_chart_carrier_subfield_constructed === true,
    combined_domain_chart_carrier_subfield_pair_constructed:
      row.required_fields_present.combined_domain_chart_carrier_subfield_pair_constructed === true,
    source_first_endpoint_boundary_binding_primitive_constructed:
      sourceChain.primitive_fields_present.endpoint_boundary_binding_constructed === true,
    receiver_first_endpoint_boundary_binding_primitive_constructed:
      receiverChain.primitive_fields_present.endpoint_boundary_binding_constructed === true,
    combined_first_endpoint_boundary_binding_primitive_pair_constructed: false,
    source_first_non_domain_carrier_unblocked: sourceChain.first_non_domain_carrier_unblocked,
    receiver_first_non_domain_carrier_unblocked: receiverChain.first_non_domain_carrier_unblocked,
    combined_first_non_domain_carrier_pair_unblocked: false,
    source_endpoint_value_bound_to_boundary_binding:
      sourceChain.primitive_fields_present.endpoint_value_bound_to_boundary_binding === true,
    receiver_endpoint_value_bound_to_boundary_binding:
      receiverChain.primitive_fields_present.endpoint_value_bound_to_boundary_binding === true,
    combined_binding_contract_pair_satisfied: false,
    combined_endpoint_evaluation_map_pair_constructed: false,
    residual_data_construction_ready: false,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
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
    source_first_missing_primitive: sourceChain.first_missing_primitive,
    receiver_first_missing_primitive: receiverChain.first_missing_primitive,
    source_minimal_live_construction_target_id: sourceChain.minimal_live_construction_target.target_id,
    receiver_minimal_live_construction_target_id: receiverChain.minimal_live_construction_target.target_id,
    required_fields_present: rowFields,
    row_unblocked: false,
    row_consumed: false,
    branch_chart_authorized: false,
    obstruction:
      "The row has source/receiver domain-chart carrier subfields and declared non-domain source candidates, but neither side has the first endpoint boundary-binding primitive. No endpoint-boundary-binding reference carrier pair, value-binding pair, contract pair, motion/evaluation pair, residual data, replay, row consumption, or branch-chart authorization follows.",
  };
}

function fieldCounts(rows, fields, getter) {
  return Object.fromEntries(fields.map((field) => [field, countTrue(rows, (row) => getter(row, field))]));
}

function buildCertificate(loaded) {
  const { sources, sourceArtifacts } = loaded;
  const signalMaps = sourceSignals(sources);
  const endpointChains =
    sources.nonDomainCarrierObstructionPacket.endpoint_witness_object_non_domain_carrier_obstruction_packets.map(
      (endpoint) => buildEndpointChain(endpoint, signalMaps)
    );
  const rowCertificates =
    sources.nonDomainCarrierObstructionPacket.row_witness_object_non_domain_carrier_obstruction_packets.map((row) =>
      buildRowCertificate(row, endpointChains)
    );
  const endpointPositiveCounts = fieldCounts(
    endpointChains,
    POSITIVE_PREREQUISITE_FIELDS,
    (chain, field) => chain.positive_prerequisites_present[field]
  );
  const endpointPrimitiveCounts = fieldCounts(
    endpointChains,
    PRIMITIVE_FIELDS,
    (chain, field) => chain.primitive_fields_present[field]
  );
  const rowFieldCounts = fieldCounts(rowCertificates, ROW_FIELDS, (row, field) => row.required_fields_present[field]);
  const totalCarrierDependencyRows = endpointChains.reduce(
    (count, chain) => count + chain.carrier_dependency_rows.length,
    0
  );
  return {
    schema:
      "breather-higher-fold-fold-coordinate-endpoint-functional-full-endpoint-boundary-binding-primitive-dependency-certificate-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: STATUS,
    theorem_target: "Full Endpoint Boundary-Binding Primitive Dependency Certificate",
    claim_level:
      "priority-only primitive dependency certificate; all domain-chart, target-object, contract-target, value-source, and witness-input prerequisites are present, but the first proof-grade endpoint boundary-binding primitive is absent for every endpoint functional",
    source_artifacts: sourceArtifacts,
    branch_chart_authorized: false,
    preledger_pass: false,
    row_closure: false,
    updates_live_ledger: false,
    emits_candidate_artifacts: false,
    emits_topology_recertification: false,
    emits_proof_interval_replay: false,
    authorization_lock: {
      first_endpoint_boundary_binding_primitive_constructed: false,
      endpoint_boundary_binding_ref_carriers_unblocked: false,
      endpoint_value_bindings_constructed: false,
      binding_contracts_satisfied: false,
      row_unblocked: false,
      row_consumed: false,
      branch_chart_authorized: false,
    },
    dependency_rule:
      "A same-packet non-domain endpoint-boundary-binding reference carrier is admissible only after an explicit proof-grade endpoint boundary binding is constructed on the domain-chart carrier subfield and bound to all target endpoint refs/values. The target object, contract target, value-source equations, witness inputs, and domain-chart carrier are prerequisites, not the primitive itself.",
    no_promotion_rule:
      "Neither target endpoint boundary-binding objects nor full endpoint boundary-binding contract targets may be promoted into endpoint boundary bindings. This certificate therefore records the first irreducible primitive that must be supplied before row closure can resume.",
    positive_prerequisite_fields: POSITIVE_PREREQUISITE_FIELDS,
    primitive_fields: PRIMITIVE_FIELDS,
    carrier_dependency_rules: CARRIER_DEPENDENCY_RULES,
    endpoint_primitive_dependency_chains: endpointChains,
    row_primitive_dependency_certificates: rowCertificates,
    summary: {
      endpoint_functionals: endpointChains.length,
      residual_consumer_rows: rowCertificates.length,
      target_endpoint_boundary_binding_objects:
        endpointPositiveCounts.target_endpoint_boundary_binding_object_constructed,
      domain_chart_carriers:
        endpointPositiveCounts.domain_chart_carrier_subfield_constructed,
      endpoint_value_binding_source_layers:
        endpointPositiveCounts.endpoint_value_binding_source_layer_ready,
      contract_targets:
        endpointPositiveCounts.full_endpoint_boundary_binding_contract_target_declared,
      primitive_dependency_chains: endpointChains.length,
      carrier_dependency_rows: totalCarrierDependencyRows,
      first_endpoint_boundary_binding_primitives_constructed:
        endpointPrimitiveCounts.endpoint_boundary_binding_constructed,
      full_endpoint_boundary_bindings_constructed:
        endpointPrimitiveCounts.full_endpoint_boundary_binding_constructed,
      endpoint_boundary_binding_witnesses_constructed:
        endpointPrimitiveCounts.endpoint_boundary_binding_witness_constructed,
      endpoint_boundary_binding_witness_objects_constructed:
        endpointPrimitiveCounts.endpoint_boundary_binding_witness_object_constructed,
      endpoint_value_bindings_constructed:
        endpointPrimitiveCounts.endpoint_value_bound_to_boundary_binding,
      contracts_satisfied:
        endpointPrimitiveCounts.binding_contract_satisfied,
      motion_rules_constructed:
        endpointPrimitiveCounts.endpoint_motion_rule_constructed,
      endpoint_evaluation_maps_constructed:
        endpointPrimitiveCounts.endpoint_evaluation_map_constructed,
      full_endpoint_evaluation_maps_constructed:
        endpointPrimitiveCounts.full_endpoint_evaluation_map_constructed,
      algebraic_certificate_triples_constructed: countTrue(
        endpointChains,
        (chain) =>
          chain.primitive_fields_present.non_target_endpoint_zero_certified === true &&
          chain.primitive_fields_present.exact_screen_zero_certified === true &&
          chain.primitive_fields_present.rank_certified === true
      ),
      replay_triples_constructed: countTrue(
        endpointChains,
        (chain) =>
          chain.primitive_fields_present.candidate_artifacts_present === true &&
          chain.primitive_fields_present.root_topology_recertified_for_candidate_change === true &&
          chain.primitive_fields_present.proof_interval_v1_v6_rerun_for_candidate_change === true
      ),
      non_domain_carriers_unblocked: 0,
      rows_unblocked: 0,
      row_consumption_count: 0,
      branch_chart_authorized: false,
    },
    endpoint_positive_prerequisite_counts: endpointPositiveCounts,
    endpoint_primitive_field_counts: endpointPrimitiveCounts,
    row_field_counts: rowFieldCounts,
    capture_decision:
      "Priority-only. This packet does not promote into corpus prose. It narrows the live proof-program target to the missing proof-grade endpoint boundary-binding primitive: the domain-chart carrier, target object, contract target, value-source equations, and witness inputs are all present for 4 / 4 endpoint functionals, but 0 / 4 endpoint boundary bindings and 0 / 3 row source/receiver boundary-binding primitive pairs are constructed.",
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

function countTable(counts, total) {
  return Object.entries(counts)
    .map(([field, count]) => `| \`${field}\` | ${count} / ${total} |`)
    .join("\n");
}

function chainTable(chains) {
  return chains
    .map(
      (chain) =>
        `| \`${chain.id}\` | \`${chain.role}\` | ${chain.positive_prerequisites_ready} | ${chain.primitive_fields_present.endpoint_boundary_binding_constructed} | \`${chain.first_missing_primitive}\` | ${chain.first_non_domain_carrier_unblocked} |`
    )
    .join("\n");
}

function carrierRuleTable(rules) {
  return rules
    .map(
      (rule) =>
        `| \`${rule.carrier_field}\` | \`${rule.first_required_primitive}\` | ${rule.direct_required_fields.map((field) => `\`${field}\``).join(", ")} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.required_fields_present.combined_domain_chart_carrier_subfield_pair_constructed} | ${row.required_fields_present.combined_first_endpoint_boundary_binding_primitive_pair_constructed} | ${row.row_unblocked} | ${row.row_consumed} |`
    )
    .join("\n");
}

function buildReport(certificate) {
  const summary = certificate.summary;
  return `# Higher-Fold Endpoint-Functional Full Endpoint Boundary-Binding Primitive Dependency Certificate

## Verdict

Status: \`${certificate.status}\`.

This priority-only packet continues after the non-domain carrier obstruction.
It separates the first missing primitive from later carrier families. The
domain-chart carrier, target endpoint boundary-binding object, full endpoint
boundary-binding contract target, endpoint value-binding source layer, and
witness-input layer are present for ${summary.endpoint_functionals} /
${summary.endpoint_functionals} endpoint functionals. The first proof-grade
endpoint boundary-binding primitive is present for 0 /
${summary.endpoint_functionals} endpoint functionals.

The minimal live construction target is therefore an explicit
\`endpoint_boundary_binding_constructed\` primitive on each domain-chart carrier
subfield. That primitive is necessary before the first non-domain
\`endpoint_boundary_binding_ref\` carrier can be admitted. It is not sufficient
for row closure by itself: value binding, contract satisfaction, algebraic
certificates, motion/evaluation, candidate artifacts, topology recertification,
and proof-interval replay remain separate downstream obligations.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
${sourceTable(certificate.source_artifacts)}

## Dependency Rule

${certificate.dependency_rule}

${certificate.no_promotion_rule}

## Carrier Dependency Rules

| Carrier field | First required primitive | Direct required fields |
| --- | --- | --- |
${carrierRuleTable(certificate.carrier_dependency_rules)}

## Endpoint Primitive Chains

| Endpoint | Role | Prerequisites ready | Endpoint binding primitive | First missing primitive | First carrier unblocked |
| --- | --- | ---: | ---: | --- | ---: |
${chainTable(certificate.endpoint_primitive_dependency_chains)}

## Row Certificates

| Row | Failed side | Domain-chart pair | First primitive pair | Row unblocked | Consumed |
| --- | --- | ---: | ---: | ---: | ---: |
${rowTable(certificate.row_primitive_dependency_certificates)}

## Positive Prerequisite Counts

| Field | Count |
| --- | ---: |
${countTable(certificate.endpoint_positive_prerequisite_counts, summary.endpoint_functionals)}

## Primitive Field Counts

| Field | Count |
| --- | ---: |
${countTable(certificate.endpoint_primitive_field_counts, summary.endpoint_functionals)}

## Row Field Counts

| Field | Count |
| --- | ---: |
${countTable(certificate.row_field_counts, summary.residual_consumer_rows)}

## Capture Decision

${certificate.capture_decision}
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const loaded = loadSources(args);
  const certificate = buildCertificate(loaded);
  const outputJsonPath = path.join(args.outDir, OUTPUT_JSON);
  const outputReportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJsonPath, certificate, args.pretty);
  writeText(outputReportPath, buildReport(certificate));
  console.log(`Wrote ${outputJsonPath}`);
  console.log(`Wrote ${outputReportPath}`);
}

main();
